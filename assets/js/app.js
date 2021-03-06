console.log(`ola mundo`);

const video = document.querySelectorAll(`.video`);

for (let i = 0; i < video.length; i++) {
  video[i].addEventListener(`mouseenter`, function (e) {
    video[i].play();
  });
  video[i].addEventListener(`mouseleave`, function (e) {
    video[i].pause();
  });
}

const pokemonContainer = document.querySelector(`#gallery`);

function getPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((response) => response.json())
    .then((data) => {
      createPokemon(data);
    });
}

function getPokemones(num) {
  for (let i = 1; i <= num; i++) {
    getPokemon(i);
  }
}

function createPokemon(pokemon) {

  const card = document.createElement(`div`);
  card.classList.add(`pokemon-card`);

  const spriteContainer = document.createElement(`div`);
  spriteContainer.classList.add(`img-container`);

  const sprite = document.createElement(`img`);
  sprite.src = pokemon.sprites.front_default;
  sprite.classList.add(`sprite`);

  const infoContainer = document.createElement(`div`);
  infoContainer.classList.add(`info-container`);

  const name = document.createElement(`p`);
  name.classList.add(`name`);
  name.textContent = pokemon.name;

  const tipos = pokemon.types;

  let tipo = "";
  tipos.forEach((item) => {
    tipo += `<li><img class="type" src="../assets/images/types/${item.type.name}.png"</li>`;
  });

  const tipoPokemon = document.createElement(`ul`);
  tipoPokemon.innerHTML = `${tipo}`;

  card.appendChild(spriteContainer);
  spriteContainer.appendChild(sprite);
  card.appendChild(infoContainer);
  infoContainer.appendChild(name);
  infoContainer.appendChild(tipoPokemon);

  pokemonContainer.appendChild(card);

  const modalImage = document.querySelector(".modal_img")
  modalImage.src = pokemon.sprites.front_default;

  const modalTitle = document.querySelector(".modal_title")
  modalTitle.textContent = pokemon.name

  const modal = document.querySelector(".modal");
  
  const closeModal = document.querySelector(".modal_close");

  card.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("modal-show");
  });

  closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("modal-show");
  });
}

getPokemones(200);
