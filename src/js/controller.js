"use strict";
import Chart from "chart.js/auto";
import ChartView from "./views/chartView";
import * as model from "./model.js";
import CitiesView from "./views/citiesView";
import ReportView from "./views/reportView";

// const init = async function () {
// 	try {
// 		ReportView.renderSpinner();
// 		await model.loadData();
// 		ReportView.render(model.state);
// 		ReportView.updateUI(model.state.current);
// 		CitiesView.render(model.state.topCities);
// 	} catch (err) {
// 		console.error(`🥵😱 ${err}`);
// 	}
// };
// // window.addEventListener("load", init);
// init();

// const getUserLocation = async function () {
// 	try {
// 		const { coords } = await model.getPosition();
// 		const { latitude, longitude } = coords;
// 		model.state.location.lat = latitude;
// 		model.state.location.lng = longitude;
// 		console.log(model.state);
// 	} catch (error) {
// 		console.error(`😡😡😡 Abe location ni mil raha!`);
// 		console.log("Ab default use kro...");
// 		console.log(model.state);
// 	}
// };
//
// //Controlling the report view
// const timeout = function (s) {
// 	return new Promise(function (resolve, _) {
// 		setTimeout(function () {
// 			resolve(`Request took too long! Timeout after second`);
// 		}, 1);
// 	});
// };

window.addEventListener("load", () => {
	getUserLocation();
});
