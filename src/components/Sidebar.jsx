import {useState, useEffect} from 'react';

import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

const Sidebar = () => {

  const [isUserListBoxVisible, setIsUserListBoxVisible] = useState(false);

  const toggleUserListBox = () => {
    setIsUserListBoxVisible(prevState => !prevState);
  };


  return (
    <>
        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleUserListBox}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            class="feather feather-menu mail-menu d-lg-none">
              <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
                                    {/*  */}

    <div className={`user-list-box ${isUserListBoxVisible ? 'user-list-box-show' : ''}`}>
          
          <Search/>
          <div className="people">
              <Chats />
          </div>
        {/* <Navbar /> */}
        
    </div>
    </>
  )
  }

export default Sidebar;
