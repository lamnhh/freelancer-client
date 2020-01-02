import React, { useState, useEffect, useCallback, useRef } from "react";

/**
 * Display chat box between current user and `receiver`.
 * @param {{socket: any, receiver: String}} props
 */
function ChatBox({ socket, receiver }) {
  let [messageList, setMessageList] = useState([]);
  let messageBox = useRef();

  useEffect(
    function() {
      if (typeof receiver === "undefined") {
        return;
      }
      function onReceiveMessageList(username, messageList) {
        setMessageList((p) => p.concat(messageList));
        messageBox.current.scrollTop = messageBox.current.scrollHeight;
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
      e.target.content.value = "";
      socket.emit("send", receiver, content);
    },
    [socket, receiver]
  );

  return (
    <div className="chat-box">
      <div
        ref={messageBox}
        style={{
          maxHeight: "70rem",
          overflowY: "auto"
        }}>
        <div className="chat-box__message-list">
          {messageList.map(function(message) {
            return (
              <div key={message.id} className={message.username_from === receiver ? "other" : ""}>
                <span>{message.content}</span>
              </div>
            );
          })}
        </div>
      </div>
      <hr></hr>
      <form onSubmit={onSendMessage}>
        <input type="text" name="content" placeholder="Type a message..."></input>
        <button type="submit">
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
