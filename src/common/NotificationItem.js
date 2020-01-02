import React from "react";
import moment from "moment";

function NotificationItem({ notification }) {
  return (
    <div className="notification-dropdown__item">
      <span>{notification.content}</span>
      <span>{moment().to(moment(notification.created_at))}</span>
    </div>
  );
}

export default NotificationItem;
