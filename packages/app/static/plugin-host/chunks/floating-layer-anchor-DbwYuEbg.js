import { Hr as e, Qn as t, Qt as n, Vr as r, a as i, cn as a, ln as o, ni as s } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { D as c } from "./animations-complete-DFBLw3EK.js";
import { i as l } from "./popper-layer-force-mount-C0Qq7_vt.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-anchor.svelte
function u(u, d) {
	e(d, !0);
	let f = i(d, "tooltip", 3, !1);
	l.create({
		id: c(() => d.id),
		virtualEl: c(() => d.virtualEl),
		ref: d.ref
	}, f());
	var p = o();
	n(t(p), () => d.children ?? s), a(u, p), r();
}
//#endregion
export { u as t };
