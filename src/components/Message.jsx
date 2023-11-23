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

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.user._id && "owner"}`}
    >
      <div className="messageInfo">
        <div>{message.senderId === currentUser.user._id ? currentUser.user.firstname : data.user.firstname}</div>
        <span style={{ width: "100px" }}>{new Date(message.date?.seconds * 1000 + message.date?.nanoseconds / 1000000).toLocaleString()}</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
