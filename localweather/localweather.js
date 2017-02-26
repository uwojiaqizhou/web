$(document).ready(function(){
  var city = geoplugin_city();
  var region = geoplugin_region();
  var countrycode = geoplugin_countryCode();
  var api = "http://api.openweathermap.org/data/2.5/weather?";
  var apidaily = "http://api.openweathermap.org/data/2.5/forecast/daily?callback=?";
  var appid = "deb205beb4b4d0e50ffd8b0e3df40fc2";
  var units = "metric";
  var api_url = api + "q=" + city + "," + countrycode + "&lang=en&type=like&units=" + units
  + "&APPID=" + appid;
  var tempmax;
  var tempmin;
  var current_temp;

  $("#position").html(city + "," + region + "," + countrycode);
  $.ajax({
    url: api_url,
    dataType: "json",
    success: function(data){
      displayWeather(data);
      getBackground(data.weather[0].main);
      $.getJSON(apidaily,{
        q: city + "," + countrycode,
        type: "like",
        lang: "en",
        units: "metric",
        APPID: appid,
        cnt: "1"
      }, function(daily){
        current_temp = data.main.temp;
        tempmax = daily.list[0].temp.max;
        tempmin = daily.list[0].temp.min;
        $("#high span").html(Math.round(daily.list[0].temp.max) + "°C");
        $("#low span").html(Math.round(daily.list[0].temp.min) + "°C");
      });
      $("#convert").on("click",function(){
        var current_units = document.getElementById("convert").text;
        if (current_units === "°F"){
          $("#degree").html(current_temp);
          $("#high span").html(Math.round(tempmax) + "°C");
          $("#low span").html(Math.round(tempmin) + "°C");
          $("#convert").html("°C");
        }
        else if (current_units === "°C"){
          var temp_convert = current_temp * 9 / 5 + 32;
          var max_convert = tempmax * 9 / 5 + 32;
          var min_convert = tempmin * 9 / 5 + 32;
          $("#degree").html(Math.round(temp_convert));
          $("#high span").html(Math.round(max_convert) + "°F");
          $("#low span").html(Math.round(min_convert) + "°F");
          $("#convert").html("°F");
        }
      });
    },
    error: function(){
      $("#position").text("I have no idea what is happenning now!");
    }
  });
  function displayWeather(data){
    $("#degree").html(data.main.temp);
    $("#water span").html(data.main.humidity + "%");
    var daytime = "-night-";
    if(data.dt >= data.sys.sunrise && data.dt < data.sys.sunset){
      var daytime = "-day-";
    }
    var weathericon = "wi wi-owm" + daytime + data.weather[0].id;
    $("#weather-icon").removeClass().addClass(weathericon);
    var speedicon = "wi wi-wind from-" + data.wind.deg + "-deg";
    $("#speed-icon").removeClass().addClass(speedicon);
    $("#weather-description").html(data.weather[0].description);
    $("#speed-description").html(data.wind.speed + "m/s");
  }
  function getBackground(des){
    switch (des) {
      case "Thunderstorm":
        $("body").css("background","url(https://drive.google.com/uc?export=download&id=0B41DdgPqKzCaaW1vVUVjRTBuX3c) no-repeat center center fixed");
        break;
      case "Drizzle":
        $("body").css("background","url(https://drive.google.com/uc?export=download&id=0B41DdgPqKzCaempENF8ycUFHX2M) no-repeat center center fixed");
        break;
      case "Rain":
        $("body").css("background","url(https://drive.google.com/uc?export=download&id=0B41DdgPqKzCaempENF8ycUFHX2M) no-repeat center center fixed");
        break;
      case "Snow":
        $("body").css("background","url(https://drive.google.com/uc?export=download&id=0B41DdgPqKzCaWkhXU2dra1RhbTQ) no-repeat center center fixed");
        break;
      case "Atmosphere":
        $("body").css("background","url(https://drive.google.com/uc?export=download&id=0B41DdgPqKzCaOWFHSGY5MUt5Qm8) no-repeat center center fixed");
        break;
      case "Clouds":
        $("body").css("background","url(https://drive.google.com/uc?export=download&id=0B41DdgPqKzCacHBEamd3Q2ZpYTA) no-repeat center center fixed");
        break;
      case "Extreme":
        $("body").css("background","url(https://drive.google.com/uc?export=download&id=0B41DdgPqKzCaaW1vVUVjRTBuX3c) no-repeat center center fixed");
        break;
      case "additional":
        $("body").css("background","url(https://drive.google.com/uc?export=download&id=0B41DdgPqKzCacHBEamd3Q2ZpYTA) no-repeat center center fixed");
        break;
      default:
        $("body").css("background","url(https://drive.google.com/uc?export=download&id=0B41DdgPqKzCacHBEamd3Q2ZpYTA) no-repeat center center fixed");
    }
  }
});
