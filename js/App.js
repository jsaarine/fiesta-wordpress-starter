class App {

	constructor() {
		document.addEventListener("DOMContentLoaded", () => {
			this.start();
		});
	}

	/**
	 * App entry point
	 */
	start() {
		// Header
		const header = document.querySelector("#header");

		if(header) {
			new Header(header);
		}

		// Navigation
		const navigation = document.querySelector("#navigation");

		if(navigation) {
			new Navigation(navigation);
		}

		// Search
		const search = document.querySelector("#search");

		if(search) {
			new Search(search);
		}
	}
}

const app = new App();
