import React, { useState } from 'react';
import { fetchPokemonData } from '../../utils/ThirdPartyApi';
import ModalWithForm from '../ModalWithForm/ModalWithForm';


function SearchPokemonModal({ handleModalClose, onSearch, isOpen }) {
    const [pokemonName, setPokemonName] = useState('');
    

    const handleChange = (event) => {
        setPokemonName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchPokemonData(pokemonName)
            .then((data) => onSearch(data))
            .then(handleModalClose)
            .catch((error) => console.error(`Error fetching data: ${error.message}`));
    };

    return (
        <ModalWithForm
      title="Pokémon Search"
      buttonText="Catch`em"
      isOpen={isOpen}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
      Pokémon Name:
        <input
          type="Text"
          placeholder="Pokemon Name"
          value={pokemonName}
          onChange={handleChange}
          required
          className="modal__input"
        />
      </label>
    </ModalWithForm>
    );
}

export default SearchPokemonModal;

