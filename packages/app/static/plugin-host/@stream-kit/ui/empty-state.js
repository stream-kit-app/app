import { $n as e, Hr as t, On as n, Qr as r, Qt as i, Vr as a, Wn as o, Z as s, Zn as c, Zr as l, a as u, cn as d, dt as f, hn as p, jt as m, o as h, on as g, pr as _, pt as v, un as y } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as b } from "../../chunks/Icon-AeqJGRQj.js";
import { t as x } from "../../chunks/utils-DJt177zd.js";
import { t as S } from "../../chunks/button-DzdRL0h9.js";
//#region ../ui/src/lib/components/empty-state/empty-state.svelte
var C = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"icon",
	"title",
	"description",
	"compact",
	"actionLabel",
	"onAction",
	"children",
	"class"
]), w = y("<p> </p>"), T = y("<div class=\"relative flex flex-wrap items-center justify-center gap-2\"><!></div>"), E = y("<div><div><div><!></div> <div><p> </p> <!></div> <!></div></div>");
function D(y, D) {
	t(D, !0);
	let O = u(D, "compact", 3, !1), k = h(D, C);
	var A = E();
	s(A, (e) => ({
		...k,
		class: e
	}), [() => x("box-border flex w-full flex-col", O() ? "p-0" : "min-h-full flex-1 p-6", D.class)]);
	var j = c(A), M = c(j), N = c(M);
	{
		let e = _(() => O() ? "size-5" : "size-7");
		b(N, {
			get icon() {
				return D.icon;
			},
			get class() {
				return n(e);
			},
			"aria-hidden": "true"
		});
	}
	r(M);
	var P = e(M, 2), F = c(P), I = c(F, !0);
	r(F);
	var L = e(F, 2), R = (e) => {
		var t = w(), n = c(t, !0);
		r(t), o((e) => {
			f(t, 1, e), g(n, D.description);
		}, [() => v(x("text-dark-300", O() ? "text-xs" : "text-sm"))]), d(e, t);
	};
	m(L, (e) => {
		D.description && e(R);
	}), r(P);
	var z = e(P, 2), B = (e) => {
		var t = T();
		i(c(t), () => D.children), r(t), d(e, t);
	}, V = (e) => {
		S(e, {
			class: "relative",
			icon: "ri:add-fill",
			get onclick() {
				return D.onAction;
			},
			children: (e, t) => {
				l();
				var n = p();
				o(() => g(n, D.actionLabel)), d(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	m(z, (e) => {
		D.children ? e(B) : D.actionLabel && D.onAction && e(V, 1);
	}), r(j), r(A), o((e, t, n, r) => {
		f(j, 1, e), f(M, 1, t), f(P, 1, n), f(F, 1, r), g(I, D.title);
	}, [
		() => v(x("relative flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-none border border-dashed border-rule bg-dark-950 text-center", O() ? "gap-3 px-4 py-6" : "gap-4 px-6 py-16")),
		() => v(x("relative flex items-center justify-center border border-rule bg-dark-800 text-primary", O() ? "size-10" : "size-16")),
		() => v(x("relative flex flex-col", O() ? "gap-1" : "gap-1.5")),
		() => v(x("font-semibold text-dark-50", O() ? "text-sm" : "text-lg"))
	]), d(y, A), a();
}
//#endregion
export { D as EmptyState };
