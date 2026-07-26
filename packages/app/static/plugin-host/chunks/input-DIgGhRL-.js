import { $ as e, $n as t, Ct as n, Dt as r, E as i, G as a, Gn as o, H as s, Hr as c, Jr as l, Kn as u, Mn as d, Nn as f, On as p, Q as m, Qn as h, Qr as g, Qt as _, S as v, Sr as y, Vr as b, Wn as x, Xn as S, Yt as C, Z as w, Zn as T, Zr as E, _t as D, a as O, at as k, bn as A, cn as j, cr as M, dt as N, hn as P, jt as F, kt as I, ln as L, lr as R, m as z, mn as B, ni as V, nr as H, o as U, on as W, or as G, pr as K, pt as q, s as ee, un as J, ut as te, vn as ne, xn as re, yn as Y, zn as ie } from "./client-xxWnFgeR.js";
import { i as X, n as ae, o as oe, r as se, s as ce, t as le } from "./dist-7Fg9me4U.js";
import "./disclose-version-YhYaTdgb.js";
import { t as Z } from "./Icon-AeqJGRQj.js";
import "./index-client-DLfVeyOI.js";
import { t as Q } from "./utils-DJt177zd.js";
import { C as ue, D as $, _ as de, a as fe, c as pe, d as me, g as he, i as ge, l as _e, n as ve, o as ye, r as be, s as xe, u as Se, v as Ce, x as we } from "./animations-complete-DFBLw3EK.js";
import { _ as Te, b as Ee, g as De, h as Oe, m as ke, v as Ae, y as je } from "./scroll-lock--5Nsc7Xb.js";
import { i as Me, n as Ne, r as Pe, t as Fe } from "./use-id-Dbt6eP9X.js";
import { _ as Ie, a as Le, c as Re, d as ze, f as Be, g as Ve, h as He, l as Ue, m as We, o as Ge, p as Ke, s as qe, u as Je } from "./command-AKmEm1He.js";
import { t as Ye } from "./on-mount-effect.svelte-DbNAwE_8.js";
import { _ as Xe, a as Ze, d as Qe, f as $e, g as et, h as tt, i as nt, l as rt, m as it, o as at, p as ot, r as st, s as ct, u as lt, v as ut } from "./dom-CAV9qhsv.js";
import { a as dt, o as ft, t as pt } from "./presence-manager.svelte-DNcqE2Zq.js";
import { a as mt, c as ht, i as gt, n as _t, r as vt, s as yt } from "./dialog-CvJekZrY.js";
import { t as bt } from "./portal-BFSsRkE3.js";
import "./legacy-CT5GbYa1.js";
import { a as xt, n as St, r as Ct, t as wt } from "./popper-layer-force-mount-C0Qq7_vt.js";
import { t as Tt } from "./floating-layer-anchor-DbwYuEbg.js";
import { i as Et, n as Dt, r as Ot } from "./popover-DkplQp5K.js";
import { t as kt } from "./scroll-area-BdFM74vQ.js";
import { t as At } from "./button-C7Vln2y_.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/checkbox/checkbox.svelte.js
var jt = ye({
	component: "checkbox",
	parts: [
		"root",
		"group",
		"group-label",
		"input"
	]
}), Mt = new ue("Checkbox.Group"), Nt = new ue("Checkbox.Root"), Pt = class e {
	static create(t, n = null) {
		return Nt.set(new e(t, n));
	}
	opts;
	group;
	#e = K(() => this.group && this.group.opts.name.current ? this.group.opts.name.current : this.opts.name.current);
	get trueName() {
		return p(this.#e);
	}
	set trueName(e) {
		G(this.#e, e);
	}
	#t = K(() => this.group && this.group.opts.required.current ? !0 : this.opts.required.current);
	get trueRequired() {
		return p(this.#t);
	}
	set trueRequired(e) {
		G(this.#t, e);
	}
	#n = K(() => this.group && this.group.opts.disabled.current ? !0 : this.opts.disabled.current);
	get trueDisabled() {
		return p(this.#n);
	}
	set trueDisabled(e) {
		G(this.#n, e);
	}
	#r = K(() => this.group && this.group.opts.readonly.current ? !0 : this.opts.readonly.current);
	get trueReadonly() {
		return p(this.#r);
	}
	set trueReadonly(e) {
		G(this.#r, e);
	}
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = me(this.opts.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this), we.pre([() => l(this.group?.opts.value.current), () => this.opts.value.current], ([e, t]) => {
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
		return p(this.#a);
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
		"data-state": It(this.opts.checked.current, this.opts.indeterminate.current),
		[jt.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return p(this.#o);
	}
	set props(e) {
		G(this.#o, e);
	}
}, Ft = class e {
	static create() {
		return new e(Nt.get());
	}
	root;
	#e = K(() => this.root.group ? !!(this.root.opts.value.current !== void 0 && this.root.group.opts.value.current.includes(this.root.opts.value.current)) : this.root.opts.checked.current);
	get trueChecked() {
		return p(this.#e);
	}
	set trueChecked(e) {
		G(this.#e, e);
	}
	#t = K(() => !!this.root.trueName);
	get shouldRender() {
		return p(this.#t);
	}
	set shouldRender(e) {
		G(this.#t, e);
	}
	constructor(e) {
		this.root = e, this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		dt(this.root.opts.ref.current) && this.root.opts.ref.current.focus();
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
		return p(this.#n);
	}
	set props(e) {
		G(this.#n, e);
	}
};
function It(e, t) {
	return t ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/utilities/hidden-input.svelte
var Lt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value"
]), Rt = J("<input/>");
function zt(e, t) {
	c(t, !0);
	let n = O(t, "value", 15), r = U(t, Lt), i = K(() => Me(r, {
		"aria-hidden": "true",
		tabindex: -1,
		style: {
			...Ie,
			position: "absolute",
			top: "0",
			left: "0"
		}
	}));
	var o = L(), s = h(o), l = (e) => {
		var t = Rt();
		w(t, () => ({
			...p(i),
			value: n()
		}), void 0, void 0, void 0, void 0, !0), j(e, t);
	}, u = (e) => {
		var t = Rt();
		w(t, () => ({ ...p(i) }), void 0, void 0, void 0, void 0, !0), a(t, n), j(e, t);
	};
	F(s, (e) => {
		p(i).type === "checkbox" ? e(l) : e(u, -1);
	}), j(e, o), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/checkbox/components/checkbox-input.svelte
function Bt(e, t) {
	c(t, !1);
	let n = Ft.create();
	z();
	var r = L(), i = h(r), a = (e) => {
		zt(e, ee(() => n.props));
	};
	F(i, (e) => {
		n.shouldRender && e(a);
	}), j(e, r), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/checkbox/components/checkbox.svelte
var Vt = new Set([
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
]), Ht = J("<button><!></button>"), Ut = J("<!> <!>", 1);
function Wt(e, n) {
	let r = B();
	c(n, !0);
	let i = O(n, "checked", 15, !1), a = O(n, "ref", 15, null), o = O(n, "disabled", 3, !1), s = O(n, "required", 3, !1), l = O(n, "name", 3, void 0), u = O(n, "value", 3, "on"), d = O(n, "id", 19, () => Ne(r)), f = O(n, "indeterminate", 15, !1), m = O(n, "type", 3, "button"), v = U(n, Vt), y = Mt.getOr(null);
	y && u() && (y.opts.value.current.includes(u()) ? i(!0) : i(!1)), we.pre(() => u(), () => {
		y && u() && (y.opts.value.current.includes(u()) ? i(!0) : i(!1));
	});
	let x = Pt.create({
		checked: $(() => i(), (e) => {
			i(e), n.onCheckedChange?.(e);
		}),
		disabled: $(() => o() ?? !1),
		required: $(() => s()),
		name: $(() => l()),
		value: $(() => u()),
		id: $(() => d()),
		ref: $(() => a(), (e) => a(e)),
		indeterminate: $(() => f(), (e) => {
			f(e), n.onIndeterminateChange?.(e);
		}),
		type: $(() => m()),
		readonly: $(() => !!n.readonly)
	}, y), S = K(() => Me({ ...v }, x.props));
	var C = Ut(), E = h(C), D = (e) => {
		var t = L(), r = h(t);
		{
			let e = K(() => ({
				props: p(S),
				...x.snippetProps
			}));
			_(r, () => n.child, () => p(e));
		}
		j(e, t);
	}, k = (e) => {
		var t = Ht();
		w(t, () => ({ ...p(S) })), _(T(t), () => n.children ?? V, () => x.snippetProps), g(t), j(e, t);
	};
	F(E, (e) => {
		n.child ? e(D) : e(k, -1);
	}), Bt(t(E, 2), {}), j(e, C), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/internal/data-typeahead.svelte.js
var Gt = class {
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
		if (!this.#e.enabled() || !p(this.#t).length) return;
		this.#n.current = this.#n.current + e;
		let t = this.#e.getCurrentItem(), n = p(this.#t).find((e) => e === t) ?? "", r = Ae(p(this.#t).map((e) => e ?? ""), this.#n.current, n), i = p(this.#t).find((e) => e === r);
		return i && this.#e.onMatch(i), i;
	}
	resetTypeahead() {
		this.#n.current = "";
	}
}, Kt = [
	Ze,
	$e,
	at,
	Xe,
	rt,
	lt,
	"Alt",
	it,
	Qe,
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
], qt = [
	nt,
	et,
	ot
], Jt = [
	ct,
	tt,
	"End"
], Yt = [...qt, ...Jt], Xt = ye({
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
}), Zt = new ue("Select.Root | Combobox.Root");
new ue("Select.Group | Combobox.Group");
var Qt = new ue("Select.Content | Combobox.Content"), $t = class {
	opts;
	#e = M(!1);
	get touchedInput() {
		return p(this.#e);
	}
	set touchedInput(e) {
		G(this.#e, e, !0);
	}
	#t = M(null);
	get inputNode() {
		return p(this.#t);
	}
	set inputNode(e) {
		G(this.#t, e, !0);
	}
	#n = M(null);
	get contentNode() {
		return p(this.#n);
	}
	set contentNode(e) {
		G(this.#n, e, !0);
	}
	contentPresence;
	#r = M(null);
	get viewportNode() {
		return p(this.#r);
	}
	set viewportNode(e) {
		G(this.#r, e, !0);
	}
	#i = M(null);
	get triggerNode() {
		return p(this.#i);
	}
	set triggerNode(e) {
		G(this.#i, e, !0);
	}
	#a = M(null);
	get valueNode() {
		return p(this.#a);
	}
	set valueNode(e) {
		G(this.#a, e, !0);
	}
	#o = M("");
	get valueId() {
		return p(this.#o);
	}
	set valueId(e) {
		G(this.#o, e, !0);
	}
	#s = M(null);
	get highlightedNode() {
		return p(this.#s);
	}
	set highlightedNode(e) {
		G(this.#s, e, !0);
	}
	#c = K(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-value") : null);
	get highlightedValue() {
		return p(this.#c);
	}
	set highlightedValue(e) {
		G(this.#c, e);
	}
	#l = K(() => {
		if (this.highlightedNode) return this.highlightedNode.id;
	});
	get highlightedId() {
		return p(this.#l);
	}
	set highlightedId(e) {
		G(this.#l, e);
	}
	#u = K(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-label") : null);
	get highlightedLabel() {
		return p(this.#u);
	}
	set highlightedLabel(e) {
		G(this.#u, e);
	}
	#d = M(!1);
	get contentIsPositioned() {
		return p(this.#d);
	}
	set contentIsPositioned(e) {
		G(this.#d, e, !0);
	}
	isUsingKeyboard = !1;
	isCombobox = !1;
	domContext = new Pe(() => null);
	constructor(e) {
		this.opts = e, this.isCombobox = e.isCombobox, this.contentPresence = new pt({
			ref: $(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), u(() => {
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
	getBitsAttr = (e) => Xt.getAttr(e, this.isCombobox ? "combobox" : void 0);
}, en = class extends $t {
	opts;
	isMulti = !1;
	#e = K(() => this.opts.value.current !== "");
	get hasValue() {
		return p(this.#e);
	}
	set hasValue(e) {
		G(this.#e, e);
	}
	#t = K(() => this.opts.items.current.length ? this.opts.items.current.find((e) => e.value === this.opts.value.current)?.label ?? "" : "");
	get currentLabel() {
		return p(this.#t);
	}
	set currentLabel(e) {
		G(this.#t, e);
	}
	#n = K(() => this.opts.items.current.length ? this.opts.items.current.filter((e) => !e.disabled).map((e) => e.label) : []);
	get candidateLabels() {
		return p(this.#n);
	}
	set candidateLabels(e) {
		G(this.#n, e);
	}
	#r = K(() => !(this.isMulti || this.opts.items.current.length === 0));
	get dataTypeaheadEnabled() {
		return p(this.#r);
	}
	set dataTypeaheadEnabled(e) {
		G(this.#r, e);
	}
	constructor(e) {
		super(e), this.opts = e, o(() => {
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
}, tn = class extends $t {
	opts;
	isMulti = !0;
	#e = K(() => this.opts.value.current.length > 0);
	get hasValue() {
		return p(this.#e);
	}
	set hasValue(e) {
		G(this.#e, e);
	}
	constructor(e) {
		super(e), this.opts = e, o(() => {
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
}, nn = class {
	static create(e) {
		let { type: t, ...n } = e, r = t === "single" ? new en(n) : new tn(n);
		return Zt.set(r);
	}
}, rn = class e {
	static create(t) {
		return new e(t, Zt.get());
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
		return p(this.#e);
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
		return p(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, an = class e {
	static create(t) {
		return new e(t, Zt.get());
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
				if (Kt.includes(e.key) || e.key === "Tab" || e.key === "Backspace" && this.root.opts.inputValue.current === "" || (this.root.handleOpen(), this.root.hasValue)) return;
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
			if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), Yt.includes(e.key)) {
				e.preventDefault();
				let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
				if (e.key === "ArrowDown" ? a = je(t, r, i) : e.key === "ArrowUp" ? a = Ee(t, r, i) : e.key === "PageDown" ? a = Te(t, r, 10, i) : e.key === "PageUp" ? a = De(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
				this.root.setHighlightedNode(a);
				return;
			}
			Kt.includes(e.key) || this.root.highlightedNode || this.root.setHighlightedToFirstCandidate();
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
		return p(this.#e);
	}
	set props(e) {
		G(this.#e, e);
	}
}, on = class e {
	static create(t) {
		return new e(t, Zt.get());
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
		}), this.#t = new Gt({
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
		if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), Yt.includes(e.key)) {
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
		return p(this.#a);
	}
	set props(e) {
		G(this.#a, e);
	}
}, sn = class e {
	static create(t) {
		return Qt.set(new e(t, Zt.get()));
	}
	opts;
	root;
	attachment;
	#e = M(!1);
	get isPositioned() {
		return p(this.#e);
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
	#t = K(() => xt(this.root.isCombobox ? "combobox" : "select"));
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
		return p(this.#n);
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
			...p(this.#t)
		},
		onpointermove: this.onpointermove,
		...this.attachment
	}));
	get props() {
		return p(this.#r);
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
}, cn = class e {
	static create(t) {
		return new e(t, Zt.get());
	}
	opts;
	root;
	attachment;
	#e = K(() => this.root.includesItem(this.opts.value.current));
	get isSelected() {
		return p(this.#e);
	}
	set isSelected(e) {
		G(this.#e, e);
	}
	#t = K(() => this.root.highlightedValue === this.opts.value.current);
	get isHighlighted() {
		return p(this.#t);
	}
	set isHighlighted(e) {
		G(this.#t, e);
	}
	prevHighlighted = new Ce(() => this.isHighlighted);
	#n = M(!1);
	get mounted() {
		return p(this.#n);
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
		return p(this.#r);
	}
	set snippetProps(e) {
		G(this.#r, e);
	}
	onpointerdown(e) {
		e.preventDefault();
	}
	onpointerup(e) {
		if (!(e.defaultPrevented || !this.opts.ref.current)) {
			if (e.pointerType === "touch" && !ft) {
				re(this.opts.ref.current, "click", () => {
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
		return p(this.#i);
	}
	set props(e) {
		G(this.#i, e);
	}
}, ln = class e {
	static create(t) {
		return new e(t, Zt.get());
	}
	opts;
	root;
	#e = K(() => this.root.opts.name.current !== "");
	get shouldRender() {
		return p(this.#e);
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
		return p(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, un = class e {
	static create(t) {
		return new e(t, Qt.get());
	}
	opts;
	content;
	root;
	attachment;
	#e = M(0);
	get prevScrollTop() {
		return p(this.#e);
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
		return p(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, dn = class {
	opts;
	content;
	root;
	attachment;
	autoScrollTimer = null;
	userScrollTimer = -1;
	isUserScrolling = !1;
	onAutoScroll = st;
	#e = M(!1);
	get mounted() {
		return p(this.#e);
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
		return p(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, fn = class e {
	static create(t) {
		return new e(new dn(t, Qt.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = M(!1);
	get canScrollDown() {
		return p(this.#e);
	}
	set canScrollDown(e) {
		G(this.#e, e, !0);
	}
	scrollIntoViewTimer = null;
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, we([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), re(this.root.viewportNode, "scroll", () => this.handleScroll());
		}), we([
			() => this.root.opts.inputValue.current,
			() => this.root.viewportNode,
			() => this.content.isPositioned
		], () => {
			!this.root.viewportNode || !this.content.isPositioned || this.handleScroll(!0);
		}), we(() => this.scrollButtonState.mounted, () => {
			this.scrollButtonState.mounted && (this.scrollIntoViewTimer && clearTimeout(this.scrollIntoViewTimer), this.scrollIntoViewTimer = ut(5, () => {
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
		return p(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, pn = class e {
	static create(t) {
		return new e(new dn(t, Qt.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = M(!1);
	get canScrollUp() {
		return p(this.#e);
	}
	set canScrollUp(e) {
		G(this.#e, e, !0);
	}
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, we([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), re(this.root.viewportNode, "scroll", () => this.handleScroll());
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
		return p(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-hidden-input.svelte
function mn(e, t) {
	c(t, !0);
	let n = O(t, "value", 15), r = ln.create({ value: $(() => n()) });
	var i = L(), a = h(i), o = (e) => {
		zt(e, ee(() => r.props, {
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
	F(a, (e) => {
		r.shouldRender && e(o);
	}), j(e, i), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/combobox/components/combobox.svelte
var hn = J("<!> <!>", 1);
function gn(e, n) {
	c(n, !0);
	let i = O(n, "value", 15), a = O(n, "onValueChange", 3, st), o = O(n, "name", 3, ""), s = O(n, "disabled", 3, !1), l = O(n, "open", 15, !1), u = O(n, "onOpenChange", 3, st), d = O(n, "onOpenChangeComplete", 3, st), f = O(n, "loop", 3, !1), m = O(n, "scrollAlignment", 3, "nearest"), g = O(n, "required", 3, !1), v = O(n, "items", 19, () => []), y = O(n, "allowDeselect", 3, !0), x = O(n, "inputValue", 7, "");
	i() === void 0 && i(n.type === "single" ? "" : []), we.pre(() => i(), () => {
		i() === void 0 && i(n.type === "single" ? "" : []);
	});
	let S = nn.create({
		type: n.type,
		value: $(() => i(), (e) => {
			i(e), a()(e);
		}),
		disabled: $(() => s()),
		required: $(() => g()),
		open: $(() => l(), (e) => {
			l(e), u()(e);
		}),
		loop: $(() => f()),
		scrollAlignment: $(() => m()),
		name: $(() => o()),
		isCombobox: !0,
		items: $(() => v()),
		allowDeselect: $(() => y()),
		inputValue: $(() => x(), (e) => x(e)),
		onOpenChangeComplete: $(() => d())
	});
	var C = hn(), w = h(C);
	Ct(w, {
		children: (e, t) => {
			var r = L();
			_(h(r), () => n.children ?? V), j(e, r);
		},
		$$slots: { default: !0 }
	});
	var T = t(w, 2), E = (e) => {
		var t = L(), n = h(t), i = (e) => {
			var t = L();
			r(h(t), 16, () => S.opts.value.current, (e) => e, (e, t) => {
				mn(e, { get value() {
					return t;
				} });
			}), j(e, t);
		};
		F(n, (e) => {
			S.opts.value.current.length && e(i);
		}), j(e, t);
	}, D = K(() => Array.isArray(S.opts.value.current)), k = (e) => {
		mn(e, {
			get value() {
				return S.opts.value.current;
			},
			set value(e) {
				S.opts.value.current = e;
			}
		});
	};
	F(T, (e) => {
		p(D) ? e(E) : e(k, -1);
	}), j(e, C), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/combobox/components/combobox-input.svelte
var _n = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"defaultValue",
	"clearOnDeselect"
]), vn = J("<input/>");
function yn(e, t) {
	c(t, !0);
	let r = O(t, "id", 19, Fe), i = O(t, "ref", 15, null), a = O(t, "clearOnDeselect", 3, !1), o = U(t, _n), s = an.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e)),
		clearOnDeselect: $(() => a())
	});
	t.defaultValue && (s.root.opts.inputValue.current = t.defaultValue);
	let l = K(() => Me(o, s.props, { value: s.root.opts.inputValue.current }));
	var u = L();
	n(h(u), () => Tt, (e, n) => {
		n(e, {
			get id() {
				return r();
			},
			get ref() {
				return s.opts.ref;
			},
			children: (e, n) => {
				var r = L(), i = h(r), a = (e) => {
					var n = L();
					_(h(n), () => t.child, () => ({ props: p(l) })), j(e, n);
				}, o = (e) => {
					var t = vn();
					w(t, () => ({ ...p(l) }), void 0, void 0, void 0, void 0, !0), j(e, t);
				};
				F(i, (e) => {
					t.child ? e(a) : e(o, -1);
				}), j(e, r);
			},
			$$slots: { default: !0 }
		});
	}), j(e, u), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-content.svelte
var bn = new Set([
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
]), xn = J("<div><div><!></div></div>");
function Sn(e, t) {
	let n = B();
	c(t, !0);
	let r = O(t, "id", 19, () => Ne(n)), i = O(t, "ref", 15, null), a = O(t, "forceMount", 3, !1), o = O(t, "side", 3, "bottom"), s = O(t, "onInteractOutside", 3, st), l = O(t, "onEscapeKeydown", 3, st), u = O(t, "preventScroll", 3, !1), d = U(t, bn), f = sn.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e)),
		onInteractOutside: $(() => s()),
		onEscapeKeydown: $(() => l())
	}), m = K(() => Me(d, f.props));
	var v = L(), y = h(v), x = (e) => {
		wt(e, ee(() => p(m), () => f.popperProps, {
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
				return u();
			},
			forceMount: !0,
			get shouldRender() {
				return f.shouldRender;
			},
			popper: (e, n) => {
				let r = () => n?.().props, i = () => n?.().wrapperProps, a = K(() => Me(r(), { style: f.props.style }, { style: t.style }));
				var o = L(), s = h(o), c = (e) => {
					var n = L(), r = h(n);
					{
						let e = K(() => ({
							props: p(a),
							wrapperProps: i(),
							...f.snippetProps
						}));
						_(r, () => t.child, () => p(e));
					}
					j(e, n);
				}, l = (e) => {
					var n = xn();
					w(n, () => ({ ...i() }));
					var r = T(n);
					w(r, () => ({ ...p(a) })), _(T(r), () => t.children ?? V), g(r), g(n), j(e, n);
				};
				F(s, (e) => {
					t.child ? e(c) : e(l, -1);
				}), j(e, o);
			},
			$$slots: { popper: !0 }
		}));
	}, S = (e) => {
		St(e, ee(() => p(m), () => f.popperProps, {
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
				return u();
			},
			forceMount: !1,
			get shouldRender() {
				return f.shouldRender;
			},
			popper: (e, n) => {
				let r = () => n?.().props, i = () => n?.().wrapperProps, a = K(() => Me(r(), { style: f.props.style }, { style: t.style }));
				var o = L(), s = h(o), c = (e) => {
					var n = L(), r = h(n);
					{
						let e = K(() => ({
							props: p(a),
							wrapperProps: i(),
							...f.snippetProps
						}));
						_(r, () => t.child, () => p(e));
					}
					j(e, n);
				}, l = (e) => {
					var n = xn();
					w(n, () => ({ ...i() }));
					var r = T(n);
					w(r, () => ({ ...p(a) })), _(T(r), () => t.children ?? V), g(r), g(n), j(e, n);
				};
				F(s, (e) => {
					t.child ? e(c) : e(l, -1);
				}), j(e, o);
			},
			$$slots: { popper: !0 }
		}));
	};
	F(y, (e) => {
		a() ? e(x) : a() || e(S, 1);
	}), j(e, v), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/utilities/mounted.svelte
function Cn(e, t) {
	c(t, !0);
	let n = O(t, "mounted", 15, !1), r = O(t, "onMountedChange", 3, st);
	Ye(() => (n(!0), r()(!0), () => {
		n(!1), r()(!1);
	})), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-item.svelte
var wn = new Set([
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
]), Tn = J("<div><!></div>"), En = J("<!> <!>", 1);
function Dn(e, n) {
	let r = B();
	c(n, !0);
	let i = O(n, "id", 19, () => Ne(r)), a = O(n, "ref", 15, null), o = O(n, "label", 19, () => n.value), s = O(n, "disabled", 3, !1), l = O(n, "onHighlight", 3, st), u = O(n, "onUnhighlight", 3, st), d = U(n, wn), f = cn.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e)),
		value: $(() => n.value),
		disabled: $(() => s()),
		label: $(() => o()),
		onHighlight: $(() => l()),
		onUnhighlight: $(() => u())
	}), m = K(() => Me(d, f.props));
	var v = En(), y = h(v), x = (e) => {
		var t = L(), r = h(t);
		{
			let e = K(() => ({
				props: p(m),
				...f.snippetProps
			}));
			_(r, () => n.child, () => p(e));
		}
		j(e, t);
	}, S = (e) => {
		var t = Tn();
		w(t, () => ({ ...p(m) })), _(T(t), () => n.children ?? V, () => f.snippetProps), g(t), j(e, t);
	};
	F(y, (e) => {
		n.child ? e(x) : e(S, -1);
	}), Cn(t(y, 2), {
		get mounted() {
			return f.mounted;
		},
		set mounted(e) {
			f.mounted = e;
		}
	}), j(e, v), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-viewport.svelte
var On = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), kn = J("<div><!></div>"), An = {
	hash: "svelte-1lpv8z5",
	code: "\n	/* Hide scrollbars cross browser and enable momentum scroll for touch devices */[data-select-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport]::-webkit-scrollbar {display:none !important;}[data-select-viewport]::-webkit-scrollbar {display:none !important;}"
};
function jn(e, t) {
	let n = B();
	c(t, !0), D(e, An);
	let r = O(t, "id", 19, () => Ne(n)), i = O(t, "ref", 15, null), a = U(t, On), o = un.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), s = K(() => Me(a, o.props));
	var l = L(), u = h(l), d = (e) => {
		var n = L();
		_(h(n), () => t.child, () => ({ props: p(s) })), j(e, n);
	}, f = (e) => {
		var n = kn();
		w(n, () => ({ ...p(s) })), _(T(n), () => t.children ?? V), g(n), j(e, n);
	};
	F(u, (e) => {
		t.child ? e(d) : e(f, -1);
	}), j(e, l), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-scroll-down-button.svelte
var Mn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), Nn = J("<div><!></div>"), Pn = J("<!> <!>", 1);
function Fn(e, n) {
	let r = B();
	c(n, !0);
	let i = O(n, "id", 19, () => Ne(r)), a = O(n, "ref", 15, null), o = O(n, "delay", 3, () => 50), s = U(n, Mn), l = fn.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e)),
		delay: $(() => o())
	}), u = K(() => Me(s, l.props));
	var d = L(), f = h(d), m = (e) => {
		var r = Pn(), i = h(r);
		Cn(i, {
			get mounted() {
				return l.scrollButtonState.mounted;
			},
			set mounted(e) {
				l.scrollButtonState.mounted = e;
			}
		});
		var a = t(i, 2), o = (e) => {
			var t = L();
			_(h(t), () => n.child, () => ({ props: s })), j(e, t);
		}, c = (e) => {
			var t = Nn();
			w(t, () => ({ ...p(u) })), _(T(t), () => n.children ?? V), g(t), j(e, t);
		};
		F(a, (e) => {
			n.child ? e(o) : e(c, -1);
		}), j(e, r);
	};
	F(f, (e) => {
		l.canScrollDown && e(m);
	}), j(e, d), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-scroll-up-button.svelte
var In = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), Ln = J("<div><!></div>"), Rn = J("<!> <!>", 1);
function zn(e, n) {
	let r = B();
	c(n, !0);
	let i = O(n, "id", 19, () => Ne(r)), a = O(n, "ref", 15, null), o = O(n, "delay", 3, () => 50), s = U(n, In), l = pn.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e)),
		delay: $(() => o())
	}), u = K(() => Me(s, l.props));
	var d = L(), f = h(d), m = (e) => {
		var r = Rn(), i = h(r);
		Cn(i, {
			get mounted() {
				return l.scrollButtonState.mounted;
			},
			set mounted(e) {
				l.scrollButtonState.mounted = e;
			}
		});
		var a = t(i, 2), o = (e) => {
			var t = L();
			_(h(t), () => n.child, () => ({ props: s })), j(e, t);
		}, c = (e) => {
			var t = Ln();
			w(t, () => ({ ...p(u) })), _(T(t), () => n.children ?? V), g(t), j(e, t);
		};
		F(a, (e) => {
			n.child ? e(o) : e(c, -1);
		}), j(e, r);
	};
	F(f, (e) => {
		l.canScrollUp && e(m);
	}), j(e, d), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/label/label.svelte.js
var Bn = ye({
	component: "label",
	parts: ["root"]
}), Vn = class e {
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
		[Bn.root]: "",
		onmousedown: this.onmousedown,
		...this.attachment
	}));
	get props() {
		return p(this.#e);
	}
	set props(e) {
		G(this.#e, e);
	}
}, Hn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"for"
]), Un = J("<label><!></label>");
function Wn(e, t) {
	let n = B();
	c(t, !0);
	let r = O(t, "id", 19, () => Ne(n)), i = O(t, "ref", 15, null), a = U(t, Hn), o = Vn.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), s = K(() => Me(a, o.props, { for: t.for }));
	var l = L(), u = h(l), d = (e) => {
		var n = L();
		_(h(n), () => t.child, () => ({ props: p(s) })), j(e, n);
	}, f = (e) => {
		var n = Un();
		w(n, () => ({
			...p(s),
			for: t.for
		})), _(T(n), () => t.children ?? V), g(n), j(e, n);
	};
	F(u, (e) => {
		t.child ? e(d) : e(f, -1);
	}), j(e, l), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select.svelte
var Gn = J("<!> <!>", 1);
function Kn(e, n) {
	c(n, !0);
	let i = O(n, "value", 15), a = O(n, "onValueChange", 3, st), o = O(n, "name", 3, ""), s = O(n, "disabled", 3, !1), l = O(n, "open", 15, !1), u = O(n, "onOpenChange", 3, st), d = O(n, "onOpenChangeComplete", 3, st), f = O(n, "loop", 3, !1), m = O(n, "scrollAlignment", 3, "nearest"), g = O(n, "required", 3, !1), v = O(n, "items", 19, () => []), y = O(n, "allowDeselect", 3, !1);
	function x() {
		i() === void 0 && i(n.type === "single" ? "" : []);
	}
	x(), we.pre(() => i(), () => {
		x();
	});
	let S = M(""), C = nn.create({
		type: n.type,
		value: $(() => i(), (e) => {
			i(e), a()(e);
		}),
		disabled: $(() => s()),
		required: $(() => g()),
		open: $(() => l(), (e) => {
			l(e), u()(e);
		}),
		loop: $(() => f()),
		scrollAlignment: $(() => m()),
		name: $(() => o()),
		isCombobox: !1,
		items: $(() => v()),
		allowDeselect: $(() => y()),
		inputValue: $(() => p(S), (e) => G(S, e, !0)),
		onOpenChangeComplete: $(() => d())
	});
	var w = Gn(), T = h(w);
	Ct(T, {
		children: (e, t) => {
			var r = L();
			_(h(r), () => n.children ?? V), j(e, r);
		},
		$$slots: { default: !0 }
	});
	var E = t(T, 2), D = (e) => {
		var t = L(), i = h(t), a = (e) => {
			mn(e, { get autocomplete() {
				return n.autocomplete;
			} });
		}, o = (e) => {
			var t = L();
			r(h(t), 16, () => C.opts.value.current, (e) => e, (e, t) => {
				mn(e, {
					get value() {
						return t;
					},
					get autocomplete() {
						return n.autocomplete;
					}
				});
			}), j(e, t);
		};
		F(i, (e) => {
			C.opts.value.current.length === 0 ? e(a) : e(o, -1);
		}), j(e, t);
	}, k = K(() => Array.isArray(C.opts.value.current)), A = (e) => {
		mn(e, {
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
	F(E, (e) => {
		p(k) ? e(D) : e(A, -1);
	}), j(e, w), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-value.svelte
var qn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"placeholder",
	"child",
	"children"
]), Jn = J("<span><!></span>");
function Yn(e, t) {
	let n = B();
	c(t, !0);
	let r = O(t, "ref", 15, null), i = O(t, "id", 19, () => Ne(n)), a = U(t, qn), o = rn.create({
		id: $(() => i()),
		ref: $(() => r(), (e) => r(e)),
		placeholder: $(() => t.placeholder)
	}), s = K(() => Me(a, o.props));
	var l = L(), u = h(l), d = (e) => {
		var n = L(), r = h(n);
		{
			let e = K(() => ({
				props: p(s),
				...o.snippetProps
			}));
			_(r, () => t.child, () => p(e));
		}
		j(e, n);
	}, f = (e) => {
		var n = Jn();
		w(n, () => ({ ...p(s) }));
		var r = T(n), i = (e) => {
			var n = L();
			_(h(n), () => t.children ?? V, () => o.snippetProps), j(e, n);
		}, a = (e) => {
			var n = P();
			x(() => W(n, o.snippetProps.selection.selected?.label ?? t.placeholder)), j(e, n);
		}, c = (e) => {
			var n = P();
			x((e) => W(n, e), [() => o.snippetProps.selection.selected.length > 0 ? o.snippetProps.selection.selected.map((e) => e.label).join(", ") : t.placeholder]), j(e, n);
		}, l = (e) => {
			var n = P();
			x(() => W(n, t.placeholder)), j(e, n);
		};
		F(r, (e) => {
			t.children ? e(i) : o.snippetProps.selection.type === "single" ? e(a, 1) : o.snippetProps.selection.type === "multiple" && o.snippetProps.selection.selected ? e(c, 2) : e(l, -1);
		}), g(n), j(e, n);
	};
	F(u, (e) => {
		t.child ? e(d) : e(f, -1);
	}), j(e, l), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-trigger.svelte
var Xn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"type"
]), Zn = J("<button><!></button>");
function Qn(e, t) {
	let r = B();
	c(t, !0);
	let i = O(t, "id", 19, () => Ne(r)), a = O(t, "ref", 15, null), o = O(t, "type", 3, "button"), s = U(t, Xn), l = on.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e))
	}), u = K(() => Me(s, l.props, { type: o() }));
	var d = L();
	n(h(d), () => Tt, (e, n) => {
		n(e, {
			get id() {
				return i();
			},
			get ref() {
				return l.opts.ref;
			},
			children: (e, n) => {
				var r = L(), i = h(r), a = (e) => {
					var n = L();
					_(h(n), () => t.child, () => ({ props: p(u) })), j(e, n);
				}, o = (e) => {
					var n = Zn();
					w(n, () => ({ ...p(u) })), _(T(n), () => t.children ?? V), g(n), j(e, n);
				};
				F(i, (e) => {
					t.child ? e(a) : e(o, -1);
				}), j(e, r);
			},
			$$slots: { default: !0 }
		});
	}), j(e, d), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/switch/switch.svelte.js
var $n = ye({
	component: "switch",
	parts: ["root", "thumb"]
}), er = new ue("Switch.Root"), tr = class e {
	static create(t) {
		return er.set(new e(t));
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
		return p(this.#t);
	}
	set sharedProps(e) {
		G(this.#t, e);
	}
	#n = K(() => ({ checked: this.opts.checked.current }));
	get snippetProps() {
		return p(this.#n);
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
		[$n.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return p(this.#r);
	}
	set props(e) {
		G(this.#r, e);
	}
}, nr = class e {
	static create() {
		return new e(er.get());
	}
	root;
	#e = K(() => this.root.opts.name.current !== void 0);
	get shouldRender() {
		return p(this.#e);
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
		return p(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, rr = class e {
	static create(t) {
		return new e(t, er.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = me(e.ref);
	}
	#e = K(() => ({ checked: this.root.opts.checked.current }));
	get snippetProps() {
		return p(this.#e);
	}
	set snippetProps(e) {
		G(this.#e, e);
	}
	#t = K(() => ({
		...this.root.sharedProps,
		id: this.opts.id.current,
		[$n.thumb]: "",
		...this.attachment
	}));
	get props() {
		return p(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/switch/components/switch-input.svelte
function ir(e, t) {
	c(t, !1);
	let n = nr.create();
	z();
	var r = L(), i = h(r), a = (e) => {
		zt(e, ee(() => n.props));
	};
	F(i, (e) => {
		n.shouldRender && e(a);
	}), j(e, r), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/switch/components/switch.svelte
var ar = new Set([
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
]), or = J("<button><!></button>"), sr = J("<!> <!>", 1);
function cr(e, n) {
	let r = B();
	c(n, !0);
	let i = O(n, "ref", 15, null), a = O(n, "id", 19, () => Ne(r)), o = O(n, "disabled", 3, !1), s = O(n, "required", 3, !1), l = O(n, "checked", 15, !1), u = O(n, "value", 3, "on"), d = O(n, "name", 3, void 0), f = O(n, "type", 3, "button"), m = O(n, "onCheckedChange", 3, st), v = U(n, ar), y = tr.create({
		checked: $(() => l(), (e) => {
			l(e), m()?.(e);
		}),
		disabled: $(() => o() ?? !1),
		required: $(() => s()),
		value: $(() => u()),
		name: $(() => d()),
		id: $(() => a()),
		ref: $(() => i(), (e) => i(e))
	}), x = K(() => Me(v, y.props, { type: f() }));
	var S = sr(), C = h(S), E = (e) => {
		var t = L(), r = h(t);
		{
			let e = K(() => ({
				props: p(x),
				...y.snippetProps
			}));
			_(r, () => n.child, () => p(e));
		}
		j(e, t);
	}, D = (e) => {
		var t = or();
		w(t, () => ({ ...p(x) })), _(T(t), () => n.children ?? V, () => y.snippetProps), g(t), j(e, t);
	};
	F(C, (e) => {
		n.child ? e(E) : e(D, -1);
	}), ir(t(C, 2), {}), j(e, S), b();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/switch/components/switch-thumb.svelte
var lr = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"ref",
	"id"
]), ur = J("<span><!></span>");
function dr(e, t) {
	let n = B();
	c(t, !0);
	let r = O(t, "ref", 15, null), i = O(t, "id", 19, () => Ne(n)), a = U(t, lr), o = rr.create({
		id: $(() => i()),
		ref: $(() => r(), (e) => r(e))
	}), s = K(() => Me(a, o.props));
	var l = L(), u = h(l), d = (e) => {
		var n = L(), r = h(n);
		{
			let e = K(() => ({
				props: p(s),
				...o.snippetProps
			}));
			_(r, () => t.child, () => p(e));
		}
		j(e, n);
	}, f = (e) => {
		var n = ur();
		w(n, () => ({ ...p(s) })), _(T(n), () => t.children ?? V, () => o.snippetProps), g(n), j(e, n);
	};
	F(u, (e) => {
		t.child ? e(d) : e(f, -1);
	}), j(e, l), b();
}
//#endregion
//#region ../ui/src/lib/components/input/input-field-classes.ts
var fr = "bg-dark-700 text-dark-50", pr = "group", mr = "border-border hover:border-dark-400 group-hover:border-dark-400 disabled:hover:border-border group-has-[:disabled]:border-border", hr = "border-destructive";
function gr(e) {
	return e ? hr : mr;
}
function _r(e) {
	return gr(e);
}
function vr(e) {
	return e ? "has-focus:ring-2 has-focus:ring-destructive" : "has-focus:ring-2 has-focus:ring-ring";
}
function yr(e) {
	return e ? "focus-within:ring-2 focus-within:ring-destructive" : "focus-within:ring-2 focus-within:ring-ring";
}
var br = "text-sm text-destructive-100", xr = "text-destructive-100", Sr = "disabled:cursor-not-allowed disabled:opacity-50", Cr = "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", wr = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function Tr(e, t) {
	c(t, !0);
	let r = U(t, wr);
	var i = L(), a = h(i);
	{
		let e = K(() => Q("text-sm font-medium text-muted-foreground", t.class));
		n(a, () => Wn, (n, i) => {
			i(n, ee({ get children() {
				return t.children;
			} }, () => r, { get class() {
				return p(e);
			} }));
		});
	}
	j(e, i), b();
}
//#endregion
//#region ../ui/src/lib/components/input/input-checkbox.svelte
var Er = J("<div><!> <!></div>"), Dr = J("<p> </p>"), Or = J("<div><div class=\"flex items-center gap-2\"><!> <!></div> <!></div>");
function kr(e, r) {
	c(r, !0);
	let i = O(r, "checked", 15, !1), a = O(r, "id", 19, Fe), o = O(r, "inline", 3, !1), s = K(() => Q("peer inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary/15 data-[state=checked]:text-primary", "data-[state=unchecked]:bg-dark-700", r.error ? hr : "border-border data-[state=unchecked]:hover:border-dark-400", Cr, "disabled:cursor-not-allowed disabled:opacity-50"));
	var l = L(), u = h(l), d = (e) => {
		var o = Er(), c = T(o);
		{
			let e = (e, t) => {
				let n = () => t?.().checked;
				var r = L(), i = h(r), a = (e) => {
					Z(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				F(i, (e) => {
					n() && e(a);
				}), j(e, r);
			}, t = K(() => r.label ? `${a()}-label` : void 0), o = K(() => r.error ? !0 : void 0);
			n(c, () => Wt, (n, c) => {
				c(n, {
					get id() {
						return a();
					},
					get "aria-label"() {
						return r["aria-label"];
					},
					get "aria-labelledby"() {
						return p(t);
					},
					get "aria-invalid"() {
						return p(o);
					},
					get class() {
						return p(s);
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
			Tr(e, {
				get id() {
					return `${a() ?? ""}-label`;
				},
				get for() {
					return a();
				},
				class: "cursor-pointer whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, t) => {
					E();
					var n = P();
					x(() => W(n, r.label)), j(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		F(l, (e) => {
			r.label && e(u);
		}), g(o), x((e) => N(o, 1, e), [() => q(Q("flex items-center gap-2", r.class))]), j(e, o);
	}, f = (e) => {
		var o = Or(), c = T(o), l = T(c);
		{
			let e = (e, t) => {
				let n = () => t?.().checked;
				var r = L(), i = h(r), a = (e) => {
					Z(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				F(i, (e) => {
					n() && e(a);
				}), j(e, r);
			}, t = K(() => r.label ? `${a()}-label` : void 0), o = K(() => r.error ? !0 : void 0);
			n(l, () => Wt, (n, c) => {
				c(n, {
					get id() {
						return a();
					},
					get "aria-label"() {
						return r["aria-label"];
					},
					get "aria-labelledby"() {
						return p(t);
					},
					get "aria-invalid"() {
						return p(o);
					},
					get class() {
						return p(s);
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
		var u = t(l, 2), d = (e) => {
			Tr(e, {
				get id() {
					return `${a() ?? ""}-label`;
				},
				get for() {
					return a();
				},
				class: "cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, t) => {
					E();
					var n = P();
					x(() => W(n, r.label)), j(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		F(u, (e) => {
			r.label && e(d);
		}), g(c);
		var f = t(c, 2), m = (e) => {
			var t = Dr(), n = T(t, !0);
			g(t), x(() => {
				N(t, 1, q(br)), W(n, r.error);
			}), j(e, t);
		};
		F(f, (e) => {
			r.error && e(m);
		}), g(o), x((e) => N(o, 1, e), [() => q(Q("grid gap-2", r.class))]), j(e, o);
	};
	F(u, (e) => {
		o() ? e(d) : e(f, -1);
	}), j(e, l), b();
}
//#endregion
//#region ../ui/src/lib/monaco/configure-types.ts
var Ar = {
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
}, jr = "";
async function Mr(e = [], t = {}) {
	if (e.length === 0) return;
	let n = e.map((e) => `${e.filePath ?? ""}\0${e.content}`).join("\0");
	if (!t.force && n === jr) return;
	jr = n;
	let r = (await import("./editor.main-xvnWKxZY.js")).languages.typescript, i = e.map((e) => ({
		content: e.content,
		filePath: e.filePath ?? "file:///project/node_modules/@stream-kit/script-api/index.d.ts"
	}));
	for (let e of [r.typescriptDefaults, r.javascriptDefaults]) e.setCompilerOptions({ ...Ar }), e.setDiagnosticsOptions({
		noSemanticValidation: !1,
		noSyntaxValidation: !1,
		noSuggestionDiagnostics: !1
	}), e.setExtraLibs(i);
}
//#endregion
//#region ../ui/src/lib/monaco/theme.ts
var Nr = {
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
function Pr(e) {
	return new Worker("/plugin-host/assets/editor.worker-aMaeT3Bg.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/css/css.worker.js?worker
function Fr(e) {
	return new Worker("/plugin-host/assets/css.worker-0WoSGFGE.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/html/html.worker.js?worker
function Ir(e) {
	return new Worker("/plugin-host/assets/html.worker-DVhl5K-g.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/json/json.worker.js?worker
function Lr(e) {
	return new Worker("/plugin-host/assets/json.worker-BOHwf62w.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js?worker
function Rr(e) {
	return new Worker("/plugin-host/assets/ts.worker-BptJClIA.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../ui/src/lib/monaco/setup.ts
var zr = !1;
function Br() {
	zr || typeof globalThis > "u" || (zr = !0, globalThis.MonacoEnvironment = { getWorker(e, t) {
		switch (t) {
			case "json": return new Lr();
			case "css":
			case "scss":
			case "less": return new Fr();
			case "html":
			case "handlebars":
			case "razor": return new Ir();
			case "typescript":
			case "javascript": return new Rr();
			default: return new Pr();
		}
	} });
}
//#endregion
//#region ../ui/src/lib/monaco/warmup-typescript.ts
function Vr(e) {
	return e.languages.typescript.getTypeScriptWorker;
}
async function Hr(e, t = 40) {
	let n = Vr(e);
	for (let e = 0; e < t; e++) try {
		await n();
		return;
	} catch {
		await new Promise((e) => requestAnimationFrame(() => e()));
	}
	throw Error("TypeScript not registered after wait");
}
async function Ur(e, t) {
	try {
		await Hr(e), await (await (await Vr(e)())(t.uri)).getSemanticDiagnostics(t.uri.toString());
	} catch (e) {
		console.warn("[monaco] TypeScript warmup failed:", e);
	}
}
//#endregion
//#region ../ui/src/lib/monaco/script-reference.ts
var Wr = "file:///project";
`${Wr}`;
function Gr(e) {
	let t = `${Wr}/`;
	if (!e.startsWith(t)) return "";
	let n = e.slice(t.length).split("/").length - 1;
	return `/// <reference path="${"../".repeat(n)}node_modules/@stream-kit/script-api/index.d.ts" />\n`;
}
function Kr(e, t) {
	let n = Gr(t);
	return !n || e.includes("/// <reference path=") ? e : `${n}${e}`;
}
//#endregion
//#region ../ui/src/lib/components/variable-popover/variable-popover.svelte
var qr = J("<p class=\"text-xs font-semibold text-dark-200\"> </p>"), Jr = J("<p class=\"py-2 text-xs text-dark-400\"> </p>"), Yr = J("<li><button type=\"button\"><div class=\"flex min-w-0 flex-1 items-center gap-2.5\"><span class=\"shrink-0 rounded border border-primary-300 bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary transition-all duration-150 group-hover:border-primary-500/20 group-hover:bg-primary-500/15\"> </span> <span class=\"min-w-0 truncate text-dark-300 transition-colors duration-150 group-hover:text-dark-100\"> </span></div> <div class=\"flex size-4 shrink-0 items-center justify-center\"><!></div></button></li>"), Xr = J("<ul class=\"grid gap-1\"></ul>"), Zr = J("<div class=\"mb-3 flex flex-col gap-2\"><!></div> <!>", 1), Qr = J("<!> <!>", 1);
function $r(n, i) {
	c(i, !0);
	let a = O(i, "title", 3, "Variables"), o = O(i, "emptyLabel", 3, "No variables available."), s = O(i, "ariaLabel", 3, "Show variables"), l = O(i, "copiedLabel", 3, "Copied"), u = O(i, "insertedLabel", 3, "Inserted");
	O(i, "noResultsLabel", 3, "No variables match your search.");
	let d = O(i, "icon", 3, "ri:braces-line"), f = M(null);
	function m(e) {
		if (i.onInsert) {
			i.onInsert(e);
			return;
		}
		navigator.clipboard.writeText(`{${e}}`).then(() => {
			G(f, e, !0), setTimeout(() => {
				p(f) === e && G(f, null);
			}, 2e3);
		});
	}
	Dt(n, {
		children: (n, c) => {
			var _ = Qr(), v = h(_);
			Ot(v, {
				child: (e, t) => {
					At(e, ee(() => t?.().props, {
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
			}), Et(t(v, 2), {
				align: "start",
				class: "w-80 p-4",
				children: (n, s) => {
					var c = Zr(), d = h(c), _ = T(d), v = (e) => {
						var t = qr(), n = T(t, !0);
						g(t), x(() => W(n, a())), j(e, t);
					};
					F(_, (e) => {
						a() && e(v);
					}), g(d);
					var y = t(d, 2), b = (e) => {
						var t = Jr(), n = T(t, !0);
						g(t), x(() => W(n, o())), j(e, t);
					}, S = (n) => {
						kt(n, {
							orientation: "vertical",
							viewportClasses: "max-h-48 overflow-hidden",
							children: (n, a) => {
								var o = Xr();
								r(o, 21, () => i.variables, (e) => e.key, (n, r) => {
									var a = Yr(), o = T(a), s = T(o), c = T(s), d = T(c, !0);
									g(c);
									var h = t(c, 2), _ = T(h, !0);
									g(h), g(s);
									var v = t(s, 2), y = T(v), b = (e) => {
										Z(e, {
											icon: "ri:check-line",
											class: "size-3.5 text-success-400"
										});
									}, S = (e) => {
										{
											let t = K(() => i.onInsert ? "ri:corner-down-left-line" : "ri:file-copy-line");
											Z(e, {
												get icon() {
													return p(t);
												},
												class: "size-3.5 text-dark-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
											});
										}
									};
									F(y, (e) => {
										p(f) === p(r).key ? e(b) : e(S, -1);
									}), g(v), g(o), g(a), x((t) => {
										N(o, 1, t), e(o, "title", i.onInsert ? u() : l()), W(d, `{${p(r).key}}`), W(_, p(r).label);
									}, [() => q(Q("group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-transparent px-2.5 py-2 text-left text-xs transition-all duration-150 hover:border-dark-600/30 hover:bg-dark-700/50"))]), Y("click", o, () => m(p(r).key)), j(n, a);
								}), g(o), j(n, o);
							},
							$$slots: { default: !0 }
						});
					};
					F(y, (e) => {
						i.variables.length === 0 ? e(b) : e(S, -1);
					}), j(n, c);
				},
				$$slots: { default: !0 }
			}), j(n, _);
		},
		$$slots: { default: !0 }
	}), b();
}
ne(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-code.svelte
var ei = J("<span></span>"), ti = J("<div class=\"flex items-center justify-between gap-2\"><!> <div class=\"flex items-center gap-1\"><!> <!> <!></div></div>"), ni = J("<div class=\"flex justify-end\"><!></div>"), ri = J("<div class=\"absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-dark-900/85\" role=\"status\" aria-live=\"polite\"><!> <p class=\"text-xs text-dark-300\"> </p></div>"), ii = J("<p> </p>"), ai = J("<div><!> <!> <div role=\"textbox\" aria-multiline=\"true\"><!></div> <!></div>");
function oi(n, r) {
	c(r, !0);
	let a = O(r, "id", 19, Fe), s = O(r, "value", 3, ""), l = O(r, "language", 3, "typescript"), u = O(r, "minHeight", 3, "12rem"), d = O(r, "fillHeight", 3, !1), f = O(r, "formatOnBlur", 3, !0), m = O(r, "showFormatButton", 3, !0), h = O(r, "formatLabel", 3, "Format"), v = O(r, "showExpandButton", 3, !0), y = O(r, "expandLabel", 3, "Expand"), w = O(r, "collapseLabel", 3, "Close"), D = O(r, "extraLibs", 19, () => []), k = O(r, "loadingLabel", 3, "Loading..."), I = O(r, "variables", 19, () => []), L = O(r, "variablesTitle", 3, "Variables"), R = O(r, "variablesAriaLabel", 3, "Insert variable"), z = M(!1), B = K(() => d() || p(z)), V = M(void 0), H = M(void 0), U = M(void 0), ee = M(!1), J = !1, ne = !1, re = !1, Y = M(""), ie = !1, X;
	function ae() {
		let e = document.createElement("div");
		return e.className = "monaco-editor stream-kit-monaco-overflow-host", document.body.appendChild(e), e;
	}
	function oe() {
		X?.remove(), X = void 0;
	}
	function se(e) {
		return e.map((e) => `${e.filePath ?? ""}\0${e.content}`).join("\0");
	}
	function ce(e) {
		return r.modelUri ? Kr(e, r.modelUri) : e;
	}
	function le(e) {
		return e.replace(/^\/\/\/ <reference path="[^"]+" \/>\r?\n/gm, "");
	}
	function ue(e) {
		r.oninput && r.oninput({ currentTarget: { value: le(e) } });
	}
	function $(e) {
		let t = `{${e}}`;
		if (!p(H) || !p(U)) {
			ue(`${s()}${t}`);
			return;
		}
		let n = p(H).getSelection();
		if (!n) {
			ue(`${s()}${t}`);
			return;
		}
		p(H).executeEdits("insert-variable", [{
			range: n,
			text: t,
			forceMoveMarkers: !0
		}]), p(H).focus();
	}
	async function de(e, t = !1) {
		e.length !== 0 && (await Mr(e, { force: t }), G(Y, se(e), !0));
	}
	function fe(e, t) {
		if (!r.modelUri) return;
		let n = e.Uri.parse(r.modelUri), i = l() === "json" ? "json" : "typescript", a = ce(t), o = e.editor.getModel(n);
		return o ? (o.getValue() !== a && o.setValue(a), ie = !1, o) : (ie = !0, e.editor.createModel(a, i, n));
	}
	async function pe(e, t) {
		if (!(!p(V) || ne || p(ee))) {
			ne = !0;
			try {
				Br();
				let n = await import("./editor.main-xvnWKxZY.js");
				if (J || !p(V)) return;
				G(U, n, !0), p(U).editor.defineTheme("stream-kit-dark", Nr);
				let r = l() === "json" ? "json" : "typescript", i = fe(n, t), a = e.length > 0;
				a && (X = ae()), G(H, p(U).editor.create(p(V), {
					model: i,
					value: i ? void 0 : t,
					language: i ? void 0 : r,
					theme: "stream-kit-dark",
					automaticLayout: !0,
					...a && X ? {
						fixedOverflowWidgets: !0,
						allowOverflow: !0,
						overflowWidgetsDomNode: X
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
					hover: { enabled: !0 },
					parameterHints: { enabled: !0 },
					suggestOnTriggerCharacters: !0,
					quickSuggestions: {
						other: !0,
						comments: !1,
						strings: !1
					},
					quickSuggestionsDelay: 10,
					suggest: {
						showWords: l() === "json",
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
				}), !0), e.length > 0 && await de(e), p(H).onDidChangeModelContent(() => {
					re || !p(H) || ue(p(H).getValue());
				}), f() && p(H).onDidBlurEditorText(() => {
					he();
				}), i && await Ur(n, i), G(ee, !0);
			} finally {
				ne = !1;
			}
		}
	}
	function me(e) {
		if (!p(H)) return;
		let t = p(H).getModel();
		!t || t.getValue() === e || (p(H).pushUndoStop(), p(H).executeEdits("format", [{
			range: t.getFullModelRange(),
			text: e,
			forceMoveMarkers: !0
		}]), p(H).pushUndoStop());
	}
	async function he() {
		if (!p(H)) return;
		let e = p(H).getValue();
		if (le(e).trim() !== "") {
			if (l() === "json") {
				try {
					me(JSON.stringify(JSON.parse(e), null, 2));
				} catch {}
				return;
			}
			try {
				await p(H).getAction("editor.action.formatDocument")?.run();
			} catch {}
		}
	}
	o(() => {
		let e = p(V), t = D(), n = s() ?? "", i = r.modelUri;
		!e || p(ee) || J || i && t.length === 0 || pe(t, n);
	}), o(() => {
		if (!p(H) || !p(ee)) return;
		let e = ce(s() ?? "");
		p(H).getValue() !== e && (re = !0, p(H).pushUndoStop(), p(H).executeEdits("external-sync", [{
			range: p(H).getModel()?.getFullModelRange() ?? {
				startLineNumber: 1,
				startColumn: 1,
				endLineNumber: 1,
				endColumn: 1
			},
			text: e,
			forceMoveMarkers: !0
		}]), p(H).pushUndoStop(), re = !1);
	}), o(() => {
		if (p(z), !p(H)) return;
		let e = requestAnimationFrame(() => p(H)?.layout());
		return () => cancelAnimationFrame(e);
	}), o(() => {
		!p(ee) || !p(H) || !p(U) || D().length === 0 || se(D()) !== p(Y) && de(D()).then(() => {
			let e = p(H)?.getModel();
			p(U) && e && Ur(p(U), e);
		});
	}), C(() => {
		J = !0;
		let e = p(H)?.getModel();
		p(H)?.dispose(), G(H, void 0), G(U, void 0), oe(), ie && e && !e.isDisposed() && e.dispose();
	});
	var ge = ai();
	A("keydown", S, (e) => {
		p(z) && e.key === "Escape" && G(z, !1);
	});
	var _e = T(ge), ve = (e) => {
		var n = ti(), i = T(n), o = (e) => {
			Tr(e, {
				get for() {
					return a();
				},
				children: (e, t) => {
					E();
					var n = P();
					x(() => W(n, r.label)), j(e, n);
				},
				$$slots: { default: !0 }
			});
		}, s = (e) => {
			j(e, ei());
		};
		F(i, (e) => {
			r.label ? e(o) : e(s, -1);
		});
		var c = t(i, 2), l = T(c), u = (e) => {
			At(e, {
				type: "button",
				variant: "ghost",
				size: "xs",
				icon: "ri:magic-line",
				onclick: () => void he(),
				class: "text-dark-400 hover:text-dark-100",
				children: (e, t) => {
					E();
					var n = P();
					x(() => W(n, h())), j(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		F(l, (e) => {
			m() && e(u);
		});
		var d = t(l, 2), f = (e) => {
			{
				let t = K(() => p(z) ? "ri:fullscreen-exit-line" : "ri:fullscreen-line"), n = K(() => p(z) ? w() : y());
				At(e, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					get icon() {
						return p(t);
					},
					get "aria-label"() {
						return p(n);
					},
					onclick: () => G(z, !p(z)),
					class: "size-7 text-dark-400 hover:text-dark-100"
				});
			}
		};
		F(d, (e) => {
			v() && e(f);
		});
		var _ = t(d, 2), b = (e) => {
			$r(e, {
				get variables() {
					return I();
				},
				get title() {
					return L();
				},
				get ariaLabel() {
					return R();
				},
				onInsert: $
			});
		};
		F(_, (e) => {
			I().length > 0 && e(b);
		}), g(c), g(n), j(e, n);
	};
	F(_e, (e) => {
		(r.label || I().length > 0 || m() || v()) && e(ve);
	});
	var ye = t(_e, 2), be = (e) => {
		var t = ni();
		_(T(t), () => r.toolbar), g(t), j(e, t);
	};
	F(ye, (e) => {
		r.toolbar && e(be);
	});
	var xe = t(ye, 2);
	let Se;
	var Ce = T(xe), we = (n) => {
		var r = ri(), i = T(r);
		Z(i, {
			icon: "gg:spinner",
			class: "size-5 animate-spin text-primary",
			"aria-hidden": "true"
		});
		var a = t(i, 2), o = T(a, !0);
		g(a), g(r), x(() => {
			e(r, "aria-label", k()), W(o, k());
		}), j(n, r);
	};
	F(Ce, (e) => {
		p(ee) || e(we);
	}), g(xe), i(xe, (e) => G(V, e), () => p(V));
	var Te = t(xe, 2), Ee = (e) => {
		var t = ii(), n = T(t, !0);
		g(t), x(() => {
			N(t, 1, q(br)), W(n, r.error);
		}), j(e, t);
	};
	F(Te, (e) => {
		r.error && e(Ee);
	}), g(ge), x((t, n) => {
		N(ge, 1, t), e(xe, "id", a()), e(xe, "aria-busy", !p(ee)), e(xe, "aria-invalid", r.error ? !0 : void 0), e(xe, "aria-placeholder", r.placeholder), N(xe, 1, n), Se = te(xe, "", Se, { height: p(B) ? void 0 : u() });
	}, [() => q(Q("relative flex w-full flex-col", p(z) ? "fixed inset-0 z-60 gap-3 bg-dark-900 p-4" : d() ? "h-full min-h-0 flex-1" : "grid gap-2")), () => q(Q("relative z-52 overflow-visible rounded-lg border bg-dark-900 focus-within:ring-2", p(B) ? "flex min-h-0 flex-1 flex-col" : "", r.error ? "border-destructive focus-within:ring-destructive" : "border-border focus-within:ring-ring", r.class))]), j(n, ge), b();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/utils/texts.js
var si = {
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
}, ci = "a[href], area[href], input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
function li(e) {
	return function(t) {
		if (t.target === window) return;
		let n = t.target;
		if (!e.contains(n)) return;
		let r = e.querySelectorAll(ci), i = r[0], a = r[r.length - 1];
		function o(e) {
			return e.code === "Tab" && !e.shiftKey;
		}
		function s(e) {
			return e.code === "Tab" && e.shiftKey;
		}
		o(t) && t.target === a ? (t.preventDefault(), i.focus()) : s(t) && t.target === i && (t.preventDefault(), a.focus());
	};
}
var ui = (e) => {
	let t = e.querySelector(ci);
	t && t.focus();
	let n = li(e);
	return document.addEventListener("keydown", n), { destroy() {
		document.removeEventListener("keydown", n);
	} };
}, di = {
	grad: .9,
	turn: 360,
	rad: 360 / (2 * Math.PI)
}, fi = function(e) {
	return typeof e == "string" ? e.length > 0 : typeof e == "number";
}, pi = function(e, t, n) {
	return t === void 0 && (t = 0), n === void 0 && (n = 10 ** t), Math.round(n * e) / n + 0;
}, mi = function(e, t, n) {
	return t === void 0 && (t = 0), n === void 0 && (n = 1), e > n ? n : e > t ? e : t;
}, hi = function(e) {
	return (e = isFinite(e) ? e % 360 : 0) > 0 ? e : e + 360;
}, gi = function(e) {
	return {
		r: mi(e.r, 0, 255),
		g: mi(e.g, 0, 255),
		b: mi(e.b, 0, 255),
		a: mi(e.a)
	};
}, _i = function(e) {
	return {
		r: pi(e.r),
		g: pi(e.g),
		b: pi(e.b),
		a: pi(e.a, 3)
	};
}, vi = /^#([0-9a-f]{3,8})$/i, yi = function(e) {
	var t = e.toString(16);
	return t.length < 2 ? "0" + t : t;
}, bi = function(e) {
	var t = e.r, n = e.g, r = e.b, i = e.a, a = Math.max(t, n, r), o = a - Math.min(t, n, r), s = o ? a === t ? (n - r) / o : a === n ? 2 + (r - t) / o : 4 + (t - n) / o : 0;
	return {
		h: 60 * (s < 0 ? s + 6 : s),
		s: a ? o / a * 100 : 0,
		v: a / 255 * 100,
		a: i
	};
}, xi = function(e) {
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
}, Si = function(e) {
	return {
		h: hi(e.h),
		s: mi(e.s, 0, 100),
		l: mi(e.l, 0, 100),
		a: mi(e.a)
	};
}, Ci = function(e) {
	return {
		h: pi(e.h),
		s: pi(e.s),
		l: pi(e.l),
		a: pi(e.a, 3)
	};
}, wi = function(e) {
	return xi((n = (t = e).s, {
		h: t.h,
		s: (n *= ((r = t.l) < 50 ? r : 100 - r) / 100) > 0 ? 2 * n / (r + n) * 100 : 0,
		v: r + n,
		a: t.a
	}));
	var t, n, r;
}, Ti = function(e) {
	return {
		h: (t = bi(e)).h,
		s: (i = (200 - (n = t.s)) * (r = t.v) / 100) > 0 && i < 200 ? n * r / 100 / (i <= 100 ? i : 200 - i) * 100 : 0,
		l: i / 2,
		a: t.a
	};
	var t, n, r, i;
}, Ei = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Di = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Oi = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, ki = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Ai = {
	string: [
		[function(e) {
			var t = vi.exec(e);
			return t ? (e = t[1]).length <= 4 ? {
				r: parseInt(e[0] + e[0], 16),
				g: parseInt(e[1] + e[1], 16),
				b: parseInt(e[2] + e[2], 16),
				a: e.length === 4 ? pi(parseInt(e[3] + e[3], 16) / 255, 2) : 1
			} : e.length === 6 || e.length === 8 ? {
				r: parseInt(e.substr(0, 2), 16),
				g: parseInt(e.substr(2, 2), 16),
				b: parseInt(e.substr(4, 2), 16),
				a: e.length === 8 ? pi(parseInt(e.substr(6, 2), 16) / 255, 2) : 1
			} : null : null;
		}, "hex"],
		[function(e) {
			var t = Oi.exec(e) || ki.exec(e);
			return t ? t[2] !== t[4] || t[4] !== t[6] ? null : gi({
				r: Number(t[1]) / (t[2] ? 100 / 255 : 1),
				g: Number(t[3]) / (t[4] ? 100 / 255 : 1),
				b: Number(t[5]) / (t[6] ? 100 / 255 : 1),
				a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1)
			}) : null;
		}, "rgb"],
		[function(e) {
			var t = Ei.exec(e) || Di.exec(e);
			if (!t) return null;
			var n, r;
			return wi(Si({
				h: (n = t[1], r = t[2], r === void 0 && (r = "deg"), Number(n) * (di[r] || 1)),
				s: Number(t[3]),
				l: Number(t[4]),
				a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1)
			}));
		}, "hsl"]
	],
	object: [
		[function(e) {
			var t = e.r, n = e.g, r = e.b, i = e.a, a = i === void 0 ? 1 : i;
			return fi(t) && fi(n) && fi(r) ? gi({
				r: Number(t),
				g: Number(n),
				b: Number(r),
				a: Number(a)
			}) : null;
		}, "rgb"],
		[function(e) {
			var t = e.h, n = e.s, r = e.l, i = e.a, a = i === void 0 ? 1 : i;
			return !fi(t) || !fi(n) || !fi(r) ? null : wi(Si({
				h: Number(t),
				s: Number(n),
				l: Number(r),
				a: Number(a)
			}));
		}, "hsl"],
		[function(e) {
			var t = e.h, n = e.s, r = e.v, i = e.a, a = i === void 0 ? 1 : i;
			return !fi(t) || !fi(n) || !fi(r) ? null : xi(function(e) {
				return {
					h: hi(e.h),
					s: mi(e.s, 0, 100),
					v: mi(e.v, 0, 100),
					a: mi(e.a)
				};
			}({
				h: Number(t),
				s: Number(n),
				v: Number(r),
				a: Number(a)
			}));
		}, "hsv"]
	]
}, ji = function(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n][0](e);
		if (r) return [r, t[n][1]];
	}
	return [null, void 0];
}, Mi = function(e) {
	return typeof e == "string" ? ji(e.trim(), Ai.string) : typeof e == "object" && e ? ji(e, Ai.object) : [null, void 0];
}, Ni = function(e, t) {
	var n = Ti(e);
	return {
		h: n.h,
		s: mi(n.s + 100 * t, 0, 100),
		l: n.l,
		a: n.a
	};
}, Pi = function(e) {
	return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3 / 255;
}, Fi = function(e, t) {
	var n = Ti(e);
	return {
		h: n.h,
		s: n.s,
		l: mi(n.l + 100 * t, 0, 100),
		a: n.a
	};
}, Ii = function() {
	function e(e) {
		this.parsed = Mi(e)[0], this.rgba = this.parsed || {
			r: 0,
			g: 0,
			b: 0,
			a: 1
		};
	}
	return e.prototype.isValid = function() {
		return this.parsed !== null;
	}, e.prototype.brightness = function() {
		return pi(Pi(this.rgba), 2);
	}, e.prototype.isDark = function() {
		return Pi(this.rgba) < .5;
	}, e.prototype.isLight = function() {
		return Pi(this.rgba) >= .5;
	}, e.prototype.toHex = function() {
		return e = _i(this.rgba), t = e.r, n = e.g, r = e.b, a = (i = e.a) < 1 ? yi(pi(255 * i)) : "", "#" + yi(t) + yi(n) + yi(r) + a;
		var e, t, n, r, i, a;
	}, e.prototype.toRgb = function() {
		return _i(this.rgba);
	}, e.prototype.toRgbString = function() {
		return e = _i(this.rgba), t = e.r, n = e.g, r = e.b, (i = e.a) < 1 ? "rgba(" + t + ", " + n + ", " + r + ", " + i + ")" : "rgb(" + t + ", " + n + ", " + r + ")";
		var e, t, n, r, i;
	}, e.prototype.toHsl = function() {
		return Ci(Ti(this.rgba));
	}, e.prototype.toHslString = function() {
		return e = Ci(Ti(this.rgba)), t = e.h, n = e.s, r = e.l, (i = e.a) < 1 ? "hsla(" + t + ", " + n + "%, " + r + "%, " + i + ")" : "hsl(" + t + ", " + n + "%, " + r + "%)";
		var e, t, n, r, i;
	}, e.prototype.toHsv = function() {
		return e = bi(this.rgba), {
			h: pi(e.h),
			s: pi(e.s),
			v: pi(e.v),
			a: pi(e.a, 3)
		};
		var e;
	}, e.prototype.invert = function() {
		return Li({
			r: 255 - (e = this.rgba).r,
			g: 255 - e.g,
			b: 255 - e.b,
			a: e.a
		});
		var e;
	}, e.prototype.saturate = function(e) {
		return e === void 0 && (e = .1), Li(Ni(this.rgba, e));
	}, e.prototype.desaturate = function(e) {
		return e === void 0 && (e = .1), Li(Ni(this.rgba, -e));
	}, e.prototype.grayscale = function() {
		return Li(Ni(this.rgba, -1));
	}, e.prototype.lighten = function(e) {
		return e === void 0 && (e = .1), Li(Fi(this.rgba, e));
	}, e.prototype.darken = function(e) {
		return e === void 0 && (e = .1), Li(Fi(this.rgba, -e));
	}, e.prototype.rotate = function(e) {
		return e === void 0 && (e = 15), this.hue(this.hue() + e);
	}, e.prototype.alpha = function(e) {
		return typeof e == "number" ? Li({
			r: (t = this.rgba).r,
			g: t.g,
			b: t.b,
			a: e
		}) : pi(this.rgba.a, 3);
		var t;
	}, e.prototype.hue = function(e) {
		var t = Ti(this.rgba);
		return typeof e == "number" ? Li({
			h: e,
			s: t.s,
			l: t.l,
			a: t.a
		}) : pi(t.h);
	}, e.prototype.isEqual = function(e) {
		return this.toHex() === Li(e).toHex();
	}, e;
}(), Li = function(e) {
	return e instanceof Ii ? e : new Ii(e);
}, Ri = J("<input type=\"hidden\"/>"), zi = J("<div role=\"slider\" tabindex=\"0\"><div class=\"track svelte-1liqhfd\"></div> <div class=\"thumb svelte-1liqhfd\"></div></div> <!>", 1), Bi = {
	hash: "svelte-1liqhfd",
	code: ".slider.svelte-1liqhfd {---track-width: var(--track-width, unset);---track-height: var(--track-height, 6px);---track-background: var(--track-background, #949494);---track-border: var(--track-border, none);---thumb-size: var(--thumb-size, 16px);---thumb-background: var(--thumb-background, #2d2d2d);---thumb-border: var(--thumb-border, none);---position: var(--position, 0px);---margin-inline-thumb-bigger: max(var(---thumb-size) - var(---track-height), 0px);---margin-inline-thumb-smaller: max(var(---track-height) - var(---thumb-size), 0px);position:relative;margin:auto;user-select:none;-webkit-user-select:none;background-color:transparent;cursor:pointer;}.slider.svelte-1liqhfd::before {background-color:transparent;}[aria-orientation='horizontal'].svelte-1liqhfd {width:var(---track-width);max-width:calc(100% - 2 * var(---margin-inline-thumb-bigger));height:calc(max(var(---track-height), var(---thumb-size)) + 4px);height:max(var(---track-height), var(---thumb-size));margin-inline:var(---margin-inline-thumb-bigger);margin-block:var(--margin-block, 8px);}[aria-orientation='vertical'].svelte-1liqhfd {width:max(var(---track-height), var(---thumb-size));height:var(---track-width);max-height:calc(100% - 2 * var(---margin-inline-thumb-bigger));margin-block:var(---margin-inline-thumb-bigger);margin-inline:var(--margin-block, 8px);}.track.svelte-1liqhfd {position:absolute;pointer-events:none;background:var(---track-background);border:var(---track-border);border-radius:calc(var(---track-height) / 2);box-sizing:border-box;}[aria-orientation='horizontal'].svelte-1liqhfd .track:where(.svelte-1liqhfd) {height:var(---track-height);top:50%;transform:translateY(-50%);left:0;right:0;}[aria-orientation='vertical'].svelte-1liqhfd .track:where(.svelte-1liqhfd) {width:var(---track-height);left:50%;transform:translateX(-50%);top:0;bottom:0;}.thumb.svelte-1liqhfd {pointer-events:none;position:absolute;height:var(---thumb-size);width:var(---thumb-size);border-radius:calc(var(---thumb-size) / 2);background:var(---thumb-background);border:var(---thumb-border);box-sizing:border-box;transform:translate(-50%, -50%);--margin-left: (2 * var(---track-height) - var(---thumb-size) - var(---margin-inline-thumb-smaller)) / 2;--left: calc(var(---position) * (100% - 2 * var(--margin-left)) + var(--margin-left));}[aria-orientation='horizontal'].svelte-1liqhfd:not(.reverse) .thumb:where(.svelte-1liqhfd) {top:50%;left:var(--left);}[aria-orientation='vertical'].svelte-1liqhfd:not(.reverse) .thumb:where(.svelte-1liqhfd) {left:50%;bottom:calc(var(--left) - var(---thumb-size));}[aria-orientation='horizontal'].reverse.svelte-1liqhfd .thumb:where(.svelte-1liqhfd) {top:50%;right:calc(var(--left) - var(---thumb-size));}[aria-orientation='vertical'].reverse.svelte-1liqhfd .thumb:where(.svelte-1liqhfd) {left:50%;top:calc(var(--left));}.slider.svelte-1liqhfd:focus-visible {outline:none;}.slider.svelte-1liqhfd:focus-visible .track:where(.svelte-1liqhfd) {outline:2px solid var(--focus-color, red);outline-offset:2px;}"
};
function Vi(n, r) {
	c(r, !0), D(n, Bi);
	let a = O(r, "min", 3, 0), o = O(r, "max", 3, 100), s = O(r, "step", 3, 1), l = O(r, "value", 15, 50), u = O(r, "ariaValueText", 3, (e) => e.toString()), d = O(r, "direction", 3, "horizontal"), f = O(r, "reverse", 3, !1), g = O(r, "keyboardOnly", 3, !1), _ = O(r, "slider", 7), v = O(r, "isDragging", 7, !1), y = K(() => typeof a() == "string" ? parseFloat(a()) : a()), C = K(() => typeof o() == "string" ? parseFloat(o()) : o()), w = K(() => typeof s() == "string" ? parseFloat(s()) : s());
	function T(e) {
		let t = 1 / p(w), n = Math.round(e * t) / t;
		return Math.max(p(y), Math.min(p(C), n));
	}
	function E(e) {
		let t = e.shiftKey ? p(w) * 10 : p(w);
		e.key === "ArrowUp" || e.key === "ArrowRight" ? (l(l() + t), e.preventDefault()) : e.key === "ArrowDown" || e.key === "ArrowLeft" ? (l(l() - t), e.preventDefault()) : e.key === "Home" ? (l(p(y)), e.preventDefault()) : e.key === "End" ? (l(p(C)), e.preventDefault()) : e.key === "PageUp" ? (l(l() + p(w) * 10), e.preventDefault()) : e.key === "PageDown" && (l(l() - p(w) * 10), e.preventDefault()), l(T(l())), r.onInput?.(l());
	}
	let M = {
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
	function P(e) {
		let t = _()?.[M[d()].clientSize] || 120, n = _()?.getBoundingClientRect()[M[d()].offset] || 0, i = e[M[d()].client] - n;
		d() === "vertical" && (i = -1 * i + t), f() ? l(p(C) - i / t * (p(C) - p(y))) : l(i / t * (p(C) - p(y)) + p(y)), l(T(l())), r.onInput?.(l());
	}
	function I(e) {
		P(e), v(!0);
	}
	function L(e) {
		v() && P(e);
	}
	function R() {
		v(!1);
	}
	function z(e) {
		e.preventDefault(), P({
			clientX: e.changedTouches[0].clientX,
			clientY: e.changedTouches[0].clientY
		});
	}
	let B = K(() => ((l() - p(y)) / (p(C) - p(y)) * 1).toFixed(4));
	var V = zi();
	A("mousemove", S, L), A("mouseup", S, R);
	var H = h(V);
	let U, W;
	i(H, (e) => _(e), () => _());
	var G = t(H, 2), q = (t) => {
		var n = Ri();
		m(n), x(() => {
			e(n, "name", r.name), k(n, l());
		}), j(t, n);
	};
	F(G, (e) => {
		r.name && e(q);
	}), x((t) => {
		U = N(H, 1, "slider svelte-1liqhfd", null, U, { reverse: f() }), e(H, "aria-orientation", d()), e(H, "aria-valuemax", p(C)), e(H, "aria-valuemin", p(y)), e(H, "aria-valuenow", l()), e(H, "aria-valuetext", t), e(H, "aria-label", r.ariaLabel), e(H, "aria-labelledby", r.ariaLabelledBy), e(H, "aria-controls", r.ariaControls), W = te(H, "", W, { "--position": p(B) });
	}, [() => u()(l())]), Y("keydown", H, E), Y("mousedown", H, function(...e) {
		(g() ? void 0 : I)?.apply(this, e);
	}), Y("touchstart", H, function(...e) {
		(g() ? void 0 : z)?.apply(this, e);
	}, void 0, !0), Y("touchmove", H, function(...e) {
		(g() ? void 0 : z)?.apply(this, e);
	}, void 0, !0), Y("touchend", H, function(...e) {
		(g() ? void 0 : z)?.apply(this, e);
	}), j(n, V), b();
}
ne([
	"keydown",
	"mousedown",
	"touchstart",
	"touchmove",
	"touchend"
]);
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/Picker.svelte
var Hi = J("<div class=\"picker svelte-uaq9ej\"><!> <div class=\"s svelte-uaq9ej\"><!></div> <div class=\"v svelte-uaq9ej\"><!></div></div>"), Ui = {
	hash: "svelte-uaq9ej",
	code: ".picker.svelte-uaq9ej {position:relative;display:inline-block;width:var(--picker-width, 200px);height:var(--picker-height, 200px);background:linear-gradient(#ffffff00, #000000ff), linear-gradient(0.25turn, #ffffffff, #00000000), var(--picker-color-bg);border-radius:var(--picker-radius, 8px);outline:none;user-select:none;cursor:pointer;}.s.svelte-uaq9ej,\n	.v.svelte-uaq9ej {position:absolute;--track-background: none;--track-border: none;--thumb-background: none;--thumb-border: none;--thumb-size: 2px;--margin-block: 0;--track-height: var(--picker-indicator-size, 10px);user-select:none;-webkit-user-select:none;}.s.svelte-uaq9ej {top:calc(var(--pos-y) * (var(--picker-height, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);left:2px;--track-width: calc(var(--picker-width, 200px) - 4px);}.v.svelte-uaq9ej {top:2px;left:calc(var(--pos-x) * (var(--picker-width, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);--track-width: calc(var(--picker-height, 200px) - 4px);}"
};
function Wi(e, r) {
	c(r, !0), D(e, Ui);
	let a = O(r, "s", 15), s = O(r, "v", 15), l = M(void 0), u = !1, d = M(H({
		x: 100,
		y: 0
	})), f = K(() => Li({
		h: r.h,
		s: 100,
		v: 100,
		a: 1
	}).toHex());
	function m(e, t, n) {
		return Math.min(Math.max(t, e), n);
	}
	function h(e) {
		if (!p(l)) return;
		let { width: t, left: n, height: r, top: i } = p(l).getBoundingClientRect(), o = {
			x: m(e.clientX - n, 0, t),
			y: m(e.clientY - i, 0, r)
		};
		a(m(o.x / t, 0, 1) * 100), s(m((r - o.y) / r, 0, 1) * 100), w();
	}
	function _(e) {
		e.preventDefault(), e.button === 0 && (u = !0, h(e));
	}
	function v() {
		u = !1;
	}
	function y(e) {
		u && h(e);
	}
	function C(e) {
		e.preventDefault(), h(e.changedTouches[0]);
	}
	o(() => {
		typeof a() == "number" && typeof s() == "number" && p(l) && G(d, {
			x: a(),
			y: 100 - s()
		}, !0);
	});
	function w(e = {}) {
		r.onInput({
			s: a(),
			v: s(),
			...e
		});
	}
	var E = Hi();
	A("mouseup", S, v), A("mousemove", S, y);
	let k;
	var N = T(E);
	n(N, () => r.components.pickerIndicator, (e, t) => {
		t(e, {
			get pos() {
				return p(d);
			},
			get isDark() {
				return r.isDark;
			}
		});
	});
	var P = t(N, 2);
	let F;
	Vi(T(P), {
		get value() {
			return a();
		},
		onInput: (e) => w({ s: e }),
		keyboardOnly: !0,
		ariaValueText: (e) => `${e}%`,
		get ariaLabel() {
			return r.texts.label.s;
		}
	}), g(P);
	var I = t(P, 2);
	let L;
	Vi(T(I), {
		get value() {
			return s();
		},
		onInput: (e) => w({ v: e }),
		keyboardOnly: !0,
		ariaValueText: (e) => `${e}%`,
		direction: "vertical",
		get ariaLabel() {
			return r.texts.label.v;
		}
	}), g(I), g(E), i(E, (e) => G(l, e), () => p(l)), x(() => {
		k = te(E, "", k, { "--picker-color-bg": p(f) }), F = te(P, "", F, { "--pos-y": p(d).y }), L = te(I, "", L, { "--pos-x": p(d).x });
	}), Y("mousedown", E, _), Y("touchstart", E, C, void 0, !0), Y("touchmove", E, C, void 0, !0), Y("touchend", E, C), j(e, E), b();
}
ne([
	"mousedown",
	"touchstart",
	"touchmove",
	"touchend"
]);
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/variant/default/Input.svelte
var Gi = J("<label class=\"svelte-1v9snvp\"><div class=\"container svelte-1v9snvp\"><input type=\"color\" aria-haspopup=\"dialog\" class=\"svelte-1v9snvp\"/> <div class=\"alpha svelte-1v9snvp\"></div> <div class=\"color svelte-1v9snvp\"></div></div> </label>"), Ki = {
	hash: "svelte-1v9snvp",
	code: "label.svelte-1v9snvp {display:inline-flex;align-items:center;gap:8px;cursor:pointer;border-radius:3px;margin:4px;height:var(--input-size, 25px);user-select:none;}.container.svelte-1v9snvp {position:relative;display:block;display:flex;align-items:center;justify-content:center;width:var(--input-size, 25px);}input.svelte-1v9snvp {margin:0;padding:0;border:none;width:1px;height:1px;flex-shrink:0;opacity:0;}.alpha.svelte-1v9snvp {clip-path:circle(50%);background:var(--alpha-grid-bg);}.alpha.svelte-1v9snvp,\n	.color.svelte-1v9snvp {position:absolute;width:var(--input-size, 25px);height:var(--input-size, 25px);border-radius:50%;user-select:none;}.alpha.svelte-1v9snvp {width:calc(var(--input-size, 25px) - 2px);height:calc(var(--input-size, 25px) - 2px);}input.svelte-1v9snvp:focus-visible ~ .color:where(.svelte-1v9snvp) {outline:2px solid var(--focus-color, red);outline-offset:2px;}"
};
function qi(n, r) {
	c(r, !0), D(n, Ki);
	let a = O(r, "labelElement", 15), o = O(r, "name", 3, void 0);
	function s(e) {
		e.preventDefault();
	}
	var l = Gi(), u = T(l), d = T(u);
	m(d);
	var f = t(d, 4);
	let p;
	g(u);
	var h = t(u);
	g(l), i(l, (e) => a(e), () => a()), x(() => {
		e(l, "dir", r.dir), e(d, "name", o()), k(d, r.hex), p = te(f, "", p, { background: r.hex }), W(h, ` ${r.label ?? ""}`), l.dir = l.dir;
	}), Y("click", l, s), Y("mousedown", l, s), Y("click", d, s), Y("mousedown", d, s), j(n, l), b();
}
ne(["click", "mousedown"]);
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/variant/default/NullabilityCheckbox.svelte
var Ji = J("<label class=\"nullability-checkbox svelte-1c6qol9\"><div class=\"svelte-1c6qol9\"><input type=\"checkbox\" class=\"svelte-1c6qol9\"/> <span class=\"svelte-1c6qol9\"></span></div> </label>"), Yi = {
	hash: "svelte-1c6qol9",
	code: "label.svelte-1c6qol9 {display:flex;justify-content:center;margin-bottom:4px;grid-area:nullable;user-select:none;}input.svelte-1c6qol9 {margin:0;}input.svelte-1c6qol9:focus-visible {outline:none;}input.svelte-1c6qol9:focus-visible + span:where(.svelte-1c6qol9) {width:14px;height:14px;border-radius:2px;outline:2px solid var(--focus-color, red);outline-offset:2px;}div.svelte-1c6qol9 {width:32px;aspect-ratio:2;position:relative;}div.svelte-1c6qol9 :where(.svelte-1c6qol9) {position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);}"
};
function Xi(e, n) {
	c(n, !0), D(e, Yi);
	let r = O(n, "isUndefined", 15);
	var i = Ji(), a = T(i), o = T(a);
	m(o), E(2), g(a);
	var l = t(a);
	g(i), x(() => W(l, ` ${n.texts.label.withoutColor ?? ""}`)), s(o, r), j(e, i), b();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/variant/default/PickerIndicator.svelte
var Zi = J("<div class=\"picker-indicator svelte-1ueiphq\"></div>"), Qi = {
	hash: "svelte-1ueiphq",
	code: "div.svelte-1ueiphq {position:absolute;left:calc(var(--pos-x) * (var(--picker-width, 200px) - 2px) / 100 - var(--picker-indicator-size, 10px) / 2 + 1px);top:calc(var(--pos-y) * (var(--picker-height, 200px) - 2px) / 100 - var(--picker-indicator-size, 10px) / 2 + 1px);width:var(--picker-indicator-size, 10px);height:var(--picker-indicator-size, 10px);background-color:white;box-shadow:0 0 4px black;border-radius:50%;pointer-events:none;z-index:1;transition:box-shadow 0.2s;}"
};
function $i(e, t) {
	c(t, !0), D(e, Qi);
	var n = Zi();
	let r;
	x(() => r = te(n, "", r, {
		"--pos-x": t.pos.x,
		"--pos-y": t.pos.y
	})), j(e, n), b();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/variant/default/Swatches.svelte
var ea = J("<button type=\"button\" class=\"swatch svelte-992gtx\"></button>"), ta = J("<div class=\"swatches svelte-992gtx\"></div>"), na = {
	hash: "svelte-992gtx",
	code: ".swatches.svelte-992gtx {display:grid;grid-template-columns:var(--cp-swatch-grid-template-columns, repeat(auto-fit, minmax(24px, 1fr)));gap:8px;width:100%;height:100%;margin-top:8px;margin-bottom:8px;}.swatch.svelte-992gtx {cursor:pointer;margin:0;padding:0;border:none;width:100%;aspect-ratio:1 / 1;height:auto;display:block;}.swatch.svelte-992gtx:focus {outline:2px solid var(--focus-color, red);outline-offset:2px;}"
};
function ra(t, n) {
	c(n, !0), D(t, na);
	var i = L(), a = h(i), o = (t) => {
		var i = ta();
		r(i, 20, () => n.swatches, (e) => e, (t, r) => {
			var i = ea();
			x((t) => {
				te(i, `background: ${r ?? ""}`), e(i, "aria-label", t);
			}, [() => n.texts.swatch.ariaLabel(r)]), Y("click", i, () => n.selectSwatch(r)), j(t, i);
		}), g(i), x(() => e(i, "aria-label", n.texts.swatch.ariaTitle)), j(t, i);
	};
	F(a, (e) => {
		n.swatches && e(o);
	}), j(t, i), b();
}
ne(["click"]);
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/variant/default/TextInput.svelte
var ia = J("<input class=\"svelte-g47n3c\"/>"), aa = J("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-g47n3c\"/> <input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-g47n3c\"/> <input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-g47n3c\"/>", 1), oa = J("<input type=\"number\" min=\"0\" max=\"360\" class=\"svelte-g47n3c\"/> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-g47n3c\"/> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-g47n3c\"/>", 1), sa = J("<input type=\"number\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-g47n3c\"/>"), ca = J("<button type=\"button\" class=\"svelte-g47n3c\"><span class=\"disappear svelte-g47n3c\" aria-hidden=\"true\"> </span> <span class=\"appear svelte-g47n3c\"> </span></button>"), la = J("<div class=\"button-like svelte-g47n3c\"> </div>"), ua = J("<div class=\"text-input svelte-g47n3c\"><div class=\"input-container svelte-g47n3c\"><!> <!></div> <!></div>"), da = {
	hash: "svelte-g47n3c",
	code: ".text-input.svelte-g47n3c {margin:var(--text-input-margin, 5px 0 0);}.input-container.svelte-g47n3c {display:flex;flex:1;gap:10px;}input.svelte-g47n3c,\n	button.svelte-g47n3c,\n	.button-like.svelte-g47n3c {flex:1;border:none;background-color:var(--cp-input-color, #eee);color:var(--cp-text-color, var(--cp-border-color));padding:0;border-radius:5px;height:30px;line-height:30px;text-align:center;}input.svelte-g47n3c {width:5px;font-family:inherit;}button.svelte-g47n3c,\n	.button-like.svelte-g47n3c {position:relative;flex:1;margin:8px 0 0;height:30px;width:100%;transition:background-color 0.2s;cursor:pointer;font-family:inherit;}.button-like.svelte-g47n3c {cursor:default;}.appear.svelte-g47n3c,\n	.disappear.svelte-g47n3c {position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);width:100%;transition:all 0.5s;}button.svelte-g47n3c:hover .disappear:where(.svelte-g47n3c),\n	.appear.svelte-g47n3c {opacity:0;}.disappear.svelte-g47n3c,\n	button.svelte-g47n3c:hover .appear:where(.svelte-g47n3c) {opacity:1;}button.svelte-g47n3c:hover {background-color:var(--cp-button-hover-color, #ccc);}input.svelte-g47n3c:focus,\n	button.svelte-g47n3c:focus {outline:none;}input.svelte-g47n3c:focus-visible,\n	button.svelte-g47n3c:focus-visible {outline:2px solid var(--focus-color, red);outline-offset:2px;}"
};
function fa(n, r) {
	c(r, !0), D(n, da);
	let i = O(r, "rgb", 15), a = O(r, "hsv", 15), o = O(r, "hex", 15), s = /^#?([A-F0-9]{6}|[A-F0-9]{8})$/i, l = K(() => r.textInputModes[0] || "hex"), u = K(() => r.textInputModes[(r.textInputModes.indexOf(p(l)) + 1) % r.textInputModes.length]), d = K(() => Math.round(a().h)), f = K(() => Math.round(a().s)), _ = K(() => Math.round(a().v)), v = K(() => a().a === void 0 ? 1 : Math.round(a().a * 100) / 100);
	function y(e) {
		let t = e.target;
		s.test(t.value) && (o(t.value), r.onInput({ hex: o() }));
	}
	function S(e) {
		return function(t) {
			let n = parseFloat(t.target.value);
			i({
				...i(),
				[e]: isNaN(n) ? 0 : n
			}), r.onInput({ rgb: i() });
		};
	}
	function C(e) {
		return function(t) {
			let n = parseFloat(t.target.value);
			a({
				...a(),
				[e]: isNaN(n) ? 0 : n
			}), r.onInput({ hsv: a() });
		};
	}
	var w = ua(), E = T(w), A = T(E), M = (t) => {
		var n = ia();
		m(n), te(n, "", {}, { flex: 3 }), x(() => {
			e(n, "aria-label", r.texts.label.hex), k(n, o());
		}), Y("input", n, y), j(t, n);
	}, N = (n) => {
		var a = aa(), o = h(a);
		m(o);
		var s = K(() => S("r")), c = t(o, 2);
		m(c);
		var l = K(() => S("g")), u = t(c, 2);
		m(u);
		var d = K(() => S("b"));
		x(() => {
			e(o, "aria-label", r.texts.label.r), k(o, i().r), e(c, "aria-label", r.texts.label.g), k(c, i().g), e(u, "aria-label", r.texts.label.b), k(u, i().b);
		}), Y("input", o, function(...e) {
			p(s)?.apply(this, e);
		}), Y("input", c, function(...e) {
			p(l)?.apply(this, e);
		}), Y("input", u, function(...e) {
			p(d)?.apply(this, e);
		}), j(n, a);
	}, P = (n) => {
		var i = oa(), a = h(i);
		m(a);
		var o = K(() => C("h")), s = t(a, 2);
		m(s);
		var c = K(() => C("s")), l = t(s, 2);
		m(l);
		var u = K(() => C("v"));
		x(() => {
			e(a, "aria-label", r.texts.label.h), k(a, p(d)), e(s, "aria-label", r.texts.label.s), k(s, p(f)), e(l, "aria-label", r.texts.label.v), k(l, p(_));
		}), Y("input", a, function(...e) {
			p(o)?.apply(this, e);
		}), Y("input", s, function(...e) {
			p(c)?.apply(this, e);
		}), Y("input", l, function(...e) {
			p(u)?.apply(this, e);
		}), j(n, i);
	};
	F(A, (e) => {
		p(l) === "hex" ? e(M) : p(l) === "rgb" ? e(N, 1) : e(P, -1);
	});
	var I = t(A, 2), L = (t) => {
		var n = sa();
		m(n);
		var i = K(() => p(l) === "hsv" ? C("a") : S("a"));
		x(() => {
			e(n, "aria-label", r.texts.label.a), k(n, p(v));
		}), Y("input", n, function(...e) {
			p(i)?.apply(this, e);
		}), j(t, n);
	};
	F(I, (e) => {
		r.isAlpha && e(L);
	}), g(E);
	var R = t(E, 2), z = (e) => {
		var n = ca(), i = T(n), a = T(i, !0);
		g(i);
		var o = t(i, 2), s = T(o);
		g(o), g(n), x(() => {
			W(a, r.texts.color[p(l)]), W(s, `${r.texts.changeTo ?? ""} ${r.texts.color[p(u)] ?? ""}`);
		}), Y("click", n, () => G(l, p(u))), j(e, n);
	}, B = (e) => {
		var t = la(), n = T(t, !0);
		g(t), x(() => W(n, r.texts.color[p(l)])), j(e, t);
	};
	F(R, (e) => {
		r.textInputModes.length > 1 ? e(z) : e(B, -1);
	}), g(w), j(n, w), b();
}
ne(["input", "click"]);
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/variant/default/Wrapper.svelte
var pa = J("<div aria-label=\"color picker\"><!></div>"), ma = {
	hash: "svelte-aokvdq",
	code: "div.svelte-aokvdq {padding:8px;background-color:var(--cp-bg-color, white);margin:0 10px 10px;border:1px solid var(--cp-border-color, black);border-radius:12px;display:none;width:max-content;}.is-open.svelte-aokvdq {display:inline-block;}[role='dialog'].svelte-aokvdq {position:absolute;top:calc(var(--input-size, 25px) + 12px);left:0;z-index:var(--picker-z-index, 2);}"
};
function ha(t, n) {
	c(n, !0), D(t, ma);
	let r = O(n, "wrapper", 15);
	var a = pa();
	let o;
	_(T(a), () => n.children), g(a), i(a, (e) => r(e), () => r()), x(() => {
		o = N(a, 1, "wrapper svelte-aokvdq", null, o, { "is-open": n.isOpen }), e(a, "role", n.isDialog ? "dialog" : void 0);
	}), j(t, a), b();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/ColorPicker.svelte
var ga = J("<input type=\"hidden\"/>"), _a = J("<div class=\"a svelte-11gfb7g\"><!></div>"), va = J("<!> <!> <div class=\"h svelte-11gfb7g\"><!></div> <!> <!> <!> <!>", 1), ya = J("<span><!> <!></span>"), ba = {
	hash: "svelte-11gfb7g",
	code: "span.svelte-11gfb7g {position:relative;color:var(--cp-text-color, var(--cp-border-color));--alpha-grid-bg:\n			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 0 0 / 10px 10px,\n			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 5px 5px / 10px 10px;}.h.svelte-11gfb7g,\n	.a.svelte-11gfb7g {display:inline-flex;justify-content:center;--track-height: var(--slider-width, 10px);--track-width: var(--picker-height, 200px);--track-border: none;--thumb-size: calc(var(--slider-width, 10px) - 3px);--thumb-background: white;--thumb-border: 1px solid black;--margin-block: 0;--gradient-direction: 0.5turn;}.horizontal.svelte-11gfb7g .h:where(.svelte-11gfb7g),\n	.horizontal.svelte-11gfb7g .a:where(.svelte-11gfb7g) {--track-width: calc(var(--picker-width, 200px) - 12px);--gradient-direction: 0.25turn;margin:4px 6px;}.horizontal.svelte-11gfb7g .h:where(.svelte-11gfb7g) {margin-top:8px;}.vertical.svelte-11gfb7g .h:where(.svelte-11gfb7g),\n	.vertical.svelte-11gfb7g .a:where(.svelte-11gfb7g) {margin-left:3px;}.h.svelte-11gfb7g {grid-area:hue;--gradient-hue:\n			#ff1500fb, #ffff00 17.2%, #ffff00 18.2%, #00ff00 33.3%, #00ffff 49.5%, #00ffff 51.5%, #0000ff 67.7%,\n			#ff00ff 83.3%, #ff0000;--track-background: linear-gradient(var(--gradient-direction), var(--gradient-hue));}.a.svelte-11gfb7g {grid-area:alpha;margin-top:2px;\n\n		/* redefine css variable as it may not be available in case of a portal */--alpha-grid-bg:\n			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 0 0 / 10px 10px,\n			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 5px 5px / 10px 10px;--track-background:\n			linear-gradient(var(--gradient-direction), rgba(0, 0, 0, 0), var(--alphaless-color)), var(--alpha-grid-bg);}span.svelte-11gfb7g .sr-only {position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0;}"
};
function xa(r, a) {
	c(a, !0), D(r, ba);
	let s = O(a, "components", 19, () => ({})), u = O(a, "label", 3, "Choose a color"), f = O(a, "name", 3, void 0), _ = O(a, "nullable", 3, !1), y = O(a, "rgb", 31, () => H(_() ? null : {
		r: 255,
		g: 0,
		b: 0,
		a: 1
	})), C = O(a, "hsv", 31, () => H(_() ? null : {
		h: 0,
		s: 100,
		v: 100,
		a: 1
	})), w = O(a, "hex", 31, () => H(_() ? null : "#ff0000")), E = O(a, "color", 15, null), P = O(a, "isDark", 15, !1), I = O(a, "isAlpha", 3, !0), R = O(a, "isDialog", 3, !0), z = O(a, "isOpen", 31, () => !R()), B = O(a, "position", 3, "responsive"), V = O(a, "dir", 3, "ltr"), U = O(a, "isTextInput", 3, !0), W = O(a, "textInputModes", 19, () => [
		"hex",
		"rgb",
		"hsv"
	]), q = O(a, "sliderDirection", 3, "vertical"), ee = O(a, "disableCloseClickOutside", 3, !1), J = O(a, "a11yColors", 19, () => [{ bgHex: "#ffffff" }]), ne = O(a, "a11yLevel", 3, "AA"), re = O(a, "texts", 3, void 0), Y = O(a, "a11yTexts", 3, void 0), ie = M(H({
		r: 255,
		g: 0,
		b: 0,
		a: 1
	})), X = M(H({
		h: 0,
		s: 100,
		v: 100,
		a: 1
	})), ae = M("#ff0000"), oe = M(!1), se = M(H(p(oe))), ce = M(void 0), le = M(void 0), Z = M(void 0), Q, ue = M(1080), $ = M(720), de = {
		pickerIndicator: $i,
		textInput: fa,
		input: qi,
		nullabilityCheckbox: Xi,
		wrapper: ha
	};
	function fe() {
		return {
			...de,
			...s()
		};
	}
	function pe() {
		return {
			label: {
				...si.label,
				...re()?.label
			},
			color: {
				...si.color,
				...re()?.color
			},
			changeTo: re()?.changeTo ?? si.changeTo,
			swatch: {
				...re()?.swatch,
				...si.swatch
			}
		};
	}
	function me({ target: e }) {
		R() && (p(le)?.contains(e) || p(le)?.isSameNode(e) ? z(!z()) : z() && !p(Z)?.contains(e) && !ee() && z(!1));
	}
	function he({ key: e, target: t }) {
		!R() || !p(le) || !p(ce) || (e === "Enter" && p(le).contains(t) ? (z(!z()), setTimeout(() => {
			p(Z) && (Q = ui(p(Z)));
		})) : e === "Escape" && z() && (z(!1), p(ce).contains(t) && (p(le)?.focus(), Q?.destroy())));
	}
	function ge(e) {
		w(e), C(Li(e).toHsv()), y(Li(e).toRgb()), G(se, !1), G(oe, !1), ve();
	}
	function _e() {
		return !(C() && y() && C().h === p(X).h && C().s === p(X).s && C().v === p(X).v && C().a === p(X).a && y().r === p(ie).r && y().g === p(ie).g && y().b === p(ie).b && y().a === p(ie).a && w() === p(ae));
	}
	function ve() {
		if (p(oe) && !p(se)) {
			G(se, !0), C(null), y(null), w(null), a.onInput?.({
				color: E(),
				hsv: C(),
				rgb: y(),
				hex: w()
			});
			return;
		} else if (p(se) && !p(oe)) {
			G(se, !1), C(l(p(X))), y(l(p(ie))), w(l(p(ae))), a.onInput?.({
				color: E(),
				hsv: C(),
				rgb: y(),
				hex: w()
			});
			return;
		} else if (!C() && !y() && !w()) {
			G(oe, G(se, !0), !0), a.onInput?.({
				color: null,
				hsv: C(),
				rgb: y(),
				hex: w()
			});
			return;
		} else if (!_e()) return;
		G(oe, !1), C() && C().a === void 0 && C({
			...C(),
			a: 1
		}), p(X).a === void 0 && G(X, {
			...p(X),
			a: 1
		}, !0), y() && y().a === void 0 && y({
			...y(),
			a: 1
		}), p(ie).a === void 0 && G(ie, {
			...p(ie),
			a: 1
		}, !0), w()?.substring(7) === "ff" && w(w().substring(0, 7)), p(ae)?.substring(7) === "ff" && G(ae, p(ae).substring(0, 7), !0), C() && (C().h !== p(X).h || C().s !== p(X).s || C().v !== p(X).v || C().a !== p(X).a || !y() && !w()) ? (E(Li(C())), y(E().toRgb()), w(E().toHex())) : y() && (y().r !== p(ie).r || y().g !== p(ie).g || y().b !== p(ie).b || y().a !== p(ie).a || !C() && !w()) ? (E(Li(y())), w(E().toHex()), C(E().toHsv())) : w() && (w() !== p(ae) || !C() && !y()) && (E(Li(w())), y(E().toRgb()), C(E().toHsv())), E() && P(E().isDark()), !(!w() || !C() || !y()) && (G(X, l(C()), !0), G(ie, l(y()), !0), G(ae, w(), !0), G(se, p(oe), !0), a.onInput?.({
			color: E(),
			hsv: C(),
			rgb: y(),
			hex: w()
		}));
	}
	o(() => {
		(C() || y() || w()) && ve();
	}), o(() => {
		p(oe), ve();
	});
	function ye(e) {
		return (t) => {
			C() || (G(oe, !1), G(se, !1), C(l(p(X)))), C({
				...C(),
				[e]: t
			});
		};
	}
	function be(e) {
		return (t) => {
			C() || (G(oe, !1), G(se, !1), C(l(p(X)))), C({
				...C(),
				...Object.fromEntries(e.map((e) => [e, t[e]]))
			});
		};
	}
	async function xe() {
		if (await d(), B() === "fixed" || !z() || !R() || !p(le) || !p(Z)) return;
		let e = p(Z).getBoundingClientRect(), t = p(le).getBoundingClientRect();
		if ((B() === "responsive" || B() === "responsive-y") && (t.top + e.height + 12 > p($) ? p(Z).style.top = `-${e.height + 12}px` : p(Z).style.top = `${t.height + 12}px`), B() === "responsive" || B() === "responsive-x") if (V() === "rtl") {
			let n = t.left + t.width - e.width < 0;
			console.log(n, t.left - e.width, t.left, e.width), n ? p(Z).style.left = "0px" : p(Z).style.left = `${t.width - e.width}px`;
		} else t.left + e.width > p(ue) ? p(Z).style.left = `${t.width - e.width}px` : p(Z).style.left = "0px";
	}
	o(() => {
		p(ue) && p($) && z() && xe();
	});
	let Se = K(fe);
	var Ce = ya();
	A("mousedown", S, me), A("keyup", S, he), A("scroll", S, xe);
	var we = T(Ce), Te = (e) => {
		var t = L();
		n(h(t), () => p(Se).input, (e, t) => {
			t(e, {
				get hex() {
					return w();
				},
				get label() {
					return u();
				},
				get name() {
					return f();
				},
				get dir() {
					return V();
				},
				get labelElement() {
					return p(le);
				},
				set labelElement(e) {
					G(le, e, !0);
				}
			});
		}), j(e, t);
	}, Ee = (t) => {
		var n = ga();
		m(n), x(() => {
			k(n, w()), e(n, "name", f());
		}), j(t, n);
	};
	F(we, (e) => {
		R() ? e(Te) : f() && e(Ee, 1);
	}), n(t(we, 2), () => p(Se).wrapper, (e, r) => {
		r(e, {
			get isOpen() {
				return z();
			},
			get isDialog() {
				return R();
			},
			get wrapper() {
				return p(Z);
			},
			set wrapper(e) {
				G(Z, e, !0);
			},
			children: (e, r) => {
				var i = va(), o = h(i), s = (e) => {
					var t = L(), r = h(t);
					{
						let e = K(pe);
						n(r, () => p(Se).nullabilityCheckbox, (t, n) => {
							n(t, {
								get texts() {
									return p(e);
								},
								get isUndefined() {
									return p(oe);
								},
								set isUndefined(e) {
									G(oe, e, !0);
								}
							});
						});
					}
					j(e, t);
				};
				F(o, (e) => {
					_() && e(s);
				});
				var c = t(o, 2);
				{
					let e = K(fe), t = K(() => C()?.h ?? p(X).h), n = K(() => C()?.s ?? p(X).s), r = K(() => C()?.v ?? p(X).v), i = K(() => be(["s", "v"])), a = K(pe);
					Wi(c, {
						get components() {
							return p(e);
						},
						get h() {
							return p(t);
						},
						get s() {
							return p(n);
						},
						get v() {
							return p(r);
						},
						get onInput() {
							return p(i);
						},
						get isDark() {
							return P();
						},
						get texts() {
							return p(a);
						}
					});
				}
				var l = t(c, 2), u = T(l);
				{
					let e = K(() => C()?.h ?? p(X).h), t = K(() => ye("h")), n = K(() => q() === "vertical"), r = K(() => pe().label.h);
					Vi(u, {
						min: 0,
						max: 360,
						step: 1,
						get value() {
							return p(e);
						},
						get onInput() {
							return p(t);
						},
						get direction() {
							return q();
						},
						get reverse() {
							return p(n);
						},
						get ariaLabel() {
							return p(r);
						}
					});
				}
				g(l);
				var d = t(l, 2), f = (e) => {
					var t = _a();
					let n;
					var r = T(t);
					{
						let e = K(() => C()?.a ?? p(X).a), t = K(() => ye("a")), n = K(() => q() === "vertical"), i = K(() => pe().label.a);
						Vi(r, {
							min: 0,
							max: 1,
							step: .01,
							get value() {
								return p(e);
							},
							get onInput() {
								return p(t);
							},
							get direction() {
								return q();
							},
							get reverse() {
								return p(n);
							},
							get ariaLabel() {
								return p(i);
							}
						});
					}
					g(t), x((e) => n = te(t, "", n, e), [() => ({ "--alphaless-color": (w() ? w() : p(ae)).substring(0, 7) })]), j(e, t);
				};
				F(d, (e) => {
					I() && e(f);
				});
				var m = t(d, 2), v = (e) => {
					{
						let t = K(pe);
						ra(e, {
							get swatches() {
								return a.swatches;
							},
							selectSwatch: ge,
							get texts() {
								return p(t);
							}
						});
					}
				};
				F(m, (e) => {
					a.swatches && a.swatches.length > 0 && e(v);
				});
				var b = t(m, 2), S = (e) => {
					var t = L(), r = h(t);
					{
						let e = K(() => w() ?? p(ae)), t = K(() => y() ?? p(ie)), i = K(() => C() ?? p(X)), a = K(pe);
						n(r, () => p(Se).textInput, (n, r) => {
							r(n, {
								get hex() {
									return p(e);
								},
								get rgb() {
									return p(t);
								},
								get hsv() {
									return p(i);
								},
								onInput: (e) => {
									e.hsv ? C(e.hsv) : e.rgb ? y(e.rgb) : e.hex && w(e.hex);
								},
								get isAlpha() {
									return I();
								},
								get textInputModes() {
									return W();
								},
								get texts() {
									return p(a);
								}
							});
						});
					}
					j(e, t);
				};
				F(b, (e) => {
					U() && e(S);
				});
				var E = t(b, 2), D = (e) => {
					var t = L(), r = h(t);
					{
						let e = K(fe), t = K(() => w() || "#00000000");
						n(r, () => p(Se).a11yNotice, (n, r) => {
							r(n, {
								get components() {
									return p(e);
								},
								get a11yColors() {
									return J();
								},
								get hex() {
									return p(t);
								},
								get a11yTexts() {
									return Y();
								},
								get a11yLevel() {
									return ne();
								}
							});
						});
					}
					j(e, t);
				}, O = K(() => fe().a11yNotice);
				F(E, (e) => {
					p(O) && e(D);
				}), j(e, i);
			},
			$$slots: { default: !0 }
		});
	}), g(Ce), i(Ce, (e) => G(ce, e), () => p(ce)), x(() => N(Ce, 1, `color-picker ${q() ?? ""}`, "svelte-11gfb7g")), v("innerWidth", (e) => G(ue, e, !0)), v("innerHeight", (e) => G($, e, !0)), j(r, Ce), b();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/index.js
var Sa = xa, Ca = J("<label class=\"color-trigger svelte-lqk2kf\"><input type=\"color\" aria-haspopup=\"dialog\" tabindex=\"-1\" class=\"svelte-lqk2kf\"/> <span class=\"swatch svelte-lqk2kf\"></span></label>"), wa = {
	hash: "svelte-lqk2kf",
	code: ".color-trigger.svelte-lqk2kf {position:relative;display:grid;height:100%;min-width:2.5rem;place-items:center;cursor:pointer;user-select:none;}input.svelte-lqk2kf {position:absolute;margin:0;padding:0;border:none;width:1px;height:1px;opacity:0;pointer-events:none;}.swatch.svelte-lqk2kf {display:block;width:1.25rem;height:1.25rem;border-radius:0.375rem;border:1px solid rgb(255 255 255 / 0.12);box-shadow:inset 0 0 0 1px rgb(0 0 0 / 0.2);}"
};
function Ta(n, r) {
	c(r, !0), D(n, wa);
	let a = O(r, "labelElement", 15), o = O(r, "name", 3, void 0);
	function s(e) {
		e.preventDefault();
	}
	var l = Ca(), u = T(l);
	m(u);
	var d = t(u, 2);
	let f;
	g(l), i(l, (e) => a(e), () => a()), x(() => {
		e(l, "dir", r.dir), e(l, "aria-label", r.label), e(u, "name", o()), k(u, r.hex ?? "#000000"), f = te(d, "", f, { background: r.hex ?? "transparent" }), l.dir = l.dir;
	}), Y("click", l, s), Y("mousedown", l, s), Y("click", u, s), Y("mousedown", u, s), j(n, l), b();
}
ne(["click", "mousedown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-color.svelte
var Ea = J("<p> </p>"), Da = J("<div><!> <div><div><svelte-css-wrapper style=\"display: contents\"><!></svelte-css-wrapper></div> <input type=\"text\" spellcheck=\"false\" autocomplete=\"off\"/></div> <!></div>"), Oa = {
	hash: "svelte-r9ulp6",
	code: ".color-picker-slot.svelte-r9ulp6 > span {display:block;height:100%;}.color-picker-slot.svelte-r9ulp6 [role='dialog'] {top:calc(100% + 0.5rem);margin:0;}.input-color.svelte-r9ulp6 .wrapper {border-radius:0.75rem;}"
};
function ka(n, r) {
	c(r, !0), D(n, Oa);
	let i = /^#([0-9a-fA-F]{3})$/, a = /^#([0-9a-fA-F]{6})$/, o = /^#([0-9a-fA-F]{8})$/;
	function s(e) {
		let t = e.trim(), n = i.exec(t);
		if (n) {
			let [e, t, r] = n[1];
			return `#${e}${e}${t}${t}${r}${r}`.toLowerCase();
		}
		if (a.exec(t)) return t.toLowerCase();
		let r = o.exec(t);
		return r ? `#${r[1].slice(0, 6)}`.toLowerCase() : null;
	}
	let l = O(r, "id", 19, Fe), u = O(r, "value", 15, ""), d = O(r, "defaultValue", 3, "#000000"), f = K(() => s(u() ?? "") ?? s(d()) ?? "#000000");
	function h(e) {
		if (!e) return;
		let t = s(e);
		!t || t === u() || (u(t), r.onvaluechange?.(t));
	}
	function _(e) {
		let t = e.currentTarget.value;
		u(t), r.onvaluechange?.(t);
	}
	var v = Da(), y = T(v), S = (e) => {
		Tr(e, {
			get for() {
				return l();
			},
			children: (e, t) => {
				E();
				var n = P();
				x(() => W(n, r.label)), j(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(y, (e) => {
		r.label && e(S);
	});
	var C = t(y, 2), w = T(C), A = T(w);
	{
		let e = K(() => r.label ?? "Color"), t = K(() => ({ input: Ta }));
		I(A, () => ({
			"--picker-z-index": "100",
			"--input-size": "1.25rem",
			"--cp-bg-color": "var(--color-dark-800, #1a1b1e)",
			"--cp-border-color": "var(--color-dark-500, #3f3f46)",
			"--cp-text-color": "var(--color-dark-50, #f4f4f5)",
			"--cp-input-color": "var(--color-dark-700, #27272a)",
			"--cp-button-hover-color": "var(--color-dark-600, #3f3f46)",
			"--focus-color": "var(--color-ring, #6366f1)"
		})), Sa(A.lastChild, {
			get hex() {
				return p(f);
			},
			get label() {
				return p(e);
			},
			isAlpha: !1,
			isTextInput: !0,
			textInputModes: ["hex"],
			position: "responsive",
			get components() {
				return p(t);
			},
			onInput: ({ hex: e }) => h(e)
		}), g(A);
	}
	g(w);
	var M = t(w, 2);
	m(M), g(C);
	var L = t(C, 2), R = (e) => {
		var t = Ea(), n = T(t, !0);
		g(t), x(() => {
			N(t, 1, q(br), "svelte-r9ulp6"), W(n, r.error);
		}), j(e, t);
	};
	F(L, (e) => {
		r.error && e(R);
	}), g(v), x((t, n, i, a) => {
		N(v, 1, t, "svelte-r9ulp6"), N(C, 1, n, "svelte-r9ulp6"), N(w, 1, i, "svelte-r9ulp6"), e(M, "id", l()), e(M, "aria-invalid", r.error ? !0 : void 0), e(M, "placeholder", d()), k(M, u()), N(M, 1, a, "svelte-r9ulp6");
	}, [
		() => q(Q("input-color grid w-full min-w-0 gap-2", r.class)),
		() => q(Q("relative flex w-full min-w-0 items-stretch rounded-xl", pr, We.md, vr(r.error))),
		() => q(Q("color-picker-slot grid h-full place-items-center rounded-l-xl border transition-colors", _r(r.error), fr, ze.md)),
		() => q(Q("box-border h-full min-h-0 min-w-0 w-full appearance-none truncate border border-l-0 outline-none transition-colors", "rounded-l-none rounded-r-xl", fr, Sr, Ke.md, gr(r.error)))
	]), Y("input", M, _), j(n, v), b();
}
ne(["input"]);
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/internal/configurable-globals.js
var Aa = typeof window < "u" ? window : void 0;
typeof window < "u" && window.document, typeof window < "u" && window.navigator, typeof window < "u" && window.location;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/internal/utils/dom.js
function ja(e) {
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
		let { window: t = Aa, document: n = t?.document } = e;
		t !== void 0 && (this.#e = n, this.#t = y((e) => {
			let n = re(t, "focusin", e), r = re(t, "focusout", e);
			return () => {
				n(), r();
			};
		}));
	}
	get current() {
		return this.#t?.(), this.#e ? ja(this.#e) : null;
	}
}();
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/internal/utils/is.js
function Ma(e) {
	return typeof e == "function";
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/utilities/extract/extract.svelte.js
function Na(e, t) {
	if (Ma(e)) {
		let n = e();
		return n === void 0 ? t : n;
	}
	return e === void 0 ? t : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/utilities/use-debounce/use-debounce.svelte.js
function Pa(e, t) {
	let n = M(null), r = K(() => Na(t, 250));
	function i(...t) {
		if (p(n)) p(n).timeout && clearTimeout(p(n).timeout);
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
		return p(n).runner = async () => {
			if (!p(n)) return;
			let r = p(n);
			G(n, null);
			try {
				r.resolve(await e.apply(this, t));
			} catch (e) {
				r.reject(e);
			}
		}, p(n).timeout = setTimeout(p(n).runner, p(r)), p(n).promise;
	}
	return i.cancel = async () => {
		(!p(n) || p(n).timeout === null) && (await new Promise((e) => setTimeout(e, 0)), !p(n) || p(n).timeout === null) || (clearTimeout(p(n).timeout), p(n).reject("Cancelled"), G(n, null));
	}, i.runScheduledNow = async () => {
		(!p(n) || !p(n).timeout) && (await new Promise((e) => setTimeout(e, 0)), !p(n) || !p(n).timeout) || (clearTimeout(p(n).timeout), p(n).timeout = null, await p(n).runner?.());
	}, Object.defineProperty(i, "pending", {
		enumerable: !0,
		get() {
			return !!p(n)?.timeout;
		}
	}), i;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/utilities/watch/watch.svelte.js
function Fa(e, t) {
	switch (e) {
		case "post":
			o(t);
			break;
		case "pre":
			u(t);
			break;
	}
}
function Ia(e, t, n, r = {}) {
	let { lazy: i = !1 } = r, a = !i, o = Array.isArray(e) ? [] : void 0;
	Fa(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!a) {
			a = !0, o = t;
			return;
		}
		let r = f(() => n(t, o));
		return o = t, r;
	});
}
function La(e, t, n) {
	let r = ie(() => {
		let i = !1;
		Ia(e, t, (e, t) => {
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
function Ra(e, t, n) {
	Ia(e, "post", t, n);
}
function za(e, t, n) {
	Ia(e, "pre", t, n);
}
Ra.pre = za;
function Ba(e, t) {
	La(e, "post", t);
}
function Va(e, t) {
	La(e, "pre", t);
}
Ba.pre = Va;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/internal/utils/function.js
function Ha() {}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/utilities/debounced/debounced.svelte.js
var Ua = class {
	#e = M();
	#t;
	constructor(e, t = 250) {
		G(this.#e, e(), !0), this.cancel = this.cancel.bind(this), this.setImmediately = this.setImmediately.bind(this), this.updateImmediately = this.updateImmediately.bind(this), this.#t = Pa(() => {
			G(this.#e, e(), !0);
		}, t), Ra(e, () => {
			this.#t().catch(Ha);
		});
	}
	get current() {
		return p(this.#e);
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
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/utilities/resource/resource.svelte.js
function Wa(e, t) {
	let n, r = null;
	return (...i) => new Promise((a) => {
		r && r(void 0), r = a, clearTimeout(n), n = setTimeout(async () => {
			let t = await e(...i);
			r &&= (r(t), null);
		}, t);
	});
}
function Ga(e, t) {
	let n = 0, r = null;
	return (...i) => {
		let a = Date.now();
		return n && a - n < t ? r ?? Promise.resolve(void 0) : (n = a, r = e(...i), r);
	};
}
function Ka(e, t, n = {}, r) {
	let { lazy: i = !1, once: a = !1, initialValue: o, debounce: s, throttle: c } = n, l = M(H(o)), u = M(H(o === void 0 && !i)), d = M(void 0), f = M(H([])), m = () => {
		p(f).forEach((e) => e()), G(f, [], !0);
	}, h = (e) => {
		G(f, [...p(f), e], !0);
	}, g = async (e, n, r = !1) => {
		try {
			G(u, !0), G(d, void 0), m();
			let i = new AbortController();
			h(() => i.abort());
			let a = await t(e, n, {
				data: p(l),
				refetching: r,
				onCleanup: h,
				signal: i.signal
			});
			return G(l, a, !0), a;
		} catch (e) {
			e instanceof DOMException && e.name === "AbortError" || G(d, e, !0);
			return;
		} finally {
			G(u, !1);
		}
	}, _ = s ? Wa(g, s) : c ? Ga(g, c) : g, v = Array.isArray(e) ? e : [e], y;
	return r((t, n) => {
		a && y || (y = t, _(Array.isArray(e) ? t : t[0], Array.isArray(e) ? n : n?.[0]));
	}, { lazy: i }), {
		get current() {
			return p(l);
		},
		get loading() {
			return p(u);
		},
		get error() {
			return p(d);
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
function qa(e, t, n) {
	return Ka(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		Ra(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
function Ja(e, t, n) {
	return Ka(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		Ra.pre(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
qa.pre = Ja;
//#endregion
//#region ../ui/src/lib/components/input/resolve-select-items.svelte.ts
function Ya(e, t) {
	let n = M(H([])), r = M(!1), i = M(0), a = K(() => {
		let t = e();
		return typeof t == "function" ? (p(i), p(n)) : t;
	}), s = K(() => typeof e() == "function" ? (p(i), p(r)) : !1);
	return o(() => {
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
			return p(a);
		},
		get loading() {
			return p(s);
		}
	};
}
function Xa(e, t) {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => e.label.toLowerCase().includes(n) || e.value.toLowerCase().includes(n)) : e;
}
function Za(e, t, n = 200, r = 36, i = 6) {
	let a = e.length * r, o = Math.max(0, Math.floor(t / r) - i), s = Math.ceil(n / r) + i * 2, c = Math.min(e.length, o + s);
	return {
		items: e.slice(o, c),
		startIndex: o,
		totalHeight: a,
		offsetY: o * r
	};
}
function Qa(e) {
	return e > 50;
}
function $a(e, t = 36) {
	return Math.max(0, e * t);
}
//#endregion
//#region ../ui/src/lib/components/input/input-select.svelte
var eo = J("<span>*</span>"), to = J(" <!>", 1), no = J("<span><!></span>"), ro = J("<!> <!>", 1), io = J("<!> <!> <!>", 1), ao = J("<div><button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\"><!> <span><span> </span> <!></span></button></div> <!>", 1), oo = J("<p> </p>"), so = J("<div><!> <!> <!></div>");
function co(i, a) {
	c(a, !0);
	let o = O(a, "searchable", 3, "auto"), s = O(a, "dialogTitle", 3, "Select option"), l = O(a, "dialogDescription", 3, "Search and select an option from the list."), u = O(a, "id", 19, Fe), f = O(a, "required", 3, !1), m = O(a, "type", 3, "single"), _ = O(a, "value", 15), v = K(() => a.placeholder ?? "Select an option"), y = K(() => a.loadingPlaceholder ?? "Loading..."), S = K(() => a.searchPlaceholder ?? "Search values"), C = K(() => a.noResultsLabel ?? "No matches found"), w = M(!1), D = M(""), k = Fe(), A = Fe(), I = Ya(() => a.items, () => a.reloadKey?.()), R = K(() => a.disabled ?? !1), z = K(() => m() === "multiple"), B = K(() => o() === !0 ? !0 : o() === !1 ? !1 : I.items.length >= 8), V = K(() => {
		if (I.loading) return p(y);
		if (p(z)) {
			let e = _();
			if (e.length === 0) return p(v);
			let t = e.map((e) => I.items.find((t) => t.value === e)?.label).filter(Boolean);
			return t.length > 0 ? t.join(", ") : p(v);
		}
		let e = _();
		return e ? I.items.find((t) => t.value === e)?.label ?? e : p(v);
	}), H = K(() => p(z) ? _().length > 0 : !!_());
	function U(e) {
		G(w, e, !0), e || G(D, "");
	}
	function J(e) {
		return p(z) ? _().includes(e) : _() === e;
	}
	function te(e) {
		if (!e.disabled) {
			if (p(z)) {
				let t = [..._()], n = t.indexOf(e.value);
				n >= 0 ? t.splice(n, 1) : t.push(e.value), _(t), a.onValueChange?.(t);
				return;
			}
			_(e.value), a.onValueChange?.(e.value), G(w, !1);
		}
	}
	function ne() {
		p(R) || G(w, !0);
	}
	async function re(e) {
		a.dialogProps?.onOpenAutoFocus?.(e), !(e.defaultPrevented || !p(B)) && (e.preventDefault(), await d(), document.getElementById(A)?.focus());
	}
	function ie(e) {
		a.dialogProps?.onCloseAutoFocus?.(e), !e.defaultPrevented && e.preventDefault();
	}
	var X = so(), ae = T(X), oe = (e) => {
		Tr(e, {
			get for() {
				return u();
			},
			children: (e, n) => {
				E();
				var r = to(), i = h(r), o = t(i), s = (e) => {
					var t = eo();
					x(() => N(t, 1, q(xr))), j(e, t);
				};
				F(o, (e) => {
					f() && e(s);
				}), x(() => W(i, `${a.label ?? ""} `)), j(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	F(ae, (e) => {
		a.label && e(oe);
	});
	var se = t(ae, 2);
	n(se, () => gt, (i, o) => {
		o(i, {
			onOpenChange: U,
			get open() {
				return p(w);
			},
			set open(e) {
				G(w, e, !0);
			},
			children: (i, o) => {
				var c = ao(), d = h(c), f = T(d), m = T(f), _ = (e) => {
					var t = no();
					Z(T(t), {
						get icon() {
							return a.prependIcon;
						},
						class: "size-6"
					}), g(t), x((e) => N(t, 1, e), [() => q(Q("grid h-full min-w-10 place-items-center rounded-l-xl border border-r-0 text-dark-50 transition-colors", gr(a.error)))]), j(e, t);
				};
				F(m, (e) => {
					a.prependIcon && e(_);
				});
				var v = t(m, 2), b = T(v), O = T(b, !0);
				g(b), Z(t(b, 2), {
					icon: "ri:expand-up-down-line",
					class: "size-5 shrink-0 text-dark-300"
				}), g(v), g(f), g(d), n(t(d, 2), () => vt, (e, i) => {
					i(e, {
						children: (e, i) => {
							var o = ro(), c = h(o);
							n(c, () => yt, (e, t) => {
								t(e, { class: "z-60 bg-black/60 backdrop-blur-sm" });
							});
							var u = t(c, 2);
							{
								let e = K(() => a.dialogProps?.trapFocus ?? !1), i = K(() => a.dialogProps?.preventScroll ?? !1), o = K(() => Q("z-60", a.dialogProps?.class));
								n(u, () => ht, (c, u) => {
									u(c, ee(() => a.dialogProps, {
										get trapFocus() {
											return p(e);
										},
										get preventScroll() {
											return p(i);
										},
										onOpenAutoFocus: re,
										onCloseAutoFocus: ie,
										get class() {
											return p(o);
										},
										children: (e, i) => {
											var o = io(), c = h(o);
											n(c, () => mt, (e, t) => {
												t(e, {
													class: "sr-only",
													children: (e, t) => {
														E();
														var n = P();
														x(() => W(n, s())), j(e, n);
													},
													$$slots: { default: !0 }
												});
											});
											var u = t(c, 2);
											n(u, () => _t, (e, t) => {
												t(e, {
													class: "sr-only",
													children: (e, t) => {
														E();
														var n = P();
														x(() => W(n, l())), j(e, n);
													},
													$$slots: { default: !0 }
												});
											});
											var d = t(u, 2);
											{
												let e = K(() => !I.loading), i = K(() => Q(a.commandProps?.class));
												n(d, () => Ge, (o, s) => {
													s(o, ee(() => a.commandProps, {
														get shouldFilter() {
															return p(e);
														},
														get class() {
															return p(i);
														},
														children: (e, i) => {
															var a = ro(), o = h(a), s = (e) => {
																var t = L();
																n(h(t), () => Je, (e, t) => {
																	t(e, {
																		get id() {
																			return A;
																		},
																		get placeholder() {
																			return p(S);
																		},
																		get "aria-label"() {
																			return p(S);
																		},
																		get value() {
																			return p(D);
																		},
																		set value(e) {
																			G(D, e, !0);
																		}
																	});
																}), j(e, t);
															};
															F(o, (e) => {
																p(B) && e(s);
															}), n(t(o, 2), () => Re, (e, i) => {
																i(e, {
																	get id() {
																		return k;
																	},
																	class: "mt-2",
																	children: (e, i) => {
																		var a = L();
																		n(h(a), () => Le, (e, i) => {
																			i(e, {
																				children: (e, i) => {
																					var a = L(), o = h(a), s = (e) => {
																						var t = L();
																						n(h(t), () => qe, (e, t) => {
																							t(e, {
																								children: (e, t) => {
																									E();
																									var n = P();
																									x(() => W(n, p(y))), j(e, n);
																								},
																								$$slots: { default: !0 }
																							});
																						}), j(e, t);
																					}, c = (e) => {
																						var i = ro(), a = h(i);
																						n(a, () => Ve, (e, t) => {
																							t(e, {
																								children: (e, t) => {
																									E();
																									var n = P();
																									x(() => W(n, p(C))), j(e, n);
																								},
																								$$slots: { default: !0 }
																							});
																						}), r(t(a, 2), 17, () => I.items, (e) => e.value, (e, r) => {
																							var i = L(), a = h(i);
																							{
																								let e = K(() => [p(r).label, p(r).value]);
																								n(a, () => Ue, (n, i) => {
																									i(n, {
																										get value() {
																											return p(r).value;
																										},
																										get keywords() {
																											return p(e);
																										},
																										get disabled() {
																											return p(r).disabled;
																										},
																										onSelect: () => te(p(r)),
																										children: (e, n) => {
																											E();
																											var i = to(), a = h(i), o = t(a), s = (e) => {
																												Z(e, {
																													icon: "ri:check-line",
																													class: "size-5 text-primary"
																												});
																											}, c = K(() => J(p(r).value));
																											F(o, (e) => {
																												p(c) && e(s);
																											}), x(() => W(a, `${p(r).label ?? ""} `)), j(e, i);
																										},
																										$$slots: { default: !0 }
																									});
																								});
																							}
																							j(e, i);
																						}), j(e, i);
																					};
																					F(o, (e) => {
																						I.loading ? e(s) : e(c, -1);
																					}), j(e, a);
																				},
																				$$slots: { default: !0 }
																			});
																		}), j(e, a);
																	},
																	$$slots: { default: !0 }
																});
															}), j(e, a);
														},
														$$slots: { default: !0 }
													}));
												});
											}
											j(e, o);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							j(e, o);
						},
						$$slots: { default: !0 }
					});
				}), x((t, n, r, i) => {
					N(d, 1, t), e(f, "id", u()), e(f, "aria-expanded", p(w)), e(f, "aria-controls", p(w) ? k : void 0), f.disabled = p(R), N(f, 1, n), N(v, 1, r), N(b, 1, i), W(O, p(V));
				}, [
					() => q(Q("relative flex w-full min-w-0 items-center rounded-xl", pr, vr(a.error))),
					() => q(Q("flex w-full min-w-0 cursor-pointer items-center outline-none", Sr)),
					() => q(Q("flex w-full items-center justify-between gap-2 border outline-none transition-colors", fr, He.md, gr(a.error), {
						"rounded-l-none rounded-r-xl border-l-0": a.prependIcon,
						"rounded-xl": !a.prependIcon
					})),
					() => q(Q("min-w-0 flex-1 truncate text-left", !p(H) && "text-dark-300"))
				]), Y("click", f, ne), j(i, c);
			},
			$$slots: { default: !0 }
		});
	});
	var ce = t(se, 2), le = (e) => {
		var t = oo(), n = T(t, !0);
		g(t), x(() => {
			N(t, 1, q(br)), W(n, a.error);
		}), j(e, t);
	};
	F(ce, (e) => {
		a.error && e(le);
	}), g(X), x((e) => N(X, 1, e), [() => q(Q("relative grid w-full min-w-0 gap-2", a.class))]), j(i, X), b();
}
ne(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/cron-expression-editor.svelte
var lo = J("<div><p class=\"text-[10px] font-semibold tracking-[0.14em] text-dark-400 uppercase\"> </p> <p> </p></div>"), uo = J("<span><!> </span>"), fo = J("<p class=\"text-xs text-dark-200\"><span class=\"text-dark-400\"> </span> <span class=\"font-medium text-primary-100\"> </span></p>"), po = J("<div class=\"overflow-hidden rounded-xl border border-border bg-dark-800/40 transition-all duration-200 focus-within:border-ring/50 focus-within:ring-2 focus-within:ring-ring/20\"><div class=\"grid grid-cols-5 border-b border-dark-600/80 bg-dark-900/40 px-2 py-1.5\"></div> <div class=\"relative flex items-center gap-2 px-3 py-2\"><!> <input autocomplete=\"off\"/> <!></div> <div class=\"flex flex-wrap items-center justify-between gap-2 border-t border-dark-600/80 bg-dark-900/30 px-3 py-2\"><div class=\"min-w-40 max-w-xs flex-1\"><!></div> <!></div></div>");
function mo(n, i) {
	c(i, !0);
	let a = O(i, "value", 3, ""), o = O(i, "placeholder", 3, "0 9 * * 1-5"), s = O(i, "presets", 3, ae), l = O(i, "validLabel", 3, "Valid expression"), u = O(i, "invalidLabel", 3, "Invalid cron expression"), d = O(i, "nextRunLabel", 3, "Next run"), f = O(i, "presetsPlaceholder", 3, "Presets"), h = Fe(), _ = new Ua(() => a(), 250), v = K(() => ({
		minute: i.fieldLabels?.minute ?? "Minute",
		hour: i.fieldLabels?.hour ?? "Hour",
		day: i.fieldLabels?.day ?? "Day",
		month: i.fieldLabels?.month ?? "Month",
		weekday: i.fieldLabels?.weekday ?? "Weekday"
	})), y = K(() => ce(a())), S = K(() => oe(_.current)), C = K(() => X(p(S))), w = K(() => !!p(S) && !p(C)), E = K(() => p(C) === "Invalid cron expression" ? u() : p(C)), D = K(() => p(w) ? se(p(S)) : void 0), A = K(() => s().map((e) => ({
		value: e.value,
		label: e.label
	}))), M = {
		minute: "text-sky-300",
		hour: "text-violet-300",
		day: "text-emerald-300",
		month: "text-amber-300",
		weekday: "text-rose-300"
	}, P = (e) => {
		i.oninput?.(e);
	};
	function I(e) {
		i.oninput?.({ currentTarget: { value: e } });
	}
	var L = po(), R = T(L);
	r(R, 22, () => le, (e) => e, (e, n, r) => {
		var i = lo(), a = T(i), o = T(a, !0);
		g(a);
		var s = t(a, 2), c = T(s, !0);
		g(s), g(i), x((e, t) => {
			N(i, 1, e), W(o, p(v)[n]), N(s, 1, t), W(c, p(y)[p(r)] || "—");
		}, [() => q(Q("px-1 text-center", p(r) < 4 && "border-r border-dark-700/50")), () => q(Q("mt-0.5 truncate font-mono text-xs", M[n]))]), j(e, i);
	}), g(R);
	var z = t(R, 2), B = T(z);
	Z(B, {
		icon: "ri:time-line",
		class: "size-5 shrink-0 text-dark-400"
	});
	var V = t(B, 2);
	m(V), e(V, "spellcheck", !1);
	var H = t(V, 2), U = (e) => {
		var n = uo(), r = T(n);
		{
			let e = K(() => p(w) ? "ri:check-line" : "ri:alert-line");
			Z(r, {
				get icon() {
					return p(e);
				},
				class: "size-4"
			});
		}
		var i = t(r);
		g(n), x((e) => {
			N(n, 1, e), W(i, ` ${(p(w) ? l() : p(E)) ?? ""}`);
		}, [() => q(Q("inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium", p(w) ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"))]), j(e, n);
	};
	F(H, (e) => {
		p(S) && e(U);
	}), g(z);
	var G = t(z, 2), ee = T(G), J = T(ee), te = () => "", ne = (e) => {
		e && I(e);
	};
	co(J, {
		type: "single",
		get placeholder() {
			return f();
		},
		get items() {
			return p(A);
		},
		get value() {
			return te();
		},
		set value(e) {
			ne(e);
		}
	}), g(ee);
	var re = t(ee, 2), ie = (e) => {
		var n = fo(), r = T(n), i = T(r);
		g(r);
		var a = t(r, 2), o = T(a, !0);
		g(a), g(n), x(() => {
			W(i, `${d() ?? ""}:`), W(o, p(D));
		}), j(e, n);
	};
	F(re, (e) => {
		p(D) && e(ie);
	}), g(G), g(L), x((t) => {
		e(V, "id", h), N(V, 1, t), e(V, "placeholder", o()), V.required = i.required, k(V, a() ?? "");
	}, [() => q(Q("min-w-0 flex-1 border-0 bg-transparent font-mono text-sm text-dark-50 outline-none", He.md, "px-0 py-0"))]), Y("input", V, P), j(n, L), b();
}
ne(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-cron-expression.svelte
var ho = J("<button><!> <span> </span> <!> <!></button>"), go = J("<p class=\"mb-3 text-xs font-semibold tracking-wide text-dark-200 uppercase\"> </p> <!>", 1), _o = J("<!> <!>", 1), vo = J("<p> </p>"), yo = J("<div><!> <!> <!></div>");
function bo(e, n) {
	c(n, !0);
	let r = O(n, "id", 19, Fe), i = O(n, "value", 3, ""), a = O(n, "placeholder", 3, "0 9 * * 1-5"), o = O(n, "validLabel", 3, "Valid expression"), s = O(n, "invalidLabel", 3, "Invalid cron expression"), l = O(n, "nextRunLabel", 3, "Next run"), u = O(n, "presetsPlaceholder", 3, "Presets"), d = O(n, "editorTitle", 3, "Cron expression"), f = O(n, "emptyLabel", 3, "Configure cron expression"), m = O(n, "editAriaLabel", 3, "Edit cron expression"), _ = M(!1), v = K(() => oe(i())), y = K(() => X(p(v))), S = K(() => !!p(v) && !p(y)), C = K(() => p(v) || f()), D = K(() => !p(v));
	var k = yo(), A = T(k), I = (e) => {
		Tr(e, {
			get for() {
				return r();
			},
			children: (e, t) => {
				E();
				var r = P();
				x(() => W(r, n.label)), j(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	F(A, (e) => {
		n.label && e(I);
	});
	var L = t(A, 2);
	Dt(L, {
		get open() {
			return p(_);
		},
		set open(e) {
			G(_, e, !0);
		},
		children: (e, c) => {
			var f = _o(), y = h(f);
			Ot(y, {
				child: (e, i) => {
					let a = () => i?.().props;
					var o = ho();
					w(o, (e) => ({
						id: r(),
						type: "button",
						...a(),
						"aria-label": m(),
						class: e
					}), [() => Q("flex w-full items-center gap-2 rounded-xl border text-left outline-none transition-all", fr, He.md, "focus-visible:ring-2", n.error ? "border-destructive focus-visible:border-destructive/50 focus-visible:ring-destructive" : "border-border hover:border-dark-400 focus-visible:border-ring/50 focus-visible:ring-ring")]);
					var s = T(o);
					Z(s, {
						icon: "ri:time-line",
						class: "size-5 shrink-0 text-dark-400"
					});
					var c = t(s, 2), l = T(c, !0);
					g(c);
					var u = t(c, 2), d = (e) => {
						{
							let t = K(() => p(S) ? "ri:check-line" : "ri:alert-line"), n = K(() => Q("size-5 shrink-0", p(S) ? "text-green-400" : "text-amber-400"));
							Z(e, {
								get icon() {
									return p(t);
								},
								get class() {
									return p(n);
								}
							});
						}
					};
					F(u, (e) => {
						p(v) && e(d);
					});
					var f = t(u, 2);
					{
						let e = K(() => Q("size-5 shrink-0 text-dark-300 transition-transform", p(_) && "rotate-180"));
						Z(f, {
							icon: "ri:arrow-down-s-line",
							get class() {
								return p(e);
							}
						});
					}
					g(o), x((e) => {
						N(c, 1, e), W(l, p(C));
					}, [() => q(Q("min-w-0 flex-1 truncate text-sm", p(D) ? "font-sans text-dark-300" : "font-mono text-dark-50"))]), j(e, o);
				},
				$$slots: { child: !0 }
			}), Et(t(y, 2), {
				align: "start",
				class: "w-[min(28rem,calc(100vw-2rem))] p-3",
				children: (e, r) => {
					var c = go(), f = h(c), p = T(f, !0);
					g(f), mo(t(f, 2), {
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
							return s();
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
					}), x(() => W(p, d())), j(e, c);
				},
				$$slots: { default: !0 }
			}), j(e, f);
		},
		$$slots: { default: !0 }
	});
	var R = t(L, 2), z = (e) => {
		var t = vo(), r = T(t, !0);
		g(t), x(() => {
			N(t, 1, q(br)), W(r, n.error);
		}), j(e, t);
	};
	F(R, (e) => {
		n.error && e(z);
	}), g(k), x((e) => N(k, 1, e), [() => q(Q("relative grid w-full gap-2", n.class))]), j(e, k), b();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text.svelte
var xo = new Set([
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
]), So = J("<span><!></span>"), Co = J("<button type=\"button\"><!></button>"), wo = J("<p> </p>"), To = J("<div><!> <div><!> <input/> <!> <!> <!></div> <!></div>");
function Eo(n, r) {
	c(r, !0);
	let i = O(r, "id", 19, Fe), a = O(r, "copyable", 3, !1), o = O(r, "copyLabel", 3, "Copy"), s = O(r, "copiedLabel", 3, "Copied"), l = O(r, "size", 3, "md"), u = U(r, xo), d = M(!1), f = M(!1), m, h = K(() => r.type === "password"), _ = K(() => !!r.appendIcon || p(h) || a()), v = K(() => a() ? r.readonly ?? !0 : r.readonly), y = K(() => a() && p(v));
	async function S() {
		await navigator.clipboard.writeText(String(r.value ?? "")), m && clearTimeout(m), G(f, !0), m = setTimeout(() => {
			G(f, !1);
		}, 2e3);
	}
	var C = To(), D = T(C), k = (e) => {
		Tr(e, {
			get for() {
				return i();
			},
			children: (e, t) => {
				E();
				var n = P();
				x(() => W(n, r.label)), j(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(D, (e) => {
		r.label && e(k);
	});
	var A = t(D, 2), I = T(A), L = (e) => {
		var t = So();
		Z(T(t), {
			get icon() {
				return r.prependIcon;
			},
			get class() {
				return Be[l()];
			}
		}), g(t), x((e) => N(t, 1, e), [() => q(Q("grid h-full place-items-center rounded-l-xl border text-dark-50 transition-colors", _r(r.error), fr, ze[l()]))]), j(e, t);
	};
	F(I, (e) => {
		r.prependIcon && e(L);
	});
	var R = t(I, 2);
	w(R, (e) => ({
		id: i(),
		"aria-invalid": r.error ? !0 : void 0,
		value: r.value,
		readonly: p(v),
		tabindex: p(y) ? -1 : r.tabindex,
		...u,
		class: e,
		type: p(h) ? p(d) ? "text" : "password" : r.type
	}), [() => Q("box-border h-full min-h-0 min-w-0 w-full appearance-none truncate border outline-none transition-colors", fr, Sr, Ke[l()], gr(r.error), {
		"rounded-l-none rounded-r-xl border-l-0": r.prependIcon && !p(_),
		"rounded-l-none border-l-0": r.prependIcon && p(_),
		"rounded-l-xl rounded-r-none border-r-0": !r.prependIcon && p(_),
		"rounded-xl": !r.prependIcon && !p(_)
	})], void 0, void 0, void 0, !0);
	var z = t(R, 2), B = (e) => {
		var t = So();
		Z(T(t), {
			get icon() {
				return r.appendIcon;
			},
			get class() {
				return Be[l()];
			}
		}), g(t), x((e) => N(t, 1, e), [() => q(Q("grid h-full place-items-center text-dark-50 transition-colors", ze[l()], p(h) || a() ? Q("border-y border-r-0 border-l", _r(r.error)) : Q("rounded-r-xl border border-l-0", _r(r.error))))]), j(e, t);
	};
	F(z, (e) => {
		r.appendIcon && e(B);
	});
	var V = t(z, 2), H = (t) => {
		var n = Co(), i = T(n);
		{
			let e = K(() => p(f) ? "ri:checkbox-circle-fill" : "ri:file-copy-line");
			Z(i, {
				get icon() {
					return p(e);
				},
				get class() {
					return Be[l()];
				}
			});
		}
		g(n), x((t) => {
			N(n, 1, t), e(n, "aria-label", p(f) ? s() : o());
		}, [() => q(Q("grid h-full place-items-center rounded-r-xl border transition-colors", _r(r.error), fr, p(f) ? "text-success" : "text-dark-50", ze[l()]))]), Y("click", n, () => void S()), j(t, n);
	};
	F(V, (e) => {
		a() && e(H);
	});
	var ee = t(V, 2), J = (t) => {
		var n = Co(), i = T(n);
		{
			let e = K(() => p(d) ? "mdi:eye-off-outline" : "mdi:eye-outline");
			Z(i, {
				get icon() {
					return p(e);
				},
				get class() {
					return Be[l()];
				}
			});
		}
		g(n), x((t) => {
			N(n, 1, t), e(n, "aria-label", p(d) ? "Hide password" : "Show password"), e(n, "aria-pressed", p(d));
		}, [() => q(Q("grid h-full place-items-center rounded-r-xl border text-dark-50 transition-colors", _r(r.error), fr, ze[l()]))]), Y("click", n, () => G(d, !p(d))), j(t, n);
	};
	F(ee, (e) => {
		p(h) && e(J);
	}), g(A);
	var te = t(A, 2), ne = (e) => {
		var t = wo(), n = T(t, !0);
		g(t), x(() => {
			N(t, 1, q(br)), W(n, r.error);
		}), j(e, t);
	};
	F(te, (e) => {
		r.error && e(ne);
	}), g(C), x((e, t) => {
		N(C, 1, e), N(A, 1, t);
	}, [() => q(Q("relative grid w-full min-w-0 gap-2", r.class)), () => q(Q("relative flex w-full min-w-0 items-stretch rounded-xl", pr, We[l()], !p(y) && vr(r.error)))]), j(n, C), b();
}
ne(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-file.svelte
var Do = J("<div class=\"flex items-center gap-3\"><!></div>"), Oo = J("<div class=\"grid gap-2\"><!> <!> <div class=\"flex flex-wrap items-center gap-2\"><!> <!> <!></div></div>");
function ko(e, n) {
	c(n, !0);
	let r = O(n, "value", 3, ""), i = O(n, "browseLabel", 3, "Upload"), a = O(n, "cloudLabel", 3, "Cloud"), o = O(n, "clearLabel", 3, "Clear"), s = O(n, "emptyLabel", 3, "No file selected"), l = M(!1);
	async function u(e) {
		if (!p(l)) {
			G(l, !0);
			try {
				let t = await e();
				if (!t) return;
				n.onValueChange?.(t);
			} finally {
				G(l, !1);
			}
		}
	}
	var d = Oo(), f = T(d), m = (e) => {
		var t = Do();
		_(T(t), () => n.preview), g(t), j(e, t);
	};
	F(f, (e) => {
		n.preview && e(m);
	});
	var h = t(f, 2);
	{
		let e = K(() => n.placeholder ?? s());
		Eo(h, {
			get label() {
				return n.label;
			},
			get placeholder() {
				return p(e);
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
	var v = t(h, 2), y = T(v);
	At(y, {
		type: "button",
		variant: "outline",
		onclick: () => void u(n.onBrowse),
		get disabled() {
			return p(l);
		},
		get isLoading() {
			return p(l);
		},
		icon: "ri:upload-2-line",
		children: (e, t) => {
			E();
			var n = P();
			x(() => W(n, i())), j(e, n);
		},
		$$slots: { default: !0 }
	});
	var S = t(y, 2), C = (e) => {
		At(e, {
			type: "button",
			variant: "outline",
			onclick: () => void u(n.onCloudBrowse),
			get disabled() {
				return p(l);
			},
			get isLoading() {
				return p(l);
			},
			icon: "ri:cloud-line",
			children: (e, t) => {
				E();
				var n = P();
				x(() => W(n, a())), j(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(S, (e) => {
		n.onCloudBrowse && e(C);
	});
	var w = t(S, 2), D = (e) => {
		At(e, {
			type: "button",
			variant: "ghost",
			onclick: () => n.onClear(),
			icon: "ri:close-line",
			children: (e, t) => {
				E();
				var n = P();
				x(() => W(n, o())), j(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(w, (e) => {
		n.onClear && r() && e(D);
	}), g(v), g(d), j(e, d), b();
}
//#endregion
//#region ../ui/src/lib/components/input/input-file-path.svelte
var Ao = J("<div class=\"grid gap-2\"><!> <div class=\"flex flex-wrap items-center gap-2\"><!> <!> <!></div></div>");
function jo(e, n) {
	c(n, !0);
	let r = O(n, "value", 3, ""), i = O(n, "browseLabel", 3, "Browse"), a = O(n, "emptyFileLabel", 3, "No file selected"), o = O(n, "emptyFolderLabel", 3, "No folder selected"), s = O(n, "uploadLabel", 3, "Upload"), l = O(n, "cloudLabel", 3, "Cloud"), u = M(!1);
	async function d(e) {
		if (!p(u)) {
			G(u, !0);
			try {
				let t = await e();
				if (!t) return;
				n.onValueChange?.(t);
			} finally {
				G(u, !1);
			}
		}
	}
	var f = Ao(), m = T(f);
	{
		let e = K(() => n.placeholder ?? (n.mode === "folder" ? o() : a()));
		Eo(m, {
			get label() {
				return n.label;
			},
			get placeholder() {
				return p(e);
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
	var h = t(m, 2), _ = T(h), v = (e) => {
		At(e, {
			type: "button",
			variant: "outline",
			onclick: () => void d(n.onUpload),
			get disabled() {
				return p(u);
			},
			get isLoading() {
				return p(u);
			},
			icon: "ri:upload-2-line",
			children: (e, t) => {
				E();
				var n = P();
				x(() => W(n, s())), j(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(_, (e) => {
		n.onUpload && e(v);
	});
	var y = t(_, 2), S = (e) => {
		At(e, {
			type: "button",
			variant: "outline",
			onclick: () => void d(n.onCloudBrowse),
			get disabled() {
				return p(u);
			},
			get isLoading() {
				return p(u);
			},
			icon: "ri:cloud-line",
			children: (e, t) => {
				E();
				var n = P();
				x(() => W(n, l())), j(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(y, (e) => {
		n.onCloudBrowse && e(S);
	});
	var C = t(y, 2), w = (e) => {
		At(e, {
			type: "button",
			variant: "outline",
			onclick: () => void d(n.onBrowse),
			get disabled() {
				return p(u);
			},
			get isLoading() {
				return p(u);
			},
			icon: "ri:folder-open-line",
			children: (e, t) => {
				E();
				var n = P();
				x(() => W(n, i())), j(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(C, (e) => {
		!n.onUpload && !n.onCloudBrowse && e(w);
	}), g(h), g(f), j(e, f), b();
}
//#endregion
//#region ../ui/src/lib/components/input/input-hotkey.svelte
var Mo = J("<p> </p>"), No = J("<div class=\"grid w-full min-w-0 gap-2\"><!> <button type=\"button\"><!> <span><!></span></button> <!></div>");
function Po(n, r) {
	c(r, !0);
	let i = O(r, "placeholder", 3, "Click and press keys…");
	O(r, "required", 3, !1);
	let a = O(r, "value", 15, ""), o = O(r, "captureLabel", 3, "Press shortcut…"), s = O(r, "emptyLabel", 3, "Not set"), l = Fe(), u = M(!1);
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
	function m(e) {
		return e.trim() ? e.split("+").map((e) => e === "CommandOrControl" ? "Ctrl" : e).join(" + ") : "";
	}
	let h = K(() => a().trim() ? m(a()) : "");
	function _() {
		G(u, !0);
	}
	function v() {
		G(u, !1);
	}
	let y = (e) => {
		if (!p(u)) return;
		if (e.preventDefault(), e.stopPropagation(), e.key === "Escape") {
			v();
			return;
		}
		let t = f(e);
		t && (a(t), v());
	}, S = () => {
		v();
	};
	var C = No(), w = T(C), D = (e) => {
		Tr(e, {
			get for() {
				return l;
			},
			children: (e, t) => {
				E();
				var n = P();
				x(() => W(n, r.label)), j(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(w, (e) => {
		r.label && e(D);
	});
	var k = t(w, 2), I = T(k);
	Z(I, {
		icon: "ri:keyboard-line",
		class: "size-4 shrink-0 text-dark-200"
	});
	var L = t(I, 2), R = T(L), z = (e) => {
		var t = P();
		x(() => W(t, o())), j(e, t);
	}, B = (e) => {
		var t = P();
		x(() => W(t, p(h))), j(e, t);
	}, V = (e) => {
		var t = P();
		x(() => W(t, i() || s())), j(e, t);
	};
	F(R, (e) => {
		p(u) ? e(z) : p(h) ? e(B, 1) : e(V, -1);
	}), g(L), g(k);
	var H = t(k, 2), U = (e) => {
		var t = Mo(), n = T(t, !0);
		g(t), x(() => {
			N(t, 1, q(br)), W(n, r.error);
		}), j(e, t);
	};
	F(H, (e) => {
		r.error && e(U);
	}), g(C), x((t, n) => {
		e(k, "id", l), N(k, 1, t), N(L, 1, n);
	}, [() => q(Q("flex h-10 w-full items-center gap-2 rounded-xl border px-4 text-left text-sm", "bg-dark-800 focus:ring-2 focus:ring-ring focus:outline-none", p(u) && "ring-2 ring-ring", gr(r.error))), () => q(Q("truncate font-mono", !p(h) && "text-dark-300"))]), Y("click", k, _), Y("keydown", k, y), A("blur", k, S), j(n, C), b();
}
ne(["click", "keydown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-key-value-list.svelte
var Fo = J("<div class=\"grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] items-center gap-2\"><!> <!> <!></div>"), Io = J("<p class=\"text-sm text-destructive-50\"> </p>"), Lo = J("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function Ro(n, i) {
	c(i, !0);
	let a = O(i, "entries", 31, () => H([])), o = O(i, "keyPlaceholder", 3, "KEY"), s = O(i, "valuePlaceholder", 3, "value"), l = O(i, "id", 19, Fe), d = O(i, "addLabel", 3, "Add"), f = O(i, "removeLabel", 3, "Remove"), m = M(H([]));
	function h(e) {
		return e.map((e) => ({
			id: crypto.randomUUID(),
			key: e.key,
			value: e.value
		}));
	}
	function _() {
		a(p(m).map((e) => ({
			key: e.key,
			value: e.value
		})));
	}
	function v(e, t) {
		G(m, p(m).map((n) => n.id === e ? {
			...n,
			...t
		} : n), !0), _();
	}
	function y(e) {
		G(m, p(m).filter((t) => t.id !== e), !0), _();
	}
	function S() {
		G(m, [...p(m), {
			id: crypto.randomUUID(),
			key: "",
			value: ""
		}], !0), _();
	}
	u(() => {
		let e = a(), t = p(m).map((e) => ({
			key: e.key,
			value: e.value
		}));
		e.length === t.length && e.every((e, n) => e.key === t[n]?.key && e.value === t[n]?.value) || G(m, h(e), !0);
	});
	var C = Lo(), w = T(C), D = (e) => {
		{
			let t = K(() => `${l()}-label`);
			Tr(e, {
				get id() {
					return p(t);
				},
				children: (e, t) => {
					E();
					var n = P();
					x(() => W(n, i.label)), j(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	F(w, (e) => {
		i.label && e(D);
	});
	var k = t(w, 2), A = T(k);
	r(A, 17, () => p(m), (e) => e.id, (e, n) => {
		var r = Fo(), i = T(r);
		{
			let e = K(() => `${l()}-${p(n).id}-key`);
			Eo(i, {
				get id() {
					return p(e);
				},
				get placeholder() {
					return o();
				},
				get value() {
					return p(n).key;
				},
				oninput: (e) => v(p(n).id, { key: e.currentTarget.value })
			});
		}
		var a = t(i, 2);
		{
			let e = K(() => `${l()}-${p(n).id}-value`);
			Eo(a, {
				get id() {
					return p(e);
				},
				get placeholder() {
					return s();
				},
				get value() {
					return p(n).value;
				},
				oninput: (e) => v(p(n).id, { value: e.currentTarget.value })
			});
		}
		At(t(a, 2), {
			variant: "ghost",
			size: "icon",
			type: "button",
			get "aria-label"() {
				return f();
			},
			onclick: () => y(p(n).id),
			children: (e, t) => {
				Z(e, {
					icon: "ri:delete-bin-line",
					class: "size-5",
					"aria-hidden": "true"
				});
			},
			$$slots: { default: !0 }
		}), g(r), j(e, r);
	}), At(t(A, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: S,
		children: (e, t) => {
			E();
			var n = P();
			x(() => W(n, d())), j(e, n);
		},
		$$slots: { default: !0 }
	}), g(k);
	var I = t(k, 2), L = (e) => {
		var t = Io(), n = T(t, !0);
		g(t), x(() => W(n, i.error)), j(e, t);
	};
	F(I, (e) => {
		i.error && e(L);
	}), g(C), x((t) => {
		N(C, 1, t), e(C, "aria-labelledby", i.label ? `${l()}-label` : void 0);
	}, [() => q(Q("grid w-full gap-2", i.class))]), j(n, C), b();
}
//#endregion
//#region ../ui/src/lib/components/input/input-one-of.svelte
var zo = J("<span aria-hidden=\"true\">*</span>"), Bo = J(" <!>", 1), Vo = J("<button type=\"button\" role=\"tab\"> </button>"), Ho = J("<p> </p>"), Uo = J("<div><!> <div role=\"tablist\"></div> <div class=\"min-w-0\" role=\"tabpanel\"><!></div> <!></div>");
function Wo(n, i) {
	c(i, !0);
	let a = O(i, "value", 31, () => H({
		variant: "",
		values: {}
	})), o = K(() => a().variant || i.variants[0]?.id || "");
	function s(e) {
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
	var u = Uo(), d = T(u), f = (e) => {
		Tr(e, {
			children: (e, n) => {
				E();
				var r = Bo(), a = h(r), o = t(a), s = (e) => {
					var t = zo();
					x(() => N(t, 1, q(xr))), j(e, t);
				};
				F(o, (e) => {
					i.required && e(s);
				}), x(() => W(a, `${i.label ?? ""} `)), j(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	F(d, (e) => {
		i.label && e(f);
	});
	var m = t(d, 2);
	r(m, 21, () => i.variants, (e) => e.id, (t, n) => {
		var r = Vo(), i = T(r, !0);
		g(r), x((t) => {
			e(r, "id", `tab-${p(n).id}`), e(r, "aria-selected", p(o) === p(n).id), e(r, "aria-controls", `panel-${p(n).id}`), N(r, 1, t), W(i, p(n).label);
		}, [() => q(Q("cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors", p(o) === p(n).id ? "bg-dark-600 text-dark-50" : "text-dark-200 hover:bg-dark-800 hover:text-dark-50"))]), Y("click", r, () => s(p(n).id)), j(t, r);
	}), g(m);
	var v = t(m, 2);
	_(T(v), () => i.panel, () => ({
		variantId: p(o),
		value: a().values[p(o)],
		setValue: (e) => l(p(o), e)
	})), g(v);
	var y = t(v, 2), S = (e) => {
		var t = Ho(), n = T(t, !0);
		g(t), x(() => {
			N(t, 1, q(br)), W(n, i.error);
		}), j(e, t);
	};
	F(y, (e) => {
		i.error && e(S);
	}), g(u), x((t, n) => {
		N(u, 1, t), N(m, 1, n), e(m, "aria-label", i.label), e(v, "id", `panel-${p(o)}`), e(v, "aria-labelledby", `tab-${p(o)}`);
	}, [() => q(Q("grid w-full min-w-0 gap-3")), () => q(Q("inline-flex w-fit gap-0.5 rounded-xl border border-border bg-dark-800 p-1", i.error && "border-destructive"))]), j(n, u), b();
}
ne(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-select-text.svelte
var Go = new Set([
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
]), Ko = J("<!> <!>", 1), qo = J("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Jo = J(" <!>", 1), Yo = J("<!> <!> <!>", 1), Xo = J("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), Zo = J("<ul class=\"absolute top-full left-0 z-[100] mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), Qo = J("<p> </p>"), $o = J("<div><!> <div><!> <div class=\"relative min-w-0 flex-1\"><input/> <!></div></div> <!></div>");
function es(o, s) {
	c(s, !0);
	let l = O(s, "variables", 19, () => []), u = O(s, "id", 19, Fe), d = O(s, "value", 31, () => H({
		type: "",
		value: ""
	})), f = U(s, Go), m = K(() => s.selectPlaceholder ?? "Select"), _ = K(() => s.loadingPlaceholder ?? "Loading..."), v = Ya(() => s.items), y = M(null), S = M(!1), C = M(""), D = M(0), k = K(() => {
		if (!p(C)) return l();
		let e = p(C).toLowerCase();
		return l().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function A() {
		if (!p(y)) return null;
		let e = d().value, t = p(y).selectionStart ?? e.length, n = e.slice(0, t), r = n.lastIndexOf("{");
		if (r === -1) return null;
		let i = n.slice(r + 1);
		return i.includes("}") ? null : {
			start: r,
			partial: i
		};
	}
	function I() {
		let e = A();
		if (!e || l().length === 0) {
			G(S, !1), G(C, ""), G(D, 0);
			return;
		}
		G(C, e.partial, !0), G(S, p(k).length > 0), G(D, 0);
	}
	function R(e) {
		let t = A();
		if (!t || !p(y)) return;
		let n = d().value, r = p(y).selectionStart ?? n.length, i = n.slice(0, t.start), a = n.slice(r);
		d({
			...d(),
			value: `${i}{${e}}${a}`
		}), G(S, !1), G(C, ""), queueMicrotask(() => {
			if (!p(y)) return;
			let t = i.length + e.length + 2;
			p(y).focus(), p(y).setSelectionRange(t, t);
		});
	}
	let z = () => {
		I();
	}, B = (e) => {
		if (!(!p(S) || p(k).length === 0)) {
			if (e.key === "ArrowDown") {
				e.preventDefault(), G(D, (p(D) + 1) % p(k).length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault(), G(D, (p(D) - 1 + p(k).length) % p(k).length);
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				let t = p(k)[p(D)];
				t && (e.preventDefault(), R(t.key));
				return;
			}
			e.key === "Escape" && G(S, !1);
		}
	}, V = () => {
		setTimeout(() => {
			G(S, !1);
		}, 120);
	};
	var J = $o(), te = T(J), ne = (e) => {
		Tr(e, {
			get for() {
				return u();
			},
			children: (e, t) => {
				E();
				var n = P();
				x(() => W(n, s.label)), j(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(te, (e) => {
		s.label && e(ne);
	});
	var re = t(te, 2), ie = T(re);
	n(ie, () => Kn, (e, i) => {
		i(e, {
			type: "single",
			get items() {
				return v.items;
			},
			get value() {
				return d().type;
			},
			set value(e) {
				d(d().type = e, !0);
			},
			children: (e, i) => {
				var a = Ko(), o = h(a);
				{
					let e = K(() => Q("flex shrink-0 cursor-pointer items-center justify-between gap-2 rounded-l-xl border border-r-0 outline-none", fr, Sr, He.md, gr(s.error), s.selectClass));
					n(o, () => Qn, (r, i) => {
						i(r, {
							get class() {
								return p(e);
							},
							children: (e, r) => {
								var i = Ko(), a = h(i);
								{
									let e = K(() => v.loading ? p(_) : p(m));
									n(a, () => Yn, (t, n) => {
										n(t, {
											get placeholder() {
												return p(e);
											},
											class: "truncate data-placeholder:text-dark-300"
										});
									});
								}
								Z(t(a, 2), {
									icon: "ri:expand-up-down-line",
									class: "size-5 shrink-0 text-dark-300"
								}), j(e, i);
							},
							$$slots: { default: !0 }
						});
					});
				}
				n(t(o, 2), () => bt, (e, i) => {
					i(e, {
						children: (e, i) => {
							var a = L(), o = h(a);
							{
								let e = K(() => s.contentProps?.sideOffset ?? 4), i = K(() => Q("z-[100] max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", s.contentProps?.class));
								n(o, () => Sn, (a, o) => {
									o(a, ee(() => s.contentProps, {
										get sideOffset() {
											return p(e);
										},
										get class() {
											return p(i);
										},
										children: (e, i) => {
											var a = Yo(), o = h(a);
											n(o, () => zn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = t(o, 2);
											n(s, () => jn, (e, i) => {
												i(e, {
													children: (e, i) => {
														var a = L(), o = h(a), s = (e) => {
															var t = qo(), n = T(t, !0);
															g(t), x(() => W(n, p(_))), j(e, t);
														}, c = (e) => {
															var i = L();
															r(h(i), 17, () => v.items, ({ value: e, label: t, disabled: n }) => e, (e, r) => {
																let i = () => p(r).value, a = () => p(r).label, o = () => p(r).disabled;
																var s = L(), c = h(s);
																{
																	let e = (e, n) => {
																		let r = () => n?.().selected;
																		E();
																		var i = Jo(), o = h(i), s = t(o), c = (e) => {
																			Z(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		F(s, (e) => {
																			r() && e(c);
																		}), x(() => W(o, `${a() ?? ""} `)), j(e, i);
																	}, r = K(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	n(c, () => Dn, (t, n) => {
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
																				return p(r);
																			},
																			children: e,
																			$$slots: { default: !0 }
																		});
																	});
																}
																j(e, s);
															}), j(e, i);
														};
														F(o, (e) => {
															v.loading ? e(s) : e(c, -1);
														}), j(e, a);
													},
													$$slots: { default: !0 }
												});
											}), n(t(s, 2), () => Fn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), j(e, a);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							j(e, a);
						},
						$$slots: { default: !0 }
					});
				}), j(e, a);
			},
			$$slots: { default: !0 }
		});
	});
	var X = t(ie, 2), ae = T(X);
	w(ae, (e) => ({
		id: u(),
		placeholder: s.placeholder,
		class: e,
		"aria-invalid": s.error ? !0 : void 0,
		oninput: l().length > 0 ? z : void 0,
		onkeydown: l().length > 0 ? B : void 0,
		onblur: l().length > 0 ? V : void 0,
		onfocus: l().length > 0 ? I : void 0,
		onclick: l().length > 0 ? I : void 0,
		...f
	}), [() => Q("min-w-0 w-full truncate rounded-r-xl border outline-none", fr, Sr, He.md, gr(s.error))], void 0, void 0, void 0, !0), i(ae, (e) => G(y, e), () => p(y));
	var oe = t(ae, 2), se = (n) => {
		var i = Zo();
		r(i, 23, () => p(k), (e) => e.key, (n, r, i) => {
			var a = Xo(), o = T(a), s = T(o), c = T(s, !0);
			g(s);
			var l = t(s, 2), u = T(l, !0);
			g(l), g(o), g(a), x((t) => {
				e(o, "aria-selected", p(i) === p(D)), N(o, 1, t), W(c, `{${p(r).key}}`), W(u, p(r).label);
			}, [() => q(Q("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", p(i) === p(D) && "bg-dark-700"))]), Y("mousedown", o, (e) => {
				e.preventDefault(), R(p(r).key);
			}), j(n, a);
		}), g(i), j(n, i);
	};
	F(oe, (e) => {
		p(S) && p(k).length > 0 && e(se);
	}), g(X), g(re);
	var ce = t(re, 2), le = (e) => {
		var t = Qo(), n = T(t, !0);
		g(t), x(() => {
			N(t, 1, q(br)), W(n, s.error);
		}), j(e, t);
	};
	F(ce, (e) => {
		s.error && e(le);
	}), g(J), x((e, t) => {
		N(J, 1, e), N(re, 1, t);
	}, [() => q(Q("relative grid w-full min-w-0 gap-2", s.class)), () => q(Q("flex w-full min-w-0 items-stretch rounded-xl", pr, vr(s.error)))]), a(ae, () => d().value, (e) => d(d().value = e, !0)), j(o, J), b();
}
ne(["mousedown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-slider.svelte
var ts = J("<div class=\"flex items-center justify-between gap-4\"><!> <span class=\"text-sm text-dark-100\"> </span></div>"), ns = J("<p> </p>"), rs = J("<div><!> <input type=\"range\"/> <!></div>");
function is(n, r) {
	c(r, !0);
	let i = O(r, "id", 19, Fe), o = O(r, "min", 3, 0), s = O(r, "max", 3, 100), l = O(r, "step", 3, 1), u = O(r, "value", 15, 0), d = O(r, "unit", 3, "%");
	var f = rs(), p = T(f), h = (e) => {
		var n = ts(), a = T(n);
		Tr(a, {
			get for() {
				return i();
			},
			children: (e, t) => {
				E();
				var n = P();
				x(() => W(n, r.label)), j(e, n);
			},
			$$slots: { default: !0 }
		});
		var o = t(a, 2), s = T(o);
		g(o), g(n), x(() => W(s, `${u() ?? ""}${d() ?? ""}`)), j(e, n);
	};
	F(p, (e) => {
		r.label && e(h);
	});
	var _ = t(p, 2);
	m(_);
	var v = t(_, 2), y = (e) => {
		var t = ns(), n = T(t, !0);
		g(t), x(() => {
			N(t, 1, q(br)), W(n, r.error);
		}), j(e, t);
	};
	F(v, (e) => {
		r.error && e(y);
	}), g(f), x((t, n) => {
		N(f, 1, t), e(_, "id", i()), e(_, "min", o()), e(_, "max", s()), e(_, "step", l()), N(_, 1, n);
	}, [() => q(Q("grid w-full gap-2")), () => q(Q("h-2 w-full cursor-pointer appearance-none rounded-full bg-dark-600 accent-primary", r.error && "ring-1 ring-destructive"))]), Y("input", _, () => r.onvaluechange?.(u())), a(_, u), j(n, f), b();
}
ne(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-switch.svelte
var as = J("<p> </p>"), os = J("<div><div class=\"flex items-center gap-3\"><!> <!></div> <!></div>");
function ss(e, r) {
	c(r, !0);
	let i = O(r, "checked", 15, !1), a = O(r, "id", 19, Fe);
	var o = os(), s = T(o), l = T(s);
	{
		let e = K(() => r.label ? `${a()}-label` : void 0), t = K(() => r.error ? !0 : void 0), o = K(() => Q("inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors outline-none", "data-[state=checked]:bg-primary/15", r.error ? "data-[state=unchecked]:bg-destructive/30" : "data-[state=unchecked]:bg-dark-600", Cr, "disabled:cursor-not-allowed disabled:opacity-50"));
		n(l, () => cr, (r, s) => {
			s(r, {
				get id() {
					return a();
				},
				get "aria-labelledby"() {
					return p(e);
				},
				get "aria-invalid"() {
					return p(t);
				},
				get class() {
					return p(o);
				},
				get checked() {
					return i();
				},
				set checked(e) {
					i(e);
				},
				children: (e, t) => {
					var r = L(), i = h(r);
					{
						let e = K(() => Q("pointer-events-none block size-5 shrink-0 rounded-full bg-white transition-transform", "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0", "data-[state=checked]:bg-primary"));
						n(i, () => dr, (t, n) => {
							n(t, { get class() {
								return p(e);
							} });
						});
					}
					j(e, r);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var u = t(l, 2), d = (e) => {
		Tr(e, {
			get id() {
				return `${a() ?? ""}-label`;
			},
			get for() {
				return a();
			},
			class: "cursor-pointer",
			children: (e, t) => {
				E();
				var n = P();
				x(() => W(n, r.label)), j(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(u, (e) => {
		r.label && e(d);
	}), g(s);
	var f = t(s, 2), m = (e) => {
		var t = as(), n = T(t, !0);
		g(t), x(() => {
			N(t, 1, q(br)), W(n, r.error);
		}), j(e, t);
	};
	F(f, (e) => {
		r.error && e(m);
	}), g(o), x((e) => N(o, 1, e), [() => q(Q("grid gap-2", r.class))]), j(e, o), b();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-list.svelte
var cs = J("<div class=\"flex items-center gap-2\"><!> <!></div>"), ls = J("<p class=\"text-sm text-destructive-50\"> </p>"), us = J("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function ds(n, i) {
	c(i, !0);
	let a = O(i, "values", 31, () => H([])), o = O(i, "id", 19, Fe), s = O(i, "addLabel", 3, "Add"), l = O(i, "removeLabel", 3, "Remove"), d = M(H([]));
	function f(e) {
		return e.map((e) => ({
			id: crypto.randomUUID(),
			value: e
		}));
	}
	function m() {
		a(p(d).map((e) => e.value));
	}
	function h(e, t) {
		G(d, p(d).map((n) => n.id === e ? {
			...n,
			value: t
		} : n), !0), m();
	}
	function _(e) {
		G(d, p(d).filter((t) => t.id !== e), !0), m();
	}
	function v() {
		G(d, [...p(d), {
			id: crypto.randomUUID(),
			value: ""
		}], !0), m();
	}
	u(() => {
		let e = a(), t = p(d).map((e) => e.value);
		e.length === t.length && e.every((e, n) => e === t[n]) || G(d, f(e), !0);
	});
	var y = us(), S = T(y), C = (e) => {
		{
			let t = K(() => `${o()}-label`);
			Tr(e, {
				get id() {
					return p(t);
				},
				children: (e, t) => {
					E();
					var n = P();
					x(() => W(n, i.label)), j(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	F(S, (e) => {
		i.label && e(C);
	});
	var w = t(S, 2), D = T(w);
	r(D, 17, () => p(d), (e) => e.id, (e, n) => {
		var r = cs(), a = T(r);
		{
			let e = K(() => `${o()}-${p(n).id}`);
			Eo(a, {
				get id() {
					return p(e);
				},
				get placeholder() {
					return i.placeholder;
				},
				get value() {
					return p(n).value;
				},
				oninput: (e) => h(p(n).id, e.currentTarget.value)
			});
		}
		At(t(a, 2), {
			variant: "ghost",
			size: "icon",
			type: "button",
			get "aria-label"() {
				return l();
			},
			onclick: () => _(p(n).id),
			children: (e, t) => {
				Z(e, {
					icon: "ri:delete-bin-line",
					class: "size-5",
					"aria-hidden": "true"
				});
			},
			$$slots: { default: !0 }
		}), g(r), j(e, r);
	}), At(t(D, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: v,
		children: (e, t) => {
			E();
			var n = P();
			x(() => W(n, s())), j(e, n);
		},
		$$slots: { default: !0 }
	}), g(w);
	var k = t(w, 2), A = (e) => {
		var t = ls(), n = T(t, !0);
		g(t), x(() => W(n, i.error)), j(e, t);
	};
	F(k, (e) => {
		i.error && e(A);
	}), g(y), x((t) => {
		N(y, 1, t), e(y, "aria-labelledby", i.label ? `${o()}-label` : void 0);
	}, [() => q(Q("grid w-full gap-2", i.class))]), j(n, y), b();
}
//#endregion
//#region ../ui/src/lib/components/input/use-dropdown-scroll.svelte.ts
var fs = class {
	#e = M(0);
	get scrollTop() {
		return p(this.#e);
	}
	set scrollTop(e) {
		G(this.#e, e, !0);
	}
	#t = M(null);
	get viewportRef() {
		return p(this.#t);
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
		let t = $a(e);
		this.scrollTop = t, this.viewportRef && (this.viewportRef.scrollTop = t);
	}
	scrollToValue(e, t) {
		if (!t) return;
		let n = e.findIndex((e) => e.value === t);
		n >= 0 && this.scrollToIndex(n);
	}
}, ps = J("<div class=\"relative w-full\"><div class=\"absolute inset-x-0 top-0\"></div></div>");
function ms(e, t) {
	c(t, !0);
	let n = O(t, "viewportHeight", 3, 200), i = K(() => Qa(t.items.length)), a = K(() => p(i) ? Za(t.items, t.scrollTop, n()) : null), o = K(() => p(i) && p(a) ? p(a).items : t.items);
	var s = L(), l = h(s), u = (e) => {
		var n = ps();
		let i;
		var s = T(n);
		let c;
		r(s, 21, () => p(o), (e) => e.value, (e, n) => {
			var r = L();
			_(h(r), () => t.item, () => p(n)), j(e, r);
		}), g(s), g(n), x(() => {
			i = te(n, "", i, { height: `${p(a).totalHeight}px` }), c = te(s, "", c, { transform: `translateY(${p(a).offsetY}px)` });
		}), j(e, n);
	}, d = (e) => {
		var n = L();
		r(h(n), 17, () => p(o), (e) => e.value, (e, n) => {
			var r = L();
			_(h(r), () => t.item, () => p(n)), j(e, r);
		}), j(e, n);
	};
	F(l, (e) => {
		p(i) && p(a) ? e(u) : e(d, -1);
	}), j(e, s), b();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-select.svelte
var hs = (e, r = V) => {
	let i = K(() => r().value), a = K(() => r().label), o = K(() => r().disabled);
	var s = L(), c = h(s);
	{
		let e = (e, n) => {
			let r = () => n?.().selected;
			E();
			var i = _s(), o = h(i), s = t(o), c = (e) => {
				Z(e, {
					icon: "ri:check-line",
					class: "size-5 text-primary"
				});
			};
			F(s, (e) => {
				r() && e(c);
			}), x(() => W(o, `${p(a) ?? ""} `)), j(e, i);
		}, r = K(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
		n(c, () => Dn, (t, n) => {
			n(t, {
				get value() {
					return p(i);
				},
				get label() {
					return p(a);
				},
				get disabled() {
					return p(o);
				},
				get class() {
					return p(r);
				},
				children: e,
				$$slots: { default: !0 }
			});
		});
	}
	j(e, s);
}, gs = new Set([
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
]), _s = J(" <!>", 1), vs = J("<span>*</span>"), ys = J("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), bs = J("<div class=\"px-3 py-1.5 text-sm text-dark-300\"></div>"), xs = J("<!> <!> <!>", 1), Ss = J("<div><div class=\"min-w-0 flex-1\"><!></div> <button type=\"button\" aria-haspopup=\"listbox\"><!></button></div> <!>", 1), Cs = J("<p> </p>"), ws = J("<div><!> <!> <!></div>");
function Ts(r, i) {
	c(i, !0);
	let a = O(i, "allowCustomValue", 3, !0), s = O(i, "id", 19, Fe), l = O(i, "value", 15, ""), u = U(i, gs), f = K(() => i.placeholder), m = K(() => i.loadingPlaceholder ?? "Loading..."), _ = K(() => i.selectAriaLabel ?? "Select value"), v = M(!1), y = M(""), S = M(!1), C = new fs(), w = Ya(() => i.items, () => i.reloadKey?.()), D = new Ua(() => p(y), 100), k = K(() => new Map(w.items.map((e) => [e.value, e]))), A = K(() => p(k).get(l())), P = K(() => p(A)?.value ?? ""), I = K(() => {
		if (w.loading) return [];
		if (!p(S)) return w.items;
		let e = D.current.trim();
		return e ? Xa(w.items, e) : w.items;
	}), R = K(() => p(A) && !p(I).some((e) => e.value === p(A).value) ? [p(A), ...p(I)] : p(I));
	function z() {
		p(S) || G(y, p(A)?.label ?? (a() ? l() : ""), !0);
	}
	o(() => {
		l(), p(A)?.label, z();
	}), o(() => {
		D.current, p(v) && C.resetScroll();
	});
	function B() {
		G(v, p(I).length > 0 || w.items.length > 0, !0);
	}
	function V(e) {
		G(y, e.currentTarget.value, !0), G(S, !0), a() && l(p(y)), B();
	}
	function H() {
		G(v, !0);
	}
	function J() {
		G(S, !1), z();
	}
	async function te(e) {
		if (G(v, e, !0), !e) {
			G(S, !1), C.resetScroll(), z();
			return;
		}
		await d(), C.scrollToValue(p(I), l());
	}
	function ne() {
		G(v, !0);
	}
	let re = K(() => Me(u, {
		id: s(),
		placeholder: w.loading ? p(m) : p(f),
		autocomplete: "off",
		class: Q("min-w-0 w-full truncate rounded-l-xl border border-r-0 outline-none", fr, Sr, He.md, gr(i.error)),
		"aria-invalid": i.error ? !0 : void 0,
		oninput: V,
		onfocus: H,
		onblur: J
	}));
	var ie = ws(), X = T(ie), ae = (e) => {
		Tr(e, {
			get for() {
				return s();
			},
			children: (e, n) => {
				E();
				var r = _s(), a = h(r), o = t(a), s = (e) => {
					var t = vs();
					x(() => N(t, 1, q(xr))), j(e, t);
				};
				F(o, (e) => {
					i.required && e(s);
				}), x(() => W(a, `${i.label ?? ""} `)), j(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	F(X, (e) => {
		i.label && e(ae);
	});
	var oe = t(X, 2);
	{
		let r = K(() => !!i.disabled);
		n(oe, () => gn, (a, o) => {
			o(a, {
				type: "single",
				get items() {
					return p(R);
				},
				get inputValue() {
					return p(y);
				},
				get value() {
					return p(P);
				},
				onValueChange: (e) => {
					e && (l(e), G(S, !1), G(v, !1), z());
				},
				onOpenChange: te,
				get disabled() {
					return p(r);
				},
				get open() {
					return p(v);
				},
				set open(e) {
					G(v, e, !0);
				},
				children: (r, a) => {
					var o = Ss(), s = h(o), c = T(s);
					n(T(c), () => yn, (e, t) => {
						t(e, ee(() => p(re)));
					}), g(c);
					var l = t(c, 2);
					Z(T(l), {
						icon: "ri:expand-up-down-line",
						class: "size-5 shrink-0 text-dark-300"
					}), g(l), g(s), n(t(s, 2), () => bt, (e, r) => {
						r(e, {
							children: (e, r) => {
								var a = L(), o = h(a);
								{
									let e = K(() => i.contentProps?.sideOffset ?? 4), r = K(() => Q("z-[100] max-h-84 min-w-(--bits-combobox-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", i.contentProps?.class));
									n(o, () => Sn, (a, o) => {
										o(a, ee(() => i.contentProps, {
											get sideOffset() {
												return p(e);
											},
											get class() {
												return p(r);
											},
											children: (e, r) => {
												var i = xs(), a = h(i);
												n(a, () => zn, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															Z(e, { icon: "ri:arrow-up-s-line" });
														},
														$$slots: { default: !0 }
													});
												});
												var o = t(a, 2);
												n(o, () => jn, (e, t) => {
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
															var n = L(), r = h(n), i = (e) => {
																var t = ys(), n = T(t, !0);
																g(t), x(() => W(n, p(m))), j(e, t);
															}, a = (e) => {
																ms(e, {
																	get items() {
																		return p(I);
																	},
																	get scrollTop() {
																		return C.scrollTop;
																	},
																	get item() {
																		return hs;
																	}
																});
															}, o = (e) => {
																var t = bs();
																t.textContent = "No matches found", j(e, t);
															};
															F(r, (e) => {
																w.loading ? e(i) : p(I).length > 0 ? e(a, 1) : e(o, -1);
															}), j(e, n);
														},
														$$slots: { default: !0 }
													});
												}), n(t(o, 2), () => Fn, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															Z(e, { icon: "ri:arrow-down-s-line" });
														},
														$$slots: { default: !0 }
													});
												}), j(e, i);
											},
											$$slots: { default: !0 }
										}));
									});
								}
								j(e, a);
							},
							$$slots: { default: !0 }
						});
					}), x((t, n) => {
						N(s, 1, t), e(l, "aria-label", p(_)), e(l, "aria-expanded", p(v)), l.disabled = !!i.disabled, N(l, 1, n);
					}, [() => q(Q("flex w-full min-w-0 items-stretch rounded-xl", pr, vr(i.error))), () => q(Q("flex shrink-0 cursor-pointer items-center justify-center rounded-r-xl border outline-none", fr, Sr, He.md, gr(i.error), i.selectClass))]), Y("click", l, ne), j(r, o);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var se = t(oe, 2), ce = (e) => {
		var t = Cs(), n = T(t, !0);
		g(t), x(() => {
			N(t, 1, q(br)), W(n, i.error);
		}), j(e, t);
	};
	F(se, (e) => {
		i.error && e(ce);
	}), g(ie), x((e) => N(ie, 1, e), [() => q(Q("relative grid w-full min-w-0 gap-2", i.class))]), j(r, ie), b();
}
ne(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-select-text.svelte
var Es = new Set([
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
]), Ds = J("<!> <!>", 1), Os = J("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), ks = J(" <!>", 1), As = J("<!> <!> <!>", 1), js = J("<div aria-hidden=\"true\">—</div>"), Ms = J("<input/>"), Ns = J("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), Ps = J("<ul class=\"absolute top-full left-0 z-[100] mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), Fs = J("<div class=\"flex shrink-0 items-center self-center\"><!></div>"), Is = J("<p> </p>"), Ls = J("<div><!> <div class=\"flex items-center gap-3\"><div><input/> <!> <!> <!></div> <!></div> <!></div>");
function Rs(o, s) {
	c(s, !0);
	let l = O(s, "variables", 19, () => []), u = O(s, "valuelessOperators", 19, () => []), d = O(s, "id", 19, Fe), f = O(s, "value", 31, () => H({
		path: "",
		type: "equals",
		value: ""
	})), v = U(s, Es), y = K(() => s.selectPlaceholder ?? "Select"), S = K(() => s.loadingPlaceholder ?? "Loading..."), D = Ya(() => s.items), k = M(null), I = M(null), R = M("path"), z = M(!1), B = M(""), V = M(0), J = K(() => {
		if (!p(B)) return l();
		let e = p(B).toLowerCase();
		return l().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function te(e) {
		return p(e === "path" ? k : I);
	}
	function ne(e) {
		return e === "path" ? f().path : f().value;
	}
	function re(e, t) {
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
	function ie(e) {
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
	function X(e) {
		G(R, e, !0);
		let t = ie(e);
		if (!t || l().length === 0) {
			G(z, !1), G(B, ""), G(V, 0);
			return;
		}
		G(B, t.partial, !0), G(z, p(J).length > 0), G(V, 0);
	}
	function ae(e, t = p(R)) {
		let n = ie(t), r = te(t);
		if (!n || !r) return;
		let i = ne(t), a = r.selectionStart ?? i.length, o = i.slice(0, n.start);
		re(t, `${o}{${e}}${i.slice(a)}`), G(z, !1), G(B, ""), queueMicrotask(() => {
			if (!r) return;
			let t = o.length + e.length + 2;
			r.focus(), r.setSelectionRange(t, t);
		});
	}
	let oe = (e) => ({
		handleInput: () => {
			X(e);
		},
		handleKeydown: (t) => {
			if (!(!p(z) || p(J).length === 0 || p(R) !== e)) {
				if (t.key === "ArrowDown") {
					t.preventDefault(), G(V, (p(V) + 1) % p(J).length);
					return;
				}
				if (t.key === "ArrowUp") {
					t.preventDefault(), G(V, (p(V) - 1 + p(J).length) % p(J).length);
					return;
				}
				if (t.key === "Enter" || t.key === "Tab") {
					let n = p(J)[p(V)];
					n && (t.preventDefault(), ae(n.key, e));
					return;
				}
				t.key === "Escape" && G(z, !1);
			}
		},
		handleBlur: () => {
			se && clearTimeout(se), se = setTimeout(() => {
				G(z, !1), se = void 0;
			}, 120);
		}
	}), se;
	C(() => {
		se && clearTimeout(se);
	});
	let ce = oe("path"), le = oe("value"), ue = K(() => gr(s.error)), $ = K(() => u().includes(f().type));
	var de = Ls(), fe = T(de), pe = (e) => {
		Tr(e, {
			get for() {
				return d();
			},
			children: (e, t) => {
				E();
				var n = P();
				x(() => W(n, s.label)), j(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(fe, (e) => {
		s.label && e(pe);
	});
	var me = t(fe, 2), he = T(me), ge = T(he);
	w(ge, (e) => ({
		id: d(),
		placeholder: s.pathPlaceholder,
		class: e,
		"aria-invalid": s.error ? !0 : void 0,
		role: l().length > 0 ? "combobox" : void 0,
		"aria-autocomplete": l().length > 0 ? "list" : void 0,
		"aria-expanded": l().length > 0 ? p(z) && p(R) === "path" && p(J).length > 0 : void 0,
		"aria-controls": l().length > 0 ? `${d()}-listbox` : void 0,
		"aria-activedescendant": p(z) && p(R) === "path" && p(J).length > 0 ? `${d()}-option-${p(V)}` : void 0,
		oninput: l().length > 0 ? ce.handleInput : void 0,
		onkeydown: l().length > 0 ? ce.handleKeydown : void 0,
		onblur: l().length > 0 ? ce.handleBlur : void 0,
		onfocus: l().length > 0 ? () => X("path") : void 0,
		onclick: l().length > 0 ? () => X("path") : void 0,
		...v
	}), [() => Q("min-w-0 flex-1 truncate border border-r outline-none", "rounded-l-xl", fr, Sr, He.md, p(ue))], void 0, void 0, void 0, !0), i(ge, (e) => G(k, e), () => p(k));
	var _e = t(ge, 2);
	n(_e, () => Kn, (e, i) => {
		i(e, {
			type: "single",
			get items() {
				return D.items;
			},
			get value() {
				return f().type;
			},
			set value(e) {
				f(f().type = e, !0);
			},
			children: (e, i) => {
				var a = Ds(), o = h(a);
				{
					let e = K(() => Q("flex shrink-0 cursor-pointer items-center justify-between gap-2 border border-x-0 outline-none", fr, Sr, He.md, p(ue), s.selectClass ?? "w-32"));
					n(o, () => Qn, (r, i) => {
						i(r, {
							get class() {
								return p(e);
							},
							children: (e, r) => {
								var i = Ds(), a = h(i);
								{
									let e = K(() => D.loading ? p(S) : p(y));
									n(a, () => Yn, (t, n) => {
										n(t, {
											get placeholder() {
												return p(e);
											},
											class: "truncate data-placeholder:text-dark-300"
										});
									});
								}
								Z(t(a, 2), {
									icon: "ri:expand-up-down-line",
									class: "size-5 shrink-0 text-dark-300"
								}), j(e, i);
							},
							$$slots: { default: !0 }
						});
					});
				}
				n(t(o, 2), () => bt, (e, i) => {
					i(e, {
						children: (e, i) => {
							var a = L(), o = h(a);
							{
								let e = K(() => s.contentProps?.sideOffset ?? 4), i = K(() => Q("z-[100] max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", s.contentProps?.class));
								n(o, () => Sn, (a, o) => {
									o(a, ee(() => s.contentProps, {
										get sideOffset() {
											return p(e);
										},
										get class() {
											return p(i);
										},
										children: (e, i) => {
											var a = As(), o = h(a);
											n(o, () => zn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = t(o, 2);
											n(s, () => jn, (e, i) => {
												i(e, {
													children: (e, i) => {
														var a = L(), o = h(a), s = (e) => {
															var t = Os(), n = T(t, !0);
															g(t), x(() => W(n, p(S))), j(e, t);
														}, c = (e) => {
															var i = L();
															r(h(i), 17, () => D.items, ({ value: e, label: t, disabled: n }) => e, (e, r) => {
																let i = () => p(r).value, a = () => p(r).label, o = () => p(r).disabled;
																var s = L(), c = h(s);
																{
																	let e = (e, n) => {
																		let r = () => n?.().selected;
																		E();
																		var i = ks(), o = h(i), s = t(o), c = (e) => {
																			Z(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		F(s, (e) => {
																			r() && e(c);
																		}), x(() => W(o, `${a() ?? ""} `)), j(e, i);
																	}, r = K(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	n(c, () => Dn, (t, n) => {
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
																				return p(r);
																			},
																			children: e,
																			$$slots: { default: !0 }
																		});
																	});
																}
																j(e, s);
															}), j(e, i);
														};
														F(o, (e) => {
															D.loading ? e(s) : e(c, -1);
														}), j(e, a);
													},
													$$slots: { default: !0 }
												});
											}), n(t(s, 2), () => Fn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), j(e, a);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							j(e, a);
						},
						$$slots: { default: !0 }
					});
				}), j(e, a);
			},
			$$slots: { default: !0 }
		});
	});
	var ve = t(_e, 2), ye = (e) => {
		var t = js();
		x((e) => N(t, 1, e), [() => q(Q("flex min-w-0 items-center rounded-r-xl border border-l-0 px-3 text-dark-500 select-none", fr, He.md, p(ue)))]), j(e, t);
	}, be = (t) => {
		var n = Ms();
		m(n), i(n, (e) => G(I, e), () => p(I)), x((t) => {
			e(n, "placeholder", s.valuePlaceholder), N(n, 1, t), e(n, "aria-invalid", s.error ? !0 : void 0), e(n, "role", l().length > 0 ? "combobox" : void 0), e(n, "aria-autocomplete", l().length > 0 ? "list" : void 0), e(n, "aria-expanded", l().length > 0 ? p(z) && p(R) === "value" && p(J).length > 0 : void 0), e(n, "aria-controls", l().length > 0 ? `${d()}-listbox` : void 0), e(n, "aria-activedescendant", p(z) && p(R) === "value" && p(J).length > 0 ? `${d()}-option-${p(V)}` : void 0);
		}, [() => q(Q("min-w-0 flex-1 truncate rounded-r-xl border outline-none", fr, Sr, He.md, p(ue)))]), Y("input", n, function(...e) {
			(l().length > 0 ? le.handleInput : void 0)?.apply(this, e);
		}), Y("keydown", n, function(...e) {
			(l().length > 0 ? le.handleKeydown : void 0)?.apply(this, e);
		}), A("blur", n, function(...e) {
			(l().length > 0 ? le.handleBlur : void 0)?.apply(this, e);
		}), A("focus", n, function(...e) {
			(l().length > 0 ? () => X("value") : void 0)?.apply(this, e);
		}), Y("click", n, function(...e) {
			(l().length > 0 ? () => X("value") : void 0)?.apply(this, e);
		}), a(n, () => f().value, (e) => f(f().value = e, !0)), j(t, n);
	};
	F(ve, (e) => {
		p($) ? e(ye) : e(be, -1);
	});
	var xe = t(ve, 2), Se = (n) => {
		var i = Ps();
		r(i, 23, () => p(J), (e) => e.key, (n, r, i) => {
			var a = Ns(), o = T(a), s = T(o), c = T(s, !0);
			g(s);
			var l = t(s, 2), u = T(l, !0);
			g(l), g(o), g(a), x((t) => {
				e(o, "id", `${d()}-option-${p(i)}`), e(o, "aria-selected", p(i) === p(V)), N(o, 1, t), W(c, `{${p(r).key}}`), W(u, p(r).label);
			}, [() => q(Q("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", p(i) === p(V) && "bg-dark-700"))]), Y("mousedown", o, (e) => {
				e.preventDefault(), ae(p(r).key, p(R));
			}), j(n, a);
		}), g(i), x(() => e(i, "id", `${d()}-listbox`)), j(n, i);
	};
	F(xe, (e) => {
		p(z) && p(J).length > 0 && e(Se);
	}), g(he);
	var Ce = t(he, 2), we = (e) => {
		var t = Fs();
		_(T(t), () => s.suffix), g(t), j(e, t);
	};
	F(Ce, (e) => {
		s.suffix && e(we);
	}), g(me);
	var Te = t(me, 2), Ee = (e) => {
		var t = Is(), n = T(t, !0);
		g(t), x(() => {
			N(t, 1, q(br)), W(n, s.error);
		}), j(e, t);
	};
	F(Te, (e) => {
		s.error && e(Ee);
	}), g(de), x((e, t) => {
		N(de, 1, e), N(he, 1, t);
	}, [() => q(Q("relative grid w-full gap-2", s.class)), () => q(Q("relative grid min-w-0 flex-1 grid-cols-[1fr_120px_1fr] rounded-xl", pr, vr(s.error)))]), a(ge, () => f().path, (e) => f(f().path = e, !0)), j(o, de), b();
}
ne([
	"input",
	"keydown",
	"click",
	"mousedown"
]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-variables.svelte
var zs = new Set([
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
]), Bs = J("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), Vs = J("<ul class=\"absolute top-full left-0 z-[100] mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), Hs = J("<p> </p>"), Us = J("<div><!> <div><input/> <!></div> <!></div>");
function Ws(n, o) {
	c(o, !0);
	let s = O(o, "variables", 19, () => []), l = O(o, "value", 15, ""), u = O(o, "id", 19, Fe), d = U(o, zs), f = M(null), m = M(!1), h = M(""), _ = M(0), v = K(() => {
		if (!p(h)) return s();
		let e = p(h).toLowerCase();
		return s().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function y() {
		if (!p(f)) return null;
		let e = p(f).selectionStart ?? l().length, t = l().slice(0, e), n = t.lastIndexOf("{");
		if (n === -1) return null;
		let r = t.slice(n + 1);
		return r.includes("}") ? null : {
			start: n,
			partial: r
		};
	}
	function S() {
		let e = y();
		if (!e || s().length === 0) {
			G(m, !1), G(h, ""), G(_, 0);
			return;
		}
		G(h, e.partial, !0), G(m, p(v).length > 0), G(_, 0);
	}
	function D(e) {
		let t = y();
		if (!t || !p(f)) return;
		let n = p(f).selectionStart ?? l().length, r = l().slice(0, t.start);
		l(`${r}{${e}}${l().slice(n)}`), G(m, !1), G(h, ""), queueMicrotask(() => {
			if (!p(f)) return;
			let t = r.length + e.length + 2;
			p(f).focus(), p(f).setSelectionRange(t, t);
		});
	}
	let k = (e) => {
		o.oninput?.(e), S();
	}, A = (e) => {
		if (!(!p(m) || p(v).length === 0)) {
			if (e.key === "ArrowDown") {
				e.preventDefault(), G(_, (p(_) + 1) % p(v).length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault(), G(_, (p(_) - 1 + p(v).length) % p(v).length);
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				let t = p(v)[p(_)];
				t && (e.preventDefault(), D(t.key));
				return;
			}
			e.key === "Escape" && G(m, !1);
		}
	}, I, L = () => {
		I && clearTimeout(I), I = setTimeout(() => {
			G(m, !1), I = void 0;
		}, 120);
	};
	C(() => {
		I && clearTimeout(I);
	});
	var R = Us(), z = T(R), B = (e) => {
		Tr(e, {
			get for() {
				return u();
			},
			children: (e, t) => {
				E();
				var n = P();
				x(() => W(n, o.label)), j(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(z, (e) => {
		o.label && e(B);
	});
	var V = t(z, 2), H = T(V);
	w(H, (e) => ({
		id: u(),
		placeholder: o.placeholder,
		class: e,
		role: "combobox",
		"aria-invalid": o.error ? !0 : void 0,
		"aria-autocomplete": "list",
		"aria-expanded": p(m) && p(v).length > 0,
		"aria-controls": `${u()}-listbox`,
		"aria-activedescendant": p(m) && p(v).length > 0 ? `${u()}-option-${p(_)}` : void 0,
		oninput: k,
		onkeydown: A,
		onblur: L,
		onfocus: S,
		onclick: S,
		...d
	}), [() => Q("min-w-0 w-full truncate rounded-xl border outline-none", fr, Sr, He.md, gr(o.error))], void 0, void 0, void 0, !0), i(H, (e) => G(f, e), () => p(f));
	var ee = t(H, 2), J = (n) => {
		var i = Vs();
		r(i, 23, () => p(v), (e) => e.key, (n, r, i) => {
			var a = Bs(), o = T(a), s = T(o), c = T(s, !0);
			g(s);
			var l = t(s, 2), d = T(l, !0);
			g(l), g(o), g(a), x((t) => {
				e(o, "id", `${u()}-option-${p(i)}`), e(o, "aria-selected", p(i) === p(_)), N(o, 1, t), W(c, `{${p(r).key}}`), W(d, p(r).label);
			}, [() => q(Q("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", p(i) === p(_) && "bg-dark-700"))]), Y("mousedown", o, (e) => {
				e.preventDefault(), D(p(r).key);
			}), j(n, a);
		}), g(i), x(() => e(i, "id", `${u()}-listbox`)), j(n, i);
	};
	F(ee, (e) => {
		p(m) && p(v).length > 0 && e(J);
	}), g(V);
	var te = t(V, 2), ne = (e) => {
		var t = Hs(), n = T(t, !0);
		g(t), x(() => {
			N(t, 1, q(br)), W(n, o.error);
		}), j(e, t);
	};
	F(te, (e) => {
		o.error && e(ne);
	}), g(R), x((e, t) => {
		N(R, 1, e), N(V, 1, t);
	}, [() => q(Q("relative grid w-full min-w-0 gap-2", o.class)), () => q(Q("relative flex w-full min-w-0 items-center rounded-xl", yr(o.error)))]), a(H, l), j(n, R), b();
}
ne(["mousedown"]);
//#endregion
export { ka as _, ss as a, kr as b, Wo as c, jo as d, ko as f, Ya as g, co as h, ds as i, Ro as l, bo as m, Rs as n, is as o, Eo as p, Ts as r, es as s, Ws as t, Po as u, oi as v, Tr as x, $r as y };
