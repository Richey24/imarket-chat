import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.user?._id), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.user?._id && getChats();
  }, [currentUser.user?._id]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.keys(chats)?.length >= 1 && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1]?.userInfo)}
        >
          <div className="userChatInfo">
            <span>{chat[1].userInfo?.firstname}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
          <div style={{ backgroundColor: chat[1].status === "online" ? "rgb(99, 235, 99)" : "rgb(205, 177, 177)" }} className="status">
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
