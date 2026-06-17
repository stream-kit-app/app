import { $n as e, Et as t, Gt as n, Hr as r, Mt as i, On as a, Qn as o, Vr as s, an as c, f as l, in as u, it as d, ni as f, on as p, p as m, pr as h } from "./index-client-BIJQxc2l.js";
import "./disclose-version-YhYaTdgb.js";
import { t as g } from "./Icon-BoHmh-pv.js";
import { t as _ } from "./utils-DVQ4nj8f.js";
import { t as v } from "./dist-3jIr5VNH.js";
//#region ../ui/src/lib/components/button/button-variants.ts
var y = v({
	base: [
		"inline-flex shrink-0 items-center justify-center gap-2 border border-transparent",
		"cursor-pointer rounded-xl font-semibold whitespace-nowrap",
		"transition-[color,background-color,box-shadow,transform] duration-150",
		"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		"disabled:pointer-events-none disabled:opacity-50",
		"active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0"
	],
	variants: {
		variant: {
			default: "bg-primary/15 text-primary shadow-sm hover:bg-primary/25",
			secondary: "bg-secondary/15 text-secondary shadow-sm hover:bg-secondary/25",
			outline: "border border-border bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			destructive: "bg-destructive-200/5 text-destructive-100 shadow-sm hover:bg-destructive-200/10 focus-visible:ring-destructive-700 dark:bg-destructive-500 dark:hover:bg-destructive-500/90",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			xs: "h-7 rounded-lg px-2 text-xs [&_svg:not([class*=\"size-\"])]:size-3",
			sm: "h-8 px-3 text-sm font-normal [&_svg:not([class*=\"size-\"])]:size-3.5",
			default: "h-10 px-4 text-sm [&_svg:not([class*=\"size-\"])]:size-4",
			lg: "h-12 px-6 text-base [&_svg:not([class*=\"size-\"])]:size-5",
			icon: "size-[37px] [&_svg:not([class*=\"size-\"])]:size-4",
			"icon-sm": "size-8 [&_svg:not([class*=\"size-\"])]:size-3.5",
			"icon-lg": "size-12 [&_svg:not([class*=\"size-\"])]:size-5"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
}), b = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"variant",
	"size",
	"class",
	"icon",
	"iconPosition",
	"iconClass",
	"href",
	"type",
	"disabled",
	"isLoading",
	"children"
]), x = p("<!> <!> <!>", 1);
function S(p, v) {
	r(v, !0);
	let S = l(v, "variant", 3, "default"), C = l(v, "size", 3, "default"), w = l(v, "iconPosition", 3, "start"), T = l(v, "disabled", 3, !1), E = l(v, "isLoading", 11, !1), D = m(v, b);
	var O = c();
	t(o(O), () => v.href ? "a" : "button", !1, (t, r) => {
		d(t, (e) => ({
			"data-button-root": !0,
			type: v.href ? void 0 : v.type ?? "button",
			href: v.href && !T() ? v.href : void 0,
			disabled: v.href ? void 0 : T(),
			"aria-disabled": v.href && T() ? !0 : void 0,
			role: v.href && T() ? "link" : void 0,
			tabindex: v.href && T() ? -1 : void 0,
			class: e,
			...D
		}), [() => _(y({
			variant: S(),
			size: C()
		}), v.class)]);
		var s = x(), l = o(s), p = (e) => {
			var t = c(), r = o(t), i = (e) => {
				{
					let t = h(() => _("animate-spin", v.iconClass)), n = h(() => v.children != null);
					g(e, {
						icon: "gg:spinner",
						get class() {
							return a(t);
						},
						get "aria-hidden"() {
							return a(n);
						}
					});
				}
			}, s = (e) => {
				{
					let t = h(() => _(v.iconClass)), n = h(() => v.children != null);
					g(e, {
						get icon() {
							return v.icon;
						},
						get class() {
							return a(t);
						},
						get "aria-hidden"() {
							return a(n);
						}
					});
				}
			};
			n(r, (e) => {
				E() ? e(i) : e(s, -1);
			}), u(e, t);
		}, m = (e) => {
			{
				let t = h(() => _("animate-spin", v.iconClass)), n = h(() => v.children != null);
				g(e, {
					icon: "gg:spinner",
					get class() {
						return a(t);
					},
					get "aria-hidden"() {
						return a(n);
					}
				});
			}
		};
		n(l, (e) => {
			v.icon && w() === "start" ? e(p) : E() && e(m, 1);
		});
		var b = e(l, 2);
		i(b, () => v.children ?? f);
		var O = e(b, 2), k = (e) => {
			{
				let t = h(() => _(v.iconClass)), n = h(() => v.children != null);
				g(e, {
					get icon() {
						return v.icon;
					},
					get class() {
						return a(t);
					},
					get "aria-hidden"() {
						return a(n);
					}
				});
			}
		};
		n(O, (e) => {
			v.icon && w() === "end" && e(k);
		}), u(r, s);
	}), u(p, O), s();
}
//#endregion
export { y as n, S as t };
