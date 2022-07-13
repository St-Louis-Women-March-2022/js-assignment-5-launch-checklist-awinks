// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");

    missionTarget.innerHTML += `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name} </li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
                `;
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    }
    else if (isNaN(testInput)) {
        return "Not A Number";
    }
    else {
        return "Is a Number";
    }
}

function formSubmission(
    document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotListItem = document.getElementById("pilotStatus");
    pilotListItem.innerHTML = `Pilot ${pilot} is ready for launch!`;

    let copilotListItem = document.getElementById("copilotStatus");
    copilotListItem.innerHTML = `Copilot ${copilot} is ready for launch!`;

    let launchStatus = document.getElementById("launchStatus");
    let readyForLaunch = true;
    if (fuelLevel < 10000) {
        readyForLaunch = false;
        let faultyItems = document.getElementById("faultyItems");
        faultyItems.style.visibility = "visible";

        let fuelStatus = document.getElementById("fuelStatus");
        fuelStatus.innerHTML = "There is not enough fuel for the journey!";

        launchStatus.style.color = "red";
        launchStatus.innerHTML = "Shuttle not ready for launch!";
    }
    else {
        let fuelStatus = document.getElementById("fuelStatus");
        fuelStatus.innerHTML = "Fuel level high enough for launch";
    }

    if (cargoLevel > 10000) {
        readyForLaunch = false;
        let faultyItems = document.getElementById("faultyItems");
        faultyItems.style.visibility = "visible";

        let cargoStatus = document.getElementById("cargoStatus");
        cargoStatus.innerHTML = "Too much mass for the shuttle to take off!";

        launchStatus.style.color = "red";
        launchStatus.innerHTML = "Shuttle not ready for launch!";
    }
    else {
        let cargoStatus = document.getElementById("cargoStatus");
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
    }

    if (readyForLaunch === true) {
        launchStatus.style.color = "green";
        launchStatus.innerHTML = "Shuttle is ready for launch!";
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;