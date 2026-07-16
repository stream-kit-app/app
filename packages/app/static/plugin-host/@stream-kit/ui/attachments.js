import { Nn as e } from "../../chunks/client-xxWnFgeR.js";
import { t } from "../../chunks/tooltip-C_5s9rd7.js";
//#region ../ui/src/lib/attachments/tooltip-content.ts
function n(e, t) {
	return arguments.length === 1 ? {
		kind: "snippet",
		mode: "none",
		snippet: e
	} : {
		kind: "snippet",
		mode: "one",
		snippet: e,
		arg: t
	};
}
function r(e) {
	return typeof e == "object" && !!e && "kind" in e && e.kind === "snippet";
}
function i(e) {
	let t = typeof e == "function" ? e() : e;
	if (typeof t == "string") return {
		kind: "html",
		content: t
	};
	if (r(t)) return t;
	throw Error("Invalid tooltip content");
}
//#endregion
//#region ../ui/src/lib/attachments/tooltip.svelte.ts
function a(e) {
	return typeof e == "function" ? e() : e;
}
var o = 0, s = /* @__PURE__ */ new Map();
function c(e) {
	let t = e.tagName;
	return t === "A" || t === "BUTTON" || t === "INPUT" || t === "SELECT" || t === "TEXTAREA" ? !0 : e.hasAttribute("href") || e.hasAttribute("contenteditable");
}
function l(t) {
	e(t);
}
function u(n, r) {
	return (i) => {
		let s = `tooltip-${++o}`, u = r?.delayDuration ?? 200, d = () => a(r?.disabled ?? !1), f = null, p = !1, m = () => {
			t.state.registry.register({
				id: s,
				node: i,
				payload: n(),
				disabled: d()
			}), p = !0;
		}, h = () => {
			p && t.state.registry.update({
				id: s,
				node: i,
				payload: n(),
				disabled: d()
			});
		}, g = () => {
			if (p) {
				l(h);
				return;
			}
			l(m);
		}, _ = () => {
			f !== null && (clearTimeout(f), f = null);
		}, v = (e = !1) => {
			if (!d()) {
				if (g(), _(), e) {
					l(() => t.open(s));
					return;
				}
				f = setTimeout(() => {
					l(() => t.open(s)), f = null;
				}, u);
			}
		}, y = () => {
			_(), l(() => {
				e(() => t.state.registry.activeTriggerId) === s && t.close();
			});
		}, b = (e) => {
			e.pointerType !== "touch" && v();
		}, x = (e) => {
			e.pointerType !== "touch" && y();
		}, S = () => {
			v(!0);
		}, C = () => {
			y();
		};
		return !i.hasAttribute("tabindex") && !c(i) && !i.hasAttribute("disabled") && i.setAttribute("tabindex", "0"), i.addEventListener("pointerenter", b), i.addEventListener("pointerleave", x), i.addEventListener("focus", S), i.addEventListener("blur", C), () => {
			_(), i.removeEventListener("pointerenter", b), i.removeEventListener("pointerleave", x), i.removeEventListener("focus", S), i.removeEventListener("blur", C), l(() => {
				p && t.state.registry.unregister(s);
			});
		};
	};
}
function d(e, t) {
	let n = typeof t?.disabled == "boolean" ? String(t.disabled) : "dynamic";
	return `${e}\0${t?.delayDuration ?? 700}\0${n}`;
}
function f(e) {
	return e?.disabled === void 0 || typeof e?.disabled == "boolean";
}
function p(e, t) {
	if (typeof e == "string" && f(t)) {
		let n = d(e, t), r = s.get(n);
		if (r) return r;
		let a = u(() => i(e), t);
		return s.set(n, a), a;
	}
	return u(() => i(e), t);
}
//#endregion
export { p as tooltip, n as tooltipSnippet };
