import { Hr as e, Sn as t, Ur as n, a as r, bn as i, ii as a, o, ot as s, sn as c, sr as l, ti as u } from "./client-BFeMv2Ma.js";
import { t as d } from "./utils-Dqp4W1j8.js";
import "./disclose-version-CI8I6yeK.js";
import { t as f } from "./dist-C4ptVwpx.js";
//#region ../ui/src/lib/components/badge/badge-variants.ts
var p = f({
	base: [
		"inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-md border border-transparent",
		"font-semibold whitespace-nowrap transition-[color,background-color,border-color] duration-150",
		"[&_svg]:pointer-events-none [&_svg]:shrink-0"
	],
	variants: {
		variant: {
			default: "border-primary/20 bg-primary/15 text-primary",
			secondary: "border-secondary/20 bg-secondary/15 text-secondary",
			outline: "border-border bg-transparent text-foreground",
			ghost: "border-transparent bg-transparent text-muted-foreground",
			destructive: "border-destructive-500 bg-destructive-800 text-destructive-50",
			success: "border-success-500 bg-success-800 text-success-50",
			warning: "border-warning-500 bg-warning-800 text-warning-50",
			link: "border-transparent bg-transparent text-primary underline-offset-4 hover:underline"
		},
		size: {
			sm: "px-2 py-0.5 text-xs [&_svg:not([class*=\"size-\"])]:size-3",
			default: "px-2.5 py-0.5 text-xs [&_svg:not([class*=\"size-\"])]:size-3.5",
			lg: "px-3 py-1 text-sm [&_svg:not([class*=\"size-\"])]:size-4"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
}), m = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"variant",
	"size",
	"class",
	"children"
]), h = t("<span><!></span>");
function g(t, f) {
	n(f, !0);
	let g = r(f, "variant", 3, "default"), _ = r(f, "size", 3, "default"), v = o(f, m);
	var y = h();
	s(y, (e) => ({
		class: e,
		...v
	}), [() => d(p({
		variant: g(),
		size: _()
	}), f.class)]);
	var b = l(y);
	c(b, () => f.children ?? a), u(y), i(t, y), e();
}
//#endregion
export { p as n, g as t };
