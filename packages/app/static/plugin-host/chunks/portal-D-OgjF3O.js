import { At as e, Hr as t, On as n, Qn as r, Qt as i, Rr as a, Vr as o, an as s, cn as c, jt as l, ln as u, ni as d, pr as f, sn as p } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { C as m, D as h, x as g } from "./animations-complete-BfqHI4B-.js";
import { n as _ } from "./presence-manager.svelte-BOTfPcjg.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/portal/portal-consumer.svelte
function v(t, n) {
	var a = u();
	e(r(a), () => n.children, (e) => {
		var t = u();
		i(r(t), () => n.children ?? d), c(e, t);
	}), c(t, a);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/config/bits-config.js
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
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/config/prop-resolvers.js
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
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/portal/portal.svelte
function T(e, m) {
	t(m, !0);
	let h = w(() => m.to), y = a(), b = f(x);
	function x() {
		if (!_ || m.disabled) return null;
		let e = null;
		return e = typeof h.current == "string" ? document.querySelector(h.current) : h.current, e;
	}
	let S;
	function C() {
		S &&= (p(S), null);
	}
	g([() => n(b), () => m.disabled], ([e, t]) => {
		if (!e || t) {
			C();
			return;
		}
		return S = s(v, {
			target: e,
			props: { children: m.children },
			context: y
		}), () => {
			C();
		};
	});
	var T = u(), E = r(T), D = (e) => {
		var t = u();
		i(r(t), () => m.children ?? d), c(e, t);
	};
	l(E, (e) => {
		m.disabled && e(D);
	}), c(e, T), o();
}
//#endregion
export { T as t };
