import { pokemonBaseUrl } from "./constants";

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
  return request(`${pokemonBaseUrl}/${name.toLowerCase()}`);
};

export const fetchPokemonList = () => {
  return request(`${pokemonBaseUrl}?limit=901`).then((data) => data.results);
};
