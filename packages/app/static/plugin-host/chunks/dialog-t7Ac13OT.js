import { $n as e, Ct as t, Hr as n, On as r, Qn as i, Qr as a, Qt as o, Vr as s, Z as c, Zn as l, a as u, cn as d, cr as f, jt as p, ln as m, mn as h, ni as g, o as _, or as v, pr as y, s as b, un as x } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { t as S } from "./utils-DJt177zd.js";
import { C, D as w, _ as T, d as E, l as D, n as O, o as k, r as A, u as j, x as M } from "./animations-complete-BfqHI4B-.js";
import { a as ee, i as te, n as N, r as P, t as F } from "./scroll-lock-BZF1_Y9Y.js";
import { i as I, n as L } from "./use-id-C9llEPxa.js";
import { r as R } from "./dom-B4Rzp8oi.js";
import { t as z } from "./presence-manager.svelte-BOTfPcjg.js";
import { t as B } from "./portal-D-OgjF3O.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/dialog/dialog.svelte.js
var V = k({
	component: "dialog",
	parts: [
		"content",
		"trigger",
		"overlay",
		"title",
		"description",
		"close",
		"cancel",
		"action"
	]
}), H = new C("Dialog.Root | AlertDialog.Root"), U = class e {
	static create(t) {
		let n = H.getOr(null);
		return H.set(new e(t, n));
	}
	opts;
	#e = f(null);
	get triggerNode() {
		return r(this.#e);
	}
	set triggerNode(e) {
		v(this.#e, e, !0);
	}
	#t = f(null);
	get contentNode() {
		return r(this.#t);
	}
	set contentNode(e) {
		v(this.#t, e, !0);
	}
	#n = f(null);
	get overlayNode() {
		return r(this.#n);
	}
	set overlayNode(e) {
		v(this.#n, e, !0);
	}
	#r = f(null);
	get descriptionNode() {
		return r(this.#r);
	}
	set descriptionNode(e) {
		v(this.#r, e, !0);
	}
	#i = f(void 0);
	get contentId() {
		return r(this.#i);
	}
	set contentId(e) {
		v(this.#i, e, !0);
	}
	#a = f(void 0);
	get titleId() {
		return r(this.#a);
	}
	set titleId(e) {
		v(this.#a, e, !0);
	}
	#o = f(void 0);
	get triggerId() {
		return r(this.#o);
	}
	set triggerId(e) {
		v(this.#o, e, !0);
	}
	#s = f(void 0);
	get descriptionId() {
		return r(this.#s);
	}
	set descriptionId(e) {
		v(this.#s, e, !0);
	}
	#c = f(null);
	get cancelNode() {
		return r(this.#c);
	}
	set cancelNode(e) {
		v(this.#c, e, !0);
	}
	#l = f(0);
	get nestedOpenCount() {
		return r(this.#l);
	}
	set nestedOpenCount(e) {
		v(this.#l, e, !0);
	}
	depth;
	parent;
	contentPresence;
	overlayPresence;
	constructor(e, t) {
		this.opts = e, this.parent = t, this.depth = t ? t.depth + 1 : 0, this.handleOpen = this.handleOpen.bind(this), this.handleClose = this.handleClose.bind(this), this.contentPresence = new z({
			ref: w(() => this.contentNode),
			open: this.opts.open,
			enabled: !0,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), this.overlayPresence = new z({
			ref: w(() => this.overlayNode),
			open: this.opts.open,
			enabled: !0
		}), M(() => this.opts.open.current, (e) => {
			this.parent && (e ? this.parent.incrementNested() : this.parent.decrementNested());
		}, { lazy: !0 }), T(() => {
			this.opts.open.current && this.parent?.decrementNested();
		});
	}
	handleOpen() {
		this.opts.open.current || (this.opts.open.current = !0);
	}
	handleClose() {
		this.opts.open.current && (this.opts.open.current = !1);
	}
	getBitsAttr = (e) => V.getAttr(e, this.opts.variant.current);
	incrementNested() {
		this.nestedOpenCount++, this.parent?.incrementNested();
	}
	decrementNested() {
		this.nestedOpenCount !== 0 && (this.nestedOpenCount--, this.parent?.decrementNested());
	}
	#u = y(() => ({ "data-state": D(this.opts.open.current) }));
	get sharedProps() {
		return r(this.#u);
	}
	set sharedProps(e) {
		v(this.#u, e);
	}
}, W = class e {
	static create(t) {
		return new e(t, H.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = E(this.opts.ref, (e) => {
			this.root.triggerNode = e, this.root.triggerId = e?.id;
		}), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		this.opts.disabled.current || e.button > 0 || this.root.handleOpen();
	}
	onkeydown(e) {
		this.opts.disabled.current || (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.root.handleOpen());
	}
	#e = y(() => ({
		id: this.opts.id.current,
		"aria-haspopup": "dialog",
		"aria-expanded": A(this.root.opts.open.current),
		"aria-controls": this.root.contentId,
		[this.root.getBitsAttr("trigger")]: "",
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		disabled: this.opts.disabled.current ? !0 : void 0,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return r(this.#e);
	}
	set props(e) {
		v(this.#e, e);
	}
}, G = class e {
	static create(t) {
		return new e(t, H.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = E(this.opts.ref), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		this.opts.disabled.current || e.button > 0 || this.root.handleClose();
	}
	onkeydown(e) {
		this.opts.disabled.current || (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.root.handleClose());
	}
	#e = y(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr(this.opts.variant.current)]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		disabled: this.opts.disabled.current ? !0 : void 0,
		tabindex: 0,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return r(this.#e);
	}
	set props(e) {
		v(this.#e, e);
	}
}, K = class e {
	static create(t) {
		return new e(t, H.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.root.titleId = this.opts.id.current, this.attachment = E(this.opts.ref), M.pre(() => this.opts.id.current, (e) => {
			this.root.titleId = e;
		});
	}
	#e = y(() => ({
		id: this.opts.id.current,
		role: "heading",
		"aria-level": this.opts.level.current,
		[this.root.getBitsAttr("title")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return r(this.#e);
	}
	set props(e) {
		v(this.#e, e);
	}
}, q = class e {
	static create(t) {
		return new e(t, H.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.root.descriptionId = this.opts.id.current, this.attachment = E(this.opts.ref, (e) => {
			this.root.descriptionNode = e;
		}), M.pre(() => this.opts.id.current, (e) => {
			this.root.descriptionId = e;
		});
	}
	#e = y(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("description")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return r(this.#e);
	}
	set props(e) {
		v(this.#e, e);
	}
}, J = class e {
	static create(t) {
		return new e(t, H.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = E(this.opts.ref, (e) => {
			this.root.contentNode = e, this.root.contentId = e?.id;
		});
	}
	#e = y(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return r(this.#e);
	}
	set snippetProps(e) {
		v(this.#e, e);
	}
	#t = y(() => ({
		id: this.opts.id.current,
		role: this.root.opts.variant.current === "alert-dialog" ? "alertdialog" : "dialog",
		"aria-modal": "true",
		"aria-describedby": this.root.descriptionId,
		"aria-labelledby": this.root.titleId,
		[this.root.getBitsAttr("content")]: "",
		style: {
			pointerEvents: "auto",
			outline: this.root.opts.variant.current === "alert-dialog" ? "none" : void 0,
			"--bits-dialog-depth": this.root.depth,
			"--bits-dialog-nested-count": this.root.nestedOpenCount,
			contain: "layout style"
		},
		tabindex: this.root.opts.variant.current === "alert-dialog" ? -1 : void 0,
		"data-nested-open": O(this.root.nestedOpenCount > 0),
		"data-nested": O(this.root.parent !== null),
		...j(this.root.contentPresence.transitionStatus),
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return r(this.#t);
	}
	set props(e) {
		v(this.#t, e);
	}
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
}, Y = class e {
	static create(t) {
		return new e(t, H.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = E(this.opts.ref, (e) => this.root.overlayNode = e);
	}
	#e = y(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return r(this.#e);
	}
	set snippetProps(e) {
		v(this.#e, e);
	}
	#t = y(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("overlay")]: "",
		style: {
			pointerEvents: "auto",
			"--bits-dialog-depth": this.root.depth,
			"--bits-dialog-nested-count": this.root.nestedOpenCount
		},
		"data-nested-open": O(this.root.nestedOpenCount > 0),
		"data-nested": O(this.root.parent !== null),
		...j(this.root.overlayPresence.transitionStatus),
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return r(this.#t);
	}
	set props(e) {
		v(this.#t, e);
	}
	get shouldRender() {
		return this.root.overlayPresence.shouldRender;
	}
}, X = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"level"
]), Z = x("<div><!></div>");
function Q(e, t) {
	let f = h();
	n(t, !0);
	let v = u(t, "id", 19, () => L(f)), b = u(t, "ref", 15, null), x = u(t, "level", 3, 2), S = _(t, X), C = K.create({
		id: w(() => v()),
		level: w(() => x()),
		ref: w(() => b(), (e) => b(e))
	}), T = y(() => I(S, C.props));
	var E = m(), D = i(E), O = (e) => {
		var n = m();
		o(i(n), () => t.child, () => ({ props: r(T) })), d(e, n);
	}, k = (e) => {
		var n = Z();
		c(n, () => ({ ...r(T) })), o(l(n), () => t.children ?? g), a(n), d(e, n);
	};
	p(D, (e) => {
		t.child ? e(O) : e(k, -1);
	}), d(e, E), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/dialog/components/dialog-overlay.svelte
var ne = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"forceMount",
	"child",
	"children",
	"ref"
]), re = x("<div><!></div>");
function $(e, t) {
	let f = h();
	n(t, !0);
	let v = u(t, "id", 19, () => L(f)), b = u(t, "forceMount", 3, !1), x = u(t, "ref", 15, null), S = _(t, ne), C = Y.create({
		id: w(() => v()),
		ref: w(() => x(), (e) => x(e))
	}), T = y(() => I(S, C.props));
	var E = m(), D = i(E), O = (e) => {
		var n = m(), s = i(n), u = (e) => {
			var n = m(), a = i(n);
			{
				let e = y(() => ({
					props: I(r(T)),
					...C.snippetProps
				}));
				o(a, () => t.child, () => r(e));
			}
			d(e, n);
		}, f = (e) => {
			var n = re();
			c(n, (e) => ({ ...e }), [() => I(r(T))]), o(l(n), () => t.children ?? g, () => C.snippetProps), a(n), d(e, n);
		};
		p(s, (e) => {
			t.child ? e(u) : e(f, -1);
		}), d(e, n);
	};
	p(D, (e) => {
		(C.shouldRender || b()) && e(O);
	}), d(e, E), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/dialog/components/dialog-trigger.svelte
var ie = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"disabled"
]), ae = x("<button><!></button>");
function oe(e, t) {
	let f = h();
	n(t, !0);
	let v = u(t, "id", 19, () => L(f)), b = u(t, "ref", 15, null), x = u(t, "disabled", 3, !1), S = _(t, ie), C = W.create({
		id: w(() => v()),
		ref: w(() => b(), (e) => b(e)),
		disabled: w(() => !!x())
	}), T = y(() => I(S, C.props));
	var E = m(), D = i(E), O = (e) => {
		var n = m();
		o(i(n), () => t.child, () => ({ props: r(T) })), d(e, n);
	}, k = (e) => {
		var n = ae();
		c(n, () => ({ ...r(T) })), o(l(n), () => t.children ?? g), a(n), d(e, n);
	};
	p(D, (e) => {
		t.child ? e(O) : e(k, -1);
	}), d(e, E), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/dialog/components/dialog-description.svelte
var se = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"children",
	"child",
	"ref"
]), ce = x("<div><!></div>");
function le(e, t) {
	let f = h();
	n(t, !0);
	let v = u(t, "id", 19, () => L(f)), b = u(t, "ref", 15, null), x = _(t, se), S = q.create({
		id: w(() => v()),
		ref: w(() => b(), (e) => b(e))
	}), C = y(() => I(x, S.props));
	var T = m(), E = i(T), D = (e) => {
		var n = m();
		o(i(n), () => t.child, () => ({ props: r(C) })), d(e, n);
	}, O = (e) => {
		var n = ce();
		c(n, () => ({ ...r(C) })), o(l(n), () => t.children ?? g), a(n), d(e, n);
	};
	p(E, (e) => {
		t.child ? e(D) : e(O, -1);
	}), d(e, T), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/dialog/components/dialog.svelte
function ue(e, t) {
	n(t, !0);
	let r = u(t, "open", 15, !1), a = u(t, "onOpenChange", 3, R), c = u(t, "onOpenChangeComplete", 3, R);
	U.create({
		variant: w(() => "dialog"),
		open: w(() => r(), (e) => {
			r(e), a()(e);
		}),
		onOpenChangeComplete: w(() => c())
	});
	var l = m();
	o(i(l), () => t.children ?? g), d(e, l), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/dialog/components/dialog-close.svelte
var de = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"disabled"
]), fe = x("<button><!></button>");
function pe(e, t) {
	let f = h();
	n(t, !0);
	let v = u(t, "id", 19, () => L(f)), b = u(t, "ref", 15, null), x = u(t, "disabled", 3, !1), S = _(t, de), C = G.create({
		variant: w(() => "close"),
		id: w(() => v()),
		ref: w(() => b(), (e) => b(e)),
		disabled: w(() => !!x())
	}), T = y(() => I(S, C.props));
	var E = m(), D = i(E), O = (e) => {
		var n = m();
		o(i(n), () => t.child, () => ({ props: r(T) })), d(e, n);
	}, k = (e) => {
		var n = fe();
		c(n, () => ({ ...r(T) })), o(l(n), () => t.children ?? g), a(n), d(e, n);
	};
	p(D, (e) => {
		t.child ? e(O) : e(k, -1);
	}), d(e, E), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/dialog/components/dialog-content.svelte
var me = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"children",
	"child",
	"ref",
	"forceMount",
	"onCloseAutoFocus",
	"onOpenAutoFocus",
	"onEscapeKeydown",
	"onInteractOutside",
	"trapFocus",
	"preventScroll",
	"restoreScrollDelay"
]), he = x("<!> <!>", 1), ge = x("<!> <div><!></div>", 1);
function _e(t, f) {
	let v = h();
	n(f, !0);
	let x = u(f, "id", 19, () => L(v)), S = u(f, "ref", 15, null), C = u(f, "forceMount", 3, !1), T = u(f, "onCloseAutoFocus", 3, R), E = u(f, "onOpenAutoFocus", 3, R), D = u(f, "onEscapeKeydown", 3, R), O = u(f, "onInteractOutside", 3, R), k = u(f, "trapFocus", 3, !0), A = u(f, "preventScroll", 3, !0), j = u(f, "restoreScrollDelay", 3, null), M = _(f, me), z = J.create({
		id: w(() => x()),
		ref: w(() => S(), (e) => S(e))
	}), B = y(() => I(M, z.props));
	var V = m(), H = i(V), U = (t) => {
		P(t, {
			get ref() {
				return z.opts.ref;
			},
			loop: !0,
			get trapFocus() {
				return k();
			},
			get enabled() {
				return z.root.opts.open.current;
			},
			get onOpenAutoFocus() {
				return E();
			},
			get onCloseAutoFocus() {
				return T();
			},
			focusScope: (t, n) => {
				let s = () => n?.().props;
				te(t, b(() => r(B), {
					get enabled() {
						return z.root.opts.open.current;
					},
					get ref() {
						return z.opts.ref;
					},
					onEscapeKeydown: (e) => {
						D()(e), !e.defaultPrevented && z.root.handleClose();
					},
					children: (t, n) => {
						ee(t, b(() => r(B), {
							get ref() {
								return z.opts.ref;
							},
							get enabled() {
								return z.root.opts.open.current;
							},
							onInteractOutside: (e) => {
								O()(e), !e.defaultPrevented && z.root.handleClose();
							},
							children: (t, n) => {
								N(t, b(() => r(B), {
									get ref() {
										return z.opts.ref;
									},
									get enabled() {
										return z.root.opts.open.current;
									},
									children: (t, n) => {
										var u = m(), h = i(u), _ = (t) => {
											var n = he(), a = i(n), c = (e) => {
												F(e, {
													get preventScroll() {
														return A();
													},
													get restoreScrollDelay() {
														return j();
													}
												});
											};
											p(a, (e) => {
												z.root.opts.open.current && e(c);
											});
											var l = e(a, 2);
											{
												let e = y(() => ({
													props: I(r(B), s()),
													...z.snippetProps
												}));
												o(l, () => f.child, () => r(e));
											}
											d(t, n);
										}, v = (t) => {
											var n = ge(), u = i(n);
											F(u, { get preventScroll() {
												return A();
											} });
											var p = e(u, 2);
											c(p, (e) => ({ ...e }), [() => I(r(B), s())]), o(l(p), () => f.children ?? g), a(p), d(t, n);
										};
										p(h, (e) => {
											f.child ? e(_) : e(v, -1);
										}), d(t, u);
									},
									$$slots: { default: !0 }
								}));
							},
							$$slots: { default: !0 }
						}));
					},
					$$slots: { default: !0 }
				}));
			},
			$$slots: { focusScope: !0 }
		});
	};
	p(H, (e) => {
		(z.shouldRender || C()) && e(U);
	}), d(t, V), s();
}
//#endregion
//#region ../ui/src/lib/components/dialog/dialog-content.svelte
var ve = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function ye(e, a) {
	n(a, !0);
	let c = _(a, ve);
	var l = m(), u = i(l);
	{
		let e = y(() => S("fixed top-1/2 left-1/2 z-50 w-full max-w-[94%] origin-center -translate-x-1/2 -translate-y-1/2 outline-none sm:max-w-[490px]", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", a.class));
		t(u, () => _e, (t, n) => {
			n(t, b(() => c, {
				get class() {
					return r(e);
				},
				children: (e, t) => {
					var n = m();
					o(i(n), () => a.children ?? g), d(e, n);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	d(e, l), s();
}
//#endregion
//#region ../ui/src/lib/components/dialog/dialog-overlay.svelte
var be = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"class"
]);
function xe(e, a) {
	n(a, !0);
	let o = _(a, be);
	var c = m(), l = i(c);
	{
		let e = y(() => S("fixed inset-0 z-50 bg-black/50", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", a.class));
		t(l, () => $, (t, n) => {
			n(t, b(() => o, { get class() {
				return r(e);
			} }));
		});
	}
	d(e, c), s();
}
//#endregion
//#region ../ui/src/lib/components/dialog/index.ts
var Se = ue, Ce = B, we = Q, Te = le, Ee = pe, De = oe;
//#endregion
export { we as a, ye as c, Se as i, Te as n, De as o, Ce as r, xe as s, Ee as t };
