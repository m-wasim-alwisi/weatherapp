let weather = {
  apiKey: "2a273bab49ad9888b39e5925ec1561f7",
  fetchWeather: function (city) {
    fetch( "https://api.openweathermap.org/data/2.5/weather?q=" +  city +  "&units=metric&appid=" + this.apiKey ) .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?"+name+"')";
  },
  search: function () {
    let text = ".search-bar";
  let result = text.replace(/^\s+|\s+$/gm,'');
    this.fetchWeather(document.querySelector(result).value);
  },
};

document.querySelector(".search button").addEventListener("click",function(){weather.search();});

document .querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
  let countryname ="";

   function fetchText(countryname){
   fetch('https://ipinfo.io/json?token=c9caa3cad56d50') .then((response) => response.json())
   .then((data) =>{ countryname= data.city});
//  countryname =obj.employees[0].firstName + " " + obj.employees[0].lastName;
  }
 //console.log( fetchText());
//weather.fetchWeather("Aleppo");



let show = {
  apiKey: "c9caa3cad56d50",
  fetchWeather: function () {
    fetch( "https://ipinfo.io/json?token=" +  this.apiKey ) .then((response) => {
        if (!response.ok) {   
          console.log("Empty");
          
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data)).then(this.displaybase());
  },
  displayWeather: function (data) {
    //const { name } = data.city;
    
    //console.log(data.city);
     
    
    if(isEmpty(data)==false){
     weather.fetchWeather(data.city);
    //  console.log("not aleppo");
    }
     
  },
  displaybase: function () {
    weather.fetchWeather("aleppo"); 
 },
}

  function isEmpty(obj) {
    for(var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return true;
  }

  show.fetchWeather();
