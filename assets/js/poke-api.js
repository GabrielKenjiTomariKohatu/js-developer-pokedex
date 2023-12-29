const pokeApi = {};
const urlApi = "https://pokeapi.co/api/v2/pokemon";

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (res) => {
  return fetch(res.url)
    .then((res) => res.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemonDetailByName = (name) => {
  const url = `${urlApi}/${name}`;
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

pokeApi.getPokemons = (offset, limit) => {
  const url = `${urlApi}?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.results)
    .then((res) => res.map(pokeApi.getPokemonDetail))
    .then((res) => Promise.all(res))
    .then((res) => res)
    .catch((err) => {
      console.log(err);
    });
};
