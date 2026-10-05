import { Bn as e, Ct as t, Dr as n, F as r, Hr as i, Lt as a, Sn as o, Ur as s, Vt as c, _r as l, a as u, bn as d, cr as f, ct as ee, hn as p, in as m, lr as h, nr as g, rr as _, sr as v, ti as y, ur as b, xn as te, xt as x, yr as S } from "../../chunks/client-BFeMv2Ma.js";
import { t as C } from "../../chunks/utils-Dqp4W1j8.js";
import "../../chunks/disclose-version-CI8I6yeK.js";
import { t as w } from "../../chunks/Icon-Ct61sPxO.js";
import { a as T, m as E } from "../../chunks/input-DfxJLt7h.js";
import { t as D } from "../../chunks/scroll-area-DXaKUX2U.js";
import { t as O } from "../../chunks/button-DGOI4Wpk.js";
import "../../chunks/button-CBfuPA65.js";
import { i as ne, n as re } from "../../chunks/copy-button-Co0zzAIm.js";
//#region ../ui/src/lib/components/log-viewer/log-viewer.svelte
var k = o("<p class=\"mt-0.5 truncate text-xs text-dark-400\"> </p>"), A = o("<!> <span> </span>", 1), j = o("<span> </span> <span class=\"rounded bg-dark-900 px-1 py-0.25 font-mono text-xs text-dark-400\"> </span>", 1), ie = o("<!> <span> </span> <span class=\"rounded bg-dark-900/60 px-1 py-0.25 font-mono text-xs text-dark-400\"> </span>", 1), M = o("<div class=\"flex h-full min-h-64 flex-col items-center justify-center px-4 py-12 text-center\"><div class=\"mb-3 rounded-full bg-dark-800 p-3 text-dark-500\"><!></div> <h4 class=\"font-sans text-sm font-semibold text-dark-200\"> </h4> <p class=\"mt-1 max-w-xs font-sans text-xs leading-relaxed text-dark-400\"> </p></div>"), N = o("<span> </span>"), ae = o("<span>·</span>"), oe = o("<span class=\"font-sans text-xs text-dark-300\"><!> <!> <!></span>"), se = o("<pre class=\"m-0 mt-1 overflow-x-auto rounded-lg border border-dark-800/40 bg-dark-950/40 p-2.5 font-mono text-xs text-dark-200\"><code> </code></pre>"), ce = o("<code class=\"block pr-8 font-mono text-xs break-all whitespace-pre-wrap text-dark-100\"> </code>"), le = o("<div><div class=\"absolute top-2 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100\"><!></div> <div class=\"mb-1 flex flex-wrap items-center gap-2\"><time class=\"font-mono text-xs text-dark-300 tabular-nums\"> </time> <div class=\"flex items-center gap-1\"><!> <span> </span></div> <!></div> <!></div>"), P = o("<div></div>"), ue = o("<!> <div aria-hidden=\"true\"></div>", 1), de = o("<div><div class=\"flex items-center justify-between gap-3 border-b border-dark-800 pb-2\"><div class=\"min-w-0 flex-1\"><h3 class=\"truncate text-base font-semibold text-dark-50\"> </h3> <!></div> <!></div> <div class=\"flex flex-col gap-3\"><div class=\"flex flex-wrap items-center gap-2\"><!> <!></div> <div class=\"flex shrink-0 items-center gap-4\"><div class=\"w-48 sm:w-56\"><!></div> <div class=\"flex shrink-0 items-center gap-2\"><!></div></div></div> <!></div>");
function F(o, F) {
	s(F, !0);
	let fe = u(F, "title", 3, "Action logs"), pe = u(F, "allLabel", 3, "All"), me = u(F, "infoLabel", 3, "Info"), he = u(F, "warnLabel", 3, "Warning"), ge = u(F, "errorLabel", 3, "Error"), _e = u(F, "debugLabel", 3, "Debug"), ve = u(F, "searchPlaceholder", 3, "Filter logs…"), ye = u(F, "autoScrollLabel", 3, "Auto-scroll"), be = u(F, "clearLabel", 3, "Clear logs"), xe = u(F, "copyLabel", 3, "Copy");
	u(F, "copiedLabel", 3, "Copied");
	let Se = u(F, "emptyLabel", 3, "No log entries yet."), Ce = u(F, "emptyDescription", 3, "Run an action with a Log handler to see entries here."), we = u(F, "filteredEmptyLabel", 3, "No matching logs"), Te = u(F, "filteredEmptyDescription", 3, "No logs match your current filter or search criteria."), I = S("all"), L = S(""), R = S(!0), z = S(null), B = S(void 0), V = n(() => {
		let e = 0, t = 0, n = 0, r = 0;
		for (let i of F.entries) i.level === "info" ? e++ : i.level === "warn" ? t++ : i.level === "error" ? n++ : i.level === "debug" && r++;
		return {
			all: F.entries.length,
			info: e,
			warn: t,
			error: n,
			debug: r
		};
	}), H = n(() => {
		let t = F.entries;
		e(I) !== "all" && (t = t.filter((t) => t.level === e(I)));
		let n = e(L).trim().toLowerCase();
		n && (t = t.filter((e) => e.message.toLowerCase().includes(n) || e.actionName?.toLowerCase().includes(n) || e.trigger?.toLowerCase().includes(n)));
		let r = /* @__PURE__ */ new Set();
		return t.filter((e) => !r.has(e.id) && (r.add(e.id), !0));
	}), U = {
		info: "ri:information-line",
		warn: "ri:alert-line",
		error: "ri:error-warning-line",
		debug: "ri:bug-line"
	}, Ee = {
		info: "border-l-2 border-primary-400/60 bg-primary-500/5 hover:bg-primary-500/10",
		warn: "border-l-2 border-warning-500/60 bg-warning-500/5 hover:bg-warning-500/10",
		error: "border-l-2 border-destructive-500/60 bg-destructive-500/5 hover:bg-destructive-500/10",
		debug: "border-l-2 border-dark-500 bg-dark-500/5 hover:bg-dark-500/10"
	}, W = {
		info: "text-primary-300",
		warn: "text-warning-300",
		error: "text-destructive-300",
		debug: "text-dark-300"
	}, De = {
		info: "border-primary-500/40 bg-primary-500/15 font-semibold text-primary-300",
		warn: "border-warning-500/40 bg-warning-500/15 font-semibold text-warning-300",
		error: "border-destructive-500/40 bg-destructive-500/15 font-semibold text-destructive-300",
		debug: "border-dark-500/40 bg-dark-500/20 font-semibold text-dark-300"
	}, Oe = {
		info: "text-primary-400",
		warn: "text-warning-400",
		error: "text-destructive-400",
		debug: "text-dark-400"
	}, G = n(() => ({
		info: me(),
		warn: he(),
		error: ge(),
		debug: _e()
	}));
	function ke(e) {
		return new Date(e).toLocaleTimeString(void 0, {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			fractionalSecondDigits: 3
		});
	}
	function Ae(e) {
		try {
			return JSON.stringify(JSON.parse(e), null, 2);
		} catch {
			return null;
		}
	}
	let K;
	function je(t, n) {
		navigator.clipboard.writeText(n).then(() => {
			l(z, t, !0), K && clearTimeout(K), K = setTimeout(() => {
				e(z) === t && l(z, null), K = void 0;
			}, 2e3);
		});
	}
	m(() => {
		K && clearTimeout(K);
	});
	let Me = (e) => {
		l(L, e.currentTarget.value, !0);
	};
	_(() => {
		e(H), e(R) && e(B)?.scrollIntoView({ block: "end" });
	});
	var q = de(), J = v(q), Y = v(J), X = v(Y), Ne = h(X, !0), Pe = b(X, 2), Fe = (e) => {
		var t = k(), n = h(t, !0);
		g(() => p(n, F.subtitle)), d(e, t);
	};
	c(Pe, (e) => {
		F.subtitle && e(Fe);
	}), y(Y);
	var Ie = b(Y, 2), Le = (e) => {
		O(e, {
			type: "button",
			variant: "outline",
			size: "sm",
			get onclick() {
				return F.onClear;
			},
			class: "flex items-center gap-1.5",
			children: (e, t) => {
				var n = A(), r = f(n);
				w(r, {
					icon: "ri:delete-bin-line",
					class: "size-4"
				});
				var i = b(r, 2), a = h(i, !0);
				g(() => p(a, be())), d(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	c(Ie, (e) => {
		F.onClear && e(Le);
	}), y(J);
	var Z = b(J, 2), Q = v(Z), Re = v(Q);
	{
		let t = n(() => C("flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors", e(I) === "all" ? "border-dark-500 bg-dark-600 font-semibold text-dark-50" : "border-dark-700/60 bg-dark-800/40 text-dark-300 hover:bg-dark-700 hover:text-dark-100"));
		O(Re, {
			type: "button",
			variant: "outline",
			size: "sm",
			get class() {
				return e(t);
			},
			onclick: () => l(I, "all"),
			children: (t, n) => {
				var r = j(), i = f(r), a = h(i, !0), o = b(i, 2), s = h(o, !0);
				g(() => {
					p(a, pe()), p(s, e(V).all);
				}), d(t, r);
			},
			$$slots: { default: !0 }
		});
	}
	var ze = b(Re, 2);
	a(ze, 16, () => [
		"info",
		"warn",
		"error",
		"debug"
	], (e) => e, (t, r) => {
		let i = n(() => r);
		{
			let r = n(() => C("flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors", e(I) === e(i) ? De[e(i)] : "border-dark-700/60 bg-dark-800/40 text-dark-300 hover:bg-dark-700 hover:text-dark-100"));
			O(t, {
				type: "button",
				variant: "outline",
				size: "sm",
				get class() {
					return e(r);
				},
				onclick: () => l(I, e(i), !0),
				children: (t, r) => {
					var a = ie(), o = f(a);
					{
						let t = n(() => C("size-3.5", Oe[e(i)]));
						w(o, {
							get icon() {
								return U[e(i)];
							},
							get class() {
								return e(t);
							}
						});
					}
					var s = b(o, 2), c = h(s, !0), l = b(s, 2), u = h(l, !0);
					g(() => {
						p(c, e(G)[e(i)]), p(u, e(V)[e(i)]);
					}), d(t, a);
				},
				$$slots: { default: !0 }
			});
		}
	}), y(Q);
	var Be = b(Q, 2), $ = v(Be), Ve = v($);
	E(Ve, {
		get placeholder() {
			return ve();
		},
		prependIcon: "ri:search-line",
		get value() {
			return e(L);
		},
		oninput: Me,
		size: "sm"
	}), y($);
	var He = b($, 2), Ue = v(He);
	T(Ue, {
		get label() {
			return ye();
		},
		get checked() {
			return e(R);
		},
		set checked(e) {
			l(R, e, !0);
		}
	}), y(He), y(Be), y(Z);
	var We = b(Z, 2);
	D(We, {
		orientation: "vertical",
		class: "h-full min-h-0 overflow-hidden rounded-xl border border-rule bg-dark-900 font-mono text-sm leading-normal shadow-inner",
		viewportClasses: "h-full",
		children: (i, o) => {
			var s = ue(), u = f(s), m = (e) => {
				var t = M(), n = v(t), r = v(n);
				w(r, {
					icon: "ri:bubble-chart-line",
					class: "size-8"
				}), y(n);
				var i = b(n, 2), a = h(i, !0), o = b(i, 2), s = h(o, !0);
				y(t), g(() => {
					p(a, Se()), p(s, Ce());
				}), d(e, t);
			}, _ = (e) => {
				var t = M(), n = v(t), r = v(n);
				w(r, {
					icon: "ri:search-eye-line",
					class: "size-8"
				}), y(n);
				var i = b(n, 2), a = h(i, !0), o = b(i, 2), s = h(o, !0);
				y(t), g(() => {
					p(a, we()), p(s, Te());
				}), d(e, t);
			}, S = (r) => {
				var i = P();
				a(i, 21, () => e(H), (e) => e.id, (r, i) => {
					let a = n(() => Ae(e(i).message) ?? e(i).message), o = n(() => e(a).includes("\n"));
					var s = le(), l = v(s), u = v(l);
					O(u, {
						type: "button",
						variant: "outline",
						size: "icon-sm",
						class: "flex size-7 cursor-pointer items-center justify-center rounded-md border border-dark-700 bg-dark-800 text-dark-400 shadow-md transition-all hover:bg-dark-700 hover:text-dark-100",
						get title() {
							return xe();
						},
						onclick: () => je(e(i).id, e(i).message),
						children: (t, n) => {
							var r = te(), a = f(r), o = (e) => {
								w(e, {
									get icon() {
										return re;
									},
									class: "size-4 text-success-400"
								});
							}, s = (e) => {
								w(e, {
									get icon() {
										return ne;
									},
									class: "size-4"
								});
							};
							c(a, (t) => {
								e(z) === e(i).id ? t(o) : t(s, -1);
							}), d(t, r);
						},
						$$slots: { default: !0 }
					}), y(l);
					var m = b(l, 2), _ = v(m), S = h(_, !0), T = b(_, 2), E = v(T);
					{
						let t = n(() => C("size-3.5", W[e(i).level]));
						w(E, {
							get icon() {
								return U[e(i).level];
							},
							get class() {
								return e(t);
							}
						});
					}
					var D = b(E, 2), k = h(D, !0);
					y(T);
					var A = b(T, 2), j = (t) => {
						var n = oe(), r = v(n), a = (t) => {
							var n = N(), r = h(n, !0);
							g(() => p(r, e(i).actionName)), d(t, n);
						};
						c(r, (t) => {
							e(i).actionName && t(a);
						});
						var o = b(r, 2), s = (e) => {
							var t = ae();
							d(e, t);
						};
						c(o, (t) => {
							e(i).actionName && e(i).trigger && t(s);
						});
						var l = b(o, 2), u = (t) => {
							var n = N(), r = h(n, !0);
							g(() => p(r, e(i).trigger)), d(t, n);
						};
						c(l, (t) => {
							e(i).trigger && t(u);
						}), y(n), d(t, n);
					};
					c(A, (t) => {
						(e(i).actionName || e(i).trigger) && t(j);
					}), y(m);
					var ie = b(m, 2), M = (t) => {
						var n = se(), r = v(n), i = h(r, !0);
						y(n), g(() => p(i, e(a))), d(t, n);
					}, P = (t) => {
						var n = ce(), r = h(n, !0);
						g(() => p(r, e(a))), d(t, n);
					};
					c(ie, (t) => {
						e(o) ? t(M) : t(P, -1);
					}), y(s), g((t, n, r, a) => {
						x(s, 1, t), ee(_, "datetime", n), p(S, r), x(D, 1, a), p(k, e(G)[e(i).level]);
					}, [
						() => t(C("group relative border-b border-dark-800/60 px-4 py-2 transition-colors last:border-b-0", Ee[e(i).level])),
						() => new Date(e(i).timestamp).toISOString(),
						() => ke(e(i).timestamp),
						() => t(C("text-xs font-bold tracking-wider uppercase", W[e(i).level]))
					]), d(r, s);
				}), y(i), d(r, i);
			};
			c(u, (t) => {
				F.entries.length === 0 ? t(m) : e(H).length === 0 ? t(_, 1) : t(S, -1);
			});
			var T = b(u, 2);
			r(T, (e) => l(B, e), () => e(B)), d(i, s);
		},
		$$slots: { default: !0 }
	}), y(q), g((e) => {
		x(q, 1, e), p(Ne, fe());
	}, [() => t(C("grid h-[calc(100dvh-8rem)] min-h-72 grid-rows-[auto_auto_minmax(0,1fr)] gap-4", F.class))]), d(o, q), i();
}
//#endregion
export { F as LogViewer };
