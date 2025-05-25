fetchTimezones();


const cityBtn = document.getElementById("fetch_tz");
cityBtn.addEventListener("click", getCity);


async function getCity () {

    try {
        const timezone_in = document.getElementById("timezones").value;
        const time_disp = document.getElementById("time-disp");
        
        let timezone_info = timezone_in.split("/");
        let slash_Count = 0;
        let response;
        console.log(timezone_in);
        console.log(timezone_info);
        console.log(typeof(timezone_in));
        
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

        console.log(data);


    } catch (error) {
        console.error(error);
    }

}

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