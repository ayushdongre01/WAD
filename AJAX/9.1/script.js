function getWeather() {
    var city = document.getElementById("city").value.toLowerCase().trim();

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "data.json", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var weatherData = JSON.parse(xhr.responseText);
            var data = weatherData[city];

            if (data) {
                document.getElementById("result").innerHTML =
                    "Temperature: " + data.temp + "<br>" +
                    "Humidity: " + data.humidity + "<br>" +
                    "Condition: " + data.condition;
            } else {
                document.getElementById("result").innerHTML = "City not found!";
            }
        }
    };

    xhr.send();
}


function getWeather() {
    var city = document.getElementById("city").value.toLowerCase().trim();

    fetch("data.json")
        .then(response => response.json())
        .then(weatherData => {

            var data = weatherData[city];

            if (data) {
                document.getElementById("result").innerHTML =
                    "Temperature: " + data.temp + "<br>" +
                    "Humidity: " + data.humidity + "<br>" +
                    "Condition: " + data.condition;
            } else {
                document.getElementById("result").innerHTML = "City not found!";
            }
        })
        .catch(error => {
            document.getElementById("result").innerHTML = "Error loading data";
        });
}