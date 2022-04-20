class Accordion extends Component {

	constructor(el, settings) {
		super(el);

		this.build();
	}

	static setup(arr, settings) {
		return super.setup(arr, Accordion, "[data-accordion]", settings);
	}

	build() {
		// Get id of element
		const elementId = this.el.getAttribute("id");

		if(!elementId) {
			console.warn("Accordion id is missing");
		}

		// Setup click event
		this.el.querySelectorAll("[data-accordion-item]").forEach((item, index) => {
			const labelId = elementId + "-label" + (index + 1);
			const contentId = elementId + "-content" + (index + 1);
			const button = item.firstElementChild.firstElementChild;
			const content = item.lastElementChild;

			content.setAttribute("id", contentId);
			content.setAttribute("aria-labelledby", labelId);
			content.setAttribute("aria-hidden", true);

			button.setAttribute("id", labelId);
			button.setAttribute("aria-controls", contentId);

			// Click event
			item.querySelector(".title button").addEventListener("click", e => {
				e.preventDefault();

				item.classList.toggle("active");
				content.setAttribute("aria-hidden", !item.classList.contains("active"));

				Core.slideToggle(content, () => {
					if(content.style.visibility == "hidden") {
						item.classList.remove("active");
					}
					else {
						item.classList.add("active");
					}
				});

				// Set ARIA
				button.setAttribute("aria-expanded", item.closest("[data-accordion-item]").classList.contains("active"));
			});
		});
	}
}
