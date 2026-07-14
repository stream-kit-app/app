import { $ as e, $n as t, Ct as n, Dt as r, E as i, G as a, Gn as o, Hr as s, Jr as c, Kn as l, Mn as u, Nn as d, On as f, Q as p, Qn as m, Qr as h, Qt as g, Sr as _, Vr as v, Wn as y, Xn as b, Xt as x, Yt as S, Z as C, Zn as w, Zr as T, _t as E, a as D, at as O, bn as k, cn as A, cr as j, dt as M, hn as N, jt as P, ln as F, lr as I, m as L, mn as R, ni as z, nr as B, o as V, on as H, or as U, pr as W, pt as G, s as K, un as q, ut as J, vn as Y, xn as X, yn as ee, zn as te } from "./client-xxWnFgeR.js";
import { i as ne, n as re, o as ie, r as ae, s as oe, t as se } from "./dist-7Fg9me4U.js";
import "./disclose-version-YhYaTdgb.js";
import { t as Z } from "./Icon-AeqJGRQj.js";
import "./index-client-DLfVeyOI.js";
import { t as Q } from "./utils-DJt177zd.js";
import { C as ce, D as $, _ as le, a as ue, c as de, d as fe, g as pe, i as me, l as he, n as ge, o as _e, r as ve, s as ye, u as be, v as xe, x as Se } from "./animations-complete-BfqHI4B-.js";
import { _ as Ce, b as we, g as Te, h as Ee, m as De, v as Oe, y as ke } from "./scroll-lock-BZF1_Y9Y.js";
import { i as Ae, n as je, r as Me, t as Ne } from "./use-id-C9llEPxa.js";
import { a as Pe, c as Fe, d as Ie, f as Le, h as Re, l as ze, m as Be, o as Ve, p as He, s as Ue, u as We } from "./command-wJw-CJ8Z.js";
import { t as Ge } from "./on-mount-effect.svelte-BDwcYjCA.js";
import { _ as Ke, a as qe, d as Je, f as Ye, g as Xe, h as Ze, i as Qe, l as $e, m as et, o as tt, p as nt, r as rt, s as it, u as at, v as ot } from "./dom-B4Rzp8oi.js";
import { a as st, o as ct, t as lt } from "./presence-manager.svelte-BOTfPcjg.js";
import { a as ut, c as dt, i as ft, n as pt, r as mt, s as ht } from "./dialog-t7Ac13OT.js";
import { t as gt } from "./portal-D-OgjF3O.js";
import "./legacy-CT5GbYa1.js";
import { a as _t, n as vt, r as yt, t as bt } from "./popper-layer-force-mount-BxV85AhM.js";
import { t as xt } from "./floating-layer-anchor-B_R8arju.js";
import { i as St, n as Ct, r as wt } from "./popover-S-nP6M-I.js";
import { t as Tt } from "./scroll-area-7qg9ezvn.js";
import { t as Et } from "./button-C7Vln2y_.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/checkbox/checkbox.svelte.js
var Dt = _e({
	component: "checkbox",
	parts: [
		"root",
		"group",
		"group-label",
		"input"
	]
}), Ot = new ce("Checkbox.Group"), kt = new ce("Checkbox.Root"), At = class e {
	static create(t, n = null) {
		return kt.set(new e(t, n));
	}
	opts;
	group;
	#e = W(() => this.group && this.group.opts.name.current ? this.group.opts.name.current : this.opts.name.current);
	get trueName() {
		return f(this.#e);
	}
	set trueName(e) {
		U(this.#e, e);
	}
	#t = W(() => this.group && this.group.opts.required.current ? !0 : this.opts.required.current);
	get trueRequired() {
		return f(this.#t);
	}
	set trueRequired(e) {
		U(this.#t, e);
	}
	#n = W(() => this.group && this.group.opts.disabled.current ? !0 : this.opts.disabled.current);
	get trueDisabled() {
		return f(this.#n);
	}
	set trueDisabled(e) {
		U(this.#n, e);
	}
	#r = W(() => this.group && this.group.opts.readonly.current ? !0 : this.opts.readonly.current);
	get trueReadonly() {
		return f(this.#r);
	}
	set trueReadonly(e) {
		U(this.#r, e);
	}
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = fe(this.opts.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this), Se.pre([() => c(this.group?.opts.value.current), () => this.opts.value.current], ([e, t]) => {
			!e || !t || (this.opts.checked.current = e.includes(t));
		}), Se.pre(() => this.opts.checked.current, (e) => {
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
	#a = W(() => ({
		checked: this.opts.checked.current,
		indeterminate: this.opts.indeterminate.current
	}));
	get snippetProps() {
		return f(this.#a);
	}
	set snippetProps(e) {
		U(this.#a, e);
	}
	#o = W(() => ({
		id: this.opts.id.current,
		role: "checkbox",
		type: this.opts.type.current,
		disabled: this.trueDisabled,
		"aria-checked": ye(this.opts.checked.current, this.opts.indeterminate.current),
		"aria-required": ve(this.trueRequired),
		"aria-readonly": ve(this.trueReadonly),
		"data-disabled": ge(this.trueDisabled),
		"data-readonly": ge(this.trueReadonly),
		"data-state": Mt(this.opts.checked.current, this.opts.indeterminate.current),
		[Dt.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return f(this.#o);
	}
	set props(e) {
		U(this.#o, e);
	}
}, jt = class e {
	static create() {
		return new e(kt.get());
	}
	root;
	#e = W(() => this.root.group ? !!(this.root.opts.value.current !== void 0 && this.root.group.opts.value.current.includes(this.root.opts.value.current)) : this.root.opts.checked.current);
	get trueChecked() {
		return f(this.#e);
	}
	set trueChecked(e) {
		U(this.#e, e);
	}
	#t = W(() => !!this.root.trueName);
	get shouldRender() {
		return f(this.#t);
	}
	set shouldRender(e) {
		U(this.#t, e);
	}
	constructor(e) {
		this.root = e, this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		st(this.root.opts.ref.current) && this.root.opts.ref.current.focus();
	}
	#n = W(() => ({
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
		U(this.#n, e);
	}
};
function Mt(e, t) {
	return t ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/hidden-input.svelte
var Nt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value"
]), Pt = q("<input/>");
function Ft(e, t) {
	s(t, !0);
	let n = D(t, "value", 15), r = V(t, Nt), i = W(() => Ae(r, {
		"aria-hidden": "true",
		tabindex: -1,
		style: {
			...Re,
			position: "absolute",
			top: "0",
			left: "0"
		}
	}));
	var o = F(), c = m(o), l = (e) => {
		var t = Pt();
		C(t, () => ({
			...f(i),
			value: n()
		}), void 0, void 0, void 0, void 0, !0), A(e, t);
	}, u = (e) => {
		var t = Pt();
		C(t, () => ({ ...f(i) }), void 0, void 0, void 0, void 0, !0), a(t, n), A(e, t);
	};
	P(c, (e) => {
		f(i).type === "checkbox" ? e(l) : e(u, -1);
	}), A(e, o), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/checkbox/components/checkbox-input.svelte
function It(e, t) {
	s(t, !1);
	let n = jt.create();
	L();
	var r = F(), i = m(r), a = (e) => {
		Ft(e, K(() => n.props));
	};
	P(i, (e) => {
		n.shouldRender && e(a);
	}), A(e, r), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/checkbox/components/checkbox.svelte
var Lt = new Set([
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
]), Rt = q("<button><!></button>"), zt = q("<!> <!>", 1);
function Bt(e, n) {
	let r = R();
	s(n, !0);
	let i = D(n, "checked", 15, !1), a = D(n, "ref", 15, null), o = D(n, "disabled", 3, !1), c = D(n, "required", 3, !1), l = D(n, "name", 3, void 0), u = D(n, "value", 3, "on"), d = D(n, "id", 19, () => je(r)), p = D(n, "indeterminate", 15, !1), _ = D(n, "type", 3, "button"), y = V(n, Lt), b = Ot.getOr(null);
	b && u() && (b.opts.value.current.includes(u()) ? i(!0) : i(!1)), Se.pre(() => u(), () => {
		b && u() && (b.opts.value.current.includes(u()) ? i(!0) : i(!1));
	});
	let x = At.create({
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
	}, b), S = W(() => Ae({ ...y }, x.props));
	var T = zt(), E = m(T), O = (e) => {
		var t = F(), r = m(t);
		{
			let e = W(() => ({
				props: f(S),
				...x.snippetProps
			}));
			g(r, () => n.child, () => f(e));
		}
		A(e, t);
	}, k = (e) => {
		var t = Rt();
		C(t, () => ({ ...f(S) })), g(w(t), () => n.children ?? z, () => x.snippetProps), h(t), A(e, t);
	};
	P(E, (e) => {
		n.child ? e(O) : e(k, -1);
	}), It(t(E, 2), {}), A(e, T), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/data-typeahead.svelte.js
var Vt = class {
	#e;
	#t = W(() => this.#e.candidateValues());
	#n;
	constructor(e) {
		this.#e = e, this.#n = Ee("", {
			afterMs: 1e3,
			getWindow: this.#e.getWindow
		}), this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this), this.resetTypeahead = this.resetTypeahead.bind(this);
	}
	handleTypeaheadSearch(e) {
		if (!this.#e.enabled() || !f(this.#t).length) return;
		this.#n.current = this.#n.current + e;
		let t = this.#e.getCurrentItem(), n = f(this.#t).find((e) => e === t) ?? "", r = Oe(f(this.#t).map((e) => e ?? ""), this.#n.current, n), i = f(this.#t).find((e) => e === r);
		return i && this.#e.onMatch(i), i;
	}
	resetTypeahead() {
		this.#n.current = "";
	}
}, Ht = [
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
], Ut = [
	Qe,
	Xe,
	nt
], Wt = [
	it,
	Ze,
	"End"
], Gt = [...Ut, ...Wt], Kt = _e({
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
}), qt = new ce("Select.Root | Combobox.Root");
new ce("Select.Group | Combobox.Group");
var Jt = new ce("Select.Content | Combobox.Content"), Yt = class {
	opts;
	#e = j(!1);
	get touchedInput() {
		return f(this.#e);
	}
	set touchedInput(e) {
		U(this.#e, e, !0);
	}
	#t = j(null);
	get inputNode() {
		return f(this.#t);
	}
	set inputNode(e) {
		U(this.#t, e, !0);
	}
	#n = j(null);
	get contentNode() {
		return f(this.#n);
	}
	set contentNode(e) {
		U(this.#n, e, !0);
	}
	contentPresence;
	#r = j(null);
	get viewportNode() {
		return f(this.#r);
	}
	set viewportNode(e) {
		U(this.#r, e, !0);
	}
	#i = j(null);
	get triggerNode() {
		return f(this.#i);
	}
	set triggerNode(e) {
		U(this.#i, e, !0);
	}
	#a = j(null);
	get valueNode() {
		return f(this.#a);
	}
	set valueNode(e) {
		U(this.#a, e, !0);
	}
	#o = j("");
	get valueId() {
		return f(this.#o);
	}
	set valueId(e) {
		U(this.#o, e, !0);
	}
	#s = j(null);
	get highlightedNode() {
		return f(this.#s);
	}
	set highlightedNode(e) {
		U(this.#s, e, !0);
	}
	#c = W(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-value") : null);
	get highlightedValue() {
		return f(this.#c);
	}
	set highlightedValue(e) {
		U(this.#c, e);
	}
	#l = W(() => {
		if (this.highlightedNode) return this.highlightedNode.id;
	});
	get highlightedId() {
		return f(this.#l);
	}
	set highlightedId(e) {
		U(this.#l, e);
	}
	#u = W(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-label") : null);
	get highlightedLabel() {
		return f(this.#u);
	}
	set highlightedLabel(e) {
		U(this.#u, e);
	}
	#d = j(!1);
	get contentIsPositioned() {
		return f(this.#d);
	}
	set contentIsPositioned(e) {
		U(this.#d, e, !0);
	}
	isUsingKeyboard = !1;
	isCombobox = !1;
	domContext = new Me(() => null);
	constructor(e) {
		this.opts = e, this.isCombobox = e.isCombobox, this.contentPresence = new lt({
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
	getBitsAttr = (e) => Kt.getAttr(e, this.isCombobox ? "combobox" : void 0);
}, Xt = class extends Yt {
	opts;
	isMulti = !1;
	#e = W(() => this.opts.value.current !== "");
	get hasValue() {
		return f(this.#e);
	}
	set hasValue(e) {
		U(this.#e, e);
	}
	#t = W(() => this.opts.items.current.length ? this.opts.items.current.find((e) => e.value === this.opts.value.current)?.label ?? "" : "");
	get currentLabel() {
		return f(this.#t);
	}
	set currentLabel(e) {
		U(this.#t, e);
	}
	#n = W(() => this.opts.items.current.length ? this.opts.items.current.filter((e) => !e.disabled).map((e) => e.label) : []);
	get candidateLabels() {
		return f(this.#n);
	}
	set candidateLabels(e) {
		U(this.#n, e);
	}
	#r = W(() => !(this.isMulti || this.opts.items.current.length === 0));
	get dataTypeaheadEnabled() {
		return f(this.#r);
	}
	set dataTypeaheadEnabled(e) {
		U(this.#r, e);
	}
	constructor(e) {
		super(e), this.opts = e, o(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), Se(() => this.opts.open.current, () => {
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
		pe(() => {
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
}, Zt = class extends Yt {
	opts;
	isMulti = !0;
	#e = W(() => this.opts.value.current.length > 0);
	get hasValue() {
		return f(this.#e);
	}
	set hasValue(e) {
		U(this.#e, e);
	}
	constructor(e) {
		super(e), this.opts = e, o(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), Se(() => this.opts.open.current, () => {
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
		pe(() => {
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
}, Qt = class {
	static create(e) {
		let { type: t, ...n } = e, r = t === "single" ? new Xt(n) : new Zt(n);
		return qt.set(r);
	}
}, $t = class e {
	static create(t) {
		return new e(t, qt.get());
	}
	root;
	opts;
	attachment;
	constructor(e, t) {
		this.root = t, this.opts = e, this.attachment = fe(e.ref, (e) => this.root.valueNode = e), this.setValue = this.setValue.bind(this);
	}
	setValue(e) {
		this.root.isMulti && !Array.isArray(e) || !this.root.isMulti && typeof e != "string" || (this.root.opts.value.current = e);
	}
	#e = W(() => {
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
		U(this.#e, e);
	}
	#t = W(() => ({
		id: this.opts.id.current,
		"data-placeholder": this.root.hasValue ? void 0 : "",
		"data-select-value": "",
		...this.attachment
	}));
	get props() {
		return f(this.#t);
	}
	set props(e) {
		U(this.#t, e);
	}
}, en = class e {
	static create(t) {
		return new e(t, qt.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = fe(e.ref, (e) => this.root.inputNode = e), this.root.domContext = new Me(e.ref), this.onkeydown = this.onkeydown.bind(this), this.oninput = this.oninput.bind(this), Se([() => this.root.opts.value.current, () => this.opts.clearOnDeselect.current], ([e, t], [n]) => {
			t && (Array.isArray(e) && Array.isArray(n) ? e.length === 0 && n.length !== 0 && (this.root.opts.inputValue.current = "") : e === "" && n !== "" && (this.root.opts.inputValue.current = ""));
		});
	}
	onkeydown(e) {
		if (this.root.isUsingKeyboard = !0, e.key !== "Escape") {
			if ((e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault(), !this.root.opts.open.current) {
				if (Ht.includes(e.key) || e.key === "Tab" || e.key === "Backspace" && this.root.opts.inputValue.current === "" || (this.root.handleOpen(), this.root.hasValue)) return;
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
			if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), Gt.includes(e.key)) {
				e.preventDefault();
				let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
				if (e.key === "ArrowDown" ? a = ke(t, r, i) : e.key === "ArrowUp" ? a = we(t, r, i) : e.key === "PageDown" ? a = Ce(t, r, 10, i) : e.key === "PageUp" ? a = Te(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
				this.root.setHighlightedNode(a);
				return;
			}
			Ht.includes(e.key) || this.root.highlightedNode || this.root.setHighlightedToFirstCandidate();
		}
	}
	oninput(e) {
		this.root.opts.inputValue.current = e.currentTarget.value, this.root.setHighlightedToFirstCandidate();
	}
	#e = W(() => ({
		id: this.opts.id.current,
		role: "combobox",
		disabled: this.root.opts.disabled.current ? !0 : void 0,
		"aria-activedescendant": this.root.highlightedId,
		"aria-autocomplete": "list",
		"aria-expanded": ve(this.root.opts.open.current),
		"data-state": he(this.root.opts.open.current),
		"data-disabled": ge(this.root.opts.disabled.current),
		onkeydown: this.onkeydown,
		oninput: this.oninput,
		[this.root.getBitsAttr("input")]: "",
		...this.attachment
	}));
	get props() {
		return f(this.#e);
	}
	set props(e) {
		U(this.#e, e);
	}
}, tn = class e {
	static create(t) {
		return new e(t, qt.get());
	}
	opts;
	root;
	attachment;
	#e;
	#t;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = fe(e.ref, (e) => this.root.triggerNode = e), this.root.domContext = new Me(e.ref), this.#e = new De({
			getCurrentItem: () => this.root.highlightedNode,
			onMatch: (e) => {
				this.root.setHighlightedNode(e);
			},
			getActiveElement: () => this.root.domContext.getActiveElement(),
			getWindow: () => this.root.domContext.getWindow()
		}), this.#t = new Vt({
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
		if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), Gt.includes(e.key)) {
			e.preventDefault();
			let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
			if (e.key === "ArrowDown" ? a = ke(t, r, i) : e.key === "ArrowUp" ? a = we(t, r, i) : e.key === "PageDown" ? a = Ce(t, r, 10, i) : e.key === "PageUp" ? a = Te(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
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
	#a = W(() => ({
		id: this.opts.id.current,
		disabled: this.root.opts.disabled.current ? !0 : void 0,
		"aria-haspopup": "listbox",
		"aria-expanded": ve(this.root.opts.open.current),
		"aria-activedescendant": this.root.highlightedId,
		"data-state": he(this.root.opts.open.current),
		"data-disabled": ge(this.root.opts.disabled.current),
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
		U(this.#a, e);
	}
}, nn = class e {
	static create(t) {
		return Jt.set(new e(t, qt.get()));
	}
	opts;
	root;
	attachment;
	#e = j(!1);
	get isPositioned() {
		return f(this.#e);
	}
	set isPositioned(e) {
		U(this.#e, e, !0);
	}
	domContext;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = fe(e.ref, (e) => this.root.contentNode = e), this.domContext = new Me(this.opts.ref), this.root.domContext === null && (this.root.domContext = this.domContext), le(() => {
			this.root.contentNode = null, this.root.contentIsPositioned = !1, this.isPositioned = !1;
		}), Se(() => this.root.opts.open.current, () => {
			this.root.opts.open.current || (this.root.contentIsPositioned = !1, this.isPositioned = !1);
		}), Se([() => this.isPositioned, () => this.root.highlightedNode], () => {
			!this.isPositioned || !this.root.highlightedNode || this.root.scrollHighlightedNodeIntoView(this.root.highlightedNode);
		}), this.onpointermove = this.onpointermove.bind(this);
	}
	onpointermove(e) {
		this.root.isUsingKeyboard = !1;
	}
	#t = W(() => _t(this.root.isCombobox ? "combobox" : "select"));
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
	#n = W(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return f(this.#n);
	}
	set snippetProps(e) {
		U(this.#n, e);
	}
	#r = W(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-multiselectable": this.root.isMulti ? "true" : void 0,
		"data-state": he(this.root.opts.open.current),
		...be(this.root.contentPresence.transitionStatus),
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
		U(this.#r, e);
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
}, rn = class e {
	static create(t) {
		return new e(t, qt.get());
	}
	opts;
	root;
	attachment;
	#e = W(() => this.root.includesItem(this.opts.value.current));
	get isSelected() {
		return f(this.#e);
	}
	set isSelected(e) {
		U(this.#e, e);
	}
	#t = W(() => this.root.highlightedValue === this.opts.value.current);
	get isHighlighted() {
		return f(this.#t);
	}
	set isHighlighted(e) {
		U(this.#t, e);
	}
	prevHighlighted = new xe(() => this.isHighlighted);
	#n = j(!1);
	get mounted() {
		return f(this.#n);
	}
	set mounted(e) {
		U(this.#n, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = fe(e.ref), Se([() => this.isHighlighted, () => this.prevHighlighted.current], () => {
			this.isHighlighted ? this.opts.onHighlight.current() : this.prevHighlighted.current && this.opts.onUnhighlight.current();
		}), Se(() => this.mounted, () => {
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
	#r = W(() => ({
		selected: this.isSelected,
		highlighted: this.isHighlighted
	}));
	get snippetProps() {
		return f(this.#r);
	}
	set snippetProps(e) {
		U(this.#r, e);
	}
	onpointerdown(e) {
		e.preventDefault();
	}
	onpointerup(e) {
		if (!(e.defaultPrevented || !this.opts.ref.current)) {
			if (e.pointerType === "touch" && !ct) {
				X(this.opts.ref.current, "click", () => {
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
	#i = W(() => ({
		id: this.opts.id.current,
		role: "option",
		"aria-selected": this.root.includesItem(this.opts.value.current) ? "true" : void 0,
		"data-value": this.opts.value.current,
		"data-disabled": ge(this.opts.disabled.current),
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
		U(this.#i, e);
	}
}, an = class e {
	static create(t) {
		return new e(t, qt.get());
	}
	opts;
	root;
	#e = W(() => this.root.opts.name.current !== "");
	get shouldRender() {
		return f(this.#e);
	}
	set shouldRender(e) {
		U(this.#e, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		e.preventDefault(), this.root.isCombobox ? this.root.inputNode?.focus() : this.root.triggerNode?.focus();
	}
	#t = W(() => ({
		disabled: ue(this.root.opts.disabled.current),
		required: ue(this.root.opts.required.current),
		name: this.root.opts.name.current,
		value: this.opts.value.current,
		onfocus: this.onfocus
	}));
	get props() {
		return f(this.#t);
	}
	set props(e) {
		U(this.#t, e);
	}
}, on = class e {
	static create(t) {
		return new e(t, Jt.get());
	}
	opts;
	content;
	root;
	attachment;
	#e = j(0);
	get prevScrollTop() {
		return f(this.#e);
	}
	set prevScrollTop(e) {
		U(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = fe(e.ref, (e) => {
			this.root.viewportNode = e;
		});
	}
	#t = W(() => ({
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
		U(this.#t, e);
	}
}, sn = class {
	opts;
	content;
	root;
	attachment;
	autoScrollTimer = null;
	userScrollTimer = -1;
	isUserScrolling = !1;
	onAutoScroll = rt;
	#e = j(!1);
	get mounted() {
		return f(this.#e);
	}
	set mounted(e) {
		U(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = fe(e.ref), Se([() => this.mounted], () => {
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
	#t = W(() => ({
		id: this.opts.id.current,
		"aria-hidden": me(!0),
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
		U(this.#t, e);
	}
}, cn = class e {
	static create(t) {
		return new e(new sn(t, Jt.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = j(!1);
	get canScrollDown() {
		return f(this.#e);
	}
	set canScrollDown(e) {
		U(this.#e, e, !0);
	}
	scrollIntoViewTimer = null;
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, Se([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), X(this.root.viewportNode, "scroll", () => this.handleScroll());
		}), Se([
			() => this.root.opts.inputValue.current,
			() => this.root.viewportNode,
			() => this.content.isPositioned
		], () => {
			!this.root.viewportNode || !this.content.isPositioned || this.handleScroll(!0);
		}), Se(() => this.scrollButtonState.mounted, () => {
			this.scrollButtonState.mounted && (this.scrollIntoViewTimer && clearTimeout(this.scrollIntoViewTimer), this.scrollIntoViewTimer = ot(5, () => {
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
	#t = W(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-down-button")]: ""
	}));
	get props() {
		return f(this.#t);
	}
	set props(e) {
		U(this.#t, e);
	}
}, ln = class e {
	static create(t) {
		return new e(new sn(t, Jt.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = j(!1);
	get canScrollUp() {
		return f(this.#e);
	}
	set canScrollUp(e) {
		U(this.#e, e, !0);
	}
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, Se([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), X(this.root.viewportNode, "scroll", () => this.handleScroll());
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
	#t = W(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-up-button")]: ""
	}));
	get props() {
		return f(this.#t);
	}
	set props(e) {
		U(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-hidden-input.svelte
function un(e, t) {
	s(t, !0);
	let n = D(t, "value", 15), r = an.create({ value: $(() => n()) });
	var i = F(), a = m(i), o = (e) => {
		Ft(e, K(() => r.props, {
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
	P(a, (e) => {
		r.shouldRender && e(o);
	}), A(e, i), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/combobox/components/combobox.svelte
var dn = q("<!> <!>", 1);
function fn(e, n) {
	s(n, !0);
	let i = D(n, "value", 15), a = D(n, "onValueChange", 3, rt), o = D(n, "name", 3, ""), c = D(n, "disabled", 3, !1), l = D(n, "open", 15, !1), u = D(n, "onOpenChange", 3, rt), d = D(n, "onOpenChangeComplete", 3, rt), p = D(n, "loop", 3, !1), h = D(n, "scrollAlignment", 3, "nearest"), _ = D(n, "required", 3, !1), y = D(n, "items", 19, () => []), b = D(n, "allowDeselect", 3, !0), x = D(n, "inputValue", 7, "");
	i() === void 0 && i(n.type === "single" ? "" : []), Se.pre(() => i(), () => {
		i() === void 0 && i(n.type === "single" ? "" : []);
	});
	let S = Qt.create({
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
	var C = dn(), w = m(C);
	yt(w, {
		children: (e, t) => {
			var r = F();
			g(m(r), () => n.children ?? z), A(e, r);
		},
		$$slots: { default: !0 }
	});
	var T = t(w, 2), E = (e) => {
		var t = F(), n = m(t), i = (e) => {
			var t = F();
			r(m(t), 16, () => S.opts.value.current, (e) => e, (e, t) => {
				un(e, { get value() {
					return t;
				} });
			}), A(e, t);
		};
		P(n, (e) => {
			S.opts.value.current.length && e(i);
		}), A(e, t);
	}, O = W(() => Array.isArray(S.opts.value.current)), k = (e) => {
		un(e, {
			get value() {
				return S.opts.value.current;
			},
			set value(e) {
				S.opts.value.current = e;
			}
		});
	};
	P(T, (e) => {
		f(O) ? e(E) : e(k, -1);
	}), A(e, C), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/combobox/components/combobox-input.svelte
var pn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"defaultValue",
	"clearOnDeselect"
]), mn = q("<input/>");
function hn(e, t) {
	s(t, !0);
	let r = D(t, "id", 19, Ne), i = D(t, "ref", 15, null), a = D(t, "clearOnDeselect", 3, !1), o = V(t, pn), c = en.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e)),
		clearOnDeselect: $(() => a())
	});
	t.defaultValue && (c.root.opts.inputValue.current = t.defaultValue);
	let l = W(() => Ae(o, c.props, { value: c.root.opts.inputValue.current }));
	var u = F();
	n(m(u), () => xt, (e, n) => {
		n(e, {
			get id() {
				return r();
			},
			get ref() {
				return c.opts.ref;
			},
			children: (e, n) => {
				var r = F(), i = m(r), a = (e) => {
					var n = F();
					g(m(n), () => t.child, () => ({ props: f(l) })), A(e, n);
				}, o = (e) => {
					var t = mn();
					C(t, () => ({ ...f(l) }), void 0, void 0, void 0, void 0, !0), A(e, t);
				};
				P(i, (e) => {
					t.child ? e(a) : e(o, -1);
				}), A(e, r);
			},
			$$slots: { default: !0 }
		});
	}), A(e, u), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-content.svelte
var gn = new Set([
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
]), _n = q("<div><div><!></div></div>");
function vn(e, t) {
	let n = R();
	s(t, !0);
	let r = D(t, "id", 19, () => je(n)), i = D(t, "ref", 15, null), a = D(t, "forceMount", 3, !1), o = D(t, "side", 3, "bottom"), c = D(t, "onInteractOutside", 3, rt), l = D(t, "onEscapeKeydown", 3, rt), u = D(t, "preventScroll", 3, !1), d = V(t, gn), p = nn.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e)),
		onInteractOutside: $(() => c()),
		onEscapeKeydown: $(() => l())
	}), _ = W(() => Ae(d, p.props));
	var y = F(), b = m(y), x = (e) => {
		bt(e, K(() => f(_), () => p.popperProps, {
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
				let r = () => n?.().props, i = () => n?.().wrapperProps, a = W(() => Ae(r(), { style: p.props.style }, { style: t.style }));
				var o = F(), s = m(o), c = (e) => {
					var n = F(), r = m(n);
					{
						let e = W(() => ({
							props: f(a),
							wrapperProps: i(),
							...p.snippetProps
						}));
						g(r, () => t.child, () => f(e));
					}
					A(e, n);
				}, l = (e) => {
					var n = _n();
					C(n, () => ({ ...i() }));
					var r = w(n);
					C(r, () => ({ ...f(a) })), g(w(r), () => t.children ?? z), h(r), h(n), A(e, n);
				};
				P(s, (e) => {
					t.child ? e(c) : e(l, -1);
				}), A(e, o);
			},
			$$slots: { popper: !0 }
		}));
	}, S = (e) => {
		vt(e, K(() => f(_), () => p.popperProps, {
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
				let r = () => n?.().props, i = () => n?.().wrapperProps, a = W(() => Ae(r(), { style: p.props.style }, { style: t.style }));
				var o = F(), s = m(o), c = (e) => {
					var n = F(), r = m(n);
					{
						let e = W(() => ({
							props: f(a),
							wrapperProps: i(),
							...p.snippetProps
						}));
						g(r, () => t.child, () => f(e));
					}
					A(e, n);
				}, l = (e) => {
					var n = _n();
					C(n, () => ({ ...i() }));
					var r = w(n);
					C(r, () => ({ ...f(a) })), g(w(r), () => t.children ?? z), h(r), h(n), A(e, n);
				};
				P(s, (e) => {
					t.child ? e(c) : e(l, -1);
				}), A(e, o);
			},
			$$slots: { popper: !0 }
		}));
	};
	P(b, (e) => {
		a() ? e(x) : a() || e(S, 1);
	}), A(e, y), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/mounted.svelte
function yn(e, t) {
	s(t, !0);
	let n = D(t, "mounted", 15, !1), r = D(t, "onMountedChange", 3, rt);
	Ge(() => (n(!0), r()(!0), () => {
		n(!1), r()(!1);
	})), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-item.svelte
var bn = new Set([
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
]), xn = q("<div><!></div>"), Sn = q("<!> <!>", 1);
function Cn(e, n) {
	let r = R();
	s(n, !0);
	let i = D(n, "id", 19, () => je(r)), a = D(n, "ref", 15, null), o = D(n, "label", 19, () => n.value), c = D(n, "disabled", 3, !1), l = D(n, "onHighlight", 3, rt), u = D(n, "onUnhighlight", 3, rt), d = V(n, bn), p = rn.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e)),
		value: $(() => n.value),
		disabled: $(() => c()),
		label: $(() => o()),
		onHighlight: $(() => l()),
		onUnhighlight: $(() => u())
	}), _ = W(() => Ae(d, p.props));
	var y = Sn(), b = m(y), x = (e) => {
		var t = F(), r = m(t);
		{
			let e = W(() => ({
				props: f(_),
				...p.snippetProps
			}));
			g(r, () => n.child, () => f(e));
		}
		A(e, t);
	}, S = (e) => {
		var t = xn();
		C(t, () => ({ ...f(_) })), g(w(t), () => n.children ?? z, () => p.snippetProps), h(t), A(e, t);
	};
	P(b, (e) => {
		n.child ? e(x) : e(S, -1);
	}), yn(t(b, 2), {
		get mounted() {
			return p.mounted;
		},
		set mounted(e) {
			p.mounted = e;
		}
	}), A(e, y), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-viewport.svelte
var wn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), Tn = q("<div><!></div>"), En = {
	hash: "svelte-gsan7o",
	code: "\n	/* Hide scrollbars cross browser and enable momentum scroll for touch devices */[data-select-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport]::-webkit-scrollbar {display:none !important;}[data-select-viewport]::-webkit-scrollbar {display:none !important;}"
};
function Dn(e, t) {
	let n = R();
	s(t, !0), E(e, En);
	let r = D(t, "id", 19, () => je(n)), i = D(t, "ref", 15, null), a = V(t, wn), o = on.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), c = W(() => Ae(a, o.props));
	var l = F(), u = m(l), d = (e) => {
		var n = F();
		g(m(n), () => t.child, () => ({ props: f(c) })), A(e, n);
	}, p = (e) => {
		var n = Tn();
		C(n, () => ({ ...f(c) })), g(w(n), () => t.children ?? z), h(n), A(e, n);
	};
	P(u, (e) => {
		t.child ? e(d) : e(p, -1);
	}), A(e, l), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-scroll-down-button.svelte
var On = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), kn = q("<div><!></div>"), An = q("<!> <!>", 1);
function jn(e, n) {
	let r = R();
	s(n, !0);
	let i = D(n, "id", 19, () => je(r)), a = D(n, "ref", 15, null), o = D(n, "delay", 3, () => 50), c = V(n, On), l = cn.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e)),
		delay: $(() => o())
	}), u = W(() => Ae(c, l.props));
	var d = F(), p = m(d), _ = (e) => {
		var r = An(), i = m(r);
		yn(i, {
			get mounted() {
				return l.scrollButtonState.mounted;
			},
			set mounted(e) {
				l.scrollButtonState.mounted = e;
			}
		});
		var a = t(i, 2), o = (e) => {
			var t = F();
			g(m(t), () => n.child, () => ({ props: c })), A(e, t);
		}, s = (e) => {
			var t = kn();
			C(t, () => ({ ...f(u) })), g(w(t), () => n.children ?? z), h(t), A(e, t);
		};
		P(a, (e) => {
			n.child ? e(o) : e(s, -1);
		}), A(e, r);
	};
	P(p, (e) => {
		l.canScrollDown && e(_);
	}), A(e, d), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-scroll-up-button.svelte
var Mn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), Nn = q("<div><!></div>"), Pn = q("<!> <!>", 1);
function Fn(e, n) {
	let r = R();
	s(n, !0);
	let i = D(n, "id", 19, () => je(r)), a = D(n, "ref", 15, null), o = D(n, "delay", 3, () => 50), c = V(n, Mn), l = ln.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e)),
		delay: $(() => o())
	}), u = W(() => Ae(c, l.props));
	var d = F(), p = m(d), _ = (e) => {
		var r = Pn(), i = m(r);
		yn(i, {
			get mounted() {
				return l.scrollButtonState.mounted;
			},
			set mounted(e) {
				l.scrollButtonState.mounted = e;
			}
		});
		var a = t(i, 2), o = (e) => {
			var t = F();
			g(m(t), () => n.child, () => ({ props: c })), A(e, t);
		}, s = (e) => {
			var t = Nn();
			C(t, () => ({ ...f(u) })), g(w(t), () => n.children ?? z), h(t), A(e, t);
		};
		P(a, (e) => {
			n.child ? e(o) : e(s, -1);
		}), A(e, r);
	};
	P(p, (e) => {
		l.canScrollUp && e(_);
	}), A(e, d), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/label/label.svelte.js
var In = _e({
	component: "label",
	parts: ["root"]
}), Ln = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = fe(this.opts.ref), this.onmousedown = this.onmousedown.bind(this);
	}
	onmousedown(e) {
		e.detail > 1 && e.preventDefault();
	}
	#e = W(() => ({
		id: this.opts.id.current,
		[In.root]: "",
		onmousedown: this.onmousedown,
		...this.attachment
	}));
	get props() {
		return f(this.#e);
	}
	set props(e) {
		U(this.#e, e);
	}
}, Rn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"for"
]), zn = q("<label><!></label>");
function Bn(e, t) {
	let n = R();
	s(t, !0);
	let r = D(t, "id", 19, () => je(n)), i = D(t, "ref", 15, null), a = V(t, Rn), o = Ln.create({
		id: $(() => r()),
		ref: $(() => i(), (e) => i(e))
	}), c = W(() => Ae(a, o.props, { for: t.for }));
	var l = F(), u = m(l), d = (e) => {
		var n = F();
		g(m(n), () => t.child, () => ({ props: f(c) })), A(e, n);
	}, p = (e) => {
		var n = zn();
		C(n, () => ({
			...f(c),
			for: t.for
		})), g(w(n), () => t.children ?? z), h(n), A(e, n);
	};
	P(u, (e) => {
		t.child ? e(d) : e(p, -1);
	}), A(e, l), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select.svelte
var Vn = q("<!> <!>", 1);
function Hn(e, n) {
	s(n, !0);
	let i = D(n, "value", 15), a = D(n, "onValueChange", 3, rt), o = D(n, "name", 3, ""), c = D(n, "disabled", 3, !1), l = D(n, "open", 15, !1), u = D(n, "onOpenChange", 3, rt), d = D(n, "onOpenChangeComplete", 3, rt), p = D(n, "loop", 3, !1), h = D(n, "scrollAlignment", 3, "nearest"), _ = D(n, "required", 3, !1), y = D(n, "items", 19, () => []), b = D(n, "allowDeselect", 3, !1);
	function x() {
		i() === void 0 && i(n.type === "single" ? "" : []);
	}
	x(), Se.pre(() => i(), () => {
		x();
	});
	let S = j(""), C = Qt.create({
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
		inputValue: $(() => f(S), (e) => U(S, e, !0)),
		onOpenChangeComplete: $(() => d())
	});
	var w = Vn(), T = m(w);
	yt(T, {
		children: (e, t) => {
			var r = F();
			g(m(r), () => n.children ?? z), A(e, r);
		},
		$$slots: { default: !0 }
	});
	var E = t(T, 2), O = (e) => {
		var t = F(), i = m(t), a = (e) => {
			un(e, { get autocomplete() {
				return n.autocomplete;
			} });
		}, o = (e) => {
			var t = F();
			r(m(t), 16, () => C.opts.value.current, (e) => e, (e, t) => {
				un(e, {
					get value() {
						return t;
					},
					get autocomplete() {
						return n.autocomplete;
					}
				});
			}), A(e, t);
		};
		P(i, (e) => {
			C.opts.value.current.length === 0 ? e(a) : e(o, -1);
		}), A(e, t);
	}, k = W(() => Array.isArray(C.opts.value.current)), M = (e) => {
		un(e, {
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
	P(E, (e) => {
		f(k) ? e(O) : e(M, -1);
	}), A(e, w), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-value.svelte
var Un = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"placeholder",
	"child",
	"children"
]), Wn = q("<span><!></span>");
function Gn(e, t) {
	let n = R();
	s(t, !0);
	let r = D(t, "ref", 15, null), i = D(t, "id", 19, () => je(n)), a = V(t, Un), o = $t.create({
		id: $(() => i()),
		ref: $(() => r(), (e) => r(e)),
		placeholder: $(() => t.placeholder)
	}), c = W(() => Ae(a, o.props));
	var l = F(), u = m(l), d = (e) => {
		var n = F(), r = m(n);
		{
			let e = W(() => ({
				props: f(c),
				...o.snippetProps
			}));
			g(r, () => t.child, () => f(e));
		}
		A(e, n);
	}, p = (e) => {
		var n = Wn();
		C(n, () => ({ ...f(c) }));
		var r = w(n), i = (e) => {
			var n = F();
			g(m(n), () => t.children ?? z, () => o.snippetProps), A(e, n);
		}, a = (e) => {
			var n = N();
			y(() => H(n, o.snippetProps.selection.selected?.label ?? t.placeholder)), A(e, n);
		}, s = (e) => {
			var n = N();
			y((e) => H(n, e), [() => o.snippetProps.selection.selected.length > 0 ? o.snippetProps.selection.selected.map((e) => e.label).join(", ") : t.placeholder]), A(e, n);
		}, l = (e) => {
			var n = N();
			y(() => H(n, t.placeholder)), A(e, n);
		};
		P(r, (e) => {
			t.children ? e(i) : o.snippetProps.selection.type === "single" ? e(a, 1) : o.snippetProps.selection.type === "multiple" && o.snippetProps.selection.selected ? e(s, 2) : e(l, -1);
		}), h(n), A(e, n);
	};
	P(u, (e) => {
		t.child ? e(d) : e(p, -1);
	}), A(e, l), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/select/components/select-trigger.svelte
var Kn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"type"
]), qn = q("<button><!></button>");
function Jn(e, t) {
	let r = R();
	s(t, !0);
	let i = D(t, "id", 19, () => je(r)), a = D(t, "ref", 15, null), o = D(t, "type", 3, "button"), c = V(t, Kn), l = tn.create({
		id: $(() => i()),
		ref: $(() => a(), (e) => a(e))
	}), u = W(() => Ae(c, l.props, { type: o() }));
	var d = F();
	n(m(d), () => xt, (e, n) => {
		n(e, {
			get id() {
				return i();
			},
			get ref() {
				return l.opts.ref;
			},
			children: (e, n) => {
				var r = F(), i = m(r), a = (e) => {
					var n = F();
					g(m(n), () => t.child, () => ({ props: f(u) })), A(e, n);
				}, o = (e) => {
					var n = qn();
					C(n, () => ({ ...f(u) })), g(w(n), () => t.children ?? z), h(n), A(e, n);
				};
				P(i, (e) => {
					t.child ? e(a) : e(o, -1);
				}), A(e, r);
			},
			$$slots: { default: !0 }
		});
	}), A(e, d), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/switch/switch.svelte.js
var Yn = _e({
	component: "switch",
	parts: ["root", "thumb"]
}), Xn = new ce("Switch.Root"), Zn = class e {
	static create(t) {
		return Xn.set(new e(t));
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = fe(e.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this);
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
	#t = W(() => ({
		"data-disabled": ge(this.opts.disabled.current),
		"data-state": de(this.opts.checked.current),
		"data-required": ge(this.opts.required.current)
	}));
	get sharedProps() {
		return f(this.#t);
	}
	set sharedProps(e) {
		U(this.#t, e);
	}
	#n = W(() => ({ checked: this.opts.checked.current }));
	get snippetProps() {
		return f(this.#n);
	}
	set snippetProps(e) {
		U(this.#n, e);
	}
	#r = W(() => ({
		...this.sharedProps,
		id: this.opts.id.current,
		role: "switch",
		disabled: ue(this.opts.disabled.current),
		"aria-checked": ye(this.opts.checked.current, !1),
		"aria-required": ve(this.opts.required.current),
		[Yn.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return f(this.#r);
	}
	set props(e) {
		U(this.#r, e);
	}
}, Qn = class e {
	static create() {
		return new e(Xn.get());
	}
	root;
	#e = W(() => this.root.opts.name.current !== void 0);
	get shouldRender() {
		return f(this.#e);
	}
	set shouldRender(e) {
		U(this.#e, e);
	}
	constructor(e) {
		this.root = e;
	}
	#t = W(() => ({
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
		U(this.#t, e);
	}
}, $n = class e {
	static create(t) {
		return new e(t, Xn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = fe(e.ref);
	}
	#e = W(() => ({ checked: this.root.opts.checked.current }));
	get snippetProps() {
		return f(this.#e);
	}
	set snippetProps(e) {
		U(this.#e, e);
	}
	#t = W(() => ({
		...this.root.sharedProps,
		id: this.opts.id.current,
		[Yn.thumb]: "",
		...this.attachment
	}));
	get props() {
		return f(this.#t);
	}
	set props(e) {
		U(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/switch/components/switch-input.svelte
function er(e, t) {
	s(t, !1);
	let n = Qn.create();
	L();
	var r = F(), i = m(r), a = (e) => {
		Ft(e, K(() => n.props));
	};
	P(i, (e) => {
		n.shouldRender && e(a);
	}), A(e, r), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/switch/components/switch.svelte
var tr = new Set([
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
]), nr = q("<button><!></button>"), rr = q("<!> <!>", 1);
function ir(e, n) {
	let r = R();
	s(n, !0);
	let i = D(n, "ref", 15, null), a = D(n, "id", 19, () => je(r)), o = D(n, "disabled", 3, !1), c = D(n, "required", 3, !1), l = D(n, "checked", 15, !1), u = D(n, "value", 3, "on"), d = D(n, "name", 3, void 0), p = D(n, "type", 3, "button"), _ = D(n, "onCheckedChange", 3, rt), y = V(n, tr), b = Zn.create({
		checked: $(() => l(), (e) => {
			l(e), _()?.(e);
		}),
		disabled: $(() => o() ?? !1),
		required: $(() => c()),
		value: $(() => u()),
		name: $(() => d()),
		id: $(() => a()),
		ref: $(() => i(), (e) => i(e))
	}), x = W(() => Ae(y, b.props, { type: p() }));
	var S = rr(), T = m(S), E = (e) => {
		var t = F(), r = m(t);
		{
			let e = W(() => ({
				props: f(x),
				...b.snippetProps
			}));
			g(r, () => n.child, () => f(e));
		}
		A(e, t);
	}, O = (e) => {
		var t = nr();
		C(t, () => ({ ...f(x) })), g(w(t), () => n.children ?? z, () => b.snippetProps), h(t), A(e, t);
	};
	P(T, (e) => {
		n.child ? e(E) : e(O, -1);
	}), er(t(T, 2), {}), A(e, S), v();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/switch/components/switch-thumb.svelte
var ar = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"ref",
	"id"
]), or = q("<span><!></span>");
function sr(e, t) {
	let n = R();
	s(t, !0);
	let r = D(t, "ref", 15, null), i = D(t, "id", 19, () => je(n)), a = V(t, ar), o = $n.create({
		id: $(() => i()),
		ref: $(() => r(), (e) => r(e))
	}), c = W(() => Ae(a, o.props));
	var l = F(), u = m(l), d = (e) => {
		var n = F(), r = m(n);
		{
			let e = W(() => ({
				props: f(c),
				...o.snippetProps
			}));
			g(r, () => t.child, () => f(e));
		}
		A(e, n);
	}, p = (e) => {
		var n = or();
		C(n, () => ({ ...f(c) })), g(w(n), () => t.children ?? z, () => o.snippetProps), h(n), A(e, n);
	};
	P(u, (e) => {
		t.child ? e(d) : e(p, -1);
	}), A(e, l), v();
}
//#endregion
//#region ../ui/src/lib/components/input/label.svelte
var cr = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function lr(e, t) {
	s(t, !0);
	let r = V(t, cr);
	var i = F(), a = m(i);
	{
		let e = W(() => Q("text-sm font-medium text-dark-50", t.class));
		n(a, () => Bn, (n, i) => {
			i(n, K({ get children() {
				return t.children;
			} }, () => r, { get class() {
				return f(e);
			} }));
		});
	}
	A(e, i), v();
}
//#endregion
//#region ../ui/src/lib/components/input/input-checkbox.svelte
var ur = q("<div><!> <!></div>"), dr = q("<p class=\"text-sm text-red-400\"> </p>"), fr = q("<div><div class=\"flex items-center gap-2\"><!> <!></div> <!></div>");
function pr(e, r) {
	s(r, !0);
	let i = D(r, "checked", 15, !1), a = D(r, "id", 19, Ne), o = D(r, "inline", 3, !1);
	var c = F(), l = m(c), u = (e) => {
		var o = ur(), s = w(o);
		{
			let e = (e, t) => {
				let n = () => t?.().checked;
				var r = F(), i = m(r), a = (e) => {
					Z(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				P(i, (e) => {
					n() && e(a);
				}), A(e, r);
			}, t = W(() => r.label ? `${a()}-label` : void 0), o = W(() => r.error ? !0 : void 0), c = W(() => Q("peer inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary/15 data-[state=checked]:text-primary", "data-[state=unchecked]:bg-dark-700", r.error ? "border-red-500" : "border-dark-500 data-[state=unchecked]:hover:border-dark-400", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
			n(s, () => Bt, (n, s) => {
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
			lr(e, {
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
					y(() => H(n, r.label)), A(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		P(c, (e) => {
			r.label && e(l);
		}), h(o), y((e) => M(o, 1, e), [() => G(Q("flex items-center gap-2", r.class))]), A(e, o);
	}, d = (e) => {
		var o = fr(), s = w(o), c = w(s);
		{
			let e = (e, t) => {
				let n = () => t?.().checked;
				var r = F(), i = m(r), a = (e) => {
					Z(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				P(i, (e) => {
					n() && e(a);
				}), A(e, r);
			}, t = W(() => r.label ? `${a()}-label` : void 0), o = W(() => r.error ? !0 : void 0), s = W(() => Q("peer inline-flex size-5 shrink-0 items-center justify-center rounded border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-dark-50", "data-[state=unchecked]:bg-dark-700", r.error ? "border-red-500" : "border-dark-500 data-[state=unchecked]:hover:border-dark-400", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
			n(c, () => Bt, (n, c) => {
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
			lr(e, {
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
					y(() => H(n, r.label)), A(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		P(l, (e) => {
			r.label && e(u);
		}), h(s);
		var d = t(s, 2), p = (e) => {
			var t = dr(), n = w(t, !0);
			h(t), y(() => H(n, r.error)), A(e, t);
		};
		P(d, (e) => {
			r.error && e(p);
		}), h(o), y((e) => M(o, 1, e), [() => G(Q("grid gap-2", r.class))]), A(e, o);
	};
	P(l, (e) => {
		o() ? e(u) : e(d, -1);
	}), A(e, c), v();
}
//#endregion
//#region ../ui/src/lib/monaco/configure-types.ts
var mr = {
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
}, hr = "";
async function gr(e = []) {
	let t = e.map((e) => `${e.filePath ?? ""}\0${e.content}`).join("\0");
	if (t === hr) return;
	hr = t;
	let { typescriptDefaults: n } = (await import("./editor.main-xvnWKxZY.js")).languages.typescript;
	n.setCompilerOptions({
		...n.getCompilerOptions(),
		...mr
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
var _r = {
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
function vr(e) {
	return new Worker("/plugin-host/assets/editor.worker-aMaeT3Bg.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/css/css.worker.js?worker
function yr(e) {
	return new Worker("/plugin-host/assets/css.worker-0WoSGFGE.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/html/html.worker.js?worker
function br(e) {
	return new Worker("/plugin-host/assets/html.worker-DVhl5K-g.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/json/json.worker.js?worker
function xr(e) {
	return new Worker("/plugin-host/assets/json.worker-BOHwf62w.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js?worker
function Sr(e) {
	return new Worker("/plugin-host/assets/ts.worker-BptJClIA.js", {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region ../ui/src/lib/monaco/setup.ts
var Cr = !1;
function wr() {
	Cr || typeof globalThis > "u" || (Cr = !0, globalThis.MonacoEnvironment = { getWorker(e, t) {
		switch (t) {
			case "json": return new xr();
			case "css":
			case "scss":
			case "less": return new yr();
			case "html":
			case "handlebars":
			case "razor": return new br();
			case "typescript":
			case "javascript": return new Sr();
			default: return new vr();
		}
	} });
}
//#endregion
//#region ../ui/src/lib/components/variable-popover/variable-popover.svelte
var Tr = q("<p class=\"text-xs font-semibold text-dark-200\"> </p>"), Er = q("<p class=\"py-2 text-xs text-dark-400\"> </p>"), Dr = q("<li><button type=\"button\"><div class=\"flex min-w-0 flex-1 items-center gap-2.5\"><span class=\"shrink-0 rounded border border-primary-300 bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary transition-all duration-150 group-hover:border-primary-500/20 group-hover:bg-primary-500/15\"> </span> <span class=\"min-w-0 truncate text-dark-300 transition-colors duration-150 group-hover:text-dark-100\"> </span></div> <div class=\"flex size-4 shrink-0 items-center justify-center\"><!></div></button></li>"), Or = q("<ul class=\"grid gap-1\"></ul>"), kr = q("<div class=\"mb-3 flex flex-col gap-2\"><!></div> <!>", 1), Ar = q("<!> <!>", 1);
function jr(n, i) {
	s(i, !0);
	let a = D(i, "title", 3, "Variables"), o = D(i, "emptyLabel", 3, "No variables available."), c = D(i, "ariaLabel", 3, "Show variables"), l = D(i, "copiedLabel", 3, "Copied"), u = D(i, "insertedLabel", 3, "Inserted");
	D(i, "noResultsLabel", 3, "No variables match your search.");
	let d = D(i, "icon", 3, "ri:braces-line"), p = j(null);
	function g(e) {
		if (i.onInsert) {
			i.onInsert(e);
			return;
		}
		navigator.clipboard.writeText(`{${e}}`).then(() => {
			U(p, e, !0), setTimeout(() => {
				f(p) === e && U(p, null);
			}, 2e3);
		});
	}
	Ct(n, {
		children: (n, s) => {
			var _ = Ar(), v = m(_);
			wt(v, {
				child: (e, t) => {
					Et(e, K(() => t?.().props, {
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
			}), St(t(v, 2), {
				align: "start",
				class: "w-80 p-4",
				children: (n, s) => {
					var c = kr(), d = m(c), _ = w(d), v = (e) => {
						var t = Tr(), n = w(t, !0);
						h(t), y(() => H(n, a())), A(e, t);
					};
					P(_, (e) => {
						a() && e(v);
					}), h(d);
					var b = t(d, 2), x = (e) => {
						var t = Er(), n = w(t, !0);
						h(t), y(() => H(n, o())), A(e, t);
					}, S = (n) => {
						Tt(n, {
							orientation: "vertical",
							viewportClasses: "max-h-48 overflow-hidden",
							children: (n, a) => {
								var o = Or();
								r(o, 21, () => i.variables, (e) => e.key, (n, r) => {
									var a = Dr(), o = w(a), s = w(o), c = w(s), d = w(c, !0);
									h(c);
									var m = t(c, 2), _ = w(m, !0);
									h(m), h(s);
									var v = t(s, 2), b = w(v), x = (e) => {
										Z(e, {
											icon: "ri:check-line",
											class: "size-3.5 text-success-400"
										});
									}, S = (e) => {
										{
											let t = W(() => i.onInsert ? "ri:corner-down-left-line" : "ri:file-copy-line");
											Z(e, {
												get icon() {
													return f(t);
												},
												class: "size-3.5 text-dark-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
											});
										}
									};
									P(b, (e) => {
										f(p) === f(r).key ? e(x) : e(S, -1);
									}), h(v), h(o), h(a), y((t) => {
										M(o, 1, t), e(o, "title", i.onInsert ? u() : l()), H(d, `{${f(r).key}}`), H(_, f(r).label);
									}, [() => G(Q("group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-transparent px-2.5 py-2 text-left text-xs transition-all duration-150 hover:border-dark-600/30 hover:bg-dark-700/50"))]), ee("click", o, () => g(f(r).key)), A(n, a);
								}), h(o), A(n, o);
							},
							$$slots: { default: !0 }
						});
					};
					P(b, (e) => {
						i.variables.length === 0 ? e(x) : e(S, -1);
					}), A(n, c);
				},
				$$slots: { default: !0 }
			}), A(n, _);
		},
		$$slots: { default: !0 }
	}), v();
}
Y(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-code.svelte
var Mr = q("<span></span>"), Nr = q("<div class=\"flex items-center justify-between gap-2\"><!> <div class=\"flex items-center gap-1\"><!> <!> <!></div></div>"), Pr = q("<div class=\"flex justify-end\"><!></div>"), Fr = q("<div class=\"absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-dark-900/85\" role=\"status\" aria-live=\"polite\"><!> <p class=\"text-xs text-dark-300\"> </p></div>"), Ir = q("<p class=\"text-sm text-red-400\"> </p>"), Lr = q("<div><!> <!> <div role=\"textbox\" aria-multiline=\"true\"><!></div> <!></div>");
function Rr(n, r) {
	s(r, !0);
	let a = D(r, "id", 19, Ne), c = D(r, "value", 3, ""), l = D(r, "language", 3, "typescript"), u = D(r, "minHeight", 3, "12rem"), d = D(r, "fillHeight", 3, !1), p = D(r, "formatOnBlur", 3, !0), m = D(r, "showFormatButton", 3, !0), _ = D(r, "formatLabel", 3, "Format"), C = D(r, "showExpandButton", 3, !0), E = D(r, "expandLabel", 3, "Expand"), O = D(r, "collapseLabel", 3, "Close"), F = D(r, "extraLibs", 19, () => []), I = D(r, "loadingLabel", 3, "Loading..."), L = D(r, "variables", 19, () => []), R = D(r, "variablesTitle", 3, "Variables"), z = D(r, "variablesAriaLabel", 3, "Insert variable"), B = j(!1), V = W(() => d() || f(B)), K = j(void 0), q = j(void 0), Y = j(void 0), X = j(!1), ee = !1, te = !1, ne = j("");
	function re(e) {
		return e.map((e) => `${e.filePath ?? ""}\0${e.content}`).join("\0");
	}
	function ie(e) {
		r.oninput && r.oninput({ currentTarget: { value: e } });
	}
	function ae(e) {
		let t = `{${e}}`;
		if (!f(q) || !f(Y)) {
			ie(`${c()}${t}`);
			return;
		}
		let n = f(q).getSelection();
		if (!n) {
			ie(`${c()}${t}`);
			return;
		}
		f(q).executeEdits("insert-variable", [{
			range: n,
			text: t,
			forceMoveMarkers: !0
		}]), f(q).focus();
	}
	async function oe() {
		if (!f(K)) return;
		wr();
		let e = await import("./editor.main-xvnWKxZY.js");
		ee || !f(K) || (U(Y, e, !0), f(Y).editor.defineTheme("stream-kit-dark", _r), await gr(F()), U(ne, re(F()), !0), U(q, f(Y).editor.create(f(K), {
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
		}), !0), r.placeholder && f(q).onDidFocusEditorText(() => {
			f(q)?.getValue() === "" && r.placeholder;
		}), f(q).onDidChangeModelContent(() => {
			te || !f(q) || ie(f(q).getValue());
		}), p() && f(q).onDidBlurEditorText(() => {
			ce();
		}), U(X, !0));
	}
	function se(e) {
		if (!f(q)) return;
		let t = f(q).getModel();
		!t || t.getValue() === e || (f(q).pushUndoStop(), f(q).executeEdits("format", [{
			range: t.getFullModelRange(),
			text: e,
			forceMoveMarkers: !0
		}]), f(q).pushUndoStop());
	}
	async function ce() {
		if (!f(q)) return;
		let e = f(q).getValue();
		if (e.trim() !== "") {
			if (l() === "json") {
				try {
					se(JSON.stringify(JSON.parse(e), null, 2));
				} catch {}
				return;
			}
			try {
				await f(q).getAction("editor.action.formatDocument")?.run();
			} catch {}
		}
	}
	x(() => {
		oe();
	}), o(() => {
		if (!f(q) || !f(X)) return;
		let e = c() ?? "";
		f(q).getValue() !== e && (te = !0, f(q).pushUndoStop(), f(q).executeEdits("external-sync", [{
			range: f(q).getModel()?.getFullModelRange() ?? {
				startLineNumber: 1,
				startColumn: 1,
				endLineNumber: 1,
				endColumn: 1
			},
			text: e,
			forceMoveMarkers: !0
		}]), f(q).pushUndoStop(), te = !1);
	}), o(() => {
		if (f(B), !f(q)) return;
		let e = requestAnimationFrame(() => f(q)?.layout());
		return () => cancelAnimationFrame(e);
	}), o(() => {
		if (!f(X)) return;
		let e = re(F());
		e !== f(ne) && (U(ne, e, !0), gr(F()));
	}), S(() => {
		ee = !0, f(q)?.dispose(), U(q, void 0), U(Y, void 0);
	});
	var $ = Lr();
	k("keydown", b, (e) => {
		f(B) && e.key === "Escape" && U(B, !1);
	});
	var le = w($), ue = (e) => {
		var n = Nr(), i = w(n), o = (e) => {
			lr(e, {
				get for() {
					return a();
				},
				children: (e, t) => {
					T();
					var n = N();
					y(() => H(n, r.label)), A(e, n);
				},
				$$slots: { default: !0 }
			});
		}, s = (e) => {
			A(e, Mr());
		};
		P(i, (e) => {
			r.label ? e(o) : e(s, -1);
		});
		var c = t(i, 2), l = w(c), u = (e) => {
			Et(e, {
				type: "button",
				variant: "ghost",
				size: "xs",
				icon: "ri:magic-line",
				onclick: () => void ce(),
				class: "text-dark-400 hover:text-dark-100",
				children: (e, t) => {
					T();
					var n = N();
					y(() => H(n, _())), A(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		P(l, (e) => {
			m() && e(u);
		});
		var d = t(l, 2), p = (e) => {
			{
				let t = W(() => f(B) ? "ri:fullscreen-exit-line" : "ri:fullscreen-line"), n = W(() => f(B) ? O() : E());
				Et(e, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					get icon() {
						return f(t);
					},
					get "aria-label"() {
						return f(n);
					},
					onclick: () => U(B, !f(B)),
					class: "size-7 text-dark-400 hover:text-dark-100"
				});
			}
		};
		P(d, (e) => {
			C() && e(p);
		});
		var g = t(d, 2), v = (e) => {
			jr(e, {
				get variables() {
					return L();
				},
				get title() {
					return R();
				},
				get ariaLabel() {
					return z();
				},
				onInsert: ae
			});
		};
		P(g, (e) => {
			L().length > 0 && e(v);
		}), h(c), h(n), A(e, n);
	};
	P(le, (e) => {
		(r.label || L().length > 0 || m() || C()) && e(ue);
	});
	var de = t(le, 2), fe = (e) => {
		var t = Pr();
		g(w(t), () => r.toolbar), h(t), A(e, t);
	};
	P(de, (e) => {
		r.toolbar && e(fe);
	});
	var pe = t(de, 2);
	let me;
	var he = w(pe), ge = (n) => {
		var r = Fr(), i = w(r);
		Z(i, {
			icon: "gg:spinner",
			class: "size-5 animate-spin text-primary",
			"aria-hidden": "true"
		});
		var a = t(i, 2), o = w(a, !0);
		h(a), h(r), y(() => {
			e(r, "aria-label", I()), H(o, I());
		}), A(n, r);
	};
	P(he, (e) => {
		f(X) || e(ge);
	}), h(pe), i(pe, (e) => U(K, e), () => f(K));
	var _e = t(pe, 2), ve = (e) => {
		var t = Ir(), n = w(t, !0);
		h(t), y(() => H(n, r.error)), A(e, t);
	};
	P(_e, (e) => {
		r.error && e(ve);
	}), h($), y((t, n) => {
		M($, 1, t), e(pe, "id", a()), e(pe, "aria-busy", !f(X)), e(pe, "aria-invalid", r.error ? !0 : void 0), e(pe, "aria-placeholder", r.placeholder), M(pe, 1, n), me = J(pe, "", me, { height: f(V) ? void 0 : u() });
	}, [() => G(Q("relative flex w-full flex-col", f(B) ? "fixed inset-0 z-60 gap-3 bg-dark-900 p-4" : d() ? "h-full min-h-0 flex-1" : "grid gap-2")), () => G(Q("relative overflow-hidden rounded-lg border bg-dark-900 focus-within:ring-2", f(V) ? "flex min-h-0 flex-1 flex-col" : "", r.error ? "border-red-500 focus-within:ring-red-500" : "border-dark-600 focus-within:ring-primary", r.class))]), A(n, $), v();
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/internal/configurable-globals.js
var zr = typeof window < "u" ? window : void 0;
typeof window < "u" && window.document, typeof window < "u" && window.navigator, typeof window < "u" && window.location;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/internal/utils/dom.js
function Br(e) {
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
		let { window: t = zr, document: n = t?.document } = e;
		t !== void 0 && (this.#e = n, this.#t = _((e) => {
			let n = X(t, "focusin", e), r = X(t, "focusout", e);
			return () => {
				n(), r();
			};
		}));
	}
	get current() {
		return this.#t?.(), this.#e ? Br(this.#e) : null;
	}
}();
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/internal/utils/is.js
function Vr(e) {
	return typeof e == "function";
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/utilities/extract/extract.svelte.js
function Hr(e, t) {
	if (Vr(e)) {
		let n = e();
		return n === void 0 ? t : n;
	}
	return e === void 0 ? t : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/utilities/use-debounce/use-debounce.svelte.js
function Ur(e, t) {
	let n = j(null), r = W(() => Hr(t, 250));
	function i(...t) {
		if (f(n)) f(n).timeout && clearTimeout(f(n).timeout);
		else {
			let e, t;
			U(n, {
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
			U(n, null);
			try {
				r.resolve(await e.apply(this, t));
			} catch (e) {
				r.reject(e);
			}
		}, f(n).timeout = setTimeout(f(n).runner, f(r)), f(n).promise;
	}
	return i.cancel = async () => {
		(!f(n) || f(n).timeout === null) && (await new Promise((e) => setTimeout(e, 0)), !f(n) || f(n).timeout === null) || (clearTimeout(f(n).timeout), f(n).reject("Cancelled"), U(n, null));
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
function Wr(e, t) {
	switch (e) {
		case "post":
			o(t);
			break;
		case "pre":
			l(t);
			break;
	}
}
function Gr(e, t, n, r = {}) {
	let { lazy: i = !1 } = r, a = !i, o = Array.isArray(e) ? [] : void 0;
	Wr(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!a) {
			a = !0, o = t;
			return;
		}
		let r = d(() => n(t, o));
		return o = t, r;
	});
}
function Kr(e, t, n) {
	let r = te(() => {
		let i = !1;
		Gr(e, t, (e, t) => {
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
function qr(e, t, n) {
	Gr(e, "post", t, n);
}
function Jr(e, t, n) {
	Gr(e, "pre", t, n);
}
qr.pre = Jr;
function Yr(e, t) {
	Kr(e, "post", t);
}
function Xr(e, t) {
	Kr(e, "pre", t);
}
Yr.pre = Xr;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/internal/utils/function.js
function Zr() {}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/utilities/debounced/debounced.svelte.js
var Qr = class {
	#e = j();
	#t;
	constructor(e, t = 250) {
		U(this.#e, e(), !0), this.cancel = this.cancel.bind(this), this.setImmediately = this.setImmediately.bind(this), this.updateImmediately = this.updateImmediately.bind(this), this.#t = Ur(() => {
			U(this.#e, e(), !0);
		}, t), qr(e, () => {
			this.#t().catch(Zr);
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
		this.cancel(), U(this.#e, e, !0);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fdf5ec64c8e2df8043496e447a306d47/node_modules/runed/dist/utilities/resource/resource.svelte.js
function $r(e, t) {
	let n, r = null;
	return (...i) => new Promise((a) => {
		r && r(void 0), r = a, clearTimeout(n), n = setTimeout(async () => {
			let t = await e(...i);
			r &&= (r(t), null);
		}, t);
	});
}
function ei(e, t) {
	let n = 0, r = null;
	return (...i) => {
		let a = Date.now();
		return n && a - n < t ? r ?? Promise.resolve(void 0) : (n = a, r = e(...i), r);
	};
}
function ti(e, t, n = {}, r) {
	let { lazy: i = !1, once: a = !1, initialValue: o, debounce: s, throttle: c } = n, l = j(B(o)), u = j(B(o === void 0 && !i)), d = j(void 0), p = j(B([])), m = () => {
		f(p).forEach((e) => e()), U(p, [], !0);
	}, h = (e) => {
		U(p, [...f(p), e], !0);
	}, g = async (e, n, r = !1) => {
		try {
			U(u, !0), U(d, void 0), m();
			let i = new AbortController();
			h(() => i.abort());
			let a = await t(e, n, {
				data: f(l),
				refetching: r,
				onCleanup: h,
				signal: i.signal
			});
			return U(l, a, !0), a;
		} catch (e) {
			e instanceof DOMException && e.name === "AbortError" || U(d, e, !0);
			return;
		} finally {
			U(u, !1);
		}
	}, _ = s ? $r(g, s) : c ? ei(g, c) : g, v = Array.isArray(e) ? e : [e], y;
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
			U(l, e, !0);
		},
		refetch: (t) => {
			let n = v.map((e) => e());
			return _(Array.isArray(e) ? n : n[0], Array.isArray(e) ? n : n[0], t ?? !0);
		}
	};
}
function ni(e, t, n) {
	return ti(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		qr(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
function ri(e, t, n) {
	return ti(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		qr.pre(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
ni.pre = ri;
//#endregion
//#region ../ui/src/lib/components/input/resolve-select-items.svelte.ts
function ii(e, t) {
	let n = j(B([])), r = j(!1), i = j(0), a = W(() => {
		let t = e();
		return typeof t == "function" ? (f(i), f(n)) : t;
	}), s = W(() => typeof e() == "function" ? (f(i), f(r)) : !1);
	return o(() => {
		t && t();
		let a = e();
		if (typeof a != "function") return;
		U(r, !0);
		let o = !1;
		return Promise.resolve(a()).then((e) => {
			o || (U(n, e, !0), U(r, !1), I(i));
		}, () => {
			o || (U(n, [], !0), U(r, !1), I(i));
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
function ai(e, t) {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => e.label.toLowerCase().includes(n) || e.value.toLowerCase().includes(n)) : e;
}
function oi(e, t, n = 200, r = 36, i = 6) {
	let a = e.length * r, o = Math.max(0, Math.floor(t / r) - i), s = Math.ceil(n / r) + i * 2, c = Math.min(e.length, o + s);
	return {
		items: e.slice(o, c),
		startIndex: o,
		totalHeight: a,
		offsetY: o * r
	};
}
function si(e) {
	return e > 50;
}
function ci(e, t = 36) {
	return Math.max(0, e * t);
}
//#endregion
//#region ../ui/src/lib/components/input/input-select.svelte
var li = q("<span class=\"text-red-400\">*</span>"), ui = q(" <!>", 1), di = q("<span class=\"grid h-full min-w-10 place-items-center rounded-l-xl border border-r-0 border-dark-700 text-dark-50\"><!></span>"), fi = q("<!> <!>", 1), pi = q("<!> <!> <!>", 1), mi = q("<div><button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\" class=\"flex w-full min-w-0 cursor-pointer items-center outline-none disabled:cursor-not-allowed disabled:opacity-50\"><!> <span><span> </span> <!></span></button></div> <!>", 1), hi = q("<p class=\"text-sm text-red-400\"> </p>"), gi = q("<div><!> <!> <!></div>");
function _i(i, a) {
	s(a, !0);
	let o = D(a, "searchable", 3, "auto"), c = D(a, "dialogTitle", 3, "Select option"), l = D(a, "dialogDescription", 3, "Search and select an option from the list."), d = D(a, "id", 19, Ne), p = D(a, "required", 3, !1), g = D(a, "type", 3, "single"), _ = D(a, "value", 15), b = W(() => a.placeholder ?? "Select an option"), x = W(() => a.loadingPlaceholder ?? "Loading..."), S = W(() => a.searchPlaceholder ?? "Search values"), C = W(() => a.noResultsLabel ?? "No matches found"), E = j(!1), O = j(""), k = Ne(), I = Ne(), L = ii(() => a.items, () => a.reloadKey?.()), R = W(() => a.disabled ?? !1), z = W(() => g() === "multiple"), B = W(() => o() === !0 ? !0 : o() === !1 ? !1 : L.items.length >= 8), V = W(() => {
		if (L.loading) return f(x);
		if (f(z)) {
			let e = _();
			if (e.length === 0) return f(b);
			let t = e.map((e) => L.items.find((t) => t.value === e)?.label).filter(Boolean);
			return t.length > 0 ? t.join(", ") : f(b);
		}
		let e = _();
		return e ? L.items.find((t) => t.value === e)?.label ?? e : f(b);
	}), q = W(() => f(z) ? _().length > 0 : !!_());
	function J(e) {
		U(E, e, !0), e || U(O, "");
	}
	function Y(e) {
		return f(z) ? _().includes(e) : _() === e;
	}
	function X(e) {
		if (!e.disabled) {
			if (f(z)) {
				let t = [..._()], n = t.indexOf(e.value);
				n >= 0 ? t.splice(n, 1) : t.push(e.value), _(t), a.onValueChange?.(t);
				return;
			}
			_(e.value), a.onValueChange?.(e.value), U(E, !1);
		}
	}
	function te() {
		f(R) || U(E, !0);
	}
	async function ne(e) {
		a.dialogProps?.onOpenAutoFocus?.(e), !(e.defaultPrevented || !f(B)) && (e.preventDefault(), await u(), document.getElementById(I)?.focus());
	}
	function re(e) {
		a.dialogProps?.onCloseAutoFocus?.(e), !e.defaultPrevented && e.preventDefault();
	}
	var ie = gi(), ae = w(ie), oe = (e) => {
		lr(e, {
			get for() {
				return d();
			},
			children: (e, n) => {
				T();
				var r = ui(), i = m(r), o = t(i), s = (e) => {
					A(e, li());
				};
				P(o, (e) => {
					p() && e(s);
				}), y(() => H(i, `${a.label ?? ""} `)), A(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	P(ae, (e) => {
		a.label && e(oe);
	});
	var se = t(ae, 2);
	n(se, () => ft, (i, o) => {
		o(i, {
			onOpenChange: J,
			get open() {
				return f(E);
			},
			set open(e) {
				U(E, e, !0);
			},
			children: (i, o) => {
				var s = mi(), u = m(s), p = w(u), g = w(p), _ = (e) => {
					var t = di();
					Z(w(t), {
						get icon() {
							return a.prependIcon;
						},
						class: "size-6"
					}), h(t), A(e, t);
				};
				P(g, (e) => {
					a.prependIcon && e(_);
				});
				var v = t(g, 2), b = w(v), D = w(b, !0);
				h(b), Z(t(b, 2), {
					icon: "ri:expand-up-down-line",
					class: "size-5 shrink-0 text-dark-300"
				}), h(v), h(p), h(u), n(t(u, 2), () => mt, (e, i) => {
					i(e, {
						children: (e, i) => {
							var o = fi(), s = m(o);
							n(s, () => ht, (e, t) => {
								t(e, { class: "data-nested:hidden z-60 bg-black/60" });
							});
							var u = t(s, 2);
							{
								let e = W(() => a.dialogProps?.trapFocus ?? !1), i = W(() => a.dialogProps?.preventScroll ?? !1), o = W(() => Q("z-60", a.dialogProps?.class));
								n(u, () => dt, (s, u) => {
									u(s, K(() => a.dialogProps, {
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
											var o = pi(), s = m(o);
											n(s, () => ut, (e, t) => {
												t(e, {
													class: "sr-only",
													children: (e, t) => {
														T();
														var n = N();
														y(() => H(n, c())), A(e, n);
													},
													$$slots: { default: !0 }
												});
											});
											var u = t(s, 2);
											n(u, () => pt, (e, t) => {
												t(e, {
													class: "sr-only",
													children: (e, t) => {
														T();
														var n = N();
														y(() => H(n, l())), A(e, n);
													},
													$$slots: { default: !0 }
												});
											});
											var d = t(u, 2);
											{
												let e = W(() => !L.loading), i = W(() => Q(a.commandProps?.class));
												n(d, () => Ve, (o, s) => {
													s(o, K(() => a.commandProps, {
														get shouldFilter() {
															return f(e);
														},
														get class() {
															return f(i);
														},
														children: (e, i) => {
															var a = fi(), o = m(a), s = (e) => {
																var t = F();
																n(m(t), () => We, (e, t) => {
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
																			U(O, e, !0);
																		}
																	});
																}), A(e, t);
															};
															P(o, (e) => {
																f(B) && e(s);
															}), n(t(o, 2), () => Fe, (e, i) => {
																i(e, {
																	get id() {
																		return k;
																	},
																	class: "mt-2",
																	children: (e, i) => {
																		var a = F();
																		n(m(a), () => Pe, (e, i) => {
																			i(e, {
																				children: (e, i) => {
																					var a = F(), o = m(a), s = (e) => {
																						var t = F();
																						n(m(t), () => Ue, (e, t) => {
																							t(e, {
																								children: (e, t) => {
																									T();
																									var n = N();
																									y(() => H(n, f(x))), A(e, n);
																								},
																								$$slots: { default: !0 }
																							});
																						}), A(e, t);
																					}, c = (e) => {
																						var i = fi(), a = m(i);
																						n(a, () => Be, (e, t) => {
																							t(e, {
																								children: (e, t) => {
																									T();
																									var n = N();
																									y(() => H(n, f(C))), A(e, n);
																								},
																								$$slots: { default: !0 }
																							});
																						}), r(t(a, 2), 17, () => L.items, (e) => e.value, (e, r) => {
																							var i = F(), a = m(i);
																							{
																								let e = W(() => [f(r).label, f(r).value]);
																								n(a, () => ze, (n, i) => {
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
																										onSelect: () => X(f(r)),
																										children: (e, n) => {
																											T();
																											var i = ui(), a = m(i), o = t(a), s = (e) => {
																												Z(e, {
																													icon: "ri:check-line",
																													class: "size-5 text-primary"
																												});
																											}, c = W(() => Y(f(r).value));
																											P(o, (e) => {
																												f(c) && e(s);
																											}), y(() => H(a, `${f(r).label ?? ""} `)), A(e, i);
																										},
																										$$slots: { default: !0 }
																									});
																								});
																							}
																							A(e, i);
																						}), A(e, i);
																					};
																					P(o, (e) => {
																						L.loading ? e(s) : e(c, -1);
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
				}), y((t, n, r) => {
					M(u, 1, t), e(p, "id", d()), e(p, "aria-expanded", f(E)), e(p, "aria-controls", f(E) ? k : void 0), p.disabled = f(R), M(v, 1, n), M(b, 1, r), H(D, f(V));
				}, [
					() => G(Q("relative flex w-full min-w-0 items-center rounded-xl", "has-focus:ring-2 has-focus:ring-primary", a.error && "has-focus:ring-red-500")),
					() => G(Q("flex w-full items-center justify-between gap-2 border bg-dark-700 text-dark-50 outline-none", He.md, a.error ? "border-red-500" : "border-dark-500", {
						"rounded-l-none rounded-r-xl border-l-0": a.prependIcon,
						"rounded-xl": !a.prependIcon
					})),
					() => G(Q("min-w-0 flex-1 truncate text-left", !f(q) && "text-dark-300"))
				]), ee("click", p, te), A(i, s);
			},
			$$slots: { default: !0 }
		});
	});
	var ce = t(se, 2), $ = (e) => {
		var t = hi(), n = w(t, !0);
		h(t), y(() => H(n, a.error)), A(e, t);
	};
	P(ce, (e) => {
		a.error && e($);
	}), h(ie), y((e) => M(ie, 1, e), [() => G(Q("relative grid w-full min-w-0 gap-2", a.class))]), A(i, ie), v();
}
Y(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/cron-expression-editor.svelte
var vi = q("<div><p class=\"text-[10px] font-semibold tracking-[0.14em] text-dark-400 uppercase\"> </p> <p> </p></div>"), yi = q("<span><!> </span>"), bi = q("<p class=\"text-xs text-dark-200\"><span class=\"text-dark-400\"> </span> <span class=\"font-medium text-primary-100\"> </span></p>"), xi = q("<div class=\"overflow-hidden rounded-xl border border-dark-600 bg-dark-800/40 transition-all duration-200 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20\"><div class=\"grid grid-cols-5 border-b border-dark-600/80 bg-dark-900/40 px-2 py-1.5\"></div> <div class=\"relative flex items-center gap-2 px-3 py-2\"><!> <input autocomplete=\"off\"/> <!></div> <div class=\"flex flex-wrap items-center justify-between gap-2 border-t border-dark-600/80 bg-dark-900/30 px-3 py-2\"><div class=\"min-w-40 max-w-xs flex-1\"><!></div> <!></div></div>");
function Si(n, i) {
	s(i, !0);
	let a = D(i, "value", 3, ""), o = D(i, "placeholder", 3, "0 9 * * 1-5"), c = D(i, "presets", 3, re), l = D(i, "validLabel", 3, "Valid expression"), u = D(i, "invalidLabel", 3, "Invalid cron expression"), d = D(i, "nextRunLabel", 3, "Next run"), m = D(i, "presetsPlaceholder", 3, "Presets"), g = Ne(), _ = new Qr(() => a(), 250), b = W(() => ({
		minute: i.fieldLabels?.minute ?? "Minute",
		hour: i.fieldLabels?.hour ?? "Hour",
		day: i.fieldLabels?.day ?? "Day",
		month: i.fieldLabels?.month ?? "Month",
		weekday: i.fieldLabels?.weekday ?? "Weekday"
	})), x = W(() => oe(a())), S = W(() => ie(_.current)), C = W(() => ne(f(S))), T = W(() => !!f(S) && !f(C)), E = W(() => f(C) === "Invalid cron expression" ? u() : f(C)), k = W(() => f(T) ? ae(f(S)) : void 0), j = W(() => c().map((e) => ({
		value: e.value,
		label: e.label
	}))), N = {
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
	var L = xi(), R = w(L);
	r(R, 22, () => se, (e) => e, (e, n, r) => {
		var i = vi(), a = w(i), o = w(a, !0);
		h(a);
		var s = t(a, 2), c = w(s, !0);
		h(s), h(i), y((e, t) => {
			M(i, 1, e), H(o, f(b)[n]), M(s, 1, t), H(c, f(x)[f(r)] || "—");
		}, [() => G(Q("px-1 text-center", f(r) < 4 && "border-r border-dark-700/50")), () => G(Q("mt-0.5 truncate font-mono text-xs", N[n]))]), A(e, i);
	}), h(R);
	var z = t(R, 2), B = w(z);
	Z(B, {
		icon: "ri:time-line",
		class: "size-5 shrink-0 text-dark-400"
	});
	var V = t(B, 2);
	p(V), e(V, "spellcheck", !1);
	var U = t(V, 2), K = (e) => {
		var n = yi(), r = w(n);
		{
			let e = W(() => f(T) ? "ri:check-line" : "ri:alert-line");
			Z(r, {
				get icon() {
					return f(e);
				},
				class: "size-4"
			});
		}
		var i = t(r);
		h(n), y((e) => {
			M(n, 1, e), H(i, ` ${(f(T) ? l() : f(E)) ?? ""}`);
		}, [() => G(Q("inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium", f(T) ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"))]), A(e, n);
	};
	P(U, (e) => {
		f(S) && e(K);
	}), h(z);
	var q = t(z, 2), J = w(q), Y = w(J), X = () => "", te = (e) => {
		e && I(e);
	};
	_i(Y, {
		type: "single",
		get placeholder() {
			return m();
		},
		get items() {
			return f(j);
		},
		get value() {
			return X();
		},
		set value(e) {
			te(e);
		}
	}), h(J);
	var ce = t(J, 2), $ = (e) => {
		var n = bi(), r = w(n), i = w(r);
		h(r);
		var a = t(r, 2), o = w(a, !0);
		h(a), h(n), y(() => {
			H(i, `${d() ?? ""}:`), H(o, f(k));
		}), A(e, n);
	};
	P(ce, (e) => {
		f(k) && e($);
	}), h(q), h(L), y((t) => {
		e(V, "id", g), M(V, 1, t), e(V, "placeholder", o()), V.required = i.required, O(V, a() ?? "");
	}, [() => G(Q("min-w-0 flex-1 border-0 bg-transparent font-mono text-sm text-dark-50 outline-none", He.md, "px-0 py-0"))]), ee("input", V, F), A(n, L), v();
}
Y(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-cron-expression.svelte
var Ci = q("<button><!> <span> </span> <!> <!></button>"), wi = q("<p class=\"mb-3 text-xs font-semibold tracking-wide text-dark-200 uppercase\"> </p> <!>", 1), Ti = q("<!> <!>", 1), Ei = q("<p class=\"text-sm text-red-400\"> </p>"), Di = q("<div><!> <!> <!></div>");
function Oi(e, n) {
	s(n, !0);
	let r = D(n, "id", 19, Ne), i = D(n, "value", 3, ""), a = D(n, "placeholder", 3, "0 9 * * 1-5"), o = D(n, "validLabel", 3, "Valid expression"), c = D(n, "invalidLabel", 3, "Invalid cron expression"), l = D(n, "nextRunLabel", 3, "Next run"), u = D(n, "presetsPlaceholder", 3, "Presets"), d = D(n, "editorTitle", 3, "Cron expression"), p = D(n, "emptyLabel", 3, "Configure cron expression"), g = D(n, "editAriaLabel", 3, "Edit cron expression"), _ = j(!1), b = W(() => ie(i())), x = W(() => ne(f(b))), S = W(() => !!f(b) && !f(x)), E = W(() => f(b) || p()), O = W(() => !f(b));
	var k = Di(), F = w(k), I = (e) => {
		lr(e, {
			get for() {
				return r();
			},
			children: (e, t) => {
				T();
				var r = N();
				y(() => H(r, n.label)), A(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	P(F, (e) => {
		n.label && e(I);
	});
	var L = t(F, 2);
	Ct(L, {
		get open() {
			return f(_);
		},
		set open(e) {
			U(_, e, !0);
		},
		children: (e, s) => {
			var p = Ti(), v = m(p);
			wt(v, {
				child: (e, i) => {
					let a = () => i?.().props;
					var o = Ci();
					C(o, (e) => ({
						id: r(),
						type: "button",
						...a(),
						"aria-label": g(),
						class: e
					}), [() => Q("flex w-full items-center gap-2 rounded-xl border bg-dark-700 text-left outline-none transition-all", He.md, "focus-visible:ring-2", n.error ? "border-red-500 focus-visible:border-red-500/50 focus-visible:ring-red-500" : "border-dark-500 focus-visible:border-primary/50 focus-visible:ring-primary")]);
					var s = w(o);
					Z(s, {
						icon: "ri:time-line",
						class: "size-5 shrink-0 text-dark-400"
					});
					var c = t(s, 2), l = w(c, !0);
					h(c);
					var u = t(c, 2), d = (e) => {
						{
							let t = W(() => f(S) ? "ri:check-line" : "ri:alert-line"), n = W(() => Q("size-5 shrink-0", f(S) ? "text-green-400" : "text-amber-400"));
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
					P(u, (e) => {
						f(b) && e(d);
					});
					var p = t(u, 2);
					{
						let e = W(() => Q("size-5 shrink-0 text-dark-300 transition-transform", f(_) && "rotate-180"));
						Z(p, {
							icon: "ri:arrow-down-s-line",
							get class() {
								return f(e);
							}
						});
					}
					h(o), y((e) => {
						M(c, 1, e), H(l, f(E));
					}, [() => G(Q("min-w-0 flex-1 truncate text-sm", f(O) ? "font-sans text-dark-300" : "font-mono text-dark-50"))]), A(e, o);
				},
				$$slots: { child: !0 }
			}), St(t(v, 2), {
				align: "start",
				class: "w-[min(28rem,calc(100vw-2rem))] p-3",
				children: (e, r) => {
					var s = wi(), f = m(s), p = w(f, !0);
					h(f), Si(t(f, 2), {
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
					}), y(() => H(p, d())), A(e, s);
				},
				$$slots: { default: !0 }
			}), A(e, p);
		},
		$$slots: { default: !0 }
	});
	var R = t(L, 2), z = (e) => {
		var t = Ei(), r = w(t, !0);
		h(t), y(() => H(r, n.error)), A(e, t);
	};
	P(R, (e) => {
		n.error && e(z);
	}), h(k), y((e) => M(k, 1, e), [() => G(Q("relative grid w-full gap-2", n.class))]), A(e, k), v();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text.svelte
var ki = new Set([
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
]), Ai = q("<span><!></span>"), ji = q("<button type=\"button\"><!></button>"), Mi = q("<p class=\"text-sm text-red-400\"> </p>"), Ni = q("<div><!> <div><!> <input/> <!> <!> <!></div> <!></div>");
function Pi(n, r) {
	s(r, !0);
	let i = D(r, "id", 19, Ne), a = D(r, "copyable", 3, !1), o = D(r, "copyLabel", 3, "Copy"), c = D(r, "copiedLabel", 3, "Copied"), l = D(r, "size", 3, "md"), u = V(r, ki), d = j(!1), p = j(!1), m, g = W(() => r.type === "password"), _ = W(() => !!r.appendIcon || f(g) || a()), b = W(() => a() ? r.readonly ?? !0 : r.readonly), x = W(() => a() && f(b)), S = He;
	async function E() {
		await navigator.clipboard.writeText(String(r.value ?? "")), m && clearTimeout(m), U(p, !0), m = setTimeout(() => {
			U(p, !1);
		}, 2e3);
	}
	var O = Ni(), k = w(O), F = (e) => {
		lr(e, {
			get for() {
				return i();
			},
			children: (e, t) => {
				T();
				var n = N();
				y(() => H(n, r.label)), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	P(k, (e) => {
		r.label && e(F);
	});
	var I = t(k, 2), L = w(I), R = (e) => {
		var t = Ai();
		Z(w(t), {
			get icon() {
				return r.prependIcon;
			},
			get class() {
				return Le[l()];
			}
		}), h(t), y((e) => M(t, 1, e), [() => G(Q("grid h-full place-items-center rounded-l-xl border border-dark-500 bg-dark-700 text-dark-50", Ie[l()]))]), A(e, t);
	};
	P(L, (e) => {
		r.prependIcon && e(R);
	});
	var z = t(L, 2);
	C(z, (e) => ({
		id: i(),
		class: e,
		"aria-invalid": r.error ? !0 : void 0,
		value: r.value,
		readonly: f(b),
		tabindex: f(x) ? -1 : r.tabindex,
		...u,
		type: f(g) ? f(d) ? "text" : "password" : r.type
	}), [() => Q("min-w-0 w-full truncate border bg-dark-700 text-dark-50 outline-none", S[l()], r.error ? "border-red-500" : "border-dark-500", {
		"rounded-l-none rounded-r-xl border-l-0": r.prependIcon && !f(_),
		"rounded-l-none border-l-0": r.prependIcon && f(_),
		"rounded-l-xl rounded-r-none border-r-0": !r.prependIcon && f(_),
		"rounded-xl": !r.prependIcon && !f(_)
	})], void 0, void 0, void 0, !0);
	var B = t(z, 2), K = (e) => {
		var t = Ai();
		Z(w(t), {
			get icon() {
				return r.appendIcon;
			},
			get class() {
				return Le[l()];
			}
		}), h(t), y((e) => M(t, 1, e), [() => G(Q("grid h-full place-items-center text-dark-50", Ie[l()], f(g) || a() ? "border-y border-r-0 border-l border-dark-500" : "rounded-r-xl border border-l-0 border-dark-500"))]), A(e, t);
	};
	P(B, (e) => {
		r.appendIcon && e(K);
	});
	var q = t(B, 2), J = (t) => {
		var n = ji(), r = w(n);
		{
			let e = W(() => f(p) ? "ri:checkbox-circle-fill" : "ri:file-copy-line");
			Z(r, {
				get icon() {
					return f(e);
				},
				get class() {
					return Le[l()];
				}
			});
		}
		h(n), y((t) => {
			M(n, 1, t), e(n, "aria-label", f(p) ? c() : o());
		}, [() => G(Q("grid h-full place-items-center rounded-r-xl border border-dark-500 border-l-dark-600 bg-dark-700 transition-colors", f(p) ? "text-success" : "text-dark-50", Ie[l()]))]), ee("click", n, () => void E()), A(t, n);
	};
	P(q, (e) => {
		a() && e(J);
	});
	var Y = t(q, 2), X = (t) => {
		var n = ji(), r = w(n);
		{
			let e = W(() => f(d) ? "mdi:eye-off-outline" : "mdi:eye-outline");
			Z(r, {
				get icon() {
					return f(e);
				},
				get class() {
					return Le[l()];
				}
			});
		}
		h(n), y((t) => {
			M(n, 1, t), e(n, "aria-label", f(d) ? "Hide password" : "Show password"), e(n, "aria-pressed", f(d));
		}, [() => G(Q("grid h-full place-items-center rounded-r-xl border border-dark-500 border-l-dark-600 bg-dark-700 text-dark-50", Ie[l()]))]), ee("click", n, () => U(d, !f(d))), A(t, n);
	};
	P(Y, (e) => {
		f(g) && e(X);
	}), h(I);
	var te = t(I, 2), ne = (e) => {
		var t = Mi(), n = w(t, !0);
		h(t), y(() => H(n, r.error)), A(e, t);
	};
	P(te, (e) => {
		r.error && e(ne);
	}), h(O), y((e, t) => {
		M(O, 1, e), M(I, 1, t);
	}, [() => G(Q("relative grid w-full min-w-0 gap-2")), () => G(Q("relative flex w-full min-w-0 items-center rounded-xl", !f(x) && "has-focus:ring-2 has-focus:ring-primary", r.error && !f(x) && "has-focus:ring-red-500", r.class))]), A(n, O), v();
}
Y(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-file-path.svelte
var Fi = q("<div class=\"grid gap-2\"><div class=\"flex items-end gap-2\"><div class=\"min-w-0 flex-1\"><!></div> <!></div></div>");
function Ii(e, n) {
	s(n, !0);
	let r = D(n, "value", 3, ""), i = D(n, "browseLabel", 3, "Browse"), a = D(n, "emptyFileLabel", 3, "No file selected"), o = D(n, "emptyFolderLabel", 3, "No folder selected"), c = j(!1);
	async function l() {
		if (!f(c)) {
			U(c, !0);
			try {
				let e = await n.onBrowse();
				if (!e) return;
				n.onValueChange?.(e);
			} finally {
				U(c, !1);
			}
		}
	}
	var u = Fi(), d = w(u), p = w(d), m = w(p);
	{
		let e = W(() => n.placeholder ?? (n.mode === "folder" ? o() : a()));
		Pi(m, {
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
	h(p), Et(t(p, 2), {
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
			T();
			var n = N();
			y(() => H(n, i())), A(e, n);
		},
		$$slots: { default: !0 }
	}), h(d), h(u), A(e, u), v();
}
//#endregion
//#region ../ui/src/lib/components/input/input-hotkey.svelte
var Li = q("<p class=\"text-sm text-red-400\"> </p>"), Ri = q("<div class=\"grid w-full min-w-0 gap-2\"><!> <button type=\"button\"><!> <span><!></span></button> <!></div>");
function zi(n, r) {
	s(r, !0);
	let i = D(r, "placeholder", 3, "Click and press keys…");
	D(r, "required", 3, !1);
	let a = D(r, "value", 15, ""), o = D(r, "captureLabel", 3, "Press shortcut…"), c = D(r, "emptyLabel", 3, "Not set"), l = Ne(), u = j(!1);
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
	let g = W(() => a().trim() ? m(a()) : "");
	function _() {
		U(u, !0);
	}
	function b() {
		U(u, !1);
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
	var C = Ri(), E = w(C), O = (e) => {
		lr(e, {
			get for() {
				return l;
			},
			children: (e, t) => {
				T();
				var n = N();
				y(() => H(n, r.label)), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	P(E, (e) => {
		r.label && e(O);
	});
	var F = t(E, 2), I = w(F);
	Z(I, {
		icon: "ri:keyboard-line",
		class: "size-4 shrink-0 text-dark-200"
	});
	var L = t(I, 2), R = w(L), z = (e) => {
		var t = N();
		y(() => H(t, o())), A(e, t);
	}, B = (e) => {
		var t = N();
		y(() => H(t, f(g))), A(e, t);
	}, V = (e) => {
		var t = N();
		y(() => H(t, i() || c())), A(e, t);
	};
	P(R, (e) => {
		f(u) ? e(z) : f(g) ? e(B, 1) : e(V, -1);
	}), h(L), h(F);
	var K = t(F, 2), q = (e) => {
		var t = Li(), n = w(t, !0);
		h(t), y(() => H(n, r.error)), A(e, t);
	};
	P(K, (e) => {
		r.error && e(q);
	}), h(C), y((t, n) => {
		e(F, "id", l), M(F, 1, t), M(L, 1, n);
	}, [() => G(Q("flex h-10 w-full items-center gap-2 rounded-xl border bg-dark-800 px-4 text-left text-sm", "focus:ring-2 focus:ring-primary focus:outline-none", f(u) && "ring-2 ring-primary", r.error ? "border-red-500" : "border-dark-500")), () => G(Q("truncate font-mono", !f(g) && "text-dark-300"))]), ee("click", F, _), ee("keydown", F, x), k("blur", F, S), A(n, C), v();
}
Y(["click", "keydown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-key-value-list.svelte
var Bi = q("<div class=\"grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] items-center gap-2\"><!> <!> <!></div>"), Vi = q("<p class=\"text-sm text-destructive-50\"> </p>"), Hi = q("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function Ui(n, i) {
	s(i, !0);
	let a = D(i, "entries", 31, () => B([])), o = D(i, "keyPlaceholder", 3, "KEY"), c = D(i, "valuePlaceholder", 3, "value"), u = D(i, "id", 19, Ne), d = D(i, "addLabel", 3, "Add"), p = D(i, "removeLabel", 3, "Remove"), m = j(B([]));
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
		U(m, f(m).map((n) => n.id === e ? {
			...n,
			...t
		} : n), !0), _();
	}
	function x(e) {
		U(m, f(m).filter((t) => t.id !== e), !0), _();
	}
	function S() {
		U(m, [...f(m), {
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
		e.length === t.length && e.every((e, n) => e.key === t[n]?.key && e.value === t[n]?.value) || U(m, g(e), !0);
	});
	var C = Hi(), E = w(C), O = (e) => {
		{
			let t = W(() => `${u()}-label`);
			lr(e, {
				get id() {
					return f(t);
				},
				children: (e, t) => {
					T();
					var n = N();
					y(() => H(n, i.label)), A(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	P(E, (e) => {
		i.label && e(O);
	});
	var k = t(E, 2), F = w(k);
	r(F, 17, () => f(m), (e) => e.id, (e, n) => {
		var r = Bi(), i = w(r);
		{
			let e = W(() => `${u()}-${f(n).id}-key`);
			Pi(i, {
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
			let e = W(() => `${u()}-${f(n).id}-value`);
			Pi(a, {
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
		Et(t(a, 2), {
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
		}), h(r), A(e, r);
	}), Et(t(F, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: S,
		children: (e, t) => {
			T();
			var n = N();
			y(() => H(n, d())), A(e, n);
		},
		$$slots: { default: !0 }
	}), h(k);
	var I = t(k, 2), L = (e) => {
		var t = Vi(), n = w(t, !0);
		h(t), y(() => H(n, i.error)), A(e, t);
	};
	P(I, (e) => {
		i.error && e(L);
	}), h(C), y((t) => {
		M(C, 1, t), e(C, "aria-labelledby", i.label ? `${u()}-label` : void 0);
	}, [() => G(Q("grid w-full gap-2", i.class))]), A(n, C), v();
}
//#endregion
//#region ../ui/src/lib/components/input/input-one-of.svelte
var Wi = q("<span class=\"text-red-400\" aria-hidden=\"true\">*</span>"), Gi = q(" <!>", 1), Ki = q("<button type=\"button\" role=\"tab\"> </button>"), qi = q("<p class=\"text-sm text-red-400\"> </p>"), Ji = q("<div><!> <div role=\"tablist\"></div> <div class=\"min-w-0\" role=\"tabpanel\"><!></div> <!></div>");
function Yi(n, i) {
	s(i, !0);
	let a = D(i, "value", 31, () => B({
		variant: "",
		values: {}
	})), o = W(() => a().variant || i.variants[0]?.id || "");
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
	var u = Ji(), d = w(u), p = (e) => {
		lr(e, {
			children: (e, n) => {
				T();
				var r = Gi(), a = m(r), o = t(a), s = (e) => {
					A(e, Wi());
				};
				P(o, (e) => {
					i.required && e(s);
				}), y(() => H(a, `${i.label ?? ""} `)), A(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	P(d, (e) => {
		i.label && e(p);
	});
	var _ = t(d, 2);
	r(_, 21, () => i.variants, (e) => e.id, (t, n) => {
		var r = Ki(), i = w(r, !0);
		h(r), y((t) => {
			e(r, "id", `tab-${f(n).id}`), e(r, "aria-selected", f(o) === f(n).id), e(r, "aria-controls", `panel-${f(n).id}`), M(r, 1, t), H(i, f(n).label);
		}, [() => G(Q("rounded-lg px-3 py-1.5 text-sm font-medium transition-colors", f(o) === f(n).id ? "bg-dark-600 text-dark-50" : "text-dark-200 hover:bg-dark-800 hover:text-dark-50"))]), ee("click", r, () => c(f(n).id)), A(t, r);
	}), h(_);
	var b = t(_, 2);
	g(w(b), () => i.panel, () => ({
		variantId: f(o),
		value: a().values[f(o)],
		setValue: (e) => l(f(o), e)
	})), h(b);
	var x = t(b, 2), S = (e) => {
		var t = qi(), n = w(t, !0);
		h(t), y(() => H(n, i.error)), A(e, t);
	};
	P(x, (e) => {
		i.error && e(S);
	}), h(u), y((t, n) => {
		M(u, 1, t), M(_, 1, n), e(_, "aria-label", i.label), e(b, "id", `panel-${f(o)}`), e(b, "aria-labelledby", `tab-${f(o)}`);
	}, [() => G(Q("grid w-full min-w-0 gap-2")), () => G(Q("inline-flex w-fit gap-0.5 rounded-xl border border-dark-600 bg-dark-800 p-1", i.error && "border-red-500"))]), A(n, u), v();
}
Y(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-select-text.svelte
var Xi = new Set([
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
]), Zi = q("<!> <!>", 1), Qi = q("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), $i = q(" <!>", 1), ea = q("<!> <!> <!>", 1), ta = q("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), na = q("<ul class=\"absolute top-full left-0 z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), ra = q("<p class=\"text-sm text-red-400\"> </p>"), ia = q("<div><!> <div><!> <div class=\"relative min-w-0 flex-1\"><input/> <!></div></div> <!></div>");
function aa(o, c) {
	s(c, !0);
	let l = D(c, "variables", 19, () => []), u = D(c, "id", 19, Ne), d = D(c, "value", 31, () => B({
		type: "",
		value: ""
	})), p = V(c, Xi), g = W(() => c.selectPlaceholder ?? "Select"), _ = W(() => c.loadingPlaceholder ?? "Loading..."), b = ii(() => c.items), x = j(null), S = j(!1), E = j(""), O = j(0), k = W(() => {
		if (!f(E)) return l();
		let e = f(E).toLowerCase();
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
			U(S, !1), U(E, ""), U(O, 0);
			return;
		}
		U(E, e.partial, !0), U(S, f(k).length > 0), U(O, 0);
	}
	function R(e) {
		let t = I();
		if (!t || !f(x)) return;
		let n = d().value, r = f(x).selectionStart ?? n.length, i = n.slice(0, t.start), a = n.slice(r);
		d({
			...d(),
			value: `${i}{${e}}${a}`
		}), U(S, !1), U(E, ""), queueMicrotask(() => {
			if (!f(x)) return;
			let t = i.length + e.length + 2;
			f(x).focus(), f(x).setSelectionRange(t, t);
		});
	}
	let z = () => {
		L();
	}, q = (e) => {
		if (!(!f(S) || f(k).length === 0)) {
			if (e.key === "ArrowDown") {
				e.preventDefault(), U(O, (f(O) + 1) % f(k).length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault(), U(O, (f(O) - 1 + f(k).length) % f(k).length);
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				let t = f(k)[f(O)];
				t && (e.preventDefault(), R(t.key));
				return;
			}
			e.key === "Escape" && U(S, !1);
		}
	}, J = () => {
		setTimeout(() => {
			U(S, !1);
		}, 120);
	};
	var Y = ia(), X = w(Y), te = (e) => {
		lr(e, {
			get for() {
				return u();
			},
			children: (e, t) => {
				T();
				var n = N();
				y(() => H(n, c.label)), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	P(X, (e) => {
		c.label && e(te);
	});
	var ne = t(X, 2), re = w(ne);
	n(re, () => Hn, (e, i) => {
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
				var a = Zi(), o = m(a);
				{
					let e = W(() => Q("flex shrink-0 cursor-pointer items-center justify-between gap-2 rounded-l-xl border border-r-0 bg-dark-700 text-dark-50 outline-none", He.md, c.error ? "border-red-500" : "border-dark-500", c.selectClass));
					n(o, () => Jn, (r, i) => {
						i(r, {
							get class() {
								return f(e);
							},
							children: (e, r) => {
								var i = Zi(), a = m(i);
								{
									let e = W(() => b.loading ? f(_) : f(g));
									n(a, () => Gn, (t, n) => {
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
								}), A(e, i);
							},
							$$slots: { default: !0 }
						});
					});
				}
				n(t(o, 2), () => gt, (e, i) => {
					i(e, {
						children: (e, i) => {
							var a = F(), o = m(a);
							{
								let e = W(() => c.contentProps?.sideOffset ?? 4), i = W(() => Q("z-50 max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", c.contentProps?.class));
								n(o, () => vn, (a, o) => {
									o(a, K(() => c.contentProps, {
										get sideOffset() {
											return f(e);
										},
										get class() {
											return f(i);
										},
										children: (e, i) => {
											var a = ea(), o = m(a);
											n(o, () => Fn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = t(o, 2);
											n(s, () => Dn, (e, i) => {
												i(e, {
													children: (e, i) => {
														var a = F(), o = m(a), s = (e) => {
															var t = Qi(), n = w(t, !0);
															h(t), y(() => H(n, f(_))), A(e, t);
														}, c = (e) => {
															var i = F();
															r(m(i), 17, () => b.items, ({ value: e, label: t, disabled: n }) => e, (e, r) => {
																let i = () => f(r).value, a = () => f(r).label, o = () => f(r).disabled;
																var s = F(), c = m(s);
																{
																	let e = (e, n) => {
																		let r = () => n?.().selected;
																		T();
																		var i = $i(), o = m(i), s = t(o), c = (e) => {
																			Z(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		P(s, (e) => {
																			r() && e(c);
																		}), y(() => H(o, `${a() ?? ""} `)), A(e, i);
																	}, r = W(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	n(c, () => Cn, (t, n) => {
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
																A(e, s);
															}), A(e, i);
														};
														P(o, (e) => {
															b.loading ? e(s) : e(c, -1);
														}), A(e, a);
													},
													$$slots: { default: !0 }
												});
											}), n(t(s, 2), () => jn, (e, t) => {
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
	var ie = t(re, 2), ae = w(ie);
	C(ae, (e) => ({
		id: u(),
		placeholder: c.placeholder,
		class: e,
		"aria-invalid": c.error ? !0 : void 0,
		oninput: l().length > 0 ? z : void 0,
		onkeydown: l().length > 0 ? q : void 0,
		onblur: l().length > 0 ? J : void 0,
		onfocus: l().length > 0 ? L : void 0,
		onclick: l().length > 0 ? L : void 0,
		...p
	}), [() => Q("min-w-0 w-full truncate rounded-r-xl border bg-dark-700 text-dark-50 outline-none", He.md, c.error ? "border-red-500" : "border-dark-500")], void 0, void 0, void 0, !0), i(ae, (e) => U(x, e), () => f(x));
	var oe = t(ae, 2), se = (n) => {
		var i = na();
		r(i, 23, () => f(k), (e) => e.key, (n, r, i) => {
			var a = ta(), o = w(a), s = w(o), c = w(s, !0);
			h(s);
			var l = t(s, 2), u = w(l, !0);
			h(l), h(o), h(a), y((t) => {
				e(o, "aria-selected", f(i) === f(O)), M(o, 1, t), H(c, `{${f(r).key}}`), H(u, f(r).label);
			}, [() => G(Q("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", f(i) === f(O) && "bg-dark-700"))]), ee("mousedown", o, (e) => {
				e.preventDefault(), R(f(r).key);
			}), A(n, a);
		}), h(i), A(n, i);
	};
	P(oe, (e) => {
		f(S) && f(k).length > 0 && e(se);
	}), h(ie), h(ne);
	var ce = t(ne, 2), $ = (e) => {
		var t = ra(), n = w(t, !0);
		h(t), y(() => H(n, c.error)), A(e, t);
	};
	P(ce, (e) => {
		c.error && e($);
	}), h(Y), y((e, t) => {
		M(Y, 1, e), M(ne, 1, t);
	}, [() => G(Q("relative grid w-full min-w-0 gap-2", c.class)), () => G(Q("flex w-full min-w-0 items-stretch rounded-xl has-focus:ring-2 has-focus:ring-primary", c.error && "has-focus:ring-red-500"))]), a(ae, () => d().value, (e) => d(d().value = e, !0)), A(o, Y), v();
}
Y(["mousedown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-slider.svelte
var oa = q("<div class=\"flex items-center justify-between gap-4\"><!> <span class=\"text-sm text-dark-100\"> </span></div>"), sa = q("<p class=\"text-sm text-red-500\"> </p>"), ca = q("<div><!> <input type=\"range\"/> <!></div>");
function la(n, r) {
	s(r, !0);
	let i = D(r, "id", 19, Ne), o = D(r, "min", 3, 0), c = D(r, "max", 3, 100), l = D(r, "step", 3, 1), u = D(r, "value", 15, 0);
	var d = ca(), f = w(d), m = (e) => {
		var n = oa(), a = w(n);
		lr(a, {
			get for() {
				return i();
			},
			children: (e, t) => {
				T();
				var n = N();
				y(() => H(n, r.label)), A(e, n);
			},
			$$slots: { default: !0 }
		});
		var o = t(a, 2), s = w(o);
		h(o), h(n), y(() => H(s, `${u() ?? ""}%`)), A(e, n);
	};
	P(f, (e) => {
		r.label && e(m);
	});
	var g = t(f, 2);
	p(g);
	var _ = t(g, 2), b = (e) => {
		var t = sa(), n = w(t, !0);
		h(t), y(() => H(n, r.error)), A(e, t);
	};
	P(_, (e) => {
		r.error && e(b);
	}), h(d), y((t, n) => {
		M(d, 1, t), e(g, "id", i()), e(g, "min", o()), e(g, "max", c()), e(g, "step", l()), M(g, 1, n);
	}, [() => G(Q("grid w-full gap-2")), () => G(Q("h-2 w-full cursor-pointer appearance-none rounded-full bg-dark-600 accent-primary", r.error && "ring-1 ring-red-500"))]), ee("input", g, () => r.onvaluechange?.(u())), a(g, u), A(n, d), v();
}
Y(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-switch.svelte
var ua = q("<p class=\"text-sm text-red-400\"> </p>"), da = q("<div><div class=\"flex items-center gap-3\"><!> <!></div> <!></div>");
function fa(e, r) {
	s(r, !0);
	let i = D(r, "checked", 15, !1), a = D(r, "id", 19, Ne);
	var o = da(), c = w(o), l = w(c);
	{
		let e = W(() => r.label ? `${a()}-label` : void 0), t = W(() => r.error ? !0 : void 0), o = W(() => Q("inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors outline-none", "data-[state=checked]:bg-primary/15", r.error ? "data-[state=unchecked]:bg-red-500/30" : "data-[state=unchecked]:bg-dark-600", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
		n(l, () => ir, (r, s) => {
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
					var r = F(), i = m(r);
					{
						let e = W(() => Q("pointer-events-none block size-5 shrink-0 rounded-full bg-white transition-transform", "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0", "data-[state=checked]:bg-primary"));
						n(i, () => sr, (t, n) => {
							n(t, { get class() {
								return f(e);
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
		lr(e, {
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
				y(() => H(n, r.label)), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	P(u, (e) => {
		r.label && e(d);
	}), h(c);
	var p = t(c, 2), g = (e) => {
		var t = ua(), n = w(t, !0);
		h(t), y(() => H(n, r.error)), A(e, t);
	};
	P(p, (e) => {
		r.error && e(g);
	}), h(o), y((e) => M(o, 1, e), [() => G(Q("grid gap-2", r.class))]), A(e, o), v();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-list.svelte
var pa = q("<div class=\"flex items-center gap-2\"><!> <!></div>"), ma = q("<p class=\"text-sm text-destructive-50\"> </p>"), ha = q("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function ga(n, i) {
	s(i, !0);
	let a = D(i, "values", 31, () => B([])), o = D(i, "id", 19, Ne), c = D(i, "addLabel", 3, "Add"), u = D(i, "removeLabel", 3, "Remove"), d = j(B([]));
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
		U(d, f(d).map((n) => n.id === e ? {
			...n,
			value: t
		} : n), !0), m();
	}
	function _(e) {
		U(d, f(d).filter((t) => t.id !== e), !0), m();
	}
	function b() {
		U(d, [...f(d), {
			id: crypto.randomUUID(),
			value: ""
		}], !0), m();
	}
	l(() => {
		let e = a(), t = f(d).map((e) => e.value);
		e.length === t.length && e.every((e, n) => e === t[n]) || U(d, p(e), !0);
	});
	var x = ha(), S = w(x), C = (e) => {
		{
			let t = W(() => `${o()}-label`);
			lr(e, {
				get id() {
					return f(t);
				},
				children: (e, t) => {
					T();
					var n = N();
					y(() => H(n, i.label)), A(e, n);
				},
				$$slots: { default: !0 }
			});
		}
	};
	P(S, (e) => {
		i.label && e(C);
	});
	var E = t(S, 2), O = w(E);
	r(O, 17, () => f(d), (e) => e.id, (e, n) => {
		var r = pa(), a = w(r);
		{
			let e = W(() => `${o()}-${f(n).id}`);
			Pi(a, {
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
		Et(t(a, 2), {
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
		}), h(r), A(e, r);
	}), Et(t(O, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: b,
		children: (e, t) => {
			T();
			var n = N();
			y(() => H(n, c())), A(e, n);
		},
		$$slots: { default: !0 }
	}), h(E);
	var k = t(E, 2), F = (e) => {
		var t = ma(), n = w(t, !0);
		h(t), y(() => H(n, i.error)), A(e, t);
	};
	P(k, (e) => {
		i.error && e(F);
	}), h(x), y((t) => {
		M(x, 1, t), e(x, "aria-labelledby", i.label ? `${o()}-label` : void 0);
	}, [() => G(Q("grid w-full gap-2", i.class))]), A(n, x), v();
}
//#endregion
//#region ../ui/src/lib/components/input/use-dropdown-scroll.svelte.ts
var _a = class {
	#e = j(0);
	get scrollTop() {
		return f(this.#e);
	}
	set scrollTop(e) {
		U(this.#e, e, !0);
	}
	#t = j(null);
	get viewportRef() {
		return f(this.#t);
	}
	set viewportRef(e) {
		U(this.#t, e, !0);
	}
	handleViewportScroll = (e) => {
		this.scrollTop = e.currentTarget.scrollTop;
	};
	resetScroll() {
		this.scrollTop = 0, this.viewportRef && (this.viewportRef.scrollTop = 0);
	}
	scrollToIndex(e) {
		if (e < 0) return;
		let t = ci(e);
		this.scrollTop = t, this.viewportRef && (this.viewportRef.scrollTop = t);
	}
	scrollToValue(e, t) {
		if (!t) return;
		let n = e.findIndex((e) => e.value === t);
		n >= 0 && this.scrollToIndex(n);
	}
}, va = q("<div class=\"relative w-full\"><div class=\"absolute inset-x-0 top-0\"></div></div>");
function ya(e, t) {
	s(t, !0);
	let n = D(t, "viewportHeight", 3, 200), i = W(() => si(t.items.length)), a = W(() => f(i) ? oi(t.items, t.scrollTop, n()) : null), o = W(() => f(i) && f(a) ? f(a).items : t.items);
	var c = F(), l = m(c), u = (e) => {
		var n = va();
		let i;
		var s = w(n);
		let c;
		r(s, 21, () => f(o), (e) => e.value, (e, n) => {
			var r = F();
			g(m(r), () => t.item, () => f(n)), A(e, r);
		}), h(s), h(n), y(() => {
			i = J(n, "", i, { height: `${f(a).totalHeight}px` }), c = J(s, "", c, { transform: `translateY(${f(a).offsetY}px)` });
		}), A(e, n);
	}, d = (e) => {
		var n = F();
		r(m(n), 17, () => f(o), (e) => e.value, (e, n) => {
			var r = F();
			g(m(r), () => t.item, () => f(n)), A(e, r);
		}), A(e, n);
	};
	P(l, (e) => {
		f(i) && f(a) ? e(u) : e(d, -1);
	}), A(e, c), v();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-select.svelte
var ba = (e, r = z) => {
	let i = W(() => r().value), a = W(() => r().label), o = W(() => r().disabled);
	var s = F(), c = m(s);
	{
		let e = (e, n) => {
			let r = () => n?.().selected;
			T();
			var i = Sa(), o = m(i), s = t(o), c = (e) => {
				Z(e, {
					icon: "ri:check-line",
					class: "size-5 text-primary"
				});
			};
			P(s, (e) => {
				r() && e(c);
			}), y(() => H(o, `${f(a) ?? ""} `)), A(e, i);
		}, r = W(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
		n(c, () => Cn, (t, n) => {
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
	A(e, s);
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
]), Sa = q(" <!>", 1), Ca = q("<span class=\"text-red-400\">*</span>"), wa = q("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Ta = q("<div class=\"px-3 py-1.5 text-sm text-dark-300\"></div>"), Ea = q("<!> <!> <!>", 1), Da = q("<div><div class=\"min-w-0 flex-1\"><!></div> <button type=\"button\" aria-haspopup=\"listbox\"><!></button></div> <!>", 1), Oa = q("<p class=\"text-sm text-red-400\"> </p>"), ka = q("<div><!> <!> <!></div>");
function Aa(r, i) {
	s(i, !0);
	let a = D(i, "allowCustomValue", 3, !0), c = D(i, "id", 19, Ne), l = D(i, "value", 15, ""), d = V(i, xa), p = W(() => i.placeholder), g = W(() => i.loadingPlaceholder ?? "Loading..."), _ = W(() => i.selectAriaLabel ?? "Select value"), b = j(!1), x = j(""), S = j(!1), C = new _a(), E = ii(() => i.items, () => i.reloadKey?.()), O = new Qr(() => f(x), 100), k = W(() => new Map(E.items.map((e) => [e.value, e]))), N = W(() => f(k).get(l())), I = W(() => f(N)?.value ?? ""), L = W(() => {
		if (E.loading) return [];
		if (!f(S)) return E.items;
		let e = O.current.trim();
		return e ? ai(E.items, e) : E.items;
	}), R = W(() => f(N) && !f(L).some((e) => e.value === f(N).value) ? [f(N), ...f(L)] : f(L));
	function z() {
		f(S) || U(x, f(N)?.label ?? (a() ? l() : ""), !0);
	}
	o(() => {
		l(), f(N)?.label, z();
	}), o(() => {
		O.current, f(b) && C.resetScroll();
	});
	function B() {
		U(b, f(L).length > 0 || E.items.length > 0, !0);
	}
	function q(e) {
		U(x, e.currentTarget.value, !0), U(S, !0), a() && l(f(x)), B();
	}
	function J() {
		U(b, !0);
	}
	function Y() {
		U(S, !1), z();
	}
	async function X(e) {
		if (U(b, e, !0), !e) {
			U(S, !1), C.resetScroll(), z();
			return;
		}
		await u(), C.scrollToValue(f(L), l());
	}
	function te() {
		U(b, !0);
	}
	let ne = W(() => Ae(d, {
		id: c(),
		placeholder: E.loading ? f(g) : f(p),
		autocomplete: "off",
		class: Q("min-w-0 w-full truncate rounded-l-xl border border-r-0 bg-dark-700 text-dark-50 outline-none", He.md, i.error ? "border-red-500" : "border-dark-500"),
		"aria-invalid": i.error ? !0 : void 0,
		oninput: q,
		onfocus: J,
		onblur: Y
	}));
	var re = ka(), ie = w(re), ae = (e) => {
		lr(e, {
			get for() {
				return c();
			},
			children: (e, n) => {
				T();
				var r = Sa(), a = m(r), o = t(a), s = (e) => {
					A(e, Ca());
				};
				P(o, (e) => {
					i.required && e(s);
				}), y(() => H(a, `${i.label ?? ""} `)), A(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	P(ie, (e) => {
		i.label && e(ae);
	});
	var oe = t(ie, 2);
	{
		let r = W(() => !!i.disabled);
		n(oe, () => fn, (a, o) => {
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
					e && (l(e), U(S, !1), U(b, !1), z());
				},
				onOpenChange: X,
				get disabled() {
					return f(r);
				},
				get open() {
					return f(b);
				},
				set open(e) {
					U(b, e, !0);
				},
				children: (r, a) => {
					var o = Da(), s = m(o), c = w(s);
					n(w(c), () => hn, (e, t) => {
						t(e, K(() => f(ne)));
					}), h(c);
					var l = t(c, 2);
					Z(w(l), {
						icon: "ri:expand-up-down-line",
						class: "size-5 shrink-0 text-dark-300"
					}), h(l), h(s), n(t(s, 2), () => gt, (e, r) => {
						r(e, {
							children: (e, r) => {
								var a = F(), o = m(a);
								{
									let e = W(() => i.contentProps?.sideOffset ?? 4), r = W(() => Q("z-50 max-h-84 min-w-(--bits-combobox-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", i.contentProps?.class));
									n(o, () => vn, (a, o) => {
										o(a, K(() => i.contentProps, {
											get sideOffset() {
												return f(e);
											},
											get class() {
												return f(r);
											},
											children: (e, r) => {
												var i = Ea(), a = m(i);
												n(a, () => Fn, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															Z(e, { icon: "ri:arrow-up-s-line" });
														},
														$$slots: { default: !0 }
													});
												});
												var o = t(a, 2);
												n(o, () => Dn, (e, t) => {
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
															var n = F(), r = m(n), i = (e) => {
																var t = wa(), n = w(t, !0);
																h(t), y(() => H(n, f(g))), A(e, t);
															}, a = (e) => {
																ya(e, {
																	get items() {
																		return f(L);
																	},
																	get scrollTop() {
																		return C.scrollTop;
																	},
																	get item() {
																		return ba;
																	}
																});
															}, o = (e) => {
																var t = Ta();
																t.textContent = "No matches found", A(e, t);
															};
															P(r, (e) => {
																E.loading ? e(i) : f(L).length > 0 ? e(a, 1) : e(o, -1);
															}), A(e, n);
														},
														$$slots: { default: !0 }
													});
												}), n(t(o, 2), () => jn, (e, t) => {
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
					}), y((t, n) => {
						M(s, 1, t), e(l, "aria-label", f(_)), e(l, "aria-expanded", f(b)), l.disabled = !!i.disabled, M(l, 1, n);
					}, [() => G(Q("flex w-full min-w-0 items-stretch rounded-xl has-focus:ring-2 has-focus:ring-primary", i.error && "has-focus:ring-red-500")), () => G(Q("flex shrink-0 cursor-pointer items-center justify-center rounded-r-xl border bg-dark-700 text-dark-50 outline-none", He.md, i.error ? "border-red-500" : "border-dark-500", i.selectClass))]), ee("click", l, te), A(r, o);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var se = t(oe, 2), ce = (e) => {
		var t = Oa(), n = w(t, !0);
		h(t), y(() => H(n, i.error)), A(e, t);
	};
	P(se, (e) => {
		i.error && e(ce);
	}), h(re), y((e) => M(re, 1, e), [() => G(Q("relative grid w-full min-w-0 gap-2", i.class))]), A(r, re), v();
}
Y(["click"]);
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
]), Ma = q("<!> <!>", 1), Na = q("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Pa = q(" <!>", 1), Fa = q("<!> <!> <!>", 1), Ia = q("<div aria-hidden=\"true\">—</div>"), La = q("<input/>"), Ra = q("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), za = q("<ul class=\"absolute top-full left-0 z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), Ba = q("<div class=\"flex shrink-0 items-center self-center\"><!></div>"), Va = q("<p class=\"text-sm text-red-400\"> </p>"), Ha = q("<div><!> <div class=\"flex items-center gap-3\"><div><input/> <!> <!> <!></div> <!></div> <!></div>");
function Ua(o, c) {
	s(c, !0);
	let l = D(c, "variables", 19, () => []), u = D(c, "valuelessOperators", 19, () => []), d = D(c, "id", 19, Ne), _ = D(c, "value", 31, () => B({
		path: "",
		type: "equals",
		value: ""
	})), b = V(c, ja), x = W(() => c.selectPlaceholder ?? "Select"), E = W(() => c.loadingPlaceholder ?? "Loading..."), O = ii(() => c.items), I = j(null), L = j(null), R = j("path"), z = j(!1), q = j(""), J = j(0), Y = W(() => {
		if (!f(q)) return l();
		let e = f(q).toLowerCase();
		return l().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function X(e) {
		return f(e === "path" ? I : L);
	}
	function te(e) {
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
		let t = X(e);
		if (!t) return null;
		let n = te(e), r = t.selectionStart ?? n.length, i = n.slice(0, r), a = i.lastIndexOf("{");
		if (a === -1) return null;
		let o = i.slice(a + 1);
		return o.includes("}") ? null : {
			start: a,
			partial: o
		};
	}
	function ie(e) {
		U(R, e, !0);
		let t = re(e);
		if (!t || l().length === 0) {
			U(z, !1), U(q, ""), U(J, 0);
			return;
		}
		U(q, t.partial, !0), U(z, f(Y).length > 0), U(J, 0);
	}
	function ae(e, t = f(R)) {
		let n = re(t), r = X(t);
		if (!n || !r) return;
		let i = te(t), a = r.selectionStart ?? i.length, o = i.slice(0, n.start);
		ne(t, `${o}{${e}}${i.slice(a)}`), U(z, !1), U(q, ""), queueMicrotask(() => {
			if (!r) return;
			let t = o.length + e.length + 2;
			r.focus(), r.setSelectionRange(t, t);
		});
	}
	let oe = (e) => ({
		handleInput: () => {
			ie(e);
		},
		handleKeydown: (t) => {
			if (!(!f(z) || f(Y).length === 0 || f(R) !== e)) {
				if (t.key === "ArrowDown") {
					t.preventDefault(), U(J, (f(J) + 1) % f(Y).length);
					return;
				}
				if (t.key === "ArrowUp") {
					t.preventDefault(), U(J, (f(J) - 1 + f(Y).length) % f(Y).length);
					return;
				}
				if (t.key === "Enter" || t.key === "Tab") {
					let n = f(Y)[f(J)];
					n && (t.preventDefault(), ae(n.key, e));
					return;
				}
				t.key === "Escape" && U(z, !1);
			}
		},
		handleBlur: () => {
			se && clearTimeout(se), se = setTimeout(() => {
				U(z, !1), se = void 0;
			}, 120);
		}
	}), se;
	S(() => {
		se && clearTimeout(se);
	});
	let ce = oe("path"), $ = oe("value"), le = W(() => c.error ? "border-red-500" : "border-dark-500"), ue = W(() => u().includes(_().type));
	var de = Ha(), fe = w(de), pe = (e) => {
		lr(e, {
			get for() {
				return d();
			},
			children: (e, t) => {
				T();
				var n = N();
				y(() => H(n, c.label)), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	P(fe, (e) => {
		c.label && e(pe);
	});
	var me = t(fe, 2), he = w(me), ge = w(he);
	C(ge, (e) => ({
		id: d(),
		placeholder: c.pathPlaceholder,
		class: e,
		"aria-invalid": c.error ? !0 : void 0,
		role: l().length > 0 ? "combobox" : void 0,
		"aria-autocomplete": l().length > 0 ? "list" : void 0,
		"aria-expanded": l().length > 0 ? f(z) && f(R) === "path" && f(Y).length > 0 : void 0,
		"aria-controls": l().length > 0 ? `${d()}-listbox` : void 0,
		"aria-activedescendant": f(z) && f(R) === "path" && f(Y).length > 0 ? `${d()}-option-${f(J)}` : void 0,
		oninput: l().length > 0 ? ce.handleInput : void 0,
		onkeydown: l().length > 0 ? ce.handleKeydown : void 0,
		onblur: l().length > 0 ? ce.handleBlur : void 0,
		onfocus: l().length > 0 ? () => ie("path") : void 0,
		onclick: l().length > 0 ? () => ie("path") : void 0,
		...b
	}), [() => Q("min-w-0 flex-1 truncate border border-r bg-dark-700 text-dark-50 outline-none", "rounded-l-xl", He.md, f(le))], void 0, void 0, void 0, !0), i(ge, (e) => U(I, e), () => f(I));
	var _e = t(ge, 2);
	n(_e, () => Hn, (e, i) => {
		i(e, {
			type: "single",
			get items() {
				return O.items;
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
					let e = W(() => Q("flex shrink-0 cursor-pointer items-center justify-between gap-2 border border-x-0 bg-dark-700 text-dark-50 outline-none", He.md, f(le), c.selectClass ?? "w-32"));
					n(o, () => Jn, (r, i) => {
						i(r, {
							get class() {
								return f(e);
							},
							children: (e, r) => {
								var i = Ma(), a = m(i);
								{
									let e = W(() => O.loading ? f(E) : f(x));
									n(a, () => Gn, (t, n) => {
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
								}), A(e, i);
							},
							$$slots: { default: !0 }
						});
					});
				}
				n(t(o, 2), () => gt, (e, i) => {
					i(e, {
						children: (e, i) => {
							var a = F(), o = m(a);
							{
								let e = W(() => c.contentProps?.sideOffset ?? 4), i = W(() => Q("z-50 max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", c.contentProps?.class));
								n(o, () => vn, (a, o) => {
									o(a, K(() => c.contentProps, {
										get sideOffset() {
											return f(e);
										},
										get class() {
											return f(i);
										},
										children: (e, i) => {
											var a = Fa(), o = m(a);
											n(o, () => Fn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														Z(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = t(o, 2);
											n(s, () => Dn, (e, i) => {
												i(e, {
													children: (e, i) => {
														var a = F(), o = m(a), s = (e) => {
															var t = Na(), n = w(t, !0);
															h(t), y(() => H(n, f(E))), A(e, t);
														}, c = (e) => {
															var i = F();
															r(m(i), 17, () => O.items, ({ value: e, label: t, disabled: n }) => e, (e, r) => {
																let i = () => f(r).value, a = () => f(r).label, o = () => f(r).disabled;
																var s = F(), c = m(s);
																{
																	let e = (e, n) => {
																		let r = () => n?.().selected;
																		T();
																		var i = Pa(), o = m(i), s = t(o), c = (e) => {
																			Z(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		P(s, (e) => {
																			r() && e(c);
																		}), y(() => H(o, `${a() ?? ""} `)), A(e, i);
																	}, r = W(() => Q("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	n(c, () => Cn, (t, n) => {
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
																A(e, s);
															}), A(e, i);
														};
														P(o, (e) => {
															O.loading ? e(s) : e(c, -1);
														}), A(e, a);
													},
													$$slots: { default: !0 }
												});
											}), n(t(s, 2), () => jn, (e, t) => {
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
	var ve = t(_e, 2), ye = (e) => {
		var t = Ia();
		y((e) => M(t, 1, e), [() => G(Q("flex min-w-0 items-center rounded-r-xl border border-l-0 bg-dark-700 px-3 text-dark-500 select-none", He.md, f(le)))]), A(e, t);
	}, be = (t) => {
		var n = La();
		p(n), i(n, (e) => U(L, e), () => f(L)), y((t) => {
			e(n, "placeholder", c.valuePlaceholder), M(n, 1, t), e(n, "aria-invalid", c.error ? !0 : void 0), e(n, "role", l().length > 0 ? "combobox" : void 0), e(n, "aria-autocomplete", l().length > 0 ? "list" : void 0), e(n, "aria-expanded", l().length > 0 ? f(z) && f(R) === "value" && f(Y).length > 0 : void 0), e(n, "aria-controls", l().length > 0 ? `${d()}-listbox` : void 0), e(n, "aria-activedescendant", f(z) && f(R) === "value" && f(Y).length > 0 ? `${d()}-option-${f(J)}` : void 0);
		}, [() => G(Q("min-w-0 flex-1 truncate rounded-r-xl border bg-dark-700 text-dark-50 outline-none", He.md, f(le)))]), ee("input", n, function(...e) {
			(l().length > 0 ? $.handleInput : void 0)?.apply(this, e);
		}), ee("keydown", n, function(...e) {
			(l().length > 0 ? $.handleKeydown : void 0)?.apply(this, e);
		}), k("blur", n, function(...e) {
			(l().length > 0 ? $.handleBlur : void 0)?.apply(this, e);
		}), k("focus", n, function(...e) {
			(l().length > 0 ? () => ie("value") : void 0)?.apply(this, e);
		}), ee("click", n, function(...e) {
			(l().length > 0 ? () => ie("value") : void 0)?.apply(this, e);
		}), a(n, () => _().value, (e) => _(_().value = e, !0)), A(t, n);
	};
	P(ve, (e) => {
		f(ue) ? e(ye) : e(be, -1);
	});
	var xe = t(ve, 2), Se = (n) => {
		var i = za();
		r(i, 23, () => f(Y), (e) => e.key, (n, r, i) => {
			var a = Ra(), o = w(a), s = w(o), c = w(s, !0);
			h(s);
			var l = t(s, 2), u = w(l, !0);
			h(l), h(o), h(a), y((t) => {
				e(o, "id", `${d()}-option-${f(i)}`), e(o, "aria-selected", f(i) === f(J)), M(o, 1, t), H(c, `{${f(r).key}}`), H(u, f(r).label);
			}, [() => G(Q("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", f(i) === f(J) && "bg-dark-700"))]), ee("mousedown", o, (e) => {
				e.preventDefault(), ae(f(r).key, f(R));
			}), A(n, a);
		}), h(i), y(() => e(i, "id", `${d()}-listbox`)), A(n, i);
	};
	P(xe, (e) => {
		f(z) && f(Y).length > 0 && e(Se);
	}), h(he);
	var Ce = t(he, 2), we = (e) => {
		var t = Ba();
		g(w(t), () => c.suffix), h(t), A(e, t);
	};
	P(Ce, (e) => {
		c.suffix && e(we);
	}), h(me);
	var Te = t(me, 2), Ee = (e) => {
		var t = Va(), n = w(t, !0);
		h(t), y(() => H(n, c.error)), A(e, t);
	};
	P(Te, (e) => {
		c.error && e(Ee);
	}), h(de), y((e, t) => {
		M(de, 1, e), M(he, 1, t);
	}, [() => G(Q("relative grid w-full gap-2", c.class)), () => G(Q("relative grid min-w-0 flex-1 grid-cols-[1fr_120px_1fr] rounded-xl has-focus:ring-2 has-focus:ring-primary", c.error && "has-focus:ring-red-500"))]), a(ge, () => _().path, (e) => _(_().path = e, !0)), A(o, de), v();
}
Y([
	"input",
	"keydown",
	"click",
	"mousedown"
]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-variables.svelte
var Wa = new Set([
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
]), Ga = q("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), Ka = q("<ul class=\"absolute top-full left-0 z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), qa = q("<p class=\"text-sm text-red-400\"> </p>"), Ja = q("<div class=\"relative grid w-full min-w-0 gap-2\"><!> <div><input/> <!></div> <!></div>");
function Ya(n, o) {
	s(o, !0);
	let c = D(o, "variables", 19, () => []), l = D(o, "value", 15, ""), u = D(o, "id", 19, Ne), d = V(o, Wa), p = j(null), m = j(!1), g = j(""), _ = j(0), b = W(() => {
		if (!f(g)) return c();
		let e = f(g).toLowerCase();
		return c().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function x() {
		if (!f(p)) return null;
		let e = f(p).selectionStart ?? l().length, t = l().slice(0, e), n = t.lastIndexOf("{");
		if (n === -1) return null;
		let r = t.slice(n + 1);
		return r.includes("}") ? null : {
			start: n,
			partial: r
		};
	}
	function E() {
		let e = x();
		if (!e || c().length === 0) {
			U(m, !1), U(g, ""), U(_, 0);
			return;
		}
		U(g, e.partial, !0), U(m, f(b).length > 0), U(_, 0);
	}
	function O(e) {
		let t = x();
		if (!t || !f(p)) return;
		let n = f(p).selectionStart ?? l().length, r = l().slice(0, t.start);
		l(`${r}{${e}}${l().slice(n)}`), U(m, !1), U(g, ""), queueMicrotask(() => {
			if (!f(p)) return;
			let t = r.length + e.length + 2;
			f(p).focus(), f(p).setSelectionRange(t, t);
		});
	}
	let k = (e) => {
		o.oninput?.(e), E();
	}, F = (e) => {
		if (!(!f(m) || f(b).length === 0)) {
			if (e.key === "ArrowDown") {
				e.preventDefault(), U(_, (f(_) + 1) % f(b).length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault(), U(_, (f(_) - 1 + f(b).length) % f(b).length);
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				let t = f(b)[f(_)];
				t && (e.preventDefault(), O(t.key));
				return;
			}
			e.key === "Escape" && U(m, !1);
		}
	}, I, L = () => {
		I && clearTimeout(I), I = setTimeout(() => {
			U(m, !1), I = void 0;
		}, 120);
	};
	S(() => {
		I && clearTimeout(I);
	});
	var R = Ja(), z = w(R), B = (e) => {
		lr(e, {
			get for() {
				return u();
			},
			children: (e, t) => {
				T();
				var n = N();
				y(() => H(n, o.label)), A(e, n);
			},
			$$slots: { default: !0 }
		});
	};
	P(z, (e) => {
		o.label && e(B);
	});
	var K = t(z, 2), q = w(K);
	C(q, (e) => ({
		id: u(),
		placeholder: o.placeholder,
		class: e,
		role: "combobox",
		"aria-invalid": o.error ? !0 : void 0,
		"aria-autocomplete": "list",
		"aria-expanded": f(m) && f(b).length > 0,
		"aria-controls": `${u()}-listbox`,
		"aria-activedescendant": f(m) && f(b).length > 0 ? `${u()}-option-${f(_)}` : void 0,
		oninput: k,
		onkeydown: F,
		onblur: L,
		onfocus: E,
		onclick: E,
		...d
	}), [() => Q("min-w-0 w-full truncate rounded-xl border bg-dark-700 text-dark-50 outline-none", He.md, o.error ? "border-red-500" : "border-dark-500")], void 0, void 0, void 0, !0), i(q, (e) => U(p, e), () => f(p));
	var J = t(q, 2), Y = (n) => {
		var i = Ka();
		r(i, 23, () => f(b), (e) => e.key, (n, r, i) => {
			var a = Ga(), o = w(a), s = w(o), c = w(s, !0);
			h(s);
			var l = t(s, 2), d = w(l, !0);
			h(l), h(o), h(a), y((t) => {
				e(o, "id", `${u()}-option-${f(i)}`), e(o, "aria-selected", f(i) === f(_)), M(o, 1, t), H(c, `{${f(r).key}}`), H(d, f(r).label);
			}, [() => G(Q("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", f(i) === f(_) && "bg-dark-700"))]), ee("mousedown", o, (e) => {
				e.preventDefault(), O(f(r).key);
			}), A(n, a);
		}), h(i), y(() => e(i, "id", `${u()}-listbox`)), A(n, i);
	};
	P(J, (e) => {
		f(m) && f(b).length > 0 && e(Y);
	}), h(K);
	var X = t(K, 2), te = (e) => {
		var t = qa(), n = w(t, !0);
		h(t), y(() => H(n, o.error)), A(e, t);
	};
	P(X, (e) => {
		o.error && e(te);
	}), h(R), y((e) => M(K, 1, e), [() => G(Q("relative flex w-full min-w-0 items-center rounded-xl", "has-focus-within:ring-2 has-focus-within:ring-primary", o.error && "has-focus-within:ring-red-500", o.class))]), a(q, l), A(n, R), v();
}
Y(["mousedown"]);
//#endregion
export { jr as _, fa as a, Yi as c, Ii as d, Pi as f, Rr as g, ii as h, ga as i, Ui as l, _i as m, Ua as n, la as o, Oi as p, Aa as r, aa as s, Ya as t, zi as u, pr as v, lr as y };
