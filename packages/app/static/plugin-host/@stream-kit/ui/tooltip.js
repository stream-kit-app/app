import { Bn as e, Dr as t, En as n, Hr as r, It as i, Nt as a, Sn as o, Ur as s, Vt as c, a as l, bn as u, cr as d, ii as f, o as p, ot as m, s as h, sn as g, sr as _, ti as v, ur as y, xn as b } from "../../chunks/client-BFeMv2Ma.js";
import { t as x } from "../../chunks/utils-Dqp4W1j8.js";
import "../../chunks/disclose-version-CI8I6yeK.js";
import { D as S } from "../../chunks/animations-complete-2GhqX7WL.js";
import { i as C, n as w } from "../../chunks/use-id-BW6hjw-g.js";
import { i as T, n as E, r as D, t as O } from "../../chunks/tooltip-HtCXbDvr.js";
import { r as k } from "../../chunks/dom-9pAGmv2P.js";
import { t as A } from "../../chunks/portal-D7k4f7sM.js";
import { i as j, n as M, r as N, t as P } from "../../chunks/popper-layer-force-mount-BqARajyD.js";
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/tooltip/components/tooltip.svelte
function F(e, t) {
	s(t, !0);
	let n = l(t, "open", 15, !1), i = l(t, "triggerId", 15, null), a = l(t, "onOpenChange", 3, k), o = l(t, "onOpenChangeComplete", 3, k), c = T.create({
		open: S(() => n(), (e) => {
			n(e), a()(e);
		}),
		triggerId: S(() => i(), (e) => {
			i(e);
		}),
		delayDuration: S(() => t.delayDuration),
		disableCloseOnTriggerClick: S(() => t.disableCloseOnTriggerClick),
		disableHoverableContent: S(() => t.disableHoverableContent),
		ignoreNonKeyboardFocus: S(() => t.ignoreNonKeyboardFocus),
		disabled: S(() => t.disabled),
		onOpenChangeComplete: S(() => o()),
		tether: S(() => t.tether)
	});
	j(e, {
		tooltip: !0,
		children: (e, n) => {
			var r = b(), i = d(r);
			g(i, () => t.children ?? f, () => ({
				open: c.opts.open.current,
				triggerId: c.activeTriggerId,
				payload: c.activePayload
			})), u(e, r);
		},
		$$slots: { default: !0 }
	}), r();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/tooltip/components/tooltip-content.svelte
var I = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"side",
	"sideOffset",
	"align",
	"avoidCollisions",
	"arrowPadding",
	"sticky",
	"strategy",
	"hideWhenDetached",
	"customAnchor",
	"collisionPadding",
	"onInteractOutside",
	"onEscapeKeydown",
	"forceMount",
	"style"
]), L = o("<div><div><!></div></div>");
function R(i, a) {
	let o = n();
	s(a, !0);
	let y = l(a, "id", 19, () => w(o)), x = l(a, "ref", 15, null), T = l(a, "side", 3, "top"), D = l(a, "sideOffset", 3, 0), O = l(a, "align", 3, "center"), A = l(a, "avoidCollisions", 3, !0), j = l(a, "arrowPadding", 3, 0), F = l(a, "sticky", 3, "partial"), R = l(a, "hideWhenDetached", 3, !1), z = l(a, "collisionPadding", 3, 0), B = l(a, "onInteractOutside", 3, k), V = l(a, "onEscapeKeydown", 3, k), H = l(a, "forceMount", 3, !1), U = p(a, I), W = E.create({
		id: S(() => y()),
		ref: S(() => x(), (e) => x(e)),
		onInteractOutside: S(() => B()),
		onEscapeKeydown: S(() => V())
	}), G = t(() => ({
		side: T(),
		sideOffset: D(),
		align: O(),
		avoidCollisions: A(),
		arrowPadding: j(),
		sticky: F(),
		hideWhenDetached: R(),
		collisionPadding: z(),
		strategy: a.strategy,
		customAnchor: a.customAnchor ?? W.root.triggerNode
	})), K = t(() => C(U, e(G), W.props));
	var q = b(), J = d(q), Y = (n) => {
		{
			let r = (n, r) => {
				let i = () => (r?.()).props, o = () => (r?.()).wrapperProps, s = t(() => C(o(), { style: { pointerEvents: W.root.disableHoverableContent ? "none" : void 0 } })), l = t(() => C(i(), { style: N("tooltip") }, { style: a.style }));
				var p = b(), h = d(p), y = (n) => {
					var r = b(), i = d(r);
					{
						let n = t(() => ({
							props: e(l),
							wrapperProps: e(s),
							...W.snippetProps
						}));
						g(i, () => a.child, () => e(n));
					}
					u(n, r);
				}, x = (t) => {
					var n = L();
					m(n, () => ({ ...e(s) }));
					var r = _(n);
					m(r, () => ({ ...e(l) }));
					var i = _(r);
					g(i, () => a.children ?? f), v(r), v(n), u(t, n);
				};
				c(h, (e) => {
					a.child ? e(y) : e(x, -1);
				}), u(n, p);
			}, i = t(() => W.root.disableHoverableContent ? "none" : "auto");
			P(n, h(() => e(K), () => W.popperProps, {
				get enabled() {
					return W.root.opts.open.current;
				},
				get id() {
					return y();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !0,
				get ref() {
					return W.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return W.shouldRender;
				},
				get contentPointerEvents() {
					return e(i);
				},
				popper: r,
				$$slots: { popper: !0 }
			}));
		}
	}, X = (n) => {
		{
			let r = (n, r) => {
				let i = () => (r?.()).props, o = () => (r?.()).wrapperProps, s = t(() => C(o(), { style: { pointerEvents: W.root.disableHoverableContent ? "none" : void 0 } })), l = t(() => C(i(), { style: N("tooltip") }, { style: a.style }));
				var p = b(), h = d(p), y = (n) => {
					var r = b(), i = d(r);
					{
						let n = t(() => ({
							props: e(l),
							wrapperProps: e(s),
							...W.snippetProps
						}));
						g(i, () => a.child, () => e(n));
					}
					u(n, r);
				}, x = (t) => {
					var n = L();
					m(n, () => ({ ...e(s) }));
					var r = _(n);
					m(r, () => ({ ...e(l) }));
					var i = _(r);
					g(i, () => a.children ?? f), v(r), v(n), u(t, n);
				};
				c(h, (e) => {
					a.child ? e(y) : e(x, -1);
				}), u(n, p);
			}, i = t(() => W.root.disableHoverableContent ? "none" : "auto");
			M(n, h(() => e(K), () => W.popperProps, {
				get open() {
					return W.root.opts.open.current;
				},
				get id() {
					return y();
				},
				trapFocus: !1,
				loop: !1,
				preventScroll: !1,
				forceMount: !1,
				get ref() {
					return W.opts.ref;
				},
				tooltip: !0,
				get shouldRender() {
					return W.shouldRender;
				},
				get contentPointerEvents() {
					return e(i);
				},
				popper: r,
				$$slots: { popper: !0 }
			}));
		}
	};
	c(J, (e) => {
		H() ? e(Y) : H() || e(X, 1);
	}), u(i, q), r();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/tooltip/components/tooltip-provider.svelte
function z(e, t) {
	s(t, !0);
	let n = l(t, "delayDuration", 3, 700), i = l(t, "disableCloseOnTriggerClick", 3, !1), a = l(t, "disableHoverableContent", 3, !1), o = l(t, "disabled", 3, !1), c = l(t, "ignoreNonKeyboardFocus", 3, !1), p = l(t, "skipDelayDuration", 3, 300);
	D.create({
		delayDuration: S(() => n()),
		disableCloseOnTriggerClick: S(() => i()),
		disableHoverableContent: S(() => a()),
		disabled: S(() => o()),
		ignoreNonKeyboardFocus: S(() => c()),
		skipDelayDuration: S(() => p())
	});
	var m = b(), h = d(m);
	g(h, () => t.children ?? f), u(e, m), r();
}
//#endregion
//#region ../ui/src/lib/components/tooltip/tooltip-provider.svelte
var B = o("<!> <!>", 1);
function V(n, o) {
	s(o, !0);
	var l = b(), p = d(l);
	a(p, () => z, (n, r) => {
		r(n, {
			disableHoverableContent: !0,
			children: (n, r) => {
				var s = B(), l = d(s);
				g(l, () => o.children ?? f);
				var p = y(l, 2);
				{
					let n = (n, r) => {
						let o = () => (r?.()).payload;
						var s = b(), l = d(s);
						a(l, () => A, (n, r) => {
							r(n, {
								children: (n, r) => {
									var s = b(), l = d(s);
									{
										let n = t(() => x("z-110 max-w-xs rounded-lg border border-dark-600 bg-dark-800 px-3 py-2 text-sm text-dark-200 shadow-md", "animate-in fade-in-0 zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fill-mode-forwards data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"));
										a(l, () => R, (t, r) => {
											r(t, {
												side: "top",
												sideOffset: 4,
												get class() {
													return e(n);
												},
												children: (e, t) => {
													var n = b(), r = d(n), a = (e) => {
														var t = b(), n = d(t), r = (e) => {
															var t = b(), n = d(t);
															g(n, () => o().snippet), u(e, t);
														}, i = (e) => {
															var t = b(), n = d(t);
															g(n, () => o().snippet, () => o().arg), u(e, t);
														};
														c(n, (e) => {
															o().mode === "none" ? e(r) : e(i, -1);
														}), u(e, t);
													}, s = (e) => {
														var t = b(), n = d(t);
														i(n, () => o().content), u(e, t);
													};
													c(r, (e) => {
														o()?.kind === "snippet" ? e(a) : o() && e(s, 1);
													}), u(e, n);
												},
												$$slots: { default: !0 }
											});
										});
									}
									u(n, s);
								},
								$$slots: { default: !0 }
							});
						}), u(n, s);
					};
					a(p, () => F, (e, t) => {
						t(e, {
							get tether() {
								return O;
							},
							children: n,
							$$slots: { default: !0 }
						});
					});
				}
				u(n, s);
			},
			$$slots: { default: !0 }
		});
	}), u(n, l), r();
}
//#endregion
export { V as TooltipProvider, O as tether };
