import { $n as e, Gt as t, Hr as n, Mt as r, On as i, Qr as a, Vr as o, Wn as s, Zn as c, bt as l, f as u, in as d, it as f, ni as p, nn as m, on as h, p as g, pr as _, vt as v } from "./index-client-BIJQxc2l.js";
import "./disclose-version-YhYaTdgb.js";
import { t as y } from "./Icon-BoHmh-pv.js";
import { t as b } from "./utils-DVQ4nj8f.js";
import { t as x } from "./dist-3jIr5VNH.js";
//#region ../ui/src/lib/components/alert/alert-variants.ts
var S = x({
	base: "flex items-start gap-3 rounded-lg border p-4 text-sm",
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
]), E = h("<p class=\"font-semibold\"> </p>"), D = h("<p> </p>"), O = h("<div><!> <div class=\"min-w-0 flex-1\"><!> <!> <!></div></div>");
function k(h, x) {
	n(x, !0);
	let k = u(x, "variant", 3, "default"), A = g(x, T), j = _(() => x.icon === !1 ? void 0 : x.icon ?? C[k()]);
	var M = O();
	f(M, (e) => ({
		class: e,
		...A
	}), [() => b(S({ variant: k() }), x.class)]);
	var N = c(M), P = (e) => {
		{
			let t = _(() => w({ variant: k() }));
			y(e, {
				get icon() {
					return i(j);
				},
				get class() {
					return i(t);
				}
			});
		}
	};
	t(N, (e) => {
		i(j) && e(P);
	});
	var F = e(N, 2), I = c(F), L = (e) => {
		var t = E(), n = c(t, !0);
		a(t), s(() => m(n, x.title)), d(e, t);
	};
	t(I, (e) => {
		x.title && e(L);
	});
	var R = e(I, 2), z = (e) => {
		var t = D(), n = c(t, !0);
		a(t), s((e) => {
			v(t, 1, e), m(n, x.description);
		}, [() => l(b("opacity-80", x.title && "mt-1"))]), d(e, t);
	};
	t(R, (e) => {
		x.description && e(z);
	}), r(e(R, 2), () => x.children ?? p), a(F), a(M), d(h, M), o();
}
//#endregion
export { S as n, k as t };
