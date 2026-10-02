import { Ct as e, Hr as t, On as n, Qn as r, Qr as i, Qt as a, Vr as o, Z as s, Zn as c, a as l, cn as u, jt as d, ln as f, mn as p, ni as m, o as h, pr as g, s as _, un as v } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { t as y } from "./utils-DcMuIKIs.js";
import { D as b } from "./animations-complete-DFBLw3EK.js";
import { i as x, n as S } from "./use-id-Dbt6eP9X.js";
import { t as C } from "./floating-layer-anchor-DbwYuEbg.js";
import { i as w, n as T, r as E, t as D } from "./popover-OznKOTCT.js";
import { t as O } from "./scroll-area-BdFM74vQ.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/popover/components/popover-trigger.svelte
var k = new Set([
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
]), A = v("<button><!></button>");
function j(e, _) {
	let v = p();
	t(_, !0);
	let y = l(_, "id", 19, () => S(v)), T = l(_, "ref", 15, null), E = l(_, "type", 3, "button"), D = l(_, "disabled", 3, !1), O = l(_, "openOnHover", 3, !1), j = l(_, "openDelay", 3, 700), M = l(_, "closeDelay", 3, 300), N = h(_, k), P = w.create({
		id: b(() => y()),
		ref: b(() => T(), (e) => T(e)),
		disabled: b(() => !!D()),
		openOnHover: b(() => O()),
		openDelay: b(() => j()),
		closeDelay: b(() => M())
	}), F = g(() => x(N, P.props, { type: E() }));
	C(e, {
		get id() {
			return y();
		},
		get ref() {
			return P.opts.ref;
		},
		children: (e, t) => {
			var o = f(), l = r(o), p = (e) => {
				var t = f();
				a(r(t), () => _.child, () => ({ props: n(F) })), u(e, t);
			}, h = (e) => {
				var t = A();
				s(t, () => ({ ...n(F) })), a(c(t), () => _.children ?? m), i(t), u(e, t);
			};
			d(l, (e) => {
				_.child ? e(p) : e(h, -1);
			}), u(e, o);
		},
		$$slots: { default: !0 }
	}), o();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/popover/components/popover-close.svelte
var M = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"id",
	"ref"
]), N = v("<button><!></button>");
function P(e, _) {
	let v = p();
	t(_, !0);
	let y = l(_, "id", 19, () => S(v)), C = l(_, "ref", 15, null), w = h(_, M), T = E.create({
		id: b(() => y()),
		ref: b(() => C(), (e) => C(e))
	}), D = g(() => x(w, T.props));
	var O = f(), k = r(O), A = (e) => {
		var t = f();
		a(r(t), () => _.child, () => ({ props: n(D) })), u(e, t);
	}, j = (e) => {
		var t = N();
		s(t, () => ({ ...n(D) })), a(c(t), () => _.children ?? m), i(t), u(e, t);
	};
	d(k, (e) => {
		_.child ? e(A) : e(j, -1);
	}), u(e, O), o();
}
//#endregion
//#region ../ui/src/lib/components/popover/popover-content.svelte
var F = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function I(i, s) {
	t(s, !0);
	let c = h(s, F);
	var l = f(), d = r(l);
	{
		let t = g(() => y("z-[100] w-72 rounded-xl border border-dark-600 bg-dark-800 p-3 shadow-md outline-none", s.class));
		e(d, () => T, (e, i) => {
			i(e, _(() => c, {
				get class() {
					return n(t);
				},
				sideOffset: 4,
				children: (e, t) => {
					O(e, {
						orientation: "vertical",
						viewportClasses: "max-h-64 overflow-hidden",
						children: (e, t) => {
							var n = f();
							a(r(n), () => s.children ?? m), u(e, n);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			}));
		});
	}
	u(i, l), o();
}
//#endregion
//#region ../ui/src/lib/components/popover/index.ts
var L = D, R = j, z = P;
//#endregion
export { I as i, L as n, R as r, z as t };
