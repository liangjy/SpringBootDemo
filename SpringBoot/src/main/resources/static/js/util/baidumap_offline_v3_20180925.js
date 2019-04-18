var nginxIp='132.96.171.33:9991';
window.TILE_VERSION = {
    "ditu": {
        "normal": {
            "version": "088",
            "updateDate": "20180919"
        },
        "satellite": {
            "version": "009",
            "updateDate": "20180919"
        },
        "normalTraffic": {
            "version": "081",
            "updateDate": "20180919"
        },
        "satelliteTraffic": {
            "version": "083",
            "updateDate": "20180919"
        },
        "mapJS": {
            "version": "104",
            "updateDate": "20180919"
        },
        "satelliteStreet": {
            "version": "083",
            "updateDate": "20180919"
        },
        "panoClick": {
            "version": "1033",
            "updateDate": "20180919"
        },
        "panoUdt": {
            "version": "20180919",
            "updateDate": "20180919"
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
            "updateDate": "20180919"
        }
    },
    "webapp": {
        "high_normal": {
            "version": "001",
            "updateDate": "20180919"
        },
        "lower_normal": {
            "version": "002",
            "updateDate": "20180919"
        }
    },
    "api_for_mobile": {
        "vector": {
            "version": "002",
            "updateDate": "20180919"
        },
        "vectorIcon": {
            "version": "002",
            "updateDate": "20180919"
        }
    }
};
window.BMAP_AUTHENTIC_KEY = "BRBlNEMNKB7jwL2kAULKI66G";
(function () {
    function aa(a) {
        throw a;
    }
    var l = void 0,
        p = !0,
        q = null,
        t = !1;

    function u() {
        return function () {}
    }
    function ba(a) {
        return function (b) {
            this[a] = b
        }
    }
    function w(a) {
        return function () {
            return this[a]
        }
    }
    function ca(a) {
        return function () {
            return a
        }
    }
    var da, ea = [];

    function fa(a) {
        return function () {
            return ea[a].apply(this, arguments)
        }
    }
    function ga(a, b) {
        return ea[a] = b
    }
    var ha, z = ha = z || {
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
            9 == a.nodeType) ? a : q
    };
    z.$ = z.yc = z.D.$;
    z.D.U = function (a) {
        a = z.D.$(a);
        if (a === q) return a;
        a.style.display = "none";
        return a
    };
    z.U = z.D.U;
    z.lang = z.lang || {};
    z.lang.gg = function (a) {
        return "[object String]" == Object.prototype.toString.call(a)
    };
    z.gg = z.lang.gg;
    z.D.rj = function (a) {
        return z.lang.gg(a) ? document.getElementById(a) : a
    };
    z.rj = z.D.rj;
    z.D.getElementsByClassName = function (a, b) {
        var c;
        if (a.getElementsByClassName) c = a.getElementsByClassName(b);
        else {
            var e = a;
            e == q && (e = document);
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
        var c = z.D.rj,
            a = c(a),
            b = c(b);
        return a.contains ? a != b && a.contains(b) : !! (a.compareDocumentPosition(b) & 16)
    };
    z.ca = z.ca || {};
    /msie (\d+\.\d)/i.test(navigator.userAgent) && (z.ca.ia = z.ia = document.documentMode || +RegExp.$1);
    var ia = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        rowspan: "rowSpan",
        valign: "vAlign",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    8 > z.ca.ia ? (ia["for"] = "htmlFor", ia["class"] = "className") : (ia.htmlFor = "for", ia.className = "class");
    z.D.qF = ia;
    z.D.ZD = function (a, b, c) {
        a = z.D.$(a);
        if (a === q) return a;
        if ("style" == b) a.style.cssText = c;
        else {
            b = z.D.qF[b] || b;
            a.setAttribute(b, c)
        }
        return a
    };
    z.ZD = z.D.ZD;
    z.D.$D = function (a, b) {
        a = z.D.$(a);
        if (a === q) return a;
        for (var c in b) z.D.ZD(a, c, b[c]);
        return a
    };
    z.$D = z.D.$D;
    z.wk = z.wk || {};
    (function () {
        var a = RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
        z.wk.trim = function (b) {
            return ("" + b).replace(a, "")
        }
    })();
    z.trim = z.wk.trim;
    z.wk.lo = function (a, b) {
        var a = "" + a,
            c = Array.prototype.slice.call(arguments, 1),
            e = Object.prototype.toString;
        if (c.length) {
            c = c.length == 1 ? b !== q && /\[object Array\]|\[object Object\]/.test(e.call(b)) ? b : c : c;
            return a.replace(/#\{(.+?)\}/g, function (a, b) {
                var i = c[b];
                "[object Function]" == e.call(i) && (i = i(b));
                return "undefined" == typeof i ? "" : i
            })
        }
        return a
    };
    z.lo = z.wk.lo;
    z.D.mc = function (a, b) {
        a = z.D.$(a);
        if (a === q) return a;
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
    z.mc = z.D.mc;
    z.D.Lw = function (a, b, c) {
        a = z.D.$(a);
        if (a === q) return a;
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
    z.Lw = z.D.Lw;
    z.D.show = function (a) {
        a = z.D.$(a);
        if (a === q) return a;
        a.style.display = "";
        return a
    };
    z.show = z.D.show;
    z.D.wC = function (a) {
        a = z.D.$(a);
        return a === q ? a : a.nodeType == 9 ? a : a.ownerDocument || a.document
    };
    z.D.Ya = function (a, b) {
        a = z.D.$(a);
        if (a === q) return a;
        for (var c = b.split(/\s+/), e = a.className, f = " " + e + " ", g = 0, i = c.length; g < i; g++) f.indexOf(" " +
                c[g] + " ") < 0 && (e = e + (" " + c[g]));
        a.className = e;
        return a
    };
    z.Ya = z.D.Ya;
    z.D.CA = z.D.CA || {};
    z.D.ol = z.D.ol || [];
    z.D.ol.filter = function (a, b, c) {
        for (var e = 0, f = z.D.ol, g; g = f[e]; e++) if (g = g[c]) b = g(a, b);
        return b
    };
    z.wk.eN = function (a) {
        return a.indexOf("-") < 0 && a.indexOf("_") < 0 ? a : a.replace(/[-_][^-_]/g, function (a) {
            return a.charAt(1).toUpperCase()
        })
    };
    z.D.JZ = function (a) {
        z.D.es(a, "expand") ? z.D.mc(a, "expand") : z.D.Ya(a, "expand")
    };
    z.D.es = function (a) {
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
            c !== t && (c = p)
        });
        return c
    };
    z.D.fg = function (a, b) {
        var c = z.D,
            a = c.$(a);
        if (a === q) return a;
        var b = z.wk.eN(b),
            e = a.style[b];
        if (!e) var f = c.CA[b],
        e = a.currentStyle || (z.ca.ia ? a.style : getComputedStyle(a, q)), e = f && f.get ? f.get(a, e) : e[f || b];
        if (f = c.ol) e = f.filter(b, e, "get");
        return e
    };
    z.fg = z.D.fg;
    /opera\/(\d+\.\d)/i.test(navigator.userAgent) && (z.ca.opera = +RegExp.$1);
    z.ca.WK = /webkit/i.test(navigator.userAgent);
    z.ca.kX = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
    z.ca.kD = "CSS1Compat" == document.compatMode;
    z.D.fa = function (a) {
        a = z.D.$(a);
        if (a === q) return a;
        var b = z.D.wC(a),
            c = z.ca,
            e = z.D.fg;
        c.kX > 0 && b.getBoxObjectFor && e(a, "position");
        var f = {
            left: 0,
            top: 0
        }, g;
        if (a == (c.ia && !c.kD ? b.body : b.documentElement)) return f;
        if (a.getBoundingClientRect) {
            a = a.getBoundingClientRect();
            f.left = Math.floor(a.left) + Math.max(b.documentElement.scrollLeft, b.body.scrollLeft);
            f.top = Math.floor(a.top) + Math.max(b.documentElement.scrollTop, b.body.scrollTop);
            f.left = f.left - b.documentElement.clientLeft;
            f.top = f.top - b.documentElement.clientTop;
            a = b.body;
            b = parseInt(e(a, "borderLeftWidth"));
            e = parseInt(e(a, "borderTopWidth"));
            if (c.ia && !c.kD) {
                f.left = f.left - (isNaN(b) ? 2 : b);
                f.top = f.top - (isNaN(e) ? 2 : e)
            }
        } else {
            g = a;
            do {
                f.left = f.left + g.offsetLeft;
                f.top = f.top + g.offsetTop;
                if (c.WK > 0 && e(g, "position") == "fixed") {
                    f.left = f.left + b.body.scrollLeft;
                    f.top = f.top + b.body.scrollTop;
                    break
                }
                g = g.offsetParent
            } while (g && g != a);
            if (c.opera > 0 || c.WK > 0 && e(a, "position") == "absolute") f.top = f.top - b.body.offsetTop;
            for (g = a.offsetParent; g && g != b.body;) {
                f.left = f.left - g.scrollLeft;
                if (!c.opera || g.tagName != "TR") f.top = f.top - g.scrollTop;
                g = g.offsetParent
            }
        }
        return f
    };
    /firefox\/(\d+\.\d)/i.test(navigator.userAgent) && (z.ca.Ie = +RegExp.$1);
    /BIDUBrowser/i.test(navigator.userAgent) && (z.ca.J0 = p);
    var ka = navigator.userAgent;
    /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ka) && !/chrome/i.test(ka) && (z.ca.wx = +(RegExp.$1 || RegExp.$2));
    /chrome\/(\d+\.\d)/i.test(navigator.userAgent) && (z.ca.Gv = +RegExp.$1);
    z.bc = z.bc || {};
    z.bc.Hb = function (a, b) {
        var c, e, f = a.length;
        if ("function" == typeof b) for (e = 0; e < f; e++) {
                c = a[e];
                c = b.call(a, c, e);
                if (c === t) break
        }
        return a
    };
    z.Hb = z.bc.Hb;
    z.lang.aa = function () {
        return "TANGRAM__" + (window[z.aa]._counter++).toString(36)
    };
    window[z.aa]._counter = window[z.aa]._counter || 1;
    window[z.aa]._instances = window[z.aa]._instances || {};
    z.lang.ns = function (a) {
        return "[object Function]" == Object.prototype.toString.call(a)
    };
    z.lang.Ca = function (a) {
        this.aa = a || z.lang.aa();
        window[z.aa]._instances[this.aa] = this
    };
    window[z.aa]._instances = window[z.aa]._instances || {};
    z.lang.Ca.prototype.Hh = fa(0);
    z.lang.Ca.prototype.toString = function () {
        return "[object " + (this.cP || "Object") + "]"
    };
    z.lang.Ht = function (a, b) {
        this.type = a;
        this.returnValue = p;
        this.target = b || q;
        this.currentTarget = q
    };
    z.lang.Ca.prototype.addEventListener = function (a, b, c) {
        if (z.lang.ns(b)) {
            !b.Gk && (b.Gk = {});
            !this.li && (this.li = {});
            var e = this.li,
                f;
            if (typeof c == "string" && c) {
                /[^\w\-]/.test(c) && aa("nonstandard key:" + c);
                f = b.Cw = c
            }
            a.indexOf("on") != 0 && (a = "on" + a);
            typeof e[a] != "object" && (e[a] = {});
            typeof b.Gk[a] != "object" && (b.Gk[a] = {});
            f = f || z.lang.aa();
            b.Gk[a].Cw = f;
            e[a][f] = b
        }
    };
    z.lang.Ca.prototype.removeEventListener = function (a, b) {
        a.indexOf("on") != 0 && (a = "on" + a);
        if (z.lang.ns(b)) {
            if (!b.Gk || !b.Gk[a]) return;
            b = b.Gk[a].Cw
        } else if (!z.lang.gg(b)) return;
        !this.li && (this.li = {});
        var c = this.li;
        c[a] && c[a][b] && delete c[a][b]
    };
    z.lang.Ca.prototype.dispatchEvent = function (a, b) {
        z.lang.gg(a) && (a = new z.lang.Ht(a));
        !this.li && (this.li = {});
        var b = b || {}, c;
        for (c in b) a[c] = b[c];
        var e = this.li,
            f = a.type;
        a.target = a.target || this;
        a.currentTarget = this;
        f.indexOf("on") != 0 && (f = "on" + f);
        z.lang.ns(this[f]) && this[f].apply(this, arguments);
        if (typeof e[f] == "object") for (c in e[f]) e[f][c].apply(this, arguments);
        return a.returnValue
    };
    z.lang.sa = function (a, b, c) {
        var e, f, g = a.prototype;
        f = new Function;
        f.prototype = b.prototype;
        f = a.prototype = new f;
        for (e in g) f[e] = g[e];
        a.prototype.constructor = a;
        a.wZ = b.prototype;
        if ("string" == typeof c) f.cP = c
    };
    z.sa = z.lang.sa;
    z.lang.Gc = function (a) {
        return window[z.aa]._instances[a] || q
    };
    z.platform = z.platform || {};
    z.platform.PK = /macintosh/i.test(navigator.userAgent);
    z.platform.L2 = /MicroMessenger/i.test(navigator.userAgent);
    z.platform.XK = /windows/i.test(navigator.userAgent);
    z.platform.sX = /x11/i.test(navigator.userAgent);
    z.platform.Xi = /android/i.test(navigator.userAgent);
    /android (\d+\.\d)/i.test(navigator.userAgent) && (z.platform.VA = z.VA = RegExp.$1);
    z.platform.mX = /ipad/i.test(navigator.userAgent);
    z.platform.gD = /iphone/i.test(navigator.userAgent);

    function ma(a, b) {
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
    z.lang.Xv = function (a) {
        var b = window[z.aa];
        b.iR && delete b.iR[a]
    };
    z.event = {};
    z.M = z.event.M = function (a, b, c) {
        if (!(a = z.$(a))) return a;
        b = b.replace(/^on/, "");
        a.addEventListener ? a.addEventListener(b, c, t) : a.attachEvent && a.attachEvent("on" + b, c);
        return a
    };
    z.Wc = z.event.Wc = function (a, b, c) {
        if (!(a = z.$(a))) return a;
        b = b.replace(/^on/, "");
        a.removeEventListener ? a.removeEventListener(b, c, t) : a.detachEvent && a.detachEvent("on" + b, c);
        return a
    };
    z.D.es = function (a, b) {
        if (!a || !a.className || typeof a.className != "string") return t;
        var c = -1;
        try {
            c = a.className == b || a.className.search(RegExp("(\\s|^)" + b + "(\\s|$)"))
        } catch (e) {
            return t
        }
        return c > -1
    };
    z.BJ = function () {
        function a(a) {
            document.addEventListener && (this.element = a, this.EJ = this.ck ? "touchstart" : "mousedown", this.eC =
                this.ck ? "touchmove" : "mousemove", this.dC = this.ck ? "touchend" : "mouseup", this.Xg = t, this.it =
                this.ht = 0, this.element.addEventListener(this.EJ, this, t), ha.M(this.element, "mousedown", u()),
                this.handleEvent(q))
        }
        a.prototype = {
            ck: "ontouchstart" in window || "createTouch" in document,
            start: function (a) {
                na(a);
                this.Xg = t;
                this.ht = this.ck ? a.touches[0].clientX : a.clientX;
                this.it = this.ck ? a.touches[0].clientY : a.clientY;
                this.element.addEventListener(this.eC, this, t);
                this.element.addEventListener(this.dC, this, t)
            },
            move: function (a) {
                pa(a);
                var c = this.ck ? a.touches[0].clientY : a.clientY;
                if (10 < Math.abs((this.ck ? a.touches[0].clientX : a.clientX) - this.ht) || 10 < Math.abs(c - this.it))
                    this.Xg = p
            },
            end: function (a) {
                pa(a);
                this.Xg || (a = document.createEvent("Event"), a.initEvent("tap", t, p), this.element.dispatchEvent(a));
                this.element.removeEventListener(this.eC, this, t);
                this.element.removeEventListener(this.dC, this, t)
            },
            handleEvent: function (a) {
                if (a) switch (a.type) {
                    case this.EJ:
                        this.start(a);
                        break;
                    case this.eC:
                        this.move(a);
                        break;
                    case this.dC:
                        this.end(a)
                }
            }
        };
        return function (b) {
            return new a(b)
        }
    }();
    var D = window.BMap || {};
    D.version = "3.0";
    D.A0 = 0.34 > Math.random();
    0 <= D.version.indexOf("#") && (D.version = "3.0");
    D.Kq = [];
    D.Oe = function (a) {
        this.Kq.push(a)
    };
    D.Aq = [];
    D.km = function (a) {
        this.Aq.push(a)
    };
    D.wT = D.apiLoad || u();
    D.h_ = D.verify || function () {
        D.version && D.version >= 1.5 && qa(D.ge + "?qt=verify&ak=" + ra, function (a) {
            if (a && a.error !== 0) {
                if (typeof map !== "undefined") {
                    map.Pa().innerHTML = "";
                    map.li = {}
                }
                D = q;
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
    var ra = window.BMAP_AUTHENTIC_KEY;
    window.BMAP_AUTHENTIC_KEY = q;
    var sa = window.BMap_loadScriptTime,
        ta = (new Date).getTime(),
        ua = q,
        wa = p,
        xa = 5042,
        za = 5002,
        Aa = 5003,
        Ba = "load_mapclick",
        Ca = 5038,
        Da = 5041,
        Fa = 5047,
        Ga = 5036,
        Ha = 5039,
        Ia = 5037,
        Ja = 5040,
        Ka = 5011,
        La = 7E3;
    var Ma = 0;

    function Na(a, b) {
        if (a = z.$(a)) {
            var c = this;
            z.lang.Ca.call(c);
            b = b || {};
            c.K = {
                hB: 200,
                Ob: p,
                cw: t,
                UB: p,
                ho: p,
                io: b.enableWheelZoom || t,
                zJ: p,
                XB: p,
                Lr: p,
                Kr: p,
                aC: p,
                eo: b.enable3DBuilding || t,
                Bc: 25,
                u_: 240,
                jT: 450,
                rc: H.rc,
                vd: H.vd,
                Qw: !! b.Qw,
                Yb: Math.round(b.minZoom) || 1,
                gc: Math.round(b.maxZoom) || 19,
                Xb: b.mapType || Oa,
                M3: t,
                wJ: b.drawer || Ma,
                bw: p,
                $v: 500,
                lV: b.enableHighResolution !== t,
                WB: b.enableMapClick !== t,
                devicePixelRatio: b.devicePixelRatio || window.devicePixelRatio || 1,
                FE: 99,
                oe: b.mapStyle || q,
                AX: b.logoControl === t ? t : p,
                DT: [],
                M0: b.beforeClickIcon || q,
                Mi: t,
                aw: t,
                FL: p
            };
            c.K.oe && (this.$W(c.K.oe.controls), this.KK(c.K.oe.geotableId));
            c.K.oe && c.K.oe.styleId && c.j2(c.K.oe.styleId);
            c.K.kB = {
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
            b.enableAutoResize && (c.K.Kr = b.enableAutoResize);
            b.enableStreetEntrance === t && (c.K.aC = b.enableStreetEntrance);
            b.enableDeepZoom === t && (c.K.zJ = b.enableDeepZoom);
            var e = c.K.DT;
            if (I()) for (var f = 0, g = e.length; f < g; f++) if (z.ca[e[f]]) {
                        c.K.devicePixelRatio = 1;
                        break
                    }
            e = -1 < navigator.userAgent.toLowerCase().indexOf("android");
            f = -1 < navigator.userAgent.toLowerCase().indexOf("mqqbrowser");
            if (-1 < navigator.userAgent.toLowerCase().indexOf("UCBrowser") || e && f) c.K.FE = 99;
            c.Ta = a;
            c.vA(a);
            a.unselectable = "on";
            a.innerHTML = "";
            a.appendChild(c.va());
            b.size && this.se(b.size);
            e = c.yb();
            c.width = e.width;
            c.height = e.height;
            c.offsetX = 0;
            c.offsetY = 0;
            c.platform = a.firstChild;
            c.pe = c.platform.firstChild;
            c.pe.style.width = c.width + "px";
            c.pe.style.height = c.height + "px";
            c.Md = {};
            c.he = new J(0, 0);
            c.lc = new J(0, 0);
            c.Ra = 3;
            c.vc = 0;
            c.vB = q;
            c.uB = q;
            c.Nb = "";
            c.Hv = "";
            c.oh = {};
            c.oh.custom = {};
            c.Qa = 0;
            b.useWebGL === t && Pa(t);
            c.P = new Qa(a, {
                af: "api",
                nR: p
            });
            c.P.U();
            c.P.dE(c);
            b = b || {};
            e = c.Xb = c.K.Xb;
            c.Ic = e.Rl();
            e === Ra && Sa(za);
            e === Ta && Sa(Aa);
            e = c.K;
            e.wN = Math.round(b.minZoom);
            e.vN = Math.round(b.maxZoom);
            c.Zt();
            c.R = {
                Cc: t,
                cc: 0,
                vs: 0,
                bL: 0,
                Q2: 0,
                $A: t,
                OD: -1,
                Df: []
            };
            c.platform.style.cursor = c.K.rc;
            for (f = 0; f < D.Kq.length; f++) D.Kq[f](c);
            c.R.OD = f;
            c.ba();
            K.load("map", function () {
                c.eb()
            });
            c.K.WB && (setTimeout(function () {
                Sa(Ba)
            }, 1E3), K.load("mapclick", function () {
                window.MPC_Mgr = window.MPC_Mgr || {};
                window.MPC_Mgr[c.aa] = new Ua(c)
            }, p));
            Va() && K.load("oppc", function () {
                c.my()
            });
            I() && K.load("opmb", function () {
                c.my()
            });
            a = q;
            c.IA = []
        }
    }
    z.lang.sa(Na, z.lang.Ca, "Map");
    z.extend(Na.prototype, {
        va: function () {
            var a = N("div"),
                b = a.style;
            b.overflow = "visible";
            b.position = "absolute";
            b.zIndex = "0";
            b.top = b.left = "0px";
            var b = N("div", {
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
        vA: function (a) {
            var b = a.style;
            b.overflow = "hidden";
            "absolute" !== Wa(a).position && (b.position = "relative", b.zIndex = 0);
            b.backgroundColor = "#F3F1EC";
            b.color = "#000";
            b.textAlign = "left"
        },
        ba: function () {
            var a = this;
            a.In = function () {
                var b = a.yb();
                if (a.width !== b.width || a.height !== b.height) {
                    var c = new O(a.width, a.height),
                        e = new Q("onbeforeresize");
                    e.size = c;
                    a.dispatchEvent(e);
                    a.Kj((b.width - a.width) / 2, (b.height - a.height) / 2);
                    a.pe.style.width = (a.width = b.width) + "px";
                    a.pe.style.height = (a.height = b.height) + "px";
                    c = new Q("onresize");
                    c.size = b;
                    a.dispatchEvent(c)
                }
            };
            a.K.Kr && (a.R.yl = setInterval(a.In, 80))
        },
        Kj: function (a, b, c, e) {
            var f = this.ra().kc(this.ga()),
                g = this.Ic,
                i = p;
            c && J.OK(c) && (this.he = new J(c.lng, c.lat), i = t);
            if (c = c && e ? g.Rh(c, this.Nb) : this.lc) if (this.lc = new J(c.lng + a * f, c.lat - b * f), (a = g.Wg(
                    this.lc, this.Nb)) && i) this.he = a
        },
        pg: function (a, b) {
            if (Xa(a) && (this.Zt(), this.dispatchEvent(new Q("onzoomstart")), a = this.dn(a).zoom, a !== this.Ra)) {
                this.vc = this.Ra;
                this.Ra = a;
                var c;
                b ? c = b : this.Rg() && (c = this.Rg().fa());
                c && (c = this.Rb(c, this.vc), this.Kj(this.width / 2 - c.x, this.height / 2 - c.y, this.zb(c, this.vc),
                    p));
                this.dispatchEvent(new Q("onzoomstartcode"))
            }
        },
        Jc: function (a) {
            this.pg(a)
        },
        LE: function (a) {
            this.pg(this.Ra + 1, a)
        },
        ME: function (a) {
            this.pg(this.Ra - 1, a)
        },
        Zh: function (a) {
            a instanceof J && (this.lc = this.Ic.Rh(a, this.Nb), this.he = J.OK(a) ? new J(a.lng, a.lat) : this.Ic.Wg(
                this.lc, this.Nb))
        },
        kg: function (a, b) {
            a = Math.round(a) || 0;
            b = Math.round(b) || 0;
            this.Kj(-a, -b)
        },
        tv: function (a) {
            a && Ya(a.xe) && (a.xe(this), this.dispatchEvent(new Q("onaddcontrol", a)))
        },
        mM: function (a) {
            a && Ya(a.remove) && (a.remove(), this.dispatchEvent(new Q("onremovecontrol", a)))
        },
        Ln: function (a) {
            a && Ya(a.ta) && (a.ta(this), this.dispatchEvent(new Q("onaddcontextmenu", a)))
        },
        Po: function (a) {
            a && Ya(a.remove) && (this.dispatchEvent(new Q("onremovecontextmenu", a)), a.remove())
        },
        Ka: function (a) {
            a && Ya(a.xe) && (a.xe(this), this.dispatchEvent(new Q("onaddoverlay", a)))
        },
        Lb: function (a) {
            a && Ya(a.remove) && (a.remove(), this.dispatchEvent(new Q("onremoveoverlay", a)))
        },
        SI: function () {
            this.dispatchEvent(new Q("onclearoverlays"))
        },
        Ee: function (a) {
            a && this.dispatchEvent(new Q("onaddtilelayer", a))
        },
        Lf: function (a) {
            a && this.dispatchEvent(new Q("onremovetilelayer", a))
        },
        ng: function (a) {
            if (this.Xb !== a) {
                var b = new Q("onsetmaptype");
                b.E3 = this.Xb;
                this.Xb = this.K.Xb = a;
                this.Ic = this.Xb.Rl();
                this.Kj(0, 0, this.tb(), p);
                this.Zt();
                var c = this.dn(this.ga()).zoom;
                this.pg(c);
                this.dispatchEvent(b);
                b = new Q("onmaptypechange");
                b.Ra = c;
                b.Xb = a;
                this.dispatchEvent(b);
                (a === Za || a === Ta) && Sa(Aa)
            }
        },
        hf: function (a) {
            var b = this;
            if (a instanceof J) b.Zh(a, {
                    noAnimation: p
                });
            else if ($a(a)) if (b.Xb === Ra) {
                    var c = H.dB[a];
                    c && (pt = c.k, b.hf(pt))
                } else {
                    var e = this.tG();
                    e.Xs(function (c) {
                        0 === e.Sl() && 2 === e.Ha.result.type && (b.hf(c.Zj(0).point), Ra.Vj(a) && b.aE(a))
                    });
                    e.search(a, {
                        log: "center"
                    })
                }
        },
        td: function (a, b) {
            "[object Undefined]" !== Object.prototype.toString.call(b) && (b = parseInt(b));
            D.Ep("cus.fire", "time", {
                z_loadscripttime: ta - sa
            });
            var c = this;
            if ($a(a)) if (c.Xb === Ra) {
                    var e = H.dB[a];
                    e && (pt = e.k, c.td(pt, b))
                } else {
                    var f = c.tG();
                    f.Xs(function (e) {
                        if (0 === f.Sl() && (2 === f.Ha.result.type || 11 === f.Ha.result.type)) {
                            var e = e.Zj(0).point,
                                g = b || ab.hw(f.Ha.content.level, c);
                            c.td(e, g);
                            Ra.Vj(a) && c.aE(a)
                        }
                    });
                    f.search(a, {
                        log: "center"
                    })
                } else if (a instanceof J && b) {
                b = c.dn(b).zoom;
                c.vc = c.Ra || b;
                c.Ra = b;
                e = c.he;
                c.he = new J(a.lng, a.lat);
                c.lc = c.Ic.Rh(c.he, c.Nb);
                c.vB = c.vB || c.Ra;
                c.uB = c.uB || c.he;
                var g = new Q("onload"),
                    i = new Q("onloadcode");
                g.point = new J(a.lng, a.lat);
                g.pixel = c.Rb(c.he, c.Ra);
                g.zoom = b;
                c.loaded || (c.loaded = p, c.dispatchEvent(g), ua || (ua = bb()));
                c.dispatchEvent(i);
                g = new Q("onmoveend");
                g.gH = "centerAndZoom";
                e.fc(c.he) || c.dispatchEvent(g);
                c.dispatchEvent(new Q("onmoveend"));
                c.vc !== c.Ra && (e = new Q("onzoomend"), e.gH = "centerAndZoom", c.dispatchEvent(e));
                c.K.eo && c.eo()
            }
        },
        tG: function () {
            this.R.nL || (this.R.nL = new db(1));
            return this.R.nL
        },
        reset: function () {
            this.td(this.uB, this.vB, p)
        },
        enableDragging: function () {
            this.K.Ob = p
        },
        disableDragging: function () {
            this.K.Ob = t
        },
        enableInertialDragging: function () {
            this.K.bw = p
        },
        disableInertialDragging: function () {
            this.K.bw = t
        },
        enableScrollWheelZoom: function () {
            this.K.io = p
        },
        disableScrollWheelZoom: function () {
            this.K.io = t
        },
        enableContinuousZoom: function () {
            this.K.ho = p
        },
        disableContinuousZoom: function () {
            this.K.ho = t
        },
        enableDoubleClickZoom: function () {
            this.K.UB = p
        },
        disableDoubleClickZoom: function () {
            this.K.UB = t
        },
        enableKeyboard: function () {
            this.K.cw = p
        },
        disableKeyboard: function () {
            this.K.cw = t
        },
        enablePinchToZoom: function () {
            this.K.Lr = p
        },
        disablePinchToZoom: function () {
            this.K.Lr = t
        },
        enableAutoResize: function () {
            this.K.Kr = p;
            this.In();
            this.R.yl || (this.R.yl = setInterval(this.In, 80))
        },
        disableAutoResize: function () {
            this.K.Kr = t;
            this.R.yl && (clearInterval(this.R.yl), this.R.yl = q)
        },
        eo: function () {
            this.K.eo = p;
            this.Sm || (this.Sm = new BuildingLayer({
                t1: p
            }), this.Ee(this.Sm))
        },
        LU: function () {
            this.K.eo = t;
            this.Sm && (this.Lf(this.Sm), this.Sm = q, delete this.Sm)
        },
        yb: function () {
            return this.xr && this.xr instanceof O ? new O(this.xr.width, this.xr.height) : new O(this.Ta.clientWidth,
                this.Ta.clientHeight)
        },
        se: function (a) {
            a && a instanceof O ? (this.xr = a, this.Ta.style.width = a.width + "px", this.Ta.style.height = a.height +
                "px") : this.xr = q
        },
        tb: w("he"),
        ga: w("Ra"),
        aU: function () {
            this.In()
        },
        dn: function (a) {
            var b = this.K.Yb,
                c = this.K.gc,
                e = t,
                a = Math.round(a);
            a < b && (e = p, a = b);
            a > c && (e = p, a = c);
            return {
                zoom: a,
                fC: e
            }
        },
        Pa: w("Ta"),
        Rb: function (a, b) {
            b = b || this.ga();
            return this.Ic.Rb(a, b, this.lc, this.yb(), this.Nb)
        },
        zb: function (a, b) {
            b = b || this.ga();
            return this.Ic.zb(a, b, this.lc, this.yb(), this.Nb)
        },
        Ne: function (a, b) {
            if (a) {
                var c = this.Rb(new J(a.lng, a.lat), b);
                c.x -= this.offsetX;
                c.y -= this.offsetY;
                return c
            }
        },
        YL: function (a, b) {
            if (a) {
                var c = new R(a.x, a.y);
                c.x += this.offsetX;
                c.y += this.offsetY;
                return this.zb(c, b)
            }
        },
        pointToPixelFor3D: function (a, b) {
            var c = map.Nb;
            this.Xb === Ra && c && eb.YI(a, this, b)
        },
        w3: function (a, b) {
            var c = map.Nb;
            this.Xb === Ra && c && eb.XI(a, this, b)
        },
        x3: function (a, b) {
            var c = this,
                e = map.Nb;
            c.Xb === Ra && e && eb.YI(a, c, function (a) {
                a.x -= c.offsetX;
                a.y -= c.offsetY;
                b && b(a)
            })
        },
        t3: function (a, b) {
            var c = map.Nb;
            this.Xb === Ra && c && (a.x += this.offsetX, a.y += this.offsetY, eb.XI(a, this, b))
        },
        ke: function (a) {
            if (!this.Pw()) return new fb;
            var b = a || {}, a = b.margins || [0, 0, 0, 0],
                c = b.zoom || q,
                b = this.zb({
                    x: a[3],
                    y: this.height - a[2]
                }, c),
                a = this.zb({
                    x: this.width - a[1],
                    y: a[0]
                }, c);
            return new fb(b, a)
        },
        Pw: function () {
            return !!this.loaded
        },
        rQ: function (a, b) {
            for (var c = this.ra(), e = b.margins || [10, 10, 10, 10], f = b.zoomFactor || 0, g = e[1] + e[3], e = e[0] +
                    e[2], i = c.ro(), k = c = c.Ol(); k >= i; k--) {
                var m = this.ra().kc(k);
                if (a.xE().lng / m < this.width - g && a.xE().lat / m < this.height - e) break
            }
            k += f;
            k < i && (k = i);
            k > c && (k = c);
            return k
        },
        ds: function (a, b) {
            var c = {
                center: this.tb(),
                zoom: this.ga()
            };
            if (!a || !a instanceof fb && 0 === a.length || a instanceof fb && a.Zi()) return c;
            var e = [];
            a instanceof fb ? (e.push(a.Ff()), e.push(a.Ke())) : e = a.slice(0);
            for (var b = b || {}, f = [], g = 0, i = e.length; g < i; g++) f.push(this.Ic.Rh(e[g], this.Nb));
            e = new fb;
            for (g = f.length - 1; 0 <= g; g--) e.extend(f[g]);
            if (e.Zi()) return c;
            c = e.tb();
            f = this.rQ(e, b);
            b.margins && (e = b.margins, g = (e[1] - e[3]) / 2, e = (e[0] - e[2]) / 2, i = this.ra().kc(f), b.offset &&
                (g = b.offset.width, e = b.offset.height), c.lng += i * g, c.lat += i * e);
            c = this.Ic.Wg(c, this.Nb);
            return {
                center: c,
                zoom: f
            }
        },
        eh: function (a, b) {
            var c;
            c = a && a.center ? a : this.ds(a, b);
            var b = b || {}, e = b.delay || 200;
            if (c.zoom === this.Ra && b.enableAnimation !== t) {
                var f = this;
                setTimeout(function () {
                    f.Zh(c.center, {
                        duration: 210
                    })
                }, e)
            } else this.td(c.center, c.zoom)
        },
        Gf: w("Md"),
        Rg: function () {
            return this.R.mb && this.R.mb.Ua() ? this.R.mb : q
        },
        getDistance: function (a, b) {
            if (a && b) {
                if (a.fc(b)) return 0;
                var c = 0,
                    c = S.po(a, b);
                if (c === q || c === l) c = 0;
                return c
            }
        },
        ww: function () {
            var a = [],
                b = this.xa,
                c = this.ue;
            if (b) for (var e in b) b[e] instanceof hb && a.push(b[e]);
            if (c) {
                e = 0;
                for (b = c.length; e < b; e++) a.push(c[e])
            }
            return a
        },
        ra: w("Xb"),
        my: function () {
            for (var a = this.R.OD; a < D.Kq.length; a++) D.Kq[a](this);
            this.R.OD = a
        },
        aE: function (a) {
            this.Nb = Ra.Vj(a);
            this.Hv = Ra.SJ(this.Nb);
            this.Xb === Ra && this.Ic instanceof ib && (this.Ic.Ii = this.Nb)
        },
        setDefaultCursor: function (a) {
            this.K.rc = a;
            this.platform && (this.platform.style.cursor = this.K.rc)
        },
        getDefaultCursor: function () {
            return this.K.rc
        },
        setDraggingCursor: function (a) {
            this.K.vd = a
        },
        getDraggingCursor: function () {
            return this.K.vd
        },
        Hw: function () {
            return this.K.lV && 1.5 <= this.K.devicePixelRatio
        },
        NA: function (a, b) {
            b ? this.oh[b] || (this.oh[b] = {}) : b = "custom";
            a.tag = b;
            a instanceof jb && (this.oh[b][a.aa] = a, a.ta(this));
            var c = this;
            K.load("hotspot", function () {
                c.my()
            }, p)
        },
        tY: function (a, b) {
            b || (b = "custom");
            this.oh[b][a.aa] && delete this.oh[b][a.aa]
        },
        Jv: function (a) {
            a || (a = "custom");
            this.oh[a] = {}
        },
        Zt: function () {
            var a = this.Xb.ro(),
                b = this.Xb.Ol(),
                c = this.K;
            c.Yb = c.wN || a;
            c.gc = c.vN || b;
            c.Yb < a && (c.Yb = a);
            c.gc > b && (c.gc = b)
        },
        setMinZoom: function (a) {
            a = Math.round(a);
            a > this.K.gc && (a = this.K.gc);
            this.K.wN = a;
            this.bI()
        },
        setMaxZoom: function (a) {
            a = Math.round(a);
            a < this.K.Yb && (a = this.K.Yb);
            this.K.vN = a;
            this.bI()
        },
        bI: function () {
            this.Zt();
            var a = this.K;
            this.Ra < a.Yb ? this.Jc(a.Yb) : this.Ra > a.gc && this.Jc(a.gc);
            var b = new Q("onzoomspanchange");
            b.Yb = a.Yb;
            b.gc = a.gc;
            this.dispatchEvent(b)
        },
        l2: w("IA"),
        getKey: function () {
            return ra
        },
        YY: function (a) {
            var b = this;
            D.Ep("cus.fire", "count", "z_setmapstylev2count");
            this.JM(t);
            window.cb = function (a) {
                window.XN = a;
                b.gX()
            };
            var c = D.ge + "custom/v2/mapstyle?ak=" + ra + "&callback=cb&";
            a.styleJson ? c += "styles=" + encodeURIComponent(b.WM(a.styleJson)) : a.style && (c += "customid=" + a.style);
            window.iconSetInfo_high || qa(D.url.proto + D.url.domain.TILE_ONLINE_URLS[0] +
                "/sty/icons_na2x.js?udt=20180907&v=001&from=jsapi");
            qa(c)
        },
        OY: function (a, b) {
            var c = new Q("oncopyrightoffsetchange", {
                zX: a,
                uU: b
            });
            this.K.bJ = b;
            this.dispatchEvent(c)
        },
        Ts: function (a) {
            var b = this;
            window.MPC_Mgr && window.MPC_Mgr[b.aa] && window.MPC_Mgr[b.aa].close();
            b.K.WB = t;
            D.Ep("cus.fire", "count", "z_setmapstylecount");
            if (a) {
                b = this;
                a.styleJson && (a.styleStr = b.WM(a.styleJson));
                I() && z.ca.wx ? setTimeout(function () {
                    b.K.oe = a;
                    b.dispatchEvent(new Q("onsetcustomstyles", a))
                }, 50) : (this.K.oe = a, this.dispatchEvent(new Q("onsetcustomstyles", a)), this.KK(b.K.oe.geotableId));
                var c = {
                    style: a.style
                };
                a.features && 0 < a.features.length && (c.features = p);
                a.styleJson && 0 < a.styleJson.length && (c.styleJson = p);
                Sa(5050, c);
                a.style && (c = b.K.kB[a.style] ? b.K.kB[a.style].backColor : b.K.kB.normal.backColor) && (this.Pa().style
                    .backgroundColor = c)
            }
        },
        $W: function (a) {
            this.controls || (this.controls = {
                navigationControl: new kb,
                scaleControl: new lb,
                overviewMapControl: new mb,
                mapTypeControl: new ob
            });
            var b = this,
                c;
            for (c in this.controls) b.mM(b.controls[c]);
            a = a || [];
            z.bc.Hb(a, function (a) {
                b.tv(b.controls[a])
            })
        },
        KK: function (a) {
            a ? this.vr && this.vr.qf === a || (this.Lf(this.vr), this.vr = new pb({
                geotableId: a
            }), this.Ee(this.vr)) : this.Lf(this.vr)
        },
        Dd: function () {
            var a = this.ga() >= this.K.FE && this.ra() === Oa && 18 >= this.ga(),
                b = t;
            try {
                document.createElement("canvas").getContext("2d"), b = p
            } catch (c) {
                b = t
            }
            return a && b
        },
        getCurrentCity: function () {
            return {
                name: this.Kg,
                code: this.jr
            }
        },
        $r: function () {
            this.P.kn();
            return this.P
        },
        dX: function (a) {
            Oa.setMaxZoom(a.maxZoom || 19);
            var b = new Q("oninitindoorlayer");
            b.Le = a;
            this.dispatchEvent(b);
            this.K.Mi = t
        },
        gX: function (a) {
            if (this.K.Mi) {
                var b = new Q("onupdatestyles");
                this.dispatchEvent(b)
            } else b = new Q("oninitindoorlayer"), b.Le = a, this.dispatchEvent(b), this.K.Mi = p, this.K.aw = p
        },
        JM: function (a) {
            this.K.FL = a;
            this.ei.Zb.parentElement.style.display = a ? "block" : "none"
        },
        setPanorama: function (a) {
            this.P = a;
            this.P.dE(this)
        },
        WM: function (a) {
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
                }, e = [], f = t, g = t, i = t, k = t, m = 0, n; n = a[m]; m++) {
                if (("land" === n.featureType || "all" === n.featureType || "background" === n.featureType) && "string" ===
                    typeof n.elementType && ("geometry" === n.elementType || "geometry.fill" === n.elementType || "all" ===
                    n.elementType) && n.stylers) if (n.stylers.color && (window.bmapLandColor = n.stylers.color, f = p),
                        n.stylers.visibility && "off" === n.stylers.visibility) window.bmapLandColor = "#00000000", f =
                            p;
                if ("railway" === n.featureType && "string" === typeof n.elementType && n.stylers) {
                    if (n.stylers.color && ("geometry" === n.elementType && (window.bmapRailwayFillColor = n.stylers.color,
                        g = p, window.bmapRailwayStrokeColor = n.stylers.color, i = p), "geometry.fill" === n.elementType &&
                        (window.bmapRailwayFillColor = n.stylers.color, g = p), "geometry.stroke" === n.elementType))
                        window.bmapRailwayStrokeColor = n.stylers.color, i = p;
                    n.stylers.visibility && (window.bmapRailwayVisibility = n.stylers.visibility, k = p)
                }
                var o = n.stylers;
                delete n.stylers;
                z.extend(n, o);
                var o = [],
                    s;
                for (s in b) if (n[s]) if ("elementType" === s) o.push(b[s] + ":" + c[n[s]]);
                        else {
                            switch (n[s]) {
                            case "poilabel":
                                n[s] = "poi";
                                break;
                            case "districtlabel":
                                n[s] = "label"
                            }
                            o.push(b[s] + ":" + n[s])
                        }
                2 < o.length && e.push(o.join("|"))
            }!f && window.bmapLandColor && delete window.bmapLandColor;
            !g && window.bmapRailwayFillColor && delete window.bmapRailwayFillColor;
            !i && window.bmapRailwayStrokeColor && delete window.bmapRailwayStrokeColor;
            !k && window.bmapRailwayVisibility && delete window.bmapRailwayVisibility;
            return e.join(",")
        }
    });

    function Sa(a, b) {
        if (a) {
            var b = b || {}, c = "",
                e;
            for (e in b) c = c + "&" + e + "=" + encodeURIComponent(b[e]);
            var f = function (a) {
                a && (qb = p, setTimeout(function () {
                    rb.src = D.ge + "images/blank.gif?" + a.src
                }, 50))
            }, g = function () {
                    var a = sb.shift();
                    a && f(a)
                };
            e = (1E8 * Math.random()).toFixed(0);
            qb ? sb.push({
                src: "product=jsapi&sub_product=jsapi&v=" + D.version + "&sub_product_v=" + D.version + "&t=" + e + "&code=" + a + "&da_src=" + a + c
            }) : f({
                src: "product=jsapi&sub_product=jsapi&v=" + D.version + "&sub_product_v=" + D.version + "&t=" + e + "&code=" + a + "&da_src=" + a + c
            });
            tb || (z.M(rb, "load", function () {
                qb = t;
                g()
            }), z.M(rb, "error", function () {
                qb = t;
                g()
            }), tb = p)
        }
    }
    var qb, tb, sb = [],
        rb = new Image;
    Sa(5E3, {
        device_pixel_ratio: window.devicePixelRatio,
        platform: navigator.platform
    });
    D.EK = {
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
    D.RW = {
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
    D.YZ = {
        "0": {
            proto: "http://",
            domain: D.RW
        },
        1: {
            proto: "https://",
            domain: D.EK
        },
        2: {
            proto: "https://",
            domain: D.EK
        }
    };
    window.BMAP_PROTOCOL && "https" === window.BMAP_PROTOCOL && (window.HOST_TYPE = 2);
    D.wt = window.HOST_TYPE || "0";
    D.url = D.YZ[D.wt];
    D.Io = D.url.proto + D.url.domain.baidumap + "/";
    D.ge = D.url.proto + ("2" == D.wt ? D.url.domain.main_domain_nocdn.other : D.url.domain.main_domain_nocdn.baidu) +
        "/";
    D.ka = D.url.proto + ("2" == D.wt ? D.url.domain.main_domain_cdn.other[0] : D.url.domain.main_domain_cdn.baidu[0]) +
        "/";
    D.Gi = D.url.proto + D.url.domain.main_domain_cdn.webmap[0] + "/";
    D.Nh = function (a, b) {
        var c, e, b = b || "";
        switch (a) {
        case "main_domain_nocdn":
            c = D.ge + b;
            break;
        case "main_domain_cdn":
            c = D.ka + b;
            break;
        default:
            e = D.url.domain[a], "[object Array]" == Object.prototype.toString.call(e) ? (c = [], z.bc.Hb(e, function (
                a, e) {
                c[e] = D.url.proto + a + "/" + b
            })) : c = D.url.proto + D.url.domain[a] + "/" + b
        }
        return c
    };

    function ub(a) {
        var b = {
            duration: 1E3,
            Bc: 30,
            ao: 0,
            Tb: vb.jL,
            Fs: u()
        };
        this.Of = [];
        if (a) for (var c in a) b[c] = a[c];
        this.j = b;
        if (Xa(b.ao)) {
            var e = this;
            setTimeout(function () {
                e.start()
            }, b.ao)
        } else b.ao != wb && this.start()
    }
    var wb = "INFINITE";
    ub.prototype.start = function () {
        this.Rt = bb();
        this.Ry = this.Rt + this.j.duration;
        xb(this)
    };
    ub.prototype.add = function (a) {
        this.Of.push(a)
    };

    function xb(a) {
        var b = bb();
        b >= a.Ry ? (Ya(a.j.va) && a.j.va(a.j.Tb(1)), Ya(a.j.finish) && a.j.finish(), 0 < a.Of.length && (b = a.Of[0],
            b.Of = [].concat(a.Of.slice(1)), b.start())) : (a.xx = a.j.Tb((b - a.Rt) / a.j.duration), Ya(a.j.va) && a.j
            .va(a.xx), a.rE || (a.cr = setTimeout(function () {
            xb(a)
        }, 1E3 / a.j.Bc)))
    }
    ub.prototype.stop = function (a) {
        this.rE = p;
        for (var b = 0; b < this.Of.length; b++) this.Of[b].stop(), this.Of[b] = q;
        this.Of.length = 0;
        this.cr && (clearTimeout(this.cr), this.cr = q);
        this.j.Fs(this.xx);
        a && (this.Ry = this.Rt, xb(this))
    };
    ub.prototype.cancel = fa(1);
    var vb = {
        jL: function (a) {
            return a
        },
        reverse: function (a) {
            return 1 - a
        },
        PB: function (a) {
            return a * a
        },
        NB: function (a) {
            return Math.pow(a, 3)
        },
        Ir: function (a) {
            return -(a * (a - 2))
        },
        xJ: function (a) {
            return Math.pow(a - 1, 3) + 1
        },
        OB: function (a) {
            return 0.5 > a ? 2 * a * a : -2 * (a - 2) * a - 1
        },
        j1: function (a) {
            return 0.5 > a ? 4 * Math.pow(a, 3) : 4 * Math.pow(a - 1, 3) + 1
        },
        k1: function (a) {
            return (1 - Math.cos(Math.PI * a)) / 2
        }
    };
    vb["ease-in"] = vb.PB;
    vb["ease-out"] = vb.Ir;
    var H = {
        PE: 34,
        QE: 21,
        RE: new O(21, 32),
        MN: new O(10, 32),
        LN: new O(24, 36),
        KN: new O(12, 36),
        NE: new O(13, 1),
        oa: D.ka + "images/",
        B2: "http://"+nginxIp+"/api0_map_bdimg"+"/images/",
        OE: D.ka + "images/markers_new.png",
        IN: 24,
        JN: 73,
        dB: {
            "\u5317\u4eac": {
                mx: "bj",
                k: new J(116.403874, 39.914889)
            },
            "\u4e0a\u6d77": {
                mx: "sh",
                k: new J(121.487899, 31.249162)
            },
            "\u6df1\u5733": {
                mx: "sz",
                k: new J(114.025974, 22.546054)
            },
            "\u5e7f\u5dde": {
                mx: "gz",
                k: new J(113.30765, 23.120049)
            }
        },
        fontFamily: "arial,sans-serif"
    };
    z.ca.Ie ? (z.extend(H, {
        jJ: "url(" + H.oa + "ruler.cur),crosshair",
        rc: "-moz-grab",
        vd: "-moz-grabbing"
    }), z.platform.XK && (H.fontFamily = "arial,simsun,sans-serif")) : z.ca.Gv || z.ca.wx ? z.extend(H, {
        jJ: "url(" + H.oa + "ruler.cur) 2 6,crosshair",
        rc: "url(" + H.oa + "openhand.cur) 8 8,default",
        vd: "url(" + H.oa + "closedhand.cur) 8 8,move"
    }) : z.extend(H, {
        jJ: "url(" + H.oa + "ruler.cur),crosshair",
        rc: "url(" + H.oa + "openhand.cur),default",
        vd: "url(" + H.oa + "closedhand.cur),move"
    });

    function yb(a, b) {
        var c = a.style;
        c.left = b[0] + "px";
        c.top = b[1] + "px"
    }
    function zb(a) {
        0 < z.ca.ia ? a.unselectable = "on" : a.style.MozUserSelect = "none"
    }
    function Ab(a) {
        return a && a.parentNode && 11 !== a.parentNode.nodeType
    }
    function Bb(a, b) {
        z.D.Lw(a, "beforeEnd", b);
        return a.lastChild
    }
    function Cb(a) {
        for (var b = {
            left: 0,
            top: 0
        }; a && a.offsetParent;) b.left += a.offsetLeft, b.top += a.offsetTop, a = a.offsetParent;
        return b
    }
    function na(a) {
        a = window.event || a;
        a.stopPropagation ? a.stopPropagation() : a.cancelBubble = p
    }
    function Db(a) {
        a = window.event || a;
        a.preventDefault ? a.preventDefault() : a.returnValue = t;
        return t
    }
    function pa(a) {
        na(a);
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
    function N(a, b, c) {
        var e = document.createElement(a);
        c && (e = document.createElementNS(c, a));
        return z.D.$D(e, b || {})
    }
    function Wa(a) {
        if (a.currentStyle) return a.currentStyle;
        if (a.ownerDocument && a.ownerDocument.defaultView) return a.ownerDocument.defaultView.getComputedStyle(a, q)
    }
    function Ya(a) {
        return "function" === typeof a
    }
    function Xa(a) {
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
        for (var b = "", c = 0; c < a.length; c++) {
            var e = a.charCodeAt(c) << 1,
                f = e = e.toString(2);
            8 > e.length && (f = "00000000" + e, f = f.substr(e.length, 8));
            b += f
        }
        a = 5 - b.length % 5;
        e = [];
        for (c = 0; c < a; c++) e[c] = "0";
        b = e.join("") + b;
        f = [];
        for (c = 0; c < b.length / 5; c++) e = b.substr(5 * c, 5), f.push(String.fromCharCode(parseInt(e, 2) + 50));
        return f.join("") + a.toString()
    }
    function Lb(a) {
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
    var Q = z.lang.Ht;

    function I() {
        return !(!z.platform.gD && !z.platform.mX && !z.platform.Xi)
    }
    function Va() {
        return !(!z.platform.XK && !z.platform.PK && !z.platform.sX)
    }
    function bb() {
        return (new Date).getTime()
    }
    function Mb() {
        var a = document.body.appendChild(N("div"));
        a.innerHTML = '<v:shape id="vml_tester1" adj="1" />';
        var b = a.firstChild;
        if (!b.style) return t;
        b.style.behavior = "url(#default#VML)";
        b = b ? "object" === typeof b.adj : p;
        a.parentNode.removeChild(a);
        return b
    }
    function Nb() {
        return !!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.1")
    }
    function Ob() {
        return !!N("canvas").getContext
    }
    function Pb(a) {
        return a * Math.PI / 180
    }
    D.yX = function () {
        var a = p,
            b = p,
            c = p,
            e = p,
            f = 0,
            g = 0,
            i = 0,
            k = 0;
        return {
            nP: function () {
                f += 1;
                a && (a = t, setTimeout(function () {
                    Sa(5054, {
                        pic: f
                    });
                    a = p;
                    f = 0
                }, 1E4))
            },
            O_: function () {
                g += 1;
                b && (b = t, setTimeout(function () {
                    Sa(5055, {
                        move: g
                    });
                    b = p;
                    g = 0
                }, 1E4))
            },
            Q_: function () {
                i += 1;
                c && (c = t, setTimeout(function () {
                    Sa(5056, {
                        zoom: i
                    });
                    c = p;
                    i = 0
                }, 1E4))
            },
            P_: function (a) {
                k += a;
                e && (e = t, setTimeout(function () {
                    Sa(5057, {
                        tile: k
                    });
                    e = p;
                    k = 0
                }, 5E3))
            }
        }
    }();
    D.up = {
        dF: "#83a1ff",
        wp: "#808080"
    };

    function Qb(a, b, c) {
        b.wD || (b.wD = [], b.handle = {});
        b.wD.push({
            filter: c,
            Pr: a
        });
        b.addEventListener || (b.addEventListener = function (a, c) {
            b.attachEvent("on" + a, c)
        });
        b.handle.click || (b.addEventListener("click", function (a) {
            for (var c = a.target || a.srcElement; c != b;) {
                Rb(b.wD, function (b, i) {
                    RegExp(i.filter).test(c.getAttribute("filter")) && i.Pr.call(c, a, c.getAttribute("filter"))
                });
                c = c.parentNode
            }
        }, t), b.handle.click = p)
    }
    function Rb(a, b) {
        for (var c = 0, e = a.length; c < e; c++) b(c, a[c])
    }
    void
    function (a, b, c) {
        void
        function (a, b, c) {
            function i(a) {
                if (!a.$n) {
                    for (var c = p, e = [], g = a.wY, k = 0; g && k < g.length; k++) {
                        var m = g[k],
                            n = ja[m] = ja[m] || {};
                        if (n.$n || n == a) e.push(n.Gc);
                        else {
                            c = t;
                            if (!n.GU && (m = (ya.get("alias") || {})[m] || m + ".js", !P[m])) {
                                P[m] = p;
                                var o = b.createElement("script"),
                                    s = b.getElementsByTagName("script")[0];
                                o.async = p;
                                o.src = m;
                                s.parentNode.insertBefore(o, s)
                            }
                            n.Qx = n.Qx || {};
                            n.Qx[a.name] = a
                        }
                    }
                    if (c) {
                        a.$n = p;
                        a.eJ && (a.Gc = a.eJ.apply(a, e));
                        for (var v in a.Qx) i(a.Qx[v])
                    }
                }
            }
            function k(a) {
                return (a || new Date) - F
            }
            function m(a, b, c) {
                if (a) {
                    "string" == typeof a && (c = b, b = a, a = L);
                    try {
                        a == L ? (M[b] = M[b] || [], M[b].unshift(c)) : a.addEventListener ? a.addEventListener(b, c, t) :
                            a.attachEvent && a.attachEvent("on" + b, c)
                    } catch (e) {}
                }
            }
            function n(a, b, c) {
                if (a) {
                    "string" == typeof a && (c = b, b = a, a = L);
                    try {
                        if (a == L) {
                            var e = M[b];
                            if (e) for (var f = e.length; f--;) e[f] === c && e.splice(f, 1)
                        } else a.removeEventListener ? a.removeEventListener(b, c, t) : a.detachEvent && a.detachEvent(
                                "on" + b, c)
                    } catch (g) {}
                }
            }
            function o(a) {
                var b = M[a],
                    c = 0;
                if (b) {
                    for (var e = [], f = arguments, g = 1; g < f.length; g++) e.push(f[g]);
                    for (g = b.length; g--;) b[g].apply(this, e) && c++;
                    return c
                }
            }
            function s(a, b) {
                if (a && b) {
                    var c = new Image(1, 1),
                        e = [],
                        f = "img_" + +new Date,
                        g;
                    for (g in b) b[g] && e.push(g + "=" + encodeURIComponent(b[g]));
                    L[f] = c;
                    c.onload = c.onerror = function () {
                        L[f] = c = c.onload = c.onerror = q;
                        delete L[f]
                    };
                    c.src = a + "?" + e.join("&")
                }
            }
            function v() {
                var a = arguments,
                    b = a[0];
                if (this.dJ || /^(on|un|set|get|create)$/.test(b)) {
                    for (var b = y.prototype[b], c = [], e = 1, f = a.length; e < f; e++) c.push(a[e]);
                    "function" == typeof b && b.apply(this, c)
                } else this.CI.push(a)
            }
            function x(a, b) {
                var c = {}, e;
                for (e in a) a.hasOwnProperty(e) && (c[e] = a[e]);
                for (e in b) b.hasOwnProperty(e) && (c[e] = b[e]);
                return c
            }
            function y(a) {
                this.name = a;
                this.Nr = {
                    protocolParameter: {
                        postUrl: q,
                        protocolParameter: q
                    }
                };
                this.CI = [];
                this.alog = L
            }
            function A(a) {
                a = a || "default";
                if ("*" == a) {
                    var a = [],
                        b;
                    for (b in V) a.push(V[b]);
                    return a
                }(b = V[a]) || (b = V[a] = new y(a));
                return b
            }
            var C = c.alog;
            if (!C || !C.$n) {
                var B = b.all && a.attachEvent,
                    F = C && C.oD || +new Date,
                    E = a.T2 || (+new Date).toString(36) + Math.random().toString(36).substr(2, 3),
                    G = 0,
                    P = {}, L = function (a) {
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
                            "require" == a && (c && !f && (f = [c]), c = q);
                            c = !c ? "#" + G++ : c;
                            e = ja[c] = ja[c] || {};
                            e.$n || (e.name = c, e.wY = f, e.eJ = g, "define" == a && (e.GU = p), i(e))
                        } else "function" == typeof a ? a(L) : ("" + a).replace(/^(?:([\w$_]+)\.)?(\w+)$/, function (a,
                                c, e) {
                                b[0] = e;
                                v.apply(L.BE(c), b)
                            })
                    }, M = {}, V = {}, ja = {
                        D0: {
                            name: "alog",
                            $n: p,
                            Gc: L
                        }
                    };
                y.prototype.start = y.prototype.create = function (a) {
                    if (!this.dJ) {
                        "object" == typeof a && this.set(a);
                        this.dJ = new Date;
                        for (this.Or("create", this); a = this.CI.shift();) v.apply(this, a)
                    }
                };
                y.prototype.send = function (a, b) {
                    var c = x({
                        ts: k().toString(36),
                        t: a,
                        sid: E
                    }, this.Nr);
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
                    this.Or("send", c);
                    var f;
                    if (e = this.Nr.protocolParameter) {
                        var g = {};
                        for (f in c) e[f] !== q && (g[e[f] || f] = c[f]);
                        f = g
                    } else f = c;
                    s(this.Nr.postUrl, f)
                };
                y.prototype.set = function (a, b) {
                    if ("string" == typeof a) "protocolParameter" == a && (b = x({
                            postUrl: q,
                            protocolParameter: q
                        }, b)), this.Nr[a] = b;
                    else if ("object" == typeof a) for (var c in a) this.set(c, a[c])
                };
                y.prototype.get = function (a, b) {
                    var c = this.Nr[a];
                    "function" == typeof b && b(c);
                    return c
                };
                y.prototype.Or = function (a, b) {
                    return L.Or(this.name + "." + a, b)
                };
                y.prototype.M = function (a, b) {
                    L.M(this.name + "." + a, b)
                };
                y.prototype.Wc = function (a, b) {
                    L.Wc(this.name + "." + a, b)
                };
                L.name = "alog";
                L.tk = E;
                L.$n = p;
                L.timestamp = k;
                L.Wc = n;
                L.M = m;
                L.Or = o;
                L.BE = A;
                L("init");
                var la = y.prototype;
                T(la, {
                    start: la.start,
                    create: la.create,
                    send: la.send,
                    set: la.set,
                    get: la.get,
                    on: la.M,
                    un: la.Wc,
                    fire: la.Or
                });
                var ya = A();
                ya.set("protocolParameter", {
                    C0: q
                });
                if (C) {
                    la = [].concat(C.sb || [], C.Ms || []);
                    C.sb = C.Ms = q;
                    for (var Ea in L) L.hasOwnProperty(Ea) && (C[Ea] = L[Ea]);
                    L.sb = L.Ms = {
                        push: function (a) {
                            L.apply(L, a)
                        }
                    };
                    for (C = 0; C < la.length; C++) L.apply(L, la[C])
                }
                c.alog = L;
                B && m(b, "mouseup", function (a) {
                    a = a.target || a.srcElement;
                    1 == a.nodeType && /^ajavascript:/i.test(a.tagName + a.href)
                });
                var va = t;
                a.onerror = function (a, b, e, f) {
                    var i = p;
                    !b && /^script error/i.test(a) && (va ? i = t : va = p);
                    i && c.alog("exception.send", "exception", {
                        Bs: a,
                        nD: b,
                        xs: e,
                        Dl: f
                    });
                    return t
                };
                c.alog("exception.on", "catch", function (a) {
                    c.alog("exception.send", "exception", {
                        Bs: a.Bs,
                        nD: a.path,
                        xs: a.xs,
                        method: a.method,
                        HJ: "catch"
                    })
                })
            }
        }(a, b, c);
        void
        function (a, b, c) {
            var i = "18_3";
            I() && (i = "18_4");
            var k = "http://static.tieba.baidu.com";
            "https:" === a.location.protocol && (k = "https://gsp0.baidu.com/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK");
            var m = Math.random,
                k = k + "/tb/pms/img/st.gif",
                n = {
                    bh: "0.1"
                }, o = {
                    bh: "0.1"
                }, s = {
                    bh: "0.1"
                }, v = {
                    bh: "0"
                };
            if (n && n.bh && m() < n.bh) {
                var x = c.alog.BE("monkey"),
                    y, n = a.screen,
                    A = b.referrer;
                x.set("ver", 5);
                x.set("pid", 241);
                n && x.set("px", n.width + "*" + n.height);
                x.set("ref", A);
                c.alog("monkey.on", "create", function () {
                    y = c.alog.timestamp;
                    x.set("protocolParameter", {
                        reports: q
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
            if (o && o.bh && m() < o.bh) {
                var C = t;
                a.onerror = function (a, b, e, f) {
                    var i = p;
                    !b && /^script error/i.test(a) && (C ? i = t : C = p);
                    i && c.alog("exception.send", "exception", {
                        Bs: a,
                        nD: b,
                        xs: e,
                        Dl: f
                    });
                    return t
                };
                c.alog("exception.on", "catch", function (a) {
                    c.alog("exception.send", "exception", {
                        Bs: a.Bs,
                        nD: a.path,
                        xs: a.xs,
                        method: a.method,
                        HJ: "catch"
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
            s && (s.bh && m() < s.bh) && (c.alog("cus.on", "time", function (a) {
                var b = {}, e = t,
                    f;
                if ("[object Object]" === a.toString()) {
                    for (var i in a) "page" == i ? b.page = a[i] : (f = parseInt(a[i]), 0 < f && /^z_/.test(i) && (e =
                            p, b[i] = f));
                    e && c.alog("cus.send", "time", b)
                }
            }), c.alog("cus.on", "count", function (a) {
                var b = {}, e = t;
                "string" === typeof a && (a = [a]);
                if (a instanceof Array) for (var f = 0; f < a.length; f++) /^z_/.test(a[f]) ? (e = p, b[a[f]] = 1) :
                            /^page:/.test(a[f]) && (b.page = a[f].substring(5));
                e && c.alog("cus.send", "count", b)
            }), c.alog("cus.create", {
                dv: 3,
                postUrl: k,
                page: i,
                p: "18"
            }));
            if (v && v.bh && m() < v.bh) {
                var B = ["Moz", "O", "ms", "Webkit"],
                    F = ["-webkit-", "-moz-", "-o-", "-ms-"],
                    E = function () {
                        return typeof b.createElement !== "function" ? b.createElement(arguments[0]) : b.createElement.apply(
                            b, arguments)
                    }, G = E("dpFeatureTest").style,
                    P = function (a) {
                        return L(a, l, l)
                    }, L = function (a, b, c) {
                        var e = a.charAt(0).toUpperCase() + a.slice(1),
                            f = (a + " " + B.join(e + " ") + e).split(" ");
                        if (typeof b === "string" || typeof b === "undefined") return M(f, b);
                        f = (a + " " + B.join(e + " ") + e).split(" ");
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
                    }, M = function (a, b) {
                        var c, e, f;
                        e = a.length;
                        for (c = 0; c < e; c++) {
                            f = a[c];~
                            ("" + f).indexOf("-") && (f = V(f));
                            if (G[f] !== l) return b == "pfx" ? f : p
                        }
                        return t
                    }, V = function (a) {
                        return a.replace(/([a-z])-([a-z])/g, function (a, b, c) {
                            return b + c.toUpperCase()
                        }).replace(/^-/, "")
                    }, ja = function (a, b, c) {
                        if (a.indexOf("@") === 0) return atRule(a);
                        a.indexOf("-") != -1 && (a = V(a));
                        return !b ? L(a, "pfx") : L(a, b, c)
                    }, la = function () {
                        var a = E("canvas");
                        return !(!a.getContext || !a.getContext("2d"))
                    }, ya = function () {
                        var a = E("div");
                        return "draggable" in a || "ondragstart" in a && "ondrop" in a
                    }, Ea = function () {
                        try {
                            localStorage.setItem("localStorage", "localStorage");
                            localStorage.removeItem("localStorage");
                            return p
                        } catch (a) {
                            return t
                        }
                    }, va = function () {
                        return "content" in b.createElement("template")
                    }, oa = function () {
                        return "createShadowRoot" in b.createElement("a")
                    }, gb = function () {
                        return "registerElement" in b
                    }, nb = function () {
                        return "import" in b.createElement("link")
                    }, re = function () {
                        return "getItems" in b
                    }, Oc = function () {
                        return "EventSource" in window
                    }, se = function (a, b) {
                        var c = new Image;
                        c.onload = function () {
                            b(a, c.width > 0 && c.height > 0)
                        };
                        c.onerror = function () {
                            b(a, t)
                        };
                        c.src = "data:image/webp;base64," + {
                            W2: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
                            V2: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
                            alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
                            Mj: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
                        }[a]
                    }, te = function (a, b) {
                        return Vb.Jh["WebP-" + a] = b
                    }, Ci = function () {
                        return "openDatabase" in a
                    }, Di = function () {
                        return "performance" in a && "timing" in a.performance
                    }, Ei = function () {
                        return "performance" in a && "mark" in a.performance
                    }, Fi = function () {
                        return !(!Array.prototype || !Array.prototype.every || !Array.prototype.filter || !Array.prototype
                            .forEach || !Array.prototype.indexOf || !Array.prototype.lastIndexOf || !Array.prototype.map || !
                            Array.prototype.some || !Array.prototype.reduce || !Array.prototype.reduceRight || !Array.isArray)
                    }, Gi = function () {
                        return "Promise" in a && "cast" in a.xp && "resolve" in a.xp && "reject" in a.xp && "all" in a.xp &&
                            "race" in a.xp && function () {
                            var b;
                            new a.xp(function (a) {
                                b = a
                            });
                            return typeof b === "function"
                        }()
                    }, Hi = function () {
                        var b = !! a.B_,
                            c = a.XMLHttpRequest && "withCredentials" in new XMLHttpRequest;
                        return !!a.F_ && b && c
                    }, Ii = function () {
                        return "geolocation" in navigator
                    }, Ji = function () {
                        var b = E("canvas"),
                            c = "probablySupportsContext" in b ? "probablySupportsContext" : "supportsContext";
                        return c in b ? b[c]("webgl") || b[c]("experimental-webgl") : "WebGLRenderingContext" in a
                    }, Ki = function () {
                        return !!b.createElementNS && !! b.createElementNS("http://www.w3.org/2000/svg", "svg").X0
                    }, Li = function () {
                        return !!a.M_
                    }, Mi = function () {
                        return "WebSocket" in a && a.J_.y_ === 2
                    }, Ni = function () {
                        return !!b.createElement("video").canPlayType
                    }, Oi = function () {
                        return !!b.createElement("audio").canPlayType
                    }, Pi = function () {
                        return !!(a.history && "pushState" in a.history)
                    }, Qi = function () {
                        return !(!a.z_ || !a.A_)
                    }, Ri = function () {
                        return "postMessage" in window
                    }, Si = function () {
                        return !!a.webkitNotifications || "Notification" in a && "permission" in a.fO &&
                            "requestPermission" in a.fO
                    }, Ti = function () {
                        for (var b = ["webkit", "moz", "o", "ms"], c = a.requestAnimationFrame, f = 0; f < b.length && !
                            c; ++f) c = a[b[f] + "RequestAnimationFrame"];
                        return !!c
                    }, Ui = function () {
                        return "JSON" in a && "parse" in JSON && "stringify" in JSON
                    }, Vi = function () {
                        return !(!ja("exitFullscreen", b, t) && !ja("cancelFullScreen", b, t))
                    }, Wi = function () {
                        return !!ja("Intl", a)
                    }, Xi = function () {
                        return P("flexBasis")
                    }, Yi = function () {
                        return !!P("perspective")
                    }, Zi = function () {
                        return P("shapeOutside")
                    }, $i = function () {
                        var a = E("div");
                        a.style.cssText = F.join("filter:blur(2px); ");
                        return !!a.style.length && (b.documentMode === l || b.documentMode > 9)
                    }, aj = function () {
                        return "XMLHttpRequest" in a && "withCredentials" in new XMLHttpRequest
                    }, bj = function () {
                        return E("progress").max !== l
                    }, cj = function () {
                        return E("meter").max !== l
                    }, dj = function () {
                        return "sendBeacon" in navigator
                    }, ej = function () {
                        return P("borderRadius")
                    }, fj = function () {
                        return P("boxShadow")
                    }, gj = function () {
                        var a = E("div").style;
                        a.cssText = F.join("opacity:.55;");
                        return /^0.55$/.test(a.opacity)
                    }, hj = function () {
                        return M(["textShadow"], l)
                    }, ij = function () {
                        return P("animationName")
                    }, jj = function () {
                        return P("transition")
                    }, kj = function () {
                        return navigator.userAgent.indexOf("Android 2.") === -1 && P("transform")
                    }, Vb = {
                        Jh: {},
                        na: function (a, b, c) {
                            this.Jh[a] = b.apply(this, [].slice.call(arguments, 2))
                        },
                        sd: function (a, b) {
                            a.apply(this, [].slice.call(arguments, 1))
                        },
                        BY: function () {
                            this.na("bdrs", ej);
                            this.na("bxsd", fj);
                            this.na("opat", gj);
                            this.na("txsd", hj);
                            this.na("anim", ij);
                            this.na("trsi", jj);
                            this.na("trfm", kj);
                            this.na("flex", Xi);
                            this.na("3dtr", Yi);
                            this.na("shpe", Zi);
                            this.na("fltr", $i);
                            this.na("cavs", la);
                            this.na("dgdp", ya);
                            this.na("locs", Ea);
                            this.na("wctem", va);
                            this.na("wcsdd", oa);
                            this.na("wccse", gb);
                            this.na("wchti", nb);
                            this.sd(se, "lossy", te);
                            this.sd(se, "lossless", te);
                            this.sd(se, "alpha", te);
                            this.sd(se, "animation", te);
                            this.na("wsql", Ci);
                            this.na("natm", Di);
                            this.na("ustm", Ei);
                            this.na("arra", Fi);
                            this.na("prms", Gi);
                            this.na("xhr2", Hi);
                            this.na("wbgl", Ji);
                            this.na("geol", Ii);
                            this.na("svg", Ki);
                            this.na("work", Li);
                            this.na("wbsk", Mi);
                            this.na("vido", Ni);
                            this.na("audo", Oi);
                            this.na("hsty", Pi);
                            this.na("file", Qi);
                            this.na("psmg", Ri);
                            this.na("wknf", Si);
                            this.na("rqaf", Ti);
                            this.na("json", Ui);
                            this.na("flsc", Vi);
                            this.na("i18n", Wi);
                            this.na("cors", aj);
                            this.na("prog", bj);
                            this.na("metr", cj);
                            this.na("becn", dj);
                            this.na("mcrd", re);
                            this.na("esrc", Oc)
                        }
                    }, x = c.alog.BE("feature");
                x.M("commit", function () {
                    Vb.BY();
                    var a = setInterval(function () {
                        if ("WebP-lossy" in Vb.Jh && "WebP-lossless" in Vb.Jh && "WebP-alpha" in Vb.Jh &&
                            "WebP-animation" in Vb.Jh) {
                            for (var b in Vb.Jh) Vb.Jh[b] = Vb.Jh[b] ? "y" : "n";
                            x.send("feature", Vb.Jh);
                            clearInterval(a)
                        }
                    }, 500)
                });
                c.alog("feature.create", {
                    h1: 4,
                    A3: k,
                    page: i,
                    sb: "18"
                });
                c.alog("feature.fire", "commit")
            }
        }(a, b, c)
    }(window, document, D);
    D.Ep = D.alog || u();
    D.alog("cus.fire", "count", "z_loadscriptcount");
    "https:" === location.protocol && D.alog("cus.fire", "count", "z_httpscount");

    function Sb(a) {
        var b = window.TILE_VERSION,
            c = "20170927";
        b && b.ditu && (b = b.ditu, b[a] && b[a].updateDate && (c = b[a].updateDate));
        return c
    };

    function qa(a, b) {
        if (b) {
            var c = (1E5 * Math.random()).toFixed(0);
            D._rd["_cbk" + c] = function (a) {
                b && b(a);
                delete D._rd["_cbk" + c]
            };
            a += "&callback=BMap._rd._cbk" + c
        }
        var e = N("script", {
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
            e = q
        }, 1)
    };
    var Tb = {
        map: "kqxukj",
        common: "fejbwe",
        style: "x1xxh3",
        tile: "xix3pa",
        groundoverlay: "aq2bhb",
        pointcollection: "hdecpl",
        marker: "nxclo0",
        symbol: "ly3oog",
        canvablepath: "nm5m24",
        vmlcontext: "aukkzm",
        markeranimation: "kvdfq4",
        poly: "pn1k2q",
        draw: "auobje",
        drawbysvg: "q3ry3t",
        drawbyvml: "0gnm4d",
        drawbycanvas: "cfa12h",
        infowindow: "1dmznp",
        oppc: "x2e4mo",
        opmb: "g2bx2e",
        menu: "tmjb5q",
        control: "1qo0sj",
        navictrl: "k0130b",
        geoctrl: "ih5fm0",
        copyrightctrl: "y43wpe",
        citylistcontrol: "mkccq0",
        scommon: "eg1i1g",
        local: "ilgegs",
        route: "4ujiej",
        othersearch: "ihxpzv",
        mapclick: "wg01zg",
        buslinesearch: "1sd33t",
        hotspot: "4hzsec",
        autocomplete: "q5dpd4",
        coordtrans: "htb2yu",
        coordtransutils: "ge13di",
        convertor: "i2oavo",
        clayer: "ob1udw",
        pservice: "k0u4po",
        pcommon: "t1uifm",
        panorama: "yjky0y",
        panoramaflash: "q3kruw"
    };
    z.Jx = function () {
        function a(a) {
            return e && !! c[b + a + "_" + Tb[a]]
        }
        var b = "BMap_",
            c = window.localStorage,
            e = "localStorage" in window && c !== q && c !== l;
        return {
            nX: e,
            set: function (a, g) {
                if (e) {
                    for (var i = b + a + "_", k = c.length, m; k--;) m = c.key(k), -1 < m.indexOf(i) && c.removeItem(m);
                    try {
                        c.setItem(b + a + "_" + Tb[a], g)
                    } catch (n) {
                        c.clear()
                    }
                }
            },
            get: function (f) {
                return e && a(f) ? c.getItem(b + f + "_" + Tb[f]) : t
            },
            OI: a
        }
    }();

    function K() {}
    z.object.extend(K, {
        hj: {
            eF: -1,
            tO: 0,
            pp: 1
        },
        VJ: function () {
            var a = "canvablepath";
            if (!I() || !Ob()) Nb() || (Mb() ? a = "vmlcontext" : Ob());
            return {
                tile: ["style"],
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
        D3: {},
        XE: {
            CO: D.ka + "getmodules?v=3.0",
            ZS: 5E3
        },
        wB: t,
        Fd: {
            Yk: {},
            Mm: [],
            Xu: []
        },
        load: function (a, b, c) {
            var e = this.gb(a);
            if (e.Ce == this.hj.pp) c && b();
            else {
                if (e.Ce == this.hj.eF) {
                    this.UI(a);
                    this.iM(a);
                    var f = this;
                    f.wB == t && (f.wB = p, setTimeout(function () {
                        for (var a = [], b = 0, c = f.Fd.Mm.length; b < c; b++) {
                            var e = f.Fd.Mm[b],
                                n = "";
                            ha.Jx.OI(e) ? n = ha.Jx.get(e) : (n = "", a.push(e + "_" + Tb[e]));
                            f.Fd.Xu.push({
                                zL: e,
                                AD: n
                            })
                        }
                        f.wB = t;
                        f.Fd.Mm.length = 0;
                        0 == a.length ? f.DJ() : qa(f.XE.CO + "&mod=" + a.join(","))
                    }, 1));
                    e.Ce = this.hj.tO
                }
                e.Vt.push(b)
            }
        },
        UI: function (a) {
            if (a && this.VJ()[a]) for (var a = this.VJ()[a], b = 0; b < a.length; b++) this.UI(a[b]), this.Fd.Yk[a[b]] ||
                        this.iM(a[b])
        },
        iM: function (a) {
            for (var b = 0; b < this.Fd.Mm.length; b++) if (this.Fd.Mm[b] == a) return;
            this.Fd.Mm.push(a)
        },
        AY: function (a, b) {
            var c = this.gb(a);
            try {
                eval(b)
            } catch (e) {
                return
            }
            c.Ce = this.hj.pp;
            for (var f = 0, g = c.Vt.length; f < g; f++) c.Vt[f]();
            c.Vt.length = 0
        },
        OI: function (a, b) {
            var c = this;
            c.timeout = setTimeout(function () {
                c.Fd.Yk[a].Ce != c.hj.pp ? (c.remove(a), c.load(a, b)) : clearTimeout(c.timeout)
            }, c.XE.ZS)
        },
        gb: function (a) {
            this.Fd.Yk[a] || (this.Fd.Yk[a] = {}, this.Fd.Yk[a].Ce = this.hj.eF, this.Fd.Yk[a].Vt = []);
            return this.Fd.Yk[a]
        },
        remove: function (a) {
            delete this.gb(a)
        },
        YT: function (a, b) {
            for (var c = this.Fd.Xu, e = p, f = 0, g = c.length; f < g; f++) "" == c[f].AD && (c[f].zL == a ? c[f].AD =
                    b : e = t);
            e && this.DJ()
        },
        DJ: function () {
            for (var a = this.Fd.Xu, b = 0, c = a.length; b < c; b++) this.AY(a[b].zL, a[b].AD);
            this.Fd.Xu.length = 0
        }
    });

    function R(a, b) {
        this.x = a || 0;
        this.y = b || 0;
        this.x = this.x;
        this.y = this.y
    }
    R.prototype.fc = function (a) {
        return a && a.x == this.x && a.y == this.y
    };

    function O(a, b) {
        this.width = a || 0;
        this.height = b || 0
    }
    O.prototype.fc = function (a) {
        return a && this.width == a.width && this.height == a.height
    };

    function jb(a, b) {
        a && (this.Fb = a, this.aa = "spot" + jb.aa++, b = b || {}, this.Fg = b.text || "", this.Du = b.offsets ? b.offsets
            .slice(0) : [5, 5, 5, 5], this.dI = b.userData || q, this.rh = b.minZoom || q, this.vf = b.maxZoom || q)
    }
    jb.aa = 0;
    z.extend(jb.prototype, {
        ta: function (a) {
            this.rh == q && (this.rh = a.K.Yb);
            this.vf == q && (this.vf = a.K.gc)
        },
        qa: function (a) {
            a instanceof J && (this.Fb = a)
        },
        fa: w("Fb"),
        Ys: ba("Fg"),
        MC: w("Fg"),
        setUserData: ba("dI"),
        getUserData: w("dI")
    });

    function Ub() {
        this.B = q;
        this.Gb = "control";
        this.Na = this.HI = p
    }
    z.lang.sa(Ub, z.lang.Ca, "Control");
    z.extend(Ub.prototype, {
        initialize: function (a) {
            this.B = a;
            if (this.C) return a.Ta.appendChild(this.C), this.C
        },
        xe: function (a) {
            !this.C && (this.initialize && Ya(this.initialize)) && (this.C = this.initialize(a));
            this.j = this.j || {
                mg: t
            };
            this.vA();
            this.Sq();
            this.C && (this.C.rq = this)
        },
        vA: function () {
            var a = this.C;
            if (a) {
                var b = a.style;
                b.position = "absolute";
                b.zIndex = this.qy || "10";
                b.MozUserSelect = "none";
                b.WebkitTextSizeAdjust = "none";
                this.j.mg || z.D.Ya(a, "BMap_noprint");
                I() || z.M(a, "contextmenu", pa)
            }
        },
        remove: function () {
            this.B = q;
            this.C && (this.C.parentNode && this.C.parentNode.removeChild(this.C), this.C = this.C.rq = q)
        },
        Aa: function () {
            this.C = Bb(this.B.Ta, "<div unselectable='on'></div>");
            this.Na == t && z.D.U(this.C);
            return this.C
        },
        Sq: function () {
            this.nc(this.j.anchor)
        },
        nc: function (a) {
            if (this.E0 || !Xa(a) || isNaN(a) || a < Wb || 3 < a) a = this.defaultAnchor;
            this.j = this.j || {
                mg: t
            };
            this.j.za = this.j.za || this.defaultOffset;
            var b = this.j.anchor;
            this.j.anchor = a;
            if (this.C) {
                var c = this.C,
                    e = this.j.za.width,
                    f = this.j.za.height;
                c.style.left = c.style.top = c.style.right = c.style.bottom = "auto";
                switch (a) {
                case Wb:
                    c.style.top = f + "px";
                    c.style.left = e + "px";
                    break;
                case Xb:
                    c.style.top = f + "px";
                    c.style.right = e + "px";
                    break;
                case Yb:
                    c.style.bottom = f + "px";
                    c.style.left = e + "px";
                    break;
                case 3:
                    c.style.bottom = f + "px", c.style.right = e + "px"
                }
                c = ["TL", "TR", "BL", "BR"];
                z.D.mc(this.C, "anchor" + c[b]);
                z.D.Ya(this.C, "anchor" + c[a])
            }
        },
        oC: function () {
            return this.j.anchor
        },
        getContainer: w("C"),
        Zd: function (a) {
            a instanceof O && (this.j = this.j || {
                mg: t
            }, this.j.za = new O(a.width, a.height), this.C && this.nc(this.j.anchor))
        },
        Qi: function () {
            return this.j.za
        },
        yd: w("C"),
        show: function () {
            this.Na != p && (this.Na = p, this.C && z.D.show(this.C))
        },
        U: function () {
            this.Na != t && (this.Na = t, this.C && z.D.U(this.C))
        },
        isPrintable: function () {
            return !!this.j.mg
        },
        Hc: function () {
            return !this.C && !this.B ? t : !! this.Na
        }
    });
    var Wb = 0,
        Xb = 1,
        Yb = 2;

    function kb(a) {
        Ub.call(this);
        a = a || {};
        this.j = {
            mg: t,
            lE: a.showZoomInfo || p,
            anchor: a.anchor,
            za: a.offset,
            type: a.type,
            kV: a.enableGeolocation || t
        };
        this.defaultAnchor = I() ? 3 : Wb;
        this.defaultOffset = new O(10, 10);
        this.nc(a.anchor);
        this.wm(a.type);
        this.nf()
    }
    z.lang.sa(kb, Ub, "NavigationControl");
    z.extend(kb.prototype, {
        initialize: function (a) {
            this.B = a;
            return this.C
        },
        wm: function (a) {
            this.j.type = Xa(a) && 0 <= a && 3 >= a ? a : 0
        },
        yo: function () {
            return this.j.type
        },
        nf: function () {
            var a = this;
            K.load("navictrl", function () {
                a.mf()
            })
        }
    });

    function Zb(a) {
        Ub.call(this);
        a = a || {};
        this.j = {
            anchor: a.anchor || Yb,
            za: a.offset || new O(10, 30),
            kZ: a.showAddressBar !== t,
            m1: a.enableAutoLocation || t,
            rL: a.locationIcon || q
        };
        var b = this;
        this.qy = 1200;
        b.a_ = [];
        this.ee = [];
        K.load("geoctrl", function () {
            (function e() {
                if (0 !== b.ee.length) {
                    var a = b.ee.shift();
                    b[a.method].apply(b, a.arguments);
                    e()
                }
            })();
            b.BO()
        });
        Sa(La)
    }
    z.lang.sa(Zb, Ub, "GeolocationControl");
    z.extend(Zb.prototype, {
        location: function () {
            this.ee.push({
                method: "location",
                arguments: arguments
            })
        },
        getAddressComponent: ca(q)
    });

    function $b(a) {
        Ub.call(this);
        a = a || {};
        this.j = {
            mg: t,
            anchor: a.anchor,
            za: a.offset
        };
        this.Vb = [];
        this.defaultAnchor = Yb;
        this.defaultOffset = new O(5, 2);
        this.nc(a.anchor);
        this.HI = t;
        this.nf()
    }
    z.lang.sa($b, Ub, "CopyrightControl");
    z.object.extend($b.prototype, {
        initialize: function (a) {
            this.B = a;
            return this.C
        },
        uv: function (a) {
            if (a && Xa(a.id) && !isNaN(a.id)) {
                var b = {
                    bounds: q,
                    content: ""
                }, c;
                for (c in a) b[c] = a[c];
                if (a = this.Ll(a.id)) for (var e in b) a[e] = b[e];
                else this.Vb.push(b)
            }
        },
        Ll: function (a) {
            for (var b = 0, c = this.Vb.length; b < c; b++) if (this.Vb[b].id == a) return this.Vb[b]
        },
        vC: w("Vb"),
        PD: function (a) {
            for (var b = 0, c = this.Vb.length; b < c; b++) this.Vb[b].id == a && (r = this.Vb.splice(b, 1), b--, c =
                    this.Vb.length)
        },
        nf: function () {
            var a = this;
            K.load("copyrightctrl", function () {
                a.mf()
            })
        }
    });

    function mb(a) {
        Ub.call(this);
        a = a || {};
        this.j = {
            mg: t,
            size: a.size || new O(150, 150),
            padding: 5,
            Ua: a.isOpen === p ? p : t,
            s_: 4,
            za: a.offset,
            anchor: a.anchor
        };
        this.defaultAnchor = 3;
        this.defaultOffset = new O(0, 0);
        this.Jp = this.Kp = 13;
        this.nc(a.anchor);
        this.se(this.j.size);
        this.nf()
    }
    z.lang.sa(mb, Ub, "OverviewMapControl");
    z.extend(mb.prototype, {
        initialize: function (a) {
            this.B = a;
            return this.C
        },
        nc: function (a) {
            Ub.prototype.nc.call(this, a)
        },
        ie: function () {
            this.ie.xn = p;
            this.j.Ua = !this.j.Ua;
            this.C || (this.ie.xn = t)
        },
        se: function (a) {
            a instanceof O || (a = new O(150, 150));
            a.width = 0 < a.width ? a.width : 150;
            a.height = 0 < a.height ? a.height : 150;
            this.j.size = a
        },
        yb: function () {
            return this.j.size
        },
        Ua: function () {
            return this.j.Ua
        },
        nf: function () {
            var a = this;
            K.load("control", function () {
                a.mf()
            })
        }
    });

    function ac(a) {
        Ub.call(this);
        a = a || {};
        this.defaultAnchor = Wb;
        this.WT = a.canCheckSize === t ? t : p;
        this.Ii = "";
        this.defaultOffset = new O(10, 10);
        this.onChangeBefore = [];
        this.onChangeAfter = [];
        this.onChangeSuccess = [];
        this.j = {
            mg: t,
            za: a.offset || this.defaultOffset,
            anchor: a.anchor || this.defaultAnchor,
            expand: !! a.expand
        };
        a.onChangeBefore && Ya(a.onChangeBefore) && this.onChangeBefore.push(a.onChangeBefore);
        a.onChangeAfter && Ya(a.onChangeAfter) && this.onChangeAfter.push(a.onChangeAfter);
        a.onChangeSuccess && Ya(a.onChangeSuccess) && this.onChangeSuccess.push(a.onChangeSuccess);
        this.nc(a.anchor);
        this.nf()
    }
    z.lang.sa(ac, Ub, "CityListControl");
    z.object.extend(ac.prototype, {
        initialize: function (a) {
            this.B = a;
            return this.C
        },
        nf: function () {
            var a = this;
            K.load("citylistcontrol", function () {
                a.mf()
            }, p)
        }
    });

    function lb(a) {
        Ub.call(this);
        a = a || {};
        this.j = {
            mg: t,
            color: "black",
            Xc: "metric",
            za: a.offset
        };
        this.defaultAnchor = Yb;
        this.defaultOffset = new O(81, 18);
        this.nc(a.anchor);
        this.Ah = {
            metric: {
                name: "metric",
                WI: 1,
                JK: 1E3,
                qN: "\u7c73",
                rN: "\u516c\u91cc"
            },
            us: {
                name: "us",
                WI: 3.2808,
                JK: 5280,
                qN: "\u82f1\u5c3a",
                rN: "\u82f1\u91cc"
            }
        };
        this.Ah[this.j.Xc] || (this.j.Xc = "metric");
        this.BH = q;
        this.aH = {};
        this.nf()
    }
    z.lang.sa(lb, Ub, "ScaleControl");
    z.object.extend(lb.prototype, {
        initialize: function (a) {
            this.B = a;
            return this.C
        },
        ok: function (a) {
            this.j.color = a + ""
        },
        I1: function () {
            return this.j.color
        },
        hE: function (a) {
            this.j.Xc = this.Ah[a] && this.Ah[a].name || this.j.Xc
        },
        GW: function () {
            return this.j.Xc
        },
        nf: function () {
            var a = this;
            K.load("control", function () {
                a.mf()
            })
        }
    });
    var bc = 0;

    function ob(a) {
        Ub.call(this);
        a = a || {};
        this.defaultAnchor = Xb;
        this.defaultOffset = new O(10, 10);
        this.j = {
            mg: t,
            Vg: [Oa, Za, Ta, Ra],
            FU: ["B_DIMENSIONAL_MAP", "B_SATELLITE_MAP", "B_NORMAL_MAP"],
            type: a.type || bc,
            za: a.offset || this.defaultOffset,
            oV: p
        };
        this.nc(a.anchor);
        "[object Array]" == Object.prototype.toString.call(a.mapTypes) && (this.j.Vg = a.mapTypes.slice(0));
        this.nf()
    }
    z.lang.sa(ob, Ub, "MapTypeControl");
    z.object.extend(ob.prototype, {
        initialize: function (a) {
            this.B = a;
            return this.C
        },
        Kx: function (a) {
            this.B.hn = a
        },
        nf: function () {
            var a = this;
            K.load("control", function () {
                a.mf()
            }, p)
        }
    });

    function cc(a) {
        Ub.call(this);
        a = a || {};
        this.j = {
            mg: t,
            za: a.offset,
            anchor: a.anchor
        };
        this.vi = t;
        this.av = q;
        this.jH = new dc({
            af: "api"
        });
        this.kH = new ec(q, {
            af: "api"
        });
        this.defaultAnchor = Xb;
        this.defaultOffset = new O(10, 10);
        this.nc(a.anchor);
        this.nf();
        Sa(xa)
    }
    z.lang.sa(cc, Ub, "PanoramaControl");
    z.extend(cc.prototype, {
        initialize: function (a) {
            this.B = a;
            return this.C
        },
        nf: function () {
            var a = this;
            K.load("control", function () {
                a.mf()
            })
        }
    });

    function fc(a) {
        z.lang.Ca.call(this);
        this.j = {
            Ta: q,
            cursor: "default"
        };
        this.j = z.extend(this.j, a);
        this.Gb = "contextmenu";
        this.B = q;
        this.wa = [];
        this.xf = [];
        this.ve = [];
        this.Uv = this.rr = q;
        this.qh = t;
        var b = this;
        K.load("menu", function () {
            b.eb()
        })
    }
    z.lang.sa(fc, z.lang.Ca, "ContextMenu");
    z.object.extend(fc.prototype, {
        ta: function (a, b) {
            this.B = a;
            this.cl = b || q
        },
        remove: function () {
            this.B = this.cl = q
        },
        vv: function (a) {
            if (a && !("menuitem" != a.Gb || "" == a.Fg || 0 >= a.Di)) {
                for (var b = 0, c = this.wa.length; b < c; b++) if (this.wa[b] === a) return;
                this.wa.push(a);
                this.xf.push(a)
            }
        },
        removeItem: function (a) {
            if (a && "menuitem" == a.Gb) {
                for (var b = 0, c = this.wa.length; b < c; b++) this.wa[b] === a && (this.wa[b].remove(), this.wa.splice(
                        b, 1), c--);
                b = 0;
                for (c = this.xf.length; b < c; b++) this.xf[b] === a && (this.xf[b].remove(), this.xf.splice(b, 1), c--)
            }
        },
        QA: function () {
            this.wa.push({
                Gb: "divider",
                oj: this.ve.length
            });
            this.ve.push({
                D: q
            })
        },
        RD: function (a) {
            if (this.ve[a]) {
                for (var b = 0, c = this.wa.length; b < c; b++) this.wa[b] && ("divider" == this.wa[b].Gb && this.wa[b]
                        .oj == a) && (this.wa.splice(b, 1), c--), this.wa[b] && ("divider" == this.wa[b].Gb && this.wa[
                        b].oj > a) && this.wa[b].oj--;
                this.ve.splice(a, 1)
            }
        },
        yd: w("C"),
        show: function () {
            this.qh != p && (this.qh = p)
        },
        U: function () {
            this.qh != t && (this.qh = t)
        },
        QY: function (a) {
            a && (this.j.cursor = a)
        },
        getItem: function (a) {
            return this.xf[a]
        }
    });
    var gc = H.oa + "menu_zoom_in.png",
        hc = H.oa + "menu_zoom_out.png";

    function ic(a, b, c) {
        if (a && Ya(b)) {
            z.lang.Ca.call(this);
            this.j = {
                width: 100,
                id: "",
                Yl: ""
            };
            c = c || {};
            this.j.width = 1 * c.width ? c.width : 100;
            this.j.id = c.id ? c.id : "";
            this.j.Yl = c.iconUrl ? c.iconUrl : "";
            this.Fg = a + "";
            this.vy = b;
            this.B = q;
            this.Gb = "menuitem";
            this.Zq = this.su = this.C = this.kh = q;
            this.nh = p;
            var e = this;
            K.load("menu", function () {
                e.eb()
            })
        }
    }
    z.lang.sa(ic, z.lang.Ca, "MenuItem");
    z.object.extend(ic.prototype, {
        ta: function (a, b) {
            this.B = a;
            this.kh = b
        },
        remove: function () {
            this.B = this.kh = q
        },
        Ys: function (a) {
            a && (this.Fg = a + "")
        },
        Mb: function (a) {
            a && (this.j.Yl = a)
        },
        yd: w("C"),
        enable: function () {
            this.nh = p
        },
        disable: function () {
            this.nh = t
        }
    });

    function fb(a, b) {
        a && !b && (b = a);
        this.ye = this.Ld = this.De = this.Nd = this.pl = this.al = q;
        a && (this.pl = new J(a.lng, a.lat), this.al = new J(b.lng, b.lat), this.De = a.lng, this.Nd = a.lat, this.ye =
            b.lng, this.Ld = b.lat)
    }
    z.object.extend(fb.prototype, {
        Zi: function () {
            return !this.pl || !this.al
        },
        fc: function (a) {
            return !(a instanceof fb) || this.Zi() ? t : this.Ke().fc(a.Ke()) && this.Ff().fc(a.Ff())
        },
        Ke: w("pl"),
        Ff: w("al"),
        lU: function (a) {
            return !(a instanceof fb) || this.Zi() || a.Zi() ? t : a.De > this.De && a.ye < this.ye && a.Nd > this.Nd &&
                a.Ld < this.Ld
        },
        tb: function () {
            return this.Zi() ? q : new J((this.De + this.ye) / 2, (this.Nd + this.Ld) / 2)
        },
        ks: function (a) {
            if (!(a instanceof fb) || Math.max(a.De, a.ye) < Math.min(this.De, this.ye) || Math.min(a.De, a.ye) > Math.max(
                this.De, this.ye) || Math.max(a.Nd, a.Ld) < Math.min(this.Nd, this.Ld) || Math.min(a.Nd, a.Ld) > Math.max(
                this.Nd, this.Ld)) return q;
            var b = Math.max(this.De, a.De),
                c = Math.min(this.ye, a.ye),
                e = Math.max(this.Nd, a.Nd),
                a = Math.min(this.Ld, a.Ld);
            return new fb(new J(b, e), new J(c, a))
        },
        mr: function (a) {
            return !(a instanceof J) || this.Zi() ? t : a.lng >= this.De && a.lng <= this.ye && a.lat >= this.Nd && a.lat <=
                this.Ld
        },
        extend: function (a) {
            if (a instanceof J) {
                var b = a.lng,
                    a = a.lat;
                this.pl || (this.pl = new J(0, 0));
                this.al || (this.al = new J(0, 0));
                if (!this.De || this.De > b) this.pl.lng = this.De = b;
                if (!this.ye || this.ye < b) this.al.lng = this.ye = b;
                if (!this.Nd || this.Nd > a) this.pl.lat = this.Nd = a;
                if (!this.Ld || this.Ld < a) this.al.lat = this.Ld = a
            }
        },
        xE: function () {
            return this.Zi() ? new J(0, 0) : new J(Math.abs(this.ye - this.De), Math.abs(this.Ld - this.Nd))
        }
    });

    function J(a, b) {
        isNaN(a) && (a = Lb(a), a = isNaN(a) ? 0 : a);
        $a(a) && (a = parseFloat(a));
        isNaN(b) && (b = Lb(b), b = isNaN(b) ? 0 : b);
        $a(b) && (b = parseFloat(b));
        this.lng = a;
        this.lat = b
    }
    J.OK = function (a) {
        return a && 180 >= a.lng && -180 <= a.lng && 74 >= a.lat && -74 <= a.lat
    };
    J.prototype.fc = function (a) {
        return a && this.lat == a.lat && this.lng == a.lng
    };

    function jc() {}
    jc.prototype.Tg = function () {
        aa("lngLatToPoint\u65b9\u6cd5\u672a\u5b9e\u73b0")
    };
    jc.prototype.cj = function () {
        aa("pointToLngLat\u65b9\u6cd5\u672a\u5b9e\u73b0")
    };

    function kc() {};
    var eb = {
        YI: function (a, b, c) {
            K.load("coordtransutils", function () {
                eb.zT(a, b, c)
            }, p)
        },
        XI: function (a, b, c) {
            K.load("coordtransutils", function () {
                eb.yT(a, b, c)
            }, p)
        }
    };

    function lc() {
        this.Ma = [];
        var a = this;
        K.load("convertor", function () {
            a.zO()
        })
    }
    z.sa(lc, z.lang.Ca, "Convertor");
    z.extend(lc.prototype, {
        translate: function (a, b, c, e) {
            this.Ma.push({
                method: "translate",
                arguments: [a, b, c, e]
            })
        }
    });
    T(lc.prototype, {
        translate: lc.prototype.translate
    });

    function S() {}
    S.prototype = new jc;
    z.extend(S, {
        WN: 6370996.81,
        iF: [1.289059486E7, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
        Lt: [75, 60, 45, 30, 15, 0],
        cO: [[1.410526172116255E-8, 8.98305509648872E-6, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 1.73379812E7], [-7.435856389565537E-9, 8.983055097726239E-6, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887,
                    2.28786674699375, 1.026014486E7], [-3.030883460898826E-8, 8.98305509983578E-6, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475,
                    6856817.37], [-1.981981304930552E-8, 8.983055099779535E-6, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06], [3.09191371068437E-9,
                    8.983055096812155E-6, 6.995724062E-5, 23.10934304144901, -2.3663490511E-4, -0.6321817810242, -0.00663494467273,
                    0.03430082397953, -0.00466043876332, 2555164.4], [2.890871144776878E-9, 8.983055095805407E-6, -3.068298E-8,
                    7.47137025468032, -3.53937994E-6, -0.02145144861037, -1.234426596E-5, 1.0322952773E-4, -3.23890364E-6,
                    826088.5]],
        fF: [[-0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149669176653700, 26595700718403920, -10725012454188240, 1800819912950474, 82.5], [8.277824516172526E-4,
                    111320.7020463578, 6.477955746671607E8, -4.082003173641316E9, 1.077490566351142E10, -1.517187553151559E10,
                    1.205306533862167E10, -5.124939663577472E9, 9.133119359512032E8, 67.5], [0.00337398766765, 111320.7020202162,
                    4481351.045890365, -2.339375119931662E7, 7.968221547186455E7, -1.159649932797253E8, 9.723671115602145E7, -4.366194633752821E7, 8477230.501135234, 52.5], [0.00220636496208, 111320.7020209128, 51751.86112841131,
                    3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312,
                    144416.9293806241, 37.5], [-3.441963504368392E-4, 111320.7020576856, 278.2353980772752, 2485758.690035394,
                    6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5], [-3.218135878613132E-4, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093,
                    2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]],
        O1: function (a, b) {
            if (!a || !b) return 0;
            var c, e, a = this.Wb(a);
            if (!a) return 0;
            c = this.yk(a.lng);
            e = this.yk(a.lat);
            b = this.Wb(b);
            return !b ? 0 : this.bf(c, this.yk(b.lng), e, this.yk(b.lat))
        },
        po: function (a, b) {
            if (!a || !b) return 0;
            a.lng = this.CC(a.lng, -180, 180);
            a.lat = this.IC(a.lat, -74, 74);
            b.lng = this.CC(b.lng, -180, 180);
            b.lat = this.IC(b.lat, -74, 74);
            return this.bf(this.yk(a.lng), this.yk(b.lng), this.yk(a.lat), this.yk(b.lat))
        },
        Wb: function (a) {
            if (a === q || a === l) return new J(0, 0);
            var b, c;
            b = new J(Math.abs(a.lng), Math.abs(a.lat));
            for (var e = 0; e < this.iF.length; e++) if (b.lat >= this.iF[e]) {
                    c = this.cO[e];
                    break
                }
            a = this.ZI(a, c);
            return a = new J(a.lng.toFixed(6), a.lat.toFixed(6))
        },
        xb: function (a) {
            if (a === q || a === l || 180 < a.lng || -180 > a.lng || 90 < a.lat || -90 > a.lat) return new J(0, 0);
            var b, c;
            a.lng = this.CC(a.lng, -180, 180);
            a.lat = this.IC(a.lat, -74, 74);
            b = new J(a.lng, a.lat);
            for (var e = 0; e < this.Lt.length; e++) if (b.lat >= this.Lt[e]) {
                    c = this.fF[e];
                    break
                }
            if (!c) for (e = 0; e < this.Lt.length; e++) if (b.lat <= -this.Lt[e]) {
                        c = this.fF[e];
                        break
                    }
            a = this.ZI(a, c);
            return a = new J(a.lng.toFixed(2), a.lat.toFixed(2))
        },
        ZI: function (a, b) {
            if (a && b) {
                var c = b[0] + b[1] * Math.abs(a.lng),
                    e = Math.abs(a.lat) / b[9],
                    e = b[2] + b[3] * e + b[4] * e * e + b[5] * e * e * e + b[6] * e * e * e * e + b[7] * e * e * e * e *
                        e + b[8] * e * e * e * e * e * e,
                    c = c * (0 > a.lng ? -1 : 1),
                    e = e * (0 > a.lat ? -1 : 1);
                return new J(c, e)
            }
        },
        bf: function (a, b, c, e) {
            return this.WN * Math.acos(Math.sin(c) * Math.sin(e) + Math.cos(c) * Math.cos(e) * Math.cos(b - a))
        },
        yk: function (a) {
            return Math.PI * a / 180
        },
        j4: function (a) {
            return 180 * a / Math.PI
        },
        IC: function (a, b, c) {
            b != q && (a = Math.max(a, b));
            c != q && (a = Math.min(a, c));
            return a
        },
        CC: function (a, b, c) {
            for (; a > c;) a -= c - b;
            for (; a < b;) a += c - b;
            return a
        }
    });
    z.extend(S.prototype, {
        Rh: function (a) {
            return S.xb(a)
        },
        Tg: function (a) {
            a = S.xb(a);
            return new R(a.lng, a.lat)
        },
        Wg: function (a) {
            return S.Wb(a)
        },
        cj: function (a) {
            a = new J(a.x, a.y);
            return S.Wb(a)
        },
        Rb: function (a, b, c, e, f) {
            if (a) return a = this.Rh(a, f), b = this.kc(b), new R(Math.round((a.lng - c.lng) / b + e.width / 2), Math.round((
                    c.lat - a.lat) / b + e.height / 2))
        },
        zb: function (a, b, c, e, f) {
            if (a) return b = this.kc(b), this.Wg(new J(c.lng + b * (a.x - e.width / 2), c.lat - b * (a.y - e.height /
                    2)), f)
        },
        kc: function (a) {
            return Math.pow(2, 18 - a)
        }
    });

    function ib() {
        this.Ii = "bj"
    }
    ib.prototype = new S;
    z.extend(ib.prototype, {
        Rh: function (a, b) {
            return this.kP(b, S.xb(a))
        },
        Wg: function (a, b) {
            return S.Wb(this.lP(b, a))
        },
        lngLatToPointFor3D: function (a, b) {
            var c = this,
                e = S.xb(a);
            K.load("coordtrans", function () {
                var a = kc.GC(c.Ii || "bj", e),
                    a = new R(a.x, a.y);
                b && b(a)
            }, p)
        },
        pointToLngLatFor3D: function (a, b) {
            var c = this,
                e = new J(a.x, a.y);
            K.load("coordtrans", function () {
                var a = kc.DC(c.Ii || "bj", e),
                    a = new J(a.lng, a.lat),
                    a = S.Wb(a);
                b && b(a)
            }, p)
        },
        kP: function (a, b) {
            if (K.gb("coordtrans").Ce == K.hj.pp) {
                var c = kc.GC(a || "bj", b);
                return new J(c.x, c.y)
            }
            K.load("coordtrans", u());
            return new J(0, 0)
        },
        lP: function (a, b) {
            if (K.gb("coordtrans").Ce == K.hj.pp) {
                var c = kc.DC(a || "bj", b);
                return new J(c.lng, c.lat)
            }
            K.load("coordtrans", u());
            return new J(0, 0)
        },
        kc: function (a) {
            return Math.pow(2, 20 - a)
        }
    });

    function mc() {
        this.Gb = "overlay"
    }
    z.lang.sa(mc, z.lang.Ca, "Overlay");
    mc.bk = function (a) {
        a *= 1;
        return !a ? 0 : -1E5 * a << 1
    };
    z.extend(mc.prototype, {
        xe: function (a) {
            if (!this.V && Ya(this.initialize) && (this.V = this.initialize(a))) this.V.style.WebkitUserSelect = "none";
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
            this.V = q;
            this.dispatchEvent(new Q("onremove"))
        },
        U: function () {
            this.V && z.D.U(this.V)
        },
        show: function () {
            this.V && z.D.show(this.V)
        },
        Hc: function () {
            return !this.V || "none" == this.V.style.display || "hidden" == this.V.style.visibility ? t : p
        }
    });
    D.Oe(function (a) {
        function b(a, b) {
            var c = N("div"),
                i = c.style;
            i.position = "absolute";
            i.top = i.left = i.width = i.height = "0";
            i.zIndex = b;
            a.appendChild(c);
            return c
        }
        var c = a.R;
        c.fd = a.fd = b(a.platform, 200);
        a.Md.iC = b(c.fd, 800);
        a.Md.vD = b(c.fd, 700);
        a.Md.IJ = b(c.fd, 600);
        a.Md.pD = b(c.fd, 500);
        a.Md.vL = b(c.fd, 400);
        a.Md.wL = b(c.fd, 300);
        a.Md.BN = b(c.fd, 201);
        a.Md.ys = b(c.fd, 200)
    });

    function hb() {
        z.lang.Ca.call(this);
        mc.call(this);
        this.map = q;
        this.Na = p;
        this.ub = q;
        this.TF = 0
    }
    z.lang.sa(hb, mc, "OverlayInternal");
    z.extend(hb.prototype, {
        initialize: function (a) {
            this.map = a;
            z.lang.Ca.call(this, this.aa);
            return q
        },
        sw: w("map"),
        draw: u(),
        ij: u(),
        remove: function () {
            this.map = q;
            z.lang.Xv(this.aa);
            mc.prototype.remove.call(this)
        },
        U: function () {
            this.Na !== t && (this.Na = t)
        },
        show: function () {
            this.Na !== p && (this.Na = p)
        },
        Hc: function () {
            return !this.V ? t : !! this.Na
        },
        Pa: w("V"),
        CM: function (a) {
            var a = a || {}, b;
            for (b in a) this.z[b] = a[b]
        },
        ep: ba("zIndex"),
        Ni: function () {
            this.z.Ni = p
        },
        NU: function () {
            this.z.Ni = t
        },
        Ln: ba("Wf"),
        Po: function () {
            this.Wf = q
        }
    });

    function nc() {
        this.map = q;
        this.xa = {};
        this.ue = []
    }
    D.Oe(function (a) {
        var b = new nc;
        b.map = a;
        a.xa = b.xa;
        a.ue = b.ue;
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
            if (a instanceof hb) b.xa[a.aa] || (b.xa[a.aa] = a);
            else {
                for (var e = t, f = 0, g = b.ue.length; f < g; f++) if (b.ue[f] === a) {
                        e = p;
                        break
                    }
                e || b.ue.push(a)
            }
        });
        a.addEventListener("removeoverlay", function (a) {
            a = a.target;
            if (a instanceof hb) delete b.xa[a.aa];
            else for (var e = 0, f = b.ue.length; e < f; e++) if (b.ue[e] === a) {
                        b.ue.splice(e, 1);
                        break
                    }
        });
        a.addEventListener("clearoverlays", function () {
            this.Qc();
            for (var a in b.xa) b.xa[a].z.Ni && (b.xa[a].remove(), delete b.xa[a]);
            a = 0;
            for (var e = b.ue.length; a < e; a++) b.ue[a].enableMassClear !== t && (b.ue[a].remove(), b.ue[a] = q, b.ue
                    .splice(a, 1), a--, e--)
        });
        a.addEventListener("infowindowopen", function () {
            var a = this.ub;
            a && (z.D.U(a.tc), z.D.U(a.Sb))
        });
        a.addEventListener("movestart", function () {
            this.Rg() && this.Rg().HH()
        });
        a.addEventListener("moveend", function () {
            this.Rg() && this.Rg().wH()
        })
    });
    nc.prototype.draw = function (a) {
        if (D.sp) {
            var b = D.sp.Ur(this.map);
            "canvas" === b.Gb && b.canvas && b.fP(b.canvas.getContext("2d"))
        }
        for (var c in this.xa) this.xa[c].draw(a);
        z.bc.Hb(this.ue, function (a) {
            a.draw()
        });
        this.map.R.mb && this.map.R.mb.qa();
        D.sp && b.fE()
    };

    function oc(a) {
        hb.call(this);
        a = a || {};
        this.z = {
            strokeColor: a.strokeColor || "#3a6bdb",
            hc: a.strokeWeight || 5,
            jd: a.strokeOpacity || 0.65,
            strokeStyle: a.strokeStyle || "solid",
            Ni: a.enableMassClear === t ? t : p,
            Yj: q,
            Pl: q,
            Ze: a.enableEditing === p ? p : t,
            AL: 5,
            ZZ: t,
            We: a.enableClicking === t ? t : p,
            Ph: a.icons && 0 < a.icons.length ? a.icons : q
        };
        0 >= this.z.hc && (this.z.hc = 5);
        if (0 > this.z.jd || 1 < this.z.jd) this.z.jd = 0.65;
        if (0 > this.z.dg || 1 < this.z.dg) this.z.dg = 0.65;
        "solid" != this.z.strokeStyle && "dashed" != this.z.strokeStyle && (this.z.strokeStyle = "solid");
        this.V = q;
        this.St = new fb(0, 0);
        this.Ue = [];
        this.jc = [];
        this.Oa = {}
    }
    z.lang.sa(oc, hb, "Graph");
    oc.ow = function (a) {
        var b = [];
        if (!a) return b;
        $a(a) && z.bc.Hb(a.split(";"), function (a) {
            a = a.split(",");
            b.push(new J(a[0], a[1]))
        });
        "[object Array]" == Object.prototype.toString.apply(a) && 0 < a.length && (b = a);
        return b
    };
    oc.FD = [0.09, 0.0050, 1.0E-4, 1.0E-5];
    z.extend(oc.prototype, {
        initialize: function (a) {
            this.map = a;
            return q
        },
        draw: u(),
        Rq: function (a) {
            this.Ue.length = 0;
            this.ja = oc.ow(a).slice(0);
            this.hh()
        },
        $d: function (a) {
            this.Rq(a)
        },
        hh: function () {
            if (this.ja) {
                var a = this;
                a.St = new fb;
                z.bc.Hb(this.ja, function (b) {
                    a.St.extend(b)
                })
            }
        },
        Je: w("ja"),
        vm: function (a, b) {
            b && this.ja[a] && (this.Ue.length = 0, this.ja[a] = new J(b.lng, b.lat), this.hh())
        },
        setStrokeColor: function (a) {
            this.z.strokeColor = a
        },
        xW: function () {
            return this.z.strokeColor
        },
        dp: function (a) {
            0 < a && (this.z.hc = a)
        },
        kK: function () {
            return this.z.hc
        },
        bp: function (a) {
            a == l || (1 < a || 0 > a) || (this.z.jd = a)
        },
        yW: function () {
            return this.z.jd
        },
        Rs: function (a) {
            1 < a || 0 > a || (this.z.dg = a)
        },
        VV: function () {
            return this.z.dg
        },
        cp: function (a) {
            "solid" != a && "dashed" != a || (this.z.strokeStyle = a)
        },
        jK: function () {
            return this.z.strokeStyle
        },
        setFillColor: function (a) {
            this.z.fillColor = a || ""
        },
        UV: function () {
            return this.z.fillColor
        },
        ke: w("St"),
        remove: function () {
            this.map && this.map.removeEventListener("onmousemove", this.pu);
            hb.prototype.remove.call(this);
            this.Ue.length = 0
        },
        Ze: function () {
            if (!(2 > this.ja.length)) {
                this.z.Ze = p;
                var a = this;
                K.load("poly", function () {
                    a.ul()
                }, p)
            }
        },
        MU: function () {
            this.z.Ze = t;
            var a = this;
            K.load("poly", function () {
                a.Oj()
            }, p)
        },
        RV: function () {
            return this.z.Ze
        }
    });

    function pc(a) {
        hb.call(this);
        this.V = this.map = q;
        this.z = {
            width: 0,
            height: 0,
            za: new O(0, 0),
            opacity: 1,
            background: "transparent",
            Vw: 1,
            hL: "#000",
            xX: "solid",
            point: q
        };
        this.CM(a);
        this.point = this.z.point
    }
    z.lang.sa(pc, hb, "Division");
    z.extend(pc.prototype, {
        ij: function () {
            var a = this.z,
                b = this.content,
                c = ['<div class="BMap_Division" style="position:absolute;'];
            c.push("width:" + a.width + "px;display:block;");
            c.push("overflow:hidden;");
            "none" != a.borderColor && c.push("border:" + a.Vw + "px " + a.xX + " " + a.hL + ";");
            c.push("opacity:" + a.opacity + "; filter:(opacity=" + 100 * a.opacity + ")");
            c.push("background:" + a.background + ";");
            c.push('z-index:60;">');
            c.push(b);
            c.push("</div>");
            this.V = Bb(this.map.Gf().vD, c.join(""))
        },
        initialize: function (a) {
            this.map = a;
            this.ij();
            this.V && z.M(this.V, I() ? "touchstart" : "mousedown", function (a) {
                na(a)
            });
            return this.V
        },
        draw: function () {
            var a = this.map.Ne(this.z.point);
            this.z.za = new O(-Math.round(this.z.width / 2) - Math.round(this.z.Vw), -Math.round(this.z.height / 2) -
                Math.round(this.z.Vw));
            this.V.style.left = a.x + this.z.za.width + "px";
            this.V.style.top = a.y + this.z.za.height + "px"
        },
        fa: function () {
            return this.z.point
        },
        d0: function () {
            return this.map.Rb(this.fa())
        },
        qa: function (a) {
            this.z.point = a;
            this.draw()
        },
        RY: function (a, b) {
            this.z.width = Math.round(a);
            this.z.height = Math.round(b);
            this.V && (this.V.style.width = this.z.width + "px", this.V.style.height = this.z.height + "px", this.draw())
        }
    });

    function qc(a, b, c) {
        a && b && (this.imageUrl = a, this.size = b, a = new O(Math.floor(b.width / 2), Math.floor(b.height / 2)), c =
            c || {}, a = c.anchor || a, b = c.imageOffset || new O(0, 0), this.imageSize = c.imageSize, this.anchor = a,
            this.imageOffset = b, this.infoWindowAnchor = c.infoWindowAnchor || this.anchor, this.printImageUrl = c.printImageUrl ||
            "")
    }
    z.extend(qc.prototype, {
        DM: function (a) {
            a && (this.imageUrl = a)
        },
        gZ: function (a) {
            a && (this.printImageUrl = a)
        },
        se: function (a) {
            a && (this.size = new O(a.width, a.height))
        },
        nc: function (a) {
            a && (this.anchor = new O(a.width, a.height))
        },
        Ss: function (a) {
            a && (this.imageOffset = new O(a.width, a.height))
        },
        WY: function (a) {
            a && (this.infoWindowAnchor = new O(a.width, a.height))
        },
        TY: function (a) {
            a && (this.imageSize = new O(a.width, a.height))
        },
        toString: ca("Icon")
    });

    function rc(a, b) {
        if (a) {
            b = b || {};
            this.style = {
                anchor: b.anchor || new O(0, 0),
                fillColor: b.fillColor || "#000",
                dg: b.fillOpacity || 0,
                scale: b.scale || 1,
                rotation: b.rotation || 0,
                strokeColor: b.strokeColor || "#000",
                jd: b.strokeOpacity || 1,
                hc: b.strokeWeight
            };
            this.Gb = "number" === typeof a ? a : "UserDefined";
            this.mi = this.style.anchor;
            this.xq = new O(0, 0);
            this.anchor = q;
            this.iA = a;
            var c = this;
            K.load("symbol", function () {
                c.Rm()
            }, p)
        }
    }
    z.extend(rc.prototype, {
        setPath: ba("iA"),
        setAnchor: function (a) {
            this.mi = this.style.anchor = a
        },
        setRotation: function (a) {
            this.style.rotation = a
        },
        setScale: function (a) {
            this.style.scale = a
        },
        setStrokeWeight: function (a) {
            this.style.hc = a
        },
        setStrokeColor: function (a) {
            a = z.lr.nB(a, this.style.jd);
            this.style.strokeColor = a
        },
        setStrokeOpacity: function (a) {
            this.style.jd = a
        },
        setFillOpacity: function (a) {
            this.style.dg = a
        },
        setFillColor: function (a) {
            this.style.fillColor = a
        }
    });

    function sc(a, b, c, e) {
        a && (this.Iu = {}, this.GJ = e ? !! e : t, this.Nc = [], this.xZ = a instanceof rc ? a : q, this.pH = b === l ?
            p : !! (b.indexOf("%") + 1), this.Bj = isNaN(parseFloat(b)) ? 1 : this.pH ? parseFloat(b) / 100 :
            parseFloat(b), this.qH = !! (c.indexOf("%") + 1), this.repeat = c != l ? this.qH ? parseFloat(c) / 100 :
            parseFloat(c) : 0)
    };

    function tc(a, b) {
        z.lang.Ca.call(this);
        this.content = a;
        this.map = q;
        b = b || {};
        this.z = {
            width: b.width || 0,
            height: b.height || 0,
            maxWidth: b.maxWidth || 730,
            za: b.offset || new O(0, 0),
            title: b.title || "",
            xD: b.maxContent || "",
            Og: b.enableMaximize || t,
            Jr: b.enableAutoPan === t ? t : p,
            SB: b.enableCloseOnClick === t ? t : p,
            margin: b.margin || [10, 10, 40, 10],
            jB: b.collisions || [[10, 10], [10, 10], [10, 10], [10, 10]],
            UW: t,
            SX: b.onClosing || ca(p),
            AJ: t,
            YB: b.enableParano === p ? p : t,
            message: b.message,
            $B: b.enableSearchTool === p ? p : t,
            Dw: b.headerContent || "",
            TB: b.enableContentScroll || t
        };
        if (0 != this.z.width && (220 > this.z.width && (this.z.width = 220), 730 < this.z.width)) this.z.width = 730;
        if (0 != this.z.height && (60 > this.z.height && (this.z.height = 60), 650 < this.z.height)) this.z.height =
                650;
        if (0 != this.z.maxWidth && (220 > this.z.maxWidth && (this.z.maxWidth = 220), 730 < this.z.maxWidth)) this.z.maxWidth =
                730;
        this.Sd = t;
        this.hi = H.oa;
        this.nb = q;
        var c = this;
        K.load("infowindow", function () {
            c.eb()
        })
    }
    z.lang.sa(tc, z.lang.Ca, "InfoWindow");
    z.extend(tc.prototype, {
        setWidth: function (a) {
            !a && 0 != a || (isNaN(a) || 0 > a) || (0 != a && (220 > a && (a = 220), 730 < a && (a = 730)), this.z.width =
                a)
        },
        setHeight: function (a) {
            !a && 0 != a || (isNaN(a) || 0 > a) || (0 != a && (60 > a && (a = 60), 650 < a && (a = 650)), this.z.height =
                a)
        },
        HM: function (a) {
            !a && 0 != a || (isNaN(a) || 0 > a) || (0 != a && (220 > a && (a = 220), 730 < a && (a = 730)), this.z.maxWidth =
                a)
        },
        xc: function (a) {
            this.z.title = a
        },
        getTitle: function () {
            return this.z.title
        },
        Vc: ba("content"),
        Wj: w("content"),
        Us: function (a) {
            this.z.xD = a + ""
        },
        Yd: u(),
        Jr: function () {
            this.z.Jr = p
        },
        disableAutoPan: function () {
            this.z.Jr = t
        },
        enableCloseOnClick: function () {
            this.z.SB = p
        },
        disableCloseOnClick: function () {
            this.z.SB = t
        },
        Og: function () {
            this.z.Og = p
        },
        Zv: function () {
            this.z.Og = t
        },
        show: function () {
            this.Na = p
        },
        U: function () {
            this.Na = t
        },
        close: function () {
            this.U()
        },
        Yw: function () {
            this.Sd = p
        },
        restore: function () {
            this.Sd = t
        },
        Hc: function () {
            return this.Ua()
        },
        Ua: ca(t),
        fa: function () {
            if (this.nb && this.nb.fa) return this.nb.fa()
        },
        Qi: function () {
            return this.z.za
        }
    });
    Na.prototype.Tc = function (a, b) {
        if (a instanceof tc && b instanceof J) {
            var c = this.R;
            c.em ? c.em.qa(b) : (c.em = new U(b, {
                icon: new qc(H.oa + "blank.gif", {
                    width: 1,
                    height: 1
                }),
                offset: new O(0, 0),
                clickable: t
            }), c.em.fQ = 1);
            this.Ka(c.em);
            c.em.Tc(a)
        }
    };
    Na.prototype.Qc = function () {
        var a = this.R.mb || this.R.Sk;
        a && a.nb && a.nb.Qc()
    };
    hb.prototype.Tc = function (a) {
        this.map && (this.map.Qc(), a.Na = p, this.map.R.Sk = a, a.nb = this, z.lang.Ca.call(a, a.aa))
    };
    hb.prototype.Qc = function () {
        this.map && this.map.R.Sk && (this.map.R.Sk.Na = t, z.lang.Xv(this.map.R.Sk.aa), this.map.R.Sk = q)
    };

    function uc(a, b) {
        hb.call(this);
        this.content = a;
        this.V = this.map = q;
        b = b || {};
        this.z = {
            width: 0,
            za: b.offset || new O(0, 0),
            ip: {
                backgroundColor: "#fff",
                border: "1px solid #f00",
                padding: "1px",
                whiteSpace: "nowrap",
                font: "12px " + H.fontFamily,
                zIndex: "80",
                MozUserSelect: "none"
            },
            position: b.position || q,
            Ni: b.enableMassClear === t ? t : p,
            We: p
        };
        0 > this.z.width && (this.z.width = 0);
        Hb(b.enableClicking) && (this.z.We = b.enableClicking);
        this.point = this.z.position;
        var c = this;
        K.load("marker", function () {
            c.eb()
        })
    }
    z.lang.sa(uc, hb, "Label");
    z.extend(uc.prototype, {
        fa: function () {
            return this.xu ? this.xu.fa() : this.point
        },
        qa: function (a) {
            a instanceof J && !this.tw() && (this.point = this.z.position = new J(a.lng, a.lat))
        },
        Vc: ba("content"),
        eE: function (a) {
            0 <= a && 1 >= a && (this.z.opacity = a)
        },
        Zd: function (a) {
            a instanceof O && (this.z.za = new O(a.width, a.height))
        },
        Qi: function () {
            return this.z.za
        },
        Bd: function (a) {
            a = a || {};
            this.z.ip = z.extend(this.z.ip, a)
        },
        bi: function (a) {
            return this.Bd(a)
        },
        xc: function (a) {
            this.z.title = a || ""
        },
        getTitle: function () {
            return this.z.title
        },
        GM: function (a) {
            this.point = (this.xu = a) ? this.z.position = a.fa() : this.z.position = q
        },
        tw: function () {
            return this.xu || q
        },
        Wj: w("content")
    });

    function vc(a, b) {
        if (0 !== arguments.length) {
            hb.apply(this, arguments);
            b = b || {};
            this.z = {
                Za: a,
                opacity: b.opacity || 1,
                am: b.am || "",
                Ar: b.displayOnMinLevel || 1,
                Ni: b.enableMassClear === t ? t : p,
                zr: b.displayOnMaxLevel || 19,
                tZ: b.stretch || t
            };
            var c = this;
            K.load("groundoverlay", function () {
                c.eb()
            })
        }
    }
    z.lang.sa(vc, hb, "GroundOverlay");
    z.extend(vc.prototype, {
        setBounds: function (a) {
            this.z.Za = a
        },
        getBounds: function () {
            return this.z.Za
        },
        setOpacity: function (a) {
            this.z.opacity = a
        },
        getOpacity: function () {
            return this.z.opacity
        },
        setImageURL: function (a) {
            this.z.am = a
        },
        getImageURL: function () {
            return this.z.am
        },
        setDisplayOnMinLevel: function (a) {
            this.z.Ar = a
        },
        getDisplayOnMinLevel: function () {
            return this.z.Ar
        },
        setDisplayOnMaxLevel: function (a) {
            this.z.zr = a
        },
        getDisplayOnMaxLevel: function () {
            return this.z.zr
        }
    });
    var wc = 3,
        xc = 4;

    function yc() {
        var a = document.createElement("canvas");
        return !(!a.getContext || !a.getContext("2d"))
    }
    function zc(a, b) {
        var c = this;
        yc() && (a === l && aa(Error("\u6ca1\u6709\u4f20\u5165points\u6570\u636e")), "[object Array]" !== Object.prototype
            .toString.call(a) && aa(Error("points\u6570\u636e\u4e0d\u662f\u6570\u7ec4")), b = b || {}, hb.apply(c,
            arguments), c.ea = {
            ja: a
        }, c.z = {
            shape: b.shape || wc,
            size: b.size || xc,
            color: b.color || "#fa937e",
            Ni: p
        }, this.fA = [], this.ee = [], K.load("pointcollection", function () {
            for (var a = 0, b; b = c.fA[a]; a++) c[b.method].apply(c, b.arguments);
            for (a = 0; b = c.ee[a]; a++) c[b.method].apply(c, b.arguments)
        }))
    }
    z.lang.sa(zc, hb, "PointCollection");
    z.extend(zc.prototype, {
        initialize: function (a) {
            this.fA && this.fA.push({
                method: "initialize",
                arguments: arguments
            })
        },
        setPoints: function (a) {
            this.ee && this.ee.push({
                method: "setPoints",
                arguments: arguments
            })
        },
        setStyles: function (a) {
            this.ee && this.ee.push({
                method: "setStyles",
                arguments: arguments
            })
        },
        clear: function () {
            this.ee && this.ee.push({
                method: "clear",
                arguments: arguments
            })
        },
        remove: function () {
            this.ee && this.ee.push({
                method: "remove",
                arguments: arguments
            })
        }
    });
    var Ac = new qc(H.oa + "marker_red_sprite.png", new O(19, 25), {
        anchor: new O(10, 25),
        infoWindowAnchor: new O(10, 0)
    }),
        Bc = new qc(H.oa + "marker_red_sprite.png", new O(20, 11), {
            anchor: new O(6, 11),
            imageOffset: new O(-19, -13)
        });

    function U(a, b) {
        hb.call(this);
        b = b || {};
        this.point = a;
        this.Gp = this.map = q;
        this.z = {
            za: b.offset || new O(0, 0),
            me: b.icon || Ac,
            rk: Bc,
            title: b.title || "",
            label: q,
            FI: b.baseZIndex || 0,
            We: p,
            J4: t,
            lD: t,
            Ni: b.enableMassClear === t ? t : p,
            Ob: t,
            kM: b.raiseOnDrag === p ? p : t,
            sM: t,
            vd: b.draggingCursor || H.vd,
            rotation: b.rotation || 0
        };
        b.icon && !b.shadow && (this.z.rk = q);
        b.enableDragging && (this.z.Ob = b.enableDragging);
        Hb(b.enableClicking) && (this.z.We = b.enableClicking);
        var c = this;
        K.load("marker", function () {
            c.eb()
        })
    }
    U.Ot = mc.bk(-90) + 1E6;
    U.aF = U.Ot + 1E6;
    z.lang.sa(U, hb, "Marker");
    z.extend(U.prototype, {
        Mb: function (a) {
            if (a instanceof qc || a instanceof rc) this.z.me = a
        },
        qo: function () {
            return this.z.me
        },
        Cx: function (a) {
            a instanceof qc && (this.z.rk = a)
        },
        getShadow: function () {
            return this.z.rk
        },
        tm: function (a) {
            this.z.label = a || q
        },
        BC: function () {
            return this.z.label
        },
        Ob: function () {
            this.z.Ob = p
        },
        CB: function () {
            this.z.Ob = t
        },
        fa: w("point"),
        qa: function (a) {
            a instanceof J && (this.point = new J(a.lng, a.lat))
        },
        ci: function (a, b) {
            this.z.lD = !! a;
            a && (this.vF = b || 0)
        },
        xc: function (a) {
            this.z.title = a + ""
        },
        getTitle: function () {
            return this.z.title
        },
        Zd: function (a) {
            a instanceof O && (this.z.za = a)
        },
        Qi: function () {
            return this.z.za
        },
        sm: ba("Gp"),
        ap: function (a) {
            this.z.rotation = a
        },
        hK: function () {
            return this.z.rotation
        }
    });

    function Cc(a) {
        this.options = a || {};
        this.WX = this.options.paneName || "labelPane";
        this.zIndex = this.options.zIndex || 0;
        this.mU = this.options.contextType || "2d"
    }
    Cc.prototype = new mc;
    Cc.prototype.initialize = function (a) {
        this.B = a;
        var b = this.canvas = document.createElement("canvas"),
            c = this.canvas.getContext(this.mU);
        b.style.cssText = "position:absolute;left:0;top:0;z-index:" + this.zIndex + ";";
        Dc(this);
        Ec(c);
        a.getPanes()[this.WX].appendChild(b);
        var e = this;
        a.addEventListener("resize", function () {
            Dc(e);
            Ec(c);
            e.eb()
        });
        return this.canvas
    };

    function Dc(a) {
        var b = a.B.yb(),
            a = a.canvas;
        a.width = b.width;
        a.height = b.height;
        a.style.width = a.width + "px";
        a.style.height = a.height + "px"
    }
    function Ec(a) {
        var b = (window.devicePixelRatio || 1) / (a.CT || a.D4 || a.e3 || a.f3 || a.j3 || a.CT || 1),
            c = a.canvas.width,
            e = a.canvas.height;
        a.canvas.width = c * b;
        a.canvas.height = e * b;
        a.canvas.style.width = c + "px";
        a.canvas.style.height = e + "px";
        a.scale(b, b)
    }
    Cc.prototype.draw = function () {
        var a = this,
            b = arguments;
        clearTimeout(a.GZ);
        a.GZ = setTimeout(function () {
            a.eb.apply(a, b)
        }, 15)
    };
    da = Cc.prototype;
    da.eb = function () {
        var a = this.B;
        this.canvas.style.left = -a.offsetX + "px";
        this.canvas.style.top = -a.offsetY + "px";
        this.dispatchEvent("draw");
        this.options.update && this.options.update.apply(this, arguments)
    };
    da.Pa = w("canvas");
    da.show = function () {
        this.canvas || this.B.Ka(this);
        this.canvas.style.display = "block"
    };
    da.U = function () {
        this.canvas.style.display = "none"
    };
    da.ep = function (a) {
        this.canvas.style.zIndex = a
    };
    da.bk = w("zIndex");

    function Fc(a, b) {
        oc.call(this, b);
        b = b || {};
        this.z.dg = b.fillOpacity ? b.fillOpacity : 0.65;
        this.z.fillColor = "" == b.fillColor ? "" : b.fillColor ? b.fillColor : "#fff";
        this.$d(a);
        var c = this;
        K.load("poly", function () {
            c.eb()
        })
    }
    z.lang.sa(Fc, oc, "Polygon");
    z.extend(Fc.prototype, {
        $d: function (a, b) {
            this.Gn = oc.ow(a).slice(0);
            var c = oc.ow(a).slice(0);
            1 < c.length && c.push(new J(c[0].lng, c[0].lat));
            oc.prototype.$d.call(this, c, b)
        },
        vm: function (a, b) {
            this.Gn[a] && (this.Gn[a] = new J(b.lng, b.lat), this.ja[a] = new J(b.lng, b.lat), 0 == a && !this.ja[0].fc(this.ja[this.ja.length - 1]) && (this.ja[this.ja.length - 1] = new J(b.lng, b.lat)), this.hh())
        },
        Je: function () {
            var a = this.Gn;
            0 == a.length && (a = this.ja);
            return a
        }
    });

    function Gc(a, b) {
        oc.call(this, b);
        this.Rq(a);
        var c = this;
        K.load("poly", function () {
            c.eb()
        })
    }
    z.lang.sa(Gc, oc, "Polyline");

    function Hc(a, b, c) {
        this.point = a;
        this.ya = Math.abs(b);
        Fc.call(this, [], c)
    }
    Hc.FD = [0.01, 1.0E-4, 1.0E-5, 4.0E-6];
    z.lang.sa(Hc, Fc, "Circle");
    z.extend(Hc.prototype, {
        initialize: function (a) {
            this.map = a;
            this.ja = this.ku(this.point, this.ya);
            this.hh();
            return q
        },
        tb: w("point"),
        hf: function (a) {
            a && (this.point = a)
        },
        fK: w("ya"),
        jf: function (a) {
            this.ya = Math.abs(a)
        },
        ku: function (a, b) {
            if (!a || !b || !this.map) return [];
            for (var c = [], e = b / 6378800, f = Math.PI / 180 * a.lat, g = Math.PI / 180 * a.lng, i = 0; 360 > i; i +=
                9) {
                var k = Math.PI / 180 * i,
                    m = Math.asin(Math.sin(f) * Math.cos(e) + Math.cos(f) * Math.sin(e) * Math.cos(k)),
                    k = new J(((g - Math.atan2(Math.sin(k) * Math.sin(e) * Math.cos(f), Math.cos(e) - Math.sin(f) *
                        Math.sin(m)) + Math.PI) % (2 * Math.PI) - Math.PI) * (180 / Math.PI), m * (180 / Math.PI));
                c.push(k)
            }
            e = c[0];
            c.push(new J(e.lng, e.lat));
            return c
        }
    });
    var Ic = {};

    function Jc(a) {
        this.map = a;
        this.dm = [];
        this.Mf = [];
        this.og = [];
        this.RT = 300;
        this.ND = 0;
        this.ig = {};
        this.Hi = {};
        this.hk = 0;
        this.fD = p;
        this.CU = {};
        this.ln = this.Qp(1);
        this.$f = this.Qp(2);
        this.bl = this.Qp(3);
        this.ph = this.Qp(4);
        a.platform.appendChild(this.ln);
        a.platform.appendChild(this.$f);
        a.platform.appendChild(this.bl);
        a.platform.appendChild(this.ph);
        var b = 256 * Math.pow(2, 15),
            c = 3 * b,
            a = S.xb(new J(180, 0)).lng,
            c = c - a,
            b = -3 * b,
            e = S.xb(new J(-180, 0)).lng;
        this.TG = a;
        this.UG = e;
        this.Mz = c + (e - b);
        this.VG = a - e
    }
    D.Oe(function (a) {
        var b = new Jc(a);
        b.ta();
        a.ei = b
    });
    z.extend(Jc.prototype, {
        ta: function () {
            var a = this,
                b = a.map;
            b.addEventListener("loadcode", function () {
                a.Ho()
            });
            b.addEventListener("addtilelayer", function (b) {
                a.Ee(b)
            });
            b.addEventListener("removetilelayer", function (b) {
                a.Lf(b)
            });
            b.addEventListener("setmaptype", function (b) {
                a.ng(b)
            });
            b.addEventListener("zoomstartcode", function (b) {
                a.Ec(b)
            });
            b.addEventListener("setcustomstyles", function (b) {
                a.Ts(b.target);
                a.Jf(p)
            });
            b.addEventListener("initindoorlayer", function (b) {
                a.bD(b)
            })
        },
        Ho: function () {
            var a = this;
            if (z.ca.ia) try {
                    document.execCommand("BackgroundImageCache", t, p)
            } catch (b) {}
            this.loaded || a.Kw();
            a.Jf();
            this.loaded || (this.loaded = p, K.load("tile", function () {
                a.AO()
            }))
        },
        bD: function (a) {
            this.xt = new Kc(this);
            this.xt.Ee(new Lc(this.map, this.xt, a.Le))
        },
        Kw: function () {
            for (var a = this.map.ra().Te, b = 0; b < a.length; b++) {
                var c = new Mc;
                z.extend(c, a[b]);
                this.dm.push(c);
                c.ta(this.map, this.ln)
            }
            this.Ts()
        },
        Qp: function (a) {
            var b = N("div");
            b.style.position = "absolute";
            b.style.overflow = "visible";
            b.style.left = b.style.top = "0";
            b.style.zIndex = a;
            return b
        },
        of: function () {
            this.hk--;
            var a = this;
            this.fD && (this.map.dispatchEvent(new Q("onfirsttileloaded")), this.fD = t);
            0 == this.hk && (this.qi && (clearTimeout(this.qi), this.qi = q), this.qi = setTimeout(function () {
                if (a.hk == 0) {
                    a.map.dispatchEvent(new Q("ontilesloaded"));
                    a.fD = p
                }
                a.qi = q
            }, 80))
        },
        NC: function (a, b) {
            return "TILE-" + b.aa + "-" + a[0] + "-" + a[1] + "-" + a[2]
        },
        Gw: function (a) {
            var b = a.Db;
            b && Ab(b) && b.parentNode.removeChild(b);
            delete this.ig[a.name];
            a.loaded || (Nc(a), a.Db = q, a.fm = q)
        },
        oK: function (a, b, c) {
            var e = this.map,
                f = e.ra(),
                g = e.Ra,
                i = e.lc,
                k = f.kc(g),
                m = this.OV(),
                n = m[0],
                o = m[1],
                s = m[2],
                v = m[3],
                x = m[4],
                c = "undefined" != typeof c ? c : 0,
                f = f.le(),
                m = e.aa.replace(/^TANGRAM_/, "");
            for (this.te ? this.te.length = 0 : this.te = []; n < s; n++) for (var y = o; y < v; y++) {
                    var A = n,
                        C = y;
                    this.te.push([A, C]);
                    A = m + "_" + b + "_" + A + "_" + C + "_" + g;
                    this.CU[A] = A
            }
            this.te.sort(function (a) {
                return function (b, c) {
                    return 0.4 * Math.abs(b[0] - a[0]) + 0.6 * Math.abs(b[1] - a[1]) - (0.4 * Math.abs(c[0] - a[0]) + 0.6 * Math.abs(c[1] - a[1]))
                }
            }([x[0] - 1, x[1] - 1]));
            i = [Math.round(-i.lng / k), Math.round(i.lat / k)];
            n = -e.offsetY + e.height / 2;
            a.style.left = -e.offsetX + e.width / 2 + "px";
            a.style.top = n + "px";
            this.Fe ? this.Fe.length = 0 : this.Fe = [];
            n = 0;
            for (e = a.childNodes.length; n < e; n++) y = a.childNodes[n], y.oq = t, this.Fe.push(y);
            if (n = this.im) for (var B in n) delete n[B];
            else this.im = {};
            this.Ge ? this.Ge.length = 0 : this.Ge = [];
            n = 0;
            for (e = this.te.length; n < e; n++) {
                B = this.te[n][0];
                k = this.te[n][1];
                y = 0;
                for (o = this.Fe.length; y < o; y++) if (s = this.Fe[y], s.id == m + "_" + b + "_" + B + "_" + k + "_" +
                        g) {
                        s.oq = p;
                        this.im[s.id] = s;
                        break
                    }
            }
            n = 0;
            for (e = this.Fe.length; n < e; n++) s = this.Fe[n], s.oq || this.Ge.push(s);
            this.uE = [];
            y = (f + c) * this.map.K.devicePixelRatio;
            n = 0;
            for (e = this.te.length; n < e; n++) B = this.te[n][0], k = this.te[n][1], v = B * f + i[0] - c / 2, x = (-
                    1 - k) * f + i[1] - c / 2, A = m + "_" + b + "_" + B + "_" + k + "_" + g, o = this.im[A], s = q, o ?
                    (s = o.style, s.left = v + "px", s.top = x + "px", o.Xm || this.uE.push([B, k, o])) : (0 < this.Ge.length ?
                    (o = this.Ge.shift(), o.getContext("2d").clearRect(-c / 2, -c / 2, y, y), s = o.style) : (o =
                    document.createElement("canvas"), s = o.style, s.position = "absolute", s.width = f + c + "px", s.height =
                    f + c + "px", this.qX() && (s.WebkitTransform = "scale(1.001)"), o.setAttribute("width", y), o.setAttribute(
                    "height", y), a.appendChild(o)), o.id = A, s.left = v + "px", s.top = x + "px", -1 < A.indexOf("bg") &&
                    (v = "#F3F1EC", this.map.K.AT && (v = this.map.K.AT), s.background = v ? v : ""), this.uE.push([B,
                        k, o])), o.style.visibility = "";
            n = 0;
            for (e = this.Ge.length; n < e; n++) this.Ge[n].style.visibility = "hidden";
            return this.uE
        },
        qX: function () {
            return /M040/i.test(navigator.userAgent)
        },
        OV: function () {
            var a = this.map,
                b = a.ra(),
                c = b.tK(a.Ra),
                e = a.lc,
                f = Math.ceil(e.lng / c),
                g = Math.ceil(e.lat / c),
                b = b.le(),
                c = [f, g, (e.lng - f * c) / c * b, (e.lat - g * c) / c * b];
            return [c[0] - Math.ceil((a.width / 2 - c[2]) / b), c[1] - Math.ceil((a.height / 2 - c[3]) / b), c[0] +
                Math.ceil((a.width / 2 + c[2]) / b), c[1] + Math.ceil((a.height / 2 + c[3]) / b), c]
        },
        nZ: function (a, b, c, e) {
            var f = this;
            f.R0 = b;
            var g = this.map.ra(),
                i = f.NC(a, c),
                k = g.le(),
                b = [a[0] * k + b[0], (-1 - a[1]) * k + b[1]],
                m = this.ig[i];
            if (this.map.ra() !== Za && this.map.ra() !== Ta) {
                var n = this.Bv(a[0], a[2]).offsetX;
                b[0] += n;
                b.k0 = n
            }
            m && m.Db ? (yb(m.Db, b), e && (e = new R(a[0], a[1]), g = this.map.K.oe ? this.map.K.oe.style : "normal",
                e = c.getTilesUrl(e, a[2], g), m.loaded = t, Pc(m, e)), m.loaded ? this.of() : Qc(m, function () {
                f.of()
            })) : (m = this.Hi[i]) && m.Db ? (c.Zb.insertBefore(m.Db, c.Zb.lastChild), this.ig[i] = m, yb(m.Db, b), e &&
                (e = new R(a[0], a[1]), g = this.map.K.oe ? this.map.K.oe.style : "normal", e = c.getTilesUrl(e, a[2],
                g), m.loaded = t, Pc(m, e)), m.loaded ? this.of() : Qc(m, function () {
                f.of()
            })) : (m = k * Math.pow(2, g.Ol() - a[2]), new J(a[0] * m, a[1] * m), e = new R(a[0], a[1]), g = this.map.K
                .oe ? this.map.K.oe.style : "normal", e = c.getTilesUrl(e, a[2], g), m = new Rc(this, e, b, a, c), Qc(m, function () {
                f.of()
            }), m.kn(), this.ig[i] = m)
        },
        of: function () {
            this.hk--;
            var a = this;
            0 == this.hk && (this.qi && (clearTimeout(this.qi), this.qi = q), this.qi = setTimeout(function () {
                if (a.hk == 0) {
                    a.map.dispatchEvent(new Q("ontilesloaded"));
                    if (wa) {
                        if (sa && ta && ua) {
                            var b = bb(),
                                c = a.map.yb();
                            setTimeout(function () {
                                Sa(5030, {
                                    load_script_time: ta - sa,
                                    load_tiles_time: b - ua,
                                    map_width: c.width,
                                    map_height: c.height,
                                    map_size: c.width * c.height
                                })
                            }, 1E4);
                            D.Ep("cus.fire", "time", {
                                z_imgfirstloaded: b - ua
                            })
                        }
                        wa = t
                    }
                }
                a.qi = q
            }, 80))
        },
        NC: function (a, b) {
            return this.map.ra() === Ra ? "TILE-" + b.aa + "-" + this.map.Hv + "-" + a[0] + "-" + a[1] + "-" + a[2] :
                "TILE-" + b.aa + "-" + a[0] + "-" + a[1] + "-" + a[2]
        },
        Gw: function (a) {
            var b = a.Db;
            b && (Sc(b), Ab(b) && b.parentNode.removeChild(b));
            delete this.ig[a.name];
            a.loaded || (Sc(b), Nc(a), a.Db = q, a.fm = q)
        },
        Bv: function (a, b) {
            for (var c = 0, e = 6 * Math.pow(2, b - 3), f = e / 2 - 1, g = -e / 2; a > f;) a -= e, c -= this.Mz;
            for (; a < g;) a += e, c += this.Mz;
            c = Math.round(c / Math.pow(2, 18 - b));
            return {
                offsetX: c,
                Dl: a
            }
        },
        TT: function (a) {
            for (var b = a.lng; b > this.TG;) b -= this.VG;
            for (; b < this.UG;) b += this.VG;
            a.lng = b;
            return a
        },
        UT: function (a, b) {
            for (var c = 256 * Math.pow(2, 18 - b), e = Math.floor(this.TG / c), f = Math.floor(this.UG / c), c = Math.floor(
                    this.Mz / c), g = [], i = 0; i < a.length; i++) {
                var k = a[i],
                    m = k[0],
                    k = k[1];
                if (m >= e) {
                    var m = m + c,
                        n = "id_" + m + "_" + k + "_" + b;
                    a[n] || (a[n] = p, g.push([m, k]))
                } else m <= f && (m -= c, n = "id_" + m + "_" + k + "_" + b, a[n] || (a[n] = p, g.push([m, k])))
            }
            for (i = 0; i < g.length; i++) a.push(g[i]);
            return a
        },
        Jf: function (a) {
            if (!this.map.K.Mi) {
                var b = this;
                if (b.map.ra() == Ra) K.load("coordtrans", function () {
                        b.map.Nb || (b.map.Nb = Ra.Vj(b.map.Kg), b.map.Hv = Ra.SJ(b.map.Nb));
                        b.XG()
                    }, p);
                else {
                    if (a && a) for (var c in this.Hi) delete this.Hi[c];
                    b.XG(a)
                }
            }
        },
        XG: function (a) {
            var b = this.dm.concat(this.Mf),
                c = b.length,
                e = this.map,
                f = e.ra(),
                g = e.lc;
            this.map.ra() !== Za && this.map.ra() !== Ta && (g = this.TT(g));
            for (var i = 0; i < c; i++) {
                var k = b[i];
                if (k.Yb && e.Ra < k.Yb) break;
                if (k.Av) {
                    var m = this.Zb = k.Zb;
                    if (a) {
                        var n = m;
                        if (n && n.childNodes) for (var o = n.childNodes.length, s = o - 1; 0 <= s; s--) o = n.childNodes[
                                    s], n.removeChild(o), o = q
                    }
                    if (this.map.Dd()) {
                        this.$f.style.display = "block";
                        m.style.display = "none";
                        this.map.dispatchEvent(new Q("vectorchanged"), {
                            isvector: p
                        });
                        continue
                    } else m.style.display = "block", this.$f.style.display = "none", this.map.dispatchEvent(new Q(
                            "vectorchanged"), {
                            isvector: t
                        })
                }
                if (!k.j0 && !(k.Rw && !this.map.Dd() || k.VK && this.map.Dd())) {
                    e = this.map;
                    f = e.ra();
                    m = f.Rl();
                    o = e.Ra;
                    g = e.lc;
                    f == Ra && g.fc(new J(0, 0)) && (g = e.lc = m.Rh(e.he, e.Nb));
                    var v = f.kc(o),
                        m = f.tK(o),
                        n = Math.ceil(g.lng / m),
                        x = Math.ceil(g.lat / m),
                        y = f.le(),
                        m = [n, x, (g.lng - n * m) / m * y, (g.lat - x * m) / m * y],
                        s = m[0] - Math.ceil((e.width / 2 - m[2]) / y),
                        n = m[1] - Math.ceil((e.height / 2 - m[3]) / y),
                        x = m[0] + Math.ceil((e.width / 2 + m[2]) / y),
                        A = 0;
                    f === Ra && 15 == e.ga() && (A = 1);
                    f = m[1] + Math.ceil((e.height / 2 + m[3]) / y) + A;
                    this.AI = new J(g.lng, g.lat);
                    var C = this.ig,
                        y = -this.AI.lng / v,
                        A = this.AI.lat / v,
                        v = [Math.ceil(y), Math.ceil(A)],
                        g = e.ga(),
                        B;
                    for (B in C) {
                        var F = C[B],
                            E = F.info;
                        (E[2] != g || E[2] == g && (s > E[0] || x <= E[0] || n > E[1] || f <= E[1])) && this.Gw(F)
                    }
                    C = -e.offsetX + e.width / 2;
                    F = -e.offsetY + e.height / 2;
                    k.Zb && (k.Zb.style.left = Math.ceil(y + C) - v[0] + "px", k.Zb.style.top = Math.ceil(A + F) - v[1] +
                        "px", k.Zb.style.WebkitTransform = "translate3d(0,0,0)");
                    y = [];
                    for (e.IA = []; s < x; s++) for (A = n; A < f; A++) y.push([s, A]), e.IA.push({
                                x: s,
                                y: A
                            });
                    this.map.ra() !== Za && this.map.ra() !== Ta && (y = this.UT(y, o));
                    y.sort(function (a) {
                        return function (b, c) {
                            return 0.4 * Math.abs(b[0] - a[0]) + 0.6 * Math.abs(b[1] - a[1]) - (0.4 * Math.abs(c[0] - a[
                                0]) + 0.6 * Math.abs(c[1] - a[1]))
                        }
                    }([m[0] - 1, m[1] - 1]));
                    o = y.length;
                    this.hk += o;
                    for (s = 0; s < o; s++) this.nZ([y[s][0], y[s][1], g], v, k, a)
                }
            }
        },
        Ee: function (a) {
            var b = this,
                c = a.target;
            b.map.Dd();
            c.Dm && this.map.Ee(c.Dm);
            if (c.Rw) {
                for (a = 0; a < b.og.length; a++) if (b.og[a] == c) return;
                K.load("vector", function () {
                    c.ta(b.map, b.$f);
                    b.og.push(c)
                }, p)
            } else {
                for (a = 0; a < b.Mf.length; a++) if (b.Mf[a] == c) return;
                c.ta(this.map, this.bl);
                b.Mf.push(c)
            }
        },
        Lf: function (a) {
            a = a.target;
            this.map.Dd();
            a.Dm && this.map.Lf(a.Dm);
            if (a.Rw) for (var b = 0, c = this.og.length; b < c; b++) a == this.og[b] && this.og.splice(b, 1);
            else {
                b = 0;
                for (c = this.Mf.length; b < c; b++) a == this.Mf[b] && this.Mf.splice(b, 1)
            }
            a.remove()
        },
        ng: function () {
            for (var a = this.dm, b = 0, c = a.length; b < c; b++) a[b].remove();
            delete this.Zb;
            this.dm = [];
            this.Hi = this.ig = {};
            this.Kw();
            this.Jf()
        },
        Ec: function () {
            var a = this;
            a.ld && z.D.U(a.ld);
            setTimeout(function () {
                a.Jf();
                a.map.dispatchEvent(new Q("onzoomend"))
            }, 10)
        },
        w4: u(),
        Ts: function (a) {
            var b = this.map.ra();
            if (!this.map.Dd() && (a ? this.map.K.uZ = a : a = this.map.K.uZ, a)) for (var c = q, c = "2" == D.wt ? [D.url
                            .proto + D.url.domain.main_domain_cdn.other[0] + "/"] : [D.url.proto + D.url.domain.main_domain_cdn
                            .baidu[0] + "/", D.url.proto + D.url.domain.main_domain_cdn.baidu[1] + "/", D.url.proto + D
                            .url.domain.main_domain_cdn.baidu[2] + "/"], e = 0, f; f = this.dm[e]; e++) if (f.iZ == p) {
                        b.j.gc = 19;
                        f.getTilesUrl = function (b, e) {
                            var f = b.x,
                                f = this.map.ei.Bv(f, e).Dl,
                                m = b.y,
                                n = Sb("normal"),
                                o = 1;
                            this.map.Hw() && (o = 2);
                            n = "customimage/tile?&x=" + f + "&y=" + m + "&z=" + e + "&udt=" + n + "&scale=" + o +
                                "&ak=" + ra;
                            n = a.styleStr ? n + ("&styles=" + encodeURIComponent(a.styleStr)) : n + ("&customid=" + a.style);
                            return c[Math.abs(f + m) % c.length] + n
                        };
                        break
                    }
        }
    });

    function Rc(a, b, c, e, f) {
        this.fm = a;
        this.position = c;
        this.Xt = [];
        this.name = a.NC(e, f);
        this.info = e;
        this.aI = f.rs();
        e = N("img");
        zb(e);
        e.LJ = t;
        var g = e.style,
            a = a.map.ra();
        g.position = "absolute";
        g.border = "none";
        g.width = a.le() + "px";
        g.height = a.le() + "px";
        g.left = c[0] + "px";
        g.top = c[1] + "px";
        g.maxWidth = "none";
        this.Db = e;
        this.src = b;
        Tc && (this.Db.style.opacity = 0);
        var i = this;
        this.Db.onload = function () {
            D.yX.nP();
            i.loaded = p;
            if (i.fm) {
                var a = i.fm,
                    b = a.Hi;
                if (!b[i.name]) {
                    a.ND++;
                    b[i.name] = i
                }
                if (i.Db && !Ab(i.Db) && f.Zb) {
                    f.Zb.appendChild(i.Db);
                    if (z.ca.ia <= 6 && z.ca.ia > 0 && i.aI) i.Db.style.cssText = i.Db.style.cssText + (
                            ';filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + i.src +
                            '",sizingMethod=scale);')
                }
                var c = a.ND - a.RT,
                    e;
                for (e in b) {
                    if (c <= 0) break;
                    if (!a.ig[e]) {
                        b[e].fm = q;
                        var g = b[e].Db;
                        if (g && g.parentNode) {
                            g.parentNode.removeChild(g);
                            Sc(g)
                        }
                        g = q;
                        b[e].Db = q;
                        delete b[e];
                        a.ND--;
                        c--
                    }
                }
                Tc && new ub({
                    Bc: 20,
                    duration: 200,
                    va: function (a) {
                        if (i.Db && i.Db.style) i.Db.style.opacity = a * 1
                    },
                    finish: function () {
                        i.Db && i.Db.style && delete i.Db.style.opacity
                    }
                });
                Nc(i)
            }
        };
        this.Db.onerror = function () {
            Nc(i);
            if (i.fm) {
                var a = i.fm.map.ra();
                if (a.j.cC) {
                    i.error = p;
                    i.Db.src = a.j.cC;
                    i.Db && !Ab(i.Db) && f.Zb.appendChild(i.Db)
                }
            }
        };
        e = q
    }
    function Qc(a, b) {
        a.Xt.push(b)
    }
    Rc.prototype.kn = function () {
        this.Db.src = 0 < z.ca.ia && 6 >= z.ca.ia && this.aI ? H.oa + "blank.gif" : "" !== this.src && this.Db.src ==
            this.src ? this.src + "&t = " + Date.now() : this.src
    };

    function Nc(a) {
        for (var b = 0; b < a.Xt.length; b++) a.Xt[b]();
        a.Xt.length = 0
    }
    function Sc(a) {
        if (a) {
            a.onload = a.onerror = q;
            var b = a.attributes,
                c, e, f;
            if (b) {
                e = b.length;
                for (c = 0; c < e; c += 1) f = b[c].name, Ya(a[f]) && (a[f] = q)
            }
            if (b = a.children) {
                e = b.length;
                for (c = 0; c < e; c += 1) Sc(a.children[c])
            }
        }
    }
    function Pc(a, b) {
        a.src = b;
        a.kn()
    }
    var Tc = !z.ca.ia || 8 < z.ca.ia;

    function Mc(a) {
        this.Le = a || {};
        this.oU = this.Le.copyright || q;
        this.VZ = this.Le.transparentPng || t;
        this.Av = this.Le.baseLayer || t;
        this.zIndex = this.Le.zIndex || 0;
        this.aa = Mc.XQ++
    }
    Mc.XQ = 0;
    z.lang.sa(Mc, z.lang.Ca, "TileLayer");
    z.extend(Mc.prototype, {
        ta: function (a, b) {
            this.Av && (this.zIndex = -100);
            this.map = a;
            if (!this.Zb) {
                var c = N("div"),
                    e = c.style;
                e.position = "absolute";
                e.overflow = "visible";
                e.zIndex = this.zIndex;
                e.left = Math.ceil(-a.offsetX + a.width / 2) + "px";
                e.top = Math.ceil(-a.offsetY + a.height / 2) + "px";
                b.appendChild(c);
                this.Zb = c
            }
        },
        remove: function () {
            this.Zb && this.Zb.parentNode && (this.Zb.innerHTML = "", this.Zb.parentNode.removeChild(this.Zb));
            delete this.Zb
        },
        rs: w("VZ"),
        getTilesUrl: function (a, b) {
            if (this.map.ra() !== Za && this.map.ra() !== Ta) var c = this.map.ei.Bv(a.x, b).Dl;
            var e = "";
            this.Le.tileUrlTemplate && (e = this.Le.tileUrlTemplate.replace(/\{X\}/, c), e = e.replace(/\{Y\}/, a.y), e =
                e.replace(/\{Z\}/, b));
            return e
        },
        Ll: w("oU"),
        ra: function () {
            return this.Xb || Oa
        }
    });

    function Uc(a) {
        Mc.call(this, a);
        this.j = a || {};
        this.VK = p;
        if (this.j.predictDate) {
            if (1 > this.j.predictDate.weekday || 7 < this.j.predictDate.weekday) this.j.predictDate = 1;
            if (0 > this.j.predictDate.hour || 23 < this.j.predictDate.hour) this.j.predictDate.hour = 0
        }
        this.YS = D.url.proto + D.url.domain.traffic + "/traffic/"
    }
    Uc.prototype = new Mc;
    Uc.prototype.ta = function (a, b) {
        Mc.prototype.ta.call(this, a, b);
        this.B = a
    };
    Uc.prototype.rs = ca(p);
    Uc.prototype.getTilesUrl = function (a, b) {
        var c = "";
        this.j.predictDate ? c = "HistoryService?day=" + (this.j.predictDate.weekday - 1) + "&hour=" + this.j.predictDate
            .hour + "&t=" + (new Date).getTime() + "&" : (c = "TrafficTileService?time=" + (new Date).getTime() + "&",
            c += "label=web2D&v=016&");
        var c = this.YS + c + "level=" + b + "&x=" + a.x + "&y=" + a.y,
            e = 1;
        this.B.Hw() && (e = 2);
        return (c + "&scaler=" + e).replace(/-(\d+)/gi, "M$1")
    };
    var Vc = [D.url.proto + D.url.domain.TILES_YUN_HOST[0] + "/georender/gss", D.url.proto + D.url.domain.TILES_YUN_HOST[
            1] + "/georender/gss", D.url.proto + D.url.domain.TILES_YUN_HOST[2] + "/georender/gss", D.url.proto + D.url
            .domain.TILES_YUN_HOST[3] + "/georender/gss"],
        Wc = D.url.proto + D.url.domain.main_domain_nocdn.baidu + "/style/poi/rangestyle",
        Xc = 100;

    function pb(a, b) {
        Mc.call(this);
        var c = this;
        this.VK = p;
        try {
            document.createElement("canvas").getContext("2d")
        } catch (e) {}
        Ib(a) ? b = a || {} : (c.Wm = a, b = b || {});
        b.geotableId && (c.qf = b.geotableId);
        b.databoxId && (c.Wm = b.databoxId);
        var f = D.ge + "geosearch";
        c.Va = {
            eM: b.pointDensity || Xc,
            PW: f + "/detail/",
            QW: f + "/v2/detail/",
            xI: b.age || 36E5,
            Ms: b.q || "",
            FZ: "png",
            y2: [5, 5, 5, 5],
            uX: {
                backgroundColor: "#FFFFD5",
                borderColor: "#808080"
            },
            UA: b.ak || ra,
            qE: b.tags || "",
            filter: b.filter || "",
            SM: b.sortby || "",
            UC: b.hotspotName || "tile_md_" + (1E5 * Math.random()).toFixed(0),
            EE: p
        };
        K.load("clayer", function () {
            c.Gd()
        })
    }
    pb.prototype = new Mc;
    pb.prototype.ta = function (a, b) {
        Mc.prototype.ta.call(this, a, b);
        this.B = a
    };
    pb.prototype.getTilesUrl = function (a, b) {
        var c = a.x,
            e = a.y,
            f = this.Va,
            c = Vc[Math.abs(c + e) % Vc.length] + "/image?grids=" + c + "_" + e + "_" + b + "&q=" + f.Ms + "&tags=" + f
                .qE + "&filter=" + f.filter + "&sortby=" + f.SM + "&ak=" + this.Va.UA + "&age=" + f.xI + "&page_size=" +
                f.eM + "&format=" + f.FZ;
        f.EE || (f = (1E5 * Math.random()).toFixed(0), c += "&timeStamp=" + f);
        this.qf ? c += "&geotable_id=" + this.qf : this.Wm && (c += "&databox_id=" + this.Wm);
        return c
    };
    pb.prototype.enableUseCache = function () {
        this.Va.EE = p
    };
    pb.prototype.disableUseCache = function () {
        this.Va.EE = t
    };
    pb.wS = /^point\(|\)$/ig;
    pb.xS = /\s+/;
    pb.zS = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    var Yc = {};

    function Zc(a, b) {
        this.ad = a;
        this.DO = 18;
        this.j = {
            Nx: 256,
            Ic: new S
        };
        z.extend(this.j, b || {})
    }
    var $c = [0, 0, 0, 8, 7, 7, 6, 6, 5, 5, 4, 3, 3, 3, 2, 2, 1, 1, 0, 0, 0, 0],
        ad = [512, 2048, 4096, 32768, 65536, 262144, 1048576, 4194304, 8388608],
        bd = [0, 0, 0, 3, 5, 5, 7, 7, 9, 9, 10, 12, 12, 12, 15, 15, 17, 17, 19, 19, 19, 19],
        cd = [0, 0, 0, 256, 256, 512, 256, 512, 256, 512, 256, 256, 512, 1024, 256, 512, 512, 1024, 512, 1024, 2048,
                4096];
    Zc.prototype = {
        getName: w("ad"),
        le: function (a) {
            return "na" === this.ad ? cd[a] : this.j.Nx
        },
        lw: function (a) {
            return "na" === this.ad ? bd[a] : a
        },
        Rl: function () {
            return this.j.Ic
        },
        kc: function (a) {
            return Math.pow(2, this.DO - a)
        },
        EC: function (a) {
            return "na" === this.ad ? ad[$c[a]] : this.kc(a) * this.le(a)
        }
    };
    var dd = {
        drawPoly: function (a, b, c, e, f, g) {
            var i = a[1];
            if (i) for (var a = a[6], k = 0; k < i.length; k++) {
                    var m = f.Vi(i[k][0], "polygon", c, g);
                    if (m && m.length) for (var n = i[k][1], o = 0; o < n.length; o++) {
                            var s = n[o][1];
                            f.Hc(s[0], c) && (s["cache" + c] || (s["cache" + c] = f.lm(s[1], c, e, a)), this.eV(b, s[
                                "cache" + c], m))
                    }
            }
        },
        eV: function (a, b, c) {
            c = c[0];
            a.fillStyle = c.gw;
            a.beginPath();
            a.moveTo(b[0], b[1]);
            for (var e = 2, f = b.length; e < f; e += 2) a.lineTo(b[e], b[e + 1]);
            a.closePath();
            c.borderWidth && (a.strokeStyle = c.Sn, a.lineWidth = c.borderWidth / 2, a.stroke());
            a.fill()
        },
        drawGaoqingRoadBorder: function (a, b, c, e, f) {
            var g = a[1];
            if (g) for (var a = a[6], i = 0; i < g.length; i++) {
                    var k = f.Vi(g[i][0], "polygon", c);
                    if (k && k.length && k[0].borderWidth) for (var m = g[i][1], n = 0; n < m.length; n++) {
                            var o = m[n][1];
                            f.Hc(o[0], c) && (o["cache" + c] || (o["cache" + c] = f.lm(o[1], c, e, a)), this.gV(b, o[
                                "cache" + c], k))
                    }
            }
        },
        drawGaoqingRoadFill: function (a, b, c, e, f) {
            var g = a[1];
            if (g) for (var a = a[6], i = 0; i < g.length; i++) {
                    var k = f.Vi(g[i][0], "polygon", c);
                    if (k && k.length) for (var m = g[i][1], n = 0; n < m.length; n++) {
                            var o = m[n][1];
                            f.Hc(o[0], c) && (o["cache" + c] || (o["cache" + c] = f.lm(o[1], c, e, a)), this.hV(b, o[
                                "cache" + c], k))
                    }
            }
        },
        gV: function (a, b, c) {
            c = c[0];
            a.beginPath();
            a.moveTo(b[0], b[1]);
            for (var e = 2, f = b.length; e < f; e += 2) a.lineTo(b[e], b[e + 1]);
            a.closePath();
            a.strokeStyle = c.Sn;
            a.lineWidth = c.borderWidth / 2;
            a.stroke()
        },
        hV: function (a, b, c) {
            a.fillStyle = c[0].gw;
            a.beginPath();
            a.moveTo(b[0], b[1]);
            for (var c = 2, e = b.length; c < e; c += 2) a.lineTo(b[c], b[c + 1]);
            a.closePath();
            a.fill()
        }
    };
    var ed = {
        drawArrow: function (a, b, c, e, f, g) {
            b.lineWidth = 1.5;
            b.lineCap = "butt";
            b.lineJoin = "miter";
            b.strokeStyle = "rgba(153,153,153,1)";
            var i = a[7];
            if (i) {
                a = i[1];
                e = g.lm(i[0], c, e);
                for (i = 0; i < a.length; i++) if (g.Hc(a[i], c)) {
                        var k = e[4 * i],
                            m = e[4 * i + 1],
                            n = e[4 * i + 2],
                            o = e[4 * i + 3],
                            s = (k + n) / 2,
                            v = (m + o) / 2,
                            n = (k - n) / f,
                            o = (m - o) / f,
                            k = s + n / 2,
                            n = s - n / 2,
                            m = v + o / 2,
                            o = v - o / 2;
                        this.XU(b, k, m, n, o)
                    }
            }
        },
        XU: function (a, b, c, e, f) {
            a.beginPath();
            a.moveTo(b, c);
            a.lineTo(e, f);
            a.stroke();
            c = this.ST([b, c], [e, f]);
            b = c[0];
            c = c[1];
            a.beginPath();
            a.moveTo(b[0], b[1]);
            a.lineTo(c[0], c[1]);
            a.lineTo(e, f);
            a.closePath();
            a.stroke()
        },
        ST: function (a, b) {
            var c = b[0] - a[0],
                e = b[1] - a[1],
                f = 1.8 * Math.sqrt(c * c + e * e),
                g = b[0] + 4.8410665352790705 * (c / f),
                f = b[1] + 4.8410665352790705 * (e / f),
                c = Math.atan2(e, c) + Math.PI;
            return [[g + 4.8410665352790705 * Math.cos(c - 0.3), f + 4.8410665352790705 * Math.sin(c - 0.3)], [g + 4.8410665352790705 *
                    Math.cos(c + 0.3), f + 4.8410665352790705 * Math.sin(c + 0.3)]]
        }
    };
    var fd = {
        drawHregion: function (a, b, c, e, f) {
            var g = a[1];
            if (g) for (var a = a[6], i = 0; i < g.length; i++) {
                    var k = f.Vi(g[i][0], "polygon3d", c);
                    if (k && k.length) for (var m = g[i][1], n = 0; n < m.length; n++) {
                            var o = m[n][2];
                            if (f.Hc(o[0], c)) {
                                var s = o[2];
                                o["cache" + c] || (o["cache" + c] = f.lm(o[1], c, e, a));
                                this.fV(b, o["cache" + c], s, k)
                            }
                    }
            }
        },
        fV: function (a, b, c, e) {
            e = e[0];
            if (!(c < e.filter)) {
                a.fillStyle = e.xV;
                a.beginPath();
                a.moveTo(b[0], b[1]);
                for (var c = 2, f = b.length; c < f; c += 2) a.lineTo(b[c], b[c + 1]);
                a.closePath();
                e.borderWidth && (a.strokeStyle = e.Sn, a.lineWidth = e.borderWidth / 2, a.stroke());
                a.fill()
            }
        }
    };
    var gd = {
        parse: function (a, b, c, e, f) {
            for (var g = e.B, i = g.ga(), k = Math.pow(2, 18 - i), m = g.Ic.Rh(g.tb()), n = m.lng, o = m.lat, g = g.yb(),
                    s = g.width, v = g.height, g = [], m = 0; m < a.length; m++) {
                var x = [],
                    y = a[m].DZ;
                x.x = y[0];
                x.y = y[1];
                x.I4 = y[2];
                for (var A = (y[0] * c * k - n) / k + s / 2, C = (o - (y[1] + 1) * c * k) / k + v / 2, B = 0; B < a[m].length; B++)
                    a[m][B].aL ? this.aM(a[m][B].aL, y, e, b, c, A, C, i, k, s, v, x) : a[m][B].WW ? this.aM(a[m][B].WW,
                        y, e, b, c, A, C, i, k, s, v, x, p, window.C2) : this.bY(a[m][B].vX, y, e, b, c, A, C, i, k, s,
                        v, x, f);
                g.push(x)
            }
            if (/collision=0/.test(location.search)) {
                a = [];
                for (m = 0; m < g.length; m++) for (B = 0; B < g[m].length; B++) a.push(g[m][B])
            } else a = this.nY(g, e.B.ga());
            for (m = 0; m < a.length; m++) if (c = a[m], !c.Nw) if ("fixed" === c.type) {
                        f = t;
                        c.me && (c.style && 4 === c.direction) && (f = p);
                        if (c.me) if (f) {
                                var F = this;
                                this.Hr(b, c, e, f, function (a) {
                                    for (var c = 0; c < a.kf.length; c++) F.uJ(b, a.kf[c].Qd, a.kf[c].Rd, a.kf[c].text,
                                            a.style, e)
                                })
                            } else this.Hr(b, c, e);
                        if (c.style && !f) for (B = 0; B < c.kf.length; B++) this.uJ(b, c.kf[B].Qd, c.kf[B].Rd, c.kf[B]
                                    .text, c.style, e)
                    } else if ("line" === c.type) for (B = 0; B < c.GN.length; B++) f = c.GN[B], gd.aV(b, f.Qd, f.Rd, f
                        .vT, f.EN, f.width, f.height, c.style, e);
            return g
        },
        aM: function (a, b, c, e, f, g, i, k, m, n, o, s, v, x) {
            a = a[1];
            b = k;
            9 === b && (b = 8);
            for (var y = 0; y < a.length; y++) {
                var A = a[y],
                    C = A[0],
                    B = c.Vi(C, "point", b, x),
                    C = c.Vi(C, "pointText", b, x),
                    A = A[1],
                    F = q,
                    E = 100,
                    G = 0,
                    P = 0;
                B && B[0] && (B = B[0], F = B.me, E = B.zoom || 100);
                C = C && C[0] ? C[0] : q;
                for (B = 0; B < A.length; B++) {
                    var L = A[B][4];
                    if (L && c.Hc(L[2], k)) {
                        var M = Math.round(L[0] / 100) / m + g,
                            V = f - Math.round(L[1] / 100) / m + i;
                        if (v || !(-50 > M || -50 > V || M > n + 50 || V > o + 50)) {
                            var ja = L[7] || "",
                                la = {
                                    type: "fixed",
                                    uid: L[3] || "",
                                    name: ja,
                                    sx: L[4],
                                    hs: q,
                                    kf: [],
                                    gx: [M, V],
                                    style: C
                                };
                            if (F) {
                                var ya = window.iconSetInfo_high[F];
                                if (!ya) {
                                    var Ea = F.charCodeAt(0);
                                    48 <= Ea && 57 >= Ea && (ya = window.iconSetInfo_high["_" + F])
                                }
                                ya && (G = ya[2], P = ya[3], G = G / 2 * E / 100, P = P / 2 * E / 100, la.hs = {
                                    Qd: M - G / 2,
                                    Rd: V - P / 2,
                                    width: G,
                                    height: P
                                }, la.me = F)
                            }
                            if (C) {
                                L = L[5];
                                "number" !== typeof L && (L = 0);
                                var va = ya = 0,
                                    Ea = C.fontSize / 2,
                                    oa = 0.2 * Ea;
                                e.font = gd.nw(C, c);
                                var ja = ja.split("\\"),
                                    gb = ja.length;
                                la.direction = L;
                                for (var nb = 0; nb < gb; nb++) {
                                    var re = ja[nb],
                                        Oc = e.measureText(re).width;
                                    switch (L) {
                                    case 3:
                                        va = V - Ea / 2 * gb - oa * (gb - 1) / 2;
                                        ya = M - Oc - G / 2;
                                        va = va + Ea * nb + oa * nb;
                                        break;
                                    case 1:
                                        va = V - Ea / 2 * gb - oa * (gb - 1) / 2;
                                        ya = M + G / 2;
                                        va = va + Ea * nb + oa * nb;
                                        break;
                                    case 2:
                                        va = V - P / 2 - Ea * gb - oa * (gb - 1) - oa;
                                        ya = M - Oc / 2;
                                        va = va + Ea * nb + oa * nb;
                                        break;
                                    case 0:
                                        va = V + P / 2 + oa / 2;
                                        ya = M - Oc / 2;
                                        va = va + Ea * nb + oa * nb;
                                        break;
                                    case 4:
                                        va = V - Ea / 2 * gb - oa * (gb - 1) / 2, ya = M - Oc / 2, va = va + Ea * nb +
                                            oa * nb
                                    }
                                    la.kf.push({
                                        Qd: ya,
                                        Rd: va,
                                        width: Oc,
                                        height: Ea,
                                        text: re
                                    })
                                }
                            }
                            s.push(la)
                        }
                    }
                }
            }
        },
        bY: function (a, b, c, e, f, g, i, k, m, n, o, s, v) {
            b = a[7].length;
            if ((n = c.Vi(a[0], "pointText", k)) && n.length) {
                n = n[0];
                e.font = gd.nw(n, c);
                for (var o = n.fontSize / 2, x = a[1], y = a[2], A = y.split("").length, C = a[4], B = C.slice(0, 2), F =
                        2; F < C.length; F += 2) B[F] = B[F - 2] + C[F], B[F + 1] = B[F - 1] + C[F + 1];
                for (F = 2; F < C.length; F += 2) 0 === F % (2 * A) || 1 === F % (2 * A) || (B[F] = B[F - 2] + C[F] / v,
                        B[F + 1] = B[F - 1] + C[F + 1] / v);
                for (v = 0; v < b; v++) if (c.Hc(a[7][v], k)) {
                        var F = [],
                            E = l,
                            G = l,
                            P = l,
                            L = l,
                            M = y.split("");
                        a[6][v] && M.reverse();
                        for (var C = 2 * v * A, C = B.slice(C, C + 2 * A), V = 0; V < A; V++) {
                            var ja = a[5][A * v + V],
                                la = C[2 * V] / 100 / m + g,
                                ya = f - C[2 * V + 1] / 100 / m + i,
                                Ea = M[V],
                                va = e.measureText(Ea).width;
                            if (E === l) E = la - va / 2, G = ya - o / 2, P = E + va, L = G + o;
                            else {
                                var oa = la - va / 2,
                                    gb = ya - o / 2;
                                oa < E && (E = oa);
                                gb < G && (G = gb);
                                oa + va > P && (P = oa + va);
                                gb + o > L && (L = gb + o)
                            }
                            F.push({
                                EN: Ea,
                                Qd: la,
                                Rd: ya,
                                vT: ja,
                                width: va,
                                height: o
                            })
                        }
                        s.push({
                            type: "line",
                            sx: x,
                            style: n,
                            GN: F,
                            Uh: E,
                            Vh: G,
                            ek: P,
                            fk: L
                        })
                    }
            }
        },
        Hr: function (a, b, c, e, f) {
            var g = b.me;
            if (gd.Iw[g]) this.rJ(a, b, gd.Iw[g], e, f);
            else {
                var c = c.ZJ(g),
                    i = new Image,
                    k = this;
                i.onload = function () {
                    gd.Iw[g] = this;
                    k.rJ(a, b, this, e, f);
                    i.onload = q
                };
                i.src = c
            }
        },
        rJ: function (a, b, c, e, f) {
            var g = b.hs,
                i = g.Qd,
                k = g.Rd,
                m = q,
                n = q,
                o = p,
                s = b.style ? b.style.tk : q;
            if (b.style && 62203 === s) {
                for (var v = n = m = 0; v < b.kf.length; v++) m < b.kf[v].width && (m = b.kf[v].width), n += 20;
                m = Math.ceil(m) + 10
            }
            e && 519 === s && (o = t);
            m !== q && n !== q ? this.dV(a, b, c, 8, m, n) : e && o ? (m = Math.ceil(b.kf[0].width) + 6, this.WU(a, b,
                c, 12, m, c.height / 2)) : a.drawImage(c, i, k, g.width, g.height);
            f && f(b)
        },
        dV: function (a, b, c, e, f, g) {
            var i = b.gx[0] - f / 2,
                b = b.gx[1] - g / 2;
            0 < navigator.userAgent.indexOf("iPhone") && (b += 1);
            var k = e / 2;
            a.drawImage(c, 0, 0, e, e, i, b, k, k);
            a.drawImage(c, e, 0, 1, e, i + k, b, f - 2 * k, k);
            a.drawImage(c, c.width - e, 0, e, e, i + f - k, b, k, k);
            a.drawImage(c, 0, e, e, 1, i, b + k, k, g - 2 * k);
            a.drawImage(c, e, e, 1, 1, i + k, b + k, f - 2 * k, g - 2 * k);
            a.drawImage(c, c.width - e, e, e, 1, i + f - k, b + k, k, g - 2 * k);
            a.drawImage(c, 0, c.height - e, e, e, i, b + g - k, k, k);
            a.drawImage(c, e, c.height - e, 1, e, i + k, b + g - k, f - 2 * k, k);
            a.drawImage(c, c.width - e, c.height - e, e, e, i + f - k, b + g - k, k, k)
        },
        WU: function (a, b, c, e, f, g) {
            var i = b.gx[0] - f / 2,
                b = b.gx[1] - g / 2,
                g = e / 2;
            a.drawImage(c, 0, 0, e, c.height, i, b, g, c.height / 2);
            a.drawImage(c, e, 0, 1, c.height, i + g, b, f - 2 * g, c.height / 2);
            a.drawImage(c, c.width - e, 0, e, c.height, i + f - g, b, g, c.height / 2)
        },
        aV: function (a, b, c, e, f, g, i, k, m) {
            a.font = gd.nw(k, m);
            a.fillStyle = k.JJ;
            g /= 2;
            i /= 2;
            a.save();
            a.translate(b, c);
            a.rotate(-e / 180 * Math.PI);
            0 < k.zK && (a.strokeStyle = k.yK, a.strokeText(f, -g, -i));
            a.fillText(f, -g, -i);
            a.restore()
        },
        uJ: function (a, b, c, e, f, g) {
            a.font = gd.nw(f, g);
            a.fillStyle = f.JJ;
            0 < f.zK && (a.strokeStyle = f.yK, a.strokeText(e, b, c));
            a.fillText(e, b, c)
        },
        nw: function (a, b) {
            var c = a.fontSize / 2,
                e = 2 === a.fontWeight ? "italic" : "";
            return e = b.gD ? e + " bold" + (" " + c + "px") + ' arial, "PingFang SC", sans-serif' : e + (" " + c +
                "px") + " arial, sans-serif"
        },
        nY: function (a, b) {
            var c = [],
                e = 0;
            5 === b && (e = 1);
            a.sort(function (a, b) {
                return a.x * a.y < b.x * b.y ? -1 : 1
            });
            for (var f = 0, g = a.length; f < g; f++) for (var i = a[f], k = 0, m = i.length; k < m; k++) {
                    var n = i[k],
                        o = l,
                        s = l,
                        v = l,
                        x = l;
                    if ("fixed" === n.type) {
                        var y = n.hs,
                            A = n.kf;
                        y && (o = y.Qd, s = y.Rd, v = y.Qd + y.width, x = y.Rd + y.height);
                        for (y = 0; y < A.length; y++) {
                            var C = A[y];
                            o !== l ? (C.Qd < o && (o = C.Qd), C.Rd < s && (s = C.Rd), C.Qd + C.width > v && (v = C.Qd +
                                C.width), C.Rd + C.height > x && (x = C.Rd + C.height)) : (o = C.Qd, s = C.Rd, v = C.Qd +
                                C.width, x = C.Rd + C.height)
                        }
                    } else "line" === n.type ? (o = n.Uh, s = n.Vh, v = n.ek, x = n.fk) : "biaopai" === n.type && (x =
                            n.z3, o = x.Qd, s = x.Rd, v = x.Qd + x.width, x = x.Rd + x.height);
                    o !== l && (n.Uh = o, n.Vh = s, n.ek = v, n.fk = x, c.push(n))
            }
            c.sort(function (a, b) {
                return b.sx - a.sx || b.Uh - a.Uh || b.Vh - a.Vh
            });
            f = 0;
            for (g = c.length; f < g; f++) {
                m = c[f];
                m.Nw = t;
                m.DI = [];
                for (k = f + 1; k < g; k++) i = c[k], m.ek - e < i.Uh || (m.Uh > i.ek - e || m.fk - e < i.Vh || m.Vh >
                        i.fk - e) || m.DI.push(k)
            }
            f = 0;
            for (g = c.length; f < g; f++) if (k = c[f], k.Nw === t) {
                    e = k.DI;
                    k = 0;
                    for (m = e.length; k < m; k++) c[e[k]].Nw = p
                }
            return c
        },
        Iw: {}
    };
    var hd = ["round", "butt", "square"],
        id = ["miter", "round", "bevel"],
        jd = {
            $0: [{
                    stroke: "#FF6600",
                    Cb: 1,
                    Ab: "round",
                    Bb: "round",
                    ae: [4, 3]
                }],
            a1: [{
                    stroke: "#f5f3f0",
                    Cb: 1,
                    Ab: "round",
                    Bb: "round",
                    ae: [4, 3]
                }],
            N2: [{
                    stroke: "#DB7093",
                    Cb: 1,
                    Ab: "round",
                    Bb: "round",
                    ae: [4, 3]
                }],
            X2: [{
                    stroke: "#5c91c5",
                    Cb: 1,
                    Ab: "round",
                    Bb: "round",
                    ae: [10, 11]
                }],
            b4: [{
                    stroke: "#737373",
                    Cb: 1,
                    Ab: "round",
                    Bb: "round",
                    ae: [6, 3]
                }],
            G4: [{
                    stroke: "#aea08a",
                    Cb: 1,
                    Ab: "round",
                    Bb: "round",
                    ae: [4, 3]
                }]
        }, kd = {};

    function ld(a, b) {
        if ("tielu" === a || "tielu_0" === a) {
            if ("off" === window.bmapRailwayVisibility) return [];
            var c = "#ffffff",
                e = "#949494";
            window.bmapRailwayStrokeColor && (c = window.bmapRailwayStrokeColor);
            window.bmapRailwayFillColor && (e = window.bmapRailwayFillColor);
            if (4 <= b && 9 >= b || 10 <= b && 16 >= b) return [{
                    stroke: c,
                    Cb: 1.5,
                    Ab: "butt",
                    Bb: "round",
                    ae: [10, 11]
                }, {
                    stroke: e,
                    Cb: 2,
                    Ab: "round",
                    Bb: "round"
                }];
            if (17 <= b && 18 >= b) return [{
                    stroke: c,
                    Cb: 2.5,
                    Ab: "butt",
                    Bb: "round",
                    ae: [15, 16]
                }, {
                    stroke: e,
                    Cb: 5,
                    Ab: "round",
                    Bb: "round"
                }];
            if (19 <= b && 20 >= b) return [{
                    stroke: c,
                    Cb: 4.5,
                    Ab: "butt",
                    Bb: "round",
                    ae: [25, 26]
                }, {
                    stroke: e,
                    Cb: 5,
                    Ab: "round",
                    Bb: "round"
                }]
        } else if (0 === a.indexOf("ditie_zj")) {
            if (12 <= b && 16 >= b) return [{
                    stroke: "#868686",
                    Cb: 1,
                    Ab: "round",
                    Bb: "round",
                    ae: [7, 4]
                }];
            if (17 <= b && 18 >= b || 19 <= b && 20 >= b) return [{
                    stroke: "#6e6e6e",
                    Cb: 1,
                    Ab: "round",
                    Bb: "round",
                    ae: [7, 4]
                }]
        } else if (/^tongdaomian/.test(a)) {
            if (17 === b) return [{
                    stroke: "#e5e5e5",
                    Cb: 4,
                    Ab: "square",
                    Bb: "round"
                }, {
                    stroke: "#a8a8a8",
                    Cb: 6,
                    Ab: "square",
                    Bb: "round"
                }];
            if (18 === b) return [{
                    stroke: "#e5e5e5",
                    Cb: 6,
                    Ab: "square",
                    Bb: "round"
                }, {
                    stroke: "#a8a8a8",
                    Cb: 8,
                    Ab: "square",
                    Bb: "round"
                }];
            if (19 <= b && 21 >= b) return [{
                    stroke: "#e5e5e5",
                    Cb: 8,
                    Ab: "square",
                    Bb: "round"
                }, {
                    stroke: "#a8a8a8",
                    Cb: 10,
                    Ab: "square",
                    Bb: "round"
                }]
        } else if (/^jietizhongduan|^dixiatongdaojieti/.test(a)) {
            if (17 === b) return [{
                    stroke: "#e5e5e5",
                    Cb: 4,
                    Ab: "butt",
                    Bb: "round",
                    ae: [2, 1]
                }, {
                    stroke: "#bebebe",
                    Cb: 6,
                    Ab: "butt",
                    Bb: "round"
                }];
            if (18 === b) return [{
                    stroke: "#e5e5e5",
                    Cb: 6,
                    Ab: "butt",
                    Bb: "round",
                    ae: [3, 1]
                }, {
                    stroke: "#bebebe",
                    Cb: 8,
                    Ab: "butt",
                    Bb: "round"
                }];
            if (19 <= b && 21 >= b) return [{
                    stroke: "#e5e5e5",
                    Cb: 8,
                    Ab: "butt",
                    Bb: "round",
                    ae: [4, 2]
                }, {
                    stroke: "#bebebe",
                    Cb: 10,
                    Ab: "butt",
                    Bb: "round"
                }]
        } else if (/^guojietianqiao/.test(a)) return 18 === b ? [{
                    stroke: "#ffffff",
                    Cb: 6,
                    Ab: "butt",
                    Bb: "round",
                    ae: [4, 2]
                }, {
                    stroke: "#bebebe",
                    Cb: 8,
                    Ab: "butt",
                    Bb: "round"
                }] : [{
                    stroke: "#ffffff",
                    Cb: 8,
                    Ab: "butt",
                    Bb: "round",
                    ae: [4, 2]
                }, {
                    stroke: "#bebebe",
                    Cb: 10,
                    Ab: "butt",
                    Bb: "round"
                }];
        return jd[a]
    }
    var md = {
        drawLink: function (a, b, c, e, f) {
            var g = a[1];
            g && (a = a[6], this.pN(g, c, e, b, a, f, p), this.pN(g, c, e, b, a, f, t))
        },
        pN: function (a, b, c, e, f, g, i) {
            for (var k = 0; k < a.length; k++) {
                var m = g.Vi(a[k][0], "line", b);
                if (m && m.length && (!i || m[0].borderWidth)) if (!m[0].ko || ld(m[0].ko, b)) for (var n = a[k][1], o =
                                0; o < n.length; o++) {
                            var s = n[o][3];
                            g.Hc(s[0], b) && (s["cache" + b] || (s["cache" + b] = g.lm(s[1], b, c, f)), this.bV(e, s[
                                "cache" + b], m, i, b))
                    }
            }
        },
        drawSingleTexture: function (a, b, c, e, f) {
            var g = a[1];
            if (g) for (var a = a[6], i = 0; i < g.length; i++) {
                    var k = f.Vi(g[i][0], "line", c);
                    if (k && k.length) for (var m = g[i][1], n = 0; n < m.length; n++) {
                            var o = m[n][11];
                            if (f.Hc(o[0], c)) {
                                var s;
                                o["cache" + c] || (o["cache" + c] = f.lm(o[1], c, e, a));
                                s = o["cache" + c];
                                o = o[3];
                                o *= Math.pow(2, c - f.r_[c].Fc);
                                this.cV(b, s, k, o, f)
                            }
                    }
            }
        },
        cV: function (a, b, c, e, f) {
            var g = c[0].ko,
                i = this;
            if (kd[g]) i.Hr(b, e, a, kd[g]);
            else {
                var c = f.ZJ(g),
                    k = new Image;
                k.onload = function () {
                    kd[g] = k;
                    i.Hr(b, e, a, k);
                    k.onload = q
                };
                k.src = c
            }
        },
        Hr: function (a, b, c, e) {
            var f = [a[0], a[1]],
                g = [a[2], a[3]],
                a = g[0] - f[0],
                g = g[1] - f[1],
                f = [f[0] + a / 2, f[1] + g / 2],
                i = Math.sqrt(a * a + g * g),
                b = b / 10,
                a = Math.atan2(g, a);
            c.save();
            c.translate(f[0], f[1]);
            c.rotate(Math.PI / 2 + a);
            c.drawImage(e, -b / 2, -i / 2, b, i);
            c.restore()
        },
        bV: function (a, b, c, e, f) {
            c = c[0];
            if (!e && c.ko && ld(c.ko, f)) this.iV(a, b, c, ld(c.ko, f));
            else {
                a.beginPath();
                a.moveTo(b[0], b[1]);
                for (var f = 2, g = b.length; f < g; f += 2) a.lineTo(b[f], b[f + 1]);
                c.borderWidth && e ? (a.strokeStyle = c.Sn, a.lineCap = hd[c.LT], a.lineJoin = id[1], a.lineWidth = c.borderWidth /
                    2, a.stroke()) : e || (a.strokeStyle = c.gw, a.lineCap = hd[c.wV], a.lineJoin = id[1], a.lineWidth =
                    c.yV / 2, a.stroke())
            }
        },
        iV: function (a, b, c, e) {
            if (c = e[1]) {
                a.strokeStyle = c.stroke;
                a.lineCap = c.Ab;
                a.lineJoin = c.Bb;
                a.lineWidth = c.Cb;
                a.beginPath();
                a.moveTo(b[0], b[1]);
                for (var c = 2, f = b.length; c < f; c += 2) a.lineTo(b[c], b[c + 1]);
                a.stroke()
            }
            if (e = e[0]) if (e.ae) this.ZU(a, b, e);
                else {
                    a.strokeStyle = e.stroke;
                    a.lineCap = e.Ab;
                    a.lineJoin = e.Bb;
                    a.lineWidth = e.Cb;
                    a.beginPath();
                    a.moveTo(b[0], b[1]);
                    c = 2;
                    for (f = b.length; c < f; c += 2) a.lineTo(b[c], b[c + 1]);
                    a.stroke()
                }
        },
        ZU: function (a, b, c) {
            a.strokeStyle = c.stroke;
            a.lineCap = c.Ab;
            a.lineJoin = c.Bb;
            a.lineWidth = c.Cb;
            var e = p,
                c = c.ae[0];
            a.beginPath();
            for (var f = 0; f < b.length - 2; f += 2) {
                var g = b[f],
                    i = b[f + 1],
                    k = b[f + 2] - g,
                    m = b[f + 3] - i,
                    n = 0 !== k ? m / k : 0 < m ? 1E15 : -1E15,
                    m = Math.sqrt(k * k + m * m),
                    o = c;
                for (a.moveTo(g, i); 0.1 <= m;) {
                    o > m && (o = m);
                    var s = Math.sqrt(o * o / (1 + n * n));
                    0 > k && (s = -s);
                    g += s;
                    i += n * s;
                    a[e ? "lineTo" : "moveTo"](g, i);
                    m -= o;
                    e = !e
                }
            }
            a.stroke()
        }
    };
    var nd = 3,
        od = 4,
        pd = 7,
        qd = 8,
        rd = 15,
        sd = 16,
        td = {}, ud = {}, vd = {}, wd = {}, xd, yd = {
            3: {
                start: 3,
                Fc: 3
            },
            4: {
                start: 4,
                Fc: 5
            },
            5: {
                start: 4,
                Fc: 5
            },
            6: {
                start: 6,
                Fc: 7
            },
            7: {
                start: 6,
                Fc: 7
            },
            8: {
                start: 8,
                Fc: 9
            },
            9: {
                start: 8,
                Fc: 9
            },
            10: {
                start: 10,
                Fc: 10
            },
            11: {
                start: 11,
                Fc: 12
            },
            12: {
                start: 11,
                Fc: 12
            },
            13: {
                start: 11,
                Fc: 12
            },
            14: {
                start: 14,
                Fc: 15
            },
            15: {
                start: 14,
                Fc: 15
            },
            16: {
                start: 16,
                Fc: 17
            },
            17: {
                start: 16,
                Fc: 17
            },
            18: {
                start: 18,
                Fc: 19
            },
            19: {
                start: 18,
                Fc: 19
            },
            20: {
                start: 18,
                Fc: 19
            },
            21: {
                start: 18,
                Fc: 19
            }
        };

    function zd(a) {
        this.B = a;
        this.Oc = a.K.devicePixelRatio;
        this.r_ = yd
    }
    zd.prototype = {
        sJ: function (a, b, c, e, f, g, i, k) {
            var m = this;
            xd || (xd = k);
            var n = b.getContext("2d"),
                k = b.parentNode;
            k.removeChild(b);
            n.clearRect(0, 0, g, g);
            k.appendChild(b);
            k = this.Oc;
            1 < k && !b._scale && (n.scale(k, k), b._scale = p);
            n.fillStyle = this.$L("#F5F3F0");
            window.bmapLandColor && (n.fillStyle = this.$L(window.bmapLandColor));
            k = b.style.width;
            b.style.width = "0px";
            b.style.width = k;
            n.fillRect(0, 0, g, g);
            if (a[0]) for (k = 0; k < a[0].length; k++) {
                    var o = a[0][k];
                    o[0] === pd && dd.drawPoly(o, n, f, g, this)
            }
            17 <= this.B.ga() ? (m.tJ(a, n, f, g, i, c, e), b.Xm = p) : setTimeout(function () {
                if (!b.XF) {
                    m.tJ(a, n, f, g, i, c, e);
                    b.Xm = p
                }
            }, 1)
        },
        tJ: function (a, b, c, e) {
            if (a[0]) for (var f = 0; f < a[0].length; f++) {
                    var g = a[0][f],
                        i = g[0];
                    i === od ? md.drawLink(g, b, c, e, this) : i === sd ? md.drawLink(g, b, c, e, this) : i === rd ? (
                        dd.drawGaoqingRoadBorder(g, b, c, e, this), dd.drawGaoqingRoadFill(g, b, c, e, this)) : 18 ===
                        i ? ed.drawArrow(g, b, c, e, Math.pow(2, c - yd[c].Fc), this) : i === qd ? fd.drawHregion(g, b,
                        c, e, this) : 19 === i && md.drawSingleTexture(g, b, c, e, this)
            }
        },
        $U: function (a, b, c, e, f) {
            xd || (xd = b);
            a.iY = gd.parse(a, c, e, this, f)
        },
        Vi: function (a, b, c, e) {
            var f = a + "-" + b + "-" + c;
            if (e) return ud[f] || (ud[f] = this.fg(a, b, c, e)), ud[f];
            td[f] = this.fg(a, b, c);
            return td[f]
        },
        fg: function (a, b, c, e) {
            var f = e || window.XN,
                e = f[2];
            if ("arrow" === b) return this.YX(e[2]);
            switch (b) {
            case "point":
                e = e[0];
                break;
            case "pointText":
                e = e[1];
                break;
            case "line":
                e = e[3];
                break;
            case "polygon":
                e = e[4];
                break;
            case "polygon3d":
                e = e[5]
            }
            var g;
            g = f[1][c - 1][0];
            var i = [];
            g = g[a];
            if (!g && ("point" === b || "pointText" === b)) g = f[1][c][0], g = g[a];
            if (!g) return i;
            for (c = 0; c < g.length; c++) if (f = e[g[c]]) {
                    switch (b) {
                    case "polygon":
                        f = this.gY(f, a);
                        break;
                    case "line":
                        f = this.cY(f, a);
                        break;
                    case "pointText":
                        f = this.eY(f, a);
                        break;
                    case "point":
                        f = this.dY(f, a);
                        break;
                    case "polygon3d":
                        f = this.fY(f, a)
                    }
                    i[i.length] = f
                }
            return i
        },
        eY: function (a, b) {
            return {
                tk: b,
                JJ: this.lg(a[0]),
                yK: this.lg(a[1]),
                I0: this.lg(a[2]),
                fontSize: a[3],
                zK: a[4],
                fontWeight: a[5],
                fontStyle: a[6],
                IU: a[7]
            }
        },
        dY: function (a, b) {
            return {
                tk: b,
                sx: a[0],
                u4: a[1],
                me: a[2],
                SW: a[3],
                h3: a[4],
                IU: a[5],
                zoom: a[6]
            }
        },
        cY: function (a, b) {
            return {
                tk: b,
                Sn: this.lg(a[0]),
                gw: this.lg(a[1]),
                borderWidth: a[2],
                yV: a[3],
                LT: a[4],
                wV: a[5],
                q2: a[6],
                r2: a[7],
                s2: a[8],
                I2: a[9],
                J2: a[10],
                MT: a[11],
                ko: a[12],
                NT: a[13],
                s1: a[14],
                H2: a[15],
                o2: a[16],
                g3: a[17],
                K3: a[18]
            }
        },
        gY: function (a, b) {
            return {
                tk: b,
                gw: this.lg(a[0]),
                Sn: this.lg(a[1]),
                borderWidth: a[2],
                MT: a[3],
                NT: a[4],
                C4: a[5],
                n2: a[6],
                h4: a[7],
                i4: this.lg(a[8])
            }
        },
        fY: function (a, b) {
            return {
                tk: b,
                filter: a[0],
                lM: a[1],
                p2: a[2],
                borderWidth: a[3],
                Sn: this.lg(a[4]),
                xV: this.lg(a[5]),
                r1: this.lg(a[6]),
                y3: a[7]
            }
        },
        YX: function (a) {
            for (var b in a) return a = a[b], {
                    color: this.lg(a[0]),
                    SW: a[1],
                    me: a[2]
            }
        },
        lg: function (a) {
            var b = a;
            if (wd[b]) return wd[b];
            a >>>= 0;
            wd[b] = "rgba(" + (a & 255) + "," + (a >> 8 & 255) + "," + (a >> 16 & 255) + "," + (a >> 24 & 255) / 255 +
                ")";
            return wd[b]
        },
        $L: function (a) {
            a = a.replace("#", "");
            6 === a.length && (a += "ff");
            for (var b = "rgba(", c = 0; 8 > c; c += 2) b = 6 > c ? b + (parseInt(a.slice(c, c + 2), 16) + ",") : b + (
                    parseInt(a.slice(c, c + 2), 16) / 255 + ")");
            return b
        },
        Hc: function (a, b) {
            var c;
            vd[a] || (c = a.toString(2), 8 > c.length && (c = Array(8 - c.length + 1).join("0") + c), vd[a] = c);
            c = vd[a];
            return "1" === c[b - yd[b].start]
        },
        lm: function (a, b, c) {
            var e = [],
                b = Math.pow(2, b - yd[b].Fc) / 100,
                f = a[0] * b,
                g = a[1] * b;
            e[e.length] = f;
            e[e.length] = c - g;
            for (var i = 2; i < a.length; i += 2) f += a[i] * b, g += a[i + 1] * b, e[e.length] = f, e[e.length] = c -
                    g;
            return e
        },
        ZJ: function (a) {
            var b = a.length % xd.length,
                c = this.YV();
            return xd[b] + a + ".png?v=" + c.GE + "&udt=" + c.CE
        },
        YV: function () {
            if (this.XC) return this.XC;
            var a = "undefined" !== typeof MSV ? MSV.Z2 : {};
            return this.XC = {
                GE: a.version ? a.version : "001",
                CE: a.WZ ? a.WZ : "20150621"
            }
        }
    };
    Q = z.lang.Ht;
    nd = 3;
    od = 4;
    pd = 7;
    qd = 8;
    rd = 15;
    sd = 16;

    function Lc(a, b, c) {
        c = c || {};
        this.B = a;
        this.iv = b;
        this.Oc = b.lM;
        this.Va = {
            EZ: "na",
            zIndex: 0,
            bN: c.tileUrls || {
                http: ["http://"+nginxIp+"/online0_map_bdimg"+"/pvd/?qt=vtile", "http://"+nginxIp+"/online1_map_bdimg"+"/pvd/?qt=vtile",
                        "http://"+nginxIp+"/online2_map_bdimg"+"/pvd/?qt=vtile", "http://"+nginxIp+"/online3_map_bdimg"+"/pvd/?qt=vtile",
                        "http://"+nginxIp+"/online4_map_bdimg"+"/pvd/?qt=vtile"],
                https: ["https://ss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/pvd/?qt=vtile",
                        "https://ss1.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/pvd/?qt=vtile",
                        "https://ss2.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/pvd/?qt=vtile",
                        "https://ss3.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/pvd/?qt=vtile",
                        "https://ss0.bdstatic.com/8bo_dTSlQ1gBo1vgoIiO_jowehsv/pvd/?qt=vtile"]
            },
            WC: c.iconUrls || ["https://ss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/sty/map_icons2x/",
                    "https://ss1.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/sty/map_icons2x/"],
            jE: p
        };
        this.GA = "";
        this.uR = {};
        var c = c.urlOpts || {
            styles: "pl",
            extdata: 1,
            textimg: 0,
            mesh3d: 0,
            limit: 30
        }, e;
        for (e in c) c.hasOwnProperty(e) && (this.GA = this.GA + "&" + e + "=" + c[e]);
        this.Lg = {};
        this.sr = [];
        this.ss = 0;
        this.Ow = t;
        this.Iw = {};
        a = this.Va.EZ;
        Yc[a] ? a = Yc[a] : (b = new Zc(a, l), a = Yc[a] = b);
        this.Ig = a
    }
    window.VectorIndoorTileLayer = "VectorIndoorTileLayer";
    da = Lc.prototype;
    da.ta = function () {
        var a = this.B,
            b = a.ei;
        if (!this.Hn) {
            var c = b.Qp(this.Va.zIndex);
            c.style.WebkitTransform = "translate3d(0px, 0px, 0)";
            this.Hn = c
        }
        b.ph.appendChild(this.Hn);
        b.D2 = c;
        if (this.Va.jE) {
            Ad(this);
            var e = this;
            a.addEventListener("checkvectorclick", function (a) {
                var b;
                a: {
                    b = a.offsetX;
                    var c = a.offsetY,
                        k = e.sr.iY;
                    if (k) for (var m = 0; m < k.length; m++) for (var n = k[m], o = 0; o < n.length; o++) if (a = n[o], !
                                    a.Nw && a.hs && b > a.Uh && b < a.ek && c > a.Vh && c < a.fk) {
                                    b = a.hs;
                                    b = {
                                        type: 9,
                                        name: a.name,
                                        uid: a.uid,
                                        point: {
                                            x: b.Qd + b.width / 2,
                                            y: b.Rd + 6
                                        }
                                    };
                                    break a
                                }
                    b = q
                }
                b && (a = new Q("onvectorclick"), a.z2 = b, a.af = "base", this.dispatchEvent(a))
            })
        }
    };

    function Ad(a) {
        var b = a.B,
            c = b.ei,
            e = a.Oc,
            f = b.yb(),
            g = f.width,
            f = f.height,
            i = N("canvas");
        i.style.cssText = "position: absolute;left:0;top:0;width:" + g + "px;height:" + f + "px;z-index:2;";
        i.width = g * e;
        i.height = f * e;
        a.Tw = i;
        a.Eo = i.getContext("2d");
        a.Eo.scale(e, e);
        a.Eo.textBaseline = "top";
        c.ph.appendChild(i);
        b.dR = i
    }
    da.update = function (a, b) {
        b = b || {};
        this.DE = b.DE;
        if (this.Va.jE && (b.Xn && this.Xn(), b.oZ)) {
            var c = this.Oc,
                e = this.B.yb(),
                f = e.width,
                e = e.height,
                g = this.Tw,
                i = g.style;
            i.width = f + "px";
            i.height = e + "px";
            g.width = f * c;
            g.height = e * c;
            this.Eo.scale(c, c);
            this.Eo.textBaseline = "top"
        }
        if (b.x4) {
            c = this.Hn;
            f = 0;
            for (e = c.childNodes.length; f < e; f++) c.childNodes[f].Xm = t
        }
        this.Vv = a;
        this.Ho(a)
    };
    da.Ho = function (a) {
        this.sr = [];
        var b = this.B,
            c = b.ga(),
            e = b.Ic.Rh(b.he),
            f = this.Ig.kc(c),
            e = [Math.round(-e.lng / f), Math.round(e.lat / f)],
            f = this.Ig.le(c),
            g = b.aa.replace(/^TANGRAM_/, ""),
            i = this.Ig.lw(c),
            b = this.B,
            k = -b.offsetY + b.height / 2,
            m = this.Hn;
        m.style.left = -b.offsetX + b.width / 2 + "px";
        m.style.top = k + "px";
        this.Fe ? this.Fe.length = 0 : this.Fe = [];
        b = 0;
        for (k = m.childNodes.length; b < k; b++) {
            var n = m.childNodes[b];
            n.oq = t;
            this.Fe.push(n)
        }
        if (b = this.im) for (var o in b) delete b[o];
        else this.im = {};
        this.Ge ? this.Ge.length = 0 : this.Ge = [];
        b = 0;
        for (k = a.length; b < k; b++) {
            var n = a[b][0],
                s = a[b][1];
            o = 0;
            for (var v = this.Fe.length; o < v; o++) {
                var x = this.Fe[o];
                if (x.id === g + "_" + n + "_" + s + "_" + i + "_" + c) {
                    x.oq = p;
                    this.im[x.id] = x;
                    break
                }
            }
        }
        b = 0;
        for (k = this.Fe.length; b < k; b++) x = this.Fe[b], x.oq || (x.JA = q, delete x.JA, x.Xm = t, this.Ge.push(x));
        o = [];
        v = f * this.Oc;
        b = 0;
        for (k = a.length; b < k; b++) {
            var n = a[b][0],
                s = a[b][1],
                x = n * f + e[0],
                y = (-1 - s) * f + e[1],
                A = g + "_" + n + "_" + s + "_" + i + "_" + c,
                C = this.im[A],
                B = q;
            if (C) B = C.style, B.left = x + "px", B.top = y + "px", B.width = f + "px", B.height = f + "px", C.Xm ? C.tE &&
                    C.tE && this.sr.push(C.tE) : (C.XF = p, C.JA = q, delete C.JA, o.push([n, s, C]));
            else {
                if (0 < this.Ge.length) {
                    var C = this.Ge.shift(),
                        F = C.getContext("2d");
                    C.getAttribute("width") !== v && (C._scale = t);
                    C.setAttribute("width", v);
                    C.setAttribute("height", v);
                    B = C.style;
                    B.width = f + "px";
                    B.height = f + "px";
                    F.clearRect(0, 0, v, v)
                } else C = document.createElement("canvas"), B = C.style, B.position = "absolute", this.Va.backgroundColor &&
                        (B.background = this.Va.backgroundColor), B.width = f + "px", B.height = f + "px", C.setAttribute(
                        "width", v), C.setAttribute("height", v), m.appendChild(C);
                C.id = A;
                B.left = x + "px";
                B.top = y + "px";
                o.push([n, s, C])
            }
            C.style.visibility = ""
        }
        b = 0;
        for (k = this.Ge.length; b < k; b++) this.Ge[b].style.visibility = "hidden";
        if (0 === o.length) {
            Bd(this);
            a = this.B.aa.replace(/^TANGRAM_/, "");
            c = this.B.ga();
            e = this.Ig.lw(c);
            f = {};
            for (g = 0; g < this.Vv.length; g++) i = this.Vv[g], i = a + "_" + i[0] + "_" + i[1] + "_" + e + "_" + c,
                    this.Lg[i] && (f[i] = this.Lg[i], this.DE && this.iv.KB.sJ(this.Lg[i].i_, this.Lg[i].CZ, this.Lg[i]
                    .Dl, this.Lg[i].Uo, this.Lg[i].uD, this.Ig.le(this.Lg[i].uD), this.Ig.EC(this.Lg[i].uD), this.Va.WC));
            this.Lg = f
        } else {
            this.ss = o.length;
            this.Ow = t;
            c = this.Ig.lw(this.B.ga());
            for (e = 0; e < a.length; e++) a[e][3] = c;
            for (e = 0; e < o.length; e++) a = o[e][2], f = o[e][0], g = o[e][1], o[e][3] = c, a.Xm = t, a.XF = t, Cd(
                    this, f, g, c, a)
        }
    };

    function Cd(a, b, c, e, f) {
        var g = b + "_" + c + "_" + e,
            i = a.uR;
        if (i[g]) {
            if ("loading" === i[g].status) return
        } else i[g] = {
                status: "init",
                tM: 0
        };
        var k = a,
            m = k.B,
            n = [],
            n = "0" === D.wt ? k.Va.bN.http : k.Va.bN.https,
            o = Math.abs(b + c) % n.length,
            s = "x=" + b + "&y=" + c + "&z=" + e,
            v = Dd(a.iv),
            x = v.GE,
            v = v.CE,
            y = "_" + (0 > b ? "_" : "") + (0 > c ? "$" : "") + parseInt(Math.abs(b) + "" + Math.abs(c) + "" + e, 10).toString(
                36),
            s = s + a.GA + "v=" + x + "&udt=" + v + "&fn=window." + y,
            x = n[o] + "&" + s,
            x = n[o] + "¶m=" + window.encodeURIComponent(Kb(s));
        window[y] = function (a) {
            clearTimeout(i[g].xk);
            i[g] = q;
            if (a) {
                var n = m.ga(),
                    o;
                a: {
                    for (o = 0; o < k.Vv.length; o++) {
                        var s = k.Vv[o];
                        if (s[0] === b && s[1] === c && s[3] === e) {
                            o = p;
                            break a
                        }
                    }
                    o = t
                }
                if (o !== t) {
                    o = new Q("updateindoor");
                    o.IndoorCanvas = [];
                    o.IndoorCanvas.push({
                        canvasDom: f,
                        data: a,
                        canvasID: f.id,
                        ratio: k.Oc
                    });
                    m.dispatchEvent(o);
                    if (m.K.aw) {
                        if (k.Lg[f.id] = {
                            i_: a,
                            CZ: f,
                            Dl: b,
                            Uo: c,
                            uD: n
                        }, k.iv.KB.sJ(a, f, b, c, n, k.Ig.le(n), k.Ig.EC(n), k.Va.WC), k.Va.jE) {
                            n = [];
                            n.DZ = [b, c, e];
                            if (a[0]) for (o = 0; o < a[0].length; o++) a[0][o][0] === nd && n.push({
                                        aL: a[0][o]
                                    });
                            if (a[2]) for (o = 0; o < a[2].length; o++) n.push({
                                        vX: a[2][o]
                                    });
                            f.tE = n;
                            k.sr.push(n);
                            k.Ow === t && k.ss--;
                            (0 === k.ss || k.Ow === p) && Bd(k)
                        }
                    } else k.ss--, (0 === k.ss || k.Ow === p) && Bd(k);
                    delete window[y]
                }
            }
        };
        qa(x);
        i[g].status = "loading";
        k = a;
        i[g].xk = setTimeout(function () {
            3 > i[g].tM ? (i[g].tM++, i[g].status = "init", Cd(k, b, c, e, f)) : i[g] = q
        }, 4E3)
    }
    function Bd(a) {
        if (a.Tw) {
            var b = a.B;
            a.Tw.style.left = -b.offsetX + "px";
            a.Tw.style.top = -b.offsetY + "px";
            var c = new Q("updateindoorlabel");
            c.labelCanvasDom = b.dR;
            b.dispatchEvent(c);
            if (b.K.aw) {
                a.Xn();
                var c = a.Ig,
                    e = b.ga(),
                    b = c.lw(b.ga());
                a.iv.KB.$U(a.sr, a.Va.WC, a.Eo, c.le(e), Math.pow(2, e - b))
            }
        }
    }
    da.Xn = function () {
        var a = this.B.yb(),
            b = this.Oc;
        this.Eo.clearRect(0, 0, a.width * b, a.height * b)
    };
    da.remove = function () {
        var a = this.B.ei;
        this.Hn && a.ph.removeChild(this.Hn)
    };

    function Kc(a) {
        this.B = a.map;
        this.Te = [];
        this.br = {};
        this.lM = this.B.K.devicePixelRatio;
        this.KB = new zd(this.B);
        this.ta()
    }
    window.VectorIndoorTileMgr = "VectorIndoorTileMgr";
    da = Kc.prototype;
    da.ta = function () {
        var a = this,
            b = this.B;
        b.addEventListener("addtilelayer", function (b) {
            a.Ee(b.target)
        });
        b.addEventListener("removetilelayer", function (b) {
            a.Lf(b.target)
        });
        setTimeout(function () {
            b.addEventListener("onmoveend", function (b) {
                "centerAndZoom" !== b.gH && a.update()
            });
            b.addEventListener("onmoving", function () {
                a.update()
            });
            b.addEventListener("onzoomend", function (b) {
                "centerAndZoom" !== b.gH && a.update({
                    Xn: p
                })
            });
            b.addEventListener("centerandzoom", function () {
                a.update({
                    Xn: p
                })
            });
            b.addEventListener("onupdatestyles", function () {
                a.update({
                    Xn: p,
                    DE: p
                });
                a.B.hf(a.B.tb())
            })
        }, 1);
        b.addEventListener("indoor_data_refresh", u());
        b.addEventListener("onresize", function () {
            a.update({
                oZ: p
            })
        });
        a.update()
    };
    da.Ee = function (a) {
        if (a instanceof Lc) {
            for (var b = 0; b < this.Te.length; b++) if (this.Te[b] === a) return;
            this.Te.push(a);
            a.ta();
            this.B.loaded && this.update()
        }
    };
    da.Lf = function (a) {
        if (a instanceof Lc) {
            for (var b = 0; b < this.Te.length; b++) if (this.Te[b] === a) {
                    this.Te.splice(b, 1);
                    break
                }
            a.remove()
        }
    };
    da.oK = function (a) {
        var b = a.getName();
        if (this.br[b]) return this.br[b];
        var c = this.B,
            e = c.ga(),
            f = c.lc,
            g = a.EC(e);
        c.aa.replace(/^TANGRAM_/, "");
        var i = Math.ceil(f.lng / g),
            k = Math.ceil(f.lat / g),
            a = a.le(e),
            m = [i, k, (f.lng / g - i) * a, (f.lat / g - k) * a],
            e = m[0] - Math.ceil((c.width / 2 - m[2]) / a),
            f = m[1] - Math.ceil((c.height / 2 - m[3]) / a),
            g = m[0] + Math.ceil((c.width / 2 + m[2]) / a),
            c = m[1] + Math.ceil((c.height / 2 + m[3]) / a);
        this.te ? this.te.length = 0 : this.te = [];
        for (a = e; a < g; a++) for (e = f; e < c; e++) this.te.push([a, e]);
        this.te.sort(function (a) {
            return function (b, c) {
                return 0.4 * Math.abs(b[0] - a[0]) + 0.6 * Math.abs(b[1] - a[1]) - (0.4 * Math.abs(c[0] - a[0]) + 0.6 *
                    Math.abs(c[1] - a[1]))
            }
        }([i, k]));
        this.br[b] = this.te.slice(0);
        return this.br[b]
    };

    function Dd(a) {
        if (a.HE) return a.HE;
        a.HE = {
            GE: "001",
            CE: Sb("normal")
        };
        return a.HE
    }
    da.update = function (a) {
        this.br = {};
        for (var b = 0; b < this.Te.length; b++) {
            var c = this.Te[b],
                e = this.oK(c.Ig);
            c.update(e, a)
        }
    };

    function Ed(a, b, c) {
        this.ad = a;
        this.Te = b instanceof Mc ? [b] : b.slice(0);
        c = c || {};
        this.j = {
            HZ: c.tips || "",
            qD: "",
            Yb: c.minZoom || 3,
            gc: c.maxZoom || 18,
            x2: c.minZoom || 3,
            w2: c.maxZoom || 18,
            Nx: 256,
            sE: c.textColor || "black",
            cC: c.errorImageUrl || "",
            Za: new fb(new J(-21364736, -16023552), new J(23855104, 19431424)),
            Ic: c.projection || new S
        };
        1 <= this.Te.length && (this.Te[0].Av = p);
        z.extend(this.j, c)
    }
    z.extend(Ed.prototype, {
        getName: w("ad"),
        cs: function () {
            return this.j.HZ
        },
        W1: function () {
            return this.j.qD
        },
        BW: function () {
            return this.Te[0]
        },
        k2: w("Te"),
        le: function () {
            return this.j.Nx
        },
        ro: function () {
            return this.j.Yb
        },
        Ol: function () {
            return this.j.gc
        },
        setMaxZoom: function (a) {
            this.j.gc = a
        },
        Ul: function () {
            return this.j.sE
        },
        Rl: function () {
            return this.j.Ic
        },
        P1: function () {
            return this.j.cC
        },
        le: function () {
            return this.j.Nx
        },
        kc: function (a) {
            return Math.pow(2, 18 - a)
        },
        tK: function (a) {
            return this.kc(a) * this.le()
        }
    });
    var Fd = [D.url.proto + D.url.domain.TILE_BASE_URLS[0] + "/it/", D.url.proto + D.url.domain.TILE_BASE_URLS[1] +
            "/it/", D.url.proto + D.url.domain.TILE_BASE_URLS[2] + "/it/", D.url.proto + D.url.domain.TILE_BASE_URLS[3] +
            "/it/", D.url.proto + D.url.domain.TILE_BASE_URLS[4] + "/it/"],
        Gd = [D.url.proto + D.url.domain.TILE_ONLINE_URLS[0] + "/tile/", D.url.proto + D.url.domain.TILE_ONLINE_URLS[1] +
                "/tile/", D.url.proto + D.url.domain.TILE_ONLINE_URLS[2] + "/tile/", D.url.proto + D.url.domain.TILE_ONLINE_URLS[
                3] + "/tile/", D.url.proto + D.url.domain.TILE_ONLINE_URLS[4] + "/tile/"],
        Hd = {
            dark: "dl",
            light: "ll",
            normal: "pl"
        }, Id = new Mc;
    Id.iZ = p;
    Id.getTilesUrl = function (a, b, c) {
        var e = a.x,
            a = a.y,
            f = Sb("normal"),
            g = 1,
            c = Hd[c];
        this.map.Hw() && (g = 2);
        e = this.map.ei.Bv(e, b).Dl;
        return (Gd[Math.abs(e + a) % Gd.length] + "?qt=tile&x=" + (e + "").replace(/-/gi, "M") + "&y=" + (a + "").replace(
            /-/gi, "M") + "&z=" + b + "&styles=" + c + "&scaler=" + g + (6 == z.ca.ia ? "&color_dep=32&colors=50" : "") +
            "&udt=" + f).replace(/-(\d+)/gi, "M$1")
    };
    var Oa = new Ed("\u5730\u56fe", Id, {
        tips: "\u663e\u793a\u666e\u901a\u5730\u56fe",
        maxZoom: 19
    }),
        Jd = new Mc;
    Jd.aN = [D.url.proto + D.url.domain.TIlE_PERSPECT_URLS[0] + "/resource/mappic/", D.url.proto + D.url.domain.TIlE_PERSPECT_URLS[
            1] + "/resource/mappic/", D.url.proto + D.url.domain.TIlE_PERSPECT_URLS[2] + "/resource/mappic/", D.url.proto +
            D.url.domain.TIlE_PERSPECT_URLS[3] + "/resource/mappic/"];
    Jd.getTilesUrl = function (a, b) {
        var c = a.x,
            e = a.y,
            f = 256 * Math.pow(2, 20 - b),
            e = Math.round((9998336 - f * e) / f) - 1;
        return url = this.aN[Math.abs(c + e) % this.aN.length] + this.map.Nb + "/" + this.map.Hv + "/3/lv" + (21 - b) +
            "/" + c + "," + e + ".jpg"
    };
    var Ra = new Ed("\u4e09\u7ef4", Jd, {
        tips: "\u663e\u793a\u4e09\u7ef4\u5730\u56fe",
        minZoom: 15,
        maxZoom: 20,
        textColor: "white",
        projection: new ib
    });
    Ra.kc = function (a) {
        return Math.pow(2, 20 - a)
    };
    Ra.Vj = function (a) {
        if (!a) return "";
        var b = H.dB,
            c;
        for (c in b) if (-1 < a.search(c)) return b[c].mx;
        return ""
    };
    Ra.SJ = function (a) {
        return {
            bj: 2,
            gz: 1,
            sz: 14,
            sh: 4
        }[a]
    };
    var Kd = new Mc({
        Av: p
    });
    Kd.getTilesUrl = function (a, b) {
        var c = a.x,
            e = a.y;
        return (Fd[Math.abs(c + e) % Fd.length] + "u=x=" + c + ";y=" + e + ";z=" + b + ";v=009;type=sate&fm=46&udt=" +
            Sb("satellite")).replace(/-(\d+)/gi, "M$1")
    };
    var Za = new Ed("\u536b\u661f", Kd, {
        tips: "\u663e\u793a\u536b\u661f\u5f71\u50cf",
        minZoom: 1,
        maxZoom: 19,
        textColor: "white"
    }),
        Ld = new Mc({
            transparentPng: p
        });
    Ld.getTilesUrl = function (a, b) {
        var c = a.x,
            e = a.y,
            f = Sb("satelliteStreet");
        return (Gd[Math.abs(c + e) % Gd.length] + "?qt=vtile&x=" + (c + "").replace(/-/gi, "M") + "&y=" + (e + "").replace(
            /-/gi, "M") + "&z=" + b + "&styles=sl" + (6 == z.ca.ia ? "&color_dep=32&colors=50" : "") + "&udt=" + f).replace(
            /-(\d+)/gi, "M$1")
    };
    var Ta = new Ed("\u6df7\u5408", [Kd, Ld], {
        tips: "\u663e\u793a\u5e26\u6709\u8857\u9053\u7684\u536b\u661f\u5f71\u50cf",
        labelText: "\u8def\u7f51",
        minZoom: 1,
        maxZoom: 19,
        textColor: "white"
    });
    var Md = 1,
        W = {};
    window.v_ = W;

    function X(a, b) {
        z.lang.Ca.call(this);
        this.od = {};
        this.um(a);
        b = b || {};
        b.la = b.renderOptions || {};
        this.j = {
            la: {
                Ja: b.la.panel || q,
                map: b.la.map || q,
                Jg: b.la.autoViewport || p,
                Ps: b.la.selectFirstResult,
                gs: b.la.highlightMode,
                Ob: b.la.enableDragging || t
            },
            Es: b.onSearchComplete || u(),
            QL: b.onMarkersSet || u(),
            PL: b.onInfoHtmlSet || u(),
            SL: b.onResultsHtmlSet || u(),
            OL: b.onGetBusListComplete || u(),
            NL: b.onGetBusLineComplete || u(),
            LL: b.onBusListHtmlSet || u(),
            KL: b.onBusLineHtmlSet || u(),
            DD: b.onPolylinesSet || u(),
            Qo: b.reqFrom || ""
        };
        this.j.la.Jg = "undefined" != typeof b && "undefined" != typeof b.renderOptions && "undefined" != typeof b.renderOptions
            .autoViewport ? b.renderOptions.autoViewport : p;
        this.j.la.Ja = z.yc(this.j.la.Ja)
    }
    z.sa(X, z.lang.Ca);
    z.extend(X.prototype, {
        getResults: function () {
            return this.Ac ? this.ni : this.ha
        },
        enableAutoViewport: function () {
            this.j.la.Jg = p
        },
        disableAutoViewport: function () {
            this.j.la.Jg = t
        },
        um: function (a) {
            a && (this.od.src = a)
        },
        Xs: function (a) {
            this.j.Es = a || u()
        },
        setMarkersSetCallback: function (a) {
            this.j.QL = a || u()
        },
        setPolylinesSetCallback: function (a) {
            this.j.DD = a || u()
        },
        setInfoHtmlSetCallback: function (a) {
            this.j.PL = a || u()
        },
        setResultsHtmlSetCallback: function (a) {
            this.j.SL = a || u()
        },
        Sl: w("Ce")
    });
    var Nd = {
        jF: D.ge,
        ib: function (a, b, c, e, f) {
            this.qY(b);
            var g = (1E5 * Math.random()).toFixed(0);
            D._rd["_cbk" + g] = function (b) {
                b.result && b.result.error && 202 === b.result.error ? alert(
                    "\u8be5AK\u56e0\u4e3a\u6076\u610f\u884c\u4e3a\u5df2\u7ecf\u88ab\u7ba1\u7406\u5458\u5c01\u7981\uff01") :
                    (c = c || {}, a && a(b, c), delete D._rd["_cbk" + g])
            };
            e = e || "";
            b = c && c.$Z ? Gb(b, encodeURI) : Gb(b, encodeURIComponent);
            this.jF = c && c.CJ ? c.rM ? c.rM : D.Io : D.ge;
            e = this.jF + e + "?" + b + "&ie=utf-8&oue=1&fromproduct=jsapi";
            f || (e += "&res=api");
            e = e + ("&callback=BMap._rd._cbk" + g) + ("&ak=" + ra);
            qa(e)
        },
        qY: function (a) {
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
                "" !== b && D.alog("cus.fire", "count", b)
            }
        }
    };
    window.I_ = Nd;
    D._rd = {};
    var ab = {};
    window.H_ = ab;
    ab.nM = function (a) {
        a = a.replace(/<\/?[^>]*>/g, "");
        return a = a.replace(/[ | ]* /g, " ")
    };
    ab.ZX = function (a) {
        return a.replace(
            /([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*),([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*)(,)/g,
            "$1,$2;")
    };
    ab.$X = function (a, b) {
        return a.replace(RegExp(
            "(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);)(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);){" + b + "}", "ig"),
            "$1")
    };
    var Od = 2,
        Pd = 6,
        Qd = 8,
        Rd = 2,
        Sd = 3,
        Td = 6,
        Ud = 0,
        Vd = "bt",
        Wd = "nav",
        Xd = "walk",
        Yd = "bl",
        Zd = "bsl",
        $d = "ride",
        ae = 15,
        be = 18;
    D.I = window.Instance = z.lang.Gc;

    function ce(a, b, c) {
        z.lang.Ca.call(this);
        if (a) {
            this.Ta = "object" == typeof a ? a : z.yc(a);
            this.page = 1;
            this.zd = 100;
            this.BI = "pg";
            this.Kf = 4;
            this.KI = b;
            this.update = p;
            a = {
                page: 1,
                n4: 100,
                zd: 100,
                Kf: 4,
                BI: "pg",
                update: p
            };
            c || (c = a);
            for (var e in c) "undefined" != typeof c[e] && (this[e] = c[e]);
            this.va()
        }
    }
    z.extend(ce.prototype, {
        va: function () {
            this.ta()
        },
        ta: function () {
            this.$T();
            this.Ta.innerHTML = this.xU()
        },
        $T: function () {
            isNaN(parseInt(this.page)) && (this.page = 1);
            isNaN(parseInt(this.zd)) && (this.zd = 1);
            1 > this.page && (this.page = 1);
            1 > this.zd && (this.zd = 1);
            this.page > this.zd && (this.page = this.zd);
            this.page = parseInt(this.page);
            this.zd = parseInt(this.zd)
        },
        b2: function () {
            location.search.match(RegExp("[?&]?" + this.BI + "=([^&]*)[&$]?", "gi"));
            this.page = RegExp.$1
        },
        xU: function () {
            var a = [],
                b = this.page - 1,
                c = this.page + 1;
            a.push('<p style="margin:0;padding:0;white-space:nowrap">');
            if (!(1 > b)) {
                if (this.page >= this.Kf) {
                    var e;
                    a.push(
                        '<span style="margin-right:3px"><a style="color:#7777cc" href="javascript:void(0)" onclick="{temp1}">\u9996\u9875</a></span>'
                        .replace("{temp1}", "BMap.I('" + this.aa + "').toPage(1);"))
                }
                a.push(
                    '<span style="margin-right:3px"><a style="color:#7777cc" href="javascript:void(0)" onclick="{temp2}">\u4e0a\u4e00\u9875</a></span>'
                    .replace("{temp2}", "BMap.I('" + this.aa + "').toPage(" + b + ");"))
            }
            if (this.page < this.Kf) e = 0 == this.page % this.Kf ? this.page - this.Kf - 1 : this.page - this.page %
                    this.Kf + 1, b = e + this.Kf - 1;
            else {
                e = Math.floor(this.Kf / 2);
                var f = this.Kf % 2 - 1,
                    b = this.zd > this.page + e ? this.page + e : this.zd;
                e = this.page - e - f
            }
            this.page > this.zd - this.Kf && this.page >= this.Kf && (e = this.zd - this.Kf + 1, b = this.zd);
            for (f = e; f <= b; f++) 0 < f && (f == this.page ? a.push('<span style="margin-right:3px">' + f +
                    "</span>") : 1 <= f && f <= this.zd && (e =
                    '<span><a style="color:#7777cc;margin-right:3px" href="javascript:void(0)" onclick="{temp3}">[' + f +
                    "]</a></span>", a.push(e.replace("{temp3}", "BMap.I('" + this.aa + "').toPage(" + f + ");"))));
            c > this.zd || a.push(
                '<span><a style="color:#7777cc" href="javascript:void(0)" onclick="{temp4}">\u4e0b\u4e00\u9875</a></span>'
                .replace("{temp4}", "BMap.I('" + this.aa + "').toPage(" + c + ");"));
            a.push("</p>");
            return a.join("")
        },
        toPage: function (a) {
            a = a ? a : 1;
            "function" == typeof this.KI && (this.KI(a), this.page = a);
            this.update && this.va()
        }
    });

    function db(a, b) {
        X.call(this, a, b);
        b = b || {};
        b.renderOptions = b.renderOptions || {};
        this.$o(b.pageCapacity);
        "undefined" != typeof b.renderOptions.selectFirstResult && !b.renderOptions.selectFirstResult ? this.DB() :
            this.VB();
        this.xa = [];
        this.lf = [];
        this.jb = -1;
        this.Ma = [];
        var c = this;
        K.load("local", function () {
            c.yy()
        }, p)
    }
    z.sa(db, X, "LocalSearch");
    db.rp = 10;
    db.D_ = 1;
    db.Km = 100;
    db.$E = 2E3;
    db.hF = 1E5;
    z.extend(db.prototype, {
        search: function (a, b) {
            this.Ma.push({
                method: "search",
                arguments: [a, b]
            })
        },
        rm: function (a, b, c) {
            this.Ma.push({
                method: "searchInBounds",
                arguments: [a, b, c]
            })
        },
        Xo: function (a, b, c, e) {
            this.Ma.push({
                method: "searchNearby",
                arguments: [a, b, c, e]
            })
        },
        He: function () {
            delete this.Ha;
            delete this.Ce;
            delete this.ha;
            delete this.ua;
            this.jb = -1;
            this.Sa();
            this.j.la.Ja && (this.j.la.Ja.innerHTML = "")
        },
        Vl: u(),
        VB: function () {
            this.j.la.Ps = p
        },
        DB: function () {
            this.j.la.Ps = t
        },
        $o: function (a) {
            this.j.jk = "number" == typeof a && !isNaN(a) ? 1 > a ? db.rp : a > db.Km ? db.rp : a : db.rp
        },
        cf: function () {
            return this.j.jk
        },
        toString: ca("LocalSearch")
    });
    var de = db.prototype;
    T(de, {
        clearResults: de.He,
        setPageCapacity: de.$o,
        getPageCapacity: de.cf,
        gotoPage: de.Vl,
        searchNearby: de.Xo,
        searchInBounds: de.rm,
        search: de.search,
        enableFirstResultSelection: de.VB,
        disableFirstResultSelection: de.DB
    });

    function ee(a, b) {
        X.call(this, a, b)
    }
    z.sa(ee, X, "BaseRoute");
    z.extend(ee.prototype, {
        He: u()
    });

    function fe(a, b) {
        X.call(this, a, b);
        b = b || {};
        this.Ws(b.policy);
        this.FM(b.intercityPolicy);
        this.OM(b.transitTypePolicy);
        this.$o(b.pageCapacity);
        this.vb = Vd;
        this.yp = Md;
        this.xa = [];
        this.jb = -1;
        this.j.$m = b.enableTraffic || t;
        this.Ma = [];
        var c = this;
        K.load("route", function () {
            c.Gd()
        })
    }
    fe.Km = 100;
    fe.YN = [0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1];
    fe.ZN = [0, 3, 4, 0, 0, 0, 5];
    z.sa(fe, ee, "TransitRoute");
    z.extend(fe.prototype, {
        Ws: function (a) {
            this.j.Xd = 0 <= a && 5 >= a ? a : 0
        },
        FM: function (a) {
            this.j.bm = 0 <= a && 2 >= a ? a : 0
        },
        OM: function (a) {
            this.j.Am = 0 <= a && 2 >= a ? a : 0
        },
        Az: function (a, b) {
            this.Ma.push({
                method: "_internalSearch",
                arguments: [a, b]
            })
        },
        search: function (a, b) {
            this.Ma.push({
                method: "search",
                arguments: [a, b]
            })
        },
        $o: function (a) {
            if ("string" === typeof a && (a = parseInt(a, 10), isNaN(a))) {
                this.j.jk = fe.Km;
                return
            }
            this.j.jk = "number" !== typeof a ? fe.Km : 1 <= a && a <= fe.Km ? Math.round(a) : fe.Km
        },
        toString: ca("TransitRoute"),
        t0: function (a) {
            return a.replace(/\(.*\)/, "")
        }
    });
    var ge = fe.prototype;
    T(ge, {
        _internalSearch: ge.Az
    });

    function he(a, b) {
        X.call(this, a, b);
        this.xa = [];
        this.jb = -1;
        this.Ma = [];
        var c = this,
            e = this.j.la;
        1 !== e.gs && 2 !== e.gs && (e.gs = 1);
        this.fu = this.j.la.Ob ? p : t;
        K.load("route", function () {
            c.Gd()
        });
        this.dD && this.dD()
    }
    he.mO =
        " \u73af\u5c9b \u65e0\u5c5e\u6027\u9053\u8def \u4e3b\u8def \u9ad8\u901f\u8fde\u63a5\u8def \u4ea4\u53c9\u70b9\u5185\u8def\u6bb5 \u8fde\u63a5\u9053\u8def \u505c\u8f66\u573a\u5185\u90e8\u9053\u8def \u670d\u52a1\u533a\u5185\u90e8\u9053\u8def \u6865 \u6b65\u884c\u8857 \u8f85\u8def \u531d\u9053 \u5168\u5c01\u95ed\u9053\u8def \u672a\u5b9a\u4e49\u4ea4\u901a\u533a\u57df POI\u8fde\u63a5\u8def \u96a7\u9053 \u6b65\u884c\u9053 \u516c\u4ea4\u4e13\u7528\u9053 \u63d0\u524d\u53f3\u8f6c\u9053"
        .split(" ");
    z.sa(he, ee, "DWRoute");
    z.extend(he.prototype, {
        search: function (a, b, c) {
            this.Ma.push({
                method: "search",
                arguments: [a, b, c]
            })
        }
    });

    function ie(a, b) {
        he.call(this, a, b);
        b = b || {};
        this.j.$m = b.enableTraffic || t;
        this.Ws(b.policy);
        this.vb = Wd;
        this.yp = Sd
    }
    z.sa(ie, he, "DrivingRoute");
    ie.prototype.Ws = function (a) {
        this.j.Xd = 0 <= a && 5 >= a ? a : 0
    };

    function je(a, b) {
        he.call(this, a, b);
        this.vb = Xd;
        this.yp = Rd;
        this.fu = t
    }
    z.sa(je, he, "WalkingRoute");

    function ke(a, b) {
        he.call(this, a, b);
        this.vb = $d;
        this.yp = Td;
        this.fu = t
    }
    z.sa(ke, he, "RidingRoute");

    function le(a, b) {
        z.lang.Ca.call(this);
        this.If = [];
        this.kk = [];
        this.j = b;
        this.$i = a;
        this.map = this.j.la.map || q;
        this.zM = this.j.zM;
        this.ub = q;
        this.Pj = 0;
        this.pE = "";
        this.$e = 1;
        this.bC = "";
        this.Ro = [0, 0, 0, 0, 0, 0, 0];
        this.mL = [];
        this.qr = [1, 1, 1, 1, 1, 1, 1];
        this.iN = [1, 1, 1, 1, 1, 1, 1];
        this.So = [0, 0, 0, 0, 0, 0, 0];
        this.qm = [0, 0, 0, 0, 0, 0, 0];
        this.Eb = [{
                m: "",
                sd: 0,
                Bm: 0,
                x: 0,
                y: 0,
                na: -1
            }, {
                m: "",
                sd: 0,
                Bm: 0,
                x: 0,
                y: 0,
                na: -1
            }, {
                m: "",
                sd: 0,
                Bm: 0,
                x: 0,
                y: 0,
                na: -1
            }, {
                m: "",
                sd: 0,
                Bm: 0,
                x: 0,
                y: 0,
                na: -1
            }, {
                m: "",
                sd: 0,
                Bm: 0,
                x: 0,
                y: 0,
                na: -1
            }, {
                m: "",
                sd: 0,
                Bm: 0,
                x: 0,
                y: 0,
                na: -1
            }, {
                m: "",
                sd: 0,
                Bm: 0,
                x: 0,
                y: 0,
                na: -1
            }];
        this.Gh = -1;
        this.mt = [];
        this.AE = [];
        K.load("route", u())
    }
    z.lang.sa(le, z.lang.Ca, "RouteAddr");
    var ne = navigator.userAgent;
    /ipad|iphone|ipod|iph/i.test(ne);
    var oe = /android/i.test(ne);

    function pe(a) {
        this.Le = a || {}
    }
    z.extend(pe.prototype, {
        yM: function (a, b, c) {
            var e = this;
            K.load("route", function () {
                e.Gd(a, b, c)
            })
        }
    });

    function qe(a) {
        this.j = {};
        z.extend(this.j, a);
        this.Ma = [];
        var b = this;
        K.load("othersearch", function () {
            b.Gd()
        })
    }
    z.sa(qe, z.lang.Ca, "Geocoder");
    z.extend(qe.prototype, {
        Ql: function (a, b, c) {
            this.Ma.push({
                method: "getPoint",
                arguments: [a, b, c]
            })
        },
        Nl: function (a, b, c) {
            this.Ma.push({
                method: "getLocation",
                arguments: [a, b, c]
            })
        },
        toString: ca("Geocoder")
    });
    var ue = qe.prototype;
    T(ue, {
        getPoint: ue.Ql,
        getLocation: ue.Nl
    });

    function Geolocation(a) {
        a = a || {};
        this.K = {
            timeout: a.timeout || 1E4,
            maximumAge: a.maximumAge || 6E5,
            enableHighAccuracy: a.enableHighAccuracy || t,
            ii: a.SDKLocation || t
        };
        this.ee = [];
        var b = this;
        K.load("othersearch", function () {
            for (var a = 0, e; e = b.ee[a]; a++) b[e.method].apply(b, e.arguments)
        })
    }
    z.extend(Geolocation.prototype, {
        getCurrentPosition: function (a, b) {
            this.ee.push({
                method: "getCurrentPosition",
                arguments: arguments
            })
        },
        getStatus: function () {
            return Od
        },
        enableSDKLocation: function () {
            I() && (this.K.ii = p)
        },
        disableSDKLocation: function () {
            this.K.ii = t
        }
    });

    function ve(a) {
        a = a || {};
        a.la = a.renderOptions || {};
        this.j = {
            la: {
                map: a.la.map || q
            }
        };
        this.Ma = [];
        var b = this;
        K.load("othersearch", function () {
            b.Gd()
        })
    }
    z.sa(ve, z.lang.Ca, "LocalCity");
    z.extend(ve.prototype, {
        get: function (a) {
            this.Ma.push({
                method: "get",
                arguments: [a]
            })
        },
        toString: ca("LocalCity")
    });

    function we() {
        this.Ma = [];
        var a = this;
        K.load("othersearch", function () {
            a.Gd()
        })
    }
    z.sa(we, z.lang.Ca, "Boundary");
    z.extend(we.prototype, {
        get: function (a, b) {
            this.Ma.push({
                method: "get",
                arguments: [a, b]
            })
        },
        toString: ca("Boundary")
    });

    function xe(a, b) {
        X.call(this, a, b);
        this.jO = Yd;
        this.lO = ae;
        this.iO = Zd;
        this.kO = be;
        this.Ma = [];
        var c = this;
        K.load("buslinesearch", function () {
            c.Gd()
        })
    }
    xe.tu = H.oa + "iw_plus.gif";
    xe.cR = H.oa + "iw_minus.gif";
    xe.US = H.oa + "stop_icon.png";
    z.sa(xe, X);
    z.extend(xe.prototype, {
        getBusList: function (a) {
            this.Ma.push({
                method: "getBusList",
                arguments: [a]
            })
        },
        getBusLine: function (a) {
            this.Ma.push({
                method: "getBusLine",
                arguments: [a]
            })
        },
        setGetBusListCompleteCallback: function (a) {
            this.j.OL = a || u()
        },
        setGetBusLineCompleteCallback: function (a) {
            this.j.NL = a || u()
        },
        setBusListHtmlSetCallback: function (a) {
            this.j.LL = a || u()
        },
        setBusLineHtmlSetCallback: function (a) {
            this.j.KL = a || u()
        },
        setPolylinesSetCallback: function (a) {
            this.j.DD = a || u()
        }
    });

    function ye(a) {
        X.call(this, a);
        a = a || {};
        this.Va = {
            input: a.input || q,
            XA: a.baseDom || q,
            types: a.types || [],
            Es: a.onSearchComplete || u()
        };
        this.od.src = a.location || "\u5168\u56fd";
        this.Ei = "";
        this.Zf = q;
        this.HG = "";
        this.ui();
        Sa(Ka);
        var b = this;
        K.load("autocomplete", function () {
            b.Gd()
        })
    }
    z.sa(ye, X, "Autocomplete");
    z.extend(ye.prototype, {
        ui: u(),
        show: u(),
        U: u(),
        gE: function (a) {
            this.Va.types = a
        },
        um: function (a) {
            this.od.src = a
        },
        search: ba("Ei"),
        zx: ba("HG"),
        Xs: function (a) {
            this.Va.Es = a
        }
    });
    var Ua;

    function Qa(a, b) {
        function c() {
            f.j.visible ? ("inter" === f.Ae && f.j.haveBreakId && f.j.indoorExitControl === p ? z.D.show(f.tz) : z.D.U(
                f.tz), this.j.closeControl && this.pf && this.B && this.B.Pa() === this.C ? z.D.show(f.pf) : z.D.U(f.pf),
                this.j.forceCloseControl && z.D.show(f.pf)) : (z.D.U(f.pf), z.D.U(f.tz))
        }
        this.C = "string" == typeof a ? z.$(a) : a;
        this.aa = ze++;
        this.j = {
            enableScrollWheelZoom: p,
            panoramaRenderer: "flash",
            swfSrc: D.Nh("main_domain_nocdn", "res/swf/") + "APILoader.swf",
            visible: p,
            indoorExitControl: p,
            indoorFloorControl: t,
            linksControl: p,
            clickOnRoad: p,
            navigationControl: p,
            closeControl: p,
            indoorSceneSwitchControl: p,
            albumsControl: t,
            albumsControlOptions: {},
            copyrightControlOptions: {},
            forceCloseControl: t,
            haveBreakId: t
        };
        var b = b || {}, e;
        for (e in b) this.j[e] = b[e];
        b.closeControl === p && (this.j.forceCloseControl = p);
        b.useWebGL === t && Pa(t);
        this.Da = {
            heading: 0,
            pitch: 0
        };
        this.jn = [];
        this.Fb = this.Xa = q;
        this.Fj = this.jq();
        this.xa = [];
        this.Ec = 1;
        this.Ae = this.BR = this.Kk = "";
        this.ze = {};
        this.Bf = q;
        this.Bg = [];
        this.Cq = [];
        "cvsRender" == this.Fj || Pa() ? (this.xj = 90, this.zj = -90) : "cssRender" == this.Fj && (this.xj = 45, this.zj = -
            45);
        this.Gq = t;
        var f = this;
        this.kn = function () {
            this.Fj === "flashRender" ? K.load("panoramaflash", function () {
                f.ui()
            }, p) : K.load("panorama", function () {
                f.eb()
            }, p);
            b.af == "api" ? Sa(Ga) : Sa(Ha);
            this.kn = u()
        };
        this.j.nR !== p && (this.kn(), D.Ep("cus.fire", "count", "z_loadpanoramacount"));
        this.eS(this.C);
        this.addEventListener("id_changed", function () {
            Sa(Fa, {
                from: b.af
            })
        });
        this.wO();
        this.addEventListener("indoorexit_options_changed", c);
        this.addEventListener("scene_type_changed", c);
        this.addEventListener("onclose_options_changed", c);
        this.addEventListener("onvisible_changed", c)
    }
    var Ae = 4,
        Be = 1,
        ze = 0;
    z.lang.sa(Qa, z.lang.Ca, "Panorama");
    z.extend(Qa.prototype, {
        wO: function () {
            var a = this,
                b = this.pf = N("div");
            b.className = "pano_close";
            b.style.cssText = "z-index: 1201;display: none";
            b.title = "\u9000\u51fa\u5168\u666f";
            b.onclick = function () {
                a.U()
            };
            this.C.appendChild(b);
            var c = this.tz = N("a");
            c.className = "pano_pc_indoor_exit";
            c.style.cssText = "z-index: 1201;display: none";
            c.innerHTML = '<span style="float:right;margin-right:12px;">\u51fa\u53e3</span>';
            c.title = "\u9000\u51fa\u5ba4\u5185\u666f";
            c.onclick = function () {
                a.jo()
            };
            this.C.appendChild(c);
            window.ActiveXObject && !document.addEventListener && (b.style.backgroundColor = "rgb(37,37,37)", c.style.backgroundColor =
                "rgb(37,37,37)")
        },
        jo: u(),
        eS: function (a) {
            var b, c;
            b = a.style;
            c = Wa(a).position;
            "absolute" != c && "relative" != c && (b.position = "relative", b.zIndex = 0);
            if ("absolute" === c || "relative" === c) if (a = Wa(a).zIndex, !a || "auto" === a) b.zIndex = 0
        },
        cW: w("jn"),
        Pb: w("Xa"),
        DW: w("bv"),
        NM: w("bv"),
        fa: w("Fb"),
        Ea: w("Da"),
        ga: w("Ec"),
        Pi: w("Kk"),
        d2: function () {
            return this.o0 || []
        },
        Y1: w("BR"),
        bs: w("Ae"),
        Bx: function (a) {
            a !== this.Ae && (this.Ae = a, this.dispatchEvent(new Q("onscene_type_changed")))
        },
        wc: function (a, b, c) {
            "object" === typeof b && (c = b, b = l);
            a != this.Xa && (this.Vk = this.Xa, this.Wk = this.Fb, this.Xa = a, this.Ae = b || "street", this.Fb = q, c &&
                c.pov && this.gd(c.pov))
        },
        qa: function (a) {
            a.fc(this.Fb) || (this.Vk = this.Xa, this.Wk = this.Fb, this.Fb = a, this.Xa = q)
        },
        gd: function (a) {
            a && (this.Da = a, a = this.Da.pitch, a > this.xj ? a = this.xj : a < this.zj && (a = this.zj), this.Gq = p,
                this.Da.pitch = a)
        },
        dZ: function (a, b) {
            this.zj = 0 <= a ? 0 : a;
            this.xj = 0 >= b ? 0 : b
        },
        Jc: function (a) {
            a != this.Ec && (a > Ae && (a = Ae), a < Be && (a = Be), a != this.Ec && (this.Ec = a), "cssRender" ===
                this.Fj && this.gd(this.Da))
        },
        tA: function () {
            if (this.B) for (var a = this.B.ww(), b = 0; b < a.length; b++)(a[b] instanceof U || a[b] instanceof uc) &&
                        a[b].point && this.xa.push(a[b])
        },
        dE: ba("B"),
        Vs: function (a) {
            this.Bf = a || "none"
        },
        pk: function (a) {
            for (var b in a) {
                if ("object" == typeof a[b]) for (var c in a[b]) this.j[b][c] = a[b][c];
                else this.j[b] = a[b];
                a.closeControl === p && (this.j.forceCloseControl = p);
                a.closeControl === t && (this.j.forceCloseControl = t);
                switch (b) {
                case "linksControl":
                    this.dispatchEvent(new Q("onlinks_visible_changed"));
                    break;
                case "clickOnRoad":
                    this.dispatchEvent(new Q("onclickonroad_changed"));
                    break;
                case "navigationControl":
                    this.dispatchEvent(new Q("onnavigation_visible_changed"));
                    break;
                case "indoorSceneSwitchControl":
                    this.dispatchEvent(new Q("onindoor_default_switch_mode_changed"));
                    break;
                case "albumsControl":
                    this.dispatchEvent(new Q("onalbums_visible_changed"));
                    break;
                case "albumsControlOptions":
                    this.dispatchEvent(new Q("onalbums_options_changed"));
                    break;
                case "copyrightControlOptions":
                    this.dispatchEvent(new Q("oncopyright_options_changed"));
                    break;
                case "closeControl":
                    this.dispatchEvent(new Q("onclose_options_changed"));
                    break;
                case "indoorExitControl":
                    this.dispatchEvent(new Q("onindoorexit_options_changed"));
                    break;
                case "indoorFloorControl":
                    this.dispatchEvent(new Q("onindoorfloor_options_changed"))
                }
            }
        },
        dk: function () {
            this.dl.style.visibility = "hidden"
        },
        Fx: function () {
            this.dl.style.visibility = "visible"
        },
        nV: function () {
            this.j.enableScrollWheelZoom = p
        },
        OU: function () {
            this.j.enableScrollWheelZoom = t
        },
        show: function () {
            this.j.visible = p
        },
        U: function () {
            this.j.visible = t
        },
        jq: function () {
            return Va() && !I() && "javascript" != this.j.panoramaRenderer ? "flashRender" : !I() && Ob() ? "cvsRender" :
                "cssRender"
        },
        Ka: function (a) {
            this.ze[a.bd] = a
        },
        Lb: function (a) {
            delete this.ze[a]
        },
        SC: function () {
            return this.j.visible
        },
        Pg: function () {
            return new O(this.C.clientWidth, this.C.clientHeight)
        },
        Pa: w("C"),
        PJ: function () {
            var a = D.Nh("baidumap", "?"),
                b = this.Pb();
            if (b) {
                var b = {
                    panotype: this.bs(),
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
        Ew: function () {
            this.pk({
                copyrightControlOptions: {
                    logoVisible: t
                }
            })
        },
        kE: function () {
            this.pk({
                copyrightControlOptions: {
                    logoVisible: p
                }
            })
        },
        PA: function (a) {
            function b(a, b) {
                return function () {
                    a.Cq.push({
                        yL: b,
                        xL: arguments
                    })
                }
            }
            for (var c = a.getPanoMethodList(), e = "", f = 0, g = c.length; f < g; f++) e = c[f], this[e] = b(this, e);
            this.Bg.push(a)
        },
        QD: function (a) {
            for (var b = this.Bg.length; b--;) this.Bg[b] === a && this.Bg.splice(b, 1)
        },
        cE: u()
    });
    var Ce = Qa.prototype;
    T(Ce, {
        setId: Ce.wc,
        setPosition: Ce.qa,
        setPov: Ce.gd,
        setZoom: Ce.Jc,
        setOptions: Ce.pk,
        getId: Ce.Pb,
        getPosition: Ce.fa,
        getPov: Ce.Ea,
        getZoom: Ce.ga,
        getLinks: Ce.cW,
        getBaiduMapUrl: Ce.PJ,
        hideMapLogo: Ce.Ew,
        showMapLogo: Ce.kE,
        enableDoubleClickZoom: Ce.o1,
        disableDoubleClickZoom: Ce.f1,
        enableScrollWheelZoom: Ce.nV,
        disableScrollWheelZoom: Ce.OU,
        show: Ce.show,
        hide: Ce.U,
        addPlugin: Ce.PA,
        removePlugin: Ce.QD,
        getVisible: Ce.SC,
        addOverlay: Ce.Ka,
        removeOverlay: Ce.Lb,
        getSceneType: Ce.bs,
        setPanoramaPOIType: Ce.Vs,
        exitInter: Ce.jo,
        setInteractiveState: Ce.cE
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

    function De() {
        z.lang.Ca.call(this);
        this.bd = "PanoramaOverlay_" + this.aa;
        this.P = q;
        this.Na = p
    }
    z.lang.sa(De, z.lang.Ca, "PanoramaOverlayBase");
    z.extend(De.prototype, {
        Z1: w("bd"),
        ta: function () {
            aa("initialize\u65b9\u6cd5\u672a\u5b9e\u73b0")
        },
        remove: function () {
            aa("remove\u65b9\u6cd5\u672a\u5b9e\u73b0")
        },
        Af: function () {
            aa("_setOverlayProperty\u65b9\u6cd5\u672a\u5b9e\u73b0")
        }
    });

    function Ee(a, b) {
        De.call(this);
        var c = {
            position: q,
            altitude: 2,
            displayDistance: p
        }, b = b || {}, e;
        for (e in b) c[e] = b[e];
        this.Fb = c.position;
        this.mj = a;
        this.Fp = c.altitude;
        this.HP = c.displayDistance;
        this.sE = c.color;
        this.CK = c.hoverColor;
        this.backgroundColor = c.backgroundColor;
        this.EI = c.backgroundHoverColor;
        this.borderColor = c.borderColor;
        this.II = c.borderHoverColor;
        this.fontSize = c.fontSize;
        this.padding = c.padding;
        this.YC = c.imageUrl;
        this.size = c.size;
        this.ne = c.image;
        this.width = c.width;
        this.height = c.height;
        this.VW = c.imageData;
        this.borderWidth = c.borderWidth
    }
    z.lang.sa(Ee, De, "PanoramaLabel");
    z.extend(Ee.prototype, {
        E1: w("borderWidth"),
        getImageData: w("VW"),
        Ul: w("sE"),
        T1: w("CK"),
        A1: w("backgroundColor"),
        B1: w("EI"),
        C1: w("borderColor"),
        D1: w("II"),
        R1: w("fontSize"),
        a2: w("padding"),
        U1: w("YC"),
        yb: w("size"),
        qw: w("ne"),
        qa: function (a) {
            this.Fb = a;
            this.Af("position", a)
        },
        fa: w("Fb"),
        Vc: function (a) {
            this.mj = a;
            this.Af("content", a)
        },
        Wj: w("mj"),
        YD: function (a) {
            this.Fp = a;
            this.Af("altitude", a)
        },
        no: w("Fp"),
        Ea: function () {
            var a = this.fa(),
                b = q,
                c = q;
            this.P && (c = this.P.fa());
            if (a && c) if (a.fc(c)) b = this.P.Ea();
                else {
                    b = {};
                    b.heading = Fe(a.lng - c.lng, a.lat - c.lat) || 0;
                    var a = b,
                        c = this.no(),
                        e = this.bn();
                    a.pitch = Math.round(180 * (Math.atan(c / e) / Math.PI)) || 0
                }
            return b
        },
        bn: function () {
            var a = 0,
                b, c;
            this.P && (b = this.P.fa(), (c = this.fa()) && !c.fc(b) && (a = S.po(b, c)));
            return a
        },
        U: function () {
            aa("hide\u65b9\u6cd5\u672a\u5b9e\u73b0")
        },
        show: function () {
            aa("show\u65b9\u6cd5\u672a\u5b9e\u73b0")
        },
        Af: u()
    });
    var Ge = Ee.prototype;
    T(Ge, {
        setPosition: Ge.qa,
        getPosition: Ge.fa,
        setContent: Ge.Vc,
        getContent: Ge.Wj,
        setAltitude: Ge.YD,
        getAltitude: Ge.no,
        getPov: Ge.Ea,
        show: Ge.show,
        hide: Ge.U
    });

    function He(a, b) {
        De.call(this);
        var c = {
            icon: "",
            title: "",
            panoInfo: q,
            altitude: 2
        }, b = b || {}, e;
        for (e in b) c[e] = b[e];
        this.Fb = a;
        this.EG = c.icon;
        this.YH = c.title;
        this.Fp = c.altitude;
        this.SR = c.panoInfo;
        this.Da = {
            heading: 0,
            pitch: 0
        }
    }
    z.lang.sa(He, De, "PanoramaMarker");
    z.extend(He.prototype, {
        qa: function (a) {
            this.Fb = a;
            this.Af("position", a)
        },
        fa: w("Fb"),
        xc: function (a) {
            this.YH = a;
            this.Af("title", a)
        },
        wo: w("YH"),
        Mb: function (a) {
            this.EG = icon;
            this.Af("icon", a)
        },
        qo: w("EG"),
        YD: function (a) {
            this.Fp = a;
            this.Af("altitude", a)
        },
        no: w("Fp"),
        HC: w("SR"),
        Ea: function () {
            var a = q;
            if (this.P) {
                var a = this.P.fa(),
                    b = this.fa(),
                    a = Fe(b.lng - a.lng, b.lat - a.lat);
                isNaN(a) && (a = 0);
                a = {
                    heading: a,
                    pitch: 0
                }
            } else a = this.Da;
            return a
        },
        Af: u()
    });
    var Ie = He.prototype;
    T(Ie, {
        setPosition: Ie.qa,
        getPosition: Ie.fa,
        setTitle: Ie.xc,
        getTitle: Ie.wo,
        setAltitude: Ie.YD,
        getAltitude: Ie.no,
        getPanoInfo: Ie.HC,
        getIcon: Ie.qo,
        setIcon: Ie.Mb,
        getPov: Ie.Ea
    });

    function Fe(a, b) {
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
    function Pa(a) {
        if ("boolean" === typeof Je) return Je;
        if (a === t || !window.WebGLRenderingContext) return Je = t;
        if (z.platform.Xi) {
            a = 0;
            try {
                a = navigator.userAgent.split("Android ")[1].charAt(0)
            } catch (b) {}
            if (5 > a) return Je = t
        }
        var a = document.createElement("canvas"),
            c = q;
        try {
            c = a.getContext("webgl")
        } catch (e) {
            Je = t
        }
        return Je = c === q ? t : p
    }
    var Je;

    function Ke() {
        if ("boolean" === typeof Le) return Le;
        Le = p;
        if (z.platform.gD) return p;
        var a = navigator.userAgent;
        return -1 < a.indexOf("Chrome") || -1 < a.indexOf("SAMSUNG-GT-I9508") ? p : Le = t
    }
    var Le;

    function ec(a, b) {
        this.P = a || q;
        var c = this;
        c.P && c.ba();
        K.load("pservice", function () {
            c.aP()
        });
        "api" == (b || {}).af ? Sa(Ia) : Sa(Ja);
        this.md = {
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
    D.km(function (a) {
        "flashRender" !== a.jq() && new ec(a, {
            af: "api"
        })
    });
    z.extend(ec.prototype, {
        ba: function () {
            function a(a) {
                if (a) {
                    if (a.id != b.bv) {
                        b.NM(a.id);
                        b.ea = a;
                        Ke() || b.dispatchEvent(new Q("onthumbnail_complete"));
                        b.Xa != q && (b.Wk = b._position);
                        for (var c in a) if (a.hasOwnProperty(c)) switch (b["_" + c] = a[c], c) {
                                case "position":
                                    b.Fb = a[c];
                                    break;
                                case "id":
                                    b.Xa = a[c];
                                    break;
                                case "links":
                                    b.jn = a[c];
                                    break;
                                case "zoom":
                                    b.Ec = a[c]
                            }
                        if (b.Wk) {
                            var g = b.Wk,
                                i = b._position;
                            c = g.lat;
                            var k = i.lat,
                                m = Pb(k - c),
                                g = Pb(i.lng - g.lng);
                            c = Math.sin(m / 2) * Math.sin(m / 2) + Math.cos(Pb(c)) * Math.cos(Pb(k)) * Math.sin(g / 2) *
                                Math.sin(g / 2);
                            b.UF = 6371E3 * 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c))
                        }
                        c = new Q("ondataload");
                        c.data = a;
                        b.dispatchEvent(c);
                        b.dispatchEvent(new Q("onposition_changed"));
                        b.dispatchEvent(new Q("onlinks_changed"));
                        b.dispatchEvent(new Q("oncopyright_changed"), {
                            copyright: a.copyright
                        });
                        a.Al && b.j.closeControl ? z.D.show(b.$P) : z.D.U(b.$P)
                    }
                } else b.Xa = b.Vk, b.Fb = b.Wk, b.dispatchEvent(new Q("onnoresult"))
            }
            var b = this.P,
                c = this;
            b.addEventListener("id_changed", function () {
                c.uo(b.Pb(), a)
            });
            b.addEventListener("iid_changed", function () {
                c.Cg(ec.Fk + "qt=idata&iid=" + b.oz + "&fn=", function (b) {
                    if (b && b.result && 0 == b.result.error) {
                        var b = b.content[0].interinfo,
                            f = {};
                        f.Al = b.BreakID;
                        for (var g = b.Defaultfloor, i = q, k = 0; k < b.Floors.length; k++) if (b.Floors[k].Floor == g) {
                                i = b.Floors[k];
                                break
                            }
                        f.id = i.StartID || i.Points[0].PID;
                        c.uo(f.id, a, f)
                    }
                })
            });
            b.addEventListener("position_changed_inner", function () {
                c.Ri(b.fa(), a)
            })
        },
        uo: function (a, b) {
            this.md.getPanoramaById.push(arguments)
        },
        Ri: function (a, b, c) {
            this.md.getPanoramaByLocation.push(arguments)
        },
        TC: function (a, b, c, e) {
            this.md.getVisiblePOIs.push(arguments)
        },
        zw: function (a, b) {
            this.md.getRecommendPanosById.push(arguments)
        },
        yw: function (a) {
            this.md.getPanoramaVersions.push(arguments)
        },
        bB: function (a, b) {
            this.md.checkPanoSupportByCityCode.push(arguments)
        },
        xw: function (a, b) {
            this.md.getPanoramaByPOIId.push(arguments)
        },
        TJ: function (a) {
            this.md.getCopyrightProviders.push(arguments)
        }
    });
    var Me = ec.prototype;
    T(Me, {
        getPanoramaById: Me.uo,
        getPanoramaByLocation: Me.Ri,
        getPanoramaByPOIId: Me.xw
    });

    function dc(a) {
        Mc.call(this);
        "api" == (a || {}).af ? Sa(Ca) : Sa(Da)
    }
    dc.nF = D.Nh("pano", "tile/");
    dc.prototype = new Mc;
    dc.prototype.getTilesUrl = function (a, b) {
        var c = dc.nF[(a.x + a.y) % dc.nF.length] + "?udt=20150114&qt=tile&styles=pl&x=" + a.x + "&y=" + a.y + "&z=" +
            b;
        z.ca.ia && 6 >= z.ca.ia && (c += "&color_dep=32");
        return c
    };
    dc.prototype.rs = ca(p);
    Ne.Kd = new S;

    function Ne() {}
    z.extend(Ne, {
        PU: function (a, b, c) {
            c = z.lang.Gc(c);
            b = {
                data: b
            };
            "position_changed" == a && (b.data = Ne.Kd.cj(new R(b.data.mercatorX, b.data.mercatorY)));
            c.dispatchEvent(new Q("on" + a), b)
        }
    });
    var Oe = Ne;
    T(Oe, {
        dispatchFlashEvent: Oe.PU
    });
    var Pe = {
        aO: 50
    };
    Pe.Mt = D.Nh("pano")[0];
    Pe.Kt = {
        width: 220,
        height: 60
    };
    z.extend(Pe, {
        LK: function (a, b, c, e) {
            if (!b || !c || !c.lngLat || !c.panoInstance) e();
            else {
                this.tn === l && (this.tn = new ec(q, {
                    af: "api"
                }));
                var f = this;
                this.tn.bB(b, function (b) {
                    b ? f.tn.Ri(c.lngLat, Pe.aO, function (b) {
                        if (b && b.id) {
                            var g = b.id,
                                m = b.Yg,
                                b = b.Zg,
                                n = ec.Kd.Tg(c.lngLat),
                                o = f.FQ(n, {
                                    x: m,
                                    y: b
                                }),
                                m = f.dK(g, o, 0, Pe.Kt.width, Pe.Kt.height);
                            a.content = f.GQ(a.content, m, c.titleTip, c.beforeDomId);
                            a.addEventListener("open", function () {
                                ha.M(z.yc("infoWndPano"), "click", function () {
                                    c.panoInstance.wc(g);
                                    c.panoInstance.show();
                                    c.panoInstance.gd({
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
        GQ: function (a, b, c, e) {
            var c = c || "",
                f;
            !e || !a.split(e)[0] ? (e = a, a = "") : (e = a.split(e)[0], f = e.lastIndexOf("<"), e = a.substring(0, f),
                a = a.substring(f));
            f = [];
            var g = Pe.Kt.width,
                i = Pe.Kt.height;
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
        FQ: function (a, b) {
            var c = 90 - 180 * Math.atan2(a.y - b.y, a.x - b.x) / Math.PI;
            0 > c && (c += 360);
            return c
        },
        dK: function (a, b, c, e, f) {
            var g = {
                panoId: a,
                panoHeading: b || 0,
                panoPitch: c || 0,
                width: e,
                height: f
            };
            return (Pe.Mt +
                "?qt=pr3d&fovy=75&quality=80&panoid={panoId}&heading={panoHeading}&pitch={panoPitch}&width={width}&height={height}")
                .replace(/\{(.*?)\}/g, function (a, b) {
                return g[b]
            })
        }
    });
    var Qe = document,
        Re = Math,
        Se = Qe.createElement("div").style,
        Te;
    a: {
        for (var Ue = ["t", "webkitT", "MozT", "msT", "OT"], Ve, We = 0, Xe = Ue.length; We < Xe; We++) if (Ve = Ue[We] +
                "ransform", Ve in Se) {
                Te = Ue[We].substr(0, Ue[We].length - 1);
                break a
            }
        Te = t
    }
    var Ye = Te ? "-" + Te.toLowerCase() + "-" : "",
        $e = Ze("transform"),
        af = Ze("transitionProperty"),
        bf = Ze("transitionDuration"),
        cf = Ze("transformOrigin"),
        df = Ze("transitionTimingFunction"),
        ef = Ze("transitionDelay"),
        oe = /android/gi.test(navigator.appVersion),
        ff = /iphone|ipad/gi.test(navigator.appVersion),
        gf = /hp-tablet/gi.test(navigator.appVersion),
        hf = Ze("perspective") in Se,
        jf = "ontouchstart" in window && !gf,
        kf = Te !== t,
        lf = Ze("transition") in Se,
        mf = "onorientationchange" in window ? "orientationchange" : "resize",
        nf = jf ? "touchstart" : "mousedown",
        of = jf ? "touchmove" : "mousemove",
        pf = jf ? "touchend" : "mouseup",
        qf = jf ? "touchcancel" : "mouseup",
        rf = Te === t ? t : {
            "": "transitionend",
            webkit: "webkitTransitionEnd",
            Moz: "transitionend",
            O: "otransitionend",
            ms: "MSTransitionEnd"
        }[Te],
        sf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window
            .oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
            return setTimeout(a, 1)
        }, tf = window.cancelRequestAnimationFrame || window.E4 || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window
            .oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout,
        uf = hf ? " translateZ(0)" : "";

    function vf(a, b) {
        var c = this,
            e;
        c.Fm = "object" == typeof a ? a : Qe.getElementById(a);
        c.Fm.style.overflow = "hidden";
        c.Ib = c.Fm.children[0];
        c.options = {
            Ao: p,
            Cm: p,
            x: 0,
            y: 0,
            Tn: p,
            OT: t,
            Zw: p,
            tD: p,
            zk: p,
            fi: t,
            KZ: 0,
            Fv: t,
            Bw: p,
            Oh: p,
            gi: p,
            hC: oe,
            Fw: ff,
            vV: ff && hf,
            VD: "",
            zoom: t,
            Bk: 1,
            np: 4,
            RU: 2,
            FN: "scroll",
            dt: t,
            Ix: 1,
            RL: q,
            JL: function (a) {
                a.preventDefault()
            },
            UL: q,
            IL: q,
            TL: q,
            HL: q,
            fx: q,
            VL: q,
            ML: q,
            Mo: q,
            WL: q,
            Lo: q
        };
        for (e in b) c.options[e] = b[e];
        c.x = c.options.x;
        c.y = c.options.y;
        c.options.zk = kf && c.options.zk;
        c.options.Oh = c.options.Ao && c.options.Oh;
        c.options.gi = c.options.Cm && c.options.gi;
        c.options.zoom = c.options.zk && c.options.zoom;
        c.options.fi = lf && c.options.fi;
        c.options.zoom && oe && (uf = "");
        c.Ib.style[af] = c.options.zk ? Ye + "transform" : "top left";
        c.Ib.style[bf] = "0";
        c.Ib.style[cf] = "0 0";
        c.options.fi && (c.Ib.style[df] = "cubic-bezier(0.33,0.66,0.66,1)");
        c.options.zk ? c.Ib.style[$e] = "translate(" + c.x + "px," + c.y + "px)" + uf : c.Ib.style.cssText +=
            ";position:absolute;top:" + c.y + "px;left:" + c.x + "px";
        c.options.fi && (c.options.hC = p);
        c.refresh();
        c.ba(mf, window);
        c.ba(nf);
        !jf && "none" != c.options.FN && (c.ba("DOMMouseScroll"), c.ba("mousewheel"));
        c.options.Fv && (c.ZT = setInterval(function () {
            c.ZO()
        }, 500));
        this.options.Bw && (Event.prototype.stopImmediatePropagation || (document.body.removeEventListener = function (
            a, b, c) {
            var e = Node.prototype.removeEventListener;
            a === "click" ? e.call(document.body, a, b.BK || b, c) : e.call(document.body, a, b, c)
        }, document.body.addEventListener = function (a, b, c) {
            var e = Node.prototype.addEventListener;
            a === "click" ? e.call(document.body, a, b.BK || (b.BK = function (a) {
                a.pY || b(a)
            }), c) : e.call(document.body, a, b, c)
        }), c.ba("click", document.body, p))
    }
    vf.prototype = {
        enabled: p,
        x: 0,
        y: 0,
        dj: [],
        scale: 1,
        rB: 0,
        sB: 0,
        Me: [],
        gf: [],
        WA: q,
        Rx: 0,
        handleEvent: function (a) {
            switch (a.type) {
            case nf:
                if (!jf && 0 !== a.button) break;
                this.Vu(a);
                break;
            case of:
                this.DR(a);
                break;
            case pf:
            case qf:
                this.gu(a);
                break;
            case mf:
                this.mA();
                break;
            case "DOMMouseScroll":
            case "mousewheel":
                this.gT(a);
                break;
            case rf:
                this.cT(a);
                break;
            case "click":
                this.iP(a)
            }
        },
        ZO: function () {
            !this.Xg && (!this.Ck && !(this.xl || this.yx == this.Ib.offsetWidth * this.scale && this.Wo == this.Ib.offsetHeight *
                this.scale)) && this.refresh()
        },
        Mu: function (a) {
            var b;
            this[a + "Scrollbar"] ? (this[a + "ScrollbarWrapper"] || (b = Qe.createElement("div"), this.options.VD ? b.className =
                this.options.VD + a.toUpperCase() : b.style.cssText = "position:absolute;z-index:100;" + ("h" == a ?
                "height:7px;bottom:1px;left:2px;right:" + (this.gi ? "7" : "2") + "px" : "width:7px;bottom:" + (this.Oh ?
                "7" : "2") + "px;top:2px;right:1px"), b.style.cssText += ";pointer-events:none;" + Ye +
                "transition-property:opacity;" + Ye + "transition-duration:" + (this.options.vV ? "350ms" : "0") +
                ";overflow:hidden;opacity:" + (this.options.Fw ? "0" : "1"), this.Fm.appendChild(b), this[a +
                "ScrollbarWrapper"] = b, b = Qe.createElement("div"), this.options.VD || (b.style.cssText =
                "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + Ye +
                "background-clip:padding-box;" + Ye + "box-sizing:border-box;" + ("h" == a ? "height:100%" :
                "width:100%") + ";" + Ye + "border-radius:3px;border-radius:3px"), b.style.cssText +=
                ";pointer-events:none;" + Ye + "transition-property:" + Ye + "transform;" + Ye +
                "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + Ye + "transition-duration:0;" + Ye +
                "transform: translate(0,0)" + uf, this.options.fi && (b.style.cssText += ";" + Ye +
                "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), this[a + "ScrollbarWrapper"].appendChild(
                b), this[a + "ScrollbarIndicator"] = b), "h" == a ? (this.wK = this.xK.clientWidth, this.MW = Re.max(Re
                .round(this.wK * this.wK / this.yx), 8), this.LW.style.width = this.MW + "px") : (this.xN = this.yN.clientHeight,
                this.d_ = Re.max(Re.round(this.xN * this.xN / this.Wo), 8), this.c_.style.height = this.d_ + "px"),
                this.nA(a, p)) : this[a + "ScrollbarWrapper"] && (kf && (this[a + "ScrollbarIndicator"].style[$e] = ""),
                this[a + "ScrollbarWrapper"].parentNode.removeChild(this[a + "ScrollbarWrapper"]), this[a +
                "ScrollbarWrapper"] = q, this[a + "ScrollbarIndicator"] = q)
        },
        mA: function () {
            var a = this;
            setTimeout(function () {
                a.refresh()
            }, oe ? 200 : 0)
        },
        Fq: function (a, b) {
            this.Ck || (a = this.Ao ? a : 0, b = this.Cm ? b : 0, this.options.zk ? this.Ib.style[$e] = "translate(" +
                a + "px," + b + "px) scale(" + this.scale + ")" + uf : (a = Re.round(a), b = Re.round(b), this.Ib.style
                .left = a + "px", this.Ib.style.top = b + "px"), this.x = a, this.y = b, this.nA("h"), this.nA("v"))
        },
        nA: function (a, b) {
            var c = "h" == a ? this.x : this.y;
            this[a + "Scrollbar"] && (c *= this[a + "ScrollbarProp"], 0 > c ? (this.options.hC || (c = this[a +
                "ScrollbarIndicatorSize"] + Re.round(3 * c), 8 > c && (c = 8), this[a + "ScrollbarIndicator"].style["h" ==
                a ? "width" : "height"] = c + "px"), c = 0) : c > this[a + "ScrollbarMaxScroll"] && (this.options.hC ?
                c = this[a + "ScrollbarMaxScroll"] : (c = this[a + "ScrollbarIndicatorSize"] - Re.round(3 * (c - this[a +
                "ScrollbarMaxScroll"])), 8 > c && (c = 8), this[a + "ScrollbarIndicator"].style["h" == a ? "width" :
                "height"] = c + "px", c = this[a + "ScrollbarMaxScroll"] + (this[a + "ScrollbarIndicatorSize"] - c))),
                this[a + "ScrollbarWrapper"].style[ef] = "0", this[a + "ScrollbarWrapper"].style.opacity = b && this.options
                .Fw ? "0" : "1", this[a + "ScrollbarIndicator"].style[$e] = "translate(" + ("h" == a ? c + "px,0)" :
                "0," + c + "px)") + uf)
        },
        iP: function (a) {
            if (a.aQ === p) return this.LA = a.target, this.fw = Date.now(), p;
            if (this.LA && this.fw) {
                if (600 < Date.now() - this.fw) return this.fw = this.LA = q, p
            } else {
                for (var b = a.target; b != this.Ib && b != document.body;) b = b.parentNode;
                if (b == document.body) return p
            }
            for (b = a.target; 1 != b.nodeType;) b = b.parentNode;
            b = b.tagName.toLowerCase();
            if ("select" != b && "input" != b && "textarea" != b) return a.stopImmediatePropagation ? a.stopImmediatePropagation() :
                    a.pY = p, a.stopPropagation(), a.preventDefault(), this.fw = this.LA = q, t
        },
        Vu: function (a) {
            var b = jf ? a.touches[0] : a,
                c, e;
            if (this.enabled) {
                this.options.JL && this.options.JL.call(this, a);
                (this.options.fi || this.options.zoom) && this.$H(0);
                this.Ck = this.xl = this.Xg = t;
                this.AB = this.zB = this.ov = this.nv = this.GB = this.FB = 0;
                this.options.zoom && (jf && 1 < a.touches.length) && (e = Re.abs(a.touches[0].pageX - a.touches[1].pageX),
                    c = Re.abs(a.touches[0].pageY - a.touches[1].pageY), this.MZ = Re.sqrt(e * e + c * c), this.hx = Re
                    .abs(a.touches[0].pageX + a.touches[1].pageX - 2 * this.JE) / 2 - this.x, this.ix = Re.abs(a.touches[
                    0].pageY + a.touches[1].pageY - 2 * this.KE) / 2 - this.y, this.options.Mo && this.options.Mo.call(
                    this, a));
                if (this.options.Zw && (this.options.zk ? (c = getComputedStyle(this.Ib, q)[$e].replace(/[^0-9\-.,]/g,
                    "").split(","), e = +(c[12] || c[4]), c = +(c[13] || c[5])) : (e = +getComputedStyle(this.Ib, q).left
                    .replace(/[^0-9-]/g, ""), c = +getComputedStyle(this.Ib, q).top.replace(/[^0-9-]/g, "")), e != this
                    .x || c != this.y)) this.options.fi ? this.Od(rf) : tf(this.WA), this.dj = [], this.Fq(e, c), this.options
                        .fx && this.options.fx.call(this);
                this.pv = this.x;
                this.qv = this.y;
                this.ht = this.x;
                this.it = this.y;
                this.Yg = b.pageX;
                this.Zg = b.pageY;
                this.startTime = a.timeStamp || Date.now();
                this.options.UL && this.options.UL.call(this, a);
                this.ba(of, window);
                this.ba(pf, window);
                this.ba(qf, window)
            }
        },
        DR: function (a) {
            var b = jf ? a.touches[0] : a,
                c = b.pageX - this.Yg,
                e = b.pageY - this.Zg,
                f = this.x + c,
                g = this.y + e,
                i = a.timeStamp || Date.now();
            this.options.IL && this.options.IL.call(this, a);
            if (this.options.zoom && jf && 1 < a.touches.length) f = Re.abs(a.touches[0].pageX - a.touches[1].pageX), g =
                    Re.abs(a.touches[0].pageY - a.touches[1].pageY), this.LZ = Re.sqrt(f * f + g * g), this.Ck = p, b =
                    1 / this.MZ * this.LZ * this.scale, b < this.options.Bk ? b = 0.5 * this.options.Bk * Math.pow(2, b /
                    this.options.Bk) : b > this.options.np && (b = 2 * this.options.np * Math.pow(0.5, this.options.np /
                    b)), this.Fo = b / this.scale, f = this.hx - this.hx * this.Fo + this.x, g = this.ix - this.ix *
                    this.Fo + this.y, this.Ib.style[$e] = "translate(" + f + "px," + g + "px) scale(" + b + ")" + uf,
                    this.options.WL && this.options.WL.call(this, a);
            else {
                this.Yg = b.pageX;
                this.Zg = b.pageY;
                if (0 < f || f < this.Wd) f = this.options.Tn ? this.x + c / 2 : 0 <= f || 0 <= this.Wd ? 0 : this.Wd;
                if (g > this.ef || g < this.ed) g = this.options.Tn ? this.y + e / 2 : g >= this.ef || 0 <= this.ed ?
                        this.ef : this.ed;
                this.FB += c;
                this.GB += e;
                this.nv = Re.abs(this.FB);
                this.ov = Re.abs(this.GB);
                6 > this.nv && 6 > this.ov || (this.options.tD && (this.nv > this.ov + 5 ? (g = this.y, e = 0) : this.ov >
                    this.nv + 5 && (f = this.x, c = 0)), this.Xg = p, this.Fq(f, g), this.zB = 0 < c ? -1 : 0 > c ? 1 :
                    0, this.AB = 0 < e ? -1 : 0 > e ? 1 : 0, 300 < i - this.startTime && (this.startTime = i, this.ht =
                    this.x, this.it = this.y), this.options.TL && this.options.TL.call(this, a))
            }
        },
        gu: function (a) {
            if (!(jf && 0 !== a.touches.length)) {
                var b = this,
                    c = jf ? a.changedTouches[0] : a,
                    e, f, g = {
                        Ba: 0,
                        time: 0
                    }, i = {
                        Ba: 0,
                        time: 0
                    }, k = (a.timeStamp || Date.now()) - b.startTime;
                e = b.x;
                f = b.y;
                b.Od(of, window);
                b.Od(pf, window);
                b.Od(qf, window);
                b.options.HL && b.options.HL.call(b, a);
                if (b.Ck) e = b.scale * b.Fo, e = Math.max(b.options.Bk, e), e = Math.min(b.options.np, e), b.Fo = e /
                        b.scale, b.scale = e, b.x = b.hx - b.hx * b.Fo + b.x, b.y = b.ix - b.ix * b.Fo + b.y, b.Ib.style[
                        bf] = "200ms", b.Ib.style[$e] = "translate(" + b.x + "px," + b.y + "px) scale(" + b.scale + ")" +
                        uf, b.Ck = t, b.refresh(), b.options.Lo && b.options.Lo.call(b, a);
                else {
                    if (b.Xg) {
                        if (300 > k && b.options.Zw) {
                            g = e ? b.WG(e - b.ht, k, -b.x, b.yx - b.At + b.x, b.options.Tn ? b.At : 0) : g;
                            i = f ? b.WG(f - b.it, k, -b.y, 0 > b.ed ? b.Wo - b.Gm + b.y - b.ef : 0, b.options.Tn ? b.Gm :
                                0) : i;
                            e = b.x + g.Ba;
                            f = b.y + i.Ba;
                            if (0 < b.x && 0 < e || b.x < b.Wd && e < b.Wd) g = {
                                    Ba: 0,
                                    time: 0
                            };
                            if (b.y > b.ef && f > b.ef || b.y < b.ed && f < b.ed) i = {
                                    Ba: 0,
                                    time: 0
                            }
                        }
                        g.Ba || i.Ba ? (c = Re.max(Re.max(g.time, i.time), 10), b.options.dt && (g = e - b.pv, i = f -
                            b.qv, Re.abs(g) < b.options.Ix && Re.abs(i) < b.options.Ix ? b.scrollTo(b.pv, b.qv, 200) :
                            (g = b.QH(e, f), e = g.x, f = g.y, c = Re.max(g.time, c))), b.scrollTo(Re.round(e), Re.round(
                            f), c)) : b.options.dt ? (g = e - b.pv, i = f - b.qv, Re.abs(g) < b.options.Ix && Re.abs(i) <
                            b.options.Ix ? b.scrollTo(b.pv, b.qv, 200) : (g = b.QH(b.x, b.y), (g.x != b.x || g.y != b.y) &&
                            b.scrollTo(g.x, g.y, g.time))) : b.wn(200)
                    } else {
                        if (jf) if (b.lJ && b.options.zoom) clearTimeout(b.lJ), b.lJ = q, b.options.Mo && b.options.Mo.call(
                                    b, a), b.zoom(b.Yg, b.Zg, 1 == b.scale ? b.options.RU : 1), b.options.Lo &&
                                    setTimeout(function () {
                                    b.options.Lo.call(b, a)
                                }, 200);
                            else if (this.options.Bw) {
                            for (e = c.target; 1 != e.nodeType;) e = e.parentNode;
                            f = e.tagName.toLowerCase();
                            "select" != f && "input" != f && "textarea" != f ? (f = Qe.createEvent("MouseEvents"), f.initMouseEvent(
                                "click", p, p, a.view, 1, c.screenX, c.screenY, c.clientX, c.clientY, a.ctrlKey, a.altKey,
                                a.shiftKey, a.metaKey, 0, q), f.aQ = p, e.dispatchEvent(f)) : e.focus()
                        }
                        b.wn(400)
                    }
                    b.options.VL && b.options.VL.call(b, a)
                }
            }
        },
        wn: function (a) {
            var b = 0 <= this.x ? 0 : this.x < this.Wd ? this.Wd : this.x,
                c = this.y >= this.ef || 0 < this.ed ? this.ef : this.y < this.ed ? this.ed : this.y;
            if (b == this.x && c == this.y) {
                if (this.Xg && (this.Xg = t, this.options.fx && this.options.fx.call(this)), this.Oh && this.options.Fw &&
                    ("webkit" == Te && (this.xK.style[ef] = "300ms"), this.xK.style.opacity = "0"), this.gi && this.options
                    .Fw) "webkit" == Te && (this.yN.style[ef] = "300ms"), this.yN.style.opacity = "0"
            } else this.scrollTo(b, c, a || 0)
        },
        gT: function (a) {
            var b = this,
                c, e;
            if ("wheelDeltaX" in a) c = a.wheelDeltaX / 12, e = a.wheelDeltaY / 12;
            else if ("wheelDelta" in a) c = e = a.wheelDelta / 12;
            else if ("detail" in a) c = e = 3 * -a.detail;
            else return; if ("zoom" == b.options.FN) {
                if (e = b.scale * Math.pow(2, 1 / 3 * (e ? e / Math.abs(e) : 0)), e < b.options.Bk && (e = b.options.Bk),
                    e > b.options.np && (e = b.options.np), e != b.scale)!b.Rx && b.options.Mo && b.options.Mo.call(b,
                    a), b.Rx++, b.zoom(a.pageX, a.pageY, e, 400), setTimeout(function () {
                    b.Rx--;
                    !b.Rx && b.options.Lo && b.options.Lo.call(b, a)
                }, 400)
            } else c = b.x + c, e = b.y + e, 0 < c ? c = 0 : c < b.Wd && (c = b.Wd), e > b.ef ? e = b.ef : e < b.ed &&
                    (e = b.ed), 0 > b.ed && b.scrollTo(c, e, 0)
        },
        cT: function (a) {
            a.target == this.Ib && (this.Od(rf), this.zA())
        },
        zA: function () {
            var a = this,
                b = a.x,
                c = a.y,
                e = Date.now(),
                f, g, i;
            a.xl || (a.dj.length ? (f = a.dj.shift(), f.x == b && f.y == c && (f.time = 0), a.xl = p, a.Xg = p, a.options
                .fi) ? (a.$H(f.time), a.Fq(f.x, f.y), a.xl = t, f.time ? a.ba(rf) : a.wn(0)) : (i = function () {
                var k = Date.now(),
                    m;
                if (k >= e + f.time) {
                    a.Fq(f.x, f.y);
                    a.xl = t;
                    a.options.RX && a.options.RX.call(a);
                    a.zA()
                } else {
                    k = (k - e) / f.time - 1;
                    g = Re.sqrt(1 - k * k);
                    k = (f.x - b) * g + b;
                    m = (f.y - c) * g + c;
                    a.Fq(k, m);
                    if (a.xl) a.WA = sf(i)
                }
            }, i()) : a.wn(400))
        },
        $H: function (a) {
            a += "ms";
            this.Ib.style[bf] = a;
            this.Oh && (this.LW.style[bf] = a);
            this.gi && (this.c_.style[bf] = a)
        },
        WG: function (a, b, c, e, f) {
            var b = Re.abs(a) / b,
                g = b * b / 0.0012;
            0 < a && g > c ? (c += f / (6 / (6.0E-4 * (g / b))), b = b * c / g, g = c) : 0 > a && g > e && (e += f / (6 /
                (6.0E-4 * (g / b))), b = b * e / g, g = e);
            return {
                Ba: g * (0 > a ? -1 : 1),
                time: Re.round(b / 6.0E-4)
            }
        },
        Bj: function (a) {
            for (var b = -a.offsetLeft, c = -a.offsetTop; a = a.offsetParent;) b -= a.offsetLeft, c -= a.offsetTop;
            a != this.Fm && (b *= this.scale, c *= this.scale);
            return {
                left: b,
                top: c
            }
        },
        QH: function (a, b) {
            var c, e, f;
            f = this.Me.length - 1;
            c = 0;
            for (e = this.Me.length; c < e; c++) if (a >= this.Me[c]) {
                    f = c;
                    break
                }
            f == this.rB && (0 < f && 0 > this.zB) && f--;
            a = this.Me[f];
            e = (e = Re.abs(a - this.Me[this.rB])) ? 500 * (Re.abs(this.x - a) / e) : 0;
            this.rB = f;
            f = this.gf.length - 1;
            for (c = 0; c < f; c++) if (b >= this.gf[c]) {
                    f = c;
                    break
                }
            f == this.sB && (0 < f && 0 > this.AB) && f--;
            b = this.gf[f];
            c = (c = Re.abs(b - this.gf[this.sB])) ? 500 * (Re.abs(this.y - b) / c) : 0;
            this.sB = f;
            f = Re.round(Re.max(e, c)) || 200;
            return {
                x: a,
                y: b,
                time: f
            }
        },
        ba: function (a, b, c) {
            (b || this.Ib).addEventListener(a, this, !! c)
        },
        Od: function (a, b, c) {
            (b || this.Ib).removeEventListener(a, this, !! c)
        },
        xB: fa(2),
        refresh: function () {
            var a, b, c, e = 0;
            b = 0;
            this.scale < this.options.Bk && (this.scale = this.options.Bk);
            this.At = this.Fm.clientWidth || 1;
            this.Gm = this.Fm.clientHeight || 1;
            this.ef = -this.options.KZ || 0;
            this.yx = Re.round(this.Ib.offsetWidth * this.scale);
            this.Wo = Re.round((this.Ib.offsetHeight + this.ef) * this.scale);
            this.Wd = this.At - this.yx;
            this.ed = this.Gm - this.Wo + this.ef;
            this.AB = this.zB = 0;
            this.options.RL && this.options.RL.call(this);
            this.Ao = this.options.Ao && 0 > this.Wd;
            this.Cm = this.options.Cm && (!this.options.OT && !this.Ao || this.Wo > this.Gm);
            this.Oh = this.Ao && this.options.Oh;
            this.gi = this.Cm && this.options.gi && this.Wo > this.Gm;
            a = this.Bj(this.Fm);
            this.JE = -a.left;
            this.KE = -a.top;
            if ("string" == typeof this.options.dt) {
                this.Me = [];
                this.gf = [];
                c = this.Ib.querySelectorAll(this.options.dt);
                a = 0;
                for (b = c.length; a < b; a++) e = this.Bj(c[a]), e.left += this.JE, e.top += this.KE, this.Me[a] = e.left <
                        this.Wd ? this.Wd : e.left * this.scale, this.gf[a] = e.top < this.ed ? this.ed : e.top * this.scale
            } else if (this.options.dt) {
                for (this.Me = []; e >= this.Wd;) this.Me[b] = e, e -= this.At, b++;
                this.Wd % this.At && (this.Me[this.Me.length] = this.Wd - this.Me[this.Me.length - 1] + this.Me[this.Me
                    .length - 1]);
                b = e = 0;
                for (this.gf = []; e >= this.ed;) this.gf[b] = e, e -= this.Gm, b++;
                this.ed % this.Gm && (this.gf[this.gf.length] = this.ed - this.gf[this.gf.length - 1] + this.gf[this.gf
                    .length - 1])
            }
            this.Mu("h");
            this.Mu("v");
            this.Ck || (this.Ib.style[bf] = "0", this.wn(400))
        },
        scrollTo: function (a, b, c, e) {
            var f = a;
            this.stop();
            f.length || (f = [{
                    x: a,
                    y: b,
                    time: c,
                    rY: e
                }]);
            a = 0;
            for (b = f.length; a < b; a++) f[a].rY && (f[a].x = this.x - f[a].x, f[a].y = this.y - f[a].y), this.dj.push({
                    x: f[a].x,
                    y: f[a].y,
                    time: f[a].time || 0
                });
            this.zA()
        },
        disable: function () {
            this.stop();
            this.wn(0);
            this.enabled = t;
            this.Od(of, window);
            this.Od(pf, window);
            this.Od(qf, window)
        },
        enable: function () {
            this.enabled = p
        },
        stop: function () {
            this.options.fi ? this.Od(rf) : tf(this.WA);
            this.dj = [];
            this.xl = this.Xg = t
        },
        zoom: function (a, b, c, e) {
            var f = c / this.scale;
            this.options.zk && (this.Ck = p, e = e === l ? 200 : e, a = a - this.JE - this.x, b = b - this.KE - this.y,
                this.x = a - a * f + this.x, this.y = b - b * f + this.y, this.scale = c, this.refresh(), this.x = 0 <
                this.x ? 0 : this.x < this.Wd ? this.Wd : this.x, this.y = this.y > this.ef ? this.ef : this.y < this.ed ?
                this.ed : this.y, this.Ib.style[bf] = e + "ms", this.Ib.style[$e] = "translate(" + this.x + "px," +
                this.y + "px) scale(" + c + ")" + uf, this.Ck = t)
        }
    };

    function Ze(a) {
        if ("" === Te) return a;
        a = a.charAt(0).toUpperCase() + a.substr(1);
        return Te + a
    }
    Se = q;

    function wf(a) {
        this.j = {
            anchor: Yb,
            offset: new O(0, 0),
            maxWidth: "100%",
            imageHeight: 80
        };
        var a = a || {}, b;
        for (b in a) this.j[b] = a[b];
        this.ll = new ec(q, {
            af: "api"
        });
        this.Dj = [];
        this.P = q;
        this.Tf = {
            height: this.j.imageHeight,
            width: this.j.imageHeight * xf
        };
        this.Kc = this.oA = this.Al = this.Rc = q
    }
    var yf = [0, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 8, 8, 8, 9, 10],
        zf =
            "\u5176\u4ed6 \u6b63\u95e8 \u623f\u578b \u8bbe\u65bd \u6b63\u95e8 \u9910\u996e\u8bbe\u65bd \u5176\u4ed6\u8bbe\u65bd \u6b63\u95e8 \u8bbe\u65bd \u89c2\u5f71\u5385 \u5176\u4ed6\u8bbe\u65bd"
            .split(" ");
    D.km(function (a) {
        var b = q;
        a.addEventListener("position_changed", function () {
            a.j.visible && a.j.albumsControl === p && (b ? b.tx(a.Pb()) : (b = new wf(a.j.albumsControlOptions), b.ta(a)))
        });
        a.addEventListener("albums_visible_changed", function () {
            a.j.albumsControl === p ? (b ? b.tx(a.Pb()) : (b = new wf(a.j.albumsControlOptions), b.ta(a)), b.show()) :
                b.U()
        });
        a.addEventListener("albums_options_changed", function () {
            b && b.pk(a.j.albumsControlOptions)
        });
        a.addEventListener("visible_changed", function () {
            b && (a.SC() ? a.j.albumsControl === p && (b.C.style.visibility = "visible") : b.C.style.visibility =
                "hidden")
        })
    });
    var xf = 1.8;
    I() && (xf = 1);
    z.extend(wf.prototype, {
        pk: function (a) {
            for (var b in a) this.j[b] = a[b];
            a = this.j.imageHeight + "px";
            this.nc(this.j.anchor);
            this.C.style.width = isNaN(Number(this.j.maxWidth)) === p ? this.j.maxWidth : this.j.maxWidth + "px";
            this.C.style.height = a;
            this.Ij.style.height = a;
            this.yh.style.height = a;
            this.Tf = {
                height: this.j.imageHeight,
                width: this.j.imageHeight * xf
            };
            this.Hj.style.height = this.Tf.height - 6 + "px";
            this.Hj.style.width = this.Tf.width - 6 + "px";
            this.tx(this.P.Pb(), p)
        },
        ta: function (a) {
            this.P = a;
            this.pr();
            this.HO();
            this.cX();
            this.tx(a.Pb())
        },
        pr: function () {
            var a = this.j.imageHeight + "px";
            this.C = N("div");
            var b = this.C.style;
            b.cssText = "background:rgb(37,37,37);background:rgba(37,37,37,0.9);";
            b.position = "absolute";
            b.zIndex = "2000";
            b.width = isNaN(Number(this.j.maxWidth)) === p ? this.j.maxWidth : this.j.maxWidth + "px";
            b.padding = "8px 0";
            b.visibility = "hidden";
            b.height = a;
            this.Ij = N("div");
            b = this.Ij.style;
            b.position = "absolute";
            b.overflow = "hidden";
            b.width = "100%";
            b.height = a;
            this.yh = N("div");
            b = this.yh.style;
            b.height = a;
            this.Ij.appendChild(this.yh);
            this.C.appendChild(this.Ij);
            this.P.C.appendChild(this.C);
            this.Hj = N("div", {
                "class": "pano_photo_item_seleted"
            });
            this.Hj.style.height = this.Tf.height - 6 + "px";
            this.Hj.style.width = this.Tf.width - 6 + "px";
            this.nc(this.j.anchor)
        },
        oG: function (a) {
            for (var b = this.Dj, c = b.length - 1; 0 <= c; c--) if (b[c].panoId == a) return c;
            return -1
        },
        tx: function (a, b) {
            if (b || !this.Dj[this.Rc] || !(this.Dj[this.Rc].panoId == a && 3 !== this.Dj[this.Rc].recoType)) {
                var c = this,
                    e = this.oG(a);
                !b && -1 !== e && this.Dj[e] && 3 !== this.Dj[e].recoType ? this.Zo(e) : this.rW(function (a) {
                    for (var b = {}, e, k, m = t, n = [], o = 0, s = a.length; o < s; o++) e = a[o].catlog, k = a[o].floor,
                            l !== e && ("" === e && l !== k ? (m = p, b[k] || (b[k] = []), b[k].push(a[o])) : (b[yf[e]] ||
                            (b[yf[e]] = []), b[yf[e]].push(a[o])));
                    for (var v in b) m ? n.push({
                            data: v + "F",
                            index: v
                        }) : n.push({
                            data: zf[v],
                            index: v
                        });
                    c.IF = b;
                    c.si = n;
                    c.il(a);
                    0 == a.length ? c.U() : c.show()
                })
            }
        },
        yU: function () {
            if (!this.pi) {
                var a = this.fW(this.si),
                    b = N("div");
                b.style.cssText = ["width:" + 134 * this.si.length + "px;",
                        "overflow:hidden;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;"].join("");
                b.innerHTML = a;
                a = N("div");
                a.appendChild(b);
                a.style.cssText =
                    "position:absolute;top:-25px;background:rgb(37,37,37);background:rgba(37,37,37,0.9);border-bottom:1px solid #4e596a;width:100%;line-height:25px;height:25px;overflow:scroll;outline:0";
                new vf(a, {
                    Tn: t,
                    Zw: p,
                    Oh: t,
                    gi: t,
                    Cm: t,
                    tD: p,
                    Fv: p,
                    Bw: p
                });
                this.C.appendChild(a);
                for (var c = this, e = b.getElementsByTagName("span"), f = 0, g = e.length; f < g; f++) b = e[f], z.M(b,
                        "click", function () {
                        if (this.getAttribute("dataindex")) {
                            c.il(c.IF[this.getAttribute("dataindex")]);
                            for (var a = 0, b = e.length; a < b; a++) e[a].style.color = "#FFFFFF";
                            this.style.color = "#3383FF"
                        }
                    });
                this.pi = a
            }
        },
        vU: function () {
            if (this.pi) a = this.RJ(this.si), this.XO.innerHTML = a;
            else {
                var a = this.RJ(this.si),
                    b = N("ul"),
                    c = this;
                b.style.cssText =
                    "list-style: none;padding:0px;margin:0px;display:block;width:60px;position:absolute;top:7px";
                b.innerHTML = a;
                z.M(b, "click", function (a) {
                    if (a = (a.srcElement || a.target).getAttribute("dataindex")) {
                        c.il(c.IF[a]);
                        for (var e = b.getElementsByTagName("li"), f = 0, g = e.length; f < g; f++) e[f].childNodes[0].getAttribute(
                                "dataindex") === a ? z.D.Ya(e[f], "pano_catlogLiActive") : z.D.mc(e[f],
                                "pano_catlogLiActive")
                    }
                });
                var a = N("div"),
                    e = N("a"),
                    f = N("span"),
                    g = N("a"),
                    i = N("span"),
                    k = ["background:url(" + H.oa + "panorama/catlog_icon.png) no-repeat;",
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
                    new ub({
                        Bc: 60,
                        Tb: vb.Ir,
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
                        new ub({
                            Bc: 60,
                            Tb: vb.Ir,
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
                e = N("div");
                e.style.cssText = ["position:absolute;z-index:2001;left:20px;", "height:" + this.j.imageHeight + "px;",
                        "width:62px;overflow:hidden;background:rgb(37,37,37);background:rgba(37,37,37,0.9);"].join("");
                e.appendChild(b);
                e.appendChild(a);
                this.pi = e;
                this.XO = b;
                this.C.appendChild(e)
            }
        },
        wU: function () {
            if (this.si && !(0 >= this.si.length)) {
                var a = N("div");
                a.innerHTML = this.Ty;
                a.style.cssText = "position:absolute;background:#252525";
                this.C.appendChild(a);
                this.Mr = a;
                this.Kc.Uf.style.left = this.Tf.width + 8 + "px";
                this.pi && (this.pi.style.left = parseInt(this.pi.style.left, 10) + this.Tf.width + 8 + "px");
                var b = this;
                z.M(a, "click", function () {
                    b.P.wc(b.rV)
                })
            }
        },
        il: function (a) {
            this.Dj = a;
            this.j.showCatalog && (0 < this.si.length ? (Va() ? this.vU() : this.yU(), this.Kc.offsetLeft = 60) : (this
                .Mr && (this.C.removeChild(this.Mr), this.Mr = q, this.Kc.Uf.style.left = "0px"), this.pi && (this.C.removeChild(
                this.pi), this.pi = q), this.Kc.offsetLeft = 0));
            var b = this.$V(a);
            Va() && (this.si && 0 < this.si.length && this.j.showExit && this.Ty) && (this.Kc.offsetLeft += this.Tf.width +
                8, this.Mr ? this.Mr.innerHTML = this.Ty : this.wU());
            this.yh.innerHTML = b;
            this.yh.style.width = (this.Tf.width + 8) * a.length + 8 + "px";
            a = this.C.offsetWidth;
            b = this.yh.offsetWidth;
            this.Kc.Tr && (b += this.Kc.Tr());
            b < a - 2 * this.Kc.ji - this.Kc.offsetLeft ? this.C.style.width = b + this.Kc.offsetLeft + "px" : (this.C.style
                .width = isNaN(Number(this.j.maxWidth)) === p ? this.j.maxWidth : this.j.maxWidth + "px", b < this.C.offsetWidth -
                2 * this.Kc.ji - this.Kc.offsetLeft && (this.C.style.width = b + this.Kc.offsetLeft + "px"));
            this.Kc.refresh();
            this.oA = this.yh.children;
            this.yh.appendChild(this.Hj);
            this.Hj.style.left = "-100000px";
            a = this.oG(this.P.Pb(), this.s0); - 1 !== a && this.Zo(a)
        },
        fW: function (a) {
            for (var b = "", c, e = 0, f = a.length; e < f; e++) c =
                    '<div style="color:white;opacity:0.5;margin:0 35px;float:left;text-align: center"><span  dataIndex="' +
                    a[e].index + '">' + a[e].data + "</span></div>", b += c;
            return b
        },
        RJ: function (a) {
            for (var b = "", c, e = 0, f = a.length; e < f; e++) c =
                    '<li class="pano_catlogLi"><span style="display:block;width:100%;" dataIndex="' + a[e].index + '">' +
                    a[e].data + "</span></li>", b += c;
            return b
        },
        $V: function (a) {
            for (var b, c, e, f, g = [], i = this.Tf.height, k = this.Tf.width, m = 0; m < a.length; m++) b = a[m],
                    recoType = b.recoType, e = b.panoId, f = b.name, c = b.heading, b = b.pitch, c = Pe.dK(e, c, b, 198,
                    108), b = '<a href="javascript:void(0);" class="pano_photo_item" data-index="' + m +
                    '"><img style="width:' + (k - 2) + "px;height:" + (i - 2) + 'px;" data-index="' + m + '" name="' +
                    f + '" src="' + c + '" alt="' + f + '"/><span class="pano_photo_decs" data-index="' + m +
                    '" style="width:' + k + "px;font-size:" + Math.floor(i / 6) + "px; line-height:" + Math.floor(i / 6) +
                    'px;"><em class="pano_poi_' + recoType + '"></em>' + f + "</span></a>", 3 === recoType ? Va() ? (
                    this.Ty = b, this.rV = e, a.splice(m, 1), m--) : (b =
                    '<a href="javascript:void(0);" class="pano_photo_item" data-index="' + m + '"><img style="width:' +
                    (k - 2) + "px;height:" + (i - 2) + 'px;" data-index="' + m + '" name="' + f + '" src="' + c +
                    '" alt="' + f +
                    '"/><div style="background:rgba(37,37,37,0.5);position:absolute;top:0px;left:0px;width:100%;height:100%;text-align: center;line-height:' +
                    this.j.imageHeight + 'px;" data-index="' + m + '"><img src="' + H.oa +
                    'panorama/photoexit.png" style="border:none;vertical-align:middle;" data-index="' + m +
                    '" alt=""/></div></a>', g.push(b)) : g.push(b);
            return g.join("")
        },
        rW: function (a) {
            var b = this,
                c = this.P.Pb();
            c && this.ll.zw(c, function (e) {
                b.P.Pb() === c && a(e)
            })
        },
        nc: function (a) {
            if (!Xa(a) || isNaN(a) || a < Wb || 3 < a) a = this.defaultAnchor;
            var b = this.C,
                c = this.j.offset.width,
                e = this.j.offset.height;
            b.style.left = b.style.top = b.style.right = b.style.bottom = "auto";
            switch (a) {
            case Wb:
                b.style.top = e + "px";
                b.style.left = c + "px";
                break;
            case Xb:
                b.style.top = e + "px";
                b.style.right = c + "px";
                break;
            case Yb:
                b.style.bottom = e + "px";
                b.style.left = c + "px";
                break;
            case 3:
                b.style.bottom = e + "px", b.style.right = c + "px"
            }
        },
        HO: function () {
            this.FO()
        },
        FO: function () {
            var a = this;
            z.M(this.C, "touchstart", function (a) {
                a.stopPropagation()
            });
            z.M(this.Ij, "click", function (b) {
                if ((b = (b.srcElement || b.target).getAttribute("data-index")) && b != a.Rc) a.Zo(b), a.P.wc(a.Dj[b].panoId)
            });
            z.M(this.yh, "mouseover", function (b) {
                b = (b.srcElement || b.target).getAttribute("data-index");
                b !== q && a.VI(b, p)
            });
            this.P.addEventListener("size_changed", function () {
                isNaN(Number(a.j.maxWidth)) && a.pk({
                    maxWidth: a.j.maxWidth
                })
            })
        },
        Zo: function (a) {
            this.Hj.style.left = this.oA[a].offsetLeft + 8 + "px";
            this.Hj.setAttribute("data-index", this.oA[a].getAttribute("data-index"));
            this.Rc = a;
            this.VI(a)
        },
        VI: function (a, b) {
            var c = this.Tf.width + 8,
                e = 0;
            this.Kc.Tr && (e = this.Kc.Tr() / 2);
            var f = this.Ij.offsetWidth - 2 * e,
                g = this.yh.offsetLeft || this.Kc.x,
                g = g - e,
                i = -a * c;
            i > g && this.Kc.scrollTo(i + e);
            c = i - c;
            g -= f;
            c < g && (!b || b && 8 < i - g) && this.Kc.scrollTo(c + f + e)
        },
        cX: function () {
            this.Kc = I() ? new vf(this.Ij, {
                Tn: t,
                Zw: p,
                Oh: t,
                gi: t,
                Cm: t,
                tD: p,
                Fv: p,
                Bw: p
            }) : new Af(this.Ij)
        },
        U: function () {
            this.C.style.visibility = "hidden"
        },
        show: function () {
            this.C.style.visibility = "visible"
        }
    });

    function Af(a) {
        this.C = a;
        this.Eg = a.children[0];
        this.Uq = q;
        this.ji = 20;
        this.offsetLeft = 0;
        this.ta()
    }
    Af.prototype = {
        ta: function () {
            this.Eg.style.position = "relative";
            this.refresh();
            this.pr();
            this.YA()
        },
        refresh: function () {
            this.nn = this.C.offsetWidth - this.Tr();
            this.Oz = -(this.Eg.offsetWidth - this.nn - this.ji);
            this.yu = this.ji + this.offsetLeft;
            this.Eg.style.left = this.yu + "px";
            this.Eg.children[0] && (this.Uq = this.Eg.children[0].offsetWidth);
            this.Uf && (this.Uf.children[0].style.marginTop = this.Mq.children[0].style.marginTop = this.Uf.offsetHeight /
                2 - this.Uf.children[0].offsetHeight / 2 + "px")
        },
        Tr: function () {
            return 2 * this.ji
        },
        pr: function () {
            this.Nu = N("div");
            this.Nu.innerHTML =
                '<a class="pano_photo_arrow_l" style="background:rgb(37,37,37);background:rgba(37,37,37,0.9);" href="javascript:void(0)" title="\u4e0a\u4e00\u9875"><span class="pano_arrow_l"></span></a><a class="pano_photo_arrow_r" style="background:rgb(37,37,37);background:rgba(37,37,37,0.9);" href="javascript:void(0)" title="\u4e0b\u4e00\u9875"><span class="pano_arrow_r"></span></a>';
            this.Uf = this.Nu.children[0];
            this.Mq = this.Nu.children[1];
            this.C.appendChild(this.Nu);
            this.Uf.children[0].style.marginTop = this.Mq.children[0].style.marginTop = this.Uf.offsetHeight / 2 - this
                .Uf.children[0].offsetHeight / 2 + "px"
        },
        YA: function () {
            var a = this;
            z.M(this.Uf, "click", function () {
                a.scrollTo(a.Eg.offsetLeft + a.nn)
            });
            z.M(this.Mq, "click", function () {
                a.scrollTo(a.Eg.offsetLeft - a.nn)
            })
        },
        dT: function () {
            z.D.mc(this.Uf, "pano_arrow_disable");
            z.D.mc(this.Mq, "pano_arrow_disable");
            var a = this.Eg.offsetLeft;
            a >= this.yu && z.D.Ya(this.Uf, "pano_arrow_disable");
            a - this.nn <= this.Oz && z.D.Ya(this.Mq, "pano_arrow_disable")
        },
        scrollTo: function (a) {
            a = a < this.Eg.offsetLeft ? Math.ceil((a - this.ji - this.nn) / this.Uq) * this.Uq + this.nn + this.ji - 8 :
                Math.ceil((a - this.ji) / this.Uq) * this.Uq + this.ji;
            a < this.Oz ? a = this.Oz : a > this.yu && (a = this.yu);
            var b = this.Eg.offsetLeft,
                c = this;
            new ub({
                Bc: 60,
                Tb: vb.Ir,
                duration: 300,
                va: function (e) {
                    c.Eg.style.left = b + (a - b) * e + "px"
                },
                finish: function () {
                    c.dT()
                }
            })
        }
    };
    D.Map = Na;
    D.Hotspot = jb;
    D.MapType = Ed;
    D.Point = J;
    D.Pixel = R;
    D.Size = O;
    D.Bounds = fb;
    D.TileLayer = Mc;
    D.Projection = jc;
    D.MercatorProjection = S;
    D.PerspectiveProjection = ib;
    D.Copyright = function (a, b, c) {
        this.id = a;
        this.Za = b;
        this.content = c
    };
    D.Overlay = mc;
    D.Label = uc;
    D.GroundOverlay = vc;
    D.PointCollection = zc;
    D.Marker = U;
    D.CanvasLayer = Cc;
    D.Icon = qc;
    D.IconSequence = sc;
    D.Symbol = rc;
    D.Polyline = Gc;
    D.Polygon = Fc;
    D.InfoWindow = tc;
    D.Circle = Hc;
    D.Control = Ub;
    D.NavigationControl = kb;
    D.GeolocationControl = Zb;
    D.OverviewMapControl = mb;
    D.CopyrightControl = $b;
    D.ScaleControl = lb;
    D.MapTypeControl = ob;
    D.CityListControl = ac;
    D.PanoramaControl = cc;
    D.TrafficLayer = Uc;
    D.CustomLayer = pb;
    D.ContextMenu = fc;
    D.MenuItem = ic;
    D.LocalSearch = db;
    D.TransitRoute = fe;
    D.DrivingRoute = ie;
    D.WalkingRoute = je;
    D.RidingRoute = ke;
    D.Autocomplete = ye;
    D.RouteSearch = pe;
    D.Geocoder = qe;
    D.LocalCity = ve;
    D.Geolocation = Geolocation;
    D.Convertor = lc;
    D.BusLineSearch = xe;
    D.Boundary = we;
    D.Panorama = Qa;
    D.PanoramaLabel = Ee;
    D.PanoramaService = ec;
    D.PanoramaCoverageLayer = dc;
    D.PanoramaFlashInterface = Ne;

    function T(a, b) {
        for (var c in b) a[c] = b[c]
    }
    T(window, {
        BMap: D,
        _jsload2: function (a, b) {
            ha.Jx.nX && ha.Jx.set(a, b);
            K.YT(a, b)
        },
        BMAP_API_VERSION: "2.0"
    });
    var Bf = Na.prototype;
    T(Bf, {
        getBounds: Bf.ke,
        getCenter: Bf.tb,
        getMapType: Bf.ra,
        getSize: Bf.yb,
        setSize: Bf.se,
        getViewport: Bf.ds,
        getZoom: Bf.ga,
        centerAndZoom: Bf.td,
        panTo: Bf.Zh,
        panBy: Bf.kg,
        setCenter: Bf.hf,
        setCurrentCity: Bf.aE,
        setMapType: Bf.ng,
        setViewport: Bf.eh,
        setZoom: Bf.Jc,
        highResolutionEnabled: Bf.Hw,
        zoomTo: Bf.pg,
        zoomIn: Bf.LE,
        zoomOut: Bf.ME,
        addHotspot: Bf.NA,
        removeHotspot: Bf.tY,
        clearHotspots: Bf.Jv,
        checkResize: Bf.aU,
        addControl: Bf.tv,
        removeControl: Bf.mM,
        getContainer: Bf.Pa,
        addContextMenu: Bf.Ln,
        removeContextMenu: Bf.Po,
        addOverlay: Bf.Ka,
        removeOverlay: Bf.Lb,
        clearOverlays: Bf.SI,
        openInfoWindow: Bf.Tc,
        closeInfoWindow: Bf.Qc,
        pointToOverlayPixel: Bf.Ne,
        overlayPixelToPoint: Bf.YL,
        getInfoWindow: Bf.Rg,
        getOverlays: Bf.ww,
        getPanes: function () {
            return {
                floatPane: this.Md.iC,
                markerMouseTarget: this.Md.vD,
                floatShadow: this.Md.IJ,
                labelPane: this.Md.pD,
                markerPane: this.Md.vL,
                markerShadow: this.Md.wL,
                mapPane: this.Md.ys,
                vertexPane: this.Md.BN
            }
        },
        addTileLayer: Bf.Ee,
        removeTileLayer: Bf.Lf,
        pixelToPoint: Bf.zb,
        pointToPixel: Bf.Rb,
        setFeatureStyle: Bf.Y3,
        selectBaseElement: Bf.R3,
        setMapStyle: Bf.Ts,
        enable3DBuilding: Bf.eo,
        disable3DBuilding: Bf.LU,
        getPanorama: Bf.$r,
        initIndoorLayer: Bf.dX,
        setNormalMapDisplay: Bf.JM,
        setMapStyleV2: Bf.YY,
        setBMapCopyrightOffset: Bf.OY
    });
    var Cf = Ed.prototype;
    T(Cf, {
        getTileLayer: Cf.BW,
        getMinZoom: Cf.ro,
        getMaxZoom: Cf.Ol,
        getProjection: Cf.Rl,
        getTextColor: Cf.Ul,
        getTips: Cf.cs
    });
    T(window, {
        BMAP_NORMAL_MAP: Oa,
        BMAP_PERSPECTIVE_MAP: Ra,
        BMAP_SATELLITE_MAP: Za,
        BMAP_HYBRID_MAP: Ta
    });
    var Df = S.prototype;
    T(Df, {
        lngLatToPoint: Df.Tg,
        pointToLngLat: Df.cj
    });
    var Ef = ib.prototype;
    T(Ef, {
        lngLatToPoint: Ef.Tg,
        pointToLngLat: Ef.cj
    });
    var Ff = fb.prototype;
    T(Ff, {
        equals: Ff.fc,
        containsPoint: Ff.mr,
        containsBounds: Ff.lU,
        intersects: Ff.ks,
        extend: Ff.extend,
        getCenter: Ff.tb,
        isEmpty: Ff.Zi,
        getSouthWest: Ff.Ke,
        getNorthEast: Ff.Ff,
        toSpan: Ff.xE
    });
    var Gf = mc.prototype;
    T(Gf, {
        isVisible: Gf.Hc,
        show: Gf.show,
        hide: Gf.U
    });
    mc.getZIndex = mc.bk;
    var Hf = hb.prototype;
    T(Hf, {
        openInfoWindow: Hf.Tc,
        closeInfoWindow: Hf.Qc,
        enableMassClear: Hf.Ni,
        disableMassClear: Hf.NU,
        show: Hf.show,
        hide: Hf.U,
        getMap: Hf.sw,
        addContextMenu: Hf.Ln,
        removeContextMenu: Hf.Po
    });
    var If = U.prototype;
    T(If, {
        setIcon: If.Mb,
        getIcon: If.qo,
        setPosition: If.qa,
        getPosition: If.fa,
        setOffset: If.Zd,
        getOffset: If.Qi,
        getLabel: If.BC,
        setLabel: If.tm,
        setTitle: If.xc,
        setTop: If.ci,
        enableDragging: If.Ob,
        disableDragging: If.CB,
        setZIndex: If.ep,
        getMap: If.sw,
        setAnimation: If.sm,
        setShadow: If.Cx,
        hide: If.U,
        setRotation: If.ap,
        getRotation: If.hK
    });
    T(window, {
        BMAP_ANIMATION_DROP: 1,
        BMAP_ANIMATION_BOUNCE: 2
    });
    var Jf = uc.prototype;
    T(Jf, {
        setStyle: Jf.Bd,
        setStyles: Jf.bi,
        setContent: Jf.Vc,
        setPosition: Jf.qa,
        getPosition: Jf.fa,
        setOffset: Jf.Zd,
        getOffset: Jf.Qi,
        setTitle: Jf.xc,
        setZIndex: Jf.ep,
        getMap: Jf.sw,
        getContent: Jf.Wj
    });
    var Kf = qc.prototype;
    T(Kf, {
        setImageUrl: Kf.DM,
        setSize: Kf.se,
        setAnchor: Kf.nc,
        setImageOffset: Kf.Ss,
        setImageSize: Kf.TY,
        setInfoWindowAnchor: Kf.WY,
        setPrintImageUrl: Kf.gZ
    });
    var Lf = tc.prototype;
    T(Lf, {
        redraw: Lf.Yd,
        setTitle: Lf.xc,
        setContent: Lf.Vc,
        getContent: Lf.Wj,
        getPosition: Lf.fa,
        enableMaximize: Lf.Og,
        disableMaximize: Lf.Zv,
        isOpen: Lf.Ua,
        setMaxContent: Lf.Us,
        maximize: Lf.Yw,
        enableAutoPan: Lf.Jr
    });
    var Mf = oc.prototype;
    T(Mf, {
        getPath: Mf.Je,
        setPath: Mf.$d,
        setPositionAt: Mf.vm,
        getStrokeColor: Mf.xW,
        setStrokeWeight: Mf.dp,
        getStrokeWeight: Mf.kK,
        setStrokeOpacity: Mf.bp,
        getStrokeOpacity: Mf.yW,
        setFillOpacity: Mf.Rs,
        getFillOpacity: Mf.VV,
        setStrokeStyle: Mf.cp,
        getStrokeStyle: Mf.jK,
        getFillColor: Mf.UV,
        getBounds: Mf.ke,
        enableEditing: Mf.Ze,
        disableEditing: Mf.MU,
        getEditing: Mf.RV
    });
    var Nf = Hc.prototype;
    T(Nf, {
        setCenter: Nf.hf,
        getCenter: Nf.tb,
        getRadius: Nf.fK,
        setRadius: Nf.jf
    });
    var Of = Fc.prototype;
    T(Of, {
        getPath: Of.Je,
        setPath: Of.$d,
        setPositionAt: Of.vm
    });
    var Pf = jb.prototype;
    T(Pf, {
        getPosition: Pf.fa,
        setPosition: Pf.qa,
        getText: Pf.MC,
        setText: Pf.Ys
    });
    J.prototype.equals = J.prototype.fc;
    R.prototype.equals = R.prototype.fc;
    O.prototype.equals = O.prototype.fc;
    T(window, {
        BMAP_ANCHOR_TOP_LEFT: Wb,
        BMAP_ANCHOR_TOP_RIGHT: Xb,
        BMAP_ANCHOR_BOTTOM_LEFT: Yb,
        BMAP_ANCHOR_BOTTOM_RIGHT: 3
    });
    var Qf = Ub.prototype;
    T(Qf, {
        setAnchor: Qf.nc,
        getAnchor: Qf.oC,
        setOffset: Qf.Zd,
        getOffset: Qf.Qi,
        show: Qf.show,
        hide: Qf.U,
        isVisible: Qf.Hc,
        toString: Qf.toString
    });
    var Rf = kb.prototype;
    T(Rf, {
        getType: Rf.yo,
        setType: Rf.wm
    });
    T(window, {
        BMAP_NAVIGATION_CONTROL_LARGE: 0,
        BMAP_NAVIGATION_CONTROL_SMALL: 1,
        BMAP_NAVIGATION_CONTROL_PAN: 2,
        BMAP_NAVIGATION_CONTROL_ZOOM: 3
    });
    var Sf = mb.prototype;
    T(Sf, {
        changeView: Sf.ie,
        setSize: Sf.se,
        getSize: Sf.yb
    });
    var Tf = lb.prototype;
    T(Tf, {
        getUnit: Tf.GW,
        setUnit: Tf.hE
    });
    T(window, {
        BMAP_UNIT_METRIC: "metric",
        BMAP_UNIT_IMPERIAL: "us"
    });
    var Uf = $b.prototype;
    T(Uf, {
        addCopyright: Uf.uv,
        removeCopyright: Uf.PD,
        getCopyright: Uf.Ll,
        getCopyrightCollection: Uf.vC
    });
    T(window, {
        BMAP_MAPTYPE_CONTROL_HORIZONTAL: bc,
        BMAP_MAPTYPE_CONTROL_DROPDOWN: 1,
        BMAP_MAPTYPE_CONTROL_MAP: 2
    });
    var Vf = Mc.prototype;
    T(Vf, {
        getMapType: Vf.ra,
        getCopyright: Vf.Ll,
        isTransparentPng: Vf.rs
    });
    var Wf = fc.prototype;
    T(Wf, {
        addItem: Wf.vv,
        addSeparator: Wf.QA,
        removeSeparator: Wf.RD
    });
    var Xf = ic.prototype;
    T(Xf, {
        setText: Xf.Ys
    });
    var Yf = X.prototype;
    T(Yf, {
        getStatus: Yf.Sl,
        setSearchCompleteCallback: Yf.Xs,
        getPageCapacity: Yf.cf,
        setPageCapacity: Yf.$o,
        setLocation: Yf.um,
        disableFirstResultSelection: Yf.DB,
        enableFirstResultSelection: Yf.VB,
        gotoPage: Yf.Vl,
        searchNearby: Yf.Xo,
        searchInBounds: Yf.rm,
        search: Yf.search
    });
    T(window, {
        BMAP_STATUS_SUCCESS: 0,
        BMAP_STATUS_CITY_LIST: 1,
        BMAP_STATUS_UNKNOWN_LOCATION: Od,
        BMAP_STATUS_UNKNOWN_ROUTE: 3,
        BMAP_STATUS_INVALID_KEY: 4,
        BMAP_STATUS_INVALID_REQUEST: 5,
        BMAP_STATUS_PERMISSION_DENIED: Pd,
        BMAP_STATUS_SERVICE_UNAVAILABLE: 7,
        BMAP_STATUS_TIMEOUT: Qd
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
    var Zf = ee.prototype;
    T(Zf, {
        clearResults: Zf.He
    });
    ge = fe.prototype;
    T(ge, {
        setPolicy: ge.Ws,
        toString: ge.toString,
        setPageCapacity: ge.$o,
        setIntercityPolicy: ge.FM,
        setTransitTypePolicy: ge.OM
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
    var $f = pe.prototype;
    T($f, {
        routeCall: $f.yM
    });
    T(window, {
        BMAP_HIGHLIGHT_STEP: 1,
        BMAP_HIGHLIGHT_ROUTE: 2
    });
    T(window, {
        BMAP_ROUTE_TYPE_DRIVING: Sd,
        BMAP_ROUTE_TYPE_WALKING: Rd,
        BMAP_ROUTE_TYPE_RIDING: Td
    });
    T(window, {
        BMAP_ROUTE_STATUS_NORMAL: Ud,
        BMAP_ROUTE_STATUS_EMPTY: 1,
        BMAP_ROUTE_STATUS_ADDRESS: 2
    });
    var ag = ie.prototype;
    T(ag, {
        setPolicy: ag.Ws
    });
    var cg = ye.prototype;
    T(cg, {
        show: cg.show,
        hide: cg.U,
        setTypes: cg.gE,
        setLocation: cg.um,
        search: cg.search,
        setInputValue: cg.zx
    });
    T(pb.prototype, {});
    var dg = we.prototype;
    T(dg, {
        get: dg.get
    });
    T(dc.prototype, {});
    T(window, {
        BMAP_POINT_DENSITY_HIGH: 200,
        BMAP_POINT_DENSITY_MEDIUM: Xc,
        BMAP_POINT_DENSITY_LOW: 50
    });
    T(window, {
        BMAP_POINT_SHAPE_STAR: 1,
        BMAP_POINT_SHAPE_WATERDROP: 2,
        BMAP_POINT_SHAPE_CIRCLE: wc,
        BMAP_POINT_SHAPE_SQUARE: 4,
        BMAP_POINT_SHAPE_RHOMBUS: 5
    });
    T(window, {
        BMAP_POINT_SIZE_TINY: 1,
        BMAP_POINT_SIZE_SMALLER: 2,
        BMAP_POINT_SIZE_SMALL: 3,
        BMAP_POINT_SIZE_NORMAL: xc,
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
        BMAP_CONTEXT_MENU_ICON_ZOOMIN: gc,
        BMAP_CONTEXT_MENU_ICON_ZOOMOUT: hc
    });
    T(window, {
        BMAP_SYS_DRAWER: Ma,
        BMAP_SVG_DRAWER: 1,
        BMAP_VML_DRAWER: 2,
        BMAP_CANVAS_DRAWER: 3,
        BMAP_SVG_DRAWER_FIRST: 4
    });
    D.wT();
    D.h_();
})()