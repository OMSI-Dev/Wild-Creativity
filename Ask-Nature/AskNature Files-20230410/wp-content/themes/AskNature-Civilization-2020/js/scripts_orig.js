"use strict";
!(function (t, e) {
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.balanceText = e());
})(this, function () {
    var t,
        e,
        i,
        s = { sel: [], el: [] },
        r = !1,
        a = !1;
    function n() {}
    function o(t, e) {
        Array.prototype.forEach.call(t, e);
    }
    function l() {
        this.reset();
    }
    function h(t) {
        return e.some(function (e) {
            return e.start < t && t < e.end;
        });
    }
    function p(t, s) {
        if (t.nodeType === t.ELEMENT_NODE)
            if ("nowrap" === window.getComputedStyle(t).whiteSpace) {
                var r = t.outerHTML.length;
                e.push({ start: i, end: i + r }), (i += r);
            } else
                o(t.childNodes, function (t) {
                    p(t, !0);
                }),
                    s && (i += t.outerHTML.length - t.innerHTML.length);
        else t.nodeType === t.COMMENT_NODE ? (i += t.length + 7) : t.nodeType === t.PROCESSING_INSTRUCTION_NODE ? (i += t.length + 2) : (i += t.length);
    }
    function d(t, s, r) {
        if (0 === r) (t.style.whiteSpace = s), (i = 0), (e = []), p(t, !1), (t.style.whiteSpace = "nowrap");
        else {
            var a = [];
            e.forEach(function (t) {
                t.start > r && a.push({ start: t.start - r, end: t.end - r });
            }),
                (e = a);
        }
    }
    l.prototype.reset = function () {
        (this.index = 0), (this.width = 0);
    };
    var c;
    function f(t, e, i) {
        var s, r, a, n, o;
        return (
            (n = (e = e.trim()).split(" ").length),
            (e += " "),
            n < 2
                ? e
                : (((a = document.createElement("span")).innerHTML = e),
                  t.appendChild(a),
                  (r = a.offsetWidth),
                  a.parentNode.removeChild(a),
                  (o = Math.floor((i - r) / (n - 1))),
                  (a.style.wordSpacing = o + "px"),
                  a.setAttribute("data-owner", "balance-text-justify"),
                  (s = document.createElement("div")).appendChild(a),
                  s.innerHTML)
        );
    }
    function u(e, i) {
        var s,
            r = /([^\S\u00a0]|-|\u2014|\u2013|\u00ad)(?![^<]*>)/g;
        if (!t) for (t = [], s = r.exec(e); null !== s; ) h(s.index) || t.push(s.index), (s = r.exec(e));
        return -1 !== t.indexOf(i);
    }
    function m(t, e) {
        return 0 === e || e === t.length || (u(t, e - 1) && !u(t, e));
    }
    function g(t, e, i, s, r, a, n) {
        var o;
        if (e && "string" == typeof e)
            for (;;) {
                for (; !m(e, a); ) a += r;
                if (((t.innerHTML = e.substr(0, a)), (o = t.offsetWidth), r < 0)) {
                    if (o <= s || o <= 0 || 0 === a) break;
                } else if (s <= o || i <= o || a === e.length) break;
                a += r;
            }
        (n.index = a), (n.width = o);
    }
    function y(t) {
        return t ? ("string" == typeof t ? document.querySelectorAll(t) : t.tagName && t.querySelectorAll ? [t] : t) : [];
    }
    function v(e) {
        o(y(e), function (e) {
            !(function (t) {
                var e = t.querySelectorAll('br[data-owner="balance-text-hyphen"]');
                o(e, function (t) {
                    t.outerHTML = "";
                }),
                    o((e = t.querySelectorAll('br[data-owner="balance-text"]')), function (t) {
                        t.outerHTML = " ";
                    });
                var i = t.querySelectorAll('span[data-owner="balance-text-softhyphen"]');
                if (
                    (i.length > 0 &&
                        o(i, function (t) {
                            var e = document.createTextNode("­");
                            t.parentNode.insertBefore(e, t), t.parentNode.removeChild(t);
                        }),
                    (i = t.querySelectorAll('span[data-owner="balance-text-justify"]')).length > 0)
                ) {
                    var s = "";
                    o(i, function (t) {
                        (s += t.textContent), t.parentNode.removeChild(t);
                    }),
                        (t.innerHTML = s);
                }
            })(e);
            var i = e.style.whiteSpace,
                s = e.style.float,
                r = e.style.display,
                a = e.style.position,
                n = e.style.lineHeight;
            e.style.lineHeight = "normal";
            var h = e.offsetWidth,
                p = e.offsetHeight;
            (e.style.whiteSpace = "nowrap"), (e.style.float = "none"), (e.style.display = "inline"), (e.style.position = "static");
            var c = e.offsetWidth,
                u = e.offsetHeight,
                m =
                    "pre-wrap" === i
                        ? 0
                        : (function (t, e) {
                              var i,
                                  s,
                                  r = document.createElement("div");
                              return (
                                  (r.style.display = "block"),
                                  (r.style.position = "absolute"),
                                  (r.style.bottom = 0),
                                  (r.style.right = 0),
                                  (r.style.width = 0),
                                  (r.style.height = 0),
                                  (r.style.margin = 0),
                                  (r.style.padding = 0),
                                  (r.style.visibility = "hidden"),
                                  (r.style.overflow = "hidden"),
                                  ((s = document.createElement("span")).style.fontSize = "2000px"),
                                  (s.innerHTML = "&nbsp;"),
                                  r.appendChild(s),
                                  t.appendChild(r),
                                  (i = s.getBoundingClientRect()),
                                  r.parentNode.removeChild(r),
                                  e / (i.height / i.width)
                              );
                          })(e, u);
            if (h > 0 && c > h && c < 5e3) {
                for (
                    var y,
                        v,
                        b,
                        w,
                        S,
                        k = e.innerHTML,
                        T = "",
                        x = "",
                        P = (function (t) {
                            return "justify" === (t.currentStyle || window.getComputedStyle(t, null)).textAlign;
                        })(e),
                        A = Math.round(p / u),
                        C = 0;
                    A > 1;

                )
                    (t = null),
                        d(e, i, C),
                        g(e, k, h, (y = Math.round((c + m) / A - m)), -1, Math.round((k.length + 1) / A) - 1, (v = new l())),
                        (b = new l()),
                        g(e, k, h, y, 1, v.index, b),
                        v.reset(),
                        g(e, k, h, y, -1, b.index, v),
                        (w = 0 === v.index ? b.index : h < b.width || v.index === b.index || Math.abs(y - v.width) < Math.abs(b.width - y) ? v.index : b.index),
                        (x = k.substr(0, w).replace(/\s$/, "")),
                        (S = Boolean(x.match(/\u00ad$/))) && (x = x.replace(/\u00ad$/, '<span data-owner="balance-text-softhyphen">-</span>')),
                        P ? (T += f(e, x, h)) : ((T += x), (T += S || Boolean(x.match(/(-|\u2014|\u2013)$/)) ? '<br data-owner="balance-text-hyphen" />' : '<br data-owner="balance-text" />')),
                        (k = k.substr(w)),
                        (C = w),
                        A--,
                        (e.innerHTML = k),
                        (c = e.offsetWidth);
                e.innerHTML = P ? T + f(e, k, h) : T + k;
            }
            (e.style.whiteSpace = i), (e.style.float = s), (e.style.display = r), (e.style.position = a), (e.style.lineHeight = n);
        });
    }
    function b() {
        var t = y(s.sel.join(","));
        v(Array.prototype.concat.apply(s.el, t));
    }
    function w() {
        var t, e, i, s, a;
        r ||
            ((t = b),
            "loading" !== document.readyState
                ? t()
                : document.addEventListener
                ? document.addEventListener("DOMContentLoaded", t)
                : document.attachEvent("onreadystatechange", function () {
                      "loading" !== document.readyState && t();
                  }),
            window.addEventListener("load", b),
            window.addEventListener(
                "resize",
                ((e = b),
                function () {
                    var t = this,
                        r = arguments;
                    function n() {
                        s || e.apply(t, r), (a = null);
                    }
                    a ? clearTimeout(a) : s && e.apply(t, r), (a = setTimeout(n, i || 100));
                })
            ),
            (r = !0));
    }
    function S(t, e) {
        t
            ? e && !0 === e.watch
                ? (function (t) {
                      "string" == typeof t
                          ? s.sel.push(t)
                          : o(y(t), function (t) {
                                s.el.push(t);
                            }),
                          w(),
                          b();
                  })(t)
                : e && !1 === e.watch
                ? (function (t) {
                      "string" == typeof t
                          ? (s.sel = s.sel.filter(function (e) {
                                return e !== t;
                            }))
                          : ((t = y(t)),
                            (s.el = s.el.filter(function (e) {
                                return -1 === t.indexOf(e);
                            })));
                  })(t)
                : v(t)
            : a || (s.sel.push(".balance-text"), w(), (a = !0));
    }
    return (S.updateWatched = b), (c = document.documentElement.style).textWrap || c.WebkitTextWrap || c.MozTextWrap || c.MsTextWrap ? ((n.updateWatched = n), n) : S;
}),
    (function (t, e) {
        var i = (function (t, e) {
            if (!e.getElementsByClassName) return;
            var i,
                s,
                r = e.documentElement,
                a = t.Date,
                n = t.HTMLPictureElement,
                o = "addEventListener",
                l = "getAttribute",
                h = t[o],
                p = t.setTimeout,
                d = t.requestAnimationFrame || p,
                c = t.requestIdleCallback,
                f = /^picture$/i,
                u = ["load", "error", "lazyincluded", "_lazyloaded"],
                m = {},
                g = Array.prototype.forEach,
                y = function (t, e) {
                    return m[e] || (m[e] = new RegExp("(\\s|^)" + e + "(\\s|$)")), m[e].test(t[l]("class") || "") && m[e];
                },
                v = function (t, e) {
                    y(t, e) || t.setAttribute("class", (t[l]("class") || "").trim() + " " + e);
                },
                b = function (t, e) {
                    var i;
                    (i = y(t, e)) && t.setAttribute("class", (t[l]("class") || "").replace(i, " "));
                },
                w = function (t, e, i) {
                    var s = i ? o : "removeEventListener";
                    i && w(t, e),
                        u.forEach(function (i) {
                            t[s](i, e);
                        });
                },
                S = function (t, s, r, a, n) {
                    var o = e.createEvent("Event");
                    return r || (r = {}), (r.instance = i), o.initEvent(s, !a, !n), (o.detail = r), t.dispatchEvent(o), o;
                },
                k = function (e, i) {
                    var r;
                    !n && (r = t.picturefill || s.pf) ? (i && i.src && !e[l]("srcset") && e.setAttribute("srcset", i.src), r({ reevaluate: !0, elements: [e] })) : i && i.src && (e.src = i.src);
                },
                T = function (t, e) {
                    return (getComputedStyle(t, null) || {})[e];
                },
                x = function (t, e, i) {
                    for (i = i || t.offsetWidth; i < s.minSize && e && !t._lazysizesWidth; ) (i = e.offsetWidth), (e = e.parentNode);
                    return i;
                },
                P =
                    ((D = []),
                    (I = []),
                    (F = D),
                    (L = function () {
                        var t = F;
                        for (F = D.length ? I : D, _ = !0, M = !1; t.length; ) t.shift()();
                        _ = !1;
                    }),
                    (z = function (t, i) {
                        _ && !i ? t.apply(this, arguments) : (F.push(t), M || ((M = !0), (e.hidden ? p : d)(L)));
                    }),
                    (z._lsFlush = L),
                    z),
                A = function (t, e) {
                    return e
                        ? function () {
                              P(t);
                          }
                        : function () {
                              var e = this,
                                  i = arguments;
                              P(function () {
                                  t.apply(e, i);
                              });
                          };
                },
                C = function (t) {
                    var e,
                        i = 0,
                        r = s.throttleDelay,
                        n = s.ricTimeout,
                        o = function () {
                            (e = !1), (i = a.now()), t();
                        },
                        l =
                            c && n > 49
                                ? function () {
                                      c(o, { timeout: n }), n !== s.ricTimeout && (n = s.ricTimeout);
                                  }
                                : A(function () {
                                      p(o);
                                  }, !0);
                    return function (t) {
                        var s;
                        (t = !0 === t) && (n = 33), e || ((e = !0), (s = r - (a.now() - i)) < 0 && (s = 0), t || s < 9 ? l() : p(l, s));
                    };
                },
                E = function (t) {
                    var e,
                        i,
                        s = 99,
                        r = function () {
                            (e = null), t();
                        },
                        n = function () {
                            var t = a.now() - i;
                            t < s ? p(n, s - t) : (c || r)(r);
                        };
                    return function () {
                        (i = a.now()), e || (e = p(n, s));
                    };
                };
            var _, M, D, I, F, L, z;
            !(function () {
                var e,
                    i = {
                        lazyClass: "lazyload",
                        loadedClass: "lazyloaded",
                        loadingClass: "lazyloading",
                        preloadClass: "lazypreload",
                        errorClass: "lazyerror",
                        autosizesClass: "lazyautosizes",
                        srcAttr: "data-src",
                        srcsetAttr: "data-srcset",
                        sizesAttr: "data-sizes",
                        minSize: 40,
                        customMedia: {},
                        init: !0,
                        expFactor: 1.5,
                        hFac: 0.8,
                        loadMode: 2,
                        loadHidden: !0,
                        ricTimeout: 0,
                        throttleDelay: 125,
                    };
                for (e in ((s = t.lazySizesConfig || t.lazysizesConfig || {}), i)) e in s || (s[e] = i[e]);
                (t.lazySizesConfig = s),
                    p(function () {
                        s.init && V();
                    });
            })();
            var O =
                    ((it = /^img$/i),
                    (st = /^iframe$/i),
                    (rt = "onscroll" in t && !/(gle|ing)bot/.test(navigator.userAgent)),
                    (at = 0),
                    (nt = 0),
                    (ot = 0),
                    (lt = -1),
                    (ht = function (t) {
                        ot--, t && t.target && w(t.target, ht), (!t || ot < 0 || !t.target) && (ot = 0);
                    }),
                    (pt = function (t) {
                        return null == et && (et = "hidden" == T(e.body, "visibility")), et || ("hidden" != T(t.parentNode, "visibility") && "hidden" != T(t, "visibility"));
                    }),
                    (dt = function (t, i) {
                        var s,
                            a = t,
                            n = pt(t);
                        for (J -= i, tt += i, Z -= i, Q += i; n && (a = a.offsetParent) && a != e.body && a != r; )
                            (n = (T(a, "opacity") || 1) > 0) && "visible" != T(a, "overflow") && ((s = a.getBoundingClientRect()), (n = Q > s.left && Z < s.right && tt > s.top - 1 && J < s.bottom + 1));
                        return n;
                    }),
                    (ct = function () {
                        var t,
                            a,
                            n,
                            o,
                            h,
                            p,
                            d,
                            c,
                            f,
                            u,
                            m,
                            g,
                            y = i.elements;
                        if ((U = s.loadMode) && ot < 8 && (t = y.length)) {
                            for (
                                a = 0,
                                    lt++,
                                    m = (u = !s.expand || s.expand < 1 ? (r.clientHeight > 500 && r.clientWidth > 500 ? 500 : 370) : s.expand) * s.expFactor,
                                    g = s.hFac,
                                    et = null,
                                    nt < m && ot < 1 && lt > 2 && U > 2 && !e.hidden ? ((nt = m), (lt = 0)) : (nt = U > 1 && lt > 1 && ot < 6 ? u : at);
                                a < t;
                                a++
                            )
                                if (y[a] && !y[a]._lazyRace)
                                    if (rt)
                                        if (
                                            (((c = y[a][l]("data-expand")) && (p = 1 * c)) || (p = nt),
                                            f !== p && ((X = innerWidth + p * g), (K = innerHeight + p), (d = -1 * p), (f = p)),
                                            (n = y[a].getBoundingClientRect()),
                                            (tt = n.bottom) >= d &&
                                                (J = n.top) <= K &&
                                                (Q = n.right) >= d * g &&
                                                (Z = n.left) <= X &&
                                                (tt || Q || Z || J) &&
                                                (s.loadHidden || pt(y[a])) &&
                                                ((q && ot < 3 && !c && (U < 3 || lt < 4)) || dt(y[a], p)))
                                        ) {
                                            if ((wt(y[a]), (h = !0), ot > 9)) break;
                                        } else !h && q && !o && ot < 4 && lt < 4 && U > 2 && (j[0] || s.preloadAfterLoad) && (j[0] || (!c && (tt || Q || Z || J || "auto" != y[a][l](s.sizesAttr)))) && (o = j[0] || y[a]);
                                    else wt(y[a]);
                            o && !h && wt(o);
                        }
                    }),
                    (ft = C(ct)),
                    (ut = function (t) {
                        v(t.target, s.loadedClass), b(t.target, s.loadingClass), w(t.target, gt), S(t.target, "lazyloaded");
                    }),
                    (mt = A(ut)),
                    (gt = function (t) {
                        mt({ target: t.target });
                    }),
                    (yt = function (t, e) {
                        try {
                            t.contentWindow.location.replace(e);
                        } catch (i) {
                            t.src = e;
                        }
                    }),
                    (vt = function (t) {
                        var e,
                            i = t[l](s.srcsetAttr);
                        (e = s.customMedia[t[l]("data-media") || t[l]("media")]) && t.setAttribute("media", e), i && t.setAttribute("srcset", i);
                    }),
                    (bt = A(function (t, e, i, r, a) {
                        var n, o, h, d, c, u;
                        (c = S(t, "lazybeforeunveil", e)).defaultPrevented ||
                            (r && (i ? v(t, s.autosizesClass) : t.setAttribute("sizes", r)),
                            (o = t[l](s.srcsetAttr)),
                            (n = t[l](s.srcAttr)),
                            a && (d = (h = t.parentNode) && f.test(h.nodeName || "")),
                            (u = e.firesLoad || ("src" in t && (o || n || d))),
                            (c = { target: t }),
                            u && (w(t, ht, !0), clearTimeout(W), (W = p(ht, 2500)), v(t, s.loadingClass), w(t, gt, !0)),
                            d && g.call(h.getElementsByTagName("source"), vt),
                            o ? t.setAttribute("srcset", o) : n && !d && (st.test(t.nodeName) ? yt(t, n) : (t.src = n)),
                            a && (o || d) && k(t, { src: n })),
                            t._lazyRace && delete t._lazyRace,
                            b(t, s.lazyClass),
                            P(function () {
                                (!u || (t.complete && t.naturalWidth > 1)) && (u ? ht(c) : ot--, ut(c));
                            }, !0);
                    })),
                    (wt = function (t) {
                        var e,
                            i = it.test(t.nodeName),
                            r = i && (t[l](s.sizesAttr) || t[l]("sizes")),
                            a = "auto" == r;
                        ((!a && q) || !i || (!t[l]("src") && !t.srcset) || t.complete || y(t, s.errorClass) || !y(t, s.lazyClass)) &&
                            ((e = S(t, "lazyunveilread").detail), a && R.updateElem(t, !0, t.offsetWidth), (t._lazyRace = !0), ot++, bt(t, e, a, r, i));
                    }),
                    (St = function () {
                        if (!q)
                            if (a.now() - Y < 999) p(St, 999);
                            else {
                                var t = E(function () {
                                    (s.loadMode = 3), ft();
                                });
                                (q = !0),
                                    (s.loadMode = 3),
                                    ft(),
                                    h(
                                        "scroll",
                                        function () {
                                            3 == s.loadMode && (s.loadMode = 2), t();
                                        },
                                        !0
                                    );
                            }
                    }),
                    {
                        _: function () {
                            (Y = a.now()),
                                (i.elements = e.getElementsByClassName(s.lazyClass)),
                                (j = e.getElementsByClassName(s.lazyClass + " " + s.preloadClass)),
                                h("scroll", ft, !0),
                                h("resize", ft, !0),
                                t.MutationObserver ? new MutationObserver(ft).observe(r, { childList: !0, subtree: !0, attributes: !0 }) : (r[o]("DOMNodeInserted", ft, !0), r[o]("DOMAttrModified", ft, !0), setInterval(ft, 999)),
                                h("hashchange", ft, !0),
                                ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function (t) {
                                    e[o](t, ft, !0);
                                }),
                                /d$|^c/.test(e.readyState) ? St() : (h("load", St), e[o]("DOMContentLoaded", ft), p(St, 2e4)),
                                i.elements.length ? (ct(), P._lsFlush()) : ft();
                        },
                        checkElems: ft,
                        unveil: wt,
                    }),
                R =
                    ((N = A(function (t, e, i, s) {
                        var r, a, n;
                        if (((t._lazysizesWidth = s), (s += "px"), t.setAttribute("sizes", s), f.test(e.nodeName || ""))) for (a = 0, n = (r = e.getElementsByTagName("source")).length; a < n; a++) r[a].setAttribute("sizes", s);
                        i.detail.dataAttr || k(t, i.detail);
                    })),
                    (G = function (t, e, i) {
                        var s,
                            r = t.parentNode;
                        r && ((i = x(t, r, i)), (s = S(t, "lazybeforesizes", { width: i, dataAttr: !!e })).defaultPrevented || ((i = s.detail.width) && i !== t._lazysizesWidth && N(t, r, s, i)));
                    }),
                    (B = E(function () {
                        var t,
                            e = H.length;
                        if (e) for (t = 0; t < e; t++) G(H[t]);
                    })),
                    {
                        _: function () {
                            (H = e.getElementsByClassName(s.autosizesClass)), h("resize", B);
                        },
                        checkElems: B,
                        updateElem: G,
                    }),
                V = function () {
                    V.i || ((V.i = !0), R._(), O._());
                };
            var H, N, G, B;
            var j, q, W, U, Y, X, K, J, Z, Q, tt, et, it, st, rt, at, nt, ot, lt, ht, pt, dt, ct, ft, ut, mt, gt, yt, vt, bt, wt, St;
            return (i = { cfg: s, autoSizer: R, loader: O, init: V, uP: k, aC: v, rC: b, hC: y, fire: S, gW: x, rAF: P });
        })(t, t.document);
        (t.lazySizes = i), "object" == typeof module && module.exports && (module.exports = i);
    })(window),
    (function ($) {
        var t,
            e,
            i,
            s,
            r,
            a = !!window.getComputedStyle;
        function n(t, e) {
            var i,
                s,
                r,
                a,
                n,
                l = e.window,
                h = 0 !== c(),
                p = e.useLayoutViewport && "Width" === t,
                f = h || !d() || p,
                u = f ? l.document.documentElement["client" + t] : g(t, l);
            return (
                e.useLayoutViewport &&
                    !f &&
                    ((s = u),
                    (r = o(l, { asRange: !0 })),
                    (u = Math.round(s * r.calculated)),
                    y() || ((i = l.document.documentElement.clientHeight), (a = (s - 1) * r.min), (n = (s + 1) * r.max), ((u <= i + 3 && u >= i - 3) || (a <= i && n >= i && n < i + 30)) && (u = i))),
                u
            );
        }
        function o(t, e) {
            var i,
                s,
                r = e && e.asRange,
                a = { calculated: 1, min: 1, max: 1 };
            return (
                0 !== c() || !d() || (t || (t = window), (i = t.document.documentElement.clientWidth), (s = m(t)), (a.calculated = i / s), r && (y() ? (a.min = a.max = a.calculated) : ((a.min = i / (s + 1)), (a.max = i / (s - 1))))),
                r ? a : a.calculated
            );
        }
        function l(t) {
            var e,
                i,
                s,
                r = window,
                a = !0;
            return (
                t &&
                    t.length &&
                    ((e = v((t = Array.prototype.slice.call(t))[0])) || (t[0] = p(t[0])),
                    (i = !e && t[0]) || (t[1] = p(t[1])),
                    (s = !i && t[1]),
                    e
                        ? ((r = t[0]), s && t[1].viewport && (a = h(t[1].viewport)))
                        : i
                        ? (t[0].viewport && (a = h(t[0].viewport)), v(t[1]) && (r = t[1]))
                        : !t[0] && t[1] && (s && t[1].viewport ? (a = h(t[1].viewport)) : v(t[1]) && (r = t[1]))),
                { window: r, useVisualViewport: a, useLayoutViewport: !a }
            );
        }
        function h(t) {
            var e = b(t) && t.toLowerCase();
            if (t && !e) throw new Error("Invalid viewport option: " + t);
            if (e && "visual" !== e && "layout" !== e) throw new Error("Invalid viewport name: " + t);
            return "visual" === e;
        }
        function p(t) {
            return b(t) && "" !== t ? { viewport: t } : t;
        }
        function d() {
            return void 0 === e && (e = m() > 10), e;
        }
        function c() {
            var e;
            return (
                void 0 === t &&
                    (((e = document.createElement("div")).style.cssText = "width: 100px; height: 100px; overflow: scroll; position: absolute; top: -500px; left: -500px; margin: 0px; padding: 0px; border: none;"),
                    document.body.appendChild(e),
                    (t = e.offsetWidth - e.clientWidth),
                    document.body.removeChild(e)),
                t
            );
        }
        function f() {
            var t,
                e,
                i,
                r,
                n = (function () {
                    var t = document.createElement("iframe"),
                        e = document.body;
                    if (
                        ((t.style.cssText = "position: absolute; top: -600px; left: -600px; width: 500px; height: 500px; margin: 0px; padding: 0px; border: none; display: block;"),
                        (t.frameborder = "0"),
                        e.appendChild(t),
                        (t.src = "about:blank"),
                        !t.contentDocument)
                    )
                        return;
                    return t.contentDocument.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title></title><style type="text/css">html, body { overflow: hidden; }</style></head><body></body></html>'), t;
                })(),
                o = (n && n.contentDocument) || document,
                l = o.body,
                h = o !== document;
            ((e = o.createElement("div")).style.cssText = "width: 1px; height: 1px; position: relative; top: 0px; left: 32000px;"),
                h ||
                    (t = (function () {
                        var t,
                            e,
                            i = document.documentElement,
                            s = document.body,
                            r = a ? window.getComputedStyle(i, null) : i.currentStyle,
                            n = a ? window.getComputedStyle(s, null) : s.currentStyle,
                            o = (r.overflowX || r.overflow || "visible").toLowerCase(),
                            l = "hidden" !== (n.overflowX || n.overflow || "visible").toLowerCase(),
                            h = "visible" === o,
                            p = { documentElement: { modified: h }, body: { modified: l } };
                        h && ((t = i.style), (p.documentElement.styleOverflowX = t.overflowX), (t.overflowX = "auto"));
                        l && ((e = s.style), (p.body.styleOverflowX = e.overflowX), (e.overflowX = "hidden"));
                        return p;
                    })()),
                (i = l.scrollWidth),
                l.appendChild(e),
                (r = i !== l.scrollWidth),
                l.removeChild(e),
                h ||
                    (function (t) {
                        t.documentElement.modified && (document.documentElement.style.overflowX = t.documentElement.styleOverflowX);
                        t.body.modified && (document.body.style.overflowX = t.body.styleOverflowX);
                    })(t),
                (s = r ? "documentElement" : "body"),
                n && document.body.removeChild(n);
        }
        function u(t, e) {
            var i = e.documentElement;
            return Math.max(i.body["scroll" + t], e["scroll" + t], i.body["offset" + t], e["offset" + t], e["client" + t]);
        }
        function m(t) {
            return g("Width", t);
        }
        function g(t, e) {
            var s,
                r,
                a = (e || window).visualViewport ? (e || window).visualViewport[t.toLowerCase()] : (e || window)["inner" + t];
            return a && ((s = a), i || (r = s) !== +r || r === (0 | r) || (i = !0)), a;
        }
        function y() {
            return !!i;
        }
        function v(t) {
            return null != t && t.window == t;
        }
        function b(t) {
            return "string" == typeof t || (t && "object" == typeof t && "[object String]" === Object.prototype.toString.call(t)) || !1;
        }
        function w() {
            var t;
            return (
                void 0 === r &&
                    ((r = !1), (t = navigator && navigator.userAgent), navigator && "Microsoft Internet Explorer" === navigator.appName && t && null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(t) && (r = parseFloat(RegExp.$1))),
                r
            );
        }
        if (
            (($.documentWidth = function (t) {
                var e;
                t || (t = document);
                try {
                    void 0 === s && f(), (e = t[s].scrollWidth);
                } catch (i) {
                    e = u("Width", t);
                }
                return e;
            }),
            ($.documentHeight = function (t) {
                var e;
                t || (t = document);
                try {
                    void 0 === s && f(), (e = t[s].scrollHeight);
                } catch (i) {
                    e = u("Height", t);
                }
                return e;
            }),
            ($.windowWidth = function (t, e) {
                var i = l(arguments);
                return n("Width", i);
            }),
            ($.windowHeight = function (t, e) {
                var i = l(arguments);
                return n("Height", i);
            }),
            ($.pinchZoomFactor = function (t) {
                return o(t);
            }),
            ($.scrollbarWidth = c),
            "function" == typeof $ &&
                !(function () {
                    var t = w();
                    return t && t < 8;
                })() &&
                9 !== w())
        )
            try {
                $(function () {
                    void 0 === s && f(), c();
                });
            } catch (t) {}
    })("undefined" != typeof jQuery ? jQuery : "undefined" != typeof Zepto ? Zepto : $),
    (function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? (module.exports = t(require("jquery"))) : t(jQuery);
    })(function ($) {
        var t = -1,
            e = -1,
            i = function (t) {
                return parseFloat(t) || 0;
            },
            s = function (t) {
                var e = $(t),
                    s = null,
                    r = [];
                return (
                    e.each(function () {
                        var t = $(this),
                            e = t.offset().top - i(t.css("margin-top")),
                            a = r.length > 0 ? r[r.length - 1] : null;
                        null === a ? r.push(t) : Math.floor(Math.abs(s - e)) <= 1 ? (r[r.length - 1] = a.add(t)) : r.push(t), (s = e);
                    }),
                    r
                );
            },
            r = function (t) {
                var e = { byRow: !0, property: "height", target: null, remove: !1 };
                return "object" == typeof t ? $.extend(e, t) : ("boolean" == typeof t ? (e.byRow = t) : "remove" === t && (e.remove = !0), e);
            },
            a = ($.fn.matchHeight = function (t) {
                var e = r(t);
                if (e.remove) {
                    var i = this;
                    return (
                        this.css(e.property, ""),
                        $.each(a._groups, function (t, e) {
                            e.elements = e.elements.not(i);
                        }),
                        this
                    );
                }
                return (this.length <= 1 && !e.target) || (a._groups.push({ elements: this, options: e }), a._apply(this, e)), this;
            });
        (a.version = "master"),
            (a._groups = []),
            (a._throttle = 80),
            (a._maintainScroll = !1),
            (a._beforeUpdate = null),
            (a._afterUpdate = null),
            (a._rows = s),
            (a._parse = i),
            (a._parseOptions = r),
            (a._apply = function (t, e) {
                var n = r(e),
                    o = $(t),
                    l = [o],
                    h = $(window).scrollTop(),
                    p = $("html").outerHeight(!0),
                    d = o.parents().filter(":hidden");
                return (
                    d.each(function () {
                        var t = $(this);
                        t.data("style-cache", t.attr("style"));
                    }),
                    d.css("display", "block"),
                    n.byRow &&
                        !n.target &&
                        (o.each(function () {
                            var t = $(this),
                                e = t.css("display");
                            "inline-block" !== e && "flex" !== e && "inline-flex" !== e && (e = "block"),
                                t.data("style-cache", t.attr("style")),
                                t.css({ display: e, "padding-top": "0", "padding-bottom": "0", "margin-top": "0", "margin-bottom": "0", "border-top-width": "0", "border-bottom-width": "0", height: "100px", overflow: "hidden" });
                        }),
                        (l = s(o)),
                        o.each(function () {
                            var t = $(this);
                            t.attr("style", t.data("style-cache") || "");
                        })),
                    $.each(l, function (t, e) {
                        var s = $(e),
                            r = 0;
                        if (n.target) r = n.target.outerHeight(!1);
                        else {
                            if (n.byRow && s.length <= 1) return void s.css(n.property, "");
                            s.each(function () {
                                var t = $(this),
                                    e = t.attr("style"),
                                    i = t.css("display");
                                "inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block");
                                var s = { display: i };
                                (s[n.property] = ""), t.css(s), t.outerHeight(!1) > r && (r = t.outerHeight(!1)), e ? t.attr("style", e) : t.css("display", "");
                            });
                        }
                        s.each(function () {
                            var t = $(this),
                                e = 0;
                            (n.target && t.is(n.target)) ||
                                ("border-box" !== t.css("box-sizing") && ((e += i(t.css("border-top-width")) + i(t.css("border-bottom-width"))), (e += i(t.css("padding-top")) + i(t.css("padding-bottom")))), t.css(n.property, r - e + "px"));
                        });
                    }),
                    d.each(function () {
                        var t = $(this);
                        t.attr("style", t.data("style-cache") || null);
                    }),
                    a._maintainScroll && $(window).scrollTop((h / p) * $("html").outerHeight(!0)),
                    this
                );
            }),
            (a._applyDataApi = function () {
                var t = {};
                $("[data-match-height], [data-mh]").each(function () {
                    var e = $(this),
                        i = e.attr("data-mh") || e.attr("data-match-height");
                    t[i] = i in t ? t[i].add(e) : e;
                }),
                    $.each(t, function () {
                        this.matchHeight(!0);
                    });
            });
        var n = function (t) {
            a._beforeUpdate && a._beforeUpdate(t, a._groups),
                $.each(a._groups, function () {
                    a._apply(this.elements, this.options);
                }),
                a._afterUpdate && a._afterUpdate(t, a._groups);
        };
        (a._update = function (i, s) {
            if (s && "resize" === s.type) {
                var r = $(window).width();
                if (r === t) return;
                t = r;
            }
            i
                ? -1 === e &&
                  (e = setTimeout(function () {
                      n(s), (e = -1);
                  }, a._throttle))
                : n(s);
        }),
            $(a._applyDataApi);
        var o = $.fn.on ? "on" : "bind";
        $(window)[o]("load", function (t) {
            a._update(!1, t);
        }),
            $(window)[o]("resize orientationchange", function (t) {
                a._update(!0, t);
            });
    }),
    (function ($) {
        $.fn.fitVids = function (t) {
            var e = { customSelector: null };
            if (!document.getElementById("fit-vids-style")) {
                var i = document.head || document.getElementsByTagName("head")[0],
                    s = document.createElement("div");
                (s.innerHTML =
                    '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>'),
                    i.appendChild(s.childNodes[1]);
            }
            return (
                t && $.extend(e, t),
                this.each(function () {
                    var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='wistia.net']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
                    e.customSelector && t.push(e.customSelector);
                    var i = $(this).find(t.join(","));
                    (i = i.not("object object")).each(function () {
                        var t = $(this);
                        if (!(("embed" === this.tagName.toLowerCase() && t.parent("object").length) || t.parent(".fluid-width-video-wrapper").length)) {
                            t.css("height") || t.css("width") || (!isNaN(t.attr("height")) && !isNaN(t.attr("width"))) || (t.attr("height", 9), t.attr("width", 16));
                            var e =
                                ("object" === this.tagName.toLowerCase() || (t.attr("height") && !isNaN(parseInt(t.attr("height"), 10))) ? parseInt(t.attr("height"), 10) : t.height()) /
                                (isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10));
                            if (!t.attr("id")) {
                                var i = "fitvid" + Math.floor(999999 * Math.random());
                                t.attr("id", i);
                            }
                            t
                                .wrap('<div class="fluid-width-video-wrapper"></div>')
                                .parent(".fluid-width-video-wrapper")
                                .css("padding-top", 100 * e + "%"),
                                t.removeAttr("height").removeAttr("width");
                        }
                    });
                })
            );
        };
    })(window.jQuery || window.Zepto),
    (function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? (module.exports = t(require("jquery"))) : t(jQuery);
    })(function ($) {
        var t,
            e = window.Slick || {};
        (t = 0),
            ((e = function (e, i) {
                var s,
                    r = this;
                (r.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: $(e),
                    appendDots: $(e),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                    nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function (t, e) {
                        return $('<button type="button" />').text(e + 1);
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: 0.35,
                    fade: !1,
                    focusOnSelect: !1,
                    focusOnChange: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3,
                }),
                    (r.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        scrolling: !1,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        swiping: !1,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1,
                        unslicked: !1,
                    }),
                    $.extend(r, r.initials),
                    (r.activeBreakpoint = null),
                    (r.animType = null),
                    (r.animProp = null),
                    (r.breakpoints = []),
                    (r.breakpointSettings = []),
                    (r.cssTransitions = !1),
                    (r.focussed = !1),
                    (r.interrupted = !1),
                    (r.hidden = "hidden"),
                    (r.paused = !0),
                    (r.positionProp = null),
                    (r.respondTo = null),
                    (r.rowCount = 1),
                    (r.shouldClick = !0),
                    (r.$slider = $(e)),
                    (r.$slidesCache = null),
                    (r.transformType = null),
                    (r.transitionType = null),
                    (r.visibilityChange = "visibilitychange"),
                    (r.windowWidth = 0),
                    (r.windowTimer = null),
                    (s = $(e).data("slick") || {}),
                    (r.options = $.extend({}, r.defaults, i, s)),
                    (r.currentSlide = r.options.initialSlide),
                    (r.originalSettings = r.options),
                    void 0 !== document.mozHidden
                        ? ((r.hidden = "mozHidden"), (r.visibilityChange = "mozvisibilitychange"))
                        : void 0 !== document.webkitHidden && ((r.hidden = "webkitHidden"), (r.visibilityChange = "webkitvisibilitychange")),
                    (r.autoPlay = $.proxy(r.autoPlay, r)),
                    (r.autoPlayClear = $.proxy(r.autoPlayClear, r)),
                    (r.autoPlayIterator = $.proxy(r.autoPlayIterator, r)),
                    (r.changeSlide = $.proxy(r.changeSlide, r)),
                    (r.clickHandler = $.proxy(r.clickHandler, r)),
                    (r.selectHandler = $.proxy(r.selectHandler, r)),
                    (r.setPosition = $.proxy(r.setPosition, r)),
                    (r.swipeHandler = $.proxy(r.swipeHandler, r)),
                    (r.dragHandler = $.proxy(r.dragHandler, r)),
                    (r.keyHandler = $.proxy(r.keyHandler, r)),
                    (r.instanceUid = t++),
                    (r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                    r.registerBreakpoints(),
                    r.init(!0);
            }).prototype.activateADA = function () {
                this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" });
            }),
            (e.prototype.addSlide = e.prototype.slickAdd = function (t, e, i) {
                var s = this;
                if ("boolean" == typeof e) (i = e), (e = null);
                else if (e < 0 || e >= s.slideCount) return !1;
                s.unload(),
                    "number" == typeof e
                        ? 0 === e && 0 === s.$slides.length
                            ? $(t).appendTo(s.$slideTrack)
                            : i
                            ? $(t).insertBefore(s.$slides.eq(e))
                            : $(t).insertAfter(s.$slides.eq(e))
                        : !0 === i
                        ? $(t).prependTo(s.$slideTrack)
                        : $(t).appendTo(s.$slideTrack),
                    (s.$slides = s.$slideTrack.children(this.options.slide)),
                    s.$slideTrack.children(this.options.slide).detach(),
                    s.$slideTrack.append(s.$slides),
                    s.$slides.each(function (t, e) {
                        $(e).attr("data-slick-index", t);
                    }),
                    (s.$slidesCache = s.$slides),
                    s.reinit();
            }),
            (e.prototype.animateHeight = function () {
                var t = this;
                if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                    var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                    t.$list.animate({ height: e }, t.options.speed);
                }
            }),
            (e.prototype.animateSlide = function (t, e) {
                var i = {},
                    s = this;
                s.animateHeight(),
                    !0 === s.options.rtl && !1 === s.options.vertical && (t = -t),
                    !1 === s.transformsEnabled
                        ? !1 === s.options.vertical
                            ? s.$slideTrack.animate({ left: t }, s.options.speed, s.options.easing, e)
                            : s.$slideTrack.animate({ top: t }, s.options.speed, s.options.easing, e)
                        : !1 === s.cssTransitions
                        ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
                          $({ animStart: s.currentLeft }).animate(
                              { animStart: t },
                              {
                                  duration: s.options.speed,
                                  easing: s.options.easing,
                                  step: function (t) {
                                      (t = Math.ceil(t)), !1 === s.options.vertical ? ((i[s.animType] = "translate(" + t + "px, 0px)"), s.$slideTrack.css(i)) : ((i[s.animType] = "translate(0px," + t + "px)"), s.$slideTrack.css(i));
                                  },
                                  complete: function () {
                                      e && e.call();
                                  },
                              }
                          ))
                        : (s.applyTransition(),
                          (t = Math.ceil(t)),
                          !1 === s.options.vertical ? (i[s.animType] = "translate3d(" + t + "px, 0px, 0px)") : (i[s.animType] = "translate3d(0px," + t + "px, 0px)"),
                          s.$slideTrack.css(i),
                          e &&
                              setTimeout(function () {
                                  s.disableTransition(), e.call();
                              }, s.options.speed));
            }),
            (e.prototype.getNavTarget = function () {
                var t = this.options.asNavFor;
                return t && null !== t && (t = $(t).not(this.$slider)), t;
            }),
            (e.prototype.asNavFor = function (t) {
                var e = this.getNavTarget();
                null !== e &&
                    "object" == typeof e &&
                    e.each(function () {
                        var e = $(this).slick("getSlick");
                        e.unslicked || e.slideHandler(t, !0);
                    });
            }),
            (e.prototype.applyTransition = function (t) {
                var e = this,
                    i = {};
                !1 === e.options.fade ? (i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase) : (i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase),
                    !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i);
            }),
            (e.prototype.autoPlay = function () {
                var t = this;
                t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed));
            }),
            (e.prototype.autoPlayClear = function () {
                this.autoPlayTimer && clearInterval(this.autoPlayTimer);
            }),
            (e.prototype.autoPlayIterator = function () {
                var t = this,
                    e = t.currentSlide + t.options.slidesToScroll;
                t.paused ||
                    t.interrupted ||
                    t.focussed ||
                    (!1 === t.options.infinite &&
                        (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? (t.direction = 0) : 0 === t.direction && ((e = t.currentSlide - t.options.slidesToScroll), t.currentSlide - 1 == 0 && (t.direction = 1))),
                    t.slideHandler(e));
            }),
            (e.prototype.buildArrows = function () {
                var t = this;
                !0 === t.options.arrows &&
                    ((t.$prevArrow = $(t.options.prevArrow).addClass("slick-arrow")),
                    (t.$nextArrow = $(t.options.nextArrow).addClass("slick-arrow")),
                    t.slideCount > t.options.slidesToShow
                        ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                          t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows),
                          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows),
                          !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"))
                        : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }));
            }),
            (e.prototype.buildDots = function () {
                var t,
                    e,
                    i = this;
                if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
                    for (i.$slider.addClass("slick-dotted"), e = $("<ul />").addClass(i.options.dotsClass), t = 0; t <= i.getDotCount(); t += 1) e.append($("<li />").append(i.options.customPaging.call(this, i, t)));
                    (i.$dots = e.appendTo(i.options.appendDots)), i.$dots.find("li").first().addClass("slick-active");
                }
            }),
            (e.prototype.buildOut = function () {
                var t = this;
                (t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide")),
                    (t.slideCount = t.$slides.length),
                    t.$slides.each(function (t, e) {
                        $(e)
                            .attr("data-slick-index", t)
                            .data("originalStyling", $(e).attr("style") || "");
                    }),
                    t.$slider.addClass("slick-slider"),
                    (t.$slideTrack = 0 === t.slideCount ? $('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent()),
                    (t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent()),
                    t.$slideTrack.css("opacity", 0),
                    (!0 !== t.options.centerMode && !0 !== t.options.swipeToSlide) || (t.options.slidesToScroll = 1),
                    $("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"),
                    t.setupInfinite(),
                    t.buildArrows(),
                    t.buildDots(),
                    t.updateDots(),
                    t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
                    !0 === t.options.draggable && t.$list.addClass("draggable");
            }),
            (e.prototype.buildRows = function () {
                var t,
                    e,
                    i,
                    s,
                    r,
                    a,
                    n,
                    o = this;
                if (((s = document.createDocumentFragment()), (a = o.$slider.children()), o.options.rows > 0)) {
                    for (n = o.options.slidesPerRow * o.options.rows, r = Math.ceil(a.length / n), t = 0; t < r; t++) {
                        var l = document.createElement("div");
                        for (e = 0; e < o.options.rows; e++) {
                            var h = document.createElement("div");
                            for (i = 0; i < o.options.slidesPerRow; i++) {
                                var p = t * n + (e * o.options.slidesPerRow + i);
                                a.get(p) && h.appendChild(a.get(p));
                            }
                            l.appendChild(h);
                        }
                        s.appendChild(l);
                    }
                    o.$slider.empty().append(s),
                        o.$slider
                            .children()
                            .children()
                            .children()
                            .css({ width: 100 / o.options.slidesPerRow + "%", display: "inline-block" });
                }
            }),
            (e.prototype.checkResponsive = function (t, e) {
                var i,
                    s,
                    r,
                    a = this,
                    n = !1,
                    o = a.$slider.width(),
                    l = window.innerWidth || $(window).width();
                if (("window" === a.respondTo ? (r = l) : "slider" === a.respondTo ? (r = o) : "min" === a.respondTo && (r = Math.min(l, o)), a.options.responsive && a.options.responsive.length && null !== a.options.responsive)) {
                    for (i in ((s = null), a.breakpoints)) a.breakpoints.hasOwnProperty(i) && (!1 === a.originalSettings.mobileFirst ? r < a.breakpoints[i] && (s = a.breakpoints[i]) : r > a.breakpoints[i] && (s = a.breakpoints[i]));
                    null !== s
                        ? null !== a.activeBreakpoint
                            ? (s !== a.activeBreakpoint || e) &&
                              ((a.activeBreakpoint = s),
                              "unslick" === a.breakpointSettings[s] ? a.unslick(s) : ((a.options = $.extend({}, a.originalSettings, a.breakpointSettings[s])), !0 === t && (a.currentSlide = a.options.initialSlide), a.refresh(t)),
                              (n = s))
                            : ((a.activeBreakpoint = s),
                              "unslick" === a.breakpointSettings[s] ? a.unslick(s) : ((a.options = $.extend({}, a.originalSettings, a.breakpointSettings[s])), !0 === t && (a.currentSlide = a.options.initialSlide), a.refresh(t)),
                              (n = s))
                        : null !== a.activeBreakpoint && ((a.activeBreakpoint = null), (a.options = a.originalSettings), !0 === t && (a.currentSlide = a.options.initialSlide), a.refresh(t), (n = s)),
                        t || !1 === n || a.$slider.trigger("breakpoint", [a, n]);
                }
            }),
            (e.prototype.changeSlide = function (t, e) {
                var i,
                    s,
                    r = this,
                    a = $(t.currentTarget);
                switch ((a.is("a") && t.preventDefault(), a.is("li") || (a = a.closest("li")), (i = r.slideCount % r.options.slidesToScroll != 0 ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll), t.data.message)) {
                    case "previous":
                        (s = 0 === i ? r.options.slidesToScroll : r.options.slidesToShow - i), r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, e);
                        break;
                    case "next":
                        (s = 0 === i ? r.options.slidesToScroll : i), r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, e);
                        break;
                    case "index":
                        var n = 0 === t.data.index ? 0 : t.data.index || a.index() * r.options.slidesToScroll;
                        r.slideHandler(r.checkNavigable(n), !1, e), a.children().trigger("focus");
                        break;
                    default:
                        return;
                }
            }),
            (e.prototype.checkNavigable = function (t) {
                var e, i;
                if (((i = 0), t > (e = this.getNavigableIndexes())[e.length - 1])) t = e[e.length - 1];
                else
                    for (var s in e) {
                        if (t < e[s]) {
                            t = i;
                            break;
                        }
                        i = e[s];
                    }
                return t;
            }),
            (e.prototype.cleanUpEvents = function () {
                var t = this;
                t.options.dots &&
                    null !== t.$dots &&
                    ($("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", $.proxy(t.interrupt, t, !0)).off("mouseleave.slick", $.proxy(t.interrupt, t, !1)),
                    !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler)),
                    t.$slider.off("focus.slick blur.slick"),
                    !0 === t.options.arrows &&
                        t.slideCount > t.options.slidesToShow &&
                        (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide),
                        t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide),
                        !0 === t.options.accessibility && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))),
                    t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
                    t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
                    t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
                    t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
                    t.$list.off("click.slick", t.clickHandler),
                    $(document).off(t.visibilityChange, t.visibility),
                    t.cleanUpSlideEvents(),
                    !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler),
                    !0 === t.options.focusOnSelect && $(t.$slideTrack).children().off("click.slick", t.selectHandler),
                    $(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange),
                    $(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
                    $("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault),
                    $(window).off("load.slick.slick-" + t.instanceUid, t.setPosition);
            }),
            (e.prototype.cleanUpSlideEvents = function () {
                var t = this;
                t.$list.off("mouseenter.slick", $.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", $.proxy(t.interrupt, t, !1));
            }),
            (e.prototype.cleanUpRows = function () {
                var t,
                    e = this;
                e.options.rows > 0 && ((t = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(t));
            }),
            (e.prototype.clickHandler = function (t) {
                !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
            }),
            (e.prototype.destroy = function (t) {
                var e = this;
                e.autoPlayClear(),
                    (e.touchObject = {}),
                    e.cleanUpEvents(),
                    $(".slick-cloned", e.$slider).detach(),
                    e.$dots && e.$dots.remove(),
                    e.$prevArrow &&
                        e.$prevArrow.length &&
                        (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()),
                    e.$nextArrow &&
                        e.$nextArrow.length &&
                        (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove()),
                    e.$slides &&
                        (e.$slides
                            .removeClass("slick-slide slick-active slick-center slick-visible slick-current")
                            .removeAttr("aria-hidden")
                            .removeAttr("data-slick-index")
                            .each(function () {
                                $(this).attr("style", $(this).data("originalStyling"));
                            }),
                        e.$slideTrack.children(this.options.slide).detach(),
                        e.$slideTrack.detach(),
                        e.$list.detach(),
                        e.$slider.append(e.$slides)),
                    e.cleanUpRows(),
                    e.$slider.removeClass("slick-slider"),
                    e.$slider.removeClass("slick-initialized"),
                    e.$slider.removeClass("slick-dotted"),
                    (e.unslicked = !0),
                    t || e.$slider.trigger("destroy", [e]);
            }),
            (e.prototype.disableTransition = function (t) {
                var e = this,
                    i = {};
                (i[e.transitionType] = ""), !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i);
            }),
            (e.prototype.fadeSlide = function (t, e) {
                var i = this;
                !1 === i.cssTransitions
                    ? (i.$slides.eq(t).css({ zIndex: i.options.zIndex }), i.$slides.eq(t).animate({ opacity: 1 }, i.options.speed, i.options.easing, e))
                    : (i.applyTransition(t),
                      i.$slides.eq(t).css({ opacity: 1, zIndex: i.options.zIndex }),
                      e &&
                          setTimeout(function () {
                              i.disableTransition(t), e.call();
                          }, i.options.speed));
            }),
            (e.prototype.fadeSlideOut = function (t) {
                var e = this;
                !1 === e.cssTransitions ? e.$slides.eq(t).animate({ opacity: 0, zIndex: e.options.zIndex - 2 }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
            }),
            (e.prototype.filterSlides = e.prototype.slickFilter = function (t) {
                var e = this;
                null !== t && ((e.$slidesCache = e.$slides), e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit());
            }),
            (e.prototype.focusHandler = function () {
                var t = this;
                t.$slider
                    .off("focus.slick blur.slick")
                    .on("focus.slick", "*", function (e) {
                        var i = $(this);
                        setTimeout(function () {
                            t.options.pauseOnFocus && i.is(":focus") && ((t.focussed = !0), t.autoPlay());
                        }, 0);
                    })
                    .on("blur.slick", "*", function (e) {
                        $(this);
                        t.options.pauseOnFocus && ((t.focussed = !1), t.autoPlay());
                    });
            }),
            (e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
                return this.currentSlide;
            }),
            (e.prototype.getDotCount = function () {
                var t = this,
                    e = 0,
                    i = 0,
                    s = 0;
                if (!0 === t.options.infinite)
                    if (t.slideCount <= t.options.slidesToShow) ++s;
                    else for (; e < t.slideCount; ) ++s, (e = i + t.options.slidesToScroll), (i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow);
                else if (!0 === t.options.centerMode) s = t.slideCount;
                else if (t.options.asNavFor) for (; e < t.slideCount; ) ++s, (e = i + t.options.slidesToScroll), (i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow);
                else s = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
                return s - 1;
            }),
            (e.prototype.getLeft = function (t) {
                var e,
                    i,
                    s,
                    r,
                    a = this,
                    n = 0;
                return (
                    (a.slideOffset = 0),
                    (i = a.$slides.first().outerHeight(!0)),
                    !0 === a.options.infinite
                        ? (a.slideCount > a.options.slidesToShow &&
                              ((a.slideOffset = a.slideWidth * a.options.slidesToShow * -1),
                              (r = -1),
                              !0 === a.options.vertical && !0 === a.options.centerMode && (2 === a.options.slidesToShow ? (r = -1.5) : 1 === a.options.slidesToShow && (r = -2)),
                              (n = i * a.options.slidesToShow * r)),
                          a.slideCount % a.options.slidesToScroll != 0 &&
                              t + a.options.slidesToScroll > a.slideCount &&
                              a.slideCount > a.options.slidesToShow &&
                              (t > a.slideCount
                                  ? ((a.slideOffset = (a.options.slidesToShow - (t - a.slideCount)) * a.slideWidth * -1), (n = (a.options.slidesToShow - (t - a.slideCount)) * i * -1))
                                  : ((a.slideOffset = (a.slideCount % a.options.slidesToScroll) * a.slideWidth * -1), (n = (a.slideCount % a.options.slidesToScroll) * i * -1))))
                        : t + a.options.slidesToShow > a.slideCount && ((a.slideOffset = (t + a.options.slidesToShow - a.slideCount) * a.slideWidth), (n = (t + a.options.slidesToShow - a.slideCount) * i)),
                    a.slideCount <= a.options.slidesToShow && ((a.slideOffset = 0), (n = 0)),
                    !0 === a.options.centerMode && a.slideCount <= a.options.slidesToShow
                        ? (a.slideOffset = (a.slideWidth * Math.floor(a.options.slidesToShow)) / 2 - (a.slideWidth * a.slideCount) / 2)
                        : !0 === a.options.centerMode && !0 === a.options.infinite
                        ? (a.slideOffset += a.slideWidth * Math.floor(a.options.slidesToShow / 2) - a.slideWidth)
                        : !0 === a.options.centerMode && ((a.slideOffset = 0), (a.slideOffset += a.slideWidth * Math.floor(a.options.slidesToShow / 2))),
                    (e = !1 === a.options.vertical ? t * a.slideWidth * -1 + a.slideOffset : t * i * -1 + n),
                    !0 === a.options.variableWidth &&
                        ((s = a.slideCount <= a.options.slidesToShow || !1 === a.options.infinite ? a.$slideTrack.children(".slick-slide").eq(t) : a.$slideTrack.children(".slick-slide").eq(t + a.options.slidesToShow)),
                        (e = !0 === a.options.rtl ? (s[0] ? -1 * (a.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0) : s[0] ? -1 * s[0].offsetLeft : 0),
                        !0 === a.options.centerMode &&
                            ((s = a.slideCount <= a.options.slidesToShow || !1 === a.options.infinite ? a.$slideTrack.children(".slick-slide").eq(t) : a.$slideTrack.children(".slick-slide").eq(t + a.options.slidesToShow + 1)),
                            (e = !0 === a.options.rtl ? (s[0] ? -1 * (a.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0) : s[0] ? -1 * s[0].offsetLeft : 0),
                            (e += (a.$list.width() - s.outerWidth()) / 2))),
                    e
                );
            }),
            (e.prototype.getOption = e.prototype.slickGetOption = function (t) {
                return this.options[t];
            }),
            (e.prototype.getNavigableIndexes = function () {
                var t,
                    e = this,
                    i = 0,
                    s = 0,
                    r = [];
                for (!1 === e.options.infinite ? (t = e.slideCount) : ((i = -1 * e.options.slidesToScroll), (s = -1 * e.options.slidesToScroll), (t = 2 * e.slideCount)); i < t; )
                    r.push(i), (i = s + e.options.slidesToScroll), (s += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow);
                return r;
            }),
            (e.prototype.getSlick = function () {
                return this;
            }),
            (e.prototype.getSlideCount = function () {
                var t,
                    e,
                    i,
                    s = this;
                return (
                    (i = !0 === s.options.centerMode ? Math.floor(s.$list.width() / 2) : 0),
                    (e = -1 * s.swipeLeft + i),
                    !0 === s.options.swipeToSlide
                        ? (s.$slideTrack.find(".slick-slide").each(function (i, r) {
                              var a, n;
                              if (((a = $(r).outerWidth()), (n = r.offsetLeft), !0 !== s.options.centerMode && (n += a / 2), e < n + a)) return (t = r), !1;
                          }),
                          Math.abs($(t).attr("data-slick-index") - s.currentSlide) || 1)
                        : s.options.slidesToScroll
                );
            }),
            (e.prototype.goTo = e.prototype.slickGoTo = function (t, e) {
                this.changeSlide({ data: { message: "index", index: parseInt(t) } }, e);
            }),
            (e.prototype.init = function (t) {
                var e = this;
                $(e.$slider).hasClass("slick-initialized") ||
                    ($(e.$slider).addClass("slick-initialized"), e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots(), e.checkResponsive(!0), e.focusHandler()),
                    t && e.$slider.trigger("init", [e]),
                    !0 === e.options.accessibility && e.initADA(),
                    e.options.autoplay && ((e.paused = !1), e.autoPlay());
            }),
            (e.prototype.initADA = function () {
                var t = this,
                    e = Math.ceil(t.slideCount / t.options.slidesToShow),
                    i = t.getNavigableIndexes().filter(function (e) {
                        return e >= 0 && e < t.slideCount;
                    });
                t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }),
                    null !== t.$dots &&
                        (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function (e) {
                            var s = i.indexOf(e);
                            if (($(this).attr({ role: "tabpanel", id: "slick-slide" + t.instanceUid + e, tabindex: -1 }), -1 !== s)) {
                                var r = "slick-slide-control" + t.instanceUid + s;
                                $("#" + r).length && $(this).attr({ "aria-describedby": r });
                            }
                        }),
                        t.$dots
                            .attr("role", "tablist")
                            .find("li")
                            .each(function (s) {
                                var r = i[s];
                                $(this).attr({ role: "presentation" }),
                                    $(this)
                                        .find("button")
                                        .first()
                                        .attr({ role: "tab", id: "slick-slide-control" + t.instanceUid + s, "aria-controls": "slick-slide" + t.instanceUid + r, "aria-label": s + 1 + " of " + e, "aria-selected": null, tabindex: "-1" });
                            })
                            .eq(t.currentSlide)
                            .find("button")
                            .attr({ "aria-selected": "true", tabindex: "0" })
                            .end());
                for (var s = t.currentSlide, r = s + t.options.slidesToShow; s < r; s++) t.options.focusOnChange ? t.$slides.eq(s).attr({ tabindex: "0" }) : t.$slides.eq(s).removeAttr("tabindex");
                t.activateADA();
            }),
            (e.prototype.initArrowEvents = function () {
                var t = this;
                !0 === t.options.arrows &&
                    t.slideCount > t.options.slidesToShow &&
                    (t.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, t.changeSlide),
                    t.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, t.changeSlide),
                    !0 === t.options.accessibility && (t.$prevArrow.on("keydown.slick", t.keyHandler), t.$nextArrow.on("keydown.slick", t.keyHandler)));
            }),
            (e.prototype.initDotEvents = function () {
                var t = this;
                !0 === t.options.dots && t.slideCount > t.options.slidesToShow && ($("li", t.$dots).on("click.slick", { message: "index" }, t.changeSlide), !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler)),
                    !0 === t.options.dots &&
                        !0 === t.options.pauseOnDotsHover &&
                        t.slideCount > t.options.slidesToShow &&
                        $("li", t.$dots).on("mouseenter.slick", $.proxy(t.interrupt, t, !0)).on("mouseleave.slick", $.proxy(t.interrupt, t, !1));
            }),
            (e.prototype.initSlideEvents = function () {
                var t = this;
                t.options.pauseOnHover && (t.$list.on("mouseenter.slick", $.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", $.proxy(t.interrupt, t, !1)));
            }),
            (e.prototype.initializeEvents = function () {
                var t = this;
                t.initArrowEvents(),
                    t.initDotEvents(),
                    t.initSlideEvents(),
                    t.$list.on("touchstart.slick mousedown.slick", { action: "start" }, t.swipeHandler),
                    t.$list.on("touchmove.slick mousemove.slick", { action: "move" }, t.swipeHandler),
                    t.$list.on("touchend.slick mouseup.slick", { action: "end" }, t.swipeHandler),
                    t.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, t.swipeHandler),
                    t.$list.on("click.slick", t.clickHandler),
                    $(document).on(t.visibilityChange, $.proxy(t.visibility, t)),
                    !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler),
                    !0 === t.options.focusOnSelect && $(t.$slideTrack).children().on("click.slick", t.selectHandler),
                    $(window).on("orientationchange.slick.slick-" + t.instanceUid, $.proxy(t.orientationChange, t)),
                    $(window).on("resize.slick.slick-" + t.instanceUid, $.proxy(t.resize, t)),
                    $("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault),
                    $(window).on("load.slick.slick-" + t.instanceUid, t.setPosition),
                    $(t.setPosition);
            }),
            (e.prototype.initUI = function () {
                var t = this;
                !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show();
            }),
            (e.prototype.keyHandler = function (t) {
                var e = this;
                t.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                    (37 === t.keyCode && !0 === e.options.accessibility
                        ? e.changeSlide({ data: { message: !0 === e.options.rtl ? "next" : "previous" } })
                        : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({ data: { message: !0 === e.options.rtl ? "previous" : "next" } }));
            }),
            (e.prototype.lazyLoad = function () {
                var t,
                    e,
                    i,
                    s = this;
                function r(t) {
                    $("img[data-lazy]", t).each(function () {
                        var t = $(this),
                            e = $(this).attr("data-lazy"),
                            i = $(this).attr("data-srcset"),
                            r = $(this).attr("data-sizes") || s.$slider.attr("data-sizes"),
                            a = document.createElement("img");
                        (a.onload = function () {
                            t.animate({ opacity: 0 }, 100, function () {
                                i && (t.attr("srcset", i), r && t.attr("sizes", r)),
                                    t.attr("src", e).animate({ opacity: 1 }, 200, function () {
                                        t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                                    }),
                                    s.$slider.trigger("lazyLoaded", [s, t, e]);
                            });
                        }),
                            (a.onerror = function () {
                                t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, t, e]);
                            }),
                            (a.src = e);
                    });
                }
                if (
                    (!0 === s.options.centerMode
                        ? !0 === s.options.infinite
                            ? (i = (e = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2)
                            : ((e = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1))), (i = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide))
                        : ((e = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide), (i = Math.ceil(e + s.options.slidesToShow)), !0 === s.options.fade && (e > 0 && e--, i <= s.slideCount && i++)),
                    (t = s.$slider.find(".slick-slide").slice(e, i)),
                    "anticipated" === s.options.lazyLoad)
                )
                    for (var a = e - 1, n = i, o = s.$slider.find(".slick-slide"), l = 0; l < s.options.slidesToScroll; l++) a < 0 && (a = s.slideCount - 1), (t = (t = t.add(o.eq(a))).add(o.eq(n))), a--, n++;
                r(t),
                    s.slideCount <= s.options.slidesToShow
                        ? r(s.$slider.find(".slick-slide"))
                        : s.currentSlide >= s.slideCount - s.options.slidesToShow
                        ? r(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow))
                        : 0 === s.currentSlide && r(s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow));
            }),
            (e.prototype.loadSlider = function () {
                var t = this;
                t.setPosition(), t.$slideTrack.css({ opacity: 1 }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad();
            }),
            (e.prototype.next = e.prototype.slickNext = function () {
                this.changeSlide({ data: { message: "next" } });
            }),
            (e.prototype.orientationChange = function () {
                this.checkResponsive(), this.setPosition();
            }),
            (e.prototype.pause = e.prototype.slickPause = function () {
                this.autoPlayClear(), (this.paused = !0);
            }),
            (e.prototype.play = e.prototype.slickPlay = function () {
                var t = this;
                t.autoPlay(), (t.options.autoplay = !0), (t.paused = !1), (t.focussed = !1), (t.interrupted = !1);
            }),
            (e.prototype.postSlide = function (t) {
                var e = this;
                e.unslicked ||
                    (e.$slider.trigger("afterChange", [e, t]),
                    (e.animating = !1),
                    e.slideCount > e.options.slidesToShow && e.setPosition(),
                    (e.swipeLeft = null),
                    e.options.autoplay && e.autoPlay(),
                    !0 === e.options.accessibility && (e.initADA(), e.options.focusOnChange && $(e.$slides.get(e.currentSlide)).attr("tabindex", 0).focus()));
            }),
            (e.prototype.prev = e.prototype.slickPrev = function () {
                this.changeSlide({ data: { message: "previous" } });
            }),
            (e.prototype.preventDefault = function (t) {
                t.preventDefault();
            }),
            (e.prototype.progressiveLazyLoad = function (t) {
                t = t || 1;
                var e,
                    i,
                    s,
                    r,
                    a,
                    n = this,
                    o = $("img[data-lazy]", n.$slider);
                o.length
                    ? ((e = o.first()),
                      (i = e.attr("data-lazy")),
                      (s = e.attr("data-srcset")),
                      (r = e.attr("data-sizes") || n.$slider.attr("data-sizes")),
                      ((a = document.createElement("img")).onload = function () {
                          s && (e.attr("srcset", s), r && e.attr("sizes", r)),
                              e.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
                              !0 === n.options.adaptiveHeight && n.setPosition(),
                              n.$slider.trigger("lazyLoaded", [n, e, i]),
                              n.progressiveLazyLoad();
                      }),
                      (a.onerror = function () {
                          t < 3
                              ? setTimeout(function () {
                                    n.progressiveLazyLoad(t + 1);
                                }, 500)
                              : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, i]), n.progressiveLazyLoad());
                      }),
                      (a.src = i))
                    : n.$slider.trigger("allImagesLoaded", [n]);
            }),
            (e.prototype.refresh = function (t) {
                var e,
                    i,
                    s = this;
                (i = s.slideCount - s.options.slidesToShow),
                    !s.options.infinite && s.currentSlide > i && (s.currentSlide = i),
                    s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
                    (e = s.currentSlide),
                    s.destroy(!0),
                    $.extend(s, s.initials, { currentSlide: e }),
                    s.init(),
                    t || s.changeSlide({ data: { message: "index", index: e } }, !1);
            }),
            (e.prototype.registerBreakpoints = function () {
                var t,
                    e,
                    i,
                    s = this,
                    r = s.options.responsive || null;
                if ("array" === $.type(r) && r.length) {
                    for (t in ((s.respondTo = s.options.respondTo || "window"), r))
                        if (((i = s.breakpoints.length - 1), r.hasOwnProperty(t))) {
                            for (e = r[t].breakpoint; i >= 0; ) s.breakpoints[i] && s.breakpoints[i] === e && s.breakpoints.splice(i, 1), i--;
                            s.breakpoints.push(e), (s.breakpointSettings[e] = r[t].settings);
                        }
                    s.breakpoints.sort(function (t, e) {
                        return s.options.mobileFirst ? t - e : e - t;
                    });
                }
            }),
            (e.prototype.reinit = function () {
                var t = this;
                (t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide")),
                    (t.slideCount = t.$slides.length),
                    t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
                    t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
                    t.registerBreakpoints(),
                    t.setProps(),
                    t.setupInfinite(),
                    t.buildArrows(),
                    t.updateArrows(),
                    t.initArrowEvents(),
                    t.buildDots(),
                    t.updateDots(),
                    t.initDotEvents(),
                    t.cleanUpSlideEvents(),
                    t.initSlideEvents(),
                    t.checkResponsive(!1, !0),
                    !0 === t.options.focusOnSelect && $(t.$slideTrack).children().on("click.slick", t.selectHandler),
                    t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
                    t.setPosition(),
                    t.focusHandler(),
                    (t.paused = !t.options.autoplay),
                    t.autoPlay(),
                    t.$slider.trigger("reInit", [t]);
            }),
            (e.prototype.resize = function () {
                var t = this;
                $(window).width() !== t.windowWidth &&
                    (clearTimeout(t.windowDelay),
                    (t.windowDelay = window.setTimeout(function () {
                        (t.windowWidth = $(window).width()), t.checkResponsive(), t.unslicked || t.setPosition();
                    }, 50)));
            }),
            (e.prototype.removeSlide = e.prototype.slickRemove = function (t, e, i) {
                var s = this;
                if (((t = "boolean" == typeof t ? (!0 === (e = t) ? 0 : s.slideCount - 1) : !0 === e ? --t : t), s.slideCount < 1 || t < 0 || t > s.slideCount - 1)) return !1;
                s.unload(),
                    !0 === i ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(t).remove(),
                    (s.$slides = s.$slideTrack.children(this.options.slide)),
                    s.$slideTrack.children(this.options.slide).detach(),
                    s.$slideTrack.append(s.$slides),
                    (s.$slidesCache = s.$slides),
                    s.reinit();
            }),
            (e.prototype.setCSS = function (t) {
                var e,
                    i,
                    s = this,
                    r = {};
                !0 === s.options.rtl && (t = -t),
                    (e = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px"),
                    (i = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px"),
                    (r[s.positionProp] = t),
                    !1 === s.transformsEnabled
                        ? s.$slideTrack.css(r)
                        : ((r = {}), !1 === s.cssTransitions ? ((r[s.animType] = "translate(" + e + ", " + i + ")"), s.$slideTrack.css(r)) : ((r[s.animType] = "translate3d(" + e + ", " + i + ", 0px)"), s.$slideTrack.css(r)));
            }),
            (e.prototype.setDimensions = function () {
                var t = this;
                !1 === t.options.vertical
                    ? !0 === t.options.centerMode && t.$list.css({ padding: "0px " + t.options.centerPadding })
                    : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({ padding: t.options.centerPadding + " 0px" })),
                    (t.listWidth = t.$list.width()),
                    (t.listHeight = t.$list.height()),
                    !1 === t.options.vertical && !1 === t.options.variableWidth
                        ? ((t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow)), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length)))
                        : !0 === t.options.variableWidth
                        ? t.$slideTrack.width(5e3 * t.slideCount)
                        : ((t.slideWidth = Math.ceil(t.listWidth)), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
                var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
                !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e);
            }),
            (e.prototype.setFade = function () {
                var t,
                    e = this;
                e.$slides.each(function (i, s) {
                    (t = e.slideWidth * i * -1),
                        !0 === e.options.rtl ? $(s).css({ position: "relative", right: t, top: 0, zIndex: e.options.zIndex - 2, opacity: 0 }) : $(s).css({ position: "relative", left: t, top: 0, zIndex: e.options.zIndex - 2, opacity: 0 });
                }),
                    e.$slides.eq(e.currentSlide).css({ zIndex: e.options.zIndex - 1, opacity: 1 });
            }),
            (e.prototype.setHeight = function () {
                var t = this;
                if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                    var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                    t.$list.css("height", e);
                }
            }),
            (e.prototype.setOption = e.prototype.slickSetOption = function () {
                var t,
                    e,
                    i,
                    s,
                    r,
                    a = this,
                    n = !1;
                if (
                    ("object" === $.type(arguments[0])
                        ? ((i = arguments[0]), (n = arguments[1]), (r = "multiple"))
                        : "string" === $.type(arguments[0]) &&
                          ((i = arguments[0]), (s = arguments[1]), (n = arguments[2]), "responsive" === arguments[0] && "array" === $.type(arguments[1]) ? (r = "responsive") : void 0 !== arguments[1] && (r = "single")),
                    "single" === r)
                )
                    a.options[i] = s;
                else if ("multiple" === r)
                    $.each(i, function (t, e) {
                        a.options[t] = e;
                    });
                else if ("responsive" === r)
                    for (e in s)
                        if ("array" !== $.type(a.options.responsive)) a.options.responsive = [s[e]];
                        else {
                            for (t = a.options.responsive.length - 1; t >= 0; ) a.options.responsive[t].breakpoint === s[e].breakpoint && a.options.responsive.splice(t, 1), t--;
                            a.options.responsive.push(s[e]);
                        }
                n && (a.unload(), a.reinit());
            }),
            (e.prototype.setPosition = function () {
                var t = this;
                t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t]);
            }),
            (e.prototype.setProps = function () {
                var t = this,
                    e = document.body.style;
                (t.positionProp = !0 === t.options.vertical ? "top" : "left"),
                    "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"),
                    (void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition) || (!0 === t.options.useCSS && (t.cssTransitions = !0)),
                    t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : (t.options.zIndex = t.defaults.zIndex)),
                    void 0 !== e.OTransform && ((t.animType = "OTransform"), (t.transformType = "-o-transform"), (t.transitionType = "OTransition"), void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)),
                    void 0 !== e.MozTransform &&
                        ((t.animType = "MozTransform"), (t.transformType = "-moz-transform"), (t.transitionType = "MozTransition"), void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)),
                    void 0 !== e.webkitTransform &&
                        ((t.animType = "webkitTransform"), (t.transformType = "-webkit-transform"), (t.transitionType = "webkitTransition"), void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)),
                    void 0 !== e.msTransform && ((t.animType = "msTransform"), (t.transformType = "-ms-transform"), (t.transitionType = "msTransition"), void 0 === e.msTransform && (t.animType = !1)),
                    void 0 !== e.transform && !1 !== t.animType && ((t.animType = "transform"), (t.transformType = "transform"), (t.transitionType = "transition")),
                    (t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType);
            }),
            (e.prototype.setSlideClasses = function (t) {
                var e,
                    i,
                    s,
                    r,
                    a = this;
                if (((i = a.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true")), a.$slides.eq(t).addClass("slick-current"), !0 === a.options.centerMode)) {
                    var n = a.options.slidesToShow % 2 == 0 ? 1 : 0;
                    (e = Math.floor(a.options.slidesToShow / 2)),
                        !0 === a.options.infinite &&
                            (t >= e && t <= a.slideCount - 1 - e
                                ? a.$slides
                                      .slice(t - e + n, t + e + 1)
                                      .addClass("slick-active")
                                      .attr("aria-hidden", "false")
                                : ((s = a.options.slidesToShow + t),
                                  i
                                      .slice(s - e + 1 + n, s + e + 2)
                                      .addClass("slick-active")
                                      .attr("aria-hidden", "false")),
                            0 === t ? i.eq(i.length - 1 - a.options.slidesToShow).addClass("slick-center") : t === a.slideCount - 1 && i.eq(a.options.slidesToShow).addClass("slick-center")),
                        a.$slides.eq(t).addClass("slick-center");
                } else
                    t >= 0 && t <= a.slideCount - a.options.slidesToShow
                        ? a.$slides
                              .slice(t, t + a.options.slidesToShow)
                              .addClass("slick-active")
                              .attr("aria-hidden", "false")
                        : i.length <= a.options.slidesToShow
                        ? i.addClass("slick-active").attr("aria-hidden", "false")
                        : ((r = a.slideCount % a.options.slidesToShow),
                          (s = !0 === a.options.infinite ? a.options.slidesToShow + t : t),
                          a.options.slidesToShow == a.options.slidesToScroll && a.slideCount - t < a.options.slidesToShow
                              ? i
                                    .slice(s - (a.options.slidesToShow - r), s + r)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false")
                              : i
                                    .slice(s, s + a.options.slidesToShow)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false"));
                ("ondemand" !== a.options.lazyLoad && "anticipated" !== a.options.lazyLoad) || a.lazyLoad();
            }),
            (e.prototype.setupInfinite = function () {
                var t,
                    e,
                    i,
                    s = this;
                if ((!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && ((e = null), s.slideCount > s.options.slidesToShow))) {
                    for (i = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, t = s.slideCount; t > s.slideCount - i; t -= 1)
                        (e = t - 1),
                            $(s.$slides[e])
                                .clone(!0)
                                .attr("id", "")
                                .attr("data-slick-index", e - s.slideCount)
                                .prependTo(s.$slideTrack)
                                .addClass("slick-cloned");
                    for (t = 0; t < i + s.slideCount; t += 1)
                        (e = t),
                            $(s.$slides[e])
                                .clone(!0)
                                .attr("id", "")
                                .attr("data-slick-index", e + s.slideCount)
                                .appendTo(s.$slideTrack)
                                .addClass("slick-cloned");
                    s.$slideTrack
                        .find(".slick-cloned")
                        .find("[id]")
                        .each(function () {
                            $(this).attr("id", "");
                        });
                }
            }),
            (e.prototype.interrupt = function (t) {
                t || this.autoPlay(), (this.interrupted = t);
            }),
            (e.prototype.selectHandler = function (t) {
                var e = this,
                    i = $(t.target).is(".slick-slide") ? $(t.target) : $(t.target).parents(".slick-slide"),
                    s = parseInt(i.attr("data-slick-index"));
                s || (s = 0), e.slideCount <= e.options.slidesToShow ? e.slideHandler(s, !1, !0) : e.slideHandler(s);
            }),
            (e.prototype.slideHandler = function (t, e, i) {
                var s,
                    r,
                    a,
                    n,
                    o,
                    l,
                    h = this;
                if (((e = e || !1), !((!0 === h.animating && !0 === h.options.waitForAnimate) || (!0 === h.options.fade && h.currentSlide === t))))
                    if (
                        (!1 === e && h.asNavFor(t),
                        (s = t),
                        (o = h.getLeft(s)),
                        (n = h.getLeft(h.currentSlide)),
                        (h.currentLeft = null === h.swipeLeft ? n : h.swipeLeft),
                        !1 === h.options.infinite && !1 === h.options.centerMode && (t < 0 || t > h.getDotCount() * h.options.slidesToScroll))
                    )
                        !1 === h.options.fade &&
                            ((s = h.currentSlide),
                            !0 !== i && h.slideCount > h.options.slidesToShow
                                ? h.animateSlide(n, function () {
                                      h.postSlide(s);
                                  })
                                : h.postSlide(s));
                    else if (!1 === h.options.infinite && !0 === h.options.centerMode && (t < 0 || t > h.slideCount - h.options.slidesToScroll))
                        !1 === h.options.fade &&
                            ((s = h.currentSlide),
                            !0 !== i && h.slideCount > h.options.slidesToShow
                                ? h.animateSlide(n, function () {
                                      h.postSlide(s);
                                  })
                                : h.postSlide(s));
                    else {
                        if (
                            (h.options.autoplay && clearInterval(h.autoPlayTimer),
                            (r =
                                s < 0
                                    ? h.slideCount % h.options.slidesToScroll != 0
                                        ? h.slideCount - (h.slideCount % h.options.slidesToScroll)
                                        : h.slideCount + s
                                    : s >= h.slideCount
                                    ? h.slideCount % h.options.slidesToScroll != 0
                                        ? 0
                                        : s - h.slideCount
                                    : s),
                            (h.animating = !0),
                            h.$slider.trigger("beforeChange", [h, h.currentSlide, r]),
                            (a = h.currentSlide),
                            (h.currentSlide = r),
                            h.setSlideClasses(h.currentSlide),
                            h.options.asNavFor && (l = (l = h.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(h.currentSlide),
                            h.updateDots(),
                            h.updateArrows(),
                            !0 === h.options.fade)
                        )
                            return (
                                !0 !== i
                                    ? (h.fadeSlideOut(a),
                                      h.fadeSlide(r, function () {
                                          h.postSlide(r);
                                      }))
                                    : h.postSlide(r),
                                void h.animateHeight()
                            );
                        !0 !== i && h.slideCount > h.options.slidesToShow
                            ? h.animateSlide(o, function () {
                                  h.postSlide(r);
                              })
                            : h.postSlide(r);
                    }
            }),
            (e.prototype.startLoad = function () {
                var t = this;
                !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()),
                    !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(),
                    t.$slider.addClass("slick-loading");
            }),
            (e.prototype.swipeDirection = function () {
                var t,
                    e,
                    i,
                    s,
                    r = this;
                return (
                    (t = r.touchObject.startX - r.touchObject.curX),
                    (e = r.touchObject.startY - r.touchObject.curY),
                    (i = Math.atan2(e, t)),
                    (s = Math.round((180 * i) / Math.PI)) < 0 && (s = 360 - Math.abs(s)),
                    (s <= 45 && s >= 0) || (s <= 360 && s >= 315)
                        ? !1 === r.options.rtl
                            ? "left"
                            : "right"
                        : s >= 135 && s <= 225
                        ? !1 === r.options.rtl
                            ? "right"
                            : "left"
                        : !0 === r.options.verticalSwiping
                        ? s >= 35 && s <= 135
                            ? "down"
                            : "up"
                        : "vertical"
                );
            }),
            (e.prototype.swipeEnd = function (t) {
                var e,
                    i,
                    s = this;
                if (((s.dragging = !1), (s.swiping = !1), s.scrolling)) return (s.scrolling = !1), !1;
                if (((s.interrupted = !1), (s.shouldClick = !(s.touchObject.swipeLength > 10)), void 0 === s.touchObject.curX)) return !1;
                if ((!0 === s.touchObject.edgeHit && s.$slider.trigger("edge", [s, s.swipeDirection()]), s.touchObject.swipeLength >= s.touchObject.minSwipe)) {
                    switch ((i = s.swipeDirection())) {
                        case "left":
                        case "down":
                            (e = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide + s.getSlideCount()) : s.currentSlide + s.getSlideCount()), (s.currentDirection = 0);
                            break;
                        case "right":
                        case "up":
                            (e = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide - s.getSlideCount()) : s.currentSlide - s.getSlideCount()), (s.currentDirection = 1);
                    }
                    "vertical" != i && (s.slideHandler(e), (s.touchObject = {}), s.$slider.trigger("swipe", [s, i]));
                } else s.touchObject.startX !== s.touchObject.curX && (s.slideHandler(s.currentSlide), (s.touchObject = {}));
            }),
            (e.prototype.swipeHandler = function (t) {
                var e = this;
                if (!(!1 === e.options.swipe || ("ontouchend" in document && !1 === e.options.swipe) || (!1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))))
                    switch (
                        ((e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1),
                        (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
                        !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
                        t.data.action)
                    ) {
                        case "start":
                            e.swipeStart(t);
                            break;
                        case "move":
                            e.swipeMove(t);
                            break;
                        case "end":
                            e.swipeEnd(t);
                    }
            }),
            (e.prototype.swipeMove = function (t) {
                var e,
                    i,
                    s,
                    r,
                    a,
                    n,
                    o = this;
                return (
                    (a = void 0 !== t.originalEvent ? t.originalEvent.touches : null),
                    !(!o.dragging || o.scrolling || (a && 1 !== a.length)) &&
                        ((e = o.getLeft(o.currentSlide)),
                        (o.touchObject.curX = void 0 !== a ? a[0].pageX : t.clientX),
                        (o.touchObject.curY = void 0 !== a ? a[0].pageY : t.clientY),
                        (o.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(o.touchObject.curX - o.touchObject.startX, 2)))),
                        (n = Math.round(Math.sqrt(Math.pow(o.touchObject.curY - o.touchObject.startY, 2)))),
                        !o.options.verticalSwiping && !o.swiping && n > 4
                            ? ((o.scrolling = !0), !1)
                            : (!0 === o.options.verticalSwiping && (o.touchObject.swipeLength = n),
                              (i = o.swipeDirection()),
                              void 0 !== t.originalEvent && o.touchObject.swipeLength > 4 && ((o.swiping = !0), t.preventDefault()),
                              (r = (!1 === o.options.rtl ? 1 : -1) * (o.touchObject.curX > o.touchObject.startX ? 1 : -1)),
                              !0 === o.options.verticalSwiping && (r = o.touchObject.curY > o.touchObject.startY ? 1 : -1),
                              (s = o.touchObject.swipeLength),
                              (o.touchObject.edgeHit = !1),
                              !1 === o.options.infinite &&
                                  ((0 === o.currentSlide && "right" === i) || (o.currentSlide >= o.getDotCount() && "left" === i)) &&
                                  ((s = o.touchObject.swipeLength * o.options.edgeFriction), (o.touchObject.edgeHit = !0)),
                              !1 === o.options.vertical ? (o.swipeLeft = e + s * r) : (o.swipeLeft = e + s * (o.$list.height() / o.listWidth) * r),
                              !0 === o.options.verticalSwiping && (o.swipeLeft = e + s * r),
                              !0 !== o.options.fade && !1 !== o.options.touchMove && (!0 === o.animating ? ((o.swipeLeft = null), !1) : void o.setCSS(o.swipeLeft))))
                );
            }),
            (e.prototype.swipeStart = function (t) {
                var e,
                    i = this;
                if (((i.interrupted = !0), 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow)) return (i.touchObject = {}), !1;
                void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]),
                    (i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX),
                    (i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY),
                    (i.dragging = !0);
            }),
            (e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
                var t = this;
                null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit());
            }),
            (e.prototype.unload = function () {
                var t = this;
                $(".slick-cloned", t.$slider).remove(),
                    t.$dots && t.$dots.remove(),
                    t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(),
                    t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(),
                    t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
            }),
            (e.prototype.unslick = function (t) {
                var e = this;
                e.$slider.trigger("unslick", [e, t]), e.destroy();
            }),
            (e.prototype.updateArrows = function () {
                var t = this;
                Math.floor(t.options.slidesToShow / 2),
                    !0 === t.options.arrows &&
                        t.slideCount > t.options.slidesToShow &&
                        !t.options.infinite &&
                        (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                        t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                        0 === t.currentSlide
                            ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                            : ((t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode) || (t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode)) &&
                              (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
            }),
            (e.prototype.updateDots = function () {
                var t = this;
                null !== t.$dots &&
                    (t.$dots.find("li").removeClass("slick-active").end(),
                    t.$dots
                        .find("li")
                        .eq(Math.floor(t.currentSlide / t.options.slidesToScroll))
                        .addClass("slick-active"));
            }),
            (e.prototype.visibility = function () {
                var t = this;
                t.options.autoplay && (document[t.hidden] ? (t.interrupted = !0) : (t.interrupted = !1));
            }),
            ($.fn.slick = function () {
                var t,
                    i,
                    s = this,
                    r = arguments[0],
                    a = Array.prototype.slice.call(arguments, 1),
                    n = s.length;
                for (t = 0; t < n; t++) if (("object" == typeof r || void 0 === r ? (s[t].slick = new e(s[t], r)) : (i = s[t].slick[r].apply(s[t].slick, a)), void 0 !== i)) return i;
                return s;
            });
    }); /*! npm.im/object-fit-images 3.2.3 */
var objectFitImages = (function () {
        var t = "bfred-it:object-fit-images",
            e = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g,
            i = "undefined" == typeof Image ? { style: { "object-position": 1 } } : new Image(),
            s = "object-fit" in i.style,
            r = "object-position" in i.style,
            a = "background-size" in i.style,
            n = "string" == typeof i.currentSrc,
            o = i.getAttribute,
            l = i.setAttribute,
            h = !1;
        function p(t, e, i) {
            var s = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + (e || 1) + "' height='" + (i || 0) + "'%3E%3C/svg%3E";
            o.call(t, "src") !== s && l.call(t, "src", s);
        }
        function d(t, e) {
            t.naturalWidth ? e(t) : setTimeout(d, 100, t, e);
        }
        function c(i) {
            var r = (function (t) {
                    for (var i, s = getComputedStyle(t).fontFamily, r = {}; null !== (i = e.exec(s)); ) r[i[1]] = i[2];
                    return r;
                })(i),
                a = i[t];
            if (((r["object-fit"] = r["object-fit"] || "fill"), !a.img)) {
                if ("fill" === r["object-fit"]) return;
                if (!a.skipTest && s && !r["object-position"]) return;
            }
            if (!a.img) {
                (a.img = new Image(i.width, i.height)),
                    (a.img.srcset = o.call(i, "data-ofi-srcset") || i.srcset),
                    (a.img.src = o.call(i, "data-ofi-src") || i.src),
                    l.call(i, "data-ofi-src", i.src),
                    i.srcset && l.call(i, "data-ofi-srcset", i.srcset),
                    p(i, i.naturalWidth || i.width, i.naturalHeight || i.height),
                    i.srcset && (i.srcset = "");
                try {
                    !(function (e) {
                        var i = {
                            get: function (i) {
                                return e[t].img[i || "src"];
                            },
                            set: function (i, s) {
                                return (e[t].img[s || "src"] = i), l.call(e, "data-ofi-" + s, i), c(e), i;
                            },
                        };
                        Object.defineProperty(e, "src", i),
                            Object.defineProperty(e, "currentSrc", {
                                get: function () {
                                    return i.get("currentSrc");
                                },
                            }),
                            Object.defineProperty(e, "srcset", {
                                get: function () {
                                    return i.get("srcset");
                                },
                                set: function (t) {
                                    return i.set(t, "srcset");
                                },
                            });
                    })(i);
                } catch (t) {
                    window.console && console.warn("https://bit.ly/ofi-old-browser");
                }
            }
            !(function (t) {
                if (t.srcset && !n && window.picturefill) {
                    var e = window.picturefill._;
                    (t[e.ns] && t[e.ns].evaled) || e.fillImg(t, { reselect: !0 }), t[e.ns].curSrc || ((t[e.ns].supported = !1), e.fillImg(t, { reselect: !0 })), (t.currentSrc = t[e.ns].curSrc || t.src);
                }
            })(a.img),
                (i.style.backgroundImage = 'url("' + (a.img.currentSrc || a.img.src).replace(/"/g, '\\"') + '")'),
                (i.style.backgroundPosition = r["object-position"] || "center"),
                (i.style.backgroundRepeat = "no-repeat"),
                (i.style.backgroundOrigin = "content-box"),
                /scale-down/.test(r["object-fit"])
                    ? d(a.img, function () {
                          a.img.naturalWidth > i.width || a.img.naturalHeight > i.height ? (i.style.backgroundSize = "contain") : (i.style.backgroundSize = "auto");
                      })
                    : (i.style.backgroundSize = r["object-fit"].replace("none", "auto").replace("fill", "100% 100%")),
                d(a.img, function (t) {
                    p(i, t.naturalWidth, t.naturalHeight);
                });
        }
        function f(e, i) {
            var s = !h && !e;
            if (((i = i || {}), (e = e || "img"), (r && !i.skipTest) || !a)) return !1;
            "img" === e ? (e = document.getElementsByTagName("img")) : "string" == typeof e ? (e = document.querySelectorAll(e)) : "length" in e || (e = [e]);
            for (var n = 0; n < e.length; n++) (e[n][t] = e[n][t] || { skipTest: i.skipTest }), c(e[n]);
            s &&
                (document.body.addEventListener(
                    "load",
                    function (t) {
                        "IMG" === t.target.tagName && f(t.target, { skipTest: i.skipTest });
                    },
                    !0
                ),
                (h = !0),
                (e = "img")),
                i.watchMQ && window.addEventListener("resize", f.bind(null, e, { skipTest: i.skipTest }));
        }
        return (
            (f.supportsObjectFit = s),
            (f.supportsObjectPosition = r),
            (function () {
                function e(e, i) {
                    return e[t] && e[t].img && ("src" === i || "srcset" === i) ? e[t].img : e;
                }
                r ||
                    ((HTMLImageElement.prototype.getAttribute = function (t) {
                        return o.call(e(this, t), t);
                    }),
                    (HTMLImageElement.prototype.setAttribute = function (t, i) {
                        return l.call(e(this, t), t, String(i));
                    }));
            })(),
            f
        );
    })(),
    a,
    b,
    lazyInitThrottle;
!(function () {
    if ("undefined" != typeof window) {
        var t = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
            e = !!t && parseInt(t[1], 10) >= 16;
        if ("objectFit" in document.documentElement.style == !1 || e) {
            var i = function (t) {
                    var e = t.parentNode;
                    !(function (t) {
                        var e = window.getComputedStyle(t, null),
                            i = e.getPropertyValue("position"),
                            s = e.getPropertyValue("overflow"),
                            r = e.getPropertyValue("display");
                        (i && "static" !== i) || (t.style.position = "relative"),
                            "hidden" !== s && (t.style.overflow = "hidden"),
                            (r && "inline" !== r) || (t.style.display = "block"),
                            0 === t.clientHeight && (t.style.height = "100%"),
                            -1 === t.className.indexOf("object-fit-polyfill") && (t.className = t.className + " object-fit-polyfill");
                    })(e),
                        (function (t) {
                            var e = window.getComputedStyle(t, null),
                                i = {
                                    "max-width": "none",
                                    "max-height": "none",
                                    "min-width": "0px",
                                    "min-height": "0px",
                                    top: "auto",
                                    right: "auto",
                                    bottom: "auto",
                                    left: "auto",
                                    "margin-top": "0px",
                                    "margin-right": "0px",
                                    "margin-bottom": "0px",
                                    "margin-left": "0px",
                                };
                            for (var s in i) e.getPropertyValue(s) !== i[s] && (t.style[s] = i[s]);
                        })(t),
                        (t.style.position = "absolute"),
                        (t.style.height = "100%"),
                        (t.style.width = "auto"),
                        t.clientWidth > e.clientWidth
                            ? ((t.style.top = "0"), (t.style.marginTop = "0"), (t.style.left = "50%"), (t.style.marginLeft = t.clientWidth / -2 + "px"))
                            : ((t.style.width = "100%"), (t.style.height = "auto"), (t.style.left = "0"), (t.style.marginLeft = "0"), (t.style.top = "50%"), (t.style.marginTop = t.clientHeight / -2 + "px"));
                },
                s = function (t) {
                    if (void 0 === t) t = document.querySelectorAll("[data-object-fit]");
                    else if (t && t.nodeName) t = [t];
                    else {
                        if ("object" != typeof t || !t.length || !t[0].nodeName) return !1;
                        t = t;
                    }
                    for (var s = 0; s < t.length; s++)
                        if (t[s].nodeName) {
                            var r = t[s].nodeName.toLowerCase();
                            "img" !== r || e
                                ? "video" === r &&
                                  (t[s].readyState > 0
                                      ? i(t[s])
                                      : t[s].addEventListener("loadedmetadata", function () {
                                            i(this);
                                        }))
                                : t[s].complete
                                ? i(t[s])
                                : t[s].addEventListener("load", function () {
                                      i(this);
                                  });
                        }
                    return !0;
                };
            document.addEventListener("DOMContentLoaded", function () {
                s();
            }),
                window.addEventListener("resize", function () {
                    s();
                }),
                (window.objectFitPolyfill = s);
        } else
            window.objectFitPolyfill = function () {
                return !1;
            };
    }
})(),
    (function () {
        var t = "undefined" != typeof window && void 0 !== window.document ? window.document : {},
            e = "undefined" != typeof module && module.exports,
            i = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
            s = (function () {
                for (
                    var e,
                        i = [
                            ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                            ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                            ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                            ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                            ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"],
                        ],
                        s = 0,
                        r = i.length,
                        a = {};
                    s < r;
                    s++
                )
                    if ((e = i[s]) && e[1] in t) {
                        for (s = 0; s < e.length; s++) a[i[0][s]] = e[s];
                        return a;
                    }
                return !1;
            })(),
            r = { change: s.fullscreenchange, error: s.fullscreenerror },
            a = {
                request: function (e) {
                    var r = s.requestFullscreen;
                    (e = e || t.documentElement), / Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent) ? e[r]() : e[r](i ? Element.ALLOW_KEYBOARD_INPUT : {});
                },
                exit: function () {
                    t[s.exitFullscreen]();
                },
                toggle: function (t) {
                    this.isFullscreen ? this.exit() : this.request(t);
                },
                onchange: function (t) {
                    this.on("change", t);
                },
                onerror: function (t) {
                    this.on("error", t);
                },
                on: function (e, i) {
                    var s = r[e];
                    s && t.addEventListener(s, i, !1);
                },
                off: function (e, i) {
                    var s = r[e];
                    s && t.removeEventListener(s, i, !1);
                },
                raw: s,
            };
        s
            ? (Object.defineProperties(a, {
                  isFullscreen: {
                      get: function () {
                          return Boolean(t[s.fullscreenElement]);
                      },
                  },
                  element: {
                      enumerable: !0,
                      get: function () {
                          return t[s.fullscreenElement];
                      },
                  },
                  enabled: {
                      enumerable: !0,
                      get: function () {
                          return Boolean(t[s.fullscreenEnabled]);
                      },
                  },
              }),
              e ? (module.exports = a) : (window.screenfull = a))
            : e
            ? (module.exports = !1)
            : (window.screenfull = !1);
    })(),
    (function (t) {
        var e = function (e, i) {
            (this.el = t(e)),
                (this.options = t.extend({}, t.fn.typed.defaults, i)),
                (this.isInput = this.el.is("input")),
                (this.attr = this.options.attr),
                (this.showCursor = !this.isInput && this.options.showCursor),
                (this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text()),
                (this.contentType = this.options.contentType),
                (this.typeSpeed = this.options.typeSpeed),
                (this.startDelay = this.options.startDelay),
                (this.backSpeed = this.options.backSpeed),
                (this.backDelay = this.options.backDelay),
                (this.strings = this.options.strings),
                (this.strPos = 0),
                (this.arrayPos = 0),
                (this.stopNum = 0),
                (this.loop = this.options.loop),
                (this.loopCount = this.options.loopCount),
                (this.curLoop = 0),
                (this.stop = !1),
                (this.cursorChar = this.options.cursorChar),
                (this.shuffle = this.options.shuffle),
                (this.sequence = []),
                this.build();
        };
        (e.prototype = {
            constructor: e,
            init: function () {
                var t = this;
                t.timeout = setTimeout(function () {
                    for (var e = 0; e < t.strings.length; ++e) t.sequence[e] = e;
                    t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos);
                }, t.startDelay);
            },
            build: function () {
                !0 === this.showCursor && ((this.cursor = t('<span class="typed-cursor">' + this.cursorChar + "</span>")), this.el.after(this.cursor)), this.init();
            },
            typewrite: function (t, e) {
                if (!0 !== this.stop) {
                    var i = Math.round(70 * Math.random()) + this.typeSpeed,
                        s = this;
                    s.timeout = setTimeout(function () {
                        var i = 0,
                            r = t.substr(e);
                        if ("^" === r.charAt(0)) {
                            var a = 1;
                            /^\^\d+/.test(r) && ((a += (r = /\d+/.exec(r)[0]).length), (i = parseInt(r))), (t = t.substring(0, e) + t.substring(e + a));
                        }
                        if ("html" === s.contentType) {
                            var n = t.substr(e).charAt(0);
                            if ("<" === n || "&" === n) {
                                var o;
                                for (o = "<" === n ? ">" : ";"; t.substr(e).charAt(0) !== o; ) t.substr(e).charAt(0), e++;
                                e++, o;
                            }
                        }
                        s.timeout = setTimeout(function () {
                            if (e === t.length) {
                                if ((s.options.onStringTyped(s.arrayPos), s.arrayPos === s.strings.length - 1 && (s.options.callback(), s.curLoop++, !1 === s.loop || s.curLoop === s.loopCount))) return;
                                s.timeout = setTimeout(function () {
                                    s.backspace(t, e);
                                }, s.backDelay);
                            } else {
                                0 === e && s.options.preStringTyped(s.arrayPos);
                                var i = t.substr(0, e + 1);
                                s.attr ? s.el.attr(s.attr, i) : s.isInput ? s.el.val(i) : "html" === s.contentType ? s.el.html(i) : s.el.text(i), e++, s.typewrite(t, e);
                            }
                        }, i);
                    }, i);
                }
            },
            backspace: function (t, e) {
                if (!0 !== this.stop) {
                    var i = Math.round(70 * Math.random()) + this.backSpeed,
                        s = this;
                    s.timeout = setTimeout(function () {
                        if ("html" === s.contentType && ">" === t.substr(e).charAt(0)) {
                            for (; "<" !== t.substr(e).charAt(0); ) t.substr(e).charAt(0), e--;
                            e--, "<";
                        }
                        var i = t.substr(0, e);
                        s.attr ? s.el.attr(s.attr, i) : s.isInput ? s.el.val(i) : "html" === s.contentType ? s.el.html(i) : s.el.text(i),
                            e > s.stopNum
                                ? (e--, s.backspace(t, e))
                                : e <= s.stopNum && (s.arrayPos++, s.arrayPos === s.strings.length ? ((s.arrayPos = 0), s.shuffle && (s.sequence = s.shuffleArray(s.sequence)), s.init()) : s.typewrite(s.strings[s.sequence[s.arrayPos]], e));
                    }, i);
                }
            },
            shuffleArray: function (t) {
                var e,
                    i,
                    s = t.length;
                if (s) for (; --s; ) (e = t[(i = Math.floor(Math.random() * (s + 1)))]), (t[i] = t[s]), (t[s] = e);
                return t;
            },
            reset: function () {
                clearInterval(this.timeout);
                var t = this.el.attr("id");
                this.el.after('<span id="' + t + '"/>'), this.el.remove(), void 0 !== this.cursor && this.cursor.remove(), this.options.resetCallback();
            },
        }),
            (t.fn.typed = function (i) {
                return this.each(function () {
                    var s = t(this),
                        r = s.data("typed"),
                        a = "object" == typeof i && i;
                    r || s.data("typed", (r = new e(this, a))), "string" == typeof i && r[i]();
                });
            }),
            (t.fn.typed.defaults = {
                strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
                typeSpeed: 0,
                startDelay: 0,
                backSpeed: 0,
                shuffle: !1,
                backDelay: 500,
                loop: !1,
                loopCount: !1,
                showCursor: !0,
                cursorChar: "|",
                attr: null,
                contentType: "html",
                callback: function () {},
                preStringTyped: function () {},
                onStringTyped: function () {},
                resetCallback: function () {},
            });
    })(window.jQuery),
    "undefined" != typeof navigator &&
        ((a = window || {}),
        (b = function (window) {
            var svgNS = "http://www.w3.org/2000/svg",
                locationHref = "",
                initialDefaultFrame = -999999,
                subframeEnabled = !0,
                expressionsPlugin,
                isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
                cachedColors = {},
                bm_rounder = Math.round,
                bm_rnd,
                bm_pow = Math.pow,
                bm_sqrt = Math.sqrt,
                bm_abs = Math.abs,
                bm_floor = Math.floor,
                bm_max = Math.max,
                bm_min = Math.min,
                blitter = 10,
                BMMath = {};
            function ProjectInterface() {
                return {};
            }
            !(function () {
                var t,
                    e = [
                        "abs",
                        "acos",
                        "acosh",
                        "asin",
                        "asinh",
                        "atan",
                        "atanh",
                        "atan2",
                        "ceil",
                        "cbrt",
                        "expm1",
                        "clz32",
                        "cos",
                        "cosh",
                        "exp",
                        "floor",
                        "fround",
                        "hypot",
                        "imul",
                        "log",
                        "log1p",
                        "log2",
                        "log10",
                        "max",
                        "min",
                        "pow",
                        "random",
                        "round",
                        "sign",
                        "sin",
                        "sinh",
                        "sqrt",
                        "tan",
                        "tanh",
                        "trunc",
                        "E",
                        "LN10",
                        "LN2",
                        "LOG10E",
                        "LOG2E",
                        "PI",
                        "SQRT1_2",
                        "SQRT2",
                    ],
                    i = e.length;
                for (t = 0; t < i; t += 1) BMMath[e[t]] = Math[e[t]];
            })(),
                (BMMath.random = Math.random),
                (BMMath.abs = function (t) {
                    if ("object" == typeof t && t.length) {
                        var e,
                            i = createSizedArray(t.length),
                            s = t.length;
                        for (e = 0; e < s; e += 1) i[e] = Math.abs(t[e]);
                        return i;
                    }
                    return Math.abs(t);
                });
            var defaultCurveSegments = 150,
                degToRads = Math.PI / 180,
                roundCorner = 0.5519;
            function roundValues(t) {
                bm_rnd = t
                    ? Math.round
                    : function (t) {
                          return t;
                      };
            }
            function styleDiv(t) {
                (t.style.position = "absolute"),
                    (t.style.top = 0),
                    (t.style.left = 0),
                    (t.style.display = "block"),
                    (t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0"),
                    (t.style.backfaceVisibility = t.style.webkitBackfaceVisibility = "visible"),
                    (t.style.transformStyle = t.style.webkitTransformStyle = t.style.mozTransformStyle = "preserve-3d");
            }
            function BMEnterFrameEvent(t, e, i, s) {
                (this.type = t), (this.currentTime = e), (this.totalTime = i), (this.direction = s < 0 ? -1 : 1);
            }
            function BMCompleteEvent(t, e) {
                (this.type = t), (this.direction = e < 0 ? -1 : 1);
            }
            function BMCompleteLoopEvent(t, e, i, s) {
                (this.type = t), (this.currentLoop = i), (this.totalLoops = e), (this.direction = s < 0 ? -1 : 1);
            }
            function BMSegmentStartEvent(t, e, i) {
                (this.type = t), (this.firstFrame = e), (this.totalFrames = i);
            }
            function BMDestroyEvent(t, e) {
                (this.type = t), (this.target = e);
            }
            roundValues(!1);
            var createElementID =
                    ((D = 0),
                    function () {
                        return "__lottie_element_" + ++D;
                    }),
                D;
            function HSVtoRGB(t, e, i) {
                var s, r, a, n, o, l, h, p;
                switch (((l = i * (1 - e)), (h = i * (1 - (o = 6 * t - (n = Math.floor(6 * t))) * e)), (p = i * (1 - (1 - o) * e)), n % 6)) {
                    case 0:
                        (s = i), (r = p), (a = l);
                        break;
                    case 1:
                        (s = h), (r = i), (a = l);
                        break;
                    case 2:
                        (s = l), (r = i), (a = p);
                        break;
                    case 3:
                        (s = l), (r = h), (a = i);
                        break;
                    case 4:
                        (s = p), (r = l), (a = i);
                        break;
                    case 5:
                        (s = i), (r = l), (a = h);
                }
                return [s, r, a];
            }
            function RGBtoHSV(t, e, i) {
                var s,
                    r = Math.max(t, e, i),
                    a = Math.min(t, e, i),
                    n = r - a,
                    o = 0 === r ? 0 : n / r,
                    l = r / 255;
                switch (r) {
                    case a:
                        s = 0;
                        break;
                    case t:
                        (s = e - i + n * (e < i ? 6 : 0)), (s /= 6 * n);
                        break;
                    case e:
                        (s = i - t + 2 * n), (s /= 6 * n);
                        break;
                    case i:
                        (s = t - e + 4 * n), (s /= 6 * n);
                }
                return [s, o, l];
            }
            function addSaturationToRGB(t, e) {
                var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
                return (i[1] += e), 1 < i[1] ? (i[1] = 1) : i[1] <= 0 && (i[1] = 0), HSVtoRGB(i[0], i[1], i[2]);
            }
            function addBrightnessToRGB(t, e) {
                var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
                return (i[2] += e), 1 < i[2] ? (i[2] = 1) : i[2] < 0 && (i[2] = 0), HSVtoRGB(i[0], i[1], i[2]);
            }
            function addHueToRGB(t, e) {
                var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
                return (i[0] += e / 360), 1 < i[0] ? (i[0] -= 1) : i[0] < 0 && (i[0] += 1), HSVtoRGB(i[0], i[1], i[2]);
            }
            var rgbToHex = (function () {
                var t,
                    e,
                    i = [];
                for (t = 0; t < 256; t += 1) (e = t.toString(16)), (i[t] = 1 == e.length ? "0" + e : e);
                return function (t, e, s) {
                    return t < 0 && (t = 0), e < 0 && (e = 0), s < 0 && (s = 0), "#" + i[t] + i[e] + i[s];
                };
            })();
            function BaseEvent() {}
            BaseEvent.prototype = {
                triggerEvent: function (t, e) {
                    if (this._cbs[t]) for (var i = this._cbs[t].length, s = 0; s < i; s++) this._cbs[t][s](e);
                },
                addEventListener: function (t, e) {
                    return (
                        this._cbs[t] || (this._cbs[t] = []),
                        this._cbs[t].push(e),
                        function () {
                            this.removeEventListener(t, e);
                        }.bind(this)
                    );
                },
                removeEventListener: function (t, e) {
                    if (e) {
                        if (this._cbs[t]) {
                            for (var i = 0, s = this._cbs[t].length; i < s; ) this._cbs[t][i] === e && (this._cbs[t].splice(i, 1), (i -= 1), (s -= 1)), (i += 1);
                            this._cbs[t].length || (this._cbs[t] = null);
                        }
                    } else this._cbs[t] = null;
                },
            };
            var createTypedArray =
                "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array
                    ? function (t, e) {
                          return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : void 0;
                      }
                    : function (t, e) {
                          var i,
                              s = 0,
                              r = [];
                          switch (t) {
                              case "int16":
                              case "uint8c":
                                  i = 1;
                                  break;
                              default:
                                  i = 1.1;
                          }
                          for (s = 0; s < e; s += 1) r.push(i);
                          return r;
                      };
            function createSizedArray(t) {
                return Array.apply(null, { length: t });
            }
            function createNS(t) {
                return document.createElementNS(svgNS, t);
            }
            function createTag(t) {
                return document.createElement(t);
            }
            function DynamicPropertyContainer() {}
            DynamicPropertyContainer.prototype = {
                addDynamicProperty: function (t) {
                    -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), (this._isAnimated = !0));
                },
                iterateDynamicProperties: function () {
                    this._mdf = !1;
                    var t,
                        e = this.dynamicProperties.length;
                    for (t = 0; t < e; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0);
                },
                initDynamicPropertyContainer: function (t) {
                    (this.container = t), (this.dynamicProperties = []), (this._mdf = !1), (this._isAnimated = !1);
                },
            };
            var getBlendMode =
                    ((Ma = {
                        0: "source-over",
                        1: "multiply",
                        2: "screen",
                        3: "overlay",
                        4: "darken",
                        5: "lighten",
                        6: "color-dodge",
                        7: "color-burn",
                        8: "hard-light",
                        9: "soft-light",
                        10: "difference",
                        11: "exclusion",
                        12: "hue",
                        13: "saturation",
                        14: "color",
                        15: "luminosity",
                    }),
                    function (t) {
                        return Ma[t] || "";
                    }),
                Ma,
                Matrix = (function () {
                    var t = Math.cos,
                        e = Math.sin,
                        i = Math.tan,
                        s = Math.round;
                    function r() {
                        return (
                            (this.props[0] = 1),
                            (this.props[1] = 0),
                            (this.props[2] = 0),
                            (this.props[3] = 0),
                            (this.props[4] = 0),
                            (this.props[5] = 1),
                            (this.props[6] = 0),
                            (this.props[7] = 0),
                            (this.props[8] = 0),
                            (this.props[9] = 0),
                            (this.props[10] = 1),
                            (this.props[11] = 0),
                            (this.props[12] = 0),
                            (this.props[13] = 0),
                            (this.props[14] = 0),
                            (this.props[15] = 1),
                            this
                        );
                    }
                    function a(i) {
                        if (0 === i) return this;
                        var s = t(i),
                            r = e(i);
                        return this._t(s, -r, 0, 0, r, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                    }
                    function n(i) {
                        if (0 === i) return this;
                        var s = t(i),
                            r = e(i);
                        return this._t(1, 0, 0, 0, 0, s, -r, 0, 0, r, s, 0, 0, 0, 0, 1);
                    }
                    function o(i) {
                        if (0 === i) return this;
                        var s = t(i),
                            r = e(i);
                        return this._t(s, 0, r, 0, 0, 1, 0, 0, -r, 0, s, 0, 0, 0, 0, 1);
                    }
                    function l(i) {
                        if (0 === i) return this;
                        var s = t(i),
                            r = e(i);
                        return this._t(s, -r, 0, 0, r, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                    }
                    function h(t, e) {
                        return this._t(1, e, t, 1, 0, 0);
                    }
                    function p(t, e) {
                        return this.shear(i(t), i(e));
                    }
                    function d(s, r) {
                        var a = t(r),
                            n = e(r);
                        return this._t(a, n, 0, 0, -n, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, i(s), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(a, -n, 0, 0, n, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                    }
                    function c(t, e, i) {
                        return i || 0 === i || (i = 1), 1 === t && 1 === e && 1 === i ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1);
                    }
                    function f(t, e, i, s, r, a, n, o, l, h, p, d, c, f, u, m) {
                        return (
                            (this.props[0] = t),
                            (this.props[1] = e),
                            (this.props[2] = i),
                            (this.props[3] = s),
                            (this.props[4] = r),
                            (this.props[5] = a),
                            (this.props[6] = n),
                            (this.props[7] = o),
                            (this.props[8] = l),
                            (this.props[9] = h),
                            (this.props[10] = p),
                            (this.props[11] = d),
                            (this.props[12] = c),
                            (this.props[13] = f),
                            (this.props[14] = u),
                            (this.props[15] = m),
                            this
                        );
                    }
                    function u(t, e, i) {
                        return (i = i || 0), 0 !== t || 0 !== e || 0 !== i ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, i, 1) : this;
                    }
                    function m(t, e, i, s, r, a, n, o, l, h, p, d, c, f, u, m) {
                        var g = this.props;
                        if (1 === t && 0 === e && 0 === i && 0 === s && 0 === r && 1 === a && 0 === n && 0 === o && 0 === l && 0 === h && 1 === p && 0 === d)
                            return (g[12] = g[12] * t + g[15] * c), (g[13] = g[13] * a + g[15] * f), (g[14] = g[14] * p + g[15] * u), (g[15] = g[15] * m), (this._identityCalculated = !1), this;
                        var y = g[0],
                            v = g[1],
                            b = g[2],
                            w = g[3],
                            S = g[4],
                            k = g[5],
                            T = g[6],
                            x = g[7],
                            P = g[8],
                            A = g[9],
                            C = g[10],
                            E = g[11],
                            _ = g[12],
                            M = g[13],
                            D = g[14],
                            I = g[15];
                        return (
                            (g[0] = y * t + v * r + b * l + w * c),
                            (g[1] = y * e + v * a + b * h + w * f),
                            (g[2] = y * i + v * n + b * p + w * u),
                            (g[3] = y * s + v * o + b * d + w * m),
                            (g[4] = S * t + k * r + T * l + x * c),
                            (g[5] = S * e + k * a + T * h + x * f),
                            (g[6] = S * i + k * n + T * p + x * u),
                            (g[7] = S * s + k * o + T * d + x * m),
                            (g[8] = P * t + A * r + C * l + E * c),
                            (g[9] = P * e + A * a + C * h + E * f),
                            (g[10] = P * i + A * n + C * p + E * u),
                            (g[11] = P * s + A * o + C * d + E * m),
                            (g[12] = _ * t + M * r + D * l + I * c),
                            (g[13] = _ * e + M * a + D * h + I * f),
                            (g[14] = _ * i + M * n + D * p + I * u),
                            (g[15] = _ * s + M * o + D * d + I * m),
                            (this._identityCalculated = !1),
                            this
                        );
                    }
                    function g() {
                        return (
                            this._identityCalculated ||
                                ((this._identity = !(
                                    1 !== this.props[0] ||
                                    0 !== this.props[1] ||
                                    0 !== this.props[2] ||
                                    0 !== this.props[3] ||
                                    0 !== this.props[4] ||
                                    1 !== this.props[5] ||
                                    0 !== this.props[6] ||
                                    0 !== this.props[7] ||
                                    0 !== this.props[8] ||
                                    0 !== this.props[9] ||
                                    1 !== this.props[10] ||
                                    0 !== this.props[11] ||
                                    0 !== this.props[12] ||
                                    0 !== this.props[13] ||
                                    0 !== this.props[14] ||
                                    1 !== this.props[15]
                                )),
                                (this._identityCalculated = !0)),
                            this._identity
                        );
                    }
                    function y(t) {
                        for (var e = 0; e < 16; ) {
                            if (t.props[e] !== this.props[e]) return !1;
                            e += 1;
                        }
                        return !0;
                    }
                    function v(t) {
                        var e;
                        for (e = 0; e < 16; e += 1) t.props[e] = this.props[e];
                    }
                    function b(t) {
                        var e;
                        for (e = 0; e < 16; e += 1) this.props[e] = t[e];
                    }
                    function w(t, e, i) {
                        return {
                            x: t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12],
                            y: t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13],
                            z: t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14],
                        };
                    }
                    function S(t, e, i) {
                        return t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12];
                    }
                    function k(t, e, i) {
                        return t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13];
                    }
                    function T(t, e, i) {
                        return t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14];
                    }
                    function x(t) {
                        var e = this.props[0] * this.props[5] - this.props[1] * this.props[4],
                            i = this.props[5] / e,
                            s = -this.props[1] / e,
                            r = -this.props[4] / e,
                            a = this.props[0] / e,
                            n = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / e,
                            o = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / e;
                        return [t[0] * i + t[1] * r + n, t[0] * s + t[1] * a + o, 0];
                    }
                    function P(t) {
                        var e,
                            i = t.length,
                            s = [];
                        for (e = 0; e < i; e += 1) s[e] = x(t[e]);
                        return s;
                    }
                    function A(t, e, i) {
                        var s = createTypedArray("float32", 6);
                        if (this.isIdentity()) (s[0] = t[0]), (s[1] = t[1]), (s[2] = e[0]), (s[3] = e[1]), (s[4] = i[0]), (s[5] = i[1]);
                        else {
                            var r = this.props[0],
                                a = this.props[1],
                                n = this.props[4],
                                o = this.props[5],
                                l = this.props[12],
                                h = this.props[13];
                            (s[0] = t[0] * r + t[1] * n + l), (s[1] = t[0] * a + t[1] * o + h), (s[2] = e[0] * r + e[1] * n + l), (s[3] = e[0] * a + e[1] * o + h), (s[4] = i[0] * r + i[1] * n + l), (s[5] = i[0] * a + i[1] * o + h);
                        }
                        return s;
                    }
                    function C(t, e, i) {
                        return this.isIdentity()
                            ? [t, e, i]
                            : [
                                  t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12],
                                  t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13],
                                  t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14],
                              ];
                    }
                    function E(t, e) {
                        if (this.isIdentity()) return t + "," + e;
                        var i = this.props;
                        return Math.round(100 * (t * i[0] + e * i[4] + i[12])) / 100 + "," + Math.round(100 * (t * i[1] + e * i[5] + i[13])) / 100;
                    }
                    function _() {
                        for (var t = 0, e = this.props, i = "matrix3d("; t < 16; ) (i += s(1e4 * e[t]) / 1e4), (i += 15 === t ? ")" : ","), (t += 1);
                        return i;
                    }
                    function M(t) {
                        return (t < 1e-6 && 0 < t) || (-1e-6 < t && t < 0) ? s(1e4 * t) / 1e4 : t;
                    }
                    function D() {
                        var t = this.props;
                        return "matrix(" + M(t[0]) + "," + M(t[1]) + "," + M(t[4]) + "," + M(t[5]) + "," + M(t[12]) + "," + M(t[13]) + ")";
                    }
                    return function () {
                        (this.reset = r),
                            (this.rotate = a),
                            (this.rotateX = n),
                            (this.rotateY = o),
                            (this.rotateZ = l),
                            (this.skew = p),
                            (this.skewFromAxis = d),
                            (this.shear = h),
                            (this.scale = c),
                            (this.setTransform = f),
                            (this.translate = u),
                            (this.transform = m),
                            (this.applyToPoint = w),
                            (this.applyToX = S),
                            (this.applyToY = k),
                            (this.applyToZ = T),
                            (this.applyToPointArray = C),
                            (this.applyToTriplePoints = A),
                            (this.applyToPointStringified = E),
                            (this.toCSS = _),
                            (this.to2dCSS = D),
                            (this.clone = v),
                            (this.cloneFromProps = b),
                            (this.equals = y),
                            (this.inversePoints = P),
                            (this.inversePoint = x),
                            (this._t = this.transform),
                            (this.isIdentity = g),
                            (this._identity = !0),
                            (this._identityCalculated = !1),
                            (this.props = createTypedArray("float32", 16)),
                            this.reset();
                    };
                })();
            !(function (t, e) {
                var i,
                    s = this,
                    r = 256,
                    a = "random",
                    n = e.pow(r, 6),
                    o = e.pow(2, 52),
                    l = 2 * o,
                    h = 255;
                function p(t) {
                    var e,
                        i = t.length,
                        s = this,
                        a = 0,
                        n = (s.i = s.j = 0),
                        o = (s.S = []);
                    for (i || (t = [i++]); a < r; ) o[a] = a++;
                    for (a = 0; a < r; a++) (o[a] = o[(n = h & (n + t[a % i] + (e = o[a])))]), (o[n] = e);
                    s.g = function (t) {
                        for (var e, i = 0, a = s.i, n = s.j, o = s.S; t--; ) (e = o[(a = h & (a + 1))]), (i = i * r + o[h & ((o[a] = o[(n = h & (n + e))]) + (o[n] = e))]);
                        return (s.i = a), (s.j = n), i;
                    };
                }
                function d(t, e) {
                    return (e.i = t.i), (e.j = t.j), (e.S = t.S.slice()), e;
                }
                function c(t, e) {
                    for (var i, s = t + "", r = 0; r < s.length; ) e[h & r] = h & ((i ^= 19 * e[h & r]) + s.charCodeAt(r++));
                    return f(e);
                }
                function f(t) {
                    return String.fromCharCode.apply(0, t);
                }
                (e["seed" + a] = function (h, u, m) {
                    var g = [],
                        y = c(
                            (function t(e, i) {
                                var s,
                                    r = [],
                                    a = typeof e;
                                if (i && "object" == a)
                                    for (s in e)
                                        try {
                                            r.push(t(e[s], i - 1));
                                        } catch (t) {}
                                return r.length ? r : "string" == a ? e : e + "\0";
                            })(
                                (u = !0 === u ? { entropy: !0 } : u || {}).entropy
                                    ? [h, f(t)]
                                    : null === h
                                    ? (function () {
                                          try {
                                              i;
                                              var e = new Uint8Array(r);
                                              return (s.crypto || s.msCrypto).getRandomValues(e), f(e);
                                          } catch (e) {
                                              var a = s.navigator,
                                                  n = a && a.plugins;
                                              return [+new Date(), s, n, s.screen, f(t)];
                                          }
                                      })()
                                    : h,
                                3
                            ),
                            g
                        ),
                        v = new p(g),
                        b = function () {
                            for (var t = v.g(6), e = n, i = 0; t < o; ) (t = (t + i) * r), (e *= r), (i = v.g(1));
                            for (; l <= t; ) (t /= 2), (e /= 2), (i >>>= 1);
                            return (t + i) / e;
                        };
                    return (
                        (b.int32 = function () {
                            return 0 | v.g(4);
                        }),
                        (b.quick = function () {
                            return v.g(4) / 4294967296;
                        }),
                        (b.double = b),
                        c(f(v.S), t),
                        (
                            u.pass ||
                            m ||
                            function (t, i, s, r) {
                                return (
                                    r &&
                                        (r.S && d(r, v),
                                        (t.state = function () {
                                            return d(v, {});
                                        })),
                                    s ? ((e[a] = t), i) : t
                                );
                            }
                        )(b, y, "global" in u ? u.global : this == e, u.state)
                    );
                }),
                    c(e.random(), t);
            })([], BMMath);
            var BezierFactory = (function () {
                var t = {
                        getBezierEasing: function (t, i, s, r, a) {
                            var n = a || ("bez_" + t + "_" + i + "_" + s + "_" + r).replace(/\./g, "p");
                            if (e[n]) return e[n];
                            var o = new h([t, i, s, r]);
                            return (e[n] = o);
                        },
                    },
                    e = {},
                    i = 0.1,
                    s = "function" == typeof Float32Array;
                function r(t, e) {
                    return 1 - 3 * e + 3 * t;
                }
                function a(t, e) {
                    return 3 * e - 6 * t;
                }
                function n(t) {
                    return 3 * t;
                }
                function o(t, e, i) {
                    return ((r(e, i) * t + a(e, i)) * t + n(e)) * t;
                }
                function l(t, e, i) {
                    return 3 * r(e, i) * t * t + 2 * a(e, i) * t + n(e);
                }
                function h(t) {
                    (this._p = t), (this._mSampleValues = s ? new Float32Array(11) : new Array(11)), (this._precomputed = !1), (this.get = this.get.bind(this));
                }
                return (
                    (h.prototype = {
                        get: function (t) {
                            var e = this._p[0],
                                i = this._p[1],
                                s = this._p[2],
                                r = this._p[3];
                            return this._precomputed || this._precompute(), e === i && s === r ? t : 0 === t ? 0 : 1 === t ? 1 : o(this._getTForX(t), i, r);
                        },
                        _precompute: function () {
                            var t = this._p[0],
                                e = this._p[1],
                                i = this._p[2],
                                s = this._p[3];
                            (this._precomputed = !0), (t === e && i === s) || this._calcSampleValues();
                        },
                        _calcSampleValues: function () {
                            for (var t = this._p[0], e = this._p[2], s = 0; s < 11; ++s) this._mSampleValues[s] = o(s * i, t, e);
                        },
                        _getTForX: function (t) {
                            for (var e = this._p[0], s = this._p[2], r = this._mSampleValues, a = 0, n = 1; 10 !== n && r[n] <= t; ++n) a += i;
                            var h = a + ((t - r[--n]) / (r[n + 1] - r[n])) * i,
                                p = l(h, e, s);
                            return 0.001 <= p
                                ? (function (t, e, i, s) {
                                      for (var r = 0; r < 4; ++r) {
                                          var a = l(e, i, s);
                                          if (0 === a) return e;
                                          e -= (o(e, i, s) - t) / a;
                                      }
                                      return e;
                                  })(t, h, e, s)
                                : 0 === p
                                ? h
                                : (function (t, e, i, s, r) {
                                      for (var a, n, l = 0; 0 < (a = o((n = e + (i - e) / 2), s, r) - t) ? (i = n) : (e = n), 1e-7 < Math.abs(a) && ++l < 10; );
                                      return n;
                                  })(t, a, a + i, e, s);
                        },
                    }),
                    t
                );
            })();
            function extendPrototype(t, e) {
                var i,
                    s,
                    r = t.length;
                for (i = 0; i < r; i += 1) for (var a in (s = t[i].prototype)) s.hasOwnProperty(a) && (e.prototype[a] = s[a]);
            }
            function getDescriptor(t, e) {
                return Object.getOwnPropertyDescriptor(t, e);
            }
            function createProxyFunction(t) {
                function e() {}
                return (e.prototype = t), e;
            }
            function bezFunction() {
                function t(t, e, i, s, r, a) {
                    var n = t * s + e * r + i * a - r * s - a * t - i * e;
                    return -0.001 < n && n < 0.001;
                }
                Math;
                var e = function (t, e, i, s) {
                    var r,
                        a,
                        n,
                        o,
                        l,
                        h,
                        p = defaultCurveSegments,
                        d = 0,
                        c = [],
                        f = [],
                        u = bezier_length_pool.newElement();
                    for (n = i.length, r = 0; r < p; r += 1) {
                        for (l = r / (p - 1), a = h = 0; a < n; a += 1)
                            (o = bm_pow(1 - l, 3) * t[a] + 3 * bm_pow(1 - l, 2) * l * i[a] + 3 * (1 - l) * bm_pow(l, 2) * s[a] + bm_pow(l, 3) * e[a]), (c[a] = o), null !== f[a] && (h += bm_pow(c[a] - f[a], 2)), (f[a] = c[a]);
                        h && (d += h = bm_sqrt(h)), (u.percents[r] = l), (u.lengths[r] = d);
                    }
                    return (u.addedLength = d), u;
                };
                function i(t) {
                    (this.segmentLength = 0), (this.points = new Array(t));
                }
                function s(t, e) {
                    (this.partialLength = t), (this.point = e);
                }
                var r,
                    a =
                        ((r = {}),
                        function (e, a, n, o) {
                            var l = (e[0] + "_" + e[1] + "_" + a[0] + "_" + a[1] + "_" + n[0] + "_" + n[1] + "_" + o[0] + "_" + o[1]).replace(/\./g, "p");
                            if (!r[l]) {
                                var h,
                                    p,
                                    d,
                                    c,
                                    f,
                                    u,
                                    m,
                                    g = defaultCurveSegments,
                                    y = 0,
                                    v = null;
                                2 === e.length && (e[0] != a[0] || e[1] != a[1]) && t(e[0], e[1], a[0], a[1], e[0] + n[0], e[1] + n[1]) && t(e[0], e[1], a[0], a[1], a[0] + o[0], a[1] + o[1]) && (g = 2);
                                var b = new i(g);
                                for (d = n.length, h = 0; h < g; h += 1) {
                                    for (m = createSizedArray(d), f = h / (g - 1), p = u = 0; p < d; p += 1)
                                        (c = bm_pow(1 - f, 3) * e[p] + 3 * bm_pow(1 - f, 2) * f * (e[p] + n[p]) + 3 * (1 - f) * bm_pow(f, 2) * (a[p] + o[p]) + bm_pow(f, 3) * a[p]), (m[p] = c), null !== v && (u += bm_pow(m[p] - v[p], 2));
                                    (y += u = bm_sqrt(u)), (b.points[h] = new s(u, m)), (v = m);
                                }
                                (b.segmentLength = y), (r[l] = b);
                            }
                            return r[l];
                        });
                function n(t, e) {
                    var i = e.percents,
                        s = e.lengths,
                        r = i.length,
                        a = bm_floor((r - 1) * t),
                        n = t * e.addedLength,
                        o = 0;
                    if (a === r - 1 || 0 === a || n === s[a]) return i[a];
                    for (var l = s[a] > n ? -1 : 1, h = !0; h; )
                        if ((s[a] <= n && s[a + 1] > n ? ((o = (n - s[a]) / (s[a + 1] - s[a])), (h = !1)) : (a += l), a < 0 || r - 1 <= a)) {
                            if (a === r - 1) return i[a];
                            h = !1;
                        }
                    return i[a] + (i[a + 1] - i[a]) * o;
                }
                var o = createTypedArray("float32", 8);
                return {
                    getSegmentsLength: function (t) {
                        var i,
                            s = segments_length_pool.newElement(),
                            r = t.c,
                            a = t.v,
                            n = t.o,
                            o = t.i,
                            l = t._length,
                            h = s.lengths,
                            p = 0;
                        for (i = 0; i < l - 1; i += 1) (h[i] = e(a[i], a[i + 1], n[i], o[i + 1])), (p += h[i].addedLength);
                        return r && l && ((h[i] = e(a[i], a[0], n[i], o[0])), (p += h[i].addedLength)), (s.totalLength = p), s;
                    },
                    getNewSegment: function (t, e, i, s, r, a, l) {
                        var h,
                            p = n((r = r < 0 ? 0 : 1 < r ? 1 : r), l),
                            d = n((a = 1 < a ? 1 : a), l),
                            c = t.length,
                            f = 1 - p,
                            u = 1 - d,
                            m = f * f * f,
                            g = p * f * f * 3,
                            y = p * p * f * 3,
                            v = p * p * p,
                            b = f * f * u,
                            w = p * f * u + f * p * u + f * f * d,
                            S = p * p * u + f * p * d + p * f * d,
                            k = p * p * d,
                            T = f * u * u,
                            x = p * u * u + f * d * u + f * u * d,
                            P = p * d * u + f * d * d + p * u * d,
                            A = p * d * d,
                            C = u * u * u,
                            E = d * u * u + u * d * u + u * u * d,
                            _ = d * d * u + u * d * d + d * u * d,
                            M = d * d * d;
                        for (h = 0; h < c; h += 1)
                            (o[4 * h] = Math.round(1e3 * (m * t[h] + g * i[h] + y * s[h] + v * e[h])) / 1e3),
                                (o[4 * h + 1] = Math.round(1e3 * (b * t[h] + w * i[h] + S * s[h] + k * e[h])) / 1e3),
                                (o[4 * h + 2] = Math.round(1e3 * (T * t[h] + x * i[h] + P * s[h] + A * e[h])) / 1e3),
                                (o[4 * h + 3] = Math.round(1e3 * (C * t[h] + E * i[h] + _ * s[h] + M * e[h])) / 1e3);
                        return o;
                    },
                    getPointInSegment: function (t, e, i, s, r, a) {
                        var o = n(r, a),
                            l = 1 - o;
                        return [
                            Math.round(1e3 * (l * l * l * t[0] + (o * l * l + l * o * l + l * l * o) * i[0] + (o * o * l + l * o * o + o * l * o) * s[0] + o * o * o * e[0])) / 1e3,
                            Math.round(1e3 * (l * l * l * t[1] + (o * l * l + l * o * l + l * l * o) * i[1] + (o * o * l + l * o * o + o * l * o) * s[1] + o * o * o * e[1])) / 1e3,
                        ];
                    },
                    buildBezierData: a,
                    pointOnLine2D: t,
                    pointOnLine3D: function (e, i, s, r, a, n, o, l, h) {
                        if (0 === s && 0 === n && 0 === h) return t(e, i, r, a, o, l);
                        var p,
                            d = Math.sqrt(Math.pow(r - e, 2) + Math.pow(a - i, 2) + Math.pow(n - s, 2)),
                            c = Math.sqrt(Math.pow(o - e, 2) + Math.pow(l - i, 2) + Math.pow(h - s, 2)),
                            f = Math.sqrt(Math.pow(o - r, 2) + Math.pow(l - a, 2) + Math.pow(h - n, 2));
                        return -1e-4 < (p = c < d ? (f < d ? d - c - f : f - c - d) : c < f ? f - c - d : c - d - f) && p < 1e-4;
                    },
                };
            }
            !(function () {
                for (var t = 0, e = ["ms", "moz", "webkit", "o"], i = 0; i < e.length && !window.requestAnimationFrame; ++i)
                    (window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"]), (window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"]);
                window.requestAnimationFrame ||
                    (window.requestAnimationFrame = function (e, i) {
                        var s = new Date().getTime(),
                            r = Math.max(0, 16 - (s - t)),
                            a = setTimeout(function () {
                                e(s + r);
                            }, r);
                        return (t = s + r), a;
                    }),
                    window.cancelAnimationFrame ||
                        (window.cancelAnimationFrame = function (t) {
                            clearTimeout(t);
                        });
            })();
            var bez = bezFunction();
            function dataFunctionManager() {
                function t(t, e) {
                    for (var i = 0, s = e.length; i < s; ) {
                        if (e[i].id === t) return e[i].layers.__used ? JSON.parse(JSON.stringify(e[i].layers)) : ((e[i].layers.__used = !0), e[i].layers);
                        i += 1;
                    }
                }
                function e(t) {
                    var s, r, a;
                    for (s = t.length - 1; 0 <= s; s -= 1)
                        if ("sh" == t[s].ty)
                            if (t[s].ks.k.i) i(t[s].ks.k);
                            else for (a = t[s].ks.k.length, r = 0; r < a; r += 1) t[s].ks.k[r].s && i(t[s].ks.k[r].s[0]), t[s].ks.k[r].e && i(t[s].ks.k[r].e[0]);
                        else "gr" == t[s].ty && e(t[s].it);
                }
                function i(t) {
                    var e,
                        i = t.i.length;
                    for (e = 0; e < i; e += 1) (t.i[e][0] += t.v[e][0]), (t.i[e][1] += t.v[e][1]), (t.o[e][0] += t.v[e][0]), (t.o[e][1] += t.v[e][1]);
                }
                function s(t, e) {
                    var i = e ? e.split(".") : [100, 100, 100];
                    return t[0] > i[0] || (!(i[0] > t[0]) && (t[1] > i[1] || (!(i[1] > t[1]) && (t[2] > i[2] || (!(i[2] > t[2]) && void 0)))));
                }
                var r,
                    a = (function () {
                        var t = [4, 4, 14];
                        function e(t) {
                            var e,
                                i,
                                s,
                                r = t.length;
                            for (e = 0; e < r; e += 1) 5 === t[e].ty && ((s = (i = t[e]).t.d), (i.t.d = { k: [{ s: s, t: 0 }] }));
                        }
                        return function (i) {
                            if (s(t, i.v) && (e(i.layers), i.assets)) {
                                var r,
                                    a = i.assets.length;
                                for (r = 0; r < a; r += 1) i.assets[r].layers && e(i.assets[r].layers);
                            }
                        };
                    })(),
                    n =
                        ((r = [4, 7, 99]),
                        function (t) {
                            if (t.chars && !s(r, t.v)) {
                                var e,
                                    a,
                                    n,
                                    o,
                                    l,
                                    h = t.chars.length;
                                for (e = 0; e < h; e += 1)
                                    if (t.chars[e].data && t.chars[e].data.shapes) for (n = (l = t.chars[e].data.shapes[0].it).length, a = 0; a < n; a += 1) (o = l[a].ks.k).__converted || (i(l[a].ks.k), (o.__converted = !0));
                            }
                        }),
                    o = (function () {
                        var t = [4, 1, 9];
                        function e(t) {
                            var i,
                                s,
                                r,
                                a = t.length;
                            for (i = 0; i < a; i += 1)
                                if ("gr" === t[i].ty) e(t[i].it);
                                else if ("fl" === t[i].ty || "st" === t[i].ty)
                                    if (t[i].c.k && t[i].c.k[0].i)
                                        for (r = t[i].c.k.length, s = 0; s < r; s += 1)
                                            t[i].c.k[s].s && ((t[i].c.k[s].s[0] /= 255), (t[i].c.k[s].s[1] /= 255), (t[i].c.k[s].s[2] /= 255), (t[i].c.k[s].s[3] /= 255)),
                                                t[i].c.k[s].e && ((t[i].c.k[s].e[0] /= 255), (t[i].c.k[s].e[1] /= 255), (t[i].c.k[s].e[2] /= 255), (t[i].c.k[s].e[3] /= 255));
                                    else (t[i].c.k[0] /= 255), (t[i].c.k[1] /= 255), (t[i].c.k[2] /= 255), (t[i].c.k[3] /= 255);
                        }
                        function i(t) {
                            var i,
                                s = t.length;
                            for (i = 0; i < s; i += 1) 4 === t[i].ty && e(t[i].shapes);
                        }
                        return function (e) {
                            if (s(t, e.v) && (i(e.layers), e.assets)) {
                                var r,
                                    a = e.assets.length;
                                for (r = 0; r < a; r += 1) e.assets[r].layers && i(e.assets[r].layers);
                            }
                        };
                    })(),
                    l = (function () {
                        var t = [4, 4, 18];
                        function e(t) {
                            var i, s, r;
                            for (i = t.length - 1; 0 <= i; i -= 1)
                                if ("sh" == t[i].ty)
                                    if (t[i].ks.k.i) t[i].ks.k.c = t[i].closed;
                                    else for (r = t[i].ks.k.length, s = 0; s < r; s += 1) t[i].ks.k[s].s && (t[i].ks.k[s].s[0].c = t[i].closed), t[i].ks.k[s].e && (t[i].ks.k[s].e[0].c = t[i].closed);
                                else "gr" == t[i].ty && e(t[i].it);
                        }
                        function i(t) {
                            var i,
                                s,
                                r,
                                a,
                                n,
                                o,
                                l = t.length;
                            for (s = 0; s < l; s += 1) {
                                if ((i = t[s]).hasMask) {
                                    var h = i.masksProperties;
                                    for (a = h.length, r = 0; r < a; r += 1)
                                        if (h[r].pt.k.i) h[r].pt.k.c = h[r].cl;
                                        else for (o = h[r].pt.k.length, n = 0; n < o; n += 1) h[r].pt.k[n].s && (h[r].pt.k[n].s[0].c = h[r].cl), h[r].pt.k[n].e && (h[r].pt.k[n].e[0].c = h[r].cl);
                                }
                                4 === i.ty && e(i.shapes);
                            }
                        }
                        return function (e) {
                            if (s(t, e.v) && (i(e.layers), e.assets)) {
                                var r,
                                    a = e.assets.length;
                                for (r = 0; r < a; r += 1) e.assets[r].layers && i(e.assets[r].layers);
                            }
                        };
                    })(),
                    h = {
                        completeData: function (s, r) {
                            s.__complete ||
                                (o(s),
                                a(s),
                                n(s),
                                l(s),
                                (function s(r, a, n) {
                                    var o,
                                        l,
                                        h,
                                        p,
                                        d,
                                        c,
                                        f,
                                        u = r.length;
                                    for (l = 0; l < u; l += 1)
                                        if ("ks" in (o = r[l]) && !o.completed) {
                                            if (((o.completed = !0), o.tt && (r[l - 1].td = o.tt), o.hasMask)) {
                                                var m = o.masksProperties;
                                                for (p = m.length, h = 0; h < p; h += 1)
                                                    if (m[h].pt.k.i) i(m[h].pt.k);
                                                    else for (c = m[h].pt.k.length, d = 0; d < c; d += 1) m[h].pt.k[d].s && i(m[h].pt.k[d].s[0]), m[h].pt.k[d].e && i(m[h].pt.k[d].e[0]);
                                            }
                                            0 === o.ty ? ((o.layers = t(o.refId, a)), s(o.layers, a, n)) : 4 === o.ty ? e(o.shapes) : 5 == o.ty && (0 !== (f = o).t.a.length || "m" in f.t.p || (f.singleShape = !0));
                                        }
                                })(s.layers, s.assets, r),
                                (s.__complete = !0));
                        },
                    };
                return h;
            }
            var dataManager = dataFunctionManager(),
                FontManager = (function () {
                    var t = { w: 0, size: 0, shapes: [] },
                        e = [];
                    function i(t, e) {
                        var i = createTag("span");
                        i.style.fontFamily = e;
                        var s = createTag("span");
                        (s.innerHTML = "giItT1WQy@!-/#"),
                            (i.style.position = "absolute"),
                            (i.style.left = "-10000px"),
                            (i.style.top = "-10000px"),
                            (i.style.fontSize = "300px"),
                            (i.style.fontVariant = "normal"),
                            (i.style.fontStyle = "normal"),
                            (i.style.fontWeight = "normal"),
                            (i.style.letterSpacing = "0"),
                            i.appendChild(s),
                            document.body.appendChild(i);
                        var r = s.offsetWidth;
                        return (s.style.fontFamily = t + ", " + e), { node: s, w: r, parent: i };
                    }
                    e = e.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
                    var s = function () {
                        (this.fonts = []), (this.chars = null), (this.typekitLoaded = 0), (this.isLoaded = !1), (this.initTime = Date.now());
                    };
                    return (
                        (s.getCombinedCharacterCodes = function () {
                            return e;
                        }),
                        (s.prototype.addChars = function (t) {
                            if (t) {
                                this.chars || (this.chars = []);
                                var e,
                                    i,
                                    s,
                                    r = t.length,
                                    a = this.chars.length;
                                for (e = 0; e < r; e += 1) {
                                    for (i = 0, s = !1; i < a; ) this.chars[i].style === t[e].style && this.chars[i].fFamily === t[e].fFamily && this.chars[i].ch === t[e].ch && (s = !0), (i += 1);
                                    s || (this.chars.push(t[e]), (a += 1));
                                }
                            }
                        }),
                        (s.prototype.addFonts = function (t, e) {
                            if (t) {
                                if (this.chars) return (this.isLoaded = !0), void (this.fonts = t.list);
                                var s,
                                    r,
                                    a,
                                    n,
                                    o = t.list,
                                    l = o.length,
                                    h = l;
                                for (s = 0; s < l; s += 1) {
                                    var p,
                                        d,
                                        c = !0;
                                    if (((o[s].loaded = !1), (o[s].monoCase = i(o[s].fFamily, "monospace")), (o[s].sansCase = i(o[s].fFamily, "sans-serif")), o[s].fPath)) {
                                        if ("p" === o[s].fOrigin || 3 === o[s].origin) {
                                            if ((0 < (p = document.querySelectorAll('style[f-forigin="p"][f-family="' + o[s].fFamily + '"], style[f-origin="3"][f-family="' + o[s].fFamily + '"]')).length && (c = !1), c)) {
                                                var f = createTag("style");
                                                f.setAttribute("f-forigin", o[s].fOrigin),
                                                    f.setAttribute("f-origin", o[s].origin),
                                                    f.setAttribute("f-family", o[s].fFamily),
                                                    (f.type = "text/css"),
                                                    (f.innerHTML = "@font-face {font-family: " + o[s].fFamily + "; font-style: normal; src: url('" + o[s].fPath + "');}"),
                                                    e.appendChild(f);
                                            }
                                        } else if ("g" === o[s].fOrigin || 1 === o[s].origin) {
                                            for (p = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), d = 0; d < p.length; d++) -1 !== p[d].href.indexOf(o[s].fPath) && (c = !1);
                                            if (c) {
                                                var u = createTag("link");
                                                u.setAttribute("f-forigin", o[s].fOrigin), u.setAttribute("f-origin", o[s].origin), (u.type = "text/css"), (u.rel = "stylesheet"), (u.href = o[s].fPath), document.body.appendChild(u);
                                            }
                                        } else if ("t" === o[s].fOrigin || 2 === o[s].origin) {
                                            for (p = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), d = 0; d < p.length; d++) o[s].fPath === p[d].src && (c = !1);
                                            if (c) {
                                                var m = createTag("link");
                                                m.setAttribute("f-forigin", o[s].fOrigin), m.setAttribute("f-origin", o[s].origin), m.setAttribute("rel", "stylesheet"), m.setAttribute("href", o[s].fPath), e.appendChild(m);
                                            }
                                        }
                                    } else (o[s].loaded = !0), (h -= 1);
                                    (o[s].helper =
                                        ((r = e),
                                        (a = o[s]),
                                        (n = void 0),
                                        ((n = createNS("text")).style.fontSize = "100px"),
                                        n.setAttribute("font-family", a.fFamily),
                                        n.setAttribute("font-style", a.fStyle),
                                        n.setAttribute("font-weight", a.fWeight),
                                        (n.textContent = "1"),
                                        a.fClass ? ((n.style.fontFamily = "inherit"), n.setAttribute("class", a.fClass)) : (n.style.fontFamily = a.fFamily),
                                        r.appendChild(n),
                                        (createTag("canvas").getContext("2d").font = a.fWeight + " " + a.fStyle + " 100px " + a.fFamily),
                                        n)),
                                        (o[s].cache = {}),
                                        this.fonts.push(o[s]);
                                }
                                0 === h ? (this.isLoaded = !0) : setTimeout(this.checkLoadedFonts.bind(this), 100);
                            } else this.isLoaded = !0;
                        }),
                        (s.prototype.getCharData = function (e, i, s) {
                            for (var r = 0, a = this.chars.length; r < a; ) {
                                if (this.chars[r].ch === e && this.chars[r].style === i && this.chars[r].fFamily === s) return this.chars[r];
                                r += 1;
                            }
                            return (("string" == typeof e && 13 !== e.charCodeAt(0)) || !e) && console && console.warn && console.warn("Missing character from exported characters list: ", e, i, s), t;
                        }),
                        (s.prototype.getFontByName = function (t) {
                            for (var e = 0, i = this.fonts.length; e < i; ) {
                                if (this.fonts[e].fName === t) return this.fonts[e];
                                e += 1;
                            }
                            return this.fonts[0];
                        }),
                        (s.prototype.measureText = function (t, e, i) {
                            var s = this.getFontByName(e),
                                r = t.charCodeAt(0);
                            if (!s.cache[r + 1]) {
                                var a = s.helper;
                                if (" " === t) {
                                    a.textContent = "|" + t + "|";
                                    var n = a.getComputedTextLength();
                                    a.textContent = "||";
                                    var o = a.getComputedTextLength();
                                    s.cache[r + 1] = (n - o) / 100;
                                } else (a.textContent = t), (s.cache[r + 1] = a.getComputedTextLength() / 100);
                            }
                            return s.cache[r + 1] * i;
                        }),
                        (s.prototype.checkLoadedFonts = function () {
                            var t,
                                e,
                                i,
                                s = this.fonts.length,
                                r = s;
                            for (t = 0; t < s; t += 1)
                                this.fonts[t].loaded
                                    ? (r -= 1)
                                    : "n" === this.fonts[t].fOrigin || 0 === this.fonts[t].origin
                                    ? (this.fonts[t].loaded = !0)
                                    : ((e = this.fonts[t].monoCase.node),
                                      (i = this.fonts[t].monoCase.w),
                                      e.offsetWidth !== i ? ((r -= 1), (this.fonts[t].loaded = !0)) : ((e = this.fonts[t].sansCase.node), (i = this.fonts[t].sansCase.w), e.offsetWidth !== i && ((r -= 1), (this.fonts[t].loaded = !0))),
                                      this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent), this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
                            0 !== r && Date.now() - this.initTime < 5e3
                                ? setTimeout(this.checkLoadedFonts.bind(this), 20)
                                : setTimeout(
                                      function () {
                                          this.isLoaded = !0;
                                      }.bind(this),
                                      0
                                  );
                        }),
                        (s.prototype.loaded = function () {
                            return this.isLoaded;
                        }),
                        s
                    );
                })(),
                PropertyFactory = (function () {
                    var t = initialDefaultFrame,
                        e = Math.abs;
                    function i(t, e) {
                        var i,
                            r = this.offsetTime;
                        "multidimensional" === this.propType && (i = createTypedArray("float32", this.pv.length));
                        for (var a, n, o, l, h, p, d, c, f = e.lastIndex, u = f, m = this.keyframes.length - 1, g = !0; g; ) {
                            if (((a = this.keyframes[u]), (n = this.keyframes[u + 1]), u === m - 1 && t >= n.t - r)) {
                                a.h && (a = n), (f = 0);
                                break;
                            }
                            if (n.t - r > t) {
                                f = u;
                                break;
                            }
                            u < m - 1 ? (u += 1) : ((f = 0), (g = !1));
                        }
                        var y,
                            v,
                            b,
                            w,
                            S,
                            k,
                            T,
                            x,
                            P,
                            A,
                            C = n.t - r,
                            E = a.t - r;
                        if (a.to) {
                            a.bezierData || (a.bezierData = bez.buildBezierData(a.s, n.s || a.e, a.to, a.ti));
                            var _ = a.bezierData;
                            if (C <= t || t < E) {
                                var M = C <= t ? _.points.length - 1 : 0;
                                for (l = _.points[M].point.length, o = 0; o < l; o += 1) i[o] = _.points[M].point[o];
                            } else {
                                a.__fnct ? (c = a.__fnct) : ((c = BezierFactory.getBezierEasing(a.o.x, a.o.y, a.i.x, a.i.y, a.n).get), (a.__fnct = c)), (h = c((t - E) / (C - E)));
                                var D,
                                    I = _.segmentLength * h,
                                    F = e.lastFrame < t && e._lastKeyframeIndex === u ? e._lastAddedLength : 0;
                                for (d = e.lastFrame < t && e._lastKeyframeIndex === u ? e._lastPoint : 0, g = !0, p = _.points.length; g; ) {
                                    if (((F += _.points[d].partialLength), 0 === I || 0 === h || d === _.points.length - 1)) {
                                        for (l = _.points[d].point.length, o = 0; o < l; o += 1) i[o] = _.points[d].point[o];
                                        break;
                                    }
                                    if (F <= I && I < F + _.points[d + 1].partialLength) {
                                        for (D = (I - F) / _.points[d + 1].partialLength, l = _.points[d].point.length, o = 0; o < l; o += 1) i[o] = _.points[d].point[o] + (_.points[d + 1].point[o] - _.points[d].point[o]) * D;
                                        break;
                                    }
                                    d < p - 1 ? (d += 1) : (g = !1);
                                }
                                (e._lastPoint = d), (e._lastAddedLength = F - _.points[d].partialLength), (e._lastKeyframeIndex = u);
                            }
                        } else {
                            var L, z, O, R, V;
                            if (((m = a.s.length), (y = n.s || a.e), this.sh && 1 !== a.h))
                                if (C <= t) (i[0] = y[0]), (i[1] = y[1]), (i[2] = y[2]);
                                else if (t <= E) (i[0] = a.s[0]), (i[1] = a.s[1]), (i[2] = a.s[2]);
                                else {
                                    (v = i),
                                        (b = (function (t, e, i) {
                                            var s,
                                                r,
                                                a,
                                                n,
                                                o,
                                                l = [],
                                                h = t[0],
                                                p = t[1],
                                                d = t[2],
                                                c = t[3],
                                                f = e[0],
                                                u = e[1],
                                                m = e[2],
                                                g = e[3];
                                            return (
                                                (r = h * f + p * u + d * m + c * g) < 0 && ((r = -r), (f = -f), (u = -u), (m = -m), (g = -g)),
                                                (o = 1e-6 < 1 - r ? ((s = Math.acos(r)), (a = Math.sin(s)), (n = Math.sin((1 - i) * s) / a), Math.sin(i * s) / a) : ((n = 1 - i), i)),
                                                (l[0] = n * h + o * f),
                                                (l[1] = n * p + o * u),
                                                (l[2] = n * d + o * m),
                                                (l[3] = n * c + o * g),
                                                l
                                            );
                                        })(s(a.s), s(y), (t - E) / (C - E))),
                                        (w = b[0]),
                                        (S = b[1]),
                                        (k = b[2]),
                                        (T = b[3]),
                                        (x = Math.atan2(2 * S * T - 2 * w * k, 1 - 2 * S * S - 2 * k * k)),
                                        (P = Math.asin(2 * w * S + 2 * k * T)),
                                        (A = Math.atan2(2 * w * T - 2 * S * k, 1 - 2 * w * w - 2 * k * k)),
                                        (v[0] = x / degToRads),
                                        (v[1] = P / degToRads),
                                        (v[2] = A / degToRads);
                                }
                            else
                                for (u = 0; u < m; u += 1)
                                    1 !== a.h &&
                                        (h =
                                            C <= t
                                                ? 1
                                                : t < E
                                                ? 0
                                                : (a.o.x.constructor === Array
                                                      ? (a.__fnct || (a.__fnct = []),
                                                        a.__fnct[u]
                                                            ? (c = a.__fnct[u])
                                                            : ((L = void 0 === a.o.x[u] ? a.o.x[0] : a.o.x[u]),
                                                              (z = void 0 === a.o.y[u] ? a.o.y[0] : a.o.y[u]),
                                                              (O = void 0 === a.i.x[u] ? a.i.x[0] : a.i.x[u]),
                                                              (R = void 0 === a.i.y[u] ? a.i.y[0] : a.i.y[u]),
                                                              (c = BezierFactory.getBezierEasing(L, z, O, R).get),
                                                              (a.__fnct[u] = c)))
                                                      : a.__fnct
                                                      ? (c = a.__fnct)
                                                      : ((L = a.o.x), (z = a.o.y), (O = a.i.x), (R = a.i.y), (c = BezierFactory.getBezierEasing(L, z, O, R).get), (a.__fnct = c)),
                                                  c((t - E) / (C - E)))),
                                        (y = n.s || a.e),
                                        (V = 1 === a.h ? a.s[u] : a.s[u] + (y[u] - a.s[u]) * h),
                                        1 === m ? (i = V) : (i[u] = V);
                        }
                        return (e.lastIndex = f), i;
                    }
                    function s(t) {
                        var e = t[0] * degToRads,
                            i = t[1] * degToRads,
                            s = t[2] * degToRads,
                            r = Math.cos(e / 2),
                            a = Math.cos(i / 2),
                            n = Math.cos(s / 2),
                            o = Math.sin(e / 2),
                            l = Math.sin(i / 2),
                            h = Math.sin(s / 2);
                        return [o * l * n + r * a * h, o * a * n + r * l * h, r * l * n - o * a * h, r * a * n - o * l * h];
                    }
                    function r() {
                        var e = this.comp.renderedFrame - this.offsetTime,
                            i = this.keyframes[0].t - this.offsetTime,
                            s = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
                        if (!(e === this._caching.lastFrame || (this._caching.lastFrame !== t && ((this._caching.lastFrame >= s && s <= e) || (this._caching.lastFrame < i && e < i))))) {
                            this._caching.lastFrame >= e && ((this._caching._lastKeyframeIndex = -1), (this._caching.lastIndex = 0));
                            var r = this.interpolateValue(e, this._caching);
                            this.pv = r;
                        }
                        return (this._caching.lastFrame = e), this.pv;
                    }
                    function a(t) {
                        var i;
                        if ("unidimensional" === this.propType) (i = t * this.mult), 1e-5 < e(this.v - i) && ((this.v = i), (this._mdf = !0));
                        else for (var s = 0, r = this.v.length; s < r; ) (i = t[s] * this.mult), 1e-5 < e(this.v[s] - i) && ((this.v[s] = i), (this._mdf = !0)), (s += 1);
                    }
                    function n() {
                        if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length)
                            if (this.lock) this.setVValue(this.pv);
                            else {
                                (this.lock = !0), (this._mdf = this._isFirstFrame);
                                var t,
                                    e = this.effectsSequence.length,
                                    i = this.kf ? this.pv : this.data.k;
                                for (t = 0; t < e; t += 1) i = this.effectsSequence[t](i);
                                this.setVValue(i), (this._isFirstFrame = !1), (this.lock = !1), (this.frameId = this.elem.globalData.frameId);
                            }
                    }
                    function o(t) {
                        this.effectsSequence.push(t), this.container.addDynamicProperty(this);
                    }
                    function l(t, e, i, s) {
                        (this.propType = "unidimensional"),
                            (this.mult = i || 1),
                            (this.data = e),
                            (this.v = i ? e.k * i : e.k),
                            (this.pv = e.k),
                            (this._mdf = !1),
                            (this.elem = t),
                            (this.container = s),
                            (this.comp = t.comp),
                            (this.k = !1),
                            (this.kf = !1),
                            (this.vel = 0),
                            (this.effectsSequence = []),
                            (this._isFirstFrame = !0),
                            (this.getValue = n),
                            (this.setVValue = a),
                            (this.addEffect = o);
                    }
                    function h(t, e, i, s) {
                        (this.propType = "multidimensional"), (this.mult = i || 1), (this.data = e), (this._mdf = !1), (this.elem = t), (this.container = s), (this.comp = t.comp), (this.k = !1), (this.kf = !1), (this.frameId = -1);
                        var r,
                            l = e.k.length;
                        for (this.v = createTypedArray("float32", l), this.pv = createTypedArray("float32", l), createTypedArray("float32", l), this.vel = createTypedArray("float32", l), r = 0; r < l; r += 1)
                            (this.v[r] = e.k[r] * this.mult), (this.pv[r] = e.k[r]);
                        (this._isFirstFrame = !0), (this.effectsSequence = []), (this.getValue = n), (this.setVValue = a), (this.addEffect = o);
                    }
                    function p(e, s, l, h) {
                        (this.propType = "unidimensional"),
                            (this.keyframes = s.k),
                            (this.offsetTime = e.data.st),
                            (this.frameId = -1),
                            (this._caching = { lastFrame: t, lastIndex: 0, value: 0, _lastKeyframeIndex: -1 }),
                            (this.k = !0),
                            (this.kf = !0),
                            (this.data = s),
                            (this.mult = l || 1),
                            (this.elem = e),
                            (this.container = h),
                            (this.comp = e.comp),
                            (this.v = t),
                            (this.pv = t),
                            (this._isFirstFrame = !0),
                            (this.getValue = n),
                            (this.setVValue = a),
                            (this.interpolateValue = i),
                            (this.effectsSequence = [r.bind(this)]),
                            (this.addEffect = o);
                    }
                    function d(e, s, l, h) {
                        this.propType = "multidimensional";
                        var p,
                            d,
                            c,
                            f,
                            u,
                            m = s.k.length;
                        for (p = 0; p < m - 1; p += 1)
                            s.k[p].to &&
                                s.k[p].s &&
                                s.k[p].e &&
                                ((d = s.k[p].s),
                                (c = s.k[p].e),
                                (f = s.k[p].to),
                                (u = s.k[p].ti),
                                ((2 === d.length && (d[0] !== c[0] || d[1] !== c[1]) && bez.pointOnLine2D(d[0], d[1], c[0], c[1], d[0] + f[0], d[1] + f[1]) && bez.pointOnLine2D(d[0], d[1], c[0], c[1], c[0] + u[0], c[1] + u[1])) ||
                                    (3 === d.length &&
                                        (d[0] !== c[0] || d[1] !== c[1] || d[2] !== c[2]) &&
                                        bez.pointOnLine3D(d[0], d[1], d[2], c[0], c[1], c[2], d[0] + f[0], d[1] + f[1], d[2] + f[2]) &&
                                        bez.pointOnLine3D(d[0], d[1], d[2], c[0], c[1], c[2], c[0] + u[0], c[1] + u[1], c[2] + u[2]))) &&
                                    ((s.k[p].to = null), (s.k[p].ti = null)),
                                d[0] === c[0] && d[1] === c[1] && 0 === f[0] && 0 === f[1] && 0 === u[0] && 0 === u[1] && (2 === d.length || (d[2] === c[2] && 0 === f[2] && 0 === u[2])) && ((s.k[p].to = null), (s.k[p].ti = null)));
                        (this.effectsSequence = [r.bind(this)]),
                            (this.keyframes = s.k),
                            (this.offsetTime = e.data.st),
                            (this.k = !0),
                            (this.kf = !0),
                            (this._isFirstFrame = !0),
                            (this.mult = l || 1),
                            (this.elem = e),
                            (this.container = h),
                            (this.comp = e.comp),
                            (this.getValue = n),
                            (this.setVValue = a),
                            (this.interpolateValue = i),
                            (this.frameId = -1);
                        var g = s.k[0].s.length;
                        for (this.v = createTypedArray("float32", g), this.pv = createTypedArray("float32", g), p = 0; p < g; p += 1) (this.v[p] = t), (this.pv[p] = t);
                        (this._caching = { lastFrame: t, lastIndex: 0, value: createTypedArray("float32", g) }), (this.addEffect = o);
                    }
                    return {
                        getProp: function (t, e, i, s, r) {
                            var a;
                            if (e.k.length)
                                if ("number" == typeof e.k[0]) a = new h(t, e, s, r);
                                else
                                    switch (i) {
                                        case 0:
                                            a = new p(t, e, s, r);
                                            break;
                                        case 1:
                                            a = new d(t, e, s, r);
                                    }
                            else a = new l(t, e, s, r);
                            return a.effectsSequence.length && r.addDynamicProperty(a), a;
                        },
                    };
                })(),
                TransformPropertyFactory = (function () {
                    function t(t, e, i) {
                        if (
                            ((this.elem = t),
                            (this.frameId = -1),
                            (this.propType = "transform"),
                            (this.data = e),
                            (this.v = new Matrix()),
                            (this.pre = new Matrix()),
                            (this.appliedTransformations = 0),
                            this.initDynamicPropertyContainer(i || t),
                            e.p && e.p.s
                                ? ((this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this)), (this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this)), e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this)))
                                : (this.p = PropertyFactory.getProp(t, e.p || { k: [0, 0, 0] }, 1, 0, this)),
                            e.rx)
                        ) {
                            if (
                                ((this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this)),
                                (this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this)),
                                (this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this)),
                                e.or.k[0].ti)
                            ) {
                                var s,
                                    r = e.or.k.length;
                                for (s = 0; s < r; s += 1) e.or.k[s].to = e.or.k[s].ti = null;
                            }
                            (this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this)), (this.or.sh = !0);
                        } else this.r = PropertyFactory.getProp(t, e.r || { k: 0 }, 0, degToRads, this);
                        e.sk && ((this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this)), (this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this))),
                            (this.a = PropertyFactory.getProp(t, e.a || { k: [0, 0, 0] }, 1, 0, this)),
                            (this.s = PropertyFactory.getProp(t, e.s || { k: [100, 100, 100] }, 1, 0.01, this)),
                            e.o ? (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, t)) : (this.o = { _mdf: !1, v: 1 }),
                            (this._isDirty = !0),
                            this.dynamicProperties.length || this.getValue(!0);
                    }
                    return (
                        (t.prototype = {
                            applyToMatrix: function (t) {
                                var e = this._mdf;
                                this.iterateDynamicProperties(),
                                    (this._mdf = this._mdf || e),
                                    this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                                    this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                                    this.sk && t.skewFromAxis(-this.sk.v, this.sa.v),
                                    this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),
                                    this.data.p.s ? (this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0)) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
                            },
                            getValue: function (t) {
                                if (this.elem.globalData.frameId !== this.frameId) {
                                    if ((this._isDirty && (this.precalculateMatrix(), (this._isDirty = !1)), this.iterateDynamicProperties(), this._mdf || t)) {
                                        if (
                                            (this.v.cloneFromProps(this.pre.props),
                                            this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                                            this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                                            this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v),
                                            this.r && this.appliedTransformations < 4
                                                ? this.v.rotate(-this.r.v)
                                                : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),
                                            this.autoOriented)
                                        ) {
                                            var e,
                                                i,
                                                s = this.elem.globalData.frameRate;
                                            if (this.p && this.p.keyframes && this.p.getValueAtTime)
                                                i =
                                                    this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t
                                                        ? ((e = this.p.getValueAtTime((this.p.keyframes[0].t + 0.01) / s, 0)), this.p.getValueAtTime(this.p.keyframes[0].t / s, 0))
                                                        : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t
                                                        ? ((e = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / s, 0)), this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - 0.01) / s, 0))
                                                        : ((e = this.p.pv), this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - 0.01) / s, this.p.offsetTime));
                                            else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                                                (e = []), (i = []);
                                                var r = this.px,
                                                    a = this.py;
                                                r._caching.lastFrame + r.offsetTime <= r.keyframes[0].t
                                                    ? ((e[0] = r.getValueAtTime((r.keyframes[0].t + 0.01) / s, 0)),
                                                      (e[1] = a.getValueAtTime((a.keyframes[0].t + 0.01) / s, 0)),
                                                      (i[0] = r.getValueAtTime(r.keyframes[0].t / s, 0)),
                                                      (i[1] = a.getValueAtTime(a.keyframes[0].t / s, 0)))
                                                    : r._caching.lastFrame + r.offsetTime >= r.keyframes[r.keyframes.length - 1].t
                                                    ? ((e[0] = r.getValueAtTime(r.keyframes[r.keyframes.length - 1].t / s, 0)),
                                                      (e[1] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / s, 0)),
                                                      (i[0] = r.getValueAtTime((r.keyframes[r.keyframes.length - 1].t - 0.01) / s, 0)),
                                                      (i[1] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - 0.01) / s, 0)))
                                                    : ((e = [r.pv, a.pv]),
                                                      (i[0] = r.getValueAtTime((r._caching.lastFrame + r.offsetTime - 0.01) / s, r.offsetTime)),
                                                      (i[1] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - 0.01) / s, a.offsetTime)));
                                            }
                                            this.v.rotate(-Math.atan2(e[1] - i[1], e[0] - i[0]));
                                        }
                                        this.data.p && this.data.p.s
                                            ? this.data.p.z
                                                ? this.v.translate(this.px.v, this.py.v, -this.pz.v)
                                                : this.v.translate(this.px.v, this.py.v, 0)
                                            : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
                                    }
                                    this.frameId = this.elem.globalData.frameId;
                                }
                            },
                            precalculateMatrix: function () {
                                if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), (this.appliedTransformations = 1), !this.s.effectsSequence.length)) {
                                    if ((this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), (this.appliedTransformations = 2), this.sk)) {
                                        if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
                                        this.pre.skewFromAxis(-this.sk.v, this.sa.v), (this.appliedTransformations = 3);
                                    }
                                    if (this.r) {
                                        if (this.r.effectsSequence.length) return;
                                        this.pre.rotate(-this.r.v), (this.appliedTransformations = 4);
                                    } else
                                        this.rz.effectsSequence.length ||
                                            this.ry.effectsSequence.length ||
                                            this.rx.effectsSequence.length ||
                                            this.or.effectsSequence.length ||
                                            (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), (this.appliedTransformations = 4));
                                }
                            },
                            autoOrient: function () {},
                        }),
                        extendPrototype([DynamicPropertyContainer], t),
                        (t.prototype.addDynamicProperty = function (t) {
                            this._addDynamicProperty(t), this.elem.addDynamicProperty(t), (this._isDirty = !0);
                        }),
                        (t.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty),
                        {
                            getTransformProperty: function (e, i, s) {
                                return new t(e, i, s);
                            },
                        }
                    );
                })();
            function ShapePath() {
                (this.c = !1), (this._length = 0), (this._maxLength = 8), (this.v = createSizedArray(this._maxLength)), (this.o = createSizedArray(this._maxLength)), (this.i = createSizedArray(this._maxLength));
            }
            (ShapePath.prototype.setPathData = function (t, e) {
                (this.c = t), this.setLength(e);
                for (var i = 0; i < e; ) (this.v[i] = point_pool.newElement()), (this.o[i] = point_pool.newElement()), (this.i[i] = point_pool.newElement()), (i += 1);
            }),
                (ShapePath.prototype.setLength = function (t) {
                    for (; this._maxLength < t; ) this.doubleArrayLength();
                    this._length = t;
                }),
                (ShapePath.prototype.doubleArrayLength = function () {
                    (this.v = this.v.concat(createSizedArray(this._maxLength))), (this.i = this.i.concat(createSizedArray(this._maxLength))), (this.o = this.o.concat(createSizedArray(this._maxLength))), (this._maxLength *= 2);
                }),
                (ShapePath.prototype.setXYAt = function (t, e, i, s, r) {
                    var a;
                    switch (((this._length = Math.max(this._length, s + 1)), this._length >= this._maxLength && this.doubleArrayLength(), i)) {
                        case "v":
                            a = this.v;
                            break;
                        case "i":
                            a = this.i;
                            break;
                        case "o":
                            a = this.o;
                    }
                    (!a[s] || (a[s] && !r)) && (a[s] = point_pool.newElement()), (a[s][0] = t), (a[s][1] = e);
                }),
                (ShapePath.prototype.setTripleAt = function (t, e, i, s, r, a, n, o) {
                    this.setXYAt(t, e, "v", n, o), this.setXYAt(i, s, "o", n, o), this.setXYAt(r, a, "i", n, o);
                }),
                (ShapePath.prototype.reverse = function () {
                    var t = new ShapePath();
                    t.setPathData(this.c, this._length);
                    var e = this.v,
                        i = this.o,
                        s = this.i,
                        r = 0;
                    this.c && (t.setTripleAt(e[0][0], e[0][1], s[0][0], s[0][1], i[0][0], i[0][1], 0, !1), (r = 1));
                    var a,
                        n = this._length - 1,
                        o = this._length;
                    for (a = r; a < o; a += 1) t.setTripleAt(e[n][0], e[n][1], s[n][0], s[n][1], i[n][0], i[n][1], a, !1), (n -= 1);
                    return t;
                });
            var ShapePropertyFactory = (function () {
                    var t = -999999;
                    function e(t, e, i) {
                        var s,
                            r,
                            a,
                            n,
                            o,
                            l,
                            h,
                            p,
                            d,
                            c = i.lastIndex,
                            f = this.keyframes;
                        if (t < f[0].t - this.offsetTime) (s = f[0].s[0]), (a = !0), (c = 0);
                        else if (t >= f[f.length - 1].t - this.offsetTime) (s = f[f.length - 1].s ? f[f.length - 1].s[0] : f[f.length - 2].e[0]), (a = !0);
                        else {
                            for (var u, m, g = c, y = f.length - 1, v = !0; v && ((u = f[g]), !((m = f[g + 1]).t - this.offsetTime > t)); ) g < y - 1 ? (g += 1) : (v = !1);
                            if (((c = g), !(a = 1 === u.h))) {
                                if (t >= m.t - this.offsetTime) p = 1;
                                else if (t < u.t - this.offsetTime) p = 0;
                                else {
                                    var b;
                                    u.__fnct ? (b = u.__fnct) : ((b = BezierFactory.getBezierEasing(u.o.x, u.o.y, u.i.x, u.i.y).get), (u.__fnct = b)),
                                        (p = b((t - (u.t - this.offsetTime)) / (m.t - this.offsetTime - (u.t - this.offsetTime))));
                                }
                                r = m.s ? m.s[0] : u.e[0];
                            }
                            s = u.s[0];
                        }
                        for (l = e._length, h = s.i[0].length, i.lastIndex = c, n = 0; n < l; n += 1)
                            for (o = 0; o < h; o += 1)
                                (d = a ? s.i[n][o] : s.i[n][o] + (r.i[n][o] - s.i[n][o]) * p),
                                    (e.i[n][o] = d),
                                    (d = a ? s.o[n][o] : s.o[n][o] + (r.o[n][o] - s.o[n][o]) * p),
                                    (e.o[n][o] = d),
                                    (d = a ? s.v[n][o] : s.v[n][o] + (r.v[n][o] - s.v[n][o]) * p),
                                    (e.v[n][o] = d);
                    }
                    function i() {
                        this.paths = this.localShapeCollection;
                    }
                    function s(t) {
                        (function (t, e) {
                            if (t._length !== e._length || t.c !== e.c) return !1;
                            var i,
                                s = t._length;
                            for (i = 0; i < s; i += 1) if (t.v[i][0] !== e.v[i][0] || t.v[i][1] !== e.v[i][1] || t.o[i][0] !== e.o[i][0] || t.o[i][1] !== e.o[i][1] || t.i[i][0] !== e.i[i][0] || t.i[i][1] !== e.i[i][1]) return !1;
                            return !0;
                        })(this.v, t) || ((this.v = shape_pool.clone(t)), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), (this._mdf = !0), (this.paths = this.localShapeCollection));
                    }
                    function r() {
                        if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length)
                            if (this.lock) this.setVValue(this.pv);
                            else {
                                (this.lock = !0), (this._mdf = !1);
                                var t,
                                    e = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k,
                                    i = this.effectsSequence.length;
                                for (t = 0; t < i; t += 1) e = this.effectsSequence[t](e);
                                this.setVValue(e), (this.lock = !1), (this.frameId = this.elem.globalData.frameId);
                            }
                    }
                    function a(t, e, s) {
                        (this.propType = "shape"), (this.comp = t.comp), (this.container = t), (this.elem = t), (this.data = e), (this.k = !1), (this.kf = !1), (this._mdf = !1);
                        var r = 3 === s ? e.pt.k : e.ks.k;
                        (this.v = shape_pool.clone(r)),
                            (this.pv = shape_pool.clone(this.v)),
                            (this.localShapeCollection = shapeCollection_pool.newShapeCollection()),
                            (this.paths = this.localShapeCollection),
                            this.paths.addShape(this.v),
                            (this.reset = i),
                            (this.effectsSequence = []);
                    }
                    function n(t) {
                        this.effectsSequence.push(t), this.container.addDynamicProperty(this);
                    }
                    function o(e, s, r) {
                        (this.propType = "shape"), (this.comp = e.comp), (this.elem = e), (this.container = e), (this.offsetTime = e.data.st), (this.keyframes = 3 === r ? s.pt.k : s.ks.k), (this.k = !0), (this.kf = !0);
                        var a = this.keyframes[0].s[0].i.length;
                        this.keyframes[0].s[0].i[0].length,
                            (this.v = shape_pool.newElement()),
                            this.v.setPathData(this.keyframes[0].s[0].c, a),
                            (this.pv = shape_pool.clone(this.v)),
                            (this.localShapeCollection = shapeCollection_pool.newShapeCollection()),
                            (this.paths = this.localShapeCollection),
                            this.paths.addShape(this.v),
                            (this.lastFrame = t),
                            (this.reset = i),
                            (this._caching = { lastFrame: t, lastIndex: 0 }),
                            (this.effectsSequence = [
                                function () {
                                    var e = this.comp.renderedFrame - this.offsetTime,
                                        i = this.keyframes[0].t - this.offsetTime,
                                        s = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
                                        r = this._caching.lastFrame;
                                    return (
                                        (r !== t && ((r < i && e < i) || (s < r && s < e))) || ((this._caching.lastIndex = r < e ? this._caching.lastIndex : 0), this.interpolateShape(e, this.pv, this._caching)),
                                        (this._caching.lastFrame = e),
                                        this.pv
                                    );
                                }.bind(this),
                            ]);
                    }
                    (a.prototype.interpolateShape = e),
                        (a.prototype.getValue = r),
                        (a.prototype.setVValue = s),
                        (a.prototype.addEffect = n),
                        (o.prototype.getValue = r),
                        (o.prototype.interpolateShape = e),
                        (o.prototype.setVValue = s),
                        (o.prototype.addEffect = n);
                    var l = (function () {
                            var t = roundCorner;
                            function e(t, e) {
                                (this.v = shape_pool.newElement()),
                                    this.v.setPathData(!0, 4),
                                    (this.localShapeCollection = shapeCollection_pool.newShapeCollection()),
                                    (this.paths = this.localShapeCollection),
                                    this.localShapeCollection.addShape(this.v),
                                    (this.d = e.d),
                                    (this.elem = t),
                                    (this.comp = t.comp),
                                    (this.frameId = -1),
                                    this.initDynamicPropertyContainer(t),
                                    (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                                    (this.s = PropertyFactory.getProp(t, e.s, 1, 0, this)),
                                    this.dynamicProperties.length ? (this.k = !0) : ((this.k = !1), this.convertEllToPath());
                            }
                            return (
                                (e.prototype = {
                                    reset: i,
                                    getValue: function () {
                                        this.elem.globalData.frameId !== this.frameId && ((this.frameId = this.elem.globalData.frameId), this.iterateDynamicProperties(), this._mdf && this.convertEllToPath());
                                    },
                                    convertEllToPath: function () {
                                        var e = this.p.v[0],
                                            i = this.p.v[1],
                                            s = this.s.v[0] / 2,
                                            r = this.s.v[1] / 2,
                                            a = 3 !== this.d,
                                            n = this.v;
                                        (n.v[0][0] = e),
                                            (n.v[0][1] = i - r),
                                            (n.v[1][0] = a ? e + s : e - s),
                                            (n.v[1][1] = i),
                                            (n.v[2][0] = e),
                                            (n.v[2][1] = i + r),
                                            (n.v[3][0] = a ? e - s : e + s),
                                            (n.v[3][1] = i),
                                            (n.i[0][0] = a ? e - s * t : e + s * t),
                                            (n.i[0][1] = i - r),
                                            (n.i[1][0] = a ? e + s : e - s),
                                            (n.i[1][1] = i - r * t),
                                            (n.i[2][0] = a ? e + s * t : e - s * t),
                                            (n.i[2][1] = i + r),
                                            (n.i[3][0] = a ? e - s : e + s),
                                            (n.i[3][1] = i + r * t),
                                            (n.o[0][0] = a ? e + s * t : e - s * t),
                                            (n.o[0][1] = i - r),
                                            (n.o[1][0] = a ? e + s : e - s),
                                            (n.o[1][1] = i + r * t),
                                            (n.o[2][0] = a ? e - s * t : e + s * t),
                                            (n.o[2][1] = i + r),
                                            (n.o[3][0] = a ? e - s : e + s),
                                            (n.o[3][1] = i - r * t);
                                    },
                                }),
                                extendPrototype([DynamicPropertyContainer], e),
                                e
                            );
                        })(),
                        h = (function () {
                            function t(t, e) {
                                (this.v = shape_pool.newElement()),
                                    this.v.setPathData(!0, 0),
                                    (this.elem = t),
                                    (this.comp = t.comp),
                                    (this.data = e),
                                    (this.frameId = -1),
                                    (this.d = e.d),
                                    this.initDynamicPropertyContainer(t),
                                    1 === e.sy
                                        ? ((this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this)), (this.is = PropertyFactory.getProp(t, e.is, 0, 0.01, this)), (this.convertToPath = this.convertStarToPath))
                                        : (this.convertToPath = this.convertPolygonToPath),
                                    (this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this)),
                                    (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                                    (this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this)),
                                    (this.or = PropertyFactory.getProp(t, e.or, 0, 0, this)),
                                    (this.os = PropertyFactory.getProp(t, e.os, 0, 0.01, this)),
                                    (this.localShapeCollection = shapeCollection_pool.newShapeCollection()),
                                    this.localShapeCollection.addShape(this.v),
                                    (this.paths = this.localShapeCollection),
                                    this.dynamicProperties.length ? (this.k = !0) : ((this.k = !1), this.convertToPath());
                            }
                            return (
                                (t.prototype = {
                                    reset: i,
                                    getValue: function () {
                                        this.elem.globalData.frameId !== this.frameId && ((this.frameId = this.elem.globalData.frameId), this.iterateDynamicProperties(), this._mdf && this.convertToPath());
                                    },
                                    convertStarToPath: function () {
                                        var t,
                                            e,
                                            i,
                                            s,
                                            r = 2 * Math.floor(this.pt.v),
                                            a = (2 * Math.PI) / r,
                                            n = !0,
                                            o = this.or.v,
                                            l = this.ir.v,
                                            h = this.os.v,
                                            p = this.is.v,
                                            d = (2 * Math.PI * o) / (2 * r),
                                            c = (2 * Math.PI * l) / (2 * r),
                                            f = -Math.PI / 2;
                                        f += this.r.v;
                                        var u = 3 === this.data.d ? -1 : 1;
                                        for (t = this.v._length = 0; t < r; t += 1) {
                                            (i = n ? h : p), (s = n ? d : c);
                                            var m = (e = n ? o : l) * Math.cos(f),
                                                g = e * Math.sin(f),
                                                y = 0 === m && 0 === g ? 0 : g / Math.sqrt(m * m + g * g),
                                                v = 0 === m && 0 === g ? 0 : -m / Math.sqrt(m * m + g * g);
                                            (m += +this.p.v[0]), (g += +this.p.v[1]), this.v.setTripleAt(m, g, m - y * s * i * u, g - v * s * i * u, m + y * s * i * u, g + v * s * i * u, t, !0), (n = !n), (f += a * u);
                                        }
                                    },
                                    convertPolygonToPath: function () {
                                        var t,
                                            e = Math.floor(this.pt.v),
                                            i = (2 * Math.PI) / e,
                                            s = this.or.v,
                                            r = this.os.v,
                                            a = (2 * Math.PI * s) / (4 * e),
                                            n = -Math.PI / 2,
                                            o = 3 === this.data.d ? -1 : 1;
                                        for (n += this.r.v, t = this.v._length = 0; t < e; t += 1) {
                                            var l = s * Math.cos(n),
                                                h = s * Math.sin(n),
                                                p = 0 === l && 0 === h ? 0 : h / Math.sqrt(l * l + h * h),
                                                d = 0 === l && 0 === h ? 0 : -l / Math.sqrt(l * l + h * h);
                                            (l += +this.p.v[0]), (h += +this.p.v[1]), this.v.setTripleAt(l, h, l - p * a * r * o, h - d * a * r * o, l + p * a * r * o, h + d * a * r * o, t, !0), (n += i * o);
                                        }
                                        (this.paths.length = 0), (this.paths[0] = this.v);
                                    },
                                }),
                                extendPrototype([DynamicPropertyContainer], t),
                                t
                            );
                        })(),
                        p = (function () {
                            function t(t, e) {
                                (this.v = shape_pool.newElement()),
                                    (this.v.c = !0),
                                    (this.localShapeCollection = shapeCollection_pool.newShapeCollection()),
                                    this.localShapeCollection.addShape(this.v),
                                    (this.paths = this.localShapeCollection),
                                    (this.elem = t),
                                    (this.comp = t.comp),
                                    (this.frameId = -1),
                                    (this.d = e.d),
                                    this.initDynamicPropertyContainer(t),
                                    (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                                    (this.s = PropertyFactory.getProp(t, e.s, 1, 0, this)),
                                    (this.r = PropertyFactory.getProp(t, e.r, 0, 0, this)),
                                    this.dynamicProperties.length ? (this.k = !0) : ((this.k = !1), this.convertRectToPath());
                            }
                            return (
                                (t.prototype = {
                                    convertRectToPath: function () {
                                        var t = this.p.v[0],
                                            e = this.p.v[1],
                                            i = this.s.v[0] / 2,
                                            s = this.s.v[1] / 2,
                                            r = bm_min(i, s, this.r.v),
                                            a = r * (1 - roundCorner);
                                        (this.v._length = 0),
                                            2 === this.d || 1 === this.d
                                                ? (this.v.setTripleAt(t + i, e - s + r, t + i, e - s + r, t + i, e - s + a, 0, !0),
                                                  this.v.setTripleAt(t + i, e + s - r, t + i, e + s - a, t + i, e + s - r, 1, !0),
                                                  0 !== r
                                                      ? (this.v.setTripleAt(t + i - r, e + s, t + i - r, e + s, t + i - a, e + s, 2, !0),
                                                        this.v.setTripleAt(t - i + r, e + s, t - i + a, e + s, t - i + r, e + s, 3, !0),
                                                        this.v.setTripleAt(t - i, e + s - r, t - i, e + s - r, t - i, e + s - a, 4, !0),
                                                        this.v.setTripleAt(t - i, e - s + r, t - i, e - s + a, t - i, e - s + r, 5, !0),
                                                        this.v.setTripleAt(t - i + r, e - s, t - i + r, e - s, t - i + a, e - s, 6, !0),
                                                        this.v.setTripleAt(t + i - r, e - s, t + i - a, e - s, t + i - r, e - s, 7, !0))
                                                      : (this.v.setTripleAt(t - i, e + s, t - i + a, e + s, t - i, e + s, 2), this.v.setTripleAt(t - i, e - s, t - i, e - s + a, t - i, e - s, 3)))
                                                : (this.v.setTripleAt(t + i, e - s + r, t + i, e - s + a, t + i, e - s + r, 0, !0),
                                                  0 !== r
                                                      ? (this.v.setTripleAt(t + i - r, e - s, t + i - r, e - s, t + i - a, e - s, 1, !0),
                                                        this.v.setTripleAt(t - i + r, e - s, t - i + a, e - s, t - i + r, e - s, 2, !0),
                                                        this.v.setTripleAt(t - i, e - s + r, t - i, e - s + r, t - i, e - s + a, 3, !0),
                                                        this.v.setTripleAt(t - i, e + s - r, t - i, e + s - a, t - i, e + s - r, 4, !0),
                                                        this.v.setTripleAt(t - i + r, e + s, t - i + r, e + s, t - i + a, e + s, 5, !0),
                                                        this.v.setTripleAt(t + i - r, e + s, t + i - a, e + s, t + i - r, e + s, 6, !0),
                                                        this.v.setTripleAt(t + i, e + s - r, t + i, e + s - r, t + i, e + s - a, 7, !0))
                                                      : (this.v.setTripleAt(t - i, e - s, t - i + a, e - s, t - i, e - s, 1, !0),
                                                        this.v.setTripleAt(t - i, e + s, t - i, e + s - a, t - i, e + s, 2, !0),
                                                        this.v.setTripleAt(t + i, e + s, t + i - a, e + s, t + i, e + s, 3, !0)));
                                    },
                                    getValue: function (t) {
                                        this.elem.globalData.frameId !== this.frameId && ((this.frameId = this.elem.globalData.frameId), this.iterateDynamicProperties(), this._mdf && this.convertRectToPath());
                                    },
                                    reset: i,
                                }),
                                extendPrototype([DynamicPropertyContainer], t),
                                t
                            );
                        })(),
                        d = {
                            getShapeProp: function (t, e, i) {
                                var s;
                                return (
                                    3 === i || 4 === i ? (s = (3 === i ? e.pt : e.ks).k.length ? new o(t, e, i) : new a(t, e, i)) : 5 === i ? (s = new p(t, e)) : 6 === i ? (s = new l(t, e)) : 7 === i && (s = new h(t, e)),
                                    s.k && t.addDynamicProperty(s),
                                    s
                                );
                            },
                            getConstructorFunction: function () {
                                return a;
                            },
                            getKeyframedConstructorFunction: function () {
                                return o;
                            },
                        };
                    return d;
                })(),
                ShapeModifiers =
                    ((Tr = {}),
                    (Ur = {}),
                    (Tr.registerModifier = function (t, e) {
                        Ur[t] || (Ur[t] = e);
                    }),
                    (Tr.getModifier = function (t, e, i) {
                        return new Ur[t](e, i);
                    }),
                    Tr),
                Tr,
                Ur;
            function ShapeModifier() {}
            function TrimModifier() {}
            function RoundCornersModifier() {}
            function RepeaterModifier() {}
            function ShapeCollection() {
                (this._length = 0), (this._maxLength = 4), (this.shapes = createSizedArray(this._maxLength));
            }
            function DashProperty(t, e, i, s) {
                (this.elem = t),
                    (this.frameId = -1),
                    (this.dataProps = createSizedArray(e.length)),
                    (this.renderer = i),
                    (this.k = !1),
                    (this.dashStr = ""),
                    (this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0)),
                    (this.dashoffset = createTypedArray("float32", 1)),
                    this.initDynamicPropertyContainer(s);
                var r,
                    a,
                    n = e.length || 0;
                for (r = 0; r < n; r += 1) (a = PropertyFactory.getProp(t, e[r].v, 0, 0, this)), (this.k = a.k || this.k), (this.dataProps[r] = { n: e[r].n, p: a });
                this.k || this.getValue(!0), (this._isAnimated = this.k);
            }
            function GradientProperty(t, e, i) {
                (this.data = e), (this.c = createTypedArray("uint8c", 4 * e.p));
                var s = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
                (this.o = createTypedArray("float32", s)),
                    (this._cmdf = !1),
                    (this._omdf = !1),
                    (this._collapsable = this.checkCollapsable()),
                    (this._hasOpacity = s),
                    this.initDynamicPropertyContainer(i),
                    (this.prop = PropertyFactory.getProp(t, e.k, 1, null, this)),
                    (this.k = this.prop.k),
                    this.getValue(!0);
            }
            (ShapeModifier.prototype.initModifierProperties = function () {}),
                (ShapeModifier.prototype.addShapeToModifier = function () {}),
                (ShapeModifier.prototype.addShape = function (t) {
                    if (!this.closed) {
                        var e = { shape: t.sh, data: t, localShapeCollection: shapeCollection_pool.newShapeCollection() };
                        this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated();
                    }
                }),
                (ShapeModifier.prototype.init = function (t, e) {
                    (this.shapes = []),
                        (this.elem = t),
                        this.initDynamicPropertyContainer(t),
                        this.initModifierProperties(t, e),
                        (this.frameId = initialDefaultFrame),
                        (this.closed = !1),
                        (this.k = !1),
                        this.dynamicProperties.length ? (this.k = !0) : this.getValue(!0);
                }),
                (ShapeModifier.prototype.processKeys = function () {
                    this.elem.globalData.frameId !== this.frameId && ((this.frameId = this.elem.globalData.frameId), this.iterateDynamicProperties());
                }),
                extendPrototype([DynamicPropertyContainer], ShapeModifier),
                extendPrototype([ShapeModifier], TrimModifier),
                (TrimModifier.prototype.initModifierProperties = function (t, e) {
                    (this.s = PropertyFactory.getProp(t, e.s, 0, 0.01, this)),
                        (this.e = PropertyFactory.getProp(t, e.e, 0, 0.01, this)),
                        (this.o = PropertyFactory.getProp(t, e.o, 0, 0, this)),
                        (this.sValue = 0),
                        (this.eValue = 0),
                        (this.getValue = this.processKeys),
                        (this.m = e.m),
                        (this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length);
                }),
                (TrimModifier.prototype.addShapeToModifier = function (t) {
                    t.pathsData = [];
                }),
                (TrimModifier.prototype.calculateShapeEdges = function (t, e, i, s, r) {
                    var a = [];
                    e <= 1 ? a.push({ s: t, e: e }) : 1 <= t ? a.push({ s: t - 1, e: e - 1 }) : (a.push({ s: t, e: 1 }), a.push({ s: 0, e: e - 1 }));
                    var n,
                        o,
                        l = [],
                        h = a.length;
                    for (n = 0; n < h; n += 1) {
                        var p, d;
                        (o = a[n]).e * r < s || o.s * r > s + i || ((p = o.s * r <= s ? 0 : (o.s * r - s) / i), (d = o.e * r >= s + i ? 1 : (o.e * r - s) / i), l.push([p, d]));
                    }
                    return l.length || l.push([0, 0]), l;
                }),
                (TrimModifier.prototype.releasePathsData = function (t) {
                    var e,
                        i = t.length;
                    for (e = 0; e < i; e += 1) segments_length_pool.release(t[e]);
                    return (t.length = 0), t;
                }),
                (TrimModifier.prototype.processShapes = function (t) {
                    var e, i, s;
                    if (this._mdf || t) {
                        var r = (this.o.v % 360) / 360;
                        if ((r < 0 && (r += 1), (e = (1 < this.s.v ? 1 : this.s.v < 0 ? 0 : this.s.v) + r), (i = (1 < this.e.v ? 1 : this.e.v < 0 ? 0 : this.e.v) + r) < e)) {
                            var a = e;
                            (e = i), (i = a);
                        }
                        (e = 1e-4 * Math.round(1e4 * e)), (i = 1e-4 * Math.round(1e4 * i)), (this.sValue = e), (this.eValue = i);
                    } else (e = this.sValue), (i = this.eValue);
                    var n,
                        o,
                        l,
                        h,
                        p,
                        d,
                        c = this.shapes.length,
                        f = 0;
                    if (i === e) for (n = 0; n < c; n += 1) this.shapes[n].localShapeCollection.releaseShapes(), (this.shapes[n].shape._mdf = !0), (this.shapes[n].shape.paths = this.shapes[n].localShapeCollection);
                    else if ((1 === i && 0 === e) || (0 === i && 1 === e)) {
                        if (this._mdf) for (n = 0; n < c; n += 1) (this.shapes[n].pathsData.length = 0), (this.shapes[n].shape._mdf = !0);
                    } else {
                        var u,
                            m,
                            g = [];
                        for (n = 0; n < c; n += 1)
                            if ((u = this.shapes[n]).shape._mdf || this._mdf || t || 2 === this.m) {
                                if (((l = (s = u.shape.paths)._length), (d = 0), !u.shape._mdf && u.pathsData.length)) d = u.totalShapeLength;
                                else {
                                    for (h = this.releasePathsData(u.pathsData), o = 0; o < l; o += 1) (p = bez.getSegmentsLength(s.shapes[o])), h.push(p), (d += p.totalLength);
                                    (u.totalShapeLength = d), (u.pathsData = h);
                                }
                                (f += d), (u.shape._mdf = !0);
                            } else u.shape.paths = u.localShapeCollection;
                        var y,
                            v = e,
                            b = i,
                            w = 0;
                        for (n = c - 1; 0 <= n; n -= 1)
                            if ((u = this.shapes[n]).shape._mdf) {
                                for (
                                    (m = u.localShapeCollection).releaseShapes(), 2 === this.m && 1 < c ? ((y = this.calculateShapeEdges(e, i, u.totalShapeLength, w, f)), (w += u.totalShapeLength)) : (y = [[v, b]]), l = y.length, o = 0;
                                    o < l;
                                    o += 1
                                ) {
                                    (v = y[o][0]),
                                        (b = y[o][1]),
                                        (g.length = 0),
                                        b <= 1
                                            ? g.push({ s: u.totalShapeLength * v, e: u.totalShapeLength * b })
                                            : 1 <= v
                                            ? g.push({ s: u.totalShapeLength * (v - 1), e: u.totalShapeLength * (b - 1) })
                                            : (g.push({ s: u.totalShapeLength * v, e: u.totalShapeLength }), g.push({ s: 0, e: u.totalShapeLength * (b - 1) }));
                                    var S = this.addShapes(u, g[0]);
                                    if (g[0].s !== g[0].e) {
                                        if (1 < g.length)
                                            if (u.shape.paths.shapes[u.shape.paths._length - 1].c) {
                                                var k = S.pop();
                                                this.addPaths(S, m), (S = this.addShapes(u, g[1], k));
                                            } else this.addPaths(S, m), (S = this.addShapes(u, g[1]));
                                        this.addPaths(S, m);
                                    }
                                }
                                u.shape.paths = m;
                            }
                    }
                }),
                (TrimModifier.prototype.addPaths = function (t, e) {
                    var i,
                        s = t.length;
                    for (i = 0; i < s; i += 1) e.addShape(t[i]);
                }),
                (TrimModifier.prototype.addSegment = function (t, e, i, s, r, a, n) {
                    r.setXYAt(e[0], e[1], "o", a), r.setXYAt(i[0], i[1], "i", a + 1), n && r.setXYAt(t[0], t[1], "v", a), r.setXYAt(s[0], s[1], "v", a + 1);
                }),
                (TrimModifier.prototype.addSegmentFromArray = function (t, e, i, s) {
                    e.setXYAt(t[1], t[5], "o", i), e.setXYAt(t[2], t[6], "i", i + 1), s && e.setXYAt(t[0], t[4], "v", i), e.setXYAt(t[3], t[7], "v", i + 1);
                }),
                (TrimModifier.prototype.addShapes = function (t, e, i) {
                    var s,
                        r,
                        a,
                        n,
                        o,
                        l,
                        h,
                        p,
                        d = t.pathsData,
                        c = t.shape.paths.shapes,
                        f = t.shape.paths._length,
                        u = 0,
                        m = [],
                        g = !0;
                    for (p = i ? ((o = i._length), i._length) : ((i = shape_pool.newElement()), (o = 0)), m.push(i), s = 0; s < f; s += 1) {
                        for (l = d[s].lengths, i.c = c[s].c, a = c[s].c ? l.length : l.length + 1, r = 1; r < a; r += 1)
                            if (u + (n = l[r - 1]).addedLength < e.s) (u += n.addedLength), (i.c = !1);
                            else {
                                if (u > e.e) {
                                    i.c = !1;
                                    break;
                                }
                                e.s <= u && e.e >= u + n.addedLength
                                    ? (this.addSegment(c[s].v[r - 1], c[s].o[r - 1], c[s].i[r], c[s].v[r], i, o, g), (g = !1))
                                    : ((h = bez.getNewSegment(c[s].v[r - 1], c[s].v[r], c[s].o[r - 1], c[s].i[r], (e.s - u) / n.addedLength, (e.e - u) / n.addedLength, l[r - 1])), this.addSegmentFromArray(h, i, o, g), (g = !1), (i.c = !1)),
                                    (u += n.addedLength),
                                    (o += 1);
                            }
                        if (c[s].c && l.length) {
                            if (((n = l[r - 1]), u <= e.e)) {
                                var y = l[r - 1].addedLength;
                                e.s <= u && e.e >= u + y
                                    ? (this.addSegment(c[s].v[r - 1], c[s].o[r - 1], c[s].i[0], c[s].v[0], i, o, g), (g = !1))
                                    : ((h = bez.getNewSegment(c[s].v[r - 1], c[s].v[0], c[s].o[r - 1], c[s].i[0], (e.s - u) / y, (e.e - u) / y, l[r - 1])), this.addSegmentFromArray(h, i, o, g), (g = !1), (i.c = !1));
                            } else i.c = !1;
                            (u += n.addedLength), (o += 1);
                        }
                        if ((i._length && (i.setXYAt(i.v[p][0], i.v[p][1], "i", p), i.setXYAt(i.v[i._length - 1][0], i.v[i._length - 1][1], "o", i._length - 1)), u > e.e)) break;
                        s < f - 1 && ((i = shape_pool.newElement()), (g = !0), m.push(i), (o = 0));
                    }
                    return m;
                }),
                ShapeModifiers.registerModifier("tm", TrimModifier),
                extendPrototype([ShapeModifier], RoundCornersModifier),
                (RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
                    (this.getValue = this.processKeys), (this.rd = PropertyFactory.getProp(t, e.r, 0, null, this)), (this._isAnimated = !!this.rd.effectsSequence.length);
                }),
                (RoundCornersModifier.prototype.processPath = function (t, e) {
                    var i = shape_pool.newElement();
                    i.c = t.c;
                    var s,
                        r,
                        a,
                        n,
                        o,
                        l,
                        h,
                        p,
                        d,
                        c,
                        f,
                        u,
                        m,
                        g = t._length,
                        y = 0;
                    for (s = 0; s < g; s += 1)
                        (r = t.v[s]),
                            (n = t.o[s]),
                            (a = t.i[s]),
                            r[0] === n[0] && r[1] === n[1] && r[0] === a[0] && r[1] === a[1]
                                ? (0 !== s && s !== g - 1) || t.c
                                    ? ((o = 0 === s ? t.v[g - 1] : t.v[s - 1]),
                                      (h = (l = Math.sqrt(Math.pow(r[0] - o[0], 2) + Math.pow(r[1] - o[1], 2))) ? Math.min(l / 2, e) / l : 0),
                                      (p = u = r[0] + (o[0] - r[0]) * h),
                                      (d = m = r[1] - (r[1] - o[1]) * h),
                                      (c = p - (p - r[0]) * roundCorner),
                                      (f = d - (d - r[1]) * roundCorner),
                                      i.setTripleAt(p, d, c, f, u, m, y),
                                      (y += 1),
                                      (o = s === g - 1 ? t.v[0] : t.v[s + 1]),
                                      (h = (l = Math.sqrt(Math.pow(r[0] - o[0], 2) + Math.pow(r[1] - o[1], 2))) ? Math.min(l / 2, e) / l : 0),
                                      (p = c = r[0] + (o[0] - r[0]) * h),
                                      (d = f = r[1] + (o[1] - r[1]) * h),
                                      (u = p - (p - r[0]) * roundCorner),
                                      (m = d - (d - r[1]) * roundCorner),
                                      i.setTripleAt(p, d, c, f, u, m, y))
                                    : i.setTripleAt(r[0], r[1], n[0], n[1], a[0], a[1], y)
                                : i.setTripleAt(t.v[s][0], t.v[s][1], t.o[s][0], t.o[s][1], t.i[s][0], t.i[s][1], y),
                            (y += 1);
                    return i;
                }),
                (RoundCornersModifier.prototype.processShapes = function (t) {
                    var e,
                        i,
                        s,
                        r,
                        a,
                        n,
                        o = this.shapes.length,
                        l = this.rd.v;
                    if (0 !== l)
                        for (i = 0; i < o; i += 1) {
                            if (((a = this.shapes[i]).shape.paths, (n = a.localShapeCollection), a.shape._mdf || this._mdf || t))
                                for (n.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, r = a.shape.paths._length, s = 0; s < r; s += 1) n.addShape(this.processPath(e[s], l));
                            a.shape.paths = a.localShapeCollection;
                        }
                    this.dynamicProperties.length || (this._mdf = !1);
                }),
                ShapeModifiers.registerModifier("rd", RoundCornersModifier),
                extendPrototype([ShapeModifier], RepeaterModifier),
                (RepeaterModifier.prototype.initModifierProperties = function (t, e) {
                    (this.getValue = this.processKeys),
                        (this.c = PropertyFactory.getProp(t, e.c, 0, null, this)),
                        (this.o = PropertyFactory.getProp(t, e.o, 0, null, this)),
                        (this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this)),
                        (this.so = PropertyFactory.getProp(t, e.tr.so, 0, 0.01, this)),
                        (this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, 0.01, this)),
                        (this.data = e),
                        this.dynamicProperties.length || this.getValue(!0),
                        (this._isAnimated = !!this.dynamicProperties.length),
                        (this.pMatrix = new Matrix()),
                        (this.rMatrix = new Matrix()),
                        (this.sMatrix = new Matrix()),
                        (this.tMatrix = new Matrix()),
                        (this.matrix = new Matrix());
                }),
                (RepeaterModifier.prototype.applyTransforms = function (t, e, i, s, r, a) {
                    var n = a ? -1 : 1,
                        o = s.s.v[0] + (1 - s.s.v[0]) * (1 - r),
                        l = s.s.v[1] + (1 - s.s.v[1]) * (1 - r);
                    t.translate(s.p.v[0] * n * r, s.p.v[1] * n * r, s.p.v[2]),
                        e.translate(-s.a.v[0], -s.a.v[1], s.a.v[2]),
                        e.rotate(-s.r.v * n * r),
                        e.translate(s.a.v[0], s.a.v[1], s.a.v[2]),
                        i.translate(-s.a.v[0], -s.a.v[1], s.a.v[2]),
                        i.scale(a ? 1 / o : o, a ? 1 / l : l),
                        i.translate(s.a.v[0], s.a.v[1], s.a.v[2]);
                }),
                (RepeaterModifier.prototype.init = function (t, e, i, s) {
                    for (
                        this.elem = t,
                            this.arr = e,
                            this.pos = i,
                            this.elemsData = s,
                            this._currentCopies = 0,
                            this._elements = [],
                            this._groups = [],
                            this.frameId = -1,
                            this.initDynamicPropertyContainer(t),
                            this.initModifierProperties(t, e[i]);
                        0 < i;

                    )
                        (i -= 1), this._elements.unshift(e[i]);
                    this.dynamicProperties.length ? (this.k = !0) : this.getValue(!0);
                }),
                (RepeaterModifier.prototype.resetElements = function (t) {
                    var e,
                        i = t.length;
                    for (e = 0; e < i; e += 1) (t[e]._processed = !1), "gr" === t[e].ty && this.resetElements(t[e].it);
                }),
                (RepeaterModifier.prototype.cloneElements = function (t) {
                    t.length;
                    var e = JSON.parse(JSON.stringify(t));
                    return this.resetElements(e), e;
                }),
                (RepeaterModifier.prototype.changeGroupRender = function (t, e) {
                    var i,
                        s = t.length;
                    for (i = 0; i < s; i += 1) (t[i]._render = e), "gr" === t[i].ty && this.changeGroupRender(t[i].it, e);
                }),
                (RepeaterModifier.prototype.processShapes = function (t) {
                    var e, i, s, r, a;
                    if (this._mdf || t) {
                        var n,
                            o = Math.ceil(this.c.v);
                        if (this._groups.length < o) {
                            for (; this._groups.length < o; ) {
                                var l = { it: this.cloneElements(this._elements), ty: "gr" };
                                l.it.push({
                                    a: { a: 0, ix: 1, k: [0, 0] },
                                    nm: "Transform",
                                    o: { a: 0, ix: 7, k: 100 },
                                    p: { a: 0, ix: 2, k: [0, 0] },
                                    r: {
                                        a: 1,
                                        ix: 6,
                                        k: [
                                            { s: 0, e: 0, t: 0 },
                                            { s: 0, e: 0, t: 1 },
                                        ],
                                    },
                                    s: { a: 0, ix: 3, k: [100, 100] },
                                    sa: { a: 0, ix: 5, k: 0 },
                                    sk: { a: 0, ix: 4, k: 0 },
                                    ty: "tr",
                                }),
                                    this.arr.splice(0, 0, l),
                                    this._groups.splice(0, 0, l),
                                    (this._currentCopies += 1);
                            }
                            this.elem.reloadShapes();
                        }
                        for (s = a = 0; s <= this._groups.length - 1; s += 1) (n = a < o), (this._groups[s]._render = n), this.changeGroupRender(this._groups[s].it, n), (a += 1);
                        this._currentCopies = o;
                        var h = this.o.v,
                            p = h % 1,
                            d = 0 < h ? Math.floor(h) : Math.ceil(h),
                            c = (this.tr.v.props, this.pMatrix.props),
                            f = this.rMatrix.props,
                            u = this.sMatrix.props;
                        this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
                        var m,
                            g,
                            y = 0;
                        if (0 < h) {
                            for (; y < d; ) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), (y += 1);
                            p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1), (y += p));
                        } else if (h < 0) {
                            for (; d < y; ) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), (y -= 1);
                            p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0), (y -= p));
                        }
                        for (s = 1 === this.data.m ? 0 : this._currentCopies - 1, r = 1 === this.data.m ? 1 : -1, a = this._currentCopies; a; ) {
                            if (
                                ((g = (i = (e = this.elemsData[s].it)[e.length - 1].transform.mProps.v.props).length),
                                (e[e.length - 1].transform.mProps._mdf = !0),
                                (e[e.length - 1].transform.op._mdf = !0),
                                (e[e.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (s / (this._currentCopies - 1))),
                                0 !== y)
                            ) {
                                for (
                                    ((0 !== s && 1 === r) || (s !== this._currentCopies - 1 && -1 === r)) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1),
                                        this.matrix.transform(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]),
                                        this.matrix.transform(u[0], u[1], u[2], u[3], u[4], u[5], u[6], u[7], u[8], u[9], u[10], u[11], u[12], u[13], u[14], u[15]),
                                        this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]),
                                        m = 0;
                                    m < g;
                                    m += 1
                                )
                                    i[m] = this.matrix.props[m];
                                this.matrix.reset();
                            } else for (this.matrix.reset(), m = 0; m < g; m += 1) i[m] = this.matrix.props[m];
                            (y += 1), (a -= 1), (s += r);
                        }
                    } else
                        for (a = this._currentCopies, s = 0, r = 1; a; )
                            (i = (e = this.elemsData[s].it)[e.length - 1].transform.mProps.v.props), (e[e.length - 1].transform.mProps._mdf = !1), (e[e.length - 1].transform.op._mdf = !1), (a -= 1), (s += r);
                }),
                (RepeaterModifier.prototype.addShape = function () {}),
                ShapeModifiers.registerModifier("rp", RepeaterModifier),
                (ShapeCollection.prototype.addShape = function (t) {
                    this._length === this._maxLength && ((this.shapes = this.shapes.concat(createSizedArray(this._maxLength))), (this._maxLength *= 2)), (this.shapes[this._length] = t), (this._length += 1);
                }),
                (ShapeCollection.prototype.releaseShapes = function () {
                    var t;
                    for (t = 0; t < this._length; t += 1) shape_pool.release(this.shapes[t]);
                    this._length = 0;
                }),
                (DashProperty.prototype.getValue = function (t) {
                    if ((this.elem.globalData.frameId !== this.frameId || t) && ((this.frameId = this.elem.globalData.frameId), this.iterateDynamicProperties(), (this._mdf = this._mdf || t), this._mdf)) {
                        var e = 0,
                            i = this.dataProps.length;
                        for ("svg" === this.renderer && (this.dashStr = ""), e = 0; e < i; e += 1)
                            "o" != this.dataProps[e].n ? ("svg" === this.renderer ? (this.dashStr += " " + this.dataProps[e].p.v) : (this.dashArray[e] = this.dataProps[e].p.v)) : (this.dashoffset[0] = this.dataProps[e].p.v);
                    }
                }),
                extendPrototype([DynamicPropertyContainer], DashProperty),
                (GradientProperty.prototype.comparePoints = function (t, e) {
                    for (var i = 0, s = this.o.length / 2; i < s; ) {
                        if (0.01 < Math.abs(t[4 * i] - t[4 * e + 2 * i])) return !1;
                        i += 1;
                    }
                    return !0;
                }),
                (GradientProperty.prototype.checkCollapsable = function () {
                    if (this.o.length / 2 != this.c.length / 4) return !1;
                    if (this.data.k.k[0].s)
                        for (var t = 0, e = this.data.k.k.length; t < e; ) {
                            if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
                            t += 1;
                        }
                    else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
                    return !0;
                }),
                (GradientProperty.prototype.getValue = function (t) {
                    if ((this.prop.getValue(), (this._mdf = !1), (this._cmdf = !1), (this._omdf = !1), this.prop._mdf || t)) {
                        var e,
                            i,
                            s,
                            r = 4 * this.data.p;
                        for (e = 0; e < r; e += 1) (i = e % 4 == 0 ? 100 : 255), (s = Math.round(this.prop.v[e] * i)), this.c[e] !== s && ((this.c[e] = s), (this._cmdf = !t));
                        if (this.o.length)
                            for (r = this.prop.v.length, e = 4 * this.data.p; e < r; e += 1)
                                (i = e % 2 == 0 ? 100 : 1), (s = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e]), this.o[e - 4 * this.data.p] !== s && ((this.o[e - 4 * this.data.p] = s), (this._omdf = !t));
                        this._mdf = !t;
                    }
                }),
                extendPrototype([DynamicPropertyContainer], GradientProperty);
            var buildShapeString = function (t, e, i, s) {
                    if (0 === e) return "";
                    var r,
                        a = t.o,
                        n = t.i,
                        o = t.v,
                        l = " M" + s.applyToPointStringified(o[0][0], o[0][1]);
                    for (r = 1; r < e; r += 1) l += " C" + s.applyToPointStringified(a[r - 1][0], a[r - 1][1]) + " " + s.applyToPointStringified(n[r][0], n[r][1]) + " " + s.applyToPointStringified(o[r][0], o[r][1]);
                    return i && e && ((l += " C" + s.applyToPointStringified(a[r - 1][0], a[r - 1][1]) + " " + s.applyToPointStringified(n[0][0], n[0][1]) + " " + s.applyToPointStringified(o[0][0], o[0][1])), (l += "z")), l;
                },
                ImagePreloader = (function () {
                    var t = (function () {
                        var t = createTag("canvas");
                        (t.width = 1), (t.height = 1);
                        var e = t.getContext("2d");
                        return (e.fillStyle = "#FF0000"), e.fillRect(0, 0, 1, 1), t;
                    })();
                    function e() {
                        (this.loadedAssets += 1), this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null);
                    }
                    function i(e) {
                        var i = (function (t, e, i) {
                                var s = "";
                                if (t.e) s = t.p;
                                else if (e) {
                                    var r = t.p;
                                    -1 !== r.indexOf("images/") && (r = r.split("/")[1]), (s = e + r);
                                } else (s = i), (s += t.u ? t.u : ""), (s += t.p);
                                return s;
                            })(e, this.assetsPath, this.path),
                            s = createTag("img");
                        (s.crossOrigin = "anonymous"),
                            s.addEventListener("load", this._imageLoaded.bind(this), !1),
                            s.addEventListener(
                                "error",
                                function () {
                                    (r.img = t), this._imageLoaded();
                                }.bind(this),
                                !1
                            ),
                            (s.src = i);
                        var r = { img: s, assetData: e };
                        return r;
                    }
                    function s(t, e) {
                        this.imagesLoadedCb = e;
                        var i,
                            s = t.length;
                        for (i = 0; i < s; i += 1) t[i].layers || ((this.totalImages += 1), this.images.push(this._createImageData(t[i])));
                    }
                    function r(t) {
                        this.path = t || "";
                    }
                    function a(t) {
                        this.assetsPath = t || "";
                    }
                    function n(t) {
                        for (var e = 0, i = this.images.length; e < i; ) {
                            if (this.images[e].assetData === t) return this.images[e].img;
                            e += 1;
                        }
                    }
                    function o() {
                        (this.imagesLoadedCb = null), (this.images.length = 0);
                    }
                    function l() {
                        return this.totalImages === this.loadedAssets;
                    }
                    return function () {
                        (this.loadAssets = s),
                            (this.setAssetsPath = a),
                            (this.setPath = r),
                            (this.loaded = l),
                            (this.destroy = o),
                            (this.getImage = n),
                            (this._createImageData = i),
                            (this._imageLoaded = e),
                            (this.assetsPath = ""),
                            (this.path = ""),
                            (this.totalImages = 0),
                            (this.loadedAssets = 0),
                            (this.imagesLoadedCb = null),
                            (this.images = []);
                    };
                })(),
                featureSupport =
                    ((lw = { maskType: !0 }), (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (lw.maskType = !1), lw),
                lw,
                filtersFactory =
                    ((mw = {}),
                    (mw.createFilter = function (t) {
                        var e = createNS("filter");
                        return e.setAttribute("id", t), e.setAttribute("filterUnits", "objectBoundingBox"), e.setAttribute("x", "0%"), e.setAttribute("y", "0%"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e;
                    }),
                    (mw.createAlphaToLuminanceFilter = function () {
                        var t = createNS("feColorMatrix");
                        return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t;
                    }),
                    mw),
                mw,
                assetLoader = (function () {
                    function t(t) {
                        return t.response && "object" == typeof t.response ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : void 0;
                    }
                    return {
                        load: function (e, i, s) {
                            var r,
                                a = new XMLHttpRequest();
                            a.open("GET", e, !0);
                            try {
                                a.responseType = "json";
                            } catch (e) {}
                            a.send(),
                                (a.onreadystatechange = function () {
                                    if (4 == a.readyState)
                                        if (200 == a.status) (r = t(a)), i(r);
                                        else
                                            try {
                                                (r = t(a)), i(r);
                                            } catch (t) {
                                                s && s(t);
                                            }
                                });
                        },
                    };
                })();
            function TextAnimatorProperty(t, e, i) {
                (this._isFirstFrame = !0),
                    (this._hasMaskedPath = !1),
                    (this._frameId = -1),
                    (this._textData = t),
                    (this._renderType = e),
                    (this._elem = i),
                    (this._animatorsData = createSizedArray(this._textData.a.length)),
                    (this._pathData = {}),
                    (this._moreOptions = { alignment: {} }),
                    (this.renderedLetters = []),
                    (this.lettersChangedFlag = !1),
                    this.initDynamicPropertyContainer(i);
            }
            function TextAnimatorDataProperty(t, e, i) {
                var s = { propType: !1 },
                    r = PropertyFactory.getProp,
                    a = e.a;
                (this.a = {
                    r: a.r ? r(t, a.r, 0, degToRads, i) : s,
                    rx: a.rx ? r(t, a.rx, 0, degToRads, i) : s,
                    ry: a.ry ? r(t, a.ry, 0, degToRads, i) : s,
                    sk: a.sk ? r(t, a.sk, 0, degToRads, i) : s,
                    sa: a.sa ? r(t, a.sa, 0, degToRads, i) : s,
                    s: a.s ? r(t, a.s, 1, 0.01, i) : s,
                    a: a.a ? r(t, a.a, 1, 0, i) : s,
                    o: a.o ? r(t, a.o, 0, 0.01, i) : s,
                    p: a.p ? r(t, a.p, 1, 0, i) : s,
                    sw: a.sw ? r(t, a.sw, 0, 0, i) : s,
                    sc: a.sc ? r(t, a.sc, 1, 0, i) : s,
                    fc: a.fc ? r(t, a.fc, 1, 0, i) : s,
                    fh: a.fh ? r(t, a.fh, 0, 0, i) : s,
                    fs: a.fs ? r(t, a.fs, 0, 0.01, i) : s,
                    fb: a.fb ? r(t, a.fb, 0, 0.01, i) : s,
                    t: a.t ? r(t, a.t, 0, 0, i) : s,
                }),
                    (this.s = TextSelectorProp.getTextSelectorProp(t, e.s, i)),
                    (this.s.t = e.s.t);
            }
            function LetterProps(t, e, i, s, r, a) {
                (this.o = t), (this.sw = e), (this.sc = i), (this.fc = s), (this.m = r), (this.p = a), (this._mdf = { o: !0, sw: !!e, sc: !!i, fc: !!s, m: !0, p: !0 });
            }
            function TextProperty(t, e) {
                (this._frameId = initialDefaultFrame),
                    (this.pv = ""),
                    (this.v = ""),
                    (this.kf = !1),
                    (this._isFirstFrame = !0),
                    (this._mdf = !1),
                    (this.data = e),
                    (this.elem = t),
                    (this.comp = this.elem.comp),
                    (this.keysIndex = 0),
                    (this.canResize = !1),
                    (this.minimumFontSize = 1),
                    (this.effectsSequence = []),
                    (this.currentData = {
                        ascent: 0,
                        boxWidth: this.defaultBoxWidth,
                        f: "",
                        fStyle: "",
                        fWeight: "",
                        fc: "",
                        j: "",
                        justifyOffset: "",
                        l: [],
                        lh: 0,
                        lineWidths: [],
                        ls: "",
                        of: "",
                        s: "",
                        sc: "",
                        sw: 0,
                        t: 0,
                        tr: 0,
                        sz: 0,
                        ps: null,
                        fillColorAnim: !1,
                        strokeColorAnim: !1,
                        strokeWidthAnim: !1,
                        yOffset: 0,
                        finalSize: 0,
                        finalText: [],
                        finalLineHeight: 0,
                        __complete: !1,
                    }),
                    this.copyData(this.currentData, this.data.d.k[0].s),
                    this.searchProperty() || this.completeTextData(this.currentData);
            }
            (TextAnimatorProperty.prototype.searchProperties = function () {
                var t,
                    e,
                    i = this._textData.a.length,
                    s = PropertyFactory.getProp;
                for (t = 0; t < i; t += 1) (e = this._textData.a[t]), (this._animatorsData[t] = new TextAnimatorDataProperty(this._elem, e, this));
                this._textData.p && "m" in this._textData.p
                    ? ((this._pathData = { f: s(this._elem, this._textData.p.f, 0, 0, this), l: s(this._elem, this._textData.p.l, 0, 0, this), r: this._textData.p.r, m: this._elem.maskManager.getMaskProperty(this._textData.p.m) }),
                      (this._hasMaskedPath = !0))
                    : (this._hasMaskedPath = !1),
                    (this._moreOptions.alignment = s(this._elem, this._textData.m.a, 1, 0, this));
            }),
                (TextAnimatorProperty.prototype.getMeasures = function (t, e) {
                    if (((this.lettersChangedFlag = e), this._mdf || this._isFirstFrame || e || (this._hasMaskedPath && this._pathData.m._mdf))) {
                        this._isFirstFrame = !1;
                        var i,
                            s,
                            r,
                            a,
                            n,
                            o,
                            l,
                            h,
                            p,
                            d,
                            c,
                            f,
                            u,
                            m,
                            g,
                            y,
                            v,
                            b,
                            w,
                            S = this._moreOptions.alignment.v,
                            k = this._animatorsData,
                            T = this._textData,
                            x = this.mHelper,
                            P = this._renderType,
                            A = this.renderedLetters.length,
                            C = (this.data, t.l);
                        if (this._hasMaskedPath) {
                            if (((w = this._pathData.m), !this._pathData.n || this._pathData._mdf)) {
                                var E,
                                    _ = w.v;
                                for (this._pathData.r && (_ = _.reverse()), n = { tLength: 0, segments: [] }, a = _._length - 1, r = y = 0; r < a; r += 1)
                                    (E = bez.buildBezierData(_.v[r], _.v[r + 1], [_.o[r][0] - _.v[r][0], _.o[r][1] - _.v[r][1]], [_.i[r + 1][0] - _.v[r + 1][0], _.i[r + 1][1] - _.v[r + 1][1]])),
                                        (n.tLength += E.segmentLength),
                                        n.segments.push(E),
                                        (y += E.segmentLength);
                                (r = a),
                                    w.v.c &&
                                        ((E = bez.buildBezierData(_.v[r], _.v[0], [_.o[r][0] - _.v[r][0], _.o[r][1] - _.v[r][1]], [_.i[0][0] - _.v[0][0], _.i[0][1] - _.v[0][1]])),
                                        (n.tLength += E.segmentLength),
                                        n.segments.push(E),
                                        (y += E.segmentLength)),
                                    (this._pathData.pi = n);
                            }
                            if (((n = this._pathData.pi), (o = this._pathData.f.v), (d = 1), (p = !(h = c = 0)), (m = n.segments), o < 0 && w.v.c))
                                for (n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength), d = (u = m[(c = m.length - 1)].points).length - 1; o < 0; )
                                    (o += u[d].partialLength), (d -= 1) < 0 && (d = (u = m[(c -= 1)].points).length - 1);
                            (f = (u = m[c].points)[d - 1]), (g = (l = u[d]).partialLength);
                        }
                        (a = C.length), (s = i = 0);
                        var M,
                            D,
                            I,
                            F,
                            L = 1.2 * t.finalSize * 0.714,
                            z = !0;
                        I = k.length;
                        var O,
                            R,
                            V,
                            H,
                            N,
                            G,
                            B,
                            j,
                            q,
                            W,
                            U,
                            Y,
                            X,
                            $ = -1,
                            K = o,
                            J = c,
                            Z = d,
                            Q = -1,
                            tt = "",
                            et = this.defaultPropsArray;
                        if (2 === t.j || 1 === t.j) {
                            var it = 0,
                                st = 0,
                                rt = 2 === t.j ? -0.5 : -1,
                                at = 0,
                                nt = !0;
                            for (r = 0; r < a; r += 1)
                                if (C[r].n) {
                                    for (it && (it += st); at < r; ) (C[at].animatorJustifyOffset = it), (at += 1);
                                    nt = !(it = 0);
                                } else {
                                    for (D = 0; D < I; D += 1)
                                        (M = k[D].a).t.propType && (nt && 2 === t.j && (st += M.t.v * rt), (O = k[D].s.getMult(C[r].anIndexes[D], T.a[D].s.totalChars)).length ? (it += M.t.v * O[0] * rt) : (it += M.t.v * O * rt));
                                    nt = !1;
                                }
                            for (it && (it += st); at < r; ) (C[at].animatorJustifyOffset = it), (at += 1);
                        }
                        for (r = 0; r < a; r += 1) {
                            if ((x.reset(), (N = 1), C[r].n))
                                (i = 0),
                                    (s += t.yOffset),
                                    (s += z ? 1 : 0),
                                    (o = K),
                                    (z = !1),
                                    this._hasMaskedPath && ((d = Z), (f = (u = m[(c = J)].points)[d - 1]), (g = (l = u[d]).partialLength), (h = 0)),
                                    (X = W = Y = tt = ""),
                                    (et = this.defaultPropsArray);
                            else {
                                if (this._hasMaskedPath) {
                                    if (Q !== C[r].line) {
                                        switch (t.j) {
                                            case 1:
                                                o += y - t.lineWidths[C[r].line];
                                                break;
                                            case 2:
                                                o += (y - t.lineWidths[C[r].line]) / 2;
                                        }
                                        Q = C[r].line;
                                    }
                                    $ !== C[r].ind && (C[$] && (o += C[$].extra), (o += C[r].an / 2), ($ = C[r].ind)), (o += (S[0] * C[r].an) / 200);
                                    var ot = 0;
                                    for (D = 0; D < I; D += 1)
                                        (M = k[D].a).p.propType && ((O = k[D].s.getMult(C[r].anIndexes[D], T.a[D].s.totalChars)).length ? (ot += M.p.v[0] * O[0]) : (ot += M.p.v[0] * O)),
                                            M.a.propType && ((O = k[D].s.getMult(C[r].anIndexes[D], T.a[D].s.totalChars)).length ? (ot += M.a.v[0] * O[0]) : (ot += M.a.v[0] * O));
                                    for (p = !0; p; )
                                        o + ot <= h + g || !u
                                            ? ((v = (o + ot - h) / l.partialLength),
                                              (V = f.point[0] + (l.point[0] - f.point[0]) * v),
                                              (H = f.point[1] + (l.point[1] - f.point[1]) * v),
                                              x.translate((-S[0] * C[r].an) / 200, (-S[1] * L) / 100),
                                              (p = !1))
                                            : u &&
                                              ((h += l.partialLength),
                                              (d += 1) >= u.length && ((d = 0), (u = m[(c += 1)] ? m[c].points : w.v.c ? m[(c = d = 0)].points : ((h -= l.partialLength), null))),
                                              u && ((f = l), (g = (l = u[d]).partialLength)));
                                    (R = C[r].an / 2 - C[r].add), x.translate(-R, 0, 0);
                                } else (R = C[r].an / 2 - C[r].add), x.translate(-R, 0, 0), x.translate((-S[0] * C[r].an) / 200, (-S[1] * L) / 100, 0);
                                for (C[r].l, D = 0; D < I; D += 1)
                                    (M = k[D].a).t.propType &&
                                        ((O = k[D].s.getMult(C[r].anIndexes[D], T.a[D].s.totalChars)),
                                        (0 === i && 0 === t.j) || (this._hasMaskedPath ? (O.length ? (o += M.t.v * O[0]) : (o += M.t.v * O)) : O.length ? (i += M.t.v * O[0]) : (i += M.t.v * O)));
                                for (
                                    C[r].l, t.strokeWidthAnim && (B = t.sw || 0), t.strokeColorAnim && (G = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (j = [t.fc[0], t.fc[1], t.fc[2]]), D = 0;
                                    D < I;
                                    D += 1
                                )
                                    (M = k[D].a).a.propType &&
                                        ((O = k[D].s.getMult(C[r].anIndexes[D], T.a[D].s.totalChars)).length ? x.translate(-M.a.v[0] * O[0], -M.a.v[1] * O[1], M.a.v[2] * O[2]) : x.translate(-M.a.v[0] * O, -M.a.v[1] * O, M.a.v[2] * O));
                                for (D = 0; D < I; D += 1)
                                    (M = k[D].a).s.propType &&
                                        ((O = k[D].s.getMult(C[r].anIndexes[D], T.a[D].s.totalChars)).length ? x.scale(1 + (M.s.v[0] - 1) * O[0], 1 + (M.s.v[1] - 1) * O[1], 1) : x.scale(1 + (M.s.v[0] - 1) * O, 1 + (M.s.v[1] - 1) * O, 1));
                                for (D = 0; D < I; D += 1) {
                                    if (
                                        ((M = k[D].a),
                                        (O = k[D].s.getMult(C[r].anIndexes[D], T.a[D].s.totalChars)),
                                        M.sk.propType && (O.length ? x.skewFromAxis(-M.sk.v * O[0], M.sa.v * O[1]) : x.skewFromAxis(-M.sk.v * O, M.sa.v * O)),
                                        M.r.propType && (O.length ? x.rotateZ(-M.r.v * O[2]) : x.rotateZ(-M.r.v * O)),
                                        M.ry.propType && (O.length ? x.rotateY(M.ry.v * O[1]) : x.rotateY(M.ry.v * O)),
                                        M.rx.propType && (O.length ? x.rotateX(M.rx.v * O[0]) : x.rotateX(M.rx.v * O)),
                                        M.o.propType && (O.length ? (N += (M.o.v * O[0] - N) * O[0]) : (N += (M.o.v * O - N) * O)),
                                        t.strokeWidthAnim && M.sw.propType && (O.length ? (B += M.sw.v * O[0]) : (B += M.sw.v * O)),
                                        t.strokeColorAnim && M.sc.propType)
                                    )
                                        for (q = 0; q < 3; q += 1) O.length ? (G[q] = G[q] + (M.sc.v[q] - G[q]) * O[0]) : (G[q] = G[q] + (M.sc.v[q] - G[q]) * O);
                                    if (t.fillColorAnim && t.fc) {
                                        if (M.fc.propType) for (q = 0; q < 3; q += 1) O.length ? (j[q] = j[q] + (M.fc.v[q] - j[q]) * O[0]) : (j[q] = j[q] + (M.fc.v[q] - j[q]) * O);
                                        M.fh.propType && (j = O.length ? addHueToRGB(j, M.fh.v * O[0]) : addHueToRGB(j, M.fh.v * O)),
                                            M.fs.propType && (j = O.length ? addSaturationToRGB(j, M.fs.v * O[0]) : addSaturationToRGB(j, M.fs.v * O)),
                                            M.fb.propType && (j = O.length ? addBrightnessToRGB(j, M.fb.v * O[0]) : addBrightnessToRGB(j, M.fb.v * O));
                                    }
                                }
                                for (D = 0; D < I; D += 1)
                                    (M = k[D].a).p.propType &&
                                        ((O = k[D].s.getMult(C[r].anIndexes[D], T.a[D].s.totalChars)),
                                        this._hasMaskedPath
                                            ? O.length
                                                ? x.translate(0, M.p.v[1] * O[0], -M.p.v[2] * O[1])
                                                : x.translate(0, M.p.v[1] * O, -M.p.v[2] * O)
                                            : O.length
                                            ? x.translate(M.p.v[0] * O[0], M.p.v[1] * O[1], -M.p.v[2] * O[2])
                                            : x.translate(M.p.v[0] * O, M.p.v[1] * O, -M.p.v[2] * O));
                                if (
                                    (t.strokeWidthAnim && (W = B < 0 ? 0 : B),
                                    t.strokeColorAnim && (U = "rgb(" + Math.round(255 * G[0]) + "," + Math.round(255 * G[1]) + "," + Math.round(255 * G[2]) + ")"),
                                    t.fillColorAnim && t.fc && (Y = "rgb(" + Math.round(255 * j[0]) + "," + Math.round(255 * j[1]) + "," + Math.round(255 * j[2]) + ")"),
                                    this._hasMaskedPath)
                                ) {
                                    if ((x.translate(0, -t.ls), x.translate(0, (S[1] * L) / 100 + s, 0), T.p.p)) {
                                        b = (l.point[1] - f.point[1]) / (l.point[0] - f.point[0]);
                                        var lt = (180 * Math.atan(b)) / Math.PI;
                                        l.point[0] < f.point[0] && (lt += 180), x.rotate((-lt * Math.PI) / 180);
                                    }
                                    x.translate(V, H, 0), (o -= (S[0] * C[r].an) / 200), C[r + 1] && $ !== C[r + 1].ind && ((o += C[r].an / 2), (o += (t.tr / 1e3) * t.finalSize));
                                } else {
                                    switch ((x.translate(i, s, 0), t.ps && x.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j)) {
                                        case 1:
                                            x.translate(C[r].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[C[r].line]), 0, 0);
                                            break;
                                        case 2:
                                            x.translate(C[r].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[C[r].line]) / 2, 0, 0);
                                    }
                                    x.translate(0, -t.ls), x.translate(R, 0, 0), x.translate((S[0] * C[r].an) / 200, (S[1] * L) / 100, 0), (i += C[r].l + (t.tr / 1e3) * t.finalSize);
                                }
                                "html" === P
                                    ? (tt = x.toCSS())
                                    : "svg" === P
                                    ? (tt = x.to2dCSS())
                                    : (et = [
                                          x.props[0],
                                          x.props[1],
                                          x.props[2],
                                          x.props[3],
                                          x.props[4],
                                          x.props[5],
                                          x.props[6],
                                          x.props[7],
                                          x.props[8],
                                          x.props[9],
                                          x.props[10],
                                          x.props[11],
                                          x.props[12],
                                          x.props[13],
                                          x.props[14],
                                          x.props[15],
                                      ]),
                                    (X = N);
                            }
                            this.lettersChangedFlag = A <= r ? ((F = new LetterProps(X, W, U, Y, tt, et)), this.renderedLetters.push(F), (A += 1), !0) : (F = this.renderedLetters[r]).update(X, W, U, Y, tt, et) || this.lettersChangedFlag;
                        }
                    }
                }),
                (TextAnimatorProperty.prototype.getValue = function () {
                    this._elem.globalData.frameId !== this._frameId && ((this._frameId = this._elem.globalData.frameId), this.iterateDynamicProperties());
                }),
                (TextAnimatorProperty.prototype.mHelper = new Matrix()),
                (TextAnimatorProperty.prototype.defaultPropsArray = []),
                extendPrototype([DynamicPropertyContainer], TextAnimatorProperty),
                (LetterProps.prototype.update = function (t, e, i, s, r, a) {
                    (this._mdf.o = !1), (this._mdf.sw = !1), (this._mdf.sc = !1), (this._mdf.fc = !1), (this._mdf.m = !1);
                    var n = (this._mdf.p = !1);
                    return (
                        this.o !== t && ((this.o = t), (n = this._mdf.o = !0)),
                        this.sw !== e && ((this.sw = e), (n = this._mdf.sw = !0)),
                        this.sc !== i && ((this.sc = i), (n = this._mdf.sc = !0)),
                        this.fc !== s && ((this.fc = s), (n = this._mdf.fc = !0)),
                        this.m !== r && ((this.m = r), (n = this._mdf.m = !0)),
                        !a.length || (this.p[0] === a[0] && this.p[1] === a[1] && this.p[4] === a[4] && this.p[5] === a[5] && this.p[12] === a[12] && this.p[13] === a[13]) || ((this.p = a), (n = this._mdf.p = !0)),
                        n
                    );
                }),
                (TextProperty.prototype.defaultBoxWidth = [0, 0]),
                (TextProperty.prototype.copyData = function (t, e) {
                    for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
                    return t;
                }),
                (TextProperty.prototype.setCurrentData = function (t) {
                    t.__complete || this.completeTextData(t), (this.currentData = t), (this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth), (this._mdf = !0);
                }),
                (TextProperty.prototype.searchProperty = function () {
                    return this.searchKeyframes();
                }),
                (TextProperty.prototype.searchKeyframes = function () {
                    return (this.kf = 1 < this.data.d.k.length), this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf;
                }),
                (TextProperty.prototype.addEffect = function (t) {
                    this.effectsSequence.push(t), this.elem.addDynamicProperty(this);
                }),
                (TextProperty.prototype.getValue = function (t) {
                    if ((this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) || t) {
                        this.currentData.t = this.data.d.k[this.keysIndex].s.t;
                        var e = this.currentData,
                            i = this.keysIndex;
                        if (this.lock) this.setCurrentData(this.currentData);
                        else {
                            (this.lock = !0), (this._mdf = !1);
                            var s,
                                r = this.effectsSequence.length,
                                a = t || this.data.d.k[this.keysIndex].s;
                            for (s = 0; s < r; s += 1) a = i !== this.keysIndex ? this.effectsSequence[s](a, a.t) : this.effectsSequence[s](this.currentData, a.t);
                            e !== a && this.setCurrentData(a), (this.pv = this.v = this.currentData), (this.lock = !1), (this.frameId = this.elem.globalData.frameId);
                        }
                    }
                }),
                (TextProperty.prototype.getKeyframeValue = function () {
                    for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, i = 0, s = t.length; i <= s - 1 && (t[i].s, !(i === s - 1 || t[i + 1].t > e)); ) i += 1;
                    return this.keysIndex !== i && (this.keysIndex = i), this.data.d.k[this.keysIndex].s;
                }),
                (TextProperty.prototype.buildFinalText = function (t) {
                    for (var e = FontManager.getCombinedCharacterCodes(), i = [], s = 0, r = t.length; s < r; ) -1 !== e.indexOf(t.charCodeAt(s)) ? (i[i.length - 1] += t.charAt(s)) : i.push(t.charAt(s)), (s += 1);
                    return i;
                }),
                (TextProperty.prototype.completeTextData = function (t) {
                    t.__complete = !0;
                    var e,
                        i,
                        s,
                        r,
                        a,
                        n,
                        o,
                        l = this.elem.globalData.fontManager,
                        h = this.data,
                        p = [],
                        d = 0,
                        c = h.m.g,
                        f = 0,
                        u = 0,
                        m = 0,
                        g = [],
                        y = 0,
                        v = 0,
                        b = l.getFontByName(t.f),
                        w = 0,
                        S = b.fStyle ? b.fStyle.split(" ") : [],
                        k = "normal",
                        T = "normal";
                    for (i = S.length, e = 0; e < i; e += 1)
                        switch (S[e].toLowerCase()) {
                            case "italic":
                                T = "italic";
                                break;
                            case "bold":
                                k = "700";
                                break;
                            case "black":
                                k = "900";
                                break;
                            case "medium":
                                k = "500";
                                break;
                            case "regular":
                            case "normal":
                                k = "400";
                                break;
                            case "light":
                            case "thin":
                                k = "200";
                        }
                    (t.fWeight = b.fWeight || k), (t.fStyle = T), (t.finalSize = t.s), (t.finalText = this.buildFinalText(t.t)), (i = t.finalText.length), (t.finalLineHeight = t.lh);
                    var x,
                        P = (t.tr / 1e3) * t.finalSize;
                    if (t.sz)
                        for (var A, C, E = !0, _ = t.sz[0], M = t.sz[1]; E; ) {
                            (y = A = 0), (i = (C = this.buildFinalText(t.t)).length), (P = (t.tr / 1e3) * t.finalSize);
                            var D = -1;
                            for (e = 0; e < i; e += 1)
                                (x = C[e].charCodeAt(0)),
                                    (s = !1),
                                    " " === C[e] ? (D = e) : (13 !== x && 3 !== x) || ((s = !(y = 0)), (A += t.finalLineHeight || 1.2 * t.finalSize)),
                                    _ < y + (w = l.chars ? ((o = l.getCharData(C[e], b.fStyle, b.fFamily)), s ? 0 : (o.w * t.finalSize) / 100) : l.measureText(C[e], t.f, t.finalSize)) && " " !== C[e]
                                        ? (-1 === D ? (i += 1) : (e = D), (A += t.finalLineHeight || 1.2 * t.finalSize), C.splice(e, D === e ? 1 : 0, "\r"), (D = -1), (y = 0))
                                        : ((y += w), (y += P));
                            (A += (b.ascent * t.finalSize) / 100),
                                this.canResize && t.finalSize > this.minimumFontSize && M < A ? ((t.finalSize -= 1), (t.finalLineHeight = (t.finalSize * t.lh) / t.s)) : ((t.finalText = C), (i = t.finalText.length), (E = !1));
                        }
                    y = -P;
                    var I,
                        F = (w = 0);
                    for (e = 0; e < i; e += 1)
                        if (
                            ((s = !1),
                            (x = (I = t.finalText[e]).charCodeAt(0)),
                            " " === I ? (r = " ") : 13 === x || 3 === x ? ((F = 0), g.push(y), (v = v < y ? y : v), (y = -2 * P), (s = !(r = "")), (m += 1)) : (r = t.finalText[e]),
                            (w = l.chars ? ((o = l.getCharData(I, b.fStyle, l.getFontByName(t.f).fFamily)), s ? 0 : (o.w * t.finalSize) / 100) : l.measureText(r, t.f, t.finalSize)),
                            " " === I ? (F += w + P) : ((y += w + P + F), (F = 0)),
                            p.push({ l: w, an: w, add: f, n: s, anIndexes: [], val: r, line: m, animatorJustifyOffset: 0 }),
                            2 == c)
                        ) {
                            if (((f += w), "" === r || " " === r || e === i - 1)) {
                                for (("" !== r && " " !== r) || (f -= w); u <= e; ) (p[u].an = f), (p[u].ind = d), (p[u].extra = w), (u += 1);
                                (d += 1), (f = 0);
                            }
                        } else if (3 == c) {
                            if (((f += w), "" === r || e === i - 1)) {
                                for ("" === r && (f -= w); u <= e; ) (p[u].an = f), (p[u].ind = d), (p[u].extra = w), (u += 1);
                                (f = 0), (d += 1);
                            }
                        } else (p[d].ind = d), (p[d].extra = 0), (d += 1);
                    if (((t.l = p), (v = v < y ? y : v), g.push(y), t.sz)) (t.boxWidth = t.sz[0]), (t.justifyOffset = 0);
                    else
                        switch (((t.boxWidth = v), t.j)) {
                            case 1:
                                t.justifyOffset = -t.boxWidth;
                                break;
                            case 2:
                                t.justifyOffset = -t.boxWidth / 2;
                                break;
                            default:
                                t.justifyOffset = 0;
                        }
                    t.lineWidths = g;
                    var L,
                        z,
                        O = h.a;
                    n = O.length;
                    var R,
                        V,
                        H = [];
                    for (a = 0; a < n; a += 1) {
                        for ((L = O[a]).a.sc && (t.strokeColorAnim = !0), L.a.sw && (t.strokeWidthAnim = !0), (L.a.fc || L.a.fh || L.a.fs || L.a.fb) && (t.fillColorAnim = !0), V = 0, R = L.s.b, e = 0; e < i; e += 1)
                            ((z = p[e]).anIndexes[a] = V),
                                ((1 == R && "" !== z.val) || (2 == R && "" !== z.val && " " !== z.val) || (3 == R && (z.n || " " == z.val || e == i - 1)) || (4 == R && (z.n || e == i - 1))) && (1 === L.s.rn && H.push(V), (V += 1));
                        h.a[a].s.totalChars = V;
                        var N,
                            G = -1;
                        if (1 === L.s.rn) for (e = 0; e < i; e += 1) G != (z = p[e]).anIndexes[a] && ((G = z.anIndexes[a]), (N = H.splice(Math.floor(Math.random() * H.length), 1)[0])), (z.anIndexes[a] = N);
                    }
                    (t.yOffset = t.finalLineHeight || 1.2 * t.finalSize), (t.ls = t.ls || 0), (t.ascent = (b.ascent * t.finalSize) / 100);
                }),
                (TextProperty.prototype.updateDocumentData = function (t, e) {
                    e = void 0 === e ? this.keysIndex : e;
                    var i = this.copyData({}, this.data.d.k[e].s);
                    (i = this.copyData(i, t)), (this.data.d.k[e].s = i), this.recalculate(e), this.elem.addDynamicProperty(this);
                }),
                (TextProperty.prototype.recalculate = function (t) {
                    var e = this.data.d.k[t].s;
                    (e.__complete = !1), (this.keysIndex = 0), (this._isFirstFrame = !0), this.getValue(e);
                }),
                (TextProperty.prototype.canResizeFont = function (t) {
                    (this.canResize = t), this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
                }),
                (TextProperty.prototype.setMinimumFontSize = function (t) {
                    (this.minimumFontSize = Math.floor(t) || 1), this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
                });
            var TextSelectorProp = (function () {
                    var t = Math.max,
                        e = Math.min,
                        i = Math.floor;
                    function s(t, e) {
                        (this._currentTextLength = -1),
                            (this.k = !1),
                            (this.data = e),
                            (this.elem = t),
                            (this.comp = t.comp),
                            (this.finalS = 0),
                            (this.finalE = 0),
                            this.initDynamicPropertyContainer(t),
                            (this.s = PropertyFactory.getProp(t, e.s || { k: 0 }, 0, 0, this)),
                            (this.e = "e" in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : { v: 100 }),
                            (this.o = PropertyFactory.getProp(t, e.o || { k: 0 }, 0, 0, this)),
                            (this.xe = PropertyFactory.getProp(t, e.xe || { k: 0 }, 0, 0, this)),
                            (this.ne = PropertyFactory.getProp(t, e.ne || { k: 0 }, 0, 0, this)),
                            (this.a = PropertyFactory.getProp(t, e.a, 0, 0.01, this)),
                            this.dynamicProperties.length || this.getValue();
                    }
                    return (
                        (s.prototype = {
                            getMult: function (s) {
                                this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
                                var r = BezierFactory.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get,
                                    a = 0,
                                    n = this.finalS,
                                    o = this.finalE,
                                    l = this.data.sh;
                                if (2 == l) a = r((a = o === n ? (o <= s ? 1 : 0) : t(0, e(0.5 / (o - n) + (s - n) / (o - n), 1))));
                                else if (3 == l) a = r((a = o === n ? (o <= s ? 0 : 1) : 1 - t(0, e(0.5 / (o - n) + (s - n) / (o - n), 1))));
                                else if (4 == l) o === n ? (a = 0) : (a = t(0, e(0.5 / (o - n) + (s - n) / (o - n), 1))) < 0.5 ? (a *= 2) : (a = 1 - 2 * (a - 0.5)), (a = r(a));
                                else if (5 == l) {
                                    if (o === n) a = 0;
                                    else {
                                        var h = o - n,
                                            p = -h / 2 + (s = e(t(0, s + 0.5 - n), o - n)),
                                            d = h / 2;
                                        a = Math.sqrt(1 - (p * p) / (d * d));
                                    }
                                    a = r(a);
                                } else
                                    a = 6 == l ? r((a = o === n ? 0 : ((s = e(t(0, s + 0.5 - n), o - n)), (1 + Math.cos(Math.PI + (2 * Math.PI * s) / (o - n))) / 2))) : (s >= i(n) && (a = s - n < 0 ? 1 - (n - s) : t(0, e(o - s, 1))), r(a));
                                return a * this.a.v;
                            },
                            getValue: function (t) {
                                this.iterateDynamicProperties(), (this._mdf = t || this._mdf), (this._currentTextLength = this.elem.textProperty.currentData.l.length || 0), t && 2 === this.data.r && (this.e.v = this._currentTextLength);
                                var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
                                    i = this.o.v / e,
                                    s = this.s.v / e + i,
                                    r = this.e.v / e + i;
                                if (r < s) {
                                    var a = s;
                                    (s = r), (r = a);
                                }
                                (this.finalS = s), (this.finalE = r);
                            },
                        }),
                        extendPrototype([DynamicPropertyContainer], s),
                        {
                            getTextSelectorProp: function (t, e, i) {
                                return new s(t, e, i);
                            },
                        }
                    );
                })(),
                pool_factory = function (t, e, i, s) {
                    var r = 0,
                        a = t,
                        n = createSizedArray(a);
                    return {
                        newElement: function () {
                            return r ? n[(r -= 1)] : e();
                        },
                        release: function (t) {
                            r === a && ((n = pooling.double(n)), (a *= 2)), i && i(t), (n[r] = t), (r += 1);
                        },
                    };
                },
                pooling = {
                    double: function (t) {
                        return t.concat(createSizedArray(t.length));
                    },
                },
                point_pool = pool_factory(8, function () {
                    return createTypedArray("float32", 2);
                }),
                shape_pool =
                    ((yA = pool_factory(
                        4,
                        function () {
                            return new ShapePath();
                        },
                        function (t) {
                            var e,
                                i = t._length;
                            for (e = 0; e < i; e += 1) point_pool.release(t.v[e]), point_pool.release(t.i[e]), point_pool.release(t.o[e]), (t.v[e] = null), (t.i[e] = null), (t.o[e] = null);
                            (t._length = 0), (t.c = !1);
                        }
                    )),
                    (yA.clone = function (t) {
                        var e,
                            i = yA.newElement(),
                            s = void 0 === t._length ? t.v.length : t._length;
                        for (i.setLength(s), i.c = t.c, e = 0; e < s; e += 1) i.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
                        return i;
                    }),
                    yA),
                yA,
                shapeCollection_pool =
                    ((HA = {
                        newShapeCollection: function () {
                            return IA ? KA[(IA -= 1)] : new ShapeCollection();
                        },
                        release: function (t) {
                            var e,
                                i = t._length;
                            for (e = 0; e < i; e += 1) shape_pool.release(t.shapes[e]);
                            (t._length = 0), IA === JA && ((KA = pooling.double(KA)), (JA *= 2)), (KA[IA] = t), (IA += 1);
                        },
                    }),
                    (IA = 0),
                    (JA = 4),
                    (KA = createSizedArray(JA)),
                    HA),
                HA,
                IA,
                JA,
                KA,
                segments_length_pool = pool_factory(
                    8,
                    function () {
                        return { lengths: [], totalLength: 0 };
                    },
                    function (t) {
                        var e,
                            i = t.lengths.length;
                        for (e = 0; e < i; e += 1) bezier_length_pool.release(t.lengths[e]);
                        t.lengths.length = 0;
                    }
                ),
                bezier_length_pool = pool_factory(8, function () {
                    return { addedLength: 0, percents: createTypedArray("float32", defaultCurveSegments), lengths: createTypedArray("float32", defaultCurveSegments) };
                });
            function BaseRenderer() {}
            function SVGRenderer(t, e) {
                (this.animationItem = t), (this.layers = null), (this.renderedFrame = -1), (this.svgElement = createNS("svg"));
                var i = "";
                if (e && e.title) {
                    var s = createNS("title"),
                        r = createElementID();
                    s.setAttribute("id", r), (s.textContent = e.title), this.svgElement.appendChild(s), (i += r);
                }
                if (e && e.description) {
                    var a = createNS("desc"),
                        n = createElementID();
                    a.setAttribute("id", n), (a.textContent = e.description), this.svgElement.appendChild(a), (i += " " + n);
                }
                i && this.svgElement.setAttribute("aria-labelledby", i);
                var o = createNS("defs");
                this.svgElement.appendChild(o);
                var l = createNS("g");
                this.svgElement.appendChild(l),
                    (this.layerElement = l),
                    (this.renderConfig = {
                        preserveAspectRatio: (e && e.preserveAspectRatio) || "xMidYMid meet",
                        imagePreserveAspectRatio: (e && e.imagePreserveAspectRatio) || "xMidYMid slice",
                        progressiveLoad: (e && e.progressiveLoad) || !1,
                        hideOnTransparent: !e || !1 !== e.hideOnTransparent,
                        viewBoxOnly: (e && e.viewBoxOnly) || !1,
                        viewBoxSize: (e && e.viewBoxSize) || !1,
                        className: (e && e.className) || "",
                    }),
                    (this.globalData = { _mdf: !1, frameNum: -1, defs: o, renderConfig: this.renderConfig }),
                    (this.elements = []),
                    (this.pendingElements = []),
                    (this.destroyed = !1),
                    (this.rendererType = "svg");
            }
            function MaskElement(t, e, i) {
                (this.data = t), (this.element = e), (this.globalData = i), (this.storedData = []), (this.masksProperties = this.data.masksProperties || []), (this.maskElement = null);
                var s,
                    r = this.globalData.defs,
                    a = this.masksProperties ? this.masksProperties.length : 0;
                (this.viewData = createSizedArray(a)), (this.solidPath = "");
                var n,
                    o,
                    l,
                    h,
                    p,
                    d,
                    c,
                    f = this.masksProperties,
                    u = 0,
                    m = [],
                    g = createElementID(),
                    y = "clipPath",
                    v = "clip-path";
                for (s = 0; s < a; s++)
                    if (
                        ((("a" !== f[s].mode && "n" !== f[s].mode) || f[s].inv || 100 !== f[s].o.k || f[s].o.x) && (v = y = "mask"),
                        ("s" != f[s].mode && "i" != f[s].mode) || 0 !== u
                            ? (h = null)
                            : ((h = createNS("rect")).setAttribute("fill", "#ffffff"), h.setAttribute("width", this.element.comp.data.w || 0), h.setAttribute("height", this.element.comp.data.h || 0), m.push(h)),
                        (n = createNS("path")),
                        "n" != f[s].mode)
                    ) {
                        var b;
                        if (
                            ((u += 1),
                            n.setAttribute("fill", "s" === f[s].mode ? "#000000" : "#ffffff"),
                            n.setAttribute("clip-rule", "nonzero"),
                            0 !== f[s].x.k
                                ? ((v = y = "mask"),
                                  (c = PropertyFactory.getProp(this.element, f[s].x, 0, null, this.element)),
                                  (b = createElementID()),
                                  (p = createNS("filter")).setAttribute("id", b),
                                  (d = createNS("feMorphology")).setAttribute("operator", "erode"),
                                  d.setAttribute("in", "SourceGraphic"),
                                  d.setAttribute("radius", "0"),
                                  p.appendChild(d),
                                  r.appendChild(p),
                                  n.setAttribute("stroke", "s" === f[s].mode ? "#000000" : "#ffffff"))
                                : (c = d = null),
                            (this.storedData[s] = { elem: n, x: c, expan: d, lastPath: "", lastOperator: "", filterId: b, lastRadius: 0 }),
                            "i" == f[s].mode)
                        ) {
                            l = m.length;
                            var w = createNS("g");
                            for (o = 0; o < l; o += 1) w.appendChild(m[o]);
                            var S = createNS("mask");
                            S.setAttribute("mask-type", "alpha"), S.setAttribute("id", g + "_" + u), S.appendChild(n), r.appendChild(S), w.setAttribute("mask", "url(" + locationHref + "#" + g + "_" + u + ")"), (m.length = 0), m.push(w);
                        } else m.push(n);
                        f[s].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()),
                            (this.viewData[s] = { elem: n, lastPath: "", op: PropertyFactory.getProp(this.element, f[s].o, 0, 0.01, this.element), prop: ShapePropertyFactory.getShapeProp(this.element, f[s], 3), invRect: h }),
                            this.viewData[s].prop.k || this.drawPath(f[s], this.viewData[s].prop.v, this.viewData[s]);
                    } else (this.viewData[s] = { op: PropertyFactory.getProp(this.element, f[s].o, 0, 0.01, this.element), prop: ShapePropertyFactory.getShapeProp(this.element, f[s], 3), elem: n, lastPath: "" }), r.appendChild(n);
                for (this.maskElement = createNS(y), a = m.length, s = 0; s < a; s += 1) this.maskElement.appendChild(m[s]);
                0 < u && (this.maskElement.setAttribute("id", g), this.element.maskedElement.setAttribute(v, "url(" + locationHref + "#" + g + ")"), r.appendChild(this.maskElement)),
                    this.viewData.length && this.element.addRenderableComponent(this);
            }
            function HierarchyElement() {}
            function FrameElement() {}
            function TransformElement() {}
            function RenderableElement() {}
            function RenderableDOMElement() {}
            function ProcessedElement(t, e) {
                (this.elem = t), (this.pos = e);
            }
            function SVGStyleData(t, e) {
                (this.data = t), (this.type = t.ty), (this.d = ""), (this.lvl = e), (this._mdf = !1), (this.closed = !0 === t.hd), (this.pElem = createNS("path")), (this.msElem = null);
            }
            function SVGShapeData(t, e, i) {
                (this.caches = []), (this.styles = []), (this.transformers = t), (this.lStr = ""), (this.sh = i), (this.lvl = e), (this._isAnimated = !!i.k);
                for (var s = 0, r = t.length; s < r; ) {
                    if (t[s].mProps.dynamicProperties.length) {
                        this._isAnimated = !0;
                        break;
                    }
                    s += 1;
                }
            }
            function SVGTransformData(t, e, i) {
                (this.transform = { mProps: t, op: e, container: i }), (this.elements = []), (this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length);
            }
            function SVGStrokeStyleData(t, e, i) {
                this.initDynamicPropertyContainer(t),
                    (this.getValue = this.iterateDynamicProperties),
                    (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)),
                    (this.w = PropertyFactory.getProp(t, e.w, 0, null, this)),
                    (this.d = new DashProperty(t, e.d || {}, "svg", this)),
                    (this.c = PropertyFactory.getProp(t, e.c, 1, 255, this)),
                    (this.style = i),
                    (this._isAnimated = !!this._isAnimated);
            }
            function SVGFillStyleData(t, e, i) {
                this.initDynamicPropertyContainer(t), (this.getValue = this.iterateDynamicProperties), (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)), (this.c = PropertyFactory.getProp(t, e.c, 1, 255, this)), (this.style = i);
            }
            function SVGGradientFillStyleData(t, e, i) {
                this.initDynamicPropertyContainer(t), (this.getValue = this.iterateDynamicProperties), this.initGradientData(t, e, i);
            }
            function SVGGradientStrokeStyleData(t, e, i) {
                this.initDynamicPropertyContainer(t),
                    (this.getValue = this.iterateDynamicProperties),
                    (this.w = PropertyFactory.getProp(t, e.w, 0, null, this)),
                    (this.d = new DashProperty(t, e.d || {}, "svg", this)),
                    this.initGradientData(t, e, i),
                    (this._isAnimated = !!this._isAnimated);
            }
            function ShapeGroupData() {
                (this.it = []), (this.prevViewData = []), (this.gr = createNS("g"));
            }
            (BaseRenderer.prototype.checkLayers = function (t) {
                var e,
                    i,
                    s = this.layers.length;
                for (this.completeLayers = !0, e = s - 1; 0 <= e; e--)
                    this.elements[e] || ((i = this.layers[e]).ip - i.st <= t - this.layers[e].st && i.op - i.st > t - this.layers[e].st && this.buildItem(e)), (this.completeLayers = !!this.elements[e] && this.completeLayers);
                this.checkPendingElements();
            }),
                (BaseRenderer.prototype.createItem = function (t) {
                    switch (t.ty) {
                        case 2:
                            return this.createImage(t);
                        case 0:
                            return this.createComp(t);
                        case 1:
                            return this.createSolid(t);
                        case 3:
                            return this.createNull(t);
                        case 4:
                            return this.createShape(t);
                        case 5:
                            return this.createText(t);
                        case 13:
                            return this.createCamera(t);
                    }
                    return this.createNull(t);
                }),
                (BaseRenderer.prototype.createCamera = function () {
                    throw new Error("You're using a 3d camera. Try the html renderer.");
                }),
                (BaseRenderer.prototype.buildAllItems = function () {
                    var t,
                        e = this.layers.length;
                    for (t = 0; t < e; t += 1) this.buildItem(t);
                    this.checkPendingElements();
                }),
                (BaseRenderer.prototype.includeLayers = function (t) {
                    this.completeLayers = !1;
                    var e,
                        i,
                        s = t.length,
                        r = this.layers.length;
                    for (e = 0; e < s; e += 1)
                        for (i = 0; i < r; ) {
                            if (this.layers[i].id == t[e].id) {
                                this.layers[i] = t[e];
                                break;
                            }
                            i += 1;
                        }
                }),
                (BaseRenderer.prototype.setProjectInterface = function (t) {
                    this.globalData.projectInterface = t;
                }),
                (BaseRenderer.prototype.initItems = function () {
                    this.globalData.progressiveLoad || this.buildAllItems();
                }),
                (BaseRenderer.prototype.buildElementParenting = function (t, e, i) {
                    for (var s = this.elements, r = this.layers, a = 0, n = r.length; a < n; )
                        r[a].ind == e &&
                            (s[a] && !0 !== s[a] ? (i.push(s[a]), s[a].setAsParent(), void 0 !== r[a].parent ? this.buildElementParenting(t, r[a].parent, i) : t.setHierarchy(i)) : (this.buildItem(a), this.addPendingElement(t))),
                            (a += 1);
                }),
                (BaseRenderer.prototype.addPendingElement = function (t) {
                    this.pendingElements.push(t);
                }),
                (BaseRenderer.prototype.searchExtraCompositions = function (t) {
                    var e,
                        i = t.length;
                    for (e = 0; e < i; e += 1)
                        if (t[e].xt) {
                            var s = this.createComp(t[e]);
                            s.initExpressions(), this.globalData.projectInterface.registerComposition(s);
                        }
                }),
                (BaseRenderer.prototype.setupGlobalData = function (t, e) {
                    (this.globalData.fontManager = new FontManager()),
                        this.globalData.fontManager.addChars(t.chars),
                        this.globalData.fontManager.addFonts(t.fonts, e),
                        (this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem)),
                        (this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem)),
                        (this.globalData.imageLoader = this.animationItem.imagePreloader),
                        (this.globalData.frameId = 0),
                        (this.globalData.frameRate = t.fr),
                        (this.globalData.nm = t.nm),
                        (this.globalData.compSize = { w: t.w, h: t.h });
                }),
                extendPrototype([BaseRenderer], SVGRenderer),
                (SVGRenderer.prototype.createNull = function (t) {
                    return new NullElement(t, this.globalData, this);
                }),
                (SVGRenderer.prototype.createShape = function (t) {
                    return new SVGShapeElement(t, this.globalData, this);
                }),
                (SVGRenderer.prototype.createText = function (t) {
                    return new SVGTextElement(t, this.globalData, this);
                }),
                (SVGRenderer.prototype.createImage = function (t) {
                    return new IImageElement(t, this.globalData, this);
                }),
                (SVGRenderer.prototype.createComp = function (t) {
                    return new SVGCompElement(t, this.globalData, this);
                }),
                (SVGRenderer.prototype.createSolid = function (t) {
                    return new ISolidElement(t, this.globalData, this);
                }),
                (SVGRenderer.prototype.configAnimation = function (t) {
                    this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
                        this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h),
                        this.renderConfig.viewBoxOnly ||
                            (this.svgElement.setAttribute("width", t.w),
                            this.svgElement.setAttribute("height", t.h),
                            (this.svgElement.style.width = "100%"),
                            (this.svgElement.style.height = "100%"),
                            (this.svgElement.style.transform = "translate3d(0,0,0)")),
                        this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className),
                        this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio),
                        this.animationItem.wrapper.appendChild(this.svgElement);
                    var e = this.globalData.defs;
                    this.setupGlobalData(t, e), (this.globalData.progressiveLoad = this.renderConfig.progressiveLoad), (this.data = t);
                    var i = createNS("clipPath"),
                        s = createNS("rect");
                    s.setAttribute("width", t.w), s.setAttribute("height", t.h), s.setAttribute("x", 0), s.setAttribute("y", 0);
                    var r = createElementID();
                    i.setAttribute("id", r),
                        i.appendChild(s),
                        this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + r + ")"),
                        e.appendChild(i),
                        (this.layers = t.layers),
                        (this.elements = createSizedArray(t.layers.length));
                }),
                (SVGRenderer.prototype.destroy = function () {
                    (this.animationItem.wrapper.innerHTML = ""), (this.layerElement = null), (this.globalData.defs = null);
                    var t,
                        e = this.layers ? this.layers.length : 0;
                    for (t = 0; t < e; t++) this.elements[t] && this.elements[t].destroy();
                    (this.elements.length = 0), (this.destroyed = !0), (this.animationItem = null);
                }),
                (SVGRenderer.prototype.updateContainerSize = function () {}),
                (SVGRenderer.prototype.buildItem = function (t) {
                    var e = this.elements;
                    if (!e[t] && 99 != this.layers[t].ty) {
                        e[t] = !0;
                        var i = this.createItem(this.layers[t]);
                        (e[t] = i),
                            expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(i), i.initExpressions()),
                            this.appendElementInPos(i, t),
                            this.layers[t].tt && (this.elements[t - 1] && !0 !== this.elements[t - 1] ? i.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(i)));
                    }
                }),
                (SVGRenderer.prototype.checkPendingElements = function () {
                    for (; this.pendingElements.length; ) {
                        var t = this.pendingElements.pop();
                        if ((t.checkParenting(), t.data.tt))
                            for (var e = 0, i = this.elements.length; e < i; ) {
                                if (this.elements[e] === t) {
                                    t.setMatte(this.elements[e - 1].layerId);
                                    break;
                                }
                                e += 1;
                            }
                    }
                }),
                (SVGRenderer.prototype.renderFrame = function (t) {
                    if (this.renderedFrame !== t && !this.destroyed) {
                        null === t ? (t = this.renderedFrame) : (this.renderedFrame = t), (this.globalData.frameNum = t), (this.globalData.frameId += 1), (this.globalData.projectInterface.currentFrame = t), (this.globalData._mdf = !1);
                        var e,
                            i = this.layers.length;
                        for (this.completeLayers || this.checkLayers(t), e = i - 1; 0 <= e; e--) (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
                        if (this.globalData._mdf) for (e = 0; e < i; e += 1) (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
                    }
                }),
                (SVGRenderer.prototype.appendElementInPos = function (t, e) {
                    var i = t.getBaseElement();
                    if (i) {
                        for (var s, r = 0; r < e; ) this.elements[r] && !0 !== this.elements[r] && this.elements[r].getBaseElement() && (s = this.elements[r].getBaseElement()), (r += 1);
                        s ? this.layerElement.insertBefore(i, s) : this.layerElement.appendChild(i);
                    }
                }),
                (SVGRenderer.prototype.hide = function () {
                    this.layerElement.style.display = "none";
                }),
                (SVGRenderer.prototype.show = function () {
                    this.layerElement.style.display = "block";
                }),
                (MaskElement.prototype.getMaskProperty = function (t) {
                    return this.viewData[t].prop;
                }),
                (MaskElement.prototype.renderFrame = function (t) {
                    var e,
                        i = this.element.finalTransform.mat,
                        s = this.masksProperties.length;
                    for (e = 0; e < s; e++)
                        if (
                            ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]),
                            (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v),
                            "n" !== this.masksProperties[e].mode &&
                                (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && (this.viewData[e].invRect.setAttribute("x", -i.props[12]), this.viewData[e].invRect.setAttribute("y", -i.props[13])),
                                this.storedData[e].x && (this.storedData[e].x._mdf || t)))
                        ) {
                            var r = this.storedData[e].expan;
                            this.storedData[e].x.v < 0
                                ? ("erode" !== this.storedData[e].lastOperator &&
                                      ((this.storedData[e].lastOperator = "erode"), this.storedData[e].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[e].filterId + ")")),
                                  r.setAttribute("radius", -this.storedData[e].x.v))
                                : ("dilate" !== this.storedData[e].lastOperator && ((this.storedData[e].lastOperator = "dilate"), this.storedData[e].elem.setAttribute("filter", null)),
                                  this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v));
                        }
                }),
                (MaskElement.prototype.getMaskelement = function () {
                    return this.maskElement;
                }),
                (MaskElement.prototype.createLayerSolidPath = function () {
                    var t = "M0,0 ";
                    return (t += " h" + this.globalData.compSize.w), (t += " v" + this.globalData.compSize.h), (t += " h-" + this.globalData.compSize.w) + " v-" + this.globalData.compSize.h + " ";
                }),
                (MaskElement.prototype.drawPath = function (t, e, i) {
                    var s,
                        r,
                        a = " M" + e.v[0][0] + "," + e.v[0][1];
                    for (r = e._length, s = 1; s < r; s += 1) a += " C" + e.o[s - 1][0] + "," + e.o[s - 1][1] + " " + e.i[s][0] + "," + e.i[s][1] + " " + e.v[s][0] + "," + e.v[s][1];
                    if ((e.c && 1 < r && (a += " C" + e.o[s - 1][0] + "," + e.o[s - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), i.lastPath !== a)) {
                        var n = "";
                        i.elem && (e.c && (n = t.inv ? this.solidPath + a : a), i.elem.setAttribute("d", n)), (i.lastPath = a);
                    }
                }),
                (MaskElement.prototype.destroy = function () {
                    (this.element = null), (this.globalData = null), (this.maskElement = null), (this.data = null), (this.masksProperties = null);
                }),
                (HierarchyElement.prototype = {
                    initHierarchy: function () {
                        (this.hierarchy = []), (this._isParent = !1), this.checkParenting();
                    },
                    setHierarchy: function (t) {
                        this.hierarchy = t;
                    },
                    setAsParent: function () {
                        this._isParent = !0;
                    },
                    checkParenting: function () {
                        void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, []);
                    },
                }),
                (FrameElement.prototype = {
                    initFrame: function () {
                        (this._isFirstFrame = !1), (this.dynamicProperties = []), (this._mdf = !1);
                    },
                    prepareProperties: function (t, e) {
                        var i,
                            s = this.dynamicProperties.length;
                        for (i = 0; i < s; i += 1)
                            (e || (this._isParent && "transform" === this.dynamicProperties[i].propType)) && (this.dynamicProperties[i].getValue(), this.dynamicProperties[i]._mdf && ((this.globalData._mdf = !0), (this._mdf = !0)));
                    },
                    addDynamicProperty: function (t) {
                        -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t);
                    },
                }),
                (TransformElement.prototype = {
                    initTransform: function () {
                        (this.finalTransform = { mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : { o: 0 }, _matMdf: !1, _opMdf: !1, mat: new Matrix() }),
                            this.data.ao && (this.finalTransform.mProp.autoOriented = !0),
                            this.data.ty;
                    },
                    renderTransform: function () {
                        if (((this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame), (this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame), this.hierarchy)) {
                            var t,
                                e = this.finalTransform.mat,
                                i = 0,
                                s = this.hierarchy.length;
                            if (!this.finalTransform._matMdf)
                                for (; i < s; ) {
                                    if (this.hierarchy[i].finalTransform.mProp._mdf) {
                                        this.finalTransform._matMdf = !0;
                                        break;
                                    }
                                    i += 1;
                                }
                            if (this.finalTransform._matMdf)
                                for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), i = 0; i < s; i += 1)
                                    (t = this.hierarchy[i].finalTransform.mProp.v.props), e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
                        }
                    },
                    globalToLocal: function (t) {
                        var e = [];
                        e.push(this.finalTransform);
                        for (var i = !0, s = this.comp; i; ) s.finalTransform ? (s.data.hasMask && e.splice(0, 0, s.finalTransform), (s = s.comp)) : (i = !1);
                        var r,
                            a,
                            n = e.length;
                        for (r = 0; r < n; r += 1) (a = e[r].mat.applyToPointArray(0, 0, 0)), (t = [t[0] - a[0], t[1] - a[1], 0]);
                        return t;
                    },
                    mHelper: new Matrix(),
                }),
                (RenderableElement.prototype = {
                    initRenderable: function () {
                        (this.isInRange = !1), (this.hidden = !1), (this.isTransparent = !1), (this.renderableComponents = []);
                    },
                    addRenderableComponent: function (t) {
                        -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t);
                    },
                    removeRenderableComponent: function (t) {
                        -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1);
                    },
                    prepareRenderableFrame: function (t) {
                        this.checkLayerLimits(t);
                    },
                    checkTransparency: function () {
                        this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && ((this.isTransparent = !0), this.hide()) : this.isTransparent && ((this.isTransparent = !1), this.show());
                    },
                    checkLayerLimits: function (t) {
                        this.data.ip - this.data.st <= t && this.data.op - this.data.st > t
                            ? !0 !== this.isInRange && ((this.globalData._mdf = !0), (this._mdf = !0), (this.isInRange = !0), this.show())
                            : !1 !== this.isInRange && ((this.globalData._mdf = !0), (this.isInRange = !1), this.hide());
                    },
                    renderRenderable: function () {
                        var t,
                            e = this.renderableComponents.length;
                        for (t = 0; t < e; t += 1) this.renderableComponents[t].renderFrame(this._isFirstFrame);
                    },
                    sourceRectAtTime: function () {
                        return { top: 0, left: 0, width: 100, height: 100 };
                    },
                    getLayerSize: function () {
                        return 5 === this.data.ty ? { w: this.data.textData.width, h: this.data.textData.height } : { w: this.data.width, h: this.data.height };
                    },
                }),
                extendPrototype(
                    [
                        RenderableElement,
                        createProxyFunction({
                            initElement: function (t, e, i) {
                                this.initFrame(),
                                    this.initBaseData(t, e, i),
                                    this.initTransform(t, e, i),
                                    this.initHierarchy(),
                                    this.initRenderable(),
                                    this.initRendererElement(),
                                    this.createContainerElements(),
                                    this.createRenderableComponents(),
                                    this.createContent(),
                                    this.hide();
                            },
                            hide: function () {
                                this.hidden || (this.isInRange && !this.isTransparent) || (((this.baseElement || this.layerElement).style.display = "none"), (this.hidden = !0));
                            },
                            show: function () {
                                this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), (this.hidden = !1), (this._isFirstFrame = !0));
                            },
                            renderFrame: function () {
                                this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
                            },
                            renderInnerContent: function () {},
                            prepareFrame: function (t) {
                                (this._mdf = !1), this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency();
                            },
                            destroy: function () {
                                (this.innerElem = null), this.destroyBaseElement();
                            },
                        }),
                    ],
                    RenderableDOMElement
                ),
                (SVGStyleData.prototype.reset = function () {
                    (this.d = ""), (this._mdf = !1);
                }),
                (SVGShapeData.prototype.setAsAnimated = function () {
                    this._isAnimated = !0;
                }),
                extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData),
                extendPrototype([DynamicPropertyContainer], SVGFillStyleData),
                (SVGGradientFillStyleData.prototype.initGradientData = function (t, e, i) {
                    (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)),
                        (this.s = PropertyFactory.getProp(t, e.s, 1, null, this)),
                        (this.e = PropertyFactory.getProp(t, e.e, 1, null, this)),
                        (this.h = PropertyFactory.getProp(t, e.h || { k: 0 }, 0, 0.01, this)),
                        (this.a = PropertyFactory.getProp(t, e.a || { k: 0 }, 0, degToRads, this)),
                        (this.g = new GradientProperty(t, e.g, this)),
                        (this.style = i),
                        (this.stops = []),
                        this.setGradientData(i.pElem, e),
                        this.setGradientOpacity(e, i),
                        (this._isAnimated = !!this._isAnimated);
                }),
                (SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
                    var i = createElementID(),
                        s = createNS(1 === e.t ? "linearGradient" : "radialGradient");
                    s.setAttribute("id", i), s.setAttribute("spreadMethod", "pad"), s.setAttribute("gradientUnits", "userSpaceOnUse");
                    var r,
                        a,
                        n,
                        o = [];
                    for (n = 4 * e.g.p, a = 0; a < n; a += 4) (r = createNS("stop")), s.appendChild(r), o.push(r);
                    t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(" + locationHref + "#" + i + ")"), (this.gf = s), (this.cst = o);
                }),
                (SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
                    if (this.g._hasOpacity && !this.g._collapsable) {
                        var i,
                            s,
                            r,
                            a = createNS("mask"),
                            n = createNS("path");
                        a.appendChild(n);
                        var o = createElementID(),
                            l = createElementID();
                        a.setAttribute("id", l);
                        var h = createNS(1 === t.t ? "linearGradient" : "radialGradient");
                        h.setAttribute("id", o), h.setAttribute("spreadMethod", "pad"), h.setAttribute("gradientUnits", "userSpaceOnUse"), (r = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length);
                        var p = this.stops;
                        for (s = 4 * t.g.p; s < r; s += 2) (i = createNS("stop")).setAttribute("stop-color", "rgb(255,255,255)"), h.appendChild(i), p.push(i);
                        n.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(" + locationHref + "#" + o + ")"), (this.of = h), (this.ms = a), (this.ost = p), (this.maskId = l), (e.msElem = n);
                    }
                }),
                extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData),
                extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
            var SVGElementsRenderer = (function () {
                var t = new Matrix(),
                    e = new Matrix();
                function i(t, e, i) {
                    (i || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v), (i || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS());
                }
                function s(i, s, r) {
                    var a,
                        n,
                        o,
                        l,
                        h,
                        p,
                        d,
                        c,
                        f,
                        u,
                        m,
                        g = s.styles.length,
                        y = s.lvl;
                    for (p = 0; p < g; p += 1) {
                        if (((l = s.sh._mdf || r), s.styles[p].lvl < y)) {
                            for (c = e.reset(), u = y - s.styles[p].lvl, m = s.transformers.length - 1; !l && 0 < u; ) (l = s.transformers[m].mProps._mdf || l), u--, m--;
                            if (l)
                                for (u = y - s.styles[p].lvl, m = s.transformers.length - 1; 0 < u; )
                                    (f = s.transformers[m].mProps.v.props), c.transform(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]), u--, m--;
                        } else c = t;
                        if (((n = (d = s.sh.paths)._length), l)) {
                            for (o = "", a = 0; a < n; a += 1) (h = d.shapes[a]) && h._length && (o += buildShapeString(h, h._length, h.c, c));
                            s.caches[p] = o;
                        } else o = s.caches[p];
                        (s.styles[p].d += !0 === i.hd ? "" : o), (s.styles[p]._mdf = l || s.styles[p]._mdf);
                    }
                }
                function r(t, e, i) {
                    var s = e.style;
                    (e.c._mdf || i) && s.pElem.setAttribute("fill", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || i) && s.pElem.setAttribute("fill-opacity", e.o.v);
                }
                function a(t, e, i) {
                    n(t, e, i), o(t, e, i);
                }
                function n(t, e, i) {
                    var s,
                        r,
                        a,
                        n,
                        o,
                        l = e.gf,
                        h = e.g._hasOpacity,
                        p = e.s.v,
                        d = e.e.v;
                    if (e.o._mdf || i) {
                        var c = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
                        e.style.pElem.setAttribute(c, e.o.v);
                    }
                    if (e.s._mdf || i) {
                        var f = 1 === t.t ? "x1" : "cx",
                            u = "x1" === f ? "y1" : "cy";
                        l.setAttribute(f, p[0]), l.setAttribute(u, p[1]), h && !e.g._collapsable && (e.of.setAttribute(f, p[0]), e.of.setAttribute(u, p[1]));
                    }
                    if (e.g._cmdf || i) {
                        s = e.cst;
                        var m = e.g.c;
                        for (a = s.length, r = 0; r < a; r += 1) (n = s[r]).setAttribute("offset", m[4 * r] + "%"), n.setAttribute("stop-color", "rgb(" + m[4 * r + 1] + "," + m[4 * r + 2] + "," + m[4 * r + 3] + ")");
                    }
                    if (h && (e.g._omdf || i)) {
                        var g = e.g.o;
                        for (a = (s = e.g._collapsable ? e.cst : e.ost).length, r = 0; r < a; r += 1) (n = s[r]), e.g._collapsable || n.setAttribute("offset", g[2 * r] + "%"), n.setAttribute("stop-opacity", g[2 * r + 1]);
                    }
                    if (1 === t.t) (e.e._mdf || i) && (l.setAttribute("x2", d[0]), l.setAttribute("y2", d[1]), h && !e.g._collapsable && (e.of.setAttribute("x2", d[0]), e.of.setAttribute("y2", d[1])));
                    else if (
                        ((e.s._mdf || e.e._mdf || i) && ((o = Math.sqrt(Math.pow(p[0] - d[0], 2) + Math.pow(p[1] - d[1], 2))), l.setAttribute("r", o), h && !e.g._collapsable && e.of.setAttribute("r", o)),
                        e.e._mdf || e.h._mdf || e.a._mdf || i)
                    ) {
                        o || (o = Math.sqrt(Math.pow(p[0] - d[0], 2) + Math.pow(p[1] - d[1], 2)));
                        var y = Math.atan2(d[1] - p[1], d[0] - p[0]),
                            v = o * (1 <= e.h.v ? 0.99 : e.h.v <= -1 ? -0.99 : e.h.v),
                            b = Math.cos(y + e.a.v) * v + p[0],
                            w = Math.sin(y + e.a.v) * v + p[1];
                        l.setAttribute("fx", b), l.setAttribute("fy", w), h && !e.g._collapsable && (e.of.setAttribute("fx", b), e.of.setAttribute("fy", w));
                    }
                }
                function o(t, e, i) {
                    var s = e.style,
                        r = e.d;
                    r && (r._mdf || i) && r.dashStr && (s.pElem.setAttribute("stroke-dasharray", r.dashStr), s.pElem.setAttribute("stroke-dashoffset", r.dashoffset[0])),
                        e.c && (e.c._mdf || i) && s.pElem.setAttribute("stroke", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"),
                        (e.o._mdf || i) && s.pElem.setAttribute("stroke-opacity", e.o.v),
                        (e.w._mdf || i) && (s.pElem.setAttribute("stroke-width", e.w.v), s.msElem && s.msElem.setAttribute("stroke-width", e.w.v));
                }
                return {
                    createRenderFunction: function (t) {
                        switch ((t.ty, t.ty)) {
                            case "fl":
                                return r;
                            case "gf":
                                return n;
                            case "gs":
                                return a;
                            case "st":
                                return o;
                            case "sh":
                            case "el":
                            case "rc":
                            case "sr":
                                return s;
                            case "tr":
                                return i;
                        }
                    },
                };
            })();
            function ShapeTransformManager() {
                (this.sequences = {}), (this.sequenceList = []), (this.transform_key_count = 0);
            }
            function BaseElement() {}
            function NullElement(t, e, i) {
                this.initFrame(), this.initBaseData(t, e, i), this.initFrame(), this.initTransform(t, e, i), this.initHierarchy();
            }
            function SVGBaseElement() {}
            function IShapeElement() {}
            function ITextElement() {}
            function ICompElement() {}
            function IImageElement(t, e, i) {
                (this.assetData = e.getAssetData(t.refId)), this.initElement(t, e, i), (this.sourceRect = { top: 0, left: 0, width: this.assetData.w, height: this.assetData.h });
            }
            function ISolidElement(t, e, i) {
                this.initElement(t, e, i);
            }
            function SVGCompElement(t, e, i) {
                (this.layers = t.layers),
                    (this.supports3d = !0),
                    (this.completeLayers = !1),
                    (this.pendingElements = []),
                    (this.elements = this.layers ? createSizedArray(this.layers.length) : []),
                    this.initElement(t, e, i),
                    (this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : { _placeholder: !0 });
            }
            function SVGTextElement(t, e, i) {
                (this.textSpans = []), (this.renderType = "svg"), this.initElement(t, e, i);
            }
            function SVGShapeElement(t, e, i) {
                (this.shapes = []),
                    (this.shapesData = t.shapes),
                    (this.stylesList = []),
                    (this.shapeModifiers = []),
                    (this.itemsData = []),
                    (this.processedElements = []),
                    (this.animatedContents = []),
                    this.initElement(t, e, i),
                    (this.prevViewData = []);
            }
            function SVGTintFilter(t, e) {
                this.filterManager = e;
                var i = createNS("feColorMatrix");
                if (
                    (i.setAttribute("type", "matrix"),
                    i.setAttribute("color-interpolation-filters", "linearRGB"),
                    i.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"),
                    i.setAttribute("result", "f1"),
                    t.appendChild(i),
                    (i = createNS("feColorMatrix")).setAttribute("type", "matrix"),
                    i.setAttribute("color-interpolation-filters", "sRGB"),
                    i.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),
                    i.setAttribute("result", "f2"),
                    t.appendChild(i),
                    (this.matrixFilter = i),
                    100 !== e.effectElements[2].p.v || e.effectElements[2].p.k)
                ) {
                    var s,
                        r = createNS("feMerge");
                    t.appendChild(r), (s = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), r.appendChild(s), (s = createNS("feMergeNode")).setAttribute("in", "f2"), r.appendChild(s);
                }
            }
            function SVGFillFilter(t, e) {
                this.filterManager = e;
                var i = createNS("feColorMatrix");
                i.setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "sRGB"), i.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), t.appendChild(i), (this.matrixFilter = i);
            }
            function SVGGaussianBlurEffect(t, e) {
                t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "300%"), t.setAttribute("height", "300%"), (this.filterManager = e);
                var i = createNS("feGaussianBlur");
                t.appendChild(i), (this.feGaussianBlur = i);
            }
            function SVGStrokeEffect(t, e) {
                (this.initialized = !1), (this.filterManager = e), (this.elem = t), (this.paths = []);
            }
            function SVGTritoneFilter(t, e) {
                this.filterManager = e;
                var i = createNS("feColorMatrix");
                i.setAttribute("type", "matrix"),
                    i.setAttribute("color-interpolation-filters", "linearRGB"),
                    i.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"),
                    i.setAttribute("result", "f1"),
                    t.appendChild(i);
                var s = createNS("feComponentTransfer");
                s.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(s), (this.matrixFilter = s);
                var r = createNS("feFuncR");
                r.setAttribute("type", "table"), s.appendChild(r), (this.feFuncR = r);
                var a = createNS("feFuncG");
                a.setAttribute("type", "table"), s.appendChild(a), (this.feFuncG = a);
                var n = createNS("feFuncB");
                n.setAttribute("type", "table"), s.appendChild(n), (this.feFuncB = n);
            }
            function SVGProLevelsFilter(t, e) {
                this.filterManager = e;
                var i = this.filterManager.effectElements,
                    s = createNS("feComponentTransfer");
                (i[10].p.k || 0 !== i[10].p.v || i[11].p.k || 1 !== i[11].p.v || i[12].p.k || 1 !== i[12].p.v || i[13].p.k || 0 !== i[13].p.v || i[14].p.k || 1 !== i[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", s)),
                    (i[17].p.k || 0 !== i[17].p.v || i[18].p.k || 1 !== i[18].p.v || i[19].p.k || 1 !== i[19].p.v || i[20].p.k || 0 !== i[20].p.v || i[21].p.k || 1 !== i[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", s)),
                    (i[24].p.k || 0 !== i[24].p.v || i[25].p.k || 1 !== i[25].p.v || i[26].p.k || 1 !== i[26].p.v || i[27].p.k || 0 !== i[27].p.v || i[28].p.k || 1 !== i[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", s)),
                    (i[31].p.k || 0 !== i[31].p.v || i[32].p.k || 1 !== i[32].p.v || i[33].p.k || 1 !== i[33].p.v || i[34].p.k || 0 !== i[34].p.v || i[35].p.k || 1 !== i[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", s)),
                    (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (s.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(s), (s = createNS("feComponentTransfer"))),
                    (i[3].p.k || 0 !== i[3].p.v || i[4].p.k || 1 !== i[4].p.v || i[5].p.k || 1 !== i[5].p.v || i[6].p.k || 0 !== i[6].p.v || i[7].p.k || 1 !== i[7].p.v) &&
                        (s.setAttribute("color-interpolation-filters", "sRGB"),
                        t.appendChild(s),
                        (this.feFuncRComposed = this.createFeFunc("feFuncR", s)),
                        (this.feFuncGComposed = this.createFeFunc("feFuncG", s)),
                        (this.feFuncBComposed = this.createFeFunc("feFuncB", s)));
            }
            function SVGDropShadowEffect(t, e) {
                t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "400%"), t.setAttribute("height", "400%"), (this.filterManager = e);
                var i = createNS("feGaussianBlur");
                i.setAttribute("in", "SourceAlpha"), i.setAttribute("result", "drop_shadow_1"), i.setAttribute("stdDeviation", "0"), (this.feGaussianBlur = i), t.appendChild(i);
                var s = createNS("feOffset");
                s.setAttribute("dx", "25"), s.setAttribute("dy", "0"), s.setAttribute("in", "drop_shadow_1"), s.setAttribute("result", "drop_shadow_2"), (this.feOffset = s), t.appendChild(s);
                var r = createNS("feFlood");
                r.setAttribute("flood-color", "#00ff00"), r.setAttribute("flood-opacity", "1"), r.setAttribute("result", "drop_shadow_3"), (this.feFlood = r), t.appendChild(r);
                var a = createNS("feComposite");
                a.setAttribute("in", "drop_shadow_3"), a.setAttribute("in2", "drop_shadow_2"), a.setAttribute("operator", "in"), a.setAttribute("result", "drop_shadow_4"), t.appendChild(a);
                var n,
                    o = createNS("feMerge");
                t.appendChild(o),
                    (n = createNS("feMergeNode")),
                    o.appendChild(n),
                    (n = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"),
                    (this.feMergeNode = n),
                    (this.feMerge = o),
                    (this.originalNodeAdded = !1),
                    o.appendChild(n);
            }
            (ShapeTransformManager.prototype = {
                addTransformSequence: function (t) {
                    var e,
                        i = t.length,
                        s = "_";
                    for (e = 0; e < i; e += 1) s += t[e].transform.key + "_";
                    var r = this.sequences[s];
                    return r || ((r = { transforms: [].concat(t), finalTransform: new Matrix(), _mdf: !1 }), (this.sequences[s] = r), this.sequenceList.push(r)), r;
                },
                processSequence: function (t, e) {
                    for (var i, s = 0, r = t.transforms.length, a = e; s < r && !e; ) {
                        if (t.transforms[s].transform.mProps._mdf) {
                            a = !0;
                            break;
                        }
                        s += 1;
                    }
                    if (a)
                        for (t.finalTransform.reset(), s = r - 1; 0 <= s; s -= 1)
                            (i = t.transforms[s].transform.mProps.v.props), t.finalTransform.transform(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13], i[14], i[15]);
                    t._mdf = a;
                },
                processSequences: function (t) {
                    var e,
                        i = this.sequenceList.length;
                    for (e = 0; e < i; e += 1) this.processSequence(this.sequenceList[e], t);
                },
                getNewKey: function () {
                    return "_" + this.transform_key_count++;
                },
            }),
                (BaseElement.prototype = {
                    checkMasks: function () {
                        if (!this.data.hasMask) return !1;
                        for (var t = 0, e = this.data.masksProperties.length; t < e; ) {
                            if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
                            t += 1;
                        }
                        return !1;
                    },
                    initExpressions: function () {
                        (this.layerInterface = LayerExpressionInterface(this)), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
                        var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
                        this.layerInterface.registerEffectsInterface(t),
                            0 === this.data.ty || this.data.xt
                                ? (this.compInterface = CompExpressionInterface(this))
                                : 4 === this.data.ty
                                ? ((this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface)), (this.layerInterface.content = this.layerInterface.shapeInterface))
                                : 5 === this.data.ty && ((this.layerInterface.textInterface = TextExpressionInterface(this)), (this.layerInterface.text = this.layerInterface.textInterface));
                    },
                    setBlendMode: function () {
                        var t = getBlendMode(this.data.bm);
                        (this.baseElement || this.layerElement).style["mix-blend-mode"] = t;
                    },
                    initBaseData: function (t, e, i) {
                        (this.globalData = e), (this.comp = i), (this.data = t), (this.layerId = createElementID()), this.data.sr || (this.data.sr = 1), (this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties));
                    },
                    getType: function () {
                        return this.type;
                    },
                    sourceRectAtTime: function () {},
                }),
                (NullElement.prototype.prepareFrame = function (t) {
                    this.prepareProperties(t, !0);
                }),
                (NullElement.prototype.renderFrame = function () {}),
                (NullElement.prototype.getBaseElement = function () {
                    return null;
                }),
                (NullElement.prototype.destroy = function () {}),
                (NullElement.prototype.sourceRectAtTime = function () {}),
                (NullElement.prototype.hide = function () {}),
                extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement),
                (SVGBaseElement.prototype = {
                    initRendererElement: function () {
                        this.layerElement = createNS("g");
                    },
                    createContainerElements: function () {
                        (this.matteElement = createNS("g")), (this.transformedElement = this.layerElement), (this.maskedElement = this.layerElement), (this._sizeChanged = !1);
                        var t,
                            e,
                            i,
                            s = null;
                        if (this.data.td) {
                            if (3 == this.data.td || 1 == this.data.td) {
                                var r = createNS("mask");
                                r.setAttribute("id", this.layerId),
                                    r.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"),
                                    r.appendChild(this.layerElement),
                                    (s = r),
                                    this.globalData.defs.appendChild(r),
                                    featureSupport.maskType ||
                                        1 != this.data.td ||
                                        (r.setAttribute("mask-type", "luminance"),
                                        (t = createElementID()),
                                        (e = filtersFactory.createFilter(t)),
                                        this.globalData.defs.appendChild(e),
                                        e.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                                        (i = createNS("g")).appendChild(this.layerElement),
                                        (s = i),
                                        r.appendChild(i),
                                        i.setAttribute("filter", "url(" + locationHref + "#" + t + ")"));
                            } else if (2 == this.data.td) {
                                var a = createNS("mask");
                                a.setAttribute("id", this.layerId), a.setAttribute("mask-type", "alpha");
                                var n = createNS("g");
                                a.appendChild(n), (t = createElementID()), (e = filtersFactory.createFilter(t));
                                var o = createNS("feComponentTransfer");
                                o.setAttribute("in", "SourceGraphic"), e.appendChild(o);
                                var l = createNS("feFuncA");
                                l.setAttribute("type", "table"), l.setAttribute("tableValues", "1.0 0.0"), o.appendChild(l), this.globalData.defs.appendChild(e);
                                var h = createNS("rect");
                                h.setAttribute("width", this.comp.data.w),
                                    h.setAttribute("height", this.comp.data.h),
                                    h.setAttribute("x", "0"),
                                    h.setAttribute("y", "0"),
                                    h.setAttribute("fill", "#ffffff"),
                                    h.setAttribute("opacity", "0"),
                                    n.setAttribute("filter", "url(" + locationHref + "#" + t + ")"),
                                    n.appendChild(h),
                                    n.appendChild(this.layerElement),
                                    (s = n),
                                    featureSupport.maskType ||
                                        (a.setAttribute("mask-type", "luminance"),
                                        e.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                                        (i = createNS("g")),
                                        n.appendChild(h),
                                        i.appendChild(this.layerElement),
                                        (s = i),
                                        n.appendChild(i)),
                                    this.globalData.defs.appendChild(a);
                            }
                        } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), (s = this.matteElement), (this.baseElement = this.matteElement)) : (this.baseElement = this.layerElement);
                        if ((this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 === this.data.ty && !this.data.hd)) {
                            var p = createNS("clipPath"),
                                d = createNS("path");
                            d.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
                            var c = createElementID();
                            if ((p.setAttribute("id", c), p.appendChild(d), this.globalData.defs.appendChild(p), this.checkMasks())) {
                                var f = createNS("g");
                                f.setAttribute("clip-path", "url(" + locationHref + "#" + c + ")"),
                                    f.appendChild(this.layerElement),
                                    (this.transformedElement = f),
                                    s ? s.appendChild(this.transformedElement) : (this.baseElement = this.transformedElement);
                            } else this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + c + ")");
                        }
                        0 !== this.data.bm && this.setBlendMode();
                    },
                    renderElement: function () {
                        this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()),
                            this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v);
                    },
                    destroyBaseElement: function () {
                        (this.layerElement = null), (this.matteElement = null), this.maskManager.destroy();
                    },
                    getBaseElement: function () {
                        return this.data.hd ? null : this.baseElement;
                    },
                    createRenderableComponents: function () {
                        (this.maskManager = new MaskElement(this.data, this, this.globalData)), (this.renderableEffectsManager = new SVGEffects(this));
                    },
                    setMatte: function (t) {
                        this.matteElement && this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + t + ")");
                    },
                }),
                (IShapeElement.prototype = {
                    addShapeToModifiers: function (t) {
                        var e,
                            i = this.shapeModifiers.length;
                        for (e = 0; e < i; e += 1) this.shapeModifiers[e].addShape(t);
                    },
                    isShapeInAnimatedModifiers: function (t) {
                        for (var e = this.shapeModifiers.length; 0 < e; ) if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
                        return !1;
                    },
                    renderModifiers: function () {
                        if (this.shapeModifiers.length) {
                            var t,
                                e = this.shapes.length;
                            for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();
                            for (t = (e = this.shapeModifiers.length) - 1; 0 <= t; t -= 1) this.shapeModifiers[t].processShapes(this._isFirstFrame);
                        }
                    },
                    lcEnum: { 1: "butt", 2: "round", 3: "square" },
                    ljEnum: { 1: "miter", 2: "round", 3: "bevel" },
                    searchProcessedElement: function (t) {
                        for (var e = this.processedElements, i = 0, s = e.length; i < s; ) {
                            if (e[i].elem === t) return e[i].pos;
                            i += 1;
                        }
                        return 0;
                    },
                    addProcessedElement: function (t, e) {
                        for (var i = this.processedElements, s = i.length; s; ) if (i[(s -= 1)].elem === t) return void (i[s].pos = e);
                        i.push(new ProcessedElement(t, e));
                    },
                    prepareFrame: function (t) {
                        this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange);
                    },
                }),
                (ITextElement.prototype.initElement = function (t, e, i) {
                    (this.lettersChangedFlag = !0),
                        this.initFrame(),
                        this.initBaseData(t, e, i),
                        (this.textProperty = new TextProperty(this, t.t, this.dynamicProperties)),
                        (this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this)),
                        this.initTransform(t, e, i),
                        this.initHierarchy(),
                        this.initRenderable(),
                        this.initRendererElement(),
                        this.createContainerElements(),
                        this.createRenderableComponents(),
                        this.createContent(),
                        this.hide(),
                        this.textAnimator.searchProperties(this.dynamicProperties);
                }),
                (ITextElement.prototype.prepareFrame = function (t) {
                    (this._mdf = !1),
                        this.prepareRenderableFrame(t),
                        this.prepareProperties(t, this.isInRange),
                        (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), (this.textProperty._isFirstFrame = !1), (this.textProperty._mdf = !1));
                }),
                (ITextElement.prototype.createPathShape = function (t, e) {
                    var i,
                        s,
                        r = e.length,
                        a = "";
                    for (i = 0; i < r; i += 1) (s = e[i].ks.k), (a += buildShapeString(s, s.i.length, !0, t));
                    return a;
                }),
                (ITextElement.prototype.updateDocumentData = function (t, e) {
                    this.textProperty.updateDocumentData(t, e);
                }),
                (ITextElement.prototype.canResizeFont = function (t) {
                    this.textProperty.canResizeFont(t);
                }),
                (ITextElement.prototype.setMinimumFontSize = function (t) {
                    this.textProperty.setMinimumFontSize(t);
                }),
                (ITextElement.prototype.applyTextPropertiesToMatrix = function (t, e, i, s, r) {
                    switch ((t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j)) {
                        case 1:
                            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]), 0, 0);
                            break;
                        case 2:
                            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]) / 2, 0, 0);
                    }
                    e.translate(s, r, 0);
                }),
                (ITextElement.prototype.buildColor = function (t) {
                    return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")";
                }),
                (ITextElement.prototype.emptyProp = new LetterProps()),
                (ITextElement.prototype.destroy = function () {}),
                extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement),
                (ICompElement.prototype.initElement = function (t, e, i) {
                    this.initFrame(),
                        this.initBaseData(t, e, i),
                        this.initTransform(t, e, i),
                        this.initRenderable(),
                        this.initHierarchy(),
                        this.initRendererElement(),
                        this.createContainerElements(),
                        this.createRenderableComponents(),
                        (!this.data.xt && e.progressiveLoad) || this.buildAllItems(),
                        this.hide();
                }),
                (ICompElement.prototype.prepareFrame = function (t) {
                    if (((this._mdf = !1), this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt)) {
                        if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;
                        else {
                            var e = this.tm.v;
                            e === this.data.op && (e = this.data.op - 1), (this.renderedFrame = e);
                        }
                        var i,
                            s = this.elements.length;
                        for (this.completeLayers || this.checkLayers(this.renderedFrame), i = s - 1; 0 <= i; i -= 1)
                            (this.completeLayers || this.elements[i]) && (this.elements[i].prepareFrame(this.renderedFrame - this.layers[i].st), this.elements[i]._mdf && (this._mdf = !0));
                    }
                }),
                (ICompElement.prototype.renderInnerContent = function () {
                    var t,
                        e = this.layers.length;
                    for (t = 0; t < e; t += 1) (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
                }),
                (ICompElement.prototype.setElements = function (t) {
                    this.elements = t;
                }),
                (ICompElement.prototype.getElements = function () {
                    return this.elements;
                }),
                (ICompElement.prototype.destroyElements = function () {
                    var t,
                        e = this.layers.length;
                    for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy();
                }),
                (ICompElement.prototype.destroy = function () {
                    this.destroyElements(), this.destroyBaseElement();
                }),
                extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement),
                (IImageElement.prototype.createContent = function () {
                    var t = this.globalData.getAssetsPath(this.assetData);
                    (this.innerElem = createNS("image")),
                        this.innerElem.setAttribute("width", this.assetData.w + "px"),
                        this.innerElem.setAttribute("height", this.assetData.h + "px"),
                        this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio),
                        this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t),
                        this.layerElement.appendChild(this.innerElem);
                }),
                (IImageElement.prototype.sourceRectAtTime = function () {
                    return this.sourceRect;
                }),
                extendPrototype([IImageElement], ISolidElement),
                (ISolidElement.prototype.createContent = function () {
                    var t = createNS("rect");
                    t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t);
                }),
                extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement),
                extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextElement),
                (SVGTextElement.prototype.createContent = function () {
                    this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"));
                }),
                (SVGTextElement.prototype.buildTextContents = function (t) {
                    for (var e = 0, i = t.length, s = [], r = ""; e < i; ) t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (s.push(r), (r = "")) : (r += t[e]), (e += 1);
                    return s.push(r), s;
                }),
                (SVGTextElement.prototype.buildNewText = function () {
                    var t,
                        e,
                        i = this.textProperty.currentData;
                    (this.renderedLetters = createSizedArray(i ? i.l.length : 0)),
                        i.fc ? this.layerElement.setAttribute("fill", this.buildColor(i.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"),
                        i.sc && (this.layerElement.setAttribute("stroke", this.buildColor(i.sc)), this.layerElement.setAttribute("stroke-width", i.sw)),
                        this.layerElement.setAttribute("font-size", i.finalSize);
                    var s = this.globalData.fontManager.getFontByName(i.f);
                    if (s.fClass) this.layerElement.setAttribute("class", s.fClass);
                    else {
                        this.layerElement.setAttribute("font-family", s.fFamily);
                        var r = i.fWeight,
                            a = i.fStyle;
                        this.layerElement.setAttribute("font-style", a), this.layerElement.setAttribute("font-weight", r);
                    }
                    this.layerElement.setAttribute("arial-label", i.t);
                    var n,
                        o = i.l || [],
                        l = !!this.globalData.fontManager.chars;
                    e = o.length;
                    var h,
                        p = this.mHelper,
                        d = "",
                        c = this.data.singleShape,
                        f = 0,
                        u = 0,
                        m = !0,
                        g = (i.tr / 1e3) * i.finalSize;
                    if (!c || l || i.sz) {
                        var y,
                            v,
                            b = this.textSpans.length;
                        for (t = 0; t < e; t += 1)
                            (l && c && 0 !== t) ||
                                ((n = t < b ? this.textSpans[t] : createNS(l ? "path" : "text")),
                                b <= t && (n.setAttribute("stroke-linecap", "butt"), n.setAttribute("stroke-linejoin", "round"), n.setAttribute("stroke-miterlimit", "4"), (this.textSpans[t] = n), this.layerElement.appendChild(n)),
                                (n.style.display = "inherit")),
                                p.reset(),
                                p.scale(i.finalSize / 100, i.finalSize / 100),
                                c && (o[t].n && ((f = -g), (u += i.yOffset), (u += m ? 1 : 0), (m = !1)), this.applyTextPropertiesToMatrix(i, p, o[t].line, f, u), (f += o[t].l || 0), (f += g)),
                                l
                                    ? ((h = (y = ((v = this.globalData.fontManager.getCharData(i.finalText[t], s.fStyle, this.globalData.fontManager.getFontByName(i.f).fFamily)) && v.data) || {}).shapes ? y.shapes[0].it : []),
                                      c ? (d += this.createPathShape(p, h)) : n.setAttribute("d", this.createPathShape(p, h)))
                                    : (c && n.setAttribute("transform", "translate(" + p.props[12] + "," + p.props[13] + ")"), (n.textContent = o[t].val), n.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"));
                        c && n && n.setAttribute("d", d);
                    } else {
                        var w = this.textContainer,
                            S = "start";
                        switch (i.j) {
                            case 1:
                                S = "end";
                                break;
                            case 2:
                                S = "middle";
                        }
                        w.setAttribute("text-anchor", S), w.setAttribute("letter-spacing", g);
                        var k = this.buildTextContents(i.finalText);
                        for (e = k.length, u = i.ps ? i.ps[1] + i.ascent : 0, t = 0; t < e; t += 1)
                            ((n = this.textSpans[t] || createNS("tspan")).textContent = k[t]),
                                n.setAttribute("x", 0),
                                n.setAttribute("y", u),
                                (n.style.display = "inherit"),
                                w.appendChild(n),
                                (this.textSpans[t] = n),
                                (u += i.finalLineHeight);
                        this.layerElement.appendChild(w);
                    }
                    for (; t < this.textSpans.length; ) (this.textSpans[t].style.display = "none"), (t += 1);
                    this._sizeChanged = !0;
                }),
                (SVGTextElement.prototype.sourceRectAtTime = function (t) {
                    if ((this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged)) {
                        this._sizeChanged = !1;
                        var e = this.layerElement.getBBox();
                        this.bbox = { top: e.y, left: e.x, width: e.width, height: e.height };
                    }
                    return this.bbox;
                }),
                (SVGTextElement.prototype.renderInnerContent = function () {
                    if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
                        var t, e;
                        this._sizeChanged = !0;
                        var i,
                            s,
                            r = this.textAnimator.renderedLetters,
                            a = this.textProperty.currentData.l;
                        for (e = a.length, t = 0; t < e; t += 1)
                            a[t].n ||
                                ((i = r[t]),
                                (s = this.textSpans[t]),
                                i._mdf.m && s.setAttribute("transform", i.m),
                                i._mdf.o && s.setAttribute("opacity", i.o),
                                i._mdf.sw && s.setAttribute("stroke-width", i.sw),
                                i._mdf.sc && s.setAttribute("stroke", i.sc),
                                i._mdf.fc && s.setAttribute("fill", i.fc));
                    }
                }),
                extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement),
                (SVGShapeElement.prototype.initSecondaryElement = function () {}),
                (SVGShapeElement.prototype.identityMatrix = new Matrix()),
                (SVGShapeElement.prototype.buildExpressionInterface = function () {}),
                (SVGShapeElement.prototype.createContent = function () {
                    this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes();
                }),
                (SVGShapeElement.prototype.filterUniqueShapes = function () {
                    var t,
                        e,
                        i,
                        s,
                        r = this.shapes.length,
                        a = this.stylesList.length,
                        n = [],
                        o = !1;
                    for (i = 0; i < a; i += 1) {
                        for (s = this.stylesList[i], o = !1, t = n.length = 0; t < r; t += 1) -1 !== (e = this.shapes[t]).styles.indexOf(s) && (n.push(e), (o = e._isAnimated || o));
                        1 < n.length && o && this.setShapesAsAnimated(n);
                    }
                }),
                (SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
                    var e,
                        i = t.length;
                    for (e = 0; e < i; e += 1) t[e].setAsAnimated();
                }),
                (SVGShapeElement.prototype.createStyleElement = function (t, e) {
                    var i,
                        s = new SVGStyleData(t, e),
                        r = s.pElem;
                    return (
                        "st" === t.ty
                            ? (i = new SVGStrokeStyleData(this, t, s))
                            : "fl" === t.ty
                            ? (i = new SVGFillStyleData(this, t, s))
                            : ("gf" !== t.ty && "gs" !== t.ty) ||
                              ((i = new ("gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t, s)),
                              this.globalData.defs.appendChild(i.gf),
                              i.maskId && (this.globalData.defs.appendChild(i.ms), this.globalData.defs.appendChild(i.of), r.setAttribute("mask", "url(" + locationHref + "#" + i.maskId + ")"))),
                        ("st" !== t.ty && "gs" !== t.ty) ||
                            (r.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"),
                            r.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"),
                            r.setAttribute("fill-opacity", "0"),
                            1 === t.lj && r.setAttribute("stroke-miterlimit", t.ml)),
                        2 === t.r && r.setAttribute("fill-rule", "evenodd"),
                        t.ln && r.setAttribute("id", t.ln),
                        t.cl && r.setAttribute("class", t.cl),
                        t.bm && (r.style["mix-blend-mode"] = getBlendMode(t.bm)),
                        this.stylesList.push(s),
                        this.addToAnimatedContents(t, i),
                        i
                    );
                }),
                (SVGShapeElement.prototype.createGroupElement = function (t) {
                    var e = new ShapeGroupData();
                    return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)), e;
                }),
                (SVGShapeElement.prototype.createTransformElement = function (t, e) {
                    var i = TransformPropertyFactory.getTransformProperty(this, t, this),
                        s = new SVGTransformData(i, i.o, e);
                    return this.addToAnimatedContents(t, s), s;
                }),
                (SVGShapeElement.prototype.createShapeElement = function (t, e, i) {
                    var s = 4;
                    "rc" === t.ty ? (s = 5) : "el" === t.ty ? (s = 6) : "sr" === t.ty && (s = 7);
                    var r = new SVGShapeData(e, i, ShapePropertyFactory.getShapeProp(this, t, s, this));
                    return this.shapes.push(r), this.addShapeToModifiers(r), this.addToAnimatedContents(t, r), r;
                }),
                (SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
                    for (var i = 0, s = this.animatedContents.length; i < s; ) {
                        if (this.animatedContents[i].element === e) return;
                        i += 1;
                    }
                    this.animatedContents.push({ fn: SVGElementsRenderer.createRenderFunction(t), element: e, data: t });
                }),
                (SVGShapeElement.prototype.setElementStyles = function (t) {
                    var e,
                        i = t.styles,
                        s = this.stylesList.length;
                    for (e = 0; e < s; e += 1) this.stylesList[e].closed || i.push(this.stylesList[e]);
                }),
                (SVGShapeElement.prototype.reloadShapes = function () {
                    this._isFirstFrame = !0;
                    var t,
                        e = this.itemsData.length;
                    for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
                    for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1)
                        this.dynamicProperties[t].getValue();
                    this.renderModifiers();
                }),
                (SVGShapeElement.prototype.searchShapes = function (t, e, i, s, r, a, n) {
                    var o,
                        l,
                        h,
                        p,
                        d,
                        c,
                        f = [].concat(a),
                        u = t.length - 1,
                        m = [],
                        g = [];
                    for (o = u; 0 <= o; o -= 1) {
                        if (((c = this.searchProcessedElement(t[o])) ? (e[o] = i[c - 1]) : (t[o]._render = n), "fl" == t[o].ty || "st" == t[o].ty || "gf" == t[o].ty || "gs" == t[o].ty))
                            c ? (e[o].style.closed = !1) : (e[o] = this.createStyleElement(t[o], r)), t[o]._render && s.appendChild(e[o].style.pElem), m.push(e[o].style);
                        else if ("gr" == t[o].ty) {
                            if (c) for (h = e[o].it.length, l = 0; l < h; l += 1) e[o].prevViewData[l] = e[o].it[l];
                            else e[o] = this.createGroupElement(t[o]);
                            this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, r + 1, f, n), t[o]._render && s.appendChild(e[o].gr);
                        } else
                            "tr" == t[o].ty
                                ? (c || (e[o] = this.createTransformElement(t[o], s)), (p = e[o].transform), f.push(p))
                                : "sh" == t[o].ty || "rc" == t[o].ty || "el" == t[o].ty || "sr" == t[o].ty
                                ? (c || (e[o] = this.createShapeElement(t[o], f, r)), this.setElementStyles(e[o]))
                                : "tm" == t[o].ty || "rd" == t[o].ty || "ms" == t[o].ty
                                ? (c ? ((d = e[o]).closed = !1) : ((d = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]), (e[o] = d), this.shapeModifiers.push(d)), g.push(d))
                                : "rp" == t[o].ty && (c ? ((d = e[o]).closed = !0) : ((d = ShapeModifiers.getModifier(t[o].ty)), (e[o] = d).init(this, t, o, e), this.shapeModifiers.push(d), (n = !1)), g.push(d));
                        this.addProcessedElement(t[o], o + 1);
                    }
                    for (u = m.length, o = 0; o < u; o += 1) m[o].closed = !0;
                    for (u = g.length, o = 0; o < u; o += 1) g[o].closed = !0;
                }),
                (SVGShapeElement.prototype.renderInnerContent = function () {
                    this.renderModifiers();
                    var t,
                        e = this.stylesList.length;
                    for (t = 0; t < e; t += 1) this.stylesList[t].reset();
                    for (this.renderShape(), t = 0; t < e; t += 1)
                        (this.stylesList[t]._mdf || this._isFirstFrame) &&
                            (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), (this.stylesList[t].d = "M0 0" + this.stylesList[t].d)),
                            this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"));
                }),
                (SVGShapeElement.prototype.renderShape = function () {
                    var t,
                        e,
                        i = this.animatedContents.length;
                    for (t = 0; t < i; t += 1) (e = this.animatedContents[t]), (this._isFirstFrame || e.element._isAnimated) && !0 !== e.data && e.fn(e.data, e.element, this._isFirstFrame);
                }),
                (SVGShapeElement.prototype.destroy = function () {
                    this.destroyBaseElement(), (this.shapesData = null), (this.itemsData = null);
                }),
                (SVGTintFilter.prototype.renderFrame = function (t) {
                    if (t || this.filterManager._mdf) {
                        var e = this.filterManager.effectElements[0].p.v,
                            i = this.filterManager.effectElements[1].p.v,
                            s = this.filterManager.effectElements[2].p.v / 100;
                        this.matrixFilter.setAttribute("values", i[0] - e[0] + " 0 0 0 " + e[0] + " " + (i[1] - e[1]) + " 0 0 0 " + e[1] + " " + (i[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + s + " 0");
                    }
                }),
                (SVGFillFilter.prototype.renderFrame = function (t) {
                    if (t || this.filterManager._mdf) {
                        var e = this.filterManager.effectElements[2].p.v,
                            i = this.filterManager.effectElements[6].p.v;
                        this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + i + " 0");
                    }
                }),
                (SVGGaussianBlurEffect.prototype.renderFrame = function (t) {
                    if (t || this.filterManager._mdf) {
                        var e = 0.3 * this.filterManager.effectElements[0].p.v,
                            i = this.filterManager.effectElements[1].p.v,
                            s = 3 == i ? 0 : e,
                            r = 2 == i ? 0 : e;
                        this.feGaussianBlur.setAttribute("stdDeviation", s + " " + r);
                        var a = 1 == this.filterManager.effectElements[2].p.v ? "wrap" : "duplicate";
                        this.feGaussianBlur.setAttribute("edgeMode", a);
                    }
                }),
                (SVGStrokeEffect.prototype.initialize = function () {
                    var t,
                        e,
                        i,
                        s,
                        r = this.elem.layerElement.children || this.elem.layerElement.childNodes;
                    for (
                        1 === this.filterManager.effectElements[1].p.v ? ((s = this.elem.maskManager.masksProperties.length), (i = 0)) : (s = 1 + (i = this.filterManager.effectElements[0].p.v - 1)),
                            (e = createNS("g")).setAttribute("fill", "none"),
                            e.setAttribute("stroke-linecap", "round"),
                            e.setAttribute("stroke-dashoffset", 1);
                        i < s;
                        i += 1
                    )
                        (t = createNS("path")), e.appendChild(t), this.paths.push({ p: t, m: i });
                    if (3 === this.filterManager.effectElements[10].p.v) {
                        var a = createNS("mask"),
                            n = createElementID();
                        a.setAttribute("id", n), a.setAttribute("mask-type", "alpha"), a.appendChild(e), this.elem.globalData.defs.appendChild(a);
                        var o = createNS("g");
                        for (o.setAttribute("mask", "url(" + locationHref + "#" + n + ")"); r[0]; ) o.appendChild(r[0]);
                        this.elem.layerElement.appendChild(o), (this.masker = a), e.setAttribute("stroke", "#fff");
                    } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
                        if (2 === this.filterManager.effectElements[10].p.v) for (r = this.elem.layerElement.children || this.elem.layerElement.childNodes; r.length; ) this.elem.layerElement.removeChild(r[0]);
                        this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute("mask"), e.setAttribute("stroke", "#fff");
                    }
                    (this.initialized = !0), (this.pathMasker = e);
                }),
                (SVGStrokeEffect.prototype.renderFrame = function (t) {
                    this.initialized || this.initialize();
                    var e,
                        i,
                        s,
                        r = this.paths.length;
                    for (e = 0; e < r; e += 1)
                        if (
                            -1 !== this.paths[e].m &&
                            ((i = this.elem.maskManager.viewData[this.paths[e].m]),
                            (s = this.paths[e].p),
                            (t || this.filterManager._mdf || i.prop._mdf) && s.setAttribute("d", i.lastPath),
                            t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || i.prop._mdf)
                        ) {
                            var a;
                            if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
                                var n = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                                    o = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                                    l = s.getTotalLength();
                                a = "0 0 0 " + l * n + " ";
                                var h,
                                    p = l * (o - n),
                                    d = 1 + (2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v) / 100,
                                    c = Math.floor(p / d);
                                for (h = 0; h < c; h += 1) a += "1 " + (2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v) / 100 + " ";
                                a += "0 " + 10 * l + " 0 0";
                            } else a = "1 " + (2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v) / 100;
                            s.setAttribute("stroke-dasharray", a);
                        }
                    if (
                        ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v),
                        (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v),
                        (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf))
                    ) {
                        var f = this.filterManager.effectElements[3].p.v;
                        this.pathMasker.setAttribute("stroke", "rgb(" + bm_floor(255 * f[0]) + "," + bm_floor(255 * f[1]) + "," + bm_floor(255 * f[2]) + ")");
                    }
                }),
                (SVGTritoneFilter.prototype.renderFrame = function (t) {
                    if (t || this.filterManager._mdf) {
                        var e = this.filterManager.effectElements[0].p.v,
                            i = this.filterManager.effectElements[1].p.v,
                            s = this.filterManager.effectElements[2].p.v,
                            r = s[0] + " " + i[0] + " " + e[0],
                            a = s[1] + " " + i[1] + " " + e[1],
                            n = s[2] + " " + i[2] + " " + e[2];
                        this.feFuncR.setAttribute("tableValues", r), this.feFuncG.setAttribute("tableValues", a), this.feFuncB.setAttribute("tableValues", n);
                    }
                }),
                (SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
                    var i = createNS(t);
                    return i.setAttribute("type", "table"), e.appendChild(i), i;
                }),
                (SVGProLevelsFilter.prototype.getTableValue = function (t, e, i, s, r) {
                    for (var a, n, o = 0, l = Math.min(t, e), h = Math.max(t, e), p = Array.call(null, { length: 256 }), d = 0, c = r - s, f = e - t; o <= 256; )
                        (n = (a = o / 256) <= l ? (f < 0 ? r : s) : h <= a ? (f < 0 ? s : r) : s + c * Math.pow((a - t) / f, 1 / i)), (p[d++] = n), (o += 256 / 255);
                    return p.join(" ");
                }),
                (SVGProLevelsFilter.prototype.renderFrame = function (t) {
                    if (t || this.filterManager._mdf) {
                        var e,
                            i = this.filterManager.effectElements;
                        this.feFuncRComposed &&
                            (t || i[3].p._mdf || i[4].p._mdf || i[5].p._mdf || i[6].p._mdf || i[7].p._mdf) &&
                            ((e = this.getTableValue(i[3].p.v, i[4].p.v, i[5].p.v, i[6].p.v, i[7].p.v)),
                            this.feFuncRComposed.setAttribute("tableValues", e),
                            this.feFuncGComposed.setAttribute("tableValues", e),
                            this.feFuncBComposed.setAttribute("tableValues", e)),
                            this.feFuncR &&
                                (t || i[10].p._mdf || i[11].p._mdf || i[12].p._mdf || i[13].p._mdf || i[14].p._mdf) &&
                                ((e = this.getTableValue(i[10].p.v, i[11].p.v, i[12].p.v, i[13].p.v, i[14].p.v)), this.feFuncR.setAttribute("tableValues", e)),
                            this.feFuncG &&
                                (t || i[17].p._mdf || i[18].p._mdf || i[19].p._mdf || i[20].p._mdf || i[21].p._mdf) &&
                                ((e = this.getTableValue(i[17].p.v, i[18].p.v, i[19].p.v, i[20].p.v, i[21].p.v)), this.feFuncG.setAttribute("tableValues", e)),
                            this.feFuncB &&
                                (t || i[24].p._mdf || i[25].p._mdf || i[26].p._mdf || i[27].p._mdf || i[28].p._mdf) &&
                                ((e = this.getTableValue(i[24].p.v, i[25].p.v, i[26].p.v, i[27].p.v, i[28].p.v)), this.feFuncB.setAttribute("tableValues", e)),
                            this.feFuncA &&
                                (t || i[31].p._mdf || i[32].p._mdf || i[33].p._mdf || i[34].p._mdf || i[35].p._mdf) &&
                                ((e = this.getTableValue(i[31].p.v, i[32].p.v, i[33].p.v, i[34].p.v, i[35].p.v)), this.feFuncA.setAttribute("tableValues", e));
                    }
                }),
                (SVGDropShadowEffect.prototype.renderFrame = function (t) {
                    if (t || this.filterManager._mdf) {
                        if (((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf)) {
                            var e = this.filterManager.effectElements[0].p.v;
                            this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])));
                        }
                        if (
                            ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255),
                            t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf)
                        ) {
                            var i = this.filterManager.effectElements[3].p.v,
                                s = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
                                r = i * Math.cos(s),
                                a = i * Math.sin(s);
                            this.feOffset.setAttribute("dx", r), this.feOffset.setAttribute("dy", a);
                        }
                    }
                });
            var _svgMatteSymbols = [];
            function SVGMatte3Effect(t, e, i) {
                (this.initialized = !1),
                    (this.filterManager = e),
                    (this.filterElem = t),
                    ((this.elem = i).matteElement = createNS("g")),
                    i.matteElement.appendChild(i.layerElement),
                    i.matteElement.appendChild(i.transformedElement),
                    (i.baseElement = i.matteElement);
            }
            function SVGEffects(t) {
                var e,
                    i,
                    s = t.data.ef ? t.data.ef.length : 0,
                    r = createElementID(),
                    a = filtersFactory.createFilter(r),
                    n = 0;
                for (this.filters = [], e = 0; e < s; e += 1)
                    (i = null),
                        20 === t.data.ef[e].ty
                            ? ((n += 1), (i = new SVGTintFilter(a, t.effectsManager.effectElements[e])))
                            : 21 === t.data.ef[e].ty
                            ? ((n += 1), (i = new SVGFillFilter(a, t.effectsManager.effectElements[e])))
                            : 22 === t.data.ef[e].ty
                            ? (i = new SVGStrokeEffect(t, t.effectsManager.effectElements[e]))
                            : 23 === t.data.ef[e].ty
                            ? ((n += 1), (i = new SVGTritoneFilter(a, t.effectsManager.effectElements[e])))
                            : 24 === t.data.ef[e].ty
                            ? ((n += 1), (i = new SVGProLevelsFilter(a, t.effectsManager.effectElements[e])))
                            : 25 === t.data.ef[e].ty
                            ? ((n += 1), (i = new SVGDropShadowEffect(a, t.effectsManager.effectElements[e])))
                            : 28 === t.data.ef[e].ty
                            ? (i = new SVGMatte3Effect(a, t.effectsManager.effectElements[e], t))
                            : 29 === t.data.ef[e].ty && ((n += 1), (i = new SVGGaussianBlurEffect(a, t.effectsManager.effectElements[e]))),
                        i && this.filters.push(i);
                n && (t.globalData.defs.appendChild(a), t.layerElement.setAttribute("filter", "url(" + locationHref + "#" + r + ")")), this.filters.length && t.addRenderableComponent(this);
            }
            (SVGMatte3Effect.prototype.findSymbol = function (t) {
                for (var e = 0, i = _svgMatteSymbols.length; e < i; ) {
                    if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
                    e += 1;
                }
                return null;
            }),
                (SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
                    var i = t.layerElement.parentNode;
                    if (i) {
                        for (var s, r = i.children, a = 0, n = r.length; a < n && r[a] !== t.layerElement; ) a += 1;
                        a <= n - 2 && (s = r[a + 1]);
                        var o = createNS("use");
                        o.setAttribute("href", "#" + e), s ? i.insertBefore(o, s) : i.appendChild(o);
                    }
                }),
                (SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
                    if (!this.findSymbol(e)) {
                        var i = createElementID(),
                            s = createNS("mask");
                        s.setAttribute("id", e.layerId), s.setAttribute("mask-type", "alpha"), _svgMatteSymbols.push(e);
                        var r = t.globalData.defs;
                        r.appendChild(s);
                        var a = createNS("symbol");
                        a.setAttribute("id", i), this.replaceInParent(e, i), a.appendChild(e.layerElement), r.appendChild(a);
                        var n = createNS("use");
                        n.setAttribute("href", "#" + i), s.appendChild(n), (e.data.hd = !1), e.show();
                    }
                    t.setMatte(e.layerId);
                }),
                (SVGMatte3Effect.prototype.initialize = function () {
                    for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, i = 0, s = e.length; i < s; ) e[i] && e[i].data.ind === t && this.setElementAsMask(this.elem, e[i]), (i += 1);
                    this.initialized = !0;
                }),
                (SVGMatte3Effect.prototype.renderFrame = function () {
                    this.initialized || this.initialize();
                }),
                (SVGEffects.prototype.renderFrame = function (t) {
                    var e,
                        i = this.filters.length;
                    for (e = 0; e < i; e += 1) this.filters[e].renderFrame(t);
                });
            var animationManager = (function () {
                    var t = {},
                        e = [],
                        i = 0,
                        s = 0,
                        r = 0,
                        a = !0,
                        n = !1;
                    function o(t) {
                        for (var i = 0, r = t.target; i < s; ) e[i].animation === r && (e.splice(i, 1), (i -= 1), (s -= 1), r.isPaused || p()), (i += 1);
                    }
                    function l(t, i) {
                        if (!t) return null;
                        for (var r = 0; r < s; ) {
                            if (e[r].elem == t && null !== e[r].elem) return e[r].animation;
                            r += 1;
                        }
                        var a = new AnimationItem();
                        return d(a, t), a.setData(t, i), a;
                    }
                    function h() {
                        (r += 1), u();
                    }
                    function p() {
                        r -= 1;
                    }
                    function d(t, i) {
                        t.addEventListener("destroy", o), t.addEventListener("_active", h), t.addEventListener("_idle", p), e.push({ elem: i, animation: t }), (s += 1);
                    }
                    function c(t) {
                        var o,
                            l = t - i;
                        for (o = 0; o < s; o += 1) e[o].animation.advanceTime(l);
                        (i = t), r && !n ? window.requestAnimationFrame(c) : (a = !0);
                    }
                    function f(t) {
                        (i = t), window.requestAnimationFrame(c);
                    }
                    function u() {
                        !n && r && a && (window.requestAnimationFrame(f), (a = !1));
                    }
                    return (
                        (t.registerAnimation = l),
                        (t.loadAnimation = function (t) {
                            var e = new AnimationItem();
                            return d(e, null), e.setParams(t), e;
                        }),
                        (t.setSpeed = function (t, i) {
                            var r;
                            for (r = 0; r < s; r += 1) e[r].animation.setSpeed(t, i);
                        }),
                        (t.setDirection = function (t, i) {
                            var r;
                            for (r = 0; r < s; r += 1) e[r].animation.setDirection(t, i);
                        }),
                        (t.play = function (t) {
                            var i;
                            for (i = 0; i < s; i += 1) e[i].animation.play(t);
                        }),
                        (t.pause = function (t) {
                            var i;
                            for (i = 0; i < s; i += 1) e[i].animation.pause(t);
                        }),
                        (t.stop = function (t) {
                            var i;
                            for (i = 0; i < s; i += 1) e[i].animation.stop(t);
                        }),
                        (t.togglePause = function (t) {
                            var i;
                            for (i = 0; i < s; i += 1) e[i].animation.togglePause(t);
                        }),
                        (t.searchAnimations = function (t, e, i) {
                            var s,
                                r = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))),
                                a = r.length;
                            for (s = 0; s < a; s += 1) i && r[s].setAttribute("data-bm-type", i), l(r[s], t);
                            if (e && 0 === a) {
                                i || (i = "svg");
                                var n = document.getElementsByTagName("body")[0];
                                n.innerHTML = "";
                                var o = createTag("div");
                                (o.style.width = "100%"), (o.style.height = "100%"), o.setAttribute("data-bm-type", i), n.appendChild(o), l(o, t);
                            }
                        }),
                        (t.resize = function () {
                            var t;
                            for (t = 0; t < s; t += 1) e[t].animation.resize();
                        }),
                        (t.goToAndStop = function (t, i, r) {
                            var a;
                            for (a = 0; a < s; a += 1) e[a].animation.goToAndStop(t, i, r);
                        }),
                        (t.destroy = function (t) {
                            var i;
                            for (i = s - 1; 0 <= i; i -= 1) e[i].animation.destroy(t);
                        }),
                        (t.freeze = function () {
                            n = !0;
                        }),
                        (t.unfreeze = function () {
                            (n = !1), u();
                        }),
                        (t.getRegisteredAnimations = function () {
                            var t,
                                i = e.length,
                                s = [];
                            for (t = 0; t < i; t += 1) s.push(e[t].animation);
                            return s;
                        }),
                        t
                    );
                })(),
                AnimationItem = function () {
                    (this._cbs = []),
                        (this.name = ""),
                        (this.path = ""),
                        (this.isLoaded = !1),
                        (this.currentFrame = 0),
                        (this.currentRawFrame = 0),
                        (this.totalFrames = 0),
                        (this.frameRate = 0),
                        (this.frameMult = 0),
                        (this.playSpeed = 1),
                        (this.playDirection = 1),
                        (this.playCount = 0),
                        (this.animationData = {}),
                        (this.assets = []),
                        (this.isPaused = !0),
                        (this.autoplay = !1),
                        (this.loop = !0),
                        (this.renderer = null),
                        (this.animationID = createElementID()),
                        (this.assetsPath = ""),
                        (this.timeCompleted = 0),
                        (this.segmentPos = 0),
                        (this.subframeEnabled = subframeEnabled),
                        (this.segments = []),
                        (this._idle = !0),
                        (this._completedLoop = !1),
                        (this.projectInterface = ProjectInterface()),
                        (this.imagePreloader = new ImagePreloader());
                };
            extendPrototype([BaseEvent], AnimationItem),
                (AnimationItem.prototype.setParams = function (t) {
                    t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
                    var e = t.animType ? t.animType : t.renderer ? t.renderer : "svg";
                    switch (e) {
                        case "canvas":
                            this.renderer = new CanvasRenderer(this, t.rendererSettings);
                            break;
                        case "svg":
                            this.renderer = new SVGRenderer(this, t.rendererSettings);
                            break;
                        default:
                            this.renderer = new HybridRenderer(this, t.rendererSettings);
                    }
                    this.renderer.setProjectInterface(this.projectInterface),
                        (this.animType = e),
                        "" === t.loop || null === t.loop || (!1 === t.loop ? (this.loop = !1) : !0 === t.loop ? (this.loop = !0) : (this.loop = parseInt(t.loop))),
                        (this.autoplay = !("autoplay" in t) || t.autoplay),
                        (this.name = t.name ? t.name : ""),
                        (this.autoloadSegments = !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments),
                        (this.assetsPath = t.assetsPath),
                        t.animationData
                            ? this.configAnimation(t.animationData)
                            : t.path &&
                              ("json" != t.path.substr(-4) && ("/" != t.path.substr(-1, 1) && (t.path += "/"), (t.path += "data.json")),
                              -1 != t.path.lastIndexOf("\\") ? (this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1)) : (this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1)),
                              (this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1)),
                              (this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json"))),
                              assetLoader.load(
                                  t.path,
                                  this.configAnimation.bind(this),
                                  function () {
                                      this.trigger("data_failed");
                                  }.bind(this)
                              ));
                }),
                (AnimationItem.prototype.setData = function (t, e) {
                    var i = { wrapper: t, animationData: e ? ("object" == typeof e ? e : JSON.parse(e)) : null },
                        s = t.attributes;
                    (i.path = s.getNamedItem("data-animation-path")
                        ? s.getNamedItem("data-animation-path").value
                        : s.getNamedItem("data-bm-path")
                        ? s.getNamedItem("data-bm-path").value
                        : s.getNamedItem("bm-path")
                        ? s.getNamedItem("bm-path").value
                        : ""),
                        (i.animType = s.getNamedItem("data-anim-type")
                            ? s.getNamedItem("data-anim-type").value
                            : s.getNamedItem("data-bm-type")
                            ? s.getNamedItem("data-bm-type").value
                            : s.getNamedItem("bm-type")
                            ? s.getNamedItem("bm-type").value
                            : s.getNamedItem("data-bm-renderer")
                            ? s.getNamedItem("data-bm-renderer").value
                            : s.getNamedItem("bm-renderer")
                            ? s.getNamedItem("bm-renderer").value
                            : "canvas");
                    var r = s.getNamedItem("data-anim-loop")
                        ? s.getNamedItem("data-anim-loop").value
                        : s.getNamedItem("data-bm-loop")
                        ? s.getNamedItem("data-bm-loop").value
                        : s.getNamedItem("bm-loop")
                        ? s.getNamedItem("bm-loop").value
                        : "";
                    "" === r || (i.loop = "false" !== r && ("true" === r || parseInt(r)));
                    var a = s.getNamedItem("data-anim-autoplay")
                        ? s.getNamedItem("data-anim-autoplay").value
                        : s.getNamedItem("data-bm-autoplay")
                        ? s.getNamedItem("data-bm-autoplay").value
                        : !s.getNamedItem("bm-autoplay") || s.getNamedItem("bm-autoplay").value;
                    (i.autoplay = "false" !== a),
                        (i.name = s.getNamedItem("data-name") ? s.getNamedItem("data-name").value : s.getNamedItem("data-bm-name") ? s.getNamedItem("data-bm-name").value : s.getNamedItem("bm-name") ? s.getNamedItem("bm-name").value : ""),
                        "false" ===
                            (s.getNamedItem("data-anim-prerender")
                                ? s.getNamedItem("data-anim-prerender").value
                                : s.getNamedItem("data-bm-prerender")
                                ? s.getNamedItem("data-bm-prerender").value
                                : s.getNamedItem("bm-prerender")
                                ? s.getNamedItem("bm-prerender").value
                                : "") && (i.prerender = !1),
                        this.setParams(i);
                }),
                (AnimationItem.prototype.includeLayers = function (t) {
                    t.op > this.animationData.op && ((this.animationData.op = t.op), (this.totalFrames = Math.floor(t.op - this.animationData.ip)));
                    var e,
                        i,
                        s = this.animationData.layers,
                        r = s.length,
                        a = t.layers,
                        n = a.length;
                    for (i = 0; i < n; i += 1)
                        for (e = 0; e < r; ) {
                            if (s[e].id == a[i].id) {
                                s[e] = a[i];
                                break;
                            }
                            e += 1;
                        }
                    if (((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets))
                        for (r = t.assets.length, e = 0; e < r; e += 1) this.animationData.assets.push(t.assets[e]);
                    (this.animationData.__complete = !1),
                        dataManager.completeData(this.animationData, this.renderer.globalData.fontManager),
                        this.renderer.includeLayers(t.layers),
                        expressionsPlugin && expressionsPlugin.initExpressions(this),
                        this.loadNextSegment();
                }),
                (AnimationItem.prototype.loadNextSegment = function () {
                    var t = this.animationData.segments;
                    if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void (this.timeCompleted = this.totalFrames);
                    var e = t.shift();
                    this.timeCompleted = e.time * this.frameRate;
                    var i = this.path + this.fileName + "_" + this.segmentPos + ".json";
                    (this.segmentPos += 1),
                        assetLoader.load(
                            i,
                            this.includeLayers.bind(this),
                            function () {
                                this.trigger("data_failed");
                            }.bind(this)
                        );
                }),
                (AnimationItem.prototype.loadSegments = function () {
                    this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment();
                }),
                (AnimationItem.prototype.imagesLoaded = function () {
                    this.trigger("loaded_images"), this.checkLoaded();
                }),
                (AnimationItem.prototype.preloadImages = function () {
                    this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this));
                }),
                (AnimationItem.prototype.configAnimation = function (t) {
                    this.renderer &&
                        ((this.animationData = t),
                        (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip)),
                        this.renderer.configAnimation(t),
                        t.assets || (t.assets = []),
                        this.renderer.searchExtraCompositions(t.assets),
                        (this.assets = this.animationData.assets),
                        (this.frameRate = this.animationData.fr),
                        (this.firstFrame = Math.round(this.animationData.ip)),
                        (this.frameMult = this.animationData.fr / 1e3),
                        this.trigger("config_ready"),
                        this.preloadImages(),
                        this.loadSegments(),
                        this.updaFrameModifier(),
                        this.waitForFontsLoaded());
                }),
                (AnimationItem.prototype.waitForFontsLoaded = function () {
                    this.renderer && (this.renderer.globalData.fontManager.loaded() ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20));
                }),
                (AnimationItem.prototype.checkLoaded = function () {
                    this.isLoaded ||
                        !this.renderer.globalData.fontManager.loaded() ||
                        (!this.imagePreloader.loaded() && "canvas" === this.renderer.rendererType) ||
                        ((this.isLoaded = !0),
                        dataManager.completeData(this.animationData, this.renderer.globalData.fontManager),
                        expressionsPlugin && expressionsPlugin.initExpressions(this),
                        this.renderer.initItems(),
                        setTimeout(
                            function () {
                                this.trigger("DOMLoaded");
                            }.bind(this),
                            0
                        ),
                        this.gotoFrame(),
                        this.autoplay && this.play());
                }),
                (AnimationItem.prototype.resize = function () {
                    this.renderer.updateContainerSize();
                }),
                (AnimationItem.prototype.setSubframe = function (t) {
                    this.subframeEnabled = !!t;
                }),
                (AnimationItem.prototype.gotoFrame = function () {
                    (this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame),
                        this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted),
                        this.trigger("enterFrame"),
                        this.renderFrame();
                }),
                (AnimationItem.prototype.renderFrame = function () {
                    !1 !== this.isLoaded && this.renderer.renderFrame(this.currentFrame + this.firstFrame);
                }),
                (AnimationItem.prototype.play = function (t) {
                    (t && this.name != t) || (!0 === this.isPaused && ((this.isPaused = !1), this._idle && ((this._idle = !1), this.trigger("_active"))));
                }),
                (AnimationItem.prototype.pause = function (t) {
                    (t && this.name != t) || (!1 === this.isPaused && ((this.isPaused = !0), (this._idle = !0), this.trigger("_idle")));
                }),
                (AnimationItem.prototype.togglePause = function (t) {
                    (t && this.name != t) || (!0 === this.isPaused ? this.play() : this.pause());
                }),
                (AnimationItem.prototype.stop = function (t) {
                    (t && this.name != t) || (this.pause(), (this.playCount = 0), (this._completedLoop = !1), this.setCurrentRawFrameValue(0));
                }),
                (AnimationItem.prototype.goToAndStop = function (t, e, i) {
                    (i && this.name != i) || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier), this.pause());
                }),
                (AnimationItem.prototype.goToAndPlay = function (t, e, i) {
                    this.goToAndStop(t, e, i), this.play();
                }),
                (AnimationItem.prototype.advanceTime = function (t) {
                    if (!0 !== this.isPaused && !1 !== this.isLoaded) {
                        var e = this.currentRawFrame + t * this.frameModifier,
                            i = !1;
                        e >= this.totalFrames - 1 && 0 < this.frameModifier
                            ? this.loop && this.playCount !== this.loop
                                ? e >= this.totalFrames
                                    ? ((this.playCount += 1), this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), (this._completedLoop = !0), this.trigger("loopComplete")))
                                    : this.setCurrentRawFrameValue(e)
                                : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || ((i = !0), (e = this.totalFrames - 1))
                            : e < 0
                            ? this.checkSegments(e % this.totalFrames) ||
                              (!this.loop || (this.playCount-- <= 0 && !0 !== this.loop)
                                  ? ((i = !0), (e = 0))
                                  : (this.setCurrentRawFrameValue(this.totalFrames + (e % this.totalFrames)), this._completedLoop ? this.trigger("loopComplete") : (this._completedLoop = !0)))
                            : this.setCurrentRawFrameValue(e),
                            i && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"));
                    }
                }),
                (AnimationItem.prototype.adjustSegment = function (t, e) {
                    (this.playCount = 0),
                        t[1] < t[0]
                            ? (0 < this.frameModifier && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)),
                              (this.timeCompleted = this.totalFrames = t[0] - t[1]),
                              (this.firstFrame = t[1]),
                              this.setCurrentRawFrameValue(this.totalFrames - 0.001 - e))
                            : t[1] > t[0] &&
                              (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)),
                              (this.timeCompleted = this.totalFrames = t[1] - t[0]),
                              (this.firstFrame = t[0]),
                              this.setCurrentRawFrameValue(0.001 + e)),
                        this.trigger("segmentStart");
                }),
                (AnimationItem.prototype.setSegment = function (t, e) {
                    var i = -1;
                    this.isPaused && (this.currentRawFrame + this.firstFrame < t ? (i = t) : this.currentRawFrame + this.firstFrame > e && (i = e - t)),
                        (this.firstFrame = t),
                        (this.timeCompleted = this.totalFrames = e - t),
                        -1 !== i && this.goToAndStop(i, !0);
                }),
                (AnimationItem.prototype.playSegments = function (t, e) {
                    if ((e && (this.segments.length = 0), "object" == typeof t[0])) {
                        var i,
                            s = t.length;
                        for (i = 0; i < s; i += 1) this.segments.push(t[i]);
                    } else this.segments.push(t);
                    this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play();
                }),
                (AnimationItem.prototype.resetSegments = function (t) {
                    (this.segments.length = 0), this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0);
                }),
                (AnimationItem.prototype.checkSegments = function (t) {
                    return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0);
                }),
                (AnimationItem.prototype.destroy = function (t) {
                    (t && this.name != t) ||
                        !this.renderer ||
                        (this.renderer.destroy(),
                        this.imagePreloader.destroy(),
                        this.trigger("destroy"),
                        (this._cbs = null),
                        (this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null),
                        (this.renderer = null));
                }),
                (AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
                    (this.currentRawFrame = t), this.gotoFrame();
                }),
                (AnimationItem.prototype.setSpeed = function (t) {
                    (this.playSpeed = t), this.updaFrameModifier();
                }),
                (AnimationItem.prototype.setDirection = function (t) {
                    (this.playDirection = t < 0 ? -1 : 1), this.updaFrameModifier();
                }),
                (AnimationItem.prototype.updaFrameModifier = function () {
                    this.frameModifier = this.frameMult * this.playSpeed * this.playDirection;
                }),
                (AnimationItem.prototype.getPath = function () {
                    return this.path;
                }),
                (AnimationItem.prototype.getAssetsPath = function (t) {
                    var e = "";
                    if (t.e) e = t.p;
                    else if (this.assetsPath) {
                        var i = t.p;
                        -1 !== i.indexOf("images/") && (i = i.split("/")[1]), (e = this.assetsPath + i);
                    } else (e = this.path), (e += t.u ? t.u : ""), (e += t.p);
                    return e;
                }),
                (AnimationItem.prototype.getAssetData = function (t) {
                    for (var e = 0, i = this.assets.length; e < i; ) {
                        if (t == this.assets[e].id) return this.assets[e];
                        e += 1;
                    }
                }),
                (AnimationItem.prototype.hide = function () {
                    this.renderer.hide();
                }),
                (AnimationItem.prototype.show = function () {
                    this.renderer.show();
                }),
                (AnimationItem.prototype.getDuration = function (t) {
                    return t ? this.totalFrames : this.totalFrames / this.frameRate;
                }),
                (AnimationItem.prototype.trigger = function (t) {
                    if (this._cbs && this._cbs[t])
                        switch (t) {
                            case "enterFrame":
                                this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameModifier));
                                break;
                            case "loopComplete":
                                this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
                                break;
                            case "complete":
                                this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
                                break;
                            case "segmentStart":
                                this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
                                break;
                            case "destroy":
                                this.triggerEvent(t, new BMDestroyEvent(t, this));
                                break;
                            default:
                                this.triggerEvent(t);
                        }
                    "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)),
                        "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)),
                        "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)),
                        "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)),
                        "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this));
                });
            var Expressions =
                    ((sO = {}),
                    (sO.initExpressions = function (t) {
                        var e = 0,
                            i = [];
                        (t.renderer.compInterface = CompExpressionInterface(t.renderer)),
                            t.renderer.globalData.projectInterface.registerComposition(t.renderer),
                            (t.renderer.globalData.pushExpression = function () {
                                e += 1;
                            }),
                            (t.renderer.globalData.popExpression = function () {
                                0 == (e -= 1) &&
                                    (function () {
                                        var t,
                                            e = i.length;
                                        for (t = 0; t < e; t += 1) i[t].release();
                                        i.length = 0;
                                    })();
                            }),
                            (t.renderer.globalData.registerExpressionProperty = function (t) {
                                -1 === i.indexOf(t) && i.push(t);
                            });
                    }),
                    sO),
                sO;
            expressionsPlugin = Expressions;
            var ExpressionManager = (function () {
                    var ob = {},
                        Math = BMMath,
                        window = null,
                        document = null;
                    function $bm_isInstanceOfArray(t) {
                        return t.constructor === Array || t.constructor === Float32Array;
                    }
                    function isNumerable(t, e) {
                        return "number" === t || "boolean" === t || "string" === t || e instanceof Number;
                    }
                    function $bm_neg(t) {
                        var e = typeof t;
                        if ("number" === e || "boolean" === e || t instanceof Number) return -t;
                        if ($bm_isInstanceOfArray(t)) {
                            var i,
                                s = t.length,
                                r = [];
                            for (i = 0; i < s; i += 1) r[i] = -t[i];
                            return r;
                        }
                        return t.propType ? t.v : void 0;
                    }
                    var easeInBez = BezierFactory.getBezierEasing(0.333, 0, 0.833, 0.833, "easeIn").get,
                        easeOutBez = BezierFactory.getBezierEasing(0.167, 0.167, 0.667, 1, "easeOut").get,
                        easeInOutBez = BezierFactory.getBezierEasing(0.33, 0, 0.667, 1, "easeInOut").get;
                    function sum(t, e) {
                        var i = typeof t,
                            s = typeof e;
                        if ("string" === i || "string" === s) return t + e;
                        if (isNumerable(i, t) && isNumerable(s, e)) return t + e;
                        if ($bm_isInstanceOfArray(t) && isNumerable(s, e)) return ((t = t.slice(0))[0] = t[0] + e), t;
                        if (isNumerable(i, t) && $bm_isInstanceOfArray(e)) return ((e = e.slice(0))[0] = t + e[0]), e;
                        if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                            for (var r = 0, a = t.length, n = e.length, o = []; r < a || r < n; )
                                ("number" == typeof t[r] || t[r] instanceof Number) && ("number" == typeof e[r] || e[r] instanceof Number) ? (o[r] = t[r] + e[r]) : (o[r] = void 0 === e[r] ? t[r] : t[r] || e[r]), (r += 1);
                            return o;
                        }
                        return 0;
                    }
                    var add = sum;
                    function sub(t, e) {
                        var i = typeof t,
                            s = typeof e;
                        if (isNumerable(i, t) && isNumerable(s, e)) return "string" === i && (t = parseInt(t)), "string" === s && (e = parseInt(e)), t - e;
                        if ($bm_isInstanceOfArray(t) && isNumerable(s, e)) return ((t = t.slice(0))[0] = t[0] - e), t;
                        if (isNumerable(i, t) && $bm_isInstanceOfArray(e)) return ((e = e.slice(0))[0] = t - e[0]), e;
                        if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                            for (var r = 0, a = t.length, n = e.length, o = []; r < a || r < n; )
                                ("number" == typeof t[r] || t[r] instanceof Number) && ("number" == typeof e[r] || e[r] instanceof Number) ? (o[r] = t[r] - e[r]) : (o[r] = void 0 === e[r] ? t[r] : t[r] || e[r]), (r += 1);
                            return o;
                        }
                        return 0;
                    }
                    function mul(t, e) {
                        var i,
                            s,
                            r,
                            a = typeof t,
                            n = typeof e;
                        if (isNumerable(a, t) && isNumerable(n, e)) return t * e;
                        if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
                            for (r = t.length, i = createTypedArray("float32", r), s = 0; s < r; s += 1) i[s] = t[s] * e;
                            return i;
                        }
                        if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
                            for (r = e.length, i = createTypedArray("float32", r), s = 0; s < r; s += 1) i[s] = t * e[s];
                            return i;
                        }
                        return 0;
                    }
                    function div(t, e) {
                        var i,
                            s,
                            r,
                            a = typeof t,
                            n = typeof e;
                        if (isNumerable(a, t) && isNumerable(n, e)) return t / e;
                        if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
                            for (r = t.length, i = createTypedArray("float32", r), s = 0; s < r; s += 1) i[s] = t[s] / e;
                            return i;
                        }
                        if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
                            for (r = e.length, i = createTypedArray("float32", r), s = 0; s < r; s += 1) i[s] = t / e[s];
                            return i;
                        }
                        return 0;
                    }
                    function mod(t, e) {
                        return "string" == typeof t && (t = parseInt(t)), "string" == typeof e && (e = parseInt(e)), t % e;
                    }
                    var $bm_sum = sum,
                        $bm_sub = sub,
                        $bm_mul = mul,
                        $bm_div = div,
                        $bm_mod = mod;
                    function clamp(t, e, i) {
                        if (i < e) {
                            var s = i;
                            (i = e), (e = s);
                        }
                        return Math.min(Math.max(t, e), i);
                    }
                    function radiansToDegrees(t) {
                        return t / degToRads;
                    }
                    var radians_to_degrees = radiansToDegrees;
                    function degreesToRadians(t) {
                        return t * degToRads;
                    }
                    var degrees_to_radians = radiansToDegrees,
                        helperLengthArray = [0, 0, 0, 0, 0, 0];
                    function length(t, e) {
                        if ("number" == typeof t || t instanceof Number) return (e = e || 0), Math.abs(t - e);
                        e || (e = helperLengthArray);
                        var i,
                            s = Math.min(t.length, e.length),
                            r = 0;
                        for (i = 0; i < s; i += 1) r += Math.pow(e[i] - t[i], 2);
                        return Math.sqrt(r);
                    }
                    function normalize(t) {
                        return div(t, length(t));
                    }
                    function rgbToHsl(t) {
                        var e,
                            i,
                            s = t[0],
                            r = t[1],
                            a = t[2],
                            n = Math.max(s, r, a),
                            o = Math.min(s, r, a),
                            l = (n + o) / 2;
                        if (n == o) e = i = 0;
                        else {
                            var h = n - o;
                            switch (((i = 0.5 < l ? h / (2 - n - o) : h / (n + o)), n)) {
                                case s:
                                    e = (r - a) / h + (r < a ? 6 : 0);
                                    break;
                                case r:
                                    e = (a - s) / h + 2;
                                    break;
                                case a:
                                    e = (s - r) / h + 4;
                            }
                            e /= 6;
                        }
                        return [e, i, l, t[3]];
                    }
                    function hue2rgb(t, e, i) {
                        return i < 0 && (i += 1), 1 < i && (i -= 1), i < 1 / 6 ? t + 6 * (e - t) * i : i < 0.5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t;
                    }
                    function hslToRgb(t) {
                        var e,
                            i,
                            s,
                            r = t[0],
                            a = t[1],
                            n = t[2];
                        if (0 === a) e = i = s = n;
                        else {
                            var o = n < 0.5 ? n * (1 + a) : n + a - n * a,
                                l = 2 * n - o;
                            (e = hue2rgb(l, o, r + 1 / 3)), (i = hue2rgb(l, o, r)), (s = hue2rgb(l, o, r - 1 / 3));
                        }
                        return [e, i, s, t[3]];
                    }
                    function linear(t, e, i, s, r) {
                        if (((void 0 !== s && void 0 !== r) || ((s = e), (r = i), (e = 0), (i = 1)), i < e)) {
                            var a = i;
                            (i = e), (e = a);
                        }
                        if (t <= e) return s;
                        if (i <= t) return r;
                        var n = i === e ? 0 : (t - e) / (i - e);
                        if (!s.length) return s + (r - s) * n;
                        var o,
                            l = s.length,
                            h = createTypedArray("float32", l);
                        for (o = 0; o < l; o += 1) h[o] = s[o] + (r[o] - s[o]) * n;
                        return h;
                    }
                    function random(t, e) {
                        if ((void 0 === e && (void 0 === t ? ((t = 0), (e = 1)) : ((e = t), (t = void 0))), e.length)) {
                            var i,
                                s = e.length;
                            t || (t = createTypedArray("float32", s));
                            var r = createTypedArray("float32", s),
                                a = BMMath.random();
                            for (i = 0; i < s; i += 1) r[i] = t[i] + a * (e[i] - t[i]);
                            return r;
                        }
                        return void 0 === t && (t = 0), t + BMMath.random() * (e - t);
                    }
                    function createPath(t, e, i, s) {
                        var r,
                            a = t.length,
                            n = shape_pool.newElement();
                        n.setPathData(!!s, a);
                        var o,
                            l,
                            h = [0, 0];
                        for (r = 0; r < a; r += 1) (o = e && e[r] ? e[r] : h), (l = i && i[r] ? i[r] : h), n.setTripleAt(t[r][0], t[r][1], l[0] + t[r][0], l[1] + t[r][1], o[0] + t[r][0], o[1] + t[r][1], r, !0);
                        return n;
                    }
                    function initiateExpression(elem, data, property) {
                        var val = data.x,
                            needsVelocity = /velocity(?![\w\d])/.test(val),
                            _needsRandom = -1 !== val.indexOf("random"),
                            elemType = elem.data.ty,
                            transform,
                            $bm_transform,
                            content,
                            effect,
                            thisProperty = property;
                        (thisProperty.valueAtTime = thisProperty.getValueAtTime),
                            Object.defineProperty(thisProperty, "value", {
                                get: function () {
                                    return thisProperty.v;
                                },
                            }),
                            (elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate),
                            (elem.comp.displayStartTime = 0);
                        var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
                            outPoint = elem.data.op / elem.comp.globalData.frameRate,
                            width = elem.data.sw ? elem.data.sw : 0,
                            height = elem.data.sh ? elem.data.sh : 0,
                            name = elem.data.nm,
                            loopIn,
                            loop_in,
                            loopOut,
                            loop_out,
                            smooth,
                            toWorld,
                            fromWorld,
                            fromComp,
                            toComp,
                            fromCompToSurface,
                            position,
                            rotation,
                            anchorPoint,
                            scale,
                            thisLayer,
                            thisComp,
                            mask,
                            valueAtTime,
                            velocityAtTime,
                            __expression_functions = [],
                            scoped_bm_rt;
                        if (data.xf) {
                            var i,
                                len = data.xf.length;
                            for (i = 0; i < len; i += 1) __expression_functions[i] = eval("(function(){ return " + data.xf[i] + "}())");
                        }
                        var expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0],
                            numKeys = property.kf ? data.k.length : 0,
                            active = !this.data || !0 !== this.data.hd,
                            wiggle = function (t, e) {
                                var i,
                                    s,
                                    r = this.pv.length ? this.pv.length : 1,
                                    a = createTypedArray("float32", r),
                                    n = Math.floor(5 * time);
                                for (s = i = 0; i < n; ) {
                                    for (s = 0; s < r; s += 1) a[s] += -e + 2 * e * BMMath.random();
                                    i += 1;
                                }
                                var o = 5 * time,
                                    l = o - Math.floor(o),
                                    h = createTypedArray("float32", r);
                                if (1 < r) {
                                    for (s = 0; s < r; s += 1) h[s] = this.pv[s] + a[s] + (-e + 2 * e * BMMath.random()) * l;
                                    return h;
                                }
                                return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * l;
                            }.bind(this);
                        function loopInDuration(t, e) {
                            return loopIn(t, e, !0);
                        }
                        function loopOutDuration(t, e) {
                            return loopOut(t, e, !0);
                        }
                        thisProperty.loopIn && ((loopIn = thisProperty.loopIn.bind(thisProperty)), (loop_in = loopIn)),
                            thisProperty.loopOut && ((loopOut = thisProperty.loopOut.bind(thisProperty)), (loop_out = loopOut)),
                            thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty)),
                            this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)),
                            this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
                        var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
                            time,
                            velocity,
                            value,
                            text,
                            textIndex,
                            textTotal,
                            selectorValue;
                        function lookAt(t, e) {
                            var i = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
                                s = Math.atan2(i[0], Math.sqrt(i[1] * i[1] + i[2] * i[2])) / degToRads;
                            return [-Math.atan2(i[1], i[2]) / degToRads, s, 0];
                        }
                        function easeOut(t, e, i, s, r) {
                            return applyEase(easeOutBez, t, e, i, s, r);
                        }
                        function easeIn(t, e, i, s, r) {
                            return applyEase(easeInBez, t, e, i, s, r);
                        }
                        function ease(t, e, i, s, r) {
                            return applyEase(easeInOutBez, t, e, i, s, r);
                        }
                        function applyEase(t, e, i, s, r, a) {
                            void 0 === r ? ((r = i), (a = s)) : (e = (e - i) / (s - i));
                            var n = t((e = 1 < e ? 1 : e < 0 ? 0 : e));
                            if ($bm_isInstanceOfArray(r)) {
                                var o,
                                    l = r.length,
                                    h = createTypedArray("float32", l);
                                for (o = 0; o < l; o += 1) h[o] = (a[o] - r[o]) * n + r[o];
                                return h;
                            }
                            return (a - r) * n + r;
                        }
                        function nearestKey(t) {
                            var e,
                                i,
                                s,
                                r = data.k.length;
                            if (data.k.length && "number" != typeof data.k[0])
                                if (((i = -1), (t *= elem.comp.globalData.frameRate) < data.k[0].t)) (i = 1), (s = data.k[0].t);
                                else {
                                    for (e = 0; e < r - 1; e += 1) {
                                        if (t === data.k[e].t) {
                                            (i = e + 1), (s = data.k[e].t);
                                            break;
                                        }
                                        if (t > data.k[e].t && t < data.k[e + 1].t) {
                                            s = t - data.k[e].t > data.k[e + 1].t - t ? ((i = e + 2), data.k[e + 1].t) : ((i = e + 1), data.k[e].t);
                                            break;
                                        }
                                    }
                                    -1 === i && ((i = e + 1), (s = data.k[e].t));
                                }
                            else s = i = 0;
                            var a = {};
                            return (a.index = i), (a.time = s / elem.comp.globalData.frameRate), a;
                        }
                        function key(t) {
                            var e, i, s, r;
                            if (!data.k.length || "number" == typeof data.k[0]) throw new Error("The property has no keyframe at index " + t);
                            for (
                                t -= 1,
                                    e = { time: data.k[t].t / elem.comp.globalData.frameRate, value: [] },
                                    s = (r = t !== data.k.length - 1 || data.k[t].h ? data.k[t].s : data.k[t].s || 0 === data.k[t].s ? data.k[t - 1].s : data.k[t].e).length,
                                    i = 0;
                                i < s;
                                i += 1
                            )
                                (e[i] = r[i]), (e.value[i] = r[i]);
                            return e;
                        }
                        function framesToTime(t, e) {
                            return e || (e = elem.comp.globalData.frameRate), t / e;
                        }
                        function timeToFrames(t, e) {
                            return t || 0 === t || (t = time), e || (e = elem.comp.globalData.frameRate), t * e;
                        }
                        function seedRandom(t) {
                            BMMath.seedrandom(randSeed + t);
                        }
                        function sourceRectAtTime() {
                            return elem.sourceRectAtTime();
                        }
                        function substring(t, e) {
                            return "string" == typeof value ? (void 0 === e ? value.substring(t) : value.substring(t, e)) : "";
                        }
                        function substr(t, e) {
                            return "string" == typeof value ? (void 0 === e ? value.substr(t) : value.substr(t, e)) : "";
                        }
                        var index = elem.data.ind,
                            hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
                            parent,
                            randSeed = Math.floor(1e6 * Math.random()),
                            globalData = elem.globalData;
                        function executeExpression(t) {
                            return (
                                (value = t),
                                _needsRandom && seedRandom(randSeed),
                                this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType
                                    ? value
                                    : ("textSelector" === this.propType && ((textIndex = this.textIndex), (textTotal = this.textTotal), (selectorValue = this.selectorValue)),
                                      thisLayer ||
                                          ((text = elem.layerInterface.text),
                                          (thisLayer = elem.layerInterface),
                                          (thisComp = elem.comp.compInterface),
                                          (toWorld = thisLayer.toWorld.bind(thisLayer)),
                                          (fromWorld = thisLayer.fromWorld.bind(thisLayer)),
                                          (fromComp = thisLayer.fromComp.bind(thisLayer)),
                                          (toComp = thisLayer.toComp.bind(thisLayer)),
                                          (mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null),
                                          (fromCompToSurface = fromComp)),
                                      transform || ((transform = elem.layerInterface("ADBE Transform Group")), ($bm_transform = transform) && (anchorPoint = transform.anchorPoint)),
                                      4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")),
                                      effect || (effect = thisLayer(4)),
                                      (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) && !parent && (parent = elem.hierarchy[0].layerInterface),
                                      (time = this.comp.renderedFrame / this.comp.globalData.frameRate),
                                      needsVelocity && (velocity = velocityAtTime(time)),
                                      expression_function(),
                                      (this.frameExpressionId = elem.globalData.frameId),
                                      "shape" === scoped_bm_rt.propType && (scoped_bm_rt = scoped_bm_rt.v),
                                      scoped_bm_rt)
                            );
                        }
                        return executeExpression;
                    }
                    return (ob.initiateExpression = initiateExpression), ob;
                })(),
                expressionHelpers = {
                    searchExpressions: function (t, e, i) {
                        e.x && ((i.k = !0), (i.x = !0), (i.initiateExpression = ExpressionManager.initiateExpression), i.effectsSequence.push(i.initiateExpression(t, e, i).bind(i)));
                    },
                    getSpeedAtTime: function (t) {
                        var e = this.getValueAtTime(t),
                            i = this.getValueAtTime(t + -0.01),
                            s = 0;
                        if (e.length) {
                            var r;
                            for (r = 0; r < e.length; r += 1) s += Math.pow(i[r] - e[r], 2);
                            s = 100 * Math.sqrt(s);
                        } else s = 0;
                        return s;
                    },
                    getVelocityAtTime: function (t) {
                        if (void 0 !== this.vel) return this.vel;
                        var e,
                            i,
                            s = this.getValueAtTime(t),
                            r = this.getValueAtTime(t + -0.001);
                        if (s.length) for (e = createTypedArray("float32", s.length), i = 0; i < s.length; i += 1) e[i] = (r[i] - s[i]) / -0.001;
                        else e = (r - s) / -0.001;
                        return e;
                    },
                    getValueAtTime: function (t) {
                        return (
                            (t *= this.elem.globalData.frameRate),
                            (t -= this.offsetTime) !== this._cachingAtTime.lastFrame &&
                                ((this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0),
                                (this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime)),
                                (this._cachingAtTime.lastFrame = t)),
                            this._cachingAtTime.value
                        );
                    },
                    getStaticValueAtTime: function () {
                        return this.pv;
                    },
                    setGroupProperty: function (t) {
                        this.propertyGroup = t;
                    },
                };
            !(function () {
                function t(t, e, i) {
                    if (!this.k || !this.keyframes) return this.pv;
                    t = t ? t.toLowerCase() : "";
                    var s,
                        r,
                        a,
                        n,
                        o,
                        l = this.comp.renderedFrame,
                        h = this.keyframes,
                        p = h[h.length - 1].t;
                    if (l <= p) return this.pv;
                    if (
                        (i ? (r = p - (s = e ? Math.abs(p - elem.comp.globalData.frameRate * e) : Math.max(0, p - this.elem.data.ip))) : ((!e || e > h.length - 1) && (e = h.length - 1), (s = p - (r = h[h.length - 1 - e].t))),
                        "pingpong" === t)
                    ) {
                        if (Math.floor((l - r) / s) % 2 != 0) return this.getValueAtTime((s - ((l - r) % s) + r) / this.comp.globalData.frameRate, 0);
                    } else {
                        if ("offset" === t) {
                            var d = this.getValueAtTime(r / this.comp.globalData.frameRate, 0),
                                c = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                                f = this.getValueAtTime((((l - r) % s) + r) / this.comp.globalData.frameRate, 0),
                                u = Math.floor((l - r) / s);
                            if (this.pv.length) {
                                for (n = (o = new Array(d.length)).length, a = 0; a < n; a += 1) o[a] = (c[a] - d[a]) * u + f[a];
                                return o;
                            }
                            return (c - d) * u + f;
                        }
                        if ("continue" === t) {
                            var m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                                g = this.getValueAtTime((p - 0.001) / this.comp.globalData.frameRate, 0);
                            if (this.pv.length) {
                                for (n = (o = new Array(m.length)).length, a = 0; a < n; a += 1) o[a] = m[a] + ((m[a] - g[a]) * ((l - p) / this.comp.globalData.frameRate)) / 5e-4;
                                return o;
                            }
                            return m + ((l - p) / 0.001) * (m - g);
                        }
                    }
                    return this.getValueAtTime((((l - r) % s) + r) / this.comp.globalData.frameRate, 0);
                }
                function e(t, e, i) {
                    if (!this.k) return this.pv;
                    t = t ? t.toLowerCase() : "";
                    var s,
                        r,
                        a,
                        n,
                        o,
                        l = this.comp.renderedFrame,
                        h = this.keyframes,
                        p = h[0].t;
                    if (p <= l) return this.pv;
                    if ((i ? (r = p + (s = e ? Math.abs(elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - p))) : ((!e || e > h.length - 1) && (e = h.length - 1), (s = (r = h[e].t) - p)), "pingpong" === t)) {
                        if (Math.floor((p - l) / s) % 2 == 0) return this.getValueAtTime((((p - l) % s) + p) / this.comp.globalData.frameRate, 0);
                    } else {
                        if ("offset" === t) {
                            var d = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                                c = this.getValueAtTime(r / this.comp.globalData.frameRate, 0),
                                f = this.getValueAtTime((s - ((p - l) % s) + p) / this.comp.globalData.frameRate, 0),
                                u = Math.floor((p - l) / s) + 1;
                            if (this.pv.length) {
                                for (n = (o = new Array(d.length)).length, a = 0; a < n; a += 1) o[a] = f[a] - (c[a] - d[a]) * u;
                                return o;
                            }
                            return f - (c - d) * u;
                        }
                        if ("continue" === t) {
                            var m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                                g = this.getValueAtTime((p + 0.001) / this.comp.globalData.frameRate, 0);
                            if (this.pv.length) {
                                for (n = (o = new Array(m.length)).length, a = 0; a < n; a += 1) o[a] = m[a] + ((m[a] - g[a]) * (p - l)) / 0.001;
                                return o;
                            }
                            return m + ((m - g) * (p - l)) / 0.001;
                        }
                    }
                    return this.getValueAtTime((s - ((p - l) % s) + p) / this.comp.globalData.frameRate, 0);
                }
                function i(t, e) {
                    if (!this.k) return this.pv;
                    if (((t = 0.5 * (t || 0.4)), (e = Math.floor(e || 5)) <= 1)) return this.pv;
                    var i,
                        s,
                        r = this.comp.renderedFrame / this.comp.globalData.frameRate,
                        a = r - t,
                        n = 1 < e ? (r + t - a) / (e - 1) : 1,
                        o = 0,
                        l = 0;
                    for (i = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; o < e; ) {
                        if (((s = this.getValueAtTime(a + o * n)), this.pv.length)) for (l = 0; l < this.pv.length; l += 1) i[l] += s[l];
                        else i += s;
                        o += 1;
                    }
                    if (this.pv.length) for (l = 0; l < this.pv.length; l += 1) i[l] /= e;
                    else i /= e;
                    return i;
                }
                var s = TransformPropertyFactory.getTransformProperty;
                TransformPropertyFactory.getTransformProperty = function (t, e, i) {
                    var r = s(t, e, i);
                    return (
                        r.dynamicProperties.length
                            ? (r.getValueAtTime = function (t) {
                                  console.warn("Transform at time not supported");
                              }.bind(r))
                            : (r.getValueAtTime = function (t) {}.bind(r)),
                        (r.setGroupProperty = expressionHelpers.setGroupProperty),
                        r
                    );
                };
                var r = PropertyFactory.getProp;
                PropertyFactory.getProp = function (s, a, n, o, l) {
                    var h = r(s, a, n, o, l);
                    h.kf ? (h.getValueAtTime = expressionHelpers.getValueAtTime.bind(h)) : (h.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(h)),
                        (h.setGroupProperty = expressionHelpers.setGroupProperty),
                        (h.loopOut = t),
                        (h.loopIn = e),
                        (h.smooth = i),
                        (h.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(h)),
                        (h.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(h)),
                        (h.numKeys = 1 === a.a ? a.k.length : 0),
                        (h.propertyIndex = a.ix);
                    var p = 0;
                    return (
                        0 !== n && (p = createTypedArray("float32", 1 === a.a ? a.k[0].s.length : a.k.length)),
                        (h._cachingAtTime = { lastFrame: initialDefaultFrame, lastIndex: 0, value: p }),
                        expressionHelpers.searchExpressions(s, a, h),
                        h.k && l.addDynamicProperty(h),
                        h
                    );
                };
                var a = ShapePropertyFactory.getConstructorFunction(),
                    n = ShapePropertyFactory.getKeyframedConstructorFunction();
                function o() {}
                (o.prototype = {
                    vertices: function (t, e) {
                        this.k && this.getValue();
                        var i = this.v;
                        void 0 !== e && (i = this.getValueAtTime(e, 0));
                        var s,
                            r = i._length,
                            a = i[t],
                            n = i.v,
                            o = createSizedArray(r);
                        for (s = 0; s < r; s += 1) o[s] = "i" === t || "o" === t ? [a[s][0] - n[s][0], a[s][1] - n[s][1]] : [a[s][0], a[s][1]];
                        return o;
                    },
                    points: function (t) {
                        return this.vertices("v", t);
                    },
                    inTangents: function (t) {
                        return this.vertices("i", t);
                    },
                    outTangents: function (t) {
                        return this.vertices("o", t);
                    },
                    isClosed: function () {
                        return this.v.c;
                    },
                    pointOnPath: function (t, e) {
                        var i = this.v;
                        void 0 !== e && (i = this.getValueAtTime(e, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(i));
                        for (var s, r = this._segmentsLength, a = r.lengths, n = r.totalLength * t, o = 0, l = a.length, h = 0; o < l; ) {
                            if (h + a[o].addedLength > n) {
                                var p = o,
                                    d = i.c && o === l - 1 ? 0 : o + 1,
                                    c = (n - h) / a[o].addedLength;
                                s = bez.getPointInSegment(i.v[p], i.v[d], i.o[p], i.i[d], c, a[o]);
                                break;
                            }
                            (h += a[o].addedLength), (o += 1);
                        }
                        return s || (s = i.c ? [i.v[0][0], i.v[0][1]] : [i.v[i._length - 1][0], i.v[i._length - 1][1]]), s;
                    },
                    vectorOnPath: function (t, e, i) {
                        t = 1 == t ? (this.v.c ? 0 : 0.999) : t;
                        var s = this.pointOnPath(t, e),
                            r = this.pointOnPath(t + 0.001, e),
                            a = r[0] - s[0],
                            n = r[1] - s[1],
                            o = Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2));
                        return "tangent" === i ? [a / o, n / o] : [-n / o, a / o];
                    },
                    tangentOnPath: function (t, e) {
                        return this.vectorOnPath(t, e, "tangent");
                    },
                    normalOnPath: function (t, e) {
                        return this.vectorOnPath(t, e, "normal");
                    },
                    setGroupProperty: expressionHelpers.setGroupProperty,
                    getValueAtTime: expressionHelpers.getStaticValueAtTime,
                }),
                    extendPrototype([o], a),
                    extendPrototype([o], n),
                    (n.prototype.getValueAtTime = function (t) {
                        return (
                            this._cachingAtTime || (this._cachingAtTime = { shapeValue: shape_pool.clone(this.pv), lastIndex: 0, lastTime: initialDefaultFrame }),
                            (t *= this.elem.globalData.frameRate),
                            (t -= this.offsetTime) !== this._cachingAtTime.lastTime &&
                                ((this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0),
                                (this._cachingAtTime.lastTime = t),
                                this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)),
                            this._cachingAtTime.shapeValue
                        );
                    }),
                    (n.prototype.initiateExpression = ExpressionManager.initiateExpression);
                var l = ShapePropertyFactory.getShapeProp;
                ShapePropertyFactory.getShapeProp = function (t, e, i, s, r) {
                    var a = l(t, e, i, s, r);
                    return (a.propertyIndex = e.ix), (a.lock = !1), 3 === i ? expressionHelpers.searchExpressions(t, e.pt, a) : 4 === i && expressionHelpers.searchExpressions(t, e.ks, a), a.k && t.addDynamicProperty(a), a;
                };
            })(),
                (TextProperty.prototype.getExpressionValue = function (t, e) {
                    var i = this.calculateExpression(e);
                    if (t.t === i) return t;
                    var s = {};
                    return this.copyData(s, t), (s.t = i.toString()), (s.__complete = !1), s;
                }),
                (TextProperty.prototype.searchProperty = function () {
                    var t = this.searchKeyframes(),
                        e = this.searchExpressions();
                    return (this.kf = t || e), this.kf;
                }),
                (TextProperty.prototype.searchExpressions = function () {
                    if (this.data.d.x) return (this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this)), this.addEffect(this.getExpressionValue.bind(this)), !0;
                });
            var ShapeExpressionInterface = (function () {
                    function t(t, d, c) {
                        var f,
                            u = [],
                            m = t ? t.length : 0;
                        for (f = 0; f < m; f += 1)
                            "gr" == t[f].ty
                                ? u.push(e(t[f], d[f], c))
                                : "fl" == t[f].ty
                                ? u.push(i(t[f], d[f], c))
                                : "st" == t[f].ty
                                ? u.push(s(t[f], d[f], c))
                                : "tm" == t[f].ty
                                ? u.push(r(t[f], d[f], c))
                                : "tr" == t[f].ty ||
                                  ("el" == t[f].ty
                                      ? u.push(a(t[f], d[f], c))
                                      : "sr" == t[f].ty
                                      ? u.push(n(t[f], d[f], c))
                                      : "sh" == t[f].ty
                                      ? u.push(p(t[f], d[f], c))
                                      : "rc" == t[f].ty
                                      ? u.push(o(t[f], d[f], c))
                                      : "rd" == t[f].ty
                                      ? u.push(l(t[f], d[f], c))
                                      : "rp" == t[f].ty && u.push(h(t[f], d[f], c)));
                        return u;
                    }
                    function e(e, i, s) {
                        var r = function (t) {
                            switch (t) {
                                case "ADBE Vectors Group":
                                case "Contents":
                                case 2:
                                    return r.content;
                                default:
                                    return r.transform;
                            }
                        };
                        r.propertyGroup = function (t) {
                            return 1 === t ? r : s(t - 1);
                        };
                        var a,
                            n,
                            o,
                            l,
                            h,
                            p =
                                ((a = e),
                                (n = i),
                                (o = r.propertyGroup),
                                ((h = function (t) {
                                    for (var e = 0, i = l.length; e < i; ) {
                                        if (l[e]._name === t || l[e].mn === t || l[e].propertyIndex === t || l[e].ix === t || l[e].ind === t) return l[e];
                                        e += 1;
                                    }
                                    if ("number" == typeof t) return l[t - 1];
                                }).propertyGroup = function (t) {
                                    return 1 === t ? h : o(t - 1);
                                }),
                                (l = t(a.it, n.it, h.propertyGroup)),
                                (h.numProperties = l.length),
                                (h.propertyIndex = a.cix),
                                (h._name = a.nm),
                                h),
                            d = (function (t, e, i) {
                                function s(t) {
                                    return 1 == t ? r : i(--t);
                                }
                                function r(e) {
                                    return t.a.ix === e || "Anchor Point" === e
                                        ? r.anchorPoint
                                        : t.o.ix === e || "Opacity" === e
                                        ? r.opacity
                                        : t.p.ix === e || "Position" === e
                                        ? r.position
                                        : t.r.ix === e || "Rotation" === e || "ADBE Vector Rotation" === e
                                        ? r.rotation
                                        : t.s.ix === e || "Scale" === e
                                        ? r.scale
                                        : (t.sk && t.sk.ix === e) || "Skew" === e
                                        ? r.skew
                                        : (t.sa && t.sa.ix === e) || "Skew Axis" === e
                                        ? r.skewAxis
                                        : void 0;
                                }
                                return (
                                    e.transform.mProps.o.setGroupProperty(s),
                                    e.transform.mProps.p.setGroupProperty(s),
                                    e.transform.mProps.a.setGroupProperty(s),
                                    e.transform.mProps.s.setGroupProperty(s),
                                    e.transform.mProps.r.setGroupProperty(s),
                                    e.transform.mProps.sk && (e.transform.mProps.sk.setGroupProperty(s), e.transform.mProps.sa.setGroupProperty(s)),
                                    e.transform.op.setGroupProperty(s),
                                    Object.defineProperties(r, {
                                        opacity: { get: ExpressionPropertyInterface(e.transform.mProps.o) },
                                        position: { get: ExpressionPropertyInterface(e.transform.mProps.p) },
                                        anchorPoint: { get: ExpressionPropertyInterface(e.transform.mProps.a) },
                                        scale: { get: ExpressionPropertyInterface(e.transform.mProps.s) },
                                        rotation: { get: ExpressionPropertyInterface(e.transform.mProps.r) },
                                        skew: { get: ExpressionPropertyInterface(e.transform.mProps.sk) },
                                        skewAxis: { get: ExpressionPropertyInterface(e.transform.mProps.sa) },
                                        _name: { value: t.nm },
                                    }),
                                    (r.ty = "tr"),
                                    (r.mn = t.mn),
                                    (r.propertyGroup = i),
                                    r
                                );
                            })(e.it[e.it.length - 1], i.it[i.it.length - 1], r.propertyGroup);
                        return (
                            (r.content = p),
                            (r.transform = d),
                            Object.defineProperty(r, "_name", {
                                get: function () {
                                    return e.nm;
                                },
                            }),
                            (r.numProperties = e.np),
                            (r.propertyIndex = e.ix),
                            (r.nm = e.nm),
                            (r.mn = e.mn),
                            r
                        );
                    }
                    function i(t, e, i) {
                        function s(t) {
                            return "Color" === t || "color" === t ? s.color : "Opacity" === t || "opacity" === t ? s.opacity : void 0;
                        }
                        return (
                            Object.defineProperties(s, { color: { get: ExpressionPropertyInterface(e.c) }, opacity: { get: ExpressionPropertyInterface(e.o) }, _name: { value: t.nm }, mn: { value: t.mn } }),
                            e.c.setGroupProperty(i),
                            e.o.setGroupProperty(i),
                            s
                        );
                    }
                    function s(t, e, i) {
                        function s(t) {
                            return 1 === t ? ob : i(t - 1);
                        }
                        function r(t) {
                            return 1 === t ? l : s(t - 1);
                        }
                        var a,
                            n,
                            o = t.d ? t.d.length : 0,
                            l = {};
                        for (a = 0; a < o; a += 1) (n = a), Object.defineProperty(l, t.d[n].nm, { get: ExpressionPropertyInterface(e.d.dataProps[n].p) }), e.d.dataProps[a].p.setGroupProperty(r);
                        function h(t) {
                            return "Color" === t || "color" === t ? h.color : "Opacity" === t || "opacity" === t ? h.opacity : "Stroke Width" === t || "stroke width" === t ? h.strokeWidth : void 0;
                        }
                        return (
                            Object.defineProperties(h, {
                                color: { get: ExpressionPropertyInterface(e.c) },
                                opacity: { get: ExpressionPropertyInterface(e.o) },
                                strokeWidth: { get: ExpressionPropertyInterface(e.w) },
                                dash: {
                                    get: function () {
                                        return l;
                                    },
                                },
                                _name: { value: t.nm },
                                mn: { value: t.mn },
                            }),
                            e.c.setGroupProperty(s),
                            e.o.setGroupProperty(s),
                            e.w.setGroupProperty(s),
                            h
                        );
                    }
                    function r(t, e, i) {
                        function s(t) {
                            return 1 == t ? r : i(--t);
                        }
                        function r(e) {
                            return e === t.e.ix || "End" === e || "end" === e ? r.end : e === t.s.ix ? r.start : e === t.o.ix ? r.offset : void 0;
                        }
                        return (
                            (r.propertyIndex = t.ix),
                            e.s.setGroupProperty(s),
                            e.e.setGroupProperty(s),
                            e.o.setGroupProperty(s),
                            (r.propertyIndex = t.ix),
                            (r.propertyGroup = i),
                            Object.defineProperties(r, { start: { get: ExpressionPropertyInterface(e.s) }, end: { get: ExpressionPropertyInterface(e.e) }, offset: { get: ExpressionPropertyInterface(e.o) }, _name: { value: t.nm } }),
                            (r.mn = t.mn),
                            r
                        );
                    }
                    function a(t, e, i) {
                        function s(t) {
                            return 1 == t ? a : i(--t);
                        }
                        a.propertyIndex = t.ix;
                        var r = "tm" === e.sh.ty ? e.sh.prop : e.sh;
                        function a(e) {
                            return t.p.ix === e ? a.position : t.s.ix === e ? a.size : void 0;
                        }
                        return (
                            r.s.setGroupProperty(s),
                            r.p.setGroupProperty(s),
                            Object.defineProperties(a, { size: { get: ExpressionPropertyInterface(r.s) }, position: { get: ExpressionPropertyInterface(r.p) }, _name: { value: t.nm } }),
                            (a.mn = t.mn),
                            a
                        );
                    }
                    function n(t, e, i) {
                        function s(t) {
                            return 1 == t ? a : i(--t);
                        }
                        var r = "tm" === e.sh.ty ? e.sh.prop : e.sh;
                        function a(e) {
                            return t.p.ix === e
                                ? a.position
                                : t.r.ix === e
                                ? a.rotation
                                : t.pt.ix === e
                                ? a.points
                                : t.or.ix === e || "ADBE Vector Star Outer Radius" === e
                                ? a.outerRadius
                                : t.os.ix === e
                                ? a.outerRoundness
                                : !t.ir || (t.ir.ix !== e && "ADBE Vector Star Inner Radius" !== e)
                                ? t.is && t.is.ix === e
                                    ? a.innerRoundness
                                    : void 0
                                : a.innerRadius;
                        }
                        return (
                            (a.propertyIndex = t.ix),
                            r.or.setGroupProperty(s),
                            r.os.setGroupProperty(s),
                            r.pt.setGroupProperty(s),
                            r.p.setGroupProperty(s),
                            r.r.setGroupProperty(s),
                            t.ir && (r.ir.setGroupProperty(s), r.is.setGroupProperty(s)),
                            Object.defineProperties(a, {
                                position: { get: ExpressionPropertyInterface(r.p) },
                                rotation: { get: ExpressionPropertyInterface(r.r) },
                                points: { get: ExpressionPropertyInterface(r.pt) },
                                outerRadius: { get: ExpressionPropertyInterface(r.or) },
                                outerRoundness: { get: ExpressionPropertyInterface(r.os) },
                                innerRadius: { get: ExpressionPropertyInterface(r.ir) },
                                innerRoundness: { get: ExpressionPropertyInterface(r.is) },
                                _name: { value: t.nm },
                            }),
                            (a.mn = t.mn),
                            a
                        );
                    }
                    function o(t, e, i) {
                        function s(t) {
                            return 1 == t ? a : i(--t);
                        }
                        var r = "tm" === e.sh.ty ? e.sh.prop : e.sh;
                        function a(e) {
                            return t.p.ix === e ? a.position : t.r.ix === e ? a.roundness : t.s.ix === e || "Size" === e || "ADBE Vector Rect Size" === e ? a.size : void 0;
                        }
                        return (
                            (a.propertyIndex = t.ix),
                            r.p.setGroupProperty(s),
                            r.s.setGroupProperty(s),
                            r.r.setGroupProperty(s),
                            Object.defineProperties(a, { position: { get: ExpressionPropertyInterface(r.p) }, roundness: { get: ExpressionPropertyInterface(r.r) }, size: { get: ExpressionPropertyInterface(r.s) }, _name: { value: t.nm } }),
                            (a.mn = t.mn),
                            a
                        );
                    }
                    function l(t, e, i) {
                        var s = e;
                        function r(e) {
                            if (t.r.ix === e || "Round Corners 1" === e) return r.radius;
                        }
                        return (
                            (r.propertyIndex = t.ix),
                            s.rd.setGroupProperty(function (t) {
                                return 1 == t ? r : i(--t);
                            }),
                            Object.defineProperties(r, { radius: { get: ExpressionPropertyInterface(s.rd) }, _name: { value: t.nm } }),
                            (r.mn = t.mn),
                            r
                        );
                    }
                    function h(t, e, i) {
                        function s(t) {
                            return 1 == t ? a : i(--t);
                        }
                        var r = e;
                        function a(e) {
                            return t.c.ix === e || "Copies" === e ? a.copies : t.o.ix === e || "Offset" === e ? a.offset : void 0;
                        }
                        return (
                            (a.propertyIndex = t.ix),
                            r.c.setGroupProperty(s),
                            r.o.setGroupProperty(s),
                            Object.defineProperties(a, { copies: { get: ExpressionPropertyInterface(r.c) }, offset: { get: ExpressionPropertyInterface(r.o) }, _name: { value: t.nm } }),
                            (a.mn = t.mn),
                            a
                        );
                    }
                    function p(t, e, i) {
                        var s = e.sh;
                        function r(t) {
                            if ("Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t) return r.path;
                        }
                        return (
                            s.setGroupProperty(function (t) {
                                return 1 == t ? r : i(--t);
                            }),
                            Object.defineProperties(r, {
                                path: {
                                    get: function () {
                                        return s.k && s.getValue(), s;
                                    },
                                },
                                shape: {
                                    get: function () {
                                        return s.k && s.getValue(), s;
                                    },
                                },
                                _name: { value: t.nm },
                                ix: { value: t.ix },
                                mn: { value: t.mn },
                            }),
                            r
                        );
                    }
                    return function (e, i, s) {
                        var r;
                        function a(t) {
                            if ("number" == typeof t) return r[t - 1];
                            for (var e = 0, i = r.length; e < i; ) {
                                if (r[e]._name === t) return r[e];
                                e += 1;
                            }
                        }
                        return (a.propertyGroup = s), (r = t(e, i, a)), (a.numProperties = r.length), a;
                    };
                })(),
                TextExpressionInterface = function (t) {
                    var e;
                    function i() {}
                    return (
                        Object.defineProperty(i, "sourceText", {
                            get: function () {
                                t.textProperty.getValue();
                                var i = t.textProperty.currentData.t;
                                return void 0 !== i && ((t.textProperty.currentData.t = void 0), ((e = new String(i)).value = i || new String(i))), e;
                            },
                        }),
                        i
                    );
                },
                LayerExpressionInterface = (function () {
                    function t(t, e) {
                        var i = new Matrix();
                        if ((i.reset(), this._elem.finalTransform.mProp.applyToMatrix(i), this._elem.hierarchy && this._elem.hierarchy.length)) {
                            var s,
                                r = this._elem.hierarchy.length;
                            for (s = 0; s < r; s += 1) this._elem.hierarchy[s].finalTransform.mProp.applyToMatrix(i);
                            return i.applyToPointArray(t[0], t[1], t[2] || 0);
                        }
                        return i.applyToPointArray(t[0], t[1], t[2] || 0);
                    }
                    function e(t, e) {
                        var i = new Matrix();
                        if ((i.reset(), this._elem.finalTransform.mProp.applyToMatrix(i), this._elem.hierarchy && this._elem.hierarchy.length)) {
                            var s,
                                r = this._elem.hierarchy.length;
                            for (s = 0; s < r; s += 1) this._elem.hierarchy[s].finalTransform.mProp.applyToMatrix(i);
                            return i.inversePoint(t);
                        }
                        return i.inversePoint(t);
                    }
                    function i(t) {
                        var e = new Matrix();
                        if ((e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length)) {
                            var i,
                                s = this._elem.hierarchy.length;
                            for (i = 0; i < s; i += 1) this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(e);
                            return e.inversePoint(t);
                        }
                        return e.inversePoint(t);
                    }
                    function s() {
                        return [1, 1, 1, 1];
                    }
                    return function (r) {
                        var a;
                        function n(t) {
                            switch (t) {
                                case "ADBE Root Vectors Group":
                                case "Contents":
                                case 2:
                                    return n.shapeInterface;
                                case 1:
                                case 6:
                                case "Transform":
                                case "transform":
                                case "ADBE Transform Group":
                                    return a;
                                case 4:
                                case "ADBE Effect Parade":
                                case "effects":
                                case "Effects":
                                    return n.effect;
                            }
                        }
                        (n.toWorld = t), (n.fromWorld = e), (n.toComp = t), (n.fromComp = i), (n.sampleImage = s), (n.sourceRectAtTime = r.sourceRectAtTime.bind(r));
                        var o = getDescriptor((a = TransformExpressionInterface((n._elem = r).finalTransform.mProp)), "anchorPoint");
                        return (
                            Object.defineProperties(n, {
                                hasParent: {
                                    get: function () {
                                        return r.hierarchy.length;
                                    },
                                },
                                parent: {
                                    get: function () {
                                        return r.hierarchy[0].layerInterface;
                                    },
                                },
                                rotation: getDescriptor(a, "rotation"),
                                scale: getDescriptor(a, "scale"),
                                position: getDescriptor(a, "position"),
                                opacity: getDescriptor(a, "opacity"),
                                anchorPoint: o,
                                anchor_point: o,
                                transform: {
                                    get: function () {
                                        return a;
                                    },
                                },
                                active: {
                                    get: function () {
                                        return r.isInRange;
                                    },
                                },
                            }),
                            (n.startTime = r.data.st),
                            (n.index = r.data.ind),
                            (n.source = r.data.refId),
                            (n.height = 0 === r.data.ty ? r.data.h : 100),
                            (n.width = 0 === r.data.ty ? r.data.w : 100),
                            (n.inPoint = r.data.ip / r.comp.globalData.frameRate),
                            (n.outPoint = r.data.op / r.comp.globalData.frameRate),
                            (n._name = r.data.nm),
                            (n.registerMaskInterface = function (t) {
                                n.mask = new MaskManagerInterface(t, r);
                            }),
                            (n.registerEffectsInterface = function (t) {
                                n.effect = t;
                            }),
                            n
                        );
                    };
                })(),
                CompExpressionInterface = function (t) {
                    function e(e) {
                        for (var i = 0, s = t.layers.length; i < s; ) {
                            if (t.layers[i].nm === e || t.layers[i].ind === e) return t.elements[i].layerInterface;
                            i += 1;
                        }
                        return null;
                    }
                    return (
                        Object.defineProperty(e, "_name", { value: t.data.nm }),
                        ((e.layer = e).pixelAspect = 1),
                        (e.height = t.data.h || t.globalData.compSize.h),
                        (e.width = t.data.w || t.globalData.compSize.w),
                        (e.pixelAspect = 1),
                        (e.frameDuration = 1 / t.globalData.frameRate),
                        (e.displayStartTime = 0),
                        (e.numLayers = t.layers.length),
                        e
                    );
                },
                TransformExpressionInterface = function (t) {
                    function e(t) {
                        switch (t) {
                            case "scale":
                            case "Scale":
                            case "ADBE Scale":
                            case 6:
                                return e.scale;
                            case "rotation":
                            case "Rotation":
                            case "ADBE Rotation":
                            case "ADBE Rotate Z":
                            case 10:
                                return e.rotation;
                            case "ADBE Rotate X":
                                return e.xRotation;
                            case "ADBE Rotate Y":
                                return e.yRotation;
                            case "position":
                            case "Position":
                            case "ADBE Position":
                            case 2:
                                return e.position;
                            case "ADBE Position_0":
                                return e.xPosition;
                            case "ADBE Position_1":
                                return e.yPosition;
                            case "ADBE Position_2":
                                return e.zPosition;
                            case "anchorPoint":
                            case "AnchorPoint":
                            case "Anchor Point":
                            case "ADBE AnchorPoint":
                            case 1:
                                return e.anchorPoint;
                            case "opacity":
                            case "Opacity":
                            case 11:
                                return e.opacity;
                        }
                    }
                    if (
                        (Object.defineProperty(e, "rotation", { get: ExpressionPropertyInterface(t.r || t.rz) }),
                        Object.defineProperty(e, "zRotation", { get: ExpressionPropertyInterface(t.rz || t.r) }),
                        Object.defineProperty(e, "xRotation", { get: ExpressionPropertyInterface(t.rx) }),
                        Object.defineProperty(e, "yRotation", { get: ExpressionPropertyInterface(t.ry) }),
                        Object.defineProperty(e, "scale", { get: ExpressionPropertyInterface(t.s) }),
                        t.p)
                    )
                        var i = ExpressionPropertyInterface(t.p);
                    return (
                        Object.defineProperty(e, "position", {
                            get: function () {
                                return t.p ? i() : [t.px.v, t.py.v, t.pz ? t.pz.v : 0];
                            },
                        }),
                        Object.defineProperty(e, "xPosition", { get: ExpressionPropertyInterface(t.px) }),
                        Object.defineProperty(e, "yPosition", { get: ExpressionPropertyInterface(t.py) }),
                        Object.defineProperty(e, "zPosition", { get: ExpressionPropertyInterface(t.pz) }),
                        Object.defineProperty(e, "anchorPoint", { get: ExpressionPropertyInterface(t.a) }),
                        Object.defineProperty(e, "opacity", { get: ExpressionPropertyInterface(t.o) }),
                        Object.defineProperty(e, "skew", { get: ExpressionPropertyInterface(t.sk) }),
                        Object.defineProperty(e, "skewAxis", { get: ExpressionPropertyInterface(t.sa) }),
                        Object.defineProperty(e, "orientation", { get: ExpressionPropertyInterface(t.or) }),
                        e
                    );
                },
                ProjectInterface = (function () {
                    function t(t) {
                        this.compositions.push(t);
                    }
                    return function () {
                        function e(t) {
                            for (var e = 0, i = this.compositions.length; e < i; ) {
                                if (this.compositions[e].data && this.compositions[e].data.nm === t)
                                    return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame), this.compositions[e].compInterface;
                                e += 1;
                            }
                        }
                        return (e.compositions = []), (e.currentFrame = 0), (e.registerComposition = t), e;
                    };
                })(),
                EffectsExpressionInterface = (function () {
                    function t(i, s, r, a) {
                        var n,
                            o = [],
                            l = i.ef.length;
                        for (n = 0; n < l; n += 1) 5 === i.ef[n].ty ? o.push(t(i.ef[n], s.effectElements[n], s.effectElements[n].propertyGroup, a)) : o.push(e(s.effectElements[n], i.ef[n].ty, a, h));
                        function h(t) {
                            return 1 === t ? p : r(t - 1);
                        }
                        var p = function (t) {
                            for (var e = i.ef, s = 0, r = e.length; s < r; ) {
                                if (t === e[s].nm || t === e[s].mn || t === e[s].ix) return 5 === e[s].ty ? o[s] : o[s]();
                                s += 1;
                            }
                            return o[0]();
                        };
                        return (
                            (p.propertyGroup = h),
                            "ADBE Color Control" === i.mn &&
                                Object.defineProperty(p, "color", {
                                    get: function () {
                                        return o[0]();
                                    },
                                }),
                            Object.defineProperty(p, "numProperties", {
                                get: function () {
                                    return i.np;
                                },
                            }),
                            (p.active = p.enabled = 0 !== i.en),
                            p
                        );
                    }
                    function e(t, e, i, s) {
                        var r = ExpressionPropertyInterface(t.p);
                        return (
                            t.p.setGroupProperty && t.p.setGroupProperty(s),
                            function () {
                                return 10 === e ? i.comp.compInterface(t.p.v) : r();
                            }
                        );
                    }
                    return {
                        createEffectsInterface: function (e, i) {
                            if (e.effectsManager) {
                                var s,
                                    r = [],
                                    a = e.data.ef,
                                    n = e.effectsManager.effectElements.length;
                                for (s = 0; s < n; s += 1) r.push(t(a[s], e.effectsManager.effectElements[s], i, e));
                                return function (t) {
                                    for (var i = e.data.ef || [], s = 0, a = i.length; s < a; ) {
                                        if (t === i[s].nm || t === i[s].mn || t === i[s].ix) return r[s];
                                        s += 1;
                                    }
                                };
                            }
                        },
                    };
                })(),
                MaskManagerInterface = (function () {
                    function t(t, e) {
                        (this._mask = t), (this._data = e);
                    }
                    return (
                        Object.defineProperty(t.prototype, "maskPath", {
                            get: function () {
                                return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop;
                            },
                        }),
                        Object.defineProperty(t.prototype, "maskOpacity", {
                            get: function () {
                                return this._mask.op.k && this._mask.op.getValue(), 100 * this._mask.op.v;
                            },
                        }),
                        function (e, i) {
                            var s,
                                r = createSizedArray(e.viewData.length),
                                a = e.viewData.length;
                            for (s = 0; s < a; s += 1) r[s] = new t(e.viewData[s], e.masksProperties[s]);
                            return function (t) {
                                for (s = 0; s < a; ) {
                                    if (e.masksProperties[s].nm === t) return r[s];
                                    s += 1;
                                }
                            };
                        }
                    );
                })(),
                ExpressionPropertyInterface = (function () {
                    var t = { pv: 0, v: 0, mult: 1 },
                        e = { pv: [0, 0, 0], v: [0, 0, 0], mult: 1 };
                    function i(t, e, i) {
                        Object.defineProperty(t, "velocity", {
                            get: function () {
                                return e.getVelocityAtTime(e.comp.currentFrame);
                            },
                        }),
                            (t.numKeys = e.keyframes ? e.keyframes.length : 0),
                            (t.key = function (s) {
                                if (t.numKeys) {
                                    var r;
                                    r = "s" in e.keyframes[s - 1] ? e.keyframes[s - 1].s : "e" in e.keyframes[s - 2] ? e.keyframes[s - 2].e : e.keyframes[s - 2].s;
                                    var a = "unidimensional" === i ? new Number(r) : Object.assign({}, r);
                                    return (a.time = e.keyframes[s - 1].t / e.elem.comp.globalData.frameRate), a;
                                }
                                return 0;
                            }),
                            (t.valueAtTime = e.getValueAtTime),
                            (t.speedAtTime = e.getSpeedAtTime),
                            (t.velocityAtTime = e.getVelocityAtTime),
                            (t.propertyGroup = e.propertyGroup);
                    }
                    function s() {
                        return t;
                    }
                    return function (r) {
                        return r
                            ? "unidimensional" === r.propType
                                ? (function (e) {
                                      (e && "pv" in e) || (e = t);
                                      var s = 1 / e.mult,
                                          r = e.pv * s,
                                          a = new Number(r);
                                      return (
                                          (a.value = r),
                                          i(a, e, "unidimensional"),
                                          function () {
                                              return e.k && e.getValue(), (r = e.v * s), a.value !== r && (((a = new Number(r)).value = r), i(a, e, "unidimensional")), a;
                                          }
                                      );
                                  })(r)
                                : (function (t) {
                                      (t && "pv" in t) || (t = e);
                                      var s = 1 / t.mult,
                                          r = t.pv.length,
                                          a = createTypedArray("float32", r),
                                          n = createTypedArray("float32", r);
                                      return (
                                          (a.value = n),
                                          i(a, t, "multidimensional"),
                                          function () {
                                              t.k && t.getValue();
                                              for (var e = 0; e < r; e += 1) a[e] = n[e] = t.v[e] * s;
                                              return a;
                                          }
                                      );
                                  })(r)
                            : s;
                    };
                })(),
                aZ,
                bZ;
            function SliderEffect(t, e, i) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
            }
            function AngleEffect(t, e, i) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
            }
            function ColorEffect(t, e, i) {
                this.p = PropertyFactory.getProp(e, t.v, 1, 0, i);
            }
            function PointEffect(t, e, i) {
                this.p = PropertyFactory.getProp(e, t.v, 1, 0, i);
            }
            function LayerIndexEffect(t, e, i) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
            }
            function MaskIndexEffect(t, e, i) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
            }
            function CheckboxEffect(t, e, i) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
            }
            function NoValueEffect() {
                this.p = {};
            }
            function EffectsManager() {}
            function EffectsManager(t, e) {
                var i = t.ef || [];
                this.effectElements = [];
                var s,
                    r,
                    a = i.length;
                for (s = 0; s < a; s++) (r = new GroupEffect(i[s], e)), this.effectElements.push(r);
            }
            function GroupEffect(t, e) {
                this.init(t, e);
            }
            (aZ = (function () {
                function t(t, e) {
                    return (this.textIndex = t + 1), (this.textTotal = e), (this.v = this.getValue() * this.mult), this.v;
                }
                return function (e, i) {
                    (this.pv = 1),
                        (this.comp = e.comp),
                        (this.elem = e),
                        (this.mult = 0.01),
                        (this.propType = "textSelector"),
                        (this.textTotal = i.totalChars),
                        (this.selectorValue = 100),
                        (this.lastValue = [1, 1, 1]),
                        (this.k = !0),
                        (this.x = !0),
                        (this.getValue = ExpressionManager.initiateExpression.bind(this)(e, i, this)),
                        (this.getMult = t),
                        (this.getVelocityAtTime = expressionHelpers.getVelocityAtTime),
                        this.kf ? (this.getValueAtTime = expressionHelpers.getValueAtTime.bind(this)) : (this.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(this)),
                        (this.setGroupProperty = expressionHelpers.setGroupProperty);
                };
            })()),
                (bZ = TextSelectorProp.getTextSelectorProp),
                (TextSelectorProp.getTextSelectorProp = function (t, e, i) {
                    return 1 === e.t ? new aZ(t, e, i) : bZ(t, e, i);
                }),
                extendPrototype([DynamicPropertyContainer], GroupEffect),
                (GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties),
                (GroupEffect.prototype.init = function (t, e) {
                    (this.data = t), (this.effectElements = []), this.initDynamicPropertyContainer(e);
                    var i,
                        s,
                        r = this.data.ef.length,
                        a = this.data.ef;
                    for (i = 0; i < r; i += 1) {
                        switch (((s = null), a[i].ty)) {
                            case 0:
                                s = new SliderEffect(a[i], e, this);
                                break;
                            case 1:
                                s = new AngleEffect(a[i], e, this);
                                break;
                            case 2:
                                s = new ColorEffect(a[i], e, this);
                                break;
                            case 3:
                                s = new PointEffect(a[i], e, this);
                                break;
                            case 4:
                            case 7:
                                s = new CheckboxEffect(a[i], e, this);
                                break;
                            case 10:
                                s = new LayerIndexEffect(a[i], e, this);
                                break;
                            case 11:
                                s = new MaskIndexEffect(a[i], e, this);
                                break;
                            case 5:
                                s = new EffectsManager(a[i], e, this);
                                break;
                            default:
                                s = new NoValueEffect(a[i], e, this);
                        }
                        s && this.effectElements.push(s);
                    }
                });
            var lottiejs = {},
                _isFrozen = !1;
            function setLocationHref(t) {
                locationHref = t;
            }
            function searchAnimations() {
                !0 === standalone ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations();
            }
            function setSubframeRendering(t) {
                subframeEnabled = t;
            }
            function loadAnimation(t) {
                return !0 === standalone && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t);
            }
            function setQuality(t) {
                if ("string" == typeof t)
                    switch (t) {
                        case "high":
                            defaultCurveSegments = 200;
                            break;
                        case "medium":
                            defaultCurveSegments = 50;
                            break;
                        case "low":
                            defaultCurveSegments = 10;
                    }
                else !isNaN(t) && 1 < t && (defaultCurveSegments = t);
                roundValues(!(50 <= defaultCurveSegments));
            }
            function inBrowser() {
                return "undefined" != typeof navigator;
            }
            function installPlugin(t, e) {
                "expressions" === t && (expressionsPlugin = e);
            }
            function getFactory(t) {
                switch (t) {
                    case "propertyFactory":
                        return PropertyFactory;
                    case "shapePropertyFactory":
                        return ShapePropertyFactory;
                    case "matrix":
                        return Matrix;
                }
            }
            function checkReady() {
                "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations());
            }
            function getQueryVariable(t) {
                for (var e = queryString.split("&"), i = 0; i < e.length; i++) {
                    var s = e[i].split("=");
                    if (decodeURIComponent(s[0]) == t) return decodeURIComponent(s[1]);
                }
            }
            (lottiejs.play = animationManager.play),
                (lottiejs.pause = animationManager.pause),
                (lottiejs.setLocationHref = setLocationHref),
                (lottiejs.togglePause = animationManager.togglePause),
                (lottiejs.setSpeed = animationManager.setSpeed),
                (lottiejs.setDirection = animationManager.setDirection),
                (lottiejs.stop = animationManager.stop),
                (lottiejs.searchAnimations = searchAnimations),
                (lottiejs.registerAnimation = animationManager.registerAnimation),
                (lottiejs.loadAnimation = loadAnimation),
                (lottiejs.setSubframeRendering = setSubframeRendering),
                (lottiejs.resize = animationManager.resize),
                (lottiejs.goToAndStop = animationManager.goToAndStop),
                (lottiejs.destroy = animationManager.destroy),
                (lottiejs.setQuality = setQuality),
                (lottiejs.inBrowser = inBrowser),
                (lottiejs.installPlugin = installPlugin),
                (lottiejs.freeze = animationManager.freeze),
                (lottiejs.unfreeze = animationManager.unfreeze),
                (lottiejs.getRegisteredAnimations = animationManager.getRegisteredAnimations),
                (lottiejs.__getFactory = getFactory),
                (lottiejs.version = "5.5.3");
            var standalone = "__[STANDALONE]__",
                animationData = "__[ANIMATIONDATA]__",
                renderer = "";
            if (standalone) {
                var scripts = document.getElementsByTagName("script"),
                    index = scripts.length - 1,
                    myScript = scripts[index] || { src: "" },
                    queryString = myScript.src.replace(/^[^\?]+\??/, "");
                renderer = getQueryVariable("renderer");
            }
            var readyStateCheckInterval = setInterval(checkReady, 100);
            return lottiejs;
        }),
        "function" == typeof define && define.amd
            ? define(function () {
                  return b(a);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = b(a))
            : ((a.lottie = b(a)), (a.bodymovin = a.lottie))),
    (function (t) {
        var e;
        if (("function" == typeof define && define.amd && (define(t), (e = !0)), "object" == typeof exports && ((module.exports = t()), (e = !0)), !e)) {
            var i = window.Cookies,
                s = (window.Cookies = t());
            s.noConflict = function () {
                return (window.Cookies = i), s;
            };
        }
    })(function () {
        function t() {
            for (var t = 0, e = {}; t < arguments.length; t++) {
                var i = arguments[t];
                for (var s in i) e[s] = i[s];
            }
            return e;
        }
        function e(t) {
            return t.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
        }
        return (function i(s) {
            function r() {}
            function a(e, i, a) {
                if ("undefined" != typeof document) {
                    "number" == typeof (a = t({ path: "/" }, r.defaults, a)).expires && (a.expires = new Date(1 * new Date() + 864e5 * a.expires)), (a.expires = a.expires ? a.expires.toUTCString() : "");
                    try {
                        var n = JSON.stringify(i);
                        /^[\{\[]/.test(n) && (i = n);
                    } catch (t) {}
                    (i = s.write ? s.write(i, e) : encodeURIComponent(String(i)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)),
                        (e = encodeURIComponent(String(e))
                            .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
                            .replace(/[\(\)]/g, escape));
                    var o = "";
                    for (var l in a) a[l] && ((o += "; " + l), !0 !== a[l] && (o += "=" + a[l].split(";")[0]));
                    return (document.cookie = e + "=" + i + o);
                }
            }
            function n(t, i) {
                if ("undefined" != typeof document) {
                    for (var r = {}, a = document.cookie ? document.cookie.split("; ") : [], n = 0; n < a.length; n++) {
                        var o = a[n].split("="),
                            l = o.slice(1).join("=");
                        i || '"' !== l.charAt(0) || (l = l.slice(1, -1));
                        try {
                            var h = e(o[0]);
                            if (((l = (s.read || s)(l, h) || e(l)), i))
                                try {
                                    l = JSON.parse(l);
                                } catch (t) {}
                            if (((r[h] = l), t === h)) break;
                        } catch (t) {}
                    }
                    return t ? r[t] : r;
                }
            }
            return (
                (r.set = a),
                (r.get = function (t) {
                    return n(t, !1);
                }),
                (r.getJSON = function (t) {
                    return n(t, !0);
                }),
                (r.remove = function (e, i) {
                    a(e, "", t(i, { expires: -1 }));
                }),
                (r.defaults = {}),
                (r.withConverter = i),
                r
            );
        })(function () {});
    }),
    (window.lazySizesConfig = window.lazySizesConfig || {}),
    (lazySizesConfig.loadHidden = !1),
    (lazySizesConfig.loadMode = 1),
    $(document).on("lazybeforeunveil", function (t) {
        $(t.target).parents(".slick-slide").length &&
            $(t.target).parents(".slick-slide").next().find(".slide-image.hidden").length &&
            (clearTimeout(lazyInitThrottle),
            (lazyInitThrottle = setTimeout(function () {
                $(t.target).parents(".slick-slide").next().find(".slide-image.hidden").removeClass("hidden");
            }, 250))),
            $("#subnav-wrap").length && responsive(!1);
    });
var platform = window.navigator.oscpu;
platform || (platform = "");
var $window = $(window),
    iOSbrowser = $("html").is("[data-ios-browser]"),
    isTouchscreen = $("html").is("[data-touch-events]"),
    $document = $(document),
    $htmlBody = $("html,body"),
    $body = $("body"),
    $header = $("#site-header"),
    $ajaxWrap = $("#content-wrap"),
    $fullbleedHero = $("#content > .full-bleed:first-child"),
    homeURL = $('meta[name="home-url"]').attr("content"),
    templateDir = $('meta[name="template-dir"]').attr("content"),
    winWidth,
    winHeight,
    headerHeight,
    availableHeight,
    marginShift = 700,
    transTime = 500,
    modalInit = !1,
    modalCount = 1,
    setOpen,
    $panelWrap = $("#panel-modal"),
    $panel = $("#panel"),
    $panelButton,
    panelData,
    panelHeight,
    panelPos,
    arrowAdjust;
iOSbrowser = !!(/iPad|iPhone|iPod/.test(navigator.platform) || ("MacIntel" === navigator.platform && navigator.maxTouchPoints > 1)) || iOSbrowser;
var scrollPos = 0,
    lastScrollPos = 0,
    pageScrollPos = 0,
    subnavLinks,
    subnavID,
    subnavSection,
    contentOffset,
    contentBot,
    currentSection,
    lastSection,
    secTopPos,
    secHeight,
    secPercent,
    secBot,
    footerLogo = document.querySelector("#logo-animation"),
    logoAnim;
function responsive(t) {
    t || (t = !1),
        modalInit || (scrollPos = -1),
        (winWidth = $.windowWidth()),
        (winHeight = $.windowHeight()),
        (headerHeight = $header.outerHeight()),
        (availableHeight = winHeight - headerHeight),
        $("#subnav-wrap").length ? (contentOffset = Math.floor($("#subnav-wrap").offset().top)) : $("#post-content").length && (contentOffset = Math.floor($("#post-content").offset().top)),
        (contentBot = $("#related-posts").length ? Math.floor($("#related-posts").offset().top - headerHeight) : Math.floor($("#site-footer").offset().top - headerHeight)),
        lazySizes.loader.checkElems(),
        $(".match-height").matchHeight({ byRow: !0, property: "height" }),
        t &&
            (winWidth < 1024 && !$("#main-menu #search-link").length ? $("#search-link").appendTo("#main-menu ul") : winWidth >= 1024 && !$("#submenu #search-link").length && $("#search-link").appendTo("#submenu"),
            $panelWrap.is(".show") && closeModal("#panel-modal"),
            isTouchscreen &&
                !modalInit &&
                ($("body").css("min-height", availableHeight),
                $(".fullscreen:not(.post-hero)").css("height", availableHeight),
                $("#home-hero").css("height", winHeight),
                $(".post-hero:not(.collection-hero)").css("height", availableHeight - 1.333 * headerHeight),
                winWidth < marginShift ? $(".collection-hero").css("height", availableHeight) : $(".collection-hero").css("height", availableHeight - 1.333 * headerHeight)),
            $(".image-ratio").length &&
                $(".image-ratio").each(function () {
                    var t = $(this).data("ratio"),
                        e = $(this).parent(".image-wrap").width(),
                        i = $(this).parent(".image-wrap").height();
                    i / e > t
                        ? $(this)
                              .height(e * t)
                              .width("100%")
                        : $(this)
                              .width(i / t)
                              .height("100%"),
                        $(this).find(".fixed-mask").width($(this).width());
                }),
            iOSbrowser || balanceText.updateWatched());
}
function positionPanel(t) {
    scrollPos < 0 ||
        $panelWrap.is(".loading") ||
        (winWidth < 1280
            ? ((panelPos = headerHeight), (arrowAdjust = Math.floor(t.offset().top - scrollPos - headerHeight + t.height() / 2)))
            : ((panelHeight = $panel.height()),
              (panelPos = Math.floor(t.offset().top - panelHeight / 2 + t.height() / 2)),
              scrollPos < contentOffset && contentOffset + headerHeight + panelHeight > scrollPos + winHeight
                  ? ((panelPos = contentOffset + headerHeight), (arrowAdjust = Math.floor(t.offset().top - contentOffset - headerHeight + t.height() / 2)))
                  : panelHeight > winHeight - headerHeight
                  ? (console.log("panel taller than viewport"), (panelPos = scrollPos + headerHeight), (arrowAdjust = Math.floor(t.offset().top - scrollPos - headerHeight + t.height() / 2)))
                  : panelPos - headerHeight < scrollPos
                  ? ((panelPos = scrollPos + headerHeight), (arrowAdjust = Math.floor(t.offset().top - scrollPos - headerHeight + t.height() / 2)))
                  : panelPos + panelHeight > scrollPos + winHeight
                  ? ((panelPos = scrollPos + winHeight - panelHeight), (arrowAdjust = Math.floor(panelHeight - (scrollPos + winHeight - t.offset().top - t.height() / 2))))
                  : panelPos + panelHeight > contentBot + headerHeight
                  ? ((panelPos = contentBot - panelHeight + headerHeight), (arrowAdjust = Math.floor(panelHeight - (contentBot - t.offset().top - t.height() / 2) - headerHeight)))
                  : (arrowAdjust = Math.floor(panelHeight / 2))),
        $panelWrap.css("top", panelPos).find(".panel-arrow").css("top", arrowAdjust));
}
var scroll =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (t) {
        window.setTimeout(t, 1e3 / 60);
    };
function constant() {
    if (scrollPos == window.pageYOffset) return scroll(constant), !1;
    modalInit || ((scrollPos = window.pageYOffset), (lastScrollPos = scrollPos)),
        !isTouchscreen && $fullbleedHero.length && scrollPos < headerHeight && $body.is('[data-loading="false"]')
            ? $header.is(".opaque") && $header.removeClass("opaque")
            : !$header.is(".opaque") && $body.is('[data-loading="false"]') && $header.addClass("opaque"),
        $("[data-video]:not([data-loaded])").length &&
            $("[data-video]:not([data-loaded])").each(function () {
                ($(this).parents(".slideshow").length && !$(this).parents(".slick-slide").is(".slick-active")) ||
                    ((secTopPos = $(this).offset().top), (secHeight = $(this).innerHeight()), (secBot = secTopPos + secHeight), scrollPos >= secTopPos - winHeight && scrollPos <= secBot && loadVideo($(this)));
            }),
        $("#subnav").length &&
            winWidth >= 1024 &&
            (scrollPos >= contentBot - $("#subnav").outerHeight() - headerHeight && $("#subnav").is(".toc")
                ? $("#subnav-wrap").removeClass("fixed").addClass("bottom")
                : scrollPos >= contentOffset - headerHeight
                ? ($("#subnav-wrap").addClass("fixed"), $("#subnav").is(".toc") && $("#subnav-wrap").removeClass("bottom"))
                : $("#subnav-wrap").removeClass("fixed bottom"),
            $(".subnav-section").each(function () {
                (secTopPos = $(this).offset().top),
                    (secHeight = $(this).height()),
                    (secBot = secTopPos + secHeight),
                    (subnavSection = $(this).find(".page-anchor").attr("id")),
                    scrollPos >= secTopPos - 3 * headerHeight &&
                        scrollPos <= secBot - 3 * headerHeight &&
                        !modalInit &&
                        (currentSection = subnavSection) !== lastSection &&
                        (subnavLinks.removeClass("current"), $('#subnav a[href="#' + subnavSection + '"]').addClass("current"), (lastSection = currentSection)),
                    (($(this).is(".subnav-section:first") && scrollPos < secTopPos - 3 * headerHeight) || ($(this).is(".subnav-section:last") && scrollPos >= contentBot - $("#subnav").outerHeight() - headerHeight && !modalInit)) &&
                        "" !== currentSection &&
                        ((currentSection = ""), subnavLinks.removeClass("current"), (lastSection = currentSection));
            })),
        $("#current-refined-values .ais-current-refined-values--item").length && (scrollPos >= contentOffset - headerHeight ? $("#subnav-wrap").addClass("fixed") : $("#subnav-wrap").removeClass("fixed")),
        isTouchscreen ||
            ($("#home-hero").length &&
                (0 == scrollPos
                    ? ($("#home-hero-image").show().css({ "clip-path": "circle(100% at 50% 50%)", "-webkit-clip-path": "circle(100% at 50% 50%)" }), $("#home-hero-text").css({ transform: "translateY(0)" }))
                    : scrollPos < 0.375 * winHeight
                    ? ((secPercent = 100 - (secPercent = (scrollPos / (0.375 * winHeight)) * 100).toFixed(2)),
                      $("#home-hero-image")
                          .show()
                          .css({ "clip-path": "circle(" + secPercent + "% at 50% 50%)", "-webkit-clip-path": "circle(" + secPercent + "% at 50% 50%)" }),
                      $("#home-hero-text").css({ transform: "translateY(-" + 1.25 * scrollPos + "px)" }))
                    : $("#home-hero-image").hide()),
            $(".full-bleed:has(.hero-image:not(.home-hero-image))").each(function () {
                (secTopPos = $(this).offset().top),
                    (secHeight = $(this).height()),
                    (secBot = secTopPos + secHeight),
                    $body.is('[data-loading="false"]') &&
                        (scrollPos >= secTopPos - winHeight - headerHeight && scrollPos < secBot + headerHeight
                            ? $(this).find(".hero-image").is(".hidden") && $(this).find(".hero-image").removeClass("hidden")
                            : $(this).find(".hero-image").is(".hidden") || $(this).find(".hero-image").addClass("hidden"));
            })),
        isTouchscreen
            ? $(".post-hero, .banner-image").each(function () {
                  $(this).removeClass("fixed-top fixed-bottom");
              })
            : $(".post-hero, .banner-image").each(function () {
                  if (((secTopPos = $(this).offset().top), (secHeight = $(this).height()), (secBot = secTopPos + secHeight), scrollPos >= secTopPos - winHeight && scrollPos < secBot)) {
                      if (
                          (scrollPos >= secTopPos - 1.333 * headerHeight ? $(this).is(".fixed-top") || $(this).addClass("fixed-top") : $(this).is(".fixed-top") && $(this).removeClass("fixed-top"),
                          scrollPos < secBot - winHeight + headerHeight / 3 ? $(this).is(".fixed-bottom") || $(this).addClass("fixed-bottom") : $(this).is(".fixed-bottom") && $(this).removeClass("fixed-bottom"),
                          $(this).is(".banner-image"))
                      )
                          secPercent = ((scrollPos - secTopPos + winHeight - secHeight / 2) / winHeight) * 100;
                      else if (
                          ((secPercent = (scrollPos / (winHeight - 3 * headerHeight)) * 100),
                          $(this)
                              .find(".slide-text")
                              .css({ transform: "translateY(" + scrollPos / 2 + "px)" }),
                          secPercent >= 50)
                      ) {
                          var t = (100 - (scrollPos / (winHeight - 5 * headerHeight)) * 100) / 50;
                          $(this).find(".fade").css({ opacity: t });
                      } else $(this).find(".fade").css({ opacity: 1 });
                      (secPercent = secPercent.toFixed(1) - 100),
                          $(this)
                              .find("img")
                              .show()
                              .css("transform", "translateY(" + secPercent + "px)"),
                          $(this).find(".image-wrap").show();
                  } else $(this).removeClass("fixed-top fixed-bottom"), modalInit || $(this).find("img").hide().css("transform", "translateY(0px)"), modalInit || $(this).find(".image-wrap").hide();
              }),
        $body.is("[data-loaded]") &&
            !isTouchscreen &&
            $("#site-footer").each(function () {
                (secTopPos = $(this).offset().top), (secHeight = $(this).height()), (secBot = secTopPos + secHeight), scrollPos >= secTopPos - winHeight && scrollPos < secBot ? logoAnim.play() : logoAnim.goToAndStop(0);
            }),
        scroll(constant);
}
document.addEventListener("touchstart", constant, { passive: !0 }), document.addEventListener("scroll", constant, { passive: !0 });
var menuOpen = !1;
function openMenu() {
    $panelWrap.is(".show") && closeModal("#panel-modal"), modalInit && closeModal(), $body.addClass("menu-open"), (menuOpen = !0), openModal("#main-menu");
}
function closeMenu() {
    $body.removeClass("menu-open"), (menuOpen = !1), closeModal("#main-menu");
}
const isAbsoluteUrl = (t) => /^[a-z][a-z0-9+.-]*:/.test(t);
var targetAnchor, targetHash, targetOffset, targetPage;
function anchorHook(t) {
    $(t)
        .find("a[href]")
        .each(function () {
            var t = this.href;
            if (t.indexOf("JS-REPLACE-FILENAME") > -1) {
                var e = currentState.split("/").pop();
                (t = t.replace("JS-REPLACE-FILENAME", e)), $(this).attr("href", t);
            }
            isAbsoluteUrl(this.href) && "http" == t.substring(0, 4)
                ? $(this)
                      .off("click")
                      .on("click", function (t) {
                          return openModal("#error-modal"), t.stopPropagation(), !1;
                      })
                : $(this)
                      .off("click")
                      .on("click", function (e) {
                          if ((e.preventDefault(), t.indexOf(".jpg") > -1 || t.indexOf(".jpeg") > -1 || t.indexOf(".png") > -1 || t.indexOf(".gif") > -1)) {
                              if (winWidth < 769 && isTouchscreen) return !1;
                              e.preventDefault(),
                                  (openSlide = $(this).find("img").is("[data-id]")
                                      ? $('#modal-slideshow [data-id="' + $(this).find("img").attr("data-id") + '"]')
                                            .parents(".slide")
                                            .index()
                                      : $('#modal-slideshow [src="' + $(this).attr("href") + '"]')
                                            .parents(".slick-slide")
                                            .index()),
                                  $("#modal-slideshow").attr("data-open-slide", openSlide),
                                  openModal("#slideshow-modal");
                          } else {
                              if ("#" == t) return !1;
                              if (t.indexOf("#") > -1) {
                                  if (
                                      ((targetPage = t.split("#")[0]),
                                      (targetHash = t.split("#")[1]),
                                      (targetAnchor = $("#" + targetHash)),
                                      targetPage.indexOf("?") > -1 && (targetPage = targetPage.split("?")[0]),
                                      currentState.indexOf("?") > -1 && (currentState = currentState.split("?")[0]),
                                      currentState.indexOf("#") > -1 && (currentState = currentState.split("#")[0]),
                                      targetAnchor.is(".modal"))
                                  )
                                      return e.preventDefault(), openModal(targetAnchor), !1;
                                  if ((targetAnchor.length && "" == targetPage) || (targetAnchor.length && null !== targetPage && targetPage == currentState))
                                      return (
                                          e.preventDefault(),
                                          menuOpen && closeMenu(),
                                          closeModal(),
                                          $("#post-toggles").is(".active") &&
                                              $(".toggle-block.open")
                                                  .slideUp(transTime / 2)
                                                  .removeClass("open"),
                                          (targetOffset = Math.ceil(targetAnchor.offset().top)),
                                          (stateData = { path: currentState, scrollTop: targetOffset }),
                                          history.replaceState(stateData, pageName, t),
                                          history.pushState(stateData, pageName, t),
                                          $htmlBody.stop().animate({ scrollTop: targetOffset }, 2 * transTime),
                                          !1
                                      );
                                  targetPage && targetPage !== currentState && (window.location = t);
                              } else window.location = t;
                          }
                      });
        });
}
function closeModal(t) {
    "#main-menu" !== t && (t ? $(t).removeClass("show") : $(".modal").removeClass("show")),
        "#panel-modal" == t && $body.removeClass("panel-open"),
        "#panel-modal" !== t &&
            ((modalInit = !1),
            clearTimeout(setOpen),
            $(".modal.show").length || ($("#content, footer").css({ "-webkit-transform": "none", "-moz-transform": "none", transform: "none" }), $body.removeClass("modal-open"), $document.scrollTop(scrollPos), responsive(!1)));
}
function openModal(t) {
    "#panel-modal" == t
        ? ($body.addClass("panel-open"),
          anchorHook("#panel"),
          positionPanel($panelButton),
          $panel.find(".modal-close").on("click", function () {
              closeModal("#panel-modal");
          }))
        : $panelWrap.is(".show") && closeModal("#panel-modal"),
        "#panel-modal" !== t &&
            ((modalInit = !0),
            "#slideshow-modal" == t ? (initSlideshow($("#modal-slideshow")), $("#modal-slideshow").find(".slick-dots .slick-active button").focus(), responsive(!0)) : "#timer-modal" == t && $header.addClass("opaque"),
            $(".modal.show").length || (scrollPos = $document.scrollTop())),
        "#main-menu" !== t && $(t).addClass("show").attr("data-modal-count", modalCount),
        "#panel-modal" !== t &&
            (setOpen = setTimeout(function () {
                $("#content, footer").css({ "-webkit-transform": "translateY(-" + scrollPos + "px)", "-moz-transform": "translateY(-" + scrollPos + "px)", transform: "translateY(-" + scrollPos + "px)" }),
                    $body.addClass("modal-open"),
                    lazySizes.loader.checkElems(),
                    responsive(!1);
            }, transTime)),
        modalCount++;
}
function accordion() {
    $("dl.accordion").each(function () {
        var t = $(this),
            e = t.find("dt button");
        e.length
            ? (t.find("dd").hide(),
              e.on("click keypress", function (t) {
                  t.preventDefault();
                  var e = $(this).parent("dt");
                  if (e.is(".open"))
                      e.removeClass("open")
                          .next("dd")
                          .slideUp(transTime / 2)
                          .removeClass("open");
                  else {
                      e.addClass("open").next("dd").slideDown(transTime).addClass("open");
                      var i = e.offset().top - 1.5 * headerHeight;
                      $("#section-nav").length && (i -= 2 * $("#section-nav").outerHeight()), $htmlBody.animate({ scrollTop: i }, 2 * transTime);
                  }
              }))
            : t.remove();
    });
}
function loadVideo(t) {
    if (t.length) {
        var e = t.data("video");
        t.is("[data-hd]") && (winHeight > 540 || winWidth > 960) && (e = t.data("hd")), t.append('<source src="' + e + '" type="video/mp4" />'), t.is("[autoplay]") && t.addClass("playing").get(0).play(), t.attr("data-loaded", "true");
    }
}
function initAudio() {
    $("[data-listen]").on("click", function () {
        var t = $(this);
        t.addClass("playing").next("audio")[0].play(),
            t.next("audio").on("ended", function () {
                t.removeClass("playing").parent().focus();
            });
    });
}
function cleanUp() {
    $('iframe[src*="player.vimeo.com"]').each(function () {
        var t = $(this).attr("src");
        t && t.indexOf("?") > -1 && (t = t.split("?")[0]), (t += "?portrait=0&badge=0&byline=0&color=fc9947"), $(this).attr("src", t);
    }),
        $("p, strong, h3, .wrap").each(function () {
            var t = $(this);
            0 == t.html().replace(/\s|&nbsp;/g, "").length && t.remove();
        }),
        $("h2, h3, q, .intro-text p, .link.flexible a")
            .not(".widont")
            .each(function () {
                var t = $(this).html();
                t.split(" ").length > 3 &&
                    $(this)
                        .addClass("widont")
                        .html(t.replace(/\s([^\s<]{0,9})\s*$/, '<span class="nbsp">&nbsp;</span>$1'));
            });
}
function buildModalSlideshow() {
    $("#modal-slideshow").replaceWith('<div class="slideshow fullscreen-slideshow" id="modal-slideshow" data-title="modal slideshow"></div>'),
        $('a[href$=".jpg"],a[href$=".jpeg"],a[href$=".png"],a[href$=".gif"]').each(function () {
            $(this).is('[target="_blank"]') ||
                ($(this).is("[data-image-index]")
                    ? $(this).attr("data-modal-image", "").parents("[data-slide-index]").clone().appendTo("#modal-slideshow")
                    : $('<div class="slide"><div class="slide-wrap"><div class="image-wrap no-ratio"><img class="lazyload" data-src="' + $(this).attr("href") + '" /></div></div></div>').appendTo("#modal-slideshow"));
        }),
        $("#modal-slideshow")
            .find(".slide")
            .addClass("wrap full-wrap flush-top flush-bottom")
            .find(".slide-image")
            .removeClass("slide-image object-cover object-height")
            .find("[data-ratio]")
            .addClass("image-ratio")
            .find("a[data-modal-image]")
            .removeAttr("href")
            .find("img")
            .addClass("lazyload")
            .removeClass("lazyloaded");
}
var slideSpeed,
    lazyMethod = "progressive",
    slideFade,
    centerStyle,
    openSlide,
    videoURL,
    streamURL,
    videoID,
    videoStartTime,
    player;
function initSlideshow(t) {
    (t.is("#modal-slideshow") && !0 !== modalInit) ||
        t.is(".single-image") ||
        (t.is(".slick-initialized") ||
            ((centerStyle = !0),
            (slideSpeed = 8 * transTime),
            (slideFade = !isTouchscreen),
            (openSlide = t.is("[data-open-slide]") ? parseInt(t.attr("data-open-slide")) : 0),
            t.is(".post-carousel")
                ? isTouchscreen ||
                  ((centerStyle = !1),
                  t.slick({
                      dots: !1,
                      autoplaySpeed: slideSpeed,
                      pauseOnHover: !1,
                      infinite: centerStyle,
                      speed: transTime,
                      autoplay: !1,
                      fade: !1,
                      cssEase: "linear",
                      centerMode: centerStyle,
                      arrows: !0,
                      prevArrow: t.next(".slick-prev"),
                      nextArrow: t.next(".slick-prev").next(".slick-next"),
                      lazyLoad: lazyMethod,
                      focusOnSelect: !1,
                      rows: 0,
                      slidesToShow: 4,
                      initialSlide: openSlide,
                      swipeToSlide: !1,
                      draggable: !1,
                      responsive: [
                          { breakpoint: 1025, settings: { slidesToShow: 3 } },
                          { breakpoint: 769, settings: { slidesToShow: 2 } },
                          { breakpoint: 450, settings: { slidesToShow: 1 } },
                      ],
                  }),
                  winWidth >= 1025
                      ? t.slick("slickSetOption", "slidesToScroll", 4, !0)
                      : winWidth >= 769
                      ? t.slick("slickSetOption", "slidesToScroll", 3, !0)
                      : winWidth >= 450
                      ? t.slick("slickSetOption", "slidesToScroll", 2, !0)
                      : t.slick("slickSetOption", "slidesToScroll", 1, !0),
                  responsive(!1))
                : t.is(".large-carousel")
                ? ((centerStyle = !1),
                  t.slick({
                      dots: !1,
                      autoplaySpeed: slideSpeed,
                      pauseOnHover: !1,
                      infinite: centerStyle,
                      speed: transTime,
                      autoplay: !1,
                      fade: !1,
                      cssEase: "linear",
                      centerMode: centerStyle,
                      arrows: !0,
                      prevArrow: t.next(".slick-prev"),
                      nextArrow: t.next(".slick-prev").next(".slick-next"),
                      lazyLoad: lazyMethod,
                      focusOnSelect: !1,
                      rows: 0,
                      slidesToShow: 2,
                      initialSlide: openSlide,
                      swipeToSlide: !0,
                      draggable: !0,
                      responsive: [{ breakpoint: marginShift, settings: { slidesToShow: 1 } }],
                  }),
                  winWidth >= marginShift ? t.slick("slickSetOption", "slidesToScroll", 2, !0) : t.slick("slickSetOption", "slidesToScroll", 1, !0),
                  responsive(!1))
                : (t.parent(".fullscreen:not(.modal)").length &&
                      t.on("init", function () {
                          iOSbrowser || balanceText.updateWatched(),
                              t.on("click swipe", function () {
                                  $htmlBody.stop().animate({ scrollTop: $(this).offset().top - headerHeight }, transTime);
                              });
                      }),
                  t.is(".feature-slideshow") &&
                      !iOSbrowser &&
                      t.on("init", function () {
                          iOSbrowser || balanceText.updateWatched();
                      }),
                  t
                      .slick({
                          dots: !0,
                          autoplaySpeed: slideSpeed,
                          pauseOnHover: !1,
                          infinite: !0,
                          speed: transTime,
                          autoplay: !1,
                          fade: slideFade,
                          cssEase: "linear",
                          arrows: !0,
                          prevArrow: t.next(".slick-prev"),
                          nextArrow: t.next(".slick-prev").next(".slick-next"),
                          lazyLoad: lazyMethod,
                          focusOnSelect: !0,
                          initialSlide: openSlide,
                          adaptiveHeight: !1,
                          rows: 0,
                      })
                      .on("beforeChange", function (t, e, i, s) {
                          $(this)
                              .find('.slick-slide:not([data-slick-index="' + i + '"]):not([data-slick-index="' + s + '"]) .slide-image')
                              .addClass("hidden"),
                              $(this)
                                  .find('[data-slick-index="' + s + '"] .slide-image.hidden')
                                  .removeClass("hidden");
                      }),
                  responsive(!1))),
        t.is("[data-open-slide]") && t.slick("slickGoTo", parseInt(t.attr("data-open-slide")), !0),
        !isTouchscreen && t.next(".slick-prev").length && (t.next(".slick-prev").appendTo(t), t.next(".slick-next").appendTo(t)));
}
function processYouTube(t, e) {
    t
        ? ($("#" + e)
              .attr("data-player", "youtube")
              .attr("data-videoID", t),
          $("#" + e).next("[get-thumbnail]").length &&
              (console.log("processyoutube()", t),
              $("#" + e)
                  .next()
                  .html('<img src="//i2.ytimg.com/vi/' + t + '/hqdefault.jpg" alt="video thumbnail" />')))
        : $("#" + e).css("background-image", "none");
}
function setupThumb(t, e) {
    var i;
    return (
        t.indexOf("t=") > -1 ? ((videoStartTime = t.split("t=")[1].split("&")[0]), $("#" + e).attr("data-start-time", videoStartTime)) : $("#" + e).attr("data-start-time", "0"),
        t.indexOf("youtube.com") > -1
            ? processYouTube((i = t.split("v=")[1].split("&")[0].split("?")[0]), e)
            : t.indexOf("youtu.be") > -1
            ? processYouTube((i = t.split("youtu.be/")[1].split("?")[0]), e)
            : void (t.indexOf("vimeo.com") > -1
                  ? (t.match(/https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/)
                        ? (i = t.split("/")[3])
                        : t.match(/^vimeo.com\/channels\/[\d\w]+#[0-9]+/)
                        ? (i = t.split("#")[1])
                        : t.match(/vimeo.com\/groups\/[\d\w]+\/videos\/[0-9]+/)
                        ? (i = t.split("/")[4])
                        : $("#" + e).css("background-image", "none"),
                    $("#" + e)
                        .attr("data-player", "vimeo")
                        .attr("data-videoID", i),
                    $("#" + e).next("[get-thumbnail]").length &&
                        (console.log("vimeo needs thumbnail", i),
                        $.getJSON("//www.vimeo.com/api/v2/video/" + i + ".json?callback=?", { format: "json" }, function (t) {
                            console.log("getJSON vimeo", i),
                                $("#" + e)
                                    .next()
                                    .html('<img src="' + t[0].thumbnail_large + '" alt="video thumbnail" />');
                        }).fail(function () {
                            console.log("getJSON vimeo fail", i),
                                $.getJSON("//vimeo.com/api/oembed.json?url=" + t, function (t) {
                                    console.log("getJSON vimeo fallback", i),
                                        $("#" + e)
                                            .next()
                                            .html('<img src="' + t.thumbnail_url + '" alt="video thumbnail" />');
                                });
                        })))
                  : $("#" + e).css("background-image", "none"))
    );
}
function playVideo(t, e, i, s) {
    var r = "";
    if ("vimeo" == i) (r = "https://player.vimeo.com/video/" + e + "?autoplay=1&byline=0&color=c81a17&title=0&portrait=0"), t.addClass("playing");
    else {
        if ("youtube" != i) return !1;
        (r = "https://www.youtube.com/embed/" + e + "?rel=0&amp;showinfo=0&amp;autoplay=true&amp;start=" + s), t.addClass("playing");
    }
    t.find("iframe").length || (t.css("background-image", "none").append('<iframe width="640" height="360" src="' + r + '" frameborder="0" allowfullscreen></iframe>'), t.fitVids());
}
function initialize(t) {
    var e, i, s, r;
    (($fullbleedHero = $("#content > .full-bleed:first-child")).length && $header.removeClass("opaque"),
    responsive(!1),
    accordion(),
    initAudio(),
    cleanUp(),
    $(".toggle-section a, #related-posts, .posts-layout, .media-layout").remove(),
    $(".image-credit a").each(function () {
        $(this).replaceWith($(this).text());
    }),
    anchorHook("body"),
    $("[data-src]:not(.lazyload)")
        .addClass("lazyload")
        .each(function () {
            $(this).is("[data-srcset]") && $(this).attr("data-sizes", "auto");
        }),
    lazySizes.loader.checkElems(),
    $("#subnav").length
        ? ($body.addClass("has-subnav"),
          (subnavLinks = $("#subnav").find("a")).each(function () {
              (subnavID = $(this).attr("href")), $(subnavID).length ? $(subnavID).parent().data("id", subnavID).addClass("subnav-section") : $(this).remove();
          }))
        : $body.removeClass("has-subnav"),
    $("#home-hero").length &&
        ($("#home-hero").on("click", function () {
            $htmlBody.animate({ scrollTop: 0.375 * winHeight + 2 * headerHeight + $("#home-intro").outerHeight() / 2 }, 3 * transTime);
        }),
        $("#question-ends").length && ends.length && $("#question-ends").typed({ strings: ends, typeSpeed: 50, startDelay: 3e3, backDelay: 1e3, backSpeed: 10, loop: !0 })),
    $(".details").hide(),
    $(".details-button").on("click", function () {
        $(this).is(".open")
            ? $(this)
                  .removeClass("open")
                  .parent(".title-wrap")
                  .next(".details")
                  .slideUp(transTime / 2)
                  .removeClass("open")
            : $(this).addClass("open").parent(".title-wrap").next(".details").slideDown(transTime).addClass("open");
    }),
    $(".video-wrap").length) &&
        $(".video-wrap").each(function () {
            $(this)
                .find(".play-toggle")
                .on("click", function () {
                    $(this).siblings("video").length
                        ? ((r = $(this).siblings("video").get(0)),
                          $(this).siblings(".poster").length && $(this).siblings(".poster").fadeOut(transTime),
                          $(this).parents(".video-wrap").is(".playing.paused")
                              ? ($(this).parents(".video-wrap").removeClass("paused"), r.play())
                              : ($(".video-wrap.playing").length && $(".video-wrap.playing").removeClass("playing paused").children("video").get(0).pause(),
                                $(this).parents(".video-wrap").removeClass("paused").addClass("playing"),
                                r.play()),
                          $(this)
                              .siblings("video")
                              .on("click", function () {
                                  $(this).parents(".video-wrap").addClass("paused"), r.pause();
                              }),
                          $(this)
                              .siblings(".view-full")
                              .on("click", function () {
                                  screenfull.enabled && screenfull.toggle(r);
                              }),
                          $(this)
                              .siblings("video")
                              .on("ended", function () {
                                  $(this).parents(".video-wrap").addClass("paused"),
                                      $(this).siblings(".poster").length && $(this).siblings(".poster").fadeIn(transTime),
                                      setTimeout(function () {
                                          $(this).parents(".video-wrap").removeClass("playing paused");
                                      }, 2 * transTime);
                              }))
                        : ((e = $(this).parents(".video-wrap")),
                          (i = $(this).attr("data-videoID")),
                          (s = $(this).attr("data-player")),
                          (videoStartTime = $(this).attr("data-start-time")),
                          playVideo(e, i, s, videoStartTime),
                          e.addClass("playing"),
                          $(this).siblings(".poster").length && $(this).siblings(".poster").fadeOut(transTime));
                });
        });
    $("#post-toggles").length &&
        ($(".toggle-block").hide(),
        $("#post-toggles button:not(.help-button)").each(function () {
            var t = $(this).attr("id").split("-")[1],
                e = $("#post-" + t);
            e.length || $(this).hide(),
                $(this).on("click", function () {
                    var t = $(this);
                    $panelWrap.is(".show") && closeModal("#panel-modal"),
                        t.hasClass("open")
                            ? (t.removeClass("open"), e.slideUp(transTime / 2).removeClass("open"), $("#post-toggles").removeClass("active"))
                            : $("#post-toggles").is(".active")
                            ? ($(".toggle-block.open")
                                  .slideUp(transTime / 2)
                                  .removeClass("open"),
                              setTimeout(function () {
                                  $("#post-toggles button").removeClass("open"), t.addClass("open"), e.slideDown(transTime).addClass("open"), $htmlBody.animate({ scrollTop: t.offset().top - headerHeight + 1 }, transTime), responsive(!0);
                              }, transTime / 2))
                            : (t.addClass("open"), $("#post-toggles").addClass("active"), $htmlBody.animate({ scrollTop: t.offset().top - headerHeight + 1 }, transTime), e.slideDown(transTime).addClass("open"), responsive(!0));
                });
        }),
        $(".post-hero, .post-content, .search-panel, .search-results").on("click", function () {
            $(".toggle-block")
                .slideUp(transTime / 2)
                .removeClass("open"),
                $("#post-toggles button").removeClass("open"),
                $("#post-toggles").removeClass("active");
        })),
        $("[data-videoURL]").length &&
            $("[data-videoURL]").each(function () {
                (videoURL = $(this).attr("data-videoURL")), (i = $(this).attr("id")), setupThumb(videoURL, i), $(this).removeAttr("data-videoURL");
            }),
        $("[data-term]").each(function () {
            ($(this).parent("a").length || $(this).parent("[data-exclusion]").length) && $(this).replaceWith($(this).text());
        }),
        isTouchscreen && $(".post-carousel").prepend('<div class="scrim"></div>').append('<div class="scrim"></div>'),
        $body.attr("data-loading", "false"),
        $("#content, footer").fadeIn(transTime / 2),
        iOSbrowser || balanceText($(".balance-text"), { watch: !0 }),
        iOSbrowser && $(".balance-text").not("[style]").attr("style", "opacity: 1"),
        $(".wrap").fitVids(),
        objectFitImages(),
        buildModalSlideshow(),
        $(".slideshow").each(function () {
            initSlideshow($(this));
        }),
        $(".image-credit-icon").on("click", function () {
            $(this).prev(".image-credit").toggleClass("show");
        }),
        $(".modal-close").on("click", function () {
            closeModal($(this).parents(".modal"));
        }),
        $("*:not(input):not(select):not(textarea)").on("click touchend", function () {
            $(this).blur();
        }),
        responsive(!0),
        isPopState
            ? ($htmlBody.scrollTop(pageScrollPos), (scrollPos = pageScrollPos - 1))
            : t &&
              t.indexOf("#") > -1 &&
              ((targetHash = window.location.hash) || (targetHash = "#" + t.split("#")[1]),
              targetHash.indexOf("?") > -1 && (targetHash = targetHash.split("?")[0]),
              (targetAnchor = $(targetHash)),
              $(targetHash).length && $htmlBody.scrollTop(targetAnchor.offset().top));
}
var pageName = $("#content").attr("data-pagename"),
    stateData,
    attempts = 0,
    isPopState = !1,
    currentState = window.location.href,
    resizeTimer;
jQuery(document).ready(function ($) {
    iOSbrowser && ((isTouchscreen = !0), $("html").attr("data-touch-events", "").attr("data-ios-browser", "")),
        (stateData = { path: currentState, scrollTop: targetOffset }),
        history.replaceState(stateData, pageName, currentState),
        responsive(!1),
        $("#menu-button").on("click", function () {
            menuOpen ? closeMenu() : openMenu();
        }),
        $("#logo").on("click", function () {
            if ((menuOpen && closeMenu(), modalInit && closeModal(), $("#home-hero").length)) return $htmlBody.animate({ scrollTop: 0 }, 2 * transTime), !1;
        }),
        $("#content").on("click", function () {
            menuOpen && $("#menu-button").trigger("click");
        }),
        $("#logo-animation").hover(
            function () {
                $body.is("[data-loaded]") && logoAnim.play();
            },
            function () {
                $body.is("[data-loaded]") && logoAnim.goToAndStop(0);
            }
        ),
        $("#timer-modal").length &&
            !Cookies.get("timer-modal") &&
            (setTimeout(function () {
                openModal("#timer-modal"), $(".admin-edit").length || Cookies.set("timer-modal", "seen", { expires: 30 });
            }, 1e3 * $("#timer-modal").data("timeout")),
            $("#timer-modal form").submit(function (t) {
                t.preventDefault(), $('#timer-modal [type="submit"]').val("Sending...").attr("disabled", "true");
                var e = $("#timer-modal form").serialize();
                $.ajax({ type: "POST", url: $("#timer-modal form").attr("action"), data: e })
                    .done(function () {
                        $('#timer-modal [type="submit"]').replaceWith("<p>Submission sent. Thank you!</p>"),
                            setTimeout(function () {
                                closeModal("#timer-modal");
                            }, 1e3);
                    })
                    .fail(function (t) {
                        $('#timer-modal [type="submit"]').val("Please Try Again").removeAttr("disabled");
                    });
            })),
        (window.onkeydown = function (t) {
            if (27 == t.keyCode)
                if ($(".modal.show").length) {
                    var e = 1;
                    $(".modal.show").each(function () {
                        $(this).attr("data-modal-count") > e && (e = $(this).attr("data-modal-count"));
                    });
                    var i = $('[data-modal-count="' + e + '"]').attr("id");
                    i ? (closeModal("#" + i), "error-modal" == i && ($("#content, footer").fadeIn(transTime), $body.attr("data-loading", "false"))) : closeModal();
                } else
                    $(".toggle-block.open").length
                        ? $("#post-content").trigger("click")
                        : menuOpen
                        ? closeMenu()
                        : $("div[data-help].show").length && $('.help-button[data-help="' + $("div[data-help].show").attr("data-help") + '"]').trigger("click");
        }),
        initialize(currentState);
}),
    window.addEventListener("resize", function () {
        document.body.classList.add("pause-animations"),
            clearTimeout(resizeTimer),
            (resizeTimer = setTimeout(function () {
                document.body.classList.remove("pause-animations"), isTouchscreen && $window.width() !== winWidth ? responsive(!0) : isTouchscreen || responsive(!0);
            }, transTime / 2));
    }),
    window.addEventListener("orientationchange", function () {
        responsive(!0);
    }),
    window.addEventListener("touchstart", function () {
        $("html").attr("data-touch-events", ""), (isTouchscreen = !0), console.log("touch detected");
    }),
    $window.bind("load", function () {
        "undefined" != typeof lottie && (logoAnim = lottie.loadAnimation({ wrapper: footerLogo, animType: "svg", loop: !1, autoplay: !1, preserveAspectRatio: "xMidYMid meet", animationData: animation_data })), $body.attr("data-loaded", "");
    });
