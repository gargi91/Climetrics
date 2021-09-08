import View from "./view.js";
import Gauge from "svg-gauge/dist/gauge.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class ReportView extends View {
	_getLocationBtnEle = document.querySelector("#btn-get-location");
	_parentElement = document.querySelector(".report__data");
	_errorMessage = "We could not get the current weather report!";
	_message = "";

	_generateMarkup() {
		const data = this._data.current;
		const city = this._data.city;
		const country = this._data.country;

		return `
        <div class="date-time">
            <svg class="date-time__icon">
                <use xlink:href="${icons}#icon-${data.icon}">
                </use>
            </svg>

            <div class="date-time__content">
                <div class="date-time__day">Today</div>
                <div class="date-time__time">${data.time}</div>
                <div class="date-time__date">${data.date}</div>
            </div>
        </div>

        <div class="temperature">${data.temp} &deg;C</div>

        <div class="location">
            <div class="location__city">${city}</div>
            <div class="location__country">${country}</div>
        </div>

        <div class="stats">
            <div class="stats__item stats__item--humidity">
                <h6 class="stats__label">Humidity:</h6>
                <h6 class="stats__value">${data.humidity}%</h6>
                <div class="stats__progress-bar">
                    <div class="stats__bar"></div>
                </div>
            </div>
            <div class="stats__item stats__item--precipation">
                <h6 class="stats__label">Precipation:</h6>
                <h6 class="stats__value">${data.precipitation}%</h6>
                <div class="stats__progress-bar">
                    <div class="stats__bar"></div>
                </div>
            </div>
            <div class="stats__item stats__item--wind">
                <h6 class="stats__label">Wind:</h6>
                <div id="cpuSpeed" class="gauge-container"></div>
                <h6 class="stats__value">${data.windSpeed}Km/h</h6>
            </div>
        </div>
        `;
	}

	updateUI(data) {
		const humidity = data.humidity;
		const precipation = data.precipation;
		const windSpeed = +data.windSpeed;
		const progressBars = document.querySelectorAll(".stats__bar");
		progressBars[0].style.width = `${humidity}%`;
		progressBars[1].style.width = `${precipation}%`;
		// Create a new Gauge
		var cpuGauge = Gauge(document.getElementById("cpuSpeed"), {
			max: 10,
			showValue: false,
			value: 0,
			// Custom dial colors (Optional)
			color: function () {
				return "#ffae47";
			}
		});

		// Set value and animate (value, animation duration in seconds)
		cpuGauge.setValueAnimated(windSpeed, 2);
	}

	addHandlerGetLocation(handler) {
		this._getLocationBtnEle.addEventListener("click", function () {
			handler();
		});
	}
}

export default new ReportView();
