class Accordion extends Component {

	constructor(el, settings) {
		super(el);

		this.settings = {
			hash: false
		};

		this.init(settings);

		this.build();
	}

	static setup(arr, settings) {
		return super.setup(arr, Accordion, "[data-accordion]", settings);
	}

	build() {
		// Scroll to anchor
		let hash = window.location.hash.substring(1, window.location.hash.length);

		if(this.settings.hash && hash && hash != "!") {
			const el = this.el.querySelector("[data-accordion-item] > .title a[href='#" + hash + "'");

			if(el) {
				el.closest("[data-accordion-item]").classList.add("active");
				el.setAttribute("aria-expanded", true);

				const pos = el.getBoundingClientRect().top + Core.scrollTop();
				window.scroll({top: pos, behavior: "smooth"});
			}
		}

		// Get id of element
		const elementId = this.el.getAttribute("id");

		if(!elementId) {
			console.warn("Accordion id is missing");
		}

		// Setup click event
		this.el.querySelectorAll("[data-accordion-item]").forEach((i, index) => {
			const labelId = elementId + "-label" + (index + 1);
			const contentId = elementId + "-content" + (index + 1);
			const button = i.firstElementChild.firstElementChild;
			const content = i.lastElementChild;
			// const parent = i.closest("[data-accordion-item]");

			content.setAttribute("id", contentId);
			content.setAttribute("aria-labelledby", labelId);
			content.setAttribute("aria-hidden", true);

			button.setAttribute("id", labelId);
			button.setAttribute("aria-controls", contentId);

			// Click event
			i.querySelector(".title a").addEventListener("click", e => {
				e.preventDefault();

				i.classList.toggle("active");

				if(i.classList.contains("active")) {
					content.setAttribute("aria-hidden", false);
				}
				else {
					content.setAttribute("aria-hidden", true);
				}

				// Core.slideToggle(i.closest("[data-accordion-item]").lastElementChild);
				i.closest("[data-accordion-item]").lastElementChild.classList.toggle("active");

				// Set ARIA
				button.setAttribute("aria-expanded", i.closest("li").classList.contains("active"));

				// Close others
				if(this.settings.hash) {
					this.el.querySelectorAll("[data-accordion-item]").forEach(j => {
						if(i != j) {
							j.classList.remove("active");
							j.querySelector("a").setAttribute("aria-expanded", false);
						}
					});
				}

				// Scroll to
				if(this.settings.hash && i.classList.contains("active")) {
					const pos = i.getBoundingClientRect().top + Core.scrollTop();
					window.scroll({top: pos, behavior: "smooth"});
				}

				hash = e.target.getAttribute("href").split("#")[1];

				if(this.settings.hash && hash) {
					// Hash
					if(i.classList.contains("active")) {
						window.location.hash = hash;
					}
					else {
						window.location.hash = '#!';
					}
				}
			});
		});
	}
}
