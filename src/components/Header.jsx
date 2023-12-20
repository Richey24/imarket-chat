
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

function Header () {
    const { currentUser } = useContext(AuthContext);
    const [darkmode, setDarkMode] = useState();

    useEffect(() => {

        console.log(currentUser)
        // On component mount, check if a theme is stored and apply it
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.add(savedTheme);
            setDarkMode(savedTheme)
        }
    }, []);

    const handleThemeChange = (option) => {
        // Remove previous theme class if any
        document.body.classList.remove('dark', 'light');

        // Add new theme class
        document.body.classList.add(option);

        // Save the selected theme in local storage
        localStorage.setItem('theme', option);
        setDarkMode(option)
    }


    return <>
        <div className="header-container container-xxl">
            <header className="header navbar navbar-expand-sm expand-header">

                <a href="javascript:void(0);" className="sidebarCollapse" data-placement="bottom"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></a>
                
                <ul className="navbar-item theme-brand flex-row text-center">
                   
                    <li className="nav-item">
                        <a href="#">
                            <img src="/assets/img/logo-white.png" alt="logo" width={80} />
                        </a>
                    </li>

                    <li className="nav-item theme-text">
                        <a href="index.html" className="nav-link"> </a>
                    </li>
                </ul>

                <ul className="navbar-item flex-row ms-lg-auto ms-0 action-area">
                    <li className="nav-item theme-toggle-item">
                        <a href="javascript:void(0);" className="nav-link theme-toggle" >
                            {darkmode === 'dark' ?  
                                 <svg onClick={() => handleThemeChange('light')}  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-moon dark-mode">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            :
                                <svg onClick={() => handleThemeChange('dark')} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-sun light-mode">
                                    <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>'
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                            }
                          </a>

                         
                    </li>

                    <li className="nav-item dropdown notification-dropdown">
                        <a href="javascript:void(0);" className="nav-link dropdown-toggle" id="notificationDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg><span className="badge badge-success"></span>
                        </a>

                        <div className="dropdown-menu position-absolute" aria-labelledby="notificationDropdown">
                            <div className="drodpown-title message">
                                <h6 className="d-flex justify-content-between"><span className="align-self-center">Messages</span> <span className="badge badge-primary">9 Unread</span></h6>
                            </div>
                            <div className="notification-scroll">
                    
                                
                            </div>
                        </div>
                        
                    </li>

                    <li className="nav-item dropdown user-profile-dropdown  order-lg-0 order-1">
                        <a href="javascript:void(0);" className="nav-link dropdown-toggle user" id="userProfileDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div className="avatar-container">
                                <div className="avatar avatar-sm avatar-indicators avatar-online">
                                    <img alt="avatar" src="/assets/img/avatar.png" className="rounded-circle" width="30"/>
                                </div>
                            </div>
                        </a>

                        <div className="dropdown-menu position-absolute" aria-labelledby="userProfileDropdown">
                            <div className="user-profile-section">
                                <div className="media mx-auto">
                                    <div className="emoji me-2">
                                        &#x1F44B;
                                    </div>
                                    <div className="media-body">
                                        <h5>{currentUser.displayName}</h5>
                                        {/* <p>Project Lx÷eader</p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-item">
                                <a href="auth-boxed-lockscreen.html">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> <span>Lock Screen</span>
                                </a>
                            </div>
                            <div className="dropdown-item">
                                <a href="auth-boxed-signin.html">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> <span>Log Out</span>
                                </a>
                            </div>
                        </div>
                        
                    </li>
                </ul>

            </header>
        </div>
    </>
}

export default Header;