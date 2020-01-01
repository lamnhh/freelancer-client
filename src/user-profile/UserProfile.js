import React, { useContext, useCallback } from "react";
import AppContext from "../AppContext";
import { request } from "../common/config";

function UserProfile() {
  let { user, setUser } = useContext(AppContext);

  let onUpdate = useCallback(
    function(e) {
      e.preventDefault();

      let fullname = e.target.fullname.value;
      let email = e.target.email.value;
      let phone = e.target.phone.value;
      let bio = e.target.bio.value;
      let citizen_id = e.target.citizen_id.value;

      request("/api/account", {
        method: "PATCH",
        body: JSON.stringify({
          fullname,
          email,
          phone,
          bio,
          citizen_id
        })
      })
        .then(function(user) {
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          alert("Update successfully");
        })
        .catch(function({ message }) {
          alert(message);
        });
    },
    [setUser]
  );

  if (user === null) {
    return null;
  }
  return (
    <div className="user-profile--wrapper">
      <h2>{user.username}</h2>
      <form className="user-profile" onSubmit={onUpdate}>
        <label>
          <span>Full name</span>
          <input type="text" name="fullname" defaultValue={user.fullname}></input>
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" defaultValue={user.email}></input>
        </label>
        <label>
          <span>Phone number</span>
          <input type="text" name="phone" defaultValue={user.phone}></input>
        </label>
        <label>
          <span>Citizen ID</span>
          <input type="text" name="citizen_id" defaultValue={user.citizen_id}></input>
        </label>
        <label className="bio">
          <span>Bio</span>
          <textarea name="bio" defaultValue={user.bio}></textarea>
        </label>
        <div className="submit-btn--wrapper">
          <button type="submit" className="submit-btn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
