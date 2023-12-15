import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  console.log(data);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const showLargeImage = (img) => {
    document.getElementById("theImage").src = img
    document.getElementById("imageOverlay").classList.add("showImg")
  }

  return (
    <>
      {message.senderId === currentUser.uid ? (
            // Render this if the sender ID matches the current user's ID
            <div className="bubble me">
                  {message.text && <>{message.text}</>}
                  {message.img && <img onClick={() => showLargeImage(message.img)} src={message.img} alt="" />}
            </div>
        ) : (
            // Render this otherwise
            <div className="bubble you">
                 {message.text && <>{message.text}</>}
                 {message.img && <img onClick={() => showLargeImage(message.img)} src={message.img} alt="" />}
            </div>
        )}
    
    </>
  );
};

export default Message;
