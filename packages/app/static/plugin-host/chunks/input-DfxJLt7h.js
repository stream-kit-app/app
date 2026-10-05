import { An as e, Bn as t, C as n, Ct as r, Dn as i, Dr as a, Dt as o, En as s, F as c, Hr as l, Ir as u, Lt as d, Mn as f, Nn as p, Nt as m, Sn as h, Tt as g, Ur as _, Vt as v, Wn as y, Yr as b, Z as x, _r as S, a as C, bn as w, br as T, bt as E, cr as D, ct as O, ei as k, et as A, hn as j, ii as M, in as N, ir as ee, j as P, jn as F, lr as I, nr as L, o as R, or as z, ot as B, pr as V, pt as H, rr as te, s as ne, sn as U, sr as W, st as re, ti as G, ur as K, xn as q, xt as J, yr as Y, zt as ie } from "./client-BFeMv2Ma.js";
import { i as X, n as ae, o as oe, r as se, s as ce, t as le } from "./dist-DRvBcEUk.js";
import { t as Z } from "./utils-Dqp4W1j8.js";
import "./disclose-version-CI8I6yeK.js";
import { t as Q } from "./Icon-Ct61sPxO.js";
import { O as ue } from "./dist-C2qYxMMi.js";
import "./index-client-DI7sx7Sj.js";
import { C as de, D as $, _ as fe, a as pe, c as me, d as he, g as ge, i as _e, l as ve, n as ye, o as be, r as xe, s as Se, u as Ce, v as we, x as Te } from "./animations-complete-2GhqX7WL.js";
import { i as Ee, n as De, o as Oe, r as ke, t as Ae } from "./use-id-BW6hjw-g.js";
import { _ as je, a as Me, c as Ne, d as Pe, f as Fe, g as Ie, h as Le, l as Re, m as ze, o as Be, p as Ve, s as He, u as Ue, v as We } from "./command-DSm38em-.js";
import { a as Ge } from "./tooltip-HtCXbDvr.js";
import { _ as Ke, a as qe, d as Je, f as Ye, g as Xe, h as Ze, i as Qe, l as $e, m as et, o as tt, p as nt, r as rt, s as it, u as at } from "./dom-9pAGmv2P.js";
import { a as ot, o as st, t as ct } from "./presence-manager.svelte-cK0pnbQH.js";
import { a as lt, c as ut, i as dt, n as ft, r as pt, s as mt } from "./dialog-BZm4K94n.js";
import { t as ht } from "./portal-D7k4f7sM.js";
import { a as gt, i as _t, n as vt, o as yt, r as bt, s as xt, t as St } from "./dom-typeahead.svelte-4ba_FbDd.js";
import "./legacy-BuqkmPcC.js";
import { i as Ct, n as wt, r as Tt, t as Et } from "./popper-layer-force-mount-BqARajyD.js";
import { t as Dt } from "./floating-layer-anchor-FImxxE63.js";
import { i as Ot, n as kt, r as At } from "./popover-C77Wt8KF.js";
import { t as jt } from "./scroll-area-DXaKUX2U.js";
import { t as Mt } from "./attachments-BbcOpCxM.js";
import { t as Nt } from "./button-DGOI4Wpk.js";
import "./button-CBfuPA65.js";
import { a as Pt, i as Ft, n as It } from "./copy-button-Co0zzAIm.js";
import { a as Lt, c as Rt, d as zt, i as Bt, l as Vt, n as Ht, o as Ut, r as Wt, s as Gt, t as Kt, u as qt } from "./input-field-classes-Cmqg1dVo.js";
import { a as Jt, n as Yt, o as Xt, r as Zt, t as Qt } from "./variable-autocomplete-BX_71THE.js";
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/checkbox/checkbox.svelte.js
var $t = be({
	component: "checkbox",
	parts: [
		"root",
		"group",
		"group-label",
		"input"
	]
}), en = new de("Checkbox.Group"), tn = new de("Checkbox.Root"), nn = class e {
	static create(t, n = null) {
		return tn.set(new e(t, n));
	}
	opts;
	group;
	#e = a(() => this.group && this.group.opts.name.current ? this.group.opts.name.current : this.opts.name.current);
	get trueName() {
		return t(this.#e);
	}
	set trueName(e) {
		S(this.#e, e);
	}
	#t = a(() => this.group && this.group.opts.required.current ? !0 : this.opts.required.current);
	get trueRequired() {
		return t(this.#t);
	}
	set trueRequired(e) {
		S(this.#t, e);
	}
	#n = a(() => this.group && this.group.opts.disabled.current ? !0 : this.opts.disabled.current);
	get trueDisabled() {
		return t(this.#n);
	}
	set trueDisabled(e) {
		S(this.#n, e);
	}
	#r = a(() => this.group && this.group.opts.readonly.current ? !0 : this.opts.readonly.current);
	get trueReadonly() {
		return t(this.#r);
	}
	set trueReadonly(e) {
		S(this.#r, e);
	}
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = he(this.opts.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this), Te.pre([() => b(this.group?.opts.value.current), () => this.opts.value.current], ([e, t]) => {
			e && t && (this.opts.checked.current = e.includes(t));
		}), Te.pre(() => this.opts.checked.current, (e) => {
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
	#a = a(() => ({
		checked: this.opts.checked.current,
		indeterminate: this.opts.indeterminate.current
	}));
	get snippetProps() {
		return t(this.#a);
	}
	set snippetProps(e) {
		S(this.#a, e);
	}
	#o = a(() => ({
		id: this.opts.id.current,
		role: "checkbox",
		type: this.opts.type.current,
		disabled: this.trueDisabled,
		"aria-checked": Se(this.opts.checked.current, this.opts.indeterminate.current),
		"aria-required": xe(this.trueRequired),
		"aria-readonly": xe(this.trueReadonly),
		"data-disabled": ye(this.trueDisabled),
		"data-readonly": ye(this.trueReadonly),
		"data-state": an(this.opts.checked.current, this.opts.indeterminate.current),
		[$t.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return t(this.#o);
	}
	set props(e) {
		S(this.#o, e);
	}
}, rn = class e {
	static create() {
		return new e(tn.get());
	}
	root;
	#e = a(() => this.root.group ? !!(this.root.opts.value.current !== void 0 && this.root.group.opts.value.current.includes(this.root.opts.value.current)) : this.root.opts.checked.current);
	get trueChecked() {
		return t(this.#e);
	}
	set trueChecked(e) {
		S(this.#e, e);
	}
	#t = a(() => !!this.root.trueName);
	get shouldRender() {
		return t(this.#t);
	}
	set shouldRender(e) {
		S(this.#t, e);
	}
	constructor(e) {
		this.root = e, this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		ot(this.root.opts.ref.current) && this.root.opts.ref.current.focus();
	}
	#n = a(() => ({
		type: "checkbox",
		checked: this.root.opts.checked.current === !0,
		disabled: this.root.trueDisabled,
		required: this.root.trueRequired,
		name: this.root.trueName,
		form: this.root.opts.form.current,
		value: this.root.opts.value.current,
		readonly: this.root.trueReadonly,
		onfocus: this.onfocus
	}));
	get props() {
		return t(this.#n);
	}
	set props(e) {
		S(this.#n, e);
	}
};
function an(e, t) {
	return t ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/hidden-input.svelte
var on = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value"
]), sn = h("<input/>");
function cn(e, n) {
	_(n, !0);
	let r = C(n, "value", 15), i = R(n, on), o = a(() => Ee(i, {
		"aria-hidden": "true",
		tabindex: -1,
		style: {
			...We,
			position: "absolute",
			top: "0",
			left: "0"
		}
	}));
	var s = q(), c = D(s), u = (e) => {
		var n = sn();
		B(n, () => ({
			...t(o),
			value: r()
		}), void 0, void 0, void 0, void 0, !0), w(e, n);
	}, d = (e) => {
		var n = sn();
		B(n, () => ({ ...t(o) }), void 0, void 0, void 0, void 0, !0), A(n, r), w(e, n);
	};
	v(c, (e) => {
		t(o).type === "checkbox" ? e(u) : e(d, -1);
	}), w(e, s), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/checkbox/components/checkbox-input.svelte
function ln(e, t) {
	_(t, !1);
	let r = rn.create();
	n();
	var i = q(), a = D(i), o = (e) => {
		cn(e, ne(() => r.props));
	};
	v(a, (e) => {
		r.shouldRender && e(o);
	}), w(e, i), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/checkbox/components/checkbox.svelte
var un = /* @__PURE__ */ new Set([
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
	"form",
	"value",
	"id",
	"indeterminate",
	"onIndeterminateChange",
	"child",
	"type",
	"readonly"
]), dn = h("<button><!></button>"), fn = h("<!> <!>", 1);
function pn(e, n) {
	let r = s();
	_(n, !0);
	let i = C(n, "checked", 15, !1), o = C(n, "ref", 15, null), c = C(n, "disabled", 3, !1), u = C(n, "required", 3, !1), d = C(n, "name", 3, void 0), f = C(n, "form", 3, void 0), p = C(n, "value", 3, "on"), m = C(n, "id", 19, () => De(r)), h = C(n, "indeterminate", 15, !1), g = C(n, "type", 3, "button"), y = R(n, un), b = en.getOr(null);
	b && p() && (b.opts.value.current.includes(p()) ? i(!0) : i(!1)), Te.pre(() => p(), () => {
		b && p() && (b.opts.value.current.includes(p()) ? i(!0) : i(!1));
	});
	let x = nn.create({
		checked: $(() => i(), (e) => {
			i(e), n.onCheckedChange?.(e);
		}),
		disabled: $(() => c() ?? !1),
		required: $(() => u()),
		name: $(() => d()),
		form: $(() => f()),
		value: $(() => p()),
		id: $(() => m()),
		ref: $(() => o(), (e) => o(e)),
		indeterminate: $(() => h(), (e) => {
			h(e), n.onIndeterminateChange?.(e);
		}),
		type: $(() => g()),
		readonly: $(() => !!n.readonly)
	}, b), S = a(() => Ee({ ...y }, x.props));
	var T = fn(), E = D(T), O = (e) => {
		var r = q(), i = D(r);
		{
			let e = a(() => ({
				props: t(S),
				...x.snippetProps
			}));
			U(i, () => n.child, () => t(e));
		}
		w(e, r);
	}, k = (e) => {
		var r = dn();
		B(r, () => ({ ...t(S) }));
		var i = W(r);
		U(i, () => n.children ?? M, () => x.snippetProps), G(r), w(e, r);
	};
	v(E, (e) => {
		n.child ? e(O) : e(k, -1);
	}), ln(K(E, 2), {}), w(e, T), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/data-typeahead.svelte.js
var mn = class {
	#e;
	#t = a(() => this.#e.candidateValues());
	#n;
	constructor(e) {
		this.#e = e, this.#n = vt("", {
			afterMs: 1e3,
			getWindow: this.#e.getWindow
		}), this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this), this.resetTypeahead = this.resetTypeahead.bind(this);
	}
	handleTypeaheadSearch(e) {
		if (!this.#e.enabled() || !t(this.#t).length) return;
		this.#n.current = this.#n.current + e;
		let n = this.#e.getCurrentItem(), r = t(this.#t).find((e) => e === n) ?? "", i = t(this.#t).map((e) => e ?? ""), a = gt(i, this.#n.current, r), o = t(this.#t).find((e) => e === a);
		return o && this.#e.onMatch(o), o;
	}
	resetTypeahead() {
		this.#n.current = "";
	}
}, hn = [
	qe,
	Ye,
	tt,
	Ke,
	$e,
	at,
	"Alt",
	et,
	Je,
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
], gn = [
	Qe,
	Xe,
	nt
], _n = [
	it,
	Ze,
	"End"
], vn = [...gn, ..._n], yn = be({
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
}), bn = new de("Select.Root | Combobox.Root");
new de("Select.Group | Combobox.Group");
var xn = new de("Select.Content | Combobox.Content"), Sn = class {
	opts;
	#e = Y(!1);
	get touchedInput() {
		return t(this.#e);
	}
	set touchedInput(e) {
		S(this.#e, e, !0);
	}
	#t = Y(null);
	get inputNode() {
		return t(this.#t);
	}
	set inputNode(e) {
		S(this.#t, e, !0);
	}
	#n = Y(null);
	get contentNode() {
		return t(this.#n);
	}
	set contentNode(e) {
		S(this.#n, e, !0);
	}
	contentPresence;
	#r = Y(null);
	get viewportNode() {
		return t(this.#r);
	}
	set viewportNode(e) {
		S(this.#r, e, !0);
	}
	#i = Y(null);
	get triggerNode() {
		return t(this.#i);
	}
	set triggerNode(e) {
		S(this.#i, e, !0);
	}
	#a = Y(null);
	get valueNode() {
		return t(this.#a);
	}
	set valueNode(e) {
		S(this.#a, e, !0);
	}
	#o = Y("");
	get valueId() {
		return t(this.#o);
	}
	set valueId(e) {
		S(this.#o, e, !0);
	}
	#s = Y(null);
	get highlightedNode() {
		return t(this.#s);
	}
	set highlightedNode(e) {
		S(this.#s, e, !0);
	}
	#c = a(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-value") : null);
	get highlightedValue() {
		return t(this.#c);
	}
	set highlightedValue(e) {
		S(this.#c, e);
	}
	#l = a(() => {
		if (this.highlightedNode) return this.highlightedNode.id;
	});
	get highlightedId() {
		return t(this.#l);
	}
	set highlightedId(e) {
		S(this.#l, e);
	}
	#u = a(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-label") : null);
	get highlightedLabel() {
		return t(this.#u);
	}
	set highlightedLabel(e) {
		S(this.#u, e);
	}
	#d = Y(!1);
	get contentIsPositioned() {
		return t(this.#d);
	}
	set contentIsPositioned(e) {
		S(this.#d, e, !0);
	}
	isUsingKeyboard = !1;
	isCombobox = !1;
	domContext = new ke(() => null);
	constructor(e) {
		this.opts = e, this.isCombobox = e.isCombobox, this.contentPresence = new ct({
			ref: $(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), ee(() => {
			this.opts.open.current || this.setHighlightedNode(null);
		});
	}
	setHighlightedNode(e, t = !1) {
		this.highlightedNode = e, e && (this.isUsingKeyboard || t) && this.scrollHighlightedNodeIntoView(e);
	}
	scrollHighlightedNodeIntoView(e) {
		this.viewportNode && this.contentIsPositioned && e.scrollIntoView({ block: this.opts.scrollAlignment.current });
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
	getBitsAttr = (e) => yn.getAttr(e, this.isCombobox ? "combobox" : void 0);
}, Cn = class extends Sn {
	opts;
	isMulti = !1;
	#e = a(() => this.opts.value.current !== "");
	get hasValue() {
		return t(this.#e);
	}
	set hasValue(e) {
		S(this.#e, e);
	}
	#t = a(() => this.opts.items.current.length ? this.opts.items.current.find((e) => e.value === this.opts.value.current)?.label ?? "" : "");
	get currentLabel() {
		return t(this.#t);
	}
	set currentLabel(e) {
		S(this.#t, e);
	}
	#n = a(() => this.opts.items.current.length ? this.opts.items.current.filter((e) => !e.disabled).map((e) => e.label) : []);
	get candidateLabels() {
		return t(this.#n);
	}
	set candidateLabels(e) {
		S(this.#n, e);
	}
	#r = a(() => !(this.isMulti || this.opts.items.current.length === 0));
	get dataTypeaheadEnabled() {
		return t(this.#r);
	}
	set dataTypeaheadEnabled(e) {
		S(this.#r, e);
	}
	constructor(e) {
		super(e), this.opts = e, te(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), Te(() => this.opts.open.current, () => {
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
		ge(() => {
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
}, wn = class extends Sn {
	opts;
	isMulti = !0;
	#e = a(() => this.opts.value.current.length > 0);
	get hasValue() {
		return t(this.#e);
	}
	set hasValue(e) {
		S(this.#e, e);
	}
	#t = a(() => new Set(this.opts.value.current));
	constructor(e) {
		super(e), this.opts = e, te(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), Te(() => this.opts.open.current, () => {
			this.opts.open.current && this.setInitialHighlightedNode();
		});
	}
	includesItem(e) {
		return t(this.#t).has(e);
	}
	toggleItem(e, t = e) {
		this.includesItem(e) ? this.opts.value.current = this.opts.value.current.filter((t) => t !== e) : this.opts.value.current = [...this.opts.value.current, e], this.opts.inputValue.current = t;
	}
	setInitialHighlightedNode() {
		ge(() => {
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
}, Tn = class {
	static create(e) {
		let { type: t, ...n } = e, r = t === "single" ? new Cn(n) : new wn(n);
		return bn.set(r);
	}
}, En = class e {
	static create(t) {
		return new e(t, bn.get());
	}
	root;
	opts;
	attachment;
	constructor(e, t) {
		this.root = t, this.opts = e, this.attachment = he(e.ref, (e) => this.root.valueNode = e), this.setValue = this.setValue.bind(this);
	}
	setValue(e) {
		(!this.root.isMulti || Array.isArray(e)) && (this.root.isMulti || typeof e == "string") && (this.root.opts.value.current = e);
	}
	#e = a(() => {
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
		return t(this.#e);
	}
	set snippetProps(e) {
		S(this.#e, e);
	}
	#t = a(() => ({
		id: this.opts.id.current,
		"data-placeholder": this.root.hasValue ? void 0 : "",
		"data-select-value": "",
		...this.attachment
	}));
	get props() {
		return t(this.#t);
	}
	set props(e) {
		S(this.#t, e);
	}
}, Dn = class e {
	static create(t) {
		return new e(t, bn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = he(e.ref, (e) => this.root.inputNode = e), this.root.domContext = new ke(e.ref), this.onkeydown = this.onkeydown.bind(this), this.oninput = this.oninput.bind(this), Te([() => this.root.opts.value.current, () => this.opts.clearOnDeselect.current], ([e, t], [n]) => {
			t && (Array.isArray(e) && Array.isArray(n) ? e.length === 0 && n.length !== 0 && (this.root.opts.inputValue.current = "") : e === "" && n !== "" && (this.root.opts.inputValue.current = ""));
		});
	}
	onkeydown(e) {
		if (this.root.isUsingKeyboard = !0, e.key !== "Escape") {
			if ((e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault(), !this.root.opts.open.current) {
				if (hn.includes(e.key) || e.key === "Tab" || e.key === "Backspace" && this.root.opts.inputValue.current === "" || (this.root.handleOpen(), this.root.hasValue)) return;
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
			if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), vn.includes(e.key)) {
				e.preventDefault();
				let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
				if (e.key === "ArrowDown" ? a = yt(t, r, i) : e.key === "ArrowUp" ? a = xt(t, r, i) : e.key === "PageDown" ? a = _t(t, r, 10, i) : e.key === "PageUp" ? a = bt(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
				this.root.setHighlightedNode(a);
				return;
			}
			hn.includes(e.key) || this.root.highlightedNode || this.root.setHighlightedToFirstCandidate();
		}
	}
	oninput(e) {
		this.root.opts.inputValue.current = e.currentTarget.value, ge(() => {
			this.root.opts.open.current && this.root.setHighlightedToFirstCandidate();
		});
	}
	#e = a(() => ({
		id: this.opts.id.current,
		role: "combobox",
		disabled: this.root.opts.disabled.current ? !0 : void 0,
		"aria-activedescendant": this.root.highlightedId,
		"aria-autocomplete": "list",
		"aria-expanded": xe(this.root.opts.open.current),
		"data-state": ve(this.root.opts.open.current),
		"data-disabled": ye(this.root.opts.disabled.current),
		onkeydown: this.onkeydown,
		oninput: this.oninput,
		[this.root.getBitsAttr("input")]: "",
		...this.attachment
	}));
	get props() {
		return t(this.#e);
	}
	set props(e) {
		S(this.#e, e);
	}
}, On = class e {
	static create(t) {
		return new e(t, bn.get());
	}
	opts;
	root;
	attachment;
	#e;
	#t;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = he(e.ref, (e) => this.root.triggerNode = e), this.root.domContext = new ke(e.ref), this.#e = new St({
			getCurrentItem: () => this.root.highlightedNode,
			onMatch: (e) => {
				this.root.setHighlightedNode(e);
			},
			getActiveElement: () => this.root.domContext.getActiveElement(),
			getWindow: () => this.root.domContext.getWindow()
		}), this.#t = new mn({
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
		if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), vn.includes(e.key)) {
			e.preventDefault();
			let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
			if (e.key === "ArrowDown" ? a = yt(t, r, i) : e.key === "ArrowUp" ? a = xt(t, r, i) : e.key === "PageDown" ? a = _t(t, r, 10, i) : e.key === "PageUp" ? a = bt(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
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
	#a = a(() => ({
		id: this.opts.id.current,
		disabled: this.root.opts.disabled.current ? !0 : void 0,
		"aria-haspopup": "listbox",
		"aria-expanded": xe(this.root.opts.open.current),
		"aria-activedescendant": this.root.highlightedId,
		"data-state": ve(this.root.opts.open.current),
		"data-disabled": ye(this.root.opts.disabled.current),
		"data-placeholder": this.root.hasValue ? void 0 : "",
		[this.root.getBitsAttr("trigger")]: "",
		onpointerdown: this.onpointerdown,
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		onpointerup: this.onpointerup,
		...this.attachment
	}));
	get props() {
		return t(this.#a);
	}
	set props(e) {
		S(this.#a, e);
	}
}, kn = class e {
	static create(t) {
		return xn.set(new e(t, bn.get()));
	}
	opts;
	root;
	attachment;
	#e = Y(!1);
	get isPositioned() {
		return t(this.#e);
	}
	set isPositioned(e) {
		S(this.#e, e, !0);
	}
	userHasScrolled = !1;
	domContext;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = he(e.ref, (e) => this.root.contentNode = e), this.domContext = new ke(this.opts.ref), this.root.domContext === null && (this.root.domContext = this.domContext), fe(() => {
			this.root.contentNode = null, this.root.contentIsPositioned = !1, this.isPositioned = !1;
		}), Te(() => this.root.opts.open.current, () => {
			this.root.opts.open.current || (this.root.contentIsPositioned = !1, this.isPositioned = !1, this.userHasScrolled = !1);
		}), Te([() => this.isPositioned, () => this.root.highlightedNode], () => {
			this.isPositioned && this.root.highlightedNode && this.root.scrollHighlightedNodeIntoView(this.root.highlightedNode);
		}), this.onpointermove = this.onpointermove.bind(this);
	}
	onpointermove(e) {
		this.root.isUsingKeyboard = !1;
	}
	#t = a(() => Tt(this.root.isCombobox ? "combobox" : "select"));
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
	#n = a(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return t(this.#n);
	}
	set snippetProps(e) {
		S(this.#n, e);
	}
	#r = a(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-multiselectable": this.root.isMulti ? "true" : void 0,
		"data-state": ve(this.root.opts.open.current),
		...Ce(this.root.contentPresence.transitionStatus),
		[this.root.getBitsAttr("content")]: "",
		style: {
			display: "flex",
			flexDirection: "column",
			outline: "none",
			boxSizing: "border-box",
			pointerEvents: "auto",
			...t(this.#t)
		},
		onpointermove: this.onpointermove,
		...this.attachment
	}));
	get props() {
		return t(this.#r);
	}
	set props(e) {
		S(this.#r, e);
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
}, An = class e {
	static create(t) {
		return new e(t, bn.get());
	}
	opts;
	root;
	attachment;
	#e = a(() => this.root.includesItem(this.opts.value.current));
	get isSelected() {
		return t(this.#e);
	}
	set isSelected(e) {
		S(this.#e, e);
	}
	#t = a(() => this.root.highlightedValue === this.opts.value.current);
	get isHighlighted() {
		return t(this.#t);
	}
	set isHighlighted(e) {
		S(this.#t, e);
	}
	#n = a(() => this.isHighlighted && !this.opts.disabled.current);
	prevHighlighted = new we(() => this.isHighlighted);
	#r = Y(!1);
	get mounted() {
		return t(this.#r);
	}
	set mounted(e) {
		S(this.#r, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = he(e.ref), Te([() => this.isHighlighted, () => this.prevHighlighted.current], () => {
			this.isHighlighted ? this.opts.onHighlight.current() : this.prevHighlighted.current && this.opts.onUnhighlight.current();
		}), Te(() => this.mounted, () => {
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
	#i = a(() => ({
		selected: this.isSelected,
		highlighted: this.isHighlighted
	}));
	get snippetProps() {
		return t(this.#i);
	}
	set snippetProps(e) {
		S(this.#i, e);
	}
	onpointerdown(e) {
		e.preventDefault();
	}
	onpointerup(e) {
		if (!e.defaultPrevented && this.opts.ref.current) {
			if (e.pointerType === "touch" && !st) {
				p(this.opts.ref.current, "click", () => {
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
	#a = a(() => ({
		id: this.opts.id.current,
		role: "option",
		"aria-selected": this.isSelected ? "true" : void 0,
		"data-value": this.opts.value.current,
		"data-disabled": ye(this.opts.disabled.current),
		"data-highlighted": ye(t(this.#n)),
		"data-selected": ye(this.isSelected),
		"data-label": this.opts.label.current,
		[this.root.getBitsAttr("item")]: "",
		onpointermove: this.onpointermove,
		onpointerdown: this.onpointerdown,
		onpointerup: this.onpointerup,
		...this.attachment
	}));
	get props() {
		return t(this.#a);
	}
	set props(e) {
		S(this.#a, e);
	}
}, jn = class e {
	static create(t) {
		return new e(t, bn.get());
	}
	opts;
	root;
	#e = a(() => this.root.opts.name.current !== "");
	get shouldRender() {
		return t(this.#e);
	}
	set shouldRender(e) {
		S(this.#e, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		e.preventDefault(), this.root.isCombobox ? this.root.inputNode?.focus() : this.root.triggerNode?.focus();
	}
	#t = a(() => ({
		disabled: pe(this.root.opts.disabled.current),
		required: pe(this.root.opts.required.current),
		name: this.root.opts.name.current,
		value: this.opts.value.current,
		onfocus: this.onfocus
	}));
	get props() {
		return t(this.#t);
	}
	set props(e) {
		S(this.#t, e);
	}
}, Mn = class e {
	static create(t) {
		return new e(t, xn.get());
	}
	opts;
	content;
	root;
	attachment;
	#e = Y(0);
	get prevScrollTop() {
		return t(this.#e);
	}
	set prevScrollTop(e) {
		S(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = he(e.ref, (e) => {
			this.root.viewportNode = e;
		});
	}
	#t = a(() => ({
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
		return t(this.#t);
	}
	set props(e) {
		S(this.#t, e);
	}
}, Nn = class {
	opts;
	content;
	root;
	attachment;
	autoScrollTimer = null;
	userScrollTimer = -1;
	isUserScrolling = !1;
	onAutoScroll = rt;
	#e = Y(!1);
	get mounted() {
		return t(this.#e);
	}
	set mounted(e) {
		S(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = he(e.ref), Te([() => this.mounted], () => {
			this.mounted || (this.isUserScrolling = !1);
		}), te(() => {
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
		this.content.userHasScrolled = !0;
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
	#t = a(() => ({
		id: this.opts.id.current,
		"aria-hidden": _e(!0),
		style: { flexShrink: 0 },
		onpointerdown: this.onpointerdown,
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		...this.attachment
	}));
	get props() {
		return t(this.#t);
	}
	set props(e) {
		S(this.#t, e);
	}
}, Pn = class e {
	static create(t) {
		return new e(new Nn(t, xn.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = Y(!1);
	get canScrollDown() {
		return t(this.#e);
	}
	set canScrollDown(e) {
		S(this.#e, e, !0);
	}
	scrollIntoViewTimer = null;
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, Te([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			let e = this.root.viewportNode;
			if (!e || !this.content.isPositioned) return;
			this.handleScroll(!0);
			let t = () => {
				this.content.userHasScrolled = !0;
			};
			return Oe(p(e, "scroll", () => this.handleScroll()), p(e, "wheel", t, { passive: !0 }), p(e, "touchmove", t, { passive: !0 }));
		}), Te([
			() => this.root.opts.inputValue.current,
			() => this.root.viewportNode,
			() => this.content.isPositioned
		], () => {
			this.root.viewportNode && this.content.isPositioned && this.handleScroll(!0);
		}), Te(() => this.scrollButtonState.mounted, () => {
			this.scrollButtonState.mounted && (this.scrollIntoViewTimer && clearTimeout(this.scrollIntoViewTimer), this.scrollIntoViewTimer = je(5, () => {
				if (this.content.userHasScrolled) return;
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
		e && t && (e.scrollTop += t.offsetHeight);
	};
	#t = a(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-down-button")]: ""
	}));
	get props() {
		return t(this.#t);
	}
	set props(e) {
		S(this.#t, e);
	}
}, Fn = class e {
	static create(t) {
		return new e(new Nn(t, xn.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = Y(!1);
	get canScrollUp() {
		return t(this.#e);
	}
	set canScrollUp(e) {
		S(this.#e, e, !0);
	}
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, Te([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (this.root.viewportNode && this.content.isPositioned) return this.handleScroll(!0), p(this.root.viewportNode, "scroll", () => this.handleScroll());
		});
	}
	handleScroll = (e = !1) => {
		if (e || this.scrollButtonState.handleUserScroll(), !this.root.viewportNode) return;
		let t = Number.parseInt(getComputedStyle(this.root.viewportNode).paddingTop, 10);
		this.canScrollUp = this.root.viewportNode.scrollTop - t > .1;
	};
	handleAutoScroll = () => {
		this.root.viewportNode && this.root.highlightedNode && (this.root.viewportNode.scrollTop = this.root.viewportNode.scrollTop - this.root.highlightedNode.offsetHeight);
	};
	#t = a(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-up-button")]: ""
	}));
	get props() {
		return t(this.#t);
	}
	set props(e) {
		S(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/select/components/select-hidden-input.svelte
function In(e, t) {
	_(t, !0);
	let n = C(t, "value", 15), r = jn.create({ value: $(() => n()) });
	var i = q(), a = D(i), o = (e) => {
		cn(e, ne(() => r.props, {
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
	v(a, (e) => {
		r.shouldRender && e(o);
	}), w(e, i), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/combobox/components/combobox.svelte
var Ln = h("<!> <!>", 1);
function Rn(e, n) {
	_(n, !0);
	let r = C(n, "value", 15), i = C(n, "onValueChange", 3, rt), o = C(n, "name", 3, ""), s = C(n, "disabled", 3, !1), c = C(n, "open", 15, !1), u = C(n, "onOpenChange", 3, rt), f = C(n, "onOpenChangeComplete", 3, rt), p = C(n, "loop", 3, !1), m = C(n, "scrollAlignment", 3, "nearest"), h = C(n, "required", 3, !1), g = C(n, "items", 19, () => []), y = C(n, "allowDeselect", 3, !0), b = C(n, "inputValue", 7, "");
	r() === void 0 && r(n.type === "single" ? "" : []), Te.pre(() => r(), () => {
		r() === void 0 && r(n.type === "single" ? "" : []);
	});
	let x = Tn.create({
		type: n.type,
		value: $(() => r(), (e) => {
			r(e), i()(e);
		}),
		disabled: $(() => s()),
		required: $(() => h()),
		open: $(() => c(), (e) => {
			c(e), u()(e);
		}),
		loop: $(() => p()),
		scrollAlignment: $(() => m()),
		name: $(() => o()),
		isCombobox: !0,
		items: $(() => g()),
		allowDeselect: $(() => y()),
		inputValue: $(() => b(), (e) => b(e)),
		onOpenChangeComplete: $(() => f())
	});
	var S = Ln(), T = D(S);
	Ct(T, {
		children: (e, t) => {
			var r = q(), i = D(r);
			U(i, () => n.children ?? M), w(e, r);
		},
		$$slots: { default: !0 }
	});
	var E = K(T, 2), O = (e) => {
		var t = q(), n = D(t), r = (e) => {
			var t = q(), n = D(t);
			d(n, 16, () => x.opts.value.current, (e) => e, (e, t) => {
				In(e, { get value() {
					return t;
				} });
			}), w(e, t);
		};
		v(n, (e) => {
			x.opts.value.current.length && e(r);
		}), w(e, t);
	}, k = a(() => Array.isArray(x.opts.value.current)), A = (e) => {
		In(e, {
			get value() {
				return x.opts.value.current;
			},
			set value(e) {
				x.opts.value.current = e;
			}
		});
	};
	v(E, (e) => {
		t(k) ? e(O) : e(A, -1);
	}), w(e, S), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/combobox/components/combobox-input.svelte
var zn = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"defaultValue",
	"clearOnDeselect"
]), Bn = h("<input/>");
function Vn(e, n) {
	_(n, !0);
	let r = C(n, "id", 19, Ae), i = C(n, "ref", 15, null), o = C(n, "clearOnDeselect", 3, !1), s = R(n, zn), c = Dn.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e)),
		clearOnDeselect: $(() => o())
	});
	n.defaultValue && (c.root.opts.inputValue.current = n.defaultValue);
	let u = a(() => Ee(s, c.props, { value: c.root.opts.inputValue.current }));
	var d = q(), f = D(d);
	m(f, () => Dt, (e, i) => {
		i(e, {
			get id() {
				return r();
			},
			get ref() {
				return c.opts.ref;
			},
			children: (e, r) => {
				var i = q(), a = D(i), o = (e) => {
					var r = q(), i = D(r);
					U(i, () => n.child, () => ({ props: t(u) })), w(e, r);
				}, s = (e) => {
					var n = Bn();
					B(n, () => ({ ...t(u) }), void 0, void 0, void 0, void 0, !0), w(e, n);
				};
				v(a, (e) => {
					n.child ? e(o) : e(s, -1);
				}), w(e, i);
			},
			$$slots: { default: !0 }
		});
	}), w(e, d), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/select/components/select-content.svelte
var Hn = /* @__PURE__ */ new Set([
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
]), Un = h("<div><div><!></div></div>");
function Wn(e, n) {
	let r = s();
	_(n, !0);
	let i = C(n, "id", 19, () => De(r)), o = C(n, "ref", 15, null), c = C(n, "forceMount", 3, !1), u = C(n, "side", 3, "bottom"), d = C(n, "onInteractOutside", 3, rt), f = C(n, "onEscapeKeydown", 3, rt), p = C(n, "preventScroll", 3, !1), m = R(n, Hn), h = kn.create({
		id: $(() => i()),
		ref: $(() => o(), (e) => o(e)),
		onInteractOutside: $(() => d()),
		onEscapeKeydown: $(() => f())
	}), g = a(() => Ee(m, h.props));
	var y = q(), b = D(y), x = (e) => {
		Et(e, ne(() => t(g), () => h.popperProps, {
			get ref() {
				return h.opts.ref;
			},
			get side() {
				return u();
			},
			get enabled() {
				return h.root.opts.open.current;
			},
			get id() {
				return i();
			},
			get preventScroll() {
				return p();
			},
			forceMount: !0,
			get shouldRender() {
				return h.shouldRender;
			},
			popper: (e, r) => {
				let i = () => (r?.()).props, o = () => (r?.()).wrapperProps, s = a(() => Ee(i(), { style: h.props.style }, { style: n.style }));
				var c = q(), l = D(c), u = (e) => {
					var r = q(), i = D(r);
					{
						let e = a(() => ({
							props: t(s),
							wrapperProps: o(),
							...h.snippetProps
						}));
						U(i, () => n.child, () => t(e));
					}
					w(e, r);
				}, d = (e) => {
					var r = Un();
					B(r, () => ({ ...o() }));
					var i = W(r);
					B(i, () => ({ ...t(s) }));
					var a = W(i);
					U(a, () => n.children ?? M), G(i), G(r), w(e, r);
				};
				v(l, (e) => {
					n.child ? e(u) : e(d, -1);
				}), w(e, c);
			},
			$$slots: { popper: !0 }
		}));
	}, S = (e) => {
		wt(e, ne(() => t(g), () => h.popperProps, {
			get ref() {
				return h.opts.ref;
			},
			get side() {
				return u();
			},
			get open() {
				return h.root.opts.open.current;
			},
			get id() {
				return i();
			},
			get preventScroll() {
				return p();
			},
			forceMount: !1,
			get shouldRender() {
				return h.shouldRender;
			},
			popper: (e, r) => {
				let i = () => (r?.()).props, o = () => (r?.()).wrapperProps, s = a(() => Ee(i(), { style: h.props.style }, { style: n.style }));
				var c = q(), l = D(c), u = (e) => {
					var r = q(), i = D(r);
					{
						let e = a(() => ({
							props: t(s),
							wrapperProps: o(),
							...h.snippetProps
						}));
						U(i, () => n.child, () => t(e));
					}
					w(e, r);
				}, d = (e) => {
					var r = Un();
					B(r, () => ({ ...o() }));
					var i = W(r);
					B(i, () => ({ ...t(s) }));
					var a = W(i);
					U(a, () => n.children ?? M), G(i), G(r), w(e, r);
				};
				v(l, (e) => {
					n.child ? e(u) : e(d, -1);
				}), w(e, c);
			},
			$$slots: { popper: !0 }
		}));
	};
	v(b, (e) => {
		c() ? e(x) : c() || e(S, 1);
	}), w(e, y), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/mounted.svelte
function Gn(e, t) {
	_(t, !0);
	let n = C(t, "mounted", 15, !1), r = C(t, "onMountedChange", 3, rt);
	Ge(() => (n(!0), r()(!0), () => {
		n(!1), r()(!1);
	})), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/select/components/select-item.svelte
var Kn = /* @__PURE__ */ new Set([
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
]), qn = h("<div><!></div>"), Jn = h("<!> <!>", 1);
function Yn(e, n) {
	let r = s();
	_(n, !0);
	let i = C(n, "id", 19, () => De(r)), o = C(n, "ref", 15, null), c = C(n, "label", 19, () => n.value), u = C(n, "disabled", 3, !1), d = C(n, "onHighlight", 3, rt), f = C(n, "onUnhighlight", 3, rt), p = R(n, Kn), m = An.create({
		id: $(() => i()),
		ref: $(() => o(), (e) => o(e)),
		value: $(() => n.value),
		disabled: $(() => u()),
		label: $(() => c()),
		onHighlight: $(() => d()),
		onUnhighlight: $(() => f())
	}), h = a(() => Ee(p, m.props));
	var g = Jn(), y = D(g), b = (e) => {
		var r = q(), i = D(r);
		{
			let e = a(() => ({
				props: t(h),
				...m.snippetProps
			}));
			U(i, () => n.child, () => t(e));
		}
		w(e, r);
	}, x = (e) => {
		var r = qn();
		B(r, () => ({ ...t(h) }));
		var i = W(r);
		U(i, () => n.children ?? M, () => m.snippetProps), G(r), w(e, r);
	};
	v(y, (e) => {
		n.child ? e(b) : e(x, -1);
	}), Gn(K(y, 2), {
		get mounted() {
			return m.mounted;
		},
		set mounted(e) {
			m.mounted = e;
		}
	}), w(e, g), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/select/components/select-viewport.svelte
var Xn = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), Zn = h("<div><!></div>"), Qn = {
	hash: "svelte-13mby48",
	code: "\n	/* Hide scrollbars cross browser and enable momentum scroll for touch devices */[data-select-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport]::-webkit-scrollbar {display:none !important;}[data-select-viewport]::-webkit-scrollbar {display:none !important;}"
};
function $n(e, n) {
	let r = s();
	_(n, !0), o(e, Qn);
	let i = C(n, "id", 19, () => De(r)), c = C(n, "ref", 15, null), u = R(n, Xn), d = Mn.create({
		id: $(() => i()),
		ref: $(() => c(), (e) => c(e))
	}), f = a(() => Ee(u, d.props));
	var p = q(), m = D(p), h = (e) => {
		var r = q(), i = D(r);
		U(i, () => n.child, () => ({ props: t(f) })), w(e, r);
	}, g = (e) => {
		var r = Zn();
		B(r, () => ({ ...t(f) }));
		var i = W(r);
		U(i, () => n.children ?? M), G(r), w(e, r);
	};
	v(m, (e) => {
		n.child ? e(h) : e(g, -1);
	}), w(e, p), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/select/components/select-scroll-down-button.svelte
var er = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), tr = h("<div><!></div>"), nr = h("<!> <!>", 1);
function rr(e, n) {
	let r = s();
	_(n, !0);
	let i = C(n, "id", 19, () => De(r)), o = C(n, "ref", 15, null), c = C(n, "delay", 3, () => 50), u = R(n, er), d = Pn.create({
		id: $(() => i()),
		ref: $(() => o(), (e) => o(e)),
		delay: $(() => c())
	}), f = a(() => Ee(u, d.props));
	var p = q(), m = D(p), h = (e) => {
		var r = nr(), i = D(r);
		Gn(i, {
			get mounted() {
				return d.scrollButtonState.mounted;
			},
			set mounted(e) {
				d.scrollButtonState.mounted = e;
			}
		});
		var a = K(i, 2), o = (e) => {
			var t = q(), r = D(t);
			U(r, () => n.child, () => ({ props: u })), w(e, t);
		}, s = (e) => {
			var r = tr();
			B(r, () => ({ ...t(f) }));
			var i = W(r);
			U(i, () => n.children ?? M), G(r), w(e, r);
		};
		v(a, (e) => {
			n.child ? e(o) : e(s, -1);
		}), w(e, r);
	};
	v(m, (e) => {
		d.canScrollDown && e(h);
	}), w(e, p), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/select/components/select-scroll-up-button.svelte
var ir = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), ar = h("<div><!></div>"), or = h("<!> <!>", 1);
function sr(e, n) {
	let r = s();
	_(n, !0);
	let i = C(n, "id", 19, () => De(r)), o = C(n, "ref", 15, null), c = C(n, "delay", 3, () => 50), u = R(n, ir), d = Fn.create({
		id: $(() => i()),
		ref: $(() => o(), (e) => o(e)),
		delay: $(() => c())
	}), f = a(() => Ee(u, d.props));
	var p = q(), m = D(p), h = (e) => {
		var r = or(), i = D(r);
		Gn(i, {
			get mounted() {
				return d.scrollButtonState.mounted;
			},
			set mounted(e) {
				d.scrollButtonState.mounted = e;
			}
		});
		var a = K(i, 2), o = (e) => {
			var t = q(), r = D(t);
			U(r, () => n.child, () => ({ props: u })), w(e, t);
		}, s = (e) => {
			var r = ar();
			B(r, () => ({ ...t(f) }));
			var i = W(r);
			U(i, () => n.children ?? M), G(r), w(e, r);
		};
		v(a, (e) => {
			n.child ? e(o) : e(s, -1);
		}), w(e, r);
	};
	v(m, (e) => {
		d.canScrollUp && e(h);
	}), w(e, p), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/label/label.svelte.js
var cr = be({
	component: "label",
	parts: ["root"]
}), lr = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = he(this.opts.ref), this.onmousedown = this.onmousedown.bind(this);
	}
	onmousedown(e) {
		e.detail > 1 && e.preventDefault();
	}
	#e = a(() => ({
		id: this.opts.id.current,
		[cr.root]: "",
		onmousedown: this.onmousedown,
		...this.attachment
	}));
	get props() {
		return t(this.#e);
	}
	set props(e) {
		S(this.#e, e);
	}
}, ur = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"for"
]), dr = h("<label><!></label>");
function fr(e, n) {
	let r = s();
	_(n, !0);
	let i = C(n, "id", 19, () => De(r)), o = C(n, "ref", 15, null), c = R(n, ur), u = lr.create({
		id: $(() => i()),
		ref: $(() => o(), (e) => o(e))
	}), d = a(() => Ee(c, u.props, { for: n.for }));
	var f = q(), p = D(f), m = (e) => {
		var r = q(), i = D(r);
		U(i, () => n.child, () => ({ props: t(d) })), w(e, r);
	}, h = (e) => {
		var r = dr();
		B(r, () => ({
			...t(d),
			for: n.for
		}));
		var i = W(r);
		U(i, () => n.children ?? M), G(r), w(e, r);
	};
	v(p, (e) => {
		n.child ? e(m) : e(h, -1);
	}), w(e, f), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/select/components/select.svelte
var pr = h("<!> <!>", 1);
function mr(e, n) {
	_(n, !0);
	let r = C(n, "value", 15), i = C(n, "onValueChange", 3, rt), o = C(n, "name", 3, ""), s = C(n, "disabled", 3, !1), c = C(n, "open", 15, !1), u = C(n, "onOpenChange", 3, rt), f = C(n, "onOpenChangeComplete", 3, rt), p = C(n, "loop", 3, !1), m = C(n, "scrollAlignment", 3, "nearest"), h = C(n, "required", 3, !1), g = C(n, "items", 19, () => []), y = C(n, "allowDeselect", 3, !1);
	function b() {
		r() === void 0 && r(n.type === "single" ? "" : []);
	}
	b(), Te.pre(() => r(), () => {
		b();
	});
	let x = Y(""), T = Tn.create({
		type: n.type,
		value: $(() => r(), (e) => {
			r(e), i()(e);
		}),
		disabled: $(() => s()),
		required: $(() => h()),
		open: $(() => c(), (e) => {
			c(e), u()(e);
		}),
		loop: $(() => p()),
		scrollAlignment: $(() => m()),
		name: $(() => o()),
		isCombobox: !1,
		items: $(() => g()),
		allowDeselect: $(() => y()),
		inputValue: $(() => t(x), (e) => S(x, e, !0)),
		onOpenChangeComplete: $(() => f())
	});
	var E = pr(), O = D(E);
	Ct(O, {
		children: (e, t) => {
			var r = q(), i = D(r);
			U(i, () => n.children ?? M), w(e, r);
		},
		$$slots: { default: !0 }
	});
	var k = K(O, 2), A = (e) => {
		var t = q(), r = D(t), i = (e) => {
			In(e, { get autocomplete() {
				return n.autocomplete;
			} });
		}, a = (e) => {
			var t = q(), r = D(t);
			d(r, 16, () => T.opts.value.current, (e) => e, (e, t) => {
				In(e, {
					get value() {
						return t;
					},
					get autocomplete() {
						return n.autocomplete;
					}
				});
			}), w(e, t);
		};
		v(r, (e) => {
			T.opts.value.current.length === 0 ? e(i) : e(a, -1);
		}), w(e, t);
	}, j = a(() => Array.isArray(T.opts.value.current)), N = (e) => {
		In(e, {
			get autocomplete() {
				return n.autocomplete;
			},
			get value() {
				return T.opts.value.current;
			},
			set value(e) {
				T.opts.value.current = e;
			}
		});
	};
	v(k, (e) => {
		t(j) ? e(A) : e(N, -1);
	}), w(e, E), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/select/components/select-value.svelte
var hr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"placeholder",
	"child",
	"children"
]), gr = h("<span><!></span>");
function _r(e, n) {
	let r = s();
	_(n, !0);
	let o = C(n, "ref", 15, null), c = C(n, "id", 19, () => De(r)), u = R(n, hr), d = En.create({
		id: $(() => c()),
		ref: $(() => o(), (e) => o(e)),
		placeholder: $(() => n.placeholder)
	}), f = a(() => Ee(u, d.props));
	var p = q(), m = D(p), h = (e) => {
		var r = q(), i = D(r);
		{
			let e = a(() => ({
				props: t(f),
				...d.snippetProps
			}));
			U(i, () => n.child, () => t(e));
		}
		w(e, r);
	}, g = (e) => {
		var r = gr();
		B(r, () => ({ ...t(f) }));
		var a = W(r), o = (e) => {
			var t = q(), r = D(t);
			U(r, () => n.children ?? M, () => d.snippetProps), w(e, t);
		}, s = (e) => {
			var t = i();
			L(() => j(t, d.snippetProps.selection.selected?.label ?? n.placeholder)), w(e, t);
		}, c = (e) => {
			var t = i();
			L((e) => j(t, e), [() => d.snippetProps.selection.selected.length > 0 ? d.snippetProps.selection.selected.map((e) => e.label).join(", ") : n.placeholder]), w(e, t);
		}, l = (e) => {
			var t = i();
			L(() => j(t, n.placeholder)), w(e, t);
		};
		v(a, (e) => {
			n.children ? e(o) : d.snippetProps.selection.type === "single" ? e(s, 1) : d.snippetProps.selection.type === "multiple" && d.snippetProps.selection.selected ? e(c, 2) : e(l, -1);
		}), G(r), w(e, r);
	};
	v(m, (e) => {
		n.child ? e(h) : e(g, -1);
	}), w(e, p), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/select/components/select-trigger.svelte
var vr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"type"
]), yr = h("<button><!></button>");
function br(e, n) {
	let r = s();
	_(n, !0);
	let i = C(n, "id", 19, () => De(r)), o = C(n, "ref", 15, null), c = C(n, "type", 3, "button"), u = R(n, vr), d = On.create({
		id: $(() => i()),
		ref: $(() => o(), (e) => o(e))
	}), f = a(() => Ee(u, d.props, { type: c() }));
	var p = q(), h = D(p);
	m(h, () => Dt, (e, r) => {
		r(e, {
			get id() {
				return i();
			},
			get ref() {
				return d.opts.ref;
			},
			children: (e, r) => {
				var i = q(), a = D(i), o = (e) => {
					var r = q(), i = D(r);
					U(i, () => n.child, () => ({ props: t(f) })), w(e, r);
				}, s = (e) => {
					var r = yr();
					B(r, () => ({ ...t(f) }));
					var i = W(r);
					U(i, () => n.children ?? M), G(r), w(e, r);
				};
				v(a, (e) => {
					n.child ? e(o) : e(s, -1);
				}), w(e, i);
			},
			$$slots: { default: !0 }
		});
	}), w(e, p), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/switch/switch.svelte.js
var xr = be({
	component: "switch",
	parts: ["root", "thumb"]
}), Sr = new de("Switch.Root"), Cr = class e {
	static create(t) {
		return Sr.set(new e(t));
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = he(e.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this);
	}
	#e() {
		this.opts.checked.current = !this.opts.checked.current;
	}
	onkeydown(e) {
		e.key !== "Enter" && e.key !== " " || this.opts.disabled.current || (e.preventDefault(), this.#e());
	}
	onclick(e) {
		this.opts.disabled.current || this.#e();
	}
	#t = a(() => ({
		"data-disabled": ye(this.opts.disabled.current),
		"data-state": me(this.opts.checked.current),
		"data-required": ye(this.opts.required.current)
	}));
	get sharedProps() {
		return t(this.#t);
	}
	set sharedProps(e) {
		S(this.#t, e);
	}
	#n = a(() => ({ checked: this.opts.checked.current }));
	get snippetProps() {
		return t(this.#n);
	}
	set snippetProps(e) {
		S(this.#n, e);
	}
	#r = a(() => ({
		...this.sharedProps,
		id: this.opts.id.current,
		role: "switch",
		disabled: pe(this.opts.disabled.current),
		"aria-checked": Se(this.opts.checked.current, !1),
		"aria-required": xe(this.opts.required.current),
		[xr.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return t(this.#r);
	}
	set props(e) {
		S(this.#r, e);
	}
}, wr = class e {
	static create() {
		return new e(Sr.get());
	}
	root;
	#e = a(() => this.root.opts.name.current !== void 0);
	get shouldRender() {
		return t(this.#e);
	}
	set shouldRender(e) {
		S(this.#e, e);
	}
	constructor(e) {
		this.root = e;
	}
	#t = a(() => ({
		type: "checkbox",
		name: this.root.opts.name.current,
		value: this.root.opts.value.current,
		checked: this.root.opts.checked.current,
		disabled: this.root.opts.disabled.current,
		required: this.root.opts.required.current
	}));
	get props() {
		return t(this.#t);
	}
	set props(e) {
		S(this.#t, e);
	}
}, Tr = class e {
	static create(t) {
		return new e(t, Sr.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = he(e.ref);
	}
	#e = a(() => ({ checked: this.root.opts.checked.current }));
	get snippetProps() {
		return t(this.#e);
	}
	set snippetProps(e) {
		S(this.#e, e);
	}
	#t = a(() => ({
		...this.root.sharedProps,
		id: this.opts.id.current,
		[xr.thumb]: "",
		...this.attachment
	}));
	get props() {
		return t(this.#t);
	}
	set props(e) {
		S(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/switch/components/switch-input.svelte
function Er(e, t) {
	_(t, !1);
	let r = wr.create();
	n();
	var i = q(), a = D(i), o = (e) => {
		cn(e, ne(() => r.props));
	};
	v(a, (e) => {
		r.shouldRender && e(o);
	}), w(e, i), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/switch/components/switch.svelte
var Dr = /* @__PURE__ */ new Set([
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
]), Or = h("<button><!></button>"), kr = h("<!> <!>", 1);
function Ar(e, n) {
	let r = s();
	_(n, !0);
	let i = C(n, "ref", 15, null), o = C(n, "id", 19, () => De(r)), c = C(n, "disabled", 3, !1), u = C(n, "required", 3, !1), d = C(n, "checked", 15, !1), f = C(n, "value", 3, "on"), p = C(n, "name", 3, void 0), m = C(n, "type", 3, "button"), h = C(n, "onCheckedChange", 3, rt), g = R(n, Dr), y = Cr.create({
		checked: $(() => d(), (e) => {
			d(e), h()?.(e);
		}),
		disabled: $(() => c() ?? !1),
		required: $(() => u()),
		value: $(() => f()),
		name: $(() => p()),
		id: $(() => o()),
		ref: $(() => i(), (e) => i(e))
	}), b = a(() => Ee(g, y.props, { type: m() }));
	var x = kr(), S = D(x), T = (e) => {
		var r = q(), i = D(r);
		{
			let e = a(() => ({
				props: t(b),
				...y.snippetProps
			}));
			U(i, () => n.child, () => t(e));
		}
		w(e, r);
	}, E = (e) => {
		var r = Or();
		B(r, () => ({ ...t(b) }));
		var i = W(r);
		U(i, () => n.children ?? M, () => y.snippetProps), G(r), w(e, r);
	};
	v(S, (e) => {
		n.child ? e(T) : e(E, -1);
	}), Er(K(S, 2), {}), w(e, x), l();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/switch/components/switch-thumb.svelte
var jr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"ref",
	"id"
]), Mr = h("<span><!></span>");
function Nr(e, n) {
	let r = s();
	_(n, !0);
	let i = C(n, "ref", 15, null), o = C(n, "id", 19, () => De(r)), c = R(n, jr), u = Tr.create({
		id: $(() => o()),
		ref: $(() => i(), (e) => i(e))
	}), d = a(() => Ee(c, u.props));
	var f = q(), p = D(f), m = (e) => {
		var r = q(), i = D(r);
		{
			let e = a(() => ({
				props: t(d),
				...u.snippetProps
			}));
			U(i, () => n.child, () => t(e));
		}
		w(e, r);
	}, h = (e) => {
		var r = Mr();
		B(r, () => ({ ...t(d) }));
		var i = W(r);
		U(i, () => n.children ?? M, () => u.snippetProps), G(r), w(e, r);
	};
	v(p, (e) => {
		n.child ? e(m) : e(h, -1);
	}), w(e, f), l();
}
//#endregion
//#region ../ui/src/lib/components/input/label.svelte
var Pr = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function Fr(e, n) {
	_(n, !0);
	let r = R(n, Pr);
	var i = q(), o = D(i);
	{
		let e = a(() => Z("text-sm font-medium text-muted-foreground", n.class));
		m(o, () => fr, (i, a) => {
			a(i, ne({ get children() {
				return n.children;
			} }, () => r, { get class() {
				return t(e);
			} }));
		});
	}
	w(e, i), l();
}
//#endregion
//#region ../ui/src/lib/components/input/input-checkbox.svelte
var Ir = h("<div><!> <!></div>"), Lr = h("<p> </p>"), Rr = h("<div><div class=\"flex items-center gap-2\"><!> <!></div> <!></div>");
function zr(e, n) {
	_(n, !0);
	let o = C(n, "checked", 15, !1), s = C(n, "id", 19, Ae), c = C(n, "inline", 3, !1), u = a(() => Z("peer inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary/15 data-[state=checked]:text-primary", n.error ? Z(Wt, "data-[state=unchecked]:bg-destructive/15") : "data-[state=unchecked]:border-border data-[state=unchecked]:bg-transparent data-[state=unchecked]:hover:border-dark-400", zt, "disabled:cursor-not-allowed disabled:opacity-50"));
	var d = q(), f = D(d), p = (e) => {
		var c = Ir(), l = W(c);
		{
			let e = (e, t) => {
				let n = () => (t?.()).checked;
				var r = q(), i = D(r), a = (e) => {
					Q(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				v(i, (e) => {
					n() && e(a);
				}), w(e, r);
			}, r = a(() => n.label ? `${s()}-label` : void 0), i = a(() => n.error ? !0 : void 0);
			m(l, () => pn, (a, c) => {
				c(a, {
					get id() {
						return s();
					},
					get "aria-label"() {
						return n["aria-label"];
					},
					get "aria-labelledby"() {
						return t(r);
					},
					get "aria-invalid"() {
						return t(i);
					},
					get class() {
						return t(u);
					},
					get checked() {
						return o();
					},
					set checked(e) {
						o(e);
					},
					children: e,
					$$slots: { default: !0 }
				});
			});
		}
		var d = K(l, 2), f = (e) => {
			Fr(e, {
				get id() {
					return `${s() ?? ""}-label`;
				},
				get for() {
					return s();
				},
				class: "cursor-pointer whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, t) => {
					k();
					var r = i();
					L(() => j(r, n.label)), w(e, r);
				},
				$$slots: { default: !0 }
			});
		};
		v(d, (e) => {
			n.label && e(f);
		}), G(c), L((e) => J(c, 1, e), [() => r(Z("flex items-center gap-2", n.class))]), w(e, c);
	}, h = (e) => {
		var c = Rr(), l = W(c), d = W(l);
		{
			let e = (e, t) => {
				let n = () => (t?.()).checked;
				var r = q(), i = D(r), a = (e) => {
					Q(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				v(i, (e) => {
					n() && e(a);
				}), w(e, r);
			}, r = a(() => n.label ? `${s()}-label` : void 0), i = a(() => n.error ? !0 : void 0);
			m(d, () => pn, (a, c) => {
				c(a, {
					get id() {
						return s();
					},
					get "aria-label"() {
						return n["aria-label"];
					},
					get "aria-labelledby"() {
						return t(r);
					},
					get "aria-invalid"() {
						return t(i);
					},
					get class() {
						return t(u);
					},
					get checked() {
						return o();
					},
					set checked(e) {
						o(e);
					},
					children: e,
					$$slots: { default: !0 }
				});
			});
		}
		var f = K(d, 2), p = (e) => {
			Fr(e, {
				get id() {
					return `${s() ?? ""}-label`;
				},
				get for() {
					return s();
				},
				class: "cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, t) => {
					k();
					var r = i();
					L(() => j(r, n.label)), w(e, r);
				},
				$$slots: { default: !0 }
			});
		};
		v(f, (e) => {
			n.label && e(p);
		}), G(l);
		var h = K(l, 2), g = (e) => {
			var t = Lr(), i = I(t, !0);
			L(() => {
				J(t, 1, r(Lt)), j(i, n.error);
			}), w(e, t);
		};
		v(h, (e) => {
			n.error && e(g);
		}), G(c), L((e) => J(c, 1, e), [() => r(Z("grid gap-2", n.class))]), w(e, c);
	};
	v(f, (e) => {
		c() ? e(p) : e(h, -1);
	}), w(e, d), l();
}
//#endregion
//#region ../ui/src/lib/monaco/configure-types.ts
var Br = {
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
}, Vr = "";
async function Hr(e = [], t = {}) {
	if (e.length === 0) return;
	let n = e.map((e) => `${e.filePath ?? ""}\0${e.content}`).join("\0");
	if (!t.force && n === Vr) return;
	Vr = n;
	let r = (await import("./vs-DCE46X4y.js").then((e) => e.t)).languages.typescript, i = e.map((e) => ({
		content: e.content,
		filePath: e.filePath ?? "file:///project/node_modules/@stream-kit/script-api/index.d.ts"
	}));
	for (let e of [r.typescriptDefaults, r.javascriptDefaults]) e.setCompilerOptions({ ...Br }), e.setDiagnosticsOptions({
		noSemanticValidation: !1,
		noSyntaxValidation: !1,
		noSuggestionDiagnostics: !1
	}), e.setExtraLibs(i);
}
//#endregion
//#region ../ui/src/lib/monaco/theme.ts
var Ur = {
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
}, Wr = {
	base: "vs",
	inherit: !0,
	rules: [
		{
			token: "comment",
			foreground: "6b7280",
			fontStyle: "italic"
		},
		{
			token: "keyword",
			foreground: "7c3aed"
		},
		{
			token: "string",
			foreground: "15803d"
		},
		{
			token: "number",
			foreground: "b45309"
		},
		{
			token: "type",
			foreground: "0e7490"
		},
		{
			token: "identifier",
			foreground: "1f2937"
		}
	],
	colors: {
		"editor.background": "#ffffff",
		"editor.foreground": "#1f2937",
		"editorLineNumber.foreground": "#9ca3af",
		"editorLineNumber.activeForeground": "#4b5563",
		"editor.selectionBackground": "#ddd6fe",
		"editor.inactiveSelectionBackground": "#ede9fe",
		"editorCursor.foreground": "#6d28d9",
		"editor.lineHighlightBackground": "#f3f4f680",
		"editorIndentGuide.background": "#e5e7eb",
		"editorIndentGuide.activeBackground": "#d1d5db",
		"editorWidget.background": "#ffffff",
		"editorWidget.foreground": "#1f2937",
		"editorWidget.border": "#d1d5db",
		"editorHoverWidget.background": "#ffffff",
		"editorHoverWidget.foreground": "#1f2937",
		"editorHoverWidget.border": "#d1d5db",
		"editorSuggestWidget.background": "#ffffff",
		"editorSuggestWidget.foreground": "#1f2937",
		"editorSuggestWidget.border": "#d1d5db",
		"editorSuggestWidget.selectedBackground": "#eef2ff",
		"editorSuggestWidget.selectedForeground": "#111827",
		"editorSuggestWidget.highlightForeground": "#7c3aed",
		"editorSuggestWidget.focusHighlightForeground": "#7c3aed",
		"menu.background": "#ffffff",
		"menu.foreground": "#1f2937",
		"menu.border": "#d1d5db",
		"menu.selectionBackground": "#eef2ff",
		"menu.selectionForeground": "#111827",
		"menu.separatorBackground": "#e5e7eb",
		"editorActionList.background": "#ffffff",
		"editorActionList.foreground": "#1f2937",
		"editorActionList.focusBackground": "#eef2ff",
		"editorActionList.focusForeground": "#111827",
		"input.background": "#f3f4f6",
		"input.foreground": "#1f2937",
		"input.border": "#d1d5db",
		"quickInput.background": "#ffffff",
		"quickInput.foreground": "#1f2937"
	}
}, Gr = {
	dark: "stream-kit-dark",
	light: "stream-kit-light"
};
function Kr(e) {
	e.editor.defineTheme(Gr.dark, Ur), e.editor.defineTheme(Gr.light, Wr);
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.57.0/node_modules/monaco-editor/esm/vs/editor/editor.worker.js?worker
function qr(e) {
	return new Worker("/plugin-host/assets/editor.worker-DQxuqn-e.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.57.0/node_modules/monaco-editor/esm/vs/language/css/css.worker.js?worker
function Jr(e) {
	return new Worker("/plugin-host/assets/css.worker-D14qdcKo.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.57.0/node_modules/monaco-editor/esm/vs/language/html/html.worker.js?worker
function Yr(e) {
	return new Worker("/plugin-host/assets/html.worker-GqAhY79H.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.57.0/node_modules/monaco-editor/esm/vs/language/json/json.worker.js?worker
function Xr(e) {
	return new Worker("/plugin-host/assets/json.worker-CVYG3KTM.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.57.0/node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js?worker
function Zr(e) {
	return new Worker("/plugin-host/assets/ts.worker-DzoWDvv5.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../ui/src/lib/monaco/setup.ts
var Qr = !1;
function $r() {
	Qr || typeof globalThis > "u" || (Qr = !0, globalThis.MonacoEnvironment = { getWorker(e, t) {
		switch (t) {
			case "json": return new Xr();
			case "css":
			case "scss":
			case "less": return new Jr();
			case "html":
			case "handlebars":
			case "razor": return new Yr();
			case "typescript":
			case "javascript": return new Zr();
			default: return new qr();
		}
	} });
}
//#endregion
//#region ../ui/src/lib/monaco/warmup-typescript.ts
function ei(e) {
	return e.languages.typescript.getTypeScriptWorker;
}
async function ti(e, t = 40) {
	let n = ei(e);
	for (let e = 0; e < t; e++) try {
		await n();
		return;
	} catch {
		await new Promise((e) => requestAnimationFrame(() => e()));
	}
	throw Error("TypeScript not registered after wait");
}
async function ni(e, t) {
	try {
		await ti(e), await (await (await ei(e)())(t.uri)).getSemanticDiagnostics(t.uri.toString());
	} catch (e) {
		console.warn("[monaco] TypeScript warmup failed:", e);
	}
}
//#endregion
//#region ../ui/src/lib/monaco/script-reference.ts
var ri = "file:///project";
`${ri}`;
function ii(e) {
	let t = `${ri}/`;
	if (!e.startsWith(t)) return "";
	let n = e.slice(t.length).split("/").length - 1;
	return `/// <reference path="${"../".repeat(n)}node_modules/@stream-kit/script-api/index.d.ts" />\n`;
}
function ai(e, t) {
	let n = ii(t);
	return !n || e.includes("/// <reference path=") ? e : `${n}${e}`;
}
//#endregion
//#region ../ui/src/lib/monaco/variable-completion.ts
var oi = ["json"], si = /* @__PURE__ */ new WeakMap(), ci = !1;
function li(e, t, n) {
	return ui(e), si.set(t, n), () => {
		si.get(t) === n && si.delete(t);
	};
}
function ui(e) {
	if (!ci) {
		ci = !0;
		for (let t of oi) e.languages.registerCompletionItemProvider(t, {
			triggerCharacters: ["{"],
			provideCompletionItems(t, n) {
				let r = si.get(t);
				if (!r) return { suggestions: [] };
				let i = t.getLineContent(n.lineNumber), a = Jt(i, n.column - 1);
				if (!a) return { suggestions: [] };
				let o = /^[a-zA-Z0-9_]*\}?/.exec(i.slice(a.end))?.[0] ?? "", s = new e.Range(n.lineNumber, a.start + 2, n.lineNumber, n.column + o.length);
				return { suggestions: Xt(r(), a.query).map((t, n) => ({
					label: {
						label: `{${t.key}}`,
						description: t.label
					},
					kind: e.languages.CompletionItemKind.Variable,
					detail: t.maybe ? `${t.group ?? ""} (maybe)`.trim() : t.group,
					documentation: t.description,
					insertText: `${t.key}}`,
					filterText: t.key,
					sortText: String(n).padStart(4, "0"),
					range: s
				})) };
			}
		});
	}
}
//#endregion
//#region ../ui/src/lib/color-scheme.ts
function di() {
	return typeof document > "u" ? "dark" : document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
function fi(e) {
	if (typeof document > "u") return () => {};
	let t = di(), n = new MutationObserver(() => {
		let n = di();
		n !== t && (t = n, e(n));
	});
	return n.observe(document.documentElement, {
		attributes: !0,
		attributeFilter: ["data-theme"]
	}), () => n.disconnect();
}
//#endregion
//#region ../ui/src/lib/components/variable-popover/variable-popover.svelte
var pi = h("<p class=\"text-xs font-semibold text-dark-200\"> </p>"), mi = h("<p class=\"py-2 text-xs text-dark-400\"> </p>"), hi = h("<li><button type=\"button\"><div class=\"flex min-w-0 flex-1 items-center gap-2.5\"><span class=\"shrink-0 rounded border border-primary-300 bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary transition-all duration-150 group-hover:border-primary-500/20 group-hover:bg-primary-500/15\"> </span> <span class=\"min-w-0 truncate text-dark-300 transition-colors duration-150 group-hover:text-dark-100\"> </span></div> <div class=\"flex size-4 shrink-0 items-center justify-center\"><!></div></button></li>"), gi = h("<ul class=\"grid gap-1\"></ul>"), _i = h("<div class=\"mb-3 flex flex-col gap-2\"><!></div> <!>", 1), vi = h("<!> <!>", 1);
function yi(e, n) {
	_(n, !0);
	let i = C(n, "title", 3, "Variables"), o = C(n, "emptyLabel", 3, "No variables available."), s = C(n, "ariaLabel", 3, "Show variables"), c = C(n, "copiedLabel", 3, "Copied"), u = C(n, "insertedLabel", 3, "Inserted");
	C(n, "noResultsLabel", 3, "No variables match your search.");
	let f = C(n, "icon", 3, "ri:braces-line"), p = Y(null);
	function m(e) {
		if (n.onInsert) {
			n.onInsert(e);
			return;
		}
		navigator.clipboard.writeText(`{${e}}`).then(() => {
			S(p, e, !0), setTimeout(() => {
				t(p) === e && S(p, null);
			}, 2e3);
		});
	}
	kt(e, {
		children: (e, l) => {
			var h = vi(), g = D(h);
			At(g, {
				child: (e, t) => {
					Nt(e, ne(() => (t?.()).props, {
						type: "button",
						variant: "ghost",
						size: "icon-sm",
						get icon() {
							return f();
						},
						get "aria-label"() {
							return s();
						},
						class: "size-7 text-dark-400 hover:text-dark-100"
					}));
				},
				$$slots: { child: !0 }
			});
			var _ = K(g, 2);
			Ot(_, {
				align: "start",
				class: "w-80 p-4",
				children: (e, s) => {
					var l = _i(), f = D(l), h = W(f), g = (e) => {
						var t = pi(), n = I(t, !0);
						L(() => j(n, i())), w(e, t);
					};
					v(h, (e) => {
						i() && e(g);
					}), G(f);
					var _ = K(f, 2), y = (e) => {
						var t = mi(), n = I(t, !0);
						L(() => j(n, o())), w(e, t);
					}, b = (e) => {
						jt(e, {
							orientation: "vertical",
							viewportClasses: "max-h-48 overflow-hidden",
							children: (e, i) => {
								var o = gi();
								d(o, 21, () => n.variables, (e) => e.key, (e, i) => {
									var o = hi(), s = W(o), l = W(s), d = W(l), f = I(d, !0), h = K(d, 2), g = I(h, !0);
									G(l);
									var _ = K(l, 2), y = W(_), b = (e) => {
										Q(e, {
											get icon() {
												return It;
											},
											class: "size-3.5 text-success-400"
										});
									}, x = (e) => {
										{
											let r = a(() => n.onInsert ? "ri:corner-down-left-line" : Ft);
											Q(e, {
												get icon() {
													return t(r);
												},
												class: "size-3.5 text-dark-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
											});
										}
									};
									v(y, (e) => {
										t(p) === t(i).key ? e(b) : e(x, -1);
									}), G(_), G(s), G(o), L((e) => {
										J(s, 1, e), O(s, "title", n.onInsert ? u() : c()), j(f, `{${t(i).key}}`), j(g, t(i).label);
									}, [() => r(Z("group flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-left text-xs transition-colors duration-150 hover:bg-dark-700 hover:text-dark-50"))]), F("click", s, () => m(t(i).key)), w(e, o);
								}), G(o), w(e, o);
							},
							$$slots: { default: !0 }
						});
					};
					v(_, (e) => {
						n.variables.length === 0 ? e(y) : e(b, -1);
					}), w(e, l);
				},
				$$slots: { default: !0 }
			}), w(e, h);
		},
		$$slots: { default: !0 }
	}), l();
}
e(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-code.svelte
var bi = h("<span></span>"), xi = h("<div class=\"flex items-center justify-between gap-2\"><!> <div class=\"flex items-center gap-1\"><!> <!> <!></div></div>"), Si = h("<div class=\"flex justify-end\"><!></div>"), Ci = h("<div class=\"absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-dark-900/85\" role=\"status\" aria-live=\"polite\"><!> <p class=\"text-xs text-dark-300\"> </p></div>"), wi = h("<p> </p>"), Ti = h("<div><!> <!> <div role=\"textbox\" aria-multiline=\"true\"><!></div> <!></div>");
function Ei(e, n) {
	_(n, !0);
	let o = C(n, "id", 19, Ae), s = C(n, "value", 3, ""), u = C(n, "language", 3, "typescript"), d = C(n, "minHeight", 3, "12rem"), p = C(n, "fillHeight", 3, !1), m = C(n, "formatOnBlur", 3, !0), h = C(n, "showFormatButton", 3, !0), g = C(n, "formatLabel", 3, "Format"), y = C(n, "showExpandButton", 3, !0), b = C(n, "expandLabel", 3, "Expand"), x = C(n, "collapseLabel", 3, "Close"), T = C(n, "extraLibs", 19, () => []), D = C(n, "loadingLabel", 3, "Loading..."), A = C(n, "variables", 19, () => []), M = C(n, "variablesTitle", 3, "Variables"), ee = C(n, "variablesAriaLabel", 3, "Insert variable"), P = Y(!1), F = a(() => p() || t(P)), R = Y(void 0), B = Y(void 0), V = Y(void 0), H = Y(!1), ne = !1, re = !1, q = !1, ie = Y(""), X = !1, ae, oe, se;
	function ce() {
		let e = document.createElement("div");
		return e.className = "monaco-editor stream-kit-monaco-overflow-host", document.body.appendChild(e), e;
	}
	function le() {
		se?.remove(), se = void 0;
	}
	function ue(e) {
		return e.map((e) => `${e.filePath ?? ""}\0${e.content}`).join("\0");
	}
	function de(e) {
		return n.modelUri ? ai(e, n.modelUri) : e;
	}
	function $(e) {
		return e.replace(/^\/\/\/\s*<reference\s+path=(["'])[^"']+\1\s*\/>\s*\r?\n?/gm, "");
	}
	function fe(e) {
		n.oninput && n.oninput({ currentTarget: { value: $(e) } });
	}
	function pe(e) {
		let n = `{${e}}`;
		if (!t(B) || !t(V)) {
			fe(`${s()}${n}`);
			return;
		}
		let r = t(B).getSelection();
		if (!r) {
			fe(`${s()}${n}`);
			return;
		}
		t(B).executeEdits("insert-variable", [{
			range: r,
			text: n,
			forceMoveMarkers: !0
		}]), t(B).focus();
	}
	async function me(e, t = !1) {
		e.length !== 0 && (await Hr(e, { force: t }), S(ie, ue(e), !0));
	}
	function he(e, t) {
		if (!n.modelUri) return;
		let r = e.Uri.parse(n.modelUri), i = u() === "json" ? "json" : "typescript", a = de(t), o = e.editor.getModel(r);
		return o ? (o.getValue() !== a && o.setValue(a), X = !1, o) : (X = !0, e.editor.createModel(a, i, r));
	}
	async function ge(e, n) {
		if (!(!t(R) || re || t(H))) {
			re = !0;
			try {
				$r();
				let r = await import("./vs-DCE46X4y.js").then((e) => e.t);
				if (ne || !t(R)) return;
				S(V, r, !0), Kr(t(V)), oe?.(), oe = fi((e) => {
					t(V)?.editor.setTheme(Gr[e]);
				});
				let i = u() === "json" ? "json" : "typescript", a = he(r, n), o = e.length > 0;
				o && (se = ce()), S(B, t(V).editor.create(t(R), {
					model: a,
					value: a ? void 0 : n,
					language: a ? void 0 : i,
					theme: Gr[di()],
					automaticLayout: !0,
					...o && se ? {
						fixedOverflowWidgets: !0,
						allowOverflow: !0,
						overflowWidgetsDomNode: se
					} : {},
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
					hover: { enabled: "on" },
					parameterHints: { enabled: !0 },
					suggestOnTriggerCharacters: !0,
					quickSuggestions: {
						other: !0,
						comments: !1,
						strings: !1
					},
					quickSuggestionsDelay: 10,
					suggest: {
						showWords: u() === "json",
						preview: !0,
						showMethods: !0,
						showFunctions: !0,
						showConstructors: !0,
						showFields: !0,
						showVariables: !0,
						showClasses: !0,
						showStructs: !0,
						showInterfaces: !0,
						showModules: !0,
						showProperties: !0,
						showEvents: !0,
						showOperators: !0,
						showUnits: !0,
						showValues: !0,
						showConstants: !0,
						showEnums: !0,
						showEnumMembers: !0,
						showKeywords: !0,
						showSnippets: !0
					},
					scrollbar: {
						verticalScrollbarSize: 8,
						horizontalScrollbarSize: 8
					}
				}), !0), e.length > 0 && await me(e);
				let s = t(B).getModel();
				s && (ae = li(r, s, () => A())), t(B).onDidChangeModelContent(() => {
					!q && t(B) && fe(t(B).getValue());
				}), m() && t(B).onDidBlurEditorText(() => {
					ve();
				}), a && await ni(r, a), S(H, !0);
			} finally {
				re = !1;
			}
		}
	}
	function _e(e) {
		if (!t(B)) return;
		let n = t(B).getModel();
		n && n.getValue() !== e && (t(B).pushUndoStop(), t(B).executeEdits("format", [{
			range: n.getFullModelRange(),
			text: e,
			forceMoveMarkers: !0
		}]), t(B).pushUndoStop());
	}
	async function ve() {
		if (!t(B)) return;
		let e = t(B).getValue();
		if ($(e).trim() !== "") {
			if (u() === "json") {
				try {
					_e(JSON.stringify(JSON.parse(e), null, 2));
				} catch {}
				return;
			}
			try {
				await t(B).getAction("editor.action.formatDocument")?.run();
			} catch {}
		}
	}
	te(() => {
		let e = t(R), r = T(), i = s() ?? "", a = n.modelUri;
		!e || t(H) || ne || a && r.length === 0 || ge(r, i);
	}), te(() => {
		if (!t(B) || !t(H)) return;
		let e = de(s() ?? "");
		if (t(B).getValue() === e) return;
		q = !0;
		let n = t(B).getSelections();
		t(B).pushUndoStop(), t(B).executeEdits("external-sync", [{
			range: t(B).getModel()?.getFullModelRange() ?? {
				startLineNumber: 1,
				startColumn: 1,
				endLineNumber: 1,
				endColumn: 1
			},
			text: e
		}], n ?? void 0), t(B).pushUndoStop(), q = !1;
	});
	function ye() {
		if (!t(B) || !t(R)) return;
		t(R).style.removeProperty("width"), t(F) && t(R).style.removeProperty("height");
		let e = t(R).clientWidth, n = t(R).clientHeight;
		e > 0 && n > 0 ? t(B).layout({
			width: e,
			height: n
		}) : t(B).layout();
	}
	te(() => {
		if (t(P), t(F), !t(B)) return;
		let e = 0, n = requestAnimationFrame(() => {
			e = requestAnimationFrame(() => ye());
		});
		return () => {
			cancelAnimationFrame(n), cancelAnimationFrame(e);
		};
	}), te(() => {
		t(H) && t(B) && t(V) && T().length !== 0 && ue(T()) !== t(ie) && me(T()).then(() => {
			let e = t(B)?.getModel();
			t(V) && e && ni(t(V), e);
		});
	}), N(() => {
		ne = !0;
		let e = t(B)?.getModel();
		ae?.(), oe?.(), t(B)?.dispose(), S(B, void 0), S(V, void 0), le(), X && e && !e.isDisposed() && e.dispose();
	});
	var be = Ti();
	f("keydown", z, (e) => {
		t(P) && e.key === "Escape" && S(P, !1);
	});
	var xe = W(be), Se = (e) => {
		var r = xi(), s = W(r), c = (e) => {
			Fr(e, {
				get for() {
					return o();
				},
				children: (e, t) => {
					k();
					var r = i();
					L(() => j(r, n.label)), w(e, r);
				},
				$$slots: { default: !0 }
			});
		}, l = (e) => {
			var t = bi();
			w(e, t);
		};
		v(s, (e) => {
			n.label ? e(c) : e(l, -1);
		});
		var u = K(s, 2), d = W(u), f = (e) => {
			Nt(e, {
				type: "button",
				variant: "ghost",
				size: "xs",
				icon: "ri:magic-line",
				onclick: () => void ve(),
				class: "text-dark-400 hover:text-dark-100",
				children: (e, t) => {
					k();
					var n = i();
					L(() => j(n, g())), w(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		v(d, (e) => {
			h() && e(f);
		});
		var p = K(d, 2), m = (e) => {
			{
				let n = a(() => t(P) ? "ri:fullscreen-exit-line" : "ri:fullscreen-line"), r = a(() => t(P) ? x() : b());
				Nt(e, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					get icon() {
						return t(n);
					},
					get "aria-label"() {
						return t(r);
					},
					onclick: () => S(P, !t(P)),
					class: "size-7 text-dark-400 hover:text-dark-100"
				});
			}
		};
		v(p, (e) => {
			y() && e(m);
		});
		var _ = K(p, 2), C = (e) => {
			yi(e, {
				get variables() {
					return A();
				},
				get title() {
					return M();
				},
				get ariaLabel() {
					return ee();
				},
				onInsert: pe
			});
		};
		v(_, (e) => {
			A().length > 0 && e(C);
		}), G(u), G(r), w(e, r);
	};
	v(xe, (e) => {
		(n.label || A().length > 0 || h() || y()) && e(Se);
	});
	var Ce = K(xe, 2), we = (e) => {
		var t = Si(), r = W(t);
		U(r, () => n.toolbar), G(t), w(e, t);
	};
	v(Ce, (e) => {
		n.toolbar && e(we);
	});
	var Te = K(Ce, 2);
	let Ee;
	var De = W(Te), Oe = (e) => {
		var t = Ci(), n = W(t);
		Q(n, {
			icon: "ri:loader-4-line",
			class: "size-5 animate-spin text-primary",
			"aria-hidden": "true"
		});
		var r = K(n, 2), i = I(r, !0);
		G(t), L(() => {
			O(t, "aria-label", D()), j(i, D());
		}), w(e, t);
	};
	v(De, (e) => {
		t(H) || e(Oe);
	}), G(Te), c(Te, (e) => S(R, e), () => t(R));
	var ke = K(Te, 2), je = (e) => {
		var t = wi(), i = I(t, !0);
		L(() => {
			J(t, 1, r(Lt)), j(i, n.error);
		}), w(e, t);
	};
	v(ke, (e) => {
		n.error && e(je);
	}), G(be), L((e, r) => {
		J(be, 1, e), O(Te, "id", o()), O(Te, "aria-busy", !t(H)), O(Te, "aria-invalid", n.error ? !0 : void 0), O(Te, "aria-placeholder", n.placeholder), J(Te, 1, r), Ee = E(Te, "", Ee, { height: t(F) ? void 0 : d() });
	}, [() => r(Z("relative w-full min-w-0", t(P) ? "fixed inset-0 z-60 flex flex-col gap-3 bg-dark-900 p-4" : p() ? "flex h-full min-h-0 flex-1 flex-col" : "grid gap-2")), () => r(Z("relative z-52 w-full min-w-0 max-w-full overflow-visible rounded-lg border bg-dark-900 focus-within:ring-2", t(F) ? "flex min-h-0 flex-1 flex-col" : "", n.error ? "border-destructive focus-within:ring-destructive" : "border-border focus-within:ring-ring", n.class))]), w(e, be), l();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_3486aff4ade57588cd7c77269f121e2c/node_modules/svelte-awesome-color-picker/dist/utils/texts.js
var Di = {
	label: {
		h: "hue channel",
		s: "saturation channel",
		v: "brightness channel",
		r: "red channel",
		g: "green channel",
		b: "blue channel",
		a: "alpha channel",
		hex: "hex color",
		withoutColor: "without color"
	},
	color: {
		rgb: "rgb",
		hsv: "hsv",
		hex: "hex"
	},
	changeTo: "change to ",
	swatch: {
		ariaTitle: "saved colors",
		ariaLabel: (e) => `select color: ${e}`
	}
}, Oi = "a[href], area[href], input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
function ki(e) {
	return function(t) {
		if (t.target === window) return;
		let n = t.target;
		if (!e.contains(n)) return;
		let r = e.querySelectorAll(Oi), i = r[0], a = r[r.length - 1];
		function o(e) {
			return e.code === "Tab" && !e.shiftKey;
		}
		function s(e) {
			return e.code === "Tab" && e.shiftKey;
		}
		o(t) && t.target === a ? (t.preventDefault(), i.focus()) : s(t) && t.target === i && (t.preventDefault(), a.focus());
	};
}
//#endregion
//#region ../../node_modules/.pnpm/colord@2.10.0/node_modules/colord/index.mjs
for (var Ai = (e) => {
	let t = e.querySelector(Oi);
	t && t.focus();
	let n = ki(e);
	return document.addEventListener("keydown", n), { destroy() {
		document.removeEventListener("keydown", n);
	} };
}, ji = {
	grad: .9,
	turn: 360,
	rad: 360 / (2 * Math.PI)
}, Mi = function(e) {
	return typeof e == "string" ? e.length > 0 : typeof e == "number";
}, Ni = function(e, t, n) {
	return t === void 0 && (t = 0), n === void 0 && (n = 10 ** t), Math.round(n * e) / n + 0;
}, Pi = function(e, t, n) {
	return t === void 0 && (t = 0), n === void 0 && (n = 1), e > n ? n : e > t ? e : t;
}, Fi = function(e) {
	return (e = isFinite(e) ? e % 360 : 0) < 0 ? e + 360 : e;
}, Ii = function(e, t) {
	return t === void 0 && (t = 0), Ni(e, t) % 360;
}, Li = function(e) {
	return {
		r: Pi(e.r, 0, 255),
		g: Pi(e.g, 0, 255),
		b: Pi(e.b, 0, 255),
		a: Pi(e.a)
	};
}, Ri = function(e) {
	return {
		r: Ni(e.r),
		g: Ni(e.g),
		b: Ni(e.b),
		a: Ni(e.a, 3)
	};
}, zi = /^#([0-9a-f]{3,8})$/i, Bi = function(e, t) {
	var n = e.charCodeAt(t);
	return (15 & n) + 9 * (n >> 6);
}, Vi = function(e, t) {
	return Bi(e, t) << 4 | Bi(e, t + 1);
}, Hi = [], Ui = 0; Ui < 256; Ui++) Hi.push((Ui < 16 ? "0" : "") + Ui.toString(16));
var Wi = function(e) {
	return Hi[Pi(e, 0, 255)];
}, Gi = function(e) {
	var t = e.r, n = e.g, r = e.b, i = e.a, a = Math.max(t, n, r), o = a - Math.min(t, n, r), s = o ? a === t ? (n - r) / o : a === n ? 2 + (r - t) / o : 4 + (t - n) / o : 0;
	return {
		h: 60 * (s < 0 ? s + 6 : s),
		s: a ? o / a * 100 : 0,
		v: a / 255 * 100,
		a: i
	};
}, Ki = function(e) {
	var t = e.h, n = e.s, r = e.v, i = e.a;
	t = t / 360 * 6, n /= 100, r /= 100;
	var a = Math.floor(t), o = r * (1 - n), s = r * (1 - (t - a) * n), c = r * (1 - (1 - t + a) * n), l = a % 6;
	return {
		r: 255 * [
			r,
			s,
			o,
			o,
			c,
			r
		][l],
		g: 255 * [
			c,
			r,
			r,
			s,
			o,
			o
		][l],
		b: 255 * [
			o,
			o,
			c,
			r,
			r,
			s
		][l],
		a: i
	};
}, qi = function(e) {
	return {
		h: Fi(e.h),
		s: Pi(e.s, 0, 100),
		l: Pi(e.l, 0, 100),
		a: Pi(e.a)
	};
}, Ji = function(e) {
	return {
		h: Ii(e.h),
		s: Ni(e.s),
		l: Ni(e.l),
		a: Ni(e.a, 3)
	};
}, Yi = function(e) {
	return Ki((n = (t = e).s, {
		h: t.h,
		s: (n *= ((r = t.l) < 50 ? r : 100 - r) / 100) > 0 ? 2 * n / (r + n) * 100 : 0,
		v: r + n,
		a: t.a
	}));
	var t, n, r;
}, Xi = function(e) {
	return {
		h: (t = Gi(e)).h,
		s: (i = (200 - (n = t.s)) * (r = t.v) / 100) > 0 && i < 200 ? n * r / 100 / (i <= 100 ? i : 200 - i) * 100 : 0,
		l: i / 2,
		a: t.a
	};
	var t, n, r, i;
}, Zi = /^hsla?\(\s*([+-]?(?:\d*\.\d+|\d+))(deg|rad|grad|turn)?\s*,\s*([+-]?(?:\d*\.\d+|\d+))%\s*,\s*([+-]?(?:\d*\.\d+|\d+))%\s*(?:,\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s*)?\)$/i, Qi = /^hsla?\(\s*([+-]?(?:\d*\.\d+|\d+))(deg|rad|grad|turn)?\s+([+-]?(?:\d*\.\d+|\d+))%\s+([+-]?(?:\d*\.\d+|\d+))%\s*(?:\/\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s*)?\)$/i, $i = /^rgba?\(\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s*,\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s*,\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s*(?:,\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s*)?\)$/i, ea = /^rgba?\(\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s+([+-]?(?:\d*\.\d+|\d+))(%)?\s+([+-]?(?:\d*\.\d+|\d+))(%)?\s*(?:\/\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s*)?\)$/i, ta = {
	string: [
		[function(e) {
			if (!zi.test(e)) return null;
			var t = e.length;
			return t <= 5 ? {
				r: 17 * Bi(e, 1),
				g: 17 * Bi(e, 2),
				b: 17 * Bi(e, 3),
				a: t === 5 ? Ni(17 * Bi(e, 4) / 255, 2) : 1
			} : t === 7 || t === 9 ? {
				r: Vi(e, 1),
				g: Vi(e, 3),
				b: Vi(e, 5),
				a: t === 9 ? Ni(Vi(e, 7) / 255, 2) : 1
			} : null;
		}, "hex"],
		[function(e) {
			var t = $i.exec(e) || ea.exec(e);
			return t ? t[2] !== t[4] || t[4] !== t[6] ? null : Li({
				r: Number(t[1]) / (t[2] ? 100 / 255 : 1),
				g: Number(t[3]) / (t[4] ? 100 / 255 : 1),
				b: Number(t[5]) / (t[6] ? 100 / 255 : 1),
				a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1)
			}) : null;
		}, "rgb"],
		[function(e) {
			var t = Zi.exec(e) || Qi.exec(e);
			if (!t) return null;
			var n, r;
			return Yi(qi({
				h: (n = t[1], r = t[2], r === void 0 && (r = "deg"), Number(n) * (ji[r] || 1)),
				s: Number(t[3]),
				l: Number(t[4]),
				a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1)
			}));
		}, "hsl"]
	],
	object: [
		[function(e) {
			var t = e.r, n = e.g, r = e.b, i = e.a, a = i === void 0 ? 1 : i;
			return Mi(t) && Mi(n) && Mi(r) ? Li({
				r: Number(t),
				g: Number(n),
				b: Number(r),
				a: Number(a)
			}) : null;
		}, "rgb"],
		[function(e) {
			var t = e.h, n = e.s, r = e.l, i = e.a, a = i === void 0 ? 1 : i;
			return !Mi(t) || !Mi(n) || !Mi(r) ? null : Yi(qi({
				h: Number(t),
				s: Number(n),
				l: Number(r),
				a: Number(a)
			}));
		}, "hsl"],
		[function(e) {
			var t = e.h, n = e.s, r = e.v, i = e.a, a = i === void 0 ? 1 : i;
			return !Mi(t) || !Mi(n) || !Mi(r) ? null : Ki(function(e) {
				return {
					h: Fi(e.h),
					s: Pi(e.s, 0, 100),
					v: Pi(e.v, 0, 100),
					a: Pi(e.a)
				};
			}({
				h: Number(t),
				s: Number(n),
				v: Number(r),
				a: Number(a)
			}));
		}, "hsv"]
	]
}, na = function(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n][0](e);
		if (r) return [r, t[n][1]];
	}
	return [null, void 0];
}, ra = function(e) {
	return typeof e == "string" ? na(e.trim(), ta.string) : typeof e == "object" && e ? na(e, ta.object) : [null, void 0];
}, ia = function(e, t) {
	var n = Xi(e);
	return {
		h: n.h,
		s: Pi(n.s + 100 * t, 0, 100),
		l: n.l,
		a: n.a
	};
}, aa = function(e) {
	return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3 / 255;
}, oa = function(e, t) {
	var n = Xi(e);
	return {
		h: n.h,
		s: n.s,
		l: Pi(n.l + 100 * t, 0, 100),
		a: n.a
	};
}, sa = function() {
	function e(e) {
		this.parsed = ra(e)[0], this.rgba = this.parsed || {
			r: 0,
			g: 0,
			b: 0,
			a: 1
		};
	}
	return e.prototype.isValid = function() {
		return this.parsed !== null;
	}, e.prototype.brightness = function() {
		return Ni(aa(this.rgba), 2);
	}, e.prototype.isDark = function() {
		return aa(this.rgba) < .5;
	}, e.prototype.isLight = function() {
		return aa(this.rgba) >= .5;
	}, e.prototype.toHex = function() {
		return e = Ri(this.rgba), t = e.r, n = e.g, r = e.b, a = (i = e.a) < 1 ? Wi(Ni(255 * i)) : "", "#" + Wi(t) + Wi(n) + Wi(r) + a;
		var e, t, n, r, i, a;
	}, e.prototype.toRgb = function() {
		return Ri(this.rgba);
	}, e.prototype.toRgbString = function() {
		return e = Ri(this.rgba), t = e.r, n = e.g, r = e.b, (i = e.a) < 1 ? "rgba(" + t + ", " + n + ", " + r + ", " + i + ")" : "rgb(" + t + ", " + n + ", " + r + ")";
		var e, t, n, r, i;
	}, e.prototype.toHsl = function() {
		return Ji(Xi(this.rgba));
	}, e.prototype.toHslString = function() {
		return e = Ji(Xi(this.rgba)), t = e.h, n = e.s, r = e.l, (i = e.a) < 1 ? "hsla(" + t + ", " + n + "%, " + r + "%, " + i + ")" : "hsl(" + t + ", " + n + "%, " + r + "%)";
		var e, t, n, r, i;
	}, e.prototype.toHsv = function() {
		return e = Gi(this.rgba), {
			h: Ii(e.h),
			s: Ni(e.s),
			v: Ni(e.v),
			a: Ni(e.a, 3)
		};
		var e;
	}, e.prototype.invert = function() {
		return ca({
			r: 255 - (e = this.rgba).r,
			g: 255 - e.g,
			b: 255 - e.b,
			a: e.a
		});
		var e;
	}, e.prototype.saturate = function(e) {
		return e === void 0 && (e = .1), ca(ia(this.rgba, e));
	}, e.prototype.desaturate = function(e) {
		return e === void 0 && (e = .1), ca(ia(this.rgba, -e));
	}, e.prototype.grayscale = function() {
		return ca(ia(this.rgba, -1));
	}, e.prototype.lighten = function(e) {
		return e === void 0 && (e = .1), ca(oa(this.rgba, e));
	}, e.prototype.darken = function(e) {
		return e === void 0 && (e = .1), ca(oa(this.rgba, -e));
	}, e.prototype.rotate = function(e) {
		return e === void 0 && (e = 15), this.hue(Xi(this.rgba).h + e);
	}, e.prototype.alpha = function(e) {
		return typeof e == "number" ? ca({
			r: (t = this.rgba).r,
			g: t.g,
			b: t.b,
			a: e
		}) : Ni(this.rgba.a, 3);
		var t;
	}, e.prototype.hue = function(e) {
		var t = Xi(this.rgba);
		return typeof e == "number" ? ca({
			h: e,
			s: t.s,
			l: t.l,
			a: t.a
		}) : Ii(t.h);
	}, e.prototype.isEqual = function(e) {
		return this.toHex() === ca(e).toHex();
	}, e;
}(), ca = function(e) {
	return e instanceof sa ? e : new sa(e);
}, la = h("<input type=\"hidden\"/>"), ua = h("<div role=\"slider\" tabindex=\"0\"><div class=\"track svelte-1s7r8is\"></div> <div class=\"thumb svelte-1s7r8is\"></div></div> <!>", 1), da = {
	hash: "svelte-1s7r8is",
	code: ".slider.svelte-1s7r8is {---track-width: var(--track-width, unset);---track-height: var(--track-height, 6px);---track-background: var(--track-background, #949494);---track-border: var(--track-border, none);---thumb-size: var(--thumb-size, 16px);---thumb-background: var(--thumb-background, #2d2d2d);---thumb-border: var(--thumb-border, none);---position: var(--position, 0px);---margin-inline-thumb-bigger: max(var(---thumb-size) - var(---track-height), 0px);---margin-inline-thumb-smaller: max(var(---track-height) - var(---thumb-size), 0px);position:relative;margin:auto;user-select:none;-webkit-user-select:none;background-color:transparent;cursor:pointer;}.slider.svelte-1s7r8is::before {background-color:transparent;}[aria-orientation='horizontal'].svelte-1s7r8is {width:var(---track-width);max-width:calc(100% - 2 * var(---margin-inline-thumb-bigger));height:calc(max(var(---track-height), var(---thumb-size)) + 4px);height:max(var(---track-height), var(---thumb-size));margin-inline:var(---margin-inline-thumb-bigger);margin-block:var(--margin-block, 8px);}[aria-orientation='vertical'].svelte-1s7r8is {width:max(var(---track-height), var(---thumb-size));height:var(---track-width);max-height:calc(100% - 2 * var(---margin-inline-thumb-bigger));margin-block:var(---margin-inline-thumb-bigger);margin-inline:var(--margin-block, 8px);}.track.svelte-1s7r8is {position:absolute;pointer-events:none;background:var(---track-background);border:var(---track-border);border-radius:calc(var(---track-height) / 2);box-sizing:border-box;}[aria-orientation='horizontal'].svelte-1s7r8is .track:where(.svelte-1s7r8is) {height:var(---track-height);top:50%;transform:translateY(-50%);left:0;right:0;}[aria-orientation='vertical'].svelte-1s7r8is .track:where(.svelte-1s7r8is) {width:var(---track-height);left:50%;transform:translateX(-50%);top:0;bottom:0;}.thumb.svelte-1s7r8is {pointer-events:none;position:absolute;height:var(---thumb-size);width:var(---thumb-size);border-radius:calc(var(---thumb-size) / 2);background:var(---thumb-background);border:var(---thumb-border);box-sizing:border-box;transform:translate(-50%, -50%);--margin-left: (2 * var(---track-height) - var(---thumb-size) - var(---margin-inline-thumb-smaller)) / 2;--left: calc(var(---position) * (100% - 2 * var(--margin-left)) + var(--margin-left));}[aria-orientation='horizontal'].svelte-1s7r8is:not(.reverse) .thumb:where(.svelte-1s7r8is) {top:50%;left:var(--left);}[aria-orientation='vertical'].svelte-1s7r8is:not(.reverse) .thumb:where(.svelte-1s7r8is) {left:50%;bottom:calc(var(--left) - var(---thumb-size));}[aria-orientation='horizontal'].reverse.svelte-1s7r8is .thumb:where(.svelte-1s7r8is) {top:50%;right:calc(var(--left) - var(---thumb-size));}[aria-orientation='vertical'].reverse.svelte-1s7r8is .thumb:where(.svelte-1s7r8is) {left:50%;top:calc(var(--left));}.slider.svelte-1s7r8is:focus-visible {outline:none;}.slider.svelte-1s7r8is:focus-visible .track:where(.svelte-1s7r8is) {outline:2px solid var(--focus-color, red);outline-offset:2px;}"
};
function fa(e, n) {
	_(n, !0), o(e, da);
	let r = C(n, "min", 3, 0), i = C(n, "max", 3, 100), s = C(n, "step", 3, 1), u = C(n, "value", 15, 50), d = C(n, "ariaValueText", 3, (e) => e.toString()), p = C(n, "direction", 3, "horizontal"), m = C(n, "reverse", 3, !1), h = C(n, "keyboardOnly", 3, !1), g = C(n, "slider", 7), y = C(n, "isDragging", 7, !1), b = a(() => typeof r() == "string" ? parseFloat(r()) : r()), x = a(() => typeof i() == "string" ? parseFloat(i()) : i()), S = a(() => typeof s() == "string" ? parseFloat(s()) : s());
	function T(e) {
		let n = 1 / t(S), r = Math.round(e * n) / n;
		return Math.max(t(b), Math.min(t(x), r));
	}
	function k(e) {
		let r = e.shiftKey ? t(S) * 10 : t(S);
		e.key === "ArrowUp" || e.key === "ArrowRight" ? (u(u() + r), e.preventDefault()) : e.key === "ArrowDown" || e.key === "ArrowLeft" ? (u(u() - r), e.preventDefault()) : e.key === "Home" ? (u(t(b)), e.preventDefault()) : e.key === "End" ? (u(t(x)), e.preventDefault()) : e.key === "PageUp" ? (u(u() + t(S) * 10), e.preventDefault()) : e.key === "PageDown" && (u(u() - t(S) * 10), e.preventDefault()), u(T(u())), n.onInput?.(u());
	}
	let A = {
		horizontal: {
			clientSize: "clientWidth",
			offset: "left",
			client: "clientX"
		},
		vertical: {
			clientSize: "clientHeight",
			offset: "top",
			client: "clientY"
		}
	};
	function j(e) {
		let r = g()?.[A[p()].clientSize] || 120, i = g()?.getBoundingClientRect()[A[p()].offset] || 0, a = e[A[p()].client] - i;
		p() === "vertical" && (a = -1 * a + r), m() ? u(t(x) - a / r * (t(x) - t(b))) : u(a / r * (t(x) - t(b)) + t(b)), u(T(u())), n.onInput?.(u());
	}
	function M(e) {
		j(e), y(!0);
	}
	function N(e) {
		y() && j(e);
	}
	function ee() {
		y(!1);
	}
	function P(e) {
		e.preventDefault(), j({
			clientX: e.changedTouches[0].clientX,
			clientY: e.changedTouches[0].clientY
		});
	}
	let I = a(() => ((u() - t(b)) / (t(x) - t(b)) * 1).toFixed(4));
	var R = ua();
	f("mousemove", z, N), f("mouseup", z, ee);
	var B = D(R);
	let V, te;
	c(B, (e) => g(e), () => g());
	var ne = K(B, 2), U = (e) => {
		var t = la();
		re(t), L(() => {
			O(t, "name", n.name), H(t, u());
		}), w(e, t);
	};
	v(ne, (e) => {
		n.name && e(U);
	}), L((e) => {
		V = J(B, 1, "slider svelte-1s7r8is", null, V, { reverse: m() }), O(B, "aria-orientation", p()), O(B, "aria-valuemax", t(x)), O(B, "aria-valuemin", t(b)), O(B, "aria-valuenow", u()), O(B, "aria-valuetext", e), O(B, "aria-label", n.ariaLabel), O(B, "aria-labelledby", n.ariaLabelledBy), O(B, "aria-controls", n.ariaControls), te = E(B, "", te, { "--position": t(I) });
	}, [() => d()(u())]), F("keydown", B, k), F("mousedown", B, function(...e) {
		(h() ? void 0 : M)?.apply(this, e);
	}), F("touchstart", B, function(...e) {
		(h() ? void 0 : P)?.apply(this, e);
	}, void 0, !0), F("touchmove", B, function(...e) {
		(h() ? void 0 : P)?.apply(this, e);
	}, void 0, !0), F("touchend", B, function(...e) {
		(h() ? void 0 : P)?.apply(this, e);
	}), w(e, R), l();
}
e([
	"keydown",
	"mousedown",
	"touchstart",
	"touchmove",
	"touchend"
]);
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_3486aff4ade57588cd7c77269f121e2c/node_modules/svelte-awesome-color-picker/dist/components/Picker.svelte
var pa = h("<div class=\"picker svelte-vdyoqc\"><!> <div class=\"s svelte-vdyoqc\"><!></div> <div class=\"v svelte-vdyoqc\"><!></div></div>"), ma = {
	hash: "svelte-vdyoqc",
	code: ".picker.svelte-vdyoqc {position:relative;display:inline-block;width:var(--picker-width, 200px);height:var(--picker-height, 200px);background:linear-gradient(#ffffff00, #000000ff), linear-gradient(0.25turn, #ffffffff, #00000000), var(--picker-color-bg);border-radius:var(--picker-radius, 8px);outline:none;user-select:none;cursor:pointer;}.s.svelte-vdyoqc,\n	.v.svelte-vdyoqc {position:absolute;--track-background: none;--track-border: none;--thumb-background: none;--thumb-border: none;--thumb-size: 2px;--margin-block: 0;--track-height: var(--picker-indicator-size, 10px);user-select:none;-webkit-user-select:none;}.s.svelte-vdyoqc {top:calc(var(--pos-y) * (var(--picker-height, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);left:2px;--track-width: calc(var(--picker-width, 200px) - 4px);}.v.svelte-vdyoqc {top:2px;left:calc(var(--pos-x) * (var(--picker-width, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);--track-width: calc(var(--picker-height, 200px) - 4px);}"
};
function ha(e, n) {
	_(n, !0), o(e, ma);
	let r = C(n, "s", 15), i = C(n, "v", 15), s = Y(void 0), u = !1, d = Y(V({
		x: 100,
		y: 0
	})), p = a(() => ca({
		h: n.h,
		s: 100,
		v: 100,
		a: 1
	}).toHex());
	function h(e, t, n) {
		return Math.min(Math.max(t, e), n);
	}
	function g(e) {
		if (!t(s)) return;
		let { width: n, left: a, height: o, top: c } = t(s).getBoundingClientRect(), l = {
			x: h(e.clientX - a, 0, n),
			y: h(e.clientY - c, 0, o)
		};
		r(h(l.x / n, 0, 1) * 100), i(h((o - l.y) / o, 0, 1) * 100), T();
	}
	function v(e) {
		e.preventDefault(), e.button === 0 && (u = !0, g(e));
	}
	function y() {
		u = !1;
	}
	function b(e) {
		u && g(e);
	}
	function x(e) {
		e.preventDefault(), g(e.changedTouches[0]);
	}
	te(() => {
		typeof r() == "number" && typeof i() == "number" && t(s) && S(d, {
			x: r(),
			y: 100 - i()
		}, !0);
	});
	function T(e = {}) {
		n.onInput({
			s: r(),
			v: i(),
			...e
		});
	}
	var D = pa();
	f("mouseup", z, y), f("mousemove", z, b);
	let O;
	var k = W(D);
	m(k, () => n.components.pickerIndicator, (e, r) => {
		r(e, {
			get pos() {
				return t(d);
			},
			get isDark() {
				return n.isDark;
			}
		});
	});
	var A = K(k, 2);
	let j;
	fa(W(A), {
		get value() {
			return r();
		},
		onInput: (e) => T({ s: e }),
		keyboardOnly: !0,
		ariaValueText: (e) => `${e}%`,
		get ariaLabel() {
			return n.texts.label.s;
		}
	}), G(A);
	var M = K(A, 2);
	let N;
	fa(W(M), {
		get value() {
			return i();
		},
		onInput: (e) => T({ v: e }),
		keyboardOnly: !0,
		ariaValueText: (e) => `${e}%`,
		direction: "vertical",
		get ariaLabel() {
			return n.texts.label.v;
		}
	}), G(M), G(D), c(D, (e) => S(s, e), () => t(s)), L(() => {
		O = E(D, "", O, { "--picker-color-bg": t(p) }), j = E(A, "", j, { "--pos-y": t(d).y }), N = E(M, "", N, { "--pos-x": t(d).x });
	}), F("mousedown", D, v), F("touchstart", D, x, void 0, !0), F("touchmove", D, x, void 0, !0), F("touchend", D, x), w(e, D), l();
}
e([
	"mousedown",
	"touchstart",
	"touchmove",
	"touchend"
]);
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_3486aff4ade57588cd7c77269f121e2c/node_modules/svelte-awesome-color-picker/dist/components/variant/default/Input.svelte
var ga = h("<label class=\"svelte-1c72egu\"><div class=\"container svelte-1c72egu\"><input type=\"color\" aria-haspopup=\"dialog\" class=\"svelte-1c72egu\"/> <div class=\"alpha svelte-1c72egu\"></div> <div class=\"color svelte-1c72egu\"></div></div> </label>"), _a = {
	hash: "svelte-1c72egu",
	code: "label.svelte-1c72egu {display:inline-flex;align-items:center;gap:8px;cursor:pointer;border-radius:3px;margin:4px;height:var(--input-size, 25px);user-select:none;}.container.svelte-1c72egu {position:relative;display:block;display:flex;align-items:center;justify-content:center;width:var(--input-size, 25px);}input.svelte-1c72egu {margin:0;padding:0;border:none;width:1px;height:1px;flex-shrink:0;opacity:0;}.alpha.svelte-1c72egu {clip-path:circle(50%);background:var(--alpha-grid-bg);}.alpha.svelte-1c72egu,\n	.color.svelte-1c72egu {position:absolute;width:var(--input-size, 25px);height:var(--input-size, 25px);border-radius:50%;user-select:none;}.alpha.svelte-1c72egu {width:calc(var(--input-size, 25px) - 2px);height:calc(var(--input-size, 25px) - 2px);}input.svelte-1c72egu:focus-visible ~ .color:where(.svelte-1c72egu) {outline:2px solid var(--focus-color, red);outline-offset:2px;}"
};
function va(e, t) {
	_(t, !0), o(e, _a);
	let n = C(t, "labelElement", 15), r = C(t, "name", 3, void 0);
	function i(e) {
		e.preventDefault();
	}
	var a = ga(), s = W(a), u = W(s);
	re(u);
	var d = K(u, 4);
	let f;
	G(s);
	var p = K(s);
	G(a), c(a, (e) => n(e), () => n()), L(() => {
		O(a, "dir", t.dir), O(u, "name", r()), H(u, t.hex), f = E(d, "", f, { background: t.hex }), j(p, ` ${t.label ?? ""}`), a.dir = a.dir;
	}), F("click", a, i), F("mousedown", a, i), F("click", u, i), F("mousedown", u, i), w(e, a), l();
}
e(["click", "mousedown"]);
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_3486aff4ade57588cd7c77269f121e2c/node_modules/svelte-awesome-color-picker/dist/components/variant/default/NullabilityCheckbox.svelte
var ya = h("<label class=\"nullability-checkbox svelte-aavkt2\"><div class=\"svelte-aavkt2\"><input type=\"checkbox\" class=\"svelte-aavkt2\"/> <span class=\"svelte-aavkt2\"></span></div> </label>"), ba = {
	hash: "svelte-aavkt2",
	code: "label.svelte-aavkt2 {display:flex;justify-content:center;margin-bottom:4px;grid-area:nullable;user-select:none;}input.svelte-aavkt2 {margin:0;}input.svelte-aavkt2:focus-visible {outline:none;}input.svelte-aavkt2:focus-visible + span:where(.svelte-aavkt2) {width:14px;height:14px;border-radius:2px;outline:2px solid var(--focus-color, red);outline-offset:2px;}div.svelte-aavkt2 {width:32px;aspect-ratio:2;position:relative;}div.svelte-aavkt2 :where(.svelte-aavkt2) {position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);}"
};
function xa(e, t) {
	_(t, !0), o(e, ba);
	let n = C(t, "isUndefined", 15);
	var r = ya(), i = W(r), a = W(i);
	re(a), k(2), G(i);
	var s = K(i);
	G(r), L(() => j(s, ` ${t.texts.label.withoutColor ?? ""}`)), x(a, n), w(e, r), l();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_3486aff4ade57588cd7c77269f121e2c/node_modules/svelte-awesome-color-picker/dist/components/variant/default/PickerIndicator.svelte
var Sa = h("<div class=\"picker-indicator svelte-wif7s5\"></div>"), Ca = {
	hash: "svelte-wif7s5",
	code: "div.svelte-wif7s5 {position:absolute;left:calc(var(--pos-x) * (var(--picker-width, 200px) - 2px) / 100 - var(--picker-indicator-size, 10px) / 2 + 1px);top:calc(var(--pos-y) * (var(--picker-height, 200px) - 2px) / 100 - var(--picker-indicator-size, 10px) / 2 + 1px);width:var(--picker-indicator-size, 10px);height:var(--picker-indicator-size, 10px);background-color:white;box-shadow:0 0 4px black;border-radius:50%;pointer-events:none;z-index:1;transition:box-shadow 0.2s;}"
};
function wa(e, t) {
	_(t, !0), o(e, Ca);
	var n = Sa();
	let r;
	L(() => r = E(n, "", r, {
		"--pos-x": t.pos.x,
		"--pos-y": t.pos.y
	})), w(e, n), l();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_3486aff4ade57588cd7c77269f121e2c/node_modules/svelte-awesome-color-picker/dist/components/variant/default/Swatches.svelte
var Ta = h("<button type=\"button\" class=\"swatch svelte-i3uxda\"></button>"), Ea = h("<div class=\"swatches svelte-i3uxda\"></div>"), Da = {
	hash: "svelte-i3uxda",
	code: ".swatches.svelte-i3uxda {display:grid;grid-template-columns:var(--cp-swatch-grid-template-columns, repeat(auto-fit, minmax(24px, 1fr)));gap:8px;width:100%;height:100%;margin-top:8px;margin-bottom:8px;}.swatch.svelte-i3uxda {cursor:pointer;margin:0;padding:0;border:none;width:100%;aspect-ratio:1 / 1;height:auto;display:block;}.swatch.svelte-i3uxda:focus {outline:2px solid var(--focus-color, red);outline-offset:2px;}"
};
function Oa(e, t) {
	_(t, !0), o(e, Da);
	var n = q(), r = D(n), i = (e) => {
		var n = Ea();
		d(n, 20, () => t.swatches, (e) => e, (e, n) => {
			var r = Ta();
			L((e) => {
				E(r, `background: ${n ?? ""}`), O(r, "aria-label", e);
			}, [() => t.texts.swatch.ariaLabel(n)]), F("click", r, () => t.selectSwatch(n)), w(e, r);
		}), G(n), L(() => O(n, "aria-label", t.texts.swatch.ariaTitle)), w(e, n);
	};
	v(r, (e) => {
		t.swatches && e(i);
	}), w(e, n), l();
}
e(["click"]);
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_3486aff4ade57588cd7c77269f121e2c/node_modules/svelte-awesome-color-picker/dist/components/variant/default/TextInput.svelte
var ka = h("<input class=\"svelte-iycd2n\"/>"), Aa = h("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-iycd2n\"/> <input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-iycd2n\"/> <input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-iycd2n\"/>", 1), ja = h("<input type=\"number\" min=\"0\" max=\"360\" class=\"svelte-iycd2n\"/> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-iycd2n\"/> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-iycd2n\"/>", 1), Ma = h("<input type=\"number\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-iycd2n\"/>"), Na = h("<button type=\"button\" class=\"svelte-iycd2n\"><span class=\"disappear svelte-iycd2n\" aria-hidden=\"true\"> </span> <span class=\"appear svelte-iycd2n\"> </span></button>"), Pa = h("<div class=\"button-like svelte-iycd2n\"> </div>"), Fa = h("<div class=\"text-input svelte-iycd2n\"><div class=\"input-container svelte-iycd2n\"><!> <!></div> <!></div>"), Ia = {
	hash: "svelte-iycd2n",
	code: ".text-input.svelte-iycd2n {margin:var(--text-input-margin, 5px 0 0);}.input-container.svelte-iycd2n {display:flex;flex:1;gap:10px;}input.svelte-iycd2n,\n	button.svelte-iycd2n,\n	.button-like.svelte-iycd2n {flex:1;border:none;background-color:var(--cp-input-color, #eee);color:var(--cp-text-color, var(--cp-border-color));padding:0;border-radius:5px;height:30px;line-height:30px;text-align:center;}input.svelte-iycd2n {width:5px;font-family:inherit;}button.svelte-iycd2n,\n	.button-like.svelte-iycd2n {position:relative;flex:1;margin:8px 0 0;height:30px;width:100%;transition:background-color 0.2s;cursor:pointer;font-family:inherit;}.button-like.svelte-iycd2n {cursor:default;}.appear.svelte-iycd2n,\n	.disappear.svelte-iycd2n {position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);width:100%;transition:all 0.5s;}button.svelte-iycd2n:hover .disappear:where(.svelte-iycd2n),\n	.appear.svelte-iycd2n {opacity:0;}.disappear.svelte-iycd2n,\n	button.svelte-iycd2n:hover .appear:where(.svelte-iycd2n) {opacity:1;}button.svelte-iycd2n:hover {background-color:var(--cp-button-hover-color, #ccc);}input.svelte-iycd2n:focus,\n	button.svelte-iycd2n:focus {outline:none;}input.svelte-iycd2n:focus-visible,\n	button.svelte-iycd2n:focus-visible {outline:2px solid var(--focus-color, red);outline-offset:2px;}"
};
function La(e, n) {
	_(n, !0), o(e, Ia);
	let r = C(n, "rgb", 15), i = C(n, "hsv", 15), s = C(n, "hex", 15), c = /^#?([A-F0-9]{6}|[A-F0-9]{8})$/i, u = a(() => n.textInputModes[0] || "hex"), d = a(() => n.textInputModes[(n.textInputModes.indexOf(t(u)) + 1) % n.textInputModes.length]), f = a(() => Math.round(i().h)), p = a(() => Math.round(i().s)), m = a(() => Math.round(i().v)), h = a(() => i().a === void 0 ? 1 : Math.round(i().a * 100) / 100);
	function g(e) {
		let t = e.target;
		c.test(t.value) && (s(t.value), n.onInput({ hex: s() }));
	}
	function y(e) {
		return function(t) {
			let i = parseFloat(t.target.value);
			r({
				...r(),
				[e]: isNaN(i) ? 0 : i
			}), n.onInput({ rgb: r() });
		};
	}
	function b(e) {
		return function(t) {
			let r = parseFloat(t.target.value);
			i({
				...i(),
				[e]: isNaN(r) ? 0 : r
			}), n.onInput({ hsv: i() });
		};
	}
	var x = Fa(), T = W(x), k = W(T), A = (e) => {
		var t = ka();
		re(t), E(t, "", {}, { flex: 3 }), L(() => {
			O(t, "aria-label", n.texts.label.hex), H(t, s());
		}), F("input", t, g), w(e, t);
	}, M = (e) => {
		var i = Aa(), o = D(i);
		re(o);
		var s = a(() => y("r")), c = K(o, 2);
		re(c);
		var l = a(() => y("g")), u = K(c, 2);
		re(u);
		var d = a(() => y("b"));
		L(() => {
			O(o, "aria-label", n.texts.label.r), H(o, r().r), O(c, "aria-label", n.texts.label.g), H(c, r().g), O(u, "aria-label", n.texts.label.b), H(u, r().b);
		}), F("input", o, function(...e) {
			t(s)?.apply(this, e);
		}), F("input", c, function(...e) {
			t(l)?.apply(this, e);
		}), F("input", u, function(...e) {
			t(d)?.apply(this, e);
		}), w(e, i);
	}, N = (e) => {
		var r = ja(), i = D(r);
		re(i);
		var o = a(() => b("h")), s = K(i, 2);
		re(s);
		var c = a(() => b("s")), l = K(s, 2);
		re(l);
		var u = a(() => b("v"));
		L(() => {
			O(i, "aria-label", n.texts.label.h), H(i, t(f)), O(s, "aria-label", n.texts.label.s), H(s, t(p)), O(l, "aria-label", n.texts.label.v), H(l, t(m));
		}), F("input", i, function(...e) {
			t(o)?.apply(this, e);
		}), F("input", s, function(...e) {
			t(c)?.apply(this, e);
		}), F("input", l, function(...e) {
			t(u)?.apply(this, e);
		}), w(e, r);
	};
	v(k, (e) => {
		t(u) === "hex" ? e(A) : t(u) === "rgb" ? e(M, 1) : e(N, -1);
	});
	var ee = K(k, 2), P = (e) => {
		var r = Ma();
		re(r);
		var i = a(() => t(u) === "hsv" ? b("a") : y("a"));
		L(() => {
			O(r, "aria-label", n.texts.label.a), H(r, t(h));
		}), F("input", r, function(...e) {
			t(i)?.apply(this, e);
		}), w(e, r);
	};
	v(ee, (e) => {
		n.isAlpha && e(P);
	}), G(T);
	var R = K(T, 2), z = (e) => {
		var r = Na(), i = W(r), a = I(i, !0), o = K(i, 2), s = I(o);
		G(r), L(() => {
			j(a, n.texts.color[t(u)]), j(s, `${n.texts.changeTo ?? ""} ${n.texts.color[t(d)] ?? ""}`);
		}), F("click", r, () => S(u, t(d))), w(e, r);
	}, B = (e) => {
		var r = Pa(), i = I(r, !0);
		L(() => j(i, n.texts.color[t(u)])), w(e, r);
	};
	v(R, (e) => {
		n.textInputModes.length > 1 ? e(z) : e(B, -1);
	}), G(x), w(e, x), l();
}
e(["input", "click"]);
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_3486aff4ade57588cd7c77269f121e2c/node_modules/svelte-awesome-color-picker/dist/components/variant/default/Wrapper.svelte
var Ra = h("<div aria-label=\"color picker\"><!></div>"), za = {
	hash: "svelte-3c1c9h",
	code: "div.svelte-3c1c9h {padding:8px;background-color:var(--cp-bg-color, white);margin:0 10px 10px;border:1px solid var(--cp-border-color, black);border-radius:12px;display:none;width:max-content;}.is-open.svelte-3c1c9h {display:inline-block;}[role='dialog'].svelte-3c1c9h {position:absolute;top:calc(var(--input-size, 25px) + 12px);left:0;z-index:var(--picker-z-index, 2);}"
};
function Ba(e, t) {
	_(t, !0), o(e, za);
	let n = C(t, "wrapper", 15);
	var r = Ra();
	let i;
	var a = W(r);
	U(a, () => t.children), G(r), c(r, (e) => n(e), () => n()), L(() => {
		i = J(r, 1, "wrapper svelte-3c1c9h", null, i, { "is-open": t.isOpen }), O(r, "role", t.isDialog ? "dialog" : void 0);
	}), w(e, r), l();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_3486aff4ade57588cd7c77269f121e2c/node_modules/svelte-awesome-color-picker/dist/components/ColorPicker.svelte
var Va = h("<input type=\"hidden\"/>"), Ha = h("<div class=\"a svelte-1avh7sj\"><!></div>"), Ua = h("<!> <!> <div class=\"h svelte-1avh7sj\"><!></div> <!> <!> <!> <!>", 1), Wa = h("<span><!> <!></span>"), Ga = {
	hash: "svelte-1avh7sj",
	code: "span.svelte-1avh7sj {position:relative;color:var(--cp-text-color, var(--cp-border-color));--alpha-grid-bg:\n			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 0 0 / 10px 10px,\n			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 5px 5px / 10px 10px;}.h.svelte-1avh7sj,\n	.a.svelte-1avh7sj {display:inline-flex;justify-content:center;--track-height: var(--slider-width, 10px);--track-width: var(--picker-height, 200px);--track-border: none;--thumb-size: calc(var(--slider-width, 10px) - 3px);--thumb-background: white;--thumb-border: 1px solid black;--margin-block: 0;--gradient-direction: 0.5turn;}.horizontal.svelte-1avh7sj .h:where(.svelte-1avh7sj),\n	.horizontal.svelte-1avh7sj .a:where(.svelte-1avh7sj) {--track-width: calc(var(--picker-width, 200px) - 12px);--gradient-direction: 0.25turn;margin:4px 6px;}.horizontal.svelte-1avh7sj .h:where(.svelte-1avh7sj) {margin-top:8px;}.vertical.svelte-1avh7sj .h:where(.svelte-1avh7sj),\n	.vertical.svelte-1avh7sj .a:where(.svelte-1avh7sj) {margin-left:3px;}.h.svelte-1avh7sj {grid-area:hue;--gradient-hue:\n			#ff1500fb, #ffff00 17.2%, #ffff00 18.2%, #00ff00 33.3%, #00ffff 49.5%, #00ffff 51.5%, #0000ff 67.7%,\n			#ff00ff 83.3%, #ff0000;--track-background: linear-gradient(var(--gradient-direction), var(--gradient-hue));}.a.svelte-1avh7sj {grid-area:alpha;margin-top:2px;\n\n		/* redefine css variable as it may not be available in case of a portal */--alpha-grid-bg:\n			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 0 0 / 10px 10px,\n			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 5px 5px / 10px 10px;--track-background:\n			linear-gradient(var(--gradient-direction), rgba(0, 0, 0, 0), var(--alphaless-color)), var(--alpha-grid-bg);}span.svelte-1avh7sj .sr-only {position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0;}"
};
function Ka(e, n) {
	_(n, !0), o(e, Ga);
	let r = C(n, "components", 19, () => ({})), i = C(n, "label", 3, "Choose a color"), s = C(n, "name", 3, void 0), u = C(n, "nullable", 3, !1), d = C(n, "rgb", 31, () => V(u() ? null : {
		r: 255,
		g: 0,
		b: 0,
		a: 1
	})), p = C(n, "hsv", 31, () => V(u() ? null : {
		h: 0,
		s: 100,
		v: 100,
		a: 1
	})), h = C(n, "hex", 31, () => V(u() ? null : "#ff0000")), g = C(n, "color", 15, null), x = C(n, "isDark", 15, !1), T = C(n, "isAlpha", 3, !0), k = C(n, "isDialog", 3, !0), A = C(n, "isOpen", 31, () => !k()), j = C(n, "position", 3, "responsive"), M = C(n, "dir", 3, "ltr"), N = C(n, "isTextInput", 3, !0), ee = C(n, "textInputModes", 19, () => [
		"hex",
		"rgb",
		"hsv"
	]), F = C(n, "sliderDirection", 3, "vertical"), I = C(n, "disableCloseClickOutside", 3, !1), R = C(n, "a11yColors", 19, () => [{ bgHex: "#ffffff" }]), B = C(n, "a11yLevel", 3, "AA"), ne = C(n, "texts", 3, void 0), U = C(n, "a11yTexts", 3, void 0), ie = Y(V({
		r: 255,
		g: 0,
		b: 0,
		a: 1
	})), X = Y(V({
		h: 0,
		s: 100,
		v: 100,
		a: 1
	})), ae = Y("#ff0000"), oe = Y(!1), se = Y(V(t(oe))), ce = Y(void 0), le = Y(void 0), Z = Y(void 0), Q, ue = Y(1080), de = Y(720), $ = {
		pickerIndicator: wa,
		textInput: La,
		input: va,
		nullabilityCheckbox: xa,
		wrapper: Ba
	};
	function fe() {
		return {
			...$,
			...r()
		};
	}
	function pe() {
		return {
			label: {
				...Di.label,
				...ne()?.label
			},
			color: {
				...Di.color,
				...ne()?.color
			},
			changeTo: ne()?.changeTo ?? Di.changeTo,
			swatch: {
				...ne()?.swatch,
				...Di.swatch
			}
		};
	}
	function me({ target: e }) {
		k() && (t(le)?.contains(e) || t(le)?.isSameNode(e) ? A(!A()) : A() && !t(Z)?.contains(e) && !I() && A(!1));
	}
	function he({ key: e, target: n }) {
		k() && t(le) && t(ce) && (e === "Enter" && t(le).contains(n) ? (A(!A()), setTimeout(() => {
			t(Z) && (Q = Ai(t(Z)));
		})) : e === "Escape" && A() && (A(!1), t(ce).contains(n) && (t(le)?.focus(), Q?.destroy())));
	}
	function ge(e) {
		h(e), p(ca(e).toHsv()), d(ca(e).toRgb()), S(se, !1), S(oe, !1), ve();
	}
	function _e() {
		return !(p() && d() && p().h === t(X).h && p().s === t(X).s && p().v === t(X).v && p().a === t(X).a && d().r === t(ie).r && d().g === t(ie).g && d().b === t(ie).b && d().a === t(ie).a && h() === t(ae));
	}
	function ve() {
		if (t(oe) && !t(se)) {
			S(se, !0), p(null), d(null), h(null), n.onInput?.({
				color: g(),
				hsv: p(),
				rgb: d(),
				hex: h()
			});
			return;
		}
		if (t(se) && !t(oe)) {
			S(se, !1), p(b(t(X))), d(b(t(ie))), h(b(t(ae))), n.onInput?.({
				color: g(),
				hsv: p(),
				rgb: d(),
				hex: h()
			});
			return;
		}
		if (!p() && !d() && !h()) {
			S(oe, S(se, !0), !0), n.onInput?.({
				color: null,
				hsv: p(),
				rgb: d(),
				hex: h()
			});
			return;
		}
		_e() && (S(oe, !1), p() && p().a === void 0 && p({
			...p(),
			a: 1
		}), t(X).a === void 0 && S(X, {
			...t(X),
			a: 1
		}, !0), d() && d().a === void 0 && d({
			...d(),
			a: 1
		}), t(ie).a === void 0 && S(ie, {
			...t(ie),
			a: 1
		}, !0), h()?.substring(7) === "ff" && h(h().substring(0, 7)), t(ae)?.substring(7) === "ff" && S(ae, t(ae).substring(0, 7), !0), p() && (p().h !== t(X).h || p().s !== t(X).s || p().v !== t(X).v || p().a !== t(X).a || !d() && !h()) ? (g(ca(p())), d(g().toRgb()), h(g().toHex())) : d() && (d().r !== t(ie).r || d().g !== t(ie).g || d().b !== t(ie).b || d().a !== t(ie).a || !p() && !h()) ? (g(ca(d())), h(g().toHex()), p(g().toHsv())) : h() && (h() !== t(ae) || !p() && !d()) && (g(ca(h())), d(g().toRgb()), p(g().toHsv())), g() && x(g().isDark()), h() && p() && d() && (S(X, b(p()), !0), S(ie, b(d()), !0), S(ae, h(), !0), S(se, t(oe), !0), n.onInput?.({
			color: g(),
			hsv: p(),
			rgb: d(),
			hex: h()
		})));
	}
	te(() => {
		(p() || d() || h()) && ve();
	}), te(() => {
		t(oe), ve();
	});
	function ye(e) {
		return (n) => {
			p() || (S(oe, !1), S(se, !1), p(b(t(X)))), p({
				...p(),
				[e]: n
			});
		};
	}
	function be(e) {
		return (n) => {
			p() || (S(oe, !1), S(se, !1), p(b(t(X)))), p({
				...p(),
				...Object.fromEntries(e.map((e) => [e, n[e]]))
			});
		};
	}
	async function xe() {
		if (await y(), j() === "fixed" || !A() || !k() || !t(le) || !t(Z)) return;
		let e = t(Z).getBoundingClientRect(), n = t(le).getBoundingClientRect();
		if ((j() === "responsive" || j() === "responsive-y") && (n.top + e.height + 12 > t(de) ? t(Z).style.top = `-${e.height + 12}px` : t(Z).style.top = `${n.height + 12}px`), j() === "responsive" || j() === "responsive-x") {
			if (M() === "rtl") {
				let r = n.left + n.width - e.width < 0;
				console.log(r, n.left - e.width, n.left, e.width), r ? t(Z).style.left = "0px" : t(Z).style.left = `${n.width - e.width}px`;
			} else n.left + e.width > t(ue) ? t(Z).style.left = `${n.width - e.width}px` : t(Z).style.left = "0px";
		}
	}
	te(() => {
		t(ue) && t(de) && A() && xe();
	});
	let Se = a(fe);
	var Ce = Wa();
	f("mousedown", z, me), f("keyup", z, he), f("scroll", z, xe);
	var we = W(Ce), Te = (e) => {
		var n = q(), r = D(n);
		m(r, () => t(Se).input, (e, n) => {
			n(e, {
				get hex() {
					return h();
				},
				get label() {
					return i();
				},
				get name() {
					return s();
				},
				get dir() {
					return M();
				},
				get labelElement() {
					return t(le);
				},
				set labelElement(e) {
					S(le, e, !0);
				}
			});
		}), w(e, n);
	}, Ee = (e) => {
		var t = Va();
		re(t), L(() => {
			H(t, h()), O(t, "name", s());
		}), w(e, t);
	};
	v(we, (e) => {
		k() ? e(Te) : s() && e(Ee, 1);
	});
	var De = K(we, 2);
	m(De, () => t(Se).wrapper, (e, r) => {
		r(e, {
			get isOpen() {
				return A();
			},
			get isDialog() {
				return k();
			},
			get wrapper() {
				return t(Z);
			},
			set wrapper(e) {
				S(Z, e, !0);
			},
			children: (e, r) => {
				var i = Ua(), o = D(i), s = (e) => {
					var n = q(), r = D(n);
					{
						let e = a(pe);
						m(r, () => t(Se).nullabilityCheckbox, (n, r) => {
							r(n, {
								get texts() {
									return t(e);
								},
								get isUndefined() {
									return t(oe);
								},
								set isUndefined(e) {
									S(oe, e, !0);
								}
							});
						});
					}
					w(e, n);
				};
				v(o, (e) => {
					u() && e(s);
				});
				var c = K(o, 2);
				{
					let e = a(fe), n = a(() => p()?.h ?? t(X).h), r = a(() => p()?.s ?? t(X).s), i = a(() => p()?.v ?? t(X).v), o = a(() => be(["s", "v"])), s = a(pe);
					ha(c, {
						get components() {
							return t(e);
						},
						get h() {
							return t(n);
						},
						get s() {
							return t(r);
						},
						get v() {
							return t(i);
						},
						get onInput() {
							return t(o);
						},
						get isDark() {
							return x();
						},
						get texts() {
							return t(s);
						}
					});
				}
				var l = K(c, 2), f = W(l);
				{
					let e = a(() => p()?.h ?? t(X).h), n = a(() => ye("h")), r = a(() => F() === "vertical"), i = a(() => pe().label.h);
					fa(f, {
						min: 0,
						max: 360,
						step: 1,
						get value() {
							return t(e);
						},
						get onInput() {
							return t(n);
						},
						get direction() {
							return F();
						},
						get reverse() {
							return t(r);
						},
						get ariaLabel() {
							return t(i);
						}
					});
				}
				G(l);
				var g = K(l, 2), _ = (e) => {
					var n = Ha();
					let r;
					var i = W(n);
					{
						let e = a(() => p()?.a ?? t(X).a), n = a(() => ye("a")), r = a(() => F() === "vertical"), o = a(() => pe().label.a);
						fa(i, {
							min: 0,
							max: 1,
							step: .01,
							get value() {
								return t(e);
							},
							get onInput() {
								return t(n);
							},
							get direction() {
								return F();
							},
							get reverse() {
								return t(r);
							},
							get ariaLabel() {
								return t(o);
							}
						});
					}
					G(n), L((e) => r = E(n, "", r, { "--alphaless-color": e }), [() => (h() ? h() : t(ae)).substring(0, 7)]), w(e, n);
				};
				v(g, (e) => {
					T() && e(_);
				});
				var y = K(g, 2), b = (e) => {
					{
						let r = a(pe);
						Oa(e, {
							get swatches() {
								return n.swatches;
							},
							selectSwatch: ge,
							get texts() {
								return t(r);
							}
						});
					}
				};
				v(y, (e) => {
					n.swatches && n.swatches.length > 0 && e(b);
				});
				var C = K(y, 2), O = (e) => {
					var n = q(), r = D(n);
					{
						let e = a(() => h() ?? t(ae)), n = a(() => d() ?? t(ie)), i = a(() => p() ?? t(X)), o = a(pe);
						m(r, () => t(Se).textInput, (r, a) => {
							a(r, {
								get hex() {
									return t(e);
								},
								get rgb() {
									return t(n);
								},
								get hsv() {
									return t(i);
								},
								onInput: (e) => {
									e.hsv ? p(e.hsv) : e.rgb ? d(e.rgb) : e.hex && h(e.hex);
								},
								get isAlpha() {
									return T();
								},
								get textInputModes() {
									return ee();
								},
								get texts() {
									return t(o);
								}
							});
						});
					}
					w(e, n);
				};
				v(C, (e) => {
					N() && e(O);
				});
				var k = K(C, 2), A = (e) => {
					var n = q(), r = D(n);
					{
						let e = a(fe), n = a(() => h() || "#00000000");
						m(r, () => t(Se).a11yNotice, (r, i) => {
							i(r, {
								get components() {
									return t(e);
								},
								get a11yColors() {
									return R();
								},
								get hex() {
									return t(n);
								},
								get a11yTexts() {
									return U();
								},
								get a11yLevel() {
									return B();
								}
							});
						});
					}
					w(e, n);
				}, j = a(() => fe().a11yNotice);
				v(k, (e) => {
					t(j) && e(A);
				}), w(e, i);
			},
			$$slots: { default: !0 }
		});
	}), G(Ce), c(Ce, (e) => S(ce, e), () => t(ce)), L(() => J(Ce, 1, `color-picker ${F() ?? ""}`, "svelte-1avh7sj")), P("innerWidth", (e) => S(ue, e, !0)), P("innerHeight", (e) => S(de, e, !0)), w(e, Ce), l();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_3486aff4ade57588cd7c77269f121e2c/node_modules/svelte-awesome-color-picker/dist/index.js
var qa = Ka, Ja = h("<label class=\"color-trigger svelte-lqk2kf\"><input type=\"color\" aria-haspopup=\"dialog\" tabindex=\"-1\" class=\"svelte-lqk2kf\"/> <span class=\"swatch svelte-lqk2kf\"></span></label>"), Ya = {
	hash: "svelte-lqk2kf",
	code: ".color-trigger.svelte-lqk2kf {position:relative;display:grid;height:100%;min-width:2.5rem;place-items:center;cursor:pointer;user-select:none;}input.svelte-lqk2kf {position:absolute;margin:0;padding:0;border:none;width:1px;height:1px;opacity:0;pointer-events:none;}.swatch.svelte-lqk2kf {display:block;width:1.25rem;height:1.25rem;border-radius:0.375rem;border:1px solid var(--color-rule-strong);box-shadow:inset 0 0 0 1px rgb(0 0 0 / 0.2);}"
};
function Xa(e, t) {
	_(t, !0), o(e, Ya);
	let n = C(t, "labelElement", 15), r = C(t, "name", 3, void 0);
	function i(e) {
		e.preventDefault();
	}
	var a = Ja(), s = W(a);
	re(s);
	var u = K(s, 2);
	let d;
	G(a), c(a, (e) => n(e), () => n()), L(() => {
		O(a, "dir", t.dir), O(a, "aria-label", t.label), O(s, "name", r()), H(s, t.hex ?? "#000000"), d = E(u, "", d, { background: t.hex ?? "transparent" }), a.dir = a.dir;
	}), F("click", a, i), F("mousedown", a, i), F("click", s, i), F("mousedown", s, i), w(e, a), l();
}
e(["click", "mousedown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-color.svelte
var Za = h("<p> </p>"), Qa = h("<div><!> <div><div><svelte-css-wrapper style=\"display: contents\"><!></svelte-css-wrapper></div> <input type=\"text\" spellcheck=\"false\" autocomplete=\"off\"/></div> <!></div>"), $a = {
	hash: "svelte-r9ulp6",
	code: ".color-picker-slot.svelte-r9ulp6 > span {display:block;height:100%;}.color-picker-slot.svelte-r9ulp6 [role='dialog'] {top:calc(100% + 0.5rem);margin:0;}.input-color.svelte-r9ulp6 .wrapper {border-radius:0.25rem;}"
};
function eo(e, n) {
	_(n, !0), o(e, $a);
	let s = /^#([0-9a-fA-F]{3})$/, c = /^#([0-9a-fA-F]{6})$/, u = /^#([0-9a-fA-F]{8})$/;
	function d(e) {
		let t = e.trim(), n = s.exec(t);
		if (n) {
			let [e, t, r] = n[1];
			return `#${e}${e}${t}${t}${r}${r}`.toLowerCase();
		}
		if (c.exec(t)) return t.toLowerCase();
		let r = u.exec(t);
		return r ? `#${r[1].slice(0, 6)}`.toLowerCase() : null;
	}
	let f = C(n, "id", 19, Ae), p = C(n, "value", 15, ""), m = C(n, "defaultValue", 3, "#000000"), h = a(() => d(p() ?? "") ?? d(m()) ?? "#000000");
	function g(e) {
		if (!e) return;
		let t = d(e);
		t && t !== p() && (p(t), n.onvaluechange?.(t));
	}
	function y(e) {
		let t = e.currentTarget.value;
		p(t), n.onvaluechange?.(t);
	}
	var b = Qa(), x = W(b), S = (e) => {
		Fr(e, {
			get for() {
				return f();
			},
			children: (e, t) => {
				k();
				var r = i();
				L(() => j(r, n.label)), w(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	v(x, (e) => {
		n.label && e(S);
	});
	var T = K(x, 2), E = W(T), D = W(E);
	{
		let e = a(() => n.label ?? "Color"), r = a(() => ({ input: Xa }));
		ie(D, () => ({
			"--picker-z-index": "100",
			"--input-size": "1.25rem",
			"--cp-bg-color": "var(--color-dark-800, #1a1b1e)",
			"--cp-border-color": "var(--color-dark-500, #3f3f46)",
			"--cp-text-color": "var(--color-dark-50, #f4f4f5)",
			"--cp-input-color": "var(--color-dark-700, #27272a)",
			"--cp-button-hover-color": "var(--color-dark-600, #3f3f46)",
			"--focus-color": "var(--color-ring, #6366f1)"
		})), qa(D.lastChild, {
			get hex() {
				return t(h);
			},
			get label() {
				return t(e);
			},
			isAlpha: !1,
			isTextInput: !0,
			textInputModes: ["hex"],
			position: "responsive",
			get components() {
				return t(r);
			},
			onInput: ({ hex: e }) => g(e)
		}), G(D);
	}
	G(E);
	var A = K(E, 2);
	re(A), G(T);
	var M = K(T, 2), N = (e) => {
		var t = Za(), i = I(t, !0);
		L(() => {
			J(t, 1, r(Lt), "svelte-r9ulp6"), j(i, n.error);
		}), w(e, t);
	};
	v(M, (e) => {
		n.error && e(N);
	}), G(b), L((e, t, r, i) => {
		J(b, 1, e, "svelte-r9ulp6"), J(T, 1, t, "svelte-r9ulp6"), J(E, 1, r, "svelte-r9ulp6"), O(A, "id", f()), O(A, "aria-invalid", n.error ? !0 : void 0), O(A, "placeholder", m()), H(A, p()), J(A, 1, i, "svelte-r9ulp6");
	}, [
		() => r(Z("input-color grid w-full min-w-0 gap-2", n.class)),
		() => r(Z("relative flex w-full min-w-0 items-stretch rounded-lg", Rt, ze.md, Ut(n.error))),
		() => r(Z("color-picker-slot grid h-full place-items-center rounded-l-lg border transition-colors", Kt(n.error), qt, Pe.md)),
		() => r(Z("box-border h-full min-h-0 min-w-0 w-full appearance-none truncate border border-l-0 outline-none transition-colors", "rounded-l-none rounded-r-lg", qt, Bt, Ve.md, Ht(n.error)))
	]), F("input", A, y), w(e, b), l();
}
e(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/resolve-select-items.svelte.ts
function to(e, n) {
	let r = Y(V([])), i = Y(!1), o = Y(0), s = a(() => {
		let n = e();
		return typeof n == "function" ? (t(o), t(r)) : n;
	}), c = a(() => typeof e() == "function" && (t(o), t(i)));
	return te(() => {
		n && n();
		let t = e();
		if (typeof t != "function") return;
		S(i, !0);
		let a = !1;
		return Promise.resolve(t()).then((e) => {
			a || (S(r, e, !0), S(i, !1), T(o));
		}, () => {
			a || (S(r, [], !0), S(i, !1), T(o));
		}), () => {
			a = !0;
		};
	}), {
		get items() {
			return t(s);
		},
		get loading() {
			return t(c);
		}
	};
}
function no(e, t) {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => e.label.toLowerCase().includes(n) || e.value.toLowerCase().includes(n)) : e;
}
function ro(e, t, n = 200, r = 36, i = 6) {
	let a = e.length * r, o = Math.max(0, Math.floor(t / r) - i), s = Math.ceil(n / r) + i * 2, c = Math.min(e.length, o + s);
	return {
		items: e.slice(o, c),
		startIndex: o,
		totalHeight: a,
		offsetY: o * r
	};
}
function io(e) {
	return e > 50;
}
function ao(e, t = 36) {
	return Math.max(0, e * t);
}
//#endregion
//#region ../ui/src/lib/components/input/input-select.svelte
var oo = h("<span>*</span>"), so = h(" <!>", 1), co = h("<span><!></span>"), lo = h("<!> <!>", 1), uo = h("<!> <!> <!>", 1), fo = h("<div><button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\"><!> <span><span> </span> <!></span></button></div> <!>", 1), po = h("<p> </p>"), mo = h("<div><!> <!> <!></div>");
function ho(e, n) {
	_(n, !0);
	let o = C(n, "searchable", 3, "auto"), s = C(n, "dialogTitle", 3, "Select option"), c = C(n, "dialogDescription", 3, "Search and select an option from the list."), u = C(n, "id", 19, Ae), f = C(n, "required", 3, !1), p = C(n, "type", 3, "single"), h = C(n, "value", 15), g = a(() => n.placeholder ?? "Select an option"), b = a(() => n.loadingPlaceholder ?? "Loading..."), x = a(() => n.searchPlaceholder ?? "Search values"), T = a(() => n.noResultsLabel ?? "No matches found"), E = Y(!1), A = Y(""), M = Ae(), N = Ae(), ee = to(() => n.items, () => n.reloadKey?.()), P = a(() => n.disabled ?? !1), R = a(() => p() === "multiple"), z = a(() => o() === !0 || o() !== !1 && ee.items.length >= 8), B = a(() => {
		if (ee.loading) return t(b);
		if (t(R)) {
			let e = h();
			if (e.length === 0) return t(g);
			let n = e.map((e) => ee.items.find((t) => t.value === e)?.label).filter(Boolean);
			return n.length > 0 ? n.join(", ") : t(g);
		}
		let e = h();
		return e ? ee.items.find((t) => t.value === e)?.label ?? e : t(g);
	}), V = a(() => t(R) ? h().length > 0 : !!h());
	function H(e) {
		S(E, e, !0), e || S(A, "");
	}
	function te(e) {
		return t(R) ? h().includes(e) : h() === e;
	}
	function U(e) {
		if (!e.disabled) {
			if (t(R)) {
				let t = [...h()], r = t.indexOf(e.value);
				r >= 0 ? t.splice(r, 1) : t.push(e.value), h(t), n.onValueChange?.(t);
				return;
			}
			h(e.value), n.onValueChange?.(e.value), S(E, !1);
		}
	}
	function re() {
		t(P) || S(E, !0);
	}
	async function ie(e) {
		n.dialogProps?.onOpenAutoFocus?.(e), !e.defaultPrevented && t(z) && (e.preventDefault(), await y(), document.getElementById(N)?.focus());
	}
	function X(e) {
		n.dialogProps?.onCloseAutoFocus?.(e), !e.defaultPrevented && e.preventDefault();
	}
	var ae = mo(), oe = W(ae), se = (e) => {
		Fr(e, {
			get for() {
				return u();
			},
			children: (e, t) => {
				k();
				var i = so(), a = D(i), o = K(a), s = (e) => {
					var t = oo();
					L(() => J(t, 1, r(Vt))), w(e, t);
				};
				v(o, (e) => {
					f() && e(s);
				}), L(() => j(a, `${n.label ?? ""} `)), w(e, i);
			},
			$$slots: { default: !0 }
		});
	};
	v(oe, (e) => {
		n.label && e(se);
	});
	var ce = K(oe, 2);
	m(ce, () => dt, (e, o) => {
		o(e, {
			onOpenChange: H,
			get open() {
				return t(E);
			},
			set open(e) {
				S(E, e, !0);
			},
			children: (e, o) => {
				var l = fo(), f = D(l), p = W(f), h = W(p), g = (e) => {
					var t = co(), i = W(t);
					Q(i, {
						get icon() {
							return n.prependIcon;
						},
						class: "size-6"
					}), G(t), L((e) => J(t, 1, e), [() => r(Z("grid h-full min-w-10 place-items-center rounded-l-lg border border-r-0 text-dark-50 transition-colors", Ht(n.error)))]), w(e, t);
				};
				v(h, (e) => {
					n.prependIcon && e(g);
				});
				var _ = K(h, 2), y = W(_), C = I(y, !0), R = K(y, 2);
				Q(R, {
					icon: "ri:expand-up-down-line",
					class: "size-5 shrink-0 text-dark-300"
				}), G(_), G(p), G(f);
				var H = K(f, 2);
				m(H, () => pt, (e, r) => {
					r(e, {
						children: (e, r) => {
							var o = lo(), l = D(o);
							m(l, () => mt, (e, t) => {
								t(e, { class: "z-60 bg-black/60 backdrop-blur-sm" });
							});
							var u = K(l, 2);
							{
								let e = a(() => n.dialogProps?.trapFocus ?? !1), r = a(() => n.dialogProps?.preventScroll ?? !1), o = a(() => Z("z-60", n.dialogProps?.class));
								m(u, () => ut, (l, u) => {
									u(l, ne(() => n.dialogProps, {
										get trapFocus() {
											return t(e);
										},
										get preventScroll() {
											return t(r);
										},
										onOpenAutoFocus: ie,
										onCloseAutoFocus: X,
										get class() {
											return t(o);
										},
										children: (e, r) => {
											var o = uo(), l = D(o);
											m(l, () => lt, (e, t) => {
												t(e, {
													class: "sr-only",
													children: (e, t) => {
														k();
														var n = i();
														L(() => j(n, s())), w(e, n);
													},
													$$slots: { default: !0 }
												});
											});
											var u = K(l, 2);
											m(u, () => ft, (e, t) => {
												t(e, {
													class: "sr-only",
													children: (e, t) => {
														k();
														var n = i();
														L(() => j(n, c())), w(e, n);
													},
													$$slots: { default: !0 }
												});
											});
											var f = K(u, 2);
											{
												let e = a(() => !ee.loading), r = a(() => Z(n.commandProps?.class));
												m(f, () => Be, (o, s) => {
													s(o, ne(() => n.commandProps, {
														get shouldFilter() {
															return t(e);
														},
														get class() {
															return t(r);
														},
														children: (e, n) => {
															var r = lo(), o = D(r), s = (e) => {
																var n = q(), r = D(n);
																m(r, () => Ue, (e, n) => {
																	n(e, {
																		get id() {
																			return N;
																		},
																		get placeholder() {
																			return t(x);
																		},
																		get "aria-label"() {
																			return t(x);
																		},
																		get value() {
																			return t(A);
																		},
																		set value(e) {
																			S(A, e, !0);
																		}
																	});
																}), w(e, n);
															};
															v(o, (e) => {
																t(z) && e(s);
															});
															var c = K(o, 2);
															m(c, () => Ne, (e, n) => {
																n(e, {
																	get id() {
																		return M;
																	},
																	class: "mt-2",
																	children: (e, n) => {
																		var r = q(), o = D(r);
																		m(o, () => Me, (e, n) => {
																			n(e, {
																				children: (e, n) => {
																					var r = q(), o = D(r), s = (e) => {
																						var n = q(), r = D(n);
																						m(r, () => He, (e, n) => {
																							n(e, {
																								children: (e, n) => {
																									k();
																									var r = i();
																									L(() => j(r, t(b))), w(e, r);
																								},
																								$$slots: { default: !0 }
																							});
																						}), w(e, n);
																					}, c = (e) => {
																						var n = lo(), r = D(n);
																						m(r, () => Ie, (e, n) => {
																							n(e, {
																								children: (e, n) => {
																									k();
																									var r = i();
																									L(() => j(r, t(T))), w(e, r);
																								},
																								$$slots: { default: !0 }
																							});
																						});
																						var o = K(r, 2);
																						d(o, 17, () => ee.items, (e) => e.value, (e, n) => {
																							var r = q(), i = D(r);
																							{
																								let e = a(() => [t(n).label, t(n).value]);
																								m(i, () => Re, (r, i) => {
																									i(r, {
																										get value() {
																											return t(n).value;
																										},
																										get keywords() {
																											return t(e);
																										},
																										get disabled() {
																											return t(n).disabled;
																										},
																										onSelect: () => U(t(n)),
																										children: (e, r) => {
																											k();
																											var i = so(), o = D(i), s = K(o), c = (e) => {
																												Q(e, {
																													icon: "ri:check-line",
																													class: "size-5 text-primary"
																												});
																											}, l = a(() => te(t(n).value));
																											v(s, (e) => {
																												t(l) && e(c);
																											}), L(() => j(o, `${t(n).label ?? ""} `)), w(e, i);
																										},
																										$$slots: { default: !0 }
																									});
																								});
																							}
																							w(e, r);
																						}), w(e, n);
																					};
																					v(o, (e) => {
																						ee.loading ? e(s) : e(c, -1);
																					}), w(e, r);
																				},
																				$$slots: { default: !0 }
																			});
																		}), w(e, r);
																	},
																	$$slots: { default: !0 }
																});
															}), w(e, r);
														},
														$$slots: { default: !0 }
													}));
												});
											}
											w(e, o);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							w(e, o);
						},
						$$slots: { default: !0 }
					});
				}), L((e, n, r, i) => {
					J(f, 1, e), O(p, "id", u()), O(p, "aria-expanded", t(E)), O(p, "aria-controls", t(E) ? M : void 0), p.disabled = t(P), J(p, 1, n), J(_, 1, r), J(y, 1, i), j(C, t(B));
				}, [
					() => r(Z("relative flex w-full min-w-0 items-center rounded-lg", Rt, Ut(n.error))),
					() => r(Z("flex w-full min-w-0 cursor-pointer items-center outline-none", Bt)),
					() => r(Z("flex w-full items-center justify-between gap-2 border outline-none transition-colors", qt, Le.md, Ht(n.error), {
						"rounded-l-none rounded-r-lg border-l-0": n.prependIcon,
						"rounded-lg": !n.prependIcon
					})),
					() => r(Z("min-w-0 flex-1 truncate text-left", !t(V) && "text-dark-300"))
				]), F("click", p, re), w(e, l);
			},
			$$slots: { default: !0 }
		});
	});
	var le = K(ce, 2), ue = (e) => {
		var t = po(), i = I(t, !0);
		L(() => {
			J(t, 1, r(Lt)), j(i, n.error);
		}), w(e, t);
	};
	v(le, (e) => {
		n.error && e(ue);
	}), G(ae), L((e) => J(ae, 1, e), [() => r(Z("relative grid w-full min-w-0 gap-2", n.class))]), w(e, ae), l();
}
e(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/cron-expression-editor.svelte
var go = h("<div><p class=\"text-[10px] font-semibold tracking-[0.14em] text-dark-400 uppercase\"> </p> <p> </p></div>"), _o = h("<span><!> </span>"), vo = h("<p class=\"text-xs text-dark-200\"><span class=\"text-dark-400\"> </span> <span class=\"font-medium text-primary-100\"> </span></p>"), yo = h("<div class=\"overflow-hidden rounded-lg border border-border bg-dark-800/40 transition-all duration-200 focus-within:border-ring/50 focus-within:ring-2 focus-within:ring-ring/20\"><div class=\"grid grid-cols-5 border-b border-dark-600/80 bg-dark-900/40 px-2 py-1.5\"></div> <div class=\"relative flex items-center gap-2 px-3 py-2\"><!> <input autocomplete=\"off\"/> <!></div> <div class=\"flex flex-wrap items-center justify-between gap-2 border-t border-dark-600/80 bg-dark-900/30 px-3 py-2\"><div class=\"min-w-40 max-w-xs flex-1\"><!></div> <!></div></div>");
function bo(e, n) {
	_(n, !0);
	let i = C(n, "value", 3, ""), o = C(n, "placeholder", 3, "0 9 * * 1-5"), s = C(n, "presets", 3, ae), c = C(n, "validLabel", 3, "Valid expression"), u = C(n, "invalidLabel", 3, "Invalid cron expression"), f = C(n, "nextRunLabel", 3, "Next run"), p = C(n, "presetsPlaceholder", 3, "Presets"), m = Ae(), h = new ue(() => i(), 250), g = a(() => ({
		minute: n.fieldLabels?.minute ?? "Minute",
		hour: n.fieldLabels?.hour ?? "Hour",
		day: n.fieldLabels?.day ?? "Day",
		month: n.fieldLabels?.month ?? "Month",
		weekday: n.fieldLabels?.weekday ?? "Weekday"
	})), y = a(() => ce(i())), b = a(() => oe(h.current)), x = a(() => X(t(b))), S = a(() => !!t(b) && !t(x)), T = a(() => t(x) === "Invalid cron expression" ? u() : t(x)), E = a(() => t(S) ? se(t(b)) : void 0), D = a(() => s().map((e) => ({
		value: e.value,
		label: e.label
	}))), k = {
		minute: "text-sky-300 light:text-sky-700",
		hour: "text-violet-300 light:text-violet-700",
		day: "text-emerald-300 light:text-emerald-700",
		month: "text-amber-300 light:text-amber-700",
		weekday: "text-rose-300 light:text-rose-700"
	}, A = (e) => {
		n.oninput?.(e);
	};
	function M(e) {
		n.oninput?.({ currentTarget: { value: e } });
	}
	var N = yo(), ee = W(N);
	d(ee, 22, () => le, (e) => e, (e, n, i) => {
		var a = go(), o = W(a), s = I(o, !0), c = K(o, 2), l = I(c, !0);
		G(a), L((e, r) => {
			J(a, 1, e), j(s, t(g)[n]), J(c, 1, r), j(l, t(y)[t(i)] || "—");
		}, [() => r(Z("px-1 text-center", t(i) < 4 && "border-r border-dark-700/50")), () => r(Z("mt-0.5 truncate font-mono text-xs", k[n]))]), w(e, a);
	}), G(ee);
	var P = K(ee, 2), R = W(P);
	Q(R, {
		icon: "ri:time-line",
		class: "size-5 shrink-0 text-dark-400"
	});
	var z = K(R, 2);
	re(z), O(z, "spellcheck", !1);
	var B = K(z, 2), V = (e) => {
		var n = _o(), i = W(n);
		{
			let e = a(() => t(S) ? "ri:check-line" : "ri:alert-line");
			Q(i, {
				get icon() {
					return t(e);
				},
				class: "size-4"
			});
		}
		var o = K(i);
		G(n), L((e) => {
			J(n, 1, e), j(o, ` ${(t(S) ? c() : t(T)) ?? ""}`);
		}, [() => r(Z("inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium", t(S) ? "bg-green-500/10 text-green-400 light:text-green-700 border-green-500/20" : "bg-amber-500/10 text-amber-400 light:text-amber-700 border-amber-500/20"))]), w(e, n);
	};
	v(B, (e) => {
		t(b) && e(V);
	}), G(P);
	var te = K(P, 2), ne = W(te), U = W(ne), q = () => "", Y = (e) => {
		e && M(e);
	};
	ho(U, {
		type: "single",
		get placeholder() {
			return p();
		},
		get items() {
			return t(D);
		},
		get value() {
			return q();
		},
		set value(e) {
			Y(e);
		}
	}), G(ne);
	var ie = K(ne, 2), de = (e) => {
		var n = vo(), r = W(n), i = I(r), a = K(r, 2), o = I(a, !0);
		G(n), L(() => {
			j(i, `${f() ?? ""}:`), j(o, t(E));
		}), w(e, n);
	};
	v(ie, (e) => {
		t(E) && e(de);
	}), G(te), G(N), L((e) => {
		O(z, "id", m), J(z, 1, e), O(z, "placeholder", o()), z.required = n.required, H(z, i() ?? "");
	}, [() => r(Z("min-w-0 flex-1 border-0 bg-transparent font-mono text-sm text-dark-50 outline-none", Le.md, "px-0 py-0"))]), F("input", z, A), w(e, N), l();
}
e(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-cron-expression.svelte
var xo = h("<button><!> <span> </span> <!> <!></button>"), So = h("<p class=\"mb-3 text-xs font-semibold tracking-wide text-dark-200 uppercase\"> </p> <!>", 1), Co = h("<!> <!>", 1), wo = h("<p> </p>"), To = h("<div><!> <!> <!></div>");
function Eo(e, n) {
	_(n, !0);
	let o = C(n, "id", 19, Ae), s = C(n, "value", 3, ""), c = C(n, "placeholder", 3, "0 9 * * 1-5"), u = C(n, "validLabel", 3, "Valid expression"), d = C(n, "invalidLabel", 3, "Invalid cron expression"), f = C(n, "nextRunLabel", 3, "Next run"), p = C(n, "presetsPlaceholder", 3, "Presets"), m = C(n, "editorTitle", 3, "Cron expression"), h = C(n, "emptyLabel", 3, "Configure cron expression"), g = C(n, "editAriaLabel", 3, "Edit cron expression"), y = Y(!1), b = a(() => oe(s())), x = a(() => X(t(b))), T = a(() => !!t(b) && !t(x)), E = a(() => t(b) || h()), O = a(() => !t(b));
	var A = To(), M = W(A), N = (e) => {
		Fr(e, {
			get for() {
				return o();
			},
			children: (e, t) => {
				k();
				var r = i();
				L(() => j(r, n.label)), w(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	v(M, (e) => {
		n.label && e(N);
	});
	var ee = K(M, 2);
	kt(ee, {
		get open() {
			return t(y);
		},
		set open(e) {
			S(y, e, !0);
		},
		children: (e, i) => {
			var l = Co(), h = D(l);
			At(h, {
				child: (e, i) => {
					let s = () => (i?.()).props;
					var c = xo();
					B(c, (e) => ({
						id: o(),
						type: "button",
						...s(),
						"aria-label": g(),
						class: e
					}), [() => Z("flex w-full items-center gap-2 rounded-lg border text-left outline-none transition-all", qt, Le.md, "focus-visible:ring-2", n.error ? "border-destructive focus-visible:border-destructive/50 focus-visible:ring-destructive" : "border-border hover:border-dark-400 focus-visible:border-ring/50 focus-visible:ring-ring")]);
					var l = W(c);
					Q(l, {
						icon: "ri:time-line",
						class: "size-5 shrink-0 text-dark-400"
					});
					var u = K(l, 2), d = I(u, !0), f = K(u, 2), p = (e) => {
						{
							let n = a(() => t(T) ? "ri:check-line" : "ri:alert-line"), r = a(() => Z("size-5 shrink-0", t(T) ? "text-green-400 light:text-green-700" : "text-amber-400 light:text-amber-700"));
							Q(e, {
								get icon() {
									return t(n);
								},
								get class() {
									return t(r);
								}
							});
						}
					};
					v(f, (e) => {
						t(b) && e(p);
					});
					var m = K(f, 2);
					{
						let e = a(() => Z("size-5 shrink-0 text-dark-300 transition-transform", t(y) && "rotate-180"));
						Q(m, {
							icon: "ri:arrow-down-s-line",
							get class() {
								return t(e);
							}
						});
					}
					G(c), L((e) => {
						J(u, 1, e), j(d, t(E));
					}, [() => r(Z("min-w-0 flex-1 truncate text-sm", t(O) ? "font-sans text-dark-300" : "font-mono text-dark-50"))]), w(e, c);
				},
				$$slots: { child: !0 }
			});
			var _ = K(h, 2);
			Ot(_, {
				align: "start",
				class: "w-[min(28rem,calc(100vw-2rem))] p-3",
				children: (e, t) => {
					var r = So(), i = D(r), a = I(i, !0);
					bo(K(i, 2), {
						get value() {
							return s();
						},
						get required() {
							return n.required;
						},
						get placeholder() {
							return c();
						},
						get presets() {
							return n.presets;
						},
						get fieldLabels() {
							return n.fieldLabels;
						},
						get validLabel() {
							return u();
						},
						get invalidLabel() {
							return d();
						},
						get nextRunLabel() {
							return f();
						},
						get presetsPlaceholder() {
							return p();
						},
						get oninput() {
							return n.oninput;
						}
					}), L(() => j(a, m())), w(e, r);
				},
				$$slots: { default: !0 }
			}), w(e, l);
		},
		$$slots: { default: !0 }
	});
	var P = K(ee, 2), F = (e) => {
		var t = wo(), i = I(t, !0);
		L(() => {
			J(t, 1, r(Lt)), j(i, n.error);
		}), w(e, t);
	};
	v(P, (e) => {
		n.error && e(F);
	}), G(A), L((e) => J(A, 1, e), [() => r(Z("relative grid w-full gap-2", n.class))]), w(e, A), l();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text.svelte
var Do = /* @__PURE__ */ new Set([
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
	"tabindex",
	"class"
]), Oo = h("<span><!></span>"), ko = h("<button type=\"button\"><!></button>"), Ao = h("<p> </p>"), jo = h("<div><!> <div><!> <input/> <!> <!> <!></div> <!></div>");
function Mo(e, n) {
	_(n, !0);
	let o = C(n, "id", 19, Ae), s = C(n, "copyable", 3, !1), c = C(n, "copyLabel", 3, "Copy"), u = C(n, "copiedLabel", 3, "Copied"), d = C(n, "size", 3, "md"), f = R(n, Do), p = Y(!1), m = new Pt(), h = a(() => m.isCopied()), y = a(() => n.type === "password"), b = a(() => !!n.appendIcon || t(y) || s()), x = a(() => s() ? n.readonly ?? !0 : n.readonly), T = a(() => s() && t(x));
	N(() => m.destroy());
	var E = jo(), D = W(E), A = (e) => {
		Fr(e, {
			get for() {
				return o();
			},
			children: (e, t) => {
				k();
				var r = i();
				L(() => j(r, n.label)), w(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	v(D, (e) => {
		n.label && e(A);
	});
	var M = K(D, 2), ee = W(M), P = (e) => {
		var t = Oo(), i = W(t);
		Q(i, {
			get icon() {
				return n.prependIcon;
			},
			get class() {
				return Fe[d()];
			}
		}), G(t), L((e) => J(t, 1, e), [() => r(Z("grid h-full place-items-center rounded-l-lg border text-dark-50 transition-colors", Kt(n.error), qt, Pe[d()]))]), w(e, t);
	};
	v(ee, (e) => {
		n.prependIcon && e(P);
	});
	var z = K(ee, 2);
	B(z, (e) => ({
		id: o(),
		"aria-invalid": n.error ? !0 : void 0,
		value: n.value,
		readonly: t(x),
		tabindex: t(T) ? -1 : n.tabindex,
		...f,
		class: e,
		type: t(y) ? t(p) ? "text" : "password" : n.type
	}), [() => Z("box-border h-full min-h-0 min-w-0 w-full appearance-none truncate border outline-none transition-colors", qt, Bt, Ve[d()], Ht(n.error), {
		"rounded-l-none rounded-r-lg border-l-0": n.prependIcon && !t(b),
		"rounded-l-none border-l-0": n.prependIcon && t(b),
		"rounded-l-lg rounded-r-none border-r-0": !n.prependIcon && t(b),
		"rounded-lg": !n.prependIcon && !t(b)
	})], void 0, void 0, void 0, !0);
	var V = K(z, 2), H = (e) => {
		var i = Oo(), a = W(i);
		Q(a, {
			get icon() {
				return n.appendIcon;
			},
			get class() {
				return Fe[d()];
			}
		}), G(i), L((e) => J(i, 1, e), [() => r(Z("grid h-full place-items-center text-dark-50 transition-colors", Pe[d()], t(y) || s() ? Z("border-y border-r-0 border-l", Kt(n.error)) : Z("rounded-r-lg border border-l-0", Kt(n.error))))]), w(e, i);
	};
	v(V, (e) => {
		n.appendIcon && e(H);
	});
	var te = K(V, 2), ne = (e) => {
		var i = ko(), o = W(i);
		{
			let e = a(() => t(h) ? It : Ft);
			Q(o, {
				get icon() {
					return t(e);
				},
				get class() {
					return Fe[d()];
				}
			});
		}
		G(i), g(i, () => Mt(() => t(h) ? u() : c())), L((e) => {
			J(i, 1, e), O(i, "aria-label", t(h) ? u() : c());
		}, [() => r(Z("grid h-full place-items-center rounded-r-lg border", Kt(n.error), qt, t(h) ? "text-success-400" : "text-dark-50", Pe[d()]))]), F("click", i, () => void m.copy(String(n.value ?? ""), "value")), w(e, i);
	};
	v(te, (e) => {
		s() && e(ne);
	});
	var U = K(te, 2), re = (e) => {
		var i = ko(), o = W(i);
		{
			let e = a(() => t(p) ? "ri:eye-off-line" : "ri:eye-line");
			Q(o, {
				get icon() {
					return t(e);
				},
				get class() {
					return Fe[d()];
				}
			});
		}
		G(i), L((e) => {
			J(i, 1, e), O(i, "aria-label", t(p) ? "Hide password" : "Show password"), O(i, "aria-pressed", t(p));
		}, [() => r(Z("grid h-full place-items-center rounded-r-lg border text-dark-50 transition-colors", Kt(n.error), qt, Pe[d()]))]), F("click", i, () => S(p, !t(p))), w(e, i);
	};
	v(U, (e) => {
		t(y) && e(re);
	}), G(M);
	var q = K(M, 2), ie = (e) => {
		var t = Ao(), i = I(t, !0);
		L(() => {
			J(t, 1, r(Lt)), j(i, n.error);
		}), w(e, t);
	};
	v(q, (e) => {
		n.error && e(ie);
	}), G(E), L((e, t) => {
		J(E, 1, e), J(M, 1, t);
	}, [() => r(Z("relative grid w-full min-w-0 gap-2", n.class)), () => r(Z("relative flex w-full min-w-0 items-stretch rounded-lg", Rt, ze[d()], !t(T) && Ut(n.error)))]), w(e, E), l();
}
e(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-file.svelte
var No = h("<div class=\"flex items-center gap-3\"><!></div>"), Po = h("<div class=\"grid gap-2\"><!> <!> <div class=\"flex flex-wrap items-center gap-2\"><!> <!> <!></div></div>");
function Fo(e, n) {
	_(n, !0);
	let r = C(n, "value", 3, ""), o = C(n, "browseLabel", 3, "Upload"), s = C(n, "cloudLabel", 3, "Cloud"), c = C(n, "clearLabel", 3, "Clear"), u = C(n, "emptyLabel", 3, "No file selected"), d = Y(!1);
	async function f(e) {
		if (!t(d)) {
			S(d, !0);
			try {
				let t = await e();
				if (!t) return;
				n.onValueChange?.(t);
			} finally {
				S(d, !1);
			}
		}
	}
	var p = Po(), m = W(p), h = (e) => {
		var t = No(), r = W(t);
		U(r, () => n.preview), G(t), w(e, t);
	};
	v(m, (e) => {
		n.preview && e(h);
	});
	var g = K(m, 2);
	{
		let e = a(() => n.placeholder ?? u());
		Mo(g, {
			get label() {
				return n.label;
			},
			get placeholder() {
				return t(e);
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
	var y = K(g, 2), b = W(y);
	Nt(b, {
		type: "button",
		variant: "outline",
		onclick: () => void f(n.onBrowse),
		get disabled() {
			return t(d);
		},
		get isLoading() {
			return t(d);
		},
		icon: "ri:upload-2-line",
		children: (e, t) => {
			k();
			var n = i();
			L(() => j(n, o())), w(e, n);
		},
		$$slots: { default: !0 }
	});
	var x = K(b, 2), T = (e) => {
		Nt(e, {
			type: "button",
			variant: "outline",
			onclick: () => void f(n.onCloudBrowse),
			get disabled() {
				return t(d);
			},
			get isLoading() {
				return t(d);
			},
			icon: "ri:cloud-line",
			children: (e, t) => {
				k();
				var n = i();
				L(() => j(n, s())), w(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	v(x, (e) => {
		n.onCloudBrowse && e(T);
	});
	var E = K(x, 2), D = (e) => {
		Nt(e, {
			type: "button",
			variant: "ghost",
			onclick: () => n.onClear(),
			icon: "ri:close-line",
			children: (e, t) => {
				k();
				var n = i();
				L(() => j(n, c())), w(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	v(E, (e) => {
		n.onClear && r() && e(D);
	}), G(y), G(p), w(e, p), l();
}
//#endregion
//#region ../ui/src/lib/components/input/input-file-path.svelte
var Io = h("<div class=\"grid gap-2\"><!> <div class=\"flex flex-wrap items-center gap-2\"><!> <!> <!></div></div>");
function Lo(e, n) {
	_(n, !0);
	let r = C(n, "value", 3, ""), o = C(n, "browseLabel", 3, "Browse"), s = C(n, "emptyFileLabel", 3, "No file selected"), c = C(n, "emptyFolderLabel", 3, "No folder selected"), u = C(n, "uploadLabel", 3, "Upload"), d = C(n, "cloudLabel", 3, "Cloud"), f = Y(!1);
	async function p(e) {
		if (!t(f)) {
			S(f, !0);
			try {
				let t = await e();
				if (!t) return;
				n.onValueChange?.(t);
			} finally {
				S(f, !1);
			}
		}
	}
	var m = Io(), h = W(m);
	{
		let e = a(() => n.placeholder ?? (n.mode === "folder" ? c() : s()));
		Mo(h, {
			get label() {
				return n.label;
			},
			get placeholder() {
				return t(e);
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
	var g = K(h, 2), y = W(g), b = (e) => {
		Nt(e, {
			type: "button",
			variant: "outline",
			onclick: () => void p(n.onUpload),
			get disabled() {
				return t(f);
			},
			get isLoading() {
				return t(f);
			},
			icon: "ri:upload-2-line",
			children: (e, t) => {
				k();
				var n = i();
				L(() => j(n, u())), w(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	v(y, (e) => {
		n.onUpload && e(b);
	});
	var x = K(y, 2), T = (e) => {
		Nt(e, {
			type: "button",
			variant: "outline",
			onclick: () => void p(n.onCloudBrowse),
			get disabled() {
				return t(f);
			},
			get isLoading() {
				return t(f);
			},
			icon: "ri:cloud-line",
			children: (e, t) => {
				k();
				var n = i();
				L(() => j(n, d())), w(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	v(x, (e) => {
		n.onCloudBrowse && e(T);
	});
	var E = K(x, 2), D = (e) => {
		Nt(e, {
			type: "button",
			variant: "outline",
			onclick: () => void p(n.onBrowse),
			get disabled() {
				return t(f);
			},
			get isLoading() {
				return t(f);
			},
			icon: "ri:folder-open-line",
			children: (e, t) => {
				k();
				var n = i();
				L(() => j(n, o())), w(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	v(E, (e) => {
		!n.onUpload && !n.onCloudBrowse && e(D);
	}), G(g), G(m), w(e, m), l();
}
//#endregion
//#region ../ui/src/lib/components/input/input-hotkey.svelte
var Ro = h("<p> </p>"), zo = h("<div class=\"grid w-full min-w-0 gap-2\"><!> <button type=\"button\"><!> <span><!></span></button> <!></div>");
function Bo(e, n) {
	_(n, !0);
	let o = C(n, "placeholder", 3, "Click and press keys…");
	C(n, "required", 3, !1);
	let s = C(n, "value", 15, ""), c = C(n, "captureLabel", 3, "Press shortcut…"), u = C(n, "emptyLabel", 3, "Not set"), d = Ae(), p = Y(!1);
	function m(e) {
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
	function h(e) {
		if (e.key === "Control" || e.key === "Shift" || e.key === "Alt" || e.key === "Meta") return null;
		let t = [];
		(e.ctrlKey || e.metaKey) && t.push("CommandOrControl"), e.altKey && t.push("Alt"), e.shiftKey && t.push("Shift");
		let n = m(e.code);
		return n ? [...t, n].join("+") : null;
	}
	function g(e) {
		return e.trim() ? e.split("+").map((e) => e === "CommandOrControl" ? "Ctrl" : e).join(" + ") : "";
	}
	let y = a(() => s().trim() ? g(s()) : "");
	function b() {
		S(p, !0);
	}
	function x() {
		S(p, !1);
	}
	let T = (e) => {
		if (!t(p)) return;
		if (e.preventDefault(), e.stopPropagation(), e.key === "Escape") {
			x();
			return;
		}
		let n = h(e);
		n && (s(n), x());
	}, E = () => {
		x();
	};
	var D = zo(), A = W(D), M = (e) => {
		Fr(e, {
			get for() {
				return d;
			},
			children: (e, t) => {
				k();
				var r = i();
				L(() => j(r, n.label)), w(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	v(A, (e) => {
		n.label && e(M);
	});
	var N = K(A, 2), ee = W(N);
	Q(ee, {
		icon: "ri:keyboard-line",
		class: "size-4 shrink-0 text-dark-200"
	});
	var P = K(ee, 2), R = W(P), z = (e) => {
		var t = i();
		L(() => j(t, c())), w(e, t);
	}, B = (e) => {
		var n = i();
		L(() => j(n, t(y))), w(e, n);
	}, V = (e) => {
		var t = i();
		L(() => j(t, o() || u())), w(e, t);
	};
	v(R, (e) => {
		t(p) ? e(z) : t(y) ? e(B, 1) : e(V, -1);
	}), G(P), G(N);
	var H = K(N, 2), te = (e) => {
		var t = Ro(), i = I(t, !0);
		L(() => {
			J(t, 1, r(Lt)), j(i, n.error);
		}), w(e, t);
	};
	v(H, (e) => {
		n.error && e(te);
	}), G(D), L((e, t) => {
		O(N, "id", d), J(N, 1, e), J(P, 1, t);
	}, [() => r(Z("flex h-10 w-full items-center gap-2 rounded-lg border px-4 text-left text-sm", "bg-dark-800 focus:ring-2 focus:ring-ring focus:outline-none", t(p) && "ring-2 ring-ring", Ht(n.error))), () => r(Z("truncate font-mono", !t(y) && "text-dark-300"))]), F("click", N, b), F("keydown", N, T), f("blur", N, E), w(e, D), l();
}
e(["click", "keydown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-variables.svelte
var Vo = /* @__PURE__ */ new Set([
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
]), Ho = h("<p> </p>"), Uo = h("<div><!> <div><input/></div> <!> <!></div>");
function Wo(e, n) {
	_(n, !0);
	let o = C(n, "variables", 19, () => []), s = C(n, "value", 15, ""), c = C(n, "id", 19, Ae), u = R(n, Vo), d = a(() => `${c()}-listbox`), f = new Yt({
		variables: () => o(),
		onChange: (e) => s(e)
	});
	var p = Uo(), m = W(p), h = (e) => {
		Fr(e, {
			get for() {
				return c();
			},
			children: (e, t) => {
				k();
				var r = i();
				L(() => j(r, n.label)), w(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	v(m, (e) => {
		n.label && e(h);
	});
	var y = K(m, 2), b = W(y);
	B(b, (e, r) => ({
		id: c(),
		placeholder: n.placeholder,
		class: e,
		role: o().length > 0 ? "combobox" : void 0,
		"aria-invalid": n.error ? !0 : void 0,
		"aria-autocomplete": o().length > 0 ? "list" : void 0,
		"aria-expanded": o().length > 0 ? f.isOpen : void 0,
		"aria-controls": o().length > 0 ? t(d) : void 0,
		"aria-activedescendant": r,
		oninput: n.oninput,
		...u
	}), [() => Z("min-w-0 w-full truncate rounded-lg border outline-none", qt, Bt, Le.md, Ht(n.error)), () => f.isOpen ? Zt(t(d), f.highlightedIndex) : void 0], void 0, void 0, void 0, !0), g(b, () => f.attach), G(y);
	var x = K(y, 2);
	Qt(x, {
		get autocomplete() {
			return f;
		},
		get id() {
			return t(d);
		}
	});
	var S = K(x, 2), T = (e) => {
		var t = Ho(), i = I(t, !0);
		L(() => {
			J(t, 1, r(Lt)), j(i, n.error);
		}), w(e, t);
	};
	v(S, (e) => {
		n.error && e(T);
	}), G(p), L((e, t) => {
		J(p, 1, e), J(y, 1, t);
	}, [() => r(Z("relative grid w-full min-w-0 gap-2", n.class)), () => r(Z("relative flex w-full min-w-0 items-center rounded-lg", Gt(n.error)))]), A(b, s), w(e, p), l();
}
//#endregion
//#region ../ui/src/lib/components/input/input-key-value-list.svelte
var Go = h("<div class=\"grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] items-center gap-2\"><!> <!> <!></div>"), Ko = h("<p class=\"text-sm text-destructive-50\"> </p>"), qo = h("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function Jo(e, n) {
	_(n, !0);
	let o = C(n, "entries", 31, () => V([])), s = C(n, "keyPlaceholder", 3, "KEY"), c = C(n, "valuePlaceholder", 3, "value"), u = C(n, "variables", 19, () => []), f = C(n, "id", 19, Ae), p = C(n, "addLabel", 3, "Add"), m = C(n, "removeLabel", 3, "Remove"), h = Y(V([]));
	function g(e) {
		return e.map((e) => ({
			id: crypto.randomUUID(),
			key: e.key,
			value: e.value
		}));
	}
	function y() {
		o(t(h).map((e) => ({
			key: e.key,
			value: e.value
		})));
	}
	function b(e, n) {
		S(h, t(h).map((t) => t.id === e ? {
			...t,
			...n
		} : t), !0), y();
	}
	function x(e) {
		S(h, t(h).filter((t) => t.id !== e), !0), y();
	}
	function T() {
		S(h, [...t(h), {
			id: crypto.randomUUID(),
			key: "",
			value: ""
		}], !0), y();
	}
	ee(() => {
		let e = o(), n = t(h).map((e) => ({
			key: e.key,
			value: e.value
		}));
		e.length === n.length && e.every((e, t) => e.key === n[t]?.key && e.value === n[t]?.value) || S(h, g(e), !0);
	});
	var E = qo(), D = W(E), A = (e) => {
		{
			let r = a(() => `${f()}-label`);
			Fr(e, {
				get id() {
					return t(r);
				},
				children: (e, t) => {
					k();
					var r = i();
					L(() => j(r, n.label)), w(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	v(D, (e) => {
		n.label && e(A);
	});
	var M = K(D, 2), N = W(M);
	d(N, 17, () => t(h), (e) => e.id, (e, n) => {
		var r = Go(), i = W(r);
		{
			let e = a(() => `${f()}-${t(n).id}-key`);
			Mo(i, {
				get id() {
					return t(e);
				},
				get placeholder() {
					return s();
				},
				get value() {
					return t(n).key;
				},
				oninput: (e) => b(t(n).id, { key: e.currentTarget.value })
			});
		}
		var o = K(i, 2), l = () => t(n).value, d = (e) => b(t(n).id, { value: e });
		{
			let e = a(() => `${f()}-${t(n).id}-value`);
			Wo(o, {
				get id() {
					return t(e);
				},
				get placeholder() {
					return c();
				},
				get variables() {
					return u();
				},
				get value() {
					return l();
				},
				set value(e) {
					d(e);
				}
			});
		}
		var p = K(o, 2);
		Nt(p, {
			variant: "ghost",
			size: "icon",
			type: "button",
			get "aria-label"() {
				return m();
			},
			onclick: () => x(t(n).id),
			children: (e, t) => {
				Q(e, {
					icon: "ri:delete-bin-line",
					class: "size-5",
					"aria-hidden": "true"
				});
			},
			$$slots: { default: !0 }
		}), G(r), w(e, r);
	});
	var P = K(N, 2);
	Nt(P, {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: T,
		children: (e, t) => {
			k();
			var n = i();
			L(() => j(n, p())), w(e, n);
		},
		$$slots: { default: !0 }
	}), G(M);
	var F = K(M, 2), R = (e) => {
		var t = Ko(), r = I(t, !0);
		L(() => j(r, n.error)), w(e, t);
	};
	v(F, (e) => {
		n.error && e(R);
	}), G(E), L((e) => {
		J(E, 1, e), O(E, "aria-labelledby", n.label ? `${f()}-label` : void 0);
	}, [() => r(Z("grid w-full gap-2", n.class))]), w(e, E), l();
}
//#endregion
//#region ../ui/src/lib/components/input/input-one-of.svelte
var Yo = h("<span aria-hidden=\"true\">*</span>"), Xo = h(" <!>", 1), Zo = h("<button type=\"button\" role=\"tab\"> </button>"), Qo = h("<p> </p>"), $o = h("<div><!> <div role=\"tablist\"></div> <div class=\"min-w-0\" role=\"tabpanel\"><!></div> <!></div>");
function es(e, n) {
	_(n, !0);
	let i = C(n, "value", 31, () => V({
		variant: "",
		values: {}
	})), o = a(() => i().variant || n.variants[0]?.id || "");
	function s(e) {
		i({
			...i(),
			variant: e
		});
	}
	function c(e, t) {
		i({
			variant: i().variant || e,
			values: {
				...i().values,
				[e]: t
			}
		});
	}
	var u = $o(), f = W(u), p = (e) => {
		Fr(e, {
			children: (e, t) => {
				k();
				var i = Xo(), a = D(i), o = K(a), s = (e) => {
					var t = Yo();
					L(() => J(t, 1, r(Vt))), w(e, t);
				};
				v(o, (e) => {
					n.required && e(s);
				}), L(() => j(a, `${n.label ?? ""} `)), w(e, i);
			},
			$$slots: { default: !0 }
		});
	};
	v(f, (e) => {
		n.label && e(p);
	});
	var m = K(f, 2);
	d(m, 21, () => n.variants, (e) => e.id, (e, n) => {
		var i = Zo(), a = I(i, !0);
		L((e) => {
			O(i, "id", `tab-${t(n).id}`), O(i, "aria-selected", t(o) === t(n).id), O(i, "aria-controls", `panel-${t(n).id}`), J(i, 1, e), j(a, t(n).label);
		}, [() => r(Z("cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors", t(o) === t(n).id ? "bg-dark-600 text-dark-50" : "text-dark-200 hover:bg-dark-800 hover:text-dark-50"))]), F("click", i, () => s(t(n).id)), w(e, i);
	}), G(m);
	var h = K(m, 2), g = W(h);
	U(g, () => n.panel, () => ({
		variantId: t(o),
		value: i().values[t(o)],
		setValue: (e) => c(t(o), e)
	})), G(h);
	var y = K(h, 2), b = (e) => {
		var t = Qo(), i = I(t, !0);
		L(() => {
			J(t, 1, r(Lt)), j(i, n.error);
		}), w(e, t);
	};
	v(y, (e) => {
		n.error && e(b);
	}), G(u), L((e, r) => {
		J(u, 1, e), J(m, 1, r), O(m, "aria-label", n.label), O(h, "id", `panel-${t(o)}`), O(h, "aria-labelledby", `tab-${t(o)}`);
	}, [() => r(Z("grid w-full min-w-0 gap-3")), () => r(Z("inline-flex w-fit gap-0.5 rounded-lg border border-border bg-dark-800 p-1", n.error && "border-destructive"))]), w(e, u), l();
}
e(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-select-text.svelte
var ts = /* @__PURE__ */ new Set([
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
]), ns = h("<!> <!>", 1), rs = h("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), is = h(" <!>", 1), as = h("<!> <!> <!>", 1), os = h("<p> </p>"), ss = h("<div><!> <div><!> <div class=\"relative min-w-0 flex-1\"><input/> <!></div></div> <!></div>");
function cs(e, n) {
	_(n, !0);
	let o = C(n, "variables", 19, () => []), s = C(n, "id", 19, Ae), c = C(n, "value", 31, () => V({
		type: "",
		value: ""
	})), u = R(n, ts), f = a(() => n.selectPlaceholder ?? "Select"), p = a(() => n.loadingPlaceholder ?? "Loading..."), h = to(() => n.items), y = a(() => `${s()}-listbox`), b = new Yt({
		variables: () => o(),
		onChange: (e) => c({
			...c(),
			value: e
		})
	});
	var x = ss(), S = W(x), T = (e) => {
		Fr(e, {
			get for() {
				return s();
			},
			children: (e, t) => {
				k();
				var r = i();
				L(() => j(r, n.label)), w(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	v(S, (e) => {
		n.label && e(T);
	});
	var E = K(S, 2), O = W(E);
	m(O, () => mr, (e, r) => {
		r(e, {
			type: "single",
			get items() {
				return h.items;
			},
			get value() {
				return c().type;
			},
			set value(e) {
				c(c().type = e, !0);
			},
			children: (e, r) => {
				var i = ns(), o = D(i);
				{
					let e = a(() => Z("flex shrink-0 cursor-pointer items-center justify-between gap-2 rounded-l-lg border border-r-0 outline-none", qt, Bt, Le.md, Ht(n.error), n.selectClass));
					m(o, () => br, (n, r) => {
						r(n, {
							get class() {
								return t(e);
							},
							children: (e, n) => {
								var r = ns(), i = D(r);
								{
									let e = a(() => h.loading ? t(p) : t(f));
									m(i, () => _r, (n, r) => {
										r(n, {
											get placeholder() {
												return t(e);
											},
											class: "truncate data-placeholder:text-dark-300"
										});
									});
								}
								var o = K(i, 2);
								Q(o, {
									icon: "ri:expand-up-down-line",
									class: "size-5 shrink-0 text-dark-300"
								}), w(e, r);
							},
							$$slots: { default: !0 }
						});
					});
				}
				var s = K(o, 2);
				m(s, () => ht, (e, r) => {
					r(e, {
						children: (e, r) => {
							var i = q(), o = D(i);
							{
								let e = a(() => n.contentProps?.sideOffset ?? 4), r = a(() => Z("z-[100] max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", n.contentProps?.class));
								m(o, () => Wn, (i, o) => {
									o(i, ne(() => n.contentProps, {
										get sideOffset() {
											return t(e);
										},
										get class() {
											return t(r);
										},
										children: (e, n) => {
											var r = as(), i = D(r);
											m(i, () => sr, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Q(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var o = K(i, 2);
											m(o, () => $n, (e, n) => {
												n(e, {
													children: (e, n) => {
														var r = q(), i = D(r), o = (e) => {
															var n = rs(), r = I(n, !0);
															L(() => j(r, t(p))), w(e, n);
														}, s = (e) => {
															var n = q(), r = D(n);
															d(r, 17, () => h.items, ({ value: e, label: t, disabled: n }) => e, (e, n) => {
																let r = () => t(n).value, i = () => t(n).label, o = () => t(n).disabled;
																var s = q(), c = D(s);
																{
																	let e = (e, t) => {
																		let n = () => (t?.()).selected;
																		k();
																		var r = is(), a = D(r), o = K(a), s = (e) => {
																			Q(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		v(o, (e) => {
																			n() && e(s);
																		}), L(() => j(a, `${i() ?? ""} `)), w(e, r);
																	}, n = a(() => Z("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	m(c, () => Yn, (a, s) => {
																		s(a, {
																			get value() {
																				return r();
																			},
																			get label() {
																				return i();
																			},
																			get disabled() {
																				return o();
																			},
																			get class() {
																				return t(n);
																			},
																			children: e,
																			$$slots: { default: !0 }
																		});
																	});
																}
																w(e, s);
															}), w(e, n);
														};
														v(i, (e) => {
															h.loading ? e(o) : e(s, -1);
														}), w(e, r);
													},
													$$slots: { default: !0 }
												});
											});
											var s = K(o, 2);
											m(s, () => rr, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Q(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), w(e, r);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							w(e, i);
						},
						$$slots: { default: !0 }
					});
				}), w(e, i);
			},
			$$slots: { default: !0 }
		});
	});
	var M = K(O, 2), N = W(M);
	B(N, (e, r) => ({
		id: s(),
		placeholder: n.placeholder,
		class: e,
		"aria-invalid": n.error ? !0 : void 0,
		role: o().length > 0 ? "combobox" : void 0,
		"aria-autocomplete": o().length > 0 ? "list" : void 0,
		"aria-expanded": o().length > 0 ? b.isOpen : void 0,
		"aria-controls": o().length > 0 ? t(y) : void 0,
		"aria-activedescendant": r,
		...u
	}), [() => Z("min-w-0 w-full truncate rounded-r-lg border outline-none", qt, Bt, Le.md, Ht(n.error)), () => b.isOpen ? Zt(t(y), b.highlightedIndex) : void 0], void 0, void 0, void 0, !0), g(N, () => b.attach);
	var ee = K(N, 2);
	Qt(ee, {
		get autocomplete() {
			return b;
		},
		get id() {
			return t(y);
		}
	}), G(M), G(E);
	var P = K(E, 2), F = (e) => {
		var t = os(), i = I(t, !0);
		L(() => {
			J(t, 1, r(Lt)), j(i, n.error);
		}), w(e, t);
	};
	v(P, (e) => {
		n.error && e(F);
	}), G(x), L((e, t) => {
		J(x, 1, e), J(E, 1, t);
	}, [() => r(Z("relative grid w-full min-w-0 gap-2", n.class)), () => r(Z("flex w-full min-w-0 items-stretch rounded-lg", Rt, Ut(n.error)))]), A(N, () => c().value, (e) => c(c().value = e, !0)), w(e, x), l();
}
//#endregion
//#region ../ui/src/lib/components/input/input-slider.svelte
var ls = h("<div class=\"flex items-center justify-between gap-4\"><!> <span class=\"text-sm text-dark-100\"> </span></div>"), us = h("<p> </p>"), ds = h("<div><!> <input type=\"range\"/> <!></div>");
function fs(e, t) {
	_(t, !0);
	let n = C(t, "id", 19, Ae), a = C(t, "min", 3, 0), o = C(t, "max", 3, 100), s = C(t, "step", 3, 1), c = C(t, "value", 15, 0), u = C(t, "unit", 3, "%");
	var d = ds(), f = W(d), p = (e) => {
		var r = ls(), a = W(r);
		Fr(a, {
			get for() {
				return n();
			},
			children: (e, n) => {
				k();
				var r = i();
				L(() => j(r, t.label)), w(e, r);
			},
			$$slots: { default: !0 }
		});
		var o = K(a, 2), s = I(o);
		G(r), L(() => j(s, `${c() ?? ""}${u() ?? ""}`)), w(e, r);
	};
	v(f, (e) => {
		t.label && e(p);
	});
	var m = K(f, 2);
	re(m);
	var h = K(m, 2), g = (e) => {
		var n = us(), i = I(n, !0);
		L(() => {
			J(n, 1, r(Lt)), j(i, t.error);
		}), w(e, n);
	};
	v(h, (e) => {
		t.error && e(g);
	}), G(d), L((e, t) => {
		J(d, 1, e), O(m, "id", n()), O(m, "min", a()), O(m, "max", o()), O(m, "step", s()), J(m, 1, t);
	}, [() => r(Z("grid w-full gap-2")), () => r(Z("h-2 w-full cursor-pointer appearance-none rounded-full bg-dark-600 accent-primary", t.error && "ring-1 ring-destructive"))]), F("input", m, () => t.onvaluechange?.(c())), A(m, c), w(e, d), l();
}
e(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-switch.svelte
var ps = h("<p> </p>"), ms = h("<div><div class=\"flex items-center gap-3\"><!> <!></div> <!></div>");
function hs(e, n) {
	_(n, !0);
	let o = C(n, "checked", 15, !1), s = C(n, "id", 19, Ae);
	var c = ms(), u = W(c), d = W(u);
	{
		let e = a(() => n.label ? `${s()}-label` : void 0), r = a(() => n.error ? !0 : void 0), i = a(() => Z("inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border p-[2px] transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary/15", n.error ? Z(Wt, "data-[state=unchecked]:bg-destructive/15") : "data-[state=unchecked]:border-border data-[state=unchecked]:bg-transparent data-[state=unchecked]:hover:border-dark-400", zt, "disabled:cursor-not-allowed disabled:opacity-50"));
		m(d, () => Ar, (n, c) => {
			c(n, {
				get id() {
					return s();
				},
				get "aria-labelledby"() {
					return t(e);
				},
				get "aria-invalid"() {
					return t(r);
				},
				get class() {
					return t(i);
				},
				get checked() {
					return o();
				},
				set checked(e) {
					o(e);
				},
				children: (e, n) => {
					var r = q(), i = D(r);
					{
						let e = a(() => Z("pointer-events-none block size-4 shrink-0 rounded-full transition-transform", "data-[state=checked]:translate-x-[19px] data-[state=unchecked]:-translate-x-[1px]", "data-[state=unchecked]:bg-dark-400", "data-[state=checked]:bg-primary"));
						m(i, () => Nr, (n, r) => {
							r(n, { get class() {
								return t(e);
							} });
						});
					}
					w(e, r);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var f = K(d, 2), p = (e) => {
		Fr(e, {
			get id() {
				return `${s() ?? ""}-label`;
			},
			get for() {
				return s();
			},
			class: "cursor-pointer",
			children: (e, t) => {
				k();
				var r = i();
				L(() => j(r, n.label)), w(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	v(f, (e) => {
		n.label && e(p);
	}), G(u);
	var h = K(u, 2), g = (e) => {
		var t = ps(), i = I(t, !0);
		L(() => {
			J(t, 1, r(Lt)), j(i, n.error);
		}), w(e, t);
	};
	v(h, (e) => {
		n.error && e(g);
	}), G(c), L((e) => J(c, 1, e), [() => r(Z("grid gap-2", n.class))]), w(e, c), l();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-list.svelte
var gs = h("<div class=\"flex items-center gap-2\"><!> <!></div>"), _s = h("<p class=\"text-sm text-destructive-50\"> </p>"), vs = h("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function ys(e, n) {
	_(n, !0);
	let o = C(n, "values", 31, () => V([])), s = C(n, "id", 19, Ae), c = C(n, "addLabel", 3, "Add"), u = C(n, "removeLabel", 3, "Remove"), f = Y(V([]));
	function p(e) {
		return e.map((e) => ({
			id: crypto.randomUUID(),
			value: e
		}));
	}
	function m() {
		o(t(f).map((e) => e.value));
	}
	function h(e, n) {
		S(f, t(f).map((t) => t.id === e ? {
			...t,
			value: n
		} : t), !0), m();
	}
	function g(e) {
		S(f, t(f).filter((t) => t.id !== e), !0), m();
	}
	function y() {
		S(f, [...t(f), {
			id: crypto.randomUUID(),
			value: ""
		}], !0), m();
	}
	ee(() => {
		let e = o(), n = t(f).map((e) => e.value);
		e.length === n.length && e.every((e, t) => e === n[t]) || S(f, p(e), !0);
	});
	var b = vs(), x = W(b), T = (e) => {
		{
			let r = a(() => `${s()}-label`);
			Fr(e, {
				get id() {
					return t(r);
				},
				children: (e, t) => {
					k();
					var r = i();
					L(() => j(r, n.label)), w(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	v(x, (e) => {
		n.label && e(T);
	});
	var E = K(x, 2), D = W(E);
	d(D, 17, () => t(f), (e) => e.id, (e, r) => {
		var i = gs(), o = W(i);
		{
			let e = a(() => `${s()}-${t(r).id}`);
			Mo(o, {
				get id() {
					return t(e);
				},
				get placeholder() {
					return n.placeholder;
				},
				get value() {
					return t(r).value;
				},
				oninput: (e) => h(t(r).id, e.currentTarget.value)
			});
		}
		var c = K(o, 2);
		Nt(c, {
			variant: "ghost",
			size: "icon",
			type: "button",
			get "aria-label"() {
				return u();
			},
			onclick: () => g(t(r).id),
			children: (e, t) => {
				Q(e, {
					icon: "ri:delete-bin-line",
					class: "size-5",
					"aria-hidden": "true"
				});
			},
			$$slots: { default: !0 }
		}), G(i), w(e, i);
	});
	var A = K(D, 2);
	Nt(A, {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: y,
		children: (e, t) => {
			k();
			var n = i();
			L(() => j(n, c())), w(e, n);
		},
		$$slots: { default: !0 }
	}), G(E);
	var M = K(E, 2), N = (e) => {
		var t = _s(), r = I(t, !0);
		L(() => j(r, n.error)), w(e, t);
	};
	v(M, (e) => {
		n.error && e(N);
	}), G(b), L((e) => {
		J(b, 1, e), O(b, "aria-labelledby", n.label ? `${s()}-label` : void 0);
	}, [() => r(Z("grid w-full gap-2", n.class))]), w(e, b), l();
}
//#endregion
//#region ../ui/src/lib/components/input/use-dropdown-scroll.svelte.ts
var bs = class {
	#e = Y(0);
	get scrollTop() {
		return t(this.#e);
	}
	set scrollTop(e) {
		S(this.#e, e, !0);
	}
	#t = Y(null);
	get viewportRef() {
		return t(this.#t);
	}
	set viewportRef(e) {
		S(this.#t, e, !0);
	}
	handleViewportScroll = (e) => {
		this.scrollTop = e.currentTarget.scrollTop;
	};
	resetScroll() {
		this.scrollTop = 0, this.viewportRef && (this.viewportRef.scrollTop = 0);
	}
	scrollToIndex(e) {
		if (e < 0) return;
		let t = ao(e);
		this.scrollTop = t, this.viewportRef && (this.viewportRef.scrollTop = t);
	}
	scrollToValue(e, t) {
		if (!t) return;
		let n = e.findIndex((e) => e.value === t);
		n >= 0 && this.scrollToIndex(n);
	}
}, xs = h("<div class=\"relative w-full\"><div class=\"absolute inset-x-0 top-0\"></div></div>");
function Ss(e, n) {
	_(n, !0);
	let r = C(n, "viewportHeight", 3, 200), i = a(() => io(n.items.length)), o = a(() => t(i) ? ro(n.items, n.scrollTop, r()) : null), s = a(() => t(i) && t(o) ? t(o).items : n.items);
	var c = q(), u = D(c), f = (e) => {
		var r = xs();
		let i;
		var a = W(r);
		let c;
		d(a, 21, () => t(s), (e) => e.value, (e, r) => {
			var i = q(), a = D(i);
			U(a, () => n.item, () => t(r)), w(e, i);
		}), G(a), G(r), L(() => {
			i = E(r, "", i, { height: `${t(o).totalHeight}px` }), c = E(a, "", c, { transform: `translateY(${t(o).offsetY}px)` });
		}), w(e, r);
	}, p = (e) => {
		var r = q(), i = D(r);
		d(i, 17, () => t(s), (e) => e.value, (e, r) => {
			var i = q(), a = D(i);
			U(a, () => n.item, () => t(r)), w(e, i);
		}), w(e, r);
	};
	v(u, (e) => {
		t(i) && t(o) ? e(f) : e(p, -1);
	}), w(e, c), l();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-select.svelte
var Cs = (e, n = M) => {
	let r = a(() => n().value), i = a(() => n().label), o = a(() => n().disabled);
	var s = q(), c = D(s);
	{
		let e = (e, n) => {
			let r = () => (n?.()).selected;
			k();
			var a = Ts(), o = D(a), s = K(o), c = (e) => {
				Q(e, {
					icon: "ri:check-line",
					class: "size-5 text-primary"
				});
			};
			v(s, (e) => {
				r() && e(c);
			}), L(() => j(o, `${t(i) ?? ""} `)), w(e, a);
		}, n = a(() => Z("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
		m(c, () => Yn, (a, s) => {
			s(a, {
				get value() {
					return t(r);
				},
				get label() {
					return t(i);
				},
				get disabled() {
					return t(o);
				},
				get class() {
					return t(n);
				},
				children: e,
				$$slots: { default: !0 }
			});
		});
	}
	w(e, s);
}, ws = /* @__PURE__ */ new Set([
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
]), Ts = h(" <!>", 1), Es = h("<span>*</span>"), Ds = h("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Os = h("<div class=\"px-3 py-1.5 text-sm text-dark-300\"></div>"), ks = h("<!> <!> <!>", 1), As = h("<div><div class=\"min-w-0 flex-1\"><!></div> <button type=\"button\" aria-haspopup=\"listbox\"><!></button></div> <!>", 1), js = h("<p> </p>"), Ms = h("<div><!> <!> <!></div>");
function Ns(e, n) {
	_(n, !0);
	let i = C(n, "allowCustomValue", 3, !0), o = C(n, "id", 19, Ae), s = C(n, "value", 15, ""), c = R(n, ws), u = a(() => n.placeholder), d = a(() => n.loadingPlaceholder ?? "Loading..."), f = a(() => n.selectAriaLabel ?? "Select value"), p = Y(!1), h = Y(""), g = Y(!1), b = new bs(), x = to(() => n.items, () => n.reloadKey?.()), T = new ue(() => t(h), 100), E = a(() => new Map(x.items.map((e) => [e.value, e]))), A = a(() => t(E).get(s())), M = a(() => t(A)?.value ?? ""), N = a(() => {
		if (x.loading) return [];
		if (!t(g)) return x.items;
		let e = T.current.trim();
		return e ? no(x.items, e) : x.items;
	}), ee = a(() => t(A) && !t(N).some((e) => e.value === t(A).value) ? [t(A), ...t(N)] : t(N));
	function P() {
		t(g) || S(h, t(A)?.label ?? (i() ? s() : ""), !0);
	}
	te(() => {
		s(), t(A)?.label, P();
	}), te(() => {
		T.current, t(p) && b.resetScroll();
	});
	function z() {
		S(p, t(N).length > 0 || x.items.length > 0, !0);
	}
	function B(e) {
		S(h, e.currentTarget.value, !0), S(g, !0), i() && s(t(h)), z();
	}
	function V() {
		S(p, !0);
	}
	function H() {
		S(g, !1), P();
	}
	async function U(e) {
		if (S(p, e, !0), !e) {
			S(g, !1), b.resetScroll(), P();
			return;
		}
		await y(), b.scrollToValue(t(N), s());
	}
	function re() {
		S(p, !0);
	}
	let ie = a(() => Ee(c, {
		id: o(),
		placeholder: x.loading ? t(d) : t(u),
		autocomplete: "off",
		class: Z("min-w-0 w-full truncate rounded-l-lg border border-r-0 outline-none", qt, Bt, Le.md, Ht(n.error)),
		"aria-invalid": n.error ? !0 : void 0,
		oninput: B,
		onfocus: V,
		onblur: H
	}));
	var X = Ms(), ae = W(X), oe = (e) => {
		Fr(e, {
			get for() {
				return o();
			},
			children: (e, t) => {
				k();
				var i = Ts(), a = D(i), o = K(a), s = (e) => {
					var t = Es();
					L(() => J(t, 1, r(Vt))), w(e, t);
				};
				v(o, (e) => {
					n.required && e(s);
				}), L(() => j(a, `${n.label ?? ""} `)), w(e, i);
			},
			$$slots: { default: !0 }
		});
	};
	v(ae, (e) => {
		n.label && e(oe);
	});
	var se = K(ae, 2);
	{
		let e = a(() => !!n.disabled);
		m(se, () => Rn, (i, o) => {
			o(i, {
				type: "single",
				get items() {
					return t(ee);
				},
				get inputValue() {
					return t(h);
				},
				get value() {
					return t(M);
				},
				onValueChange: (e) => {
					e && (s(e), S(g, !1), S(p, !1), P());
				},
				onOpenChange: U,
				get disabled() {
					return t(e);
				},
				get open() {
					return t(p);
				},
				set open(e) {
					S(p, e, !0);
				},
				children: (e, i) => {
					var o = As(), s = D(o), c = W(s), l = W(c);
					m(l, () => Vn, (e, n) => {
						n(e, ne(() => t(ie)));
					}), G(c);
					var u = K(c, 2), h = W(u);
					Q(h, {
						icon: "ri:expand-up-down-line",
						class: "size-5 shrink-0 text-dark-300"
					}), G(u), G(s);
					var g = K(s, 2);
					m(g, () => ht, (e, r) => {
						r(e, {
							children: (e, r) => {
								var i = q(), o = D(i);
								{
									let e = a(() => n.contentProps?.sideOffset ?? 4), r = a(() => Z("z-[100] max-h-84 min-w-(--bits-combobox-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", n.contentProps?.class));
									m(o, () => Wn, (i, a) => {
										a(i, ne(() => n.contentProps, {
											get sideOffset() {
												return t(e);
											},
											get class() {
												return t(r);
											},
											children: (e, n) => {
												var r = ks(), i = D(r);
												m(i, () => sr, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															Q(e, { icon: "ri:arrow-up-s-line" });
														},
														$$slots: { default: !0 }
													});
												});
												var a = K(i, 2);
												m(a, () => $n, (e, n) => {
													n(e, {
														get onscroll() {
															return b.handleViewportScroll;
														},
														get ref() {
															return b.viewportRef;
														},
														set ref(e) {
															b.viewportRef = e;
														},
														children: (e, n) => {
															var r = q(), i = D(r), a = (e) => {
																var n = Ds(), r = I(n, !0);
																L(() => j(r, t(d))), w(e, n);
															}, o = (e) => {
																Ss(e, {
																	get items() {
																		return t(N);
																	},
																	get scrollTop() {
																		return b.scrollTop;
																	},
																	get item() {
																		return Cs;
																	}
																});
															}, s = (e) => {
																var t = Os();
																t.textContent = "No matches found", w(e, t);
															};
															v(i, (e) => {
																x.loading ? e(a) : t(N).length > 0 ? e(o, 1) : e(s, -1);
															}), w(e, r);
														},
														$$slots: { default: !0 }
													});
												});
												var o = K(a, 2);
												m(o, () => rr, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															Q(e, { icon: "ri:arrow-down-s-line" });
														},
														$$slots: { default: !0 }
													});
												}), w(e, r);
											},
											$$slots: { default: !0 }
										}));
									});
								}
								w(e, i);
							},
							$$slots: { default: !0 }
						});
					}), L((e, r) => {
						J(s, 1, e), O(u, "aria-label", t(f)), O(u, "aria-expanded", t(p)), u.disabled = !!n.disabled, J(u, 1, r);
					}, [() => r(Z("flex w-full min-w-0 items-stretch rounded-lg", Rt, Ut(n.error))), () => r(Z("flex shrink-0 cursor-pointer items-center justify-center rounded-r-lg border outline-none", qt, Bt, Le.md, Ht(n.error), n.selectClass))]), F("click", u, re), w(e, o);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var ce = K(se, 2), le = (e) => {
		var t = js(), i = I(t, !0);
		L(() => {
			J(t, 1, r(Lt)), j(i, n.error);
		}), w(e, t);
	};
	v(ce, (e) => {
		n.error && e(le);
	}), G(X), L((e) => J(X, 1, e), [() => r(Z("relative grid w-full min-w-0 gap-2", n.class))]), w(e, X), l();
}
e(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-select-text.svelte
var Ps = /* @__PURE__ */ new Set([
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
]), Fs = h("<!> <!>", 1), Is = h("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Ls = h(" <!>", 1), Rs = h("<!> <!> <!>", 1), zs = h("<div aria-hidden=\"true\">—</div>"), Bs = h("<input/>"), Vs = h("<div class=\"flex shrink-0 items-center self-center\"><!></div>"), Hs = h("<p> </p>"), Us = h("<div><!> <div class=\"flex items-center gap-3\"><div><input/> <!> <!> <!> <!></div> <!></div> <!></div>");
function Ws(e, n) {
	_(n, !0);
	let o = C(n, "variables", 19, () => []), s = C(n, "valuelessOperators", 19, () => []), c = C(n, "id", 19, Ae), u = C(n, "value", 31, () => V({
		path: "",
		type: "equals",
		value: ""
	})), f = R(n, Ps), p = a(() => n.selectPlaceholder ?? "Select"), h = a(() => n.loadingPlaceholder ?? "Loading..."), y = to(() => n.items), b = a(() => `${c()}-path-listbox`), x = a(() => `${c()}-value-listbox`), S = new Yt({
		variables: () => o(),
		onChange: (e) => u({
			...u(),
			path: e
		})
	}), T = new Yt({
		variables: () => o(),
		onChange: (e) => u({
			...u(),
			value: e
		})
	}), E = a(() => Ht(n.error)), M = a(() => s().includes(u().type));
	var N = Us(), ee = W(N), P = (e) => {
		Fr(e, {
			get for() {
				return c();
			},
			children: (e, t) => {
				k();
				var r = i();
				L(() => j(r, n.label)), w(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	v(ee, (e) => {
		n.label && e(P);
	});
	var F = K(ee, 2), z = W(F), H = W(z);
	B(H, (e, r) => ({
		id: c(),
		placeholder: n.pathPlaceholder,
		class: e,
		"aria-invalid": n.error ? !0 : void 0,
		role: o().length > 0 ? "combobox" : void 0,
		"aria-autocomplete": o().length > 0 ? "list" : void 0,
		"aria-expanded": o().length > 0 ? S.isOpen : void 0,
		"aria-controls": o().length > 0 ? t(b) : void 0,
		"aria-activedescendant": r,
		...f
	}), [() => Z("min-w-0 flex-1 truncate border border-r outline-none", "rounded-l-lg", qt, Bt, Le.md, t(E)), () => S.isOpen ? Zt(t(b), S.highlightedIndex) : void 0], void 0, void 0, void 0, !0), g(H, () => S.attach);
	var te = K(H, 2);
	m(te, () => mr, (e, r) => {
		r(e, {
			type: "single",
			get items() {
				return y.items;
			},
			get value() {
				return u().type;
			},
			set value(e) {
				u(u().type = e, !0);
			},
			children: (e, r) => {
				var i = Fs(), o = D(i);
				{
					let e = a(() => Z("flex shrink-0 cursor-pointer items-center justify-between gap-2 border border-x-0 outline-none", qt, Bt, Le.md, t(E), n.selectClass ?? "w-32"));
					m(o, () => br, (n, r) => {
						r(n, {
							get class() {
								return t(e);
							},
							children: (e, n) => {
								var r = Fs(), i = D(r);
								{
									let e = a(() => y.loading ? t(h) : t(p));
									m(i, () => _r, (n, r) => {
										r(n, {
											get placeholder() {
												return t(e);
											},
											class: "truncate data-placeholder:text-dark-300"
										});
									});
								}
								var o = K(i, 2);
								Q(o, {
									icon: "ri:expand-up-down-line",
									class: "size-5 shrink-0 text-dark-300"
								}), w(e, r);
							},
							$$slots: { default: !0 }
						});
					});
				}
				var s = K(o, 2);
				m(s, () => ht, (e, r) => {
					r(e, {
						children: (e, r) => {
							var i = q(), o = D(i);
							{
								let e = a(() => n.contentProps?.sideOffset ?? 4), r = a(() => Z("z-[100] max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", n.contentProps?.class));
								m(o, () => Wn, (i, o) => {
									o(i, ne(() => n.contentProps, {
										get sideOffset() {
											return t(e);
										},
										get class() {
											return t(r);
										},
										children: (e, n) => {
											var r = Rs(), i = D(r);
											m(i, () => sr, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Q(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var o = K(i, 2);
											m(o, () => $n, (e, n) => {
												n(e, {
													children: (e, n) => {
														var r = q(), i = D(r), o = (e) => {
															var n = Is(), r = I(n, !0);
															L(() => j(r, t(h))), w(e, n);
														}, s = (e) => {
															var n = q(), r = D(n);
															d(r, 17, () => y.items, ({ value: e, label: t, disabled: n }) => e, (e, n) => {
																let r = () => t(n).value, i = () => t(n).label, o = () => t(n).disabled;
																var s = q(), c = D(s);
																{
																	let e = (e, t) => {
																		let n = () => (t?.()).selected;
																		k();
																		var r = Ls(), a = D(r), o = K(a), s = (e) => {
																			Q(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		v(o, (e) => {
																			n() && e(s);
																		}), L(() => j(a, `${i() ?? ""} `)), w(e, r);
																	}, n = a(() => Z("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	m(c, () => Yn, (a, s) => {
																		s(a, {
																			get value() {
																				return r();
																			},
																			get label() {
																				return i();
																			},
																			get disabled() {
																				return o();
																			},
																			get class() {
																				return t(n);
																			},
																			children: e,
																			$$slots: { default: !0 }
																		});
																	});
																}
																w(e, s);
															}), w(e, n);
														};
														v(i, (e) => {
															y.loading ? e(o) : e(s, -1);
														}), w(e, r);
													},
													$$slots: { default: !0 }
												});
											});
											var s = K(o, 2);
											m(s, () => rr, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Q(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), w(e, r);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							w(e, i);
						},
						$$slots: { default: !0 }
					});
				}), w(e, i);
			},
			$$slots: { default: !0 }
		});
	});
	var Y = K(te, 2), ie = (e) => {
		var n = zs();
		L((e) => J(n, 1, e), [() => r(Z("flex min-w-0 items-center rounded-r-lg border border-l-0 px-3 text-dark-500 select-none", qt, Le.md, t(E)))]), w(e, n);
	}, X = (e) => {
		var i = Bs();
		re(i), g(i, () => T.attach), L((e, r) => {
			O(i, "placeholder", n.valuePlaceholder), J(i, 1, e), O(i, "aria-invalid", n.error ? !0 : void 0), O(i, "role", o().length > 0 ? "combobox" : void 0), O(i, "aria-autocomplete", o().length > 0 ? "list" : void 0), O(i, "aria-expanded", o().length > 0 ? T.isOpen : void 0), O(i, "aria-controls", o().length > 0 ? t(x) : void 0), O(i, "aria-activedescendant", r);
		}, [() => r(Z("min-w-0 flex-1 truncate rounded-r-lg border outline-none", qt, Bt, Le.md, t(E))), () => T.isOpen ? Zt(t(x), T.highlightedIndex) : void 0]), A(i, () => u().value, (e) => u(u().value = e, !0)), w(e, i);
	};
	v(Y, (e) => {
		t(M) ? e(ie) : e(X, -1);
	});
	var ae = K(Y, 2);
	Qt(ae, {
		get autocomplete() {
			return S;
		},
		get id() {
			return t(b);
		}
	});
	var oe = K(ae, 2);
	Qt(oe, {
		get autocomplete() {
			return T;
		},
		get id() {
			return t(x);
		}
	}), G(z);
	var se = K(z, 2), ce = (e) => {
		var t = Vs(), r = W(t);
		U(r, () => n.suffix), G(t), w(e, t);
	};
	v(se, (e) => {
		n.suffix && e(ce);
	}), G(F);
	var le = K(F, 2), ue = (e) => {
		var t = Hs(), i = I(t, !0);
		L(() => {
			J(t, 1, r(Lt)), j(i, n.error);
		}), w(e, t);
	};
	v(le, (e) => {
		n.error && e(ue);
	}), G(N), L((e, t) => {
		J(N, 1, e), J(z, 1, t);
	}, [() => r(Z("relative grid w-full gap-2", n.class)), () => r(Z("relative grid min-w-0 flex-1 grid-cols-[1fr_120px_1fr] rounded-lg", Rt, Ut(n.error)))]), A(H, () => u().path, (e) => u(u().path = e, !0)), w(e, N), l();
}
//#endregion
//#region ../ui/src/lib/components/input/input-textarea.svelte
var Gs = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"label",
	"id",
	"error",
	"rows",
	"value",
	"class"
]), Ks = h("<p> </p>"), qs = h("<div><!> <div><textarea></textarea></div> <!></div>");
function Js(e, t) {
	_(t, !0);
	let n = C(t, "id", 19, Ae), a = C(t, "rows", 3, 4), o = C(t, "value", 15), s = R(t, Gs);
	var c = qs(), d = W(c), f = (e) => {
		Fr(e, {
			get for() {
				return n();
			},
			children: (e, n) => {
				k();
				var r = i();
				L(() => j(r, t.label)), w(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	v(d, (e) => {
		t.label && e(f);
	});
	var p = K(d, 2), m = W(p);
	u(m), B(m, (e) => ({
		id: n(),
		rows: a(),
		"aria-invalid": t.error ? !0 : void 0,
		...s,
		class: e
	}), [() => Z("box-border w-full min-w-0 resize-y rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors", qt, Bt, Ht(t.error))]), G(p);
	var h = K(p, 2), g = (e) => {
		var n = Ks(), i = I(n, !0);
		L(() => {
			J(n, 1, r(Lt)), j(i, t.error);
		}), w(e, n);
	};
	v(h, (e) => {
		t.error && e(g);
	}), G(c), L((e, t) => {
		J(c, 1, e), J(p, 1, t);
	}, [() => r(Z("relative grid w-full min-w-0 gap-2", t.class)), () => r(Z("relative flex w-full min-w-0 rounded-lg", Ut(t.error)))]), A(m, o), w(e, c), l();
}
//#endregion
export { Fr as S, to as _, hs as a, yi as b, es as c, Bo as d, Lo as f, ho as g, Eo as h, ys as i, Jo as l, Mo as m, Ws as n, fs as o, Fo as p, Ns as r, cs as s, Js as t, Wo as u, eo as v, zr as x, Ei as y };
