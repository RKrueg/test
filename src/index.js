import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import PlantService from './plant_service';

async function getPlantInfo(plant) {
  const response = await PlantService.getPlantInfo(plant);
  if (response.toString().includes("Error")) {
    printError(response, plant);
  } else { 
    printElements(response, plant)
  }
}

function printElements(response, plant) {
    document.querySelector('#showResponse').innerHTML ="";
    response.forEach(element => {
      let commonName = element[`Common name`][0].toLowerCase();
      let categories = element.Categories.toLowerCase();
      let appeal = element.Appeal.toLowerCase();
      if (commonName.includes(plant) || categories.includes(plant) || appeal.includes(plant)) {
        const div = document.createElement('div');
        const image = document.createElement('img');
        const name = document.createElement('h5');
        const water = document.createElement('p');
        const light = document.createElement('p');
        const bugs = document.createElement('p');
        const show = document.querySelector(`#showResponse`);
        div.classList = 'card'
        image.classList = 'card-image'
        image.src = element.img
        name.innerHTML = `<strong>${element[`Common name`]}</strong> \n ${element[`Latin name`]}`
        water.innerHTML = `<strong>Watering: </strong>${element.Watering}`
        light.innerHTML = `<strong>Light Needs: </strong>${element[`Light tolered`]}`
        bugs.innerHTML = `<strong>Pests: </strong>${element[`Insects`]}`

        div.appendChild(image),
          div.appendChild(name),
          div.appendChild(water),
          div.appendChild(light),
          div.appendChild(bugs),
          show.appendChild(div);
      }
    });
  }


function printError(errorMessage) {
  document.querySelector('#showResponse').innerText = errorMessage;
}

function handleFormSubmission(event) {
  event.preventDefault();
  let plant = document.querySelector('#plant').value.toLowerCase();
  document.querySelector('#plant').value = null;
  getPlantInfo(plant);
}

window.addEventListener("load", function () {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
});



