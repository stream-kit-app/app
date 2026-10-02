import { $n as e, Hr as t, On as n, Qn as r, Qt as i, Vr as a, Yt as o, Z as s, a as c, cn as l, cr as u, jt as d, ln as f, ni as p, o as m, or as h, pr as g, un as _, yt as v } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { t as y } from "./Icon-AeqJGRQj.js";
import { t as b } from "./utils-DcMuIKIs.js";
import { t as x } from "./dist-DLhOqhSg.js";
import { n as S } from "./dist-DeJB5afo.js";
//#region ../ui/src/lib/components/button/button-variants.ts
var C = x({
	base: [
		"inline-flex shrink-0 items-center justify-center gap-2 border border-transparent",
		"cursor-pointer rounded-lg font-semibold whitespace-nowrap",
		"transition-[color,background-color,box-shadow] duration-150",
		"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		"disabled:pointer-events-none disabled:opacity-50",
		"[&_svg]:pointer-events-none [&_svg]:shrink-0"
	],
	variants: {
		variant: {
			default: "bg-primary/15 text-primary shadow-sm hover:bg-primary/25",
			secondary: "bg-secondary/15 text-secondary shadow-sm hover:bg-secondary/25",
			outline: "border border-border bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			destructive: "bg-destructive-200/5 text-destructive-100 shadow-sm hover:bg-destructive-200/10 focus-visible:ring-destructive-700",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			xs: "h-7 rounded-md px-2 text-xs [&_svg:not([class*=\"size-\"])]:size-3",
			sm: "h-8 px-3 text-sm font-normal [&_svg:not([class*=\"size-\"])]:size-3.5",
			badge: "rounded-md px-2.5 py-0.5 text-xs font-semibold [&_svg:not([class*=\"size-\"])]:size-3.5",
			default: "h-10 px-4 text-sm [&_svg:not([class*=\"size-\"])]:size-4",
			lg: "h-12 px-6 text-base [&_svg:not([class*=\"size-\"])]:size-5",
			icon: "size-[37px] [&_svg:not([class*=\"size-\"])]:size-4",
			"icon-sm": "size-8 [&_svg:not([class*=\"size-\"])]:size-3.5",
			"icon-badge": "size-6 rounded-md [&_svg:not([class*=\"size-\"])]:size-3.5",
			"icon-lg": "size-12 [&_svg:not([class*=\"size-\"])]:size-5"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
}), w = new Set([
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
]), T = _("<!> <!> <!>", 1);
function E(_, x) {
	t(x, !0);
	let E = c(x, "variant", 3, "default"), D = c(x, "size", 3, "default"), O = c(x, "iconPosition", 3, "start"), k = c(x, "disabled", 3, !1), A = c(x, "isLoading", 11, !1), j = m(x, w), M = u(!1), N = 0, P;
	S(() => A(), (e) => {
		if (clearTimeout(P), e) {
			N = Date.now(), h(M, !0);
			return;
		}
		let t = 600 - (Date.now() - N);
		if (t <= 0) {
			h(M, !1);
			return;
		}
		P = setTimeout(() => {
			h(M, !1);
		}, t);
	}), o(() => clearTimeout(P));
	var F = f();
	v(r(F), () => x.href ? "a" : "button", !1, (t, a) => {
		s(t, (e) => ({
			"data-button-root": !0,
			type: x.href ? void 0 : x.type ?? "button",
			href: x.href && !k() ? x.href : void 0,
			disabled: x.href ? void 0 : k(),
			"aria-disabled": x.href && k() ? !0 : void 0,
			role: x.href && k() ? "link" : void 0,
			tabindex: x.href && k() ? -1 : void 0,
			class: e,
			...j
		}), [() => b(C({
			variant: E(),
			size: D()
		}), x.class)]);
		var o = T(), c = r(o), u = (e) => {
			var t = f(), i = r(t), a = (e) => {
				{
					let t = g(() => b("animate-spin", x.iconClass)), r = g(() => x.children != null);
					y(e, {
						icon: "ri:loader-4-line",
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
					let t = g(() => b(x.iconClass)), r = g(() => x.children != null);
					y(e, {
						get icon() {
							return x.icon;
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
			d(i, (e) => {
				n(M) ? e(a) : e(o, -1);
			}), l(e, t);
		}, m = (e) => {
			{
				let t = g(() => b("animate-spin", x.iconClass)), r = g(() => x.children != null);
				y(e, {
					icon: "ri:loader-4-line",
					get class() {
						return n(t);
					},
					get "aria-hidden"() {
						return n(r);
					}
				});
			}
		};
		d(c, (e) => {
			x.icon && O() === "start" ? e(u) : n(M) && e(m, 1);
		});
		var h = e(c, 2);
		i(h, () => x.children ?? p);
		var _ = e(h, 2), v = (e) => {
			{
				let t = g(() => b(x.iconClass)), r = g(() => x.children != null);
				y(e, {
					get icon() {
						return x.icon;
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
		d(_, (e) => {
			x.icon && O() === "end" && e(v);
		}), l(a, o);
	}), l(_, F), a();
}
//#endregion
export { C as n, E as t };
