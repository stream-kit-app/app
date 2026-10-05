import { Bn as e, Dr as t, Hr as n, Sn as r, Ur as i, Vt as a, _r as o, a as s, bn as c, cr as l, ii as u, in as d, kt as f, o as p, ot as m, sn as h, ur as g, xn as _, yr as v } from "./client-BFeMv2Ma.js";
import { t as y } from "./utils-Dqp4W1j8.js";
import "./disclose-version-CI8I6yeK.js";
import { t as b } from "./Icon-Ct61sPxO.js";
import { k as x } from "./dist-C2qYxMMi.js";
import { t as S } from "./dist-C4ptVwpx.js";
//#region ../ui/src/lib/components/button/button-variants.ts
var C = S({
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
}), w = /* @__PURE__ */ new Set([
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
]), T = r("<!> <!> <!>", 1);
function E(r, S) {
	i(S, !0);
	let E = s(S, "variant", 3, "default"), D = s(S, "size", 3, "default"), O = s(S, "iconPosition", 3, "start"), k = s(S, "disabled", 3, !1), A = s(S, "isLoading", 11, !1), j = p(S, w), M = v(!1), N = 0, P;
	x(() => A(), (e) => {
		if (clearTimeout(P), e) {
			N = Date.now(), o(M, !0);
			return;
		}
		let t = 600 - (Date.now() - N);
		if (t <= 0) {
			o(M, !1);
			return;
		}
		P = setTimeout(() => {
			o(M, !1);
		}, t);
	}), d(() => clearTimeout(P));
	var F = _(), I = l(F);
	f(I, () => S.href ? "a" : "button", !1, (n, r) => {
		m(n, (e) => ({
			"data-button-root": !0,
			type: S.href ? void 0 : S.type ?? "button",
			href: S.href && !k() ? S.href : void 0,
			disabled: S.href ? void 0 : k(),
			"aria-disabled": S.href && k() ? !0 : void 0,
			role: S.href && k() ? "link" : void 0,
			tabindex: S.href && k() ? -1 : void 0,
			class: e,
			...j
		}), [() => y(C({
			variant: E(),
			size: D()
		}), S.class)]);
		var i = T(), o = l(i), s = (n) => {
			var r = _(), i = l(r), o = (n) => {
				{
					let r = t(() => y("animate-spin", S.iconClass)), i = t(() => S.children != null);
					b(n, {
						icon: "ri:loader-4-line",
						get class() {
							return e(r);
						},
						get "aria-hidden"() {
							return e(i);
						}
					});
				}
			}, s = (n) => {
				{
					let r = t(() => y(S.iconClass)), i = t(() => S.children != null);
					b(n, {
						get icon() {
							return S.icon;
						},
						get class() {
							return e(r);
						},
						get "aria-hidden"() {
							return e(i);
						}
					});
				}
			};
			a(i, (t) => {
				e(M) ? t(o) : t(s, -1);
			}), c(n, r);
		}, d = (n) => {
			{
				let r = t(() => y("animate-spin", S.iconClass)), i = t(() => S.children != null);
				b(n, {
					icon: "ri:loader-4-line",
					get class() {
						return e(r);
					},
					get "aria-hidden"() {
						return e(i);
					}
				});
			}
		};
		a(o, (t) => {
			S.icon && O() === "start" ? t(s) : e(M) && t(d, 1);
		});
		var f = g(o, 2);
		h(f, () => S.children ?? u);
		var p = g(f, 2), v = (n) => {
			{
				let r = t(() => y(S.iconClass)), i = t(() => S.children != null);
				b(n, {
					get icon() {
						return S.icon;
					},
					get class() {
						return e(r);
					},
					get "aria-hidden"() {
						return e(i);
					}
				});
			}
		};
		a(p, (e) => {
			S.icon && O() === "end" && e(v);
		}), c(r, i);
	}), c(r, F), n();
}
//#endregion
export { C as n, E as t };
