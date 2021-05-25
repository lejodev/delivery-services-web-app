import React from "react";
import { Link } from "react-router-dom";
import "./_style.scss";

const Home = () => {
  return (
    <div className="home">
      <main className="main">
        <div className="options">
          <Link className="signIn" to="/signin">
            signIn
          </Link>
          <div className="divider"></div>
          <Link className="logIn" to="/login">
            logIn
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;