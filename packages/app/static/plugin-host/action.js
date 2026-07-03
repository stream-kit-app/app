import { Jr as e, Lr as t, On as n, cr as r, nr as i, or as a } from "./chunks/client-xxWnFgeR.js";
import { a as o } from "./chunks/dist-7Fg9me4U.js";
//#region src/lib/core/action/handler-field.ts
function s(e, t) {
	return (e ?? []).map((e) => {
		let n = t?.find((t) => t.key === e.key);
		return {
			id: n?.id ?? crypto.randomUUID(),
			key: e.key,
			value: c(e, n?.value) ?? ee(e, t) ?? u(e)
		};
	});
}
function c(e, t) {
	if (t === void 0 || e.type !== "one-of" || o(t) || typeof t != "string" && typeof t != "number" && typeof t != "boolean") return t;
	let n = e.defaultVariant ?? e.variants[0]?.id ?? "", r = t, i = {};
	for (let t of e.variants) i[t.id] = t.id === n ? r : l(t.field);
	return {
		variant: n,
		values: i
	};
}
function l(e) {
	return e.defaultValue === void 0 ? e.type === "key-value-list" ? [] : e.type === "slider" ? e.defaultValue ?? e.min : e.type === "text-select-text" ? {
		path: "",
		type: "equals",
		value: "",
		negate: !1
	} : e.type === "text" || e.type === "select" || e.type === "combobox" || e.type === "select-file-or-folder" || e.type === "code" ? "" : !1 : e.defaultValue;
}
function u(e) {
	if (e.type === "one-of") {
		let t = e.defaultVariant ?? e.variants[0]?.id ?? "", n = {};
		for (let t of e.variants) n[t.id] = l(t.field);
		return {
			variant: t,
			values: n
		};
	}
	return l(e);
}
function ee(e, t) {
	if (!(e.type !== "one-of" || !t?.length || !e.migrateFrom?.length) && !t.some((t) => t.key === e.key)) for (let n of e.migrateFrom) {
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
			if (a && typeof o == "string" && o.trim() && !d(e.variants.find((e) => e.id === a)?.field, o)) {
				i = a;
				break;
			}
		}
		let a = {};
		for (let t of e.variants) a[t.id] = r.get(t.id) ?? l(t.field);
		return {
			variant: i,
			values: a
		};
	}
}
function d(e, t) {
	return !e || e.type === "one-of" ? !0 : m({
		...e,
		key: "inner"
	}, t);
}
function f(e, t) {
	return e?.find((e) => e.key === t);
}
function p(e, t) {
	return e.find((e) => e.key === t)?.value;
}
function m(e, t) {
	if (e.type === "one-of") {
		if (!t || typeof t != "object" || !("variant" in t) || !("values" in t)) return !0;
		let n = t, r = e.variants.find((e) => e.id === n.variant);
		if (!r) return !0;
		let i = n.values[n.variant];
		return d(r.field, i);
	}
	if (e.type === "key-value-list") return !Array.isArray(t) || t.length === 0 ? !0 : t.every((e) => !e.key.trim());
	if (e.type === "text-select-text") {
		if (!t || typeof t != "object" || !("path" in t)) return !0;
		let n = t;
		return (e.valuelessOperators ?? []).includes(n.type) ? !n.path.trim() : !n.path.trim() || !n.value.trim();
	}
	return e.type === "text" || e.type === "select" || e.type === "combobox" || e.type === "select-file-or-folder" || e.type === "code" ? !String(t ?? "").trim() : !1;
}
function h(e) {
	return e.children.flatMap((e) => e.kind === "condition" ? [e] : h(e));
}
function g(e) {
	return e.fields ? e.fields : e.config ? h(e.config).map((e) => ({
		id: e.id,
		key: e.key,
		value: typeof e.value == "object" && e.value !== null && "value" in e.value ? String(e.value.value) : e.value
	})) : [];
}
//#endregion
//#region src/lib/core/action/action-handler.svelte.ts
var _ = class t {
	id;
	definition;
	#e = r(i([]));
	get fields() {
		return n(this.#e);
	}
	set fields(e) {
		a(this.#e, e, !0);
	}
	#t = r(i([]));
	get thenHandlers() {
		return n(this.#t);
	}
	set thenHandlers(e) {
		a(this.#t, e, !0);
	}
	#n = r(i([]));
	get elseHandlers() {
		return n(this.#n);
	}
	set elseHandlers(e) {
		a(this.#n, e, !0);
	}
	constructor(e, t) {
		this.id = t?.id ?? crypto.randomUUID(), this.definition = e, this.fields = s(e.fields, t?.fields), this.thenHandlers = t?.thenHandlers ?? [], this.elseHandlers = t?.elseHandlers ?? [];
	}
	get fieldDefinitions() {
		return this.definition.fields;
	}
	getField(e) {
		return this.fields.find((t) => t.key === e);
	}
	getFieldDefinition(e) {
		return f(this.definition.fields, e);
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
		let t = {
			id: this.id,
			handlerTypeId: this.definition.id,
			fields: e(this.fields)
		};
		return this.thenHandlers.length > 0 && (t.thenHandlers = this.thenHandlers.map((e) => e.toStored())), this.elseHandlers.length > 0 && (t.elseHandlers = this.elseHandlers.map((e) => e.toStored())), t;
	}
	static clone(n) {
		return new t(n.definition, {
			fields: structuredClone(e(n.fields)),
			thenHandlers: n.thenHandlers.map((e) => t.clone(e)),
			elseHandlers: n.elseHandlers.map((e) => t.clone(e))
		});
	}
};
//#endregion
//#region src/lib/utils.ts
function v(e, t = "item") {
	return (e ?? t).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || t;
}
function y(e, t, n = "item") {
	let r = v(e, n), i = r, a = 2;
	for (; t.has(i);) i = `${r}-${a}`, a += 1;
	return t.add(i), i;
}
//#endregion
//#region src/lib/core/action/handler/handler-definition.svelte.ts
var b = class {
	#e = r([]);
	get items() {
		return n(this.#e);
	}
	set items(e) {
		a(this.#e, e);
	}
	add(e, t = {}) {
		let n = {
			...e,
			id: w(e.id, e.name, t.idScope, "handler"),
			fields: S(e.fields)
		};
		if (this.find(n.id)) throw Error(`Handler definition with id ${n.id} already exists`);
		let r = new x(n);
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
}, x = class {
	id;
	name;
	#e = r(!0);
	get isAvailable() {
		return n(this.#e);
	}
	set isAvailable(e) {
		a(this.#e, e, !0);
	}
	fields;
	execute;
	children = new b();
	constructor(e) {
		this.id = e.id, this.name = e.name, this.fields = S(e.fields), this.execute = e.execute, e.children?.forEach((e) => this.children.add(e, { idScope: this.id }));
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
function S(e) {
	let t = /* @__PURE__ */ new Set();
	return e?.map((e) => ({
		...e,
		key: "key" in e && typeof e.key == "string" ? e.key : y(e.name, t, "field")
	}));
}
function C(e, t, n = "item") {
	let r = v(e, n);
	return t ? `${t}:${r}` : r;
}
function w(e, t, n, r = "item") {
	if (e) {
		let t = v(e, r);
		return n ? `${n}:${t}` : t;
	}
	return C(t, n, r);
}
//#endregion
//#region src/lib/core/action/run-handler-chain.ts
async function T(e, t, n, r) {
	let i = async (a) => {
		if (a >= e.length) return;
		let o = e[a];
		if (!o.definition.isAvailable || !o.definition.execute) {
			await i(a + 1);
			return;
		}
		let s = !1, c, l = () => {
			s || (s = !0, r?.onHandlerComplete?.(o, a), c?.());
		}, u = new Promise((e) => {
			c = e;
		});
		r?.onHandlerStart?.(o, a);
		try {
			let e = o.definition.execute(t, o, n, l);
			if (e instanceof Promise && await e, !s) {
				r?.onHandlerComplete?.(o, a);
				return;
			}
			await u, await i(a + 1);
		} catch (e) {
			r?.onHandlerComplete?.(o, a), r?.onHandlerError?.(o, a, e), console.error("Handler execution failed", e), await i(a + 1);
		}
	};
	await i(0);
}
//#endregion
//#region src/lib/core/action/definition-id.ts
function E(e) {
	return e.split(":").map((e) => e.replace(/-\d+$/, "") || e).join(":");
}
function D(e, t) {
	let n = e.find(t);
	if (n) return n;
	let r = E(t);
	if (r !== t) return e.find(r);
}
//#endregion
//#region src/lib/core/action/handler-tree.ts
function O(e, t) {
	for (let n of e) {
		if (n.id === t) return n;
		let e = O(n.children.items, t);
		if (e) return e;
	}
}
function k(e, t) {
	for (let n of e) {
		if (n.id === t) return n;
		let e = k(n.thenHandlers, t);
		if (e) return e;
		let r = k(n.elseHandlers, t);
		if (r) return r;
	}
}
function A(e, t, n = null, r = null) {
	for (let i = 0; i < e.length; i += 1) {
		let a = e[i];
		if (a.id === t) return {
			handlers: e,
			index: i,
			parent: n,
			branch: r
		};
		let o = A(a.thenHandlers, t, a, "then");
		if (o) return o;
		let s = A(a.elseHandlers, t, a, "else");
		if (s) return s;
	}
	return null;
}
function te(e, t, n) {
	return j(e, (e) => D(t, e), n);
}
function j(e, t, n) {
	return new _(t(e.handlerTypeId) ?? n(e.handlerTypeId), {
		id: e.id,
		fields: g(e),
		thenHandlers: (e.thenHandlers ?? []).map((e) => j(e, t, n)),
		elseHandlers: (e.elseHandlers ?? []).map((e) => j(e, t, n))
	});
}
function M(e) {
	return e.flatMap((e) => [
		e,
		...M(e.thenHandlers),
		...M(e.elseHandlers)
	]);
}
//#endregion
//#region src/lib/core/action/handler-chain-mutations.ts
function N(e, t, n) {
	let r = new _(t);
	if (!n) return [...e, r];
	let i = k(e, n.parentId);
	if (!i) return e;
	let a = i.getBranchHandlers(n.branch);
	return i.setBranchHandlers(n.branch, [...a, r]), [...e];
}
function P(e, t) {
	let n = A(e, t);
	if (!n) return e;
	let r = n.handlers.filter((e) => e.id !== t);
	return n.parent && n.branch ? (n.parent.setBranchHandlers(n.branch, r), [...e]) : r;
}
function F(e, t) {
	let n = A(e, t);
	if (!n) return e;
	let r = _.clone(n.handlers[n.index]), i = [
		...n.handlers.slice(0, n.index + 1),
		r,
		...n.handlers.slice(n.index + 1)
	];
	return n.parent && n.branch ? (n.parent.setBranchHandlers(n.branch, i), [...e]) : i;
}
function I(e, t, n, r) {
	let i = k(e, t);
	return i ? (i.setBranchHandlers(n, r), [...e]) : e;
}
//#endregion
//#region src/lib/core/action/variable-helpers.ts
function L(e) {
	return e.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function R(e) {
	let t = e.plugins.tryGet("core");
	return t ? t.variables.listKeys("global").map((e) => ({
		key: e,
		label: L(e)
	})) : [];
}
function z(e, t) {
	return H(e.slice(0, t));
}
function B(e, t) {
	return H(V(e, t) ?? []);
}
function V(e, t, n = []) {
	for (let r = 0; r < e.length; r += 1) {
		let i = e[r];
		if (i.id === t) return [...n, ...e.slice(0, r)];
		let a = [...n, ...e.slice(0, r)], o = V(i.thenHandlers, t, a);
		if (o !== null) return o;
		let s = V(i.elseHandlers, t, a);
		if (s !== null) return s;
	}
	return null;
}
function H(e) {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = p(r.fields, "target-name");
		if (typeof e == "string") {
			let r = e.trim();
			r && !n.has(r) && (n.add(r), t.push({
				key: r,
				label: L(r)
			}));
		}
		let i = p(r.fields, "scope"), a = p(r.fields, "variable-name");
		if (i === "action" && typeof a == "string") {
			let e = a.trim();
			e && !n.has(e) && (n.add(e), t.push({
				key: e,
				label: L(e)
			}));
		}
	}
	return t;
}
function U(...e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e) for (let e of r) t.has(e.key) || (t.add(e.key), n.push(e));
	return n.sort((e, t) => e.key.localeCompare(t.key));
}
//#endregion
//#region src/lib/i18n.ts
var [ne, re] = t(), W = null;
function G(e, t) {
	return W ? W.t(e, t) : e;
}
//#endregion
//#region src/lib/core/action/validate-form.ts
function K(e, t) {
	if (e.type === "checkbox") return !1;
	if (e.type === "text" || e.type === "select" || e.type === "cron-expression" || e.type === "hotkey") return !String(t ?? "").trim();
	if (e.type === "text-select-text") {
		let e = t;
		return !e.path.trim() || !e.type.trim() || !e.value.trim();
	}
	let n = t;
	return !n.type.trim() || !n.value.trim();
}
function q(e, t) {
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
		r.required && m(r, t.value) && (n.fieldErrors[t.id] = G("{field} is required", { field: r.name }));
	}
	return n;
}
function J(e) {
	return e.missingFields.length > 0 || Object.keys(e.fieldErrors).length > 0;
}
//#endregion
//#region src/lib/core/action/condition-tree.ts
function Y() {
	return {
		kind: "group",
		id: "root",
		children: []
	};
}
function X(e, t) {
	return (e.type === "select-text" || e.type === "text-select-text") && typeof t == "object" && !!t;
}
function Z(e) {
	return e.defaultValue === void 0 ? e.type === "text-select-text" ? {
		path: "",
		type: "equals",
		value: ""
	} : e.type === "select-text" ? {
		type: "",
		value: ""
	} : e.type === "checkbox" ? !0 : (e.type === "cron-expression" || e.type, "") : X(e, e.defaultValue) ? { ...e.defaultValue } : e.defaultValue;
}
function Q(e, t) {
	return e?.find((e) => e.key === t);
}
function ie(e, t, n) {
	let r = Q(n, t);
	r && e.children.push({
		kind: "condition",
		id: crypto.randomUUID(),
		key: t,
		value: Z(r),
		...e.children.length > 0 ? { operator: "and" } : {}
	});
}
function ae(e) {
	e.id === "root" && e.children.push({
		kind: "group",
		id: crypto.randomUUID(),
		children: [],
		...e.children.length > 0 ? { operator: "and" } : {}
	});
}
function $(e) {
	for (let [t, n] of e.children.entries()) t === 0 ? delete n.operator : n.operator ||= "and", n.kind === "group" && $(n);
}
function oe(e, t) {
	e.children.splice(t, 1), $(e);
}
function se(e, t) {
	e.operator = t;
}
//#endregion
export { _ as ActionHandler, x as HandlerDefinition, ie as addConditionToGroup, ae as addGroupToRoot, N as addHandlerToChain, F as cloneHandlerInChain, Y as emptyConditionGroup, k as findHandler, O as findHandlerDefinition, A as findHandlerLocation, M as flattenActionHandlers, Q as getConditionDefinition, R as getGlobalVariables, p as getHandlerFieldValue, z as getPrecedingActionVariables, B as getPrecedingActionVariablesForHandler, te as handlerFromStored, j as handlerFromStoredWithResolver, J as hasHandlerErrors, Z as initConditionValue, K as isFieldValueEmpty, U as mergeContextVariables, g as migrateLegacyHandlerFields, $ as normalizeConditionGroupOperators, oe as removeConditionChild, P as removeHandlerFromChain, I as reorderBranchHandlersInChain, T as runHandlerChain, se as setConditionOperator, q as validateHandlerFields };
