import View from "./view.js";

class SidenavView extends View {
	_parentElement = document.querySelector(".side-nav");
	_activeMenuElement = this._parentElement.querySelector(".side-nav__item--active");
	getActiveMenu() {
		const activeMenu = this._activeMenuElement.dataset.menu;
		return activeMenu;
	}

	_updateActiveMenu(element) {
		this._activeMenuElement.classList.remove("side-nav__item--active");
		element.classList.add("side-nav__item--active");
		this._activeMenuElement = element;
	}

	addHandlerClick(handler) {
		this._parentElement.addEventListener("click", (e) => {
			if (e.target.closest(".side-nav__item")) {
				const targetEle = e.target.closest(".side-nav__item");
				this._updateActiveMenu(targetEle);
			}
			handler();
		});
	}
}

export default new SidenavView();
