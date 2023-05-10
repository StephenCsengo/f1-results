document.addEventListener("DOMContentLoaded", () => {
    addYear();

});

/*The addYear function adds the years of available data to
the select a year portion of the form*/
function addYear() {
    const selector = document.getElementById("year");

    for (let year = 2023; year > 1949; year--) {
        const option = document.createElement("option");
        option.value = year;
        option.innerHTML= year;
        selector.appendChild(option);
    }
    
    selector.addEventListener('change', function() {
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
        console.log(races);
    })
}
