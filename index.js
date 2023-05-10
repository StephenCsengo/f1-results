document.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById("year");

    for (let year = 2023; year > 1949; year--) {
        const option = document.createElement("option");
        option.value = year;
        option.innerHTML= year;
        selector.appendChild(option);
    }
});