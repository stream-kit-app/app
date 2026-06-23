import { $n as e, At as t, Gt as n, Hr as r, Mt as i, On as a, Qn as o, Qr as s, Vr as c, Wn as l, Zn as u, Zr as d, an as f, dn as p, f as m, in as h, it as g, m as _, ni as v, nn as y, on as b, p as x, pr as S, un as C } from "../../chunks/index-client-BIJQxc2l.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as w } from "../../chunks/Icon-BoHmh-pv.js";
import { t as T } from "../../chunks/utils-DVQ4nj8f.js";
import { D as E } from "../../chunks/animations-complete-mSylzqL5.js";
import { S as D, c as O, d as k, f as A, l as j, o as M, p as N, s as P, u as F } from "../../chunks/scroll-lock-io5BKwUu.js";
import { i as I, n as L } from "../../chunks/use-id-D_eLoXvH.js";
import { r as R } from "../../chunks/dom-DDAYniBq.js";
import { a as z } from "../../chunks/presence-manager.svelte-DXU099Vb.js";
import { a as B, n as V, r as H, t as ee } from "../../chunks/popper-layer-force-mount-CGFPxfB5.js";
import { t as U } from "../../chunks/floating-layer-anchor-Cdr3yIGO.js";
import { t as W } from "../../chunks/scroll-area-99QA2aRD.js";
import { t as te } from "../../chunks/button-CZMpEwOs.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/menu/components/menu-sub.svelte
function ne(e, t) {
	r(t, !0);
	let n = m(t, "open", 15, !1), a = m(t, "onOpenChange", 3, R), s = m(t, "onOpenChangeComplete", 3, R);
	N.create({
		open: E(() => n(), (e) => {
			n(e), a()?.(e);
		}),
		onOpenChangeComplete: E(() => s())
	}), H(e, {
		children: (e, n) => {
			var r = f();
			i(o(r), () => t.children ?? v), h(e, r);
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
	let d = m(t, "ref", 15, null), p = m(t, "id", 19, () => L(l)), _ = m(t, "disabled", 3, !1), y = m(t, "onSelect", 3, R), b = m(t, "closeOnSelect", 3, !0), w = x(t, G), T = O.create({
		id: E(() => p()),
		disabled: E(() => _()),
		onSelect: E(() => y()),
		ref: E(() => d(), (e) => d(e)),
		closeOnSelect: E(() => b())
	}), D = S(() => I(w, T.props));
	var k = f(), A = o(k), j = (e) => {
		var n = f();
		i(o(n), () => t.child, () => ({ props: a(D) })), h(e, n);
	}, M = (e) => {
		var n = K();
		g(n, () => ({ ...a(D) })), i(u(n), () => t.children ?? v), s(n), h(e, n);
	};
	n(A, (e) => {
		t.child ? e(j) : e(M, -1);
	}), h(e, k), c();
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
	let d = m(t, "id", 19, () => L(l)), p = m(t, "ref", 15, null), y = m(t, "loop", 3, !0), b = m(t, "onInteractOutside", 3, R), w = m(t, "forceMount", 3, !1), T = m(t, "onEscapeKeydown", 3, R), O = m(t, "interactOutsideBehavior", 3, "defer-otherwise-close"), k = m(t, "escapeKeydownBehavior", 3, "defer-otherwise-close"), A = m(t, "onOpenAutoFocus", 3, R), j = m(t, "onCloseAutoFocus", 3, R), M = m(t, "onFocusOutside", 3, R), N = m(t, "side", 3, "right"), H = m(t, "trapFocus", 3, !1), U = x(t, re), W = P.create({
		id: E(() => d()),
		loop: E(() => y()),
		ref: E(() => p(), (e) => p(e)),
		isSub: !0,
		onCloseAutoFocus: E(() => q)
	});
	function te(e) {
		let t = e.currentTarget.contains(e.target), n = D[W.parentMenu.root.opts.dir.current].includes(e.key);
		t && n && (W.parentMenu.onClose(), W.parentMenu.triggerNode?.focus(), e.preventDefault());
	}
	let ne = S(() => W.parentMenu.root.getBitsAttr("sub-content")), G = S(() => I(U, W.props, {
		side: N(),
		onkeydown: te,
		[a(ne)]: ""
	}));
	function K(e) {
		A()(e), !e.defaultPrevented && (e.preventDefault(), W.parentMenu.root.isUsingKeyboard && W.parentMenu.contentNode && F.dispatch(W.parentMenu.contentNode));
	}
	function q(e) {
		j()(e), !e.defaultPrevented && e.preventDefault();
	}
	function Y(e) {
		b()(e), !e.defaultPrevented && W.parentMenu.onClose();
	}
	function X(e) {
		T()(e), !e.defaultPrevented && W.parentMenu.onClose();
	}
	function Z(e) {
		if (M()(e), e.defaultPrevented || !z(e.target) || e.target.id === W.parentMenu.triggerNode?.id) return;
		if ((W.parentMenu.parentMenu?.contentNode)?.contains(e.target)) {
			W.parentMenu.onClose(), e.preventDefault();
			return;
		}
		let t = `[${W.parentMenu.root.getBitsAttr("sub-content")}]`;
		if (e.target.closest(t)) {
			e.preventDefault();
			return;
		}
		W.parentMenu.onClose();
	}
	var Q = f(), ie = o(Q), ae = (e) => {
		ee(e, _(() => a(G), {
			get ref() {
				return W.opts.ref;
			},
			get interactOutsideBehavior() {
				return O();
			},
			get escapeKeydownBehavior() {
				return k();
			},
			onOpenAutoFocus: K,
			get enabled() {
				return W.parentMenu.opts.open.current;
			},
			onInteractOutside: Y,
			onEscapeKeydown: X,
			onFocusOutside: Z,
			preventScroll: !1,
			get loop() {
				return y();
			},
			get trapFocus() {
				return H();
			},
			get shouldRender() {
				return W.shouldRender;
			},
			popper: (e, r) => {
				let c = () => r?.().props, l = () => r?.().wrapperProps, d = S(() => I(c(), a(G), { style: B("menu") }, { style: t.style }));
				var p = f(), m = o(p), _ = (e) => {
					var n = f(), r = o(n);
					{
						let e = S(() => ({
							props: a(d),
							wrapperProps: l(),
							...W.snippetProps
						}));
						i(r, () => t.child, () => a(e));
					}
					h(e, n);
				}, y = (e) => {
					var n = J();
					g(n, () => ({ ...l() }));
					var r = u(n);
					g(r, () => ({ ...a(d) })), i(u(r), () => t.children ?? v), s(r), s(n), h(e, n);
				};
				n(m, (e) => {
					t.child ? e(_) : e(y, -1);
				}), h(e, p);
			},
			$$slots: { popper: !0 }
		}));
	}, $ = (e) => {
		V(e, _(() => a(G), {
			get ref() {
				return W.opts.ref;
			},
			get interactOutsideBehavior() {
				return O();
			},
			get escapeKeydownBehavior() {
				return k();
			},
			onCloseAutoFocus: q,
			onOpenAutoFocus: K,
			get open() {
				return W.parentMenu.opts.open.current;
			},
			onInteractOutside: Y,
			onEscapeKeydown: X,
			onFocusOutside: Z,
			preventScroll: !1,
			get loop() {
				return y();
			},
			get trapFocus() {
				return H();
			},
			get shouldRender() {
				return W.shouldRender;
			},
			popper: (e, r) => {
				let c = () => r?.().props, l = () => r?.().wrapperProps, d = S(() => I(c(), a(G), { style: B("menu") }, { style: t.style }));
				var p = f(), m = o(p), _ = (e) => {
					var n = f(), r = o(n);
					{
						let e = S(() => ({
							props: a(d),
							wrapperProps: l(),
							...W.snippetProps
						}));
						i(r, () => t.child, () => a(e));
					}
					h(e, n);
				}, y = (e) => {
					var n = J();
					g(n, () => ({ ...l() }));
					var r = u(n);
					g(r, () => ({ ...a(d) })), i(u(r), () => t.children ?? v), s(r), s(n), h(e, n);
				};
				n(m, (e) => {
					t.child ? e(_) : e(y, -1);
				}), h(e, p);
			},
			$$slots: { popper: !0 }
		}));
	};
	n(ie, (e) => {
		w() ? e(ae) : w() || e($, 1);
	}), h(e, Q), c();
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
	let d = m(t, "id", 19, () => L(l)), p = m(t, "disabled", 3, !1), _ = m(t, "ref", 15, null), y = m(t, "onSelect", 3, R), b = m(t, "openDelay", 3, 0), w = x(t, X), T = A.create({
		disabled: E(() => p()),
		onSelect: E(() => y()),
		id: E(() => d()),
		ref: E(() => _(), (e) => _(e)),
		openDelay: E(() => b())
	}), D = S(() => I(w, T.props));
	U(e, {
		get id() {
			return d();
		},
		get ref() {
			return T.opts.ref;
		},
		children: (e, r) => {
			var c = f(), l = o(c), d = (e) => {
				var n = f();
				i(o(n), () => t.child, () => ({ props: a(D) })), h(e, n);
			}, p = (e) => {
				var n = Z();
				g(n, () => ({ ...a(D) })), i(u(n), () => t.children ?? v), s(n), h(e, n);
			};
			n(l, (e) => {
				t.child ? e(d) : e(p, -1);
			}), h(e, c);
		},
		$$slots: { default: !0 }
	}), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/menu/components/menu.svelte
function ie(e, t) {
	r(t, !0);
	let n = m(t, "open", 15, !1), a = m(t, "dir", 3, "ltr"), s = m(t, "onOpenChange", 3, R), l = m(t, "onOpenChangeComplete", 3, R), u = m(t, "_internal_variant", 3, "dropdown-menu"), d = m(t, "_internal_should_skip_exit_animation", 3, void 0), p = k.create({
		variant: E(() => u()),
		dir: E(() => a()),
		onClose: () => {
			n(!1), s()(!1);
		},
		shouldSkipExitAnimation: () => d()?.() ?? !1
	});
	j.create({
		open: E(() => n(), (e) => {
			n(e), s()(e);
		}),
		onOpenChangeComplete: E(() => l())
	}, p), H(e, {
		children: (e, n) => {
			var r = f();
			i(o(r), () => t.children ?? v), h(e, r);
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
	let d = m(t, "id", 19, () => L(l)), p = m(t, "ref", 15, null), y = m(t, "loop", 3, !0), b = m(t, "onInteractOutside", 3, R), w = m(t, "onEscapeKeydown", 3, R), T = m(t, "onCloseAutoFocus", 3, R), D = m(t, "forceMount", 3, !1), O = m(t, "trapFocus", 3, !1), k = x(t, ae), A = P.create({
		id: E(() => d()),
		loop: E(() => y()),
		ref: E(() => p(), (e) => p(e)),
		onCloseAutoFocus: E(() => T())
	}), j = S(() => I(k, A.props));
	function M(e) {
		if (A.handleInteractOutside(e), !e.defaultPrevented && (b()(e), !e.defaultPrevented)) {
			if (e.target && e.target instanceof Element) {
				let t = `[${A.parentMenu.root.getBitsAttr("sub-content")}]`;
				if (e.target.closest(t)) return;
			}
			A.parentMenu.onClose();
		}
	}
	function N(e) {
		w()(e), !e.defaultPrevented && A.parentMenu.onClose();
	}
	var F = f(), z = o(F), H = (e) => {
		ee(e, _(() => a(j), () => A.popperProps, {
			get ref() {
				return A.opts.ref;
			},
			get enabled() {
				return A.parentMenu.opts.open.current;
			},
			onInteractOutside: M,
			onEscapeKeydown: N,
			get trapFocus() {
				return O();
			},
			get loop() {
				return y();
			},
			forceMount: !0,
			get id() {
				return d();
			},
			get shouldRender() {
				return A.shouldRender;
			},
			popper: (e, r) => {
				let c = () => r?.().props, l = () => r?.().wrapperProps, d = S(() => I(c(), { style: B("dropdown-menu") }, { style: t.style }));
				var p = f(), m = o(p), _ = (e) => {
					var n = f(), r = o(n);
					{
						let e = S(() => ({
							props: a(d),
							wrapperProps: l(),
							...A.snippetProps
						}));
						i(r, () => t.child, () => a(e));
					}
					h(e, n);
				}, y = (e) => {
					var n = $();
					g(n, () => ({ ...l() }));
					var r = u(n);
					g(r, () => ({ ...a(d) })), i(u(r), () => t.children ?? v), s(r), s(n), h(e, n);
				};
				n(m, (e) => {
					t.child ? e(_) : e(y, -1);
				}), h(e, p);
			},
			$$slots: { popper: !0 }
		}));
	}, U = (e) => {
		V(e, _(() => a(j), () => A.popperProps, {
			get ref() {
				return A.opts.ref;
			},
			get open() {
				return A.parentMenu.opts.open.current;
			},
			onInteractOutside: M,
			onEscapeKeydown: N,
			get trapFocus() {
				return O();
			},
			get loop() {
				return y();
			},
			forceMount: !1,
			get id() {
				return d();
			},
			get shouldRender() {
				return A.shouldRender;
			},
			popper: (e, r) => {
				let c = () => r?.().props, l = () => r?.().wrapperProps, d = S(() => I(c(), { style: B("dropdown-menu") }, { style: t.style }));
				var p = f(), m = o(p), _ = (e) => {
					var n = f(), r = o(n);
					{
						let e = S(() => ({
							props: a(d),
							wrapperProps: l(),
							...A.snippetProps
						}));
						i(r, () => t.child, () => a(e));
					}
					h(e, n);
				}, y = (e) => {
					var n = $();
					g(n, () => ({ ...l() }));
					var r = u(n);
					g(r, () => ({ ...a(d) })), i(u(r), () => t.children ?? v), s(r), s(n), h(e, n);
				};
				n(m, (e) => {
					t.child ? e(_) : e(y, -1);
				}), h(e, p);
			},
			$$slots: { popper: !0 }
		}));
	};
	n(z, (e) => {
		D() ? e(H) : D() || e(U, 1);
	}), h(e, F), c();
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
	let d = m(t, "id", 19, () => L(l)), p = m(t, "ref", 15, null), _ = m(t, "disabled", 3, !1), y = m(t, "type", 3, "button"), b = x(t, se), w = M.create({
		id: E(() => d()),
		disabled: E(() => _() ?? !1),
		ref: E(() => p(), (e) => p(e))
	}), T = S(() => I(b, w.props, { type: y() }));
	U(e, {
		get id() {
			return d();
		},
		get ref() {
			return w.opts.ref;
		},
		children: (e, r) => {
			var c = f(), l = o(c), d = (e) => {
				var n = f();
				i(o(n), () => t.child, () => ({ props: a(T) })), h(e, n);
			}, p = (e) => {
				var n = ce();
				g(n, () => ({ ...a(T) })), i(u(n), () => t.children ?? v), s(n), h(e, n);
			};
			n(l, (e) => {
				t.child ? e(d) : e(p, -1);
			}), h(e, c);
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
	var l = f(), u = o(l);
	{
		let e = S(() => T("min-w-(--bits-floating-anchor-width) rounded-xl bg-dark-800 p-[5px] shadow-md", "relative z-50 border border-dark-600"));
		t(u, () => oe, (t, r) => {
			r(t, _(() => s, {
				get class() {
					return a(e);
				},
				sideOffset: 4,
				children: (e, t) => {
					W(e, {
						orientation: "vertical",
						viewportClasses: "max-h-120 overflow-hidden",
						children: (e, t) => {
							var r = f();
							i(o(r), () => n.children ?? v), h(e, r);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			}));
		});
	}
	h(e, l), c();
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
	var l = f(), u = o(l);
	{
		let e = S(() => T("cursor-pointer rounded-md px-4 py-2 outline-none hover:bg-dark-700", n.class));
		t(u, () => q, (t, r) => {
			r(t, _(() => s, {
				get class() {
					return a(e);
				},
				children: (e, t) => {
					var r = f();
					i(o(r), () => n.children ?? v), h(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	h(e, l), c();
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
	var l = f(), u = o(l);
	{
		let e = S(() => T("min-w-(--bits-floating-anchor-width) rounded-xl bg-dark-800 p-[5px] shadow-md", "border border-dark-600", n.class));
		t(u, () => Y, (t, r) => {
			r(t, _(() => s, {
				get class() {
					return a(e);
				},
				sideOffset: 12,
				children: (e, t) => {
					var r = f();
					i(o(r), () => n.children ?? v), h(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	h(e, l), c();
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
	var u = f(), d = o(u);
	{
		let n = S(() => T("flex cursor-pointer items-center justify-between gap-2 rounded-md px-4 py-2 outline-none hover:bg-dark-700", "data-[state=open]:bg-dark-700", s.class));
		t(d, () => Q, (t, r) => {
			r(t, _(() => l, {
				get class() {
					return a(n);
				},
				children: (t, n) => {
					var r = _e(), a = o(r);
					i(a, () => s.children ?? v), w(e(a, 2), { icon: "ri:arrow-right-s-line" }), h(t, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	h(n, u), c();
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
	var a = f();
	t(o(a), () => ne, (e, t) => {
		t(e, _(() => r, {
			children: (e, t) => {
				var r = f();
				i(o(r), () => n.children ?? v), h(e, r);
			},
			$$slots: { default: !0 }
		}));
	}), h(e, a);
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
	var c = f();
	t(o(c), () => ie, (r, c) => {
		c(r, _(() => s, {
			children: (r, s) => {
				var c = Se(), u = o(c);
				{
					let e = (e, t) => {
						let r = () => t?.().props;
						var s = f(), c = o(s), u = (e) => {
							te(e, _(r, {
								variant: "outline",
								children: (e, t) => {
									d();
									var n = p();
									l(() => y(n, a.trigger)), h(e, n);
								},
								$$slots: { default: !0 }
							}));
						}, m = (e) => {
							var t = f();
							i(o(t), () => a.trigger, () => ({ props: r() })), h(e, t);
						};
						n(c, (e) => {
							typeof a.trigger == "string" ? e(u) : e(m, -1);
						}), h(e, s);
					};
					t(u, () => le, (t, n) => {
						n(t, {
							child: e,
							$$slots: { child: !0 }
						});
					});
				}
				i(e(u, 2), () => a.children ?? v), h(r, c);
			},
			$$slots: { default: !0 }
		}));
	}), h(r, c);
}
//#endregion
export { de as Content, pe as Item, Ce as Root, be as Sub, he as SubContent, ve as SubTrigger };
