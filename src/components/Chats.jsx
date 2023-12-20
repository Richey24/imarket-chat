import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState, useRef  } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const endOfMessagesRef = useRef(null); // Ref to the end of the messages

  useEffect(() => {
   
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        doc.data() && setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  useEffect(() => {
    const ps = new PerfectScrollbar('.people', {
      suppressScrollX: true,
    });

     // Scroll to the bottom of the chat container
    //  const chatContainer = document.querySelector('.chat-conversation-box');

    //  if (chatContainer) {
    //    chatContainer.scrollTop = chatContainer.scrollHeight;
    //  }

    // Cleanup function to destroy PerfectScrollbar instance when component unmounts
    return () => {
      ps.destroy();
    };
  }, []);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    endOfMessagesRef.current?.scrollIntoView(false);
  };

  return (
    <>
      {Object.keys(chats)?.length >= 1 && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
          <div className="person" 
                key={chat[0]}  
                onClick={() => handleSelect(chat[1]?.userInfo)}>
                
                <div className="user-info ">
                    <div className="f-head">
                        <img src="/assets/img/avatar-01.png" alt="avatar" />
                    </div>
                  
                    <div className="f-body">
                        <div className="meta-info">
                            <span className="user-name">{chat[1].userInfo?.firstname}</span>
                            <span className="user-meta-time"> { chat[1].status === "online" ? "Online" : "Offline"} <div class="badge badge-primary badge-dot"></div> </span>
                        </div>
                        <span className="preview">{chat[1].lastMessage?.text}</span>
                    </div>
                </div>
          </div>
      ))}
    </>
  );
};

export default Chats;
