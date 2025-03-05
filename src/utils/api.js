import { POKEMON_BASE_URL } from "./constants";
import axios from "axios";

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

export const fetchPokemonData = (name) => {
  return request(`${POKEMON_BASE_URL}/${name.toLowerCase()}`);
};
export const fetchPokemonByGeneration = (start, end) => {
  const promises = [];
  for (let i = start; i <= end; i++) {
      promises.push(axios.get(`${POKEMON_BASE_URL}/${i}`));
  }
  return Promise.all(promises).then(responses => responses.map(response => response.data));
};
