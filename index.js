document.addEventListener("DOMContentLoaded", () => {
    addYear();
});

const yearSelector = document.getElementById("year");
const raceSelector = document.getElementById("race");

document.getElementById("year-race-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let restSection = document.getElementById("rest-of-field");
    let podiumSection = document.getElementById("podium");
    let yearChoice = yearSelector.value;
    let raceChoice = raceSelector.value;
    document.getElementById("results").classList.remove("hidden");
    restSection.innerHTML = "";
    

    fetch(`https://ergast.com/api/f1/${yearChoice}/${raceChoice}/results.json`)
    .then(resp => resp.json())
    .then(results => {
        const raceResult = results.MRData.RaceTable.Races[0].Results;
        const topThree = raceResult.slice(0,3);
        const restOfField = raceResult.slice(3);
        createPodiumResults(topThree);
        createFieldResults(restOfField);
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
    });
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
}

function createFieldResults(drivers) {
    const table = document.getElementById("rest-of-field");
    
    drivers.forEach(function(driver) {
        const row = table.insertRow(-1);
        const position = row.insertCell(0);
        const name = row.insertCell(1);
        const constructor = row.insertCell(2);
        position.innerHTML = driver.position;
        name.innerHTML = `${driver.Driver.givenName} ${driver.Driver.familyName}`;
        constructor.innerHTML = driver.Constructor.name;
    });
}

function createPodiumResults(drivers) {
    const first = document.getElementById("first");
    const second = document.getElementById("second");
    const third = document.getElementById("third");
    first.innerHTML =`<p class="first-place"><sup>st</sup></p>
    <p>${drivers[0].Driver.givenName} ${drivers[0].Driver.familyName}</p>
    <p>${drivers[0].Constructor.name}</p>`
    second.innerHTML =`<p class="second-place">2<sup>nd</sup></p>
    <p>${drivers[1].Driver.givenName} ${drivers[1].Driver.familyName}</p>
    <p>${drivers[1].Constructor.name}</p>`
    third.innerHTML =`<p class = "third-place">3<sup>rd</sup>
    <p>${drivers[2].Driver.givenName} ${drivers[2].Driver.familyName}</p>
    <p>${drivers[2].Constructor.name}</p>`
}