import View from "./view.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class CitiesView extends View {
	_parentElement = document.querySelector(".section-cities");
	_errorMessage = "We could not get the top cities info currently try again!";
	_message = "";

	_generateMarkup() {
		const markup = this._data.map((city) => {
			return `
                <div class="city">
                    <figcaption class="city__display">
                        <img src="${city.url}">
                            alt="${city.cityName}" class="city__img">
                        <div class="city__weather">
                            <svg class="city__weather--icon">
                                <use
                                    href="${icons}#icon-${city.report.icon}">
                            </svg>
                            <div class="city__weather--time">${city.report.temp}&deg; C</div>
                        </div>
                    </figcaption>
                    <div class="city__header">
                        <h6 class="city__title">${city.cityName}</h6>
                    </div>
				</div>
            `;
		});
		return markup.join("\n");
	}

	updateUI(data) {}
}

export default new CitiesView();
