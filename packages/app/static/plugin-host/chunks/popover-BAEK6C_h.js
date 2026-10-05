import { Bn as e, Dr as t, En as n, Hr as r, Sn as i, Ur as a, Vt as o, _r as s, a as c, bn as l, cr as u, ii as d, o as f, ot as p, s as m, sn as h, sr as g, ti as _, xn as v, yr as y } from "./client-BFeMv2Ma.js";
import "./disclose-version-CI8I6yeK.js";
import { C as b, D as x, d as S, l as C, o as w, r as T, u as E, x as D } from "./animations-complete-2GhqX7WL.js";
import { i as O, n as k, r as A } from "./use-id-BW6hjw-g.js";
import { r as j } from "./dom-9pAGmv2P.js";
import { l as M, r as N, t as P } from "./presence-manager.svelte-cK0pnbQH.js";
import { o as F } from "./scroll-lock-qBq_Ag7a.js";
import { i as I, n as L, r as R, t as z } from "./popper-layer-force-mount-BqARajyD.js";
import { t as B } from "./safe-polygon.svelte-DNwZsoOY.js";
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/popover/popover.svelte.js
var V = w({
	component: "popover",
	parts: [
		"root",
		"trigger",
		"content",
		"close",
		"overlay"
	]
}), H = new b("Popover.Root"), U = class t {
	static create(e) {
		return H.set(new t(e));
	}
	opts;
	#e = y(null);
	get contentNode() {
		return e(this.#e);
	}
	set contentNode(e) {
		s(this.#e, e, !0);
	}
	contentPresence;
	#t = y(null);
	get triggerNode() {
		return e(this.#t);
	}
	set triggerNode(e) {
		s(this.#t, e, !0);
	}
	#n = y(null);
	get overlayNode() {
		return e(this.#n);
	}
	set overlayNode(e) {
		s(this.#n, e, !0);
	}
	overlayPresence;
	#r = y(!1);
	get openedViaHover() {
		return e(this.#r);
	}
	set openedViaHover(e) {
		s(this.#r, e, !0);
	}
	#i = y(!1);
	get hasInteractedWithContent() {
		return e(this.#i);
	}
	set hasInteractedWithContent(e) {
		s(this.#i, e, !0);
	}
	#a = y(!1);
	get hoverCooldown() {
		return e(this.#a);
	}
	set hoverCooldown(e) {
		s(this.#a, e, !0);
	}
	#o = y(0);
	get closeDelay() {
		return e(this.#o);
	}
	set closeDelay(e) {
		s(this.#o, e, !0);
	}
	#s = null;
	#c = null;
	constructor(e) {
		this.opts = e, this.contentPresence = new P({
			ref: x(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), this.overlayPresence = new P({
			ref: x(() => this.overlayNode),
			open: this.opts.open
		}), D(() => this.opts.open.current, (e) => {
			e || (this.openedViaHover = !1, this.hasInteractedWithContent = !1, this.#l());
		});
	}
	setDomContext(e) {
		this.#c = e;
	}
	#l() {
		this.#s !== null && this.#c && (this.#c.clearTimeout(this.#s), this.#s = null);
	}
	toggleOpen() {
		this.#l(), this.opts.open.current = !this.opts.open.current;
	}
	handleClose() {
		this.#l(), this.opts.open.current && (this.opts.open.current = !1);
	}
	handleHoverOpen() {
		this.#l(), !this.opts.open.current && (this.openedViaHover = !0, this.opts.open.current = !0);
	}
	handleHoverClose() {
		this.opts.open.current && this.openedViaHover && !this.hasInteractedWithContent && (this.opts.open.current = !1);
	}
	handleDelayedHoverClose() {
		this.opts.open.current && this.openedViaHover && !this.hasInteractedWithContent && (this.#l(), this.closeDelay <= 0 ? this.opts.open.current = !1 : this.#c && (this.#s = this.#c.setTimeout(() => {
			this.openedViaHover && !this.hasInteractedWithContent && (this.opts.open.current = !1), this.#s = null;
		}, this.closeDelay)));
	}
	cancelDelayedClose() {
		this.#l();
	}
	markInteraction() {
		this.hasInteractedWithContent = !0, this.#l();
	}
}, W = class n {
	static create(e) {
		return new n(e, H.get());
	}
	opts;
	root;
	attachment;
	domContext;
	#e = null;
	#t = null;
	#n = y(!1);
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = S(this.opts.ref, (e) => this.root.triggerNode = e), this.domContext = new A(e.ref), this.root.setDomContext(this.domContext), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this), this.onpointerenter = this.onpointerenter.bind(this), this.onpointerleave = this.onpointerleave.bind(this), D(() => this.opts.closeDelay.current, (e) => {
			this.root.closeDelay = e;
		});
	}
	#r() {
		this.#e !== null && (this.domContext.clearTimeout(this.#e), this.#e = null);
	}
	#i() {
		this.#t !== null && (this.domContext.clearTimeout(this.#t), this.#t = null);
	}
	#a() {
		this.#r(), this.#i();
	}
	onpointerenter(e) {
		if (this.opts.disabled.current || !this.opts.openOnHover.current || M(e) || (s(this.#n, !0), this.#i(), this.root.cancelDelayedClose(), this.root.opts.open.current || this.root.hoverCooldown)) return;
		let t = this.opts.openDelay.current;
		t <= 0 ? this.root.handleHoverOpen() : this.#e = this.domContext.setTimeout(() => {
			this.root.handleHoverOpen(), this.#e = null;
		}, t);
	}
	onpointerleave(e) {
		this.opts.disabled.current || this.opts.openOnHover.current && (M(e) || (s(this.#n, !1), this.#r(), this.root.hoverCooldown = !1));
	}
	onclick(t) {
		if (!this.opts.disabled.current && t.button === 0) {
			if (this.#a(), e(this.#n) && this.root.opts.open.current && this.root.openedViaHover) {
				this.root.openedViaHover = !1, this.root.hasInteractedWithContent = !0;
				return;
			}
			e(this.#n) && this.opts.openOnHover.current && this.root.opts.open.current && (this.root.hoverCooldown = !0), this.root.hoverCooldown && !this.root.opts.open.current && (this.root.hoverCooldown = !1), this.root.toggleOpen();
		}
	}
	onkeydown(e) {
		this.opts.disabled.current || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.#a(), this.root.toggleOpen());
	}
	#o() {
		if (this.root.opts.open.current && this.root.contentNode?.id) return this.root.contentNode?.id;
	}
	#s = t(() => ({
		id: this.opts.id.current,
		"aria-haspopup": "dialog",
		"aria-expanded": T(this.root.opts.open.current),
		"data-state": C(this.root.opts.open.current),
		"aria-controls": this.#o(),
		[V.trigger]: "",
		disabled: this.opts.disabled.current,
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		onpointerenter: this.onpointerenter,
		onpointerleave: this.onpointerleave,
		...this.attachment
	}));
	get props() {
		return e(this.#s);
	}
	set props(e) {
		s(this.#s, e);
	}
}, G = class n {
	static create(e) {
		return new n(e, H.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = S(this.opts.ref, (e) => this.root.contentNode = e), this.onpointerdown = this.onpointerdown.bind(this), this.onfocusin = this.onfocusin.bind(this), this.onpointerenter = this.onpointerenter.bind(this), this.onpointerleave = this.onpointerleave.bind(this), new B({
			triggerNode: () => this.root.triggerNode,
			contentNode: () => this.root.contentNode,
			enabled: () => this.root.opts.open.current && this.root.openedViaHover && !this.root.hasInteractedWithContent,
			onPointerExit: () => {
				this.root.handleDelayedHoverClose();
			}
		});
	}
	onpointerdown(e) {
		this.root.markInteraction();
	}
	onfocusin(e) {
		let t = e.target;
		N(t) && F(t) && this.root.markInteraction();
	}
	onpointerenter(e) {
		M(e) || this.root.cancelDelayedClose();
	}
	onpointerleave(e) {
		M(e);
	}
	onInteractOutside = (e) => {
		if (this.opts.onInteractOutside.current(e), e.defaultPrevented || !N(e.target)) return;
		let t = e.target.closest(V.selector("trigger"));
		if (!(t && t === this.root.triggerNode)) {
			if (this.opts.customAnchor.current) {
				if (N(this.opts.customAnchor.current)) {
					if (this.opts.customAnchor.current.contains(e.target)) return;
				} else if (typeof this.opts.customAnchor.current == "string") {
					let t = document.querySelector(this.opts.customAnchor.current);
					if (t && t.contains(e.target)) return;
				}
			}
			this.root.handleClose();
		}
	};
	onEscapeKeydown = (e) => {
		this.opts.onEscapeKeydown.current(e), !e.defaultPrevented && this.root.handleClose();
	};
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
	get shouldTrapFocus() {
		return !(this.root.openedViaHover && !this.root.hasInteractedWithContent);
	}
	#e = t(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return e(this.#e);
	}
	set snippetProps(e) {
		s(this.#e, e);
	}
	#t = t(() => ({
		id: this.opts.id.current,
		tabindex: -1,
		"data-state": C(this.root.opts.open.current),
		...E(this.root.contentPresence.transitionStatus),
		[V.content]: "",
		style: {
			pointerEvents: "auto",
			contain: "layout style"
		},
		onpointerdown: this.onpointerdown,
		onfocusin: this.onfocusin,
		onpointerenter: this.onpointerenter,
		onpointerleave: this.onpointerleave,
		...this.attachment
	}));
	get props() {
		return e(this.#t);
	}
	set props(e) {
		s(this.#t, e);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown
	};
}, K = class n {
	static create(e) {
		return new n(e, H.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = S(this.opts.ref), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		this.root.handleClose();
	}
	onkeydown(e) {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.root.handleClose());
	}
	#e = t(() => ({
		id: this.opts.id.current,
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		type: "button",
		[V.close]: "",
		...this.attachment
	}));
	get props() {
		return e(this.#e);
	}
	set props(e) {
		s(this.#e, e);
	}
}, q = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"ref",
	"id",
	"forceMount",
	"onOpenAutoFocus",
	"onCloseAutoFocus",
	"onEscapeKeydown",
	"onInteractOutside",
	"trapFocus",
	"preventScroll",
	"customAnchor",
	"style"
]), J = i("<div><div><!></div></div>");
function Y(i, s) {
	let y = n();
	a(s, !0);
	let b = c(s, "ref", 15, null), S = c(s, "id", 19, () => k(y)), C = c(s, "forceMount", 3, !1), w = c(s, "onOpenAutoFocus", 3, j), T = c(s, "onCloseAutoFocus", 3, j), E = c(s, "onEscapeKeydown", 3, j), D = c(s, "onInteractOutside", 3, j), A = c(s, "trapFocus", 3, !0), M = c(s, "preventScroll", 3, !1), N = c(s, "customAnchor", 3, null), P = f(s, q), F = G.create({
		id: x(() => S()),
		ref: x(() => b(), (e) => b(e)),
		onInteractOutside: x(() => D()),
		onEscapeKeydown: x(() => E()),
		customAnchor: x(() => N())
	}), I = t(() => O(P, F.props)), B = t(() => A() && F.shouldTrapFocus);
	function V(e) {
		F.shouldTrapFocus || e.preventDefault(), w()(e);
	}
	var H = v(), U = u(H), W = (n) => {
		z(n, m(() => e(I), () => F.popperProps, {
			get ref() {
				return F.opts.ref;
			},
			get enabled() {
				return F.root.opts.open.current;
			},
			get id() {
				return S();
			},
			get trapFocus() {
				return e(B);
			},
			get preventScroll() {
				return M();
			},
			loop: !0,
			forceMount: !0,
			get customAnchor() {
				return N();
			},
			onOpenAutoFocus: V,
			get onCloseAutoFocus() {
				return T();
			},
			get shouldRender() {
				return F.shouldRender;
			},
			popper: (n, r) => {
				let i = () => (r?.()).props, a = () => (r?.()).wrapperProps, c = t(() => O(i(), { style: R("popover") }, { style: s.style }));
				var f = v(), m = u(f), y = (n) => {
					var r = v(), i = u(r);
					{
						let n = t(() => ({
							props: e(c),
							wrapperProps: a(),
							...F.snippetProps
						}));
						h(i, () => s.child, () => e(n));
					}
					l(n, r);
				}, b = (t) => {
					var n = J();
					p(n, () => ({ ...a() }));
					var r = g(n);
					p(r, () => ({ ...e(c) }));
					var i = g(r);
					h(i, () => s.children ?? d), _(r), _(n), l(t, n);
				};
				o(m, (e) => {
					s.child ? e(y) : e(b, -1);
				}), l(n, f);
			},
			$$slots: { popper: !0 }
		}));
	}, K = (n) => {
		L(n, m(() => e(I), () => F.popperProps, {
			get ref() {
				return F.opts.ref;
			},
			get open() {
				return F.root.opts.open.current;
			},
			get id() {
				return S();
			},
			get trapFocus() {
				return e(B);
			},
			get preventScroll() {
				return M();
			},
			loop: !0,
			forceMount: !1,
			get customAnchor() {
				return N();
			},
			onOpenAutoFocus: V,
			get onCloseAutoFocus() {
				return T();
			},
			get shouldRender() {
				return F.shouldRender;
			},
			popper: (n, r) => {
				let i = () => (r?.()).props, a = () => (r?.()).wrapperProps, c = t(() => O(i(), { style: R("popover") }, { style: s.style }));
				var f = v(), m = u(f), y = (n) => {
					var r = v(), i = u(r);
					{
						let n = t(() => ({
							props: e(c),
							wrapperProps: a(),
							...F.snippetProps
						}));
						h(i, () => s.child, () => e(n));
					}
					l(n, r);
				}, b = (t) => {
					var n = J();
					p(n, () => ({ ...a() }));
					var r = g(n);
					p(r, () => ({ ...e(c) }));
					var i = g(r);
					h(i, () => s.children ?? d), _(r), _(n), l(t, n);
				};
				o(m, (e) => {
					s.child ? e(y) : e(b, -1);
				}), l(n, f);
			},
			$$slots: { popper: !0 }
		}));
	};
	o(U, (e) => {
		C() ? e(W) : C() || e(K, 1);
	}), l(i, H), r();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/popover/components/popover.svelte
function X(e, t) {
	a(t, !0);
	let n = c(t, "open", 15, !1), i = c(t, "onOpenChange", 3, j), o = c(t, "onOpenChangeComplete", 3, j);
	U.create({
		open: x(() => n(), (e) => {
			n(e), i()(e);
		}),
		onOpenChangeComplete: x(() => o())
	}), I(e, {
		children: (e, n) => {
			var r = v(), i = u(r);
			h(i, () => t.children ?? d), l(e, r);
		},
		$$slots: { default: !0 }
	}), r();
}
//#endregion
export { W as i, Y as n, K as r, X as t };
