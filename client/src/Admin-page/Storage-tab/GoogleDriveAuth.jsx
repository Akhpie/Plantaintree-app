import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  message,
  Typography,
  Modal,
  Upload,
  Select,
  Checkbox,
  Spin,
} from "antd";
import {
  DeleteOutlined,
  ReloadOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { gapi } from "gapi-script";
import StorageNote from "../../components/CustomNotes/StorageNote";

const CLIENT_ID =
  "297028572945-r9nejlf0lsf7pssqmtv0huts1bn8jtac.apps.googleusercontent.com";
const API_KEY = "AIzaSyBrRds6ZSLt9nM9rHFR4c1T0EEQfuWN9d4";
const { Title } = Typography;
const { Dragger } = Upload;
const { Option } = Select;
const { confirm } = Modal;

const GoogleDrive = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [fileType, setFileType] = useState("all");
  const [previewFile, setPreviewFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeGapiClient = () => {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: "https://www.googleapis.com/auth/drive.file",
          })
          .then(() => {
            const authInstance = gapi.auth2.getAuthInstance();
            setIsSignedIn(authInstance.isSignedIn.get());
            authInstance.isSignedIn.listen(setIsSignedIn);

            if (authInstance.isSignedIn.get()) {
              fetchFiles();
            } else {
              authInstance
                .signIn()
                .then(fetchFiles)
                .catch(() => {
                  message.error("Sign-in failed, please try again.");
                });
            }
          })
          .catch((error) => {
            console.error("Error initializing GAPI client", error);
            message.error("Failed to initialize Google API Client.");
          });
      });
    };

    if (!gapi.auth2) {
      initializeGapiClient();
    } else {
      const authInstance = gapi.auth2.getAuthInstance();
      if (authInstance) {
        setIsSignedIn(authInstance.isSignedIn.get());
        if (authInstance.isSignedIn.get()) {
          fetchFiles();
        } else {
          authInstance
            .signIn()
            .then(fetchFiles)
            .catch(() => {
              message.error("Sign-in failed, please try again.");
            });
        }
      } else {
        console.error("gapi.auth2 is not initialized globally.");
      }
    }
  }, []);

  const uploadFiles = async (fileList) => {
    const accessToken = gapi.auth.getToken().access_token;

    for (const file of fileList) {
      const form = new FormData();
      form.append(
        "metadata",
        new Blob([JSON.stringify({ name: file.name, mimeType: file.type })], {
          type: "application/json",
        })
      );
      form.append("file", file);

      try {
        await fetch(
          "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
          {
            method: "POST",
            headers: new Headers({ Authorization: "Bearer " + accessToken }),
            body: form,
          }
        );
      } catch (error) {
        message.error(`Error uploading ${file.name}`);
        console.error(error);
      }
    }

    message.success("Files uploaded successfully!");
    fetchFiles();
  };

  const fetchFiles = async () => {
    setLoading(true);
    const accessToken = gapi.auth.getToken().access_token;

    try {
      const response = await fetch(
        "https://www.googleapis.com/drive/v3/files",
        {
          headers: new Headers({ Authorization: "Bearer " + accessToken }),
        }
      );

      const data = await response.json();
      setFiles(data.files);
      setFilteredFiles(data.files);
    } catch (error) {
      message.error("Error fetching files");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFiles = async (fileIds) => {
    const accessToken = gapi.auth.getToken().access_token;

    try {
      for (const fileId of fileIds) {
        await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
          method: "DELETE",
          headers: new Headers({ Authorization: "Bearer " + accessToken }),
        });
      }

      message.success("Selected files deleted successfully!");
      fetchFiles();
      setSelectedFiles([]);
    } catch (error) {
      message.error("Error deleting selected files");
      console.error(error);
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete these files?",
      content: "Once deleted, these files cannot be recovered.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteFiles(selectedFiles);
      },
      onCancel() {
        console.log("Cancel deletion");
      },
    });
  };

  const handleFileTypeChange = (value) => {
    setFileType(value);
    if (value === "all") {
      setFilteredFiles(files);
    } else {
      const filtered = files.filter((file) => file.mimeType.includes(value));
      setFilteredFiles(filtered);
    }
  };

  const handleSelectFile = (fileId) => {
    setSelectedFiles((prevSelected) =>
      prevSelected.includes(fileId)
        ? prevSelected.filter((id) => id !== fileId)
        : [...prevSelected, fileId]
    );
  };

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedFiles(filteredFiles.map((file) => file.id));
    } else {
      setSelectedFiles([]);
    }
  };

  const handlePreview = (file) => {
    setPreviewFile(file);
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <StorageNote />
      <Title level={2}>Storage Area</Title>
      {isSignedIn ? (
        <>
          <Dragger
            multiple
            accept="*"
            customRequest={({ file, onSuccess }) => {
              uploadFiles([file]);
              onSuccess();
            }}
            style={{ marginBottom: 20 }}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">
              Drag files here or click to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Dragger>
          <Select
            value={fileType}
            onChange={handleFileTypeChange}
            style={{ width: 200, marginBottom: 20, marginRight: 10 }}
          >
            <Option value="all">All Files</Option>
            <Option value="application/pdf">PDF Files</Option>
            <Option value="image/jpeg">JPEG Images</Option>
            <Option value="image/png">PNG Images</Option>
            <Option value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">
              Word Documents
            </Option>
          </Select>
          <Button
            type="default"
            onClick={fetchFiles}
            icon={<ReloadOutlined />}
            style={{ marginBottom: 20 }}
          >
            Refresh Files
          </Button>
          {selectedFiles.length > 0 && (
            <Button
              type="default"
              danger
              ghost
              onClick={showDeleteConfirm}
              style={{ marginBottom: 20, marginLeft: 10 }}
              icon={<DeleteOutlined />}
            >
              Delete Selected Files
            </Button>
          )}
          <Checkbox
            onChange={handleSelectAll}
            checked={selectAll}
            style={{ marginBottom: 20, marginLeft: 10 }}
          >
            Select All
          </Checkbox>
          <Title level={4}>Uploaded Files:</Title>
          {loading ? (
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <Spin size="large" />
            </div>
          ) : (
            <List
              bordered
              dataSource={filteredFiles}
              renderItem={(file) => (
                <List.Item
                  actions={[
                    <Button
                      type="link"
                      icon={<DownloadOutlined />}
                      href={`https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${API_KEY}`}
                      target="_blank"
                    />,
                    <Checkbox
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleSelectFile(file.id)}
                    />,
                  ]}
                >
                  <a onClick={() => handlePreview(file)}>{file.name}</a>
                </List.Item>
              )}
            />
          )}
          <Modal
            title="File Preview"
            open={!!previewFile}
            onCancel={handleClosePreview}
            footer={null}
            width={800}
          >
            {previewFile && (
              <iframe
                src={`https://drive.google.com/file/d/${previewFile.id}/preview`}
                width="100%"
                height="400px"
                title="File Preview"
              />
            )}
          </Modal>
        </>
      ) : (
        <p>Retrieving Files, please reload the page if it takes too long.</p>
      )}
    </div>
  );
};

export default GoogleDrive;
