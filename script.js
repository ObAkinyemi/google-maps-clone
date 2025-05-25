fetchTimezones();


const cityBtn = document.getElementById("fetch_city");
cityBtn.addEventListener("click", getCity);


async function fetchTimezones() {
    try {
        const response = await fetch("timezones.json");
        const selectElement = document.getElementById('timezones');

        if(!response.ok){
            throw new Error("could not fetch timzons.json");
        }

        const data = await response.json();
        data.forEach(timezone => {
        let timezoneElement = document.createElement('option');
        timezoneElement.text = timezone;
        selectElement.appendChild(timezoneElement);
});
        
    } catch (error) {
        console.error('Could not fetch the json file', error);
    }
}

async function getCity () {


    try {
        const timezone = document.getElementById("timezones").value;
        let timezone_info = timezone.split("/");
        let slash_Count = 0;
        let response;
        console.log(timezone);
        console.log(timezone_info);
        console.log(typeof(timezone));
        
        for (i in timezone_info){
            slash_Count++;
        }
        slash_Count -= 1;
        
        if (slash_Count == 2){
            response = await fetch(`http://worldtimeapi.org/api/timezone/${timezone_info[0]}/${timezone_info[1]}/${timezone_info[2]}`);
        } else if(slash_Count == 1){
            response = await fetch(`http://worldtimeapi.org/api/timezone/${timezone_info[0]}/${timezone_info[1]}`);
        } else if(slash_Count == 0){
            response = await fetch(`http://worldtimeapi.org/api/timezone/${timezone_info[0]}`);
        } else{
            console.error("The response elif block isn't working.");
        }

        if (!response.ok){
            throw new Error("Could Not Fetch Data and elif block isn't working");
        }  
        
        let data = await response.json();
        console.log(data);

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