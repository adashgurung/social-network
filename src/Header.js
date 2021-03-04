import React from "react";
import logo from "./logo.svg";
import { green } from "@material-ui/core/colors";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { useStateValue } from "./StateProvider";
import { Avatar, Button } from "@material-ui/core";
import { auth } from "./firebase";
import { IconButton } from "@material-ui/core";
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp";

function Header() {
  const [{ user }, dispatch] = useStateValue();

  const signOut = (e) => {};

  return (
    <div className="app__header">
      <div className="header__search">
        <SearchIcon />
        <input placeholder="Search me" type="text" />
      </div>

      <div className="header__nametitle">
        <h1>Social Network</h1>
        <img src={logo} className="app__logo" alt="logo" />
      </div>

      <div className="header__right">
        <div className="header__avatar">
          <Avatar src={user.photoURL} />
          <h4>{user.displayName}</h4>
        </div>

        {/*  <IconButton style={{ color: green }}>
          <ExitToAppSharpIcon onClick={() => auth.signOut()} />
        </IconButton> */}

        {/*      <Button onClick={signOut} type="submit">
          Sign out
        </Button> */}
      </div>
    </div>
  );
}

export default Header;
