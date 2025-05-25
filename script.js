timezone_list = ['Africa/Abidjan', 'America/Aruba', 'America/Argentina/Ushuaia', 'Etc/GMT-4', 'Europe/Zaporozhye', 'Pacific/Honolulu', 'US/East-Indiana', 'Zulu'];

const selectElement = document.getElementById('timezones');

timezone_list.forEach(timezone => {
    let timezoneElement = document.createElement('option');
    timezoneElement.text = timezone;
    selectElement.appendChild(timezoneElement);
});

const cityBtn = document.getElementById("fetch_city");
cityBtn.addEventListener("click", getCity);

async function getCity () {


    try {
        const timezone = document.getElementById("timezones").value;
        let timezone_info = timezone.split("/");
        let slash_Count = 0;
        console.log(timezone);
        console.log(timezone_info);
        console.log(typeof(timezone));
        
        for (i in timezone_info){
            slash_Count++;
        }
        slash_Count -= 1;

        console.log(slash_Count);
        // if slash_Count = 2

    } catch (error) {
        console.error(error);
    }

}





const pokeBtn = document.getElementById("fetch_pokemon");
pokeBtn.addEventListener("click", fetchPokeData);



async function fetchPokeData() {
    try{
        const pokename = document.getElementById("pokemon_in").value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`); //gets data

        if(!response.ok){ //ok is the indicator for this api for whether the data (promise) can be fetched (fulfilled).
            throw new Error("Could not fetch data");
        }

        const data = await response.json(); //the data that you want when the data is fetched, so you can use it.
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