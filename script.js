let data;
let controllerType = 'xbox';

fetch('data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    loadCharacters('characters');
  });

function updateControllerType() {
  const select = document.getElementById('controller-select');
  controllerType = select.value;
}

function convertInput(input) {
  if (controllerType === 'xbox') return input;

  const map = {
    'A': '✕',
    'B': '◯',
    'X': '▢',
    'Y': '△',
    'LT': 'L2',
    'RT': 'R2'
  };

  return input.replace(/\b(A|B|X|Y|LT|RT)\b/g, match => map[match] || match);
}

function loadCharacters(type) {
  const characters = data[type];
  const characterButtonsDiv = document.getElementById('character-buttons');
  const characterDetailsDiv = document.getElementById('character-details');
  const tipsBlock = document.getElementById('beginner-tips');

  if (tipsBlock) tipsBlock.style.display = 'block';

  characterButtonsDiv.innerHTML = '';
  characterDetailsDiv.innerHTML = '';

  characters.forEach(character => {
    const button = document.createElement('button');
    button.textContent = character.name;

    if (type === "characters") {
      button.classList.add("character-button");
      if (character.guest) {
        button.classList.remove("character-button");
        button.classList.add("guest-character");
      }
    } else if (type === "kameos") {
      button.classList.add("kameo-character");
    }

    button.onclick = () => showCharacterDetails(character);
    characterButtonsDiv.appendChild(button);
  });
}


function showCharacterDetails(character) {
  const characterDetailsDiv = document.getElementById('character-details');
  const tipsBlock = document.getElementById('beginner-tips');
  if (tipsBlock) tipsBlock.style.display = 'none';

  characterDetailsDiv.innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}" style="max-width: 300px;">
    <ul>
      ${character.moves.map(move => `
        <li>
          <strong>${move.name}</strong> (${move.input}) — ${move.description}
        </li>
      `).join('')}
    </ul>
  `;
}


