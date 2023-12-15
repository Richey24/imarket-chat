import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

const Sidebar = () => {
  return (
    <div className="user-list-box">
          
          <Search/>
          <div className="people">
              <Chats />
          </div>
        {/* <Navbar /> */}
        
    </div>
  )
  }

export default Sidebar;
