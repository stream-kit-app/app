import { $n as e, Dt as t, Hr as n, On as r, Qr as i, Qt as a, Vr as o, Wn as s, Zn as c, a as l, cn as u, dt as d, jt as f, on as p, pr as m, pt as h, un as g } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as _ } from "../../chunks/utils-DJt177zd.js";
import { t as v } from "../../chunks/scroll-area-7qg9ezvn.js";
//#region ../ui/src/lib/components/data-table/data-table.svelte
var y = g("<div class=\"border-b border-dark-700/80 px-4 py-3\"><h3 class=\"text-base font-semibold text-dark-50\"> </h3></div>"), b = g("<th> </th>"), x = g("<td><!></td>"), S = g("<tr class=\"transition-colors hover:bg-dark-700/40\"></tr>"), C = g("<table class=\"min-w-full text-sm\"><thead class=\"sticky top-0 z-10 border-b border-dark-600 bg-dark-900\"><tr></tr></thead><tbody class=\"divide-y divide-dark-700/80\"></tbody></table>"), w = g("<div class=\"bg-dark-900/50\"><!></div>"), T = g("<p class=\"mt-1 text-sm text-dark-400\"> </p>"), E = g("<div class=\"bg-dark-900/50 px-4 py-10 text-center\"><p class=\"text-sm font-medium text-dark-300\"> </p> <!></div>"), D = g("<section><!> <!></section>");
function O(g, O) {
	n(O, !0);
	let k = l(O, "maxHeight", 3, "max-h-96");
	function A(e = "left") {
		return e === "center" ? "text-center" : e === "right" ? "text-right" : "text-left";
	}
	var j = D(), M = c(j), N = (e) => {
		var t = y(), n = c(t), r = c(n, !0);
		i(n), i(t), s(() => p(r, O.title)), u(e, t);
	};
	f(M, (e) => {
		O.title && e(N);
	});
	var P = e(M, 2), F = (n) => {
		var o = w(), l = c(o);
		{
			let n = m(() => _("w-full overflow-hidden", k()));
			v(l, {
				orientation: "vertical",
				class: "overflow-hidden",
				get viewportClasses() {
					return r(n);
				},
				children: (n, o) => {
					var l = C(), f = c(l), m = c(f);
					t(m, 21, () => O.columns, (e) => e.id, (e, t) => {
						var n = b(), a = c(n, !0);
						i(n), s((e) => {
							d(n, 1, e), p(a, r(t).header);
						}, [() => h(_("px-4 py-2.5 text-xs font-extrabold tracking-wide text-dark-400 uppercase", A(r(t).align), r(t).class))]), u(e, n);
					}), i(m), i(f);
					var g = e(f);
					t(g, 21, () => O.data, (e) => O.getRowKey(e), (e, n) => {
						var o = S();
						t(o, 21, () => O.columns, (e) => e.id, (e, t) => {
							var o = x();
							a(c(o), () => r(t).cell, () => r(n)), i(o), s((e) => d(o, 1, e), [() => h(_("px-4 py-2.5 text-dark-200", A(r(t).align), r(t).class))]), u(e, o);
						}), i(o), u(e, o);
					}), i(g), i(l), u(n, l);
				},
				$$slots: { default: !0 }
			});
		}
		i(o), u(n, o);
	}, I = (t) => {
		var n = E(), r = c(n), a = c(r, !0);
		i(r);
		var o = e(r, 2), l = (e) => {
			var t = T(), n = c(t, !0);
			i(t), s(() => p(n, O.emptyDescription)), u(e, t);
		};
		f(o, (e) => {
			O.emptyDescription && e(l);
		}), i(n), s(() => p(a, O.empty)), u(t, n);
	};
	f(P, (e) => {
		O.data.length > 0 ? e(F) : e(I, -1);
	}), i(j), s((e) => d(j, 1, e), [() => h(_("overflow-hidden rounded-xl border border-dark-600 bg-dark-800", O.class))]), u(g, j), o();
}
//#endregion
export { O as DataTable };
