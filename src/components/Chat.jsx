import React, { useContext, useState, useEffect } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
// import PerfectScrollbar from 'react-perfect-scrollbar'

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const Chat = () => {
  const [activeChat, setActiveChat] = useState(true);

  const { data } = useContext(ChatContext);
  const chatFooterDisplayStyle = data ? { display: 'block' } : { display: 'none' };
 
  useEffect(() => {
    const psChat = new PerfectScrollbar('.chat-conversation-box', {
      suppressScrollX: true
    });

    // Clean up the PerfectScrollbar instance when the component unmounts
    return () => {
      psChat.destroy();
    };
  }, []);

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
    // <div className="chat">
    //   <div className="chatInfo">
    //     <span>{data.user?.firstname}</span>
    //   </div>
   
    //   
    //   
    // </div>
  );
};

export default Chat;


