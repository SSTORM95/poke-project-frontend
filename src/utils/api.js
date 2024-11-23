import { POKEMON_BASE_URL } from "./constants";

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

export const fetchPokemonList = () => {
  return request(`${POKEMON_BASE_URL}?limit=386`).then((data) => data.results);
};
