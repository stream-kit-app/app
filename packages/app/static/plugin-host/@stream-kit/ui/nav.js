import { An as e, Bn as t, Ct as n, Dr as r, Er as i, Hr as a, Lt as o, Sn as s, Ur as c, Vt as l, bn as u, cr as d, ct as f, hn as p, ii as m, jn as h, lr as g, nr as _, o as v, ot as y, ri as b, sn as x, sr as S, ti as C, ur as w, xn as T, xt as E } from "../../chunks/client-BFeMv2Ma.js";
import { a as D, r as O, t as k } from "../../chunks/utils-Dqp4W1j8.js";
import "../../chunks/disclose-version-CI8I6yeK.js";
import { t as A } from "../../chunks/Icon-Ct61sPxO.js";
import { a as ee } from "../../chunks/index-client-DI7sx7Sj.js";
//#region ../ui/src/lib/components/nav/nav-link.svelte
var j = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"activePath"
]), M = s("<a><!></a>");
function N(e, n) {
	c(n, !0);
	let i = v(n, j), o = r(() => n.href != null && n.href === n.activePath);
	var s = M();
	y(s, (e) => ({
		...i,
		"data-active": t(o),
		class: e
	}), [() => k("relative flex items-center gap-2.5 px-3 py-1.5 text-sm font-medium text-dark-200", O, D, t(o) && "bg-item-active text-item-active-foreground", n.class)]);
	var l = S(s);
	x(l, () => n.children ?? m), C(s), u(e, s), a();
}
//#endregion
//#region ../ui/src/lib/components/nav/nav.svelte
var P = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"items",
	"activePath",
	"translateTitle",
	"children"
]), F = s("<!> <span class=\"truncate\"> </span>", 1), I = s("<button type=\"button\"><!></button>"), L = s("<button type=\"button\"><!> <!></button>"), R = s("<li><!></li>"), z = s("<div class=\"px-3 pt-3 pb-1 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase\" role=\"presentation\"> </div>"), B = s("<ul class=\"mt-0.5 flex flex-col gap-0.5\"></ul>"), V = s("<!> <!>", 1), H = s("<div class=\"flex flex-col gap-0.5\"><!></div>"), U = s("<nav><!></nav>");
function W(e, s) {
	c(s, !0);
	let j = (e, n = m, r) => {
		let a = i(() => b(r?.(), !1));
		var o = F(), s = d(o), c = (e) => {
			A(e, {
				get icon() {
					return n().icon;
				},
				width: 18,
				class: "shrink-0 text-current"
			});
		};
		l(s, (e) => {
			t(a) && n().icon && e(c);
		});
		var f = w(s, 2), h = g(f, !0);
		_((e) => p(h, e), [() => X(n())]), u(e, o);
	}, M = (e, a = m, o = m, c) => {
		let f = i(() => b(c?.(), !1));
		var p = T(), g = d(p), v = (e) => {
			var r = I(), i = S(r);
			j(i, a, () => t(f)), C(r), _((e) => E(r, 1, e), [() => n(k("relative flex w-full cursor-pointer items-center gap-2.5 px-3 py-1.5 text-left text-sm font-medium text-dark-200", O, D, o()))]), h("click", r, function(...e) {
				a().onClick?.apply(this, e);
			}), u(e, r);
		}, y = (e) => {
			{
				let n = r(() => k("flex", o()));
				N(e, {
					get href() {
						return a().path;
					},
					get class() {
						return t(n);
					},
					get activePath() {
						return s.activePath;
					},
					children: (e, n) => {
						j(e, a, () => t(f));
					},
					$$slots: { default: !0 }
				});
			}
		};
		l(g, (e) => {
			a().onClick ? e(v) : e(y, -1);
		}), u(e, p);
	}, W = (e, i = m) => {
		var a = L(), o = S(a);
		j(o, i, () => !0);
		var s = w(o, 2);
		{
			let e = r(() => k("ms-auto shrink-0 transition-transform", Q(i()) && "rotate-180"));
			A(s, {
				icon: "ri:arrow-down-s-line",
				get class() {
					return t(e);
				}
			});
		}
		C(a), _((e, t) => {
			f(a, "aria-expanded", e), E(a, 1, t);
		}, [() => Q(i()), () => n(k("relative flex w-full cursor-pointer items-center gap-2.5 px-3 py-1.5 text-left text-sm font-medium text-dark-200", O, D, Z(i()) && "bg-item-active text-item-active-foreground"))]), h("click", a, () => te(i().path)), u(e, a);
	}, G = (e, t = m) => {
		var n = R(), r = S(n);
		M(r, t, () => "ps-10 font-normal"), C(n), u(e, n);
	}, K = (e, t = m) => {
		var n = z(), r = g(n, !0);
		_((e) => p(r, e), [() => X(t())]), u(e, n);
	}, q = (e, n = m) => {
		var i = T(), a = d(i), s = (e) => {
			K(e, n);
		}, c = (e) => {
			var i = H(), a = S(i), s = (e) => {
				var i = V(), a = d(i);
				W(a, n);
				var s = w(a, 2), c = (e) => {
					var r = B();
					o(r, 21, () => n().children, (e) => e.path, (e, n) => {
						G(e, () => t(n));
					}), C(r), u(e, r);
				}, f = r(() => Q(n()));
				l(s, (e) => {
					t(f) && e(c);
				}), u(e, i);
			}, c = (e) => {
				M(e, n, () => void 0, () => !0);
			};
			l(a, (e) => {
				n().children?.length ? e(s) : e(c, -1);
			}), C(i), u(e, i);
		};
		l(a, (e) => {
			n().kind === "label" ? e(s) : e(c, -1);
		}), u(e, i);
	}, J = v(s, P), Y = new ee();
	function X(e) {
		return e.title ? s.translateTitle?.(e.title) ?? e.title : "";
	}
	function Z(e) {
		return e.children?.some((e) => e.path === s.activePath) ?? !1;
	}
	function Q(e) {
		return Y.has(e.path) || Z(e);
	}
	function te(e) {
		Y.has(e) ? Y.delete(e) : Y.add(e);
	}
	var $ = U();
	y($, (e) => ({
		...J,
		class: e
	}), [() => k("flex flex-col gap-0.5", s.class)]);
	var ne = S($), re = (e) => {
		var t = T(), n = d(t);
		x(n, () => s.children, () => ({ items: s.items })), u(e, t);
	}, ie = (e) => {
		var n = T(), r = d(n);
		o(r, 17, () => s.items, (e) => e.path, (e, n) => {
			q(e, () => t(n));
		}), u(e, n);
	};
	l(ne, (e) => {
		s.children ? e(re) : e(ie, -1);
	}), C($), u(e, $), a();
}
e(["click"]);
//#endregion
export { N as Link, W as Root };
