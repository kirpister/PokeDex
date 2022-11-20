const content = document.querySelector('.container');
const search = document.querySelector('#search');

let pokeData = [];
let gen;
let limit;
let offset;

content.style.visibility = 'hidden';
search.style.visibility = 'hidden';

const fetchData = () => {

url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

fetch(url)
  .then((res) => res.json())
  .then((data) => {

    const fetches = data.results.map(item => {
        return fetch(item.url).then(res => res.json())
    });

    Promise.all(fetches).then((res => {
        let pokemon = res.map((data) => ({
        name: data.name,
        id: data.id,
        image: data.sprites.other['official-artwork'].front_default,
        type: data.types.map((type) => type.type.name).join('')
    }));

      pokeData = res;
      pokeCards(pokeData);

        // localStorage.setItem('pokedata', JSON.stringify(pokeData))
    }));
  
});
};

const pokeCards = () => {
      let cards = pokeData.map((poke) => {
        if (poke.types.length > 1) {
            return `<div class="poke-card">
            <div class="img-wrapper"><img class="poke-img" src="${poke.sprites.other['official-artwork'].front_default}"></div>
            <div class="title"><h3>${poke.name}</h3></div>
            <img class="icon" src="icons/${poke.types[0].type.name}.svg"></img><img class="icon" src="icons/${poke.types[1].type.name}.svg"></img>
            </div>`;
          }
          else if (poke.types.length < 2) {
            return `<div class="poke-card">
            <div class="img-wrapper"><img class="poke-img" src="${poke.sprites.other['official-artwork'].front_default}"></div>
            <div class="title"><h3>${poke.name}</h3></div>
            <img class="icon" src="icons/${poke.types[0].type.name}.svg"></img>
            </div>`;
          }
    }).join('');
    content.innerHTML = cards;
  };

const getGen = (value) => {

  content.style.visibility = 'visible';
  search.style.visibility = 'visible';
    
    gen = value;
    
    switch (gen) {

        case '1':
          limit = 151;
          offset = 0;
            document.querySelector('#genText').innerHTML = `There are ${limit} Pokemons in Generation ${gen}`;
          break;

        case '2':
          limit = 100;
          offset = 151;
            document.querySelector('#genText').innerHTML = `There are ${limit} Pokemons in Generation ${gen}`;
          break;

        case '3':
          limit = 135;
          offset = 251;
            document.querySelector('#genText').innerHTML = `There are ${limit} Pokemons in Generation ${gen}`;
          break;

        case '4':
          limit = 107;
          offset = 386;
            document.querySelector('#genText').innerHTML = `There are ${limit} Pokemons in Generation ${gen}`;
          break;

        case '5':
          limit = 156;
          offset = 493;
            document.querySelector('#genText').innerHTML = `There are ${limit} Pokemons in Generation ${gen}`;
          break;

        case '6':
          limit = 72;
          offset = 649;
            document.querySelector('#genText').innerHTML = `There are ${limit} Pokemons in Generation ${gen}`;
          break;

        case '7':
          limit = 88;
          offset = 721;
            document.querySelector('#genText').innerHTML = `There are ${limit} Pokemons in Generation ${gen}`;
          break;

        case '8':
          limit = 96;
          offset = 809;
            document.querySelector('#genText').innerHTML = `There are ${limit} Pokemons in Generation ${gen}`;
          break;
        }
      fetchData();
    };

search.addEventListener('keyup', () => {
    let value = search.value.toLowerCase();
    let cards = pokeData.map((poke) => {
        if (poke?.name.includes(value) && poke.types.length > 1) {
            return `<div class="poke-card">
            <div class="img-wrapper"><img class="poke-img" src="${poke.sprites.other['official-artwork'].front_default}"></div>
            <div class="title"><h3>${poke.name}</h3></div>
            <img class="icon" src="icons/${poke.types[0].type.name}.svg"></img><img class="icon" src="icons/${poke.types[1].type.name}.svg"></img>
            </div>`;
          }
          else if (poke?.name.includes(value) && poke.types.length < 2) {
            return `<div class="poke-card">
            <div class="img-wrapper"><img class="poke-img" src="${poke.sprites.other['official-artwork'].front_default}"></div>
            <div class="title"><h3>${poke.name}</h3></div>
            <img class="icon" src="icons/${poke.types[0].type.name}.svg"></img>
            </div>`;
          }
    }).join('');
    content.innerHTML = cards;
});
