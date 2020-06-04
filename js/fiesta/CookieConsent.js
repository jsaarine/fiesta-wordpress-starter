var cookieConsent;

(function () {

	var n = cookieConsent = function(props) {
		var text = props.text ? props.text : "";
		var linkText = props.linkText ? props.linkText : "";
		var linkUrl = props.linkUrl ? props.linkUrl : "";
		var consentButtonText = props.consentButtonText ? props.consentButtonText : "";
		var settingsButtonText = props.settingsButtonText ? props.settingsButtonText : "";
		var declineButtonText = props.declineButtonText ? props.declineButtonText : "";
		n.scripts = props.scripts ? props.scripts : {};
		var settings = props.settings || false;
		n.cookieName = props.cookieName ? props.cookieName : "cookie_consent";

		var el = document.createElement("div");
		el.classList.add("c-cookie-consent");
		el.innerHTML = `
		<div class="inner">
			<p>${text}<br><a href="${linkUrl}">${linkText}</a></p>
			<button class="button">${consentButtonText}</button>
			<button class="decline" data-overlay-button="cookie-overlay">${settings ? settingsButtonText : declineButtonText}</button>
		</div>`;

		document.body.appendChild(el);

		var consent = n.getConsent();
		
		if(consent) {
			n.runScripts(consent, n.scripts);
		}
		else {
			el.style.display = "block";
		}

		el.querySelector(".button").addEventListener("click", function(e) {
			n.createCookie(n.cookieName, JSON.stringify(["1", "2"]), 365);
			el.style.display = "none";

			n.appendScripts(n.scripts.analytics);
			n.appendScripts(n.scripts.marketing);
		});

		if(settings) {
			n.overlayElement = document.createElement("div");

			n.overlayElement.innerHTML = `
			<div class="c-overlay m-cookie" id="cookie-overlay" data-overlay aria-hidden="true" aria-labelledby="cookie-overlay-title" role="dialog" tabindex="-1">
				<div class="inner">
					<button class="overlay-close" aria-label="Close"></button>
					<h2 id="cookie-overlay-title">${settings.title}</h2>
					<p>${settings.text}</p>
					<div class="select">
						<label>
							<input type="checkbox" value="0" checked disabled> ${settings.cookieTypes.required}
						</label>
						<label>
							<input type="checkbox" value="1"> ${settings.cookieTypes.analytics}
						</label>
						<label>
							<input type="checkbox" value="2"> ${settings.cookieTypes.marketing}
						</label>
					</div>
					<button class="c-button save">${settings.button}</button>
				</div>
			</div>`;

			document.body.appendChild(n.overlayElement);

			n.overlay = new Overlay(n.overlayElement.querySelector("[data-overlay]"));
			      
			n.overlayElement.querySelector("button.save").addEventListener("click", function(e) {
				var consent = [];

				n.overlayElement.querySelectorAll("input").forEach(function(item) {
					if(item.checked) {
						consent.push(item.value);
					}
				});

				if(!n.getConsent()) {
					n.runScripts(consent, n.scripts);
				}

				n.createCookie(n.cookieName, JSON.stringify(consent), 365);
				el.style.display = "none";
				n.overlay.close();
			});	
		}
		else {
			el.querySelector(".decline").addEventListener("click", function(e) {
				n.createCookie(n.cookieName, JSON.stringify(["0"]), 365);
				el.style.display = "none";
			});
		}
	}

	n.openSettings = function() {
		n.overlay.open();

		var consent = n.getConsent();

		if(consent.indexOf("1") != -1) {
			n.overlayElement.querySelector("input[value='1']").checked = true;
		}

		if(consent.indexOf("2") != -1) {
			n.overlayElement.querySelector("input[value='2']").checked = true;
		}
	}

	n.getConsent = function() {
		var cookie = n.readCookie(n.cookieName);
		
		if(cookie) {
			cookie = JSON.parse(n.readCookie(n.cookieName));

			if(Array.isArray(cookie)) {
				return cookie;
			}
		}
		
		return false;
	}

	n.createCookie = function(name, value, days) {
		var expires = "";

		if(days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}

		document.cookie = name + "=" + value + expires + "; path=/";
	}

	n.readCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');

		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
	}

	n.addScript = function(type, value) {
		var consent = n.getConsent();

		var added = {
			analytics: [],
			marketing: []
		};
		
		if(consent) {
			added[type].push(value);

			n.runScripts(consent, added);
		}
		else {
			n.scripts[type].push(value);
		}
	}

	n.runScripts = function(consent, scripts) {
		if(consent.indexOf("1") != -1) {
			n.appendScripts(scripts.analytics);
		}

		if(consent.indexOf("2") != -1) {
			n.appendScripts(scripts.marketing);
		}
	}

	n.appendScripts = function(scripts) {
		if(scripts) {
			scripts.forEach(function(item) {
				var script = document.createElement("script");
				scriptSrc = document.createTextNode(item);

				script.appendChild(scriptSrc);
				document.body.appendChild(script);
			});
		}
	}

})();
