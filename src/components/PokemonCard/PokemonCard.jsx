
import "./PokemonCard.css";
import { capitalize } from "../../utils/capitalizer";
import { useNavigate } from "react-router-dom";

function PokemonCard({ pokemon, scrollPosition }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    navigate('/'); // Navigate back to the main page
    if (savedScrollPosition) {
        setTimeout(() => {
            window.scrollTo(0, parseInt(savedScrollPosition)); // Restore the saved scroll position
            sessionStorage.removeItem('scrollPosition'); // Clear the stored scroll position
        }, 0);
    }
  };

  const getTypeClass = (type) => {
    return `pokemon_card ${type}`;
  };

  

  return (
    <div
      className={`pokemon__card ${getTypeClass(pokemon.types[0].type.name)}`}
    >
      <div className="pokemon__card-info">
        <h1 className="pokemon__card-id">#{pokemon.order}</h1>
        <h2 className="pokemon__card-name">{capitalize(pokemon.name)}</h2>

        <img
          className="pokemon__card-image"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="pokemon__card-types">
        <h3 className="types__title">Types:</h3>
        <ul className="types__content">
          {pokemon.types.map((typeInfo) => (
            <li key={typeInfo.type.name}>{capitalize(typeInfo.type.name)}</li>
          ))}
        </ul>
      </div>
      <div className="pokemon__moves">
        <h3 className="moves__title">Moves:</h3>
        <ul className="moves__list">
          {pokemon.moves
            .filter(
              (moveInfo) =>
                moveInfo.version_group_details[0].level_learned_at > 0
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
      </div>
      <div className="button__container">
        <button className="pokemon__card-button" onClick={handleBackClick}>
          Back to Pokedex
        </button>
      </div>
    </div>
  );
}

export default PokemonCard;
