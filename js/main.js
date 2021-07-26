const d = document;
const container = d.querySelector(".game__screen"),
  containerCharacter = d.querySelector(".game__character"),
  input = d.querySelector(".search-pokemon"),
  $btn = d.querySelector(".btn-search");

const searchPokemon = async e => {
  e.preventDefault();
  const nameValue = input.value;
  await fetch(`https://pokeapi.co/api/v2/pokemon/${nameValue}/`)
    .then(res => res.json())
    .then(data => createPoke(data))
    .catch(() => {
      alert(
        "Ha ocurrido un error!, el nombre que pusiste no existe o está mal escrito, recarga de nuevo la página o inténtalo más tarde."
      );
      $btn.disabled = false;
      obstacle.style.animation = "none";
      obstacle.style.display = "none";
    });
  $btn.disabled = true;
  obstacle.classList.add("run");
};

const createPoke = pokemon => {
  img = document.createElement("img");
  img.src = pokemon.sprites.front_default;
  img.classList.add("game__imgPoke");
  containerCharacter.appendChild(img);
};

$btn.addEventListener("click", searchPokemon);

const obstacle = d.querySelector(".game__obstacle"),
  btnJump = d.querySelector(".btn-jump");
let counter = 0;
const jump = () => {
  if (containerCharacter.classList != "jump")
    containerCharacter.classList.add("jump");
  setTimeout(() => {
    containerCharacter.classList.remove("jump");
  }, 400);
  counter++;
};

const CollisionCharacter = () => {
  setInterval(() => {
    const characterTop = parseInt(
        window.getComputedStyle(containerCharacter).getPropertyValue("top")
      ),
      obstacleLeft = parseInt(
        window.getComputedStyle(obstacle).getPropertyValue("left")
      );
    if (obstacleLeft <= -271 && obstacleLeft > -300 && characterTop >= -45) {
      alert(`Has perdido =(, tu puntuación es de ${counter} pts.`);
      obstacle.style.animation = "none";
      obstacle.style.display = "none";
    }
  }, 30);
};
CollisionCharacter();
