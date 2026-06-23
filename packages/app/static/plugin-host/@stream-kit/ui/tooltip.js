import { $n as e, At as t, Bt as n, Gt as r, Hr as i, Mt as a, On as o, Qn as s, Qr as c, Vr as l, Zn as u, an as d, f, in as p, it as m, m as h, ni as g, on as _, p as v, pr as y, un as b } from "../../chunks/index-client-BIJQxc2l.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as x } from "../../chunks/utils-DVQ4nj8f.js";
import { D as S } from "../../chunks/animations-complete-mSylzqL5.js";
import { i as C, n as w } from "../../chunks/use-id-D_eLoXvH.js";
import { r as T } from "../../chunks/dom-DDAYniBq.js";
import { t as E } from "../../chunks/portal-Clk-o-E0.js";
import { a as D, n as O, r as k, t as A } from "../../chunks/popper-layer-force-mount-CGFPxfB5.js";
import { i as j, n as M, r as N, t as P } from "../../chunks/tooltip-CydwcNzR.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/tooltip/components/tooltip.svelte
function F(e, t) {
	i(t, !0);
	let n = f(t, "open", 15, !1), r = f(t, "triggerId", 15, null), o = f(t, "onOpenChange", 3, T), c = f(t, "onOpenChangeComplete", 3, T), u = j.create({
		open: S(() => n(), (e) => {
			n(e), o()(e);
		}),
		triggerId: S(() => r(), (e) => {
			r(e);
		}),
		delayDuration: S(() => t.delayDuration),
		disableCloseOnTriggerClick: S(() => t.disableCloseOnTriggerClick),
		disableHoverableContent: S(() => t.disableHoverableContent),
		ignoreNonKeyboardFocus: S(() => t.ignoreNonKeyboardFocus),
		disabled: S(() => t.disabled),
		onOpenChangeComplete: S(() => c()),
		tether: S(() => t.tether)
	});
	k(e, {
		tooltip: !0,
		children: (e, n) => {
			var r = d();
			a(s(r), () => t.children ?? g, () => ({
				open: u.opts.open.current,
				triggerId: u.activeTriggerId,
				payload: u.activePayload
			})), p(e, r);
		},
		$$slots: { default: !0 }
	}), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/tooltip/components/tooltip-content.svelte
var I = new Set([
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
]), L = _("<div><div><!></div></div>");
function R(e, t) {
	let n = b();
	i(t, !0);
	let _ = f(t, "id", 19, () => w(n)), x = f(t, "ref", 15, null), E = f(t, "side", 3, "top"), k = f(t, "sideOffset", 3, 0), j = f(t, "align", 3, "center"), N = f(t, "avoidCollisions", 3, !0), P = f(t, "arrowPadding", 3, 0), F = f(t, "sticky", 3, "partial"), R = f(t, "hideWhenDetached", 3, !1), z = f(t, "collisionPadding", 3, 0), B = f(t, "onInteractOutside", 3, T), V = f(t, "onEscapeKeydown", 3, T), H = f(t, "forceMount", 3, !1), U = v(t, I), W = M.create({
		id: S(() => _()),
		ref: S(() => x(), (e) => x(e)),
		onInteractOutside: S(() => B()),
		onEscapeKeydown: S(() => V())
	}), G = y(() => ({
		side: E(),
		sideOffset: k(),
		align: j(),
		avoidCollisions: N(),
		arrowPadding: P(),
		sticky: F(),
		hideWhenDetached: R(),
		collisionPadding: z(),
		strategy: t.strategy,
		customAnchor: t.customAnchor ?? W.root.triggerNode
	})), K = y(() => C(U, o(G), W.props));
	var q = d(), J = s(q), Y = (e) => {
		{
			let n = (e, n) => {
				let i = () => n?.().props, l = () => n?.().wrapperProps, f = y(() => C(l(), { style: { pointerEvents: W.root.disableHoverableContent ? "none" : void 0 } })), h = y(() => C(i(), { style: D("tooltip") }, { style: t.style }));
				var _ = d(), v = s(_), b = (e) => {
					var n = d(), r = s(n);
					{
						let e = y(() => ({
							props: o(h),
							wrapperProps: o(f),
							...W.snippetProps
						}));
						a(r, () => t.child, () => o(e));
					}
					p(e, n);
				}, x = (e) => {
					var n = L();
					m(n, () => ({ ...o(f) }));
					var r = u(n);
					m(r, () => ({ ...o(h) })), a(u(r), () => t.children ?? g), c(r), c(n), p(e, n);
				};
				r(v, (e) => {
					t.child ? e(b) : e(x, -1);
				}), p(e, _);
			}, i = y(() => W.root.disableHoverableContent ? "none" : "auto");
			A(e, h(() => o(K), () => W.popperProps, {
				get enabled() {
					return W.root.opts.open.current;
				},
				get id() {
					return _();
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
					return o(i);
				},
				popper: n,
				$$slots: { popper: !0 }
			}));
		}
	}, X = (e) => {
		{
			let n = (e, n) => {
				let i = () => n?.().props, l = () => n?.().wrapperProps, f = y(() => C(l(), { style: { pointerEvents: W.root.disableHoverableContent ? "none" : void 0 } })), h = y(() => C(i(), { style: D("tooltip") }, { style: t.style }));
				var _ = d(), v = s(_), b = (e) => {
					var n = d(), r = s(n);
					{
						let e = y(() => ({
							props: o(h),
							wrapperProps: o(f),
							...W.snippetProps
						}));
						a(r, () => t.child, () => o(e));
					}
					p(e, n);
				}, x = (e) => {
					var n = L();
					m(n, () => ({ ...o(f) }));
					var r = u(n);
					m(r, () => ({ ...o(h) })), a(u(r), () => t.children ?? g), c(r), c(n), p(e, n);
				};
				r(v, (e) => {
					t.child ? e(b) : e(x, -1);
				}), p(e, _);
			}, i = y(() => W.root.disableHoverableContent ? "none" : "auto");
			O(e, h(() => o(K), () => W.popperProps, {
				get open() {
					return W.root.opts.open.current;
				},
				get id() {
					return _();
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
					return o(i);
				},
				popper: n,
				$$slots: { popper: !0 }
			}));
		}
	};
	r(J, (e) => {
		H() ? e(Y) : H() || e(X, 1);
	}), p(e, q), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/tooltip/components/tooltip-provider.svelte
function z(e, t) {
	i(t, !0);
	let n = f(t, "delayDuration", 3, 700), r = f(t, "disableCloseOnTriggerClick", 3, !1), o = f(t, "disableHoverableContent", 3, !1), c = f(t, "disabled", 3, !1), u = f(t, "ignoreNonKeyboardFocus", 3, !1), m = f(t, "skipDelayDuration", 3, 300);
	N.create({
		delayDuration: S(() => n()),
		disableCloseOnTriggerClick: S(() => r()),
		disableHoverableContent: S(() => o()),
		disabled: S(() => c()),
		ignoreNonKeyboardFocus: S(() => u()),
		skipDelayDuration: S(() => m())
	});
	var h = d();
	a(s(h), () => t.children ?? g), p(e, h), l();
}
//#endregion
//#region ../ui/src/lib/components/tooltip/tooltip-provider.svelte
var B = _("<!> <!>", 1);
function V(c, u) {
	i(u, !0);
	var f = d();
	t(s(f), () => z, (i, c) => {
		c(i, {
			disableHoverableContent: !0,
			children: (i, c) => {
				var l = B(), f = s(l);
				a(f, () => u.children ?? g);
				var m = e(f, 2);
				{
					let e = (e, i) => {
						let c = () => i?.().payload, l = () => i?.().open;
						var u = d(), f = s(u), m = (e) => {
							var i = d();
							t(s(i), () => E, (e, i) => {
								i(e, {
									children: (e, i) => {
										var l = d(), u = s(l);
										{
											let e = y(() => x("z-50 max-w-xs rounded-lg border border-dark-600 bg-dark-800 px-3 py-2 text-sm text-dark-200 shadow-md", "animate-in fade-in-0 zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"));
											t(u, () => R, (t, i) => {
												i(t, {
													side: "top",
													sideOffset: 4,
													get class() {
														return o(e);
													},
													children: (e, t) => {
														var i = d(), o = s(i), l = (e) => {
															var t = d(), n = s(t), i = (e) => {
																var t = d();
																a(s(t), () => c().snippet), p(e, t);
															}, o = (e) => {
																var t = d();
																a(s(t), () => c().snippet, () => c().arg), p(e, t);
															};
															r(n, (e) => {
																c().mode === "none" ? e(i) : e(o, -1);
															}), p(e, t);
														}, u = (e) => {
															var t = d();
															n(s(t), () => c().content), p(e, t);
														};
														r(o, (e) => {
															c().kind === "snippet" ? e(l) : e(u, -1);
														}), p(e, i);
													},
													$$slots: { default: !0 }
												});
											});
										}
										p(e, l);
									},
									$$slots: { default: !0 }
								});
							}), p(e, i);
						};
						r(f, (e) => {
							l() && c() != null && e(m);
						}), p(e, u);
					};
					t(m, () => F, (t, n) => {
						n(t, {
							get tether() {
								return P;
							},
							children: e,
							$$slots: { default: !0 }
						});
					});
				}
				p(i, l);
			},
			$$slots: { default: !0 }
		});
	}), p(c, f), l();
}
//#endregion
export { V as TooltipProvider, P as tether };
