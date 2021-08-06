// window.addEventListener("load", function () {
// 	init();
// 	var ctx = document.getElementById("myChart").getContext("2d");
// 	const plugin = {
// 		id: "custom_canvas_background_color",
// 		beforeDraw: (chart) => {
// 			const ctx = chart.canvas.getContext("2d");
// 			var chartArea = chart.chartArea;
// 			ctx.save();
// 			ctx.globalCompositeOperation = "destination-over";
// 			ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
// 			ctx.fillRect(
// 				chartArea.left,
// 				chartArea.top,
// 				chartArea.right - chartArea.left,
// 				chartArea.bottom - chartArea.top
// 			);
// 			ctx.restore();
// 		}
// 	};
//
// 	const labels = ["11 Mon", "12 Tue", "13 Wed", "14 Fri", "15 Sat", "16 Sun"];
// 	const dataPoints = [2, 15, -6, 25, -1, 33, 40];
// 	const borderColors = dataPoints.map((temp) => {
// 		if (temp > 0) {
// 			return "#6467e5";
// 		} else {
// 			return "#C93636";
// 		}
// 	});
// 	const colors = {
// 		purple: {
// 			default: "rgba(100, 103, 229,.1)",
// 			half: "rgba(156, 166, 207,.5)",
// 			quarter: "rgba(187, 195, 218,.25)",
// 			zero: "rgba(100, 103, 229,0)"
// 		},
// 		indigo: {
// 			default: "rgba(80, 102, 120, 1)",
// 			quarter: "rgba(80, 102, 120, 0.25)"
// 		}
// 	};
// 	const gradient = ctx.createLinearGradient(0, 25, 0, 300);
// 	gradient.addColorStop(0, colors.purple.half);
// 	gradient.addColorStop(0.35, colors.purple.quarter);
// 	gradient.addColorStop(1, colors.purple.zero);
//
// 	const data = {
// 		labels: labels,
// 		datasets: [
// 			{
// 				label: "Temperature in C",
// 				data: dataPoints,
// 				fill: false,
// 				tension: 0.15,
// 				fill: true,
// 				borderWidth: 2,
// 				pointRadius: 5,
// 				borderColor: borderColors,
// 				pointBorderColor: "#f1f7fd",
// 				pointBackgroundColor: borderColors,
// 				backgroundColor: gradient,
// 				fill: "start",
// 				pointHoverBackgroundColor: "#ffae47",
// 				pointHoverBorderColor: "#ffae47",
// 				pointHoverRadius: 5
// 			}
// 		]
// 	};
//
// 	//Chart Instance
// 	var myChart = new Chart(ctx, {
// 		type: "line",
// 		data: {
// 			labels: data.labels,
// 			datasets: data.datasets
// 		},
// 		plugins: [plugin],
// 		options: {
// 			layout: {
// 				// padding: 20
// 			},
// 			responsive: true,
// 			legend: {
// 				display: false
// 			},
// 			maintainAspectRatio: false,
//
// 			scales: {
// 				x: {
// 					ticks: {
// 						padding: 10,
// 						autoSkip: false
// 					},
//
// 					grid: {
// 						display: false
// 					}
// 				},
// 				y: {
// 					ticks: {
// 						beginAtZero: true
// 					}
// 				}
// 			},
// 			chartArea: {
// 				backgroundColor: "#fff"
// 			},
// 			plugins: {
// 				legend: {
// 					display: false
// 				}
// 			}
// 		}
// 	});
// });
