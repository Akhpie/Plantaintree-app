import React from "react";
import { Card, Typography } from "antd";

const { Text } = Typography;

const StorageNote = () => {
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
          * Easily store and manage all your files, regardless of type or size.
        </Text>
      </Card>
    </div>
  );
};

export default StorageNote;
