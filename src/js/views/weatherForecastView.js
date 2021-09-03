import View from "./view.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class ReportView extends View {
	_parentElement = document.querySelector(".weather-forecast");
	_errorMessage = "We could not get the current weather report!";
	_message = "";

	_generateMarkup() {
		const data = this._data.daily;
		console.log(data);
		const city = this._data.city;

		return `
      <div class="weather-forecast__header">
        <h2 class="heading--2 city-main">${city}</h2>
        <button class="btn btn--detail">Details more
          &rarr;</button>
      </div>

      <div class="glider weather-forecast__track">
        ${data
					.map((day) => {
						return `
          <div class="glider__item forecast">
            <svg class="forecast__icon">
              <use xlink:href="${icons}#icon-${day.icon}">
            </svg>
            <h6 class="forecast__temperature">${day.min}/${day.max}</h6>
            <div class="forecast__day">${day.date}</div>
          </div>
        `;
					})
					.join("")}
      </div>
      `;
	}
}

export default new ReportView();
