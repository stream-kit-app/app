import { Hr as e, Mt as t, Qr as n, Vr as r, Zn as i, ai as a, f as o, in as s, it as c, on as l, p as u } from "./index-client-BHp3UA-q.js";
import "./disclose-version-YhYaTdgb.js";
import { t as d } from "./utils-CRERhYYg.js";
//#region ../ui/src/lib/components/container/container.svelte
var f = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"center",
	"size"
]), p = l("<div><!></div>");
function m(l, m) {
	e(m, !0);
	let h = o(m, "size", 3, "full"), g = u(m, f);
	var _ = p();
	c(_, (e) => ({
		...g,
		class: e
	}), [() => d("container px-4", {
		"mx-auto": m.center,
		"max-w-3xl": h() === "sm",
		"max-w-5xl": h() === "md",
		"max-w-7xl": h() === "lg",
		"max-w-full": h() === "full"
	}, m.class)]), t(i(_), () => m.children ?? a), n(_), s(l, _), r();
}
//#endregion
export { m as t };
