class Filter extends Component {

	constructor(el, settings) {
		super(el);

		// Settings
		this.settings = {
			selectMultiple: true
		}

		this.init(settings);
		
		this.all = this.el.querySelector("button[data-id='all']");
		this.items = document.querySelector("[data-filter-items='" + el.getAttribute("data-filter") + "']");

		this.build();
	}

	static setup(arr) {
		return super.setup(arr, Filter, "[data-filter]");
	}

	build() {
		this.el.querySelectorAll("button").forEach(i => {
			i.addEventListener("click", e => {
				const id = i.getAttribute("data-id");

				// All
				if(id == "all") {
					i.classList.add("m-active");

					// Remove all
					this.el.querySelectorAll("button").forEach(j => {
						if(i != j) {
							j.classList.remove("m-active");
						}
					});
				}
				// Any other filter
				else {
					i.classList.toggle("m-active");

					if(this.settings.selectMultiple) {
						// Hide all button
						if(this.all) {
							this.all.classList.remove("m-active");
						}
					}
					else {
						// Hide all except current
						this.el.querySelectorAll("button").forEach(j => {
							if(i != j) {
								j.classList.remove("m-active");
							}
						});		
					}
				}
				
				// Update items
				this.update();
			});
		});

		this.update();
	}

	update() {
		const filters = [];

		// Update active filters
		this.el.querySelectorAll("button:not([data-id='all'])").forEach(i => {
			if(i.classList.contains("m-active")) {
				filters.push(i.getAttribute("data-id"));
			}
		});

		// Only run if items element exixts
		if(this.items) {
			// Filters applied, hide all items
			if(filters.length > 0) {
				this.items.querySelectorAll("[data-filter-item]").forEach(i => {
					i.classList.add("m-hidden");
				});
			}
			// No filters applied, show all items
			else {
				this.items.querySelectorAll("[data-filter-item]").forEach(i => {
					i.classList.remove("m-hidden");
				});

				if(this.all) {
					this.all.classList.add("m-active");
				}
			}

			// Show filtered items
			filters.forEach(filter => {
				this.items.querySelectorAll("[data-filter-item][data-id~='" + filter + "']").forEach(item => {
					item.classList.remove("m-hidden");
				});
				
			});
		}

		this.dispatchEvent("change", {detail: {filters: filters}});
	}
}
