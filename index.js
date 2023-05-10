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
}

function addRounds(year) {
    fetch(`https://ergast.com/api/f1/${year}.json`)
    .then(resp => resp.json())
    .then(rounds =>console.log(rounds))
}

