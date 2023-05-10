document.addEventListener("DOMContentLoaded", () => {
    addYear();
    //getRaces(2023);
    
});

const yearSelector = document.getElementById("year");
const raceSelector = document.getElementById("race");

document.getElementById("year-race-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let resultsSection = document.getElementById("results");
    let yearChoice = yearSelector.value;
    let raceChoice = raceSelector.value;
    resultsSection.innerHTML = "";
    fetch(`https://ergast.com/api/f1/${yearChoice}/${raceChoice}/results.json`)
    .then(resp => resp.json())
    .then(results => {
        let raceResult = results.MRData.RaceTable.Races[0].Results;
        
        raceResult.forEach(function(driver) {
            let result = document.createElement("div");
            result.innerHTML = `${driver.Driver.givenName} ${driver.Driver.familyName} | ${driver.Constructor.name}` ;
            resultsSection.appendChild(result);
        })
    })
});
/*The addYear function adds the years of available data to
the select a year portion of the form*/
function addYear() {
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
        raceSelector.disabled = false;
        raceSelector.innerHTML = "";
        addRaces(races);
    })
}

/*Add races to the select a race dropdown based on what
year is selected */
function addRaces(races) {

    for(let i = 0; i < races.length; i++) {
        const raceOption = document.createElement("option");
        raceOption.value = races[i].round;
        raceOption.innerHTML = races[i].raceName;
        raceSelector.appendChild(raceOption);
    }
    raceSelector.addEventListener("change", function() {
        //console.log(this.value);
    })
}