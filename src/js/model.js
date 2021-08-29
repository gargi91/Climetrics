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

//State object
export const state = {
	location: {
		//setting default location of paris
		lat: 48.8566969,
		lng: 2.3514616
	}
};

const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};

// Getting location using geolocation API
export const getPosition = function () {
	return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
};

//
// //getting weather data
// export const loadData = async function () {
// 	try {
// 		const data = await AJAX(
// 			`https://api.openweathermap.org/data/2.5/onecall?lat=${state.location.lat}&lon=${state.location.lng}&&units=metric&appid=${WEATHER_API_KEY}`
// 		);
// 		const tz = data.timezone;
// 		state.tz = tz;
// 		// const times = data.daily.map((el) => {
// 		// 	return getDateTime(el.dt);
// 		// });
// 		saveCurrentWeatherData(data);
// 		saveDailyWeatherData(data.daily);
// 		saveHourlyWeatherData(data.hourly);
//
// 		const dataGeo = await AJAX(
// 			`${GEOCODING_API_URL}q=${state.location.lat},${state.location.lng}&key=${GEOCODING_API_KEY}&pretty=1`
// 		);
// 		const { city, country } = dataGeo.results[0].components;
// 		state.city = city;
// 		state.country = country;
// 		//
// 		const topCitiesData = await AJAX(
// 			`${TOP_CITIES_API_URL}dataset=geonames-all-cities-with-a-population-1000&q=${state.country}&rows=5&sort=population`
// 		);
// 		// console.log(topCitiesData);
// 		const records = topCitiesData.records;
// 		const topCities = records.map((d) => {
// 			const fields = d.fields;
// 			const cityName = fields.ascii_name;
// 			const coords = fields.coordinates;
// 			return {
// 				cityName,
// 				coords
// 			};
// 		});
// 		state.topCities = topCities;
// 		const weatherDataCitiesFetch = topCities.map((city) => {
// 			return AJAX(
// 				`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coords[0]}&lon=${city.coords[1]}&exclude=minutely,hourly,daily,alerts&&units=metric&appid=${WEATHER_API_KEY}`
// 			);
// 		});
// 		const resCitiesWeatherData = await Promise.allSettled(weatherDataCitiesFetch);
//
// 		const cityWeatherData = resCitiesWeatherData.map((w) => w.value?.current);
// 		console.log(cityWeatherData);
// 		const fetchPhotos = topCities.map((city) => {
// 			return AJAX(
// 				`https://api.unsplash.com/search/photos?client_id=${CLIENT_ID}&query=${city.cityName}?orientation=landscape`,
// 				"get"
// 			);
// 		});
// 		const resPhotos = await Promise.allSettled(fetchPhotos);
// 		const dataPhotos = resPhotos.map((p) => p.value?.results[0].urls.small);
// 		state.topCities.forEach((city, index) => {
// 			city.url = dataPhotos[index];
// 			city.report = {
// 				temp: cityWeatherData[index].temp,
// 				icon: weatherIcons[cityWeatherData[index].weather[0].icon]
// 			};
// 		});
// 	} catch (err) {
// 		console.error(`👽👽👽${err}`);
// 		throw err;
// 	}
// };
//
// export const init = async function () {
// 	try {
// 		const { coords } = await getPosition();
// 		state.location.lat = coords.latitude;
// 		state.location.lng = coords.longitude;
// 	} catch (err) {
// 		console.warn(
// 			"🙁Cannot get your current location, using default location i.e Paris",
// 			err.message
// 		);
// 	} finally {
// 		loadData();
// 	}
// };
//
// const getDateTime = function (dt) {
// 	const lang = navigator.language;
// 	//date time datas
// 	const dateLocal = new Date(dt * 1000).toLocaleString(lang, {
// 		timeZone: state.tz
// 	});
// 	const dateObj = new Date(dateLocal);
// 	const day = dayNames[dateObj.getDay()].slice(0, 3);
// 	const hour = dateObj.getHours();
// 	const min = dateObj.getMinutes();
// 	const date = dateObj.getDate();
// 	const month = monthNames[dateObj.getMonth()];
//
// 	const timeStr = `${hour}:${min}`;
//
// 	return {
// 		date,
// 		month,
// 		day,
// 		time: timeStr
// 	};
// };
//
// export const saveCurrentWeatherData = function (data) {
// 	const current = data.current;
// 	const dt = current.dt;
// 	//weather report current
// 	const dtData = getDateTime(dt);
// 	const dateStr = `${dtData.day}, ${dtData.date} ${dtData.month}`;
// 	state.current = {
// 		date: dateStr,
// 		time: dtData.time,
// 		temp: `${current.temp > 0 ? "+" + current.temp : current.temp}`,
// 		humidity: current.humidity,
// 		precipitation: data.hourly[0].pop,
// 		windSpeed: (current.wind_speed / 3.6).toFixed(2),
// 		icon: weatherIcons[current.weather[current.weather.length - 1].icon]
// 	};
// };
//
// const saveDailyWeatherData = function (data) {
// 	const daily = data.map((element) => {
// 		return {
// 			date: `${getDateTime(element.dt).date} ${getDateTime(element.dt).day}`,
// 			temp: element.temp.day,
// 			windSpeed: (element.wind_speed / 3.6).toFixed(2),
// 			precipitation: element.pop,
// 			rain: element?.rain ?? 0,
// 			sunrise: getDateTime(element.sunrise).time,
// 			sunset: getDateTime(element.sunset).time,
// 			humidity: element.humidity,
// 			min: element.temp.min,
// 			max: element.temp.max
// 		};
// 	});
// 	state.daily = daily;
// };
//
// const saveHourlyWeatherData = function (data) {
// 	const hourly = data.map((element) => {
// 		return {
// 			time: getDateTime(element.dt).time,
// 			temp: element.temp,
// 			windSpeed: (element.wind_speed / 3.6).toFixed(2),
// 			precipitation: element.pop,
// 			humidity: element.humidity,
// 			icon: element.weather[0].icon
// 		};
// 	});
// 	state.hourly = hourly;
// };
