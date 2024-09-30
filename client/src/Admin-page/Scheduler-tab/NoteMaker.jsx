import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Input,
  DatePicker,
  List,
  message,
  Spin,
  Tag,
  Modal,
  Select,
  Card,
} from "antd";
import moment from "moment";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { gapi } from "gapi-script";
import { Tooltip } from "antd";
import ToDoNote from "../../components/CustomNotes/ToDoNote";

const CLIENT_ID =
  "297028572945-r9nejlf0lsf7pssqmtv0huts1bn8jtac.apps.googleusercontent.com";
const API_KEY = "AIzaSyBrRds6ZSLt9nM9rHFR4c1T0EEQfuWN9d4";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest",
];
const SCOPES = "https://www.googleapis.com/auth/tasks";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDeleteAll, setLoadingDeleteAll] = useState(false);
  const [taskList, setTaskList] = useState("@default");
  const [taskLists, setTaskLists] = useState([
    { id: "@default", title: "Default" },
  ]);
  const [isAddListModalVisible, setIsAddListModalVisible] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const printableListRef = useRef(null);

  const loadTasksAPI = async () => {
    try {
      await gapi.client.load("tasks", "v1");
      loadTasks();
      loadTaskLists();
    } catch (error) {
      message.error("Failed to load Google Tasks API");
    }
  };

  useEffect(() => {
    const initializeGapiClient = () => {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          })
          .then(() => {
            const authInstance = gapi.auth2.getAuthInstance();
            if (authInstance.isSignedIn.get()) {
              loadTasksAPI();
            } else {
              authInstance.signIn().then(loadTasksAPI);
            }
          })
          .catch((error) => {
            console.error("Error initializing gapi client:", error);
            message.error("Failed to initialize Google API client");
          });
      });
    };

    if (!gapi.auth2) {
      initializeGapiClient();
    } else {
      const authInstance = gapi.auth2.getAuthInstance();
      if (authInstance) {
        if (authInstance.isSignedIn.get()) {
          loadTasksAPI();
        } else {
          authInstance.signIn().then(loadTasksAPI);
        }
      } else {
        console.error("gapi.auth2 is not initialized globally.");
      }
    }
  }, [taskList]);

  const loadTasks = () => {
    setLoading(true);
    gapi.client.tasks.tasks
      .list({
        tasklist: taskList,
      })
      .then(
        (response) => {
          const taskItems = response.result.items || [];
          setTasks(taskItems);
          setLoading(false);
        },
        () => {
          message.error("Failed to load tasks");
          setLoading(false);
        }
      );
  };

  const loadTaskLists = () => {
    gapi.client.tasks.tasklists
      .list()
      .then((response) => {
        const lists = response.result.items || [];
        setTaskLists(lists);
      })
      .catch(() => message.error("Failed to load task lists"));
  };

  const addTask = () => {
    const newTaskObj = {
      title: taskTitle,
      notes: taskDescription,
      due: dueDate ? moment(dueDate).toISOString() : null,
    };
    gapi.client.tasks.tasks
      .insert({
        tasklist: taskList,
        resource: newTaskObj,
      })
      .then((response) => {
        setTasks([...tasks, response.result]);
        setTaskTitle("");
        setTaskDescription("");
        setDueDate(null);
        message.success("Task added successfully");
      });
  };

  const confirmDeleteTask = (taskId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this task?",
      onOk: () => deleteTask(taskId),
    });
  };

  const deleteTask = (taskId) => {
    gapi.client.tasks.tasks
      .delete({
        tasklist: taskList,
        task: taskId,
      })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        message.success("Task deleted");
      });
  };

  const deleteAllTasks = () => {
    Modal.confirm({
      title: "Are you sure you want to delete all tasks?",
      content: "This action cannot be undone.",
      onOk: () => {
        setLoadingDeleteAll(true);
        const deletePromises = tasks.map((task) =>
          gapi.client.tasks.tasks.delete({
            tasklist: taskList,
            task: task.id,
          })
        );

        Promise.all(deletePromises)
          .then(() => {
            setTasks([]);
            message.success("All tasks deleted");
          })
          .catch(() => message.error("Failed to delete tasks"))
          .finally(() => setLoadingDeleteAll(false));
      },
    });
  };

  const addNewList = () => {
    setIsAddListModalVisible(true);
  };

  const handleAddListOk = async () => {
    const newListObj = {
      title: newListTitle,
    };

    try {
      const response = await gapi.client.tasks.tasklists.insert({
        resource: newListObj,
      });

      const newList = { id: response.result.id, title: newListTitle };
      setTaskLists([...taskLists, newList]);
      setTaskList(response.result.id);
      message.success("New list created successfully");
      setNewListTitle("");
    } catch (error) {
      console.error("Error creating list:", error);

      if (error && error.status !== 400) {
        message.error("Failed to create new list");
      }
    } finally {
      setIsAddListModalVisible(false);
    }
  };

  const handleAddListCancel = () => {
    setIsAddListModalVisible(false);
    setNewListTitle(""); // Clear input
  };

  const getTagColor = (dueDate) => {
    if (!dueDate) return "blue";
    return moment(dueDate).isBefore(moment()) ? "red" : "blue";
  };

  return (
    <div>
      <ToDoNote />
      <Card
        title="To-Do List"
        style={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "auto",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:gap-4">
          <Input
            placeholder="Enter new task"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full md:w-1/2"
          />
          <Input
            placeholder="Enter task description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full md:w-1/2"
          />
          <DatePicker
            onChange={(_, dateString) => setDueDate(dateString)}
            value={dueDate ? moment(dueDate) : null}
            className="w-full"
          />
          <Button
            type="primary"
            onClick={addTask}
            className="w-full md:w-auto"
            icon={<PlusCircleOutlined />}
          >
            Add Task
          </Button>
        </div>

        <Select
          value={taskList}
          onChange={(value) => {
            if (value === "new") {
              addNewList();
            } else {
              setTaskList(value);
            }
          }}
          style={{ marginBottom: "20px", width: "100%" }}
        >
          {taskLists.map((list) => (
            <Select.Option key={list.id} value={list.id}>
              {list.title}
            </Select.Option>
          ))}
          <Select.Option value="new">Add List</Select.Option>
        </Select>

        <Button
          danger
          type="dashed"
          loading={loadingDeleteAll}
          onClick={deleteAllTasks}
          style={{ marginBottom: "20px" }}
        >
          Delete All Tasks
        </Button>

        <div ref={printableListRef}>
          {loading ? (
            <Spin />
          ) : (
            <List
              bordered
              dataSource={tasks}
              renderItem={(task) => (
                <List.Item
                  actions={[
                    <Tooltip title="Delete Task">
                      <Button
                        type="primary"
                        danger
                        onClick={() => confirmDeleteTask(task.id)}
                        icon={<DeleteOutlined />}
                      ></Button>
                    </Tooltip>,
                  ]}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <strong>{task.title}</strong>
                      <p>{task.notes}</p>
                    </div>
                  </div>
                  {task.due && (
                    <Tag color={getTagColor(task.due)}>
                      {moment(task.due).format("YYYY-MM-DD")}
                    </Tag>
                  )}
                </List.Item>
              )}
            />
          )}

          <Modal
            title="Create New List"
            open={isAddListModalVisible}
            onOk={handleAddListOk}
            onCancel={handleAddListCancel}
          >
            <Input
              placeholder="Enter new list title"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
            />
          </Modal>
        </div>
      </Card>
    </div>
  );
};

export default ToDoList;
