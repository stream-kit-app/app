import { $n as e, Hr as t, On as n, Qn as r, Qr as i, Qt as a, Vr as o, Wn as s, Z as c, Zn as l, Zr as u, a as d, cn as f, dt as p, jt as m, ln as h, ni as g, o as _, on as v, pr as y, pt as b, un as x } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { t as S } from "./utils-DJt177zd.js";
import { t as C } from "./dist-DLhOqhSg.js";
//#region ../ui/src/lib/components/blueprint/cell.svelte
var w = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"href",
	"class",
	"children"
]), T = x("<a><!></a>"), E = x("<div><!></div>");
function D(e, s) {
	t(s, !0);
	let u = _(s, w), d = y(() => S("border-r border-b border-rule bg-background p-6 transition-colors", s.href && "block cursor-pointer hover:bg-dark-900/80", s.class));
	var p = h(), v = r(p), b = (e) => {
		var t = T();
		c(t, () => ({
			href: s.href,
			class: n(d),
			...u
		})), a(l(t), () => s.children ?? g), i(t), f(e, t);
	}, x = (e) => {
		var t = E();
		c(t, () => ({
			class: n(d),
			...u
		})), a(l(t), () => s.children ?? g), i(t), f(e, t);
	};
	m(v, (e) => {
		s.href ? e(b) : e(x, -1);
	}), f(e, p), o();
}
//#endregion
//#region ../ui/src/lib/components/blueprint/cell-grid-variants.ts
var O = C({
	base: "grid border-t border-l border-rule",
	variants: { cols: {
		1: "grid-cols-1",
		2: "grid-cols-1 sm:grid-cols-2",
		3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
		4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
	} },
	defaultVariants: { cols: 2 }
}), k = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"cols",
	"class",
	"children"
]), A = x("<div><!></div>");
function j(e, n) {
	t(n, !0);
	let r = d(n, "cols", 3, 2), s = _(n, k);
	var u = A();
	c(u, (e) => ({
		class: e,
		...s
	}), [() => S(O({ cols: r() }), n.class)]), a(l(u), () => n.children ?? g), i(u), f(e, u), o();
}
//#endregion
//#region ../ui/src/lib/components/blueprint/crosshair-variants.ts
var M = C({
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
}), N = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"size",
	"position",
	"class"
]), P = x("<span>+</span>");
function F(e, n) {
	t(n, !0);
	let r = d(n, "size", 3, "md"), i = d(n, "position", 3, "top-left"), a = _(n, N);
	var s = P();
	c(s, (e) => ({
		"aria-hidden": "true",
		class: e,
		...a
	}), [() => S(M({
		size: r(),
		position: i()
	}), n.class)]), f(e, s), o();
}
//#endregion
//#region ../ui/src/lib/components/blueprint/eyebrow.svelte
var I = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"index",
	"class",
	"children"
]), L = x("<span class=\"text-primary\"> </span> <span class=\"mx-1.5 text-rule-strong\">/</span>", 1), R = x("<p><!> <span><!></span></p>");
function z(n, d) {
	t(d, !0);
	let p = _(d, I);
	var h = R();
	c(h, (e) => ({
		class: e,
		...p
	}), [() => S("inline-flex items-center font-mono text-[11px] leading-none font-medium tracking-[0.14em] text-muted-foreground uppercase", d.class)]);
	var y = l(h), b = (e) => {
		var t = L(), n = r(t), a = l(n, !0);
		i(n), u(2), s(() => v(a, d.index)), f(e, t);
	};
	m(y, (e) => {
		d.index && e(b);
	});
	var x = e(y, 2);
	a(l(x), () => d.children ?? g), i(x), i(h), f(n, h), o();
}
//#endregion
//#region ../ui/src/lib/components/blueprint/grid-frame.svelte
var B = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"size",
	"class",
	"children"
]), V = x("<div><div><div aria-hidden=\"true\" class=\"blueprint-hatch pointer-events-none absolute inset-y-0 right-full w-screen opacity-40\"></div> <div aria-hidden=\"true\" class=\"blueprint-hatch pointer-events-none absolute inset-y-0 left-full w-screen opacity-40\"></div> <div aria-hidden=\"true\" class=\"pointer-events-none absolute inset-y-0 left-0 z-10 w-px bg-rule\"></div> <div aria-hidden=\"true\" class=\"pointer-events-none absolute inset-y-0 right-0 z-10 w-px bg-rule\"></div> <!></div></div>");
function H(r, u) {
	t(u, !0);
	let m = d(u, "size", 3, "lg"), h = _(u, B), v = y(() => S("relative mx-auto w-full", m() === "md" && "max-w-5xl", m() === "lg" && "max-w-7xl", m() === "xl" && "max-w-[90rem]"));
	var x = V();
	c(x, (e) => ({
		class: e,
		...h
	}), [() => S("relative isolate min-h-screen w-full overflow-x-hidden bg-background", u.class)]);
	var C = l(x);
	a(e(l(C), 8), () => u.children ?? g), i(C), i(x), s(() => p(C, 1, b(n(v)))), f(r, x), o();
}
//#endregion
//#region ../ui/src/lib/components/blueprint/panel-variants.ts
var U = C({
	base: "relative rounded-none border border-rule",
	variants: { tone: {
		default: "bg-dark-900/40",
		solid: "bg-dark-800",
		flush: "bg-transparent"
	} },
	defaultVariants: { tone: "default" }
}), W = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"crosshairs",
	"tone",
	"header",
	"class",
	"children"
]), G = x("<!> <!> <!> <!>", 1), K = x("<div class=\"border-b border-rule px-5 py-3\"><!></div>"), q = x("<div><!> <!> <!></div>");
function J(n, s) {
	t(s, !0);
	let u = d(s, "crosshairs", 3, !1), p = d(s, "tone", 3, "default"), h = _(s, W);
	var v = q();
	c(v, (e) => ({
		class: e,
		...h
	}), [() => S(U({ tone: p() }), s.class)]);
	var y = l(v), b = (t) => {
		var n = G(), i = r(n);
		F(i, {
			position: "top-left",
			size: "sm"
		});
		var a = e(i, 2);
		F(a, {
			position: "top-right",
			size: "sm"
		});
		var o = e(a, 2);
		F(o, {
			position: "bottom-left",
			size: "sm"
		}), F(e(o, 2), {
			position: "bottom-right",
			size: "sm"
		}), f(t, n);
	};
	m(y, (e) => {
		u() && e(b);
	});
	var x = e(y, 2), C = (e) => {
		var t = K();
		a(l(t), () => s.header), i(t), f(e, t);
	};
	m(x, (e) => {
		s.header && e(C);
	}), a(e(x, 2), () => s.children ?? g), i(v), f(n, v), o();
}
//#endregion
//#region ../ui/src/lib/components/blueprint/section-rule.svelte
var Y = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"crosshairs",
	"class"
]), X = x("<!> <!>", 1), Z = x("<div><!></div>");
function Q(n, a) {
	t(a, !0);
	let s = d(a, "crosshairs", 3, !0), u = _(a, Y);
	var p = Z();
	c(p, (e) => ({
		"aria-hidden": "true",
		class: e,
		...u
	}), [() => S("relative h-px w-full bg-rule", a.class)]);
	var h = l(p), g = (t) => {
		var n = X(), i = r(n);
		F(i, {
			position: "top-left",
			size: "sm",
			class: "left-0"
		}), F(e(i, 2), {
			position: "top-right",
			size: "sm",
			class: "right-0"
		}), f(t, n);
	};
	m(h, (e) => {
		s() && e(g);
	}), i(p), f(n, p), o();
}
//#endregion
export { z as a, j as c, H as i, O as l, J as n, F as o, U as r, M as s, Q as t, D as u };
