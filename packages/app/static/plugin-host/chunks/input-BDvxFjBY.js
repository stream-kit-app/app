import { $ as e, $n as t, Ct as n, Dt as r, E as i, G as a, Gn as o, Hr as s, Jr as c, Kn as l, Mn as u, Nn as d, On as f, Q as p, Qn as m, Qr as h, Qt as g, Sr as _, Vr as v, Wn as y, Xt as b, Yt as x, Z as S, Zn as C, Zr as w, _t as T, a as E, at as D, bn as O, cn as k, cr as A, dt as j, hn as M, jt as N, ln as P, lr as F, m as I, mn as L, ni as R, nr as z, o as B, on as V, or as H, pr as U, pt as W, s as G, un as K, ut as q, vn as J, xn as Y, yn as ee, zn as te } from "./client-xxWnFgeR.js";
import { i as X, n as ne, o as re, r as ie, s as ae, t as oe } from "./dist-7Fg9me4U.js";
import "./disclose-version-YhYaTdgb.js";
import { t as Z } from "./Icon-AeqJGRQj.js";
import "./index-client-DLfVeyOI.js";
import { t as Q } from "./utils-DJt177zd.js";
import { C as se, D as $, _ as ce, a as le, c as ue, d as de, g as fe, i as pe, l as me, n as he, o as ge, r as _e, s as ve, u as ye, v as be, x as xe } from "./animations-complete-BfqHI4B-.js";
import { _ as Se, b as Ce, g as we, h as Te, m as Ee, v as De, y as Oe } from "./scroll-lock-BZF1_Y9Y.js";
import { i as ke, n as Ae, r as je, t as Me } from "./use-id-C9llEPxa.js";
import { a as Ne, c as Pe, d as Fe, f as Ie, h as Le, l as Re, m as ze, o as Be, p as Ve, s as He, u as Ue } from "./command-wJw-CJ8Z.js";
import { t as We } from "./on-mount-effect.svelte-BDwcYjCA.js";
import { _ as Ge, a as Ke, d as qe, f as Je, g as Ye, h as Xe, i as Ze, l as Qe, m as $e, o as et, p as tt, r as nt, s as rt, u as it, v as at } from "./dom-B4Rzp8oi.js";
import { a as ot, o as st, t as ct } from "./presence-manager.svelte-BOTfPcjg.js";
import { a as lt, c as ut, i as dt, n as ft, r as pt, s as mt } from "./dialog-t7Ac13OT.js";
import { t as ht } from "./portal-D-OgjF3O.js";
import "./legacy-CT5GbYa1.js";
import { a as gt, n as _t, r as vt, t as yt } from "./popper-layer-force-mount-BxV85AhM.js";
import { t as bt } from "./floating-layer-anchor-B_R8arju.js";
import { i as xt, n as St, r as Ct } from "./popover-S-nP6M-I.js";
import { t as wt } from "./scroll-area-7qg9ezvn.js";
import { t as Tt } from "./button-C7Vln2y_.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/checkbox/checkbox.svelte.js
var Et = ge({
	component: "checkbox",
	parts: [
		"root",
		"group",
		"group-label",
		"input"
	]
}), Dt = new se("Checkbox.Group"), Ot = new se("Checkbox.Root"), kt = class e {
	static create(t, n = null) {
		return Ot.set(new e(t, n));
	}
	opts;
	group;
	#e = U(() => this.group && this.group.opts.name.current ? this.group.opts.name.current : this.opts.name.current);
	get trueName() {
		return f(this.#e);
	}
	set trueName(e) {
		H(this.#e, e);
	}
	#t = U(() => this.group && this.group.opts.required.current ? !0 : this.opts.required.current);
	get trueRequired() {
		return f(this.#t);
	}
	set trueRequired(e) {
		H(this.#t, e);
	}
	#n = U(() => this.group && this.group.opts.disabled.current ? !0 : this.opts.disabled.current);
	get trueDisabled() {
		return f(this.#n);
	}
	set trueDisabled(e) {
		H(this.#n, e);
	}
	#r = U(() => this.group && this.group.opts.readonly.current ? !0 : this.opts.readonly.current);
	get trueReadonly() {
		return f(this.#r);
	}
	set trueReadonly(e) {
		H(this.#r, e);
	}
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = de(this.opts.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this), xe.pre([() => c(this.group?.opts.value.current), () => this.opts.value.current], ([e, t]) => {
			!e || !t || (this.opts.checked.current = e.includes(t));
		}), xe.pre(() => this.opts.checked.current, (e) => {
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
	#a = U(() => ({
		checked: this.opts.checked.current,
		indeterminate: this.opts.indeterminate.current
	}));
	get snippetProps() {
		return f(this.#a);
	}
	set snippetProps(e) {
		H(this.#a, e);
	}
	#o = U(() => ({
		id: this.opts.id.current,
		role: "checkbox",
		type: this.opts.type.current,
		disabled: this.trueDisabled,
		"aria-checked": ve(this.opts.checked.current, this.opts.indeterminate.current),
		"aria-required": _e(this.trueRequired),
		"aria-readonly": _e(this.trueReadonly),
		"data-disabled": he(this.trueDisabled),
		"data-readonly": he(this.trueReadonly),
		"data-state": jt(this.opts.checked.current, this.opts.indeterminate.current),
		[Et.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return f(this.#o);
	}
	set props(e) {
		H(this.#o, e);
	}
}, At = class e {
	static create() {
		return new e(Ot.get());
	}
	root;
	#e = U(() => this.root.group ? !!(this.root.opts.value.current !== void 0 && this.root.group.opts.value.current.includes(this.root.opts.value.current)) : this.root.opts.checked.current);
	get trueChecked() {
		return f(this.#e);
	}
	set trueChecked(e) {
		H(this.#e, e);
	}
	#t = U(() => !!this.root.trueName);
	get shouldRender() {
		return f(this.#t);
	}
	set shouldRender(e) {
		H(this.#t, e);
	}
	constructor(e) {
		this.root = e, this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		ot(this.root.opts.ref.current) && this.root.opts.ref.current.focus();
	}
	#n = U(() => ({
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
		return f(this.#n);
	}
	set props(e) {
		H(this.#n, e);
	}
};
function jt(e, t) {
	return t ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/hidden-input.svelte
var Mt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value"
]), Nt = K("<input/>");
function Pt(e, t) {
	s(t, !0);
	let n = E(t, "value", 15), r = B(t, Mt), i = U(() => ke(r, {
		"aria-hidden": "true",
		tabindex: -1,
		style: {
			...Le,
			position: "absolute",
			top: "0",
			left: "0"
		}
	}));
	var o = P(), c = m(o), l = (e) => {
		var t = Nt();
		S(t, () => ({
			...f(i),
			value: n()
		}), void 0, void 0, void 0, void 0, !0), k(e, t);
	}, u = (e) => {
		var t = Nt();
		S(t, () => ({ ...f(i) }), void 0, void 0, void 0, void 0, !0), a(t, n), k(e, t);
	};
	N(c, (e) => {
		f(i).type === "checkbox" ? e(l) : e(u, -1);
	}), k(e, o), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/checkbox/components/checkbox-input.svelte
function Ft(e, t) {
	s(t, !1);
	let n = At.create();
	I();
	var r = P(), i = m(r), a = (e) => {
		Pt(e, G(() => n.props));
	};
	N(i, (e) => {
		n.shouldRender && e(a);
	}), k(e, r), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/checkbox/components/checkbox.svelte
var It = new Set([
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
]), Lt = K("<button><!></button>"), Rt = K("<!> <!>", 1);
function zt(e, n) {
	let r = L();
	s(n, !0);
	let i = E(n, "checked", 15, !1), a = E(n, "ref", 15, null), o = E(n, "disabled", 3, !1), c = E(n, "required", 3, !1), l = E(n, "name", 3, void 0), u = E(n, "value", 3, "on"), d = E(n, "id", 19, () => Ae(r)), p = E(n, "indeterminate", 15, !1), _ = E(n, "type", 3, "button"), y = B(n, It), b = Dt.getOr(null);
	b && u() && (b.opts.value.current.includes(u()) ? i(!0) : i(!1)), xe.pre(() => u(), () => {
		b && u() && (b.opts.value.current.includes(u()) ? i(!0) : i(!1));
	});
	let x = kt.create({
		checked: $(() => i(), (e) => {
			i(e), n.onCheckedChange?.(e);
		}),
		disabled: $(() => o() ?? !1),
		required: $(() => c()),
		name: $(() => l()),
		value: $(() => u()),
		id: $(() => d()),
		ref: $(() => a(), (e) => a(e)),
		indeterminate: $(() => p(), (e) => {
			p(e), n.onIndeterminateChange?.(e);
		}),
		type: $(() => _()),
		readonly: $(() => !!n.readonly)
	}, b), w = U(() => ke({ ...y }, x.props));
	var T = Rt(), D = m(T), O = (e) => {
		var t = P(), r = m(t);
		{
			let e = U(() => ({
				props: f(w),
				...x.snippetProps
			}));
			g(r, () => n.child, () => f(e));
		}
		k(e, t);
	}, A = (e) => {
		var t = Lt();
		S(t, () => ({ ...f(w) })), g(C(t), () => n.children ?? R, () => x.snippetProps), h(t), k(e, t);
	};
	N(D, (e) => {
		n.child ? e(O) : e(A, -1);
	}), Ft(t(D, 2), {}), k(e, T), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/data-typeahead.svelte.js
var Bt = class {
	#e;
	#t = U(() => this.#e.candidateValues());
	#n;
	constructor(e) {
		this.#e = e, this.#n = Te("", {
			afterMs: 1e3,
			getWindow: this.#e.getWindow
		}), this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this), this.resetTypeahead = this.resetTypeahead.bind(this);
	}
	handleTypeaheadSearch(e) {
		if (!this.#e.enabled() || !f(this.#t).length) return;
		this.#n.current = this.#n.current + e;
		let t = this.#e.getCurrentItem(), n = f(this.#t).find((e) => e === t) ?? "", r = De(f(this.#t).map((e) => e ?? ""), this.#n.current, n), i = f(this.#t).find((e) => e === r);
		return i && this.#e.onMatch(i), i;
	}
	resetTypeahead() {
		this.#n.current = "";
	}
}, Vt = [
	Ke,
	Je,
	et,
	Ge,
	Qe,
	it,
	"Alt",
	$e,
	qe,
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
], Ht = [
	Ze,
	Ye,
	tt
], Ut = [
	rt,
	Xe,
	"End"
], Wt = [...Ht, ...Ut], Gt = ge({
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
}), Kt = new se("Select.Root | Combobox.Root");
new se("Select.Group | Combobox.Group");
var qt = new se("Select.Content | Combobox.Content"), Jt = class {
	opts;
	#e = A(!1);
	get touchedInput() {
		return f(this.#e);
	}
	set touchedInput(e) {
		H(this.#e, e, !0);
	}
	#t = A(null);
	get inputNode() {
		return f(this.#t);
	}
	set inputNode(e) {
		H(this.#t, e, !0);
	}
	#n = A(null);
	get contentNode() {
		return f(this.#n);
	}
	set contentNode(e) {
		H(this.#n, e, !0);
	}
	contentPresence;
	#r = A(null);
	get viewportNode() {
		return f(this.#r);
	}
	set viewportNode(e) {
		H(this.#r, e, !0);
	}
	#i = A(null);
	get triggerNode() {
		return f(this.#i);
	}
	set triggerNode(e) {
		H(this.#i, e, !0);
	}
	#a = A(null);
	get valueNode() {
		return f(this.#a);
	}
	set valueNode(e) {
		H(this.#a, e, !0);
	}
	#o = A("");
	get valueId() {
		return f(this.#o);
	}
	set valueId(e) {
		H(this.#o, e, !0);
	}
	#s = A(null);
	get highlightedNode() {
		return f(this.#s);
	}
	set highlightedNode(e) {
		H(this.#s, e, !0);
	}
	#c = U(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-value") : null);
	get highlightedValue() {
		return f(this.#c);
	}
	set highlightedValue(e) {
		H(this.#c, e);
	}
	#l = U(() => {
		if (this.highlightedNode) return this.highlightedNode.id;
	});
	get highlightedId() {
		return f(this.#l);
	}
	set highlightedId(e) {
		H(this.#l, e);
	}
	#u = U(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-label") : null);
	get highlightedLabel() {
		return f(this.#u);
	}
	set highlightedLabel(e) {
		H(this.#u, e);
	}
	#d = A(!1);
	get contentIsPositioned() {
		return f(this.#d);
	}
	set contentIsPositioned(e) {
		H(this.#d, e, !0);
	}
	isUsingKeyboard = !1;
	isCombobox = !1;
	domContext = new je(() => null);
	constructor(e) {
		this.opts = e, this.isCombobox = e.isCombobox, this.contentPresence = new ct({
			ref: $(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), l(() => {
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
	getBitsAttr = (e) => Gt.getAttr(e, this.isCombobox ? "combobox" : void 0);
}, Yt = class extends Jt {
	opts;
	isMulti = !1;
	#e = U(() => this.opts.value.current !== "");
	get hasValue() {
		return f(this.#e);
	}
	set hasValue(e) {
		H(this.#e, e);
	}
	#t = U(() => this.opts.items.current.length ? this.opts.items.current.find((e) => e.value === this.opts.value.current)?.label ?? "" : "");
	get currentLabel() {
		return f(this.#t);
	}
	set currentLabel(e) {
		H(this.#t, e);
	}
	#n = U(() => this.opts.items.current.length ? this.opts.items.current.filter((e) => !e.disabled).map((e) => e.label) : []);
	get candidateLabels() {
		return f(this.#n);
	}
	set candidateLabels(e) {
		H(this.#n, e);
	}
	#r = U(() => !(this.isMulti || this.opts.items.current.length === 0));
	get dataTypeaheadEnabled() {
		return f(this.#r);
	}
	set dataTypeaheadEnabled(e) {
		H(this.#r, e);
	}
	constructor(e) {
		super(e), this.opts = e, o(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), xe(() => this.opts.open.current, () => {
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
		fe(() => {
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
}, Xt = class extends Jt {
	opts;
	isMulti = !0;
	#e = U(() => this.opts.value.current.length > 0);
	get hasValue() {
		return f(this.#e);
	}
	set hasValue(e) {
		H(this.#e, e);
	}
	constructor(e) {
		super(e), this.opts = e, o(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), xe(() => this.opts.open.current, () => {
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
		fe(() => {
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
}, Zt = class {
	static create(e) {
		let { type: t, ...n } = e, r = t === "single" ? new Yt(n) : new Xt(n);
		return Kt.set(r);
	}
}, Qt = class e {
	static create(t) {
		return new e(t, Kt.get());
	}
	root;
	opts;
	attachment;
	constructor(e, t) {
		this.root = t, this.opts = e, this.attachment = de(e.ref, (e) => this.root.valueNode = e), this.setValue = this.setValue.bind(this);
	}
	setValue(e) {
		this.root.isMulti && !Array.isArray(e) || !this.root.isMulti && typeof e != "string" || (this.root.opts.value.current = e);
	}
	#e = U(() => {
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
		return f(this.#e);
	}
	set snippetProps(e) {
		H(this.#e, e);
	}
	#t = U(() => ({
		id: this.opts.id.current,
		"data-placeholder": this.root.hasValue ? void 0 : "",
		"data-select-value": "",
		...this.attachment
	}));
	get props() {
		return f(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
}, $t = class e {
	static create(t) {
		return new e(t, Kt.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = de(e.ref, (e) => this.root.inputNode = e), this.root.domContext = new je(e.ref), this.onkeydown = this.onkeydown.bind(this), this.oninput = this.oninput.bind(this), xe([() => this.root.opts.value.current, () => this.opts.clearOnDeselect.current], ([e, t], [n]) => {
			t && (Array.isArray(e) && Array.isArray(n) ? e.length === 0 && n.length !== 0 && (this.root.opts.inputValue.current = "") : e === "" && n !== "" && (this.root.opts.inputValue.current = ""));
		});
	}
	onkeydown(e) {
		if (this.root.isUsingKeyboard = !0, e.key !== "Escape") {
			if ((e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault(), !this.root.opts.open.current) {
				if (Vt.includes(e.key) || e.key === "Tab" || e.key === "Backspace" && this.root.opts.inputValue.current === "" || (this.root.handleOpen(), this.root.hasValue)) return;
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
			if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), Wt.includes(e.key)) {
				e.preventDefault();
				let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
				if (e.key === "ArrowDown" ? a = Oe(t, r, i) : e.key === "ArrowUp" ? a = Ce(t, r, i) : e.key === "PageDown" ? a = Se(t, r, 10, i) : e.key === "PageUp" ? a = we(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
				this.root.setHighlightedNode(a);
				return;
			}
			Vt.includes(e.key) || this.root.highlightedNode || this.root.setHighlightedToFirstCandidate();
		}
	}
	oninput(e) {
		this.root.opts.inputValue.current = e.currentTarget.value, this.root.setHighlightedToFirstCandidate();
	}
	#e = U(() => ({
		id: this.opts.id.current,
		role: "combobox",
		disabled: this.root.opts.disabled.current ? !0 : void 0,
		"aria-activedescendant": this.root.highlightedId,
		"aria-autocomplete": "list",
		"aria-expanded": _e(this.root.opts.open.current),
		"data-state": me(this.root.opts.open.current),
		"data-disabled": he(this.root.opts.disabled.current),
		onkeydown: this.onkeydown,
		oninput: this.oninput,
		[this.root.getBitsAttr("input")]: "",
		...this.attachment
	}));
	get props() {
		return f(this.#e);
	}
	set props(e) {
		H(this.#e, e);
	}
}, en = class e {
	static create(t) {
		return new e(t, Kt.get());
	}
	opts;
	root;
	attachment;
	#e;
	#t;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = de(e.ref, (e) => this.root.triggerNode = e), this.root.domContext = new je(e.ref), this.#e = new Ee({
			getCurrentItem: () => this.root.highlightedNode,
			onMatch: (e) => {
				this.root.setHighlightedNode(e);
			},
			getActiveElement: () => this.root.domContext.getActiveElement(),
			getWindow: () => this.root.domContext.getWindow()
		}), this.#t = new Bt({
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
		if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), Wt.includes(e.key)) {
			e.preventDefault();
			let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
			if (e.key === "ArrowDown" ? a = Oe(t, r, i) : e.key === "ArrowUp" ? a = Ce(t, r, i) : e.key === "PageDown" ? a = Se(t, r, 10, i) : e.key === "PageUp" ? a = we(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
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
	#a = U(() => ({
		id: this.opts.id.current,
		disabled: this.root.opts.disabled.current ? !0 : void 0,
		"aria-haspopup": "listbox",
		"aria-expanded": _e(this.root.opts.open.current),
		"aria-activedescendant": this.root.highlightedId,
		"data-state": me(this.root.opts.open.current),
		"data-disabled": he(this.root.opts.disabled.current),
		"data-placeholder": this.root.hasValue ? void 0 : "",
		[this.root.getBitsAttr("trigger")]: "",
		onpointerdown: this.onpointerdown,
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		onpointerup: this.onpointerup,
		...this.attachment
	}));
	get props() {
		return f(this.#a);
	}
	set props(e) {
		H(this.#a, e);
	}
}, tn = class e {
	static create(t) {
		return qt.set(new e(t, Kt.get()));
	}
	opts;
	root;
	attachment;
	#e = A(!1);
	get isPositioned() {
		return f(this.#e);
	}
	set isPositioned(e) {
		H(this.#e, e, !0);
	}
	domContext;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = de(e.ref, (e) => this.root.contentNode = e), this.domContext = new je(this.opts.ref), this.root.domContext === null && (this.root.domContext = this.domContext), ce(() => {
			this.root.contentNode = null, this.root.contentIsPositioned = !1, this.isPositioned = !1;
		}), xe(() => this.root.opts.open.current, () => {
			this.root.opts.open.current || (this.root.contentIsPositioned = !1, this.isPositioned = !1);
		}), xe([() => this.isPositioned, () => this.root.highlightedNode], () => {
			!this.isPositioned || !this.root.highlightedNode || this.root.scrollHighlightedNodeIntoView(this.root.highlightedNode);
		}), this.onpointermove = this.onpointermove.bind(this);
	}
	onpointermove(e) {
		this.root.isUsingKeyboard = !1;
	}
	#t = U(() => gt(this.root.isCombobox ? "combobox" : "select"));
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
	#n = U(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return f(this.#n);
	}
	set snippetProps(e) {
		H(this.#n, e);
	}
	#r = U(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-multiselectable": this.root.isMulti ? "true" : void 0,
		"data-state": me(this.root.opts.open.current),
		...ye(this.root.contentPresence.transitionStatus),
		[this.root.getBitsAttr("content")]: "",
		style: {
			display: "flex",
			flexDirection: "column",
			outline: "none",
			boxSizing: "border-box",
			pointerEvents: "auto",
			...f(this.#t)
		},
		onpointermove: this.onpointermove,
		...this.attachment
	}));
	get props() {
		return f(this.#r);
	}
	set props(e) {
		H(this.#r, e);
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
}, nn = class e {
	static create(t) {
		return new e(t, Kt.get());
	}
	opts;
	root;
	attachment;
	#e = U(() => this.root.includesItem(this.opts.value.current));
	get isSelected() {
		return f(this.#e);
	}
	set isSelected(e) {
		H(this.#e, e);
	}
	#t = U(() => this.root.highlightedValue === this.opts.value.current);
	get isHighlighted() {
		return f(this.#t);
	}
	set isHighlighted(e) {
		H(this.#t, e);
	}
	prevHighlighted = new be(() => this.isHighlighted);
	#n = A(!1);
	get mounted() {
		return f(this.#n);
	}
	set mounted(e) {
		H(this.#n, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = de(e.ref), xe([() => this.isHighlighted, () => this.prevHighlighted.current], () => {
			this.isHighlighted ? this.opts.onHighlight.current() : this.prevHighlighted.current && this.opts.onUnhighlight.current();
		}), xe(() => this.mounted, () => {
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
	#r = U(() => ({
		selected: this.isSelected,
		highlighted: this.isHighlighted
	}));
	get snippetProps() {
		return f(this.#r);
	}
	set snippetProps(e) {
		H(this.#r, e);
	}
	onpointerdown(e) {
		e.preventDefault();
	}
	onpointerup(e) {
		if (!(e.defaultPrevented || !this.opts.ref.current)) {
			if (e.pointerType === "touch" && !st) {
				Y(this.opts.ref.current, "click", () => {
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
	#i = U(() => ({
		id: this.opts.id.current,
		role: "option",
		"aria-selected": this.root.includesItem(this.opts.value.current) ? "true" : void 0,
		"data-value": this.opts.value.current,
		"data-disabled": he(this.opts.disabled.current),
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
		return f(this.#i);
	}
	set props(e) {
		H(this.#i, e);
	}
}, rn = class e {
	static create(t) {
		return new e(t, Kt.get());
	}
	opts;
	root;
	#e = U(() => this.root.opts.name.current !== "");
	get shouldRender() {
		return f(this.#e);
	}
	set shouldRender(e) {
		H(this.#e, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		e.preventDefault(), this.root.isCombobox ? this.root.inputNode?.focus() : this.root.triggerNode?.focus();
	}
	#t = U(() => ({
		disabled: le(this.root.opts.disabled.current),
		required: le(this.root.opts.required.current),
		name: this.root.opts.name.current,
		value: this.opts.value.current,
		onfocus: this.onfocus
	}));
	get props() {
		return f(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
}, an = class e {
	static create(t) {
		return new e(t, qt.get());
	}
	opts;
	content;
	root;
	attachment;
	#e = A(0);
	get prevScrollTop() {
		return f(this.#e);
	}
	set prevScrollTop(e) {
		H(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = de(e.ref, (e) => {
			this.root.viewportNode = e;
		});
	}
	#t = U(() => ({
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
		return f(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
}, on = class {
	opts;
	content;
	root;
	attachment;
	autoScrollTimer = null;
	userScrollTimer = -1;
	isUserScrolling = !1;
	onAutoScroll = nt;
	#e = A(!1);
	get mounted() {
		return f(this.#e);
	}
	set mounted(e) {
		H(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = de(e.ref), xe([() => this.mounted], () => {
			if (!this.mounted) {
				this.isUserScrolling = !1;
				return;
			}
			this.isUserScrolling;
		}), o(() => {
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
	#t = U(() => ({
		id: this.opts.id.current,
		"aria-hidden": pe(!0),
		style: { flexShrink: 0 },
		onpointerdown: this.onpointerdown,
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		...this.attachment
	}));
	get props() {
		return f(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
}, sn = class e {
	static create(t) {
		return new e(new on(t, qt.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = A(!1);
	get canScrollDown() {
		return f(this.#e);
	}
	set canScrollDown(e) {
		H(this.#e, e, !0);
	}
	scrollIntoViewTimer = null;
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, xe([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), Y(this.root.viewportNode, "scroll", () => this.handleScroll());
		}), xe([
			() => this.root.opts.inputValue.current,
			() => this.root.viewportNode,
			() => this.content.isPositioned
		], () => {
			!this.root.viewportNode || !this.content.isPositioned || this.handleScroll(!0);
		}), xe(() => this.scrollButtonState.mounted, () => {
			this.scrollButtonState.mounted && (this.scrollIntoViewTimer && clearTimeout(this.scrollIntoViewTimer), this.scrollIntoViewTimer = at(5, () => {
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
	#t = U(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-down-button")]: ""
	}));
	get props() {
		return f(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
}, cn = class e {
	static create(t) {
		return new e(new on(t, qt.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = A(!1);
	get canScrollUp() {
		return f(this.#e);
	}
	set canScrollUp(e) {
		H(this.#e, e, !0);
	}
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, xe([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), Y(this.root.viewportNode, "scroll", () => this.handleScroll());
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
	#t = U(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-up-button")]: ""
	}));
	get props() {
		return f(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-hidden-input.svelte
function ln(e, t) {
	s(t, !0);
	let n = E(t, "value", 15), r = rn.create({ value: $(() => n()) });
	var i = P(), a = m(i), o = (e) => {
		Pt(e, G(() => r.props, {
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
	N(a, (e) => {
		r.shouldRender && e(o);
	}), k(e, i), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/combobox/components/combobox.svelte
var un = K("<!> <!>", 1);
function dn(e, n) {
	s(n, !0);
	let i = E(n, "value", 15), a = E(n, "onValueChange", 3, nt), o = E(n, "name", 3, ""), c = E(n, "disabled", 3, !1), l = E(n, "open", 15, !1), u = E(n, "onOpenChange", 3, nt), d = E(n, "onOpenChangeComplete", 3, nt), p = E(n, "loop", 3, !1), h = E(n, "scrollAlignment", 3, "nearest"), _ = E(n, "required", 3, !1), y = E(n, "items", 19, () => []), b = E(n, "allowDeselect", 3, !0), x = E(n, "inputValue", 7, "");
	i() === void 0 && i(n.type === "single" ? "" : []), xe.pre(() => i(), () => {
		i() === void 0 && i(n.type === "single" ? "" : []);
	});
	let S = Zt.create({
		type: n.type,
		value: $(() => i(), (e) => {
			i(e), a()(e);
		}),
		disabled: $(() => c()),
		required: $(() => _()),
		open: $(() => l(), (e) => {
			l(e), u()(e);
		}),
		loop: $(() => p()),
		scrollAlignment: $(() => h()),
		name: $(() => o()),
		isCombobox: !0,
		items: $(() => y()),
		allowDeselect: $(() => b()),
		inputValue: $(() => x(), (e) => x(e)),
		onOpenChangeComplete: $(() => d())
	});
	var C = un(), w = m(C);
	vt(w, {
		children: (e, t) => {
			var r = P();
			g(m(r), () => n.children ?? R), k(e, r);
		},
		$$slots: { default: !0 }
	});
	var T = t(w, 2), D = (e) => {
		var t = P(), n = m(t), i = (e) => {
			var t = P();
			r(m(t), 16, () => S.opts.value.current, (e) => e, (e, t) => {
				ln(e, { get value() {
					return t;
				} });
			}), k(e, t);
		};
		N(n, (e) => {
			S.opts.value.current.length && e(i);
		}), k(e, t);
	}, O = U(() => Array.isArray(S.opts.value.current)), A = (e) => {
		ln(e, {
			get value() {
				return S.opts.value.current;
			},
			set value(e) {
				S.opts.value.current = e;
			}
		});
	};
	N(T, (e) => {
		f(O) ? e(D) : e(A, -1);
	}), k(e, C), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/combobox/components/combobox-input.svelte
var fn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"defaultValue",
	"clearOnDeselect"
]), pn = K("<input/>");
function mn(e, t) {
	s(t, !0);
	let r = E(t, "id", 19, Me), i = E(t, "ref", 15, null), a = E(t, "clearOnDeselect", 3, !1), o = B(t, fn), c = $t.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e)),
		clearOnDeselect: $(() => a())
	});
	t.defaultValue && (c.root.opts.inputValue.current = t.defaultValue);
	let l = U(() => ke(o, c.props, { value: c.root.opts.inputValue.current }));
	var u = P();
	n(m(u), () => bt, (e, n) => {
		n(e, {
			get id() {
				return r();
			},
			get ref() {
				return c.opts.ref;
			},
			children: (e, n) => {
				var r = P(), i = m(r), a = (e) => {
					var n = P();
					g(m(n), () => t.child, () => ({ props: f(l) })), k(e, n);
				}, o = (e) => {
					var t = pn();
					S(t, () => ({ ...f(l) }), void 0, void 0, void 0, void 0, !0), k(e, t);
				};
				N(i, (e) => {
					t.child ? e(a) : e(o, -1);
				}), k(e, r);
			},
			$$slots: { default: !0 }
		});
	}), k(e, u), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-content.svelte
var hn = new Set([
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
]), gn = K("<div><div><!></div></div>");
function _n(e, t) {
	let n = L();
	s(t, !0);
	let r = E(t, "id", 19, () => Ae(n)), i = E(t, "ref", 15, null), a = E(t, "forceMount", 3, !1), o = E(t, "side", 3, "bottom"), c = E(t, "onInteractOutside", 3, nt), l = E(t, "onEscapeKeydown", 3, nt), u = E(t, "preventScroll", 3, !1), d = B(t, hn), p = tn.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e)),
		onInteractOutside: $(() => c()),
		onEscapeKeydown: $(() => l())
	}), _ = U(() => ke(d, p.props));
	var y = P(), b = m(y), x = (e) => {
		yt(e, G(() => f(_), () => p.popperProps, {
			get ref() {
				return p.opts.ref;
			},
			get side() {
				return o();
			},
			get enabled() {
				return p.root.opts.open.current;
			},
			get id() {
				return r();
			},
			get preventScroll() {
				return u();
			},
			forceMount: !0,
			get shouldRender() {
				return p.shouldRender;
			},
			popper: (e, n) => {
				let r = () => n?.().props, i = () => n?.().wrapperProps, a = U(() => ke(r(), { style: p.props.style }, { style: t.style }));
				var o = P(), s = m(o), c = (e) => {
					var n = P(), r = m(n);
					{
						let e = U(() => ({
							props: f(a),
							wrapperProps: i(),
							...p.snippetProps
						}));
						g(r, () => t.child, () => f(e));
					}
					k(e, n);
				}, l = (e) => {
					var n = gn();
					S(n, () => ({ ...i() }));
					var r = C(n);
					S(r, () => ({ ...f(a) })), g(C(r), () => t.children ?? R), h(r), h(n), k(e, n);
				};
				N(s, (e) => {
					t.child ? e(c) : e(l, -1);
				}), k(e, o);
			},
			$$slots: { popper: !0 }
		}));
	}, w = (e) => {
		_t(e, G(() => f(_), () => p.popperProps, {
			get ref() {
				return p.opts.ref;
			},
			get side() {
				return o();
			},
			get open() {
				return p.root.opts.open.current;
			},
			get id() {
				return r();
			},
			get preventScroll() {
				return u();
			},
			forceMount: !1,
			get shouldRender() {
				return p.shouldRender;
			},
			popper: (e, n) => {
				let r = () => n?.().props, i = () => n?.().wrapperProps, a = U(() => ke(r(), { style: p.props.style }, { style: t.style }));
				var o = P(), s = m(o), c = (e) => {
					var n = P(), r = m(n);
					{
						let e = U(() => ({
							props: f(a),
							wrapperProps: i(),
							...p.snippetProps
						}));
						g(r, () => t.child, () => f(e));
					}
					k(e, n);
				}, l = (e) => {
					var n = gn();
					S(n, () => ({ ...i() }));
					var r = C(n);
					S(r, () => ({ ...f(a) })), g(C(r), () => t.children ?? R), h(r), h(n), k(e, n);
				};
				N(s, (e) => {
					t.child ? e(c) : e(l, -1);
				}), k(e, o);
			},
			$$slots: { popper: !0 }
		}));
	};
	N(b, (e) => {
		a() ? e(x) : a() || e(w, 1);
	}), k(e, y), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/mounted.svelte
function vn(e, t) {
	s(t, !0);
	let n = E(t, "mounted", 15, !1), r = E(t, "onMountedChange", 3, nt);
	We(() => (n(!0), r()(!0), () => {
		n(!1), r()(!1);
	})), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-item.svelte
var yn = new Set([
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
]), bn = K("<div><!></div>"), xn = K("<!> <!>", 1);
function Sn(e, n) {
	let r = L();
	s(n, !0);
	let i = E(n, "id", 19, () => Ae(r)), a = E(n, "ref", 15, null), o = E(n, "label", 19, () => n.value), c = E(n, "disabled", 3, !1), l = E(n, "onHighlight", 3, nt), u = E(n, "onUnhighlight", 3, nt), d = B(n, yn), p = nn.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e)),
		value: $(() => n.value),
		disabled: $(() => c()),
		label: $(() => o()),
		onHighlight: $(() => l()),
		onUnhighlight: $(() => u())
	}), _ = U(() => ke(d, p.props));
	var y = xn(), b = m(y), x = (e) => {
		var t = P(), r = m(t);
		{
			let e = U(() => ({
				props: f(_),
				...p.snippetProps
			}));
			g(r, () => n.child, () => f(e));
		}
		k(e, t);
	}, w = (e) => {
		var t = bn();
		S(t, () => ({ ...f(_) })), g(C(t), () => n.children ?? R, () => p.snippetProps), h(t), k(e, t);
	};
	N(b, (e) => {
		n.child ? e(x) : e(w, -1);
	}), vn(t(b, 2), {
		get mounted() {
			return p.mounted;
		},
		set mounted(e) {
			p.mounted = e;
		}
	}), k(e, y), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-viewport.svelte
var Cn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), wn = K("<div><!></div>"), Tn = {
	hash: "svelte-gsan7o",
	code: "\n	/* Hide scrollbars cross browser and enable momentum scroll for touch devices */[data-select-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport]::-webkit-scrollbar {display:none !important;}[data-select-viewport]::-webkit-scrollbar {display:none !important;}"
};
function En(e, t) {
	let n = L();
	s(t, !0), T(e, Tn);
	let r = E(t, "id", 19, () => Ae(n)), i = E(t, "ref", 15, null), a = B(t, Cn), o = an.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), c = U(() => ke(a, o.props));
	var l = P(), u = m(l), d = (e) => {
		var n = P();
		g(m(n), () => t.child, () => ({ props: f(c) })), k(e, n);
	}, p = (e) => {
		var n = wn();
		S(n, () => ({ ...f(c) })), g(C(n), () => t.children ?? R), h(n), k(e, n);
	};
	N(u, (e) => {
		t.child ? e(d) : e(p, -1);
	}), k(e, l), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-scroll-down-button.svelte
var Dn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), On = K("<div><!></div>"), kn = K("<!> <!>", 1);
function An(e, n) {
	let r = L();
	s(n, !0);
	let i = E(n, "id", 19, () => Ae(r)), a = E(n, "ref", 15, null), o = E(n, "delay", 3, () => 50), c = B(n, Dn), l = sn.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e)),
		delay: $(() => o())
	}), u = U(() => ke(c, l.props));
	var d = P(), p = m(d), _ = (e) => {
		var r = kn(), i = m(r);
		vn(i, {
			get mounted() {
				return l.scrollButtonState.mounted;
			},
			set mounted(e) {
				l.scrollButtonState.mounted = e;
			}
		});
		var a = t(i, 2), o = (e) => {
			var t = P();
			g(m(t), () => n.child, () => ({ props: c })), k(e, t);
		}, s = (e) => {
			var t = On();
			S(t, () => ({ ...f(u) })), g(C(t), () => n.children ?? R), h(t), k(e, t);
		};
		N(a, (e) => {
			n.child ? e(o) : e(s, -1);
		}), k(e, r);
	};
	N(p, (e) => {
		l.canScrollDown && e(_);
	}), k(e, d), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-scroll-up-button.svelte
var jn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), Mn = K("<div><!></div>"), Nn = K("<!> <!>", 1);
function Pn(e, n) {
	let r = L();
	s(n, !0);
	let i = E(n, "id", 19, () => Ae(r)), a = E(n, "ref", 15, null), o = E(n, "delay", 3, () => 50), c = B(n, jn), l = cn.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e)),
		delay: $(() => o())
	}), u = U(() => ke(c, l.props));
	var d = P(), p = m(d), _ = (e) => {
		var r = Nn(), i = m(r);
		vn(i, {
			get mounted() {
				return l.scrollButtonState.mounted;
			},
			set mounted(e) {
				l.scrollButtonState.mounted = e;
			}
		});
		var a = t(i, 2), o = (e) => {
			var t = P();
			g(m(t), () => n.child, () => ({ props: c })), k(e, t);
		}, s = (e) => {
			var t = Mn();
			S(t, () => ({ ...f(u) })), g(C(t), () => n.children ?? R), h(t), k(e, t);
		};
		N(a, (e) => {
			n.child ? e(o) : e(s, -1);
		}), k(e, r);
	};
	N(p, (e) => {
		l.canScrollUp && e(_);
	}), k(e, d), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/label/label.svelte.js
var Fn = ge({
	component: "label",
	parts: ["root"]
}), In = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = de(this.opts.ref), this.onmousedown = this.onmousedown.bind(this);
	}
	onmousedown(e) {
		e.detail > 1 && e.preventDefault();
	}
	#e = U(() => ({
		id: this.opts.id.current,
		[Fn.root]: "",
		onmousedown: this.onmousedown,
		...this.attachment
	}));
	get props() {
		return f(this.#e);
	}
	set props(e) {
		H(this.#e, e);
	}
}, Ln = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"for"
]), Rn = K("<label><!></label>");
function zn(e, t) {
	let n = L();
	s(t, !0);
	let r = E(t, "id", 19, () => Ae(n)), i = E(t, "ref", 15, null), a = B(t, Ln), o = In.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), c = U(() => ke(a, o.props, { for: t.for }));
	var l = P(), u = m(l), d = (e) => {
		var n = P();
		g(m(n), () => t.child, () => ({ props: f(c) })), k(e, n);
	}, p = (e) => {
		var n = Rn();
		S(n, () => ({
			...f(c),
			for: t.for
		})), g(C(n), () => t.children ?? R), h(n), k(e, n);
	};
	N(u, (e) => {
		t.child ? e(d) : e(p, -1);
	}), k(e, l), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select.svelte
var Bn = K("<!> <!>", 1);
function Vn(e, n) {
	s(n, !0);
	let i = E(n, "value", 15), a = E(n, "onValueChange", 3, nt), o = E(n, "name", 3, ""), c = E(n, "disabled", 3, !1), l = E(n, "open", 15, !1), u = E(n, "onOpenChange", 3, nt), d = E(n, "onOpenChangeComplete", 3, nt), p = E(n, "loop", 3, !1), h = E(n, "scrollAlignment", 3, "nearest"), _ = E(n, "required", 3, !1), y = E(n, "items", 19, () => []), b = E(n, "allowDeselect", 3, !1);
	function x() {
		i() === void 0 && i(n.type === "single" ? "" : []);
	}
	x(), xe.pre(() => i(), () => {
		x();
	});
	let S = A(""), C = Zt.create({
		type: n.type,
		value: $(() => i(), (e) => {
			i(e), a()(e);
		}),
		disabled: $(() => c()),
		required: $(() => _()),
		open: $(() => l(), (e) => {
			l(e), u()(e);
		}),
		loop: $(() => p()),
		scrollAlignment: $(() => h()),
		name: $(() => o()),
		isCombobox: !1,
		items: $(() => y()),
		allowDeselect: $(() => b()),
		inputValue: $(() => f(S), (e) => H(S, e, !0)),
		onOpenChangeComplete: $(() => d())
	});
	var w = Bn(), T = m(w);
	vt(T, {
		children: (e, t) => {
			var r = P();
			g(m(r), () => n.children ?? R), k(e, r);
		},
		$$slots: { default: !0 }
	});
	var D = t(T, 2), O = (e) => {
		var t = P(), i = m(t), a = (e) => {
			ln(e, { get autocomplete() {
				return n.autocomplete;
			} });
		}, o = (e) => {
			var t = P();
			r(m(t), 16, () => C.opts.value.current, (e) => e, (e, t) => {
				ln(e, {
					get value() {
						return t;
					},
					get autocomplete() {
						return n.autocomplete;
					}
				});
			}), k(e, t);
		};
		N(i, (e) => {
			C.opts.value.current.length === 0 ? e(a) : e(o, -1);
		}), k(e, t);
	}, j = U(() => Array.isArray(C.opts.value.current)), M = (e) => {
		ln(e, {
			get autocomplete() {
				return n.autocomplete;
			},
			get value() {
				return C.opts.value.current;
			},
			set value(e) {
				C.opts.value.current = e;
			}
		});
	};
	N(D, (e) => {
		f(j) ? e(O) : e(M, -1);
	}), k(e, w), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-value.svelte
var Hn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"placeholder",
	"child",
	"children"
]), Un = K("<span><!></span>");
function Wn(e, t) {
	let n = L();
	s(t, !0);
	let r = E(t, "ref", 15, null), i = E(t, "id", 19, () => Ae(n)), a = B(t, Hn), o = Qt.create({
		id: $(() => i()),
		ref: $(() => r(), (e) => r(e)),
		placeholder: $(() => t.placeholder)
	}), c = U(() => ke(a, o.props));
	var l = P(), u = m(l), d = (e) => {
		var n = P(), r = m(n);
		{
			let e = U(() => ({
				props: f(c),
				...o.snippetProps
			}));
			g(r, () => t.child, () => f(e));
		}
		k(e, n);
	}, p = (e) => {
		var n = Un();
		S(n, () => ({ ...f(c) }));
		var r = C(n), i = (e) => {
			var n = P();
			g(m(n), () => t.children ?? R, () => o.snippetProps), k(e, n);
		}, a = (e) => {
			var n = M();
			y(() => V(n, o.snippetProps.selection.selected?.label ?? t.placeholder)), k(e, n);
		}, s = (e) => {
			var n = M();
			y((e) => V(n, e), [() => o.snippetProps.selection.selected.length > 0 ? o.snippetProps.selection.selected.map((e) => e.label).join(", ") : t.placeholder]), k(e, n);
		}, l = (e) => {
			var n = M();
			y(() => V(n, t.placeholder)), k(e, n);
		};
		N(r, (e) => {
			t.children ? e(i) : o.snippetProps.selection.type === "single" ? e(a, 1) : o.snippetProps.selection.type === "multiple" && o.snippetProps.selection.selected ? e(s, 2) : e(l, -1);
		}), h(n), k(e, n);
	};
	N(u, (e) => {
		t.child ? e(d) : e(p, -1);
	}), k(e, l), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-trigger.svelte
var Gn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"type"
]), Kn = K("<button><!></button>");
function qn(e, t) {
	let r = L();
	s(t, !0);
	let i = E(t, "id", 19, () => Ae(r)), a = E(t, "ref", 15, null), o = E(t, "type", 3, "button"), c = B(t, Gn), l = en.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e))
	}), u = U(() => ke(c, l.props, { type: o() }));
	var d = P();
	n(m(d), () => bt, (e, n) => {
		n(e, {
			get id() {
				return i();
			},
			get ref() {
				return l.opts.ref;
			},
			children: (e, n) => {
				var r = P(), i = m(r), a = (e) => {
					var n = P();
					g(m(n), () => t.child, () => ({ props: f(u) })), k(e, n);
				}, o = (e) => {
					var n = Kn();
					S(n, () => ({ ...f(u) })), g(C(n), () => t.children ?? R), h(n), k(e, n);
				};
				N(i, (e) => {
					t.child ? e(a) : e(o, -1);
				}), k(e, r);
			},
			$$slots: { default: !0 }
		});
	}), k(e, d), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/switch/switch.svelte.js
var Jn = ge({
	component: "switch",
	parts: ["root", "thumb"]
}), Yn = new se("Switch.Root"), Xn = class e {
	static create(t) {
		return Yn.set(new e(t));
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = de(e.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this);
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
	#t = U(() => ({
		"data-disabled": he(this.opts.disabled.current),
		"data-state": ue(this.opts.checked.current),
		"data-required": he(this.opts.required.current)
	}));
	get sharedProps() {
		return f(this.#t);
	}
	set sharedProps(e) {
		H(this.#t, e);
	}
	#n = U(() => ({ checked: this.opts.checked.current }));
	get snippetProps() {
		return f(this.#n);
	}
	set snippetProps(e) {
		H(this.#n, e);
	}
	#r = U(() => ({
		...this.sharedProps,
		id: this.opts.id.current,
		role: "switch",
		disabled: le(this.opts.disabled.current),
		"aria-checked": ve(this.opts.checked.current, !1),
		"aria-required": _e(this.opts.required.current),
		[Jn.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return f(this.#r);
	}
	set props(e) {
		H(this.#r, e);
	}
}, Zn = class e {
	static create() {
		return new e(Yn.get());
	}
	root;
	#e = U(() => this.root.opts.name.current !== void 0);
	get shouldRender() {
		return f(this.#e);
	}
	set shouldRender(e) {
		H(this.#e, e);
	}
	constructor(e) {
		this.root = e;
	}
	#t = U(() => ({
		type: "checkbox",
		name: this.root.opts.name.current,
		value: this.root.opts.value.current,
		checked: this.root.opts.checked.current,
		disabled: this.root.opts.disabled.current,
		required: this.root.opts.required.current
	}));
	get props() {
		return f(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
}, Qn = class e {
	static create(t) {
		return new e(t, Yn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = de(e.ref);
	}
	#e = U(() => ({ checked: this.root.opts.checked.current }));
	get snippetProps() {
		return f(this.#e);
	}
	set snippetProps(e) {
		H(this.#e, e);
	}
	#t = U(() => ({
		...this.root.sharedProps,
		id: this.opts.id.current,
		[Jn.thumb]: "",
		...this.attachment
	}));
	get props() {
		return f(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/switch/components/switch-input.svelte
function $n(e, t) {
	s(t, !1);
	let n = Zn.create();
	I();
	var r = P(), i = m(r), a = (e) => {
		Pt(e, G(() => n.props));
	};
	N(i, (e) => {
		n.shouldRender && e(a);
	}), k(e, r), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/switch/components/switch.svelte
var er = new Set([
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
]), tr = K("<button><!></button>"), nr = K("<!> <!>", 1);
function rr(e, n) {
	let r = L();
	s(n, !0);
	let i = E(n, "ref", 15, null), a = E(n, "id", 19, () => Ae(r)), o = E(n, "disabled", 3, !1), c = E(n, "required", 3, !1), l = E(n, "checked", 15, !1), u = E(n, "value", 3, "on"), d = E(n, "name", 3, void 0), p = E(n, "type", 3, "button"), _ = E(n, "onCheckedChange", 3, nt), y = B(n, er), b = Xn.create({
		checked: $(() => l(), (e) => {
			l(e), _()?.(e);
		}),
		disabled: $(() => o() ?? !1),
		required: $(() => c()),
		value: $(() => u()),
		name: $(() => d()),
		id: $(() => a()),
		ref: $(() => i(), (e) => i(e))
	}), x = U(() => ke(y, b.props, { type: p() }));
	var w = nr(), T = m(w), D = (e) => {
		var t = P(), r = m(t);
		{
			let e = U(() => ({
				props: f(x),
				...b.snippetProps
			}));
			g(r, () => n.child, () => f(e));
		}
		k(e, t);
	}, O = (e) => {
		var t = tr();
		S(t, () => ({ ...f(x) })), g(C(t), () => n.children ?? R, () => b.snippetProps), h(t), k(e, t);
	};
	N(T, (e) => {
		n.child ? e(D) : e(O, -1);
	}), $n(t(T, 2), {}), k(e, w), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/switch/components/switch-thumb.svelte
var ir = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"ref",
	"id"
]), ar = K("<span><!></span>");
function or(e, t) {
	let n = L();
	s(t, !0);
	let r = E(t, "ref", 15, null), i = E(t, "id", 19, () => Ae(n)), a = B(t, ir), o = Qn.create({
		id: $(() => i()),
		ref: $(() => r(), (e) => r(e))
	}), c = U(() => ke(a, o.props));
	var l = P(), u = m(l), d = (e) => {
		var n = P(), r = m(n);
		{
			let e = U(() => ({
				props: f(c),
				...o.snippetProps
			}));
			g(r, () => t.child, () => f(e));
		}
		k(e, n);
	}, p = (e) => {
		var n = ar();
		S(n, () => ({ ...f(c) })), g(C(n), () => t.children ?? R, () => o.snippetProps), h(n), k(e, n);
	};
	N(u, (e) => {
		t.child ? e(d) : e(p, -1);
	}), k(e, l), v();
}
//#endregion
//#region ../ui/src/lib/components/input/label.svelte
var sr = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function cr(e, t) {
	s(t, !0);
	let r = B(t, sr);
	var i = P(), a = m(i);
	{
		let e = U(() => Q("text-sm font-medium text-dark-50", t.class));
		n(a, () => zn, (n, i) => {
			i(n, G({ get children() {
				return t.children;
			} }, () => r, { get class() {
				return f(e);
			} }));
		});
	}
	k(e, i), v();
}
//#endregion
//#region ../ui/src/lib/components/input/input-checkbox.svelte
var lr = K("<div><!> <!></div>"), ur = K("<p class=\"text-sm text-red-400\"> </p>"), dr = K("<div><div class=\"flex items-center gap-2\"><!> <!></div> <!></div>");
function fr(e, r) {
	s(r, !0);
	let i = E(r, "checked", 15, !1), a = E(r, "id", 19, Me), o = E(r, "inline", 3, !1);
	var c = P(), l = m(c), u = (e) => {
		var o = lr(), s = C(o);
		{
			let e = (e, t) => {
				let n = () => t?.().checked;
				var r = P(), i = m(r), a = (e) => {
					Z(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				N(i, (e) => {
					n() && e(a);
				}), k(e, r);
			}, t = U(() => r.label ? `${a()}-label` : void 0), o = U(() => r.error ? !0 : void 0), c = U(() => Q("peer inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary/15 data-[state=checked]:text-primary", "data-[state=unchecked]:bg-dark-700", r.error ? "border-red-500" : "border-dark-500 data-[state=unchecked]:hover:border-dark-400", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
			n(s, () => zt, (n, s) => {
				s(n, {
					get id() {
						return a();
					},
					get "aria-label"() {
						return r["aria-label"];
					},
					get "aria-labelledby"() {
						return f(t);
					},
					get "aria-invalid"() {
						return f(o);
					},
					get class() {
						return f(c);
					},
					get checked() {
						return i();
					},
					set checked(e) {
						i(e);
					},
					children: e,
					$$slots: { default: !0 }
				});
			});
		}
		var c = t(s, 2), l = (e) => {
			cr(e, {
				get id() {
					return `${a() ?? ""}-label`;
				},
				get for() {
					return a();
				},
				class: "cursor-pointer whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, t) => {
					w();
					var n = M();
					y(() => V(n, r.label)), k(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		N(c, (e) => {
			r.label && e(l);
		}), h(o), y((e) => j(o, 1, e), [() => W(Q("flex items-center gap-2", r.class))]), k(e, o);
	}, d = (e) => {
		var o = dr(), s = C(o), c = C(s);
		{
			let e = (e, t) => {
				let n = () => t?.().checked;
				var r = P(), i = m(r), a = (e) => {
					Z(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				N(i, (e) => {
					n() && e(a);
				}), k(e, r);
			}, t = U(() => r.label ? `${a()}-label` : void 0), o = U(() => r.error ? !0 : void 0), s = U(() => Q("peer inline-flex size-5 shrink-0 items-center justify-center rounded border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-dark-50", "data-[state=unchecked]:bg-dark-700", r.error ? "border-red-500" : "border-dark-500 data-[state=unchecked]:hover:border-dark-400", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
			n(c, () => zt, (n, c) => {
				c(n, {
					get id() {
						return a();
					},
					get "aria-label"() {
						return r["aria-label"];
					},
					get "aria-labelledby"() {
						return f(t);
					},
					get "aria-invalid"() {
						return f(o);
					},
					get class() {
						return f(s);
					},
					get checked() {
						return i();
					},
					set checked(e) {
						i(e);
					},
					children: e,
					$$slots: { default: !0 }
				});
			});
		}
		var l = t(c, 2), u = (e) => {
			cr(e, {
				get id() {
					return `${a() ?? ""}-label`;
				},
				get for() {
					return a();
				},
				class: "cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, t) => {
					w();
					var n = M();
					y(() => V(n, r.label)), k(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		N(l, (e) => {
			r.label && e(u);
		}), h(s);
		var d = t(s, 2), p = (e) => {
			var t = ur(), n = C(t, !0);
			h(t), y(() => V(n, r.error)), k(e, t);
		};
		N(d, (e) => {
			r.error && e(p);
		}), h(o), y((e) => j(o, 1, e), [() => W(Q("grid gap-2", r.class))]), k(e, o);
	};
	N(l, (e) => {
		o() ? e(u) : e(d, -1);
	}), k(e, c), v();
}
//#endregion
//#region ../ui/src/lib/monaco/configure-types.ts
var pr = {
	target: 99,
	module: 99,
	moduleResolution: 2,
	strict: !0,
	skipLibCheck: !0,
	allowJs: !0,
	isolatedModules: !0,
	noEmit: !0,
	allowNonTsExtensions: !0,
	esModuleInterop: !0
}, mr = "";
async function hr(e = []) {
	let t = e.map((e) => `${e.filePath ?? ""}\0${e.content}`).join("\0");
	if (t === mr) return;
	mr = t;
	let { typescriptDefaults: n } = (await import("./editor.main-xvnWKxZY.js")).languages.typescript;
	n.setCompilerOptions({
		...n.getCompilerOptions(),
		...pr
	}), n.setDiagnosticsOptions({
		noSemanticValidation: !1,
		noSyntaxValidation: !1,
		noSuggestionDiagnostics: !1
	}), n.setExtraLibs(e.map((e) => ({
		content: e.content,
		filePath: e.filePath ?? "file:///node_modules/@stream-kit/script-api/index.d.ts"
	})));
}
//#endregion
//#region ../ui/src/lib/monaco/theme.ts
var gr = {
	base: "vs-dark",
	inherit: !0,
	rules: [
		{
			token: "comment",
			foreground: "6b7280",
			fontStyle: "italic"
		},
		{
			token: "keyword",
			foreground: "c084fc"
		},
		{
			token: "string",
			foreground: "86efac"
		},
		{
			token: "number",
			foreground: "fbbf24"
		},
		{
			token: "type",
			foreground: "67e8f9"
		},
		{
			token: "identifier",
			foreground: "e5e7eb"
		}
	],
	colors: {
		"editor.background": "#111827",
		"editor.foreground": "#e5e7eb",
		"editorLineNumber.foreground": "#4b5563",
		"editorLineNumber.activeForeground": "#9ca3af",
		"editor.selectionBackground": "#374151",
		"editor.inactiveSelectionBackground": "#1f2937",
		"editorCursor.foreground": "#a78bfa",
		"editor.lineHighlightBackground": "#1f293780",
		"editorIndentGuide.background": "#374151",
		"editorIndentGuide.activeBackground": "#4b5563",
		"editorWidget.background": "#111827",
		"editorWidget.foreground": "#e5e7eb",
		"editorWidget.border": "#374151",
		"editorHoverWidget.background": "#111827",
		"editorHoverWidget.foreground": "#e5e7eb",
		"editorHoverWidget.border": "#374151",
		"editorSuggestWidget.background": "#111827",
		"editorSuggestWidget.foreground": "#e5e7eb",
		"editorSuggestWidget.border": "#374151",
		"editorSuggestWidget.selectedBackground": "#1f2937",
		"editorSuggestWidget.selectedForeground": "#f9fafb",
		"editorSuggestWidget.highlightForeground": "#c084fc",
		"editorSuggestWidget.focusHighlightForeground": "#c084fc",
		"menu.background": "#111827",
		"menu.foreground": "#e5e7eb",
		"menu.border": "#374151",
		"menu.selectionBackground": "#1f2937",
		"menu.selectionForeground": "#f9fafb",
		"menu.separatorBackground": "#374151",
		"editorActionList.background": "#111827",
		"editorActionList.foreground": "#e5e7eb",
		"editorActionList.focusBackground": "#1f2937",
		"editorActionList.focusForeground": "#f9fafb",
		"input.background": "#1f2937",
		"input.foreground": "#e5e7eb",
		"input.border": "#374151",
		"quickInput.background": "#111827",
		"quickInput.foreground": "#e5e7eb"
	}
};
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/editor/editor.worker.js?worker
function _r(e) {
	return new Worker("/plugin-host/assets/editor.worker-aMaeT3Bg.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/css/css.worker.js?worker
function vr(e) {
	return new Worker("/plugin-host/assets/css.worker-0WoSGFGE.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/html/html.worker.js?worker
function yr(e) {
	return new Worker("/plugin-host/assets/html.worker-DVhl5K-g.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/json/json.worker.js?worker
function br(e) {
	return new Worker("/plugin-host/assets/json.worker-BOHwf62w.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js?worker
function xr(e) {
	return new Worker("/plugin-host/assets/ts.worker-BptJClIA.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../ui/src/lib/monaco/setup.ts
var Sr = !1;
function Cr() {
	Sr || typeof globalThis > "u" || (Sr = !0, globalThis.MonacoEnvironment = { getWorker(e, t) {
		switch (t) {
			case "json": return new br();
			case "css":
			case "scss":
			case "less": return new vr();
			case "html":
			case "handlebars":
			case "razor": return new yr();
			case "typescript":
			case "javascript": return new xr();
			default: return new _r();
		}
	} });
}
//#endregion
//#region ../ui/src/lib/components/variable-popover/variable-popover.svelte
var wr = K("<p class=\"text-xs font-semibold text-dark-200\"> </p>"), Tr = K("<p class=\"py-2 text-xs text-dark-400\"> </p>"), Er = K("<li><button type=\"button\"><div class=\"flex min-w-0 flex-1 items-center gap-2.5\"><span class=\"shrink-0 rounded border border-primary-300 bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary transition-all duration-150 group-hover:border-primary-500/20 group-hover:bg-primary-500/15\"> </span> <span class=\"min-w-0 truncate text-dark-300 transition-colors duration-150 group-hover:text-dark-100\"> </span></div> <div class=\"flex size-4 shrink-0 items-center justify-center\"><!></div></button></li>"), Dr = K("<ul class=\"grid gap-1\"></ul>"), Or = K("<div class=\"mb-3 flex flex-col gap-2\"><!></div> <!>", 1), kr = K("<!> <!>", 1);
function Ar(n, i) {
	s(i, !0);
	let a = E(i, "title", 3, "Variables"), o = E(i, "emptyLabel", 3, "No variables available."), c = E(i, "ariaLabel", 3, "Show variables"), l = E(i, "copiedLabel", 3, "Copied"), u = E(i, "insertedLabel", 3, "Inserted");
	E(i, "noResultsLabel", 3, "No variables match your search.");
	let d = E(i, "icon", 3, "ri:braces-line"), p = A(null);
	function g(e) {
		if (i.onInsert) {
			i.onInsert(e);
			return;
		}
		navigator.clipboard.writeText(`{${e}}`).then(() => {
			H(p, e, !0), setTimeout(() => {
				f(p) === e && H(p, null);
			}, 2e3);
		});
	}
	St(n, {
		children: (n, s) => {
			var _ = kr(), v = m(_);
			Ct(v, {
				child: (e, t) => {
					Tt(e, G(() => t?.().props, {
						type: "button",
						variant: "ghost",
						size: "icon-sm",
						get icon() {
							return d();
						},
						get "aria-label"() {
							return c();
						},
						class: "size-7 text-dark-400 hover:text-dark-100"
					}));
				},
				$$slots: { child: !0 }
			}), xt(t(v, 2), {
				align: "start",
				class: "w-80 p-4",
				children: (n, s) => {
					var c = Or(), d = m(c), _ = C(d), v = (e) => {
						var t = wr(), n = C(t, !0);
						h(t), y(() => V(n, a())), k(e, t);
					};
					N(_, (e) => {
						a() && e(v);
					}), h(d);
					var b = t(d, 2), x = (e) => {
						var t = Tr(), n = C(t, !0);
						h(t), y(() => V(n, o())), k(e, t);
					}, S = (n) => {
						wt(n, {
							orientation: "vertical",
							viewportClasses: "max-h-48 overflow-hidden",
							children: (n, a) => {
								var o = Dr();
								r(o, 21, () => i.variables, (e) => e.key, (n, r) => {
									var a = Er(), o = C(a), s = C(o), c = C(s), d = C(c, !0);
									h(c);
									var m = t(c, 2), _ = C(m, !0);
									h(m), h(s);
									var v = t(s, 2), b = C(v), x = (e) => {
										Z(e, {
											icon: "ri:check-line",
											class: "size-3.5 text-success-400"
										});
									}, S = (e) => {
										{
											let t = U(() => i.onInsert ? "ri:corner-down-left-line" : "ri:file-copy-line");
											Z(e, {
												get icon() {
													return f(t);
												},
												class: "size-3.5 text-dark-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
											});
										}
									};
									N(b, (e) => {
										f(p) === f(r).key ? e(x) : e(S, -1);
									}), h(v), h(o), h(a), y((t) => {
										j(o, 1, t), e(o, "title", i.onInsert ? u() : l()), V(d, `{${f(r).key}}`), V(_, f(r).label);
									}, [() => W(Q("group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-transparent px-2.5 py-2 text-left text-xs transition-all duration-150 hover:border-dark-600/30 hover:bg-dark-700/50"))]), ee("click", o, () => g(f(r).key)), k(n, a);
								}), h(o), k(n, o);
							},
							$$slots: { default: !0 }
						});
					};
					N(b, (e) => {
						i.variables.length === 0 ? e(x) : e(S, -1);
					}), k(n, c);
				},
				$$slots: { default: !0 }
			}), k(n, _);
		},
		$$slots: { default: !0 }
	}), v();
}
J(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-code.svelte
var jr = K("<span></span>"), Mr = K("<div class=\"flex items-center justify-between gap-2\"><!> <!></div>"), Nr = K("<div class=\"flex justify-end\"><!></div>"), Pr = K("<div class=\"absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-dark-900/85\" role=\"status\" aria-live=\"polite\"><!> <p class=\"text-xs text-dark-300\"> </p></div>"), Fr = K("<p class=\"text-sm text-red-400\"> </p>"), Ir = K("<div><!> <!> <div role=\"textbox\" aria-multiline=\"true\"><!></div> <!></div>");
function Lr(n, r) {
	s(r, !0);
	let a = E(r, "id", 19, Me), c = E(r, "value", 3, ""), l = E(r, "language", 3, "typescript"), u = E(r, "minHeight", 3, "12rem"), d = E(r, "fillHeight", 3, !1), p = E(r, "extraLibs", 19, () => []), m = E(r, "loadingLabel", 3, "Loading..."), _ = E(r, "variables", 19, () => []), S = E(r, "variablesTitle", 3, "Variables"), T = E(r, "variablesAriaLabel", 3, "Insert variable"), D = A(void 0), O = A(void 0), P = A(void 0), F = A(!1), I = !1, L = !1, R = A("");
	function z(e) {
		return e.map((e) => `${e.filePath ?? ""}\0${e.content}`).join("\0");
	}
	function B(e) {
		r.oninput && r.oninput({ currentTarget: { value: e } });
	}
	function U(e) {
		let t = `{${e}}`;
		if (!f(O) || !f(P)) {
			B(`${c()}${t}`);
			return;
		}
		let n = f(O).getSelection();
		if (!n) {
			B(`${c()}${t}`);
			return;
		}
		f(O).executeEdits("insert-variable", [{
			range: n,
			text: t,
			forceMoveMarkers: !0
		}]), f(O).focus();
	}
	async function G() {
		if (!f(D)) return;
		Cr();
		let e = await import("./editor.main-xvnWKxZY.js");
		I || !f(D) || (H(P, e, !0), f(P).editor.defineTheme("stream-kit-dark", gr), await hr(p()), H(R, z(p()), !0), H(O, f(P).editor.create(f(D), {
			value: c(),
			language: l() === "json" ? "json" : "typescript",
			theme: "stream-kit-dark",
			automaticLayout: !0,
			fixedOverflowWidgets: !0,
			minimap: { enabled: !1 },
			fontSize: 13,
			lineNumbers: "on",
			scrollBeyondLastLine: !1,
			tabSize: 2,
			insertSpaces: !0,
			wordWrap: "on",
			padding: {
				top: 12,
				bottom: 12
			},
			overviewRulerLanes: 0,
			suggestOnTriggerCharacters: !0,
			quickSuggestions: {
				other: !0,
				comments: !1,
				strings: !1
			},
			quickSuggestionsDelay: 10,
			suggest: {
				showWords: l() === "json",
				preview: !0
			},
			scrollbar: {
				verticalScrollbarSize: 8,
				horizontalScrollbarSize: 8
			}
		}), !0), r.placeholder && f(O).onDidFocusEditorText(() => {
			f(O)?.getValue() === "" && r.placeholder;
		}), f(O).onDidChangeModelContent(() => {
			L || !f(O) || B(f(O).getValue());
		}), H(F, !0));
	}
	b(() => {
		G();
	}), o(() => {
		if (!f(O) || !f(F)) return;
		let e = c() ?? "";
		f(O).getValue() !== e && (L = !0, f(O).pushUndoStop(), f(O).executeEdits("external-sync", [{
			range: f(O).getModel()?.getFullModelRange() ?? {
				startLineNumber: 1,
				startColumn: 1,
				endLineNumber: 1,
				endColumn: 1
			},
			text: e,
			forceMoveMarkers: !0
		}]), f(O).pushUndoStop(), L = !1);
	}), o(() => {
		if (!f(F)) return;
		let e = z(p());
		e !== f(R) && (H(R, e, !0), hr(p()));
	}), x(() => {
		I = !0, f(O)?.dispose(), H(O, void 0), H(P, void 0);
	});
	var K = Ir(), J = C(K), Y = (e) => {
		var n = Mr(), i = C(n), o = (e) => {
			cr(e, {
				get for() {
					return a();
				},
				children: (e, t) => {
					w();
					var n = M();
					y(() => V(n, r.label)), k(e, n);
				},
				$$slots: { default: !0 }
			});
		}, s = (e) => {
			k(e, jr());
		};
		N(i, (e) => {
			r.label ? e(o) : e(s, -1);
		});
		var c = t(i, 2), l = (e) => {
			Ar(e, {
				get variables() {
					return _();
				},
				get title() {
					return S();
				},
				get ariaLabel() {
					return T();
				},
				onInsert: U
			});
		};
		N(c, (e) => {
			_().length > 0 && e(l);
		}), h(n), k(e, n);
	};
	N(J, (e) => {
		(r.label || _().length > 0) && e(Y);
	});
	var ee = t(J, 2), te = (e) => {
		var t = Nr();
		g(C(t), () => r.toolbar), h(t), k(e, t);
	};
	N(ee, (e) => {
		r.toolbar && e(te);
	});
	var X = t(ee, 2);
	let ne;
	var re = C(X), ie = (n) => {
		var r = Pr(), i = C(r);
		Z(i, {
			icon: "gg:spinner",
			class: "size-5 animate-spin text-primary",
			"aria-hidden": "true"
		});
		var a = t(i, 2), o = C(a, !0);
		h(a), h(r), y(() => {
			e(r, "aria-label", m()), V(o, m());
		}), k(n, r);
	};
	N(re, (e) => {
		f(F) || e(ie);
	}), h(X), i(X, (e) => H(D, e), () => f(D));
	var ae = t(X, 2), oe = (e) => {
		var t = Fr(), n = C(t, !0);
		h(t), y(() => V(n, r.error)), k(e, t);
	};
	N(ae, (e) => {
		r.error && e(oe);
	}), h(K), y((t, n) => {
		j(K, 1, t), e(X, "id", a()), e(X, "aria-busy", !f(F)), e(X, "aria-invalid", r.error ? !0 : void 0), e(X, "aria-placeholder", r.placeholder), j(X, 1, n), ne = q(X, "", ne, { "min-height": d() ? void 0 : u() });
	}, [() => W(Q("relative flex w-full flex-col", d() ? "h-full min-h-0 flex-1" : "grid gap-2")), () => W(Q("relative overflow-hidden rounded-lg border bg-dark-900 focus-within:ring-2", d() ? "flex min-h-0 flex-1 flex-col" : "", r.error ? "border-red-500 focus-within:ring-red-500" : "border-dark-600 focus-within:ring-primary", r.class))]), k(n, K), v();
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/internal/configurable-globals.js
var Rr = typeof window < "u" ? window : void 0;
typeof window < "u" && window.document, typeof window < "u" && window.navigator, typeof window < "u" && window.location;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/internal/utils/dom.js
function zr(e) {
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
		let { window: t = Rr, document: n = t?.document } = e;
		t !== void 0 && (this.#e = n, this.#t = _((e) => {
			let n = Y(t, "focusin", e), r = Y(t, "focusout", e);
			return () => {
				n(), r();
			};
		}));
	}
	get current() {
		return this.#t?.(), this.#e ? zr(this.#e) : null;
	}
}();
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/internal/utils/is.js
function Br(e) {
	return typeof e == "function";
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/utilities/extract/extract.svelte.js
function Vr(e, t) {
	if (Br(e)) {
		let n = e();
		return n === void 0 ? t : n;
	}
	return e === void 0 ? t : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/utilities/use-debounce/use-debounce.svelte.js
function Hr(e, t) {
	let n = A(null), r = U(() => Vr(t, 250));
	function i(...t) {
		if (f(n)) f(n).timeout && clearTimeout(f(n).timeout);
		else {
			let e, t;
			H(n, {
				timeout: null,
				runner: null,
				promise: new Promise((n, r) => {
					e = n, t = r;
				}),
				resolve: e,
				reject: t
			}, !0);
		}
		return f(n).runner = async () => {
			if (!f(n)) return;
			let r = f(n);
			H(n, null);
			try {
				r.resolve(await e.apply(this, t));
			} catch (e) {
				r.reject(e);
			}
		}, f(n).timeout = setTimeout(f(n).runner, f(r)), f(n).promise;
	}
	return i.cancel = async () => {
		(!f(n) || f(n).timeout === null) && (await new Promise((e) => setTimeout(e, 0)), !f(n) || f(n).timeout === null) || (clearTimeout(f(n).timeout), f(n).reject("Cancelled"), H(n, null));
	}, i.runScheduledNow = async () => {
		(!f(n) || !f(n).timeout) && (await new Promise((e) => setTimeout(e, 0)), !f(n) || !f(n).timeout) || (clearTimeout(f(n).timeout), f(n).timeout = null, await f(n).runner?.());
	}, Object.defineProperty(i, "pending", {
		enumerable: !0,
		get() {
			return !!f(n)?.timeout;
		}
	}), i;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/utilities/watch/watch.svelte.js
function Ur(e, t) {
	switch (e) {
		case "post":
			o(t);
			break;
		case "pre":
			l(t);
			break;
	}
}
function Wr(e, t, n, r = {}) {
	let { lazy: i = !1 } = r, a = !i, o = Array.isArray(e) ? [] : void 0;
	Ur(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!a) {
			a = !0, o = t;
			return;
		}
		let r = d(() => n(t, o));
		return o = t, r;
	});
}
function Gr(e, t, n) {
	let r = te(() => {
		let i = !1;
		Wr(e, t, (e, t) => {
			if (i) {
				r();
				return;
			}
			let a = n(e, t);
			return i = !0, a;
		}, { lazy: !0 });
	});
	o(() => r);
}
function Kr(e, t, n) {
	Wr(e, "post", t, n);
}
function qr(e, t, n) {
	Wr(e, "pre", t, n);
}
Kr.pre = qr;
function Jr(e, t) {
	Gr(e, "post", t);
}
function Yr(e, t) {
	Gr(e, "pre", t);
}
Jr.pre = Yr;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/internal/utils/function.js
function Xr() {}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/utilities/debounced/debounced.svelte.js
var Zr = class {
	#e = A();
	#t;
	constructor(e, t = 250) {
		H(this.#e, e(), !0), this.cancel = this.cancel.bind(this), this.setImmediately = this.setImmediately.bind(this), this.updateImmediately = this.updateImmediately.bind(this), this.#t = Hr(() => {
			H(this.#e, e(), !0);
		}, t), Kr(e, () => {
			this.#t().catch(Xr);
		});
	}
	get current() {
		return f(this.#e);
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
		this.cancel(), H(this.#e, e, !0);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/utilities/resource/resource.svelte.js
function Qr(e, t) {
	let n, r = null;
	return (...i) => new Promise((a) => {
		r && r(void 0), r = a, clearTimeout(n), n = setTimeout(async () => {
			let t = await e(...i);
			r &&= (r(t), null);
		}, t);
	});
}
function $r(e, t) {
	let n = 0, r = null;
	return (...i) => {
		let a = Date.now();
		return n && a - n < t ? r ?? Promise.resolve(void 0) : (n = a, r = e(...i), r);
	};
}
function ei(e, t, n = {}, r) {
	let { lazy: i = !1, once: a = !1, initialValue: o, debounce: s, throttle: c } = n, l = A(z(o)), u = A(z(o === void 0 && !i)), d = A(void 0), p = A(z([])), m = () => {
		f(p).forEach((e) => e()), H(p, [], !0);
	}, h = (e) => {
		H(p, [...f(p), e], !0);
	}, g = async (e, n, r = !1) => {
		try {
			H(u, !0), H(d, void 0), m();
			let i = new AbortController();
			h(() => i.abort());
			let a = await t(e, n, {
				data: f(l),
				refetching: r,
				onCleanup: h,
				signal: i.signal
			});
			return H(l, a, !0), a;
		} catch (e) {
			e instanceof DOMException && e.name === "AbortError" || H(d, e, !0);
			return;
		} finally {
			H(u, !1);
		}
	}, _ = s ? Qr(g, s) : c ? $r(g, c) : g, v = Array.isArray(e) ? e : [e], y;
	return r((t, n) => {
		a && y || (y = t, _(Array.isArray(e) ? t : t[0], Array.isArray(e) ? n : n?.[0]));
	}, { lazy: i }), {
		get current() {
			return f(l);
		},
		get loading() {
			return f(u);
		},
		get error() {
			return f(d);
		},
		mutate: (e) => {
			H(l, e, !0);
		},
		refetch: (t) => {
			let n = v.map((e) => e());
			return _(Array.isArray(e) ? n : n[0], Array.isArray(e) ? n : n[0], t ?? !0);
		}
	};
}
function ti(e, t, n) {
	return ei(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		Kr(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
function ni(e, t, n) {
	return ei(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		Kr.pre(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
ti.pre = ni;
//#endregion
//#region ../ui/src/lib/components/input/resolve-select-items.svelte.ts
function ri(e, t) {
	let n = A(z([])), r = A(!1), i = A(0), a = U(() => {
		let t = e();
		return typeof t == "function" ? (f(i), f(n)) : t;
	}), s = U(() => typeof e() == "function" ? (f(i), f(r)) : !1);
	return o(() => {
		t && t();
		let a = e();
		if (typeof a != "function") return;
		H(r, !0);
		let o = !1;
		return Promise.resolve(a()).then((e) => {
			o || (H(n, e, !0), H(r, !1), F(i));
		}, () => {
			o || (H(n, [], !0), H(r, !1), F(i));
		}), () => {
			o = !0;
		};
	}), {
		get items() {
			return f(a);
		},
		get loading() {
			return f(s);
		}
	};
}
function ii(e, t) {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => e.label.toLowerCase().includes(n) || e.value.toLowerCase().includes(n)) : e;
}
function ai(e, t, n = 200, r = 36, i = 6) {
	let a = e.length * r, o = Math.max(0, Math.floor(t / r) - i), s = Math.ceil(n / r) + i * 2, c = Math.min(e.length, o + s);
	return {
		items: e.slice(o, c),
		startIndex: o,
		totalHeight: a,
		offsetY: o * r
	};
}
function oi(e) {
	return e > 50;
}
function si(e, t = 36) {
	return Math.max(0, e * t);
}
//#endregion
//#region ../ui/src/lib/components/input/input-select.svelte
var ci = K("<span class=\"text-red-400\">*</span>"), li = K(" <!>", 1), ui = K("<span class=\"grid h-full min-w-10 place-items-center rounded-l-xl border border-r-0 border-dark-700 text-dark-50\"><!></span>"), di = K("<!> <!>", 1), fi = K("<!> <!> <!>", 1), pi = K("<div><button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\" class=\"flex w-full min-w-0 cursor-pointer items-center outline-none disabled:cursor-not-allowed disabled:opacity-50\"><!> <span><span> </span> <!></span></button></div> <!>", 1), mi = K("<p class=\"text-sm text-red-400\"> </p>"), hi = K("<div><!> <!> <!></div>");
function gi(i, a) {
	s(a, !0);
	let o = E(a, "searchable", 3, "auto"), c = E(a, "dialogTitle", 3, "Select option"), l = E(a, "dialogDescription", 3, "Search and select an option from the list."), d = E(a, "id", 19, Me), p = E(a, "required", 3, !1), g = E(a, "type", 3, "single"), _ = E(a, "value", 15), b = U(() => a.placeholder ?? "Select an option"), x = U(() => a.loadingPlaceholder ?? "Loading..."), S = U(() => a.searchPlaceholder ?? "Search values"), T = U(() => a.noResultsLabel ?? "No matches found"), D = A(!1), O = A(""), F = Me(), I = Me(), L = ri(() => a.items, () => a.reloadKey?.()), R = U(() => a.disabled ?? !1), z = U(() => g() === "multiple"), B = U(() => o() === !0 ? !0 : o() === !1 ? !1 : L.items.length >= 8), K = U(() => {
		if (L.loading) return f(x);
		if (f(z)) {
			let e = _();
			if (e.length === 0) return f(b);
			let t = e.map((e) => L.items.find((t) => t.value === e)?.label).filter(Boolean);
			return t.length > 0 ? t.join(", ") : f(b);
		}
		let e = _();
		return e ? L.items.find((t) => t.value === e)?.label ?? e : f(b);
	}), q = U(() => f(z) ? _().length > 0 : !!_());
	function J(e) {
		H(D, e, !0), e || H(O, "");
	}
	function Y(e) {
		return f(z) ? _().includes(e) : _() === e;
	}
	function te(e) {
		if (!e.disabled) {
			if (f(z)) {
				let t = [..._()], n = t.indexOf(e.value);
				n >= 0 ? t.splice(n, 1) : t.push(e.value), _(t), a.onValueChange?.(t);
				return;
			}
			_(e.value), a.onValueChange?.(e.value), H(D, !1);
		}
	}
	function X() {
		f(R) || H(D, !0);
	}
	async function ne(e) {
		a.dialogProps?.onOpenAutoFocus?.(e), !(e.defaultPrevented || !f(B)) && (e.preventDefault(), await u(), document.getElementById(I)?.focus());
	}
	function re(e) {
		a.dialogProps?.onCloseAutoFocus?.(e), !e.defaultPrevented && e.preventDefault();
	}
	var ie = hi(), ae = C(ie), oe = (e) => {
		cr(e, {
			get for() {
				return d();
			},
			children: (e, n) => {
				w();
				var r = li(), i = m(r), o = t(i), s = (e) => {
					k(e, ci());
				};
				N(o, (e) => {
					p() && e(s);
				}), y(() => V(i, `${a.label ?? ""} `)), k(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	N(ae, (e) => {
		a.label && e(oe);
	});
	var se = t(ae, 2);
	n(se, () => dt, (i, o) => {
		o(i, {
			onOpenChange: J,
			get open() {
				return f(D);
			},
			set open(e) {
				H(D, e, !0);
			},
			children: (i, o) => {
				var s = pi(), u = m(s), p = C(u), g = C(p), _ = (e) => {
					var t = ui();
					Z(C(t), {
						get icon() {
							return a.prependIcon;
						},
						class: "size-6"
					}), h(t), k(e, t);
				};
				N(g, (e) => {
					a.prependIcon && e(_);
				});
				var v = t(g, 2), b = C(v), E = C(b, !0);
				h(b), Z(t(b, 2), {
					icon: "ri:expand-up-down-line",
					class: "size-5 shrink-0 text-dark-300"
				}), h(v), h(p), h(u), n(t(u, 2), () => pt, (e, i) => {
					i(e, {
						children: (e, i) => {
							var o = di(), s = m(o);
							n(s, () => mt, (e, t) => {
								t(e, { class: "data-nested:hidden z-60 bg-black/60" });
							});
							var u = t(s, 2);
							{
								let e = U(() => a.dialogProps?.trapFocus ?? !1), i = U(() => a.dialogProps?.preventScroll ?? !1), o = U(() => Q("z-60", a.dialogProps?.class));
								n(u, () => ut, (s, u) => {
									u(s, G(() => a.dialogProps, {
										get trapFocus() {
											return f(e);
										},
										get preventScroll() {
											return f(i);
										},
										onOpenAutoFocus: ne,
										onCloseAutoFocus: re,
										get class() {
											return f(o);
										},
										children: (e, i) => {
											var o = fi(), s = m(o);
											n(s, () => lt, (e, t) => {
												t(e, {
													class: "sr-only",
													children: (e, t) => {
														w();
														var n = M();
														y(() => V(n, c())), k(e, n);
													},
													$$slots: { default: !0 }
												});
											});
											var u = t(s, 2);
											n(u, () => ft, (e, t) => {
												t(e, {
													class: "sr-only",
													children: (e, t) => {
														w();
														var n = M();
														y(() => V(n, l())), k(e, n);
													},
													$$slots: { default: !0 }
												});
											});
											var d = t(u, 2);
											{
												let e = U(() => !L.loading), i = U(() => Q(a.commandProps?.class));
												n(d, () => Be, (o, s) => {
													s(o, G(() => a.commandProps, {
														get shouldFilter() {
															return f(e);
														},
														get class() {
															return f(i);
														},
														children: (e, i) => {
															var a = di(), o = m(a), s = (e) => {
																var t = P();
																n(m(t), () => Ue, (e, t) => {
																	t(e, {
																		get id() {
																			return I;
																		},
																		get placeholder() {
																			return f(S);
																		},
																		get "aria-label"() {
																			return f(S);
																		},
																		get value() {
																			return f(O);
																		},
																		set value(e) {
																			H(O, e, !0);
																		}
																	});
																}), k(e, t);
															};
															N(o, (e) => {
																f(B) && e(s);
															}), n(t(o, 2), () => Pe, (e, i) => {
																i(e, {
																	get id() {
																		return F;
																	},
																	class: "mt-2",
																	children: (e, i) => {
																		var a = P();
																		n(m(a), () => Ne, (e, i) => {
																			i(e, {
																				children: (e, i) => {
																					var a = P(), o = m(a), s = (e) => {
																						var t = P();
																						n(m(t), () => He, (e, t) => {
																							t(e, {
																								children: (e, t) => {
																									w();
																									var n = M();
																									y(() => V(n, f(x))), k(e, n);
																								},
																								$$slots: { default: !0 }
																							});
																						}), k(e, t);
																					}, c = (e) => {
																						var i = di(), a = m(i);
																						n(a, () => ze, (e, t) => {
																							t(e, {
																								children: (e, t) => {
																									w();
																									var n = M();
																									y(() => V(n, f(T))), k(e, n);
																								},
																								$$slots: { default: !0 }
																							});
																						}), r(t(a, 2), 17, () => L.items, (e) => e.value, (e, r) => {
																							var i = P(), a = m(i);
																							{
																								let e = U(() => [f(r).label, f(r).value]);
																								n(a, () => Re, (n, i) => {
																									i(n, {
																										get value() {
																											return f(r).value;
																										},
																										get keywords() {
																											return f(e);
																										},
																										get disabled() {
																											return f(r).disabled;
																										},
																										onSelect: () => te(f(r)),
																										children: (e, n) => {
																											w();
																											var i = li(), a = m(i), o = t(a), s = (e) => {
																												Z(e, {
																													icon: "ri:check-line",
																													class: "size-5 text-primary"
																												});
																											}, c = U(() => Y(f(r).value));
																											N(o, (e) => {
																												f(c) && e(s);
																											}), y(() => V(a, `${f(r).label ?? ""} `)), k(e, i);
																										},
																										$$slots: { default: !0 }
																									});
																								});
																							}
																							k(e, i);
																						}), k(e, i);
																					};
																					N(o, (e) => {
																						L.loading ? e(s) : e(c, -1);
																					}), k(e, a);
																				},
																				$$slots: { default: !0 }
																			});
																		}), k(e, a);
																	},
																	$$slots: { default: !0 }
																});
															}), k(e, a);
														},
														$$slots: { default: !0 }
													}));
												});
											}
											k(e, o);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							k(e, o);
						},
						$$slots: { default: !0 }
					});
				}), y((t, n, r) => {
					j(u, 1, t), e(p, "id", d()), e(p, "aria-expanded", f(D)), e(p, "aria-controls", f(D) ? F : void 0), p.disabled = f(R), j(v, 1, n), j(b, 1, r), V(E, f(K));
				}, [
					() => W(Q("relative flex w-full min-w-0 items-center rounded-xl", "has-focus:ring-2 has-focus:ring-primary", a.error && "has-focus:ring-red-500")),
					() => W(Q("flex w-full items-center justify-between gap-2 border bg-dark-700 text-dark-50 outline-none", Ve.md, a.error ? "border-red-500" : "border-dark-500", {
						"rounded-l-none rounded-r-xl border-l-0": a.prependIcon,
						"rounded-xl": !a.prependIcon
					})),
					() => W(Q("min-w-0 flex-1 truncate text-left", !f(q) && "text-dark-300"))
				]), ee("click", p, X), k(i, s);
			},
			$$slots: { default: !0 }
		});
	});
	var $ = t(se, 2), ce = (e) => {
		var t = mi(), n = C(t, !0);
		h(t), y(() => V(n, a.error)), k(e, t);
	};
	N($, (e) => {
		a.error && e(ce);
	}), h(ie), y((e) => j(ie, 1, e), [() => W(Q("relative grid w-full min-w-0 gap-2", a.class))]), k(i, ie), v();
}
J(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/cron-expression-editor.svelte
var _i = K("<div><p class=\"text-[10px] font-semibold tracking-[0.14em] text-dark-400 uppercase\"> </p> <p> </p></div>"), vi = K("<span><!> </span>"), yi = K("<p class=\"text-xs text-dark-200\"><span class=\"text-dark-400\"> </span> <span class=\"font-medium text-primary-100\"> </span></p>"), bi = K("<div class=\"overflow-hidden rounded-xl border border-dark-600 bg-dark-800/40 transition-all duration-200 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20\"><div class=\"grid grid-cols-5 border-b border-dark-600/80 bg-dark-900/40 px-2 py-1.5\"></div> <div class=\"relative flex items-center gap-2 px-3 py-2\"><!> <input autocomplete=\"off\"/> <!></div> <div class=\"flex flex-wrap items-center justify-between gap-2 border-t border-dark-600/80 bg-dark-900/30 px-3 py-2\"><div class=\"min-w-40 max-w-xs flex-1\"><!></div> <!></div></div>");
function xi(n, i) {
	s(i, !0);
	let a = E(i, "value", 3, ""), o = E(i, "placeholder", 3, "0 9 * * 1-5"), c = E(i, "presets", 3, ne), l = E(i, "validLabel", 3, "Valid expression"), u = E(i, "invalidLabel", 3, "Invalid cron expression"), d = E(i, "nextRunLabel", 3, "Next run"), m = E(i, "presetsPlaceholder", 3, "Presets"), g = Me(), _ = new Zr(() => a(), 250), b = U(() => ({
		minute: i.fieldLabels?.minute ?? "Minute",
		hour: i.fieldLabels?.hour ?? "Hour",
		day: i.fieldLabels?.day ?? "Day",
		month: i.fieldLabels?.month ?? "Month",
		weekday: i.fieldLabels?.weekday ?? "Weekday"
	})), x = U(() => ae(a())), S = U(() => re(_.current)), w = U(() => X(f(S))), T = U(() => !!f(S) && !f(w)), O = U(() => f(w) === "Invalid cron expression" ? u() : f(w)), A = U(() => f(T) ? ie(f(S)) : void 0), M = U(() => c().map((e) => ({
		value: e.value,
		label: e.label
	}))), P = {
		minute: "text-sky-300",
		hour: "text-violet-300",
		day: "text-emerald-300",
		month: "text-amber-300",
		weekday: "text-rose-300"
	}, F = (e) => {
		i.oninput?.(e);
	};
	function I(e) {
		i.oninput?.({ currentTarget: { value: e } });
	}
	var L = bi(), R = C(L);
	r(R, 22, () => oe, (e) => e, (e, n, r) => {
		var i = _i(), a = C(i), o = C(a, !0);
		h(a);
		var s = t(a, 2), c = C(s, !0);
		h(s), h(i), y((e, t) => {
			j(i, 1, e), V(o, f(b)[n]), j(s, 1, t), V(c, f(x)[f(r)] || "—");
		}, [() => W(Q("px-1 text-center", f(r) < 4 && "border-r border-dark-700/50")), () => W(Q("mt-0.5 truncate font-mono text-xs", P[n]))]), k(e, i);
	}), h(R);
	var z = t(R, 2), B = C(z);
	Z(B, {
		icon: "ri:time-line",
		class: "size-5 shrink-0 text-dark-400"
	});
	var H = t(B, 2);
	p(H), e(H, "spellcheck", !1);
	var G = t(H, 2), K = (e) => {
		var n = vi(), r = C(n);
		{
			let e = U(() => f(T) ? "ri:check-line" : "ri:alert-line");
			Z(r, {
				get icon() {
					return f(e);
				},
				class: "size-4"
			});
		}
		var i = t(r);
		h(n), y((e) => {
			j(n, 1, e), V(i, ` ${(f(T) ? l() : f(O)) ?? ""}`);
		}, [() => W(Q("inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium", f(T) ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"))]), k(e, n);
	};
	N(G, (e) => {
		f(S) && e(K);
	}), h(z);
	var q = t(z, 2), J = C(q), Y = C(J), te = () => "", se = (e) => {
		e && I(e);
	};
	gi(Y, {
		type: "single",
		get placeholder() {
			return m();
		},
		get items() {
			return f(M);
		},
		get value() {
			return te();
		},
		set value(e) {
			se(e);
		}
	}), h(J);
	var $ = t(J, 2), ce = (e) => {
		var n = yi(), r = C(n), i = C(r);
		h(r);
		var a = t(r, 2), o = C(a, !0);
		h(a), h(n), y(() => {
			V(i, `${d() ?? ""}:`), V(o, f(A));
		}), k(e, n);
	};
	N($, (e) => {
		f(A) && e(ce);
	}), h(q), h(L), y((t) => {
		e(H, "id", g), j(H, 1, t), e(H, "placeholder", o()), H.required = i.required, D(H, a() ?? "");
	}, [() => W(Q("min-w-0 flex-1 border-0 bg-transparent font-mono text-sm text-dark-50 outline-none", Ve.md, "px-0 py-0"))]), ee("input", H, F), k(n, L), v();
}
J(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-cron-expression.svelte
var Si = K("<button><!> <span> </span> <!> <!></button>"), Ci = K("<p class=\"mb-3 text-xs font-semibold tracking-wide text-dark-200 uppercase\"> </p> <!>", 1), wi = K("<!> <!>", 1), Ti = K("<p class=\"text-sm text-red-400\"> </p>"), Ei = K("<div><!> <!> <!></div>");
function Di(e, n) {
	s(n, !0);
	let r = E(n, "id", 19, Me), i = E(n, "value", 3, ""), a = E(n, "placeholder", 3, "0 9 * * 1-5"), o = E(n, "validLabel", 3, "Valid expression"), c = E(n, "invalidLabel", 3, "Invalid cron expression"), l = E(n, "nextRunLabel", 3, "Next run"), u = E(n, "presetsPlaceholder", 3, "Presets"), d = E(n, "editorTitle", 3, "Cron expression"), p = E(n, "emptyLabel", 3, "Configure cron expression"), g = E(n, "editAriaLabel", 3, "Edit cron expression"), _ = A(!1), b = U(() => re(i())), x = U(() => X(f(b))), T = U(() => !!f(b) && !f(x)), D = U(() => f(b) || p()), O = U(() => !f(b));
	var P = Ei(), F = C(P), I = (e) => {
		cr(e, {
			get for() {
				return r();
			},
			children: (e, t) => {
				w();
				var r = M();
				y(() => V(r, n.label)), k(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	N(F, (e) => {
		n.label && e(I);
	});
	var L = t(F, 2);
	St(L, {
		get open() {
			return f(_);
		},
		set open(e) {
			H(_, e, !0);
		},
		children: (e, s) => {
			var p = wi(), v = m(p);
			Ct(v, {
				child: (e, i) => {
					let a = () => i?.().props;
					var o = Si();
					S(o, (e) => ({
						id: r(),
						type: "button",
						...a(),
						"aria-label": g(),
						class: e
					}), [() => Q("flex w-full items-center gap-2 rounded-xl border bg-dark-700 text-left outline-none transition-all", Ve.md, "focus-visible:ring-2", n.error ? "border-red-500 focus-visible:border-red-500/50 focus-visible:ring-red-500" : "border-dark-500 focus-visible:border-primary/50 focus-visible:ring-primary")]);
					var s = C(o);
					Z(s, {
						icon: "ri:time-line",
						class: "size-5 shrink-0 text-dark-400"
					});
					var c = t(s, 2), l = C(c, !0);
					h(c);
					var u = t(c, 2), d = (e) => {
						{
							let t = U(() => f(T) ? "ri:check-line" : "ri:alert-line"), n = U(() => Q("size-5 shrink-0", f(T) ? "text-green-400" : "text-amber-400"));
							Z(e, {
								get icon() {
									return f(t);
								},
								get class() {
									return f(n);
								}
							});
						}
					};
					N(u, (e) => {
						f(b) && e(d);
					});
					var p = t(u, 2);
					{
						let e = U(() => Q("size-5 shrink-0 text-dark-300 transition-transform", f(_) && "rotate-180"));
						Z(p, {
							icon: "ri:arrow-down-s-line",
							get class() {
								return f(e);
							}
						});
					}
					h(o), y((e) => {
						j(c, 1, e), V(l, f(D));
					}, [() => W(Q("min-w-0 flex-1 truncate text-sm", f(O) ? "font-sans text-dark-300" : "font-mono text-dark-50"))]), k(e, o);
				},
				$$slots: { child: !0 }
			}), xt(t(v, 2), {
				align: "start",
				class: "w-[min(28rem,calc(100vw-2rem))] p-3",
				children: (e, r) => {
					var s = Ci(), f = m(s), p = C(f, !0);
					h(f), xi(t(f, 2), {
						get value() {
							return i();
						},
						get required() {
							return n.required;
						},
						get placeholder() {
							return a();
						},
						get presets() {
							return n.presets;
						},
						get fieldLabels() {
							return n.fieldLabels;
						},
						get validLabel() {
							return o();
						},
						get invalidLabel() {
							return c();
						},
						get nextRunLabel() {
							return l();
						},
						get presetsPlaceholder() {
							return u();
						},
						get oninput() {
							return n.oninput;
						}
					}), y(() => V(p, d())), k(e, s);
				},
				$$slots: { default: !0 }
			}), k(e, p);
		},
		$$slots: { default: !0 }
	});
	var R = t(L, 2), z = (e) => {
		var t = Ti(), r = C(t, !0);
		h(t), y(() => V(r, n.error)), k(e, t);
	};
	N(R, (e) => {
		n.error && e(z);
	}), h(P), y((e) => j(P, 1, e), [() => W(Q("relative grid w-full gap-2", n.class))]), k(e, P), v();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text.svelte
var Oi = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"label",
	"id",
	"prependIcon",
	"appendIcon",
	"copyable",
	"copyLabel",
	"copiedLabel",
	"error",
	"size",
	"readonly",
	"value",
	"tabindex"
]), ki = K("<span><!></span>"), Ai = K("<button type=\"button\"><!></button>"), ji = K("<p class=\"text-sm text-red-400\"> </p>"), Mi = K("<div><!> <div><!> <input/> <!> <!> <!></div> <!></div>");
function Ni(n, r) {
	s(r, !0);
	let i = E(r, "id", 19, Me), a = E(r, "copyable", 3, !1), o = E(r, "copyLabel", 3, "Copy"), c = E(r, "copiedLabel", 3, "Copied"), l = E(r, "size", 3, "md"), u = B(r, Oi), d = A(!1), p = A(!1), m, g = U(() => r.type === "password"), _ = U(() => !!r.appendIcon || f(g) || a()), b = U(() => a() ? r.readonly ?? !0 : r.readonly), x = U(() => a() && f(b)), T = Ve;
	async function D() {
		await navigator.clipboard.writeText(String(r.value ?? "")), m && clearTimeout(m), H(p, !0), m = setTimeout(() => {
			H(p, !1);
		}, 2e3);
	}
	var O = Mi(), P = C(O), F = (e) => {
		cr(e, {
			get for() {
				return i();
			},
			children: (e, t) => {
				w();
				var n = M();
				y(() => V(n, r.label)), k(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	N(P, (e) => {
		r.label && e(F);
	});
	var I = t(P, 2), L = C(I), R = (e) => {
		var t = ki();
		Z(C(t), {
			get icon() {
				return r.prependIcon;
			},
			get class() {
				return Ie[l()];
			}
		}), h(t), y((e) => j(t, 1, e), [() => W(Q("grid h-full place-items-center rounded-l-xl border border-dark-500 bg-dark-700 text-dark-50", Fe[l()]))]), k(e, t);
	};
	N(L, (e) => {
		r.prependIcon && e(R);
	});
	var z = t(L, 2);
	S(z, (e) => ({
		id: i(),
		class: e,
		"aria-invalid": r.error ? !0 : void 0,
		value: r.value,
		readonly: f(b),
		tabindex: f(x) ? -1 : r.tabindex,
		...u,
		type: f(g) ? f(d) ? "text" : "password" : r.type
	}), [() => Q("min-w-0 w-full truncate border bg-dark-700 text-dark-50 outline-none", T[l()], r.error ? "border-red-500" : "border-dark-500", {
		"rounded-l-none rounded-r-xl border-l-0": r.prependIcon && !f(_),
		"rounded-l-none border-l-0": r.prependIcon && f(_),
		"rounded-l-xl rounded-r-none border-r-0": !r.prependIcon && f(_),
		"rounded-xl": !r.prependIcon && !f(_)
	})], void 0, void 0, void 0, !0);
	var G = t(z, 2), K = (e) => {
		var t = ki();
		Z(C(t), {
			get icon() {
				return r.appendIcon;
			},
			get class() {
				return Ie[l()];
			}
		}), h(t), y((e) => j(t, 1, e), [() => W(Q("grid h-full place-items-center text-dark-50", Fe[l()], f(g) || a() ? "border-y border-r-0 border-l border-dark-500" : "rounded-r-xl border border-l-0 border-dark-500"))]), k(e, t);
	};
	N(G, (e) => {
		r.appendIcon && e(K);
	});
	var q = t(G, 2), J = (t) => {
		var n = Ai(), r = C(n);
		{
			let e = U(() => f(p) ? "ri:checkbox-circle-fill" : "ri:file-copy-line");
			Z(r, {
				get icon() {
					return f(e);
				},
				get class() {
					return Ie[l()];
				}
			});
		}
		h(n), y((t) => {
			j(n, 1, t), e(n, "aria-label", f(p) ? c() : o());
		}, [() => W(Q("grid h-full place-items-center rounded-r-xl border border-dark-500 border-l-dark-600 bg-dark-700 transition-colors", f(p) ? "text-success" : "text-dark-50", Fe[l()]))]), ee("click", n, () => void D()), k(t, n);
	};
	N(q, (e) => {
		a() && e(J);
	});
	var Y = t(q, 2), te = (t) => {
		var n = Ai(), r = C(n);
		{
			let e = U(() => f(d) ? "mdi:eye-off-outline" : "mdi:eye-outline");
			Z(r, {
				get icon() {
					return f(e);
				},
				get class() {
					return Ie[l()];
				}
			});
		}
		h(n), y((t) => {
			j(n, 1, t), e(n, "aria-label", f(d) ? "Hide password" : "Show password"), e(n, "aria-pressed", f(d));
		}, [() => W(Q("grid h-full place-items-center rounded-r-xl border border-dark-500 border-l-dark-600 bg-dark-700 text-dark-50", Fe[l()]))]), ee("click", n, () => H(d, !f(d))), k(t, n);
	};
	N(Y, (e) => {
		f(g) && e(te);
	}), h(I);
	var X = t(I, 2), ne = (e) => {
		var t = ji(), n = C(t, !0);
		h(t), y(() => V(n, r.error)), k(e, t);
	};
	N(X, (e) => {
		r.error && e(ne);
	}), h(O), y((e, t) => {
		j(O, 1, e), j(I, 1, t);
	}, [() => W(Q("relative grid w-full min-w-0 gap-2")), () => W(Q("relative flex w-full min-w-0 items-center rounded-xl", !f(x) && "has-focus:ring-2 has-focus:ring-primary", r.error && !f(x) && "has-focus:ring-red-500", r.class))]), k(n, O), v();
}
J(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-file-path.svelte
var Pi = K("<div class=\"grid gap-2\"><div class=\"flex items-end gap-2\"><div class=\"min-w-0 flex-1\"><!></div> <!></div></div>");
function Fi(e, n) {
	s(n, !0);
	let r = E(n, "value", 3, ""), i = E(n, "browseLabel", 3, "Browse"), a = E(n, "emptyFileLabel", 3, "No file selected"), o = E(n, "emptyFolderLabel", 3, "No folder selected"), c = A(!1);
	async function l() {
		if (!f(c)) {
			H(c, !0);
			try {
				let e = await n.onBrowse();
				if (!e) return;
				n.onValueChange?.(e);
			} finally {
				H(c, !1);
			}
		}
	}
	var u = Pi(), d = C(u), p = C(d), m = C(p);
	{
		let e = U(() => n.placeholder ?? (n.mode === "folder" ? o() : a()));
		Ni(m, {
			get label() {
				return n.label;
			},
			get placeholder() {
				return f(e);
			},
			get required() {
				return n.required;
			},
			get error() {
				return n.error;
			},
			readonly: !0,
			get value() {
				return r();
			}
		});
	}
	h(p), Tt(t(p, 2), {
		type: "button",
		variant: "outline",
		onclick: l,
		get disabled() {
			return f(c);
		},
		get isLoading() {
			return f(c);
		},
		icon: "ri:folder-open-line",
		children: (e, t) => {
			w();
			var n = M();
			y(() => V(n, i())), k(e, n);
		},
		$$slots: { default: !0 }
	}), h(d), h(u), k(e, u), v();
}
//#endregion
//#region ../ui/src/lib/components/input/input-hotkey.svelte
var Ii = K("<p class=\"text-sm text-red-400\"> </p>"), Li = K("<div class=\"grid w-full min-w-0 gap-2\"><!> <button type=\"button\"><!> <span><!></span></button> <!></div>");
function Ri(n, r) {
	s(r, !0);
	let i = E(r, "placeholder", 3, "Click and press keys…");
	E(r, "required", 3, !1);
	let a = E(r, "value", 15, ""), o = E(r, "captureLabel", 3, "Press shortcut…"), c = E(r, "emptyLabel", 3, "Not set"), l = Me(), u = A(!1);
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
	function p(e) {
		if (e.key === "Control" || e.key === "Shift" || e.key === "Alt" || e.key === "Meta") return null;
		let t = [];
		(e.ctrlKey || e.metaKey) && t.push("CommandOrControl"), e.altKey && t.push("Alt"), e.shiftKey && t.push("Shift");
		let n = d(e.code);
		return n ? [...t, n].join("+") : null;
	}
	function m(e) {
		return e.trim() ? e.split("+").map((e) => e === "CommandOrControl" ? "Ctrl" : e).join(" + ") : "";
	}
	let g = U(() => a().trim() ? m(a()) : "");
	function _() {
		H(u, !0);
	}
	function b() {
		H(u, !1);
	}
	let x = (e) => {
		if (!f(u)) return;
		if (e.preventDefault(), e.stopPropagation(), e.key === "Escape") {
			b();
			return;
		}
		let t = p(e);
		t && (a(t), b());
	}, S = () => {
		b();
	};
	var T = Li(), D = C(T), P = (e) => {
		cr(e, {
			get for() {
				return l;
			},
			children: (e, t) => {
				w();
				var n = M();
				y(() => V(n, r.label)), k(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	N(D, (e) => {
		r.label && e(P);
	});
	var F = t(D, 2), I = C(F);
	Z(I, {
		icon: "ri:keyboard-line",
		class: "size-4 shrink-0 text-dark-200"
	});
	var L = t(I, 2), R = C(L), z = (e) => {
		var t = M();
		y(() => V(t, o())), k(e, t);
	}, B = (e) => {
		var t = M();
		y(() => V(t, f(g))), k(e, t);
	}, G = (e) => {
		var t = M();
		y(() => V(t, i() || c())), k(e, t);
	};
	N(R, (e) => {
		f(u) ? e(z) : f(g) ? e(B, 1) : e(G, -1);
	}), h(L), h(F);
	var K = t(F, 2), q = (e) => {
		var t = Ii(), n = C(t, !0);
		h(t), y(() => V(n, r.error)), k(e, t);
	};
	N(K, (e) => {
		r.error && e(q);
	}), h(T), y((t, n) => {
		e(F, "id", l), j(F, 1, t), j(L, 1, n);
	}, [() => W(Q("flex h-10 w-full items-center gap-2 rounded-xl border bg-dark-800 px-4 text-left text-sm", "focus:ring-2 focus:ring-primary focus:outline-none", f(u) && "ring-2 ring-primary", r.error ? "border-red-500" : "border-dark-500")), () => W(Q("truncate font-mono", !f(g) && "text-dark-300"))]), ee("click", F, _), ee("keydown", F, x), O("blur", F, S), k(n, T), v();
}
J(["click", "keydown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-key-value-list.svelte
var zi = K("<div class=\"grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] items-center gap-2\"><!> <!> <!></div>"), Bi = K("<p class=\"text-sm text-destructive-50\"> </p>"), Vi = K("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function Hi(n, i) {
	s(i, !0);
	let a = E(i, "entries", 31, () => z([])), o = E(i, "keyPlaceholder", 3, "KEY"), c = E(i, "valuePlaceholder", 3, "value"), u = E(i, "id", 19, Me), d = E(i, "addLabel", 3, "Add"), p = E(i, "removeLabel", 3, "Remove"), m = A(z([]));
	function g(e) {
		return e.map((e) => ({
			id: crypto.randomUUID(),
			key: e.key,
			value: e.value
		}));
	}
	function _() {
		a(f(m).map((e) => ({
			key: e.key,
			value: e.value
		})));
	}
	function b(e, t) {
		H(m, f(m).map((n) => n.id === e ? {
			...n,
			...t
		} : n), !0), _();
	}
	function x(e) {
		H(m, f(m).filter((t) => t.id !== e), !0), _();
	}
	function S() {
		H(m, [...f(m), {
			id: crypto.randomUUID(),
			key: "",
			value: ""
		}], !0), _();
	}
	l(() => {
		let e = a(), t = f(m).map((e) => ({
			key: e.key,
			value: e.value
		}));
		e.length === t.length && e.every((e, n) => e.key === t[n]?.key && e.value === t[n]?.value) || H(m, g(e), !0);
	});
	var T = Vi(), D = C(T), O = (e) => {
		{
			let t = U(() => `${u()}-label`);
			cr(e, {
				get id() {
					return f(t);
				},
				children: (e, t) => {
					w();
					var n = M();
					y(() => V(n, i.label)), k(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	N(D, (e) => {
		i.label && e(O);
	});
	var P = t(D, 2), F = C(P);
	r(F, 17, () => f(m), (e) => e.id, (e, n) => {
		var r = zi(), i = C(r);
		{
			let e = U(() => `${u()}-${f(n).id}-key`);
			Ni(i, {
				get id() {
					return f(e);
				},
				get placeholder() {
					return o();
				},
				get value() {
					return f(n).key;
				},
				oninput: (e) => b(f(n).id, { key: e.currentTarget.value })
			});
		}
		var a = t(i, 2);
		{
			let e = U(() => `${u()}-${f(n).id}-value`);
			Ni(a, {
				get id() {
					return f(e);
				},
				get placeholder() {
					return c();
				},
				get value() {
					return f(n).value;
				},
				oninput: (e) => b(f(n).id, { value: e.currentTarget.value })
			});
		}
		Tt(t(a, 2), {
			variant: "ghost",
			size: "icon",
			type: "button",
			get "aria-label"() {
				return p();
			},
			onclick: () => x(f(n).id),
			children: (e, t) => {
				Z(e, {
					icon: "ri:delete-bin-line",
					class: "size-5",
					"aria-hidden": "true"
				});
			},
			$$slots: { default: !0 }
		}), h(r), k(e, r);
	}), Tt(t(F, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: S,
		children: (e, t) => {
			w();
			var n = M();
			y(() => V(n, d())), k(e, n);
		},
		$$slots: { default: !0 }
	}), h(P);
	var I = t(P, 2), L = (e) => {
		var t = Bi(), n = C(t, !0);
		h(t), y(() => V(n, i.error)), k(e, t);
	};
	N(I, (e) => {
		i.error && e(L);
	}), h(T), y((t) => {
		j(T, 1, t), e(T, "aria-labelledby", i.label ? `${u()}-label` : void 0);
	}, [() => W(Q("grid w-full gap-2", i.class))]), k(n, T), v();
}
//#endregion
//#region ../ui/src/lib/components/input/input-one-of.svelte
var Ui = K("<span class=\"text-red-400\" aria-hidden=\"true\">*</span>"), Wi = K(" <!>", 1), Gi = K("<button type=\"button\" role=\"tab\"> </button>"), Ki = K("<p class=\"text-sm text-red-400\"> </p>"), qi = K("<div><!> <div role=\"tablist\"></div> <div class=\"min-w-0\" role=\"tabpanel\"><!></div> <!></div>");
function Ji(n, i) {
	s(i, !0);
	let a = E(i, "value", 31, () => z({
		variant: "",
		values: {}
	})), o = U(() => a().variant || i.variants[0]?.id || "");
	function c(e) {
		a({
			...a(),
			variant: e
		});
	}
	function l(e, t) {
		a({
			variant: a().variant || e,
			values: {
				...a().values,
				[e]: t
			}
		});
	}
	var u = qi(), d = C(u), p = (e) => {
		cr(e, {
			children: (e, n) => {
				w();
				var r = Wi(), a = m(r), o = t(a), s = (e) => {
					k(e, Ui());
				};
				N(o, (e) => {
					i.required && e(s);
				}), y(() => V(a, `${i.label ?? ""} `)), k(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	N(d, (e) => {
		i.label && e(p);
	});
	var _ = t(d, 2);
	r(_, 21, () => i.variants, (e) => e.id, (t, n) => {
		var r = Gi(), i = C(r, !0);
		h(r), y((t) => {
			e(r, "id", `tab-${f(n).id}`), e(r, "aria-selected", f(o) === f(n).id), e(r, "aria-controls", `panel-${f(n).id}`), j(r, 1, t), V(i, f(n).label);
		}, [() => W(Q("rounded-lg px-3 py-1.5 text-sm font-medium transition-colors", f(o) === f(n).id ? "bg-dark-600 text-dark-50" : "text-dark-200 hover:bg-dark-800 hover:text-dark-50"))]), ee("click", r, () => c(f(n).id)), k(t, r);
	}), h(_);
	var b = t(_, 2);
	g(C(b), () => i.panel, () => ({
		variantId: f(o),
		value: a().values[f(o)],
		setValue: (e) => l(f(o), e)
	})), h(b);
	var x = t(b, 2), S = (e) => {
		var t = Ki(), n = C(t, !0);
		h(t), y(() => V(n, i.error)), k(e, t);
	};
	N(x, (e) => {
		i.error && e(S);
	}), h(u), y((t, n) => {
		j(u, 1, t), j(_, 1, n), e(_, "aria-label", i.label), e(b, "id", `panel-${f(o)}`), e(b, "aria-labelledby", `tab-${f(o)}`);
	}, [() => W(Q("grid w-full min-w-0 gap-2")), () => W(Q("inline-flex w-fit gap-0.5 rounded-xl border border-dark-600 bg-dark-800 p-1", i.error && "border-red-500"))]), k(n, u), v();
}
J(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-select-text.svelte
var Yi = new Set([
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
]), Xi = K("<!> <!>", 1), Zi = K("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Qi = K(" <!>", 1), $i = K("<!> <!> <!>", 1), ea = K("<div class=\"flex flex-wrap gap-1.5\"></div>"), ta = K("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), na = K("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), ra = K("<p class=\"text-sm text-red-400\"> </p>"), ia = K("<div><!> <div><!> <div class=\"min-w-0 flex-1\"><input/></div></div> <!> <!> <!></div>");
function aa(o, c) {
	s(c, !0);
	let l = E(c, "variables", 19, () => []), u = E(c, "id", 19, Me), d = E(c, "value", 31, () => z({
		type: "",
		value: ""
	})), p = B(c, Yi), g = U(() => c.selectPlaceholder ?? "Select"), _ = U(() => c.loadingPlaceholder ?? "Loading..."), b = ri(() => c.items), x = A(null), T = A(!1), D = A(""), O = A(0), F = U(() => {
		if (!f(D)) return l();
		let e = f(D).toLowerCase();
		return l().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function I() {
		if (!f(x)) return null;
		let e = d().value, t = f(x).selectionStart ?? e.length, n = e.slice(0, t), r = n.lastIndexOf("{");
		if (r === -1) return null;
		let i = n.slice(r + 1);
		return i.includes("}") ? null : {
			start: r,
			partial: i
		};
	}
	function L() {
		let e = I();
		if (!e || l().length === 0) {
			H(T, !1), H(D, ""), H(O, 0);
			return;
		}
		H(D, e.partial, !0), H(T, f(F).length > 0), H(O, 0);
	}
	function R(e) {
		let t = I();
		if (!t || !f(x)) return;
		let n = d().value, r = f(x).selectionStart ?? n.length, i = n.slice(0, t.start), a = n.slice(r);
		d({
			...d(),
			value: `${i}{${e}}${a}`
		}), H(T, !1), H(D, ""), queueMicrotask(() => {
			if (!f(x)) return;
			let t = i.length + e.length + 2;
			f(x).focus(), f(x).setSelectionRange(t, t);
		});
	}
	function K(e) {
		let t = d().value;
		if (!f(x)) {
			d({
				...d(),
				value: `${t}{${e}}`
			});
			return;
		}
		let n = f(x).selectionStart ?? t.length, r = t.slice(0, n), i = t.slice(n);
		d({
			...d(),
			value: `${r}{${e}}${i}`
		}), queueMicrotask(() => {
			let t = r.length + e.length + 2;
			f(x)?.focus(), f(x)?.setSelectionRange(t, t);
		});
	}
	let q = () => {
		L();
	}, J = (e) => {
		if (!(!f(T) || f(F).length === 0)) {
			if (e.key === "ArrowDown") {
				e.preventDefault(), H(O, (f(O) + 1) % f(F).length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault(), H(O, (f(O) - 1 + f(F).length) % f(F).length);
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				let t = f(F)[f(O)];
				t && (e.preventDefault(), R(t.key));
				return;
			}
			e.key === "Escape" && H(T, !1);
		}
	}, Y = () => {
		setTimeout(() => {
			H(T, !1);
		}, 120);
	};
	var te = ia(), X = C(te), ne = (e) => {
		cr(e, {
			get for() {
				return u();
			},
			children: (e, t) => {
				w();
				var n = M();
				y(() => V(n, c.label)), k(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	N(X, (e) => {
		c.label && e(ne);
	});
	var re = t(X, 2), ie = C(re);
	n(ie, () => Vn, (e, i) => {
		i(e, {
			type: "single",
			get items() {
				return b.items;
			},
			get value() {
				return d().type;
			},
			set value(e) {
				d(d().type = e, !0);
			},
			children: (e, i) => {
				var a = Xi(), o = m(a);
				{
					let e = U(() => Q("flex shrink-0 cursor-pointer items-center justify-between gap-2 rounded-l-xl border border-r-0 bg-dark-700 text-dark-50 outline-none", Ve.md, c.error ? "border-red-500" : "border-dark-500", c.selectClass));
					n(o, () => qn, (r, i) => {
						i(r, {
							get class() {
								return f(e);
							},
							children: (e, r) => {
								var i = Xi(), a = m(i);
								{
									let e = U(() => b.loading ? f(_) : f(g));
									n(a, () => Wn, (t, n) => {
										n(t, {
											get placeholder() {
												return f(e);
											},
											class: "truncate data-placeholder:text-dark-300"
										});
									});
								}
								Z(t(a, 2), {
									icon: "ri:expand-up-down-line",
									class: "size-5 shrink-0 text-dark-300"
								}), k(e, i);
							},
							$$slots: { default: !0 }
						});
					});
				}
				n(t(o, 2), () => ht, (e, i) => {
					i(e, {
						children: (e, i) => {
							var a = P(), o = m(a);
							{
								let e = U(() => c.contentProps?.sideOffset ?? 4), i = U(() => Q("z-50 max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", c.contentProps?.class));
								n(o, () => _n, (a, o) => {
									o(a, G(() => c.contentProps, {
										get sideOffset() {
											return f(e);
										},
										get class() {
											return f(i);
										},
										children: (e, i) => {
											var a = $i(), o = m(a);
											n(o, () => Pn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = t(o, 2);
											n(s, () => En, (e, i) => {
												i(e, {
													children: (e, i) => {
														var a = P(), o = m(a), s = (e) => {
															var t = Zi(), n = C(t, !0);
															h(t), y(() => V(n, f(_))), k(e, t);
														}, c = (e) => {
															var i = P();
															r(m(i), 17, () => b.items, ({ value: e, label: t, disabled: n }) => e, (e, r) => {
																let i = () => f(r).value, a = () => f(r).label, o = () => f(r).disabled;
																var s = P(), c = m(s);
																{
																	let e = (e, n) => {
																		let r = () => n?.().selected;
																		w();
																		var i = Qi(), o = m(i), s = t(o), c = (e) => {
																			Z(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		N(s, (e) => {
																			r() && e(c);
																		}), y(() => V(o, `${a() ?? ""} `)), k(e, i);
																	}, r = U(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	n(c, () => Sn, (t, n) => {
																		n(t, {
																			get value() {
																				return i();
																			},
																			get label() {
																				return a();
																			},
																			get disabled() {
																				return o();
																			},
																			get class() {
																				return f(r);
																			},
																			children: e,
																			$$slots: { default: !0 }
																		});
																	});
																}
																k(e, s);
															}), k(e, i);
														};
														N(o, (e) => {
															b.loading ? e(s) : e(c, -1);
														}), k(e, a);
													},
													$$slots: { default: !0 }
												});
											}), n(t(s, 2), () => An, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), k(e, a);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							k(e, a);
						},
						$$slots: { default: !0 }
					});
				}), k(e, a);
			},
			$$slots: { default: !0 }
		});
	});
	var ae = t(ie, 2), oe = C(ae);
	S(oe, (e) => ({
		id: u(),
		placeholder: c.placeholder,
		class: e,
		"aria-invalid": c.error ? !0 : void 0,
		oninput: l().length > 0 ? q : void 0,
		onkeydown: l().length > 0 ? J : void 0,
		onblur: l().length > 0 ? Y : void 0,
		onfocus: l().length > 0 ? L : void 0,
		onclick: l().length > 0 ? L : void 0,
		...p
	}), [() => Q("min-w-0 w-full truncate rounded-r-xl border bg-dark-700 text-dark-50 outline-none", Ve.md, c.error ? "border-red-500" : "border-dark-500")], void 0, void 0, void 0, !0), i(oe, (e) => H(x, e), () => f(x)), h(ae), h(re);
	var se = t(re, 2), $ = (e) => {
		var t = ea();
		r(t, 21, l, (e) => e.key, (e, t) => {
			Tt(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return f(t).label;
				},
				onclick: () => K(f(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					w();
					var r = M();
					y(() => V(r, `{${f(t).key}}`)), k(e, r);
				},
				$$slots: { default: !0 }
			});
		}), h(t), k(e, t);
	};
	N(se, (e) => {
		l().length > 0 && e($);
	});
	var ce = t(se, 2), le = (n) => {
		var i = na();
		r(i, 23, () => f(F), (e) => e.key, (n, r, i) => {
			var a = ta(), o = C(a), s = C(o), c = C(s, !0);
			h(s);
			var l = t(s, 2), u = C(l, !0);
			h(l), h(o), h(a), y((t) => {
				e(o, "aria-selected", f(i) === f(O)), j(o, 1, t), V(c, `{${f(r).key}}`), V(u, f(r).label);
			}, [() => W(Q("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", f(i) === f(O) && "bg-dark-700"))]), ee("mousedown", o, (e) => {
				e.preventDefault(), R(f(r).key);
			}), k(n, a);
		}), h(i), k(n, i);
	};
	N(ce, (e) => {
		f(T) && f(F).length > 0 && e(le);
	});
	var ue = t(ce, 2), de = (e) => {
		var t = ra(), n = C(t, !0);
		h(t), y(() => V(n, c.error)), k(e, t);
	};
	N(ue, (e) => {
		c.error && e(de);
	}), h(te), y((e, t) => {
		j(te, 1, e), j(re, 1, t);
	}, [() => W(Q("relative grid w-full min-w-0 gap-2", c.class)), () => W(Q("flex w-full min-w-0 items-stretch rounded-xl has-focus:ring-2 has-focus:ring-primary", c.error && "has-focus:ring-red-500"))]), a(oe, () => d().value, (e) => d(d().value = e, !0)), k(o, te), v();
}
J(["mousedown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-slider.svelte
var oa = K("<div class=\"flex items-center justify-between gap-4\"><!> <span class=\"text-sm text-dark-100\"> </span></div>"), sa = K("<p class=\"text-sm text-red-500\"> </p>"), ca = K("<div><!> <input type=\"range\"/> <!></div>");
function la(n, r) {
	s(r, !0);
	let i = E(r, "id", 19, Me), o = E(r, "min", 3, 0), c = E(r, "max", 3, 100), l = E(r, "step", 3, 1), u = E(r, "value", 15, 0);
	var d = ca(), f = C(d), m = (e) => {
		var n = oa(), a = C(n);
		cr(a, {
			get for() {
				return i();
			},
			children: (e, t) => {
				w();
				var n = M();
				y(() => V(n, r.label)), k(e, n);
			},
			$$slots: { default: !0 }
		});
		var o = t(a, 2), s = C(o);
		h(o), h(n), y(() => V(s, `${u() ?? ""}%`)), k(e, n);
	};
	N(f, (e) => {
		r.label && e(m);
	});
	var g = t(f, 2);
	p(g);
	var _ = t(g, 2), b = (e) => {
		var t = sa(), n = C(t, !0);
		h(t), y(() => V(n, r.error)), k(e, t);
	};
	N(_, (e) => {
		r.error && e(b);
	}), h(d), y((t, n) => {
		j(d, 1, t), e(g, "id", i()), e(g, "min", o()), e(g, "max", c()), e(g, "step", l()), j(g, 1, n);
	}, [() => W(Q("grid w-full gap-2")), () => W(Q("h-2 w-full cursor-pointer appearance-none rounded-full bg-dark-600 accent-primary", r.error && "ring-1 ring-red-500"))]), ee("input", g, () => r.onvaluechange?.(u())), a(g, u), k(n, d), v();
}
J(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-switch.svelte
var ua = K("<p class=\"text-sm text-red-400\"> </p>"), da = K("<div><div class=\"flex items-center gap-3\"><!> <!></div> <!></div>");
function fa(e, r) {
	s(r, !0);
	let i = E(r, "checked", 15, !1), a = E(r, "id", 19, Me);
	var o = da(), c = C(o), l = C(c);
	{
		let e = U(() => r.label ? `${a()}-label` : void 0), t = U(() => r.error ? !0 : void 0), o = U(() => Q("inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors outline-none", "data-[state=checked]:bg-primary/15", r.error ? "data-[state=unchecked]:bg-red-500/30" : "data-[state=unchecked]:bg-dark-600", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
		n(l, () => rr, (r, s) => {
			s(r, {
				get id() {
					return a();
				},
				get "aria-labelledby"() {
					return f(e);
				},
				get "aria-invalid"() {
					return f(t);
				},
				get class() {
					return f(o);
				},
				get checked() {
					return i();
				},
				set checked(e) {
					i(e);
				},
				children: (e, t) => {
					var r = P(), i = m(r);
					{
						let e = U(() => Q("pointer-events-none block size-5 shrink-0 rounded-full bg-white transition-transform", "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0", "data-[state=checked]:bg-primary"));
						n(i, () => or, (t, n) => {
							n(t, { get class() {
								return f(e);
							} });
						});
					}
					k(e, r);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var u = t(l, 2), d = (e) => {
		cr(e, {
			get id() {
				return `${a() ?? ""}-label`;
			},
			get for() {
				return a();
			},
			class: "cursor-pointer",
			children: (e, t) => {
				w();
				var n = M();
				y(() => V(n, r.label)), k(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	N(u, (e) => {
		r.label && e(d);
	}), h(c);
	var p = t(c, 2), g = (e) => {
		var t = ua(), n = C(t, !0);
		h(t), y(() => V(n, r.error)), k(e, t);
	};
	N(p, (e) => {
		r.error && e(g);
	}), h(o), y((e) => j(o, 1, e), [() => W(Q("grid gap-2", r.class))]), k(e, o), v();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-list.svelte
var pa = K("<div class=\"flex items-center gap-2\"><!> <!></div>"), ma = K("<p class=\"text-sm text-destructive-50\"> </p>"), ha = K("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function ga(n, i) {
	s(i, !0);
	let a = E(i, "values", 31, () => z([])), o = E(i, "id", 19, Me), c = E(i, "addLabel", 3, "Add"), u = E(i, "removeLabel", 3, "Remove"), d = A(z([]));
	function p(e) {
		return e.map((e) => ({
			id: crypto.randomUUID(),
			value: e
		}));
	}
	function m() {
		a(f(d).map((e) => e.value));
	}
	function g(e, t) {
		H(d, f(d).map((n) => n.id === e ? {
			...n,
			value: t
		} : n), !0), m();
	}
	function _(e) {
		H(d, f(d).filter((t) => t.id !== e), !0), m();
	}
	function b() {
		H(d, [...f(d), {
			id: crypto.randomUUID(),
			value: ""
		}], !0), m();
	}
	l(() => {
		let e = a(), t = f(d).map((e) => e.value);
		e.length === t.length && e.every((e, n) => e === t[n]) || H(d, p(e), !0);
	});
	var x = ha(), S = C(x), T = (e) => {
		{
			let t = U(() => `${o()}-label`);
			cr(e, {
				get id() {
					return f(t);
				},
				children: (e, t) => {
					w();
					var n = M();
					y(() => V(n, i.label)), k(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	N(S, (e) => {
		i.label && e(T);
	});
	var D = t(S, 2), O = C(D);
	r(O, 17, () => f(d), (e) => e.id, (e, n) => {
		var r = pa(), a = C(r);
		{
			let e = U(() => `${o()}-${f(n).id}`);
			Ni(a, {
				get id() {
					return f(e);
				},
				get placeholder() {
					return i.placeholder;
				},
				get value() {
					return f(n).value;
				},
				oninput: (e) => g(f(n).id, e.currentTarget.value)
			});
		}
		Tt(t(a, 2), {
			variant: "ghost",
			size: "icon",
			type: "button",
			get "aria-label"() {
				return u();
			},
			onclick: () => _(f(n).id),
			children: (e, t) => {
				Z(e, {
					icon: "ri:delete-bin-line",
					class: "size-5",
					"aria-hidden": "true"
				});
			},
			$$slots: { default: !0 }
		}), h(r), k(e, r);
	}), Tt(t(O, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: b,
		children: (e, t) => {
			w();
			var n = M();
			y(() => V(n, c())), k(e, n);
		},
		$$slots: { default: !0 }
	}), h(D);
	var P = t(D, 2), F = (e) => {
		var t = ma(), n = C(t, !0);
		h(t), y(() => V(n, i.error)), k(e, t);
	};
	N(P, (e) => {
		i.error && e(F);
	}), h(x), y((t) => {
		j(x, 1, t), e(x, "aria-labelledby", i.label ? `${o()}-label` : void 0);
	}, [() => W(Q("grid w-full gap-2", i.class))]), k(n, x), v();
}
//#endregion
//#region ../ui/src/lib/components/input/use-dropdown-scroll.svelte.ts
var _a = class {
	#e = A(0);
	get scrollTop() {
		return f(this.#e);
	}
	set scrollTop(e) {
		H(this.#e, e, !0);
	}
	#t = A(null);
	get viewportRef() {
		return f(this.#t);
	}
	set viewportRef(e) {
		H(this.#t, e, !0);
	}
	handleViewportScroll = (e) => {
		this.scrollTop = e.currentTarget.scrollTop;
	};
	resetScroll() {
		this.scrollTop = 0, this.viewportRef && (this.viewportRef.scrollTop = 0);
	}
	scrollToIndex(e) {
		if (e < 0) return;
		let t = si(e);
		this.scrollTop = t, this.viewportRef && (this.viewportRef.scrollTop = t);
	}
	scrollToValue(e, t) {
		if (!t) return;
		let n = e.findIndex((e) => e.value === t);
		n >= 0 && this.scrollToIndex(n);
	}
}, va = K("<div class=\"relative w-full\"><div class=\"absolute inset-x-0 top-0\"></div></div>");
function ya(e, t) {
	s(t, !0);
	let n = E(t, "viewportHeight", 3, 200), i = U(() => oi(t.items.length)), a = U(() => f(i) ? ai(t.items, t.scrollTop, n()) : null), o = U(() => f(i) && f(a) ? f(a).items : t.items);
	var c = P(), l = m(c), u = (e) => {
		var n = va();
		let i;
		var s = C(n);
		let c;
		r(s, 21, () => f(o), (e) => e.value, (e, n) => {
			var r = P();
			g(m(r), () => t.item, () => f(n)), k(e, r);
		}), h(s), h(n), y(() => {
			i = q(n, "", i, { height: `${f(a).totalHeight}px` }), c = q(s, "", c, { transform: `translateY(${f(a).offsetY}px)` });
		}), k(e, n);
	}, d = (e) => {
		var n = P();
		r(m(n), 17, () => f(o), (e) => e.value, (e, n) => {
			var r = P();
			g(m(r), () => t.item, () => f(n)), k(e, r);
		}), k(e, n);
	};
	N(l, (e) => {
		f(i) && f(a) ? e(u) : e(d, -1);
	}), k(e, c), v();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-select.svelte
var ba = (e, r = R) => {
	let i = U(() => r().value), a = U(() => r().label), o = U(() => r().disabled);
	var s = P(), c = m(s);
	{
		let e = (e, n) => {
			let r = () => n?.().selected;
			w();
			var i = Sa(), o = m(i), s = t(o), c = (e) => {
				Z(e, {
					icon: "ri:check-line",
					class: "size-5 text-primary"
				});
			};
			N(s, (e) => {
				r() && e(c);
			}), y(() => V(o, `${f(a) ?? ""} `)), k(e, i);
		}, r = U(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
		n(c, () => Sn, (t, n) => {
			n(t, {
				get value() {
					return f(i);
				},
				get label() {
					return f(a);
				},
				get disabled() {
					return f(o);
				},
				get class() {
					return f(r);
				},
				children: e,
				$$slots: { default: !0 }
			});
		});
	}
	k(e, s);
}, xa = new Set([
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
]), Sa = K(" <!>", 1), Ca = K("<span class=\"text-red-400\">*</span>"), wa = K("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Ta = K("<div class=\"px-3 py-1.5 text-sm text-dark-300\"></div>"), Ea = K("<!> <!> <!>", 1), Da = K("<div><div class=\"min-w-0 flex-1\"><!></div> <button type=\"button\" aria-haspopup=\"listbox\"><!></button></div> <!>", 1), Oa = K("<p class=\"text-sm text-red-400\"> </p>"), ka = K("<div><!> <!> <!></div>");
function Aa(r, i) {
	s(i, !0);
	let a = E(i, "allowCustomValue", 3, !0), c = E(i, "id", 19, Me), l = E(i, "value", 15, ""), d = B(i, xa), p = U(() => i.placeholder), g = U(() => i.loadingPlaceholder ?? "Loading..."), _ = U(() => i.selectAriaLabel ?? "Select value"), b = A(!1), x = A(""), S = A(!1), T = new _a(), D = ri(() => i.items, () => i.reloadKey?.()), O = new Zr(() => f(x), 100), M = U(() => new Map(D.items.map((e) => [e.value, e]))), F = U(() => f(M).get(l())), I = U(() => f(F)?.value ?? ""), L = U(() => {
		if (D.loading) return [];
		if (!f(S)) return D.items;
		let e = O.current.trim();
		return e ? ii(D.items, e) : D.items;
	}), R = U(() => f(F) && !f(L).some((e) => e.value === f(F).value) ? [f(F), ...f(L)] : f(L));
	function z() {
		f(S) || H(x, f(F)?.label ?? (a() ? l() : ""), !0);
	}
	o(() => {
		l(), f(F)?.label, z();
	}), o(() => {
		O.current, f(b) && T.resetScroll();
	});
	function K() {
		H(b, f(L).length > 0 || D.items.length > 0, !0);
	}
	function q(e) {
		H(x, e.currentTarget.value, !0), H(S, !0), a() && l(f(x)), K();
	}
	function J() {
		H(b, !0);
	}
	function Y() {
		H(S, !1), z();
	}
	async function te(e) {
		if (H(b, e, !0), !e) {
			H(S, !1), T.resetScroll(), z();
			return;
		}
		await u(), T.scrollToValue(f(L), l());
	}
	function X() {
		H(b, !0);
	}
	let ne = U(() => ke(d, {
		id: c(),
		placeholder: D.loading ? f(g) : f(p),
		autocomplete: "off",
		class: Q("min-w-0 w-full truncate rounded-l-xl border border-r-0 bg-dark-700 text-dark-50 outline-none", Ve.md, i.error ? "border-red-500" : "border-dark-500"),
		"aria-invalid": i.error ? !0 : void 0,
		oninput: q,
		onfocus: J,
		onblur: Y
	}));
	var re = ka(), ie = C(re), ae = (e) => {
		cr(e, {
			get for() {
				return c();
			},
			children: (e, n) => {
				w();
				var r = Sa(), a = m(r), o = t(a), s = (e) => {
					k(e, Ca());
				};
				N(o, (e) => {
					i.required && e(s);
				}), y(() => V(a, `${i.label ?? ""} `)), k(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	N(ie, (e) => {
		i.label && e(ae);
	});
	var oe = t(ie, 2);
	{
		let r = U(() => !!i.disabled);
		n(oe, () => dn, (a, o) => {
			o(a, {
				type: "single",
				get items() {
					return f(R);
				},
				get inputValue() {
					return f(x);
				},
				get value() {
					return f(I);
				},
				onValueChange: (e) => {
					e && (l(e), H(S, !1), H(b, !1), z());
				},
				onOpenChange: te,
				get disabled() {
					return f(r);
				},
				get open() {
					return f(b);
				},
				set open(e) {
					H(b, e, !0);
				},
				children: (r, a) => {
					var o = Da(), s = m(o), c = C(s);
					n(C(c), () => mn, (e, t) => {
						t(e, G(() => f(ne)));
					}), h(c);
					var l = t(c, 2);
					Z(C(l), {
						icon: "ri:expand-up-down-line",
						class: "size-5 shrink-0 text-dark-300"
					}), h(l), h(s), n(t(s, 2), () => ht, (e, r) => {
						r(e, {
							children: (e, r) => {
								var a = P(), o = m(a);
								{
									let e = U(() => i.contentProps?.sideOffset ?? 4), r = U(() => Q("z-50 max-h-84 min-w-(--bits-combobox-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", i.contentProps?.class));
									n(o, () => _n, (a, o) => {
										o(a, G(() => i.contentProps, {
											get sideOffset() {
												return f(e);
											},
											get class() {
												return f(r);
											},
											children: (e, r) => {
												var i = Ea(), a = m(i);
												n(a, () => Pn, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															Z(e, { icon: "ri:arrow-up-s-line" });
														},
														$$slots: { default: !0 }
													});
												});
												var o = t(a, 2);
												n(o, () => En, (e, t) => {
													t(e, {
														get onscroll() {
															return T.handleViewportScroll;
														},
														get ref() {
															return T.viewportRef;
														},
														set ref(e) {
															T.viewportRef = e;
														},
														children: (e, t) => {
															var n = P(), r = m(n), i = (e) => {
																var t = wa(), n = C(t, !0);
																h(t), y(() => V(n, f(g))), k(e, t);
															}, a = (e) => {
																ya(e, {
																	get items() {
																		return f(L);
																	},
																	get scrollTop() {
																		return T.scrollTop;
																	},
																	get item() {
																		return ba;
																	}
																});
															}, o = (e) => {
																var t = Ta();
																t.textContent = "No matches found", k(e, t);
															};
															N(r, (e) => {
																D.loading ? e(i) : f(L).length > 0 ? e(a, 1) : e(o, -1);
															}), k(e, n);
														},
														$$slots: { default: !0 }
													});
												}), n(t(o, 2), () => An, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															Z(e, { icon: "ri:arrow-down-s-line" });
														},
														$$slots: { default: !0 }
													});
												}), k(e, i);
											},
											$$slots: { default: !0 }
										}));
									});
								}
								k(e, a);
							},
							$$slots: { default: !0 }
						});
					}), y((t, n) => {
						j(s, 1, t), e(l, "aria-label", f(_)), e(l, "aria-expanded", f(b)), l.disabled = !!i.disabled, j(l, 1, n);
					}, [() => W(Q("flex w-full min-w-0 items-stretch rounded-xl has-focus:ring-2 has-focus:ring-primary", i.error && "has-focus:ring-red-500")), () => W(Q("flex shrink-0 cursor-pointer items-center justify-center rounded-r-xl border bg-dark-700 text-dark-50 outline-none", Ve.md, i.error ? "border-red-500" : "border-dark-500", i.selectClass))]), ee("click", l, X), k(r, o);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var se = t(oe, 2), $ = (e) => {
		var t = Oa(), n = C(t, !0);
		h(t), y(() => V(n, i.error)), k(e, t);
	};
	N(se, (e) => {
		i.error && e($);
	}), h(re), y((e) => j(re, 1, e), [() => W(Q("relative grid w-full min-w-0 gap-2", i.class))]), k(r, re), v();
}
J(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-select-text.svelte
var ja = new Set([
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
]), Ma = K("<!> <!>", 1), Na = K("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Pa = K(" <!>", 1), Fa = K("<!> <!> <!>", 1), Ia = K("<div aria-hidden=\"true\">—</div>"), La = K("<input/>"), Ra = K("<div class=\"flex shrink-0 items-center self-center\"><!></div>"), za = K("<div class=\"flex flex-wrap gap-1.5\"></div>"), Ba = K("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), Va = K("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), Ha = K("<p class=\"text-sm text-red-400\"> </p>"), Ua = K("<div><!> <div class=\"flex items-center gap-3\"><div><input/> <!> <!></div> <!></div> <!> <!> <!></div>");
function Wa(o, c) {
	s(c, !0);
	let l = E(c, "variables", 19, () => []), u = E(c, "valuelessOperators", 19, () => []), d = E(c, "id", 19, Me), _ = E(c, "value", 31, () => z({
		path: "",
		type: "equals",
		value: ""
	})), b = B(c, ja), T = U(() => c.selectPlaceholder ?? "Select"), D = U(() => c.loadingPlaceholder ?? "Loading..."), F = ri(() => c.items), I = A(null), L = A(null), R = A("path"), K = A(!1), q = A(""), J = A(0), Y = U(() => {
		if (!f(q)) return l();
		let e = f(q).toLowerCase();
		return l().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function te(e) {
		return f(e === "path" ? I : L);
	}
	function X(e) {
		return e === "path" ? _().path : _().value;
	}
	function ne(e, t) {
		if (e === "path") {
			_({
				..._(),
				path: t
			});
			return;
		}
		_({
			..._(),
			value: t
		});
	}
	function re(e) {
		let t = te(e);
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
		H(R, e, !0);
		let t = re(e);
		if (!t || l().length === 0) {
			H(K, !1), H(q, ""), H(J, 0);
			return;
		}
		H(q, t.partial, !0), H(K, f(Y).length > 0), H(J, 0);
	}
	function ae(e, t = f(R)) {
		let n = re(t), r = te(t);
		if (!n || !r) return;
		let i = X(t), a = r.selectionStart ?? i.length, o = i.slice(0, n.start);
		ne(t, `${o}{${e}}${i.slice(a)}`), H(K, !1), H(q, ""), queueMicrotask(() => {
			if (!r) return;
			let t = o.length + e.length + 2;
			r.focus(), r.setSelectionRange(t, t);
		});
	}
	function oe(e, t = f(R)) {
		let n = X(t), r = te(t);
		if (!r) {
			ne(t, `${n}{${e}}`);
			return;
		}
		let i = r.selectionStart ?? n.length, a = n.slice(0, i);
		ne(t, `${a}{${e}}${n.slice(i)}`), queueMicrotask(() => {
			let t = a.length + e.length + 2;
			r.focus(), r.setSelectionRange(t, t);
		});
	}
	let se = (e) => ({
		handleInput: () => {
			ie(e);
		},
		handleKeydown: (t) => {
			if (!(!f(K) || f(Y).length === 0 || f(R) !== e)) {
				if (t.key === "ArrowDown") {
					t.preventDefault(), H(J, (f(J) + 1) % f(Y).length);
					return;
				}
				if (t.key === "ArrowUp") {
					t.preventDefault(), H(J, (f(J) - 1 + f(Y).length) % f(Y).length);
					return;
				}
				if (t.key === "Enter" || t.key === "Tab") {
					let n = f(Y)[f(J)];
					n && (t.preventDefault(), ae(n.key, e));
					return;
				}
				t.key === "Escape" && H(K, !1);
			}
		},
		handleBlur: () => {
			$ && clearTimeout($), $ = setTimeout(() => {
				H(K, !1), $ = void 0;
			}, 120);
		}
	}), $;
	x(() => {
		$ && clearTimeout($);
	});
	let ce = se("path"), le = se("value"), ue = U(() => c.error ? "border-red-500" : "border-dark-500"), de = U(() => u().includes(_().type));
	var fe = Ua(), pe = C(fe), me = (e) => {
		cr(e, {
			get for() {
				return d();
			},
			children: (e, t) => {
				w();
				var n = M();
				y(() => V(n, c.label)), k(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	N(pe, (e) => {
		c.label && e(me);
	});
	var he = t(pe, 2), ge = C(he), _e = C(ge);
	S(_e, (e) => ({
		id: d(),
		placeholder: c.pathPlaceholder,
		class: e,
		"aria-invalid": c.error ? !0 : void 0,
		role: l().length > 0 ? "combobox" : void 0,
		"aria-autocomplete": l().length > 0 ? "list" : void 0,
		"aria-expanded": l().length > 0 ? f(K) && f(R) === "path" && f(Y).length > 0 : void 0,
		"aria-controls": l().length > 0 ? `${d()}-listbox` : void 0,
		"aria-activedescendant": f(K) && f(R) === "path" && f(Y).length > 0 ? `${d()}-option-${f(J)}` : void 0,
		oninput: l().length > 0 ? ce.handleInput : void 0,
		onkeydown: l().length > 0 ? ce.handleKeydown : void 0,
		onblur: l().length > 0 ? ce.handleBlur : void 0,
		onfocus: l().length > 0 ? () => ie("path") : void 0,
		onclick: l().length > 0 ? () => ie("path") : void 0,
		...b
	}), [() => Q("min-w-0 flex-1 truncate border border-r bg-dark-700 text-dark-50 outline-none", "rounded-l-xl", Ve.md, f(ue))], void 0, void 0, void 0, !0), i(_e, (e) => H(I, e), () => f(I));
	var ve = t(_e, 2);
	n(ve, () => Vn, (e, i) => {
		i(e, {
			type: "single",
			get items() {
				return F.items;
			},
			get value() {
				return _().type;
			},
			set value(e) {
				_(_().type = e, !0);
			},
			children: (e, i) => {
				var a = Ma(), o = m(a);
				{
					let e = U(() => Q("flex shrink-0 cursor-pointer items-center justify-between gap-2 border border-x-0 bg-dark-700 text-dark-50 outline-none", Ve.md, f(ue), c.selectClass ?? "w-32"));
					n(o, () => qn, (r, i) => {
						i(r, {
							get class() {
								return f(e);
							},
							children: (e, r) => {
								var i = Ma(), a = m(i);
								{
									let e = U(() => F.loading ? f(D) : f(T));
									n(a, () => Wn, (t, n) => {
										n(t, {
											get placeholder() {
												return f(e);
											},
											class: "truncate data-placeholder:text-dark-300"
										});
									});
								}
								Z(t(a, 2), {
									icon: "ri:expand-up-down-line",
									class: "size-5 shrink-0 text-dark-300"
								}), k(e, i);
							},
							$$slots: { default: !0 }
						});
					});
				}
				n(t(o, 2), () => ht, (e, i) => {
					i(e, {
						children: (e, i) => {
							var a = P(), o = m(a);
							{
								let e = U(() => c.contentProps?.sideOffset ?? 4), i = U(() => Q("z-50 max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", c.contentProps?.class));
								n(o, () => _n, (a, o) => {
									o(a, G(() => c.contentProps, {
										get sideOffset() {
											return f(e);
										},
										get class() {
											return f(i);
										},
										children: (e, i) => {
											var a = Fa(), o = m(a);
											n(o, () => Pn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = t(o, 2);
											n(s, () => En, (e, i) => {
												i(e, {
													children: (e, i) => {
														var a = P(), o = m(a), s = (e) => {
															var t = Na(), n = C(t, !0);
															h(t), y(() => V(n, f(D))), k(e, t);
														}, c = (e) => {
															var i = P();
															r(m(i), 17, () => F.items, ({ value: e, label: t, disabled: n }) => e, (e, r) => {
																let i = () => f(r).value, a = () => f(r).label, o = () => f(r).disabled;
																var s = P(), c = m(s);
																{
																	let e = (e, n) => {
																		let r = () => n?.().selected;
																		w();
																		var i = Pa(), o = m(i), s = t(o), c = (e) => {
																			Z(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		N(s, (e) => {
																			r() && e(c);
																		}), y(() => V(o, `${a() ?? ""} `)), k(e, i);
																	}, r = U(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	n(c, () => Sn, (t, n) => {
																		n(t, {
																			get value() {
																				return i();
																			},
																			get label() {
																				return a();
																			},
																			get disabled() {
																				return o();
																			},
																			get class() {
																				return f(r);
																			},
																			children: e,
																			$$slots: { default: !0 }
																		});
																	});
																}
																k(e, s);
															}), k(e, i);
														};
														N(o, (e) => {
															F.loading ? e(s) : e(c, -1);
														}), k(e, a);
													},
													$$slots: { default: !0 }
												});
											}), n(t(s, 2), () => An, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), k(e, a);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							k(e, a);
						},
						$$slots: { default: !0 }
					});
				}), k(e, a);
			},
			$$slots: { default: !0 }
		});
	});
	var ye = t(ve, 2), be = (e) => {
		var t = Ia();
		y((e) => j(t, 1, e), [() => W(Q("flex min-w-0 items-center rounded-r-xl border border-l-0 bg-dark-700 px-3 text-dark-500 select-none", Ve.md, f(ue)))]), k(e, t);
	}, xe = (t) => {
		var n = La();
		p(n), i(n, (e) => H(L, e), () => f(L)), y((t) => {
			e(n, "placeholder", c.valuePlaceholder), j(n, 1, t), e(n, "aria-invalid", c.error ? !0 : void 0), e(n, "role", l().length > 0 ? "combobox" : void 0), e(n, "aria-autocomplete", l().length > 0 ? "list" : void 0), e(n, "aria-expanded", l().length > 0 ? f(K) && f(R) === "value" && f(Y).length > 0 : void 0), e(n, "aria-controls", l().length > 0 ? `${d()}-listbox` : void 0), e(n, "aria-activedescendant", f(K) && f(R) === "value" && f(Y).length > 0 ? `${d()}-option-${f(J)}` : void 0);
		}, [() => W(Q("min-w-0 flex-1 truncate rounded-r-xl border bg-dark-700 text-dark-50 outline-none", Ve.md, f(ue)))]), ee("input", n, function(...e) {
			(l().length > 0 ? le.handleInput : void 0)?.apply(this, e);
		}), ee("keydown", n, function(...e) {
			(l().length > 0 ? le.handleKeydown : void 0)?.apply(this, e);
		}), O("blur", n, function(...e) {
			(l().length > 0 ? le.handleBlur : void 0)?.apply(this, e);
		}), O("focus", n, function(...e) {
			(l().length > 0 ? () => ie("value") : void 0)?.apply(this, e);
		}), ee("click", n, function(...e) {
			(l().length > 0 ? () => ie("value") : void 0)?.apply(this, e);
		}), a(n, () => _().value, (e) => _(_().value = e, !0)), k(t, n);
	};
	N(ye, (e) => {
		f(de) ? e(be) : e(xe, -1);
	}), h(ge);
	var Se = t(ge, 2), Ce = (e) => {
		var t = Ra();
		g(C(t), () => c.suffix), h(t), k(e, t);
	};
	N(Se, (e) => {
		c.suffix && e(Ce);
	}), h(he);
	var we = t(he, 2), Te = (e) => {
		var t = za();
		r(t, 21, l, (e) => e.key, (e, t) => {
			Tt(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return f(t).label;
				},
				onclick: () => oe(f(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					w();
					var r = M();
					y(() => V(r, `{${f(t).key}}`)), k(e, r);
				},
				$$slots: { default: !0 }
			});
		}), h(t), k(e, t);
	};
	N(we, (e) => {
		l().length > 0 && e(Te);
	});
	var Ee = t(we, 2), De = (n) => {
		var i = Va();
		r(i, 23, () => f(Y), (e) => e.key, (n, r, i) => {
			var a = Ba(), o = C(a), s = C(o), c = C(s, !0);
			h(s);
			var l = t(s, 2), u = C(l, !0);
			h(l), h(o), h(a), y((t) => {
				e(o, "id", `${d()}-option-${f(i)}`), e(o, "aria-selected", f(i) === f(J)), j(o, 1, t), V(c, `{${f(r).key}}`), V(u, f(r).label);
			}, [() => W(Q("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", f(i) === f(J) && "bg-dark-700"))]), ee("mousedown", o, (e) => {
				e.preventDefault(), ae(f(r).key, f(R));
			}), k(n, a);
		}), h(i), y(() => e(i, "id", `${d()}-listbox`)), k(n, i);
	};
	N(Ee, (e) => {
		f(K) && f(Y).length > 0 && e(De);
	});
	var Oe = t(Ee, 2), ke = (e) => {
		var t = Ha(), n = C(t, !0);
		h(t), y(() => V(n, c.error)), k(e, t);
	};
	N(Oe, (e) => {
		c.error && e(ke);
	}), h(fe), y((e, t) => {
		j(fe, 1, e), j(ge, 1, t);
	}, [() => W(Q("relative grid w-full gap-2", c.class)), () => W(Q("grid min-w-0 flex-1 grid-cols-[1fr_120px_1fr] rounded-xl has-focus:ring-2 has-focus:ring-primary", c.error && "has-focus:ring-red-500"))]), a(_e, () => _().path, (e) => _(_().path = e, !0)), k(o, fe), v();
}
J([
	"input",
	"keydown",
	"click",
	"mousedown"
]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-variables.svelte
var Ga = new Set([
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
]), Ka = K("<div class=\"flex flex-wrap gap-1.5\"></div>"), qa = K("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), Ja = K("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), Ya = K("<p class=\"text-sm text-red-400\"> </p>"), Xa = K("<div class=\"relative grid w-full min-w-0 gap-2\"><!> <div><input/></div> <!> <!> <!></div>");
function Za(n, o) {
	s(o, !0);
	let c = E(o, "variables", 19, () => []), l = E(o, "value", 15, ""), u = E(o, "id", 19, Me), d = B(o, Ga), p = A(null), m = A(!1), g = A(""), _ = A(0), b = U(() => {
		if (!f(g)) return c();
		let e = f(g).toLowerCase();
		return c().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function T() {
		if (!f(p)) return null;
		let e = f(p).selectionStart ?? l().length, t = l().slice(0, e), n = t.lastIndexOf("{");
		if (n === -1) return null;
		let r = t.slice(n + 1);
		return r.includes("}") ? null : {
			start: n,
			partial: r
		};
	}
	function D() {
		let e = T();
		if (!e || c().length === 0) {
			H(m, !1), H(g, ""), H(_, 0);
			return;
		}
		H(g, e.partial, !0), H(m, f(b).length > 0), H(_, 0);
	}
	function O(e) {
		let t = T();
		if (!t || !f(p)) return;
		let n = f(p).selectionStart ?? l().length, r = l().slice(0, t.start);
		l(`${r}{${e}}${l().slice(n)}`), H(m, !1), H(g, ""), queueMicrotask(() => {
			if (!f(p)) return;
			let t = r.length + e.length + 2;
			f(p).focus(), f(p).setSelectionRange(t, t);
		});
	}
	function P(e) {
		if (!f(p)) {
			l(`${l()}{${e}}`);
			return;
		}
		let t = f(p).selectionStart ?? l().length, n = l().slice(0, t);
		l(`${n}{${e}}${l().slice(t)}`), queueMicrotask(() => {
			let t = n.length + e.length + 2;
			f(p)?.focus(), f(p)?.setSelectionRange(t, t);
		});
	}
	let F = (e) => {
		o.oninput?.(e), D();
	}, I = (e) => {
		if (!(!f(m) || f(b).length === 0)) {
			if (e.key === "ArrowDown") {
				e.preventDefault(), H(_, (f(_) + 1) % f(b).length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault(), H(_, (f(_) - 1 + f(b).length) % f(b).length);
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				let t = f(b)[f(_)];
				t && (e.preventDefault(), O(t.key));
				return;
			}
			e.key === "Escape" && H(m, !1);
		}
	}, L, R = () => {
		L && clearTimeout(L), L = setTimeout(() => {
			H(m, !1), L = void 0;
		}, 120);
	};
	x(() => {
		L && clearTimeout(L);
	});
	var z = Xa(), G = C(z), K = (e) => {
		cr(e, {
			get for() {
				return u();
			},
			children: (e, t) => {
				w();
				var n = M();
				y(() => V(n, o.label)), k(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	N(G, (e) => {
		o.label && e(K);
	});
	var q = t(G, 2), J = C(q);
	S(J, (e) => ({
		id: u(),
		placeholder: o.placeholder,
		class: e,
		role: "combobox",
		"aria-invalid": o.error ? !0 : void 0,
		"aria-autocomplete": "list",
		"aria-expanded": f(m) && f(b).length > 0,
		"aria-controls": `${u()}-listbox`,
		"aria-activedescendant": f(m) && f(b).length > 0 ? `${u()}-option-${f(_)}` : void 0,
		oninput: F,
		onkeydown: I,
		onblur: R,
		onfocus: D,
		onclick: D,
		...d
	}), [() => Q("min-w-0 w-full truncate rounded-xl border bg-dark-700 text-dark-50 outline-none", Ve.md, o.error ? "border-red-500" : "border-dark-500")], void 0, void 0, void 0, !0), i(J, (e) => H(p, e), () => f(p)), h(q);
	var Y = t(q, 2), te = (e) => {
		var t = Ka();
		r(t, 21, c, (e) => e.key, (e, t) => {
			Tt(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return f(t).label;
				},
				onclick: () => P(f(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					w();
					var r = M();
					y(() => V(r, `{${f(t).key}}`)), k(e, r);
				},
				$$slots: { default: !0 }
			});
		}), h(t), k(e, t);
	};
	N(Y, (e) => {
		c().length > 0 && e(te);
	});
	var X = t(Y, 2), ne = (n) => {
		var i = Ja();
		r(i, 23, () => f(b), (e) => e.key, (n, r, i) => {
			var a = qa(), o = C(a), s = C(o), c = C(s, !0);
			h(s);
			var l = t(s, 2), d = C(l, !0);
			h(l), h(o), h(a), y((t) => {
				e(o, "id", `${u()}-option-${f(i)}`), e(o, "aria-selected", f(i) === f(_)), j(o, 1, t), V(c, `{${f(r).key}}`), V(d, f(r).label);
			}, [() => W(Q("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", f(i) === f(_) && "bg-dark-700"))]), ee("mousedown", o, (e) => {
				e.preventDefault(), O(f(r).key);
			}), k(n, a);
		}), h(i), y(() => e(i, "id", `${u()}-listbox`)), k(n, i);
	};
	N(X, (e) => {
		f(m) && f(b).length > 0 && e(ne);
	});
	var re = t(X, 2), ie = (e) => {
		var t = Ya(), n = C(t, !0);
		h(t), y(() => V(n, o.error)), k(e, t);
	};
	N(re, (e) => {
		o.error && e(ie);
	}), h(z), y((e) => j(q, 1, e), [() => W(Q("relative flex w-full min-w-0 items-center rounded-xl", "has-focus-within:ring-2 has-focus-within:ring-primary", o.error && "has-focus-within:ring-red-500", o.class))]), a(J, l), k(n, z), v();
}
J(["mousedown"]);
//#endregion
export { Ar as _, fa as a, Ji as c, Fi as d, Ni as f, Lr as g, ri as h, ga as i, Hi as l, gi as m, Wa as n, la as o, Di as p, Aa as r, aa as s, Za as t, Ri as u, fr as v, cr as y };
