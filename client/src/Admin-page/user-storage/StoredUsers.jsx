import React, { useState } from "react";
import AdminLogin from "../AdminLogin";
import Users from "../Admin-components/Users";

const StoredUsers = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const validUsers = ["admin123@gmail.com", "akhya1819@gmail.com"];
  console.log("Valid Users in StoredUsers:", validUsers);

  return (
    <div>
      {!isAuthenticated ? (
        <AdminLogin
          setIsAuthenticated={setIsAuthenticated}
          validUsers={validUsers}
        />
      ) : (
        <Users validUsers={validUsers} />
      )}
    </div>
  );
};

export default StoredUsers;
