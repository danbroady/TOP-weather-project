import './styles.css';
import { renderWeather } from './DOM.js';

// API data fetching
async function APIRequest(location) {
    const APILink = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}}?unitGroup=uk&elements=conditions%2Cdatetime%2Cfeelslike%2Chumidity%2Cicon%2Cname%2Coffset%2Cprecipprob%2Cpressure%2Csunrise%2Csunset%2Ctemp%2Ctempmax%2Ctempmin%2Cuvindex%2Cwindgust%2Cwindspeed&include=hours%2Ccurrent&key=NQ5NM6436TLHMHG2T58YLLWNW&contentType=json`;
    try {
        const response = await fetch(APILink);
        if (!response.ok) {
            throw new Error (`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Fetch error: ${error}`);
        throw error;
    };
};


// Data processing & formatting
let rawData = await APIRequest('Manchester');
console.log(rawData);
let cleanData = processRawData(rawData);
console.log(cleanData);

function processRawData(rawData) {
    return {
        location: rawData.resolvedAddress.charAt(0).toUpperCase() + rawData.resolvedAddress.slice(1),
        condition: rawData.currentConditions.conditions,
        temp: Math.round(rawData.currentConditions.temp),
        tempMax: Math.round(rawData.days[0].tempmax),
        tempMin: Math.round(rawData.days[0].tempmin),
        feelsLike: Math.round(rawData.currentConditions.feelslike),
        humidity: `${Math.round(rawData.currentConditions.humidity)}%`,
        precip: `${rawData.currentConditions.precipprob}%`,
        pressure: `${rawData.currentConditions.pressure} mb`,
        uvIndex: rawData.days[0].uvindex,
        windGust: `${rawData.currentConditions.windgust} mph`,
        windSpeed: `${rawData.currentConditions.windspeed} mph`,
        sunrise: rawData.days[0].sunrise,
        sunset: rawData.days[0].sunset,
        icon: rawData.currentConditions.icon,
    };
};


// DOM manipulation
renderWeather(cleanData);






// Event handling



