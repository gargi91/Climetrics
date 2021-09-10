import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

//get json data from api

export const AJAX = async function (url, method = undefined) {
	try {
		const fetchPro = method
			? fetch(url, {
					method: "get"
			  })
			: fetch(url);

		const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
		const data = await res.json();
		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		return data;
	} catch (err) {
		throw err;
	}
};

export const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

export const dayNames = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

export const weatherIcons = {
	"11d": "thunderstorm",
	"01d": "sun",
	"01n": "moon",
	"02d": "cloudy-sun",
	"02n": "cloudy-moon",
	"50d": "haze",
	"50n": "haze",
	"10d": "rainy",
	"09d": "rainy-light",
	"03d": "cloud",
	"03n": "cloud",
	"04n": "cloudy",
	"04d": "cloudy",
	"13d": "snowy"
};
