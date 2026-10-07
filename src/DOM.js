import rainIcon from './resources/rain.svg';
import snowIcon from './resources/snow.svg';
import fogIcon from './resources/fog.svg';
import dayIcon from './resources/clear-day.svg';
import nightIcon from './resources/clear-night.svg';
import cloudy from './resources/cloudy.svg';
import partCloudDayIcon from './resources/partly-cloudy-day.svg';
import partCloudNightIcon from './resources/partly-cloudy-night.svg';
import windIcon from './resources/wind.svg';

const iconMap = {
    'rain': rainIcon,
    'snow': snowIcon,
    'fog': fogIcon,
    'clear-day': dayIcon,
    'clear-night': nightIcon,
    'cloudy': cloudy,
    'partly-cloudy-day': partCloudDayIcon,
    'partly-cloudy-night': partCloudNightIcon,
    'wind': windIcon,
}

export function renderWeather(data, loadingElems) {
    // Remove 'unloaded' class animation
    loaded(loadingElems);

    // Update headline svg
    updateIcon(data.icon);

    // Update headline data
    updateTemps(data.temp, data.feelsLike, data.tempMax, data.tempMin);
    updateDesc(data.condition, data.location);

    // Stat boxes
    updateStats(data);
};


// Helper function - remove 'unloaded' animation class
function loaded(elems) {
    elems.forEach(elem => elem.classList.remove('unloaded'));
}

// Helper function - update main weather SVG
function updateIcon(code) {
    const weatherSvg = document.querySelector('#headline-svg');
    weatherSvg.src = iconMap[code] || partCloudDayIcon;
};

// Helper function - update all temperature elements
function updateTemps(temp, feels, max, min) {
    const headlineTemp = document.querySelector('#temp');
    headlineTemp.textContent = `${temp}°C`;

    const headlineFeels = document.querySelector('#feels-like-temp');
    headlineFeels.textContent = `Feels like ${feels}°C`;

    const headlineMax = document.querySelector('#max-temp');
    headlineMax.textContent = `${max}°C`;
    const headlineMin = document.querySelector('#min-temp');
    headlineMin.textContent = `${min}°C`;
};

// Helper function - update weather description & location elems
function updateDesc(conditions, location) {
    const headlineDesc = document.querySelector('#weather-desc');
    headlineDesc.textContent = conditions;

    const headlineLocation = document.querySelector('#location');
    headlineLocation.textContent = location;
};

// Helper function - update all stat boxes
function updateStats(data) {
    const statBoxes = document.querySelectorAll('[data-stat]');
    console.log(statBoxes);
    statBoxes.forEach((elem) => {
        const dataKey = elem.dataset.stat;
        if (dataKey in data) {
            elem.textContent = data[dataKey];
        }
    });
};