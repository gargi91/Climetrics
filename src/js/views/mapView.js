import View from "./view.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class MapView extends View {
	_parentElement = document.getElementById("map");
	#map;
	#mapZoomLevel = 10;

	_destroyMap() {
		if (this.#map) {
			this.#map.remove();
		}
	}

	renderMap(data) {
		this._destroyMap();
		const { lat, lng } = data.location;

		const coords = [lat, lng];

		this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

		L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.#map);

		this._renderMapMarker(coords, data.city, data.country, data.current.icon);
	}

	hideMap() {
		this._parentElement.style.opacity = 0;
		this._parentElement.style.zIndex = -30;
	}

	showMap() {
		this._parentElement.style.opacity = 1;
		this._parentElement.style.zIndex = 30;
	}

	_renderMapMarker(coords, city, country, icon) {
		const popup = `
      <svg class="popup_icon">
        <use href="${icons}#icon-${icon}"></use>
      </svg>
      <div class="popup_location">${city}, ${country}</div>
    `;
		L.marker(coords)
			.addTo(this.#map)
			.bindPopup(
				L.popup({
					maxWidth: 250,
					minWidth: 100,
					autoClose: false,
					closeOnClick: false
				})
			)
			.setPopupContent(popup)
			.openPopup();
	}
}

export default new MapView();
