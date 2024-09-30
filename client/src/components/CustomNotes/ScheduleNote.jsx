import React from "react";
import { Card, Typography } from "antd";

const { Text } = Typography;

const ScheduleNote = () => {
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
          * Schedule meets with clients and partners at anytime you want to and
          keep a track of upcoming and past events.
        </Text>
      </Card>
    </div>
  );
};

export default ScheduleNote;
