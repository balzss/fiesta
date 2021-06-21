import React from "react";

const UserList = ({connectedUsers}) => {
  return (
    <div className="username-container">
      {Object.entries(connectedUsers).map(([_, userInfo]) =>
        <span className={`tag ${userInfo.color_code}`}>{userInfo.user_name}</span>
      )}
    </div>
  );
};

export default UserList;
