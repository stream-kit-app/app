import { $n as e, Hr as t, On as n, Qr as r, Qt as i, Vr as a, Wn as o, Z as s, Zn as c, a as l, cn as u, dt as d, jt as f, ni as p, o as m, on as h, pr as g, pt as _, un as v } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { t as y } from "./Icon-AeqJGRQj.js";
import { t as b } from "./utils-DJt177zd.js";
import { t as x } from "./dist-DLhOqhSg.js";
//#region ../ui/src/lib/components/alert/alert-variants.ts
var S = x({
	base: "flex items-start gap-3 rounded-none border p-4 text-sm",
	variants: { variant: {
		default: "border-border bg-dark-900 text-foreground",
		success: "border-success-600 bg-success-900 text-success-50",
		error: "border-destructive-600 bg-destructive-900 text-destructive-100",
		warning: "border-warning-600 bg-warning-900 text-warning-100"
	} },
	defaultVariants: { variant: "default" }
}), C = {
	default: "ri:information-fill",
	success: "ri:checkbox-circle-fill",
	error: "ri:error-warning-fill",
	warning: "ri:alert-fill"
}, w = x({
	base: "mt-0.5 size-5 shrink-0",
	variants: { variant: {
		default: "text-primary",
		success: "text-green-500",
		error: "text-red-500",
		warning: "text-amber-500"
	} },
	defaultVariants: { variant: "default" }
}), T = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"variant",
	"icon",
	"title",
	"description",
	"children",
	"class"
]), E = v("<p class=\"font-semibold\"> </p>"), D = v("<p> </p>"), O = v("<div><!> <div class=\"min-w-0 flex-1\"><!> <!> <!></div></div>");
function k(v, x) {
	t(x, !0);
	let k = l(x, "variant", 3, "default"), A = m(x, T), j = g(() => x.icon === !1 ? void 0 : x.icon ?? C[k()]);
	var M = O();
	s(M, (e) => ({
		class: e,
		...A
	}), [() => b(S({ variant: k() }), x.class)]);
	var N = c(M), P = (e) => {
		{
			let t = g(() => w({ variant: k() }));
			y(e, {
				get icon() {
					return n(j);
				},
				get class() {
					return n(t);
				}
			});
		}
	};
	f(N, (e) => {
		n(j) && e(P);
	});
	var F = e(N, 2), I = c(F), L = (e) => {
		var t = E(), n = c(t, !0);
		r(t), o(() => h(n, x.title)), u(e, t);
	};
	f(I, (e) => {
		x.title && e(L);
	});
	var R = e(I, 2), z = (e) => {
		var t = D(), n = c(t, !0);
		r(t), o((e) => {
			d(t, 1, e), h(n, x.description);
		}, [() => _(b("opacity-80", x.title && "mt-1"))]), u(e, t);
	};
	f(R, (e) => {
		x.description && e(z);
	}), i(e(R, 2), () => x.children ?? p), r(F), r(M), u(v, M), a();
}
//#endregion
export { S as n, k as t };
