import { $n as e, Hr as t, Qr as n, Qt as r, Vr as i, Wn as a, Z as o, Zn as s, Zr as c, cn as l, hn as u, jt as d, o as f, on as p, un as m } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as h } from "../../chunks/Icon-AeqJGRQj.js";
import { t as g } from "../../chunks/utils-DJt177zd.js";
import { t as _ } from "../../chunks/button-B-E_J8cg.js";
//#region ../ui/src/lib/components/empty-state/empty-state.svelte
var v = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"icon",
	"title",
	"description",
	"actionLabel",
	"onAction",
	"children",
	"class"
]), y = m("<div class=\"relative flex flex-wrap items-center justify-center gap-2\"><!></div>"), b = m("<div><div class=\"relative flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-4 overflow-hidden rounded-none border border-dashed border-rule bg-dark-900 px-6 py-16 text-center\"><div class=\"boot-ambient pointer-events-none opacity-30\"></div> <div class=\"relative flex size-16 items-center justify-center border border-rule bg-dark-800 text-primary\"><!></div> <div class=\"relative flex flex-col gap-1.5\"><p class=\"text-lg font-semibold text-dark-50\"> </p> <p class=\"text-sm text-dark-300\"> </p></div> <!></div></div>");
function x(m, x) {
	t(x, !0);
	let S = f(x, v);
	var C = b();
	o(C, (e) => ({
		...S,
		class: e
	}), [() => g("box-border flex min-h-full w-full flex-1 flex-col p-6", x.class)]);
	var w = s(C), T = e(s(w), 2);
	h(s(T), {
		get icon() {
			return x.icon;
		},
		class: "size-7",
		"aria-hidden": "true"
	}), n(T);
	var E = e(T, 2), D = s(E), O = s(D, !0);
	n(D);
	var k = e(D, 2), A = s(k, !0);
	n(k), n(E);
	var j = e(E, 2), M = (e) => {
		var t = y();
		r(s(t), () => x.children), n(t), l(e, t);
	}, N = (e) => {
		_(e, {
			class: "relative",
			icon: "ri:add-fill",
			get onclick() {
				return x.onAction;
			},
			children: (e, t) => {
				c();
				var n = u();
				a(() => p(n, x.actionLabel)), l(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	d(j, (e) => {
		x.children ? e(M) : x.actionLabel && x.onAction && e(N, 1);
	}), n(w), n(C), a(() => {
		p(O, x.title), p(A, x.description);
	}), l(m, C), i();
}
//#endregion
export { x as EmptyState };
