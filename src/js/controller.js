"use strict";
import Chart from "chart.js/auto";
import ChartView from "./views/chartView";
import * as model from "./model.js";
import CitiesView from "./views/citiesView";
import WeatherForecastView from "./views/weatherForecastView";
import ReportView from "./views/reportView";
import SearchView from "./views/searchView";
import SidenavView from "./views/sidenavView";
import MapView from "./views/mapView";

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
		MapView.renderMap(model.state);
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
		MapView.renderMap(model.state);
	} catch (error) {
		console.error(error);
	}
};

const controlSearchResults = async function () {
	try {
		ReportView.renderSpinner();
		WeatherForecastView.renderSpinner();
		const query = SearchView.getQuery();
		await model.getPlaceName(query);
		await model.loadWeatherData(false);
		ReportView.render(model.state);
		ReportView.updateUI(model.state.current);
		WeatherForecastView.render(model.state);
		ChartView.createChartData(model.state);
		ChartView.updateChart();
		MapView.renderMap(model.state);
	} catch (err) {
		console.error(err);
	}
};

const controlSidenavMenu = async function () {
	try {
		console.log(SidenavView.getActiveMenu());
		if (SidenavView.getActiveMenu() === "map") {
			MapView.showMap();
		}
		if (SidenavView.getActiveMenu() === "dashboard") {
			MapView.hideMap();
		}
	} catch (err) {
		console.error(err);
	}
};

const init = function () {
	start();
	ChartView.addHandlerClickOpt(controlChartData);
	ChartView.addHandlerChangeUnit(controlChartTempUnit);
	ReportView.addHandlerGetLocation(controlGetLocation);
	SearchView.addHandlerSearch(controlSearchResults);
	SidenavView.addHandlerClick(controlSidenavMenu);
};
init();
