import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const showLargeImage = (img) => {
    document.getElementById("theImage").src = img
    document.getElementById("imageOverlay").classList.add("showImg")
  }

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.user._id && "owner"}`}
    >
      <div style={{ backgroundColor: message.senderId === currentUser.user._id ? "#0d2984" : "green" }} className="initial">
        {message.senderId === currentUser.user._id ? currentUser.user?.firstname.charAt(0) : data.user?.firstname.charAt(0)}
      </div>
      <div>
        <div className="messageInfo">
          <div>{message.senderId === currentUser.user._id ? currentUser.user.firstname : data.user.firstname}</div>
          <span>{new Date(message.date?.seconds * 1000 + message.date?.nanoseconds / 1000000).toLocaleString()}</span>
        </div>
        <div className="messageContent">
          {message.text && <p>{message.text}</p>}
          {message.img && <img onClick={() => showLargeImage(message.img)} src={message.img} alt="" />}
        </div>
      </div>
    </div>
  );
};

export default Message;
