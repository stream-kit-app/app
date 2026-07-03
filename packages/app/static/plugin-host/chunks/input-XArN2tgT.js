import { a as e, i as t, t as n } from "./codemirror-BxTUMHxE.js";
import { $ as r, $n as i, Ct as a, Dt as o, E as s, G as c, Gn as l, Hr as u, Jr as d, Kn as f, Mn as p, Nn as m, On as h, Q as g, Qn as _, Qr as v, Qt as y, Sr as b, Vr as x, Wn as S, Xt as C, Yt as w, Z as T, Zn as E, Zr as D, _t as O, a as k, at as A, bn as j, cn as M, cr as N, dt as P, hn as F, jt as I, ln as L, lr as R, m as z, mn as B, ni as V, nr as H, o as U, on as W, or as G, pr as K, pt as q, s as J, un as Y, ut as ee, vn as X, xn as te, yn as ne, zn as re } from "./client-xxWnFgeR.js";
import { i as ie, n as ae, o as oe, r as se, s as ce, t as le } from "./dist-7Fg9me4U.js";
import "./disclose-version-YhYaTdgb.js";
import { t as Z } from "./Icon-AeqJGRQj.js";
import "./index-client-DLfVeyOI.js";
import { t as Q } from "./utils-DJt177zd.js";
import { C as ue, D as $, _ as de, a as fe, c as pe, d as me, g as he, i as ge, l as _e, n as ve, o as ye, r as be, s as xe, u as Se, v as Ce, x as we } from "./animations-complete-DIfTLR5k.js";
import { _ as Te, b as Ee, g as De, h as Oe, m as ke, v as Ae, y as je } from "./scroll-lock-D1Tuqnfh.js";
import { i as Me, n as Ne, r as Pe, t as Fe } from "./use-id-Bt59AMw7.js";
import { a as Ie, c as Le, d as Re, f as ze, h as Be, l as Ve, m as He, o as Ue, p as We, s as Ge, u as Ke } from "./command-CsCkrX8I.js";
import { t as qe } from "./on-mount-effect.svelte-DC0q3mG7.js";
import { _ as Je, a as Ye, d as Xe, f as Ze, g as Qe, h as $e, i as et, l as tt, m as nt, o as rt, p as it, r as at, s as ot, u as st, v as ct } from "./dom-DDAYniBq.js";
import { a as lt, o as ut, t as dt } from "./presence-manager.svelte-BT16ak7n.js";
import { a as ft, c as pt, i as mt, n as ht, r as gt, s as _t } from "./dialog-Zv6CFXxd.js";
import { t as vt } from "./portal-DdQWXgwe.js";
import "./legacy-CT5GbYa1.js";
import { a as yt, n as bt, r as xt, t as St } from "./popper-layer-force-mount-D_AeqjY4.js";
import { t as Ct } from "./floating-layer-anchor-B9kmoRsK.js";
import { i as wt, n as Tt, r as Et } from "./popover-R36Uj5QS.js";
import { t as Dt } from "./scroll-area-DfN4AV73.js";
import { t as Ot } from "./button-BmdXJB1F.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/checkbox/checkbox.svelte.js
var kt = ye({
	component: "checkbox",
	parts: [
		"root",
		"group",
		"group-label",
		"input"
	]
}), At = new ue("Checkbox.Group"), jt = new ue("Checkbox.Root"), Mt = class e {
	static create(t, n = null) {
		return jt.set(new e(t, n));
	}
	opts;
	group;
	#e = K(() => this.group && this.group.opts.name.current ? this.group.opts.name.current : this.opts.name.current);
	get trueName() {
		return h(this.#e);
	}
	set trueName(e) {
		G(this.#e, e);
	}
	#t = K(() => this.group && this.group.opts.required.current ? !0 : this.opts.required.current);
	get trueRequired() {
		return h(this.#t);
	}
	set trueRequired(e) {
		G(this.#t, e);
	}
	#n = K(() => this.group && this.group.opts.disabled.current ? !0 : this.opts.disabled.current);
	get trueDisabled() {
		return h(this.#n);
	}
	set trueDisabled(e) {
		G(this.#n, e);
	}
	#r = K(() => this.group && this.group.opts.readonly.current ? !0 : this.opts.readonly.current);
	get trueReadonly() {
		return h(this.#r);
	}
	set trueReadonly(e) {
		G(this.#r, e);
	}
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = me(this.opts.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this), we.pre([() => d(this.group?.opts.value.current), () => this.opts.value.current], ([e, t]) => {
			!e || !t || (this.opts.checked.current = e.includes(t));
		}), we.pre(() => this.opts.checked.current, (e) => {
			this.group && (e ? this.group?.addValue(this.opts.value.current) : this.group?.removeValue(this.opts.value.current));
		});
	}
	onkeydown(e) {
		if (!(this.trueDisabled || this.trueReadonly)) {
			if (e.key === "Enter") {
				e.preventDefault(), this.opts.type.current === "submit" && e.currentTarget.closest("form")?.requestSubmit();
				return;
			}
			e.key === " " && (e.preventDefault(), this.#i());
		}
	}
	#i() {
		this.opts.indeterminate.current ? (this.opts.indeterminate.current = !1, this.opts.checked.current = !0) : this.opts.checked.current = !this.opts.checked.current;
	}
	onclick(e) {
		if (!(this.trueDisabled || this.trueReadonly)) {
			if (this.opts.type.current === "submit") {
				this.#i();
				return;
			}
			e.preventDefault(), this.#i();
		}
	}
	#a = K(() => ({
		checked: this.opts.checked.current,
		indeterminate: this.opts.indeterminate.current
	}));
	get snippetProps() {
		return h(this.#a);
	}
	set snippetProps(e) {
		G(this.#a, e);
	}
	#o = K(() => ({
		id: this.opts.id.current,
		role: "checkbox",
		type: this.opts.type.current,
		disabled: this.trueDisabled,
		"aria-checked": xe(this.opts.checked.current, this.opts.indeterminate.current),
		"aria-required": be(this.trueRequired),
		"aria-readonly": be(this.trueReadonly),
		"data-disabled": ve(this.trueDisabled),
		"data-readonly": ve(this.trueReadonly),
		"data-state": Pt(this.opts.checked.current, this.opts.indeterminate.current),
		[kt.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return h(this.#o);
	}
	set props(e) {
		G(this.#o, e);
	}
}, Nt = class e {
	static create() {
		return new e(jt.get());
	}
	root;
	#e = K(() => this.root.group ? !!(this.root.opts.value.current !== void 0 && this.root.group.opts.value.current.includes(this.root.opts.value.current)) : this.root.opts.checked.current);
	get trueChecked() {
		return h(this.#e);
	}
	set trueChecked(e) {
		G(this.#e, e);
	}
	#t = K(() => !!this.root.trueName);
	get shouldRender() {
		return h(this.#t);
	}
	set shouldRender(e) {
		G(this.#t, e);
	}
	constructor(e) {
		this.root = e, this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		lt(this.root.opts.ref.current) && this.root.opts.ref.current.focus();
	}
	#n = K(() => ({
		type: "checkbox",
		checked: this.root.opts.checked.current === !0,
		disabled: this.root.trueDisabled,
		required: this.root.trueRequired,
		name: this.root.trueName,
		value: this.root.opts.value.current,
		readonly: this.root.trueReadonly,
		onfocus: this.onfocus
	}));
	get props() {
		return h(this.#n);
	}
	set props(e) {
		G(this.#n, e);
	}
};
function Pt(e, t) {
	return t ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/hidden-input.svelte
var Ft = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value"
]), It = Y("<input/>");
function Lt(e, t) {
	u(t, !0);
	let n = k(t, "value", 15), r = U(t, Ft), i = K(() => Me(r, {
		"aria-hidden": "true",
		tabindex: -1,
		style: {
			...Be,
			position: "absolute",
			top: "0",
			left: "0"
		}
	}));
	var a = L(), o = _(a), s = (e) => {
		var t = It();
		T(t, () => ({
			...h(i),
			value: n()
		}), void 0, void 0, void 0, void 0, !0), M(e, t);
	}, l = (e) => {
		var t = It();
		T(t, () => ({ ...h(i) }), void 0, void 0, void 0, void 0, !0), c(t, n), M(e, t);
	};
	I(o, (e) => {
		h(i).type === "checkbox" ? e(s) : e(l, -1);
	}), M(e, a), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/checkbox/components/checkbox-input.svelte
function Rt(e, t) {
	u(t, !1);
	let n = Nt.create();
	z();
	var r = L(), i = _(r), a = (e) => {
		Lt(e, J(() => n.props));
	};
	I(i, (e) => {
		n.shouldRender && e(a);
	}), M(e, r), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/checkbox/components/checkbox.svelte
var zt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"checked",
	"ref",
	"onCheckedChange",
	"children",
	"disabled",
	"required",
	"name",
	"value",
	"id",
	"indeterminate",
	"onIndeterminateChange",
	"child",
	"type",
	"readonly"
]), Bt = Y("<button><!></button>"), Vt = Y("<!> <!>", 1);
function Ht(e, t) {
	let n = B();
	u(t, !0);
	let r = k(t, "checked", 15, !1), a = k(t, "ref", 15, null), o = k(t, "disabled", 3, !1), s = k(t, "required", 3, !1), c = k(t, "name", 3, void 0), l = k(t, "value", 3, "on"), d = k(t, "id", 19, () => Ne(n)), f = k(t, "indeterminate", 15, !1), p = k(t, "type", 3, "button"), m = U(t, zt), g = At.getOr(null);
	g && l() && (g.opts.value.current.includes(l()) ? r(!0) : r(!1)), we.pre(() => l(), () => {
		g && l() && (g.opts.value.current.includes(l()) ? r(!0) : r(!1));
	});
	let b = Mt.create({
		checked: $(() => r(), (e) => {
			r(e), t.onCheckedChange?.(e);
		}),
		disabled: $(() => o() ?? !1),
		required: $(() => s()),
		name: $(() => c()),
		value: $(() => l()),
		id: $(() => d()),
		ref: $(() => a(), (e) => a(e)),
		indeterminate: $(() => f(), (e) => {
			f(e), t.onIndeterminateChange?.(e);
		}),
		type: $(() => p()),
		readonly: $(() => !!t.readonly)
	}, g), S = K(() => Me({ ...m }, b.props));
	var C = Vt(), w = _(C), D = (e) => {
		var n = L(), r = _(n);
		{
			let e = K(() => ({
				props: h(S),
				...b.snippetProps
			}));
			y(r, () => t.child, () => h(e));
		}
		M(e, n);
	}, O = (e) => {
		var n = Bt();
		T(n, () => ({ ...h(S) })), y(E(n), () => t.children ?? V, () => b.snippetProps), v(n), M(e, n);
	};
	I(w, (e) => {
		t.child ? e(D) : e(O, -1);
	}), Rt(i(w, 2), {}), M(e, C), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/data-typeahead.svelte.js
var Ut = class {
	#e;
	#t = K(() => this.#e.candidateValues());
	#n;
	constructor(e) {
		this.#e = e, this.#n = Oe("", {
			afterMs: 1e3,
			getWindow: this.#e.getWindow
		}), this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this), this.resetTypeahead = this.resetTypeahead.bind(this);
	}
	handleTypeaheadSearch(e) {
		if (!this.#e.enabled() || !h(this.#t).length) return;
		this.#n.current = this.#n.current + e;
		let t = this.#e.getCurrentItem(), n = h(this.#t).find((e) => e === t) ?? "", r = Ae(h(this.#t).map((e) => e ?? ""), this.#n.current, n), i = h(this.#t).find((e) => e === r);
		return i && this.#e.onMatch(i), i;
	}
	resetTypeahead() {
		this.#n.current = "";
	}
}, Wt = [
	Ye,
	Ze,
	rt,
	Je,
	tt,
	st,
	"Alt",
	nt,
	Xe,
	"F1",
	"F2",
	"F3",
	"F4",
	"F5",
	"F6",
	"F7",
	"F8",
	"F9",
	"F10",
	"F11",
	"F12"
], Gt = [
	et,
	Qe,
	it
], Kt = [
	ot,
	$e,
	"End"
], qt = [...Gt, ...Kt], Jt = ye({
	component: "select",
	parts: [
		"trigger",
		"content",
		"item",
		"viewport",
		"scroll-up-button",
		"scroll-down-button",
		"group",
		"group-label",
		"separator",
		"arrow",
		"input",
		"content-wrapper",
		"item-text",
		"value"
	]
}), Yt = new ue("Select.Root | Combobox.Root");
new ue("Select.Group | Combobox.Group");
var Xt = new ue("Select.Content | Combobox.Content"), Zt = class {
	opts;
	#e = N(!1);
	get touchedInput() {
		return h(this.#e);
	}
	set touchedInput(e) {
		G(this.#e, e, !0);
	}
	#t = N(null);
	get inputNode() {
		return h(this.#t);
	}
	set inputNode(e) {
		G(this.#t, e, !0);
	}
	#n = N(null);
	get contentNode() {
		return h(this.#n);
	}
	set contentNode(e) {
		G(this.#n, e, !0);
	}
	contentPresence;
	#r = N(null);
	get viewportNode() {
		return h(this.#r);
	}
	set viewportNode(e) {
		G(this.#r, e, !0);
	}
	#i = N(null);
	get triggerNode() {
		return h(this.#i);
	}
	set triggerNode(e) {
		G(this.#i, e, !0);
	}
	#a = N(null);
	get valueNode() {
		return h(this.#a);
	}
	set valueNode(e) {
		G(this.#a, e, !0);
	}
	#o = N("");
	get valueId() {
		return h(this.#o);
	}
	set valueId(e) {
		G(this.#o, e, !0);
	}
	#s = N(null);
	get highlightedNode() {
		return h(this.#s);
	}
	set highlightedNode(e) {
		G(this.#s, e, !0);
	}
	#c = K(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-value") : null);
	get highlightedValue() {
		return h(this.#c);
	}
	set highlightedValue(e) {
		G(this.#c, e);
	}
	#l = K(() => {
		if (this.highlightedNode) return this.highlightedNode.id;
	});
	get highlightedId() {
		return h(this.#l);
	}
	set highlightedId(e) {
		G(this.#l, e);
	}
	#u = K(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-label") : null);
	get highlightedLabel() {
		return h(this.#u);
	}
	set highlightedLabel(e) {
		G(this.#u, e);
	}
	#d = N(!1);
	get contentIsPositioned() {
		return h(this.#d);
	}
	set contentIsPositioned(e) {
		G(this.#d, e, !0);
	}
	isUsingKeyboard = !1;
	isCombobox = !1;
	domContext = new Pe(() => null);
	constructor(e) {
		this.opts = e, this.isCombobox = e.isCombobox, this.contentPresence = new dt({
			ref: $(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), f(() => {
			this.opts.open.current || this.setHighlightedNode(null);
		});
	}
	setHighlightedNode(e, t = !1) {
		this.highlightedNode = e, e && (this.isUsingKeyboard || t) && this.scrollHighlightedNodeIntoView(e);
	}
	scrollHighlightedNodeIntoView(e) {
		!this.viewportNode || !this.contentIsPositioned || e.scrollIntoView({ block: this.opts.scrollAlignment.current });
	}
	getCandidateNodes() {
		let e = this.contentNode;
		return e ? Array.from(e.querySelectorAll(`[${this.getBitsAttr("item")}]:not([data-disabled])`)) : [];
	}
	setHighlightedToFirstCandidate(e = !1) {
		this.setHighlightedNode(null);
		let t = this.getCandidateNodes();
		if (t.length) {
			if (this.viewportNode) {
				let e = this.viewportNode.getBoundingClientRect();
				t = t.filter((t) => {
					if (!this.viewportNode) return !1;
					let n = t.getBoundingClientRect();
					return n.right <= e.right && n.left >= e.left && n.bottom <= e.bottom && n.top >= e.top;
				});
			}
			this.setHighlightedNode(t[0], e);
		}
	}
	getNodeByValue(e) {
		return this.getCandidateNodes().find((t) => t.dataset.value === e) ?? null;
	}
	getLabelForValue(e) {
		if (e === "") return "";
		let t = this.opts.items.current.find((t) => t.value === e)?.label;
		if (t !== void 0) return t;
		let n = this.getNodeByValue(e);
		if (n) {
			let t = n.getAttribute("data-label");
			return t !== null && t !== "" ? t : n.textContent?.trim() ?? e;
		}
		return e;
	}
	setOpen(e) {
		this.opts.open.current = e;
	}
	toggleOpen() {
		this.opts.open.current = !this.opts.open.current;
	}
	handleOpen() {
		this.setOpen(!0);
	}
	handleClose() {
		this.setHighlightedNode(null), this.setOpen(!1);
	}
	toggleMenu() {
		this.toggleOpen();
	}
	getBitsAttr = (e) => Jt.getAttr(e, this.isCombobox ? "combobox" : void 0);
}, Qt = class extends Zt {
	opts;
	isMulti = !1;
	#e = K(() => this.opts.value.current !== "");
	get hasValue() {
		return h(this.#e);
	}
	set hasValue(e) {
		G(this.#e, e);
	}
	#t = K(() => this.opts.items.current.length ? this.opts.items.current.find((e) => e.value === this.opts.value.current)?.label ?? "" : "");
	get currentLabel() {
		return h(this.#t);
	}
	set currentLabel(e) {
		G(this.#t, e);
	}
	#n = K(() => this.opts.items.current.length ? this.opts.items.current.filter((e) => !e.disabled).map((e) => e.label) : []);
	get candidateLabels() {
		return h(this.#n);
	}
	set candidateLabels(e) {
		G(this.#n, e);
	}
	#r = K(() => !(this.isMulti || this.opts.items.current.length === 0));
	get dataTypeaheadEnabled() {
		return h(this.#r);
	}
	set dataTypeaheadEnabled(e) {
		G(this.#r, e);
	}
	constructor(e) {
		super(e), this.opts = e, l(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), we(() => this.opts.open.current, () => {
			this.opts.open.current && this.setInitialHighlightedNode();
		});
	}
	includesItem(e) {
		return this.opts.value.current === e;
	}
	toggleItem(e, t = e) {
		let n = this.includesItem(e) ? "" : e;
		this.opts.value.current = n, n !== "" && (this.opts.inputValue.current = t);
	}
	setInitialHighlightedNode() {
		he(() => {
			if (!(this.highlightedNode && this.domContext.getDocument().contains(this.highlightedNode))) {
				if (this.opts.value.current !== "") {
					let e = this.getNodeByValue(this.opts.value.current);
					if (e) {
						this.setHighlightedNode(e, !0);
						return;
					}
				}
				this.setHighlightedToFirstCandidate(!0);
			}
		});
	}
}, $t = class extends Zt {
	opts;
	isMulti = !0;
	#e = K(() => this.opts.value.current.length > 0);
	get hasValue() {
		return h(this.#e);
	}
	set hasValue(e) {
		G(this.#e, e);
	}
	constructor(e) {
		super(e), this.opts = e, l(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), we(() => this.opts.open.current, () => {
			this.opts.open.current && this.setInitialHighlightedNode();
		});
	}
	includesItem(e) {
		return this.opts.value.current.includes(e);
	}
	toggleItem(e, t = e) {
		this.includesItem(e) ? this.opts.value.current = this.opts.value.current.filter((t) => t !== e) : this.opts.value.current = [...this.opts.value.current, e], this.opts.inputValue.current = t;
	}
	setInitialHighlightedNode() {
		he(() => {
			if (this.domContext && !(this.highlightedNode && this.domContext.getDocument().contains(this.highlightedNode))) {
				if (this.opts.value.current.length && this.opts.value.current[0] !== "") {
					let e = this.getNodeByValue(this.opts.value.current[0]);
					if (e) {
						this.setHighlightedNode(e, !0);
						return;
					}
				}
				this.setHighlightedToFirstCandidate(!0);
			}
		});
	}
}, en = class {
	static create(e) {
		let { type: t, ...n } = e, r = t === "single" ? new Qt(n) : new $t(n);
		return Yt.set(r);
	}
}, tn = class e {
	static create(t) {
		return new e(t, Yt.get());
	}
	root;
	opts;
	attachment;
	constructor(e, t) {
		this.root = t, this.opts = e, this.attachment = me(e.ref, (e) => this.root.valueNode = e), this.setValue = this.setValue.bind(this);
	}
	setValue(e) {
		this.root.isMulti && !Array.isArray(e) || !this.root.isMulti && typeof e != "string" || (this.root.opts.value.current = e);
	}
	#e = K(() => {
		if (this.root.isMulti) return {
			selection: {
				type: "multiple",
				selected: this.root.opts.value.current.length > 0 ? this.root.opts.value.current.map((e) => ({
					value: e,
					label: this.root.getLabelForValue(e)
				})) : [],
				setValue: this.setValue
			},
			placeholder: this.opts.placeholder.current ?? null,
			disabled: this.root.opts.disabled.current
		};
		let e = this.root.opts.value.current;
		return {
			selection: {
				type: "single",
				selected: e === "" ? void 0 : {
					value: e,
					label: e === "" ? "" : this.root.getLabelForValue(e)
				},
				setValue: this.setValue
			},
			placeholder: this.opts.placeholder.current ?? null,
			disabled: this.root.opts.disabled.current
		};
	});
	get snippetProps() {
		return h(this.#e);
	}
	set snippetProps(e) {
		G(this.#e, e);
	}
	#t = K(() => ({
		id: this.opts.id.current,
		"data-placeholder": this.root.hasValue ? void 0 : "",
		"data-select-value": "",
		...this.attachment
	}));
	get props() {
		return h(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, nn = class e {
	static create(t) {
		return new e(t, Yt.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = me(e.ref, (e) => this.root.inputNode = e), this.root.domContext = new Pe(e.ref), this.onkeydown = this.onkeydown.bind(this), this.oninput = this.oninput.bind(this), we([() => this.root.opts.value.current, () => this.opts.clearOnDeselect.current], ([e, t], [n]) => {
			t && (Array.isArray(e) && Array.isArray(n) ? e.length === 0 && n.length !== 0 && (this.root.opts.inputValue.current = "") : e === "" && n !== "" && (this.root.opts.inputValue.current = ""));
		});
	}
	onkeydown(e) {
		if (this.root.isUsingKeyboard = !0, e.key !== "Escape") {
			if ((e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault(), !this.root.opts.open.current) {
				if (Wt.includes(e.key) || e.key === "Tab" || e.key === "Backspace" && this.root.opts.inputValue.current === "" || (this.root.handleOpen(), this.root.hasValue)) return;
				let t = this.root.getCandidateNodes();
				if (!t.length) return;
				if (e.key === "ArrowDown") {
					let e = t[0];
					this.root.setHighlightedNode(e);
				} else if (e.key === "ArrowUp") {
					let e = t[t.length - 1];
					this.root.setHighlightedNode(e);
				}
				return;
			}
			if (e.key === "Tab") {
				this.root.handleClose();
				return;
			}
			if (e.key === "Enter" && !e.isComposing) {
				e.preventDefault();
				let t = this.root.highlightedValue === this.root.opts.value.current;
				if (!this.root.opts.allowDeselect.current && t && !this.root.isMulti) {
					this.root.handleClose();
					return;
				}
				this.root.highlightedValue && this.root.highlightedNode && this.root.highlightedNode.isConnected && this.root.toggleItem(this.root.highlightedValue, this.root.highlightedLabel ?? void 0), !this.root.isMulti && !t && this.root.handleClose();
			}
			if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), qt.includes(e.key)) {
				e.preventDefault();
				let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
				if (e.key === "ArrowDown" ? a = je(t, r, i) : e.key === "ArrowUp" ? a = Ee(t, r, i) : e.key === "PageDown" ? a = Te(t, r, 10, i) : e.key === "PageUp" ? a = De(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
				this.root.setHighlightedNode(a);
				return;
			}
			Wt.includes(e.key) || this.root.highlightedNode || this.root.setHighlightedToFirstCandidate();
		}
	}
	oninput(e) {
		this.root.opts.inputValue.current = e.currentTarget.value, this.root.setHighlightedToFirstCandidate();
	}
	#e = K(() => ({
		id: this.opts.id.current,
		role: "combobox",
		disabled: this.root.opts.disabled.current ? !0 : void 0,
		"aria-activedescendant": this.root.highlightedId,
		"aria-autocomplete": "list",
		"aria-expanded": be(this.root.opts.open.current),
		"data-state": _e(this.root.opts.open.current),
		"data-disabled": ve(this.root.opts.disabled.current),
		onkeydown: this.onkeydown,
		oninput: this.oninput,
		[this.root.getBitsAttr("input")]: "",
		...this.attachment
	}));
	get props() {
		return h(this.#e);
	}
	set props(e) {
		G(this.#e, e);
	}
}, rn = class e {
	static create(t) {
		return new e(t, Yt.get());
	}
	opts;
	root;
	attachment;
	#e;
	#t;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = me(e.ref, (e) => this.root.triggerNode = e), this.root.domContext = new Pe(e.ref), this.#e = new ke({
			getCurrentItem: () => this.root.highlightedNode,
			onMatch: (e) => {
				this.root.setHighlightedNode(e);
			},
			getActiveElement: () => this.root.domContext.getActiveElement(),
			getWindow: () => this.root.domContext.getWindow()
		}), this.#t = new Ut({
			getCurrentItem: () => this.root.isMulti ? "" : this.root.currentLabel,
			onMatch: (e) => {
				if (this.root.isMulti || !this.root.opts.items.current) return;
				let t = this.root.opts.items.current.find((t) => t.label === e);
				t && (this.root.opts.value.current = t.value);
			},
			enabled: () => !this.root.isMulti && this.root.dataTypeaheadEnabled,
			candidateValues: () => this.root.isMulti ? [] : this.root.candidateLabels,
			getWindow: () => this.root.domContext.getWindow()
		}), this.onkeydown = this.onkeydown.bind(this), this.onpointerdown = this.onpointerdown.bind(this), this.onpointerup = this.onpointerup.bind(this), this.onclick = this.onclick.bind(this);
	}
	#n() {
		this.root.opts.open.current = !0, this.#t.resetTypeahead(), this.#e.resetTypeahead();
	}
	#r(e) {
		this.#n();
	}
	#i() {
		let e = this.root.highlightedValue === this.root.opts.value.current;
		return !this.root.opts.allowDeselect.current && e && !this.root.isMulti || (this.root.highlightedValue !== null && this.root.toggleItem(this.root.highlightedValue, this.root.highlightedLabel ?? void 0), !this.root.isMulti && !e) ? (this.root.handleClose(), !0) : !1;
	}
	onkeydown(e) {
		if (this.root.isUsingKeyboard = !0, (e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault(), !this.root.opts.open.current) {
			if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") e.preventDefault(), this.root.handleOpen();
			else if (!this.root.isMulti && this.root.dataTypeaheadEnabled) {
				this.#t.handleTypeaheadSearch(e.key);
				return;
			}
			if (this.root.hasValue) return;
			let t = this.root.getCandidateNodes();
			if (!t.length) return;
			if (e.key === "ArrowDown") {
				let e = t[0];
				this.root.setHighlightedNode(e);
			} else if (e.key === "ArrowUp") {
				let e = t[t.length - 1];
				this.root.setHighlightedNode(e);
			}
			return;
		}
		if (e.key === "Tab") {
			this.root.handleClose();
			return;
		}
		if ((e.key === "Enter" || e.key === " " && this.#e.search === "") && !e.isComposing && (e.preventDefault(), this.#i())) return;
		if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), qt.includes(e.key)) {
			e.preventDefault();
			let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
			if (e.key === "ArrowDown" ? a = je(t, r, i) : e.key === "ArrowUp" ? a = Ee(t, r, i) : e.key === "PageDown" ? a = Te(t, r, 10, i) : e.key === "PageUp" ? a = De(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
			this.root.setHighlightedNode(a);
			return;
		}
		let t = e.ctrlKey || e.altKey || e.metaKey, n = e.key.length === 1, r = e.key === " ", i = this.root.getCandidateNodes();
		if (e.key !== "Tab") {
			if (!t && (n || r)) {
				!this.#e.handleTypeaheadSearch(e.key, i) && r && (e.preventDefault(), this.#i());
				return;
			}
			this.root.highlightedNode || this.root.setHighlightedToFirstCandidate();
		}
	}
	onclick(e) {
		e.currentTarget.focus();
	}
	onpointerdown(e) {
		if (this.root.opts.disabled.current) return;
		if (e.pointerType === "touch") return e.preventDefault();
		let t = e.target;
		t?.hasPointerCapture(e.pointerId) && t?.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && (this.root.opts.open.current === !1 ? this.#r(e) : this.root.handleClose());
	}
	onpointerup(e) {
		this.root.opts.disabled.current || (e.preventDefault(), e.pointerType === "touch" && (this.root.opts.open.current === !1 ? this.#r(e) : this.root.handleClose()));
	}
	#a = K(() => ({
		id: this.opts.id.current,
		disabled: this.root.opts.disabled.current ? !0 : void 0,
		"aria-haspopup": "listbox",
		"aria-expanded": be(this.root.opts.open.current),
		"aria-activedescendant": this.root.highlightedId,
		"data-state": _e(this.root.opts.open.current),
		"data-disabled": ve(this.root.opts.disabled.current),
		"data-placeholder": this.root.hasValue ? void 0 : "",
		[this.root.getBitsAttr("trigger")]: "",
		onpointerdown: this.onpointerdown,
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		onpointerup: this.onpointerup,
		...this.attachment
	}));
	get props() {
		return h(this.#a);
	}
	set props(e) {
		G(this.#a, e);
	}
}, an = class e {
	static create(t) {
		return Xt.set(new e(t, Yt.get()));
	}
	opts;
	root;
	attachment;
	#e = N(!1);
	get isPositioned() {
		return h(this.#e);
	}
	set isPositioned(e) {
		G(this.#e, e, !0);
	}
	domContext;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = me(e.ref, (e) => this.root.contentNode = e), this.domContext = new Pe(this.opts.ref), this.root.domContext === null && (this.root.domContext = this.domContext), de(() => {
			this.root.contentNode = null, this.root.contentIsPositioned = !1, this.isPositioned = !1;
		}), we(() => this.root.opts.open.current, () => {
			this.root.opts.open.current || (this.root.contentIsPositioned = !1, this.isPositioned = !1);
		}), we([() => this.isPositioned, () => this.root.highlightedNode], () => {
			!this.isPositioned || !this.root.highlightedNode || this.root.scrollHighlightedNodeIntoView(this.root.highlightedNode);
		}), this.onpointermove = this.onpointermove.bind(this);
	}
	onpointermove(e) {
		this.root.isUsingKeyboard = !1;
	}
	#t = K(() => yt(this.root.isCombobox ? "combobox" : "select"));
	onInteractOutside = (e) => {
		if (e.target === this.root.triggerNode || e.target === this.root.inputNode) {
			e.preventDefault();
			return;
		}
		this.opts.onInteractOutside.current(e), !e.defaultPrevented && this.root.handleClose();
	};
	onEscapeKeydown = (e) => {
		this.opts.onEscapeKeydown.current(e), !e.defaultPrevented && this.root.handleClose();
	};
	onOpenAutoFocus = (e) => {
		e.preventDefault();
	};
	onCloseAutoFocus = (e) => {
		e.preventDefault();
	};
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
	#n = K(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return h(this.#n);
	}
	set snippetProps(e) {
		G(this.#n, e);
	}
	#r = K(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-multiselectable": this.root.isMulti ? "true" : void 0,
		"data-state": _e(this.root.opts.open.current),
		...Se(this.root.contentPresence.transitionStatus),
		[this.root.getBitsAttr("content")]: "",
		style: {
			display: "flex",
			flexDirection: "column",
			outline: "none",
			boxSizing: "border-box",
			pointerEvents: "auto",
			...h(this.#t)
		},
		onpointermove: this.onpointermove,
		...this.attachment
	}));
	get props() {
		return h(this.#r);
	}
	set props(e) {
		G(this.#r, e);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown,
		onOpenAutoFocus: this.onOpenAutoFocus,
		onCloseAutoFocus: this.onCloseAutoFocus,
		trapFocus: !1,
		loop: !1,
		onPlaced: () => {
			this.root.opts.open.current && (this.root.contentIsPositioned = !0, this.isPositioned = !0);
		}
	};
}, on = class e {
	static create(t) {
		return new e(t, Yt.get());
	}
	opts;
	root;
	attachment;
	#e = K(() => this.root.includesItem(this.opts.value.current));
	get isSelected() {
		return h(this.#e);
	}
	set isSelected(e) {
		G(this.#e, e);
	}
	#t = K(() => this.root.highlightedValue === this.opts.value.current);
	get isHighlighted() {
		return h(this.#t);
	}
	set isHighlighted(e) {
		G(this.#t, e);
	}
	prevHighlighted = new Ce(() => this.isHighlighted);
	#n = N(!1);
	get mounted() {
		return h(this.#n);
	}
	set mounted(e) {
		G(this.#n, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = me(e.ref), we([() => this.isHighlighted, () => this.prevHighlighted.current], () => {
			this.isHighlighted ? this.opts.onHighlight.current() : this.prevHighlighted.current && this.opts.onUnhighlight.current();
		}), we(() => this.mounted, () => {
			this.mounted && this.root.setInitialHighlightedNode();
		}), this.onpointerdown = this.onpointerdown.bind(this), this.onpointerup = this.onpointerup.bind(this), this.onpointermove = this.onpointermove.bind(this);
	}
	handleSelect() {
		if (this.opts.disabled.current) return;
		let e = this.opts.value.current === this.root.opts.value.current;
		if (!this.root.opts.allowDeselect.current && e && !this.root.isMulti) {
			this.root.handleClose();
			return;
		}
		this.root.toggleItem(this.opts.value.current, this.opts.label.current), !this.root.isMulti && !e && this.root.handleClose();
	}
	#r = K(() => ({
		selected: this.isSelected,
		highlighted: this.isHighlighted
	}));
	get snippetProps() {
		return h(this.#r);
	}
	set snippetProps(e) {
		G(this.#r, e);
	}
	onpointerdown(e) {
		e.preventDefault();
	}
	onpointerup(e) {
		if (!(e.defaultPrevented || !this.opts.ref.current)) {
			if (e.pointerType === "touch" && !ut) {
				te(this.opts.ref.current, "click", () => {
					this.handleSelect(), this.root.setHighlightedNode(this.opts.ref.current);
				}, { once: !0 });
				return;
			}
			e.preventDefault(), this.handleSelect(), e.pointerType === "touch" && this.root.setHighlightedNode(this.opts.ref.current);
		}
	}
	onpointermove(e) {
		e.pointerType !== "touch" && this.root.highlightedNode !== this.opts.ref.current && this.root.setHighlightedNode(this.opts.ref.current);
	}
	#i = K(() => ({
		id: this.opts.id.current,
		role: "option",
		"aria-selected": this.root.includesItem(this.opts.value.current) ? "true" : void 0,
		"data-value": this.opts.value.current,
		"data-disabled": ve(this.opts.disabled.current),
		"data-highlighted": this.root.highlightedValue === this.opts.value.current && !this.opts.disabled.current ? "" : void 0,
		"data-selected": this.root.includesItem(this.opts.value.current) ? "" : void 0,
		"data-label": this.opts.label.current,
		[this.root.getBitsAttr("item")]: "",
		onpointermove: this.onpointermove,
		onpointerdown: this.onpointerdown,
		onpointerup: this.onpointerup,
		...this.attachment
	}));
	get props() {
		return h(this.#i);
	}
	set props(e) {
		G(this.#i, e);
	}
}, sn = class e {
	static create(t) {
		return new e(t, Yt.get());
	}
	opts;
	root;
	#e = K(() => this.root.opts.name.current !== "");
	get shouldRender() {
		return h(this.#e);
	}
	set shouldRender(e) {
		G(this.#e, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		e.preventDefault(), this.root.isCombobox ? this.root.inputNode?.focus() : this.root.triggerNode?.focus();
	}
	#t = K(() => ({
		disabled: fe(this.root.opts.disabled.current),
		required: fe(this.root.opts.required.current),
		name: this.root.opts.name.current,
		value: this.opts.value.current,
		onfocus: this.onfocus
	}));
	get props() {
		return h(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, cn = class e {
	static create(t) {
		return new e(t, Xt.get());
	}
	opts;
	content;
	root;
	attachment;
	#e = N(0);
	get prevScrollTop() {
		return h(this.#e);
	}
	set prevScrollTop(e) {
		G(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = me(e.ref, (e) => {
			this.root.viewportNode = e;
		});
	}
	#t = K(() => ({
		id: this.opts.id.current,
		role: "presentation",
		[this.root.getBitsAttr("viewport")]: "",
		style: {
			position: "relative",
			flex: 1,
			overflow: "auto"
		},
		...this.attachment
	}));
	get props() {
		return h(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, ln = class {
	opts;
	content;
	root;
	attachment;
	autoScrollTimer = null;
	userScrollTimer = -1;
	isUserScrolling = !1;
	onAutoScroll = at;
	#e = N(!1);
	get mounted() {
		return h(this.#e);
	}
	set mounted(e) {
		G(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = me(e.ref), we([() => this.mounted], () => {
			if (!this.mounted) {
				this.isUserScrolling = !1;
				return;
			}
			this.isUserScrolling;
		}), l(() => {
			this.mounted || this.clearAutoScrollInterval();
		}), this.onpointerdown = this.onpointerdown.bind(this), this.onpointermove = this.onpointermove.bind(this), this.onpointerleave = this.onpointerleave.bind(this);
	}
	handleUserScroll() {
		this.content.domContext.clearTimeout(this.userScrollTimer), this.isUserScrolling = !0, this.userScrollTimer = this.content.domContext.setTimeout(() => {
			this.isUserScrolling = !1;
		}, 200);
	}
	clearAutoScrollInterval() {
		this.autoScrollTimer !== null && (this.content.domContext.clearTimeout(this.autoScrollTimer), this.autoScrollTimer = null);
	}
	onpointerdown(e) {
		if (this.autoScrollTimer !== null) return;
		let t = (e) => {
			this.onAutoScroll(), this.autoScrollTimer = this.content.domContext.setTimeout(() => t(e + 1), this.opts.delay.current(e));
		};
		this.autoScrollTimer = this.content.domContext.setTimeout(() => t(1), this.opts.delay.current(0));
	}
	onpointermove(e) {
		this.onpointerdown(e);
	}
	onpointerleave(e) {
		this.clearAutoScrollInterval();
	}
	#t = K(() => ({
		id: this.opts.id.current,
		"aria-hidden": ge(!0),
		style: { flexShrink: 0 },
		onpointerdown: this.onpointerdown,
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		...this.attachment
	}));
	get props() {
		return h(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, un = class e {
	static create(t) {
		return new e(new ln(t, Xt.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = N(!1);
	get canScrollDown() {
		return h(this.#e);
	}
	set canScrollDown(e) {
		G(this.#e, e, !0);
	}
	scrollIntoViewTimer = null;
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, we([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), te(this.root.viewportNode, "scroll", () => this.handleScroll());
		}), we([
			() => this.root.opts.inputValue.current,
			() => this.root.viewportNode,
			() => this.content.isPositioned
		], () => {
			!this.root.viewportNode || !this.content.isPositioned || this.handleScroll(!0);
		}), we(() => this.scrollButtonState.mounted, () => {
			this.scrollButtonState.mounted && (this.scrollIntoViewTimer && clearTimeout(this.scrollIntoViewTimer), this.scrollIntoViewTimer = ct(5, () => {
				let e = this.root.highlightedNode;
				e && this.root.scrollHighlightedNodeIntoView(e);
			}));
		});
	}
	handleScroll = (e = !1) => {
		if (e || this.scrollButtonState.handleUserScroll(), !this.root.viewportNode) return;
		let t = this.root.viewportNode.scrollHeight - this.root.viewportNode.clientHeight, n = Number.parseInt(getComputedStyle(this.root.viewportNode).paddingTop, 10);
		this.canScrollDown = Math.ceil(this.root.viewportNode.scrollTop) < t - n;
	};
	handleAutoScroll = () => {
		let e = this.root.viewportNode, t = this.root.highlightedNode;
		!e || !t || (e.scrollTop += t.offsetHeight);
	};
	#t = K(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-down-button")]: ""
	}));
	get props() {
		return h(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, dn = class e {
	static create(t) {
		return new e(new ln(t, Xt.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = N(!1);
	get canScrollUp() {
		return h(this.#e);
	}
	set canScrollUp(e) {
		G(this.#e, e, !0);
	}
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, we([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), te(this.root.viewportNode, "scroll", () => this.handleScroll());
		});
	}
	handleScroll = (e = !1) => {
		if (e || this.scrollButtonState.handleUserScroll(), !this.root.viewportNode) return;
		let t = Number.parseInt(getComputedStyle(this.root.viewportNode).paddingTop, 10);
		this.canScrollUp = this.root.viewportNode.scrollTop - t > .1;
	};
	handleAutoScroll = () => {
		!this.root.viewportNode || !this.root.highlightedNode || (this.root.viewportNode.scrollTop = this.root.viewportNode.scrollTop - this.root.highlightedNode.offsetHeight);
	};
	#t = K(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-up-button")]: ""
	}));
	get props() {
		return h(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-hidden-input.svelte
function fn(e, t) {
	u(t, !0);
	let n = k(t, "value", 15), r = sn.create({ value: $(() => n()) });
	var i = L(), a = _(i), o = (e) => {
		Lt(e, J(() => r.props, {
			get autocomplete() {
				return t.autocomplete;
			},
			get value() {
				return n();
			},
			set value(e) {
				n(e);
			}
		}));
	};
	I(a, (e) => {
		r.shouldRender && e(o);
	}), M(e, i), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/combobox/components/combobox.svelte
var pn = Y("<!> <!>", 1);
function mn(e, t) {
	u(t, !0);
	let n = k(t, "value", 15), r = k(t, "onValueChange", 3, at), a = k(t, "name", 3, ""), s = k(t, "disabled", 3, !1), c = k(t, "open", 15, !1), l = k(t, "onOpenChange", 3, at), d = k(t, "onOpenChangeComplete", 3, at), f = k(t, "loop", 3, !1), p = k(t, "scrollAlignment", 3, "nearest"), m = k(t, "required", 3, !1), g = k(t, "items", 19, () => []), v = k(t, "allowDeselect", 3, !0), b = k(t, "inputValue", 7, "");
	n() === void 0 && n(t.type === "single" ? "" : []), we.pre(() => n(), () => {
		n() === void 0 && n(t.type === "single" ? "" : []);
	});
	let S = en.create({
		type: t.type,
		value: $(() => n(), (e) => {
			n(e), r()(e);
		}),
		disabled: $(() => s()),
		required: $(() => m()),
		open: $(() => c(), (e) => {
			c(e), l()(e);
		}),
		loop: $(() => f()),
		scrollAlignment: $(() => p()),
		name: $(() => a()),
		isCombobox: !0,
		items: $(() => g()),
		allowDeselect: $(() => v()),
		inputValue: $(() => b(), (e) => b(e)),
		onOpenChangeComplete: $(() => d())
	});
	var C = pn(), w = _(C);
	xt(w, {
		children: (e, n) => {
			var r = L();
			y(_(r), () => t.children ?? V), M(e, r);
		},
		$$slots: { default: !0 }
	});
	var T = i(w, 2), E = (e) => {
		var t = L(), n = _(t), r = (e) => {
			var t = L();
			o(_(t), 16, () => S.opts.value.current, (e) => e, (e, t) => {
				fn(e, { get value() {
					return t;
				} });
			}), M(e, t);
		};
		I(n, (e) => {
			S.opts.value.current.length && e(r);
		}), M(e, t);
	}, D = K(() => Array.isArray(S.opts.value.current)), O = (e) => {
		fn(e, {
			get value() {
				return S.opts.value.current;
			},
			set value(e) {
				S.opts.value.current = e;
			}
		});
	};
	I(T, (e) => {
		h(D) ? e(E) : e(O, -1);
	}), M(e, C), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/combobox/components/combobox-input.svelte
var hn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"defaultValue",
	"clearOnDeselect"
]), gn = Y("<input/>");
function _n(e, t) {
	u(t, !0);
	let n = k(t, "id", 19, Fe), r = k(t, "ref", 15, null), i = k(t, "clearOnDeselect", 3, !1), o = U(t, hn), s = nn.create({
		id: $(() => n()),
		ref: $(() => r(), (e) => r(e)),
		clearOnDeselect: $(() => i())
	});
	t.defaultValue && (s.root.opts.inputValue.current = t.defaultValue);
	let c = K(() => Me(o, s.props, { value: s.root.opts.inputValue.current }));
	var l = L();
	a(_(l), () => Ct, (e, r) => {
		r(e, {
			get id() {
				return n();
			},
			get ref() {
				return s.opts.ref;
			},
			children: (e, n) => {
				var r = L(), i = _(r), a = (e) => {
					var n = L();
					y(_(n), () => t.child, () => ({ props: h(c) })), M(e, n);
				}, o = (e) => {
					var t = gn();
					T(t, () => ({ ...h(c) }), void 0, void 0, void 0, void 0, !0), M(e, t);
				};
				I(i, (e) => {
					t.child ? e(a) : e(o, -1);
				}), M(e, r);
			},
			$$slots: { default: !0 }
		});
	}), M(e, l), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-content.svelte
var vn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"forceMount",
	"side",
	"onInteractOutside",
	"onEscapeKeydown",
	"children",
	"child",
	"preventScroll",
	"style"
]), yn = Y("<div><div><!></div></div>");
function bn(e, t) {
	let n = B();
	u(t, !0);
	let r = k(t, "id", 19, () => Ne(n)), i = k(t, "ref", 15, null), a = k(t, "forceMount", 3, !1), o = k(t, "side", 3, "bottom"), s = k(t, "onInteractOutside", 3, at), c = k(t, "onEscapeKeydown", 3, at), l = k(t, "preventScroll", 3, !1), d = U(t, vn), f = an.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e)),
		onInteractOutside: $(() => s()),
		onEscapeKeydown: $(() => c())
	}), p = K(() => Me(d, f.props));
	var m = L(), g = _(m), b = (e) => {
		St(e, J(() => h(p), () => f.popperProps, {
			get ref() {
				return f.opts.ref;
			},
			get side() {
				return o();
			},
			get enabled() {
				return f.root.opts.open.current;
			},
			get id() {
				return r();
			},
			get preventScroll() {
				return l();
			},
			forceMount: !0,
			get shouldRender() {
				return f.shouldRender;
			},
			popper: (e, n) => {
				let r = () => n?.().props, i = () => n?.().wrapperProps, a = K(() => Me(r(), { style: f.props.style }, { style: t.style }));
				var o = L(), s = _(o), c = (e) => {
					var n = L(), r = _(n);
					{
						let e = K(() => ({
							props: h(a),
							wrapperProps: i(),
							...f.snippetProps
						}));
						y(r, () => t.child, () => h(e));
					}
					M(e, n);
				}, l = (e) => {
					var n = yn();
					T(n, () => ({ ...i() }));
					var r = E(n);
					T(r, () => ({ ...h(a) })), y(E(r), () => t.children ?? V), v(r), v(n), M(e, n);
				};
				I(s, (e) => {
					t.child ? e(c) : e(l, -1);
				}), M(e, o);
			},
			$$slots: { popper: !0 }
		}));
	}, S = (e) => {
		bt(e, J(() => h(p), () => f.popperProps, {
			get ref() {
				return f.opts.ref;
			},
			get side() {
				return o();
			},
			get open() {
				return f.root.opts.open.current;
			},
			get id() {
				return r();
			},
			get preventScroll() {
				return l();
			},
			forceMount: !1,
			get shouldRender() {
				return f.shouldRender;
			},
			popper: (e, n) => {
				let r = () => n?.().props, i = () => n?.().wrapperProps, a = K(() => Me(r(), { style: f.props.style }, { style: t.style }));
				var o = L(), s = _(o), c = (e) => {
					var n = L(), r = _(n);
					{
						let e = K(() => ({
							props: h(a),
							wrapperProps: i(),
							...f.snippetProps
						}));
						y(r, () => t.child, () => h(e));
					}
					M(e, n);
				}, l = (e) => {
					var n = yn();
					T(n, () => ({ ...i() }));
					var r = E(n);
					T(r, () => ({ ...h(a) })), y(E(r), () => t.children ?? V), v(r), v(n), M(e, n);
				};
				I(s, (e) => {
					t.child ? e(c) : e(l, -1);
				}), M(e, o);
			},
			$$slots: { popper: !0 }
		}));
	};
	I(g, (e) => {
		a() ? e(b) : a() || e(S, 1);
	}), M(e, m), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/mounted.svelte
function xn(e, t) {
	u(t, !0);
	let n = k(t, "mounted", 15, !1), r = k(t, "onMountedChange", 3, at);
	qe(() => (n(!0), r()(!0), () => {
		n(!1), r()(!1);
	})), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-item.svelte
var Sn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"value",
	"label",
	"disabled",
	"children",
	"child",
	"onHighlight",
	"onUnhighlight"
]), Cn = Y("<div><!></div>"), wn = Y("<!> <!>", 1);
function Tn(e, t) {
	let n = B();
	u(t, !0);
	let r = k(t, "id", 19, () => Ne(n)), a = k(t, "ref", 15, null), o = k(t, "label", 19, () => t.value), s = k(t, "disabled", 3, !1), c = k(t, "onHighlight", 3, at), l = k(t, "onUnhighlight", 3, at), d = U(t, Sn), f = on.create({
		id: $(() => r()),
		ref: $(() => a(), (e) => a(e)),
		value: $(() => t.value),
		disabled: $(() => s()),
		label: $(() => o()),
		onHighlight: $(() => c()),
		onUnhighlight: $(() => l())
	}), p = K(() => Me(d, f.props));
	var m = wn(), g = _(m), b = (e) => {
		var n = L(), r = _(n);
		{
			let e = K(() => ({
				props: h(p),
				...f.snippetProps
			}));
			y(r, () => t.child, () => h(e));
		}
		M(e, n);
	}, S = (e) => {
		var n = Cn();
		T(n, () => ({ ...h(p) })), y(E(n), () => t.children ?? V, () => f.snippetProps), v(n), M(e, n);
	};
	I(g, (e) => {
		t.child ? e(b) : e(S, -1);
	}), xn(i(g, 2), {
		get mounted() {
			return f.mounted;
		},
		set mounted(e) {
			f.mounted = e;
		}
	}), M(e, m), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-viewport.svelte
var En = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), Dn = Y("<div><!></div>"), On = {
	hash: "svelte-1j45ufl",
	code: "\n	/* Hide scrollbars cross browser and enable momentum scroll for touch devices */[data-select-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport]::-webkit-scrollbar {display:none !important;}[data-select-viewport]::-webkit-scrollbar {display:none !important;}"
};
function kn(e, t) {
	let n = B();
	u(t, !0), O(e, On);
	let r = k(t, "id", 19, () => Ne(n)), i = k(t, "ref", 15, null), a = U(t, En), o = cn.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), s = K(() => Me(a, o.props));
	var c = L(), l = _(c), d = (e) => {
		var n = L();
		y(_(n), () => t.child, () => ({ props: h(s) })), M(e, n);
	}, f = (e) => {
		var n = Dn();
		T(n, () => ({ ...h(s) })), y(E(n), () => t.children ?? V), v(n), M(e, n);
	};
	I(l, (e) => {
		t.child ? e(d) : e(f, -1);
	}), M(e, c), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-scroll-down-button.svelte
var An = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), jn = Y("<div><!></div>"), Mn = Y("<!> <!>", 1);
function Nn(e, t) {
	let n = B();
	u(t, !0);
	let r = k(t, "id", 19, () => Ne(n)), a = k(t, "ref", 15, null), o = k(t, "delay", 3, () => 50), s = U(t, An), c = un.create({
		id: $(() => r()),
		ref: $(() => a(), (e) => a(e)),
		delay: $(() => o())
	}), l = K(() => Me(s, c.props));
	var d = L(), f = _(d), p = (e) => {
		var n = Mn(), r = _(n);
		xn(r, {
			get mounted() {
				return c.scrollButtonState.mounted;
			},
			set mounted(e) {
				c.scrollButtonState.mounted = e;
			}
		});
		var a = i(r, 2), o = (e) => {
			var n = L();
			y(_(n), () => t.child, () => ({ props: s })), M(e, n);
		}, u = (e) => {
			var n = jn();
			T(n, () => ({ ...h(l) })), y(E(n), () => t.children ?? V), v(n), M(e, n);
		};
		I(a, (e) => {
			t.child ? e(o) : e(u, -1);
		}), M(e, n);
	};
	I(f, (e) => {
		c.canScrollDown && e(p);
	}), M(e, d), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-scroll-up-button.svelte
var Pn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), Fn = Y("<div><!></div>"), In = Y("<!> <!>", 1);
function Ln(e, t) {
	let n = B();
	u(t, !0);
	let r = k(t, "id", 19, () => Ne(n)), a = k(t, "ref", 15, null), o = k(t, "delay", 3, () => 50), s = U(t, Pn), c = dn.create({
		id: $(() => r()),
		ref: $(() => a(), (e) => a(e)),
		delay: $(() => o())
	}), l = K(() => Me(s, c.props));
	var d = L(), f = _(d), p = (e) => {
		var n = In(), r = _(n);
		xn(r, {
			get mounted() {
				return c.scrollButtonState.mounted;
			},
			set mounted(e) {
				c.scrollButtonState.mounted = e;
			}
		});
		var a = i(r, 2), o = (e) => {
			var n = L();
			y(_(n), () => t.child, () => ({ props: s })), M(e, n);
		}, u = (e) => {
			var n = Fn();
			T(n, () => ({ ...h(l) })), y(E(n), () => t.children ?? V), v(n), M(e, n);
		};
		I(a, (e) => {
			t.child ? e(o) : e(u, -1);
		}), M(e, n);
	};
	I(f, (e) => {
		c.canScrollUp && e(p);
	}), M(e, d), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/label/label.svelte.js
var Rn = ye({
	component: "label",
	parts: ["root"]
}), zn = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = me(this.opts.ref), this.onmousedown = this.onmousedown.bind(this);
	}
	onmousedown(e) {
		e.detail > 1 && e.preventDefault();
	}
	#e = K(() => ({
		id: this.opts.id.current,
		[Rn.root]: "",
		onmousedown: this.onmousedown,
		...this.attachment
	}));
	get props() {
		return h(this.#e);
	}
	set props(e) {
		G(this.#e, e);
	}
}, Bn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"for"
]), Vn = Y("<label><!></label>");
function Hn(e, t) {
	let n = B();
	u(t, !0);
	let r = k(t, "id", 19, () => Ne(n)), i = k(t, "ref", 15, null), a = U(t, Bn), o = zn.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), s = K(() => Me(a, o.props, { for: t.for }));
	var c = L(), l = _(c), d = (e) => {
		var n = L();
		y(_(n), () => t.child, () => ({ props: h(s) })), M(e, n);
	}, f = (e) => {
		var n = Vn();
		T(n, () => ({
			...h(s),
			for: t.for
		})), y(E(n), () => t.children ?? V), v(n), M(e, n);
	};
	I(l, (e) => {
		t.child ? e(d) : e(f, -1);
	}), M(e, c), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select.svelte
var Un = Y("<!> <!>", 1);
function Wn(e, t) {
	u(t, !0);
	let n = k(t, "value", 15), r = k(t, "onValueChange", 3, at), a = k(t, "name", 3, ""), s = k(t, "disabled", 3, !1), c = k(t, "open", 15, !1), l = k(t, "onOpenChange", 3, at), d = k(t, "onOpenChangeComplete", 3, at), f = k(t, "loop", 3, !1), p = k(t, "scrollAlignment", 3, "nearest"), m = k(t, "required", 3, !1), g = k(t, "items", 19, () => []), v = k(t, "allowDeselect", 3, !1);
	function b() {
		n() === void 0 && n(t.type === "single" ? "" : []);
	}
	b(), we.pre(() => n(), () => {
		b();
	});
	let S = N(""), C = en.create({
		type: t.type,
		value: $(() => n(), (e) => {
			n(e), r()(e);
		}),
		disabled: $(() => s()),
		required: $(() => m()),
		open: $(() => c(), (e) => {
			c(e), l()(e);
		}),
		loop: $(() => f()),
		scrollAlignment: $(() => p()),
		name: $(() => a()),
		isCombobox: !1,
		items: $(() => g()),
		allowDeselect: $(() => v()),
		inputValue: $(() => h(S), (e) => G(S, e, !0)),
		onOpenChangeComplete: $(() => d())
	});
	var w = Un(), T = _(w);
	xt(T, {
		children: (e, n) => {
			var r = L();
			y(_(r), () => t.children ?? V), M(e, r);
		},
		$$slots: { default: !0 }
	});
	var E = i(T, 2), D = (e) => {
		var n = L(), r = _(n), i = (e) => {
			fn(e, { get autocomplete() {
				return t.autocomplete;
			} });
		}, a = (e) => {
			var n = L();
			o(_(n), 16, () => C.opts.value.current, (e) => e, (e, n) => {
				fn(e, {
					get value() {
						return n;
					},
					get autocomplete() {
						return t.autocomplete;
					}
				});
			}), M(e, n);
		};
		I(r, (e) => {
			C.opts.value.current.length === 0 ? e(i) : e(a, -1);
		}), M(e, n);
	}, O = K(() => Array.isArray(C.opts.value.current)), A = (e) => {
		fn(e, {
			get autocomplete() {
				return t.autocomplete;
			},
			get value() {
				return C.opts.value.current;
			},
			set value(e) {
				C.opts.value.current = e;
			}
		});
	};
	I(E, (e) => {
		h(O) ? e(D) : e(A, -1);
	}), M(e, w), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-value.svelte
var Gn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"placeholder",
	"child",
	"children"
]), Kn = Y("<span><!></span>");
function qn(e, t) {
	let n = B();
	u(t, !0);
	let r = k(t, "ref", 15, null), i = k(t, "id", 19, () => Ne(n)), a = U(t, Gn), o = tn.create({
		id: $(() => i()),
		ref: $(() => r(), (e) => r(e)),
		placeholder: $(() => t.placeholder)
	}), s = K(() => Me(a, o.props));
	var c = L(), l = _(c), d = (e) => {
		var n = L(), r = _(n);
		{
			let e = K(() => ({
				props: h(s),
				...o.snippetProps
			}));
			y(r, () => t.child, () => h(e));
		}
		M(e, n);
	}, f = (e) => {
		var n = Kn();
		T(n, () => ({ ...h(s) }));
		var r = E(n), i = (e) => {
			var n = L();
			y(_(n), () => t.children ?? V, () => o.snippetProps), M(e, n);
		}, a = (e) => {
			var n = F();
			S(() => W(n, o.snippetProps.selection.selected?.label ?? t.placeholder)), M(e, n);
		}, c = (e) => {
			var n = F();
			S((e) => W(n, e), [() => o.snippetProps.selection.selected.length > 0 ? o.snippetProps.selection.selected.map((e) => e.label).join(", ") : t.placeholder]), M(e, n);
		}, l = (e) => {
			var n = F();
			S(() => W(n, t.placeholder)), M(e, n);
		};
		I(r, (e) => {
			t.children ? e(i) : o.snippetProps.selection.type === "single" ? e(a, 1) : o.snippetProps.selection.type === "multiple" && o.snippetProps.selection.selected ? e(c, 2) : e(l, -1);
		}), v(n), M(e, n);
	};
	I(l, (e) => {
		t.child ? e(d) : e(f, -1);
	}), M(e, c), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-trigger.svelte
var Jn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"type"
]), Yn = Y("<button><!></button>");
function Xn(e, t) {
	let n = B();
	u(t, !0);
	let r = k(t, "id", 19, () => Ne(n)), i = k(t, "ref", 15, null), o = k(t, "type", 3, "button"), s = U(t, Jn), c = rn.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), l = K(() => Me(s, c.props, { type: o() }));
	var d = L();
	a(_(d), () => Ct, (e, n) => {
		n(e, {
			get id() {
				return r();
			},
			get ref() {
				return c.opts.ref;
			},
			children: (e, n) => {
				var r = L(), i = _(r), a = (e) => {
					var n = L();
					y(_(n), () => t.child, () => ({ props: h(l) })), M(e, n);
				}, o = (e) => {
					var n = Yn();
					T(n, () => ({ ...h(l) })), y(E(n), () => t.children ?? V), v(n), M(e, n);
				};
				I(i, (e) => {
					t.child ? e(a) : e(o, -1);
				}), M(e, r);
			},
			$$slots: { default: !0 }
		});
	}), M(e, d), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/switch.svelte.js
var Zn = ye({
	component: "switch",
	parts: ["root", "thumb"]
}), Qn = new ue("Switch.Root"), $n = class e {
	static create(t) {
		return Qn.set(new e(t));
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = me(e.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this);
	}
	#e() {
		this.opts.checked.current = !this.opts.checked.current;
	}
	onkeydown(e) {
		!(e.key === "Enter" || e.key === " ") || this.opts.disabled.current || (e.preventDefault(), this.#e());
	}
	onclick(e) {
		this.opts.disabled.current || this.#e();
	}
	#t = K(() => ({
		"data-disabled": ve(this.opts.disabled.current),
		"data-state": pe(this.opts.checked.current),
		"data-required": ve(this.opts.required.current)
	}));
	get sharedProps() {
		return h(this.#t);
	}
	set sharedProps(e) {
		G(this.#t, e);
	}
	#n = K(() => ({ checked: this.opts.checked.current }));
	get snippetProps() {
		return h(this.#n);
	}
	set snippetProps(e) {
		G(this.#n, e);
	}
	#r = K(() => ({
		...this.sharedProps,
		id: this.opts.id.current,
		role: "switch",
		disabled: fe(this.opts.disabled.current),
		"aria-checked": xe(this.opts.checked.current, !1),
		"aria-required": be(this.opts.required.current),
		[Zn.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return h(this.#r);
	}
	set props(e) {
		G(this.#r, e);
	}
}, er = class e {
	static create() {
		return new e(Qn.get());
	}
	root;
	#e = K(() => this.root.opts.name.current !== void 0);
	get shouldRender() {
		return h(this.#e);
	}
	set shouldRender(e) {
		G(this.#e, e);
	}
	constructor(e) {
		this.root = e;
	}
	#t = K(() => ({
		type: "checkbox",
		name: this.root.opts.name.current,
		value: this.root.opts.value.current,
		checked: this.root.opts.checked.current,
		disabled: this.root.opts.disabled.current,
		required: this.root.opts.required.current
	}));
	get props() {
		return h(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, tr = class e {
	static create(t) {
		return new e(t, Qn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = me(e.ref);
	}
	#e = K(() => ({ checked: this.root.opts.checked.current }));
	get snippetProps() {
		return h(this.#e);
	}
	set snippetProps(e) {
		G(this.#e, e);
	}
	#t = K(() => ({
		...this.root.sharedProps,
		id: this.opts.id.current,
		[Zn.thumb]: "",
		...this.attachment
	}));
	get props() {
		return h(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/components/switch-input.svelte
function nr(e, t) {
	u(t, !1);
	let n = er.create();
	z();
	var r = L(), i = _(r), a = (e) => {
		Lt(e, J(() => n.props));
	};
	I(i, (e) => {
		n.shouldRender && e(a);
	}), M(e, r), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/components/switch.svelte
var rr = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"ref",
	"id",
	"disabled",
	"required",
	"checked",
	"value",
	"name",
	"type",
	"onCheckedChange"
]), ir = Y("<button><!></button>"), ar = Y("<!> <!>", 1);
function or(e, t) {
	let n = B();
	u(t, !0);
	let r = k(t, "ref", 15, null), a = k(t, "id", 19, () => Ne(n)), o = k(t, "disabled", 3, !1), s = k(t, "required", 3, !1), c = k(t, "checked", 15, !1), l = k(t, "value", 3, "on"), d = k(t, "name", 3, void 0), f = k(t, "type", 3, "button"), p = k(t, "onCheckedChange", 3, at), m = U(t, rr), g = $n.create({
		checked: $(() => c(), (e) => {
			c(e), p()?.(e);
		}),
		disabled: $(() => o() ?? !1),
		required: $(() => s()),
		value: $(() => l()),
		name: $(() => d()),
		id: $(() => a()),
		ref: $(() => r(), (e) => r(e))
	}), b = K(() => Me(m, g.props, { type: f() }));
	var S = ar(), C = _(S), w = (e) => {
		var n = L(), r = _(n);
		{
			let e = K(() => ({
				props: h(b),
				...g.snippetProps
			}));
			y(r, () => t.child, () => h(e));
		}
		M(e, n);
	}, D = (e) => {
		var n = ir();
		T(n, () => ({ ...h(b) })), y(E(n), () => t.children ?? V, () => g.snippetProps), v(n), M(e, n);
	};
	I(C, (e) => {
		t.child ? e(w) : e(D, -1);
	}), nr(i(C, 2), {}), M(e, S), x();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/components/switch-thumb.svelte
var sr = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"ref",
	"id"
]), cr = Y("<span><!></span>");
function lr(e, t) {
	let n = B();
	u(t, !0);
	let r = k(t, "ref", 15, null), i = k(t, "id", 19, () => Ne(n)), a = U(t, sr), o = tr.create({
		id: $(() => i()),
		ref: $(() => r(), (e) => r(e))
	}), s = K(() => Me(a, o.props));
	var c = L(), l = _(c), d = (e) => {
		var n = L(), r = _(n);
		{
			let e = K(() => ({
				props: h(s),
				...o.snippetProps
			}));
			y(r, () => t.child, () => h(e));
		}
		M(e, n);
	}, f = (e) => {
		var n = cr();
		T(n, () => ({ ...h(s) })), y(E(n), () => t.children ?? V, () => o.snippetProps), v(n), M(e, n);
	};
	I(l, (e) => {
		t.child ? e(d) : e(f, -1);
	}), M(e, c), x();
}
//#endregion
//#region ../ui/src/lib/components/input/label.svelte
var ur = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function dr(e, t) {
	u(t, !0);
	let n = U(t, ur);
	var r = L(), i = _(r);
	{
		let e = K(() => Q("text-sm font-medium text-dark-50", t.class));
		a(i, () => Hn, (r, i) => {
			i(r, J({ get children() {
				return t.children;
			} }, () => n, { get class() {
				return h(e);
			} }));
		});
	}
	M(e, r), x();
}
//#endregion
//#region ../ui/src/lib/components/input/input-checkbox.svelte
var fr = Y("<div><!> <!></div>"), pr = Y("<p class=\"text-sm text-red-400\"> </p>"), mr = Y("<div><div class=\"flex items-center gap-2\"><!> <!></div> <!></div>");
function hr(e, t) {
	u(t, !0);
	let n = k(t, "checked", 15, !1), r = k(t, "id", 19, Fe), o = k(t, "inline", 3, !1);
	var s = L(), c = _(s), l = (e) => {
		var o = fr(), s = E(o);
		{
			let e = (e, t) => {
				let n = () => t?.().checked;
				var r = L(), i = _(r), a = (e) => {
					Z(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				I(i, (e) => {
					n() && e(a);
				}), M(e, r);
			}, i = K(() => t.label ? `${r()}-label` : void 0), o = K(() => t.error ? !0 : void 0), c = K(() => Q("peer inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary/15 data-[state=checked]:text-primary", "data-[state=unchecked]:bg-dark-700", t.error ? "border-red-500" : "border-dark-500 data-[state=unchecked]:hover:border-dark-400", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
			a(s, () => Ht, (a, s) => {
				s(a, {
					get id() {
						return r();
					},
					get "aria-label"() {
						return t["aria-label"];
					},
					get "aria-labelledby"() {
						return h(i);
					},
					get "aria-invalid"() {
						return h(o);
					},
					get class() {
						return h(c);
					},
					get checked() {
						return n();
					},
					set checked(e) {
						n(e);
					},
					children: e,
					$$slots: { default: !0 }
				});
			});
		}
		var c = i(s, 2), l = (e) => {
			dr(e, {
				get id() {
					return `${r() ?? ""}-label`;
				},
				get for() {
					return r();
				},
				class: "cursor-pointer whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, n) => {
					D();
					var r = F();
					S(() => W(r, t.label)), M(e, r);
				},
				$$slots: { default: !0 }
			});
		};
		I(c, (e) => {
			t.label && e(l);
		}), v(o), S((e) => P(o, 1, e), [() => q(Q("flex items-center gap-2", t.class))]), M(e, o);
	}, d = (e) => {
		var o = mr(), s = E(o), c = E(s);
		{
			let e = (e, t) => {
				let n = () => t?.().checked;
				var r = L(), i = _(r), a = (e) => {
					Z(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				I(i, (e) => {
					n() && e(a);
				}), M(e, r);
			}, i = K(() => t.label ? `${r()}-label` : void 0), o = K(() => t.error ? !0 : void 0), s = K(() => Q("peer inline-flex size-5 shrink-0 items-center justify-center rounded border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-dark-50", "data-[state=unchecked]:bg-dark-700", t.error ? "border-red-500" : "border-dark-500 data-[state=unchecked]:hover:border-dark-400", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
			a(c, () => Ht, (a, c) => {
				c(a, {
					get id() {
						return r();
					},
					get "aria-label"() {
						return t["aria-label"];
					},
					get "aria-labelledby"() {
						return h(i);
					},
					get "aria-invalid"() {
						return h(o);
					},
					get class() {
						return h(s);
					},
					get checked() {
						return n();
					},
					set checked(e) {
						n(e);
					},
					children: e,
					$$slots: { default: !0 }
				});
			});
		}
		var l = i(c, 2), u = (e) => {
			dr(e, {
				get id() {
					return `${r() ?? ""}-label`;
				},
				get for() {
					return r();
				},
				class: "cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, n) => {
					D();
					var r = F();
					S(() => W(r, t.label)), M(e, r);
				},
				$$slots: { default: !0 }
			});
		};
		I(l, (e) => {
			t.label && e(u);
		}), v(s);
		var d = i(s, 2), f = (e) => {
			var n = pr(), r = E(n, !0);
			v(n), S(() => W(r, t.error)), M(e, n);
		};
		I(d, (e) => {
			t.error && e(f);
		}), v(o), S((e) => P(o, 1, e), [() => q(Q("grid gap-2", t.class))]), M(e, o);
	};
	I(c, (e) => {
		o() ? e(l) : e(d, -1);
	}), M(e, s), x();
}
//#endregion
//#region ../ui/src/lib/components/variable-popover/variable-popover.svelte
var gr = Y("<p class=\"text-xs font-semibold text-dark-200\"> </p>"), _r = Y("<p class=\"py-2 text-xs text-dark-400\"> </p>"), vr = Y("<li><button type=\"button\"><div class=\"flex min-w-0 flex-1 items-center gap-2.5\"><span class=\"shrink-0 rounded border border-primary-300 bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary transition-all duration-150 group-hover:border-primary-500/20 group-hover:bg-primary-500/15\"> </span> <span class=\"min-w-0 truncate text-dark-300 transition-colors duration-150 group-hover:text-dark-100\"> </span></div> <div class=\"flex size-4 shrink-0 items-center justify-center\"><!></div></button></li>"), yr = Y("<ul class=\"grid gap-1\"></ul>"), br = Y("<div class=\"mb-3 flex flex-col gap-2\"><!></div> <!>", 1), xr = Y("<!> <!>", 1);
function Sr(e, t) {
	u(t, !0);
	let n = k(t, "title", 3, "Variables"), a = k(t, "emptyLabel", 3, "No variables available."), s = k(t, "ariaLabel", 3, "Show variables"), c = k(t, "copiedLabel", 3, "Copied"), l = k(t, "insertedLabel", 3, "Inserted");
	k(t, "noResultsLabel", 3, "No variables match your search.");
	let d = k(t, "icon", 3, "ri:braces-line"), f = N(null);
	function p(e) {
		if (t.onInsert) {
			t.onInsert(e);
			return;
		}
		navigator.clipboard.writeText(`{${e}}`).then(() => {
			G(f, e, !0), setTimeout(() => {
				h(f) === e && G(f, null);
			}, 2e3);
		});
	}
	Tt(e, {
		children: (e, u) => {
			var m = xr(), g = _(m);
			Et(g, {
				child: (e, t) => {
					Ot(e, J(() => t?.().props, {
						type: "button",
						variant: "ghost",
						size: "icon-sm",
						get icon() {
							return d();
						},
						get "aria-label"() {
							return s();
						},
						class: "size-7 text-dark-400 hover:text-dark-100"
					}));
				},
				$$slots: { child: !0 }
			}), wt(i(g, 2), {
				align: "start",
				class: "w-80 p-4",
				children: (e, s) => {
					var u = br(), d = _(u), m = E(d), g = (e) => {
						var t = gr(), r = E(t, !0);
						v(t), S(() => W(r, n())), M(e, t);
					};
					I(m, (e) => {
						n() && e(g);
					}), v(d);
					var y = i(d, 2), b = (e) => {
						var t = _r(), n = E(t, !0);
						v(t), S(() => W(n, a())), M(e, t);
					}, x = (e) => {
						Dt(e, {
							orientation: "vertical",
							viewportClasses: "max-h-48 overflow-hidden",
							children: (e, n) => {
								var a = yr();
								o(a, 21, () => t.variables, (e) => e.key, (e, n) => {
									var a = vr(), o = E(a), s = E(o), u = E(s), d = E(u, !0);
									v(u);
									var m = i(u, 2), g = E(m, !0);
									v(m), v(s);
									var _ = i(s, 2), y = E(_), b = (e) => {
										Z(e, {
											icon: "ri:check-line",
											class: "size-3.5 text-success-400"
										});
									}, x = (e) => {
										{
											let n = K(() => t.onInsert ? "ri:corner-down-left-line" : "ri:file-copy-line");
											Z(e, {
												get icon() {
													return h(n);
												},
												class: "size-3.5 text-dark-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
											});
										}
									};
									I(y, (e) => {
										h(f) === h(n).key ? e(b) : e(x, -1);
									}), v(_), v(o), v(a), S((e) => {
										P(o, 1, e), r(o, "title", t.onInsert ? l() : c()), W(d, `{${h(n).key}}`), W(g, h(n).label);
									}, [() => q(Q("group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-transparent px-2.5 py-2 text-left text-xs transition-all duration-150 hover:border-dark-600/30 hover:bg-dark-700/50"))]), ne("click", o, () => p(h(n).key)), M(e, a);
								}), v(a), M(e, a);
							},
							$$slots: { default: !0 }
						});
					};
					I(y, (e) => {
						t.variables.length === 0 ? e(b) : e(x, -1);
					}), M(e, u);
				},
				$$slots: { default: !0 }
			}), M(e, m);
		},
		$$slots: { default: !0 }
	}), x();
}
X(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-code.svelte
var Cr = Y("<span></span>"), wr = Y("<div class=\"flex items-center justify-between gap-2\"><!> <!></div>"), Tr = Y("<div class=\"absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-dark-900/85\" role=\"status\" aria-live=\"polite\"><!> <p class=\"text-xs text-dark-300\"> </p></div>"), Er = Y("<p class=\"text-sm text-red-400\"> </p>"), Dr = Y("<div><!> <div role=\"textbox\" aria-multiline=\"true\"><!></div> <!></div>");
function Or(a, o) {
	u(o, !0);
	let c = k(o, "id", 19, Fe), d = k(o, "value", 3, ""), f = k(o, "language", 3, "typescript"), p = k(o, "minHeight", 3, "12rem"), m = k(o, "fillHeight", 3, !1), g = k(o, "extensions", 19, () => []), _ = k(o, "languageServer", 3, null), y = k(o, "loadingLabel", 3, "Loading..."), b = k(o, "variables", 19, () => []), T = k(o, "variablesTitle", 3, "Variables"), O = k(o, "variablesAriaLabel", 3, "Insert variable"), A = N(void 0), j = N(void 0), L = N(void 0), R = N(!1), z = !1, B = N(""), V = N(""), H;
	function U(e) {
		return Object.keys(e).sort().join("\0");
	}
	function K(e) {
		return Object.entries(e).filter(([e]) => e.includes("/src/")).sort(([e], [t]) => e.localeCompare(t)).map(([e, t]) => `${e}\0${t}`).join("\0");
	}
	function J() {
		H &&= (clearTimeout(H), void 0);
	}
	function Y(e) {
		o.oninput && o.oninput({ currentTarget: { value: e } });
	}
	function X(e) {
		let t = `{${e}}`;
		if (!h(j)) {
			Y(`${d()}${t}`);
			return;
		}
		let { from: n, to: r } = h(j).state.selection.main;
		h(j).dispatch({
			changes: {
				from: n,
				to: r,
				insert: t
			},
			selection: { anchor: n + t.length }
		}), h(j).focus();
	}
	async function te() {
		if (h(L)?.destroy(), G(L, void 0), G(B, ""), G(V, ""), J(), !_()) return [...g()];
		let e = await n(_());
		return G(L, e, !0), G(B, U(_().workspace), !0), G(V, K(_().workspace), !0), [...g(), ...e.extensions];
	}
	C(async () => {
		if (!h(A)) return;
		let e = await te();
		if (z || !h(A)) {
			h(L)?.destroy(), G(L, void 0);
			return;
		}
		G(j, t({
			parent: h(A),
			doc: d(),
			language: f(),
			placeholder: o.placeholder,
			extensions: e,
			onChange: Y
		}), !0), G(R, !0), o.onEditorReady?.(h(j));
	}), l(() => {
		!h(j) || !h(R) || e(h(j), d());
	}), l(() => {
		if (!h(R) || !h(L) || !_()) return;
		let e = _().workspace, t = U(e), n = K(e);
		if (t !== h(B)) {
			J(), G(B, t, !0), G(V, n, !0), h(L).updateWorkspace(e);
			return;
		}
		n !== h(V) && (J(), H = setTimeout(() => {
			H = void 0, G(V, n, !0), h(L)?.updateWorkspace(e);
		}, 450));
	}), w(() => {
		z = !0, J(), h(L)?.destroy(), G(L, void 0), o.onEditorReady?.(null), h(j)?.destroy(), G(j, void 0);
	});
	var ne = Dr(), re = E(ne), ie = (e) => {
		var t = wr(), n = E(t), r = (e) => {
			dr(e, {
				get for() {
					return c();
				},
				children: (e, t) => {
					D();
					var n = F();
					S(() => W(n, o.label)), M(e, n);
				},
				$$slots: { default: !0 }
			});
		}, a = (e) => {
			M(e, Cr());
		};
		I(n, (e) => {
			o.label ? e(r) : e(a, -1);
		});
		var s = i(n, 2), l = (e) => {
			Sr(e, {
				get variables() {
					return b();
				},
				get title() {
					return T();
				},
				get ariaLabel() {
					return O();
				},
				onInsert: X
			});
		};
		I(s, (e) => {
			b().length > 0 && e(l);
		}), v(t), M(e, t);
	};
	I(re, (e) => {
		(o.label || b().length > 0) && e(ie);
	});
	var ae = i(re, 2);
	let oe;
	var se = E(ae), ce = (e) => {
		var t = Tr(), n = E(t);
		Z(n, {
			icon: "gg:spinner",
			class: "size-5 animate-spin text-primary",
			"aria-hidden": "true"
		});
		var a = i(n, 2), o = E(a, !0);
		v(a), v(t), S(() => {
			r(t, "aria-label", y()), W(o, y());
		}), M(e, t);
	};
	I(se, (e) => {
		h(R) || e(ce);
	}), v(ae), s(ae, (e) => G(A, e), () => h(A));
	var le = i(ae, 2), ue = (e) => {
		var t = Er(), n = E(t, !0);
		v(t), S(() => W(n, o.error)), M(e, t);
	};
	I(le, (e) => {
		o.error && e(ue);
	}), v(ne), S((e, t) => {
		P(ne, 1, e), r(ae, "id", c()), r(ae, "aria-busy", !h(R)), r(ae, "aria-invalid", o.error ? !0 : void 0), P(ae, 1, t), oe = ee(ae, "", oe, { "min-height": m() ? void 0 : p() });
	}, [() => q(Q("relative flex w-full flex-col", m() ? "h-full min-h-0 flex-1" : "grid gap-2")), () => q(Q("relative", "overflow-hidden rounded-lg border bg-dark-900 focus-within:ring-2 [&_.cm-editor]:outline-none", m() ? "flex min-h-0 flex-1 flex-col [&_.cm-editor]:!flex [&_.cm-editor]:!h-full [&_.cm-editor]:!max-h-full [&_.cm-editor]:!min-h-0 [&_.cm-editor]:!flex-col [&_.cm-scroller]:!min-h-0 [&_.cm-scroller]:!flex-1" : "[&_.cm-editor]:min-h-[inherit] [&_.cm-scroller]:min-h-[inherit]", o.error ? "border-red-500 focus-within:ring-red-500" : "border-dark-600 focus-within:ring-primary", o.class))]), M(a, ne), x();
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/internal/configurable-globals.js
var kr = typeof window < "u" ? window : void 0;
typeof window < "u" && window.document, typeof window < "u" && window.navigator, typeof window < "u" && window.location;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/internal/utils/dom.js
function Ar(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot;) {
		let e = t.shadowRoot.activeElement;
		if (e === t) break;
		t = e;
	}
	return t;
}
new class {
	#e;
	#t;
	constructor(e = {}) {
		let { window: t = kr, document: n = t?.document } = e;
		t !== void 0 && (this.#e = n, this.#t = b((e) => {
			let n = te(t, "focusin", e), r = te(t, "focusout", e);
			return () => {
				n(), r();
			};
		}));
	}
	get current() {
		return this.#t?.(), this.#e ? Ar(this.#e) : null;
	}
}();
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/internal/utils/is.js
function jr(e) {
	return typeof e == "function";
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/extract/extract.svelte.js
function Mr(e, t) {
	if (jr(e)) {
		let n = e();
		return n === void 0 ? t : n;
	}
	return e === void 0 ? t : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/use-debounce/use-debounce.svelte.js
function Nr(e, t) {
	let n = N(null), r = K(() => Mr(t, 250));
	function i(...t) {
		if (h(n)) h(n).timeout && clearTimeout(h(n).timeout);
		else {
			let e, t;
			G(n, {
				timeout: null,
				runner: null,
				promise: new Promise((n, r) => {
					e = n, t = r;
				}),
				resolve: e,
				reject: t
			}, !0);
		}
		return h(n).runner = async () => {
			if (!h(n)) return;
			let r = h(n);
			G(n, null);
			try {
				r.resolve(await e.apply(this, t));
			} catch (e) {
				r.reject(e);
			}
		}, h(n).timeout = setTimeout(h(n).runner, h(r)), h(n).promise;
	}
	return i.cancel = async () => {
		(!h(n) || h(n).timeout === null) && (await new Promise((e) => setTimeout(e, 0)), !h(n) || h(n).timeout === null) || (clearTimeout(h(n).timeout), h(n).reject("Cancelled"), G(n, null));
	}, i.runScheduledNow = async () => {
		(!h(n) || !h(n).timeout) && (await new Promise((e) => setTimeout(e, 0)), !h(n) || !h(n).timeout) || (clearTimeout(h(n).timeout), h(n).timeout = null, await h(n).runner?.());
	}, Object.defineProperty(i, "pending", {
		enumerable: !0,
		get() {
			return !!h(n)?.timeout;
		}
	}), i;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/watch/watch.svelte.js
function Pr(e, t) {
	switch (e) {
		case "post":
			l(t);
			break;
		case "pre":
			f(t);
			break;
	}
}
function Fr(e, t, n, r = {}) {
	let { lazy: i = !1 } = r, a = !i, o = Array.isArray(e) ? [] : void 0;
	Pr(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!a) {
			a = !0, o = t;
			return;
		}
		let r = m(() => n(t, o));
		return o = t, r;
	});
}
function Ir(e, t, n) {
	let r = re(() => {
		let i = !1;
		Fr(e, t, (e, t) => {
			if (i) {
				r();
				return;
			}
			let a = n(e, t);
			return i = !0, a;
		}, { lazy: !0 });
	});
	l(() => r);
}
function Lr(e, t, n) {
	Fr(e, "post", t, n);
}
function Rr(e, t, n) {
	Fr(e, "pre", t, n);
}
Lr.pre = Rr;
function zr(e, t) {
	Ir(e, "post", t);
}
function Br(e, t) {
	Ir(e, "pre", t);
}
zr.pre = Br;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/internal/utils/function.js
function Vr() {}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/debounced/debounced.svelte.js
var Hr = class {
	#e = N();
	#t;
	constructor(e, t = 250) {
		G(this.#e, e(), !0), this.cancel = this.cancel.bind(this), this.setImmediately = this.setImmediately.bind(this), this.updateImmediately = this.updateImmediately.bind(this), this.#t = Nr(() => {
			G(this.#e, e(), !0);
		}, t), Lr(e, () => {
			this.#t().catch(Vr);
		});
	}
	get current() {
		return h(this.#e);
	}
	get pending() {
		return this.#t.pending;
	}
	cancel() {
		this.#t.cancel();
	}
	updateImmediately() {
		return this.#t.runScheduledNow();
	}
	setImmediately(e) {
		this.cancel(), G(this.#e, e, !0);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/resource/resource.svelte.js
function Ur(e, t) {
	let n, r = null;
	return (...i) => new Promise((a) => {
		r && r(void 0), r = a, clearTimeout(n), n = setTimeout(async () => {
			let t = await e(...i);
			r &&= (r(t), null);
		}, t);
	});
}
function Wr(e, t) {
	let n = 0, r = null;
	return (...i) => {
		let a = Date.now();
		return n && a - n < t ? r ?? Promise.resolve(void 0) : (n = a, r = e(...i), r);
	};
}
function Gr(e, t, n = {}, r) {
	let { lazy: i = !1, once: a = !1, initialValue: o, debounce: s, throttle: c } = n, l = N(H(o)), u = N(H(o === void 0 && !i)), d = N(void 0), f = N(H([])), p = () => {
		h(f).forEach((e) => e()), G(f, [], !0);
	}, m = (e) => {
		G(f, [...h(f), e], !0);
	}, g = async (e, n, r = !1) => {
		try {
			G(u, !0), G(d, void 0), p();
			let i = new AbortController();
			m(() => i.abort());
			let a = await t(e, n, {
				data: h(l),
				refetching: r,
				onCleanup: m,
				signal: i.signal
			});
			return G(l, a, !0), a;
		} catch (e) {
			e instanceof DOMException && e.name === "AbortError" || G(d, e, !0);
			return;
		} finally {
			G(u, !1);
		}
	}, _ = s ? Ur(g, s) : c ? Wr(g, c) : g, v = Array.isArray(e) ? e : [e], y;
	return r((t, n) => {
		a && y || (y = t, _(Array.isArray(e) ? t : t[0], Array.isArray(e) ? n : n?.[0]));
	}, { lazy: i }), {
		get current() {
			return h(l);
		},
		get loading() {
			return h(u);
		},
		get error() {
			return h(d);
		},
		mutate: (e) => {
			G(l, e, !0);
		},
		refetch: (t) => {
			let n = v.map((e) => e());
			return _(Array.isArray(e) ? n : n[0], Array.isArray(e) ? n : n[0], t ?? !0);
		}
	};
}
function Kr(e, t, n) {
	return Gr(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		Lr(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
function qr(e, t, n) {
	return Gr(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		Lr.pre(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
Kr.pre = qr;
//#endregion
//#region ../ui/src/lib/components/input/resolve-select-items.svelte.ts
function Jr(e, t) {
	let n = N(H([])), r = N(!1), i = N(0), a = K(() => {
		let t = e();
		return typeof t == "function" ? (h(i), h(n)) : t;
	}), o = K(() => typeof e() == "function" ? (h(i), h(r)) : !1);
	return l(() => {
		t && t();
		let a = e();
		if (typeof a != "function") return;
		G(r, !0);
		let o = !1;
		return Promise.resolve(a()).then((e) => {
			o || (G(n, e, !0), G(r, !1), R(i));
		}, () => {
			o || (G(n, [], !0), G(r, !1), R(i));
		}), () => {
			o = !0;
		};
	}), {
		get items() {
			return h(a);
		},
		get loading() {
			return h(o);
		}
	};
}
function Yr(e, t) {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => e.label.toLowerCase().includes(n) || e.value.toLowerCase().includes(n)) : e;
}
function Xr(e, t, n = 200, r = 36, i = 6) {
	let a = e.length * r, o = Math.max(0, Math.floor(t / r) - i), s = Math.ceil(n / r) + i * 2, c = Math.min(e.length, o + s);
	return {
		items: e.slice(o, c),
		startIndex: o,
		totalHeight: a,
		offsetY: o * r
	};
}
function Zr(e) {
	return e > 50;
}
function Qr(e, t = 36) {
	return Math.max(0, e * t);
}
//#endregion
//#region ../ui/src/lib/components/input/input-select.svelte
var $r = Y("<span class=\"grid h-full min-w-10 place-items-center rounded-l-xl border border-r-0 border-dark-700 text-dark-50\"><!></span>"), ei = Y(" <!>", 1), ti = Y("<!> <!>", 1), ni = Y("<!> <!> <!>", 1), ri = Y("<div><button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\" class=\"flex w-full min-w-0 cursor-pointer items-center outline-none disabled:cursor-not-allowed disabled:opacity-50\"><!> <span><span> </span> <!></span></button></div> <!>", 1), ii = Y("<p class=\"text-sm text-red-400\"> </p>"), ai = Y("<div><!> <!> <!></div>");
function oi(e, t) {
	u(t, !0);
	let n = k(t, "searchable", 3, "auto"), s = k(t, "dialogTitle", 3, "Select option"), c = k(t, "dialogDescription", 3, "Search and select an option from the list."), l = k(t, "id", 19, Fe), d = k(t, "required", 3, !1), f = k(t, "type", 3, "single"), p = k(t, "value", 15), m = K(() => t.placeholder ?? "Select an option"), g = K(() => t.loadingPlaceholder ?? "Loading..."), y = K(() => t.searchPlaceholder ?? "Search values"), b = K(() => t.noResultsLabel ?? "No matches found"), C = N(!1), w = N(""), T = Fe(), O = Jr(() => t.items, () => t.reloadKey?.()), A = K(() => t.disabled ?? !1), j = K(() => f() === "multiple"), R = K(() => n() === !0 ? !0 : n() === !1 ? !1 : O.items.length >= 8), z = K(() => {
		if (O.loading) return h(g);
		if (h(j)) {
			let e = p();
			if (e.length === 0) return h(m);
			let t = e.map((e) => O.items.find((t) => t.value === e)?.label).filter(Boolean);
			return t.length > 0 ? t.join(", ") : h(m);
		}
		let e = p();
		return e ? O.items.find((t) => t.value === e)?.label ?? e : h(m);
	}), B = K(() => h(j) ? p().length > 0 : !!p());
	function V(e) {
		G(C, e, !0), e || G(w, "");
	}
	function H(e) {
		return h(j) ? p().includes(e) : p() === e;
	}
	function U(e) {
		if (!e.disabled) {
			if (h(j)) {
				let n = [...p()], r = n.indexOf(e.value);
				r >= 0 ? n.splice(r, 1) : n.push(e.value), p(n), t.onValueChange?.(n);
				return;
			}
			p(e.value), t.onValueChange?.(e.value), G(C, !1);
		}
	}
	function Y() {
		h(A) || G(C, !0);
	}
	var ee = ai(), X = E(ee), te = (e) => {
		dr(e, {
			get for() {
				return l();
			},
			children: (e, n) => {
				D();
				var r = F();
				S(() => W(r, t.label)), M(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	I(X, (e) => {
		t.label && e(te);
	});
	var re = i(X, 2);
	a(re, () => mt, (e, n) => {
		n(e, {
			onOpenChange: V,
			get open() {
				return h(C);
			},
			set open(e) {
				G(C, e, !0);
			},
			children: (e, n) => {
				var u = ri(), f = _(u), p = E(f), m = E(p), x = (e) => {
					var n = $r();
					Z(E(n), {
						get icon() {
							return t.prependIcon;
						},
						class: "size-6"
					}), v(n), M(e, n);
				};
				I(m, (e) => {
					t.prependIcon && e(x);
				});
				var k = i(m, 2), j = E(k), N = E(j, !0);
				v(j), Z(i(j, 2), {
					icon: "ri:expand-up-down-line",
					class: "size-5 shrink-0 text-dark-300"
				}), v(k), v(p), v(f), a(i(f, 2), () => gt, (e, n) => {
					n(e, {
						children: (e, n) => {
							var r = ti(), l = _(r);
							a(l, () => _t, (e, t) => {
								t(e, {});
							}), a(i(l, 2), () => pt, (e, n) => {
								n(e, J(() => t.dialogProps, {
									children: (e, n) => {
										var r = ni(), l = _(r);
										a(l, () => ft, (e, t) => {
											t(e, {
												class: "sr-only",
												children: (e, t) => {
													D();
													var n = F();
													S(() => W(n, s())), M(e, n);
												},
												$$slots: { default: !0 }
											});
										});
										var u = i(l, 2);
										a(u, () => ht, (e, t) => {
											t(e, {
												class: "sr-only",
												children: (e, t) => {
													D();
													var n = F();
													S(() => W(n, c())), M(e, n);
												},
												$$slots: { default: !0 }
											});
										});
										var d = i(u, 2);
										{
											let e = K(() => !O.loading), n = K(() => Q(t.commandProps?.class));
											a(d, () => Ue, (r, s) => {
												s(r, J(() => t.commandProps, {
													get shouldFilter() {
														return h(e);
													},
													get class() {
														return h(n);
													},
													children: (e, t) => {
														var n = ti(), r = _(n), s = (e) => {
															var t = L();
															a(_(t), () => Ke, (e, t) => {
																t(e, {
																	get placeholder() {
																		return h(y);
																	},
																	get "aria-label"() {
																		return h(y);
																	},
																	get value() {
																		return h(w);
																	},
																	set value(e) {
																		G(w, e, !0);
																	}
																});
															}), M(e, t);
														};
														I(r, (e) => {
															h(R) && e(s);
														}), a(i(r, 2), () => Le, (e, t) => {
															t(e, {
																get id() {
																	return T;
																},
																class: "mt-2",
																children: (e, t) => {
																	var n = L();
																	a(_(n), () => Ie, (e, t) => {
																		t(e, {
																			children: (e, t) => {
																				var n = L(), r = _(n), s = (e) => {
																					var t = L();
																					a(_(t), () => Ge, (e, t) => {
																						t(e, {
																							children: (e, t) => {
																								D();
																								var n = F();
																								S(() => W(n, h(g))), M(e, n);
																							},
																							$$slots: { default: !0 }
																						});
																					}), M(e, t);
																				}, c = (e) => {
																					var t = ti(), n = _(t);
																					a(n, () => He, (e, t) => {
																						t(e, {
																							children: (e, t) => {
																								D();
																								var n = F();
																								S(() => W(n, h(b))), M(e, n);
																							},
																							$$slots: { default: !0 }
																						});
																					}), o(i(n, 2), 17, () => O.items, (e) => e.value, (e, t) => {
																						var n = L(), r = _(n);
																						{
																							let e = K(() => [h(t).label, h(t).value]);
																							a(r, () => Ve, (n, r) => {
																								r(n, {
																									get value() {
																										return h(t).value;
																									},
																									get keywords() {
																										return h(e);
																									},
																									get disabled() {
																										return h(t).disabled;
																									},
																									onSelect: () => U(h(t)),
																									children: (e, n) => {
																										D();
																										var r = ei(), a = _(r), o = i(a), s = (e) => {
																											Z(e, {
																												icon: "ri:check-line",
																												class: "size-5 text-primary"
																											});
																										}, c = K(() => H(h(t).value));
																										I(o, (e) => {
																											h(c) && e(s);
																										}), S(() => W(a, `${h(t).label ?? ""} `)), M(e, r);
																									},
																									$$slots: { default: !0 }
																								});
																							});
																						}
																						M(e, n);
																					}), M(e, t);
																				};
																				I(r, (e) => {
																					O.loading ? e(s) : e(c, -1);
																				}), M(e, n);
																			},
																			$$slots: { default: !0 }
																		});
																	}), M(e, n);
																},
																$$slots: { default: !0 }
															});
														}), M(e, n);
													},
													$$slots: { default: !0 }
												}));
											});
										}
										M(e, r);
									},
									$$slots: { default: !0 }
								}));
							}), M(e, r);
						},
						$$slots: { default: !0 }
					});
				}), S((e, t, n) => {
					P(f, 1, e), r(p, "id", l()), r(p, "aria-expanded", h(C)), r(p, "aria-controls", h(C) ? T : void 0), r(p, "aria-required", d() || void 0), p.disabled = h(A), P(k, 1, t), P(j, 1, n), W(N, h(z));
				}, [
					() => q(Q("relative flex w-full min-w-0 items-center rounded-xl", "has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500", t.class)),
					() => q(Q("flex w-full items-center justify-between gap-2 border bg-dark-700 text-dark-50 outline-none", We.md, t.error ? "border-red-500" : "border-dark-500", {
						"rounded-l-none rounded-r-xl border-l-0": t.prependIcon,
						"rounded-xl": !t.prependIcon
					})),
					() => q(Q("min-w-0 flex-1 truncate text-left", !h(B) && "text-dark-300"))
				]), ne("click", p, Y), M(e, u);
			},
			$$slots: { default: !0 }
		});
	});
	var ie = i(re, 2), ae = (e) => {
		var n = ii(), r = E(n, !0);
		v(n), S(() => W(r, t.error)), M(e, n);
	};
	I(ie, (e) => {
		t.error && e(ae);
	}), v(ee), S((e) => P(ee, 1, e), [() => q(Q("relative grid w-full min-w-0 gap-2"))]), M(e, ee), x();
}
X(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/cron-expression-editor.svelte
var si = Y("<div><p class=\"text-[10px] font-semibold tracking-[0.14em] text-dark-400 uppercase\"> </p> <p> </p></div>"), ci = Y("<span><!> </span>"), li = Y("<p class=\"text-xs text-dark-200\"><span class=\"text-dark-400\"> </span> <span class=\"font-medium text-primary-100\"> </span></p>"), ui = Y("<div class=\"overflow-hidden rounded-xl border border-dark-600 bg-dark-800/40 transition-all duration-200 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20\"><div class=\"grid grid-cols-5 border-b border-dark-600/80 bg-dark-900/40 px-2 py-1.5\"></div> <div class=\"relative flex items-center gap-2 px-3 py-2\"><!> <input autocomplete=\"off\"/> <!></div> <div class=\"flex flex-wrap items-center justify-between gap-2 border-t border-dark-600/80 bg-dark-900/30 px-3 py-2\"><div class=\"min-w-40 max-w-xs flex-1\"><!></div> <!></div></div>");
function di(e, t) {
	u(t, !0);
	let n = k(t, "value", 3, ""), a = k(t, "placeholder", 3, "0 9 * * 1-5"), s = k(t, "presets", 3, ae), c = k(t, "validLabel", 3, "Valid expression"), l = k(t, "invalidLabel", 3, "Invalid cron expression"), d = k(t, "nextRunLabel", 3, "Next run"), f = k(t, "presetsPlaceholder", 3, "Presets"), p = Fe(), m = new Hr(() => n(), 250), _ = K(() => ({
		minute: t.fieldLabels?.minute ?? "Minute",
		hour: t.fieldLabels?.hour ?? "Hour",
		day: t.fieldLabels?.day ?? "Day",
		month: t.fieldLabels?.month ?? "Month",
		weekday: t.fieldLabels?.weekday ?? "Weekday"
	})), y = K(() => ce(n())), b = K(() => oe(m.current)), C = K(() => ie(h(b))), w = K(() => !!h(b) && !h(C)), T = K(() => h(C) === "Invalid cron expression" ? l() : h(C)), D = K(() => h(w) ? se(h(b)) : void 0), O = K(() => s().map((e) => ({
		value: e.value,
		label: e.label
	}))), j = {
		minute: "text-sky-300",
		hour: "text-violet-300",
		day: "text-emerald-300",
		month: "text-amber-300",
		weekday: "text-rose-300"
	}, N = (e) => {
		t.oninput?.(e);
	};
	function F(e) {
		t.oninput?.({ currentTarget: { value: e } });
	}
	var L = ui(), R = E(L);
	o(R, 22, () => le, (e) => e, (e, t, n) => {
		var r = si(), a = E(r), o = E(a, !0);
		v(a);
		var s = i(a, 2), c = E(s, !0);
		v(s), v(r), S((e, i) => {
			P(r, 1, e), W(o, h(_)[t]), P(s, 1, i), W(c, h(y)[h(n)] || "—");
		}, [() => q(Q("px-1 text-center", h(n) < 4 && "border-r border-dark-700/50")), () => q(Q("mt-0.5 truncate font-mono text-xs", j[t]))]), M(e, r);
	}), v(R);
	var z = i(R, 2), B = E(z);
	Z(B, {
		icon: "ri:time-line",
		class: "size-5 shrink-0 text-dark-400"
	});
	var V = i(B, 2);
	g(V), r(V, "spellcheck", !1);
	var H = i(V, 2), U = (e) => {
		var t = ci(), n = E(t);
		{
			let e = K(() => h(w) ? "ri:check-line" : "ri:alert-line");
			Z(n, {
				get icon() {
					return h(e);
				},
				class: "size-4"
			});
		}
		var r = i(n);
		v(t), S((e) => {
			P(t, 1, e), W(r, ` ${(h(w) ? c() : h(T)) ?? ""}`);
		}, [() => q(Q("inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium", h(w) ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"))]), M(e, t);
	};
	I(H, (e) => {
		h(b) && e(U);
	}), v(z);
	var G = i(z, 2), J = E(G), Y = E(J), ee = () => "", X = (e) => {
		e && F(e);
	};
	oi(Y, {
		type: "single",
		get placeholder() {
			return f();
		},
		get items() {
			return h(O);
		},
		get value() {
			return ee();
		},
		set value(e) {
			X(e);
		}
	}), v(J);
	var te = i(J, 2), re = (e) => {
		var t = li(), n = E(t), r = E(n);
		v(n);
		var a = i(n, 2), o = E(a, !0);
		v(a), v(t), S(() => {
			W(r, `${d() ?? ""}:`), W(o, h(D));
		}), M(e, t);
	};
	I(te, (e) => {
		h(D) && e(re);
	}), v(G), v(L), S((e) => {
		r(V, "id", p), P(V, 1, e), r(V, "placeholder", a()), V.required = t.required, A(V, n() ?? "");
	}, [() => q(Q("min-w-0 flex-1 border-0 bg-transparent font-mono text-sm text-dark-50 outline-none", We.md, "px-0 py-0"))]), ne("input", V, N), M(e, L), x();
}
X(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-cron-expression.svelte
var fi = Y("<button><!> <span> </span> <!> <!></button>"), pi = Y("<p class=\"mb-3 text-xs font-semibold tracking-wide text-dark-200 uppercase\"> </p> <!>", 1), mi = Y("<!> <!>", 1), hi = Y("<p class=\"text-sm text-red-400\"> </p>"), gi = Y("<div><!> <!> <!></div>");
function _i(e, t) {
	u(t, !0);
	let n = k(t, "id", 19, Fe), r = k(t, "value", 3, ""), a = k(t, "placeholder", 3, "0 9 * * 1-5"), o = k(t, "validLabel", 3, "Valid expression"), s = k(t, "invalidLabel", 3, "Invalid cron expression"), c = k(t, "nextRunLabel", 3, "Next run"), l = k(t, "presetsPlaceholder", 3, "Presets"), d = k(t, "editorTitle", 3, "Cron expression"), f = k(t, "emptyLabel", 3, "Configure cron expression"), p = k(t, "editAriaLabel", 3, "Edit cron expression"), m = N(!1), g = K(() => oe(r())), y = K(() => ie(h(g))), b = K(() => !!h(g) && !h(y)), C = K(() => h(g) || f()), w = K(() => !h(g));
	var O = gi(), A = E(O), j = (e) => {
		dr(e, {
			get for() {
				return n();
			},
			children: (e, n) => {
				D();
				var r = F();
				S(() => W(r, t.label)), M(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	I(A, (e) => {
		t.label && e(j);
	});
	var L = i(A, 2);
	Tt(L, {
		get open() {
			return h(m);
		},
		set open(e) {
			G(m, e, !0);
		},
		children: (e, u) => {
			var f = mi(), y = _(f);
			Et(y, {
				child: (e, r) => {
					let a = () => r?.().props;
					var o = fi();
					T(o, (e) => ({
						id: n(),
						type: "button",
						...a(),
						"aria-label": p(),
						class: e
					}), [() => Q("flex w-full items-center gap-2 rounded-xl border bg-dark-700 text-left outline-none transition-all", We.md, "focus-visible:ring-2", t.error ? "border-red-500 focus-visible:border-red-500/50 focus-visible:ring-red-500" : "border-dark-500 focus-visible:border-primary/50 focus-visible:ring-primary")]);
					var s = E(o);
					Z(s, {
						icon: "ri:time-line",
						class: "size-5 shrink-0 text-dark-400"
					});
					var c = i(s, 2), l = E(c, !0);
					v(c);
					var u = i(c, 2), d = (e) => {
						{
							let t = K(() => h(b) ? "ri:check-line" : "ri:alert-line"), n = K(() => Q("size-5 shrink-0", h(b) ? "text-green-400" : "text-amber-400"));
							Z(e, {
								get icon() {
									return h(t);
								},
								get class() {
									return h(n);
								}
							});
						}
					};
					I(u, (e) => {
						h(g) && e(d);
					});
					var f = i(u, 2);
					{
						let e = K(() => Q("size-5 shrink-0 text-dark-300 transition-transform", h(m) && "rotate-180"));
						Z(f, {
							icon: "ri:arrow-down-s-line",
							get class() {
								return h(e);
							}
						});
					}
					v(o), S((e) => {
						P(c, 1, e), W(l, h(C));
					}, [() => q(Q("min-w-0 flex-1 truncate text-sm", h(w) ? "font-sans text-dark-300" : "font-mono text-dark-50"))]), M(e, o);
				},
				$$slots: { child: !0 }
			}), wt(i(y, 2), {
				align: "start",
				class: "w-[min(28rem,calc(100vw-2rem))] p-3",
				children: (e, n) => {
					var u = pi(), f = _(u), p = E(f, !0);
					v(f), di(i(f, 2), {
						get value() {
							return r();
						},
						get required() {
							return t.required;
						},
						get placeholder() {
							return a();
						},
						get presets() {
							return t.presets;
						},
						get fieldLabels() {
							return t.fieldLabels;
						},
						get validLabel() {
							return o();
						},
						get invalidLabel() {
							return s();
						},
						get nextRunLabel() {
							return c();
						},
						get presetsPlaceholder() {
							return l();
						},
						get oninput() {
							return t.oninput;
						}
					}), S(() => W(p, d())), M(e, u);
				},
				$$slots: { default: !0 }
			}), M(e, f);
		},
		$$slots: { default: !0 }
	});
	var R = i(L, 2), z = (e) => {
		var n = hi(), r = E(n, !0);
		v(n), S(() => W(r, t.error)), M(e, n);
	};
	I(R, (e) => {
		t.error && e(z);
	}), v(O), S((e) => P(O, 1, e), [() => q(Q("relative grid w-full gap-2", t.class))]), M(e, O), x();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text.svelte
var vi = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"label",
	"id",
	"prependIcon",
	"appendIcon",
	"error",
	"size"
]), yi = Y("<span><!></span>"), bi = Y("<button type=\"button\"><!></button>"), xi = Y("<p class=\"text-sm text-red-400\"> </p>"), Si = Y("<div><!> <div><!> <input/> <!> <!></div> <!></div>");
function Ci(e, t) {
	u(t, !0);
	let n = k(t, "id", 19, Fe), a = k(t, "size", 3, "md"), o = U(t, vi), s = N(!1), c = K(() => t.type === "password"), l = K(() => !!t.appendIcon || h(c)), d = We;
	var f = Si(), p = E(f), m = (e) => {
		dr(e, {
			get for() {
				return n();
			},
			children: (e, n) => {
				D();
				var r = F();
				S(() => W(r, t.label)), M(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	I(p, (e) => {
		t.label && e(m);
	});
	var g = i(p, 2), _ = E(g), y = (e) => {
		var n = yi();
		Z(E(n), {
			get icon() {
				return t.prependIcon;
			},
			get class() {
				return ze[a()];
			}
		}), v(n), S((e) => P(n, 1, e), [() => q(Q("grid h-full place-items-center rounded-l-xl border border-dark-500 bg-dark-700 text-dark-50", Re[a()]))]), M(e, n);
	};
	I(_, (e) => {
		t.prependIcon && e(y);
	});
	var b = i(_, 2);
	T(b, (e) => ({
		id: n(),
		class: e,
		"aria-invalid": t.error ? !0 : void 0,
		...o,
		type: h(c) ? h(s) ? "text" : "password" : t.type
	}), [() => Q("min-w-0 w-full truncate border bg-dark-700 text-dark-50 outline-none", d[a()], t.error ? "border-red-500" : "border-dark-500", {
		"rounded-l-none rounded-r-xl border-l-0": t.prependIcon,
		"rounded-l-xl rounded-r-none border-r-0": h(l),
		"rounded-xl": !t.prependIcon && !h(l)
	})], void 0, void 0, void 0, !0);
	var C = i(b, 2), w = (e) => {
		var n = yi();
		Z(E(n), {
			get icon() {
				return t.appendIcon;
			},
			get class() {
				return ze[a()];
			}
		}), v(n), S((e) => P(n, 1, e), [() => q(Q("grid h-full place-items-center text-dark-50", Re[a()], h(c) ? "border-y border-r-0 border-l border-dark-500" : "rounded-r-xl border border-l-0 border-dark-500"))]), M(e, n);
	};
	I(C, (e) => {
		t.appendIcon && e(w);
	});
	var O = i(C, 2), A = (e) => {
		var t = bi(), n = E(t);
		{
			let e = K(() => h(s) ? "mdi:eye-off-outline" : "mdi:eye-outline");
			Z(n, {
				get icon() {
					return h(e);
				},
				get class() {
					return ze[a()];
				}
			});
		}
		v(t), S((e) => {
			P(t, 1, e), r(t, "aria-label", h(s) ? "Hide password" : "Show password"), r(t, "aria-pressed", h(s));
		}, [() => q(Q("grid h-full place-items-center rounded-r-xl border border-dark-500 border-l-dark-600 bg-dark-700 text-dark-50", Re[a()]))]), ne("click", t, () => G(s, !h(s))), M(e, t);
	};
	I(O, (e) => {
		h(c) && e(A);
	}), v(g);
	var j = i(g, 2), L = (e) => {
		var n = xi(), r = E(n, !0);
		v(n), S(() => W(r, t.error)), M(e, n);
	};
	I(j, (e) => {
		t.error && e(L);
	}), v(f), S((e, t) => {
		P(f, 1, e), P(g, 1, t);
	}, [() => q(Q("relative grid w-full min-w-0 gap-2")), () => q(Q("relative flex w-full min-w-0 items-center rounded-xl", "has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500", t.class))]), M(e, f), x();
}
X(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-file-path.svelte
var wi = Y("<div class=\"grid gap-2\"><div class=\"flex items-end gap-2\"><div class=\"min-w-0 flex-1\"><!></div> <!></div></div>");
function Ti(e, t) {
	u(t, !0);
	let n = k(t, "value", 3, ""), r = k(t, "browseLabel", 3, "Browse"), a = k(t, "emptyFileLabel", 3, "No file selected"), o = k(t, "emptyFolderLabel", 3, "No folder selected"), s = N(!1);
	async function c() {
		if (!h(s)) {
			G(s, !0);
			try {
				let e = await t.onBrowse();
				if (!e) return;
				t.onValueChange?.(e);
			} finally {
				G(s, !1);
			}
		}
	}
	var l = wi(), d = E(l), f = E(d), p = E(f);
	{
		let e = K(() => t.placeholder ?? (t.mode === "folder" ? o() : a()));
		Ci(p, {
			get label() {
				return t.label;
			},
			get placeholder() {
				return h(e);
			},
			get required() {
				return t.required;
			},
			get error() {
				return t.error;
			},
			readonly: !0,
			get value() {
				return n();
			}
		});
	}
	v(f), Ot(i(f, 2), {
		type: "button",
		variant: "outline",
		onclick: c,
		get disabled() {
			return h(s);
		},
		get isLoading() {
			return h(s);
		},
		icon: "ri:folder-open-line",
		children: (e, t) => {
			D();
			var n = F();
			S(() => W(n, r())), M(e, n);
		},
		$$slots: { default: !0 }
	}), v(d), v(l), M(e, l), x();
}
//#endregion
//#region ../ui/src/lib/components/input/input-hotkey.svelte
var Ei = Y("<p class=\"text-sm text-red-400\"> </p>"), Di = Y("<div class=\"grid w-full min-w-0 gap-2\"><!> <button type=\"button\"><!> <span><!></span></button> <!></div>");
function Oi(e, t) {
	u(t, !0);
	let n = k(t, "placeholder", 3, "Click and press keys…");
	k(t, "required", 3, !1);
	let a = k(t, "value", 15, ""), o = k(t, "captureLabel", 3, "Press shortcut…"), s = k(t, "emptyLabel", 3, "Not set"), c = Fe(), l = N(!1);
	function d(e) {
		if (e.startsWith("Key")) return e.slice(3);
		if (e.startsWith("Digit")) return e.slice(5);
		let t = {
			Space: "Space",
			Enter: "Enter",
			Escape: "Escape",
			Tab: "Tab",
			Backspace: "Backspace",
			Delete: "Delete",
			ArrowUp: "ArrowUp",
			ArrowDown: "ArrowDown",
			ArrowLeft: "ArrowLeft",
			ArrowRight: "ArrowRight",
			Home: "Home",
			End: "End",
			PageUp: "PageUp",
			PageDown: "PageDown"
		};
		return t[e] ? t[e] : /^F\d{1,2}$/.test(e) ? e : null;
	}
	function f(e) {
		if (e.key === "Control" || e.key === "Shift" || e.key === "Alt" || e.key === "Meta") return null;
		let t = [];
		(e.ctrlKey || e.metaKey) && t.push("CommandOrControl"), e.altKey && t.push("Alt"), e.shiftKey && t.push("Shift");
		let n = d(e.code);
		return n ? [...t, n].join("+") : null;
	}
	function p(e) {
		return e.trim() ? e.split("+").map((e) => e === "CommandOrControl" ? "Ctrl" : e).join(" + ") : "";
	}
	let m = K(() => a().trim() ? p(a()) : "");
	function g() {
		G(l, !0);
	}
	function _() {
		G(l, !1);
	}
	let y = (e) => {
		if (!h(l)) return;
		if (e.preventDefault(), e.stopPropagation(), e.key === "Escape") {
			_();
			return;
		}
		let t = f(e);
		t && (a(t), _());
	}, b = () => {
		_();
	};
	var C = Di(), w = E(C), T = (e) => {
		dr(e, {
			get for() {
				return c;
			},
			children: (e, n) => {
				D();
				var r = F();
				S(() => W(r, t.label)), M(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	I(w, (e) => {
		t.label && e(T);
	});
	var O = i(w, 2), A = E(O);
	Z(A, {
		icon: "ri:keyboard-line",
		class: "size-4 shrink-0 text-dark-200"
	});
	var L = i(A, 2), R = E(L), z = (e) => {
		var t = F();
		S(() => W(t, o())), M(e, t);
	}, B = (e) => {
		var t = F();
		S(() => W(t, h(m))), M(e, t);
	}, V = (e) => {
		var t = F();
		S(() => W(t, n() || s())), M(e, t);
	};
	I(R, (e) => {
		h(l) ? e(z) : h(m) ? e(B, 1) : e(V, -1);
	}), v(L), v(O);
	var H = i(O, 2), U = (e) => {
		var n = Ei(), r = E(n, !0);
		v(n), S(() => W(r, t.error)), M(e, n);
	};
	I(H, (e) => {
		t.error && e(U);
	}), v(C), S((e, t) => {
		r(O, "id", c), P(O, 1, e), P(L, 1, t);
	}, [() => q(Q("flex h-10 w-full items-center gap-2 rounded-xl border bg-dark-800 px-4 text-left text-sm", "focus:ring-2 focus:ring-primary focus:outline-none", h(l) && "ring-2 ring-primary", t.error ? "border-red-500" : "border-dark-500")), () => q(Q("truncate font-mono", !h(m) && "text-dark-300"))]), ne("click", O, g), ne("keydown", O, y), j("blur", O, b), M(e, C), x();
}
X(["click", "keydown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-key-value-list.svelte
var ki = Y("<div class=\"grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] items-center gap-2\"><!> <!> <!></div>"), Ai = Y("<p class=\"text-sm text-destructive-50\"> </p>"), ji = Y("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function Mi(e, t) {
	u(t, !0);
	let n = k(t, "entries", 31, () => H([])), a = k(t, "keyPlaceholder", 3, "KEY"), s = k(t, "valuePlaceholder", 3, "value"), c = k(t, "id", 19, Fe), l = k(t, "addLabel", 3, "Add"), d = k(t, "removeLabel", 3, "Remove"), p = N(H([]));
	function m(e) {
		return e.map((e) => ({
			id: crypto.randomUUID(),
			key: e.key,
			value: e.value
		}));
	}
	function g() {
		n(h(p).map((e) => ({
			key: e.key,
			value: e.value
		})));
	}
	function _(e, t) {
		G(p, h(p).map((n) => n.id === e ? {
			...n,
			...t
		} : n), !0), g();
	}
	function y(e) {
		G(p, h(p).filter((t) => t.id !== e), !0), g();
	}
	function b() {
		G(p, [...h(p), {
			id: crypto.randomUUID(),
			key: "",
			value: ""
		}], !0), g();
	}
	f(() => {
		let e = n(), t = h(p).map((e) => ({
			key: e.key,
			value: e.value
		}));
		e.length === t.length && e.every((e, n) => e.key === t[n]?.key && e.value === t[n]?.value) || G(p, m(e), !0);
	});
	var C = ji(), w = E(C), T = (e) => {
		{
			let n = K(() => `${c()}-label`);
			dr(e, {
				get id() {
					return h(n);
				},
				children: (e, n) => {
					D();
					var r = F();
					S(() => W(r, t.label)), M(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	I(w, (e) => {
		t.label && e(T);
	});
	var O = i(w, 2), A = E(O);
	o(A, 17, () => h(p), (e) => e.id, (e, t) => {
		var n = ki(), r = E(n);
		{
			let e = K(() => `${c()}-${h(t).id}-key`);
			Ci(r, {
				get id() {
					return h(e);
				},
				get placeholder() {
					return a();
				},
				get value() {
					return h(t).key;
				},
				oninput: (e) => _(h(t).id, { key: e.currentTarget.value })
			});
		}
		var o = i(r, 2);
		{
			let e = K(() => `${c()}-${h(t).id}-value`);
			Ci(o, {
				get id() {
					return h(e);
				},
				get placeholder() {
					return s();
				},
				get value() {
					return h(t).value;
				},
				oninput: (e) => _(h(t).id, { value: e.currentTarget.value })
			});
		}
		Ot(i(o, 2), {
			variant: "ghost",
			size: "icon",
			type: "button",
			get "aria-label"() {
				return d();
			},
			onclick: () => y(h(t).id),
			children: (e, t) => {
				Z(e, {
					icon: "ri:delete-bin-line",
					class: "size-5",
					"aria-hidden": "true"
				});
			},
			$$slots: { default: !0 }
		}), v(n), M(e, n);
	}), Ot(i(A, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: b,
		children: (e, t) => {
			D();
			var n = F();
			S(() => W(n, l())), M(e, n);
		},
		$$slots: { default: !0 }
	}), v(O);
	var j = i(O, 2), L = (e) => {
		var n = Ai(), r = E(n, !0);
		v(n), S(() => W(r, t.error)), M(e, n);
	};
	I(j, (e) => {
		t.error && e(L);
	}), v(C), S((e) => {
		P(C, 1, e), r(C, "aria-labelledby", t.label ? `${c()}-label` : void 0);
	}, [() => q(Q("grid w-full gap-2", t.class))]), M(e, C), x();
}
//#endregion
//#region ../ui/src/lib/components/input/input-one-of.svelte
var Ni = Y("<span class=\"text-red-400\" aria-hidden=\"true\">*</span>"), Pi = Y(" <!>", 1), Fi = Y("<button type=\"button\" role=\"tab\"> </button>"), Ii = Y("<p class=\"text-sm text-red-400\"> </p>"), Li = Y("<div><!> <div role=\"tablist\"></div> <div class=\"min-w-0\" role=\"tabpanel\"><!></div> <!></div>");
function Ri(e, t) {
	u(t, !0);
	let n = k(t, "value", 31, () => H({
		variant: "",
		values: {}
	})), a = K(() => n().variant || t.variants[0]?.id || "");
	function s(e) {
		n({
			...n(),
			variant: e
		});
	}
	function c(e, t) {
		n({
			variant: n().variant || e,
			values: {
				...n().values,
				[e]: t
			}
		});
	}
	var l = Li(), d = E(l), f = (e) => {
		dr(e, {
			children: (e, n) => {
				D();
				var r = Pi(), a = _(r), o = i(a), s = (e) => {
					M(e, Ni());
				};
				I(o, (e) => {
					t.required && e(s);
				}), S(() => W(a, `${t.label ?? ""} `)), M(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	I(d, (e) => {
		t.label && e(f);
	});
	var p = i(d, 2);
	o(p, 21, () => t.variants, (e) => e.id, (e, t) => {
		var n = Fi(), i = E(n, !0);
		v(n), S((e) => {
			r(n, "id", `tab-${h(t).id}`), r(n, "aria-selected", h(a) === h(t).id), r(n, "aria-controls", `panel-${h(t).id}`), P(n, 1, e), W(i, h(t).label);
		}, [() => q(Q("rounded-lg px-3 py-1.5 text-sm font-medium transition-colors", h(a) === h(t).id ? "bg-dark-600 text-dark-50" : "text-dark-200 hover:bg-dark-800 hover:text-dark-50"))]), ne("click", n, () => s(h(t).id)), M(e, n);
	}), v(p);
	var m = i(p, 2);
	y(E(m), () => t.panel, () => ({
		variantId: h(a),
		value: n().values[h(a)],
		setValue: (e) => c(h(a), e)
	})), v(m);
	var g = i(m, 2), b = (e) => {
		var n = Ii(), r = E(n, !0);
		v(n), S(() => W(r, t.error)), M(e, n);
	};
	I(g, (e) => {
		t.error && e(b);
	}), v(l), S((e, n) => {
		P(l, 1, e), P(p, 1, n), r(p, "aria-label", t.label), r(m, "id", `panel-${h(a)}`), r(m, "aria-labelledby", `tab-${h(a)}`);
	}, [() => q(Q("grid w-full min-w-0 gap-2")), () => q(Q("inline-flex w-fit gap-0.5 rounded-xl border border-dark-600 bg-dark-800 p-1", t.error && "border-red-500"))]), M(e, l), x();
}
X(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-select-text.svelte
var zi = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"label",
	"items",
	"selectPlaceholder",
	"loadingPlaceholder",
	"placeholder",
	"variables",
	"id",
	"class",
	"selectClass",
	"contentProps",
	"error",
	"value"
]), Bi = Y("<!> <!>", 1), Vi = Y("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Hi = Y(" <!>", 1), Ui = Y("<!> <!> <!>", 1), Wi = Y("<div class=\"flex flex-wrap gap-1.5\"></div>"), Gi = Y("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), Ki = Y("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), qi = Y("<p class=\"text-sm text-red-400\"> </p>"), Ji = Y("<div><!> <div><!> <div class=\"min-w-0 flex-1\"><input/></div></div> <!> <!> <!></div>");
function Yi(e, t) {
	u(t, !0);
	let n = k(t, "variables", 19, () => []), l = k(t, "id", 19, Fe), d = k(t, "value", 31, () => H({
		type: "",
		value: ""
	})), f = U(t, zi), p = K(() => t.selectPlaceholder ?? "Select"), m = K(() => t.loadingPlaceholder ?? "Loading..."), g = Jr(() => t.items), y = N(null), b = N(!1), C = N(""), w = N(0), O = K(() => {
		if (!h(C)) return n();
		let e = h(C).toLowerCase();
		return n().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function A() {
		if (!h(y)) return null;
		let e = d().value, t = h(y).selectionStart ?? e.length, n = e.slice(0, t), r = n.lastIndexOf("{");
		if (r === -1) return null;
		let i = n.slice(r + 1);
		return i.includes("}") ? null : {
			start: r,
			partial: i
		};
	}
	function j() {
		let e = A();
		if (!e || n().length === 0) {
			G(b, !1), G(C, ""), G(w, 0);
			return;
		}
		G(C, e.partial, !0), G(b, h(O).length > 0), G(w, 0);
	}
	function R(e) {
		let t = A();
		if (!t || !h(y)) return;
		let n = d().value, r = h(y).selectionStart ?? n.length, i = n.slice(0, t.start), a = n.slice(r);
		d({
			...d(),
			value: `${i}{${e}}${a}`
		}), G(b, !1), G(C, ""), queueMicrotask(() => {
			if (!h(y)) return;
			let t = i.length + e.length + 2;
			h(y).focus(), h(y).setSelectionRange(t, t);
		});
	}
	function z(e) {
		let t = d().value;
		if (!h(y)) {
			d({
				...d(),
				value: `${t}{${e}}`
			});
			return;
		}
		let n = h(y).selectionStart ?? t.length, r = t.slice(0, n), i = t.slice(n);
		d({
			...d(),
			value: `${r}{${e}}${i}`
		}), queueMicrotask(() => {
			let t = r.length + e.length + 2;
			h(y)?.focus(), h(y)?.setSelectionRange(t, t);
		});
	}
	let B = () => {
		j();
	}, V = (e) => {
		if (!(!h(b) || h(O).length === 0)) {
			if (e.key === "ArrowDown") {
				e.preventDefault(), G(w, (h(w) + 1) % h(O).length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault(), G(w, (h(w) - 1 + h(O).length) % h(O).length);
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				let t = h(O)[h(w)];
				t && (e.preventDefault(), R(t.key));
				return;
			}
			e.key === "Escape" && G(b, !1);
		}
	}, Y = () => {
		setTimeout(() => {
			G(b, !1);
		}, 120);
	};
	var ee = Ji(), X = E(ee), te = (e) => {
		dr(e, {
			get for() {
				return l();
			},
			children: (e, n) => {
				D();
				var r = F();
				S(() => W(r, t.label)), M(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	I(X, (e) => {
		t.label && e(te);
	});
	var re = i(X, 2), ie = E(re);
	a(ie, () => Wn, (e, n) => {
		n(e, {
			type: "single",
			get items() {
				return g.items;
			},
			get value() {
				return d().type;
			},
			set value(e) {
				d(d().type = e, !0);
			},
			children: (e, n) => {
				var r = Bi(), s = _(r);
				{
					let e = K(() => Q("flex shrink-0 cursor-pointer items-center justify-between gap-2 rounded-l-xl border border-r-0 bg-dark-700 text-dark-50 outline-none", We.md, t.error ? "border-red-500" : "border-dark-500", t.selectClass));
					a(s, () => Xn, (t, n) => {
						n(t, {
							get class() {
								return h(e);
							},
							children: (e, t) => {
								var n = Bi(), r = _(n);
								{
									let e = K(() => g.loading ? h(m) : h(p));
									a(r, () => qn, (t, n) => {
										n(t, {
											get placeholder() {
												return h(e);
											},
											class: "truncate data-placeholder:text-dark-300"
										});
									});
								}
								Z(i(r, 2), {
									icon: "ri:expand-up-down-line",
									class: "size-5 shrink-0 text-dark-300"
								}), M(e, n);
							},
							$$slots: { default: !0 }
						});
					});
				}
				a(i(s, 2), () => vt, (e, n) => {
					n(e, {
						children: (e, n) => {
							var r = L(), s = _(r);
							{
								let e = K(() => t.contentProps?.sideOffset ?? 4), n = K(() => Q("z-50 max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", t.contentProps?.class));
								a(s, () => bn, (r, s) => {
									s(r, J(() => t.contentProps, {
										get sideOffset() {
											return h(e);
										},
										get class() {
											return h(n);
										},
										children: (e, t) => {
											var n = Ui(), r = _(n);
											a(r, () => Ln, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = i(r, 2);
											a(s, () => kn, (e, t) => {
												t(e, {
													children: (e, t) => {
														var n = L(), r = _(n), s = (e) => {
															var t = Vi(), n = E(t, !0);
															v(t), S(() => W(n, h(m))), M(e, t);
														}, c = (e) => {
															var t = L();
															o(_(t), 17, () => g.items, ({ value: e, label: t, disabled: n }) => e, (e, t) => {
																let n = () => h(t).value, r = () => h(t).label, o = () => h(t).disabled;
																var s = L(), c = _(s);
																{
																	let e = (e, t) => {
																		let n = () => t?.().selected;
																		D();
																		var a = Hi(), o = _(a), s = i(o), c = (e) => {
																			Z(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		I(s, (e) => {
																			n() && e(c);
																		}), S(() => W(o, `${r() ?? ""} `)), M(e, a);
																	}, t = K(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	a(c, () => Tn, (i, a) => {
																		a(i, {
																			get value() {
																				return n();
																			},
																			get label() {
																				return r();
																			},
																			get disabled() {
																				return o();
																			},
																			get class() {
																				return h(t);
																			},
																			children: e,
																			$$slots: { default: !0 }
																		});
																	});
																}
																M(e, s);
															}), M(e, t);
														};
														I(r, (e) => {
															g.loading ? e(s) : e(c, -1);
														}), M(e, n);
													},
													$$slots: { default: !0 }
												});
											}), a(i(s, 2), () => Nn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), M(e, n);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							M(e, r);
						},
						$$slots: { default: !0 }
					});
				}), M(e, r);
			},
			$$slots: { default: !0 }
		});
	});
	var ae = i(ie, 2), oe = E(ae);
	T(oe, (e) => ({
		id: l(),
		placeholder: t.placeholder,
		class: e,
		"aria-invalid": t.error ? !0 : void 0,
		oninput: n().length > 0 ? B : void 0,
		onkeydown: n().length > 0 ? V : void 0,
		onblur: n().length > 0 ? Y : void 0,
		onfocus: n().length > 0 ? j : void 0,
		onclick: n().length > 0 ? j : void 0,
		...f
	}), [() => Q("min-w-0 w-full truncate rounded-r-xl border bg-dark-700 text-dark-50 outline-none", We.md, t.error ? "border-red-500" : "border-dark-500")], void 0, void 0, void 0, !0), s(oe, (e) => G(y, e), () => h(y)), v(ae), v(re);
	var se = i(re, 2), ce = (e) => {
		var t = Wi();
		o(t, 21, n, (e) => e.key, (e, t) => {
			Ot(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return h(t).label;
				},
				onclick: () => z(h(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					D();
					var r = F();
					S(() => W(r, `{${h(t).key}}`)), M(e, r);
				},
				$$slots: { default: !0 }
			});
		}), v(t), M(e, t);
	};
	I(se, (e) => {
		n().length > 0 && e(ce);
	});
	var le = i(se, 2), ue = (e) => {
		var t = Ki();
		o(t, 23, () => h(O), (e) => e.key, (e, t, n) => {
			var a = Gi(), o = E(a), s = E(o), c = E(s, !0);
			v(s);
			var l = i(s, 2), u = E(l, !0);
			v(l), v(o), v(a), S((e) => {
				r(o, "aria-selected", h(n) === h(w)), P(o, 1, e), W(c, `{${h(t).key}}`), W(u, h(t).label);
			}, [() => q(Q("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", h(n) === h(w) && "bg-dark-700"))]), ne("mousedown", o, (e) => {
				e.preventDefault(), R(h(t).key);
			}), M(e, a);
		}), v(t), M(e, t);
	};
	I(le, (e) => {
		h(b) && h(O).length > 0 && e(ue);
	});
	var $ = i(le, 2), de = (e) => {
		var n = qi(), r = E(n, !0);
		v(n), S(() => W(r, t.error)), M(e, n);
	};
	I($, (e) => {
		t.error && e(de);
	}), v(ee), S((e, t) => {
		P(ee, 1, e), P(re, 1, t);
	}, [() => q(Q("relative grid w-full min-w-0 gap-2", t.class)), () => q(Q("flex w-full min-w-0 items-stretch rounded-xl has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500"))]), c(oe, () => d().value, (e) => d(d().value = e, !0)), M(e, ee), x();
}
X(["mousedown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-slider.svelte
var Xi = Y("<div class=\"flex items-center justify-between gap-4\"><!> <span class=\"text-sm text-dark-100\"> </span></div>"), Zi = Y("<p class=\"text-sm text-red-500\"> </p>"), Qi = Y("<div><!> <input type=\"range\"/> <!></div>");
function $i(e, t) {
	u(t, !0);
	let n = k(t, "id", 19, Fe), a = k(t, "min", 3, 0), o = k(t, "max", 3, 100), s = k(t, "step", 3, 1), l = k(t, "value", 15, 0);
	var d = Qi(), f = E(d), p = (e) => {
		var r = Xi(), a = E(r);
		dr(a, {
			get for() {
				return n();
			},
			children: (e, n) => {
				D();
				var r = F();
				S(() => W(r, t.label)), M(e, r);
			},
			$$slots: { default: !0 }
		});
		var o = i(a, 2), s = E(o);
		v(o), v(r), S(() => W(s, `${l() ?? ""}%`)), M(e, r);
	};
	I(f, (e) => {
		t.label && e(p);
	});
	var m = i(f, 2);
	g(m);
	var h = i(m, 2), _ = (e) => {
		var n = Zi(), r = E(n, !0);
		v(n), S(() => W(r, t.error)), M(e, n);
	};
	I(h, (e) => {
		t.error && e(_);
	}), v(d), S((e, t) => {
		P(d, 1, e), r(m, "id", n()), r(m, "min", a()), r(m, "max", o()), r(m, "step", s()), P(m, 1, t);
	}, [() => q(Q("grid w-full gap-2")), () => q(Q("h-2 w-full cursor-pointer appearance-none rounded-full bg-dark-600 accent-primary", t.error && "ring-1 ring-red-500"))]), ne("input", m, () => t.onvaluechange?.(l())), c(m, l), M(e, d), x();
}
X(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-switch.svelte
var ea = Y("<p class=\"text-sm text-red-400\"> </p>"), ta = Y("<div><div class=\"flex items-center gap-3\"><!> <!></div> <!></div>");
function na(e, t) {
	u(t, !0);
	let n = k(t, "checked", 15, !1), r = k(t, "id", 19, Fe);
	var o = ta(), s = E(o), c = E(s);
	{
		let e = K(() => t.label ? `${r()}-label` : void 0), i = K(() => t.error ? !0 : void 0), o = K(() => Q("inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors outline-none", "data-[state=checked]:bg-primary/15", t.error ? "data-[state=unchecked]:bg-red-500/30" : "data-[state=unchecked]:bg-dark-600", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
		a(c, () => or, (t, s) => {
			s(t, {
				get id() {
					return r();
				},
				get "aria-labelledby"() {
					return h(e);
				},
				get "aria-invalid"() {
					return h(i);
				},
				get class() {
					return h(o);
				},
				get checked() {
					return n();
				},
				set checked(e) {
					n(e);
				},
				children: (e, t) => {
					var n = L(), r = _(n);
					{
						let e = K(() => Q("pointer-events-none block size-5 shrink-0 rounded-full bg-white transition-transform", "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0", "data-[state=checked]:bg-primary"));
						a(r, () => lr, (t, n) => {
							n(t, { get class() {
								return h(e);
							} });
						});
					}
					M(e, n);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var l = i(c, 2), d = (e) => {
		dr(e, {
			get id() {
				return `${r() ?? ""}-label`;
			},
			get for() {
				return r();
			},
			class: "cursor-pointer",
			children: (e, n) => {
				D();
				var r = F();
				S(() => W(r, t.label)), M(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	I(l, (e) => {
		t.label && e(d);
	}), v(s);
	var f = i(s, 2), p = (e) => {
		var n = ea(), r = E(n, !0);
		v(n), S(() => W(r, t.error)), M(e, n);
	};
	I(f, (e) => {
		t.error && e(p);
	}), v(o), S((e) => P(o, 1, e), [() => q(Q("grid gap-2", t.class))]), M(e, o), x();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-list.svelte
var ra = Y("<div class=\"flex items-center gap-2\"><!> <!></div>"), ia = Y("<p class=\"text-sm text-destructive-50\"> </p>"), aa = Y("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function oa(e, t) {
	u(t, !0);
	let n = k(t, "values", 31, () => H([])), a = k(t, "id", 19, Fe), s = k(t, "addLabel", 3, "Add"), c = k(t, "removeLabel", 3, "Remove"), l = N(H([]));
	function d(e) {
		return e.map((e) => ({
			id: crypto.randomUUID(),
			value: e
		}));
	}
	function p() {
		n(h(l).map((e) => e.value));
	}
	function m(e, t) {
		G(l, h(l).map((n) => n.id === e ? {
			...n,
			value: t
		} : n), !0), p();
	}
	function g(e) {
		G(l, h(l).filter((t) => t.id !== e), !0), p();
	}
	function _() {
		G(l, [...h(l), {
			id: crypto.randomUUID(),
			value: ""
		}], !0), p();
	}
	f(() => {
		let e = n(), t = h(l).map((e) => e.value);
		e.length === t.length && e.every((e, n) => e === t[n]) || G(l, d(e), !0);
	});
	var y = aa(), b = E(y), C = (e) => {
		{
			let n = K(() => `${a()}-label`);
			dr(e, {
				get id() {
					return h(n);
				},
				children: (e, n) => {
					D();
					var r = F();
					S(() => W(r, t.label)), M(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	I(b, (e) => {
		t.label && e(C);
	});
	var w = i(b, 2), T = E(w);
	o(T, 17, () => h(l), (e) => e.id, (e, n) => {
		var r = ra(), o = E(r);
		{
			let e = K(() => `${a()}-${h(n).id}`);
			Ci(o, {
				get id() {
					return h(e);
				},
				get placeholder() {
					return t.placeholder;
				},
				get value() {
					return h(n).value;
				},
				oninput: (e) => m(h(n).id, e.currentTarget.value)
			});
		}
		Ot(i(o, 2), {
			variant: "ghost",
			size: "icon",
			type: "button",
			get "aria-label"() {
				return c();
			},
			onclick: () => g(h(n).id),
			children: (e, t) => {
				Z(e, {
					icon: "ri:delete-bin-line",
					class: "size-5",
					"aria-hidden": "true"
				});
			},
			$$slots: { default: !0 }
		}), v(r), M(e, r);
	}), Ot(i(T, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: _,
		children: (e, t) => {
			D();
			var n = F();
			S(() => W(n, s())), M(e, n);
		},
		$$slots: { default: !0 }
	}), v(w);
	var O = i(w, 2), A = (e) => {
		var n = ia(), r = E(n, !0);
		v(n), S(() => W(r, t.error)), M(e, n);
	};
	I(O, (e) => {
		t.error && e(A);
	}), v(y), S((e) => {
		P(y, 1, e), r(y, "aria-labelledby", t.label ? `${a()}-label` : void 0);
	}, [() => q(Q("grid w-full gap-2", t.class))]), M(e, y), x();
}
//#endregion
//#region ../ui/src/lib/components/input/use-dropdown-scroll.svelte.ts
var sa = class {
	#e = N(0);
	get scrollTop() {
		return h(this.#e);
	}
	set scrollTop(e) {
		G(this.#e, e, !0);
	}
	#t = N(null);
	get viewportRef() {
		return h(this.#t);
	}
	set viewportRef(e) {
		G(this.#t, e, !0);
	}
	handleViewportScroll = (e) => {
		this.scrollTop = e.currentTarget.scrollTop;
	};
	resetScroll() {
		this.scrollTop = 0, this.viewportRef && (this.viewportRef.scrollTop = 0);
	}
	scrollToIndex(e) {
		if (e < 0) return;
		let t = Qr(e);
		this.scrollTop = t, this.viewportRef && (this.viewportRef.scrollTop = t);
	}
	scrollToValue(e, t) {
		if (!t) return;
		let n = e.findIndex((e) => e.value === t);
		n >= 0 && this.scrollToIndex(n);
	}
}, ca = Y("<div class=\"relative w-full\"><div class=\"absolute inset-x-0 top-0\"></div></div>");
function la(e, t) {
	u(t, !0);
	let n = k(t, "viewportHeight", 3, 200), r = K(() => Zr(t.items.length)), i = K(() => h(r) ? Xr(t.items, t.scrollTop, n()) : null), a = K(() => h(r) && h(i) ? h(i).items : t.items);
	var s = L(), c = _(s), l = (e) => {
		var n = ca();
		let r;
		var s = E(n);
		let c;
		o(s, 21, () => h(a), (e) => e.value, (e, n) => {
			var r = L();
			y(_(r), () => t.item, () => h(n)), M(e, r);
		}), v(s), v(n), S(() => {
			r = ee(n, "", r, { height: `${h(i).totalHeight}px` }), c = ee(s, "", c, { transform: `translateY(${h(i).offsetY}px)` });
		}), M(e, n);
	}, d = (e) => {
		var n = L();
		o(_(n), 17, () => h(a), (e) => e.value, (e, n) => {
			var r = L();
			y(_(r), () => t.item, () => h(n)), M(e, r);
		}), M(e, n);
	};
	I(c, (e) => {
		h(r) && h(i) ? e(l) : e(d, -1);
	}), M(e, s), x();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-select.svelte
var ua = (e, t = V) => {
	let n = K(() => t().value), r = K(() => t().label), o = K(() => t().disabled);
	var s = L(), c = _(s);
	{
		let e = (e, t) => {
			let n = () => t?.().selected;
			D();
			var a = fa(), o = _(a), s = i(o), c = (e) => {
				Z(e, {
					icon: "ri:check-line",
					class: "size-5 text-primary"
				});
			};
			I(s, (e) => {
				n() && e(c);
			}), S(() => W(o, `${h(r) ?? ""} `)), M(e, a);
		}, t = K(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
		a(c, () => Tn, (i, a) => {
			a(i, {
				get value() {
					return h(n);
				},
				get label() {
					return h(r);
				},
				get disabled() {
					return h(o);
				},
				get class() {
					return h(t);
				},
				children: e,
				$$slots: { default: !0 }
			});
		});
	}
	M(e, s);
}, da = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"label",
	"items",
	"placeholder",
	"loadingPlaceholder",
	"selectAriaLabel",
	"allowCustomValue",
	"required",
	"reloadKey",
	"id",
	"class",
	"selectClass",
	"contentProps",
	"error",
	"value"
]), fa = Y(" <!>", 1), pa = Y("<span class=\"text-red-400\">*</span>"), ma = Y("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), ha = Y("<div class=\"px-3 py-1.5 text-sm text-dark-300\"></div>"), ga = Y("<!> <!> <!>", 1), _a = Y("<div><div class=\"min-w-0 flex-1\"><!></div> <button type=\"button\" aria-haspopup=\"listbox\"><!></button></div> <!>", 1), va = Y("<p class=\"text-sm text-red-400\"> </p>"), ya = Y("<div><!> <!> <!></div>");
function ba(e, t) {
	u(t, !0);
	let n = k(t, "allowCustomValue", 3, !0), o = k(t, "id", 19, Fe), s = k(t, "value", 15, ""), c = U(t, da), d = K(() => t.placeholder), f = K(() => t.loadingPlaceholder ?? "Loading..."), m = K(() => t.selectAriaLabel ?? "Select value"), g = N(!1), y = N(""), b = N(!1), C = new sa(), w = Jr(() => t.items, () => t.reloadKey?.()), T = new Hr(() => h(y), 100), O = K(() => new Map(w.items.map((e) => [e.value, e]))), A = K(() => h(O).get(s())), j = K(() => h(A)?.value ?? ""), F = K(() => {
		if (w.loading) return [];
		if (!h(b)) return w.items;
		let e = T.current.trim();
		return e ? Yr(w.items, e) : w.items;
	}), R = K(() => h(A) && !h(F).some((e) => e.value === h(A).value) ? [h(A), ...h(F)] : h(F));
	function z() {
		h(b) || G(y, h(A)?.label ?? (n() ? s() : ""), !0);
	}
	l(() => {
		s(), h(A)?.label, z();
	}), l(() => {
		T.current, h(g) && C.resetScroll();
	});
	function B() {
		G(g, h(F).length > 0 || w.items.length > 0, !0);
	}
	function V(e) {
		G(y, e.currentTarget.value, !0), G(b, !0), n() && s(h(y)), B();
	}
	function H() {
		G(g, !0);
	}
	function Y() {
		G(b, !1), z();
	}
	async function ee(e) {
		if (G(g, e, !0), !e) {
			G(b, !1), C.resetScroll(), z();
			return;
		}
		await p(), C.scrollToValue(h(F), s());
	}
	function X() {
		G(g, !0);
	}
	let te = K(() => Me(c, {
		id: o(),
		placeholder: w.loading ? h(f) : h(d),
		autocomplete: "off",
		class: Q("min-w-0 w-full truncate rounded-l-xl border border-r-0 bg-dark-700 text-dark-50 outline-none", We.md, t.error ? "border-red-500" : "border-dark-500"),
		"aria-invalid": t.error ? !0 : void 0,
		oninput: V,
		onfocus: H,
		onblur: Y
	}));
	var re = ya(), ie = E(re), ae = (e) => {
		dr(e, {
			get for() {
				return o();
			},
			children: (e, n) => {
				D();
				var r = fa(), a = _(r), o = i(a), s = (e) => {
					M(e, pa());
				};
				I(o, (e) => {
					t.required && e(s);
				}), S(() => W(a, `${t.label ?? ""} `)), M(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	I(ie, (e) => {
		t.label && e(ae);
	});
	var oe = i(ie, 2);
	{
		let e = K(() => !!t.disabled);
		a(oe, () => mn, (n, o) => {
			o(n, {
				type: "single",
				get items() {
					return h(R);
				},
				get inputValue() {
					return h(y);
				},
				get value() {
					return h(j);
				},
				onValueChange: (e) => {
					e && (s(e), G(b, !1), G(g, !1), z());
				},
				onOpenChange: ee,
				get disabled() {
					return h(e);
				},
				get open() {
					return h(g);
				},
				set open(e) {
					G(g, e, !0);
				},
				children: (e, n) => {
					var o = _a(), s = _(o), c = E(s);
					a(E(c), () => _n, (e, t) => {
						t(e, J(() => h(te)));
					}), v(c);
					var l = i(c, 2);
					Z(E(l), {
						icon: "ri:expand-up-down-line",
						class: "size-5 shrink-0 text-dark-300"
					}), v(l), v(s), a(i(s, 2), () => vt, (e, n) => {
						n(e, {
							children: (e, n) => {
								var r = L(), o = _(r);
								{
									let e = K(() => t.contentProps?.sideOffset ?? 4), n = K(() => Q("z-50 max-h-84 min-w-(--bits-combobox-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", t.contentProps?.class));
									a(o, () => bn, (r, o) => {
										o(r, J(() => t.contentProps, {
											get sideOffset() {
												return h(e);
											},
											get class() {
												return h(n);
											},
											children: (e, t) => {
												var n = ga(), r = _(n);
												a(r, () => Ln, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															Z(e, { icon: "ri:arrow-up-s-line" });
														},
														$$slots: { default: !0 }
													});
												});
												var o = i(r, 2);
												a(o, () => kn, (e, t) => {
													t(e, {
														get onscroll() {
															return C.handleViewportScroll;
														},
														get ref() {
															return C.viewportRef;
														},
														set ref(e) {
															C.viewportRef = e;
														},
														children: (e, t) => {
															var n = L(), r = _(n), i = (e) => {
																var t = ma(), n = E(t, !0);
																v(t), S(() => W(n, h(f))), M(e, t);
															}, a = (e) => {
																la(e, {
																	get items() {
																		return h(F);
																	},
																	get scrollTop() {
																		return C.scrollTop;
																	},
																	get item() {
																		return ua;
																	}
																});
															}, o = (e) => {
																var t = ha();
																t.textContent = "No matches found", M(e, t);
															};
															I(r, (e) => {
																w.loading ? e(i) : h(F).length > 0 ? e(a, 1) : e(o, -1);
															}), M(e, n);
														},
														$$slots: { default: !0 }
													});
												}), a(i(o, 2), () => Nn, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															Z(e, { icon: "ri:arrow-down-s-line" });
														},
														$$slots: { default: !0 }
													});
												}), M(e, n);
											},
											$$slots: { default: !0 }
										}));
									});
								}
								M(e, r);
							},
							$$slots: { default: !0 }
						});
					}), S((e, n) => {
						P(s, 1, e), r(l, "aria-label", h(m)), r(l, "aria-expanded", h(g)), l.disabled = !!t.disabled, P(l, 1, n);
					}, [() => q(Q("flex w-full min-w-0 items-stretch rounded-xl has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500")), () => q(Q("flex shrink-0 cursor-pointer items-center justify-center rounded-r-xl border bg-dark-700 text-dark-50 outline-none", We.md, t.error ? "border-red-500" : "border-dark-500", t.selectClass))]), ne("click", l, X), M(e, o);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var se = i(oe, 2), ce = (e) => {
		var n = va(), r = E(n, !0);
		v(n), S(() => W(r, t.error)), M(e, n);
	};
	I(se, (e) => {
		t.error && e(ce);
	}), v(re), S((e) => P(re, 1, e), [() => q(Q("relative grid w-full min-w-0 gap-2", t.class))]), M(e, re), x();
}
X(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-select-text.svelte
var xa = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"label",
	"items",
	"pathPlaceholder",
	"valuePlaceholder",
	"selectPlaceholder",
	"loadingPlaceholder",
	"variables",
	"valuelessOperators",
	"id",
	"class",
	"selectClass",
	"contentProps",
	"error",
	"suffix",
	"value"
]), Sa = Y("<!> <!>", 1), Ca = Y("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), wa = Y(" <!>", 1), Ta = Y("<!> <!> <!>", 1), Ea = Y("<div aria-hidden=\"true\">—</div>"), Da = Y("<input/>"), Oa = Y("<div class=\"flex shrink-0 items-center self-center\"><!></div>"), ka = Y("<div class=\"flex flex-wrap gap-1.5\"></div>"), Aa = Y("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), ja = Y("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), Ma = Y("<p class=\"text-sm text-red-400\"> </p>"), Na = Y("<div><!> <div class=\"flex items-center gap-3\"><div><input/> <!> <!></div> <!></div> <!> <!> <!></div>");
function Pa(e, t) {
	u(t, !0);
	let n = k(t, "variables", 19, () => []), l = k(t, "valuelessOperators", 19, () => []), d = k(t, "id", 19, Fe), f = k(t, "value", 31, () => H({
		path: "",
		type: "equals",
		value: ""
	})), p = U(t, xa), m = K(() => t.selectPlaceholder ?? "Select"), b = K(() => t.loadingPlaceholder ?? "Loading..."), C = Jr(() => t.items), O = N(null), A = N(null), R = N("path"), z = N(!1), B = N(""), V = N(0), Y = K(() => {
		if (!h(B)) return n();
		let e = h(B).toLowerCase();
		return n().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function ee(e) {
		return h(e === "path" ? O : A);
	}
	function X(e) {
		return e === "path" ? f().path : f().value;
	}
	function te(e, t) {
		if (e === "path") {
			f({
				...f(),
				path: t
			});
			return;
		}
		f({
			...f(),
			value: t
		});
	}
	function re(e) {
		let t = ee(e);
		if (!t) return null;
		let n = X(e), r = t.selectionStart ?? n.length, i = n.slice(0, r), a = i.lastIndexOf("{");
		if (a === -1) return null;
		let o = i.slice(a + 1);
		return o.includes("}") ? null : {
			start: a,
			partial: o
		};
	}
	function ie(e) {
		G(R, e, !0);
		let t = re(e);
		if (!t || n().length === 0) {
			G(z, !1), G(B, ""), G(V, 0);
			return;
		}
		G(B, t.partial, !0), G(z, h(Y).length > 0), G(V, 0);
	}
	function ae(e, t = h(R)) {
		let n = re(t), r = ee(t);
		if (!n || !r) return;
		let i = X(t), a = r.selectionStart ?? i.length, o = i.slice(0, n.start);
		te(t, `${o}{${e}}${i.slice(a)}`), G(z, !1), G(B, ""), queueMicrotask(() => {
			if (!r) return;
			let t = o.length + e.length + 2;
			r.focus(), r.setSelectionRange(t, t);
		});
	}
	function oe(e, t = h(R)) {
		let n = X(t), r = ee(t);
		if (!r) {
			te(t, `${n}{${e}}`);
			return;
		}
		let i = r.selectionStart ?? n.length, a = n.slice(0, i);
		te(t, `${a}{${e}}${n.slice(i)}`), queueMicrotask(() => {
			let t = a.length + e.length + 2;
			r.focus(), r.setSelectionRange(t, t);
		});
	}
	let se = (e) => ({
		handleInput: () => {
			ie(e);
		},
		handleKeydown: (t) => {
			if (!(!h(z) || h(Y).length === 0 || h(R) !== e)) {
				if (t.key === "ArrowDown") {
					t.preventDefault(), G(V, (h(V) + 1) % h(Y).length);
					return;
				}
				if (t.key === "ArrowUp") {
					t.preventDefault(), G(V, (h(V) - 1 + h(Y).length) % h(Y).length);
					return;
				}
				if (t.key === "Enter" || t.key === "Tab") {
					let n = h(Y)[h(V)];
					n && (t.preventDefault(), ae(n.key, e));
					return;
				}
				t.key === "Escape" && G(z, !1);
			}
		},
		handleBlur: () => {
			ce && clearTimeout(ce), ce = setTimeout(() => {
				G(z, !1), ce = void 0;
			}, 120);
		}
	}), ce;
	w(() => {
		ce && clearTimeout(ce);
	});
	let le = se("path"), ue = se("value"), $ = K(() => t.error ? "border-red-500" : "border-dark-500"), de = K(() => l().includes(f().type));
	var fe = Na(), pe = E(fe), me = (e) => {
		dr(e, {
			get for() {
				return d();
			},
			children: (e, n) => {
				D();
				var r = F();
				S(() => W(r, t.label)), M(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	I(pe, (e) => {
		t.label && e(me);
	});
	var he = i(pe, 2), ge = E(he), _e = E(ge);
	T(_e, (e) => ({
		id: d(),
		placeholder: t.pathPlaceholder,
		class: e,
		"aria-invalid": t.error ? !0 : void 0,
		role: n().length > 0 ? "combobox" : void 0,
		"aria-autocomplete": n().length > 0 ? "list" : void 0,
		"aria-expanded": n().length > 0 ? h(z) && h(R) === "path" && h(Y).length > 0 : void 0,
		"aria-controls": n().length > 0 ? `${d()}-listbox` : void 0,
		"aria-activedescendant": h(z) && h(R) === "path" && h(Y).length > 0 ? `${d()}-option-${h(V)}` : void 0,
		oninput: n().length > 0 ? le.handleInput : void 0,
		onkeydown: n().length > 0 ? le.handleKeydown : void 0,
		onblur: n().length > 0 ? le.handleBlur : void 0,
		onfocus: n().length > 0 ? () => ie("path") : void 0,
		onclick: n().length > 0 ? () => ie("path") : void 0,
		...p
	}), [() => Q("min-w-0 flex-1 truncate border border-r bg-dark-700 text-dark-50 outline-none", "rounded-l-xl", We.md, h($))], void 0, void 0, void 0, !0), s(_e, (e) => G(O, e), () => h(O));
	var ve = i(_e, 2);
	a(ve, () => Wn, (e, n) => {
		n(e, {
			type: "single",
			get items() {
				return C.items;
			},
			get value() {
				return f().type;
			},
			set value(e) {
				f(f().type = e, !0);
			},
			children: (e, n) => {
				var r = Sa(), s = _(r);
				{
					let e = K(() => Q("flex shrink-0 cursor-pointer items-center justify-between gap-2 border border-x-0 bg-dark-700 text-dark-50 outline-none", We.md, h($), t.selectClass ?? "w-32"));
					a(s, () => Xn, (t, n) => {
						n(t, {
							get class() {
								return h(e);
							},
							children: (e, t) => {
								var n = Sa(), r = _(n);
								{
									let e = K(() => C.loading ? h(b) : h(m));
									a(r, () => qn, (t, n) => {
										n(t, {
											get placeholder() {
												return h(e);
											},
											class: "truncate data-placeholder:text-dark-300"
										});
									});
								}
								Z(i(r, 2), {
									icon: "ri:expand-up-down-line",
									class: "size-5 shrink-0 text-dark-300"
								}), M(e, n);
							},
							$$slots: { default: !0 }
						});
					});
				}
				a(i(s, 2), () => vt, (e, n) => {
					n(e, {
						children: (e, n) => {
							var r = L(), s = _(r);
							{
								let e = K(() => t.contentProps?.sideOffset ?? 4), n = K(() => Q("z-50 max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", t.contentProps?.class));
								a(s, () => bn, (r, s) => {
									s(r, J(() => t.contentProps, {
										get sideOffset() {
											return h(e);
										},
										get class() {
											return h(n);
										},
										children: (e, t) => {
											var n = Ta(), r = _(n);
											a(r, () => Ln, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = i(r, 2);
											a(s, () => kn, (e, t) => {
												t(e, {
													children: (e, t) => {
														var n = L(), r = _(n), s = (e) => {
															var t = Ca(), n = E(t, !0);
															v(t), S(() => W(n, h(b))), M(e, t);
														}, c = (e) => {
															var t = L();
															o(_(t), 17, () => C.items, ({ value: e, label: t, disabled: n }) => e, (e, t) => {
																let n = () => h(t).value, r = () => h(t).label, o = () => h(t).disabled;
																var s = L(), c = _(s);
																{
																	let e = (e, t) => {
																		let n = () => t?.().selected;
																		D();
																		var a = wa(), o = _(a), s = i(o), c = (e) => {
																			Z(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		I(s, (e) => {
																			n() && e(c);
																		}), S(() => W(o, `${r() ?? ""} `)), M(e, a);
																	}, t = K(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	a(c, () => Tn, (i, a) => {
																		a(i, {
																			get value() {
																				return n();
																			},
																			get label() {
																				return r();
																			},
																			get disabled() {
																				return o();
																			},
																			get class() {
																				return h(t);
																			},
																			children: e,
																			$$slots: { default: !0 }
																		});
																	});
																}
																M(e, s);
															}), M(e, t);
														};
														I(r, (e) => {
															C.loading ? e(s) : e(c, -1);
														}), M(e, n);
													},
													$$slots: { default: !0 }
												});
											}), a(i(s, 2), () => Nn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), M(e, n);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							M(e, r);
						},
						$$slots: { default: !0 }
					});
				}), M(e, r);
			},
			$$slots: { default: !0 }
		});
	});
	var ye = i(ve, 2), be = (e) => {
		var t = Ea();
		S((e) => P(t, 1, e), [() => q(Q("flex min-w-0 items-center rounded-r-xl border border-l-0 bg-dark-700 px-3 text-dark-500 select-none", We.md, h($)))]), M(e, t);
	}, xe = (e) => {
		var i = Da();
		g(i), s(i, (e) => G(A, e), () => h(A)), S((e) => {
			r(i, "placeholder", t.valuePlaceholder), P(i, 1, e), r(i, "aria-invalid", t.error ? !0 : void 0), r(i, "role", n().length > 0 ? "combobox" : void 0), r(i, "aria-autocomplete", n().length > 0 ? "list" : void 0), r(i, "aria-expanded", n().length > 0 ? h(z) && h(R) === "value" && h(Y).length > 0 : void 0), r(i, "aria-controls", n().length > 0 ? `${d()}-listbox` : void 0), r(i, "aria-activedescendant", h(z) && h(R) === "value" && h(Y).length > 0 ? `${d()}-option-${h(V)}` : void 0);
		}, [() => q(Q("min-w-0 flex-1 truncate rounded-r-xl border bg-dark-700 text-dark-50 outline-none", We.md, h($)))]), ne("input", i, function(...e) {
			(n().length > 0 ? ue.handleInput : void 0)?.apply(this, e);
		}), ne("keydown", i, function(...e) {
			(n().length > 0 ? ue.handleKeydown : void 0)?.apply(this, e);
		}), j("blur", i, function(...e) {
			(n().length > 0 ? ue.handleBlur : void 0)?.apply(this, e);
		}), j("focus", i, function(...e) {
			(n().length > 0 ? () => ie("value") : void 0)?.apply(this, e);
		}), ne("click", i, function(...e) {
			(n().length > 0 ? () => ie("value") : void 0)?.apply(this, e);
		}), c(i, () => f().value, (e) => f(f().value = e, !0)), M(e, i);
	};
	I(ye, (e) => {
		h(de) ? e(be) : e(xe, -1);
	}), v(ge);
	var Se = i(ge, 2), Ce = (e) => {
		var n = Oa();
		y(E(n), () => t.suffix), v(n), M(e, n);
	};
	I(Se, (e) => {
		t.suffix && e(Ce);
	}), v(he);
	var we = i(he, 2), Te = (e) => {
		var t = ka();
		o(t, 21, n, (e) => e.key, (e, t) => {
			Ot(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return h(t).label;
				},
				onclick: () => oe(h(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					D();
					var r = F();
					S(() => W(r, `{${h(t).key}}`)), M(e, r);
				},
				$$slots: { default: !0 }
			});
		}), v(t), M(e, t);
	};
	I(we, (e) => {
		n().length > 0 && e(Te);
	});
	var Ee = i(we, 2), De = (e) => {
		var t = ja();
		o(t, 23, () => h(Y), (e) => e.key, (e, t, n) => {
			var a = Aa(), o = E(a), s = E(o), c = E(s, !0);
			v(s);
			var l = i(s, 2), u = E(l, !0);
			v(l), v(o), v(a), S((e) => {
				r(o, "id", `${d()}-option-${h(n)}`), r(o, "aria-selected", h(n) === h(V)), P(o, 1, e), W(c, `{${h(t).key}}`), W(u, h(t).label);
			}, [() => q(Q("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", h(n) === h(V) && "bg-dark-700"))]), ne("mousedown", o, (e) => {
				e.preventDefault(), ae(h(t).key, h(R));
			}), M(e, a);
		}), v(t), S(() => r(t, "id", `${d()}-listbox`)), M(e, t);
	};
	I(Ee, (e) => {
		h(z) && h(Y).length > 0 && e(De);
	});
	var Oe = i(Ee, 2), ke = (e) => {
		var n = Ma(), r = E(n, !0);
		v(n), S(() => W(r, t.error)), M(e, n);
	};
	I(Oe, (e) => {
		t.error && e(ke);
	}), v(fe), S((e, t) => {
		P(fe, 1, e), P(ge, 1, t);
	}, [() => q(Q("relative grid w-full gap-2", t.class)), () => q(Q("grid min-w-0 flex-1 grid-cols-[1fr_120px_1fr] rounded-xl has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500"))]), c(_e, () => f().path, (e) => f(f().path = e, !0)), M(e, fe), x();
}
X([
	"input",
	"keydown",
	"click",
	"mousedown"
]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-variables.svelte
var Fa = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"label",
	"variables",
	"value",
	"error",
	"oninput",
	"id",
	"placeholder",
	"class"
]), Ia = Y("<div class=\"flex flex-wrap gap-1.5\"></div>"), La = Y("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), Ra = Y("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), za = Y("<p class=\"text-sm text-red-400\"> </p>"), Ba = Y("<div class=\"relative grid w-full min-w-0 gap-2\"><!> <div><input/></div> <!> <!> <!></div>");
function Va(e, t) {
	u(t, !0);
	let n = k(t, "variables", 19, () => []), a = k(t, "value", 15, ""), l = k(t, "id", 19, Fe), d = U(t, Fa), f = N(null), p = N(!1), m = N(""), g = N(0), _ = K(() => {
		if (!h(m)) return n();
		let e = h(m).toLowerCase();
		return n().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function y() {
		if (!h(f)) return null;
		let e = h(f).selectionStart ?? a().length, t = a().slice(0, e), n = t.lastIndexOf("{");
		if (n === -1) return null;
		let r = t.slice(n + 1);
		return r.includes("}") ? null : {
			start: n,
			partial: r
		};
	}
	function b() {
		let e = y();
		if (!e || n().length === 0) {
			G(p, !1), G(m, ""), G(g, 0);
			return;
		}
		G(m, e.partial, !0), G(p, h(_).length > 0), G(g, 0);
	}
	function C(e) {
		let t = y();
		if (!t || !h(f)) return;
		let n = h(f).selectionStart ?? a().length, r = a().slice(0, t.start);
		a(`${r}{${e}}${a().slice(n)}`), G(p, !1), G(m, ""), queueMicrotask(() => {
			if (!h(f)) return;
			let t = r.length + e.length + 2;
			h(f).focus(), h(f).setSelectionRange(t, t);
		});
	}
	function O(e) {
		if (!h(f)) {
			a(`${a()}{${e}}`);
			return;
		}
		let t = h(f).selectionStart ?? a().length, n = a().slice(0, t);
		a(`${n}{${e}}${a().slice(t)}`), queueMicrotask(() => {
			let t = n.length + e.length + 2;
			h(f)?.focus(), h(f)?.setSelectionRange(t, t);
		});
	}
	let A = (e) => {
		t.oninput?.(e), b();
	}, j = (e) => {
		if (!(!h(p) || h(_).length === 0)) {
			if (e.key === "ArrowDown") {
				e.preventDefault(), G(g, (h(g) + 1) % h(_).length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault(), G(g, (h(g) - 1 + h(_).length) % h(_).length);
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				let t = h(_)[h(g)];
				t && (e.preventDefault(), C(t.key));
				return;
			}
			e.key === "Escape" && G(p, !1);
		}
	}, L, R = () => {
		L && clearTimeout(L), L = setTimeout(() => {
			G(p, !1), L = void 0;
		}, 120);
	};
	w(() => {
		L && clearTimeout(L);
	});
	var z = Ba(), B = E(z), V = (e) => {
		dr(e, {
			get for() {
				return l();
			},
			children: (e, n) => {
				D();
				var r = F();
				S(() => W(r, t.label)), M(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	I(B, (e) => {
		t.label && e(V);
	});
	var H = i(B, 2), J = E(H);
	T(J, (e) => ({
		id: l(),
		placeholder: t.placeholder,
		class: e,
		role: "combobox",
		"aria-invalid": t.error ? !0 : void 0,
		"aria-autocomplete": "list",
		"aria-expanded": h(p) && h(_).length > 0,
		"aria-controls": `${l()}-listbox`,
		"aria-activedescendant": h(p) && h(_).length > 0 ? `${l()}-option-${h(g)}` : void 0,
		oninput: A,
		onkeydown: j,
		onblur: R,
		onfocus: b,
		onclick: b,
		...d
	}), [() => Q("min-w-0 w-full truncate rounded-xl border bg-dark-700 text-dark-50 outline-none", We.md, t.error ? "border-red-500" : "border-dark-500")], void 0, void 0, void 0, !0), s(J, (e) => G(f, e), () => h(f)), v(H);
	var Y = i(H, 2), ee = (e) => {
		var t = Ia();
		o(t, 21, n, (e) => e.key, (e, t) => {
			Ot(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return h(t).label;
				},
				onclick: () => O(h(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					D();
					var r = F();
					S(() => W(r, `{${h(t).key}}`)), M(e, r);
				},
				$$slots: { default: !0 }
			});
		}), v(t), M(e, t);
	};
	I(Y, (e) => {
		n().length > 0 && e(ee);
	});
	var X = i(Y, 2), te = (e) => {
		var t = Ra();
		o(t, 23, () => h(_), (e) => e.key, (e, t, n) => {
			var a = La(), o = E(a), s = E(o), c = E(s, !0);
			v(s);
			var u = i(s, 2), d = E(u, !0);
			v(u), v(o), v(a), S((e) => {
				r(o, "id", `${l()}-option-${h(n)}`), r(o, "aria-selected", h(n) === h(g)), P(o, 1, e), W(c, `{${h(t).key}}`), W(d, h(t).label);
			}, [() => q(Q("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", h(n) === h(g) && "bg-dark-700"))]), ne("mousedown", o, (e) => {
				e.preventDefault(), C(h(t).key);
			}), M(e, a);
		}), v(t), S(() => r(t, "id", `${l()}-listbox`)), M(e, t);
	};
	I(X, (e) => {
		h(p) && h(_).length > 0 && e(te);
	});
	var re = i(X, 2), ie = (e) => {
		var n = za(), r = E(n, !0);
		v(n), S(() => W(r, t.error)), M(e, n);
	};
	I(re, (e) => {
		t.error && e(ie);
	}), v(z), S((e) => P(H, 1, e), [() => q(Q("relative flex w-full min-w-0 items-center rounded-xl", "has-focus-within:ring-2 has-focus-within:ring-primary", t.error && "has-focus-within:ring-red-500", t.class))]), c(J, a), M(e, z), x();
}
X(["mousedown"]);
//#endregion
export { Sr as _, na as a, Ri as c, Ti as d, Ci as f, Or as g, Jr as h, oa as i, Mi as l, oi as m, Pa as n, $i as o, _i as p, ba as r, Yi as s, Va as t, Oi as u, hr as v, dr as y };
