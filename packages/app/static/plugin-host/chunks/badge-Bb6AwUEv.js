import { Hr as e, Qr as t, Qt as n, Vr as r, Z as i, Zn as a, a as o, cn as s, ni as c, o as l, un as u } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { t as d } from "./utils-DJt177zd.js";
import { t as f } from "./dist-DLhOqhSg.js";
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
}), m = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"variant",
	"size",
	"class",
	"children"
]), h = u("<span><!></span>");
function g(u, f) {
	e(f, !0);
	let g = o(f, "variant", 3, "default"), _ = o(f, "size", 3, "default"), v = l(f, m);
	var y = h();
	i(y, (e) => ({
		class: e,
		...v
	}), [() => d(p({
		variant: g(),
		size: _()
	}), f.class)]), n(a(y), () => f.children ?? c), t(y), s(u, y), r();
}
//#endregion
export { p as n, g as t };
