import { $n as e, Gt as t, Hr as n, Mt as r, On as i, Qn as a, Qr as o, Vr as s, Vt as c, Wn as l, Zn as u, ai as d, an as f, bt as p, f as m, fr as h, hn as g, ii as _, in as v, it as y, mn as b, nn as x, on as S, ot as C, p as w, pr as T, vt as E } from "../../chunks/index-client-BHp3UA-q.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as D } from "../../chunks/Icon-CzS4be53.js";
import { a as O } from "../../chunks/index-client-Bl3KzSLq.js";
import { t as k } from "../../chunks/utils-CRERhYYg.js";
//#region ../ui/src/lib/components/nav/nav-link.svelte
var A = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"variant",
	"activePath"
]), j = S("<a><!></a>");
function M(e, t) {
	n(t, !0);
	let a = m(t, "variant", 3, "default"), c = w(t, A), l = T(() => t.href != null && t.href === t.activePath);
	var f = j();
	y(f, (e) => ({
		...c,
		"data-active": i(l),
		class: e
	}), [() => k("font-medium", "flex items-center gap-4 rounded-xl px-4 py-2", {
		"hover:bg-dark-700": a() === "default",
		" bg-primary/15 text-primary shadow-sm hover:bg-dark-700 not-[data-active]:hover:bg-dark-600": a() === "default" && i(l),
		"text-primary-50 hover:bg-dark-800 not-[data-active]:hover:bg-transparent": a() === "sidebar" && i(l)
	}, t.class)]), r(u(f), () => t.children ?? d), o(f), v(e, f), s();
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
]), P = S("<!> ", 1), F = S("<button type=\"button\"><!></button>"), I = S("<button type=\"button\"><!> <!></button>"), L = S("<li><!></li>"), R = S("<ul class=\"mt-1 flex flex-col gap-1\"></ul>"), z = S("<!> <!>", 1), B = S("<div class=\"flex flex-col gap-1\"><!></div>"), V = S("<nav><!></nav>");
function H(m, b) {
	n(b, !0);
	let S = (n, r = d, o) => {
		let s = h(() => _(o?.(), !1));
		var c = P(), u = a(c), f = (e) => {
			D(e, {
				get icon() {
					return r().icon;
				},
				width: 22
			});
		};
		t(u, (e) => {
			i(s) && r().icon && e(f);
		});
		var p = e(u);
		l((e) => x(p, ` ${e ?? ""}`), [() => K(r())]), v(n, c);
	}, A = (e, n = d, r = d, s) => {
		let c = h(() => _(s?.(), !1));
		var m = f(), y = a(m), x = (e) => {
			var t = F();
			S(u(t), n, () => i(c)), o(t), l((e) => E(t, 1, e), [() => p(k("flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-2 text-left font-medium hover:bg-dark-600", r()))]), g("click", t, function(...e) {
				n().onClick?.apply(this, e);
			}), v(e, t);
		}, C = (e) => {
			{
				let t = T(() => k("flex", r()));
				M(e, {
					get href() {
						return n().path;
					},
					get class() {
						return i(t);
					},
					get activePath() {
						return b.activePath;
					},
					children: (e, t) => {
						S(e, n, () => i(c));
					},
					$$slots: { default: !0 }
				});
			}
		};
		t(y, (e) => {
			n().onClick ? e(x) : e(C, -1);
		}), v(e, m);
	}, j = (t, n = d) => {
		var r = I(), a = u(r);
		S(a, n, () => !0);
		var s = e(a, 2);
		{
			let e = T(() => k("ms-auto transition-transform", J(n()) && "rotate-180"));
			D(s, {
				icon: "gg:chevron-down",
				get class() {
					return i(e);
				}
			});
		}
		o(r), l((e, t) => {
			C(r, "aria-expanded", e), E(r, 1, t);
		}, [() => J(n()), () => p(k("flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-2 text-left font-medium hover:bg-dark-700", q(n()) && "bg-dark-600"))]), g("click", r, () => Y(n().path)), v(t, r);
	}, H = (e, t = d) => {
		var n = L();
		A(u(n), t, () => "ps-14 font-normal hover:bg-dark-700 data-[active=true]:bg-dark-700"), o(n), v(e, n);
	}, U = (n, r = d) => {
		var s = B(), l = u(s), f = (n) => {
			var s = z(), l = a(s);
			j(l, r);
			var u = e(l, 2), d = (e) => {
				var t = R();
				c(t, 21, () => r().children, (e) => e.path, (e, t) => {
					H(e, () => i(t));
				}), o(t), v(e, t);
			}, f = T(() => J(r()));
			t(u, (e) => {
				i(f) && e(d);
			}), v(n, s);
		}, p = (e) => {
			A(e, r, () => void 0, () => !0);
		};
		t(l, (e) => {
			r().children?.length ? e(f) : e(p, -1);
		}), o(s), v(n, s);
	}, W = w(b, N), G = new O();
	function K(e) {
		return e.title ? b.translateTitle?.(e.title) ?? e.title : "";
	}
	function q(e) {
		return e.children?.some((e) => e.path === b.activePath) ?? !1;
	}
	function J(e) {
		return G.has(e.path) || q(e);
	}
	function Y(e) {
		G.has(e) ? G.delete(e) : G.add(e);
	}
	var X = V();
	y(X, (e) => ({
		...W,
		class: e
	}), [() => k("flex flex-col gap-1", b.class)]);
	var Z = u(X), Q = (e) => {
		var t = f();
		r(a(t), () => b.children, () => ({ items: b.items })), v(e, t);
	}, $ = (e) => {
		var t = f();
		c(a(t), 17, () => b.items, (e) => e.path, (e, t) => {
			U(e, () => i(t));
		}), v(e, t);
	};
	t(Z, (e) => {
		b.children ? e(Q) : e($, -1);
	}), o(X), v(m, X), s();
}
b(["click"]);
//#endregion
export { M as Link, H as Root };
