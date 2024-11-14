import React from "react";
import "./PokemonCard.css";
import { capitalize } from "../utils/capitalizer";

function PokemonCard({ pokemon, locationData }) {
  return (
    <div className="pokemon__card">
      <h2 className="pokemon__name">{capitalize(pokemon.name)}</h2>
      <h3 className="pokemon__order">{pokemon.order}</h3>
      <img
        className="pokemon__image"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <h3>Moves:</h3>
      <ul className="moves__list">
        {pokemon.moves
          .filter(
            (moveInfo) => moveInfo.version_group_details[0].level_learned_at > 0
          )
          .sort(
            (a, b) =>
              a.version_group_details[0].level_learned_at -
              b.version_group_details[0].level_learned_at
          )
          .map((moveInfo) => (
            <li key={moveInfo.move.name}>
              {capitalize(moveInfo.move.name)} / Level:
              {moveInfo.version_group_details[0].level_learned_at}
            </li>
          ))}
      </ul>
      <h3>Types:</h3>
      <ul>
        {pokemon.types.map((typeInfo) => (
          <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonCard;
