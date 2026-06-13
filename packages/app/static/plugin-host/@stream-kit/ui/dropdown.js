import { $n as e, At as t, Gt as n, Hr as r, Mt as i, On as a, Qn as o, Qr as s, Vr as c, Wn as l, Zn as u, Zr as d, ai as f, an as p, dn as m, f as h, in as g, it as _, m as v, nn as y, on as b, p as x, pr as S, un as C } from "../../chunks/index-client-BHp3UA-q.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as w } from "../../chunks/Icon-CzS4be53.js";
import { t as T } from "../../chunks/utils-CRERhYYg.js";
import { D as E } from "../../chunks/animations-complete-LXv254CE.js";
import { C as D, S as O, a as k, c as A, d as j, f as M, l as N, n as P, o as F, p as I, r as L, s as ee, t as te, u as R } from "../../chunks/popper-layer-force-mount-D-61-5ih.js";
import { i as z, n as B } from "../../chunks/use-id-BrfCmVmn.js";
import { a as V } from "../../chunks/presence-manager.svelte-BwnRDFCN.js";
import { t as H } from "../../chunks/floating-layer-anchor-D-QDnc3J.js";
import { t as U } from "../../chunks/scroll-area-D4RE1kQW.js";
import { t as W } from "../../chunks/button-DWJNkhZM.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/menu/components/menu-sub.svelte
function ne(e, t) {
	r(t, !0);
	let n = h(t, "open", 15, !1), a = h(t, "onOpenChange", 3, D), s = h(t, "onOpenChangeComplete", 3, D);
	I.create({
		open: E(() => n(), (e) => {
			n(e), a()?.(e);
		}),
		onOpenChangeComplete: E(() => s())
	}), L(e, {
		children: (e, n) => {
			var r = p();
			i(o(r), () => t.children ?? f), g(e, r);
		},
		$$slots: { default: !0 }
	}), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/menu/components/menu-item.svelte
var G = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"ref",
	"id",
	"disabled",
	"onSelect",
	"closeOnSelect"
]), K = b("<div><!></div>");
function q(e, t) {
	let l = C();
	r(t, !0);
	let d = h(t, "ref", 15, null), m = h(t, "id", 19, () => B(l)), v = h(t, "disabled", 3, !1), y = h(t, "onSelect", 3, D), b = h(t, "closeOnSelect", 3, !0), w = x(t, G), T = A.create({
		id: E(() => m()),
		disabled: E(() => v()),
		onSelect: E(() => y()),
		ref: E(() => d(), (e) => d(e)),
		closeOnSelect: E(() => b())
	}), O = S(() => z(w, T.props));
	var k = p(), j = o(k), M = (e) => {
		var n = p();
		i(o(n), () => t.child, () => ({ props: a(O) })), g(e, n);
	}, N = (e) => {
		var n = K();
		_(n, () => ({ ...a(O) })), i(u(n), () => t.children ?? f), s(n), g(e, n);
	};
	n(j, (e) => {
		t.child ? e(M) : e(N, -1);
	}), g(e, k), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/menu/components/menu-sub-content.svelte
var re = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"loop",
	"onInteractOutside",
	"forceMount",
	"onEscapeKeydown",
	"interactOutsideBehavior",
	"escapeKeydownBehavior",
	"onOpenAutoFocus",
	"onCloseAutoFocus",
	"onFocusOutside",
	"side",
	"trapFocus",
	"style"
]), J = b("<div><div><!></div></div>");
function Y(e, t) {
	let l = C();
	r(t, !0);
	let d = h(t, "id", 19, () => B(l)), m = h(t, "ref", 15, null), y = h(t, "loop", 3, !0), b = h(t, "onInteractOutside", 3, D), w = h(t, "forceMount", 3, !1), T = h(t, "onEscapeKeydown", 3, D), A = h(t, "interactOutsideBehavior", 3, "defer-otherwise-close"), j = h(t, "escapeKeydownBehavior", 3, "defer-otherwise-close"), M = h(t, "onOpenAutoFocus", 3, D), N = h(t, "onCloseAutoFocus", 3, D), F = h(t, "onFocusOutside", 3, D), I = h(t, "side", 3, "right"), L = h(t, "trapFocus", 3, !1), H = x(t, re), U = ee.create({
		id: E(() => d()),
		loop: E(() => y()),
		ref: E(() => m(), (e) => m(e)),
		isSub: !0,
		onCloseAutoFocus: E(() => q)
	});
	function W(e) {
		let t = e.currentTarget.contains(e.target), n = O[U.parentMenu.root.opts.dir.current].includes(e.key);
		t && n && (U.parentMenu.onClose(), U.parentMenu.triggerNode?.focus(), e.preventDefault());
	}
	let ne = S(() => U.parentMenu.root.getBitsAttr("sub-content")), G = S(() => z(H, U.props, {
		side: I(),
		onkeydown: W,
		[a(ne)]: ""
	}));
	function K(e) {
		M()(e), !e.defaultPrevented && (e.preventDefault(), U.parentMenu.root.isUsingKeyboard && U.parentMenu.contentNode && R.dispatch(U.parentMenu.contentNode));
	}
	function q(e) {
		N()(e), !e.defaultPrevented && e.preventDefault();
	}
	function Y(e) {
		b()(e), !e.defaultPrevented && U.parentMenu.onClose();
	}
	function X(e) {
		T()(e), !e.defaultPrevented && U.parentMenu.onClose();
	}
	function Z(e) {
		if (F()(e), e.defaultPrevented || !V(e.target) || e.target.id === U.parentMenu.triggerNode?.id) return;
		if ((U.parentMenu.parentMenu?.contentNode)?.contains(e.target)) {
			U.parentMenu.onClose(), e.preventDefault();
			return;
		}
		let t = `[${U.parentMenu.root.getBitsAttr("sub-content")}]`;
		if (e.target.closest(t)) {
			e.preventDefault();
			return;
		}
		U.parentMenu.onClose();
	}
	var Q = p(), ie = o(Q), ae = (e) => {
		te(e, v(() => a(G), {
			get ref() {
				return U.opts.ref;
			},
			get interactOutsideBehavior() {
				return A();
			},
			get escapeKeydownBehavior() {
				return j();
			},
			onOpenAutoFocus: K,
			get enabled() {
				return U.parentMenu.opts.open.current;
			},
			onInteractOutside: Y,
			onEscapeKeydown: X,
			onFocusOutside: Z,
			preventScroll: !1,
			get loop() {
				return y();
			},
			get trapFocus() {
				return L();
			},
			get shouldRender() {
				return U.shouldRender;
			},
			popper: (e, r) => {
				let c = () => r?.().props, l = () => r?.().wrapperProps, d = S(() => z(c(), a(G), { style: k("menu") }, { style: t.style }));
				var m = p(), h = o(m), v = (e) => {
					var n = p(), r = o(n);
					{
						let e = S(() => ({
							props: a(d),
							wrapperProps: l(),
							...U.snippetProps
						}));
						i(r, () => t.child, () => a(e));
					}
					g(e, n);
				}, y = (e) => {
					var n = J();
					_(n, () => ({ ...l() }));
					var r = u(n);
					_(r, () => ({ ...a(d) })), i(u(r), () => t.children ?? f), s(r), s(n), g(e, n);
				};
				n(h, (e) => {
					t.child ? e(v) : e(y, -1);
				}), g(e, m);
			},
			$$slots: { popper: !0 }
		}));
	}, $ = (e) => {
		P(e, v(() => a(G), {
			get ref() {
				return U.opts.ref;
			},
			get interactOutsideBehavior() {
				return A();
			},
			get escapeKeydownBehavior() {
				return j();
			},
			onCloseAutoFocus: q,
			onOpenAutoFocus: K,
			get open() {
				return U.parentMenu.opts.open.current;
			},
			onInteractOutside: Y,
			onEscapeKeydown: X,
			onFocusOutside: Z,
			preventScroll: !1,
			get loop() {
				return y();
			},
			get trapFocus() {
				return L();
			},
			get shouldRender() {
				return U.shouldRender;
			},
			popper: (e, r) => {
				let c = () => r?.().props, l = () => r?.().wrapperProps, d = S(() => z(c(), a(G), { style: k("menu") }, { style: t.style }));
				var m = p(), h = o(m), v = (e) => {
					var n = p(), r = o(n);
					{
						let e = S(() => ({
							props: a(d),
							wrapperProps: l(),
							...U.snippetProps
						}));
						i(r, () => t.child, () => a(e));
					}
					g(e, n);
				}, y = (e) => {
					var n = J();
					_(n, () => ({ ...l() }));
					var r = u(n);
					_(r, () => ({ ...a(d) })), i(u(r), () => t.children ?? f), s(r), s(n), g(e, n);
				};
				n(h, (e) => {
					t.child ? e(v) : e(y, -1);
				}), g(e, m);
			},
			$$slots: { popper: !0 }
		}));
	};
	n(ie, (e) => {
		w() ? e(ae) : w() || e($, 1);
	}), g(e, Q), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/menu/components/menu-sub-trigger.svelte
var X = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"disabled",
	"ref",
	"children",
	"child",
	"onSelect",
	"openDelay"
]), Z = b("<div><!></div>");
function Q(e, t) {
	let l = C();
	r(t, !0);
	let d = h(t, "id", 19, () => B(l)), m = h(t, "disabled", 3, !1), v = h(t, "ref", 15, null), y = h(t, "onSelect", 3, D), b = h(t, "openDelay", 3, 0), w = x(t, X), T = M.create({
		disabled: E(() => m()),
		onSelect: E(() => y()),
		id: E(() => d()),
		ref: E(() => v(), (e) => v(e)),
		openDelay: E(() => b())
	}), O = S(() => z(w, T.props));
	H(e, {
		get id() {
			return d();
		},
		get ref() {
			return T.opts.ref;
		},
		children: (e, r) => {
			var c = p(), l = o(c), d = (e) => {
				var n = p();
				i(o(n), () => t.child, () => ({ props: a(O) })), g(e, n);
			}, m = (e) => {
				var n = Z();
				_(n, () => ({ ...a(O) })), i(u(n), () => t.children ?? f), s(n), g(e, n);
			};
			n(l, (e) => {
				t.child ? e(d) : e(m, -1);
			}), g(e, c);
		},
		$$slots: { default: !0 }
	}), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/menu/components/menu.svelte
function ie(e, t) {
	r(t, !0);
	let n = h(t, "open", 15, !1), a = h(t, "dir", 3, "ltr"), s = h(t, "onOpenChange", 3, D), l = h(t, "onOpenChangeComplete", 3, D), u = h(t, "_internal_variant", 3, "dropdown-menu"), d = h(t, "_internal_should_skip_exit_animation", 3, void 0), m = j.create({
		variant: E(() => u()),
		dir: E(() => a()),
		onClose: () => {
			n(!1), s()(!1);
		},
		shouldSkipExitAnimation: () => d()?.() ?? !1
	});
	N.create({
		open: E(() => n(), (e) => {
			n(e), s()(e);
		}),
		onOpenChangeComplete: E(() => l())
	}, m), L(e, {
		children: (e, n) => {
			var r = p();
			i(o(r), () => t.children ?? f), g(e, r);
		},
		$$slots: { default: !0 }
	}), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/dropdown-menu/components/dropdown-menu-content.svelte
var ae = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"child",
	"children",
	"ref",
	"loop",
	"onInteractOutside",
	"onEscapeKeydown",
	"onCloseAutoFocus",
	"forceMount",
	"trapFocus",
	"style"
]), $ = b("<div><div><!></div></div>");
function oe(e, t) {
	let l = C();
	r(t, !0);
	let d = h(t, "id", 19, () => B(l)), m = h(t, "ref", 15, null), y = h(t, "loop", 3, !0), b = h(t, "onInteractOutside", 3, D), w = h(t, "onEscapeKeydown", 3, D), T = h(t, "onCloseAutoFocus", 3, D), O = h(t, "forceMount", 3, !1), A = h(t, "trapFocus", 3, !1), j = x(t, ae), M = ee.create({
		id: E(() => d()),
		loop: E(() => y()),
		ref: E(() => m(), (e) => m(e)),
		onCloseAutoFocus: E(() => T())
	}), N = S(() => z(j, M.props));
	function F(e) {
		if (M.handleInteractOutside(e), !e.defaultPrevented && (b()(e), !e.defaultPrevented)) {
			if (e.target && e.target instanceof Element) {
				let t = `[${M.parentMenu.root.getBitsAttr("sub-content")}]`;
				if (e.target.closest(t)) return;
			}
			M.parentMenu.onClose();
		}
	}
	function I(e) {
		w()(e), !e.defaultPrevented && M.parentMenu.onClose();
	}
	var L = p(), R = o(L), V = (e) => {
		te(e, v(() => a(N), () => M.popperProps, {
			get ref() {
				return M.opts.ref;
			},
			get enabled() {
				return M.parentMenu.opts.open.current;
			},
			onInteractOutside: F,
			onEscapeKeydown: I,
			get trapFocus() {
				return A();
			},
			get loop() {
				return y();
			},
			forceMount: !0,
			get id() {
				return d();
			},
			get shouldRender() {
				return M.shouldRender;
			},
			popper: (e, r) => {
				let c = () => r?.().props, l = () => r?.().wrapperProps, d = S(() => z(c(), { style: k("dropdown-menu") }, { style: t.style }));
				var m = p(), h = o(m), v = (e) => {
					var n = p(), r = o(n);
					{
						let e = S(() => ({
							props: a(d),
							wrapperProps: l(),
							...M.snippetProps
						}));
						i(r, () => t.child, () => a(e));
					}
					g(e, n);
				}, y = (e) => {
					var n = $();
					_(n, () => ({ ...l() }));
					var r = u(n);
					_(r, () => ({ ...a(d) })), i(u(r), () => t.children ?? f), s(r), s(n), g(e, n);
				};
				n(h, (e) => {
					t.child ? e(v) : e(y, -1);
				}), g(e, m);
			},
			$$slots: { popper: !0 }
		}));
	}, H = (e) => {
		P(e, v(() => a(N), () => M.popperProps, {
			get ref() {
				return M.opts.ref;
			},
			get open() {
				return M.parentMenu.opts.open.current;
			},
			onInteractOutside: F,
			onEscapeKeydown: I,
			get trapFocus() {
				return A();
			},
			get loop() {
				return y();
			},
			forceMount: !1,
			get id() {
				return d();
			},
			get shouldRender() {
				return M.shouldRender;
			},
			popper: (e, r) => {
				let c = () => r?.().props, l = () => r?.().wrapperProps, d = S(() => z(c(), { style: k("dropdown-menu") }, { style: t.style }));
				var m = p(), h = o(m), v = (e) => {
					var n = p(), r = o(n);
					{
						let e = S(() => ({
							props: a(d),
							wrapperProps: l(),
							...M.snippetProps
						}));
						i(r, () => t.child, () => a(e));
					}
					g(e, n);
				}, y = (e) => {
					var n = $();
					_(n, () => ({ ...l() }));
					var r = u(n);
					_(r, () => ({ ...a(d) })), i(u(r), () => t.children ?? f), s(r), s(n), g(e, n);
				};
				n(h, (e) => {
					t.child ? e(v) : e(y, -1);
				}), g(e, m);
			},
			$$slots: { popper: !0 }
		}));
	};
	n(R, (e) => {
		O() ? e(V) : O() || e(H, 1);
	}), g(e, L), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/menu/components/menu-trigger.svelte
var se = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"disabled",
	"type"
]), ce = b("<button><!></button>");
function le(e, t) {
	let l = C();
	r(t, !0);
	let d = h(t, "id", 19, () => B(l)), m = h(t, "ref", 15, null), v = h(t, "disabled", 3, !1), y = h(t, "type", 3, "button"), b = x(t, se), w = F.create({
		id: E(() => d()),
		disabled: E(() => v() ?? !1),
		ref: E(() => m(), (e) => m(e))
	}), T = S(() => z(b, w.props, { type: y() }));
	H(e, {
		get id() {
			return d();
		},
		get ref() {
			return w.opts.ref;
		},
		children: (e, r) => {
			var c = p(), l = o(c), d = (e) => {
				var n = p();
				i(o(n), () => t.child, () => ({ props: a(T) })), g(e, n);
			}, m = (e) => {
				var n = ce();
				_(n, () => ({ ...a(T) })), i(u(n), () => t.children ?? f), s(n), g(e, n);
			};
			n(l, (e) => {
				t.child ? e(d) : e(m, -1);
			}), g(e, c);
		},
		$$slots: { default: !0 }
	}), c();
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown-content.svelte
var ue = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function de(e, n) {
	r(n, !0);
	let s = x(n, ue);
	var l = p(), u = o(l);
	{
		let e = S(() => T("min-w-(--bits-floating-anchor-width) rounded-xl bg-dark-800 p-[5px] shadow-md", "relative z-50 border border-dark-600"));
		t(u, () => oe, (t, r) => {
			r(t, v(() => s, {
				get class() {
					return a(e);
				},
				sideOffset: 4,
				children: (e, t) => {
					U(e, {
						orientation: "vertical",
						viewportClasses: "max-h-120 overflow-hidden",
						children: (e, t) => {
							var r = p();
							i(o(r), () => n.children ?? f), g(e, r);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			}));
		});
	}
	g(e, l), c();
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown-item.svelte
var fe = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function pe(e, n) {
	r(n, !0);
	let s = x(n, fe);
	var l = p(), u = o(l);
	{
		let e = S(() => T("cursor-pointer rounded-md px-4 py-2 outline-none hover:bg-dark-700", n.class));
		t(u, () => q, (t, r) => {
			r(t, v(() => s, {
				get class() {
					return a(e);
				},
				children: (e, t) => {
					var r = p();
					i(o(r), () => n.children ?? f), g(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	g(e, l), c();
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown-sub-content.svelte
var me = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function he(e, n) {
	r(n, !0);
	let s = x(n, me);
	var l = p(), u = o(l);
	{
		let e = S(() => T("min-w-(--bits-floating-anchor-width) rounded-xl bg-dark-800 p-[5px] shadow-md", "border border-dark-600", n.class));
		t(u, () => Y, (t, r) => {
			r(t, v(() => s, {
				get class() {
					return a(e);
				},
				sideOffset: 12,
				children: (e, t) => {
					var r = p();
					i(o(r), () => n.children ?? f), g(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	g(e, l), c();
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown-sub-trigger.svelte
var ge = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]), _e = b("<!> <!>", 1);
function ve(n, s) {
	r(s, !0);
	let l = x(s, ge);
	var u = p(), d = o(u);
	{
		let n = S(() => T("flex cursor-pointer items-center justify-between gap-2 rounded-md px-4 py-2 outline-none hover:bg-dark-700", "data-[state=open]:bg-dark-700", s.class));
		t(d, () => Q, (t, r) => {
			r(t, v(() => l, {
				get class() {
					return a(n);
				},
				children: (t, n) => {
					var r = _e(), a = o(r);
					i(a, () => s.children ?? f), w(e(a, 2), { icon: "ri:arrow-right-s-line" }), g(t, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	g(n, u), c();
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown-sub.svelte
var ye = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function be(e, n) {
	let r = x(n, ye);
	var a = p();
	t(o(a), () => ne, (e, t) => {
		t(e, v(() => r, {
			children: (e, t) => {
				var r = p();
				i(o(r), () => n.children ?? f), g(e, r);
			},
			$$slots: { default: !0 }
		}));
	}), g(e, a);
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown.svelte
var xe = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"trigger"
]), Se = b("<!> <!>", 1);
function Ce(r, a) {
	let s = x(a, xe);
	var c = p();
	t(o(c), () => ie, (r, c) => {
		c(r, v(() => s, {
			children: (r, s) => {
				var c = Se(), u = o(c);
				{
					let e = (e, t) => {
						let r = () => t?.().props;
						var s = p(), c = o(s), u = (e) => {
							W(e, v(r, {
								variant: "outline",
								children: (e, t) => {
									d();
									var n = m();
									l(() => y(n, a.trigger)), g(e, n);
								},
								$$slots: { default: !0 }
							}));
						}, f = (e) => {
							var t = p();
							i(o(t), () => a.trigger, () => ({ props: r() })), g(e, t);
						};
						n(c, (e) => {
							typeof a.trigger == "string" ? e(u) : e(f, -1);
						}), g(e, s);
					};
					t(u, () => le, (t, n) => {
						n(t, {
							child: e,
							$$slots: { child: !0 }
						});
					});
				}
				i(e(u, 2), () => a.children ?? f), g(r, c);
			},
			$$slots: { default: !0 }
		}));
	}), g(r, c);
}
//#endregion
export { de as Content, pe as Item, Ce as Root, be as Sub, he as SubContent, ve as SubTrigger };
