import { $n as e, Hr as t, On as n, Qn as r, Qt as i, Vr as a, Z as o, a as s, cn as c, jt as l, ln as u, ni as d, o as f, pr as p, un as m, yt as h } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { t as g } from "./Icon-AeqJGRQj.js";
import { t as _ } from "./utils-DJt177zd.js";
import { t as v } from "./dist-DLhOqhSg.js";
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
			badge: "rounded-lg px-2.5 py-0.5 text-xs font-semibold [&_svg:not([class*=\"size-\"])]:size-3.5",
			default: "h-10 px-4 text-sm [&_svg:not([class*=\"size-\"])]:size-4",
			lg: "h-12 px-6 text-base [&_svg:not([class*=\"size-\"])]:size-5",
			icon: "size-[37px] [&_svg:not([class*=\"size-\"])]:size-4",
			"icon-sm": "size-8 [&_svg:not([class*=\"size-\"])]:size-3.5",
			"icon-badge": "size-6 rounded-lg [&_svg:not([class*=\"size-\"])]:size-3.5",
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
]), x = m("<!> <!> <!>", 1);
function S(m, v) {
	t(v, !0);
	let S = s(v, "variant", 3, "default"), C = s(v, "size", 3, "default"), w = s(v, "iconPosition", 3, "start"), T = s(v, "disabled", 3, !1), E = s(v, "isLoading", 11, !1), D = f(v, b);
	var O = u();
	h(r(O), () => v.href ? "a" : "button", !1, (t, a) => {
		o(t, (e) => ({
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
		var s = x(), f = r(s), m = (e) => {
			var t = u(), i = r(t), a = (e) => {
				{
					let t = p(() => _("animate-spin", v.iconClass)), r = p(() => v.children != null);
					g(e, {
						icon: "gg:spinner",
						get class() {
							return n(t);
						},
						get "aria-hidden"() {
							return n(r);
						}
					});
				}
			}, o = (e) => {
				{
					let t = p(() => _(v.iconClass)), r = p(() => v.children != null);
					g(e, {
						get icon() {
							return v.icon;
						},
						get class() {
							return n(t);
						},
						get "aria-hidden"() {
							return n(r);
						}
					});
				}
			};
			l(i, (e) => {
				E() ? e(a) : e(o, -1);
			}), c(e, t);
		}, h = (e) => {
			{
				let t = p(() => _("animate-spin", v.iconClass)), r = p(() => v.children != null);
				g(e, {
					icon: "gg:spinner",
					get class() {
						return n(t);
					},
					get "aria-hidden"() {
						return n(r);
					}
				});
			}
		};
		l(f, (e) => {
			v.icon && w() === "start" ? e(m) : E() && e(h, 1);
		});
		var b = e(f, 2);
		i(b, () => v.children ?? d);
		var O = e(b, 2), k = (e) => {
			{
				let t = p(() => _(v.iconClass)), r = p(() => v.children != null);
				g(e, {
					get icon() {
						return v.icon;
					},
					get class() {
						return n(t);
					},
					get "aria-hidden"() {
						return n(r);
					}
				});
			}
		};
		l(O, (e) => {
			v.icon && w() === "end" && e(k);
		}), c(a, s);
	}), c(m, O), a();
}
//#endregion
export { y as n, S as t };
