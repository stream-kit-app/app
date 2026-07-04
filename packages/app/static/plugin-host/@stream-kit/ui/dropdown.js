import { $n as e, Ct as t, Hr as n, On as r, Qn as i, Qr as a, Qt as o, Vr as s, Wn as c, Z as l, Zn as u, Zr as d, a as f, cn as p, hn as m, jt as h, ln as g, mn as _, ni as v, o as y, on as b, pr as x, s as S, un as C } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as w } from "../../chunks/Icon-AeqJGRQj.js";
import { t as T } from "../../chunks/utils-DJt177zd.js";
import { D as E } from "../../chunks/animations-complete-BfqHI4B-.js";
import { S as D, c as O, d as k, f as A, l as j, o as M, p as N, s as P, u as F } from "../../chunks/scroll-lock-BZF1_Y9Y.js";
import { i as I, n as L } from "../../chunks/use-id-C9llEPxa.js";
import { r as R } from "../../chunks/dom-B4Rzp8oi.js";
import { a as z } from "../../chunks/presence-manager.svelte-BOTfPcjg.js";
import { a as B, n as V, r as H, t as ee } from "../../chunks/popper-layer-force-mount-BxV85AhM.js";
import { t as U } from "../../chunks/floating-layer-anchor-B_R8arju.js";
import { t as W } from "../../chunks/scroll-area-7qg9ezvn.js";
import { t as te } from "../../chunks/button-CgKHPPIe.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/menu/components/menu-sub.svelte
function ne(e, t) {
	n(t, !0);
	let r = f(t, "open", 15, !1), a = f(t, "onOpenChange", 3, R), c = f(t, "onOpenChangeComplete", 3, R);
	N.create({
		open: E(() => r(), (e) => {
			r(e), a()?.(e);
		}),
		onOpenChangeComplete: E(() => c())
	}), H(e, {
		children: (e, n) => {
			var r = g();
			o(i(r), () => t.children ?? v), p(e, r);
		},
		$$slots: { default: !0 }
	}), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/menu/components/menu-item.svelte
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
]), K = C("<div><!></div>");
function q(e, t) {
	let c = _();
	n(t, !0);
	let d = f(t, "ref", 15, null), m = f(t, "id", 19, () => L(c)), b = f(t, "disabled", 3, !1), S = f(t, "onSelect", 3, R), C = f(t, "closeOnSelect", 3, !0), w = y(t, G), T = O.create({
		id: E(() => m()),
		disabled: E(() => b()),
		onSelect: E(() => S()),
		ref: E(() => d(), (e) => d(e)),
		closeOnSelect: E(() => C())
	}), D = x(() => I(w, T.props));
	var k = g(), A = i(k), j = (e) => {
		var n = g();
		o(i(n), () => t.child, () => ({ props: r(D) })), p(e, n);
	}, M = (e) => {
		var n = K();
		l(n, () => ({ ...r(D) })), o(u(n), () => t.children ?? v), a(n), p(e, n);
	};
	h(A, (e) => {
		t.child ? e(j) : e(M, -1);
	}), p(e, k), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/menu/components/menu-sub-content.svelte
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
]), J = C("<div><div><!></div></div>");
function Y(e, t) {
	let c = _();
	n(t, !0);
	let d = f(t, "id", 19, () => L(c)), m = f(t, "ref", 15, null), b = f(t, "loop", 3, !0), C = f(t, "onInteractOutside", 3, R), w = f(t, "forceMount", 3, !1), T = f(t, "onEscapeKeydown", 3, R), O = f(t, "interactOutsideBehavior", 3, "defer-otherwise-close"), k = f(t, "escapeKeydownBehavior", 3, "defer-otherwise-close"), A = f(t, "onOpenAutoFocus", 3, R), j = f(t, "onCloseAutoFocus", 3, R), M = f(t, "onFocusOutside", 3, R), N = f(t, "side", 3, "right"), H = f(t, "trapFocus", 3, !1), U = y(t, re), W = P.create({
		id: E(() => d()),
		loop: E(() => b()),
		ref: E(() => m(), (e) => m(e)),
		isSub: !0,
		onCloseAutoFocus: E(() => q)
	});
	function te(e) {
		let t = e.currentTarget.contains(e.target), n = D[W.parentMenu.root.opts.dir.current].includes(e.key);
		t && n && (W.parentMenu.onClose(), W.parentMenu.triggerNode?.focus(), e.preventDefault());
	}
	let ne = x(() => W.parentMenu.root.getBitsAttr("sub-content")), G = x(() => I(U, W.props, {
		side: N(),
		onkeydown: te,
		[r(ne)]: ""
	}));
	function K(e) {
		A()(e), !e.defaultPrevented && (e.preventDefault(), W.parentMenu.root.isUsingKeyboard && W.parentMenu.contentNode && F.dispatch(W.parentMenu.contentNode));
	}
	function q(e) {
		j()(e), !e.defaultPrevented && e.preventDefault();
	}
	function Y(e) {
		C()(e), !e.defaultPrevented && W.parentMenu.onClose();
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
	var Q = g(), ie = i(Q), ae = (e) => {
		ee(e, S(() => r(G), {
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
				return b();
			},
			get trapFocus() {
				return H();
			},
			get shouldRender() {
				return W.shouldRender;
			},
			popper: (e, n) => {
				let s = () => n?.().props, c = () => n?.().wrapperProps, d = x(() => I(s(), r(G), { style: B("menu") }, { style: t.style }));
				var f = g(), m = i(f), _ = (e) => {
					var n = g(), a = i(n);
					{
						let e = x(() => ({
							props: r(d),
							wrapperProps: c(),
							...W.snippetProps
						}));
						o(a, () => t.child, () => r(e));
					}
					p(e, n);
				}, y = (e) => {
					var n = J();
					l(n, () => ({ ...c() }));
					var i = u(n);
					l(i, () => ({ ...r(d) })), o(u(i), () => t.children ?? v), a(i), a(n), p(e, n);
				};
				h(m, (e) => {
					t.child ? e(_) : e(y, -1);
				}), p(e, f);
			},
			$$slots: { popper: !0 }
		}));
	}, $ = (e) => {
		V(e, S(() => r(G), {
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
				return b();
			},
			get trapFocus() {
				return H();
			},
			get shouldRender() {
				return W.shouldRender;
			},
			popper: (e, n) => {
				let s = () => n?.().props, c = () => n?.().wrapperProps, d = x(() => I(s(), r(G), { style: B("menu") }, { style: t.style }));
				var f = g(), m = i(f), _ = (e) => {
					var n = g(), a = i(n);
					{
						let e = x(() => ({
							props: r(d),
							wrapperProps: c(),
							...W.snippetProps
						}));
						o(a, () => t.child, () => r(e));
					}
					p(e, n);
				}, y = (e) => {
					var n = J();
					l(n, () => ({ ...c() }));
					var i = u(n);
					l(i, () => ({ ...r(d) })), o(u(i), () => t.children ?? v), a(i), a(n), p(e, n);
				};
				h(m, (e) => {
					t.child ? e(_) : e(y, -1);
				}), p(e, f);
			},
			$$slots: { popper: !0 }
		}));
	};
	h(ie, (e) => {
		w() ? e(ae) : w() || e($, 1);
	}), p(e, Q), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/menu/components/menu-sub-trigger.svelte
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
]), Z = C("<div><!></div>");
function Q(e, t) {
	let c = _();
	n(t, !0);
	let d = f(t, "id", 19, () => L(c)), m = f(t, "disabled", 3, !1), b = f(t, "ref", 15, null), S = f(t, "onSelect", 3, R), C = f(t, "openDelay", 3, 0), w = y(t, X), T = A.create({
		disabled: E(() => m()),
		onSelect: E(() => S()),
		id: E(() => d()),
		ref: E(() => b(), (e) => b(e)),
		openDelay: E(() => C())
	}), D = x(() => I(w, T.props));
	U(e, {
		get id() {
			return d();
		},
		get ref() {
			return T.opts.ref;
		},
		children: (e, n) => {
			var s = g(), c = i(s), d = (e) => {
				var n = g();
				o(i(n), () => t.child, () => ({ props: r(D) })), p(e, n);
			}, f = (e) => {
				var n = Z();
				l(n, () => ({ ...r(D) })), o(u(n), () => t.children ?? v), a(n), p(e, n);
			};
			h(c, (e) => {
				t.child ? e(d) : e(f, -1);
			}), p(e, s);
		},
		$$slots: { default: !0 }
	}), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/menu/components/menu.svelte
function ie(e, t) {
	n(t, !0);
	let r = f(t, "open", 15, !1), a = f(t, "dir", 3, "ltr"), c = f(t, "onOpenChange", 3, R), l = f(t, "onOpenChangeComplete", 3, R), u = f(t, "_internal_variant", 3, "dropdown-menu"), d = f(t, "_internal_should_skip_exit_animation", 3, void 0), m = k.create({
		variant: E(() => u()),
		dir: E(() => a()),
		onClose: () => {
			r(!1), c()(!1);
		},
		shouldSkipExitAnimation: () => d()?.() ?? !1
	});
	j.create({
		open: E(() => r(), (e) => {
			r(e), c()(e);
		}),
		onOpenChangeComplete: E(() => l())
	}, m), H(e, {
		children: (e, n) => {
			var r = g();
			o(i(r), () => t.children ?? v), p(e, r);
		},
		$$slots: { default: !0 }
	}), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/dropdown-menu/components/dropdown-menu-content.svelte
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
]), $ = C("<div><div><!></div></div>");
function oe(e, t) {
	let c = _();
	n(t, !0);
	let d = f(t, "id", 19, () => L(c)), m = f(t, "ref", 15, null), b = f(t, "loop", 3, !0), C = f(t, "onInteractOutside", 3, R), w = f(t, "onEscapeKeydown", 3, R), T = f(t, "onCloseAutoFocus", 3, R), D = f(t, "forceMount", 3, !1), O = f(t, "trapFocus", 3, !1), k = y(t, ae), A = P.create({
		id: E(() => d()),
		loop: E(() => b()),
		ref: E(() => m(), (e) => m(e)),
		onCloseAutoFocus: E(() => T())
	}), j = x(() => I(k, A.props));
	function M(e) {
		if (A.handleInteractOutside(e), !e.defaultPrevented && (C()(e), !e.defaultPrevented)) {
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
	var F = g(), z = i(F), H = (e) => {
		ee(e, S(() => r(j), () => A.popperProps, {
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
				return b();
			},
			forceMount: !0,
			get id() {
				return d();
			},
			get shouldRender() {
				return A.shouldRender;
			},
			popper: (e, n) => {
				let s = () => n?.().props, c = () => n?.().wrapperProps, d = x(() => I(s(), { style: B("dropdown-menu") }, { style: t.style }));
				var f = g(), m = i(f), _ = (e) => {
					var n = g(), a = i(n);
					{
						let e = x(() => ({
							props: r(d),
							wrapperProps: c(),
							...A.snippetProps
						}));
						o(a, () => t.child, () => r(e));
					}
					p(e, n);
				}, y = (e) => {
					var n = $();
					l(n, () => ({ ...c() }));
					var i = u(n);
					l(i, () => ({ ...r(d) })), o(u(i), () => t.children ?? v), a(i), a(n), p(e, n);
				};
				h(m, (e) => {
					t.child ? e(_) : e(y, -1);
				}), p(e, f);
			},
			$$slots: { popper: !0 }
		}));
	}, U = (e) => {
		V(e, S(() => r(j), () => A.popperProps, {
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
				return b();
			},
			forceMount: !1,
			get id() {
				return d();
			},
			get shouldRender() {
				return A.shouldRender;
			},
			popper: (e, n) => {
				let s = () => n?.().props, c = () => n?.().wrapperProps, d = x(() => I(s(), { style: B("dropdown-menu") }, { style: t.style }));
				var f = g(), m = i(f), _ = (e) => {
					var n = g(), a = i(n);
					{
						let e = x(() => ({
							props: r(d),
							wrapperProps: c(),
							...A.snippetProps
						}));
						o(a, () => t.child, () => r(e));
					}
					p(e, n);
				}, y = (e) => {
					var n = $();
					l(n, () => ({ ...c() }));
					var i = u(n);
					l(i, () => ({ ...r(d) })), o(u(i), () => t.children ?? v), a(i), a(n), p(e, n);
				};
				h(m, (e) => {
					t.child ? e(_) : e(y, -1);
				}), p(e, f);
			},
			$$slots: { popper: !0 }
		}));
	};
	h(z, (e) => {
		D() ? e(H) : D() || e(U, 1);
	}), p(e, F), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/menu/components/menu-trigger.svelte
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
]), ce = C("<button><!></button>");
function le(e, t) {
	let c = _();
	n(t, !0);
	let d = f(t, "id", 19, () => L(c)), m = f(t, "ref", 15, null), b = f(t, "disabled", 3, !1), S = f(t, "type", 3, "button"), C = y(t, se), w = M.create({
		id: E(() => d()),
		disabled: E(() => b() ?? !1),
		ref: E(() => m(), (e) => m(e))
	}), T = x(() => I(C, w.props, { type: S() }));
	U(e, {
		get id() {
			return d();
		},
		get ref() {
			return w.opts.ref;
		},
		children: (e, n) => {
			var s = g(), c = i(s), d = (e) => {
				var n = g();
				o(i(n), () => t.child, () => ({ props: r(T) })), p(e, n);
			}, f = (e) => {
				var n = ce();
				l(n, () => ({ ...r(T) })), o(u(n), () => t.children ?? v), a(n), p(e, n);
			};
			h(c, (e) => {
				t.child ? e(d) : e(f, -1);
			}), p(e, s);
		},
		$$slots: { default: !0 }
	}), s();
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown-content.svelte
var ue = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function de(e, a) {
	n(a, !0);
	let c = y(a, ue);
	var l = g(), u = i(l);
	{
		let e = x(() => T("min-w-(--bits-floating-anchor-width) rounded-xl bg-dark-800 p-[5px] shadow-md", "relative z-50 border border-dark-600"));
		t(u, () => oe, (t, n) => {
			n(t, S(() => c, {
				get class() {
					return r(e);
				},
				sideOffset: 4,
				children: (e, t) => {
					W(e, {
						orientation: "vertical",
						viewportClasses: "max-h-120 overflow-hidden",
						children: (e, t) => {
							var n = g();
							o(i(n), () => a.children ?? v), p(e, n);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			}));
		});
	}
	p(e, l), s();
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown-item.svelte
var fe = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function pe(e, a) {
	n(a, !0);
	let c = y(a, fe);
	var l = g(), u = i(l);
	{
		let e = x(() => T("cursor-pointer rounded-md px-4 py-2 outline-none hover:bg-dark-700", a.class));
		t(u, () => q, (t, n) => {
			n(t, S(() => c, {
				get class() {
					return r(e);
				},
				children: (e, t) => {
					var n = g();
					o(i(n), () => a.children ?? v), p(e, n);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	p(e, l), s();
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown-sub-content.svelte
var me = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function he(e, a) {
	n(a, !0);
	let c = y(a, me);
	var l = g(), u = i(l);
	{
		let e = x(() => T("min-w-(--bits-floating-anchor-width) rounded-xl bg-dark-800 p-[5px] shadow-md", "border border-dark-600", a.class));
		t(u, () => Y, (t, n) => {
			n(t, S(() => c, {
				get class() {
					return r(e);
				},
				sideOffset: 12,
				children: (e, t) => {
					var n = g();
					o(i(n), () => a.children ?? v), p(e, n);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	p(e, l), s();
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown-sub-trigger.svelte
var ge = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]), _e = C("<!> <!>", 1);
function ve(a, c) {
	n(c, !0);
	let l = y(c, ge);
	var u = g(), d = i(u);
	{
		let n = x(() => T("flex cursor-pointer items-center justify-between gap-2 rounded-md px-4 py-2 outline-none hover:bg-dark-700", "data-[state=open]:bg-dark-700", c.class));
		t(d, () => Q, (t, a) => {
			a(t, S(() => l, {
				get class() {
					return r(n);
				},
				children: (t, n) => {
					var r = _e(), a = i(r);
					o(a, () => c.children ?? v), w(e(a, 2), { icon: "ri:arrow-right-s-line" }), p(t, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	p(a, u), s();
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
	let r = y(n, ye);
	var a = g();
	t(i(a), () => ne, (e, t) => {
		t(e, S(() => r, {
			children: (e, t) => {
				var r = g();
				o(i(r), () => n.children ?? v), p(e, r);
			},
			$$slots: { default: !0 }
		}));
	}), p(e, a);
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown.svelte
var xe = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"trigger"
]), Se = C("<!> <!>", 1);
function Ce(n, r) {
	let a = y(r, xe);
	var s = g();
	t(i(s), () => ie, (n, s) => {
		s(n, S(() => a, {
			children: (n, a) => {
				var s = Se(), l = i(s);
				{
					let e = (e, t) => {
						let n = () => t?.().props;
						var a = g(), s = i(a), l = (e) => {
							te(e, S(n, {
								variant: "outline",
								children: (e, t) => {
									d();
									var n = m();
									c(() => b(n, r.trigger)), p(e, n);
								},
								$$slots: { default: !0 }
							}));
						}, u = (e) => {
							var t = g();
							o(i(t), () => r.trigger, () => ({ props: n() })), p(e, t);
						};
						h(s, (e) => {
							typeof r.trigger == "string" ? e(l) : e(u, -1);
						}), p(e, a);
					};
					t(l, () => le, (t, n) => {
						n(t, {
							child: e,
							$$slots: { child: !0 }
						});
					});
				}
				o(e(l, 2), () => r.children ?? v), p(n, s);
			},
			$$slots: { default: !0 }
		}));
	}), p(n, s);
}
//#endregion
export { de as Content, pe as Item, Ce as Root, be as Sub, he as SubContent, ve as SubTrigger };
