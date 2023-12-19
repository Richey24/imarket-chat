import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import your AuthContext

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext); // Get current user from context

  // Function to determine message sender
  const isSentByCurrentUser = message.senderId === currentUser.uid;

  // Render the message bubble
  const renderMessageBubble = () => {
    return (
      <div className={`message-bubble ${isSentByCurrentUser ? "sent" : "received"}`}>
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="Message content" className="message-image" />}        {/* Add more conditions here if your message has other types of content */}
      </div>
    );
  };

  return (
    <div className={`message ${isSentByCurrentUser ? "bubble me" : "bubble you"}`}>
      {renderMessageBubble()}
    </div>
  );
};

export default Message;
