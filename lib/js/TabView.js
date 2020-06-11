class TabView extends Component {

	constructor(el, settings) {
		super(el);

		this.settings = {
			hash: false
		}

		this.init(settings);
		
		this.nav = this.el.querySelector(".tab-nav");

		this.build();
	}

	static setup(arr) {
		return super.setup(arr, TabView, "[data-tabview]");
	}

	build() {
		// Initialize nav buttons
		this.nav.querySelectorAll("li a").forEach(i => {
			// Click
			i.addEventListener("click", e => {
				e.preventDefault();
				e.stopPropagation();
				this.select(i);
			});
			
			// Key
			i.addEventListener("keyup", e => {
				let key = e.which || e.keyCode;

				if(key == 39) {
					this.next();
				}

				if(key == 37) {
					this.prev();
				}
			});

			const id = i.getAttribute("href").split("#")[1];

			// Set aria controls
			i.setAttribute("aria-controls", id + "-content");
			i.setAttribute("id", id + "-label");

			const content = this.el.querySelector(".tab-content[id='" + id + "-content']");
			content.setAttribute("aria-labelledby", id + "-label");
			
		});

		// Open from hash
		let hash = window.location.hash.substring(1, window.location.hash.length);

		if(this.settings.hash && hash) {
			const el = this.nav.querySelector("li a[href='#" + hash + "']");
			
			if(el) {
				this.select(el);
			}	
		}
		else {
			this.select(this.nav.querySelector("li > a"));
		}
	}

	prev() {
		const el = this.current.parentNode;
		this.select(el.previousElementSibling ? el.previousElementSibling.firstElementChild : el.parentNode.lastElementChild.firstElementChild);
	}

	next() {
		const el = this.current.parentNode;
		this.select(el.nextElementSibling ? el.nextElementSibling.firstElementChild : el.parentNode.firstElementChild.firstElementChild);
	}

	select(el) {
		// Clear all
		this.nav.querySelectorAll("li > a").forEach(i => {
			i.classList.remove("active");
			i.setAttribute("aria-selected", false);
		});

		this.el.querySelectorAll(".tab-content").forEach(i => {
			i.classList.remove("active");
			i.setAttribute("aria-hidden", true);
		});

		// Select current nav item
		el.classList.add("active");
		el.setAttribute("aria-selected", true);

		// Select current content
		const id = el.getAttribute("href").split("#")[1];

		const content = this.el.querySelector(".tab-content[id='" + id + "-content']");
		content.classList.add("active");
		content.setAttribute("aria-hidden", false);

		// Set hash
		if(this.settings.hash) {
			location.hash = id;
		}

		this.current = el;

		// Dispatch event
		this.dispatchEvent("open", {detail: {id: el.getAttribute("href")}});

		// el.focus();
	}
}