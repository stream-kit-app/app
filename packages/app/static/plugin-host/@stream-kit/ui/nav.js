import { $n as e, Gt as t, Hr as n, Mt as r, On as i, Qn as a, Qr as o, Vr as s, Vt as c, Wn as l, Zn as u, an as d, bt as f, f as p, fr as m, hn as h, in as g, it as _, mn as v, ni as y, nn as b, on as x, ot as S, p as C, pr as w, ti as T, vt as E } from "../../chunks/index-client-BIJQxc2l.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as D } from "../../chunks/Icon-BoHmh-pv.js";
import { a as O } from "../../chunks/index-client-b6iB98U7.js";
import { t as k } from "../../chunks/utils-DVQ4nj8f.js";
//#region ../ui/src/lib/components/nav/nav-link.svelte
var A = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"variant",
	"activePath"
]), j = x("<a><!></a>");
function M(e, t) {
	n(t, !0);
	let a = p(t, "variant", 3, "default"), c = C(t, A), l = w(() => t.href != null && t.href === t.activePath);
	var d = j();
	_(d, (e) => ({
		...c,
		"data-active": i(l),
		class: e
	}), [() => k("font-medium", "flex items-center gap-4 rounded-xl px-4 py-2", {
		"hover:bg-dark-700": a() === "default",
		" bg-primary/15 text-primary shadow-sm hover:bg-dark-700 not-[data-active]:hover:bg-dark-600": a() === "default" && i(l),
		"text-primary-50 hover:bg-dark-800 not-[data-active]:hover:bg-transparent": a() === "sidebar" && i(l)
	}, t.class)]), r(u(d), () => t.children ?? y), o(d), g(e, d), s();
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
]), P = x("<!> ", 1), F = x("<button type=\"button\"><!></button>"), I = x("<button type=\"button\"><!> <!></button>"), L = x("<li><!></li>"), R = x("<ul class=\"mt-1 flex flex-col gap-1\"></ul>"), z = x("<!> <!>", 1), B = x("<div class=\"flex flex-col gap-1\"><!></div>"), V = x("<nav><!></nav>");
function H(p, v) {
	n(v, !0);
	let x = (n, r = y, o) => {
		let s = m(() => T(o?.(), !1));
		var c = P(), u = a(c), d = (e) => {
			D(e, {
				get icon() {
					return r().icon;
				},
				width: 22
			});
		};
		t(u, (e) => {
			i(s) && r().icon && e(d);
		});
		var f = e(u);
		l((e) => b(f, ` ${e ?? ""}`), [() => K(r())]), g(n, c);
	}, A = (e, n = y, r = y, s) => {
		let c = m(() => T(s?.(), !1));
		var p = d(), _ = a(p), b = (e) => {
			var t = F();
			x(u(t), n, () => i(c)), o(t), l((e) => E(t, 1, e), [() => f(k("flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-2 text-left font-medium hover:bg-dark-600", r()))]), h("click", t, function(...e) {
				n().onClick?.apply(this, e);
			}), g(e, t);
		}, S = (e) => {
			{
				let t = w(() => k("flex", r()));
				M(e, {
					get href() {
						return n().path;
					},
					get class() {
						return i(t);
					},
					get activePath() {
						return v.activePath;
					},
					children: (e, t) => {
						x(e, n, () => i(c));
					},
					$$slots: { default: !0 }
				});
			}
		};
		t(_, (e) => {
			n().onClick ? e(b) : e(S, -1);
		}), g(e, p);
	}, j = (t, n = y) => {
		var r = I(), a = u(r);
		x(a, n, () => !0);
		var s = e(a, 2);
		{
			let e = w(() => k("ms-auto transition-transform", J(n()) && "rotate-180"));
			D(s, {
				icon: "gg:chevron-down",
				get class() {
					return i(e);
				}
			});
		}
		o(r), l((e, t) => {
			S(r, "aria-expanded", e), E(r, 1, t);
		}, [() => J(n()), () => f(k("flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-2 text-left font-medium hover:bg-dark-700", q(n()) && "bg-dark-600"))]), h("click", r, () => Y(n().path)), g(t, r);
	}, H = (e, t = y) => {
		var n = L();
		A(u(n), t, () => "ps-14 font-normal hover:bg-dark-700 data-[active=true]:bg-dark-700"), o(n), g(e, n);
	}, U = (n, r = y) => {
		var s = B(), l = u(s), d = (n) => {
			var s = z(), l = a(s);
			j(l, r);
			var u = e(l, 2), d = (e) => {
				var t = R();
				c(t, 21, () => r().children, (e) => e.path, (e, t) => {
					H(e, () => i(t));
				}), o(t), g(e, t);
			}, f = w(() => J(r()));
			t(u, (e) => {
				i(f) && e(d);
			}), g(n, s);
		}, f = (e) => {
			A(e, r, () => void 0, () => !0);
		};
		t(l, (e) => {
			r().children?.length ? e(d) : e(f, -1);
		}), o(s), g(n, s);
	}, W = C(v, N), G = new O();
	function K(e) {
		return e.title ? v.translateTitle?.(e.title) ?? e.title : "";
	}
	function q(e) {
		return e.children?.some((e) => e.path === v.activePath) ?? !1;
	}
	function J(e) {
		return G.has(e.path) || q(e);
	}
	function Y(e) {
		G.has(e) ? G.delete(e) : G.add(e);
	}
	var X = V();
	_(X, (e) => ({
		...W,
		class: e
	}), [() => k("flex flex-col gap-1", v.class)]);
	var Z = u(X), Q = (e) => {
		var t = d();
		r(a(t), () => v.children, () => ({ items: v.items })), g(e, t);
	}, $ = (e) => {
		var t = d();
		c(a(t), 17, () => v.items, (e) => e.path, (e, t) => {
			U(e, () => i(t));
		}), g(e, t);
	};
	t(Z, (e) => {
		v.children ? e(Q) : e($, -1);
	}), o(X), g(p, X), s();
}
v(["click"]);
//#endregion
export { M as Link, H as Root };
