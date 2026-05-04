function getWeather() {

    var city = document.getElementById("city").value.toLowerCase().trim();

    var weatherData = {
        "pune": { temp: "28°C", humidity: "60%", condition: "Sunny" },
        "mumbai": { temp: "30°C", humidity: "75%", condition: "Humid" },
        "delhi": { temp: "35°C", humidity: "50%", condition: "Hot" },
        "bangalore": { temp: "25°C", humidity: "65%", condition: "Cloudy" }
    };

    // ✅ Simple AJAX simulation (clean)
    setTimeout(function () {

        var data = weatherData[city];

        if (data) {
            document.getElementById("result").innerHTML =
                "Temperature: " + data.temp + "<br>" +
                "Humidity: " + data.humidity + "<br>" +
                "Condition: " + data.condition;
        } else {
            document.getElementById("result").innerHTML = "City not found!";
        }

    }, 500);
}