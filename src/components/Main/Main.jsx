import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import { GENERATION_NAMES } from "../../utils/constants";
import { capitalize } from "../../utils/capitalizer";
import Preloader from "../Preloader/Preloader";

function Main({
  pokemonList,
  error,
  currentGeneration,
  onGenerationChange,
  onPokemonClick,
  handleSearchPokemon,
  notFound,
  loading,
}) {
  const navigate = useNavigate();

  const handleItemClick = (pokemon) => {
    onPokemonClick(pokemon);
    navigate(`/pokemon/${pokemon.name}`);
  };

  return (
    <div className="pokemon">
      <h1 className="main__title">COMPLETE POKEDEX</h1>
      <h2 className="main__secondary-text">
        Already know who are you looking for?
        <a className="main__text-link" onClick={handleSearchPokemon}>
          click here
        </a>
      </h2>
      <div className={`generation__tabs ${loading ? "loading__padding" : ""}`}>
        {GENERATION_NAMES.map((gen, index) => (
          <button
            key={index}
            onClick={() => onGenerationChange(index + 1)}
            className={
              currentGeneration === index + 1
                ? "active"
                : "generation__tabs-text"
            }
          >
            {gen}
          </button>
        ))}
      </div>

      {error ? (
        <p className="request__error">
          Sorry, something went wrong during the request. There may be a
          connection issue or the server may be down. Please try again later.
        </p>
      ) : notFound ? (
        <p className="request__error">Nothing found</p>
      ) : (
        <>
          {" "}
          {loading ? (
            <Preloader />
          ) : (
            <ul className="pokemon__list">
              {pokemonList.slice(0).map((pokemon, index) => (
                <li
                  className="pokemon__info"
                  key={index}
                  onClick={() => handleItemClick(pokemon)}
                >
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  <h3 className="pokemon__id">#{pokemon.id} </h3>
                  <h3 className="pokemon__name">{capitalize(pokemon.name)}</h3>
                  <ul className="pokemon__types">
                    {pokemon.types.map((typeInfo) => (
                      <li key={typeInfo.type.name}>
                        {capitalize(typeInfo.type.name)}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

    </div>
  );
}

export default Main;
