import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import { generationNames } from "../../utils/constants";
import { capitalize } from "../../utils/capitalizer";

function Main({
  pokemonList,
  error,
  currentGeneration,
  onGenerationChange,
  onPokemonClick,
  handleSearchPokemon,
  notFound,
}) {
  const navigate = useNavigate();
  const [visibleCount, SetVisibleCount] = useState(3);

  const handleItemClick = (pokemon) => {
    onPokemonClick(pokemon);
    navigate(`/pokemon/${pokemon.name}`);
  };

  const handleShowMore = () => {
    SetVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <div>
      <section className="pokemon">
        <h1>Complete Pokédex</h1>
        <h2>
          Already know who are you looking for?{" "}
          <a onClick={handleSearchPokemon}>click here</a>
        </h2>
        <div className="generation__tabs">
          {generationNames.map((gen, index) => (
            <button
              key={index}
              onClick={() => onGenerationChange(index + 1)}
              className={currentGeneration === index + 1 ? "active" : ""}
            >
              {gen}
            </button>
          ))}
        </div>

        {error ? (
          <p>
            Sorry, something went wrong during the request. There may be a
            connection issue or the server may be down. Please try again later.
          </p>
        ) : notFound ? (
          <p>Nothing found</p>
        ) : (
          <ul className="pokemon__list">
            {pokemonList.slice(0, visibleCount).map((pokemon, index) => (
              <li
                className="pokemon__info"
                key={index}
                onClick={() => handleItemClick(pokemon)}
              >
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <h3 className="pokemon__name">
                  {pokemon.id}. {capitalize(pokemon.name)}
                </h3>
              </li>
            ))}
          </ul>
        )}
        {pokemonList.length > visibleCount && !notFound && (
          <button onClick={handleShowMore}>Show more</button>
        )}
      </section>
    </div>
  );
}
export default Main;
