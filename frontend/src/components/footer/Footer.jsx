import React from "react";
import "./_footer.scss";
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import { FiGlobe } from "react-icons/fi";
import { BrowserRouter, Router, Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <BrowserRouter>
        <a target="_blank" href="https://github.com/lejodev">
          <AiFillGithub />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/alejandro-rincon-vera-4810b615a/"
        >
          <AiFillLinkedin />
        </a>
        <span>Alejandro Rincon Vera 2021</span>
      </BrowserRouter>
    </footer>
  );
};

export default Footer;
