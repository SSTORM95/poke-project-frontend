import "./App.css";
import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PokemonCard from "../PokemonCard/PokemonCard";
import { fetchPokemonData } from "../utils/api";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setPokemonName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    fetchPokemonData(pokemonName)
      .then((data) => setPokemonData(data))
      .catch((error) => setError("Error fetching data: " + error.message));
  };
  
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <div>
          <h1>Pokémon Search</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Pokémon Name:
              <input className="form__input" type="text" value={pokemonName} onChange={handleChange} placeholder="Pokemon Name"/>
            </label>
            <button type="submit">Search</button>
          </form>
          {pokemonData && (
            <PokemonCard pokemon={pokemonData} locationData={locationData} />
          )}{" "}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
