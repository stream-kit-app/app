import { Gn as e, Hr as t, On as n, Qn as r, Qt as i, Vr as a, a as o, cn as s, cr as c, ln as l, ni as u, nr as d, or as f, pr as p, xn as m, zn as h } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { i as g } from "./index-client-DLfVeyOI.js";
import { A as ee, C as _, D as v, E as te, M as ne, O as re, T as ie, _ as y, d as b, f as ae, g as x, j as oe, k as se, l as ce, m as S, n as le, o as ue, r as C, u as de, w as fe, x as w } from "./animations-complete-BfqHI4B-.js";
import { c as pe, i as me, o as T, r as he, t as ge } from "./use-id-C9llEPxa.js";
import { a as E, d as _e, g as ve, h as ye, i as D, n as be, o as O, p as k, r as A, s as j, v as xe } from "./dom-B4Rzp8oi.js";
import { a as M, c as Se, i as Ce, o as we, r as N, t as Te } from "./presence-manager.svelte-BOTfPcjg.js";
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/box/box.svelte.js
function P(e) {
	let t = c(d(e));
	return {
		[fe]: !0,
		[ee]: !0,
		get current() {
			return n(t);
		},
		set current(e) {
			f(t, e, !0);
		}
	};
}
P.from = te, P.with = v, P.flatten = ie, P.readonly = ne, P.isBox = re, P.isWritableBox = se;
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/locale.js
function Ee(e) {
	return window.getComputedStyle(e).getPropertyValue("direction");
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/get-directional-keys.js
var De = [
	D,
	ve,
	k
], Oe = [
	j,
	ye,
	"End"
];
[...De, ...Oe];
function ke(e = "ltr", t = "horizontal") {
	return {
		horizontal: e === "rtl" ? E : O,
		vertical: D
	}[t];
}
function Ae(e = "ltr", t = "horizontal") {
	return {
		horizontal: e === "rtl" ? O : E,
		vertical: j
	}[t];
}
function je(e = "ltr", t = "horizontal") {
	return ["ltr", "rtl"].includes(e) || (e = "ltr"), ["horizontal", "vertical"].includes(t) || (t = "horizontal"), {
		nextKey: ke(e, t),
		prevKey: Ae(e, t)
	};
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/roving-focus-group.js
var Me = class {
	#e;
	#t = P(null);
	constructor(e) {
		this.#e = e;
	}
	getCandidateNodes() {
		return this.#e.rootNode.current ? this.#e.candidateSelector ? Array.from(this.#e.rootNode.current.querySelectorAll(this.#e.candidateSelector)) : this.#e.candidateAttr ? Array.from(this.#e.rootNode.current.querySelectorAll(`[${this.#e.candidateAttr}]:not([data-disabled])`)) : [] : [];
	}
	focusFirstCandidate() {
		let e = this.getCandidateNodes();
		e.length && e[0]?.focus();
	}
	handleKeydown(e, t, n = !1) {
		let r = this.#e.rootNode.current;
		if (!r || !e) return;
		let i = this.getCandidateNodes();
		if (!i.length) return;
		let a = i.indexOf(e), { nextKey: o, prevKey: s } = je(Ee(r), this.#e.orientation.current), c = this.#e.loop.current, l = {
			[o]: a + 1,
			[s]: a - 1,
			[k]: 0,
			End: i.length - 1
		};
		if (n) {
			let e = o === "ArrowDown" ? O : D, t = s === "ArrowUp" ? E : j;
			l[e] = a + 1, l[t] = a - 1;
		}
		let u = l[t.key];
		if (u === void 0) return;
		t.preventDefault(), u < 0 && c ? u = i.length - 1 : u === i.length && c && (u = 0);
		let d = i[u];
		if (d) return d.focus(), this.#t.current = d.id, this.#e.onCandidateFocus?.(d), d;
	}
	getTabIndex(e) {
		let t = this.getCandidateNodes(), n = this.#t.current !== null;
		return e && !n && t[0] === e ? (this.#t.current = e.id, 0) : e?.id === this.#t.current ? 0 : -1;
	}
	setCurrentTabStopId(e) {
		this.#t.current = e;
	}
	focusCurrentTabStop() {
		let e = this.#t.current;
		if (!e) return;
		let t = this.#e.rootNode.current?.querySelector(`#${e}`);
		!t || !M(t) || t.focus();
	}
}, Ne = class {
	eventName;
	options;
	constructor(e, t = {
		bubbles: !0,
		cancelable: !0
	}) {
		this.eventName = e, this.options = t;
	}
	createEvent(e) {
		return new CustomEvent(this.eventName, {
			...this.options,
			detail: e
		});
	}
	dispatch(e, t) {
		let n = this.createEvent(t);
		return e.dispatchEvent(n), n;
	}
	listen(e, t, n) {
		return m(e, this.eventName, (e) => {
			t(e);
		}, n);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/debounce.js
function Pe(e, t = 500) {
	let n = null, r = (...r) => {
		n !== null && clearTimeout(n), n = setTimeout(() => {
			e(...r);
		}, t);
	};
	return r.destroy = () => {
		n !== null && (clearTimeout(n), n = null);
	}, r;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/elements.js
function Fe(e, t) {
	return e === t || e.contains(t);
}
function Ie(e) {
	return e?.ownerDocument ?? document;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/menu/utils.js
var F = [_e, " "], Le = [
	D,
	ve,
	k
], Re = [
	j,
	ye,
	"End"
], ze = [...Le, ...Re], Be = {
	ltr: [...F, O],
	rtl: [...F, E]
}, Ve = {
	ltr: [E],
	rtl: [O]
};
function I(e) {
	return e.pointerType === "mouse";
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/focus.js
function He(e, { select: t = !1 } = {}) {
	if (!e || !e.focus) return;
	let n = S(e);
	if (n.activeElement === e) return;
	let r = n.activeElement;
	e.focus({ preventScroll: !0 }), e !== r && Se(e) && t && e.select();
}
function Ue(e, { select: t = !1 } = {}, n) {
	let r = n();
	for (let i of e) if (He(i, { select: t }), n() !== r) return !0;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/is-using-keyboard/is-using-keyboard.svelte.js
var L = c(!1), We = class t {
	static _refs = 0;
	static _cleanup;
	constructor() {
		e(() => (t._refs === 0 && (t._cleanup = h(() => {
			let e = [], t = (e) => {
				f(L, !1);
			};
			return e.push(m(document, "pointerdown", t, { capture: !0 }), m(document, "pointermove", t, { capture: !0 }), m(document, "keydown", (e) => {
				f(L, !0);
			}, { capture: !0 })), T(...e);
		})), t._refs++, () => {
			t._refs--, t._refs === 0 && (f(L, !1), t._cleanup?.());
		}));
	}
	get current() {
		return n(L);
	}
	set current(e) {
		f(L, e, !0);
	}
}, Ge = [
	"input:not([inert]):not([inert] *)",
	"select:not([inert]):not([inert] *)",
	"textarea:not([inert]):not([inert] *)",
	"a[href]:not([inert]):not([inert] *)",
	"button:not([inert]):not([inert] *)",
	"[tabindex]:not(slot):not([inert]):not([inert] *)",
	"audio[controls]:not([inert]):not([inert] *)",
	"video[controls]:not([inert]):not([inert] *)",
	"[contenteditable]:not([contenteditable=\"false\"]):not([inert]):not([inert] *)",
	"details>summary:first-of-type:not([inert]):not([inert] *)",
	"details:not([inert]):not([inert] *)"
], R = /* #__PURE__ */ Ge.join(","), Ke = typeof Element > "u", z = Ke ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, B = !Ke && Element.prototype.getRootNode ? function(e) {
	return e?.getRootNode?.call(e);
} : function(e) {
	return e?.ownerDocument;
}, V = function(e, t) {
	t === void 0 && (t = !0);
	var n = e?.getAttribute?.call(e, "inert");
	return n === "" || n === "true" || t && e && (typeof e.closest == "function" ? e.closest("[inert]") : V(e.parentNode));
}, qe = function(e) {
	var t = e?.getAttribute?.call(e, "contenteditable");
	return t === "" || t === "true";
}, Je = function(e, t, n) {
	if (V(e)) return [];
	var r = Array.prototype.slice.apply(e.querySelectorAll(R));
	return t && z.call(e, R) && r.unshift(e), r = r.filter(n), r;
}, H = function(e, t, n) {
	for (var r = [], i = Array.from(e); i.length;) {
		var a = i.shift();
		if (!V(a, !1)) if (a.tagName === "SLOT") {
			var o = a.assignedElements(), s = H(o.length ? o : a.children, !0, n);
			n.flatten ? r.push.apply(r, s) : r.push({
				scopeParent: a,
				candidates: s
			});
		} else {
			z.call(a, R) && n.filter(a) && (t || !e.includes(a)) && r.push(a);
			var c = a.shadowRoot || typeof n.getShadowRoot == "function" && n.getShadowRoot(a), l = !V(c, !1) && (!n.shadowRootFilter || n.shadowRootFilter(a));
			if (c && l) {
				var u = H(c === !0 ? a.children : c.children, !0, n);
				n.flatten ? r.push.apply(r, u) : r.push({
					scopeParent: a,
					candidates: u
				});
			} else i.unshift.apply(i, a.children);
		}
	}
	return r;
}, Ye = function(e) {
	return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, Xe = function(e) {
	if (!e) throw Error("No node provided");
	return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || qe(e)) && !Ye(e) ? 0 : e.tabIndex;
}, Ze = function(e, t) {
	var n = Xe(e);
	return n < 0 && t && !Ye(e) ? 0 : n;
}, Qe = function(e, t) {
	return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, $e = function(e) {
	return e.tagName === "INPUT";
}, et = function(e) {
	return $e(e) && e.type === "hidden";
}, tt = function(e) {
	return e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(e) {
		return e.tagName === "SUMMARY";
	});
}, nt = function(e, t) {
	for (var n = 0; n < e.length; n++) if (e[n].checked && e[n].form === t) return e[n];
}, rt = function(e) {
	if (!e.name) return !0;
	var t = e.form || B(e), n = function(e) {
		return t.querySelectorAll("input[type=\"radio\"][name=\"" + e + "\"]");
	}, r;
	if (typeof window < "u" && window.CSS !== void 0 && typeof window.CSS.escape == "function") r = n(window.CSS.escape(e.name));
	else try {
		r = n(e.name);
	} catch (e) {
		return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", e.message), !1;
	}
	var i = nt(r, e.form);
	return !i || i === e;
}, it = function(e) {
	return $e(e) && e.type === "radio";
}, at = function(e) {
	return it(e) && !rt(e);
}, ot = function(e) {
	var t = e && B(e), n = t?.host, r = !1;
	if (t && t !== e) {
		var i, a, o;
		for (r = !!((i = n) != null && (a = i.ownerDocument) != null && a.contains(n) || e != null && (o = e.ownerDocument) != null && o.contains(e)); !r && n;) {
			var s, c;
			t = B(n), n = t?.host, r = !!((s = n) != null && (c = s.ownerDocument) != null && c.contains(n));
		}
	}
	return r;
}, st = function(e) {
	var t = e.getBoundingClientRect(), n = t.width, r = t.height;
	return n === 0 && r === 0;
}, ct = function(e, t) {
	var n = t.displayCheck, r = t.getShadowRoot;
	if (n === "full-native" && "checkVisibility" in e) return !e.checkVisibility({
		checkOpacity: !1,
		opacityProperty: !1,
		contentVisibilityAuto: !0,
		visibilityProperty: !0,
		checkVisibilityCSS: !0
	});
	if (getComputedStyle(e).visibility === "hidden") return !0;
	var i = z.call(e, "details>summary:first-of-type") ? e.parentElement : e;
	if (z.call(i, "details:not([open]) *")) return !0;
	if (!n || n === "full" || n === "full-native" || n === "legacy-full") {
		if (typeof r == "function") {
			for (var a = e; e;) {
				var o = e.parentElement, s = B(e);
				if (o && !o.shadowRoot && r(o) === !0) return st(e);
				e = e.assignedSlot ? e.assignedSlot : !o && s !== e.ownerDocument ? s.host : o;
			}
			e = a;
		}
		if (ot(e)) return !e.getClientRects().length;
		if (n !== "legacy-full") return !0;
	} else if (n === "non-zero-area") return st(e);
	return !1;
}, lt = function(e) {
	if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName)) for (var t = e.parentElement; t;) {
		if (t.tagName === "FIELDSET" && t.disabled) {
			for (var n = 0; n < t.children.length; n++) {
				var r = t.children.item(n);
				if (r.tagName === "LEGEND") return z.call(t, "fieldset[disabled] *") ? !0 : !r.contains(e);
			}
			return !0;
		}
		t = t.parentElement;
	}
	return !1;
}, U = function(e, t) {
	return !(t.disabled || et(t) || ct(t, e) || tt(t) || lt(t));
}, W = function(e, t) {
	return !(at(t) || Xe(t) < 0 || !U(e, t));
}, ut = function(e) {
	var t = parseInt(e.getAttribute("tabindex"), 10);
	return !!(isNaN(t) || t >= 0);
}, dt = function(e) {
	var t = [], n = [];
	return e.forEach(function(e, r) {
		var i = !!e.scopeParent, a = i ? e.scopeParent : e, o = Ze(a, i), s = i ? dt(e.candidates) : a;
		o === 0 ? i ? t.push.apply(t, s) : t.push(a) : n.push({
			documentOrder: r,
			tabIndex: o,
			item: e,
			isScope: i,
			content: s
		});
	}), n.sort(Qe).reduce(function(e, t) {
		return t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e;
	}, []).concat(t);
}, ft = function(e, t) {
	return t ||= {}, dt(t.getShadowRoot ? H([e], t.includeContainer, {
		filter: W.bind(null, t),
		flatten: !1,
		getShadowRoot: t.getShadowRoot,
		shadowRootFilter: ut
	}) : Je(e, t.includeContainer, W.bind(null, t)));
}, pt = function(e, t) {
	return t ||= {}, t.getShadowRoot ? H([e], t.includeContainer, {
		filter: U.bind(null, t),
		flatten: !0,
		getShadowRoot: t.getShadowRoot
	}) : Je(e, t.includeContainer, U.bind(null, t));
}, G = function(e, t) {
	if (t ||= {}, !e) throw Error("No node provided");
	return z.call(e, R) === !1 ? !1 : W(t, e);
}, mt = /* #__PURE__ */ Ge.concat("iframe:not([inert]):not([inert] *)").join(","), ht = function(e, t) {
	if (t ||= {}, !e) throw Error("No node provided");
	return z.call(e, mt) === !1 ? !1 : U(t, e);
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/tabbable.js
function K() {
	return {
		getShadowRoot: !0,
		displayCheck: typeof ResizeObserver == "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
	};
}
function gt(e, t) {
	if (!G(e, K())) return _t(e, t);
	let n = S(e), r = ft(n.body, K());
	t === "prev" && r.reverse();
	let i = r.indexOf(e);
	return i === -1 ? n.body : r.slice(i + 1)[0];
}
function _t(e, t) {
	let n = S(e);
	if (!ht(e, K())) return n.body;
	let r = pt(n.body, K());
	t === "prev" && r.reverse();
	let i = r.indexOf(e);
	return i === -1 ? n.body : r.slice(i + 1).find((e) => G(e, K())) ?? n.body;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/arrays.js
function vt(e, t, n = !0) {
	if (!(e.length === 0 || t < 0 || t >= e.length)) return e.length === 1 && t === 0 ? e[0] : t === e.length - 1 ? n ? e[0] : void 0 : e[t + 1];
}
function yt(e, t, n = !0) {
	if (!(e.length === 0 || t < 0 || t >= e.length)) return e.length === 1 && t === 0 ? e[0] : t === 0 ? n ? e[e.length - 1] : void 0 : e[t - 1];
}
function bt(e, t, n, r = !0) {
	if (e.length === 0 || t < 0 || t >= e.length) return;
	let i = t + n;
	return i = r ? (i % e.length + e.length) % e.length : Math.max(0, Math.min(i, e.length - 1)), e[i];
}
function xt(e, t, n, r = !0) {
	if (e.length === 0 || t < 0 || t >= e.length) return;
	let i = t - n;
	return i = r ? (i % e.length + e.length) % e.length : Math.max(0, Math.min(i, e.length - 1)), e[i];
}
function q(e, t, n) {
	let r = t.toLowerCase();
	if (r.endsWith(" ")) {
		let i = r.slice(0, -1);
		if (e.filter((e) => e.toLowerCase().startsWith(i)).length <= 1) return q(e, i, n);
		let a = n?.toLowerCase();
		if (a && a.startsWith(i) && a.charAt(i.length) === " " && t.trim() === i) return n;
		let o = e.filter((e) => e.toLowerCase().startsWith(r));
		if (o.length > 0) {
			let t = n ? e.indexOf(n) : -1;
			return St(o, Math.max(t, 0)).find((e) => e !== n) || n;
		}
	}
	let i = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, a = i.toLowerCase(), o = n ? e.indexOf(n) : -1, s = St(e, Math.max(o, 0));
	i.length === 1 && (s = s.filter((e) => e !== n));
	let c = s.find((e) => e?.toLowerCase().startsWith(a));
	return c === n ? void 0 : c;
}
function St(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/box-auto-reset.svelte.js
var Ct = {
	afterMs: 1e4,
	onChange: A
};
function wt(t, r) {
	let { afterMs: i, onChange: a, getWindow: o } = {
		...Ct,
		...r
	}, s = null, l = c(d(t));
	function u() {
		return o().setTimeout(() => {
			f(l, t, !0), a?.(t);
		}, i);
	}
	return e(() => () => {
		s && o().clearTimeout(s);
	}), v(() => n(l), (e) => {
		f(l, e, !0), a?.(e), s && o().clearTimeout(s), s = u();
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/dom-typeahead.svelte.js
var Tt = class {
	#e;
	#t;
	#n = p(() => this.#e.onMatch ? this.#e.onMatch : (e) => e.focus());
	#r = p(() => this.#e.getCurrentItem ? this.#e.getCurrentItem : this.#e.getActiveElement);
	constructor(e) {
		this.#e = e, this.#t = wt("", {
			afterMs: 1e3,
			getWindow: e.getWindow
		}), this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this), this.resetTypeahead = this.resetTypeahead.bind(this);
	}
	handleTypeaheadSearch(e, t) {
		if (!t.length) return;
		this.#t.current = this.#t.current + e;
		let r = n(this.#r)(), i = t.find((e) => e === r)?.textContent?.trim() ?? "", a = q(t.map((e) => e.textContent?.trim() ?? ""), this.#t.current, i), o = t.find((e) => e.textContent?.trim() === a);
		return o && n(this.#n)(o), o;
	}
	resetTypeahead() {
		this.#t.current = "";
	}
	get search() {
		return this.#t.current;
	}
}, Et = "data-context-menu-trigger", Dt = "data-context-menu-content", Ot = new _("Menu.Root"), J = new _("Menu.Root | Menu.Sub"), kt = new _("Menu.Content");
new _("Menu.Group | Menu.RadioGroup"), new _("Menu.RadioGroup"), new _("Menu.CheckboxGroup");
var At = new Ne("bitsmenuopen", {
	bubbles: !1,
	cancelable: !0
}), jt = ue({
	component: "menu",
	parts: [
		"trigger",
		"content",
		"sub-trigger",
		"item",
		"group",
		"group-heading",
		"checkbox-group",
		"checkbox-item",
		"radio-group",
		"radio-item",
		"separator",
		"sub-content",
		"arrow"
	]
}), Mt = class {
	#e;
	#t = null;
	#n = null;
	#r = !1;
	#i = null;
	#a = null;
	#o = null;
	#s = null;
	constructor(e) {
		this.#e = e, w([
			e.triggerNode,
			e.contentNode,
			e.enabled
		], ([e, t, n]) => {
			if (this.#_(), !e || !t || !n) return;
			let r = (e) => {
				I(e) && (this.#s = {
					x: e.clientX,
					y: e.clientY
				}, this.#r || this.#d(e, "content"));
			}, i = (e) => {
				I(e) && this.#f(e, "content");
			}, a = (e) => {
				I(e) && (this.#r || this.#d(e, "trigger"));
			}, o = (e) => {
				if (I(e)) {
					if (N(e.relatedTarget)) {
						let n = this.#e.subContentSelector(), r = e.relatedTarget.closest(n);
						if (r && r !== t && r.id && t.querySelector(`[aria-controls="${r.id}"]`)) return;
					}
					this.#f(e, "trigger");
				}
			}, s = (e) => {
				I(e) && this.#m();
			}, c = (e) => {
				I(e) && this.#m();
			};
			return e.addEventListener("pointermove", r), e.addEventListener("pointerleave", i), e.addEventListener("pointerenter", s), t.addEventListener("pointermove", a), t.addEventListener("pointerleave", o), t.addEventListener("pointerenter", c), () => {
				e.removeEventListener("pointermove", r), e.removeEventListener("pointerleave", i), e.removeEventListener("pointerenter", s), t.removeEventListener("pointermove", a), t.removeEventListener("pointerleave", o), t.removeEventListener("pointerenter", c), this.#_();
			};
		}), y(() => {
			this.#_();
		});
	}
	#c() {
		let e = this.#e.parentContentNode();
		return e ? e.getBoundingClientRect() : this.#e.triggerNode()?.getBoundingClientRect() ?? null;
	}
	#l(e, t) {
		let n = this.#e.triggerNode(), r = this.#e.contentNode();
		if (!n || !r) return null;
		let i = n.getBoundingClientRect(), a = r.getBoundingClientRect(), o = It(i, a), s, c, l;
		return t === "content" ? (s = this.#r ? this.#a ?? e : e, c = a) : (s = this.#s ?? e, c = this.#c() ?? i, l = a), this.#a = s, {
			corridor: Lt(i, a, o),
			intent: Rt(s, c, o, t, l),
			targetRect: c,
			side: o
		};
	}
	#u(e, t, n) {
		return Nt(e, t) || Nt(e, n);
	}
	#d(e, t) {
		let n = {
			x: e.clientX,
			y: e.clientY
		};
		this.#l(n, t) && (this.#i = t, this.#o = n);
	}
	#f(e, t) {
		if (!this.#e.enabled()) return;
		let n = this.#e.triggerNode(), r = this.#e.contentNode();
		if (!n || !r) return;
		let i = e.relatedTarget;
		if (N(i) && (t === "content" && r.contains(i) || t === "trigger" && n.contains(i))) return;
		let a = {
			x: e.clientX,
			y: e.clientY
		}, o = this.#l(a, t);
		if (o) {
			if (!Pt(a, o.targetRect) && !this.#u(a, o.corridor, o.intent)) {
				this.#w();
				return;
			}
			this.#r = !0, this.#i = t, this.#o = a, this.#e.setIsPointerInTransit(!0), this.#b(), this.#S();
		}
	}
	#p = null;
	#m() {
		if (!this.#r) return;
		let e = this.#i === "trigger";
		this.#x(), this.#C(), this.#r = !1, this.#w(), e ? (this.#h(), this.#p = setTimeout(() => {
			this.#p = null, this.#e.setIsPointerInTransit(!1);
		}, 100)) : this.#e.setIsPointerInTransit(!1);
	}
	#h() {
		this.#p !== null && (clearTimeout(this.#p), this.#p = null);
	}
	#g() {
		let e = this.#o;
		this.#x(), this.#C(), this.#h(), this.#r = !1, this.#e.setIsPointerInTransit(!1), this.#w(), this.#e.onIntentExit(e);
	}
	#_() {
		this.#x(), this.#C(), this.#h(), this.#r && this.#e.setIsPointerInTransit(!1), this.#r = !1, this.#i = null, this.#a = null, this.#o = null, this.#s = null;
	}
	#v(e) {
		let t = this.#e.contentNode();
		if (!t) return !1;
		let n = t.ownerDocument.elementFromPoint(e.x, e.y);
		if (!n) return !1;
		let r = this.#e.subContentSelector(), i = n.closest(r);
		return !i || i === t ? !1 : i.id ? !!t.querySelector(`[aria-controls="${i.id}"]`) : !1;
	}
	#y = (e) => {
		if (!this.#r || !this.#i || !I(e)) return;
		let t = this.#e.triggerNode(), n = this.#e.contentNode();
		if (!t || !n) {
			this.#g();
			return;
		}
		this.#C();
		let r = {
			x: e.clientX,
			y: e.clientY
		};
		this.#o = r;
		let i = t.getBoundingClientRect(), a = n.getBoundingClientRect();
		if (this.#i === "content" && Pt(r, a)) {
			this.#m();
			return;
		}
		if (this.#i === "trigger" && Ft(r, i, 4)) {
			this.#m();
			return;
		}
		if (this.#v(r)) {
			this.#S();
			return;
		}
		let o = this.#l(r, this.#i);
		if (!o) {
			this.#g();
			return;
		}
		if (this.#u(r, o.corridor, o.intent)) {
			this.#S();
			return;
		}
		this.#g();
	};
	#b() {
		if (this.#t) return;
		let e = S(this.#e.triggerNode() ?? this.#e.contentNode());
		e && (e.addEventListener("pointermove", this.#y, !0), this.#t = () => {
			e.removeEventListener("pointermove", this.#y, !0), this.#t = null;
		});
	}
	#x() {
		this.#t?.();
	}
	#S() {
		this.#C(), this.#n = setTimeout(() => {
			this.#n = null, this.#r && this.#g();
		}, 500);
	}
	#C() {
		this.#n !== null && (clearTimeout(this.#n), this.#n = null);
	}
	#w() {
		this.#i = null, this.#a = null, this.#o = null;
	}
};
function Nt(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e].x, s = t[e].y, c = t[a].x, l = t[a].y;
		s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
	}
	return i;
}
function Pt(e, t) {
	return e.x >= t.left && e.x <= t.right && e.y >= t.top && e.y <= t.bottom;
}
function Ft(e, t, n) {
	return e.x >= t.left + n && e.x <= t.right - n && e.y >= t.top + n && e.y <= t.bottom - n;
}
function It(e, t) {
	let n = e.left + e.width / 2, r = e.top + e.height / 2, i = t.left + t.width / 2, a = t.top + t.height / 2, o = i - n, s = a - r;
	return Math.abs(o) > Math.abs(s) ? o > 0 ? "right" : "left" : s > 0 ? "bottom" : "top";
}
function Lt(e, t, n) {
	switch (n) {
		case "top": return [
			{
				x: Math.min(e.left, t.left) - 2,
				y: e.top
			},
			{
				x: Math.min(e.left, t.left) - 2,
				y: t.bottom
			},
			{
				x: Math.max(e.right, t.right) + 2,
				y: t.bottom
			},
			{
				x: Math.max(e.right, t.right) + 2,
				y: e.top
			}
		];
		case "bottom": return [
			{
				x: Math.min(e.left, t.left) - 2,
				y: e.bottom
			},
			{
				x: Math.min(e.left, t.left) - 2,
				y: t.top
			},
			{
				x: Math.max(e.right, t.right) + 2,
				y: t.top
			},
			{
				x: Math.max(e.right, t.right) + 2,
				y: e.bottom
			}
		];
		case "left": return [
			{
				x: e.left,
				y: Math.min(e.top, t.top) - 2
			},
			{
				x: t.right,
				y: Math.min(e.top, t.top) - 2
			},
			{
				x: t.right,
				y: Math.max(e.bottom, t.bottom) + 2
			},
			{
				x: e.left,
				y: Math.max(e.bottom, t.bottom) + 2
			}
		];
		case "right": return [
			{
				x: e.right,
				y: Math.min(e.top, t.top) - 2
			},
			{
				x: t.left,
				y: Math.min(e.top, t.top) - 2
			},
			{
				x: t.left,
				y: Math.max(e.bottom, t.bottom) + 2
			},
			{
				x: e.right,
				y: Math.max(e.bottom, t.bottom) + 2
			}
		];
	}
}
function Rt(e, t, n, r, i) {
	let a = r === "trigger" ? zt(n) : n, o = i ? Math.min(t.top, i.top) - 8 : t.top - 8, s = i ? Math.max(t.bottom, i.bottom) + 8 : t.bottom + 8, c = i ? Math.min(t.left, i.left) - 8 : t.left - 8, l = i ? Math.max(t.right, i.right) + 8 : t.right + 8;
	switch (a) {
		case "right": return [
			e,
			{
				x: t.left,
				y: o
			},
			{
				x: t.left,
				y: s
			}
		];
		case "left": return [
			e,
			{
				x: t.right,
				y: o
			},
			{
				x: t.right,
				y: s
			}
		];
		case "bottom": return [
			e,
			{
				x: c,
				y: t.top
			},
			{
				x: l,
				y: t.top
			}
		];
		case "top": return [
			e,
			{
				x: c,
				y: t.bottom
			},
			{
				x: l,
				y: t.bottom
			}
		];
	}
}
function zt(e) {
	switch (e) {
		case "top": return "bottom";
		case "bottom": return "top";
		case "left": return "right";
		case "right": return "left";
	}
}
var Bt = class e {
	static create(t) {
		let n = new e(t);
		return Ot.set(n);
	}
	opts;
	isUsingKeyboard = new We();
	#e = c(!1);
	get ignoreCloseAutoFocus() {
		return n(this.#e);
	}
	set ignoreCloseAutoFocus(e) {
		f(this.#e, e, !0);
	}
	#t = c(!1);
	get isPointerInTransit() {
		return n(this.#t);
	}
	set isPointerInTransit(e) {
		f(this.#t, e, !0);
	}
	constructor(e) {
		this.opts = e;
	}
	getBitsAttr = (e) => jt.getAttr(e, this.opts.variant.current);
}, Vt = class e {
	static create(t, n) {
		return J.set(new e(t, n, null));
	}
	opts;
	root;
	parentMenu;
	contentId = v(() => "");
	#e = c(null);
	get contentNode() {
		return n(this.#e);
	}
	set contentNode(e) {
		f(this.#e, e, !0);
	}
	contentPresence;
	#t = c(null);
	get triggerNode() {
		return n(this.#t);
	}
	set triggerNode(e) {
		f(this.#t, e, !0);
	}
	constructor(e, t, n) {
		this.opts = e, this.root = t, this.parentMenu = n, this.contentPresence = new Te({
			ref: v(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			},
			shouldSkipExitAnimation: () => this.root.opts.variant.current !== "menubar" || this.parentMenu !== null ? !1 : this.root.opts.shouldSkipExitAnimation?.() ?? !1
		}), n && w(() => n.opts.open.current, () => {
			n.opts.open.current || (this.opts.open.current = !1);
		});
	}
	toggleOpen() {
		this.opts.open.current = !this.opts.open.current;
	}
	onOpen() {
		this.opts.open.current = !0;
	}
	onClose() {
		this.opts.open.current = !1;
	}
}, Ht = class t {
	static create(e) {
		return kt.set(new t(e, J.get()));
	}
	opts;
	parentMenu;
	rovingFocusGroup;
	domContext;
	attachment;
	#e = c("");
	get search() {
		return n(this.#e);
	}
	set search(e) {
		f(this.#e, e, !0);
	}
	#t = 0;
	#n;
	#r = c(!1);
	get mounted() {
		return n(this.#r);
	}
	set mounted(e) {
		f(this.#r, e, !0);
	}
	#i;
	constructor(t, n) {
		this.opts = t, this.parentMenu = n, this.domContext = new he(t.ref), this.attachment = b(this.opts.ref, (e) => {
			this.parentMenu.contentNode !== e && (this.parentMenu.contentNode = e);
		}), n.contentId = t.id, this.#i = t.isSub ?? !1, this.onkeydown = this.onkeydown.bind(this), this.onblur = this.onblur.bind(this), this.onfocus = this.onfocus.bind(this), this.handleInteractOutside = this.handleInteractOutside.bind(this), new Mt({
			contentNode: () => this.parentMenu.contentNode,
			triggerNode: () => this.parentMenu.triggerNode,
			parentContentNode: () => this.parentMenu.parentMenu?.contentNode ?? null,
			subContentSelector: () => `[${this.parentMenu.root.getBitsAttr("sub-content")}]`,
			enabled: () => this.parentMenu.opts.open.current && !!this.parentMenu.triggerNode?.hasAttribute(this.parentMenu.root.getBitsAttr("sub-trigger")),
			onIntentExit: (e) => {
				this.parentMenu.opts.open.current = !1, this.#s(e);
			},
			setIsPointerInTransit: (e) => {
				this.parentMenu.root.isPointerInTransit = e;
			}
		}), this.#n = new Tt({
			getActiveElement: () => this.domContext.getActiveElement(),
			getWindow: () => this.domContext.getWindow()
		}).handleTypeaheadSearch, this.rovingFocusGroup = new Me({
			rootNode: v(() => this.parentMenu.contentNode),
			candidateAttr: this.parentMenu.root.getBitsAttr("item"),
			loop: this.opts.loop,
			orientation: v(() => "vertical")
		}), w(() => this.parentMenu.contentNode, (e) => e ? At.listen(e, () => {
			x(() => {
				this.parentMenu.root.isUsingKeyboard.current && this.rovingFocusGroup.focusFirstCandidate();
			});
		}) : void 0), e(() => {
			this.parentMenu.opts.open.current || this.domContext.getWindow().clearTimeout(this.#t);
		});
	}
	#a() {
		let e = this.parentMenu.contentNode;
		return e ? Array.from(e.querySelectorAll(`[${this.parentMenu.root.getBitsAttr("item")}]:not([data-disabled])`)) : [];
	}
	#o() {
		return this.parentMenu.root.isPointerInTransit;
	}
	#s(e) {
		if (!e) return;
		let t = this.parentMenu.parentMenu?.contentNode;
		if (!t) return;
		let n = this.domContext.getDocument().elementFromPoint(e.x, e.y);
		if (!N(n)) return;
		let r = n.closest(`[${this.parentMenu.root.getBitsAttr("sub-trigger")}]`);
		!r || !t.contains(r) || r !== this.parentMenu.triggerNode && r.dispatchEvent(new PointerEvent("pointermove", {
			bubbles: !0,
			cancelable: !0,
			pointerType: "mouse",
			clientX: e.x,
			clientY: e.y
		}));
	}
	onCloseAutoFocus = (e) => {
		if (this.opts.onCloseAutoFocus.current?.(e), !(e.defaultPrevented || this.#i)) {
			if (this.parentMenu.root.ignoreCloseAutoFocus) {
				e.preventDefault();
				return;
			}
			this.parentMenu.triggerNode && G(this.parentMenu.triggerNode) && (e.preventDefault(), this.parentMenu.triggerNode.focus());
		}
	};
	handleTabKeyDown(e) {
		let t = this.parentMenu;
		for (; t.parentMenu !== null;) t = t.parentMenu;
		if (!t.triggerNode) return;
		e.preventDefault();
		let n = gt(t.triggerNode, e.shiftKey ? "prev" : "next");
		n ? (this.parentMenu.root.ignoreCloseAutoFocus = !0, t.onClose(), x(() => {
			n.focus(), x(() => {
				this.parentMenu.root.ignoreCloseAutoFocus = !1;
			});
		})) : this.domContext.getDocument().body.focus();
	}
	onkeydown(e) {
		if (e.defaultPrevented) return;
		if (e.key === "Tab") {
			this.handleTabKeyDown(e);
			return;
		}
		let t = e.target, n = e.currentTarget;
		if (!M(t) || !M(n)) return;
		let r = t.closest(`[${this.parentMenu.root.getBitsAttr("content")}]`)?.id === this.parentMenu.contentId.current, i = e.ctrlKey || e.altKey || e.metaKey, a = e.key.length === 1;
		if (this.rovingFocusGroup.handleKeydown(t, e) || e.code === "Space") return;
		let o = this.#a();
		r && !i && a && this.#n(e.key, o), e.target?.id === this.parentMenu.contentId.current && ze.includes(e.key) && (e.preventDefault(), Re.includes(e.key) && o.reverse(), Ue(o, { select: !1 }, () => this.domContext.getActiveElement()));
	}
	onblur(e) {
		N(e.currentTarget) && N(e.target) && (e.currentTarget.contains?.(e.target) || (this.domContext.getWindow().clearTimeout(this.#t), this.search = ""));
	}
	onfocus(e) {
		this.parentMenu.root.isUsingKeyboard.current && x(() => this.rovingFocusGroup.focusFirstCandidate());
	}
	onItemEnter() {
		return this.#o();
	}
	onItemLeave(e) {
		e.currentTarget.hasAttribute(this.parentMenu.root.getBitsAttr("sub-trigger")) || this.#o() || this.parentMenu.root.isUsingKeyboard.current || (this.parentMenu.contentNode?.focus({ preventScroll: !0 }), this.rovingFocusGroup.setCurrentTabStopId(""));
	}
	onTriggerLeave() {
		return !!this.#o();
	}
	handleInteractOutside(e) {
		if (!Ce(e.target)) return;
		let t = this.parentMenu.triggerNode?.id;
		if (e.target.id === t) {
			e.preventDefault();
			return;
		}
		if (e.target.closest(`#${t}`)) {
			e.preventDefault();
			return;
		}
		this.parentMenu.root.ignoreCloseAutoFocus = !0, x(() => {
			this.parentMenu.root.ignoreCloseAutoFocus = !1;
		});
	}
	get shouldRender() {
		return this.parentMenu.contentPresence.shouldRender;
	}
	#c = p(() => ({ open: this.parentMenu.opts.open.current }));
	get snippetProps() {
		return n(this.#c);
	}
	set snippetProps(e) {
		f(this.#c, e);
	}
	#l = p(() => ({
		id: this.opts.id.current,
		role: "menu",
		"aria-orientation": "vertical",
		[this.parentMenu.root.getBitsAttr("content")]: "",
		"data-state": ce(this.parentMenu.opts.open.current),
		...de(this.parentMenu.contentPresence.transitionStatus),
		onkeydown: this.onkeydown,
		onblur: this.onblur,
		onfocus: this.onfocus,
		dir: this.parentMenu.root.opts.dir.current,
		style: {
			pointerEvents: "auto",
			contain: "layout style"
		},
		...this.attachment
	}));
	get props() {
		return n(this.#l);
	}
	set props(e) {
		f(this.#l, e);
	}
	popperProps = { onCloseAutoFocus: (e) => this.onCloseAutoFocus(e) };
}, Ut = class {
	opts;
	content;
	attachment;
	#e = c(!1);
	constructor(e, t) {
		this.opts = e, this.content = t, this.attachment = b(this.opts.ref), this.onpointermove = this.onpointermove.bind(this), this.onpointerleave = this.onpointerleave.bind(this), this.onfocus = this.onfocus.bind(this), this.onblur = this.onblur.bind(this);
	}
	onpointermove(e) {
		if (!e.defaultPrevented && I(e)) if (this.opts.disabled.current) this.content.onItemLeave(e);
		else {
			if (this.content.onItemEnter()) return;
			let t = e.currentTarget;
			if (!M(t)) return;
			t.focus({ preventScroll: !0 });
		}
	}
	onpointerleave(e) {
		e.defaultPrevented || I(e) && this.content.onItemLeave(e);
	}
	onfocus(e) {
		x(() => {
			e.defaultPrevented || this.opts.disabled.current || f(this.#e, !0);
		});
	}
	onblur(e) {
		x(() => {
			e.defaultPrevented || f(this.#e, !1);
		});
	}
	#t = p(() => ({
		id: this.opts.id.current,
		tabindex: -1,
		role: "menuitem",
		"aria-disabled": C(this.opts.disabled.current),
		"data-disabled": le(this.opts.disabled.current),
		"data-highlighted": n(this.#e) ? "" : void 0,
		[this.content.parentMenu.root.getBitsAttr("item")]: "",
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		onfocus: this.onfocus,
		onblur: this.onblur,
		...this.attachment
	}));
	get props() {
		return n(this.#t);
	}
	set props(e) {
		f(this.#t, e);
	}
}, Wt = class e {
	static create(t) {
		return new e(t, new Ut(t, kt.get()));
	}
	opts;
	item;
	root;
	#e = !1;
	constructor(e, t) {
		this.opts = e, this.item = t, this.root = t.content.parentMenu.root, this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this), this.onpointerdown = this.onpointerdown.bind(this), this.onpointerup = this.onpointerup.bind(this);
	}
	#t() {
		if (this.item.opts.disabled.current) return;
		let e = new CustomEvent("menuitemselect", {
			bubbles: !0,
			cancelable: !0
		});
		if (this.opts.onSelect.current(e), e.defaultPrevented) {
			this.item.content.parentMenu.root.isUsingKeyboard.current = !1;
			return;
		}
		this.opts.closeOnSelect.current && this.item.content.parentMenu.root.opts.onClose();
	}
	onkeydown(e) {
		let t = this.item.content.search !== "";
		if (!(this.item.opts.disabled.current || t && e.key === " ") && F.includes(e.key)) {
			if (!M(e.currentTarget)) return;
			e.currentTarget.click(), e.preventDefault();
		}
	}
	onclick(e) {
		this.item.opts.disabled.current || this.#t();
	}
	onpointerup(e) {
		if (!e.defaultPrevented && !this.#e) {
			if (!M(e.currentTarget)) return;
			e.currentTarget?.click();
		}
	}
	onpointerdown(e) {
		this.#e = !0;
	}
	#n = p(() => me(this.item.props, {
		onclick: this.onclick,
		onpointerdown: this.onpointerdown,
		onpointerup: this.onpointerup,
		onkeydown: this.onkeydown
	}));
	get props() {
		return n(this.#n);
	}
	set props(e) {
		f(this.#n, e);
	}
}, Gt = class e {
	static create(t) {
		let n = kt.get();
		return new e(t, new Ut(t, n), n, J.get());
	}
	opts;
	item;
	content;
	submenu;
	attachment;
	#e = null;
	constructor(e, t, n, r) {
		this.opts = e, this.item = t, this.content = n, this.submenu = r, this.attachment = b(this.opts.ref, (e) => this.submenu.triggerNode = e), this.onpointerleave = this.onpointerleave.bind(this), this.onpointermove = this.onpointermove.bind(this), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this), y(() => {
			this.#t();
		});
	}
	#t() {
		this.#e !== null && (this.content.domContext.getWindow().clearTimeout(this.#e), this.#e = null);
	}
	onpointermove(e) {
		if (I(e)) {
			if (this.submenu.root.isPointerInTransit) {
				this.#e !== null && this.#t();
				return;
			}
			if (!this.item.opts.disabled.current && !this.submenu.opts.open.current && !this.#e) {
				let e = this.opts.openDelay.current;
				if (e <= 0) {
					this.submenu.onOpen();
					return;
				}
				this.#e = this.content.domContext.setTimeout(() => {
					if (this.submenu.root.isPointerInTransit) {
						this.#t();
						return;
					}
					this.submenu.onOpen(), this.#t();
				}, e);
			}
		}
	}
	onpointerleave(e) {
		I(e) && this.#t();
	}
	onkeydown(e) {
		let t = this.content.search !== "";
		this.item.opts.disabled.current || t && e.key === " " || Be[this.submenu.root.opts.dir.current].includes(e.key) && (e.currentTarget.click(), e.preventDefault());
	}
	onclick(e) {
		if (this.item.opts.disabled.current || !M(e.currentTarget)) return;
		e.currentTarget.focus();
		let t = new CustomEvent("menusubtriggerselect", {
			bubbles: !0,
			cancelable: !0
		});
		this.opts.onSelect.current(t), this.submenu.opts.open.current || (this.submenu.onOpen(), x(() => {
			let e = this.submenu.contentNode;
			e && At.dispatch(e);
		}));
	}
	#n = p(() => me({
		"aria-haspopup": "menu",
		"aria-expanded": C(this.submenu.opts.open.current),
		"data-state": ce(this.submenu.opts.open.current),
		"aria-controls": this.submenu.opts.open.current ? this.submenu.contentId.current : void 0,
		[this.submenu.root.getBitsAttr("sub-trigger")]: "",
		onclick: this.onclick,
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		onkeydown: this.onkeydown,
		...this.attachment
	}, this.item.props));
	get props() {
		return n(this.#n);
	}
	set props(e) {
		f(this.#n, e);
	}
}, Kt = class e {
	static create(t) {
		return new e(t, J.get());
	}
	opts;
	parentMenu;
	attachment;
	constructor(e, t) {
		this.opts = e, this.parentMenu = t, this.attachment = b(this.opts.ref, (e) => this.parentMenu.triggerNode = e);
	}
	onclick = (e) => {
		this.opts.disabled.current || e.detail !== 0 || (this.parentMenu.toggleOpen(), e.preventDefault());
	};
	onpointerdown = (e) => {
		if (!this.opts.disabled.current) {
			if (e.pointerType === "touch") return e.preventDefault();
			e.button === 0 && e.ctrlKey === !1 && (this.parentMenu.toggleOpen(), this.parentMenu.opts.open.current || e.preventDefault());
		}
	};
	onpointerup = (e) => {
		this.opts.disabled.current || e.pointerType === "touch" && (e.preventDefault(), this.parentMenu.toggleOpen());
	};
	onkeydown = (e) => {
		if (!this.opts.disabled.current) {
			if (e.key === " " || e.key === "Enter") {
				this.parentMenu.toggleOpen(), e.preventDefault();
				return;
			}
			e.key === "ArrowDown" && (this.parentMenu.onOpen(), e.preventDefault());
		}
	};
	#e = p(() => {
		if (this.parentMenu.opts.open.current && this.parentMenu.contentId.current) return this.parentMenu.contentId.current;
	});
	#t = p(() => ({
		id: this.opts.id.current,
		disabled: this.opts.disabled.current,
		"aria-haspopup": "menu",
		"aria-expanded": C(this.parentMenu.opts.open.current),
		"aria-controls": n(this.#e),
		"data-disabled": le(this.opts.disabled.current),
		"data-state": ce(this.parentMenu.opts.open.current),
		[this.parentMenu.root.getBitsAttr("trigger")]: "",
		onclick: this.onclick,
		onpointerdown: this.onpointerdown,
		onpointerup: this.onpointerup,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return n(this.#t);
	}
	set props(e) {
		f(this.#t, e);
	}
}, qt = class {
	static create(e) {
		let t = J.get();
		return J.set(new Vt(e, t.root, t));
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/dismissible-layer/use-dismissable-layer.svelte.js
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
var Jt = class t {
	static create(e) {
		return new t(e);
	}
	opts;
	#e;
	#t;
	#n = { pointerdown: !1 };
	#r = !1;
	#i = !1;
	#a = void 0;
	#o;
	#s = A;
	constructor(t) {
		this.opts = t, this.#t = t.interactOutsideBehavior, this.#e = t.onInteractOutside, this.#o = t.onFocusOutside, e(() => {
			this.#a = Ie(this.opts.ref.current);
		});
		let n = A, r = () => {
			this.#g(), globalThis.bitsDismissableLayers.delete(this), this.#d.destroy(), n();
		};
		w([() => this.opts.enabled.current, () => this.opts.ref.current], () => {
			if (!(!this.opts.enabled.current || !this.opts.ref.current)) return xe(1, () => {
				this.opts.ref.current && (globalThis.bitsDismissableLayers.set(this, this.#t), n(), n = this.#l());
			}), r;
		}), y(() => {
			this.#g.destroy(), globalThis.bitsDismissableLayers.delete(this), this.#d.destroy(), this.#s(), n();
		});
	}
	#c = (e) => {
		e.defaultPrevented || this.opts.ref.current && x(() => {
			!this.opts.ref.current || this.#h(e.target) || e.target && !this.#i && this.#o.current?.(e);
		});
	};
	#l() {
		return T(m(this.#a, "pointerdown", T(this.#f, this.#m), { capture: !0 }), m(this.#a, "pointerdown", T(this.#p, this.#d)), m(this.#a, "focusin", this.#c));
	}
	#u = (e) => {
		let t = e;
		t.defaultPrevented && (t = Qt(e)), this.#e.current(e);
	};
	#d = Pe((e) => {
		if (!this.opts.ref.current) {
			this.#s();
			return;
		}
		let t = this.opts.isValidEvent.current(e, this.opts.ref.current) || Zt(e, this.opts.ref.current);
		if (!this.#r || this.#_() || !t) {
			this.#s();
			return;
		}
		let n = e;
		if (n.defaultPrevented && (n = Qt(n)), this.#t.current !== "close" && this.#t.current !== "defer-otherwise-close") {
			this.#s();
			return;
		}
		e.pointerType === "touch" ? (this.#s(), this.#s = m(this.#a, "click", this.#u, { once: !0 })) : this.#e.current(n);
	}, 10);
	#f = (e) => {
		this.#n[e.type] = !0;
	};
	#p = (e) => {
		this.#n[e.type] = !1;
	};
	#m = () => {
		this.opts.ref.current && (this.#r = Xt(this.opts.ref.current));
	};
	#h = (e) => this.opts.ref.current ? Fe(this.opts.ref.current, e) : !1;
	#g = Pe(() => {
		for (let e in this.#n) this.#n[e] = !1;
		this.#r = !1;
	}, 20);
	#_() {
		return Object.values(this.#n).some(Boolean);
	}
	#v = () => {
		this.#i = !0;
	};
	#y = () => {
		this.#i = !1;
	};
	props = {
		onfocuscapture: this.#v,
		onblurcapture: this.#y
	};
};
function Yt(e = [...globalThis.bitsDismissableLayers]) {
	return e.findLast(([e, { current: t }]) => t === "close" || t === "ignore");
}
function Xt(e) {
	let t = [...globalThis.bitsDismissableLayers], n = Yt(t);
	if (n) return n[0].opts.ref.current === e;
	let [r] = t[0];
	return r.opts.ref.current === e;
}
function Zt(e, t) {
	let n = e.target;
	if (!Ce(n)) return !1;
	let r = !!n.closest(`[${Et}]`), i = !!t.closest(`[${Dt}]`);
	return "button" in e && e.button > 0 && !r ? !1 : "button" in e && e.button === 0 && r && i ? !0 : r && i ? !1 : Ie(n).documentElement.contains(n) && !Fe(t, n) && be(e, t);
}
function Qt(e) {
	let t = e.currentTarget, n = e.target, r;
	r = e instanceof PointerEvent ? new PointerEvent(e.type, e) : new PointerEvent("pointerdown", e);
	let i = !1;
	return new Proxy(r, { get: (r, a) => a === "currentTarget" ? t : a === "target" ? n : a === "preventDefault" ? () => {
		i = !0, typeof r.preventDefault == "function" && r.preventDefault();
	} : a === "defaultPrevented" ? i : a in r ? r[a] : e[a] });
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/dismissible-layer/dismissible-layer.svelte
function $t(e, n) {
	t(n, !0);
	let c = o(n, "interactOutsideBehavior", 3, "close"), d = o(n, "onInteractOutside", 3, A), f = o(n, "onFocusOutside", 3, A), p = o(n, "isValidEvent", 3, () => !1), m = Jt.create({
		id: v(() => n.id),
		interactOutsideBehavior: v(() => c()),
		onInteractOutside: v(() => d()),
		enabled: v(() => n.enabled),
		onFocusOutside: v(() => f()),
		isValidEvent: v(() => p()),
		ref: n.ref
	});
	var h = l();
	i(r(h), () => n.children ?? u, () => ({ props: m.props })), s(e, h), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/escape-layer/use-escape-layer.svelte.js
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
var en = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	domContext;
	constructor(e) {
		this.opts = e, this.domContext = new he(this.opts.ref);
		let t = A;
		w(() => e.enabled.current, (n) => (n && (globalThis.bitsEscapeLayers.set(this, e.escapeKeydownBehavior), t = this.#e()), () => {
			t(), globalThis.bitsEscapeLayers.delete(this);
		}));
	}
	#e = () => m(this.domContext.getDocument(), "keydown", this.#t, { passive: !1 });
	#t = (e) => {
		if (e.key !== "Escape" || !tn(this)) return;
		let t = new KeyboardEvent(e.type, e);
		e.preventDefault();
		let n = this.opts.escapeKeydownBehavior.current;
		n !== "close" && n !== "defer-otherwise-close" || this.opts.onEscapeKeydown.current(t);
	};
};
function tn(e) {
	let t = [...globalThis.bitsEscapeLayers], n = t.findLast(([e, { current: t }]) => t === "close" || t === "ignore");
	if (n) return n[0] === e;
	let [r] = t[0];
	return r === e;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/escape-layer/escape-layer.svelte
function nn(e, n) {
	t(n, !0);
	let c = o(n, "escapeKeydownBehavior", 3, "close"), d = o(n, "onEscapeKeydown", 3, A);
	en.create({
		escapeKeydownBehavior: v(() => c()),
		onEscapeKeydown: v(() => d()),
		enabled: v(() => n.enabled),
		ref: n.ref
	});
	var f = l();
	i(r(f), () => n.children ?? u), s(e, f), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope-manager.js
var rn = class e {
	static instance;
	#e = oe([]);
	#t = /* @__PURE__ */ new WeakMap();
	#n = /* @__PURE__ */ new WeakMap();
	static getInstance() {
		return this.instance ||= new e(), this.instance;
	}
	register(e) {
		let t = this.getActive();
		t && t !== e && t.pause();
		let n = document.activeElement;
		n && n !== document.body && this.#n.set(e, n), this.#e.current = this.#e.current.filter((t) => t !== e), this.#e.current.unshift(e);
	}
	unregister(e) {
		this.#e.current = this.#e.current.filter((t) => t !== e);
		let t = this.getActive();
		t && t.resume();
	}
	getActive() {
		return this.#e.current[0];
	}
	setFocusMemory(e, t) {
		this.#t.set(e, t);
	}
	getFocusMemory(e) {
		return this.#t.get(e);
	}
	isActiveScope(e) {
		return this.getActive() === e;
	}
	setPreFocusMemory(e, t) {
		this.#n.set(e, t);
	}
	getPreFocusMemory(e) {
		return this.#n.get(e);
	}
	clearPreFocusMemory(e) {
		this.#n.delete(e);
	}
}, an = class e {
	#e = !1;
	#t = null;
	#n = rn.getInstance();
	#r = [];
	#i;
	constructor(e) {
		this.#i = e;
	}
	get paused() {
		return this.#e;
	}
	pause() {
		this.#e = !0;
	}
	resume() {
		this.#e = !1;
	}
	#a() {
		for (let e of this.#r) e();
		this.#r = [];
	}
	mount(e) {
		this.#t && this.unmount(), this.#t = e, this.#n.register(this), this.#c(), this.#o();
	}
	unmount() {
		this.#t &&= (this.#a(), this.#s(), this.#n.unregister(this), this.#n.clearPreFocusMemory(this), null);
	}
	#o() {
		if (!this.#t) return;
		let e = new CustomEvent("focusScope.onOpenAutoFocus", {
			bubbles: !1,
			cancelable: !0
		});
		this.#i.onOpenAutoFocus.current(e), e.defaultPrevented || requestAnimationFrame(() => {
			if (!this.#t) return;
			let e = this.#u();
			e ? (e.focus(), this.#n.setFocusMemory(this, e)) : this.#t.focus();
		});
	}
	#s() {
		let e = new CustomEvent("focusScope.onCloseAutoFocus", {
			bubbles: !1,
			cancelable: !0
		});
		if (this.#i.onCloseAutoFocus.current?.(e), !e.defaultPrevented) {
			let e = this.#n.getPreFocusMemory(this);
			if (e && document.contains(e)) try {
				e.focus();
			} catch {
				document.body.focus();
			}
		}
	}
	#c() {
		if (!this.#t || !this.#i.trap.current) return;
		let e = this.#t, t = e.ownerDocument;
		this.#r.push(m(t, "focusin", (t) => {
			if (this.#e || !this.#n.isActiveScope(this)) return;
			let n = t.target;
			if (n) if (e.contains(n)) this.#n.setFocusMemory(this, n);
			else {
				let n = this.#n.getFocusMemory(this);
				if (n && e.contains(n) && ht(n)) t.preventDefault(), n.focus();
				else {
					let t = this.#u(), n = this.#d()[0];
					(t || n || e).focus();
				}
			}
		}, { capture: !0 }), m(e, "keydown", (e) => {
			if (!this.#i.loop || this.#e || e.key !== "Tab" || !this.#n.isActiveScope(this)) return;
			let n = this.#l();
			if (n.length === 0) return;
			let r = n[0], i = n[n.length - 1];
			!e.shiftKey && t.activeElement === i ? (e.preventDefault(), r.focus()) : e.shiftKey && t.activeElement === r && (e.preventDefault(), i.focus());
		}));
		let n = new MutationObserver(() => {
			let t = this.#n.getFocusMemory(this);
			if (t && !e.contains(t)) {
				let t = this.#u(), n = this.#d()[0], r = t || n;
				r ? (r.focus(), this.#n.setFocusMemory(this, r)) : e.focus();
			}
		});
		n.observe(e, {
			childList: !0,
			subtree: !0
		}), this.#r.push(() => n.disconnect());
	}
	#l() {
		return this.#t ? ft(this.#t, {
			includeContainer: !1,
			getShadowRoot: !0
		}) : [];
	}
	#u() {
		return this.#l()[0] || null;
	}
	#d() {
		return this.#t ? pt(this.#t, {
			includeContainer: !1,
			getShadowRoot: !0
		}) : [];
	}
	static use(t) {
		let n = null;
		return w([() => t.ref.current, () => t.enabled.current], ([r, i]) => {
			r && i ? (n ||= new e(t), n.mount(r)) : n &&= (n.unmount(), null);
		}), y(() => {
			n?.unmount();
		}), { get props() {
			return { tabindex: -1 };
		} };
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope.svelte
function on(e, n) {
	t(n, !0);
	let c = o(n, "enabled", 3, !1), d = o(n, "trapFocus", 3, !1), f = o(n, "loop", 3, !1), p = o(n, "onCloseAutoFocus", 3, A), m = o(n, "onOpenAutoFocus", 3, A), h = an.use({
		enabled: v(() => c()),
		trap: v(() => d()),
		loop: f(),
		onCloseAutoFocus: v(() => p()),
		onOpenAutoFocus: v(() => m()),
		ref: n.ref
	});
	var g = l();
	i(r(g), () => n.focusScope ?? u, () => ({ props: h.props })), s(e, g), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/text-selection-layer/use-text-selection-layer.svelte.js
var sn = () => {};
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
var cn = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	domContext;
	#e = A;
	#t = !1;
	#n = sn;
	#r = sn;
	constructor(e) {
		this.opts = e, this.domContext = new he(e.ref);
		let t = A;
		w(() => [
			this.opts.enabled.current,
			this.opts.onPointerDown.current,
			this.opts.onPointerUp.current
		], ([e, n, r]) => (this.#t = e, this.#n = n, this.#r = r, e && (globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled), t(), t = this.#i()), () => {
			this.#t = !1, t(), this.#s(), globalThis.bitsTextSelectionLayers.delete(this);
		}));
	}
	#i() {
		return T(m(this.domContext.getDocument(), "pointerdown", this.#o), m(this.domContext.getDocument(), "pointerup", pe(this.#s, this.#a)));
	}
	#a = (e) => {
		this.#r(e);
	};
	#o = (e) => {
		let t = this.opts.ref.current, n = e.target;
		!M(t) || !M(n) || !this.#t || !dn(this) || !ae(t, n) || (this.#n(e), !e.defaultPrevented && (this.#e = un(t, this.domContext.getDocument().body)));
	};
	#s = () => {
		this.#e(), this.#e = A;
	};
}, ln = (e) => e.style.userSelect || e.style.webkitUserSelect;
function un(e, t) {
	let n = ln(t), r = ln(e);
	return Y(t, "none"), Y(e, "text"), () => {
		Y(t, n), Y(e, r);
	};
}
function Y(e, t) {
	e.style.userSelect = t, e.style.webkitUserSelect = t;
}
function dn(e) {
	let t = [...globalThis.bitsTextSelectionLayers];
	if (!t.length) return !1;
	let n = t.at(-1);
	return n ? n[0] === e : !1;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/text-selection-layer/text-selection-layer.svelte
function fn(e, n) {
	t(n, !0);
	let c = o(n, "preventOverflowTextSelection", 3, !0), d = o(n, "onPointerDown", 3, A), f = o(n, "onPointerUp", 3, A);
	cn.create({
		id: v(() => n.id),
		onPointerDown: v(() => d()),
		onPointerUp: v(() => f()),
		enabled: v(() => n.enabled && c()),
		ref: n.ref
	});
	var p = l();
	i(r(p), () => n.children ?? u), s(e, p), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/shared-state.svelte.js
var pn = class {
	#e;
	#t = 0;
	#n = c();
	#r;
	constructor(e) {
		this.#e = e;
	}
	#i() {
		--this.#t, this.#r && this.#t <= 0 && (this.#r(), f(this.#n, void 0), this.#r = void 0);
	}
	get(...t) {
		return this.#t += 1, n(this.#n) === void 0 && (this.#r = h(() => {
			f(this.#n, this.#e(...t), !0);
		})), e(() => () => {
			this.#i();
		}), n(this.#n);
	}
}, X = new g(), Z = c(null), mn = null, Q = null, $ = !1, hn = v(() => {
	for (let e of X.values()) if (e) return !0;
	return !1;
}), gn = null, _n = new pn(() => {
	function e() {
		document.body.setAttribute("style", n(Z) ?? ""), document.body.style.removeProperty("--scrollbar-width"), we && mn?.(), f(Z, null);
	}
	function t() {
		Q !== null && (window.clearTimeout(Q), Q = null);
	}
	function r(e, n) {
		t(), $ = !0, gn = Date.now();
		let r = gn, i = () => {
			Q = null, gn === r && (yn(X) ? $ = !1 : ($ = !1, n()));
		}, a = e === null ? 24 : e;
		Q = window.setTimeout(i, a);
	}
	function i() {
		n(Z) === null && X.size === 0 && !$ && f(Z, document.body.getAttribute("style"), !0);
	}
	return w(() => hn.current, () => {
		if (!hn.current) return;
		i(), $ = !1;
		let e = getComputedStyle(document.documentElement), t = getComputedStyle(document.body), n = e.scrollbarGutter?.includes("stable") || t.scrollbarGutter?.includes("stable"), r = window.innerWidth - document.documentElement.clientWidth, a = {
			padding: Number.parseInt(t.paddingRight ?? "0", 10) + r,
			margin: Number.parseInt(t.marginRight ?? "0", 10)
		};
		r > 0 && !n && (document.body.style.paddingRight = `${a.padding}px`, document.body.style.marginRight = `${a.margin}px`, document.body.style.setProperty("--scrollbar-width", `${r}px`)), document.body.style.overflow = "hidden", we && (mn = m(document, "touchmove", (e) => {
			e.target === document.documentElement && (e.touches.length > 1 || e.preventDefault());
		}, { passive: !1 })), x(() => {
			document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
		});
	}), y(() => () => {
		mn?.();
	}), {
		get lockMap() {
			return X;
		},
		resetBodyStyle: e,
		scheduleCleanupIfNoNewLocks: r,
		cancelPendingCleanup: t,
		ensureInitialStyleCaptured: i
	};
}), vn = class {
	#e = ge();
	#t;
	#n = () => null;
	#r;
	locked;
	constructor(e, t = () => null) {
		this.#t = e, this.#n = t, this.#r = _n.get(), this.#r && (this.#r.cancelPendingCleanup(), this.#r.ensureInitialStyleCaptured(), this.#r.lockMap.set(this.#e, this.#t ?? !1), this.locked = v(() => this.#r.lockMap.get(this.#e) ?? !1, (e) => this.#r.lockMap.set(this.#e, e)), y(() => {
			if (this.#r.lockMap.delete(this.#e), yn(this.#r.lockMap)) return;
			let e = this.#n();
			this.#r.scheduleCleanupIfNoNewLocks(e, () => {
				this.#r.resetBodyStyle();
			});
		}));
	}
};
function yn(e) {
	for (let [t, n] of e) if (n) return !0;
	return !1;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/bits/utilities/scroll-lock/scroll-lock.svelte
function bn(e, n) {
	t(n, !0);
	let r = o(n, "preventScroll", 3, !0), i = o(n, "restoreScrollDelay", 3, null);
	r() && new vn(r(), () => i()), a();
}
//#endregion
export { Ve as S, bt as _, $t as a, yt as b, Wt as c, Bt as d, Gt as f, xt as g, wt as h, nn as i, Vt as l, Tt as m, fn as n, Kt as o, qt as p, on as r, Ht as s, bn as t, At as u, q as v, G as x, vt as y };
