import { a as e, i as t, t as n } from "./codemirror-Bh9wuH2R.js";
import { $n as r, At as i, Gn as a, Gt as o, Hr as s, Jr as c, Kn as l, Mn as u, Mt as d, N as f, Nn as p, On as m, Q as h, Qn as g, Qr as _, Sr as v, Vr as y, Vt as b, Wn as x, Wt as S, Zn as C, Zr as w, _n as T, _t as E, a as D, an as O, at as k, bt as A, cr as j, dn as M, f as N, ft as P, gn as F, hn as I, in as L, it as R, lr as z, m as B, mn as V, ni as H, nn as U, nr as ee, o as te, on as W, or as G, ot as K, p as q, pr as J, un as ne, vt as Y, wt as re, x as ie, zn as ae } from "./index-client-BIJQxc2l.js";
import "./disclose-version-YhYaTdgb.js";
import { t as X } from "./Icon-BoHmh-pv.js";
import "./index-client-b6iB98U7.js";
import { t as Z } from "./utils-DVQ4nj8f.js";
import { C as oe, D as Q, _ as se, a as ce, c as le, d as ue, g as de, i as fe, l as pe, n as me, o as he, r as ge, s as _e, u as ve, v as ye, x as be } from "./animations-complete-mSylzqL5.js";
import { A as xe, C as Se, D as Ce, E as we, F as Te, I as Ee, L as De, M as Oe, N as ke, P as Ae, R as je, T as Me, _ as Ne, a as Pe, b as Fe, g as Ie, h as Le, j as Re, k as ze, m as Be, n as Ve, r as He, t as Ue, v as We, w as Ge, y as Ke } from "./popper-layer-force-mount-DQ--j3Vc.js";
import { a as qe, i as Je, n as Ye, r as Xe, t as Ze } from "./use-id-D_eLoXvH.js";
import { t as Qe } from "./on-mount-effect.svelte-CsZRRjbJ.js";
import { a as $e, o as et, t as tt } from "./presence-manager.svelte-DXU099Vb.js";
import { t as nt } from "./portal-Clk-o-E0.js";
import "./legacy-DJShZKm3.js";
import { t as rt } from "./floating-layer-anchor-CDr4Uj1p.js";
import { i as it, n as at, r as ot } from "./popover-7AIymzHI.js";
import { t as st } from "./scroll-area-99QA2aRD.js";
import { t as ct } from "./button-CZMpEwOs.js";
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_eda23719c06f49b3fd4471540fb738b4/node_modules/svelte-toolbelt/dist/utils/sr-only-styles.js
var lt = {
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
qe(lt);
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/checkbox/checkbox.svelte.js
var ut = he({
	component: "checkbox",
	parts: [
		"root",
		"group",
		"group-label",
		"input"
	]
}), dt = new oe("Checkbox.Group"), ft = new oe("Checkbox.Root"), pt = class e {
	static create(t, n = null) {
		return ft.set(new e(t, n));
	}
	opts;
	group;
	#e = J(() => this.group && this.group.opts.name.current ? this.group.opts.name.current : this.opts.name.current);
	get trueName() {
		return m(this.#e);
	}
	set trueName(e) {
		G(this.#e, e);
	}
	#t = J(() => this.group && this.group.opts.required.current ? !0 : this.opts.required.current);
	get trueRequired() {
		return m(this.#t);
	}
	set trueRequired(e) {
		G(this.#t, e);
	}
	#n = J(() => this.group && this.group.opts.disabled.current ? !0 : this.opts.disabled.current);
	get trueDisabled() {
		return m(this.#n);
	}
	set trueDisabled(e) {
		G(this.#n, e);
	}
	#r = J(() => this.group && this.group.opts.readonly.current ? !0 : this.opts.readonly.current);
	get trueReadonly() {
		return m(this.#r);
	}
	set trueReadonly(e) {
		G(this.#r, e);
	}
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = ue(this.opts.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this), be.pre([() => c(this.group?.opts.value.current), () => this.opts.value.current], ([e, t]) => {
			!e || !t || (this.opts.checked.current = e.includes(t));
		}), be.pre(() => this.opts.checked.current, (e) => {
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
	#a = J(() => ({
		checked: this.opts.checked.current,
		indeterminate: this.opts.indeterminate.current
	}));
	get snippetProps() {
		return m(this.#a);
	}
	set snippetProps(e) {
		G(this.#a, e);
	}
	#o = J(() => ({
		id: this.opts.id.current,
		role: "checkbox",
		type: this.opts.type.current,
		disabled: this.trueDisabled,
		"aria-checked": _e(this.opts.checked.current, this.opts.indeterminate.current),
		"aria-required": ge(this.trueRequired),
		"aria-readonly": ge(this.trueReadonly),
		"data-disabled": me(this.trueDisabled),
		"data-readonly": me(this.trueReadonly),
		"data-state": ht(this.opts.checked.current, this.opts.indeterminate.current),
		[ut.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return m(this.#o);
	}
	set props(e) {
		G(this.#o, e);
	}
}, mt = class e {
	static create() {
		return new e(ft.get());
	}
	root;
	#e = J(() => this.root.group ? !!(this.root.opts.value.current !== void 0 && this.root.group.opts.value.current.includes(this.root.opts.value.current)) : this.root.opts.checked.current);
	get trueChecked() {
		return m(this.#e);
	}
	set trueChecked(e) {
		G(this.#e, e);
	}
	#t = J(() => !!this.root.trueName);
	get shouldRender() {
		return m(this.#t);
	}
	set shouldRender(e) {
		G(this.#t, e);
	}
	constructor(e) {
		this.root = e, this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		$e(this.root.opts.ref.current) && this.root.opts.ref.current.focus();
	}
	#n = J(() => ({
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
		G(this.#n, e);
	}
};
function ht(e, t) {
	return t ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/hidden-input.svelte
var gt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value"
]), _t = W("<input/>");
function vt(e, t) {
	s(t, !0);
	let n = N(t, "value", 15), r = q(t, gt), i = J(() => Je(r, {
		"aria-hidden": "true",
		tabindex: -1,
		style: {
			...lt,
			position: "absolute",
			top: "0",
			left: "0"
		}
	}));
	var a = O(), c = g(a), l = (e) => {
		var t = _t();
		R(t, () => ({
			...m(i),
			value: n()
		}), void 0, void 0, void 0, void 0, !0), L(e, t);
	}, u = (e) => {
		var t = _t();
		R(t, () => ({ ...m(i) }), void 0, void 0, void 0, void 0, !0), h(t, n), L(e, t);
	};
	o(c, (e) => {
		m(i).type === "checkbox" ? e(l) : e(u, -1);
	}), L(e, a), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/checkbox/components/checkbox-input.svelte
function yt(e, t) {
	s(t, !1);
	let n = mt.create();
	ie();
	var r = O(), i = g(r), a = (e) => {
		vt(e, B(() => n.props));
	};
	o(i, (e) => {
		n.shouldRender && e(a);
	}), L(e, r), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/checkbox/components/checkbox.svelte
var bt = new Set([
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
]), xt = W("<button><!></button>"), St = W("<!> <!>", 1);
function Ct(e, t) {
	let n = ne();
	s(t, !0);
	let i = N(t, "checked", 15, !1), a = N(t, "ref", 15, null), c = N(t, "disabled", 3, !1), l = N(t, "required", 3, !1), u = N(t, "name", 3, void 0), f = N(t, "value", 3, "on"), p = N(t, "id", 19, () => Ye(n)), h = N(t, "indeterminate", 15, !1), v = N(t, "type", 3, "button"), b = q(t, bt), x = dt.getOr(null);
	x && f() && (x.opts.value.current.includes(f()) ? i(!0) : i(!1)), be.pre(() => f(), () => {
		x && f() && (x.opts.value.current.includes(f()) ? i(!0) : i(!1));
	});
	let S = pt.create({
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
	}, x), w = J(() => Je({ ...b }, S.props));
	var T = St(), E = g(T), D = (e) => {
		var n = O(), r = g(n);
		{
			let e = J(() => ({
				props: m(w),
				...S.snippetProps
			}));
			d(r, () => t.child, () => m(e));
		}
		L(e, n);
	}, k = (e) => {
		var n = xt();
		R(n, () => ({ ...m(w) })), d(C(n), () => t.children ?? H, () => S.snippetProps), _(n), L(e, n);
	};
	o(E, (e) => {
		t.child ? e(D) : e(k, -1);
	}), yt(r(E, 2), {}), L(e, T), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/data-typeahead.svelte.js
var wt = class {
	#e;
	#t = J(() => this.#e.candidateValues());
	#n;
	constructor(e) {
		this.#e = e, this.#n = Le("", {
			afterMs: 1e3,
			getWindow: this.#e.getWindow
		}), this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this), this.resetTypeahead = this.resetTypeahead.bind(this);
	}
	handleTypeaheadSearch(e) {
		if (!this.#e.enabled() || !m(this.#t).length) return;
		this.#n.current = this.#n.current + e;
		let t = this.#e.getCurrentItem(), n = m(this.#t).find((e) => e === t) ?? "", r = We(m(this.#t).map((e) => e ?? ""), this.#n.current, n), i = m(this.#t).find((e) => e === r);
		return i && this.#e.onMatch(i), i;
	}
	resetTypeahead() {
		this.#n.current = "";
	}
}, Tt = [
	Me,
	Oe,
	we,
	De,
	ze,
	xe,
	"Alt",
	Ae,
	Re,
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
], Et = [
	Ge,
	Ee,
	ke
], Dt = [
	Ce,
	Te,
	"End"
], Ot = [...Et, ...Dt], kt = he({
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
}), At = new oe("Select.Root | Combobox.Root");
new oe("Select.Group | Combobox.Group");
var jt = new oe("Select.Content | Combobox.Content"), Mt = class {
	opts;
	#e = j(!1);
	get touchedInput() {
		return m(this.#e);
	}
	set touchedInput(e) {
		G(this.#e, e, !0);
	}
	#t = j(null);
	get inputNode() {
		return m(this.#t);
	}
	set inputNode(e) {
		G(this.#t, e, !0);
	}
	#n = j(null);
	get contentNode() {
		return m(this.#n);
	}
	set contentNode(e) {
		G(this.#n, e, !0);
	}
	contentPresence;
	#r = j(null);
	get viewportNode() {
		return m(this.#r);
	}
	set viewportNode(e) {
		G(this.#r, e, !0);
	}
	#i = j(null);
	get triggerNode() {
		return m(this.#i);
	}
	set triggerNode(e) {
		G(this.#i, e, !0);
	}
	#a = j(null);
	get valueNode() {
		return m(this.#a);
	}
	set valueNode(e) {
		G(this.#a, e, !0);
	}
	#o = j("");
	get valueId() {
		return m(this.#o);
	}
	set valueId(e) {
		G(this.#o, e, !0);
	}
	#s = j(null);
	get highlightedNode() {
		return m(this.#s);
	}
	set highlightedNode(e) {
		G(this.#s, e, !0);
	}
	#c = J(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-value") : null);
	get highlightedValue() {
		return m(this.#c);
	}
	set highlightedValue(e) {
		G(this.#c, e);
	}
	#l = J(() => {
		if (this.highlightedNode) return this.highlightedNode.id;
	});
	get highlightedId() {
		return m(this.#l);
	}
	set highlightedId(e) {
		G(this.#l, e);
	}
	#u = J(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-label") : null);
	get highlightedLabel() {
		return m(this.#u);
	}
	set highlightedLabel(e) {
		G(this.#u, e);
	}
	#d = j(!1);
	get contentIsPositioned() {
		return m(this.#d);
	}
	set contentIsPositioned(e) {
		G(this.#d, e, !0);
	}
	isUsingKeyboard = !1;
	isCombobox = !1;
	domContext = new Xe(() => null);
	constructor(e) {
		this.opts = e, this.isCombobox = e.isCombobox, this.contentPresence = new tt({
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
	getBitsAttr = (e) => kt.getAttr(e, this.isCombobox ? "combobox" : void 0);
}, Nt = class extends Mt {
	opts;
	isMulti = !1;
	#e = J(() => this.opts.value.current !== "");
	get hasValue() {
		return m(this.#e);
	}
	set hasValue(e) {
		G(this.#e, e);
	}
	#t = J(() => this.opts.items.current.length ? this.opts.items.current.find((e) => e.value === this.opts.value.current)?.label ?? "" : "");
	get currentLabel() {
		return m(this.#t);
	}
	set currentLabel(e) {
		G(this.#t, e);
	}
	#n = J(() => this.opts.items.current.length ? this.opts.items.current.filter((e) => !e.disabled).map((e) => e.label) : []);
	get candidateLabels() {
		return m(this.#n);
	}
	set candidateLabels(e) {
		G(this.#n, e);
	}
	#r = J(() => !(this.isMulti || this.opts.items.current.length === 0));
	get dataTypeaheadEnabled() {
		return m(this.#r);
	}
	set dataTypeaheadEnabled(e) {
		G(this.#r, e);
	}
	constructor(e) {
		super(e), this.opts = e, a(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), be(() => this.opts.open.current, () => {
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
		de(() => {
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
}, Pt = class extends Mt {
	opts;
	isMulti = !0;
	#e = J(() => this.opts.value.current.length > 0);
	get hasValue() {
		return m(this.#e);
	}
	set hasValue(e) {
		G(this.#e, e);
	}
	constructor(e) {
		super(e), this.opts = e, a(() => {
			!this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
		}), be(() => this.opts.open.current, () => {
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
		de(() => {
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
}, Ft = class {
	static create(e) {
		let { type: t, ...n } = e, r = t === "single" ? new Nt(n) : new Pt(n);
		return At.set(r);
	}
}, It = class e {
	static create(t) {
		return new e(t, At.get());
	}
	root;
	opts;
	attachment;
	constructor(e, t) {
		this.root = t, this.opts = e, this.attachment = ue(e.ref, (e) => this.root.valueNode = e), this.setValue = this.setValue.bind(this);
	}
	setValue(e) {
		this.root.isMulti && !Array.isArray(e) || !this.root.isMulti && typeof e != "string" || (this.root.opts.value.current = e);
	}
	#e = J(() => {
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
		G(this.#e, e);
	}
	#t = J(() => ({
		id: this.opts.id.current,
		"data-placeholder": this.root.hasValue ? void 0 : "",
		"data-select-value": "",
		...this.attachment
	}));
	get props() {
		return m(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, Lt = class e {
	static create(t) {
		return new e(t, At.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = ue(e.ref, (e) => this.root.inputNode = e), this.root.domContext = new Xe(e.ref), this.onkeydown = this.onkeydown.bind(this), this.oninput = this.oninput.bind(this), be([() => this.root.opts.value.current, () => this.opts.clearOnDeselect.current], ([e, t], [n]) => {
			t && (Array.isArray(e) && Array.isArray(n) ? e.length === 0 && n.length !== 0 && (this.root.opts.inputValue.current = "") : e === "" && n !== "" && (this.root.opts.inputValue.current = ""));
		});
	}
	onkeydown(e) {
		if (this.root.isUsingKeyboard = !0, e.key !== "Escape") {
			if ((e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault(), !this.root.opts.open.current) {
				if (Tt.includes(e.key) || e.key === "Tab" || e.key === "Backspace" && this.root.opts.inputValue.current === "" || (this.root.handleOpen(), this.root.hasValue)) return;
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
			if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), Ot.includes(e.key)) {
				e.preventDefault();
				let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
				if (e.key === "ArrowDown" ? a = Ke(t, r, i) : e.key === "ArrowUp" ? a = Fe(t, r, i) : e.key === "PageDown" ? a = Ne(t, r, 10, i) : e.key === "PageUp" ? a = Ie(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
				this.root.setHighlightedNode(a);
				return;
			}
			Tt.includes(e.key) || this.root.highlightedNode || this.root.setHighlightedToFirstCandidate();
		}
	}
	oninput(e) {
		this.root.opts.inputValue.current = e.currentTarget.value, this.root.setHighlightedToFirstCandidate();
	}
	#e = J(() => ({
		id: this.opts.id.current,
		role: "combobox",
		disabled: this.root.opts.disabled.current ? !0 : void 0,
		"aria-activedescendant": this.root.highlightedId,
		"aria-autocomplete": "list",
		"aria-expanded": ge(this.root.opts.open.current),
		"data-state": pe(this.root.opts.open.current),
		"data-disabled": me(this.root.opts.disabled.current),
		onkeydown: this.onkeydown,
		oninput: this.oninput,
		[this.root.getBitsAttr("input")]: "",
		...this.attachment
	}));
	get props() {
		return m(this.#e);
	}
	set props(e) {
		G(this.#e, e);
	}
}, Rt = class e {
	static create(t) {
		return new e(t, At.get());
	}
	opts;
	root;
	attachment;
	#e;
	#t;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = ue(e.ref, (e) => this.root.triggerNode = e), this.root.domContext = new Xe(e.ref), this.#e = new Be({
			getCurrentItem: () => this.root.highlightedNode,
			onMatch: (e) => {
				this.root.setHighlightedNode(e);
			},
			getActiveElement: () => this.root.domContext.getActiveElement(),
			getWindow: () => this.root.domContext.getWindow()
		}), this.#t = new wt({
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
		if (e.key === "ArrowUp" && e.altKey && this.root.handleClose(), Ot.includes(e.key)) {
			e.preventDefault();
			let t = this.root.getCandidateNodes(), n = this.root.highlightedNode, r = n ? t.indexOf(n) : -1, i = this.root.opts.loop.current, a;
			if (e.key === "ArrowDown" ? a = Ke(t, r, i) : e.key === "ArrowUp" ? a = Fe(t, r, i) : e.key === "PageDown" ? a = Ne(t, r, 10, i) : e.key === "PageUp" ? a = Ie(t, r, 10, i) : e.key === "Home" ? a = t[0] : e.key === "End" && (a = t[t.length - 1]), !a) return;
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
	#a = J(() => ({
		id: this.opts.id.current,
		disabled: this.root.opts.disabled.current ? !0 : void 0,
		"aria-haspopup": "listbox",
		"aria-expanded": ge(this.root.opts.open.current),
		"aria-activedescendant": this.root.highlightedId,
		"data-state": pe(this.root.opts.open.current),
		"data-disabled": me(this.root.opts.disabled.current),
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
		G(this.#a, e);
	}
}, zt = class e {
	static create(t) {
		return jt.set(new e(t, At.get()));
	}
	opts;
	root;
	attachment;
	#e = j(!1);
	get isPositioned() {
		return m(this.#e);
	}
	set isPositioned(e) {
		G(this.#e, e, !0);
	}
	domContext;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = ue(e.ref, (e) => this.root.contentNode = e), this.domContext = new Xe(this.opts.ref), this.root.domContext === null && (this.root.domContext = this.domContext), se(() => {
			this.root.contentNode = null, this.root.contentIsPositioned = !1, this.isPositioned = !1;
		}), be(() => this.root.opts.open.current, () => {
			this.root.opts.open.current || (this.root.contentIsPositioned = !1, this.isPositioned = !1);
		}), be([() => this.isPositioned, () => this.root.highlightedNode], () => {
			!this.isPositioned || !this.root.highlightedNode || this.root.scrollHighlightedNodeIntoView(this.root.highlightedNode);
		}), this.onpointermove = this.onpointermove.bind(this);
	}
	onpointermove(e) {
		this.root.isUsingKeyboard = !1;
	}
	#t = J(() => Pe(this.root.isCombobox ? "combobox" : "select"));
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
	#n = J(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return m(this.#n);
	}
	set snippetProps(e) {
		G(this.#n, e);
	}
	#r = J(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-multiselectable": this.root.isMulti ? "true" : void 0,
		"data-state": pe(this.root.opts.open.current),
		...ve(this.root.contentPresence.transitionStatus),
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
}, Bt = class e {
	static create(t) {
		return new e(t, At.get());
	}
	opts;
	root;
	attachment;
	#e = J(() => this.root.includesItem(this.opts.value.current));
	get isSelected() {
		return m(this.#e);
	}
	set isSelected(e) {
		G(this.#e, e);
	}
	#t = J(() => this.root.highlightedValue === this.opts.value.current);
	get isHighlighted() {
		return m(this.#t);
	}
	set isHighlighted(e) {
		G(this.#t, e);
	}
	prevHighlighted = new ye(() => this.isHighlighted);
	#n = j(!1);
	get mounted() {
		return m(this.#n);
	}
	set mounted(e) {
		G(this.#n, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = ue(e.ref), be([() => this.isHighlighted, () => this.prevHighlighted.current], () => {
			this.isHighlighted ? this.opts.onHighlight.current() : this.prevHighlighted.current && this.opts.onUnhighlight.current();
		}), be(() => this.mounted, () => {
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
	#r = J(() => ({
		selected: this.isSelected,
		highlighted: this.isHighlighted
	}));
	get snippetProps() {
		return m(this.#r);
	}
	set snippetProps(e) {
		G(this.#r, e);
	}
	onpointerdown(e) {
		e.preventDefault();
	}
	onpointerup(e) {
		if (!(e.defaultPrevented || !this.opts.ref.current)) {
			if (e.pointerType === "touch" && !et) {
				T(this.opts.ref.current, "click", () => {
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
	#i = J(() => ({
		id: this.opts.id.current,
		role: "option",
		"aria-selected": this.root.includesItem(this.opts.value.current) ? "true" : void 0,
		"data-value": this.opts.value.current,
		"data-disabled": me(this.opts.disabled.current),
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
		G(this.#i, e);
	}
}, Vt = class e {
	static create(t) {
		return new e(t, At.get());
	}
	opts;
	root;
	#e = J(() => this.root.opts.name.current !== "");
	get shouldRender() {
		return m(this.#e);
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
	#t = J(() => ({
		disabled: ce(this.root.opts.disabled.current),
		required: ce(this.root.opts.required.current),
		name: this.root.opts.name.current,
		value: this.opts.value.current,
		onfocus: this.onfocus
	}));
	get props() {
		return m(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, Ht = class e {
	static create(t) {
		return new e(t, jt.get());
	}
	opts;
	content;
	root;
	attachment;
	#e = j(0);
	get prevScrollTop() {
		return m(this.#e);
	}
	set prevScrollTop(e) {
		G(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = ue(e.ref, (e) => {
			this.root.viewportNode = e;
		});
	}
	#t = J(() => ({
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
		G(this.#t, e);
	}
}, Ut = class {
	opts;
	content;
	root;
	attachment;
	autoScrollTimer = null;
	userScrollTimer = -1;
	isUserScrolling = !1;
	onAutoScroll = Se;
	#e = j(!1);
	get mounted() {
		return m(this.#e);
	}
	set mounted(e) {
		G(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.content = t, this.root = t.root, this.attachment = ue(e.ref), be([() => this.mounted], () => {
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
	#t = J(() => ({
		id: this.opts.id.current,
		"aria-hidden": fe(!0),
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
		G(this.#t, e);
	}
}, Wt = class e {
	static create(t) {
		return new e(new Ut(t, jt.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = j(!1);
	get canScrollDown() {
		return m(this.#e);
	}
	set canScrollDown(e) {
		G(this.#e, e, !0);
	}
	scrollIntoViewTimer = null;
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, be([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), T(this.root.viewportNode, "scroll", () => this.handleScroll());
		}), be([
			() => this.root.opts.inputValue.current,
			() => this.root.viewportNode,
			() => this.content.isPositioned
		], () => {
			!this.root.viewportNode || !this.content.isPositioned || this.handleScroll(!0);
		}), be(() => this.scrollButtonState.mounted, () => {
			this.scrollButtonState.mounted && (this.scrollIntoViewTimer && clearTimeout(this.scrollIntoViewTimer), this.scrollIntoViewTimer = je(5, () => {
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
	#t = J(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-down-button")]: ""
	}));
	get props() {
		return m(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
}, Gt = class e {
	static create(t) {
		return new e(new Ut(t, jt.get()));
	}
	scrollButtonState;
	content;
	root;
	#e = j(!1);
	get canScrollUp() {
		return m(this.#e);
	}
	set canScrollUp(e) {
		G(this.#e, e, !0);
	}
	constructor(e) {
		this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, be([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!(!this.root.viewportNode || !this.content.isPositioned)) return this.handleScroll(!0), T(this.root.viewportNode, "scroll", () => this.handleScroll());
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
	#t = J(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-up-button")]: ""
	}));
	get props() {
		return m(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-hidden-input.svelte
function Kt(e, t) {
	s(t, !0);
	let n = N(t, "value", 15), r = Vt.create({ value: Q(() => n()) });
	var i = O(), a = g(i), c = (e) => {
		vt(e, B(() => r.props, {
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
	}), L(e, i), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/combobox/components/combobox.svelte
var qt = W("<!> <!>", 1);
function Jt(e, t) {
	s(t, !0);
	let n = N(t, "value", 15), i = N(t, "onValueChange", 3, Se), a = N(t, "name", 3, ""), c = N(t, "disabled", 3, !1), l = N(t, "open", 15, !1), u = N(t, "onOpenChange", 3, Se), f = N(t, "onOpenChangeComplete", 3, Se), p = N(t, "loop", 3, !1), h = N(t, "scrollAlignment", 3, "nearest"), _ = N(t, "required", 3, !1), v = N(t, "items", 19, () => []), x = N(t, "allowDeselect", 3, !0), S = N(t, "inputValue", 7, "");
	n() === void 0 && n(t.type === "single" ? "" : []), be.pre(() => n(), () => {
		n() === void 0 && n(t.type === "single" ? "" : []);
	});
	let C = Ft.create({
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
	var w = qt(), T = g(w);
	He(T, {
		children: (e, n) => {
			var r = O();
			d(g(r), () => t.children ?? H), L(e, r);
		},
		$$slots: { default: !0 }
	});
	var E = r(T, 2), D = (e) => {
		var t = O(), n = g(t), r = (e) => {
			var t = O();
			b(g(t), 16, () => C.opts.value.current, (e) => e, (e, t) => {
				Kt(e, { get value() {
					return t;
				} });
			}), L(e, t);
		};
		o(n, (e) => {
			C.opts.value.current.length && e(r);
		}), L(e, t);
	}, k = J(() => Array.isArray(C.opts.value.current)), A = (e) => {
		Kt(e, {
			get value() {
				return C.opts.value.current;
			},
			set value(e) {
				C.opts.value.current = e;
			}
		});
	};
	o(E, (e) => {
		m(k) ? e(D) : e(A, -1);
	}), L(e, w), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/combobox/components/combobox-input.svelte
var Yt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"defaultValue",
	"clearOnDeselect"
]), Xt = W("<input/>");
function Zt(e, t) {
	s(t, !0);
	let n = N(t, "id", 19, Ze), r = N(t, "ref", 15, null), a = N(t, "clearOnDeselect", 3, !1), c = q(t, Yt), l = Lt.create({
		id: Q(() => n()),
		ref: Q(() => r(), (e) => r(e)),
		clearOnDeselect: Q(() => a())
	});
	t.defaultValue && (l.root.opts.inputValue.current = t.defaultValue);
	let u = J(() => Je(c, l.props, { value: l.root.opts.inputValue.current }));
	var f = O();
	i(g(f), () => rt, (e, r) => {
		r(e, {
			get id() {
				return n();
			},
			get ref() {
				return l.opts.ref;
			},
			children: (e, n) => {
				var r = O(), i = g(r), a = (e) => {
					var n = O();
					d(g(n), () => t.child, () => ({ props: m(u) })), L(e, n);
				}, s = (e) => {
					var t = Xt();
					R(t, () => ({ ...m(u) }), void 0, void 0, void 0, void 0, !0), L(e, t);
				};
				o(i, (e) => {
					t.child ? e(a) : e(s, -1);
				}), L(e, r);
			},
			$$slots: { default: !0 }
		});
	}), L(e, f), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-content.svelte
var Qt = new Set([
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
]), $t = W("<div><div><!></div></div>");
function en(e, t) {
	let n = ne();
	s(t, !0);
	let r = N(t, "id", 19, () => Ye(n)), i = N(t, "ref", 15, null), a = N(t, "forceMount", 3, !1), c = N(t, "side", 3, "bottom"), l = N(t, "onInteractOutside", 3, Se), u = N(t, "onEscapeKeydown", 3, Se), f = N(t, "preventScroll", 3, !1), p = q(t, Qt), h = zt.create({
		id: Q(() => r()),
		ref: Q(() => i(), (e) => i(e)),
		onInteractOutside: Q(() => l()),
		onEscapeKeydown: Q(() => u())
	}), v = J(() => Je(p, h.props));
	var b = O(), x = g(b), S = (e) => {
		Ue(e, B(() => m(v), () => h.popperProps, {
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
				let r = () => n?.().props, i = () => n?.().wrapperProps, a = J(() => Je(r(), { style: h.props.style }, { style: t.style }));
				var s = O(), c = g(s), l = (e) => {
					var n = O(), r = g(n);
					{
						let e = J(() => ({
							props: m(a),
							wrapperProps: i(),
							...h.snippetProps
						}));
						d(r, () => t.child, () => m(e));
					}
					L(e, n);
				}, u = (e) => {
					var n = $t();
					R(n, () => ({ ...i() }));
					var r = C(n);
					R(r, () => ({ ...m(a) })), d(C(r), () => t.children ?? H), _(r), _(n), L(e, n);
				};
				o(c, (e) => {
					t.child ? e(l) : e(u, -1);
				}), L(e, s);
			},
			$$slots: { popper: !0 }
		}));
	}, w = (e) => {
		Ve(e, B(() => m(v), () => h.popperProps, {
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
				let r = () => n?.().props, i = () => n?.().wrapperProps, a = J(() => Je(r(), { style: h.props.style }, { style: t.style }));
				var s = O(), c = g(s), l = (e) => {
					var n = O(), r = g(n);
					{
						let e = J(() => ({
							props: m(a),
							wrapperProps: i(),
							...h.snippetProps
						}));
						d(r, () => t.child, () => m(e));
					}
					L(e, n);
				}, u = (e) => {
					var n = $t();
					R(n, () => ({ ...i() }));
					var r = C(n);
					R(r, () => ({ ...m(a) })), d(C(r), () => t.children ?? H), _(r), _(n), L(e, n);
				};
				o(c, (e) => {
					t.child ? e(l) : e(u, -1);
				}), L(e, s);
			},
			$$slots: { popper: !0 }
		}));
	};
	o(x, (e) => {
		a() ? e(S) : a() || e(w, 1);
	}), L(e, b), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/mounted.svelte
function tn(e, t) {
	s(t, !0);
	let n = N(t, "mounted", 15, !1), r = N(t, "onMountedChange", 3, Se);
	Qe(() => (n(!0), r()(!0), () => {
		n(!1), r()(!1);
	})), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-item.svelte
var nn = new Set([
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
]), rn = W("<div><!></div>"), an = W("<!> <!>", 1);
function on(e, t) {
	let n = ne();
	s(t, !0);
	let i = N(t, "id", 19, () => Ye(n)), a = N(t, "ref", 15, null), c = N(t, "label", 19, () => t.value), l = N(t, "disabled", 3, !1), u = N(t, "onHighlight", 3, Se), f = N(t, "onUnhighlight", 3, Se), p = q(t, nn), h = Bt.create({
		id: Q(() => i()),
		ref: Q(() => a(), (e) => a(e)),
		value: Q(() => t.value),
		disabled: Q(() => l()),
		label: Q(() => c()),
		onHighlight: Q(() => u()),
		onUnhighlight: Q(() => f())
	}), v = J(() => Je(p, h.props));
	var b = an(), x = g(b), S = (e) => {
		var n = O(), r = g(n);
		{
			let e = J(() => ({
				props: m(v),
				...h.snippetProps
			}));
			d(r, () => t.child, () => m(e));
		}
		L(e, n);
	}, w = (e) => {
		var n = rn();
		R(n, () => ({ ...m(v) })), d(C(n), () => t.children ?? H, () => h.snippetProps), _(n), L(e, n);
	};
	o(x, (e) => {
		t.child ? e(S) : e(w, -1);
	}), tn(r(x, 2), {
		get mounted() {
			return h.mounted;
		},
		set mounted(e) {
			h.mounted = e;
		}
	}), L(e, b), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-viewport.svelte
var sn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), cn = W("<div><!></div>"), ln = {
	hash: "svelte-1j45ufl",
	code: "\n	/* Hide scrollbars cross browser and enable momentum scroll for touch devices */[data-select-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-combobox-viewport]::-webkit-scrollbar {display:none !important;}[data-select-viewport]::-webkit-scrollbar {display:none !important;}"
};
function un(e, t) {
	let n = ne();
	s(t, !0), re(e, ln);
	let r = N(t, "id", 19, () => Ye(n)), i = N(t, "ref", 15, null), a = q(t, sn), c = Ht.create({
		id: Q(() => r()),
		ref: Q(() => i(), (e) => i(e))
	}), l = J(() => Je(a, c.props));
	var u = O(), f = g(u), p = (e) => {
		var n = O();
		d(g(n), () => t.child, () => ({ props: m(l) })), L(e, n);
	}, h = (e) => {
		var n = cn();
		R(n, () => ({ ...m(l) })), d(C(n), () => t.children ?? H), _(n), L(e, n);
	};
	o(f, (e) => {
		t.child ? e(p) : e(h, -1);
	}), L(e, u), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-scroll-down-button.svelte
var dn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), fn = W("<div><!></div>"), pn = W("<!> <!>", 1);
function mn(e, t) {
	let n = ne();
	s(t, !0);
	let i = N(t, "id", 19, () => Ye(n)), a = N(t, "ref", 15, null), c = N(t, "delay", 3, () => 50), l = q(t, dn), u = Wt.create({
		id: Q(() => i()),
		ref: Q(() => a(), (e) => a(e)),
		delay: Q(() => c())
	}), f = J(() => Je(l, u.props));
	var p = O(), h = g(p), v = (e) => {
		var n = pn(), i = g(n);
		tn(i, {
			get mounted() {
				return u.scrollButtonState.mounted;
			},
			set mounted(e) {
				u.scrollButtonState.mounted = e;
			}
		});
		var a = r(i, 2), s = (e) => {
			var n = O();
			d(g(n), () => t.child, () => ({ props: l })), L(e, n);
		}, c = (e) => {
			var n = fn();
			R(n, () => ({ ...m(f) })), d(C(n), () => t.children ?? H), _(n), L(e, n);
		};
		o(a, (e) => {
			t.child ? e(s) : e(c, -1);
		}), L(e, n);
	};
	o(h, (e) => {
		u.canScrollDown && e(v);
	}), L(e, p), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-scroll-up-button.svelte
var hn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"delay",
	"child",
	"children"
]), gn = W("<div><!></div>"), _n = W("<!> <!>", 1);
function vn(e, t) {
	let n = ne();
	s(t, !0);
	let i = N(t, "id", 19, () => Ye(n)), a = N(t, "ref", 15, null), c = N(t, "delay", 3, () => 50), l = q(t, hn), u = Gt.create({
		id: Q(() => i()),
		ref: Q(() => a(), (e) => a(e)),
		delay: Q(() => c())
	}), f = J(() => Je(l, u.props));
	var p = O(), h = g(p), v = (e) => {
		var n = _n(), i = g(n);
		tn(i, {
			get mounted() {
				return u.scrollButtonState.mounted;
			},
			set mounted(e) {
				u.scrollButtonState.mounted = e;
			}
		});
		var a = r(i, 2), s = (e) => {
			var n = O();
			d(g(n), () => t.child, () => ({ props: l })), L(e, n);
		}, c = (e) => {
			var n = gn();
			R(n, () => ({ ...m(f) })), d(C(n), () => t.children ?? H), _(n), L(e, n);
		};
		o(a, (e) => {
			t.child ? e(s) : e(c, -1);
		}), L(e, n);
	};
	o(h, (e) => {
		u.canScrollUp && e(v);
	}), L(e, p), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/label/label.svelte.js
var yn = he({
	component: "label",
	parts: ["root"]
}), bn = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = ue(this.opts.ref), this.onmousedown = this.onmousedown.bind(this);
	}
	onmousedown(e) {
		e.detail > 1 && e.preventDefault();
	}
	#e = J(() => ({
		id: this.opts.id.current,
		[yn.root]: "",
		onmousedown: this.onmousedown,
		...this.attachment
	}));
	get props() {
		return m(this.#e);
	}
	set props(e) {
		G(this.#e, e);
	}
}, xn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"child",
	"id",
	"ref",
	"for"
]), Sn = W("<label><!></label>");
function Cn(e, t) {
	let n = ne();
	s(t, !0);
	let r = N(t, "id", 19, () => Ye(n)), i = N(t, "ref", 15, null), a = q(t, xn), c = bn.create({
		id: Q(() => r()),
		ref: Q(() => i(), (e) => i(e))
	}), l = J(() => Je(a, c.props, { for: t.for }));
	var u = O(), f = g(u), p = (e) => {
		var n = O();
		d(g(n), () => t.child, () => ({ props: m(l) })), L(e, n);
	}, h = (e) => {
		var n = Sn();
		R(n, () => ({
			...m(l),
			for: t.for
		})), d(C(n), () => t.children ?? H), _(n), L(e, n);
	};
	o(f, (e) => {
		t.child ? e(p) : e(h, -1);
	}), L(e, u), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select.svelte
var wn = W("<!> <!>", 1);
function Tn(e, t) {
	s(t, !0);
	let n = N(t, "value", 15), i = N(t, "onValueChange", 3, Se), a = N(t, "name", 3, ""), c = N(t, "disabled", 3, !1), l = N(t, "open", 15, !1), u = N(t, "onOpenChange", 3, Se), f = N(t, "onOpenChangeComplete", 3, Se), p = N(t, "loop", 3, !1), h = N(t, "scrollAlignment", 3, "nearest"), _ = N(t, "required", 3, !1), v = N(t, "items", 19, () => []), x = N(t, "allowDeselect", 3, !1);
	function S() {
		n() === void 0 && n(t.type === "single" ? "" : []);
	}
	S(), be.pre(() => n(), () => {
		S();
	});
	let C = j(""), w = Ft.create({
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
		inputValue: Q(() => m(C), (e) => G(C, e, !0)),
		onOpenChangeComplete: Q(() => f())
	});
	var T = wn(), E = g(T);
	He(E, {
		children: (e, n) => {
			var r = O();
			d(g(r), () => t.children ?? H), L(e, r);
		},
		$$slots: { default: !0 }
	});
	var D = r(E, 2), k = (e) => {
		var n = O(), r = g(n), i = (e) => {
			Kt(e, { get autocomplete() {
				return t.autocomplete;
			} });
		}, a = (e) => {
			var n = O();
			b(g(n), 16, () => w.opts.value.current, (e) => e, (e, n) => {
				Kt(e, {
					get value() {
						return n;
					},
					get autocomplete() {
						return t.autocomplete;
					}
				});
			}), L(e, n);
		};
		o(r, (e) => {
			w.opts.value.current.length === 0 ? e(i) : e(a, -1);
		}), L(e, n);
	}, A = J(() => Array.isArray(w.opts.value.current)), M = (e) => {
		Kt(e, {
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
	o(D, (e) => {
		m(A) ? e(k) : e(M, -1);
	}), L(e, T), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-value.svelte
var En = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"placeholder",
	"child",
	"children"
]), Dn = W("<span><!></span>");
function On(e, t) {
	let n = ne();
	s(t, !0);
	let r = N(t, "ref", 15, null), i = N(t, "id", 19, () => Ye(n)), a = q(t, En), c = It.create({
		id: Q(() => i()),
		ref: Q(() => r(), (e) => r(e)),
		placeholder: Q(() => t.placeholder)
	}), l = J(() => Je(a, c.props));
	var u = O(), f = g(u), p = (e) => {
		var n = O(), r = g(n);
		{
			let e = J(() => ({
				props: m(l),
				...c.snippetProps
			}));
			d(r, () => t.child, () => m(e));
		}
		L(e, n);
	}, h = (e) => {
		var n = Dn();
		R(n, () => ({ ...m(l) }));
		var r = C(n), i = (e) => {
			var n = O();
			d(g(n), () => t.children ?? H, () => c.snippetProps), L(e, n);
		}, a = (e) => {
			var n = M();
			x(() => U(n, c.snippetProps.selection.selected?.label ?? t.placeholder)), L(e, n);
		}, s = (e) => {
			var n = M();
			x((e) => U(n, e), [() => c.snippetProps.selection.selected.length > 0 ? c.snippetProps.selection.selected.map((e) => e.label).join(", ") : t.placeholder]), L(e, n);
		}, u = (e) => {
			var n = M();
			x(() => U(n, t.placeholder)), L(e, n);
		};
		o(r, (e) => {
			t.children ? e(i) : c.snippetProps.selection.type === "single" ? e(a, 1) : c.snippetProps.selection.type === "multiple" && c.snippetProps.selection.selected ? e(s, 2) : e(u, -1);
		}), _(n), L(e, n);
	};
	o(f, (e) => {
		t.child ? e(p) : e(h, -1);
	}), L(e, u), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/select/components/select-trigger.svelte
var kn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"type"
]), An = W("<button><!></button>");
function jn(e, t) {
	let n = ne();
	s(t, !0);
	let r = N(t, "id", 19, () => Ye(n)), a = N(t, "ref", 15, null), c = N(t, "type", 3, "button"), l = q(t, kn), u = Rt.create({
		id: Q(() => r()),
		ref: Q(() => a(), (e) => a(e))
	}), f = J(() => Je(l, u.props, { type: c() }));
	var p = O();
	i(g(p), () => rt, (e, n) => {
		n(e, {
			get id() {
				return r();
			},
			get ref() {
				return u.opts.ref;
			},
			children: (e, n) => {
				var r = O(), i = g(r), a = (e) => {
					var n = O();
					d(g(n), () => t.child, () => ({ props: m(f) })), L(e, n);
				}, s = (e) => {
					var n = An();
					R(n, () => ({ ...m(f) })), d(C(n), () => t.children ?? H), _(n), L(e, n);
				};
				o(i, (e) => {
					t.child ? e(a) : e(s, -1);
				}), L(e, r);
			},
			$$slots: { default: !0 }
		});
	}), L(e, p), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/switch.svelte.js
var Mn = he({
	component: "switch",
	parts: ["root", "thumb"]
}), Nn = new oe("Switch.Root"), Pn = class e {
	static create(t) {
		return Nn.set(new e(t));
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = ue(e.ref), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this);
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
	#t = J(() => ({
		"data-disabled": me(this.opts.disabled.current),
		"data-state": le(this.opts.checked.current),
		"data-required": me(this.opts.required.current)
	}));
	get sharedProps() {
		return m(this.#t);
	}
	set sharedProps(e) {
		G(this.#t, e);
	}
	#n = J(() => ({ checked: this.opts.checked.current }));
	get snippetProps() {
		return m(this.#n);
	}
	set snippetProps(e) {
		G(this.#n, e);
	}
	#r = J(() => ({
		...this.sharedProps,
		id: this.opts.id.current,
		role: "switch",
		disabled: ce(this.opts.disabled.current),
		"aria-checked": _e(this.opts.checked.current, !1),
		"aria-required": ge(this.opts.required.current),
		[Mn.root]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return m(this.#r);
	}
	set props(e) {
		G(this.#r, e);
	}
}, Fn = class e {
	static create() {
		return new e(Nn.get());
	}
	root;
	#e = J(() => this.root.opts.name.current !== void 0);
	get shouldRender() {
		return m(this.#e);
	}
	set shouldRender(e) {
		G(this.#e, e);
	}
	constructor(e) {
		this.root = e;
	}
	#t = J(() => ({
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
		G(this.#t, e);
	}
}, In = class e {
	static create(t) {
		return new e(t, Nn.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = ue(e.ref);
	}
	#e = J(() => ({ checked: this.root.opts.checked.current }));
	get snippetProps() {
		return m(this.#e);
	}
	set snippetProps(e) {
		G(this.#e, e);
	}
	#t = J(() => ({
		...this.root.sharedProps,
		id: this.opts.id.current,
		[Mn.thumb]: "",
		...this.attachment
	}));
	get props() {
		return m(this.#t);
	}
	set props(e) {
		G(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/components/switch-input.svelte
function Ln(e, t) {
	s(t, !1);
	let n = Fn.create();
	ie();
	var r = O(), i = g(r), a = (e) => {
		vt(e, B(() => n.props));
	};
	o(i, (e) => {
		n.shouldRender && e(a);
	}), L(e, r), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/components/switch.svelte
var Rn = new Set([
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
]), zn = W("<button><!></button>"), Bn = W("<!> <!>", 1);
function Vn(e, t) {
	let n = ne();
	s(t, !0);
	let i = N(t, "ref", 15, null), a = N(t, "id", 19, () => Ye(n)), c = N(t, "disabled", 3, !1), l = N(t, "required", 3, !1), u = N(t, "checked", 15, !1), f = N(t, "value", 3, "on"), p = N(t, "name", 3, void 0), h = N(t, "type", 3, "button"), v = N(t, "onCheckedChange", 3, Se), b = q(t, Rn), x = Pn.create({
		checked: Q(() => u(), (e) => {
			u(e), v()?.(e);
		}),
		disabled: Q(() => c() ?? !1),
		required: Q(() => l()),
		value: Q(() => f()),
		name: Q(() => p()),
		id: Q(() => a()),
		ref: Q(() => i(), (e) => i(e))
	}), S = J(() => Je(b, x.props, { type: h() }));
	var w = Bn(), T = g(w), E = (e) => {
		var n = O(), r = g(n);
		{
			let e = J(() => ({
				props: m(S),
				...x.snippetProps
			}));
			d(r, () => t.child, () => m(e));
		}
		L(e, n);
	}, D = (e) => {
		var n = zn();
		R(n, () => ({ ...m(S) })), d(C(n), () => t.children ?? H, () => x.snippetProps), _(n), L(e, n);
	};
	o(T, (e) => {
		t.child ? e(E) : e(D, -1);
	}), Ln(r(T, 2), {}), L(e, w), y();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/switch/components/switch-thumb.svelte
var Hn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"ref",
	"id"
]), Un = W("<span><!></span>");
function Wn(e, t) {
	let n = ne();
	s(t, !0);
	let r = N(t, "ref", 15, null), i = N(t, "id", 19, () => Ye(n)), a = q(t, Hn), c = In.create({
		id: Q(() => i()),
		ref: Q(() => r(), (e) => r(e))
	}), l = J(() => Je(a, c.props));
	var u = O(), f = g(u), p = (e) => {
		var n = O(), r = g(n);
		{
			let e = J(() => ({
				props: m(l),
				...c.snippetProps
			}));
			d(r, () => t.child, () => m(e));
		}
		L(e, n);
	}, h = (e) => {
		var n = Un();
		R(n, () => ({ ...m(l) })), d(C(n), () => t.children ?? H, () => c.snippetProps), _(n), L(e, n);
	};
	o(f, (e) => {
		t.child ? e(p) : e(h, -1);
	}), L(e, u), y();
}
//#endregion
//#region ../ui/src/lib/components/input/label.svelte
var Gn = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function Kn(e, t) {
	s(t, !0);
	let n = q(t, Gn);
	var r = O(), a = g(r);
	{
		let e = J(() => Z("text-sm font-medium text-dark-50", t.class));
		i(a, () => Cn, (r, i) => {
			i(r, B({ get children() {
				return t.children;
			} }, () => n, { get class() {
				return m(e);
			} }));
		});
	}
	L(e, r), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-checkbox.svelte
var qn = W("<div><!> <!></div>"), Jn = W("<p class=\"text-sm text-red-400\"> </p>"), Yn = W("<div><div class=\"flex items-center gap-2\"><!> <!></div> <!></div>");
function Xn(e, t) {
	s(t, !0);
	let n = N(t, "checked", 15, !1), a = N(t, "id", 19, Ze), c = N(t, "inline", 3, !1);
	var l = O(), u = g(l), d = (e) => {
		var s = qn(), c = C(s);
		{
			let e = (e, t) => {
				let n = () => t?.().checked;
				var r = O(), i = g(r), a = (e) => {
					X(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				o(i, (e) => {
					n() && e(a);
				}), L(e, r);
			}, r = J(() => t.label ? `${a()}-label` : void 0), s = J(() => t.error ? !0 : void 0), l = J(() => Z("peer inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary/15 data-[state=checked]:text-primary", "data-[state=unchecked]:bg-dark-700", t.error ? "border-red-500" : "border-dark-500 data-[state=unchecked]:hover:border-dark-400", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
			i(c, () => Ct, (i, o) => {
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
			Kn(e, {
				get id() {
					return `${a() ?? ""}-label`;
				},
				get for() {
					return a();
				},
				class: "cursor-pointer whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, n) => {
					w();
					var r = M();
					x(() => U(r, t.label)), L(e, r);
				},
				$$slots: { default: !0 }
			});
		};
		o(l, (e) => {
			t.label && e(u);
		}), _(s), x((e) => Y(s, 1, e), [() => A(Z("flex items-center gap-2", t.class))]), L(e, s);
	}, f = (e) => {
		var s = Yn(), c = C(s), l = C(c);
		{
			let e = (e, t) => {
				let n = () => t?.().checked;
				var r = O(), i = g(r), a = (e) => {
					X(e, {
						icon: "ri:check-line",
						class: "size-3.5"
					});
				};
				o(i, (e) => {
					n() && e(a);
				}), L(e, r);
			}, r = J(() => t.label ? `${a()}-label` : void 0), s = J(() => t.error ? !0 : void 0), c = J(() => Z("peer inline-flex size-5 shrink-0 items-center justify-center rounded border transition-colors outline-none", "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-dark-50", "data-[state=unchecked]:bg-dark-700", t.error ? "border-red-500" : "border-dark-500 data-[state=unchecked]:hover:border-dark-400", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
			i(l, () => Ct, (i, o) => {
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
			Kn(e, {
				get id() {
					return `${a() ?? ""}-label`;
				},
				get for() {
					return a();
				},
				class: "cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				children: (e, n) => {
					w();
					var r = M();
					x(() => U(r, t.label)), L(e, r);
				},
				$$slots: { default: !0 }
			});
		};
		o(u, (e) => {
			t.label && e(d);
		}), _(c);
		var f = r(c, 2), p = (e) => {
			var n = Jn(), r = C(n, !0);
			_(n), x(() => U(r, t.error)), L(e, n);
		};
		o(f, (e) => {
			t.error && e(p);
		}), _(s), x((e) => Y(s, 1, e), [() => A(Z("grid gap-2", t.class))]), L(e, s);
	};
	o(u, (e) => {
		c() ? e(d) : e(f, -1);
	}), L(e, l), y();
}
//#endregion
//#region ../ui/src/lib/components/variable-popover/variable-popover.svelte
var Zn = W("<p class=\"text-xs font-semibold text-dark-200\"> </p>"), Qn = W("<p class=\"py-2 text-xs text-dark-400\"> </p>"), $n = W("<li><button type=\"button\"><div class=\"flex min-w-0 flex-1 items-center gap-2.5\"><span class=\"shrink-0 rounded border border-primary-300 bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary transition-all duration-150 group-hover:border-primary-500/20 group-hover:bg-primary-500/15\"> </span> <span class=\"min-w-0 truncate text-dark-300 transition-colors duration-150 group-hover:text-dark-100\"> </span></div> <div class=\"flex size-4 shrink-0 items-center justify-center\"><!></div></button></li>"), er = W("<ul class=\"grid gap-1\"></ul>"), tr = W("<div class=\"mb-3 flex flex-col gap-2\"><!></div> <!>", 1), nr = W("<!> <!>", 1);
function rr(e, t) {
	s(t, !0);
	let n = N(t, "title", 3, "Variables"), i = N(t, "emptyLabel", 3, "No variables available."), a = N(t, "ariaLabel", 3, "Show variables"), c = N(t, "copiedLabel", 3, "Copied"), l = N(t, "insertedLabel", 3, "Inserted");
	N(t, "noResultsLabel", 3, "No variables match your search.");
	let u = N(t, "icon", 3, "ri:braces-line"), d = j(null);
	function f(e) {
		if (t.onInsert) {
			t.onInsert(e);
			return;
		}
		navigator.clipboard.writeText(`{${e}}`).then(() => {
			G(d, e, !0), setTimeout(() => {
				m(d) === e && G(d, null);
			}, 2e3);
		});
	}
	at(e, {
		children: (e, s) => {
			var p = nr(), h = g(p);
			ot(h, {
				child: (e, t) => {
					ct(e, B(() => t?.().props, {
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
			}), it(r(h, 2), {
				align: "start",
				class: "w-80 p-4",
				children: (e, a) => {
					var s = tr(), u = g(s), p = C(u), h = (e) => {
						var t = Zn(), r = C(t, !0);
						_(t), x(() => U(r, n())), L(e, t);
					};
					o(p, (e) => {
						n() && e(h);
					}), _(u);
					var v = r(u, 2), y = (e) => {
						var t = Qn(), n = C(t, !0);
						_(t), x(() => U(n, i())), L(e, t);
					}, S = (e) => {
						st(e, {
							orientation: "vertical",
							viewportClasses: "max-h-48 overflow-hidden",
							children: (e, n) => {
								var i = er();
								b(i, 21, () => t.variables, (e) => e.key, (e, n) => {
									var i = $n(), a = C(i), s = C(a), u = C(s), p = C(u, !0);
									_(u);
									var h = r(u, 2), g = C(h, !0);
									_(h), _(s);
									var v = r(s, 2), y = C(v), b = (e) => {
										X(e, {
											icon: "ri:check-line",
											class: "size-3.5 text-success-400"
										});
									}, S = (e) => {
										{
											let n = J(() => t.onInsert ? "ri:corner-down-left-line" : "ri:file-copy-line");
											X(e, {
												get icon() {
													return m(n);
												},
												class: "size-3.5 text-dark-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
											});
										}
									};
									o(y, (e) => {
										m(d) === m(n).key ? e(b) : e(S, -1);
									}), _(v), _(a), _(i), x((e) => {
										Y(a, 1, e), K(a, "title", t.onInsert ? l() : c()), U(p, `{${m(n).key}}`), U(g, m(n).label);
									}, [() => A(Z("group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-transparent px-2.5 py-2 text-left text-xs transition-all duration-150 hover:border-dark-600/30 hover:bg-dark-700/50"))]), I("click", a, () => f(m(n).key)), L(e, i);
								}), _(i), L(e, i);
							},
							$$slots: { default: !0 }
						});
					};
					o(v, (e) => {
						t.variables.length === 0 ? e(y) : e(S, -1);
					}), L(e, s);
				},
				$$slots: { default: !0 }
			}), L(e, p);
		},
		$$slots: { default: !0 }
	}), y();
}
V(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-code.svelte
var ir = W("<span></span>"), ar = W("<div class=\"flex items-center justify-between gap-2\"><!> <!></div>"), or = W("<div class=\"absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-dark-900/85\" role=\"status\" aria-live=\"polite\"><!> <p class=\"text-xs text-dark-300\"> </p></div>"), sr = W("<p class=\"text-sm text-red-400\"> </p>"), cr = W("<div><!> <div role=\"textbox\" aria-multiline=\"true\"><!></div> <!></div>");
function lr(i, c) {
	s(c, !0);
	let l = N(c, "id", 19, Ze), u = N(c, "value", 3, ""), d = N(c, "language", 3, "typescript"), p = N(c, "minHeight", 3, "12rem"), h = N(c, "fillHeight", 3, !1), g = N(c, "extensions", 19, () => []), v = N(c, "languageServer", 3, null), b = N(c, "loadingLabel", 3, "Loading..."), S = N(c, "variables", 19, () => []), T = N(c, "variablesTitle", 3, "Variables"), O = N(c, "variablesAriaLabel", 3, "Insert variable"), k = j(void 0), P = j(void 0), F = j(void 0), I = j(!1), R = !1, z = j(""), B = j(""), V;
	function H(e) {
		return Object.keys(e).sort().join("\0");
	}
	function ee(e) {
		return Object.entries(e).filter(([e]) => e.includes("/src/")).sort(([e], [t]) => e.localeCompare(t)).map(([e, t]) => `${e}\0${t}`).join("\0");
	}
	function W() {
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
		if (m(F)?.destroy(), G(F, void 0), G(z, ""), G(B, ""), W(), !v()) return [...g()];
		let e = await n(v());
		return G(F, e, !0), G(z, H(v().workspace), !0), G(B, ee(v().workspace), !0), [...g(), ...e.extensions];
	}
	te(async () => {
		if (!m(k)) return;
		let e = await ne();
		if (R || !m(k)) {
			m(F)?.destroy(), G(F, void 0);
			return;
		}
		G(P, t({
			parent: m(k),
			doc: u(),
			language: d(),
			placeholder: c.placeholder,
			extensions: e,
			onChange: q
		}), !0), G(I, !0), c.onEditorReady?.(m(P));
	}), a(() => {
		!m(P) || !m(I) || e(m(P), u());
	}), a(() => {
		if (!m(I) || !m(F) || !v()) return;
		let e = v().workspace, t = H(e), n = ee(e);
		if (t !== m(z)) {
			W(), G(z, t, !0), G(B, n, !0), m(F).updateWorkspace(e);
			return;
		}
		n !== m(B) && (W(), V = setTimeout(() => {
			V = void 0, G(B, n, !0), m(F)?.updateWorkspace(e);
		}, 450));
	}), D(() => {
		R = !0, W(), m(F)?.destroy(), G(F, void 0), c.onEditorReady?.(null), m(P)?.destroy(), G(P, void 0);
	});
	var re = cr(), ie = C(re), ae = (e) => {
		var t = ar(), n = C(t), i = (e) => {
			Kn(e, {
				get for() {
					return l();
				},
				children: (e, t) => {
					w();
					var n = M();
					x(() => U(n, c.label)), L(e, n);
				},
				$$slots: { default: !0 }
			});
		}, a = (e) => {
			L(e, ir());
		};
		o(n, (e) => {
			c.label ? e(i) : e(a, -1);
		});
		var s = r(n, 2), u = (e) => {
			rr(e, {
				get variables() {
					return S();
				},
				get title() {
					return T();
				},
				get ariaLabel() {
					return O();
				},
				onInsert: J
			});
		};
		o(s, (e) => {
			S().length > 0 && e(u);
		}), _(t), L(e, t);
	};
	o(ie, (e) => {
		(c.label || S().length > 0) && e(ae);
	});
	var oe = r(ie, 2);
	let Q;
	var se = C(oe), ce = (e) => {
		var t = or(), n = C(t);
		X(n, {
			icon: "gg:spinner",
			class: "size-5 animate-spin text-primary",
			"aria-hidden": "true"
		});
		var i = r(n, 2), a = C(i, !0);
		_(i), _(t), x(() => {
			K(t, "aria-label", b()), U(a, b());
		}), L(e, t);
	};
	o(se, (e) => {
		m(I) || e(ce);
	}), _(oe), f(oe, (e) => G(k, e), () => m(k));
	var le = r(oe, 2), ue = (e) => {
		var t = sr(), n = C(t, !0);
		_(t), x(() => U(n, c.error)), L(e, t);
	};
	o(le, (e) => {
		c.error && e(ue);
	}), _(re), x((e, t) => {
		Y(re, 1, e), K(oe, "id", l()), K(oe, "aria-busy", !m(I)), K(oe, "aria-invalid", c.error ? !0 : void 0), Y(oe, 1, t), Q = E(oe, "", Q, { "min-height": h() ? void 0 : p() });
	}, [() => A(Z("relative flex w-full flex-col", h() ? "h-full min-h-0 flex-1" : "grid gap-2")), () => A(Z("relative", "overflow-hidden rounded-lg border bg-dark-900 focus-within:ring-2 [&_.cm-editor]:outline-none", h() ? "flex min-h-0 flex-1 flex-col [&_.cm-editor]:!flex [&_.cm-editor]:!h-full [&_.cm-editor]:!max-h-full [&_.cm-editor]:!min-h-0 [&_.cm-editor]:!flex-col [&_.cm-scroller]:!min-h-0 [&_.cm-scroller]:!flex-1" : "[&_.cm-editor]:min-h-[inherit] [&_.cm-scroller]:min-h-[inherit]", c.error ? "border-red-500 focus-within:ring-red-500" : "border-dark-600 focus-within:ring-primary", c.class))]), L(i, re), y();
}
//#endregion
//#region ../core/dist/index.js
function ur(e) {
	return Date.UTC(e.y, e.m - 1, e.d, e.h, e.i, e.s);
}
function dr(e, t) {
	return e.y === t.y && e.m === t.m && e.d === t.d && e.h === t.h && e.i === t.i && e.s === t.s;
}
function fr(e, t) {
	let n = new Date(Date.parse(e));
	if (isNaN(n)) throw Error("Invalid ISO8601 passed to timezone parser.");
	let r = e.substring(9);
	return r.includes("Z") || r.includes("+") || r.includes("-") ? gr(n.getUTCFullYear(), n.getUTCMonth() + 1, n.getUTCDate(), n.getUTCHours(), n.getUTCMinutes(), n.getUTCSeconds(), "Etc/UTC") : gr(n.getFullYear(), n.getMonth() + 1, n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), t);
}
function pr(e, t, n) {
	return mr(fr(e, t), n);
}
function mr(e, t) {
	let n = new Date(ur(e)), r = hr(n, e.tz), i = ur(e) - ur(r), a = new Date(n.getTime() + i), o = hr(a, e.tz);
	if (dr(o, e)) {
		let t = /* @__PURE__ */ new Date(a.getTime() - 36e5);
		return dr(hr(t, e.tz), e) ? t : a;
	}
	let s = new Date(a.getTime() + ur(e) - ur(o));
	if (dr(hr(s, e.tz), e)) return s;
	if (t) throw Error("Invalid date passed to fromTZ()");
	return a.getTime() > s.getTime() ? a : s;
}
function hr(e, t) {
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
function gr(e, t, n, r, i, a, o) {
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
var _r = [
	1,
	2,
	4,
	8,
	16
], vr = class {
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
		else if (t < 6 && t > 0) this.dayOfWeek[e] = this.dayOfWeek[e] | _r[t - 1];
		else throw TypeError(`CronPattern: nth weekday out of range, should be 1-5 or L. Value: ${t}, Type: ${typeof t}`);
	}
}, yr = [
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
], br = class e {
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
		return t === 1 ? new Date(Date.UTC(e, t + 1, 0)).getUTCDate() : yr[t];
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
		if (r & 63 && _r[a - 1] & r) return !0;
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
			let t = hr(e, this.tz);
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
		if (this.month > 11 || this.month < 0 || this.day > yr[this.month] || this.day < 1 || this.hour > 59 || this.minute > 59 || this.second > 59 || this.hour < 0 || this.minute < 0 || this.second < 0) {
			let e = new Date(Date.UTC(this.year, this.month, this.day, this.hour, this.minute, this.second, this.ms));
			return this.ms = e.getUTCMilliseconds(), this.second = e.getUTCSeconds(), this.minute = e.getUTCMinutes(), this.hour = e.getUTCHours(), this.day = e.getUTCDate(), this.month = e.getUTCMonth(), this.year = e.getUTCFullYear(), !0;
		} else return !1;
	}
	fromString(e) {
		if (typeof this.tz == "number") {
			let t = pr(e);
			this.ms = t.getUTCMilliseconds(), this.second = t.getUTCSeconds(), this.minute = t.getUTCMinutes(), this.hour = t.getUTCHours(), this.day = t.getUTCDate(), this.month = t.getUTCMonth(), this.year = t.getUTCFullYear(), this.apply();
		} else return this.fromDate(pr(e, this.tz));
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
					let n = t === 1 ? new Date(Date.UTC(e, t + 1, 0)).getUTCDate() : yr[t];
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
		return e || this.tz === void 0 ? new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.ms) : typeof this.tz == "number" ? new Date(Date.UTC(this.year, this.month, this.day, this.hour, this.minute - this.tz, this.second, this.ms)) : mr(gr(this.year, this.month + 1, this.day, this.hour, this.minute, this.second, this.tz), !1);
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
function xr(e) {
	if (e === void 0 && (e = {}), delete e.name, e.legacyMode !== void 0 && e.domAndDow === void 0 ? e.domAndDow = !e.legacyMode : e.domAndDow === void 0 && (e.domAndDow = !1), e.legacyMode = !e.domAndDow, e.paused = e.paused === void 0 ? !1 : e.paused, e.maxRuns = e.maxRuns === void 0 ? Infinity : e.maxRuns, e.catch = e.catch === void 0 ? !1 : e.catch, e.interval = e.interval === void 0 ? 0 : parseInt(e.interval.toString(), 10), e.utcOffset = e.utcOffset === void 0 ? void 0 : parseInt(e.utcOffset.toString(), 10), e.dayOffset = e.dayOffset === void 0 ? 0 : parseInt(e.dayOffset.toString(), 10), e.unref = e.unref === void 0 ? !1 : e.unref, e.mode = e.mode === void 0 ? "auto" : e.mode, e.alternativeWeekdays = e.alternativeWeekdays === void 0 ? !1 : e.alternativeWeekdays, e.sloppyRanges = e.sloppyRanges === void 0 ? !1 : e.sloppyRanges, ![
		"auto",
		"5-part",
		"6-part",
		"7-part",
		"5-or-6-parts",
		"6-or-7-parts"
	].includes(e.mode)) throw Error("CronOptions: mode must be one of 'auto', '5-part', '6-part', '7-part', '5-or-6-parts', or '6-or-7-parts'.");
	if (e.startAt &&= new br(e.startAt, e.timezone), e.stopAt &&= new br(e.stopAt, e.timezone), e.interval !== null) {
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
function Sr(e) {
	return Object.prototype.toString.call(e) === "[object Function]" || typeof e == "function" || e instanceof Function;
}
function Cr(e) {
	return Sr(e);
}
function wr(e) {
	typeof Deno < "u" && typeof Deno.unrefTimer < "u" ? Deno.unrefTimer(e) : e && typeof e.unref < "u" && e.unref();
}
var Tr = 30 * 1e3, Er = [], Dr = class {
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
		if (Sr(t)) i = t;
		else if (typeof t == "object") r = t;
		else if (t !== void 0) throw Error("Cron: Invalid argument passed for optionsIn. Should be one of function, or object (options).");
		if (Sr(n)) i = n;
		else if (typeof n == "object") r = n;
		else if (n !== void 0) throw Error("Cron: Invalid argument passed for funcIn. Should be one of function, or object (options).");
		if (this.name = r?.name, this.options = xr(r), this._states = {
			kill: !1,
			blocking: !1,
			previousRun: void 0,
			currentRun: void 0,
			once: void 0,
			currentTimeout: void 0,
			maxRuns: r ? r.maxRuns : void 0,
			paused: r ? r.paused : !1,
			pattern: new vr("* * * * *", void 0, { mode: "auto" })
		}, e && (e instanceof Date || typeof e == "string" && e.indexOf(":") > 0) ? this._states.once = new br(e, this.getTz()) : this._states.pattern = new vr(e, this.options.timezone, {
			mode: this.options.mode,
			alternativeWeekdays: this.options.alternativeWeekdays,
			sloppyRanges: this.options.sloppyRanges
		}), this.name) {
			if (Er.find((e) => e.name === this.name)) throw Error("Cron: Tried to initialize new named job '" + this.name + "', but name already taken.");
			Er.push(this);
		}
		return i !== void 0 && Cr(i) && (this.fn = i, this.schedule()), this;
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
		let r = [], i = t ? new br(t, this.getTz()) : null, a = n === "next" ? this._next : this._previous;
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
			let t = new br(e, this.getTz());
			t.ms = 0;
			let n = new br(this._states.once, this.getTz());
			return n.ms = 0, t.getTime() === n.getTime();
		}
		let t = new br(e, this.getTz());
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
		return t ? e instanceof br || e instanceof Date ? t.getTime() - e.getTime() : t.getTime() - new br(e).getTime() : null;
	}
	stop() {
		this._states.kill = !0, this._states.currentTimeout && clearTimeout(this._states.currentTimeout);
		let e = Er.indexOf(this);
		e >= 0 && Er.splice(e, 1);
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
		return t == null || isNaN(t) || n === null ? this : (t > Tr && (t = Tr), this._states.currentTimeout = setTimeout(() => this._checkTrigger(n), t), this._states.currentTimeout && this.options.unref && wr(this._states.currentTimeout), this);
	}
	async _trigger(e) {
		this._states.blocking = !0, this._states.currentRun = new br(void 0, this.getTz());
		try {
			if (this.options.catch) try {
				this.fn !== void 0 && await this.fn(this, this.options.context);
			} catch (e) {
				if (Sr(this.options.catch)) try {
					this.options.catch(e, this);
				} catch {}
			}
			else this.fn !== void 0 && await this.fn(this, this.options.context);
		} finally {
			this._states.previousRun = new br(e, this.getTz()), this._states.blocking = !1;
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
		n && !r ? (this._states.maxRuns !== void 0 && this._states.maxRuns--, this._trigger()) : n && r && Sr(this.options.protect) && setTimeout(() => this.options.protect(this), 0), this.schedule();
	}
	_next(e) {
		let t = !!(e || this._states.currentRun), n = !1;
		!e && this.options.startAt && this.options.interval && ([e, t] = this._calculatePreviousRun(e, t), n = !e), e = new br(e, this.getTz()), this.options.startAt && e && e.getTime() < this.options.startAt.getTime() && (e = this.options.startAt);
		let r = this._states.once || new br(e, this.getTz());
		return !n && r !== this._states.once && (r = r.increment(this._states.pattern, this.options, t)), this._states.once && this._states.once.getTime() <= e.getTime() || r === null || this._states.maxRuns !== void 0 && this._states.maxRuns <= 0 || this._states.kill || this.options.stopAt && r.getTime() >= this.options.stopAt.getTime() ? null : r;
	}
	_previous(e) {
		let t = new br(e, this.getTz());
		this.options.stopAt && t.getTime() > this.options.stopAt.getTime() && (t = this.options.stopAt);
		let n = new br(t, this.getTz());
		return this._states.once ? this._states.once.getTime() < t.getTime() ? this._states.once : null : (n = n.decrement(this._states.pattern, this.options), n === null || this.options.startAt && n.getTime() < this.options.startAt.getTime() ? null : n);
	}
	_calculatePreviousRun(e, t) {
		let n = new br(void 0, this.getTz()), r = e;
		if (this.options.startAt.getTime() <= n.getTime()) {
			r = this.options.startAt;
			let e = r.getTime() + this.options.interval * 1e3;
			for (; e <= n.getTime();) r = new br(r, this.getTz()).increment(this._states.pattern, this.options, !0), e = r.getTime() + this.options.interval * 1e3;
			t = !0;
		}
		return r === null && (r = void 0), [r, t];
	}
}, Or = [
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
], kr = [
	"minute",
	"hour",
	"day",
	"month",
	"weekday"
];
function Ar() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function jr(e) {
	return e.trim().replace(/\s+/g, " ");
}
function Mr(e) {
	let t = jr(e);
	return t ? t.split(" ").length : 0;
}
function Nr(e) {
	let t = jr(e);
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
function Pr(e) {
	let t = jr(e);
	if (!t || Mr(t) !== 5) return !1;
	try {
		return new Dr(t, {
			timezone: Ar(),
			paused: !0
		}), !0;
	} catch {
		return !1;
	}
}
function Fr(e) {
	let t = jr(e);
	if (t) {
		if (Mr(t) !== 5) return "Cron expression must have exactly 5 fields";
		if (!Pr(t)) return "Invalid cron expression";
	}
}
function Ir(e) {
	let t = jr(e);
	if (Pr(t)) try {
		let e = new Dr(t, {
			timezone: Ar(),
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
var Lr = typeof window < "u" ? window : void 0;
typeof window < "u" && window.document, typeof window < "u" && window.navigator, typeof window < "u" && window.location;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/internal/utils/dom.js
function Rr(e) {
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
		let { window: t = Lr, document: n = t?.document } = e;
		t !== void 0 && (this.#e = n, this.#t = v((e) => {
			let n = T(t, "focusin", e), r = T(t, "focusout", e);
			return () => {
				n(), r();
			};
		}));
	}
	get current() {
		return this.#t?.(), this.#e ? Rr(this.#e) : null;
	}
}();
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/internal/utils/is.js
function zr(e) {
	return typeof e == "function";
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/extract/extract.svelte.js
function Br(e, t) {
	if (zr(e)) {
		let n = e();
		return n === void 0 ? t : n;
	}
	return e === void 0 ? t : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/use-debounce/use-debounce.svelte.js
function Vr(e, t) {
	let n = j(null), r = J(() => Br(t, 250));
	function i(...t) {
		if (m(n)) m(n).timeout && clearTimeout(m(n).timeout);
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
		return m(n).runner = async () => {
			if (!m(n)) return;
			let r = m(n);
			G(n, null);
			try {
				r.resolve(await e.apply(this, t));
			} catch (e) {
				r.reject(e);
			}
		}, m(n).timeout = setTimeout(m(n).runner, m(r)), m(n).promise;
	}
	return i.cancel = async () => {
		(!m(n) || m(n).timeout === null) && (await new Promise((e) => setTimeout(e, 0)), !m(n) || m(n).timeout === null) || (clearTimeout(m(n).timeout), m(n).reject("Cancelled"), G(n, null));
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
function Hr(e, t) {
	switch (e) {
		case "post":
			a(t);
			break;
		case "pre":
			l(t);
			break;
	}
}
function Ur(e, t, n, r = {}) {
	let { lazy: i = !1 } = r, a = !i, o = Array.isArray(e) ? [] : void 0;
	Hr(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!a) {
			a = !0, o = t;
			return;
		}
		let r = p(() => n(t, o));
		return o = t, r;
	});
}
function Wr(e, t, n) {
	let r = ae(() => {
		let i = !1;
		Ur(e, t, (e, t) => {
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
function Gr(e, t, n) {
	Ur(e, "post", t, n);
}
function Kr(e, t, n) {
	Ur(e, "pre", t, n);
}
Gr.pre = Kr;
function qr(e, t) {
	Wr(e, "post", t);
}
function Jr(e, t) {
	Wr(e, "pre", t);
}
qr.pre = Jr;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/internal/utils/function.js
function Yr() {}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/debounced/debounced.svelte.js
var Xr = class {
	#e = j();
	#t;
	constructor(e, t = 250) {
		G(this.#e, e(), !0), this.cancel = this.cancel.bind(this), this.setImmediately = this.setImmediately.bind(this), this.updateImmediately = this.updateImmediately.bind(this), this.#t = Vr(() => {
			G(this.#e, e(), !0);
		}, t), Gr(e, () => {
			this.#t().catch(Yr);
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
		this.cancel(), G(this.#e, e, !0);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_1990267f08eae47fb91fb94e941c6039/node_modules/runed/dist/utilities/resource/resource.svelte.js
function Zr(e, t) {
	let n, r = null;
	return (...i) => new Promise((a) => {
		r && r(void 0), r = a, clearTimeout(n), n = setTimeout(async () => {
			let t = await e(...i);
			r &&= (r(t), null);
		}, t);
	});
}
function Qr(e, t) {
	let n = 0, r = null;
	return (...i) => {
		let a = Date.now();
		return n && a - n < t ? r ?? Promise.resolve(void 0) : (n = a, r = e(...i), r);
	};
}
function $r(e, t, n = {}, r) {
	let { lazy: i = !1, once: a = !1, initialValue: o, debounce: s, throttle: c } = n, l = j(ee(o)), u = j(ee(o === void 0 && !i)), d = j(void 0), f = j(ee([])), p = () => {
		m(f).forEach((e) => e()), G(f, [], !0);
	}, h = (e) => {
		G(f, [...m(f), e], !0);
	}, g = async (e, n, r = !1) => {
		try {
			G(u, !0), G(d, void 0), p();
			let i = new AbortController();
			h(() => i.abort());
			let a = await t(e, n, {
				data: m(l),
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
	}, _ = s ? Zr(g, s) : c ? Qr(g, c) : g, v = Array.isArray(e) ? e : [e], y;
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
			G(l, e, !0);
		},
		refetch: (t) => {
			let n = v.map((e) => e());
			return _(Array.isArray(e) ? n : n[0], Array.isArray(e) ? n : n[0], t ?? !0);
		}
	};
}
function ei(e, t, n) {
	return $r(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		Gr(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
function ti(e, t, n) {
	return $r(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		Gr.pre(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
ei.pre = ti;
//#endregion
//#region ../ui/src/lib/components/input/input-size-classes.ts
var ni = {
	xs: "px-2 py-1 text-xs",
	sm: "px-3 py-2 text-xs",
	md: "px-4 py-2 text-sm",
	lg: "px-5 py-3 text-base"
}, ri = {
	xs: "size-3",
	sm: "size-4",
	md: "size-5",
	lg: "size-6"
}, ii = {
	xs: "min-w-8",
	sm: "min-w-9",
	md: "min-w-10",
	lg: "min-w-10"
};
//#endregion
//#region ../ui/src/lib/components/input/resolve-select-items.svelte.ts
function ai(e, t) {
	let n = j(ee([])), r = j(!1), i = j(0), o = J(() => {
		let t = e();
		return typeof t == "function" ? (m(i), m(n)) : t;
	}), s = J(() => typeof e() == "function" ? (m(i), m(r)) : !1);
	return a(() => {
		t && t();
		let a = e();
		if (typeof a != "function") return;
		G(r, !0);
		let o = !1;
		return Promise.resolve(a()).then((e) => {
			o || (G(n, e, !0), G(r, !1), z(i));
		}, () => {
			o || (G(n, [], !0), G(r, !1), z(i));
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
function oi(e, t) {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => e.label.toLowerCase().includes(n) || e.value.toLowerCase().includes(n)) : e;
}
function si(e, t, n = 200, r = 36, i = 6) {
	let a = e.length * r, o = Math.max(0, Math.floor(t / r) - i), s = Math.ceil(n / r) + i * 2, c = Math.min(e.length, o + s);
	return {
		items: e.slice(o, c),
		startIndex: o,
		totalHeight: a,
		offsetY: o * r
	};
}
function ci(e) {
	return e > 50;
}
function li(e, t = 36) {
	return Math.max(0, e * t);
}
//#endregion
//#region ../ui/src/lib/components/input/select-dropdown-search.svelte
var ui = W("<div><div class=\"relative flex items-center\"><input type=\"text\" inputmode=\"search\" role=\"searchbox\" autocomplete=\"off\"/></div></div>");
function di(e, t) {
	s(t, !0);
	let n = N(t, "query", 15, ""), r = N(t, "placeholder", 3, "Search values"), i = N(t, "ariaLabel", 3, "Search values"), o = N(t, "inputElement", 15, null), c = N(t, "autofocus", 3, !1), l = (e) => {
		(e.key.length === 1 || e.key === "Backspace" || e.key === "Delete" || e.key === " ") && (e.stopPropagation(), e.stopImmediatePropagation());
	}, u = (e) => {
		n(e.currentTarget.value), t.onQueryChange?.(n());
	};
	a(() => {
		!c() || !o() || o().focus({ preventScroll: !0 });
	});
	var d = ui(), p = C(d), m = C(p);
	k(m), K(m, "spellcheck", !1), f(m, (e) => o(e), () => o()), _(p), _(d), x((e, t) => {
		Y(d, 1, e), P(m, n()), K(m, "placeholder", r()), K(m, "aria-label", i()), Y(m, 1, t);
	}, [() => A(Z("sticky top-0 z-10 mb-[5px] shrink-0 border-b border-dark-600", t.class)), () => A(Z("w-full rounded-lg text-dark-50 outline-none", ni.md, "focus:border-primary focus:ring-1 focus:ring-primary"))]), F("keydown", d, l, !0), I("input", m, u), I("keydown", m, l), I("click", m, (e) => e.stopPropagation()), L(e, d), y();
}
V([
	"input",
	"keydown",
	"click"
]);
//#endregion
//#region ../ui/src/lib/components/input/use-dropdown-scroll.svelte.ts
var fi = class {
	#e = j(0);
	get scrollTop() {
		return m(this.#e);
	}
	set scrollTop(e) {
		G(this.#e, e, !0);
	}
	#t = j(null);
	get viewportRef() {
		return m(this.#t);
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
		let t = li(e);
		this.scrollTop = t, this.viewportRef && (this.viewportRef.scrollTop = t);
	}
	scrollToValue(e, t) {
		if (!t) return;
		let n = e.findIndex((e) => e.value === t);
		n >= 0 && this.scrollToIndex(n);
	}
}, pi = W("<div class=\"relative w-full\"><div class=\"absolute inset-x-0 top-0\"></div></div>");
function mi(e, t) {
	s(t, !0);
	let n = J(() => ci(t.items.length)), r = J(() => m(n) ? si(t.items, t.scrollTop) : null), i = J(() => m(n) && m(r) ? m(r).items : t.items);
	var a = O(), c = g(a), l = (e) => {
		var n = pi();
		let a;
		var o = C(n);
		let s;
		b(o, 21, () => m(i), (e) => e.value, (e, n) => {
			var r = O();
			d(g(r), () => t.item, () => m(n)), L(e, r);
		}), _(o), _(n), x(() => {
			a = E(n, "", a, { height: `${m(r).totalHeight}px` }), s = E(o, "", s, { transform: `translateY(${m(r).offsetY}px)` });
		}), L(e, n);
	}, u = (e) => {
		var n = O();
		b(g(n), 17, () => m(i), (e) => e.value, (e, n) => {
			var r = O();
			d(g(r), () => t.item, () => m(n)), L(e, r);
		}), L(e, n);
	};
	o(c, (e) => {
		m(n) && m(r) ? e(l) : e(u, -1);
	}), L(e, a), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-select.svelte
var hi = (e, t = H) => {
	let n = J(() => t().value), a = J(() => t().label), s = J(() => t().disabled);
	var c = O(), l = g(c);
	{
		let e = (e, t) => {
			let n = () => t?.().selected;
			w();
			var i = _i(), s = g(i), c = r(s), l = (e) => {
				X(e, {
					icon: "ri:check-line",
					class: "size-5 text-primary"
				});
			};
			o(c, (e) => {
				n() && e(l);
			}), x(() => U(s, `${m(a) ?? ""} `)), L(e, i);
		}, t = J(() => Z("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
		i(l, () => on, (r, i) => {
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
	L(e, c);
}, gi = new Set([
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
]), _i = W(" <!>", 1), vi = W("<span class=\"grid h-full min-w-10 place-items-center rounded-l-xl border border-r-0 border-dark-700 text-dark-50\"><!></span>"), yi = W("<!> <span><!> <!></span>", 1), bi = W("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), xi = W("<!> <!> <!> <!>", 1), Si = W("<div><!></div> <!>", 1), Ci = W("<p class=\"text-sm text-red-400\"> </p>"), wi = W("<div><!> <!> <!></div>");
function Ti(e, t) {
	s(t, !0);
	let n = (e) => {
		var n = Si(), a = g(n);
		i(C(a), () => jn, (e, n) => {
			n(e, {
				get id() {
					return c();
				},
				class: "flex w-full cursor-pointer items-center outline-none",
				children: (e, n) => {
					var a = yi(), s = g(a), c = (e) => {
						var n = vi();
						X(C(n), {
							get icon() {
								return t.prependIcon;
							},
							class: "size-6"
						}), _(n), L(e, n);
					};
					o(s, (e) => {
						t.prependIcon && e(c);
					});
					var l = r(s, 2), u = C(l);
					{
						let e = J(() => k.loading ? m(p) : m(f));
						i(u, () => On, (t, n) => {
							n(t, {
								get placeholder() {
									return m(e);
								},
								class: "truncate data-placeholder:text-dark-300"
							});
						});
					}
					X(r(u, 2), {
						icon: "ri:expand-up-down-line",
						class: "size-5 shrink-0 text-dark-300"
					}), _(l), x((e) => Y(l, 1, e), [() => A(Z("flex w-full items-center justify-between gap-2 border bg-dark-700 text-dark-50 outline-none", ni.md, t.error ? "border-red-500" : "border-dark-500", {
						"rounded-l-none rounded-r-xl border-l-0": t.prependIcon,
						"rounded-xl": !t.prependIcon
					}))]), L(e, a);
				},
				$$slots: { default: !0 }
			});
		}), _(a), i(r(a, 2), () => nt, (e, n) => {
			n(e, {
				children: (e, n) => {
					var a = O(), s = g(a);
					{
						let e = J(() => t.contentProps?.sideOffset ?? 4), n = J(() => Z("z-50 max-h-60 w-(--bits-select-anchor-width) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 shadow-md outline-none", t.contentProps?.class));
						i(s, () => en, (a, s) => {
							s(a, B(() => t.contentProps, {
								get sideOffset() {
									return m(e);
								},
								get class() {
									return m(n);
								},
								children: (e, t) => {
									var n = xi(), a = g(n), s = (e) => {
										di(e, {
											onQueryChange: z,
											get autofocus() {
												return m(b);
											},
											get placeholder() {
												return m(h);
											},
											get ariaLabel() {
												return m(h);
											},
											get query() {
												return m(T);
											},
											set query(e) {
												G(T, e, !0);
											},
											get inputElement() {
												return m(E);
											},
											set inputElement(e) {
												G(E, e, !0);
											}
										});
									};
									o(a, (e) => {
										m(I) && !k.loading && e(s);
									});
									var c = r(a, 2);
									i(c, () => vn, (e, t) => {
										t(e, {
											class: "flex w-full items-center justify-center py-1 text-dark-300",
											children: (e, t) => {
												X(e, { icon: "ri:arrow-up-s-line" });
											},
											$$slots: { default: !0 }
										});
									});
									var l = r(c, 2);
									i(l, () => un, (e, t) => {
										t(e, {
											get onscroll() {
												return D.handleViewportScroll;
											},
											class: " p-[5px]",
											get ref() {
												return D.viewportRef;
											},
											set ref(e) {
												D.viewportRef = e;
											},
											children: (e, t) => {
												var n = O(), r = g(n), i = (e) => {
													var t = bi(), n = C(t, !0);
													_(t), x(() => U(n, m(p))), L(e, t);
												}, a = (e) => {
													var t = O();
													S(g(t), () => `${m(T)}:${m(R).length}`, (e) => {
														mi(e, {
															get items() {
																return m(R);
															},
															get scrollTop() {
																return D.scrollTop;
															},
															get item() {
																return hi;
															}
														});
													}), L(e, t);
												}, s = (e) => {
													var t = bi(), n = C(t, !0);
													_(t), x(() => U(n, m(v))), L(e, t);
												}, c = J(() => m(I) && m(T).trim());
												o(r, (e) => {
													k.loading ? e(i) : m(R).length > 0 ? e(a, 1) : m(c) && e(s, 2);
												}), L(e, n);
											},
											$$slots: { default: !0 }
										});
									}), i(r(l, 2), () => mn, (e, t) => {
										t(e, {
											class: "flex w-full items-center justify-center py-1 text-dark-300",
											children: (e, t) => {
												X(e, { icon: "ri:arrow-down-s-line" });
											},
											$$slots: { default: !0 }
										});
									}), L(e, n);
								},
								$$slots: { default: !0 }
							}));
						});
					}
					L(e, a);
				},
				$$slots: { default: !0 }
			});
		}), x((e) => Y(a, 1, e), [() => A(Z("relative flex w-full items-center rounded-xl", "has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500", t.class))]), L(e, n);
	}, a = N(t, "searchable", 3, "auto"), c = N(t, "id", 19, Ze), l = N(t, "value", 15), d = q(t, gi), f = J(() => t.placeholder ?? "Select an option"), p = J(() => t.loadingPlaceholder ?? "Loading..."), h = J(() => t.searchPlaceholder ?? "Search values"), v = J(() => t.noResultsLabel ?? "No matches found"), b = j(!1), T = j(""), E = j(null), D = new fi(), k = ai(() => t.items, () => t.reloadKey?.()), P = J(() => t.disabled), F = J(() => t.type === "multiple" ? void 0 : l()), I = J(() => a() === !0 ? !0 : a() === !1 ? !1 : k.items.length >= 8), R = J(() => k.loading ? [] : !m(I) || !m(T).trim() ? k.items : oi(k.items, m(T)));
	function z() {
		D.resetScroll();
	}
	async function V(e) {
		if (G(b, e, !0), !e) {
			G(T, ""), D.resetScroll();
			return;
		}
		await u(), D.scrollToValue(m(R), m(F));
	}
	var H = wi(), ee = C(H), te = (e) => {
		Kn(e, {
			get for() {
				return c();
			},
			children: (e, n) => {
				w();
				var r = M();
				x(() => U(r, t.label)), L(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	o(ee, (e) => {
		t.label && e(te);
	});
	var W = r(ee, 2), K = (e) => {
		var t = O();
		i(g(t), () => Tn, (e, t) => {
			t(e, B({
				type: "single",
				get items() {
					return k.items;
				},
				get disabled() {
					return m(P);
				},
				onOpenChange: V
			}, () => d, {
				get open() {
					return m(b);
				},
				set open(e) {
					G(b, e, !0);
				},
				get value() {
					return l();
				},
				set value(e) {
					l(e);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			}));
		}), L(e, t);
	}, ne = (e) => {
		var t = O();
		i(g(t), () => Tn, (e, t) => {
			t(e, B({
				type: "multiple",
				get items() {
					return k.items;
				},
				get disabled() {
					return m(P);
				},
				onOpenChange: V
			}, () => d, {
				get open() {
					return m(b);
				},
				set open(e) {
					G(b, e, !0);
				},
				get value() {
					return l();
				},
				set value(e) {
					l(e);
				},
				children: (e, t) => {
					n(e);
				},
				$$slots: { default: !0 }
			}));
		}), L(e, t);
	};
	o(W, (e) => {
		t.type === "single" ? e(K) : e(ne, -1);
	});
	var re = r(W, 2), ie = (e) => {
		var n = Ci(), r = C(n, !0);
		_(n), x(() => U(r, t.error)), L(e, n);
	};
	o(re, (e) => {
		t.error && e(ie);
	}), _(H), x((e) => Y(H, 1, e), [() => A(Z("relative grid w-full gap-2"))]), L(e, H), y();
}
//#endregion
//#region ../ui/src/lib/components/input/cron-expression-editor.svelte
var Ei = W("<div><p class=\"text-[10px] font-semibold tracking-[0.14em] text-dark-400 uppercase\"> </p> <p> </p></div>"), Di = W("<span><!> </span>"), Oi = W("<p class=\"text-xs text-dark-200\"><span class=\"text-dark-400\"> </span> <span class=\"font-medium text-primary-100\"> </span></p>"), ki = W("<div class=\"overflow-hidden rounded-xl border border-dark-600 bg-dark-800/40 transition-all duration-200 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20\"><div class=\"grid grid-cols-5 border-b border-dark-600/80 bg-dark-900/40 px-2 py-1.5\"></div> <div class=\"relative flex items-center gap-2 px-3 py-2\"><!> <input autocomplete=\"off\"/> <!></div> <div class=\"flex flex-wrap items-center justify-between gap-2 border-t border-dark-600/80 bg-dark-900/30 px-3 py-2\"><div class=\"min-w-40 max-w-xs flex-1\"><!></div> <!></div></div>");
function Ai(e, t) {
	s(t, !0);
	let n = N(t, "value", 3, ""), i = N(t, "placeholder", 3, "0 9 * * 1-5"), a = N(t, "presets", 3, Or), c = N(t, "validLabel", 3, "Valid expression"), l = N(t, "invalidLabel", 3, "Invalid cron expression"), u = N(t, "nextRunLabel", 3, "Next run"), d = N(t, "presetsPlaceholder", 3, "Presets"), f = Ze(), p = new Xr(() => n(), 250), h = J(() => ({
		minute: t.fieldLabels?.minute ?? "Minute",
		hour: t.fieldLabels?.hour ?? "Hour",
		day: t.fieldLabels?.day ?? "Day",
		month: t.fieldLabels?.month ?? "Month",
		weekday: t.fieldLabels?.weekday ?? "Weekday"
	})), g = J(() => Nr(n())), v = J(() => jr(p.current)), S = J(() => Fr(m(v))), w = J(() => !!m(v) && !m(S)), T = J(() => m(S) === "Invalid cron expression" ? l() : m(S)), E = J(() => m(w) ? Ir(m(v)) : void 0), D = J(() => a().map((e) => ({
		value: e.value,
		label: e.label
	}))), O = {
		minute: "text-sky-300",
		hour: "text-violet-300",
		day: "text-emerald-300",
		month: "text-amber-300",
		weekday: "text-rose-300"
	}, j = (e) => {
		t.oninput?.(e);
	};
	function M(e) {
		t.oninput?.({ currentTarget: { value: e } });
	}
	var F = ki(), R = C(F);
	b(R, 22, () => kr, (e) => e, (e, t, n) => {
		var i = Ei(), a = C(i), o = C(a, !0);
		_(a);
		var s = r(a, 2), c = C(s, !0);
		_(s), _(i), x((e, r) => {
			Y(i, 1, e), U(o, m(h)[t]), Y(s, 1, r), U(c, m(g)[m(n)] || "—");
		}, [() => A(Z("px-1 text-center", m(n) < 4 && "border-r border-dark-700/50")), () => A(Z("mt-0.5 truncate font-mono text-xs", O[t]))]), L(e, i);
	}), _(R);
	var z = r(R, 2), B = C(z);
	X(B, {
		icon: "ri:time-line",
		class: "size-5 shrink-0 text-dark-400"
	});
	var V = r(B, 2);
	k(V), K(V, "spellcheck", !1);
	var H = r(V, 2), ee = (e) => {
		var t = Di(), n = C(t);
		{
			let e = J(() => m(w) ? "ri:check-line" : "ri:alert-line");
			X(n, {
				get icon() {
					return m(e);
				},
				class: "size-4"
			});
		}
		var i = r(n);
		_(t), x((e) => {
			Y(t, 1, e), U(i, ` ${(m(w) ? c() : m(T)) ?? ""}`);
		}, [() => A(Z("inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium", m(w) ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"))]), L(e, t);
	};
	o(H, (e) => {
		m(v) && e(ee);
	}), _(z);
	var te = r(z, 2), W = C(te), G = C(W), q = () => "", ne = (e) => {
		e && M(e);
	};
	Ti(G, {
		type: "single",
		get placeholder() {
			return d();
		},
		get items() {
			return m(D);
		},
		get value() {
			return q();
		},
		set value(e) {
			ne(e);
		}
	}), _(W);
	var re = r(W, 2), ie = (e) => {
		var t = Oi(), n = C(t), i = C(n);
		_(n);
		var a = r(n, 2), o = C(a, !0);
		_(a), _(t), x(() => {
			U(i, `${u() ?? ""}:`), U(o, m(E));
		}), L(e, t);
	};
	o(re, (e) => {
		m(E) && e(ie);
	}), _(te), _(F), x((e) => {
		K(V, "id", f), Y(V, 1, e), K(V, "placeholder", i()), V.required = t.required, P(V, n() ?? "");
	}, [() => A(Z("min-w-0 flex-1 border-0 bg-transparent font-mono text-sm text-dark-50 outline-none", ni.md, "px-0 py-0"))]), I("input", V, j), L(e, F), y();
}
V(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-cron-expression.svelte
var ji = W("<button><!> <span> </span> <!> <!></button>"), Mi = W("<p class=\"mb-3 text-xs font-semibold tracking-wide text-dark-200 uppercase\"> </p> <!>", 1), Ni = W("<!> <!>", 1), Pi = W("<p class=\"text-sm text-red-400\"> </p>"), Fi = W("<div><!> <!> <!></div>");
function Ii(e, t) {
	s(t, !0);
	let n = N(t, "id", 19, Ze), i = N(t, "value", 3, ""), a = N(t, "placeholder", 3, "0 9 * * 1-5"), c = N(t, "validLabel", 3, "Valid expression"), l = N(t, "invalidLabel", 3, "Invalid cron expression"), u = N(t, "nextRunLabel", 3, "Next run"), d = N(t, "presetsPlaceholder", 3, "Presets"), f = N(t, "editorTitle", 3, "Cron expression"), p = N(t, "emptyLabel", 3, "Configure cron expression"), h = N(t, "editAriaLabel", 3, "Edit cron expression"), v = j(!1), b = J(() => jr(i())), S = J(() => Fr(m(b))), T = J(() => !!m(b) && !m(S)), E = J(() => m(b) || p()), D = J(() => !m(b));
	var O = Fi(), k = C(O), P = (e) => {
		Kn(e, {
			get for() {
				return n();
			},
			children: (e, n) => {
				w();
				var r = M();
				x(() => U(r, t.label)), L(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	o(k, (e) => {
		t.label && e(P);
	});
	var F = r(k, 2);
	at(F, {
		get open() {
			return m(v);
		},
		set open(e) {
			G(v, e, !0);
		},
		children: (e, s) => {
			var p = Ni(), y = g(p);
			ot(y, {
				child: (e, i) => {
					let a = () => i?.().props;
					var s = ji();
					R(s, (e) => ({
						id: n(),
						type: "button",
						...a(),
						"aria-label": h(),
						class: e
					}), [() => Z("flex w-full items-center gap-2 rounded-xl border bg-dark-700 text-left outline-none transition-all", ni.md, "focus-visible:ring-2", t.error ? "border-red-500 focus-visible:border-red-500/50 focus-visible:ring-red-500" : "border-dark-500 focus-visible:border-primary/50 focus-visible:ring-primary")]);
					var c = C(s);
					X(c, {
						icon: "ri:time-line",
						class: "size-5 shrink-0 text-dark-400"
					});
					var l = r(c, 2), u = C(l, !0);
					_(l);
					var d = r(l, 2), f = (e) => {
						{
							let t = J(() => m(T) ? "ri:check-line" : "ri:alert-line"), n = J(() => Z("size-5 shrink-0", m(T) ? "text-green-400" : "text-amber-400"));
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
						let e = J(() => Z("size-5 shrink-0 text-dark-300 transition-transform", m(v) && "rotate-180"));
						X(p, {
							icon: "ri:arrow-down-s-line",
							get class() {
								return m(e);
							}
						});
					}
					_(s), x((e) => {
						Y(l, 1, e), U(u, m(E));
					}, [() => A(Z("min-w-0 flex-1 truncate text-sm", m(D) ? "font-sans text-dark-300" : "font-mono text-dark-50"))]), L(e, s);
				},
				$$slots: { child: !0 }
			}), it(r(y, 2), {
				align: "start",
				class: "w-[min(28rem,calc(100vw-2rem))] p-3",
				children: (e, n) => {
					var o = Mi(), s = g(o), p = C(s, !0);
					_(s), Ai(r(s, 2), {
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
					}), x(() => U(p, f())), L(e, o);
				},
				$$slots: { default: !0 }
			}), L(e, p);
		},
		$$slots: { default: !0 }
	});
	var I = r(F, 2), z = (e) => {
		var n = Pi(), r = C(n, !0);
		_(n), x(() => U(r, t.error)), L(e, n);
	};
	o(I, (e) => {
		t.error && e(z);
	}), _(O), x((e) => Y(O, 1, e), [() => A(Z("relative grid w-full gap-2", t.class))]), L(e, O), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text.svelte
var Li = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"label",
	"id",
	"prependIcon",
	"appendIcon",
	"error",
	"size"
]), Ri = W("<span><!></span>"), zi = W("<button type=\"button\"><!></button>"), Bi = W("<p class=\"text-sm text-red-400\"> </p>"), Vi = W("<div><!> <div><!> <input/> <!> <!></div> <!></div>");
function Hi(e, t) {
	s(t, !0);
	let n = N(t, "id", 19, Ze), i = N(t, "size", 3, "md"), a = q(t, Li), c = j(!1), l = J(() => t.type === "password"), u = J(() => !!t.appendIcon || m(l)), d = ni;
	var f = Vi(), p = C(f), h = (e) => {
		Kn(e, {
			get for() {
				return n();
			},
			children: (e, n) => {
				w();
				var r = M();
				x(() => U(r, t.label)), L(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	o(p, (e) => {
		t.label && e(h);
	});
	var g = r(p, 2), v = C(g), b = (e) => {
		var n = Ri();
		X(C(n), {
			get icon() {
				return t.prependIcon;
			},
			get class() {
				return ri[i()];
			}
		}), _(n), x((e) => Y(n, 1, e), [() => A(Z("grid h-full place-items-center rounded-l-xl border border-dark-500 bg-dark-700 text-dark-50", ii[i()]))]), L(e, n);
	};
	o(v, (e) => {
		t.prependIcon && e(b);
	});
	var S = r(v, 2);
	R(S, (e) => ({
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
	var T = r(S, 2), E = (e) => {
		var n = Ri();
		X(C(n), {
			get icon() {
				return t.appendIcon;
			},
			get class() {
				return ri[i()];
			}
		}), _(n), x((e) => Y(n, 1, e), [() => A(Z("grid h-full place-items-center text-dark-50", ii[i()], m(l) ? "border-y border-r-0 border-l border-dark-500" : "rounded-r-xl border border-l-0 border-dark-500"))]), L(e, n);
	};
	o(T, (e) => {
		t.appendIcon && e(E);
	});
	var D = r(T, 2), O = (e) => {
		var t = zi(), n = C(t);
		{
			let e = J(() => m(c) ? "mdi:eye-off-outline" : "mdi:eye-outline");
			X(n, {
				get icon() {
					return m(e);
				},
				get class() {
					return ri[i()];
				}
			});
		}
		_(t), x((e) => {
			Y(t, 1, e), K(t, "aria-label", m(c) ? "Hide password" : "Show password"), K(t, "aria-pressed", m(c));
		}, [() => A(Z("grid h-full place-items-center rounded-r-xl border border-dark-500 border-l-dark-600 bg-dark-700 text-dark-50", ii[i()]))]), I("click", t, () => G(c, !m(c))), L(e, t);
	};
	o(D, (e) => {
		m(l) && e(O);
	}), _(g);
	var k = r(g, 2), P = (e) => {
		var n = Bi(), r = C(n, !0);
		_(n), x(() => U(r, t.error)), L(e, n);
	};
	o(k, (e) => {
		t.error && e(P);
	}), _(f), x((e, t) => {
		Y(f, 1, e), Y(g, 1, t);
	}, [() => A(Z("relative grid w-full gap-2")), () => A(Z("relative flex w-full items-center rounded-xl", "has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500", t.class))]), L(e, f), y();
}
V(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-file-path.svelte
var Ui = W("<div class=\"grid gap-2\"><div class=\"flex items-end gap-2\"><div class=\"min-w-0 flex-1\"><!></div> <!></div></div>");
function Wi(e, t) {
	s(t, !0);
	let n = N(t, "value", 3, ""), i = N(t, "browseLabel", 3, "Browse"), a = N(t, "emptyFileLabel", 3, "No file selected"), o = N(t, "emptyFolderLabel", 3, "No folder selected"), c = j(!1);
	async function l() {
		if (!m(c)) {
			G(c, !0);
			try {
				let e = await t.onBrowse();
				if (!e) return;
				t.onValueChange?.(e);
			} finally {
				G(c, !1);
			}
		}
	}
	var u = Ui(), d = C(u), f = C(d), p = C(f);
	{
		let e = J(() => t.placeholder ?? (t.mode === "folder" ? o() : a()));
		Hi(p, {
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
	_(f), ct(r(f, 2), {
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
			w();
			var n = M();
			x(() => U(n, i())), L(e, n);
		},
		$$slots: { default: !0 }
	}), _(d), _(u), L(e, u), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-key-value-list.svelte
var Gi = W("<div class=\"grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] items-center gap-2\"><!> <!> <!></div>"), Ki = W("<p class=\"text-sm text-destructive-50\"> </p>"), qi = W("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function Ji(e, t) {
	s(t, !0);
	let n = N(t, "entries", 31, () => ee([])), i = N(t, "keyPlaceholder", 3, "KEY"), a = N(t, "valuePlaceholder", 3, "value"), c = N(t, "id", 19, Ze), u = N(t, "addLabel", 3, "Add"), d = N(t, "removeLabel", 3, "Remove"), f = j(ee([]));
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
		G(f, m(f).map((n) => n.id === e ? {
			...n,
			...t
		} : n), !0), h();
	}
	function v(e) {
		G(f, m(f).filter((t) => t.id !== e), !0), h();
	}
	function S() {
		G(f, [...m(f), {
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
		e.length === t.length && e.every((e, n) => e.key === t[n]?.key && e.value === t[n]?.value) || G(f, p(e), !0);
	});
	var T = qi(), E = C(T), D = (e) => {
		{
			let n = J(() => `${c()}-label`);
			Kn(e, {
				get id() {
					return m(n);
				},
				children: (e, n) => {
					w();
					var r = M();
					x(() => U(r, t.label)), L(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	o(E, (e) => {
		t.label && e(D);
	});
	var O = r(E, 2), k = C(O);
	b(k, 17, () => m(f), (e) => e.id, (e, t) => {
		var n = Gi(), o = C(n);
		{
			let e = J(() => `${c()}-${m(t).id}-key`);
			Hi(o, {
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
			let e = J(() => `${c()}-${m(t).id}-value`);
			Hi(s, {
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
		ct(r(s, 2), {
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
		}), _(n), L(e, n);
	}), ct(r(k, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: S,
		children: (e, t) => {
			w();
			var n = M();
			x(() => U(n, u())), L(e, n);
		},
		$$slots: { default: !0 }
	}), _(O);
	var P = r(O, 2), F = (e) => {
		var n = Ki(), r = C(n, !0);
		_(n), x(() => U(r, t.error)), L(e, n);
	};
	o(P, (e) => {
		t.error && e(F);
	}), _(T), x((e) => {
		Y(T, 1, e), K(T, "aria-labelledby", t.label ? `${c()}-label` : void 0);
	}, [() => A(Z("grid w-full gap-2", t.class))]), L(e, T), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-one-of.svelte
var Yi = W("<span class=\"text-red-400\" aria-hidden=\"true\">*</span>"), Xi = W(" <!>", 1), Zi = W("<button type=\"button\" role=\"tab\"> </button>"), Qi = W("<p class=\"text-sm text-red-400\"> </p>"), $i = W("<div><!> <div role=\"tablist\"></div> <div role=\"tabpanel\"><!></div> <!></div>");
function ea(e, t) {
	s(t, !0);
	let n = N(t, "value", 31, () => ee({
		variant: "",
		values: {}
	})), i = J(() => n().variant || t.variants[0]?.id || "");
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
	var l = $i(), u = C(l), f = (e) => {
		Kn(e, {
			children: (e, n) => {
				w();
				var i = Xi(), a = g(i), s = r(a), c = (e) => {
					L(e, Yi());
				};
				o(s, (e) => {
					t.required && e(c);
				}), x(() => U(a, `${t.label ?? ""} `)), L(e, i);
			},
			$$slots: { default: !0 }
		});
	};
	o(u, (e) => {
		t.label && e(f);
	});
	var p = r(u, 2);
	b(p, 21, () => t.variants, (e) => e.id, (e, t) => {
		var n = Zi(), r = C(n, !0);
		_(n), x((e) => {
			K(n, "id", `tab-${m(t).id}`), K(n, "aria-selected", m(i) === m(t).id), K(n, "aria-controls", `panel-${m(t).id}`), Y(n, 1, e), U(r, m(t).label);
		}, [() => A(Z("rounded-lg px-3 py-1.5 text-sm font-medium transition-colors", m(i) === m(t).id ? "bg-dark-700 text-dark-50" : "text-dark-200 hover:bg-dark-800 hover:text-dark-50"))]), I("click", n, () => a(m(t).id)), L(e, n);
	}), _(p);
	var h = r(p, 2);
	d(C(h), () => t.panel, () => ({
		variantId: m(i),
		value: n().values[m(i)],
		setValue: (e) => c(m(i), e)
	})), _(h);
	var v = r(h, 2), S = (e) => {
		var n = Qi(), r = C(n, !0);
		_(n), x(() => U(r, t.error)), L(e, n);
	};
	o(v, (e) => {
		t.error && e(S);
	}), _(l), x((e, n) => {
		Y(l, 1, e), Y(p, 1, n), K(p, "aria-label", t.label), K(h, "id", `panel-${m(i)}`), K(h, "aria-labelledby", `tab-${m(i)}`);
	}, [() => A(Z("grid w-full gap-2")), () => A(Z("inline-flex w-fit rounded-xl border border-dark-700 bg-dark-900 p-1", t.error && "border-red-500"))]), L(e, l), y();
}
V(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-select-text.svelte
var ta = new Set([
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
]), na = W("<!> <!>", 1), ra = W("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), ia = W(" <!>", 1), aa = W("<!> <!> <!>", 1), oa = W("<div class=\"flex flex-wrap gap-1.5\"></div>"), sa = W("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), ca = W("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), la = W("<p class=\"text-sm text-red-400\"> </p>"), ua = W("<div><!> <div><!> <input/></div> <!> <!> <!></div>");
function da(e, t) {
	s(t, !0);
	let n = N(t, "variables", 19, () => []), a = N(t, "id", 19, Ze), c = N(t, "value", 31, () => ee({
		type: "",
		value: ""
	})), l = q(t, ta), u = J(() => t.selectPlaceholder ?? "Select"), d = J(() => t.loadingPlaceholder ?? "Loading..."), p = ai(() => t.items), v = j(null), S = j(!1), T = j(""), E = j(0), D = J(() => {
		if (!m(T)) return n();
		let e = m(T).toLowerCase();
		return n().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function k() {
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
		let e = k();
		if (!e || n().length === 0) {
			G(S, !1), G(T, ""), G(E, 0);
			return;
		}
		G(T, e.partial, !0), G(S, m(D).length > 0), G(E, 0);
	}
	function F(e) {
		let t = k();
		if (!t || !m(v)) return;
		let n = c().value, r = m(v).selectionStart ?? n.length, i = n.slice(0, t.start), a = n.slice(r);
		c({
			...c(),
			value: `${i}{${e}}${a}`
		}), G(S, !1), G(T, ""), queueMicrotask(() => {
			if (!m(v)) return;
			let t = i.length + e.length + 2;
			m(v).focus(), m(v).setSelectionRange(t, t);
		});
	}
	function z(e) {
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
	}, H = (e) => {
		if (!(!m(S) || m(D).length === 0)) {
			if (e.key === "ArrowDown") {
				e.preventDefault(), G(E, (m(E) + 1) % m(D).length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault(), G(E, (m(E) - 1 + m(D).length) % m(D).length);
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				let t = m(D)[m(E)];
				t && (e.preventDefault(), F(t.key));
				return;
			}
			e.key === "Escape" && G(S, !1);
		}
	}, te = () => {
		setTimeout(() => {
			G(S, !1);
		}, 120);
	};
	var W = ua(), ne = C(W), re = (e) => {
		Kn(e, {
			get for() {
				return a();
			},
			children: (e, n) => {
				w();
				var r = M();
				x(() => U(r, t.label)), L(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	o(ne, (e) => {
		t.label && e(re);
	});
	var ie = r(ne, 2), ae = C(ie);
	i(ae, () => Tn, (e, n) => {
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
				var a = na(), s = g(a);
				{
					let e = J(() => Z("flex shrink-0 cursor-pointer items-center justify-between gap-2 rounded-l-xl border border-r-0 bg-dark-700 text-dark-50 outline-none", ni.md, t.error ? "border-red-500" : "border-dark-500", t.selectClass));
					i(s, () => jn, (t, n) => {
						n(t, {
							get class() {
								return m(e);
							},
							children: (e, t) => {
								var n = na(), a = g(n);
								{
									let e = J(() => p.loading ? m(d) : m(u));
									i(a, () => On, (t, n) => {
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
								}), L(e, n);
							},
							$$slots: { default: !0 }
						});
					});
				}
				i(r(s, 2), () => nt, (e, n) => {
					n(e, {
						children: (e, n) => {
							var a = O(), s = g(a);
							{
								let e = J(() => t.contentProps?.sideOffset ?? 4), n = J(() => Z("z-50 max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", t.contentProps?.class));
								i(s, () => en, (a, s) => {
									s(a, B(() => t.contentProps, {
										get sideOffset() {
											return m(e);
										},
										get class() {
											return m(n);
										},
										children: (e, t) => {
											var n = aa(), a = g(n);
											i(a, () => vn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														X(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = r(a, 2);
											i(s, () => un, (e, t) => {
												t(e, {
													children: (e, t) => {
														var n = O(), a = g(n), s = (e) => {
															var t = ra(), n = C(t, !0);
															_(t), x(() => U(n, m(d))), L(e, t);
														}, c = (e) => {
															var t = O();
															b(g(t), 17, () => p.items, ({ value: e, label: t, disabled: n }) => e, (e, t) => {
																let n = () => m(t).value, a = () => m(t).label, s = () => m(t).disabled;
																var c = O(), l = g(c);
																{
																	let e = (e, t) => {
																		let n = () => t?.().selected;
																		w();
																		var i = ia(), s = g(i), c = r(s), l = (e) => {
																			X(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		o(c, (e) => {
																			n() && e(l);
																		}), x(() => U(s, `${a() ?? ""} `)), L(e, i);
																	}, t = J(() => Z("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	i(l, () => on, (r, i) => {
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
																L(e, c);
															}), L(e, t);
														};
														o(a, (e) => {
															p.loading ? e(s) : e(c, -1);
														}), L(e, n);
													},
													$$slots: { default: !0 }
												});
											}), i(r(s, 2), () => mn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														X(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), L(e, n);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							L(e, a);
						},
						$$slots: { default: !0 }
					});
				}), L(e, a);
			},
			$$slots: { default: !0 }
		});
	});
	var oe = r(ae, 2);
	R(oe, (e) => ({
		id: a(),
		placeholder: t.placeholder,
		class: e,
		"aria-invalid": t.error ? !0 : void 0,
		oninput: n().length > 0 ? V : void 0,
		onkeydown: n().length > 0 ? H : void 0,
		onblur: n().length > 0 ? te : void 0,
		onfocus: n().length > 0 ? P : void 0,
		onclick: n().length > 0 ? P : void 0,
		...l
	}), [() => Z("w-full rounded-r-xl border bg-dark-700 text-dark-50 outline-none", ni.md, t.error ? "border-red-500" : "border-dark-500")], void 0, void 0, void 0, !0), f(oe, (e) => G(v, e), () => m(v)), _(ie);
	var Q = r(ie, 2), se = (e) => {
		var t = oa();
		b(t, 21, n, (e) => e.key, (e, t) => {
			ct(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return m(t).label;
				},
				onclick: () => z(m(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					w();
					var r = M();
					x(() => U(r, `{${m(t).key}}`)), L(e, r);
				},
				$$slots: { default: !0 }
			});
		}), _(t), L(e, t);
	};
	o(Q, (e) => {
		n().length > 0 && e(se);
	});
	var ce = r(Q, 2), le = (e) => {
		var t = ca();
		b(t, 23, () => m(D), (e) => e.key, (e, t, n) => {
			var i = sa(), a = C(i), o = C(a), s = C(o, !0);
			_(o);
			var c = r(o, 2), l = C(c, !0);
			_(c), _(a), _(i), x((e) => {
				K(a, "aria-selected", m(n) === m(E)), Y(a, 1, e), U(s, `{${m(t).key}}`), U(l, m(t).label);
			}, [() => A(Z("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", m(n) === m(E) && "bg-dark-700"))]), I("mousedown", a, (e) => {
				e.preventDefault(), F(m(t).key);
			}), L(e, i);
		}), _(t), L(e, t);
	};
	o(ce, (e) => {
		m(S) && m(D).length > 0 && e(le);
	});
	var ue = r(ce, 2), de = (e) => {
		var n = la(), r = C(n, !0);
		_(n), x(() => U(r, t.error)), L(e, n);
	};
	o(ue, (e) => {
		t.error && e(de);
	}), _(W), x((e, t) => {
		Y(W, 1, e), Y(ie, 1, t);
	}, [() => A(Z("relative grid w-full gap-2", t.class)), () => A(Z("flex w-full items-stretch rounded-xl has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500"))]), h(oe, () => c().value, (e) => c(c().value = e, !0)), L(e, W), y();
}
V(["mousedown"]);
//#endregion
//#region ../ui/src/lib/components/input/input-slider.svelte
var fa = W("<div class=\"flex items-center justify-between gap-4\"><!> <span class=\"text-sm text-dark-100\"> </span></div>"), pa = W("<p class=\"text-sm text-red-500\"> </p>"), ma = W("<div><!> <input type=\"range\"/> <!></div>");
function ha(e, t) {
	s(t, !0);
	let n = N(t, "id", 19, Ze), i = N(t, "min", 3, 0), a = N(t, "max", 3, 100), c = N(t, "step", 3, 1), l = N(t, "value", 15, 0);
	var u = ma(), d = C(u), f = (e) => {
		var i = fa(), a = C(i);
		Kn(a, {
			get for() {
				return n();
			},
			children: (e, n) => {
				w();
				var r = M();
				x(() => U(r, t.label)), L(e, r);
			},
			$$slots: { default: !0 }
		});
		var o = r(a, 2), s = C(o);
		_(o), _(i), x(() => U(s, `${l() ?? ""}%`)), L(e, i);
	};
	o(d, (e) => {
		t.label && e(f);
	});
	var p = r(d, 2);
	k(p);
	var m = r(p, 2), g = (e) => {
		var n = pa(), r = C(n, !0);
		_(n), x(() => U(r, t.error)), L(e, n);
	};
	o(m, (e) => {
		t.error && e(g);
	}), _(u), x((e, t) => {
		Y(u, 1, e), K(p, "id", n()), K(p, "min", i()), K(p, "max", a()), K(p, "step", c()), Y(p, 1, t);
	}, [() => A(Z("grid w-full gap-2")), () => A(Z("h-2 w-full cursor-pointer appearance-none rounded-full bg-dark-600 accent-primary", t.error && "ring-1 ring-red-500"))]), I("input", p, () => t.onvaluechange?.(l())), h(p, l), L(e, u), y();
}
V(["input"]);
//#endregion
//#region ../ui/src/lib/components/input/input-switch.svelte
var ga = W("<p class=\"text-sm text-red-400\"> </p>"), _a = W("<div><div class=\"flex items-center gap-3\"><!> <!></div> <!></div>");
function va(e, t) {
	s(t, !0);
	let n = N(t, "checked", 15, !1), a = N(t, "id", 19, Ze);
	var c = _a(), l = C(c), u = C(l);
	{
		let e = J(() => t.label ? `${a()}-label` : void 0), r = J(() => t.error ? !0 : void 0), o = J(() => Z("inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors outline-none", "data-[state=checked]:bg-primary/15", t.error ? "data-[state=unchecked]:bg-red-500/30" : "data-[state=unchecked]:bg-dark-600", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-800", "disabled:cursor-not-allowed disabled:opacity-50"));
		i(u, () => Vn, (t, s) => {
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
					var n = O(), r = g(n);
					{
						let e = J(() => Z("pointer-events-none block size-5 shrink-0 rounded-full bg-white transition-transform", "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0", "data-[state=checked]:bg-primary"));
						i(r, () => Wn, (t, n) => {
							n(t, { get class() {
								return m(e);
							} });
						});
					}
					L(e, n);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var d = r(u, 2), f = (e) => {
		Kn(e, {
			get id() {
				return `${a() ?? ""}-label`;
			},
			get for() {
				return a();
			},
			class: "cursor-pointer",
			children: (e, n) => {
				w();
				var r = M();
				x(() => U(r, t.label)), L(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	o(d, (e) => {
		t.label && e(f);
	}), _(l);
	var p = r(l, 2), h = (e) => {
		var n = ga(), r = C(n, !0);
		_(n), x(() => U(r, t.error)), L(e, n);
	};
	o(p, (e) => {
		t.error && e(h);
	}), _(c), x((e) => Y(c, 1, e), [() => A(Z("grid gap-2", t.class))]), L(e, c), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-list.svelte
var ya = W("<div class=\"flex items-center gap-2\"><!> <!></div>"), ba = W("<p class=\"text-sm text-destructive-50\"> </p>"), xa = W("<div role=\"group\"><!> <div class=\"grid gap-2\"><!> <!></div> <!></div>");
function Sa(e, t) {
	s(t, !0);
	let n = N(t, "values", 31, () => ee([])), i = N(t, "id", 19, Ze), a = N(t, "addLabel", 3, "Add"), c = N(t, "removeLabel", 3, "Remove"), u = j(ee([]));
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
		G(u, m(u).map((n) => n.id === e ? {
			...n,
			value: t
		} : n), !0), f();
	}
	function h(e) {
		G(u, m(u).filter((t) => t.id !== e), !0), f();
	}
	function g() {
		G(u, [...m(u), {
			id: crypto.randomUUID(),
			value: ""
		}], !0), f();
	}
	l(() => {
		let e = n(), t = m(u).map((e) => e.value);
		e.length === t.length && e.every((e, n) => e === t[n]) || G(u, d(e), !0);
	});
	var v = xa(), S = C(v), T = (e) => {
		{
			let n = J(() => `${i()}-label`);
			Kn(e, {
				get id() {
					return m(n);
				},
				children: (e, n) => {
					w();
					var r = M();
					x(() => U(r, t.label)), L(e, r);
				},
				$$slots: { default: !0 }
			});
		}
	};
	o(S, (e) => {
		t.label && e(T);
	});
	var E = r(S, 2), D = C(E);
	b(D, 17, () => m(u), (e) => e.id, (e, n) => {
		var a = ya(), o = C(a);
		{
			let e = J(() => `${i()}-${m(n).id}`);
			Hi(o, {
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
		ct(r(o, 2), {
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
		}), _(a), L(e, a);
	}), ct(r(D, 2), {
		variant: "ghost",
		size: "sm",
		type: "button",
		icon: "ri:add-line",
		onclick: g,
		children: (e, t) => {
			w();
			var n = M();
			x(() => U(n, a())), L(e, n);
		},
		$$slots: { default: !0 }
	}), _(E);
	var O = r(E, 2), k = (e) => {
		var n = ba(), r = C(n, !0);
		_(n), x(() => U(r, t.error)), L(e, n);
	};
	o(O, (e) => {
		t.error && e(k);
	}), _(v), x((e) => {
		Y(v, 1, e), K(v, "aria-labelledby", t.label ? `${i()}-label` : void 0);
	}, [() => A(Z("grid w-full gap-2", t.class))]), L(e, v), y();
}
//#endregion
//#region ../ui/src/lib/components/input/input-text-select.svelte
var Ca = (e, t = H) => {
	let n = J(() => t().value), a = J(() => t().label), s = J(() => t().disabled);
	var c = O(), l = g(c);
	{
		let e = (e, t) => {
			let n = () => t?.().selected;
			w();
			var i = Ta(), s = g(i), c = r(s), l = (e) => {
				X(e, {
					icon: "ri:check-line",
					class: "size-5 text-primary"
				});
			};
			o(c, (e) => {
				n() && e(l);
			}), x(() => U(s, `${m(a) ?? ""} `)), L(e, i);
		}, t = J(() => Z("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
		i(l, () => on, (r, i) => {
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
	L(e, c);
}, wa = new Set([
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
]), Ta = W(" <!>", 1), Ea = W("<span class=\"text-red-400\">*</span>"), Da = W("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), Oa = W("<div class=\"px-3 py-1.5 text-sm text-dark-300\"></div>"), ka = W("<!> <!> <!>", 1), Aa = W("<div><!> <button type=\"button\" aria-haspopup=\"listbox\"><!></button></div> <!>", 1), ja = W("<p class=\"text-sm text-red-400\"> </p>"), Ma = W("<div><!> <!> <!></div>");
function Na(e, t) {
	s(t, !0);
	let n = N(t, "allowCustomValue", 3, !0), c = N(t, "id", 19, Ze), l = N(t, "value", 15, ""), d = q(t, wa), f = J(() => t.placeholder), p = J(() => t.loadingPlaceholder ?? "Loading..."), h = J(() => t.selectAriaLabel ?? "Select value"), v = j(!1), b = j(""), S = j(!1), T = new fi(), E = ai(() => t.items, () => t.reloadKey?.()), D = new Xr(() => m(b), 100), k = J(() => new Map(E.items.map((e) => [e.value, e]))), M = J(() => m(k).get(l())), P = J(() => m(M)?.value ?? ""), F = J(() => {
		if (E.loading) return [];
		let e = D.current.trim();
		return e ? oi(E.items, e) : E.items;
	}), R = J(() => m(M) && !m(F).some((e) => e.value === m(M).value) ? [m(M), ...m(F)] : m(F));
	function z() {
		m(S) || G(b, m(M)?.label ?? (n() ? l() : ""), !0);
	}
	a(() => {
		l(), m(M)?.label, z();
	}), a(() => {
		D.current, m(v) && T.resetScroll();
	});
	function V() {
		G(v, m(F).length > 0 || E.items.length > 0, !0);
	}
	function H(e) {
		G(b, e.currentTarget.value, !0), G(S, !0), n() && l(m(b)), V();
	}
	function ee() {
		G(v, !0);
	}
	function te() {
		G(S, !1), z();
	}
	async function W(e) {
		if (G(v, e, !0), !e) {
			G(S, !1), T.resetScroll(), z();
			return;
		}
		await u(), T.scrollToValue(m(F), l());
	}
	function ne() {
		G(v, !0);
	}
	let re = J(() => Je(d, {
		id: c(),
		placeholder: E.loading ? m(p) : m(f),
		autocomplete: "off",
		class: Z("w-full rounded-l-xl border border-r-0 bg-dark-700 text-dark-50 outline-none", ni.md, t.error ? "border-red-500" : "border-dark-500"),
		"aria-invalid": t.error ? !0 : void 0,
		oninput: H,
		onfocus: ee,
		onblur: te
	}));
	var ie = Ma(), ae = C(ie), oe = (e) => {
		Kn(e, {
			get for() {
				return c();
			},
			children: (e, n) => {
				w();
				var i = Ta(), a = g(i), s = r(a), c = (e) => {
					L(e, Ea());
				};
				o(s, (e) => {
					t.required && e(c);
				}), x(() => U(a, `${t.label ?? ""} `)), L(e, i);
			},
			$$slots: { default: !0 }
		});
	};
	o(ae, (e) => {
		t.label && e(oe);
	});
	var Q = r(ae, 2);
	{
		let e = J(() => !!t.disabled);
		i(Q, () => Jt, (n, a) => {
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
					e && (l(e), G(S, !1), G(v, !1), z());
				},
				onOpenChange: W,
				get disabled() {
					return m(e);
				},
				get open() {
					return m(v);
				},
				set open(e) {
					G(v, e, !0);
				},
				children: (e, n) => {
					var a = Aa(), s = g(a), c = C(s);
					i(c, () => Zt, (e, t) => {
						t(e, B(() => m(re)));
					});
					var l = r(c, 2);
					X(C(l), {
						icon: "ri:expand-up-down-line",
						class: "size-5 shrink-0 text-dark-300"
					}), _(l), _(s), i(r(s, 2), () => nt, (e, n) => {
						n(e, {
							children: (e, n) => {
								var a = O(), s = g(a);
								{
									let e = J(() => t.contentProps?.sideOffset ?? 4), n = J(() => Z("z-50 max-h-84 min-w-(--bits-combobox-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", t.contentProps?.class));
									i(s, () => en, (a, s) => {
										s(a, B(() => t.contentProps, {
											get sideOffset() {
												return m(e);
											},
											get class() {
												return m(n);
											},
											children: (e, t) => {
												var n = ka(), a = g(n);
												i(a, () => vn, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															X(e, { icon: "ri:arrow-up-s-line" });
														},
														$$slots: { default: !0 }
													});
												});
												var s = r(a, 2);
												i(s, () => un, (e, t) => {
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
															var n = O(), r = g(n), i = (e) => {
																var t = Da(), n = C(t, !0);
																_(t), x(() => U(n, m(p))), L(e, t);
															}, a = (e) => {
																mi(e, {
																	get items() {
																		return m(F);
																	},
																	get scrollTop() {
																		return T.scrollTop;
																	},
																	get item() {
																		return Ca;
																	}
																});
															}, s = (e) => {
																var t = Oa();
																t.textContent = "No matches found", L(e, t);
															};
															o(r, (e) => {
																E.loading ? e(i) : m(F).length > 0 ? e(a, 1) : e(s, -1);
															}), L(e, n);
														},
														$$slots: { default: !0 }
													});
												}), i(r(s, 2), () => mn, (e, t) => {
													t(e, {
														class: "flex w-full items-center justify-center py-1 text-dark-300",
														children: (e, t) => {
															X(e, { icon: "ri:arrow-down-s-line" });
														},
														$$slots: { default: !0 }
													});
												}), L(e, n);
											},
											$$slots: { default: !0 }
										}));
									});
								}
								L(e, a);
							},
							$$slots: { default: !0 }
						});
					}), x((e, n) => {
						Y(s, 1, e), K(l, "aria-label", m(h)), K(l, "aria-expanded", m(v)), l.disabled = !!t.disabled, Y(l, 1, n);
					}, [() => A(Z("flex w-full items-stretch rounded-xl has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500")), () => A(Z("flex shrink-0 cursor-pointer items-center justify-center rounded-r-xl border bg-dark-700 text-dark-50 outline-none", ni.md, t.error ? "border-red-500" : "border-dark-500", t.selectClass))]), I("click", l, ne), L(e, a);
				},
				$$slots: { default: !0 }
			});
		});
	}
	var se = r(Q, 2), ce = (e) => {
		var n = ja(), r = C(n, !0);
		_(n), x(() => U(r, t.error)), L(e, n);
	};
	o(se, (e) => {
		t.error && e(ce);
	}), _(ie), x((e) => Y(ie, 1, e), [() => A(Z("relative grid w-full gap-2", t.class))]), L(e, ie), y();
}
V(["click"]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-select-text.svelte
var Pa = new Set([
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
]), Fa = W("<!> <!>", 1), Ia = W("<div class=\"px-3 py-1.5 text-sm text-dark-300\"> </div>"), La = W(" <!>", 1), Ra = W("<!> <!> <!>", 1), za = W("<div aria-hidden=\"true\">—</div>"), Ba = W("<input/>"), Va = W("<div class=\"flex shrink-0 items-center self-center\"><!></div>"), Ha = W("<div class=\"flex flex-wrap gap-1.5\"></div>"), Ua = W("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), Wa = W("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), Ga = W("<p class=\"text-sm text-red-400\"> </p>"), Ka = W("<div><!> <div class=\"flex items-center gap-3\"><div><input/> <!> <!></div> <!></div> <!> <!> <!></div>");
function qa(e, t) {
	s(t, !0);
	let n = N(t, "variables", 19, () => []), a = N(t, "valuelessOperators", 19, () => []), c = N(t, "id", 19, Ze), l = N(t, "value", 31, () => ee({
		path: "",
		type: "equals",
		value: ""
	})), u = q(t, Pa), p = J(() => t.selectPlaceholder ?? "Select"), v = J(() => t.loadingPlaceholder ?? "Loading..."), S = ai(() => t.items), T = j(null), E = j(null), P = j("path"), z = j(!1), V = j(""), H = j(0), te = J(() => {
		if (!m(V)) return n();
		let e = m(V).toLowerCase();
		return n().filter((t) => t.key.toLowerCase().includes(e) || t.label.toLowerCase().includes(e));
	});
	function W(e) {
		return m(e === "path" ? T : E);
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
		let t = W(e);
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
		G(P, e, !0);
		let t = ie(e);
		if (!t || n().length === 0) {
			G(z, !1), G(V, ""), G(H, 0);
			return;
		}
		G(V, t.partial, !0), G(z, m(te).length > 0), G(H, 0);
	}
	function oe(e, t = m(P)) {
		let n = ie(t), r = W(t);
		if (!n || !r) return;
		let i = ne(t), a = r.selectionStart ?? i.length, o = i.slice(0, n.start);
		re(t, `${o}{${e}}${i.slice(a)}`), G(z, !1), G(V, ""), queueMicrotask(() => {
			if (!r) return;
			let t = o.length + e.length + 2;
			r.focus(), r.setSelectionRange(t, t);
		});
	}
	function Q(e, t = m(P)) {
		let n = ne(t), r = W(t);
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
			if (!(!m(z) || m(te).length === 0 || m(P) !== e)) {
				if (t.key === "ArrowDown") {
					t.preventDefault(), G(H, (m(H) + 1) % m(te).length);
					return;
				}
				if (t.key === "ArrowUp") {
					t.preventDefault(), G(H, (m(H) - 1 + m(te).length) % m(te).length);
					return;
				}
				if (t.key === "Enter" || t.key === "Tab") {
					let n = m(te)[m(H)];
					n && (t.preventDefault(), oe(n.key, e));
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
	D(() => {
		ce && clearTimeout(ce);
	});
	let le = se("path"), ue = se("value"), de = J(() => t.error ? "border-red-500" : "border-dark-500"), fe = J(() => a().includes(l().type));
	var pe = Ka(), me = C(pe), he = (e) => {
		Kn(e, {
			get for() {
				return c();
			},
			children: (e, n) => {
				w();
				var r = M();
				x(() => U(r, t.label)), L(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	o(me, (e) => {
		t.label && e(he);
	});
	var ge = r(me, 2), _e = C(ge), ve = C(_e);
	R(ve, (e) => ({
		id: c(),
		placeholder: t.pathPlaceholder,
		class: e,
		"aria-invalid": t.error ? !0 : void 0,
		role: n().length > 0 ? "combobox" : void 0,
		"aria-autocomplete": n().length > 0 ? "list" : void 0,
		"aria-expanded": n().length > 0 ? m(z) && m(P) === "path" && m(te).length > 0 : void 0,
		"aria-controls": n().length > 0 ? `${c()}-listbox` : void 0,
		"aria-activedescendant": m(z) && m(P) === "path" && m(te).length > 0 ? `${c()}-option-${m(H)}` : void 0,
		oninput: n().length > 0 ? le.handleInput : void 0,
		onkeydown: n().length > 0 ? le.handleKeydown : void 0,
		onblur: n().length > 0 ? le.handleBlur : void 0,
		onfocus: n().length > 0 ? () => ae("path") : void 0,
		onclick: n().length > 0 ? () => ae("path") : void 0,
		...u
	}), [() => Z("min-w-0 flex-1 border border-r bg-dark-700 text-dark-50 outline-none", "rounded-l-xl", ni.md, m(de))], void 0, void 0, void 0, !0), f(ve, (e) => G(T, e), () => m(T));
	var ye = r(ve, 2);
	i(ye, () => Tn, (e, n) => {
		n(e, {
			type: "single",
			get items() {
				return S.items;
			},
			get value() {
				return l().type;
			},
			set value(e) {
				l(l().type = e, !0);
			},
			children: (e, n) => {
				var a = Fa(), s = g(a);
				{
					let e = J(() => Z("flex shrink-0 cursor-pointer items-center justify-between gap-2 border border-x-0 bg-dark-700 text-dark-50 outline-none", ni.md, m(de), t.selectClass ?? "w-32"));
					i(s, () => jn, (t, n) => {
						n(t, {
							get class() {
								return m(e);
							},
							children: (e, t) => {
								var n = Fa(), a = g(n);
								{
									let e = J(() => S.loading ? m(v) : m(p));
									i(a, () => On, (t, n) => {
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
								}), L(e, n);
							},
							$$slots: { default: !0 }
						});
					});
				}
				i(r(s, 2), () => nt, (e, n) => {
					n(e, {
						children: (e, n) => {
							var a = O(), s = g(a);
							{
								let e = J(() => t.contentProps?.sideOffset ?? 4), n = J(() => Z("z-50 max-h-(--bits-select-content-available-height) min-w-(--bits-select-anchor-width)", "rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none", t.contentProps?.class));
								i(s, () => en, (a, s) => {
									s(a, B(() => t.contentProps, {
										get sideOffset() {
											return m(e);
										},
										get class() {
											return m(n);
										},
										children: (e, t) => {
											var n = Ra(), a = g(n);
											i(a, () => vn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														X(e, { icon: "ri:arrow-up-s-line" });
													},
													$$slots: { default: !0 }
												});
											});
											var s = r(a, 2);
											i(s, () => un, (e, t) => {
												t(e, {
													children: (e, t) => {
														var n = O(), a = g(n), s = (e) => {
															var t = Ia(), n = C(t, !0);
															_(t), x(() => U(n, m(v))), L(e, t);
														}, c = (e) => {
															var t = O();
															b(g(t), 17, () => S.items, ({ value: e, label: t, disabled: n }) => e, (e, t) => {
																let n = () => m(t).value, a = () => m(t).label, s = () => m(t).disabled;
																var c = O(), l = g(c);
																{
																	let e = (e, t) => {
																		let n = () => t?.().selected;
																		w();
																		var i = La(), s = g(i), c = r(s), l = (e) => {
																			X(e, {
																				icon: "ri:check-line",
																				class: "size-5 text-primary"
																			});
																		};
																		o(c, (e) => {
																			n() && e(l);
																		}), x(() => U(s, `${a() ?? ""} `)), L(e, i);
																	}, t = J(() => Z("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-dark-50 outline-none", "data-disabled:cursor-default data-disabled:opacity-50 data-highlighted:bg-dark-700"));
																	i(l, () => on, (r, i) => {
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
																L(e, c);
															}), L(e, t);
														};
														o(a, (e) => {
															S.loading ? e(s) : e(c, -1);
														}), L(e, n);
													},
													$$slots: { default: !0 }
												});
											}), i(r(s, 2), () => mn, (e, t) => {
												t(e, {
													class: "flex w-full items-center justify-center py-1 text-dark-300",
													children: (e, t) => {
														X(e, { icon: "ri:arrow-down-s-line" });
													},
													$$slots: { default: !0 }
												});
											}), L(e, n);
										},
										$$slots: { default: !0 }
									}));
								});
							}
							L(e, a);
						},
						$$slots: { default: !0 }
					});
				}), L(e, a);
			},
			$$slots: { default: !0 }
		});
	});
	var be = r(ye, 2), xe = (e) => {
		var t = za();
		x((e) => Y(t, 1, e), [() => A(Z("flex min-w-0 items-center rounded-r-xl border border-l-0 bg-dark-700 px-3 text-dark-500 select-none", ni.md, m(de)))]), L(e, t);
	}, Se = (e) => {
		var r = Ba();
		k(r), f(r, (e) => G(E, e), () => m(E)), x((e) => {
			K(r, "placeholder", t.valuePlaceholder), Y(r, 1, e), K(r, "aria-invalid", t.error ? !0 : void 0), K(r, "role", n().length > 0 ? "combobox" : void 0), K(r, "aria-autocomplete", n().length > 0 ? "list" : void 0), K(r, "aria-expanded", n().length > 0 ? m(z) && m(P) === "value" && m(te).length > 0 : void 0), K(r, "aria-controls", n().length > 0 ? `${c()}-listbox` : void 0), K(r, "aria-activedescendant", m(z) && m(P) === "value" && m(te).length > 0 ? `${c()}-option-${m(H)}` : void 0);
		}, [() => A(Z("min-w-0 flex-1 rounded-r-xl border bg-dark-700 text-dark-50 outline-none", ni.md, m(de)))]), I("input", r, function(...e) {
			(n().length > 0 ? ue.handleInput : void 0)?.apply(this, e);
		}), I("keydown", r, function(...e) {
			(n().length > 0 ? ue.handleKeydown : void 0)?.apply(this, e);
		}), F("blur", r, function(...e) {
			(n().length > 0 ? ue.handleBlur : void 0)?.apply(this, e);
		}), F("focus", r, function(...e) {
			(n().length > 0 ? () => ae("value") : void 0)?.apply(this, e);
		}), I("click", r, function(...e) {
			(n().length > 0 ? () => ae("value") : void 0)?.apply(this, e);
		}), h(r, () => l().value, (e) => l(l().value = e, !0)), L(e, r);
	};
	o(be, (e) => {
		m(fe) ? e(xe) : e(Se, -1);
	}), _(_e);
	var Ce = r(_e, 2), we = (e) => {
		var n = Va();
		d(C(n), () => t.suffix), _(n), L(e, n);
	};
	o(Ce, (e) => {
		t.suffix && e(we);
	}), _(ge);
	var Te = r(ge, 2), Ee = (e) => {
		var t = Ha();
		b(t, 21, n, (e) => e.key, (e, t) => {
			ct(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return m(t).label;
				},
				onclick: () => Q(m(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					w();
					var r = M();
					x(() => U(r, `{${m(t).key}}`)), L(e, r);
				},
				$$slots: { default: !0 }
			});
		}), _(t), L(e, t);
	};
	o(Te, (e) => {
		n().length > 0 && e(Ee);
	});
	var De = r(Te, 2), Oe = (e) => {
		var t = Wa();
		b(t, 23, () => m(te), (e) => e.key, (e, t, n) => {
			var i = Ua(), a = C(i), o = C(a), s = C(o, !0);
			_(o);
			var l = r(o, 2), u = C(l, !0);
			_(l), _(a), _(i), x((e) => {
				K(a, "id", `${c()}-option-${m(n)}`), K(a, "aria-selected", m(n) === m(H)), Y(a, 1, e), U(s, `{${m(t).key}}`), U(u, m(t).label);
			}, [() => A(Z("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", m(n) === m(H) && "bg-dark-700"))]), I("mousedown", a, (e) => {
				e.preventDefault(), oe(m(t).key, m(P));
			}), L(e, i);
		}), _(t), x(() => K(t, "id", `${c()}-listbox`)), L(e, t);
	};
	o(De, (e) => {
		m(z) && m(te).length > 0 && e(Oe);
	});
	var ke = r(De, 2), Ae = (e) => {
		var n = Ga(), r = C(n, !0);
		_(n), x(() => U(r, t.error)), L(e, n);
	};
	o(ke, (e) => {
		t.error && e(Ae);
	}), _(pe), x((e, t) => {
		Y(pe, 1, e), Y(_e, 1, t);
	}, [() => A(Z("relative grid w-full gap-2", t.class)), () => A(Z("grid min-w-0 flex-1 grid-cols-[1fr_120px_1fr] rounded-xl has-focus:ring-2 has-focus:ring-primary", t.error && "has-focus:ring-red-500"))]), h(ve, () => l().path, (e) => l(l().path = e, !0)), L(e, pe), y();
}
V([
	"input",
	"keydown",
	"click",
	"mousedown"
]);
//#endregion
//#region ../ui/src/lib/components/input/input-text-variables.svelte
var Ja = new Set([
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
]), Ya = W("<div class=\"flex flex-wrap gap-1.5\"></div>"), Xa = W("<li role=\"presentation\"><button type=\"button\" role=\"option\"><span> </span> <span class=\"text-dark-300\"> </span></button></li>"), Za = W("<ul class=\"absolute top-[calc(100%-1.5rem)] z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-1 shadow-md\" role=\"listbox\"></ul>"), Qa = W("<p class=\"text-sm text-red-400\"> </p>"), $a = W("<div class=\"relative grid w-full gap-2\"><!> <div><input/></div> <!> <!> <!></div>");
function eo(e, t) {
	s(t, !0);
	let n = N(t, "variables", 19, () => []), i = N(t, "value", 15, ""), a = N(t, "id", 19, Ze), c = q(t, Ja), l = j(null), u = j(!1), d = j(""), p = j(0), g = J(() => {
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
	function S() {
		let e = v();
		if (!e || n().length === 0) {
			G(u, !1), G(d, ""), G(p, 0);
			return;
		}
		G(d, e.partial, !0), G(u, m(g).length > 0), G(p, 0);
	}
	function T(e) {
		let t = v();
		if (!t || !m(l)) return;
		let n = m(l).selectionStart ?? i().length, r = i().slice(0, t.start);
		i(`${r}{${e}}${i().slice(n)}`), G(u, !1), G(d, ""), queueMicrotask(() => {
			if (!m(l)) return;
			let t = r.length + e.length + 2;
			m(l).focus(), m(l).setSelectionRange(t, t);
		});
	}
	function E(e) {
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
		t.oninput?.(e), S();
	}, k = (e) => {
		if (!(!m(u) || m(g).length === 0)) {
			if (e.key === "ArrowDown") {
				e.preventDefault(), G(p, (m(p) + 1) % m(g).length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault(), G(p, (m(p) - 1 + m(g).length) % m(g).length);
				return;
			}
			if (e.key === "Enter" || e.key === "Tab") {
				let t = m(g)[m(p)];
				t && (e.preventDefault(), T(t.key));
				return;
			}
			e.key === "Escape" && G(u, !1);
		}
	}, P, F = () => {
		P && clearTimeout(P), P = setTimeout(() => {
			G(u, !1), P = void 0;
		}, 120);
	};
	D(() => {
		P && clearTimeout(P);
	});
	var z = $a(), B = C(z), V = (e) => {
		Kn(e, {
			get for() {
				return a();
			},
			children: (e, n) => {
				w();
				var r = M();
				x(() => U(r, t.label)), L(e, r);
			},
			$$slots: { default: !0 }
		});
	};
	o(B, (e) => {
		t.label && e(V);
	});
	var H = r(B, 2), ee = C(H);
	R(ee, (e) => ({
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
		onkeydown: k,
		onblur: F,
		onfocus: S,
		onclick: S,
		...c
	}), [() => Z("w-full rounded-xl border bg-dark-700 text-dark-50 outline-none", ni.md, t.error ? "border-red-500" : "border-dark-500")], void 0, void 0, void 0, !0), f(ee, (e) => G(l, e), () => m(l)), _(H);
	var te = r(H, 2), W = (e) => {
		var t = Ya();
		b(t, 21, n, (e) => e.key, (e, t) => {
			ct(e, {
				variant: "outline",
				size: "xs",
				get title() {
					return m(t).label;
				},
				onclick: () => E(m(t).key),
				class: "font-mono text-xs font-normal text-dark-200",
				children: (e, n) => {
					w();
					var r = M();
					x(() => U(r, `{${m(t).key}}`)), L(e, r);
				},
				$$slots: { default: !0 }
			});
		}), _(t), L(e, t);
	};
	o(te, (e) => {
		n().length > 0 && e(W);
	});
	var ne = r(te, 2), re = (e) => {
		var t = Za();
		b(t, 23, () => m(g), (e) => e.key, (e, t, n) => {
			var i = Xa(), o = C(i), s = C(o), c = C(s, !0);
			_(s);
			var l = r(s, 2), u = C(l, !0);
			_(l), _(o), _(i), x((e) => {
				K(o, "id", `${a()}-option-${m(n)}`), K(o, "aria-selected", m(n) === m(p)), Y(o, 1, e), U(c, `{${m(t).key}}`), U(u, m(t).label);
			}, [() => A(Z("flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50", m(n) === m(p) && "bg-dark-700"))]), I("mousedown", o, (e) => {
				e.preventDefault(), T(m(t).key);
			}), L(e, i);
		}), _(t), x(() => K(t, "id", `${a()}-listbox`)), L(e, t);
	};
	o(ne, (e) => {
		m(u) && m(g).length > 0 && e(re);
	});
	var ie = r(ne, 2), ae = (e) => {
		var n = Qa(), r = C(n, !0);
		_(n), x(() => U(r, t.error)), L(e, n);
	};
	o(ie, (e) => {
		t.error && e(ae);
	}), _(z), x((e) => Y(H, 1, e), [() => A(Z("relative flex w-full items-center rounded-xl", "has-focus-within:ring-2 has-focus-within:ring-primary", t.error && "has-focus-within:ring-red-500", t.class))]), h(ee, i), L(e, z), y();
}
V(["mousedown"]);
//#endregion
export { rr as _, va as a, ea as c, Hi as d, Ii as f, lr as g, Or as h, Sa as i, Ji as l, ai as m, qa as n, ha as o, Ti as p, Na as r, da as s, eo as t, Wi as u, Xn as v, Kn as y };
