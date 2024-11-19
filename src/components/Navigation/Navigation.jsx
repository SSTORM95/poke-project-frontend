import React from "react";
import "./Navigation.css"
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const handleAboutClick = (event) => {
    event.preventDefault();
    navigate("/");
    setTimeout(() => {
      document.getElementById("about").scrollIntoView({ behavior: "smooth" });
    }, 0);
  };
  return (
    <nav>
      <ul className="navigation">
        <li className="navigation__links">
          <Link className="navigation__links" to="/">Home</Link>
        </li>
        <li >
          <a className="navigation__links" href="#about" onClick={handleAboutClick}>
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default Navigation;
