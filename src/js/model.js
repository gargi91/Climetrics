import {
	WEATHER_API_KEY,
	WEATHER_API_URL,
	GEOCODING_API_KEY,
	GEOCODING_API_URL,
	TOP_CITIES_API_URL,
	UNSPLASH_API_URL,
	CLIENT_ID
} from "./config.js";
import { AJAX, monthNames, dayNames, weatherIcons } from "./helper.js";
import * as moment from "moment-timezone";
//State object
export const state = {
	location: {
		//setting default location of paris
		lat: 48.8566969,
		lng: 2.3514616
	},
	tz: "Europe/Paris",
	current: {},
	daily: {},
	hourly: {},
	city: "Paris",
	country: "France"
};

const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};

// Getting location using geolocation API
export const getPosition = function () {
	return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log(position);
			},
			(err) => {
				console.log(state);
			},
			options
		);
	});
};

export const loadWeatherData = async function () {
	try {
		const lat = state.location.lat;
		const lng = state.location.lng;

		// Get weather data
		const dataWeather = await AJAX(
			`${WEATHER_API_URL}lat=${lat}&lon=${lng}&units=metric&appid=${WEATHER_API_KEY}`
		);
		const tz = dataWeather.timezone;
		state.tz = tz;
		saveCurrentWeatherData(dataWeather);
		saveDailyWeatherData(dataWeather.daily);
		saveHourlyWeatherData(dataWeather.hourly);
		const locationData = await AJAX(`${GEOCODING_API_URL}q=${lat}+${lng}&key=${GEOCODING_API_KEY}`);
		state.city = locationData.results[0].components.city;
		state.country = locationData.results[0].components.country;
	} catch (err) {
		throw err;
	}
};

const getDateTime = function (dt) {
	const dateObj = moment.tz(dt * 1000, state.tz);
	//date time datas
	const day = dayNames[dateObj.day()].slice(0, 3);
	const hour = dateObj.hours().toString().padStart(2, 0);
	const min = dateObj.minutes().toString().padStart(2, 0);
	const date = dateObj.date();
	const month = monthNames[dateObj.month()];
	const timeStr = `${hour}:${min}`;

	return {
		date,
		month,
		day,
		time: timeStr
	};
};

export const saveCurrentWeatherData = function (data) {
	const current = data.current;
	const dt = current.dt;
	//weather report current
	const dtData = getDateTime(dt);
	const dateStr = `${dtData.day}, ${dtData.date} ${dtData.month}`;
	state.current = {
		date: dateStr,
		time: dtData.time,
		temp: `${current.temp > 0 ? "+" + current.temp : current.temp}`,
		humidity: current.humidity,
		precipitation: data.hourly[0].pop,
		windSpeed: (current.wind_speed / 3.6).toFixed(2),
		icon: weatherIcons[current.weather[current.weather.length - 1].icon]
	};
};

const saveDailyWeatherData = function (data) {
	const daily = data.map((element) => {
		return {
			date: `${getDateTime(element.dt).date} ${getDateTime(element.dt).day}`,
			temp: element.temp.day,
			windSpeed: (element.wind_speed / 3.6).toFixed(2),
			precipitation: element.pop,
			rain: element?.rain ?? 0,
			sunrise: getDateTime(element.sunrise).time,
			sunset: getDateTime(element.sunset).time,
			humidity: element.humidity,
			min: Math.trunc(element.temp.min),
			max: Math.trunc(element.temp.max),
			icon: weatherIcons[element.weather[element.weather.length - 1].icon]
		};
	});
	state.daily = daily;
};

const saveHourlyWeatherData = function (data) {
	const hourly = data.map((element) => {
		return {
			time: getDateTime(element.dt).time,
			temp: element.temp,
			windSpeed: (element.wind_speed / 3.6).toFixed(2),
			precipitation: element.pop,
			humidity: element.humidity,
			icon: element.weather[0].icon
		};
	});
	state.hourly = hourly;
};
