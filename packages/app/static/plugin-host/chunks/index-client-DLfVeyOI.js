import { An as e, On as t, Pn as n, Sr as r, Tn as i, cr as a, or as o, pr as s, rr as c, sr as l, xn as u } from "./client-xxWnFgeR.js";
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/reactivity/date.js
var d = !1, f = class n extends Date {
	#e = /* @__PURE__ */ a(super.getTime());
	#t = /* @__PURE__ */ new Map();
	#n = i;
	constructor(...e) {
		super(...e), d || this.#r();
	}
	#r() {
		d = !0;
		var r = n.prototype, a = Date.prototype, c = Object.getOwnPropertyNames(a);
		for (let n of c) (n.startsWith("get") || n.startsWith("to") || n === "valueOf") && (r[n] = function(...r) {
			if (r.length > 0) return t(this.#e), a[n].apply(this, r);
			var o = this.#t.get(n);
			if (o === void 0) {
				let c = i;
				e(this.#n), o = /* @__PURE__ */ s(() => (t(this.#e), a[n].apply(this, r))), this.#t.set(n, o), e(c);
			}
			return t(o);
		}), n.startsWith("set") && (r[n] = function(...e) {
			var t = a[n].apply(this, e);
			return o(this.#e, a.getTime.call(this)), t;
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
], h = !1, g = class e extends Set {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ a(0);
	#n = /* @__PURE__ */ a(0);
	#r = n || -1;
	constructor(e) {
		if (super(), e) {
			for (var t of e) super.add(t);
			this.#n.v = super.size;
		}
		h || this.#a();
	}
	#i(e) {
		return n === this.#r ? /* @__PURE__ */ a(e) : l(e);
	}
	#a() {
		h = !0;
		var n = e.prototype, r = Set.prototype;
		for (let e of p) n[e] = function(...n) {
			return t(this.#t), r[e].apply(this, n);
		};
		for (let i of m) n[i] = function(...n) {
			return t(this.#t), new e(r[i].apply(this, n));
		};
	}
	has(e) {
		var n = super.has(e), r = this.#e, i = r.get(e);
		if (i === void 0) {
			if (!n) return t(this.#t), !1;
			i = this.#i(!0), r.set(e, i);
		}
		return t(i), n;
	}
	add(e) {
		return super.has(e) || (super.add(e), o(this.#n, super.size), c(this.#t)), this;
	}
	delete(e) {
		var t = super.delete(e), n = this.#e, r = n.get(e);
		return r !== void 0 && (n.delete(e), o(r, !1)), t && (o(this.#n, super.size), c(this.#t)), t;
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var e = this.#e;
			for (var t of e.values()) o(t, !1);
			e.clear(), o(this.#n, 0), c(this.#t);
		}
	}
	keys() {
		return this.values();
	}
	values() {
		return t(this.#t), super.values();
	}
	entries() {
		return t(this.#t), super.entries();
	}
	[Symbol.iterator]() {
		return this.keys();
	}
	get size() {
		return t(this.#n);
	}
}, _ = class extends Map {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ a(0);
	#n = /* @__PURE__ */ a(0);
	#r = n || -1;
	constructor(e) {
		if (super(), e) {
			for (var [t, n] of e) super.set(t, n);
			this.#n.v = super.size;
		}
	}
	#i(e) {
		return n === this.#r ? /* @__PURE__ */ a(e) : l(e);
	}
	has(e) {
		var n = this.#e, r = n.get(e);
		if (r === void 0) if (super.has(e)) r = this.#i(0), n.set(e, r);
		else return t(this.#t), !1;
		return t(r), !0;
	}
	forEach(e, t) {
		this.#a(), super.forEach(e, t);
	}
	get(e) {
		var n = this.#e, r = n.get(e);
		if (r === void 0) if (super.has(e)) r = this.#i(0), n.set(e, r);
		else {
			t(this.#t);
			return;
		}
		return t(r), super.get(e);
	}
	set(e, t) {
		var n = this.#e, r = n.get(e), i = super.get(e), a = super.set(e, t), s = this.#t;
		if (r === void 0) r = this.#i(0), n.set(e, r), o(this.#n, super.size), c(s);
		else if (i !== t) {
			c(r);
			var l = s.reactions === null ? null : new Set(s.reactions);
			(l === null || !r.reactions?.every((e) => l.has(e))) && c(s);
		}
		return a;
	}
	delete(e) {
		var t = this.#e, n = t.get(e), r = super.delete(e);
		return n !== void 0 && (t.delete(e), o(n, -1)), r && (o(this.#n, super.size), c(this.#t)), r;
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var e = this.#e;
			o(this.#n, 0);
			for (var t of e.values()) o(t, -1);
			c(this.#t), e.clear();
		}
	}
	#a() {
		t(this.#t);
		var e = this.#e;
		if (this.#n.v !== e.size) {
			for (var n of super.keys()) if (!e.has(n)) {
				var r = this.#i(0);
				e.set(n, r);
			}
		}
		for ([, r] of this.#e) t(r);
	}
	keys() {
		return t(this.#t), super.keys();
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
		return t(this.#n), super.size;
	}
}, v = Symbol("replace"), y = class extends URLSearchParams {
	#e = /* @__PURE__ */ a(0);
	#t = x();
	#n = !1;
	#r() {
		if (!this.#t || this.#n) return;
		this.#n = !0;
		let e = this.toString();
		this.#t.search = e && `?${e}`, this.#n = !1;
	}
	[v](e) {
		if (!this.#n) {
			this.#n = !0;
			for (let e of [...super.keys()]) super.delete(e);
			for (let [t, n] of e) super.append(t, n);
			c(this.#e), this.#n = !1;
		}
	}
	append(e, t) {
		super.append(e, t), this.#r(), c(this.#e);
	}
	delete(e, t) {
		var n = super.has(e, t);
		super.delete(e, t), n && (this.#r(), c(this.#e));
	}
	get(e) {
		return t(this.#e), super.get(e);
	}
	getAll(e) {
		return t(this.#e), super.getAll(e);
	}
	has(e, n) {
		return t(this.#e), super.has(e, n);
	}
	keys() {
		return t(this.#e), super.keys();
	}
	set(e, t) {
		var n = super.getAll(e);
		super.set(e, t);
		var r = super.getAll(e);
		(n.length !== r.length || n.some((e, t) => e !== r[t])) && (this.#r(), c(this.#e));
	}
	sort() {
		super.sort(), this.#r(), c(this.#e);
	}
	toString() {
		return t(this.#e), super.toString();
	}
	values() {
		return t(this.#e), super.values();
	}
	entries() {
		return t(this.#e), super.entries();
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		return t(this.#e), super.size;
	}
}, b = null;
function x() {
	return b;
}
var S = class extends URL {
	#e = /* @__PURE__ */ a(super.protocol);
	#t = /* @__PURE__ */ a(super.username);
	#n = /* @__PURE__ */ a(super.password);
	#r = /* @__PURE__ */ a(super.hostname);
	#i = /* @__PURE__ */ a(super.port);
	#a = /* @__PURE__ */ a(super.pathname);
	#o = /* @__PURE__ */ a(super.hash);
	#s = /* @__PURE__ */ a(super.search);
	#c;
	constructor(e, t) {
		e = new URL(e, t), super(e), b = this, this.#c = new y(e.searchParams), b = null;
	}
	get hash() {
		return t(this.#o);
	}
	set hash(e) {
		super.hash = e, o(this.#o, super.hash);
	}
	get host() {
		return t(this.#r), t(this.#i), super.host;
	}
	set host(e) {
		super.host = e, o(this.#r, super.hostname), o(this.#i, super.port);
	}
	get hostname() {
		return t(this.#r);
	}
	set hostname(e) {
		super.hostname = e, o(this.#r, super.hostname);
	}
	get href() {
		return t(this.#e), t(this.#t), t(this.#n), t(this.#r), t(this.#i), t(this.#a), t(this.#o), t(this.#s), super.href;
	}
	set href(e) {
		super.href = e, o(this.#e, super.protocol), o(this.#t, super.username), o(this.#n, super.password), o(this.#r, super.hostname), o(this.#i, super.port), o(this.#a, super.pathname), o(this.#o, super.hash), o(this.#s, super.search), this.#c[v](super.searchParams);
	}
	get password() {
		return t(this.#n);
	}
	set password(e) {
		super.password = e, o(this.#n, super.password);
	}
	get pathname() {
		return t(this.#a);
	}
	set pathname(e) {
		super.pathname = e, o(this.#a, super.pathname);
	}
	get port() {
		return t(this.#i);
	}
	set port(e) {
		super.port = e, o(this.#i, super.port);
	}
	get protocol() {
		return t(this.#e);
	}
	set protocol(e) {
		super.protocol = e, o(this.#e, super.protocol);
	}
	get search() {
		return t(this.#s);
	}
	set search(e) {
		super.search = e, o(this.#s, super.search), this.#c[v](super.searchParams);
	}
	get username() {
		return t(this.#t);
	}
	set username(e) {
		super.username = e, o(this.#t, super.username);
	}
	get origin() {
		return t(this.#e), t(this.#r), t(this.#i), super.origin;
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
		this.#e = e, this.#t = r(t);
	}
	get current() {
		return this.#t(), this.#e();
	}
}, w = /\(.+\)/, T = new Set([
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
		super(() => r.matches, (e) => u(r, "change", e));
	}
};
//#endregion
export { g as a, _ as i, S as n, f as o, y as r, E as t };
