"use strict";
import Chart from "chart.js/auto";
import * as model from "./model.js";
import CitiesView from "./views/citiesView";
import ReportView from "./views/reportView";

const init = async function () {
	try {
		ReportView.renderSpinner();
		await model.loadData();
		ReportView.render(model.state);
		ReportView.updateUI(model.state.current);
		CitiesView.render(model.state.topCities);
	} catch (err) {
		console.error(`🥵😱 ${err}`);
	}
};
// window.addEventListener("load", init);
init();
