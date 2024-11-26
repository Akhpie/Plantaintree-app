import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  Modal,
  Input,
  DatePicker,
  Space,
  Typography,
  message,
  Switch,
  Pagination,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
  VideoCameraOutlined,
  VideoCameraAddOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import Note from "../../components/CustomNotes/ScheduleNote";

const { Title } = Typography;
const { confirm } = Modal;

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStartDate, setEventStartDate] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [isGoogleMeet, setIsGoogleMeet] = useState(false);
  const [attendees, setAttendees] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingGapi, setIsLoadingGapi] = useState(true);
  const [notificationPermission, setNotificationPermission] = useState(false);
  const [currentPastPage, setCurrentPastPage] = useState(1);
  const pageSize = 5;

  const getMeetLink = (event) => {
    if (event.conferenceData && event.conferenceData.entryPoints) {
      const meetEntry = event.conferenceData.entryPoints.find(
        (entry) => entry.entryPointType === "video"
      );
      return meetEntry ? meetEntry.uri : null;
    }
    return null;
  };

  const joinMeet = (meetLink) => {
    if (meetLink) {
      window.open(meetLink, "_blank");
    }
  };

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission === "granted");
    };

    requestNotificationPermission();

    const initializeGapiClient = () => {
      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            apiKey: "AIzaSyBrRds6ZSLt9nM9rHFR4c1T0EEQfuWN9d4",
            clientId:
              "297028572945-r9nejlf0lsf7pssqmtv0huts1bn8jtac.apps.googleusercontent.com",
            discoveryDocs: [
              "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
            ],
            scope: "https://www.googleapis.com/auth/calendar.events",
          })
          .then(() => {
            const authInstance = window.gapi.auth2.getAuthInstance();
            if (authInstance.isSignedIn.get()) {
              // If the user is signed in, load the events
              const token = authInstance.currentUser
                .get()
                .getAuthResponse().access_token;
              setAccessToken(token);
              loadEvents(token);
            } else {
              // If not signed in, sign in and then load the events
              authInstance.signIn().then(() => {
                const token = authInstance.currentUser
                  .get()
                  .getAuthResponse().access_token;
                setAccessToken(token);
                loadEvents(token);
              });
            }
          })
          .catch((error) => {
            console.error("Error initializing gapi client:", error);
            setIsLoadingGapi(false);
          });
      });
    };

    if (!window.gapi.auth2) {
      // If gapi.auth2 is not initialized, initialize the client
      initializeGapiClient();
    } else {
      // Check if auth2 instance is already available
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (authInstance) {
        if (authInstance.isSignedIn.get()) {
          const token = authInstance.currentUser
            .get()
            .getAuthResponse().access_token;
          setAccessToken(token);
          loadEvents(token);
        } else {
          // If not signed in, sign in first then load events
          authInstance.signIn().then(() => {
            const token = authInstance.currentUser
              .get()
              .getAuthResponse().access_token;
            setAccessToken(token);
            loadEvents(token);
          });
        }
      } else {
        console.error("gapi.auth2 is not initialized globally.");
        setIsLoadingGapi(false);
      }
    }
  }, []);

  const notifyUser = (message) => {
    if (notificationPermission) {
      new Notification("Meet Updated", {
        body: message,
      });
    }
  };

  const refreshEvents = () => {
    loadEvents(accessToken);
  };

  const loadEvents = async (token) => {
    if (!token) {
      message.error(
        "Please refresh the page, if the data is not being displayed."
      );
      return;
    }

    setIsLoading(true);
    try {
      const oneYearAgo = moment().subtract(1, "years").toISOString();
      const oneYearFromNow = moment().add(1, "years").toISOString();

      const response = await axios.get(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            timeMin: oneYearAgo,
            timeMax: oneYearFromNow,
            showDeleted: false,
            singleEvents: true,
            orderBy: "startTime",
          },
        }
      );

      setEvents(response.data.items);
    } catch (error) {
      message.error("Failed to load events");
    } finally {
      setIsLoading(false);
    }
  };
  const showDeleteConfirm = (eventId) => {
    confirm({
      title: "Are you sure you want to delete this event?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, delete",
      okType: "danger",
      cancelText: "No, cancel",
      onOk() {
        confirmDeleteEvent(eventId);
      },
      onCancel() {
        console.log("Delete action cancelled");
      },
    });
  };

  const confirmDeleteEvent = async (eventId) => {
    try {
      await axios.delete(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      message.success("Event deleted successfully");
      loadEvents(accessToken);
    } catch (error) {
      message.error("Failed to delete event");
    }
  };

  const addEvent = async () => {
    setIsSubmitting(true);
    if (!eventTitle || !eventStartDate || !eventEndDate) {
      message.warning("Please fill in all fields");
      return;
    }

    const attendeesList = attendees
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email);

    try {
      const event = {
        summary: eventTitle,
        description: eventDescription,
        start: {
          dateTime: eventStartDate.toISOString(),
        },
        end: {
          dateTime: eventEndDate.toISOString(),
        },
        attendees:
          attendeesList.length > 0
            ? attendeesList.map((email) => ({ email }))
            : undefined,
        conferenceData: isGoogleMeet
          ? {
              createRequest: {
                requestId: "some-random-string",
                conferenceSolutionKey: {
                  type: "hangoutsMeet",
                },
              },
            }
          : undefined,
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 10 },
            { method: "popup", minutes: 5 },
          ],
        },
      };

      await axios.post(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1`,
        event,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            sendUpdates: "all",
          },
        }
      );

      message.success("Event added successfully");
      setIsModalOpen(false);
      resetModal();
      loadEvents(accessToken);
    } catch (error) {
      message.error("Failed to add event");
    }
  };

  const handleEditEvent = (event) => {
    setIsEditing(true);
    setCurrentEventId(event.id);
    setEventTitle(event.summary);
    setEventDescription(event.description || "");
    setEventStartDate(moment(event.start.dateTime));
    setEventEndDate(moment(event.end.dateTime));
    setIsGoogleMeet(!!event.conferenceData);
    setAttendees(
      event.attendees ? event.attendees.map((att) => att.email).join(", ") : ""
    );
    setIsModalOpen(true);
  };

  const updateEvent = async () => {
    if (!eventTitle || !eventStartDate || !eventEndDate) {
      message.warning("Please fill in all fields");
      return;
    }

    const attendeesList = attendees
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email);

    try {
      const event = {
        summary: eventTitle,
        description: eventDescription,
        start: {
          dateTime: eventStartDate.toISOString(),
        },
        end: {
          dateTime: eventEndDate.toISOString(),
        },
        attendees:
          attendeesList.length > 0
            ? attendeesList.map((email) => ({ email }))
            : undefined,
        conferenceData: isGoogleMeet
          ? {
              createRequest: {
                requestId: "some-random-string",
                conferenceSolutionKey: {
                  type: "hangoutsMeet",
                },
              },
            }
          : undefined,
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 10 },
            { method: "popup", minutes: 5 },
          ],
        },
      };

      await axios.put(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${currentEventId}?conferenceDataVersion=1`,
        event,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      message.success("Event updated");
      notifyUser(`The event "${eventTitle}" has been updated.`);
      setIsModalOpen(false);
      resetModal();
      loadEvents(accessToken);
    } catch (error) {
      message.error("Failed to update event");
    }
  };

  const resetModal = () => {
    setEventTitle("");
    setEventDescription("");
    setEventStartDate(null);
    setEventEndDate(null);
    setIsGoogleMeet(false);
    setAttendees("");
    setCurrentEventId(null);
    setIsEditing(false);
  };

  const filteredUpcomingEvents = events.filter(
    (event) =>
      moment(event.end.dateTime).isAfter(moment()) &&
      event.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPastEvents = events.filter(
    (event) =>
      moment(event.end.dateTime).isBefore(moment()) &&
      event.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPastEvents = filteredPastEvents.slice(
    (currentPastPage - 1) * pageSize,
    currentPastPage * pageSize
  );

  return (
    <div style={{ padding: 20 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Title level={2}>Schedule Meets</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Event
        </Button>
        <Button icon={<ReloadOutlined />} onClick={refreshEvents}>
          Refresh
        </Button>
        <Note />
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          suffix={<SearchOutlined />}
          style={{ margin: "20px 0", maxWidth: "600px" }}
        />
        <Title level={4}>Upcoming Events</Title>
        {/* <List
          loading={isLoading}
          bordered
          dataSource={filteredUpcomingEvents}
          renderItem={(item) => {
            const meetLink = getMeetLink(item);
            return (
              <List.Item
                actions={[
                  meetLink && (
                    <Button
                      key="join"
                      type="primary"
                      onClick={() => joinMeet(meetLink)}
                    >
                      Join Meet
                    </Button>
                  ),
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => handleEditEvent(item)}
                  />,
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => showDeleteConfirm(item.id)}
                  />,
                ].filter(Boolean)}
              >
                <List.Item.Meta
                  title={item.summary}
                  description={
                    <div>
                      <div>{`${moment(item.start.dateTime).format(
                        "MMM DD, YYYY HH:mm"
                      )} - ${moment(item.end.dateTime).format(
                        "MMM DD, YYYY HH:mm"
                      )}`}</div>
                      {meetLink && (
                        <div style={{ marginTop: 8 }}>
                          <Typography.Link href={meetLink} target="_blank">
                            Meet Link: {meetLink}
                          </Typography.Link>
                        </div>
                      )}
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        /> */}
        <List
          loading={isLoading}
          bordered
          dataSource={filteredUpcomingEvents}
          renderItem={(item) => {
            const meetLink = getMeetLink(item);
            return (
              <List.Item
                actions={[
                  meetLink && (
                    <Button
                      key="join"
                      type="primary"
                      icon={<VideoCameraOutlined />} // Added icon
                      onClick={() => joinMeet(meetLink)}
                      style={{
                        background: "#00A36C", // Nice green color for video calls
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      Join Meet
                    </Button>
                  ),
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => handleEditEvent(item)}
                  />,
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => showDeleteConfirm(item.id)}
                  />,
                ].filter(Boolean)}
              >
                <List.Item.Meta
                  title={
                    <Space>
                      {item.summary}
                      {meetLink && (
                        <VideoCameraAddOutlined style={{ color: "#00A36C" }} />
                      )}
                    </Space>
                  }
                  description={
                    <div>
                      <div>{`${moment(item.start.dateTime).format(
                        "MMM DD, YYYY HH:mm"
                      )} - ${moment(item.end.dateTime).format(
                        "MMM DD, YYYY HH:mm"
                      )}`}</div>
                      {meetLink && (
                        <div style={{ marginTop: 8 }}>
                          <Typography.Link
                            href={meetLink}
                            target="_blank"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <LoginOutlined />
                            Meet Link: {meetLink}
                          </Typography.Link>
                        </div>
                      )}
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />

        <Title level={4}>Past Events</Title>
        <List
          loading={isLoading}
          bordered
          // dataSource={filteredPastEvents}
          dataSource={paginatedPastEvents}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.summary}
                description={`${moment(item.start.dateTime).format(
                  "MMM DD, YYYY HH:mm"
                )} - ${moment(item.end.dateTime).format("MMM DD, YYYY HH:mm")}`}
              />
            </List.Item>
          )}
        />
        <Pagination
          current={currentPastPage}
          pageSize={pageSize}
          total={filteredPastEvents.length}
          onChange={(page) => setCurrentPastPage(page)}
          style={{ marginTop: 16, textAlign: "center" }}
        />
      </Space>
      <Modal
        title={isEditing ? "Edit Event" : "Add New Event"}
        open={isModalOpen}
        onOk={isEditing ? updateEvent : addEvent}
        onCancel={() => {
          setIsModalOpen(false);
          resetModal();
        }}
        confirmLoading={isSubmitting}
      >
        <Input
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <Input.TextArea
          rows={4}
          placeholder="Event Description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          style={{ margin: "10px 0" }}
        />
        <Space direction="vertical" style={{ width: "100%" }}>
          <DatePicker
            showTime
            placeholder="Start Date & Time"
            value={eventStartDate}
            onChange={(date) => setEventStartDate(date)}
            style={{ width: "100%", margin: "10px 0" }}
          />
          <DatePicker
            showTime
            placeholder="End Date & Time"
            value={eventEndDate}
            onChange={(date) => setEventEndDate(date)}
            style={{ width: "100%", margin: "10px 0" }}
          />
          <Input
            placeholder="Attendees (comma separated)"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            style={{ margin: "10px 0" }}
          />
          <Space>
            {/* <span>Enable Google Meet?</span> */}
            <Switch
              checked={isGoogleMeet}
              onChange={(checked) => setIsGoogleMeet(checked)}
              checkedChildren="Google Meet"
              unCheckedChildren="No Meet"
            />
          </Space>
        </Space>
      </Modal>
    </div>
  );
};

export default Schedule;
