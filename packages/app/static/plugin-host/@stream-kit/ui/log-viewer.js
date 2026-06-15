import { a as e, u as t } from "../../chunks/input-CJbU7cdF.js";
import { $n as n, Gn as r, Gt as i, Hr as a, N as o, On as s, Qn as c, Qr as l, Vr as u, Vt as d, Wn as f, Zn as p, a as m, an as ee, bt as h, cr as g, f as _, in as v, nn as y, on as b, or as x, ot as te, pr as S, vt as C } from "../../chunks/index-client-BHp3UA-q.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as w } from "../../chunks/Icon-CzS4be53.js";
import { t as T } from "../../chunks/utils-CRERhYYg.js";
import { t as E } from "../../chunks/scroll-area-D4RE1kQW.js";
import { t as D } from "../../chunks/button-DWJNkhZM.js";
//#region ../ui/src/lib/components/log-viewer/log-viewer.svelte
var O = b("<p class=\"mt-0.5 truncate text-xs text-dark-400\"> </p>"), k = b("<!> <span> </span>", 1), A = b("<span> </span> <span class=\"rounded bg-dark-900 px-1 py-0.25 font-mono text-xs text-dark-400\"> </span>", 1), j = b("<!> <span> </span> <span class=\"rounded bg-dark-900/60 px-1 py-0.25 font-mono text-xs text-dark-400\"> </span>", 1), M = b("<div class=\"flex h-full min-h-64 flex-col items-center justify-center px-4 py-12 text-center\"><div class=\"mb-3 rounded-full bg-dark-800 p-3 text-dark-500\"><!></div> <h4 class=\"font-sans text-sm font-semibold text-dark-200\"> </h4> <p class=\"mt-1 max-w-xs font-sans text-xs leading-relaxed text-dark-400\"> </p></div>"), N = b("<span> </span>"), ne = b("<span>·</span>"), re = b("<span class=\"font-sans text-xs text-dark-300\"><!> <!> <!></span>"), ie = b("<pre class=\"m-0 mt-1 overflow-x-auto rounded-lg border border-dark-800/40 bg-dark-950/40 p-2.5 font-mono text-xs text-dark-200\"><code> </code></pre>"), ae = b("<code class=\"block pr-8 font-mono text-xs break-all whitespace-pre-wrap text-dark-100\"> </code>"), oe = b("<div><div class=\"absolute top-2 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100\"><!></div> <div class=\"mb-1 flex flex-wrap items-center gap-2\"><time class=\"font-mono text-xs text-dark-300 tabular-nums\"> </time> <div class=\"flex items-center gap-1\"><!> <span> </span></div> <!></div> <!></div>"), se = b("<div></div>"), ce = b("<!> <div aria-hidden=\"true\"></div>", 1), le = b("<div><div class=\"flex items-center justify-between gap-3 border-b border-dark-800 pb-2\"><div class=\"min-w-0 flex-1\"><h3 class=\"truncate text-base font-semibold text-dark-50\"> </h3> <!></div> <!></div> <div class=\"flex flex-col gap-3\"><div class=\"flex flex-wrap items-center gap-2\"><!> <!></div> <div class=\"flex shrink-0 items-center gap-4\"><div class=\"w-48 sm:w-56\"><!></div> <div class=\"flex shrink-0 items-center gap-2\"><!></div></div></div> <!></div>");
function P(b, P) {
	a(P, !0);
	let ue = _(P, "title", 3, "Action logs"), de = _(P, "allLabel", 3, "All"), fe = _(P, "infoLabel", 3, "Info"), pe = _(P, "warnLabel", 3, "Warning"), me = _(P, "errorLabel", 3, "Error"), he = _(P, "debugLabel", 3, "Debug"), ge = _(P, "searchPlaceholder", 3, "Filter logs…"), _e = _(P, "autoScrollLabel", 3, "Auto-scroll"), ve = _(P, "clearLabel", 3, "Clear logs"), ye = _(P, "copyLabel", 3, "Copy");
	_(P, "copiedLabel", 3, "Copied");
	let be = _(P, "emptyLabel", 3, "No log entries yet."), xe = _(P, "emptyDescription", 3, "Run an action with a Log handler to see entries here."), Se = _(P, "filteredEmptyLabel", 3, "No matching logs"), Ce = _(P, "filteredEmptyDescription", 3, "No logs match your current filter or search criteria."), F = g("all"), I = g(""), L = g(!0), R = g(null), z = g(void 0), B = S(() => {
		let e = 0, t = 0, n = 0, r = 0;
		for (let i of P.entries) i.level === "info" ? e++ : i.level === "warn" ? t++ : i.level === "error" ? n++ : i.level === "debug" && r++;
		return {
			all: P.entries.length,
			info: e,
			warn: t,
			error: n,
			debug: r
		};
	}), V = S(() => {
		let e = P.entries;
		s(F) !== "all" && (e = e.filter((e) => e.level === s(F)));
		let t = s(I).trim().toLowerCase();
		return t && (e = e.filter((e) => e.message.toLowerCase().includes(t) || e.actionName?.toLowerCase().includes(t) || e.trigger?.toLowerCase().includes(t))), e;
	}), H = {
		info: "ri:information-line",
		warn: "ri:alert-line",
		error: "ri:error-warning-line",
		debug: "ri:bug-line"
	}, we = {
		info: "border-l-2 border-primary-400/60 bg-primary-500/5 hover:bg-primary-500/10",
		warn: "border-l-2 border-warning-500/60 bg-warning-500/5 hover:bg-warning-500/10",
		error: "border-l-2 border-destructive-500/60 bg-destructive-500/5 hover:bg-destructive-500/10",
		debug: "border-l-2 border-dark-500 bg-dark-500/5 hover:bg-dark-500/10"
	}, U = {
		info: "text-primary-300",
		warn: "text-warning-300",
		error: "text-destructive-300",
		debug: "text-dark-300"
	}, Te = {
		info: "border-primary-500/40 bg-primary-500/15 font-semibold text-primary-300",
		warn: "border-warning-500/40 bg-warning-500/15 font-semibold text-warning-300",
		error: "border-destructive-500/40 bg-destructive-500/15 font-semibold text-destructive-300",
		debug: "border-dark-500/40 bg-dark-500/20 font-semibold text-dark-300"
	}, Ee = {
		info: "text-primary-400",
		warn: "text-warning-400",
		error: "text-destructive-400",
		debug: "text-dark-400"
	}, W = S(() => ({
		info: fe(),
		warn: pe(),
		error: me(),
		debug: he()
	}));
	function De(e) {
		return new Date(e).toLocaleTimeString(void 0, {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			fractionalSecondDigits: 3
		});
	}
	function Oe(e) {
		try {
			return JSON.stringify(JSON.parse(e), null, 2);
		} catch {
			return null;
		}
	}
	let G;
	function ke(e, t) {
		navigator.clipboard.writeText(t).then(() => {
			x(R, e, !0), G && clearTimeout(G), G = setTimeout(() => {
				s(R) === e && x(R, null), G = void 0;
			}, 2e3);
		});
	}
	m(() => {
		G && clearTimeout(G);
	});
	let Ae = (e) => {
		x(I, e.currentTarget.value, !0);
	};
	r(() => {
		s(V), s(L) && s(z)?.scrollIntoView({ block: "end" });
	});
	var K = le(), q = p(K), J = p(q), Y = p(J), je = p(Y, !0);
	l(Y);
	var Me = n(Y, 2), Ne = (e) => {
		var t = O(), n = p(t, !0);
		l(t), f(() => y(n, P.subtitle)), v(e, t);
	};
	i(Me, (e) => {
		P.subtitle && e(Ne);
	}), l(J);
	var Pe = n(J, 2), Fe = (e) => {
		D(e, {
			type: "button",
			variant: "outline",
			size: "sm",
			get onclick() {
				return P.onClear;
			},
			class: "flex items-center gap-1.5",
			children: (e, t) => {
				var r = k(), i = c(r);
				w(i, {
					icon: "ri:delete-bin-line",
					class: "size-4"
				});
				var a = n(i, 2), o = p(a, !0);
				l(a), f(() => y(o, ve())), v(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	i(Pe, (e) => {
		P.onClear && e(Fe);
	}), l(q);
	var X = n(q, 2), Z = p(X), Q = p(Z);
	{
		let e = S(() => T("flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors", s(F) === "all" ? "border-dark-500 bg-dark-600 font-semibold text-dark-50" : "border-dark-700/60 bg-dark-800/40 text-dark-300 hover:bg-dark-700 hover:text-dark-100"));
		D(Q, {
			type: "button",
			variant: "outline",
			size: "sm",
			get class() {
				return s(e);
			},
			onclick: () => x(F, "all"),
			children: (e, t) => {
				var r = A(), i = c(r), a = p(i, !0);
				l(i);
				var o = n(i, 2), u = p(o, !0);
				l(o), f(() => {
					y(a, de()), y(u, s(B).all);
				}), v(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	d(n(Q, 2), 16, () => [
		"info",
		"warn",
		"error",
		"debug"
	], (e) => e, (e, t) => {
		let r = S(() => t);
		{
			let t = S(() => T("flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors", s(F) === s(r) ? Te[s(r)] : "border-dark-700/60 bg-dark-800/40 text-dark-300 hover:bg-dark-700 hover:text-dark-100"));
			D(e, {
				type: "button",
				variant: "outline",
				size: "sm",
				get class() {
					return s(t);
				},
				onclick: () => x(F, s(r), !0),
				children: (e, t) => {
					var i = j(), a = c(i);
					{
						let e = S(() => T("size-3.5", Ee[s(r)]));
						w(a, {
							get icon() {
								return H[s(r)];
							},
							get class() {
								return s(e);
							}
						});
					}
					var o = n(a, 2), u = p(o, !0);
					l(o);
					var d = n(o, 2), m = p(d, !0);
					l(d), f(() => {
						y(u, s(W)[s(r)]), y(m, s(B)[s(r)]);
					}), v(e, i);
				},
				$$slots: { default: !0 }
			});
		}
	}), l(Z);
	var Ie = n(Z, 2), $ = p(Ie);
	t(p($), {
		get placeholder() {
			return ge();
		},
		prependIcon: "ri:search-line",
		get value() {
			return s(I);
		},
		oninput: Ae,
		size: "sm"
	}), l($);
	var Le = n($, 2);
	e(p(Le), {
		get label() {
			return _e();
		},
		get checked() {
			return s(L);
		},
		set checked(e) {
			x(L, e, !0);
		}
	}), l(Le), l(Ie), l(X), E(n(X, 2), {
		orientation: "vertical",
		class: "h-full min-h-0 overflow-hidden rounded-lg border border-dark-600 bg-dark-900 font-mono text-sm leading-normal shadow-inner",
		viewportClasses: "h-full",
		children: (e, t) => {
			var r = ce(), a = c(r), u = (e) => {
				var t = M(), r = p(t);
				w(p(r), {
					icon: "ri:bubble-chart-line",
					class: "size-8"
				}), l(r);
				var i = n(r, 2), a = p(i, !0);
				l(i);
				var o = n(i, 2), s = p(o, !0);
				l(o), l(t), f(() => {
					y(a, be()), y(s, xe());
				}), v(e, t);
			}, m = (e) => {
				var t = M(), r = p(t);
				w(p(r), {
					icon: "ri:search-eye-line",
					class: "size-8"
				}), l(r);
				var i = n(r, 2), a = p(i, !0);
				l(i);
				var o = n(i, 2), s = p(o, !0);
				l(o), l(t), f(() => {
					y(a, Se()), y(s, Ce());
				}), v(e, t);
			}, g = (e) => {
				var t = se();
				d(t, 21, () => s(V), (e) => e.id, (e, t) => {
					let r = S(() => Oe(s(t).message) ?? s(t).message), a = S(() => s(r).includes("\n"));
					var o = oe(), u = p(o);
					D(p(u), {
						type: "button",
						variant: "outline",
						size: "icon-sm",
						class: "flex size-7 cursor-pointer items-center justify-center rounded-md border border-dark-700 bg-dark-800 text-dark-400 shadow-md transition-all hover:bg-dark-700 hover:text-dark-100",
						get title() {
							return ye();
						},
						onclick: () => ke(s(t).id, s(t).message),
						children: (e, n) => {
							var r = ee(), a = c(r), o = (e) => {
								w(e, {
									icon: "ri:check-line",
									class: "size-4 animate-in text-success-400 duration-150 zoom-in-50"
								});
							}, l = (e) => {
								w(e, {
									icon: "ri:file-copy-line",
									class: "size-4"
								});
							};
							i(a, (e) => {
								s(R) === s(t).id ? e(o) : e(l, -1);
							}), v(e, r);
						},
						$$slots: { default: !0 }
					}), l(u);
					var d = n(u, 2), m = p(d), g = p(m, !0);
					l(m);
					var _ = n(m, 2), b = p(_);
					{
						let e = S(() => T("size-3.5", U[s(t).level]));
						w(b, {
							get icon() {
								return H[s(t).level];
							},
							get class() {
								return s(e);
							}
						});
					}
					var x = n(b, 2), E = p(x, !0);
					l(x), l(_);
					var O = n(_, 2), k = (e) => {
						var r = re(), a = p(r), o = (e) => {
							var n = N(), r = p(n, !0);
							l(n), f(() => y(r, s(t).actionName)), v(e, n);
						};
						i(a, (e) => {
							s(t).actionName && e(o);
						});
						var c = n(a, 2), u = (e) => {
							v(e, ne());
						};
						i(c, (e) => {
							s(t).actionName && s(t).trigger && e(u);
						});
						var d = n(c, 2), m = (e) => {
							var n = N(), r = p(n, !0);
							l(n), f(() => y(r, s(t).trigger)), v(e, n);
						};
						i(d, (e) => {
							s(t).trigger && e(m);
						}), l(r), v(e, r);
					};
					i(O, (e) => {
						(s(t).actionName || s(t).trigger) && e(k);
					}), l(d);
					var A = n(d, 2), j = (e) => {
						var t = ie(), n = p(t), i = p(n, !0);
						l(n), l(t), f(() => y(i, s(r))), v(e, t);
					}, M = (e) => {
						var t = ae(), n = p(t, !0);
						l(t), f(() => y(n, s(r))), v(e, t);
					};
					i(A, (e) => {
						s(a) ? e(j) : e(M, -1);
					}), l(o), f((e, n, r, i) => {
						C(o, 1, e), te(m, "datetime", n), y(g, r), C(x, 1, i), y(E, s(W)[s(t).level]);
					}, [
						() => h(T("group relative border-b border-dark-800/60 px-4 py-2 transition-colors last:border-b-0", we[s(t).level])),
						() => new Date(s(t).timestamp).toISOString(),
						() => De(s(t).timestamp),
						() => h(T("text-xs font-bold tracking-wider uppercase", U[s(t).level]))
					]), v(e, o);
				}), l(t), v(e, t);
			};
			i(a, (e) => {
				P.entries.length === 0 ? e(u) : s(V).length === 0 ? e(m, 1) : e(g, -1);
			}), o(n(a, 2), (e) => x(z, e), () => s(z)), v(e, r);
		},
		$$slots: { default: !0 }
	}), l(K), f((e) => {
		C(K, 1, e), y(je, ue());
	}, [() => h(T("grid h-[calc(100dvh-8rem)] min-h-72 grid-rows-[auto_auto_minmax(0,1fr)] gap-4", P.class))]), v(b, K), u();
}
//#endregion
export { P as LogViewer };
