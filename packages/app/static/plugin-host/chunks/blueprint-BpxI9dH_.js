import { Bn as e, Ct as t, Dr as n, Hr as r, Sn as i, Ur as a, Vt as o, a as s, bn as c, cr as l, ei as u, hn as d, ii as f, lr as p, nr as m, o as h, ot as g, sn as _, sr as v, ti as y, ur as b, xn as x, xt as S } from "./client-BFeMv2Ma.js";
import { t as C } from "./utils-Dqp4W1j8.js";
import "./disclose-version-CI8I6yeK.js";
import { t as w } from "./dist-C4ptVwpx.js";
//#region ../ui/src/lib/components/blueprint/cell.svelte
var T = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"href",
	"class",
	"children"
]), E = i("<a><!></a>"), D = i("<div><!></div>");
function O(t, i) {
	a(i, !0);
	let s = h(i, T), u = n(() => C("border-r border-b border-rule bg-background p-6 transition-colors", i.href && "block cursor-pointer hover:bg-dark-700/40", i.class));
	var d = x(), p = l(d), m = (t) => {
		var n = E();
		g(n, () => ({
			href: i.href,
			class: e(u),
			...s
		}));
		var r = v(n);
		_(r, () => i.children ?? f), y(n), c(t, n);
	}, b = (t) => {
		var n = D();
		g(n, () => ({
			class: e(u),
			...s
		}));
		var r = v(n);
		_(r, () => i.children ?? f), y(n), c(t, n);
	};
	o(p, (e) => {
		i.href ? e(m) : e(b, -1);
	}), c(t, d), r();
}
//#endregion
//#region ../ui/src/lib/components/blueprint/cell-grid-variants.ts
var k = w({
	slots: {
		frame: "relative overflow-hidden rounded-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-rule",
		grid: "-me-px -mb-px grid"
	},
	variants: { cols: {
		1: { grid: "grid-cols-1" },
		2: { grid: "grid-cols-1 sm:grid-cols-2" },
		3: { grid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" },
		4: { grid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" }
	} },
	defaultVariants: { cols: 2 }
}), A = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"cols",
	"class",
	"children"
]), j = i("<div><div><!></div></div>");
function M(i, o) {
	a(o, !0);
	let l = s(o, "cols", 3, 2), u = h(o, A), d = n(() => k({ cols: l() }));
	var p = j();
	g(p, (e) => ({
		class: e,
		...u
	}), [() => C(e(d).frame(), o.class)]);
	var b = v(p), x = v(b);
	_(x, () => o.children ?? f), y(b), y(p), m((e) => S(b, 1, e), [() => t(e(d).grid())]), c(i, p), r();
}
//#endregion
//#region ../ui/src/lib/components/blueprint/crosshair-variants.ts
var N = w({
	base: "pointer-events-none absolute z-10 text-muted-foreground/70 select-none",
	variants: {
		size: {
			sm: "text-[10px] leading-none",
			md: "text-xs leading-none",
			lg: "text-sm leading-none"
		},
		position: {
			"top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
			"top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
			"bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
			"bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
			center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
		}
	},
	defaultVariants: {
		size: "md",
		position: "top-left"
	}
}), P = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"size",
	"position",
	"class"
]), F = i("<span>+</span>");
function I(e, t) {
	a(t, !0);
	let n = s(t, "size", 3, "md"), i = s(t, "position", 3, "top-left"), o = h(t, P);
	var l = F();
	g(l, (e) => ({
		"aria-hidden": "true",
		class: e,
		...o
	}), [() => C(N({
		size: n(),
		position: i()
	}), t.class)]), c(e, l), r();
}
//#endregion
//#region ../ui/src/lib/components/blueprint/eyebrow.svelte
var L = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"index",
	"class",
	"children"
]), R = i("<span class=\"text-primary\"> </span> <span class=\"mx-1.5 text-rule-strong\">/</span>", 1), z = i("<p><!> <span><!></span></p>");
function B(e, t) {
	a(t, !0);
	let n = h(t, L);
	var i = z();
	g(i, (e) => ({
		class: e,
		...n
	}), [() => C("inline-flex items-center font-mono text-[11px] leading-none font-medium tracking-[0.14em] text-muted-foreground uppercase", t.class)]);
	var s = v(i), x = (e) => {
		var n = R(), r = l(n), i = p(r, !0);
		u(2), m(() => d(i, t.index)), c(e, n);
	};
	o(s, (e) => {
		t.index && e(x);
	});
	var S = b(s, 2), w = v(S);
	_(w, () => t.children ?? f), y(S), y(i), c(e, i), r();
}
//#endregion
//#region ../ui/src/lib/components/blueprint/grid-frame.svelte
var V = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"size",
	"class",
	"children"
]), H = i("<div><div><div aria-hidden=\"true\" class=\"blueprint-hatch pointer-events-none absolute inset-y-0 right-full w-screen opacity-40\"></div> <div aria-hidden=\"true\" class=\"blueprint-hatch pointer-events-none absolute inset-y-0 left-full w-screen opacity-40\"></div> <div aria-hidden=\"true\" class=\"pointer-events-none absolute inset-y-0 left-0 z-10 w-px bg-rule\"></div> <div aria-hidden=\"true\" class=\"pointer-events-none absolute inset-y-0 right-0 z-10 w-px bg-rule\"></div> <!></div></div>");
function U(i, o) {
	a(o, !0);
	let l = s(o, "size", 3, "lg"), u = h(o, V), d = n(() => C("relative mx-auto w-full", l() === "md" && "max-w-5xl", l() === "lg" && "max-w-7xl", l() === "xl" && "max-w-[90rem]"));
	var p = H();
	g(p, (e) => ({
		class: e,
		...u
	}), [() => C("relative isolate min-h-screen w-full overflow-x-hidden bg-background", o.class)]);
	var x = v(p), w = b(v(x), 8);
	_(w, () => o.children ?? f), y(x), y(p), m(() => S(x, 1, t(e(d)))), c(i, p), r();
}
//#endregion
//#region ../ui/src/lib/components/blueprint/panel-variants.ts
var W = w({
	base: "relative rounded-xl border border-rule",
	variants: { tone: {
		default: "bg-dark-900/40",
		solid: "bg-surface",
		flush: "bg-transparent"
	} },
	defaultVariants: { tone: "default" }
}), G = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"crosshairs",
	"tone",
	"header",
	"class",
	"children"
]), K = i("<!> <!> <!> <!>", 1), q = i("<div class=\"border-b border-rule px-5 py-3\"><!></div>"), J = i("<div><!> <!> <!></div>");
function Y(e, t) {
	a(t, !0);
	let n = s(t, "crosshairs", 3, !1), i = s(t, "tone", 3, "default"), u = h(t, G);
	var d = J();
	g(d, (e) => ({
		class: e,
		...u
	}), [() => C(W({ tone: i() }), t.class)]);
	var p = v(d), m = (e) => {
		var t = K(), n = l(t);
		I(n, {
			position: "top-left",
			size: "sm"
		});
		var r = b(n, 2);
		I(r, {
			position: "top-right",
			size: "sm"
		});
		var i = b(r, 2);
		I(i, {
			position: "bottom-left",
			size: "sm"
		}), I(b(i, 2), {
			position: "bottom-right",
			size: "sm"
		}), c(e, t);
	};
	o(p, (e) => {
		n() && e(m);
	});
	var x = b(p, 2), S = (e) => {
		var n = q(), r = v(n);
		_(r, () => t.header), y(n), c(e, n);
	};
	o(x, (e) => {
		t.header && e(S);
	});
	var w = b(x, 2);
	_(w, () => t.children ?? f), y(d), c(e, d), r();
}
//#endregion
//#region ../ui/src/lib/components/blueprint/section-rule.svelte
var X = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"crosshairs",
	"class"
]), Z = i("<!> <!>", 1), Q = i("<div><!></div>");
function $(e, t) {
	a(t, !0);
	let n = s(t, "crosshairs", 3, !0), i = h(t, X);
	var u = Q();
	g(u, (e) => ({
		"aria-hidden": "true",
		class: e,
		...i
	}), [() => C("relative h-px w-full bg-rule", t.class)]);
	var d = v(u), f = (e) => {
		var t = Z(), n = l(t);
		I(n, {
			position: "top-left",
			size: "sm",
			class: "left-0"
		}), I(b(n, 2), {
			position: "top-right",
			size: "sm",
			class: "right-0"
		}), c(e, t);
	};
	o(d, (e) => {
		n() && e(f);
	}), y(u), c(e, u), r();
}
//#endregion
export { B as a, M as c, U as i, k as l, Y as n, I as o, W as r, N as s, $ as t, O as u };
