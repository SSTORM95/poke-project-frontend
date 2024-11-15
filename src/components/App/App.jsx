import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import PokemonCard from "../PokemonCard/PokemonCard";
import SearchPokemonModal from "../SearchPokemonModal/SearchPokemonModal";
import { fetchPokemonList, fetchPokemonData } from "../../utils/api";
import { generationRanges } from "../../utils/constants";

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [currentGeneration, setCurrentGeneration] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState("");
  const [error, setError] = useState(null);

  const handleModalClose = () => {
    setActiveModal("");
  };

  const handleSearchPokemon = () => {
    setActiveModal("search-pokemon");
  };

  const onPokemonSearch = (data) => {
    setPokemonData(data);
  };

  const handleGenerationChange = (generationId) => {
    setCurrentGeneration(generationId);
  };

  useEffect(() => {
    setLoading(true);
    fetchPokemonList()
      .then((list) => {
        return Promise.all(
          list.map((pokemon) => fetchPokemonData(pokemon.name))
        ).then((detailedList) => {
          const filteredList = detailedList.filter((pokemon) => {
            const id = pokemon.id;
            const range = generationRanges[currentGeneration - 1];
            return id >= range.start && id <= range.end;
          });
          setPokemonList(filteredList);
          setLoading(false);
        });
      })
      .catch((error) => {
        setError(`Error fetching data: ${error.message}`);
        setLoading(false);
      });
  }, [currentGeneration]);
  return (
    <div className="page">
      <div className="page__content">
        <Header handleSearchPokemon={handleSearchPokemon} />
        <Main
          pokemonList={pokemonList}
          loading={loading}
          error={error}
          currentGeneration={currentGeneration}
          onGenerationChange={handleGenerationChange}
        />
        {pokemonData && <PokemonCard pokemon={pokemonData} />}
        <About/>
        <Footer />
      </div>
      {activeModal === "search-pokemon" && (
        <SearchPokemonModal
          isOpen={activeModal === "search-pokemon"}
          handleModalClose={handleModalClose}
          onSearch={onPokemonSearch}
        />
      )}
    </div>
  );
}

export default App;
