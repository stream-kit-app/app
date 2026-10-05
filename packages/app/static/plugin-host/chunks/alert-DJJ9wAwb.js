import { Bn as e, Ct as t, Dr as n, Hr as r, Sn as i, Ur as a, Vt as o, a as s, bn as c, hn as l, ii as u, lr as d, nr as f, o as p, ot as m, sn as h, sr as g, ti as _, ur as v, xt as y } from "./client-BFeMv2Ma.js";
import { t as b } from "./utils-Dqp4W1j8.js";
import "./disclose-version-CI8I6yeK.js";
import { t as x } from "./Icon-Ct61sPxO.js";
import { t as S } from "./dist-C4ptVwpx.js";
//#region ../ui/src/lib/components/alert/alert-variants.ts
var C = S({
	base: "flex items-start gap-3 rounded-xl border p-4 text-sm",
	variants: { variant: {
		default: "border-border bg-dark-900 text-foreground",
		success: "border-success-600 bg-success-900 text-success-50",
		error: "border-destructive-600 bg-destructive-900 text-destructive-100",
		warning: "border-warning-600 bg-warning-900 text-warning-100"
	} },
	defaultVariants: { variant: "default" }
}), w = {
	default: "ri:information-fill",
	success: "ri:checkbox-circle-fill",
	error: "ri:error-warning-fill",
	warning: "ri:alert-fill"
}, T = S({
	base: "mt-0.5 size-5 shrink-0",
	variants: { variant: {
		default: "text-primary",
		success: "text-green-500",
		error: "text-red-500",
		warning: "text-amber-500"
	} },
	defaultVariants: { variant: "default" }
}), E = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"variant",
	"icon",
	"title",
	"description",
	"children",
	"class"
]), D = i("<p class=\"font-semibold\"> </p>"), O = i("<p> </p>"), k = i("<div><!> <div class=\"min-w-0 flex-1\"><!> <!> <!></div></div>");
function A(i, S) {
	a(S, !0);
	let A = s(S, "variant", 3, "default"), j = p(S, E), M = n(() => S.icon === !1 ? void 0 : S.icon ?? w[A()]);
	var N = k();
	m(N, (e) => ({
		class: e,
		...j
	}), [() => b(C({ variant: A() }), S.class)]);
	var P = g(N), F = (t) => {
		{
			let r = n(() => T({ variant: A() }));
			x(t, {
				get icon() {
					return e(M);
				},
				get class() {
					return e(r);
				}
			});
		}
	};
	o(P, (t) => {
		e(M) && t(F);
	});
	var I = v(P, 2), L = g(I), R = (e) => {
		var t = D(), n = d(t, !0);
		f(() => l(n, S.title)), c(e, t);
	};
	o(L, (e) => {
		S.title && e(R);
	});
	var z = v(L, 2), B = (e) => {
		var n = O(), r = d(n, !0);
		f((e) => {
			y(n, 1, e), l(r, S.description);
		}, [() => t(b("opacity-80", S.title && "mt-1"))]), c(e, n);
	};
	o(z, (e) => {
		S.description && e(B);
	});
	var V = v(z, 2);
	h(V, () => S.children ?? u), _(I), _(N), c(i, N), r();
}
//#endregion
export { C as n, A as t };
