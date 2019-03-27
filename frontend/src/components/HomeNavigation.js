import React from 'react'
import {NavLink} from "react-router-dom";

const HomeNavigation = () => {
    return(
        <div>
            <NavLink to="/group-page">Group Page</NavLink>
            <NavLink to="/ind-group-page">Individual Group Page</NavLink>
            <NavLink to="/create-group">Create Group</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/create-event">Create Event</NavLink>
        </div>
    )
};

export default HomeNavigation;