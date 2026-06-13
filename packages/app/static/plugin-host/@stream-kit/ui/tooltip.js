import { $n as e, At as t, Bt as n, Gt as r, Hr as i, Mt as a, On as o, Qn as s, Qr as c, Vr as l, Zn as u, ai as d, an as f, f as p, in as m, it as h, m as g, on as _, p as v, pr as y, un as b } from "../../chunks/index-client-BHp3UA-q.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as x } from "../../chunks/utils-CRERhYYg.js";
import { D as S } from "../../chunks/animations-complete-LXv254CE.js";
import { C, a as w, n as T, r as E, t as D } from "../../chunks/popper-layer-force-mount-D-61-5ih.js";
import { i as O, n as k } from "../../chunks/use-id-BrfCmVmn.js";
import { t as A } from "../../chunks/portal-BuwWXxyh.js";
import { i as j, n as M, r as N, t as P } from "../../chunks/tooltip-k4qat-sK.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/tooltip/components/tooltip.svelte
function F(e, t) {
	i(t, !0);
	let n = p(t, "open", 15, !1), r = p(t, "triggerId", 15, null), o = p(t, "onOpenChange", 3, C), c = p(t, "onOpenChangeComplete", 3, C), u = j.create({
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
	E(e, {
		tooltip: !0,
		children: (e, n) => {
			var r = f();
			a(s(r), () => t.children ?? d, () => ({
				open: u.opts.open.current,
				triggerId: u.activeTriggerId,
				payload: u.activePayload
			})), m(e, r);
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
	let _ = p(t, "id", 19, () => k(n)), x = p(t, "ref", 15, null), E = p(t, "side", 3, "top"), A = p(t, "sideOffset", 3, 0), j = p(t, "align", 3, "center"), N = p(t, "avoidCollisions", 3, !0), P = p(t, "arrowPadding", 3, 0), F = p(t, "sticky", 3, "partial"), R = p(t, "hideWhenDetached", 3, !1), z = p(t, "collisionPadding", 3, 0), B = p(t, "onInteractOutside", 3, C), V = p(t, "onEscapeKeydown", 3, C), H = p(t, "forceMount", 3, !1), U = v(t, I), W = M.create({
		id: S(() => _()),
		ref: S(() => x(), (e) => x(e)),
		onInteractOutside: S(() => B()),
		onEscapeKeydown: S(() => V())
	}), G = y(() => ({
		side: E(),
		sideOffset: A(),
		align: j(),
		avoidCollisions: N(),
		arrowPadding: P(),
		sticky: F(),
		hideWhenDetached: R(),
		collisionPadding: z(),
		strategy: t.strategy,
		customAnchor: t.customAnchor ?? W.root.triggerNode
	})), K = y(() => O(U, o(G), W.props));
	var q = f(), J = s(q), Y = (e) => {
		{
			let n = (e, n) => {
				let i = () => n?.().props, l = () => n?.().wrapperProps, p = y(() => O(l(), { style: { pointerEvents: W.root.disableHoverableContent ? "none" : void 0 } })), g = y(() => O(i(), { style: w("tooltip") }, { style: t.style }));
				var _ = f(), v = s(_), b = (e) => {
					var n = f(), r = s(n);
					{
						let e = y(() => ({
							props: o(g),
							wrapperProps: o(p),
							...W.snippetProps
						}));
						a(r, () => t.child, () => o(e));
					}
					m(e, n);
				}, x = (e) => {
					var n = L();
					h(n, () => ({ ...o(p) }));
					var r = u(n);
					h(r, () => ({ ...o(g) })), a(u(r), () => t.children ?? d), c(r), c(n), m(e, n);
				};
				r(v, (e) => {
					t.child ? e(b) : e(x, -1);
				}), m(e, _);
			}, i = y(() => W.root.disableHoverableContent ? "none" : "auto");
			D(e, g(() => o(K), () => W.popperProps, {
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
				let i = () => n?.().props, l = () => n?.().wrapperProps, p = y(() => O(l(), { style: { pointerEvents: W.root.disableHoverableContent ? "none" : void 0 } })), g = y(() => O(i(), { style: w("tooltip") }, { style: t.style }));
				var _ = f(), v = s(_), b = (e) => {
					var n = f(), r = s(n);
					{
						let e = y(() => ({
							props: o(g),
							wrapperProps: o(p),
							...W.snippetProps
						}));
						a(r, () => t.child, () => o(e));
					}
					m(e, n);
				}, x = (e) => {
					var n = L();
					h(n, () => ({ ...o(p) }));
					var r = u(n);
					h(r, () => ({ ...o(g) })), a(u(r), () => t.children ?? d), c(r), c(n), m(e, n);
				};
				r(v, (e) => {
					t.child ? e(b) : e(x, -1);
				}), m(e, _);
			}, i = y(() => W.root.disableHoverableContent ? "none" : "auto");
			T(e, g(() => o(K), () => W.popperProps, {
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
	}), m(e, q), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/tooltip/components/tooltip-provider.svelte
function z(e, t) {
	i(t, !0);
	let n = p(t, "delayDuration", 3, 700), r = p(t, "disableCloseOnTriggerClick", 3, !1), o = p(t, "disableHoverableContent", 3, !1), c = p(t, "disabled", 3, !1), u = p(t, "ignoreNonKeyboardFocus", 3, !1), h = p(t, "skipDelayDuration", 3, 300);
	N.create({
		delayDuration: S(() => n()),
		disableCloseOnTriggerClick: S(() => r()),
		disableHoverableContent: S(() => o()),
		disabled: S(() => c()),
		ignoreNonKeyboardFocus: S(() => u()),
		skipDelayDuration: S(() => h())
	});
	var g = f();
	a(s(g), () => t.children ?? d), m(e, g), l();
}
//#endregion
//#region ../ui/src/lib/components/tooltip/tooltip-provider.svelte
var B = _("<!> <!>", 1);
function V(c, u) {
	i(u, !0);
	var p = f();
	t(s(p), () => z, (i, c) => {
		c(i, {
			disableHoverableContent: !0,
			children: (i, c) => {
				var l = B(), p = s(l);
				a(p, () => u.children ?? d);
				var h = e(p, 2);
				{
					let e = (e, i) => {
						let c = () => i?.().payload, l = () => i?.().open;
						var u = f(), d = s(u), p = (e) => {
							var i = f();
							t(s(i), () => A, (e, i) => {
								i(e, {
									children: (e, i) => {
										var l = f(), u = s(l);
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
														var i = f(), o = s(i), l = (e) => {
															var t = f(), n = s(t), i = (e) => {
																var t = f();
																a(s(t), () => c().snippet), m(e, t);
															}, o = (e) => {
																var t = f();
																a(s(t), () => c().snippet, () => c().arg), m(e, t);
															};
															r(n, (e) => {
																c().mode === "none" ? e(i) : e(o, -1);
															}), m(e, t);
														}, u = (e) => {
															var t = f();
															n(s(t), () => c().content), m(e, t);
														};
														r(o, (e) => {
															c().kind === "snippet" ? e(l) : e(u, -1);
														}), m(e, i);
													},
													$$slots: { default: !0 }
												});
											});
										}
										m(e, l);
									},
									$$slots: { default: !0 }
								});
							}), m(e, i);
						};
						r(d, (e) => {
							l() && c() != null && e(p);
						}), m(e, u);
					};
					t(h, () => F, (t, n) => {
						n(t, {
							get tether() {
								return P;
							},
							children: e,
							$$slots: { default: !0 }
						});
					});
				}
				m(i, l);
			},
			$$slots: { default: !0 }
		});
	}), m(c, p), l();
}
//#endregion
export { V as TooltipProvider, P as tether };
