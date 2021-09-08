"use strict";
import Chart from "chart.js/auto";
import ChartView from "./views/chartView";
import * as model from "./model.js";
import CitiesView from "./views/citiesView";
import WeatherForecastView from "./views/weatherForecastView";
import ReportView from "./views/reportView";

const start = async function () {
	try {
		ReportView.renderSpinner();
		WeatherForecastView.renderSpinner();
		await model.loadWeatherData();
		ReportView.render(model.state);
		ReportView.updateUI(model.state.current);
		WeatherForecastView.render(model.state);
		ChartView.createChartData(model.state);
		ChartView.chartRender();
	} catch (err) {
		console.error(err);
	}
};

const controlChartData = function () {
	ChartView.createChartData(model.state);
	ChartView.updateChart();
};

const controlChartTempUnit = function () {
	ChartView.changeTempUnit();
	ChartView.updateChart();
};

const controlGetLocation = async function () {
	try {
		ReportView.renderSpinner();
		WeatherForecastView.renderSpinner();
		await model.getPosition();
		await model.loadWeatherData();
		ReportView.render(model.state);
		ReportView.updateUI(model.state.current);
		WeatherForecastView.render(model.state);
		ChartView.createChartData(model.state);
		ChartView.updateChart();
	} catch (error) {
		console.error(error);
	}
};

const init = function () {
	start();
	ChartView.addHandlerClickOpt(controlChartData);
	ChartView.addHandlerChangeUnit(controlChartTempUnit);
	ReportView.addHandlerGetLocation(controlGetLocation);
};
init();
