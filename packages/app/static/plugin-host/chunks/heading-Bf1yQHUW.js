import { Hr as e, Sn as t, Ur as n, Vt as r, bn as i, cr as a, hn as o, ii as s, kt as c, lr as l, nr as u, o as d, ot as f, sn as p, ur as m, xn as h } from "./client-BFeMv2Ma.js";
import { t as g } from "./utils-Dqp4W1j8.js";
import "./disclose-version-CI8I6yeK.js";
//#region ../ui/src/lib/components/heading/h.svelte
var _ = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"level",
	"subTitle",
	"children"
]), v = t("<p class=\"mt-2 text-base font-normal text-dark-100\"> </p>"), y = t("<!> <!>", 1);
function b(t, b) {
	n(b, !0);
	let x = d(b, _);
	var S = h(), C = a(S);
	c(C, () => `h${b.level}`, !1, (e, t) => {
		f(e, (e) => ({
			...x,
			class: e
		}), [() => g({
			"font-outfit text-4xl font-semibold": b.level == 1,
			"text-xl font-bold": b.level == 2,
			"text-lg font-bold": b.level == 3,
			"text-base font-bold": b.level == 4,
			"text-sm font-bold": b.level == 5,
			"text-xs font-bold": b.level == 6
		}, b.class)]);
		var n = y(), c = a(n);
		p(c, () => b.children ?? s, () => ({ level: b.level }));
		var d = m(c, 2), h = (e) => {
			var t = v(), n = l(t, !0);
			u(() => o(n, b.subTitle)), i(e, t);
		};
		r(d, (e) => {
			b.subTitle && e(h);
		}), i(t, n);
	}), i(t, S), e();
}
//#endregion
export { b as t };
