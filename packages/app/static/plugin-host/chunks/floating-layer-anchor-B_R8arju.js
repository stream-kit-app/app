import { Hr as e, Qn as t, Qt as n, Vr as r, a as i, cn as a, ln as o, ni as s } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { D as c } from "./animations-complete-BfqHI4B-.js";
import { i as l } from "./popper-layer-force-mount-BxV85AhM.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-anchor.svelte
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
