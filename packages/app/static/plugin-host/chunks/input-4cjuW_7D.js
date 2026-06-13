import { $n as e, At as t, Gn as n, Gt as r, Hr as i, Jr as a, Kn as o, Mn as s, Mt as c, N as l, Nn as u, On as d, Q as f, Qn as p, Qr as m, Sr as h, Vr as g, Vt as _, Wn as v, Zn as y, Zr as b, _n as x, _t as S, a as C, ai as w, an as T, at as E, bt as D, cr as O, dn as k, f as A, ft as j, gn as M, hn as N, in as P, it as F, lr as ee, m as I, mn as L, nn as R, nr as z, o as B, on as V, or as H, ot as U, p as W, pr as G, un as K, vt as q, wt as J, x as Y, zn as te } from "./index-client-BHp3UA-q.js";
import "./disclose-version-YhYaTdgb.js";
import { t as X } from "./Icon-CzS4be53.js";
import "./index-client-Bl3KzSLq.js";
import { t as Z } from "./utils-CRERhYYg.js";
import { C as ne, D as Q, _ as re, a as ie, c as ae, d as oe, g as se, i as ce, l as le, n as ue, o as de, r as fe, s as pe, u as me, v as he, x as ge } from "./animations-complete-LXv254CE.js";
import { A as _e, C as ve, D as ye, E as be, F as xe, I as Se, L as Ce, M as we, N as Te, P as Ee, R as De, T as Oe, _ as ke, a as Ae, b as je, g as Me, h as Ne, j as Pe, k as Fe, m as Ie, n as Le, r as Re, t as ze, v as Be, w as Ve, y as He } from "./popper-layer-force-mount-D-61-5ih.js";
import { a as Ue, i as We, n as Ge, r as Ke, t as qe } from "./use-id-BrfCmVmn.js";
import { t as Je } from "./on-mount-effect.svelte-Cmpvh5ap.js";
import { a as Ye, o as Xe, t as Ze } from "./presence-manager.svelte-BwnRDFCN.js";
import { t as Qe } from "./portal-BuwWXxyh.js";
import "./legacy-CGFPjR5Q.js";
import { t as $e } from "./floating-layer-anchor-D-QDnc3J.js";
import { i as et, n as tt, r as nt } from "./popover-D_Gbpl1X.js";
import { t as rt } from "./button-DWJNkhZM.js";
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_eda23719c06f49b3fd4471540fb738b4/node_modules/svelte-toolbelt/dist/utils/sr-only-styles.js
var it = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0",
	transform: "translateX(-100%)"
};
Ue(it);
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/checkbox/checkbox.svelte.js
var at = de({
	component: "checkbox",
	parts: [
		"root",
		"group",
		"group-label",
		"input"
	]
}), ot = new ne("Checkbox.Group"), st = new ne("Checkbox.Root"), ct = class e {
	static create(t, n = null) {
		return st.set(new e(t, n));
	}
	opts;
	group;
	#e = G(() => this.group && this.group.opts.name.current ? this.group.opts.name.current : this.opts.name.current);
	get trueName() {
		return d(this.#e);
	}
	set trueName(e) {
		H(this.#e, e);
	}
	#t = G(() => this.group && this.group.opts.required.current ? !0 : this.opts.required.current);
	get trueRequired() {
		return d(this.#t);
	}
	set trueRequired(e) {
		H(this.#t, e);
	}
	#n = G(() => this.group && this.group.opts.disabled.current ? !0 : this.opts.disabled.current);
	get trueDisabled() {
		return d(this.#n);
	}
	set trueDisabled(e) {
		H(this.#n, e);
	}
	#r = G(() => this.group && this.group.opts.readonly.current ? !0 : this.opts.readonly.current);
	get trueReadonly() {
		return d(this.#r);
	}
	set trueReadonly(e) {
		H(this.#r, e);
	}
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = oe(this.opts.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this), ge.pre([() => a(this.group?.opts.value.current), () => this.opts.value.current], ([e, t]) => {
			!e || !t || (this.opts.checked.current = e.includes(t));
		}), ge.pre(() => this.opts.checked.current, (e) => {
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
	#a = G(() => ({
		checked: this.opts.checked.current,
		indeterminate: this.opts.indeterminate.current
	}));
	get snippetProps() {
		return d(this.#a);
	}
	set snippetProps(e) {
		H(this.#a, e);
	}
	#o = G(() => ({
		id: this.opts.id.current,
		role: "checkbox",
		type: this.opts.type.current,
		disabled: this.trueDisabled,
		"aria-checked": pe(this.opts.checked.current, this.opts.indeterminate.current),
		"aria-required": fe(this.trueRequired),
		"aria-readonly": fe(this.trueReadonly),
		"data-disabled": ue(this.trueDisabled),
		"data-readonly": ue(this.trueReadonly),
		"data-state": ut(this.opts.checked.current, this.opts.indeterminate.current),
		[at.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return d(this.#o);
	}
	set props(e) {
		H(this.#o, e);
	}
}, lt = class e {
	static create() {
		return new e(st.get());
	}
	root;
	#e = G(() => this.root.group ? !!(this.root.opts.value.current !== void 0 && this.root.group.opts.value.current.includes(this.root.opts.value.current)) : this.root.opts.checked.current);
	get trueChecked() {
		return d(this.#e);
	}
	set trueChecked(e) {
		H(this.#e, e);
	}
	#t = G(() => !!this.root.trueName);
	get shouldRender() {
		return d(this.#t);
	}
	set shouldRender(e) {
		H(this.#t, e);
	}
	constructor(e) {
		this.root = e, this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		Ye(this.root.opts.ref.current) && this.root.opts.ref.current.focus();
	}
	#n = G(() => ({
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
		return d(this.#n);
	}
	set props(e) {
		H(this.#n, e);
	}
};
function ut(e, t) {
	return t ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/hidden-input.svelte
var dt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value"
]), ft = V("<input/>");
function pt(e, t) {
	i(t, !0);
	let n = A(t, "value", 15), a = W(t, dt), o = G(() => We(a, {
		"aria-hidden": "true",
		tabindex: -1,
		style: {
			...it,
			position: "absolute",
			top: "0",
			left: "0"
		}
	}));
	var s = T(), c = p(s), l = (e) => {
		var t = ft();
		F(t, () => ({
			...d(o),
			value: n()
		}), void 0, void 0, void 0, void 0, !0), P(e, t);
	}, u = (e) => {
		var t = ft();
		F(t, () => ({ ...d(o) }), void 0, void 0, void 0, void 0, !0), f(t, n), P(e, t);
	};
	r(c, (e) => {
		d(o).type === "checkbox" ? e(l) : e(u, -1);
	}), P(e, s), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/checkbox/components/checkbox-input.svelte
function mt(e, t) {
	i(t, !1);
	let n = lt.create();
	Y();
	var a = T(), o = p(a), s = (e) => {
		pt(e, I(() => n.props));
	};
	r(o, (e) => {
		n.shouldRender && e(s);
	}), P(e, a), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/checkbox/components/checkbox.svelte
var ht = new Set([
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
]), gt = V("<button><!></button>"), _t = V("<!> <!>", 1);
function vt(t, n) {
	let a = K();
	i(n, !0);
	let o = A(n, "checked", 15, !1), s = A(n, "ref", 15, null), l = A(n, "disabled", 3, !1), u = A(n, "required", 3, !1), f = A(n, "name", 3, void 0), h = A(n, "value", 3, "on"), _ = A(n, "id", 19, () => Ge(a)), v = A(n, "indeterminate", 15, !1), b = A(n, "type", 3, "button"), x = W(n, ht), S = ot.getOr(null);
	S && h() && (S.opts.value.current.includes(h()) ? o(!0) : o(!1)), ge.pre(() => h(), () => {
		S && h() && (S.opts.value.current.includes(h()) ? o(!0) : o(!1));
	});
	let C = ct.create({
		checked: Q(() => o(), (e) => {
			o(e), n.onCheckedChange?.(e);
		}),
		disabled: Q(() => l() ?? !1),
		required: Q(() => u()),
		name: Q(() => f()),
		value: Q(() => h()),
		id: Q(() => _()),
		ref: Q(() => s(), (e) => s(e)),
		indeterminate: Q(() => v(), (e) => {
			v(e), n.onIndeterminateChange?.(e);
		}),
		type: Q(() => b()),
		readonly: Q(() => !!n.readonly)
	}, S), E = G(() => We({ ...x }, C.props));
	var D = _t(), O = p(D), k = (e) => {
		var t = T(), r = p(t);
		{
			let e = G(() => ({
				props: d(E),
				...C.snippetProps
			}));
			c(r, () => n.child, () => d(e));
		}
		P(e, t);
	}, j = (e) => {
		var t = gt();
		F(t, () => ({ ...d(E) })), c(y(t), () => n.children ?? w, () => C.snippetProps), m(t), P(e, t);
	};
	r(O, (e) => {
		n.child ? e(k) : e(j, -1);
	}), mt(e(O, 2), {}), P(t, D), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/data-typeahead.svelte.js
var yt = class {
	#e;
	#t = G(() => this.#e.candidateValues());
	#n;
	constructor(e) {
		this.#e = e, this.#n = Ne("", {
			afterMs: 1e3,
			getWindow: this.#e.getWindow
		}), this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this), this.resetTypeahead = this.resetTypeahead.bind(this);
	}
	handleTypeaheadSearch(e) {
		if (!this.#e.enabled() || !d(this.#t).length) return;
		this.#n.current = this.#n.current + e;
		let t = this.#e.getCurrentItem(), n = d(this.#t).find((e) => e === t) ?? "", r = Be(d(this.#t).map((e) => e ?? ""), this.#n.current, n), i = d(this.#t).find((e) => e === r);
		return i && this.#e.onMatch(i), i;
	}
	resetTypeahead() {
		this.#n.current = "";
	}
}, bt = [
	Oe,
	we,
	be,
	Ce,
	Fe,
	_e,
	"Alt",
	Ee,
	Pe,
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
], xt = [
	Ve,
	Se,
	Te
], St = [
	ye,
	xe,
	"End"
], Ct = [...xt, ...St], wt = de({
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
}), Tt = new ne("Select.Root | Combobox.Root");
new ne("Select.Group | Combobox.Group");
var Et = new ne("Select.Content | Combobox.Content"), Dt = class {
	opts;
	#e = O(!1);
	get touchedInput() {
		return d(this.#e);
	}
	set touchedInput(e) {
		H(this.#e, e, !0);
	}
	#t = O(null);
	get inputNode() {
		return d(this.#t);
	}
	set inputNode(e) {
		H(this.#t, e, !0);
	}
	#n = O(null);
	get contentNode() {
		return d(this.#n);
	}
	set contentNode(e) {
		H(this.#n, e, !0);
	}
	contentPresence;
	#r = O(null);
	get viewportNode() {
		return d(this.#r);
	}
	set viewportNode(e) {
		H(this.#r, e, !0);
	}
	#i = O(null);
	get triggerNode() {
		return d(this.#i);
	}
	set triggerNode(e) {
		H(this.#i, e, !0);
	}
	#a = O(null);
	get valueNode() {
		return d(this.#a);
	}
	set valueNode(e) {
		H(this.#a, e, !0);
	}
	#o = O("");
	get valueId() {
		return d(this.#o);
	}
	set valueId(e) {
		H(this.#o, e, !0);
	}
	#s = O(null);
	get highlightedNode() {
		return d(this.#s);
	}
	set highlightedNode(e) {
		H(this.#s, e, !0);
	}
	#c = G(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-value") : null);
	get highlightedValue() {
		return d(this.#c);
	}
	set highlightedValue(e) {
		H(this.#c, e);
	}
	#l = G(() => {
		if (this.highlightedNode) return this.highlightedNode.id;
	});
	get highlightedId() {
		return d(this.#l);
	}
	set highlightedId(e) {
		H(this.#l, e);
	}
	#u = G(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-label") : null);
	get highlightedLabel() {
		return d(this.#u);
	}
	set highlightedLabel(e) {
		H(this.#u, e);
	}
	#d = O(!1);
	get contentIsPositioned() {
		return d(this.#d);
	}
	set contentIsPositioned(e) {
		H(this.#d, e, !0);
	}
	isUsingKeyboard = !1;
	isCombobox = !1;
	domContext = new Ke(() => null);
	constructor(e) {
		this.opts = e, this.isCombobox = e.isCombobox, this.contentPresence = new Ze({
			ref: Q(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), o(() => {
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
	getBitsAttr = (e) => wt.getAttr(e, this.isCombobox ? "combobox" : void 0);
}, Ot = class extends Dt {
	opts;
	isMulti = !1;
	#e = G(() => this.opts.value.current !== "");
	get hasValue() {
		return d(this.#e);
	}
	set hasValue(e) {
		H(this.#e, e);
	}
	#t = G(() => this.opts.items.current.length ? this.opts.items.current.find((e) => e.value === this.opts.value.current)?.label ?? "" : "");
	get currentLabel() {
		return d(this.#t);
	}
	set currentLabel(e) {
		H(this.#t, e);
	}
	#n = G(() => this.opts.items.current.length ? this.opts.items.current.filter((e) => !e.disabled).map((e) => e.label) : []);
	get candidateLabels() {
		return d(this.#n);
	}
	set candidateLabels(e) {
		H(this.#n, e);
	}
	#r = G(() => !(this.isMulti || this.opts.items.current.length === 0));
	get dataTypeaheadEnabled() {
		return d(this.#r);
	}
	set dataTypeaheadEnabled(e) {
		H(this.#r, e);
	}
	constructor(e) {
		super(e), this.opts = e, n(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), ge(() => this.opts.open.current, () => {
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
		se(() => {
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
}, kt = class extends Dt {
	opts;
	isMulti = !0;
	#e = G(() => this.opts.value.current.length > 0);
	get hasValue() {
		return d(this.#e);
	}
	set hasValue(e) {
		H(this.#e, e);
	}
	constructor(e) {
		super(e), this.opts = e, n(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), ge(() => this.opts.open.current, () => {
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
		se(() => {
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
}, At = class {
	static create(e) {
		let { type: t, ...n } = e, r = t === "single" ? new Ot(n) : new kt(n);
		return Tt.set(r);
	}
}, jt = class e {
	static create(t) {
		return new e(t, Tt.get());
	}
	root;
	opts;
	attachment;
	constructor(e, t) {
		this.root = t, this.opts = e, this.attachment = oe(e.ref, (e) => this.root.valueNode = e), this.setValue = this.setValue.bind(this);
	}
	setValue(e) {
		this.root.isMulti && !Array.isArray(e) || !this.root.isMulti && typeof e != "string" || (this.root.opts.value.current = e);
	}
	#e = G(() => {
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
		return d(this.#e);
	}
	set snippetProps(e) {
		H(this.#e, e);
	}
	#t = G(() => ({
		id: this.opts.id.current,
		"data-placeholder": this.root.hasValue ? void 0 : "",
		"data-select-value": "",
		...this.attachment
	}));
	get props() {
		return d(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
}, Mt = class e {
	static create(t) {
		return new e(t, Tt.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = oe(e.ref, (e) => this.root.inputNode = e), this.root.domContext = new Ke(e.ref), this.onkeydown = this.onkeydown.bind(this), this.oninput = this.oninput.bind(this), ge([() => this.root.opts.value.current, () => this.opts.clearOnDeselect.current], ([e, t], [n]) => {
			t && (Array.isArray(e) && Array.isArray(n) ? e.length === 0 && n.length !== 0 && (this.root.opts.inputValue.current = "") : e === "" && n !== "" && (this.root.opts.inputValue.current = ""));
		});
	}
	onkeydown(e) {
		if (this.root.isUsingKeyboard = !0, e.key !== "Escape") {
			if ((e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault(), !this.root.opts.open.current) {
				if (bt.includes(e.key) || e.key === "Tab" || e.key === "Backspace" && this.root.opts.inputValue.current === "" || (this.root.handleOpen(), this.root.hasValue)) return;
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
			if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), Ct.includes(e.key)) {
				e.preventDefault();
				let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
				if (e.key === "ArrowDown" ? a = He(t, r, i) : e.key === "ArrowUp" ? a = je(t, r, i) : e.key === "PageDown" ? a = ke(t, r, 10, i) : e.key === "PageUp" ? a = Me(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
				this.root.setHighlightedNode(a);
				return;
			}
			bt.includes(e.key) || this.root.highlightedNode || this.root.setHighlightedToFirstCandidate();
		}
	}
	oninput(e) {
		this.root.opts.inputValue.current = e.currentTarget.value, this.root.setHighlightedToFirstCandidate();
	}
	#e = G(() => ({
		id: this.opts.id.current,
		role: "combobox",
		disabled: this.root.opts.disabled.current ? !0 : void 0,
		"aria-activedescendant": this.root.highlightedId,
		"aria-autocomplete": "list",
		"aria-expanded": fe(this.root.opts.open.current),
		"data-state": le(this.root.opts.open.current),
		"data-disabled": ue(this.root.opts.disabled.current),
		onkeydown: this.onkeydown,
		oninput: this.oninput,
		[this.root.getBitsAttr("input")]: "",
		...this.attachment
	}));
	get props() {
		return d(this.#e);
	}
	set props(e) {
		H(this.#e, e);
	}
}, Nt = class e {
	static create(t) {
		return new e(t, Tt.get());
	}
	opts;
	root;
	attachment;
	#e;
	#t;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = oe(e.ref, (e) => this.root.triggerNode = e), this.root.domContext = new Ke(e.ref), this.#e = new Ie({
			getCurrentItem: () => this.root.highlightedNode,
			onMatch: (e) => {
				this.root.setHighlightedNode(e);
			},
			getActiveElement: () => this.root.domContext.getActiveElement(),
			getWindow: () => this.root.domContext.getWindow()
		}), this.#t = new yt({
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
		if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), Ct.includes(e.key)) {
			e.preventDefault();
			let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
			if (e.key === "ArrowDown" ? a = He(t, r, i) : e.key === "ArrowUp" ? a = je(t, r, i) : e.key === "PageDown" ? a = ke(t, r, 10, i) : e.key === "PageUp" ? a = Me(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
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
	#a = G(() => ({
		id: this.opts.id.current,
		disabled: this.root.opts.disabled.current ? !0 : void 0,
		"aria-haspopup": "listbox",
		"aria-expanded": fe(this.root.opts.open.current),
		"aria-activedescendant": this.root.highlightedId,
		"data-state": le(this.root.opts.open.current),
		"data-disabled": ue(this.root.opts.disabled.current),
		"data-placeholder": this.root.hasValue ? void 0 : "",
		[this.root.getBitsAttr("trigger")]: "",
		onpointerdown: this.onpointerdown,
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		onpointerup: this.onpointerup,
		...this.attachment
	}));
	get props() {
		return d(this.#a);
	}
	set props(e) {
		H(this.#a, e);
	}
}, Pt = class e {
	static create(t) {
		return Et.set(new e(t, Tt.get()));
	}
	opts;
	root;
	attachment;
	#e = O(!1);
	get isPositioned() {
		return d(this.#e);
	}
	set isPositioned(e) {
		H(this.#e, e, !0);
	}
	domContext;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = oe(e.ref, (e) => this.root.contentNode = e), this.domContext = new Ke(this.opts.ref), this.root.domContext === null && (this.root.domContext = this.domContext), re(() => {
			this.root.contentNode = null, this.root.contentIsPositioned = !1, this.isPositioned = !1;
		}), ge(() => this.root.opts.open.current, () => {
			this.root.opts.open.current || (this.root.contentIsPositioned = !1, this.isPositioned = !1);
		}), ge([() => this.isPositioned, () => this.root.highlightedNode], () => {
			!this.isPositioned || !this.root.highlightedNode || this.root.scrollHighlightedNodeIntoView(this.root.highlightedNode);
		}), this.onpointermove = this.onpointermove.bind(this);
	}
	onpointermove(e) {
		this.root.isUsingKeyboard = !1;
	}
	#t = G(() => Ae(this.root.isCombobox ? "combobox" : "select"));
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
	#n = G(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return d(this.#n);
	}
	set snippetProps(e) {
		H(this.#n, e);
	}
	#r = G(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-multiselectable": this.root.isMulti ? "true" : void 0,
		"data-state": le(this.root.opts.open.current),
		...me(this.root.contentPresence.transitionStatus),
		[this.root.getBitsAttr("content")]: "",
		style: {
			display: "flex",
			flexDirection: "column",
			outline: "none",
			boxSizing: "border-box",
			pointerEvents: "auto",
			...d(this.#t)
		},
		onpointermove: this.onpointermove,
		...this.attachment
	}));
	get props() {
		return d(this.#r);
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
}, Ft = class e {
	static create(t) {
		return new e(t, Tt.get());
	}
	opts;
	root;
	attachment;
	#e = G(() => this.root.includesItem(this.opts.value.current));
	get isSelected() {
		return d(this.#e);
	}
	set isSelected(e) {
		H(this.#e, e);
	}
	#t = G(() => this.root.highlightedValue === this.opts.value.current);
	get isHighlighted() {
		return d(this.#t);
	}
	set isHighlighted(e) {
		H(this.#t, e);
	}
	prevHighlighted = new he(() => this.isHighlighted);
	#n = O(!1);
	get mounted() {
		return d(this.#n);
	}
	set mounted(e) {
		H(this.#n, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = oe(e.ref), ge([() => this.isHighlighted, () => this.prevHighlighted.current], () => {
			this.isHighlighted ? this.opts.onHighlight.current() : this.prevHighlighted.current && this.opts.onUnhighlight.current();
		}), ge(() => this.mounted, () => {
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
	#r = G(() => ({
		selected: this.isSelected,
		highlighted: this.isHighlighted
	}));
	get snippetProps() {
		return d(this.#r);
	}
	set snippetProps(e) {
		H(this.#r, e);
	}
	onpointerdown(e) {
		e.preventDefault();
	}
	onpointerup(e) {
		if (!(e.defaultPrevented || !this.opts.ref.current)) {
			if (e.pointerType === "touch" && !Xe) {
				x(this.opts.ref.current, "click", () => {
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
	#i = G(() => ({
		id: this.opts.id.current,
		role: "option",
		"aria-selected": this.root.includesItem(this.opts.value.current) ? "true" : void 0,
		"data-value": this.opts.value.current,
		"data-disabled": ue(this.opts.disabled.current),
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
		return d(this.#i);
	}
	set props(e) {
		H(this.#i, e);
	}
}, It = class e {
	static create(t) {
		return new e(t, Tt.get());
	}
	opts;
	root;
	#e = G(() => this.root.opts.name.current !== "");
	get shouldRender() {
		return d(this.#e);
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
	#t = G(() => ({
		disabled: ie(this.root.opts.disabled.current),
		required: ie(this.root.opts.required.current),
		name: this.root.opts.name.current,
		value: this.opts.value.current,
		onfocus: this.onfocus
	}));
	get props() {
		return d(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
}, Lt = class e {
	static create(t) {
		return new e(t, Et.get());
	}
	opts;
	content;
	root;
	attachment;
	#e = O(0);
	get prevScrollTop() {
		return d(this.#e);
	}
	set prevScrollTop(e) {
		H(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = oe(e.ref, (e) => {
			this.root.viewportNode = e;
		});
	}
	#t = G(() => ({
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
		return d(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
}, Rt = class {
	opts;
	content;
	root;
	attachment;
	autoScrollTimer = null;
	userScrollTimer = -1;
	isUserScrolling = !1;
	onAutoScroll = ve;
	#e = O(!1);
	get mounted() {
		return d(this.#e);
	}
	set mounted(e) {
		H(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = oe(e.ref), ge([() => this.mounted], () => {
			if (!this.mounted) {
				this.isUserScrolling = !1;
				return;
			}
			this.isUserScrolling;
		}), n(() => {
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
	#t = G(() => ({
		id: this.opts.id.current,
		"aria-hidden": ce(!0),
		style: { flexShrink: 0 },
		onpointerdown: this.onpointerdown,
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		...this.attachment
	}));
	get props() {
		return d(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
}, zt = class e {
	static create(t) {
		return new e(new Rt(t, Et.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = O(!1);
	get canScrollDown() {
		return d(this.#e);
	}
	set canScrollDown(e) {
		H(this.#e, e, !0);
	}
	scrollIntoViewTimer = null;
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, ge([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), x(this.root.viewportNode, "scroll", () => this.handleScroll());
		}), ge([
			() => this.root.opts.inputValue.current,
			() => this.root.viewportNode,
			() => this.content.isPositioned
		], () => {
			!this.root.viewportNode || !this.content.isPositioned || this.handleScroll(!0);
		}), ge(() => this.scrollButtonState.mounted, () => {
			this.scrollButtonState.mounted && (this.scrollIntoViewTimer && clearTimeout(this.scrollIntoViewTimer), this.scrollIntoViewTimer = De(5, () => {
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
	#t = G(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-down-button")]: ""
	}));
	get props() {
		return d(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
}, Bt = class e {
	static create(t) {
		return new e(new Rt(t, Et.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = O(!1);
	get canScrollUp() {
		return d(this.#e);
	}
	set canScrollUp(e) {
		H(this.#e, e, !0);
	}
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, ge([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), x(this.root.viewportNode, "scroll", () => this.handleScroll());
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
	#t = G(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-up-button")]: ""
	}));
	get props() {
		return d(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-hidden-input.svelte
function Vt(e, t) {
	i(t, !0);
	let n = A(t, "value", 15), a = It.create({ value: Q(() => n()) });
	var o = T(), s = p(o), c = (e) => {
		pt(e, I(() => a.props, {
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
	r(s, (e) => {
		a.shouldRender && e(c);
	}), P(e, o), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/combobox/components/combobox.svelte
var Ht = V("<!> <!>", 1);
function Ut(t, n) {
	i(n, !0);
	let a = A(n, "value", 15), o = A(n, "onValueChange", 3, ve), s = A(n, "name", 3, ""), l = A(n, "disabled", 3, !1), u = A(n, "open", 15, !1), f = A(n, "onOpenChange", 3, ve), m = A(n, "onOpenChangeComplete", 3, ve), h = A(n, "loop", 3, !1), v = A(n, "scrollAlignment", 3, "nearest"), y = A(n, "required", 3, !1), b = A(n, "items", 19, () => []), x = A(n, "allowDeselect", 3, !0), S = A(n, "inputValue", 7, "");
	a() === void 0 && a(n.type === "single" ? "" : []), ge.pre(() => a(), () => {
		a() === void 0 && a(n.type === "single" ? "" : []);
	});
	let C = At.create({
		type: n.type,
		value: Q(() => a(), (e) => {
			a(e), o()(e);
		}),
		disabled: Q(() => l()),
		required: Q(() => y()),
		open: Q(() => u(), (e) => {
			u(e), f()(e);
		}),
		loop: Q(() => h()),
		scrollAlignment: Q(() => v()),
		name: Q(() => s()),
		isCombobox: !0,
		items: Q(() => b()),
		allowDeselect: Q(() => x()),
		inputValue: Q(() => S(), (e) => S(e)),
		onOpenChangeComplete: Q(() => m())
	});
	var E = Ht(), D = p(E);
	Re(D, {
		children: (e, t) => {
			var r = T();
			c(p(r), () => n.children ?? w), P(e, r);
		},
		$$slots: { default: !0 }
	});
	var O = e(D, 2), k = (e) => {
		var t = T(), n = p(t), i = (e) => {
			var t = T();
			_(p(t), 16, () => C.opts.value.current, (e) => e, (e, t) => {
				Vt(e, { get value() {
					return t;
				} });
			}), P(e, t);
		};
		r(n, (e) => {
			C.opts.value.current.length && e(i);
		}), P(e, t);
	}, j = G(() => Array.isArray(C.opts.value.current)), M = (e) => {
		Vt(e, {
			get value() {
				return C.opts.value.current;
			},
			set value(e) {
				C.opts.value.current = e;
			}
		});
	};
	r(O, (e) => {
		d(j) ? e(k) : e(M, -1);
	}), P(t, E), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/combobox/components/combobox-input.svelte
var Wt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"defaultValue",
	"clearOnDeselect"
]), Gt = V("<input/>");
function Kt(e, n) {
	i(n, !0);
	let a = A(n, "id", 19, qe), o = A(n, "ref", 15, null), s = A(n, "clearOnDeselect", 3, !1), l = W(n, Wt), u = Mt.create({
		id: Q(() => a()),
		ref: Q(() => o(), (e) => o(e)),
		clearOnDeselect: Q(() => s())
	});
	n.defaultValue && (u.root.opts.inputValue.current = n.defaultValue);
	let f = G(() => We(l, u.props, { value: u.root.opts.inputValue.current }));
	var m = T();
	t(p(m), () => $e, (e, t) => {
		t(e, {
			get id() {
				return a();
			},
			get ref() {
				return u.opts.ref;
			},
			children: (e, t) => {
				var i = T(), a = p(i), o = (e) => {
					var t = T();
					c(p(t), () => n.child, () => ({ props: d(f) })), P(e, t);
				}, s = (e) => {
					var t = Gt();
					F(t, () => ({ ...d(f) }), void 0, void 0, void 0, void 0, !0), P(e, t);
				};
				r(a, (e) => {
					n.child ? e(o) : e(s, -1);
				}), P(e, i);
			},
			$$slots: { default: !0 }
		});
	}), P(e, m), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-content.svelte
var qt = new Set([
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
]), Jt = V("<div><div><!></div></div>");
function Yt(e, t) {
	let n = K();
	i(t, !0);
	let a = A(t, "id", 19, () => Ge(n)), o = A(t, "ref", 15, null), s = A(t, "forceMount", 3, !1), l = A(t, "side", 3, "bottom"), u = A(t, "onInteractOutside", 3, ve), f = A(t, "onEscapeKeydown", 3, ve), h = A(t, "preventScroll", 3, !1), _ = W(t, qt), v = Pt.create({
		id: Q(() => a()),
		ref: Q(() => o(), (e) => o(e)),
		onInteractOutside: Q(() => u()),
		onEscapeKeydown: Q(() => f())
	}), b = G(() => We(_, v.props));
	var x = T(), S = p(x), C = (e) => {
		ze(e, I(() => d(b), () => v.popperProps, {
			get ref() {
				return v.opts.ref;
			},
			get side() {
				return l();
			},
			get enabled() {
				return v.root.opts.open.current;
			},
			get id() {
				return a();
			},
			get preventScroll() {
				return h();
			},
			forceMount: !0,
			get shouldRender() {
				return v.shouldRender;
			},
			popper: (e, n) => {
				let i = () => n?.().props, a = () => n?.().wrapperProps, o = G(() => We(i(), { style: v.props.style }, { style: t.style }));
				var s = T(), l = p(s), u = (e) => {
					var n = T(), r = p(n);
					{
						let e = G(() => ({
							props: d(o),
							wrapperProps: a(),
							...v.snippetProps
						}));
						c(r, () => t.child, () => d(e));
					}
					P(e, n);
				}, f = (e) => {
					var n = Jt();
					F(n, () => ({ ...a() }));
					var r = y(n);
					F(r, () => ({ ...d(o) })), c(y(r), () => t.children ?? w), m(r), m(n), P(e, n);
				};
				r(l, (e) => {
					t.child ? e(u) : e(f, -1);
				}), P(e, s);
			},
			$$slots: { popper: !0 }
		}));
	}, E = (e) => {
		Le(e, I(() => d(b), () => v.popperProps, {
			get ref() {
				return v.opts.ref;
			},
			get side() {
				return l();
			},
			get open() {
				return v.root.opts.open.current;
			},
			get id() {
				return a();
			},
			get preventScroll() {
				return h();
			},
			forceMount: !1,
			get shouldRender() {
				return v.shouldRender;
			},
			popper: (e, n) => {
				let i = () => n?.().props, a = () => n?.().wrapperProps, o = G(() => We(i(), { style: v.props.style }, { style: t.style }));
				var s = T(), l = p(s), u = (e) => {
					var n = T(), r = p(n);
					{
						let e = G(() => ({
							props: d(o),
							wrapperProps: a(),
							...v.snippetProps
						}));
						c(r, () => t.child, () => d(e));
					}
					P(e, n);
				}, f = (e) => {
					var n = Jt();
					F(n, () => ({ ...a() }));
					var r = y(n);
					F(r, () => ({ ...d(o) })), c(y(r), () => t.children ?? w), m(r), m(n), P(e, n);
				};
				r(l, (e) => {
					t.child ? e(u) : e(f, -1);
				}), P(e, s);
			},
			$$slots: { popper: !0 }
		}));
	};
	r(S, (e) => {
		s() ? e(C) : s() || e(E, 1);
	}), P(e, x), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/mounted.svelte
function Xt(e, t) {
	i(t, !0);
	let n = A(t, "mounted", 15, !1), r = A(t, "onMountedChange", 3, ve);
	Je(() => (n(!0), r()(!0), () => {
		n(!1), r()(!1);
	})), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-item.svelte
var Zt = new Set([
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
]), Qt = V("<div><!></div>"), $t = V("<!> <!>", 1);
function en(t, n) {
	let a = K();
	i(n, !0);
	let o = A(n, "id", 19, () => Ge(a)), s = A(n, "ref", 15, null), l = A(n, "label", 19, () => n.value), u = A(n, "disabled", 3, !1), f = A(n, "onHighlight", 3, ve), h = A(n, "onUnhighlight", 3, ve), _ = W(n, Zt), v = Ft.create({
		id: Q(() => o()),
		ref: Q(() => s(), (e) => s(e)),
		value: Q(() => n.value),
		disabled: Q(() => u()),
		label: Q(() => l()),
		onHighlight: Q(() => f()),
		onUnhighlight: Q(() => h())
	}), b = G(() => We(_, v.props));
	var x = $t(), S = p(x), C = (e) => {
		var t = T(), r = p(t);
		{
			let e = G(() => ({
				props: d(b),
				...v.snippetProps
			}));
			c(r, () => n.child, () => d(e));
		}
		P(e, t);
	}, E = (e) => {
		var t = Qt();
		F(t, () => ({ ...d(b) })), c(y(t), () => n.children ?? w, () => v.snippetProps), m(t), P(e, t);
	};
	r(S, (e) => {
		n.child ? e(C) : e(E, -1);
	}), Xt(e(S, 2), {
		get mounted() {
			return v.mounted;
		},
		set mounted(e) {
			v.mounted = e;
		}
	}), P(t, x), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-viewport.svelte
var tn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), nn = V("<div><!></div>"), rn = {
	hash: "svelte-1j45ufl",
	code: "\n	/* Hide scrollbars cross browser and enable momentum scroll for touch devices */[data-select-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport]::-webkit-scrollbar {display:none !important;}[data-select-viewport]::-webkit-scrollbar {display:none !important;}"
};
function an(e, t) {
	let n = K();
	i(t, !0), J(e, rn);
	let a = A(t, "id", 19, () => Ge(n)), o = A(t, "ref", 15, null), s = W(t, tn), l = Lt.create({
		id: Q(() => a()),
		ref: Q(() => o(), (e) => o(e))
	}), u = G(() => We(s, l.props));
	var f = T(), h = p(f), _ = (e) => {
		var n = T();
		c(p(n), () => t.child, () => ({ props: d(u) })), P(e, n);
	}, v = (e) => {
		var n = nn();
		F(n, () => ({ ...d(u) })), c(y(n), () => t.children ?? w), m(n), P(e, n);
	};
	r(h, (e) => {
		t.child ? e(_) : e(v, -1);
	}), P(e, f), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-scroll-down-button.svelte
var on = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), sn = V("<div><!></div>"), cn = V("<!> <!>", 1);
function ln(t, n) {
	let a = K();
	i(n, !0);
	let o = A(n, "id", 19, () => Ge(a)), s = A(n, "ref", 15, null), l = A(n, "delay", 3, () => 50), u = W(n, on), f = zt.create({
		id: Q(() => o()),
		ref: Q(() => s(), (e) => s(e)),
		delay: Q(() => l())
	}), h = G(() => We(u, f.props));
	var _ = T(), v = p(_), b = (t) => {
		var i = cn(), a = p(i);
		Xt(a, {
			get mounted() {
				return f.scrollButtonState.mounted;
			},
			set mounted(e) {
				f.scrollButtonState.mounted = e;
			}
		});
		var o = e(a, 2), s = (e) => {
			var t = T();
			c(p(t), () => n.child, () => ({ props: u })), P(e, t);
		}, l = (e) => {
			var t = sn();
			F(t, () => ({ ...d(h) })), c(y(t), () => n.children ?? w), m(t), P(e, t);
		};
		r(o, (e) => {
			n.child ? e(s) : e(l, -1);
		}), P(t, i);
	};
	r(v, (e) => {
		f.canScrollDown && e(b);
	}), P(t, _), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-scroll-up-button.svelte
var un = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), dn = V("<div><!></div>"), fn = V("<!> <!>", 1);
function pn(t, n) {
	let a = K();
	i(n, !0);
	let o = A(n, "id", 19, () => Ge(a)), s = A(n, "ref", 15, null), l = A(n, "delay", 3, () => 50), u = W(n, un), f = Bt.create({
		id: Q(() => o()),
		ref: Q(() => s(), (e) => s(e)),
		delay: Q(() => l())
	}), h = G(() => We(u, f.props));
	var _ = T(), v = p(_), b = (t) => {
		var i = fn(), a = p(i);
		Xt(a, {
			get mounted() {
				return f.scrollButtonState.mounted;
			},
			set mounted(e) {
				f.scrollButtonState.mounted = e;
			}
		});
		var o = e(a, 2), s = (e) => {
			var t = T();
			c(p(t), () => n.child, () => ({ props: u })), P(e, t);
		}, l = (e) => {
			var t = dn();
			F(t, () => ({ ...d(h) })), c(y(t), () => n.children ?? w), m(t), P(e, t);
		};
		r(o, (e) => {
			n.child ? e(s) : e(l, -1);
		}), P(t, i);
	};
	r(v, (e) => {
		f.canScrollUp && e(b);
	}), P(t, _), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/label/label.svelte.js
var mn = de({
	component: "label",
	parts: ["root"]
}), hn = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = oe(this.opts.ref), this.onmousedown = this.onmousedown.bind(this);
	}
	onmousedown(e) {
		e.detail > 1 && e.preventDefault();
	}
	#e = G(() => ({
		id: this.opts.id.current,
		[mn.root]: "",
		onmousedown: this.onmousedown,
		...this.attachment
	}));
	get props() {
		return d(this.#e);
	}
	set props(e) {
		H(this.#e, e);
	}
}, gn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"for"
]), _n = V("<label><!></label>");
function vn(e, t) {
	let n = K();
	i(t, !0);
	let a = A(t, "id", 19, () => Ge(n)), o = A(t, "ref", 15, null), s = W(t, gn), l = hn.create({
		id: Q(() => a()),
		ref: Q(() => o(), (e) => o(e))
	}), u = G(() => We(s, l.props, { for: t.for }));
	var f = T(), h = p(f), _ = (e) => {
		var n = T();
		c(p(n), () => t.child, () => ({ props: d(u) })), P(e, n);
	}, v = (e) => {
		var n = _n();
		F(n, () => ({
			...d(u),
			for: t.for
		})), c(y(n), () => t.children ?? w), m(n), P(e, n);
	};
	r(h, (e) => {
		t.child ? e(_) : e(v, -1);
	}), P(e, f), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select.svelte
var yn = V("<!> <!>", 1);
function bn(t, n) {
	i(n, !0);
	let a = A(n, "value", 15), o = A(n, "onValueChange", 3, ve), s = A(n, "name", 3, ""), l = A(n, "disabled", 3, !1), u = A(n, "open", 15, !1), f = A(n, "onOpenChange", 3, ve), m = A(n, "onOpenChangeComplete", 3, ve), h = A(n, "loop", 3, !1), v = A(n, "scrollAlignment", 3, "nearest"), y = A(n, "required", 3, !1), b = A(n, "items", 19, () => []), x = A(n, "allowDeselect", 3, !1);
	function S() {
		a() === void 0 && a(n.type === "single" ? "" : []);
	}
	S(), ge.pre(() => a(), () => {
		S();
	});
	let C = O(""), E = At.create({
		type: n.type,
		value: Q(() => a(), (e) => {
			a(e), o()(e);
		}),
		disabled: Q(() => l()),
		required: Q(() => y()),
		open: Q(() => u(), (e) => {
			u(e), f()(e);
		}),
		loop: Q(() => h()),
		scrollAlignment: Q(() => v()),
		name: Q(() => s()),
		isCombobox: !1,
		items: Q(() => b()),
		allowDeselect: Q(() => x()),
		inputValue: Q(() => d(C), (e) => H(C, e, !0)),
		onOpenChangeComplete: Q(() => m())
	});
	var D = yn(), k = p(D);
	Re(k, {
		children: (e, t) => {
			var r = T();
			c(p(r), () => n.children ?? w), P(e, r);
		},
		$$slots: { default: !0 }
	});
	var j = e(k, 2), M = (e) => {
		var t = T(), i = p(t), a = (e) => {
			Vt(e, { get autocomplete() {
				return n.autocomplete;
			} });
		}, o = (e) => {
			var t = T();
			_(p(t), 16, () => E.opts.value.current, (e) => e, (e, t) => {
				Vt(e, {
					get value() {
						return t;
					},
					get autocomplete() {
						return n.autocomplete;
					}
				});
			}), P(e, t);
		};
		r(i, (e) => {
			E.opts.value.current.length === 0 ? e(a) : e(o, -1);
		}), P(e, t);
	}, N = G(() => Array.isArray(E.opts.value.current)), F = (e) => {
		Vt(e, {
			get autocomplete() {
				return n.autocomplete;
			},
			get value() {
				return E.opts.value.current;
			},
			set value(e) {
				E.opts.value.current = e;
			}
		});
	};
	r(j, (e) => {
		d(N) ? e(M) : e(F, -1);
	}), P(t, D), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-value.svelte
var xn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"placeholder",
	"child",
	"children"
]), Sn = V("<span><!></span>");
function Cn(e, t) {
	let n = K();
	i(t, !0);
	let a = A(t, "ref", 15, null), o = A(t, "id", 19, () => Ge(n)), s = W(t, xn), l = jt.create({
		id: Q(() => o()),
		ref: Q(() => a(), (e) => a(e)),
		placeholder: Q(() => t.placeholder)
	}), u = G(() => We(s, l.props));
	var f = T(), h = p(f), _ = (e) => {
		var n = T(), r = p(n);
		{
			let e = G(() => ({
				props: d(u),
				...l.snippetProps
			}));
			c(r, () => t.child, () => d(e));
		}
		P(e, n);
	}, b = (e) => {
		var n = Sn();
		F(n, () => ({ ...d(u) }));
		var i = y(n), a = (e) => {
			var n = T();
			c(p(n), () => t.children ?? w, () => l.snippetProps), P(e, n);
		}, o = (e) => {
			var n = k();
			v(() => R(n, l.snippetProps.selection.selected?.label ?? t.placeholder)), P(e, n);
		}, s = (e) => {
			var n = k();
			v((e) => R(n, e), [() => l.snippetProps.selection.selected.length > 0 ? l.snippetProps.selection.selected.map((e) => e.label).join(", ") : t.placeholder]), P(e, n);
		}, f = (e) => {
			var n = k();
			v(() => R(n, t.placeholder)), P(e, n);
		};
		r(i, (e) => {
			t.children ? e(a) : l.snippetProps.selection.type === "single" ? e(o, 1) : l.snippetProps.selection.type === "multiple" && l.snippetProps.selection.selected ? e(s, 2) : e(f, -1);
		}), m(n), P(e, n);
	};
	r(h, (e) => {
		t.child ? e(_) : e(b, -1);
	}), P(e, f), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-trigger.svelte
var wn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"type"
]), Tn = V("<button><!></button>");
function En(e, n) {
	let a = K();
	i(n, !0);
	let o = A(n, "id", 19, () => Ge(a)), s = A(n, "ref", 15, null), l = A(n, "type", 3, "button"), u = W(n, wn), f = Nt.create({
		id: Q(() => o()),
		ref: Q(() => s(), (e) => s(e))
	}), h = G(() => We(u, f.props, { type: l() }));
	var _ = T();
	t(p(_), () => $e, (e, t) => {
		t(e, {
			get id() {
				return o();
			},
			get ref() {
				return f.opts.ref;
			},
			children: (e, t) => {
				var i = T(), a = p(i), o = (e) => {
					var t = T();
					c(p(t), () => n.child, () => ({ props: d(h) })), P(e, t);
				}, s = (e) => {
					var t = Tn();
					F(t, () => ({ ...d(h) })), c(y(t), () => n.children ?? w), m(t), P(e, t);
				};
				r(a, (e) => {
					n.child ? e(o) : e(s, -1);
				}), P(e, i);
			},
			$$slots: { default: !0 }
		});
	}), P(e, _), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/switch.svelte.js
var Dn = de({
	component: "switch",
	parts: ["root", "thumb"]
}), On = new ne("Switch.Root"), kn = class e {
	static create(t) {
		return On.set(new e(t));
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = oe(e.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this);
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
	#t = G(() => ({
		"data-disabled": ue(this.opts.disabled.current),
		"data-state": ae(this.opts.checked.current),
		"data-required": ue(this.opts.required.current)
	}));
	get sharedProps() {
		return d(this.#t);
	}
	set sharedProps(e) {
		H(this.#t, e);
	}
	#n = G(() => ({ checked: this.opts.checked.current }));
	get snippetProps() {
		return d(this.#n);
	}
	set snippetProps(e) {
		H(this.#n, e);
	}
	#r = G(() => ({
		...this.sharedProps,
		id: this.opts.id.current,
		role: "switch",
		disabled: ie(this.opts.disabled.current),
		"aria-checked": pe(this.opts.checked.current, !1),
		"aria-required": fe(this.opts.required.current),
		[Dn.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return d(this.#r);
	}
	set props(e) {
		H(this.#r, e);
	}
}, An = class e {
	static create() {
		return new e(On.get());
	}
	root;
	#e = G(() => this.root.opts.name.current !== void 0);
	get shouldRender() {
		return d(this.#e);
	}
	set shouldRender(e) {
		H(this.#e, e);
	}
	constructor(e) {
		this.root = e;
	}
	#t = G(() => ({
		type: "checkbox",
		name: this.root.opts.name.current,
		value: this.root.opts.value.current,
		checked: this.root.opts.checked.current,
		disabled: this.root.opts.disabled.current,
		required: this.root.opts.required.current
	}));
	get props() {
		return d(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
}, jn = class e {
	static create(t) {
		return new e(t, On.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = oe(e.ref);
	}
	#e = G(() => ({ checked: this.root.opts.checked.current }));
	get snippetProps() {
		return d(this.#e);
	}
	set snippetProps(e) {
		H(this.#e, e);
	}
	#t = G(() => ({
		...this.root.sharedProps,
		id: this.opts.id.current,
		[Dn.thumb]: "",
		...this.attachment
	}));
	get props() {
		return d(this.#t);
	}
	set props(e) {
		H(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/components/switch-input.svelte
function Mn(e, t) {
	i(t, !1);
	let n = An.create();
	Y();
	var a = T(), o = p(a), s = (e) => {
		pt(e, I(() => n.props));
	};
	r(o, (e) => {
		n.shouldRender && e(s);
	}), P(e, a), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/components/switch.svelte
var Nn = new Set([
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
]), Pn = V("<button><!></button>"), Fn = V("<!> <!>", 1);
function In(t, n) {
	let a = K();
	i(n, !0);
	let o = A(n, "ref", 15, null), s = A(n, "id", 19, () => Ge(a)), l = A(n, "disabled", 3, !1), u = A(n, "required", 3, !1), f = A(n, "checked", 15, !1), h = A(n, "value", 3, "on"), _ = A(n, "name", 3, void 0), v = A(n, "type", 3, "button"), b = A(n, "onCheckedChange", 3, ve), x = W(n, Nn), S = kn.create({
		checked: Q(() => f(), (e) => {
			f(e), b()?.(e);
		}),
		disabled: Q(() => l() ?? !1),
		required: Q(() => u()),
		value: Q(() => h()),
		name: Q(() => _()),
		id: Q(() => s()),
		ref: Q(() => o(), (e) => o(e))
	}), C = G(() => We(x, S.props, { type: v() }));
	var E = Fn(), D = p(E), O = (e) => {
		var t = T(), r = p(t);
		{
			let e = G(() => ({
				props: d(C),
				...S.snippetProps
			}));
			c(r, () => n.child, () => d(e));
		}
		P(e, t);
	}, k = (e) => {
		var t = Pn();
		F(t, () => ({ ...d(C) })), c(y(t), () => n.children ?? w, () => S.snippetProps), m(t), P(e, t);
	};
	r(D, (e) => {
		n.child ? e(O) : e(k, -1);
	}), Mn(e(D, 2), {}), P(t, E), g();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/components/switch-thumb.svelte
var Ln = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"ref",
	"id"
]), Rn = V("<span><!></span>");
function zn(e, t) {
	let n = K();
	i(t, !0);
	let a = A(t, "ref", 15, null), o = A(t, "id", 19, () => Ge(n)), s = W(t, Ln), l = jn.create({
		id: Q(() => o()),
		ref: Q(() => a(), (e) => a(e))
	}), u = G(() => We(s, l.props));
	var f = T(), h = p(f), _ = (e) => {
		var n = T(), r = p(n);
		{
			let e = G(() => ({
				props: d(u),
				...l.snippetProps
			}));
			c(r, () => t.child, () => d(e));
		}
		P(e, n);
	}, v = (e) => {
		var n = Rn();
		F(n, () => ({ ...d(u) })), c(y(n), () => t.children ?? w, () => l.snippetProps), m(n), P(e, n);
	};
	r(h, (e) => {
		t.child ? e(_) : e(v, -1);
	}), P(e, f), g();
}
//#endregion
//#region ../ui/src/lib/components/input/label.svelte
var Bn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function Vn(e, n) {
	i(n, !0);
	let r = W(n, Bn);
	var a = T(), o = p(a);
	{
		let e = G(() => Z("text-sm font-medium text-dark-50", n.class));
		t(o, () => vn, (t, i) => {
			i(t, I({ get children() {
				return n.children;
			} }, () => r, { get class() {
				return d(e);
			} }));
		});
	}
	P(e, a), g();
}
//#endregion
//#region ../ui/src/lib/components/input/input-checkbox.svelte
var Hn = V("<div><!> <!></div>"), Un = V("<p class=\"text-sm text-red-400\"> </p>"), Wn = V("<div><div class=\"flex items-center gap-2\"><!> <!></div> <!></div>");
function Gn(n, a) {
	i(a, !0);
	let o = A(a, "checked", 15, !1), s = A(a, "id", 19, qe), c = A(a, "inline", 3, !1);
	var l = T(), u = p(l), f = (n) => {
		var i = Hn(), c = y(i);
		{
			let e = (e, t) => {
				let n = () => t?.().checked;
				var i = T(), a = p(i), o = (e) => {
					X(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				r(a, (e) => {
					n() && e(o);
				}), P(e, i);
			}, n = G(() => a.label ? `${s()}-label` : void 0), i = G(() => a.error ? !0 : void 0), l = G(() => Z("peer inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary/15 data-[state=checked]:text-primary", "data-[state=unchecked]:bg-dark-700", a.error ? "border-red-500" : "border-dark-500 data-[state=unchecked]:hover:border-dark-400", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
			t(c, () => vt, (t, r) => {
				r(t, {
					get id() {
						return s();
					},
					get "aria-label"() {
						return a["aria-label"];
					},
					get "aria-labelledby"() {
						return d(n);
					},
					get "aria-invalid"() {
						return d(i);
					},
					get class() {
						return d(l);
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
		var l = e(c, 2), u = (e) => {
			Vn(e, {
				get id() {
					return `${s() ?? ""}-label`;
				},
				get for() {
					return s();
				},
				class: "cursor-pointer whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, t) => {
					b();
					var n = k();
					v(() => R(n, a.label)), P(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		r(l, (e) => {
			a.label && e(u);
		}), m(i), v((e) => q(i, 1, e), [() => D(Z("flex items-center gap-2", a.class))]), P(n, i);
	}, h = (n) => {
		var i = Wn(), c = y(i), l = y(c);
		{
			let e = (e, t) => {
				let n = () => t?.().checked;
				var i = T(), a = p(i), o = (e) => {
					X(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				r(a, (e) => {
					n() && e(o);
				}), P(e, i);
			}, n = G(() => a.label ? `${s()}-label` : void 0), i = G(() => a.error ? !0 : void 0), c = G(() => Z("peer inline-flex size-5 shrink-0 items-center justify-center rounded border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-dark-50", "data-[state=unchecked]:bg-dark-700", a.error ? "border-red-500" : "border-dark-500 data-[state=unchecked]:hover:border-dark-400", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
			t(l, () => vt, (t, r) => {
				r(t, {
					get id() {
						return s();
					},
					get "aria-label"() {
						return a["aria-label"];
					},
					get "aria-labelledby"() {
						return d(n);
					},
					get "aria-invalid"() {
						return d(i);
					},
					get class() {
						return d(c);
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
		var u = e(l, 2), f = (e) => {
			Vn(e, {
				get id() {
					return `${s() ?? ""}-label`;
				},
				get for() {
					return s();
				},
				class: "cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, t) => {
					b();
					var n = k();
					v(() => R(n, a.label)), P(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		r(u, (e) => {
			a.label && e(f);
		}), m(c);
		var h = e(c, 2), g = (e) => {
			var t = Un(), n = y(t, !0);
			m(t), v(() => R(n, a.error)), P(e, t);
		};
		r(h, (e) => {
			a.error && e(g);
		}), m(i), v((e) => q(i, 1, e), [() => D(Z("grid gap-2", a.class))]), P(n, i);
	};
	r(u, (e) => {
		c() ? e(f) : e(h, -1);
	}), P(n, l), g();
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/editor/editor.worker.js?worker
function Kn(e) {
	return new Worker("/assets/editor.worker-DQZqhwX7.js", { name: e?.name });
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/css/css.worker.js?worker
function qn(e) {
	return new Worker("/assets/css.worker-DTBmDe7I.js", { name: e?.name });
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/html/html.worker.js?worker
function Jn(e) {
	return new Worker("/assets/html.worker-CKMAQ2bm.js", { name: e?.name });
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/json/json.worker.js?worker
function Yn(e) {
	return new Worker("/assets/json.worker-BPpr10J4.js", { name: e?.name });
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js?worker
function Xn(e) {
	return new Worker("/assets/ts.worker-D8s_MXUW.js", { name: e?.name });
}
//#endregion
//#region ../ui/src/lib/monaco/setup.ts
var Zn = null, Qn = !1;
function $n(e) {
	if (Qn) return;
	let { typescript: t } = e;
	t.typescriptDefaults.setCompilerOptions({
		target: t.ScriptTarget.ES2020,
		allowNonTsExtensions: !0,
		module: t.ModuleKind.ESNext,
		moduleResolution: t.ModuleResolutionKind.NodeJs,
		noEmit: !0,
		esModuleInterop: !0,
		allowJs: !0
	}), t.typescriptDefaults.setDiagnosticsOptions({
		noSemanticValidation: !1,
		noSyntaxValidation: !1
	}), t.typescriptDefaults.setEagerModelSync(!0), t.javascriptDefaults.setCompilerOptions({
		target: t.ScriptTarget.ES2020,
		allowNonTsExtensions: !0,
		module: t.ModuleKind.ESNext,
		moduleResolution: t.ModuleResolutionKind.NodeJs,
		noEmit: !0,
		allowJs: !0
	}), Qn = !0;
}
async function er(e) {
	return Zn ? (e?.(Zn), Zn) : (globalThis.MonacoEnvironment = { getWorker(e, t) {
		switch (t) {
			case "json": return new Yn();
			case "css":
			case "scss":
			case "less": return new qn();
			case "html":
			case "handlebars":
			case "razor": return new Jn();
			case "typescript":
			case "javascript": return new Xn();
			default: return new Kn();
		}
	} }, Zn = await import("./editor.main-zSVqHPk3.js"), $n(Zn), e?.(Zn), Zn);
}
//#endregion
//#region ../ui/src/lib/components/input/input-code.svelte
var tr = V("<p class=\"text-sm text-red-400\"> </p>"), nr = V("<div><!> <div role=\"textbox\" aria-multiline=\"true\"></div> <!></div>");
function rr(t, a) {
	i(a, !0);
	let o = A(a, "id", 19, qe), s = A(a, "value", 3, ""), c = A(a, "language", 3, "typescript"), u = A(a, "minHeight", 3, "12rem"), f = O(void 0), p = O(void 0), h = O(!1), _ = !1;
	function x(e) {
		a.oninput && a.oninput({ currentTarget: { value: e } });
	}
	B(async () => {
		if (!d(f)) return;
		let e = await er(a.configureMonaco);
		if (_ || !d(f)) return;
		let t = c() === "typescript" ? "typescript" : "javascript", n = e.Uri.parse(`inmemory://model/${o()}.${t === "typescript" ? "ts" : "js"}`), r = e.editor.getModel(n) ?? e.editor.createModel(s(), t, n);
		H(p, e.editor.create(d(f), {
			model: r,
			theme: "vs-dark",
			automaticLayout: !0,
			fixedOverflowWidgets: !0,
			minimap: { enabled: !1 },
			scrollBeyondLastLine: !1,
			fontSize: 13,
			fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
			lineNumbers: "on",
			tabSize: 2,
			insertSpaces: !0,
			wordWrap: "on",
			padding: {
				top: 12,
				bottom: 12
			},
			scrollbar: {
				verticalScrollbarSize: 8,
				horizontalScrollbarSize: 8
			},
			placeholder: a.placeholder
		}), !0), d(p).onDidChangeModelContent(() => {
			x(d(p)?.getValue() ?? "");
		}), H(h, !0);
	}), n(() => {
		if (!(!d(p) || !d(h)) && d(p).getValue() !== s()) {
			let e = d(p).getPosition(), t = d(p).getSelection();
			d(p).setValue(s()), e && d(p).setPosition(e), t && d(p).setSelection(t);
		}
	}), C(() => {
		_ = !0;
		let e = d(p)?.getModel();
		d(p)?.dispose(), e?.dispose(), H(p, void 0);
	});
	var w = nr(), T = y(w), E = (e) => {
		Vn(e, {
			get for() {
				return o();
			},
			children: (e, t) => {
				b();
				var n = k();
				v(() => R(n, a.label)), P(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	r(T, (e) => {
		a.label && e(E);
	});
	var j = e(T, 2);
	let M;
	l(j, (e) => H(f, e), () => d(f));
	var N = e(j, 2), F = (e) => {
		var t = tr(), n = y(t, !0);
		m(t), v(() => R(n, a.error)), P(e, t);
	};
	r(N, (e) => {
		a.error && e(F);
	}), m(w), v((e, t) => {
		q(w, 1, e), U(j, "id", o()), U(j, "aria-invalid", a.error ? !0 : void 0), q(j, 1, t), M = S(j, "", M, { "min-height": u() });
	}, [() => D(Z("relative grid w-full gap-2")), () => D(Z("overflow-hidden rounded-xl border focus-within:ring-2", a.error ? "border-red-500 focus-within:ring-red-500" : "border-dark-500 focus-within:ring-primary", a.class))]), P(t, w), g();
}
//#endregion
//#region ../core/dist/index.js
function ir(e) {
	return Date.UTC(e.y, e.m - 1, e.d, e.h, e.i, e.s);
}
function ar(e, t) {
	return e.y === t.y && e.m === t.m && e.d === t.d && e.h === t.h && e.i === t.i && e.s === t.s;
}
function or(e, t) {
	let n = new Date(Date.parse(e));
	if (isNaN(n)) throw Error("Invalid ISO8601 passed to timezone parser.");
	let r = e.substring(9);
	return r.includes("Z") || r.includes("+") || r.includes("-") ? ur(n.getUTCFullYear(), n.getUTCMonth() + 1, n.getUTCDate(), n.getUTCHours(), n.getUTCMinutes(), n.getUTCSeconds(), "Etc/UTC") : ur(n.getFullYear(), n.getMonth() + 1, n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), t);
}
function sr(e, t, n) {
	return cr(or(e, t), n);
}
function cr(e, t) {
	let n = new Date(ir(e)), r = lr(n, e.tz), i = ir(e) - ir(r), a = new Date(n.getTime() + i), o = lr(a, e.tz);
	if (ar(o, e)) {
		let t = /* @__PURE__ */ new Date(a.getTime() - 36e5);
		return ar(lr(t, e.tz), e) ? t : a;
	}
	let s = new Date(a.getTime() + ir(e) - ir(o));
	if (ar(lr(s, e.tz), e)) return s;
	if (t) throw Error("Invalid date passed to fromTZ()");
	return a.getTime() > s.getTime() ? a : s;
}
function lr(e, t) {
	let n, r;
	try {
		n = new Intl.DateTimeFormat("en-US", {
			timeZone: t,
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			hour12: !1
		}), r = n.formatToParts(e);
	} catch (e) {
		let n = e instanceof Error ? e.message : String(e);
		throw RangeError(`toTZ: Invalid timezone '${t}' or date. Please provide a valid IANA timezone (e.g., 'America/New_York', 'Europe/Stockholm'). Original error: ${n}`);
	}
	let i = {
		year: 0,
		month: 0,
		day: 0,
		hour: 0,
		minute: 0,
		second: 0
	};
	for (let e of r) (e.type === "year" || e.type === "month" || e.type === "day" || e.type === "hour" || e.type === "minute" || e.type === "second") && (i[e.type] = parseInt(e.value, 10));
	if (isNaN(i.year) || isNaN(i.month) || isNaN(i.day) || isNaN(i.hour) || isNaN(i.minute) || isNaN(i.second)) throw Error(`toTZ: Failed to parse all date components from timezone '${t}'. This may indicate an invalid date or timezone configuration. Parsed components: ${JSON.stringify(i)}`);
	return i.hour === 24 && (i.hour = 0), {
		y: i.year,
		m: i.month,
		d: i.day,
		h: i.hour,
		i: i.minute,
		s: i.second,
		tz: t
	};
}
function ur(e, t, n, r, i, a, o) {
	return {
		y: e,
		m: t,
		d: n,
		h: r,
		i,
		s: a,
		tz: o
	};
}
var dr = [
	1,
	2,
	4,
	8,
	16
], fr = class {
	pattern;
	timezone;
	mode;
	alternativeWeekdays;
	sloppyRanges;
	second;
	minute;
	hour;
	day;
	month;
	dayOfWeek;
	year;
	lastDayOfMonth;
	lastWeekday;
	nearestWeekdays;
	starDOM;
	starDOW;
	starYear;
	useAndLogic;
	constructor(e, t, n) {
		this.pattern = e, this.timezone = t, this.mode = n?.mode ?? "auto", this.alternativeWeekdays = n?.alternativeWeekdays ?? !1, this.sloppyRanges = n?.sloppyRanges ?? !1, this.second = Array(60).fill(0), this.minute = Array(60).fill(0), this.hour = Array(24).fill(0), this.day = Array(31).fill(0), this.month = Array(12).fill(0), this.dayOfWeek = Array(7).fill(0), this.year = Array(1e4).fill(0), this.lastDayOfMonth = !1, this.lastWeekday = !1, this.nearestWeekdays = Array(31).fill(0), this.starDOM = !1, this.starDOW = !1, this.starYear = !1, this.useAndLogic = !1, this.parse();
	}
	parse() {
		if (!(typeof this.pattern == "string" || this.pattern instanceof String)) throw TypeError("CronPattern: Pattern has to be of type string.");
		this.pattern.indexOf("@") >= 0 && (this.pattern = this.handleNicknames(this.pattern).trim());
		let e = this.pattern.match(/\S+/g) || [""], t = e.length;
		if (e.length < 5 || e.length > 7) throw TypeError("CronPattern: invalid configuration format ('" + this.pattern + "'), exactly five, six, or seven space separated parts are required.");
		if (this.mode !== "auto") {
			let e;
			switch (this.mode) {
				case "5-part":
					e = 5;
					break;
				case "6-part":
					e = 6;
					break;
				case "7-part":
					e = 7;
					break;
				case "5-or-6-parts":
					e = [5, 6];
					break;
				case "6-or-7-parts":
					e = [6, 7];
					break;
				default: e = 0;
			}
			if (!(Array.isArray(e) ? e.includes(t) : t === e)) {
				let n = Array.isArray(e) ? e.join(" or ") : e.toString();
				throw TypeError(`CronPattern: mode '${this.mode}' requires exactly ${n} parts, but pattern '${this.pattern}' has ${t} parts.`);
			}
		}
		if (e.length === 5 && e.unshift("0"), e.length === 6 && e.push("*"), e[3].toUpperCase() === "LW" ? (this.lastWeekday = !0, e[3] = "") : e[3].toUpperCase().indexOf("L") >= 0 && (e[3] = e[3].replace(/L/gi, ""), this.lastDayOfMonth = !0), e[3] == "*" && (this.starDOM = !0), e[6] == "*" && (this.starYear = !0), e[4].length >= 3 && (e[4] = this.replaceAlphaMonths(e[4])), e[5].length >= 3 && (e[5] = this.alternativeWeekdays ? this.replaceAlphaDaysQuartz(e[5]) : this.replaceAlphaDays(e[5])), e[5].startsWith("+") && (this.useAndLogic = !0, e[5] = e[5].substring(1), e[5] === "")) throw TypeError("CronPattern: Day-of-week field cannot be empty after '+' modifier.");
		switch (e[5] == "*" && (this.starDOW = !0), this.pattern.indexOf("?") >= 0 && (e[0] = e[0].replace(/\?/g, "*"), e[1] = e[1].replace(/\?/g, "*"), e[2] = e[2].replace(/\?/g, "*"), e[3] = e[3].replace(/\?/g, "*"), e[4] = e[4].replace(/\?/g, "*"), e[5] = e[5].replace(/\?/g, "*"), e[6] &&= e[6].replace(/\?/g, "*")), this.mode) {
			case "5-part":
				e[0] = "0", e[6] = "*";
				break;
			case "6-part":
				e[6] = "*";
				break;
			case "5-or-6-parts":
				e[6] = "*";
				break;
			case "6-or-7-parts": break;
			case "7-part":
			case "auto": break;
		}
		this.throwAtIllegalCharacters(e), this.partToArray("second", e[0], 0, 1), this.partToArray("minute", e[1], 0, 1), this.partToArray("hour", e[2], 0, 1), this.partToArray("day", e[3], -1, 1), this.partToArray("month", e[4], -1, 1);
		let n = this.alternativeWeekdays ? -1 : 0;
		this.partToArray("dayOfWeek", e[5], n, 63), this.partToArray("year", e[6], 0, 1), !this.alternativeWeekdays && this.dayOfWeek[7] && (this.dayOfWeek[0] = this.dayOfWeek[7]);
	}
	partToArray(e, t, n, r) {
		let i = this[e], a = e === "day" && this.lastDayOfMonth, o = e === "day" && this.lastWeekday;
		if (t === "" && !a && !o) throw TypeError("CronPattern: configuration entry " + e + " (" + t + ") is empty, check for trailing spaces.");
		if (t === "*") return i.fill(r);
		let s = t.split(",");
		if (s.length > 1) for (let t = 0; t < s.length; t++) this.partToArray(e, s[t], n, r);
		else t.indexOf("-") !== -1 && t.indexOf("/") !== -1 ? this.handleRangeWithStepping(t, e, n, r) : t.indexOf("-") === -1 ? t.indexOf("/") === -1 ? t !== "" && this.handleNumber(t, e, n, r) : this.handleStepping(t, e, n, r) : this.handleRange(t, e, n, r);
	}
	throwAtIllegalCharacters(e) {
		for (let t = 0; t < e.length; t++) if ((t === 3 ? /[^/*0-9,\-WwLl]+/ : t === 5 ? /[^/*0-9,\-#Ll]+/ : /[^/*0-9,\-]+/).test(e[t])) throw TypeError("CronPattern: configuration entry " + t + " (" + e[t] + ") contains illegal characters.");
	}
	handleNumber(e, t, n, r) {
		let i = this.extractNth(e, t), a = e.toUpperCase().includes("W");
		if (t !== "day" && a) throw TypeError("CronPattern: Nearest weekday modifier (W) only allowed in day-of-month.");
		a && (t = "nearestWeekdays");
		let o = parseInt(i[0], 10) + n;
		if (isNaN(o)) throw TypeError("CronPattern: " + t + " is not a number: '" + e + "'");
		this.setPart(t, o, i[1] || r);
	}
	setPart(e, t, n) {
		if (!Object.prototype.hasOwnProperty.call(this, e)) throw TypeError("CronPattern: Invalid part specified: " + e);
		if (e === "dayOfWeek") {
			if (t === 7 && (t = 0), t < 0 || t > 6) throw RangeError("CronPattern: Invalid value for dayOfWeek: " + t);
			this.setNthWeekdayOfMonth(t, n);
			return;
		}
		if (e === "second" || e === "minute") {
			if (t < 0 || t >= 60) throw RangeError("CronPattern: Invalid value for " + e + ": " + t);
		} else if (e === "hour") {
			if (t < 0 || t >= 24) throw RangeError("CronPattern: Invalid value for " + e + ": " + t);
		} else if (e === "day" || e === "nearestWeekdays") {
			if (t < 0 || t >= 31) throw RangeError("CronPattern: Invalid value for " + e + ": " + t);
		} else if (e === "month") {
			if (t < 0 || t >= 12) throw RangeError("CronPattern: Invalid value for " + e + ": " + t);
		} else if (e === "year" && (t < 1 || t >= 1e4)) throw RangeError("CronPattern: Invalid value for " + e + ": " + t + " (supported range: 1-9999)");
		this[e][t] = n;
	}
	validateNotNaN(e, t) {
		if (isNaN(e)) throw TypeError(t);
	}
	validateRange(e, t, n, r, i) {
		if (e > t) throw TypeError("CronPattern: From value is larger than to value: '" + i + "'");
		if (n !== void 0) {
			if (n === 0) throw TypeError("CronPattern: Syntax error, illegal stepping: 0");
			if (n > this[r].length) throw TypeError("CronPattern: Syntax error, steps cannot be greater than maximum value of part (" + this[r].length + ")");
		}
	}
	handleRangeWithStepping(e, t, n, r) {
		if (e.toUpperCase().includes("W")) throw TypeError("CronPattern: Syntax error, W is not allowed in ranges with stepping.");
		let i = this.extractNth(e, t), a = i[0].match(/^(\d+)-(\d+)\/(\d+)$/);
		if (a === null) throw TypeError("CronPattern: Syntax error, illegal range with stepping: '" + e + "'");
		let [, o, s, c] = a, l = parseInt(o, 10) + n, u = parseInt(s, 10) + n, d = parseInt(c, 10);
		this.validateNotNaN(l, "CronPattern: Syntax error, illegal lower range (NaN)"), this.validateNotNaN(u, "CronPattern: Syntax error, illegal upper range (NaN)"), this.validateNotNaN(d, "CronPattern: Syntax error, illegal stepping: (NaN)"), this.validateRange(l, u, d, t, e);
		for (let e = l; e <= u; e += d) this.setPart(t, e, i[1] || r);
	}
	extractNth(e, t) {
		let n = e, r;
		if (n.includes("#")) {
			if (t !== "dayOfWeek") throw Error("CronPattern: nth (#) only allowed in day-of-week field");
			r = n.split("#")[1], n = n.split("#")[0];
		} else if (n.toUpperCase().endsWith("L")) {
			if (t !== "dayOfWeek") throw Error("CronPattern: L modifier only allowed in day-of-week field (use L alone for day-of-month)");
			r = "L", n = n.slice(0, -1);
		}
		return [n, r];
	}
	handleRange(e, t, n, r) {
		if (e.toUpperCase().includes("W")) throw TypeError("CronPattern: Syntax error, W is not allowed in a range.");
		let i = this.extractNth(e, t), a = i[0].split("-");
		if (a.length !== 2) throw TypeError("CronPattern: Syntax error, illegal range: '" + e + "'");
		let o = parseInt(a[0], 10) + n, s = parseInt(a[1], 10) + n;
		this.validateNotNaN(o, "CronPattern: Syntax error, illegal lower range (NaN)"), this.validateNotNaN(s, "CronPattern: Syntax error, illegal upper range (NaN)"), this.validateRange(o, s, void 0, t, e);
		for (let e = o; e <= s; e++) this.setPart(t, e, i[1] || r);
	}
	handleStepping(e, t, n, r) {
		if (e.toUpperCase().includes("W")) throw TypeError("CronPattern: Syntax error, W is not allowed in parts with stepping.");
		let i = this.extractNth(e, t), a = i[0].split("/");
		if (a.length !== 2) throw TypeError("CronPattern: Syntax error, illegal stepping: '" + e + "'");
		if (this.sloppyRanges) a[0] === "" && (a[0] = "*");
		else {
			if (a[0] === "") throw TypeError("CronPattern: Syntax error, stepping with missing prefix ('" + e + "') is not allowed. Use wildcard (*/step) or range (min-max/step) instead.");
			if (a[0] !== "*") throw TypeError("CronPattern: Syntax error, stepping with numeric prefix ('" + e + "') is not allowed. Use wildcard (*/step) or range (min-max/step) instead.");
		}
		let o = 0;
		a[0] !== "*" && (o = parseInt(a[0], 10) + n);
		let s = parseInt(a[1], 10);
		this.validateNotNaN(s, "CronPattern: Syntax error, illegal stepping: (NaN)"), this.validateRange(0, this[t].length - 1, s, t, e);
		for (let e = o; e < this[t].length; e += s) this.setPart(t, e, i[1] || r);
	}
	replaceAlphaDays(e) {
		return e.replace(/-sun/gi, "-7").replace(/sun/gi, "0").replace(/mon/gi, "1").replace(/tue/gi, "2").replace(/wed/gi, "3").replace(/thu/gi, "4").replace(/fri/gi, "5").replace(/sat/gi, "6");
	}
	replaceAlphaDaysQuartz(e) {
		return e.replace(/sun/gi, "1").replace(/mon/gi, "2").replace(/tue/gi, "3").replace(/wed/gi, "4").replace(/thu/gi, "5").replace(/fri/gi, "6").replace(/sat/gi, "7");
	}
	replaceAlphaMonths(e) {
		return e.replace(/jan/gi, "1").replace(/feb/gi, "2").replace(/mar/gi, "3").replace(/apr/gi, "4").replace(/may/gi, "5").replace(/jun/gi, "6").replace(/jul/gi, "7").replace(/aug/gi, "8").replace(/sep/gi, "9").replace(/oct/gi, "10").replace(/nov/gi, "11").replace(/dec/gi, "12");
	}
	handleNicknames(e) {
		let t = e.trim().toLowerCase();
		if (t === "@yearly" || t === "@annually") return "0 0 1 1 *";
		if (t === "@monthly") return "0 0 1 * *";
		if (t === "@weekly") return "0 0 * * 0";
		if (t === "@daily" || t === "@midnight") return "0 0 * * *";
		if (t === "@hourly") return "0 * * * *";
		if (t === "@reboot") throw TypeError("CronPattern: @reboot is not supported in this environment. This is an event-based trigger that requires system startup detection.");
		return e;
	}
	setNthWeekdayOfMonth(e, t) {
		if (typeof t != "number" && t.toUpperCase() === "L") this.dayOfWeek[e] = this.dayOfWeek[e] | 32;
		else if (t === 63) this.dayOfWeek[e] = 63;
		else if (t < 6 && t > 0) this.dayOfWeek[e] = this.dayOfWeek[e] | dr[t - 1];
		else throw TypeError(`CronPattern: nth weekday out of range, should be 1-5 or L. Value: ${t}, Type: ${typeof t}`);
	}
}, pr = [
	31,
	28,
	31,
	30,
	31,
	30,
	31,
	31,
	30,
	31,
	30,
	31
], $ = [
	[
		"month",
		"year",
		0
	],
	[
		"day",
		"month",
		-1
	],
	[
		"hour",
		"day",
		0
	],
	[
		"minute",
		"hour",
		0
	],
	[
		"second",
		"minute",
		0
	]
], mr = class e {
	tz;
	ms;
	second;
	minute;
	hour;
	day;
	month;
	year;
	constructor(t, n) {
		if (this.tz = n, t && t instanceof Date) if (!isNaN(t)) this.fromDate(t);
		else throw TypeError("CronDate: Invalid date passed to CronDate constructor");
		else if (t == null) this.fromDate(/* @__PURE__ */ new Date());
		else if (t && typeof t == "string") this.fromString(t);
		else if (t instanceof e) this.fromCronDate(t);
		else throw TypeError("CronDate: Invalid type (" + typeof t + ") passed to CronDate constructor");
	}
	getLastDayOfMonth(e, t) {
		return t === 1 ? new Date(Date.UTC(e, t + 1, 0)).getUTCDate() : pr[t];
	}
	getLastWeekday(e, t) {
		let n = this.getLastDayOfMonth(e, t), r = new Date(Date.UTC(e, t, n)).getUTCDay();
		return r === 0 ? n - 2 : r === 6 ? n - 1 : n;
	}
	getNearestWeekday(e, t, n) {
		let r = this.getLastDayOfMonth(e, t);
		if (n > r) return -1;
		let i = new Date(Date.UTC(e, t, n)).getUTCDay();
		return i === 0 ? n === r ? n - 2 : n + 1 : i === 6 ? n === 1 ? n + 2 : n - 1 : n;
	}
	isNthWeekdayOfMonth(e, t, n, r) {
		let i = new Date(Date.UTC(e, t, n)).getUTCDay(), a = 0;
		for (let r = 1; r <= n; r++) new Date(Date.UTC(e, t, r)).getUTCDay() === i && a++;
		if (r & 63 && dr[a - 1] & r) return !0;
		if (r & 32) {
			let r = this.getLastDayOfMonth(e, t);
			for (let a = n + 1; a <= r; a++) if (new Date(Date.UTC(e, t, a)).getUTCDay() === i) return !1;
			return !0;
		}
		return !1;
	}
	fromDate(e) {
		if (this.tz !== void 0) if (typeof this.tz == "number") this.ms = e.getUTCMilliseconds(), this.second = e.getUTCSeconds(), this.minute = e.getUTCMinutes() + this.tz, this.hour = e.getUTCHours(), this.day = e.getUTCDate(), this.month = e.getUTCMonth(), this.year = e.getUTCFullYear(), this.apply();
		else try {
			let t = lr(e, this.tz);
			this.ms = e.getMilliseconds(), this.second = t.s, this.minute = t.i, this.hour = t.h, this.day = t.d, this.month = t.m - 1, this.year = t.y;
		} catch (e) {
			let t = e instanceof Error ? e.message : String(e);
			throw TypeError(`CronDate: Failed to convert date to timezone '${this.tz}'. This may happen with invalid timezone names or dates. Original error: ${t}`);
		}
		else this.ms = e.getMilliseconds(), this.second = e.getSeconds(), this.minute = e.getMinutes(), this.hour = e.getHours(), this.day = e.getDate(), this.month = e.getMonth(), this.year = e.getFullYear();
	}
	fromCronDate(e) {
		this.tz = e.tz, this.year = e.year, this.month = e.month, this.day = e.day, this.hour = e.hour, this.minute = e.minute, this.second = e.second, this.ms = e.ms;
	}
	apply() {
		if (this.month > 11 || this.month < 0 || this.day > pr[this.month] || this.day < 1 || this.hour > 59 || this.minute > 59 || this.second > 59 || this.hour < 0 || this.minute < 0 || this.second < 0) {
			let e = new Date(Date.UTC(this.year, this.month, this.day, this.hour, this.minute, this.second, this.ms));
			return this.ms = e.getUTCMilliseconds(), this.second = e.getUTCSeconds(), this.minute = e.getUTCMinutes(), this.hour = e.getUTCHours(), this.day = e.getUTCDate(), this.month = e.getUTCMonth(), this.year = e.getUTCFullYear(), !0;
		} else return !1;
	}
	fromString(e) {
		if (typeof this.tz == "number") {
			let t = sr(e);
			this.ms = t.getUTCMilliseconds(), this.second = t.getUTCSeconds(), this.minute = t.getUTCMinutes(), this.hour = t.getUTCHours(), this.day = t.getUTCDate(), this.month = t.getUTCMonth(), this.year = t.getUTCFullYear(), this.apply();
		} else return this.fromDate(sr(e, this.tz));
	}
	findNext(e, t, n, r) {
		return this._findMatch(e, t, n, r, 1);
	}
	_findMatch(e, t, n, r, i) {
		let a = this[t], o;
		n.lastDayOfMonth && (o = this.getLastDayOfMonth(this.year, this.month));
		let s = !n.starDOW && t == "day" ? new Date(Date.UTC(this.year, this.month, 1, 0, 0, 0, 0)).getUTCDay() : void 0, c = this[t] + r, l = i === 1 ? (e) => e < n[t].length : (e) => e >= 0;
		for (let u = c; l(u); u += i) {
			let i = n[t][u];
			if (t === "day" && !i) {
				for (let e = 0; e < n.nearestWeekdays.length; e++) if (n.nearestWeekdays[e]) {
					let t = this.getNearestWeekday(this.year, this.month, e - r);
					if (t === -1) continue;
					if (t === u - r) {
						i = 1;
						break;
					}
				}
			}
			if (t === "day" && n.lastWeekday) {
				let e = this.getLastWeekday(this.year, this.month);
				u - r === e && (i = 1);
			}
			if (t === "day" && n.lastDayOfMonth && u - r == o && (i = 1), t === "day" && !n.starDOW) {
				let t = n.dayOfWeek[(s + (u - r - 1)) % 7];
				if (t && t & 63) t = +!!this.isNthWeekdayOfMonth(this.year, this.month, u - r, t);
				else if (t) throw Error(`CronDate: Invalid value for dayOfWeek encountered. ${t}`);
				n.useAndLogic ? i &&= t : !e.domAndDow && !n.starDOM ? i ||= t : i &&= t;
			}
			if (i) return this[t] = u - r, a === this[t] ? 1 : 2;
		}
		return 3;
	}
	recurse(e, t, n) {
		if (n === 0 && !e.starYear) {
			if (this.year >= 0 && this.year < e.year.length && e.year[this.year] === 0) {
				let t = -1;
				for (let n = this.year + 1; n < e.year.length && n < 1e4; n++) if (e.year[n] === 1) {
					t = n;
					break;
				}
				if (t === -1) return null;
				this.year = t, this.month = 0, this.day = 1, this.hour = 0, this.minute = 0, this.second = 0, this.ms = 0;
			}
			if (this.year >= 1e4) return null;
		}
		let r = this.findNext(t, $[n][0], e, $[n][2]);
		if (r > 1) {
			let i = n + 1;
			for (; i < $.length;) this[$[i][0]] = -$[i][2], i++;
			if (r === 3) {
				if (this[$[n][1]]++, this[$[n][0]] = -$[n][2], this.apply(), n === 0 && !e.starYear) {
					for (; this.year >= 0 && this.year < e.year.length && e.year[this.year] === 0 && this.year < 1e4;) this.year++;
					if (this.year >= 1e4 || this.year >= e.year.length) return null;
				}
				return this.recurse(e, t, 0);
			} else if (this.apply()) return this.recurse(e, t, n - 1);
		}
		return n += 1, n >= $.length ? this : (e.starYear ? this.year >= 3e3 : this.year >= 1e4) ? null : this.recurse(e, t, n);
	}
	increment(e, t, n) {
		return this.second += t.interval !== void 0 && t.interval > 1 && n ? t.interval : 1, this.ms = 0, this.apply(), this.recurse(e, t, 0);
	}
	decrement(e, t) {
		return this.second -= t.interval !== void 0 && t.interval > 1 ? t.interval : 1, this.ms = 0, this.apply(), this.recurseBackward(e, t, 0, 0);
	}
	recurseBackward(e, t, n, r = 0) {
		if (r > 1e4) return null;
		if (n === 0 && !e.starYear) {
			if (this.year >= 0 && this.year < e.year.length && e.year[this.year] === 0) {
				let t = -1;
				for (let n = this.year - 1; n >= 0; n--) if (e.year[n] === 1) {
					t = n;
					break;
				}
				if (t === -1) return null;
				this.year = t, this.month = 11, this.day = 31, this.hour = 23, this.minute = 59, this.second = 59, this.ms = 0;
			}
			if (this.year < 0) return null;
		}
		let i = this.findPrevious(t, $[n][0], e, $[n][2]);
		if (i > 1) {
			let a = n + 1;
			for (; a < $.length;) {
				let t = $[a][0], n = $[a][2], r = this.getMaxPatternValue(t, e, n);
				this[t] = r, a++;
			}
			if (i === 3) {
				if (this[$[n][1]]--, n === 0) {
					let e = this.getLastDayOfMonth(this.year, this.month);
					this.day > e && (this.day = e);
				}
				if (n === 1) if (this.day <= 0) this.day = 1;
				else {
					let e = this.year, t = this.month;
					for (; t < 0;) t += 12, e--;
					for (; t > 11;) t -= 12, e++;
					let n = t === 1 ? new Date(Date.UTC(e, t + 1, 0)).getUTCDate() : pr[t];
					this.day > n && (this.day = n);
				}
				this.apply();
				let i = $[n][0], a = $[n][2], o = this.getMaxPatternValue(i, e, a);
				if (i === "day") {
					let e = this.getLastDayOfMonth(this.year, this.month);
					this[i] = Math.min(o, e);
				} else this[i] = o;
				if (this.apply(), n === 0) {
					let t = $[1][2], n = this.getMaxPatternValue("day", e, t), r = this.getLastDayOfMonth(this.year, this.month), i = Math.min(n, r);
					i !== this.day && (this.day = i, this.hour = this.getMaxPatternValue("hour", e, $[2][2]), this.minute = this.getMaxPatternValue("minute", e, $[3][2]), this.second = this.getMaxPatternValue("second", e, $[4][2]));
				}
				if (n === 0 && !e.starYear) {
					for (; this.year >= 0 && this.year < e.year.length && e.year[this.year] === 0;) this.year--;
					if (this.year < 0) return null;
				}
				return this.recurseBackward(e, t, 0, r + 1);
			} else if (this.apply()) return this.recurseBackward(e, t, n - 1, r + 1);
		}
		return n += 1, n >= $.length ? this : this.year < 0 ? null : this.recurseBackward(e, t, n, r + 1);
	}
	getMaxPatternValue(e, t, n) {
		if (e === "day" && t.lastDayOfMonth || e === "day" && !t.starDOW) return this.getLastDayOfMonth(this.year, this.month);
		for (let r = t[e].length - 1; r >= 0; r--) if (t[e][r]) return r - n;
		return t[e].length - 1 - n;
	}
	findPrevious(e, t, n, r) {
		return this._findMatch(e, t, n, r, -1);
	}
	getDate(e) {
		return e || this.tz === void 0 ? new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.ms) : typeof this.tz == "number" ? new Date(Date.UTC(this.year, this.month, this.day, this.hour, this.minute - this.tz, this.second, this.ms)) : cr(ur(this.year, this.month + 1, this.day, this.hour, this.minute, this.second, this.tz), !1);
	}
	getTime() {
		return this.getDate(!1).getTime();
	}
	match(e, t) {
		if (!e.starYear && (this.year < 0 || this.year >= e.year.length || e.year[this.year] === 0)) return !1;
		for (let n = 0; n < $.length; n++) {
			let r = $[n][0], i = $[n][2], a = this[r];
			if (a + i < 0 || a + i >= e[r].length) return !1;
			let o = e[r][a + i];
			if (r === "day") {
				if (!o) {
					for (let t = 0; t < e.nearestWeekdays.length; t++) if (e.nearestWeekdays[t]) {
						let e = this.getNearestWeekday(this.year, this.month, t - i);
						if (e !== -1 && e === a) {
							o = 1;
							break;
						}
					}
				}
				if (e.lastWeekday && a === this.getLastWeekday(this.year, this.month) && (o = 1), e.lastDayOfMonth && a === this.getLastDayOfMonth(this.year, this.month) && (o = 1), !e.starDOW) {
					let n = new Date(Date.UTC(this.year, this.month, 1, 0, 0, 0, 0)).getUTCDay(), r = e.dayOfWeek[(n + (a - 1)) % 7];
					r && r & 63 && (r = +!!this.isNthWeekdayOfMonth(this.year, this.month, a, r)), e.useAndLogic ? o &&= r : !t.domAndDow && !e.starDOM ? o ||= r : o &&= r;
				}
			}
			if (!o) return !1;
		}
		return !0;
	}
};
function hr(e) {
	if (e === void 0 && (e = {}), delete e.name, e.legacyMode !== void 0 && e.domAndDow === void 0 ? e.domAndDow = !e.legacyMode : e.domAndDow === void 0 && (e.domAndDow = !1), e.legacyMode = !e.domAndDow, e.paused = e.paused === void 0 ? !1 : e.paused, e.maxRuns = e.maxRuns === void 0 ? Infinity : e.maxRuns, e.catch = e.catch === void 0 ? !1 : e.catch, e.interval = e.interval === void 0 ? 0 : parseInt(e.interval.toString(), 10), e.utcOffset = e.utcOffset === void 0 ? void 0 : parseInt(e.utcOffset.toString(), 10), e.dayOffset = e.dayOffset === void 0 ? 0 : parseInt(e.dayOffset.toString(), 10), e.unref = e.unref === void 0 ? !1 : e.unref, e.mode = e.mode === void 0 ? "auto" : e.mode, e.alternativeWeekdays = e.alternativeWeekdays === void 0 ? !1 : e.alternativeWeekdays, e.sloppyRanges = e.sloppyRanges === void 0 ? !1 : e.sloppyRanges, ![
		"auto",
		"5-part",
		"6-part",
		"7-part",
		"5-or-6-parts",
		"6-or-7-parts"
	].includes(e.mode)) throw Error("CronOptions: mode must be one of 'auto', '5-part', '6-part', '7-part', '5-or-6-parts', or '6-or-7-parts'.");
	if (e.startAt &&= new mr(e.startAt, e.timezone), e.stopAt &&= new mr(e.stopAt, e.timezone), e.interval !== null) {
		if (isNaN(e.interval)) throw Error("CronOptions: Supplied value for interval is not a number");
		if (e.interval < 0) throw Error("CronOptions: Supplied value for interval can not be negative");
	}
	if (e.utcOffset !== void 0) {
		if (isNaN(e.utcOffset)) throw Error("CronOptions: Invalid value passed for utcOffset, should be number representing minutes offset from UTC.");
		if (e.utcOffset < -870 || e.utcOffset > 870) throw Error("CronOptions: utcOffset out of bounds.");
		if (e.utcOffset !== void 0 && e.timezone) throw Error("CronOptions: Combining 'utcOffset' with 'timezone' is not allowed.");
	}
	if (e.unref !== !0 && e.unref !== !1) throw Error("CronOptions: Unref should be either true, false or undefined(false).");
	if (e.dayOffset !== void 0 && e.dayOffset !== 0 && isNaN(e.dayOffset)) throw Error("CronOptions: Invalid value passed for dayOffset, should be a number representing days to offset.");
	return e;
}
function gr(e) {
	return Object.prototype.toString.call(e) === "[object Function]" || typeof e == "function" || e instanceof Function;
}
function _r(e) {
	return gr(e);
}
function vr(e) {
	typeof Deno < "u" && typeof Deno.unrefTimer < "u" ? Deno.unrefTimer(e) : e && typeof e.unref < "u" && e.unref();
}
var yr = 30 * 1e3, br = [], xr = class {
	name;
	options;
	_states;
	fn;
	getTz() {
		return this.options.timezone || this.options.utcOffset;
	}
	applyDayOffset(e) {
		if (this.options.dayOffset !== void 0 && this.options.dayOffset !== 0) {
			let t = this.options.dayOffset * 24 * 60 * 60 * 1e3;
			return new Date(e.getTime() + t);
		}
		return e;
	}
	constructor(e, t, n) {
		let r, i;
		if (gr(t)) i = t;
		else if (typeof t == "object") r = t;
		else if (t !== void 0) throw Error("Cron: Invalid argument passed for optionsIn. Should be one of function, or object (options).");
		if (gr(n)) i = n;
		else if (typeof n == "object") r = n;
		else if (n !== void 0) throw Error("Cron: Invalid argument passed for funcIn. Should be one of function, or object (options).");
		if (this.name = r?.name, this.options = hr(r), this._states = {
			kill: !1,
			blocking: !1,
			previousRun: void 0,
			currentRun: void 0,
			once: void 0,
			currentTimeout: void 0,
			maxRuns: r ? r.maxRuns : void 0,
			paused: r ? r.paused : !1,
			pattern: new fr("* * * * *", void 0, { mode: "auto" })
		}, e && (e instanceof Date || typeof e == "string" && e.indexOf(":") > 0) ? this._states.once = new mr(e, this.getTz()) : this._states.pattern = new fr(e, this.options.timezone, {
			mode: this.options.mode,
			alternativeWeekdays: this.options.alternativeWeekdays,
			sloppyRanges: this.options.sloppyRanges
		}), this.name) {
			if (br.find((e) => e.name === this.name)) throw Error("Cron: Tried to initialize new named job '" + this.name + "', but name already taken.");
			br.push(this);
		}
		return i !== void 0 && _r(i) && (this.fn = i, this.schedule()), this;
	}
	nextRun(e) {
		let t = this._next(e);
		return t ? this.applyDayOffset(t.getDate(!1)) : null;
	}
	nextRuns(e, t) {
		this._states.maxRuns !== void 0 && e > this._states.maxRuns && (e = this._states.maxRuns);
		let n = t || this._states.currentRun || void 0;
		return this._enumerateRuns(e, n, "next");
	}
	previousRuns(e, t) {
		return this._enumerateRuns(e, t || void 0, "previous");
	}
	_enumerateRuns(e, t, n) {
		let r = [], i = t ? new mr(t, this.getTz()) : null, a = n === "next" ? this._next : this._previous;
		for (; e--;) {
			let e = a.call(this, i);
			if (!e) break;
			let t = e.getDate(!1);
			r.push(this.applyDayOffset(t)), i = e;
		}
		return r;
	}
	match(e) {
		if (this._states.once) {
			let t = new mr(e, this.getTz());
			t.ms = 0;
			let n = new mr(this._states.once, this.getTz());
			return n.ms = 0, t.getTime() === n.getTime();
		}
		let t = new mr(e, this.getTz());
		return t.ms = 0, t.match(this._states.pattern, this.options);
	}
	getPattern() {
		if (!this._states.once) return this._states.pattern ? this._states.pattern.pattern : void 0;
	}
	getOnce() {
		return this._states.once ? this._states.once.getDate() : null;
	}
	isRunning() {
		let e = this.nextRun(this._states.currentRun), t = !this._states.paused, n = this.fn !== void 0, r = !this._states.kill;
		return t && n && r && e !== null;
	}
	isStopped() {
		return this._states.kill;
	}
	isBusy() {
		return this._states.blocking;
	}
	currentRun() {
		return this._states.currentRun ? this._states.currentRun.getDate() : null;
	}
	previousRun() {
		return this._states.previousRun ? this._states.previousRun.getDate() : null;
	}
	msToNext(e) {
		let t = this._next(e);
		return t ? e instanceof mr || e instanceof Date ? t.getTime() - e.getTime() : t.getTime() - new mr(e).getTime() : null;
	}
	stop() {
		this._states.kill = !0, this._states.currentTimeout && clearTimeout(this._states.currentTimeout);
		let e = br.indexOf(this);
		e >= 0 && br.splice(e, 1);
	}
	pause() {
		return this._states.paused = !0, !this._states.kill;
	}
	resume() {
		return this._states.paused = !1, !this._states.kill;
	}
	schedule(e) {
		if (e && this.fn) throw Error("Cron: It is not allowed to schedule two functions using the same Croner instance.");
		e && (this.fn = e);
		let t = this.msToNext(), n = this.nextRun(this._states.currentRun);
		return t == null || isNaN(t) || n === null ? this : (t > yr && (t = yr), this._states.currentTimeout = setTimeout(() => this._checkTrigger(n), t), this._states.currentTimeout && this.options.unref && vr(this._states.currentTimeout), this);
	}
	async _trigger(e) {
		this._states.blocking = !0, this._states.currentRun = new mr(void 0, this.getTz());
		try {
			if (this.options.catch) try {
				this.fn !== void 0 && await this.fn(this, this.options.context);
			} catch (e) {
				if (gr(this.options.catch)) try {
					this.options.catch(e, this);
				} catch {}
			}
			else this.fn !== void 0 && await this.fn(this, this.options.context);
		} finally {
			this._states.previousRun = new mr(e, this.getTz()), this._states.blocking = !1;
		}
	}
	async trigger() {
		await this._trigger();
	}
	runsLeft() {
		return this._states.maxRuns;
	}
	_checkTrigger(e) {
		let t = /* @__PURE__ */ new Date(), n = !this._states.paused && t.getTime() >= e.getTime(), r = this._states.blocking && this.options.protect;
		n && !r ? (this._states.maxRuns !== void 0 && this._states.maxRuns--, this._trigger()) : n && r && gr(this.options.protect) && setTimeout(() => this.options.protect(this), 0), this.schedule();
	}
	_next(e) {
		let t = !!(e || this._states.currentRun), n = !1;
		!e && this.options.startAt && this.options.interval && ([e, t] = this._calculatePreviousRun(e, t), n = !e), e = new mr(e, this.getTz()), this.options.startAt && e && e.getTime() < this.options.startAt.getTime() && (e = this.options.startAt);
		let r = this._states.once || new mr(e, this.getTz());
		return !n && r !== this._states.once && (r = r.increment(this._states.pattern, this.options, t)), this._states.once && this._states.once.getTime() <= e.getTime() || r === null || this._states.maxRuns !== void 0 && this._states.maxRuns <= 0 || this._states.kill || this.options.stopAt && r.getTime() >= this.options.stopAt.getTime() ? null : r;
	}
	_previous(e) {
		let t = new mr(e, this.getTz());
		this.options.stopAt && t.getTime() > this.options.stopAt.getTime() && (t = this.options.stopAt);
		let n = new mr(t, this.getTz());
		return this._states.once ? this._states.once.getTime() < t.getTime() ? this._states.once : null : (n = n.decrement(this._states.pattern, this.options), n === null || this.options.startAt && n.getTime() < this.options.startAt.getTime() ? null : n);
	}
	_calculatePreviousRun(e, t) {
		let n = new mr(void 0, this.getTz()), r = e;
		if (this.options.startAt.getTime() <= n.getTime()) {
			r = this.options.startAt;
			let e = r.getTime() + this.options.interval * 1e3;
			for (; e <= n.getTime();) r = new mr(r, this.getTz()).increment(this._states.pattern, this.options, !0), e = r.getTime() + this.options.interval * 1e3;
			t = !0;
		}
		return r === null && (r = void 0), [r, t];
	}
}, Sr = [
	{
		value: "*/15 * * * *",
		label: "Every 15 minutes"
	},
	{
		value: "0 * * * *",
		label: "Every hour"
	},
	{
		value: "0 9 * * *",
		label: "Daily at 09:00"
	},
	{
		value: "0 9 * * 1-5",
		label: "Weekdays at 09:00"
	},
	{
		value: "0 0 * * 0",
		label: "Weekly on Sunday"
	},
	{
		value: "0 0 1 * *",
		label: "Monthly on the 1st"
	}
], Cr = [
	"minute",
	"hour",
	"day",
	"month",
	"weekday"
];
function wr() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function Tr(e) {
	return e.trim().replace(/\s+/g, " ");
}
function Er(e) {
	let t = Tr(e);
	return t ? t.split(" ").length : 0;
}
function Dr(e) {
	let t = Tr(e);
	if (!t) return [
		"",
		"",
		"",
		"",
		""
	];
	let n = t.split(" ");
	for (; n.length < 5;) n.push("");
	return n.slice(0, 5);
}
function Or(e) {
	let t = Tr(e);
	if (!t || Er(t) !== 5) return !1;
	try {
		return new xr(t, {
			timezone: wr(),
			paused: !0
		}), !0;
	} catch {
		return !1;
	}
}
function kr(e) {
	let t = Tr(e);
	if (t) {
		if (Er(t) !== 5) return "Cron expression must have exactly 5 fields";
		if (!Or(t)) return "Invalid cron expression";
	}
}
function Ar(e) {
	let t = Tr(e);
	if (Or(t)) try {
		let e = new xr(t, {
			timezone: wr(),
			paused: !0
		}).nextRun();
		return e ? e.toLocaleString(void 0, {
			dateStyle: "medium",
			timeStyle: "short"
		}) : void 0;
	} catch {
		return;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/internal/configurable-globals.js
var jr = typeof window < "u" ? window : void 0;
typeof window < "u" && window.document, typeof window < "u" && window.navigator, typeof window < "u" && window.location;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/internal/utils/dom.js
function Mr(e) {
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
		let { window: t = jr, document: n = t?.document } = e;
		t !== void 0 && (this.#e = n, this.#t = h((e) => {
			let n = x(t, "focusin", e), r = x(t, "focusout", e);
			return () => {
				n(), r();
			};
		}));
	}
	get current() {
		return this.#t?.(), this.#e ? Mr(this.#e) : null;
	}
}();
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/internal/utils/is.js
function Nr(e) {
	return typeof e == "function";
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/extract/extract.svelte.js
function Pr(e, t) {
	if (Nr(e)) {
		let n = e();
		return n === void 0 ? t : n;
	}
	return e === void 0 ? t : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/use-debounce/use-debounce.svelte.js
function Fr(e, t) {
	let n = O(null), r = G(() => Pr(t, 250));
	function i(...t) {
		if (d(n)) d(n).timeout && clearTimeout(d(n).timeout);
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
		return d(n).runner = async () => {
			if (!d(n)) return;
			let r = d(n);
			H(n, null);
			try {
				r.resolve(await e.apply(this, t));
			} catch (e) {
				r.reject(e);
			}
		}, d(n).timeout = setTimeout(d(n).runner, d(r)), d(n).promise;
	}
	return i.cancel = async () => {
		(!d(n) || d(n).timeout === null) && (await new Promise((e) => setTimeout(e, 0)), !d(n) || d(n).timeout === null) || (clearTimeout(d(n).timeout), d(n).reject("Cancelled"), H(n, null));
	}, i.runScheduledNow = async () => {
		(!d(n) || !d(n).timeout) && (await new Promise((e) => setTimeout(e, 0)), !d(n) || !d(n).timeout) || (clearTimeout(d(n).timeout), d(n).timeout = null, await d(n).runner?.());
	}, Object.defineProperty(i, "pending", {
		enumerable: !0,
		get() {
			return !!d(n)?.timeout;
		}
	}), i;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/watch/watch.svelte.js
function Ir(e, t) {
	switch (e) {
		case "post":
			n(t);
			break;
		case "pre":
			o(t);
			break;
	}
}
function Lr(e, t, n, r = {}) {
	let { lazy: i = !1 } = r, a = !i, o = Array.isArray(e) ? [] : void 0;
	Ir(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!a) {
			a = !0, o = t;
			return;
		}
		let r = u(() => n(t, o));
		return o = t, r;
	});
}
function Rr(e, t, r) {
	let i = te(() => {
		let n = !1;
		Lr(e, t, (e, t) => {
			if (n) {
				i();
				return;
			}
			let a = r(e, t);
			return n = !0, a;
		}, { lazy: !0 });
	});
	n(() => i);
}
function zr(e, t, n) {
	Lr(e, "post", t, n);
}
function Br(e, t, n) {
	Lr(e, "pre", t, n);
}
zr.pre = Br;
function Vr(e, t) {
	Rr(e, "post", t);
}
function Hr(e, t) {
	Rr(e, "pre", t);
}
Vr.pre = Hr;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/internal/utils/function.js
function Ur() {}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/debounced/debounced.svelte.js
var Wr = class {
	#e = O();
	#t;
	constructor(e, t = 250) {
		H(this.#e, e(), !0), this.cancel = this.cancel.bind(this), this.setImmediately = this.setImmediately.bind(this), this.updateImmediately = this.updateImmediately.bind(this), this.#t = Fr(() => {
			H(this.#e, e(), !0);
		}, t), zr(e, () => {
			this.#t().catch(Ur);
		});
	}
	get current() {
		return d(this.#e);
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
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/resource/resource.svelte.js
function Gr(e, t) {
	let n, r = null;
	return (...i) => new Promise((a) => {
		r && r(void 0), r = a, clearTimeout(n), n = setTimeout(async () => {
			let t = await e(...i);
			r &&= (r(t), null);
		}, t);
	});
}
function Kr(e, t) {
	let n = 0, r = null;
	return (...i) => {
		let a = Date.now();
		return n && a - n < t ? r ?? Promise.resolve(void 0) : (n = a, r = e(...i), r);
	};
}
function qr(e, t, n = {}, r) {
	let { lazy: i = !1, once: a = !1, initialValue: o, debounce: s, throttle: c } = n, l = O(z(o)), u = O(z(o === void 0 && !i)), f = O(void 0), p = O(z([])), m = () => {
		d(p).forEach((e) => e()), H(p, [], !0);
	}, h = (e) => {
		H(p, [...d(p), e], !0);
	}, g = async (e, n, r = !1) => {
		try {
			H(u, !0), H(f, void 0), m();
			let i = new AbortController();
			h(() => i.abort());
			let a = await t(e, n, {
				data: d(l),
				refetching: r,
				onCleanup: h,
				signal: i.signal
			});
			return H(l, a, !0), a;
		} catch (e) {
			e instanceof DOMException && e.name === "AbortError" || H(f, e, !0);
			return;
		} finally {
			H(u, !1);
		}
	}, _ = s ? Gr(g, s) : c ? Kr(g, c) : g, v = Array.isArray(e) ? e : [e], y;
	return r((t, n) => {
		a && y || (y = t, _(Array.isArray(e) ? t : t[0], Array.isArray(e) ? n : n?.[0]));
	}, { lazy: i }), {
		get current() {
			return d(l);
		},
		get loading() {
			return d(u);
		},
		get error() {
			return d(f);
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
function Jr(e, t, n) {
	return qr(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		zr(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
function Yr(e, t, n) {
	return qr(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		zr.pre(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
Jr.pre = Yr;
//#endregion
//#region ../ui/src/lib/components/input/input-size-classes.ts
var Xr = {
	xs: "px-2 py-1 text-xs",
	sm: "px-3 py-2 text-xs",
	md: "px-4 py-2 text-sm",
	lg: "px-5 py-3 text-base"
}, Zr = {
	xs: "size-3",
	sm: "size-4",
	md: "size-5",
	lg: "size-6"
}, Qr = {
	xs: "min-w-8",
	sm: "min-w-9",
	md: "min-w-10",
	lg: "min-w-10"
};
//#endregion
//#region ../ui/src/lib/components/input/resolve-select-items.svelte.ts
function $r(e, t) {
	let r = O(z([])), i = O(!1), a = O(0), o = G(() => {
		let t = e();
		return typeof t == "function" ? (d(a), d(r)) : t;
	}), s = G(() => typeof e() == "function" ? (d(a), d(i)) : !1);
	return n(() => {
		t && t();
		let n = e();
		if (typeof n != "function") return;
		H(i, !0);
		let o = !1;
		return Promise.resolve(n()).then((e) => {
			o || (H(r, e, !0), H(i, !1), ee(a));
		}, () => {
			o || (H(r, [], !0), H(i, !1), ee(a));
		}), () => {
			o = !0;
		};
	}), {
		get items() {
			return d(o);
		},
		get loading() {
			return d(s);
		}
	};
}
function ei(e, t) {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => e.label.toLowerCase().includes(n) || e.value.toLowerCase().includes(n)) : e;
}
function ti(e, t, n = 200, r = 36, i = 6) {
	let a = e.length * r, o = Math.max(0, Math.floor(t / r) - i), s = Math.ceil(n / r) + i * 2, c = Math.min(e.length, o + s);
	return {
		items: e.slice(o, c),
		startIndex: o,
		totalHeight: a,
		offsetY: o * r
	};
}
function ni(e) {
	return e > 50;
}
function ri(e, t = 36) {
	return Math.max(0, e * t);
}
//#endregion
//#region ../ui/src/lib/components/input/select-dropdown-search.svelte
var ii = V("<div><div class=\"relative flex items-center\"><input type=\"search\" autocomplete=\"off\"/></div></div>");
function ai(e, t) {
	i(t, !0);
	let n = A(t, "query", 15, ""), r = A(t, "placeholder", 3, "Search values"), a = A(t, "ariaLabel", 3, "Search values"), o = A(t, "inputElement", 15, null), s = (e) => {
		(e.key.length === 1 || e.key === "Backspace" || e.key === "Delete") && e.stopPropagation();
	};
	var c = ii(), u = y(c), d = y(u);
	E(d), l(d, (e) => o(e), () => o()), m(u), m(c), v((e, t) => {
		q(c, 1, e), U(d, "placeholder", r()), U(d, "aria-label", a()), q(d, 1, t);
	}, [() => D(Z("sticky top-0 z-10 mb-[5px] shrink-0 border-b border-dark-600", t.class)), () => D(Z("w-full rounded-lg text-dark-50 outline-none", Xr.md, "focus:border-primary focus:ring-1 focus:ring-primary"))]), N("keydown", d, s), N("click", d, (e) => e.stopPropagation()), f(d, n), P(e, c), g();
}
L(["keydown", "click"]);
//#endregion
//#region ../ui/src/lib/components/input/use-dropdown-scroll.svelte.ts
var oi = class {
	#e = O(0);
	get scrollTop() {
		return d(this.#e);
	}
	set scrollTop(e) {
		H(this.#e, e, !0);
	}
	#t = O(null);
	get viewportRef() {
		return d(this.#t);
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
		let t = ri(e);
		this.scrollTop = t, this.viewportRef && (this.viewportRef.scrollTop = t);
	}
	scrollToValue(e, t) {
		if (!t) return;
		let n = e.findIndex((e) => e.value === t);
		n >= 0 && this.scrollToIndex(n);
	}
}, si = V("<div class=\"relative w-full\"><div class=\"absolute inset-x-0 top-0\"></div></div>");
function ci(e, t) {
	i(t, !0);
	let n = G(() => ni(t.items.length)), a = G(() => d(n) ? ti(t.items, t.scrollTop) : null), o = G(() => d(n) && d(a) ? d(a).items : t.items);
	var s = T(), l = p(s), u = (e) => {
		var n = si();
		let r;
		var i = y(n);
		let s;
		_(i, 21, () => d(o), (e) => e.value, (e, n) => {
			var r = T();
			c(p(r), () => t.item, () => d(n)), P(e, r);
		}), m(i), m(n), v(() => {
			r = S(n, "", r, { height: `${d(a).totalHeight}px` }), s = S(i, "", s, { transform: `translateY(${d(a).offsetY}px)` });
		}), P(e, n);
	}, f = (e) => {
		var n = T();
		_(p(n), 17, () => d(o), (e) => e.value, (e, n) => {
			var r = T();
			c(p(r), () => t.item, () => d(n)), P(e, r);
		}), P(e, n);
	};
	r(l, (e) => {
		d(n) && d(a) ? e(u) : e(f, -1);
	}), P(e, s), g();
}
//#endregion
//#region ../ui/src/lib/components/input/input-select.svelte
var li = (n, i = w) => {
	let a = G(() => i().value), o = G(() => i().label), s = G(() => i().disabled);
	var c = T(), l = p(c);
	{
		let n = (t, n) => {
			let i = () => n?.().selected;
			b();
			var a = di(), s = p(a), c = e(s), l = (e) => {
				X(e, {
					icon: "ri:check-line",
					class: "size-5 text-primary"
				});
			};
			r(c, (e) => {
				i() && e(l);
			}), v(() => R(s, `${d(o) ?? ""} `)), P(t, a);
		}, i = G(() => Z("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
		t(l, () => en, (e, t) => {
			t(e, {
				get value() {
					return d(a);
				},
				get label() {
					return d(o);
				},
				get disabled() {
					return d(s);
				},
				get class() {
					return d(i);
				},
				children: n,
				$$slots: { default: !0 }
			});
		});
	}
	P(n, c);
}, ui = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"label",
	"items",
	"placeholder",
	"loadingPlaceholder",
	"searchPlaceholder",
	"noResultsLabel",
	"searchable",
	"prependIcon",
	"contentProps",
	"id",
	"class",
	"error",
	"reloadKey",
	"type",
	"disabled",
	"value"
]), di = V(" <!>", 1), fi = V("<span class=\"grid h-full min-w-10 place-items-center rounded-l-xl border border-r-0 border-dark-700 text-dark-50\"><!></span>"), pi = V("<!> <span><!> <!></span>", 1), mi = V("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), hi = V("<!> <!> <!> <!>", 1), gi = V("<div><!></div> <!>", 1), _i = V("<p class=\"text-sm text-red-400\"> </p>"), vi = V("<div><!> <!> <!></div>");
function yi(a, o) {
	i(o, !0);
	let c = (n) => {
		var i = gi(), a = p(i);
		t(y(a), () => En, (n, i) => {
			i(n, {
				get id() {
					return u();
				},
				class: "flex w-full cursor-pointer items-center outline-none",
				children: (n, i) => {
					var a = pi(), s = p(a), c = (e) => {
						var t = fi();
						X(y(t), {
							get icon() {
								return o.prependIcon;
							},
							class: "size-6"
						}), m(t), P(e, t);
					};
					r(s, (e) => {
						o.prependIcon && e(c);
					});
					var l = e(s, 2), u = y(l);
					{
						let e = G(() => N.loading ? d(x) : d(_));
						t(u, () => Cn, (t, n) => {
							n(t, {
								get placeholder() {
									return d(e);
								},
								class: "truncate data-placeholder:text-dark-300"
							});
						});
					}
					X(e(u, 2), {
						icon: "ri:expand-up-down-line",
						class: "size-5 shrink-0 text-dark-300"
					}), m(l), v((e) => q(l, 1, e), [() => D(Z("flex w-full items-center justify-between gap-2 border bg-dark-700 text-dark-50 outline-none", Xr.md, o.error ? "border-red-500" : "border-dark-500", {
						"rounded-l-none rounded-r-xl border-l-0": o.prependIcon,
						"rounded-xl": !o.prependIcon
					}))]), P(n, a);
				},
				$$slots: { default: !0 }
			});
		}), m(a), t(e(a, 2), () => Qe, (n, i) => {
			i(n, {
				children: (n, i) => {
					var a = T(), s = p(a);
					{
						let n = G(() => o.contentProps?.sideOffset ?? 4), i = G(() => Z("z-50 max-h-60 w-(--bits-select-anchor-width) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 shadow-md outline-none", o.contentProps?.class));
						t(s, () => Yt, (a, s) => {
							s(a, I(() => o.contentProps, {
								get sideOffset() {
									return d(n);
								},
								get class() {
									return d(i);
								},
								children: (n, i) => {
									var a = hi(), o = p(a), s = (e) => {
										ai(e, {
											get placeholder() {
												return d(S);
											},
											get ariaLabel() {
												return d(S);
											},
											get query() {
												return d(E);
											},
											set query(e) {
												H(E, e, !0);
											},
											get inputElement() {
												return d(j);
											},
											set inputElement(e) {
												H(j, e, !0);
											}
										});
									};
									r(o, (e) => {
										d(L) && !N.loading && e(s);
									});
									var c = e(o, 2);
									t(c, () => pn, (e, t) => {
										t(e, {
											class: "flex w-full items-center justify-center py-1 text-dark-300",
											children: (e, t) => {
												X(e, { icon: "ri:arrow-up-s-line" });
											},
											$$slots: { default: !0 }
										});
									});
									var l = e(c, 2);
									t(l, () => an, (e, t) => {
										t(e, {
											get onscroll() {
												return M.handleViewportScroll;
											},
											class: " p-[5px]",
											get ref() {
												return M.viewportRef;
											},
											set ref(e) {
												M.viewportRef = e;
											},
											children: (e, t) => {
												var n = T(), i = p(n), a = (e) => {
													var t = mi(), n = y(t, !0);
													m(t), v(() => R(n, d(x))), P(e, t);
												}, o = (e) => {
													ci(e, {
														get items() {
															return d(z);
														},
														get scrollTop() {
															return M.scrollTop;
														},
														get item() {
															return li;
														}
													});
												}, s = (e) => {
													var t = mi(), n = y(t, !0);
													m(t), v(() => R(n, d(C))), P(e, t);
												}, c = G(() => d(L) && d(E).trim());
												r(i, (e) => {
													N.loading ? e(a) : d(z).length > 0 ? e(o, 1) : d(c) && e(s, 2);
												}), P(e, n);
											},
											$$slots: { default: !0 }
										});
									}), t(e(l, 2), () => ln, (e, t) => {
										t(e, {
											class: "flex w-full items-center justify-center py-1 text-dark-300",
											children: (e, t) => {
												X(e, { icon: "ri:arrow-down-s-line" });
											},
											$$slots: { default: !0 }
										});
									}), P(n, a);
								},
								$$slots: { default: !0 }
							}));
						});
					}
					P(n, a);
				},
				$$slots: { default: !0 }
			});
		}), v((e) => q(a, 1, e), [() => D(Z("relative flex w-full items-center rounded-xl", "has-focus:ring-2 has-focus:ring-primary", o.error && "has-focus:ring-red-500", o.class))]), P(n, i);
	}, l = A(o, "searchable", 3, "auto"), u = A(o, "id", 19, qe), f = A(o, "value", 15), h = W(o, ui), _ = G(() => o.placeholder ?? "Select an option"), x = G(() => o.loadingPlaceholder ?? "Loading..."), S = G(() => o.searchPlaceholder ?? "Search values"), C = G(() => o.noResultsLabel ?? "No matches found"), w = O(!1), E = O(""), j = O(null), M = new oi(), N = $r(() => o.items, () => o.reloadKey?.()), F = G(() => o.disabled), ee = G(() => o.type === "multiple" ? void 0 : f()), L = G(() => l() === !0 ? !0 : l() === !1 ? !1 : N.items.length >= 8), z = G(() => N.loading ? [] : !d(L) || !d(E).trim() ? N.items : ei(N.items, d(E)));
	n(() => {
		d(E), d(w) && M.resetScroll();
	});
	async function B(e) {
		if (H(w, e, !0), !e) {
			H(E, ""), M.resetScroll();
			return;
		}
		await s(), d(L) && (await s(), d(j)?.focus()), M.scrollToValue(d(z), d(ee));
	}
	var V = vi(), U = y(V), K = (e) => {
		Vn(e, {
			get for() {
				return u();
			},
			children: (e, t) => {
				b();
				var n = k();
				v(() => R(n, o.label)), P(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	r(U, (e) => {
		o.label && e(K);
	});
	var J = e(U, 2), Y = (e) => {
		var n = T();
		t(p(n), () => bn, (e, t) => {
			t(e, I({
				type: "single",
				get items() {
					return N.items;
				},
				get disabled() {
					return d(F);
				},
				onOpenChange: B
			}, () => h, {
				get open() {
					return d(w);
				},
				set open(e) {
					H(w, e, !0);
				},
				get value() {
					return f();
				},
				set value(e) {
					f(e);
				},
				children: (e, t) => {
					c(e);
				},
				$$slots: { default: !0 }
			}));
		}), P(e, n);
	}, te = (e) => {
		var n = T();
		t(p(n), () => bn, (e, t) => {
			t(e, I({
				type: "multiple",
				get items() {
					return N.items;
				},
				get disabled() {
					return d(F);
				},
				onOpenChange: B
			}, () => h, {
				get open() {
					return d(w);
				},
				set open(e) {
					H(w, e, !0);
				},
				get value() {
					return f();
				},
				set value(e) {
					f(e);
				},
				children: (e, t) => {
					c(e);
				},
				$$slots: { default: !0 }
			}));
		}), P(e, n);
	};
	r(J, (e) => {
		o.type === "single" ? e(Y) : e(te, -1);
	});
	var ne = e(J, 2), Q = (e) => {
		var t = _i(), n = y(t, !0);
		m(t), v(() => R(n, o.error)), P(e, t);
	};
	r(ne, (e) => {
		o.error && e(Q);
	}), m(V), v((e) => q(V, 1, e), [() => D(Z("relative grid w-full gap-2"))]), P(a, V), g();
}
//#endregion
//#region ../ui/src/lib/components/input/cron-expression-editor.svelte
var bi = V("<div><p class=\"text-[10px] font-semibold tracking-[0.14em] text-dark-400 uppercase\"> </p> <p> </p></div>"), xi = V("<span><!> </span>"), Si = V("<p class=\"text-xs text-dark-200\"><span class=\"text-dark-400\"> </span> <span class=\"font-medium text-primary-100\"> </span></p>"), Ci = V("<div class=\"overflow-hidden rounded-xl border border-dark-600 bg-dark-800/40 transition-all duration-200 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20\"><div class=\"grid grid-cols-5 border-b border-dark-600/80 bg-dark-900/40 px-2 py-1.5\"></div> <div class=\"relative flex items-center gap-2 px-3 py-2\"><!> <input autocomplete=\"off\"/> <!></div> <div class=\"flex flex-wrap items-center justify-between gap-2 border-t border-dark-600/80 bg-dark-900/30 px-3 py-2\"><div class=\"min-w-40 max-w-xs flex-1\"><!></div> <!></div></div>");
function wi(t, n) {
	i(n, !0);
	let a = A(n, "value", 3, ""), o = A(n, "placeholder", 3, "0 9 * * 1-5"), s = A(n, "presets", 3, Sr), c = A(n, "validLabel", 3, "Valid expression"), l = A(n, "invalidLabel", 3, "Invalid cron expression"), u = A(n, "nextRunLabel", 3, "Next run"), f = A(n, "presetsPlaceholder", 3, "Presets"), p = qe(), h = new Wr(() => a(), 250), b = G(() => ({
		minute: n.fieldLabels?.minute ?? "Minute",
		hour: n.fieldLabels?.hour ?? "Hour",
		day: n.fieldLabels?.day ?? "Day",
		month: n.fieldLabels?.month ?? "Month",
		weekday: n.fieldLabels?.weekday ?? "Weekday"
	})), x = G(() => Dr(a())), S = G(() => Tr(h.current)), C = G(() => kr(d(S))), w = G(() => !!d(S) && !d(C)), T = G(() => d(C) === "Invalid cron expression" ? l() : d(C)), O = G(() => d(w) ? Ar(d(S)) : void 0), k = G(() => s().map((e) => ({
		value: e.value,
		label: e.label
	}))), M = {
		minute: "text-sky-300",
		hour: "text-violet-300",
		day: "text-emerald-300",
		month: "text-amber-300",
		weekday: "text-rose-300"
	}, F = (e) => {
		n.oninput?.(e);
	};
	function ee(e) {
		n.oninput?.({ currentTarget: { value: e } });
	}
	var I = Ci(), L = y(I);
	_(L, 22, () => Cr, (e) => e, (t, n, r) => {
		var i = bi(), a = y(i), o = y(a, !0);
		m(a);
		var s = e(a, 2), c = y(s, !0);
		m(s), m(i), v((e, t) => {
			q(i, 1, e), R(o, d(b)[n]), q(s, 1, t), R(c, d(x)[d(r)] || "—");
		}, [() => D(Z("px-1 text-center", d(r) < 4 && "border-r border-dark-700/50")), () => D(Z("mt-0.5 truncate font-mono text-xs", M[n]))]), P(t, i);
	}), m(L);
	var z = e(L, 2), B = y(z);
	X(B, {
		icon: "ri:time-line",
		class: "size-5 shrink-0 text-dark-400"
	});
	var V = e(B, 2);
	E(V), U(V, "spellcheck", !1);
	var H = e(V, 2), W = (t) => {
		var n = xi(), r = y(n);
		{
			let e = G(() => d(w) ? "ri:check-line" : "ri:alert-line");
			X(r, {
				get icon() {
					return d(e);
				},
				class: "size-4"
			});
		}
		var i = e(r);
		m(n), v((e) => {
			q(n, 1, e), R(i, ` ${(d(w) ? c() : d(T)) ?? ""}`);
		}, [() => D(Z("inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium", d(w) ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"))]), P(t, n);
	};
	r(H, (e) => {
		d(S) && e(W);
	}), m(z);
	var K = e(z, 2), J = y(K), Y = y(J), te = () => "", ne = (e) => {
		e && ee(e);
	};
	yi(Y, {
		type: "single",
		get placeholder() {
			return f();
		},
		get items() {
			return d(k);
		},
		get value() {
			return te();
		},
		set value(e) {
			ne(e);
		}
	}), m(J);
	var Q = e(J, 2), re = (t) => {
		var n = Si(), r = y(n), i = y(r);
		m(r);
		var a = e(r, 2), o = y(a, !0);
		m(a), m(n), v(() => {
			R(i, `${u() ?? ""}:`), R(o, d(O));
		}), P(t, n);
	};
	r(Q, (e) => {
		d(O) && e(re);
	}), m(K), m(I), v((e) => {
		U(V, "id", p), q(V, 1, e), U(V, "placeholder", o()), V.required = n.required, j(V, a() ?? "");
	}, [() => D(Z("min-w-0 flex-1 border-0 bg-transparent font-mono text-sm text-dark-50 outline-none", Xr.md, "px-0 py-0"))]), N("input", V, F), P(t, I), g();
}
L(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-cron-expression.svelte
var Ti = V("<button><!> <span> </span> <!> <!></button>"), Ei = V("<p class=\"mb-3 text-xs font-semibold tracking-wide text-dark-200 uppercase\"> </p> <!>", 1), Di = V("<!> <!>", 1), Oi = V("<p class=\"text-sm text-red-400\"> </p>"), ki = V("<div><!> <!> <!></div>");
function Ai(t, n) {
	i(n, !0);
	let a = A(n, "id", 19, qe), o = A(n, "value", 3, ""), s = A(n, "placeholder", 3, "0 9 * * 1-5"), c = A(n, "validLabel", 3, "Valid expression"), l = A(n, "invalidLabel", 3, "Invalid cron expression"), u = A(n, "nextRunLabel", 3, "Next run"), f = A(n, "presetsPlaceholder", 3, "Presets"), h = A(n, "editorTitle", 3, "Cron expression"), _ = A(n, "emptyLabel", 3, "Configure cron expression"), x = A(n, "editAriaLabel", 3, "Edit cron expression"), S = O(!1), C = G(() => Tr(o())), w = G(() => kr(d(C))), T = G(() => !!d(C) && !d(w)), E = G(() => d(C) || _()), j = G(() => !d(C));
	var M = ki(), N = y(M), ee = (e) => {
		Vn(e, {
			get for() {
				return a();
			},
			children: (e, t) => {
				b();
				var r = k();
				v(() => R(r, n.label)), P(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	r(N, (e) => {
		n.label && e(ee);
	});
	var I = e(N, 2);
	tt(I, {
		get open() {
			return d(S);
		},
		set open(e) {
			H(S, e, !0);
		},
		children: (t, i) => {
			var g = Di(), _ = p(g);
			nt(_, {
				child: (t, i) => {
					let o = () => i?.().props;
					var s = Ti();
					F(s, (e) => ({
						id: a(),
						type: "button",
						...o(),
						"aria-label": x(),
						class: e
					}), [() => Z("flex w-full items-center gap-2 rounded-xl border bg-dark-700 text-left outline-none transition-all", Xr.md, "focus-visible:ring-2", n.error ? "border-red-500 focus-visible:border-red-500/50 focus-visible:ring-red-500" : "border-dark-500 focus-visible:border-primary/50 focus-visible:ring-primary")]);
					var c = y(s);
					X(c, {
						icon: "ri:time-line",
						class: "size-5 shrink-0 text-dark-400"
					});
					var l = e(c, 2), u = y(l, !0);
					m(l);
					var f = e(l, 2), p = (e) => {
						{
							let t = G(() => d(T) ? "ri:check-line" : "ri:alert-line"), n = G(() => Z("size-5 shrink-0", d(T) ? "text-green-400" : "text-amber-400"));
							X(e, {
								get icon() {
									return d(t);
								},
								get class() {
									return d(n);
								}
							});
						}
					};
					r(f, (e) => {
						d(C) && e(p);
					});
					var h = e(f, 2);
					{
						let e = G(() => Z("size-5 shrink-0 text-dark-300 transition-transform", d(S) && "rotate-180"));
						X(h, {
							icon: "ri:arrow-down-s-line",
							get class() {
								return d(e);
							}
						});
					}
					m(s), v((e) => {
						q(l, 1, e), R(u, d(E));
					}, [() => D(Z("min-w-0 flex-1 truncate text-sm", d(j) ? "font-sans text-dark-300" : "font-mono text-dark-50"))]), P(t, s);
				},
				$$slots: { child: !0 }
			}), et(e(_, 2), {
				align: "start",
				class: "w-[min(28rem,calc(100vw-2rem))] p-3",
				children: (t, r) => {
					var i = Ei(), a = p(i), d = y(a, !0);
					m(a), wi(e(a, 2), {
						get value() {
							return o();
						},
						get required() {
							return n.required;
						},
						get placeholder() {
							return s();
						},
						get presets() {
							return n.presets;
						},
						get fieldLabels() {
							return n.fieldLabels;
						},
						get validLabel() {
							return c();
						},
						get invalidLabel() {
							return l();
						},
						get nextRunLabel() {
							return u();
						},
						get presetsPlaceholder() {
							return f();
						},
						get oninput() {
							return n.oninput;
						}
					}), v(() => R(d, h())), P(t, i);
				},
				$$slots: { default: !0 }
			}), P(t, g);
		},
		$$slots: { default: !0 }
	});
	var L = e(I, 2), z = (e) => {
		var t = Oi(), r = y(t, !0);
		m(t), v(() => R(r, n.error)), P(e, t);
	};
	r(L, (e) => {
		n.error && e(z);
	}), m(M), v((e) => q(M, 1, e), [() => D(Z("relative grid w-full gap-2", n.class))]), P(t, M), g();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text.svelte
var ji = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"label",
	"id",
	"prependIcon",
	"appendIcon",
	"error",
	"size"
]), Mi = V("<span><!></span>"), Ni = V("<button type=\"button\"><!></button>"), Pi = V("<p class=\"text-sm text-red-400\"> </p>"), Fi = V("<div><!> <div><!> <input/> <!> <!></div> <!></div>");
function Ii(t, n) {
	i(n, !0);
	let a = A(n, "id", 19, qe), o = A(n, "size", 3, "md"), s = W(n, ji), c = O(!1), l = G(() => n.type === "password"), u = G(() => !!n.appendIcon || d(l)), f = Xr;
	var p = Fi(), h = y(p), _ = (e) => {
		Vn(e, {
			get for() {
				return a();
			},
			children: (e, t) => {
				b();
				var r = k();
				v(() => R(r, n.label)), P(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	r(h, (e) => {
		n.label && e(_);
	});
	var x = e(h, 2), S = y(x), C = (e) => {
		var t = Mi();
		X(y(t), {
			get icon() {
				return n.prependIcon;
			},
			get class() {
				return Zr[o()];
			}
		}), m(t), v((e) => q(t, 1, e), [() => D(Z("grid h-full place-items-center rounded-l-xl border border-dark-500 bg-dark-700 text-dark-50", Qr[o()]))]), P(e, t);
	};
	r(S, (e) => {
		n.prependIcon && e(C);
	});
	var w = e(S, 2);
	F(w, (e) => ({
		id: a(),
		class: e,
		"aria-invalid": n.error ? !0 : void 0,
		...s,
		type: d(l) ? d(c) ? "text" : "password" : n.type
	}), [() => Z("w-full border bg-dark-700 text-dark-50 outline-none", f[o()], n.error ? "border-red-500" : "border-dark-500", {
		"rounded-l-none rounded-r-xl border-l-0": n.prependIcon,
		"rounded-l-xl rounded-r-none border-r-0": d(u),
		"rounded-xl": !n.prependIcon && !d(u)
	})], void 0, void 0, void 0, !0);
	var T = e(w, 2), E = (e) => {
		var t = Mi();
		X(y(t), {
			get icon() {
				return n.appendIcon;
			},
			get class() {
				return Zr[o()];
			}
		}), m(t), v((e) => q(t, 1, e), [() => D(Z("grid h-full place-items-center text-dark-50", Qr[o()], d(l) ? "border-y border-r-0 border-l border-dark-500" : "rounded-r-xl border border-l-0 border-dark-500"))]), P(e, t);
	};
	r(T, (e) => {
		n.appendIcon && e(E);
	});
	var j = e(T, 2), M = (e) => {
		var t = Ni(), n = y(t);
		{
			let e = G(() => d(c) ? "mdi:eye-off-outline" : "mdi:eye-outline");
			X(n, {
				get icon() {
					return d(e);
				},
				get class() {
					return Zr[o()];
				}
			});
		}
		m(t), v((e) => {
			q(t, 1, e), U(t, "aria-label", d(c) ? "Hide password" : "Show password"), U(t, "aria-pressed", d(c));
		}, [() => D(Z("grid h-full place-items-center rounded-r-xl border border-dark-500 border-l-dark-600 bg-dark-700 text-dark-50", Qr[o()]))]), N("click", t, () => H(c, !d(c))), P(e, t);
	};
	r(j, (e) => {
		d(l) && e(M);
	}), m(x);
	var ee = e(x, 2), I = (e) => {
		var t = Pi(), r = y(t, !0);
		m(t), v(() => R(r, n.error)), P(e, t);
	};
	r(ee, (e) => {
		n.error && e(I);
	}), m(p), v((e, t) => {
		q(p, 1, e), q(x, 1, t);
	}, [() => D(Z("relative grid w-full gap-2")), () => D(Z("relative flex w-full items-center rounded-xl", "has-focus:ring-2 has-focus:ring-primary", n.error && "has-focus:ring-red-500", n.class))]), P(t, p), g();
}
L(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-file-path.svelte
var Li = V("<div class=\"grid gap-2\"><div class=\"flex items-end gap-2\"><div class=\"min-w-0 flex-1\"><!></div> <!></div></div>");
function Ri(t, n) {
	i(n, !0);
	let r = A(n, "value", 3, ""), a = A(n, "browseLabel", 3, "Browse"), o = A(n, "emptyFileLabel", 3, "No file selected"), s = A(n, "emptyFolderLabel", 3, "No folder selected"), c = O(!1);
	async function l() {
		if (!d(c)) {
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
	var u = Li(), f = y(u), p = y(f), h = y(p);
	{
		let e = G(() => n.placeholder ?? (n.mode === "folder" ? s() : o()));
		Ii(h, {
			get label() {
				return n.label;
			},
			get placeholder() {
				return d(e);
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
	m(p), rt(e(p, 2), {
		type: "button",
		variant: "outline",
		onclick: l,
		get disabled() {
			return d(c);
		},
		get isLoading() {
			return d(c);
		},
		icon: "ri:folder-open-line",
		children: (e, t) => {
			b();
			var n = k();
			v(() => R(n, a())), P(e, n);
		},
		$$slots: { default: !0 }
	}), m(f), m(u), P(t, u), g();
}
//#endregion
//#region ../ui/src/lib/components/input/input-key-value-list.svelte
var zi = V("<div class=\"grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] items-center gap-2\"><!> <!> <!></div>"), Bi = V("<p class=\"text-sm text-destructive-50\"> </p>"), Vi = V("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function Hi(t, n) {
	i(n, !0);
	let a = A(n, "entries", 31, () => z([])), s = A(n, "keyPlaceholder", 3, "KEY"), c = A(n, "valuePlaceholder", 3, "value"), l = A(n, "id", 19, qe), u = A(n, "addLabel", 3, "Add"), f = A(n, "removeLabel", 3, "Remove"), p = O(z([]));
	function h(e) {
		return e.map((e) => ({
			id: crypto.randomUUID(),
			key: e.key,
			value: e.value
		}));
	}
	function x() {
		a(d(p).map((e) => ({
			key: e.key,
			value: e.value
		})));
	}
	function S(e, t) {
		H(p, d(p).map((n) => n.id === e ? {
			...n,
			...t
		} : n), !0), x();
	}
	function C(e) {
		H(p, d(p).filter((t) => t.id !== e), !0), x();
	}
	function w() {
		H(p, [...d(p), {
			id: crypto.randomUUID(),
			key: "",
			value: ""
		}], !0), x();
	}
	o(() => {
		let e = a(), t = d(p).map((e) => ({
			key: e.key,
			value: e.value
		}));
		e.length === t.length && e.every((e, n) => e.key === t[n]?.key && e.value === t[n]?.value) || H(p, h(e), !0);
	});
	var T = Vi(), E = y(T), j = (e) => {
		{
			let t = G(() => `${l()}-label`);
			Vn(e, {
				get id() {
					return d(t);
				},
				children: (e, t) => {
					b();
					var r = k();
					v(() => R(r, n.label)), P(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	r(E, (e) => {
		n.label && e(j);
	});
	var M = e(E, 2), N = y(M);
	_(N, 17, () => d(p), (e) => e.id, (t, n) => {
		var r = zi(), i = y(r);
		{
			let e = G(() => `${l()}-${d(n).id}-key`);
			Ii(i, {
				get id() {
					return d(e);
				},
				get placeholder() {
					return s();
				},
				get value() {
					return d(n).key;
				},
				oninput: (e) => S(d(n).id, { key: e.currentTarget.value })
			});
		}
		var a = e(i, 2);
		{
			let e = G(() => `${l()}-${d(n).id}-value`);
			Ii(a, {
				get id() {
					return d(e);
				},
				get placeholder() {
					return c();
				},
				get value() {
					return d(n).value;
				},
				oninput: (e) => S(d(n).id, { value: e.currentTarget.value })
			});
		}
		rt(e(a, 2), {
			variant: "ghost",
			size: "icon",
			type: "button",
			get "aria-label"() {
				return f();
			},
			onclick: () => C(d(n).id),
			children: (e, t) => {
				X(e, {
					icon: "ri:delete-bin-line",
					class: "size-5",
					"aria-hidden": "true"
				});
			},
			$$slots: { default: !0 }
		}), m(r), P(t, r);
	}), rt(e(N, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: w,
		children: (e, t) => {
			b();
			var n = k();
			v(() => R(n, u())), P(e, n);
		},
		$$slots: { default: !0 }
	}), m(M);
	var F = e(M, 2), ee = (e) => {
		var t = Bi(), r = y(t, !0);
		m(t), v(() => R(r, n.error)), P(e, t);
	};
	r(F, (e) => {
		n.error && e(ee);
	}), m(T), v((e) => {
		q(T, 1, e), U(T, "aria-labelledby", n.label ? `${l()}-label` : void 0);
	}, [() => D(Z("grid w-full gap-2", n.class))]), P(t, T), g();
}
//#endregion
//#region ../ui/src/lib/components/input/input-select-text.svelte
var Ui = new Set([
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
]), Wi = V("<!> <!>", 1), Gi = V("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Ki = V(" <!>", 1), qi = V("<!> <!> <!>", 1), Ji = V("<div class=\"flex flex-wrap gap-1.5\"></div>"), Yi = V("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), Xi = V("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), Zi = V("<p class=\"text-sm text-red-400\"> </p>"), Qi = V("<div><!> <div><!> <input/></div> <!> <!> <!></div>");
function $i(n, a) {
	i(a, !0);
	let o = A(a, "variables", 19, () => []), s = A(a, "id", 19, qe), c = A(a, "value", 31, () => z({
		type: "",
		value: ""
	})), u = W(a, Ui), h = G(() => a.selectPlaceholder ?? "Select"), x = G(() => a.loadingPlaceholder ?? "Loading..."), S = $r(() => a.items), C = O(null), w = O(!1), E = O(""), j = O(0), M = G(() => {
		if (!d(E)) return o();
		let e = d(E).toLowerCase();
		return o().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function ee() {
		if (!d(C)) return null;
		let e = c().value, t = d(C).selectionStart ?? e.length, n = e.slice(0, t), r = n.lastIndexOf("{");
		if (r === -1) return null;
		let i = n.slice(r + 1);
		return i.includes("}") ? null : {
			start: r,
			partial: i
		};
	}
	function L() {
		let e = ee();
		if (!e || o().length === 0) {
			H(w, !1), H(E, ""), H(j, 0);
			return;
		}
		H(E, e.partial, !0), H(w, d(M).length > 0), H(j, 0);
	}
	function B(e) {
		let t = ee();
		if (!t || !d(C)) return;
		let n = c().value, r = d(C).selectionStart ?? n.length, i = n.slice(0, t.start), a = n.slice(r);
		c({
			...c(),
			value: `${i}{${e}}${a}`
		}), H(w, !1), H(E, ""), queueMicrotask(() => {
			if (!d(C)) return;
			let t = i.length + e.length + 2;
			d(C).focus(), d(C).setSelectionRange(t, t);
		});
	}
	function V(e) {
		let t = c().value;
		if (!d(C)) {
			c({
				...c(),
				value: `${t}{${e}}`
			});
			return;
		}
		let n = d(C).selectionStart ?? t.length, r = t.slice(0, n), i = t.slice(n);
		c({
			...c(),
			value: `${r}{${e}}${i}`
		}), queueMicrotask(() => {
			let t = r.length + e.length + 2;
			d(C)?.focus(), d(C)?.setSelectionRange(t, t);
		});
	}
	let K = () => {
		L();
	}, J = (e) => {
		if (!(!d(w) || d(M).length === 0)) {
			if (e.key === "ArrowDown") {
				e.preventDefault(), H(j, (d(j) + 1) % d(M).length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault(), H(j, (d(j) - 1 + d(M).length) % d(M).length);
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				let t = d(M)[d(j)];
				t && (e.preventDefault(), B(t.key));
				return;
			}
			e.key === "Escape" && H(w, !1);
		}
	}, Y = () => {
		setTimeout(() => {
			H(w, !1);
		}, 120);
	};
	var te = Qi(), ne = y(te), Q = (e) => {
		Vn(e, {
			get for() {
				return s();
			},
			children: (e, t) => {
				b();
				var n = k();
				v(() => R(n, a.label)), P(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	r(ne, (e) => {
		a.label && e(Q);
	});
	var re = e(ne, 2), ie = y(re);
	t(ie, () => bn, (n, i) => {
		i(n, {
			type: "single",
			get items() {
				return S.items;
			},
			get value() {
				return c().type;
			},
			set value(e) {
				c(c().type = e, !0);
			},
			children: (n, i) => {
				var o = Wi(), s = p(o);
				{
					let n = G(() => Z("flex shrink-0 cursor-pointer items-center justify-between gap-2 rounded-l-xl border border-r-0 bg-dark-700 text-dark-50 outline-none", Xr.md, a.error ? "border-red-500" : "border-dark-500", a.selectClass));
					t(s, () => En, (r, i) => {
						i(r, {
							get class() {
								return d(n);
							},
							children: (n, r) => {
								var i = Wi(), a = p(i);
								{
									let e = G(() => S.loading ? d(x) : d(h));
									t(a, () => Cn, (t, n) => {
										n(t, {
											get placeholder() {
												return d(e);
											},
											class: "truncate data-placeholder:text-dark-300"
										});
									});
								}
								X(e(a, 2), {
									icon: "ri:expand-up-down-line",
									class: "size-5 shrink-0 text-dark-300"
								}), P(n, i);
							},
							$$slots: { default: !0 }
						});
					});
				}
				t(e(s, 2), () => Qe, (n, i) => {
					i(n, {
						children: (n, i) => {
							var o = T(), s = p(o);
							{
								let n = G(() => a.contentProps?.sideOffset ?? 4), i = G(() => Z("z-50 max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", a.contentProps?.class));
								t(s, () => Yt, (o, s) => {
									s(o, I(() => a.contentProps, {
										get sideOffset() {
											return d(n);
										},
										get class() {
											return d(i);
										},
										children: (n, i) => {
											var a = qi(), o = p(a);
											t(o, () => pn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														X(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = e(o, 2);
											t(s, () => an, (n, i) => {
												i(n, {
													children: (n, i) => {
														var a = T(), o = p(a), s = (e) => {
															var t = Gi(), n = y(t, !0);
															m(t), v(() => R(n, d(x))), P(e, t);
														}, c = (n) => {
															var i = T();
															_(p(i), 17, () => S.items, ({ value: e, label: t, disabled: n }) => e, (n, i) => {
																let a = () => d(i).value, o = () => d(i).label, s = () => d(i).disabled;
																var c = T(), l = p(c);
																{
																	let n = (t, n) => {
																		let i = () => n?.().selected;
																		b();
																		var a = Ki(), s = p(a), c = e(s), l = (e) => {
																			X(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		r(c, (e) => {
																			i() && e(l);
																		}), v(() => R(s, `${o() ?? ""} `)), P(t, a);
																	}, i = G(() => Z("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	t(l, () => en, (e, t) => {
																		t(e, {
																			get value() {
																				return a();
																			},
																			get label() {
																				return o();
																			},
																			get disabled() {
																				return s();
																			},
																			get class() {
																				return d(i);
																			},
																			children: n,
																			$$slots: { default: !0 }
																		});
																	});
																}
																P(n, c);
															}), P(n, i);
														};
														r(o, (e) => {
															S.loading ? e(s) : e(c, -1);
														}), P(n, a);
													},
													$$slots: { default: !0 }
												});
											}), t(e(s, 2), () => ln, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														X(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), P(n, a);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							P(n, o);
						},
						$$slots: { default: !0 }
					});
				}), P(n, o);
			},
			$$slots: { default: !0 }
		});
	});
	var ae = e(ie, 2);
	F(ae, (e) => ({
		id: s(),
		placeholder: a.placeholder,
		class: e,
		"aria-invalid": a.error ? !0 : void 0,
		oninput: o().length > 0 ? K : void 0,
		onkeydown: o().length > 0 ? J : void 0,
		onblur: o().length > 0 ? Y : void 0,
		onfocus: o().length > 0 ? L : void 0,
		onclick: o().length > 0 ? L : void 0,
		...u
	}), [() => Z("w-full rounded-r-xl border bg-dark-700 text-dark-50 outline-none", Xr.md, a.error ? "border-red-500" : "border-dark-500")], void 0, void 0, void 0, !0), l(ae, (e) => H(C, e), () => d(C)), m(re);
	var oe = e(re, 2), se = (e) => {
		var t = Ji();
		_(t, 21, o, (e) => e.key, (e, t) => {
			rt(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return d(t).label;
				},
				onclick: () => V(d(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					b();
					var r = k();
					v(() => R(r, `{${d(t).key}}`)), P(e, r);
				},
				$$slots: { default: !0 }
			});
		}), m(t), P(e, t);
	};
	r(oe, (e) => {
		o().length > 0 && e(se);
	});
	var ce = e(oe, 2), le = (t) => {
		var n = Xi();
		_(n, 23, () => d(M), (e) => e.key, (t, n, r) => {
			var i = Yi(), a = y(i), o = y(a), s = y(o, !0);
			m(o);
			var c = e(o, 2), l = y(c, !0);
			m(c), m(a), m(i), v((e) => {
				U(a, "aria-selected", d(r) === d(j)), q(a, 1, e), R(s, `{${d(n).key}}`), R(l, d(n).label);
			}, [() => D(Z("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", d(r) === d(j) && "bg-dark-700"))]), N("mousedown", a, (e) => {
				e.preventDefault(), B(d(n).key);
			}), P(t, i);
		}), m(n), P(t, n);
	};
	r(ce, (e) => {
		d(w) && d(M).length > 0 && e(le);
	});
	var ue = e(ce, 2), de = (e) => {
		var t = Zi(), n = y(t, !0);
		m(t), v(() => R(n, a.error)), P(e, t);
	};
	r(ue, (e) => {
		a.error && e(de);
	}), m(te), v((e, t) => {
		q(te, 1, e), q(re, 1, t);
	}, [() => D(Z("relative grid w-full gap-2", a.class)), () => D(Z("flex w-full items-stretch rounded-xl has-focus:ring-2 has-focus:ring-primary", a.error && "has-focus:ring-red-500"))]), f(ae, () => c().value, (e) => c(c().value = e, !0)), P(n, te), g();
}
L(["mousedown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-slider.svelte
var ea = V("<div class=\"flex items-center justify-between gap-4\"><!> <span class=\"text-sm text-dark-100\"> </span></div>"), ta = V("<p class=\"text-sm text-red-500\"> </p>"), na = V("<div><!> <input type=\"range\"/> <!></div>");
function ra(t, n) {
	i(n, !0);
	let a = A(n, "id", 19, qe), o = A(n, "min", 3, 0), s = A(n, "max", 3, 100), c = A(n, "step", 3, 1), l = A(n, "value", 15, 0);
	var u = na(), d = y(u), p = (t) => {
		var r = ea(), i = y(r);
		Vn(i, {
			get for() {
				return a();
			},
			children: (e, t) => {
				b();
				var r = k();
				v(() => R(r, n.label)), P(e, r);
			},
			$$slots: { default: !0 }
		});
		var o = e(i, 2), s = y(o);
		m(o), m(r), v(() => R(s, `${l() ?? ""}%`)), P(t, r);
	};
	r(d, (e) => {
		n.label && e(p);
	});
	var h = e(d, 2);
	E(h);
	var _ = e(h, 2), x = (e) => {
		var t = ta(), r = y(t, !0);
		m(t), v(() => R(r, n.error)), P(e, t);
	};
	r(_, (e) => {
		n.error && e(x);
	}), m(u), v((e, t) => {
		q(u, 1, e), U(h, "id", a()), U(h, "min", o()), U(h, "max", s()), U(h, "step", c()), q(h, 1, t);
	}, [() => D(Z("grid w-full gap-2")), () => D(Z("h-2 w-full cursor-pointer appearance-none rounded-full bg-dark-600 accent-primary", n.error && "ring-1 ring-red-500"))]), N("input", h, () => n.onvaluechange?.(l())), f(h, l), P(t, u), g();
}
L(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-switch.svelte
var ia = V("<p class=\"text-sm text-red-400\"> </p>"), aa = V("<div><div class=\"flex items-center gap-3\"><!> <!></div> <!></div>");
function oa(n, a) {
	i(a, !0);
	let o = A(a, "checked", 15, !1), s = A(a, "id", 19, qe);
	var c = aa(), l = y(c), u = y(l);
	{
		let e = G(() => a.label ? `${s()}-label` : void 0), n = G(() => a.error ? !0 : void 0), r = G(() => Z("inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors outline-none", "data-[state=checked]:bg-primary/15", a.error ? "data-[state=unchecked]:bg-red-500/30" : "data-[state=unchecked]:bg-dark-600", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
		t(u, () => In, (i, a) => {
			a(i, {
				get id() {
					return s();
				},
				get "aria-labelledby"() {
					return d(e);
				},
				get "aria-invalid"() {
					return d(n);
				},
				get class() {
					return d(r);
				},
				get checked() {
					return o();
				},
				set checked(e) {
					o(e);
				},
				children: (e, n) => {
					var r = T(), i = p(r);
					{
						let e = G(() => Z("pointer-events-none block size-5 shrink-0 rounded-full bg-white transition-transform", "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0", "data-[state=checked]:bg-primary"));
						t(i, () => zn, (t, n) => {
							n(t, { get class() {
								return d(e);
							} });
						});
					}
					P(e, r);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var f = e(u, 2), h = (e) => {
		Vn(e, {
			get id() {
				return `${s() ?? ""}-label`;
			},
			get for() {
				return s();
			},
			class: "cursor-pointer",
			children: (e, t) => {
				b();
				var n = k();
				v(() => R(n, a.label)), P(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	r(f, (e) => {
		a.label && e(h);
	}), m(l);
	var _ = e(l, 2), x = (e) => {
		var t = ia(), n = y(t, !0);
		m(t), v(() => R(n, a.error)), P(e, t);
	};
	r(_, (e) => {
		a.error && e(x);
	}), m(c), v((e) => q(c, 1, e), [() => D(Z("grid gap-2", a.class))]), P(n, c), g();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-list.svelte
var sa = V("<div class=\"flex items-center gap-2\"><!> <!></div>"), ca = V("<p class=\"text-sm text-destructive-50\"> </p>"), la = V("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function ua(t, n) {
	i(n, !0);
	let a = A(n, "values", 31, () => z([])), s = A(n, "id", 19, qe), c = A(n, "addLabel", 3, "Add"), l = A(n, "removeLabel", 3, "Remove"), u = O(z([]));
	function f(e) {
		return e.map((e) => ({
			id: crypto.randomUUID(),
			value: e
		}));
	}
	function p() {
		a(d(u).map((e) => e.value));
	}
	function h(e, t) {
		H(u, d(u).map((n) => n.id === e ? {
			...n,
			value: t
		} : n), !0), p();
	}
	function x(e) {
		H(u, d(u).filter((t) => t.id !== e), !0), p();
	}
	function S() {
		H(u, [...d(u), {
			id: crypto.randomUUID(),
			value: ""
		}], !0), p();
	}
	o(() => {
		let e = a(), t = d(u).map((e) => e.value);
		e.length === t.length && e.every((e, n) => e === t[n]) || H(u, f(e), !0);
	});
	var C = la(), w = y(C), T = (e) => {
		{
			let t = G(() => `${s()}-label`);
			Vn(e, {
				get id() {
					return d(t);
				},
				children: (e, t) => {
					b();
					var r = k();
					v(() => R(r, n.label)), P(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	r(w, (e) => {
		n.label && e(T);
	});
	var E = e(w, 2), j = y(E);
	_(j, 17, () => d(u), (e) => e.id, (t, r) => {
		var i = sa(), a = y(i);
		{
			let e = G(() => `${s()}-${d(r).id}`);
			Ii(a, {
				get id() {
					return d(e);
				},
				get placeholder() {
					return n.placeholder;
				},
				get value() {
					return d(r).value;
				},
				oninput: (e) => h(d(r).id, e.currentTarget.value)
			});
		}
		rt(e(a, 2), {
			variant: "ghost",
			size: "icon",
			type: "button",
			get "aria-label"() {
				return l();
			},
			onclick: () => x(d(r).id),
			children: (e, t) => {
				X(e, {
					icon: "ri:delete-bin-line",
					class: "size-5",
					"aria-hidden": "true"
				});
			},
			$$slots: { default: !0 }
		}), m(i), P(t, i);
	}), rt(e(j, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: S,
		children: (e, t) => {
			b();
			var n = k();
			v(() => R(n, c())), P(e, n);
		},
		$$slots: { default: !0 }
	}), m(E);
	var M = e(E, 2), N = (e) => {
		var t = ca(), r = y(t, !0);
		m(t), v(() => R(r, n.error)), P(e, t);
	};
	r(M, (e) => {
		n.error && e(N);
	}), m(C), v((e) => {
		q(C, 1, e), U(C, "aria-labelledby", n.label ? `${s()}-label` : void 0);
	}, [() => D(Z("grid w-full gap-2", n.class))]), P(t, C), g();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-select.svelte
var da = (n, i = w) => {
	let a = G(() => i().value), o = G(() => i().label), s = G(() => i().disabled);
	var c = T(), l = p(c);
	{
		let n = (t, n) => {
			let i = () => n?.().selected;
			b();
			var a = pa(), s = p(a), c = e(s), l = (e) => {
				X(e, {
					icon: "ri:check-line",
					class: "size-5 text-primary"
				});
			};
			r(c, (e) => {
				i() && e(l);
			}), v(() => R(s, `${d(o) ?? ""} `)), P(t, a);
		}, i = G(() => Z("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
		t(l, () => en, (e, t) => {
			t(e, {
				get value() {
					return d(a);
				},
				get label() {
					return d(o);
				},
				get disabled() {
					return d(s);
				},
				get class() {
					return d(i);
				},
				children: n,
				$$slots: { default: !0 }
			});
		});
	}
	P(n, c);
}, fa = new Set([
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
]), pa = V(" <!>", 1), ma = V("<span class=\"text-red-400\">*</span>"), ha = V("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), ga = V("<div class=\"px-3 py-1.5 text-sm text-dark-300\"></div>"), _a = V("<!> <!> <!>", 1), va = V("<div><!> <button type=\"button\" aria-haspopup=\"listbox\"><!></button></div> <!>", 1), ya = V("<p class=\"text-sm text-red-400\"> </p>"), ba = V("<div><!> <!> <!></div>");
function xa(a, o) {
	i(o, !0);
	let c = A(o, "allowCustomValue", 3, !0), l = A(o, "id", 19, qe), u = A(o, "value", 15, ""), f = W(o, fa), h = G(() => o.placeholder), _ = G(() => o.loadingPlaceholder ?? "Loading..."), x = G(() => o.selectAriaLabel ?? "Select value"), S = O(!1), C = O(""), w = O(!1), E = new oi(), k = $r(() => o.items, () => o.reloadKey?.()), j = new Wr(() => d(C), 100), M = G(() => new Map(k.items.map((e) => [e.value, e]))), F = G(() => d(M).get(u())), ee = G(() => d(F)?.value ?? ""), L = G(() => {
		if (k.loading) return [];
		let e = j.current.trim();
		return e ? ei(k.items, e) : k.items;
	}), z = G(() => d(F) && !d(L).some((e) => e.value === d(F).value) ? [d(F), ...d(L)] : d(L));
	function B() {
		d(w) || H(C, d(F)?.label ?? (c() ? u() : ""), !0);
	}
	n(() => {
		u(), d(F)?.label, B();
	}), n(() => {
		j.current, d(S) && E.resetScroll();
	});
	function V() {
		H(S, d(L).length > 0 || k.items.length > 0, !0);
	}
	function K(e) {
		H(C, e.currentTarget.value, !0), H(w, !0), c() && u(d(C)), V();
	}
	function J() {
		H(S, !0);
	}
	function Y() {
		H(w, !1), B();
	}
	async function te(e) {
		if (H(S, e, !0), !e) {
			H(w, !1), E.resetScroll(), B();
			return;
		}
		await s(), E.scrollToValue(d(L), u());
	}
	function ne() {
		H(S, !0);
	}
	let Q = G(() => We(f, {
		id: l(),
		placeholder: k.loading ? d(_) : d(h),
		autocomplete: "off",
		class: Z("w-full rounded-l-xl border border-r-0 bg-dark-700 text-dark-50 outline-none", Xr.md, o.error ? "border-red-500" : "border-dark-500"),
		"aria-invalid": o.error ? !0 : void 0,
		oninput: K,
		onfocus: J,
		onblur: Y
	}));
	var re = ba(), ie = y(re), ae = (t) => {
		Vn(t, {
			get for() {
				return l();
			},
			children: (t, n) => {
				b();
				var i = pa(), a = p(i), s = e(a), c = (e) => {
					P(e, ma());
				};
				r(s, (e) => {
					o.required && e(c);
				}), v(() => R(a, `${o.label ?? ""} `)), P(t, i);
			},
			$$slots: { default: !0 }
		});
	};
	r(ie, (e) => {
		o.label && e(ae);
	});
	var oe = e(ie, 2);
	{
		let n = G(() => !!o.disabled);
		t(oe, () => Ut, (i, a) => {
			a(i, {
				type: "single",
				get items() {
					return d(z);
				},
				get inputValue() {
					return d(C);
				},
				get value() {
					return d(ee);
				},
				onValueChange: (e) => {
					e && (u(e), H(w, !1), H(S, !1), B());
				},
				onOpenChange: te,
				get disabled() {
					return d(n);
				},
				get open() {
					return d(S);
				},
				set open(e) {
					H(S, e, !0);
				},
				children: (n, i) => {
					var a = va(), s = p(a), c = y(s);
					t(c, () => Kt, (e, t) => {
						t(e, I(() => d(Q)));
					});
					var l = e(c, 2);
					X(y(l), {
						icon: "ri:expand-up-down-line",
						class: "size-5 shrink-0 text-dark-300"
					}), m(l), m(s), t(e(s, 2), () => Qe, (n, i) => {
						i(n, {
							children: (n, i) => {
								var a = T(), s = p(a);
								{
									let n = G(() => o.contentProps?.sideOffset ?? 4), i = G(() => Z("z-50 max-h-84 min-w-(--bits-combobox-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", o.contentProps?.class));
									t(s, () => Yt, (a, s) => {
										s(a, I(() => o.contentProps, {
											get sideOffset() {
												return d(n);
											},
											get class() {
												return d(i);
											},
											children: (n, i) => {
												var a = _a(), o = p(a);
												t(o, () => pn, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															X(e, { icon: "ri:arrow-up-s-line" });
														},
														$$slots: { default: !0 }
													});
												});
												var s = e(o, 2);
												t(s, () => an, (e, t) => {
													t(e, {
														get onscroll() {
															return E.handleViewportScroll;
														},
														get ref() {
															return E.viewportRef;
														},
														set ref(e) {
															E.viewportRef = e;
														},
														children: (e, t) => {
															var n = T(), i = p(n), a = (e) => {
																var t = ha(), n = y(t, !0);
																m(t), v(() => R(n, d(_))), P(e, t);
															}, o = (e) => {
																ci(e, {
																	get items() {
																		return d(L);
																	},
																	get scrollTop() {
																		return E.scrollTop;
																	},
																	get item() {
																		return da;
																	}
																});
															}, s = (e) => {
																var t = ga();
																t.textContent = "No matches found", P(e, t);
															};
															r(i, (e) => {
																k.loading ? e(a) : d(L).length > 0 ? e(o, 1) : e(s, -1);
															}), P(e, n);
														},
														$$slots: { default: !0 }
													});
												}), t(e(s, 2), () => ln, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															X(e, { icon: "ri:arrow-down-s-line" });
														},
														$$slots: { default: !0 }
													});
												}), P(n, a);
											},
											$$slots: { default: !0 }
										}));
									});
								}
								P(n, a);
							},
							$$slots: { default: !0 }
						});
					}), v((e, t) => {
						q(s, 1, e), U(l, "aria-label", d(x)), U(l, "aria-expanded", d(S)), l.disabled = !!o.disabled, q(l, 1, t);
					}, [() => D(Z("flex w-full items-stretch rounded-xl has-focus:ring-2 has-focus:ring-primary", o.error && "has-focus:ring-red-500")), () => D(Z("flex shrink-0 cursor-pointer items-center justify-center rounded-r-xl border bg-dark-700 text-dark-50 outline-none", Xr.md, o.error ? "border-red-500" : "border-dark-500", o.selectClass))]), N("click", l, ne), P(n, a);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var se = e(oe, 2), ce = (e) => {
		var t = ya(), n = y(t, !0);
		m(t), v(() => R(n, o.error)), P(e, t);
	};
	r(se, (e) => {
		o.error && e(ce);
	}), m(re), v((e) => q(re, 1, e), [() => D(Z("relative grid w-full gap-2", o.class))]), P(a, re), g();
}
L(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-select-text.svelte
var Sa = new Set([
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
]), Ca = V("<!> <!>", 1), wa = V("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Ta = V(" <!>", 1), Ea = V("<!> <!> <!>", 1), Da = V("<div aria-hidden=\"true\">—</div>"), Oa = V("<input/>"), ka = V("<div class=\"flex shrink-0 items-center self-center\"><!></div>"), Aa = V("<div class=\"flex flex-wrap gap-1.5\"></div>"), ja = V("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), Ma = V("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), Na = V("<p class=\"text-sm text-red-400\"> </p>"), Pa = V("<div><!> <div class=\"flex items-center gap-3\"><div><input/> <!> <!></div> <!></div> <!> <!> <!></div>");
function Fa(n, a) {
	i(a, !0);
	let o = A(a, "variables", 19, () => []), s = A(a, "valuelessOperators", 19, () => []), u = A(a, "id", 19, qe), h = A(a, "value", 31, () => z({
		path: "",
		type: "equals",
		value: ""
	})), x = W(a, Sa), S = G(() => a.selectPlaceholder ?? "Select"), w = G(() => a.loadingPlaceholder ?? "Loading..."), j = $r(() => a.items), ee = O(null), L = O(null), B = O("path"), V = O(!1), K = O(""), J = O(0), Y = G(() => {
		if (!d(K)) return o();
		let e = d(K).toLowerCase();
		return o().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function te(e) {
		return d(e === "path" ? ee : L);
	}
	function ne(e) {
		return e === "path" ? h().path : h().value;
	}
	function Q(e, t) {
		if (e === "path") {
			h({
				...h(),
				path: t
			});
			return;
		}
		h({
			...h(),
			value: t
		});
	}
	function re(e) {
		let t = te(e);
		if (!t) return null;
		let n = ne(e), r = t.selectionStart ?? n.length, i = n.slice(0, r), a = i.lastIndexOf("{");
		if (a === -1) return null;
		let o = i.slice(a + 1);
		return o.includes("}") ? null : {
			start: a,
			partial: o
		};
	}
	function ie(e) {
		H(B, e, !0);
		let t = re(e);
		if (!t || o().length === 0) {
			H(V, !1), H(K, ""), H(J, 0);
			return;
		}
		H(K, t.partial, !0), H(V, d(Y).length > 0), H(J, 0);
	}
	function ae(e, t = d(B)) {
		let n = re(t), r = te(t);
		if (!n || !r) return;
		let i = ne(t), a = r.selectionStart ?? i.length, o = i.slice(0, n.start);
		Q(t, `${o}{${e}}${i.slice(a)}`), H(V, !1), H(K, ""), queueMicrotask(() => {
			if (!r) return;
			let t = o.length + e.length + 2;
			r.focus(), r.setSelectionRange(t, t);
		});
	}
	function oe(e, t = d(B)) {
		let n = ne(t), r = te(t);
		if (!r) {
			Q(t, `${n}{${e}}`);
			return;
		}
		let i = r.selectionStart ?? n.length, a = n.slice(0, i);
		Q(t, `${a}{${e}}${n.slice(i)}`), queueMicrotask(() => {
			let t = a.length + e.length + 2;
			r.focus(), r.setSelectionRange(t, t);
		});
	}
	let se = (e) => ({
		handleInput: () => {
			ie(e);
		},
		handleKeydown: (t) => {
			if (!(!d(V) || d(Y).length === 0 || d(B) !== e)) {
				if (t.key === "ArrowDown") {
					t.preventDefault(), H(J, (d(J) + 1) % d(Y).length);
					return;
				}
				if (t.key === "ArrowUp") {
					t.preventDefault(), H(J, (d(J) - 1 + d(Y).length) % d(Y).length);
					return;
				}
				if (t.key === "Enter" || t.key === "Tab") {
					let n = d(Y)[d(J)];
					n && (t.preventDefault(), ae(n.key, e));
					return;
				}
				t.key === "Escape" && H(V, !1);
			}
		},
		handleBlur: () => {
			ce && clearTimeout(ce), ce = setTimeout(() => {
				H(V, !1), ce = void 0;
			}, 120);
		}
	}), ce;
	C(() => {
		ce && clearTimeout(ce);
	});
	let le = se("path"), ue = se("value"), de = G(() => a.error ? "border-red-500" : "border-dark-500"), fe = G(() => s().includes(h().type));
	var pe = Pa(), me = y(pe), he = (e) => {
		Vn(e, {
			get for() {
				return u();
			},
			children: (e, t) => {
				b();
				var n = k();
				v(() => R(n, a.label)), P(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	r(me, (e) => {
		a.label && e(he);
	});
	var ge = e(me, 2), _e = y(ge), ve = y(_e);
	F(ve, (e) => ({
		id: u(),
		placeholder: a.pathPlaceholder,
		class: e,
		"aria-invalid": a.error ? !0 : void 0,
		role: o().length > 0 ? "combobox" : void 0,
		"aria-autocomplete": o().length > 0 ? "list" : void 0,
		"aria-expanded": o().length > 0 ? d(V) && d(B) === "path" && d(Y).length > 0 : void 0,
		"aria-controls": o().length > 0 ? `${u()}-listbox` : void 0,
		"aria-activedescendant": d(V) && d(B) === "path" && d(Y).length > 0 ? `${u()}-option-${d(J)}` : void 0,
		oninput: o().length > 0 ? le.handleInput : void 0,
		onkeydown: o().length > 0 ? le.handleKeydown : void 0,
		onblur: o().length > 0 ? le.handleBlur : void 0,
		onfocus: o().length > 0 ? () => ie("path") : void 0,
		onclick: o().length > 0 ? () => ie("path") : void 0,
		...x
	}), [() => Z("min-w-0 flex-1 border border-r bg-dark-700 text-dark-50 outline-none", "rounded-l-xl", Xr.md, d(de))], void 0, void 0, void 0, !0), l(ve, (e) => H(ee, e), () => d(ee));
	var ye = e(ve, 2);
	t(ye, () => bn, (n, i) => {
		i(n, {
			type: "single",
			get items() {
				return j.items;
			},
			get value() {
				return h().type;
			},
			set value(e) {
				h(h().type = e, !0);
			},
			children: (n, i) => {
				var o = Ca(), s = p(o);
				{
					let n = G(() => Z("flex shrink-0 cursor-pointer items-center justify-between gap-2 border border-x-0 bg-dark-700 text-dark-50 outline-none", Xr.md, d(de), a.selectClass ?? "w-32"));
					t(s, () => En, (r, i) => {
						i(r, {
							get class() {
								return d(n);
							},
							children: (n, r) => {
								var i = Ca(), a = p(i);
								{
									let e = G(() => j.loading ? d(w) : d(S));
									t(a, () => Cn, (t, n) => {
										n(t, {
											get placeholder() {
												return d(e);
											},
											class: "truncate data-placeholder:text-dark-300"
										});
									});
								}
								X(e(a, 2), {
									icon: "ri:expand-up-down-line",
									class: "size-5 shrink-0 text-dark-300"
								}), P(n, i);
							},
							$$slots: { default: !0 }
						});
					});
				}
				t(e(s, 2), () => Qe, (n, i) => {
					i(n, {
						children: (n, i) => {
							var o = T(), s = p(o);
							{
								let n = G(() => a.contentProps?.sideOffset ?? 4), i = G(() => Z("z-50 max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", a.contentProps?.class));
								t(s, () => Yt, (o, s) => {
									s(o, I(() => a.contentProps, {
										get sideOffset() {
											return d(n);
										},
										get class() {
											return d(i);
										},
										children: (n, i) => {
											var a = Ea(), o = p(a);
											t(o, () => pn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														X(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = e(o, 2);
											t(s, () => an, (n, i) => {
												i(n, {
													children: (n, i) => {
														var a = T(), o = p(a), s = (e) => {
															var t = wa(), n = y(t, !0);
															m(t), v(() => R(n, d(w))), P(e, t);
														}, c = (n) => {
															var i = T();
															_(p(i), 17, () => j.items, ({ value: e, label: t, disabled: n }) => e, (n, i) => {
																let a = () => d(i).value, o = () => d(i).label, s = () => d(i).disabled;
																var c = T(), l = p(c);
																{
																	let n = (t, n) => {
																		let i = () => n?.().selected;
																		b();
																		var a = Ta(), s = p(a), c = e(s), l = (e) => {
																			X(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		r(c, (e) => {
																			i() && e(l);
																		}), v(() => R(s, `${o() ?? ""} `)), P(t, a);
																	}, i = G(() => Z("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	t(l, () => en, (e, t) => {
																		t(e, {
																			get value() {
																				return a();
																			},
																			get label() {
																				return o();
																			},
																			get disabled() {
																				return s();
																			},
																			get class() {
																				return d(i);
																			},
																			children: n,
																			$$slots: { default: !0 }
																		});
																	});
																}
																P(n, c);
															}), P(n, i);
														};
														r(o, (e) => {
															j.loading ? e(s) : e(c, -1);
														}), P(n, a);
													},
													$$slots: { default: !0 }
												});
											}), t(e(s, 2), () => ln, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														X(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), P(n, a);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							P(n, o);
						},
						$$slots: { default: !0 }
					});
				}), P(n, o);
			},
			$$slots: { default: !0 }
		});
	});
	var be = e(ye, 2), xe = (e) => {
		var t = Da();
		v((e) => q(t, 1, e), [() => D(Z("flex min-w-0 items-center rounded-r-xl border border-l-0 bg-dark-700 px-3 text-dark-500 select-none", Xr.md, d(de)))]), P(e, t);
	}, Se = (e) => {
		var t = Oa();
		E(t), l(t, (e) => H(L, e), () => d(L)), v((e) => {
			U(t, "placeholder", a.valuePlaceholder), q(t, 1, e), U(t, "aria-invalid", a.error ? !0 : void 0), U(t, "role", o().length > 0 ? "combobox" : void 0), U(t, "aria-autocomplete", o().length > 0 ? "list" : void 0), U(t, "aria-expanded", o().length > 0 ? d(V) && d(B) === "value" && d(Y).length > 0 : void 0), U(t, "aria-controls", o().length > 0 ? `${u()}-listbox` : void 0), U(t, "aria-activedescendant", d(V) && d(B) === "value" && d(Y).length > 0 ? `${u()}-option-${d(J)}` : void 0);
		}, [() => D(Z("min-w-0 flex-1 rounded-r-xl border bg-dark-700 text-dark-50 outline-none", Xr.md, d(de)))]), N("input", t, function(...e) {
			(o().length > 0 ? ue.handleInput : void 0)?.apply(this, e);
		}), N("keydown", t, function(...e) {
			(o().length > 0 ? ue.handleKeydown : void 0)?.apply(this, e);
		}), M("blur", t, function(...e) {
			(o().length > 0 ? ue.handleBlur : void 0)?.apply(this, e);
		}), M("focus", t, function(...e) {
			(o().length > 0 ? () => ie("value") : void 0)?.apply(this, e);
		}), N("click", t, function(...e) {
			(o().length > 0 ? () => ie("value") : void 0)?.apply(this, e);
		}), f(t, () => h().value, (e) => h(h().value = e, !0)), P(e, t);
	};
	r(be, (e) => {
		d(fe) ? e(xe) : e(Se, -1);
	}), m(_e);
	var Ce = e(_e, 2), we = (e) => {
		var t = ka();
		c(y(t), () => a.suffix), m(t), P(e, t);
	};
	r(Ce, (e) => {
		a.suffix && e(we);
	}), m(ge);
	var Te = e(ge, 2), Ee = (e) => {
		var t = Aa();
		_(t, 21, o, (e) => e.key, (e, t) => {
			rt(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return d(t).label;
				},
				onclick: () => oe(d(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					b();
					var r = k();
					v(() => R(r, `{${d(t).key}}`)), P(e, r);
				},
				$$slots: { default: !0 }
			});
		}), m(t), P(e, t);
	};
	r(Te, (e) => {
		o().length > 0 && e(Ee);
	});
	var De = e(Te, 2), Oe = (t) => {
		var n = Ma();
		_(n, 23, () => d(Y), (e) => e.key, (t, n, r) => {
			var i = ja(), a = y(i), o = y(a), s = y(o, !0);
			m(o);
			var c = e(o, 2), l = y(c, !0);
			m(c), m(a), m(i), v((e) => {
				U(a, "id", `${u()}-option-${d(r)}`), U(a, "aria-selected", d(r) === d(J)), q(a, 1, e), R(s, `{${d(n).key}}`), R(l, d(n).label);
			}, [() => D(Z("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", d(r) === d(J) && "bg-dark-700"))]), N("mousedown", a, (e) => {
				e.preventDefault(), ae(d(n).key, d(B));
			}), P(t, i);
		}), m(n), v(() => U(n, "id", `${u()}-listbox`)), P(t, n);
	};
	r(De, (e) => {
		d(V) && d(Y).length > 0 && e(Oe);
	});
	var ke = e(De, 2), Ae = (e) => {
		var t = Na(), n = y(t, !0);
		m(t), v(() => R(n, a.error)), P(e, t);
	};
	r(ke, (e) => {
		a.error && e(Ae);
	}), m(pe), v((e, t) => {
		q(pe, 1, e), q(_e, 1, t);
	}, [() => D(Z("relative grid w-full gap-2", a.class)), () => D(Z("grid min-w-0 flex-1 grid-cols-[1fr_120px_1fr] rounded-xl has-focus:ring-2 has-focus:ring-primary", a.error && "has-focus:ring-red-500"))]), f(ve, () => h().path, (e) => h(h().path = e, !0)), P(n, pe), g();
}
L([
	"input",
	"keydown",
	"click",
	"mousedown"
]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-variables.svelte
var Ia = new Set([
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
]), La = V("<div class=\"flex flex-wrap gap-1.5\"></div>"), Ra = V("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), za = V("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), Ba = V("<p class=\"text-sm text-red-400\"> </p>"), Va = V("<div class=\"relative grid w-full gap-2\"><!> <div><input/></div> <!> <!> <!></div>");
function Ha(t, n) {
	i(n, !0);
	let a = A(n, "variables", 19, () => []), o = A(n, "value", 15, ""), s = A(n, "id", 19, qe), c = W(n, Ia), u = O(null), p = O(!1), h = O(""), x = O(0), S = G(() => {
		if (!d(h)) return a();
		let e = d(h).toLowerCase();
		return a().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function w() {
		if (!d(u)) return null;
		let e = d(u).selectionStart ?? o().length, t = o().slice(0, e), n = t.lastIndexOf("{");
		if (n === -1) return null;
		let r = t.slice(n + 1);
		return r.includes("}") ? null : {
			start: n,
			partial: r
		};
	}
	function T() {
		let e = w();
		if (!e || a().length === 0) {
			H(p, !1), H(h, ""), H(x, 0);
			return;
		}
		H(h, e.partial, !0), H(p, d(S).length > 0), H(x, 0);
	}
	function E(e) {
		let t = w();
		if (!t || !d(u)) return;
		let n = d(u).selectionStart ?? o().length, r = o().slice(0, t.start);
		o(`${r}{${e}}${o().slice(n)}`), H(p, !1), H(h, ""), queueMicrotask(() => {
			if (!d(u)) return;
			let t = r.length + e.length + 2;
			d(u).focus(), d(u).setSelectionRange(t, t);
		});
	}
	function j(e) {
		if (!d(u)) {
			o(`${o()}{${e}}`);
			return;
		}
		let t = d(u).selectionStart ?? o().length, n = o().slice(0, t);
		o(`${n}{${e}}${o().slice(t)}`), queueMicrotask(() => {
			let t = n.length + e.length + 2;
			d(u)?.focus(), d(u)?.setSelectionRange(t, t);
		});
	}
	let M = (e) => {
		n.oninput?.(e), T();
	}, ee = (e) => {
		if (!(!d(p) || d(S).length === 0)) {
			if (e.key === "ArrowDown") {
				e.preventDefault(), H(x, (d(x) + 1) % d(S).length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault(), H(x, (d(x) - 1 + d(S).length) % d(S).length);
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				let t = d(S)[d(x)];
				t && (e.preventDefault(), E(t.key));
				return;
			}
			e.key === "Escape" && H(p, !1);
		}
	}, I, L = () => {
		I && clearTimeout(I), I = setTimeout(() => {
			H(p, !1), I = void 0;
		}, 120);
	};
	C(() => {
		I && clearTimeout(I);
	});
	var z = Va(), B = y(z), V = (e) => {
		Vn(e, {
			get for() {
				return s();
			},
			children: (e, t) => {
				b();
				var r = k();
				v(() => R(r, n.label)), P(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	r(B, (e) => {
		n.label && e(V);
	});
	var K = e(B, 2), J = y(K);
	F(J, (e) => ({
		id: s(),
		placeholder: n.placeholder,
		class: e,
		role: "combobox",
		"aria-invalid": n.error ? !0 : void 0,
		"aria-autocomplete": "list",
		"aria-expanded": d(p) && d(S).length > 0,
		"aria-controls": `${s()}-listbox`,
		"aria-activedescendant": d(p) && d(S).length > 0 ? `${s()}-option-${d(x)}` : void 0,
		oninput: M,
		onkeydown: ee,
		onblur: L,
		onfocus: T,
		onclick: T,
		...c
	}), [() => Z("w-full rounded-xl border bg-dark-700 text-dark-50 outline-none", Xr.md, n.error ? "border-red-500" : "border-dark-500")], void 0, void 0, void 0, !0), l(J, (e) => H(u, e), () => d(u)), m(K);
	var Y = e(K, 2), te = (e) => {
		var t = La();
		_(t, 21, a, (e) => e.key, (e, t) => {
			rt(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return d(t).label;
				},
				onclick: () => j(d(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					b();
					var r = k();
					v(() => R(r, `{${d(t).key}}`)), P(e, r);
				},
				$$slots: { default: !0 }
			});
		}), m(t), P(e, t);
	};
	r(Y, (e) => {
		a().length > 0 && e(te);
	});
	var X = e(Y, 2), ne = (t) => {
		var n = za();
		_(n, 23, () => d(S), (e) => e.key, (t, n, r) => {
			var i = Ra(), a = y(i), o = y(a), c = y(o, !0);
			m(o);
			var l = e(o, 2), u = y(l, !0);
			m(l), m(a), m(i), v((e) => {
				U(a, "id", `${s()}-option-${d(r)}`), U(a, "aria-selected", d(r) === d(x)), q(a, 1, e), R(c, `{${d(n).key}}`), R(u, d(n).label);
			}, [() => D(Z("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", d(r) === d(x) && "bg-dark-700"))]), N("mousedown", a, (e) => {
				e.preventDefault(), E(d(n).key);
			}), P(t, i);
		}), m(n), v(() => U(n, "id", `${s()}-listbox`)), P(t, n);
	};
	r(X, (e) => {
		d(p) && d(S).length > 0 && e(ne);
	});
	var Q = e(X, 2), re = (e) => {
		var t = Ba(), r = y(t, !0);
		m(t), v(() => R(r, n.error)), P(e, t);
	};
	r(Q, (e) => {
		n.error && e(re);
	}), m(z), v((e) => q(K, 1, e), [() => D(Z("relative flex w-full items-center rounded-xl", "has-focus-within:ring-2 has-focus-within:ring-primary", n.error && "has-focus-within:ring-red-500", n.class))]), f(J, o), P(t, z), g();
}
L(["mousedown"]);
//#endregion
export { Vn as _, oa as a, Hi as c, Ai as d, yi as f, Gn as g, rr as h, ua as i, Ri as l, Sr as m, Fa as n, ra as o, $r as p, xa as r, $i as s, Ha as t, Ii as u };
