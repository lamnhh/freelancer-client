import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Display list of users that have chatted with the current user.
 * @param {{socket: any}} props
 */
function ChatUserList({ socket }) {
  let [userList, setUserList] = useState([]);

  useEffect(
    function() {
      function onReceiveUserList(userList) {
        setUserList(userList);
      }

      socket.on("user-list", onReceiveUserList);

      return function() {
        socket.off("user-list", onReceiveUserList);
      };
    },
    [socket]
  );

  return (
    <div>
      {userList.map(function({ username }) {
        return (
          <Link to={"/chat/" + username} key={username}>
            <p>{username}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default ChatUserList;
