import { $n as e, At as t, Gn as n, Gt as r, Hr as i, Jr as a, Kn as o, Mt as s, On as c, Q as l, Qn as u, Qr as d, Vr as f, Wn as p, Wt as m, Zn as h, Zr as g, an as _, cr as v, dn as y, f as b, in as x, it as S, m as C, ni as w, nn as T, nr as E, on as D, or as O, ot as ee, p as k, pr as A, un as j } from "./index-client-BIJQxc2l.js";
import "./disclose-version-YhYaTdgb.js";
import { t as M } from "./utils-DVQ4nj8f.js";
import { C as N, D as P, d as F, g as I, n as L, o as te, r as R, x as z } from "./animations-complete-mSylzqL5.js";
import { a as ne, i as B, n as V } from "./use-id-D_eLoXvH.js";
import { a as re, d as ie, i as H, o as ae, p as U, r as W, s as oe, t as se, v as ce } from "./dom-DDAYniBq.js";
import { t as le } from "./scroll-area-99QA2aRD.js";
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_eda23719c06f49b3fd4471540fb738b4/node_modules/svelte-toolbelt/dist/utils/sr-only-styles.js
var G = {
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
ne(G);
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/command/utils.js
function ue(e, t) {
	let n = e.nextElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.nextElementSibling;
	}
}
function de(e, t) {
	let n = e.previousElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.previousElementSibling;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/css-escape.js
function fe(e) {
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
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/command/command.svelte.js
var K = "data-value", q = te({
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
}), J = q.selector("group"), Y = q.selector("group-items"), pe = q.selector("group-heading"), me = q.selector("item"), X = `${q.selector("item")}:not([aria-disabled="true"])`, Z = new N("Command.Root"), he = new N("Command.List"), Q = new N("Command.Group"), ge = {
	search: "",
	value: "",
	filtered: {
		count: 0,
		items: /* @__PURE__ */ new Map(),
		groups: /* @__PURE__ */ new Set()
	}
}, _e = class e {
	static create(t) {
		return Z.set(new e(t));
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
	#n = v(0);
	get key() {
		return c(this.#n);
	}
	set key(e) {
		O(this.#n, e, !0);
	}
	#r = v(null);
	get viewportNode() {
		return c(this.#r);
	}
	set viewportNode(e) {
		O(this.#r, e, !0);
	}
	#i = v(null);
	get inputNode() {
		return c(this.#i);
	}
	set inputNode(e) {
		O(this.#i, e, !0);
	}
	#a = v(null);
	get labelNode() {
		return c(this.#a);
	}
	set labelNode(e) {
		O(this.#a, e, !0);
	}
	#o = v(ge);
	get commandState() {
		return c(this.#o);
	}
	set commandState(e) {
		O(this.#o, e);
	}
	#s = v(E(ge));
	get _commandState() {
		return c(this.#s);
	}
	set _commandState(e) {
		O(this.#s, e, !0);
	}
	#c() {
		return a(this._commandState);
	}
	#l() {
		this.#e || (this.#e = !0, I(() => {
			this.#e = !1;
			let e = this.#c();
			Object.is(this.commandState, e) || (this.commandState = e, this.opts.onStateChange?.current?.(e));
		}));
	}
	setState(e, t, n) {
		Object.is(this._commandState[e], t) || (this._commandState[e] = t, e === "search" ? (this.#m(), this.#d()) : e === "value" && (n || this.#g()), this.#l());
	}
	constructor(e) {
		this.opts = e, this.attachment = F(this.opts.ref);
		let t = {
			...this._commandState,
			value: this.opts.value.current ?? ""
		};
		this._commandState = t, this.commandState = t, this.onkeydown = this.onkeydown.bind(this);
	}
	#u(e, t) {
		let n = this.opts.filter.current ?? Ot;
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
			let t = e.closest(Y);
			if (t) {
				let n = e.parentElement === t ? e : e.closest(`${Y} > *`);
				n && t.appendChild(n);
			} else {
				let t = e.parentElement === n ? e : e.closest(`${Y} > *`);
				t && n?.appendChild(t);
			}
		}
		let i = t.sort((e, t) => t[1] - e[1]);
		for (let e of i) {
			let t = n?.querySelector(`${J}[${K}="${fe(e[0])}"]`);
			t?.parentElement?.appendChild(t);
		}
		this.#f();
	}
	setValue(e, t) {
		e !== this.opts.value.current && e === "" && I(() => {
			this.key++;
		}), this.setState("value", e, t), this.opts.value.current = e;
	}
	#f() {
		I(() => {
			let e = this.getValidItems().find((e) => e.getAttribute("aria-disabled") !== "true")?.getAttribute(K), t = this.#t && this.opts.disableInitialScroll.current;
			this.setValue(e ?? "", t), this.#t = !1;
		});
	}
	#p() {
		I(() => {
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
		return e ? Array.from(e.querySelectorAll(X)).filter((e) => !!e) : [];
	}
	getVisibleItems() {
		let e = this.opts.ref.current;
		return e ? Array.from(e.querySelectorAll(me)).filter((e) => !!e) : [];
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
		let t = e.querySelector(`${X}[data-selected]`);
		if (t) return t;
	}
	#g() {
		I(() => {
			let e = this.#h();
			if (!e) return;
			let t = e.parentElement?.parentElement;
			if (t) {
				if (this.isGrid) {
					let t = this.#_(e);
					if (e.scrollIntoView({ block: "nearest" }), t) {
						(e?.closest(J)?.querySelector(pe))?.scrollIntoView({ block: "nearest" });
						return;
					}
				} else {
					let n = se(t);
					if (n && n.dataset?.value === e.dataset?.value) {
						(e?.closest(J)?.querySelector(pe))?.scrollIntoView({ block: "nearest" });
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
		t && this.setValue(t.getAttribute(K) ?? "");
	}
	updateSelectedByItem(e) {
		let t = this.#h(), n = this.getValidItems(), r = n.findIndex((e) => e === t), i = n[r + e];
		this.opts.loop.current && (i = r + e < 0 ? n[n.length - 1] : r + e === n.length ? n[0] : n[r + e]), i && this.setValue(i.getAttribute(K) ?? "");
	}
	updateSelectedByGroup(e) {
		let t = this.#h()?.closest(J), n;
		for (; t && !n;) t = e > 0 ? ue(t, J) : de(t, J), n = t?.querySelector(X);
		n ? this.setValue(n.getAttribute(K) ?? "") : this.updateSelectedByItem(e);
	}
	registerValue(e, t) {
		return e && e === this.allIds.get(e)?.value || this.allIds.set(e, {
			value: e,
			keywords: t
		}), this._commandState.filtered.items.set(e, this.#u(e, t)), this.sortAfterTick || (this.sortAfterTick = !0, I(() => {
			this.#d(), this.sortAfterTick = !1;
		})), () => {
			this.allIds.delete(e);
		};
	}
	registerItem(e, t) {
		return this.allItems.add(e), t && (this.allGroups.has(t) ? this.allGroups.get(t).add(e) : this.allGroups.set(t, new Set([e]))), this.sortAndFilterAfterTick || (this.sortAndFilterAfterTick = !0, I(() => {
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
			if (i = e[r]?.ref ?? null, i !== null && $(i)) {
				i = null;
				continue;
			}
			if (i === null) for (let t = e.length - 1; t >= 0; t--) {
				let t = e[e.length - 1];
				if (!(t === void 0 || $(t.ref))) {
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
				if (i = e[r]?.ref ?? null, i !== null && $(i)) {
					i = null;
					continue;
				}
				if (i === null) for (let t = e.length - 1; t >= 0; t--) {
					let t = e[e.length - 1];
					if (!(t === void 0 || $(t.ref))) {
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
			case H:
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
			case oe:
				this.isGrid ? this.#T(e) : this.#O(e);
				break;
			case re:
				if (!this.isGrid) break;
				this.#O(e);
				break;
			case U:
				e.preventDefault(), this.updateSelectedToIndex(0);
				break;
			case "End":
				e.preventDefault(), this.#v();
				break;
			case ie: if (!e.isComposing && e.keyCode !== 229) {
				e.preventDefault();
				let t = this.#h();
				t && t?.click();
			}
		}
	}
	#k = A(() => ({
		id: this.opts.id.current,
		role: "application",
		[q.root]: "",
		tabindex: -1,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return c(this.#k);
	}
	set props(e) {
		O(this.#k, e);
	}
};
function $(e) {
	return e.getAttribute("aria-disabled") === "true";
}
var ve = class e {
	static create(t) {
		return new e(t, Z.get());
	}
	opts;
	root;
	attachment;
	#e = A(() => this.root._commandState.filtered.count === 0 && this.#t === !1 || this.opts.forceMount.current);
	get shouldRender() {
		return c(this.#e);
	}
	set shouldRender(e) {
		O(this.#e, e);
	}
	#t = !0;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = F(this.opts.ref), o(() => {
			this.#t = !1;
		});
	}
	#n = A(() => ({
		id: this.opts.id.current,
		role: "presentation",
		[q.empty]: "",
		...this.attachment
	}));
	get props() {
		return c(this.#n);
	}
	set props(e) {
		O(this.#n, e);
	}
}, ye = class e {
	static create(t) {
		return Q.set(new e(t, Z.get()));
	}
	opts;
	root;
	attachment;
	#e = A(() => this.opts.forceMount.current || this.root.opts.shouldFilter.current === !1 || !this.root.commandState.search ? !0 : this.root._commandState.filtered.groups.has(this.trueValue));
	get shouldRender() {
		return c(this.#e);
	}
	set shouldRender(e) {
		O(this.#e, e);
	}
	#t = v(null);
	get headingNode() {
		return c(this.#t);
	}
	set headingNode(e) {
		O(this.#t, e, !0);
	}
	#n = v("");
	get trueValue() {
		return c(this.#n);
	}
	set trueValue(e) {
		O(this.#n, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = F(this.opts.ref), this.trueValue = e.value.current ?? e.id.current, z(() => this.trueValue, () => this.root.registerGroup(this.trueValue)), n(() => this.opts.value.current ? (this.trueValue = this.opts.value.current, this.root.registerValue(this.opts.value.current)) : this.headingNode && this.headingNode.textContent ? (this.trueValue = this.headingNode.textContent.trim().toLowerCase(), this.root.registerValue(this.trueValue)) : (this.trueValue = `-----${this.opts.id.current}`, this.root.registerValue(this.trueValue)));
	}
	#r = A(() => ({
		id: this.opts.id.current,
		role: "presentation",
		hidden: this.shouldRender ? void 0 : !0,
		"data-value": this.trueValue,
		[q.group]: "",
		...this.attachment
	}));
	get props() {
		return c(this.#r);
	}
	set props(e) {
		O(this.#r, e);
	}
}, be = class e {
	static create(t) {
		return new e(t, Q.get());
	}
	opts;
	group;
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = F(this.opts.ref, (e) => this.group.headingNode = e);
	}
	#e = A(() => ({
		id: this.opts.id.current,
		[q["group-heading"]]: "",
		...this.attachment
	}));
	get props() {
		return c(this.#e);
	}
	set props(e) {
		O(this.#e, e);
	}
}, xe = class e {
	static create(t) {
		return new e(t, Q.get());
	}
	opts;
	group;
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = F(this.opts.ref);
	}
	#e = A(() => ({
		id: this.opts.id.current,
		role: "group",
		[q["group-items"]]: "",
		"aria-labelledby": this.group.headingNode?.id ?? void 0,
		...this.attachment
	}));
	get props() {
		return c(this.#e);
	}
	set props(e) {
		O(this.#e, e);
	}
}, Se = class e {
	static create(t) {
		return new e(t, Z.get());
	}
	opts;
	root;
	attachment;
	#e = A(() => {
		let e = this.root.viewportNode?.querySelector(`${me}[${K}="${fe(this.root.opts.value.current)}"]`);
		if (e != null) return e.getAttribute("id") ?? void 0;
	});
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = F(this.opts.ref, (e) => this.root.inputNode = e), z(() => this.opts.ref.current, () => {
			let e = this.opts.ref.current;
			e && this.opts.autofocus.current && ce(10, () => e.focus());
		}), z(() => this.opts.value.current, () => {
			this.root.commandState.search !== this.opts.value.current && this.root.setState("search", this.opts.value.current);
		});
	}
	#t = A(() => ({
		id: this.opts.id.current,
		type: "text",
		[q.input]: "",
		autocomplete: "off",
		autocorrect: "off",
		spellcheck: !1,
		"aria-autocomplete": "list",
		role: "combobox",
		"aria-expanded": R(!0),
		"aria-controls": this.root.viewportNode?.id ?? void 0,
		"aria-labelledby": this.root.labelNode?.id ?? void 0,
		"aria-activedescendant": c(this.#e),
		...this.attachment
	}));
	get props() {
		return c(this.#t);
	}
	set props(e) {
		O(this.#t, e);
	}
}, Ce = class e {
	static create(t) {
		let n = Q.getOr(null);
		return new e({
			...t,
			group: n
		}, Z.get());
	}
	opts;
	root;
	attachment;
	#e = null;
	#t = A(() => this.opts.forceMount.current || this.#e?.opts.forceMount.current === !0);
	#n = A(() => {
		if (this.opts.ref.current, c(this.#t) || this.root.opts.shouldFilter.current === !1 || !this.root.commandState.search) return !0;
		let e = this.root.commandState.filtered.items.get(this.trueValue);
		return e === void 0 ? !1 : e > 0;
	});
	get shouldRender() {
		return c(this.#n);
	}
	set shouldRender(e) {
		O(this.#n, e);
	}
	#r = A(() => this.root.opts.value.current === this.trueValue && this.trueValue !== "");
	get isSelected() {
		return c(this.#r);
	}
	set isSelected(e) {
		O(this.#r, e);
	}
	#i = v("");
	get trueValue() {
		return c(this.#i);
	}
	set trueValue(e) {
		O(this.#i, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.#e = Q.getOr(null), this.trueValue = e.value.current, this.attachment = F(this.opts.ref), z([
			() => this.trueValue,
			() => this.#e?.trueValue,
			() => this.opts.forceMount.current
		], () => {
			if (!(this.opts.forceMount.current || !this.trueValue)) return this.root.registerItem(this.trueValue, this.#e?.trueValue);
		}), z([() => this.opts.value.current, () => this.opts.ref.current], () => {
			this.opts.value.current ? this.trueValue = this.opts.value.current : this.opts.ref.current?.textContent && (this.trueValue = this.opts.ref.current.textContent.trim()), this.trueValue && (this.root.registerValue(this.trueValue, e.keywords.current.map((e) => e.trim())), this.opts.ref.current?.setAttribute(K, this.trueValue));
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
		"aria-disabled": R(this.opts.disabled.current),
		"aria-selected": R(this.isSelected),
		"data-disabled": L(this.opts.disabled.current),
		"data-selected": L(this.isSelected),
		"data-value": this.trueValue,
		"data-group": this.#e?.trueValue,
		[q.item]: "",
		role: "option",
		onpointermove: this.onpointermove,
		onclick: this.onclick,
		...this.attachment
	}));
	get props() {
		return c(this.#s);
	}
	set props(e) {
		O(this.#s, e);
	}
}, we = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = F(this.opts.ref);
	}
	#e = A(() => ({
		id: this.opts.id.current,
		role: "progressbar",
		"aria-valuenow": this.opts.progress.current,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": "Loading...",
		[q.loading]: "",
		...this.attachment
	}));
	get props() {
		return c(this.#e);
	}
	set props(e) {
		O(this.#e, e);
	}
}, Te = class e {
	static create(t) {
		return new e(t, Z.get());
	}
	opts;
	root;
	attachment;
	#e = A(() => !this.root._commandState.search || this.opts.forceMount.current);
	get shouldRender() {
		return c(this.#e);
	}
	set shouldRender(e) {
		O(this.#e, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = F(this.opts.ref);
	}
	#t = A(() => ({
		id: this.opts.id.current,
		"aria-hidden": "true",
		[q.separator]: "",
		...this.attachment
	}));
	get props() {
		return c(this.#t);
	}
	set props(e) {
		O(this.#t, e);
	}
}, Ee = class e {
	static create(t) {
		return he.set(new e(t, Z.get()));
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = F(this.opts.ref);
	}
	#e = A(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-label": this.opts.ariaLabel.current,
		[q.list]: "",
		...this.attachment
	}));
	get props() {
		return c(this.#e);
	}
	set props(e) {
		O(this.#e, e);
	}
}, De = class e {
	static create(t) {
		return new e(t, Z.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = F(this.opts.ref, (e) => this.root.labelNode = e);
	}
	#e = A(() => ({
		id: this.opts.id.current,
		[q["input-label"]]: "",
		for: this.opts.for?.current,
		style: G,
		...this.attachment
	}));
	get props() {
		return c(this.#e);
	}
	set props(e) {
		O(this.#e, e);
	}
}, Oe = class e {
	static create(t) {
		return new e(t, he.get());
	}
	opts;
	list;
	attachment;
	constructor(e, t) {
		this.opts = e, this.list = t, this.attachment = F(this.opts.ref, (e) => this.list.root.viewportNode = e), z([() => this.opts.ref.current, () => this.list.opts.ref.current], ([e, t]) => {
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
		[q.viewport]: "",
		...this.attachment
	}));
	get props() {
		return c(this.#e);
	}
	set props(e) {
		O(this.#e, e);
	}
}, ke = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children"
]), Ae = D("<label><!></label>");
function je(e, t) {
	let n = j();
	i(t, !0);
	let r = b(t, "id", 19, () => V(n)), a = b(t, "ref", 15, null), o = k(t, ke), l = De.create({
		id: P(() => r()),
		ref: P(() => a(), (e) => a(e))
	}), u = A(() => B(o, l.props));
	var p = Ae();
	S(p, () => ({ ...c(u) })), s(h(p), () => t.children ?? w), d(p), x(e, p), f();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/command/components/command.svelte
var Me = new Set([
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
]), Ne = D("<!> <!>", 1), Pe = D("<div><!> <!></div>");
function Fe(t, n) {
	let a = j();
	i(n, !0);
	let o = (e) => {
		je(e, {
			children: (e, t) => {
				g();
				var n = y();
				p(() => T(n, M())), x(e, n);
			},
			$$slots: { default: !0 }
		});
	}, l = b(n, "id", 19, () => V(a)), m = b(n, "ref", 15, null), v = b(n, "value", 15, ""), C = b(n, "onValueChange", 3, W), E = b(n, "onStateChange", 3, W), D = b(n, "loop", 3, !1), O = b(n, "shouldFilter", 3, !0), ee = b(n, "filter", 3, Ot), M = b(n, "label", 3, ""), N = b(n, "vimBindings", 3, !0), F = b(n, "disablePointerSelection", 3, !1), I = b(n, "disableInitialScroll", 3, !1), L = b(n, "columns", 3, null), te = k(n, Me), R = _e.create({
		id: P(() => l()),
		ref: P(() => m(), (e) => m(e)),
		filter: P(() => ee()),
		shouldFilter: P(() => O()),
		loop: P(() => D()),
		value: P(() => v(), (e) => {
			v() !== e && (v(e), C()(e));
		}),
		vimBindings: P(() => N()),
		disablePointerSelection: P(() => F()),
		disableInitialScroll: P(() => I()),
		onStateChange: P(() => E()),
		columns: P(() => L())
	}), z = (e) => R.updateSelectedToIndex(e), ne = (e) => R.updateSelectedByGroup(e), re = (e) => R.updateSelectedByItem(e), ie = () => R.getValidItems(), H = A(() => B(te, R.props));
	var ae = {
		updateSelectedToIndex: z,
		updateSelectedByGroup: ne,
		updateSelectedByItem: re,
		getValidItems: ie
	}, U = _(), oe = u(U), se = (t) => {
		var r = Ne(), i = u(r);
		o(i), s(e(i, 2), () => n.child, () => ({ props: c(H) })), x(t, r);
	}, ce = (t) => {
		var r = Pe();
		S(r, () => ({ ...c(H) }));
		var i = h(r);
		o(i), s(e(i, 2), () => n.children ?? w), d(r), x(t, r);
	};
	return r(oe, (e) => {
		n.child ? e(se) : e(ce, -1);
	}), x(t, U), f(ae);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/command/components/command-empty.svelte
var Ie = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"forceMount"
]), Le = D("<div><!></div>");
function Re(e, t) {
	let n = j();
	i(t, !0);
	let a = b(t, "id", 19, () => V(n)), o = b(t, "ref", 15, null), l = b(t, "forceMount", 3, !1), p = k(t, Ie), m = ve.create({
		id: P(() => a()),
		ref: P(() => o(), (e) => o(e)),
		forceMount: P(() => l())
	}), g = A(() => B(m.props, p));
	var v = _(), y = u(v), C = (e) => {
		var n = _(), i = u(n), a = (e) => {
			var n = _();
			s(u(n), () => t.child, () => ({ props: c(g) })), x(e, n);
		}, o = (e) => {
			var n = Le();
			S(n, () => ({ ...c(g) })), s(h(n), () => t.children ?? w), d(n), x(e, n);
		};
		r(i, (e) => {
			t.child ? e(a) : e(o, -1);
		}), x(e, n);
	};
	r(y, (e) => {
		m.shouldRender && e(C);
	}), x(e, v), f();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/command/components/command-group.svelte
var ze = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"value",
	"forceMount",
	"children",
	"child"
]), Be = D("<div><!></div>");
function Ve(e, t) {
	let n = j();
	i(t, !0);
	let a = b(t, "id", 19, () => V(n)), o = b(t, "ref", 15, null), l = b(t, "value", 3, ""), p = b(t, "forceMount", 3, !1), m = k(t, ze), g = ye.create({
		id: P(() => a()),
		ref: P(() => o(), (e) => o(e)),
		forceMount: P(() => p()),
		value: P(() => l())
	}), v = A(() => B(m, g.props));
	var y = _(), C = u(y), T = (e) => {
		var n = _();
		s(u(n), () => t.child, () => ({ props: c(v) })), x(e, n);
	}, E = (e) => {
		var n = Be();
		S(n, () => ({ ...c(v) })), s(h(n), () => t.children ?? w), d(n), x(e, n);
	};
	r(C, (e) => {
		t.child ? e(T) : e(E, -1);
	}), x(e, y), f();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/command/components/command-group-heading.svelte
var He = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), Ue = D("<div><!></div>");
function We(e, t) {
	let n = j();
	i(t, !0);
	let a = b(t, "id", 19, () => V(n)), o = b(t, "ref", 15, null), l = k(t, He), p = be.create({
		id: P(() => a()),
		ref: P(() => o(), (e) => o(e))
	}), m = A(() => B(l, p.props));
	var g = _(), v = u(g), y = (e) => {
		var n = _();
		s(u(n), () => t.child, () => ({ props: c(m) })), x(e, n);
	}, C = (e) => {
		var n = Ue();
		S(n, () => ({ ...c(m) })), s(h(n), () => t.children ?? w), d(n), x(e, n);
	};
	r(v, (e) => {
		t.child ? e(y) : e(C, -1);
	}), x(e, g), f();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/command/components/command-group-items.svelte
var Ge = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), Ke = D("<div><!></div>"), qe = D("<div style=\"display: contents;\"><!></div>");
function Je(e, t) {
	let n = j();
	i(t, !0);
	let a = b(t, "id", 19, () => V(n)), o = b(t, "ref", 15, null), l = k(t, Ge), p = xe.create({
		id: P(() => a()),
		ref: P(() => o(), (e) => o(e))
	}), m = A(() => B(l, p.props));
	var g = qe(), v = h(g), y = (e) => {
		var n = _();
		s(u(n), () => t.child, () => ({ props: c(m) })), x(e, n);
	}, C = (e) => {
		var n = Ke();
		S(n, () => ({ ...c(m) })), s(h(n), () => t.children ?? w), d(n), x(e, n);
	};
	r(v, (e) => {
		t.child ? e(y) : e(C, -1);
	}), d(g), x(e, g), f();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/command/components/command-input.svelte
var Ye = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"autofocus",
	"id",
	"ref",
	"child"
]), Xe = D("<input/>");
function Ze(e, t) {
	let n = j();
	i(t, !0);
	let a = b(t, "value", 15, ""), o = b(t, "autofocus", 3, !1), d = b(t, "id", 19, () => V(n)), p = b(t, "ref", 15, null), m = k(t, Ye), h = Se.create({
		id: P(() => d()),
		ref: P(() => p(), (e) => p(e)),
		value: P(() => a(), (e) => {
			a(e);
		}),
		autofocus: P(() => o() ?? !1)
	}), g = A(() => B(m, h.props));
	var v = _(), y = u(v), C = (e) => {
		var n = _();
		s(u(n), () => t.child, () => ({ props: c(g) })), x(e, n);
	}, w = (e) => {
		var t = Xe();
		S(t, () => ({ ...c(g) }), void 0, void 0, void 0, void 0, !0), l(t, a), x(e, t);
	};
	r(y, (e) => {
		t.child ? e(C) : e(w, -1);
	}), x(e, v), f();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/command/components/command-item.svelte
var Qe = new Set([
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
]), $e = D("<div><!></div>"), et = D("<div style=\"display: contents;\" data-item-wrapper=\"\"><!></div>");
function tt(e, t) {
	let n = j();
	i(t, !0);
	let a = b(t, "id", 19, () => V(n)), o = b(t, "ref", 15, null), l = b(t, "value", 3, ""), g = b(t, "disabled", 3, !1), v = b(t, "onSelect", 3, W), y = b(t, "forceMount", 3, !1), C = b(t, "keywords", 19, () => []), T = k(t, Qe), E = Ce.create({
		id: P(() => a()),
		ref: P(() => o(), (e) => o(e)),
		value: P(() => l()),
		disabled: P(() => g()),
		onSelect: P(() => v()),
		forceMount: P(() => y()),
		keywords: P(() => C())
	}), D = A(() => B(T, E.props));
	var O = _();
	m(u(O), () => E.root.key, (e) => {
		var n = et(), i = h(n), a = (e) => {
			var n = _(), i = u(n), a = (e) => {
				var n = _();
				s(u(n), () => t.child, () => ({ props: c(D) })), x(e, n);
			}, o = (e) => {
				var n = $e();
				S(n, () => ({ ...c(D) })), s(h(n), () => t.children ?? w), d(n), x(e, n);
			};
			r(i, (e) => {
				t.child ? e(a) : e(o, -1);
			}), x(e, n);
		};
		r(i, (e) => {
			E.shouldRender && e(a);
		}), d(n), p(() => ee(n, "data-value", E.trueValue)), x(e, n);
	}), x(e, O), f();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/command/components/command-list.svelte
var nt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"aria-label"
]), rt = D("<div><!></div>");
function it(e, t) {
	let n = j();
	i(t, !0);
	let a = b(t, "id", 19, () => V(n)), o = b(t, "ref", 15, null), l = k(t, nt), p = Ee.create({
		id: P(() => a()),
		ref: P(() => o(), (e) => o(e)),
		ariaLabel: P(() => t["aria-label"] ?? "Suggestions...")
	}), g = A(() => B(l, p.props));
	var v = _();
	m(u(v), () => p.root._commandState.search === "", (e) => {
		var n = _(), i = u(n), a = (e) => {
			var n = _();
			s(u(n), () => t.child, () => ({ props: c(g) })), x(e, n);
		}, o = (e) => {
			var n = rt();
			S(n, () => ({ ...c(g) })), s(h(n), () => t.children ?? w), d(n), x(e, n);
		};
		r(i, (e) => {
			t.child ? e(a) : e(o, -1);
		}), x(e, n);
	}), x(e, v), f();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/command/components/command-viewport.svelte
var at = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), ot = D("<div><!></div>");
function st(e, t) {
	let n = j();
	i(t, !0);
	let a = b(t, "id", 19, () => V(n)), o = b(t, "ref", 15, null), l = k(t, at), p = Oe.create({
		id: P(() => a()),
		ref: P(() => o(), (e) => o(e))
	}), m = A(() => B(l, p.props));
	var g = _(), v = u(g), y = (e) => {
		var n = _();
		s(u(n), () => t.child, () => ({ props: c(m) })), x(e, n);
	}, C = (e) => {
		var n = ot();
		S(n, () => ({ ...c(m) })), s(h(n), () => t.children ?? w), d(n), x(e, n);
	};
	r(v, (e) => {
		t.child ? e(y) : e(C, -1);
	}), x(e, g), f();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/command/components/command-loading.svelte
var ct = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"progress",
	"id",
	"ref",
	"children",
	"child"
]), lt = D("<div><!></div>");
function ut(e, t) {
	let n = j();
	i(t, !0);
	let a = b(t, "progress", 3, 0), o = b(t, "id", 19, () => V(n)), l = b(t, "ref", 15, null), p = k(t, ct), m = we.create({
		id: P(() => o()),
		ref: P(() => l(), (e) => l(e)),
		progress: P(() => a())
	}), g = A(() => B(p, m.props));
	var v = _(), y = u(v), C = (e) => {
		var n = _();
		s(u(n), () => t.child, () => ({ props: c(g) })), x(e, n);
	}, T = (e) => {
		var n = lt();
		S(n, () => ({ ...c(g) })), s(h(n), () => t.children ?? w), d(n), x(e, n);
	};
	r(y, (e) => {
		t.child ? e(C) : e(T, -1);
	}), x(e, v), f();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/command/components/command-separator.svelte
var dt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"forceMount",
	"children",
	"child"
]), ft = D("<div><!></div>");
function pt(e, t) {
	let n = j();
	i(t, !0);
	let a = b(t, "id", 19, () => V(n)), o = b(t, "ref", 15, null), l = b(t, "forceMount", 3, !1), p = k(t, dt), m = Te.create({
		id: P(() => a()),
		ref: P(() => o(), (e) => o(e)),
		forceMount: P(() => l())
	}), g = A(() => B(p, m.props));
	var v = _(), y = u(v), C = (e) => {
		var n = _(), i = u(n), a = (e) => {
			var n = _();
			s(u(n), () => t.child, () => ({ props: c(g) })), x(e, n);
		}, o = (e) => {
			var n = ft();
			S(n, () => ({ ...c(g) })), s(h(n), () => t.children ?? w), d(n), x(e, n);
		};
		r(i, (e) => {
			t.child ? e(a) : e(o, -1);
		}), x(e, n);
	};
	r(y, (e) => {
		m.shouldRender && e(C);
	}), x(e, v), f();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/command/compute-command-score.js
var mt = 1, ht = .9, gt = .8, _t = .17, vt = .1, yt = .999, bt = .9999, xt = .99, St = /[\\/_+.#"@[({&]/, Ct = /[\\/_+.#"@[({&]/g, wt = /[\s-]/, Tt = /[\s-]/g;
function Et(e, t, n, r, i, a, o) {
	if (a === t.length) return i === e.length ? mt : xt;
	let s = `${i},${a}`;
	if (o[s] !== void 0) return o[s];
	let c = r.charAt(a), l = n.indexOf(c, i), u = 0, d, f, p, m;
	for (; l >= 0;) d = Et(e, t, n, r, l + 1, a + 1, o), d > u && (l === i ? d *= mt : St.test(e.charAt(l - 1)) ? (d *= gt, p = e.slice(i, l - 1).match(Ct), p && i > 0 && (d *= yt ** p.length)) : wt.test(e.charAt(l - 1)) ? (d *= ht, m = e.slice(i, l - 1).match(Tt), m && i > 0 && (d *= yt ** m.length)) : (d *= _t, i > 0 && (d *= yt ** (l - i))), e.charAt(l) !== t.charAt(a) && (d *= bt)), (d < vt && n.charAt(l - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(l - 1) !== r.charAt(a)) && (f = Et(e, t, n, r, l + 1, a + 2, o), f * vt > d && (d = f * vt)), d > u && (u = d), l = n.indexOf(c, l + 1);
	return o[s] = u, u;
}
function Dt(e) {
	return e.toLowerCase().replace(Tt, " ");
}
function Ot(e, t, n) {
	return e = n && n.length > 0 ? `${`${e} ${n?.join(" ")}`}` : e, Et(e, t, Dt(e), Dt(t), 0, 0, {});
}
//#endregion
//#region ../ui/src/lib/components/command/command-empty.svelte
var kt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function At(e, n) {
	i(n, !0);
	let r = k(n, kt);
	var a = _(), o = u(a);
	{
		let e = A(() => M("flex w-full items-center justify-center px-3 py-8 text-sm text-dark-300", n.class));
		t(o, () => Re, (t, i) => {
			i(t, C(() => r, {
				get class() {
					return c(e);
				},
				children: (e, t) => {
					var r = _();
					s(u(r), () => n.children ?? w), x(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	x(e, a), f();
}
//#endregion
//#region ../ui/src/lib/components/input/input-size-classes.ts
var jt = {
	xs: "px-2 py-1 text-xs",
	sm: "px-3 py-2 text-xs",
	md: "px-4 py-2 text-sm",
	lg: "px-5 py-3 text-base"
}, Mt = {
	xs: "size-3",
	sm: "size-4",
	md: "size-5",
	lg: "size-6"
}, Nt = {
	xs: "min-w-8",
	sm: "min-w-9",
	md: "min-w-10",
	lg: "min-w-10"
}, Pt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"class"
]);
function Ft(e, n) {
	i(n, !0);
	let r = b(n, "value", 15, ""), a = k(n, Pt);
	var o = _(), s = u(o);
	{
		let e = A(() => M("w-full border-0 bg-dark-800 text-dark-50 outline-none placeholder:text-dark-300", "border-b border-dark-600 px-4 py-3", n.class));
		t(s, () => Ze, (t, n) => {
			n(t, C(() => a, {
				get class() {
					return c(e);
				},
				get value() {
					return r();
				},
				set value(e) {
					r(e);
				}
			}));
		});
	}
	x(e, o), f();
}
//#endregion
//#region ../ui/src/lib/components/command/command-item.svelte
var It = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function Lt(e, n) {
	i(n, !0);
	let r = k(n, It);
	var a = _(), o = u(a);
	{
		let e = A(() => M("flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-dark-50 outline-none select-none", "data-disabled:cursor-default data-disabled:opacity-50 data-selected:bg-dark-700", n.class));
		t(o, () => tt, (t, i) => {
			i(t, C(() => r, {
				get class() {
					return c(e);
				},
				children: (e, t) => {
					var r = _();
					s(u(r), () => n.children ?? w), x(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	x(e, a), f();
}
//#endregion
//#region ../ui/src/lib/components/command/command-list.svelte
var Rt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"id",
	"class"
]);
function zt(e, n) {
	i(n, !0);
	let r = k(n, Rt);
	var a = _(), o = u(a);
	{
		let e = A(() => M("px-2 pb-2", n.class));
		t(o, () => it, (t, i) => {
			i(t, C({ get id() {
				return n.id;
			} }, () => r, {
				get class() {
					return c(e);
				},
				children: (e, t) => {
					le(e, {
						orientation: "vertical",
						viewportClasses: "max-h-80 overflow-hidden",
						children: (e, t) => {
							var r = _();
							s(u(r), () => n.children ?? w), x(e, r);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			}));
		});
	}
	x(e, a), f();
}
//#endregion
//#region ../ui/src/lib/components/command/command-loading.svelte
var Bt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function Vt(e, n) {
	i(n, !0);
	let r = k(n, Bt);
	var a = _(), o = u(a);
	{
		let e = A(() => M("flex w-full items-center justify-center px-3 py-8 text-sm text-dark-300", n.class));
		t(o, () => ut, (t, i) => {
			i(t, C(() => r, {
				get class() {
					return c(e);
				},
				children: (e, t) => {
					var r = _();
					s(u(r), () => n.children ?? w), x(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	x(e, a), f();
}
//#endregion
//#region ../ui/src/lib/components/command/command-root.svelte
var Ht = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function Ut(e, n) {
	i(n, !0);
	let r = k(n, Ht);
	var a = _(), o = u(a);
	{
		let e = A(() => M("flex w-full flex-col divide-y divide-dark-600 overflow-hidden rounded-xl border border-dark-600 bg-dark-800 shadow-md", n.class));
		t(o, () => Fe, (t, i) => {
			i(t, C(() => r, {
				get class() {
					return c(e);
				},
				children: (e, t) => {
					var r = _();
					s(u(r), () => n.children ?? w), x(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	x(e, a), f();
}
//#endregion
//#region ../ui/src/lib/components/command/index.ts
var Wt = st, Gt = Ve, Kt = We, qt = Je, Jt = pt;
//#endregion
export { Wt as a, zt as c, Nt as d, Mt as f, G as h, Jt as i, Lt as l, At as m, Kt as n, Ut as o, jt as p, qt as r, Vt as s, Gt as t, Ft as u };
