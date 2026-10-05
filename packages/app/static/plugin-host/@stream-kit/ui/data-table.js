import { Bn as e, Ct as t, Dn as n, Dr as r, Hr as i, Lt as a, Sn as o, Ur as s, Vt as c, a as l, bn as u, ei as d, hn as f, lr as p, nr as m, sn as h, sr as g, ti as _, ur as v, xt as y } from "../../chunks/client-BFeMv2Ma.js";
import { t as b } from "../../chunks/utils-Dqp4W1j8.js";
import "../../chunks/disclose-version-CI8I6yeK.js";
import { t as x } from "../../chunks/scroll-area-DXaKUX2U.js";
import { a as S } from "../../chunks/blueprint-BpxI9dH_.js";
//#region ../ui/src/lib/components/data-table/data-table.svelte
var C = o("<div class=\"border-b border-rule px-4 py-3\"><!></div>"), w = o("<th> </th>"), T = o("<td><!></td>"), E = o("<tr class=\"transition-colors hover:bg-dark-700/40\"></tr>"), D = o("<table class=\"min-w-full text-sm\"><thead class=\"sticky top-0 z-10 border-b border-rule bg-background\"><tr></tr></thead><tbody class=\"divide-y divide-rule\"></tbody></table>"), O = o("<p class=\"mt-1 text-sm text-dark-400\"> </p>"), k = o("<div class=\"px-4 py-10 text-center\"><p class=\"text-sm font-medium text-dark-300\"> </p> <!></div>"), A = o("<section><!> <!></section>");
function j(o, j) {
	s(j, !0);
	let M = l(j, "maxHeight", 3, "max-h-96");
	function N(e = "left") {
		return e === "center" ? "text-center" : e === "right" ? "text-right" : "text-left";
	}
	var P = A(), F = g(P), I = (e) => {
		var t = C(), r = g(t);
		S(r, {
			children: (e, t) => {
				d();
				var r = n();
				m(() => f(r, j.title)), u(e, r);
			},
			$$slots: { default: !0 }
		}), _(t), u(e, t);
	};
	c(F, (e) => {
		j.title && e(I);
	});
	var L = v(F, 2), R = (n) => {
		{
			let i = r(() => b("w-full overflow-hidden", M()));
			x(n, {
				orientation: "vertical",
				class: "overflow-hidden",
				get viewportClasses() {
					return e(i);
				},
				children: (n, r) => {
					var i = D(), o = g(i), s = g(o);
					a(s, 21, () => j.columns, (e) => e.id, (n, r) => {
						var i = w(), a = p(i, !0);
						m((t) => {
							y(i, 1, t), f(a, e(r).header);
						}, [() => t(b("px-4 py-2.5 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase", N(e(r).align), e(r).class))]), u(n, i);
					}), _(s), _(o);
					var c = v(o);
					a(c, 21, () => j.data, (e) => j.getRowKey(e), (n, r) => {
						var i = E();
						a(i, 21, () => j.columns, (e) => e.id, (n, i) => {
							var a = T(), o = g(a);
							h(o, () => e(i).cell, () => e(r)), _(a), m((e) => y(a, 1, e), [() => t(b("px-4 py-2.5 text-dark-200", N(e(i).align), e(i).class))]), u(n, a);
						}), _(i), u(n, i);
					}), _(c), _(i), u(n, i);
				},
				$$slots: { default: !0 }
			});
		}
	}, z = (e) => {
		var t = k(), n = g(t), r = p(n, !0), i = v(n, 2), a = (e) => {
			var t = O(), n = p(t, !0);
			m(() => f(n, j.emptyDescription)), u(e, t);
		};
		c(i, (e) => {
			j.emptyDescription && e(a);
		}), _(t), m(() => f(r, j.empty)), u(e, t);
	};
	c(L, (e) => {
		j.data.length > 0 ? e(R) : e(z, -1);
	}), _(P), m((e) => y(P, 1, e), [() => t(b("overflow-hidden rounded-xl border border-rule", j.class))]), u(o, P), i();
}
//#endregion
export { j as DataTable };
