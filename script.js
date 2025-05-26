fetchTimezones();

const cityBtn = document.getElementById("fetch_tz");
cityBtn.addEventListener("click", getTimeInfo);
cityBtn.addEventListener("click", getWeather);

async function getTimeInfo () {

    try {
        const timezone_in = document.getElementById("timezones").value;
        const time_disp = document.getElementById("time-disp");
        
        let timezone_info = timezone_in.split("/");
        let slash_Count = 0;
        let response;
        
        for (let i in timezone_info){
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
        
        const abbr = data.abbreviation;
        const datetime = data.datetime;
        const day_of_week = data.day_of_week;
        const day_of_year = data.day_of_year;
        const timezone = data.timezone;

        time_disp.innerText = abbr + "\n" + datetime + "\n" + day_of_week + "\n" + day_of_year + "\n" + timezone;


    } catch (error) {
        console.error(error);
    }

}

// takes care of drop down menu for timezones
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

async function getWeather () {
    try {
        
        const api_key = '05bffcb762a7729a0fcf37a9b048ffb4';

        const timezone_in = document.getElementById("timezones").value;
        let in_split = timezone_in.split("/");
        let city_name = in_split[in_split.length-1];
        let coords = await getCoords(city_name);
        console.log(city_name + " coords: " + coords);
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=${api_key}&units=imperial`);

        if (!res.ok){
            throw new Error("Could not fetch data");
        }

        const data = await res.json();

        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

async function getCoords (city_name) {

    try {
        let coords = [];
        
        const api_key = '05bffcb762a7729a0fcf37a9b048ffb4';
        
        
        const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${api_key}`) 

        if(!res.ok){
            throw new Error("Could not fetch data");
        }
        
        const data = await res.json();
        // console.log(data);

        let lat = data[0].lat;
        let long = data[0].lon;
        coords = [lat, long];
        return coords;
    } catch (error) {
        console.error(error);
    }
}