class App {

	constructor(queue) {
		this.isReady = false;
		this.readyQueue = queue;

		this.init();
	}

	/**
	 * Initialize app when DOM ready
	 */
	init() {
		Core.ready(() => {
			this.isReady = true;
			this.start();
			this.processQueue();
		});
	}

	/**
	 * Add function to the ready queue
	 */
	ready(fn) {
		if(this.isReady) {
			fn();
		} else {
			this.readyQueue.push(fn);
		}
	}

	/**
	 * Process the ready queue
	 */
	processQueue() {
		while(this.readyQueue.length) {
			this.readyQueue.shift()();
		}
	}

	/**
	 * App entry point
	 */
	start() {
		// Focus visible
		this.focusVisible();

		// Header
		new Header(document.querySelector("#header"));

		// Navigation
		new Navigation(document.querySelector("#navigation"));
	}

	/**
	 * Add focus outline to buttons only when keyboard-focused
	 */
	focusVisible() {
		document.documentElement.classList.add("focus-visible");

		const onBlur = e => {
			e.target.classList.remove("focus-visible");
		};

		document.body.addEventListener("keyup", e => {
			var key = e.which || e.keyCode;

			if(key === 9) {
				const activeElement = document.activeElement;

				if(!activeElement.classList.contains("focus-visible")) {
					activeElement.classList.add("focus-visible");
					activeElement.addEventListener("blur", onBlur);
				}
			}
		});
	}
}

app = new App(app.queue);
