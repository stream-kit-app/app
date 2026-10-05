import { Bn as e, Dr as t, Hn as n, Kn as r, Ln as i, Nn as a, _r as o, mr as s, vr as c, yn as l, yr as u } from "./client-BFeMv2Ma.js";
//#region ../../node_modules/.pnpm/svelte@5.57.1_@typescript-eslint+types@8.71.0/node_modules/svelte/src/reactivity/date.js
var d = !1, f = class r extends Date {
	#e = /* @__PURE__ */ u(super.getTime());
	#t = /* @__PURE__ */ new Map();
	#n = i;
	constructor(...e) {
		super(...e), d || this.#r();
	}
	#r() {
		d = !0;
		var a = r.prototype, s = Date.prototype, c = Object.getOwnPropertyNames(s);
		for (let r of c) (r.startsWith("get") || r.startsWith("to") || r === "valueOf") && (a[r] = function(...a) {
			if (a.length > 0) return e(this.#e), s[r].apply(this, a);
			var o = this.#t.get(r);
			if (o === void 0) {
				let c = i;
				n(this.#n), o = /* @__PURE__ */ t(() => (e(this.#e), s[r].apply(this, a))), this.#t.set(r, o), n(c);
			}
			return e(o);
		}), r.startsWith("set") && (a[r] = function(...e) {
			var t = s[r].apply(this, e);
			return o(this.#e, s.getTime.call(this)), t;
		});
	}
}, p = [
	"forEach",
	"isDisjointFrom",
	"isSubsetOf",
	"isSupersetOf"
], m = [
	"difference",
	"intersection",
	"symmetricDifference",
	"union"
], h = !1, g = class t extends Set {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ u(0);
	#n = /* @__PURE__ */ u(0);
	#r = r || -1;
	constructor(e) {
		if (super(), e) {
			for (var t of e) super.add(t);
			this.#n.v = super.size;
		}
		h || this.#a();
	}
	#i(e) {
		return r === this.#r ? /* @__PURE__ */ u(e) : c(e);
	}
	#a() {
		h = !0;
		var n = t.prototype, r = Set.prototype;
		for (let t of p) n[t] = function(...n) {
			return e(this.#t), r[t].apply(this, n);
		};
		for (let i of m) n[i] = function(...n) {
			e(this.#t);
			var a = r[i].apply(this, n);
			return new t(a);
		};
	}
	has(t) {
		var n = super.has(t), r = this.#e, i = r.get(t);
		if (i === void 0) {
			if (!n) return e(this.#t), !1;
			i = this.#i(!0), r.set(t, i);
		}
		return e(i), n;
	}
	add(e) {
		return super.has(e) || (super.add(e), o(this.#n, super.size), s(this.#t)), this;
	}
	delete(e) {
		var t = super.delete(e), n = this.#e, r = n.get(e);
		return r !== void 0 && (n.delete(e), o(r, !1)), t && (o(this.#n, super.size), s(this.#t)), t;
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var e = this.#e;
			for (var t of e.values()) o(t, !1);
			e.clear(), o(this.#n, 0), s(this.#t);
		}
	}
	keys() {
		return this.values();
	}
	values() {
		return e(this.#t), super.values();
	}
	entries() {
		return e(this.#t), super.entries();
	}
	[Symbol.iterator]() {
		return this.keys();
	}
	get size() {
		return e(this.#n);
	}
}, _ = class extends Map {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ u(0);
	#n = /* @__PURE__ */ u(0);
	#r = r || -1;
	constructor(e) {
		if (super(), e) {
			for (var [t, n] of e) super.set(t, n);
			this.#n.v = super.size;
		}
	}
	#i(e) {
		return r === this.#r ? /* @__PURE__ */ u(e) : c(e);
	}
	has(t) {
		var n = this.#e, r = n.get(t);
		if (r === void 0) {
			if (super.has(t)) r = this.#i(0), n.set(t, r);
			else return e(this.#t), !1;
		}
		return e(r), !0;
	}
	forEach(e, t) {
		this.#a(), super.forEach(e, t);
	}
	get(t) {
		var n = this.#e, r = n.get(t);
		if (r === void 0) {
			if (super.has(t)) r = this.#i(0), n.set(t, r);
			else {
				e(this.#t);
				return;
			}
		}
		return e(r), super.get(t);
	}
	getOrInsert(e, t) {
		return super.has(e) || this.set(e, t), this.get(e);
	}
	getOrInsertComputed(e, t) {
		return super.has(e) || this.set(e, t(e)), this.get(e);
	}
	set(e, t) {
		var n = this.#e, r = n.get(e), i = super.get(e), a = super.set(e, t), c = this.#t;
		if (r === void 0) r = this.#i(0), n.set(e, r), o(this.#n, super.size), s(c);
		else if (i !== t) {
			s(r);
			var l = c.reactions === null ? null : new Set(c.reactions);
			(l === null || !r.reactions?.every((e) => l.has(e))) && s(c);
		}
		return a;
	}
	delete(e) {
		var t = this.#e, n = t.get(e), r = super.delete(e);
		return n !== void 0 && (t.delete(e), o(n, -1)), r && (o(this.#n, super.size), s(this.#t)), r;
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var e = this.#e;
			o(this.#n, 0);
			for (var t of e.values()) o(t, -1);
			s(this.#t), e.clear();
		}
	}
	#a() {
		e(this.#t);
		var t = this.#e;
		if (this.#n.v !== t.size) {
			for (var n of super.keys()) if (!t.has(n)) {
				var r = this.#i(0);
				t.set(n, r);
			}
		}
		for ([, r] of this.#e) e(r);
	}
	keys() {
		return e(this.#t), super.keys();
	}
	values() {
		return this.#a(), super.values();
	}
	entries() {
		return this.#a(), super.entries();
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		return e(this.#n), super.size;
	}
}, v = Symbol("replace"), y = class extends URLSearchParams {
	#e = /* @__PURE__ */ u(0);
	#t = x();
	#n = !1;
	#r() {
		if (!this.#t || this.#n) return;
		this.#n = !0;
		let e = this.toString();
		this.#t.search = e && `?${e}`, this.#n = !1;
	}
	[v](e) {
		if (!this.#n && e.toString() !== super.toString()) {
			this.#n = !0;
			for (let e of [...super.keys()]) super.delete(e);
			for (let [t, n] of e) super.append(t, n);
			s(this.#e), this.#n = !1;
		}
	}
	append(e, t) {
		super.append(e, t), this.#r(), s(this.#e);
	}
	delete(e, t) {
		var n = super.has(e, t);
		super.delete(e, t), n && (this.#r(), s(this.#e));
	}
	get(t) {
		return e(this.#e), super.get(t);
	}
	getAll(t) {
		return e(this.#e), super.getAll(t);
	}
	has(t, n) {
		return e(this.#e), super.has(t, n);
	}
	keys() {
		return e(this.#e), super.keys();
	}
	forEach(t, n) {
		e(this.#e), super.forEach(t, n);
	}
	set(e, t) {
		var n = super.getAll(e);
		super.set(e, t);
		var r = super.getAll(e);
		(n.length !== r.length || n.some((e, t) => e !== r[t])) && (this.#r(), s(this.#e));
	}
	sort() {
		super.sort(), this.#r(), s(this.#e);
	}
	toString() {
		return e(this.#e), super.toString();
	}
	values() {
		return e(this.#e), super.values();
	}
	entries() {
		return e(this.#e), super.entries();
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		return e(this.#e), super.size;
	}
}, b = null;
function x() {
	return b;
}
var S = class extends URL {
	#e = /* @__PURE__ */ u(super.protocol);
	#t = /* @__PURE__ */ u(super.username);
	#n = /* @__PURE__ */ u(super.password);
	#r = /* @__PURE__ */ u(super.hostname);
	#i = /* @__PURE__ */ u(super.port);
	#a = /* @__PURE__ */ u(super.pathname);
	#o = /* @__PURE__ */ u(super.hash);
	#s = /* @__PURE__ */ u(super.search);
	#c;
	constructor(e, t) {
		e = new URL(e, t), super(e), b = this, this.#c = new y(e.searchParams), b = null;
	}
	get hash() {
		return e(this.#o);
	}
	set hash(e) {
		super.hash = e, o(this.#o, super.hash);
	}
	get host() {
		return e(this.#r), e(this.#i), super.host;
	}
	set host(e) {
		super.host = e, o(this.#r, super.hostname), o(this.#i, super.port);
	}
	get hostname() {
		return e(this.#r);
	}
	set hostname(e) {
		super.hostname = e, o(this.#r, super.hostname);
	}
	get href() {
		return e(this.#e), e(this.#t), e(this.#n), e(this.#r), e(this.#i), e(this.#a), e(this.#o), e(this.#s), super.href;
	}
	set href(e) {
		super.href = e, o(this.#e, super.protocol), o(this.#t, super.username), o(this.#n, super.password), o(this.#r, super.hostname), o(this.#i, super.port), o(this.#a, super.pathname), o(this.#o, super.hash), o(this.#s, super.search), this.#c[v](super.searchParams);
	}
	get password() {
		return e(this.#n);
	}
	set password(e) {
		super.password = e, o(this.#n, super.password);
	}
	get pathname() {
		return e(this.#a);
	}
	set pathname(e) {
		super.pathname = e, o(this.#a, super.pathname);
	}
	get port() {
		return e(this.#i);
	}
	set port(e) {
		super.port = e, o(this.#i, super.port);
	}
	get protocol() {
		return e(this.#e);
	}
	set protocol(e) {
		super.protocol = e, o(this.#e, super.protocol), o(this.#i, super.port);
	}
	get search() {
		return e(this.#s);
	}
	set search(e) {
		super.search = e, o(this.#s, super.search), this.#c[v](super.searchParams);
	}
	get username() {
		return e(this.#t);
	}
	set username(e) {
		super.username = e, o(this.#t, super.username);
	}
	get origin() {
		return e(this.#e), e(this.#r), e(this.#i), super.origin;
	}
	get searchParams() {
		return this.#c;
	}
	toString() {
		return this.href;
	}
	toJSON() {
		return this.href;
	}
}, C = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = l(t);
	}
	get current() {
		return this.#t(), this.#e();
	}
}, w = /\(.+\)/, T = /* @__PURE__ */ new Set([
	"all",
	"print",
	"screen",
	"and",
	"or",
	"not",
	"only"
]), E = class extends C {
	constructor(e, t) {
		let n = w.test(e) || e.split(/[\s,]+/).some((e) => T.has(e.trim())) ? e : `(${e})`, r = window.matchMedia(n);
		super(() => r.matches, (e) => a(r, "change", e));
	}
};
//#endregion
export { g as a, _ as i, S as n, f as o, y as r, E as t };
