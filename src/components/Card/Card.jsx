/* eslint-disable react/prop-types */
import "./Card.css";
const Card = ({ temp, city }) => {
  return (
    <div className="card">
      <div className="top">
        <img src={`icons/${temp.weather[0].icon}.svg`} alt="sun svg" style={{width:"50px",filter:"invert(100%)",marginRight:"5px"}}/>
        {temp.weather[0].main}
      </div>
      <ul className="bottom">
        <li>
          {parseInt(temp.main.temp_max)}°C /{" "}
          {parseInt((temp.main.temp_max * 9) / 5 + 32)}°F
        </li>
        <li>
          {parseInt(temp.main.temp_min)}°C /{" "}
          {parseInt((temp.main.temp_min * 9) / 5 + 32)}°F
        </li>
        <li>{temp.main.humidity}%</li>
        <li>
          {new Date(city.sunrise * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </li>
        <li>{new Date(city.sunset * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}</li>
      </ul>
    </div>
  );
};

export default Card;
