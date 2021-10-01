import { Fragment, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Weatherbox from "./components/Weatherbox";

function App() {
  // weather temperature state
  const [weatherTemp, setWeatherTemp] = useState("15.9");
  const [weather, setWeather] = useState("");
  const [cloudy, setCloudy] = useState(false);
  const [clear, setClear] = useState(false);
  const [rainy, setRainy] = useState(false);

  const getWeatherTemp = (data) => {
    setWeatherTemp(data.temp.day);
    setWeather(data.weather[0].main);
    data.weather[0].main == "Clouds" && setCloudy(true);
    data.weather[0].main == "Clear" && setClear(true);
    data.weather[0].main == "Rain" && setRainy(true);
  };

  // <div className= {`App outterBox ${cloudy ? 'cloudy' : clear ? 'clear' : rainy ? 'rainy' : 'clear'}`}></div>

  return (
    <Fragment>
      <div className={"App outterBox "}>
        <Home weatherTemp={getWeatherTemp} />
        <Weatherbox temp={weatherTemp} weather={weather} />
      </div>
    </Fragment>
  );
}

export default App;
