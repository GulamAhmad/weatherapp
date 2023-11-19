/* eslint-disable react/prop-types */
import "./Dashboard.css";
import loc from "../../assets/location.svg";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import calicon from "../../assets/calander.svg";
import Card from "../Card/Card";
import Search from "../Search";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [temparature, setTemparature] = useState(null);
  const [city, setcity] = useState(null);

  const handleChange = (data) => {
    setData(data);
    console.log(data)
    const [lat, lon] = data.value.split(" ");

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_APP_API_KEY
      }&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON data
      })
      .then((parsedData) => {
        setcity(parsedData.city);
        const filteredData = filterDailyData(parsedData.list);
        filteredData.pop();
        setTemparature(filteredData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const filterDailyData = (rawData) => {
    const dailyData = rawData.reduce((acc, dataPoint) => {
      // Extracting the date without the time component
      const date = dataPoint.dt_txt.split(" ")[0];

      // If date is not already in acc, add it
      if (!acc[date]) {
        acc[date] = dataPoint;
      }

      return acc;
    }, {});

    // Converting the object back to an array
    return Object.values(dailyData);
  };

  const CustomInput = ({ value, onClick }) => (
    <div className="custom-input" onClick={onClick}>
      <img src={calicon} alt="calander icon" />
      <span>{value}</span>
    </div>
  );

  return (
    <div className="container">
      <div className="toolbar">
        <div className="details">
          <img src={loc} alt="location icon" />{" "}
          <h2>{data?.label || "City & State or Country"}</h2>
          <p>{data?.value || "Co-ordinates"}</p>
        </div>
        <Search onSearch={handleChange} />
      </div>
      <div className="weather-panel">
        <div className="left">
          <ul className="list">
            <li>
              <label htmlFor="data">Select date:</label>
              <br />
              <Datepicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="dd MMM yyyy"
                customInput={<CustomInput />}
              />
            </li>
            <li>High Temparature</li>
            <li>Low Temparature</li>
            <li>Humidty</li>
            <li>Sunrise Time</li>
            <li>Sunset Time</li>
          </ul>
        </div>
        <div className="right">
          {temparature?.map((val, key) => {
            return (
              <div key={key}>
                <p>{new Date(val.dt_txt.split(" ")[0]).toLocaleDateString('en-GB',{ day: 'numeric', month: 'short', year: 'numeric' })}</p>
                <Card temp={val} city={city} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
