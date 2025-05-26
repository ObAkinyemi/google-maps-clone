fetchTimezones();
getWeather();

const cityBtn = document.getElementById("fetch_tz");
cityBtn.addEventListener("click", getTimeInfo);


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

        let lat =5.359952;
        let long = -4.008256;
        let api_key_weather = '05bffcb762a7729a0fcf37a9b048ffb4';
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=${api_key_weather}&units=imperial`);
        
        if (!res.ok){
            throw new Error("Could not fetch data");
        }

        data = await res.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}