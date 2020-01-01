import React, { useEffect, useState } from "react";
import SocketClient from "socket.io-client";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../common/config";
import ChatUserList from "./ChatUserList";
import ChatBox from "./ChatBox";

function ChatPage() {
  let [socket] = useState(
    SocketClient(BACKEND_URL, {
      query: {
        token: localStorage.getItem("token")
      }
    })
  );
  let { username } = useParams();

  // Initialize connection to Socket.IO
  useEffect(
    function() {
      return function() {
        socket.disconnect();
      };
    },
    [socket]
  );

  return (
    <div className="gray-bg align-left-right">
      <div className="chat-page">
        <ChatUserList socket={socket} receiver={username}></ChatUserList>
        <ChatBox socket={socket} receiver={username}></ChatBox>
      </div>
    </div>
  );
}

export default ChatPage;
