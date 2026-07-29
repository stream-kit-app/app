import { $ as e, $n as t, At as n, Ct as r, G as i, Gn as a, Hr as o, Jr as s, Kn as c, On as l, Qn as u, Qr as d, Qt as f, Vr as p, Wn as m, Z as h, Zn as g, Zr as _, a as v, cn as y, cr as b, hn as x, jt as S, ln as C, mn as w, ni as T, nr as E, o as D, on as O, or as k, pr as A, s as j, un as M } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { t as N } from "./utils-DJt177zd.js";
import { C as P, D as F, d as I, g as L, n as R, o as ee, r as z, x as B } from "./animations-complete-DFBLw3EK.js";
import { a as te, i as V, n as H } from "./use-id-Dbt6eP9X.js";
import { a as ne, d as re, i as ie, o as ae, p as oe, r as se, s as ce, t as le, v as ue } from "./dom-CAV9qhsv.js";
import { t as de } from "./scroll-area-BdFM74vQ.js";
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_5a6ee2206b82415d6a6056cd255c701d/node_modules/svelte-toolbelt/dist/utils/sr-only-styles.js
var U = {
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
te(U);
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/command/utils.js
function fe(e, t) {
	let n = e.nextElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.nextElementSibling;
	}
}
function pe(e, t) {
	let n = e.previousElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.previousElementSibling;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/internal/css-escape.js
function me(e) {
	if (typeof CSS < "u" && typeof CSS.escape == "function") return CSS.escape(e);
	let t = e.length, n = -1, r, i = "", a = e.charCodeAt(0);
	if (t === 1 && a === 45) return "\\" + e;
	for (; ++n < t;) {
		if (r = e.charCodeAt(n), r === 0) {
			i += "�";
			continue;
		}
		if (r >= 1 && r <= 31 || r === 127 || n === 0 && r >= 48 && r <= 57 || n === 1 && r >= 48 && r <= 57 && a === 45) {
			i += "\\" + r.toString(16) + " ";
			continue;
		}
		if (r >= 128 || r === 45 || r === 95 || r >= 48 && r <= 57 || r >= 65 && r <= 90 || r >= 97 && r <= 122) {
			i += e.charAt(n);
			continue;
		}
		i += "\\" + e.charAt(n);
	}
	return i;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/command/command.svelte.js
var W = "data-value", G = ee({
	component: "command",
	parts: [
		"root",
		"list",
		"input",
		"separator",
		"loading",
		"empty",
		"group",
		"group-items",
		"group-heading",
		"item",
		"viewport",
		"input-label"
	]
}), K = G.selector("group"), q = G.selector("group-items"), he = G.selector("group-heading"), ge = G.selector("item"), J = `${G.selector("item")}:not([aria-disabled="true"])`, Y = new P("Command.Root"), _e = new P("Command.List"), X = new P("Command.Group"), ve = {
	search: "",
	value: "",
	filtered: {
		count: 0,
		items: /* @__PURE__ */ new Map(),
		groups: /* @__PURE__ */ new Set()
	}
}, ye = class e {
	static create(t) {
		return Y.set(new e(t));
	}
	opts;
	attachment;
	#e = !1;
	#t = !0;
	sortAfterTick = !1;
	sortAndFilterAfterTick = !1;
	allItems = /* @__PURE__ */ new Set();
	allGroups = /* @__PURE__ */ new Map();
	allIds = /* @__PURE__ */ new Map();
	#n = b(0);
	get key() {
		return l(this.#n);
	}
	set key(e) {
		k(this.#n, e, !0);
	}
	#r = b(null);
	get viewportNode() {
		return l(this.#r);
	}
	set viewportNode(e) {
		k(this.#r, e, !0);
	}
	#i = b(null);
	get inputNode() {
		return l(this.#i);
	}
	set inputNode(e) {
		k(this.#i, e, !0);
	}
	#a = b(null);
	get labelNode() {
		return l(this.#a);
	}
	set labelNode(e) {
		k(this.#a, e, !0);
	}
	#o = b(ve);
	get commandState() {
		return l(this.#o);
	}
	set commandState(e) {
		k(this.#o, e);
	}
	#s = b(E(ve));
	get _commandState() {
		return l(this.#s);
	}
	set _commandState(e) {
		k(this.#s, e, !0);
	}
	#c() {
		return s(this._commandState);
	}
	#l() {
		this.#e || (this.#e = !0, L(() => {
			this.#e = !1;
			let e = this.#c();
			Object.is(this.commandState, e) || (this.commandState = e, this.opts.onStateChange?.current?.(e));
		}));
	}
	setState(e, t, n) {
		Object.is(this._commandState[e], t) || (this._commandState[e] = t, e === "search" ? (this.#m(), this.#d()) : e === "value" && (n || this.#g()), this.#l());
	}
	constructor(e) {
		this.opts = e, this.attachment = I(this.opts.ref);
		let t = {
			...this._commandState,
			value: this.opts.value.current ?? ""
		};
		this._commandState = t, this.commandState = t, this.onkeydown = this.onkeydown.bind(this);
	}
	#u(e, t) {
		let n = this.opts.filter.current ?? At;
		return e ? n(e, this._commandState.search, t) : 0;
	}
	#d() {
		if (!this._commandState.search || this.opts.shouldFilter.current === !1) {
			!this._commandState.value || !this.#t ? this.#f() : this.#t && this._commandState.value && this.#p();
			return;
		}
		let e = this._commandState.filtered.items, t = [];
		for (let n of this._commandState.filtered.groups) {
			let r = this.allGroups.get(n), i = 0;
			if (!r) {
				t.push([n, i]);
				continue;
			}
			for (let t of r) {
				let n = e.get(t);
				i = Math.max(n ?? 0, i);
			}
			t.push([n, i]);
		}
		let n = this.viewportNode, r = this.getValidItems().sort((t, n) => {
			let r = t.getAttribute("data-value"), i = n.getAttribute("data-value"), a = e.get(r) ?? 0;
			return (e.get(i) ?? 0) - a;
		});
		for (let e of r) {
			let t = e.closest(q);
			if (t) {
				let n = e.parentElement === t ? e : e.closest(`${q} > *`);
				n && t.appendChild(n);
			} else {
				let t = e.parentElement === n ? e : e.closest(`${q} > *`);
				t && n?.appendChild(t);
			}
		}
		let i = t.sort((e, t) => t[1] - e[1]);
		for (let e of i) {
			let t = n?.querySelector(`${K}[${W}="${me(e[0])}"]`);
			t?.parentElement?.appendChild(t);
		}
		this.#f();
	}
	setValue(e, t) {
		e !== this.opts.value.current && e === "" && L(() => {
			this.key++;
		}), this.setState("value", e, t), this.opts.value.current = e;
	}
	#f() {
		L(() => {
			let e = this.getValidItems().find((e) => e.getAttribute("aria-disabled") !== "true")?.getAttribute(W), t = this.#t && this.opts.disableInitialScroll.current;
			this.setValue(e ?? "", t), this.#t = !1;
		});
	}
	#p() {
		L(() => {
			this.opts.disableInitialScroll.current || this.#g(), this.#t = !1;
		});
	}
	#m() {
		if (!this._commandState.search || this.opts.shouldFilter.current === !1) {
			this._commandState.filtered.count = this.allItems.size;
			return;
		}
		this._commandState.filtered.groups = /* @__PURE__ */ new Set();
		let e = 0;
		for (let t of this.allItems) {
			let n = this.allIds.get(t)?.value ?? "", r = this.allIds.get(t)?.keywords ?? [], i = this.#u(n, r);
			this._commandState.filtered.items.set(t, i), i > 0 && e++;
		}
		for (let [e, t] of this.allGroups) for (let n of t) {
			let t = this._commandState.filtered.items.get(n);
			if (t && t > 0) {
				this._commandState.filtered.groups.add(e);
				break;
			}
		}
		this._commandState.filtered.count = e;
	}
	getValidItems() {
		let e = this.opts.ref.current;
		return e ? Array.from(e.querySelectorAll(J)).filter((e) => !!e) : [];
	}
	getVisibleItems() {
		let e = this.opts.ref.current;
		return e ? Array.from(e.querySelectorAll(ge)).filter((e) => !!e) : [];
	}
	get itemsGrid() {
		if (!this.isGrid) return [];
		let e = this.opts.columns.current ?? 1, t = this.getVisibleItems(), n = [[]], r = t[0]?.getAttribute("data-group"), i = 0, a = 0;
		for (let o = 0; o < t.length; o++) {
			let s = t[o], c = s?.getAttribute("data-group");
			r === c ? (i++, i > e && (a++, i = 1, n.push([])), n[a]?.push({
				index: o,
				firstRowOfGroup: n[a]?.[0]?.firstRowOfGroup ?? o === 0,
				ref: s
			})) : (r = c, i = 1, a++, n.push([{
				index: o,
				firstRowOfGroup: !0,
				ref: s
			}]));
		}
		return n;
	}
	#h() {
		let e = this.opts.ref.current;
		if (!e) return;
		let t = e.querySelector(`${J}[data-selected]`);
		if (t) return t;
	}
	#g() {
		L(() => {
			let e = this.#h();
			if (!e) return;
			let t = e.parentElement?.parentElement;
			if (t) {
				if (this.isGrid) {
					let t = this.#_(e);
					if (e.scrollIntoView({ block: "nearest" }), t) {
						(e?.closest(K)?.querySelector(he))?.scrollIntoView({ block: "nearest" });
						return;
					}
				} else {
					let n = le(t);
					if (n && n.dataset?.value === e.dataset?.value) {
						(e?.closest(K)?.querySelector(he))?.scrollIntoView({ block: "nearest" });
						return;
					}
				}
				e.scrollIntoView({ block: "nearest" });
			}
		});
	}
	#_(e) {
		let t = this.itemsGrid;
		if (t.length === 0) return !1;
		for (let n = 0; n < t.length; n++) {
			let r = t[n];
			if (r !== void 0) for (let t = 0; t < r.length; t++) {
				let n = r[t];
				if (!(n === void 0 || n.ref !== e)) return n.firstRowOfGroup;
			}
		}
		return !1;
	}
	updateSelectedToIndex(e) {
		let t = this.getValidItems()[e];
		t && this.setValue(t.getAttribute(W) ?? "");
	}
	updateSelectedByItem(e) {
		let t = this.#h(), n = this.getValidItems(), r = n.findIndex((e) => e === t), i = n[r + e];
		this.opts.loop.current && (i = r + e < 0 ? n[n.length - 1] : r + e === n.length ? n[0] : n[r + e]), i && this.setValue(i.getAttribute(W) ?? "");
	}
	updateSelectedByGroup(e) {
		let t = this.#h()?.closest(K), n;
		for (; t && !n;) t = e > 0 ? fe(t, K) : pe(t, K), n = t?.querySelector(J);
		n ? this.setValue(n.getAttribute(W) ?? "") : this.updateSelectedByItem(e);
	}
	registerValue(e, t) {
		return e && e === this.allIds.get(e)?.value || this.allIds.set(e, {
			value: e,
			keywords: t
		}), this._commandState.filtered.items.set(e, this.#u(e, t)), this.sortAfterTick || (this.sortAfterTick = !0, L(() => {
			this.#d(), this.sortAfterTick = !1;
		})), () => {
			this.allIds.delete(e);
		};
	}
	registerItem(e, t) {
		return this.allItems.add(e), t && (this.allGroups.has(t) ? this.allGroups.get(t).add(e) : this.allGroups.set(t, new Set([e]))), this.sortAndFilterAfterTick || (this.sortAndFilterAfterTick = !0, L(() => {
			this.#m(), this.#d(), this.sortAndFilterAfterTick = !1;
		})), this.#l(), () => {
			let t = this.#h();
			this.allItems.delete(e), this.commandState.filtered.items.delete(e), this.#m(), t?.getAttribute("id") === e && this.#f(), this.#l();
		};
	}
	registerGroup(e) {
		return this.allGroups.has(e) || this.allGroups.set(e, /* @__PURE__ */ new Set()), () => {
			this.allIds.delete(e), this.allGroups.delete(e);
		};
	}
	get isGrid() {
		return this.opts.columns.current !== null;
	}
	#v() {
		return this.updateSelectedToIndex(this.getValidItems().length - 1);
	}
	#y(e) {
		e.preventDefault(), e.metaKey ? this.#v() : e.altKey ? this.updateSelectedByGroup(1) : this.updateSelectedByItem(1);
	}
	#b(e) {
		this.opts.columns.current !== null && (e.preventDefault(), e.metaKey ? this.updateSelectedByGroup(1) : this.updateSelectedByItem(this.#S(e)));
	}
	#x(e, t) {
		if (t.length === 0) return null;
		for (let n = 0; n < t.length; n++) {
			let r = t[n];
			if (r !== void 0) for (let t = 0; t < r.length; t++) {
				let i = r[t];
				if (!(i === void 0 || i.ref !== e)) return {
					columnIndex: t,
					rowIndex: n
				};
			}
		}
		return null;
	}
	#S(e) {
		let t = this.itemsGrid, n = this.#h();
		if (!n) return 0;
		let r = this.#x(n, t);
		if (!r) return 0;
		let i = null, a = +!!e.altKey;
		if (e.altKey && r.rowIndex === t.length - 2 && !this.opts.loop.current) i = this.#C({
			start: t.length - 1,
			end: t.length,
			expectedColumnIndex: r.columnIndex,
			grid: t
		});
		else if (r.rowIndex === t.length - 1) {
			if (!this.opts.loop.current) return 0;
			i = this.#C({
				start: 0 + a,
				end: r.rowIndex,
				expectedColumnIndex: r.columnIndex,
				grid: t
			});
		} else i = this.#C({
			start: r.rowIndex + 1 + a,
			end: t.length,
			expectedColumnIndex: r.columnIndex,
			grid: t
		}), i === null && this.opts.loop.current && (i = this.#C({
			start: 0,
			end: r.rowIndex,
			expectedColumnIndex: r.columnIndex,
			grid: t
		}));
		return this.#w(n, i);
	}
	#C({ start: e, end: t, grid: n, expectedColumnIndex: r }) {
		let i = null;
		for (let a = e; a < t; a++) {
			let e = n[a];
			if (i = e[r]?.ref ?? null, i !== null && Z(i)) {
				i = null;
				continue;
			}
			if (i === null) for (let t = e.length - 1; t >= 0; t--) {
				let t = e[e.length - 1];
				if (!(t === void 0 || Z(t.ref))) {
					i = t.ref;
					break;
				}
			}
			break;
		}
		return i;
	}
	#w(e, t) {
		if (t === null) return 0;
		let n = this.getValidItems(), r = n.findIndex((t) => t === e);
		return n.findIndex((e) => e === t) - r;
	}
	#T(e) {
		this.opts.columns.current !== null && (e.preventDefault(), e.metaKey ? this.updateSelectedByGroup(-1) : this.updateSelectedByItem(this.#E(e)));
	}
	#E(e) {
		let t = this.itemsGrid, n = this.#h();
		if (n === void 0) return 0;
		let r = this.#x(n, t);
		if (r === null) return 0;
		let i = null, a = +!!e.altKey;
		if (e.altKey && r.rowIndex === 1 && this.opts.loop.current === !1) i = this.#D({
			start: 0,
			end: 0,
			expectedColumnIndex: r.columnIndex,
			grid: t
		});
		else if (r.rowIndex === 0) {
			if (this.opts.loop.current === !1) return 0;
			i = this.#D({
				start: t.length - 1 - a,
				end: r.rowIndex + 1,
				expectedColumnIndex: r.columnIndex,
				grid: t
			});
		} else i = this.#D({
			start: r.rowIndex - 1 - a,
			end: 0,
			expectedColumnIndex: r.columnIndex,
			grid: t
		}), i === null && this.opts.loop.current && (i = this.#D({
			start: t.length - 1,
			end: r.rowIndex + 1,
			expectedColumnIndex: r.columnIndex,
			grid: t
		}));
		return this.#w(n, i);
	}
	#D({ start: e, end: t, grid: n, expectedColumnIndex: r }) {
		let i = null;
		for (let a = e; a >= t; a--) {
			let e = n[a];
			if (e !== void 0) {
				if (i = e[r]?.ref ?? null, i !== null && Z(i)) {
					i = null;
					continue;
				}
				if (i === null) for (let t = e.length - 1; t >= 0; t--) {
					let t = e[e.length - 1];
					if (!(t === void 0 || Z(t.ref))) {
						i = t.ref;
						break;
					}
				}
				break;
			}
		}
		return i;
	}
	#O(e) {
		e.preventDefault(), e.metaKey ? this.updateSelectedToIndex(0) : e.altKey ? this.updateSelectedByGroup(-1) : this.updateSelectedByItem(-1);
	}
	onkeydown(e) {
		let t = this.opts.vimBindings.current && e.ctrlKey;
		switch (e.key) {
			case "n":
			case "j":
				t && (this.isGrid ? this.#b(e) : this.#y(e));
				break;
			case "l":
				t && this.isGrid && this.#y(e);
				break;
			case ie:
				this.isGrid ? this.#b(e) : this.#y(e);
				break;
			case ae:
				if (!this.isGrid) break;
				this.#y(e);
				break;
			case "p":
			case "k":
				t && (this.isGrid ? this.#T(e) : this.#O(e));
				break;
			case "h":
				t && this.isGrid && this.#O(e);
				break;
			case ce:
				this.isGrid ? this.#T(e) : this.#O(e);
				break;
			case ne:
				if (!this.isGrid) break;
				this.#O(e);
				break;
			case oe:
				e.preventDefault(), this.updateSelectedToIndex(0);
				break;
			case "End":
				e.preventDefault(), this.#v();
				break;
			case re: if (!e.isComposing && e.keyCode !== 229) {
				e.preventDefault();
				let t = this.#h();
				t && t?.click();
			}
		}
	}
	#k = A(() => ({
		id: this.opts.id.current,
		role: "application",
		[G.root]: "",
		tabindex: -1,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return l(this.#k);
	}
	set props(e) {
		k(this.#k, e);
	}
};
function Z(e) {
	return e.getAttribute("aria-disabled") === "true";
}
var be = class e {
	static create(t) {
		return new e(t, Y.get());
	}
	opts;
	root;
	attachment;
	#e = A(() => this.root._commandState.filtered.count === 0 && this.#t === !1 || this.opts.forceMount.current);
	get shouldRender() {
		return l(this.#e);
	}
	set shouldRender(e) {
		k(this.#e, e);
	}
	#t = !0;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = I(this.opts.ref), c(() => {
			this.#t = !1;
		});
	}
	#n = A(() => ({
		id: this.opts.id.current,
		role: "presentation",
		[G.empty]: "",
		...this.attachment
	}));
	get props() {
		return l(this.#n);
	}
	set props(e) {
		k(this.#n, e);
	}
}, xe = class e {
	static create(t) {
		return X.set(new e(t, Y.get()));
	}
	opts;
	root;
	attachment;
	#e = A(() => this.opts.forceMount.current || this.root.opts.shouldFilter.current === !1 || !this.root.commandState.search ? !0 : this.root._commandState.filtered.groups.has(this.trueValue));
	get shouldRender() {
		return l(this.#e);
	}
	set shouldRender(e) {
		k(this.#e, e);
	}
	#t = b(null);
	get headingNode() {
		return l(this.#t);
	}
	set headingNode(e) {
		k(this.#t, e, !0);
	}
	#n = b("");
	get trueValue() {
		return l(this.#n);
	}
	set trueValue(e) {
		k(this.#n, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = I(this.opts.ref), this.trueValue = e.value.current ?? e.id.current, B(() => this.trueValue, () => this.root.registerGroup(this.trueValue)), a(() => this.opts.value.current ? (this.trueValue = this.opts.value.current, this.root.registerValue(this.opts.value.current)) : this.headingNode && this.headingNode.textContent ? (this.trueValue = this.headingNode.textContent.trim().toLowerCase(), this.root.registerValue(this.trueValue)) : (this.trueValue = `-----${this.opts.id.current}`, this.root.registerValue(this.trueValue)));
	}
	#r = A(() => ({
		id: this.opts.id.current,
		role: "presentation",
		hidden: this.shouldRender ? void 0 : !0,
		"data-value": this.trueValue,
		[G.group]: "",
		...this.attachment
	}));
	get props() {
		return l(this.#r);
	}
	set props(e) {
		k(this.#r, e);
	}
}, Se = class e {
	static create(t) {
		return new e(t, X.get());
	}
	opts;
	group;
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = I(this.opts.ref, (e) => this.group.headingNode = e);
	}
	#e = A(() => ({
		id: this.opts.id.current,
		[G["group-heading"]]: "",
		...this.attachment
	}));
	get props() {
		return l(this.#e);
	}
	set props(e) {
		k(this.#e, e);
	}
}, Ce = class e {
	static create(t) {
		return new e(t, X.get());
	}
	opts;
	group;
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = I(this.opts.ref);
	}
	#e = A(() => ({
		id: this.opts.id.current,
		role: "group",
		[G["group-items"]]: "",
		"aria-labelledby": this.group.headingNode?.id ?? void 0,
		...this.attachment
	}));
	get props() {
		return l(this.#e);
	}
	set props(e) {
		k(this.#e, e);
	}
}, we = class e {
	static create(t) {
		return new e(t, Y.get());
	}
	opts;
	root;
	attachment;
	#e = A(() => {
		let e = this.root.viewportNode?.querySelector(`${ge}[${W}="${me(this.root.opts.value.current)}"]`);
		if (e != null) return e.getAttribute("id") ?? void 0;
	});
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = I(this.opts.ref, (e) => this.root.inputNode = e), B(() => this.opts.ref.current, () => {
			let e = this.opts.ref.current;
			e && this.opts.autofocus.current && ue(10, () => e.focus());
		}), B(() => this.opts.value.current, () => {
			this.root.commandState.search !== this.opts.value.current && this.root.setState("search", this.opts.value.current);
		});
	}
	#t = A(() => ({
		id: this.opts.id.current,
		type: "text",
		[G.input]: "",
		autocomplete: "off",
		autocorrect: "off",
		spellcheck: !1,
		"aria-autocomplete": "list",
		role: "combobox",
		"aria-expanded": z(!0),
		"aria-controls": this.root.viewportNode?.id ?? void 0,
		"aria-labelledby": this.root.labelNode?.id ?? void 0,
		"aria-activedescendant": l(this.#e),
		...this.attachment
	}));
	get props() {
		return l(this.#t);
	}
	set props(e) {
		k(this.#t, e);
	}
}, Te = class e {
	static create(t) {
		let n = X.getOr(null);
		return new e({
			...t,
			group: n
		}, Y.get());
	}
	opts;
	root;
	attachment;
	#e = null;
	#t = A(() => this.opts.forceMount.current || this.#e?.opts.forceMount.current === !0);
	#n = A(() => {
		if (this.opts.ref.current, l(this.#t) || this.root.opts.shouldFilter.current === !1 || !this.root.commandState.search) return !0;
		let e = this.root.commandState.filtered.items.get(this.trueValue);
		return e === void 0 ? !1 : e > 0;
	});
	get shouldRender() {
		return l(this.#n);
	}
	set shouldRender(e) {
		k(this.#n, e);
	}
	#r = A(() => this.root.opts.value.current === this.trueValue && this.trueValue !== "");
	get isSelected() {
		return l(this.#r);
	}
	set isSelected(e) {
		k(this.#r, e);
	}
	#i = b("");
	get trueValue() {
		return l(this.#i);
	}
	set trueValue(e) {
		k(this.#i, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.#e = X.getOr(null), this.trueValue = e.value.current, this.attachment = I(this.opts.ref), B([
			() => this.trueValue,
			() => this.#e?.trueValue,
			() => this.opts.forceMount.current
		], () => {
			if (!(this.opts.forceMount.current || !this.trueValue)) return this.root.registerItem(this.trueValue, this.#e?.trueValue);
		}), B([() => this.opts.value.current, () => this.opts.ref.current], () => {
			this.opts.value.current ? this.trueValue = this.opts.value.current : this.opts.ref.current?.textContent && (this.trueValue = this.opts.ref.current.textContent.trim()), this.trueValue && (this.root.registerValue(this.trueValue, e.keywords.current.map((e) => e.trim())), this.opts.ref.current?.setAttribute(W, this.trueValue));
		}), this.onclick = this.onclick.bind(this), this.onpointermove = this.onpointermove.bind(this);
	}
	#a() {
		this.opts.disabled.current || (this.#o(), this.opts.onSelect?.current());
	}
	#o() {
		this.opts.disabled.current || this.root.setValue(this.trueValue, !0);
	}
	onpointermove(e) {
		this.opts.disabled.current || this.root.opts.disablePointerSelection.current || this.#o();
	}
	onclick(e) {
		this.opts.disabled.current || this.#a();
	}
	#s = A(() => ({
		id: this.opts.id.current,
		"aria-disabled": z(this.opts.disabled.current),
		"aria-selected": z(this.isSelected),
		"data-disabled": R(this.opts.disabled.current),
		"data-selected": R(this.isSelected),
		"data-value": this.trueValue,
		"data-group": this.#e?.trueValue,
		[G.item]: "",
		role: "option",
		onpointermove: this.onpointermove,
		onclick: this.onclick,
		...this.attachment
	}));
	get props() {
		return l(this.#s);
	}
	set props(e) {
		k(this.#s, e);
	}
}, Ee = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = I(this.opts.ref);
	}
	#e = A(() => ({
		id: this.opts.id.current,
		role: "progressbar",
		"aria-valuenow": this.opts.progress.current,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": "Loading...",
		[G.loading]: "",
		...this.attachment
	}));
	get props() {
		return l(this.#e);
	}
	set props(e) {
		k(this.#e, e);
	}
}, De = class e {
	static create(t) {
		return new e(t, Y.get());
	}
	opts;
	root;
	attachment;
	#e = A(() => !this.root._commandState.search || this.opts.forceMount.current);
	get shouldRender() {
		return l(this.#e);
	}
	set shouldRender(e) {
		k(this.#e, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = I(this.opts.ref);
	}
	#t = A(() => ({
		id: this.opts.id.current,
		"aria-hidden": "true",
		[G.separator]: "",
		...this.attachment
	}));
	get props() {
		return l(this.#t);
	}
	set props(e) {
		k(this.#t, e);
	}
}, Oe = class e {
	static create(t) {
		return _e.set(new e(t, Y.get()));
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = I(this.opts.ref);
	}
	#e = A(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-label": this.opts.ariaLabel.current,
		[G.list]: "",
		...this.attachment
	}));
	get props() {
		return l(this.#e);
	}
	set props(e) {
		k(this.#e, e);
	}
}, ke = class e {
	static create(t) {
		return new e(t, Y.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = I(this.opts.ref, (e) => this.root.labelNode = e);
	}
	#e = A(() => ({
		id: this.opts.id.current,
		[G["input-label"]]: "",
		for: this.opts.for?.current,
		style: U,
		...this.attachment
	}));
	get props() {
		return l(this.#e);
	}
	set props(e) {
		k(this.#e, e);
	}
}, Ae = class e {
	static create(t) {
		return new e(t, _e.get());
	}
	opts;
	list;
	attachment;
	constructor(e, t) {
		this.opts = e, this.list = t, this.attachment = I(this.opts.ref, (e) => this.list.root.viewportNode = e), B([() => this.opts.ref.current, () => this.list.opts.ref.current], ([e, t]) => {
			if (e === null || t === null) return;
			let n, r = new ResizeObserver(() => {
				n = requestAnimationFrame(() => {
					let n = e.offsetHeight;
					t.style.setProperty("--bits-command-list-height", `${n.toFixed(1)}px`);
				});
			});
			return r.observe(e), () => {
				cancelAnimationFrame(n), r.unobserve(e);
			};
		});
	}
	#e = A(() => ({
		id: this.opts.id.current,
		[G.viewport]: "",
		...this.attachment
	}));
	get props() {
		return l(this.#e);
	}
	set props(e) {
		k(this.#e, e);
	}
}, je = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children"
]), Me = M("<label><!></label>");
function Ne(e, t) {
	let n = w();
	o(t, !0);
	let r = v(t, "id", 19, () => H(n)), i = v(t, "ref", 15, null), a = D(t, je), s = ke.create({
		id: F(() => r()),
		ref: F(() => i(), (e) => i(e))
	}), c = A(() => V(a, s.props));
	var u = Me();
	h(u, () => ({ ...l(c) })), f(g(u), () => t.children ?? T), d(u), y(e, u), p();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/command/components/command.svelte
var Pe = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"value",
	"onValueChange",
	"onStateChange",
	"loop",
	"shouldFilter",
	"filter",
	"label",
	"vimBindings",
	"disablePointerSelection",
	"disableInitialScroll",
	"columns",
	"children",
	"child"
]), Fe = M("<!> <!>", 1), Ie = M("<div><!> <!></div>");
function Le(e, n) {
	let r = w();
	o(n, !0);
	let i = (e) => {
		Ne(e, {
			children: (e, t) => {
				_();
				var n = x();
				m(() => O(n, N())), y(e, n);
			},
			$$slots: { default: !0 }
		});
	}, a = v(n, "id", 19, () => H(r)), s = v(n, "ref", 15, null), c = v(n, "value", 15, ""), b = v(n, "onValueChange", 3, se), E = v(n, "onStateChange", 3, se), k = v(n, "loop", 3, !1), j = v(n, "shouldFilter", 3, !0), M = v(n, "filter", 3, At), N = v(n, "label", 3, ""), P = v(n, "vimBindings", 3, !0), I = v(n, "disablePointerSelection", 3, !1), L = v(n, "disableInitialScroll", 3, !1), R = v(n, "columns", 3, null), ee = D(n, Pe), z = ye.create({
		id: F(() => a()),
		ref: F(() => s(), (e) => s(e)),
		filter: F(() => M()),
		shouldFilter: F(() => j()),
		loop: F(() => k()),
		value: F(() => c(), (e) => {
			c() !== e && (c(e), b()(e));
		}),
		vimBindings: F(() => P()),
		disablePointerSelection: F(() => I()),
		disableInitialScroll: F(() => L()),
		onStateChange: F(() => E()),
		columns: F(() => R())
	}), B = (e) => z.updateSelectedToIndex(e), te = (e) => z.updateSelectedByGroup(e), ne = (e) => z.updateSelectedByItem(e), re = () => z.getValidItems(), ie = A(() => V(ee, z.props));
	var ae = {
		updateSelectedToIndex: B,
		updateSelectedByGroup: te,
		updateSelectedByItem: ne,
		getValidItems: re
	}, oe = C(), ce = u(oe), le = (e) => {
		var r = Fe(), a = u(r);
		i(a), f(t(a, 2), () => n.child, () => ({ props: l(ie) })), y(e, r);
	}, ue = (e) => {
		var r = Ie();
		h(r, () => ({ ...l(ie) }));
		var a = g(r);
		i(a), f(t(a, 2), () => n.children ?? T), d(r), y(e, r);
	};
	return S(ce, (e) => {
		n.child ? e(le) : e(ue, -1);
	}), y(e, oe), p(ae);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/command/components/command-empty.svelte
var Re = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"forceMount"
]), ze = M("<div><!></div>");
function Be(e, t) {
	let n = w();
	o(t, !0);
	let r = v(t, "id", 19, () => H(n)), i = v(t, "ref", 15, null), a = v(t, "forceMount", 3, !1), s = D(t, Re), c = be.create({
		id: F(() => r()),
		ref: F(() => i(), (e) => i(e)),
		forceMount: F(() => a())
	}), m = A(() => V(c.props, s));
	var _ = C(), b = u(_), x = (e) => {
		var n = C(), r = u(n), i = (e) => {
			var n = C();
			f(u(n), () => t.child, () => ({ props: l(m) })), y(e, n);
		}, a = (e) => {
			var n = ze();
			h(n, () => ({ ...l(m) })), f(g(n), () => t.children ?? T), d(n), y(e, n);
		};
		S(r, (e) => {
			t.child ? e(i) : e(a, -1);
		}), y(e, n);
	};
	S(b, (e) => {
		c.shouldRender && e(x);
	}), y(e, _), p();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/command/components/command-group.svelte
var Ve = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"value",
	"forceMount",
	"children",
	"child"
]), He = M("<div><!></div>");
function Ue(e, t) {
	let n = w();
	o(t, !0);
	let r = v(t, "id", 19, () => H(n)), i = v(t, "ref", 15, null), a = v(t, "value", 3, ""), s = v(t, "forceMount", 3, !1), c = D(t, Ve), m = xe.create({
		id: F(() => r()),
		ref: F(() => i(), (e) => i(e)),
		forceMount: F(() => s()),
		value: F(() => a())
	}), _ = A(() => V(c, m.props));
	var b = C(), x = u(b), E = (e) => {
		var n = C();
		f(u(n), () => t.child, () => ({ props: l(_) })), y(e, n);
	}, O = (e) => {
		var n = He();
		h(n, () => ({ ...l(_) })), f(g(n), () => t.children ?? T), d(n), y(e, n);
	};
	S(x, (e) => {
		t.child ? e(E) : e(O, -1);
	}), y(e, b), p();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/command/components/command-group-heading.svelte
var We = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), Ge = M("<div><!></div>");
function Ke(e, t) {
	let n = w();
	o(t, !0);
	let r = v(t, "id", 19, () => H(n)), i = v(t, "ref", 15, null), a = D(t, We), s = Se.create({
		id: F(() => r()),
		ref: F(() => i(), (e) => i(e))
	}), c = A(() => V(a, s.props));
	var m = C(), _ = u(m), b = (e) => {
		var n = C();
		f(u(n), () => t.child, () => ({ props: l(c) })), y(e, n);
	}, x = (e) => {
		var n = Ge();
		h(n, () => ({ ...l(c) })), f(g(n), () => t.children ?? T), d(n), y(e, n);
	};
	S(_, (e) => {
		t.child ? e(b) : e(x, -1);
	}), y(e, m), p();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/command/components/command-group-items.svelte
var qe = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), Je = M("<div><!></div>"), Ye = M("<div style=\"display: contents;\"><!></div>");
function Xe(e, t) {
	let n = w();
	o(t, !0);
	let r = v(t, "id", 19, () => H(n)), i = v(t, "ref", 15, null), a = D(t, qe), s = Ce.create({
		id: F(() => r()),
		ref: F(() => i(), (e) => i(e))
	}), c = A(() => V(a, s.props));
	var m = Ye(), _ = g(m), b = (e) => {
		var n = C();
		f(u(n), () => t.child, () => ({ props: l(c) })), y(e, n);
	}, x = (e) => {
		var n = Je();
		h(n, () => ({ ...l(c) })), f(g(n), () => t.children ?? T), d(n), y(e, n);
	};
	S(_, (e) => {
		t.child ? e(b) : e(x, -1);
	}), d(m), y(e, m), p();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/command/components/command-input.svelte
var Ze = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"autofocus",
	"id",
	"ref",
	"child"
]), Qe = M("<input/>");
function $e(e, t) {
	let n = w();
	o(t, !0);
	let r = v(t, "value", 15, ""), a = v(t, "autofocus", 3, !1), s = v(t, "id", 19, () => H(n)), c = v(t, "ref", 15, null), d = D(t, Ze), m = we.create({
		id: F(() => s()),
		ref: F(() => c(), (e) => c(e)),
		value: F(() => r(), (e) => {
			r(e);
		}),
		autofocus: F(() => a() ?? !1)
	}), g = A(() => V(d, m.props));
	var _ = C(), b = u(_), x = (e) => {
		var n = C();
		f(u(n), () => t.child, () => ({ props: l(g) })), y(e, n);
	}, T = (e) => {
		var t = Qe();
		h(t, () => ({ ...l(g) }), void 0, void 0, void 0, void 0, !0), i(t, r), y(e, t);
	};
	S(b, (e) => {
		t.child ? e(x) : e(T, -1);
	}), y(e, _), p();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/command/components/command-item.svelte
var et = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"value",
	"disabled",
	"children",
	"child",
	"onSelect",
	"forceMount",
	"keywords"
]), tt = M("<div><!></div>"), nt = M("<div style=\"display: contents;\" data-item-wrapper=\"\"><!></div>");
function rt(t, r) {
	let i = w();
	o(r, !0);
	let a = v(r, "id", 19, () => H(i)), s = v(r, "ref", 15, null), c = v(r, "value", 3, ""), _ = v(r, "disabled", 3, !1), b = v(r, "onSelect", 3, se), x = v(r, "forceMount", 3, !1), E = v(r, "keywords", 19, () => []), O = D(r, et), k = Te.create({
		id: F(() => a()),
		ref: F(() => s(), (e) => s(e)),
		value: F(() => c()),
		disabled: F(() => _()),
		onSelect: F(() => b()),
		forceMount: F(() => x()),
		keywords: F(() => E())
	}), j = A(() => V(O, k.props));
	var M = C();
	n(u(M), () => k.root.key, (t) => {
		var n = nt(), i = g(n), a = (e) => {
			var t = C(), n = u(t), i = (e) => {
				var t = C();
				f(u(t), () => r.child, () => ({ props: l(j) })), y(e, t);
			}, a = (e) => {
				var t = tt();
				h(t, () => ({ ...l(j) })), f(g(t), () => r.children ?? T), d(t), y(e, t);
			};
			S(n, (e) => {
				r.child ? e(i) : e(a, -1);
			}), y(e, t);
		};
		S(i, (e) => {
			k.shouldRender && e(a);
		}), d(n), m(() => e(n, "data-value", k.trueValue)), y(t, n);
	}), y(t, M), p();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/command/components/command-list.svelte
var it = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"aria-label"
]), at = M("<div><!></div>");
function ot(e, t) {
	let r = w();
	o(t, !0);
	let i = v(t, "id", 19, () => H(r)), a = v(t, "ref", 15, null), s = D(t, it), c = Oe.create({
		id: F(() => i()),
		ref: F(() => a(), (e) => a(e)),
		ariaLabel: F(() => t["aria-label"] ?? "Suggestions...")
	}), m = A(() => V(s, c.props));
	var _ = C();
	n(u(_), () => c.root._commandState.search === "", (e) => {
		var n = C(), r = u(n), i = (e) => {
			var n = C();
			f(u(n), () => t.child, () => ({ props: l(m) })), y(e, n);
		}, a = (e) => {
			var n = at();
			h(n, () => ({ ...l(m) })), f(g(n), () => t.children ?? T), d(n), y(e, n);
		};
		S(r, (e) => {
			t.child ? e(i) : e(a, -1);
		}), y(e, n);
	}), y(e, _), p();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/command/components/command-viewport.svelte
var st = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), ct = M("<div><!></div>");
function lt(e, t) {
	let n = w();
	o(t, !0);
	let r = v(t, "id", 19, () => H(n)), i = v(t, "ref", 15, null), a = D(t, st), s = Ae.create({
		id: F(() => r()),
		ref: F(() => i(), (e) => i(e))
	}), c = A(() => V(a, s.props));
	var m = C(), _ = u(m), b = (e) => {
		var n = C();
		f(u(n), () => t.child, () => ({ props: l(c) })), y(e, n);
	}, x = (e) => {
		var n = ct();
		h(n, () => ({ ...l(c) })), f(g(n), () => t.children ?? T), d(n), y(e, n);
	};
	S(_, (e) => {
		t.child ? e(b) : e(x, -1);
	}), y(e, m), p();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/command/components/command-loading.svelte
var ut = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"progress",
	"id",
	"ref",
	"children",
	"child"
]), dt = M("<div><!></div>");
function ft(e, t) {
	let n = w();
	o(t, !0);
	let r = v(t, "progress", 3, 0), i = v(t, "id", 19, () => H(n)), a = v(t, "ref", 15, null), s = D(t, ut), c = Ee.create({
		id: F(() => i()),
		ref: F(() => a(), (e) => a(e)),
		progress: F(() => r())
	}), m = A(() => V(s, c.props));
	var _ = C(), b = u(_), x = (e) => {
		var n = C();
		f(u(n), () => t.child, () => ({ props: l(m) })), y(e, n);
	}, E = (e) => {
		var n = dt();
		h(n, () => ({ ...l(m) })), f(g(n), () => t.children ?? T), d(n), y(e, n);
	};
	S(b, (e) => {
		t.child ? e(x) : e(E, -1);
	}), y(e, _), p();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/command/components/command-separator.svelte
var pt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"forceMount",
	"children",
	"child"
]), mt = M("<div><!></div>");
function ht(e, t) {
	let n = w();
	o(t, !0);
	let r = v(t, "id", 19, () => H(n)), i = v(t, "ref", 15, null), a = v(t, "forceMount", 3, !1), s = D(t, pt), c = De.create({
		id: F(() => r()),
		ref: F(() => i(), (e) => i(e)),
		forceMount: F(() => a())
	}), m = A(() => V(s, c.props));
	var _ = C(), b = u(_), x = (e) => {
		var n = C(), r = u(n), i = (e) => {
			var n = C();
			f(u(n), () => t.child, () => ({ props: l(m) })), y(e, n);
		}, a = (e) => {
			var n = mt();
			h(n, () => ({ ...l(m) })), f(g(n), () => t.children ?? T), d(n), y(e, n);
		};
		S(r, (e) => {
			t.child ? e(i) : e(a, -1);
		}), y(e, n);
	};
	S(b, (e) => {
		c.shouldRender && e(x);
	}), y(e, _), p();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/command/compute-command-score.js
var gt = 1, _t = .9, vt = .8, yt = .17, bt = .1, xt = .999, St = .9999, Ct = .99, wt = /[\\/_+.#"@[({&]/, Tt = /[\\/_+.#"@[({&]/g, Et = /[\s-]/, Dt = /[\s-]/g;
function Ot(e, t, n, r, i, a, o) {
	if (a === t.length) return i === e.length ? gt : Ct;
	let s = `${i},${a}`;
	if (o[s] !== void 0) return o[s];
	let c = r.charAt(a), l = n.indexOf(c, i), u = 0, d, f, p, m;
	for (; l >= 0;) d = Ot(e, t, n, r, l + 1, a + 1, o), d > u && (l === i ? d *= gt : wt.test(e.charAt(l - 1)) ? (d *= vt, p = e.slice(i, l - 1).match(Tt), p && i > 0 && (d *= xt ** p.length)) : Et.test(e.charAt(l - 1)) ? (d *= _t, m = e.slice(i, l - 1).match(Dt), m && i > 0 && (d *= xt ** m.length)) : (d *= yt, i > 0 && (d *= xt ** (l - i))), e.charAt(l) !== t.charAt(a) && (d *= St)), (d < bt && n.charAt(l - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(l - 1) !== r.charAt(a)) && (f = Ot(e, t, n, r, l + 1, a + 2, o), f * bt > d && (d = f * bt)), d > u && (u = d), l = n.indexOf(c, l + 1);
	return o[s] = u, u;
}
function kt(e) {
	return e.toLowerCase().replace(Dt, " ");
}
function At(e, t, n) {
	return e = n && n.length > 0 ? `${`${e} ${n?.join(" ")}`}` : e, Ot(e, t, kt(e), kt(t), 0, 0, {});
}
//#endregion
//#region ../ui/src/lib/components/command/command-empty.svelte
var jt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function Mt(e, t) {
	o(t, !0);
	let n = D(t, jt);
	var i = C(), a = u(i);
	{
		let e = A(() => N("flex w-full items-center justify-center px-3 py-8 text-sm text-dark-300", t.class));
		r(a, () => Be, (r, i) => {
			i(r, j(() => n, {
				get class() {
					return l(e);
				},
				children: (e, n) => {
					var r = C();
					f(u(r), () => t.children ?? T), y(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	y(e, i), p();
}
//#endregion
//#region ../ui/src/lib/components/input/input-size-classes.ts
var Q = {
	xs: "h-7",
	sm: "h-8",
	md: "h-10",
	lg: "h-12"
}, $ = {
	xs: "px-3 text-xs leading-none",
	sm: "px-3.5 text-xs leading-none",
	md: "px-4 text-sm leading-none",
	lg: "px-5 text-base leading-none"
}, Nt = {
	xs: `box-border ${Q.xs} ${$.xs}`,
	sm: `box-border ${Q.sm} ${$.sm}`,
	md: `box-border ${Q.md} ${$.md}`,
	lg: `box-border ${Q.lg} ${$.lg}`
}, Pt = {
	xs: "size-3",
	sm: "size-3.5",
	md: "size-4",
	lg: "size-5"
}, Ft = {
	xs: "min-w-7",
	sm: "min-w-8",
	md: "min-w-10",
	lg: "min-w-12"
}, It = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"class"
]);
function Lt(e, t) {
	o(t, !0);
	let n = v(t, "value", 15, ""), i = D(t, It);
	var a = C(), s = u(a);
	{
		let e = A(() => N("w-full border-0 bg-dark-800 text-dark-50 outline-none placeholder:text-dark-300", "border-b border-dark-600 px-4 py-3", t.class));
		r(s, () => $e, (t, r) => {
			r(t, j(() => i, {
				get class() {
					return l(e);
				},
				get value() {
					return n();
				},
				set value(e) {
					n(e);
				}
			}));
		});
	}
	y(e, a), p();
}
//#endregion
//#region ../ui/src/lib/components/command/command-item.svelte
var Rt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function zt(e, t) {
	o(t, !0);
	let n = D(t, Rt);
	var i = C(), a = u(i);
	{
		let e = A(() => N("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-dark-50 outline-none select-none", "data-disabled:cursor-default data-disabled:opacity-50 data-selected:bg-dark-700", t.class));
		r(a, () => rt, (r, i) => {
			i(r, j(() => n, {
				get class() {
					return l(e);
				},
				children: (e, n) => {
					var r = C();
					f(u(r), () => t.children ?? T), y(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	y(e, i), p();
}
//#endregion
//#region ../ui/src/lib/components/command/command-list.svelte
var Bt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"id",
	"class"
]);
function Vt(e, t) {
	o(t, !0);
	let n = D(t, Bt);
	var i = C(), a = u(i);
	{
		let e = A(() => N("px-2 pb-2", t.class));
		r(a, () => ot, (r, i) => {
			i(r, j({ get id() {
				return t.id;
			} }, () => n, {
				get class() {
					return l(e);
				},
				children: (e, n) => {
					de(e, {
						orientation: "vertical",
						viewportClasses: "max-h-80 overflow-hidden",
						children: (e, n) => {
							var r = C();
							f(u(r), () => t.children ?? T), y(e, r);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			}));
		});
	}
	y(e, i), p();
}
//#endregion
//#region ../ui/src/lib/components/command/command-loading.svelte
var Ht = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function Ut(e, t) {
	o(t, !0);
	let n = D(t, Ht);
	var i = C(), a = u(i);
	{
		let e = A(() => N("flex w-full items-center justify-center px-3 py-8 text-sm text-dark-300", t.class));
		r(a, () => ft, (r, i) => {
			i(r, j(() => n, {
				get class() {
					return l(e);
				},
				children: (e, n) => {
					var r = C();
					f(u(r), () => t.children ?? T), y(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	y(e, i), p();
}
//#endregion
//#region ../ui/src/lib/components/command/command-root.svelte
var Wt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function Gt(e, t) {
	o(t, !0);
	let n = D(t, Wt);
	var i = C(), a = u(i);
	{
		let e = A(() => N("flex w-full flex-col divide-y divide-dark-600 overflow-hidden rounded-none border border-dark-600 bg-dark-800 shadow-md", t.class));
		r(a, () => Le, (r, i) => {
			i(r, j(() => n, {
				get class() {
					return l(e);
				},
				children: (e, n) => {
					var r = C();
					f(u(r), () => t.children ?? T), y(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	y(e, i), p();
}
//#endregion
//#region ../ui/src/lib/components/command/index.ts
var Kt = lt, qt = Ue, Jt = Ke, Yt = Xe, Xt = ht;
//#endregion
export { U as _, Kt as a, Vt as c, Ft as d, Pt as f, Mt as g, Nt as h, Xt as i, zt as l, Q as m, Jt as n, Gt as o, $ as p, Yt as r, Ut as s, qt as t, Lt as u };
