import React from "react";
import GoogleDriveAuth from "./GoogleDriveAuth";
import ErrorBoundary from "../ini/ErrorBoundary";

const Storage = () => {
  return (
    <>
      <ErrorBoundary>
        <GoogleDriveAuth />
      </ErrorBoundary>
    </>
  );
};

export default Storage;
