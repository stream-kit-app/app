import { $n as e, At as t, Gt as n, Hr as r, Mt as i, On as a, Qn as o, Qr as s, Vr as c, Zn as l, an as u, cr as d, f, in as p, it as m, m as h, ni as g, on as _, or as v, p as y, pr as b, un as x } from "./index-client-BIJQxc2l.js";
import "./disclose-version-YhYaTdgb.js";
import { t as S } from "./utils-DVQ4nj8f.js";
import { C, D as w, _ as T, d as E, l as D, n as O, o as k, r as A, u as j, x as M } from "./animations-complete-mSylzqL5.js";
import { a as N, i as ee, n as te, r as P, t as F } from "./scroll-lock-io5BKwUu.js";
import { i as I, n as L } from "./use-id-D_eLoXvH.js";
import { r as R } from "./dom-DDAYniBq.js";
import { t as z } from "./presence-manager.svelte-DXU099Vb.js";
import { t as B } from "./portal-Clk-o-E0.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/dialog/dialog.svelte.js
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
	#e = d(null);
	get triggerNode() {
		return a(this.#e);
	}
	set triggerNode(e) {
		v(this.#e, e, !0);
	}
	#t = d(null);
	get contentNode() {
		return a(this.#t);
	}
	set contentNode(e) {
		v(this.#t, e, !0);
	}
	#n = d(null);
	get overlayNode() {
		return a(this.#n);
	}
	set overlayNode(e) {
		v(this.#n, e, !0);
	}
	#r = d(null);
	get descriptionNode() {
		return a(this.#r);
	}
	set descriptionNode(e) {
		v(this.#r, e, !0);
	}
	#i = d(void 0);
	get contentId() {
		return a(this.#i);
	}
	set contentId(e) {
		v(this.#i, e, !0);
	}
	#a = d(void 0);
	get titleId() {
		return a(this.#a);
	}
	set titleId(e) {
		v(this.#a, e, !0);
	}
	#o = d(void 0);
	get triggerId() {
		return a(this.#o);
	}
	set triggerId(e) {
		v(this.#o, e, !0);
	}
	#s = d(void 0);
	get descriptionId() {
		return a(this.#s);
	}
	set descriptionId(e) {
		v(this.#s, e, !0);
	}
	#c = d(null);
	get cancelNode() {
		return a(this.#c);
	}
	set cancelNode(e) {
		v(this.#c, e, !0);
	}
	#l = d(0);
	get nestedOpenCount() {
		return a(this.#l);
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
	#u = b(() => ({ "data-state": D(this.opts.open.current) }));
	get sharedProps() {
		return a(this.#u);
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
	#e = b(() => ({
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
		return a(this.#e);
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
	#e = b(() => ({
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
		return a(this.#e);
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
	#e = b(() => ({
		id: this.opts.id.current,
		role: "heading",
		"aria-level": this.opts.level.current,
		[this.root.getBitsAttr("title")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return a(this.#e);
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
	#e = b(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("description")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return a(this.#e);
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
	#e = b(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return a(this.#e);
	}
	set snippetProps(e) {
		v(this.#e, e);
	}
	#t = b(() => ({
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
		return a(this.#t);
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
	#e = b(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return a(this.#e);
	}
	set snippetProps(e) {
		v(this.#e, e);
	}
	#t = b(() => ({
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
		return a(this.#t);
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
]), Z = _("<div><!></div>");
function Q(e, t) {
	let d = x();
	r(t, !0);
	let h = f(t, "id", 19, () => L(d)), _ = f(t, "ref", 15, null), v = f(t, "level", 3, 2), S = y(t, X), C = K.create({
		id: w(() => h()),
		level: w(() => v()),
		ref: w(() => _(), (e) => _(e))
	}), T = b(() => I(S, C.props));
	var E = u(), D = o(E), O = (e) => {
		var n = u();
		i(o(n), () => t.child, () => ({ props: a(T) })), p(e, n);
	}, k = (e) => {
		var n = Z();
		m(n, () => ({ ...a(T) })), i(l(n), () => t.children ?? g), s(n), p(e, n);
	};
	n(D, (e) => {
		t.child ? e(O) : e(k, -1);
	}), p(e, E), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/dialog/components/dialog-overlay.svelte
var ne = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"forceMount",
	"child",
	"children",
	"ref"
]), re = _("<div><!></div>");
function ie(e, t) {
	let d = x();
	r(t, !0);
	let h = f(t, "id", 19, () => L(d)), _ = f(t, "forceMount", 3, !1), v = f(t, "ref", 15, null), S = y(t, ne), C = Y.create({
		id: w(() => h()),
		ref: w(() => v(), (e) => v(e))
	}), T = b(() => I(S, C.props));
	var E = u(), D = o(E), O = (e) => {
		var r = u(), c = o(r), d = (e) => {
			var n = u(), r = o(n);
			{
				let e = b(() => ({
					props: I(a(T)),
					...C.snippetProps
				}));
				i(r, () => t.child, () => a(e));
			}
			p(e, n);
		}, f = (e) => {
			var n = re();
			m(n, (e) => ({ ...e }), [() => I(a(T))]), i(l(n), () => t.children ?? g, () => C.snippetProps), s(n), p(e, n);
		};
		n(c, (e) => {
			t.child ? e(d) : e(f, -1);
		}), p(e, r);
	};
	n(D, (e) => {
		(C.shouldRender || _()) && e(O);
	}), p(e, E), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/dialog/components/dialog-trigger.svelte
var ae = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"disabled"
]), oe = _("<button><!></button>");
function se(e, t) {
	let d = x();
	r(t, !0);
	let h = f(t, "id", 19, () => L(d)), _ = f(t, "ref", 15, null), v = f(t, "disabled", 3, !1), S = y(t, ae), C = W.create({
		id: w(() => h()),
		ref: w(() => _(), (e) => _(e)),
		disabled: w(() => !!v())
	}), T = b(() => I(S, C.props));
	var E = u(), D = o(E), O = (e) => {
		var n = u();
		i(o(n), () => t.child, () => ({ props: a(T) })), p(e, n);
	}, k = (e) => {
		var n = oe();
		m(n, () => ({ ...a(T) })), i(l(n), () => t.children ?? g), s(n), p(e, n);
	};
	n(D, (e) => {
		t.child ? e(O) : e(k, -1);
	}), p(e, E), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/dialog/components/dialog-description.svelte
var ce = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"children",
	"child",
	"ref"
]), le = _("<div><!></div>");
function ue(e, t) {
	let d = x();
	r(t, !0);
	let h = f(t, "id", 19, () => L(d)), _ = f(t, "ref", 15, null), v = y(t, ce), S = q.create({
		id: w(() => h()),
		ref: w(() => _(), (e) => _(e))
	}), C = b(() => I(v, S.props));
	var T = u(), E = o(T), D = (e) => {
		var n = u();
		i(o(n), () => t.child, () => ({ props: a(C) })), p(e, n);
	}, O = (e) => {
		var n = le();
		m(n, () => ({ ...a(C) })), i(l(n), () => t.children ?? g), s(n), p(e, n);
	};
	n(E, (e) => {
		t.child ? e(D) : e(O, -1);
	}), p(e, T), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/dialog/components/dialog.svelte
function de(e, t) {
	r(t, !0);
	let n = f(t, "open", 15, !1), a = f(t, "onOpenChange", 3, R), s = f(t, "onOpenChangeComplete", 3, R);
	U.create({
		variant: w(() => "dialog"),
		open: w(() => n(), (e) => {
			n(e), a()(e);
		}),
		onOpenChangeComplete: w(() => s())
	});
	var l = u();
	i(o(l), () => t.children ?? g), p(e, l), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/dialog/components/dialog-close.svelte
var fe = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"disabled"
]), pe = _("<button><!></button>");
function me(e, t) {
	let d = x();
	r(t, !0);
	let h = f(t, "id", 19, () => L(d)), _ = f(t, "ref", 15, null), v = f(t, "disabled", 3, !1), S = y(t, fe), C = G.create({
		variant: w(() => "close"),
		id: w(() => h()),
		ref: w(() => _(), (e) => _(e)),
		disabled: w(() => !!v())
	}), T = b(() => I(S, C.props));
	var E = u(), D = o(E), O = (e) => {
		var n = u();
		i(o(n), () => t.child, () => ({ props: a(T) })), p(e, n);
	}, k = (e) => {
		var n = pe();
		m(n, () => ({ ...a(T) })), i(l(n), () => t.children ?? g), s(n), p(e, n);
	};
	n(D, (e) => {
		t.child ? e(O) : e(k, -1);
	}), p(e, E), c();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/dialog/components/dialog-content.svelte
var he = new Set([
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
]), ge = _("<!> <!>", 1), _e = _("<!> <div><!></div>", 1);
function ve(t, d) {
	let _ = x();
	r(d, !0);
	let v = f(d, "id", 19, () => L(_)), S = f(d, "ref", 15, null), C = f(d, "forceMount", 3, !1), T = f(d, "onCloseAutoFocus", 3, R), E = f(d, "onOpenAutoFocus", 3, R), D = f(d, "onEscapeKeydown", 3, R), O = f(d, "onInteractOutside", 3, R), k = f(d, "trapFocus", 3, !0), A = f(d, "preventScroll", 3, !0), j = f(d, "restoreScrollDelay", 3, null), M = y(d, he), z = J.create({
		id: w(() => v()),
		ref: w(() => S(), (e) => S(e))
	}), B = b(() => I(M, z.props));
	var V = u(), H = o(V), U = (t) => {
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
			focusScope: (t, r) => {
				let c = () => r?.().props;
				ee(t, h(() => a(B), {
					get enabled() {
						return z.root.opts.open.current;
					},
					get ref() {
						return z.opts.ref;
					},
					onEscapeKeydown: (e) => {
						D()(e), !e.defaultPrevented && z.root.handleClose();
					},
					children: (t, r) => {
						N(t, h(() => a(B), {
							get ref() {
								return z.opts.ref;
							},
							get enabled() {
								return z.root.opts.open.current;
							},
							onInteractOutside: (e) => {
								O()(e), !e.defaultPrevented && z.root.handleClose();
							},
							children: (t, r) => {
								te(t, h(() => a(B), {
									get ref() {
										return z.opts.ref;
									},
									get enabled() {
										return z.root.opts.open.current;
									},
									children: (t, r) => {
										var f = u(), h = o(f), _ = (t) => {
											var r = ge(), s = o(r), l = (e) => {
												F(e, {
													get preventScroll() {
														return A();
													},
													get restoreScrollDelay() {
														return j();
													}
												});
											};
											n(s, (e) => {
												z.root.opts.open.current && e(l);
											});
											var u = e(s, 2);
											{
												let e = b(() => ({
													props: I(a(B), c()),
													...z.snippetProps
												}));
												i(u, () => d.child, () => a(e));
											}
											p(t, r);
										}, v = (t) => {
											var n = _e(), r = o(n);
											F(r, { get preventScroll() {
												return A();
											} });
											var u = e(r, 2);
											m(u, (e) => ({ ...e }), [() => I(a(B), c())]), i(l(u), () => d.children ?? g), s(u), p(t, n);
										};
										n(h, (e) => {
											d.child ? e(_) : e(v, -1);
										}), p(t, f);
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
	n(H, (e) => {
		(z.shouldRender || C()) && e(U);
	}), p(t, V), c();
}
//#endregion
//#region ../ui/src/lib/components/dialog/dialog-content.svelte
var ye = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function $(e, n) {
	r(n, !0);
	let s = y(n, ye);
	var l = u(), d = o(l);
	{
		let e = b(() => S("fixed top-1/2 left-1/2 z-50 w-full max-w-[94%] origin-center -translate-x-1/2 -translate-y-1/2 outline-none sm:max-w-[490px]", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", n.class));
		t(d, () => ve, (t, r) => {
			r(t, h(() => s, {
				get class() {
					return a(e);
				},
				children: (e, t) => {
					var r = u();
					i(o(r), () => n.children ?? g), p(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	p(e, l), c();
}
//#endregion
//#region ../ui/src/lib/components/dialog/dialog-overlay.svelte
var be = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"class"
]);
function xe(e, n) {
	r(n, !0);
	let i = y(n, be);
	var s = u(), l = o(s);
	{
		let e = b(() => S("fixed inset-0 z-50 bg-black/50", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", n.class));
		t(l, () => ie, (t, n) => {
			n(t, h(() => i, { get class() {
				return a(e);
			} }));
		});
	}
	p(e, s), c();
}
//#endregion
//#region ../ui/src/lib/components/dialog/index.ts
var Se = de, Ce = B, we = Q, Te = ue, Ee = me, De = se;
//#endregion
export { we as a, $ as c, Se as i, Te as n, De as o, Ce as r, xe as s, Ee as t };
