import React, { useState, useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  TimePicker,
  Select,
  message,
  Spin,
  Switch,
  Space,
  Alert,
  Radio,
  Collapse,
} from "antd";
import { initGoogleAuth, getAccessToken } from "../ini/AuthService";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/en_US";
import { gapi } from "gapi-script";
import WorldTimeBuddyWidget from "./WorldTimeWidget";

const { TextArea } = Input;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const timeZones = [
  { label: "Indian Standard Time (IST)", value: "Asia/Kolkata" },
  { label: "Pacific Standard Time (PST)", value: "America/Los_Angeles" },
  { label: "Eastern Standard Time (EST)", value: "America/New_York" },
];

const reminderOptions = [
  { label: "30 minutes before", value: 30 },
  { label: "1 hour before", value: 60 },
  { label: "2 hours before", value: 120 },
  { label: "1 day before", value: 1440 },
  { label: "2 days before", value: 2880 },
  { label: "1 week before", value: 10080 },
];

const recurringOptions = [
  { label: "Daily", value: "DAILY" },
  { label: "Weekly", value: "WEEKLY" },
  { label: "Monthly", value: "MONTHLY" },
];

const OutOfOfficeEventForm = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [conflicts, setConflicts] = useState([]);
  const [isCheckingConflicts, setIsCheckingConflicts] = useState(false);

  // Check for calendar conflicts
  const checkConflicts = async (startTime, endTime, recurrence = null) => {
    setIsCheckingConflicts(true);
    try {
      const authResponse = await initGoogleAuth();
      const accessToken = authResponse
        ? authResponse.access_token
        : getAccessToken();
      if (!accessToken) throw new Error("No access token available.");

      gapi.client.setToken({ access_token: accessToken });
      if (!gapi.client.calendar) {
        await gapi.client.load("calendar", "v3");
      }

      // Get events within the time range
      const response = await gapi.client.calendar.events.list({
        calendarId: "primary",
        timeMin: startTime,
        timeMax: endTime,
        singleEvents: true,
        orderBy: "startTime",
      });

      const events = response.result.items;
      if (events && events.length > 0) {
        return events.filter((event) => event.status !== "cancelled");
      }
      return [];
    } catch (error) {
      console.error("Error checking conflicts:", error);
      return [];
    } finally {
      setIsCheckingConflicts(false);
    }
  };

  // Handle form value changes
  const onValuesChange = async (changedValues, allValues) => {
    if (
      changedValues.date ||
      changedValues.start ||
      changedValues.end ||
      changedValues.isRecurring
    ) {
      if (allValues.date && allValues.start && allValues.end) {
        const startDateTime = `${allValues.date.format(
          "YYYY-MM-DD"
        )}T${allValues.start.format("HH:mm:ss")}`;
        const endDateTime = `${allValues.date.format(
          "YYYY-MM-DD"
        )}T${allValues.end.format("HH:mm:ss")}`;
        const conflictEvents = await checkConflicts(startDateTime, endDateTime);
        setConflicts(conflictEvents);
      }
    }
  };

  const createOutOfOfficeEvent = async (values) => {
    setIsLoading(true);

    const startDateTime =
      values.date.format("YYYY-MM-DD") + "T" + values.start.format("HH:mm:ss");
    const endDateTime =
      values.date.format("YYYY-MM-DD") + "T" + values.end.format("HH:mm:ss");
    const selectedTimeZone = values.timeZone || "Asia/Kolkata";

    // Prepare the event description
    const defaultMessage = "I am unavailable for meetings during this period.";
    const customMessage = values.customMessage
      ? values.customMessage.trim()
      : "";
    const eventDescription = customMessage || defaultMessage;

    try {
      const authResponse = await initGoogleAuth();
      const accessToken = authResponse
        ? authResponse.access_token
        : getAccessToken();
      if (!accessToken) throw new Error("No access token available.");

      gapi.client.setToken({ access_token: accessToken });
      if (!gapi.client.calendar) {
        await gapi.client.load("calendar", "v3");
      }

      // Prepare attendees array
      const attendees = values.emails
        ? values.emails.split(",").map((email) => ({
            email: email.trim(),
            responseStatus: "needsAction",
          }))
        : [];

      // Prepare recurrence rule if enabled
      let recurrence = null;
      if (
        values.isRecurring &&
        values.recurringType &&
        values.recurringEndDate
      ) {
        const untilDate = values.recurringEndDate.format("YYYYMMDD");
        recurrence = [
          `RRULE:FREQ=${values.recurringType};UNTIL=${untilDate}T235959Z`,
        ];
      }

      // Prepare reminders
      const reminderOverrides = values.reminders
        ? values.reminders.map((minutes) => ({
            method: minutes >= 1440 ? "email" : "popup",
            minutes: minutes,
          }))
        : [{ method: "popup", minutes: 30 }];

      // Insert the event
      const response = await gapi.client.calendar.events.insert({
        calendarId: "primary",
        sendUpdates: "all",
        resource: {
          summary: "Out of Office",
          description: eventDescription,
          start: {
            dateTime: startDateTime,
            timeZone: selectedTimeZone,
          },
          end: {
            dateTime: endDateTime,
            timeZone: selectedTimeZone,
          },
          attendees: attendees,
          transparency: "opaque",
          reminders: {
            useDefault: false,
            overrides: reminderOverrides,
          },
          recurrence: recurrence,
          guestsCanSeeOtherGuests: true,
          guestsCanModify: false,
          status: "confirmed",
        },
      });

      if (response.status === 200) {
        message.success(
          "Out of Office event created and invitations sent successfully!"
        );
        form.resetFields();
        form.setFieldsValue({
          date: dayjs(),
          start: dayjs().hour(9).minute(0),
          end: dayjs().hour(17).minute(0),
          timeZone: "Asia/Kolkata",
        });
        setConflicts([]);
      } else {
        throw new Error(
          "Event creation failed with status: " + response.status
        );
      }
    } catch (error) {
      console.error("Error creating event:", error);
      message.error(
        "Failed to create event: " +
          (error.result?.error?.message || error.message || "Unknown error")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = (values) => {
    if (values.emails) {
      const emailList = values.emails.split(",").map((email) => email.trim());
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const invalidEmails = emailList.filter(
        (email) => !emailRegex.test(email)
      );

      if (invalidEmails.length > 0) {
        message.error(`Invalid email format: ${invalidEmails.join(", ")}`);
        return;
      }
    }

    if (conflicts.length > 0) {
      if (
        !window.confirm(
          "There are conflicts with existing events. Do you want to proceed anyway?"
        )
      ) {
        return;
      }
    }

    createOutOfOfficeEvent(values);
  };

  return (
    <>
      {/* <WorldTimeBuddyWidget /> */}
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "2rem",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.6rem",
            marginBottom: "1.5rem",
          }}
        >
          Schedule Unavailability
        </h2>
        <Form
          form={form}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          layout="vertical"
          initialValues={{
            date: dayjs(),
            start: dayjs().hour(9).minute(0),
            end: dayjs().hour(17).minute(0),
            timeZone: "Asia/Kolkata",
            isRecurring: false,
            reminders: [30],
          }}
        >
          {/* Basic Info Section */}
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date!" }]}
            style={{ marginBottom: "1.5rem" }}
          >
            <DatePicker
              locale={locale}
              style={{ width: "100%", borderRadius: "4px" }}
            />
          </Form.Item>

          <Space
            style={{
              width: "100%",
              display: "flex",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <Form.Item
              label="Start Time"
              name="start"
              rules={[
                { required: true, message: "Please select a start time!" },
              ]}
              style={{ flex: 1 }}
            >
              <TimePicker
                locale={locale}
                format="HH:mm"
                style={{ width: "100%", borderRadius: "4px" }}
              />
            </Form.Item>

            <Form.Item
              label="End Time"
              name="end"
              rules={[
                { required: true, message: "Please select an end time!" },
              ]}
              style={{ flex: 1 }}
            >
              <TimePicker
                locale={locale}
                format="HH:mm"
                style={{ width: "100%", borderRadius: "4px" }}
              />
            </Form.Item>
          </Space>

          <Form.Item
            label="Time Zone"
            name="timeZone"
            rules={[{ required: true, message: "Please select a timezone!" }]}
            style={{ marginBottom: "1.5rem" }}
          >
            <Select
              options={timeZones}
              style={{ width: "100%", borderRadius: "4px" }}
            />
          </Form.Item>

          {/* Recurring Options */}
          <Collapse bordered={false} style={{ marginBottom: "1.5rem" }}>
            <Panel
              header="Recurring Options"
              key="recurring"
              style={{ fontSize: "16px" }}
            >
              <Form.Item
                label="Make this a recurring event"
                name="isRecurring"
                valuePropName="checked"
              >
                <Switch onChange={setIsRecurring} />
              </Form.Item>

              {isRecurring && (
                <>
                  <Form.Item
                    label="Recurring Type"
                    name="recurringType"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please select how often this event should repeat!",
                      },
                    ]}
                  >
                    <Radio.Group options={recurringOptions} />
                  </Form.Item>

                  <Form.Item
                    label="End Date"
                    name="recurringEndDate"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please select when the recurring events should end!",
                      },
                    ]}
                  >
                    <DatePicker
                      locale={locale}
                      disabledDate={(current) =>
                        current && current < dayjs().endOf("day")
                      }
                    />
                  </Form.Item>
                </>
              )}
            </Panel>

            {/* Notification Options */}
            <Panel
              header="Notification Settings"
              key="notifications"
              style={{ fontSize: "16px" }}
            >
              <Form.Item
                label="Reminders"
                name="reminders"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one reminder!",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  options={reminderOptions}
                  placeholder="Select reminder times"
                  style={{ width: "100%", borderRadius: "4px" }}
                />
              </Form.Item>
            </Panel>
          </Collapse>

          {/* Custom Message */}
          <Form.Item
            label="Custom Message (Optional)"
            name="customMessage"
            help="Leave blank to use default message: 'I am unavailable for meetings during this period.'"
            style={{ marginBottom: "1.5rem" }}
          >
            <TextArea
              rows={4}
              placeholder="Enter your custom out of office message"
              maxLength={500}
              showCount
              style={{ borderRadius: "4px" }}
            />
          </Form.Item>

          {/* Email Notifications */}
          <Form.Item
            label="Notify Contacts (Emails)"
            name="emails"
            rules={[
              {
                pattern:
                  /^[^\s@]+@[^\s@]+\.[^\s@]+(,\s*[^\s@]+@[^\s@]+\.[^\s@]+)*$/,
                message: "Please enter valid comma-separated email addresses",
              },
            ]}
            style={{ marginBottom: "1.5rem" }}
          >
            <Input
              placeholder="Enter comma-separated emails (e.g., user1@example.com, user2@example.com)"
              style={{ borderRadius: "4px" }}
            />
          </Form.Item>

          {/* Conflict Alerts */}
          {isCheckingConflicts && (
            <Alert
              message="Checking for conflicts..."
              type="info"
              showIcon
              style={{ marginBottom: "1rem" }}
            />
          )}

          {conflicts.length > 0 && (
            <Alert
              message="Calendar Conflicts Detected"
              description={
                <div>
                  The following events conflict with your selected time:
                  <ul>
                    {conflicts.map((event, index) => (
                      <li key={index}>
                        {event.summary} (
                        {dayjs(event.start.dateTime).format("HH:mm")} -
                        {dayjs(event.end.dateTime).format("HH:mm")})
                      </li>
                    ))}
                  </ul>
                </div>
              }
              type="warning"
              showIcon
              style={{ marginBottom: "1rem" }}
            />
          )}

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", padding: "0.75rem", borderRadius: "4px" }}
              disabled={isLoading}
            >
              {isLoading ? <Spin /> : "Set Out of Office"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default OutOfOfficeEventForm;
