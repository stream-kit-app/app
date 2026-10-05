import { Bn as e, Bt as t, Dr as n, Hr as r, Ur as i, Vt as a, bn as o, cr as s, gn as c, ii as l, mn as u, sn as d, xn as f, zr as p } from "./client-BFeMv2Ma.js";
import "./disclose-version-CI8I6yeK.js";
import { C as m, D as h, x as g } from "./animations-complete-2GhqX7WL.js";
import { n as _ } from "./presence-manager.svelte-cK0pnbQH.js";
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/portal/portal-consumer.svelte
function v(e, n) {
	var r = f(), i = s(r);
	t(i, () => n.children, (e) => {
		var t = f(), r = s(t);
		d(r, () => n.children ?? l), o(e, t);
	}), o(e, r);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/config/bits-config.js
var y = new m("BitsConfig");
function b() {
	let e = new x(null, {});
	return y.getOr(e).opts;
}
var x = class {
	opts;
	constructor(e, t) {
		let n = S(e, t);
		this.opts = {
			defaultPortalTo: n((e) => e.defaultPortalTo),
			defaultLocale: n((e) => e.defaultLocale)
		};
	}
};
function S(e, t) {
	return (n) => h(() => {
		let r = n(t)?.current;
		if (r !== void 0) return r;
		if (e !== null) return n(e.opts)?.current;
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/config/prop-resolvers.js
function C(e, t) {
	return (n) => {
		let r = b();
		return h(() => {
			let i = n();
			if (i !== void 0) return i;
			let a = e(r).current;
			return a === void 0 ? t : a;
		});
	};
}
var w = C((e) => e.defaultPortalTo, "body");
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/portal/portal.svelte
function T(t, m) {
	i(m, !0);
	let h = w(() => m.to), y = p(), b = n(x);
	function x() {
		if (!_ || m.disabled) return null;
		let e = null;
		return e = typeof h.current == "string" ? document.querySelector(h.current) : h.current, e;
	}
	let S;
	function C() {
		S &&= (c(S), null);
	}
	g([() => e(b), () => m.disabled], ([e, t]) => {
		if (!e || t) {
			C();
			return;
		}
		return S = u(v, {
			target: e,
			props: { children: m.children },
			context: y
		}), () => {
			C();
		};
	});
	var T = f(), E = s(T), D = (e) => {
		var t = f(), n = s(t);
		d(n, () => m.children ?? l), o(e, t);
	};
	a(E, (e) => {
		m.disabled && e(D);
	}), o(t, T), r();
}
//#endregion
export { T as t };
