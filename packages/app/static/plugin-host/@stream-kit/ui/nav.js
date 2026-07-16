import { $ as e, $n as t, Dt as n, Hr as r, On as i, Qn as a, Qr as o, Qt as s, Vr as c, Wn as l, Z as u, Zn as d, cn as f, dt as p, fr as m, jt as h, ln as g, ni as _, o as v, on as y, pr as b, pt as x, ti as S, un as C, vn as w, yn as T } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as E } from "../../chunks/Icon-AeqJGRQj.js";
import { a as D } from "../../chunks/index-client-DLfVeyOI.js";
import { t as O } from "../../chunks/utils-DJt177zd.js";
//#region ../ui/src/lib/components/nav/nav-link.svelte
var k = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"activePath"
]), A = C("<a><!></a>");
function j(e, t) {
	r(t, !0);
	let n = v(t, k), a = b(() => t.href != null && t.href === t.activePath);
	var l = A();
	u(l, (e) => ({
		...n,
		"data-active": i(a),
		class: e
	}), [() => O("flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm font-medium text-dark-200", "hover:bg-dark-900 hover:text-dark-100", i(a) && "bg-dark-800 text-foreground hover:bg-dark-800 hover:text-foreground", t.class)]), s(d(l), () => t.children ?? _), o(l), f(e, l), c();
}
//#endregion
//#region ../ui/src/lib/components/nav/nav.svelte
var M = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"items",
	"activePath",
	"translateTitle",
	"children"
]), N = C("<!> <span class=\"truncate\"> </span>", 1), P = C("<button type=\"button\"><!></button>"), F = C("<button type=\"button\"><!> <!></button>"), I = C("<li><!></li>"), L = C("<div class=\"px-3 pt-3 pb-1 text-xs font-extrabold tracking-wide text-dark-400 uppercase\" role=\"presentation\"> </div>"), R = C("<ul class=\"mt-0.5 flex flex-col gap-0.5\"></ul>"), z = C("<!> <!>", 1), B = C("<div class=\"flex flex-col gap-0.5\"><!></div>"), V = C("<nav><!></nav>");
function H(C, w) {
	r(w, !0);
	let k = (e, n = _, r) => {
		let s = m(() => S(r?.(), !1));
		var c = N(), u = a(c), p = (e) => {
			E(e, {
				get icon() {
					return n().icon;
				},
				width: 18,
				class: "shrink-0 text-current"
			});
		};
		h(u, (e) => {
			i(s) && n().icon && e(p);
		});
		var g = t(u, 2), v = d(g, !0);
		o(g), l((e) => y(v, e), [() => J(n())]), f(e, c);
	}, A = (e, t = _, n = _, r) => {
		let s = m(() => S(r?.(), !1));
		var c = g(), u = a(c), v = (e) => {
			var r = P();
			k(d(r), t, () => i(s)), o(r), l((e) => p(r, 1, e), [() => x(O("flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-1.5 text-left text-sm font-medium text-dark-200", "hover:bg-dark-900 hover:text-dark-100", n()))]), T("click", r, function(...e) {
				t().onClick?.apply(this, e);
			}), f(e, r);
		}, y = (e) => {
			{
				let r = b(() => O("flex", n()));
				j(e, {
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
						k(e, t, () => i(s));
					},
					$$slots: { default: !0 }
				});
			}
		};
		h(u, (e) => {
			t().onClick ? e(v) : e(y, -1);
		}), f(e, c);
	}, H = (n, r = _) => {
		var a = F(), s = d(a);
		k(s, r, () => !0);
		var c = t(s, 2);
		{
			let e = b(() => O("ms-auto shrink-0 transition-transform", X(r()) && "rotate-180"));
			E(c, {
				icon: "gg:chevron-down",
				get class() {
					return i(e);
				}
			});
		}
		o(a), l((t, n) => {
			e(a, "aria-expanded", t), p(a, 1, n);
		}, [() => X(r()), () => x(O("flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-1.5 text-left text-sm font-medium text-dark-200", "hover:bg-dark-900 hover:text-dark-100", Y(r()) && "bg-dark-800 text-foreground"))]), T("click", a, () => Z(r().path)), f(n, a);
	}, U = (e, t = _) => {
		var n = I();
		A(d(n), t, () => "ps-10 font-normal"), o(n), f(e, n);
	}, W = (e, t = _) => {
		var n = L(), r = d(n, !0);
		o(n), l((e) => y(r, e), [() => J(t())]), f(e, n);
	}, G = (e, r = _) => {
		var s = g(), c = a(s), l = (e) => {
			W(e, r);
		}, u = (e) => {
			var s = B(), c = d(s), l = (e) => {
				var s = z(), c = a(s);
				H(c, r);
				var l = t(c, 2), u = (e) => {
					var t = R();
					n(t, 21, () => r().children, (e) => e.path, (e, t) => {
						U(e, () => i(t));
					}), o(t), f(e, t);
				}, d = b(() => X(r()));
				h(l, (e) => {
					i(d) && e(u);
				}), f(e, s);
			}, u = (e) => {
				A(e, r, () => void 0, () => !0);
			};
			h(c, (e) => {
				r().children?.length ? e(l) : e(u, -1);
			}), o(s), f(e, s);
		};
		h(c, (e) => {
			r().kind === "label" ? e(l) : e(u, -1);
		}), f(e, s);
	}, K = v(w, M), q = new D();
	function J(e) {
		return e.title ? w.translateTitle?.(e.title) ?? e.title : "";
	}
	function Y(e) {
		return e.children?.some((e) => e.path === w.activePath) ?? !1;
	}
	function X(e) {
		return q.has(e.path) || Y(e);
	}
	function Z(e) {
		q.has(e) ? q.delete(e) : q.add(e);
	}
	var Q = V();
	u(Q, (e) => ({
		...K,
		class: e
	}), [() => O("flex flex-col gap-0.5", w.class)]);
	var $ = d(Q), ee = (e) => {
		var t = g();
		s(a(t), () => w.children, () => ({ items: w.items })), f(e, t);
	}, te = (e) => {
		var t = g();
		n(a(t), 17, () => w.items, (e) => e.path, (e, t) => {
			G(e, () => i(t));
		}), f(e, t);
	};
	h($, (e) => {
		w.children ? e(ee) : e(te, -1);
	}), o(Q), f(C, Q), c();
}
w(["click"]);
//#endregion
export { j as Link, H as Root };
