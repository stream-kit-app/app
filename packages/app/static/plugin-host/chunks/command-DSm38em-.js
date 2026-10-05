import { Bn as e, Bt as t, Dn as n, Dr as r, En as i, Hr as a, Nt as o, Sn as s, Ur as c, Vt as l, Yr as u, _r as d, a as f, bn as p, cr as m, ct as h, ei as g, et as _, hn as v, ii as y, ir as b, nr as x, o as S, ot as C, pr as w, rr as T, s as E, sn as D, sr as O, ti as k, ur as A, xn as j, yr as M } from "./client-BFeMv2Ma.js";
import { r as ee, t as N } from "./utils-Dqp4W1j8.js";
import "./disclose-version-CI8I6yeK.js";
import { C as P, D as F, d as I, g as L, n as R, o as z, r as B, x as V } from "./animations-complete-2GhqX7WL.js";
import { a as te, i as H, n as U } from "./use-id-BW6hjw-g.js";
import { a as ne, d as re, i as ie, o as ae, p as oe, r as se, s as ce, t as le } from "./dom-9pAGmv2P.js";
import { t as ue } from "./scroll-area-DXaKUX2U.js";
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_61a373d23e0427b3790b60c19a185d1b/node_modules/svelte-toolbelt/dist/utils/sr-only-styles.js
var W = {
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
te(W);
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_61a373d23e0427b3790b60c19a185d1b/node_modules/svelte-toolbelt/dist/utils/after-sleep.js
function de(e, t) {
	return setTimeout(t, e);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/command/utils.js
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
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/css-escape.js
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
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/command/command.svelte.js
var G = "data-value", K = z({
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
}), q = K.selector("group"), he = K.selector("group-items"), ge = K.selector("group-heading"), _e = K.selector("item"), ve = `${K.selector("item")}:not([aria-disabled="true"])`, J = new P("Command.Root"), ye = new P("Command.List"), Y = new P("Command.Group"), be = {
	search: "",
	value: "",
	filtered: {
		count: 0,
		items: /* @__PURE__ */ new Map(),
		groups: /* @__PURE__ */ new Set()
	}
}, xe = class t {
	static create(e) {
		return J.set(new t(e));
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
	#n = M(0);
	get key() {
		return e(this.#n);
	}
	set key(e) {
		d(this.#n, e, !0);
	}
	#r = M(null);
	get viewportNode() {
		return e(this.#r);
	}
	set viewportNode(e) {
		d(this.#r, e, !0);
	}
	#i = M(null);
	get inputNode() {
		return e(this.#i);
	}
	set inputNode(e) {
		d(this.#i, e, !0);
	}
	#a = M(null);
	get labelNode() {
		return e(this.#a);
	}
	set labelNode(e) {
		d(this.#a, e, !0);
	}
	#o = M(be);
	get commandState() {
		return e(this.#o);
	}
	set commandState(e) {
		d(this.#o, e);
	}
	#s = M(w(be));
	get _commandState() {
		return e(this.#s);
	}
	set _commandState(e) {
		d(this.#s, e, !0);
	}
	#c() {
		return u(this._commandState);
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
		let n = this.opts.filter.current ?? jt;
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
			let t = e.closest(he);
			if (t) {
				let n = e.parentElement === t ? e : e.closest(`${he} > *`);
				n && t.appendChild(n);
			} else {
				let t = e.parentElement === n ? e : e.closest(`${he} > *`);
				t && n?.appendChild(t);
			}
		}
		let i = t.sort((e, t) => t[1] - e[1]);
		for (let e of i) {
			let t = n?.querySelector(`${q}[${G}="${me(e[0])}"]`);
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
			let e = this.getValidItems().find((e) => e.getAttribute("aria-disabled") !== "true")?.getAttribute(G), t = this.#t && this.opts.disableInitialScroll.current;
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
		return e ? Array.from(e.querySelectorAll(ve)).filter((e) => !!e) : [];
	}
	getVisibleItems() {
		let e = this.opts.ref.current;
		return e ? Array.from(e.querySelectorAll(_e)).filter((e) => !!e) : [];
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
		let t = e.querySelector(`${ve}[data-selected]`);
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
						(e?.closest(q)?.querySelector(ge))?.scrollIntoView({ block: "nearest" });
						return;
					}
				} else {
					let n = le(t);
					if (n && n.dataset?.value === e.dataset?.value) {
						(e?.closest(q)?.querySelector(ge))?.scrollIntoView({ block: "nearest" });
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
				if (n !== void 0 && n.ref === e) return n.firstRowOfGroup;
			}
		}
		return !1;
	}
	updateSelectedToIndex(e) {
		let t = this.getValidItems()[e];
		t && this.setValue(t.getAttribute(G) ?? "");
	}
	updateSelectedByItem(e) {
		let t = this.#h(), n = this.getValidItems(), r = n.findIndex((e) => e === t), i = n[r + e];
		this.opts.loop.current && (i = r + e < 0 ? n[n.length - 1] : r + e === n.length ? n[0] : n[r + e]), i && this.setValue(i.getAttribute(G) ?? "");
	}
	updateSelectedByGroup(e) {
		let t = this.#h()?.closest(q), n;
		for (; t && !n;) t = e > 0 ? fe(t, q) : pe(t, q), n = t?.querySelector(ve);
		n ? this.setValue(n.getAttribute(G) ?? "") : this.updateSelectedByItem(e);
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
		return this.allItems.add(e), t && (this.allGroups.has(t) ? this.allGroups.get(t).add(e) : this.allGroups.set(t, /* @__PURE__ */ new Set([e]))), this.sortAndFilterAfterTick || (this.sortAndFilterAfterTick = !0, L(() => {
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
				if (i !== void 0 && i.ref === e) return {
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
			if (i = e[r]?.ref ?? null, i !== null && X(i)) {
				i = null;
				continue;
			}
			if (i === null) for (let t = e.length - 1; t >= 0; t--) {
				let t = e[e.length - 1];
				if (!(t === void 0 || X(t.ref))) {
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
				if (i = e[r]?.ref ?? null, i !== null && X(i)) {
					i = null;
					continue;
				}
				if (i === null) for (let t = e.length - 1; t >= 0; t--) {
					let t = e[e.length - 1];
					if (!(t === void 0 || X(t.ref))) {
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
	#k = r(() => ({
		id: this.opts.id.current,
		role: "application",
		[K.root]: "",
		tabindex: -1,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return e(this.#k);
	}
	set props(e) {
		d(this.#k, e);
	}
};
function X(e) {
	return e.getAttribute("aria-disabled") === "true";
}
var Se = class t {
	static create(e) {
		return new t(e, J.get());
	}
	opts;
	root;
	attachment;
	#e = r(() => this.root._commandState.filtered.count === 0 && this.#t === !1 || this.opts.forceMount.current);
	get shouldRender() {
		return e(this.#e);
	}
	set shouldRender(e) {
		d(this.#e, e);
	}
	#t = !0;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = I(this.opts.ref), b(() => {
			this.#t = !1;
		});
	}
	#n = r(() => ({
		id: this.opts.id.current,
		role: "presentation",
		[K.empty]: "",
		...this.attachment
	}));
	get props() {
		return e(this.#n);
	}
	set props(e) {
		d(this.#n, e);
	}
}, Ce = class t {
	static create(e) {
		return Y.set(new t(e, J.get()));
	}
	opts;
	root;
	attachment;
	#e = r(() => this.opts.forceMount.current || this.root.opts.shouldFilter.current === !1 || !this.root.commandState.search ? !0 : this.root._commandState.filtered.groups.has(this.trueValue));
	get shouldRender() {
		return e(this.#e);
	}
	set shouldRender(e) {
		d(this.#e, e);
	}
	#t = M(null);
	get headingNode() {
		return e(this.#t);
	}
	set headingNode(e) {
		d(this.#t, e, !0);
	}
	#n = M("");
	get trueValue() {
		return e(this.#n);
	}
	set trueValue(e) {
		d(this.#n, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = I(this.opts.ref), this.trueValue = e.value.current ?? e.id.current, V(() => this.trueValue, () => this.root.registerGroup(this.trueValue)), T(() => this.opts.value.current ? (this.trueValue = this.opts.value.current, this.root.registerValue(this.opts.value.current)) : this.headingNode && this.headingNode.textContent ? (this.trueValue = this.headingNode.textContent.trim().toLowerCase(), this.root.registerValue(this.trueValue)) : (this.trueValue = `-----${this.opts.id.current}`, this.root.registerValue(this.trueValue)));
	}
	#r = r(() => ({
		id: this.opts.id.current,
		role: "presentation",
		hidden: !this.shouldRender || void 0,
		"data-value": this.trueValue,
		[K.group]: "",
		...this.attachment
	}));
	get props() {
		return e(this.#r);
	}
	set props(e) {
		d(this.#r, e);
	}
}, we = class t {
	static create(e) {
		return new t(e, Y.get());
	}
	opts;
	group;
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = I(this.opts.ref, (e) => this.group.headingNode = e);
	}
	#e = r(() => ({
		id: this.opts.id.current,
		[K["group-heading"]]: "",
		...this.attachment
	}));
	get props() {
		return e(this.#e);
	}
	set props(e) {
		d(this.#e, e);
	}
}, Te = class t {
	static create(e) {
		return new t(e, Y.get());
	}
	opts;
	group;
	attachment;
	constructor(e, t) {
		this.opts = e, this.group = t, this.attachment = I(this.opts.ref);
	}
	#e = r(() => ({
		id: this.opts.id.current,
		role: "group",
		[K["group-items"]]: "",
		"aria-labelledby": this.group.headingNode?.id ?? void 0,
		...this.attachment
	}));
	get props() {
		return e(this.#e);
	}
	set props(e) {
		d(this.#e, e);
	}
}, Ee = class t {
	static create(e) {
		return new t(e, J.get());
	}
	opts;
	root;
	attachment;
	#e = r(() => {
		let e = this.root.viewportNode?.querySelector(`${_e}[${G}="${me(this.root.opts.value.current)}"]`);
		if (e != null) return e.getAttribute("id") ?? void 0;
	});
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = I(this.opts.ref, (e) => this.root.inputNode = e), V(() => this.opts.ref.current, () => {
			let e = this.opts.ref.current;
			e && this.opts.autofocus.current && de(10, () => e.focus());
		}), V(() => this.opts.value.current, () => {
			this.root.commandState.search !== this.opts.value.current && this.root.setState("search", this.opts.value.current);
		});
	}
	#t = r(() => ({
		id: this.opts.id.current,
		type: "text",
		[K.input]: "",
		autocomplete: "off",
		autocorrect: "off",
		spellcheck: !1,
		"aria-autocomplete": "list",
		role: "combobox",
		"aria-expanded": B(!0),
		"aria-controls": this.root.viewportNode?.id ?? void 0,
		"aria-labelledby": this.root.labelNode?.id ?? void 0,
		"aria-activedescendant": e(this.#e),
		...this.attachment
	}));
	get props() {
		return e(this.#t);
	}
	set props(e) {
		d(this.#t, e);
	}
}, De = class t {
	static create(e) {
		let n = Y.getOr(null);
		return new t({
			...e,
			group: n
		}, J.get());
	}
	opts;
	root;
	attachment;
	#e = null;
	#t = r(() => this.opts.forceMount.current || this.#e?.opts.forceMount.current === !0);
	#n = r(() => {
		if (this.opts.ref.current, e(this.#t) || this.root.opts.shouldFilter.current === !1 || !this.root.commandState.search) return !0;
		let t = this.root.commandState.filtered.items.get(this.trueValue);
		return t !== void 0 && t > 0;
	});
	get shouldRender() {
		return e(this.#n);
	}
	set shouldRender(e) {
		d(this.#n, e);
	}
	#r = r(() => this.root.opts.value.current === this.trueValue && this.trueValue !== "");
	get isSelected() {
		return e(this.#r);
	}
	set isSelected(e) {
		d(this.#r, e);
	}
	#i = M("");
	get trueValue() {
		return e(this.#i);
	}
	set trueValue(e) {
		d(this.#i, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.#e = Y.getOr(null), this.trueValue = e.value.current, this.attachment = I(this.opts.ref), V([
			() => this.trueValue,
			() => this.#e?.trueValue,
			() => this.opts.forceMount.current
		], () => {
			if (!this.opts.forceMount.current && this.trueValue) return this.root.registerItem(this.trueValue, this.#e?.trueValue);
		}), V([() => this.opts.value.current, () => this.opts.ref.current], () => {
			this.opts.value.current ? this.trueValue = this.opts.value.current : this.opts.ref.current?.textContent && (this.trueValue = this.opts.ref.current.textContent.trim()), this.trueValue && (this.root.registerValue(this.trueValue, e.keywords.current.map((e) => e.trim())), this.opts.ref.current?.setAttribute(G, this.trueValue));
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
	#s = r(() => ({
		id: this.opts.id.current,
		"aria-disabled": B(this.opts.disabled.current),
		"aria-selected": B(this.isSelected),
		"data-disabled": R(this.opts.disabled.current),
		"data-selected": R(this.isSelected),
		"data-value": this.trueValue,
		"data-group": this.#e?.trueValue,
		[K.item]: "",
		role: "option",
		onpointermove: this.onpointermove,
		onclick: this.onclick,
		...this.attachment
	}));
	get props() {
		return e(this.#s);
	}
	set props(e) {
		d(this.#s, e);
	}
}, Oe = class t {
	static create(e) {
		return new t(e);
	}
	opts;
	attachment;
	constructor(e) {
		this.opts = e, this.attachment = I(this.opts.ref);
	}
	#e = r(() => ({
		id: this.opts.id.current,
		role: "progressbar",
		"aria-valuenow": this.opts.progress.current,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": "Loading...",
		[K.loading]: "",
		...this.attachment
	}));
	get props() {
		return e(this.#e);
	}
	set props(e) {
		d(this.#e, e);
	}
}, ke = class t {
	static create(e) {
		return new t(e, J.get());
	}
	opts;
	root;
	attachment;
	#e = r(() => !this.root._commandState.search || this.opts.forceMount.current);
	get shouldRender() {
		return e(this.#e);
	}
	set shouldRender(e) {
		d(this.#e, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = I(this.opts.ref);
	}
	#t = r(() => ({
		id: this.opts.id.current,
		"aria-hidden": "true",
		[K.separator]: "",
		...this.attachment
	}));
	get props() {
		return e(this.#t);
	}
	set props(e) {
		d(this.#t, e);
	}
}, Ae = class t {
	static create(e) {
		return ye.set(new t(e, J.get()));
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = I(this.opts.ref);
	}
	#e = r(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-label": this.opts.ariaLabel.current,
		[K.list]: "",
		...this.attachment
	}));
	get props() {
		return e(this.#e);
	}
	set props(e) {
		d(this.#e, e);
	}
}, je = class t {
	static create(e) {
		return new t(e, J.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = I(this.opts.ref, (e) => this.root.labelNode = e);
	}
	#e = r(() => ({
		id: this.opts.id.current,
		[K["input-label"]]: "",
		for: this.opts.for?.current,
		style: W,
		...this.attachment
	}));
	get props() {
		return e(this.#e);
	}
	set props(e) {
		d(this.#e, e);
	}
}, Me = class t {
	static create(e) {
		return new t(e, ye.get());
	}
	opts;
	list;
	attachment;
	constructor(e, t) {
		this.opts = e, this.list = t, this.attachment = I(this.opts.ref, (e) => this.list.root.viewportNode = e), V([() => this.opts.ref.current, () => this.list.opts.ref.current], ([e, t]) => {
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
	#e = r(() => ({
		id: this.opts.id.current,
		[K.viewport]: "",
		...this.attachment
	}));
	get props() {
		return e(this.#e);
	}
	set props(e) {
		d(this.#e, e);
	}
}, Ne = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children"
]), Pe = s("<label><!></label>");
function Fe(t, n) {
	let o = i();
	c(n, !0);
	let s = f(n, "id", 19, () => U(o)), l = f(n, "ref", 15, null), u = S(n, Ne), d = je.create({
		id: F(() => s()),
		ref: F(() => l(), (e) => l(e))
	}), m = r(() => H(u, d.props));
	var h = Pe();
	C(h, () => ({ ...e(m) }));
	var g = O(h);
	D(g, () => n.children ?? y), k(h), p(t, h), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/command/components/command.svelte
var Ie = /* @__PURE__ */ new Set([
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
]), Le = s("<!> <!>", 1), Re = s("<div><!> <!></div>");
function ze(t, o) {
	let s = i();
	c(o, !0);
	let u = (e) => {
		Fe(e, {
			children: (e, t) => {
				g();
				var r = n();
				x(() => v(r, ee())), p(e, r);
			},
			$$slots: { default: !0 }
		});
	}, d = f(o, "id", 19, () => U(s)), h = f(o, "ref", 15, null), _ = f(o, "value", 15, ""), b = f(o, "onValueChange", 3, se), w = f(o, "onStateChange", 3, se), T = f(o, "loop", 3, !1), E = f(o, "shouldFilter", 3, !0), M = f(o, "filter", 3, jt), ee = f(o, "label", 3, ""), N = f(o, "vimBindings", 3, !0), P = f(o, "disablePointerSelection", 3, !1), I = f(o, "disableInitialScroll", 3, !1), L = f(o, "columns", 3, null), R = S(o, Ie), z = xe.create({
		id: F(() => d()),
		ref: F(() => h(), (e) => h(e)),
		filter: F(() => M()),
		shouldFilter: F(() => E()),
		loop: F(() => T()),
		value: F(() => _(), (e) => {
			_() !== e && (_(e), b()(e));
		}),
		vimBindings: F(() => N()),
		disablePointerSelection: F(() => P()),
		disableInitialScroll: F(() => I()),
		onStateChange: F(() => w()),
		columns: F(() => L())
	}), B = (e) => z.updateSelectedToIndex(e), V = (e) => z.updateSelectedByGroup(e), te = (e) => z.updateSelectedByItem(e), ne = () => z.getValidItems(), re = r(() => H(R, z.props));
	var ie = {
		updateSelectedToIndex: B,
		updateSelectedByGroup: V,
		updateSelectedByItem: te,
		getValidItems: ne
	}, ae = j(), oe = m(ae), ce = (t) => {
		var n = Le(), r = m(n);
		u(r);
		var i = A(r, 2);
		D(i, () => o.child, () => ({ props: e(re) })), p(t, n);
	}, le = (t) => {
		var n = Re();
		C(n, () => ({ ...e(re) }));
		var r = O(n);
		u(r);
		var i = A(r, 2);
		D(i, () => o.children ?? y), k(n), p(t, n);
	};
	return l(oe, (e) => {
		o.child ? e(ce) : e(le, -1);
	}), p(t, ae), a(ie);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/command/components/command-empty.svelte
var Be = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"forceMount"
]), Ve = s("<div><!></div>");
function He(t, n) {
	let o = i();
	c(n, !0);
	let s = f(n, "id", 19, () => U(o)), u = f(n, "ref", 15, null), d = f(n, "forceMount", 3, !1), h = S(n, Be), g = Se.create({
		id: F(() => s()),
		ref: F(() => u(), (e) => u(e)),
		forceMount: F(() => d())
	}), _ = r(() => H(g.props, h));
	var v = j(), b = m(v), x = (t) => {
		var r = j(), i = m(r), a = (t) => {
			var r = j(), i = m(r);
			D(i, () => n.child, () => ({ props: e(_) })), p(t, r);
		}, o = (t) => {
			var r = Ve();
			C(r, () => ({ ...e(_) }));
			var i = O(r);
			D(i, () => n.children ?? y), k(r), p(t, r);
		};
		l(i, (e) => {
			n.child ? e(a) : e(o, -1);
		}), p(t, r);
	};
	l(b, (e) => {
		g.shouldRender && e(x);
	}), p(t, v), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/command/components/command-group.svelte
var Ue = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"value",
	"forceMount",
	"children",
	"child"
]), We = s("<div><!></div>");
function Ge(t, n) {
	let o = i();
	c(n, !0);
	let s = f(n, "id", 19, () => U(o)), u = f(n, "ref", 15, null), d = f(n, "value", 3, ""), h = f(n, "forceMount", 3, !1), g = S(n, Ue), _ = Ce.create({
		id: F(() => s()),
		ref: F(() => u(), (e) => u(e)),
		forceMount: F(() => h()),
		value: F(() => d())
	}), v = r(() => H(g, _.props));
	var b = j(), x = m(b), w = (t) => {
		var r = j(), i = m(r);
		D(i, () => n.child, () => ({ props: e(v) })), p(t, r);
	}, T = (t) => {
		var r = We();
		C(r, () => ({ ...e(v) }));
		var i = O(r);
		D(i, () => n.children ?? y), k(r), p(t, r);
	};
	l(x, (e) => {
		n.child ? e(w) : e(T, -1);
	}), p(t, b), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/command/components/command-group-heading.svelte
var Ke = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), qe = s("<div><!></div>");
function Je(t, n) {
	let o = i();
	c(n, !0);
	let s = f(n, "id", 19, () => U(o)), u = f(n, "ref", 15, null), d = S(n, Ke), h = we.create({
		id: F(() => s()),
		ref: F(() => u(), (e) => u(e))
	}), g = r(() => H(d, h.props));
	var _ = j(), v = m(_), b = (t) => {
		var r = j(), i = m(r);
		D(i, () => n.child, () => ({ props: e(g) })), p(t, r);
	}, x = (t) => {
		var r = qe();
		C(r, () => ({ ...e(g) }));
		var i = O(r);
		D(i, () => n.children ?? y), k(r), p(t, r);
	};
	l(v, (e) => {
		n.child ? e(b) : e(x, -1);
	}), p(t, _), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/command/components/command-group-items.svelte
var Ye = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), Xe = s("<div><!></div>"), Ze = s("<div style=\"display: contents;\"><!></div>");
function Qe(t, n) {
	let o = i();
	c(n, !0);
	let s = f(n, "id", 19, () => U(o)), u = f(n, "ref", 15, null), d = S(n, Ye), h = Te.create({
		id: F(() => s()),
		ref: F(() => u(), (e) => u(e))
	}), g = r(() => H(d, h.props));
	var _ = Ze(), v = O(_), b = (t) => {
		var r = j(), i = m(r);
		D(i, () => n.child, () => ({ props: e(g) })), p(t, r);
	}, x = (t) => {
		var r = Xe();
		C(r, () => ({ ...e(g) }));
		var i = O(r);
		D(i, () => n.children ?? y), k(r), p(t, r);
	};
	l(v, (e) => {
		n.child ? e(b) : e(x, -1);
	}), k(_), p(t, _), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/command/components/command-input.svelte
var $e = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"autofocus",
	"id",
	"ref",
	"child"
]), et = s("<input/>");
function tt(t, n) {
	let o = i();
	c(n, !0);
	let s = f(n, "value", 15, ""), u = f(n, "autofocus", 3, !1), d = f(n, "id", 19, () => U(o)), h = f(n, "ref", 15, null), g = S(n, $e), v = Ee.create({
		id: F(() => d()),
		ref: F(() => h(), (e) => h(e)),
		value: F(() => s(), (e) => {
			s(e);
		}),
		autofocus: F(() => u() ?? !1)
	}), y = r(() => H(g, v.props));
	var b = j(), x = m(b), w = (t) => {
		var r = j(), i = m(r);
		D(i, () => n.child, () => ({ props: e(y) })), p(t, r);
	}, T = (t) => {
		var n = et();
		C(n, () => ({ ...e(y) }), void 0, void 0, void 0, void 0, !0), _(n, s), p(t, n);
	};
	l(x, (e) => {
		n.child ? e(w) : e(T, -1);
	}), p(t, b), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/command/components/command-item.svelte
var nt = /* @__PURE__ */ new Set([
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
]), rt = s("<div><!></div>"), it = s("<div style=\"display: contents;\" data-item-wrapper=\"\"><!></div>");
function at(n, o) {
	let s = i();
	c(o, !0);
	let u = f(o, "id", 19, () => U(s)), d = f(o, "ref", 15, null), g = f(o, "value", 3, ""), _ = f(o, "disabled", 3, !1), v = f(o, "onSelect", 3, se), b = f(o, "forceMount", 3, !1), w = f(o, "keywords", 19, () => []), T = S(o, nt), E = De.create({
		id: F(() => u()),
		ref: F(() => d(), (e) => d(e)),
		value: F(() => g()),
		disabled: F(() => _()),
		onSelect: F(() => v()),
		forceMount: F(() => b()),
		keywords: F(() => w())
	}), A = r(() => H(T, E.props));
	var M = j(), ee = m(M);
	t(ee, () => E.root.key, (t) => {
		var n = it(), r = O(n), i = (t) => {
			var n = j(), r = m(n), i = (t) => {
				var n = j(), r = m(n);
				D(r, () => o.child, () => ({ props: e(A) })), p(t, n);
			}, a = (t) => {
				var n = rt();
				C(n, () => ({ ...e(A) }));
				var r = O(n);
				D(r, () => o.children ?? y), k(n), p(t, n);
			};
			l(r, (e) => {
				o.child ? e(i) : e(a, -1);
			}), p(t, n);
		};
		l(r, (e) => {
			E.shouldRender && e(i);
		}), k(n), x(() => h(n, "data-value", E.trueValue)), p(t, n);
	}), p(n, M), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/command/components/command-list.svelte
var ot = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"aria-label"
]), st = s("<div><!></div>");
function ct(n, o) {
	let s = i();
	c(o, !0);
	let u = f(o, "id", 19, () => U(s)), d = f(o, "ref", 15, null), h = S(o, ot), g = Ae.create({
		id: F(() => u()),
		ref: F(() => d(), (e) => d(e)),
		ariaLabel: F(() => o["aria-label"] ?? "Suggestions...")
	}), _ = r(() => H(h, g.props));
	var v = j(), b = m(v);
	t(b, () => g.root._commandState.search === "", (t) => {
		var n = j(), r = m(n), i = (t) => {
			var n = j(), r = m(n);
			D(r, () => o.child, () => ({ props: e(_) })), p(t, n);
		}, a = (t) => {
			var n = st();
			C(n, () => ({ ...e(_) }));
			var r = O(n);
			D(r, () => o.children ?? y), k(n), p(t, n);
		};
		l(r, (e) => {
			o.child ? e(i) : e(a, -1);
		}), p(t, n);
	}), p(n, v), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/command/components/command-viewport.svelte
var lt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child"
]), ut = s("<div><!></div>");
function dt(t, n) {
	let o = i();
	c(n, !0);
	let s = f(n, "id", 19, () => U(o)), u = f(n, "ref", 15, null), d = S(n, lt), h = Me.create({
		id: F(() => s()),
		ref: F(() => u(), (e) => u(e))
	}), g = r(() => H(d, h.props));
	var _ = j(), v = m(_), b = (t) => {
		var r = j(), i = m(r);
		D(i, () => n.child, () => ({ props: e(g) })), p(t, r);
	}, x = (t) => {
		var r = ut();
		C(r, () => ({ ...e(g) }));
		var i = O(r);
		D(i, () => n.children ?? y), k(r), p(t, r);
	};
	l(v, (e) => {
		n.child ? e(b) : e(x, -1);
	}), p(t, _), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/command/components/command-loading.svelte
var ft = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"progress",
	"id",
	"ref",
	"children",
	"child"
]), pt = s("<div><!></div>");
function mt(t, n) {
	let o = i();
	c(n, !0);
	let s = f(n, "progress", 3, 0), u = f(n, "id", 19, () => U(o)), d = f(n, "ref", 15, null), h = S(n, ft), g = Oe.create({
		id: F(() => u()),
		ref: F(() => d(), (e) => d(e)),
		progress: F(() => s())
	}), _ = r(() => H(h, g.props));
	var v = j(), b = m(v), x = (t) => {
		var r = j(), i = m(r);
		D(i, () => n.child, () => ({ props: e(_) })), p(t, r);
	}, w = (t) => {
		var r = pt();
		C(r, () => ({ ...e(_) }));
		var i = O(r);
		D(i, () => n.children ?? y), k(r), p(t, r);
	};
	l(b, (e) => {
		n.child ? e(x) : e(w, -1);
	}), p(t, v), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/command/components/command-separator.svelte
var ht = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"forceMount",
	"children",
	"child"
]), gt = s("<div><!></div>");
function _t(t, n) {
	let o = i();
	c(n, !0);
	let s = f(n, "id", 19, () => U(o)), u = f(n, "ref", 15, null), d = f(n, "forceMount", 3, !1), h = S(n, ht), g = ke.create({
		id: F(() => s()),
		ref: F(() => u(), (e) => u(e)),
		forceMount: F(() => d())
	}), _ = r(() => H(h, g.props));
	var v = j(), b = m(v), x = (t) => {
		var r = j(), i = m(r), a = (t) => {
			var r = j(), i = m(r);
			D(i, () => n.child, () => ({ props: e(_) })), p(t, r);
		}, o = (t) => {
			var r = gt();
			C(r, () => ({ ...e(_) }));
			var i = O(r);
			D(i, () => n.children ?? y), k(r), p(t, r);
		};
		l(i, (e) => {
			n.child ? e(a) : e(o, -1);
		}), p(t, r);
	};
	l(b, (e) => {
		g.shouldRender && e(x);
	}), p(t, v), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/command/compute-command-score.js
var vt = 1, yt = .9, bt = .8, xt = .17, St = .1, Ct = .999, wt = .9999, Tt = .99, Et = /[\\/_+.#"@[({&]/, Dt = /[\\/_+.#"@[({&]/g, Ot = /[\s-]/, kt = /[\s-]/g;
function Z(e, t, n, r, i, a, o) {
	if (a === t.length) return i === e.length ? vt : Tt;
	let s = `${i},${a}`;
	if (o[s] !== void 0) return o[s];
	let c = r.charAt(a), l = n.indexOf(c, i), u = 0, d, f, p, m;
	for (; l >= 0;) d = Z(e, t, n, r, l + 1, a + 1, o), d > u && (l === i ? d *= vt : Et.test(e.charAt(l - 1)) ? (d *= bt, p = e.slice(i, l - 1).match(Dt), p && i > 0 && (d *= Ct ** p.length)) : Ot.test(e.charAt(l - 1)) ? (d *= yt, m = e.slice(i, l - 1).match(kt), m && i > 0 && (d *= Ct ** m.length)) : (d *= xt, i > 0 && (d *= Ct ** (l - i))), e.charAt(l) !== t.charAt(a) && (d *= wt)), (d < St && n.charAt(l - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(l - 1) !== r.charAt(a)) && (f = Z(e, t, n, r, l + 1, a + 2, o), f * St > d && (d = f * St)), d > u && (u = d), l = n.indexOf(c, l + 1);
	return o[s] = u, u;
}
function At(e) {
	return e.toLowerCase().replace(kt, " ");
}
function jt(e, t, n) {
	return e = n && n.length > 0 ? `${`${e} ${n?.join(" ")}`}` : e, Z(e, t, At(e), At(t), 0, 0, {});
}
//#endregion
//#region ../ui/src/lib/components/command/command-empty.svelte
var Mt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function Nt(t, n) {
	c(n, !0);
	let i = S(n, Mt);
	var s = j(), l = m(s);
	{
		let t = r(() => N("flex w-full items-center justify-center px-3 py-8 text-sm text-dark-300", n.class));
		o(l, () => He, (r, a) => {
			a(r, E(() => i, {
				get class() {
					return e(t);
				},
				children: (e, t) => {
					var r = j(), i = m(r);
					D(i, () => n.children ?? y), p(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	p(t, s), a();
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
}, Pt = {
	xs: `box-border ${Q.xs} ${$.xs}`,
	sm: `box-border ${Q.sm} ${$.sm}`,
	md: `box-border ${Q.md} ${$.md}`,
	lg: `box-border ${Q.lg} ${$.lg}`
}, Ft = {
	xs: "size-3",
	sm: "size-3.5",
	md: "size-4",
	lg: "size-5"
}, It = {
	xs: "min-w-7",
	sm: "min-w-8",
	md: "min-w-10",
	lg: "min-w-12"
}, Lt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"class"
]);
function Rt(t, n) {
	c(n, !0);
	let i = f(n, "value", 15, ""), s = S(n, Lt);
	var l = j(), u = m(l);
	{
		let t = r(() => N("w-full border-0 bg-dark-800 text-dark-50 outline-none placeholder:text-dark-300", "border-b border-dark-600 px-4 py-3", n.class));
		o(u, () => tt, (n, r) => {
			r(n, E(() => s, {
				get class() {
					return e(t);
				},
				get value() {
					return i();
				},
				set value(e) {
					i(e);
				}
			}));
		});
	}
	p(t, l), a();
}
//#endregion
//#region ../ui/src/lib/components/command/command-item.svelte
var zt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function Bt(t, n) {
	c(n, !0);
	let i = S(n, zt);
	var s = j(), l = m(s);
	{
		let t = r(() => N("flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm text-dark-50 outline-none select-none", ee, "data-disabled:cursor-default data-disabled:opacity-50 data-selected:bg-dark-700", n.class));
		o(l, () => at, (r, a) => {
			a(r, E(() => i, {
				get class() {
					return e(t);
				},
				children: (e, t) => {
					var r = j(), i = m(r);
					D(i, () => n.children ?? y), p(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	p(t, s), a();
}
//#endregion
//#region ../ui/src/lib/components/command/command-list.svelte
var Vt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"id",
	"class"
]);
function Ht(t, n) {
	c(n, !0);
	let i = S(n, Vt);
	var s = j(), l = m(s);
	{
		let t = r(() => N("px-2 pb-2", n.class));
		o(l, () => ct, (r, a) => {
			a(r, E({ get id() {
				return n.id;
			} }, () => i, {
				get class() {
					return e(t);
				},
				children: (e, t) => {
					ue(e, {
						orientation: "vertical",
						viewportClasses: "max-h-80 overflow-hidden",
						children: (e, t) => {
							var r = j(), i = m(r);
							D(i, () => n.children ?? y), p(e, r);
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { default: !0 }
			}));
		});
	}
	p(t, s), a();
}
//#endregion
//#region ../ui/src/lib/components/command/command-loading.svelte
var Ut = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function Wt(t, n) {
	c(n, !0);
	let i = S(n, Ut);
	var s = j(), l = m(s);
	{
		let t = r(() => N("flex w-full items-center justify-center px-3 py-8 text-sm text-dark-300", n.class));
		o(l, () => mt, (r, a) => {
			a(r, E(() => i, {
				get class() {
					return e(t);
				},
				children: (e, t) => {
					var r = j(), i = m(r);
					D(i, () => n.children ?? y), p(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	p(t, s), a();
}
//#endregion
//#region ../ui/src/lib/components/command/command-root.svelte
var Gt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function Kt(t, n) {
	c(n, !0);
	let i = S(n, Gt);
	var s = j(), l = m(s);
	{
		let t = r(() => N("flex w-full flex-col divide-y divide-dark-600 overflow-hidden rounded-xl border border-dark-600 bg-dark-800 shadow-md", n.class));
		o(l, () => ze, (r, a) => {
			a(r, E(() => i, {
				get class() {
					return e(t);
				},
				children: (e, t) => {
					var r = j(), i = m(r);
					D(i, () => n.children ?? y), p(e, r);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	p(t, s), a();
}
//#endregion
//#region ../ui/src/lib/components/command/index.ts
var qt = dt, Jt = Ge, Yt = Je, Xt = Qe, Zt = _t;
//#endregion
export { de as _, qt as a, Ht as c, It as d, Ft as f, Nt as g, Pt as h, Zt as i, Bt as l, Q as m, Yt as n, Kt as o, $ as p, Xt as r, Wt as s, Jt as t, Rt as u, W as v };
