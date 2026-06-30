import { Hr as e, Qr as t, Qt as n, Vr as r, Z as i, Zn as a, a as o, cn as s, ni as c, o as l, un as u } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { t as d } from "./utils-DJt177zd.js";
//#region ../ui/src/lib/components/container/container.svelte
var f = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"center",
	"size"
]), p = u("<div><!></div>");
function m(u, m) {
	e(m, !0);
	let h = o(m, "size", 3, "full"), g = l(m, f);
	var _ = p();
	i(_, (e) => ({
		...g,
		class: e
	}), [() => d("container px-4", {
		"mx-auto": m.center,
		"max-w-3xl": h() === "sm",
		"max-w-5xl": h() === "md",
		"max-w-7xl": h() === "lg",
		"max-w-full": h() === "full"
	}, m.class)]), n(a(_), () => m.children ?? c), t(_), s(u, _), r();
}
//#endregion
export { m as t };
