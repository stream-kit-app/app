import { Hr as e, Mt as t, Qr as n, Vr as r, Zn as i, f as a, in as o, it as s, ni as c, on as l, p as u } from "./index-client-BIJQxc2l.js";
import "./disclose-version-YhYaTdgb.js";
import { t as d } from "./utils-DVQ4nj8f.js";
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
	let h = a(m, "size", 3, "full"), g = u(m, f);
	var _ = p();
	s(_, (e) => ({
		...g,
		class: e
	}), [() => d("container px-4", {
		"mx-auto": m.center,
		"max-w-3xl": h() === "sm",
		"max-w-5xl": h() === "md",
		"max-w-7xl": h() === "lg",
		"max-w-full": h() === "full"
	}, m.class)]), t(i(_), () => m.children ?? c), n(_), o(l, _), r();
}
//#endregion
export { m as t };
