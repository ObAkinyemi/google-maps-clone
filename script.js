fetchPokeData();


const cityBtn = document.getElementById("fetch_city");
cityBtn.addEventListener("click", getCity);

const pokeBtn = document.getElementById("fetch_pokemon");
pokeBtn.addEventListener("click", fetchPokeData);

function getCity () {
    console.log(document.getElementById("city_in").value);
}

async function fetchPokeData() {
    try{
        const pokename = document.getElementById("pokemon_in").value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`);

        if(!response.ok){
            throw new Error("Could not fetch data");
        }

        const data = await response.json();
        // console.log(data);
        const pokemonSprite = data.sprites.front_default;
        const pokeImage = document.getElementById("pokemon-sprite");
        pokeImage.src = pokemonSprite;
        pokeImage.style.display = "block";
    }
    catch(error){
        console.error(error);
    }
}