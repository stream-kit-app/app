import { Hr as e, Sn as t, Ur as n, a as r, bn as i, ii as a, o, ot as s, sn as c, sr as l, ti as u } from "./client-BFeMv2Ma.js";
import { t as d } from "./utils-Dqp4W1j8.js";
import "./disclose-version-CI8I6yeK.js";
//#region ../ui/src/lib/components/container/container.svelte
var f = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"center",
	"size"
]), p = t("<div><!></div>");
function m(t, m) {
	n(m, !0);
	let h = r(m, "size", 3, "full"), g = o(m, f);
	var _ = p();
	s(_, (e) => ({
		...g,
		class: e
	}), [() => d("container px-4", {
		"mx-auto": m.center,
		"max-w-3xl": h() === "sm",
		"max-w-5xl": h() === "md",
		"max-w-screen-2xl": h() === "lg",
		"max-w-full": h() === "full"
	}, m.class)]);
	var v = l(_);
	c(v, () => m.children ?? a), u(_), i(t, _), e();
}
//#endregion
export { m as t };
