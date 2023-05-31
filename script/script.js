let inputContainer = document.getElementById("inputBox");
let placeName = document.getElementById("PlaceName");
let temp = document.getElementById("temperature");
let feelsLike = document.getElementById("feelsLike");
let wheatherImg = document.getElementById("wheatherImage");
let feelsLikeContain= document.querySelector(".weather-content");
let locationTemp = document.querySelector(".loc-temp");
let wheatherDescription = document.querySelector(".wheather-description");
let degree = document.getElementById("degree");

wheatherImg.classList.add("hidden");
locationTemp.classList.add("hidden");
feelsLikeContain.classList.add("hidden");
wheatherDescription.classList.add("hidden");

var currWidth = wheatherImg.clientWidth;
inputContainer.addEventListener("keyup", (e)=>{
    if(e.key === "Enter"){
        getData();
    }
});

async function getData() {
  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${inputContainer.value}&aqi=no`
    ).then((res) => res.json());
    
    placeName.innerHTML=res.location.name;
    temp.innerHTML=res.current.temp_c;
    feelsLike.innerHTML=res.current.feelslike_f;
    locationTemp.classList.remove("font-size");
    degree.classList.remove("hidden");

    if(res.current.temp_c >= 40){
        wheatherImg.src="images/sunny.png";
        unhidden();
    }
    else if(res.current.temp_c  > 20){
        wheatherImg.src="images/sun_behind.png";
        unhidden();
    }
    else {
        wheatherImg.src="images/rain.png";
        unhidden();
    }
    inputContainer.value="";
  } catch {
    wheatherImg.classList.remove("hidden");
    locationTemp.classList.remove("hidden");
    degree.classList.add("hidden");
    placeName.classList.add("hidden");
    wheatherImg.src="images/cloud.png";
    wheatherImg.style.width = (currWidth + 200) + "px";
    temp.innerHTML="No Data Found";
    locationTemp.classList.add("font-size");
    feelsLike.innerHTML="";
    feelsLikeContain.classList.add("hidden");
    wheatherDescription.classList.add("hidden");
    inputContainer.value="";
  }
}
function unhidden() {
    wheatherImg.classList.remove("hidden");
    placeName.classList.remove("hidden");
    locationTemp.classList.remove("hidden");
    feelsLikeContain.classList.remove("hidden");
    wheatherDescription.classList.remove("hidden");
}