import React from "react";
import { Card, Typography } from "antd";

const { Text } = Typography;

const ToDoNote = () => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Card
        style={{
          margin: "10px 0",
          padding: "10px",
          maxWidth: "800px",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto Mono, Courier, monospace",
            fontSize: "16px",
            color: "#333",
          }}
        >
          • Manage your tasks efficiently with the To-Do list. <br />• Add,
          edit, and delete tasks to keep track of what needs to be done. <br />•
          Mark tasks as complete and view your progress on ongoing projects.
          <br />• Organize tasks by priority and deadlines for better time
          management.
        </Text>
      </Card>
    </div>
  );
};

export default ToDoNote;
