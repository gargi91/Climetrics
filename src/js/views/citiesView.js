import View from "./view.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class CitiesView extends View {
	_parentElement = document.querySelector(".section-cities");
	_errorMessage = "We could not get the top cities info currently try again!";
	_message = "";

	_generateMarkup() {
		return `
        <div class="city city--1">
            <figcaption class="city__display">
                <img src="/img/cities/Amsterdam.jpg" alt="Amsterdam" class="city__img" />
                <div class="city__weather">
                    <svg class="city__weather--icon">
                        <use href="./img/icons.svg#icon-cloudy-sun"></use>
                    </svg>
                    <div class="city__weather--time">11:28</div>
                </div>
            </figcaption>
            <div class="city__header">
                <h6 class="city__title">Amsterdam</h6>
            </div>
        </div>

        <div class="city city--2">
            <figcaption class="city__display">
                <img src="./img/cities/NewYork.jpg" alt="New York" class="city__img" />
                <div class="city__weather">
                    <svg class="city__weather--icon">
                        <use href="./img/icons.svg#icon-sun"></use>
                    </svg>
                    <div class="city__weather--time">16:28</div>
                </div>
            </figcaption>
            <div class="city__header">
                <h6 class="city__title">New York</h6>
            </div>
        </div>

        <div class="city city--3">
            <figcaption class="city__display">
                <img src="./img/cities/Jaipur.jpg" alt="Jaipur" class="city__img" />
                <div class="city__weather">
                    <svg class="city__weather--icon">
                        <use href="./img/icons.svg#icon-moon"></use>
                    </svg>
                    <div class="city__weather--time">22:28</div>
                </div>
            </figcaption>
            <div class="city__header">
                <h6 class="city__title">Jaipur</h6>
            </div>
        </div>

        <div class="city city--4">
            <figcaption class="city__display">
                <img src="./img/cities/London.jpg" alt="London" class="city__img" />
                <div class="city__weather">
                    <svg class="city__weather--icon">
                        <use href="./img/icons.svg#icon-snowy"></use>
                    </svg>
                    <div class="city__weather--time">16:08</div>
                </div>
            </figcaption>
            <div class="city__header">
                <h6 class="city__title">London</h6>
            </div>
        </div>

        <div class="city city--5">
            <figcaption class="city__display">
                <img src="./img/cities/Paris.jpg" alt="Paris" class="city__img" />
                <div class="city__weather">
                    <svg class="city__weather--icon">
                        <use href="./img/icons.svg#icon-rainy"></use>
                    </svg>
                    <div class="city__weather--time">09:13</div>
                </div>
            </figcaption>
            <div class="city__header">
                <h6 class="city__title">Paris</h6>
            </div>
        </div>
        `;
	}

	updateUI(data) {}
}

export default new CitiesView();
