const list = document.getElementById("listPokemon");
const loadMore = document.getElementById("loadMoreButton");
const pokemonInfo = document.getElementById("pokemonInfo");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const pokemonStatus = document.getElementById("pokemonStatus");
const maxRecords = 15;
const limit = 5;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((res = []) => {
    const pokemon = res
      .map(
        (res) =>
          `<li class="pokemon ${res.type}" data-pokemon-id="${res.number}">
            <span class="number">#${res.number}</span>
            <span class="name">${res.name}</span>
            <div class="detail">
               <ol class="types">
                  ${res.types
                    .map((type) => `<li class="type ${type}">${type}</li>`)
                    .join("")}
               </ol>
               <img src="${res.photo}" alt="${res.name}" />
            </div>
           </li>`
      )
      .join("");

    list.innerHTML += pokemon;
    res.forEach((pokemon) => {
      const element = document.querySelector(
        `[data-pokemon-id="${pokemon.number}"]`
      );
      element.addEventListener("click", () => {
        mostrarModal(pokemon);
      });
    });
  });
}

loadPokemonItens(offset, limit);

loadMore.addEventListener("click", () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMore.parentElement.removeChild(loadMore);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function mostrarModal(pokemon) {
  pokeApi.getPokemonDetailByName(pokemon.name).then((res) => {
    pokemonStatus.innerHTML = `
      <div class="pokemon-basic-info">
        <span class="name">${pokemon.name}</span>
        <span class="number">#${pokemon.number}</span>
      </div>
      <ol class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
      </ol>
      <div class="detail">
        <img src="${pokemon.photo}" alt="${pokemon.name}" />
        <div class="info">
          <div class="info-item"><span class="item-base">Name:</span><span class="item-res">${
            pokemon.name
          }</span></div>
          <div class="info-item"><span class="item-base">Number:</span><span class="item-res">${
            res.id
          }</span></div>
          <div class="info-item"><span class="item-base">Base Experience:</span><span class="item-res">${
            res.base_experience
          }</span></div>
          <div class="info-item"><span class="item-base">Weight:</span><span class="item-res">${
            res.weight
          }</span></div>
        </div>
        
      </div>
    `;
    console.log(res);
  });

  modalContent.className += ` ${pokemon.type}`;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}
