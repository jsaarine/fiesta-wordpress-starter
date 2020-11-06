class CookieConsent {

	constructor(props) {
		this.title = props.title ? props.title : "";
		this.text = props.text ? props.text : "";
		this.linkText = props.linkText ? props.linkText : "";
		this.linkUrl = props.linkUrl ? props.linkUrl : "";
		this.consentButtonText = props.consentButtonText ? props.consentButtonText : "";
		this.settingsButtonText = props.settingsButtonText ? props.settingsButtonText : "";
		this.declineButtonText = props.declineButtonText ? props.declineButtonText : "";
		this.settings = props.settings || false;
		this.suppress = props.suppress || false;
		this.overlay = props.overlay || false;
		this.scripts = props.scripts ? props.scripts : {};
		this.cookieName = props.cookieName ? props.cookieName : "cookie_consent";

		this.build();
	}

	build() {
		// Create content
		this.el = document.createElement("div");
		const settingsButton = this.settings ? `<button class="settings" data-overlay-button="cookie-overlay">${this.settingsButtonText}</button>` : '';
		const declineButton = this.declineButtonText ? `<button class="c-button decline">${this.declineButtonText}</button>` : '';

		this.el.classList.add("c-cookie-consent");
		this.el.innerHTML = `
		<div>
			<div>
				<h2>${this.title}</h2>
				<p>${this.text} <a href="${this.linkUrl}">${this.linkText}</a></p>
				<div class="buttons">
					${declineButton}
					<button class="c-button accept">${this.consentButtonText}</button>
				</div>
				${settingsButton}
			</div>
		</div>`;

		// Overlay
		if(this.overlay) {
			this.el.classList.add("overlay");

			// Focus trapping
			let focusableElements = [].slice.call(this.el.querySelectorAll("button, [href], input, select, textarea, [tabindex='0']"));
			focusableElements = focusableElements.filter(item => item.getAttribute("tabindex") != "-1");

			const firstFocusableElement = focusableElements[0];
			const lastFocusableElement = focusableElements[focusableElements.length - 1];

			this.el.addEventListener("keydown", function(e) {
				var key = e.which || e.keyCode;

				if(key != 9) {
					return;
				}

				if(e.shiftKey) {
					if(document.activeElement === firstFocusableElement) {
						lastFocusableElement.focus();
						e.preventDefault();
					}
				} else {
					if(document.activeElement === lastFocusableElement) {
						firstFocusableElement.focus();
						e.preventDefault();
					}
				}
			});
		}

		// document.body.appendChild(el);
		document.body.insertBefore(this.el, document.body.firstChild);

		const consent = this.getConsent();

		if(consent) {
			this.runScripts(consent, this.scripts);
		}
		else {
			if(!this.suppress) {
				this.el.classList.add("active");

				if(this.overlay) {
					document.documentElement.classList.add("cookie-consent-open");
				}
			}
		}

		// Accept
		this.el.querySelector(".c-button.accept").addEventListener("click", e => {
			this.createCookie(this.cookieName, JSON.stringify(["0", "1", "2", "3"]), 365);
			// this.el.style.display = "none";
			this.close();

			if(this.dialogElement) {
				this.dialogElement.querySelectorAll("input").forEach(item => {
					item.checked = true;
				});
			}

			this.runScripts(this.getConsent(), this.scripts);
		});

		// Decline
		if(this.declineButtonText) {
			this.el.querySelector(".c-button.decline").addEventListener("click", e => {
				this.createCookie(this.cookieName, JSON.stringify(["0"]), 365);
				this.close();
			});
		}

		// Settings overlay
		if(this.settings) {
			this.dialogElement = document.createElement("div");
			this.dialogElement.innerHTML = `
			<div class="c-overlay cookie" id="cookie-overlay" aria-hidden="true" aria-labelledby="cookie-overlay-title" role="dialog" tabindex="-1">
				<div class="inner">
					<button class="overlay-close" aria-label="Close"></button>
					<h2 id="cookie-overlay-title">${this.settings.title}</h2>
					<p>${this.settings.text}</p>
					<div class="select">
						<label>
							<input type="checkbox" value="0" checked disabled>
							<span></span>${this.settings.cookieTypes.necessary.name}
						</label>
						<p>${this.settings.cookieTypes.necessary.description}</p>
						<label>
							<input type="checkbox" value="1" ${consent && consent.indexOf("1") != -1 ? "checked" : ""}>
							<span></span>${this.settings.cookieTypes.functional.name}
						</label>
						<p>${this.settings.cookieTypes.functional.description}</p>
						<label>
							<input type="checkbox" value="2" ${consent && consent.indexOf("2") != -1 ? "checked" : ""}>
							<span></span>${this.settings.cookieTypes.analytics.name}
						</label>
						<p>${this.settings.cookieTypes.analytics.description}</p>
						<label>
							<input type="checkbox" value="3" ${consent && consent.indexOf("3") != -1 ? "checked" : ""}>
							<span></span>${this.settings.cookieTypes.marketing.name}
						</label>
						<p>${this.settings.cookieTypes.marketing.description}</p>
					</div>
					<button class="c-button save">${this.settings.button}</button>
				</div>
			</div>`;

			// document.body.appendChild(this.dialogElement);
			document.body.insertBefore(this.dialogElement, this.el.nextSibling);

			this.dialog = new Overlay(this.dialogElement.querySelector(".c-overlay"));

			this.dialogElement.querySelector("button.save").addEventListener("click", e => {
				const consent = [];

				this.dialogElement.querySelectorAll("input").forEach(item => {
					if(item.checked) {
						consent.push(item.value);
					}
				});

				if(!this.getConsent()) {
					this.runScripts(consent, this.scripts);
				}

				this.createCookie(this.cookieName, JSON.stringify(consent), 365);
				// this.el.style.display = "none";
				this.close();
				this.dialog.close();
			});
		}
	}

	close() {
		this.el.classList.remove("active");
		document.documentElement.classList.remove("cookie-consent-open");
	}

	openSettings() {
		this.dialog.open();
	}

	getConsent() {
		let cookie = this.readCookie(this.cookieName);

		if(cookie) {
			cookie = JSON.parse(this.readCookie(this.cookieName));

			if(Array.isArray(cookie)) {
				return cookie;
			}
		}

		return false;
	}

	createCookie(name, value, days) {
		let expires = "";

		if(days) {
			const date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}

		document.cookie = name + "=" + value + expires + "; path=/";
	}

	readCookie(name) {
		const nameEQ = name + "=";
		const ca = document.cookie.split(';');

		for(let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
	}

	// addScript(type, value) {
	// 	const consent = this.getConsent();

	// 	const added = {
	// 		functional: [],
	// 		analytics: [],
	// 		marketing: []
	// 	};

	// 	if(consent) {
	// 		added[type].push(value);

	// 		this.runScripts(consent, added);
	// 	}
	// 	else {
	// 		this.scripts[type].push(value);
	// 	}
	// }

	runScripts(consent, scripts) {
		if(consent.indexOf("1") != -1) {
			scripts.functional.forEach(item => {
				item.call();
			});
		}

		if(consent.indexOf("2") != -1) {
			scripts.analytics.forEach(item => {
				item.call();
			});
		}

		if(consent.indexOf("3") != -1) {
			scripts.marketing.forEach(item => {
				item.call();
			});
		}
	}
}
