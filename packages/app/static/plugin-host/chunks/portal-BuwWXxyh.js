import { Gt as e, Hr as t, Mt as n, On as r, Qn as i, Rr as a, Vr as o, Wt as s, ai as c, an as l, in as u, pr as d, rn as f, tn as p } from "./index-client-BHp3UA-q.js";
import "./disclose-version-YhYaTdgb.js";
import { C as m, D as h, x as g } from "./animations-complete-LXv254CE.js";
import { n as _ } from "./presence-manager.svelte-BwnRDFCN.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/portal/portal-consumer.svelte
function v(e, t) {
	var r = l();
	s(i(r), () => t.children, (e) => {
		var r = l();
		n(i(r), () => t.children ?? c), u(e, r);
	}), u(e, r);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/config/bits-config.js
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
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/config/prop-resolvers.js
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
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/portal/portal.svelte
function T(s, m) {
	t(m, !0);
	let h = w(() => m.to), y = a(), b = d(x);
	function x() {
		if (!_ || m.disabled) return null;
		let e = null;
		return e = typeof h.current == "string" ? document.querySelector(h.current) : h.current, e;
	}
	let S;
	function C() {
		S &&= (f(S), null);
	}
	g([() => r(b), () => m.disabled], ([e, t]) => {
		if (!e || t) {
			C();
			return;
		}
		return S = p(v, {
			target: e,
			props: { children: m.children },
			context: y
		}), () => {
			C();
		};
	});
	var T = l(), E = i(T), D = (e) => {
		var t = l();
		n(i(t), () => m.children ?? c), u(e, t);
	};
	e(E, (e) => {
		m.disabled && e(D);
	}), u(s, T), o();
}
//#endregion
export { T as t };
