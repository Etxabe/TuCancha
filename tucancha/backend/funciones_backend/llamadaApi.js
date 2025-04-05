import axios from 'axios';

export const obtenerClima = async (fecha, hora, latitud, longitud) => {
  const apiKey = 'TQEBS5KHDJ3VMS6TWD4847UP2';//JFR8TPJ3SKD2C98JG3WEHRG8F
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitud},${longitud}/${fecha}T${hora}?key=${apiKey}&include=current`;
  console.log(url);
  const fahrenheitToCelsius = (temp) => Math.round((temp - 32) * 5 / 9);

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.days && data.days.length > 0) {
      const day = data.days[0];

      return {
        minTemperature: fahrenheitToCelsius(day.tempmin),
        temperature: fahrenheitToCelsius(day.temp),
        maxTemperature: fahrenheitToCelsius(day.tempmax),
        windSpeed: Math.round(day.windspeed),
        humidity: Math.round(day.humidity),
        icon: 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/PNG/1st%20Set%20-%20Color/' + day.icon + '.png',
        sunset: day.sunset,
        sunrise: day.sunrise,
      };
    } else {
      throw new Error('No se encontraron datos para la fecha y ubicación especificadas.');
    }
  } catch (error) {
    console.error('Error:', error.message);
    return { error: error.message };
  }
};
