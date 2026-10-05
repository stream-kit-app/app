import { Bn as e, Ct as t, Dn as n, Dr as r, Hr as i, Sn as a, Ur as o, Vt as s, a as c, bn as l, ei as u, hn as d, lr as f, nr as p, o as m, ot as h, sn as g, sr as _, ti as v, ur as y, xt as b } from "../../chunks/client-BFeMv2Ma.js";
import { t as x } from "../../chunks/utils-Dqp4W1j8.js";
import "../../chunks/disclose-version-CI8I6yeK.js";
import { t as S } from "../../chunks/Icon-Ct61sPxO.js";
import { t as C } from "../../chunks/button-DGOI4Wpk.js";
import "../../chunks/button-CBfuPA65.js";
//#region ../ui/src/lib/components/empty-state/empty-state.svelte
var w = /* @__PURE__ */ new Set([
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
]), T = a("<p> </p>"), E = a("<div class=\"relative flex flex-wrap items-center justify-center gap-2\"><!></div>"), D = a("<div><div><div><!></div> <div><p> </p> <!></div> <!></div></div>");
function O(a, O) {
	o(O, !0);
	let k = c(O, "compact", 3, !1), A = m(O, w);
	var j = D();
	h(j, (e) => ({
		...A,
		class: e
	}), [() => x("box-border flex w-full flex-col", k() ? "p-0" : "min-h-full flex-1 p-6", O.class)]);
	var M = _(j), N = _(M), P = _(N);
	{
		let t = r(() => k() ? "size-5" : "size-7");
		S(P, {
			get icon() {
				return O.icon;
			},
			get class() {
				return e(t);
			},
			"aria-hidden": "true"
		});
	}
	v(N);
	var F = y(N, 2), I = _(F), L = f(I, !0), R = y(I, 2), z = (e) => {
		var n = T(), r = f(n, !0);
		p((e) => {
			b(n, 1, e), d(r, O.description);
		}, [() => t(x("text-dark-300", k() ? "text-xs" : "text-sm"))]), l(e, n);
	};
	s(R, (e) => {
		O.description && e(z);
	}), v(F);
	var B = y(F, 2), V = (e) => {
		var t = E(), n = _(t);
		g(n, () => O.children), v(t), l(e, t);
	}, H = (e) => {
		C(e, {
			class: "relative",
			icon: "ri:add-fill",
			get onclick() {
				return O.onAction;
			},
			children: (e, t) => {
				u();
				var r = n();
				p(() => d(r, O.actionLabel)), l(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	s(B, (e) => {
		O.children ? e(V) : O.actionLabel && O.onAction && e(H, 1);
	}), v(M), v(j), p((e, t, n, r) => {
		b(M, 1, e), b(N, 1, t), b(F, 1, n), b(I, 1, r), d(L, O.title);
	}, [
		() => t(x("relative flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-rule bg-dark-950 text-center", k() ? "gap-3 px-4 py-6" : "gap-4 px-6 py-16")),
		() => t(x("relative flex items-center justify-center rounded-md border border-rule bg-dark-800 text-primary", k() ? "size-10" : "size-16")),
		() => t(x("relative flex flex-col", k() ? "gap-1" : "gap-1.5")),
		() => t(x("font-semibold text-dark-50", k() ? "text-sm" : "text-lg"))
	]), l(a, j), i();
}
//#endregion
export { O as EmptyState };
