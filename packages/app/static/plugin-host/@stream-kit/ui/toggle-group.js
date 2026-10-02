import { $ as e, $n as t, Dt as n, Hr as r, On as i, Qr as a, Vr as o, Wn as s, Z as c, Zn as l, a as u, cn as d, dt as f, jt as p, o as m, on as h, pr as g, pt as _, un as v, vn as y, yn as b } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as x } from "../../chunks/Icon-AeqJGRQj.js";
import { t as S } from "../../chunks/utils-DcMuIKIs.js";
import { u as C } from "../../chunks/input-field-classes-RQxzeQQs.js";
//#region ../ui/src/lib/components/toggle-group/toggle-group.svelte
var w = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"items",
	"size",
	"ariaLabel",
	"class",
	"onValueChange"
]), T = v("<button type=\"button\"><!> </button>"), E = v("<div></div>");
function D(v, y) {
	r(y, !0);
	let D = u(y, "value", 15), O = u(y, "size", 3, "default"), k = m(y, w);
	function A(e) {
		D() !== e && (D(e), y.onValueChange?.(e));
	}
	var j = E();
	c(j, (e) => ({
		class: e,
		role: "group",
		"aria-label": y.ariaLabel,
		...k
	}), [() => S("inline-flex w-fit rounded-lg border border-border p-1", C, O() === "sm" ? "h-8" : "h-10", y.class)]), n(j, 21, () => y.items, (e) => e.value, (n, r) => {
		let o = g(() => D() === i(r).value);
		var c = T(), u = l(c), m = (e) => {
			{
				let t = g(() => O() === "sm" ? "size-3.5" : "size-4");
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
		}, [() => _(S("inline-flex h-full cursor-pointer items-center gap-2 rounded-md font-medium transition", "disabled:cursor-not-allowed disabled:opacity-50", O() === "sm" ? "px-2.5 text-xs" : "px-3.5 text-sm", i(o) ? "bg-dark-600 text-dark-50 shadow-sm" : "text-dark-300 hover:text-dark-100"))]), b("click", c, () => A(i(r).value)), d(n, c);
	}), a(j), d(v, j), o();
}
y(["click"]);
//#endregion
export { D as ToggleGroup };
