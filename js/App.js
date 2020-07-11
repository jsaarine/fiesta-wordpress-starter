class App {

	constructor(queue) {
		this.isReady = false;
		this.readyQueue = queue;
		this.mobile = false;
	}

	init() {
		Core.ready(() => {
			this.isReady = true;
			this.start();
			this.processQueue();
		});
	}

	ready(fn) {
		if(this.isReady) {
			fn();
		} else {
			this.readyQueue.push(fn);
		}
	}

	processQueue() {
		while(this.readyQueue.length) {
			this.readyQueue.shift()();
		}
	}

	start() {
		// Focus visible
		document.documentElement.classList.add("focus-visible");

		document.body.addEventListener("keyup", e => {
			var key = e.which || e.keyCode;

			if(key === 9) {
				const activeElement = document.activeElement;

				if(!activeElement.classList.contains("focus-visible")) {
					activeElement.classList.add("focus-visible");
					activeElement.addEventListener("blur", this.onBlur);	
				}
			}
		});

		// Header
		new Header(document.querySelector("#header"));

		// Navigation
		new Navigation(document.querySelector("#navigation"));
	}

	onBlur(e) {
		e.target.classList.remove("focus-visible");
	}
}

app = new App(app.queue);
app.init();