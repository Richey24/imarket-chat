import React, { useContext, useState, useEffect } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const Chat = () => {
  const { data } = useContext(ChatContext);
  const chatFooterDisplayStyle = data ? { display: 'block' } : { display: 'none' };
 
  useEffect(() => {
    const psChat = new PerfectScrollbar('.chat-conversation-box', {
      suppressScrollX: true
    });

    // Scroll to the bottom of the chat container
    // const chatContainer = document.querySelector('.chat-conversation-box');

    // if (chatContainer) {
    //   chatContainer.scrollTop = chatContainer.scrollHeight;
    // }

    // Clean up the PerfectScrollbar instance when the component unmounts
    return () => {
      psChat.destroy();
    };
  }, [data]); // The effect should re-run when 'data' changes

  return (
    <>
        <div className="chat-box ">
            <div className="chat-box-inner" style={{ height: '100%'}}>
                <div className="chat-meta-user chat-active" style={chatFooterDisplayStyle} >
                    <div className="current-chat-user-name" >
                        <span>
                            <img src="/assets/img/90x90.jpg" alt="dynamic-image" />
                            <span className="name">
                              {data.user?.firstname}
                            </span>
                        </span>
                    </div>
               </div>
                
                <div className="chat-conversation-box ps">
                    <div id="chat-conversation-box-scroll" className="chat-conversation-box-scroll">
                      <Messages />   
                    </div>
                </div>

                <Input />
            </div>
      </div>
    </>
  );
};

export default Chat;
