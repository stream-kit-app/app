import { $n as e, Hr as t, Qn as n, Qr as r, Qt as i, Vr as a, Wn as o, Z as s, Zn as c, cn as l, jt as u, ln as d, ni as f, o as p, on as m, un as h, yt as g } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { t as _ } from "./utils-DJt177zd.js";
//#region ../ui/src/lib/components/heading/h.svelte
var v = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"level",
	"subTitle",
	"children"
]), y = h("<p class=\"mt-2 text-base font-normal text-dark-100\"> </p>"), b = h("<!> <!>", 1);
function x(h, x) {
	t(x, !0);
	let S = p(x, v);
	var C = d();
	g(n(C), () => `h${x.level}`, !1, (t, a) => {
		s(t, (e) => ({
			...S,
			class: e
		}), [() => _({
			"font-outfit text-4xl font-semibold": x.level == 1,
			"text-xl font-bold": x.level == 2,
			"text-lg font-bold": x.level == 3,
			"text-base font-bold": x.level == 4,
			"text-sm font-bold": x.level == 5,
			"text-xs font-bold": x.level == 6
		}, x.class)]);
		var d = b(), p = n(d);
		i(p, () => x.children ?? f, () => ({ level: x.level }));
		var h = e(p, 2), g = (e) => {
			var t = y(), n = c(t, !0);
			r(t), o(() => m(n, x.subTitle)), l(e, t);
		};
		u(h, (e) => {
			x.subTitle && e(g);
		}), l(a, d);
	}), l(h, C), a();
}
//#endregion
export { x as t };
