const inputBox = document.getElementById("inputBox");
const inputBtn = document.getElementById("inputBtn");
const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const weatherIcon = document.querySelector(".weather-icon");
const condition = document.querySelector(".condition");
const humidity = document.querySelector(".humadity");
const wind = document.querySelector(".wind");


const key = "3b26fa9d2cda221957c4b957e7ff9562";
const url = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
async function getData(city = "habiganj") {
    let response = await fetch(url + city + `&appid=${key}`);

    if (response.status > 200) {
        document.getElementById("error").innerHTML = "City not found !";
        document.querySelector(".weather-details").style.display = "none";
    } else {
        let data = await response.json();
        temp.innerHTML = parseInt(data.main.temp) + "<sup>°c</sup>";
        cityName.innerHTML = data.name;
        condition.innerHTML = data.weather[0].main;
        humidity.innerHTML = "humadity: " + data.main.humidity + "%";
        wind.innerHTML = "Wind: " + data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        document.querySelector(".weather-details").style.display = "block";
        document.getElementById("error").innerHTML = "";
    }

}
document.addEventListener("keypress", function (e) {

    if (e.key == "Enter") {
        getData(inputBox.value);
        inputBox.value = "";
    }
})

inputBtn.addEventListener("click", function () {
    getData(inputBox.value);
    inputBox.value = "";
})
getData();