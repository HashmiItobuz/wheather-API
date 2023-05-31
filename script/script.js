let inputContainer = document.getElementById("inputBox");
let placeName = document.getElementById("PlaceName");
let locationTemp = document.getElementById("temperature");
let feelsLike = document.getElementById("feelsLike");
let wheatherImg = document.getElementById("wheatherImage");
let wheatherDescription = document.querySelector(".wheather-description");

wheatherDescription.classList.add("hidden");

var currWidth = wheatherImg.clientWidth;
inputContainer.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getData();
  }
});

async function getData() {
  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${inputContainer.value}&aqi=no`
    ).then((res) => res.json());

    placeName.innerHTML = res.location.name;
    locationTemp.innerHTML = res.current.temp_c + "<sup>o</sup>";
    feelsLike.innerHTML = "Feels " + res.current.feelslike_f + "<sup>o</sup>";
    wheatherImg.classList.add("img");
    wheatherDescription.classList.remove("hidden");
    locationTemp.classList.remove("error-font-size");
    wheatherImg.classList.remove("error-img");

    if (res.current.temp_c >= 40) {
      wheatherImg.src = "images/sunny.png";
    }
    else if (res.current.temp_c > 20) {
      wheatherImg.src = "images/sun_behind.png";
    }
    else {
      wheatherImg.src = "images/rain.png";
    }
    inputContainer.value = "";
  } catch {
    placeName.innerHTML = "";
    wheatherImg.src = "images/cloud.png";
    locationTemp.innerHTML = "No Data Found";
    feelsLike.innerHTML = "";
    wheatherDescription.classList.add("hidden");
    inputContainer.value = "";
    locationTemp.classList.add("error-font-size");
    wheatherImg.classList.add("error-img");
  }
}