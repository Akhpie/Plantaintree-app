import React, { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch the authenticated users when the component mounts
  useEffect(() => {
    const authenticatedUsers =
      JSON.parse(localStorage.getItem("authenticatedUsers")) || [];
    setUsers(authenticatedUsers);
  }, []);

  return (
    <div className="users-list">
      <h2>Authorized Users</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      ) : (
        <p>No authenticated users found.</p>
      )}
    </div>
  );
};

export default Users;
