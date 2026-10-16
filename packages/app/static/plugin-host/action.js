import { Bn as e, Rr as t, Yr as n, _r as r, pr as i, yr as a } from "./chunks/client-BFeMv2Ma.js";
import { a as o } from "./chunks/dist-DRvBcEUk.js";
//#region src/lib/core/action/condition-tree.ts
function s() {
	return {
		kind: "group",
		id: "root",
		children: []
	};
}
function c(e, t) {
	return (e.type === "select-text" || e.type === "text-select-text") && typeof t == "object" && !!t;
}
function l(e) {
	return e.defaultValue === void 0 ? e.type === "text-select-text" ? {
		path: "",
		type: "equals",
		value: ""
	} : e.type === "select-text" ? {
		type: "",
		value: ""
	} : e.type === "checkbox" || (e.type === "cron-expression" || e.type, "") : c(e, e.defaultValue) ? { ...e.defaultValue } : e.defaultValue;
}
function u(e, t) {
	return e?.find((e) => e.key === t);
}
function d(e, t, n) {
	let r = u(n, t);
	r && e.children.push({
		kind: "condition",
		id: crypto.randomUUID(),
		key: t,
		value: l(r),
		...e.children.length > 0 ? { operator: "and" } : {}
	});
}
function f(e) {
	e.id === "root" && e.children.push({
		kind: "group",
		id: crypto.randomUUID(),
		children: [],
		...e.children.length > 0 ? { operator: "and" } : {}
	});
}
function p(e) {
	for (let [t, n] of e.children.entries()) t === 0 ? delete n.operator : n.operator ||= "and", n.kind === "group" && p(n);
}
function m(e, t) {
	e.children.splice(t, 1), p(e);
}
function h(e, t) {
	e.operator = t;
}
function g(e) {
	return typeof e == "object" && !!e && "kind" in e && e.kind === "group" && "children" in e && Array.isArray(e.children);
}
function _(e) {
	let t = (e) => e.kind === "group" ? {
		...e,
		id: crypto.randomUUID(),
		children: e.children.map(t)
	} : {
		...e,
		id: crypto.randomUUID(),
		value: typeof e.value == "object" ? { ...e.value } : e.value
	};
	return {
		...e,
		children: e.children.map(t)
	};
}
function v(e, t) {
	return {
		kind: "group",
		id: "root",
		children: [{
			kind: "condition",
			id: crypto.randomUUID(),
			key: t,
			value: {
				path: e.path,
				type: e.type,
				value: e.value
			},
			...e.negate ? { negate: !0 } : {}
		}]
	};
}
//#endregion
//#region src/lib/core/action/handler-field.ts
function y(e, t) {
	if (e.type !== "one-of") return t;
	let n = e.defaultVariant ?? e.variants[0]?.id ?? "", r = e.variants.find((e) => e.id === t.variant), i = t.values[t.variant];
	if (r && i !== void 0 && !C(r.field, i)) return t;
	for (let n of e.variants) {
		let e = t.values[n.id];
		if (e !== void 0 && !C(n.field, e)) return t.variant === n.id ? t : {
			...t,
			variant: n.id
		};
	}
	return t.variant ? t : {
		...t,
		variant: n
	};
}
function b(e, t) {
	return e.type === "one-of" && o(t) ? y(e, t) : t;
}
function x(e, t) {
	return (e ?? []).map((e) => {
		let n = t?.find((t) => t.key === e.key), r = ee(e, n?.value) ?? te(e, n?.value) ?? re(e, t) ?? ne(e);
		return {
			id: n?.id ?? crypto.randomUUID(),
			key: e.key,
			value: b(e, r)
		};
	});
}
function ee(e, t) {
	if (e.type !== "condition-group" || t === void 0 || g(t)) return;
	let n = e.migrateFromTextSelectText;
	if (n && typeof t == "object" && "path" in t) return v(t, n);
}
function te(e, t) {
	if (t === void 0 || e.type !== "one-of" || o(t) || typeof t != "string" && typeof t != "number" && typeof t != "boolean") return t;
	let n = e.defaultVariant ?? e.variants[0]?.id ?? "", r = t, i = {};
	for (let t of e.variants) i[t.id] = t.id === n ? r : S(t.field);
	return {
		variant: n,
		values: i
	};
}
function S(e) {
	return e.type === "condition-group" ? e.defaultValue ? _(e.defaultValue) : s() : e.defaultValue === void 0 ? e.type === "key-value-list" ? [] : e.type === "slider" ? e.defaultValue ?? e.min : e.type === "text-select-text" ? {
		path: "",
		type: "equals",
		value: "",
		negate: !1
	} : e.type === "text" || e.type === "select" || e.type === "combobox" || e.type === "select-file-or-folder" || e.type === "code" || e.type === "json" || e.type === "hotkey" || e.type === "color" ? "" : !1 : e.defaultValue;
}
function ne(e) {
	if (e.type === "one-of") {
		let t = e.defaultVariant ?? e.variants[0]?.id ?? "", n = {};
		for (let t of e.variants) n[t.id] = S(t.field);
		return {
			variant: t,
			values: n
		};
	}
	return S(e);
}
function re(e, t) {
	if (e.type === "one-of" && t?.length && e.migrateFrom?.length && !t.some((t) => t.key === e.key)) for (let n of e.migrateFrom) {
		let r = /* @__PURE__ */ new Map();
		for (let e of n.keys) {
			let i = t.find((t) => t.key === e);
			if (!i) continue;
			let a = n.variantMap[e];
			a && r.set(a, i.value);
		}
		if (r.size === 0) continue;
		let i = e.defaultVariant ?? e.variants[0]?.id ?? "";
		for (let r of n.keys) {
			let a = n.variantMap[r], o = t.find((e) => e.key === r)?.value;
			if (a && typeof o == "string" && o.trim() && !C(e.variants.find((e) => e.id === a)?.field, o)) {
				i = a;
				break;
			}
		}
		let a = {};
		for (let t of e.variants) a[t.id] = r.get(t.id) ?? S(t.field);
		return {
			variant: i,
			values: a
		};
	}
}
function C(e, t) {
	return !e || e.type === "one-of" || T({
		...e,
		key: "inner"
	}, t);
}
function ie(e, t) {
	return e?.find((e) => e.key === t);
}
function w(e, t) {
	return e.find((e) => e.key === t)?.value;
}
function T(e, t) {
	if (e.type === "one-of") {
		if (!t || typeof t != "object" || !("variant" in t) || !("values" in t)) return !0;
		let n = t, r = e.variants.find((e) => e.id === n.variant);
		if (!r) return !0;
		let i = n.values[n.variant];
		return C(r.field, i);
	}
	if (e.type === "condition-group") return !g(t) || t.children.length === 0;
	if (e.type === "key-value-list") return !Array.isArray(t) || t.length === 0 || t.every((e) => !e.key.trim());
	if (e.type === "text-select-text") {
		if (!t || typeof t != "object" || !("path" in t)) return !0;
		let n = t;
		return (e.valuelessOperators ?? []).includes(n.type) ? !n.path.trim() : !n.path.trim() || !n.value.trim();
	}
	return e.type === "text" || e.type === "select" || e.type === "combobox" || e.type === "select-file-or-folder" || e.type === "code" || e.type === "json" || e.type === "hotkey" || e.type === "color" ? !String(t ?? "").trim() : !1;
}
function E(e) {
	return e.children.flatMap((e) => e.kind === "condition" ? [e] : E(e));
}
function D(e) {
	return e.fields ? e.fields : e.config ? E(e.config).map((e) => ({
		id: e.id,
		key: e.key,
		value: typeof e.value == "object" && e.value !== null && "value" in e.value ? String(e.value.value) : e.value
	})) : [];
}
//#endregion
//#region src/lib/core/action/action-handler.svelte.ts
var O = class t {
	id;
	definition;
	#e = a(i([]));
	get fields() {
		return e(this.#e);
	}
	set fields(e) {
		r(this.#e, e, !0);
	}
	#t = a(i([]));
	get thenHandlers() {
		return e(this.#t);
	}
	set thenHandlers(e) {
		r(this.#t, e, !0);
	}
	#n = a(i([]));
	get elseHandlers() {
		return e(this.#n);
	}
	set elseHandlers(e) {
		r(this.#n, e, !0);
	}
	#r = a(!0);
	get blocking() {
		return e(this.#r);
	}
	set blocking(e) {
		r(this.#r, e, !0);
	}
	constructor(e, t) {
		this.id = t?.id ?? crypto.randomUUID(), this.definition = e;
		let n = x(e.fields, t?.fields);
		this.fields = n.length > 0 ? n : t?.fields?.map((e) => ({ ...e })) ?? [], this.thenHandlers = t?.thenHandlers ?? [], this.elseHandlers = t?.elseHandlers ?? [], this.blocking = t?.blocking ?? !0;
	}
	get fieldDefinitions() {
		return this.definition.fields;
	}
	getField(e) {
		return this.fields.find((t) => t.key === e);
	}
	getFieldDefinition(e) {
		return ie(this.definition.fields, e);
	}
	getFieldError(e, t) {
		return t?.fieldErrors[e];
	}
	getBranchHandlers(e) {
		return e === "then" ? this.thenHandlers : this.elseHandlers;
	}
	setBranchHandlers(e, t) {
		if (e === "then") {
			this.thenHandlers = t;
			return;
		}
		this.elseHandlers = t;
	}
	toStored() {
		let e = {
			id: this.id,
			handlerTypeId: this.definition.id,
			fields: n(this.fields)
		};
		return this.blocking || (e.blocking = !1), this.thenHandlers.length > 0 && (e.thenHandlers = this.thenHandlers.map((e) => e.toStored())), this.elseHandlers.length > 0 && (e.elseHandlers = this.elseHandlers.map((e) => e.toStored())), e;
	}
	static clone(e) {
		return new t(e.definition, {
			fields: structuredClone(n(e.fields)),
			thenHandlers: e.thenHandlers.map((e) => t.clone(e)),
			elseHandlers: e.elseHandlers.map((e) => t.clone(e)),
			blocking: e.blocking
		});
	}
};
//#endregion
//#region src/lib/utils.ts
function k(e, t = "item") {
	return (e ?? t).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || t;
}
function A(e, t, n = "item") {
	let r = k(e, n), i = r, a = 2;
	for (; t.has(i);) i = `${r}-${a}`, a += 1;
	return t.add(i), i;
}
//#endregion
//#region src/lib/core/action/trigger/trigger-definition.svelte.ts
function ae(e) {
	let t = /* @__PURE__ */ new Set();
	return e?.map((e) => ({
		...e,
		key: "key" in e && typeof e.key == "string" ? e.key : A(e.name, t, "condition")
	}));
}
//#endregion
//#region src/lib/core/action/handler/handler-definition.svelte.ts
var oe = class {
	#e = a([]);
	get items() {
		return e(this.#e);
	}
	set items(e) {
		r(this.#e, e);
	}
	add(e, t = {}) {
		let n = {
			...e,
			id: ce(e.id, e.name, t.idScope, "handler"),
			fields: M(e.fields)
		};
		if (this.find(n.id)) throw Error(`Handler definition with id ${n.id} already exists`);
		let r = new j(n);
		return this.items = [...this.items, r], r;
	}
	find(e) {
		for (let t of this.items) {
			let n = t.find(e);
			if (n) return n;
		}
	}
	remove(e) {
		this.items = this.items.filter((t) => t.id !== e);
	}
}, j = class {
	id;
	name;
	#e = a(!0);
	get isAvailable() {
		return e(this.#e);
	}
	set isAvailable(e) {
		r(this.#e, e, !0);
	}
	fields;
	execute;
	outputs;
	timeout;
	children = new oe();
	constructor(e) {
		this.id = e.id, this.name = e.name, this.fields = M(e.fields), this.execute = e.execute, this.outputs = e.outputs, this.timeout = e.timeout, e.children?.forEach((e) => this.children.add(e, { idScope: this.id }));
	}
	get isGroup() {
		return this.children.items.length > 0;
	}
	find(e) {
		return this.id === e ? this : this.children.find(e);
	}
	setAvailable(e) {
		this.isAvailable = e;
		for (let t of this.children.items) t.setAvailable(e);
	}
};
function M(e) {
	let t = /* @__PURE__ */ new Set();
	return e?.map((e) => ({
		...e,
		...e.type === "condition-group" ? { conditions: ae(e.conditions) ?? [] } : {},
		key: "key" in e && typeof e.key == "string" ? e.key : A(e.name, t, "field")
	}));
}
function se(e, t, n = "item") {
	let r = k(e, n);
	return t ? `${t}:${r}` : r;
}
function ce(e, t, n, r = "item") {
	if (e) {
		let t = k(e, r);
		return n ? `${n}:${t}` : t;
	}
	return se(t, n, r);
}
async function N(e, t = {}, n) {
	return window.__TAURI_INTERNALS__.invoke(e, t, n);
}
//#endregion
//#region ../../node_modules/.pnpm/@tauri-apps+api@2.12.1/node_modules/@tauri-apps/api/path.js
var P;
(function(e) {
	e[e.Audio = 1] = "Audio", e[e.Cache = 2] = "Cache", e[e.Config = 3] = "Config", e[e.Data = 4] = "Data", e[e.LocalData = 5] = "LocalData", e[e.Document = 6] = "Document", e[e.Download = 7] = "Download", e[e.Picture = 8] = "Picture", e[e.Public = 9] = "Public", e[e.Video = 10] = "Video", e[e.Resource = 11] = "Resource", e[e.Temp = 12] = "Temp", e[e.AppConfig = 13] = "AppConfig", e[e.AppData = 14] = "AppData", e[e.AppLocalData = 15] = "AppLocalData", e[e.AppCache = 16] = "AppCache", e[e.AppLog = 17] = "AppLog", e[e.Desktop = 18] = "Desktop", e[e.Executable = 19] = "Executable", e[e.Font = 20] = "Font", e[e.Home = 21] = "Home", e[e.Runtime = 22] = "Runtime", e[e.Template = 23] = "Template";
})(P ||= {});
//#endregion
//#region ../../node_modules/.pnpm/@tauri-apps+plugin-fs@2.6.0/node_modules/@tauri-apps/plugin-fs/dist-js/index.js
var le;
(function(e) {
	e[e.Start = 0] = "Start", e[e.Current = 1] = "Current", e[e.End = 2] = "End";
})(le ||= {});
async function ue(e, t) {
	if (e instanceof URL && e.protocol !== "file:") throw TypeError("Must be a file URL.");
	await N("plugin:fs|mkdir", {
		path: e instanceof URL ? e.toString() : e,
		options: t
	});
}
async function de(e, t, n) {
	if (e instanceof URL && e.protocol !== "file:") throw TypeError("Must be a file URL.");
	await N("plugin:fs|write_text_file", new TextEncoder().encode(t), { headers: {
		path: encodeURIComponent(e instanceof URL ? e.toString() : e),
		options: JSON.stringify(n)
	} });
}
//#endregion
//#region src/lib/core/debug-trace.ts
var fe = "logs/debug-trace.log", pe = 1e3, F = [], I = null, L = !1, me = !1;
function he(e) {
	if (e === void 0) return "";
	if (e instanceof Error) return ` ${e.name}: ${e.message}`;
	try {
		return ` ${JSON.stringify(e, (e, t) => t instanceof Error ? `${t.name}: ${t.message}` : t)}`;
	} catch {
		return ` ${String(e)}`;
	}
}
function ge() {
	let e = /* @__PURE__ */ new Date(), t = (e, t = 2) => String(e).padStart(t, "0");
	return `${t(e.getHours())}:${t(e.getMinutes())}:${t(e.getSeconds())}.${t(e.getMilliseconds(), 3)}`;
}
async function _e() {
	if (I = null, L || F.length === 0) return;
	L = !0;
	let e = F.splice(0).join("\n") + "\n";
	try {
		me ||= (await ue("logs", {
			baseDir: P.AppData,
			recursive: !0
		}), !0), await de(fe, e, {
			baseDir: P.AppData,
			append: !0,
			create: !0
		});
	} catch {} finally {
		L = !1, F.length > 0 && R();
	}
}
function R() {
	I ??= setTimeout(() => void _e(), pe);
}
var z = (e, t, n) => {
	F.push(`${ge()} [${e}] ${t}${he(n)}`), R();
}, B = 12e4, V = class extends Error {
	handlerName;
	timeoutMs;
	constructor(e, t) {
		super(`Handler "${e}" did not finish within ${Math.round(t / 1e3)}s`), this.name = "HandlerTimeoutError", this.handlerName = e, this.timeoutMs = t;
	}
};
function ve(e, t, n) {
	let r = typeof e == "function" ? e(t, n) : e;
	return r === null ? null : typeof r == "number" && Number.isFinite(r) && r > 0 ? r : B;
}
function H(e) {
	return e.reason ?? new DOMException("The operation was aborted.", "AbortError");
}
function ye(e, t) {
	return new Promise((n, r) => {
		if (t?.aborted) {
			r(H(t));
			return;
		}
		let i = () => {
			clearTimeout(a), r(H(t));
		}, a = setTimeout(() => {
			t?.removeEventListener("abort", i), n();
		}, e);
		t?.addEventListener("abort", i, { once: !0 });
	});
}
function U(e, t) {
	return t ? t.aborted ? (e.catch(() => void 0), Promise.reject(H(t))) : new Promise((n, r) => {
		let i = () => r(H(t));
		t.addEventListener("abort", i, { once: !0 }), e.then((e) => {
			t.removeEventListener("abort", i), n(e);
		}, (e) => {
			t.removeEventListener("abort", i), r(e);
		});
	}) : e;
}
//#endregion
//#region src/lib/core/action/run-handler-chain.ts
async function be(e, t, n, r) {
	n.actionVariables ??= {};
	let i = n.signal, a = [], o = t.queueId != null, s = (e, n) => `"${t.name}" #${n} ${e.definition.name}`, c = async (e, a) => {
		let c = e.definition.execute, l = new AbortController(), u = () => l.abort(i?.reason);
		if (i?.aborted) return "aborted";
		i?.addEventListener("abort", u, { once: !0 });
		let d = {
			...n,
			signal: l.signal
		}, f = ve(e.definition.timeout, e, d), p = f === null ? void 0 : setTimeout(() => l.abort(new V(e.definition.name, f)), f), m = !1, h = () => {
			m || (m = !0, r?.onHandlerComplete?.(e, a));
		}, g = !1, _, v = new Promise((e) => {
			_ = e;
		}), y = () => {
			g || l.signal.aborted || (g = !0, h(), _?.());
		}, b = Date.now();
		o && z("handler", `start ${s(e, a)}`, { timeoutMs: f });
		try {
			return await U(Promise.resolve(c(t, e, d, y)), l.signal), g ? (await U(v, l.signal), o && z("handler", `next ${s(e, a)} after ${Date.now() - b}ms`), "next") : (h(), o && z("handler", `stop (no next) ${s(e, a)} after ${Date.now() - b}ms`), "stop");
		} catch (t) {
			if (o && z("handler", `FAILED ${s(e, a)} after ${Date.now() - b}ms`, {
				aborted: l.signal.aborted,
				reason: l.signal.reason,
				error: t
			}), h(), l.signal.aborted) {
				let t = l.signal.reason;
				return t instanceof V && (r?.onHandlerError?.(e, a, t), console.warn(t.message)), "aborted";
			}
			return r?.onHandlerError?.(e, a, t), console.error("Handler execution failed", t), "error";
		} finally {
			clearTimeout(p), i?.removeEventListener("abort", u);
		}
	};
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!n.definition.isAvailable || !n.definition.execute) continue;
		if (i?.aborted) break;
		if (r?.onHandlerStart?.(n, t), !n.blocking && t < e.length - 1) {
			a.push(c(n, t));
			continue;
		}
		let o = await c(n, t);
		if (o === "stop" || o === "aborted") break;
	}
	await Promise.allSettled(a);
}
//#endregion
//#region src/lib/core/action/definition-id.ts
function xe(e) {
	return e.split(":").map((e) => e.replace(/-\d+$/, "") || e).join(":");
}
function Se(e, t) {
	let n = e.find(t);
	if (n) return n;
	let r = xe(t);
	if (r !== t) return e.find(r);
}
//#endregion
//#region src/lib/core/action/handler-tree.ts
function W(e, t) {
	for (let n of e) {
		if (n.id === t) return n;
		let e = W(n.children.items, t);
		if (e) return e;
	}
}
function G(e, t) {
	for (let n of e) {
		if (n.id === t) return n;
		let e = G(n.thenHandlers, t);
		if (e) return e;
		let r = G(n.elseHandlers, t);
		if (r) return r;
	}
}
function K(e, t, n = null, r = null) {
	for (let i = 0; i < e.length; i += 1) {
		let a = e[i];
		if (a.id === t) return {
			handlers: e,
			index: i,
			parent: n,
			branch: r
		};
		let o = K(a.thenHandlers, t, a, "then");
		if (o) return o;
		let s = K(a.elseHandlers, t, a, "else");
		if (s) return s;
	}
	return null;
}
function Ce(e, t, n) {
	return q(e, (e) => Se(t, e), n);
}
function q(e, t, n) {
	return new O(t(e.handlerTypeId) ?? n(e.handlerTypeId), {
		id: e.id,
		fields: D(e),
		thenHandlers: (e.thenHandlers ?? []).map((e) => q(e, t, n)),
		elseHandlers: (e.elseHandlers ?? []).map((e) => q(e, t, n)),
		blocking: e.blocking !== !1
	});
}
function J(e) {
	return e.flatMap((e) => [
		e,
		...J(e.thenHandlers),
		...J(e.elseHandlers)
	]);
}
//#endregion
//#region src/lib/core/action/handler-chain-mutations.ts
function we(e, t, n) {
	let r = new O(t), i = n?.afterId ? K(e, n.afterId) : null;
	if (i) {
		let t = [
			...i.handlers.slice(0, i.index + 1),
			r,
			...i.handlers.slice(i.index + 1)
		];
		return i.parent && i.branch ? (i.parent.setBranchHandlers(i.branch, t), [...e]) : t;
	}
	if (!n?.parentId || !n.branch) return [...e, r];
	let a = G(e, n.parentId);
	if (!a) return e;
	let o = a.getBranchHandlers(n.branch);
	return a.setBranchHandlers(n.branch, [...o, r]), [...e];
}
function Te(e, t) {
	let n = K(e, t);
	if (!n) return e;
	let r = n.handlers.filter((e) => e.id !== t);
	return n.parent && n.branch ? (n.parent.setBranchHandlers(n.branch, r), [...e]) : r;
}
function Ee(e, t) {
	let n = K(e, t);
	if (!n) return e;
	let r = O.clone(n.handlers[n.index]), i = [
		...n.handlers.slice(0, n.index + 1),
		r,
		...n.handlers.slice(n.index + 1)
	];
	return n.parent && n.branch ? (n.parent.setBranchHandlers(n.branch, i), [...e]) : i;
}
function De(e, t, n, r) {
	let i = G(e, t);
	return i ? (i.setBranchHandlers(n, r), [...e]) : e;
}
//#endregion
//#region src/lib/core/action/variable-scope.ts
var Y = "Action";
function X(e) {
	return e.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function Z(e) {
	let t = e.definition.outputs;
	return t ? (typeof t == "function" ? t({ getFieldValue: (t) => w(e.fields, t) }) : t).map((e) => ({
		...e,
		key: e.key.trim()
	})).filter((e) => e.key.length > 0) : Oe(e);
}
function Oe(e) {
	let t = [], n = w(e.fields, "target-name");
	typeof n == "string" && n.trim() && t.push({ key: n.trim() });
	let r = w(e.fields, "scope"), i = w(e.fields, "variable-name");
	return r === "action" && typeof i == "string" && i.trim() && t.push({ key: i.trim() }), t;
}
function ke(e) {
	return {
		key: e.key,
		label: e.label ?? X(e.key),
		description: e.description,
		group: Y
	};
}
function Ae(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let [r, i] of e) {
		let e = t.get(r);
		n.set(r, {
			...i,
			maybe: !e || i.maybe || e.maybe || void 0
		});
	}
	for (let [e, r] of t) n.has(e) || n.set(e, {
		...r,
		maybe: !0
	});
	return n;
}
function je(e) {
	return [...e.values()].sort((e, t) => e.key.localeCompare(t.key));
}
function Q(e, t, n) {
	let r = t;
	for (let t of e) {
		n.set(t.id, je(r)), (t.thenHandlers.length > 0 || t.elseHandlers.length > 0) && (r = Ae(Q(t.thenHandlers, new Map(r), n), Q(t.elseHandlers, new Map(r), n)));
		let e = Z(t);
		if (e.length > 0) {
			r = new Map(r);
			for (let t of e) r.set(t.key, ke(t));
		}
	}
	return r;
}
function $(e, t) {
	let n = /* @__PURE__ */ new Map();
	return Q(e, new Map(t.map((e) => [e.key, e])), n), n;
}
//#endregion
//#region src/lib/core/action/variable-helpers.ts
var Me = "Global";
function Ne(e) {
	let t = e.plugins.tryGet("core");
	return t ? t.variables.listKeys("global").map((e) => ({
		key: e,
		label: X(e),
		group: Me
	})) : [];
}
function Pe(e, t) {
	let n = /* @__PURE__ */ new Set(), r = [];
	for (let i of e.slice(0, t)) for (let e of Z(i)) n.has(e.key) || (n.add(e.key), r.push({
		key: e.key,
		label: e.label ?? X(e.key),
		description: e.description,
		group: Y
	}));
	return r;
}
function Fe(e, t) {
	return $(e, []).get(t) ?? [];
}
function Ie(...e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e) for (let e of r) t.has(e.key) || (t.add(e.key), n.push(e));
	return n.sort((e, t) => e.key.localeCompare(t.key));
}
//#endregion
//#region src/lib/i18n.ts
var [Le, Re] = t();
function ze(e, t) {
	return e;
}
//#endregion
//#region src/lib/core/action/validate-form.ts
function Be(e) {
	return e.children.flatMap((e) => e.kind === "condition" ? [e] : Be(e));
}
function Ve(e, t) {
	if (e.type === "checkbox") return !1;
	if (e.type === "text" || e.type === "select" || e.type === "cron-expression" || e.type === "hotkey") return !String(t ?? "").trim();
	if (e.type === "text-select-text") {
		let n = t;
		return e.valuelessOperators?.includes(n.type) ? !n.path.trim() : !n.path.trim() || !n.type.trim() || !n.value.trim();
	}
	let n = t;
	return !n.type.trim() || !n.value.trim();
}
function He(e, t) {
	let n = {};
	for (let r of Be(e)) {
		let e = t.find((e) => e.key === r.key);
		e && Ve(e, r.value) && (n[r.id] = ze("{field} is required", { field: e.name }));
	}
	return n;
}
function Ue(e, t) {
	let n = {
		fieldErrors: {},
		missingFields: []
	};
	for (let r of t ?? []) {
		let t = e.find((e) => e.key === r.key);
		if (!t) {
			r.required && n.missingFields.push(r.name);
			continue;
		}
		if (r.required && T(r, t.value)) {
			n.fieldErrors[t.id] = ze("{field} is required", { field: r.name });
			continue;
		}
		r.type === "condition-group" && g(t.value) && Object.assign(n.fieldErrors, He(t.value, r.conditions));
	}
	return n;
}
function We(e) {
	return e.missingFields.length > 0 || Object.keys(e.fieldErrors).length > 0;
}
//#endregion
export { O as ActionHandler, B as DEFAULT_HANDLER_TIMEOUT_MS, j as HandlerDefinition, V as HandlerTimeoutError, ye as abortableDelay, d as addConditionToGroup, f as addGroupToRoot, we as addHandlerToChain, Ee as cloneHandlerInChain, $ as computeVariableScopes, x as createHandlerFields, s as emptyConditionGroup, G as findHandler, W as findHandlerDefinition, K as findHandlerLocation, J as flattenActionHandlers, u as getConditionDefinition, Ne as getGlobalVariables, w as getHandlerFieldValue, Z as getHandlerOutputs, Pe as getPrecedingActionVariables, Fe as getPrecedingActionVariablesForHandler, Ce as handlerFromStored, q as handlerFromStoredWithResolver, We as hasHandlerErrors, l as initConditionValue, Ve as isFieldValueEmpty, Ie as mergeContextVariables, D as migrateLegacyHandlerFields, p as normalizeConditionGroupOperators, U as raceAbort, m as removeConditionChild, Te as removeHandlerFromChain, De as reorderBranchHandlersInChain, be as runHandlerChain, h as setConditionOperator, Ue as validateHandlerFields };
