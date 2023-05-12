const yearSelector = document.getElementById("year");
const raceSelector = document.getElementById("race");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
addYear();

document.getElementById("year-race-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let restSection = document.getElementById("rest-of-field");
  let first = document.getElementById("first");
  let second = document.getElementById("second");
  let third = document.getElementById("third");
  let yearChoice = yearSelector.value;
  let raceChoice = raceSelector.value;

  document.getElementById("results").classList.remove("hidden");
  restSection.innerText = "";
  removeAllChildNodes(first);
  removeAllChildNodes(second);
  removeAllChildNodes(third);

  fetch(`https://ergast.com/api/f1/${yearChoice}/${raceChoice}/results.json`)
    .then((resp) => resp.json())
    .then((results) => {
      const raceResult = results.MRData.RaceTable.Races[0].Results;
      const topThree = raceResult.slice(0, 3);
      const restOfField = raceResult.slice(3);
      createPodiumResults(topThree);
      createFieldResults(restOfField);
      createRaceInfo(results);
    })
    .catch((error) => console.log(error));
});

/*The addYear function adds the years of available data to
the select a year portion of the form*/
function addYear() {
  for (let year = 2023; year > 1949; year--) {
    const yearOption = document.createElement("option");
    yearOption.value = year;
    yearOption.innerText = year;
    yearSelector.appendChild(yearOption);
  }

  yearSelector.addEventListener("change", function () {
    getRaces(this.value);
  });
}

/*The getRaces function takes a year and accesses the Ergast API
for that  year to get an array of races*/
function getRaces(year) {
  fetch(`https://ergast.com/api/f1/${year}.json`)
    .then((resp) => resp.json())
    .then((rounds) => {
      let races = rounds.MRData.RaceTable.Races;
      let button = document.querySelector("button");
      raceSelector.disabled = false;
      raceSelector.innerText = "";
      addRaces(races);
      button.disabled = false;
      button.classList.remove("disabled");
    })
    .catch((error) => console.log(error));
}

/*Add races to the select a race dropdown based on what
year is selected */
function addRaces(races) {
  for (let i = 0; i < races.length; i++) {
    const raceOption = document.createElement("option");
    raceOption.value = races[i].round;
    raceOption.innerText = races[i].raceName;
    raceSelector.appendChild(raceOption);
  }
}

function createFieldResults(drivers) {
  const table = document.getElementById("rest-of-field");

  drivers.forEach(function (driver) {
    const row = table.insertRow(-1);
    const position = row.insertCell(0);
    const name = row.insertCell(1);
    const constructor = row.insertCell(2);
    const driverName = `${driver.Driver.givenName} ${driver.Driver.familyName}`;
    position.innerText = driver.position;
    name.innerText = driverName;
    name.setAttribute("id", `${driver.Driver.driverId}`);
    name.setAttribute("class", "driver");
    name.addEventListener("click", (e) => {
      fetch(`https://ergast.com/api/f1/drivers/${e.target.id}.json`)
        .then((resp) => resp.json())
        .then((driverData) => {
          const driverDOB =
            driverData.MRData.DriverTable.Drivers[0].dateOfBirth;
          const driverNat =
            driverData.MRData.DriverTable.Drivers[0].nationality;
          const driverURL = driverData.MRData.DriverTable.Drivers[0].url;
          document.getElementById("driverName").innerText = driverName;
          document.getElementById(
            "driverDOB"
          ).innerText = `Date of birth: ${driverDOB}`;
          document.getElementById(
            "driverNat"
          ).innerText = `Nationality: ${driverNat}`;
          driverWiki = document.getElementById("driverWiki");
          driverWiki.innerText = `${driverName} Wikipedia`;
          driverWiki.href = driverURL;

          openModal();
        });
    });
    constructor.innerText = driver.Constructor.name;
  });
}

function createPodiumResults(drivers) {
  const first = document.getElementById("first");
  const second = document.getElementById("second");
  const third = document.getElementById("third");

  const firstPlace = document.createElement("p");
  firstPlace.classList.add("first-place");
  firstPlace.innerText = "1st";
  const firstName = document.createElement("p");
  firstName.innerText = `${drivers[0].Driver.givenName} ${drivers[0].Driver.familyName}`;
  firstName.setAttribute("id", `${drivers[0].Driver.driverId}`);

  const firstConstructor = document.createElement("p");
  firstConstructor.innerText = drivers[0].Constructor.name;
  first.appendChild(firstPlace);
  first.appendChild(firstName);
  first.appendChild(firstConstructor);

  const secondPlace = document.createElement("p");
  secondPlace.classList.add("second-place");
  secondPlace.innerText = "2nd";
  const secondName = document.createElement("p");
  secondName.innerText = `${drivers[1].Driver.givenName} ${drivers[1].Driver.familyName}`;
  secondName.setAttribute("id", `${drivers[1].Driver.driverId}`);
  secondName.setAttribute("class", "driver");
  const secondConstructor = document.createElement("p");
  secondConstructor.innerText = drivers[1].Constructor.name;
  second.appendChild(secondPlace);
  second.appendChild(secondName);
  second.appendChild(secondConstructor);

  const thirdPlace = document.createElement("p");
  thirdPlace.classList.add("third-place");
  thirdPlace.innerText = "3rd";
  const thirdName = document.createElement("p");
  thirdName.innerText = `${drivers[2].Driver.givenName} ${drivers[2].Driver.familyName}`;
  thirdName.setAttribute("id", `${drivers[2].Driver.driverId}`);
  thirdName.setAttribute("class", "driver");
  const thirdConstructor = document.createElement("p");
  thirdConstructor.innerText = drivers[2].Constructor.name;
  third.appendChild(thirdPlace);
  third.appendChild(thirdName);
  third.appendChild(thirdConstructor);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function createRaceInfo(results) {
  const circuitName = results.MRData.RaceTable.Races[0].Circuit.circuitName;
  const circuitURL = results.MRData.RaceTable.Races[0].Circuit.url;
  const raceURL = results.MRData.RaceTable.Races[0].url;
  const city = results.MRData.RaceTable.Races[0].Circuit.Location.locality;
  const country = results.MRData.RaceTable.Races[0].Circuit.Location.country;
  const lat = results.MRData.RaceTable.Races[0].Circuit.Location.lat;
  const long = results.MRData.RaceTable.Races[0].Circuit.Location.long;
  const date = results.MRData.RaceTable.Races[0].date;
  const circuitInfo = document.getElementById("circuit");
  const locationInfo = document.getElementById("location");
  const dateInfo = document.getElementById("date");

  circuitInfo.innerText = circuitName;
  circuitInfo.href = circuitURL;
  locationInfo.innerText = `${city}, ${country}`;
  locationInfo.href = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
  dateInfo.innerText = date;
  dateInfo.href = raceURL;
}
function createModalContent(e) {}
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
const modalClick = function () {};
overlay.addEventListener("click", closeModal);
document.querySelector(".btn-close").addEventListener("click", closeModal);
