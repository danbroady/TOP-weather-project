import './styles.css';
import { renderWeather } from './DOM.js';

// API data fetching
async function APIRequest(location) {
    const APILink = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}}?unitGroup=uk&elements=conditions%2Cdatetime%2Cfeelslike%2Chumidity%2Cicon%2Cname%2Coffset%2Cprecipprob%2Cpressure%2Csunrise%2Csunset%2Ctemp%2Ctempmax%2Ctempmin%2Cuvindex%2Cwindgust%2Cwindspeed&include=hours%2Ccurrent&key=NQ5NM6436TLHMHG2T58YLLWNW&contentType=json`;
    try {
        const response = await fetch(APILink);
        if (!response.ok) {
            alert('Invalid location, please try again');
            return;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Fetch error: ${error}`);
        throw error;
    };
};


// Data processing & formatting

function processRawData(rawData) {
    if (!rawData) return;
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
        sunrise: formatTime(rawData.days[0].sunrise),
        sunset: formatTime(rawData.days[0].sunset),
        icon: rawData.currentConditions.icon,
    };
};

function formatTime(time) {
    const date = new Date(`1970-01-01T${time}`);
    return new Intl.DateTimeFormat('en-UK', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true})
        .format(date);
};



// Event handling
const apiElems = document.querySelectorAll('.unloaded'); // List all elems with .hidden class prior to removal for future API calls
const searchBox = document.querySelector('#search');

    // Toggle search clear button hidden class
const clearBtn = document.querySelector('.clear-btn');
searchBox.addEventListener('input', () => {
    if (searchBox.value.length > 0) {
        clearBtn.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
    };
});

    // Clear button functionality
clearBtn.addEventListener('click', () => {
    searchBox.value = '';
});


    // Searching functionality
searchBox.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        let query = searchBox.value.trim();
        if (!query) return;

        // Call API
        let rawData = await APIRequest(query);
        let cleanData = processRawData(rawData);
        if (!cleanData) return;

        // DOM manipulation
        renderWeather(cleanData, apiElems);
    };
});


