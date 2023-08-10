import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let result;

app.get("/", async(req, res)=>{
    res.render("app.ejs", {data : result});
});

app.post("/submit", async (req, res) => {
    try {
      console.log(req.body);
      const query=req.body.cityname;
      const appId="812ce680d83658ad4d94481e09d7b786";
      const unit="metric";
    //   const temp = req.body.main.temp;
    //   const weatherDescription = req.body.weather[0].description;
      // const icon = req.body.weather[0].icon;
    //   const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appId}&units=${unit}`
      );
      const result = response.data;
      console.log(result);
      res.render("app.ejs", {
        // data: result[Math.floor(Math.random() * result.length)],
        WeatherDesc : result.weather[0].description,
        city : result.name,
        temperature : Math.round(result.main.temp),
        humid : result.main.humidity,
        pressure : result.main.pressure,
        wind : result.wind.speed,
        main : result.weather[0].main,
        imageURL : "http://openweathermap.org/img/wn/"+result.weather[0].icon+"@2x.png"
        // imageURL : "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
      });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("app.ejs", {
        error: "No result Found",
      });
    }
  });


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

