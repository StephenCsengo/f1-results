# Formula 1 Race Results

Welcome to the Formula 1 Race Results project! This project is designed to provide Formula 1 race results from any year of competition. It aims to be a valuable tool for any F1 enthusiast.

## About

The project includes a comprehensive collection of Formula 1 race results from multiple seasons, including information such as race date, location, circuit details, and race results. The project obtains the data from the [Ergast Developer API](http://ergast.com/mrd/). Data pulled from the API include:

- Driver
  - Name
  - Date of birth
  - Nationality
  - Constructor
  - Driver's Wikipedia URL
- Race
  - Circuit
  - Location
  - Date
  - Results
  - Circuit's Wikipedia URL
  - Specific race's Wikipedia URL

The project utilizes JavaScript to manipulate this data into the DOM in an organized fashion.

## Usage

To begin, a year is selected and the list of races will be dynamically filled with the races from that year.

![image](https://github.com/StephenCsengo/f1-results/assets/81661222/312e7bad-3d82-4e6a-9f14-8c6f462ab818)

Select a race and click submit, information on the race will appear first, and includes links to the Wikipedia page for the circuit, a Google Maps view of the circuit, and the Wikipedia page for the specific chosen race.

![image](https://github.com/StephenCsengo/f1-results/assets/81661222/4ce3db16-3c16-43df-81c2-4592a3f862d0)

The results will be displayed below this information, in a stylized podium for the top 3 and in table format for the rest of the field.

![image](https://github.com/StephenCsengo/f1-results/assets/81661222/6aaee4a1-d3b3-4df6-95ed-c1c56dad9e60)

Clicking on a driver's name will bring up a modal with further information on the driver, as well as a link to the driver's Wikipedia page.

![image](https://github.com/StephenCsengo/f1-results/assets/81661222/504433cf-093e-4b9b-937e-5dca9496a561)

## Acknowledgments

[Ergast Developer API](http://ergast.com/mrd/)

[CSS Gradient](https://cssgradient.io/)
