import React from "react";
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
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="#about" onClick={handleAboutClick}>
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default Navigation;
