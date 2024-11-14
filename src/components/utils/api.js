const pokemonBaseUrl = "https://pokeapi.co/api/v2/pokemon";

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
