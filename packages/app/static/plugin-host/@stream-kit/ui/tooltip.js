import { $n as e, Ct as t, Et as n, Hr as r, On as i, Qn as a, Qr as o, Qt as s, Vr as c, Z as l, Zn as u, a as d, cn as f, jt as p, ln as m, mn as h, ni as g, o as _, pr as v, s as y, un as b } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as x } from "../../chunks/utils-DJt177zd.js";
import { D as S } from "../../chunks/animations-complete-DFBLw3EK.js";
import { i as C, n as w } from "../../chunks/use-id-Dbt6eP9X.js";
import { r as T } from "../../chunks/dom-CAV9qhsv.js";
import { t as E } from "../../chunks/portal-BFSsRkE3.js";
import { a as D, n as O, r as k, t as A } from "../../chunks/popper-layer-force-mount-C0Qq7_vt.js";
import { i as j, n as M, r as N, t as P } from "../../chunks/tooltip-BnaOsZw-.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/tooltip/components/tooltip.svelte
function F(e, t) {
	r(t, !0);
	let n = d(t, "open", 15, !1), i = d(t, "triggerId", 15, null), o = d(t, "onOpenChange", 3, T), l = d(t, "onOpenChangeComplete", 3, T), u = j.create({
		open: S(() => n(), (e) => {
			n(e), o()(e);
		}),
		triggerId: S(() => i(), (e) => {
			i(e);
		}),
		delayDuration: S(() => t.delayDuration),
		disableCloseOnTriggerClick: S(() => t.disableCloseOnTriggerClick),
		disableHoverableContent: S(() => t.disableHoverableContent),
		ignoreNonKeyboardFocus: S(() => t.ignoreNonKeyboardFocus),
		disabled: S(() => t.disabled),
		onOpenChangeComplete: S(() => l()),
		tether: S(() => t.tether)
	});
	k(e, {
		tooltip: !0,
		children: (e, n) => {
			var r = m();
			s(a(r), () => t.children ?? g, () => ({
				open: u.opts.open.current,
				triggerId: u.activeTriggerId,
				payload: u.activePayload
			})), f(e, r);
		},
		$$slots: { default: !0 }
	}), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/tooltip/components/tooltip-content.svelte
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
]), L = b("<div><div><!></div></div>");
function R(e, t) {
	let n = h();
	r(t, !0);
	let b = d(t, "id", 19, () => w(n)), x = d(t, "ref", 15, null), E = d(t, "side", 3, "top"), k = d(t, "sideOffset", 3, 0), j = d(t, "align", 3, "center"), N = d(t, "avoidCollisions", 3, !0), P = d(t, "arrowPadding", 3, 0), F = d(t, "sticky", 3, "partial"), R = d(t, "hideWhenDetached", 3, !1), z = d(t, "collisionPadding", 3, 0), B = d(t, "onInteractOutside", 3, T), V = d(t, "onEscapeKeydown", 3, T), H = d(t, "forceMount", 3, !1), U = _(t, I), W = M.create({
		id: S(() => b()),
		ref: S(() => x(), (e) => x(e)),
		onInteractOutside: S(() => B()),
		onEscapeKeydown: S(() => V())
	}), G = v(() => ({
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
	})), K = v(() => C(U, i(G), W.props));
	var q = m(), J = a(q), Y = (e) => {
		{
			let n = (e, n) => {
				let r = () => n?.().props, c = () => n?.().wrapperProps, d = v(() => C(c(), { style: { pointerEvents: W.root.disableHoverableContent ? "none" : void 0 } })), h = v(() => C(r(), { style: D("tooltip") }, { style: t.style }));
				var _ = m(), y = a(_), b = (e) => {
					var n = m(), r = a(n);
					{
						let e = v(() => ({
							props: i(h),
							wrapperProps: i(d),
							...W.snippetProps
						}));
						s(r, () => t.child, () => i(e));
					}
					f(e, n);
				}, x = (e) => {
					var n = L();
					l(n, () => ({ ...i(d) }));
					var r = u(n);
					l(r, () => ({ ...i(h) })), s(u(r), () => t.children ?? g), o(r), o(n), f(e, n);
				};
				p(y, (e) => {
					t.child ? e(b) : e(x, -1);
				}), f(e, _);
			}, r = v(() => W.root.disableHoverableContent ? "none" : "auto");
			A(e, y(() => i(K), () => W.popperProps, {
				get enabled() {
					return W.root.opts.open.current;
				},
				get id() {
					return b();
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
					return i(r);
				},
				popper: n,
				$$slots: { popper: !0 }
			}));
		}
	}, X = (e) => {
		{
			let n = (e, n) => {
				let r = () => n?.().props, c = () => n?.().wrapperProps, d = v(() => C(c(), { style: { pointerEvents: W.root.disableHoverableContent ? "none" : void 0 } })), h = v(() => C(r(), { style: D("tooltip") }, { style: t.style }));
				var _ = m(), y = a(_), b = (e) => {
					var n = m(), r = a(n);
					{
						let e = v(() => ({
							props: i(h),
							wrapperProps: i(d),
							...W.snippetProps
						}));
						s(r, () => t.child, () => i(e));
					}
					f(e, n);
				}, x = (e) => {
					var n = L();
					l(n, () => ({ ...i(d) }));
					var r = u(n);
					l(r, () => ({ ...i(h) })), s(u(r), () => t.children ?? g), o(r), o(n), f(e, n);
				};
				p(y, (e) => {
					t.child ? e(b) : e(x, -1);
				}), f(e, _);
			}, r = v(() => W.root.disableHoverableContent ? "none" : "auto");
			O(e, y(() => i(K), () => W.popperProps, {
				get open() {
					return W.root.opts.open.current;
				},
				get id() {
					return b();
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
					return i(r);
				},
				popper: n,
				$$slots: { popper: !0 }
			}));
		}
	};
	p(J, (e) => {
		H() ? e(Y) : H() || e(X, 1);
	}), f(e, q), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/tooltip/components/tooltip-provider.svelte
function z(e, t) {
	r(t, !0);
	let n = d(t, "delayDuration", 3, 700), i = d(t, "disableCloseOnTriggerClick", 3, !1), o = d(t, "disableHoverableContent", 3, !1), l = d(t, "disabled", 3, !1), u = d(t, "ignoreNonKeyboardFocus", 3, !1), p = d(t, "skipDelayDuration", 3, 300);
	N.create({
		delayDuration: S(() => n()),
		disableCloseOnTriggerClick: S(() => i()),
		disableHoverableContent: S(() => o()),
		disabled: S(() => l()),
		ignoreNonKeyboardFocus: S(() => u()),
		skipDelayDuration: S(() => p())
	});
	var h = m();
	s(a(h), () => t.children ?? g), f(e, h), c();
}
//#endregion
//#region ../ui/src/lib/components/tooltip/tooltip-provider.svelte
var B = b("<!> <!>", 1);
function V(o, l) {
	r(l, !0);
	var u = m();
	t(a(u), () => z, (r, o) => {
		o(r, {
			disableHoverableContent: !0,
			children: (r, o) => {
				var c = B(), u = a(c);
				s(u, () => l.children ?? g);
				var d = e(u, 2);
				{
					let e = (e, r) => {
						let o = () => r?.().payload;
						var c = m();
						t(a(c), () => E, (e, r) => {
							r(e, {
								children: (e, r) => {
									var c = m(), l = a(c);
									{
										let e = v(() => x("z-110 max-w-xs rounded-none border border-dark-600 bg-dark-800 px-3 py-2 text-sm text-dark-200 shadow-md", "animate-in fade-in-0 zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"));
										t(l, () => R, (t, r) => {
											r(t, {
												side: "top",
												sideOffset: 4,
												get class() {
													return i(e);
												},
												children: (e, t) => {
													var r = m(), i = a(r), c = (e) => {
														var t = m(), n = a(t), r = (e) => {
															var t = m();
															s(a(t), () => o().snippet), f(e, t);
														}, i = (e) => {
															var t = m();
															s(a(t), () => o().snippet, () => o().arg), f(e, t);
														};
														p(n, (e) => {
															o().mode === "none" ? e(r) : e(i, -1);
														}), f(e, t);
													}, l = (e) => {
														var t = m();
														n(a(t), () => o().content), f(e, t);
													};
													p(i, (e) => {
														o()?.kind === "snippet" ? e(c) : o() && e(l, 1);
													}), f(e, r);
												},
												$$slots: { default: !0 }
											});
										});
									}
									f(e, c);
								},
								$$slots: { default: !0 }
							});
						}), f(e, c);
					};
					t(d, () => F, (t, n) => {
						n(t, {
							get tether() {
								return P;
							},
							children: e,
							$$slots: { default: !0 }
						});
					});
				}
				f(r, c);
			},
			$$slots: { default: !0 }
		});
	}), f(o, u), c();
}
//#endregion
export { V as TooltipProvider, P as tether };
