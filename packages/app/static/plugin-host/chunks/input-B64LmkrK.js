import { $ as e, $n as t, Ct as n, Dt as r, E as i, G as a, Gn as o, H as s, Hr as c, Jn as l, Jr as u, Kn as d, Mn as f, On as p, Q as m, Qn as h, Qr as g, Qt as _, S as v, Vr as y, Wn as b, Xn as x, Yt as S, Z as C, Zn as w, Zr as T, _t as E, a as D, at as O, bn as k, cn as A, cr as j, dt as M, hn as N, ht as P, jt as F, kt as I, ln as L, lr as ee, m as R, mn as z, ni as B, nr as V, o as H, on as U, or as W, pr as G, pt as K, s as q, un as J, ut as te, vn as ne, xn as re, yn as Y } from "./client-xxWnFgeR.js";
import { i as ie, n as X, o as ae, r as oe, s as se, t as ce } from "./dist-7Fg9me4U.js";
import "./disclose-version-YhYaTdgb.js";
import { t as Z } from "./Icon-AeqJGRQj.js";
import "./index-client-DLfVeyOI.js";
import { t as Q } from "./utils-DcMuIKIs.js";
import { C as le, D as $, _ as ue, a as de, c as fe, d as pe, g as me, i as he, l as ge, n as _e, o as ve, r as ye, s as be, u as xe, v as Se, x as Ce } from "./animations-complete-DFBLw3EK.js";
import { _ as we, b as Te, g as Ee, h as De, m as Oe, v as ke, y as Ae } from "./scroll-lock--5Nsc7Xb.js";
import { i as je, n as Me, r as Ne, t as Pe } from "./use-id-Dbt6eP9X.js";
import { _ as Fe, a as Ie, c as Le, d as Re, f as ze, g as Be, h as Ve, l as He, m as Ue, o as We, p as Ge, s as Ke, u as qe } from "./command-BiBU8b6S.js";
import { a as Je } from "./tooltip-DIdbMvRP.js";
import { _ as Ye, a as Xe, d as Ze, f as Qe, g as $e, h as et, i as tt, l as nt, m as rt, o as it, p as at, r as ot, s as st, u as ct, v as lt } from "./dom-CAV9qhsv.js";
import { a as ut, o as dt, t as ft } from "./presence-manager.svelte-DNcqE2Zq.js";
import { a as pt, c as mt, i as ht, n as gt, r as _t, s as vt } from "./dialog-BGk8wwKO.js";
import { t as yt } from "./portal-BFSsRkE3.js";
import "./legacy-CT5GbYa1.js";
import { a as bt, n as xt, r as St, t as Ct } from "./popper-layer-force-mount-C0Qq7_vt.js";
import { t as wt } from "./floating-layer-anchor-DbwYuEbg.js";
import { i as Tt, n as Et, r as Dt } from "./popover-IhaAjWy6.js";
import { t as Ot } from "./scroll-area-BdFM74vQ.js";
import { n as kt } from "./attachments-0CZb6zsq.js";
import { t as At } from "./dist-DeJB5afo.js";
import { t as jt } from "./button-rY2iKe1u.js";
import "./button-BWDTVjor.js";
import { a as Mt, i as Nt, n as Pt } from "./copy-button-DT1joJ0C.js";
import { a as Ft, c as It, d as Lt, i as Rt, l as zt, n as Bt, o as Vt, r as Ht, s as Ut, t as Wt, u as Gt } from "./input-field-classes-RQxzeQQs.js";
import { a as Kt, n as qt, o as Jt, r as Yt, t as Xt } from "./variable-autocomplete-B4JGzJ4P.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/checkbox/checkbox.svelte.js
var Zt = ve({
	component: "checkbox",
	parts: [
		"root",
		"group",
		"group-label",
		"input"
	]
}), Qt = new le("Checkbox.Group"), $t = new le("Checkbox.Root"), en = class e {
	static create(t, n = null) {
		return $t.set(new e(t, n));
	}
	opts;
	group;
	#e = G(() => this.group && this.group.opts.name.current ? this.group.opts.name.current : this.opts.name.current);
	get trueName() {
		return p(this.#e);
	}
	set trueName(e) {
		W(this.#e, e);
	}
	#t = G(() => this.group && this.group.opts.required.current ? !0 : this.opts.required.current);
	get trueRequired() {
		return p(this.#t);
	}
	set trueRequired(e) {
		W(this.#t, e);
	}
	#n = G(() => this.group && this.group.opts.disabled.current ? !0 : this.opts.disabled.current);
	get trueDisabled() {
		return p(this.#n);
	}
	set trueDisabled(e) {
		W(this.#n, e);
	}
	#r = G(() => this.group && this.group.opts.readonly.current ? !0 : this.opts.readonly.current);
	get trueReadonly() {
		return p(this.#r);
	}
	set trueReadonly(e) {
		W(this.#r, e);
	}
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = pe(this.opts.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this), Ce.pre([() => u(this.group?.opts.value.current), () => this.opts.value.current], ([e, t]) => {
			!e || !t || (this.opts.checked.current = e.includes(t));
		}), Ce.pre(() => this.opts.checked.current, (e) => {
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
		return p(this.#a);
	}
	set snippetProps(e) {
		W(this.#a, e);
	}
	#o = G(() => ({
		id: this.opts.id.current,
		role: "checkbox",
		type: this.opts.type.current,
		disabled: this.trueDisabled,
		"aria-checked": be(this.opts.checked.current, this.opts.indeterminate.current),
		"aria-required": ye(this.trueRequired),
		"aria-readonly": ye(this.trueReadonly),
		"data-disabled": _e(this.trueDisabled),
		"data-readonly": _e(this.trueReadonly),
		"data-state": nn(this.opts.checked.current, this.opts.indeterminate.current),
		[Zt.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return p(this.#o);
	}
	set props(e) {
		W(this.#o, e);
	}
}, tn = class e {
	static create() {
		return new e($t.get());
	}
	root;
	#e = G(() => this.root.group ? !!(this.root.opts.value.current !== void 0 && this.root.group.opts.value.current.includes(this.root.opts.value.current)) : this.root.opts.checked.current);
	get trueChecked() {
		return p(this.#e);
	}
	set trueChecked(e) {
		W(this.#e, e);
	}
	#t = G(() => !!this.root.trueName);
	get shouldRender() {
		return p(this.#t);
	}
	set shouldRender(e) {
		W(this.#t, e);
	}
	constructor(e) {
		this.root = e, this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		ut(this.root.opts.ref.current) && this.root.opts.ref.current.focus();
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
		return p(this.#n);
	}
	set props(e) {
		W(this.#n, e);
	}
};
function nn(e, t) {
	return t ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/utilities/hidden-input.svelte
var rn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value"
]), an = J("<input/>");
function on(e, t) {
	c(t, !0);
	let n = D(t, "value", 15), r = H(t, rn), i = G(() => je(r, {
		"aria-hidden": "true",
		tabindex: -1,
		style: {
			...Fe,
			position: "absolute",
			top: "0",
			left: "0"
		}
	}));
	var o = L(), s = h(o), l = (e) => {
		var t = an();
		C(t, () => ({
			...p(i),
			value: n()
		}), void 0, void 0, void 0, void 0, !0), A(e, t);
	}, u = (e) => {
		var t = an();
		C(t, () => ({ ...p(i) }), void 0, void 0, void 0, void 0, !0), a(t, n), A(e, t);
	};
	F(s, (e) => {
		p(i).type === "checkbox" ? e(l) : e(u, -1);
	}), A(e, o), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/checkbox/components/checkbox-input.svelte
function sn(e, t) {
	c(t, !1);
	let n = tn.create();
	R();
	var r = L(), i = h(r), a = (e) => {
		on(e, q(() => n.props));
	};
	F(i, (e) => {
		n.shouldRender && e(a);
	}), A(e, r), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/checkbox/components/checkbox.svelte
var cn = new Set([
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
]), ln = J("<button><!></button>"), un = J("<!> <!>", 1);
function dn(e, n) {
	let r = z();
	c(n, !0);
	let i = D(n, "checked", 15, !1), a = D(n, "ref", 15, null), o = D(n, "disabled", 3, !1), s = D(n, "required", 3, !1), l = D(n, "name", 3, void 0), u = D(n, "value", 3, "on"), d = D(n, "id", 19, () => Me(r)), f = D(n, "indeterminate", 15, !1), m = D(n, "type", 3, "button"), v = H(n, cn), b = Qt.getOr(null);
	b && u() && (b.opts.value.current.includes(u()) ? i(!0) : i(!1)), Ce.pre(() => u(), () => {
		b && u() && (b.opts.value.current.includes(u()) ? i(!0) : i(!1));
	});
	let x = en.create({
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
	}, b), S = G(() => je({ ...v }, x.props));
	var T = un(), E = h(T), O = (e) => {
		var t = L(), r = h(t);
		{
			let e = G(() => ({
				props: p(S),
				...x.snippetProps
			}));
			_(r, () => n.child, () => p(e));
		}
		A(e, t);
	}, k = (e) => {
		var t = ln();
		C(t, () => ({ ...p(S) })), _(w(t), () => n.children ?? B, () => x.snippetProps), g(t), A(e, t);
	};
	F(E, (e) => {
		n.child ? e(O) : e(k, -1);
	}), sn(t(E, 2), {}), A(e, T), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/internal/data-typeahead.svelte.js
var fn = class {
	#e;
	#t = G(() => this.#e.candidateValues());
	#n;
	constructor(e) {
		this.#e = e, this.#n = De("", {
			afterMs: 1e3,
			getWindow: this.#e.getWindow
		}), this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this), this.resetTypeahead = this.resetTypeahead.bind(this);
	}
	handleTypeaheadSearch(e) {
		if (!this.#e.enabled() || !p(this.#t).length) return;
		this.#n.current = this.#n.current + e;
		let t = this.#e.getCurrentItem(), n = p(this.#t).find((e) => e === t) ?? "", r = ke(p(this.#t).map((e) => e ?? ""), this.#n.current, n), i = p(this.#t).find((e) => e === r);
		return i && this.#e.onMatch(i), i;
	}
	resetTypeahead() {
		this.#n.current = "";
	}
}, pn = [
	Xe,
	Qe,
	it,
	Ye,
	nt,
	ct,
	"Alt",
	rt,
	Ze,
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
], mn = [
	tt,
	$e,
	at
], hn = [
	st,
	et,
	"End"
], gn = [...mn, ...hn], _n = ve({
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
}), vn = new le("Select.Root | Combobox.Root");
new le("Select.Group | Combobox.Group");
var yn = new le("Select.Content | Combobox.Content"), bn = class {
	opts;
	#e = j(!1);
	get touchedInput() {
		return p(this.#e);
	}
	set touchedInput(e) {
		W(this.#e, e, !0);
	}
	#t = j(null);
	get inputNode() {
		return p(this.#t);
	}
	set inputNode(e) {
		W(this.#t, e, !0);
	}
	#n = j(null);
	get contentNode() {
		return p(this.#n);
	}
	set contentNode(e) {
		W(this.#n, e, !0);
	}
	contentPresence;
	#r = j(null);
	get viewportNode() {
		return p(this.#r);
	}
	set viewportNode(e) {
		W(this.#r, e, !0);
	}
	#i = j(null);
	get triggerNode() {
		return p(this.#i);
	}
	set triggerNode(e) {
		W(this.#i, e, !0);
	}
	#a = j(null);
	get valueNode() {
		return p(this.#a);
	}
	set valueNode(e) {
		W(this.#a, e, !0);
	}
	#o = j("");
	get valueId() {
		return p(this.#o);
	}
	set valueId(e) {
		W(this.#o, e, !0);
	}
	#s = j(null);
	get highlightedNode() {
		return p(this.#s);
	}
	set highlightedNode(e) {
		W(this.#s, e, !0);
	}
	#c = G(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-value") : null);
	get highlightedValue() {
		return p(this.#c);
	}
	set highlightedValue(e) {
		W(this.#c, e);
	}
	#l = G(() => {
		if (this.highlightedNode) return this.highlightedNode.id;
	});
	get highlightedId() {
		return p(this.#l);
	}
	set highlightedId(e) {
		W(this.#l, e);
	}
	#u = G(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-label") : null);
	get highlightedLabel() {
		return p(this.#u);
	}
	set highlightedLabel(e) {
		W(this.#u, e);
	}
	#d = j(!1);
	get contentIsPositioned() {
		return p(this.#d);
	}
	set contentIsPositioned(e) {
		W(this.#d, e, !0);
	}
	isUsingKeyboard = !1;
	isCombobox = !1;
	domContext = new Ne(() => null);
	constructor(e) {
		this.opts = e, this.isCombobox = e.isCombobox, this.contentPresence = new ft({
			ref: $(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), d(() => {
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
	getBitsAttr = (e) => _n.getAttr(e, this.isCombobox ? "combobox" : void 0);
}, xn = class extends bn {
	opts;
	isMulti = !1;
	#e = G(() => this.opts.value.current !== "");
	get hasValue() {
		return p(this.#e);
	}
	set hasValue(e) {
		W(this.#e, e);
	}
	#t = G(() => this.opts.items.current.length ? this.opts.items.current.find((e) => e.value === this.opts.value.current)?.label ?? "" : "");
	get currentLabel() {
		return p(this.#t);
	}
	set currentLabel(e) {
		W(this.#t, e);
	}
	#n = G(() => this.opts.items.current.length ? this.opts.items.current.filter((e) => !e.disabled).map((e) => e.label) : []);
	get candidateLabels() {
		return p(this.#n);
	}
	set candidateLabels(e) {
		W(this.#n, e);
	}
	#r = G(() => !(this.isMulti || this.opts.items.current.length === 0));
	get dataTypeaheadEnabled() {
		return p(this.#r);
	}
	set dataTypeaheadEnabled(e) {
		W(this.#r, e);
	}
	constructor(e) {
		super(e), this.opts = e, o(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), Ce(() => this.opts.open.current, () => {
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
		me(() => {
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
}, Sn = class extends bn {
	opts;
	isMulti = !0;
	#e = G(() => this.opts.value.current.length > 0);
	get hasValue() {
		return p(this.#e);
	}
	set hasValue(e) {
		W(this.#e, e);
	}
	constructor(e) {
		super(e), this.opts = e, o(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), Ce(() => this.opts.open.current, () => {
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
		me(() => {
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
}, Cn = class {
	static create(e) {
		let { type: t, ...n } = e, r = t === "single" ? new xn(n) : new Sn(n);
		return vn.set(r);
	}
}, wn = class e {
	static create(t) {
		return new e(t, vn.get());
	}
	root;
	opts;
	attachment;
	constructor(e, t) {
		this.root = t, this.opts = e, this.attachment = pe(e.ref, (e) => this.root.valueNode = e), this.setValue = this.setValue.bind(this);
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
		return p(this.#e);
	}
	set snippetProps(e) {
		W(this.#e, e);
	}
	#t = G(() => ({
		id: this.opts.id.current,
		"data-placeholder": this.root.hasValue ? void 0 : "",
		"data-select-value": "",
		...this.attachment
	}));
	get props() {
		return p(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
}, Tn = class e {
	static create(t) {
		return new e(t, vn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = pe(e.ref, (e) => this.root.inputNode = e), this.root.domContext = new Ne(e.ref), this.onkeydown = this.onkeydown.bind(this), this.oninput = this.oninput.bind(this), Ce([() => this.root.opts.value.current, () => this.opts.clearOnDeselect.current], ([e, t], [n]) => {
			t && (Array.isArray(e) && Array.isArray(n) ? e.length === 0 && n.length !== 0 && (this.root.opts.inputValue.current = "") : e === "" && n !== "" && (this.root.opts.inputValue.current = ""));
		});
	}
	onkeydown(e) {
		if (this.root.isUsingKeyboard = !0, e.key !== "Escape") {
			if ((e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault(), !this.root.opts.open.current) {
				if (pn.includes(e.key) || e.key === "Tab" || e.key === "Backspace" && this.root.opts.inputValue.current === "" || (this.root.handleOpen(), this.root.hasValue)) return;
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
			if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), gn.includes(e.key)) {
				e.preventDefault();
				let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
				if (e.key === "ArrowDown" ? a = Ae(t, r, i) : e.key === "ArrowUp" ? a = Te(t, r, i) : e.key === "PageDown" ? a = we(t, r, 10, i) : e.key === "PageUp" ? a = Ee(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
				this.root.setHighlightedNode(a);
				return;
			}
			pn.includes(e.key) || this.root.highlightedNode || this.root.setHighlightedToFirstCandidate();
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
		"aria-expanded": ye(this.root.opts.open.current),
		"data-state": ge(this.root.opts.open.current),
		"data-disabled": _e(this.root.opts.disabled.current),
		onkeydown: this.onkeydown,
		oninput: this.oninput,
		[this.root.getBitsAttr("input")]: "",
		...this.attachment
	}));
	get props() {
		return p(this.#e);
	}
	set props(e) {
		W(this.#e, e);
	}
}, En = class e {
	static create(t) {
		return new e(t, vn.get());
	}
	opts;
	root;
	attachment;
	#e;
	#t;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = pe(e.ref, (e) => this.root.triggerNode = e), this.root.domContext = new Ne(e.ref), this.#e = new Oe({
			getCurrentItem: () => this.root.highlightedNode,
			onMatch: (e) => {
				this.root.setHighlightedNode(e);
			},
			getActiveElement: () => this.root.domContext.getActiveElement(),
			getWindow: () => this.root.domContext.getWindow()
		}), this.#t = new fn({
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
		if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), gn.includes(e.key)) {
			e.preventDefault();
			let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
			if (e.key === "ArrowDown" ? a = Ae(t, r, i) : e.key === "ArrowUp" ? a = Te(t, r, i) : e.key === "PageDown" ? a = we(t, r, 10, i) : e.key === "PageUp" ? a = Ee(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
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
		"aria-expanded": ye(this.root.opts.open.current),
		"aria-activedescendant": this.root.highlightedId,
		"data-state": ge(this.root.opts.open.current),
		"data-disabled": _e(this.root.opts.disabled.current),
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
		W(this.#a, e);
	}
}, Dn = class e {
	static create(t) {
		return yn.set(new e(t, vn.get()));
	}
	opts;
	root;
	attachment;
	#e = j(!1);
	get isPositioned() {
		return p(this.#e);
	}
	set isPositioned(e) {
		W(this.#e, e, !0);
	}
	domContext;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = pe(e.ref, (e) => this.root.contentNode = e), this.domContext = new Ne(this.opts.ref), this.root.domContext === null && (this.root.domContext = this.domContext), ue(() => {
			this.root.contentNode = null, this.root.contentIsPositioned = !1, this.isPositioned = !1;
		}), Ce(() => this.root.opts.open.current, () => {
			this.root.opts.open.current || (this.root.contentIsPositioned = !1, this.isPositioned = !1);
		}), Ce([() => this.isPositioned, () => this.root.highlightedNode], () => {
			!this.isPositioned || !this.root.highlightedNode || this.root.scrollHighlightedNodeIntoView(this.root.highlightedNode);
		}), this.onpointermove = this.onpointermove.bind(this);
	}
	onpointermove(e) {
		this.root.isUsingKeyboard = !1;
	}
	#t = G(() => bt(this.root.isCombobox ? "combobox" : "select"));
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
		return p(this.#n);
	}
	set snippetProps(e) {
		W(this.#n, e);
	}
	#r = G(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-multiselectable": this.root.isMulti ? "true" : void 0,
		"data-state": ge(this.root.opts.open.current),
		...xe(this.root.contentPresence.transitionStatus),
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
		W(this.#r, e);
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
}, On = class e {
	static create(t) {
		return new e(t, vn.get());
	}
	opts;
	root;
	attachment;
	#e = G(() => this.root.includesItem(this.opts.value.current));
	get isSelected() {
		return p(this.#e);
	}
	set isSelected(e) {
		W(this.#e, e);
	}
	#t = G(() => this.root.highlightedValue === this.opts.value.current);
	get isHighlighted() {
		return p(this.#t);
	}
	set isHighlighted(e) {
		W(this.#t, e);
	}
	prevHighlighted = new Se(() => this.isHighlighted);
	#n = j(!1);
	get mounted() {
		return p(this.#n);
	}
	set mounted(e) {
		W(this.#n, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = pe(e.ref), Ce([() => this.isHighlighted, () => this.prevHighlighted.current], () => {
			this.isHighlighted ? this.opts.onHighlight.current() : this.prevHighlighted.current && this.opts.onUnhighlight.current();
		}), Ce(() => this.mounted, () => {
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
		return p(this.#r);
	}
	set snippetProps(e) {
		W(this.#r, e);
	}
	onpointerdown(e) {
		e.preventDefault();
	}
	onpointerup(e) {
		if (!(e.defaultPrevented || !this.opts.ref.current)) {
			if (e.pointerType === "touch" && !dt) {
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
	#i = G(() => ({
		id: this.opts.id.current,
		role: "option",
		"aria-selected": this.root.includesItem(this.opts.value.current) ? "true" : void 0,
		"data-value": this.opts.value.current,
		"data-disabled": _e(this.opts.disabled.current),
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
		W(this.#i, e);
	}
}, kn = class e {
	static create(t) {
		return new e(t, vn.get());
	}
	opts;
	root;
	#e = G(() => this.root.opts.name.current !== "");
	get shouldRender() {
		return p(this.#e);
	}
	set shouldRender(e) {
		W(this.#e, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		e.preventDefault(), this.root.isCombobox ? this.root.inputNode?.focus() : this.root.triggerNode?.focus();
	}
	#t = G(() => ({
		disabled: de(this.root.opts.disabled.current),
		required: de(this.root.opts.required.current),
		name: this.root.opts.name.current,
		value: this.opts.value.current,
		onfocus: this.onfocus
	}));
	get props() {
		return p(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
}, An = class e {
	static create(t) {
		return new e(t, yn.get());
	}
	opts;
	content;
	root;
	attachment;
	#e = j(0);
	get prevScrollTop() {
		return p(this.#e);
	}
	set prevScrollTop(e) {
		W(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = pe(e.ref, (e) => {
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
		return p(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
}, jn = class {
	opts;
	content;
	root;
	attachment;
	autoScrollTimer = null;
	userScrollTimer = -1;
	isUserScrolling = !1;
	onAutoScroll = ot;
	#e = j(!1);
	get mounted() {
		return p(this.#e);
	}
	set mounted(e) {
		W(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = pe(e.ref), Ce([() => this.mounted], () => {
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
	#t = G(() => ({
		id: this.opts.id.current,
		"aria-hidden": he(!0),
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
		W(this.#t, e);
	}
}, Mn = class e {
	static create(t) {
		return new e(new jn(t, yn.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = j(!1);
	get canScrollDown() {
		return p(this.#e);
	}
	set canScrollDown(e) {
		W(this.#e, e, !0);
	}
	scrollIntoViewTimer = null;
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, Ce([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), re(this.root.viewportNode, "scroll", () => this.handleScroll());
		}), Ce([
			() => this.root.opts.inputValue.current,
			() => this.root.viewportNode,
			() => this.content.isPositioned
		], () => {
			!this.root.viewportNode || !this.content.isPositioned || this.handleScroll(!0);
		}), Ce(() => this.scrollButtonState.mounted, () => {
			this.scrollButtonState.mounted && (this.scrollIntoViewTimer && clearTimeout(this.scrollIntoViewTimer), this.scrollIntoViewTimer = lt(5, () => {
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
		return p(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
}, Nn = class e {
	static create(t) {
		return new e(new jn(t, yn.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = j(!1);
	get canScrollUp() {
		return p(this.#e);
	}
	set canScrollUp(e) {
		W(this.#e, e, !0);
	}
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, Ce([() => this.root.viewportNode, () => this.content.isPositioned], () => {
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
	#t = G(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-up-button")]: ""
	}));
	get props() {
		return p(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-hidden-input.svelte
function Pn(e, t) {
	c(t, !0);
	let n = D(t, "value", 15), r = kn.create({ value: $(() => n()) });
	var i = L(), a = h(i), o = (e) => {
		on(e, q(() => r.props, {
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
	}), A(e, i), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/combobox/components/combobox.svelte
var Fn = J("<!> <!>", 1);
function In(e, n) {
	c(n, !0);
	let i = D(n, "value", 15), a = D(n, "onValueChange", 3, ot), o = D(n, "name", 3, ""), s = D(n, "disabled", 3, !1), l = D(n, "open", 15, !1), u = D(n, "onOpenChange", 3, ot), d = D(n, "onOpenChangeComplete", 3, ot), f = D(n, "loop", 3, !1), m = D(n, "scrollAlignment", 3, "nearest"), g = D(n, "required", 3, !1), v = D(n, "items", 19, () => []), b = D(n, "allowDeselect", 3, !0), x = D(n, "inputValue", 7, "");
	i() === void 0 && i(n.type === "single" ? "" : []), Ce.pre(() => i(), () => {
		i() === void 0 && i(n.type === "single" ? "" : []);
	});
	let S = Cn.create({
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
		allowDeselect: $(() => b()),
		inputValue: $(() => x(), (e) => x(e)),
		onOpenChangeComplete: $(() => d())
	});
	var C = Fn(), w = h(C);
	St(w, {
		children: (e, t) => {
			var r = L();
			_(h(r), () => n.children ?? B), A(e, r);
		},
		$$slots: { default: !0 }
	});
	var T = t(w, 2), E = (e) => {
		var t = L(), n = h(t), i = (e) => {
			var t = L();
			r(h(t), 16, () => S.opts.value.current, (e) => e, (e, t) => {
				Pn(e, { get value() {
					return t;
				} });
			}), A(e, t);
		};
		F(n, (e) => {
			S.opts.value.current.length && e(i);
		}), A(e, t);
	}, O = G(() => Array.isArray(S.opts.value.current)), k = (e) => {
		Pn(e, {
			get value() {
				return S.opts.value.current;
			},
			set value(e) {
				S.opts.value.current = e;
			}
		});
	};
	F(T, (e) => {
		p(O) ? e(E) : e(k, -1);
	}), A(e, C), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/combobox/components/combobox-input.svelte
var Ln = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"defaultValue",
	"clearOnDeselect"
]), Rn = J("<input/>");
function zn(e, t) {
	c(t, !0);
	let r = D(t, "id", 19, Pe), i = D(t, "ref", 15, null), a = D(t, "clearOnDeselect", 3, !1), o = H(t, Ln), s = Tn.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e)),
		clearOnDeselect: $(() => a())
	});
	t.defaultValue && (s.root.opts.inputValue.current = t.defaultValue);
	let l = G(() => je(o, s.props, { value: s.root.opts.inputValue.current }));
	var u = L();
	n(h(u), () => wt, (e, n) => {
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
					_(h(n), () => t.child, () => ({ props: p(l) })), A(e, n);
				}, o = (e) => {
					var t = Rn();
					C(t, () => ({ ...p(l) }), void 0, void 0, void 0, void 0, !0), A(e, t);
				};
				F(i, (e) => {
					t.child ? e(a) : e(o, -1);
				}), A(e, r);
			},
			$$slots: { default: !0 }
		});
	}), A(e, u), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-content.svelte
var Bn = new Set([
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
]), Vn = J("<div><div><!></div></div>");
function Hn(e, t) {
	let n = z();
	c(t, !0);
	let r = D(t, "id", 19, () => Me(n)), i = D(t, "ref", 15, null), a = D(t, "forceMount", 3, !1), o = D(t, "side", 3, "bottom"), s = D(t, "onInteractOutside", 3, ot), l = D(t, "onEscapeKeydown", 3, ot), u = D(t, "preventScroll", 3, !1), d = H(t, Bn), f = Dn.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e)),
		onInteractOutside: $(() => s()),
		onEscapeKeydown: $(() => l())
	}), m = G(() => je(d, f.props));
	var v = L(), b = h(v), x = (e) => {
		Ct(e, q(() => p(m), () => f.popperProps, {
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
				let r = () => n?.().props, i = () => n?.().wrapperProps, a = G(() => je(r(), { style: f.props.style }, { style: t.style }));
				var o = L(), s = h(o), c = (e) => {
					var n = L(), r = h(n);
					{
						let e = G(() => ({
							props: p(a),
							wrapperProps: i(),
							...f.snippetProps
						}));
						_(r, () => t.child, () => p(e));
					}
					A(e, n);
				}, l = (e) => {
					var n = Vn();
					C(n, () => ({ ...i() }));
					var r = w(n);
					C(r, () => ({ ...p(a) })), _(w(r), () => t.children ?? B), g(r), g(n), A(e, n);
				};
				F(s, (e) => {
					t.child ? e(c) : e(l, -1);
				}), A(e, o);
			},
			$$slots: { popper: !0 }
		}));
	}, S = (e) => {
		xt(e, q(() => p(m), () => f.popperProps, {
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
				let r = () => n?.().props, i = () => n?.().wrapperProps, a = G(() => je(r(), { style: f.props.style }, { style: t.style }));
				var o = L(), s = h(o), c = (e) => {
					var n = L(), r = h(n);
					{
						let e = G(() => ({
							props: p(a),
							wrapperProps: i(),
							...f.snippetProps
						}));
						_(r, () => t.child, () => p(e));
					}
					A(e, n);
				}, l = (e) => {
					var n = Vn();
					C(n, () => ({ ...i() }));
					var r = w(n);
					C(r, () => ({ ...p(a) })), _(w(r), () => t.children ?? B), g(r), g(n), A(e, n);
				};
				F(s, (e) => {
					t.child ? e(c) : e(l, -1);
				}), A(e, o);
			},
			$$slots: { popper: !0 }
		}));
	};
	F(b, (e) => {
		a() ? e(x) : a() || e(S, 1);
	}), A(e, v), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/utilities/mounted.svelte
function Un(e, t) {
	c(t, !0);
	let n = D(t, "mounted", 15, !1), r = D(t, "onMountedChange", 3, ot);
	Je(() => (n(!0), r()(!0), () => {
		n(!1), r()(!1);
	})), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-item.svelte
var Wn = new Set([
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
]), Gn = J("<div><!></div>"), Kn = J("<!> <!>", 1);
function qn(e, n) {
	let r = z();
	c(n, !0);
	let i = D(n, "id", 19, () => Me(r)), a = D(n, "ref", 15, null), o = D(n, "label", 19, () => n.value), s = D(n, "disabled", 3, !1), l = D(n, "onHighlight", 3, ot), u = D(n, "onUnhighlight", 3, ot), d = H(n, Wn), f = On.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e)),
		value: $(() => n.value),
		disabled: $(() => s()),
		label: $(() => o()),
		onHighlight: $(() => l()),
		onUnhighlight: $(() => u())
	}), m = G(() => je(d, f.props));
	var v = Kn(), b = h(v), x = (e) => {
		var t = L(), r = h(t);
		{
			let e = G(() => ({
				props: p(m),
				...f.snippetProps
			}));
			_(r, () => n.child, () => p(e));
		}
		A(e, t);
	}, S = (e) => {
		var t = Gn();
		C(t, () => ({ ...p(m) })), _(w(t), () => n.children ?? B, () => f.snippetProps), g(t), A(e, t);
	};
	F(b, (e) => {
		n.child ? e(x) : e(S, -1);
	}), Un(t(b, 2), {
		get mounted() {
			return f.mounted;
		},
		set mounted(e) {
			f.mounted = e;
		}
	}), A(e, v), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-viewport.svelte
var Jn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), Yn = J("<div><!></div>"), Xn = {
	hash: "svelte-1lpv8z5",
	code: "\n	/* Hide scrollbars cross browser and enable momentum scroll for touch devices */[data-select-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport]::-webkit-scrollbar {display:none !important;}[data-select-viewport]::-webkit-scrollbar {display:none !important;}"
};
function Zn(e, t) {
	let n = z();
	c(t, !0), E(e, Xn);
	let r = D(t, "id", 19, () => Me(n)), i = D(t, "ref", 15, null), a = H(t, Jn), o = An.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), s = G(() => je(a, o.props));
	var l = L(), u = h(l), d = (e) => {
		var n = L();
		_(h(n), () => t.child, () => ({ props: p(s) })), A(e, n);
	}, f = (e) => {
		var n = Yn();
		C(n, () => ({ ...p(s) })), _(w(n), () => t.children ?? B), g(n), A(e, n);
	};
	F(u, (e) => {
		t.child ? e(d) : e(f, -1);
	}), A(e, l), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-scroll-down-button.svelte
var Qn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), $n = J("<div><!></div>"), er = J("<!> <!>", 1);
function tr(e, n) {
	let r = z();
	c(n, !0);
	let i = D(n, "id", 19, () => Me(r)), a = D(n, "ref", 15, null), o = D(n, "delay", 3, () => 50), s = H(n, Qn), l = Mn.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e)),
		delay: $(() => o())
	}), u = G(() => je(s, l.props));
	var d = L(), f = h(d), m = (e) => {
		var r = er(), i = h(r);
		Un(i, {
			get mounted() {
				return l.scrollButtonState.mounted;
			},
			set mounted(e) {
				l.scrollButtonState.mounted = e;
			}
		});
		var a = t(i, 2), o = (e) => {
			var t = L();
			_(h(t), () => n.child, () => ({ props: s })), A(e, t);
		}, c = (e) => {
			var t = $n();
			C(t, () => ({ ...p(u) })), _(w(t), () => n.children ?? B), g(t), A(e, t);
		};
		F(a, (e) => {
			n.child ? e(o) : e(c, -1);
		}), A(e, r);
	};
	F(f, (e) => {
		l.canScrollDown && e(m);
	}), A(e, d), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-scroll-up-button.svelte
var nr = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), rr = J("<div><!></div>"), ir = J("<!> <!>", 1);
function ar(e, n) {
	let r = z();
	c(n, !0);
	let i = D(n, "id", 19, () => Me(r)), a = D(n, "ref", 15, null), o = D(n, "delay", 3, () => 50), s = H(n, nr), l = Nn.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e)),
		delay: $(() => o())
	}), u = G(() => je(s, l.props));
	var d = L(), f = h(d), m = (e) => {
		var r = ir(), i = h(r);
		Un(i, {
			get mounted() {
				return l.scrollButtonState.mounted;
			},
			set mounted(e) {
				l.scrollButtonState.mounted = e;
			}
		});
		var a = t(i, 2), o = (e) => {
			var t = L();
			_(h(t), () => n.child, () => ({ props: s })), A(e, t);
		}, c = (e) => {
			var t = rr();
			C(t, () => ({ ...p(u) })), _(w(t), () => n.children ?? B), g(t), A(e, t);
		};
		F(a, (e) => {
			n.child ? e(o) : e(c, -1);
		}), A(e, r);
	};
	F(f, (e) => {
		l.canScrollUp && e(m);
	}), A(e, d), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/label/label.svelte.js
var or = ve({
	component: "label",
	parts: ["root"]
}), sr = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = pe(this.opts.ref), this.onmousedown = this.onmousedown.bind(this);
	}
	onmousedown(e) {
		e.detail > 1 && e.preventDefault();
	}
	#e = G(() => ({
		id: this.opts.id.current,
		[or.root]: "",
		onmousedown: this.onmousedown,
		...this.attachment
	}));
	get props() {
		return p(this.#e);
	}
	set props(e) {
		W(this.#e, e);
	}
}, cr = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"for"
]), lr = J("<label><!></label>");
function ur(e, t) {
	let n = z();
	c(t, !0);
	let r = D(t, "id", 19, () => Me(n)), i = D(t, "ref", 15, null), a = H(t, cr), o = sr.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), s = G(() => je(a, o.props, { for: t.for }));
	var l = L(), u = h(l), d = (e) => {
		var n = L();
		_(h(n), () => t.child, () => ({ props: p(s) })), A(e, n);
	}, f = (e) => {
		var n = lr();
		C(n, () => ({
			...p(s),
			for: t.for
		})), _(w(n), () => t.children ?? B), g(n), A(e, n);
	};
	F(u, (e) => {
		t.child ? e(d) : e(f, -1);
	}), A(e, l), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select.svelte
var dr = J("<!> <!>", 1);
function fr(e, n) {
	c(n, !0);
	let i = D(n, "value", 15), a = D(n, "onValueChange", 3, ot), o = D(n, "name", 3, ""), s = D(n, "disabled", 3, !1), l = D(n, "open", 15, !1), u = D(n, "onOpenChange", 3, ot), d = D(n, "onOpenChangeComplete", 3, ot), f = D(n, "loop", 3, !1), m = D(n, "scrollAlignment", 3, "nearest"), g = D(n, "required", 3, !1), v = D(n, "items", 19, () => []), b = D(n, "allowDeselect", 3, !1);
	function x() {
		i() === void 0 && i(n.type === "single" ? "" : []);
	}
	x(), Ce.pre(() => i(), () => {
		x();
	});
	let S = j(""), C = Cn.create({
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
		allowDeselect: $(() => b()),
		inputValue: $(() => p(S), (e) => W(S, e, !0)),
		onOpenChangeComplete: $(() => d())
	});
	var w = dr(), T = h(w);
	St(T, {
		children: (e, t) => {
			var r = L();
			_(h(r), () => n.children ?? B), A(e, r);
		},
		$$slots: { default: !0 }
	});
	var E = t(T, 2), O = (e) => {
		var t = L(), i = h(t), a = (e) => {
			Pn(e, { get autocomplete() {
				return n.autocomplete;
			} });
		}, o = (e) => {
			var t = L();
			r(h(t), 16, () => C.opts.value.current, (e) => e, (e, t) => {
				Pn(e, {
					get value() {
						return t;
					},
					get autocomplete() {
						return n.autocomplete;
					}
				});
			}), A(e, t);
		};
		F(i, (e) => {
			C.opts.value.current.length === 0 ? e(a) : e(o, -1);
		}), A(e, t);
	}, k = G(() => Array.isArray(C.opts.value.current)), M = (e) => {
		Pn(e, {
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
		p(k) ? e(O) : e(M, -1);
	}), A(e, w), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-value.svelte
var pr = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"placeholder",
	"child",
	"children"
]), mr = J("<span><!></span>");
function hr(e, t) {
	let n = z();
	c(t, !0);
	let r = D(t, "ref", 15, null), i = D(t, "id", 19, () => Me(n)), a = H(t, pr), o = wn.create({
		id: $(() => i()),
		ref: $(() => r(), (e) => r(e)),
		placeholder: $(() => t.placeholder)
	}), s = G(() => je(a, o.props));
	var l = L(), u = h(l), d = (e) => {
		var n = L(), r = h(n);
		{
			let e = G(() => ({
				props: p(s),
				...o.snippetProps
			}));
			_(r, () => t.child, () => p(e));
		}
		A(e, n);
	}, f = (e) => {
		var n = mr();
		C(n, () => ({ ...p(s) }));
		var r = w(n), i = (e) => {
			var n = L();
			_(h(n), () => t.children ?? B, () => o.snippetProps), A(e, n);
		}, a = (e) => {
			var n = N();
			b(() => U(n, o.snippetProps.selection.selected?.label ?? t.placeholder)), A(e, n);
		}, c = (e) => {
			var n = N();
			b((e) => U(n, e), [() => o.snippetProps.selection.selected.length > 0 ? o.snippetProps.selection.selected.map((e) => e.label).join(", ") : t.placeholder]), A(e, n);
		}, l = (e) => {
			var n = N();
			b(() => U(n, t.placeholder)), A(e, n);
		};
		F(r, (e) => {
			t.children ? e(i) : o.snippetProps.selection.type === "single" ? e(a, 1) : o.snippetProps.selection.type === "multiple" && o.snippetProps.selection.selected ? e(c, 2) : e(l, -1);
		}), g(n), A(e, n);
	};
	F(u, (e) => {
		t.child ? e(d) : e(f, -1);
	}), A(e, l), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/select/components/select-trigger.svelte
var gr = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"type"
]), _r = J("<button><!></button>");
function vr(e, t) {
	let r = z();
	c(t, !0);
	let i = D(t, "id", 19, () => Me(r)), a = D(t, "ref", 15, null), o = D(t, "type", 3, "button"), s = H(t, gr), l = En.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e))
	}), u = G(() => je(s, l.props, { type: o() }));
	var d = L();
	n(h(d), () => wt, (e, n) => {
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
					_(h(n), () => t.child, () => ({ props: p(u) })), A(e, n);
				}, o = (e) => {
					var n = _r();
					C(n, () => ({ ...p(u) })), _(w(n), () => t.children ?? B), g(n), A(e, n);
				};
				F(i, (e) => {
					t.child ? e(a) : e(o, -1);
				}), A(e, r);
			},
			$$slots: { default: !0 }
		});
	}), A(e, d), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/switch/switch.svelte.js
var yr = ve({
	component: "switch",
	parts: ["root", "thumb"]
}), br = new le("Switch.Root"), xr = class e {
	static create(t) {
		return br.set(new e(t));
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = pe(e.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this);
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
		"data-disabled": _e(this.opts.disabled.current),
		"data-state": fe(this.opts.checked.current),
		"data-required": _e(this.opts.required.current)
	}));
	get sharedProps() {
		return p(this.#t);
	}
	set sharedProps(e) {
		W(this.#t, e);
	}
	#n = G(() => ({ checked: this.opts.checked.current }));
	get snippetProps() {
		return p(this.#n);
	}
	set snippetProps(e) {
		W(this.#n, e);
	}
	#r = G(() => ({
		...this.sharedProps,
		id: this.opts.id.current,
		role: "switch",
		disabled: de(this.opts.disabled.current),
		"aria-checked": be(this.opts.checked.current, !1),
		"aria-required": ye(this.opts.required.current),
		[yr.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return p(this.#r);
	}
	set props(e) {
		W(this.#r, e);
	}
}, Sr = class e {
	static create() {
		return new e(br.get());
	}
	root;
	#e = G(() => this.root.opts.name.current !== void 0);
	get shouldRender() {
		return p(this.#e);
	}
	set shouldRender(e) {
		W(this.#e, e);
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
		return p(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
}, Cr = class e {
	static create(t) {
		return new e(t, br.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = pe(e.ref);
	}
	#e = G(() => ({ checked: this.root.opts.checked.current }));
	get snippetProps() {
		return p(this.#e);
	}
	set snippetProps(e) {
		W(this.#e, e);
	}
	#t = G(() => ({
		...this.root.sharedProps,
		id: this.opts.id.current,
		[yr.thumb]: "",
		...this.attachment
	}));
	get props() {
		return p(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/switch/components/switch-input.svelte
function wr(e, t) {
	c(t, !1);
	let n = Sr.create();
	R();
	var r = L(), i = h(r), a = (e) => {
		on(e, q(() => n.props));
	};
	F(i, (e) => {
		n.shouldRender && e(a);
	}), A(e, r), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/switch/components/switch.svelte
var Tr = new Set([
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
]), Er = J("<button><!></button>"), Dr = J("<!> <!>", 1);
function Or(e, n) {
	let r = z();
	c(n, !0);
	let i = D(n, "ref", 15, null), a = D(n, "id", 19, () => Me(r)), o = D(n, "disabled", 3, !1), s = D(n, "required", 3, !1), l = D(n, "checked", 15, !1), u = D(n, "value", 3, "on"), d = D(n, "name", 3, void 0), f = D(n, "type", 3, "button"), m = D(n, "onCheckedChange", 3, ot), v = H(n, Tr), b = xr.create({
		checked: $(() => l(), (e) => {
			l(e), m()?.(e);
		}),
		disabled: $(() => o() ?? !1),
		required: $(() => s()),
		value: $(() => u()),
		name: $(() => d()),
		id: $(() => a()),
		ref: $(() => i(), (e) => i(e))
	}), x = G(() => je(v, b.props, { type: f() }));
	var S = Dr(), T = h(S), E = (e) => {
		var t = L(), r = h(t);
		{
			let e = G(() => ({
				props: p(x),
				...b.snippetProps
			}));
			_(r, () => n.child, () => p(e));
		}
		A(e, t);
	}, O = (e) => {
		var t = Er();
		C(t, () => ({ ...p(x) })), _(w(t), () => n.children ?? B, () => b.snippetProps), g(t), A(e, t);
	};
	F(T, (e) => {
		n.child ? e(E) : e(O, -1);
	}), wr(t(T, 2), {}), A(e, S), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/switch/components/switch-thumb.svelte
var kr = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"ref",
	"id"
]), Ar = J("<span><!></span>");
function jr(e, t) {
	let n = z();
	c(t, !0);
	let r = D(t, "ref", 15, null), i = D(t, "id", 19, () => Me(n)), a = H(t, kr), o = Cr.create({
		id: $(() => i()),
		ref: $(() => r(), (e) => r(e))
	}), s = G(() => je(a, o.props));
	var l = L(), u = h(l), d = (e) => {
		var n = L(), r = h(n);
		{
			let e = G(() => ({
				props: p(s),
				...o.snippetProps
			}));
			_(r, () => t.child, () => p(e));
		}
		A(e, n);
	}, f = (e) => {
		var n = Ar();
		C(n, () => ({ ...p(s) })), _(w(n), () => t.children ?? B, () => o.snippetProps), g(n), A(e, n);
	};
	F(u, (e) => {
		t.child ? e(d) : e(f, -1);
	}), A(e, l), y();
}
//#endregion
//#region ../ui/src/lib/components/input/label.svelte
var Mr = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function Nr(e, t) {
	c(t, !0);
	let r = H(t, Mr);
	var i = L(), a = h(i);
	{
		let e = G(() => Q("text-sm font-medium text-muted-foreground", t.class));
		n(a, () => ur, (n, i) => {
			i(n, q({ get children() {
				return t.children;
			} }, () => r, { get class() {
				return p(e);
			} }));
		});
	}
	A(e, i), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-checkbox.svelte
var Pr = J("<div><!> <!></div>"), Fr = J("<p> </p>"), Ir = J("<div><div class=\"flex items-center gap-2\"><!> <!></div> <!></div>");
function Lr(e, r) {
	c(r, !0);
	let i = D(r, "checked", 15, !1), a = D(r, "id", 19, Pe), o = D(r, "inline", 3, !1), s = G(() => Q("peer inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary/15 data-[state=checked]:text-primary", r.error ? Q(Ht, "data-[state=unchecked]:bg-destructive/15") : "data-[state=unchecked]:border-border data-[state=unchecked]:bg-transparent data-[state=unchecked]:hover:border-dark-400", Lt, "disabled:cursor-not-allowed disabled:opacity-50"));
	var l = L(), u = h(l), d = (e) => {
		var o = Pr(), c = w(o);
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
				}), A(e, r);
			}, t = G(() => r.label ? `${a()}-label` : void 0), o = G(() => r.error ? !0 : void 0);
			n(c, () => dn, (n, c) => {
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
			Nr(e, {
				get id() {
					return `${a() ?? ""}-label`;
				},
				get for() {
					return a();
				},
				class: "cursor-pointer whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, t) => {
					T();
					var n = N();
					b(() => U(n, r.label)), A(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		F(l, (e) => {
			r.label && e(u);
		}), g(o), b((e) => M(o, 1, e), [() => K(Q("flex items-center gap-2", r.class))]), A(e, o);
	}, f = (e) => {
		var o = Ir(), c = w(o), l = w(c);
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
				}), A(e, r);
			}, t = G(() => r.label ? `${a()}-label` : void 0), o = G(() => r.error ? !0 : void 0);
			n(l, () => dn, (n, c) => {
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
			Nr(e, {
				get id() {
					return `${a() ?? ""}-label`;
				},
				get for() {
					return a();
				},
				class: "cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, t) => {
					T();
					var n = N();
					b(() => U(n, r.label)), A(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		F(u, (e) => {
			r.label && e(d);
		}), g(c);
		var f = t(c, 2), m = (e) => {
			var t = Fr(), n = w(t, !0);
			g(t), b(() => {
				M(t, 1, K(Ft)), U(n, r.error);
			}), A(e, t);
		};
		F(f, (e) => {
			r.error && e(m);
		}), g(o), b((e) => M(o, 1, e), [() => K(Q("grid gap-2", r.class))]), A(e, o);
	};
	F(u, (e) => {
		o() ? e(d) : e(f, -1);
	}), A(e, l), y();
}
//#endregion
//#region ../ui/src/lib/monaco/configure-types.ts
var Rr = {
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
}, zr = "";
async function Br(e = [], t = {}) {
	if (e.length === 0) return;
	let n = e.map((e) => `${e.filePath ?? ""}\0${e.content}`).join("\0");
	if (!t.force && n === zr) return;
	zr = n;
	let r = (await import("./editor.main-xvnWKxZY.js")).languages.typescript, i = e.map((e) => ({
		content: e.content,
		filePath: e.filePath ?? "file:///project/node_modules/@stream-kit/script-api/index.d.ts"
	}));
	for (let e of [r.typescriptDefaults, r.javascriptDefaults]) e.setCompilerOptions({ ...Rr }), e.setDiagnosticsOptions({
		noSemanticValidation: !1,
		noSyntaxValidation: !1,
		noSuggestionDiagnostics: !1
	}), e.setExtraLibs(i);
}
//#endregion
//#region ../ui/src/lib/monaco/theme.ts
var Vr = {
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
}, Hr = {
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
}, Ur = {
	dark: "stream-kit-dark",
	light: "stream-kit-light"
};
function Wr(e) {
	e.editor.defineTheme(Ur.dark, Vr), e.editor.defineTheme(Ur.light, Hr);
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/editor/editor.worker.js?worker
function Gr(e) {
	return new Worker("/plugin-host/assets/editor.worker-aMaeT3Bg.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/css/css.worker.js?worker
function Kr(e) {
	return new Worker("/plugin-host/assets/css.worker-0WoSGFGE.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/html/html.worker.js?worker
function qr(e) {
	return new Worker("/plugin-host/assets/html.worker-DVhl5K-g.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/json/json.worker.js?worker
function Jr(e) {
	return new Worker("/plugin-host/assets/json.worker-BOHwf62w.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js?worker
function Yr(e) {
	return new Worker("/plugin-host/assets/ts.worker-BptJClIA.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../ui/src/lib/monaco/setup.ts
var Xr = !1;
function Zr() {
	Xr || typeof globalThis > "u" || (Xr = !0, globalThis.MonacoEnvironment = { getWorker(e, t) {
		switch (t) {
			case "json": return new Jr();
			case "css":
			case "scss":
			case "less": return new Kr();
			case "html":
			case "handlebars":
			case "razor": return new qr();
			case "typescript":
			case "javascript": return new Yr();
			default: return new Gr();
		}
	} });
}
//#endregion
//#region ../ui/src/lib/monaco/warmup-typescript.ts
function Qr(e) {
	return e.languages.typescript.getTypeScriptWorker;
}
async function $r(e, t = 40) {
	let n = Qr(e);
	for (let e = 0; e < t; e++) try {
		await n();
		return;
	} catch {
		await new Promise((e) => requestAnimationFrame(() => e()));
	}
	throw Error("TypeScript not registered after wait");
}
async function ei(e, t) {
	try {
		await $r(e), await (await (await Qr(e)())(t.uri)).getSemanticDiagnostics(t.uri.toString());
	} catch (e) {
		console.warn("[monaco] TypeScript warmup failed:", e);
	}
}
//#endregion
//#region ../ui/src/lib/monaco/script-reference.ts
var ti = "file:///project";
`${ti}`;
function ni(e) {
	let t = `${ti}/`;
	if (!e.startsWith(t)) return "";
	let n = e.slice(t.length).split("/").length - 1;
	return `/// <reference path="${"../".repeat(n)}node_modules/@stream-kit/script-api/index.d.ts" />\n`;
}
function ri(e, t) {
	let n = ni(t);
	return !n || e.includes("/// <reference path=") ? e : `${n}${e}`;
}
//#endregion
//#region ../ui/src/lib/monaco/variable-completion.ts
var ii = ["json"], ai = /* @__PURE__ */ new WeakMap(), oi = !1;
function si(e, t, n) {
	return ci(e), ai.set(t, n), () => {
		ai.get(t) === n && ai.delete(t);
	};
}
function ci(e) {
	if (!oi) {
		oi = !0;
		for (let t of ii) e.languages.registerCompletionItemProvider(t, {
			triggerCharacters: ["{"],
			provideCompletionItems(t, n) {
				let r = ai.get(t);
				if (!r) return { suggestions: [] };
				let i = t.getLineContent(n.lineNumber), a = Kt(i, n.column - 1);
				if (!a) return { suggestions: [] };
				let o = /^[a-zA-Z0-9_]*\}?/.exec(i.slice(a.end))?.[0] ?? "", s = new e.Range(n.lineNumber, a.start + 2, n.lineNumber, n.column + o.length);
				return { suggestions: Jt(r(), a.query).map((t, n) => ({
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
function li() {
	return typeof document > "u" ? "dark" : document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
function ui(e) {
	if (typeof document > "u") return () => {};
	let t = li(), n = new MutationObserver(() => {
		let n = li();
		n !== t && (t = n, e(n));
	});
	return n.observe(document.documentElement, {
		attributes: !0,
		attributeFilter: ["data-theme"]
	}), () => n.disconnect();
}
//#endregion
//#region ../ui/src/lib/components/variable-popover/variable-popover.svelte
var di = J("<p class=\"text-xs font-semibold text-dark-200\"> </p>"), fi = J("<p class=\"py-2 text-xs text-dark-400\"> </p>"), pi = J("<li><button type=\"button\"><div class=\"flex min-w-0 flex-1 items-center gap-2.5\"><span class=\"shrink-0 rounded border border-primary-300 bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary transition-all duration-150 group-hover:border-primary-500/20 group-hover:bg-primary-500/15\"> </span> <span class=\"min-w-0 truncate text-dark-300 transition-colors duration-150 group-hover:text-dark-100\"> </span></div> <div class=\"flex size-4 shrink-0 items-center justify-center\"><!></div></button></li>"), mi = J("<ul class=\"grid gap-1\"></ul>"), hi = J("<div class=\"mb-3 flex flex-col gap-2\"><!></div> <!>", 1), gi = J("<!> <!>", 1);
function _i(n, i) {
	c(i, !0);
	let a = D(i, "title", 3, "Variables"), o = D(i, "emptyLabel", 3, "No variables available."), s = D(i, "ariaLabel", 3, "Show variables"), l = D(i, "copiedLabel", 3, "Copied"), u = D(i, "insertedLabel", 3, "Inserted");
	D(i, "noResultsLabel", 3, "No variables match your search.");
	let d = D(i, "icon", 3, "ri:braces-line"), f = j(null);
	function m(e) {
		if (i.onInsert) {
			i.onInsert(e);
			return;
		}
		navigator.clipboard.writeText(`{${e}}`).then(() => {
			W(f, e, !0), setTimeout(() => {
				p(f) === e && W(f, null);
			}, 2e3);
		});
	}
	Et(n, {
		children: (n, c) => {
			var _ = gi(), v = h(_);
			Dt(v, {
				child: (e, t) => {
					jt(e, q(() => t?.().props, {
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
			}), Tt(t(v, 2), {
				align: "start",
				class: "w-80 p-4",
				children: (n, s) => {
					var c = hi(), d = h(c), _ = w(d), v = (e) => {
						var t = di(), n = w(t, !0);
						g(t), b(() => U(n, a())), A(e, t);
					};
					F(_, (e) => {
						a() && e(v);
					}), g(d);
					var y = t(d, 2), x = (e) => {
						var t = fi(), n = w(t, !0);
						g(t), b(() => U(n, o())), A(e, t);
					}, S = (n) => {
						Ot(n, {
							orientation: "vertical",
							viewportClasses: "max-h-48 overflow-hidden",
							children: (n, a) => {
								var o = mi();
								r(o, 21, () => i.variables, (e) => e.key, (n, r) => {
									var a = pi(), o = w(a), s = w(o), c = w(s), d = w(c, !0);
									g(c);
									var h = t(c, 2), _ = w(h, !0);
									g(h), g(s);
									var v = t(s, 2), y = w(v), x = (e) => {
										Z(e, {
											get icon() {
												return Pt;
											},
											class: "size-3.5 text-success-400"
										});
									}, S = (e) => {
										{
											let t = G(() => i.onInsert ? "ri:corner-down-left-line" : Nt);
											Z(e, {
												get icon() {
													return p(t);
												},
												class: "size-3.5 text-dark-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
											});
										}
									};
									F(y, (e) => {
										p(f) === p(r).key ? e(x) : e(S, -1);
									}), g(v), g(o), g(a), b((t) => {
										M(o, 1, t), e(o, "title", i.onInsert ? u() : l()), U(d, `{${p(r).key}}`), U(_, p(r).label);
									}, [() => K(Q("group flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-left text-xs transition-colors duration-150 hover:bg-dark-700 hover:text-dark-50"))]), Y("click", o, () => m(p(r).key)), A(n, a);
								}), g(o), A(n, o);
							},
							$$slots: { default: !0 }
						});
					};
					F(y, (e) => {
						i.variables.length === 0 ? e(x) : e(S, -1);
					}), A(n, c);
				},
				$$slots: { default: !0 }
			}), A(n, _);
		},
		$$slots: { default: !0 }
	}), y();
}
ne(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-code.svelte
var vi = J("<span></span>"), yi = J("<div class=\"flex items-center justify-between gap-2\"><!> <div class=\"flex items-center gap-1\"><!> <!> <!></div></div>"), bi = J("<div class=\"flex justify-end\"><!></div>"), xi = J("<div class=\"absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-dark-900/85\" role=\"status\" aria-live=\"polite\"><!> <p class=\"text-xs text-dark-300\"> </p></div>"), Si = J("<p> </p>"), Ci = J("<div><!> <!> <div role=\"textbox\" aria-multiline=\"true\"><!></div> <!></div>");
function wi(n, r) {
	c(r, !0);
	let a = D(r, "id", 19, Pe), s = D(r, "value", 3, ""), l = D(r, "language", 3, "typescript"), u = D(r, "minHeight", 3, "12rem"), d = D(r, "fillHeight", 3, !1), f = D(r, "formatOnBlur", 3, !0), m = D(r, "showFormatButton", 3, !0), h = D(r, "formatLabel", 3, "Format"), v = D(r, "showExpandButton", 3, !0), C = D(r, "expandLabel", 3, "Expand"), E = D(r, "collapseLabel", 3, "Close"), O = D(r, "extraLibs", 19, () => []), P = D(r, "loadingLabel", 3, "Loading..."), I = D(r, "variables", 19, () => []), L = D(r, "variablesTitle", 3, "Variables"), ee = D(r, "variablesAriaLabel", 3, "Insert variable"), R = j(!1), z = G(() => d() || p(R)), B = j(void 0), V = j(void 0), H = j(void 0), q = j(!1), J = !1, ne = !1, re = !1, Y = j(""), ie = !1, X, ae, oe;
	function se() {
		let e = document.createElement("div");
		return e.className = "monaco-editor stream-kit-monaco-overflow-host", document.body.appendChild(e), e;
	}
	function ce() {
		oe?.remove(), oe = void 0;
	}
	function le(e) {
		return e.map((e) => `${e.filePath ?? ""}\0${e.content}`).join("\0");
	}
	function $(e) {
		return r.modelUri ? ri(e, r.modelUri) : e;
	}
	function ue(e) {
		return e.replace(/^\/\/\/\s*<reference\s+path=(["'])[^"']+\1\s*\/>\s*\r?\n?/gm, "");
	}
	function de(e) {
		r.oninput && r.oninput({ currentTarget: { value: ue(e) } });
	}
	function fe(e) {
		let t = `{${e}}`;
		if (!p(V) || !p(H)) {
			de(`${s()}${t}`);
			return;
		}
		let n = p(V).getSelection();
		if (!n) {
			de(`${s()}${t}`);
			return;
		}
		p(V).executeEdits("insert-variable", [{
			range: n,
			text: t,
			forceMoveMarkers: !0
		}]), p(V).focus();
	}
	async function pe(e, t = !1) {
		e.length !== 0 && (await Br(e, { force: t }), W(Y, le(e), !0));
	}
	function me(e, t) {
		if (!r.modelUri) return;
		let n = e.Uri.parse(r.modelUri), i = l() === "json" ? "json" : "typescript", a = $(t), o = e.editor.getModel(n);
		return o ? (o.getValue() !== a && o.setValue(a), ie = !1, o) : (ie = !0, e.editor.createModel(a, i, n));
	}
	async function he(e, t) {
		if (!(!p(B) || ne || p(q))) {
			ne = !0;
			try {
				Zr();
				let n = await import("./editor.main-xvnWKxZY.js");
				if (J || !p(B)) return;
				W(H, n, !0), Wr(p(H)), ae?.(), ae = ui((e) => {
					p(H)?.editor.setTheme(Ur[e]);
				});
				let r = l() === "json" ? "json" : "typescript", i = me(n, t), a = e.length > 0;
				a && (oe = se()), W(V, p(H).editor.create(p(B), {
					model: i,
					value: i ? void 0 : t,
					language: i ? void 0 : r,
					theme: Ur[li()],
					automaticLayout: !0,
					...a && oe ? {
						fixedOverflowWidgets: !0,
						allowOverflow: !0,
						overflowWidgetsDomNode: oe
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
				}), !0), e.length > 0 && await pe(e);
				let o = p(V).getModel();
				o && (X = si(n, o, () => I())), p(V).onDidChangeModelContent(() => {
					re || !p(V) || de(p(V).getValue());
				}), f() && p(V).onDidBlurEditorText(() => {
					_e();
				}), i && await ei(n, i), W(q, !0);
			} finally {
				ne = !1;
			}
		}
	}
	function ge(e) {
		if (!p(V)) return;
		let t = p(V).getModel();
		!t || t.getValue() === e || (p(V).pushUndoStop(), p(V).executeEdits("format", [{
			range: t.getFullModelRange(),
			text: e,
			forceMoveMarkers: !0
		}]), p(V).pushUndoStop());
	}
	async function _e() {
		if (!p(V)) return;
		let e = p(V).getValue();
		if (ue(e).trim() !== "") {
			if (l() === "json") {
				try {
					ge(JSON.stringify(JSON.parse(e), null, 2));
				} catch {}
				return;
			}
			try {
				await p(V).getAction("editor.action.formatDocument")?.run();
			} catch {}
		}
	}
	o(() => {
		let e = p(B), t = O(), n = s() ?? "", i = r.modelUri;
		!e || p(q) || J || i && t.length === 0 || he(t, n);
	}), o(() => {
		if (!p(V) || !p(q)) return;
		let e = $(s() ?? "");
		if (p(V).getValue() === e) return;
		re = !0;
		let t = p(V).getSelections();
		p(V).pushUndoStop(), p(V).executeEdits("external-sync", [{
			range: p(V).getModel()?.getFullModelRange() ?? {
				startLineNumber: 1,
				startColumn: 1,
				endLineNumber: 1,
				endColumn: 1
			},
			text: e
		}], t ?? void 0), p(V).pushUndoStop(), re = !1;
	});
	function ve() {
		if (!p(V) || !p(B)) return;
		p(B).style.removeProperty("width"), p(z) && p(B).style.removeProperty("height");
		let e = p(B).clientWidth, t = p(B).clientHeight;
		e > 0 && t > 0 ? p(V).layout({
			width: e,
			height: t
		}) : p(V).layout();
	}
	o(() => {
		if (p(R), p(z), !p(V)) return;
		let e = 0, t = requestAnimationFrame(() => {
			e = requestAnimationFrame(() => ve());
		});
		return () => {
			cancelAnimationFrame(t), cancelAnimationFrame(e);
		};
	}), o(() => {
		!p(q) || !p(V) || !p(H) || O().length === 0 || le(O()) !== p(Y) && pe(O()).then(() => {
			let e = p(V)?.getModel();
			p(H) && e && ei(p(H), e);
		});
	}), S(() => {
		J = !0;
		let e = p(V)?.getModel();
		X?.(), ae?.(), p(V)?.dispose(), W(V, void 0), W(H, void 0), ce(), ie && e && !e.isDisposed() && e.dispose();
	});
	var ye = Ci();
	k("keydown", x, (e) => {
		p(R) && e.key === "Escape" && W(R, !1);
	});
	var be = w(ye), xe = (e) => {
		var n = yi(), i = w(n), o = (e) => {
			Nr(e, {
				get for() {
					return a();
				},
				children: (e, t) => {
					T();
					var n = N();
					b(() => U(n, r.label)), A(e, n);
				},
				$$slots: { default: !0 }
			});
		}, s = (e) => {
			A(e, vi());
		};
		F(i, (e) => {
			r.label ? e(o) : e(s, -1);
		});
		var c = t(i, 2), l = w(c), u = (e) => {
			jt(e, {
				type: "button",
				variant: "ghost",
				size: "xs",
				icon: "ri:magic-line",
				onclick: () => void _e(),
				class: "text-dark-400 hover:text-dark-100",
				children: (e, t) => {
					T();
					var n = N();
					b(() => U(n, h())), A(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		F(l, (e) => {
			m() && e(u);
		});
		var d = t(l, 2), f = (e) => {
			{
				let t = G(() => p(R) ? "ri:fullscreen-exit-line" : "ri:fullscreen-line"), n = G(() => p(R) ? E() : C());
				jt(e, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					get icon() {
						return p(t);
					},
					get "aria-label"() {
						return p(n);
					},
					onclick: () => W(R, !p(R)),
					class: "size-7 text-dark-400 hover:text-dark-100"
				});
			}
		};
		F(d, (e) => {
			v() && e(f);
		});
		var _ = t(d, 2), y = (e) => {
			_i(e, {
				get variables() {
					return I();
				},
				get title() {
					return L();
				},
				get ariaLabel() {
					return ee();
				},
				onInsert: fe
			});
		};
		F(_, (e) => {
			I().length > 0 && e(y);
		}), g(c), g(n), A(e, n);
	};
	F(be, (e) => {
		(r.label || I().length > 0 || m() || v()) && e(xe);
	});
	var Se = t(be, 2), Ce = (e) => {
		var t = bi();
		_(w(t), () => r.toolbar), g(t), A(e, t);
	};
	F(Se, (e) => {
		r.toolbar && e(Ce);
	});
	var we = t(Se, 2);
	let Te;
	var Ee = w(we), De = (n) => {
		var r = xi(), i = w(r);
		Z(i, {
			icon: "ri:loader-4-line",
			class: "size-5 animate-spin text-primary",
			"aria-hidden": "true"
		});
		var a = t(i, 2), o = w(a, !0);
		g(a), g(r), b(() => {
			e(r, "aria-label", P()), U(o, P());
		}), A(n, r);
	};
	F(Ee, (e) => {
		p(q) || e(De);
	}), g(we), i(we, (e) => W(B, e), () => p(B));
	var Oe = t(we, 2), ke = (e) => {
		var t = Si(), n = w(t, !0);
		g(t), b(() => {
			M(t, 1, K(Ft)), U(n, r.error);
		}), A(e, t);
	};
	F(Oe, (e) => {
		r.error && e(ke);
	}), g(ye), b((t, n) => {
		M(ye, 1, t), e(we, "id", a()), e(we, "aria-busy", !p(q)), e(we, "aria-invalid", r.error ? !0 : void 0), e(we, "aria-placeholder", r.placeholder), M(we, 1, n), Te = te(we, "", Te, { height: p(z) ? void 0 : u() });
	}, [() => K(Q("relative w-full min-w-0", p(R) ? "fixed inset-0 z-60 flex flex-col gap-3 bg-dark-900 p-4" : d() ? "flex h-full min-h-0 flex-1 flex-col" : "grid gap-2")), () => K(Q("relative z-52 w-full min-w-0 max-w-full overflow-visible rounded-lg border bg-dark-900 focus-within:ring-2", p(z) ? "flex min-h-0 flex-1 flex-col" : "", r.error ? "border-destructive focus-within:ring-destructive" : "border-border focus-within:ring-ring", r.class))]), A(n, ye), y();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/utils/texts.js
var Ti = {
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
}, Ei = "a[href], area[href], input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
function Di(e) {
	return function(t) {
		if (t.target === window) return;
		let n = t.target;
		if (!e.contains(n)) return;
		let r = e.querySelectorAll(Ei), i = r[0], a = r[r.length - 1];
		function o(e) {
			return e.code === "Tab" && !e.shiftKey;
		}
		function s(e) {
			return e.code === "Tab" && e.shiftKey;
		}
		o(t) && t.target === a ? (t.preventDefault(), i.focus()) : s(t) && t.target === i && (t.preventDefault(), a.focus());
	};
}
var Oi = (e) => {
	let t = e.querySelector(Ei);
	t && t.focus();
	let n = Di(e);
	return document.addEventListener("keydown", n), { destroy() {
		document.removeEventListener("keydown", n);
	} };
}, ki = {
	grad: .9,
	turn: 360,
	rad: 360 / (2 * Math.PI)
}, Ai = function(e) {
	return typeof e == "string" ? e.length > 0 : typeof e == "number";
}, ji = function(e, t, n) {
	return t === void 0 && (t = 0), n === void 0 && (n = 10 ** t), Math.round(n * e) / n + 0;
}, Mi = function(e, t, n) {
	return t === void 0 && (t = 0), n === void 0 && (n = 1), e > n ? n : e > t ? e : t;
}, Ni = function(e) {
	return (e = isFinite(e) ? e % 360 : 0) > 0 ? e : e + 360;
}, Pi = function(e) {
	return {
		r: Mi(e.r, 0, 255),
		g: Mi(e.g, 0, 255),
		b: Mi(e.b, 0, 255),
		a: Mi(e.a)
	};
}, Fi = function(e) {
	return {
		r: ji(e.r),
		g: ji(e.g),
		b: ji(e.b),
		a: ji(e.a, 3)
	};
}, Ii = /^#([0-9a-f]{3,8})$/i, Li = function(e) {
	var t = e.toString(16);
	return t.length < 2 ? "0" + t : t;
}, Ri = function(e) {
	var t = e.r, n = e.g, r = e.b, i = e.a, a = Math.max(t, n, r), o = a - Math.min(t, n, r), s = o ? a === t ? (n - r) / o : a === n ? 2 + (r - t) / o : 4 + (t - n) / o : 0;
	return {
		h: 60 * (s < 0 ? s + 6 : s),
		s: a ? o / a * 100 : 0,
		v: a / 255 * 100,
		a: i
	};
}, zi = function(e) {
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
}, Bi = function(e) {
	return {
		h: Ni(e.h),
		s: Mi(e.s, 0, 100),
		l: Mi(e.l, 0, 100),
		a: Mi(e.a)
	};
}, Vi = function(e) {
	return {
		h: ji(e.h),
		s: ji(e.s),
		l: ji(e.l),
		a: ji(e.a, 3)
	};
}, Hi = function(e) {
	return zi((n = (t = e).s, {
		h: t.h,
		s: (n *= ((r = t.l) < 50 ? r : 100 - r) / 100) > 0 ? 2 * n / (r + n) * 100 : 0,
		v: r + n,
		a: t.a
	}));
	var t, n, r;
}, Ui = function(e) {
	return {
		h: (t = Ri(e)).h,
		s: (i = (200 - (n = t.s)) * (r = t.v) / 100) > 0 && i < 200 ? n * r / 100 / (i <= 100 ? i : 200 - i) * 100 : 0,
		l: i / 2,
		a: t.a
	};
	var t, n, r, i;
}, Wi = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Gi = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Ki = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, qi = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Ji = {
	string: [
		[function(e) {
			var t = Ii.exec(e);
			return t ? (e = t[1]).length <= 4 ? {
				r: parseInt(e[0] + e[0], 16),
				g: parseInt(e[1] + e[1], 16),
				b: parseInt(e[2] + e[2], 16),
				a: e.length === 4 ? ji(parseInt(e[3] + e[3], 16) / 255, 2) : 1
			} : e.length === 6 || e.length === 8 ? {
				r: parseInt(e.substr(0, 2), 16),
				g: parseInt(e.substr(2, 2), 16),
				b: parseInt(e.substr(4, 2), 16),
				a: e.length === 8 ? ji(parseInt(e.substr(6, 2), 16) / 255, 2) : 1
			} : null : null;
		}, "hex"],
		[function(e) {
			var t = Ki.exec(e) || qi.exec(e);
			return t ? t[2] !== t[4] || t[4] !== t[6] ? null : Pi({
				r: Number(t[1]) / (t[2] ? 100 / 255 : 1),
				g: Number(t[3]) / (t[4] ? 100 / 255 : 1),
				b: Number(t[5]) / (t[6] ? 100 / 255 : 1),
				a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1)
			}) : null;
		}, "rgb"],
		[function(e) {
			var t = Wi.exec(e) || Gi.exec(e);
			if (!t) return null;
			var n, r;
			return Hi(Bi({
				h: (n = t[1], r = t[2], r === void 0 && (r = "deg"), Number(n) * (ki[r] || 1)),
				s: Number(t[3]),
				l: Number(t[4]),
				a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1)
			}));
		}, "hsl"]
	],
	object: [
		[function(e) {
			var t = e.r, n = e.g, r = e.b, i = e.a, a = i === void 0 ? 1 : i;
			return Ai(t) && Ai(n) && Ai(r) ? Pi({
				r: Number(t),
				g: Number(n),
				b: Number(r),
				a: Number(a)
			}) : null;
		}, "rgb"],
		[function(e) {
			var t = e.h, n = e.s, r = e.l, i = e.a, a = i === void 0 ? 1 : i;
			return !Ai(t) || !Ai(n) || !Ai(r) ? null : Hi(Bi({
				h: Number(t),
				s: Number(n),
				l: Number(r),
				a: Number(a)
			}));
		}, "hsl"],
		[function(e) {
			var t = e.h, n = e.s, r = e.v, i = e.a, a = i === void 0 ? 1 : i;
			return !Ai(t) || !Ai(n) || !Ai(r) ? null : zi(function(e) {
				return {
					h: Ni(e.h),
					s: Mi(e.s, 0, 100),
					v: Mi(e.v, 0, 100),
					a: Mi(e.a)
				};
			}({
				h: Number(t),
				s: Number(n),
				v: Number(r),
				a: Number(a)
			}));
		}, "hsv"]
	]
}, Yi = function(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n][0](e);
		if (r) return [r, t[n][1]];
	}
	return [null, void 0];
}, Xi = function(e) {
	return typeof e == "string" ? Yi(e.trim(), Ji.string) : typeof e == "object" && e ? Yi(e, Ji.object) : [null, void 0];
}, Zi = function(e, t) {
	var n = Ui(e);
	return {
		h: n.h,
		s: Mi(n.s + 100 * t, 0, 100),
		l: n.l,
		a: n.a
	};
}, Qi = function(e) {
	return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3 / 255;
}, $i = function(e, t) {
	var n = Ui(e);
	return {
		h: n.h,
		s: n.s,
		l: Mi(n.l + 100 * t, 0, 100),
		a: n.a
	};
}, ea = function() {
	function e(e) {
		this.parsed = Xi(e)[0], this.rgba = this.parsed || {
			r: 0,
			g: 0,
			b: 0,
			a: 1
		};
	}
	return e.prototype.isValid = function() {
		return this.parsed !== null;
	}, e.prototype.brightness = function() {
		return ji(Qi(this.rgba), 2);
	}, e.prototype.isDark = function() {
		return Qi(this.rgba) < .5;
	}, e.prototype.isLight = function() {
		return Qi(this.rgba) >= .5;
	}, e.prototype.toHex = function() {
		return e = Fi(this.rgba), t = e.r, n = e.g, r = e.b, a = (i = e.a) < 1 ? Li(ji(255 * i)) : "", "#" + Li(t) + Li(n) + Li(r) + a;
		var e, t, n, r, i, a;
	}, e.prototype.toRgb = function() {
		return Fi(this.rgba);
	}, e.prototype.toRgbString = function() {
		return e = Fi(this.rgba), t = e.r, n = e.g, r = e.b, (i = e.a) < 1 ? "rgba(" + t + ", " + n + ", " + r + ", " + i + ")" : "rgb(" + t + ", " + n + ", " + r + ")";
		var e, t, n, r, i;
	}, e.prototype.toHsl = function() {
		return Vi(Ui(this.rgba));
	}, e.prototype.toHslString = function() {
		return e = Vi(Ui(this.rgba)), t = e.h, n = e.s, r = e.l, (i = e.a) < 1 ? "hsla(" + t + ", " + n + "%, " + r + "%, " + i + ")" : "hsl(" + t + ", " + n + "%, " + r + "%)";
		var e, t, n, r, i;
	}, e.prototype.toHsv = function() {
		return e = Ri(this.rgba), {
			h: ji(e.h),
			s: ji(e.s),
			v: ji(e.v),
			a: ji(e.a, 3)
		};
		var e;
	}, e.prototype.invert = function() {
		return ta({
			r: 255 - (e = this.rgba).r,
			g: 255 - e.g,
			b: 255 - e.b,
			a: e.a
		});
		var e;
	}, e.prototype.saturate = function(e) {
		return e === void 0 && (e = .1), ta(Zi(this.rgba, e));
	}, e.prototype.desaturate = function(e) {
		return e === void 0 && (e = .1), ta(Zi(this.rgba, -e));
	}, e.prototype.grayscale = function() {
		return ta(Zi(this.rgba, -1));
	}, e.prototype.lighten = function(e) {
		return e === void 0 && (e = .1), ta($i(this.rgba, e));
	}, e.prototype.darken = function(e) {
		return e === void 0 && (e = .1), ta($i(this.rgba, -e));
	}, e.prototype.rotate = function(e) {
		return e === void 0 && (e = 15), this.hue(this.hue() + e);
	}, e.prototype.alpha = function(e) {
		return typeof e == "number" ? ta({
			r: (t = this.rgba).r,
			g: t.g,
			b: t.b,
			a: e
		}) : ji(this.rgba.a, 3);
		var t;
	}, e.prototype.hue = function(e) {
		var t = Ui(this.rgba);
		return typeof e == "number" ? ta({
			h: e,
			s: t.s,
			l: t.l,
			a: t.a
		}) : ji(t.h);
	}, e.prototype.isEqual = function(e) {
		return this.toHex() === ta(e).toHex();
	}, e;
}(), ta = function(e) {
	return e instanceof ea ? e : new ea(e);
}, na = J("<input type=\"hidden\"/>"), ra = J("<div role=\"slider\" tabindex=\"0\"><div class=\"track svelte-1liqhfd\"></div> <div class=\"thumb svelte-1liqhfd\"></div></div> <!>", 1), ia = {
	hash: "svelte-1liqhfd",
	code: ".slider.svelte-1liqhfd {---track-width: var(--track-width, unset);---track-height: var(--track-height, 6px);---track-background: var(--track-background, #949494);---track-border: var(--track-border, none);---thumb-size: var(--thumb-size, 16px);---thumb-background: var(--thumb-background, #2d2d2d);---thumb-border: var(--thumb-border, none);---position: var(--position, 0px);---margin-inline-thumb-bigger: max(var(---thumb-size) - var(---track-height), 0px);---margin-inline-thumb-smaller: max(var(---track-height) - var(---thumb-size), 0px);position:relative;margin:auto;user-select:none;-webkit-user-select:none;background-color:transparent;cursor:pointer;}.slider.svelte-1liqhfd::before {background-color:transparent;}[aria-orientation='horizontal'].svelte-1liqhfd {width:var(---track-width);max-width:calc(100% - 2 * var(---margin-inline-thumb-bigger));height:calc(max(var(---track-height), var(---thumb-size)) + 4px);height:max(var(---track-height), var(---thumb-size));margin-inline:var(---margin-inline-thumb-bigger);margin-block:var(--margin-block, 8px);}[aria-orientation='vertical'].svelte-1liqhfd {width:max(var(---track-height), var(---thumb-size));height:var(---track-width);max-height:calc(100% - 2 * var(---margin-inline-thumb-bigger));margin-block:var(---margin-inline-thumb-bigger);margin-inline:var(--margin-block, 8px);}.track.svelte-1liqhfd {position:absolute;pointer-events:none;background:var(---track-background);border:var(---track-border);border-radius:calc(var(---track-height) / 2);box-sizing:border-box;}[aria-orientation='horizontal'].svelte-1liqhfd .track:where(.svelte-1liqhfd) {height:var(---track-height);top:50%;transform:translateY(-50%);left:0;right:0;}[aria-orientation='vertical'].svelte-1liqhfd .track:where(.svelte-1liqhfd) {width:var(---track-height);left:50%;transform:translateX(-50%);top:0;bottom:0;}.thumb.svelte-1liqhfd {pointer-events:none;position:absolute;height:var(---thumb-size);width:var(---thumb-size);border-radius:calc(var(---thumb-size) / 2);background:var(---thumb-background);border:var(---thumb-border);box-sizing:border-box;transform:translate(-50%, -50%);--margin-left: (2 * var(---track-height) - var(---thumb-size) - var(---margin-inline-thumb-smaller)) / 2;--left: calc(var(---position) * (100% - 2 * var(--margin-left)) + var(--margin-left));}[aria-orientation='horizontal'].svelte-1liqhfd:not(.reverse) .thumb:where(.svelte-1liqhfd) {top:50%;left:var(--left);}[aria-orientation='vertical'].svelte-1liqhfd:not(.reverse) .thumb:where(.svelte-1liqhfd) {left:50%;bottom:calc(var(--left) - var(---thumb-size));}[aria-orientation='horizontal'].reverse.svelte-1liqhfd .thumb:where(.svelte-1liqhfd) {top:50%;right:calc(var(--left) - var(---thumb-size));}[aria-orientation='vertical'].reverse.svelte-1liqhfd .thumb:where(.svelte-1liqhfd) {left:50%;top:calc(var(--left));}.slider.svelte-1liqhfd:focus-visible {outline:none;}.slider.svelte-1liqhfd:focus-visible .track:where(.svelte-1liqhfd) {outline:2px solid var(--focus-color, red);outline-offset:2px;}"
};
function aa(n, r) {
	c(r, !0), E(n, ia);
	let a = D(r, "min", 3, 0), o = D(r, "max", 3, 100), s = D(r, "step", 3, 1), l = D(r, "value", 15, 50), u = D(r, "ariaValueText", 3, (e) => e.toString()), d = D(r, "direction", 3, "horizontal"), f = D(r, "reverse", 3, !1), g = D(r, "keyboardOnly", 3, !1), _ = D(r, "slider", 7), v = D(r, "isDragging", 7, !1), S = G(() => typeof a() == "string" ? parseFloat(a()) : a()), C = G(() => typeof o() == "string" ? parseFloat(o()) : o()), w = G(() => typeof s() == "string" ? parseFloat(s()) : s());
	function T(e) {
		let t = 1 / p(w), n = Math.round(e * t) / t;
		return Math.max(p(S), Math.min(p(C), n));
	}
	function j(e) {
		let t = e.shiftKey ? p(w) * 10 : p(w);
		e.key === "ArrowUp" || e.key === "ArrowRight" ? (l(l() + t), e.preventDefault()) : e.key === "ArrowDown" || e.key === "ArrowLeft" ? (l(l() - t), e.preventDefault()) : e.key === "Home" ? (l(p(S)), e.preventDefault()) : e.key === "End" ? (l(p(C)), e.preventDefault()) : e.key === "PageUp" ? (l(l() + p(w) * 10), e.preventDefault()) : e.key === "PageDown" && (l(l() - p(w) * 10), e.preventDefault()), l(T(l())), r.onInput?.(l());
	}
	let N = {
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
		let t = _()?.[N[d()].clientSize] || 120, n = _()?.getBoundingClientRect()[N[d()].offset] || 0, i = e[N[d()].client] - n;
		d() === "vertical" && (i = -1 * i + t), f() ? l(p(C) - i / t * (p(C) - p(S))) : l(i / t * (p(C) - p(S)) + p(S)), l(T(l())), r.onInput?.(l());
	}
	function I(e) {
		P(e), v(!0);
	}
	function L(e) {
		v() && P(e);
	}
	function ee() {
		v(!1);
	}
	function R(e) {
		e.preventDefault(), P({
			clientX: e.changedTouches[0].clientX,
			clientY: e.changedTouches[0].clientY
		});
	}
	let z = G(() => ((l() - p(S)) / (p(C) - p(S)) * 1).toFixed(4));
	var B = ra();
	k("mousemove", x, L), k("mouseup", x, ee);
	var V = h(B);
	let H, U;
	i(V, (e) => _(e), () => _());
	var W = t(V, 2), K = (t) => {
		var n = na();
		m(n), b(() => {
			e(n, "name", r.name), O(n, l());
		}), A(t, n);
	};
	F(W, (e) => {
		r.name && e(K);
	}), b((t) => {
		H = M(V, 1, "slider svelte-1liqhfd", null, H, { reverse: f() }), e(V, "aria-orientation", d()), e(V, "aria-valuemax", p(C)), e(V, "aria-valuemin", p(S)), e(V, "aria-valuenow", l()), e(V, "aria-valuetext", t), e(V, "aria-label", r.ariaLabel), e(V, "aria-labelledby", r.ariaLabelledBy), e(V, "aria-controls", r.ariaControls), U = te(V, "", U, { "--position": p(z) });
	}, [() => u()(l())]), Y("keydown", V, j), Y("mousedown", V, function(...e) {
		(g() ? void 0 : I)?.apply(this, e);
	}), Y("touchstart", V, function(...e) {
		(g() ? void 0 : R)?.apply(this, e);
	}, void 0, !0), Y("touchmove", V, function(...e) {
		(g() ? void 0 : R)?.apply(this, e);
	}, void 0, !0), Y("touchend", V, function(...e) {
		(g() ? void 0 : R)?.apply(this, e);
	}), A(n, B), y();
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
var oa = J("<div class=\"picker svelte-uaq9ej\"><!> <div class=\"s svelte-uaq9ej\"><!></div> <div class=\"v svelte-uaq9ej\"><!></div></div>"), sa = {
	hash: "svelte-uaq9ej",
	code: ".picker.svelte-uaq9ej {position:relative;display:inline-block;width:var(--picker-width, 200px);height:var(--picker-height, 200px);background:linear-gradient(#ffffff00, #000000ff), linear-gradient(0.25turn, #ffffffff, #00000000), var(--picker-color-bg);border-radius:var(--picker-radius, 8px);outline:none;user-select:none;cursor:pointer;}.s.svelte-uaq9ej,\n	.v.svelte-uaq9ej {position:absolute;--track-background: none;--track-border: none;--thumb-background: none;--thumb-border: none;--thumb-size: 2px;--margin-block: 0;--track-height: var(--picker-indicator-size, 10px);user-select:none;-webkit-user-select:none;}.s.svelte-uaq9ej {top:calc(var(--pos-y) * (var(--picker-height, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);left:2px;--track-width: calc(var(--picker-width, 200px) - 4px);}.v.svelte-uaq9ej {top:2px;left:calc(var(--pos-x) * (var(--picker-width, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);--track-width: calc(var(--picker-height, 200px) - 4px);}"
};
function ca(e, r) {
	c(r, !0), E(e, sa);
	let a = D(r, "s", 15), s = D(r, "v", 15), l = j(void 0), u = !1, d = j(V({
		x: 100,
		y: 0
	})), f = G(() => ta({
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
		a(m(o.x / t, 0, 1) * 100), s(m((r - o.y) / r, 0, 1) * 100), T();
	}
	function _(e) {
		e.preventDefault(), e.button === 0 && (u = !0, h(e));
	}
	function v() {
		u = !1;
	}
	function S(e) {
		u && h(e);
	}
	function C(e) {
		e.preventDefault(), h(e.changedTouches[0]);
	}
	o(() => {
		typeof a() == "number" && typeof s() == "number" && p(l) && W(d, {
			x: a(),
			y: 100 - s()
		}, !0);
	});
	function T(e = {}) {
		r.onInput({
			s: a(),
			v: s(),
			...e
		});
	}
	var O = oa();
	k("mouseup", x, v), k("mousemove", x, S);
	let M;
	var N = w(O);
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
	aa(w(P), {
		get value() {
			return a();
		},
		onInput: (e) => T({ s: e }),
		keyboardOnly: !0,
		ariaValueText: (e) => `${e}%`,
		get ariaLabel() {
			return r.texts.label.s;
		}
	}), g(P);
	var I = t(P, 2);
	let L;
	aa(w(I), {
		get value() {
			return s();
		},
		onInput: (e) => T({ v: e }),
		keyboardOnly: !0,
		ariaValueText: (e) => `${e}%`,
		direction: "vertical",
		get ariaLabel() {
			return r.texts.label.v;
		}
	}), g(I), g(O), i(O, (e) => W(l, e), () => p(l)), b(() => {
		M = te(O, "", M, { "--picker-color-bg": p(f) }), F = te(P, "", F, { "--pos-y": p(d).y }), L = te(I, "", L, { "--pos-x": p(d).x });
	}), Y("mousedown", O, _), Y("touchstart", O, C, void 0, !0), Y("touchmove", O, C, void 0, !0), Y("touchend", O, C), A(e, O), y();
}
ne([
	"mousedown",
	"touchstart",
	"touchmove",
	"touchend"
]);
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/variant/default/Input.svelte
var la = J("<label class=\"svelte-1v9snvp\"><div class=\"container svelte-1v9snvp\"><input type=\"color\" aria-haspopup=\"dialog\" class=\"svelte-1v9snvp\"/> <div class=\"alpha svelte-1v9snvp\"></div> <div class=\"color svelte-1v9snvp\"></div></div> </label>"), ua = {
	hash: "svelte-1v9snvp",
	code: "label.svelte-1v9snvp {display:inline-flex;align-items:center;gap:8px;cursor:pointer;border-radius:3px;margin:4px;height:var(--input-size, 25px);user-select:none;}.container.svelte-1v9snvp {position:relative;display:block;display:flex;align-items:center;justify-content:center;width:var(--input-size, 25px);}input.svelte-1v9snvp {margin:0;padding:0;border:none;width:1px;height:1px;flex-shrink:0;opacity:0;}.alpha.svelte-1v9snvp {clip-path:circle(50%);background:var(--alpha-grid-bg);}.alpha.svelte-1v9snvp,\n	.color.svelte-1v9snvp {position:absolute;width:var(--input-size, 25px);height:var(--input-size, 25px);border-radius:50%;user-select:none;}.alpha.svelte-1v9snvp {width:calc(var(--input-size, 25px) - 2px);height:calc(var(--input-size, 25px) - 2px);}input.svelte-1v9snvp:focus-visible ~ .color:where(.svelte-1v9snvp) {outline:2px solid var(--focus-color, red);outline-offset:2px;}"
};
function da(n, r) {
	c(r, !0), E(n, ua);
	let a = D(r, "labelElement", 15), o = D(r, "name", 3, void 0);
	function s(e) {
		e.preventDefault();
	}
	var l = la(), u = w(l), d = w(u);
	m(d);
	var f = t(d, 4);
	let p;
	g(u);
	var h = t(u);
	g(l), i(l, (e) => a(e), () => a()), b(() => {
		e(l, "dir", r.dir), e(d, "name", o()), O(d, r.hex), p = te(f, "", p, { background: r.hex }), U(h, ` ${r.label ?? ""}`), l.dir = l.dir;
	}), Y("click", l, s), Y("mousedown", l, s), Y("click", d, s), Y("mousedown", d, s), A(n, l), y();
}
ne(["click", "mousedown"]);
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/variant/default/NullabilityCheckbox.svelte
var fa = J("<label class=\"nullability-checkbox svelte-1c6qol9\"><div class=\"svelte-1c6qol9\"><input type=\"checkbox\" class=\"svelte-1c6qol9\"/> <span class=\"svelte-1c6qol9\"></span></div> </label>"), pa = {
	hash: "svelte-1c6qol9",
	code: "label.svelte-1c6qol9 {display:flex;justify-content:center;margin-bottom:4px;grid-area:nullable;user-select:none;}input.svelte-1c6qol9 {margin:0;}input.svelte-1c6qol9:focus-visible {outline:none;}input.svelte-1c6qol9:focus-visible + span:where(.svelte-1c6qol9) {width:14px;height:14px;border-radius:2px;outline:2px solid var(--focus-color, red);outline-offset:2px;}div.svelte-1c6qol9 {width:32px;aspect-ratio:2;position:relative;}div.svelte-1c6qol9 :where(.svelte-1c6qol9) {position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);}"
};
function ma(e, n) {
	c(n, !0), E(e, pa);
	let r = D(n, "isUndefined", 15);
	var i = fa(), a = w(i), o = w(a);
	m(o), T(2), g(a);
	var l = t(a);
	g(i), b(() => U(l, ` ${n.texts.label.withoutColor ?? ""}`)), s(o, r), A(e, i), y();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/variant/default/PickerIndicator.svelte
var ha = J("<div class=\"picker-indicator svelte-1ueiphq\"></div>"), ga = {
	hash: "svelte-1ueiphq",
	code: "div.svelte-1ueiphq {position:absolute;left:calc(var(--pos-x) * (var(--picker-width, 200px) - 2px) / 100 - var(--picker-indicator-size, 10px) / 2 + 1px);top:calc(var(--pos-y) * (var(--picker-height, 200px) - 2px) / 100 - var(--picker-indicator-size, 10px) / 2 + 1px);width:var(--picker-indicator-size, 10px);height:var(--picker-indicator-size, 10px);background-color:white;box-shadow:0 0 4px black;border-radius:50%;pointer-events:none;z-index:1;transition:box-shadow 0.2s;}"
};
function _a(e, t) {
	c(t, !0), E(e, ga);
	var n = ha();
	let r;
	b(() => r = te(n, "", r, {
		"--pos-x": t.pos.x,
		"--pos-y": t.pos.y
	})), A(e, n), y();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/variant/default/Swatches.svelte
var va = J("<button type=\"button\" class=\"swatch svelte-992gtx\"></button>"), ya = J("<div class=\"swatches svelte-992gtx\"></div>"), ba = {
	hash: "svelte-992gtx",
	code: ".swatches.svelte-992gtx {display:grid;grid-template-columns:var(--cp-swatch-grid-template-columns, repeat(auto-fit, minmax(24px, 1fr)));gap:8px;width:100%;height:100%;margin-top:8px;margin-bottom:8px;}.swatch.svelte-992gtx {cursor:pointer;margin:0;padding:0;border:none;width:100%;aspect-ratio:1 / 1;height:auto;display:block;}.swatch.svelte-992gtx:focus {outline:2px solid var(--focus-color, red);outline-offset:2px;}"
};
function xa(t, n) {
	c(n, !0), E(t, ba);
	var i = L(), a = h(i), o = (t) => {
		var i = ya();
		r(i, 20, () => n.swatches, (e) => e, (t, r) => {
			var i = va();
			b((t) => {
				te(i, `background: ${r ?? ""}`), e(i, "aria-label", t);
			}, [() => n.texts.swatch.ariaLabel(r)]), Y("click", i, () => n.selectSwatch(r)), A(t, i);
		}), g(i), b(() => e(i, "aria-label", n.texts.swatch.ariaTitle)), A(t, i);
	};
	F(a, (e) => {
		n.swatches && e(o);
	}), A(t, i), y();
}
ne(["click"]);
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/variant/default/TextInput.svelte
var Sa = J("<input class=\"svelte-g47n3c\"/>"), Ca = J("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-g47n3c\"/> <input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-g47n3c\"/> <input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-g47n3c\"/>", 1), wa = J("<input type=\"number\" min=\"0\" max=\"360\" class=\"svelte-g47n3c\"/> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-g47n3c\"/> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-g47n3c\"/>", 1), Ta = J("<input type=\"number\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-g47n3c\"/>"), Ea = J("<button type=\"button\" class=\"svelte-g47n3c\"><span class=\"disappear svelte-g47n3c\" aria-hidden=\"true\"> </span> <span class=\"appear svelte-g47n3c\"> </span></button>"), Da = J("<div class=\"button-like svelte-g47n3c\"> </div>"), Oa = J("<div class=\"text-input svelte-g47n3c\"><div class=\"input-container svelte-g47n3c\"><!> <!></div> <!></div>"), ka = {
	hash: "svelte-g47n3c",
	code: ".text-input.svelte-g47n3c {margin:var(--text-input-margin, 5px 0 0);}.input-container.svelte-g47n3c {display:flex;flex:1;gap:10px;}input.svelte-g47n3c,\n	button.svelte-g47n3c,\n	.button-like.svelte-g47n3c {flex:1;border:none;background-color:var(--cp-input-color, #eee);color:var(--cp-text-color, var(--cp-border-color));padding:0;border-radius:5px;height:30px;line-height:30px;text-align:center;}input.svelte-g47n3c {width:5px;font-family:inherit;}button.svelte-g47n3c,\n	.button-like.svelte-g47n3c {position:relative;flex:1;margin:8px 0 0;height:30px;width:100%;transition:background-color 0.2s;cursor:pointer;font-family:inherit;}.button-like.svelte-g47n3c {cursor:default;}.appear.svelte-g47n3c,\n	.disappear.svelte-g47n3c {position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);width:100%;transition:all 0.5s;}button.svelte-g47n3c:hover .disappear:where(.svelte-g47n3c),\n	.appear.svelte-g47n3c {opacity:0;}.disappear.svelte-g47n3c,\n	button.svelte-g47n3c:hover .appear:where(.svelte-g47n3c) {opacity:1;}button.svelte-g47n3c:hover {background-color:var(--cp-button-hover-color, #ccc);}input.svelte-g47n3c:focus,\n	button.svelte-g47n3c:focus {outline:none;}input.svelte-g47n3c:focus-visible,\n	button.svelte-g47n3c:focus-visible {outline:2px solid var(--focus-color, red);outline-offset:2px;}"
};
function Aa(n, r) {
	c(r, !0), E(n, ka);
	let i = D(r, "rgb", 15), a = D(r, "hsv", 15), o = D(r, "hex", 15), s = /^#?([A-F0-9]{6}|[A-F0-9]{8})$/i, l = G(() => r.textInputModes[0] || "hex"), u = G(() => r.textInputModes[(r.textInputModes.indexOf(p(l)) + 1) % r.textInputModes.length]), d = G(() => Math.round(a().h)), f = G(() => Math.round(a().s)), _ = G(() => Math.round(a().v)), v = G(() => a().a === void 0 ? 1 : Math.round(a().a * 100) / 100);
	function x(e) {
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
	var T = Oa(), k = w(T), j = w(k), M = (t) => {
		var n = Sa();
		m(n), te(n, "", {}, { flex: 3 }), b(() => {
			e(n, "aria-label", r.texts.label.hex), O(n, o());
		}), Y("input", n, x), A(t, n);
	}, N = (n) => {
		var a = Ca(), o = h(a);
		m(o);
		var s = G(() => S("r")), c = t(o, 2);
		m(c);
		var l = G(() => S("g")), u = t(c, 2);
		m(u);
		var d = G(() => S("b"));
		b(() => {
			e(o, "aria-label", r.texts.label.r), O(o, i().r), e(c, "aria-label", r.texts.label.g), O(c, i().g), e(u, "aria-label", r.texts.label.b), O(u, i().b);
		}), Y("input", o, function(...e) {
			p(s)?.apply(this, e);
		}), Y("input", c, function(...e) {
			p(l)?.apply(this, e);
		}), Y("input", u, function(...e) {
			p(d)?.apply(this, e);
		}), A(n, a);
	}, P = (n) => {
		var i = wa(), a = h(i);
		m(a);
		var o = G(() => C("h")), s = t(a, 2);
		m(s);
		var c = G(() => C("s")), l = t(s, 2);
		m(l);
		var u = G(() => C("v"));
		b(() => {
			e(a, "aria-label", r.texts.label.h), O(a, p(d)), e(s, "aria-label", r.texts.label.s), O(s, p(f)), e(l, "aria-label", r.texts.label.v), O(l, p(_));
		}), Y("input", a, function(...e) {
			p(o)?.apply(this, e);
		}), Y("input", s, function(...e) {
			p(c)?.apply(this, e);
		}), Y("input", l, function(...e) {
			p(u)?.apply(this, e);
		}), A(n, i);
	};
	F(j, (e) => {
		p(l) === "hex" ? e(M) : p(l) === "rgb" ? e(N, 1) : e(P, -1);
	});
	var I = t(j, 2), L = (t) => {
		var n = Ta();
		m(n);
		var i = G(() => p(l) === "hsv" ? C("a") : S("a"));
		b(() => {
			e(n, "aria-label", r.texts.label.a), O(n, p(v));
		}), Y("input", n, function(...e) {
			p(i)?.apply(this, e);
		}), A(t, n);
	};
	F(I, (e) => {
		r.isAlpha && e(L);
	}), g(k);
	var ee = t(k, 2), R = (e) => {
		var n = Ea(), i = w(n), a = w(i, !0);
		g(i);
		var o = t(i, 2), s = w(o);
		g(o), g(n), b(() => {
			U(a, r.texts.color[p(l)]), U(s, `${r.texts.changeTo ?? ""} ${r.texts.color[p(u)] ?? ""}`);
		}), Y("click", n, () => W(l, p(u))), A(e, n);
	}, z = (e) => {
		var t = Da(), n = w(t, !0);
		g(t), b(() => U(n, r.texts.color[p(l)])), A(e, t);
	};
	F(ee, (e) => {
		r.textInputModes.length > 1 ? e(R) : e(z, -1);
	}), g(T), A(n, T), y();
}
ne(["input", "click"]);
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/variant/default/Wrapper.svelte
var ja = J("<div aria-label=\"color picker\"><!></div>"), Ma = {
	hash: "svelte-aokvdq",
	code: "div.svelte-aokvdq {padding:8px;background-color:var(--cp-bg-color, white);margin:0 10px 10px;border:1px solid var(--cp-border-color, black);border-radius:12px;display:none;width:max-content;}.is-open.svelte-aokvdq {display:inline-block;}[role='dialog'].svelte-aokvdq {position:absolute;top:calc(var(--input-size, 25px) + 12px);left:0;z-index:var(--picker-z-index, 2);}"
};
function Na(t, n) {
	c(n, !0), E(t, Ma);
	let r = D(n, "wrapper", 15);
	var a = ja();
	let o;
	_(w(a), () => n.children), g(a), i(a, (e) => r(e), () => r()), b(() => {
		o = M(a, 1, "wrapper svelte-aokvdq", null, o, { "is-open": n.isOpen }), e(a, "role", n.isDialog ? "dialog" : void 0);
	}), A(t, a), y();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/components/ColorPicker.svelte
var Pa = J("<input type=\"hidden\"/>"), Fa = J("<div class=\"a svelte-11gfb7g\"><!></div>"), Ia = J("<!> <!> <div class=\"h svelte-11gfb7g\"><!></div> <!> <!> <!> <!>", 1), La = J("<span><!> <!></span>"), Ra = {
	hash: "svelte-11gfb7g",
	code: "span.svelte-11gfb7g {position:relative;color:var(--cp-text-color, var(--cp-border-color));--alpha-grid-bg:\n			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 0 0 / 10px 10px,\n			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 5px 5px / 10px 10px;}.h.svelte-11gfb7g,\n	.a.svelte-11gfb7g {display:inline-flex;justify-content:center;--track-height: var(--slider-width, 10px);--track-width: var(--picker-height, 200px);--track-border: none;--thumb-size: calc(var(--slider-width, 10px) - 3px);--thumb-background: white;--thumb-border: 1px solid black;--margin-block: 0;--gradient-direction: 0.5turn;}.horizontal.svelte-11gfb7g .h:where(.svelte-11gfb7g),\n	.horizontal.svelte-11gfb7g .a:where(.svelte-11gfb7g) {--track-width: calc(var(--picker-width, 200px) - 12px);--gradient-direction: 0.25turn;margin:4px 6px;}.horizontal.svelte-11gfb7g .h:where(.svelte-11gfb7g) {margin-top:8px;}.vertical.svelte-11gfb7g .h:where(.svelte-11gfb7g),\n	.vertical.svelte-11gfb7g .a:where(.svelte-11gfb7g) {margin-left:3px;}.h.svelte-11gfb7g {grid-area:hue;--gradient-hue:\n			#ff1500fb, #ffff00 17.2%, #ffff00 18.2%, #00ff00 33.3%, #00ffff 49.5%, #00ffff 51.5%, #0000ff 67.7%,\n			#ff00ff 83.3%, #ff0000;--track-background: linear-gradient(var(--gradient-direction), var(--gradient-hue));}.a.svelte-11gfb7g {grid-area:alpha;margin-top:2px;\n\n		/* redefine css variable as it may not be available in case of a portal */--alpha-grid-bg:\n			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 0 0 / 10px 10px,\n			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 5px 5px / 10px 10px;--track-background:\n			linear-gradient(var(--gradient-direction), rgba(0, 0, 0, 0), var(--alphaless-color)), var(--alpha-grid-bg);}span.svelte-11gfb7g .sr-only {position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0;}"
};
function za(r, a) {
	c(a, !0), E(r, Ra);
	let s = D(a, "components", 19, () => ({})), l = D(a, "label", 3, "Choose a color"), d = D(a, "name", 3, void 0), _ = D(a, "nullable", 3, !1), S = D(a, "rgb", 31, () => V(_() ? null : {
		r: 255,
		g: 0,
		b: 0,
		a: 1
	})), C = D(a, "hsv", 31, () => V(_() ? null : {
		h: 0,
		s: 100,
		v: 100,
		a: 1
	})), T = D(a, "hex", 31, () => V(_() ? null : "#ff0000")), N = D(a, "color", 15, null), P = D(a, "isDark", 15, !1), I = D(a, "isAlpha", 3, !0), ee = D(a, "isDialog", 3, !0), R = D(a, "isOpen", 31, () => !ee()), z = D(a, "position", 3, "responsive"), B = D(a, "dir", 3, "ltr"), H = D(a, "isTextInput", 3, !0), U = D(a, "textInputModes", 19, () => [
		"hex",
		"rgb",
		"hsv"
	]), K = D(a, "sliderDirection", 3, "vertical"), q = D(a, "disableCloseClickOutside", 3, !1), J = D(a, "a11yColors", 19, () => [{ bgHex: "#ffffff" }]), ne = D(a, "a11yLevel", 3, "AA"), re = D(a, "texts", 3, void 0), Y = D(a, "a11yTexts", 3, void 0), ie = j(V({
		r: 255,
		g: 0,
		b: 0,
		a: 1
	})), X = j(V({
		h: 0,
		s: 100,
		v: 100,
		a: 1
	})), ae = j("#ff0000"), oe = j(!1), se = j(V(p(oe))), ce = j(void 0), Z = j(void 0), Q = j(void 0), le, $ = j(1080), ue = j(720), de = {
		pickerIndicator: _a,
		textInput: Aa,
		input: da,
		nullabilityCheckbox: ma,
		wrapper: Na
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
				...Ti.label,
				...re()?.label
			},
			color: {
				...Ti.color,
				...re()?.color
			},
			changeTo: re()?.changeTo ?? Ti.changeTo,
			swatch: {
				...re()?.swatch,
				...Ti.swatch
			}
		};
	}
	function me({ target: e }) {
		ee() && (p(Z)?.contains(e) || p(Z)?.isSameNode(e) ? R(!R()) : R() && !p(Q)?.contains(e) && !q() && R(!1));
	}
	function he({ key: e, target: t }) {
		!ee() || !p(Z) || !p(ce) || (e === "Enter" && p(Z).contains(t) ? (R(!R()), setTimeout(() => {
			p(Q) && (le = Oi(p(Q)));
		})) : e === "Escape" && R() && (R(!1), p(ce).contains(t) && (p(Z)?.focus(), le?.destroy())));
	}
	function ge(e) {
		T(e), C(ta(e).toHsv()), S(ta(e).toRgb()), W(se, !1), W(oe, !1), ve();
	}
	function _e() {
		return !(C() && S() && C().h === p(X).h && C().s === p(X).s && C().v === p(X).v && C().a === p(X).a && S().r === p(ie).r && S().g === p(ie).g && S().b === p(ie).b && S().a === p(ie).a && T() === p(ae));
	}
	function ve() {
		if (p(oe) && !p(se)) {
			W(se, !0), C(null), S(null), T(null), a.onInput?.({
				color: N(),
				hsv: C(),
				rgb: S(),
				hex: T()
			});
			return;
		} else if (p(se) && !p(oe)) {
			W(se, !1), C(u(p(X))), S(u(p(ie))), T(u(p(ae))), a.onInput?.({
				color: N(),
				hsv: C(),
				rgb: S(),
				hex: T()
			});
			return;
		} else if (!C() && !S() && !T()) {
			W(oe, W(se, !0), !0), a.onInput?.({
				color: null,
				hsv: C(),
				rgb: S(),
				hex: T()
			});
			return;
		} else if (!_e()) return;
		W(oe, !1), C() && C().a === void 0 && C({
			...C(),
			a: 1
		}), p(X).a === void 0 && W(X, {
			...p(X),
			a: 1
		}, !0), S() && S().a === void 0 && S({
			...S(),
			a: 1
		}), p(ie).a === void 0 && W(ie, {
			...p(ie),
			a: 1
		}, !0), T()?.substring(7) === "ff" && T(T().substring(0, 7)), p(ae)?.substring(7) === "ff" && W(ae, p(ae).substring(0, 7), !0), C() && (C().h !== p(X).h || C().s !== p(X).s || C().v !== p(X).v || C().a !== p(X).a || !S() && !T()) ? (N(ta(C())), S(N().toRgb()), T(N().toHex())) : S() && (S().r !== p(ie).r || S().g !== p(ie).g || S().b !== p(ie).b || S().a !== p(ie).a || !C() && !T()) ? (N(ta(S())), T(N().toHex()), C(N().toHsv())) : T() && (T() !== p(ae) || !C() && !S()) && (N(ta(T())), S(N().toRgb()), C(N().toHsv())), N() && P(N().isDark()), !(!T() || !C() || !S()) && (W(X, u(C()), !0), W(ie, u(S()), !0), W(ae, T(), !0), W(se, p(oe), !0), a.onInput?.({
			color: N(),
			hsv: C(),
			rgb: S(),
			hex: T()
		}));
	}
	o(() => {
		(C() || S() || T()) && ve();
	}), o(() => {
		p(oe), ve();
	});
	function ye(e) {
		return (t) => {
			C() || (W(oe, !1), W(se, !1), C(u(p(X)))), C({
				...C(),
				[e]: t
			});
		};
	}
	function be(e) {
		return (t) => {
			C() || (W(oe, !1), W(se, !1), C(u(p(X)))), C({
				...C(),
				...Object.fromEntries(e.map((e) => [e, t[e]]))
			});
		};
	}
	async function xe() {
		if (await f(), z() === "fixed" || !R() || !ee() || !p(Z) || !p(Q)) return;
		let e = p(Q).getBoundingClientRect(), t = p(Z).getBoundingClientRect();
		if ((z() === "responsive" || z() === "responsive-y") && (t.top + e.height + 12 > p(ue) ? p(Q).style.top = `-${e.height + 12}px` : p(Q).style.top = `${t.height + 12}px`), z() === "responsive" || z() === "responsive-x") if (B() === "rtl") {
			let n = t.left + t.width - e.width < 0;
			console.log(n, t.left - e.width, t.left, e.width), n ? p(Q).style.left = "0px" : p(Q).style.left = `${t.width - e.width}px`;
		} else t.left + e.width > p($) ? p(Q).style.left = `${t.width - e.width}px` : p(Q).style.left = "0px";
	}
	o(() => {
		p($) && p(ue) && R() && xe();
	});
	let Se = G(fe);
	var Ce = La();
	k("mousedown", x, me), k("keyup", x, he), k("scroll", x, xe);
	var we = w(Ce), Te = (e) => {
		var t = L();
		n(h(t), () => p(Se).input, (e, t) => {
			t(e, {
				get hex() {
					return T();
				},
				get label() {
					return l();
				},
				get name() {
					return d();
				},
				get dir() {
					return B();
				},
				get labelElement() {
					return p(Z);
				},
				set labelElement(e) {
					W(Z, e, !0);
				}
			});
		}), A(e, t);
	}, Ee = (t) => {
		var n = Pa();
		m(n), b(() => {
			O(n, T()), e(n, "name", d());
		}), A(t, n);
	};
	F(we, (e) => {
		ee() ? e(Te) : d() && e(Ee, 1);
	}), n(t(we, 2), () => p(Se).wrapper, (e, r) => {
		r(e, {
			get isOpen() {
				return R();
			},
			get isDialog() {
				return ee();
			},
			get wrapper() {
				return p(Q);
			},
			set wrapper(e) {
				W(Q, e, !0);
			},
			children: (e, r) => {
				var i = Ia(), o = h(i), s = (e) => {
					var t = L(), r = h(t);
					{
						let e = G(pe);
						n(r, () => p(Se).nullabilityCheckbox, (t, n) => {
							n(t, {
								get texts() {
									return p(e);
								},
								get isUndefined() {
									return p(oe);
								},
								set isUndefined(e) {
									W(oe, e, !0);
								}
							});
						});
					}
					A(e, t);
				};
				F(o, (e) => {
					_() && e(s);
				});
				var c = t(o, 2);
				{
					let e = G(fe), t = G(() => C()?.h ?? p(X).h), n = G(() => C()?.s ?? p(X).s), r = G(() => C()?.v ?? p(X).v), i = G(() => be(["s", "v"])), a = G(pe);
					ca(c, {
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
				var l = t(c, 2), u = w(l);
				{
					let e = G(() => C()?.h ?? p(X).h), t = G(() => ye("h")), n = G(() => K() === "vertical"), r = G(() => pe().label.h);
					aa(u, {
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
							return K();
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
					var t = Fa();
					let n;
					var r = w(t);
					{
						let e = G(() => C()?.a ?? p(X).a), t = G(() => ye("a")), n = G(() => K() === "vertical"), i = G(() => pe().label.a);
						aa(r, {
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
								return K();
							},
							get reverse() {
								return p(n);
							},
							get ariaLabel() {
								return p(i);
							}
						});
					}
					g(t), b((e) => n = te(t, "", n, e), [() => ({ "--alphaless-color": (T() ? T() : p(ae)).substring(0, 7) })]), A(e, t);
				};
				F(d, (e) => {
					I() && e(f);
				});
				var m = t(d, 2), v = (e) => {
					{
						let t = G(pe);
						xa(e, {
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
				var y = t(m, 2), x = (e) => {
					var t = L(), r = h(t);
					{
						let e = G(() => T() ?? p(ae)), t = G(() => S() ?? p(ie)), i = G(() => C() ?? p(X)), a = G(pe);
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
									e.hsv ? C(e.hsv) : e.rgb ? S(e.rgb) : e.hex && T(e.hex);
								},
								get isAlpha() {
									return I();
								},
								get textInputModes() {
									return U();
								},
								get texts() {
									return p(a);
								}
							});
						});
					}
					A(e, t);
				};
				F(y, (e) => {
					H() && e(x);
				});
				var E = t(y, 2), D = (e) => {
					var t = L(), r = h(t);
					{
						let e = G(fe), t = G(() => T() || "#00000000");
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
					A(e, t);
				}, O = G(() => fe().a11yNotice);
				F(E, (e) => {
					p(O) && e(D);
				}), A(e, i);
			},
			$$slots: { default: !0 }
		});
	}), g(Ce), i(Ce, (e) => W(ce, e), () => p(ce)), b(() => M(Ce, 1, `color-picker ${K() ?? ""}`, "svelte-11gfb7g")), v("innerWidth", (e) => W($, e, !0)), v("innerHeight", (e) => W(ue, e, !0)), A(r, Ce), y();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-awesome-color-picker_056a75e2a4d26229eaacc7e6f2f295b0/node_modules/svelte-awesome-color-picker/dist/index.js
var Ba = za, Va = J("<label class=\"color-trigger svelte-lqk2kf\"><input type=\"color\" aria-haspopup=\"dialog\" tabindex=\"-1\" class=\"svelte-lqk2kf\"/> <span class=\"swatch svelte-lqk2kf\"></span></label>"), Ha = {
	hash: "svelte-lqk2kf",
	code: ".color-trigger.svelte-lqk2kf {position:relative;display:grid;height:100%;min-width:2.5rem;place-items:center;cursor:pointer;user-select:none;}input.svelte-lqk2kf {position:absolute;margin:0;padding:0;border:none;width:1px;height:1px;opacity:0;pointer-events:none;}.swatch.svelte-lqk2kf {display:block;width:1.25rem;height:1.25rem;border-radius:0.375rem;border:1px solid var(--color-rule-strong);box-shadow:inset 0 0 0 1px rgb(0 0 0 / 0.2);}"
};
function Ua(n, r) {
	c(r, !0), E(n, Ha);
	let a = D(r, "labelElement", 15), o = D(r, "name", 3, void 0);
	function s(e) {
		e.preventDefault();
	}
	var l = Va(), u = w(l);
	m(u);
	var d = t(u, 2);
	let f;
	g(l), i(l, (e) => a(e), () => a()), b(() => {
		e(l, "dir", r.dir), e(l, "aria-label", r.label), e(u, "name", o()), O(u, r.hex ?? "#000000"), f = te(d, "", f, { background: r.hex ?? "transparent" }), l.dir = l.dir;
	}), Y("click", l, s), Y("mousedown", l, s), Y("click", u, s), Y("mousedown", u, s), A(n, l), y();
}
ne(["click", "mousedown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-color.svelte
var Wa = J("<p> </p>"), Ga = J("<div><!> <div><div><svelte-css-wrapper style=\"display: contents\"><!></svelte-css-wrapper></div> <input type=\"text\" spellcheck=\"false\" autocomplete=\"off\"/></div> <!></div>"), Ka = {
	hash: "svelte-r9ulp6",
	code: ".color-picker-slot.svelte-r9ulp6 > span {display:block;height:100%;}.color-picker-slot.svelte-r9ulp6 [role='dialog'] {top:calc(100% + 0.5rem);margin:0;}.input-color.svelte-r9ulp6 .wrapper {border-radius:0.25rem;}"
};
function qa(n, r) {
	c(r, !0), E(n, Ka);
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
	let l = D(r, "id", 19, Pe), u = D(r, "value", 15, ""), d = D(r, "defaultValue", 3, "#000000"), f = G(() => s(u() ?? "") ?? s(d()) ?? "#000000");
	function h(e) {
		if (!e) return;
		let t = s(e);
		!t || t === u() || (u(t), r.onvaluechange?.(t));
	}
	function _(e) {
		let t = e.currentTarget.value;
		u(t), r.onvaluechange?.(t);
	}
	var v = Ga(), x = w(v), S = (e) => {
		Nr(e, {
			get for() {
				return l();
			},
			children: (e, t) => {
				T();
				var n = N();
				b(() => U(n, r.label)), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(x, (e) => {
		r.label && e(S);
	});
	var C = t(x, 2), k = w(C), j = w(k);
	{
		let e = G(() => r.label ?? "Color"), t = G(() => ({ input: Ua }));
		I(j, () => ({
			"--picker-z-index": "100",
			"--input-size": "1.25rem",
			"--cp-bg-color": "var(--color-dark-800, #1a1b1e)",
			"--cp-border-color": "var(--color-dark-500, #3f3f46)",
			"--cp-text-color": "var(--color-dark-50, #f4f4f5)",
			"--cp-input-color": "var(--color-dark-700, #27272a)",
			"--cp-button-hover-color": "var(--color-dark-600, #3f3f46)",
			"--focus-color": "var(--color-ring, #6366f1)"
		})), Ba(j.lastChild, {
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
		}), g(j);
	}
	g(k);
	var P = t(k, 2);
	m(P), g(C);
	var L = t(C, 2), ee = (e) => {
		var t = Wa(), n = w(t, !0);
		g(t), b(() => {
			M(t, 1, K(Ft), "svelte-r9ulp6"), U(n, r.error);
		}), A(e, t);
	};
	F(L, (e) => {
		r.error && e(ee);
	}), g(v), b((t, n, i, a) => {
		M(v, 1, t, "svelte-r9ulp6"), M(C, 1, n, "svelte-r9ulp6"), M(k, 1, i, "svelte-r9ulp6"), e(P, "id", l()), e(P, "aria-invalid", r.error ? !0 : void 0), e(P, "placeholder", d()), O(P, u()), M(P, 1, a, "svelte-r9ulp6");
	}, [
		() => K(Q("input-color grid w-full min-w-0 gap-2", r.class)),
		() => K(Q("relative flex w-full min-w-0 items-stretch rounded-lg", It, Ue.md, Vt(r.error))),
		() => K(Q("color-picker-slot grid h-full place-items-center rounded-l-lg border transition-colors", Wt(r.error), Gt, Re.md)),
		() => K(Q("box-border h-full min-h-0 min-w-0 w-full appearance-none truncate border border-l-0 outline-none transition-colors", "rounded-l-none rounded-r-lg", Gt, Rt, Ge.md, Bt(r.error)))
	]), Y("input", P, _), A(n, v), y();
}
ne(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/resolve-select-items.svelte.ts
function Ja(e, t) {
	let n = j(V([])), r = j(!1), i = j(0), a = G(() => {
		let t = e();
		return typeof t == "function" ? (p(i), p(n)) : t;
	}), s = G(() => typeof e() == "function" ? (p(i), p(r)) : !1);
	return o(() => {
		t && t();
		let a = e();
		if (typeof a != "function") return;
		W(r, !0);
		let o = !1;
		return Promise.resolve(a()).then((e) => {
			o || (W(n, e, !0), W(r, !1), ee(i));
		}, () => {
			o || (W(n, [], !0), W(r, !1), ee(i));
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
function Ya(e, t) {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => e.label.toLowerCase().includes(n) || e.value.toLowerCase().includes(n)) : e;
}
function Xa(e, t, n = 200, r = 36, i = 6) {
	let a = e.length * r, o = Math.max(0, Math.floor(t / r) - i), s = Math.ceil(n / r) + i * 2, c = Math.min(e.length, o + s);
	return {
		items: e.slice(o, c),
		startIndex: o,
		totalHeight: a,
		offsetY: o * r
	};
}
function Za(e) {
	return e > 50;
}
function Qa(e, t = 36) {
	return Math.max(0, e * t);
}
//#endregion
//#region ../ui/src/lib/components/input/input-select.svelte
var $a = J("<span>*</span>"), eo = J(" <!>", 1), to = J("<span><!></span>"), no = J("<!> <!>", 1), ro = J("<!> <!> <!>", 1), io = J("<div><button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\"><!> <span><span> </span> <!></span></button></div> <!>", 1), ao = J("<p> </p>"), oo = J("<div><!> <!> <!></div>");
function so(i, a) {
	c(a, !0);
	let o = D(a, "searchable", 3, "auto"), s = D(a, "dialogTitle", 3, "Select option"), l = D(a, "dialogDescription", 3, "Search and select an option from the list."), u = D(a, "id", 19, Pe), d = D(a, "required", 3, !1), m = D(a, "type", 3, "single"), _ = D(a, "value", 15), v = G(() => a.placeholder ?? "Select an option"), x = G(() => a.loadingPlaceholder ?? "Loading..."), S = G(() => a.searchPlaceholder ?? "Search values"), C = G(() => a.noResultsLabel ?? "No matches found"), E = j(!1), O = j(""), k = Pe(), P = Pe(), I = Ja(() => a.items, () => a.reloadKey?.()), ee = G(() => a.disabled ?? !1), R = G(() => m() === "multiple"), z = G(() => o() === !0 ? !0 : o() === !1 ? !1 : I.items.length >= 8), B = G(() => {
		if (I.loading) return p(x);
		if (p(R)) {
			let e = _();
			if (e.length === 0) return p(v);
			let t = e.map((e) => I.items.find((t) => t.value === e)?.label).filter(Boolean);
			return t.length > 0 ? t.join(", ") : p(v);
		}
		let e = _();
		return e ? I.items.find((t) => t.value === e)?.label ?? e : p(v);
	}), V = G(() => p(R) ? _().length > 0 : !!_());
	function H(e) {
		W(E, e, !0), e || W(O, "");
	}
	function J(e) {
		return p(R) ? _().includes(e) : _() === e;
	}
	function te(e) {
		if (!e.disabled) {
			if (p(R)) {
				let t = [..._()], n = t.indexOf(e.value);
				n >= 0 ? t.splice(n, 1) : t.push(e.value), _(t), a.onValueChange?.(t);
				return;
			}
			_(e.value), a.onValueChange?.(e.value), W(E, !1);
		}
	}
	function ne() {
		p(ee) || W(E, !0);
	}
	async function re(e) {
		a.dialogProps?.onOpenAutoFocus?.(e), !(e.defaultPrevented || !p(z)) && (e.preventDefault(), await f(), document.getElementById(P)?.focus());
	}
	function ie(e) {
		a.dialogProps?.onCloseAutoFocus?.(e), !e.defaultPrevented && e.preventDefault();
	}
	var X = oo(), ae = w(X), oe = (e) => {
		Nr(e, {
			get for() {
				return u();
			},
			children: (e, n) => {
				T();
				var r = eo(), i = h(r), o = t(i), s = (e) => {
					var t = $a();
					b(() => M(t, 1, K(zt))), A(e, t);
				};
				F(o, (e) => {
					d() && e(s);
				}), b(() => U(i, `${a.label ?? ""} `)), A(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	F(ae, (e) => {
		a.label && e(oe);
	});
	var se = t(ae, 2);
	n(se, () => ht, (i, o) => {
		o(i, {
			onOpenChange: H,
			get open() {
				return p(E);
			},
			set open(e) {
				W(E, e, !0);
			},
			children: (i, o) => {
				var c = io(), d = h(c), f = w(d), m = w(f), _ = (e) => {
					var t = to();
					Z(w(t), {
						get icon() {
							return a.prependIcon;
						},
						class: "size-6"
					}), g(t), b((e) => M(t, 1, e), [() => K(Q("grid h-full min-w-10 place-items-center rounded-l-lg border border-r-0 text-dark-50 transition-colors", Bt(a.error)))]), A(e, t);
				};
				F(m, (e) => {
					a.prependIcon && e(_);
				});
				var v = t(m, 2), y = w(v), D = w(y, !0);
				g(y), Z(t(y, 2), {
					icon: "ri:expand-up-down-line",
					class: "size-5 shrink-0 text-dark-300"
				}), g(v), g(f), g(d), n(t(d, 2), () => _t, (e, i) => {
					i(e, {
						children: (e, i) => {
							var o = no(), c = h(o);
							n(c, () => vt, (e, t) => {
								t(e, { class: "z-60 bg-black/60 backdrop-blur-sm" });
							});
							var u = t(c, 2);
							{
								let e = G(() => a.dialogProps?.trapFocus ?? !1), i = G(() => a.dialogProps?.preventScroll ?? !1), o = G(() => Q("z-60", a.dialogProps?.class));
								n(u, () => mt, (c, u) => {
									u(c, q(() => a.dialogProps, {
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
											var o = ro(), c = h(o);
											n(c, () => pt, (e, t) => {
												t(e, {
													class: "sr-only",
													children: (e, t) => {
														T();
														var n = N();
														b(() => U(n, s())), A(e, n);
													},
													$$slots: { default: !0 }
												});
											});
											var u = t(c, 2);
											n(u, () => gt, (e, t) => {
												t(e, {
													class: "sr-only",
													children: (e, t) => {
														T();
														var n = N();
														b(() => U(n, l())), A(e, n);
													},
													$$slots: { default: !0 }
												});
											});
											var d = t(u, 2);
											{
												let e = G(() => !I.loading), i = G(() => Q(a.commandProps?.class));
												n(d, () => We, (o, s) => {
													s(o, q(() => a.commandProps, {
														get shouldFilter() {
															return p(e);
														},
														get class() {
															return p(i);
														},
														children: (e, i) => {
															var a = no(), o = h(a), s = (e) => {
																var t = L();
																n(h(t), () => qe, (e, t) => {
																	t(e, {
																		get id() {
																			return P;
																		},
																		get placeholder() {
																			return p(S);
																		},
																		get "aria-label"() {
																			return p(S);
																		},
																		get value() {
																			return p(O);
																		},
																		set value(e) {
																			W(O, e, !0);
																		}
																	});
																}), A(e, t);
															};
															F(o, (e) => {
																p(z) && e(s);
															}), n(t(o, 2), () => Le, (e, i) => {
																i(e, {
																	get id() {
																		return k;
																	},
																	class: "mt-2",
																	children: (e, i) => {
																		var a = L();
																		n(h(a), () => Ie, (e, i) => {
																			i(e, {
																				children: (e, i) => {
																					var a = L(), o = h(a), s = (e) => {
																						var t = L();
																						n(h(t), () => Ke, (e, t) => {
																							t(e, {
																								children: (e, t) => {
																									T();
																									var n = N();
																									b(() => U(n, p(x))), A(e, n);
																								},
																								$$slots: { default: !0 }
																							});
																						}), A(e, t);
																					}, c = (e) => {
																						var i = no(), a = h(i);
																						n(a, () => Be, (e, t) => {
																							t(e, {
																								children: (e, t) => {
																									T();
																									var n = N();
																									b(() => U(n, p(C))), A(e, n);
																								},
																								$$slots: { default: !0 }
																							});
																						}), r(t(a, 2), 17, () => I.items, (e) => e.value, (e, r) => {
																							var i = L(), a = h(i);
																							{
																								let e = G(() => [p(r).label, p(r).value]);
																								n(a, () => He, (n, i) => {
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
																											T();
																											var i = eo(), a = h(i), o = t(a), s = (e) => {
																												Z(e, {
																													icon: "ri:check-line",
																													class: "size-5 text-primary"
																												});
																											}, c = G(() => J(p(r).value));
																											F(o, (e) => {
																												p(c) && e(s);
																											}), b(() => U(a, `${p(r).label ?? ""} `)), A(e, i);
																										},
																										$$slots: { default: !0 }
																									});
																								});
																							}
																							A(e, i);
																						}), A(e, i);
																					};
																					F(o, (e) => {
																						I.loading ? e(s) : e(c, -1);
																					}), A(e, a);
																				},
																				$$slots: { default: !0 }
																			});
																		}), A(e, a);
																	},
																	$$slots: { default: !0 }
																});
															}), A(e, a);
														},
														$$slots: { default: !0 }
													}));
												});
											}
											A(e, o);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							A(e, o);
						},
						$$slots: { default: !0 }
					});
				}), b((t, n, r, i) => {
					M(d, 1, t), e(f, "id", u()), e(f, "aria-expanded", p(E)), e(f, "aria-controls", p(E) ? k : void 0), f.disabled = p(ee), M(f, 1, n), M(v, 1, r), M(y, 1, i), U(D, p(B));
				}, [
					() => K(Q("relative flex w-full min-w-0 items-center rounded-lg", It, Vt(a.error))),
					() => K(Q("flex w-full min-w-0 cursor-pointer items-center outline-none", Rt)),
					() => K(Q("flex w-full items-center justify-between gap-2 border outline-none transition-colors", Gt, Ve.md, Bt(a.error), {
						"rounded-l-none rounded-r-lg border-l-0": a.prependIcon,
						"rounded-lg": !a.prependIcon
					})),
					() => K(Q("min-w-0 flex-1 truncate text-left", !p(V) && "text-dark-300"))
				]), Y("click", f, ne), A(i, c);
			},
			$$slots: { default: !0 }
		});
	});
	var ce = t(se, 2), le = (e) => {
		var t = ao(), n = w(t, !0);
		g(t), b(() => {
			M(t, 1, K(Ft)), U(n, a.error);
		}), A(e, t);
	};
	F(ce, (e) => {
		a.error && e(le);
	}), g(X), b((e) => M(X, 1, e), [() => K(Q("relative grid w-full min-w-0 gap-2", a.class))]), A(i, X), y();
}
ne(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/cron-expression-editor.svelte
var co = J("<div><p class=\"text-[10px] font-semibold tracking-[0.14em] text-dark-400 uppercase\"> </p> <p> </p></div>"), lo = J("<span><!> </span>"), uo = J("<p class=\"text-xs text-dark-200\"><span class=\"text-dark-400\"> </span> <span class=\"font-medium text-primary-100\"> </span></p>"), fo = J("<div class=\"overflow-hidden rounded-lg border border-border bg-dark-800/40 transition-all duration-200 focus-within:border-ring/50 focus-within:ring-2 focus-within:ring-ring/20\"><div class=\"grid grid-cols-5 border-b border-dark-600/80 bg-dark-900/40 px-2 py-1.5\"></div> <div class=\"relative flex items-center gap-2 px-3 py-2\"><!> <input autocomplete=\"off\"/> <!></div> <div class=\"flex flex-wrap items-center justify-between gap-2 border-t border-dark-600/80 bg-dark-900/30 px-3 py-2\"><div class=\"min-w-40 max-w-xs flex-1\"><!></div> <!></div></div>");
function po(n, i) {
	c(i, !0);
	let a = D(i, "value", 3, ""), o = D(i, "placeholder", 3, "0 9 * * 1-5"), s = D(i, "presets", 3, X), l = D(i, "validLabel", 3, "Valid expression"), u = D(i, "invalidLabel", 3, "Invalid cron expression"), d = D(i, "nextRunLabel", 3, "Next run"), f = D(i, "presetsPlaceholder", 3, "Presets"), h = Pe(), _ = new At(() => a(), 250), v = G(() => ({
		minute: i.fieldLabels?.minute ?? "Minute",
		hour: i.fieldLabels?.hour ?? "Hour",
		day: i.fieldLabels?.day ?? "Day",
		month: i.fieldLabels?.month ?? "Month",
		weekday: i.fieldLabels?.weekday ?? "Weekday"
	})), x = G(() => se(a())), S = G(() => ae(_.current)), C = G(() => ie(p(S))), T = G(() => !!p(S) && !p(C)), E = G(() => p(C) === "Invalid cron expression" ? u() : p(C)), k = G(() => p(T) ? oe(p(S)) : void 0), j = G(() => s().map((e) => ({
		value: e.value,
		label: e.label
	}))), N = {
		minute: "text-sky-300 light:text-sky-700",
		hour: "text-violet-300 light:text-violet-700",
		day: "text-emerald-300 light:text-emerald-700",
		month: "text-amber-300 light:text-amber-700",
		weekday: "text-rose-300 light:text-rose-700"
	}, P = (e) => {
		i.oninput?.(e);
	};
	function I(e) {
		i.oninput?.({ currentTarget: { value: e } });
	}
	var L = fo(), ee = w(L);
	r(ee, 22, () => ce, (e) => e, (e, n, r) => {
		var i = co(), a = w(i), o = w(a, !0);
		g(a);
		var s = t(a, 2), c = w(s, !0);
		g(s), g(i), b((e, t) => {
			M(i, 1, e), U(o, p(v)[n]), M(s, 1, t), U(c, p(x)[p(r)] || "—");
		}, [() => K(Q("px-1 text-center", p(r) < 4 && "border-r border-dark-700/50")), () => K(Q("mt-0.5 truncate font-mono text-xs", N[n]))]), A(e, i);
	}), g(ee);
	var R = t(ee, 2), z = w(R);
	Z(z, {
		icon: "ri:time-line",
		class: "size-5 shrink-0 text-dark-400"
	});
	var B = t(z, 2);
	m(B), e(B, "spellcheck", !1);
	var V = t(B, 2), H = (e) => {
		var n = lo(), r = w(n);
		{
			let e = G(() => p(T) ? "ri:check-line" : "ri:alert-line");
			Z(r, {
				get icon() {
					return p(e);
				},
				class: "size-4"
			});
		}
		var i = t(r);
		g(n), b((e) => {
			M(n, 1, e), U(i, ` ${(p(T) ? l() : p(E)) ?? ""}`);
		}, [() => K(Q("inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium", p(T) ? "bg-green-500/10 text-green-400 light:text-green-700 border-green-500/20" : "bg-amber-500/10 text-amber-400 light:text-amber-700 border-amber-500/20"))]), A(e, n);
	};
	F(V, (e) => {
		p(S) && e(H);
	}), g(R);
	var W = t(R, 2), q = w(W), J = w(q), te = () => "", ne = (e) => {
		e && I(e);
	};
	so(J, {
		type: "single",
		get placeholder() {
			return f();
		},
		get items() {
			return p(j);
		},
		get value() {
			return te();
		},
		set value(e) {
			ne(e);
		}
	}), g(q);
	var re = t(q, 2), le = (e) => {
		var n = uo(), r = w(n), i = w(r);
		g(r);
		var a = t(r, 2), o = w(a, !0);
		g(a), g(n), b(() => {
			U(i, `${d() ?? ""}:`), U(o, p(k));
		}), A(e, n);
	};
	F(re, (e) => {
		p(k) && e(le);
	}), g(W), g(L), b((t) => {
		e(B, "id", h), M(B, 1, t), e(B, "placeholder", o()), B.required = i.required, O(B, a() ?? "");
	}, [() => K(Q("min-w-0 flex-1 border-0 bg-transparent font-mono text-sm text-dark-50 outline-none", Ve.md, "px-0 py-0"))]), Y("input", B, P), A(n, L), y();
}
ne(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-cron-expression.svelte
var mo = J("<button><!> <span> </span> <!> <!></button>"), ho = J("<p class=\"mb-3 text-xs font-semibold tracking-wide text-dark-200 uppercase\"> </p> <!>", 1), go = J("<!> <!>", 1), _o = J("<p> </p>"), vo = J("<div><!> <!> <!></div>");
function yo(e, n) {
	c(n, !0);
	let r = D(n, "id", 19, Pe), i = D(n, "value", 3, ""), a = D(n, "placeholder", 3, "0 9 * * 1-5"), o = D(n, "validLabel", 3, "Valid expression"), s = D(n, "invalidLabel", 3, "Invalid cron expression"), l = D(n, "nextRunLabel", 3, "Next run"), u = D(n, "presetsPlaceholder", 3, "Presets"), d = D(n, "editorTitle", 3, "Cron expression"), f = D(n, "emptyLabel", 3, "Configure cron expression"), m = D(n, "editAriaLabel", 3, "Edit cron expression"), _ = j(!1), v = G(() => ae(i())), x = G(() => ie(p(v))), S = G(() => !!p(v) && !p(x)), E = G(() => p(v) || f()), O = G(() => !p(v));
	var k = vo(), P = w(k), I = (e) => {
		Nr(e, {
			get for() {
				return r();
			},
			children: (e, t) => {
				T();
				var r = N();
				b(() => U(r, n.label)), A(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	F(P, (e) => {
		n.label && e(I);
	});
	var L = t(P, 2);
	Et(L, {
		get open() {
			return p(_);
		},
		set open(e) {
			W(_, e, !0);
		},
		children: (e, c) => {
			var f = go(), y = h(f);
			Dt(y, {
				child: (e, i) => {
					let a = () => i?.().props;
					var o = mo();
					C(o, (e) => ({
						id: r(),
						type: "button",
						...a(),
						"aria-label": m(),
						class: e
					}), [() => Q("flex w-full items-center gap-2 rounded-lg border text-left outline-none transition-all", Gt, Ve.md, "focus-visible:ring-2", n.error ? "border-destructive focus-visible:border-destructive/50 focus-visible:ring-destructive" : "border-border hover:border-dark-400 focus-visible:border-ring/50 focus-visible:ring-ring")]);
					var s = w(o);
					Z(s, {
						icon: "ri:time-line",
						class: "size-5 shrink-0 text-dark-400"
					});
					var c = t(s, 2), l = w(c, !0);
					g(c);
					var u = t(c, 2), d = (e) => {
						{
							let t = G(() => p(S) ? "ri:check-line" : "ri:alert-line"), n = G(() => Q("size-5 shrink-0", p(S) ? "text-green-400 light:text-green-700" : "text-amber-400 light:text-amber-700"));
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
						let e = G(() => Q("size-5 shrink-0 text-dark-300 transition-transform", p(_) && "rotate-180"));
						Z(f, {
							icon: "ri:arrow-down-s-line",
							get class() {
								return p(e);
							}
						});
					}
					g(o), b((e) => {
						M(c, 1, e), U(l, p(E));
					}, [() => K(Q("min-w-0 flex-1 truncate text-sm", p(O) ? "font-sans text-dark-300" : "font-mono text-dark-50"))]), A(e, o);
				},
				$$slots: { child: !0 }
			}), Tt(t(y, 2), {
				align: "start",
				class: "w-[min(28rem,calc(100vw-2rem))] p-3",
				children: (e, r) => {
					var c = ho(), f = h(c), p = w(f, !0);
					g(f), po(t(f, 2), {
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
					}), b(() => U(p, d())), A(e, c);
				},
				$$slots: { default: !0 }
			}), A(e, f);
		},
		$$slots: { default: !0 }
	});
	var ee = t(L, 2), R = (e) => {
		var t = _o(), r = w(t, !0);
		g(t), b(() => {
			M(t, 1, K(Ft)), U(r, n.error);
		}), A(e, t);
	};
	F(ee, (e) => {
		n.error && e(R);
	}), g(k), b((e) => M(k, 1, e), [() => K(Q("relative grid w-full gap-2", n.class))]), A(e, k), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text.svelte
var bo = new Set([
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
]), xo = J("<span><!></span>"), So = J("<button type=\"button\"><!></button>"), Co = J("<p> </p>"), wo = J("<div><!> <div><!> <input/> <!> <!> <!></div> <!></div>");
function To(n, r) {
	c(r, !0);
	let i = D(r, "id", 19, Pe), a = D(r, "copyable", 3, !1), o = D(r, "copyLabel", 3, "Copy"), s = D(r, "copiedLabel", 3, "Copied"), l = D(r, "size", 3, "md"), u = H(r, bo), d = j(!1), f = new Mt(), m = G(() => f.isCopied()), h = G(() => r.type === "password"), _ = G(() => !!r.appendIcon || p(h) || a()), v = G(() => a() ? r.readonly ?? !0 : r.readonly), x = G(() => a() && p(v));
	S(() => f.destroy());
	var E = wo(), O = w(E), k = (e) => {
		Nr(e, {
			get for() {
				return i();
			},
			children: (e, t) => {
				T();
				var n = N();
				b(() => U(n, r.label)), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(O, (e) => {
		r.label && e(k);
	});
	var I = t(O, 2), L = w(I), ee = (e) => {
		var t = xo();
		Z(w(t), {
			get icon() {
				return r.prependIcon;
			},
			get class() {
				return ze[l()];
			}
		}), g(t), b((e) => M(t, 1, e), [() => K(Q("grid h-full place-items-center rounded-l-lg border text-dark-50 transition-colors", Wt(r.error), Gt, Re[l()]))]), A(e, t);
	};
	F(L, (e) => {
		r.prependIcon && e(ee);
	});
	var R = t(L, 2);
	C(R, (e) => ({
		id: i(),
		"aria-invalid": r.error ? !0 : void 0,
		value: r.value,
		readonly: p(v),
		tabindex: p(x) ? -1 : r.tabindex,
		...u,
		class: e,
		type: p(h) ? p(d) ? "text" : "password" : r.type
	}), [() => Q("box-border h-full min-h-0 min-w-0 w-full appearance-none truncate border outline-none transition-colors", Gt, Rt, Ge[l()], Bt(r.error), {
		"rounded-l-none rounded-r-lg border-l-0": r.prependIcon && !p(_),
		"rounded-l-none border-l-0": r.prependIcon && p(_),
		"rounded-l-lg rounded-r-none border-r-0": !r.prependIcon && p(_),
		"rounded-lg": !r.prependIcon && !p(_)
	})], void 0, void 0, void 0, !0);
	var z = t(R, 2), B = (e) => {
		var t = xo();
		Z(w(t), {
			get icon() {
				return r.appendIcon;
			},
			get class() {
				return ze[l()];
			}
		}), g(t), b((e) => M(t, 1, e), [() => K(Q("grid h-full place-items-center text-dark-50 transition-colors", Re[l()], p(h) || a() ? Q("border-y border-r-0 border-l", Wt(r.error)) : Q("rounded-r-lg border border-l-0", Wt(r.error))))]), A(e, t);
	};
	F(z, (e) => {
		r.appendIcon && e(B);
	});
	var V = t(z, 2), q = (t) => {
		var n = So(), i = w(n);
		{
			let e = G(() => p(m) ? Pt : Nt);
			Z(i, {
				get icon() {
					return p(e);
				},
				get class() {
					return ze[l()];
				}
			});
		}
		g(n), P(n, () => kt(() => p(m) ? s() : o())), b((t) => {
			M(n, 1, t), e(n, "aria-label", p(m) ? s() : o());
		}, [() => K(Q("grid h-full place-items-center rounded-r-lg border", Wt(r.error), Gt, p(m) ? "text-success-400" : "text-dark-50", Re[l()]))]), Y("click", n, () => void f.copy(String(r.value ?? ""), "value")), A(t, n);
	};
	F(V, (e) => {
		a() && e(q);
	});
	var J = t(V, 2), te = (t) => {
		var n = So(), i = w(n);
		{
			let e = G(() => p(d) ? "ri:eye-off-line" : "ri:eye-line");
			Z(i, {
				get icon() {
					return p(e);
				},
				get class() {
					return ze[l()];
				}
			});
		}
		g(n), b((t) => {
			M(n, 1, t), e(n, "aria-label", p(d) ? "Hide password" : "Show password"), e(n, "aria-pressed", p(d));
		}, [() => K(Q("grid h-full place-items-center rounded-r-lg border text-dark-50 transition-colors", Wt(r.error), Gt, Re[l()]))]), Y("click", n, () => W(d, !p(d))), A(t, n);
	};
	F(J, (e) => {
		p(h) && e(te);
	}), g(I);
	var ne = t(I, 2), re = (e) => {
		var t = Co(), n = w(t, !0);
		g(t), b(() => {
			M(t, 1, K(Ft)), U(n, r.error);
		}), A(e, t);
	};
	F(ne, (e) => {
		r.error && e(re);
	}), g(E), b((e, t) => {
		M(E, 1, e), M(I, 1, t);
	}, [() => K(Q("relative grid w-full min-w-0 gap-2", r.class)), () => K(Q("relative flex w-full min-w-0 items-stretch rounded-lg", It, Ue[l()], !p(x) && Vt(r.error)))]), A(n, E), y();
}
ne(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-file.svelte
var Eo = J("<div class=\"flex items-center gap-3\"><!></div>"), Do = J("<div class=\"grid gap-2\"><!> <!> <div class=\"flex flex-wrap items-center gap-2\"><!> <!> <!></div></div>");
function Oo(e, n) {
	c(n, !0);
	let r = D(n, "value", 3, ""), i = D(n, "browseLabel", 3, "Upload"), a = D(n, "cloudLabel", 3, "Cloud"), o = D(n, "clearLabel", 3, "Clear"), s = D(n, "emptyLabel", 3, "No file selected"), l = j(!1);
	async function u(e) {
		if (!p(l)) {
			W(l, !0);
			try {
				let t = await e();
				if (!t) return;
				n.onValueChange?.(t);
			} finally {
				W(l, !1);
			}
		}
	}
	var d = Do(), f = w(d), m = (e) => {
		var t = Eo();
		_(w(t), () => n.preview), g(t), A(e, t);
	};
	F(f, (e) => {
		n.preview && e(m);
	});
	var h = t(f, 2);
	{
		let e = G(() => n.placeholder ?? s());
		To(h, {
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
	var v = t(h, 2), x = w(v);
	jt(x, {
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
			T();
			var n = N();
			b(() => U(n, i())), A(e, n);
		},
		$$slots: { default: !0 }
	});
	var S = t(x, 2), C = (e) => {
		jt(e, {
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
				T();
				var n = N();
				b(() => U(n, a())), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(S, (e) => {
		n.onCloudBrowse && e(C);
	});
	var E = t(S, 2), O = (e) => {
		jt(e, {
			type: "button",
			variant: "ghost",
			onclick: () => n.onClear(),
			icon: "ri:close-line",
			children: (e, t) => {
				T();
				var n = N();
				b(() => U(n, o())), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(E, (e) => {
		n.onClear && r() && e(O);
	}), g(v), g(d), A(e, d), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-file-path.svelte
var ko = J("<div class=\"grid gap-2\"><!> <div class=\"flex flex-wrap items-center gap-2\"><!> <!> <!></div></div>");
function Ao(e, n) {
	c(n, !0);
	let r = D(n, "value", 3, ""), i = D(n, "browseLabel", 3, "Browse"), a = D(n, "emptyFileLabel", 3, "No file selected"), o = D(n, "emptyFolderLabel", 3, "No folder selected"), s = D(n, "uploadLabel", 3, "Upload"), l = D(n, "cloudLabel", 3, "Cloud"), u = j(!1);
	async function d(e) {
		if (!p(u)) {
			W(u, !0);
			try {
				let t = await e();
				if (!t) return;
				n.onValueChange?.(t);
			} finally {
				W(u, !1);
			}
		}
	}
	var f = ko(), m = w(f);
	{
		let e = G(() => n.placeholder ?? (n.mode === "folder" ? o() : a()));
		To(m, {
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
	var h = t(m, 2), _ = w(h), v = (e) => {
		jt(e, {
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
				T();
				var n = N();
				b(() => U(n, s())), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(_, (e) => {
		n.onUpload && e(v);
	});
	var x = t(_, 2), S = (e) => {
		jt(e, {
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
				T();
				var n = N();
				b(() => U(n, l())), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(x, (e) => {
		n.onCloudBrowse && e(S);
	});
	var C = t(x, 2), E = (e) => {
		jt(e, {
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
				T();
				var n = N();
				b(() => U(n, i())), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(C, (e) => {
		!n.onUpload && !n.onCloudBrowse && e(E);
	}), g(h), g(f), A(e, f), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-hotkey.svelte
var jo = J("<p> </p>"), Mo = J("<div class=\"grid w-full min-w-0 gap-2\"><!> <button type=\"button\"><!> <span><!></span></button> <!></div>");
function No(n, r) {
	c(r, !0);
	let i = D(r, "placeholder", 3, "Click and press keys…");
	D(r, "required", 3, !1);
	let a = D(r, "value", 15, ""), o = D(r, "captureLabel", 3, "Press shortcut…"), s = D(r, "emptyLabel", 3, "Not set"), l = Pe(), u = j(!1);
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
	let h = G(() => a().trim() ? m(a()) : "");
	function _() {
		W(u, !0);
	}
	function v() {
		W(u, !1);
	}
	let x = (e) => {
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
	var C = Mo(), E = w(C), O = (e) => {
		Nr(e, {
			get for() {
				return l;
			},
			children: (e, t) => {
				T();
				var n = N();
				b(() => U(n, r.label)), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(E, (e) => {
		r.label && e(O);
	});
	var P = t(E, 2), I = w(P);
	Z(I, {
		icon: "ri:keyboard-line",
		class: "size-4 shrink-0 text-dark-200"
	});
	var L = t(I, 2), ee = w(L), R = (e) => {
		var t = N();
		b(() => U(t, o())), A(e, t);
	}, z = (e) => {
		var t = N();
		b(() => U(t, p(h))), A(e, t);
	}, B = (e) => {
		var t = N();
		b(() => U(t, i() || s())), A(e, t);
	};
	F(ee, (e) => {
		p(u) ? e(R) : p(h) ? e(z, 1) : e(B, -1);
	}), g(L), g(P);
	var V = t(P, 2), H = (e) => {
		var t = jo(), n = w(t, !0);
		g(t), b(() => {
			M(t, 1, K(Ft)), U(n, r.error);
		}), A(e, t);
	};
	F(V, (e) => {
		r.error && e(H);
	}), g(C), b((t, n) => {
		e(P, "id", l), M(P, 1, t), M(L, 1, n);
	}, [() => K(Q("flex h-10 w-full items-center gap-2 rounded-lg border px-4 text-left text-sm", "bg-dark-800 focus:ring-2 focus:ring-ring focus:outline-none", p(u) && "ring-2 ring-ring", Bt(r.error))), () => K(Q("truncate font-mono", !p(h) && "text-dark-300"))]), Y("click", P, _), Y("keydown", P, x), k("blur", P, S), A(n, C), y();
}
ne(["click", "keydown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-variables.svelte
var Po = new Set([
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
]), Fo = J("<p> </p>"), Io = J("<div><!> <div><input/></div> <!> <!></div>");
function Lo(e, n) {
	c(n, !0);
	let r = D(n, "variables", 19, () => []), i = D(n, "value", 15, ""), o = D(n, "id", 19, Pe), s = H(n, Po), l = G(() => `${o()}-listbox`), u = new qt({
		variables: () => r(),
		onChange: (e) => i(e)
	});
	var d = Io(), f = w(d), m = (e) => {
		Nr(e, {
			get for() {
				return o();
			},
			children: (e, t) => {
				T();
				var r = N();
				b(() => U(r, n.label)), A(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	F(f, (e) => {
		n.label && e(m);
	});
	var h = t(f, 2), _ = w(h);
	C(_, (e, t) => ({
		id: o(),
		placeholder: n.placeholder,
		class: e,
		role: r().length > 0 ? "combobox" : void 0,
		"aria-invalid": n.error ? !0 : void 0,
		"aria-autocomplete": r().length > 0 ? "list" : void 0,
		"aria-expanded": r().length > 0 ? u.isOpen : void 0,
		"aria-controls": r().length > 0 ? p(l) : void 0,
		"aria-activedescendant": t,
		oninput: n.oninput,
		...s
	}), [() => Q("min-w-0 w-full truncate rounded-lg border outline-none", Gt, Rt, Ve.md, Bt(n.error)), () => u.isOpen ? Yt(p(l), u.highlightedIndex) : void 0], void 0, void 0, void 0, !0), P(_, () => u.attach), g(h);
	var v = t(h, 2);
	Xt(v, {
		get autocomplete() {
			return u;
		},
		get id() {
			return p(l);
		}
	});
	var x = t(v, 2), S = (e) => {
		var t = Fo(), r = w(t, !0);
		g(t), b(() => {
			M(t, 1, K(Ft)), U(r, n.error);
		}), A(e, t);
	};
	F(x, (e) => {
		n.error && e(S);
	}), g(d), b((e, t) => {
		M(d, 1, e), M(h, 1, t);
	}, [() => K(Q("relative grid w-full min-w-0 gap-2", n.class)), () => K(Q("relative flex w-full min-w-0 items-center rounded-lg", Ut(n.error)))]), a(_, i), A(e, d), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-key-value-list.svelte
var Ro = J("<div class=\"grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] items-center gap-2\"><!> <!> <!></div>"), zo = J("<p class=\"text-sm text-destructive-50\"> </p>"), Bo = J("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function Vo(n, i) {
	c(i, !0);
	let a = D(i, "entries", 31, () => V([])), o = D(i, "keyPlaceholder", 3, "KEY"), s = D(i, "valuePlaceholder", 3, "value"), l = D(i, "variables", 19, () => []), u = D(i, "id", 19, Pe), f = D(i, "addLabel", 3, "Add"), m = D(i, "removeLabel", 3, "Remove"), h = j(V([]));
	function _(e) {
		return e.map((e) => ({
			id: crypto.randomUUID(),
			key: e.key,
			value: e.value
		}));
	}
	function v() {
		a(p(h).map((e) => ({
			key: e.key,
			value: e.value
		})));
	}
	function x(e, t) {
		W(h, p(h).map((n) => n.id === e ? {
			...n,
			...t
		} : n), !0), v();
	}
	function S(e) {
		W(h, p(h).filter((t) => t.id !== e), !0), v();
	}
	function C() {
		W(h, [...p(h), {
			id: crypto.randomUUID(),
			key: "",
			value: ""
		}], !0), v();
	}
	d(() => {
		let e = a(), t = p(h).map((e) => ({
			key: e.key,
			value: e.value
		}));
		e.length === t.length && e.every((e, n) => e.key === t[n]?.key && e.value === t[n]?.value) || W(h, _(e), !0);
	});
	var E = Bo(), O = w(E), k = (e) => {
		{
			let t = G(() => `${u()}-label`);
			Nr(e, {
				get id() {
					return p(t);
				},
				children: (e, t) => {
					T();
					var n = N();
					b(() => U(n, i.label)), A(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	F(O, (e) => {
		i.label && e(k);
	});
	var P = t(O, 2), I = w(P);
	r(I, 17, () => p(h), (e) => e.id, (e, n) => {
		var r = Ro(), i = w(r);
		{
			let e = G(() => `${u()}-${p(n).id}-key`);
			To(i, {
				get id() {
					return p(e);
				},
				get placeholder() {
					return o();
				},
				get value() {
					return p(n).key;
				},
				oninput: (e) => x(p(n).id, { key: e.currentTarget.value })
			});
		}
		var a = t(i, 2), c = () => p(n).value, d = (e) => x(p(n).id, { value: e });
		{
			let e = G(() => `${u()}-${p(n).id}-value`);
			Lo(a, {
				get id() {
					return p(e);
				},
				get placeholder() {
					return s();
				},
				get variables() {
					return l();
				},
				get value() {
					return c();
				},
				set value(e) {
					d(e);
				}
			});
		}
		jt(t(a, 2), {
			variant: "ghost",
			size: "icon",
			type: "button",
			get "aria-label"() {
				return m();
			},
			onclick: () => S(p(n).id),
			children: (e, t) => {
				Z(e, {
					icon: "ri:delete-bin-line",
					class: "size-5",
					"aria-hidden": "true"
				});
			},
			$$slots: { default: !0 }
		}), g(r), A(e, r);
	}), jt(t(I, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: C,
		children: (e, t) => {
			T();
			var n = N();
			b(() => U(n, f())), A(e, n);
		},
		$$slots: { default: !0 }
	}), g(P);
	var L = t(P, 2), ee = (e) => {
		var t = zo(), n = w(t, !0);
		g(t), b(() => U(n, i.error)), A(e, t);
	};
	F(L, (e) => {
		i.error && e(ee);
	}), g(E), b((t) => {
		M(E, 1, t), e(E, "aria-labelledby", i.label ? `${u()}-label` : void 0);
	}, [() => K(Q("grid w-full gap-2", i.class))]), A(n, E), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-one-of.svelte
var Ho = J("<span aria-hidden=\"true\">*</span>"), Uo = J(" <!>", 1), Wo = J("<button type=\"button\" role=\"tab\"> </button>"), Go = J("<p> </p>"), Ko = J("<div><!> <div role=\"tablist\"></div> <div class=\"min-w-0\" role=\"tabpanel\"><!></div> <!></div>");
function qo(n, i) {
	c(i, !0);
	let a = D(i, "value", 31, () => V({
		variant: "",
		values: {}
	})), o = G(() => a().variant || i.variants[0]?.id || "");
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
	var u = Ko(), d = w(u), f = (e) => {
		Nr(e, {
			children: (e, n) => {
				T();
				var r = Uo(), a = h(r), o = t(a), s = (e) => {
					var t = Ho();
					b(() => M(t, 1, K(zt))), A(e, t);
				};
				F(o, (e) => {
					i.required && e(s);
				}), b(() => U(a, `${i.label ?? ""} `)), A(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	F(d, (e) => {
		i.label && e(f);
	});
	var m = t(d, 2);
	r(m, 21, () => i.variants, (e) => e.id, (t, n) => {
		var r = Wo(), i = w(r, !0);
		g(r), b((t) => {
			e(r, "id", `tab-${p(n).id}`), e(r, "aria-selected", p(o) === p(n).id), e(r, "aria-controls", `panel-${p(n).id}`), M(r, 1, t), U(i, p(n).label);
		}, [() => K(Q("cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors", p(o) === p(n).id ? "bg-dark-600 text-dark-50" : "text-dark-200 hover:bg-dark-800 hover:text-dark-50"))]), Y("click", r, () => s(p(n).id)), A(t, r);
	}), g(m);
	var v = t(m, 2);
	_(w(v), () => i.panel, () => ({
		variantId: p(o),
		value: a().values[p(o)],
		setValue: (e) => l(p(o), e)
	})), g(v);
	var x = t(v, 2), S = (e) => {
		var t = Go(), n = w(t, !0);
		g(t), b(() => {
			M(t, 1, K(Ft)), U(n, i.error);
		}), A(e, t);
	};
	F(x, (e) => {
		i.error && e(S);
	}), g(u), b((t, n) => {
		M(u, 1, t), M(m, 1, n), e(m, "aria-label", i.label), e(v, "id", `panel-${p(o)}`), e(v, "aria-labelledby", `tab-${p(o)}`);
	}, [() => K(Q("grid w-full min-w-0 gap-3")), () => K(Q("inline-flex w-fit gap-0.5 rounded-lg border border-border bg-dark-800 p-1", i.error && "border-destructive"))]), A(n, u), y();
}
ne(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-select-text.svelte
var Jo = new Set([
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
]), Yo = J("<!> <!>", 1), Xo = J("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Zo = J(" <!>", 1), Qo = J("<!> <!> <!>", 1), $o = J("<p> </p>"), es = J("<div><!> <div><!> <div class=\"relative min-w-0 flex-1\"><input/> <!></div></div> <!></div>");
function ts(e, i) {
	c(i, !0);
	let o = D(i, "variables", 19, () => []), s = D(i, "id", 19, Pe), l = D(i, "value", 31, () => V({
		type: "",
		value: ""
	})), u = H(i, Jo), d = G(() => i.selectPlaceholder ?? "Select"), f = G(() => i.loadingPlaceholder ?? "Loading..."), m = Ja(() => i.items), _ = G(() => `${s()}-listbox`), v = new qt({
		variables: () => o(),
		onChange: (e) => l({
			...l(),
			value: e
		})
	});
	var x = es(), S = w(x), E = (e) => {
		Nr(e, {
			get for() {
				return s();
			},
			children: (e, t) => {
				T();
				var n = N();
				b(() => U(n, i.label)), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(S, (e) => {
		i.label && e(E);
	});
	var O = t(S, 2), k = w(O);
	n(k, () => fr, (e, a) => {
		a(e, {
			type: "single",
			get items() {
				return m.items;
			},
			get value() {
				return l().type;
			},
			set value(e) {
				l(l().type = e, !0);
			},
			children: (e, a) => {
				var o = Yo(), s = h(o);
				{
					let e = G(() => Q("flex shrink-0 cursor-pointer items-center justify-between gap-2 rounded-l-lg border border-r-0 outline-none", Gt, Rt, Ve.md, Bt(i.error), i.selectClass));
					n(s, () => vr, (r, i) => {
						i(r, {
							get class() {
								return p(e);
							},
							children: (e, r) => {
								var i = Yo(), a = h(i);
								{
									let e = G(() => m.loading ? p(f) : p(d));
									n(a, () => hr, (t, n) => {
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
								}), A(e, i);
							},
							$$slots: { default: !0 }
						});
					});
				}
				n(t(s, 2), () => yt, (e, a) => {
					a(e, {
						children: (e, a) => {
							var o = L(), s = h(o);
							{
								let e = G(() => i.contentProps?.sideOffset ?? 4), a = G(() => Q("z-[100] max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", i.contentProps?.class));
								n(s, () => Hn, (o, s) => {
									s(o, q(() => i.contentProps, {
										get sideOffset() {
											return p(e);
										},
										get class() {
											return p(a);
										},
										children: (e, i) => {
											var a = Qo(), o = h(a);
											n(o, () => ar, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = t(o, 2);
											n(s, () => Zn, (e, i) => {
												i(e, {
													children: (e, i) => {
														var a = L(), o = h(a), s = (e) => {
															var t = Xo(), n = w(t, !0);
															g(t), b(() => U(n, p(f))), A(e, t);
														}, c = (e) => {
															var i = L();
															r(h(i), 17, () => m.items, ({ value: e, label: t, disabled: n }) => e, (e, r) => {
																let i = () => p(r).value, a = () => p(r).label, o = () => p(r).disabled;
																var s = L(), c = h(s);
																{
																	let e = (e, n) => {
																		let r = () => n?.().selected;
																		T();
																		var i = Zo(), o = h(i), s = t(o), c = (e) => {
																			Z(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		F(s, (e) => {
																			r() && e(c);
																		}), b(() => U(o, `${a() ?? ""} `)), A(e, i);
																	}, r = G(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	n(c, () => qn, (t, n) => {
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
																A(e, s);
															}), A(e, i);
														};
														F(o, (e) => {
															m.loading ? e(s) : e(c, -1);
														}), A(e, a);
													},
													$$slots: { default: !0 }
												});
											}), n(t(s, 2), () => tr, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), A(e, a);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							A(e, o);
						},
						$$slots: { default: !0 }
					});
				}), A(e, o);
			},
			$$slots: { default: !0 }
		});
	});
	var j = t(k, 2), I = w(j);
	C(I, (e, t) => ({
		id: s(),
		placeholder: i.placeholder,
		class: e,
		"aria-invalid": i.error ? !0 : void 0,
		role: o().length > 0 ? "combobox" : void 0,
		"aria-autocomplete": o().length > 0 ? "list" : void 0,
		"aria-expanded": o().length > 0 ? v.isOpen : void 0,
		"aria-controls": o().length > 0 ? p(_) : void 0,
		"aria-activedescendant": t,
		...u
	}), [() => Q("min-w-0 w-full truncate rounded-r-lg border outline-none", Gt, Rt, Ve.md, Bt(i.error)), () => v.isOpen ? Yt(p(_), v.highlightedIndex) : void 0], void 0, void 0, void 0, !0), P(I, () => v.attach), Xt(t(I, 2), {
		get autocomplete() {
			return v;
		},
		get id() {
			return p(_);
		}
	}), g(j), g(O);
	var ee = t(O, 2), R = (e) => {
		var t = $o(), n = w(t, !0);
		g(t), b(() => {
			M(t, 1, K(Ft)), U(n, i.error);
		}), A(e, t);
	};
	F(ee, (e) => {
		i.error && e(R);
	}), g(x), b((e, t) => {
		M(x, 1, e), M(O, 1, t);
	}, [() => K(Q("relative grid w-full min-w-0 gap-2", i.class)), () => K(Q("flex w-full min-w-0 items-stretch rounded-lg", It, Vt(i.error)))]), a(I, () => l().value, (e) => l(l().value = e, !0)), A(e, x), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-slider.svelte
var ns = J("<div class=\"flex items-center justify-between gap-4\"><!> <span class=\"text-sm text-dark-100\"> </span></div>"), rs = J("<p> </p>"), is = J("<div><!> <input type=\"range\"/> <!></div>");
function as(n, r) {
	c(r, !0);
	let i = D(r, "id", 19, Pe), o = D(r, "min", 3, 0), s = D(r, "max", 3, 100), l = D(r, "step", 3, 1), u = D(r, "value", 15, 0), d = D(r, "unit", 3, "%");
	var f = is(), p = w(f), h = (e) => {
		var n = ns(), a = w(n);
		Nr(a, {
			get for() {
				return i();
			},
			children: (e, t) => {
				T();
				var n = N();
				b(() => U(n, r.label)), A(e, n);
			},
			$$slots: { default: !0 }
		});
		var o = t(a, 2), s = w(o);
		g(o), g(n), b(() => U(s, `${u() ?? ""}${d() ?? ""}`)), A(e, n);
	};
	F(p, (e) => {
		r.label && e(h);
	});
	var _ = t(p, 2);
	m(_);
	var v = t(_, 2), x = (e) => {
		var t = rs(), n = w(t, !0);
		g(t), b(() => {
			M(t, 1, K(Ft)), U(n, r.error);
		}), A(e, t);
	};
	F(v, (e) => {
		r.error && e(x);
	}), g(f), b((t, n) => {
		M(f, 1, t), e(_, "id", i()), e(_, "min", o()), e(_, "max", s()), e(_, "step", l()), M(_, 1, n);
	}, [() => K(Q("grid w-full gap-2")), () => K(Q("h-2 w-full cursor-pointer appearance-none rounded-full bg-dark-600 accent-primary", r.error && "ring-1 ring-destructive"))]), Y("input", _, () => r.onvaluechange?.(u())), a(_, u), A(n, f), y();
}
ne(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-switch.svelte
var os = J("<p> </p>"), ss = J("<div><div class=\"flex items-center gap-3\"><!> <!></div> <!></div>");
function cs(e, r) {
	c(r, !0);
	let i = D(r, "checked", 15, !1), a = D(r, "id", 19, Pe);
	var o = ss(), s = w(o), l = w(s);
	{
		let e = G(() => r.label ? `${a()}-label` : void 0), t = G(() => r.error ? !0 : void 0), o = G(() => Q("inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border p-[2px] transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary/15", r.error ? Q(Ht, "data-[state=unchecked]:bg-destructive/15") : "data-[state=unchecked]:border-border data-[state=unchecked]:bg-transparent data-[state=unchecked]:hover:border-dark-400", Lt, "disabled:cursor-not-allowed disabled:opacity-50"));
		n(l, () => Or, (r, s) => {
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
						let e = G(() => Q("pointer-events-none block size-4 shrink-0 rounded-full transition-transform", "data-[state=checked]:translate-x-[19px] data-[state=unchecked]:-translate-x-[1px]", "data-[state=unchecked]:bg-dark-400", "data-[state=checked]:bg-primary"));
						n(i, () => jr, (t, n) => {
							n(t, { get class() {
								return p(e);
							} });
						});
					}
					A(e, r);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var u = t(l, 2), d = (e) => {
		Nr(e, {
			get id() {
				return `${a() ?? ""}-label`;
			},
			get for() {
				return a();
			},
			class: "cursor-pointer",
			children: (e, t) => {
				T();
				var n = N();
				b(() => U(n, r.label)), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(u, (e) => {
		r.label && e(d);
	}), g(s);
	var f = t(s, 2), m = (e) => {
		var t = os(), n = w(t, !0);
		g(t), b(() => {
			M(t, 1, K(Ft)), U(n, r.error);
		}), A(e, t);
	};
	F(f, (e) => {
		r.error && e(m);
	}), g(o), b((e) => M(o, 1, e), [() => K(Q("grid gap-2", r.class))]), A(e, o), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-list.svelte
var ls = J("<div class=\"flex items-center gap-2\"><!> <!></div>"), us = J("<p class=\"text-sm text-destructive-50\"> </p>"), ds = J("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function fs(n, i) {
	c(i, !0);
	let a = D(i, "values", 31, () => V([])), o = D(i, "id", 19, Pe), s = D(i, "addLabel", 3, "Add"), l = D(i, "removeLabel", 3, "Remove"), u = j(V([]));
	function f(e) {
		return e.map((e) => ({
			id: crypto.randomUUID(),
			value: e
		}));
	}
	function m() {
		a(p(u).map((e) => e.value));
	}
	function h(e, t) {
		W(u, p(u).map((n) => n.id === e ? {
			...n,
			value: t
		} : n), !0), m();
	}
	function _(e) {
		W(u, p(u).filter((t) => t.id !== e), !0), m();
	}
	function v() {
		W(u, [...p(u), {
			id: crypto.randomUUID(),
			value: ""
		}], !0), m();
	}
	d(() => {
		let e = a(), t = p(u).map((e) => e.value);
		e.length === t.length && e.every((e, n) => e === t[n]) || W(u, f(e), !0);
	});
	var x = ds(), S = w(x), C = (e) => {
		{
			let t = G(() => `${o()}-label`);
			Nr(e, {
				get id() {
					return p(t);
				},
				children: (e, t) => {
					T();
					var n = N();
					b(() => U(n, i.label)), A(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	F(S, (e) => {
		i.label && e(C);
	});
	var E = t(S, 2), O = w(E);
	r(O, 17, () => p(u), (e) => e.id, (e, n) => {
		var r = ls(), a = w(r);
		{
			let e = G(() => `${o()}-${p(n).id}`);
			To(a, {
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
		jt(t(a, 2), {
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
		}), g(r), A(e, r);
	}), jt(t(O, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: v,
		children: (e, t) => {
			T();
			var n = N();
			b(() => U(n, s())), A(e, n);
		},
		$$slots: { default: !0 }
	}), g(E);
	var k = t(E, 2), P = (e) => {
		var t = us(), n = w(t, !0);
		g(t), b(() => U(n, i.error)), A(e, t);
	};
	F(k, (e) => {
		i.error && e(P);
	}), g(x), b((t) => {
		M(x, 1, t), e(x, "aria-labelledby", i.label ? `${o()}-label` : void 0);
	}, [() => K(Q("grid w-full gap-2", i.class))]), A(n, x), y();
}
//#endregion
//#region ../ui/src/lib/components/input/use-dropdown-scroll.svelte.ts
var ps = class {
	#e = j(0);
	get scrollTop() {
		return p(this.#e);
	}
	set scrollTop(e) {
		W(this.#e, e, !0);
	}
	#t = j(null);
	get viewportRef() {
		return p(this.#t);
	}
	set viewportRef(e) {
		W(this.#t, e, !0);
	}
	handleViewportScroll = (e) => {
		this.scrollTop = e.currentTarget.scrollTop;
	};
	resetScroll() {
		this.scrollTop = 0, this.viewportRef && (this.viewportRef.scrollTop = 0);
	}
	scrollToIndex(e) {
		if (e < 0) return;
		let t = Qa(e);
		this.scrollTop = t, this.viewportRef && (this.viewportRef.scrollTop = t);
	}
	scrollToValue(e, t) {
		if (!t) return;
		let n = e.findIndex((e) => e.value === t);
		n >= 0 && this.scrollToIndex(n);
	}
}, ms = J("<div class=\"relative w-full\"><div class=\"absolute inset-x-0 top-0\"></div></div>");
function hs(e, t) {
	c(t, !0);
	let n = D(t, "viewportHeight", 3, 200), i = G(() => Za(t.items.length)), a = G(() => p(i) ? Xa(t.items, t.scrollTop, n()) : null), o = G(() => p(i) && p(a) ? p(a).items : t.items);
	var s = L(), l = h(s), u = (e) => {
		var n = ms();
		let i;
		var s = w(n);
		let c;
		r(s, 21, () => p(o), (e) => e.value, (e, n) => {
			var r = L();
			_(h(r), () => t.item, () => p(n)), A(e, r);
		}), g(s), g(n), b(() => {
			i = te(n, "", i, { height: `${p(a).totalHeight}px` }), c = te(s, "", c, { transform: `translateY(${p(a).offsetY}px)` });
		}), A(e, n);
	}, d = (e) => {
		var n = L();
		r(h(n), 17, () => p(o), (e) => e.value, (e, n) => {
			var r = L();
			_(h(r), () => t.item, () => p(n)), A(e, r);
		}), A(e, n);
	};
	F(l, (e) => {
		p(i) && p(a) ? e(u) : e(d, -1);
	}), A(e, s), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-select.svelte
var gs = (e, r = B) => {
	let i = G(() => r().value), a = G(() => r().label), o = G(() => r().disabled);
	var s = L(), c = h(s);
	{
		let e = (e, n) => {
			let r = () => n?.().selected;
			T();
			var i = vs(), o = h(i), s = t(o), c = (e) => {
				Z(e, {
					icon: "ri:check-line",
					class: "size-5 text-primary"
				});
			};
			F(s, (e) => {
				r() && e(c);
			}), b(() => U(o, `${p(a) ?? ""} `)), A(e, i);
		}, r = G(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
		n(c, () => qn, (t, n) => {
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
	A(e, s);
}, _s = new Set([
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
]), vs = J(" <!>", 1), ys = J("<span>*</span>"), bs = J("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), xs = J("<div class=\"px-3 py-1.5 text-sm text-dark-300\"></div>"), Ss = J("<!> <!> <!>", 1), Cs = J("<div><div class=\"min-w-0 flex-1\"><!></div> <button type=\"button\" aria-haspopup=\"listbox\"><!></button></div> <!>", 1), ws = J("<p> </p>"), Ts = J("<div><!> <!> <!></div>");
function Es(r, i) {
	c(i, !0);
	let a = D(i, "allowCustomValue", 3, !0), s = D(i, "id", 19, Pe), l = D(i, "value", 15, ""), u = H(i, _s), d = G(() => i.placeholder), m = G(() => i.loadingPlaceholder ?? "Loading..."), _ = G(() => i.selectAriaLabel ?? "Select value"), v = j(!1), x = j(""), S = j(!1), C = new ps(), E = Ja(() => i.items, () => i.reloadKey?.()), O = new At(() => p(x), 100), k = G(() => new Map(E.items.map((e) => [e.value, e]))), N = G(() => p(k).get(l())), P = G(() => p(N)?.value ?? ""), I = G(() => {
		if (E.loading) return [];
		if (!p(S)) return E.items;
		let e = O.current.trim();
		return e ? Ya(E.items, e) : E.items;
	}), ee = G(() => p(N) && !p(I).some((e) => e.value === p(N).value) ? [p(N), ...p(I)] : p(I));
	function R() {
		p(S) || W(x, p(N)?.label ?? (a() ? l() : ""), !0);
	}
	o(() => {
		l(), p(N)?.label, R();
	}), o(() => {
		O.current, p(v) && C.resetScroll();
	});
	function z() {
		W(v, p(I).length > 0 || E.items.length > 0, !0);
	}
	function B(e) {
		W(x, e.currentTarget.value, !0), W(S, !0), a() && l(p(x)), z();
	}
	function V() {
		W(v, !0);
	}
	function J() {
		W(S, !1), R();
	}
	async function te(e) {
		if (W(v, e, !0), !e) {
			W(S, !1), C.resetScroll(), R();
			return;
		}
		await f(), C.scrollToValue(p(I), l());
	}
	function ne() {
		W(v, !0);
	}
	let re = G(() => je(u, {
		id: s(),
		placeholder: E.loading ? p(m) : p(d),
		autocomplete: "off",
		class: Q("min-w-0 w-full truncate rounded-l-lg border border-r-0 outline-none", Gt, Rt, Ve.md, Bt(i.error)),
		"aria-invalid": i.error ? !0 : void 0,
		oninput: B,
		onfocus: V,
		onblur: J
	}));
	var ie = Ts(), X = w(ie), ae = (e) => {
		Nr(e, {
			get for() {
				return s();
			},
			children: (e, n) => {
				T();
				var r = vs(), a = h(r), o = t(a), s = (e) => {
					var t = ys();
					b(() => M(t, 1, K(zt))), A(e, t);
				};
				F(o, (e) => {
					i.required && e(s);
				}), b(() => U(a, `${i.label ?? ""} `)), A(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	F(X, (e) => {
		i.label && e(ae);
	});
	var oe = t(X, 2);
	{
		let r = G(() => !!i.disabled);
		n(oe, () => In, (a, o) => {
			o(a, {
				type: "single",
				get items() {
					return p(ee);
				},
				get inputValue() {
					return p(x);
				},
				get value() {
					return p(P);
				},
				onValueChange: (e) => {
					e && (l(e), W(S, !1), W(v, !1), R());
				},
				onOpenChange: te,
				get disabled() {
					return p(r);
				},
				get open() {
					return p(v);
				},
				set open(e) {
					W(v, e, !0);
				},
				children: (r, a) => {
					var o = Cs(), s = h(o), c = w(s);
					n(w(c), () => zn, (e, t) => {
						t(e, q(() => p(re)));
					}), g(c);
					var l = t(c, 2);
					Z(w(l), {
						icon: "ri:expand-up-down-line",
						class: "size-5 shrink-0 text-dark-300"
					}), g(l), g(s), n(t(s, 2), () => yt, (e, r) => {
						r(e, {
							children: (e, r) => {
								var a = L(), o = h(a);
								{
									let e = G(() => i.contentProps?.sideOffset ?? 4), r = G(() => Q("z-[100] max-h-84 min-w-(--bits-combobox-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", i.contentProps?.class));
									n(o, () => Hn, (a, o) => {
										o(a, q(() => i.contentProps, {
											get sideOffset() {
												return p(e);
											},
											get class() {
												return p(r);
											},
											children: (e, r) => {
												var i = Ss(), a = h(i);
												n(a, () => ar, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															Z(e, { icon: "ri:arrow-up-s-line" });
														},
														$$slots: { default: !0 }
													});
												});
												var o = t(a, 2);
												n(o, () => Zn, (e, t) => {
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
																var t = bs(), n = w(t, !0);
																g(t), b(() => U(n, p(m))), A(e, t);
															}, a = (e) => {
																hs(e, {
																	get items() {
																		return p(I);
																	},
																	get scrollTop() {
																		return C.scrollTop;
																	},
																	get item() {
																		return gs;
																	}
																});
															}, o = (e) => {
																var t = xs();
																t.textContent = "No matches found", A(e, t);
															};
															F(r, (e) => {
																E.loading ? e(i) : p(I).length > 0 ? e(a, 1) : e(o, -1);
															}), A(e, n);
														},
														$$slots: { default: !0 }
													});
												}), n(t(o, 2), () => tr, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															Z(e, { icon: "ri:arrow-down-s-line" });
														},
														$$slots: { default: !0 }
													});
												}), A(e, i);
											},
											$$slots: { default: !0 }
										}));
									});
								}
								A(e, a);
							},
							$$slots: { default: !0 }
						});
					}), b((t, n) => {
						M(s, 1, t), e(l, "aria-label", p(_)), e(l, "aria-expanded", p(v)), l.disabled = !!i.disabled, M(l, 1, n);
					}, [() => K(Q("flex w-full min-w-0 items-stretch rounded-lg", It, Vt(i.error))), () => K(Q("flex shrink-0 cursor-pointer items-center justify-center rounded-r-lg border outline-none", Gt, Rt, Ve.md, Bt(i.error), i.selectClass))]), Y("click", l, ne), A(r, o);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var se = t(oe, 2), ce = (e) => {
		var t = ws(), n = w(t, !0);
		g(t), b(() => {
			M(t, 1, K(Ft)), U(n, i.error);
		}), A(e, t);
	};
	F(se, (e) => {
		i.error && e(ce);
	}), g(ie), b((e) => M(ie, 1, e), [() => K(Q("relative grid w-full min-w-0 gap-2", i.class))]), A(r, ie), y();
}
ne(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-select-text.svelte
var Ds = new Set([
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
]), Os = J("<!> <!>", 1), ks = J("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), As = J(" <!>", 1), js = J("<!> <!> <!>", 1), Ms = J("<div aria-hidden=\"true\">—</div>"), Ns = J("<input/>"), Ps = J("<div class=\"flex shrink-0 items-center self-center\"><!></div>"), Fs = J("<p> </p>"), Is = J("<div><!> <div class=\"flex items-center gap-3\"><div><input/> <!> <!> <!> <!></div> <!></div> <!></div>");
function Ls(i, o) {
	c(o, !0);
	let s = D(o, "variables", 19, () => []), l = D(o, "valuelessOperators", 19, () => []), u = D(o, "id", 19, Pe), d = D(o, "value", 31, () => V({
		path: "",
		type: "equals",
		value: ""
	})), f = H(o, Ds), v = G(() => o.selectPlaceholder ?? "Select"), x = G(() => o.loadingPlaceholder ?? "Loading..."), S = Ja(() => o.items), E = G(() => `${u()}-path-listbox`), O = G(() => `${u()}-value-listbox`), k = new qt({
		variables: () => s(),
		onChange: (e) => d({
			...d(),
			path: e
		})
	}), j = new qt({
		variables: () => s(),
		onChange: (e) => d({
			...d(),
			value: e
		})
	}), I = G(() => Bt(o.error)), ee = G(() => l().includes(d().type));
	var R = Is(), z = w(R), B = (e) => {
		Nr(e, {
			get for() {
				return u();
			},
			children: (e, t) => {
				T();
				var n = N();
				b(() => U(n, o.label)), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	F(z, (e) => {
		o.label && e(B);
	});
	var W = t(z, 2), J = w(W), te = w(J);
	C(te, (e, t) => ({
		id: u(),
		placeholder: o.pathPlaceholder,
		class: e,
		"aria-invalid": o.error ? !0 : void 0,
		role: s().length > 0 ? "combobox" : void 0,
		"aria-autocomplete": s().length > 0 ? "list" : void 0,
		"aria-expanded": s().length > 0 ? k.isOpen : void 0,
		"aria-controls": s().length > 0 ? p(E) : void 0,
		"aria-activedescendant": t,
		...f
	}), [() => Q("min-w-0 flex-1 truncate border border-r outline-none", "rounded-l-lg", Gt, Rt, Ve.md, p(I)), () => k.isOpen ? Yt(p(E), k.highlightedIndex) : void 0], void 0, void 0, void 0, !0), P(te, () => k.attach);
	var ne = t(te, 2);
	n(ne, () => fr, (e, i) => {
		i(e, {
			type: "single",
			get items() {
				return S.items;
			},
			get value() {
				return d().type;
			},
			set value(e) {
				d(d().type = e, !0);
			},
			children: (e, i) => {
				var a = Os(), s = h(a);
				{
					let e = G(() => Q("flex shrink-0 cursor-pointer items-center justify-between gap-2 border border-x-0 outline-none", Gt, Rt, Ve.md, p(I), o.selectClass ?? "w-32"));
					n(s, () => vr, (r, i) => {
						i(r, {
							get class() {
								return p(e);
							},
							children: (e, r) => {
								var i = Os(), a = h(i);
								{
									let e = G(() => S.loading ? p(x) : p(v));
									n(a, () => hr, (t, n) => {
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
								}), A(e, i);
							},
							$$slots: { default: !0 }
						});
					});
				}
				n(t(s, 2), () => yt, (e, i) => {
					i(e, {
						children: (e, i) => {
							var a = L(), s = h(a);
							{
								let e = G(() => o.contentProps?.sideOffset ?? 4), i = G(() => Q("z-[100] max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", o.contentProps?.class));
								n(s, () => Hn, (a, s) => {
									s(a, q(() => o.contentProps, {
										get sideOffset() {
											return p(e);
										},
										get class() {
											return p(i);
										},
										children: (e, i) => {
											var a = js(), o = h(a);
											n(o, () => ar, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = t(o, 2);
											n(s, () => Zn, (e, i) => {
												i(e, {
													children: (e, i) => {
														var a = L(), o = h(a), s = (e) => {
															var t = ks(), n = w(t, !0);
															g(t), b(() => U(n, p(x))), A(e, t);
														}, c = (e) => {
															var i = L();
															r(h(i), 17, () => S.items, ({ value: e, label: t, disabled: n }) => e, (e, r) => {
																let i = () => p(r).value, a = () => p(r).label, o = () => p(r).disabled;
																var s = L(), c = h(s);
																{
																	let e = (e, n) => {
																		let r = () => n?.().selected;
																		T();
																		var i = As(), o = h(i), s = t(o), c = (e) => {
																			Z(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		F(s, (e) => {
																			r() && e(c);
																		}), b(() => U(o, `${a() ?? ""} `)), A(e, i);
																	}, r = G(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	n(c, () => qn, (t, n) => {
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
																A(e, s);
															}), A(e, i);
														};
														F(o, (e) => {
															S.loading ? e(s) : e(c, -1);
														}), A(e, a);
													},
													$$slots: { default: !0 }
												});
											}), n(t(s, 2), () => tr, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), A(e, a);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							A(e, a);
						},
						$$slots: { default: !0 }
					});
				}), A(e, a);
			},
			$$slots: { default: !0 }
		});
	});
	var re = t(ne, 2), Y = (e) => {
		var t = Ms();
		b((e) => M(t, 1, e), [() => K(Q("flex min-w-0 items-center rounded-r-lg border border-l-0 px-3 text-dark-500 select-none", Gt, Ve.md, p(I)))]), A(e, t);
	}, ie = (t) => {
		var n = Ns();
		m(n), P(n, () => j.attach), b((t, r) => {
			e(n, "placeholder", o.valuePlaceholder), M(n, 1, t), e(n, "aria-invalid", o.error ? !0 : void 0), e(n, "role", s().length > 0 ? "combobox" : void 0), e(n, "aria-autocomplete", s().length > 0 ? "list" : void 0), e(n, "aria-expanded", s().length > 0 ? j.isOpen : void 0), e(n, "aria-controls", s().length > 0 ? p(O) : void 0), e(n, "aria-activedescendant", r);
		}, [() => K(Q("min-w-0 flex-1 truncate rounded-r-lg border outline-none", Gt, Rt, Ve.md, p(I))), () => j.isOpen ? Yt(p(O), j.highlightedIndex) : void 0]), a(n, () => d().value, (e) => d(d().value = e, !0)), A(t, n);
	};
	F(re, (e) => {
		p(ee) ? e(Y) : e(ie, -1);
	});
	var X = t(re, 2);
	Xt(X, {
		get autocomplete() {
			return k;
		},
		get id() {
			return p(E);
		}
	}), Xt(t(X, 2), {
		get autocomplete() {
			return j;
		},
		get id() {
			return p(O);
		}
	}), g(J);
	var ae = t(J, 2), oe = (e) => {
		var t = Ps();
		_(w(t), () => o.suffix), g(t), A(e, t);
	};
	F(ae, (e) => {
		o.suffix && e(oe);
	}), g(W);
	var se = t(W, 2), ce = (e) => {
		var t = Fs(), n = w(t, !0);
		g(t), b(() => {
			M(t, 1, K(Ft)), U(n, o.error);
		}), A(e, t);
	};
	F(se, (e) => {
		o.error && e(ce);
	}), g(R), b((e, t) => {
		M(R, 1, e), M(J, 1, t);
	}, [() => K(Q("relative grid w-full gap-2", o.class)), () => K(Q("relative grid min-w-0 flex-1 grid-cols-[1fr_120px_1fr] rounded-lg", It, Vt(o.error)))]), a(te, () => d().path, (e) => d(d().path = e, !0)), A(i, R), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-textarea.svelte
var Rs = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"label",
	"id",
	"error",
	"rows",
	"value",
	"class"
]), zs = J("<p> </p>"), Bs = J("<div><!> <div><textarea></textarea></div> <!></div>");
function Vs(e, n) {
	c(n, !0);
	let r = D(n, "id", 19, Pe), i = D(n, "rows", 3, 4), o = D(n, "value", 15), s = H(n, Rs);
	var u = Bs(), d = w(u), f = (e) => {
		Nr(e, {
			get for() {
				return r();
			},
			children: (e, t) => {
				T();
				var r = N();
				b(() => U(r, n.label)), A(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	F(d, (e) => {
		n.label && e(f);
	});
	var p = t(d, 2), m = w(p);
	l(m), C(m, (e) => ({
		id: r(),
		rows: i(),
		"aria-invalid": n.error ? !0 : void 0,
		...s,
		class: e
	}), [() => Q("box-border w-full min-w-0 resize-y rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors", Gt, Rt, Bt(n.error))]), g(p);
	var h = t(p, 2), _ = (e) => {
		var t = zs(), r = w(t, !0);
		g(t), b(() => {
			M(t, 1, K(Ft)), U(r, n.error);
		}), A(e, t);
	};
	F(h, (e) => {
		n.error && e(_);
	}), g(u), b((e, t) => {
		M(u, 1, e), M(p, 1, t);
	}, [() => K(Q("relative grid w-full min-w-0 gap-2", n.class)), () => K(Q("relative flex w-full min-w-0 rounded-lg", Vt(n.error)))]), a(m, o), A(e, u), y();
}
//#endregion
export { Nr as S, Ja as _, cs as a, _i as b, qo as c, No as d, Ao as f, so as g, yo as h, fs as i, Vo as l, To as m, Ls as n, as as o, Oo as p, Es as r, ts as s, Vs as t, Lo as u, qa as v, Lr as x, wi as y };
