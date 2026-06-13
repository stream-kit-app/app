import { Hr as e, Mt as t, Qn as n, Vr as r, ai as i, an as a, f as o, in as s } from "./index-client-BHp3UA-q.js";
import "./disclose-version-YhYaTdgb.js";
import { D as c } from "./animations-complete-LXv254CE.js";
import { i as l } from "./popper-layer-force-mount-D-61-5ih.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-anchor.svelte
function u(u, d) {
	e(d, !0);
	let f = o(d, "tooltip", 3, !1);
	l.create({
		id: c(() => d.id),
		virtualEl: c(() => d.virtualEl),
		ref: d.ref
	}, f());
	var p = a();
	t(n(p), () => d.children ?? i), s(u, p), r();
}
//#endregion
export { u as t };
