import { $ as e, $n as t, Hr as n, On as r, Qn as i, Qr as a, Qt as o, Vr as s, Wn as c, Zn as l, Zr as u, cn as d, dt as f, hn as p, jt as m, ln as h, ni as g, on as _, pr as v, pt as y, un as b, vn as x, yn as S } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as C } from "../../chunks/Icon-AeqJGRQj.js";
import { t as w } from "../../chunks/utils-DcMuIKIs.js";
import { a as T } from "../../chunks/blueprint-D6AKVM53.js";
//#region ../ui/src/lib/components/widget/widget-footer-link.svelte
var E = b("<a><!> <!></a>");
function D(r, i) {
	n(i, !0);
	var u = E(), p = l(u);
	o(p, () => i.children ?? g), C(t(p, 2), {
		icon: "ri:arrow-right-s-line",
		class: "size-3.5 transition-transform group-hover/link:translate-x-0.5",
		"aria-hidden": "true"
	}), a(u), c((t) => {
		e(u, "href", i.href), f(u, 1, t);
	}, [() => y(w("group/link -mx-1 inline-flex items-center gap-0.5 self-end rounded-md px-1 py-0.5 text-xs font-medium text-dark-300 transition-colors hover:text-dark-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none", i.class))]), d(r, u), s();
}
//#endregion
//#region ../ui/src/lib/components/widget/widget-list.svelte
var O = b("<div><!></div>");
function k(e, t) {
	n(t, !0);
	var r = O();
	o(l(r), () => t.children ?? g), a(r), c((e) => f(r, 1, e), [() => y(w("-mx-2 flex flex-col gap-0.5", t.class))]), d(e, r), s();
}
//#endregion
//#region ../ui/src/lib/components/widget/widget-row.svelte
var A = b("<span class=\"flex size-7 shrink-0 items-center justify-center rounded-md border border-rule bg-dark-900/60 text-primary\" aria-hidden=\"true\"><!></span>"), j = b("<a class=\"truncate font-medium text-dark-50 outline-none after:absolute after:inset-0 after:rounded-md\"> </a>"), M = b("<button type=\"button\" class=\"cursor-pointer truncate text-left font-medium text-dark-50 outline-none after:absolute after:inset-0 after:rounded-md\"> </button>"), N = b("<span class=\"truncate font-medium text-dark-50\"> </span>"), P = b("<span class=\"truncate text-xs text-dark-300\"> </span>"), F = b("<div><!></div>"), I = b("<div><!> <span class=\"flex min-w-0 flex-1 flex-col\"><!> <!></span> <!></div>");
function L(u, p) {
	n(p, !0);
	let g = v(() => !!(p.href || p.onclick)), b = v(() => w("flex w-full min-w-0 items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors", r(g) && "has-focus-visible:ring-2 has-focus-visible:ring-ring cursor-pointer hover:bg-dark-700/40", p.class));
	var x = I(), T = l(x), E = (e) => {
		var t = h();
		o(i(t), () => p.leading), d(e, t);
	}, D = (e) => {
		var t = A();
		C(l(t), {
			get icon() {
				return p.icon;
			},
			class: "size-4"
		}), a(t), d(e, t);
	};
	m(T, (e) => {
		p.leading ? e(E) : p.icon && e(D, 1);
	});
	var O = t(T, 2), k = l(O), L = (t) => {
		var n = j(), r = l(n, !0);
		a(n), c(() => {
			e(n, "href", p.href), _(r, p.title);
		}), d(t, n);
	}, R = (e) => {
		var t = M(), n = l(t, !0);
		a(t), c(() => _(n, p.title)), S("click", t, function(...e) {
			p.onclick?.apply(this, e);
		}), d(e, t);
	}, z = (e) => {
		var t = N(), n = l(t, !0);
		a(t), c(() => _(n, p.title)), d(e, t);
	};
	m(k, (e) => {
		p.href ? e(L) : p.onclick ? e(R, 1) : e(z, -1);
	});
	var B = t(k, 2), V = (e) => {
		var t = P(), n = l(t, !0);
		a(t), c(() => _(n, p.description)), d(e, t);
	};
	m(B, (e) => {
		p.description && e(V);
	}), a(O);
	var H = t(O, 2), U = (e) => {
		var t = F();
		o(l(t), () => p.trailing), a(t), c((e) => f(t, 1, e), [() => y(w("flex shrink-0 items-center gap-1.5", r(g) && "pointer-events-none relative [&_a]:pointer-events-auto [&_button]:pointer-events-auto"))]), d(e, t);
	};
	m(H, (e) => {
		p.trailing && e(U);
	}), a(x), c((e) => f(x, 1, e), [() => y(w(r(g) && "group/row relative", r(b)))]), d(u, x), s();
}
x(["click"]);
//#endregion
//#region ../ui/src/lib/components/widget/widget-stat.svelte
var R = b("<span class=\"text-sm leading-none text-dark-400\"> </span>"), z = b("<p class=\"mt-2 flex items-center gap-1 text-xs text-dark-300\"><span class=\"truncate\"> </span> <!></p>"), B = b("<!> <p><span class=\"text-2xl leading-none font-semibold text-dark-50\"> </span> <!></p> <!>", 1), V = b("<a><!></a>"), H = b("<div><!></div>");
function U(r, o) {
	n(o, !0);
	let g = (e) => {
		var n = B(), r = i(n), s = (e) => {
			T(e, {
				children: (e, t) => {
					u();
					var n = p();
					c(() => _(n, o.label)), d(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		m(r, (e) => {
			o.label && e(s);
		});
		var h = t(r, 2), g = l(h), v = l(g, !0);
		a(g);
		var b = t(g, 2), x = (e) => {
			var t = R(), n = l(t);
			a(t), c(() => _(n, `/ ${o.total ?? ""}`)), d(e, t);
		};
		m(b, (e) => {
			o.total !== void 0 && e(x);
		}), a(h);
		var S = t(h, 2), E = (e) => {
			var n = z(), r = l(n), i = l(r, !0);
			a(r);
			var s = t(r, 2), u = (e) => {
				C(e, {
					icon: "ri:arrow-right-s-line",
					class: "size-3.5 shrink-0 -translate-x-0.5 opacity-0 transition group-hover/stat:translate-x-0 group-hover/stat:opacity-100",
					"aria-hidden": "true"
				});
			};
			m(s, (e) => {
				o.href && e(u);
			}), a(n), c(() => _(i, o.hint)), d(e, n);
		};
		m(S, (e) => {
			o.hint && e(E);
		}), c((e) => {
			f(h, 1, e), _(v, o.value);
		}, [() => y(w("flex items-baseline gap-1.5 font-mono tabular-nums", o.label && "mt-2.5"))]), d(e, n);
	};
	var v = h(), b = i(v), x = (t) => {
		var n = V();
		g(l(n)), a(n), c((t) => {
			e(n, "href", o.href), f(n, 1, t);
		}, [() => y(w("group/stat -m-2 block min-w-0 rounded-md p-2 transition-colors hover:bg-dark-700/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none", o.class))]), d(t, n);
	}, S = (e) => {
		var t = H();
		g(l(t)), a(t), c((e) => f(t, 1, e), [() => y(w("min-w-0", o.class))]), d(e, t);
	};
	m(b, (e) => {
		o.href ? e(x) : e(S, -1);
	}), d(r, v), s();
}
//#endregion
export { D as WidgetFooterLink, k as WidgetList, L as WidgetRow, U as WidgetStat };
