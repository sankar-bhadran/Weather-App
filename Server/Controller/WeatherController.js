import axios from "axios";
export const currentWeather = async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).send({ error: "City is required" });
  }

  try {
    const response = await axios.get("http://api.weatherstack.com/current", {
      params: {
        access_key: "57865db72686db862137b071df868e0f",
        query: city,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send({ error: "Error fetching weather data" });
  }
};
