import { Hr as e, On as t, Qn as n, Qr as r, Qt as i, Vr as a, Z as o, Zn as s, a as c, cn as l, cr as u, jt as d, ln as f, mn as p, ni as m, o as h, or as g, pr as _, s as v, un as y } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { C as b, D as x, d as S, l as C, o as w, r as T, u as E, x as D } from "./animations-complete-DFBLw3EK.js";
import { x as O } from "./scroll-lock--5Nsc7Xb.js";
import { i as k, n as A, r as j } from "./use-id-Dbt6eP9X.js";
import { r as M } from "./dom-CAV9qhsv.js";
import { l as N, r as P, t as F } from "./presence-manager.svelte-DNcqE2Zq.js";
import { a as I, n as L, r as R, t as z } from "./popper-layer-force-mount-C0Qq7_vt.js";
import { t as B } from "./safe-polygon.svelte-D8sMnpkW.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/popover/popover.svelte.js
var V = w({
	component: "popover",
	parts: [
		"root",
		"trigger",
		"content",
		"close",
		"overlay"
	]
}), H = new b("Popover.Root"), U = class e {
	static create(t) {
		return H.set(new e(t));
	}
	opts;
	#e = u(null);
	get contentNode() {
		return t(this.#e);
	}
	set contentNode(e) {
		g(this.#e, e, !0);
	}
	contentPresence;
	#t = u(null);
	get triggerNode() {
		return t(this.#t);
	}
	set triggerNode(e) {
		g(this.#t, e, !0);
	}
	#n = u(null);
	get overlayNode() {
		return t(this.#n);
	}
	set overlayNode(e) {
		g(this.#n, e, !0);
	}
	overlayPresence;
	#r = u(!1);
	get openedViaHover() {
		return t(this.#r);
	}
	set openedViaHover(e) {
		g(this.#r, e, !0);
	}
	#i = u(!1);
	get hasInteractedWithContent() {
		return t(this.#i);
	}
	set hasInteractedWithContent(e) {
		g(this.#i, e, !0);
	}
	#a = u(!1);
	get hoverCooldown() {
		return t(this.#a);
	}
	set hoverCooldown(e) {
		g(this.#a, e, !0);
	}
	#o = u(0);
	get closeDelay() {
		return t(this.#o);
	}
	set closeDelay(e) {
		g(this.#o, e, !0);
	}
	#s = null;
	#c = null;
	constructor(e) {
		this.opts = e, this.contentPresence = new F({
			ref: x(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), this.overlayPresence = new F({
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
		this.opts.open.current && (!this.openedViaHover || this.hasInteractedWithContent || (this.#l(), this.closeDelay <= 0 ? this.opts.open.current = !1 : this.#c && (this.#s = this.#c.setTimeout(() => {
			this.openedViaHover && !this.hasInteractedWithContent && (this.opts.open.current = !1), this.#s = null;
		}, this.closeDelay))));
	}
	cancelDelayedClose() {
		this.#l();
	}
	markInteraction() {
		this.hasInteractedWithContent = !0, this.#l();
	}
}, W = class e {
	static create(t) {
		return new e(t, H.get());
	}
	opts;
	root;
	attachment;
	domContext;
	#e = null;
	#t = null;
	#n = u(!1);
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = S(this.opts.ref, (e) => this.root.triggerNode = e), this.domContext = new j(e.ref), this.root.setDomContext(this.domContext), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this), this.onpointerenter = this.onpointerenter.bind(this), this.onpointerleave = this.onpointerleave.bind(this), D(() => this.opts.closeDelay.current, (e) => {
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
		if (this.opts.disabled.current || !this.opts.openOnHover.current || N(e) || (g(this.#n, !0), this.#i(), this.root.cancelDelayedClose(), this.root.opts.open.current || this.root.hoverCooldown)) return;
		let t = this.opts.openDelay.current;
		t <= 0 ? this.root.handleHoverOpen() : this.#e = this.domContext.setTimeout(() => {
			this.root.handleHoverOpen(), this.#e = null;
		}, t);
	}
	onpointerleave(e) {
		this.opts.disabled.current || this.opts.openOnHover.current && (N(e) || (g(this.#n, !1), this.#r(), this.root.hoverCooldown = !1));
	}
	onclick(e) {
		if (!this.opts.disabled.current && e.button === 0) {
			if (this.#a(), t(this.#n) && this.root.opts.open.current && this.root.openedViaHover) {
				this.root.openedViaHover = !1, this.root.hasInteractedWithContent = !0;
				return;
			}
			t(this.#n) && this.opts.openOnHover.current && this.root.opts.open.current && (this.root.hoverCooldown = !0), this.root.hoverCooldown && !this.root.opts.open.current && (this.root.hoverCooldown = !1), this.root.toggleOpen();
		}
	}
	onkeydown(e) {
		this.opts.disabled.current || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.#a(), this.root.toggleOpen());
	}
	#o() {
		if (this.root.opts.open.current && this.root.contentNode?.id) return this.root.contentNode?.id;
	}
	#s = _(() => ({
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
		return t(this.#s);
	}
	set props(e) {
		g(this.#s, e);
	}
}, G = class e {
	static create(t) {
		return new e(t, H.get());
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
		P(t) && O(t) && this.root.markInteraction();
	}
	onpointerenter(e) {
		N(e) || this.root.cancelDelayedClose();
	}
	onpointerleave(e) {
		N(e);
	}
	onInteractOutside = (e) => {
		if (this.opts.onInteractOutside.current(e), e.defaultPrevented || !P(e.target)) return;
		let t = e.target.closest(V.selector("trigger"));
		if (!(t && t === this.root.triggerNode)) {
			if (this.opts.customAnchor.current) {
				if (P(this.opts.customAnchor.current)) {
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
	#e = _(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return t(this.#e);
	}
	set snippetProps(e) {
		g(this.#e, e);
	}
	#t = _(() => ({
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
		return t(this.#t);
	}
	set props(e) {
		g(this.#t, e);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown
	};
}, K = class e {
	static create(t) {
		return new e(t, H.get());
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
	#e = _(() => ({
		id: this.opts.id.current,
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		type: "button",
		[V.close]: "",
		...this.attachment
	}));
	get props() {
		return t(this.#e);
	}
	set props(e) {
		g(this.#e, e);
	}
}, q = new Set([
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
]), J = y("<div><div><!></div></div>");
function Y(u, g) {
	let y = p();
	e(g, !0);
	let b = c(g, "ref", 15, null), S = c(g, "id", 19, () => A(y)), C = c(g, "forceMount", 3, !1), w = c(g, "onOpenAutoFocus", 3, M), T = c(g, "onCloseAutoFocus", 3, M), E = c(g, "onEscapeKeydown", 3, M), D = c(g, "onInteractOutside", 3, M), O = c(g, "trapFocus", 3, !0), j = c(g, "preventScroll", 3, !1), N = c(g, "customAnchor", 3, null), P = h(g, q), F = G.create({
		id: x(() => S()),
		ref: x(() => b(), (e) => b(e)),
		onInteractOutside: x(() => D()),
		onEscapeKeydown: x(() => E()),
		customAnchor: x(() => N())
	}), R = _(() => k(P, F.props)), B = _(() => O() && F.shouldTrapFocus);
	function V(e) {
		F.shouldTrapFocus || e.preventDefault(), w()(e);
	}
	var H = f(), U = n(H), W = (e) => {
		z(e, v(() => t(R), () => F.popperProps, {
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
				return t(B);
			},
			get preventScroll() {
				return j();
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
			popper: (e, a) => {
				let c = () => a?.().props, u = () => a?.().wrapperProps, p = _(() => k(c(), { style: I("popover") }, { style: g.style }));
				var h = f(), v = n(h), y = (e) => {
					var r = f(), a = n(r);
					{
						let e = _(() => ({
							props: t(p),
							wrapperProps: u(),
							...F.snippetProps
						}));
						i(a, () => g.child, () => t(e));
					}
					l(e, r);
				}, b = (e) => {
					var n = J();
					o(n, () => ({ ...u() }));
					var a = s(n);
					o(a, () => ({ ...t(p) })), i(s(a), () => g.children ?? m), r(a), r(n), l(e, n);
				};
				d(v, (e) => {
					g.child ? e(y) : e(b, -1);
				}), l(e, h);
			},
			$$slots: { popper: !0 }
		}));
	}, K = (e) => {
		L(e, v(() => t(R), () => F.popperProps, {
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
				return t(B);
			},
			get preventScroll() {
				return j();
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
			popper: (e, a) => {
				let c = () => a?.().props, u = () => a?.().wrapperProps, p = _(() => k(c(), { style: I("popover") }, { style: g.style }));
				var h = f(), v = n(h), y = (e) => {
					var r = f(), a = n(r);
					{
						let e = _(() => ({
							props: t(p),
							wrapperProps: u(),
							...F.snippetProps
						}));
						i(a, () => g.child, () => t(e));
					}
					l(e, r);
				}, b = (e) => {
					var n = J();
					o(n, () => ({ ...u() }));
					var a = s(n);
					o(a, () => ({ ...t(p) })), i(s(a), () => g.children ?? m), r(a), r(n), l(e, n);
				};
				d(v, (e) => {
					g.child ? e(y) : e(b, -1);
				}), l(e, h);
			},
			$$slots: { popper: !0 }
		}));
	};
	d(U, (e) => {
		C() ? e(W) : C() || e(K, 1);
	}), l(u, H), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/popover/components/popover.svelte
function X(t, r) {
	e(r, !0);
	let o = c(r, "open", 15, !1), s = c(r, "onOpenChange", 3, M), u = c(r, "onOpenChangeComplete", 3, M);
	U.create({
		open: x(() => o(), (e) => {
			o(e), s()(e);
		}),
		onOpenChangeComplete: x(() => u())
	}), R(t, {
		children: (e, t) => {
			var a = f();
			i(n(a), () => r.children ?? m), l(e, a);
		},
		$$slots: { default: !0 }
	}), a();
}
//#endregion
export { W as i, Y as n, K as r, X as t };
