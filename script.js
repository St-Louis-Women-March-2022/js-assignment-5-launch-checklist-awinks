// Write your JavaScript code here!

const { myFetch, pickPlanet, addDestinationInfo, validateInput, formSubmission } = require("./scriptHelper");

window.addEventListener("load", function () {
    //get submit from DOM
    let button = document.getElementById("formSubmit");
    //add click event listener to button
    button.addEventListener("click", function (event) {
        event.preventDefault();

        let pilotNameInput = document.getElementById('pilotName');
        let copilotNameInput = document.querySelector('input[name="copilotName"]');
        let fuelLevelInput = document.querySelector('input[name="fuelLevel"]');
        let cargoMassInput = document.querySelector('input[name="cargoMass"]');

        if (validateInput(pilotNameInput.value) === 'Empty' ||
            validateInput(copilotNameInput.value) === 'Empty' ||
            validateInput(fuelLevelInput.value) === 'Empty' ||
            validateInput(cargoMassInput.value) === 'Empty') {
            alert("All fields are required!");
        }
        else if (validateInput(pilotNameInput.value) !== 'Not A Number') {
            alert("Pilot field must be a string");
        }
        else if (validateInput(copilotNameInput.value) !== 'Not A Number') {
            alert("Copilot field must be a string");
        }
        else if (validateInput(fuelLevelInput.value) !== 'Is a Number') {
            alert("Fuel Level field must be a number");
        }
        else if (validateInput(cargoMassInput.value) !== "Is a Number") {
            alert("Cargo Mass field must be a number");
        } else {
            formSubmission(document, null, pilotNameInput.value, copilotNameInput.value, fuelLevelInput.value, cargoMassInput.value);
        }
    })
    let listedPlanets;

    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let aPlanet = pickPlanet(listedPlanets);
        addDestinationInfo(document, aPlanet.name, aPlanet.diameter, aPlanet.star, aPlanet.distance, aPlanet.moons, aPlanet.image);
    })
});