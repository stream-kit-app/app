import { $n as e, Dt as t, Hr as n, On as r, Qr as i, Qt as a, Vr as o, Wn as s, Zn as c, Zr as l, a as u, cn as d, dt as f, hn as p, jt as m, on as h, pr as g, pt as _, un as v } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as y } from "../../chunks/utils-DJt177zd.js";
import { t as b } from "../../chunks/scroll-area-BdFM74vQ.js";
import { a as x } from "../../chunks/blueprint-qjjnrFIJ.js";
//#region ../ui/src/lib/components/data-table/data-table.svelte
var S = v("<div class=\"border-b border-rule px-4 py-3\"><!></div>"), C = v("<th> </th>"), w = v("<td><!></td>"), T = v("<tr class=\"transition-colors hover:bg-dark-700/40\"></tr>"), E = v("<table class=\"min-w-full text-sm\"><thead class=\"sticky top-0 z-10 border-b border-rule bg-background\"><tr></tr></thead><tbody class=\"divide-y divide-rule\"></tbody></table>"), D = v("<p class=\"mt-1 text-sm text-dark-400\"> </p>"), O = v("<div class=\"px-4 py-10 text-center\"><p class=\"text-sm font-medium text-dark-300\"> </p> <!></div>"), k = v("<section><!> <!></section>");
function A(v, A) {
	n(A, !0);
	let j = u(A, "maxHeight", 3, "max-h-96");
	function M(e = "left") {
		return e === "center" ? "text-center" : e === "right" ? "text-right" : "text-left";
	}
	var N = k(), P = c(N), F = (e) => {
		var t = S();
		x(c(t), {
			children: (e, t) => {
				l();
				var n = p();
				s(() => h(n, A.title)), d(e, n);
			},
			$$slots: { default: !0 }
		}), i(t), d(e, t);
	};
	m(P, (e) => {
		A.title && e(F);
	});
	var I = e(P, 2), L = (n) => {
		{
			let o = g(() => y("w-full overflow-hidden", j()));
			b(n, {
				orientation: "vertical",
				class: "overflow-hidden",
				get viewportClasses() {
					return r(o);
				},
				children: (n, o) => {
					var l = E(), u = c(l), p = c(u);
					t(p, 21, () => A.columns, (e) => e.id, (e, t) => {
						var n = C(), a = c(n, !0);
						i(n), s((e) => {
							f(n, 1, e), h(a, r(t).header);
						}, [() => _(y("px-4 py-2.5 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase", M(r(t).align), r(t).class))]), d(e, n);
					}), i(p), i(u);
					var m = e(u);
					t(m, 21, () => A.data, (e) => A.getRowKey(e), (e, n) => {
						var o = T();
						t(o, 21, () => A.columns, (e) => e.id, (e, t) => {
							var o = w();
							a(c(o), () => r(t).cell, () => r(n)), i(o), s((e) => f(o, 1, e), [() => _(y("px-4 py-2.5 text-dark-200", M(r(t).align), r(t).class))]), d(e, o);
						}), i(o), d(e, o);
					}), i(m), i(l), d(n, l);
				},
				$$slots: { default: !0 }
			});
		}
	}, R = (t) => {
		var n = O(), r = c(n), a = c(r, !0);
		i(r);
		var o = e(r, 2), l = (e) => {
			var t = D(), n = c(t, !0);
			i(t), s(() => h(n, A.emptyDescription)), d(e, t);
		};
		m(o, (e) => {
			A.emptyDescription && e(l);
		}), i(n), s(() => h(a, A.empty)), d(t, n);
	};
	m(I, (e) => {
		A.data.length > 0 ? e(L) : e(R, -1);
	}), i(N), s((e) => f(N, 1, e), [() => _(y("overflow-hidden rounded-none border border-rule", A.class))]), d(v, N), o();
}
//#endregion
export { A as DataTable };
