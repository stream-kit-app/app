import { $ as e, $n as t, Dt as n, Hr as r, On as i, Qn as a, Qr as o, Qt as s, Vr as c, Wn as l, Z as u, Zn as d, a as f, cn as p, dt as m, fr as h, jt as g, ln as _, ni as v, o as y, on as b, pr as x, pt as S, ti as C, un as w, vn as T, yn as E } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as D } from "../../chunks/Icon-AeqJGRQj.js";
import { a as O } from "../../chunks/index-client-DLfVeyOI.js";
import { t as k } from "../../chunks/utils-DJt177zd.js";
//#region ../ui/src/lib/components/nav/nav-link.svelte
var A = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"variant",
	"activePath"
]), j = w("<a><!></a>");
function M(e, t) {
	r(t, !0);
	let n = f(t, "variant", 3, "default"), a = y(t, A), l = x(() => t.href != null && t.href === t.activePath);
	var m = j();
	u(m, (e) => ({
		...a,
		"data-active": i(l),
		class: e
	}), [() => k("font-medium", "flex items-center gap-4 rounded-xl px-4 py-2", {
		"hover:bg-dark-700": n() === "default",
		" bg-primary/15 text-primary shadow-sm hover:bg-dark-700 not-[data-active]:hover:bg-dark-600": n() === "default" && i(l),
		"text-primary-50 hover:bg-dark-800 not-[data-active]:hover:bg-transparent": n() === "sidebar" && i(l)
	}, t.class)]), s(d(m), () => t.children ?? v), o(m), p(e, m), c();
}
//#endregion
//#region ../ui/src/lib/components/nav/nav.svelte
var N = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"items",
	"activePath",
	"translateTitle",
	"children"
]), P = w("<!> ", 1), F = w("<button type=\"button\"><!></button>"), I = w("<button type=\"button\"><!> <!></button>"), L = w("<li><!></li>"), R = w("<ul class=\"mt-1 flex flex-col gap-1\"></ul>"), z = w("<!> <!>", 1), B = w("<div class=\"flex flex-col gap-1\"><!></div>"), V = w("<nav><!></nav>");
function H(f, w) {
	r(w, !0);
	let T = (e, n = v, r) => {
		let o = h(() => C(r?.(), !1));
		var s = P(), c = a(s), u = (e) => {
			D(e, {
				get icon() {
					return n().icon;
				},
				width: 22
			});
		};
		g(c, (e) => {
			i(o) && n().icon && e(u);
		});
		var d = t(c);
		l((e) => b(d, ` ${e ?? ""}`), [() => K(n())]), p(e, s);
	}, A = (e, t = v, n = v, r) => {
		let s = h(() => C(r?.(), !1));
		var c = _(), u = a(c), f = (e) => {
			var r = F();
			T(d(r), t, () => i(s)), o(r), l((e) => m(r, 1, e), [() => S(k("flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-2 text-left font-medium hover:bg-dark-600", n()))]), E("click", r, function(...e) {
				t().onClick?.apply(this, e);
			}), p(e, r);
		}, y = (e) => {
			{
				let r = x(() => k("flex", n()));
				M(e, {
					get href() {
						return t().path;
					},
					get class() {
						return i(r);
					},
					get activePath() {
						return w.activePath;
					},
					children: (e, n) => {
						T(e, t, () => i(s));
					},
					$$slots: { default: !0 }
				});
			}
		};
		g(u, (e) => {
			t().onClick ? e(f) : e(y, -1);
		}), p(e, c);
	}, j = (n, r = v) => {
		var a = I(), s = d(a);
		T(s, r, () => !0);
		var c = t(s, 2);
		{
			let e = x(() => k("ms-auto transition-transform", J(r()) && "rotate-180"));
			D(c, {
				icon: "gg:chevron-down",
				get class() {
					return i(e);
				}
			});
		}
		o(a), l((t, n) => {
			e(a, "aria-expanded", t), m(a, 1, n);
		}, [() => J(r()), () => S(k("flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-2 text-left font-medium hover:bg-dark-700", q(r()) && "bg-dark-600"))]), E("click", a, () => Y(r().path)), p(n, a);
	}, H = (e, t = v) => {
		var n = L();
		A(d(n), t, () => "ps-14 font-normal hover:bg-dark-700 data-[active=true]:bg-dark-700"), o(n), p(e, n);
	}, U = (e, r = v) => {
		var s = B(), c = d(s), l = (e) => {
			var s = z(), c = a(s);
			j(c, r);
			var l = t(c, 2), u = (e) => {
				var t = R();
				n(t, 21, () => r().children, (e) => e.path, (e, t) => {
					H(e, () => i(t));
				}), o(t), p(e, t);
			}, d = x(() => J(r()));
			g(l, (e) => {
				i(d) && e(u);
			}), p(e, s);
		}, u = (e) => {
			A(e, r, () => void 0, () => !0);
		};
		g(c, (e) => {
			r().children?.length ? e(l) : e(u, -1);
		}), o(s), p(e, s);
	}, W = y(w, N), G = new O();
	function K(e) {
		return e.title ? w.translateTitle?.(e.title) ?? e.title : "";
	}
	function q(e) {
		return e.children?.some((e) => e.path === w.activePath) ?? !1;
	}
	function J(e) {
		return G.has(e.path) || q(e);
	}
	function Y(e) {
		G.has(e) ? G.delete(e) : G.add(e);
	}
	var X = V();
	u(X, (e) => ({
		...W,
		class: e
	}), [() => k("flex flex-col gap-1", w.class)]);
	var Z = d(X), Q = (e) => {
		var t = _();
		s(a(t), () => w.children, () => ({ items: w.items })), p(e, t);
	}, $ = (e) => {
		var t = _();
		n(a(t), 17, () => w.items, (e) => e.path, (e, t) => {
			U(e, () => i(t));
		}), p(e, t);
	};
	g(Z, (e) => {
		w.children ? e(Q) : e($, -1);
	}), o(X), p(f, X), c();
}
T(["click"]);
//#endregion
export { M as Link, H as Root };
