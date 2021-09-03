"use strict";
import Chart from "chart.js/auto";
import ChartView from "./views/chartView";
import * as model from "./model.js";
import CitiesView from "./views/citiesView";
import ReportView from "./views/reportView";

const btnGetLocation = document.getElementById("btn-get-location");

btnGetLocation.addEventListener("click", model.getPosition);

const start = async function () {
	try {
		model.loadWeatherData();
	} catch (err) {
		console.error(err);
	}
};

const init = function () {
	start();
};
init();
