import React from "react";
import "./_header.scss";
import {
  Link,
  BrowserRouter as Router,
  browserHistory,
  Route,
  Redirect,
} from "react-router-dom";

const Header = (props) => {
  return (
    <header className="header">
      <nav>
        <Link to="/" className="link">DELIVERY SERVICES</Link>
      </nav>
    </header>
  );
};

export default Header;
