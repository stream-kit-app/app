import "../../chunks/input-CJbU7cdF.js";
import { $n as e, Gt as t, Hr as n, On as r, Qn as i, Qr as a, Vr as o, Vt as s, Wn as c, Zn as l, bt as u, cr as d, f, hn as p, in as m, m as h, mn as g, nn as _, on as v, or as y, ot as b, vt as x } from "../../chunks/index-client-BHp3UA-q.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as S } from "../../chunks/Icon-CzS4be53.js";
import { t as C } from "../../chunks/utils-CRERhYYg.js";
import { i as w, n as T, r as E } from "../../chunks/popover-D_Gbpl1X.js";
import { t as D } from "../../chunks/scroll-area-D4RE1kQW.js";
import { t as O } from "../../chunks/button-DWJNkhZM.js";
//#region ../ui/src/lib/components/variable-popover/variable-popover.svelte
var k = v("<p class=\"text-xs font-semibold text-dark-200\"> </p>"), A = v("<p class=\"py-2 text-xs text-dark-400\"> </p>"), j = v("<li><button type=\"button\"><div class=\"flex min-w-0 flex-1 items-center gap-2.5\"><span class=\"shrink-0 rounded border border-primary-300 bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary transition-all duration-150 group-hover:border-primary-500/20 group-hover:bg-primary-500/15\"> </span> <span class=\"min-w-0 truncate text-dark-300 transition-colors duration-150 group-hover:text-dark-100\"> </span></div> <div class=\"flex size-4 shrink-0 items-center justify-center\"><!></div></button></li>"), M = v("<ul class=\"grid gap-1\"></ul>"), N = v("<div class=\"mb-3 flex flex-col gap-2\"><!></div> <!>", 1), P = v("<!> <!>", 1);
function F(g, v) {
	n(v, !0);
	let F = f(v, "title", 3, "Variables"), I = f(v, "emptyLabel", 3, "No variables available."), L = f(v, "ariaLabel", 3, "Show variables"), R = f(v, "copiedLabel", 3, "Copied");
	f(v, "noResultsLabel", 3, "No variables match your search.");
	let z = f(v, "icon", 3, "ri:braces-line"), B = d(null);
	function V(e) {
		navigator.clipboard.writeText(`{${e}}`).then(() => {
			y(B, e, !0), setTimeout(() => {
				r(B) === e && y(B, null);
			}, 2e3);
		});
	}
	T(g, {
		children: (n, o) => {
			var d = P(), f = i(d);
			E(f, {
				child: (e, t) => {
					O(e, h(() => t?.().props, {
						type: "button",
						variant: "ghost",
						size: "icon-sm",
						get icon() {
							return z();
						},
						get "aria-label"() {
							return L();
						},
						class: "size-7 text-dark-400 hover:text-dark-100"
					}));
				},
				$$slots: { child: !0 }
			}), w(e(f, 2), {
				align: "start",
				class: "w-80 p-4",
				children: (n, o) => {
					var d = N(), f = i(d), h = l(f), g = (e) => {
						var t = k(), n = l(t, !0);
						a(t), c(() => _(n, F())), m(e, t);
					};
					t(h, (e) => {
						F() && e(g);
					}), a(f);
					var y = e(f, 2), w = (e) => {
						var t = A(), n = l(t, !0);
						a(t), c(() => _(n, I())), m(e, t);
					}, T = (n) => {
						D(n, {
							orientation: "vertical",
							viewportClasses: "max-h-48 overflow-hidden",
							children: (n, i) => {
								var o = M();
								s(o, 21, () => v.variables, (e) => e.key, (n, i) => {
									var o = j(), s = l(o), d = l(s), f = l(d), h = l(f, !0);
									a(f);
									var g = e(f, 2), v = l(g, !0);
									a(g), a(d);
									var y = e(d, 2), w = l(y), T = (e) => {
										S(e, {
											icon: "ri:check-line",
											class: "size-3.5 text-success-400"
										});
									}, E = (e) => {
										S(e, {
											icon: "ri:file-copy-line",
											class: "size-3.5 text-dark-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
										});
									};
									t(w, (e) => {
										r(B) === r(i).key ? e(T) : e(E, -1);
									}), a(y), a(s), a(o), c((e) => {
										x(s, 1, e), b(s, "title", R()), _(h, `{${r(i).key}}`), _(v, r(i).label);
									}, [() => u(C("group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-transparent px-2.5 py-2 text-left text-xs transition-all duration-150 hover:border-dark-600/30 hover:bg-dark-700/50"))]), p("click", s, () => V(r(i).key)), m(n, o);
								}), a(o), m(n, o);
							},
							$$slots: { default: !0 }
						});
					};
					t(y, (e) => {
						v.variables.length === 0 ? e(w) : e(T, -1);
					}), m(n, d);
				},
				$$slots: { default: !0 }
			}), m(n, d);
		},
		$$slots: { default: !0 }
	}), o();
}
g(["click"]);
//#endregion
export { F as VariablePopover };
