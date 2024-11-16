import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({handleSearchPokemon}) {
  return (
    <header className="header">
      <h1 className="header__text">
        Poke <span className="highlight">-</span> World
      </h1>
      <Navigation/>
      <button
              onClick={handleSearchPokemon}
              className="header__search-pokemon-btn"
              type="button"
            >
              Search Pokemon
            </button>
          
    </header>
  );
}

export default Header;



