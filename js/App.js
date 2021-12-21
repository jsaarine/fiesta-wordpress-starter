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
		// Header
		new Header(document.querySelector("#header"));

		// Navigation
		new Navigation(document.querySelector("#navigation"));
	}
}

app = new App(app.queue);
