import { $ as e, $n as t, Dt as n, Hr as r, On as i, Qr as a, Vr as o, Wn as s, Z as c, Zn as l, a as u, cn as d, dt as f, jt as p, o as m, on as h, pr as g, pt as _, un as v, vn as y, yn as b } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as x } from "../../chunks/Icon-AeqJGRQj.js";
import { t as S } from "../../chunks/utils-DJt177zd.js";
//#region ../ui/src/lib/components/toggle-group/toggle-group.svelte
var C = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"items",
	"size",
	"ariaLabel",
	"class",
	"onValueChange"
]), w = v("<button type=\"button\"><!> </button>"), T = v("<div></div>");
function E(v, y) {
	r(y, !0);
	let E = u(y, "value", 15), D = u(y, "size", 3, "default"), O = m(y, C);
	function k(e) {
		E() !== e && (E(e), y.onValueChange?.(e));
	}
	var A = T();
	c(A, (e) => ({
		class: e,
		role: "group",
		"aria-label": y.ariaLabel,
		...O
	}), [() => S("inline-flex w-fit rounded-none border border-rule bg-dark-900/50 p-1 shadow-inner", y.class)]), n(A, 21, () => y.items, (e) => e.value, (n, r) => {
		let o = g(() => E() === i(r).value);
		var c = w(), u = l(c), m = (e) => {
			{
				let t = g(() => D() === "sm" ? "size-3.5" : "size-4");
				x(e, {
					get icon() {
						return i(r).icon;
					},
					get class() {
						return i(t);
					},
					"aria-hidden": "true"
				});
			}
		};
		p(u, (e) => {
			i(r).icon && e(m);
		});
		var v = t(u);
		a(c), s((t) => {
			c.disabled = i(r).disabled, e(c, "aria-pressed", i(o)), f(c, 1, t), h(v, ` ${i(r).label ?? ""}`);
		}, [() => _(S("inline-flex cursor-pointer items-center gap-2 rounded-lg font-medium transition", "disabled:cursor-not-allowed disabled:opacity-50", D() === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3.5 py-2 text-sm", i(o) ? "bg-dark-700 text-dark-50 shadow-sm" : "text-dark-300 hover:text-dark-100"))]), b("click", c, () => k(i(r).value)), d(n, c);
	}), a(A), d(v, A), o();
}
y(["click"]);
//#endregion
export { E as ToggleGroup };
