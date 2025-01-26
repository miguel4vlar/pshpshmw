async function fetchCatContent() {
    const catUrl = 'https://api.thecatapi.com/v1/images/search';
    const factUrl = 'https://catfact.ninja/fact';
  
    try {
      //cat picture
      const imageResponse = await fetch(catUrl);
      const imageData = await imageResponse.json();
      const catImage = imageData[0].url;
  
      //cat fact
      const factResponse = await fetch(factUrl);
      const factData = await factResponse.json();
      const catFact = factData.fact;
  
      //update website
      document.getElementById('catImage').src = catImage;
      document.getElementById('catFact').innerText = catFact;
  
    } catch (error) {
      console.error('Error fetching cat content:', error);
      document.getElementById('catFact').innerText = "Something went wrong. Try again!";
    }
  }
  
  //load initial content on page load
  window.onload = fetchCatContent;

const API_KEY = "live_Fq4q10xfMG7qkOIy2ufNFG9VaeBtm65dWeydTlmFPTyUl0D7ofl6eYLCdrPf245B"; // Replace with your API key
const BREEDS_URL = "https://api.thecatapi.com/v1/breeds";
const IMAGE_SEARCH_URL = "https://api.thecatapi.com/v1/images/search";

const breedDropdown = document.getElementById("breedDropdown");
const breedInfo = document.getElementById("breedInfo");
const breedName = document.getElementById("breedName");
const breedImage = document.getElementById("breedImage");
const breedDescription = document.getElementById("breedDescription");
const breedTemperament = document.getElementById("breedTemperament");
const breedLifespan = document.getElementById("breedLifespan");

//list of breeds and populate the dropdown
async function fetchBreeds() {
  try {
    const response = await fetch(BREEDS_URL, {
      headers: { "x-api-key": API_KEY },
    });
    const breeds = await response.json();

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedDropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching breeds:", error);
  }
}

//breed details and update UI
async function fetchBreedDetails(breedId) {
  try {
    const response = await fetch(`${IMAGE_SEARCH_URL}?breed_ids=${breedId}`, {
      headers: { "x-api-key": API_KEY },
    });
    const data = await response.json();

    if (data.length > 0) {
      const breed = data[0].breeds[0];
      breedName.textContent = breed.name;
      breedImage.src = data[0].url;
      breedDescription.textContent = breed.description;
      breedTemperament.textContent = breed.temperament;
      breedLifespan.textContent = breed.life_span;

      breedInfo.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error fetching breed details:", error);
  }
}

//event listener for dropdown selection
breedDropdown.addEventListener("change", (event) => {
  const breedId = event.target.value;
  if (breedId) {
    fetchBreedDetails(breedId);
  } else {
    breedInfo.classList.add("hidden");
  }
});

//initialize the dropdown with breeds
fetchBreeds();

  