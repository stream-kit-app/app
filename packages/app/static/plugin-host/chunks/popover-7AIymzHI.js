import { At as e, Gt as t, Hr as n, Mt as r, On as i, Qn as a, Qr as o, Vr as s, Zn as c, an as l, cr as u, f as d, in as f, it as p, m, ni as h, on as g, or as _, p as v, pr as y, un as b } from "./index-client-BIJQxc2l.js";
import "./disclose-version-YhYaTdgb.js";
import { t as x } from "./utils-DVQ4nj8f.js";
import { C as S, D as C, d as w, l as T, o as E, r as D, u as O, x as k } from "./animations-complete-mSylzqL5.js";
import { C as A, a as j, n as M, r as N, t as P, x as F } from "./popper-layer-force-mount-DQ--j3Vc.js";
import { i as I, n as L, r as R } from "./use-id-D_eLoXvH.js";
import { l as z, r as B, t as V } from "./presence-manager.svelte-DXU099Vb.js";
import { t as H } from "./floating-layer-anchor-CDr4Uj1p.js";
import { t as U } from "./safe-polygon.svelte-Nktx6gsB.js";
import { t as W } from "./scroll-area-99QA2aRD.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/popover/popover.svelte.js
var G = E({
	component: "popover",
	parts: [
		"root",
		"trigger",
		"content",
		"close",
		"overlay"
	]
}), K = new S("Popover.Root"), q = class e {
	static create(t) {
		return K.set(new e(t));
	}
	opts;
	#e = u(null);
	get contentNode() {
		return i(this.#e);
	}
	set contentNode(e) {
		_(this.#e, e, !0);
	}
	contentPresence;
	#t = u(null);
	get triggerNode() {
		return i(this.#t);
	}
	set triggerNode(e) {
		_(this.#t, e, !0);
	}
	#n = u(null);
	get overlayNode() {
		return i(this.#n);
	}
	set overlayNode(e) {
		_(this.#n, e, !0);
	}
	overlayPresence;
	#r = u(!1);
	get openedViaHover() {
		return i(this.#r);
	}
	set openedViaHover(e) {
		_(this.#r, e, !0);
	}
	#i = u(!1);
	get hasInteractedWithContent() {
		return i(this.#i);
	}
	set hasInteractedWithContent(e) {
		_(this.#i, e, !0);
	}
	#a = u(!1);
	get hoverCooldown() {
		return i(this.#a);
	}
	set hoverCooldown(e) {
		_(this.#a, e, !0);
	}
	#o = u(0);
	get closeDelay() {
		return i(this.#o);
	}
	set closeDelay(e) {
		_(this.#o, e, !0);
	}
	#s = null;
	#c = null;
	constructor(e) {
		this.opts = e, this.contentPresence = new V({
			ref: C(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), this.overlayPresence = new V({
			ref: C(() => this.overlayNode),
			open: this.opts.open
		}), k(() => this.opts.open.current, (e) => {
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
}, J = class e {
	static create(t) {
		return new e(t, K.get());
	}
	opts;
	root;
	attachment;
	domContext;
	#e = null;
	#t = null;
	#n = u(!1);
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = w(this.opts.ref, (e) => this.root.triggerNode = e), this.domContext = new R(e.ref), this.root.setDomContext(this.domContext), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this), this.onpointerenter = this.onpointerenter.bind(this), this.onpointerleave = this.onpointerleave.bind(this), k(() => this.opts.closeDelay.current, (e) => {
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
		if (this.opts.disabled.current || !this.opts.openOnHover.current || z(e) || (_(this.#n, !0), this.#i(), this.root.cancelDelayedClose(), this.root.opts.open.current || this.root.hoverCooldown)) return;
		let t = this.opts.openDelay.current;
		t <= 0 ? this.root.handleHoverOpen() : this.#e = this.domContext.setTimeout(() => {
			this.root.handleHoverOpen(), this.#e = null;
		}, t);
	}
	onpointerleave(e) {
		this.opts.disabled.current || this.opts.openOnHover.current && (z(e) || (_(this.#n, !1), this.#r(), this.root.hoverCooldown = !1));
	}
	onclick(e) {
		if (!this.opts.disabled.current && e.button === 0) {
			if (this.#a(), i(this.#n) && this.root.opts.open.current && this.root.openedViaHover) {
				this.root.openedViaHover = !1, this.root.hasInteractedWithContent = !0;
				return;
			}
			i(this.#n) && this.opts.openOnHover.current && this.root.opts.open.current && (this.root.hoverCooldown = !0), this.root.hoverCooldown && !this.root.opts.open.current && (this.root.hoverCooldown = !1), this.root.toggleOpen();
		}
	}
	onkeydown(e) {
		this.opts.disabled.current || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.#a(), this.root.toggleOpen());
	}
	#o() {
		if (this.root.opts.open.current && this.root.contentNode?.id) return this.root.contentNode?.id;
	}
	#s = y(() => ({
		id: this.opts.id.current,
		"aria-haspopup": "dialog",
		"aria-expanded": D(this.root.opts.open.current),
		"data-state": T(this.root.opts.open.current),
		"aria-controls": this.#o(),
		[G.trigger]: "",
		disabled: this.opts.disabled.current,
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		onpointerenter: this.onpointerenter,
		onpointerleave: this.onpointerleave,
		...this.attachment
	}));
	get props() {
		return i(this.#s);
	}
	set props(e) {
		_(this.#s, e);
	}
}, Y = class e {
	static create(t) {
		return new e(t, K.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = w(this.opts.ref, (e) => this.root.contentNode = e), this.onpointerdown = this.onpointerdown.bind(this), this.onfocusin = this.onfocusin.bind(this), this.onpointerenter = this.onpointerenter.bind(this), this.onpointerleave = this.onpointerleave.bind(this), new U({
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
		B(t) && F(t) && this.root.markInteraction();
	}
	onpointerenter(e) {
		z(e) || this.root.cancelDelayedClose();
	}
	onpointerleave(e) {
		z(e);
	}
	onInteractOutside = (e) => {
		if (this.opts.onInteractOutside.current(e), e.defaultPrevented || !B(e.target)) return;
		let t = e.target.closest(G.selector("trigger"));
		if (!(t && t === this.root.triggerNode)) {
			if (this.opts.customAnchor.current) {
				if (B(this.opts.customAnchor.current)) {
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
	#e = y(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return i(this.#e);
	}
	set snippetProps(e) {
		_(this.#e, e);
	}
	#t = y(() => ({
		id: this.opts.id.current,
		tabindex: -1,
		"data-state": T(this.root.opts.open.current),
		...O(this.root.contentPresence.transitionStatus),
		[G.content]: "",
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
		return i(this.#t);
	}
	set props(e) {
		_(this.#t, e);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown
	};
}, X = class e {
	static create(t) {
		return new e(t, K.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = w(this.opts.ref), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		this.root.handleClose();
	}
	onkeydown(e) {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.root.handleClose());
	}
	#e = y(() => ({
		id: this.opts.id.current,
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		type: "button",
		[G.close]: "",
		...this.attachment
	}));
	get props() {
		return i(this.#e);
	}
	set props(e) {
		_(this.#e, e);
	}
}, Z = new Set([
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
]), Q = g("<div><div><!></div></div>");
function $(e, u) {
	let g = b();
	n(u, !0);
	let _ = d(u, "ref", 15, null), x = d(u, "id", 19, () => L(g)), S = d(u, "forceMount", 3, !1), w = d(u, "onOpenAutoFocus", 3, A), T = d(u, "onCloseAutoFocus", 3, A), E = d(u, "onEscapeKeydown", 3, A), D = d(u, "onInteractOutside", 3, A), O = d(u, "trapFocus", 3, !0), k = d(u, "preventScroll", 3, !1), N = d(u, "customAnchor", 3, null), F = v(u, Z), R = Y.create({
		id: C(() => x()),
		ref: C(() => _(), (e) => _(e)),
		onInteractOutside: C(() => D()),
		onEscapeKeydown: C(() => E()),
		customAnchor: C(() => N())
	}), z = y(() => I(F, R.props)), B = y(() => O() && R.shouldTrapFocus);
	function V(e) {
		R.shouldTrapFocus || e.preventDefault(), w()(e);
	}
	var H = l(), U = a(H), W = (e) => {
		P(e, m(() => i(z), () => R.popperProps, {
			get ref() {
				return R.opts.ref;
			},
			get enabled() {
				return R.root.opts.open.current;
			},
			get id() {
				return x();
			},
			get trapFocus() {
				return i(B);
			},
			get preventScroll() {
				return k();
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
				return R.shouldRender;
			},
			popper: (e, n) => {
				let s = () => n?.().props, d = () => n?.().wrapperProps, m = y(() => I(s(), { style: j("popover") }, { style: u.style }));
				var g = l(), _ = a(g), v = (e) => {
					var t = l(), n = a(t);
					{
						let e = y(() => ({
							props: i(m),
							wrapperProps: d(),
							...R.snippetProps
						}));
						r(n, () => u.child, () => i(e));
					}
					f(e, t);
				}, b = (e) => {
					var t = Q();
					p(t, () => ({ ...d() }));
					var n = c(t);
					p(n, () => ({ ...i(m) })), r(c(n), () => u.children ?? h), o(n), o(t), f(e, t);
				};
				t(_, (e) => {
					u.child ? e(v) : e(b, -1);
				}), f(e, g);
			},
			$$slots: { popper: !0 }
		}));
	}, G = (e) => {
		M(e, m(() => i(z), () => R.popperProps, {
			get ref() {
				return R.opts.ref;
			},
			get open() {
				return R.root.opts.open.current;
			},
			get id() {
				return x();
			},
			get trapFocus() {
				return i(B);
			},
			get preventScroll() {
				return k();
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
				return R.shouldRender;
			},
			popper: (e, n) => {
				let s = () => n?.().props, d = () => n?.().wrapperProps, m = y(() => I(s(), { style: j("popover") }, { style: u.style }));
				var g = l(), _ = a(g), v = (e) => {
					var t = l(), n = a(t);
					{
						let e = y(() => ({
							props: i(m),
							wrapperProps: d(),
							...R.snippetProps
						}));
						r(n, () => u.child, () => i(e));
					}
					f(e, t);
				}, b = (e) => {
					var t = Q();
					p(t, () => ({ ...d() }));
					var n = c(t);
					p(n, () => ({ ...i(m) })), r(c(n), () => u.children ?? h), o(n), o(t), f(e, t);
				};
				t(_, (e) => {
					u.child ? e(v) : e(b, -1);
				}), f(e, g);
			},
			$$slots: { popper: !0 }
		}));
	};
	t(U, (e) => {
		S() ? e(W) : S() || e(G, 1);
	}), f(e, H), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/popover/components/popover-trigger.svelte
var ee = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"type",
	"disabled",
	"openOnHover",
	"openDelay",
	"closeDelay"
]), te = g("<button><!></button>");
function ne(e, u) {
	let m = b();
	n(u, !0);
	let g = d(u, "id", 19, () => L(m)), _ = d(u, "ref", 15, null), x = d(u, "type", 3, "button"), S = d(u, "disabled", 3, !1), w = d(u, "openOnHover", 3, !1), T = d(u, "openDelay", 3, 700), E = d(u, "closeDelay", 3, 300), D = v(u, ee), O = J.create({
		id: C(() => g()),
		ref: C(() => _(), (e) => _(e)),
		disabled: C(() => !!S()),
		openOnHover: C(() => w()),
		openDelay: C(() => T()),
		closeDelay: C(() => E())
	}), k = y(() => I(D, O.props, { type: x() }));
	H(e, {
		get id() {
			return g();
		},
		get ref() {
			return O.opts.ref;
		},
		children: (e, n) => {
			var s = l(), d = a(s), m = (e) => {
				var t = l();
				r(a(t), () => u.child, () => ({ props: i(k) })), f(e, t);
			}, g = (e) => {
				var t = te();
				p(t, () => ({ ...i(k) })), r(c(t), () => u.children ?? h), o(t), f(e, t);
			};
			t(d, (e) => {
				u.child ? e(m) : e(g, -1);
			}), f(e, s);
		},
		$$slots: { default: !0 }
	}), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/popover/components/popover-close.svelte
var re = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"id",
	"ref"
]), ie = g("<button><!></button>");
function ae(e, u) {
	let m = b();
	n(u, !0);
	let g = d(u, "id", 19, () => L(m)), _ = d(u, "ref", 15, null), x = v(u, re), S = X.create({
		id: C(() => g()),
		ref: C(() => _(), (e) => _(e))
	}), w = y(() => I(x, S.props));
	var T = l(), E = a(T), D = (e) => {
		var t = l();
		r(a(t), () => u.child, () => ({ props: i(w) })), f(e, t);
	}, O = (e) => {
		var t = ie();
		p(t, () => ({ ...i(w) })), r(c(t), () => u.children ?? h), o(t), f(e, t);
	};
	t(E, (e) => {
		u.child ? e(D) : e(O, -1);
	}), f(e, T), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/popover/components/popover.svelte
function oe(e, t) {
	n(t, !0);
	let i = d(t, "open", 15, !1), o = d(t, "onOpenChange", 3, A), c = d(t, "onOpenChangeComplete", 3, A);
	q.create({
		open: C(() => i(), (e) => {
			i(e), o()(e);
		}),
		onOpenChangeComplete: C(() => c())
	}), N(e, {
		children: (e, n) => {
			var i = l();
			r(a(i), () => t.children ?? h), f(e, i);
		},
		$$slots: { default: !0 }
	}), s();
}
//#endregion
//#region ../ui/src/lib/components/popover/popover-content.svelte
var se = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function ce(t, o) {
	n(o, !0);
	let c = v(o, se);
	var u = l(), d = a(u);
	{
		let t = y(() => x("z-50 w-72 rounded-xl border border-dark-600 bg-dark-800 p-3 shadow-md outline-none", o.class));
		e(d, () => $, (e, n) => {
			n(e, m(() => c, {
				get class() {
					return i(t);
				},
				sideOffset: 4,
				children: (e, t) => {
					W(e, {
						orientation: "vertical",
						viewportClasses: "max-h-64 overflow-hidden",
						children: (e, t) => {
							var n = l();
							r(a(n), () => o.children ?? h), f(e, n);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			}));
		});
	}
	f(t, u), s();
}
//#endregion
//#region ../ui/src/lib/components/popover/index.ts
var le = oe, ue = ne, de = ae;
//#endregion
export { ce as i, le as n, ue as r, de as t };
