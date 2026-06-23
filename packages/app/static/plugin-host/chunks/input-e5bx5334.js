import { a as e, i as t, t as n } from "./codemirror-Bh9wuH2R.js";
import { $n as r, At as i, Gn as a, Gt as o, Hr as s, Jr as c, Kn as l, Mn as u, Mt as d, N as f, Nn as p, On as m, Q as h, Qn as g, Qr as _, Sr as v, Vr as y, Vt as b, Wn as x, Zn as S, Zr as C, _n as w, _t as T, a as E, an as D, at as O, bt as k, cr as A, dn as j, f as M, ft as N, gn as P, hn as F, in as I, it as L, lr as R, m as z, mn as B, ni as V, nn as H, nr as ee, o as te, on as U, or as W, ot as G, p as K, pr as q, un as J, vt as Y, wt as ne, x as re, zn as ie } from "./index-client-BIJQxc2l.js";
import "./disclose-version-YhYaTdgb.js";
import { t as X } from "./Icon-BoHmh-pv.js";
import "./index-client-b6iB98U7.js";
import { t as Z } from "./utils-DVQ4nj8f.js";
import { C as ae, D as Q, _ as oe, a as se, c as ce, d as le, g as ue, i as de, l as fe, n as pe, o as me, r as he, s as ge, u as _e, v as ve, x as ye } from "./animations-complete-mSylzqL5.js";
import { _ as be, b as xe, g as Se, h as Ce, m as we, v as Te, y as Ee } from "./scroll-lock-io5BKwUu.js";
import { i as De, n as Oe, r as ke, t as Ae } from "./use-id-D_eLoXvH.js";
import { a as je, c as Me, d as Ne, f as Pe, h as Fe, l as Ie, m as Le, o as Re, p as ze, s as Be, u as Ve } from "./command-C_AHst5L.js";
import { t as He } from "./on-mount-effect.svelte-CsZRRjbJ.js";
import { _ as Ue, a as We, d as Ge, f as Ke, g as qe, h as Je, i as Ye, l as Xe, m as Ze, o as Qe, p as $e, r as et, s as tt, u as nt, v as rt } from "./dom-DDAYniBq.js";
import { a as it, o as at, t as ot } from "./presence-manager.svelte-DXU099Vb.js";
import { a as st, c as ct, i as lt, n as ut, r as dt, s as ft } from "./dialog-DllFMXa9.js";
import { t as pt } from "./portal-Clk-o-E0.js";
import "./legacy-DJShZKm3.js";
import { a as mt, n as ht, r as gt, t as _t } from "./popper-layer-force-mount-CGFPxfB5.js";
import { t as vt } from "./floating-layer-anchor-Cdr3yIGO.js";
import { i as yt, n as bt, r as xt } from "./popover-BKwFiGDz.js";
import { t as St } from "./scroll-area-99QA2aRD.js";
import { t as Ct } from "./button-CZMpEwOs.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/checkbox/checkbox.svelte.js
var wt = me({
	component: "checkbox",
	parts: [
		"root",
		"group",
		"group-label",
		"input"
	]
}), Tt = new ae("Checkbox.Group"), Et = new ae("Checkbox.Root"), Dt = class e {
	static create(t, n = null) {
		return Et.set(new e(t, n));
	}
	opts;
	group;
	#e = q(() => this.group && this.group.opts.name.current ? this.group.opts.name.current : this.opts.name.current);
	get trueName() {
		return m(this.#e);
	}
	set trueName(e) {
		W(this.#e, e);
	}
	#t = q(() => this.group && this.group.opts.required.current ? !0 : this.opts.required.current);
	get trueRequired() {
		return m(this.#t);
	}
	set trueRequired(e) {
		W(this.#t, e);
	}
	#n = q(() => this.group && this.group.opts.disabled.current ? !0 : this.opts.disabled.current);
	get trueDisabled() {
		return m(this.#n);
	}
	set trueDisabled(e) {
		W(this.#n, e);
	}
	#r = q(() => this.group && this.group.opts.readonly.current ? !0 : this.opts.readonly.current);
	get trueReadonly() {
		return m(this.#r);
	}
	set trueReadonly(e) {
		W(this.#r, e);
	}
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = le(this.opts.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this), ye.pre([() => c(this.group?.opts.value.current), () => this.opts.value.current], ([e, t]) => {
			!e || !t || (this.opts.checked.current = e.includes(t));
		}), ye.pre(() => this.opts.checked.current, (e) => {
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
	#a = q(() => ({
		checked: this.opts.checked.current,
		indeterminate: this.opts.indeterminate.current
	}));
	get snippetProps() {
		return m(this.#a);
	}
	set snippetProps(e) {
		W(this.#a, e);
	}
	#o = q(() => ({
		id: this.opts.id.current,
		role: "checkbox",
		type: this.opts.type.current,
		disabled: this.trueDisabled,
		"aria-checked": ge(this.opts.checked.current, this.opts.indeterminate.current),
		"aria-required": he(this.trueRequired),
		"aria-readonly": he(this.trueReadonly),
		"data-disabled": pe(this.trueDisabled),
		"data-readonly": pe(this.trueReadonly),
		"data-state": kt(this.opts.checked.current, this.opts.indeterminate.current),
		[wt.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return m(this.#o);
	}
	set props(e) {
		W(this.#o, e);
	}
}, Ot = class e {
	static create() {
		return new e(Et.get());
	}
	root;
	#e = q(() => this.root.group ? !!(this.root.opts.value.current !== void 0 && this.root.group.opts.value.current.includes(this.root.opts.value.current)) : this.root.opts.checked.current);
	get trueChecked() {
		return m(this.#e);
	}
	set trueChecked(e) {
		W(this.#e, e);
	}
	#t = q(() => !!this.root.trueName);
	get shouldRender() {
		return m(this.#t);
	}
	set shouldRender(e) {
		W(this.#t, e);
	}
	constructor(e) {
		this.root = e, this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		it(this.root.opts.ref.current) && this.root.opts.ref.current.focus();
	}
	#n = q(() => ({
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
		return m(this.#n);
	}
	set props(e) {
		W(this.#n, e);
	}
};
function kt(e, t) {
	return t ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/hidden-input.svelte
var At = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value"
]), jt = U("<input/>");
function Mt(e, t) {
	s(t, !0);
	let n = M(t, "value", 15), r = K(t, At), i = q(() => De(r, {
		"aria-hidden": "true",
		tabindex: -1,
		style: {
			...Fe,
			position: "absolute",
			top: "0",
			left: "0"
		}
	}));
	var a = D(), c = g(a), l = (e) => {
		var t = jt();
		L(t, () => ({
			...m(i),
			value: n()
		}), void 0, void 0, void 0, void 0, !0), I(e, t);
	}, u = (e) => {
		var t = jt();
		L(t, () => ({ ...m(i) }), void 0, void 0, void 0, void 0, !0), h(t, n), I(e, t);
	};
	o(c, (e) => {
		m(i).type === "checkbox" ? e(l) : e(u, -1);
	}), I(e, a), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/checkbox/components/checkbox-input.svelte
function Nt(e, t) {
	s(t, !1);
	let n = Ot.create();
	re();
	var r = D(), i = g(r), a = (e) => {
		Mt(e, z(() => n.props));
	};
	o(i, (e) => {
		n.shouldRender && e(a);
	}), I(e, r), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/checkbox/components/checkbox.svelte
var Pt = new Set([
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
]), Ft = U("<button><!></button>"), It = U("<!> <!>", 1);
function Lt(e, t) {
	let n = J();
	s(t, !0);
	let i = M(t, "checked", 15, !1), a = M(t, "ref", 15, null), c = M(t, "disabled", 3, !1), l = M(t, "required", 3, !1), u = M(t, "name", 3, void 0), f = M(t, "value", 3, "on"), p = M(t, "id", 19, () => Oe(n)), h = M(t, "indeterminate", 15, !1), v = M(t, "type", 3, "button"), b = K(t, Pt), x = Tt.getOr(null);
	x && f() && (x.opts.value.current.includes(f()) ? i(!0) : i(!1)), ye.pre(() => f(), () => {
		x && f() && (x.opts.value.current.includes(f()) ? i(!0) : i(!1));
	});
	let C = Dt.create({
		checked: Q(() => i(), (e) => {
			i(e), t.onCheckedChange?.(e);
		}),
		disabled: Q(() => c() ?? !1),
		required: Q(() => l()),
		name: Q(() => u()),
		value: Q(() => f()),
		id: Q(() => p()),
		ref: Q(() => a(), (e) => a(e)),
		indeterminate: Q(() => h(), (e) => {
			h(e), t.onIndeterminateChange?.(e);
		}),
		type: Q(() => v()),
		readonly: Q(() => !!t.readonly)
	}, x), w = q(() => De({ ...b }, C.props));
	var T = It(), E = g(T), O = (e) => {
		var n = D(), r = g(n);
		{
			let e = q(() => ({
				props: m(w),
				...C.snippetProps
			}));
			d(r, () => t.child, () => m(e));
		}
		I(e, n);
	}, k = (e) => {
		var n = Ft();
		L(n, () => ({ ...m(w) })), d(S(n), () => t.children ?? V, () => C.snippetProps), _(n), I(e, n);
	};
	o(E, (e) => {
		t.child ? e(O) : e(k, -1);
	}), Nt(r(E, 2), {}), I(e, T), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/data-typeahead.svelte.js
var Rt = class {
	#e;
	#t = q(() => this.#e.candidateValues());
	#n;
	constructor(e) {
		this.#e = e, this.#n = Ce("", {
			afterMs: 1e3,
			getWindow: this.#e.getWindow
		}), this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this), this.resetTypeahead = this.resetTypeahead.bind(this);
	}
	handleTypeaheadSearch(e) {
		if (!this.#e.enabled() || !m(this.#t).length) return;
		this.#n.current = this.#n.current + e;
		let t = this.#e.getCurrentItem(), n = m(this.#t).find((e) => e === t) ?? "", r = Te(m(this.#t).map((e) => e ?? ""), this.#n.current, n), i = m(this.#t).find((e) => e === r);
		return i && this.#e.onMatch(i), i;
	}
	resetTypeahead() {
		this.#n.current = "";
	}
}, zt = [
	We,
	Ke,
	Qe,
	Ue,
	Xe,
	nt,
	"Alt",
	Ze,
	Ge,
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
], Bt = [
	Ye,
	qe,
	$e
], Vt = [
	tt,
	Je,
	"End"
], Ht = [...Bt, ...Vt], Ut = me({
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
}), Wt = new ae("Select.Root | Combobox.Root");
new ae("Select.Group | Combobox.Group");
var Gt = new ae("Select.Content | Combobox.Content"), Kt = class {
	opts;
	#e = A(!1);
	get touchedInput() {
		return m(this.#e);
	}
	set touchedInput(e) {
		W(this.#e, e, !0);
	}
	#t = A(null);
	get inputNode() {
		return m(this.#t);
	}
	set inputNode(e) {
		W(this.#t, e, !0);
	}
	#n = A(null);
	get contentNode() {
		return m(this.#n);
	}
	set contentNode(e) {
		W(this.#n, e, !0);
	}
	contentPresence;
	#r = A(null);
	get viewportNode() {
		return m(this.#r);
	}
	set viewportNode(e) {
		W(this.#r, e, !0);
	}
	#i = A(null);
	get triggerNode() {
		return m(this.#i);
	}
	set triggerNode(e) {
		W(this.#i, e, !0);
	}
	#a = A(null);
	get valueNode() {
		return m(this.#a);
	}
	set valueNode(e) {
		W(this.#a, e, !0);
	}
	#o = A("");
	get valueId() {
		return m(this.#o);
	}
	set valueId(e) {
		W(this.#o, e, !0);
	}
	#s = A(null);
	get highlightedNode() {
		return m(this.#s);
	}
	set highlightedNode(e) {
		W(this.#s, e, !0);
	}
	#c = q(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-value") : null);
	get highlightedValue() {
		return m(this.#c);
	}
	set highlightedValue(e) {
		W(this.#c, e);
	}
	#l = q(() => {
		if (this.highlightedNode) return this.highlightedNode.id;
	});
	get highlightedId() {
		return m(this.#l);
	}
	set highlightedId(e) {
		W(this.#l, e);
	}
	#u = q(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-label") : null);
	get highlightedLabel() {
		return m(this.#u);
	}
	set highlightedLabel(e) {
		W(this.#u, e);
	}
	#d = A(!1);
	get contentIsPositioned() {
		return m(this.#d);
	}
	set contentIsPositioned(e) {
		W(this.#d, e, !0);
	}
	isUsingKeyboard = !1;
	isCombobox = !1;
	domContext = new ke(() => null);
	constructor(e) {
		this.opts = e, this.isCombobox = e.isCombobox, this.contentPresence = new ot({
			ref: Q(() => this.contentNode),
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
	getBitsAttr = (e) => Ut.getAttr(e, this.isCombobox ? "combobox" : void 0);
}, qt = class extends Kt {
	opts;
	isMulti = !1;
	#e = q(() => this.opts.value.current !== "");
	get hasValue() {
		return m(this.#e);
	}
	set hasValue(e) {
		W(this.#e, e);
	}
	#t = q(() => this.opts.items.current.length ? this.opts.items.current.find((e) => e.value === this.opts.value.current)?.label ?? "" : "");
	get currentLabel() {
		return m(this.#t);
	}
	set currentLabel(e) {
		W(this.#t, e);
	}
	#n = q(() => this.opts.items.current.length ? this.opts.items.current.filter((e) => !e.disabled).map((e) => e.label) : []);
	get candidateLabels() {
		return m(this.#n);
	}
	set candidateLabels(e) {
		W(this.#n, e);
	}
	#r = q(() => !(this.isMulti || this.opts.items.current.length === 0));
	get dataTypeaheadEnabled() {
		return m(this.#r);
	}
	set dataTypeaheadEnabled(e) {
		W(this.#r, e);
	}
	constructor(e) {
		super(e), this.opts = e, a(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), ye(() => this.opts.open.current, () => {
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
		ue(() => {
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
}, Jt = class extends Kt {
	opts;
	isMulti = !0;
	#e = q(() => this.opts.value.current.length > 0);
	get hasValue() {
		return m(this.#e);
	}
	set hasValue(e) {
		W(this.#e, e);
	}
	constructor(e) {
		super(e), this.opts = e, a(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), ye(() => this.opts.open.current, () => {
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
		ue(() => {
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
}, Yt = class {
	static create(e) {
		let { type: t, ...n } = e, r = t === "single" ? new qt(n) : new Jt(n);
		return Wt.set(r);
	}
}, Xt = class e {
	static create(t) {
		return new e(t, Wt.get());
	}
	root;
	opts;
	attachment;
	constructor(e, t) {
		this.root = t, this.opts = e, this.attachment = le(e.ref, (e) => this.root.valueNode = e), this.setValue = this.setValue.bind(this);
	}
	setValue(e) {
		this.root.isMulti && !Array.isArray(e) || !this.root.isMulti && typeof e != "string" || (this.root.opts.value.current = e);
	}
	#e = q(() => {
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
		return m(this.#e);
	}
	set snippetProps(e) {
		W(this.#e, e);
	}
	#t = q(() => ({
		id: this.opts.id.current,
		"data-placeholder": this.root.hasValue ? void 0 : "",
		"data-select-value": "",
		...this.attachment
	}));
	get props() {
		return m(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
}, Zt = class e {
	static create(t) {
		return new e(t, Wt.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = le(e.ref, (e) => this.root.inputNode = e), this.root.domContext = new ke(e.ref), this.onkeydown = this.onkeydown.bind(this), this.oninput = this.oninput.bind(this), ye([() => this.root.opts.value.current, () => this.opts.clearOnDeselect.current], ([e, t], [n]) => {
			t && (Array.isArray(e) && Array.isArray(n) ? e.length === 0 && n.length !== 0 && (this.root.opts.inputValue.current = "") : e === "" && n !== "" && (this.root.opts.inputValue.current = ""));
		});
	}
	onkeydown(e) {
		if (this.root.isUsingKeyboard = !0, e.key !== "Escape") {
			if ((e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault(), !this.root.opts.open.current) {
				if (zt.includes(e.key) || e.key === "Tab" || e.key === "Backspace" && this.root.opts.inputValue.current === "" || (this.root.handleOpen(), this.root.hasValue)) return;
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
			if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), Ht.includes(e.key)) {
				e.preventDefault();
				let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
				if (e.key === "ArrowDown" ? a = Ee(t, r, i) : e.key === "ArrowUp" ? a = xe(t, r, i) : e.key === "PageDown" ? a = be(t, r, 10, i) : e.key === "PageUp" ? a = Se(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
				this.root.setHighlightedNode(a);
				return;
			}
			zt.includes(e.key) || this.root.highlightedNode || this.root.setHighlightedToFirstCandidate();
		}
	}
	oninput(e) {
		this.root.opts.inputValue.current = e.currentTarget.value, this.root.setHighlightedToFirstCandidate();
	}
	#e = q(() => ({
		id: this.opts.id.current,
		role: "combobox",
		disabled: this.root.opts.disabled.current ? !0 : void 0,
		"aria-activedescendant": this.root.highlightedId,
		"aria-autocomplete": "list",
		"aria-expanded": he(this.root.opts.open.current),
		"data-state": fe(this.root.opts.open.current),
		"data-disabled": pe(this.root.opts.disabled.current),
		onkeydown: this.onkeydown,
		oninput: this.oninput,
		[this.root.getBitsAttr("input")]: "",
		...this.attachment
	}));
	get props() {
		return m(this.#e);
	}
	set props(e) {
		W(this.#e, e);
	}
}, Qt = class e {
	static create(t) {
		return new e(t, Wt.get());
	}
	opts;
	root;
	attachment;
	#e;
	#t;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = le(e.ref, (e) => this.root.triggerNode = e), this.root.domContext = new ke(e.ref), this.#e = new we({
			getCurrentItem: () => this.root.highlightedNode,
			onMatch: (e) => {
				this.root.setHighlightedNode(e);
			},
			getActiveElement: () => this.root.domContext.getActiveElement(),
			getWindow: () => this.root.domContext.getWindow()
		}), this.#t = new Rt({
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
		if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), Ht.includes(e.key)) {
			e.preventDefault();
			let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
			if (e.key === "ArrowDown" ? a = Ee(t, r, i) : e.key === "ArrowUp" ? a = xe(t, r, i) : e.key === "PageDown" ? a = be(t, r, 10, i) : e.key === "PageUp" ? a = Se(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
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
	#a = q(() => ({
		id: this.opts.id.current,
		disabled: this.root.opts.disabled.current ? !0 : void 0,
		"aria-haspopup": "listbox",
		"aria-expanded": he(this.root.opts.open.current),
		"aria-activedescendant": this.root.highlightedId,
		"data-state": fe(this.root.opts.open.current),
		"data-disabled": pe(this.root.opts.disabled.current),
		"data-placeholder": this.root.hasValue ? void 0 : "",
		[this.root.getBitsAttr("trigger")]: "",
		onpointerdown: this.onpointerdown,
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		onpointerup: this.onpointerup,
		...this.attachment
	}));
	get props() {
		return m(this.#a);
	}
	set props(e) {
		W(this.#a, e);
	}
}, $t = class e {
	static create(t) {
		return Gt.set(new e(t, Wt.get()));
	}
	opts;
	root;
	attachment;
	#e = A(!1);
	get isPositioned() {
		return m(this.#e);
	}
	set isPositioned(e) {
		W(this.#e, e, !0);
	}
	domContext;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = le(e.ref, (e) => this.root.contentNode = e), this.domContext = new ke(this.opts.ref), this.root.domContext === null && (this.root.domContext = this.domContext), oe(() => {
			this.root.contentNode = null, this.root.contentIsPositioned = !1, this.isPositioned = !1;
		}), ye(() => this.root.opts.open.current, () => {
			this.root.opts.open.current || (this.root.contentIsPositioned = !1, this.isPositioned = !1);
		}), ye([() => this.isPositioned, () => this.root.highlightedNode], () => {
			!this.isPositioned || !this.root.highlightedNode || this.root.scrollHighlightedNodeIntoView(this.root.highlightedNode);
		}), this.onpointermove = this.onpointermove.bind(this);
	}
	onpointermove(e) {
		this.root.isUsingKeyboard = !1;
	}
	#t = q(() => mt(this.root.isCombobox ? "combobox" : "select"));
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
	#n = q(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return m(this.#n);
	}
	set snippetProps(e) {
		W(this.#n, e);
	}
	#r = q(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-multiselectable": this.root.isMulti ? "true" : void 0,
		"data-state": fe(this.root.opts.open.current),
		..._e(this.root.contentPresence.transitionStatus),
		[this.root.getBitsAttr("content")]: "",
		style: {
			display: "flex",
			flexDirection: "column",
			outline: "none",
			boxSizing: "border-box",
			pointerEvents: "auto",
			...m(this.#t)
		},
		onpointermove: this.onpointermove,
		...this.attachment
	}));
	get props() {
		return m(this.#r);
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
}, en = class e {
	static create(t) {
		return new e(t, Wt.get());
	}
	opts;
	root;
	attachment;
	#e = q(() => this.root.includesItem(this.opts.value.current));
	get isSelected() {
		return m(this.#e);
	}
	set isSelected(e) {
		W(this.#e, e);
	}
	#t = q(() => this.root.highlightedValue === this.opts.value.current);
	get isHighlighted() {
		return m(this.#t);
	}
	set isHighlighted(e) {
		W(this.#t, e);
	}
	prevHighlighted = new ve(() => this.isHighlighted);
	#n = A(!1);
	get mounted() {
		return m(this.#n);
	}
	set mounted(e) {
		W(this.#n, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = le(e.ref), ye([() => this.isHighlighted, () => this.prevHighlighted.current], () => {
			this.isHighlighted ? this.opts.onHighlight.current() : this.prevHighlighted.current && this.opts.onUnhighlight.current();
		}), ye(() => this.mounted, () => {
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
	#r = q(() => ({
		selected: this.isSelected,
		highlighted: this.isHighlighted
	}));
	get snippetProps() {
		return m(this.#r);
	}
	set snippetProps(e) {
		W(this.#r, e);
	}
	onpointerdown(e) {
		e.preventDefault();
	}
	onpointerup(e) {
		if (!(e.defaultPrevented || !this.opts.ref.current)) {
			if (e.pointerType === "touch" && !at) {
				w(this.opts.ref.current, "click", () => {
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
	#i = q(() => ({
		id: this.opts.id.current,
		role: "option",
		"aria-selected": this.root.includesItem(this.opts.value.current) ? "true" : void 0,
		"data-value": this.opts.value.current,
		"data-disabled": pe(this.opts.disabled.current),
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
		return m(this.#i);
	}
	set props(e) {
		W(this.#i, e);
	}
}, tn = class e {
	static create(t) {
		return new e(t, Wt.get());
	}
	opts;
	root;
	#e = q(() => this.root.opts.name.current !== "");
	get shouldRender() {
		return m(this.#e);
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
	#t = q(() => ({
		disabled: se(this.root.opts.disabled.current),
		required: se(this.root.opts.required.current),
		name: this.root.opts.name.current,
		value: this.opts.value.current,
		onfocus: this.onfocus
	}));
	get props() {
		return m(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
}, nn = class e {
	static create(t) {
		return new e(t, Gt.get());
	}
	opts;
	content;
	root;
	attachment;
	#e = A(0);
	get prevScrollTop() {
		return m(this.#e);
	}
	set prevScrollTop(e) {
		W(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = le(e.ref, (e) => {
			this.root.viewportNode = e;
		});
	}
	#t = q(() => ({
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
		return m(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
}, rn = class {
	opts;
	content;
	root;
	attachment;
	autoScrollTimer = null;
	userScrollTimer = -1;
	isUserScrolling = !1;
	onAutoScroll = et;
	#e = A(!1);
	get mounted() {
		return m(this.#e);
	}
	set mounted(e) {
		W(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = le(e.ref), ye([() => this.mounted], () => {
			if (!this.mounted) {
				this.isUserScrolling = !1;
				return;
			}
			this.isUserScrolling;
		}), a(() => {
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
	#t = q(() => ({
		id: this.opts.id.current,
		"aria-hidden": de(!0),
		style: { flexShrink: 0 },
		onpointerdown: this.onpointerdown,
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		...this.attachment
	}));
	get props() {
		return m(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
}, an = class e {
	static create(t) {
		return new e(new rn(t, Gt.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = A(!1);
	get canScrollDown() {
		return m(this.#e);
	}
	set canScrollDown(e) {
		W(this.#e, e, !0);
	}
	scrollIntoViewTimer = null;
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, ye([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), w(this.root.viewportNode, "scroll", () => this.handleScroll());
		}), ye([
			() => this.root.opts.inputValue.current,
			() => this.root.viewportNode,
			() => this.content.isPositioned
		], () => {
			!this.root.viewportNode || !this.content.isPositioned || this.handleScroll(!0);
		}), ye(() => this.scrollButtonState.mounted, () => {
			this.scrollButtonState.mounted && (this.scrollIntoViewTimer && clearTimeout(this.scrollIntoViewTimer), this.scrollIntoViewTimer = rt(5, () => {
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
	#t = q(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-down-button")]: ""
	}));
	get props() {
		return m(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
}, on = class e {
	static create(t) {
		return new e(new rn(t, Gt.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = A(!1);
	get canScrollUp() {
		return m(this.#e);
	}
	set canScrollUp(e) {
		W(this.#e, e, !0);
	}
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, ye([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), w(this.root.viewportNode, "scroll", () => this.handleScroll());
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
	#t = q(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-up-button")]: ""
	}));
	get props() {
		return m(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-hidden-input.svelte
function sn(e, t) {
	s(t, !0);
	let n = M(t, "value", 15), r = tn.create({ value: Q(() => n()) });
	var i = D(), a = g(i), c = (e) => {
		Mt(e, z(() => r.props, {
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
	o(a, (e) => {
		r.shouldRender && e(c);
	}), I(e, i), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/combobox/components/combobox.svelte
var cn = U("<!> <!>", 1);
function ln(e, t) {
	s(t, !0);
	let n = M(t, "value", 15), i = M(t, "onValueChange", 3, et), a = M(t, "name", 3, ""), c = M(t, "disabled", 3, !1), l = M(t, "open", 15, !1), u = M(t, "onOpenChange", 3, et), f = M(t, "onOpenChangeComplete", 3, et), p = M(t, "loop", 3, !1), h = M(t, "scrollAlignment", 3, "nearest"), _ = M(t, "required", 3, !1), v = M(t, "items", 19, () => []), x = M(t, "allowDeselect", 3, !0), S = M(t, "inputValue", 7, "");
	n() === void 0 && n(t.type === "single" ? "" : []), ye.pre(() => n(), () => {
		n() === void 0 && n(t.type === "single" ? "" : []);
	});
	let C = Yt.create({
		type: t.type,
		value: Q(() => n(), (e) => {
			n(e), i()(e);
		}),
		disabled: Q(() => c()),
		required: Q(() => _()),
		open: Q(() => l(), (e) => {
			l(e), u()(e);
		}),
		loop: Q(() => p()),
		scrollAlignment: Q(() => h()),
		name: Q(() => a()),
		isCombobox: !0,
		items: Q(() => v()),
		allowDeselect: Q(() => x()),
		inputValue: Q(() => S(), (e) => S(e)),
		onOpenChangeComplete: Q(() => f())
	});
	var w = cn(), T = g(w);
	gt(T, {
		children: (e, n) => {
			var r = D();
			d(g(r), () => t.children ?? V), I(e, r);
		},
		$$slots: { default: !0 }
	});
	var E = r(T, 2), O = (e) => {
		var t = D(), n = g(t), r = (e) => {
			var t = D();
			b(g(t), 16, () => C.opts.value.current, (e) => e, (e, t) => {
				sn(e, { get value() {
					return t;
				} });
			}), I(e, t);
		};
		o(n, (e) => {
			C.opts.value.current.length && e(r);
		}), I(e, t);
	}, k = q(() => Array.isArray(C.opts.value.current)), A = (e) => {
		sn(e, {
			get value() {
				return C.opts.value.current;
			},
			set value(e) {
				C.opts.value.current = e;
			}
		});
	};
	o(E, (e) => {
		m(k) ? e(O) : e(A, -1);
	}), I(e, w), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/combobox/components/combobox-input.svelte
var un = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"defaultValue",
	"clearOnDeselect"
]), dn = U("<input/>");
function fn(e, t) {
	s(t, !0);
	let n = M(t, "id", 19, Ae), r = M(t, "ref", 15, null), a = M(t, "clearOnDeselect", 3, !1), c = K(t, un), l = Zt.create({
		id: Q(() => n()),
		ref: Q(() => r(), (e) => r(e)),
		clearOnDeselect: Q(() => a())
	});
	t.defaultValue && (l.root.opts.inputValue.current = t.defaultValue);
	let u = q(() => De(c, l.props, { value: l.root.opts.inputValue.current }));
	var f = D();
	i(g(f), () => vt, (e, r) => {
		r(e, {
			get id() {
				return n();
			},
			get ref() {
				return l.opts.ref;
			},
			children: (e, n) => {
				var r = D(), i = g(r), a = (e) => {
					var n = D();
					d(g(n), () => t.child, () => ({ props: m(u) })), I(e, n);
				}, s = (e) => {
					var t = dn();
					L(t, () => ({ ...m(u) }), void 0, void 0, void 0, void 0, !0), I(e, t);
				};
				o(i, (e) => {
					t.child ? e(a) : e(s, -1);
				}), I(e, r);
			},
			$$slots: { default: !0 }
		});
	}), I(e, f), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-content.svelte
var pn = new Set([
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
]), mn = U("<div><div><!></div></div>");
function hn(e, t) {
	let n = J();
	s(t, !0);
	let r = M(t, "id", 19, () => Oe(n)), i = M(t, "ref", 15, null), a = M(t, "forceMount", 3, !1), c = M(t, "side", 3, "bottom"), l = M(t, "onInteractOutside", 3, et), u = M(t, "onEscapeKeydown", 3, et), f = M(t, "preventScroll", 3, !1), p = K(t, pn), h = $t.create({
		id: Q(() => r()),
		ref: Q(() => i(), (e) => i(e)),
		onInteractOutside: Q(() => l()),
		onEscapeKeydown: Q(() => u())
	}), v = q(() => De(p, h.props));
	var b = D(), x = g(b), C = (e) => {
		_t(e, z(() => m(v), () => h.popperProps, {
			get ref() {
				return h.opts.ref;
			},
			get side() {
				return c();
			},
			get enabled() {
				return h.root.opts.open.current;
			},
			get id() {
				return r();
			},
			get preventScroll() {
				return f();
			},
			forceMount: !0,
			get shouldRender() {
				return h.shouldRender;
			},
			popper: (e, n) => {
				let r = () => n?.().props, i = () => n?.().wrapperProps, a = q(() => De(r(), { style: h.props.style }, { style: t.style }));
				var s = D(), c = g(s), l = (e) => {
					var n = D(), r = g(n);
					{
						let e = q(() => ({
							props: m(a),
							wrapperProps: i(),
							...h.snippetProps
						}));
						d(r, () => t.child, () => m(e));
					}
					I(e, n);
				}, u = (e) => {
					var n = mn();
					L(n, () => ({ ...i() }));
					var r = S(n);
					L(r, () => ({ ...m(a) })), d(S(r), () => t.children ?? V), _(r), _(n), I(e, n);
				};
				o(c, (e) => {
					t.child ? e(l) : e(u, -1);
				}), I(e, s);
			},
			$$slots: { popper: !0 }
		}));
	}, w = (e) => {
		ht(e, z(() => m(v), () => h.popperProps, {
			get ref() {
				return h.opts.ref;
			},
			get side() {
				return c();
			},
			get open() {
				return h.root.opts.open.current;
			},
			get id() {
				return r();
			},
			get preventScroll() {
				return f();
			},
			forceMount: !1,
			get shouldRender() {
				return h.shouldRender;
			},
			popper: (e, n) => {
				let r = () => n?.().props, i = () => n?.().wrapperProps, a = q(() => De(r(), { style: h.props.style }, { style: t.style }));
				var s = D(), c = g(s), l = (e) => {
					var n = D(), r = g(n);
					{
						let e = q(() => ({
							props: m(a),
							wrapperProps: i(),
							...h.snippetProps
						}));
						d(r, () => t.child, () => m(e));
					}
					I(e, n);
				}, u = (e) => {
					var n = mn();
					L(n, () => ({ ...i() }));
					var r = S(n);
					L(r, () => ({ ...m(a) })), d(S(r), () => t.children ?? V), _(r), _(n), I(e, n);
				};
				o(c, (e) => {
					t.child ? e(l) : e(u, -1);
				}), I(e, s);
			},
			$$slots: { popper: !0 }
		}));
	};
	o(x, (e) => {
		a() ? e(C) : a() || e(w, 1);
	}), I(e, b), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/mounted.svelte
function gn(e, t) {
	s(t, !0);
	let n = M(t, "mounted", 15, !1), r = M(t, "onMountedChange", 3, et);
	He(() => (n(!0), r()(!0), () => {
		n(!1), r()(!1);
	})), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-item.svelte
var _n = new Set([
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
]), vn = U("<div><!></div>"), yn = U("<!> <!>", 1);
function bn(e, t) {
	let n = J();
	s(t, !0);
	let i = M(t, "id", 19, () => Oe(n)), a = M(t, "ref", 15, null), c = M(t, "label", 19, () => t.value), l = M(t, "disabled", 3, !1), u = M(t, "onHighlight", 3, et), f = M(t, "onUnhighlight", 3, et), p = K(t, _n), h = en.create({
		id: Q(() => i()),
		ref: Q(() => a(), (e) => a(e)),
		value: Q(() => t.value),
		disabled: Q(() => l()),
		label: Q(() => c()),
		onHighlight: Q(() => u()),
		onUnhighlight: Q(() => f())
	}), v = q(() => De(p, h.props));
	var b = yn(), x = g(b), C = (e) => {
		var n = D(), r = g(n);
		{
			let e = q(() => ({
				props: m(v),
				...h.snippetProps
			}));
			d(r, () => t.child, () => m(e));
		}
		I(e, n);
	}, w = (e) => {
		var n = vn();
		L(n, () => ({ ...m(v) })), d(S(n), () => t.children ?? V, () => h.snippetProps), _(n), I(e, n);
	};
	o(x, (e) => {
		t.child ? e(C) : e(w, -1);
	}), gn(r(x, 2), {
		get mounted() {
			return h.mounted;
		},
		set mounted(e) {
			h.mounted = e;
		}
	}), I(e, b), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-viewport.svelte
var xn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), Sn = U("<div><!></div>"), Cn = {
	hash: "svelte-1j45ufl",
	code: "\n	/* Hide scrollbars cross browser and enable momentum scroll for touch devices */[data-select-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport]::-webkit-scrollbar {display:none !important;}[data-select-viewport]::-webkit-scrollbar {display:none !important;}"
};
function wn(e, t) {
	let n = J();
	s(t, !0), ne(e, Cn);
	let r = M(t, "id", 19, () => Oe(n)), i = M(t, "ref", 15, null), a = K(t, xn), c = nn.create({
		id: Q(() => r()),
		ref: Q(() => i(), (e) => i(e))
	}), l = q(() => De(a, c.props));
	var u = D(), f = g(u), p = (e) => {
		var n = D();
		d(g(n), () => t.child, () => ({ props: m(l) })), I(e, n);
	}, h = (e) => {
		var n = Sn();
		L(n, () => ({ ...m(l) })), d(S(n), () => t.children ?? V), _(n), I(e, n);
	};
	o(f, (e) => {
		t.child ? e(p) : e(h, -1);
	}), I(e, u), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-scroll-down-button.svelte
var Tn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), En = U("<div><!></div>"), Dn = U("<!> <!>", 1);
function On(e, t) {
	let n = J();
	s(t, !0);
	let i = M(t, "id", 19, () => Oe(n)), a = M(t, "ref", 15, null), c = M(t, "delay", 3, () => 50), l = K(t, Tn), u = an.create({
		id: Q(() => i()),
		ref: Q(() => a(), (e) => a(e)),
		delay: Q(() => c())
	}), f = q(() => De(l, u.props));
	var p = D(), h = g(p), v = (e) => {
		var n = Dn(), i = g(n);
		gn(i, {
			get mounted() {
				return u.scrollButtonState.mounted;
			},
			set mounted(e) {
				u.scrollButtonState.mounted = e;
			}
		});
		var a = r(i, 2), s = (e) => {
			var n = D();
			d(g(n), () => t.child, () => ({ props: l })), I(e, n);
		}, c = (e) => {
			var n = En();
			L(n, () => ({ ...m(f) })), d(S(n), () => t.children ?? V), _(n), I(e, n);
		};
		o(a, (e) => {
			t.child ? e(s) : e(c, -1);
		}), I(e, n);
	};
	o(h, (e) => {
		u.canScrollDown && e(v);
	}), I(e, p), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-scroll-up-button.svelte
var kn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), An = U("<div><!></div>"), jn = U("<!> <!>", 1);
function Mn(e, t) {
	let n = J();
	s(t, !0);
	let i = M(t, "id", 19, () => Oe(n)), a = M(t, "ref", 15, null), c = M(t, "delay", 3, () => 50), l = K(t, kn), u = on.create({
		id: Q(() => i()),
		ref: Q(() => a(), (e) => a(e)),
		delay: Q(() => c())
	}), f = q(() => De(l, u.props));
	var p = D(), h = g(p), v = (e) => {
		var n = jn(), i = g(n);
		gn(i, {
			get mounted() {
				return u.scrollButtonState.mounted;
			},
			set mounted(e) {
				u.scrollButtonState.mounted = e;
			}
		});
		var a = r(i, 2), s = (e) => {
			var n = D();
			d(g(n), () => t.child, () => ({ props: l })), I(e, n);
		}, c = (e) => {
			var n = An();
			L(n, () => ({ ...m(f) })), d(S(n), () => t.children ?? V), _(n), I(e, n);
		};
		o(a, (e) => {
			t.child ? e(s) : e(c, -1);
		}), I(e, n);
	};
	o(h, (e) => {
		u.canScrollUp && e(v);
	}), I(e, p), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/label/label.svelte.js
var Nn = me({
	component: "label",
	parts: ["root"]
}), Pn = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = le(this.opts.ref), this.onmousedown = this.onmousedown.bind(this);
	}
	onmousedown(e) {
		e.detail > 1 && e.preventDefault();
	}
	#e = q(() => ({
		id: this.opts.id.current,
		[Nn.root]: "",
		onmousedown: this.onmousedown,
		...this.attachment
	}));
	get props() {
		return m(this.#e);
	}
	set props(e) {
		W(this.#e, e);
	}
}, Fn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"for"
]), In = U("<label><!></label>");
function Ln(e, t) {
	let n = J();
	s(t, !0);
	let r = M(t, "id", 19, () => Oe(n)), i = M(t, "ref", 15, null), a = K(t, Fn), c = Pn.create({
		id: Q(() => r()),
		ref: Q(() => i(), (e) => i(e))
	}), l = q(() => De(a, c.props, { for: t.for }));
	var u = D(), f = g(u), p = (e) => {
		var n = D();
		d(g(n), () => t.child, () => ({ props: m(l) })), I(e, n);
	}, h = (e) => {
		var n = In();
		L(n, () => ({
			...m(l),
			for: t.for
		})), d(S(n), () => t.children ?? V), _(n), I(e, n);
	};
	o(f, (e) => {
		t.child ? e(p) : e(h, -1);
	}), I(e, u), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select.svelte
var Rn = U("<!> <!>", 1);
function zn(e, t) {
	s(t, !0);
	let n = M(t, "value", 15), i = M(t, "onValueChange", 3, et), a = M(t, "name", 3, ""), c = M(t, "disabled", 3, !1), l = M(t, "open", 15, !1), u = M(t, "onOpenChange", 3, et), f = M(t, "onOpenChangeComplete", 3, et), p = M(t, "loop", 3, !1), h = M(t, "scrollAlignment", 3, "nearest"), _ = M(t, "required", 3, !1), v = M(t, "items", 19, () => []), x = M(t, "allowDeselect", 3, !1);
	function S() {
		n() === void 0 && n(t.type === "single" ? "" : []);
	}
	S(), ye.pre(() => n(), () => {
		S();
	});
	let C = A(""), w = Yt.create({
		type: t.type,
		value: Q(() => n(), (e) => {
			n(e), i()(e);
		}),
		disabled: Q(() => c()),
		required: Q(() => _()),
		open: Q(() => l(), (e) => {
			l(e), u()(e);
		}),
		loop: Q(() => p()),
		scrollAlignment: Q(() => h()),
		name: Q(() => a()),
		isCombobox: !1,
		items: Q(() => v()),
		allowDeselect: Q(() => x()),
		inputValue: Q(() => m(C), (e) => W(C, e, !0)),
		onOpenChangeComplete: Q(() => f())
	});
	var T = Rn(), E = g(T);
	gt(E, {
		children: (e, n) => {
			var r = D();
			d(g(r), () => t.children ?? V), I(e, r);
		},
		$$slots: { default: !0 }
	});
	var O = r(E, 2), k = (e) => {
		var n = D(), r = g(n), i = (e) => {
			sn(e, { get autocomplete() {
				return t.autocomplete;
			} });
		}, a = (e) => {
			var n = D();
			b(g(n), 16, () => w.opts.value.current, (e) => e, (e, n) => {
				sn(e, {
					get value() {
						return n;
					},
					get autocomplete() {
						return t.autocomplete;
					}
				});
			}), I(e, n);
		};
		o(r, (e) => {
			w.opts.value.current.length === 0 ? e(i) : e(a, -1);
		}), I(e, n);
	}, j = q(() => Array.isArray(w.opts.value.current)), N = (e) => {
		sn(e, {
			get autocomplete() {
				return t.autocomplete;
			},
			get value() {
				return w.opts.value.current;
			},
			set value(e) {
				w.opts.value.current = e;
			}
		});
	};
	o(O, (e) => {
		m(j) ? e(k) : e(N, -1);
	}), I(e, T), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-value.svelte
var Bn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"placeholder",
	"child",
	"children"
]), Vn = U("<span><!></span>");
function Hn(e, t) {
	let n = J();
	s(t, !0);
	let r = M(t, "ref", 15, null), i = M(t, "id", 19, () => Oe(n)), a = K(t, Bn), c = Xt.create({
		id: Q(() => i()),
		ref: Q(() => r(), (e) => r(e)),
		placeholder: Q(() => t.placeholder)
	}), l = q(() => De(a, c.props));
	var u = D(), f = g(u), p = (e) => {
		var n = D(), r = g(n);
		{
			let e = q(() => ({
				props: m(l),
				...c.snippetProps
			}));
			d(r, () => t.child, () => m(e));
		}
		I(e, n);
	}, h = (e) => {
		var n = Vn();
		L(n, () => ({ ...m(l) }));
		var r = S(n), i = (e) => {
			var n = D();
			d(g(n), () => t.children ?? V, () => c.snippetProps), I(e, n);
		}, a = (e) => {
			var n = j();
			x(() => H(n, c.snippetProps.selection.selected?.label ?? t.placeholder)), I(e, n);
		}, s = (e) => {
			var n = j();
			x((e) => H(n, e), [() => c.snippetProps.selection.selected.length > 0 ? c.snippetProps.selection.selected.map((e) => e.label).join(", ") : t.placeholder]), I(e, n);
		}, u = (e) => {
			var n = j();
			x(() => H(n, t.placeholder)), I(e, n);
		};
		o(r, (e) => {
			t.children ? e(i) : c.snippetProps.selection.type === "single" ? e(a, 1) : c.snippetProps.selection.type === "multiple" && c.snippetProps.selection.selected ? e(s, 2) : e(u, -1);
		}), _(n), I(e, n);
	};
	o(f, (e) => {
		t.child ? e(p) : e(h, -1);
	}), I(e, u), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-trigger.svelte
var Un = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"type"
]), Wn = U("<button><!></button>");
function Gn(e, t) {
	let n = J();
	s(t, !0);
	let r = M(t, "id", 19, () => Oe(n)), a = M(t, "ref", 15, null), c = M(t, "type", 3, "button"), l = K(t, Un), u = Qt.create({
		id: Q(() => r()),
		ref: Q(() => a(), (e) => a(e))
	}), f = q(() => De(l, u.props, { type: c() }));
	var p = D();
	i(g(p), () => vt, (e, n) => {
		n(e, {
			get id() {
				return r();
			},
			get ref() {
				return u.opts.ref;
			},
			children: (e, n) => {
				var r = D(), i = g(r), a = (e) => {
					var n = D();
					d(g(n), () => t.child, () => ({ props: m(f) })), I(e, n);
				}, s = (e) => {
					var n = Wn();
					L(n, () => ({ ...m(f) })), d(S(n), () => t.children ?? V), _(n), I(e, n);
				};
				o(i, (e) => {
					t.child ? e(a) : e(s, -1);
				}), I(e, r);
			},
			$$slots: { default: !0 }
		});
	}), I(e, p), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/switch.svelte.js
var Kn = me({
	component: "switch",
	parts: ["root", "thumb"]
}), qn = new ae("Switch.Root"), Jn = class e {
	static create(t) {
		return qn.set(new e(t));
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = le(e.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this);
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
	#t = q(() => ({
		"data-disabled": pe(this.opts.disabled.current),
		"data-state": ce(this.opts.checked.current),
		"data-required": pe(this.opts.required.current)
	}));
	get sharedProps() {
		return m(this.#t);
	}
	set sharedProps(e) {
		W(this.#t, e);
	}
	#n = q(() => ({ checked: this.opts.checked.current }));
	get snippetProps() {
		return m(this.#n);
	}
	set snippetProps(e) {
		W(this.#n, e);
	}
	#r = q(() => ({
		...this.sharedProps,
		id: this.opts.id.current,
		role: "switch",
		disabled: se(this.opts.disabled.current),
		"aria-checked": ge(this.opts.checked.current, !1),
		"aria-required": he(this.opts.required.current),
		[Kn.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return m(this.#r);
	}
	set props(e) {
		W(this.#r, e);
	}
}, Yn = class e {
	static create() {
		return new e(qn.get());
	}
	root;
	#e = q(() => this.root.opts.name.current !== void 0);
	get shouldRender() {
		return m(this.#e);
	}
	set shouldRender(e) {
		W(this.#e, e);
	}
	constructor(e) {
		this.root = e;
	}
	#t = q(() => ({
		type: "checkbox",
		name: this.root.opts.name.current,
		value: this.root.opts.value.current,
		checked: this.root.opts.checked.current,
		disabled: this.root.opts.disabled.current,
		required: this.root.opts.required.current
	}));
	get props() {
		return m(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
}, Xn = class e {
	static create(t) {
		return new e(t, qn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = le(e.ref);
	}
	#e = q(() => ({ checked: this.root.opts.checked.current }));
	get snippetProps() {
		return m(this.#e);
	}
	set snippetProps(e) {
		W(this.#e, e);
	}
	#t = q(() => ({
		...this.root.sharedProps,
		id: this.opts.id.current,
		[Kn.thumb]: "",
		...this.attachment
	}));
	get props() {
		return m(this.#t);
	}
	set props(e) {
		W(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/components/switch-input.svelte
function Zn(e, t) {
	s(t, !1);
	let n = Yn.create();
	re();
	var r = D(), i = g(r), a = (e) => {
		Mt(e, z(() => n.props));
	};
	o(i, (e) => {
		n.shouldRender && e(a);
	}), I(e, r), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/components/switch.svelte
var Qn = new Set([
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
]), $n = U("<button><!></button>"), er = U("<!> <!>", 1);
function tr(e, t) {
	let n = J();
	s(t, !0);
	let i = M(t, "ref", 15, null), a = M(t, "id", 19, () => Oe(n)), c = M(t, "disabled", 3, !1), l = M(t, "required", 3, !1), u = M(t, "checked", 15, !1), f = M(t, "value", 3, "on"), p = M(t, "name", 3, void 0), h = M(t, "type", 3, "button"), v = M(t, "onCheckedChange", 3, et), b = K(t, Qn), x = Jn.create({
		checked: Q(() => u(), (e) => {
			u(e), v()?.(e);
		}),
		disabled: Q(() => c() ?? !1),
		required: Q(() => l()),
		value: Q(() => f()),
		name: Q(() => p()),
		id: Q(() => a()),
		ref: Q(() => i(), (e) => i(e))
	}), C = q(() => De(b, x.props, { type: h() }));
	var w = er(), T = g(w), E = (e) => {
		var n = D(), r = g(n);
		{
			let e = q(() => ({
				props: m(C),
				...x.snippetProps
			}));
			d(r, () => t.child, () => m(e));
		}
		I(e, n);
	}, O = (e) => {
		var n = $n();
		L(n, () => ({ ...m(C) })), d(S(n), () => t.children ?? V, () => x.snippetProps), _(n), I(e, n);
	};
	o(T, (e) => {
		t.child ? e(E) : e(O, -1);
	}), Zn(r(T, 2), {}), I(e, w), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/components/switch-thumb.svelte
var nr = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"ref",
	"id"
]), rr = U("<span><!></span>");
function ir(e, t) {
	let n = J();
	s(t, !0);
	let r = M(t, "ref", 15, null), i = M(t, "id", 19, () => Oe(n)), a = K(t, nr), c = Xn.create({
		id: Q(() => i()),
		ref: Q(() => r(), (e) => r(e))
	}), l = q(() => De(a, c.props));
	var u = D(), f = g(u), p = (e) => {
		var n = D(), r = g(n);
		{
			let e = q(() => ({
				props: m(l),
				...c.snippetProps
			}));
			d(r, () => t.child, () => m(e));
		}
		I(e, n);
	}, h = (e) => {
		var n = rr();
		L(n, () => ({ ...m(l) })), d(S(n), () => t.children ?? V, () => c.snippetProps), _(n), I(e, n);
	};
	o(f, (e) => {
		t.child ? e(p) : e(h, -1);
	}), I(e, u), y();
}
//#endregion
//#region ../ui/src/lib/components/input/label.svelte
var ar = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function or(e, t) {
	s(t, !0);
	let n = K(t, ar);
	var r = D(), a = g(r);
	{
		let e = q(() => Z("text-sm font-medium text-dark-50", t.class));
		i(a, () => Ln, (r, i) => {
			i(r, z({ get children() {
				return t.children;
			} }, () => n, { get class() {
				return m(e);
			} }));
		});
	}
	I(e, r), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-checkbox.svelte
var sr = U("<div><!> <!></div>"), cr = U("<p class=\"text-sm text-red-400\"> </p>"), lr = U("<div><div class=\"flex items-center gap-2\"><!> <!></div> <!></div>");
function ur(e, t) {
	s(t, !0);
	let n = M(t, "checked", 15, !1), a = M(t, "id", 19, Ae), c = M(t, "inline", 3, !1);
	var l = D(), u = g(l), d = (e) => {
		var s = sr(), c = S(s);
		{
			let e = (e, t) => {
				let n = () => t?.().checked;
				var r = D(), i = g(r), a = (e) => {
					X(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				o(i, (e) => {
					n() && e(a);
				}), I(e, r);
			}, r = q(() => t.label ? `${a()}-label` : void 0), s = q(() => t.error ? !0 : void 0), l = q(() => Z("peer inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary/15 data-[state=checked]:text-primary", "data-[state=unchecked]:bg-dark-700", t.error ? "border-red-500" : "border-dark-500 data-[state=unchecked]:hover:border-dark-400", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
			i(c, () => Lt, (i, o) => {
				o(i, {
					get id() {
						return a();
					},
					get "aria-label"() {
						return t["aria-label"];
					},
					get "aria-labelledby"() {
						return m(r);
					},
					get "aria-invalid"() {
						return m(s);
					},
					get class() {
						return m(l);
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
		var l = r(c, 2), u = (e) => {
			or(e, {
				get id() {
					return `${a() ?? ""}-label`;
				},
				get for() {
					return a();
				},
				class: "cursor-pointer whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, n) => {
					C();
					var r = j();
					x(() => H(r, t.label)), I(e, r);
				},
				$$slots: { default: !0 }
			});
		};
		o(l, (e) => {
			t.label && e(u);
		}), _(s), x((e) => Y(s, 1, e), [() => k(Z("flex items-center gap-2", t.class))]), I(e, s);
	}, f = (e) => {
		var s = lr(), c = S(s), l = S(c);
		{
			let e = (e, t) => {
				let n = () => t?.().checked;
				var r = D(), i = g(r), a = (e) => {
					X(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				o(i, (e) => {
					n() && e(a);
				}), I(e, r);
			}, r = q(() => t.label ? `${a()}-label` : void 0), s = q(() => t.error ? !0 : void 0), c = q(() => Z("peer inline-flex size-5 shrink-0 items-center justify-center rounded border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-dark-50", "data-[state=unchecked]:bg-dark-700", t.error ? "border-red-500" : "border-dark-500 data-[state=unchecked]:hover:border-dark-400", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
			i(l, () => Lt, (i, o) => {
				o(i, {
					get id() {
						return a();
					},
					get "aria-label"() {
						return t["aria-label"];
					},
					get "aria-labelledby"() {
						return m(r);
					},
					get "aria-invalid"() {
						return m(s);
					},
					get class() {
						return m(c);
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
		var u = r(l, 2), d = (e) => {
			or(e, {
				get id() {
					return `${a() ?? ""}-label`;
				},
				get for() {
					return a();
				},
				class: "cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, n) => {
					C();
					var r = j();
					x(() => H(r, t.label)), I(e, r);
				},
				$$slots: { default: !0 }
			});
		};
		o(u, (e) => {
			t.label && e(d);
		}), _(c);
		var f = r(c, 2), p = (e) => {
			var n = cr(), r = S(n, !0);
			_(n), x(() => H(r, t.error)), I(e, n);
		};
		o(f, (e) => {
			t.error && e(p);
		}), _(s), x((e) => Y(s, 1, e), [() => k(Z("grid gap-2", t.class))]), I(e, s);
	};
	o(u, (e) => {
		c() ? e(d) : e(f, -1);
	}), I(e, l), y();
}
//#endregion
//#region ../ui/src/lib/components/variable-popover/variable-popover.svelte
var dr = U("<p class=\"text-xs font-semibold text-dark-200\"> </p>"), fr = U("<p class=\"py-2 text-xs text-dark-400\"> </p>"), pr = U("<li><button type=\"button\"><div class=\"flex min-w-0 flex-1 items-center gap-2.5\"><span class=\"shrink-0 rounded border border-primary-300 bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary transition-all duration-150 group-hover:border-primary-500/20 group-hover:bg-primary-500/15\"> </span> <span class=\"min-w-0 truncate text-dark-300 transition-colors duration-150 group-hover:text-dark-100\"> </span></div> <div class=\"flex size-4 shrink-0 items-center justify-center\"><!></div></button></li>"), mr = U("<ul class=\"grid gap-1\"></ul>"), hr = U("<div class=\"mb-3 flex flex-col gap-2\"><!></div> <!>", 1), gr = U("<!> <!>", 1);
function _r(e, t) {
	s(t, !0);
	let n = M(t, "title", 3, "Variables"), i = M(t, "emptyLabel", 3, "No variables available."), a = M(t, "ariaLabel", 3, "Show variables"), c = M(t, "copiedLabel", 3, "Copied"), l = M(t, "insertedLabel", 3, "Inserted");
	M(t, "noResultsLabel", 3, "No variables match your search.");
	let u = M(t, "icon", 3, "ri:braces-line"), d = A(null);
	function f(e) {
		if (t.onInsert) {
			t.onInsert(e);
			return;
		}
		navigator.clipboard.writeText(`{${e}}`).then(() => {
			W(d, e, !0), setTimeout(() => {
				m(d) === e && W(d, null);
			}, 2e3);
		});
	}
	bt(e, {
		children: (e, s) => {
			var p = gr(), h = g(p);
			xt(h, {
				child: (e, t) => {
					Ct(e, z(() => t?.().props, {
						type: "button",
						variant: "ghost",
						size: "icon-sm",
						get icon() {
							return u();
						},
						get "aria-label"() {
							return a();
						},
						class: "size-7 text-dark-400 hover:text-dark-100"
					}));
				},
				$$slots: { child: !0 }
			}), yt(r(h, 2), {
				align: "start",
				class: "w-80 p-4",
				children: (e, a) => {
					var s = hr(), u = g(s), p = S(u), h = (e) => {
						var t = dr(), r = S(t, !0);
						_(t), x(() => H(r, n())), I(e, t);
					};
					o(p, (e) => {
						n() && e(h);
					}), _(u);
					var v = r(u, 2), y = (e) => {
						var t = fr(), n = S(t, !0);
						_(t), x(() => H(n, i())), I(e, t);
					}, C = (e) => {
						St(e, {
							orientation: "vertical",
							viewportClasses: "max-h-48 overflow-hidden",
							children: (e, n) => {
								var i = mr();
								b(i, 21, () => t.variables, (e) => e.key, (e, n) => {
									var i = pr(), a = S(i), s = S(a), u = S(s), p = S(u, !0);
									_(u);
									var h = r(u, 2), g = S(h, !0);
									_(h), _(s);
									var v = r(s, 2), y = S(v), b = (e) => {
										X(e, {
											icon: "ri:check-line",
											class: "size-3.5 text-success-400"
										});
									}, C = (e) => {
										{
											let n = q(() => t.onInsert ? "ri:corner-down-left-line" : "ri:file-copy-line");
											X(e, {
												get icon() {
													return m(n);
												},
												class: "size-3.5 text-dark-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
											});
										}
									};
									o(y, (e) => {
										m(d) === m(n).key ? e(b) : e(C, -1);
									}), _(v), _(a), _(i), x((e) => {
										Y(a, 1, e), G(a, "title", t.onInsert ? l() : c()), H(p, `{${m(n).key}}`), H(g, m(n).label);
									}, [() => k(Z("group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-transparent px-2.5 py-2 text-left text-xs transition-all duration-150 hover:border-dark-600/30 hover:bg-dark-700/50"))]), F("click", a, () => f(m(n).key)), I(e, i);
								}), _(i), I(e, i);
							},
							$$slots: { default: !0 }
						});
					};
					o(v, (e) => {
						t.variables.length === 0 ? e(y) : e(C, -1);
					}), I(e, s);
				},
				$$slots: { default: !0 }
			}), I(e, p);
		},
		$$slots: { default: !0 }
	}), y();
}
B(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-code.svelte
var vr = U("<span></span>"), yr = U("<div class=\"flex items-center justify-between gap-2\"><!> <!></div>"), br = U("<div class=\"absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-dark-900/85\" role=\"status\" aria-live=\"polite\"><!> <p class=\"text-xs text-dark-300\"> </p></div>"), xr = U("<p class=\"text-sm text-red-400\"> </p>"), Sr = U("<div><!> <div role=\"textbox\" aria-multiline=\"true\"><!></div> <!></div>");
function Cr(i, c) {
	s(c, !0);
	let l = M(c, "id", 19, Ae), u = M(c, "value", 3, ""), d = M(c, "language", 3, "typescript"), p = M(c, "minHeight", 3, "12rem"), h = M(c, "fillHeight", 3, !1), g = M(c, "extensions", 19, () => []), v = M(c, "languageServer", 3, null), b = M(c, "loadingLabel", 3, "Loading..."), w = M(c, "variables", 19, () => []), D = M(c, "variablesTitle", 3, "Variables"), O = M(c, "variablesAriaLabel", 3, "Insert variable"), N = A(void 0), P = A(void 0), F = A(void 0), L = A(!1), R = !1, z = A(""), B = A(""), V;
	function ee(e) {
		return Object.keys(e).sort().join("\0");
	}
	function U(e) {
		return Object.entries(e).filter(([e]) => e.includes("/src/")).sort(([e], [t]) => e.localeCompare(t)).map(([e, t]) => `${e}\0${t}`).join("\0");
	}
	function K() {
		V &&= (clearTimeout(V), void 0);
	}
	function q(e) {
		c.oninput && c.oninput({ currentTarget: { value: e } });
	}
	function J(e) {
		let t = `{${e}}`;
		if (!m(P)) {
			q(`${u()}${t}`);
			return;
		}
		let { from: n, to: r } = m(P).state.selection.main;
		m(P).dispatch({
			changes: {
				from: n,
				to: r,
				insert: t
			},
			selection: { anchor: n + t.length }
		}), m(P).focus();
	}
	async function ne() {
		if (m(F)?.destroy(), W(F, void 0), W(z, ""), W(B, ""), K(), !v()) return [...g()];
		let e = await n(v());
		return W(F, e, !0), W(z, ee(v().workspace), !0), W(B, U(v().workspace), !0), [...g(), ...e.extensions];
	}
	te(async () => {
		if (!m(N)) return;
		let e = await ne();
		if (R || !m(N)) {
			m(F)?.destroy(), W(F, void 0);
			return;
		}
		W(P, t({
			parent: m(N),
			doc: u(),
			language: d(),
			placeholder: c.placeholder,
			extensions: e,
			onChange: q
		}), !0), W(L, !0), c.onEditorReady?.(m(P));
	}), a(() => {
		!m(P) || !m(L) || e(m(P), u());
	}), a(() => {
		if (!m(L) || !m(F) || !v()) return;
		let e = v().workspace, t = ee(e), n = U(e);
		if (t !== m(z)) {
			K(), W(z, t, !0), W(B, n, !0), m(F).updateWorkspace(e);
			return;
		}
		n !== m(B) && (K(), V = setTimeout(() => {
			V = void 0, W(B, n, !0), m(F)?.updateWorkspace(e);
		}, 450));
	}), E(() => {
		R = !0, K(), m(F)?.destroy(), W(F, void 0), c.onEditorReady?.(null), m(P)?.destroy(), W(P, void 0);
	});
	var re = Sr(), ie = S(re), ae = (e) => {
		var t = yr(), n = S(t), i = (e) => {
			or(e, {
				get for() {
					return l();
				},
				children: (e, t) => {
					C();
					var n = j();
					x(() => H(n, c.label)), I(e, n);
				},
				$$slots: { default: !0 }
			});
		}, a = (e) => {
			I(e, vr());
		};
		o(n, (e) => {
			c.label ? e(i) : e(a, -1);
		});
		var s = r(n, 2), u = (e) => {
			_r(e, {
				get variables() {
					return w();
				},
				get title() {
					return D();
				},
				get ariaLabel() {
					return O();
				},
				onInsert: J
			});
		};
		o(s, (e) => {
			w().length > 0 && e(u);
		}), _(t), I(e, t);
	};
	o(ie, (e) => {
		(c.label || w().length > 0) && e(ae);
	});
	var Q = r(ie, 2);
	let oe;
	var se = S(Q), ce = (e) => {
		var t = br(), n = S(t);
		X(n, {
			icon: "gg:spinner",
			class: "size-5 animate-spin text-primary",
			"aria-hidden": "true"
		});
		var i = r(n, 2), a = S(i, !0);
		_(i), _(t), x(() => {
			G(t, "aria-label", b()), H(a, b());
		}), I(e, t);
	};
	o(se, (e) => {
		m(L) || e(ce);
	}), _(Q), f(Q, (e) => W(N, e), () => m(N));
	var le = r(Q, 2), ue = (e) => {
		var t = xr(), n = S(t, !0);
		_(t), x(() => H(n, c.error)), I(e, t);
	};
	o(le, (e) => {
		c.error && e(ue);
	}), _(re), x((e, t) => {
		Y(re, 1, e), G(Q, "id", l()), G(Q, "aria-busy", !m(L)), G(Q, "aria-invalid", c.error ? !0 : void 0), Y(Q, 1, t), oe = T(Q, "", oe, { "min-height": h() ? void 0 : p() });
	}, [() => k(Z("relative flex w-full flex-col", h() ? "h-full min-h-0 flex-1" : "grid gap-2")), () => k(Z("relative", "overflow-hidden rounded-lg border bg-dark-900 focus-within:ring-2 [&_.cm-editor]:outline-none", h() ? "flex min-h-0 flex-1 flex-col [&_.cm-editor]:!flex [&_.cm-editor]:!h-full [&_.cm-editor]:!max-h-full [&_.cm-editor]:!min-h-0 [&_.cm-editor]:!flex-col [&_.cm-scroller]:!min-h-0 [&_.cm-scroller]:!flex-1" : "[&_.cm-editor]:min-h-[inherit] [&_.cm-scroller]:min-h-[inherit]", c.error ? "border-red-500 focus-within:ring-red-500" : "border-dark-600 focus-within:ring-primary", c.class))]), I(i, re), y();
}
//#endregion
//#region ../core/dist/index.js
function wr(e) {
	return Date.UTC(e.y, e.m - 1, e.d, e.h, e.i, e.s);
}
function Tr(e, t) {
	return e.y === t.y && e.m === t.m && e.d === t.d && e.h === t.h && e.i === t.i && e.s === t.s;
}
function Er(e, t) {
	let n = new Date(Date.parse(e));
	if (isNaN(n)) throw Error("Invalid ISO8601 passed to timezone parser.");
	let r = e.substring(9);
	return r.includes("Z") || r.includes("+") || r.includes("-") ? Ar(n.getUTCFullYear(), n.getUTCMonth() + 1, n.getUTCDate(), n.getUTCHours(), n.getUTCMinutes(), n.getUTCSeconds(), "Etc/UTC") : Ar(n.getFullYear(), n.getMonth() + 1, n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), t);
}
function Dr(e, t, n) {
	return Or(Er(e, t), n);
}
function Or(e, t) {
	let n = new Date(wr(e)), r = kr(n, e.tz), i = wr(e) - wr(r), a = new Date(n.getTime() + i), o = kr(a, e.tz);
	if (Tr(o, e)) {
		let t = /* @__PURE__ */ new Date(a.getTime() - 36e5);
		return Tr(kr(t, e.tz), e) ? t : a;
	}
	let s = new Date(a.getTime() + wr(e) - wr(o));
	if (Tr(kr(s, e.tz), e)) return s;
	if (t) throw Error("Invalid date passed to fromTZ()");
	return a.getTime() > s.getTime() ? a : s;
}
function kr(e, t) {
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
function Ar(e, t, n, r, i, a, o) {
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
var jr = [
	1,
	2,
	4,
	8,
	16
], Mr = class {
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
		else if (t < 6 && t > 0) this.dayOfWeek[e] = this.dayOfWeek[e] | jr[t - 1];
		else throw TypeError(`CronPattern: nth weekday out of range, should be 1-5 or L. Value: ${t}, Type: ${typeof t}`);
	}
}, Nr = [
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
], Pr = class e {
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
		return t === 1 ? new Date(Date.UTC(e, t + 1, 0)).getUTCDate() : Nr[t];
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
		if (r & 63 && jr[a - 1] & r) return !0;
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
			let t = kr(e, this.tz);
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
		if (this.month > 11 || this.month < 0 || this.day > Nr[this.month] || this.day < 1 || this.hour > 59 || this.minute > 59 || this.second > 59 || this.hour < 0 || this.minute < 0 || this.second < 0) {
			let e = new Date(Date.UTC(this.year, this.month, this.day, this.hour, this.minute, this.second, this.ms));
			return this.ms = e.getUTCMilliseconds(), this.second = e.getUTCSeconds(), this.minute = e.getUTCMinutes(), this.hour = e.getUTCHours(), this.day = e.getUTCDate(), this.month = e.getUTCMonth(), this.year = e.getUTCFullYear(), !0;
		} else return !1;
	}
	fromString(e) {
		if (typeof this.tz == "number") {
			let t = Dr(e);
			this.ms = t.getUTCMilliseconds(), this.second = t.getUTCSeconds(), this.minute = t.getUTCMinutes(), this.hour = t.getUTCHours(), this.day = t.getUTCDate(), this.month = t.getUTCMonth(), this.year = t.getUTCFullYear(), this.apply();
		} else return this.fromDate(Dr(e, this.tz));
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
					let n = t === 1 ? new Date(Date.UTC(e, t + 1, 0)).getUTCDate() : Nr[t];
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
		return e || this.tz === void 0 ? new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.ms) : typeof this.tz == "number" ? new Date(Date.UTC(this.year, this.month, this.day, this.hour, this.minute - this.tz, this.second, this.ms)) : Or(Ar(this.year, this.month + 1, this.day, this.hour, this.minute, this.second, this.tz), !1);
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
function Fr(e) {
	if (e === void 0 && (e = {}), delete e.name, e.legacyMode !== void 0 && e.domAndDow === void 0 ? e.domAndDow = !e.legacyMode : e.domAndDow === void 0 && (e.domAndDow = !1), e.legacyMode = !e.domAndDow, e.paused = e.paused === void 0 ? !1 : e.paused, e.maxRuns = e.maxRuns === void 0 ? Infinity : e.maxRuns, e.catch = e.catch === void 0 ? !1 : e.catch, e.interval = e.interval === void 0 ? 0 : parseInt(e.interval.toString(), 10), e.utcOffset = e.utcOffset === void 0 ? void 0 : parseInt(e.utcOffset.toString(), 10), e.dayOffset = e.dayOffset === void 0 ? 0 : parseInt(e.dayOffset.toString(), 10), e.unref = e.unref === void 0 ? !1 : e.unref, e.mode = e.mode === void 0 ? "auto" : e.mode, e.alternativeWeekdays = e.alternativeWeekdays === void 0 ? !1 : e.alternativeWeekdays, e.sloppyRanges = e.sloppyRanges === void 0 ? !1 : e.sloppyRanges, ![
		"auto",
		"5-part",
		"6-part",
		"7-part",
		"5-or-6-parts",
		"6-or-7-parts"
	].includes(e.mode)) throw Error("CronOptions: mode must be one of 'auto', '5-part', '6-part', '7-part', '5-or-6-parts', or '6-or-7-parts'.");
	if (e.startAt &&= new Pr(e.startAt, e.timezone), e.stopAt &&= new Pr(e.stopAt, e.timezone), e.interval !== null) {
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
function Ir(e) {
	return Object.prototype.toString.call(e) === "[object Function]" || typeof e == "function" || e instanceof Function;
}
function Lr(e) {
	return Ir(e);
}
function Rr(e) {
	typeof Deno < "u" && typeof Deno.unrefTimer < "u" ? Deno.unrefTimer(e) : e && typeof e.unref < "u" && e.unref();
}
var zr = 30 * 1e3, Br = [], Vr = class {
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
		if (Ir(t)) i = t;
		else if (typeof t == "object") r = t;
		else if (t !== void 0) throw Error("Cron: Invalid argument passed for optionsIn. Should be one of function, or object (options).");
		if (Ir(n)) i = n;
		else if (typeof n == "object") r = n;
		else if (n !== void 0) throw Error("Cron: Invalid argument passed for funcIn. Should be one of function, or object (options).");
		if (this.name = r?.name, this.options = Fr(r), this._states = {
			kill: !1,
			blocking: !1,
			previousRun: void 0,
			currentRun: void 0,
			once: void 0,
			currentTimeout: void 0,
			maxRuns: r ? r.maxRuns : void 0,
			paused: r ? r.paused : !1,
			pattern: new Mr("* * * * *", void 0, { mode: "auto" })
		}, e && (e instanceof Date || typeof e == "string" && e.indexOf(":") > 0) ? this._states.once = new Pr(e, this.getTz()) : this._states.pattern = new Mr(e, this.options.timezone, {
			mode: this.options.mode,
			alternativeWeekdays: this.options.alternativeWeekdays,
			sloppyRanges: this.options.sloppyRanges
		}), this.name) {
			if (Br.find((e) => e.name === this.name)) throw Error("Cron: Tried to initialize new named job '" + this.name + "', but name already taken.");
			Br.push(this);
		}
		return i !== void 0 && Lr(i) && (this.fn = i, this.schedule()), this;
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
		let r = [], i = t ? new Pr(t, this.getTz()) : null, a = n === "next" ? this._next : this._previous;
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
			let t = new Pr(e, this.getTz());
			t.ms = 0;
			let n = new Pr(this._states.once, this.getTz());
			return n.ms = 0, t.getTime() === n.getTime();
		}
		let t = new Pr(e, this.getTz());
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
		return t ? e instanceof Pr || e instanceof Date ? t.getTime() - e.getTime() : t.getTime() - new Pr(e).getTime() : null;
	}
	stop() {
		this._states.kill = !0, this._states.currentTimeout && clearTimeout(this._states.currentTimeout);
		let e = Br.indexOf(this);
		e >= 0 && Br.splice(e, 1);
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
		return t == null || isNaN(t) || n === null ? this : (t > zr && (t = zr), this._states.currentTimeout = setTimeout(() => this._checkTrigger(n), t), this._states.currentTimeout && this.options.unref && Rr(this._states.currentTimeout), this);
	}
	async _trigger(e) {
		this._states.blocking = !0, this._states.currentRun = new Pr(void 0, this.getTz());
		try {
			if (this.options.catch) try {
				this.fn !== void 0 && await this.fn(this, this.options.context);
			} catch (e) {
				if (Ir(this.options.catch)) try {
					this.options.catch(e, this);
				} catch {}
			}
			else this.fn !== void 0 && await this.fn(this, this.options.context);
		} finally {
			this._states.previousRun = new Pr(e, this.getTz()), this._states.blocking = !1;
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
		n && !r ? (this._states.maxRuns !== void 0 && this._states.maxRuns--, this._trigger()) : n && r && Ir(this.options.protect) && setTimeout(() => this.options.protect(this), 0), this.schedule();
	}
	_next(e) {
		let t = !!(e || this._states.currentRun), n = !1;
		!e && this.options.startAt && this.options.interval && ([e, t] = this._calculatePreviousRun(e, t), n = !e), e = new Pr(e, this.getTz()), this.options.startAt && e && e.getTime() < this.options.startAt.getTime() && (e = this.options.startAt);
		let r = this._states.once || new Pr(e, this.getTz());
		return !n && r !== this._states.once && (r = r.increment(this._states.pattern, this.options, t)), this._states.once && this._states.once.getTime() <= e.getTime() || r === null || this._states.maxRuns !== void 0 && this._states.maxRuns <= 0 || this._states.kill || this.options.stopAt && r.getTime() >= this.options.stopAt.getTime() ? null : r;
	}
	_previous(e) {
		let t = new Pr(e, this.getTz());
		this.options.stopAt && t.getTime() > this.options.stopAt.getTime() && (t = this.options.stopAt);
		let n = new Pr(t, this.getTz());
		return this._states.once ? this._states.once.getTime() < t.getTime() ? this._states.once : null : (n = n.decrement(this._states.pattern, this.options), n === null || this.options.startAt && n.getTime() < this.options.startAt.getTime() ? null : n);
	}
	_calculatePreviousRun(e, t) {
		let n = new Pr(void 0, this.getTz()), r = e;
		if (this.options.startAt.getTime() <= n.getTime()) {
			r = this.options.startAt;
			let e = r.getTime() + this.options.interval * 1e3;
			for (; e <= n.getTime();) r = new Pr(r, this.getTz()).increment(this._states.pattern, this.options, !0), e = r.getTime() + this.options.interval * 1e3;
			t = !0;
		}
		return r === null && (r = void 0), [r, t];
	}
}, Hr = [
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
], Ur = [
	"minute",
	"hour",
	"day",
	"month",
	"weekday"
];
function Wr() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function Gr(e) {
	return e.trim().replace(/\s+/g, " ");
}
function Kr(e) {
	let t = Gr(e);
	return t ? t.split(" ").length : 0;
}
function qr(e) {
	let t = Gr(e);
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
function Jr(e) {
	let t = Gr(e);
	if (!t || Kr(t) !== 5) return !1;
	try {
		return new Vr(t, {
			timezone: Wr(),
			paused: !0
		}), !0;
	} catch {
		return !1;
	}
}
function Yr(e) {
	let t = Gr(e);
	if (t) {
		if (Kr(t) !== 5) return "Cron expression must have exactly 5 fields";
		if (!Jr(t)) return "Invalid cron expression";
	}
}
function Xr(e) {
	let t = Gr(e);
	if (Jr(t)) try {
		let e = new Vr(t, {
			timezone: Wr(),
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
var Zr = typeof window < "u" ? window : void 0;
typeof window < "u" && window.document, typeof window < "u" && window.navigator, typeof window < "u" && window.location;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/internal/utils/dom.js
function Qr(e) {
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
		let { window: t = Zr, document: n = t?.document } = e;
		t !== void 0 && (this.#e = n, this.#t = v((e) => {
			let n = w(t, "focusin", e), r = w(t, "focusout", e);
			return () => {
				n(), r();
			};
		}));
	}
	get current() {
		return this.#t?.(), this.#e ? Qr(this.#e) : null;
	}
}();
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/internal/utils/is.js
function $r(e) {
	return typeof e == "function";
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/extract/extract.svelte.js
function ei(e, t) {
	if ($r(e)) {
		let n = e();
		return n === void 0 ? t : n;
	}
	return e === void 0 ? t : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/use-debounce/use-debounce.svelte.js
function ti(e, t) {
	let n = A(null), r = q(() => ei(t, 250));
	function i(...t) {
		if (m(n)) m(n).timeout && clearTimeout(m(n).timeout);
		else {
			let e, t;
			W(n, {
				timeout: null,
				runner: null,
				promise: new Promise((n, r) => {
					e = n, t = r;
				}),
				resolve: e,
				reject: t
			}, !0);
		}
		return m(n).runner = async () => {
			if (!m(n)) return;
			let r = m(n);
			W(n, null);
			try {
				r.resolve(await e.apply(this, t));
			} catch (e) {
				r.reject(e);
			}
		}, m(n).timeout = setTimeout(m(n).runner, m(r)), m(n).promise;
	}
	return i.cancel = async () => {
		(!m(n) || m(n).timeout === null) && (await new Promise((e) => setTimeout(e, 0)), !m(n) || m(n).timeout === null) || (clearTimeout(m(n).timeout), m(n).reject("Cancelled"), W(n, null));
	}, i.runScheduledNow = async () => {
		(!m(n) || !m(n).timeout) && (await new Promise((e) => setTimeout(e, 0)), !m(n) || !m(n).timeout) || (clearTimeout(m(n).timeout), m(n).timeout = null, await m(n).runner?.());
	}, Object.defineProperty(i, "pending", {
		enumerable: !0,
		get() {
			return !!m(n)?.timeout;
		}
	}), i;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/watch/watch.svelte.js
function ni(e, t) {
	switch (e) {
		case "post":
			a(t);
			break;
		case "pre":
			l(t);
			break;
	}
}
function ri(e, t, n, r = {}) {
	let { lazy: i = !1 } = r, a = !i, o = Array.isArray(e) ? [] : void 0;
	ni(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!a) {
			a = !0, o = t;
			return;
		}
		let r = p(() => n(t, o));
		return o = t, r;
	});
}
function ii(e, t, n) {
	let r = ie(() => {
		let i = !1;
		ri(e, t, (e, t) => {
			if (i) {
				r();
				return;
			}
			let a = n(e, t);
			return i = !0, a;
		}, { lazy: !0 });
	});
	a(() => r);
}
function ai(e, t, n) {
	ri(e, "post", t, n);
}
function oi(e, t, n) {
	ri(e, "pre", t, n);
}
ai.pre = oi;
function si(e, t) {
	ii(e, "post", t);
}
function ci(e, t) {
	ii(e, "pre", t);
}
si.pre = ci;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/internal/utils/function.js
function li() {}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/debounced/debounced.svelte.js
var ui = class {
	#e = A();
	#t;
	constructor(e, t = 250) {
		W(this.#e, e(), !0), this.cancel = this.cancel.bind(this), this.setImmediately = this.setImmediately.bind(this), this.updateImmediately = this.updateImmediately.bind(this), this.#t = ti(() => {
			W(this.#e, e(), !0);
		}, t), ai(e, () => {
			this.#t().catch(li);
		});
	}
	get current() {
		return m(this.#e);
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
		this.cancel(), W(this.#e, e, !0);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/resource/resource.svelte.js
function di(e, t) {
	let n, r = null;
	return (...i) => new Promise((a) => {
		r && r(void 0), r = a, clearTimeout(n), n = setTimeout(async () => {
			let t = await e(...i);
			r &&= (r(t), null);
		}, t);
	});
}
function fi(e, t) {
	let n = 0, r = null;
	return (...i) => {
		let a = Date.now();
		return n && a - n < t ? r ?? Promise.resolve(void 0) : (n = a, r = e(...i), r);
	};
}
function pi(e, t, n = {}, r) {
	let { lazy: i = !1, once: a = !1, initialValue: o, debounce: s, throttle: c } = n, l = A(ee(o)), u = A(ee(o === void 0 && !i)), d = A(void 0), f = A(ee([])), p = () => {
		m(f).forEach((e) => e()), W(f, [], !0);
	}, h = (e) => {
		W(f, [...m(f), e], !0);
	}, g = async (e, n, r = !1) => {
		try {
			W(u, !0), W(d, void 0), p();
			let i = new AbortController();
			h(() => i.abort());
			let a = await t(e, n, {
				data: m(l),
				refetching: r,
				onCleanup: h,
				signal: i.signal
			});
			return W(l, a, !0), a;
		} catch (e) {
			e instanceof DOMException && e.name === "AbortError" || W(d, e, !0);
			return;
		} finally {
			W(u, !1);
		}
	}, _ = s ? di(g, s) : c ? fi(g, c) : g, v = Array.isArray(e) ? e : [e], y;
	return r((t, n) => {
		a && y || (y = t, _(Array.isArray(e) ? t : t[0], Array.isArray(e) ? n : n?.[0]));
	}, { lazy: i }), {
		get current() {
			return m(l);
		},
		get loading() {
			return m(u);
		},
		get error() {
			return m(d);
		},
		mutate: (e) => {
			W(l, e, !0);
		},
		refetch: (t) => {
			let n = v.map((e) => e());
			return _(Array.isArray(e) ? n : n[0], Array.isArray(e) ? n : n[0], t ?? !0);
		}
	};
}
function mi(e, t, n) {
	return pi(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		ai(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
function hi(e, t, n) {
	return pi(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		ai.pre(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
mi.pre = hi;
//#endregion
//#region ../ui/src/lib/components/input/resolve-select-items.svelte.ts
function gi(e, t) {
	let n = A(ee([])), r = A(!1), i = A(0), o = q(() => {
		let t = e();
		return typeof t == "function" ? (m(i), m(n)) : t;
	}), s = q(() => typeof e() == "function" ? (m(i), m(r)) : !1);
	return a(() => {
		t && t();
		let a = e();
		if (typeof a != "function") return;
		W(r, !0);
		let o = !1;
		return Promise.resolve(a()).then((e) => {
			o || (W(n, e, !0), W(r, !1), R(i));
		}, () => {
			o || (W(n, [], !0), W(r, !1), R(i));
		}), () => {
			o = !0;
		};
	}), {
		get items() {
			return m(o);
		},
		get loading() {
			return m(s);
		}
	};
}
function _i(e, t) {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => e.label.toLowerCase().includes(n) || e.value.toLowerCase().includes(n)) : e;
}
function vi(e, t, n = 200, r = 36, i = 6) {
	let a = e.length * r, o = Math.max(0, Math.floor(t / r) - i), s = Math.ceil(n / r) + i * 2, c = Math.min(e.length, o + s);
	return {
		items: e.slice(o, c),
		startIndex: o,
		totalHeight: a,
		offsetY: o * r
	};
}
function yi(e) {
	return e > 50;
}
function bi(e, t = 36) {
	return Math.max(0, e * t);
}
//#endregion
//#region ../ui/src/lib/components/input/input-select.svelte
var xi = U("<span class=\"grid h-full min-w-10 place-items-center rounded-l-xl border border-r-0 border-dark-700 text-dark-50\"><!></span>"), Si = U(" <!>", 1), Ci = U("<!> <!>", 1), wi = U("<!> <!> <!>", 1), Ti = U("<div><button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\" class=\"flex w-full cursor-pointer items-center outline-none disabled:cursor-not-allowed disabled:opacity-50\"><!> <span><span> </span> <!></span></button></div> <!>", 1), Ei = U("<p class=\"text-sm text-red-400\"> </p>"), Di = U("<div><!> <!> <!></div>");
function Oi(e, t) {
	s(t, !0);
	let n = M(t, "searchable", 3, "auto"), a = M(t, "dialogTitle", 3, "Select option"), c = M(t, "dialogDescription", 3, "Search and select an option from the list."), l = M(t, "id", 19, Ae), u = M(t, "required", 3, !1), d = M(t, "type", 3, "single"), f = M(t, "value", 15), p = q(() => t.placeholder ?? "Select an option"), h = q(() => t.loadingPlaceholder ?? "Loading..."), v = q(() => t.searchPlaceholder ?? "Search values"), w = q(() => t.noResultsLabel ?? "No matches found"), T = A(!1), E = A(""), O = Ae(), N = gi(() => t.items, () => t.reloadKey?.()), P = q(() => t.disabled ?? !1), L = q(() => d() === "multiple"), R = q(() => n() === !0 ? !0 : n() === !1 ? !1 : N.items.length >= 8), B = q(() => {
		if (N.loading) return m(h);
		if (m(L)) {
			let e = f();
			if (e.length === 0) return m(p);
			let t = e.map((e) => N.items.find((t) => t.value === e)?.label).filter(Boolean);
			return t.length > 0 ? t.join(", ") : m(p);
		}
		let e = f();
		return e ? N.items.find((t) => t.value === e)?.label ?? e : m(p);
	}), V = q(() => m(L) ? f().length > 0 : !!f());
	function ee(e) {
		W(T, e, !0), e || W(E, "");
	}
	function te(e) {
		return m(L) ? f().includes(e) : f() === e;
	}
	function U(e) {
		if (!e.disabled) {
			if (m(L)) {
				let n = [...f()], r = n.indexOf(e.value);
				r >= 0 ? n.splice(r, 1) : n.push(e.value), f(n), t.onValueChange?.(n);
				return;
			}
			f(e.value), t.onValueChange?.(e.value), W(T, !1);
		}
	}
	function K() {
		m(P) || W(T, !0);
	}
	var J = Di(), ne = S(J), re = (e) => {
		or(e, {
			get for() {
				return l();
			},
			children: (e, n) => {
				C();
				var r = j();
				x(() => H(r, t.label)), I(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	o(ne, (e) => {
		t.label && e(re);
	});
	var ie = r(ne, 2);
	i(ie, () => lt, (e, n) => {
		n(e, {
			onOpenChange: ee,
			get open() {
				return m(T);
			},
			set open(e) {
				W(T, e, !0);
			},
			children: (e, n) => {
				var s = Ti(), d = g(s), f = S(d), p = S(f), y = (e) => {
					var n = xi();
					X(S(n), {
						get icon() {
							return t.prependIcon;
						},
						class: "size-6"
					}), _(n), I(e, n);
				};
				o(p, (e) => {
					t.prependIcon && e(y);
				});
				var A = r(p, 2), M = S(A), L = S(M, !0);
				_(M), X(r(M, 2), {
					icon: "ri:expand-up-down-line",
					class: "size-5 shrink-0 text-dark-300"
				}), _(A), _(f), _(d), i(r(d, 2), () => dt, (e, n) => {
					n(e, {
						children: (e, n) => {
							var s = Ci(), l = g(s);
							i(l, () => ft, (e, t) => {
								t(e, {});
							}), i(r(l, 2), () => ct, (e, n) => {
								n(e, z(() => t.dialogProps, {
									children: (e, n) => {
										var s = wi(), l = g(s);
										i(l, () => st, (e, t) => {
											t(e, {
												class: "sr-only",
												children: (e, t) => {
													C();
													var n = j();
													x(() => H(n, a())), I(e, n);
												},
												$$slots: { default: !0 }
											});
										});
										var u = r(l, 2);
										i(u, () => ut, (e, t) => {
											t(e, {
												class: "sr-only",
												children: (e, t) => {
													C();
													var n = j();
													x(() => H(n, c())), I(e, n);
												},
												$$slots: { default: !0 }
											});
										});
										var d = r(u, 2);
										{
											let e = q(() => !N.loading), n = q(() => Z(t.commandProps?.class));
											i(d, () => Re, (a, s) => {
												s(a, z(() => t.commandProps, {
													get shouldFilter() {
														return m(e);
													},
													get class() {
														return m(n);
													},
													children: (e, t) => {
														var n = Ci(), a = g(n), s = (e) => {
															var t = D();
															i(g(t), () => Ve, (e, t) => {
																t(e, {
																	get placeholder() {
																		return m(v);
																	},
																	get "aria-label"() {
																		return m(v);
																	},
																	get value() {
																		return m(E);
																	},
																	set value(e) {
																		W(E, e, !0);
																	}
																});
															}), I(e, t);
														};
														o(a, (e) => {
															m(R) && e(s);
														}), i(r(a, 2), () => Me, (e, t) => {
															t(e, {
																get id() {
																	return O;
																},
																class: "mt-2",
																children: (e, t) => {
																	var n = D();
																	i(g(n), () => je, (e, t) => {
																		t(e, {
																			children: (e, t) => {
																				var n = D(), a = g(n), s = (e) => {
																					var t = D();
																					i(g(t), () => Be, (e, t) => {
																						t(e, {
																							children: (e, t) => {
																								C();
																								var n = j();
																								x(() => H(n, m(h))), I(e, n);
																							},
																							$$slots: { default: !0 }
																						});
																					}), I(e, t);
																				}, c = (e) => {
																					var t = Ci(), n = g(t);
																					i(n, () => Le, (e, t) => {
																						t(e, {
																							children: (e, t) => {
																								C();
																								var n = j();
																								x(() => H(n, m(w))), I(e, n);
																							},
																							$$slots: { default: !0 }
																						});
																					}), b(r(n, 2), 17, () => N.items, (e) => e.value, (e, t) => {
																						var n = D(), a = g(n);
																						{
																							let e = q(() => [m(t).label, m(t).value]);
																							i(a, () => Ie, (n, i) => {
																								i(n, {
																									get value() {
																										return m(t).value;
																									},
																									get keywords() {
																										return m(e);
																									},
																									get disabled() {
																										return m(t).disabled;
																									},
																									onSelect: () => U(m(t)),
																									children: (e, n) => {
																										C();
																										var i = Si(), a = g(i), s = r(a), c = (e) => {
																											X(e, {
																												icon: "ri:check-line",
																												class: "size-5 text-primary"
																											});
																										}, l = q(() => te(m(t).value));
																										o(s, (e) => {
																											m(l) && e(c);
																										}), x(() => H(a, `${m(t).label ?? ""} `)), I(e, i);
																									},
																									$$slots: { default: !0 }
																								});
																							});
																						}
																						I(e, n);
																					}), I(e, t);
																				};
																				o(a, (e) => {
																					N.loading ? e(s) : e(c, -1);
																				}), I(e, n);
																			},
																			$$slots: { default: !0 }
																		});
																	}), I(e, n);
																},
																$$slots: { default: !0 }
															});
														}), I(e, n);
													},
													$$slots: { default: !0 }
												}));
											});
										}
										I(e, s);
									},
									$$slots: { default: !0 }
								}));
							}), I(e, s);
						},
						$$slots: { default: !0 }
					});
				}), x((e, t, n) => {
					Y(d, 1, e), G(f, "id", l()), G(f, "aria-expanded", m(T)), G(f, "aria-controls", m(T) ? O : void 0), G(f, "aria-required", u() || void 0), f.disabled = m(P), Y(A, 1, t), Y(M, 1, n), H(L, m(B));
				}, [
					() => k(Z("relative flex w-full items-center rounded-xl", "has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500", t.class)),
					() => k(Z("flex w-full items-center justify-between gap-2 border bg-dark-700 text-dark-50 outline-none", ze.md, t.error ? "border-red-500" : "border-dark-500", {
						"rounded-l-none rounded-r-xl border-l-0": t.prependIcon,
						"rounded-xl": !t.prependIcon
					})),
					() => k(Z("truncate", !m(V) && "text-dark-300"))
				]), F("click", f, K), I(e, s);
			},
			$$slots: { default: !0 }
		});
	});
	var ae = r(ie, 2), Q = (e) => {
		var n = Ei(), r = S(n, !0);
		_(n), x(() => H(r, t.error)), I(e, n);
	};
	o(ae, (e) => {
		t.error && e(Q);
	}), _(J), x((e) => Y(J, 1, e), [() => k(Z("relative grid w-full gap-2"))]), I(e, J), y();
}
B(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/cron-expression-editor.svelte
var ki = U("<div><p class=\"text-[10px] font-semibold tracking-[0.14em] text-dark-400 uppercase\"> </p> <p> </p></div>"), Ai = U("<span><!> </span>"), ji = U("<p class=\"text-xs text-dark-200\"><span class=\"text-dark-400\"> </span> <span class=\"font-medium text-primary-100\"> </span></p>"), Mi = U("<div class=\"overflow-hidden rounded-xl border border-dark-600 bg-dark-800/40 transition-all duration-200 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20\"><div class=\"grid grid-cols-5 border-b border-dark-600/80 bg-dark-900/40 px-2 py-1.5\"></div> <div class=\"relative flex items-center gap-2 px-3 py-2\"><!> <input autocomplete=\"off\"/> <!></div> <div class=\"flex flex-wrap items-center justify-between gap-2 border-t border-dark-600/80 bg-dark-900/30 px-3 py-2\"><div class=\"min-w-40 max-w-xs flex-1\"><!></div> <!></div></div>");
function Ni(e, t) {
	s(t, !0);
	let n = M(t, "value", 3, ""), i = M(t, "placeholder", 3, "0 9 * * 1-5"), a = M(t, "presets", 3, Hr), c = M(t, "validLabel", 3, "Valid expression"), l = M(t, "invalidLabel", 3, "Invalid cron expression"), u = M(t, "nextRunLabel", 3, "Next run"), d = M(t, "presetsPlaceholder", 3, "Presets"), f = Ae(), p = new ui(() => n(), 250), h = q(() => ({
		minute: t.fieldLabels?.minute ?? "Minute",
		hour: t.fieldLabels?.hour ?? "Hour",
		day: t.fieldLabels?.day ?? "Day",
		month: t.fieldLabels?.month ?? "Month",
		weekday: t.fieldLabels?.weekday ?? "Weekday"
	})), g = q(() => qr(n())), v = q(() => Gr(p.current)), C = q(() => Yr(m(v))), w = q(() => !!m(v) && !m(C)), T = q(() => m(C) === "Invalid cron expression" ? l() : m(C)), E = q(() => m(w) ? Xr(m(v)) : void 0), D = q(() => a().map((e) => ({
		value: e.value,
		label: e.label
	}))), A = {
		minute: "text-sky-300",
		hour: "text-violet-300",
		day: "text-emerald-300",
		month: "text-amber-300",
		weekday: "text-rose-300"
	}, j = (e) => {
		t.oninput?.(e);
	};
	function P(e) {
		t.oninput?.({ currentTarget: { value: e } });
	}
	var L = Mi(), R = S(L);
	b(R, 22, () => Ur, (e) => e, (e, t, n) => {
		var i = ki(), a = S(i), o = S(a, !0);
		_(a);
		var s = r(a, 2), c = S(s, !0);
		_(s), _(i), x((e, r) => {
			Y(i, 1, e), H(o, m(h)[t]), Y(s, 1, r), H(c, m(g)[m(n)] || "—");
		}, [() => k(Z("px-1 text-center", m(n) < 4 && "border-r border-dark-700/50")), () => k(Z("mt-0.5 truncate font-mono text-xs", A[t]))]), I(e, i);
	}), _(R);
	var z = r(R, 2), B = S(z);
	X(B, {
		icon: "ri:time-line",
		class: "size-5 shrink-0 text-dark-400"
	});
	var V = r(B, 2);
	O(V), G(V, "spellcheck", !1);
	var ee = r(V, 2), te = (e) => {
		var t = Ai(), n = S(t);
		{
			let e = q(() => m(w) ? "ri:check-line" : "ri:alert-line");
			X(n, {
				get icon() {
					return m(e);
				},
				class: "size-4"
			});
		}
		var i = r(n);
		_(t), x((e) => {
			Y(t, 1, e), H(i, ` ${(m(w) ? c() : m(T)) ?? ""}`);
		}, [() => k(Z("inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium", m(w) ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"))]), I(e, t);
	};
	o(ee, (e) => {
		m(v) && e(te);
	}), _(z);
	var U = r(z, 2), W = S(U), K = S(W), J = () => "", ne = (e) => {
		e && P(e);
	};
	Oi(K, {
		type: "single",
		get placeholder() {
			return d();
		},
		get items() {
			return m(D);
		},
		get value() {
			return J();
		},
		set value(e) {
			ne(e);
		}
	}), _(W);
	var re = r(W, 2), ie = (e) => {
		var t = ji(), n = S(t), i = S(n);
		_(n);
		var a = r(n, 2), o = S(a, !0);
		_(a), _(t), x(() => {
			H(i, `${u() ?? ""}:`), H(o, m(E));
		}), I(e, t);
	};
	o(re, (e) => {
		m(E) && e(ie);
	}), _(U), _(L), x((e) => {
		G(V, "id", f), Y(V, 1, e), G(V, "placeholder", i()), V.required = t.required, N(V, n() ?? "");
	}, [() => k(Z("min-w-0 flex-1 border-0 bg-transparent font-mono text-sm text-dark-50 outline-none", ze.md, "px-0 py-0"))]), F("input", V, j), I(e, L), y();
}
B(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-cron-expression.svelte
var Pi = U("<button><!> <span> </span> <!> <!></button>"), Fi = U("<p class=\"mb-3 text-xs font-semibold tracking-wide text-dark-200 uppercase\"> </p> <!>", 1), Ii = U("<!> <!>", 1), Li = U("<p class=\"text-sm text-red-400\"> </p>"), Ri = U("<div><!> <!> <!></div>");
function zi(e, t) {
	s(t, !0);
	let n = M(t, "id", 19, Ae), i = M(t, "value", 3, ""), a = M(t, "placeholder", 3, "0 9 * * 1-5"), c = M(t, "validLabel", 3, "Valid expression"), l = M(t, "invalidLabel", 3, "Invalid cron expression"), u = M(t, "nextRunLabel", 3, "Next run"), d = M(t, "presetsPlaceholder", 3, "Presets"), f = M(t, "editorTitle", 3, "Cron expression"), p = M(t, "emptyLabel", 3, "Configure cron expression"), h = M(t, "editAriaLabel", 3, "Edit cron expression"), v = A(!1), b = q(() => Gr(i())), w = q(() => Yr(m(b))), T = q(() => !!m(b) && !m(w)), E = q(() => m(b) || p()), D = q(() => !m(b));
	var O = Ri(), N = S(O), P = (e) => {
		or(e, {
			get for() {
				return n();
			},
			children: (e, n) => {
				C();
				var r = j();
				x(() => H(r, t.label)), I(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	o(N, (e) => {
		t.label && e(P);
	});
	var F = r(N, 2);
	bt(F, {
		get open() {
			return m(v);
		},
		set open(e) {
			W(v, e, !0);
		},
		children: (e, s) => {
			var p = Ii(), y = g(p);
			xt(y, {
				child: (e, i) => {
					let a = () => i?.().props;
					var s = Pi();
					L(s, (e) => ({
						id: n(),
						type: "button",
						...a(),
						"aria-label": h(),
						class: e
					}), [() => Z("flex w-full items-center gap-2 rounded-xl border bg-dark-700 text-left outline-none transition-all", ze.md, "focus-visible:ring-2", t.error ? "border-red-500 focus-visible:border-red-500/50 focus-visible:ring-red-500" : "border-dark-500 focus-visible:border-primary/50 focus-visible:ring-primary")]);
					var c = S(s);
					X(c, {
						icon: "ri:time-line",
						class: "size-5 shrink-0 text-dark-400"
					});
					var l = r(c, 2), u = S(l, !0);
					_(l);
					var d = r(l, 2), f = (e) => {
						{
							let t = q(() => m(T) ? "ri:check-line" : "ri:alert-line"), n = q(() => Z("size-5 shrink-0", m(T) ? "text-green-400" : "text-amber-400"));
							X(e, {
								get icon() {
									return m(t);
								},
								get class() {
									return m(n);
								}
							});
						}
					};
					o(d, (e) => {
						m(b) && e(f);
					});
					var p = r(d, 2);
					{
						let e = q(() => Z("size-5 shrink-0 text-dark-300 transition-transform", m(v) && "rotate-180"));
						X(p, {
							icon: "ri:arrow-down-s-line",
							get class() {
								return m(e);
							}
						});
					}
					_(s), x((e) => {
						Y(l, 1, e), H(u, m(E));
					}, [() => k(Z("min-w-0 flex-1 truncate text-sm", m(D) ? "font-sans text-dark-300" : "font-mono text-dark-50"))]), I(e, s);
				},
				$$slots: { child: !0 }
			}), yt(r(y, 2), {
				align: "start",
				class: "w-[min(28rem,calc(100vw-2rem))] p-3",
				children: (e, n) => {
					var o = Fi(), s = g(o), p = S(s, !0);
					_(s), Ni(r(s, 2), {
						get value() {
							return i();
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
							return c();
						},
						get invalidLabel() {
							return l();
						},
						get nextRunLabel() {
							return u();
						},
						get presetsPlaceholder() {
							return d();
						},
						get oninput() {
							return t.oninput;
						}
					}), x(() => H(p, f())), I(e, o);
				},
				$$slots: { default: !0 }
			}), I(e, p);
		},
		$$slots: { default: !0 }
	});
	var R = r(F, 2), z = (e) => {
		var n = Li(), r = S(n, !0);
		_(n), x(() => H(r, t.error)), I(e, n);
	};
	o(R, (e) => {
		t.error && e(z);
	}), _(O), x((e) => Y(O, 1, e), [() => k(Z("relative grid w-full gap-2", t.class))]), I(e, O), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text.svelte
var Bi = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"label",
	"id",
	"prependIcon",
	"appendIcon",
	"error",
	"size"
]), Vi = U("<span><!></span>"), Hi = U("<button type=\"button\"><!></button>"), Ui = U("<p class=\"text-sm text-red-400\"> </p>"), Wi = U("<div><!> <div><!> <input/> <!> <!></div> <!></div>");
function Gi(e, t) {
	s(t, !0);
	let n = M(t, "id", 19, Ae), i = M(t, "size", 3, "md"), a = K(t, Bi), c = A(!1), l = q(() => t.type === "password"), u = q(() => !!t.appendIcon || m(l)), d = ze;
	var f = Wi(), p = S(f), h = (e) => {
		or(e, {
			get for() {
				return n();
			},
			children: (e, n) => {
				C();
				var r = j();
				x(() => H(r, t.label)), I(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	o(p, (e) => {
		t.label && e(h);
	});
	var g = r(p, 2), v = S(g), b = (e) => {
		var n = Vi();
		X(S(n), {
			get icon() {
				return t.prependIcon;
			},
			get class() {
				return Pe[i()];
			}
		}), _(n), x((e) => Y(n, 1, e), [() => k(Z("grid h-full place-items-center rounded-l-xl border border-dark-500 bg-dark-700 text-dark-50", Ne[i()]))]), I(e, n);
	};
	o(v, (e) => {
		t.prependIcon && e(b);
	});
	var w = r(v, 2);
	L(w, (e) => ({
		id: n(),
		class: e,
		"aria-invalid": t.error ? !0 : void 0,
		...a,
		type: m(l) ? m(c) ? "text" : "password" : t.type
	}), [() => Z("w-full border bg-dark-700 text-dark-50 outline-none", d[i()], t.error ? "border-red-500" : "border-dark-500", {
		"rounded-l-none rounded-r-xl border-l-0": t.prependIcon,
		"rounded-l-xl rounded-r-none border-r-0": m(u),
		"rounded-xl": !t.prependIcon && !m(u)
	})], void 0, void 0, void 0, !0);
	var T = r(w, 2), E = (e) => {
		var n = Vi();
		X(S(n), {
			get icon() {
				return t.appendIcon;
			},
			get class() {
				return Pe[i()];
			}
		}), _(n), x((e) => Y(n, 1, e), [() => k(Z("grid h-full place-items-center text-dark-50", Ne[i()], m(l) ? "border-y border-r-0 border-l border-dark-500" : "rounded-r-xl border border-l-0 border-dark-500"))]), I(e, n);
	};
	o(T, (e) => {
		t.appendIcon && e(E);
	});
	var D = r(T, 2), O = (e) => {
		var t = Hi(), n = S(t);
		{
			let e = q(() => m(c) ? "mdi:eye-off-outline" : "mdi:eye-outline");
			X(n, {
				get icon() {
					return m(e);
				},
				get class() {
					return Pe[i()];
				}
			});
		}
		_(t), x((e) => {
			Y(t, 1, e), G(t, "aria-label", m(c) ? "Hide password" : "Show password"), G(t, "aria-pressed", m(c));
		}, [() => k(Z("grid h-full place-items-center rounded-r-xl border border-dark-500 border-l-dark-600 bg-dark-700 text-dark-50", Ne[i()]))]), F("click", t, () => W(c, !m(c))), I(e, t);
	};
	o(D, (e) => {
		m(l) && e(O);
	}), _(g);
	var N = r(g, 2), P = (e) => {
		var n = Ui(), r = S(n, !0);
		_(n), x(() => H(r, t.error)), I(e, n);
	};
	o(N, (e) => {
		t.error && e(P);
	}), _(f), x((e, t) => {
		Y(f, 1, e), Y(g, 1, t);
	}, [() => k(Z("relative grid w-full gap-2")), () => k(Z("relative flex w-full items-center rounded-xl", "has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500", t.class))]), I(e, f), y();
}
B(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-file-path.svelte
var Ki = U("<div class=\"grid gap-2\"><div class=\"flex items-end gap-2\"><div class=\"min-w-0 flex-1\"><!></div> <!></div></div>");
function qi(e, t) {
	s(t, !0);
	let n = M(t, "value", 3, ""), i = M(t, "browseLabel", 3, "Browse"), a = M(t, "emptyFileLabel", 3, "No file selected"), o = M(t, "emptyFolderLabel", 3, "No folder selected"), c = A(!1);
	async function l() {
		if (!m(c)) {
			W(c, !0);
			try {
				let e = await t.onBrowse();
				if (!e) return;
				t.onValueChange?.(e);
			} finally {
				W(c, !1);
			}
		}
	}
	var u = Ki(), d = S(u), f = S(d), p = S(f);
	{
		let e = q(() => t.placeholder ?? (t.mode === "folder" ? o() : a()));
		Gi(p, {
			get label() {
				return t.label;
			},
			get placeholder() {
				return m(e);
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
	_(f), Ct(r(f, 2), {
		type: "button",
		variant: "outline",
		onclick: l,
		get disabled() {
			return m(c);
		},
		get isLoading() {
			return m(c);
		},
		icon: "ri:folder-open-line",
		children: (e, t) => {
			C();
			var n = j();
			x(() => H(n, i())), I(e, n);
		},
		$$slots: { default: !0 }
	}), _(d), _(u), I(e, u), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-key-value-list.svelte
var Ji = U("<div class=\"grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] items-center gap-2\"><!> <!> <!></div>"), Yi = U("<p class=\"text-sm text-destructive-50\"> </p>"), Xi = U("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function Zi(e, t) {
	s(t, !0);
	let n = M(t, "entries", 31, () => ee([])), i = M(t, "keyPlaceholder", 3, "KEY"), a = M(t, "valuePlaceholder", 3, "value"), c = M(t, "id", 19, Ae), u = M(t, "addLabel", 3, "Add"), d = M(t, "removeLabel", 3, "Remove"), f = A(ee([]));
	function p(e) {
		return e.map((e) => ({
			id: crypto.randomUUID(),
			key: e.key,
			value: e.value
		}));
	}
	function h() {
		n(m(f).map((e) => ({
			key: e.key,
			value: e.value
		})));
	}
	function g(e, t) {
		W(f, m(f).map((n) => n.id === e ? {
			...n,
			...t
		} : n), !0), h();
	}
	function v(e) {
		W(f, m(f).filter((t) => t.id !== e), !0), h();
	}
	function w() {
		W(f, [...m(f), {
			id: crypto.randomUUID(),
			key: "",
			value: ""
		}], !0), h();
	}
	l(() => {
		let e = n(), t = m(f).map((e) => ({
			key: e.key,
			value: e.value
		}));
		e.length === t.length && e.every((e, n) => e.key === t[n]?.key && e.value === t[n]?.value) || W(f, p(e), !0);
	});
	var T = Xi(), E = S(T), D = (e) => {
		{
			let n = q(() => `${c()}-label`);
			or(e, {
				get id() {
					return m(n);
				},
				children: (e, n) => {
					C();
					var r = j();
					x(() => H(r, t.label)), I(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	o(E, (e) => {
		t.label && e(D);
	});
	var O = r(E, 2), N = S(O);
	b(N, 17, () => m(f), (e) => e.id, (e, t) => {
		var n = Ji(), o = S(n);
		{
			let e = q(() => `${c()}-${m(t).id}-key`);
			Gi(o, {
				get id() {
					return m(e);
				},
				get placeholder() {
					return i();
				},
				get value() {
					return m(t).key;
				},
				oninput: (e) => g(m(t).id, { key: e.currentTarget.value })
			});
		}
		var s = r(o, 2);
		{
			let e = q(() => `${c()}-${m(t).id}-value`);
			Gi(s, {
				get id() {
					return m(e);
				},
				get placeholder() {
					return a();
				},
				get value() {
					return m(t).value;
				},
				oninput: (e) => g(m(t).id, { value: e.currentTarget.value })
			});
		}
		Ct(r(s, 2), {
			variant: "ghost",
			size: "icon",
			type: "button",
			get "aria-label"() {
				return d();
			},
			onclick: () => v(m(t).id),
			children: (e, t) => {
				X(e, {
					icon: "ri:delete-bin-line",
					class: "size-5",
					"aria-hidden": "true"
				});
			},
			$$slots: { default: !0 }
		}), _(n), I(e, n);
	}), Ct(r(N, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: w,
		children: (e, t) => {
			C();
			var n = j();
			x(() => H(n, u())), I(e, n);
		},
		$$slots: { default: !0 }
	}), _(O);
	var P = r(O, 2), F = (e) => {
		var n = Yi(), r = S(n, !0);
		_(n), x(() => H(r, t.error)), I(e, n);
	};
	o(P, (e) => {
		t.error && e(F);
	}), _(T), x((e) => {
		Y(T, 1, e), G(T, "aria-labelledby", t.label ? `${c()}-label` : void 0);
	}, [() => k(Z("grid w-full gap-2", t.class))]), I(e, T), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-one-of.svelte
var Qi = U("<span class=\"text-red-400\" aria-hidden=\"true\">*</span>"), $i = U(" <!>", 1), ea = U("<button type=\"button\" role=\"tab\"> </button>"), ta = U("<p class=\"text-sm text-red-400\"> </p>"), na = U("<div><!> <div role=\"tablist\"></div> <div role=\"tabpanel\"><!></div> <!></div>");
function ra(e, t) {
	s(t, !0);
	let n = M(t, "value", 31, () => ee({
		variant: "",
		values: {}
	})), i = q(() => n().variant || t.variants[0]?.id || "");
	function a(e) {
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
	var l = na(), u = S(l), f = (e) => {
		or(e, {
			children: (e, n) => {
				C();
				var i = $i(), a = g(i), s = r(a), c = (e) => {
					I(e, Qi());
				};
				o(s, (e) => {
					t.required && e(c);
				}), x(() => H(a, `${t.label ?? ""} `)), I(e, i);
			},
			$$slots: { default: !0 }
		});
	};
	o(u, (e) => {
		t.label && e(f);
	});
	var p = r(u, 2);
	b(p, 21, () => t.variants, (e) => e.id, (e, t) => {
		var n = ea(), r = S(n, !0);
		_(n), x((e) => {
			G(n, "id", `tab-${m(t).id}`), G(n, "aria-selected", m(i) === m(t).id), G(n, "aria-controls", `panel-${m(t).id}`), Y(n, 1, e), H(r, m(t).label);
		}, [() => k(Z("rounded-lg px-3 py-1.5 text-sm font-medium transition-colors", m(i) === m(t).id ? "bg-dark-600 text-dark-50" : "text-dark-200 hover:bg-dark-800 hover:text-dark-50"))]), F("click", n, () => a(m(t).id)), I(e, n);
	}), _(p);
	var h = r(p, 2);
	d(S(h), () => t.panel, () => ({
		variantId: m(i),
		value: n().values[m(i)],
		setValue: (e) => c(m(i), e)
	})), _(h);
	var v = r(h, 2), w = (e) => {
		var n = ta(), r = S(n, !0);
		_(n), x(() => H(r, t.error)), I(e, n);
	};
	o(v, (e) => {
		t.error && e(w);
	}), _(l), x((e, n) => {
		Y(l, 1, e), Y(p, 1, n), G(p, "aria-label", t.label), G(h, "id", `panel-${m(i)}`), G(h, "aria-labelledby", `tab-${m(i)}`);
	}, [() => k(Z("grid w-full gap-2")), () => k(Z("inline-flex w-fit gap-0.5 rounded-xl border border-dark-600 bg-dark-800 p-1", t.error && "border-red-500"))]), I(e, l), y();
}
B(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-select-text.svelte
var ia = new Set([
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
]), aa = U("<!> <!>", 1), oa = U("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), sa = U(" <!>", 1), ca = U("<!> <!> <!>", 1), la = U("<div class=\"flex flex-wrap gap-1.5\"></div>"), ua = U("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), da = U("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), fa = U("<p class=\"text-sm text-red-400\"> </p>"), pa = U("<div><!> <div><!> <input/></div> <!> <!> <!></div>");
function ma(e, t) {
	s(t, !0);
	let n = M(t, "variables", 19, () => []), a = M(t, "id", 19, Ae), c = M(t, "value", 31, () => ee({
		type: "",
		value: ""
	})), l = K(t, ia), u = q(() => t.selectPlaceholder ?? "Select"), d = q(() => t.loadingPlaceholder ?? "Loading..."), p = gi(() => t.items), v = A(null), w = A(!1), T = A(""), E = A(0), O = q(() => {
		if (!m(T)) return n();
		let e = m(T).toLowerCase();
		return n().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function N() {
		if (!m(v)) return null;
		let e = c().value, t = m(v).selectionStart ?? e.length, n = e.slice(0, t), r = n.lastIndexOf("{");
		if (r === -1) return null;
		let i = n.slice(r + 1);
		return i.includes("}") ? null : {
			start: r,
			partial: i
		};
	}
	function P() {
		let e = N();
		if (!e || n().length === 0) {
			W(w, !1), W(T, ""), W(E, 0);
			return;
		}
		W(T, e.partial, !0), W(w, m(O).length > 0), W(E, 0);
	}
	function R(e) {
		let t = N();
		if (!t || !m(v)) return;
		let n = c().value, r = m(v).selectionStart ?? n.length, i = n.slice(0, t.start), a = n.slice(r);
		c({
			...c(),
			value: `${i}{${e}}${a}`
		}), W(w, !1), W(T, ""), queueMicrotask(() => {
			if (!m(v)) return;
			let t = i.length + e.length + 2;
			m(v).focus(), m(v).setSelectionRange(t, t);
		});
	}
	function B(e) {
		let t = c().value;
		if (!m(v)) {
			c({
				...c(),
				value: `${t}{${e}}`
			});
			return;
		}
		let n = m(v).selectionStart ?? t.length, r = t.slice(0, n), i = t.slice(n);
		c({
			...c(),
			value: `${r}{${e}}${i}`
		}), queueMicrotask(() => {
			let t = r.length + e.length + 2;
			m(v)?.focus(), m(v)?.setSelectionRange(t, t);
		});
	}
	let V = () => {
		P();
	}, te = (e) => {
		if (!(!m(w) || m(O).length === 0)) {
			if (e.key === "ArrowDown") {
				e.preventDefault(), W(E, (m(E) + 1) % m(O).length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault(), W(E, (m(E) - 1 + m(O).length) % m(O).length);
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				let t = m(O)[m(E)];
				t && (e.preventDefault(), R(t.key));
				return;
			}
			e.key === "Escape" && W(w, !1);
		}
	}, U = () => {
		setTimeout(() => {
			W(w, !1);
		}, 120);
	};
	var J = pa(), ne = S(J), re = (e) => {
		or(e, {
			get for() {
				return a();
			},
			children: (e, n) => {
				C();
				var r = j();
				x(() => H(r, t.label)), I(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	o(ne, (e) => {
		t.label && e(re);
	});
	var ie = r(ne, 2), ae = S(ie);
	i(ae, () => zn, (e, n) => {
		n(e, {
			type: "single",
			get items() {
				return p.items;
			},
			get value() {
				return c().type;
			},
			set value(e) {
				c(c().type = e, !0);
			},
			children: (e, n) => {
				var a = aa(), s = g(a);
				{
					let e = q(() => Z("flex shrink-0 cursor-pointer items-center justify-between gap-2 rounded-l-xl border border-r-0 bg-dark-700 text-dark-50 outline-none", ze.md, t.error ? "border-red-500" : "border-dark-500", t.selectClass));
					i(s, () => Gn, (t, n) => {
						n(t, {
							get class() {
								return m(e);
							},
							children: (e, t) => {
								var n = aa(), a = g(n);
								{
									let e = q(() => p.loading ? m(d) : m(u));
									i(a, () => Hn, (t, n) => {
										n(t, {
											get placeholder() {
												return m(e);
											},
											class: "truncate data-placeholder:text-dark-300"
										});
									});
								}
								X(r(a, 2), {
									icon: "ri:expand-up-down-line",
									class: "size-5 shrink-0 text-dark-300"
								}), I(e, n);
							},
							$$slots: { default: !0 }
						});
					});
				}
				i(r(s, 2), () => pt, (e, n) => {
					n(e, {
						children: (e, n) => {
							var a = D(), s = g(a);
							{
								let e = q(() => t.contentProps?.sideOffset ?? 4), n = q(() => Z("z-50 max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", t.contentProps?.class));
								i(s, () => hn, (a, s) => {
									s(a, z(() => t.contentProps, {
										get sideOffset() {
											return m(e);
										},
										get class() {
											return m(n);
										},
										children: (e, t) => {
											var n = ca(), a = g(n);
											i(a, () => Mn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														X(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = r(a, 2);
											i(s, () => wn, (e, t) => {
												t(e, {
													children: (e, t) => {
														var n = D(), a = g(n), s = (e) => {
															var t = oa(), n = S(t, !0);
															_(t), x(() => H(n, m(d))), I(e, t);
														}, c = (e) => {
															var t = D();
															b(g(t), 17, () => p.items, ({ value: e, label: t, disabled: n }) => e, (e, t) => {
																let n = () => m(t).value, a = () => m(t).label, s = () => m(t).disabled;
																var c = D(), l = g(c);
																{
																	let e = (e, t) => {
																		let n = () => t?.().selected;
																		C();
																		var i = sa(), s = g(i), c = r(s), l = (e) => {
																			X(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		o(c, (e) => {
																			n() && e(l);
																		}), x(() => H(s, `${a() ?? ""} `)), I(e, i);
																	}, t = q(() => Z("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	i(l, () => bn, (r, i) => {
																		i(r, {
																			get value() {
																				return n();
																			},
																			get label() {
																				return a();
																			},
																			get disabled() {
																				return s();
																			},
																			get class() {
																				return m(t);
																			},
																			children: e,
																			$$slots: { default: !0 }
																		});
																	});
																}
																I(e, c);
															}), I(e, t);
														};
														o(a, (e) => {
															p.loading ? e(s) : e(c, -1);
														}), I(e, n);
													},
													$$slots: { default: !0 }
												});
											}), i(r(s, 2), () => On, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														X(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), I(e, n);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							I(e, a);
						},
						$$slots: { default: !0 }
					});
				}), I(e, a);
			},
			$$slots: { default: !0 }
		});
	});
	var Q = r(ae, 2);
	L(Q, (e) => ({
		id: a(),
		placeholder: t.placeholder,
		class: e,
		"aria-invalid": t.error ? !0 : void 0,
		oninput: n().length > 0 ? V : void 0,
		onkeydown: n().length > 0 ? te : void 0,
		onblur: n().length > 0 ? U : void 0,
		onfocus: n().length > 0 ? P : void 0,
		onclick: n().length > 0 ? P : void 0,
		...l
	}), [() => Z("w-full rounded-r-xl border bg-dark-700 text-dark-50 outline-none", ze.md, t.error ? "border-red-500" : "border-dark-500")], void 0, void 0, void 0, !0), f(Q, (e) => W(v, e), () => m(v)), _(ie);
	var oe = r(ie, 2), se = (e) => {
		var t = la();
		b(t, 21, n, (e) => e.key, (e, t) => {
			Ct(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return m(t).label;
				},
				onclick: () => B(m(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					C();
					var r = j();
					x(() => H(r, `{${m(t).key}}`)), I(e, r);
				},
				$$slots: { default: !0 }
			});
		}), _(t), I(e, t);
	};
	o(oe, (e) => {
		n().length > 0 && e(se);
	});
	var ce = r(oe, 2), le = (e) => {
		var t = da();
		b(t, 23, () => m(O), (e) => e.key, (e, t, n) => {
			var i = ua(), a = S(i), o = S(a), s = S(o, !0);
			_(o);
			var c = r(o, 2), l = S(c, !0);
			_(c), _(a), _(i), x((e) => {
				G(a, "aria-selected", m(n) === m(E)), Y(a, 1, e), H(s, `{${m(t).key}}`), H(l, m(t).label);
			}, [() => k(Z("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", m(n) === m(E) && "bg-dark-700"))]), F("mousedown", a, (e) => {
				e.preventDefault(), R(m(t).key);
			}), I(e, i);
		}), _(t), I(e, t);
	};
	o(ce, (e) => {
		m(w) && m(O).length > 0 && e(le);
	});
	var ue = r(ce, 2), de = (e) => {
		var n = fa(), r = S(n, !0);
		_(n), x(() => H(r, t.error)), I(e, n);
	};
	o(ue, (e) => {
		t.error && e(de);
	}), _(J), x((e, t) => {
		Y(J, 1, e), Y(ie, 1, t);
	}, [() => k(Z("relative grid w-full gap-2", t.class)), () => k(Z("flex w-full items-stretch rounded-xl has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500"))]), h(Q, () => c().value, (e) => c(c().value = e, !0)), I(e, J), y();
}
B(["mousedown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-slider.svelte
var ha = U("<div class=\"flex items-center justify-between gap-4\"><!> <span class=\"text-sm text-dark-100\"> </span></div>"), ga = U("<p class=\"text-sm text-red-500\"> </p>"), _a = U("<div><!> <input type=\"range\"/> <!></div>");
function va(e, t) {
	s(t, !0);
	let n = M(t, "id", 19, Ae), i = M(t, "min", 3, 0), a = M(t, "max", 3, 100), c = M(t, "step", 3, 1), l = M(t, "value", 15, 0);
	var u = _a(), d = S(u), f = (e) => {
		var i = ha(), a = S(i);
		or(a, {
			get for() {
				return n();
			},
			children: (e, n) => {
				C();
				var r = j();
				x(() => H(r, t.label)), I(e, r);
			},
			$$slots: { default: !0 }
		});
		var o = r(a, 2), s = S(o);
		_(o), _(i), x(() => H(s, `${l() ?? ""}%`)), I(e, i);
	};
	o(d, (e) => {
		t.label && e(f);
	});
	var p = r(d, 2);
	O(p);
	var m = r(p, 2), g = (e) => {
		var n = ga(), r = S(n, !0);
		_(n), x(() => H(r, t.error)), I(e, n);
	};
	o(m, (e) => {
		t.error && e(g);
	}), _(u), x((e, t) => {
		Y(u, 1, e), G(p, "id", n()), G(p, "min", i()), G(p, "max", a()), G(p, "step", c()), Y(p, 1, t);
	}, [() => k(Z("grid w-full gap-2")), () => k(Z("h-2 w-full cursor-pointer appearance-none rounded-full bg-dark-600 accent-primary", t.error && "ring-1 ring-red-500"))]), F("input", p, () => t.onvaluechange?.(l())), h(p, l), I(e, u), y();
}
B(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-switch.svelte
var ya = U("<p class=\"text-sm text-red-400\"> </p>"), ba = U("<div><div class=\"flex items-center gap-3\"><!> <!></div> <!></div>");
function xa(e, t) {
	s(t, !0);
	let n = M(t, "checked", 15, !1), a = M(t, "id", 19, Ae);
	var c = ba(), l = S(c), u = S(l);
	{
		let e = q(() => t.label ? `${a()}-label` : void 0), r = q(() => t.error ? !0 : void 0), o = q(() => Z("inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors outline-none", "data-[state=checked]:bg-primary/15", t.error ? "data-[state=unchecked]:bg-red-500/30" : "data-[state=unchecked]:bg-dark-600", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
		i(u, () => tr, (t, s) => {
			s(t, {
				get id() {
					return a();
				},
				get "aria-labelledby"() {
					return m(e);
				},
				get "aria-invalid"() {
					return m(r);
				},
				get class() {
					return m(o);
				},
				get checked() {
					return n();
				},
				set checked(e) {
					n(e);
				},
				children: (e, t) => {
					var n = D(), r = g(n);
					{
						let e = q(() => Z("pointer-events-none block size-5 shrink-0 rounded-full bg-white transition-transform", "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0", "data-[state=checked]:bg-primary"));
						i(r, () => ir, (t, n) => {
							n(t, { get class() {
								return m(e);
							} });
						});
					}
					I(e, n);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var d = r(u, 2), f = (e) => {
		or(e, {
			get id() {
				return `${a() ?? ""}-label`;
			},
			get for() {
				return a();
			},
			class: "cursor-pointer",
			children: (e, n) => {
				C();
				var r = j();
				x(() => H(r, t.label)), I(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	o(d, (e) => {
		t.label && e(f);
	}), _(l);
	var p = r(l, 2), h = (e) => {
		var n = ya(), r = S(n, !0);
		_(n), x(() => H(r, t.error)), I(e, n);
	};
	o(p, (e) => {
		t.error && e(h);
	}), _(c), x((e) => Y(c, 1, e), [() => k(Z("grid gap-2", t.class))]), I(e, c), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-list.svelte
var Sa = U("<div class=\"flex items-center gap-2\"><!> <!></div>"), Ca = U("<p class=\"text-sm text-destructive-50\"> </p>"), wa = U("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function Ta(e, t) {
	s(t, !0);
	let n = M(t, "values", 31, () => ee([])), i = M(t, "id", 19, Ae), a = M(t, "addLabel", 3, "Add"), c = M(t, "removeLabel", 3, "Remove"), u = A(ee([]));
	function d(e) {
		return e.map((e) => ({
			id: crypto.randomUUID(),
			value: e
		}));
	}
	function f() {
		n(m(u).map((e) => e.value));
	}
	function p(e, t) {
		W(u, m(u).map((n) => n.id === e ? {
			...n,
			value: t
		} : n), !0), f();
	}
	function h(e) {
		W(u, m(u).filter((t) => t.id !== e), !0), f();
	}
	function g() {
		W(u, [...m(u), {
			id: crypto.randomUUID(),
			value: ""
		}], !0), f();
	}
	l(() => {
		let e = n(), t = m(u).map((e) => e.value);
		e.length === t.length && e.every((e, n) => e === t[n]) || W(u, d(e), !0);
	});
	var v = wa(), w = S(v), T = (e) => {
		{
			let n = q(() => `${i()}-label`);
			or(e, {
				get id() {
					return m(n);
				},
				children: (e, n) => {
					C();
					var r = j();
					x(() => H(r, t.label)), I(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	o(w, (e) => {
		t.label && e(T);
	});
	var E = r(w, 2), D = S(E);
	b(D, 17, () => m(u), (e) => e.id, (e, n) => {
		var a = Sa(), o = S(a);
		{
			let e = q(() => `${i()}-${m(n).id}`);
			Gi(o, {
				get id() {
					return m(e);
				},
				get placeholder() {
					return t.placeholder;
				},
				get value() {
					return m(n).value;
				},
				oninput: (e) => p(m(n).id, e.currentTarget.value)
			});
		}
		Ct(r(o, 2), {
			variant: "ghost",
			size: "icon",
			type: "button",
			get "aria-label"() {
				return c();
			},
			onclick: () => h(m(n).id),
			children: (e, t) => {
				X(e, {
					icon: "ri:delete-bin-line",
					class: "size-5",
					"aria-hidden": "true"
				});
			},
			$$slots: { default: !0 }
		}), _(a), I(e, a);
	}), Ct(r(D, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: g,
		children: (e, t) => {
			C();
			var n = j();
			x(() => H(n, a())), I(e, n);
		},
		$$slots: { default: !0 }
	}), _(E);
	var O = r(E, 2), N = (e) => {
		var n = Ca(), r = S(n, !0);
		_(n), x(() => H(r, t.error)), I(e, n);
	};
	o(O, (e) => {
		t.error && e(N);
	}), _(v), x((e) => {
		Y(v, 1, e), G(v, "aria-labelledby", t.label ? `${i()}-label` : void 0);
	}, [() => k(Z("grid w-full gap-2", t.class))]), I(e, v), y();
}
//#endregion
//#region ../ui/src/lib/components/input/use-dropdown-scroll.svelte.ts
var Ea = class {
	#e = A(0);
	get scrollTop() {
		return m(this.#e);
	}
	set scrollTop(e) {
		W(this.#e, e, !0);
	}
	#t = A(null);
	get viewportRef() {
		return m(this.#t);
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
		let t = bi(e);
		this.scrollTop = t, this.viewportRef && (this.viewportRef.scrollTop = t);
	}
	scrollToValue(e, t) {
		if (!t) return;
		let n = e.findIndex((e) => e.value === t);
		n >= 0 && this.scrollToIndex(n);
	}
}, Da = U("<div class=\"relative w-full\"><div class=\"absolute inset-x-0 top-0\"></div></div>");
function Oa(e, t) {
	s(t, !0);
	let n = M(t, "viewportHeight", 3, 200), r = q(() => yi(t.items.length)), i = q(() => m(r) ? vi(t.items, t.scrollTop, n()) : null), a = q(() => m(r) && m(i) ? m(i).items : t.items);
	var c = D(), l = g(c), u = (e) => {
		var n = Da();
		let r;
		var o = S(n);
		let s;
		b(o, 21, () => m(a), (e) => e.value, (e, n) => {
			var r = D();
			d(g(r), () => t.item, () => m(n)), I(e, r);
		}), _(o), _(n), x(() => {
			r = T(n, "", r, { height: `${m(i).totalHeight}px` }), s = T(o, "", s, { transform: `translateY(${m(i).offsetY}px)` });
		}), I(e, n);
	}, f = (e) => {
		var n = D();
		b(g(n), 17, () => m(a), (e) => e.value, (e, n) => {
			var r = D();
			d(g(r), () => t.item, () => m(n)), I(e, r);
		}), I(e, n);
	};
	o(l, (e) => {
		m(r) && m(i) ? e(u) : e(f, -1);
	}), I(e, c), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-select.svelte
var ka = (e, t = V) => {
	let n = q(() => t().value), a = q(() => t().label), s = q(() => t().disabled);
	var c = D(), l = g(c);
	{
		let e = (e, t) => {
			let n = () => t?.().selected;
			C();
			var i = ja(), s = g(i), c = r(s), l = (e) => {
				X(e, {
					icon: "ri:check-line",
					class: "size-5 text-primary"
				});
			};
			o(c, (e) => {
				n() && e(l);
			}), x(() => H(s, `${m(a) ?? ""} `)), I(e, i);
		}, t = q(() => Z("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
		i(l, () => bn, (r, i) => {
			i(r, {
				get value() {
					return m(n);
				},
				get label() {
					return m(a);
				},
				get disabled() {
					return m(s);
				},
				get class() {
					return m(t);
				},
				children: e,
				$$slots: { default: !0 }
			});
		});
	}
	I(e, c);
}, Aa = new Set([
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
]), ja = U(" <!>", 1), Ma = U("<span class=\"text-red-400\">*</span>"), Na = U("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Pa = U("<div class=\"px-3 py-1.5 text-sm text-dark-300\"></div>"), Fa = U("<!> <!> <!>", 1), Ia = U("<div><!> <button type=\"button\" aria-haspopup=\"listbox\"><!></button></div> <!>", 1), La = U("<p class=\"text-sm text-red-400\"> </p>"), Ra = U("<div><!> <!> <!></div>");
function za(e, t) {
	s(t, !0);
	let n = M(t, "allowCustomValue", 3, !0), c = M(t, "id", 19, Ae), l = M(t, "value", 15, ""), d = K(t, Aa), f = q(() => t.placeholder), p = q(() => t.loadingPlaceholder ?? "Loading..."), h = q(() => t.selectAriaLabel ?? "Select value"), v = A(!1), b = A(""), w = A(!1), T = new Ea(), E = gi(() => t.items, () => t.reloadKey?.()), O = new ui(() => m(b), 100), j = q(() => new Map(E.items.map((e) => [e.value, e]))), N = q(() => m(j).get(l())), P = q(() => m(N)?.value ?? ""), L = q(() => {
		if (E.loading) return [];
		let e = O.current.trim();
		return e ? _i(E.items, e) : E.items;
	}), R = q(() => m(N) && !m(L).some((e) => e.value === m(N).value) ? [m(N), ...m(L)] : m(L));
	function B() {
		m(w) || W(b, m(N)?.label ?? (n() ? l() : ""), !0);
	}
	a(() => {
		l(), m(N)?.label, B();
	}), a(() => {
		O.current, m(v) && T.resetScroll();
	});
	function V() {
		W(v, m(L).length > 0 || E.items.length > 0, !0);
	}
	function ee(e) {
		W(b, e.currentTarget.value, !0), W(w, !0), n() && l(m(b)), V();
	}
	function te() {
		W(v, !0);
	}
	function U() {
		W(w, !1), B();
	}
	async function J(e) {
		if (W(v, e, !0), !e) {
			W(w, !1), T.resetScroll(), B();
			return;
		}
		await u(), T.scrollToValue(m(L), l());
	}
	function ne() {
		W(v, !0);
	}
	let re = q(() => De(d, {
		id: c(),
		placeholder: E.loading ? m(p) : m(f),
		autocomplete: "off",
		class: Z("w-full rounded-l-xl border border-r-0 bg-dark-700 text-dark-50 outline-none", ze.md, t.error ? "border-red-500" : "border-dark-500"),
		"aria-invalid": t.error ? !0 : void 0,
		oninput: ee,
		onfocus: te,
		onblur: U
	}));
	var ie = Ra(), ae = S(ie), Q = (e) => {
		or(e, {
			get for() {
				return c();
			},
			children: (e, n) => {
				C();
				var i = ja(), a = g(i), s = r(a), c = (e) => {
					I(e, Ma());
				};
				o(s, (e) => {
					t.required && e(c);
				}), x(() => H(a, `${t.label ?? ""} `)), I(e, i);
			},
			$$slots: { default: !0 }
		});
	};
	o(ae, (e) => {
		t.label && e(Q);
	});
	var oe = r(ae, 2);
	{
		let e = q(() => !!t.disabled);
		i(oe, () => ln, (n, a) => {
			a(n, {
				type: "single",
				get items() {
					return m(R);
				},
				get inputValue() {
					return m(b);
				},
				get value() {
					return m(P);
				},
				onValueChange: (e) => {
					e && (l(e), W(w, !1), W(v, !1), B());
				},
				onOpenChange: J,
				get disabled() {
					return m(e);
				},
				get open() {
					return m(v);
				},
				set open(e) {
					W(v, e, !0);
				},
				children: (e, n) => {
					var a = Ia(), s = g(a), c = S(s);
					i(c, () => fn, (e, t) => {
						t(e, z(() => m(re)));
					});
					var l = r(c, 2);
					X(S(l), {
						icon: "ri:expand-up-down-line",
						class: "size-5 shrink-0 text-dark-300"
					}), _(l), _(s), i(r(s, 2), () => pt, (e, n) => {
						n(e, {
							children: (e, n) => {
								var a = D(), s = g(a);
								{
									let e = q(() => t.contentProps?.sideOffset ?? 4), n = q(() => Z("z-50 max-h-84 min-w-(--bits-combobox-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", t.contentProps?.class));
									i(s, () => hn, (a, s) => {
										s(a, z(() => t.contentProps, {
											get sideOffset() {
												return m(e);
											},
											get class() {
												return m(n);
											},
											children: (e, t) => {
												var n = Fa(), a = g(n);
												i(a, () => Mn, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															X(e, { icon: "ri:arrow-up-s-line" });
														},
														$$slots: { default: !0 }
													});
												});
												var s = r(a, 2);
												i(s, () => wn, (e, t) => {
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
															var n = D(), r = g(n), i = (e) => {
																var t = Na(), n = S(t, !0);
																_(t), x(() => H(n, m(p))), I(e, t);
															}, a = (e) => {
																Oa(e, {
																	get items() {
																		return m(L);
																	},
																	get scrollTop() {
																		return T.scrollTop;
																	},
																	get item() {
																		return ka;
																	}
																});
															}, s = (e) => {
																var t = Pa();
																t.textContent = "No matches found", I(e, t);
															};
															o(r, (e) => {
																E.loading ? e(i) : m(L).length > 0 ? e(a, 1) : e(s, -1);
															}), I(e, n);
														},
														$$slots: { default: !0 }
													});
												}), i(r(s, 2), () => On, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															X(e, { icon: "ri:arrow-down-s-line" });
														},
														$$slots: { default: !0 }
													});
												}), I(e, n);
											},
											$$slots: { default: !0 }
										}));
									});
								}
								I(e, a);
							},
							$$slots: { default: !0 }
						});
					}), x((e, n) => {
						Y(s, 1, e), G(l, "aria-label", m(h)), G(l, "aria-expanded", m(v)), l.disabled = !!t.disabled, Y(l, 1, n);
					}, [() => k(Z("flex w-full items-stretch rounded-xl has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500")), () => k(Z("flex shrink-0 cursor-pointer items-center justify-center rounded-r-xl border bg-dark-700 text-dark-50 outline-none", ze.md, t.error ? "border-red-500" : "border-dark-500", t.selectClass))]), F("click", l, ne), I(e, a);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var se = r(oe, 2), ce = (e) => {
		var n = La(), r = S(n, !0);
		_(n), x(() => H(r, t.error)), I(e, n);
	};
	o(se, (e) => {
		t.error && e(ce);
	}), _(ie), x((e) => Y(ie, 1, e), [() => k(Z("relative grid w-full gap-2", t.class))]), I(e, ie), y();
}
B(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-select-text.svelte
var Ba = new Set([
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
]), Va = U("<!> <!>", 1), Ha = U("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Ua = U(" <!>", 1), Wa = U("<!> <!> <!>", 1), Ga = U("<div aria-hidden=\"true\">—</div>"), Ka = U("<input/>"), qa = U("<div class=\"flex shrink-0 items-center self-center\"><!></div>"), Ja = U("<div class=\"flex flex-wrap gap-1.5\"></div>"), Ya = U("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), Xa = U("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), Za = U("<p class=\"text-sm text-red-400\"> </p>"), Qa = U("<div><!> <div class=\"flex items-center gap-3\"><div><input/> <!> <!></div> <!></div> <!> <!> <!></div>");
function $a(e, t) {
	s(t, !0);
	let n = M(t, "variables", 19, () => []), a = M(t, "valuelessOperators", 19, () => []), c = M(t, "id", 19, Ae), l = M(t, "value", 31, () => ee({
		path: "",
		type: "equals",
		value: ""
	})), u = K(t, Ba), p = q(() => t.selectPlaceholder ?? "Select"), v = q(() => t.loadingPlaceholder ?? "Loading..."), w = gi(() => t.items), T = A(null), N = A(null), R = A("path"), B = A(!1), V = A(""), te = A(0), U = q(() => {
		if (!m(V)) return n();
		let e = m(V).toLowerCase();
		return n().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function J(e) {
		return m(e === "path" ? T : N);
	}
	function ne(e) {
		return e === "path" ? l().path : l().value;
	}
	function re(e, t) {
		if (e === "path") {
			l({
				...l(),
				path: t
			});
			return;
		}
		l({
			...l(),
			value: t
		});
	}
	function ie(e) {
		let t = J(e);
		if (!t) return null;
		let n = ne(e), r = t.selectionStart ?? n.length, i = n.slice(0, r), a = i.lastIndexOf("{");
		if (a === -1) return null;
		let o = i.slice(a + 1);
		return o.includes("}") ? null : {
			start: a,
			partial: o
		};
	}
	function ae(e) {
		W(R, e, !0);
		let t = ie(e);
		if (!t || n().length === 0) {
			W(B, !1), W(V, ""), W(te, 0);
			return;
		}
		W(V, t.partial, !0), W(B, m(U).length > 0), W(te, 0);
	}
	function Q(e, t = m(R)) {
		let n = ie(t), r = J(t);
		if (!n || !r) return;
		let i = ne(t), a = r.selectionStart ?? i.length, o = i.slice(0, n.start);
		re(t, `${o}{${e}}${i.slice(a)}`), W(B, !1), W(V, ""), queueMicrotask(() => {
			if (!r) return;
			let t = o.length + e.length + 2;
			r.focus(), r.setSelectionRange(t, t);
		});
	}
	function oe(e, t = m(R)) {
		let n = ne(t), r = J(t);
		if (!r) {
			re(t, `${n}{${e}}`);
			return;
		}
		let i = r.selectionStart ?? n.length, a = n.slice(0, i);
		re(t, `${a}{${e}}${n.slice(i)}`), queueMicrotask(() => {
			let t = a.length + e.length + 2;
			r.focus(), r.setSelectionRange(t, t);
		});
	}
	let se = (e) => ({
		handleInput: () => {
			ae(e);
		},
		handleKeydown: (t) => {
			if (!(!m(B) || m(U).length === 0 || m(R) !== e)) {
				if (t.key === "ArrowDown") {
					t.preventDefault(), W(te, (m(te) + 1) % m(U).length);
					return;
				}
				if (t.key === "ArrowUp") {
					t.preventDefault(), W(te, (m(te) - 1 + m(U).length) % m(U).length);
					return;
				}
				if (t.key === "Enter" || t.key === "Tab") {
					let n = m(U)[m(te)];
					n && (t.preventDefault(), Q(n.key, e));
					return;
				}
				t.key === "Escape" && W(B, !1);
			}
		},
		handleBlur: () => {
			ce && clearTimeout(ce), ce = setTimeout(() => {
				W(B, !1), ce = void 0;
			}, 120);
		}
	}), ce;
	E(() => {
		ce && clearTimeout(ce);
	});
	let le = se("path"), ue = se("value"), de = q(() => t.error ? "border-red-500" : "border-dark-500"), fe = q(() => a().includes(l().type));
	var pe = Qa(), me = S(pe), he = (e) => {
		or(e, {
			get for() {
				return c();
			},
			children: (e, n) => {
				C();
				var r = j();
				x(() => H(r, t.label)), I(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	o(me, (e) => {
		t.label && e(he);
	});
	var ge = r(me, 2), _e = S(ge), ve = S(_e);
	L(ve, (e) => ({
		id: c(),
		placeholder: t.pathPlaceholder,
		class: e,
		"aria-invalid": t.error ? !0 : void 0,
		role: n().length > 0 ? "combobox" : void 0,
		"aria-autocomplete": n().length > 0 ? "list" : void 0,
		"aria-expanded": n().length > 0 ? m(B) && m(R) === "path" && m(U).length > 0 : void 0,
		"aria-controls": n().length > 0 ? `${c()}-listbox` : void 0,
		"aria-activedescendant": m(B) && m(R) === "path" && m(U).length > 0 ? `${c()}-option-${m(te)}` : void 0,
		oninput: n().length > 0 ? le.handleInput : void 0,
		onkeydown: n().length > 0 ? le.handleKeydown : void 0,
		onblur: n().length > 0 ? le.handleBlur : void 0,
		onfocus: n().length > 0 ? () => ae("path") : void 0,
		onclick: n().length > 0 ? () => ae("path") : void 0,
		...u
	}), [() => Z("min-w-0 flex-1 border border-r bg-dark-700 text-dark-50 outline-none", "rounded-l-xl", ze.md, m(de))], void 0, void 0, void 0, !0), f(ve, (e) => W(T, e), () => m(T));
	var ye = r(ve, 2);
	i(ye, () => zn, (e, n) => {
		n(e, {
			type: "single",
			get items() {
				return w.items;
			},
			get value() {
				return l().type;
			},
			set value(e) {
				l(l().type = e, !0);
			},
			children: (e, n) => {
				var a = Va(), s = g(a);
				{
					let e = q(() => Z("flex shrink-0 cursor-pointer items-center justify-between gap-2 border border-x-0 bg-dark-700 text-dark-50 outline-none", ze.md, m(de), t.selectClass ?? "w-32"));
					i(s, () => Gn, (t, n) => {
						n(t, {
							get class() {
								return m(e);
							},
							children: (e, t) => {
								var n = Va(), a = g(n);
								{
									let e = q(() => w.loading ? m(v) : m(p));
									i(a, () => Hn, (t, n) => {
										n(t, {
											get placeholder() {
												return m(e);
											},
											class: "truncate data-placeholder:text-dark-300"
										});
									});
								}
								X(r(a, 2), {
									icon: "ri:expand-up-down-line",
									class: "size-5 shrink-0 text-dark-300"
								}), I(e, n);
							},
							$$slots: { default: !0 }
						});
					});
				}
				i(r(s, 2), () => pt, (e, n) => {
					n(e, {
						children: (e, n) => {
							var a = D(), s = g(a);
							{
								let e = q(() => t.contentProps?.sideOffset ?? 4), n = q(() => Z("z-50 max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", t.contentProps?.class));
								i(s, () => hn, (a, s) => {
									s(a, z(() => t.contentProps, {
										get sideOffset() {
											return m(e);
										},
										get class() {
											return m(n);
										},
										children: (e, t) => {
											var n = Wa(), a = g(n);
											i(a, () => Mn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														X(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = r(a, 2);
											i(s, () => wn, (e, t) => {
												t(e, {
													children: (e, t) => {
														var n = D(), a = g(n), s = (e) => {
															var t = Ha(), n = S(t, !0);
															_(t), x(() => H(n, m(v))), I(e, t);
														}, c = (e) => {
															var t = D();
															b(g(t), 17, () => w.items, ({ value: e, label: t, disabled: n }) => e, (e, t) => {
																let n = () => m(t).value, a = () => m(t).label, s = () => m(t).disabled;
																var c = D(), l = g(c);
																{
																	let e = (e, t) => {
																		let n = () => t?.().selected;
																		C();
																		var i = Ua(), s = g(i), c = r(s), l = (e) => {
																			X(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		o(c, (e) => {
																			n() && e(l);
																		}), x(() => H(s, `${a() ?? ""} `)), I(e, i);
																	}, t = q(() => Z("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	i(l, () => bn, (r, i) => {
																		i(r, {
																			get value() {
																				return n();
																			},
																			get label() {
																				return a();
																			},
																			get disabled() {
																				return s();
																			},
																			get class() {
																				return m(t);
																			},
																			children: e,
																			$$slots: { default: !0 }
																		});
																	});
																}
																I(e, c);
															}), I(e, t);
														};
														o(a, (e) => {
															w.loading ? e(s) : e(c, -1);
														}), I(e, n);
													},
													$$slots: { default: !0 }
												});
											}), i(r(s, 2), () => On, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														X(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), I(e, n);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							I(e, a);
						},
						$$slots: { default: !0 }
					});
				}), I(e, a);
			},
			$$slots: { default: !0 }
		});
	});
	var be = r(ye, 2), xe = (e) => {
		var t = Ga();
		x((e) => Y(t, 1, e), [() => k(Z("flex min-w-0 items-center rounded-r-xl border border-l-0 bg-dark-700 px-3 text-dark-500 select-none", ze.md, m(de)))]), I(e, t);
	}, Se = (e) => {
		var r = Ka();
		O(r), f(r, (e) => W(N, e), () => m(N)), x((e) => {
			G(r, "placeholder", t.valuePlaceholder), Y(r, 1, e), G(r, "aria-invalid", t.error ? !0 : void 0), G(r, "role", n().length > 0 ? "combobox" : void 0), G(r, "aria-autocomplete", n().length > 0 ? "list" : void 0), G(r, "aria-expanded", n().length > 0 ? m(B) && m(R) === "value" && m(U).length > 0 : void 0), G(r, "aria-controls", n().length > 0 ? `${c()}-listbox` : void 0), G(r, "aria-activedescendant", m(B) && m(R) === "value" && m(U).length > 0 ? `${c()}-option-${m(te)}` : void 0);
		}, [() => k(Z("min-w-0 flex-1 rounded-r-xl border bg-dark-700 text-dark-50 outline-none", ze.md, m(de)))]), F("input", r, function(...e) {
			(n().length > 0 ? ue.handleInput : void 0)?.apply(this, e);
		}), F("keydown", r, function(...e) {
			(n().length > 0 ? ue.handleKeydown : void 0)?.apply(this, e);
		}), P("blur", r, function(...e) {
			(n().length > 0 ? ue.handleBlur : void 0)?.apply(this, e);
		}), P("focus", r, function(...e) {
			(n().length > 0 ? () => ae("value") : void 0)?.apply(this, e);
		}), F("click", r, function(...e) {
			(n().length > 0 ? () => ae("value") : void 0)?.apply(this, e);
		}), h(r, () => l().value, (e) => l(l().value = e, !0)), I(e, r);
	};
	o(be, (e) => {
		m(fe) ? e(xe) : e(Se, -1);
	}), _(_e);
	var Ce = r(_e, 2), we = (e) => {
		var n = qa();
		d(S(n), () => t.suffix), _(n), I(e, n);
	};
	o(Ce, (e) => {
		t.suffix && e(we);
	}), _(ge);
	var Te = r(ge, 2), Ee = (e) => {
		var t = Ja();
		b(t, 21, n, (e) => e.key, (e, t) => {
			Ct(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return m(t).label;
				},
				onclick: () => oe(m(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					C();
					var r = j();
					x(() => H(r, `{${m(t).key}}`)), I(e, r);
				},
				$$slots: { default: !0 }
			});
		}), _(t), I(e, t);
	};
	o(Te, (e) => {
		n().length > 0 && e(Ee);
	});
	var De = r(Te, 2), Oe = (e) => {
		var t = Xa();
		b(t, 23, () => m(U), (e) => e.key, (e, t, n) => {
			var i = Ya(), a = S(i), o = S(a), s = S(o, !0);
			_(o);
			var l = r(o, 2), u = S(l, !0);
			_(l), _(a), _(i), x((e) => {
				G(a, "id", `${c()}-option-${m(n)}`), G(a, "aria-selected", m(n) === m(te)), Y(a, 1, e), H(s, `{${m(t).key}}`), H(u, m(t).label);
			}, [() => k(Z("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", m(n) === m(te) && "bg-dark-700"))]), F("mousedown", a, (e) => {
				e.preventDefault(), Q(m(t).key, m(R));
			}), I(e, i);
		}), _(t), x(() => G(t, "id", `${c()}-listbox`)), I(e, t);
	};
	o(De, (e) => {
		m(B) && m(U).length > 0 && e(Oe);
	});
	var ke = r(De, 2), je = (e) => {
		var n = Za(), r = S(n, !0);
		_(n), x(() => H(r, t.error)), I(e, n);
	};
	o(ke, (e) => {
		t.error && e(je);
	}), _(pe), x((e, t) => {
		Y(pe, 1, e), Y(_e, 1, t);
	}, [() => k(Z("relative grid w-full gap-2", t.class)), () => k(Z("grid min-w-0 flex-1 grid-cols-[1fr_120px_1fr] rounded-xl has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500"))]), h(ve, () => l().path, (e) => l(l().path = e, !0)), I(e, pe), y();
}
B([
	"input",
	"keydown",
	"click",
	"mousedown"
]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-variables.svelte
var eo = new Set([
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
]), to = U("<div class=\"flex flex-wrap gap-1.5\"></div>"), no = U("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), ro = U("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), io = U("<p class=\"text-sm text-red-400\"> </p>"), ao = U("<div class=\"relative grid w-full gap-2\"><!> <div><input/></div> <!> <!> <!></div>");
function oo(e, t) {
	s(t, !0);
	let n = M(t, "variables", 19, () => []), i = M(t, "value", 15, ""), a = M(t, "id", 19, Ae), c = K(t, eo), l = A(null), u = A(!1), d = A(""), p = A(0), g = q(() => {
		if (!m(d)) return n();
		let e = m(d).toLowerCase();
		return n().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function v() {
		if (!m(l)) return null;
		let e = m(l).selectionStart ?? i().length, t = i().slice(0, e), n = t.lastIndexOf("{");
		if (n === -1) return null;
		let r = t.slice(n + 1);
		return r.includes("}") ? null : {
			start: n,
			partial: r
		};
	}
	function w() {
		let e = v();
		if (!e || n().length === 0) {
			W(u, !1), W(d, ""), W(p, 0);
			return;
		}
		W(d, e.partial, !0), W(u, m(g).length > 0), W(p, 0);
	}
	function T(e) {
		let t = v();
		if (!t || !m(l)) return;
		let n = m(l).selectionStart ?? i().length, r = i().slice(0, t.start);
		i(`${r}{${e}}${i().slice(n)}`), W(u, !1), W(d, ""), queueMicrotask(() => {
			if (!m(l)) return;
			let t = r.length + e.length + 2;
			m(l).focus(), m(l).setSelectionRange(t, t);
		});
	}
	function D(e) {
		if (!m(l)) {
			i(`${i()}{${e}}`);
			return;
		}
		let t = m(l).selectionStart ?? i().length, n = i().slice(0, t);
		i(`${n}{${e}}${i().slice(t)}`), queueMicrotask(() => {
			let t = n.length + e.length + 2;
			m(l)?.focus(), m(l)?.setSelectionRange(t, t);
		});
	}
	let O = (e) => {
		t.oninput?.(e), w();
	}, N = (e) => {
		if (!(!m(u) || m(g).length === 0)) {
			if (e.key === "ArrowDown") {
				e.preventDefault(), W(p, (m(p) + 1) % m(g).length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault(), W(p, (m(p) - 1 + m(g).length) % m(g).length);
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				let t = m(g)[m(p)];
				t && (e.preventDefault(), T(t.key));
				return;
			}
			e.key === "Escape" && W(u, !1);
		}
	}, P, R = () => {
		P && clearTimeout(P), P = setTimeout(() => {
			W(u, !1), P = void 0;
		}, 120);
	};
	E(() => {
		P && clearTimeout(P);
	});
	var z = ao(), B = S(z), V = (e) => {
		or(e, {
			get for() {
				return a();
			},
			children: (e, n) => {
				C();
				var r = j();
				x(() => H(r, t.label)), I(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	o(B, (e) => {
		t.label && e(V);
	});
	var ee = r(B, 2), te = S(ee);
	L(te, (e) => ({
		id: a(),
		placeholder: t.placeholder,
		class: e,
		role: "combobox",
		"aria-invalid": t.error ? !0 : void 0,
		"aria-autocomplete": "list",
		"aria-expanded": m(u) && m(g).length > 0,
		"aria-controls": `${a()}-listbox`,
		"aria-activedescendant": m(u) && m(g).length > 0 ? `${a()}-option-${m(p)}` : void 0,
		oninput: O,
		onkeydown: N,
		onblur: R,
		onfocus: w,
		onclick: w,
		...c
	}), [() => Z("w-full rounded-xl border bg-dark-700 text-dark-50 outline-none", ze.md, t.error ? "border-red-500" : "border-dark-500")], void 0, void 0, void 0, !0), f(te, (e) => W(l, e), () => m(l)), _(ee);
	var U = r(ee, 2), J = (e) => {
		var t = to();
		b(t, 21, n, (e) => e.key, (e, t) => {
			Ct(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return m(t).label;
				},
				onclick: () => D(m(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					C();
					var r = j();
					x(() => H(r, `{${m(t).key}}`)), I(e, r);
				},
				$$slots: { default: !0 }
			});
		}), _(t), I(e, t);
	};
	o(U, (e) => {
		n().length > 0 && e(J);
	});
	var ne = r(U, 2), re = (e) => {
		var t = ro();
		b(t, 23, () => m(g), (e) => e.key, (e, t, n) => {
			var i = no(), o = S(i), s = S(o), c = S(s, !0);
			_(s);
			var l = r(s, 2), u = S(l, !0);
			_(l), _(o), _(i), x((e) => {
				G(o, "id", `${a()}-option-${m(n)}`), G(o, "aria-selected", m(n) === m(p)), Y(o, 1, e), H(c, `{${m(t).key}}`), H(u, m(t).label);
			}, [() => k(Z("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", m(n) === m(p) && "bg-dark-700"))]), F("mousedown", o, (e) => {
				e.preventDefault(), T(m(t).key);
			}), I(e, i);
		}), _(t), x(() => G(t, "id", `${a()}-listbox`)), I(e, t);
	};
	o(ne, (e) => {
		m(u) && m(g).length > 0 && e(re);
	});
	var ie = r(ne, 2), X = (e) => {
		var n = io(), r = S(n, !0);
		_(n), x(() => H(r, t.error)), I(e, n);
	};
	o(ie, (e) => {
		t.error && e(X);
	}), _(z), x((e) => Y(ee, 1, e), [() => k(Z("relative flex w-full items-center rounded-xl", "has-focus-within:ring-2 has-focus-within:ring-primary", t.error && "has-focus-within:ring-red-500", t.class))]), h(te, i), I(e, z), y();
}
B(["mousedown"]);
//#endregion
export { _r as _, xa as a, ra as c, Gi as d, zi as f, Cr as g, Hr as h, Ta as i, Zi as l, gi as m, $a as n, va as o, Oi as p, za as r, ma as s, oo as t, qi as u, ur as v, or as y };
