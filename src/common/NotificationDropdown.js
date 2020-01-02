import React, { useState, useEffect, useRef } from "react";
import { request } from "./config";
import NotificationItem from "./NotificationItem";

function NotificationDropdown({ user }) {
  let [notiList, setNotiList] = useState([]);
  useEffect(
    function() {
      request("/api/notification")
        .then(setNotiList)
        .catch(console.log);
    },
    [user]
  );

  let [active, setActive] = useState(false);
  let ref = useRef();
  useEffect(function() {
    function listener(e) {
      let target = e.target;
      console.log("222");
      if (ref.current.contains(target)) {
        setActive(true);
      } else {
        setActive(false);
      }
    }

    window.addEventListener("click", listener);
    return function() {
      window.removeEventListener("click", listener);
    };
  }, []);

  return (
    <button ref={ref} type="button" className="notification-dropdown--trigger">
      <i className="fas fa-bell"></i>
      <div className={"notification-dropdown" + (active ? " active" : "")}>
        <div className="tip"></div>
        <div style={{ maxHeight: "40rem", overflowY: "auto" }}>
          {notiList.map(function(noti) {
            return <NotificationItem key={noti.id} notification={noti}></NotificationItem>;
          })}
        </div>
      </div>
    </button>
  );
}

export default NotificationDropdown;
