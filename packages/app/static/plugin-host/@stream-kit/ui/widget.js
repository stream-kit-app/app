import { An as e, Bn as t, Ct as n, Dn as r, Dr as i, Hr as a, Sn as o, Ur as s, Vt as c, bn as l, cr as u, ct as d, ei as f, hn as p, ii as m, jn as h, lr as g, nr as _, sn as v, sr as y, ti as b, ur as x, xn as S, xt as C } from "../../chunks/client-BFeMv2Ma.js";
import { t as w } from "../../chunks/utils-Dqp4W1j8.js";
import "../../chunks/disclose-version-CI8I6yeK.js";
import { t as T } from "../../chunks/Icon-Ct61sPxO.js";
import { a as E } from "../../chunks/blueprint-BpxI9dH_.js";
//#region ../ui/src/lib/components/widget/widget-footer-link.svelte
var D = o("<a><!> <!></a>");
function O(e, t) {
	s(t, !0);
	var r = D(), i = y(r);
	v(i, () => t.children ?? m);
	var o = x(i, 2);
	T(o, {
		icon: "ri:arrow-right-s-line",
		class: "size-3.5 transition-transform group-hover/link:translate-x-0.5",
		"aria-hidden": "true"
	}), b(r), _((e) => {
		d(r, "href", t.href), C(r, 1, e);
	}, [() => n(w("group/link -mx-1 inline-flex items-center gap-0.5 self-end rounded-md px-1 py-0.5 text-xs font-medium text-dark-300 transition-colors hover:text-dark-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none", t.class))]), l(e, r), a();
}
//#endregion
//#region ../ui/src/lib/components/widget/widget-list.svelte
var k = o("<div><!></div>");
function A(e, t) {
	s(t, !0);
	var r = k(), i = y(r);
	v(i, () => t.children ?? m), b(r), _((e) => C(r, 1, e), [() => n(w("-mx-2 flex flex-col gap-0.5", t.class))]), l(e, r), a();
}
//#endregion
//#region ../ui/src/lib/components/widget/widget-row.svelte
var j = o("<span class=\"flex size-7 shrink-0 items-center justify-center rounded-md border border-rule bg-dark-900/60 text-primary\" aria-hidden=\"true\"><!></span>"), M = o("<a class=\"truncate font-medium text-dark-50 outline-none after:absolute after:inset-0 after:rounded-md\"> </a>"), N = o("<button type=\"button\" class=\"cursor-pointer truncate text-left font-medium text-dark-50 outline-none after:absolute after:inset-0 after:rounded-md\"> </button>"), P = o("<span class=\"truncate font-medium text-dark-50\"> </span>"), F = o("<span class=\"truncate text-xs text-dark-300\"> </span>"), I = o("<div><!></div>"), L = o("<div><!> <span class=\"flex min-w-0 flex-1 flex-col\"><!> <!></span> <!></div>");
function R(e, r) {
	s(r, !0);
	let o = i(() => !!(r.href || r.onclick)), f = i(() => w("flex w-full min-w-0 items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors", t(o) && "has-focus-visible:ring-2 has-focus-visible:ring-ring cursor-pointer hover:bg-dark-700/40", r.class));
	var m = L(), E = y(m), D = (e) => {
		var t = S(), n = u(t);
		v(n, () => r.leading), l(e, t);
	}, O = (e) => {
		var t = j(), n = y(t);
		T(n, {
			get icon() {
				return r.icon;
			},
			class: "size-4"
		}), b(t), l(e, t);
	};
	c(E, (e) => {
		r.leading ? e(D) : r.icon && e(O, 1);
	});
	var k = x(E, 2), A = y(k), R = (e) => {
		var t = M(), n = g(t, !0);
		_(() => {
			d(t, "href", r.href), p(n, r.title);
		}), l(e, t);
	}, z = (e) => {
		var t = N(), n = g(t, !0);
		_(() => p(n, r.title)), h("click", t, function(...e) {
			r.onclick?.apply(this, e);
		}), l(e, t);
	}, B = (e) => {
		var t = P(), n = g(t, !0);
		_(() => p(n, r.title)), l(e, t);
	};
	c(A, (e) => {
		r.href ? e(R) : r.onclick ? e(z, 1) : e(B, -1);
	});
	var V = x(A, 2), H = (e) => {
		var t = F(), n = g(t, !0);
		_(() => p(n, r.description)), l(e, t);
	};
	c(V, (e) => {
		r.description && e(H);
	}), b(k);
	var U = x(k, 2), W = (e) => {
		var i = I(), a = y(i);
		v(a, () => r.trailing), b(i), _((e) => C(i, 1, e), [() => n(w("flex shrink-0 items-center gap-1.5", t(o) && "pointer-events-none relative [&_a]:pointer-events-auto [&_button]:pointer-events-auto"))]), l(e, i);
	};
	c(U, (e) => {
		r.trailing && e(W);
	}), b(m), _((e) => C(m, 1, e), [() => n(w(t(o) && "group/row relative", t(f)))]), l(e, m), a();
}
e(["click"]);
//#endregion
//#region ../ui/src/lib/components/widget/widget-stat.svelte
var z = o("<span class=\"text-sm leading-none text-dark-400\"> </span>"), B = o("<p class=\"mt-2 flex items-center gap-1 text-xs text-dark-300\"><span class=\"truncate\"> </span> <!></p>"), V = o("<!> <p><span class=\"text-2xl leading-none font-semibold text-dark-50\"> </span> <!></p> <!>", 1), H = o("<a><!></a>"), U = o("<div><!></div>");
function W(e, t) {
	s(t, !0);
	let i = (e) => {
		var i = V(), a = u(i), o = (e) => {
			E(e, {
				children: (e, n) => {
					f();
					var i = r();
					_(() => p(i, t.label)), l(e, i);
				},
				$$slots: { default: !0 }
			});
		};
		c(a, (e) => {
			t.label && e(o);
		});
		var s = x(a, 2), d = y(s), m = g(d, !0), h = x(d, 2), v = (e) => {
			var n = z(), r = g(n);
			_(() => p(r, `/ ${t.total ?? ""}`)), l(e, n);
		};
		c(h, (e) => {
			t.total !== void 0 && e(v);
		}), b(s);
		var S = x(s, 2), D = (e) => {
			var n = B(), r = y(n), i = g(r, !0), a = x(r, 2), o = (e) => {
				T(e, {
					icon: "ri:arrow-right-s-line",
					class: "size-3.5 shrink-0 -translate-x-0.5 opacity-0 transition group-hover/stat:translate-x-0 group-hover/stat:opacity-100",
					"aria-hidden": "true"
				});
			};
			c(a, (e) => {
				t.href && e(o);
			}), b(n), _(() => p(i, t.hint)), l(e, n);
		};
		c(S, (e) => {
			t.hint && e(D);
		}), _((e) => {
			C(s, 1, e), p(m, t.value);
		}, [() => n(w("flex items-baseline gap-1.5 font-mono tabular-nums", t.label && "mt-2.5"))]), l(e, i);
	};
	var o = S(), m = u(o), h = (e) => {
		var r = H(), a = y(r);
		i(a), b(r), _((e) => {
			d(r, "href", t.href), C(r, 1, e);
		}, [() => n(w("group/stat -m-2 block min-w-0 rounded-md p-2 transition-colors hover:bg-dark-700/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none", t.class))]), l(e, r);
	}, v = (e) => {
		var r = U(), a = y(r);
		i(a), b(r), _((e) => C(r, 1, e), [() => n(w("min-w-0", t.class))]), l(e, r);
	};
	c(m, (e) => {
		t.href ? e(h) : e(v, -1);
	}), l(e, o), a();
}
//#endregion
export { O as WidgetFooterLink, A as WidgetList, R as WidgetRow, W as WidgetStat };
