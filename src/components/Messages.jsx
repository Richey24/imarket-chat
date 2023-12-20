import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const endOfMessagesRef = useRef(null); // Ref to the end of the messages

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  useEffect(() => {
    setTimeout(() => {
      endOfMessagesRef.current?.scrollIntoView(false);
    }, 1000); // Adjust the timeout as needed
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      endOfMessagesRef.current?.scrollIntoView(false);
    }, 1000); // Adjust the timeout as needed
  }, [messages]);

  return (
    <div className="chat active-chat">
      {/* <div className="conversation-start">
          <span>Today, 6:48 AM</span>
      </div> */}
      
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}

      {/* Invisible element at the end of messages for scrolling */}
      <div ref={endOfMessagesRef} style={{ height: "1px" }} />
    </div>
  );
};

export default Messages;
