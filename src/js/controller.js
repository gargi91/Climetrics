"use strict";
import Chart from "chart.js/auto";
import ChartView from "./views/chartView";
import * as model from "./model.js";
import CitiesView from "./views/citiesView";
import WeatherForecastView from "./views/weatherForecastView";
import ReportView from "./views/reportView";

const btnGetLocation = document.getElementById("btn-get-location");

btnGetLocation.addEventListener("click", model.getPosition);

const start = async function () {
	try {
		ReportView.renderSpinner();
		WeatherForecastView.renderSpinner();
		await model.loadWeatherData();
		ReportView.render(model.state);
		ReportView.updateUI(model.state.current);
		WeatherForecastView.render(model.state);
	} catch (err) {
		console.error(err);
	}
};

const init = function () {
	start();
};
init();
