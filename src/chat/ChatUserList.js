import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

/**
 * Display list of users that have chatted with the current user.
 * @param {{socket: any}} props
 */
function ChatUserList({ socket, receiver }) {
  let [userList, setUserList] = useState([]);
  let history = useHistory();

  useEffect(
    function() {
      function onReceiveUserList(userList) {
        setUserList(userList);
        if (userList.length > 0 && !receiver) {
          history.push("/chat/" + userList[0].username);
        }
      }

      socket.on("user-list", onReceiveUserList);

      return function() {
        socket.off("user-list", onReceiveUserList);
      };
    },
    [socket, history, receiver]
  );

  return (
    <div className="chat-user-list">
      {userList.map(function({ username }) {
        return (
          <Link
            to={"/chat/" + username}
            key={username}
            className={receiver === username ? "active" : ""}>
            <img
              alt=""
              src="https://ichef.bbci.co.uk/news/410/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg"></img>
            <p>{username}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default ChatUserList;
