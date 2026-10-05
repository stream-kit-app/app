import { An as e, Bn as t, Ct as n, Dr as r, Hr as i, Lt as a, Sn as o, Ur as s, Vt as c, a as l, bn as u, ct as d, hn as f, jn as p, nr as m, o as h, ot as g, sr as _, ti as v, ur as y, xt as b } from "../../chunks/client-BFeMv2Ma.js";
import { t as x } from "../../chunks/utils-Dqp4W1j8.js";
import "../../chunks/disclose-version-CI8I6yeK.js";
import { t as S } from "../../chunks/Icon-Ct61sPxO.js";
import { u as C } from "../../chunks/input-field-classes-Cmqg1dVo.js";
//#region ../ui/src/lib/components/toggle-group/toggle-group.svelte
var w = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"items",
	"size",
	"ariaLabel",
	"class",
	"onValueChange"
]), T = o("<button type=\"button\"><!> </button>"), E = o("<div></div>");
function D(e, o) {
	s(o, !0);
	let D = l(o, "value", 15), O = l(o, "size", 3, "default"), k = h(o, w);
	function A(e) {
		D() !== e && (D(e), o.onValueChange?.(e));
	}
	var j = E();
	g(j, (e) => ({
		class: e,
		role: "group",
		"aria-label": o.ariaLabel,
		...k
	}), [() => x("inline-flex w-fit rounded-lg border border-border p-1", C, O() === "sm" ? "h-8" : "h-10", o.class)]), a(j, 21, () => o.items, (e) => e.value, (e, i) => {
		let a = r(() => D() === t(i).value);
		var o = T(), s = _(o), l = (e) => {
			{
				let n = r(() => O() === "sm" ? "size-3.5" : "size-4");
				S(e, {
					get icon() {
						return t(i).icon;
					},
					get class() {
						return t(n);
					},
					"aria-hidden": "true"
				});
			}
		};
		c(s, (e) => {
			t(i).icon && e(l);
		});
		var h = y(s);
		v(o), m((e) => {
			o.disabled = t(i).disabled, d(o, "aria-pressed", t(a)), b(o, 1, e), f(h, ` ${t(i).label ?? ""}`);
		}, [() => n(x("inline-flex h-full cursor-pointer items-center gap-2 rounded-md font-medium transition", "disabled:cursor-not-allowed disabled:opacity-50", O() === "sm" ? "px-2.5 text-xs" : "px-3.5 text-sm", t(a) ? "bg-dark-600 text-dark-50 shadow-sm" : "text-dark-300 hover:text-dark-100"))]), p("click", o, () => A(t(i).value)), u(e, o);
	}), v(j), u(e, j), i();
}
e(["click"]);
//#endregion
export { D as ToggleGroup };
