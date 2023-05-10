document.addEventListener("DOMContentLoaded", () => {
    addYear();

});

/*The addYear function adds the years of available data to
the select a year portion of the form*/
function addYear() {
    const yearSelector = document.getElementById("year");

    for (let year = 2023; year > 1949; year--) {
        const yearOption = document.createElement("option");
        yearOption.value = year;
        yearOption.innerHTML= year;
        yearSelector.appendChild(yearOption);
    }
    
    yearSelector.addEventListener("change", function() {
        getRaces(this.value);
    });
}

/*The getRaces function takes a year and accesses the Ergast API
for that  year to get an array of races*/
function getRaces(year) {
    fetch(`https://ergast.com/api/f1/${year}.json`)
    .then(resp => resp.json())
    .then(rounds => {
        let races = rounds.MRData.RaceTable.Races;
        addRaces(races);
        console.log(races);
    })
}


function addRaces(races) {
    const raceSelector = document.getElementById("race")

    for(let i = 0; i < races.length; i++) {
        const raceOption = document.createElement("option");
        raceOption.value = races[i].round;
        raceOption.innerHTML = races[i].raceName;
        raceSelector.appendChild(raceOption);
    }
}