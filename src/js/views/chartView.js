import View from "./view.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class ChartView extends View {
	_parentElement = document.querySelector(".graph__chart-box");
	_menuElement = document.querySelector(".graph__menu");
	_errorMessage = "We could not get the current weather report!";
	_message = "";
	_activeTabElement = document.querySelector(".graph__day--today");
	_labels = [];
	_dataPoints = [];
	_myChart;

	addHandlerClickOpt(handler) {
		this._menuElement.addEventListener("click", (e) => {
			if (e.target.classList.contains("graph__day")) {
				const optBtn = e.target;
				if (this._activeTabElement === optBtn) return;
				this._activeTabElement.classList.remove("graph__day--active");
				optBtn.classList.add("graph__day--active");
				this._activeTabElement = optBtn;
				handler();
			}
		});
	}

	createChartData(dataForChart) {
		const activeTabElement = this._activeTabElement;
		console.log(dataForChart);
		let labels, dataPoints;
		if (activeTabElement.getAttribute("data-day") === "week") {
			console.log("day is the active tab!!");
			const dailyData = dataForChart.daily;
			labels = dailyData.map((d) => d.date);
			dataPoints = dailyData.map((d) => d.temp);
		} else {
			console.log("week is the active tab!!");
			const hourlyData = dataForChart.hourly;
			labels = hourlyData.map((d) => d.time).slice(0, 24);
			dataPoints = hourlyData.map((d) => d.temp).slice(0, 24);
		}
		this._labels = labels;
		this._dataPoints = dataPoints;
	}

	chartRender() {
		///////////////////////////////////////////////////////
		const ctx = document.getElementById("myChart").getContext("2d");

		let labels = this._labels;
		let dataPoints = this._dataPoints;

		const plugin = {
			id: "custom_canvas_background_color",
			beforeDraw: (chart) => {
				const ctx = chart.canvas.getContext("2d");
				var chartArea = chart.chartArea;
				ctx.save();
				ctx.globalCompositeOperation = "destination-over";
				ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
				ctx.fillRect(
					chartArea.left,
					chartArea.top,
					chartArea.right - chartArea.left,
					chartArea.bottom - chartArea.top
				);
				ctx.restore();
			}
		};

		const borderColors = dataPoints.map((temp) => {
			if (temp > 0) {
				return "#6467e5";
			} else {
				return "#C93636";
			}
		});
		const colors = {
			purple: {
				default: "rgba(100, 103, 229,.1)",
				half: "rgba(156, 166, 207,.5)",
				quarter: "rgba(187, 195, 218,.25)",
				zero: "rgba(100, 103, 229,0)"
			},
			indigo: {
				default: "rgba(80, 102, 120, 1)",
				quarter: "rgba(80, 102, 120, 0.25)"
			}
		};
		const gradient = ctx.createLinearGradient(0, 25, 0, 300);
		gradient.addColorStop(0, colors.purple.half);
		gradient.addColorStop(0.35, colors.purple.quarter);
		gradient.addColorStop(1, colors.purple.zero);

		const data = {
			labels: labels,
			datasets: [
				{
					label: "Temperature in C",
					data: dataPoints,
					fill: false,
					tension: 0.15,
					fill: true,
					borderWidth: 2,
					pointRadius: 5,
					borderColor: borderColors,
					pointBorderColor: "#f1f7fd",
					pointBackgroundColor: borderColors,
					backgroundColor: gradient,
					fill: "start",
					pointHoverBackgroundColor: "#ffae47",
					pointHoverBorderColor: "#ffae47",
					pointHoverRadius: 5
				}
			]
		};

		//Chart Instance
		this._myChart = new Chart(ctx, {
			type: "line",
			data: {
				labels: data.labels,
				datasets: data.datasets
			},
			plugins: [plugin],
			options: {
				responsive: true,
				legend: {
					display: false
				},
				maintainAspectRatio: false,

				scales: {
					x: {
						ticks: {
							padding: 10,
							autoSkip: false
						},

						grid: {
							display: false
						}
					},
					y: {
						ticks: {
							beginAtZero: true
						}
					}
				},
				chartArea: {
					backgroundColor: "#fff"
				},
				plugins: {
					legend: {
						display: false
					}
				}
			}
		});
	}

	updateChart() {
		this._myChart.data.labels = this._labels;
		this._myChart.data.datasets.data = this._dataPoints;
		this._myChart.update();
	}
}
export default new ChartView();
