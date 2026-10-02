import { $ as e, $n as t, Dt as n, Hr as r, On as i, Qn as a, Qr as o, Qt as s, Vr as c, Wn as l, Z as u, Zn as d, cn as f, dt as p, fr as m, jt as h, ln as g, ni as _, o as v, on as y, pr as b, pt as x, ti as S, un as C, vn as w, yn as T } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as E } from "../../chunks/Icon-AeqJGRQj.js";
import { a as D } from "../../chunks/index-client-DLfVeyOI.js";
import { a as O, r as k, t as A } from "../../chunks/utils-DcMuIKIs.js";
//#region ../ui/src/lib/components/nav/nav-link.svelte
var j = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"activePath"
]), M = C("<a><!></a>");
function N(e, t) {
	r(t, !0);
	let n = v(t, j), a = b(() => t.href != null && t.href === t.activePath);
	var l = M();
	u(l, (e) => ({
		...n,
		"data-active": i(a),
		class: e
	}), [() => A("relative flex items-center gap-2.5 px-3 py-1.5 text-sm font-medium text-dark-200", k, O, i(a) && "bg-item-active text-item-active-foreground", t.class)]), s(d(l), () => t.children ?? _), o(l), f(e, l), c();
}
//#endregion
//#region ../ui/src/lib/components/nav/nav.svelte
var P = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"items",
	"activePath",
	"translateTitle",
	"children"
]), F = C("<!> <span class=\"truncate\"> </span>", 1), I = C("<button type=\"button\"><!></button>"), L = C("<button type=\"button\"><!> <!></button>"), R = C("<li><!></li>"), ee = C("<div class=\"px-3 pt-3 pb-1 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase\" role=\"presentation\"> </div>"), z = C("<ul class=\"mt-0.5 flex flex-col gap-0.5\"></ul>"), B = C("<!> <!>", 1), V = C("<div class=\"flex flex-col gap-0.5\"><!></div>"), H = C("<nav><!></nav>");
function U(C, w) {
	r(w, !0);
	let j = (e, n = _, r) => {
		let s = m(() => S(r?.(), !1));
		var c = F(), u = a(c), p = (e) => {
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
		o(g), l((e) => y(v, e), [() => Y(n())]), f(e, c);
	}, M = (e, t = _, n = _, r) => {
		let s = m(() => S(r?.(), !1));
		var c = g(), u = a(c), v = (e) => {
			var r = I();
			j(d(r), t, () => i(s)), o(r), l((e) => p(r, 1, e), [() => x(A("relative flex w-full cursor-pointer items-center gap-2.5 px-3 py-1.5 text-left text-sm font-medium text-dark-200", k, O, n()))]), T("click", r, function(...e) {
				t().onClick?.apply(this, e);
			}), f(e, r);
		}, y = (e) => {
			{
				let r = b(() => A("flex", n()));
				N(e, {
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
						j(e, t, () => i(s));
					},
					$$slots: { default: !0 }
				});
			}
		};
		h(u, (e) => {
			t().onClick ? e(v) : e(y, -1);
		}), f(e, c);
	}, U = (n, r = _) => {
		var a = L(), s = d(a);
		j(s, r, () => !0);
		var c = t(s, 2);
		{
			let e = b(() => A("ms-auto shrink-0 transition-transform", Z(r()) && "rotate-180"));
			E(c, {
				icon: "ri:arrow-down-s-line",
				get class() {
					return i(e);
				}
			});
		}
		o(a), l((t, n) => {
			e(a, "aria-expanded", t), p(a, 1, n);
		}, [() => Z(r()), () => x(A("relative flex w-full cursor-pointer items-center gap-2.5 px-3 py-1.5 text-left text-sm font-medium text-dark-200", k, O, X(r()) && "bg-item-active text-item-active-foreground"))]), T("click", a, () => Q(r().path)), f(n, a);
	}, W = (e, t = _) => {
		var n = R();
		M(d(n), t, () => "ps-10 font-normal"), o(n), f(e, n);
	}, G = (e, t = _) => {
		var n = ee(), r = d(n, !0);
		o(n), l((e) => y(r, e), [() => Y(t())]), f(e, n);
	}, K = (e, r = _) => {
		var s = g(), c = a(s), l = (e) => {
			G(e, r);
		}, u = (e) => {
			var s = V(), c = d(s), l = (e) => {
				var s = B(), c = a(s);
				U(c, r);
				var l = t(c, 2), u = (e) => {
					var t = z();
					n(t, 21, () => r().children, (e) => e.path, (e, t) => {
						W(e, () => i(t));
					}), o(t), f(e, t);
				}, d = b(() => Z(r()));
				h(l, (e) => {
					i(d) && e(u);
				}), f(e, s);
			}, u = (e) => {
				M(e, r, () => void 0, () => !0);
			};
			h(c, (e) => {
				r().children?.length ? e(l) : e(u, -1);
			}), o(s), f(e, s);
		};
		h(c, (e) => {
			r().kind === "label" ? e(l) : e(u, -1);
		}), f(e, s);
	}, q = v(w, P), J = new D();
	function Y(e) {
		return e.title ? w.translateTitle?.(e.title) ?? e.title : "";
	}
	function X(e) {
		return e.children?.some((e) => e.path === w.activePath) ?? !1;
	}
	function Z(e) {
		return J.has(e.path) || X(e);
	}
	function Q(e) {
		J.has(e) ? J.delete(e) : J.add(e);
	}
	var $ = H();
	u($, (e) => ({
		...q,
		class: e
	}), [() => A("flex flex-col gap-0.5", w.class)]);
	var te = d($), ne = (e) => {
		var t = g();
		s(a(t), () => w.children, () => ({ items: w.items })), f(e, t);
	}, re = (e) => {
		var t = g();
		n(a(t), 17, () => w.items, (e) => e.path, (e, t) => {
			K(e, () => i(t));
		}), f(e, t);
	};
	h(te, (e) => {
		w.children ? e(ne) : e(re, -1);
	}), o($), f(C, $), c();
}
w(["click"]);
//#endregion
export { N as Link, U as Root };
