document.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById("year");

    for (let year = 1950; year < 2024; year++) {
        const option = document.createElement("option");
        option.innerText = `${year}`;
        selector.appendChild(option);
    }
});