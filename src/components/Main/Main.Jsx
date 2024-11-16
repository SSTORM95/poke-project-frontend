import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import { generationNames } from "../../utils/constants";
import { capitalize } from "../../utils/capitalizer";

function Main({
  pokemonList,
  loading,
  error,
  currentGeneration,
  onGenerationChange,
  onPokemonClick,
  handleSearchPokemon
}) {
  const navigate = useNavigate();

  const handleItemClick = (pokemon) => {
    onPokemonClick(pokemon);
    navigate(`/pokemon/${pokemon.name}`);
  };
  return (
    <div>
      <section className="pokemon">
        <h1>Complete Pokédex</h1>
        <h2>Already know who are you looking for? <a onClick={handleSearchPokemon}>click here</a></h2>
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

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul className="pokemon__list">
            {pokemonList.map((pokemon, index) => (
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
      </section>
    </div>
  );
}
export default Main;
