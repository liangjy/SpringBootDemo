var nginxIp='132.96.171.33:9991';
window.TILE_VERSION = {
    "ditu": {
        "normal": {
            "version": "088",
            "updateDate": "20180628"
        },
        "satellite": {
            "version": "009",
            "updateDate": "20180628"
        },
        "normalTraffic": {
            "version": "081",
            "updateDate": "20180628"
        },
        "satelliteTraffic": {
            "version": "083",
            "updateDate": "20180628"
        },
        "mapJS": {
            "version": "104",
            "updateDate": "20180628"
        },
        "satelliteStreet": {
            "version": "083",
            "updateDate": "20180628"
        },
        "panoClick": {
            "version": "1033",
            "updateDate": "20180706"
        },
        "panoUdt": {
            "version": "20180706",
            "updateDate": "20180706"
        },
        "panoSwfAPI": {
            "version": "20150123",
            "updateDate": "20150123"
        },
        "panoSwfPlace": {
            "version": "20141112",
            "updateDate": "20141112"
        },
        "earthVector": {
            "version": "001",
            "updateDate": "20180628"
        }
    },
    "webapp": {
        "high_normal": {
            "version": "001",
            "updateDate": "20180628"
        },
        "lower_normal": {
            "version": "002",
            "updateDate": "20180628"
        }
    },
    "api_for_mobile": {
        "vector": {
            "version": "002",
            "updateDate": "20180628"
        },
        "vectorIcon": {
            "version": "002",
            "updateDate": "20180628"
        }
    }
};
window.BMAP_AUTHENTIC_KEY = "BRBlNEMNKB7jwL2kAULKI66G";
(function () {
    function aa(a) {
        throw a;
    }
    var l = void 0,
        q = !0,
        s = null,
        t = !1;

    function u() {
        return function () {}
    }
    function ba(a) {
        return function (b) {
            this[a] = b;
        }
    }
    function w(a) {
        return function () {
            return this[a];
        }
    }
    function ca(a) {
        return function () {
            return a;
        }
    }
    var da, fa = [];

    function ga(a) {
        return function () {
            return fa[a].apply(this, arguments)
        }
    }
    function ha(a, b) {
        return fa[a] = b
    }
    var ia, z = ia = z || {
            version: "1.3.4"
        };
    z.aa = "$BAIDU$";
    window[z.aa] = window[z.aa] || {};
    z.object = z.object || {};
    z.extend = z.object.extend = function (a, b) {
        for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    };
    z.D = z.D || {};
    z.D.$ = function (a) {
        return "string" == typeof a || a instanceof String ? document.getElementById(a) : a && a.nodeName && (1 == a.nodeType ||
            9 == a.nodeType) ? a : s
    };
    z.$ = z.Dc = z.D.$;
    z.D.U = function (a) {
        a = z.D.$(a);
        if (a === s) return a;
        a.style.display = "none";
        return a
    };
    z.U = z.D.U;
    z.lang = z.lang || {};
    z.lang.qg = function (a) {
        return "[object String]" == Object.prototype.toString.call(a)
    };
    z.qg = z.lang.qg;
    z.D.Fj = function (a) {
        return z.lang.qg(a) ? document.getElementById(a) : a
    };
    z.Fj = z.D.Fj;
    z.D.getElementsByClassName = function (a, b) {
        var c;
        if (a.getElementsByClassName) c = a.getElementsByClassName(b);
        else {
            var e = a;
            e == s && (e = document);
            c = [];
            var e = e.getElementsByTagName("*"),
                f = e.length,
                g = RegExp("(^|\\s)" + b + "(\\s|$)"),
                i, k;
            for (k = i = 0; i < f; i++) g.test(e[i].className) && (c[k] = e[i], k++)
        }
        return c
    };
    z.getElementsByClassName = z.D.getElementsByClassName;
    z.D.contains = function (a, b) {
        var c = z.D.Fj,
            a = c(a),
            b = c(b);
        return a.contains ? a != b && a.contains(b) : !! (a.compareDocumentPosition(b) & 16)
    };
    z.ca = z.ca || {};
    /msie (\d+\.\d)/i.test(navigator.userAgent) && (z.ca.ia = z.ia = document.documentMode || +RegExp.$1);
    var ja = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        rowspan: "rowSpan",
        valign: "vAlign",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    8 > z.ca.ia ? (ja["for"] = "htmlFor", ja["class"] = "className") : (ja.htmlFor = "for", ja.className = "class");
    z.D.xG = ja;
    z.D.iF = function (a, b, c) {
        a = z.D.$(a);
        if (a === s) return a;
        if ("style" == b) a.style.cssText = c;
        else {
            b = z.D.xG[b] || b;
            a.setAttribute(b, c)
        }
        return a
    };
    z.iF = z.D.iF;
    z.D.jF = function (a, b) {
        a = z.D.$(a);
        if (a === s) return a;
        for (var c in b) z.D.iF(a, c, b[c]);
        return a
    };
    z.jF = z.D.jF;
    z.Nk = z.Nk || {};
    (function () {
        var a = RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
        z.Nk.trim = function (b) {
            return ("" + b).replace(a, "")
        }
    })();
    z.trim = z.Nk.trim;
    z.Nk.Oo = function (a, b) {
        var a = "" + a,
            c = Array.prototype.slice.call(arguments, 1),
            e = Object.prototype.toString;
        if (c.length) {
            c = c.length == 1 ? b !== s && /\[object Array\]|\[object Object\]/.test(e.call(b)) ? b : c : c;
            return a.replace(/#\{(.+?)\}/g, function (a, b) {
                var i = c[b];
                "[object Function]" == e.call(i) && (i = i(b));
                return "undefined" == typeof i ? "" : i
            })
        }
        return a
    };
    z.Oo = z.Nk.Oo;
    z.D.Pb = function (a, b) {
        a = z.D.$(a);
        if (a === s) return a;
        for (var c = a.className.split(/\s+/), e = b.split(/\s+/), f, g = e.length, i, k = 0; k < g; ++k) {
            i = 0;
            for (f = c.length; i < f; ++i) if (c[i] == e[k]) {
                    c.splice(i, 1);
                    break
                }
        }
        a.className = c.join(" ");
        return a
    };
    z.Pb = z.D.Pb;
    z.D.Hx = function (a, b, c) {
        a = z.D.$(a);
        if (a === s) return a;
        var e;
        if (a.insertAdjacentHTML) a.insertAdjacentHTML(b, c);
        else {
            e = a.ownerDocument.createRange();
            b = b.toUpperCase();
            if (b == "AFTERBEGIN" || b == "BEFOREEND") {
                e.selectNodeContents(a);
                e.collapse(b == "AFTERBEGIN")
            } else {
                b = b == "BEFOREBEGIN";
                e[b ? "setStartBefore" : "setEndAfter"](a);
                e.collapse(b)
            }
            e.insertNode(e.createContextualFragment(c))
        }
        return a
    };
    z.Hx = z.D.Hx;
    z.D.show = function (a) {
        a = z.D.$(a);
        if (a === s) return a;
        a.style.display = "";
        return a
    };
    z.show = z.D.show;
    z.D.CD = function (a) {
        a = z.D.$(a);
        return a === s ? a : a.nodeType == 9 ? a : a.ownerDocument || a.document
    };
    z.D.Ua = function (a, b) {
        a = z.D.$(a);
        if (a === s) return a;
        for (var c = b.split(/\s+/), e = a.className, f = " " + e + " ", g = 0, i = c.length; g < i; g++) f.indexOf(" " +
                c[g] + " ") < 0 && (e = e + (" " + c[g]));
        a.className = e;
        return a
    };
    z.Ua = z.D.Ua;
    z.D.DB = z.D.DB || {};
    z.D.Fl = z.D.Fl || [];
    z.D.Fl.filter = function (a, b, c) {
        for (var e = 0, f = z.D.Fl, g; g = f[e]; e++) if (g = g[c]) b = g(a, b);
        return b
    };
    z.Nk.tO = function (a) {
        return a.indexOf("-") < 0 && a.indexOf("_") < 0 ? a : a.replace(/[-_][^-_]/g, function (a) {
            return a.charAt(1).toUpperCase()
        })
    };
    z.D.F_ = function (a) {
        z.D.Zs(a, "expand") ? z.D.Pb(a, "expand") : z.D.Ua(a, "expand")
    };
    z.D.Zs = function (a) {
        if (arguments.length <= 0 || typeof a === "function") return this;
        if (this.size() <= 0) return t;
        var a = a.replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/\s+/g, " "),
            b = a.split(" "),
            c;
        z.forEach(this, function (a) {
            for (var a = a.className, f = 0; f < b.length; f++) if (!~(" " + a + " ").indexOf(" " + b[f] + " ")) {
                    c = t;
                    return
                }
            c !== t && (c = q)
        });
        return c
    };
    z.D.ij = function (a, b) {
        var c = z.D,
            a = c.$(a);
        if (a === s) return a;
        var b = z.Nk.tO(b),
            e = a.style[b];
        if (!e) var f = c.DB[b],
        e = a.currentStyle || (z.ca.ia ? a.style : getComputedStyle(a, s)), e = f && f.get ? f.get(a, e) : e[f || b];
        if (f = c.Fl) e = f.filter(b, e, "get");
        return e
    };
    z.ij = z.D.ij;
    /opera\/(\d+\.\d)/i.test(navigator.userAgent) && (z.ca.opera = +RegExp.$1);
    z.ca.lM = /webkit/i.test(navigator.userAgent);
    z.ca.qY = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
    z.ca.pE = "CSS1Compat" == document.compatMode;
    z.D.ga = function (a) {
        a = z.D.$(a);
        if (a === s) return a;
        var b = z.D.CD(a),
            c = z.ca,
            e = z.D.ij;
        c.qY > 0 && b.getBoxObjectFor && e(a, "position");
        var f = {
            left: 0,
            top: 0
        }, g;
        if (a == (c.ia && !c.pE ? b.body : b.documentElement)) return f;
        if (a.getBoundingClientRect) {
            a = a.getBoundingClientRect();
            f.left = Math.floor(a.left) + Math.max(b.documentElement.scrollLeft, b.body.scrollLeft);
            f.top = Math.floor(a.top) + Math.max(b.documentElement.scrollTop, b.body.scrollTop);
            f.left = f.left - b.documentElement.clientLeft;
            f.top = f.top - b.documentElement.clientTop;
            a = b.body;
            b = parseInt(e(a, "borderLeftWidth"));
            e = parseInt(e(a, "borderTopWidth"));
            if (c.ia && !c.pE) {
                f.left = f.left - (isNaN(b) ? 2 : b);
                f.top = f.top - (isNaN(e) ? 2 : e)
            }
        } else {
            g = a;
            do {
                f.left = f.left + g.offsetLeft;
                f.top = f.top + g.offsetTop;
                if (c.lM > 0 && e(g, "position") == "fixed") {
                    f.left = f.left + b.body.scrollLeft;
                    f.top = f.top + b.body.scrollTop;
                    break
                }
                g = g.offsetParent
            } while (g && g != a);
            if (c.opera > 0 || c.lM > 0 && e(a, "position") == "absolute") f.top = f.top - b.body.offsetTop;
            for (g = a.offsetParent; g && g != b.body;) {
                f.left = f.left - g.scrollLeft;
                if (!c.opera || g.tagName != "TR") f.top = f.top - g.scrollTop;
                g = g.offsetParent
            }
        }
        return f
    };
    /firefox\/(\d+\.\d)/i.test(navigator.userAgent) && (z.ca.Ne = +RegExp.$1);
    /BIDUBrowser/i.test(navigator.userAgent) && (z.ca.D1 = q);
    var ka = navigator.userAgent;
    /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ka) && !/chrome/i.test(ka) && (z.ca.uy = +(RegExp.$1 || RegExp.$2));
    /chrome\/(\d+\.\d)/i.test(navigator.userAgent) && (z.ca.Dw = +RegExp.$1);
    z.jc = z.jc || {};
    z.jc.Eb = function (a, b) {
        var c, e, f = a.length;
        if ("function" == typeof b) for (e = 0; e < f; e++) {
                c = a[e];
                c = b.call(a, c, e);
                if (c === t) break
        }
        return a
    };
    z.Eb = z.jc.Eb;
    z.lang.aa = function () {
        return "TANGRAM__" + (window[z.aa]._counter++).toString(36)
    };
    window[z.aa]._counter = window[z.aa]._counter || 1;
    window[z.aa]._instances = window[z.aa]._instances || {};
    z.lang.it = function (a) {
        return "[object Function]" == Object.prototype.toString.call(a)
    };
    z.lang.Ca = function (a) {
        this.aa = a || z.lang.aa();
        window[z.aa]._instances[this.aa] = this
    };
    window[z.aa]._instances = window[z.aa]._instances || {};
    z.lang.Ca.prototype.Yh = ga(0);
    z.lang.Ca.prototype.toString = function () {
        return "[object " + (this.vQ || "Object") + "]"
    };
    z.lang.Yy = function (a, b) {
        this.type = a;
        this.returnValue = q;
        this.target = b || s;
        this.currentTarget = s
    };
    z.lang.Ca.prototype.addEventListener = function (a, b, c) {
        if (z.lang.it(b)) {
            !b.Xk && (b.Xk = {});
            !this.xi && (this.xi = {});
            var e = this.xi,
                f;
            if (typeof c == "string" && c) {
                /[^\w\-]/.test(c) && aa("nonstandard key:" + c);
                f = b.zx = c
            }
            a.indexOf("on") != 0 && (a = "on" + a);
            typeof e[a] != "object" && (e[a] = {});
            typeof b.Xk[a] != "object" && (b.Xk[a] = {});
            f = f || z.lang.aa();
            b.Xk[a].zx = f;
            e[a][f] = b
        }
    };
    z.lang.Ca.prototype.removeEventListener = function (a, b) {
        a.indexOf("on") != 0 && (a = "on" + a);
        if (z.lang.it(b)) {
            if (!b.Xk || !b.Xk[a]) return;
            b = b.Xk[a].zx
        } else if (!z.lang.qg(b)) return;
        !this.xi && (this.xi = {});
        var c = this.xi;
        c[a] && c[a][b] && delete c[a][b]
    };
    z.lang.Ca.prototype.dispatchEvent = function (a, b) {
        z.lang.qg(a) && (a = new z.lang.Yy(a));
        !this.xi && (this.xi = {});
        var b = b || {}, c;
        for (c in b) a[c] = b[c];
        var e = this.xi,
            f = a.type;
        a.target = a.target || this;
        a.currentTarget = this;
        f.indexOf("on") != 0 && (f = "on" + f);
        z.lang.it(this[f]) && this[f].apply(this, arguments);
        if (typeof e[f] == "object") for (c in e[f]) e[f][c].apply(this, arguments);
        return a.returnValue
    };
    z.lang.ta = function (a, b, c) {
        var e, f, g = a.prototype;
        f = new Function;
        f.prototype = b.prototype;
        f = a.prototype = new f;
        for (e in g) f[e] = g[e];
        a.prototype.constructor = a;
        a.v_ = b.prototype;
        if ("string" == typeof c) f.vQ = c
    };
    z.ta = z.lang.ta;
    z.lang.Kc = function (a) {
        return window[z.aa]._instances[a] || s
    };
    z.platform = z.platform || {};
    z.platform.eM = /macintosh/i.test(navigator.userAgent);
    z.platform.r3 = /MicroMessenger/i.test(navigator.userAgent);
    z.platform.mM = /windows/i.test(navigator.userAgent);
    z.platform.yY = /x11/i.test(navigator.userAgent);
    z.platform.Am = /android/i.test(navigator.userAgent);
    /android (\d+\.\d)/i.test(navigator.userAgent) && (z.platform.LJ = z.LJ = RegExp.$1);
    z.platform.sY = /ipad/i.test(navigator.userAgent);
    z.platform.lE = /iphone/i.test(navigator.userAgent);

    function la(a, b) {
        a.domEvent = b = window.event || b;
        a.clientX = b.clientX || b.pageX;
        a.clientY = b.clientY || b.pageY;
        a.offsetX = b.offsetX || b.layerX;
        a.offsetY = b.offsetY || b.layerY;
        a.screenX = b.screenX;
        a.screenY = b.screenY;
        a.ctrlKey = b.ctrlKey || b.metaKey;
        a.shiftKey = b.shiftKey;
        a.altKey = b.altKey;
        if (b.touches) {
            a.touches = [];
            for (var c = 0; c < b.touches.length; c++) a.touches.push({
                    clientX: b.touches[c].clientX,
                    clientY: b.touches[c].clientY,
                    screenX: b.touches[c].screenX,
                    screenY: b.touches[c].screenY,
                    pageX: b.touches[c].pageX,
                    pageY: b.touches[c].pageY,
                    target: b.touches[c].target,
                    identifier: b.touches[c].identifier
                })
        }
        if (b.changedTouches) {
            a.changedTouches = [];
            for (c = 0; c < b.changedTouches.length; c++) a.changedTouches.push({
                    clientX: b.changedTouches[c].clientX,
                    clientY: b.changedTouches[c].clientY,
                    screenX: b.changedTouches[c].screenX,
                    screenY: b.changedTouches[c].screenY,
                    pageX: b.changedTouches[c].pageX,
                    pageY: b.changedTouches[c].pageY,
                    target: b.changedTouches[c].target,
                    identifier: b.changedTouches[c].identifier
                })
        }
        if (b.targetTouches) {
            a.targetTouches = [];
            for (c = 0; c < b.targetTouches.length; c++) a.targetTouches.push({
                    clientX: b.targetTouches[c].clientX,
                    clientY: b.targetTouches[c].clientY,
                    screenX: b.targetTouches[c].screenX,
                    screenY: b.targetTouches[c].screenY,
                    pageX: b.targetTouches[c].pageX,
                    pageY: b.targetTouches[c].pageY,
                    target: b.targetTouches[c].target,
                    identifier: b.targetTouches[c].identifier
                })
        }
        a.rotation = b.rotation;
        a.scale = b.scale;
        return a
    }
    z.lang.Tw = function (a) {
        var b = window[z.aa];
        b.ES && delete b.ES[a]
    };
    z.event = {};
    z.M = z.event.M = function (a, b, c) {
        if (!(a = z.$(a))) return a;
        b = b.replace(/^on/, "");
        a.addEventListener ? a.addEventListener(b, c, t) : a.attachEvent && a.attachEvent("on" + b, c);
        return a
    };
    z.ad = z.event.ad = function (a, b, c) {
        if (!(a = z.$(a))) return a;
        b = b.replace(/^on/, "");
        a.removeEventListener ? a.removeEventListener(b, c, t) : a.detachEvent && a.detachEvent("on" + b, c);
        return a
    };
    z.D.Zs = function (a, b) {
        if (!a || !a.className || typeof a.className != "string") return t;
        var c = -1;
        try {
            c = a.className == b || a.className.search(RegExp("(\\s|^)" + b + "(\\s|$)"))
        } catch (e) {
            return t
        }
        return c > -1
    };
    z.PK = function () {
        function a(a) {
            document.addEventListener && (this.element = a, this.SK = this.tk ? "touchstart" : "mousedown", this.kD =
                this.tk ? "touchmove" : "mousemove", this.jD = this.tk ? "touchend" : "mouseup", this.jh = t, this.cu =
                this.bu = 0, this.element.addEventListener(this.SK, this, t), ia.M(this.element, "mousedown", u()),
                this.handleEvent(s))
        }
        a.prototype = {
            tk: "ontouchstart" in window || "createTouch" in document,
            start: function (a) {
                ma(a);
                this.jh = t;
                this.bu = this.tk ? a.touches[0].clientX : a.clientX;
                this.cu = this.tk ? a.touches[0].clientY : a.clientY;
                this.element.addEventListener(this.kD, this, t);
                this.element.addEventListener(this.jD, this, t)
            },
            move: function (a) {
                na(a);
                var c = this.tk ? a.touches[0].clientY : a.clientY;
                if (10 < Math.abs((this.tk ? a.touches[0].clientX : a.clientX) - this.bu) || 10 < Math.abs(c - this.cu))
                    this.jh = q
            },
            end: function (a) {
                na(a);
                this.jh || (a = document.createEvent("Event"), a.initEvent("tap", t, q), this.element.dispatchEvent(a));
                this.element.removeEventListener(this.kD, this, t);
                this.element.removeEventListener(this.jD, this, t)
            },
            handleEvent: function (a) {
                if (a) switch (a.type) {
                    case this.SK:
                        this.start(a);
                        break;
                    case this.kD:
                        this.move(a);
                        break;
                    case this.jD:
                        this.end(a)
                }
            }
        };
        return function (b) {
            return new a(b);
        }
    }();
    var B = window.BMap || {};
    B.version = "3.0";
    B.EU = 0.34 > Math.random();
    0 <= B.version.indexOf("#") && (B.version = "3.0");
    B.zr = [];
    B.Se = function (a) {
        this.zr.push(a)
    };
    B.or = [];
    B.Lm = function (a) {
        this.or.push(a)
    };
    B.TU = B.apiLoad || u();
    B.g0 = B.verify || function () {
        B.version && B.version >= 1.5 && oa(B.Uc + "?qt=verify&ak=" + qa, function (a) {
            if (a && a.error !== 0) {
                if (typeof map !== "undefined") {
                    map.La().innerHTML = "";
                    map.xi = {}
                }
                B = s;
                var b =
                    "\u767e\u5ea6\u672a\u6388\u6743\u4f7f\u7528\u5730\u56feAPI\uff0c\u53ef\u80fd\u662f\u56e0\u4e3a\u60a8\u63d0\u4f9b\u7684\u5bc6\u94a5\u4e0d\u662f\u6709\u6548\u7684\u767e\u5ea6LBS\u5f00\u653e\u5e73\u53f0\u5bc6\u94a5\uff0c\u6216\u6b64\u5bc6\u94a5\u672a\u5bf9\u672c\u5e94\u7528\u7684\u767e\u5ea6\u5730\u56feJavaScriptAPI\u6388\u6743\u3002\u60a8\u53ef\u4ee5\u8bbf\u95ee\u5982\u4e0b\u7f51\u5740\u4e86\u89e3\u5982\u4f55\u83b7\u53d6\u6709\u6548\u7684\u5bc6\u94a5\uff1ahttp://lbsyun.baidu.com/apiconsole/key#\u3002";
                switch (a.error) {
                case 101:
                    b =
                        "\u5f00\u53d1\u8005\u7981\u7528\u4e86\u8be5ak\u7684jsapi\u670d\u52a1\u6743\u9650\u3002\u60a8\u53ef\u4ee5\u8bbf\u95ee\u5982\u4e0b\u7f51\u5740\u4e86\u89e3\u5982\u4f55\u83b7\u53d6\u6709\u6548\u7684\u5bc6\u94a5\uff1ahttp://lbsyun.baidu.com/apiconsole/key#\u3002";
                    break;
                case 102:
                    b =
                        "\u5f00\u53d1\u8005Referer\u4e0d\u6b63\u786e\u3002\u60a8\u53ef\u4ee5\u8bbf\u95ee\u5982\u4e0b\u7f51\u5740\u4e86\u89e3\u5982\u4f55\u83b7\u53d6\u6709\u6548\u7684\u5bc6\u94a5\uff1ahttp://lbsyun.baidu.com/apiconsole/key#\u3002"
                }
                alert(b)
            }
        })
    };
    var qa = window.BMAP_AUTHENTIC_KEY;
    window.BMAP_AUTHENTIC_KEY = s;
    var ra = window.BMap_loadScriptTime,
        sa = (new Date).getTime(),
        ta = s,
        ua = q,
        va = 5042,
        xa = 5002,
        ya = 5003,
        za = "load_mapclick",
        Aa = 5038,
        Ba = 5041,
        Ca = 5047,
        Da = 5036,
        Ea = 5039,
        Fa = 5037,
        Ga = 5040,
        Ha = 5011,
        Ia = 7E3;
    var Ja = 0;

    function Ka(a, b) {
        if (a = z.$(a)) {
            var c = this;
            z.lang.Ca.call(c);
            b = b || {};
            c.K = {
                hC: 200,
                Wb: q,
                ax: t,
                aD: q,
                Lo: q,
                Mo: b.enableWheelZoom || t,
                NK: q,
                cD: q,
                Es: q,
                Zw: q,
                gD: q,
                Jo: b.enable3DBuilding || t,
                Gc: 25,
                s0: 240,
                GU: 450,
                Vb: G.Vb,
                Ad: G.Ad,
                Kx: !! b.Kx,
                dc: Math.round(b.minZoom) || 1,
                Yb: Math.round(b.maxZoom) || 19,
                Gb: b.mapType || La,
                m4: t,
                JK: b.drawer || Ja,
                $w: q,
                Xw: 500,
                xW: b.enableHighResolution !== t,
                Zi: b.enableMapClick !== t,
                devicePixelRatio: b.devicePixelRatio || window.devicePixelRatio || 1,
                NF: 99,
                qe: b.mapStyle || s,
                FY: b.logoControl === t ? t : q,
                aV: [],
                xw: b.beforeClickIcon || s
            };
            c.K.qe && (this.hY(c.K.qe.controls), this.YL(c.K.qe.geotableId));
            c.K.qe && c.K.qe.styleId && c.b3(c.K.qe.styleId);
            c.K.Xl = {
                dark: {
                    backColor: "#2D2D2D",
                    textColor: "#bfbfbf",
                    iconUrl: "dicons"
                },
                normal: {
                    backColor: "#F3F1EC",
                    textColor: "#c61b1b",
                    iconUrl: "icons"
                },
                light: {
                    backColor: "#EBF8FC",
                    textColor: "#017fb4",
                    iconUrl: "licons"
                }
            };
            b.enableAutoResize && (c.K.Zw = b.enableAutoResize);
            b.enableStreetEntrance === t && (c.K.gD = b.enableStreetEntrance);
            b.enableDeepZoom === t && (c.K.NK = b.enableDeepZoom);
            var e = c.K.aV;
            if (H()) for (var f = 0, g = e.length; f < g; f++) if (z.ca[e[f]]) {
                        c.K.devicePixelRatio = 1;
                        break
                    }
            e = -1 < navigator.userAgent.toLowerCase().indexOf("android");
            f = -1 < navigator.userAgent.toLowerCase().indexOf("mqqbrowser");
            if (-1 < navigator.userAgent.toLowerCase().indexOf("UCBrowser") || e && f) c.K.NF = 99;
            c.Va = a;
            c.wB(a);
            a.unselectable = "on";
            a.innerHTML = "";
            a.appendChild(c.va());
            b.size && this.ue(b.size);
            e = c.tb();
            c.width = e.width;
            c.height = e.height;
            c.offsetX = 0;
            c.offsetY = 0;
            c.platform = a.firstChild;
            c.re = c.platform.firstChild;
            c.re.style.width = c.width + "px";
            c.re.style.height = c.height + "px";
            c.Qd = {};
            c.Je = new I(0, 0);
            c.mc = new I(0, 0);
            c.Oa = 3;
            c.Lc = 0;
            c.yC = s;
            c.xC = s;
            c.Ub = "";
            c.Ew = "";
            c.Fh = {};
            c.Fh.custom = {};
            c.Sa = 0;
            b.useWebGL === t && Na(t);
            c.P = new Oa(a, {
                Kf: "api",
                JS: q
            });
            c.P.U();
            c.P.nF(c);
            b = b || {};
            e = c.Gb = c.K.Gb;
            c.ce = e.Zo();
            e === Qa && Ra(xa);
            e === Sa && Ra(ya);
            e = c.K;
            e.KO = Math.round(b.minZoom);
            e.JO = Math.round(b.maxZoom);
            c.Qu();
            c.R = {
                Hc: t,
                kc: 0,
                mt: 0,
                qM: 0,
                v3: 0,
                $B: t,
                XE: -1,
                Le: []
            };
            c.platform.style.cursor = c.K.Vb;
            for (f = 0; f < B.zr.length; f++) B.zr[f](c);
            c.R.XE = f;
            c.ba();
            K.load("map", function () {
                c.hb()
            });
            c.K.Zi && (setTimeout(function () {
                Ra(za)
            }, 1E3), K.load("mapclick", function () {
                window.MPC_Mgr = window.MPC_Mgr || {};
                window.MPC_Mgr[c.aa] = new Ta(c)
            }, q));
            Ua() && K.load("oppc", function () {
                c.qz()
            });
            H() && K.load("opmb", function () {
                c.qz()
            });
            a = s;
            c.KB = []
        }
    }
    z.lang.ta(Ka, z.lang.Ca, "Map");
    z.extend(Ka.prototype, {
        va: function () {
            var a = L("div"),
                b = a.style;
            b.overflow = "visible";
            b.position = "absolute";
            b.zIndex = "0";
            b.top = b.left = "0px";
            var b = L("div", {
                "class": "BMap_mask"
            }),
                c = b.style;
            c.position = "absolute";
            c.top = c.left = "0px";
            c.zIndex = "9";
            c.overflow = "hidden";
            c.WebkitUserSelect = "none";
            a.appendChild(b);
            return a
        },
        wB: function (a) {
            var b = a.style;
            b.overflow = "hidden";
            "absolute" !== Va(a).position && (b.position = "relative", b.zIndex = 0);
            b.backgroundColor = "#F3F1EC";
            b.color = "#000";
            b.textAlign = "left"
        },
        ba: function () {
            var a = this;
            a.Tr = function () {
                var b = a.tb();
                if (a.width !== b.width || a.height !== b.height) {
                    var c = new O(a.width, a.height),
                        e = new P("onbeforeresize");
                    e.size = c;
                    a.dispatchEvent(e);
                    a.Yj((b.width - a.width) / 2, (b.height - a.height) / 2);
                    a.re.style.width = (a.width = b.width) + "px";
                    a.re.style.height = (a.height = b.height) + "px";
                    c = new P("onresize");
                    c.size = b;
                    a.dispatchEvent(c)
                }
            };
            a.K.Zw && (a.R.Xr = setInterval(a.Tr, 80))
        },
        Yj: function (a, b, c, e) {
            var f = this.na().yc(this.fa()),
                g = this.ce,
                i = q;
            c && I.dM(c) && (this.Je = new I(c.lng, c.lat), i = t);
            if (c = c && e ? g.wk(c, this.Ub) : this.mc) if (this.mc = new I(c.lng + a * f, c.lat - b * f), (a = g.ih(
                    this.mc, this.Ub)) && i) this.Je = a
        },
        Ag: function (a, b) {
            if (Wa(a) && (this.Qu(), this.dispatchEvent(new P("onzoomstart")), a = this.Qn(a).zoom, a !== this.Oa)) {
                this.Lc = this.Oa;
                this.Oa = a;
                var c;
                b ? c = b : this.bh() && (c = this.bh().ga());
                c && (c = this.$b(c, this.Lc), this.Yj(this.width / 2 - c.x, this.height / 2 - c.y, this.wb(c, this.Lc),
                    q));
                this.dispatchEvent(new P("onzoomstartcode"))
            }
        },
        Nc: function (a) {
            this.Ag(a)
        },
        RF: function (a) {
            this.Ag(this.Oa + 1, a)
        },
        SF: function (a) {
            this.Ag(this.Oa - 1, a)
        },
        li: function (a) {
            a instanceof I && (this.mc = this.ce.wk(a, this.Ub), this.Je = I.dM(a) ? new I(a.lng, a.lat) : this.ce.ih(
                this.mc, this.Ub))
        },
        ug: function (a, b) {
            a = Math.round(a) || 0;
            b = Math.round(b) || 0;
            this.Yj(-a, -b)
        },
        mw: function (a) {
            a && Xa(a.Ae) && (a.Ae(this), this.dispatchEvent(new P("onaddcontrol", a)))
        },
        BN: function (a) {
            a && Xa(a.remove) && (a.remove(), this.dispatchEvent(new P("onremovecontrol", a)))
        },
        qo: function (a) {
            a && Xa(a.qa) && (a.qa(this), this.dispatchEvent(new P("onaddcontextmenu", a)))
        },
        up: function (a) {
            a && Xa(a.remove) && (this.dispatchEvent(new P("onremovecontextmenu", a)), a.remove())
        },
        Ga: function (a) {
            a && Xa(a.Ae) && (a.Ae(this), this.dispatchEvent(new P("onaddoverlay", a)))
        },
        Qb: function (a) {
            a && Xa(a.remove) && (a.remove(), this.dispatchEvent(new P("onremoveoverlay", a)))
        },
        fK: function () {
            this.dispatchEvent(new P("onclearoverlays"))
        },
        Tg: function (a) {
            a && this.dispatchEvent(new P("onaddtilelayer", a))
        },
        qh: function (a) {
            a && this.dispatchEvent(new P("onremovetilelayer", a))
        },
        xg: function (a) {
            if (this.Gb !== a) {
                var b = new P("onsetmaptype");
                b.d4 = this.Gb;
                this.Gb = this.K.Gb = a;
                this.ce = this.Gb.Zo();
                this.Yj(0, 0, this.Ka(), q);
                this.Qu();
                var c = this.Qn(this.fa()).zoom;
                this.Ag(c);
                this.dispatchEvent(b);
                b = new P("onmaptypechange");
                b.Oa = c;
                b.Gb = a;
                this.dispatchEvent(b);
                (a === Ya || a === Sa) && Ra(ya)
            }
        },
        Sf: function (a) {
            var b = this;
            if (a instanceof I) b.li(a, {
                    noAnimation: q
                });
            else if ($a(a)) if (b.Gb === Qa) {
                    var c = G.dC[a];
                    c && (pt = c.k, b.Sf(pt))
                } else {
                    var e = this.DH();
                    e.qF(function (c) {
                        0 === e.nm() && 2 === e.Ia.result.type && (b.Sf(c.qk(0).point), Qa.mk(a) && b.kF(a))
                    });
                    e.search(a, {
                        log: "center"
                    })
                }
        },
        yd: function (a, b) {
            "[object Undefined]" !== Object.prototype.toString.call(b) && (b = parseInt(b));
            B.wn("cus.fire", "time", {
                z_loadscripttime: sa - ra
            });
            var c = this;
            if ($a(a)) if (c.Gb === Qa) {
                    var e = G.dC[a];
                    e && (pt = e.k, c.yd(pt, b))
                } else {
                    var f = c.DH();
                    f.qF(function (e) {
                        if (0 === f.nm() && (2 === f.Ia.result.type || 11 === f.Ia.result.type)) {
                            var e = e.qk(0).point,
                                g = b || ab.ex(f.Ia.content.level, c);
                            c.yd(e, g);
                            Qa.mk(a) && c.kF(a)
                        }
                    });
                    f.search(a, {
                        log: "center"
                    })
                } else if (a instanceof I && b) {
                b = c.Qn(b).zoom;
                c.Lc = c.Oa || b;
                c.Oa = b;
                e = c.Je;
                c.Je = new I(a.lng, a.lat);
                c.mc = c.ce.wk(c.Je, c.Ub);
                c.yC = c.yC || c.Oa;
                c.xC = c.xC || c.Je;
                var g = new P("onload"),
                    i = new P("onloadcode");
                g.point = new I(a.lng, a.lat);
                g.pixel = c.$b(c.Je, c.Oa);
                g.zoom = b;
                c.loaded || (c.loaded = q, c.dispatchEvent(g), ta || (ta = bb()));
                c.dispatchEvent(i);
                g = new P("onmoveend");
                g.gH = "centerAndZoom";
                e.ob(c.Je) || c.dispatchEvent(g);
                c.dispatchEvent(new P("onmoveend"));
                c.Lc !== c.Oa && (e = new P("onzoomend"), e.gH = "centerAndZoom", c.dispatchEvent(e));
                c.K.Jo && c.Jo()
            }
        },
        DH: function () {
            this.R.CM || (this.R.CM = new cb(1));
            return this.R.CM
        },
        reset: function () {
            this.yd(this.xC, this.yC, q)
        },
        enableDragging: function () {
            this.K.Wb = q
        },
        disableDragging: function () {
            this.K.Wb = t
        },
        enableInertialDragging: function () {
            this.K.$w = q
        },
        disableInertialDragging: function () {
            this.K.$w = t
        },
        enableScrollWheelZoom: function () {
            this.K.Mo = q
        },
        disableScrollWheelZoom: function () {
            this.K.Mo = t
        },
        enableContinuousZoom: function () {
            this.K.Lo = q
        },
        disableContinuousZoom: function () {
            this.K.Lo = t
        },
        enableDoubleClickZoom: function () {
            this.K.aD = q
        },
        disableDoubleClickZoom: function () {
            this.K.aD = t
        },
        enableKeyboard: function () {
            this.K.ax = q
        },
        disableKeyboard: function () {
            this.K.ax = t
        },
        enablePinchToZoom: function () {
            this.K.Es = q
        },
        disablePinchToZoom: function () {
            this.K.Es = t
        },
        enableAutoResize: function () {
            this.K.Zw = q;
            this.Tr();
            this.R.Xr || (this.R.Xr = setInterval(this.Tr, 80))
        },
        disableAutoResize: function () {
            this.K.Zw = t;
            this.R.Xr && (clearInterval(this.R.Xr), this.R.Xr = s)
        },
        Jo: function () {
            this.K.Jo = q;
            this.En || (this.En = new db({
                WK: q
            }), this.Tg(this.En))
        },
        gW: function () {
            this.K.Jo = t;
            this.En && (this.qh(this.En), this.En = s, delete this.En)
        },
        tb: function () {
            return this.ls && this.ls instanceof O ? new O(this.ls.width, this.ls.height) : new O(this.Va.clientWidth,
                this.Va.clientHeight)
        },
        ue: function (a) {
            a && a instanceof O ? (this.ls = a, this.Va.style.width = a.width + "px", this.Va.style.height = a.height +
                "px") : this.ls = s
        },
        Ka: w("Je"),
        fa: w("Oa"),
        wV: function () {
            this.Tr()
        },
        Qn: function (a) {
            var b = this.K.dc,
                c = this.K.Yb,
                e = t,
                a = Math.round(a);
            a < b && (e = q, a = b);
            a > c && (e = q, a = c);
            return {
                zoom: a,
                lD: e
            }
        },
        La: w("Va"),
        $b: function (a, b) {
            b = b || this.fa();
            return this.ce.$b(a, b, this.mc, this.tb(), this.Ub)
        },
        wb: function (a, b) {
            b = b || this.fa();
            return this.ce.wb(a, b, this.mc, this.tb(), this.Ub)
        },
        Re: function (a, b) {
            if (a) {
                var c = this.$b(new I(a.lng, a.lat), b);
                c.x -= this.offsetX;
                c.y -= this.offsetY;
                return c
            }
        },
        qN: function (a, b) {
            if (a) {
                var c = new Q(a.x, a.y);
                c.x += this.offsetX;
                c.y += this.offsetY;
                return this.wb(c, b)
            }
        },
        pointToPixelFor3D: function (a, b) {
            var c = map.Ub;
            this.Gb === Qa && c && eb.lK(a, this, b)
        },
        X3: function (a, b) {
            var c = map.Ub;
            this.Gb === Qa && c && eb.kK(a, this, b)
        },
        Y3: function (a, b) {
            var c = this,
                e = map.Ub;
            c.Gb === Qa && e && eb.lK(a, c, function (a) {
                a.x -= c.offsetX;
                a.y -= c.offsetY;
                b && b(a)
            })
        },
        U3: function (a, b) {
            var c = map.Ub;
            this.Gb === Qa && c && (a.x += this.offsetX, a.y += this.offsetY, eb.kK(a, this, b))
        },
        ne: function (a) {
            if (!this.Jx()) return new fb;
            var b = a || {}, a = b.margins || [0, 0, 0, 0],
                c = b.zoom || s,
                b = this.wb({
                    x: a[3],
                    y: this.height - a[2]
                }, c),
                a = this.wb({
                    x: this.width - a[1],
                    y: a[0]
                }, c);
            return new fb(b, a)
        },
        Jx: function () {
            return !!this.loaded
        },
        OR: function (a, b) {
            for (var c = this.na(), e = b.margins || [10, 10, 10, 10], f = b.zoomFactor || 0, g = e[1] + e[3], e = e[0] +
                    e[2], i = c.Uo(), k = c = c.jm(); k >= i; k--) {
                var m = this.na().yc(k);
                if (a.FF().lng / m < this.width - g && a.FF().lat / m < this.height - e) break
            }
            k += f;
            k < i && (k = i);
            k > c && (k = c);
            return k
        },
        Ys: function (a, b) {
            var c = {
                center: this.Ka(),
                zoom: this.fa()
            };
            if (!a || !a instanceof fb && 0 === a.length || a instanceof fb && a.mj()) return c;
            var e = [];
            a instanceof fb ? (e.push(a.Lf()), e.push(a.Pe())) : e = a.slice(0);
            for (var b = b || {}, f = [], g = 0, i = e.length; g < i; g++) f.push(this.ce.wk(e[g], this.Ub));
            e = new fb;
            for (g = f.length - 1; 0 <= g; g--) e.extend(f[g]);
            if (e.mj()) return c;
            c = e.Ka();
            f = this.OR(e, b);
            b.margins && (e = b.margins, g = (e[1] - e[3]) / 2, e = (e[0] - e[2]) / 2, i = this.na().yc(f), b.offset &&
                (g = b.offset.width, e = b.offset.height), c.lng += i * g, c.lat += i * e);
            c = this.ce.ih(c, this.Ub);
            return {
                center: c,
                zoom: f
            }
        },
        uh: function (a, b) {
            var c;
            c = a && a.center ? a : this.Ys(a, b);
            var b = b || {}, e = b.delay || 200;
            if (c.zoom === this.Oa && b.enableAnimation !== t) {
                var f = this;
                setTimeout(function () {
                    f.li(c.center, {
                        duration: 210
                    })
                }, e)
            } else this.yd(c.center, c.zoom)
        },
        Nf: w("Qd"),
        bh: function () {
            return this.R.pb && this.R.pb.Wa() ? this.R.pb : s
        },
        getDistance: function (a, b) {
            if (a && b) {
                if (a.ob(b)) return 0;
                var c = 0,
                    c = S.So(a, b);
                if (c === s || c === l) c = 0;
                return c
            }
        },
        tx: function () {
            var a = [],
                b = this.ya,
                c = this.xe;
            if (b) for (var e in b) b[e] instanceof gb && a.push(b[e]);
            if (c) {
                e = 0;
                for (b = c.length; e < b; e++) a.push(c[e])
            }
            return a
        },
        na: w("Gb"),
        qz: function () {
            for (var a = this.R.XE; a < B.zr.length; a++) B.zr[a](this);
            this.R.XE = a
        },
        kF: function (a) {
            this.Ub = Qa.mk(a);
            this.Ew = Qa.hL(this.Ub);
            this.Gb === Qa && this.ce instanceof hb && (this.ce.Ui = this.Ub)
        },
        setDefaultCursor: function (a) {
            this.K.Vb = a;
            this.platform && (this.platform.style.cursor = this.K.Vb)
        },
        getDefaultCursor: function () {
            return this.K.Vb
        },
        setDraggingCursor: function (a) {
            this.K.Ad = a
        },
        getDraggingCursor: function () {
            return this.K.Ad
        },
        Ex: function () {
            return this.K.xW && 1.5 <= this.K.devicePixelRatio
        },
        ow: function (a, b) {
            b ? this.Fh[b] || (this.Fh[b] = {}) : b = "custom";
            a.tag = b;
            a instanceof ib && (this.Fh[b][a.aa] = a, a.qa(this));
            var c = this;
            K.load("hotspot", function () {
                c.qz()
            }, q)
        },
        qZ: function (a, b) {
            b || (b = "custom");
            this.Fh[b][a.aa] && delete this.Fh[b][a.aa]
        },
        Vl: function (a) {
            a || (a = "custom");
            this.Fh[a] = {}
        },
        Qu: function () {
            var a = this.Gb.Uo(),
                b = this.Gb.jm(),
                c = this.K;
            c.dc = c.KO || a;
            c.Yb = c.JO || b;
            c.dc < a && (c.dc = a);
            c.Yb > b && (c.Yb = b)
        },
        setMinZoom: function (a) {
            a = Math.round(a);
            a > this.K.Yb && (a = this.K.Yb);
            this.K.KO = a;
            this.oJ()
        },
        setMaxZoom: function (a) {
            a = Math.round(a);
            a < this.K.dc && (a = this.K.dc);
            this.K.JO = a;
            this.oJ()
        },
        oJ: function () {
            this.Qu();
            var a = this.K;
            this.Oa < a.dc ? this.Nc(a.dc) : this.Oa > a.Yb && this.Nc(a.Yb);
            var b = new P("onzoomspanchange");
            b.dc = a.dc;
            b.Yb = a.Yb;
            this.dispatchEvent(b)
        },
        d3: w("KB"),
        getKey: function () {
            return qa
        },
        Pt: function (a) {
            var b = this;
            window.MPC_Mgr && window.MPC_Mgr[b.aa] && window.MPC_Mgr[b.aa].close();
            b.K.Zi = t;
            B.wn("cus.fire", "count", "z_setmapstylecount");
            if (a) {
                b = this;
                a.styleJson && (a.styleStr = b.s_(a.styleJson));
                H() && z.ca.uy ? setTimeout(function () {
                    b.K.qe = a;
                    b.dispatchEvent(new P("onsetcustomstyles", a))
                }, 50) : (this.K.qe = a, this.dispatchEvent(new P("onsetcustomstyles", a)), this.YL(b.K.qe.geotableId));
                var c = {
                    style: a.style
                };
                a.features && 0 < a.features.length && (c.features = q);
                a.styleJson && 0 < a.styleJson.length && (c.styleJson = q);
                Ra(5050, c);
                a.style && (c = b.K.Xl[a.style] ? b.K.Xl[a.style].backColor : b.K.Xl.normal.backColor) && (this.La().style
                    .backgroundColor = c)
            }
        },
        hY: function (a) {
            this.controls || (this.controls = {
                navigationControl: new jb,
                scaleControl: new kb,
                overviewMapControl: new lb,
                mapTypeControl: new mb
            });
            var b = this,
                c;
            for (c in this.controls) b.BN(b.controls[c]);
            a = a || [];
            z.jc.Eb(a, function (a) {
                b.mw(b.controls[a])
            })
        },
        YL: function (a) {
            a ? this.js && this.js.vf === a || (this.qh(this.js), this.js = new nb({
                geotableId: a
            }), this.Tg(this.js)) : this.qh(this.js)
        },
        Sb: function () {
            var a = this.fa() >= this.K.NF && this.na() === La && 18 >= this.fa(),
                b = t;
            try {
                document.createElement("canvas").getContext("2d"), b = q
            } catch (c) {
                b = t
            }
            return a && b
        },
        getCurrentCity: function () {
            return {
                name: this.Vg,
                code: this.Yr
            }
        },
        km: function () {
            this.P.Vn();
            return this.P
        },
        setPanorama: function (a) {
            this.P = a;
            this.P.nF(this)
        },
        s_: function (a) {
            for (var b = {
                featureType: "t",
                elementType: "e",
                visibility: "v",
                color: "c",
                lightness: "l",
                saturation: "s",
                weight: "w",
                zoom: "z",
                hue: "h"
            }, c = {
                    all: "all",
                    geometry: "g",
                    "geometry.fill": "g.f",
                    "geometry.stroke": "g.s",
                    labels: "l",
                    "labels.text.fill": "l.t.f",
                    "labels.text.stroke": "l.t.s",
                    "lables.text": "l.t",
                    "labels.icon": "l.i"
                }, e = [], f = 0, g; g = a[f]; f++) {
                var i = g.stylers;
                delete g.stylers;
                z.extend(g, i);
                var i = [],
                    k;
                for (k in b) if (g[k]) if ("elementType" === k) i.push(b[k] + ":" + c[g[k]]);
                        else {
                            switch (g[k]) {
                            case "poilabel":
                                g[k] = "poi";
                                break;
                            case "districtlabel":
                                g[k] = "label"
                            }
                            i.push(b[k] + ":" + g[k])
                        }
                2 < i.length && e.push(i.join("|"))
            }
            return e.join(",")
        }
    });

    function Ra(a, b) {
        if (a) {
            var b = b || {}, c = "",
                e;
            for (e in b) c = c + "&" + e + "=" + encodeURIComponent(b[e]);
            var f = function (a) {
                a && (ob = q, setTimeout(function () {
                    pb.src = B.Uc + "images/blank.gif?" + a.src
                }, 50))
            }, g = function () {
                    var a = qb.shift();
                    a && f(a)
                };
            e = (1E8 * Math.random()).toFixed(0);
            ob ? qb.push({
                src: "product=jsapi&sub_product=jsapi&v=" + B.version + "&sub_product_v=" + B.version + "&t=" + e + "&code=" + a + "&da_src=" + a + c
            }) : f({
                src: "product=jsapi&sub_product=jsapi&v=" + B.version + "&sub_product_v=" + B.version + "&t=" + e + "&code=" + a + "&da_src=" + a + c
            });
            rb || (z.M(pb, "load", function () {
                ob = t;
                g()
            }), z.M(pb, "error", function () {
                ob = t;
                g()
            }), rb = q)
        }
    }
    var ob, rb, qb = [],
        pb = new Image;
    Ra(5E3, {
        device_pixel_ratio: window.devicePixelRatio,
        platform: navigator.platform
    });
    B.SL = {
        TILE_BASE_URLS: ["gss0.bdstatic.com/5bwHcj7lABFU8t_jkk_Z1zRvfdw6buu",
                "gss0.bdstatic.com/5bwHcj7lABFV8t_jkk_Z1zRvfdw6buu",
                "gss0.bdstatic.com/5bwHcj7lABFS8t_jkk_Z1zRvfdw6buu",
                "gss0.bdstatic.com/5bwHcj7lABFT8t_jkk_Z1zRvfdw6buu",
                "gss0.bdstatic.com/5bwHcj7lABFY8t_jkk_Z1zRvfdw6buu"],
        TILE_ONLINE_URLS: ["gss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv",
                "gss0.bdstatic.com/8bo_dTSlRMgBo1vgoIiO_jowehsv", "gss0.bdstatic.com/8bo_dTSlRcgBo1vgoIiO_jowehsv",
                "gss0.bdstatic.com/8bo_dTSlRsgBo1vgoIiO_jowehsv", "gss0.bdstatic.com/8bo_dTSlQ1gBo1vgoIiO_jowehsv"],
        TIlE_PERSPECT_URLS: ["gss0.bdstatic.com/-OR1cTe9KgQFm2e88IuM_a", "gss0.bdstatic.com/-ON1cTe9KgQFm2e88IuM_a",
                "gss0.bdstatic.com/-OZ1cTe9KgQFm2e88IuM_a", "gss0.bdstatic.com/-OV1cTe9KgQFm2e88IuM_a"],
        geolocControl: "gsp0.baidu.com/8LkJsjOpB1gCo2Kml5_Y_D3",
        TILES_YUN_HOST: ["gsp0.baidu.com/-eR1bSahKgkFkRGko9WTAnF6hhy", "gsp0.baidu.com/-eN1bSahKgkFkRGko9WTAnF6hhy",
                "gsp0.baidu.com/-eZ1bSahKgkFkRGko9WTAnF6hhy", "gsp0.baidu.com/-eV1bSahKgkFkRGko9WTAnF6hhy"],
        traffic: "gsp0.baidu.com/7_AZsjOpB1gCo2Kml5_Y_DAcsMJiwa",
        iw_pano: "gss0.bdstatic.com/5LUZemba_QUU8t7mm9GUKT-xh_",
        message: "gsp0.baidu.com/7vo0bSba2gU2pMbgoY3K",
        baidumap: "gsp0.baidu.com/80MWsjip0QIZ8tyhnq",
        wuxian: "gsp0.baidu.com/6a1OdTeaKgQFm2e88IuM_a",
        pano: ["gss0.bdstatic.com/5LUZemba_QUU8t7mm9GUKT-xh_", "gss0.bdstatic.com/5LUZemfa_QUU8t7mm9GUKT-xh_",
                "gss0.bdstatic.com/5LUZemja_QUU8t7mm9GUKT-xh_"],
        main_domain_nocdn: {
            baidu: "gsp0.baidu.com/9_Q4sjOpB1gCo2Kml5_Y_D3",
            other: nginxIp+"/api_map_baidu"
        },
        main_domain_cdn: {
            baidu: ["gss0.bdstatic.com/9_Q4vHSd2RZ3otebn9fN2DJv", "gss0.baidu.com/9_Q4vXSd2RZ3otebn9fN2DJv",
                    "gss0.bdstatic.com/9_Q4vnSd2RZ3otebn9fN2DJv"],
            other: [nginxIp+"/api_map_baidu"],
            webmap: ["gss0.baidu.com/6b1IcTe9R1gBo1vgoIiO_jowehsv"]
        },
        map_click: "gsp0.baidu.com/80MWbzKh2wt3n2qy8IqW0jdnxx1xbK",
        vector_traffic: "gss0.bdstatic.com/8aZ1cTe9KgQIm2_p8IuM_a"
    };
    B.aY = {
        TILE_BASE_URLS: [nginxIp+"/shangetu0_map_bdimg", nginxIp+"/shangetu1_map_bdimg", nginxIp+"/shangetu2_map_bdimg",
                nginxIp+"/shangetu3_map_bdimg", nginxIp+"/shangetu4_map_bdimg"],
        TILE_ONLINE_URLS: [nginxIp+"/online0_map_bdimg", nginxIp+"/online1_map_bdimg", nginxIp+"/online2_map_bdimg",
                nginxIp+"/online3_map_bdimg", nginxIp+"/online4_map_bdimg"],
        TIlE_PERSPECT_URLS: ["d0.map.baidu.com", "d1.map.baidu.com", "d2.map.baidu.com", "d3.map.baidu.com"],
        geolocControl: "loc.map.baidu.com",
        TILES_YUN_HOST: ["g0.api.map.baidu.com", "g1.api.map.baidu.com", "g2.api.map.baidu.com", "g3.api.map.baidu.com"],
        traffic: "its.map.baidu.com:8002",
        iw_pano: "pcsv0.map.bdimg.com",
        message: "j.map.baidu.com",
        baidumap: "map.baidu.com",
        wuxian: "wuxian.baidu.com",
        pano: ["pcsv0.map.bdimg.com", "pcsv1.map.bdimg.com", "pcsv2.map.bdimg.com"],
        main_domain_nocdn: {
            baidu: nginxIp+"/api_map_baidu"
        },
        main_domain_cdn: {
            baidu: [nginxIp+"/api0_map_bdimg", nginxIp+"/api1_map_bdimg", nginxIp+"/api2_map_bdimg"],
            webmap: ["webmap0.map.bdimg.com"]
        },
        map_click: "mapclick.map.baidu.com",
        vector_traffic: "or.map.bdimg.com"
    };
    B.X_ = {
        "0": {
            proto: "http://",
            domain: B.aY
        },
        1: {
            proto: "https://",
            domain: B.SL
        },
        2: {
            proto: "https://",
            domain: B.SL
        }
    };
    window.BMAP_PROTOCOL && "https" === window.BMAP_PROTOCOL && (window.HOST_TYPE = 2);
    B.Oy = window.HOST_TYPE || "0";
    B.url = B.X_[B.Oy];
    B.mp = B.url.proto + B.url.domain.baidumap + "/";
    B.Uc = B.url.proto + ("2" == B.Oy ? B.url.domain.main_domain_nocdn.other : B.url.domain.main_domain_nocdn.baidu) +
        "/";
    B.ka = B.url.proto + ("2" == B.Oy ? B.url.domain.main_domain_cdn.other[0] : B.url.domain.main_domain_cdn.baidu[0]) +
        "/";
    B.Si = B.url.proto + B.url.domain.main_domain_cdn.webmap[0] + "/";
    B.pg = function (a, b) {
        var c, e, b = b || "";
        switch (a) {
        case "main_domain_nocdn":
            c = B.Uc + b;
            break;
        case "main_domain_cdn":
            c = B.ka + b;
            break;
        default:
            e = B.url.domain[a], "[object Array]" == Object.prototype.toString.call(e) ? (c = [], z.jc.Eb(e, function (
                a, e) {
                c[e] = B.url.proto + a + "/" + b
            })) : c = B.url.proto + B.url.domain[a] + "/" + b
        }
        return c
    };

    function tb(a) {
        var b = {
            duration: 1E3,
            Gc: 30,
            Fo: 0,
            gc: ub.yM,
            At: u()
        };
        this.Wf = [];
        if (a) for (var c in a) b[c] = a[c];
        this.j = b;
        if (Wa(b.Fo)) {
            var e = this;
            setTimeout(function () {
                e.start()
            }, b.Fo)
        } else b.Fo != vb && this.start()
    }
    var vb = "INFINITE";
    tb.prototype.start = function () {
        this.Iu = bb();
        this.Vz = this.Iu + this.j.duration;
        wb(this)
    };
    tb.prototype.add = function (a) {
        this.Wf.push(a)
    };

    function wb(a) {
        var b = bb();
        b >= a.Vz ? (Xa(a.j.va) && a.j.va(a.j.gc(1)), Xa(a.j.finish) && a.j.finish(), 0 < a.Wf.length && (b = a.Wf[0],
            b.Wf = [].concat(a.Wf.slice(1)), b.start())) : (a.vy = a.j.gc((b - a.Iu) / a.j.duration), Xa(a.j.va) && a.j
            .va(a.vy), a.AF || (a.Qr = setTimeout(function () {
            wb(a)
        }, 1E3 / a.j.Gc)))
    }
    tb.prototype.stop = function (a) {
        this.AF = q;
        for (var b = 0; b < this.Wf.length; b++) this.Wf[b].stop(), this.Wf[b] = s;
        this.Wf.length = 0;
        this.Qr && (clearTimeout(this.Qr), this.Qr = s);
        this.j.At(this.vy);
        a && (this.Vz = this.Iu, wb(this))
    };
    tb.prototype.cancel = ga(1);
    var ub = {
        yM: function (a) {
            return a
        },
        reverse: function (a) {
            return 1 - a
        },
        WC: function (a) {
            return a * a
        },
        VC: function (a) {
            return Math.pow(a, 3)
        },
        Cs: function (a) {
            return -(a * (a - 2))
        },
        LK: function (a) {
            return Math.pow(a - 1, 3) + 1
        },
        KK: function (a) {
            return 0.5 > a ? 2 * a * a : -2 * (a - 2) * a - 1
        },
        e2: function (a) {
            return 0.5 > a ? 4 * Math.pow(a, 3) : 4 * Math.pow(a - 1, 3) + 1
        },
        f2: function (a) {
            return (1 - Math.cos(Math.PI * a)) / 2
        }
    };
    ub["ease-in"] = ub.WC;
    ub["ease-out"] = ub.Cs;
    var G = {
        VF: 34,
        WF: 21,
        XF: new O(21, 32),
        ZO: new O(10, 32),
        YO: new O(24, 36),
        XO: new O(12, 36),
        TF: new O(13, 1),
        pa: B.ka + "images/",
        m3: "http://"+nginxIp+"/api0_map_bdimg"+"/images/",
        UF: B.ka + "images/markers_new.png",
        VO: 24,
        WO: 73,
        dC: {
            "\u5317\u4eac": {
                iy: "bj",
                k: new I(116.403874, 39.914889)
            },
            "\u4e0a\u6d77": {
                iy: "sh",
                k: new I(121.487899, 31.249162)
            },
            "\u6df1\u5733": {
                iy: "sz",
                k: new I(114.025974, 22.546054)
            },
            "\u5e7f\u5dde": {
                iy: "gz",
                k: new I(113.30765, 23.120049)
            }
        },
        fontFamily: "arial,sans-serif"
    };
    z.ca.Ne ? (z.extend(G, {
        zK: "url(" + G.pa + "ruler.cur),crosshair",
        Vb: "-moz-grab",
        Ad: "-moz-grabbing"
    }), z.platform.mM && (G.fontFamily = "arial,simsun,sans-serif")) : z.ca.Dw || z.ca.uy ? z.extend(G, {
        zK: "url(" + G.pa + "ruler.cur) 2 6,crosshair",
        Vb: "url(" + G.pa + "openhand.cur) 8 8,default",
        Ad: "url(" + G.pa + "closedhand.cur) 8 8,move"
    }) : z.extend(G, {
        zK: "url(" + G.pa + "ruler.cur),crosshair",
        Vb: "url(" + G.pa + "openhand.cur),default",
        Ad: "url(" + G.pa + "closedhand.cur),move"
    });

    function xb(a, b) {
        var c = a.style;
        c.left = b[0] + "px";
        c.top = b[1] + "px"
    }
    function yb(a) {
        0 < z.ca.ia ? a.unselectable = "on" : a.style.MozUserSelect = "none"
    }
    function zb(a) {
        return a && a.parentNode && 11 !== a.parentNode.nodeType
    }
    function Ab(a, b) {
        z.D.Hx(a, "beforeEnd", b);
        return a.lastChild
    }
    function Bb(a) {
        for (var b = {
            left: 0,
            top: 0
        }; a && a.offsetParent;) b.left += a.offsetLeft, b.top += a.offsetTop, a = a.offsetParent;
        return b
    }
    function ma(a) {
        a = window.event || a;
        a.stopPropagation ? a.stopPropagation() : a.cancelBubble = q
    }
    function Db(a) {
        a = window.event || a;
        a.preventDefault ? a.preventDefault() : a.returnValue = t;
        return t
    }
    function na(a) {
        ma(a);
        return Db(a)
    }
    function Eb() {
        var a = document.documentElement,
            b = document.body;
        return a && (a.scrollTop || a.scrollLeft) ? [a.scrollTop, a.scrollLeft] : b ? [b.scrollTop, b.scrollLeft] : [0,
                0]
    }
    function Fb(a, b) {
        if (a && b) return Math.round(Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)))
    }
    function Gb(a, b) {
        var c = [],
            b = b || function (a) {
                return a
            }, e;
        for (e in a) c.push(e + "=" + b(a[e]));
        return c.join("&")
    }
    function L(a, b, c) {
        var e = document.createElement(a);
        c && (e = document.createElementNS(c, a));
        return z.D.jF(e, b || {})
    }
    function Va(a) {
        if (a.currentStyle) return a.currentStyle;
        if (a.ownerDocument && a.ownerDocument.defaultView) return a.ownerDocument.defaultView.getComputedStyle(a, s)
    }
    function Xa(a) {
        return "function" === typeof a
    }
    function Wa(a) {
        return "number" === typeof a
    }
    function $a(a) {
        return "string" == typeof a
    }
    function Hb(a) {
        return "undefined" != typeof a
    }
    function Ib(a) {
        return "object" == typeof a
    }
    var Jb = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    function Kb(a) {
        var b = "",
            c, e, f = "",
            g, i = "",
            k = 0;
        g = /[^A-Za-z0-9\+\/\=]/g;
        if (!a || g.exec(a)) return a;
        a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do c = Jb.indexOf(a.charAt(k++)), e = Jb.indexOf(a.charAt(k++)), g = Jb.indexOf(a.charAt(k++)), i = Jb.indexOf(
                a.charAt(k++)), c = c << 2 | e >> 4, e = (e & 15) << 4 | g >> 2, f = (g & 3) << 6 | i, b += String.fromCharCode(
                c), 64 != g && (b += String.fromCharCode(e)), 64 != i && (b += String.fromCharCode(f)); while (k < a.length);
        return b
    }
    var P = z.lang.Yy;

    function H() {
        return !(!z.platform.lE && !z.platform.sY && !z.platform.Am)
    }
    function Ua() {
        return !(!z.platform.mM && !z.platform.eM && !z.platform.yY)
    }
    function bb() {
        return (new Date).getTime()
    }
    function Lb() {
        var a = document.body.appendChild(L("div"));
        a.innerHTML = '<v:shape id="vml_tester1" adj="1" />';
        var b = a.firstChild;
        if (!b.style) return t;
        b.style.behavior = "url(#default#VML)";
        b = b ? "object" === typeof b.adj : q;
        a.parentNode.removeChild(a);
        return b
    }
    function Mb() {
        return !!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.1")
    }
    function Nb() {
        return !!L("canvas").getContext
    }
    function Ob(a) {
        return a * Math.PI / 180
    }
    B.EY = function () {
        var a = q,
            b = q,
            c = q,
            e = q,
            f = 0,
            g = 0,
            i = 0,
            k = 0;
        return {
            GQ: function () {
                f += 1;
                a && (a = t, setTimeout(function () {
                    Ra(5054, {
                        pic: f
                    });
                    a = q;
                    f = 0
                }, 1E4))
            },
            M0: function () {
                g += 1;
                b && (b = t, setTimeout(function () {
                    Ra(5055, {
                        move: g
                    });
                    b = q;
                    g = 0
                }, 1E4))
            },
            O0: function () {
                i += 1;
                c && (c = t, setTimeout(function () {
                    Ra(5056, {
                        zoom: i
                    });
                    c = q;
                    i = 0
                }, 1E4))
            },
            N0: function (a) {
                k += a;
                e && (e = t, setTimeout(function () {
                    Ra(5057, {
                        tile: k
                    });
                    e = q;
                    k = 0
                }, 5E3))
            }
        }
    }();
    B.$p = {
        jG: "#83a1ff",
        bq: "#808080"
    };

    function Pb(a, b, c) {
        b.Fm || (b.Fm = [], b.handle = {});
        b.Fm.push({
            filter: c,
            em: a
        });
        b.addEventListener || (b.addEventListener = function (a, c) {
            b.attachEvent("on" + a, c)
        });
        b.handle.click || (b.addEventListener("click", function (a) {
            for (var c = a.target || a.srcElement; c != b;) {
                Qb(b.Fm, function (b, i) {
                    RegExp(i.filter).test(c.getAttribute("filter")) && i.em.call(c, a, c.getAttribute("filter"))
                });
                c = c.parentNode
            }
        }, t), b.handle.click = q)
    }
    function Qb(a, b) {
        for (var c = 0, e = a.length; c < e; c++) b(c, a[c])
    }
    void
    function (a, b, c) {
        void
        function (a, b, c) {
            function i(a) {
                if (!a.Eo) {
                    for (var c = q, e = [], g = a.uZ, k = 0; g && k < g.length; k++) {
                        var m = g[k],
                            n = pa[m] = pa[m] || {};
                        if (n.Eo || n == a) e.push(n.Kc);
                        else {
                            c = t;
                            if (!n.$V && (m = (Ma.get("alias") || {})[m] || m + ".js", !R[m])) {
                                R[m] = q;
                                var o = b.createElement("script"),
                                    p = b.getElementsByTagName("script")[0];
                                o.async = q;
                                o.src = m;
                                p.parentNode.insertBefore(o, p)
                            }
                            n.Py = n.Py || {};
                            n.Py[a.name] = a
                        }
                    }
                    if (c) {
                        a.Eo = q;
                        a.rK && (a.Kc = a.rK.apply(a, e));
                        for (var v in a.Py) i(a.Py[v])
                    }
                }
            }
            function k(a) {
                return (a || new Date) - F
            }
            function m(a, b, c) {
                if (a) {
                    "string" == typeof a && (c = b, b = a, a = M);
                    try {
                        a == M ? (N[b] = N[b] || [], N[b].unshift(c)) : a.addEventListener ? a.addEventListener(b, c, t) :
                            a.attachEvent && a.attachEvent("on" + b, c)
                    } catch (e) {}
                }
            }
            function n(a, b, c) {
                if (a) {
                    "string" == typeof a && (c = b, b = a, a = M);
                    try {
                        if (a == M) {
                            var e = N[b];
                            if (e) for (var f = e.length; f--;) e[f] === c && e.splice(f, 1)
                        } else a.removeEventListener ? a.removeEventListener(b, c, t) : a.detachEvent && a.detachEvent(
                                "on" + b, c)
                    } catch (g) {}
                }
            }
            function o(a) {
                var b = N[a],
                    c = 0;
                if (b) {
                    for (var e = [], f = arguments, g = 1; g < f.length; g++) e.push(f[g]);
                    for (g = b.length; g--;) b[g].apply(this, e) && c++;
                    return c
                }
            }
            function p(a, b) {
                if (a && b) {
                    var c = new Image(1, 1),
                        e = [],
                        f = "img_" + +new Date,
                        g;
                    for (g in b) b[g] && e.push(g + "=" + encodeURIComponent(b[g]));
                    M[f] = c;
                    c.onload = c.onerror = function () {
                        M[f] = c = c.onload = c.onerror = s;
                        delete M[f]
                    };
                    c.src = a + "?" + e.join("&")
                }
            }
            function v() {
                var a = arguments,
                    b = a[0];
                if (this.qK || /^(on|un|set|get|create)$/.test(b)) {
                    for (var b = y.prototype[b], c = [], e = 1, f = a.length; e < f; e++) c.push(a[e]);
                    "function" == typeof b && b.apply(this, c)
                } else this.QJ.push(a)
            }
            function x(a, b) {
                var c = {}, e;
                for (e in a) a.hasOwnProperty(e) && (c[e] = a[e]);
                for (e in b) b.hasOwnProperty(e) && (c[e] = b[e]);
                return c
            }
            function y(a) {
                this.name = a;
                this.Gs = {
                    protocolParameter: {
                        postUrl: s,
                        protocolParameter: s
                    }
                };
                this.QJ = [];
                this.alog = M
            }
            function A(a) {
                a = a || "default";
                if ("*" == a) {
                    var a = [],
                        b;
                    for (b in ea) a.push(ea[b]);
                    return a
                }(b = ea[a]) || (b = ea[a] = new y(a));
                return b
            }
            var E = c.alog;
            if (!E || !E.Eo) {
                var C = b.all && a.attachEvent,
                    F = E && E.uE || +new Date,
                    D = a.y3 || (+new Date).toString(36) + Math.random().toString(36).substr(2, 3),
                    J = 0,
                    R = {}, M = function (a) {
                        var b = arguments,
                            c, e, f, g;
                        if ("define" == a || "require" == a) {
                            for (e = 1; e < b.length; e++) switch (typeof b[e]) {
                                case "string":
                                    c = b[e];
                                    break;
                                case "object":
                                    f = b[e];
                                    break;
                                case "function":
                                    g = b[e]
                            }
                            "require" == a && (c && !f && (f = [c]), c = s);
                            c = !c ? "#" + J++ : c;
                            e = pa[c] = pa[c] || {};
                            e.Eo || (e.name = c, e.uZ = f, e.rK = g, "define" == a && (e.$V = q), i(e))
                        } else "function" == typeof a ? a(M) : ("" + a).replace(/^(?:([\w$_]+)\.)?(\w+)$/, function (a,
                                c, e) {
                                b[0] = e;
                                v.apply(M.JF(c), b)
                            })
                    }, N = {}, ea = {}, pa = {
                        y1: {
                            name: "alog",
                            Eo: q,
                            Kc: M
                        }
                    };
                y.prototype.start = y.prototype.create = function (a) {
                    if (!this.qK) {
                        "object" == typeof a && this.set(a);
                        this.qK = new Date;
                        for (this.Hs("create", this); a = this.QJ.shift();) v.apply(this, a)
                    }
                };
                y.prototype.send = function (a, b) {
                    var c = x({
                        ts: k().toString(36),
                        t: a,
                        sid: D
                    }, this.Gs);
                    if ("object" == typeof b) c = x(c, b);
                    else {
                        var e = arguments;
                        switch (a) {
                        case "pageview":
                            e[1] && (c.page = e[1]);
                            e[2] && (c.title = e[2]);
                            break;
                        case "event":
                            e[1] && (c.eventCategory = e[1]);
                            e[2] && (c.eventAction = e[2]);
                            e[3] && (c.eventLabel = e[3]);
                            e[4] && (c.eventValue = e[4]);
                            break;
                        case "timing":
                            e[1] && (c.timingCategory = e[1]);
                            e[2] && (c.timingVar = e[2]);
                            e[3] && (c.timingValue = e[3]);
                            e[4] && (c.timingLabel = e[4]);
                            break;
                        case "exception":
                            e[1] && (c.exDescription = e[1]);
                            e[2] && (c.exFatal = e[2]);
                            break;
                        default:
                            return
                        }
                    }
                    this.Hs("send", c);
                    var f;
                    if (e = this.Gs.protocolParameter) {
                        var g = {};
                        for (f in c) e[f] !== s && (g[e[f] || f] = c[f]);
                        f = g
                    } else f = c;
                    p(this.Gs.postUrl, f)
                };
                y.prototype.set = function (a, b) {
                    if ("string" == typeof a) "protocolParameter" == a && (b = x({
                            postUrl: s,
                            protocolParameter: s
                        }, b)), this.Gs[a] = b;
                    else if ("object" == typeof a) for (var c in a) this.set(c, a[c])
                };
                y.prototype.get = function (a, b) {
                    var c = this.Gs[a];
                    "function" == typeof b && b(c);
                    return c
                };
                y.prototype.Hs = function (a, b) {
                    return M.Hs(this.name + "." + a, b)
                };
                y.prototype.M = function (a, b) {
                    M.M(this.name + "." + a, b)
                };
                y.prototype.ad = function (a, b) {
                    M.ad(this.name + "." + a, b)
                };
                M.name = "alog";
                M.fO = D;
                M.Eo = q;
                M.timestamp = k;
                M.ad = n;
                M.M = m;
                M.Hs = o;
                M.JF = A;
                M("init");
                var wa = y.prototype;
                T(wa, {
                    start: wa.start,
                    create: wa.create,
                    send: wa.send,
                    set: wa.set,
                    get: wa.get,
                    on: wa.M,
                    un: wa.ad,
                    fire: wa.Hs
                });
                var Ma = A();
                Ma.set("protocolParameter", {
                    x1: s
                });
                if (E) {
                    wa = [].concat(E.vb || [], E.Om || []);
                    E.vb = E.Om = s;
                    for (var sb in M) M.hasOwnProperty(sb) && (E[sb] = M[sb]);
                    M.vb = M.Om = {
                        push: function (a) {
                            M.apply(M, a)
                        }
                    };
                    for (E = 0; E < wa.length; E++) M.apply(M, wa[E])
                }
                c.alog = M;
                C && m(b, "mouseup", function (a) {
                    a = a.target || a.srcElement;
                    1 == a.nodeType && /^ajavascript:/i.test(a.tagName + a.href)
                });
                var Za = t;
                a.onerror = function (a, b, e, f) {
                    var i = q;
                    !b && /^script error/i.test(a) && (Za ? i = t : Za = q);
                    i && c.alog("exception.send", "exception", {
                        xt: a,
                        tE: b,
                        ot: e,
                        $r: f
                    });
                    return t
                };
                c.alog("exception.on", "catch", function (a) {
                    c.alog("exception.send", "exception", {
                        xt: a.xt,
                        tE: a.path,
                        ot: a.ot,
                        method: a.method,
                        YK: "catch"
                    })
                })
            }
        }(a, b, c);
        void
        function (a, b, c) {
            var i = "18_3";
            H() && (i = "18_4");
            var k = "http://static.tieba.baidu.com";
            "https:" === a.location.protocol && (k = "https://gsp0.baidu.com/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK");
            var m = Math.random,
                k = k + "/tb/pms/img/st.gif",
                n = {
                    rh: "0.1"
                }, o = {
                    rh: "0.1"
                }, p = {
                    rh: "0.1"
                }, v = {
                    rh: "0"
                };
            if (n && n.rh && m() < n.rh) {
                var x = c.alog.JF("monkey"),
                    y, n = a.screen,
                    A = b.referrer;
                x.set("ver", 5);
                x.set("pid", 241);
                n && x.set("px", n.width + "*" + n.height);
                x.set("ref", A);
                c.alog("monkey.on", "create", function () {
                    y = c.alog.timestamp;
                    x.set("protocolParameter", {
                        reports: s
                    })
                });
                c.alog("monkey.on", "send", function (a) {
                    "pageview" == a.t && (a.cmd = "open");
                    a.now && (a.ts = y(a.now).toString(36), a.now = "")
                });
                c.alog("monkey.create", {
                    page: i,
                    pid: "241",
                    p: "18",
                    dv: 6,
                    postUrl: k,
                    reports: {
                        refer: 1
                    }
                });
                c.alog("monkey.send", "pageview", {
                    now: +new Date
                })
            }
            if (o && o.rh && m() < o.rh) {
                var E = t;
                a.onerror = function (a, b, e, f) {
                    var i = q;
                    !b && /^script error/i.test(a) && (E ? i = t : E = q);
                    i && c.alog("exception.send", "exception", {
                        xt: a,
                        tE: b,
                        ot: e,
                        $r: f
                    });
                    return t
                };
                c.alog("exception.on", "catch", function (a) {
                    c.alog("exception.send", "exception", {
                        xt: a.xt,
                        tE: a.path,
                        ot: a.ot,
                        method: a.method,
                        YK: "catch"
                    })
                });
                c.alog("exception.create", {
                    postUrl: k,
                    dv: 7,
                    page: i,
                    pid: "170",
                    p: "18"
                })
            }
            p && (p.rh && m() < p.rh) && (c.alog("cus.on", "time", function (a) {
                var b = {}, e = t,
                    f;
                if ("[object Object]" === a.toString()) {
                    for (var i in a) "page" == i ? b.page = a[i] : (f = parseInt(a[i]), 0 < f && /^z_/.test(i) && (e =
                            q, b[i] = f));
                    e && c.alog("cus.send", "time", b)
                }
            }), c.alog("cus.on", "count", function (a) {
                var b = {}, e = t;
                "string" === typeof a && (a = [a]);
                if (a instanceof Array) for (var f = 0; f < a.length; f++) /^z_/.test(a[f]) ? (e = q, b[a[f]] = 1) :
                            /^page:/.test(a[f]) && (b.page = a[f].substring(5));
                e && c.alog("cus.send", "count", b)
            }), c.alog("cus.create", {
                dv: 3,
                postUrl: k,
                page: i,
                p: "18"
            }));
            if (v && v.rh && m() < v.rh) {
                var C = ["Moz", "O", "ms", "Webkit"],
                    F = ["-webkit-", "-moz-", "-o-", "-ms-"],
                    D = function () {
                        return typeof b.createElement !== "function" ? b.createElement(arguments[0]) : b.createElement.apply(
                            b, arguments)
                    }, J = D("dpFeatureTest").style,
                    R = function (a) {
                        return M(a, l, l)
                    }, M = function (a, b, c) {
                        var e = a.charAt(0).toUpperCase() + a.slice(1),
                            f = (a + " " + C.join(e + " ") + e).split(" ");
                        if (typeof b === "string" || typeof b === "undefined") return N(f, b);
                        f = (a + " " + C.join(e + " ") + e).split(" ");
                        a: {
                            var a = f,
                                g;
                            for (g in a) if (a[g] in b) {
                                    if (c === t) {
                                        b = a[g];
                                        break a
                                    }
                                    g = b[a[g]];
                                    b = typeof g === "function" ? fnBind(g, c || b) : g;
                                    break a
                                }
                            b = t
                        }
                        return b
                    }, N = function (a, b) {
                        var c, e, f;
                        e = a.length;
                        for (c = 0; c < e; c++) {
                            f = a[c];~
                            ("" + f).indexOf("-") && (f = ea(f));
                            if (J[f] !== l) return b == "pfx" ? f : q
                        }
                        return t
                    }, ea = function (a) {
                        return a.replace(/([a-z])-([a-z])/g, function (a, b, c) {
                            return b + c.toUpperCase()
                        }).replace(/^-/, "")
                    }, pa = function (a, b, c) {
                        if (a.indexOf("@") === 0) return atRule(a);
                        a.indexOf("-") != -1 && (a = ea(a));
                        return !b ? M(a, "pfx") : M(a, b, c)
                    }, wa = function () {
                        var a = D("canvas");
                        return !(!a.getContext || !a.getContext("2d"))
                    }, Ma = function () {
                        var a = D("div");
                        return "draggable" in a || "ondragstart" in a && "ondrop" in a
                    }, sb = function () {
                        try {
                            localStorage.setItem("localStorage", "localStorage");
                            localStorage.removeItem("localStorage");
                            return q
                        } catch (a) {
                            return t
                        }
                    }, Za = function () {
                        return "content" in b.createElement("template")
                    }, Pa = function () {
                        return "createShadowRoot" in b.createElement("a")
                    }, gi = function () {
                        return "registerElement" in b
                    }, hi = function () {
                        return "import" in b.createElement("link")
                    }, ii = function () {
                        return "getItems" in b
                    }, ji = function () {
                        return "EventSource" in window
                    }, qe = function (a, b) {
                        var c = new Image;
                        c.onload = function () {
                            b(a, c.width > 0 && c.height > 0)
                        };
                        c.onerror = function () {
                            b(a, t)
                        };
                        c.src = "data:image/webp;base64," + {
                            B3: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
                            A3: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
                            alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
                            $j: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
                        }[a]
                    }, re = function (a, b) {
                        return Tb.$h["WebP-" + a] = b
                    }, ki = function () {
                        return "openDatabase" in a
                    }, li = function () {
                        return "performance" in a && "timing" in a.performance
                    }, mi = function () {
                        return "performance" in a && "mark" in a.performance
                    }, ni = function () {
                        return !(!Array.prototype || !Array.prototype.every || !Array.prototype.filter || !Array.prototype
                            .forEach || !Array.prototype.indexOf || !Array.prototype.lastIndexOf || !Array.prototype.map || !
                            Array.prototype.some || !Array.prototype.reduce || !Array.prototype.reduceRight || !Array.isArray)
                    }, oi = function () {
                        return "Promise" in a && "cast" in a.cq && "resolve" in a.cq && "reject" in a.cq && "all" in a.cq &&
                            "race" in a.cq && function () {
                            var b;
                            new a.cq(function (a) {
                                b = a
                            });
                            return typeof b === "function"
                        }()
                    }, pi = function () {
                        var b = !! a.z0,
                            c = a.XMLHttpRequest && "withCredentials" in new XMLHttpRequest;
                        return !!a.C0 && b && c
                    }, qi = function () {
                        return "geolocation" in navigator
                    }, ri = function () {
                        var b = D("canvas"),
                            c = "probablySupportsContext" in b ? "probablySupportsContext" : "supportsContext";
                        return c in b ? b[c]("webgl") || b[c]("experimental-webgl") : "WebGLRenderingContext" in a
                    }, si = function () {
                        return !!b.createElementNS && !! b.createElementNS("http://www.w3.org/2000/svg", "svg").Q1
                    }, ti = function () {
                        return !!a.J0
                    }, ui = function () {
                        return "WebSocket" in a && a.G0.w0 === 2
                    }, vi = function () {
                        return !!b.createElement("video").canPlayType
                    }, wi = function () {
                        return !!b.createElement("audio").canPlayType
                    }, xi = function () {
                        return !!(a.history && "pushState" in a.history)
                    }, yi = function () {
                        return !(!a.x0 || !a.y0)
                    }, zi = function () {
                        return "postMessage" in window
                    }, Ai = function () {
                        return !!a.webkitNotifications || "Notification" in a && "permission" in a.rP &&
                            "requestPermission" in a.rP
                    }, Bi = function () {
                        for (var b = ["webkit", "moz", "o", "ms"], c = a.requestAnimationFrame, f = 0; f < b.length && !
                            c; ++f) c = a[b[f] + "RequestAnimationFrame"];
                        return !!c
                    }, Ci = function () {
                        return "JSON" in a && "parse" in JSON && "stringify" in JSON
                    }, Di = function () {
                        return !(!pa("exitFullscreen", b, t) && !pa("cancelFullScreen", b, t))
                    }, Ei = function () {
                        return !!pa("Intl", a)
                    }, Fi = function () {
                        return R("flexBasis")
                    }, Gi = function () {
                        return !!R("perspective")
                    }, Hi = function () {
                        return R("shapeOutside")
                    }, Ii = function () {
                        var a = D("div");
                        a.style.cssText = F.join("filter:blur(2px); ");
                        return !!a.style.length && (b.documentMode === l || b.documentMode > 9)
                    }, Ji = function () {
                        return "XMLHttpRequest" in a && "withCredentials" in new XMLHttpRequest
                    }, Ki = function () {
                        return D("progress").max !== l
                    }, Li = function () {
                        return D("meter").max !== l
                    }, Mi = function () {
                        return "sendBeacon" in navigator
                    }, Ni = function () {
                        return R("borderRadius")
                    }, Oi = function () {
                        return R("boxShadow")
                    }, Pi = function () {
                        var a = D("div").style;
                        a.cssText = F.join("opacity:.55;");
                        return /^0.55$/.test(a.opacity)
                    }, Qi = function () {
                        return N(["textShadow"], l)
                    }, Ri = function () {
                        return R("animationName")
                    }, Si = function () {
                        return R("transition")
                    }, Ti = function () {
                        return navigator.userAgent.indexOf("Android 2.") === -1 && R("transform")
                    }, Tb = {
                        $h: {},
                        oa: function (a, b, c) {
                            this.$h[a] = b.apply(this, [].slice.call(arguments, 2))
                        },
                        xd: function (a, b) {
                            a.apply(this, [].slice.call(arguments, 1))
                        },
                        BZ: function () {
                            this.oa("bdrs", Ni);
                            this.oa("bxsd", Oi);
                            this.oa("opat", Pi);
                            this.oa("txsd", Qi);
                            this.oa("anim", Ri);
                            this.oa("trsi", Si);
                            this.oa("trfm", Ti);
                            this.oa("flex", Fi);
                            this.oa("3dtr", Gi);
                            this.oa("shpe", Hi);
                            this.oa("fltr", Ii);
                            this.oa("cavs", wa);
                            this.oa("dgdp", Ma);
                            this.oa("locs", sb);
                            this.oa("wctem", Za);
                            this.oa("wcsdd", Pa);
                            this.oa("wccse", gi);
                            this.oa("wchti", hi);
                            this.xd(qe, "lossy", re);
                            this.xd(qe, "lossless", re);
                            this.xd(qe, "alpha", re);
                            this.xd(qe, "animation", re);
                            this.oa("wsql", ki);
                            this.oa("natm", li);
                            this.oa("ustm", mi);
                            this.oa("arra", ni);
                            this.oa("prms", oi);
                            this.oa("xhr2", pi);
                            this.oa("wbgl", ri);
                            this.oa("geol", qi);
                            this.oa("svg", si);
                            this.oa("work", ti);
                            this.oa("wbsk", ui);
                            this.oa("vido", vi);
                            this.oa("audo", wi);
                            this.oa("hsty", xi);
                            this.oa("file", yi);
                            this.oa("psmg", zi);
                            this.oa("wknf", Ai);
                            this.oa("rqaf", Bi);
                            this.oa("json", Ci);
                            this.oa("flsc", Di);
                            this.oa("i18n", Ei);
                            this.oa("cors", Ji);
                            this.oa("prog", Ki);
                            this.oa("metr", Li);
                            this.oa("becn", Mi);
                            this.oa("mcrd", ii);
                            this.oa("esrc", ji)
                        }
                    }, x = c.alog.JF("feature");
                x.M("commit", function () {
                    Tb.BZ();
                    var a = setInterval(function () {
                        if ("WebP-lossy" in Tb.$h && "WebP-lossless" in Tb.$h && "WebP-alpha" in Tb.$h &&
                            "WebP-animation" in Tb.$h) {
                            for (var b in Tb.$h) Tb.$h[b] = Tb.$h[b] ? "y" : "n";
                            x.send("feature", Tb.$h);
                            clearInterval(a)
                        }
                    }, 500)
                });
                c.alog("feature.create", {
                    c2: 4,
                    Z3: k,
                    page: i,
                    vb: "18"
                });
                c.alog("feature.fire", "commit")
            }
        }(a, b, c)
    }(window, document, B);
    B.wn = B.alog || u();
    B.alog("cus.fire", "count", "z_loadscriptcount");
    "https:" === location.protocol && B.alog("cus.fire", "count", "z_httpscount");

    function Rb(a) {
        var b = window.TILE_VERSION,
            c = "20170927";
        b && b.ditu && (b = b.ditu, b[a] && b[a].updateDate && (c = b[a].updateDate));
        return c
    };

    function oa(a, b) {
        if (b) {
            var c = (1E5 * Math.random()).toFixed(0);
            B._rd["_cbk" + c] = function (a) {
                b && b(a);
                delete B._rd["_cbk" + c]
            };
            a += "&callback=BMap._rd._cbk" + c
        }
        var e = L("script", {
            type: "text/javascript"
        });
        e.charset = "utf-8";
        e.src = a;
        e.addEventListener ? e.addEventListener("load", function (a) {
            a = a.target;
            a.parentNode.removeChild(a)
        }, t) : e.attachEvent && e.attachEvent("onreadystatechange", function () {
            var a = window.event.srcElement;
            a && ("loaded" == a.readyState || "complete" == a.readyState) && a.parentNode.removeChild(a)
        });
        setTimeout(function () {
            document.getElementsByTagName("head")[0].appendChild(e);
            e = s
        }, 1)
    };
    var Sb = {
        map: "hi1gf4",
        common: "32x2tx",
        style: "pvfjo1",
        tile: "f0aycv",
        vectordrawlib: "wtrdve",
        newvectordrawlib: "2wpk5o",
        groundoverlay: "n5qx4n",
        pointcollection: "3fdg3b",
        marker: "vxbv2o",
        symbol: "tzgbaz",
        canvablepath: "uw0u4h",
        vmlcontext: "tc4zbl",
        markeranimation: "ybkhfr",
        poly: "gru53o",
        draw: "sarzfu",
        drawbysvg: "hkdg1r",
        drawbyvml: "xr4irt",
        drawbycanvas: "4wauk0",
        infowindow: "ppokhd",
        oppc: "whfhqo",
        opmb: "yuraez",
        menu: "3uwdpf",
        control: "34cfvh",
        navictrl: "l52oc1",
        geoctrl: "mg5qn0",
        copyrightctrl: "p1izej",
        citylistcontrol: "jgyegm",
        scommon: "mjhejh",
        local: "vjdcvf",
        route: "jkqw1j",
        othersearch: "bdknpe",
        mapclick: "j2bvmw",
        buslinesearch: "1u4ilf",
        hotspot: "rvxdzo",
        autocomplete: "tyz3m0",
        coordtrans: "3xkyti",
        coordtransutils: "oqlmed",
        convertor: "jivo5h",
        clayer: "adqjbz",
        pservice: "2fklse",
        pcommon: "1m0zta",
        panorama: "30fsn5",
        panoramaflash: "ddukap",
        vector: "fedcfm"
    };
    z.Iy = function () {
        function a(a) {
            return e && !! c[b + a + "_" + Sb[a]]
        }
        var b = "BMap_",
            c = window.localStorage,
            e = "localStorage" in window && c !== s && c !== l;
        return {
            uY: e,
            set: function (a, g) {
                if (e) {
                    for (var i = b + a + "_", k = c.length, m; k--;) m = c.key(k), -1 < m.indexOf(i) && c.removeItem(m);
                    try {
                        c.setItem(b + a + "_" + Sb[a], g)
                    } catch (n) {
                        c.clear()
                    }
                }
            },
            get: function (f) {
                return e && a(f) ? c.getItem(b + f + "_" + Sb[f]) : t
            },
            bK: a
        }
    }();

    function K() {}
    z.object.extend(K, {
        uj: {
            kG: -1,
            FP: 0,
            Vp: 1
        },
        lL: function () {
            var a = "canvablepath",
                b = B.EU ? "newvectordrawlib" : "vectordrawlib";
            if (!H() || !Nb()) Mb() || (Lb() ? a = "vmlcontext" : Nb());
            return {
                tile: [b, "style"],
                control: [],
                marker: ["symbol"],
                symbol: ["canvablepath", "common"],
                canvablepath: "canvablepath" === a ? [] : [a],
                vmlcontext: [],
                style: [],
                poly: ["marker", "drawbycanvas", "drawbysvg", "drawbyvml"],
                drawbysvg: ["draw"],
                drawbyvml: ["draw"],
                drawbycanvas: ["draw"],
                infowindow: ["common", "marker"],
                menu: [],
                oppc: [],
                opmb: [],
                scommon: [],
                local: ["scommon"],
                route: ["scommon"],
                othersearch: ["scommon"],
                autocomplete: ["scommon"],
                citylistcontrol: ["autocomplete"],
                mapclick: ["scommon"],
                buslinesearch: ["route"],
                hotspot: [],
                coordtransutils: ["coordtrans"],
                convertor: [],
                clayer: ["tile"],
                pservice: [],
                pcommon: ["style", "pservice"],
                panorama: ["pcommon"],
                panoramaflash: ["pcommon"]
            }
        },
        c4: {},
        cG: {
            WP: B.ka + "getmodules?v=3.0",
            uU: 5E3
        },
        zC: t,
        Jd: {
            ol: {},
            yn: [],
            Qv: []
        },
        load: function (a, b, c) {
            var e = this.jb(a);
            if (e.Fe == this.uj.Vp) c && b();
            else {
                if (e.Fe == this.uj.kG) {
                    this.hK(a);
                    this.yN(a);
                    var f = this;
                    f.zC == t && (f.zC = q, setTimeout(function () {
                        for (var a = [], b = 0, c = f.Jd.yn.length; b < c; b++) {
                            var e = f.Jd.yn[b],
                                n = "";
                            ia.Iy.bK(e) ? n = ia.Iy.get(e) : (n = "", a.push(e + "_" + Sb[e]));
                            f.Jd.Qv.push({
                                SM: e,
                                GE: n
                            })
                        }
                        f.zC = t;
                        f.Jd.yn.length = 0;
                        0 == a.length ? f.RK() : oa(f.cG.WP + "&mod=" + a.join(","))
                    }, 1));
                    e.Fe = this.uj.FP
                }
                e.Mu.push(b)
            }
        },
        hK: function (a) {
            if (a && this.lL()[a]) for (var a = this.lL()[a], b = 0; b < a.length; b++) this.hK(a[b]), this.Jd.ol[a[b]] ||
                        this.yN(a[b])
        },
        yN: function (a) {
            for (var b = 0; b < this.Jd.yn.length; b++) if (this.Jd.yn[b] == a) return;
            this.Jd.yn.push(a)
        },
        AZ: function (a, b) {
            var c = this.jb(a);
            try {
                eval(b)
            } catch (e) {
                return
            }
            c.Fe = this.uj.Vp;
            for (var f = 0, g = c.Mu.length; f < g; f++) c.Mu[f]();
            c.Mu.length = 0
        },
        bK: function (a, b) {
            var c = this;
            c.timeout = setTimeout(function () {
                c.Jd.ol[a].Fe != c.uj.Vp ? (c.remove(a), c.load(a, b)) : clearTimeout(c.timeout)
            }, c.cG.uU)
        },
        jb: function (a) {
            this.Jd.ol[a] || (this.Jd.ol[a] = {}, this.Jd.ol[a].Fe = this.uj.kG, this.Jd.ol[a].Mu = []);
            return this.Jd.ol[a]
        },
        remove: function (a) {
            delete this.jb(a)
        },
        tV: function (a, b) {
            for (var c = this.Jd.Qv, e = q, f = 0, g = c.length; f < g; f++) "" == c[f].GE && (c[f].SM == a ? c[f].GE =
                    b : e = t);
            e && this.RK()
        },
        RK: function () {
            for (var a = this.Jd.Qv, b = 0, c = a.length; b < c; b++) this.AZ(a[b].SM, a[b].GE);
            this.Jd.Qv.length = 0
        }
    });

    function Q(a, b) {
        this.x = a || 0;
        this.y = b || 0;
        this.x = this.x;
        this.y = this.y
    }
    Q.prototype.ob = function (a) {
        return a && a.x == this.x && a.y == this.y
    };

    function O(a, b) {
        this.width = a || 0;
        this.height = b || 0
    }
    O.prototype.ob = function (a) {
        return a && this.width == a.width && this.height == a.height
    };

    function ib(a, b) {
        a && (this.Jb = a, this.aa = "spot" + ib.aa++, b = b || {}, this.Qg = b.text || "", this.wv = b.offsets ? b.offsets
            .slice(0) : [5, 5, 5, 5], this.qJ = b.userData || s, this.Hh = b.minZoom || s, this.Af = b.maxZoom || s)
    }
    ib.aa = 0;
    z.extend(ib.prototype, {
        qa: function (a) {
            this.Hh == s && (this.Hh = a.K.dc);
            this.Af == s && (this.Af = a.K.Yb)
        },
        sa: function (a) {
            a instanceof I && (this.Jb = a)
        },
        ga: w("Jb"),
        Tt: ba("Qg"),
        SD: w("Qg"),
        setUserData: ba("qJ"),
        getUserData: w("qJ")
    });

    function Ub() {
        this.C = s;
        this.Kb = "control";
        this.Qa = this.VJ = q
    }
    z.lang.ta(Ub, z.lang.Ca, "Control");
    z.extend(Ub.prototype, {
        initialize: function (a) {
            this.C = a;
            if (this.B) return a.Va.appendChild(this.B), this.B
        },
        Ae: function (a) {
            !this.B && (this.initialize && Xa(this.initialize)) && (this.B = this.initialize(a));
            this.j = this.j || {
                wg: t
            };
            this.wB();
            this.Hr();
            this.B && (this.B.fr = this)
        },
        wB: function () {
            var a = this.B;
            if (a) {
                var b = a.style;
                b.position = "absolute";
                b.zIndex = this.vz || "10";
                b.MozUserSelect = "none";
                b.WebkitTextSizeAdjust = "none";
                this.j.wg || z.D.Ua(a, "BMap_noprint");
                H() || z.M(a, "contextmenu", na)
            }
        },
        remove: function () {
            this.C = s;
            this.B && (this.B.parentNode && this.B.parentNode.removeChild(this.B), this.B = this.B.fr = s)
        },
        Aa: function () {
            this.B = Ab(this.C.Va, "<div unselectable='on'></div>");
            this.Qa == t && z.D.U(this.B);
            return this.B
        },
        Hr: function () {
            this.rc(this.j.anchor)
        },
        rc: function (a) {
            if (this.z1 || !Wa(a) || isNaN(a) || a < Vb || 3 < a) a = this.defaultAnchor;
            this.j = this.j || {
                wg: t
            };
            this.j.za = this.j.za || this.defaultOffset;
            var b = this.j.anchor;
            this.j.anchor = a;
            if (this.B) {
                var c = this.B,
                    e = this.j.za.width,
                    f = this.j.za.height;
                c.style.left = c.style.top = c.style.right = c.style.bottom = "auto";
                switch (a) {
                case Vb:
                    c.style.top = f + "px";
                    c.style.left = e + "px";
                    break;
                case Wb:
                    c.style.top = f + "px";
                    c.style.right = e + "px";
                    break;
                case Xb:
                    c.style.bottom = f + "px";
                    c.style.left = e + "px";
                    break;
                case 3:
                    c.style.bottom = f + "px", c.style.right = e + "px"
                }
                c = ["TL", "TR", "BL", "BR"];
                z.D.Pb(this.B, "anchor" + c[b]);
                z.D.Ua(this.B, "anchor" + c[a])
            }
        },
        uD: function () {
            return this.j.anchor
        },
        getContainer: w("B"),
        Te: function (a) {
            a instanceof O && (this.j = this.j || {
                wg: t
            }, this.j.za = new O(a.width, a.height), this.B && this.rc(this.j.anchor))
        },
        Mf: function () {
            return this.j.za
        },
        Cd: w("B"),
        show: function () {
            this.Qa != q && (this.Qa = q, this.B && z.D.show(this.B))
        },
        U: function () {
            this.Qa != t && (this.Qa = t, this.B && z.D.U(this.B))
        },
        isPrintable: function () {
            return !!this.j.wg
        },
        eh: function () {
            return !this.B && !this.C ? t : !! this.Qa
        }
    });
    var Vb = 0,
        Wb = 1,
        Xb = 2;

    function jb(a) {
        Ub.call(this);
        a = a || {};
        this.j = {
            wg: t,
            vF: a.showZoomInfo || q,
            anchor: a.anchor,
            za: a.offset,
            type: a.type,
            wW: a.enableGeolocation || t
        };
        this.defaultAnchor = H() ? 3 : Vb;
        this.defaultOffset = new O(10, 10);
        this.rc(a.anchor);
        this.Ym(a.type);
        this.we()
    }
    z.lang.ta(jb, Ub, "NavigationControl");
    z.extend(jb.prototype, {
        initialize: function (a) {
            this.C = a;
            return this.B
        },
        Ym: function (a) {
            this.j.type = Wa(a) && 0 <= a && 3 >= a ? a : 0
        },
        bp: function () {
            return this.j.type
        },
        we: function () {
            var a = this;
            K.load("navictrl", function () {
                a.rf()
            })
        }
    });

    function Yb(a) {
        Ub.call(this);
        a = a || {};
        this.j = {
            anchor: a.anchor || Xb,
            za: a.offset || new O(10, 30),
            i_: a.showAddressBar !== t,
            h2: a.enableAutoLocation || t,
            GM: a.locationIcon || s
        };
        var b = this;
        this.vz = 1200;
        b.$_ = [];
        this.ie = [];
        K.load("geoctrl", function () {
            (function e() {
                if (0 !== b.ie.length) {
                    var a = b.ie.shift();
                    b[a.method].apply(b, a.arguments);
                    e()
                }
            })();
            b.VP()
        });
        Ra(Ia)
    }
    z.lang.ta(Yb, Ub, "GeolocationControl");
    z.extend(Yb.prototype, {
        location: function () {
            this.ie.push({
                method: "location",
                arguments: arguments
            })
        },
        getAddressComponent: ca(s)
    });

    function Zb(a) {
        Ub.call(this);
        a = a || {};
        this.j = {
            wg: t,
            anchor: a.anchor,
            za: a.offset
        };
        this.cc = [];
        this.defaultAnchor = Xb;
        this.defaultOffset = new O(5, 2);
        this.rc(a.anchor);
        this.VJ = t;
        this.we()
    }
    z.lang.ta(Zb, Ub, "CopyrightControl");
    z.object.extend(Zb.prototype, {
        initialize: function (a) {
            this.C = a;
            return this.B
        },
        nw: function (a) {
            if (a && Wa(a.id) && !isNaN(a.id)) {
                var b = {
                    bounds: s,
                    content: ""
                }, c;
                for (c in a) b[c] = a[c];
                if (a = this.gm(a.id)) for (var e in b) a[e] = b[e];
                else this.cc.push(b)
            }
        },
        gm: function (a) {
            for (var b = 0, c = this.cc.length; b < c; b++) if (this.cc[b].id == a) return this.cc[b]
        },
        BD: w("cc"),
        YE: function (a) {
            for (var b = 0, c = this.cc.length; b < c; b++) this.cc[b].id == a && (r = this.cc.splice(b, 1), b--, c =
                    this.cc.length)
        },
        we: function () {
            var a = this;
            K.load("copyrightctrl", function () {
                a.rf()
            })
        }
    });

    function lb(a) {
        Ub.call(this);
        a = a || {};
        this.j = {
            wg: t,
            size: a.size || new O(150, 150),
            padding: 5,
            Wa: a.isOpen === q ? q : t,
            q0: 4,
            za: a.offset,
            anchor: a.anchor
        };
        this.defaultAnchor = 3;
        this.defaultOffset = new O(0, 0);
        this.tq = this.uq = 13;
        this.rc(a.anchor);
        this.ue(this.j.size);
        this.we()
    }
    z.lang.ta(lb, Ub, "OverviewMapControl");
    z.extend(lb.prototype, {
        initialize: function (a) {
            this.C = a;
            return this.B
        },
        rc: function (a) {
            Ub.prototype.rc.call(this, a)
        },
        ke: function () {
            this.ke.co = q;
            this.j.Wa = !this.j.Wa;
            this.B || (this.ke.co = t)
        },
        ue: function (a) {
            a instanceof O || (a = new O(150, 150));
            a.width = 0 < a.width ? a.width : 150;
            a.height = 0 < a.height ? a.height : 150;
            this.j.size = a
        },
        tb: function () {
            return this.j.size
        },
        Wa: function () {
            return this.j.Wa
        },
        we: function () {
            var a = this;
            K.load("control", function () {
                a.rf()
            })
        }
    });

    function $b(a) {
        Ub.call(this);
        a = a || {};
        this.defaultAnchor = Vb;
        this.qV = a.canCheckSize === t ? t : q;
        this.Ui = "";
        this.defaultOffset = new O(10, 10);
        this.onChangeBefore = [];
        this.onChangeAfter = [];
        this.onChangeSuccess = [];
        this.j = {
            wg: t,
            za: a.offset || this.defaultOffset,
            anchor: a.anchor || this.defaultAnchor,
            expand: !! a.expand
        };
        a.onChangeBefore && Xa(a.onChangeBefore) && this.onChangeBefore.push(a.onChangeBefore);
        a.onChangeAfter && Xa(a.onChangeAfter) && this.onChangeAfter.push(a.onChangeAfter);
        a.onChangeSuccess && Xa(a.onChangeSuccess) && this.onChangeSuccess.push(a.onChangeSuccess);
        this.rc(a.anchor);
        this.we()
    }
    z.lang.ta($b, Ub, "CityListControl");
    z.object.extend($b.prototype, {
        initialize: function (a) {
            this.C = a;
            return this.B
        },
        we: function () {
            var a = this;
            K.load("citylistcontrol", function () {
                a.rf()
            }, q)
        }
    });

    function kb(a) {
        Ub.call(this);
        a = a || {};
        this.j = {
            wg: t,
            color: "black",
            bd: "metric",
            za: a.offset
        };
        this.defaultAnchor = Xb;
        this.defaultOffset = new O(81, 18);
        this.rc(a.anchor);
        this.Qh = {
            metric: {
                name: "metric",
                jK: 1,
                XL: 1E3,
                EO: "\u7c73",
                FO: "\u516c\u91cc"
            },
            us: {
                name: "us",
                jK: 3.2808,
                XL: 5280,
                EO: "\u82f1\u5c3a",
                FO: "\u82f1\u91cc"
            }
        };
        this.Qh[this.j.bd] || (this.j.bd = "metric");
        this.NI = s;
        this.nI = {};
        this.we()
    }
    z.lang.ta(kb, Ub, "ScaleControl");
    z.object.extend(kb.prototype, {
        initialize: function (a) {
            this.C = a;
            return this.B
        },
        Gk: function (a) {
            this.j.color = a + ""
        },
        A2: function () {
            return this.j.color
        },
        sF: function (a) {
            this.j.bd = this.Qh[a] && this.Qh[a].name || this.j.bd
        },
        QX: function () {
            return this.j.bd
        },
        we: function () {
            var a = this;
            K.load("control", function () {
                a.rf()
            })
        }
    });
    var ac = 0;

    function mb(a) {
        Ub.call(this);
        a = a || {};
        this.defaultAnchor = Wb;
        this.defaultOffset = new O(10, 10);
        this.j = {
            wg: t,
            hh: [La, Ya, Sa, Qa],
            ZV: ["B_DIMENSIONAL_MAP", "B_SATELLITE_MAP", "B_NORMAL_MAP"],
            type: a.type || ac,
            za: a.offset || this.defaultOffset,
            AW: q
        };
        this.rc(a.anchor);
        "[object Array]" == Object.prototype.toString.call(a.mapTypes) && (this.j.hh = a.mapTypes.slice(0));
        this.we()
    }
    z.lang.ta(mb, Ub, "MapTypeControl");
    z.object.extend(mb.prototype, {
        initialize: function (a) {
            this.C = a;
            return this.B
        },
        Jy: function (a) {
            this.C.Tn = a
        },
        we: function () {
            var a = this;
            K.load("control", function () {
                a.rf()
            }, q)
        }
    });

    function bc(a) {
        Ub.call(this);
        a = a || {};
        this.j = {
            wg: t,
            za: a.offset,
            anchor: a.anchor
        };
        this.Hi = t;
        this.Uv = s;
        this.wI = new cc({
            Kf: "api"
        });
        this.xI = new dc(s, {
            Kf: "api"
        });
        this.defaultAnchor = Wb;
        this.defaultOffset = new O(10, 10);
        this.rc(a.anchor);
        this.we();
        Ra(va)
    }
    z.lang.ta(bc, Ub, "PanoramaControl");
    z.extend(bc.prototype, {
        initialize: function (a) {
            this.C = a;
            return this.B
        },
        we: function () {
            var a = this;
            K.load("control", function () {
                a.rf()
            })
        }
    });

    function ec(a) {
        z.lang.Ca.call(this);
        this.j = {
            Va: s,
            cursor: "default"
        };
        this.j = z.extend(this.j, a);
        this.Kb = "contextmenu";
        this.C = s;
        this.xa = [];
        this.Df = [];
        this.ye = [];
        this.Rw = this.gs = s;
        this.Gh = t;
        var b = this;
        K.load("menu", function () {
            b.hb()
        })
    }
    z.lang.ta(ec, z.lang.Ca, "ContextMenu");
    z.object.extend(ec.prototype, {
        qa: function (a, b) {
            this.C = a;
            this.tl = b || s
        },
        remove: function () {
            this.C = this.tl = s
        },
        qw: function (a) {
            if (a && !("menuitem" != a.Kb || "" == a.Qg || 0 >= a.Pi)) {
                for (var b = 0, c = this.xa.length; b < c; b++) if (this.xa[b] === a) return;
                this.xa.push(a);
                this.Df.push(a)
            }
        },
        removeItem: function (a) {
            if (a && "menuitem" == a.Kb) {
                for (var b = 0, c = this.xa.length; b < c; b++) this.xa[b] === a && (this.xa[b].remove(), this.xa.splice(
                        b, 1), c--);
                b = 0;
                for (c = this.Df.length; b < c; b++) this.Df[b] === a && (this.Df[b].remove(), this.Df.splice(b, 1), c--)
            }
        },
        QB: function () {
            this.xa.push({
                Kb: "divider",
                Cj: this.ye.length
            });
            this.ye.push({
                D: s
            })
        },
        $E: function (a) {
            if (this.ye[a]) {
                for (var b = 0, c = this.xa.length; b < c; b++) this.xa[b] && ("divider" == this.xa[b].Kb && this.xa[b]
                        .Cj == a) && (this.xa.splice(b, 1), c--), this.xa[b] && ("divider" == this.xa[b].Kb && this.xa[
                        b].Cj > a) && this.xa[b].Cj--;
                this.ye.splice(a, 1)
            }
        },
        Cd: w("B"),
        show: function () {
            this.Gh != q && (this.Gh = q)
        },
        U: function () {
            this.Gh != t && (this.Gh = t)
        },
        PZ: function (a) {
            a && (this.j.cursor = a)
        },
        getItem: function (a) {
            return this.Df[a]
        }
    });
    var fc = G.pa + "menu_zoom_in.png",
        gc = G.pa + "menu_zoom_out.png";

    function hc(a, b, c) {
        if (a && Xa(b)) {
            z.lang.Ca.call(this);
            this.j = {
                width: 100,
                id: "",
                um: ""
            };
            c = c || {};
            this.j.width = 1 * c.width ? c.width : 100;
            this.j.id = c.id ? c.id : "";
            this.j.um = c.iconUrl ? c.iconUrl : "";
            this.Qg = a + "";
            this.yz = b;
            this.C = s;
            this.Kb = "menuitem";
            this.Or = this.lv = this.B = this.Ah = s;
            this.Eh = q;
            var e = this;
            K.load("menu", function () {
                e.hb()
            })
        }
    }
    z.lang.ta(hc, z.lang.Ca, "MenuItem");
    z.object.extend(hc.prototype, {
        qa: function (a, b) {
            this.C = a;
            this.Ah = b
        },
        remove: function () {
            this.C = this.Ah = s
        },
        Tt: function (a) {
            a && (this.Qg = a + "")
        },
        Rb: function (a) {
            a && (this.j.um = a)
        },
        Cd: w("B"),
        enable: function () {
            this.Eh = q
        },
        disable: function () {
            this.Eh = t
        }
    });

    function fb(a, b) {
        a && !b && (b = a);
        this.Be = this.Pd = this.Ge = this.Rd = this.Gl = this.rl = s;
        a && (this.Gl = new I(a.lng, a.lat), this.rl = new I(b.lng, b.lat), this.Ge = a.lng, this.Rd = a.lat, this.Be =
            b.lng, this.Pd = b.lat)
    }
    z.object.extend(fb.prototype, {
        mj: function () {
            return !this.Gl || !this.rl
        },
        ob: function (a) {
            return !(a instanceof fb) || this.mj() ? t : this.Pe().ob(a.Pe()) && this.Lf().ob(a.Lf())
        },
        Pe: w("Gl"),
        Lf: w("rl"),
        IV: function (a) {
            return !(a instanceof fb) || this.mj() || a.mj() ? t : a.Ge > this.Ge && a.Be < this.Be && a.Rd > this.Rd &&
                a.Pd < this.Pd
        },
        Ka: function () {
            return this.mj() ? s : new I((this.Ge + this.Be) / 2, (this.Rd + this.Pd) / 2)
        },
        ft: function (a) {
            if (!(a instanceof fb) || Math.max(a.Ge, a.Be) < Math.min(this.Ge, this.Be) || Math.min(a.Ge, a.Be) > Math.max(
                this.Ge, this.Be) || Math.max(a.Rd, a.Pd) < Math.min(this.Rd, this.Pd) || Math.min(a.Rd, a.Pd) > Math.max(
                this.Rd, this.Pd)) return s;
            var b = Math.max(this.Ge, a.Ge),
                c = Math.min(this.Be, a.Be),
                e = Math.max(this.Rd, a.Rd),
                a = Math.min(this.Pd, a.Pd);
            return new fb(new I(b, e), new I(c, a))
        },
        bs: function (a) {
            return !(a instanceof I) || this.mj() ? t : a.lng >= this.Ge && a.lng <= this.Be && a.lat >= this.Rd && a.lat <=
                this.Pd
        },
        extend: function (a) {
            if (a instanceof I) {
                var b = a.lng,
                    a = a.lat;
                this.Gl || (this.Gl = new I(0, 0));
                this.rl || (this.rl = new I(0, 0));
                if (!this.Ge || this.Ge > b) this.Gl.lng = this.Ge = b;
                if (!this.Be || this.Be < b) this.rl.lng = this.Be = b;
                if (!this.Rd || this.Rd > a) this.Gl.lat = this.Rd = a;
                if (!this.Pd || this.Pd < a) this.rl.lat = this.Pd = a
            }
        },
        FF: function () {
            return this.mj() ? new I(0, 0) : new I(Math.abs(this.Be - this.Ge), Math.abs(this.Pd - this.Rd))
        }
    });

    function I(a, b) {
        isNaN(a) && (a = Kb(a), a = isNaN(a) ? 0 : a);
        $a(a) && (a = parseFloat(a));
        isNaN(b) && (b = Kb(b), b = isNaN(b) ? 0 : b);
        $a(b) && (b = parseFloat(b));
        this.lng = a;
        this.lat = b
    }
    I.dM = function (a) {
        return a && 180 >= a.lng && -180 <= a.lng && 74 >= a.lat && -74 <= a.lat
    };
    I.prototype.ob = function (a) {
        return a && this.lat == a.lat && this.lng == a.lng
    };

    function ic() {}
    ic.prototype.fh = function () {
        aa("lngLatToPoint\u65b9\u6cd5\u672a\u5b9e\u73b0")
    };
    ic.prototype.pj = function () {
        aa("pointToLngLat\u65b9\u6cd5\u672a\u5b9e\u73b0")
    };

    function jc() {};
    var eb = {
        lK: function (a, b, c) {
            K.load("coordtransutils", function () {
                eb.YU(a, b, c)
            }, q)
        },
        kK: function (a, b, c) {
            K.load("coordtransutils", function () {
                eb.XU(a, b, c)
            }, q)
        }
    };

    function kc() {
        this.Pa = [];
        var a = this;
        K.load("convertor", function () {
            a.TP()
        })
    }
    z.ta(kc, z.lang.Ca, "Convertor");
    z.extend(kc.prototype, {
        translate: function (a, b, c, e) {
            this.Pa.push({
                method: "translate",
                arguments: [a, b, c, e]
            })
        }
    });
    T(kc.prototype, {
        translate: kc.prototype.translate
    });

    function S() {}
    S.prototype = new ic;
    z.extend(S, {
        iP: 6370996.81,
        oG: [1.289059486E7, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
        Bu: [75, 60, 45, 30, 15, 0],
        oP: [[1.410526172116255E-8, 8.98305509648872E-6, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 1.73379812E7], [-7.435856389565537E-9, 8.983055097726239E-6, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887,2.28786674699375, 1.026014486E7], [-3.030883460898826E-8, 8.98305509983578E-6, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475,6856817.37], [-1.981981304930552E-8, 8.983055099779535E-6, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06], [3.09191371068437E-9,8.983055096812155E-6, 6.995724062E-5, 23.10934304144901, -2.3663490511E-4, -0.6321817810242, -0.00663494467273,0.03430082397953, -0.00466043876332, 2555164.4], [2.890871144776878E-9, 8.983055095805407E-6, -3.068298E-8,7.47137025468032, -3.53937994E-6, -0.02145144861037, -1.234426596E-5, 1.0322952773E-4, -3.23890364E-6,826088.5]],
        lG: [[-0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149669176653700, 26595700718403920, -10725012454188240, 1800819912950474, 82.5], [8.277824516172526E-4,111320.7020463578, 6.477955746671607E8, -4.082003173641316E9, 1.077490566351142E10, -1.517187553151559E10,1.205306533862167E10, -5.124939663577472E9, 9.133119359512032E8, 67.5], [0.00337398766765, 111320.7020202162,4481351.045890365, -2.339375119931662E7, 7.968221547186455E7, -1.159649932797253E8, 9.723671115602145E7, -4.366194633752821E7, 8477230.501135234, 52.5], [0.00220636496208, 111320.7020209128, 51751.86112841131,3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312,144416.9293806241, 37.5], [-3.441963504368392E-4, 111320.7020576856, 278.2353980772752, 2485758.690035394,6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5], [-3.218135878613132E-4, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093,2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]],
        G2: function (a, b) {
            if (!a || !b) return 0;
            var c, e, a = this.Tb(a);
            if (!a) return 0;
            c = this.Ok(a.lng);
            e = this.Ok(a.lat);
            b = this.Tb(b);
            return !b ? 0 : this.jf(c, this.Ok(b.lng), e, this.Ok(b.lat))
        },
        So: function (a, b) {
            if (!a || !b) return 0;
            a.lng = this.JD(a.lng, -180, 180);
            a.lat = this.OD(a.lat, -74, 74);
            b.lng = this.JD(b.lng, -180, 180);
            b.lat = this.OD(b.lat, -74, 74);
            return this.jf(this.Ok(a.lng), this.Ok(b.lng), this.Ok(a.lat), this.Ok(b.lat))
        },
        Tb: function (a) {
            if (a === s || a === l) return new I(0, 0);
            var b, c;
            b = new I(Math.abs(a.lng), Math.abs(a.lat));
            for (var e = 0; e < this.oG.length; e++) if (b.lat >= this.oG[e]) {
                    c = this.oP[e];
                    break
                }
            a = this.mK(a, c);
            return a = new I(a.lng.toFixed(6), a.lat.toFixed(6))
        },
        Db: function (a) {
            if (a === s || a === l || 180 < a.lng || -180 > a.lng || 90 < a.lat || -90 > a.lat) return new I(0, 0);
            var b, c;
            a.lng = this.JD(a.lng, -180, 180);
            a.lat = this.OD(a.lat, -74, 74);
            b = new I(a.lng, a.lat);
            for (var e = 0; e < this.Bu.length; e++) if (b.lat >= this.Bu[e]) {
                    c = this.lG[e];
                    break
                }
            if (!c) for (e = 0; e < this.Bu.length; e++) if (b.lat <= -this.Bu[e]) {
                        c = this.lG[e];
                        break
                    }
            a = this.mK(a, c);
            return a = new I(a.lng.toFixed(2), a.lat.toFixed(2))
        },
        mK: function (a, b) {
            if (a && b) {
                var c = b[0] + b[1] * Math.abs(a.lng),
                    e = Math.abs(a.lat) / b[9],
                    e = b[2] + b[3] * e + b[4] * e * e + b[5] * e * e * e + b[6] * e * e * e * e + b[7] * e * e * e * e *
                        e + b[8] * e * e * e * e * e * e,
                    c = c * (0 > a.lng ? -1 : 1),
                    e = e * (0 > a.lat ? -1 : 1);
                return new I(c, e)
            }
        },
        jf: function (a, b, c, e) {
            return this.iP * Math.acos(Math.sin(c) * Math.sin(e) + Math.cos(c) * Math.cos(e) * Math.cos(b - a))
        },
        Ok: function (a) {
            return Math.PI * a / 180
        },
        J4: function (a) {
            return 180 * a / Math.PI
        },
        OD: function (a, b, c) {
            b != s && (a = Math.max(a, b));
            c != s && (a = Math.min(a, c));
            return a
        },
        JD: function (a, b, c) {
            for (; a > c;) a -= c - b;
            for (; a < b;) a += c - b;
            return a
        }
    });
    z.extend(S.prototype, {
        wk: function (a) {
            return S.Db(a)
        },
        fh: function (a) {
            a = S.Db(a);
            return new Q(a.lng, a.lat)
        },
        ih: function (a) {
            return S.Tb(a)
        },
        pj: function (a) {
            a = new I(a.x, a.y);
            return S.Tb(a)
        },
        $b: function (a, b, c, e, f) {
            if (a) return a = this.wk(a, f), b = this.yc(b), new Q(Math.round((a.lng - c.lng) / b + e.width / 2), Math.round((
                    c.lat - a.lat) / b + e.height / 2))
        },
        wb: function (a, b, c, e, f) {
            if (a) return b = this.yc(b), this.ih(new I(c.lng + b * (a.x - e.width / 2), c.lat - b * (a.y - e.height /
                    2)), f)
        },
        yc: function (a) {
            return Math.pow(2, 18 - a)
        }
    });

    function hb() {
        this.Ui = "bj"
    }
    hb.prototype = new S;
    z.extend(hb.prototype, {
        wk: function (a, b) {
            return this.DQ(b, S.Db(a))
        },
        ih: function (a, b) {
            return S.Tb(this.EQ(b, a))
        },
        lngLatToPointFor3D: function (a, b) {
            var c = this,
                e = S.Db(a);
            K.load("coordtrans", function () {
                var a = jc.MD(c.Ui || "bj", e),
                    a = new Q(a.x, a.y);
                b && b(a)
            }, q)
        },
        pointToLngLatFor3D: function (a, b) {
            var c = this,
                e = new I(a.x, a.y);
            K.load("coordtrans", function () {
                var a = jc.KD(c.Ui || "bj", e),
                    a = new I(a.lng, a.lat),
                    a = S.Tb(a);
                b && b(a)
            }, q)
        },
        DQ: function (a, b) {
            if (K.jb("coordtrans").Fe == K.uj.Vp) {
                var c = jc.MD(a || "bj", b);
                return new I(c.x, c.y)
            }
            K.load("coordtrans", u());
            return new I(0, 0)
        },
        EQ: function (a, b) {
            if (K.jb("coordtrans").Fe == K.uj.Vp) {
                var c = jc.KD(a || "bj", b);
                return new I(c.lng, c.lat)
            }
            K.load("coordtrans", u());
            return new I(0, 0)
        },
        yc: function (a) {
            return Math.pow(2, 20 - a)
        }
    });

    function lc() {
        this.Kb = "overlay"
    }
    z.lang.ta(lc, z.lang.Ca, "Overlay");
    lc.sk = function (a) {
        a *= 1;
        return !a ? 0 : -1E5 * a << 1
    };
    z.extend(lc.prototype, {
        Ae: function (a) {
            if (!this.V && Xa(this.initialize) && (this.V = this.initialize(a))) this.V.style.WebkitUserSelect = "none";
            this.draw()
        },
        initialize: function () {
            aa("initialize\u65b9\u6cd5\u672a\u5b9e\u73b0")
        },
        draw: function () {
            aa("draw\u65b9\u6cd5\u672a\u5b9e\u73b0")
        },
        remove: function () {
            this.V && this.V.parentNode && this.V.parentNode.removeChild(this.V);
            this.V = s;
            this.dispatchEvent(new P("onremove"))
        },
        U: function () {
            this.V && z.D.U(this.V)
        },
        show: function () {
            this.V && z.D.show(this.V)
        },
        eh: function () {
            return !this.V || "none" == this.V.style.display || "hidden" == this.V.style.visibility ? t : q
        }
    });
    B.Se(function (a) {
        function b(a, b) {
            var c = L("div"),
                i = c.style;
            i.position = "absolute";
            i.top = i.left = i.width = i.height = "0";
            i.zIndex = b;
            a.appendChild(c);
            return c
        }
        var c = a.R;
        c.ld = a.ld = b(a.platform, 200);
        a.Qd.oD = b(c.ld, 800);
        a.Qd.CE = b(c.ld, 700);
        a.Qd.ZK = b(c.ld, 600);
        a.Qd.vE = b(c.ld, 500);
        a.Qd.KM = b(c.ld, 400);
        a.Qd.LM = b(c.ld, 300);
        a.Qd.QO = b(c.ld, 201);
        a.Qd.ut = b(c.ld, 200)
    });

    function gb() {
        z.lang.Ca.call(this);
        lc.call(this);
        this.map = s;
        this.Qa = q;
        this.yb = s;
        this.bH = 0
    }
    z.lang.ta(gb, lc, "OverlayInternal");
    z.extend(gb.prototype, {
        initialize: function (a) {
            this.map = a;
            z.lang.Ca.call(this, this.aa);
            return s
        },
        ox: w("map"),
        draw: u(),
        wj: u(),
        remove: function () {
            this.map = s;
            z.lang.Tw(this.aa);
            lc.prototype.remove.call(this)
        },
        U: function () {
            this.Qa !== t && (this.Qa = t)
        },
        show: function () {
            this.Qa !== q && (this.Qa = q)
        },
        eh: function () {
            return !this.V ? t : !! this.Qa
        },
        La: w("V"),
        RN: function (a) {
            var a = a || {}, b;
            for (b in a) this.z[b] = a[b]
        },
        Kp: ba("zIndex"),
        $i: function () {
            this.z.$i = q
        },
        iW: function () {
            this.z.$i = t
        },
        qo: ba("eg"),
        up: function () {
            this.eg = s
        }
    });

    function mc() {
        this.map = s;
        this.ya = {};
        this.xe = []
    }
    B.Se(function (a) {
        var b = new mc;
        b.map = a;
        a.ya = b.ya;
        a.xe = b.xe;
        a.addEventListener("load", function (a) {
            b.draw(a)
        });
        a.addEventListener("moveend", function (a) {
            b.draw(a)
        });
        z.ca.ia && 8 > z.ca.ia || "BackCompat" === document.compatMode ? a.addEventListener("zoomend", function (a) {
            setTimeout(function () {
                b.draw(a)
            }, 20)
        }) : a.addEventListener("zoomend", function (a) {
            b.draw(a)
        });
        a.addEventListener("maptypechange", function (a) {
            b.draw(a)
        });
        a.addEventListener("addoverlay", function (a) {
            a = a.target;
            if (a instanceof gb) b.ya[a.aa] || (b.ya[a.aa] = a);
            else {
                for (var e = t, f = 0, g = b.xe.length; f < g; f++) if (b.xe[f] === a) {
                        e = q;
                        break
                    }
                e || b.xe.push(a)
            }
        });
        a.addEventListener("removeoverlay", function (a) {
            a = a.target;
            if (a instanceof gb) delete b.ya[a.aa];
            else for (var e = 0, f = b.xe.length; e < f; e++) if (b.xe[e] === a) {
                        b.xe.splice(e, 1);
                        break
                    }
        });
        a.addEventListener("clearoverlays", function () {
            this.Wc();
            for (var a in b.ya) b.ya[a].z.$i && (b.ya[a].remove(), delete b.ya[a]);
            a = 0;
            for (var e = b.xe.length; a < e; a++) b.xe[a].enableMassClear !== t && (b.xe[a].remove(), b.xe[a] = s, b.xe
                    .splice(a, 1), a--, e--)
        });
        a.addEventListener("infowindowopen", function () {
            var a = this.yb;
            a && (z.D.U(a.zc), z.D.U(a.ac))
        });
        a.addEventListener("movestart", function () {
            this.bh() && this.bh().UI()
        });
        a.addEventListener("moveend", function () {
            this.bh() && this.bh().JI()
        })
    });
    mc.prototype.draw = function (a) {
        if (B.Zp) {
            var b = B.Zp.Ns(this.map);
            "canvas" === b.Kb && b.canvas && b.yQ(b.canvas.getContext("2d"))
        }
        for (var c in this.ya) this.ya[c].draw(a);
        z.jc.Eb(this.xe, function (a) {
            a.draw()
        });
        this.map.R.pb && this.map.R.pb.sa();
        B.Zp && b.pF()
    };

    function nc(a) {
        gb.call(this);
        a = a || {};
        this.z = {
            strokeColor: a.strokeColor || "#3a6bdb",
            oc: a.strokeWeight || 5,
            nd: a.strokeOpacity || 0.65,
            strokeStyle: a.strokeStyle || "solid",
            $i: a.enableMassClear === t ? t : q,
            pk: s,
            lm: s,
            gf: a.enableEditing === q ? q : t,
            TM: 5,
            Y_: t,
            cf: a.enableClicking === t ? t : q,
            ei: a.icons && 0 < a.icons.length ? a.icons : s
        };
        0 >= this.z.oc && (this.z.oc = 5);
        if (0 > this.z.nd || 1 < this.z.nd) this.z.nd = 0.65;
        if (0 > this.z.ng || 1 < this.z.ng) this.z.ng = 0.65;
        "solid" != this.z.strokeStyle && "dashed" != this.z.strokeStyle && (this.z.strokeStyle = "solid");
        this.V = s;
        this.Ju = new fb(0, 0);
        this.af = [];
        this.pc = [];
        this.Ra = {}
    }
    z.lang.ta(nc, gb, "Graph");
    nc.jx = function (a) {
        var b = [];
        if (!a) return b;
        $a(a) && z.jc.Eb(a.split(";"), function (a) {
            a = a.split(",");
            b.push(new I(a[0], a[1]))
        });
        "[object Array]" == Object.prototype.toString.apply(a) && 0 < a.length && (b = a);
        return b
    };
    nc.ME = [0.09, 0.0050, 1.0E-4, 1.0E-5];
    z.extend(nc.prototype, {
        initialize: function (a) {
            this.map = a;
            return s
        },
        draw: u(),
        Gr: function (a) {
            this.af.length = 0;
            this.ja = nc.jx(a).slice(0);
            this.xh()
        },
        ee: function (a) {
            this.Gr(a)
        },
        xh: function () {
            if (this.ja) {
                var a = this;
                a.Ju = new fb;
                z.jc.Eb(this.ja, function (b) {
                    a.Ju.extend(b)
                })
            }
        },
        Oe: w("ja"),
        Xm: function (a, b) {
            b && this.ja[a] && (this.af.length = 0, this.ja[a] = new I(b.lng, b.lat), this.xh())
        },
        setStrokeColor: function (a) {
            this.z.strokeColor = a
        },
        GX: function () {
            return this.z.strokeColor
        },
        Jp: function (a) {
            0 < a && (this.z.oc = a)
        },
        BL: function () {
            return this.z.oc
        },
        Hp: function (a) {
            a == l || (1 < a || 0 > a) || (this.z.nd = a)
        },
        HX: function () {
            return this.z.nd
        },
        Nt: function (a) {
            1 < a || 0 > a || (this.z.ng = a)
        },
        eX: function () {
            return this.z.ng
        },
        Ip: function (a) {
            "solid" != a && "dashed" != a || (this.z.strokeStyle = a)
        },
        AL: function () {
            return this.z.strokeStyle
        },
        setFillColor: function (a) {
            this.z.fillColor = a || ""
        },
        dX: function () {
            return this.z.fillColor
        },
        ne: w("Ju"),
        remove: function () {
            this.map && this.map.removeEventListener("onmousemove", this.iv);
            gb.prototype.remove.call(this);
            this.af.length = 0
        },
        gf: function () {
            if (!(2 > this.ja.length)) {
                this.z.gf = q;
                var a = this;
                K.load("poly", function () {
                    a.Ll()
                }, q)
            }
        },
        hW: function () {
            this.z.gf = t;
            var a = this;
            K.load("poly", function () {
                a.dk()
            }, q)
        },
        aX: function () {
            return this.z.gf
        }
    });

    function oc(a) {
        gb.call(this);
        this.V = this.map = s;
        this.z = {
            width: 0,
            height: 0,
            za: new O(0, 0),
            opacity: 1,
            background: "transparent",
            Px: 1,
            wM: "#000",
            DY: "solid",
            point: s
        };
        this.RN(a);
        this.point = this.z.point
    }
    z.lang.ta(oc, gb, "Division");
    z.extend(oc.prototype, {
        wj: function () {
            var a = this.z,
                b = this.content,
                c = ['<div class="BMap_Division" style="position:absolute;'];
            c.push("width:" + a.width + "px;display:block;");
            c.push("overflow:hidden;");
            "none" != a.borderColor && c.push("border:" + a.Px + "px " + a.DY + " " + a.wM + ";");
            c.push("opacity:" + a.opacity + "; filter:(opacity=" + 100 * a.opacity + ")");
            c.push("background:" + a.background + ";");
            c.push('z-index:60;">');
            c.push(b);
            c.push("</div>");
            this.V = Ab(this.map.Nf().CE, c.join(""))
        },
        initialize: function (a) {
            this.map = a;
            this.wj();
            this.V && z.M(this.V, H() ? "touchstart" : "mousedown", function (a) {
                ma(a)
            });
            return this.V
        },
        draw: function () {
            var a = this.map.Re(this.z.point);
            this.z.za = new O(-Math.round(this.z.width / 2) - Math.round(this.z.Px), -Math.round(this.z.height / 2) -
                Math.round(this.z.Px));
            this.V.style.left = a.x + this.z.za.width + "px";
            this.V.style.top = a.y + this.z.za.height + "px"
        },
        ga: function () {
            return this.z.point
        },
        b1: function () {
            return this.map.$b(this.ga())
        },
        sa: function (a) {
            this.z.point = a;
            this.draw()
        },
        QZ: function (a, b) {
            this.z.width = Math.round(a);
            this.z.height = Math.round(b);
            this.V && (this.V.style.width = this.z.width + "px", this.V.style.height = this.z.height + "px", this.draw())
        }
    });

    function pc(a, b, c) {
        a && b && (this.imageUrl = a, this.size = b, a = new O(Math.floor(b.width / 2), Math.floor(b.height / 2)), c =
            c || {}, a = c.anchor || a, b = c.imageOffset || new O(0, 0), this.imageSize = c.imageSize, this.anchor = a,
            this.imageOffset = b, this.infoWindowAnchor = c.infoWindowAnchor || this.anchor, this.printImageUrl = c.printImageUrl ||
            "")
    }
    z.extend(pc.prototype, {
        SN: function (a) {
            a && (this.imageUrl = a)
        },
        e_: function (a) {
            a && (this.printImageUrl = a)
        },
        ue: function (a) {
            a && (this.size = new O(a.width, a.height))
        },
        rc: function (a) {
            a && (this.anchor = new O(a.width, a.height))
        },
        Ot: function (a) {
            a && (this.imageOffset = new O(a.width, a.height))
        },
        VZ: function (a) {
            a && (this.infoWindowAnchor = new O(a.width, a.height))
        },
        SZ: function (a) {
            a && (this.imageSize = new O(a.width, a.height))
        },
        toString: ca("Icon")
    });

    function qc(a, b) {
        if (a) {
            b = b || {};
            this.style = {
                anchor: b.anchor || new O(0, 0),
                fillColor: b.fillColor || "#000",
                ng: b.fillOpacity || 0,
                scale: b.scale || 1,
                rotation: b.rotation || 0,
                strokeColor: b.strokeColor || "#000",
                nd: b.strokeOpacity || 1,
                oc: b.strokeWeight
            };
            this.Kb = "number" === typeof a ? a : "UserDefined";
            this.yi = this.style.anchor;
            this.lr = new O(0, 0);
            this.anchor = s;
            this.jB = a;
            var c = this;
            K.load("symbol", function () {
                c.Dn()
            }, q)
        }
    }
    z.extend(qc.prototype, {
        setPath: ba("jB"),
        setAnchor: function (a) {
            this.yi = this.style.anchor = a
        },
        setRotation: function (a) {
            this.style.rotation = a
        },
        setScale: function (a) {
            this.style.scale = a
        },
        setStrokeWeight: function (a) {
            this.style.oc = a
        },
        setStrokeColor: function (a) {
            a = z.as.oC(a, this.style.nd);
            this.style.strokeColor = a
        },
        setStrokeOpacity: function (a) {
            this.style.nd = a
        },
        setFillOpacity: function (a) {
            this.style.ng = a
        },
        setFillColor: function (a) {
            this.style.fillColor = a
        }
    });

    function rc(a, b, c, e) {
        a && (this.Bv = {}, this.XK = e ? !! e : t, this.Tc = [], this.w_ = a instanceof qc ? a : s, this.CI = b === l ?
            q : !! (b.indexOf("%") + 1), this.Pj = isNaN(parseFloat(b)) ? 1 : this.CI ? parseFloat(b) / 100 :
            parseFloat(b), this.DI = !! (c.indexOf("%") + 1), this.repeat = c != l ? this.DI ? parseFloat(c) / 100 :
            parseFloat(c) : 0)
    };

    function sc(a, b) {
        z.lang.Ca.call(this);
        this.content = a;
        this.map = s;
        b = b || {};
        this.z = {
            width: b.width || 0,
            height: b.height || 0,
            maxWidth: b.maxWidth || 730,
            za: b.offset || new O(0, 0),
            title: b.title || "",
            DE: b.maxContent || "",
            Yg: b.enableMaximize || t,
            Ds: b.enableAutoPan === t ? t : q,
            ZC: b.enableCloseOnClick === t ? t : q,
            margin: b.margin || [10, 10, 40, 10],
            jC: b.collisions || [[10, 10], [10, 10], [10, 10], [10, 10]],
            cY: t,
            WY: b.onClosing || ca(q),
            OK: t,
            dD: b.enableParano === q ? q : t,
            message: b.message,
            fD: b.enableSearchTool === q ? q : t,
            Ax: b.headerContent || "",
            $C: b.enableContentScroll || t
        };
        if (0 != this.z.width && (220 > this.z.width && (this.z.width = 220), 730 < this.z.width)) this.z.width = 730;
        if (0 != this.z.height && (60 > this.z.height && (this.z.height = 60), 650 < this.z.height)) this.z.height =
                650;
        if (0 != this.z.maxWidth && (220 > this.z.maxWidth && (this.z.maxWidth = 220), 730 < this.z.maxWidth)) this.z.maxWidth =
                730;
        this.Xd = t;
        this.ti = G.pa;
        this.cb = s;
        var c = this;
        K.load("infowindow", function () {
            c.hb()
        })
    }
    z.lang.ta(sc, z.lang.Ca, "InfoWindow");
    z.extend(sc.prototype, {
        setWidth: function (a) {
            !a && 0 != a || (isNaN(a) || 0 > a) || (0 != a && (220 > a && (a = 220), 730 < a && (a = 730)), this.z.width =
                a)
        },
        setHeight: function (a) {
            !a && 0 != a || (isNaN(a) || 0 > a) || (0 != a && (60 > a && (a = 60), 650 < a && (a = 650)), this.z.height =
                a)
        },
        WN: function (a) {
            !a && 0 != a || (isNaN(a) || 0 > a) || (0 != a && (220 > a && (a = 220), 730 < a && (a = 730)), this.z.maxWidth =
                a)
        },
        Cc: function (a) {
            this.z.title = a
        },
        getTitle: function () {
            return this.z.title
        },
        $c: ba("content"),
        nk: w("content"),
        Qt: function (a) {
            this.z.DE = a + ""
        },
        de: u(),
        Ds: function () {
            this.z.Ds = q
        },
        disableAutoPan: function () {
            this.z.Ds = t
        },
        enableCloseOnClick: function () {
            this.z.ZC = q
        },
        disableCloseOnClick: function () {
            this.z.ZC = t
        },
        Yg: function () {
            this.z.Yg = q
        },
        Ww: function () {
            this.z.Yg = t
        },
        show: function () {
            this.Qa = q
        },
        U: function () {
            this.Qa = t
        },
        close: function () {
            this.U()
        },
        Tx: function () {
            this.Xd = q
        },
        restore: function () {
            this.Xd = t
        },
        eh: function () {
            return this.Wa()
        },
        Wa: ca(t),
        ga: function () {
            if (this.cb && this.cb.ga) return this.cb.ga()
        },
        Mf: function () {
            return this.z.za
        }
    });
    Ka.prototype.nc = function (a, b) {
        if (a instanceof sc && b instanceof I) {
            var c = this.R;
            c.Em ? c.Em.sa(b) : (c.Em = new U(b, {
                icon: new pc(G.pa + "blank.gif", {
                    width: 1,
                    height: 1
                }),
                offset: new O(0, 0),
                clickable: t
            }), c.Em.CR = 1);
            this.Ga(c.Em);
            c.Em.nc(a)
        }
    };
    Ka.prototype.Wc = function () {
        var a = this.R.pb || this.R.il;
        a && a.cb && a.cb.Wc()
    };
    gb.prototype.nc = function (a) {
        this.map && (this.map.Wc(), a.Qa = q, this.map.R.il = a, a.cb = this, z.lang.Ca.call(a, a.aa))
    };
    gb.prototype.Wc = function () {
        this.map && this.map.R.il && (this.map.R.il.Qa = t, z.lang.Tw(this.map.R.il.aa), this.map.R.il = s)
    };

    function tc(a, b) {
        gb.call(this);
        this.content = a;
        this.V = this.map = s;
        b = b || {};
        this.z = {
            width: 0,
            za: b.offset || new O(0, 0),
            Op: {
                backgroundColor: "#fff",
                border: "1px solid #f00",
                padding: "1px",
                whiteSpace: "nowrap",
                font: "12px " + G.fontFamily,
                zIndex: "80",
                MozUserSelect: "none"
            },
            position: b.position || s,
            $i: b.enableMassClear === t ? t : q,
            cf: q
        };
        0 > this.z.width && (this.z.width = 0);
        Hb(b.enableClicking) && (this.z.cf = b.enableClicking);
        this.point = this.z.position;
        var c = this;
        K.load("marker", function () {
            c.hb()
        })
    }
    z.lang.ta(tc, gb, "Label");
    z.extend(tc.prototype, {
        ga: function () {
            return this.qv ? this.qv.ga() : this.point
        },
        sa: function (a) {
            a instanceof I && !this.px() && (this.point = this.z.position = new I(a.lng, a.lat))
        },
        $c: ba("content"),
        oF: function (a) {
            0 <= a && 1 >= a && (this.z.opacity = a)
        },
        Te: function (a) {
            a instanceof O && (this.z.za = new O(a.width, a.height))
        },
        Mf: function () {
            return this.z.za
        },
        Fd: function (a) {
            a = a || {};
            this.z.Op = z.extend(this.z.Op, a)
        },
        oi: function (a) {
            return this.Fd(a)
        },
        Cc: function (a) {
            this.z.title = a || ""
        },
        getTitle: function () {
            return this.z.title
        },
        VN: function (a) {
            this.point = (this.qv = a) ? this.z.position = a.ga() : this.z.position = s
        },
        px: function () {
            return this.qv || s
        },
        nk: w("content")
    });

    function uc(a, b) {
        if (0 !== arguments.length) {
            gb.apply(this, arguments);
            b = b || {};
            this.z = {
                ab: a,
                opacity: b.opacity || 1,
                xm: b.xm || "",
                rs: b.displayOnMinLevel || 1,
                $i: b.enableMassClear === t ? t : q,
                qs: b.displayOnMaxLevel || 19,
                q_: b.stretch || t
            };
            var c = this;
            K.load("groundoverlay", function () {
                c.hb()
            })
        }
    }
    z.lang.ta(uc, gb, "GroundOverlay");
    z.extend(uc.prototype, {
        setBounds: function (a) {
            this.z.ab = a
        },
        getBounds: function () {
            return this.z.ab
        },
        setOpacity: function (a) {
            this.z.opacity = a
        },
        getOpacity: function () {
            return this.z.opacity
        },
        setImageURL: function (a) {
            this.z.xm = a
        },
        getImageURL: function () {
            return this.z.xm
        },
        setDisplayOnMinLevel: function (a) {
            this.z.rs = a
        },
        getDisplayOnMinLevel: function () {
            return this.z.rs
        },
        setDisplayOnMaxLevel: function (a) {
            this.z.qs = a
        },
        getDisplayOnMaxLevel: function () {
            return this.z.qs
        }
    });
    var vc = 3,
        wc = 4;

    function xc() {
        var a = document.createElement("canvas");
        return !(!a.getContext || !a.getContext("2d"))
    }
    function yc(a, b) {
        var c = this;
        xc() && (a === l && aa(Error("\u6ca1\u6709\u4f20\u5165points\u6570\u636e")), "[object Array]" !== Object.prototype
            .toString.call(a) && aa(Error("points\u6570\u636e\u4e0d\u662f\u6570\u7ec4")), b = b || {}, gb.apply(c,
            arguments), c.ea = {
            ja: a
        }, c.z = {
            shape: b.shape || vc,
            size: b.size || wc,
            color: b.color || "#fa937e",
            $i: q
        }, this.gB = [], this.ie = [], K.load("pointcollection", function () {
            for (var a = 0, b; b = c.gB[a]; a++) c[b.method].apply(c, b.arguments);
            for (a = 0; b = c.ie[a]; a++) c[b.method].apply(c, b.arguments)
        }))
    }
    z.lang.ta(yc, gb, "PointCollection");
    z.extend(yc.prototype, {
        initialize: function (a) {
            this.gB && this.gB.push({
                method: "initialize",
                arguments: arguments
            })
        },
        setPoints: function (a) {
            this.ie && this.ie.push({
                method: "setPoints",
                arguments: arguments
            })
        },
        setStyles: function (a) {
            this.ie && this.ie.push({
                method: "setStyles",
                arguments: arguments
            })
        },
        clear: function () {
            this.ie && this.ie.push({
                method: "clear",
                arguments: arguments
            })
        },
        remove: function () {
            this.ie && this.ie.push({
                method: "remove",
                arguments: arguments
            })
        }
    });
    var zc = new pc(G.pa + "marker_red_sprite.png", new O(19, 25), {
        anchor: new O(10, 25),
        infoWindowAnchor: new O(10, 0)
    }),
        Ac = new pc(G.pa + "marker_red_sprite.png", new O(20, 11), {
            anchor: new O(6, 11),
            imageOffset: new O(-19, -13)
        });

    function U(a, b) {
        gb.call(this);
        b = b || {};
        this.point = a;
        this.pq = this.map = s;
        this.z = {
            za: b.offset || new O(0, 0),
            kj: b.icon || zc,
            Jk: Ac,
            title: b.title || "",
            label: s,
            TJ: b.baseZIndex || 0,
            cf: q,
            e5: t,
            qE: t,
            $i: b.enableMassClear === t ? t : q,
            Wb: t,
            AN: b.raiseOnDrag === q ? q : t,
            HN: t,
            Ad: b.draggingCursor || G.Ad,
            rotation: b.rotation || 0
        };
        b.icon && !b.shadow && (this.z.Jk = s);
        b.enableDragging && (this.z.Wb = b.enableDragging);
        Hb(b.enableClicking) && (this.z.cf = b.enableClicking);
        var c = this;
        K.load("marker", function () {
            c.hb()
        })
    }
    U.Eu = lc.sk(-90) + 1E6;
    U.gG = U.Eu + 1E6;
    z.lang.ta(U, gb, "Marker");
    z.extend(U.prototype, {
        Rb: function (a) {
            if (a instanceof pc || a instanceof qc) this.z.kj = a
        },
        To: function () {
            return this.z.kj
        },
        Ay: function (a) {
            a instanceof pc && (this.z.Jk = a)
        },
        getShadow: function () {
            return this.z.Jk
        },
        Vm: function (a) {
            this.z.label = a || s
        },
        HD: function () {
            return this.z.label
        },
        Wb: function () {
            this.z.Wb = q
        },
        GC: function () {
            this.z.Wb = t
        },
        ga: w("point"),
        sa: function (a) {
            a instanceof I && (this.point = new I(a.lng, a.lat))
        },
        pi: function (a, b) {
            this.z.qE = !! a;
            a && (this.DG = b || 0)
        },
        Cc: function (a) {
            this.z.title = a + ""
        },
        getTitle: function () {
            return this.z.title
        },
        Te: function (a) {
            a instanceof O && (this.z.za = a)
        },
        Mf: function () {
            return this.z.za
        },
        Um: ba("pq"),
        Gp: function (a) {
            this.z.rotation = a
        },
        yL: function () {
            return this.z.rotation
        }
    });

    function Bc(a) {
        this.options = a || {};
        this.bZ = this.options.paneName || "labelPane";
        this.zIndex = this.options.zIndex || 0
    }
    z.lang.ta(Bc, gb, "CanvasLayer");
    Bc.prototype.initialize = function (a) {
        this.C = a;
        var b = this.canvas = document.createElement("canvas"),
            c = this.canvas.getContext("2d");
        b.style.cssText = "position:absolute;left:0;top:0;z-index:" + this.zIndex + ";";
        Cc(this);
        Dc(c);
        a.getPanes()[this.bZ].appendChild(b);
        var e = this;
        a.addEventListener("resize", function () {
            Cc(e);
            e.hb()
        });
        return this.canvas
    };

    function Cc(a) {
        var b = a.C.tb(),
            a = a.canvas;
        a.width = b.width;
        a.height = b.height;
        a.style.width = a.width + "px";
        a.style.height = a.height + "px"
    }
    function Dc(a) {
        var b = (window.devicePixelRatio || 1) / (a.$U || a.a5 || a.H3 || a.I3 || a.K3 || a.$U || 1),
            c = a.canvas.width,
            e = a.canvas.height;
        a.canvas.width = c * b;
        a.canvas.height = e * b;
        a.canvas.style.width = c + "px";
        a.canvas.style.height = e + "px";
        a.scale(b, b)
    }
    Bc.prototype.draw = function () {
        var a = this,
            b = arguments;
        clearTimeout(a.C_);
        a.C_ = setTimeout(function () {
            a.hb.apply(a, b)
        }, 15)
    };
    da = Bc.prototype;
    da.hb = function () {
        var a = this.C;
        this.canvas.style.left = -a.offsetX + "px";
        this.canvas.style.top = -a.offsetY + "px";
        this.dispatchEvent("draw");
        this.options.update && this.options.update.apply(this, arguments)
    };
    da.La = w("canvas");
    da.show = function () {
        this.canvas || this.C.Ga(this);
        this.canvas.style.display = "block"
    };
    da.U = function () {
        this.canvas.style.display = "none"
    };
    da.Kp = function (a) {
        this.canvas.style.zIndex = a
    };
    da.sk = w("zIndex");

    function Ec(a, b) {
        nc.call(this, b);
        b = b || {};
        this.z.ng = b.fillOpacity ? b.fillOpacity : 0.65;
        this.z.fillColor = "" == b.fillColor ? "" : b.fillColor ? b.fillColor : "#fff";
        this.ee(a);
        var c = this;
        K.load("poly", function () {
            c.hb()
        })
    }
    z.lang.ta(Ec, nc, "Polygon");
    z.extend(Ec.prototype, {
        ee: function (a, b) {
            this.no = nc.jx(a).slice(0);
            var c = nc.jx(a).slice(0);
            1 < c.length && c.push(new I(c[0].lng, c[0].lat));
            nc.prototype.ee.call(this, c, b)
        },
        Xm: function (a, b) {
            this.no[a] && (this.no[a] = new I(b.lng, b.lat), this.ja[a] = new I(b.lng, b.lat), 0 == a && !this.ja[0].ob(
                this.ja[this.ja.length - 1]) && (this.ja[this.ja.length - 1] = new I(b.lng, b.lat)), this.xh())
        },
        Oe: function () {
            var a = this.no;
            0 == a.length && (a = this.ja);
            return a
        }
    });

    function Fc(a, b) {
        nc.call(this, b);
        this.Gr(a);
        var c = this;
        K.load("poly", function () {
            c.hb()
        })
    }
    z.lang.ta(Fc, nc, "Polyline");

    function Gc(a, b, c) {
        this.point = a;
        this.wa = Math.abs(b);
        Ec.call(this, [], c)
    }
    Gc.ME = [0.01, 1.0E-4, 1.0E-5, 4.0E-6];
    z.lang.ta(Gc, Ec, "Circle");
    z.extend(Gc.prototype, {
        initialize: function (a) {
            this.map = a;
            this.ja = this.cv(this.point, this.wa);
            this.xh();
            return s
        },
        Ka: w("point"),
        Sf: function (a) {
            a && (this.point = a)
        },
        wL: w("wa"),
        pf: function (a) {
            this.wa = Math.abs(a)
        },
        cv: function (a, b) {
            if (!a || !b || !this.map) return [];
            for (var c = [], e = b / 6378800, f = Math.PI / 180 * a.lat, g = Math.PI / 180 * a.lng, i = 0; 360 > i; i +=
                9) {
                var k = Math.PI / 180 * i,
                    m = Math.asin(Math.sin(f) * Math.cos(e) + Math.cos(f) * Math.sin(e) * Math.cos(k)),
                    k = new I(((g - Math.atan2(Math.sin(k) * Math.sin(e) * Math.cos(f), Math.cos(e) - Math.sin(f) *
                        Math.sin(m)) + Math.PI) % (2 * Math.PI) - Math.PI) * (180 / Math.PI), m * (180 / Math.PI));
                c.push(k)
            }
            e = c[0];
            c.push(new I(e.lng, e.lat));
            return c
        }
    });
    var Hc = {};

    function Ic(a) {
        this.map = a;
        this.Dm = [];
        this.Tf = [];
        this.zg = [];
        this.lV = 300;
        this.WE = 0;
        this.sg = {};
        this.Ti = {};
        this.kh = 0;
        this.kE = q;
        this.tK = {};
        this.Wn = this.Gn(1);
        this.jd = this.Gn(2);
        this.sl = this.Gn(3);
        a.platform.appendChild(this.Wn);
        a.platform.appendChild(this.jd);
        a.platform.appendChild(this.sl);
        var b = 256 * Math.pow(2, 15),
            c = 3 * b,
            a = S.Db(new I(180, 0)).lng,
            c = c - a,
            b = -3 * b,
            e = S.Db(new I(-180, 0)).lng;
        this.fI = a;
        this.gI = e;
        this.NA = c + (e - b);
        this.hI = a - e
    }
    B.Se(function (a) {
        var b = new Ic(a);
        b.qa();
        a.eb = b
    });
    z.extend(Ic.prototype, {
        qa: function () {
            var a = this,
                b = a.map;
            b.addEventListener("loadcode", function () {
                a.Qx()
            });
            b.addEventListener("addtilelayer", function (b) {
                a.Tg(b)
            });
            b.addEventListener("removetilelayer", function (b) {
                a.qh(b)
            });
            b.addEventListener("setmaptype", function (b) {
                a.xg(b)
            });
            b.addEventListener("zoomstartcode", function (b) {
                a.Jc(b)
            });
            b.addEventListener("setcustomstyles", function (b) {
                a.Pt(b.target);
                a.Qf(q)
            })
        },
        Qx: function () {
            var a = this;
            if (z.ca.ia) try {
                    document.execCommand("BackgroundImageCache", t, q)
            } catch (b) {}
            this.loaded || a.Gx();
            a.Qf();
            this.loaded || (this.loaded = q, K.load("tile", function () {
                a.UP()
            }))
        },
        Gx: function () {
            for (var a = this.map.na().gr, b = 0; b < a.length; b++) {
                var c = new Jc;
                z.extend(c, a[b]);
                this.Dm.push(c);
                c.qa(this.map, this.Wn)
            }
            this.Pt()
        },
        Gn: function (a) {
            var b = L("div");
            b.style.position = "absolute";
            b.style.overflow = "visible";
            b.style.left = b.style.top = "0";
            b.style.zIndex = a;
            return b
        },
        sf: function () {
            this.kh--;
            var a = this;
            this.kE && (this.map.dispatchEvent(new P("onfirsttileloaded")), this.kE = t);
            0 == this.kh && (this.Ci && (clearTimeout(this.Ci), this.Ci = s), this.Ci = setTimeout(function () {
                if (a.kh == 0) {
                    a.map.dispatchEvent(new P("ontilesloaded"));
                    a.kE = q
                }
                a.Ci = s
            }, 80))
        },
        TD: function (a, b) {
            return "TILE-" + b.aa + "-" + a[0] + "-" + a[1] + "-" + a[2]
        },
        Dx: function (a) {
            var b = a.Fb;
            b && zb(b) && b.parentNode.removeChild(b);
            delete this.sg[a.name];
            a.loaded || (Kc(a), a.Fb = s, a.Gm = s)
        },
        qm: function (a, b, c) {
            var e = this.map,
                f = e.na(),
                g = e.Oa,
                i = e.mc,
                k = f.yc(g),
                m = this.jL(),
                n = m[0],
                o = m[1],
                p = m[2],
                v = m[3],
                x = m[4],
                c = "undefined" != typeof c ? c : 0,
                f = f.j.Mb,
                m = e.aa.replace(/^TANGRAM_/, "");
            for (this.Qc ? this.Qc.length = 0 : this.Qc = []; n < p; n++) for (var y = o; y < v; y++) {
                    var A = n,
                        E = y;
                    this.Qc.push([A, E]);
                    A = m + "_" + b + "_" + A + "_" + E + "_" + g;
                    this.tK[A] = A
            }
            this.Qc.sort(function (a) {
                return function (b, c) {
                    return 0.4 * Math.abs(b[0] - a[0]) + 0.6 * Math.abs(b[1] - a[1]) - (0.4 * Math.abs(c[0] - a[0]) + 0.6 * Math.abs(c[1] - a[1]))
                }
            }([x[0] - 1, x[1] - 1]));
            i = [Math.round(-i.lng / k), Math.round(i.lat / k)];
            n = -e.offsetY + e.height / 2;
            a.style.left = -e.offsetX + e.width / 2 + "px";
            a.style.top = n + "px";
            this.He ? this.He.length = 0 : this.He = [];
            n = 0;
            for (e = a.childNodes.length; n < e; n++) y = a.childNodes[n], y.br = t, this.He.push(y);
            if (n = this.Jm) for (var C in n) delete n[C];
            else this.Jm = {};
            this.Ie ? this.Ie.length = 0 : this.Ie = [];
            n = 0;
            for (e = this.Qc.length; n < e; n++) {
                C = this.Qc[n][0];
                k = this.Qc[n][1];
                y = 0;
                for (o = this.He.length; y < o; y++) if (p = this.He[y], p.id == m + "_" + b + "_" + C + "_" + k + "_" +
                        g) {
                        p.br = q;
                        this.Jm[p.id] = p;
                        break
                    }
            }
            n = 0;
            for (e = this.He.length; n < e; n++) p = this.He[n], p.br || this.Ie.push(p);
            this.dn = [];
            y = (f + c) * this.map.K.devicePixelRatio;
            n = 0;
            for (e = this.Qc.length; n < e; n++) C = this.Qc[n][0], k = this.Qc[n][1], v = C * f + i[0] - c / 2, x = (-
                    1 - k) * f + i[1] - c / 2, A = m + "_" + b + "_" + C + "_" + k + "_" + g, o = this.Jm[A], p = s, o ?
                    (p = o.style, p.left = v + "px", p.top = x + "px", o.Xe || this.dn.push([C, k, o])) : (0 < this.Ie.length ?
                    (o = this.Ie.shift(), o.getContext("2d").clearRect(-c / 2, -c / 2, y, y), p = o.style) : (o =
                    document.createElement("canvas"), p = o.style, p.position = "absolute", p.width = f + c + "px", p.height =
                    f + c + "px", this.Lx() && (p.WebkitTransform = "scale(1.001)"), o.setAttribute("width", y), o.setAttribute(
                    "height", y), a.appendChild(o)), o.id = A, p.left = v + "px", p.top = x + "px", -1 < A.indexOf("bg") &&
                    (v = "#F3F1EC", this.map.K.wo && (v = this.map.K.wo), p.background = v ? v : ""), this.dn.push([C,
                        k, o])), o.style.visibility = "";
            n = 0;
            for (e = this.Ie.length; n < e; n++) this.Ie[n].style.visibility = "hidden";
            return this.dn
        },
        Lx: function () {
            return /M040/i.test(navigator.userAgent)
        },
        jL: function () {
            var a = this.map,
                b = a.na(),
                c = b.$D(a.Oa),
                e = a.mc,
                f = Math.ceil(e.lng / c),
                g = Math.ceil(e.lat / c),
                b = b.j.Mb,
                c = [f, g, (e.lng - f * c) / c * b, (e.lat - g * c) / c * b];
            return [c[0] - Math.ceil((a.width / 2 - c[2]) / b), c[1] - Math.ceil((a.height / 2 - c[3]) / b), c[0] +
                Math.ceil((a.width / 2 + c[2]) / b), c[1] + Math.ceil((a.height / 2 + c[3]) / b), c]
        },
        l_: function (a, b, c, e) {
            var f = this;
            f.K1 = b;
            var g = this.map.na(),
                i = f.TD(a, c),
                k = g.j.Mb,
                b = [a[0] * k + b[0], (-1 - a[1]) * k + b[1]],
                m = this.sg[i];
            if (this.map.na() !== Ya && this.map.na() !== Sa) {
                var n = this.yw(a[0], a[2]).offsetX;
                b[0] += n;
                b.g1 = n
            }
            m && m.Fb ? (xb(m.Fb, b), e && (e = new Q(a[0], a[1]), g = this.map.K.qe ? this.map.K.qe.style : "normal",
                e = c.getTilesUrl(e, a[2], g), m.loaded = t, Lc(m, e)), m.loaded ? this.sf() : Mc(m, function () {
                f.sf()
            })) : (m = this.Ti[i]) && m.Fb ? (c.Nb.insertBefore(m.Fb, c.Nb.lastChild), this.sg[i] = m, xb(m.Fb, b), e &&
                (e = new Q(a[0], a[1]), g = this.map.K.qe ? this.map.K.qe.style : "normal", e = c.getTilesUrl(e, a[2],
                g), m.loaded = t, Lc(m, e)), m.loaded ? this.sf() : Mc(m, function () {
                f.sf()
            })) : (m = k * Math.pow(2, g.jm() - a[2]), new I(a[0] * m, a[1] * m), e = new Q(a[0], a[1]), g = this.map.K
                .qe ? this.map.K.qe.style : "normal", e = c.getTilesUrl(e, a[2], g), m = new Nc(this, e, b, a, c), Mc(m, function () {
                f.sf()
            }), m.Vn(), this.sg[i] = m)
        },
        sf: function () {
            this.kh--;
            var a = this;
            0 == this.kh && (this.Ci && (clearTimeout(this.Ci), this.Ci = s), this.Ci = setTimeout(function () {
                if (a.kh == 0) {
                    a.map.dispatchEvent(new P("ontilesloaded"));
                    if (ua) {
                        if (ra && sa && ta) {
                            var b = bb(),
                                c = a.map.tb();
                            setTimeout(function () {
                                Ra(5030, {
                                    load_script_time: sa - ra,
                                    load_tiles_time: b - ta,
                                    map_width: c.width,
                                    map_height: c.height,
                                    map_size: c.width * c.height
                                })
                            }, 1E4);
                            B.wn("cus.fire", "time", {
                                z_imgfirstloaded: b - ta
                            })
                        }
                        ua = t
                    }
                }
                a.Ci = s
            }, 80))
        },
        TD: function (a, b) {
            return this.map.na() === Qa ? "TILE-" + b.aa + "-" + this.map.Ew + "-" + a[0] + "-" + a[1] + "-" + a[2] :
                "TILE-" + b.aa + "-" + a[0] + "-" + a[1] + "-" + a[2]
        },
        Dx: function (a) {
            var b = a.Fb;
            b && (Oc(b), zb(b) && b.parentNode.removeChild(b));
            delete this.sg[a.name];
            a.loaded || (Oc(b), Kc(a), a.Fb = s, a.Gm = s)
        },
        yw: function (a, b) {
            for (var c = 0, e = 6 * Math.pow(2, b - 3), f = e / 2 - 1, g = -e / 2; a > f;) a -= e, c -= this.NA;
            for (; a < g;) a += e, c += this.NA;
            c = Math.round(c / Math.pow(2, 18 - b));
            return {
                offsetX: c,
                $r: a
            }
        },
        nV: function (a) {
            for (var b = a.lng; b > this.fI;) b -= this.hI;
            for (; b < this.gI;) b += this.hI;
            a.lng = b;
            return a
        },
        oV: function (a, b) {
            for (var c = 256 * Math.pow(2, 18 - b), e = Math.floor(this.fI / c), f = Math.floor(this.gI / c), c = Math.floor(
                    this.NA / c), g = [], i = 0; i < a.length; i++) {
                var k = a[i],
                    m = k[0],
                    k = k[1];
                if (m >= e) {
                    var m = m + c,
                        n = "id_" + m + "_" + k + "_" + b;
                    a[n] || (a[n] = q, g.push([m, k]))
                } else m <= f && (m -= c, n = "id_" + m + "_" + k + "_" + b, a[n] || (a[n] = q, g.push([m, k])))
            }
            for (i = 0; i < g.length; i++) a.push(g[i]);
            return a
        },
        Qf: function (a) {
            var b = this;
            if (b.map.na() == Qa) K.load("coordtrans", function () {
                    b.map.Ub || (b.map.Ub = Qa.mk(b.map.Vg), b.map.Ew = Qa.hL(b.map.Ub));
                    b.jI()
                }, q);
            else {
                if (a && a) for (var c in this.Ti) delete this.Ti[c];
                b.jI(a)
            }
        },
        jI: function (a) {
            var b = this.Dm.concat(this.Tf),
                c = b.length,
                e = this.map,
                f = e.na(),
                g = e.mc;
            this.map.na() !== Ya && this.map.na() !== Sa && (g = this.nV(g));
            for (var i = 0; i < c; i++) {
                var k = b[i];
                if (k.dc && e.Oa < k.dc) break;
                if (k.ww) {
                    var m = this.Nb = k.Nb;
                    if (a) {
                        var n = m;
                        if (n && n.childNodes) for (var o = n.childNodes.length, p = o - 1; 0 <= p; p--) o = n.childNodes[
                                    p], n.removeChild(o), o = s
                    }
                    if (this.map.Sb()) {
                        this.jd.style.display = "block";
                        m.style.display = "none";
                        this.map.dispatchEvent(new P("vectorchanged"), {
                            isvector: q
                        });
                        continue
                    } else m.style.display = "block", this.jd.style.display = "none", this.map.dispatchEvent(new P(
                            "vectorchanged"), {
                            isvector: t
                        })
                }
                if (!k.XH && !(k.ip && !this.map.Sb() || k.kM && this.map.Sb())) {
                    e = this.map;
                    f = e.na();
                    m = f.Zo();
                    o = e.Oa;
                    g = e.mc;
                    f == Qa && g.ob(new I(0, 0)) && (g = e.mc = m.wk(e.Je, e.Ub));
                    var v = f.yc(o),
                        m = f.$D(o),
                        n = Math.ceil(g.lng / m),
                        x = Math.ceil(g.lat / m),
                        y = f.j.Mb,
                        m = [n, x, (g.lng - n * m) / m * y, (g.lat - x * m) / m * y],
                        p = m[0] - Math.ceil((e.width / 2 - m[2]) / y),
                        n = m[1] - Math.ceil((e.height / 2 - m[3]) / y),
                        x = m[0] + Math.ceil((e.width / 2 + m[2]) / y),
                        A = 0;
                    f === Qa && 15 == e.fa() && (A = 1);
                    f = m[1] + Math.ceil((e.height / 2 + m[3]) / y) + A;
                    this.OJ = new I(g.lng, g.lat);
                    var E = this.sg,
                        y = -this.OJ.lng / v,
                        A = this.OJ.lat / v,
                        v = [Math.ceil(y), Math.ceil(A)],
                        g = e.fa(),
                        C;
                    for (C in E) {
                        var F = E[C],
                            D = F.info;
                        (D[2] != g || D[2] == g && (p > D[0] || x <= D[0] || n > D[1] || f <= D[1])) && this.Dx(F)
                    }
                    E = -e.offsetX + e.width / 2;
                    F = -e.offsetY + e.height / 2;
                    k.Nb && (k.Nb.style.left = Math.ceil(y + E) - v[0] + "px", k.Nb.style.top = Math.ceil(A + F) - v[1] +
                        "px", k.Nb.style.WebkitTransform = "translate3d(0,0,0)");
                    y = [];
                    for (e.KB = []; p < x; p++) for (A = n; A < f; A++) y.push([p, A]), e.KB.push({
                                x: p,
                                y: A
                            });
                    this.map.na() !== Ya && this.map.na() !== Sa && (y = this.oV(y, o));
                    y.sort(function (a) {
                        return function (b, c) {
                            return 0.4 * Math.abs(b[0] - a[0]) + 0.6 * Math.abs(b[1] - a[1]) - (0.4 * Math.abs(c[0] - a[
                                0]) + 0.6 * Math.abs(c[1] - a[1]))
                        }
                    }([m[0] - 1, m[1] - 1]));
                    o = y.length;
                    this.kh += o;
                    for (p = 0; p < o; p++) this.l_([y[p][0], y[p][1], g], v, k, a)
                }
            }
        },
        Tg: function (a) {
            var b = this,
                c = a.target,
                a = b.map.Sb();
            if (c instanceof db) a && !c.zm && (c.qa(this.map, this.jd), c.zm = q);
            else if (c.Uf && this.map.Tg(c.Uf), c.ip) {
                for (a = 0; a < b.zg.length; a++) if (b.zg[a] == c) return;
                K.load("vector", function () {
                    c.qa(b.map, b.jd);
                    b.zg.push(c)
                }, q)
            } else {
                for (a = 0; a < b.Tf.length; a++) if (b.Tf[a] == c) return;
                c.qa(this.map, this.sl);
                b.Tf.push(c)
            }
        },
        qh: function (a) {
            var a = a.target,
                b = this.map.Sb();
            if (a instanceof db) b && a.zm && (a.remove(), a.zm = t);
            else {
                a.Uf && this.map.qh(a.Uf);
                if (a.ip) for (var b = 0, c = this.zg.length; b < c; b++) a == this.zg[b] && this.zg.splice(b, 1);
                else {
                    b = 0;
                    for (c = this.Tf.length; b < c; b++) a == this.Tf[b] && this.Tf.splice(b, 1)
                }
                a.remove()
            }
        },
        xg: function () {
            for (var a = this.Dm, b = 0, c = a.length; b < c; b++) a[b].remove();
            delete this.Nb;
            this.Dm = [];
            this.Ti = this.sg = {};
            this.Gx();
            this.Qf()
        },
        Jc: function () {
            var a = this;
            a.qd && z.D.U(a.qd);
            setTimeout(function () {
                a.Qf();
                a.map.dispatchEvent(new P("onzoomend"))
            }, 10)
        },
        T4: u(),
        Pt: function (a) {
            var b = this.map.na();
            if (!this.map.Sb() && (a ? this.map.K.t_ = a : a = this.map.K.t_, a)) for (var c = s, c = "2" == B.Oy ? [B.url
                            .proto + B.url.domain.main_domain_cdn.other[0] + "/"] : [B.url.proto + B.url.domain.main_domain_cdn
                            .baidu[0] + "/", B.url.proto + B.url.domain.main_domain_cdn.baidu[1] + "/", B.url.proto + B
                            .url.domain.main_domain_cdn.baidu[2] + "/"], e = 0, f; f = this.Dm[e]; e++) if (f.g_ == q) {
                        b.j.Yb = 18;
                        f.getTilesUrl = function (b, e) {
                            var f = b.x,
                                f = this.map.eb.yw(f, e).$r,
                                m = b.y,
                                n = Rb("normal"),
                                o = 1;
                            this.map.Ex() && (o = 2);
                            n = "customimage/tile?&x=" + f + "&y=" + m + "&z=" + e + "&udt=" + n + "&scale=" + o +
                                "&ak=" + qa;
                            n = a.styleStr ? n + ("&styles=" + encodeURIComponent(a.styleStr)) : n + ("&customid=" + a.style);
                            return c[Math.abs(f + m) % c.length] + n
                        };
                        break
                    }
        }
    });

    function Nc(a, b, c, e, f) {
        this.Gm = a;
        this.position = c;
        this.Ou = [];
        this.name = a.TD(e, f);
        this.info = e;
        this.nJ = f.lt();
        e = L("img");
        yb(e);
        e.aL = t;
        var g = e.style,
            a = a.map.na();
        g.position = "absolute";
        g.border = "none";
        g.width = a.j.Mb + "px";
        g.height = a.j.Mb + "px";
        g.left = c[0] + "px";
        g.top = c[1] + "px";
        g.maxWidth = "none";
        this.Fb = e;
        this.src = b;
        Pc && (this.Fb.style.opacity = 0);
        var i = this;
        this.Fb.onload = function () {
            B.EY.GQ();
            i.loaded = q;
            if (i.Gm) {
                var a = i.Gm,
                    b = a.Ti;
                if (!b[i.name]) {
                    a.WE++;
                    b[i.name] = i
                }
                if (i.Fb && !zb(i.Fb) && f.Nb) {
                    f.Nb.appendChild(i.Fb);
                    if (z.ca.ia <= 6 && z.ca.ia > 0 && i.nJ) i.Fb.style.cssText = i.Fb.style.cssText + (
                            ';filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + i.src +
                            '",sizingMethod=scale);')
                }
                var c = a.WE - a.lV,
                    e;
                for (e in b) {
                    if (c <= 0) break;
                    if (!a.sg[e]) {
                        b[e].Gm = s;
                        var g = b[e].Fb;
                        if (g && g.parentNode) {
                            g.parentNode.removeChild(g);
                            Oc(g)
                        }
                        g = s;
                        b[e].Fb = s;
                        delete b[e];
                        a.WE--;
                        c--
                    }
                }
                Pc && new tb({
                    Gc: 20,
                    duration: 200,
                    va: function (a) {
                        if (i.Fb && i.Fb.style) i.Fb.style.opacity = a * 1
                    },
                    finish: function () {
                        i.Fb && i.Fb.style && delete i.Fb.style.opacity
                    }
                });
                Kc(i)
            }
        };
        this.Fb.onerror = function () {
            Kc(i);
            if (i.Gm) {
                var a = i.Gm.map.na();
                if (a.j.iD) {
                    i.error = q;
                    i.Fb.src = a.j.iD;
                    i.Fb && !zb(i.Fb) && f.Nb.appendChild(i.Fb)
                }
            }
        };
        e = s
    }
    function Mc(a, b) {
        a.Ou.push(b)
    }
    Nc.prototype.Vn = function () {
        this.Fb.src = 0 < z.ca.ia && 6 >= z.ca.ia && this.nJ ? G.pa + "blank.gif" : "" !== this.src && this.Fb.src ==
            this.src ? this.src + "&t = " + Date.now() : this.src
    };

    function Kc(a) {
        for (var b = 0; b < a.Ou.length; b++) a.Ou[b]();
        a.Ou.length = 0
    }
    function Oc(a) {
        if (a) {
            a.onload = a.onerror = s;
            var b = a.attributes,
                c, e, f;
            if (b) {
                e = b.length;
                for (c = 0; c < e; c += 1) f = b[c].name, Xa(a[f]) && (a[f] = s)
            }
            if (b = a.children) {
                e = b.length;
                for (c = 0; c < e; c += 1) Oc(a.children[c])
            }
        }
    }
    function Lc(a, b) {
        a.src = b;
        a.Vn()
    }
    var Pc = !z.ca.ia || 8 < z.ca.ia;

    function Jc(a) {
        this.lh = a || {};
        this.KV = this.lh.copyright || s;
        this.U_ = this.lh.transparentPng || t;
        this.ww = this.lh.baseLayer || t;
        this.zIndex = this.lh.zIndex || 0;
        this.aa = Jc.sS++
    }
    Jc.sS = 0;
    z.lang.ta(Jc, z.lang.Ca, "TileLayer");
    z.extend(Jc.prototype, {
        qa: function (a, b) {
            this.ww && (this.zIndex = -100);
            this.map = a;
            if (!this.Nb) {
                var c = L("div"),
                    e = c.style;
                e.position = "absolute";
                e.overflow = "visible";
                e.zIndex = this.zIndex;
                e.left = Math.ceil(-a.offsetX + a.width / 2) + "px";
                e.top = Math.ceil(-a.offsetY + a.height / 2) + "px";
                b.appendChild(c);
                this.Nb = c
            }
        },
        remove: function () {
            this.Nb && this.Nb.parentNode && (this.Nb.innerHTML = "", this.Nb.parentNode.removeChild(this.Nb));
            delete this.Nb
        },
        lt: w("U_"),
        getTilesUrl: function (a, b) {
            if (this.map.na() !== Ya && this.map.na() !== Sa) var c = this.map.eb.yw(a.x, b).$r;
            var e = "";
            this.lh.tileUrlTemplate && (e = this.lh.tileUrlTemplate.replace(/\{X\}/, c), e = e.replace(/\{Y\}/, a.y), e =
                e.replace(/\{Z\}/, b));
            return e
        },
        gm: w("KV"),
        na: function () {
            return this.Gb || La
        }
    });

    function Qc(a, b) {
        Ib(a) ? b = a || {} : (b = b || {}, b.databoxId = a);
        this.j = {
            uK: b.databoxId,
            Zg: b.geotableId,
            Om: b.q || "",
            fu: b.tags || "",
            filter: b.filter || "",
            Hy: b.sortby || "",
            r_: b.styleId || "",
            Ml: b.ak || qa,
            tw: b.age || 36E5,
            zIndex: 11,
            BY: "VectorCloudLayer",
            vk: b.hotspotName || "vector_md_" + (1E5 * Math.random()).toFixed(0),
            SU: "LBS\u4e91\u9ebb\u70b9\u5c42"
        };
        this.ip = q;
        Jc.call(this, this.j);
        this.cW = B.Uc + "geosearch/detail/";
        this.dW = B.Uc + "geosearch/v2/detail/";
        this.ep = {}
    }
    z.ta(Qc, Jc, "VectorCloudLayer");

    function Rc(a) {
        a = a || {};
        this.j = z.extend(a, {
            zIndex: 1,
            BY: "VectorTrafficLayer",
            SU: "\u77e2\u91cf\u8def\u51b5\u5c42"
        });
        this.ip = q;
        Jc.call(this, this.j);
        this.Q_ = B.url.proto + B.url.domain.vector_traffic + "/gvd/?qt=lgvd&styles=pl&layers=tf";
        this.Cb = {
            "0": [2, 1354709503, 2, 2, 0, [], 0, 0],
            1: [2, 1354709503, 3, 2, 0, [], 0, 0],
            10: [2, -231722753, 2, 2, 0, [], 0, 0],
            11: [2, -231722753, 3, 2, 0, [], 0, 0],
            12: [2, -231722753, 4, 2, 0, [], 0, 0],
            13: [2, -231722753, 5, 2, 0, [], 0, 0],
            14: [2, -231722753, 6, 2, 0, [], 0, 0],
            15: [2, -1, 4, 0, 0, [], 0, 0],
            16: [2, -1, 5.5, 0, 0, [], 0, 0],
            17: [2, -1, 7, 0, 0, [], 0, 0],
            18: [2, -1, 8.5, 0, 0, [], 0, 0],
            19: [2, -1, 10, 0, 0, [], 0, 0],
            2: [2, 1354709503, 4, 2, 0, [], 0, 0],
            3: [2, 1354709503, 5, 2, 0, [], 0, 0],
            4: [2, 1354709503, 6, 2, 0, [], 0, 0],
            5: [2, -6350337, 2, 2, 0, [], 0, 0],
            6: [2, -6350337, 3, 2, 0, [], 0, 0],
            7: [2, -6350337, 4, 2, 0, [], 0, 0],
            8: [2, -6350337, 5, 2, 0, [], 0, 0],
            9: [2, -6350337, 6, 2, 0, [], 0, 0]
        }
    }
    z.ta(Rc, Jc, "VectorTrafficLayer");

    function db(a) {
        this.mV = [B.url.proto + B.url.domain.TILE_ONLINE_URLS[1] + "/gvd/?", B.url.proto + B.url.domain.TILE_ONLINE_URLS[
                2] + "/gvd/?", B.url.proto + B.url.domain.TILE_ONLINE_URLS[3] + "/gvd/?", B.url.proto + B.url.domain.TILE_ONLINE_URLS[
                4] + "/gvd/?"];
        this.j = {
            WK: t
        };
        for (var b in a) this.j[b] = a[b];
        this.Ph = this.Bh = this.Xa = this.B = this.C = s;
        this.pM = 0;
        var c = this;
        K.load("vector", function () {
            c.we()
        })
    }
    z.extend(db.prototype, {
        qa: function (a, b) {
            this.C = a;
            this.B = b
        },
        remove: function () {
            this.B = this.C = s
        }
    });

    function Sc(a) {
        Jc.call(this, a);
        this.j = a || {};
        this.kM = q;
        this.Uf = new Rc;
        this.Uf.My = this;
        if (this.j.predictDate) {
            if (1 > this.j.predictDate.weekday || 7 < this.j.predictDate.weekday) this.j.predictDate = 1;
            if (0 > this.j.predictDate.hour || 23 < this.j.predictDate.hour) this.j.predictDate.hour = 0
        }
        this.tU = B.url.proto + B.url.domain.traffic + "/traffic/"
    }
    Sc.prototype = new Jc;
    Sc.prototype.qa = function (a, b) {
        Jc.prototype.qa.call(this, a, b);
        this.C = a
    };
    Sc.prototype.lt = ca(q);
    Sc.prototype.getTilesUrl = function (a, b) {
        var c = "";
        this.j.predictDate ? c = "HistoryService?day=" + (this.j.predictDate.weekday - 1) + "&hour=" + this.j.predictDate
            .hour + "&t=" + (new Date).getTime() + "&" : (c = "TrafficTileService?time=" + (new Date).getTime() + "&",
            c += "label=web2D&v=016&");
        var c = this.tU + c + "level=" + b + "&x=" + a.x + "&y=" + a.y,
            e = 1;
        this.C.Ex() && (e = 2);
        return (c + "&scaler=" + e).replace(/-(\d+)/gi, "M$1")
    };
    var Tc = [B.url.proto + B.url.domain.TILES_YUN_HOST[0] + "/georender/gss", B.url.proto + B.url.domain.TILES_YUN_HOST[
            1] + "/georender/gss", B.url.proto + B.url.domain.TILES_YUN_HOST[2] + "/georender/gss", B.url.proto + B.url
            .domain.TILES_YUN_HOST[3] + "/georender/gss"],
        Uc = B.url.proto + B.url.domain.main_domain_nocdn.baidu + "/style/poi/rangestyle",
        Vc = 100;

    function nb(a, b) {
        Jc.call(this);
        var c = this;
        this.kM = q;
        var e = t;
        try {
            document.createElement("canvas").getContext("2d"), e = q
        } catch (f) {
            e = t
        }
        e && (this.Uf = new Qc(a, b), this.Uf.My = this);
        Ib(a) ? b = a || {} : (c.Jn = a, b = b || {});
        b.geotableId && (c.vf = b.geotableId);
        b.databoxId && (c.Jn = b.databoxId);
        e = B.Uc + "geosearch";
        c.qc = {
            vN: b.pointDensity || Vc,
            ZX: e + "/detail/",
            $X: e + "/v2/detail/",
            tw: b.age || 36E5,
            Om: b.q || "",
            B_: "png",
            k3: [5, 5, 5, 5],
            AY: {
                backgroundColor: "#FFFFD5",
                borderColor: "#808080"
            },
            Ml: b.ak || qa,
            fu: b.tags || "",
            filter: b.filter || "",
            Hy: b.sortby || "",
            vk: b.hotspotName || "tile_md_" + (1E5 * Math.random()).toFixed(0),
            LF: q
        };
        K.load("clayer", function () {
            c.Kd()
        })
    }
    nb.prototype = new Jc;
    nb.prototype.qa = function (a, b) {
        Jc.prototype.qa.call(this, a, b);
        this.C = a
    };
    nb.prototype.getTilesUrl = function (a, b) {
        var c = a.x,
            e = a.y,
            f = this.qc,
            c = Tc[Math.abs(c + e) % Tc.length] + "/image?grids=" + c + "_" + e + "_" + b + "&q=" + f.Om + "&tags=" + f
                .fu + "&filter=" + f.filter + "&sortby=" + f.Hy + "&ak=" + this.qc.Ml + "&age=" + f.tw + "&page_size=" +
                f.vN + "&format=" + f.B_;
        f.LF || (f = (1E5 * Math.random()).toFixed(0), c += "&timeStamp=" + f);
        this.vf ? c += "&geotable_id=" + this.vf : this.Jn && (c += "&databox_id=" + this.Jn);
        return c
    };
    nb.prototype.enableUseCache = function () {
        this.qc.LF = q
    };
    nb.prototype.disableUseCache = function () {
        this.qc.LF = t
    };
    nb.ST = /^point\(|\)$/ig;
    nb.TT = /\s+/;
    nb.VT = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    function Wc(a, b, c) {
        this.$e = a;
        this.gr = b instanceof Jc ? [b] : b.slice(0);
        c = c || {};
        this.j = {
            D_: c.tips || "",
            wE: "",
            dc: c.minZoom || 3,
            Yb: c.maxZoom || 18,
            j3: c.minZoom || 3,
            i3: c.maxZoom || 18,
            Mb: 256,
            BF: c.textColor || "black",
            iD: c.errorImageUrl || "",
            ab: new fb(new I(-21364736, -16023552), new I(23855104, 19431424)),
            ce: c.projection || new S
        };
        1 <= this.gr.length && (this.gr[0].ww = q);
        z.extend(this.j, c)
    }
    z.extend(Wc.prototype, {
        getName: w("$e"),
        Xs: function () {
            return this.j.D_
        },
        O2: function () {
            return this.j.wE
        },
        LX: function () {
            return this.gr[0]
        },
        c3: w("gr"),
        MX: function () {
            return this.j.Mb
        },
        Uo: function () {
            return this.j.dc
        },
        jm: function () {
            return this.j.Yb
        },
        setMaxZoom: function (a) {
            this.j.Yb = a
        },
        pm: function () {
            return this.j.BF
        },
        Zo: function () {
            return this.j.ce
        },
        H2: function () {
            return this.j.iD
        },
        MX: function () {
            return this.j.Mb
        },
        yc: function (a) {
            return Math.pow(2, 18 - a)
        },
        $D: function (a) {
            return this.yc(a) * this.j.Mb
        }
    });
    var Xc = [B.url.proto + B.url.domain.TILE_BASE_URLS[0] + "/it/", B.url.proto + B.url.domain.TILE_BASE_URLS[1] +
            "/it/", B.url.proto + B.url.domain.TILE_BASE_URLS[2] + "/it/", B.url.proto + B.url.domain.TILE_BASE_URLS[3] +
            "/it/", B.url.proto + B.url.domain.TILE_BASE_URLS[4] + "/it/"],
        Yc = [B.url.proto + B.url.domain.TILE_ONLINE_URLS[0] + "/tile/", B.url.proto + B.url.domain.TILE_ONLINE_URLS[1] +
                "/tile/", B.url.proto + B.url.domain.TILE_ONLINE_URLS[2] + "/tile/", B.url.proto + B.url.domain.TILE_ONLINE_URLS[
                3] + "/tile/", B.url.proto + B.url.domain.TILE_ONLINE_URLS[4] + "/tile/"],
        Zc = {
            dark: "dl",
            light: "ll",
            normal: "pl"
        }, $c = new Jc;
    $c.g_ = q;
    $c.getTilesUrl = function (a, b, c) {
        var e = a.x,
            a = a.y,
            f = Rb("normal"),
            g = 1,
            c = Zc[c];
        this.map.Ex() && (g = 2);
        e = this.map.eb.yw(e, b).$r;
        return (Yc[Math.abs(e + a) % Yc.length] + "?qt=tile&x=" + (e + "").replace(/-/gi, "M") + "&y=" + (a + "").replace(
            /-/gi, "M") + "&z=" + b + "&styles=" + c + "&scaler=" + g + (6 == z.ca.ia ? "&color_dep=32&colors=50" : "") +
            "&udt=" + f).replace(/-(\d+)/gi, "M$1")
    };
    var La = new Wc("\u5730\u56fe", $c, {
        tips: "\u663e\u793a\u666e\u901a\u5730\u56fe",
        maxZoom: 19
    }),
        ad = new Jc;
    ad.qO = [B.url.proto + B.url.domain.TIlE_PERSPECT_URLS[0] + "/resource/mappic/", B.url.proto + B.url.domain.TIlE_PERSPECT_URLS[
            1] + "/resource/mappic/", B.url.proto + B.url.domain.TIlE_PERSPECT_URLS[2] + "/resource/mappic/", B.url.proto +
            B.url.domain.TIlE_PERSPECT_URLS[3] + "/resource/mappic/"];
    ad.getTilesUrl = function (a, b) {
        var c = a.x,
            e = a.y,
            f = 256 * Math.pow(2, 20 - b),
            e = Math.round((9998336 - f * e) / f) - 1;
        return url = this.qO[Math.abs(c + e) % this.qO.length] + this.map.Ub + "/" + this.map.Ew + "/3/lv" + (21 - b) +
            "/" + c + "," + e + ".jpg"
    };
    var Qa = new Wc("\u4e09\u7ef4", ad, {
        tips: "\u663e\u793a\u4e09\u7ef4\u5730\u56fe",
        minZoom: 15,
        maxZoom: 20,
        textColor: "white",
        projection: new hb
    });
    Qa.yc = function (a) {
        return Math.pow(2, 20 - a)
    };
    Qa.mk = function (a) {
        if (!a) return "";
        var b = G.dC,
            c;
        for (c in b) if (-1 < a.search(c)) return b[c].iy;
        return ""
    };
    Qa.hL = function (a) {
        return {
            bj: 2,
            gz: 1,
            sz: 14,
            sh: 4
        }[a]
    };
    var bd = new Jc({
        ww: q
    });
    bd.getTilesUrl = function (a, b) {
        var c = a.x,
            e = a.y;
        return (Xc[Math.abs(c + e) % Xc.length] + "u=x=" + c + ";y=" + e + ";z=" + b + ";v=009;type=sate&fm=46&udt=" +
            Rb("satellite")).replace(/-(\d+)/gi, "M$1")
    };
    var Ya = new Wc("\u536b\u661f", bd, {
        tips: "\u663e\u793a\u536b\u661f\u5f71\u50cf",
        minZoom: 1,
        maxZoom: 19,
        textColor: "white"
    }),
        cd = new Jc({
            transparentPng: q
        });
    cd.getTilesUrl = function (a, b) {
        var c = a.x,
            e = a.y,
            f = Rb("satelliteStreet");
        return (Yc[Math.abs(c + e) % Yc.length] + "?qt=tile&x=" + (c + "").replace(/-/gi, "M") + "&y=" + (e + "").replace(
            /-/gi, "M") + "&z=" + b + "&styles=sl" + (6 == z.ca.ia ? "&color_dep=32&colors=50" : "") + "&udt=" + f).replace(
            /-(\d+)/gi, "M$1")
    };
    var Sa = new Wc("\u6df7\u5408", [bd, cd], {
        tips: "\u663e\u793a\u5e26\u6709\u8857\u9053\u7684\u536b\u661f\u5f71\u50cf",
        labelText: "\u8def\u7f51",
        minZoom: 1,
        maxZoom: 19,
        textColor: "white"
    });
    var dd = 1,
        V = {};
    window.t0 = V;

    function W(a, b) {
        z.lang.Ca.call(this);
        this.td = {};
        this.Wm(a);
        b = b || {};
        b.la = b.renderOptions || {};
        this.j = {
            la: {
                Ma: b.la.panel || s,
                map: b.la.map || s,
                Ug: b.la.autoViewport || q,
                Kt: b.la.selectFirstResult,
                at: b.la.highlightMode,
                Wb: b.la.enableDragging || t
            },
            ay: b.onSearchComplete || u(),
            iN: b.onMarkersSet || u(),
            hN: b.onInfoHtmlSet || u(),
            kN: b.onResultsHtmlSet || u(),
            gN: b.onGetBusListComplete || u(),
            fN: b.onGetBusLineComplete || u(),
            dN: b.onBusListHtmlSet || u(),
            cN: b.onBusLineHtmlSet || u(),
            JE: b.onPolylinesSet || u(),
            vp: b.reqFrom || ""
        };
        this.j.la.Ug = "undefined" != typeof b && "undefined" != typeof b.renderOptions && "undefined" != typeof b.renderOptions
            .autoViewport ? b.renderOptions.autoViewport : q;
        this.j.la.Ma = z.Dc(this.j.la.Ma)
    }
    z.ta(W, z.lang.Ca);
    z.extend(W.prototype, {
        getResults: function () {
            return this.Fc ? this.zi : this.ha
        },
        enableAutoViewport: function () {
            this.j.la.Ug = q
        },
        disableAutoViewport: function () {
            this.j.la.Ug = t
        },
        Wm: function (a) {
            a && (this.td.src = a)
        },
        qF: function (a) {
            this.j.ay = a || u()
        },
        setMarkersSetCallback: function (a) {
            this.j.iN = a || u()
        },
        setPolylinesSetCallback: function (a) {
            this.j.JE = a || u()
        },
        setInfoHtmlSetCallback: function (a) {
            this.j.hN = a || u()
        },
        setResultsHtmlSetCallback: function (a) {
            this.j.kN = a || u()
        },
        nm: w("Fe")
    });
    var ed = {
        qG: B.Uc,
        $a: function (a, b, c, e, f) {
            this.nZ(b);
            var g = (1E5 * Math.random()).toFixed(0);
            B._rd["_cbk" + g] = function (b) {
                b.result && b.result.error && 202 === b.result.error ? alert(
                    "\u8be5AK\u56e0\u4e3a\u6076\u610f\u884c\u4e3a\u5df2\u7ecf\u88ab\u7ba1\u7406\u5458\u5c01\u7981\uff01") :
                    (c = c || {}, a && a(b, c), delete B._rd["_cbk" + g])
            };
            e = e || "";
            b = c && c.Z_ ? Gb(b, encodeURI) : Gb(b, encodeURIComponent);
            this.qG = c && c.QK ? c.GN ? c.GN : B.mp : B.Uc;
            e = this.qG + e + "?" + b + "&ie=utf-8&oue=1&fromproduct=jsapi";
            f || (e += "&res=api");
            e = e + ("&callback=BMap._rd._cbk" + g) + ("&ak=" + qa);
            oa(e)
        },
        nZ: function (a) {
            if (a.qt) {
                var b = "";
                switch (a.qt) {
                case "bt":
                    b = "z_qt|bt";
                    break;
                case "nav":
                    b = "z_qt|nav";
                    break;
                case "walk":
                    b = "z_qt|walk";
                    break;
                case "bse":
                    b = "z_qt|bse";
                    break;
                case "nse":
                    b = "z_qt|nse";
                    break;
                case "drag":
                    b = "z_qt|drag"
                }
                "" !== b && B.alog("cus.fire", "count", b)
            }
        }
    };
    window.F0 = ed;
    B._rd = {};
    var ab = {};
    window.E0 = ab;
    ab.CN = function (a) {
        a = a.replace(/<\/?[^>]*>/g, "");
        return a = a.replace(/[ | ]* /g, " ")
    };
    ab.eZ = function (a) {
        return a.replace(
            /([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*),([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*)(,)/g,
            "$1,$2;")
    };
    ab.fZ = function (a, b) {
        return a.replace(RegExp(
            "(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);)(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);){" + b + "}", "ig"),
            "$1")
    };
    var fd = 2,
        gd = 6,
        hd = 8,
        id = 2,
        jd = 3,
        kd = 6,
        ld = 0,
        md = "bt",
        nd = "nav",
        od = "walk",
        pd = "bl",
        qd = "bsl",
        rd = "ride",
        sd = 15,
        td = 18;
    B.I = window.Instance = z.lang.Kc;

    function ud(a, b, c) {
        z.lang.Ca.call(this);
        if (a) {
            this.Va = "object" == typeof a ? a : z.Dc(a);
            this.page = 1;
            this.Dd = 100;
            this.PJ = "pg";
            this.Rf = 4;
            this.YJ = b;
            this.update = q;
            a = {
                page: 1,
                Ue: 100,
                Dd: 100,
                Rf: 4,
                PJ: "pg",
                update: q
            };
            c || (c = a);
            for (var e in c) "undefined" != typeof c[e] && (this[e] = c[e]);
            this.va()
        }
    }
    z.extend(ud.prototype, {
        va: function () {
            this.qa()
        },
        qa: function () {
            this.vV();
            this.Va.innerHTML = this.SV()
        },
        vV: function () {
            isNaN(parseInt(this.page)) && (this.page = 1);
            isNaN(parseInt(this.Dd)) && (this.Dd = 1);
            1 > this.page && (this.page = 1);
            1 > this.Dd && (this.Dd = 1);
            this.page > this.Dd && (this.page = this.Dd);
            this.page = parseInt(this.page);
            this.Dd = parseInt(this.Dd)
        },
        T2: function () {
            location.search.match(RegExp("[?&]?" + this.PJ + "=([^&]*)[&$]?", "gi"));
            this.page = RegExp.$1
        },
        SV: function () {
            var a = [],
                b = this.page - 1,
                c = this.page + 1;
            a.push('<p style="margin:0;padding:0;white-space:nowrap">');
            if (!(1 > b)) {
                if (this.page >= this.Rf) {
                    var e;
                    a.push(
                        '<span style="margin-right:3px"><a style="color:#7777cc" href="javascript:void(0)" onclick="{temp1}">\u9996\u9875</a></span>'
                        .replace("{temp1}", "BMap.I('" + this.aa + "').toPage(1);"))
                }
                a.push(
                    '<span style="margin-right:3px"><a style="color:#7777cc" href="javascript:void(0)" onclick="{temp2}">\u4e0a\u4e00\u9875</a></span>'
                    .replace("{temp2}", "BMap.I('" + this.aa + "').toPage(" + b + ");"))
            }
            if (this.page < this.Rf) e = 0 == this.page % this.Rf ? this.page - this.Rf - 1 : this.page - this.page %
                    this.Rf + 1, b = e + this.Rf - 1;
            else {
                e = Math.floor(this.Rf / 2);
                var f = this.Rf % 2 - 1,
                    b = this.Dd > this.page + e ? this.page + e : this.Dd;
                e = this.page - e - f
            }
            this.page > this.Dd - this.Rf && this.page >= this.Rf && (e = this.Dd - this.Rf + 1, b = this.Dd);
            for (f = e; f <= b; f++) 0 < f && (f == this.page ? a.push('<span style="margin-right:3px">' + f +
                    "</span>") : 1 <= f && f <= this.Dd && (e =
                    '<span><a style="color:#7777cc;margin-right:3px" href="javascript:void(0)" onclick="{temp3}">[' + f +
                    "]</a></span>", a.push(e.replace("{temp3}", "BMap.I('" + this.aa + "').toPage(" + f + ");"))));
            c > this.Dd || a.push(
                '<span><a style="color:#7777cc" href="javascript:void(0)" onclick="{temp4}">\u4e0b\u4e00\u9875</a></span>'
                .replace("{temp4}", "BMap.I('" + this.aa + "').toPage(" + c + ");"));
            a.push("</p>");
            return a.join("")
        },
        toPage: function (a) {
            a = a ? a : 1;
            "function" == typeof this.YJ && (this.YJ(a), this.page = a);
            this.update && this.va()
        }
    });

    function cb(a, b) {
        W.call(this, a, b);
        b = b || {};
        b.renderOptions = b.renderOptions || {};
        this.Fp(b.pageCapacity);
        "undefined" != typeof b.renderOptions.selectFirstResult && !b.renderOptions.selectFirstResult ? this.HC() :
            this.bD();
        this.ya = [];
        this.qf = [];
        this.lb = -1;
        this.Pa = [];
        var c = this;
        K.load("local", function () {
            c.Bz()
        }, q)
    }
    z.ta(cb, W, "LocalSearch");
    cb.Xp = 10;
    cb.B0 = 1;
    cb.vn = 100;
    cb.fG = 2E3;
    cb.nG = 1E5;
    z.extend(cb.prototype, {
        search: function (a, b) {
            this.Pa.push({
                method: "search",
                arguments: [a, b]
            })
        },
        Tm: function (a, b, c) {
            this.Pa.push({
                method: "searchInBounds",
                arguments: [a, b, c]
            })
        },
        Bp: function (a, b, c, e) {
            this.Pa.push({
                method: "searchNearby",
                arguments: [a, b, c, e]
            })
        },
        Ke: function () {
            delete this.Ia;
            delete this.Fe;
            delete this.ha;
            delete this.ua;
            this.lb = -1;
            this.Ta();
            this.j.la.Ma && (this.j.la.Ma.innerHTML = "")
        },
        rm: u(),
        bD: function () {
            this.j.la.Kt = q
        },
        HC: function () {
            this.j.la.Kt = t
        },
        Fp: function (a) {
            this.j.Ak = "number" == typeof a && !isNaN(a) ? 1 > a ? cb.Xp : a > cb.vn ? cb.Xp : a : cb.Xp
        },
        kf: function () {
            return this.j.Ak
        },
        toString: ca("LocalSearch")
    });
    var vd = cb.prototype;
    T(vd, {
        clearResults: vd.Ke,
        setPageCapacity: vd.Fp,
        getPageCapacity: vd.kf,
        gotoPage: vd.rm,
        searchNearby: vd.Bp,
        searchInBounds: vd.Tm,
        search: vd.search,
        enableFirstResultSelection: vd.bD,
        disableFirstResultSelection: vd.HC
    });

    function wd(a, b) {
        W.call(this, a, b)
    }
    z.ta(wd, W, "BaseRoute");
    z.extend(wd.prototype, {
        Ke: u()
    });

    function xd(a, b) {
        W.call(this, a, b);
        b = b || {};
        this.St(b.policy);
        this.UN(b.intercityPolicy);
        this.cO(b.transitTypePolicy);
        this.Fp(b.pageCapacity);
        this.zb = md;
        this.dq = dd;
        this.ya = [];
        this.lb = -1;
        this.j.Nn = b.enableTraffic || t;
        this.Pa = [];
        var c = this;
        K.load("route", function () {
            c.Kd()
        })
    }
    xd.vn = 100;
    xd.jP = [0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1];
    xd.kP = [0, 3, 4, 0, 0, 0, 5];
    z.ta(xd, wd, "TransitRoute");
    z.extend(xd.prototype, {
        St: function (a) {
            this.j.be = 0 <= a && 5 >= a ? a : 0
        },
        UN: function (a) {
            this.j.ym = 0 <= a && 2 >= a ? a : 0
        },
        cO: function (a) {
            this.j.gn = 0 <= a && 2 >= a ? a : 0
        },
        BA: function (a, b) {
            this.Pa.push({
                method: "_internalSearch",
                arguments: [a, b]
            })
        },
        search: function (a, b) {
            this.Pa.push({
                method: "search",
                arguments: [a, b]
            })
        },
        Fp: function (a) {
            if ("string" === typeof a && (a = parseInt(a, 10), isNaN(a))) {
                this.j.Ak = xd.vn;
                return
            }
            this.j.Ak = "number" !== typeof a ? xd.vn : 1 <= a && a <= xd.vn ? Math.round(a) : xd.vn
        },
        toString: ca("TransitRoute"),
        p1: function (a) {
            return a.replace(/\(.*\)/, "")
        }
    });
    var yd = xd.prototype;
    T(yd, {
        _internalSearch: yd.BA
    });

    function zd(a, b) {
        W.call(this, a, b);
        this.ya = [];
        this.lb = -1;
        this.Pa = [];
        var c = this,
            e = this.j.la;
        1 !== e.at && 2 !== e.at && (e.at = 1);
        this.Yu = this.j.la.Wb ? q : t;
        K.load("route", function () {
            c.Kd()
        });
        this.hE && this.hE()
    }
    zd.yP =
        " \u73af\u5c9b \u65e0\u5c5e\u6027\u9053\u8def \u4e3b\u8def \u9ad8\u901f\u8fde\u63a5\u8def \u4ea4\u53c9\u70b9\u5185\u8def\u6bb5 \u8fde\u63a5\u9053\u8def \u505c\u8f66\u573a\u5185\u90e8\u9053\u8def \u670d\u52a1\u533a\u5185\u90e8\u9053\u8def \u6865 \u6b65\u884c\u8857 \u8f85\u8def \u531d\u9053 \u5168\u5c01\u95ed\u9053\u8def \u672a\u5b9a\u4e49\u4ea4\u901a\u533a\u57df POI\u8fde\u63a5\u8def \u96a7\u9053 \u6b65\u884c\u9053 \u516c\u4ea4\u4e13\u7528\u9053 \u63d0\u524d\u53f3\u8f6c\u9053"
        .split(" ");
    z.ta(zd, wd, "DWRoute");
    z.extend(zd.prototype, {
        search: function (a, b, c) {
            this.Pa.push({
                method: "search",
                arguments: [a, b, c]
            })
        }
    });

    function Ad(a, b) {
        zd.call(this, a, b);
        b = b || {};
        this.j.Nn = b.enableTraffic || t;
        this.St(b.policy);
        this.zb = nd;
        this.dq = jd
    }
    z.ta(Ad, zd, "DrivingRoute");
    Ad.prototype.St = function (a) {
        this.j.be = 0 <= a && 5 >= a ? a : 0
    };

    function Bd(a, b) {
        zd.call(this, a, b);
        this.zb = od;
        this.dq = id;
        this.Yu = t
    }
    z.ta(Bd, zd, "WalkingRoute");

    function Cd(a, b) {
        zd.call(this, a, b);
        this.zb = rd;
        this.dq = kd;
        this.Yu = t
    }
    z.ta(Cd, zd, "RidingRoute");

    function Dd(a, b) {
        z.lang.Ca.call(this);
        this.Pf = [];
        this.Bk = [];
        this.j = b;
        this.nj = a;
        this.map = this.j.la.map || s;
        this.NN = this.j.NN;
        this.yb = s;
        this.fk = 0;
        this.zF = "";
        this.hf = 1;
        this.hD = "";
        this.wp = [0, 0, 0, 0, 0, 0, 0];
        this.BM = [];
        this.fs = [1, 1, 1, 1, 1, 1, 1];
        this.xO = [1, 1, 1, 1, 1, 1, 1];
        this.xp = [0, 0, 0, 0, 0, 0, 0];
        this.Rm = [0, 0, 0, 0, 0, 0, 0];
        this.Hb = [{
                m: "",
                xd: 0,
                hn: 0,
                x: 0,
                y: 0,
                oa: -1
            }, {
                m: "",
                xd: 0,
                hn: 0,
                x: 0,
                y: 0,
                oa: -1
            }, {
                m: "",
                xd: 0,
                hn: 0,
                x: 0,
                y: 0,
                oa: -1
            }, {
                m: "",
                xd: 0,
                hn: 0,
                x: 0,
                y: 0,
                oa: -1
            }, {
                m: "",
                xd: 0,
                hn: 0,
                x: 0,
                y: 0,
                oa: -1
            }, {
                m: "",
                xd: 0,
                hn: 0,
                x: 0,
                y: 0,
                oa: -1
            }, {
                m: "",
                xd: 0,
                hn: 0,
                x: 0,
                y: 0,
                oa: -1
            }];
        this.Xh = -1;
        this.hu = [];
        this.IF = [];
        K.load("route", u())
    }
    z.lang.ta(Dd, z.lang.Ca, "RouteAddr");
    var Ed = navigator.userAgent;
    /ipad|iphone|ipod|iph/i.test(Ed);
    var Fd = /android/i.test(Ed);

    function Gd(a) {
        this.lh = a || {}
    }
    z.extend(Gd.prototype, {
        MN: function (a, b, c) {
            var e = this;
            K.load("route", function () {
                e.Kd(a, b, c)
            })
        }
    });

    function Hd(a) {
        this.j = {};
        z.extend(this.j, a);
        this.Pa = [];
        var b = this;
        K.load("othersearch", function () {
            b.Kd()
        })
    }
    z.ta(Hd, z.lang.Ca, "Geocoder");
    z.extend(Hd.prototype, {
        mm: function (a, b, c) {
            this.Pa.push({
                method: "getPoint",
                arguments: [a, b, c]
            })
        },
        im: function (a, b, c) {
            this.Pa.push({
                method: "getLocation",
                arguments: [a, b, c]
            })
        },
        toString: ca("Geocoder")
    });
    var Id = Hd.prototype;
    T(Id, {
        getPoint: Id.mm,
        getLocation: Id.im
    });

    function Geolocation(a) {
        a = a || {};
        this.K = {
            timeout: a.timeout || 1E4,
            maximumAge: a.maximumAge || 6E5,
            enableHighAccuracy: a.enableHighAccuracy || t,
            ui: a.SDKLocation || t
        };
        this.ie = [];
        var b = this;
        K.load("othersearch", function () {
            for (var a = 0, e; e = b.ie[a]; a++) b[e.method].apply(b, e.arguments)
        })
    }
    z.extend(Geolocation.prototype, {
        getCurrentPosition: function (a, b) {
            this.ie.push({
                method: "getCurrentPosition",
                arguments: arguments
            })
        },
        getStatus: function () {
            return fd
        },
        enableSDKLocation: function () {
            H() && (this.K.ui = q)
        },
        disableSDKLocation: function () {
            this.K.ui = t
        }
    });

    function Jd(a) {
        a = a || {};
        a.la = a.renderOptions || {};
        this.j = {
            la: {
                map: a.la.map || s
            }
        };
        this.Pa = [];
        var b = this;
        K.load("othersearch", function () {
            b.Kd()
        })
    }
    z.ta(Jd, z.lang.Ca, "LocalCity");
    z.extend(Jd.prototype, {
        get: function (a) {
            this.Pa.push({
                method: "get",
                arguments: [a]
            })
        },
        toString: ca("LocalCity")
    });

    function Kd() {
        this.Pa = [];
        var a = this;
        K.load("othersearch", function () {
            a.Kd()
        })
    }
    z.ta(Kd, z.lang.Ca, "Boundary");
    z.extend(Kd.prototype, {
        get: function (a, b) {
            this.Pa.push({
                method: "get",
                arguments: [a, b]
            })
        },
        toString: ca("Boundary")
    });

    function Ld(a, b) {
        W.call(this, a, b);
        this.vP = pd;
        this.xP = sd;
        this.uP = qd;
        this.wP = td;
        this.Pa = [];
        var c = this;
        K.load("buslinesearch", function () {
            c.Kd()
        })
    }
    Ld.mv = G.pa + "iw_plus.gif";
    Ld.yS = G.pa + "iw_minus.gif";
    Ld.pU = G.pa + "stop_icon.png";
    z.ta(Ld, W);
    z.extend(Ld.prototype, {
        getBusList: function (a) {
            this.Pa.push({
                method: "getBusList",
                arguments: [a]
            })
        },
        getBusLine: function (a) {
            this.Pa.push({
                method: "getBusLine",
                arguments: [a]
            })
        },
        setGetBusListCompleteCallback: function (a) {
            this.j.gN = a || u()
        },
        setGetBusLineCompleteCallback: function (a) {
            this.j.fN = a || u()
        },
        setBusListHtmlSetCallback: function (a) {
            this.j.dN = a || u()
        },
        setBusLineHtmlSetCallback: function (a) {
            this.j.cN = a || u()
        },
        setPolylinesSetCallback: function (a) {
            this.j.JE = a || u()
        }
    });

    function Md(a) {
        W.call(this, a);
        a = a || {};
        this.qc = {
            input: a.input || s,
            VB: a.baseDom || s,
            types: a.types || [],
            ay: a.onSearchComplete || u()
        };
        this.td.src = a.location || "\u5168\u56fd";
        this.Qi = "";
        this.jg = s;
        this.TH = "";
        this.Gi();
        Ra(Ha);
        var b = this;
        K.load("autocomplete", function () {
            b.Kd()
        })
    }
    z.ta(Md, W, "Autocomplete");
    z.extend(Md.prototype, {
        Gi: u(),
        show: u(),
        U: u(),
        rF: function (a) {
            this.qc.types = a
        },
        Wm: function (a) {
            this.td.src = a
        },
        search: ba("Qi"),
        xy: ba("TH")
    });
    var Ta;

    function Oa(a, b) {
        function c() {
            f.j.visible ? ("inter" === f.De && f.j.haveBreakId && f.j.indoorExitControl === q ? z.D.show(f.uA) : z.D.U(
                f.uA), this.j.closeControl && this.uf && this.C && this.C.La() === this.B ? z.D.show(f.uf) : z.D.U(f.uf),
                this.j.forceCloseControl && z.D.show(f.uf)) : (z.D.U(f.uf), z.D.U(f.uA))
        }
        this.B = "string" == typeof a ? z.$(a) : a;
        this.aa = Nd++;
        this.j = {
            enableScrollWheelZoom: q,
            panoramaRenderer: "flash",
            swfSrc: B.pg("main_domain_nocdn", "res/swf/") + "APILoader.swf",
            visible: q,
            indoorExitControl: q,
            indoorFloorControl: t,
            linksControl: q,
            clickOnRoad: q,
            navigationControl: q,
            closeControl: q,
            indoorSceneSwitchControl: q,
            albumsControl: t,
            albumsControlOptions: {},
            copyrightControlOptions: {},
            forceCloseControl: t,
            haveBreakId: t
        };
        var b = b || {}, e;
        for (e in b) this.j[e] = b[e];
        b.closeControl === q && (this.j.forceCloseControl = q);
        b.useWebGL === t && Na(t);
        this.Da = {
            heading: 0,
            pitch: 0
        };
        this.Un = [];
        this.Jb = this.Ya = s;
        this.Tj = this.Vq();
        this.ya = [];
        this.Jc = 1;
        this.De = this.WS = this.al = "";
        this.Ce = {};
        this.Hf = s;
        this.Mg = [];
        this.rr = [];
        "cvsRender" == this.Tj || Na() ? (this.Lj = 90, this.Nj = -90) : "cssRender" == this.Tj && (this.Lj = 45, this.Nj = -
            45);
        this.vr = t;
        var f = this;
        this.Vn = function () {
            this.Tj === "flashRender" ? K.load("panoramaflash", function () {
                f.Gi()
            }, q) : K.load("panorama", function () {
                f.hb()
            }, q);
            b.Kf == "api" ? Ra(Da) : Ra(Ea);
            this.Vn = u()
        };
        this.j.JS !== q && (this.Vn(), B.wn("cus.fire", "count", "z_loadpanoramacount"));
        this.zT(this.B);
        this.addEventListener("id_changed", function () {
            Ra(Ca, {
                from: b.Kf
            })
        });
        this.PP();
        this.addEventListener("indoorexit_options_changed", c);
        this.addEventListener("scene_type_changed", c);
        this.addEventListener("onclose_options_changed", c);
        this.addEventListener("onvisible_changed", c)
    }
    var Od = 4,
        Pd = 1,
        Nd = 0;
    z.lang.ta(Oa, z.lang.Ca, "Panorama");
    z.extend(Oa.prototype, {
        PP: function () {
            var a = this,
                b = this.uf = L("div");
            b.className = "pano_close";
            b.style.cssText = "z-index: 1201;display: none";
            b.title = "\u9000\u51fa\u5168\u666f";
            b.onclick = function () {
                a.U()
            };
            this.B.appendChild(b);
            var c = this.uA = L("a");
            c.className = "pano_pc_indoor_exit";
            c.style.cssText = "z-index: 1201;display: none";
            c.innerHTML = '<span style="float:right;margin-right:12px;">\u51fa\u53e3</span>';
            c.title = "\u9000\u51fa\u5ba4\u5185\u666f";
            c.onclick = function () {
                a.No()
            };
            this.B.appendChild(c);
            window.ActiveXObject && !document.addEventListener && (b.style.backgroundColor = "rgb(37,37,37)", c.style.backgroundColor =
                "rgb(37,37,37)")
        },
        No: u(),
        zT: function (a) {
            var b, c;
            b = a.style;
            c = Va(a).position;
            "absolute" != c && "relative" != c && (b.position = "relative", b.zIndex = 0);
            if ("absolute" === c || "relative" === c) if (a = Va(a).zIndex, !a || "auto" === a) b.zIndex = 0
        },
        lX: w("Un"),
        Xb: w("Ya"),
        NX: w("Vv"),
        bO: w("Vv"),
        ga: w("Jb"),
        Ea: w("Da"),
        fa: w("Jc"),
        dj: w("al"),
        V2: function () {
            return this.k1 || []
        },
        Q2: w("WS"),
        Ws: w("De"),
        zy: function (a) {
            a !== this.De && (this.De = a, this.dispatchEvent(new P("onscene_type_changed")))
        },
        tc: function (a, b, c) {
            "object" === typeof b && (c = b, b = l);
            a != this.Ya && (this.ll = this.Ya, this.ml = this.Jb, this.Ya = a, this.De = b || "street", this.Jb = s, c &&
                c.pov && this.Mc(c.pov))
        },
        sa: function (a) {
            a.ob(this.Jb) || (this.ll = this.Ya, this.ml = this.Jb, this.Jb = a, this.Ya = s)
        },
        Mc: function (a) {
            a && (this.Da = a, a = this.Da.pitch, a > this.Lj ? a = this.Lj : a < this.Nj && (a = this.Nj), this.vr = q,
                this.Da.pitch = a)
        },
        b_: function (a, b) {
            this.Nj = 0 <= a ? 0 : a;
            this.Lj = 0 >= b ? 0 : b
        },
        Nc: function (a) {
            a != this.Jc && (a > Od && (a = Od), a < Pd && (a = Pd), a != this.Jc && (this.Jc = a), "cssRender" ===
                this.Tj && this.Mc(this.Da))
        },
        uB: function () {
            if (this.C) for (var a = this.C.tx(), b = 0; b < a.length; b++)(a[b] instanceof U || a[b] instanceof tc) &&
                        a[b].point && this.ya.push(a[b])
        },
        nF: ba("C"),
        Rt: function (a) {
            this.Hf = a || "none"
        },
        Hk: function (a) {
            for (var b in a) {
                if ("object" == typeof a[b]) for (var c in a[b]) this.j[b][c] = a[b][c];
                else this.j[b] = a[b];
                a.closeControl === q && (this.j.forceCloseControl = q);
                a.closeControl === t && (this.j.forceCloseControl = t);
                switch (b) {
                case "linksControl":
                    this.dispatchEvent(new P("onlinks_visible_changed"));
                    break;
                case "clickOnRoad":
                    this.dispatchEvent(new P("onclickonroad_changed"));
                    break;
                case "navigationControl":
                    this.dispatchEvent(new P("onnavigation_visible_changed"));
                    break;
                case "indoorSceneSwitchControl":
                    this.dispatchEvent(new P("onindoor_default_switch_mode_changed"));
                    break;
                case "albumsControl":
                    this.dispatchEvent(new P("onalbums_visible_changed"));
                    break;
                case "albumsControlOptions":
                    this.dispatchEvent(new P("onalbums_options_changed"));
                    break;
                case "copyrightControlOptions":
                    this.dispatchEvent(new P("oncopyright_options_changed"));
                    break;
                case "closeControl":
                    this.dispatchEvent(new P("onclose_options_changed"));
                    break;
                case "indoorExitControl":
                    this.dispatchEvent(new P("onindoorexit_options_changed"));
                    break;
                case "indoorFloorControl":
                    this.dispatchEvent(new P("onindoorfloor_options_changed"))
                }
            }
        },
        uk: function () {
            this.ul.style.visibility = "hidden"
        },
        Dy: function () {
            this.ul.style.visibility = "visible"
        },
        zW: function () {
            this.j.enableScrollWheelZoom = q
        },
        jW: function () {
            this.j.enableScrollWheelZoom = t
        },
        show: function () {
            this.j.visible = q
        },
        U: function () {
            this.j.visible = t
        },
        Vq: function () {
            return Ua() && !H() && "javascript" != this.j.panoramaRenderer ? "flashRender" : !H() && Nb() ? "cvsRender" :
                "cssRender"
        },
        Ga: function (a) {
            this.Ce[a.fd] = a
        },
        Qb: function (a) {
            delete this.Ce[a]
        },
        YD: function () {
            return this.j.visible
        },
        $g: function () {
            return new O(this.B.clientWidth, this.B.clientHeight)
        },
        La: w("B"),
        eL: function () {
            var a = B.pg("baidumap", "?"),
                b = this.Xb();
            if (b) {
                var b = {
                    panotype: this.Ws(),
                    heading: this.Ea().heading,
                    pitch: this.Ea().pitch,
                    pid: b,
                    panoid: b,
                    from: "api"
                }, c;
                for (c in b) a += c + "=" + b[c] + "&"
            }
            return a.slice(0, -1)
        },
        Bx: function () {
            this.Hk({
                copyrightControlOptions: {
                    logoVisible: t
                }
            })
        },
        uF: function () {
            this.Hk({
                copyrightControlOptions: {
                    logoVisible: q
                }
            })
        },
        PB: function (a) {
            function b(a, b) {
                return function () {
                    a.rr.push({
                        PM: b,
                        OM: arguments
                    })
                }
            }
            for (var c = a.getPanoMethodList(), e = "", f = 0, g = c.length; f < g; f++) e = c[f], this[e] = b(this, e);
            this.Mg.push(a)
        },
        ZE: function (a) {
            for (var b = this.Mg.length; b--;) this.Mg[b] === a && this.Mg.splice(b, 1)
        },
        mF: u()
    });
    var Qd = Oa.prototype;
    T(Qd, {
        setId: Qd.tc,
        setPosition: Qd.sa,
        setPov: Qd.Mc,
        setZoom: Qd.Nc,
        setOptions: Qd.Hk,
        getId: Qd.Xb,
        getPosition: Qd.ga,
        getPov: Qd.Ea,
        getZoom: Qd.fa,
        getLinks: Qd.lX,
        getBaiduMapUrl: Qd.eL,
        hideMapLogo: Qd.Bx,
        showMapLogo: Qd.uF,
        enableDoubleClickZoom: Qd.j2,
        disableDoubleClickZoom: Qd.X1,
        enableScrollWheelZoom: Qd.zW,
        disableScrollWheelZoom: Qd.jW,
        show: Qd.show,
        hide: Qd.U,
        addPlugin: Qd.PB,
        removePlugin: Qd.ZE,
        getVisible: Qd.YD,
        addOverlay: Qd.Ga,
        removeOverlay: Qd.Qb,
        getSceneType: Qd.Ws,
        setPanoramaPOIType: Qd.Rt,
        exitInter: Qd.No,
        setInteractiveState: Qd.mF
    });
    T(window, {
        BMAP_PANORAMA_POI_HOTEL: "hotel",
        BMAP_PANORAMA_POI_CATERING: "catering",
        BMAP_PANORAMA_POI_MOVIE: "movie",
        BMAP_PANORAMA_POI_TRANSIT: "transit",
        BMAP_PANORAMA_POI_INDOOR_SCENE: "indoor_scene",
        BMAP_PANORAMA_POI_NONE: "none",
        BMAP_PANORAMA_INDOOR_SCENE: "inter",
        BMAP_PANORAMA_STREET_SCENE: "street"
    });

    function Rd() {
        z.lang.Ca.call(this);
        this.fd = "PanoramaOverlay_" + this.aa;
        this.P = s;
        this.Qa = q
    }
    z.lang.ta(Rd, z.lang.Ca, "PanoramaOverlayBase");
    z.extend(Rd.prototype, {
        R2: w("fd"),
        qa: function () {
            aa("initialize\u65b9\u6cd5\u672a\u5b9e\u73b0")
        },
        remove: function () {
            aa("remove\u65b9\u6cd5\u672a\u5b9e\u73b0")
        },
        Gf: function () {
            aa("_setOverlayProperty\u65b9\u6cd5\u672a\u5b9e\u73b0")
        }
    });

    function Sd(a, b) {
        Rd.call(this);
        var c = {
            position: s,
            altitude: 2,
            displayDistance: q
        }, b = b || {}, e;
        for (e in b) c[e] = b[e];
        this.Jb = c.position;
        this.Aj = a;
        this.oq = c.altitude;
        this.aR = c.displayDistance;
        this.BF = c.color;
        this.QL = c.hoverColor;
        this.backgroundColor = c.backgroundColor;
        this.RJ = c.backgroundHoverColor;
        this.borderColor = c.borderColor;
        this.WJ = c.borderHoverColor;
        this.fontSize = c.fontSize;
        this.padding = c.padding;
        this.cE = c.imageUrl;
        this.size = c.size;
        this.pe = c.image;
        this.width = c.width;
        this.height = c.height;
        this.dY = c.imageData;
        this.borderWidth = c.borderWidth
    }
    z.lang.ta(Sd, Rd, "PanoramaLabel");
    z.extend(Sd.prototype, {
        w2: w("borderWidth"),
        getImageData: w("dY"),
        pm: w("BF"),
        L2: w("QL"),
        s2: w("backgroundColor"),
        t2: w("RJ"),
        u2: w("borderColor"),
        v2: w("WJ"),
        J2: w("fontSize"),
        S2: w("padding"),
        M2: w("cE"),
        tb: w("size"),
        kx: w("pe"),
        sa: function (a) {
            this.Jb = a;
            this.Gf("position", a)
        },
        ga: w("Jb"),
        $c: function (a) {
            this.Aj = a;
            this.Gf("content", a)
        },
        nk: w("Aj"),
        hF: function (a) {
            this.oq = a;
            this.Gf("altitude", a)
        },
        Qo: w("oq"),
        Ea: function () {
            var a = this.ga(),
                b = s,
                c = s;
            this.P && (c = this.P.ga());
            if (a && c) if (a.ob(c)) b = this.P.Ea();
                else {
                    b = {};
                    b.heading = Td(a.lng - c.lng, a.lat - c.lat) || 0;
                    var a = b,
                        c = this.Qo(),
                        e = this.Pn();
                    a.pitch = Math.round(180 * (Math.atan(c / e) / Math.PI)) || 0
                }
            return b
        },
        Pn: function () {
            var a = 0,
                b, c;
            this.P && (b = this.P.ga(), (c = this.ga()) && !c.ob(b) && (a = S.So(b, c)));
            return a
        },
        U: function () {
            aa("hide\u65b9\u6cd5\u672a\u5b9e\u73b0")
        },
        show: function () {
            aa("show\u65b9\u6cd5\u672a\u5b9e\u73b0")
        },
        Gf: u()
    });
    var Ud = Sd.prototype;
    T(Ud, {
        setPosition: Ud.sa,
        getPosition: Ud.ga,
        setContent: Ud.$c,
        getContent: Ud.nk,
        setAltitude: Ud.hF,
        getAltitude: Ud.Qo,
        getPov: Ud.Ea,
        show: Ud.show,
        hide: Ud.U
    });

    function Vd(a, b) {
        Rd.call(this);
        var c = {
            icon: "",
            title: "",
            panoInfo: s,
            altitude: 2
        }, b = b || {}, e;
        for (e in b) c[e] = b[e];
        this.Jb = a;
        this.OH = c.icon;
        this.kJ = c.title;
        this.oq = c.altitude;
        this.mT = c.panoInfo;
        this.Da = {
            heading: 0,
            pitch: 0
        }
    }
    z.lang.ta(Vd, Rd, "PanoramaMarker");
    z.extend(Vd.prototype, {
        sa: function (a) {
            this.Jb = a;
            this.Gf("position", a)
        },
        ga: w("Jb"),
        Cc: function (a) {
            this.kJ = a;
            this.Gf("title", a)
        },
        $o: w("kJ"),
        Rb: function (a) {
            this.OH = icon;
            this.Gf("icon", a)
        },
        To: w("OH"),
        hF: function (a) {
            this.oq = a;
            this.Gf("altitude", a)
        },
        Qo: w("oq"),
        ND: w("mT"),
        Ea: function () {
            var a = s;
            if (this.P) {
                var a = this.P.ga(),
                    b = this.ga(),
                    a = Td(b.lng - a.lng, b.lat - a.lat);
                isNaN(a) && (a = 0);
                a = {
                    heading: a,
                    pitch: 0
                }
            } else a = this.Da;
            return a
        },
        Gf: u()
    });
    var Wd = Vd.prototype;
    T(Wd, {
        setPosition: Wd.sa,
        getPosition: Wd.ga,
        setTitle: Wd.Cc,
        getTitle: Wd.$o,
        setAltitude: Wd.hF,
        getAltitude: Wd.Qo,
        getPanoInfo: Wd.ND,
        getIcon: Wd.To,
        setIcon: Wd.Rb,
        getPov: Wd.Ea
    });

    function Td(a, b) {
        var c = 0;
        if (0 !== a && 0 !== b) {
            var c = 180 * (Math.atan(a / b) / Math.PI),
                e = 0;
            0 < a && 0 > b && (e = 90);
            0 > a && 0 > b && (e = 180);
            0 > a && 0 < b && (e = 270);
            c = (c + 90) % 90 + e
        } else 0 === a ? c = 0 > b ? 180 : 0 : 0 === b && (c = 0 < a ? 90 : 270);
        return Math.round(c)
    }
    function Na(a) {
        if ("boolean" === typeof Xd) return Xd;
        if (a === t || !window.WebGLRenderingContext) return Xd = t;
        if (z.platform.Am) {
            a = 0;
            try {
                a = navigator.userAgent.split("Android ")[1].charAt(0)
            } catch (b) {}
            if (5 > a) return Xd = t
        }
        var a = document.createElement("canvas"),
            c = s;
        try {
            c = a.getContext("webgl")
        } catch (e) {
            Xd = t
        }
        return Xd = c === s ? t : q
    }
    var Xd;

    function Yd() {
        if ("boolean" === typeof Zd) return Zd;
        Zd = q;
        if (z.platform.lE) return q;
        var a = navigator.userAgent;
        return -1 < a.indexOf("Chrome") || -1 < a.indexOf("SAMSUNG-GT-I9508") ? q : Zd = t
    }
    var Zd;

    function dc(a, b) {
        this.P = a || s;
        var c = this;
        c.P && c.ba();
        K.load("pservice", function () {
            c.tQ()
        });
        "api" == (b || {}).Kf ? Ra(Fa) : Ra(Ga);
        this.rd = {
            getPanoramaById: [],
            getPanoramaByLocation: [],
            getVisiblePOIs: [],
            getRecommendPanosById: [],
            getPanoramaVersions: [],
            checkPanoSupportByCityCode: [],
            getPanoramaByPOIId: [],
            getCopyrightProviders: []
        }
    }
    B.Lm(function (a) {
        "flashRender" !== a.Vq() && new dc(a, {
            Kf: "api"
        })
    });
    z.extend(dc.prototype, {
        ba: function () {
            function a(a) {
                if (a) {
                    if (a.id != b.Vv) {
                        b.bO(a.id);
                        b.ea = a;
                        Yd() || b.dispatchEvent(new P("onthumbnail_complete"));
                        b.Ya != s && (b.ml = b._position);
                        for (var c in a) if (a.hasOwnProperty(c)) switch (b["_" + c] = a[c], c) {
                                case "position":
                                    b.Jb = a[c];
                                    break;
                                case "id":
                                    b.Ya = a[c];
                                    break;
                                case "links":
                                    b.Un = a[c];
                                    break;
                                case "zoom":
                                    b.Jc = a[c]
                            }
                        if (b.ml) {
                            var g = b.ml,
                                i = b._position;
                            c = g.lat;
                            var k = i.lat,
                                m = Ob(k - c),
                                g = Ob(i.lng - g.lng);
                            c = Math.sin(m / 2) * Math.sin(m / 2) + Math.cos(Ob(c)) * Math.cos(Ob(k)) * Math.sin(g / 2) *
                                Math.sin(g / 2);
                            b.cH = 6371E3 * 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c))
                        }
                        c = new P("ondataload");
                        c.data = a;
                        b.dispatchEvent(c);
                        b.dispatchEvent(new P("onposition_changed"));
                        b.dispatchEvent(new P("onlinks_changed"));
                        b.dispatchEvent(new P("oncopyright_changed"), {
                            copyright: a.copyright
                        });
                        a.Tl && b.j.closeControl ? z.D.show(b.wR) : z.D.U(b.wR)
                    }
                } else b.Ya = b.ll, b.Jb = b.ml, b.dispatchEvent(new P("onnoresult"))
            }
            var b = this.P,
                c = this;
            b.addEventListener("id_changed", function () {
                c.Xo(b.Xb(), a)
            });
            b.addEventListener("iid_changed", function () {
                c.Ng(dc.Wk + "qt=idata&iid=" + b.qA + "&fn=", function (b) {
                    if (b && b.result && 0 == b.result.error) {
                        var b = b.content[0].interinfo,
                            f = {};
                        f.Tl = b.BreakID;
                        for (var g = b.Defaultfloor, i = s, k = 0; k < b.Floors.length; k++) if (b.Floors[k].Floor == g) {
                                i = b.Floors[k];
                                break
                            }
                        f.id = i.StartID || i.Points[0].PID;
                        c.Xo(f.id, a, f)
                    }
                })
            });
            b.addEventListener("position_changed_inner", function () {
                c.ej(b.ga(), a)
            })
        },
        Xo: function (a, b) {
            this.rd.getPanoramaById.push(arguments)
        },
        ej: function (a, b, c) {
            this.rd.getPanoramaByLocation.push(arguments)
        },
        ZD: function (a, b, c, e) {
            this.rd.getVisiblePOIs.push(arguments)
        },
        wx: function (a, b) {
            this.rd.getRecommendPanosById.push(arguments)
        },
        vx: function (a) {
            this.rd.getPanoramaVersions.push(arguments)
        },
        bC: function (a, b) {
            this.rd.checkPanoSupportByCityCode.push(arguments)
        },
        ux: function (a, b) {
            this.rd.getPanoramaByPOIId.push(arguments)
        },
        iL: function (a) {
            this.rd.getCopyrightProviders.push(arguments)
        }
    });
    var $d = dc.prototype;
    T($d, {
        getPanoramaById: $d.Xo,
        getPanoramaByLocation: $d.ej,
        getPanoramaByPOIId: $d.ux
    });

    function cc(a) {
        Jc.call(this);
        "api" == (a || {}).Kf ? Ra(Aa) : Ra(Ba)
    }
    cc.uG = B.pg("pano", "tile/");
    cc.prototype = new Jc;
    cc.prototype.getTilesUrl = function (a, b) {
        var c = cc.uG[(a.x + a.y) % cc.uG.length] + "?udt=20150114&qt=tile&styles=pl&x=" + a.x + "&y=" + a.y + "&z=" +
            b;
        z.ca.ia && 6 >= z.ca.ia && (c += "&color_dep=32");
        return c
    };
    cc.prototype.lt = ca(q);
    ae.Od = new S;

    function ae() {}
    z.extend(ae, {
        kW: function (a, b, c) {
            c = z.lang.Kc(c);
            b = {
                data: b
            };
            "position_changed" == a && (b.data = ae.Od.pj(new Q(b.data.mercatorX, b.data.mercatorY)));
            c.dispatchEvent(new P("on" + a), b)
        }
    });
    var be = ae;
    T(be, {
        dispatchFlashEvent: be.kW
    });
    var ce = {
        mP: 50
    };
    ce.Cu = B.pg("pano")[0];
    ce.Au = {
        width: 220,
        height: 60
    };
    z.extend(ce, {
        ZL: function (a, b, c, e) {
            if (!b || !c || !c.lngLat || !c.panoInstance) e();
            else {
                this.$n === l && (this.$n = new dc(s, {
                    Kf: "api"
                }));
                var f = this;
                this.$n.bC(b, function (b) {
                    b ? f.$n.ej(c.lngLat, ce.mP, function (b) {
                        if (b && b.id) {
                            var g = b.id,
                                m = b.mh,
                                b = b.nh,
                                n = dc.Od.fh(c.lngLat),
                                o = f.aS(n, {
                                    x: m,
                                    y: b
                                }),
                                m = f.uL(g, o, 0, ce.Au.width, ce.Au.height);
                            a.content = f.bS(a.content, m, c.titleTip, c.beforeDomId);
                            a.addEventListener("open", function () {
                                ia.M(z.Dc("infoWndPano"), "click", function () {
                                    c.panoInstance.tc(g);
                                    c.panoInstance.show();
                                    c.panoInstance.Mc({
                                        heading: o,
                                        pitch: 0
                                    })
                                })
                            })
                        }
                        e()
                    }) : e()
                })
            }
        },
        bS: function (a, b, c, e) {
            var c = c || "",
                f;
            !e || !a.split(e)[0] ? (e = a, a = "") : (e = a.split(e)[0], f = e.lastIndexOf("<"), e = a.substring(0, f),
                a = a.substring(f));
            f = [];
            var g = ce.Au.width,
                i = ce.Au.height;
            f.push(e);
            f.push("<div id='infoWndPano' class='panoInfoBox' style='height:" + i + "px;width:" + g +
                "px; margin-top: -19px;'>");
            f.push("<img class='pano_thumnail_img' width='" + g + "' height='" + i + "' border='0' alt='" + c +
                "\u5916\u666f' title='" + c + "\u5916\u666f' src='" + b +
                "' onerror='Pano.PanoEntranceUtil.thumbnailNotFound(this, " + g + ", " + i + ");' />");
            f.push("<div class='panoInfoBoxTitleBg' style='width:" + g +
                "px;'></div><a href='javascript:void(0)' class='panoInfoBoxTitleContent' >\u8fdb\u5165\u5168\u666f>></a>");
            f.push("</div>");
            f.push(a);
            return f.join("")
        },
        aS: function (a, b) {
            var c = 90 - 180 * Math.atan2(a.y - b.y, a.x - b.x) / Math.PI;
            0 > c && (c += 360);
            return c
        },
        uL: function (a, b, c, e, f) {
            var g = {
                panoId: a,
                panoHeading: b || 0,
                panoPitch: c || 0,
                width: e,
                height: f
            };
            return (ce.Cu +
                "?qt=pr3d&fovy=75&quality=80&panoid={panoId}&heading={panoHeading}&pitch={panoPitch}&width={width}&height={height}")
                .replace(/\{(.*?)\}/g, function (a, b) {
                return g[b]
            })
        }
    });
    var de = document,
        ee = Math,
        fe = de.createElement("div").style,
        ge;
    a: {
        for (var he = ["t", "webkitT", "MozT", "msT", "OT"], ie, je = 0, ke = he.length; je < ke; je++) if (ie = he[je] +
                "ransform", ie in fe) {
                ge = he[je].substr(0, he[je].length - 1);
                break a
            }
        ge = t
    }
    var le = ge ? "-" + ge.toLowerCase() + "-" : "",
        oe = ne("transform"),
        pe = ne("transitionProperty"),
        se = ne("transitionDuration"),
        te = ne("transformOrigin"),
        ue = ne("transitionTimingFunction"),
        ve = ne("transitionDelay"),
        Fd = /android/gi.test(navigator.appVersion),
        we = /iphone|ipad/gi.test(navigator.appVersion),
        xe = /hp-tablet/gi.test(navigator.appVersion),
        ye = ne("perspective") in fe,
        ze = "ontouchstart" in window && !xe,
        Ae = ge !== t,
        Be = ne("transition") in fe,
        Ce = "onorientationchange" in window ? "orientationchange" : "resize",
        De = ze ? "touchstart" : "mousedown",
        Ee = ze ? "touchmove" : "mousemove",
        Fe = ze ? "touchend" : "mouseup",
        Ge = ze ? "touchcancel" : "mouseup",
        He = ge === t ? t : {
            "": "transitionend",
            webkit: "webkitTransitionEnd",
            Moz: "transitionend",
            O: "otransitionend",
            ms: "MSTransitionEnd"
        }[ge],
        Ie = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window
            .oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
            return setTimeout(a, 1)
        }, Je = window.cancelRequestAnimationFrame || window.b5 || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window
            .oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout,
        Ke = ye ? " translateZ(0)" : "";

    function Le(a, b) {
        var c = this,
            e;
        c.ln = "object" == typeof a ? a : de.getElementById(a);
        c.ln.style.overflow = "hidden";
        c.Lb = c.ln.children[0];
        c.options = {
            dp: q,
            jn: q,
            x: 0,
            y: 0,
            yo: q,
            iV: t,
            Ux: q,
            zE: q,
            Pk: q,
            ri: t,
            G_: 0,
            Cw: t,
            yx: q,
            di: q,
            si: q,
            nD: Fd,
            Cx: we,
            IW: we && ye,
            eF: "",
            zoom: t,
            Rk: 1,
            Tp: 4,
            mW: 2,
            TO: "scroll",
            Zt: t,
            Gy: 1,
            jN: s,
            bN: function (a) {
                a.preventDefault()
            },
            mN: s,
            aN: s,
            lN: s,
            $M: s,
            $x: s,
            nN: s,
            eN: s,
            qp: s,
            oN: s,
            pp: s
        };
        for (e in b) c.options[e] = b[e];
        c.x = c.options.x;
        c.y = c.options.y;
        c.options.Pk = Ae && c.options.Pk;
        c.options.di = c.options.dp && c.options.di;
        c.options.si = c.options.jn && c.options.si;
        c.options.zoom = c.options.Pk && c.options.zoom;
        c.options.ri = Be && c.options.ri;
        c.options.zoom && Fd && (Ke = "");
        c.Lb.style[pe] = c.options.Pk ? le + "transform" : "top left";
        c.Lb.style[se] = "0";
        c.Lb.style[te] = "0 0";
        c.options.ri && (c.Lb.style[ue] = "cubic-bezier(0.33,0.66,0.66,1)");
        c.options.Pk ? c.Lb.style[oe] = "translate(" + c.x + "px," + c.y + "px)" + Ke : c.Lb.style.cssText +=
            ";position:absolute;top:" + c.y + "px;left:" + c.x + "px";
        c.options.ri && (c.options.nD = q);
        c.refresh();
        c.ba(Ce, window);
        c.ba(De);
        !ze && "none" != c.options.TO && (c.ba("DOMMouseScroll"), c.ba("mousewheel"));
        c.options.Cw && (c.uV = setInterval(function () {
            c.qQ()
        }, 500));
        this.options.yx && (Event.prototype.stopImmediatePropagation || (document.body.removeEventListener = function (
            a, b, c) {
            var e = Node.prototype.removeEventListener;
            a === "click" ? e.call(document.body, a, b.OL || b, c) : e.call(document.body, a, b, c)
        }, document.body.addEventListener = function (a, b, c) {
            var e = Node.prototype.addEventListener;
            a === "click" ? e.call(document.body, a, b.OL || (b.OL = function (a) {
                a.mZ || b(a)
            }), c) : e.call(document.body, a, b, c)
        }), c.ba("click", document.body, q))
    }
    Le.prototype = {
        enabled: q,
        x: 0,
        y: 0,
        qj: [],
        scale: 1,
        uC: 0,
        vC: 0,
        Qe: [],
        of: [],
        UB: s,
        Qy: 0,
        handleEvent: function (a) {
            switch (a.type) {
            case De:
                if (!ze && 0 !== a.button) break;
                this.Ov(a);
                break;
            case Ee:
                this.YS(a);
                break;
            case Fe:
            case Ge:
                this.Zu(a);
                break;
            case Ce:
                this.nB();
                break;
            case "DOMMouseScroll":
            case "mousewheel":
                this.CU(a);
                break;
            case He:
                this.yU(a);
                break;
            case "click":
                this.BQ(a)
            }
        },
        qQ: function () {
            !this.jh && (!this.Sk && !(this.Pl || this.wy == this.Lb.offsetWidth * this.scale && this.Ap == this.Lb.offsetHeight *
                this.scale)) && this.refresh()
        },
        Fv: function (a) {
            var b;
            this[a + "Scrollbar"] ? (this[a + "ScrollbarWrapper"] || (b = de.createElement("div"), this.options.eF ? b.className =
                this.options.eF + a.toUpperCase() : b.style.cssText = "position:absolute;z-index:100;" + ("h" == a ?
                "height:7px;bottom:1px;left:2px;right:" + (this.si ? "7" : "2") + "px" : "width:7px;bottom:" + (this.di ?
                "7" : "2") + "px;top:2px;right:1px"), b.style.cssText += ";pointer-events:none;" + le +
                "transition-property:opacity;" + le + "transition-duration:" + (this.options.IW ? "350ms" : "0") +
                ";overflow:hidden;opacity:" + (this.options.Cx ? "0" : "1"), this.ln.appendChild(b), this[a +
                "ScrollbarWrapper"] = b, b = de.createElement("div"), this.options.eF || (b.style.cssText =
                "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + le +
                "background-clip:padding-box;" + le + "box-sizing:border-box;" + ("h" == a ? "height:100%" :
                "width:100%") + ";" + le + "border-radius:3px;border-radius:3px"), b.style.cssText +=
                ";pointer-events:none;" + le + "transition-property:" + le + "transform;" + le +
                "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + le + "transition-duration:0;" + le +
                "transform: translate(0,0)" + Ke, this.options.ri && (b.style.cssText += ";" + le +
                "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), this[a + "ScrollbarWrapper"].appendChild(
                b), this[a + "ScrollbarIndicator"] = b), "h" == a ? (this.LL = this.ML.clientWidth, this.WX = ee.max(ee
                .round(this.LL * this.LL / this.wy), 8), this.VX.style.width = this.WX + "px") : (this.LO = this.MO.clientHeight,
                this.c0 = ee.max(ee.round(this.LO * this.LO / this.Ap), 8), this.b0.style.height = this.c0 + "px"),
                this.oB(a, q)) : this[a + "ScrollbarWrapper"] && (Ae && (this[a + "ScrollbarIndicator"].style[oe] = ""),
                this[a + "ScrollbarWrapper"].parentNode.removeChild(this[a + "ScrollbarWrapper"]), this[a +
                "ScrollbarWrapper"] = s, this[a + "ScrollbarIndicator"] = s)
        },
        nB: function () {
            var a = this;
            setTimeout(function () {
                a.refresh()
            }, Fd ? 200 : 0)
        },
        ur: function (a, b) {
            this.Sk || (a = this.dp ? a : 0, b = this.jn ? b : 0, this.options.Pk ? this.Lb.style[oe] = "translate(" +
                a + "px," + b + "px) scale(" + this.scale + ")" + Ke : (a = ee.round(a), b = ee.round(b), this.Lb.style
                .left = a + "px", this.Lb.style.top = b + "px"), this.x = a, this.y = b, this.oB("h"), this.oB("v"))
        },
        oB: function (a, b) {
            var c = "h" == a ? this.x : this.y;
            this[a + "Scrollbar"] && (c *= this[a + "ScrollbarProp"], 0 > c ? (this.options.nD || (c = this[a +
                "ScrollbarIndicatorSize"] + ee.round(3 * c), 8 > c && (c = 8), this[a + "ScrollbarIndicator"].style["h" ==
                a ? "width" : "height"] = c + "px"), c = 0) : c > this[a + "ScrollbarMaxScroll"] && (this.options.nD ?
                c = this[a + "ScrollbarMaxScroll"] : (c = this[a + "ScrollbarIndicatorSize"] - ee.round(3 * (c - this[a +
                "ScrollbarMaxScroll"])), 8 > c && (c = 8), this[a + "ScrollbarIndicator"].style["h" == a ? "width" :
                "height"] = c + "px", c = this[a + "ScrollbarMaxScroll"] + (this[a + "ScrollbarIndicatorSize"] - c))),
                this[a + "ScrollbarWrapper"].style[ve] = "0", this[a + "ScrollbarWrapper"].style.opacity = b && this.options
                .Cx ? "0" : "1", this[a + "ScrollbarIndicator"].style[oe] = "translate(" + ("h" == a ? c + "px,0)" :
                "0," + c + "px)") + Ke)
        },
        BQ: function (a) {
            if (a.xR === q) return this.MB = a.target, this.dx = Date.now(), q;
            if (this.MB && this.dx) {
                if (600 < Date.now() - this.dx) return this.dx = this.MB = s, q
            } else {
                for (var b = a.target; b != this.Lb && b != document.body;) b = b.parentNode;
                if (b == document.body) return q
            }
            for (b = a.target; 1 != b.nodeType;) b = b.parentNode;
            b = b.tagName.toLowerCase();
            if ("select" != b && "input" != b && "textarea" != b) return a.stopImmediatePropagation ? a.stopImmediatePropagation() :
                    a.mZ = q, a.stopPropagation(), a.preventDefault(), this.dx = this.MB = s, t
        },
        Ov: function (a) {
            var b = ze ? a.touches[0] : a,
                c, e;
            if (this.enabled) {
                this.options.bN && this.options.bN.call(this, a);
                (this.options.ri || this.options.zoom) && this.mJ(0);
                this.Sk = this.Pl = this.jh = t;
                this.EC = this.DC = this.gw = this.fw = this.KC = this.JC = 0;
                this.options.zoom && (ze && 1 < a.touches.length) && (e = ee.abs(a.touches[0].pageX - a.touches[1].pageX),
                    c = ee.abs(a.touches[0].pageY - a.touches[1].pageY), this.I_ = ee.sqrt(e * e + c * c), this.by = ee
                    .abs(a.touches[0].pageX + a.touches[1].pageX - 2 * this.PF) / 2 - this.x, this.dy = ee.abs(a.touches[
                    0].pageY + a.touches[1].pageY - 2 * this.QF) / 2 - this.y, this.options.qp && this.options.qp.call(
                    this, a));
                if (this.options.Ux && (this.options.Pk ? (c = getComputedStyle(this.Lb, s)[oe].replace(/[^0-9\-.,]/g,
                    "").split(","), e = +(c[12] || c[4]), c = +(c[13] || c[5])) : (e = +getComputedStyle(this.Lb, s).left
                    .replace(/[^0-9-]/g, ""), c = +getComputedStyle(this.Lb, s).top.replace(/[^0-9-]/g, "")), e != this
                    .x || c != this.y)) this.options.ri ? this.Sd(He) : Je(this.UB), this.qj = [], this.ur(e, c), this.options
                        .$x && this.options.$x.call(this);
                this.hw = this.x;
                this.jw = this.y;
                this.bu = this.x;
                this.cu = this.y;
                this.mh = b.pageX;
                this.nh = b.pageY;
                this.startTime = a.timeStamp || Date.now();
                this.options.mN && this.options.mN.call(this, a);
                this.ba(Ee, window);
                this.ba(Fe, window);
                this.ba(Ge, window)
            }
        },
        YS: function (a) {
            var b = ze ? a.touches[0] : a,
                c = b.pageX - this.mh,
                e = b.pageY - this.nh,
                f = this.x + c,
                g = this.y + e,
                i = a.timeStamp || Date.now();
            this.options.aN && this.options.aN.call(this, a);
            if (this.options.zoom && ze && 1 < a.touches.length) f = ee.abs(a.touches[0].pageX - a.touches[1].pageX), g =
                    ee.abs(a.touches[0].pageY - a.touches[1].pageY), this.H_ = ee.sqrt(f * f + g * g), this.Sk = q, b =
                    1 / this.I_ * this.H_ * this.scale, b < this.options.Rk ? b = 0.5 * this.options.Rk * Math.pow(2, b /
                    this.options.Rk) : b > this.options.Tp && (b = 2 * this.options.Tp * Math.pow(0.5, this.options.Tp /
                    b)), this.kp = b / this.scale, f = this.by - this.by * this.kp + this.x, g = this.dy - this.dy *
                    this.kp + this.y, this.Lb.style[oe] = "translate(" + f + "px," + g + "px) scale(" + b + ")" + Ke,
                    this.options.oN && this.options.oN.call(this, a);
            else {
                this.mh = b.pageX;
                this.nh = b.pageY;
                if (0 < f || f < this.ae) f = this.options.yo ? this.x + c / 2 : 0 <= f || 0 <= this.ae ? 0 : this.ae;
                if (g > this.mf || g < this.kd) g = this.options.yo ? this.y + e / 2 : g >= this.mf || 0 <= this.kd ?
                        this.mf : this.kd;
                this.JC += c;
                this.KC += e;
                this.fw = ee.abs(this.JC);
                this.gw = ee.abs(this.KC);
                6 > this.fw && 6 > this.gw || (this.options.zE && (this.fw > this.gw + 5 ? (g = this.y, e = 0) : this.gw >
                    this.fw + 5 && (f = this.x, c = 0)), this.jh = q, this.ur(f, g), this.DC = 0 < c ? -1 : 0 > c ? 1 :
                    0, this.EC = 0 < e ? -1 : 0 > e ? 1 : 0, 300 < i - this.startTime && (this.startTime = i, this.bu =
                    this.x, this.cu = this.y), this.options.lN && this.options.lN.call(this, a))
            }
        },
        Zu: function (a) {
            if (!(ze && 0 !== a.touches.length)) {
                var b = this,
                    c = ze ? a.changedTouches[0] : a,
                    e, f, g = {
                        Ba: 0,
                        time: 0
                    }, i = {
                        Ba: 0,
                        time: 0
                    }, k = (a.timeStamp || Date.now()) - b.startTime;
                e = b.x;
                f = b.y;
                b.Sd(Ee, window);
                b.Sd(Fe, window);
                b.Sd(Ge, window);
                b.options.$M && b.options.$M.call(b, a);
                if (b.Sk) e = b.scale * b.kp, e = Math.max(b.options.Rk, e), e = Math.min(b.options.Tp, e), b.kp = e /
                        b.scale, b.scale = e, b.x = b.by - b.by * b.kp + b.x, b.y = b.dy - b.dy * b.kp + b.y, b.Lb.style[
                        se] = "200ms", b.Lb.style[oe] = "translate(" + b.x + "px," + b.y + "px) scale(" + b.scale + ")" +
                        Ke, b.Sk = t, b.refresh(), b.options.pp && b.options.pp.call(b, a);
                else {
                    if (b.jh) {
                        if (300 > k && b.options.Ux) {
                            g = e ? b.iI(e - b.bu, k, -b.x, b.wy - b.ru + b.x, b.options.yo ? b.ru : 0) : g;
                            i = f ? b.iI(f - b.cu, k, -b.y, 0 > b.kd ? b.Ap - b.mn + b.y - b.mf : 0, b.options.yo ? b.mn :
                                0) : i;
                            e = b.x + g.Ba;
                            f = b.y + i.Ba;
                            if (0 < b.x && 0 < e || b.x < b.ae && e < b.ae) g = {
                                    Ba: 0,
                                    time: 0
                            };
                            if (b.y > b.mf && f > b.mf || b.y < b.kd && f < b.kd) i = {
                                    Ba: 0,
                                    time: 0
                            }
                        }
                        g.Ba || i.Ba ? (c = ee.max(ee.max(g.time, i.time), 10), b.options.Zt && (g = e - b.hw, i = f -
                            b.jw, ee.abs(g) < b.options.Gy && ee.abs(i) < b.options.Gy ? b.scrollTo(b.hw, b.jw, 200) :
                            (g = b.cJ(e, f), e = g.x, f = g.y, c = ee.max(g.time, c))), b.scrollTo(ee.round(e), ee.round(
                            f), c)) : b.options.Zt ? (g = e - b.hw, i = f - b.jw, ee.abs(g) < b.options.Gy && ee.abs(i) <
                            b.options.Gy ? b.scrollTo(b.hw, b.jw, 200) : (g = b.cJ(b.x, b.y), (g.x != b.x || g.y != b.y) &&
                            b.scrollTo(g.x, g.y, g.time))) : b.bo(200)
                    } else {
                        if (ze) if (b.BK && b.options.zoom) clearTimeout(b.BK), b.BK = s, b.options.qp && b.options.qp.call(
                                    b, a), b.zoom(b.mh, b.nh, 1 == b.scale ? b.options.mW : 1), b.options.pp &&
                                    setTimeout(function () {
                                    b.options.pp.call(b, a)
                                }, 200);
                            else if (this.options.yx) {
                            for (e = c.target; 1 != e.nodeType;) e = e.parentNode;
                            f = e.tagName.toLowerCase();
                            "select" != f && "input" != f && "textarea" != f ? (f = de.createEvent("MouseEvents"), f.initMouseEvent(
                                "click", q, q, a.view, 1, c.screenX, c.screenY, c.clientX, c.clientY, a.ctrlKey, a.altKey,
                                a.shiftKey, a.metaKey, 0, s), f.xR = q, e.dispatchEvent(f)) : e.focus()
                        }
                        b.bo(400)
                    }
                    b.options.nN && b.options.nN.call(b, a)
                }
            }
        },
        bo: function (a) {
            var b = 0 <= this.x ? 0 : this.x < this.ae ? this.ae : this.x,
                c = this.y >= this.mf || 0 < this.kd ? this.mf : this.y < this.kd ? this.kd : this.y;
            if (b == this.x && c == this.y) {
                if (this.jh && (this.jh = t, this.options.$x && this.options.$x.call(this)), this.di && this.options.Cx &&
                    ("webkit" == ge && (this.ML.style[ve] = "300ms"), this.ML.style.opacity = "0"), this.si && this.options
                    .Cx) "webkit" == ge && (this.MO.style[ve] = "300ms"), this.MO.style.opacity = "0"
            } else this.scrollTo(b, c, a || 0)
        },
        CU: function (a) {
            var b = this,
                c, e;
            if ("wheelDeltaX" in a) c = a.wheelDeltaX / 12, e = a.wheelDeltaY / 12;
            else if ("wheelDelta" in a) c = e = a.wheelDelta / 12;
            else if ("detail" in a) c = e = 3 * -a.detail;
            else return; if ("zoom" == b.options.TO) {
                if (e = b.scale * Math.pow(2, 1 / 3 * (e ? e / Math.abs(e) : 0)), e < b.options.Rk && (e = b.options.Rk),
                    e > b.options.Tp && (e = b.options.Tp), e != b.scale)!b.Qy && b.options.qp && b.options.qp.call(b,
                    a), b.Qy++, b.zoom(a.pageX, a.pageY, e, 400), setTimeout(function () {
                    b.Qy--;
                    !b.Qy && b.options.pp && b.options.pp.call(b, a)
                }, 400)
            } else c = b.x + c, e = b.y + e, 0 < c ? c = 0 : c < b.ae && (c = b.ae), e > b.mf ? e = b.mf : e < b.kd &&
                    (e = b.kd), 0 > b.kd && b.scrollTo(c, e, 0)
        },
        yU: function (a) {
            a.target == this.Lb && (this.Sd(He), this.AB())
        },
        AB: function () {
            var a = this,
                b = a.x,
                c = a.y,
                e = Date.now(),
                f, g, i;
            a.Pl || (a.qj.length ? (f = a.qj.shift(), f.x == b && f.y == c && (f.time = 0), a.Pl = q, a.jh = q, a.options
                .ri) ? (a.mJ(f.time), a.ur(f.x, f.y), a.Pl = t, f.time ? a.ba(He) : a.bo(0)) : (i = function () {
                var k = Date.now(),
                    m;
                if (k >= e + f.time) {
                    a.ur(f.x, f.y);
                    a.Pl = t;
                    a.options.VY && a.options.VY.call(a);
                    a.AB()
                } else {
                    k = (k - e) / f.time - 1;
                    g = ee.sqrt(1 - k * k);
                    k = (f.x - b) * g + b;
                    m = (f.y - c) * g + c;
                    a.ur(k, m);
                    if (a.Pl) a.UB = Ie(i)
                }
            }, i()) : a.bo(400))
        },
        mJ: function (a) {
            a += "ms";
            this.Lb.style[se] = a;
            this.di && (this.VX.style[se] = a);
            this.si && (this.b0.style[se] = a)
        },
        iI: function (a, b, c, e, f) {
            var b = ee.abs(a) / b,
                g = b * b / 0.0012;
            0 < a && g > c ? (c += f / (6 / (6.0E-4 * (g / b))), b = b * c / g, g = c) : 0 > a && g > e && (e += f / (6 /
                (6.0E-4 * (g / b))), b = b * e / g, g = e);
            return {
                Ba: g * (0 > a ? -1 : 1),
                time: ee.round(b / 6.0E-4)
            }
        },
        Pj: function (a) {
            for (var b = -a.offsetLeft, c = -a.offsetTop; a = a.offsetParent;) b -= a.offsetLeft, c -= a.offsetTop;
            a != this.ln && (b *= this.scale, c *= this.scale);
            return {
                left: b,
                top: c
            }
        },
        cJ: function (a, b) {
            var c, e, f;
            f = this.Qe.length - 1;
            c = 0;
            for (e = this.Qe.length; c < e; c++) if (a >= this.Qe[c]) {
                    f = c;
                    break
                }
            f == this.uC && (0 < f && 0 > this.DC) && f--;
            a = this.Qe[f];
            e = (e = ee.abs(a - this.Qe[this.uC])) ? 500 * (ee.abs(this.x - a) / e) : 0;
            this.uC = f;
            f = this.of.length - 1;
            for (c = 0; c < f; c++) if (b >= this.of[c]) {
                    f = c;
                    break
                }
            f == this.vC && (0 < f && 0 > this.EC) && f--;
            b = this.of[f];
            c = (c = ee.abs(b - this.of[this.vC])) ? 500 * (ee.abs(this.y - b) / c) : 0;
            this.vC = f;
            f = ee.round(ee.max(e, c)) || 200;
            return {
                x: a,
                y: b,
                time: f
            }
        },
        ba: function (a, b, c) {
            (b || this.Lb).addEventListener(a, this, !! c)
        },
        Sd: function (a, b, c) {
            (b || this.Lb).removeEventListener(a, this, !! c)
        },
        AC: ga(2),
        refresh: function () {
            var a, b, c, e = 0;
            b = 0;
            this.scale < this.options.Rk && (this.scale = this.options.Rk);
            this.ru = this.ln.clientWidth || 1;
            this.mn = this.ln.clientHeight || 1;
            this.mf = -this.options.G_ || 0;
            this.wy = ee.round(this.Lb.offsetWidth * this.scale);
            this.Ap = ee.round((this.Lb.offsetHeight + this.mf) * this.scale);
            this.ae = this.ru - this.wy;
            this.kd = this.mn - this.Ap + this.mf;
            this.EC = this.DC = 0;
            this.options.jN && this.options.jN.call(this);
            this.dp = this.options.dp && 0 > this.ae;
            this.jn = this.options.jn && (!this.options.iV && !this.dp || this.Ap > this.mn);
            this.di = this.dp && this.options.di;
            this.si = this.jn && this.options.si && this.Ap > this.mn;
            a = this.Pj(this.ln);
            this.PF = -a.left;
            this.QF = -a.top;
            if ("string" == typeof this.options.Zt) {
                this.Qe = [];
                this.of = [];
                c = this.Lb.querySelectorAll(this.options.Zt);
                a = 0;
                for (b = c.length; a < b; a++) e = this.Pj(c[a]), e.left += this.PF, e.top += this.QF, this.Qe[a] = e.left <
                        this.ae ? this.ae : e.left * this.scale, this.of[a] = e.top < this.kd ? this.kd : e.top * this.scale
            } else if (this.options.Zt) {
                for (this.Qe = []; e >= this.ae;) this.Qe[b] = e, e -= this.ru, b++;
                this.ae % this.ru && (this.Qe[this.Qe.length] = this.ae - this.Qe[this.Qe.length - 1] + this.Qe[this.Qe
                    .length - 1]);
                b = e = 0;
                for (this.of = []; e >= this.kd;) this.of[b] = e, e -= this.mn, b++;
                this.kd % this.mn && (this.of[this.of.length] = this.kd - this.of[this.of.length - 1] + this.of[this.of
                    .length - 1])
            }
            this.Fv("h");
            this.Fv("v");
            this.Sk || (this.Lb.style[se] = "0", this.bo(400))
        },
        scrollTo: function (a, b, c, e) {
            var f = a;
            this.stop();
            f.length || (f = [{
                    x: a,
                    y: b,
                    time: c,
                    oZ: e
                }]);
            a = 0;
            for (b = f.length; a < b; a++) f[a].oZ && (f[a].x = this.x - f[a].x, f[a].y = this.y - f[a].y), this.qj.push({
                    x: f[a].x,
                    y: f[a].y,
                    time: f[a].time || 0
                });
            this.AB()
        },
        disable: function () {
            this.stop();
            this.bo(0);
            this.enabled = t;
            this.Sd(Ee, window);
            this.Sd(Fe, window);
            this.Sd(Ge, window)
        },
        enable: function () {
            this.enabled = q
        },
        stop: function () {
            this.options.ri ? this.Sd(He) : Je(this.UB);
            this.qj = [];
            this.Pl = this.jh = t
        },
        zoom: function (a, b, c, e) {
            var f = c / this.scale;
            this.options.Pk && (this.Sk = q, e = e === l ? 200 : e, a = a - this.PF - this.x, b = b - this.QF - this.y,
                this.x = a - a * f + this.x, this.y = b - b * f + this.y, this.scale = c, this.refresh(), this.x = 0 <
                this.x ? 0 : this.x < this.ae ? this.ae : this.x, this.y = this.y > this.mf ? this.mf : this.y < this.kd ?
                this.kd : this.y, this.Lb.style[se] = e + "ms", this.Lb.style[oe] = "translate(" + this.x + "px," +
                this.y + "px) scale(" + c + ")" + Ke, this.Sk = t)
        }
    };

    function ne(a) {
        if ("" === ge) return a;
        a = a.charAt(0).toUpperCase() + a.substr(1);
        return ge + a
    }
    fe = s;

    function Me(a) {
        this.j = {
            anchor: Xb,
            offset: new O(0, 0),
            maxWidth: "100%",
            imageHeight: 80
        };
        var a = a || {}, b;
        for (b in a) this.j[b] = a[b];
        this.Cl = new dc(s, {
            Kf: "api"
        });
        this.Rj = [];
        this.P = s;
        this.ag = {
            height: this.j.imageHeight,
            width: this.j.imageHeight * Ne
        };
        this.Oc = this.pB = this.Tl = this.Xc = s
    }
    var Oe = [0, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 8, 8, 8, 9, 10],
        Pe =
            "\u5176\u4ed6 \u6b63\u95e8 \u623f\u578b \u8bbe\u65bd \u6b63\u95e8 \u9910\u996e\u8bbe\u65bd \u5176\u4ed6\u8bbe\u65bd \u6b63\u95e8 \u8bbe\u65bd \u89c2\u5f71\u5385 \u5176\u4ed6\u8bbe\u65bd"
            .split(" ");
    B.Lm(function (a) {
        var b = s;
        a.addEventListener("position_changed", function () {
            a.j.visible && a.j.albumsControl === q && (b ? b.oy(a.Xb()) : (b = new Me(a.j.albumsControlOptions), b.qa(a)))
        });
        a.addEventListener("albums_visible_changed", function () {
            a.j.albumsControl === q ? (b ? b.oy(a.Xb()) : (b = new Me(a.j.albumsControlOptions), b.qa(a)), b.show()) :
                b.U()
        });
        a.addEventListener("albums_options_changed", function () {
            b && b.Hk(a.j.albumsControlOptions)
        });
        a.addEventListener("visible_changed", function () {
            b && (a.YD() ? a.j.albumsControl === q && (b.B.style.visibility = "visible") : b.B.style.visibility =
                "hidden")
        })
    });
    var Ne = 1.8;
    H() && (Ne = 1);
    z.extend(Me.prototype, {
        Hk: function (a) {
            for (var b in a) this.j[b] = a[b];
            a = this.j.imageHeight + "px";
            this.rc(this.j.anchor);
            this.B.style.width = isNaN(Number(this.j.maxWidth)) === q ? this.j.maxWidth : this.j.maxWidth + "px";
            this.B.style.height = a;
            this.Wj.style.height = a;
            this.Nh.style.height = a;
            this.ag = {
                height: this.j.imageHeight,
                width: this.j.imageHeight * Ne
            };
            this.Vj.style.height = this.ag.height - 6 + "px";
            this.Vj.style.width = this.ag.width - 6 + "px";
            this.oy(this.P.Xb(), q)
        },
        qa: function (a) {
            this.P = a;
            this.ds();
            this.$P();
            this.kY();
            this.oy(a.Xb())
        },
        ds: function () {
            var a = this.j.imageHeight + "px";
            this.B = L("div");
            var b = this.B.style;
            b.cssText = "background:rgb(37,37,37);background:rgba(37,37,37,0.9);";
            b.position = "absolute";
            b.zIndex = "2000";
            b.width = isNaN(Number(this.j.maxWidth)) === q ? this.j.maxWidth : this.j.maxWidth + "px";
            b.padding = "8px 0";
            b.visibility = "hidden";
            b.height = a;
            this.Wj = L("div");
            b = this.Wj.style;
            b.position = "absolute";
            b.overflow = "hidden";
            b.width = "100%";
            b.height = a;
            this.Nh = L("div");
            b = this.Nh.style;
            b.height = a;
            this.Wj.appendChild(this.Nh);
            this.B.appendChild(this.Wj);
            this.P.B.appendChild(this.B);
            this.Vj = L("div", {
                "class": "pano_photo_item_seleted"
            });
            this.Vj.style.height = this.ag.height - 6 + "px";
            this.Vj.style.width = this.ag.width - 6 + "px";
            this.rc(this.j.anchor)
        },
        yH: function (a) {
            for (var b = this.Rj, c = b.length - 1; 0 <= c; c--) if (b[c].panoId == a) return c;
            return -1
        },
        oy: function (a, b) {
            if (b || !this.Rj[this.Xc] || !(this.Rj[this.Xc].panoId == a && 3 !== this.Rj[this.Xc].recoType)) {
                var c = this,
                    e = this.yH(a);
                !b && -1 !== e && this.Rj[e] && 3 !== this.Rj[e].recoType ? this.Ep(e) : this.AX(function (a) {
                    for (var b = {}, e, k, m = t, n = [], o = 0, p = a.length; o < p; o++) e = a[o].catlog, k = a[o].floor,
                            l !== e && ("" === e && l !== k ? (m = q, b[k] || (b[k] = []), b[k].push(a[o])) : (b[Oe[e]] ||
                            (b[Oe[e]] = []), b[Oe[e]].push(a[o])));
                    for (var v in b) m ? n.push({
                            data: v + "F",
                            index: v
                        }) : n.push({
                            data: Pe[v],
                            index: v
                        });
                    c.QG = b;
                    c.Ei = n;
                    c.zl(a);
                    0 == a.length ? c.U() : c.show()
                })
            }
        },
        TV: function () {
            if (!this.Bi) {
                var a = this.oX(this.Ei),
                    b = L("div");
                b.style.cssText = ["width:" + 134 * this.Ei.length + "px;",
                        "overflow:hidden;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;"].join("");
                b.innerHTML = a;
                a = L("div");
                a.appendChild(b);
                a.style.cssText =
                    "position:absolute;top:-25px;background:rgb(37,37,37);background:rgba(37,37,37,0.9);border-bottom:1px solid #4e596a;width:100%;line-height:25px;height:25px;overflow:scroll;outline:0";
                new Le(a, {
                    yo: t,
                    Ux: q,
                    di: t,
                    si: t,
                    jn: t,
                    zE: q,
                    Cw: q,
                    yx: q
                });
                this.B.appendChild(a);
                for (var c = this, e = b.getElementsByTagName("span"), f = 0, g = e.length; f < g; f++) b = e[f], z.M(b,
                        "click", function () {
                        if (this.getAttribute("dataindex")) {
                            c.zl(c.QG[this.getAttribute("dataindex")]);
                            for (var a = 0, b = e.length; a < b; a++) e[a].style.color = "#FFFFFF";
                            this.style.color = "#3383FF"
                        }
                    });
                this.Bi = a
            }
        },
        QV: function () {
            if (this.Bi) a = this.gL(this.Ei), this.pQ.innerHTML = a;
            else {
                var a = this.gL(this.Ei),
                    b = L("ul"),
                    c = this;
                b.style.cssText =
                    "list-style: none;padding:0px;margin:0px;display:block;width:60px;position:absolute;top:7px";
                b.innerHTML = a;
                z.M(b, "click", function (a) {
                    if (a = (a.srcElement || a.target).getAttribute("dataindex")) {
                        c.zl(c.QG[a]);
                        for (var e = b.getElementsByTagName("li"), f = 0, g = e.length; f < g; f++) e[f].childNodes[0].getAttribute(
                                "dataindex") === a ? z.D.Ua(e[f], "pano_catlogLiActive") : z.D.Pb(e[f],
                                "pano_catlogLiActive")
                    }
                });
                var a = L("div"),
                    e = L("a"),
                    f = L("span"),
                    g = L("a"),
                    i = L("span"),
                    k = ["background:url(" + G.pa + "panorama/catlog_icon.png) no-repeat;",
                            "display:block;width:10px;height:7px;margin:0 auto;"].join("");
                f.style.cssText = k + "background-position:-18px 0;";
                e.style.cssText = "background:#1C1C1C;display:block;position:absolute;width:58px;";
                i.style.cssText = k + "background-position:0 0;";
                g.style.cssText = "background:#1C1C1C;display:block;position:absolute;width:58px;";
                g.style.top = this.j.imageHeight - 7 + "px";
                a.style.cssText = "position:absolute;top:0px;left:0px;width:60px;";
                e.appendChild(f);
                g.appendChild(i);
                z.M(e, "mouseover", function () {
                    var a = parseInt(b.style.top, 10);
                    7 !== a && (f.style.backgroundPosition = "-27px 0");
                    new tb({
                        Gc: 60,
                        gc: ub.Cs,
                        duration: 300,
                        va: function (c) {
                            b.style.top = a + (7 - a) * c + "px"
                        }
                    })
                });
                z.M(e, "mouseout", function () {
                    f.style.backgroundPosition = "-18px 0"
                });
                z.M(g, "mouseover", function () {
                    var a = parseInt(b.style.top, 10),
                        e = c.j.imageHeight - 14;
                    if (!(parseInt(b.offsetHeight, 10) < e)) {
                        var f = e - parseInt(b.offsetHeight, 10) + 7;
                        f !== a && (i.style.backgroundPosition = "-9px 0");
                        new tb({
                            Gc: 60,
                            gc: ub.Cs,
                            duration: 300,
                            va: function (c) {
                                b.style.top = a + (f - a) * c + "px"
                            }
                        })
                    }
                });
                z.M(g, "mouseout", function () {
                    i.style.backgroundPosition = "0 0"
                });
                a.appendChild(e);
                a.appendChild(g);
                e = L("div");
                e.style.cssText = ["position:absolute;z-index:2001;left:20px;", "height:" + this.j.imageHeight + "px;",
                        "width:62px;overflow:hidden;background:rgb(37,37,37);background:rgba(37,37,37,0.9);"].join("");
                e.appendChild(b);
                e.appendChild(a);
                this.Bi = e;
                this.pQ = b;
                this.B.appendChild(e)
            }
        },
        RV: function () {
            if (this.Ei && !(0 >= this.Ei.length)) {
                var a = L("div");
                a.innerHTML = this.Wz;
                a.style.cssText = "position:absolute;background:#252525";
                this.B.appendChild(a);
                this.Fs = a;
                this.Oc.cg.style.left = this.ag.width + 8 + "px";
                this.Bi && (this.Bi.style.left = parseInt(this.Bi.style.left, 10) + this.ag.width + 8 + "px");
                var b = this;
                z.M(a, "click", function () {
                    b.P.tc(b.EW)
                })
            }
        },
        zl: function (a) {
            this.Rj = a;
            this.j.showCatalog && (0 < this.Ei.length ? (Ua() ? this.QV() : this.TV(), this.Oc.offsetLeft = 60) : (this
                .Fs && (this.B.removeChild(this.Fs), this.Fs = s, this.Oc.cg.style.left = "0px"), this.Bi && (this.B.removeChild(
                this.Bi), this.Bi = s), this.Oc.offsetLeft = 0));
            var b = this.iX(a);
            Ua() && (this.Ei && 0 < this.Ei.length && this.j.showExit && this.Wz) && (this.Oc.offsetLeft += this.ag.width +
                8, this.Fs ? this.Fs.innerHTML = this.Wz : this.RV());
            this.Nh.innerHTML = b;
            this.Nh.style.width = (this.ag.width + 8) * a.length + 8 + "px";
            a = this.B.offsetWidth;
            b = this.Nh.offsetWidth;
            this.Oc.Ms && (b += this.Oc.Ms());
            b < a - 2 * this.Oc.vi - this.Oc.offsetLeft ? this.B.style.width = b + this.Oc.offsetLeft + "px" : (this.B.style
                .width = isNaN(Number(this.j.maxWidth)) === q ? this.j.maxWidth : this.j.maxWidth + "px", b < this.B.offsetWidth -
                2 * this.Oc.vi - this.Oc.offsetLeft && (this.B.style.width = b + this.Oc.offsetLeft + "px"));
            this.Oc.refresh();
            this.pB = this.Nh.children;
            this.Nh.appendChild(this.Vj);
            this.Vj.style.left = "-100000px";
            a = this.yH(this.P.Xb(), this.o1); - 1 !== a && this.Ep(a)
        },
        oX: function (a) {
            for (var b = "", c, e = 0, f = a.length; e < f; e++) c =
                    '<div style="color:white;opacity:0.5;margin:0 35px;float:left;text-align: center"><span  dataIndex="' +
                    a[e].index + '">' + a[e].data + "</span></div>", b += c;
            return b
        },
        gL: function (a) {
            for (var b = "", c, e = 0, f = a.length; e < f; e++) c =
                    '<li class="pano_catlogLi"><span style="display:block;width:100%;" dataIndex="' + a[e].index + '">' +
                    a[e].data + "</span></li>", b += c;
            return b
        },
        iX: function (a) {
            for (var b, c, e, f, g = [], i = this.ag.height, k = this.ag.width, m = 0; m < a.length; m++) b = a[m],
                    recoType = b.recoType, e = b.panoId, f = b.name, c = b.heading, b = b.pitch, c = ce.uL(e, c, b, 198,
                    108), b = '<a href="javascript:void(0);" class="pano_photo_item" data-index="' + m +
                    '"><img style="width:' + (k - 2) + "px;height:" + (i - 2) + 'px;" data-index="' + m + '" name="' +
                    f + '" src="' + c + '" alt="' + f + '"/><span class="pano_photo_decs" data-index="' + m +
                    '" style="width:' + k + "px;font-size:" + Math.floor(i / 6) + "px; line-height:" + Math.floor(i / 6) +
                    'px;"><em class="pano_poi_' + recoType + '"></em>' + f + "</span></a>", 3 === recoType ? Ua() ? (
                    this.Wz = b, this.EW = e, a.splice(m, 1), m--) : (b =
                    '<a href="javascript:void(0);" class="pano_photo_item" data-index="' + m + '"><img style="width:' +
                    (k - 2) + "px;height:" + (i - 2) + 'px;" data-index="' + m + '" name="' + f + '" src="' + c +
                    '" alt="' + f +
                    '"/><div style="background:rgba(37,37,37,0.5);position:absolute;top:0px;left:0px;width:100%;height:100%;text-align: center;line-height:' +
                    this.j.imageHeight + 'px;" data-index="' + m + '"><img src="' + G.pa +
                    'panorama/photoexit.png" style="border:none;vertical-align:middle;" data-index="' + m +
                    '" alt=""/></div></a>', g.push(b)) : g.push(b);
            return g.join("")
        },
        AX: function (a) {
            var b = this,
                c = this.P.Xb();
            c && this.Cl.wx(c, function (e) {
                b.P.Xb() === c && a(e)
            })
        },
        rc: function (a) {
            if (!Wa(a) || isNaN(a) || a < Vb || 3 < a) a = this.defaultAnchor;
            var b = this.B,
                c = this.j.offset.width,
                e = this.j.offset.height;
            b.style.left = b.style.top = b.style.right = b.style.bottom = "auto";
            switch (a) {
            case Vb:
                b.style.top = e + "px";
                b.style.left = c + "px";
                break;
            case Wb:
                b.style.top = e + "px";
                b.style.right = c + "px";
                break;
            case Xb:
                b.style.bottom = e + "px";
                b.style.left = c + "px";
                break;
            case 3:
                b.style.bottom = e + "px", b.style.right = c + "px"
            }
        },
        $P: function () {
            this.YP()
        },
        YP: function () {
            var a = this;
            z.M(this.B, "touchstart", function (a) {
                a.stopPropagation()
            });
            z.M(this.Wj, "click", function (b) {
                if ((b = (b.srcElement || b.target).getAttribute("data-index")) && b != a.Xc) a.Ep(b), a.P.tc(a.Rj[b].panoId)
            });
            z.M(this.Nh, "mouseover", function (b) {
                b = (b.srcElement || b.target).getAttribute("data-index");
                b !== s && a.iK(b, q)
            });
            this.P.addEventListener("size_changed", function () {
                isNaN(Number(a.j.maxWidth)) && a.Hk({
                    maxWidth: a.j.maxWidth
                })
            })
        },
        Ep: function (a) {
            this.Vj.style.left = this.pB[a].offsetLeft + 8 + "px";
            this.Vj.setAttribute("data-index", this.pB[a].getAttribute("data-index"));
            this.Xc = a;
            this.iK(a)
        },
        iK: function (a, b) {
            var c = this.ag.width + 8,
                e = 0;
            this.Oc.Ms && (e = this.Oc.Ms() / 2);
            var f = this.Wj.offsetWidth - 2 * e,
                g = this.Nh.offsetLeft || this.Oc.x,
                g = g - e,
                i = -a * c;
            i > g && this.Oc.scrollTo(i + e);
            c = i - c;
            g -= f;
            c < g && (!b || b && 8 < i - g) && this.Oc.scrollTo(c + f + e)
        },
        kY: function () {
            this.Oc = H() ? new Le(this.Wj, {
                yo: t,
                Ux: q,
                di: t,
                si: t,
                jn: t,
                zE: q,
                Cw: q,
                yx: q
            }) : new Qe(this.Wj)
        },
        U: function () {
            this.B.style.visibility = "hidden"
        },
        show: function () {
            this.B.style.visibility = "visible"
        }
    });

    function Qe(a) {
        this.B = a;
        this.Pg = a.children[0];
        this.Jr = s;
        this.vi = 20;
        this.offsetLeft = 0;
        this.qa()
    }
    Qe.prototype = {
        qa: function () {
            this.Pg.style.position = "relative";
            this.refresh();
            this.ds();
            this.Rl()
        },
        refresh: function () {
            this.Yn = this.B.offsetWidth - this.Ms();
            this.PA = -(this.Pg.offsetWidth - this.Yn - this.vi);
            this.rv = this.vi + this.offsetLeft;
            this.Pg.style.left = this.rv + "px";
            this.Pg.children[0] && (this.Jr = this.Pg.children[0].offsetWidth);
            this.cg && (this.cg.children[0].style.marginTop = this.Br.children[0].style.marginTop = this.cg.offsetHeight /
                2 - this.cg.children[0].offsetHeight / 2 + "px")
        },
        Ms: function () {
            return 2 * this.vi
        },
        ds: function () {
            this.Gv = L("div");
            this.Gv.innerHTML =
                '<a class="pano_photo_arrow_l" style="background:rgb(37,37,37);background:rgba(37,37,37,0.9);" href="javascript:void(0)" title="\u4e0a\u4e00\u9875"><span class="pano_arrow_l"></span></a><a class="pano_photo_arrow_r" style="background:rgb(37,37,37);background:rgba(37,37,37,0.9);" href="javascript:void(0)" title="\u4e0b\u4e00\u9875"><span class="pano_arrow_r"></span></a>';
            this.cg = this.Gv.children[0];
            this.Br = this.Gv.children[1];
            this.B.appendChild(this.Gv);
            this.cg.children[0].style.marginTop = this.Br.children[0].style.marginTop = this.cg.offsetHeight / 2 - this
                .cg.children[0].offsetHeight / 2 + "px"
        },
        Rl: function () {
            var a = this;
            z.M(this.cg, "click", function () {
                a.scrollTo(a.Pg.offsetLeft + a.Yn)
            });
            z.M(this.Br, "click", function () {
                a.scrollTo(a.Pg.offsetLeft - a.Yn)
            })
        },
        zU: function () {
            z.D.Pb(this.cg, "pano_arrow_disable");
            z.D.Pb(this.Br, "pano_arrow_disable");
            var a = this.Pg.offsetLeft;
            a >= this.rv && z.D.Ua(this.cg, "pano_arrow_disable");
            a - this.Yn <= this.PA && z.D.Ua(this.Br, "pano_arrow_disable")
        },
        scrollTo: function (a) {
            a = a < this.Pg.offsetLeft ? Math.ceil((a - this.vi - this.Yn) / this.Jr) * this.Jr + this.Yn + this.vi - 8 :
                Math.ceil((a - this.vi) / this.Jr) * this.Jr + this.vi;
            a < this.PA ? a = this.PA : a > this.rv && (a = this.rv);
            var b = this.Pg.offsetLeft,
                c = this;
            new tb({
                Gc: 60,
                gc: ub.Cs,
                duration: 300,
                va: function (e) {
                    c.Pg.style.left = b + (a - b) * e + "px"
                },
                finish: function () {
                    c.zU()
                }
            })
        }
    };
    B.Map = Ka;
    B.Hotspot = ib;
    B.MapType = Wc;
    B.Point = I;
    B.Pixel = Q;
    B.Size = O;
    B.Bounds = fb;
    B.TileLayer = Jc;
    B.Projection = ic;
    B.MercatorProjection = S;
    B.PerspectiveProjection = hb;
    B.Copyright = function (a, b, c) {
        this.id = a;
        this.ab = b;
        this.content = c
    };
    B.Overlay = lc;
    B.Label = tc;
    B.GroundOverlay = uc;
    B.PointCollection = yc;
    B.Marker = U;
    B.CanvasLayer = Bc;
    B.Icon = pc;
    B.IconSequence = rc;
    B.Symbol = qc;
    B.Polyline = Fc;
    B.Polygon = Ec;
    B.InfoWindow = sc;
    B.Circle = Gc;
    B.Control = Ub;
    B.NavigationControl = jb;
    B.GeolocationControl = Yb;
    B.OverviewMapControl = lb;
    B.CopyrightControl = Zb;
    B.ScaleControl = kb;
    B.MapTypeControl = mb;
    B.CityListControl = $b;
    B.PanoramaControl = bc;
    B.TrafficLayer = Sc;
    B.CustomLayer = nb;
    B.ContextMenu = ec;
    B.MenuItem = hc;
    B.LocalSearch = cb;
    B.TransitRoute = xd;
    B.DrivingRoute = Ad;
    B.WalkingRoute = Bd;
    B.RidingRoute = Cd;
    B.Autocomplete = Md;
    B.RouteSearch = Gd;
    B.Geocoder = Hd;
    B.LocalCity = Jd;
    B.Geolocation = Geolocation;
    B.Convertor = kc;
    B.BusLineSearch = Ld;
    B.Boundary = Kd;
    B.VectorCloudLayer = Qc;
    B.VectorTrafficLayer = Rc;
    B.Panorama = Oa;
    B.PanoramaLabel = Sd;
    B.PanoramaService = dc;
    B.PanoramaCoverageLayer = cc;
    B.PanoramaFlashInterface = ae;

    function T(a, b) {
        for (var c in b) a[c] = b[c]
    }
    T(window, {
        BMap: B,
        _jsload2: function (a, b) {
            ia.Iy.uY && ia.Iy.set(a, b);
            K.tV(a, b)
        },
        BMAP_API_VERSION: "2.0"
    });
    var X = Ka.prototype;
    T(X, {
        getBounds: X.ne,
        getCenter: X.Ka,
        getMapType: X.na,
        getSize: X.tb,
        setSize: X.ue,
        getViewport: X.Ys,
        getZoom: X.fa,
        centerAndZoom: X.yd,
        panTo: X.li,
        panBy: X.ug,
        setCenter: X.Sf,
        setCurrentCity: X.kF,
        setMapType: X.xg,
        setViewport: X.uh,
        setZoom: X.Nc,
        highResolutionEnabled: X.Ex,
        zoomTo: X.Ag,
        zoomIn: X.RF,
        zoomOut: X.SF,
        addHotspot: X.ow,
        removeHotspot: X.qZ,
        clearHotspots: X.Vl,
        checkResize: X.wV,
        addControl: X.mw,
        removeControl: X.BN,
        getContainer: X.La,
        addContextMenu: X.qo,
        removeContextMenu: X.up,
        addOverlay: X.Ga,
        removeOverlay: X.Qb,
        clearOverlays: X.fK,
        openInfoWindow: X.nc,
        closeInfoWindow: X.Wc,
        pointToOverlayPixel: X.Re,
        overlayPixelToPoint: X.qN,
        getInfoWindow: X.bh,
        getOverlays: X.tx,
        getPanes: function () {
            return {
                floatPane: this.Qd.oD,
                markerMouseTarget: this.Qd.CE,
                floatShadow: this.Qd.ZK,
                labelPane: this.Qd.vE,
                markerPane: this.Qd.KM,
                markerShadow: this.Qd.LM,
                mapPane: this.Qd.ut,
                vertexPane: this.Qd.QO
            }
        },
        addTileLayer: X.Tg,
        removeTileLayer: X.qh,
        pixelToPoint: X.wb,
        pointToPixel: X.$b,
        setFeatureStyle: X.Dp,
        selectBaseElement: X.r4,
        setMapStyle: X.Pt,
        enable3DBuilding: X.Jo,
        disable3DBuilding: X.gW,
        getPanorama: X.km
    });
    var Re = Wc.prototype;
    T(Re, {
        getTileLayer: Re.LX,
        getMinZoom: Re.Uo,
        getMaxZoom: Re.jm,
        getProjection: Re.Zo,
        getTextColor: Re.pm,
        getTips: Re.Xs
    });
    T(window, {
        BMAP_NORMAL_MAP: La,
        BMAP_PERSPECTIVE_MAP: Qa,
        BMAP_SATELLITE_MAP: Ya,
        BMAP_HYBRID_MAP: Sa
    });
    var Se = S.prototype;
    T(Se, {
        lngLatToPoint: Se.fh,
        pointToLngLat: Se.pj
    });
    var Te = hb.prototype;
    T(Te, {
        lngLatToPoint: Te.fh,
        pointToLngLat: Te.pj
    });
    var Ue = fb.prototype;
    T(Ue, {
        equals: Ue.ob,
        containsPoint: Ue.bs,
        containsBounds: Ue.IV,
        intersects: Ue.ft,
        extend: Ue.extend,
        getCenter: Ue.Ka,
        isEmpty: Ue.mj,
        getSouthWest: Ue.Pe,
        getNorthEast: Ue.Lf,
        toSpan: Ue.FF
    });
    var Ve = lc.prototype;
    T(Ve, {
        isVisible: Ve.eh,
        show: Ve.show,
        hide: Ve.U
    });
    lc.getZIndex = lc.sk;
    var We = gb.prototype;
    T(We, {
        openInfoWindow: We.nc,
        closeInfoWindow: We.Wc,
        enableMassClear: We.$i,
        disableMassClear: We.iW,
        show: We.show,
        hide: We.U,
        getMap: We.ox,
        addContextMenu: We.qo,
        removeContextMenu: We.up
    });
    var Xe = U.prototype;
    T(Xe, {
        setIcon: Xe.Rb,
        getIcon: Xe.To,
        setPosition: Xe.sa,
        getPosition: Xe.ga,
        setOffset: Xe.Te,
        getOffset: Xe.Mf,
        getLabel: Xe.HD,
        setLabel: Xe.Vm,
        setTitle: Xe.Cc,
        setTop: Xe.pi,
        enableDragging: Xe.Wb,
        disableDragging: Xe.GC,
        setZIndex: Xe.Kp,
        getMap: Xe.ox,
        setAnimation: Xe.Um,
        setShadow: Xe.Ay,
        hide: Xe.U,
        setRotation: Xe.Gp,
        getRotation: Xe.yL
    });
    T(window, {
        BMAP_ANIMATION_DROP: 1,
        BMAP_ANIMATION_BOUNCE: 2
    });
    var Ye = tc.prototype;
    T(Ye, {
        setStyle: Ye.Fd,
        setStyles: Ye.oi,
        setContent: Ye.$c,
        setPosition: Ye.sa,
        getPosition: Ye.ga,
        setOffset: Ye.Te,
        getOffset: Ye.Mf,
        setTitle: Ye.Cc,
        setZIndex: Ye.Kp,
        getMap: Ye.ox,
        getContent: Ye.nk
    });
    var Ze = pc.prototype;
    T(Ze, {
        setImageUrl: Ze.SN,
        setSize: Ze.ue,
        setAnchor: Ze.rc,
        setImageOffset: Ze.Ot,
        setImageSize: Ze.SZ,
        setInfoWindowAnchor: Ze.VZ,
        setPrintImageUrl: Ze.e_
    });
    var $e = sc.prototype;
    T($e, {
        redraw: $e.de,
        setTitle: $e.Cc,
        setContent: $e.$c,
        getContent: $e.nk,
        getPosition: $e.ga,
        enableMaximize: $e.Yg,
        disableMaximize: $e.Ww,
        isOpen: $e.Wa,
        setMaxContent: $e.Qt,
        maximize: $e.Tx,
        enableAutoPan: $e.Ds
    });
    var af = nc.prototype;
    T(af, {
        getPath: af.Oe,
        setPath: af.ee,
        setPositionAt: af.Xm,
        getStrokeColor: af.GX,
        setStrokeWeight: af.Jp,
        getStrokeWeight: af.BL,
        setStrokeOpacity: af.Hp,
        getStrokeOpacity: af.HX,
        setFillOpacity: af.Nt,
        getFillOpacity: af.eX,
        setStrokeStyle: af.Ip,
        getStrokeStyle: af.AL,
        getFillColor: af.dX,
        getBounds: af.ne,
        enableEditing: af.gf,
        disableEditing: af.hW,
        getEditing: af.aX
    });
    var bf = Gc.prototype;
    T(bf, {
        setCenter: bf.Sf,
        getCenter: bf.Ka,
        getRadius: bf.wL,
        setRadius: bf.pf
    });
    var cf = Ec.prototype;
    T(cf, {
        getPath: cf.Oe,
        setPath: cf.ee,
        setPositionAt: cf.Xm
    });
    var df = ib.prototype;
    T(df, {
        getPosition: df.ga,
        setPosition: df.sa,
        getText: df.SD,
        setText: df.Tt
    });
    I.prototype.equals = I.prototype.ob;
    Q.prototype.equals = Q.prototype.ob;
    O.prototype.equals = O.prototype.ob;
    T(window, {
        BMAP_ANCHOR_TOP_LEFT: Vb,
        BMAP_ANCHOR_TOP_RIGHT: Wb,
        BMAP_ANCHOR_BOTTOM_LEFT: Xb,
        BMAP_ANCHOR_BOTTOM_RIGHT: 3
    });
    var ef = Ub.prototype;
    T(ef, {
        setAnchor: ef.rc,
        getAnchor: ef.uD,
        setOffset: ef.Te,
        getOffset: ef.Mf,
        show: ef.show,
        hide: ef.U,
        isVisible: ef.eh,
        toString: ef.toString
    });
    var ff = jb.prototype;
    T(ff, {
        getType: ff.bp,
        setType: ff.Ym
    });
    T(window, {
        BMAP_NAVIGATION_CONTROL_LARGE: 0,
        BMAP_NAVIGATION_CONTROL_SMALL: 1,
        BMAP_NAVIGATION_CONTROL_PAN: 2,
        BMAP_NAVIGATION_CONTROL_ZOOM: 3
    });
    var gf = lb.prototype;
    T(gf, {
        changeView: gf.ke,
        setSize: gf.ue,
        getSize: gf.tb
    });
    var hf = kb.prototype;
    T(hf, {
        getUnit: hf.QX,
        setUnit: hf.sF
    });
    T(window, {
        BMAP_UNIT_METRIC: "metric",
        BMAP_UNIT_IMPERIAL: "us"
    });
    var jf = Zb.prototype;
    T(jf, {
        addCopyright: jf.nw,
        removeCopyright: jf.YE,
        getCopyright: jf.gm,
        getCopyrightCollection: jf.BD
    });
    T(window, {
        BMAP_MAPTYPE_CONTROL_HORIZONTAL: ac,
        BMAP_MAPTYPE_CONTROL_DROPDOWN: 1,
        BMAP_MAPTYPE_CONTROL_MAP: 2
    });
    var kf = Jc.prototype;
    T(kf, {
        getMapType: kf.na,
        getCopyright: kf.gm,
        isTransparentPng: kf.lt
    });
    var lf = ec.prototype;
    T(lf, {
        addItem: lf.qw,
        addSeparator: lf.QB,
        removeSeparator: lf.$E
    });
    var mf = hc.prototype;
    T(mf, {
        setText: mf.Tt
    });
    var nf = W.prototype;
    T(nf, {
        getStatus: nf.nm,
        setSearchCompleteCallback: nf.qF,
        getPageCapacity: nf.kf,
        setPageCapacity: nf.Fp,
        setLocation: nf.Wm,
        disableFirstResultSelection: nf.HC,
        enableFirstResultSelection: nf.bD,
        gotoPage: nf.rm,
        searchNearby: nf.Bp,
        searchInBounds: nf.Tm,
        search: nf.search
    });
    T(window, {
        BMAP_STATUS_SUCCESS: 0,
        BMAP_STATUS_CITY_LIST: 1,
        BMAP_STATUS_UNKNOWN_LOCATION: fd,
        BMAP_STATUS_UNKNOWN_ROUTE: 3,
        BMAP_STATUS_INVALID_KEY: 4,
        BMAP_STATUS_INVALID_REQUEST: 5,
        BMAP_STATUS_PERMISSION_DENIED: gd,
        BMAP_STATUS_SERVICE_UNAVAILABLE: 7,
        BMAP_STATUS_TIMEOUT: hd
    });
    T(window, {
        BMAP_POI_TYPE_NORMAL: 0,
        BMAP_POI_TYPE_BUSSTOP: 1,
        BMAP_POI_TYPE_BUSLINE: 2,
        BMAP_POI_TYPE_SUBSTOP: 3,
        BMAP_POI_TYPE_SUBLINE: 4
    });
    T(window, {
        BMAP_TRANSIT_POLICY_RECOMMEND: 0,
        BMAP_TRANSIT_POLICY_LEAST_TIME: 4,
        BMAP_TRANSIT_POLICY_LEAST_TRANSFER: 1,
        BMAP_TRANSIT_POLICY_LEAST_WALKING: 2,
        BMAP_TRANSIT_POLICY_AVOID_SUBWAYS: 3,
        BMAP_TRANSIT_POLICY_FIRST_SUBWAYS: 5,
        BMAP_LINE_TYPE_BUS: 0,
        BMAP_LINE_TYPE_SUBWAY: 1,
        BMAP_LINE_TYPE_FERRY: 2,
        BMAP_LINE_TYPE_TRAIN: 3,
        BMAP_LINE_TYPE_AIRPLANE: 4,
        BMAP_LINE_TYPE_COACH: 5
    });
    T(window, {
        BMAP_TRANSIT_TYPE_POLICY_TRAIN: 0,
        BMAP_TRANSIT_TYPE_POLICY_AIRPLANE: 1,
        BMAP_TRANSIT_TYPE_POLICY_COACH: 2
    });
    T(window, {
        BMAP_INTERCITY_POLICY_LEAST_TIME: 0,
        BMAP_INTERCITY_POLICY_EARLY_START: 1,
        BMAP_INTERCITY_POLICY_CHEAP_PRICE: 2
    });
    T(window, {
        BMAP_TRANSIT_TYPE_IN_CITY: 0,
        BMAP_TRANSIT_TYPE_CROSS_CITY: 1
    });
    T(window, {
        BMAP_TRANSIT_PLAN_TYPE_ROUTE: 0,
        BMAP_TRANSIT_PLAN_TYPE_LINE: 1
    });
    var of = wd.prototype;
    T(of, {
        clearResults: of.Ke
    });
    yd = xd.prototype;
    T(yd, {
        setPolicy: yd.St,
        toString: yd.toString,
        setPageCapacity: yd.Fp,
        setIntercityPolicy: yd.UN,
        setTransitTypePolicy: yd.cO
    });
    T(window, {
        BMAP_DRIVING_POLICY_DEFAULT: 0,
        BMAP_DRIVING_POLICY_AVOID_HIGHWAYS: 3,
        BMAP_DRIVING_POLICY_AVOID_CONGESTION: 5,
        BMAP_DRIVING_POLICY_FIRST_HIGHWAYS: 4
    });
    T(window, {
        BMAP_MODE_DRIVING: "driving",
        BMAP_MODE_TRANSIT: "transit",
        BMAP_MODE_WALKING: "walking",
        BMAP_MODE_NAVIGATION: "navigation"
    });
    var pf = Gd.prototype;
    T(pf, {
        routeCall: pf.MN
    });
    T(window, {
        BMAP_HIGHLIGHT_STEP: 1,
        BMAP_HIGHLIGHT_ROUTE: 2
    });
    T(window, {
        BMAP_ROUTE_TYPE_DRIVING: jd,
        BMAP_ROUTE_TYPE_WALKING: id,
        BMAP_ROUTE_TYPE_RIDING: kd
    });
    T(window, {
        BMAP_ROUTE_STATUS_NORMAL: ld,
        BMAP_ROUTE_STATUS_EMPTY: 1,
        BMAP_ROUTE_STATUS_ADDRESS: 2
    });
    var qf = Ad.prototype;
    T(qf, {
        setPolicy: qf.St
    });
    var rf = Md.prototype;
    T(rf, {
        show: rf.show,
        hide: rf.U,
        setTypes: rf.rF,
        setLocation: rf.Wm,
        search: rf.search,
        setInputValue: rf.xy
    });
    T(nb.prototype, {});
    var sf = Kd.prototype;
    T(sf, {
        get: sf.get
    });
    T(cc.prototype, {});
    T(db.prototype, {});
    T(window, {
        BMAP_POINT_DENSITY_HIGH: 200,
        BMAP_POINT_DENSITY_MEDIUM: Vc,
        BMAP_POINT_DENSITY_LOW: 50
    });
    T(window, {
        BMAP_POINT_SHAPE_STAR: 1,
        BMAP_POINT_SHAPE_WATERDROP: 2,
        BMAP_POINT_SHAPE_CIRCLE: vc,
        BMAP_POINT_SHAPE_SQUARE: 4,
        BMAP_POINT_SHAPE_RHOMBUS: 5
    });
    T(window, {
        BMAP_POINT_SIZE_TINY: 1,
        BMAP_POINT_SIZE_SMALLER: 2,
        BMAP_POINT_SIZE_SMALL: 3,
        BMAP_POINT_SIZE_NORMAL: wc,
        BMAP_POINT_SIZE_BIG: 5,
        BMAP_POINT_SIZE_BIGGER: 6,
        BMAP_POINT_SIZE_HUGE: 7
    });
    T(window, {
        BMap_Symbol_SHAPE_CAMERA: 11,
        BMap_Symbol_SHAPE_WARNING: 12,
        BMap_Symbol_SHAPE_SMILE: 13,
        BMap_Symbol_SHAPE_CLOCK: 14,
        BMap_Symbol_SHAPE_POINT: 9,
        BMap_Symbol_SHAPE_PLANE: 10,
        BMap_Symbol_SHAPE_CIRCLE: 1,
        BMap_Symbol_SHAPE_RECTANGLE: 2,
        BMap_Symbol_SHAPE_RHOMBUS: 3,
        BMap_Symbol_SHAPE_STAR: 4,
        BMap_Symbol_SHAPE_BACKWARD_CLOSED_ARROW: 5,
        BMap_Symbol_SHAPE_FORWARD_CLOSED_ARROW: 6,
        BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW: 7,
        BMap_Symbol_SHAPE_FORWARD_OPEN_ARROW: 8
    });
    T(window, {
        BMAP_CONTEXT_MENU_ICON_ZOOMIN: fc,
        BMAP_CONTEXT_MENU_ICON_ZOOMOUT: gc
    });
    T(window, {
        BMAP_SYS_DRAWER: Ja,
        BMAP_SVG_DRAWER: 1,
        BMAP_VML_DRAWER: 2,
        BMAP_CANVAS_DRAWER: 3,
        BMAP_SVG_DRAWER_FIRST: 4
    });
    B.TU();
    B.g0();
})()