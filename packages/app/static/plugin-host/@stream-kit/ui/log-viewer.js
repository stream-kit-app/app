import { $n as e, Gn as t, Gt as n, Hr as r, N as i, On as a, Qn as o, Qr as s, Vr as c, Vt as l, Wn as u, Zn as d, a as f, an as p, bt as m, cr as h, f as g, in as _, nn as v, on as y, or as b, ot as ee, pr as x, vt as S } from "../../chunks/index-client-BIJQxc2l.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as C } from "../../chunks/Icon-BoHmh-pv.js";
import { t as w } from "../../chunks/utils-DVQ4nj8f.js";
import { a as T, d as E } from "../../chunks/input-B66rOCii.js";
import { t as D } from "../../chunks/scroll-area-99QA2aRD.js";
import { t as O } from "../../chunks/button-CZMpEwOs.js";
//#region ../ui/src/lib/components/log-viewer/log-viewer.svelte
var k = y("<p class=\"mt-0.5 truncate text-xs text-dark-400\"> </p>"), A = y("<!> <span> </span>", 1), j = y("<span> </span> <span class=\"rounded bg-dark-900 px-1 py-0.25 font-mono text-xs text-dark-400\"> </span>", 1), M = y("<!> <span> </span> <span class=\"rounded bg-dark-900/60 px-1 py-0.25 font-mono text-xs text-dark-400\"> </span>", 1), N = y("<div class=\"flex h-full min-h-64 flex-col items-center justify-center px-4 py-12 text-center\"><div class=\"mb-3 rounded-full bg-dark-800 p-3 text-dark-500\"><!></div> <h4 class=\"font-sans text-sm font-semibold text-dark-200\"> </h4> <p class=\"mt-1 max-w-xs font-sans text-xs leading-relaxed text-dark-400\"> </p></div>"), P = y("<span> </span>"), te = y("<span>·</span>"), ne = y("<span class=\"font-sans text-xs text-dark-300\"><!> <!> <!></span>"), re = y("<pre class=\"m-0 mt-1 overflow-x-auto rounded-lg border border-dark-800/40 bg-dark-950/40 p-2.5 font-mono text-xs text-dark-200\"><code> </code></pre>"), ie = y("<code class=\"block pr-8 font-mono text-xs break-all whitespace-pre-wrap text-dark-100\"> </code>"), ae = y("<div><div class=\"absolute top-2 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100\"><!></div> <div class=\"mb-1 flex flex-wrap items-center gap-2\"><time class=\"font-mono text-xs text-dark-300 tabular-nums\"> </time> <div class=\"flex items-center gap-1\"><!> <span> </span></div> <!></div> <!></div>"), oe = y("<div></div>"), se = y("<!> <div aria-hidden=\"true\"></div>", 1), ce = y("<div><div class=\"flex items-center justify-between gap-3 border-b border-dark-800 pb-2\"><div class=\"min-w-0 flex-1\"><h3 class=\"truncate text-base font-semibold text-dark-50\"> </h3> <!></div> <!></div> <div class=\"flex flex-col gap-3\"><div class=\"flex flex-wrap items-center gap-2\"><!> <!></div> <div class=\"flex shrink-0 items-center gap-4\"><div class=\"w-48 sm:w-56\"><!></div> <div class=\"flex shrink-0 items-center gap-2\"><!></div></div></div> <!></div>");
function F(y, F) {
	r(F, !0);
	let le = g(F, "title", 3, "Action logs"), ue = g(F, "allLabel", 3, "All"), de = g(F, "infoLabel", 3, "Info"), fe = g(F, "warnLabel", 3, "Warning"), pe = g(F, "errorLabel", 3, "Error"), me = g(F, "debugLabel", 3, "Debug"), he = g(F, "searchPlaceholder", 3, "Filter logs…"), ge = g(F, "autoScrollLabel", 3, "Auto-scroll"), _e = g(F, "clearLabel", 3, "Clear logs"), ve = g(F, "copyLabel", 3, "Copy");
	g(F, "copiedLabel", 3, "Copied");
	let ye = g(F, "emptyLabel", 3, "No log entries yet."), be = g(F, "emptyDescription", 3, "Run an action with a Log handler to see entries here."), xe = g(F, "filteredEmptyLabel", 3, "No matching logs"), Se = g(F, "filteredEmptyDescription", 3, "No logs match your current filter or search criteria."), I = h("all"), L = h(""), R = h(!0), z = h(null), B = h(void 0), V = x(() => {
		let e = 0, t = 0, n = 0, r = 0;
		for (let i of F.entries) i.level === "info" ? e++ : i.level === "warn" ? t++ : i.level === "error" ? n++ : i.level === "debug" && r++;
		return {
			all: F.entries.length,
			info: e,
			warn: t,
			error: n,
			debug: r
		};
	}), H = x(() => {
		let e = F.entries;
		a(I) !== "all" && (e = e.filter((e) => e.level === a(I)));
		let t = a(L).trim().toLowerCase();
		t && (e = e.filter((e) => e.message.toLowerCase().includes(t) || e.actionName?.toLowerCase().includes(t) || e.trigger?.toLowerCase().includes(t)));
		let n = /* @__PURE__ */ new Set();
		return e.filter((e) => n.has(e.id) ? !1 : (n.add(e.id), !0));
	}), U = {
		info: "ri:information-line",
		warn: "ri:alert-line",
		error: "ri:error-warning-line",
		debug: "ri:bug-line"
	}, Ce = {
		info: "border-l-2 border-primary-400/60 bg-primary-500/5 hover:bg-primary-500/10",
		warn: "border-l-2 border-warning-500/60 bg-warning-500/5 hover:bg-warning-500/10",
		error: "border-l-2 border-destructive-500/60 bg-destructive-500/5 hover:bg-destructive-500/10",
		debug: "border-l-2 border-dark-500 bg-dark-500/5 hover:bg-dark-500/10"
	}, W = {
		info: "text-primary-300",
		warn: "text-warning-300",
		error: "text-destructive-300",
		debug: "text-dark-300"
	}, we = {
		info: "border-primary-500/40 bg-primary-500/15 font-semibold text-primary-300",
		warn: "border-warning-500/40 bg-warning-500/15 font-semibold text-warning-300",
		error: "border-destructive-500/40 bg-destructive-500/15 font-semibold text-destructive-300",
		debug: "border-dark-500/40 bg-dark-500/20 font-semibold text-dark-300"
	}, Te = {
		info: "text-primary-400",
		warn: "text-warning-400",
		error: "text-destructive-400",
		debug: "text-dark-400"
	}, G = x(() => ({
		info: de(),
		warn: fe(),
		error: pe(),
		debug: me()
	}));
	function Ee(e) {
		return new Date(e).toLocaleTimeString(void 0, {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			fractionalSecondDigits: 3
		});
	}
	function De(e) {
		try {
			return JSON.stringify(JSON.parse(e), null, 2);
		} catch {
			return null;
		}
	}
	let K;
	function Oe(e, t) {
		navigator.clipboard.writeText(t).then(() => {
			b(z, e, !0), K && clearTimeout(K), K = setTimeout(() => {
				a(z) === e && b(z, null), K = void 0;
			}, 2e3);
		});
	}
	f(() => {
		K && clearTimeout(K);
	});
	let ke = (e) => {
		b(L, e.currentTarget.value, !0);
	};
	t(() => {
		a(H), a(R) && a(B)?.scrollIntoView({ block: "end" });
	});
	var q = ce(), J = d(q), Y = d(J), X = d(Y), Ae = d(X, !0);
	s(X);
	var je = e(X, 2), Me = (e) => {
		var t = k(), n = d(t, !0);
		s(t), u(() => v(n, F.subtitle)), _(e, t);
	};
	n(je, (e) => {
		F.subtitle && e(Me);
	}), s(Y);
	var Ne = e(Y, 2), Pe = (t) => {
		O(t, {
			type: "button",
			variant: "outline",
			size: "sm",
			get onclick() {
				return F.onClear;
			},
			class: "flex items-center gap-1.5",
			children: (t, n) => {
				var r = A(), i = o(r);
				C(i, {
					icon: "ri:delete-bin-line",
					class: "size-4"
				});
				var a = e(i, 2), c = d(a, !0);
				s(a), u(() => v(c, _e())), _(t, r);
			},
			$$slots: { default: !0 }
		});
	};
	n(Ne, (e) => {
		F.onClear && e(Pe);
	}), s(J);
	var Z = e(J, 2), Q = d(Z), Fe = d(Q);
	{
		let t = x(() => w("flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors", a(I) === "all" ? "border-dark-500 bg-dark-600 font-semibold text-dark-50" : "border-dark-700/60 bg-dark-800/40 text-dark-300 hover:bg-dark-700 hover:text-dark-100"));
		O(Fe, {
			type: "button",
			variant: "outline",
			size: "sm",
			get class() {
				return a(t);
			},
			onclick: () => b(I, "all"),
			children: (t, n) => {
				var r = j(), i = o(r), c = d(i, !0);
				s(i);
				var l = e(i, 2), f = d(l, !0);
				s(l), u(() => {
					v(c, ue()), v(f, a(V).all);
				}), _(t, r);
			},
			$$slots: { default: !0 }
		});
	}
	l(e(Fe, 2), 16, () => [
		"info",
		"warn",
		"error",
		"debug"
	], (e) => e, (t, n) => {
		let r = x(() => n);
		{
			let n = x(() => w("flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors", a(I) === a(r) ? we[a(r)] : "border-dark-700/60 bg-dark-800/40 text-dark-300 hover:bg-dark-700 hover:text-dark-100"));
			O(t, {
				type: "button",
				variant: "outline",
				size: "sm",
				get class() {
					return a(n);
				},
				onclick: () => b(I, a(r), !0),
				children: (t, n) => {
					var i = M(), c = o(i);
					{
						let e = x(() => w("size-3.5", Te[a(r)]));
						C(c, {
							get icon() {
								return U[a(r)];
							},
							get class() {
								return a(e);
							}
						});
					}
					var l = e(c, 2), f = d(l, !0);
					s(l);
					var p = e(l, 2), m = d(p, !0);
					s(p), u(() => {
						v(f, a(G)[a(r)]), v(m, a(V)[a(r)]);
					}), _(t, i);
				},
				$$slots: { default: !0 }
			});
		}
	}), s(Q);
	var Ie = e(Q, 2), $ = d(Ie);
	E(d($), {
		get placeholder() {
			return he();
		},
		prependIcon: "ri:search-line",
		get value() {
			return a(L);
		},
		oninput: ke,
		size: "sm"
	}), s($);
	var Le = e($, 2);
	T(d(Le), {
		get label() {
			return ge();
		},
		get checked() {
			return a(R);
		},
		set checked(e) {
			b(R, e, !0);
		}
	}), s(Le), s(Ie), s(Z), D(e(Z, 2), {
		orientation: "vertical",
		class: "h-full min-h-0 overflow-hidden rounded-lg border border-dark-600 bg-dark-900 font-mono text-sm leading-normal shadow-inner",
		viewportClasses: "h-full",
		children: (t, r) => {
			var c = se(), f = o(c), h = (t) => {
				var n = N(), r = d(n);
				C(d(r), {
					icon: "ri:bubble-chart-line",
					class: "size-8"
				}), s(r);
				var i = e(r, 2), a = d(i, !0);
				s(i);
				var o = e(i, 2), c = d(o, !0);
				s(o), s(n), u(() => {
					v(a, ye()), v(c, be());
				}), _(t, n);
			}, g = (t) => {
				var n = N(), r = d(n);
				C(d(r), {
					icon: "ri:search-eye-line",
					class: "size-8"
				}), s(r);
				var i = e(r, 2), a = d(i, !0);
				s(i);
				var o = e(i, 2), c = d(o, !0);
				s(o), s(n), u(() => {
					v(a, xe()), v(c, Se());
				}), _(t, n);
			}, y = (t) => {
				var r = oe();
				l(r, 21, () => a(H), (e) => e.id, (t, r) => {
					let i = x(() => De(a(r).message) ?? a(r).message), c = x(() => a(i).includes("\n"));
					var l = ae(), f = d(l);
					O(d(f), {
						type: "button",
						variant: "outline",
						size: "icon-sm",
						class: "flex size-7 cursor-pointer items-center justify-center rounded-md border border-dark-700 bg-dark-800 text-dark-400 shadow-md transition-all hover:bg-dark-700 hover:text-dark-100",
						get title() {
							return ve();
						},
						onclick: () => Oe(a(r).id, a(r).message),
						children: (e, t) => {
							var i = p(), s = o(i), c = (e) => {
								C(e, {
									icon: "ri:check-line",
									class: "size-4 animate-in text-success-400 duration-150 zoom-in-50"
								});
							}, l = (e) => {
								C(e, {
									icon: "ri:file-copy-line",
									class: "size-4"
								});
							};
							n(s, (e) => {
								a(z) === a(r).id ? e(c) : e(l, -1);
							}), _(e, i);
						},
						$$slots: { default: !0 }
					}), s(f);
					var h = e(f, 2), g = d(h), y = d(g, !0);
					s(g);
					var b = e(g, 2), T = d(b);
					{
						let e = x(() => w("size-3.5", W[a(r).level]));
						C(T, {
							get icon() {
								return U[a(r).level];
							},
							get class() {
								return a(e);
							}
						});
					}
					var E = e(T, 2), D = d(E, !0);
					s(E), s(b);
					var k = e(b, 2), A = (t) => {
						var i = ne(), o = d(i), c = (e) => {
							var t = P(), n = d(t, !0);
							s(t), u(() => v(n, a(r).actionName)), _(e, t);
						};
						n(o, (e) => {
							a(r).actionName && e(c);
						});
						var l = e(o, 2), f = (e) => {
							_(e, te());
						};
						n(l, (e) => {
							a(r).actionName && a(r).trigger && e(f);
						});
						var p = e(l, 2), m = (e) => {
							var t = P(), n = d(t, !0);
							s(t), u(() => v(n, a(r).trigger)), _(e, t);
						};
						n(p, (e) => {
							a(r).trigger && e(m);
						}), s(i), _(t, i);
					};
					n(k, (e) => {
						(a(r).actionName || a(r).trigger) && e(A);
					}), s(h);
					var j = e(h, 2), M = (e) => {
						var t = re(), n = d(t), r = d(n, !0);
						s(n), s(t), u(() => v(r, a(i))), _(e, t);
					}, N = (e) => {
						var t = ie(), n = d(t, !0);
						s(t), u(() => v(n, a(i))), _(e, t);
					};
					n(j, (e) => {
						a(c) ? e(M) : e(N, -1);
					}), s(l), u((e, t, n, i) => {
						S(l, 1, e), ee(g, "datetime", t), v(y, n), S(E, 1, i), v(D, a(G)[a(r).level]);
					}, [
						() => m(w("group relative border-b border-dark-800/60 px-4 py-2 transition-colors last:border-b-0", Ce[a(r).level])),
						() => new Date(a(r).timestamp).toISOString(),
						() => Ee(a(r).timestamp),
						() => m(w("text-xs font-bold tracking-wider uppercase", W[a(r).level]))
					]), _(t, l);
				}), s(r), _(t, r);
			};
			n(f, (e) => {
				F.entries.length === 0 ? e(h) : a(H).length === 0 ? e(g, 1) : e(y, -1);
			}), i(e(f, 2), (e) => b(B, e), () => a(B)), _(t, c);
		},
		$$slots: { default: !0 }
	}), s(q), u((e) => {
		S(q, 1, e), v(Ae, le());
	}, [() => m(w("grid h-[calc(100dvh-8rem)] min-h-72 grid-rows-[auto_auto_minmax(0,1fr)] gap-4", F.class))]), _(y, q), c();
}
//#endregion
export { F as LogViewer };
