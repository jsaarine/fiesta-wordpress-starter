var cookieConsent;

(function () {

	var n = cookieConsent = function(props) {
		// var css = ".cookie-consent {position: fixed; bottom: 0; left: 0; width: 100%; background: #eee; z-index: 10000; padding: .8em 1em; display: none; } .cookie-consent > .inner { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; width: 100%; max-width: 1200px; margin: 0 auto; } @media (max-width: 640px) { .cookie-consent > .inner { flex-direction: column; } } .cookie-consent p {margin: 0 0 1em 0; font-size: 0.875em; line-height: 1.25; } @media (min-width: 641px) { .cookie-consent p { padding-right: 1.5625em; margin-bottom: 0; } } .cookie-consent a {text-decoration: underline; } .cookie-consent .button {margin: 0; cursor: pointer; padding: .4em 1.5em; border: none; white-space: nowrap; background: #000; color: #fff; font-size: .875em; } .cookie-consent .decline { font-size: .875em; margin-left: 1em; background: none; border: none; padding: 0; text-decoration: underline; } @media (max-width: 640px) { .cookie-consent .decline { margin-top: 1em; } }";
		var text = props.text ? props.text : "";
		var linkText = props.linkText ? props.linkText : "";
		var linkUrl = props.linkUrl ? props.linkUrl : "";
		var consentButtonText = props.consentButtonText ? props.consentButtonText : "";
		var settingsButtonText = props.settingsButtonText ? props.settingsButtonText : "";
		var declineButtonText = props.declineButtonText ? props.declineButtonText : "";
		var scripts = props.scripts ? props.scripts : {};
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

		/*var style = document.createElement("style");
		style.innerHTML = css;

		el.appendChild(style);*/

		document.querySelector("body").appendChild(el);

		var consent = n.getConsent();
		
		if(consent) {
			n.runAllScripts(consent, scripts);
		}
		else {
			el.style.display = "block";
		}

		el.querySelector(".button").addEventListener("click", function(e) {
			n.createCookie(n.cookieName, JSON.stringify(["1", "2"]), 365);
			el.style.display = "none";

			n.runScripts(scripts.analytics);
			n.runScripts(scripts.marketing);
		});

		if(settings) {

			var overlay = `
			<div class="c-overlay" id="cookie-overlay" data-overlay aria-hidden="true" aria-labelledby="cookie-overlay-title" role="dialog" tabindex="-1">
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

		
			var overlayElement = document.createElement("div");
			overlayElement.innerHTML = overlay;
			el.appendChild(overlayElement);

			new Overlay(overlayElement.querySelector("[data-overlay]"));
			      
			overlayElement.querySelector("button.save").addEventListener("click", function(e) {
				var consent = [];

				overlayElement.querySelectorAll("input").forEach(function(item) {
					if(item.checked) {
						consent.push(item.value);
					}
				});

				n.createCookie(n.cookieName, JSON.stringify(consent), 365);
				el.style.display = "none";

				n.runAllScripts(consent, scripts);
			});	
		}
		else {
			el.querySelector(".decline").addEventListener("click", function(e) {
				n.createCookie(n.cookieName, JSON.stringify([]), 365);
				el.style.display = "none";
			});
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

	n.runAllScripts = function(consent, scripts) {
		if(consent.indexOf("1") != -1) {
			n.runScripts(scripts.analytics);
		}

		if(consent.indexOf("2") != -1) {
			n.runScripts(scripts.marketing);
		}
	}

	n.runScripts = function(scripts) {
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
