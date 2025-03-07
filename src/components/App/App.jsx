import "./App.css";
import { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main.jsx";
import About from "../About/About";
import Footer from "../Footer/Footer";
import PokemonCard from "../PokemonCard/PokemonCard";
import Preloader from "../Preloader/Preloader";
import SearchPokemonModal from "../SearchPokemonModal/SearchPokemonModal";
import { fetchPokemonData, fetchPokemonByGeneration } from "../../utils/api";
import { GENERATION_RANGES } from "../../utils/constants";
import Poké_Ball_icon from "../../images/Poké_Ball_icon.svg";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentGeneration, setCurrentGeneration] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleModalClose = () => {
    setActiveModal("");
  };

  const handleSearchPokemon = () => {
    setActiveModal("search-pokemon");
  };

  const onPokemonSearch = (data) => {
    navigate(`/pokemon/${data.name}`);
  };

  const handleGenerationChange = (generationId) => {
    if (generationId !== currentGeneration) {
      setPokemonList([]); // Clear the pokemonList state
      setCurrentGeneration(generationId);
  
  };}

  const handlePokemonClick = (pokemon) => {
    sessionStorage.setItem('scrollPosition', window.scrollY); 
    navigate(`/pokemon/${pokemon.name}`);
  };

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition));
        }
    setLoading(true);
    const { start, end } = GENERATION_RANGES[currentGeneration - 1];
    fetchPokemonByGeneration(start, end)
        .then(detailedList => {
            setPokemonList(detailedList);
            setLoading(false);
            setNotFound(detailedList.length === 0);
        })
        .catch(error => {
            setError(`Error fetching data: ${error.message}`);
            setLoading(false);
            setNotFound(true);
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
          setNotFound(!data);
        })
        .catch((err) => {
          setError(`Error fetching data: ${err.message}`);
          setLoading(false);
          setNotFound(true);
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
                error={error}
                currentGeneration={currentGeneration}
                onGenerationChange={handleGenerationChange}
                onPokemonClick={handlePokemonClick}
                handleSearchPokemon={handleSearchPokemon}
                notFound={notFound}
                loading={loading}
              />
              <img
                className="pokeball__image"
                src={Poké_Ball_icon}
                alt="pokeball"
              />
              <img
                className="pokeball__image"
                src={Poké_Ball_icon}
                alt="pokeball"
              />
              <About />
            </div>
          }
        />

        <Route
          path="/pokemon/:name"
          element={
            loading ? (
              <Preloader />
            ) : error ? (
              <p className="request__error">
                Sorry, something went wrong during the request. There may be a
                connection issue or the server may be down. Please try again
                later.
              </p>
            ) : notFound ? (
              <p className="request__error">Nothing found</p>
            ) : currentPokemon ? (
              <PokemonCard pokemon={currentPokemon} />
            ) : (
              <p className="request__error">No data found</p>
            )
          } // according to the project documents there isnt a need for a detailed error handling but to display those messages here
          // so chose just to display them like this for a fast and easy way
          // still if got it wrong will totally make the error handling as shown before on the program
        />
      </Routes>
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
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
