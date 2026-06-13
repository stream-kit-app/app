import { $n as e, Et as t, Gt as n, Hr as r, Mt as i, Qn as a, Qr as o, Vr as s, Wn as c, Zn as l, ai as u, an as d, in as f, it as p, nn as m, on as h, p as g } from "./index-client-BHp3UA-q.js";
import "./disclose-version-YhYaTdgb.js";
import { t as _ } from "./utils-CRERhYYg.js";
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
	r(x, !0);
	let S = g(x, v);
	var C = d();
	t(a(C), () => `h${x.level}`, !1, (t, r) => {
		p(t, (e) => ({
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
		var s = b(), d = a(s);
		i(d, () => x.children ?? u, () => ({ level: x.level }));
		var h = e(d, 2), g = (e) => {
			var t = y(), n = l(t, !0);
			o(t), c(() => m(n, x.subTitle)), f(e, t);
		};
		n(h, (e) => {
			x.subTitle && e(g);
		}), f(r, s);
	}), f(h, C), s();
}
//#endregion
export { x as t };
