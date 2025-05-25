fetch("https://pokeapi.co/api/v2/pokemon/pikachu") //promise based
.then(response => {
    if(!response.ok){
        throw new Error("could not fetch resource");
    }
    return response.json();
})
.then(data => console.log(data))
.catch(error => console.error(error)); //catches errors

const cityBtn = document.getElementById("enter_button");
cityBtn.addEventListener("click", getCity);

function getCity () {
    console.log(document.getElementById("city_in").value);
}