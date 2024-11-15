import "./Header.css";


function Header({handleSearchPokemon}) {
  return (
    <header className="header">
      <h1 className="header__text">
        Poke <span className="highlight">-</span> World
      </h1>
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



