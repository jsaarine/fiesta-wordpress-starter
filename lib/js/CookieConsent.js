class CookieConsent {

	constructor(props) {
		this.build(props);
	}

	build(props) {
		const text = props.text ? props.text : "";
		const linkText = props.linkText ? props.linkText : "";
		const linkUrl = props.linkUrl ? props.linkUrl : "";
		const consentButtonText = props.consentButtonText ? props.consentButtonText : "";
		const settingsButtonText = props.settingsButtonText ? props.settingsButtonText : "";
		const declineButtonText = props.declineButtonText ? props.declineButtonText : "";
		const settings = props.settings || false;

		this.scripts = props.scripts ? props.scripts : {};
		this.cookieName = props.cookieName ? props.cookieName : "cookie_consent";

		// Create content
		const el = document.createElement("div");
		const settingsButton = settings ? `<button class="settings" data-overlay-button="cookie-overlay">${settingsButtonText}</button>` : '';
		const declineButton = declineButtonText ? `<button class="c-button decline">${declineButtonText}</button>` : '';

		el.classList.add("c-cookie-consent");
		// el.classList.add("overlay");
		el.innerHTML = `
		<div>
			<div>
				<p>${text} <a href="${linkUrl}">${linkText}</a></p>
				<div>
					<button class="c-button accept">${consentButtonText}</button>
					${declineButton}
				</div>
				${settingsButton}
			</div>
		</div>`;

		document.body.appendChild(el);
		// document.body.insertBefore(el, document.body.firstChild);

		const consent = this.getConsent();

		if(consent) {
			this.runScripts(consent, this.scripts);
		}
		else {
			el.style.display = "block";
		}

		// Accept
		el.querySelector(".c-button.accept").addEventListener("click", e => {
			this.createCookie(this.cookieName, JSON.stringify(["0", "1", "2"]), 365);
			el.style.display = "none";

			if(this.overlayElement) {
				this.overlayElement.querySelectorAll("input").forEach(item => {
					item.checked = true;
				});
			}

			this.appendScripts(this.scripts.analytics);
			this.appendScripts(this.scripts.marketing);
		});

		// Decline
		if(declineButtonText) {
			el.querySelector(".c-button.decline").addEventListener("click", e => {
				this.createCookie(this.cookieName, JSON.stringify(["0"]), 365);
				el.style.display = "none";
			});
		}

		// Settings overlay
		if(settings) {
			this.overlayElement = document.createElement("div");
			this.overlayElement.innerHTML = `
			<div class="c-overlay cookie" id="cookie-overlay" aria-hidden="true" aria-labelledby="cookie-overlay-title" role="dialog" tabindex="-1">
				<div class="inner">
					<button class="overlay-close" aria-label="Close"></button>
					<h2 id="cookie-overlay-title">${settings.title}</h2>
					<p>${settings.text}</p>
					<div class="select">
						<label>
							<input type="checkbox" value="0" checked disabled>
							<span></span>${settings.cookieTypes.necessary.name}
						</label>
						<p>${settings.cookieTypes.necessary.description}</p>
						<label>
							<input type="checkbox" value="1" ${consent && consent.indexOf("1") != -1 ? "checked" : ""}>
							<span></span>${settings.cookieTypes.analytics.name}
						</label>
						<p>${settings.cookieTypes.analytics.description}</p>
						<label>
							<input type="checkbox" value="2" ${consent && consent.indexOf("2") != -1 ? "checked" : ""}>
							<span></span>${settings.cookieTypes.marketing.name}
						</label>
						<p>${settings.cookieTypes.marketing.description}</p>
					</div>
					<button class="c-button save">${settings.button}</button>
				</div>
			</div>`;

			document.body.appendChild(this.overlayElement);

			this.overlay = new Overlay(this.overlayElement.querySelector(".c-overlay"));

			this.overlayElement.querySelector("button.save").addEventListener("click", e => {
				const consent = [];

				this.overlayElement.querySelectorAll("input").forEach(item => {
					if(item.checked) {
						consent.push(item.value);
					}
				});

				if(!this.getConsent()) {
					this.runScripts(consent, this.scripts);
				}

				this.createCookie(this.cookieName, JSON.stringify(consent), 365);
				el.style.display = "none";
				this.overlay.close();
			});
		}
	}

	openSettings() {
		this.overlay.open();
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

	addScript(type, value) {
		const consent = this.getConsent();

		const added = {
			analytics: [],
			marketing: []
		};

		if(consent) {
			added[type].push(value);

			this.runScripts(consent, added);
		}
		else {
			this.scripts[type].push(value);
		}
	}

	runScripts(consent, scripts) {
		if(consent.indexOf("1") != -1) {
			// this.appendScripts(scripts.analytics);
			scripts.analytics.forEach(item => {
				item.call();
			});
		}

		if(consent.indexOf("2") != -1) {
			// this.appendScripts(scripts.marketing);
			scripts.marketing.forEach(item => {
				item.call();
			});
		}
	}

	appendScripts(scripts) {
		if(scripts) {
			scripts.forEach(item => {
				const script = document.createElement("script");
				const scriptSrc = document.createTextNode(item);

				script.appendChild(scriptSrc);
				document.body.appendChild(script);
			});
		}
	}
}
