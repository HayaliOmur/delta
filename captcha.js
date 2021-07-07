var RECAPTCHA_V2_KEY = '6LfjUBcUAAAAAF6y2yIZHgHIOO5Y3cU5osS2gbMl';
var RECAPTCHA_V3_KEY = '6LcEt74UAAAAAIc_T6dWpsRufGCvvau5Fd7_G1tY';

function Recaptcha(a, b, c) {
    var d = this;
    this.init = function() {
        this.ready = true;
    };
    this.show = function() {
        d.sessionExpired = false;
        document.getElementById(this.curtin).style.display = 'block';
    };
    this.hide = function() {
        document.getElementById(this.curtin).style.display = 'none';
    };
    this.reset = function() {
        console.log('grecaptcha.reset()');
        grecaptcha.reset();
    };
    this.onRender = function(f) {
        window.core.recaptchaResponse(f);
        d.hide();
        d.reset();
    };
    this.validateExpire = function() {
        console.log('i.sessionExpired && i.show()');

        if (d.sessionExpired)
            d.show();
    };
    this.onExpire = function() {
        console.log('EXPIRE');
    };
    this.render = function() {
        if (this.ready) {
            this.show();
            if (null == this.widget) {
                this.widget = grecaptcha.render(this.id, {
                    sitekey: RECAPTCHA_V2_KEY,
                    callback: this.onRender.bind(this),
                    'data-theme': 'dark',
                    'expired-callback': this.onExpire.bind(this)
                });
            }
        } else this.reset();
        return this.ready;
    };
    this.id = b;
    this.curtin = a;
    this.widget = null;
    this.ready = false;
    window.recaptchaClientId = null;
    this.hide();
}

function CaptchaRouter(a) {
    function d() {
        var k = document.createElement('script');
        k.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=onloadCallbackV3&render=explicit');
        document.head.appendChild(k);
    }

    function e() {
        return i.render();
    }

    function f(j, k) {
        if (window.recaptchaClientId === null) window.recaptchaClientId = window.grecaptchaV3.render('captchaWindowV3', {
            sitekey: RECAPTCHA_V3_KEY,
            badge: 'inline',
            size: 'invisible'
        });

        grecaptcha.reset(window.recaptchaClientId);
        window.grecaptchaV3.execute(window.recaptchaClientId, {
            action: j
        }).then(function(m) {
            k(m);
        });
    }

    function g() {
        i.init();
    }

    function h() {
        Object.defineProperty(window, 'grecaptchaV3', {
            value: window.grecaptcha,
            writable: false,
            configurable: false,
            enumerable: false
        });
        var j = document.createElement('script');
        j.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit');
        document.head.appendChild(j);
    }
    var i = window.myCaptcha = new Recaptcha('captchaWindow', 'verifyUser', a);
    window.onloadCallbackV3 = h;
    window.onloadCallback = g;
    d();
    return {
        load: d,
        validateExpire: i.validateExpire.bind(i),
        requestCaptcha: e,
        requestCaptchaV3: f,
        onloadCallback: g,
        onloadCallbackV3: h
    };
}
window.agarCaptcha = CaptchaRouter();