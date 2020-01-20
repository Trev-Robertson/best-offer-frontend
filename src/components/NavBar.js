import React from "react";
import { NavLink } from "react-router-dom";

const link = {
  width: "100px",
  padding: "12px",
  margin: "0 6px 6px",
  background: "blue",
  textDecoration: "none",
  color: "white"
};

const NavBar = (props) => {
  return (
    <div className="navbar">
      { !props.contractor ?
      <div>
      <NavLink
        to="/profile"
        /* set exact so it knows to only set activeStyle when route is deeply equal to link */
        exact
        /* add styling to Navlink */
        style={link}
        /* add prop for activeStyle */
        activeStyle={{
          background: "lightblue"
        }}
      >
        To Profile Page
      </NavLink>
      
      <NavLink
        to="/edit"
        /* set exact so it knows to only set activeStyle when route is deeply equal to link */
        exact
        /* add styling to Navlink */
        style={link}
        /* add prop for activeStyle */
        activeStyle={{
          background: "lightblue"
        }}
      >
        Account Settings
      </NavLink>

      <NavLink
        to="/contractors"
        /* set exact so it knows to only set activeStyle when route is deeply equal to link */
        exact
        /* add styling to Navlink */
        style={link}
        /* add prop for activeStyle */
        activeStyle={{
          background: "lightblue"
        }}
      >
        All Contractors
      </NavLink>
      <NavLink
        onClick={props.logout}
        /* set exact so it knows to only set activeStyle when route is deeply equal to link */
        exact
        /* add styling to Navlink */
        style={link}
        /* add prop for activeStyle */
        activeStyle={{
          background: "lightblue"
        }}
      >
        Log Out
      </NavLink>
      </div>

        : 
        
        <div>
      <NavLink
        to="/contractor"
        /* set exact so it knows to only set activeStyle when route is deeply equal to link */
        exact
        /* add styling to Navlink */
        style={link}
        /* add prop for activeStyle */
        activeStyle={{
          background: "lightblue"
        }}
      >
        To Profile Page
      </NavLink>
      <NavLink
        to="/opentasks"
        /* set exact so it knows to only set activeStyle when route is deeply equal to link */
        exact
        /* add styling to Navlink */
        style={link}
        /* add prop for activeStyle */
        activeStyle={{
          background: "lightblue"
        }}
      >
        View All Available Tasks
      </NavLink>
      <NavLink
        onClick={props.logout}
        /* set exact so it knows to only set activeStyle when route is deeply equal to link */
        exact
        /* add styling to Navlink */
        style={link}
        /* add prop for activeStyle */
        activeStyle={{
          background: "lightblue"
        }}
      >
        Log Out
      </NavLink>
      </div>
        
        
        }



      
  
    </div>
  );
};

export default NavBar;
