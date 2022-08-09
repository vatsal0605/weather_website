const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",(req,res) => {
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=ffbdb0031ced391bf094e6a3bfb92d56&units=metric";
  https.get(url,function(response){
    console.log(response);

    response.on("data",(data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      res.write("<h1>The temprature in " + query + " is " + temp + "</h1>");
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<img src=" + imageURL +">");
      res.send();
    })
  });
})

app.listen(5500,function(){
  console.log("server is running");
});