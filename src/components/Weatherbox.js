import "./Weatherbox.css";

const Weatherbox = (props) => {
  return (
    <div className="weatherBox">
      <div className="temp">{props.temp}°C</div>
      <div className="weather">{props.weather}</div>
    </div>
  );
};

export default Weatherbox;
