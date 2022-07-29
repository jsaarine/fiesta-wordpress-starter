class App {

	constructor() {
		this.start();
	}

	/**
	 * App entry point
	 */
	start() {
		// Header
		new Header(document.querySelector("#header"));

		// Navigation
		new Navigation(document.querySelector("#navigation"));

		// Search
		new Search(document.querySelector("#search"));
	}
}

const app = new App();
