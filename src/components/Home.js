import {  useState } from "react";
import classes from "./Home.module.css";
import CDate from "./CDate";

// for lat and long
let long;
let lat;



const Home = (props) => {
  const [enteredCity, setEnteredCity] = useState("");
  const [storeValue, setStoreValue] = useState("");
  const [cloud, setCloud] = useState("0");
  const [humiditys, setHumiditys] = useState("0");
  const [wind, setWind] = useState("0");
  const [maxTemp, setMaxTemp] = useState("0");
  const [minTemp, setMinTemp] = useState("0");
  const [sunRise, setSunRise] = useState("0");
  const [sunSet, setSunSet] = useState("0");

  const getWeather = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

    });

    if (enteredCity !== "") {
      var axios = require("axios").default;

      var options = {
        method: "GET",
        url: "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
        params: {
          q: `${enteredCity}`,
          lat: `${lat}`,
          lon: `${long}`,
          cnt: "7",
          units: "metric",
        },
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "4cc28901c5msh78f8ff0af3ed3f4p1732c5jsn2adeb50731fc",
        },
      };

      axios
        .request(options)
        .then(function (response) {

          let dayWeather = response.data.list[0];
          props.weatherTemp(dayWeather);
          setCloud(dayWeather.clouds);
          setHumiditys(dayWeather.humidity);
          setWind(dayWeather.speed);
          setMaxTemp(dayWeather.temp.max);
          setMinTemp(dayWeather.temp.min);
          setSunRise(dayWeather.sunrise);
          setSunSet(dayWeather.sunset);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  // changing value of setEnteredCity
  const changeHandler = (e) => {
    setEnteredCity(e.target.value);
  };

  //submitting place
  const submitHandler = (e) => {
    e.preventDefault();
    setStoreValue(enteredCity);
    getWeather();
    setEnteredCity("");

  };


  return (
    <div className="Home">
      <div className={classes.shadow}>
        <form onSubmit={submitHandler}>
          <input
            className={classes.search}
            type="text"
            placeholder="Another Location"
            onChange={changeHandler}
            value={enteredCity}
          />
        </form>

        <div className={classes.weatherDetails}>
          <p className={classes.heading}> Weather Details </p>

          <div className={classes.flex}>
            <p className={classes.sides}>Clouds</p>
            <p className={classes.sides}>{cloud}%</p>
          </div>

          <div className={classes.flex}>
            <p className={classes.sides}>Humidity</p>
            <p className={classes.sides}>{humiditys}%</p>
          </div>

          <div className={classes.flex}>
            <p className={classes.sides}>Wind</p>
            <p className={classes.sides}>{wind}km/h</p>
          </div>

          <div className={classes.flex}>
            <p className={classes.sides}>Sunrise</p>
            <p className={classes.sides}>{sunRise}</p>
          </div>

          <div className={classes.flex}>
            <p className={classes.sides}>Sunset</p>
            <p className={classes.sides}>{sunSet}</p>
          </div>

          <div className={classes.flex}>
            <p className={classes.sides}>Max-temp</p>
            <p className={classes.sides}>{maxTemp}°C</p>
          </div>

          <div className={classes.flex}>
            <p className={classes.sides}>Min-temp</p>
            <p className={classes.sides}>{minTemp}°C</p>
          </div>
        </div>
      </div>
      <CDate location={storeValue} />
      <div></div>
    </div>
  );
};

export default Home;



// let y = new Date().getFullYear();
// let m = new Date().getMonth();
// let d = new Date().getDate();
// const month = m < 10 ? `0${m}` : m;
// const date = d < 10 ? `0${d}` : d;

// let compDate = `${y}${month}${date}`;
// console.log(compDate);

// let isoDate = new Date().toISOString().substring(0,10);
// console.log(isoDate);