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
function ee(e, t) {
	e.children.splice(t, 1), p(e);
}
function te(e, t) {
	e.operator = t;
}
function m(e) {
	return typeof e == "object" && !!e && "kind" in e && e.kind === "group" && "children" in e && Array.isArray(e.children);
}
function h(e) {
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
function g(e, t) {
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
function _(e, t) {
	if (e.type !== "one-of") return t;
	let n = e.defaultVariant ?? e.variants[0]?.id ?? "", r = e.variants.find((e) => e.id === t.variant), i = t.values[t.variant];
	if (r && i !== void 0 && !x(r.field, i)) return t;
	for (let n of e.variants) {
		let e = t.values[n.id];
		if (e !== void 0 && !x(n.field, e)) return t.variant === n.id ? t : {
			...t,
			variant: n.id
		};
	}
	return t.variant ? t : {
		...t,
		variant: n
	};
}
function v(e, t) {
	return e.type === "one-of" && o(t) ? _(e, t) : t;
}
function y(e, t) {
	return (e ?? []).map((e) => {
		let n = t?.find((t) => t.key === e.key), r = ne(e, n?.value) ?? re(e, n?.value) ?? ae(e, t) ?? ie(e);
		return {
			id: n?.id ?? crypto.randomUUID(),
			key: e.key,
			value: v(e, r)
		};
	});
}
function ne(e, t) {
	if (e.type !== "condition-group" || t === void 0 || m(t)) return;
	let n = e.migrateFromTextSelectText;
	if (n && typeof t == "object" && "path" in t) return g(t, n);
}
function re(e, t) {
	if (t === void 0 || e.type !== "one-of" || o(t) || typeof t != "string" && typeof t != "number" && typeof t != "boolean") return t;
	let n = e.defaultVariant ?? e.variants[0]?.id ?? "", r = t, i = {};
	for (let t of e.variants) i[t.id] = t.id === n ? r : b(t.field);
	return {
		variant: n,
		values: i
	};
}
function b(e) {
	return e.type === "condition-group" ? e.defaultValue ? h(e.defaultValue) : s() : e.defaultValue === void 0 ? e.type === "key-value-list" ? [] : e.type === "slider" ? e.defaultValue ?? e.min : e.type === "text-select-text" ? {
		path: "",
		type: "equals",
		value: "",
		negate: !1
	} : e.type === "text" || e.type === "select" || e.type === "combobox" || e.type === "select-file-or-folder" || e.type === "code" || e.type === "json" || e.type === "hotkey" || e.type === "color" ? "" : !1 : e.defaultValue;
}
function ie(e) {
	if (e.type === "one-of") {
		let t = e.defaultVariant ?? e.variants[0]?.id ?? "", n = {};
		for (let t of e.variants) n[t.id] = b(t.field);
		return {
			variant: t,
			values: n
		};
	}
	return b(e);
}
function ae(e, t) {
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
			if (a && typeof o == "string" && o.trim() && !x(e.variants.find((e) => e.id === a)?.field, o)) {
				i = a;
				break;
			}
		}
		let a = {};
		for (let t of e.variants) a[t.id] = r.get(t.id) ?? b(t.field);
		return {
			variant: i,
			values: a
		};
	}
}
function x(e, t) {
	return !e || e.type === "one-of" || w({
		...e,
		key: "inner"
	}, t);
}
function S(e, t) {
	return e?.find((e) => e.key === t);
}
function C(e, t) {
	return e.find((e) => e.key === t)?.value;
}
function w(e, t) {
	if (e.type === "one-of") {
		if (!t || typeof t != "object" || !("variant" in t) || !("values" in t)) return !0;
		let n = t, r = e.variants.find((e) => e.id === n.variant);
		if (!r) return !0;
		let i = n.values[n.variant];
		return x(r.field, i);
	}
	if (e.type === "condition-group") return !m(t) || t.children.length === 0;
	if (e.type === "key-value-list") return !Array.isArray(t) || t.length === 0 || t.every((e) => !e.key.trim());
	if (e.type === "text-select-text") {
		if (!t || typeof t != "object" || !("path" in t)) return !0;
		let n = t;
		return (e.valuelessOperators ?? []).includes(n.type) ? !n.path.trim() : !n.path.trim() || !n.value.trim();
	}
	return e.type === "text" || e.type === "select" || e.type === "combobox" || e.type === "select-file-or-folder" || e.type === "code" || e.type === "json" || e.type === "hotkey" || e.type === "color" ? !String(t ?? "").trim() : !1;
}
function T(e) {
	return e.children.flatMap((e) => e.kind === "condition" ? [e] : T(e));
}
function E(e) {
	return e.fields ? e.fields : e.config ? T(e.config).map((e) => ({
		id: e.id,
		key: e.key,
		value: typeof e.value == "object" && e.value !== null && "value" in e.value ? String(e.value.value) : e.value
	})) : [];
}
//#endregion
//#region src/lib/core/action/action-handler.svelte.ts
var D = class t {
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
		let n = y(e.fields, t?.fields);
		this.fields = n.length > 0 ? n : t?.fields?.map((e) => ({ ...e })) ?? [], this.thenHandlers = t?.thenHandlers ?? [], this.elseHandlers = t?.elseHandlers ?? [], this.blocking = t?.blocking ?? !0;
	}
	get fieldDefinitions() {
		return this.definition.fields;
	}
	getField(e) {
		return this.fields.find((t) => t.key === e);
	}
	getFieldDefinition(e) {
		return S(this.definition.fields, e);
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
function O(e, t = "item") {
	return (e ?? t).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || t;
}
function k(e, t, n = "item") {
	let r = O(e, n), i = r, a = 2;
	for (; t.has(i);) i = `${r}-${a}`, a += 1;
	return t.add(i), i;
}
//#endregion
//#region src/lib/core/action/trigger/trigger-definition.svelte.ts
function oe(e) {
	let t = /* @__PURE__ */ new Set();
	return e?.map((e) => ({
		...e,
		key: "key" in e && typeof e.key == "string" ? e.key : k(e.name, t, "condition")
	}));
}
//#endregion
//#region src/lib/core/action/handler/handler-definition.svelte.ts
var se = class {
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
			id: le(e.id, e.name, t.idScope, "handler"),
			fields: j(e.fields)
		};
		if (this.find(n.id)) throw Error(`Handler definition with id ${n.id} already exists`);
		let r = new A(n);
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
}, A = class {
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
	children = new se();
	constructor(e) {
		this.id = e.id, this.name = e.name, this.fields = j(e.fields), this.execute = e.execute, this.outputs = e.outputs, e.children?.forEach((e) => this.children.add(e, { idScope: this.id }));
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
function j(e) {
	let t = /* @__PURE__ */ new Set();
	return e?.map((e) => ({
		...e,
		...e.type === "condition-group" ? { conditions: oe(e.conditions) ?? [] } : {},
		key: "key" in e && typeof e.key == "string" ? e.key : k(e.name, t, "field")
	}));
}
function ce(e, t, n = "item") {
	let r = O(e, n);
	return t ? `${t}:${r}` : r;
}
function le(e, t, n, r = "item") {
	if (e) {
		let t = O(e, r);
		return n ? `${n}:${t}` : t;
	}
	return ce(t, n, r);
}
//#endregion
//#region src/lib/core/action/run-handler-chain.ts
async function M(e, t, n, r) {
	let i = [], a = async (e, i, a) => {
		let o = !1, s, c = () => {
			o || (o = !0, r?.onHandlerComplete?.(e, i), s?.());
		}, l = new Promise((e) => {
			s = e;
		});
		try {
			let r = a(t, e, n, c);
			if (r instanceof Promise && await r, !o) {
				c();
				return;
			}
			await l;
		} catch (t) {
			c(), r?.onHandlerError?.(e, i, t), console.error("Handler execution failed", t);
		}
	}, o = async (s) => {
		if (s >= e.length) return;
		let c = e[s];
		if (!c.definition.isAvailable || !c.definition.execute) {
			await o(s + 1);
			return;
		}
		if (r?.onHandlerStart?.(c, s), !c.blocking && s < e.length - 1) {
			i.push(a(c, s, c.definition.execute)), await o(s + 1);
			return;
		}
		let l = !1, u, d = () => {
			l || (l = !0, r?.onHandlerComplete?.(c, s), u?.());
		}, f = new Promise((e) => {
			u = e;
		});
		try {
			let e = c.definition.execute(t, c, n, d);
			if (e instanceof Promise && await e, !l) {
				r?.onHandlerComplete?.(c, s);
				return;
			}
			await f, await o(s + 1);
		} catch (e) {
			r?.onHandlerComplete?.(c, s), r?.onHandlerError?.(c, s, e), console.error("Handler execution failed", e), await o(s + 1);
		}
	};
	await o(0), await Promise.allSettled(i);
}
//#endregion
//#region src/lib/core/action/definition-id.ts
function N(e) {
	return e.split(":").map((e) => e.replace(/-\d+$/, "") || e).join(":");
}
function P(e, t) {
	let n = e.find(t);
	if (n) return n;
	let r = N(t);
	if (r !== t) return e.find(r);
}
//#endregion
//#region src/lib/core/action/handler-tree.ts
function F(e, t) {
	for (let n of e) {
		if (n.id === t) return n;
		let e = F(n.children.items, t);
		if (e) return e;
	}
}
function I(e, t) {
	for (let n of e) {
		if (n.id === t) return n;
		let e = I(n.thenHandlers, t);
		if (e) return e;
		let r = I(n.elseHandlers, t);
		if (r) return r;
	}
}
function L(e, t, n = null, r = null) {
	for (let i = 0; i < e.length; i += 1) {
		let a = e[i];
		if (a.id === t) return {
			handlers: e,
			index: i,
			parent: n,
			branch: r
		};
		let o = L(a.thenHandlers, t, a, "then");
		if (o) return o;
		let s = L(a.elseHandlers, t, a, "else");
		if (s) return s;
	}
	return null;
}
function R(e, t, n) {
	return z(e, (e) => P(t, e), n);
}
function z(e, t, n) {
	return new D(t(e.handlerTypeId) ?? n(e.handlerTypeId), {
		id: e.id,
		fields: E(e),
		thenHandlers: (e.thenHandlers ?? []).map((e) => z(e, t, n)),
		elseHandlers: (e.elseHandlers ?? []).map((e) => z(e, t, n)),
		blocking: e.blocking !== !1
	});
}
function B(e) {
	return e.flatMap((e) => [
		e,
		...B(e.thenHandlers),
		...B(e.elseHandlers)
	]);
}
//#endregion
//#region src/lib/core/action/handler-chain-mutations.ts
function V(e, t, n) {
	let r = new D(t), i = n?.afterId ? L(e, n.afterId) : null;
	if (i) {
		let t = [
			...i.handlers.slice(0, i.index + 1),
			r,
			...i.handlers.slice(i.index + 1)
		];
		return i.parent && i.branch ? (i.parent.setBranchHandlers(i.branch, t), [...e]) : t;
	}
	if (!n?.parentId || !n.branch) return [...e, r];
	let a = I(e, n.parentId);
	if (!a) return e;
	let o = a.getBranchHandlers(n.branch);
	return a.setBranchHandlers(n.branch, [...o, r]), [...e];
}
function H(e, t) {
	let n = L(e, t);
	if (!n) return e;
	let r = n.handlers.filter((e) => e.id !== t);
	return n.parent && n.branch ? (n.parent.setBranchHandlers(n.branch, r), [...e]) : r;
}
function U(e, t) {
	let n = L(e, t);
	if (!n) return e;
	let r = D.clone(n.handlers[n.index]), i = [
		...n.handlers.slice(0, n.index + 1),
		r,
		...n.handlers.slice(n.index + 1)
	];
	return n.parent && n.branch ? (n.parent.setBranchHandlers(n.branch, i), [...e]) : i;
}
function W(e, t, n, r) {
	let i = I(e, t);
	return i ? (i.setBranchHandlers(n, r), [...e]) : e;
}
//#endregion
//#region src/lib/core/action/variable-scope.ts
var G = "Action";
function K(e) {
	return e.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function q(e) {
	let t = e.definition.outputs;
	return t ? (typeof t == "function" ? t({ getFieldValue: (t) => C(e.fields, t) }) : t).map((e) => ({
		...e,
		key: e.key.trim()
	})).filter((e) => e.key.length > 0) : ue(e);
}
function ue(e) {
	let t = [], n = C(e.fields, "target-name");
	typeof n == "string" && n.trim() && t.push({ key: n.trim() });
	let r = C(e.fields, "scope"), i = C(e.fields, "variable-name");
	return r === "action" && typeof i == "string" && i.trim() && t.push({ key: i.trim() }), t;
}
function de(e) {
	return {
		key: e.key,
		label: e.label ?? K(e.key),
		description: e.description,
		group: G
	};
}
function fe(e, t) {
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
function pe(e) {
	return [...e.values()].sort((e, t) => e.key.localeCompare(t.key));
}
function J(e, t, n) {
	let r = t;
	for (let t of e) {
		n.set(t.id, pe(r)), (t.thenHandlers.length > 0 || t.elseHandlers.length > 0) && (r = fe(J(t.thenHandlers, new Map(r), n), J(t.elseHandlers, new Map(r), n)));
		let e = q(t);
		if (e.length > 0) {
			r = new Map(r);
			for (let t of e) r.set(t.key, de(t));
		}
	}
	return r;
}
function Y(e, t) {
	let n = /* @__PURE__ */ new Map();
	return J(e, new Map(t.map((e) => [e.key, e])), n), n;
}
//#endregion
//#region src/lib/core/action/variable-helpers.ts
var me = "Global";
function he(e) {
	let t = e.plugins.tryGet("core");
	return t ? t.variables.listKeys("global").map((e) => ({
		key: e,
		label: K(e),
		group: me
	})) : [];
}
function ge(e, t) {
	let n = /* @__PURE__ */ new Set(), r = [];
	for (let i of e.slice(0, t)) for (let e of q(i)) n.has(e.key) || (n.add(e.key), r.push({
		key: e.key,
		label: e.label ?? K(e.key),
		description: e.description,
		group: G
	}));
	return r;
}
function X(e, t) {
	return Y(e, []).get(t) ?? [];
}
function _e(...e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e) for (let e of r) t.has(e.key) || (t.add(e.key), n.push(e));
	return n.sort((e, t) => e.key.localeCompare(t.key));
}
//#endregion
//#region src/lib/i18n.ts
var [ve, ye] = t();
function Z(e, t) {
	return e;
}
//#endregion
//#region src/lib/core/action/validate-form.ts
function Q(e) {
	return e.children.flatMap((e) => e.kind === "condition" ? [e] : Q(e));
}
function $(e, t) {
	if (e.type === "checkbox") return !1;
	if (e.type === "text" || e.type === "select" || e.type === "cron-expression" || e.type === "hotkey") return !String(t ?? "").trim();
	if (e.type === "text-select-text") {
		let n = t;
		return e.valuelessOperators?.includes(n.type) ? !n.path.trim() : !n.path.trim() || !n.type.trim() || !n.value.trim();
	}
	let n = t;
	return !n.type.trim() || !n.value.trim();
}
function be(e, t) {
	let n = {};
	for (let r of Q(e)) {
		let e = t.find((e) => e.key === r.key);
		e && $(e, r.value) && (n[r.id] = Z("{field} is required", { field: e.name }));
	}
	return n;
}
function xe(e, t) {
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
		if (r.required && w(r, t.value)) {
			n.fieldErrors[t.id] = Z("{field} is required", { field: r.name });
			continue;
		}
		r.type === "condition-group" && m(t.value) && Object.assign(n.fieldErrors, be(t.value, r.conditions));
	}
	return n;
}
function Se(e) {
	return e.missingFields.length > 0 || Object.keys(e.fieldErrors).length > 0;
}
//#endregion
export { D as ActionHandler, A as HandlerDefinition, d as addConditionToGroup, f as addGroupToRoot, V as addHandlerToChain, U as cloneHandlerInChain, Y as computeVariableScopes, y as createHandlerFields, s as emptyConditionGroup, I as findHandler, F as findHandlerDefinition, L as findHandlerLocation, B as flattenActionHandlers, u as getConditionDefinition, he as getGlobalVariables, C as getHandlerFieldValue, q as getHandlerOutputs, ge as getPrecedingActionVariables, X as getPrecedingActionVariablesForHandler, R as handlerFromStored, z as handlerFromStoredWithResolver, Se as hasHandlerErrors, l as initConditionValue, $ as isFieldValueEmpty, _e as mergeContextVariables, E as migrateLegacyHandlerFields, p as normalizeConditionGroupOperators, ee as removeConditionChild, H as removeHandlerFromChain, W as reorderBranchHandlersInChain, M as runHandlerChain, te as setConditionOperator, xe as validateHandlerFields };
