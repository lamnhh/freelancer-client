import React, { useState, useEffect, useCallback } from "react";

/**
 * Display chat box between current user and `receiver`.
 * @param {{socket: any, receiver: String}} props
 */
function ChatBox({ socket, receiver }) {
  let [messageList, setMessageList] = useState([]);

  useEffect(
    function() {
      if (typeof receiver === "undefined") {
        return;
      }
      function onReceiveMessageList(username, messageList) {
        if (username !== receiver) {
          alert("Wait am inute");
          return;
        }
        setMessageList((p) => p.concat(messageList));
      }

      socket.emit("chat-with", receiver);
      socket.on("message", onReceiveMessageList);

      return function() {
        setMessageList([]);
        socket.off("message", onReceiveMessageList);
      };
    },
    [socket, receiver]
  );

  let onSendMessage = useCallback(
    function(e) {
      e.preventDefault();

      let content = e.target.content.value;
      socket.emit("send", receiver, content);
    },
    [socket, receiver]
  );

  return (
    <div>
      {messageList.map(function(message) {
        return <p key={message.id}>{message.content}</p>;
      })}
      <form onSubmit={onSendMessage}>
        <input type="text" name="content"></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatBox;
