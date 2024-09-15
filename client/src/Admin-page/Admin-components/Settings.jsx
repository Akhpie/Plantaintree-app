// import React, { useState } from "react";
// import { Switch, Alert } from "antd";

// const Settings = () => {
//   const [isMaintenance, setIsMaintenance] = useState(false);

//   // Toggle the maintenance mode
//   const handleToggle = (checked) => {
//     setIsMaintenance(checked);
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Settings</h2>

//       <div style={styles.toggleContainer}>
//         <span>Main Website Maintenance Mode</span>
//         <Switch
//           checked={isMaintenance}
//           onChange={handleToggle}
//           checkedChildren="On"
//           unCheckedChildren="Off"
//           style={styles.toggleSwitch}
//         />
//       </div>

//       {isMaintenance && (
//         <Alert
//           message="Maintenance Mode Enabled"
//           description="The main website is currently in maintenance mode."
//           type="warning"
//           showIcon
//           style={styles.alertBox}
//         />
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "20px",
//     backgroundColor: "#f0f2f5",
//     borderRadius: "5px",
//   },
//   toggleContainer: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "20px",
//   },
//   toggleSwitch: {
//     marginLeft: "20px",
//   },
//   alertBox: {
//     marginTop: "20px",
//   },
// };

// export default Settings;
import React from "react";
import { Card } from "antd";
import LanguageSetting from "../Admin-settings/LanguageSetting";
import TimeZoneSetting from "../Admin-settings/TimeZoneSetting";
import DateTimeFormatSetting from "../Admin-settings/DateTimeFormatSetting";

const SettingsPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Card title="Settings" bordered={false} style={{ width: 400 }}>
        <LanguageSetting />
        <TimeZoneSetting />
        <DateTimeFormatSetting />
      </Card>
    </div>
  );
};

export default SettingsPage;
