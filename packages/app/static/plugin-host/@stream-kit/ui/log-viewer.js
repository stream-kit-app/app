import { $ as e, $n as t, Dt as n, E as r, Gn as i, Hr as a, On as o, Qn as s, Qr as c, Vr as l, Wn as u, Yt as d, Zn as f, a as p, cn as m, cr as h, dt as g, jt as _, ln as ee, on as v, or as y, pr as b, pt as x, un as S } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as C } from "../../chunks/Icon-AeqJGRQj.js";
import { t as w } from "../../chunks/utils-DcMuIKIs.js";
import { a as T, m as E } from "../../chunks/input-B64LmkrK.js";
import { t as D } from "../../chunks/scroll-area-BdFM74vQ.js";
import { t as O } from "../../chunks/button-rY2iKe1u.js";
import "../../chunks/button-BWDTVjor.js";
import { i as te, n as ne } from "../../chunks/copy-button-DT1joJ0C.js";
//#region ../ui/src/lib/components/log-viewer/log-viewer.svelte
var k = S("<p class=\"mt-0.5 truncate text-xs text-dark-400\"> </p>"), A = S("<!> <span> </span>", 1), j = S("<span> </span> <span class=\"rounded bg-dark-900 px-1 py-0.25 font-mono text-xs text-dark-400\"> </span>", 1), M = S("<!> <span> </span> <span class=\"rounded bg-dark-900/60 px-1 py-0.25 font-mono text-xs text-dark-400\"> </span>", 1), N = S("<div class=\"flex h-full min-h-64 flex-col items-center justify-center px-4 py-12 text-center\"><div class=\"mb-3 rounded-full bg-dark-800 p-3 text-dark-500\"><!></div> <h4 class=\"font-sans text-sm font-semibold text-dark-200\"> </h4> <p class=\"mt-1 max-w-xs font-sans text-xs leading-relaxed text-dark-400\"> </p></div>"), P = S("<span> </span>"), re = S("<span>·</span>"), ie = S("<span class=\"font-sans text-xs text-dark-300\"><!> <!> <!></span>"), ae = S("<pre class=\"m-0 mt-1 overflow-x-auto rounded-lg border border-dark-800/40 bg-dark-950/40 p-2.5 font-mono text-xs text-dark-200\"><code> </code></pre>"), oe = S("<code class=\"block pr-8 font-mono text-xs break-all whitespace-pre-wrap text-dark-100\"> </code>"), se = S("<div><div class=\"absolute top-2 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100\"><!></div> <div class=\"mb-1 flex flex-wrap items-center gap-2\"><time class=\"font-mono text-xs text-dark-300 tabular-nums\"> </time> <div class=\"flex items-center gap-1\"><!> <span> </span></div> <!></div> <!></div>"), ce = S("<div></div>"), le = S("<!> <div aria-hidden=\"true\"></div>", 1), ue = S("<div><div class=\"flex items-center justify-between gap-3 border-b border-dark-800 pb-2\"><div class=\"min-w-0 flex-1\"><h3 class=\"truncate text-base font-semibold text-dark-50\"> </h3> <!></div> <!></div> <div class=\"flex flex-col gap-3\"><div class=\"flex flex-wrap items-center gap-2\"><!> <!></div> <div class=\"flex shrink-0 items-center gap-4\"><div class=\"w-48 sm:w-56\"><!></div> <div class=\"flex shrink-0 items-center gap-2\"><!></div></div></div> <!></div>");
function F(S, F) {
	a(F, !0);
	let de = p(F, "title", 3, "Action logs"), fe = p(F, "allLabel", 3, "All"), pe = p(F, "infoLabel", 3, "Info"), me = p(F, "warnLabel", 3, "Warning"), he = p(F, "errorLabel", 3, "Error"), ge = p(F, "debugLabel", 3, "Debug"), _e = p(F, "searchPlaceholder", 3, "Filter logs…"), ve = p(F, "autoScrollLabel", 3, "Auto-scroll"), ye = p(F, "clearLabel", 3, "Clear logs"), be = p(F, "copyLabel", 3, "Copy");
	p(F, "copiedLabel", 3, "Copied");
	let xe = p(F, "emptyLabel", 3, "No log entries yet."), Se = p(F, "emptyDescription", 3, "Run an action with a Log handler to see entries here."), Ce = p(F, "filteredEmptyLabel", 3, "No matching logs"), we = p(F, "filteredEmptyDescription", 3, "No logs match your current filter or search criteria."), I = h("all"), L = h(""), R = h(!0), z = h(null), B = h(void 0), V = b(() => {
		let e = 0, t = 0, n = 0, r = 0;
		for (let i of F.entries) i.level === "info" ? e++ : i.level === "warn" ? t++ : i.level === "error" ? n++ : i.level === "debug" && r++;
		return {
			all: F.entries.length,
			info: e,
			warn: t,
			error: n,
			debug: r
		};
	}), H = b(() => {
		let e = F.entries;
		o(I) !== "all" && (e = e.filter((e) => e.level === o(I)));
		let t = o(L).trim().toLowerCase();
		t && (e = e.filter((e) => e.message.toLowerCase().includes(t) || e.actionName?.toLowerCase().includes(t) || e.trigger?.toLowerCase().includes(t)));
		let n = /* @__PURE__ */ new Set();
		return e.filter((e) => n.has(e.id) ? !1 : (n.add(e.id), !0));
	}), U = {
		info: "ri:information-line",
		warn: "ri:alert-line",
		error: "ri:error-warning-line",
		debug: "ri:bug-line"
	}, Te = {
		info: "border-l-2 border-primary-400/60 bg-primary-500/5 hover:bg-primary-500/10",
		warn: "border-l-2 border-warning-500/60 bg-warning-500/5 hover:bg-warning-500/10",
		error: "border-l-2 border-destructive-500/60 bg-destructive-500/5 hover:bg-destructive-500/10",
		debug: "border-l-2 border-dark-500 bg-dark-500/5 hover:bg-dark-500/10"
	}, W = {
		info: "text-primary-300",
		warn: "text-warning-300",
		error: "text-destructive-300",
		debug: "text-dark-300"
	}, Ee = {
		info: "border-primary-500/40 bg-primary-500/15 font-semibold text-primary-300",
		warn: "border-warning-500/40 bg-warning-500/15 font-semibold text-warning-300",
		error: "border-destructive-500/40 bg-destructive-500/15 font-semibold text-destructive-300",
		debug: "border-dark-500/40 bg-dark-500/20 font-semibold text-dark-300"
	}, De = {
		info: "text-primary-400",
		warn: "text-warning-400",
		error: "text-destructive-400",
		debug: "text-dark-400"
	}, G = b(() => ({
		info: pe(),
		warn: me(),
		error: he(),
		debug: ge()
	}));
	function Oe(e) {
		return new Date(e).toLocaleTimeString(void 0, {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			fractionalSecondDigits: 3
		});
	}
	function ke(e) {
		try {
			return JSON.stringify(JSON.parse(e), null, 2);
		} catch {
			return null;
		}
	}
	let K;
	function Ae(e, t) {
		navigator.clipboard.writeText(t).then(() => {
			y(z, e, !0), K && clearTimeout(K), K = setTimeout(() => {
				o(z) === e && y(z, null), K = void 0;
			}, 2e3);
		});
	}
	d(() => {
		K && clearTimeout(K);
	});
	let je = (e) => {
		y(L, e.currentTarget.value, !0);
	};
	i(() => {
		o(H), o(R) && o(B)?.scrollIntoView({ block: "end" });
	});
	var q = ue(), J = f(q), Y = f(J), X = f(Y), Me = f(X, !0);
	c(X);
	var Ne = t(X, 2), Pe = (e) => {
		var t = k(), n = f(t, !0);
		c(t), u(() => v(n, F.subtitle)), m(e, t);
	};
	_(Ne, (e) => {
		F.subtitle && e(Pe);
	}), c(Y);
	var Fe = t(Y, 2), Ie = (e) => {
		O(e, {
			type: "button",
			variant: "outline",
			size: "sm",
			get onclick() {
				return F.onClear;
			},
			class: "flex items-center gap-1.5",
			children: (e, n) => {
				var r = A(), i = s(r);
				C(i, {
					icon: "ri:delete-bin-line",
					class: "size-4"
				});
				var a = t(i, 2), o = f(a, !0);
				c(a), u(() => v(o, ye())), m(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	_(Fe, (e) => {
		F.onClear && e(Ie);
	}), c(J);
	var Z = t(J, 2), Q = f(Z), Le = f(Q);
	{
		let e = b(() => w("flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors", o(I) === "all" ? "border-dark-500 bg-dark-600 font-semibold text-dark-50" : "border-dark-700/60 bg-dark-800/40 text-dark-300 hover:bg-dark-700 hover:text-dark-100"));
		O(Le, {
			type: "button",
			variant: "outline",
			size: "sm",
			get class() {
				return o(e);
			},
			onclick: () => y(I, "all"),
			children: (e, n) => {
				var r = j(), i = s(r), a = f(i, !0);
				c(i);
				var l = t(i, 2), d = f(l, !0);
				c(l), u(() => {
					v(a, fe()), v(d, o(V).all);
				}), m(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	n(t(Le, 2), 16, () => [
		"info",
		"warn",
		"error",
		"debug"
	], (e) => e, (e, n) => {
		let r = b(() => n);
		{
			let n = b(() => w("flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors", o(I) === o(r) ? Ee[o(r)] : "border-dark-700/60 bg-dark-800/40 text-dark-300 hover:bg-dark-700 hover:text-dark-100"));
			O(e, {
				type: "button",
				variant: "outline",
				size: "sm",
				get class() {
					return o(n);
				},
				onclick: () => y(I, o(r), !0),
				children: (e, n) => {
					var i = M(), a = s(i);
					{
						let e = b(() => w("size-3.5", De[o(r)]));
						C(a, {
							get icon() {
								return U[o(r)];
							},
							get class() {
								return o(e);
							}
						});
					}
					var l = t(a, 2), d = f(l, !0);
					c(l);
					var p = t(l, 2), h = f(p, !0);
					c(p), u(() => {
						v(d, o(G)[o(r)]), v(h, o(V)[o(r)]);
					}), m(e, i);
				},
				$$slots: { default: !0 }
			});
		}
	}), c(Q);
	var Re = t(Q, 2), $ = f(Re);
	E(f($), {
		get placeholder() {
			return _e();
		},
		prependIcon: "ri:search-line",
		get value() {
			return o(L);
		},
		oninput: je,
		size: "sm"
	}), c($);
	var ze = t($, 2);
	T(f(ze), {
		get label() {
			return ve();
		},
		get checked() {
			return o(R);
		},
		set checked(e) {
			y(R, e, !0);
		}
	}), c(ze), c(Re), c(Z), D(t(Z, 2), {
		orientation: "vertical",
		class: "h-full min-h-0 overflow-hidden rounded-xl border border-rule bg-dark-900 font-mono text-sm leading-normal shadow-inner",
		viewportClasses: "h-full",
		children: (i, a) => {
			var l = le(), d = s(l), p = (e) => {
				var n = N(), r = f(n);
				C(f(r), {
					icon: "ri:bubble-chart-line",
					class: "size-8"
				}), c(r);
				var i = t(r, 2), a = f(i, !0);
				c(i);
				var o = t(i, 2), s = f(o, !0);
				c(o), c(n), u(() => {
					v(a, xe()), v(s, Se());
				}), m(e, n);
			}, h = (e) => {
				var n = N(), r = f(n);
				C(f(r), {
					icon: "ri:search-eye-line",
					class: "size-8"
				}), c(r);
				var i = t(r, 2), a = f(i, !0);
				c(i);
				var o = t(i, 2), s = f(o, !0);
				c(o), c(n), u(() => {
					v(a, Ce()), v(s, we());
				}), m(e, n);
			}, S = (r) => {
				var i = ce();
				n(i, 21, () => o(H), (e) => e.id, (n, r) => {
					let i = b(() => ke(o(r).message) ?? o(r).message), a = b(() => o(i).includes("\n"));
					var l = se(), d = f(l);
					O(f(d), {
						type: "button",
						variant: "outline",
						size: "icon-sm",
						class: "flex size-7 cursor-pointer items-center justify-center rounded-md border border-dark-700 bg-dark-800 text-dark-400 shadow-md transition-all hover:bg-dark-700 hover:text-dark-100",
						get title() {
							return be();
						},
						onclick: () => Ae(o(r).id, o(r).message),
						children: (e, t) => {
							var n = ee(), i = s(n), a = (e) => {
								C(e, {
									get icon() {
										return ne;
									},
									class: "size-4 text-success-400"
								});
							}, c = (e) => {
								C(e, {
									get icon() {
										return te;
									},
									class: "size-4"
								});
							};
							_(i, (e) => {
								o(z) === o(r).id ? e(a) : e(c, -1);
							}), m(e, n);
						},
						$$slots: { default: !0 }
					}), c(d);
					var p = t(d, 2), h = f(p), y = f(h, !0);
					c(h);
					var S = t(h, 2), T = f(S);
					{
						let e = b(() => w("size-3.5", W[o(r).level]));
						C(T, {
							get icon() {
								return U[o(r).level];
							},
							get class() {
								return o(e);
							}
						});
					}
					var E = t(T, 2), D = f(E, !0);
					c(E), c(S);
					var k = t(S, 2), A = (e) => {
						var n = ie(), i = f(n), a = (e) => {
							var t = P(), n = f(t, !0);
							c(t), u(() => v(n, o(r).actionName)), m(e, t);
						};
						_(i, (e) => {
							o(r).actionName && e(a);
						});
						var s = t(i, 2), l = (e) => {
							m(e, re());
						};
						_(s, (e) => {
							o(r).actionName && o(r).trigger && e(l);
						});
						var d = t(s, 2), p = (e) => {
							var t = P(), n = f(t, !0);
							c(t), u(() => v(n, o(r).trigger)), m(e, t);
						};
						_(d, (e) => {
							o(r).trigger && e(p);
						}), c(n), m(e, n);
					};
					_(k, (e) => {
						(o(r).actionName || o(r).trigger) && e(A);
					}), c(p);
					var j = t(p, 2), M = (e) => {
						var t = ae(), n = f(t), r = f(n, !0);
						c(n), c(t), u(() => v(r, o(i))), m(e, t);
					}, N = (e) => {
						var t = oe(), n = f(t, !0);
						c(t), u(() => v(n, o(i))), m(e, t);
					};
					_(j, (e) => {
						o(a) ? e(M) : e(N, -1);
					}), c(l), u((t, n, i, a) => {
						g(l, 1, t), e(h, "datetime", n), v(y, i), g(E, 1, a), v(D, o(G)[o(r).level]);
					}, [
						() => x(w("group relative border-b border-dark-800/60 px-4 py-2 transition-colors last:border-b-0", Te[o(r).level])),
						() => new Date(o(r).timestamp).toISOString(),
						() => Oe(o(r).timestamp),
						() => x(w("text-xs font-bold tracking-wider uppercase", W[o(r).level]))
					]), m(n, l);
				}), c(i), m(r, i);
			};
			_(d, (e) => {
				F.entries.length === 0 ? e(p) : o(H).length === 0 ? e(h, 1) : e(S, -1);
			}), r(t(d, 2), (e) => y(B, e), () => o(B)), m(i, l);
		},
		$$slots: { default: !0 }
	}), c(q), u((e) => {
		g(q, 1, e), v(Me, de());
	}, [() => x(w("grid h-[calc(100dvh-8rem)] min-h-72 grid-rows-[auto_auto_minmax(0,1fr)] gap-4", F.class))]), m(S, q), l();
}
//#endregion
export { F as LogViewer };
