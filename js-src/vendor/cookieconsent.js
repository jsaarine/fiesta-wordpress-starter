var cookieConsent;

(function () {

    var n = cookieConsent = function(props) {
        var css = ".cookie-consent {position: fixed; bottom: 0; left: 0; width: 100%; background: #eee; z-index: 10000; padding: .8em 1em; display: none; } .cookie-consent > .inner { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; width: 100%; max-width: 1200px; margin: 0 auto; } @media (max-width: 640px) { .cookie-consent > .inner { flex-direction: column; } } .cookie-consent p {margin: 0 0 1em 0; font-size: 0.875em; line-height: 1.25; } @media (min-width: 641px) { .cookie-consent p { padding-right: 1.5625em; margin-bottom: 0; } } .cookie-consent a {text-decoration: underline; } .cookie-consent button {margin: 0; cursor: pointer; padding: .4em 1.5em; border: none; white-space: nowrap; background: #000; color: #fff; font-size: .875em; }";
        var text = props.text ? props.text : "";
        var linkText = props.linkText ? props.linkText : "";
        var linkUrl = props.linkUrl ? props.linkUrl : "";
        var buttonText = props.buttonText ? props.buttonText : "";
        n.cookieName = props.cookieName ? props.cookieName : "cookie-consent";

        var el = document.createElement("div");
        el.classList.add("cookie-consent");
        el.innerHTML = '<div class="inner"><p>' + text + ' <a href="' + linkUrl + '">' + linkText + '</a></p><button class="button">' + buttonText + '</button></div>';

        var style = document.createElement("style");
        style.innerHTML = css;

        el.appendChild(style);
        document.querySelector("body").appendChild(el);

        if(!n.hasConsent()) {
            el.style.display = "block";
        }

        el.querySelector("button").addEventListener("click", function(e) {
            n.createCookie(n.cookieName, 1, 365);
            el.style.display = "none";
        });
    }

    n.hasConsent = function() {
        return n.readCookie(n.cookieName) == "1";
    }

    n.createCookie = function(name, value, days) {
        var expires = "";
        if (days) {
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
    
})();
