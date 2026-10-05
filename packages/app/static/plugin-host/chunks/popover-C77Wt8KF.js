import { Bn as e, Dr as t, En as n, Hr as r, Nt as i, Sn as a, Ur as o, Vt as s, a as c, bn as l, cr as u, ii as d, o as f, ot as p, s as m, sn as h, sr as g, ti as _, xn as v } from "./client-BFeMv2Ma.js";
import { t as y } from "./utils-Dqp4W1j8.js";
import "./disclose-version-CI8I6yeK.js";
import { D as b } from "./animations-complete-2GhqX7WL.js";
import { i as x, n as S } from "./use-id-BW6hjw-g.js";
import { t as C } from "./floating-layer-anchor-FImxxE63.js";
import { i as w, n as T, r as E, t as D } from "./popover-BAEK6C_h.js";
import { t as O } from "./scroll-area-DXaKUX2U.js";
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/popover/components/popover-trigger.svelte
var k = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"type",
	"disabled",
	"openOnHover",
	"openDelay",
	"closeDelay"
]), A = a("<button><!></button>");
function j(i, a) {
	let m = n();
	o(a, !0);
	let y = c(a, "id", 19, () => S(m)), T = c(a, "ref", 15, null), E = c(a, "type", 3, "button"), D = c(a, "disabled", 3, !1), O = c(a, "openOnHover", 3, !1), j = c(a, "openDelay", 3, 700), M = c(a, "closeDelay", 3, 300), N = f(a, k), P = w.create({
		id: b(() => y()),
		ref: b(() => T(), (e) => T(e)),
		disabled: b(() => !!D()),
		openOnHover: b(() => O()),
		openDelay: b(() => j()),
		closeDelay: b(() => M())
	}), F = t(() => x(N, P.props, { type: E() }));
	C(i, {
		get id() {
			return y();
		},
		get ref() {
			return P.opts.ref;
		},
		children: (t, n) => {
			var r = v(), i = u(r), o = (t) => {
				var n = v(), r = u(n);
				h(r, () => a.child, () => ({ props: e(F) })), l(t, n);
			}, c = (t) => {
				var n = A();
				p(n, () => ({ ...e(F) }));
				var r = g(n);
				h(r, () => a.children ?? d), _(n), l(t, n);
			};
			s(i, (e) => {
				a.child ? e(o) : e(c, -1);
			}), l(t, r);
		},
		$$slots: { default: !0 }
	}), r();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/popover/components/popover-close.svelte
var M = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"id",
	"ref"
]), N = a("<button><!></button>");
function P(i, a) {
	let m = n();
	o(a, !0);
	let y = c(a, "id", 19, () => S(m)), C = c(a, "ref", 15, null), w = f(a, M), T = E.create({
		id: b(() => y()),
		ref: b(() => C(), (e) => C(e))
	}), D = t(() => x(w, T.props));
	var O = v(), k = u(O), A = (t) => {
		var n = v(), r = u(n);
		h(r, () => a.child, () => ({ props: e(D) })), l(t, n);
	}, j = (t) => {
		var n = N();
		p(n, () => ({ ...e(D) }));
		var r = g(n);
		h(r, () => a.children ?? d), _(n), l(t, n);
	};
	s(k, (e) => {
		a.child ? e(A) : e(j, -1);
	}), l(i, O), r();
}
//#endregion
//#region ../ui/src/lib/components/popover/popover-content.svelte
var F = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function I(n, a) {
	o(a, !0);
	let s = f(a, F);
	var c = v(), p = u(c);
	{
		let n = t(() => y("z-[100] w-72 rounded-xl border border-dark-600 bg-dark-800 p-3 shadow-md outline-none", a.class));
		i(p, () => T, (t, r) => {
			r(t, m(() => s, {
				get class() {
					return e(n);
				},
				sideOffset: 4,
				children: (e, t) => {
					O(e, {
						orientation: "vertical",
						viewportClasses: "max-h-64 overflow-hidden",
						children: (e, t) => {
							var n = v(), r = u(n);
							h(r, () => a.children ?? d), l(e, n);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			}));
		});
	}
	l(n, c), r();
}
//#endregion
//#region ../ui/src/lib/components/popover/index.ts
var L = D, R = j, z = P;
//#endregion
export { I as i, L as n, R as r, z as t };
