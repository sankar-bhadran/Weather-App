import axios from "axios";
import { useEffect, useState } from "react";

const Main = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const handleCurrentChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = async () => {
    axios.defaults.withCredentials = true;
    try {
      axios
        .get(`http://localhost:3000/weather/current?city=${location}`)
        .then((response) => {
          console.log(response.data);
          setWeatherData(response.data);
          localStorage.setItem("weatherData", JSON.stringify(response.data));
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const savedWeatherData = localStorage.getItem("weatherData");
    if (savedWeatherData) {
      setWeatherData(JSON.parse(savedWeatherData));
    }
  }, []);
  console.log(location);
  return (
    <div className="flex gap-[35px] p-[30px] container ">
      <div className="weather-input w-[555px] border-2 border-[#D2EA28] rounded-[9px] p-[10px] flex flex-col gap-6">
        <h3 className="text-[30px]">Enter a City Name</h3>
        <input
          type="text"
          className="w-[100%] py-2 px-4 bg-[#212529] text-[#ffff]"
          placeholder="E.g., New York, London, Tokyo"
          value={location}
          onChange={handleCurrentChange}
        />
        <button
          className="w-[100%] bg-[#5372F0] px-[10px] w-[100%] text-[#212529] font-[700] py-2 px-4 rounded-[9px] font-montserrat"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="w-[100%]">
        <div className="bg-[#5372F0] rounded-[5px] pt-[20px] pr-[70px] pb-[20px] pl-[20px] flex justify-between items-center">
          <div>
            <h2 className="text-[50px]">{weatherData?.location?.name}</h2>
            <h6 className="text-[25px]">
              Temperature: {weatherData?.current?.temperature}°C
            </h6>
            <h6 className="text-[25px]">
              Wind: {weatherData?.current?.wind_speed} M/S
            </h6>
            <h6 className="text-[25px]">
              {" "}
              Humidity: {weatherData?.current?.humidity}%
            </h6>
          </div>
          <div>
            <img src={weatherData?.current?.weather_icons[0]} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
