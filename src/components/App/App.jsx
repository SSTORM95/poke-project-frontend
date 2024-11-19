import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import PokemonCard from "../PokemonCard/PokemonCard";
import SearchPokemonModal from "../SearchPokemonModal/SearchPokemonModal";
import { fetchPokemonList, fetchPokemonData } from "../../utils/api";
import { generationRanges } from "../../utils/constants";
import Poké_Ball_icon from "../../images/Poké_Ball_icon.svg"

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [currentGeneration, setCurrentGeneration] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleModalClose = () => {
    setActiveModal("");
  };

  const handleSearchPokemon = () => {
    setActiveModal("search-pokemon");
  };

  const onPokemonSearch = (data) => {
    setPokemonData(data);
    navigate(`/pokemon/${data.name}`);
  };

  const handleGenerationChange = (generationId) => {
    setCurrentGeneration(generationId);
  };

  const handlePokemonClick = (pokemon) => {
    setPokemonData(pokemon);
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

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const name = pathSegments.length > 2 ? pathSegments[2] : null;
    if (name) {
      setLoading(true);
      fetchPokemonData(name)
        .then((data) => {
          setCurrentPokemon(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(`Error fetching data: ${err.message}`);
          setLoading(false);
        });
    }
  }, [location]);
  return (
    <div className="page">
      <Header handleSearchPokemon={handleSearchPokemon} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="page__content">
              <Main
                pokemonList={pokemonList}
                loading={loading}
                error={error}
                currentGeneration={currentGeneration}
                onGenerationChange={handleGenerationChange}
                onPokemonClick={handlePokemonClick}
                handleSearchPokemon={handleSearchPokemon}
              />
              <About />
            </div>
          }
        />

        <Route
          path="/pokemon/:name"
          element={
            currentPokemon ? (
              <PokemonCard pokemon={currentPokemon} />
            ) : (
              <p>Loading...</p>
            )
          }
        />
      </Routes>
      <img className="pokeball__image" src={Poké_Ball_icon} alt="pokeball" />
      <img className="pokeball__image" src={Poké_Ball_icon} alt="pokeball" />
      <Footer />

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
function AppWrapper() {
  return (
    <Router >
     
      <App />
    </Router>
  );
}

export default AppWrapper;
