import { Bn as e, Dr as t, En as n, Hr as r, Nt as i, Sn as a, Ur as o, Vt as s, _r as c, a as l, bn as u, cr as d, ii as f, o as p, ot as m, s as h, sn as g, sr as _, ti as v, ur as y, xn as b, yr as x } from "./client-BFeMv2Ma.js";
import { t as S } from "./utils-Dqp4W1j8.js";
import "./disclose-version-CI8I6yeK.js";
import { C, D as w, _ as T, d as E, l as D, n as O, o as k, r as A, u as j, x as M } from "./animations-complete-2GhqX7WL.js";
import { i as N, n as P } from "./use-id-BW6hjw-g.js";
import { r as F } from "./dom-9pAGmv2P.js";
import { t as I } from "./presence-manager.svelte-cK0pnbQH.js";
import { t as L } from "./portal-D7k4f7sM.js";
import { c as R, l as ee, n as te, r as z, t as B } from "./scroll-lock-qBq_Ag7a.js";
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/dialog/dialog.svelte.js
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
}), H = new C("Dialog.Root | AlertDialog.Root"), U = class n {
	static create(e) {
		let t = H.getOr(null);
		return H.set(new n(e, t));
	}
	opts;
	#e = x(null);
	get triggerNode() {
		return e(this.#e);
	}
	set triggerNode(e) {
		c(this.#e, e, !0);
	}
	#t = x(null);
	get contentNode() {
		return e(this.#t);
	}
	set contentNode(e) {
		c(this.#t, e, !0);
	}
	#n = x(null);
	get overlayNode() {
		return e(this.#n);
	}
	set overlayNode(e) {
		c(this.#n, e, !0);
	}
	#r = x(null);
	get descriptionNode() {
		return e(this.#r);
	}
	set descriptionNode(e) {
		c(this.#r, e, !0);
	}
	#i = x(void 0);
	get contentId() {
		return e(this.#i);
	}
	set contentId(e) {
		c(this.#i, e, !0);
	}
	#a = x(void 0);
	get titleId() {
		return e(this.#a);
	}
	set titleId(e) {
		c(this.#a, e, !0);
	}
	#o = x(void 0);
	get triggerId() {
		return e(this.#o);
	}
	set triggerId(e) {
		c(this.#o, e, !0);
	}
	#s = x(void 0);
	get descriptionId() {
		return e(this.#s);
	}
	set descriptionId(e) {
		c(this.#s, e, !0);
	}
	#c = x(null);
	get cancelNode() {
		return e(this.#c);
	}
	set cancelNode(e) {
		c(this.#c, e, !0);
	}
	#l = x(0);
	get nestedOpenCount() {
		return e(this.#l);
	}
	set nestedOpenCount(e) {
		c(this.#l, e, !0);
	}
	depth;
	parent;
	contentPresence;
	overlayPresence;
	constructor(e, t) {
		this.opts = e, this.parent = t, this.depth = t ? t.depth + 1 : 0, this.handleOpen = this.handleOpen.bind(this), this.handleClose = this.handleClose.bind(this), this.contentPresence = new I({
			ref: w(() => this.contentNode),
			open: this.opts.open,
			enabled: !0,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), this.overlayPresence = new I({
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
	#u = t(() => ({ "data-state": D(this.opts.open.current) }));
	get sharedProps() {
		return e(this.#u);
	}
	set sharedProps(e) {
		c(this.#u, e);
	}
}, W = class n {
	static create(e) {
		return new n(e, H.get());
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
	#e = t(() => ({
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
		return e(this.#e);
	}
	set props(e) {
		c(this.#e, e);
	}
}, G = class n {
	static create(e) {
		return new n(e, H.get());
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
	#e = t(() => ({
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
		return e(this.#e);
	}
	set props(e) {
		c(this.#e, e);
	}
}, K = class n {
	static create(e) {
		return new n(e, H.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.root.titleId = this.opts.id.current, this.attachment = E(this.opts.ref), M.pre(() => this.opts.id.current, (e) => {
			this.root.titleId = e;
		});
	}
	#e = t(() => ({
		id: this.opts.id.current,
		role: "heading",
		"aria-level": this.opts.level.current,
		[this.root.getBitsAttr("title")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return e(this.#e);
	}
	set props(e) {
		c(this.#e, e);
	}
}, q = class n {
	static create(e) {
		return new n(e, H.get());
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
	#e = t(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("description")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return e(this.#e);
	}
	set props(e) {
		c(this.#e, e);
	}
}, J = class n {
	static create(e) {
		return new n(e, H.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = E(this.opts.ref, (e) => {
			this.root.contentNode = e, this.root.contentId = e?.id;
		});
	}
	#e = t(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return e(this.#e);
	}
	set snippetProps(e) {
		c(this.#e, e);
	}
	#t = t(() => ({
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
		return e(this.#t);
	}
	set props(e) {
		c(this.#t, e);
	}
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
}, Y = class n {
	static create(e) {
		return new n(e, H.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = E(this.opts.ref, (e) => this.root.overlayNode = e);
	}
	#e = t(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return e(this.#e);
	}
	set snippetProps(e) {
		c(this.#e, e);
	}
	#t = t(() => ({
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
		return e(this.#t);
	}
	set props(e) {
		c(this.#t, e);
	}
	get shouldRender() {
		return this.root.overlayPresence.shouldRender;
	}
}, X = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"level"
]), Z = a("<div><!></div>");
function Q(i, a) {
	let c = n();
	o(a, !0);
	let h = l(a, "id", 19, () => P(c)), y = l(a, "ref", 15, null), x = l(a, "level", 3, 2), S = p(a, X), C = K.create({
		id: w(() => h()),
		level: w(() => x()),
		ref: w(() => y(), (e) => y(e))
	}), T = t(() => N(S, C.props));
	var E = b(), D = d(E), O = (t) => {
		var n = b(), r = d(n);
		g(r, () => a.child, () => ({ props: e(T) })), u(t, n);
	}, k = (t) => {
		var n = Z();
		m(n, () => ({ ...e(T) }));
		var r = _(n);
		g(r, () => a.children ?? f), v(n), u(t, n);
	};
	s(D, (e) => {
		a.child ? e(O) : e(k, -1);
	}), u(i, E), r();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/dialog/components/dialog-overlay.svelte
var ne = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"forceMount",
	"child",
	"children",
	"ref"
]), re = a("<div><!></div>");
function ie(i, a) {
	let c = n();
	o(a, !0);
	let h = l(a, "id", 19, () => P(c)), y = l(a, "forceMount", 3, !1), x = l(a, "ref", 15, null), S = p(a, ne), C = Y.create({
		id: w(() => h()),
		ref: w(() => x(), (e) => x(e))
	}), T = t(() => N(S, C.props));
	var E = b(), D = d(E), O = (n) => {
		var r = b(), i = d(r), o = (n) => {
			var r = b(), i = d(r);
			{
				let n = t(() => ({
					props: N(e(T)),
					...C.snippetProps
				}));
				g(i, () => a.child, () => e(n));
			}
			u(n, r);
		}, c = (t) => {
			var n = re();
			m(n, (e) => ({ ...e }), [() => N(e(T))]);
			var r = _(n);
			g(r, () => a.children ?? f, () => C.snippetProps), v(n), u(t, n);
		};
		s(i, (e) => {
			a.child ? e(o) : e(c, -1);
		}), u(n, r);
	};
	s(D, (e) => {
		(C.shouldRender || y()) && e(O);
	}), u(i, E), r();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/dialog/components/dialog-trigger.svelte
var ae = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"disabled"
]), oe = a("<button><!></button>");
function se(i, a) {
	let c = n();
	o(a, !0);
	let h = l(a, "id", 19, () => P(c)), y = l(a, "ref", 15, null), x = l(a, "disabled", 3, !1), S = p(a, ae), C = W.create({
		id: w(() => h()),
		ref: w(() => y(), (e) => y(e)),
		disabled: w(() => !!x())
	}), T = t(() => N(S, C.props));
	var E = b(), D = d(E), O = (t) => {
		var n = b(), r = d(n);
		g(r, () => a.child, () => ({ props: e(T) })), u(t, n);
	}, k = (t) => {
		var n = oe();
		m(n, () => ({ ...e(T) }));
		var r = _(n);
		g(r, () => a.children ?? f), v(n), u(t, n);
	};
	s(D, (e) => {
		a.child ? e(O) : e(k, -1);
	}), u(i, E), r();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/dialog/components/dialog-description.svelte
var ce = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"children",
	"child",
	"ref"
]), le = a("<div><!></div>");
function ue(i, a) {
	let c = n();
	o(a, !0);
	let h = l(a, "id", 19, () => P(c)), y = l(a, "ref", 15, null), x = p(a, ce), S = q.create({
		id: w(() => h()),
		ref: w(() => y(), (e) => y(e))
	}), C = t(() => N(x, S.props));
	var T = b(), E = d(T), D = (t) => {
		var n = b(), r = d(n);
		g(r, () => a.child, () => ({ props: e(C) })), u(t, n);
	}, O = (t) => {
		var n = le();
		m(n, () => ({ ...e(C) }));
		var r = _(n);
		g(r, () => a.children ?? f), v(n), u(t, n);
	};
	s(E, (e) => {
		a.child ? e(D) : e(O, -1);
	}), u(i, T), r();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/dialog/components/dialog.svelte
function de(e, t) {
	o(t, !0);
	let n = l(t, "open", 15, !1), i = l(t, "onOpenChange", 3, F), a = l(t, "onOpenChangeComplete", 3, F);
	U.create({
		variant: w(() => "dialog"),
		open: w(() => n(), (e) => {
			n(e), i()(e);
		}),
		onOpenChangeComplete: w(() => a())
	});
	var s = b(), c = d(s);
	g(c, () => t.children ?? f), u(e, s), r();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/dialog/components/dialog-close.svelte
var fe = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"disabled"
]), pe = a("<button><!></button>");
function me(i, a) {
	let c = n();
	o(a, !0);
	let h = l(a, "id", 19, () => P(c)), y = l(a, "ref", 15, null), x = l(a, "disabled", 3, !1), S = p(a, fe), C = G.create({
		variant: w(() => "close"),
		id: w(() => h()),
		ref: w(() => y(), (e) => y(e)),
		disabled: w(() => !!x())
	}), T = t(() => N(S, C.props));
	var E = b(), D = d(E), O = (t) => {
		var n = b(), r = d(n);
		g(r, () => a.child, () => ({ props: e(T) })), u(t, n);
	}, k = (t) => {
		var n = pe();
		m(n, () => ({ ...e(T) }));
		var r = _(n);
		g(r, () => a.children ?? f), v(n), u(t, n);
	};
	s(D, (e) => {
		a.child ? e(O) : e(k, -1);
	}), u(i, E), r();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/dialog/components/dialog-content.svelte
var he = /* @__PURE__ */ new Set([
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
	"preventOverflowTextSelection",
	"restoreScrollDelay"
]), ge = a("<!> <!>", 1), _e = a("<!> <div><!></div>", 1);
function ve(i, a) {
	let c = n();
	o(a, !0);
	let x = l(a, "id", 19, () => P(c)), S = l(a, "ref", 15, null), C = l(a, "forceMount", 3, !1), T = l(a, "onCloseAutoFocus", 3, F), E = l(a, "onOpenAutoFocus", 3, F), D = l(a, "onEscapeKeydown", 3, F), O = l(a, "onInteractOutside", 3, F), k = l(a, "trapFocus", 3, !0), A = l(a, "preventScroll", 3, !0), j = l(a, "preventOverflowTextSelection", 3, !0), M = l(a, "restoreScrollDelay", 3, null), I = p(a, he), L = J.create({
		id: w(() => x()),
		ref: w(() => S(), (e) => S(e))
	}), V = t(() => N(I, L.props));
	var H = b(), U = d(H), W = (n) => {
		z(n, {
			get ref() {
				return L.opts.ref;
			},
			loop: !0,
			get trapFocus() {
				return k();
			},
			get enabled() {
				return L.root.opts.open.current;
			},
			get onOpenAutoFocus() {
				return E();
			},
			get onCloseAutoFocus() {
				return T();
			},
			focusScope: (n, r) => {
				let i = () => (r?.()).props;
				R(n, h(() => e(V), {
					get enabled() {
						return L.root.opts.open.current;
					},
					get ref() {
						return L.opts.ref;
					},
					onEscapeKeydown: (e) => {
						D()(e), !e.defaultPrevented && L.root.handleClose();
					},
					children: (n, r) => {
						ee(n, h(() => e(V), {
							get ref() {
								return L.opts.ref;
							},
							get enabled() {
								return L.root.opts.open.current;
							},
							onInteractOutside: (e) => {
								O()(e), !e.defaultPrevented && L.root.handleClose();
							},
							children: (n, r) => {
								te(n, h(() => e(V), {
									get preventOverflowTextSelection() {
										return j();
									},
									get ref() {
										return L.opts.ref;
									},
									get enabled() {
										return L.root.opts.open.current;
									},
									children: (n, r) => {
										var o = b(), c = d(o), l = (n) => {
											var r = ge(), o = d(r), c = (e) => {
												B(e, {
													get preventScroll() {
														return A();
													},
													get restoreScrollDelay() {
														return M();
													}
												});
											};
											s(o, (e) => {
												L.root.opts.open.current && e(c);
											});
											var l = y(o, 2);
											{
												let n = t(() => ({
													props: N(e(V), i()),
													...L.snippetProps
												}));
												g(l, () => a.child, () => e(n));
											}
											u(n, r);
										}, p = (t) => {
											var n = _e(), r = d(n);
											B(r, { get preventScroll() {
												return A();
											} });
											var o = y(r, 2);
											m(o, (e) => ({ ...e }), [() => N(e(V), i())]);
											var s = _(o);
											g(s, () => a.children ?? f), v(o), u(t, n);
										};
										s(c, (e) => {
											a.child ? e(l) : e(p, -1);
										}), u(n, o);
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
	s(U, (e) => {
		(L.shouldRender || C()) && e(W);
	}), u(i, H), r();
}
//#endregion
//#region ../ui/src/lib/components/dialog/dialog-content.svelte
var ye = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function be(n, a) {
	o(a, !0);
	let s = p(a, ye);
	var c = b(), l = d(c);
	{
		let n = t(() => S("fixed top-1/2 left-1/2 z-50 w-full max-w-[94%] origin-center -translate-x-1/2 -translate-y-1/2 outline-none sm:max-w-[490px]", "data-[state=closed]:animate-out data-[state=closed]:fill-mode-forwards data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", a.class));
		i(l, () => ve, (t, r) => {
			r(t, h(() => s, {
				get class() {
					return e(n);
				},
				children: (e, t) => {
					var n = b(), r = d(n);
					g(r, () => a.children ?? f), u(e, n);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	u(n, c), r();
}
//#endregion
//#region ../ui/src/lib/components/dialog/dialog-overlay.svelte
var $ = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"class"
]);
function xe(n, a) {
	o(a, !0);
	let s = p(a, $);
	var c = b(), l = d(c);
	{
		let n = t(() => S("fixed inset-0 z-50 bg-black/50", "data-[state=closed]:animate-out data-[state=closed]:fill-mode-forwards data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", a.class));
		i(l, () => ie, (t, r) => {
			r(t, h(() => s, { get class() {
				return e(n);
			} }));
		});
	}
	u(n, c), r();
}
//#endregion
//#region ../ui/src/lib/components/dialog/index.ts
var Se = de, Ce = L, we = Q, Te = ue, Ee = me, De = se;
//#endregion
export { we as a, be as c, Se as i, Te as n, De as o, Ce as r, xe as s, Ee as t };
