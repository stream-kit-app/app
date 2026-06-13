import { $n as e, Gn as t, Gt as n, Hr as r, Mt as i, On as a, Qn as o, Vr as s, _n as c, ai as l, an as u, cr as d, f, in as p, m, nr as h, o as g, on as _, or as v, p as y, pr as b, zn as x } from "./index-client-BHp3UA-q.js";
import "./disclose-version-YhYaTdgb.js";
import { i as S } from "./index-client-Bl3KzSLq.js";
import { A as C, C as w, D as T, E, M as D, O, T as ee, _ as k, b as A, d as j, f as te, g as M, h as ne, j as N, k as re, l as ie, m as ae, n as oe, o as se, r as ce, u as le, w as ue, x as P } from "./animations-complete-LXv254CE.js";
import { a as de, c as fe, i as pe, o as me, r as he, s as ge, t as _e } from "./use-id-BrfCmVmn.js";
import { a as F, c as ve, i as ye, o as be, r as xe, s as Se, t as Ce } from "./presence-manager.svelte-BwnRDFCN.js";
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_eda23719c06f49b3fd4471540fb738b4/node_modules/svelte-toolbelt/dist/box/box.svelte.js
function I(e) {
	let t = d(h(e));
	return {
		[ue]: !0,
		[C]: !0,
		get current() {
			return a(t);
		},
		set current(e) {
			v(t, e, !0);
		}
	};
}
I.from = E, I.with = T, I.flatten = ee, I.readonly = D, I.isBox = O, I.isWritableBox = re;
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_eda23719c06f49b3fd4471540fb738b4/node_modules/svelte-toolbelt/dist/utils/after-sleep.js
function we(e, t) {
	return setTimeout(t, e);
}
var Te = "ArrowDown", Ee = "ArrowLeft", De = "ArrowRight", Oe = "ArrowUp", ke = "Backspace", Ae = "CapsLock", je = "Control", Me = "Enter", Ne = "Escape", Pe = "Home", Fe = "Meta", Ie = "PageDown", Le = "PageUp", Re = "Shift";
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/locale.js
function ze(e) {
	return window.getComputedStyle(e).getPropertyValue("direction");
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/get-directional-keys.js
var Be = [
	Te,
	Le,
	Pe
], Ve = [
	Oe,
	Ie,
	"End"
];
[...Be, ...Ve];
function He(e = "ltr", t = "horizontal") {
	return {
		horizontal: e === "rtl" ? Ee : De,
		vertical: Te
	}[t];
}
function Ue(e = "ltr", t = "horizontal") {
	return {
		horizontal: e === "rtl" ? De : Ee,
		vertical: Oe
	}[t];
}
function We(e = "ltr", t = "horizontal") {
	return ["ltr", "rtl"].includes(e) || (e = "ltr"), ["horizontal", "vertical"].includes(t) || (t = "horizontal"), {
		nextKey: He(e, t),
		prevKey: Ue(e, t)
	};
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/roving-focus-group.js
var Ge = class {
	#e;
	#t = I(null);
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
		let a = i.indexOf(e), { nextKey: o, prevKey: s } = We(ze(r), this.#e.orientation.current), c = this.#e.loop.current, l = {
			[o]: a + 1,
			[s]: a - 1,
			[Pe]: 0,
			End: i.length - 1
		};
		if (n) {
			let e = o === "ArrowDown" ? De : Te, t = s === "ArrowUp" ? Ee : Oe;
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
		!t || !F(t) || t.focus();
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/noop.js
function L() {}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/events.js
var Ke = class {
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
		return c(e, this.eventName, (e) => {
			t(e);
		}, n);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/debounce.js
function qe(e, t = 500) {
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
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/elements.js
function Je(e, t) {
	return e === t || e.contains(t);
}
function Ye(e) {
	return e?.ownerDocument ?? document;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/dom.js
function Xe(e, t) {
	let { clientX: n, clientY: r } = e, i = t.getBoundingClientRect();
	return n < i.left || n > i.right || r < i.top || r > i.bottom;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/menu/utils.js
var Ze = [Me, " "], Qe = [
	Te,
	Le,
	Pe
], $e = [
	Oe,
	Ie,
	"End"
], et = [...Qe, ...$e], tt = {
	ltr: [...Ze, De],
	rtl: [...Ze, Ee]
}, nt = {
	ltr: [Ee],
	rtl: [De]
};
function R(e) {
	return e.pointerType === "mouse";
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/focus.js
function rt(e, { select: t = !1 } = {}) {
	if (!e || !e.focus) return;
	let n = ae(e);
	if (n.activeElement === e) return;
	let r = n.activeElement;
	e.focus({ preventScroll: !0 }), e !== r && ve(e) && t && e.select();
}
function it(e, { select: t = !1 } = {}, n) {
	let r = n();
	for (let i of e) if (rt(i, { select: t }), n() !== r) return !0;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/is-using-keyboard/is-using-keyboard.svelte.js
var at = d(!1), ot = class e {
	static _refs = 0;
	static _cleanup;
	constructor() {
		t(() => (e._refs === 0 && (e._cleanup = x(() => {
			let e = [], t = (e) => {
				v(at, !1);
			};
			return e.push(c(document, "pointerdown", t, { capture: !0 }), c(document, "pointermove", t, { capture: !0 }), c(document, "keydown", (e) => {
				v(at, !0);
			}, { capture: !0 })), me(...e);
		})), e._refs++, () => {
			e._refs--, e._refs === 0 && (v(at, !1), e._cleanup?.());
		}));
	}
	get current() {
		return a(at);
	}
	set current(e) {
		v(at, e, !0);
	}
}, st = [
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
], ct = /* #__PURE__ */ st.join(","), lt = typeof Element > "u", z = lt ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, ut = !lt && Element.prototype.getRootNode ? function(e) {
	return e?.getRootNode?.call(e);
} : function(e) {
	return e?.ownerDocument;
}, dt = function(e, t) {
	t === void 0 && (t = !0);
	var n = e?.getAttribute?.call(e, "inert");
	return n === "" || n === "true" || t && e && (typeof e.closest == "function" ? e.closest("[inert]") : dt(e.parentNode));
}, ft = function(e) {
	var t = e?.getAttribute?.call(e, "contenteditable");
	return t === "" || t === "true";
}, pt = function(e, t, n) {
	if (dt(e)) return [];
	var r = Array.prototype.slice.apply(e.querySelectorAll(ct));
	return t && z.call(e, ct) && r.unshift(e), r = r.filter(n), r;
}, mt = function(e, t, n) {
	for (var r = [], i = Array.from(e); i.length;) {
		var a = i.shift();
		if (!dt(a, !1)) if (a.tagName === "SLOT") {
			var o = a.assignedElements(), s = mt(o.length ? o : a.children, !0, n);
			n.flatten ? r.push.apply(r, s) : r.push({
				scopeParent: a,
				candidates: s
			});
		} else {
			z.call(a, ct) && n.filter(a) && (t || !e.includes(a)) && r.push(a);
			var c = a.shadowRoot || typeof n.getShadowRoot == "function" && n.getShadowRoot(a), l = !dt(c, !1) && (!n.shadowRootFilter || n.shadowRootFilter(a));
			if (c && l) {
				var u = mt(c === !0 ? a.children : c.children, !0, n);
				n.flatten ? r.push.apply(r, u) : r.push({
					scopeParent: a,
					candidates: u
				});
			} else i.unshift.apply(i, a.children);
		}
	}
	return r;
}, ht = function(e) {
	return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, gt = function(e) {
	if (!e) throw Error("No node provided");
	return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || ft(e)) && !ht(e) ? 0 : e.tabIndex;
}, _t = function(e, t) {
	var n = gt(e);
	return n < 0 && t && !ht(e) ? 0 : n;
}, vt = function(e, t) {
	return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, yt = function(e) {
	return e.tagName === "INPUT";
}, bt = function(e) {
	return yt(e) && e.type === "hidden";
}, xt = function(e) {
	return e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(e) {
		return e.tagName === "SUMMARY";
	});
}, St = function(e, t) {
	for (var n = 0; n < e.length; n++) if (e[n].checked && e[n].form === t) return e[n];
}, Ct = function(e) {
	if (!e.name) return !0;
	var t = e.form || ut(e), n = function(e) {
		return t.querySelectorAll("input[type=\"radio\"][name=\"" + e + "\"]");
	}, r;
	if (typeof window < "u" && window.CSS !== void 0 && typeof window.CSS.escape == "function") r = n(window.CSS.escape(e.name));
	else try {
		r = n(e.name);
	} catch (e) {
		return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", e.message), !1;
	}
	var i = St(r, e.form);
	return !i || i === e;
}, wt = function(e) {
	return yt(e) && e.type === "radio";
}, Tt = function(e) {
	return wt(e) && !Ct(e);
}, Et = function(e) {
	var t = e && ut(e), n = t?.host, r = !1;
	if (t && t !== e) {
		var i, a, o;
		for (r = !!((i = n) != null && (a = i.ownerDocument) != null && a.contains(n) || e != null && (o = e.ownerDocument) != null && o.contains(e)); !r && n;) {
			var s, c;
			t = ut(n), n = t?.host, r = !!((s = n) != null && (c = s.ownerDocument) != null && c.contains(n));
		}
	}
	return r;
}, Dt = function(e) {
	var t = e.getBoundingClientRect(), n = t.width, r = t.height;
	return n === 0 && r === 0;
}, Ot = function(e, t) {
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
				var o = e.parentElement, s = ut(e);
				if (o && !o.shadowRoot && r(o) === !0) return Dt(e);
				e = e.assignedSlot ? e.assignedSlot : !o && s !== e.ownerDocument ? s.host : o;
			}
			e = a;
		}
		if (Et(e)) return !e.getClientRects().length;
		if (n !== "legacy-full") return !0;
	} else if (n === "non-zero-area") return Dt(e);
	return !1;
}, kt = function(e) {
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
}, At = function(e, t) {
	return !(t.disabled || bt(t) || Ot(t, e) || xt(t) || kt(t));
}, jt = function(e, t) {
	return !(Tt(t) || gt(t) < 0 || !At(e, t));
}, Mt = function(e) {
	var t = parseInt(e.getAttribute("tabindex"), 10);
	return !!(isNaN(t) || t >= 0);
}, Nt = function(e) {
	var t = [], n = [];
	return e.forEach(function(e, r) {
		var i = !!e.scopeParent, a = i ? e.scopeParent : e, o = _t(a, i), s = i ? Nt(e.candidates) : a;
		o === 0 ? i ? t.push.apply(t, s) : t.push(a) : n.push({
			documentOrder: r,
			tabIndex: o,
			item: e,
			isScope: i,
			content: s
		});
	}), n.sort(vt).reduce(function(e, t) {
		return t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e;
	}, []).concat(t);
}, Pt = function(e, t) {
	return t ||= {}, Nt(t.getShadowRoot ? mt([e], t.includeContainer, {
		filter: jt.bind(null, t),
		flatten: !1,
		getShadowRoot: t.getShadowRoot,
		shadowRootFilter: Mt
	}) : pt(e, t.includeContainer, jt.bind(null, t)));
}, Ft = function(e, t) {
	return t ||= {}, t.getShadowRoot ? mt([e], t.includeContainer, {
		filter: At.bind(null, t),
		flatten: !0,
		getShadowRoot: t.getShadowRoot
	}) : pt(e, t.includeContainer, At.bind(null, t));
}, It = function(e, t) {
	if (t ||= {}, !e) throw Error("No node provided");
	return z.call(e, ct) === !1 ? !1 : jt(t, e);
}, Lt = /* #__PURE__ */ st.concat("iframe:not([inert]):not([inert] *)").join(","), Rt = function(e, t) {
	if (t ||= {}, !e) throw Error("No node provided");
	return z.call(e, Lt) === !1 ? !1 : At(t, e);
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/tabbable.js
function zt() {
	return {
		getShadowRoot: !0,
		displayCheck: typeof ResizeObserver == "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
	};
}
function Bt(e, t) {
	if (!It(e, zt())) return Vt(e, t);
	let n = ae(e), r = Pt(n.body, zt());
	t === "prev" && r.reverse();
	let i = r.indexOf(e);
	return i === -1 ? n.body : r.slice(i + 1)[0];
}
function Vt(e, t) {
	let n = ae(e);
	if (!Rt(e, zt())) return n.body;
	let r = Ft(n.body, zt());
	t === "prev" && r.reverse();
	let i = r.indexOf(e);
	return i === -1 ? n.body : r.slice(i + 1).find((e) => It(e, zt())) ?? n.body;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/arrays.js
function Ht(e, t, n = !0) {
	if (!(e.length === 0 || t < 0 || t >= e.length)) return e.length === 1 && t === 0 ? e[0] : t === e.length - 1 ? n ? e[0] : void 0 : e[t + 1];
}
function Ut(e, t, n = !0) {
	if (!(e.length === 0 || t < 0 || t >= e.length)) return e.length === 1 && t === 0 ? e[0] : t === 0 ? n ? e[e.length - 1] : void 0 : e[t - 1];
}
function Wt(e, t, n, r = !0) {
	if (e.length === 0 || t < 0 || t >= e.length) return;
	let i = t + n;
	return i = r ? (i % e.length + e.length) % e.length : Math.max(0, Math.min(i, e.length - 1)), e[i];
}
function Gt(e, t, n, r = !0) {
	if (e.length === 0 || t < 0 || t >= e.length) return;
	let i = t - n;
	return i = r ? (i % e.length + e.length) % e.length : Math.max(0, Math.min(i, e.length - 1)), e[i];
}
function Kt(e, t, n) {
	let r = t.toLowerCase();
	if (r.endsWith(" ")) {
		let i = r.slice(0, -1);
		if (e.filter((e) => e.toLowerCase().startsWith(i)).length <= 1) return Kt(e, i, n);
		let a = n?.toLowerCase();
		if (a && a.startsWith(i) && a.charAt(i.length) === " " && t.trim() === i) return n;
		let o = e.filter((e) => e.toLowerCase().startsWith(r));
		if (o.length > 0) {
			let t = n ? e.indexOf(n) : -1;
			return qt(o, Math.max(t, 0)).find((e) => e !== n) || n;
		}
	}
	let i = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, a = i.toLowerCase(), o = n ? e.indexOf(n) : -1, s = qt(e, Math.max(o, 0));
	i.length === 1 && (s = s.filter((e) => e !== n));
	let c = s.find((e) => e?.toLowerCase().startsWith(a));
	return c === n ? void 0 : c;
}
function qt(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/box-auto-reset.svelte.js
var Jt = {
	afterMs: 1e4,
	onChange: L
};
function Yt(e, n) {
	let { afterMs: r, onChange: i, getWindow: o } = {
		...Jt,
		...n
	}, s = null, c = d(h(e));
	function l() {
		return o().setTimeout(() => {
			v(c, e, !0), i?.(e);
		}, r);
	}
	return t(() => () => {
		s && o().clearTimeout(s);
	}), T(() => a(c), (e) => {
		v(c, e, !0), i?.(e), s && o().clearTimeout(s), s = l();
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/dom-typeahead.svelte.js
var Xt = class {
	#e;
	#t;
	#n = b(() => this.#e.onMatch ? this.#e.onMatch : (e) => e.focus());
	#r = b(() => this.#e.getCurrentItem ? this.#e.getCurrentItem : this.#e.getActiveElement);
	constructor(e) {
		this.#e = e, this.#t = Yt("", {
			afterMs: 1e3,
			getWindow: e.getWindow
		}), this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this), this.resetTypeahead = this.resetTypeahead.bind(this);
	}
	handleTypeaheadSearch(e, t) {
		if (!t.length) return;
		this.#t.current = this.#t.current + e;
		let n = a(this.#r)(), r = t.find((e) => e === n)?.textContent?.trim() ?? "", i = Kt(t.map((e) => e.textContent?.trim() ?? ""), this.#t.current, r), o = t.find((e) => e.textContent?.trim() === i);
		return o && a(this.#n)(o), o;
	}
	resetTypeahead() {
		this.#t.current = "";
	}
	get search() {
		return this.#t.current;
	}
}, Zt = "data-context-menu-trigger", Qt = "data-context-menu-content", $t = new w("Menu.Root"), en = new w("Menu.Root | Menu.Sub"), tn = new w("Menu.Content");
new w("Menu.Group | Menu.RadioGroup"), new w("Menu.RadioGroup"), new w("Menu.CheckboxGroup");
var nn = new Ke("bitsmenuopen", {
	bubbles: !1,
	cancelable: !0
}), rn = se({
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
}), an = class {
	#e;
	#t = null;
	#n = null;
	#r = !1;
	#i = null;
	#a = null;
	#o = null;
	#s = null;
	constructor(e) {
		this.#e = e, P([
			e.triggerNode,
			e.contentNode,
			e.enabled
		], ([e, t, n]) => {
			if (this.#_(), !e || !t || !n) return;
			let r = (e) => {
				R(e) && (this.#s = {
					x: e.clientX,
					y: e.clientY
				}, this.#r || this.#d(e, "content"));
			}, i = (e) => {
				R(e) && this.#f(e, "content");
			}, a = (e) => {
				R(e) && (this.#r || this.#d(e, "trigger"));
			}, o = (e) => {
				if (R(e)) {
					if (xe(e.relatedTarget)) {
						let n = this.#e.subContentSelector(), r = e.relatedTarget.closest(n);
						if (r && r !== t && r.id && t.querySelector(`[aria-controls="${r.id}"]`)) return;
					}
					this.#f(e, "trigger");
				}
			}, s = (e) => {
				R(e) && this.#m();
			}, c = (e) => {
				R(e) && this.#m();
			};
			return e.addEventListener("pointermove", r), e.addEventListener("pointerleave", i), e.addEventListener("pointerenter", s), t.addEventListener("pointermove", a), t.addEventListener("pointerleave", o), t.addEventListener("pointerenter", c), () => {
				e.removeEventListener("pointermove", r), e.removeEventListener("pointerleave", i), e.removeEventListener("pointerenter", s), t.removeEventListener("pointermove", a), t.removeEventListener("pointerleave", o), t.removeEventListener("pointerenter", c), this.#_();
			};
		}), k(() => {
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
		let i = n.getBoundingClientRect(), a = r.getBoundingClientRect(), o = ln(i, a), s, c, l;
		return t === "content" ? (s = this.#r ? this.#a ?? e : e, c = a) : (s = this.#s ?? e, c = this.#c() ?? i, l = a), this.#a = s, {
			corridor: un(i, a, o),
			intent: dn(s, c, o, t, l),
			targetRect: c,
			side: o
		};
	}
	#u(e, t, n) {
		return on(e, t) || on(e, n);
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
		if (xe(i) && (t === "content" && r.contains(i) || t === "trigger" && n.contains(i))) return;
		let a = {
			x: e.clientX,
			y: e.clientY
		}, o = this.#l(a, t);
		if (o) {
			if (!sn(a, o.targetRect) && !this.#u(a, o.corridor, o.intent)) {
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
		if (!this.#r || !this.#i || !R(e)) return;
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
		if (this.#i === "content" && sn(r, a)) {
			this.#m();
			return;
		}
		if (this.#i === "trigger" && cn(r, i, 4)) {
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
		let e = ae(this.#e.triggerNode() ?? this.#e.contentNode());
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
function on(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e].x, s = t[e].y, c = t[a].x, l = t[a].y;
		s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
	}
	return i;
}
function sn(e, t) {
	return e.x >= t.left && e.x <= t.right && e.y >= t.top && e.y <= t.bottom;
}
function cn(e, t, n) {
	return e.x >= t.left + n && e.x <= t.right - n && e.y >= t.top + n && e.y <= t.bottom - n;
}
function ln(e, t) {
	let n = e.left + e.width / 2, r = e.top + e.height / 2, i = t.left + t.width / 2, a = t.top + t.height / 2, o = i - n, s = a - r;
	return Math.abs(o) > Math.abs(s) ? o > 0 ? "right" : "left" : s > 0 ? "bottom" : "top";
}
function un(e, t, n) {
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
function dn(e, t, n, r, i) {
	let a = r === "trigger" ? fn(n) : n, o = i ? Math.min(t.top, i.top) - 8 : t.top - 8, s = i ? Math.max(t.bottom, i.bottom) + 8 : t.bottom + 8, c = i ? Math.min(t.left, i.left) - 8 : t.left - 8, l = i ? Math.max(t.right, i.right) + 8 : t.right + 8;
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
function fn(e) {
	switch (e) {
		case "top": return "bottom";
		case "bottom": return "top";
		case "left": return "right";
		case "right": return "left";
	}
}
var pn = class e {
	static create(t) {
		let n = new e(t);
		return $t.set(n);
	}
	opts;
	isUsingKeyboard = new ot();
	#e = d(!1);
	get ignoreCloseAutoFocus() {
		return a(this.#e);
	}
	set ignoreCloseAutoFocus(e) {
		v(this.#e, e, !0);
	}
	#t = d(!1);
	get isPointerInTransit() {
		return a(this.#t);
	}
	set isPointerInTransit(e) {
		v(this.#t, e, !0);
	}
	constructor(e) {
		this.opts = e;
	}
	getBitsAttr = (e) => rn.getAttr(e, this.opts.variant.current);
}, mn = class e {
	static create(t, n) {
		return en.set(new e(t, n, null));
	}
	opts;
	root;
	parentMenu;
	contentId = T(() => "");
	#e = d(null);
	get contentNode() {
		return a(this.#e);
	}
	set contentNode(e) {
		v(this.#e, e, !0);
	}
	contentPresence;
	#t = d(null);
	get triggerNode() {
		return a(this.#t);
	}
	set triggerNode(e) {
		v(this.#t, e, !0);
	}
	constructor(e, t, n) {
		this.opts = e, this.root = t, this.parentMenu = n, this.contentPresence = new Ce({
			ref: T(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			},
			shouldSkipExitAnimation: () => this.root.opts.variant.current !== "menubar" || this.parentMenu !== null ? !1 : this.root.opts.shouldSkipExitAnimation?.() ?? !1
		}), n && P(() => n.opts.open.current, () => {
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
}, hn = class e {
	static create(t) {
		return tn.set(new e(t, en.get()));
	}
	opts;
	parentMenu;
	rovingFocusGroup;
	domContext;
	attachment;
	#e = d("");
	get search() {
		return a(this.#e);
	}
	set search(e) {
		v(this.#e, e, !0);
	}
	#t = 0;
	#n;
	#r = d(!1);
	get mounted() {
		return a(this.#r);
	}
	set mounted(e) {
		v(this.#r, e, !0);
	}
	#i;
	constructor(e, n) {
		this.opts = e, this.parentMenu = n, this.domContext = new he(e.ref), this.attachment = j(this.opts.ref, (e) => {
			this.parentMenu.contentNode !== e && (this.parentMenu.contentNode = e);
		}), n.contentId = e.id, this.#i = e.isSub ?? !1, this.onkeydown = this.onkeydown.bind(this), this.onblur = this.onblur.bind(this), this.onfocus = this.onfocus.bind(this), this.handleInteractOutside = this.handleInteractOutside.bind(this), new an({
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
		}), this.#n = new Xt({
			getActiveElement: () => this.domContext.getActiveElement(),
			getWindow: () => this.domContext.getWindow()
		}).handleTypeaheadSearch, this.rovingFocusGroup = new Ge({
			rootNode: T(() => this.parentMenu.contentNode),
			candidateAttr: this.parentMenu.root.getBitsAttr("item"),
			loop: this.opts.loop,
			orientation: T(() => "vertical")
		}), P(() => this.parentMenu.contentNode, (e) => e ? nn.listen(e, () => {
			M(() => {
				this.parentMenu.root.isUsingKeyboard.current && this.rovingFocusGroup.focusFirstCandidate();
			});
		}) : void 0), t(() => {
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
		if (!xe(n)) return;
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
			this.parentMenu.triggerNode && It(this.parentMenu.triggerNode) && (e.preventDefault(), this.parentMenu.triggerNode.focus());
		}
	};
	handleTabKeyDown(e) {
		let t = this.parentMenu;
		for (; t.parentMenu !== null;) t = t.parentMenu;
		if (!t.triggerNode) return;
		e.preventDefault();
		let n = Bt(t.triggerNode, e.shiftKey ? "prev" : "next");
		n ? (this.parentMenu.root.ignoreCloseAutoFocus = !0, t.onClose(), M(() => {
			n.focus(), M(() => {
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
		if (!F(t) || !F(n)) return;
		let r = t.closest(`[${this.parentMenu.root.getBitsAttr("content")}]`)?.id === this.parentMenu.contentId.current, i = e.ctrlKey || e.altKey || e.metaKey, a = e.key.length === 1;
		if (this.rovingFocusGroup.handleKeydown(t, e) || e.code === "Space") return;
		let o = this.#a();
		r && !i && a && this.#n(e.key, o), e.target?.id === this.parentMenu.contentId.current && et.includes(e.key) && (e.preventDefault(), $e.includes(e.key) && o.reverse(), it(o, { select: !1 }, () => this.domContext.getActiveElement()));
	}
	onblur(e) {
		xe(e.currentTarget) && xe(e.target) && (e.currentTarget.contains?.(e.target) || (this.domContext.getWindow().clearTimeout(this.#t), this.search = ""));
	}
	onfocus(e) {
		this.parentMenu.root.isUsingKeyboard.current && M(() => this.rovingFocusGroup.focusFirstCandidate());
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
		if (!ye(e.target)) return;
		let t = this.parentMenu.triggerNode?.id;
		if (e.target.id === t) {
			e.preventDefault();
			return;
		}
		if (e.target.closest(`#${t}`)) {
			e.preventDefault();
			return;
		}
		this.parentMenu.root.ignoreCloseAutoFocus = !0, M(() => {
			this.parentMenu.root.ignoreCloseAutoFocus = !1;
		});
	}
	get shouldRender() {
		return this.parentMenu.contentPresence.shouldRender;
	}
	#c = b(() => ({ open: this.parentMenu.opts.open.current }));
	get snippetProps() {
		return a(this.#c);
	}
	set snippetProps(e) {
		v(this.#c, e);
	}
	#l = b(() => ({
		id: this.opts.id.current,
		role: "menu",
		"aria-orientation": "vertical",
		[this.parentMenu.root.getBitsAttr("content")]: "",
		"data-state": ie(this.parentMenu.opts.open.current),
		...le(this.parentMenu.contentPresence.transitionStatus),
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
		return a(this.#l);
	}
	set props(e) {
		v(this.#l, e);
	}
	popperProps = { onCloseAutoFocus: (e) => this.onCloseAutoFocus(e) };
}, gn = class {
	opts;
	content;
	attachment;
	#e = d(!1);
	constructor(e, t) {
		this.opts = e, this.content = t, this.attachment = j(this.opts.ref), this.onpointermove = this.onpointermove.bind(this), this.onpointerleave = this.onpointerleave.bind(this), this.onfocus = this.onfocus.bind(this), this.onblur = this.onblur.bind(this);
	}
	onpointermove(e) {
		if (!e.defaultPrevented && R(e)) if (this.opts.disabled.current) this.content.onItemLeave(e);
		else {
			if (this.content.onItemEnter()) return;
			let t = e.currentTarget;
			if (!F(t)) return;
			t.focus({ preventScroll: !0 });
		}
	}
	onpointerleave(e) {
		e.defaultPrevented || R(e) && this.content.onItemLeave(e);
	}
	onfocus(e) {
		M(() => {
			e.defaultPrevented || this.opts.disabled.current || v(this.#e, !0);
		});
	}
	onblur(e) {
		M(() => {
			e.defaultPrevented || v(this.#e, !1);
		});
	}
	#t = b(() => ({
		id: this.opts.id.current,
		tabindex: -1,
		role: "menuitem",
		"aria-disabled": ce(this.opts.disabled.current),
		"data-disabled": oe(this.opts.disabled.current),
		"data-highlighted": a(this.#e) ? "" : void 0,
		[this.content.parentMenu.root.getBitsAttr("item")]: "",
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		onfocus: this.onfocus,
		onblur: this.onblur,
		...this.attachment
	}));
	get props() {
		return a(this.#t);
	}
	set props(e) {
		v(this.#t, e);
	}
}, _n = class e {
	static create(t) {
		return new e(t, new gn(t, tn.get()));
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
		if (!(this.item.opts.disabled.current || t && e.key === " ") && Ze.includes(e.key)) {
			if (!F(e.currentTarget)) return;
			e.currentTarget.click(), e.preventDefault();
		}
	}
	onclick(e) {
		this.item.opts.disabled.current || this.#t();
	}
	onpointerup(e) {
		if (!e.defaultPrevented && !this.#e) {
			if (!F(e.currentTarget)) return;
			e.currentTarget?.click();
		}
	}
	onpointerdown(e) {
		this.#e = !0;
	}
	#n = b(() => pe(this.item.props, {
		onclick: this.onclick,
		onpointerdown: this.onpointerdown,
		onpointerup: this.onpointerup,
		onkeydown: this.onkeydown
	}));
	get props() {
		return a(this.#n);
	}
	set props(e) {
		v(this.#n, e);
	}
}, vn = class e {
	static create(t) {
		let n = tn.get();
		return new e(t, new gn(t, n), n, en.get());
	}
	opts;
	item;
	content;
	submenu;
	attachment;
	#e = null;
	constructor(e, t, n, r) {
		this.opts = e, this.item = t, this.content = n, this.submenu = r, this.attachment = j(this.opts.ref, (e) => this.submenu.triggerNode = e), this.onpointerleave = this.onpointerleave.bind(this), this.onpointermove = this.onpointermove.bind(this), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this), k(() => {
			this.#t();
		});
	}
	#t() {
		this.#e !== null && (this.content.domContext.getWindow().clearTimeout(this.#e), this.#e = null);
	}
	onpointermove(e) {
		if (R(e)) {
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
		R(e) && this.#t();
	}
	onkeydown(e) {
		let t = this.content.search !== "";
		this.item.opts.disabled.current || t && e.key === " " || tt[this.submenu.root.opts.dir.current].includes(e.key) && (e.currentTarget.click(), e.preventDefault());
	}
	onclick(e) {
		if (this.item.opts.disabled.current || !F(e.currentTarget)) return;
		e.currentTarget.focus();
		let t = new CustomEvent("menusubtriggerselect", {
			bubbles: !0,
			cancelable: !0
		});
		this.opts.onSelect.current(t), this.submenu.opts.open.current || (this.submenu.onOpen(), M(() => {
			let e = this.submenu.contentNode;
			e && nn.dispatch(e);
		}));
	}
	#n = b(() => pe({
		"aria-haspopup": "menu",
		"aria-expanded": ce(this.submenu.opts.open.current),
		"data-state": ie(this.submenu.opts.open.current),
		"aria-controls": this.submenu.opts.open.current ? this.submenu.contentId.current : void 0,
		[this.submenu.root.getBitsAttr("sub-trigger")]: "",
		onclick: this.onclick,
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		onkeydown: this.onkeydown,
		...this.attachment
	}, this.item.props));
	get props() {
		return a(this.#n);
	}
	set props(e) {
		v(this.#n, e);
	}
}, yn = class e {
	static create(t) {
		return new e(t, en.get());
	}
	opts;
	parentMenu;
	attachment;
	constructor(e, t) {
		this.opts = e, this.parentMenu = t, this.attachment = j(this.opts.ref, (e) => this.parentMenu.triggerNode = e);
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
	#e = b(() => {
		if (this.parentMenu.opts.open.current && this.parentMenu.contentId.current) return this.parentMenu.contentId.current;
	});
	#t = b(() => ({
		id: this.opts.id.current,
		disabled: this.opts.disabled.current,
		"aria-haspopup": "menu",
		"aria-expanded": ce(this.parentMenu.opts.open.current),
		"aria-controls": a(this.#e),
		"data-disabled": oe(this.opts.disabled.current),
		"data-state": ie(this.parentMenu.opts.open.current),
		[this.parentMenu.root.getBitsAttr("trigger")]: "",
		onclick: this.onclick,
		onpointerdown: this.onpointerdown,
		onpointerup: this.onpointerup,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return a(this.#t);
	}
	set props(e) {
		v(this.#t, e);
	}
}, bn = class {
	static create(e) {
		let t = en.get();
		return en.set(new mn(e, t.root, t));
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/dismissible-layer/use-dismissable-layer.svelte.js
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
var xn = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	#e;
	#t;
	#n = { pointerdown: !1 };
	#r = !1;
	#i = !1;
	#a = void 0;
	#o;
	#s = L;
	constructor(e) {
		this.opts = e, this.#t = e.interactOutsideBehavior, this.#e = e.onInteractOutside, this.#o = e.onFocusOutside, t(() => {
			this.#a = Ye(this.opts.ref.current);
		});
		let n = L, r = () => {
			this.#g(), globalThis.bitsDismissableLayers.delete(this), this.#d.destroy(), n();
		};
		P([() => this.opts.enabled.current, () => this.opts.ref.current], () => {
			if (!(!this.opts.enabled.current || !this.opts.ref.current)) return we(1, () => {
				this.opts.ref.current && (globalThis.bitsDismissableLayers.set(this, this.#t), n(), n = this.#l());
			}), r;
		}), k(() => {
			this.#g.destroy(), globalThis.bitsDismissableLayers.delete(this), this.#d.destroy(), this.#s(), n();
		});
	}
	#c = (e) => {
		e.defaultPrevented || this.opts.ref.current && M(() => {
			!this.opts.ref.current || this.#h(e.target) || e.target && !this.#i && this.#o.current?.(e);
		});
	};
	#l() {
		return me(c(this.#a, "pointerdown", me(this.#f, this.#m), { capture: !0 }), c(this.#a, "pointerdown", me(this.#p, this.#d)), c(this.#a, "focusin", this.#c));
	}
	#u = (e) => {
		let t = e;
		t.defaultPrevented && (t = Tn(e)), this.#e.current(e);
	};
	#d = qe((e) => {
		if (!this.opts.ref.current) {
			this.#s();
			return;
		}
		let t = this.opts.isValidEvent.current(e, this.opts.ref.current) || wn(e, this.opts.ref.current);
		if (!this.#r || this.#_() || !t) {
			this.#s();
			return;
		}
		let n = e;
		if (n.defaultPrevented && (n = Tn(n)), this.#t.current !== "close" && this.#t.current !== "defer-otherwise-close") {
			this.#s();
			return;
		}
		e.pointerType === "touch" ? (this.#s(), this.#s = c(this.#a, "click", this.#u, { once: !0 })) : this.#e.current(n);
	}, 10);
	#f = (e) => {
		this.#n[e.type] = !0;
	};
	#p = (e) => {
		this.#n[e.type] = !1;
	};
	#m = () => {
		this.opts.ref.current && (this.#r = Cn(this.opts.ref.current));
	};
	#h = (e) => this.opts.ref.current ? Je(this.opts.ref.current, e) : !1;
	#g = qe(() => {
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
function Sn(e = [...globalThis.bitsDismissableLayers]) {
	return e.findLast(([e, { current: t }]) => t === "close" || t === "ignore");
}
function Cn(e) {
	let t = [...globalThis.bitsDismissableLayers], n = Sn(t);
	if (n) return n[0].opts.ref.current === e;
	let [r] = t[0];
	return r.opts.ref.current === e;
}
function wn(e, t) {
	let n = e.target;
	if (!ye(n)) return !1;
	let r = !!n.closest(`[${Zt}]`), i = !!t.closest(`[${Qt}]`);
	return "button" in e && e.button > 0 && !r ? !1 : "button" in e && e.button === 0 && r && i ? !0 : r && i ? !1 : Ye(n).documentElement.contains(n) && !Je(t, n) && Xe(e, t);
}
function Tn(e) {
	let t = e.currentTarget, n = e.target, r;
	r = e instanceof PointerEvent ? new PointerEvent(e.type, e) : new PointerEvent("pointerdown", e);
	let i = !1;
	return new Proxy(r, { get: (r, a) => a === "currentTarget" ? t : a === "target" ? n : a === "preventDefault" ? () => {
		i = !0, typeof r.preventDefault == "function" && r.preventDefault();
	} : a === "defaultPrevented" ? i : a in r ? r[a] : e[a] });
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/dismissible-layer/dismissible-layer.svelte
function En(e, t) {
	r(t, !0);
	let n = f(t, "interactOutsideBehavior", 3, "close"), a = f(t, "onInteractOutside", 3, L), c = f(t, "onFocusOutside", 3, L), d = f(t, "isValidEvent", 3, () => !1), m = xn.create({
		id: T(() => t.id),
		interactOutsideBehavior: T(() => n()),
		onInteractOutside: T(() => a()),
		enabled: T(() => t.enabled),
		onFocusOutside: T(() => c()),
		isValidEvent: T(() => d()),
		ref: t.ref
	});
	var h = u();
	i(o(h), () => t.children ?? l, () => ({ props: m.props })), p(e, h), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/escape-layer/use-escape-layer.svelte.js
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
var Dn = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	domContext;
	constructor(e) {
		this.opts = e, this.domContext = new he(this.opts.ref);
		let t = L;
		P(() => e.enabled.current, (n) => (n && (globalThis.bitsEscapeLayers.set(this, e.escapeKeydownBehavior), t = this.#e()), () => {
			t(), globalThis.bitsEscapeLayers.delete(this);
		}));
	}
	#e = () => c(this.domContext.getDocument(), "keydown", this.#t, { passive: !1 });
	#t = (e) => {
		if (e.key !== "Escape" || !On(this)) return;
		let t = new KeyboardEvent(e.type, e);
		e.preventDefault();
		let n = this.opts.escapeKeydownBehavior.current;
		n !== "close" && n !== "defer-otherwise-close" || this.opts.onEscapeKeydown.current(t);
	};
};
function On(e) {
	let t = [...globalThis.bitsEscapeLayers], n = t.findLast(([e, { current: t }]) => t === "close" || t === "ignore");
	if (n) return n[0] === e;
	let [r] = t[0];
	return r === e;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/escape-layer/escape-layer.svelte
function kn(e, t) {
	r(t, !0);
	let n = f(t, "escapeKeydownBehavior", 3, "close"), a = f(t, "onEscapeKeydown", 3, L);
	Dn.create({
		escapeKeydownBehavior: T(() => n()),
		onEscapeKeydown: T(() => a()),
		enabled: T(() => t.enabled),
		ref: t.ref
	});
	var c = u();
	i(o(c), () => t.children ?? l), p(e, c), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope-manager.js
var An = class e {
	static instance;
	#e = N([]);
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
}, jn = class e {
	#e = !1;
	#t = null;
	#n = An.getInstance();
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
		this.#r.push(c(t, "focusin", (t) => {
			if (this.#e || !this.#n.isActiveScope(this)) return;
			let n = t.target;
			if (n) if (e.contains(n)) this.#n.setFocusMemory(this, n);
			else {
				let n = this.#n.getFocusMemory(this);
				if (n && e.contains(n) && Rt(n)) t.preventDefault(), n.focus();
				else {
					let t = this.#u(), n = this.#d()[0];
					(t || n || e).focus();
				}
			}
		}, { capture: !0 }), c(e, "keydown", (e) => {
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
		return this.#t ? Pt(this.#t, {
			includeContainer: !1,
			getShadowRoot: !0
		}) : [];
	}
	#u() {
		return this.#l()[0] || null;
	}
	#d() {
		return this.#t ? Ft(this.#t, {
			includeContainer: !1,
			getShadowRoot: !0
		}) : [];
	}
	static use(t) {
		let n = null;
		return P([() => t.ref.current, () => t.enabled.current], ([r, i]) => {
			r && i ? (n ||= new e(t), n.mount(r)) : n &&= (n.unmount(), null);
		}), k(() => {
			n?.unmount();
		}), { get props() {
			return { tabindex: -1 };
		} };
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope.svelte
function Mn(e, t) {
	r(t, !0);
	let n = f(t, "enabled", 3, !1), a = f(t, "trapFocus", 3, !1), c = f(t, "loop", 3, !1), d = f(t, "onCloseAutoFocus", 3, L), m = f(t, "onOpenAutoFocus", 3, L), h = jn.use({
		enabled: T(() => n()),
		trap: T(() => a()),
		loop: c(),
		onCloseAutoFocus: T(() => d()),
		onOpenAutoFocus: T(() => m()),
		ref: t.ref
	});
	var g = u();
	i(o(g), () => t.focusScope ?? l, () => ({ props: h.props })), p(e, g), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/text-selection-layer/use-text-selection-layer.svelte.js
var Nn = () => {};
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
var Pn = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	domContext;
	#e = L;
	#t = !1;
	#n = Nn;
	#r = Nn;
	constructor(e) {
		this.opts = e, this.domContext = new he(e.ref);
		let t = L;
		P(() => [
			this.opts.enabled.current,
			this.opts.onPointerDown.current,
			this.opts.onPointerUp.current
		], ([e, n, r]) => (this.#t = e, this.#n = n, this.#r = r, e && (globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled), t(), t = this.#i()), () => {
			this.#t = !1, t(), this.#s(), globalThis.bitsTextSelectionLayers.delete(this);
		}));
	}
	#i() {
		return me(c(this.domContext.getDocument(), "pointerdown", this.#o), c(this.domContext.getDocument(), "pointerup", fe(this.#s, this.#a)));
	}
	#a = (e) => {
		this.#r(e);
	};
	#o = (e) => {
		let t = this.opts.ref.current, n = e.target;
		!F(t) || !F(n) || !this.#t || !Rn(this) || !te(t, n) || (this.#n(e), !e.defaultPrevented && (this.#e = In(t, this.domContext.getDocument().body)));
	};
	#s = () => {
		this.#e(), this.#e = L;
	};
}, Fn = (e) => e.style.userSelect || e.style.webkitUserSelect;
function In(e, t) {
	let n = Fn(t), r = Fn(e);
	return Ln(t, "none"), Ln(e, "text"), () => {
		Ln(t, n), Ln(e, r);
	};
}
function Ln(e, t) {
	e.style.userSelect = t, e.style.webkitUserSelect = t;
}
function Rn(e) {
	let t = [...globalThis.bitsTextSelectionLayers];
	if (!t.length) return !1;
	let n = t.at(-1);
	return n ? n[0] === e : !1;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/text-selection-layer/text-selection-layer.svelte
function zn(e, t) {
	r(t, !0);
	let n = f(t, "preventOverflowTextSelection", 3, !0), a = f(t, "onPointerDown", 3, L), c = f(t, "onPointerUp", 3, L);
	Pn.create({
		id: T(() => t.id),
		onPointerDown: T(() => a()),
		onPointerUp: T(() => c()),
		enabled: T(() => t.enabled && n()),
		ref: t.ref
	});
	var d = u();
	i(o(d), () => t.children ?? l), p(e, d), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/shared-state.svelte.js
var Bn = class {
	#e;
	#t = 0;
	#n = d();
	#r;
	constructor(e) {
		this.#e = e;
	}
	#i() {
		--this.#t, this.#r && this.#t <= 0 && (this.#r(), v(this.#n, void 0), this.#r = void 0);
	}
	get(...e) {
		return this.#t += 1, a(this.#n) === void 0 && (this.#r = x(() => {
			v(this.#n, this.#e(...e), !0);
		})), t(() => () => {
			this.#i();
		}), a(this.#n);
	}
}, Vn = new S(), Hn = d(null), Un = null, Wn = null, Gn = !1, Kn = T(() => {
	for (let e of Vn.values()) if (e) return !0;
	return !1;
}), qn = null, Jn = new Bn(() => {
	function e() {
		document.body.setAttribute("style", a(Hn) ?? ""), document.body.style.removeProperty("--scrollbar-width"), be && Un?.(), v(Hn, null);
	}
	function t() {
		Wn !== null && (window.clearTimeout(Wn), Wn = null);
	}
	function n(e, n) {
		t(), Gn = !0, qn = Date.now();
		let r = qn, i = () => {
			Wn = null, qn === r && (Xn(Vn) ? Gn = !1 : (Gn = !1, n()));
		}, a = e === null ? 24 : e;
		Wn = window.setTimeout(i, a);
	}
	function r() {
		a(Hn) === null && Vn.size === 0 && !Gn && v(Hn, document.body.getAttribute("style"), !0);
	}
	return P(() => Kn.current, () => {
		if (!Kn.current) return;
		r(), Gn = !1;
		let e = getComputedStyle(document.documentElement), t = getComputedStyle(document.body), n = e.scrollbarGutter?.includes("stable") || t.scrollbarGutter?.includes("stable"), i = window.innerWidth - document.documentElement.clientWidth, a = {
			padding: Number.parseInt(t.paddingRight ?? "0", 10) + i,
			margin: Number.parseInt(t.marginRight ?? "0", 10)
		};
		i > 0 && !n && (document.body.style.paddingRight = `${a.padding}px`, document.body.style.marginRight = `${a.margin}px`, document.body.style.setProperty("--scrollbar-width", `${i}px`)), document.body.style.overflow = "hidden", be && (Un = c(document, "touchmove", (e) => {
			e.target === document.documentElement && (e.touches.length > 1 || e.preventDefault());
		}, { passive: !1 })), M(() => {
			document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
		});
	}), k(() => () => {
		Un?.();
	}), {
		get lockMap() {
			return Vn;
		},
		resetBodyStyle: e,
		scheduleCleanupIfNoNewLocks: n,
		cancelPendingCleanup: t,
		ensureInitialStyleCaptured: r
	};
}), Yn = class {
	#e = _e();
	#t;
	#n = () => null;
	#r;
	locked;
	constructor(e, t = () => null) {
		this.#t = e, this.#n = t, this.#r = Jn.get(), this.#r && (this.#r.cancelPendingCleanup(), this.#r.ensureInitialStyleCaptured(), this.#r.lockMap.set(this.#e, this.#t ?? !1), this.locked = T(() => this.#r.lockMap.get(this.#e) ?? !1, (e) => this.#r.lockMap.set(this.#e, e)), k(() => {
			if (this.#r.lockMap.delete(this.#e), Xn(this.#r.lockMap)) return;
			let e = this.#n();
			this.#r.scheduleCleanupIfNoNewLocks(e, () => {
				this.#r.resetBodyStyle();
			});
		}));
	}
};
function Xn(e) {
	for (let [t, n] of e) if (n) return !0;
	return !1;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/scroll-lock/scroll-lock.svelte
function Zn(e, t) {
	r(t, !0);
	let n = f(t, "preventScroll", 3, !0), i = f(t, "restoreScrollDelay", 3, null);
	n() && new Yn(n(), () => i()), s();
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Qn = [
	"top",
	"right",
	"bottom",
	"left"
], B = Math.min, V = Math.max, $n = Math.round, er = Math.floor, H = (e) => ({
	x: e,
	y: e
}), tr = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function nr(e, t, n) {
	return V(e, B(t, n));
}
function U(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function W(e) {
	return e.split("-")[0];
}
function rr(e) {
	return e.split("-")[1];
}
function ir(e) {
	return e === "x" ? "y" : "x";
}
function ar(e) {
	return e === "y" ? "height" : "width";
}
function G(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function or(e) {
	return ir(G(e));
}
function sr(e, t, n) {
	n === void 0 && (n = !1);
	let r = rr(e), i = or(e), a = ar(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = gr(o)), [o, gr(o)];
}
function cr(e) {
	let t = gr(e);
	return [
		lr(e),
		t,
		lr(t)
	];
}
function lr(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var ur = ["left", "right"], dr = ["right", "left"], fr = ["top", "bottom"], pr = ["bottom", "top"];
function mr(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? dr : ur : t ? ur : dr;
		case "left":
		case "right": return t ? fr : pr;
		default: return [];
	}
}
function hr(e, t, n, r) {
	let i = rr(e), a = mr(W(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(lr)))), a;
}
function gr(e) {
	let t = W(e);
	return tr[t] + e.slice(t.length);
}
function _r(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function vr(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : _r(e);
}
function yr(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+core@1.7.5/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function br(e, t, n) {
	let { reference: r, floating: i } = e, a = G(t), o = or(t), s = ar(o), c = W(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	switch (rr(t)) {
		case "start":
			p[o] -= f * (n && l ? -1 : 1);
			break;
		case "end":
			p[o] += f * (n && l ? -1 : 1);
			break;
	}
	return p;
}
async function xr(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = U(t, e), p = vr(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = yr(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = yr(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Sr = 50, Cr = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: xr
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = br(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Sr && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = br(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, wr = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = U(e, t) || {};
		if (l == null) return {};
		let d = vr(u), f = {
			x: n,
			y: r
		}, p = or(i), m = ar(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = B(d[_], T), D = B(d[v], T), O = E, ee = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = nr(O, k, ee), j = !c.arrow && rr(i) != null && k !== A && a.reference[m] / 2 - (k < O ? E : D) - h[m] / 2 < 0, te = j ? k < O ? k - O : k - ee : 0;
		return {
			[p]: f[p] + te,
			data: {
				[p]: A,
				centerOffset: k - A - te,
				...j && { alignmentOffset: te }
			},
			reset: j
		};
	}
}), Tr = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = U(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = W(r), _ = G(o), v = W(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [gr(o)] : cr(o)), x = p !== "none";
			!d && x && b.push(...hr(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = sr(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== G(t)) || T.every((e) => G(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = G(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement":
						n = o;
						break;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Er(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Dr(e) {
	return Qn.some((t) => e[t] >= 0);
}
var Or = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = U(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Er(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Dr(e)
					} };
				}
				case "escaped": {
					let e = Er(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Dr(e)
					} };
				}
				default: return {};
			}
		}
	};
}, kr = /*#__PURE__*/ new Set(["left", "top"]);
async function Ar(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = W(n), s = rr(n), c = G(n) === "y", l = kr.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = U(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var jr = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Ar(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Mr = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = U(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = G(W(i)), p = ir(f), m = u[p], h = u[f];
			if (o) {
				let e = p === "y" ? "top" : "left", t = p === "y" ? "bottom" : "right", n = m + d[e], r = m - d[t];
				m = nr(n, m, r);
			}
			if (s) {
				let e = f === "y" ? "top" : "left", t = f === "y" ? "bottom" : "right", n = h + d[e], r = h - d[t];
				h = nr(n, h, r);
			}
			let g = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				...g,
				data: {
					x: g.x - n,
					y: g.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, Nr = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = U(e, t), u = {
				x: n,
				y: r
			}, d = G(i), f = ir(d), p = u[f], m = u[d], h = U(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: 0,
				crossAxis: 0,
				...h
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = kr.has(W(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Pr = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			var n, r;
			let { placement: i, rects: a, platform: o, elements: s } = t, { apply: c = () => {}, ...l } = U(e, t), u = await o.detectOverflow(t, l), d = W(i), f = rr(i), p = G(i) === "y", { width: m, height: h } = a.floating, g, _;
			d === "top" || d === "bottom" ? (g = d, _ = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (_ = d, g = f === "end" ? "top" : "bottom");
			let v = h - u.top - u.bottom, y = m - u.left - u.right, b = B(h - u[g], v), x = B(m - u[_], y), S = !t.middlewareData.shift, C = b, w = x;
			if ((n = t.middlewareData.shift) != null && n.enabled.x && (w = y), (r = t.middlewareData.shift) != null && r.enabled.y && (C = v), S && !f) {
				let e = V(u.left, 0), t = V(u.right, 0), n = V(u.top, 0), r = V(u.bottom, 0);
				p ? w = m - 2 * (e !== 0 || t !== 0 ? e + t : V(u.left, u.right)) : C = h - 2 * (n !== 0 || r !== 0 ? n + r : V(u.top, u.bottom));
			}
			await c({
				...t,
				availableWidth: w,
				availableHeight: C
			});
			let T = await o.getDimensions(s.floating);
			return m !== T.width || h !== T.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Fr() {
	return typeof window < "u";
}
function Ir(e) {
	return Lr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function K(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function q(e) {
	return ((Lr(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Lr(e) {
	return Fr() ? e instanceof Node || e instanceof K(e).Node : !1;
}
function J(e) {
	return Fr() ? e instanceof Element || e instanceof K(e).Element : !1;
}
function Y(e) {
	return Fr() ? e instanceof HTMLElement || e instanceof K(e).HTMLElement : !1;
}
function Rr(e) {
	return !Fr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof K(e).ShadowRoot;
}
function zr(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Z(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Br(e) {
	return /^(table|td|th)$/.test(Ir(e));
}
function Vr(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Hr = /transform|translate|scale|rotate|perspective|filter/, Ur = /paint|layout|strict|content/, X = (e) => !!e && e !== "none", Wr;
function Gr(e) {
	let t = J(e) ? Z(e) : e;
	return X(t.transform) || X(t.translate) || X(t.scale) || X(t.rotate) || X(t.perspective) || !qr() && (X(t.backdropFilter) || X(t.filter)) || Hr.test(t.willChange || "") || Ur.test(t.contain || "");
}
function Kr(e) {
	let t = Q(e);
	for (; Y(t) && !Jr(t);) {
		if (Gr(t)) return t;
		if (Vr(t)) return null;
		t = Q(t);
	}
	return null;
}
function qr() {
	return Wr ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Wr;
}
function Jr(e) {
	return /^(html|body|#document)$/.test(Ir(e));
}
function Z(e) {
	return K(e).getComputedStyle(e);
}
function Yr(e) {
	return J(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Q(e) {
	if (Ir(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Rr(e) && e.host || q(e);
	return Rr(t) ? t.host : t;
}
function Xr(e) {
	let t = Q(e);
	return Jr(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Y(t) && zr(t) ? t : Xr(t);
}
function Zr(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Xr(e), i = r === e.ownerDocument?.body, a = K(r);
	if (i) {
		let e = Qr(a);
		return t.concat(a, a.visualViewport || [], zr(r) ? r : [], e && n ? Zr(e) : []);
	} else return t.concat(r, Zr(r, [], n));
}
function Qr(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+dom@1.7.6/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function $r(e) {
	let t = Z(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Y(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = $n(n) !== a || $n(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function ei(e) {
	return J(e) ? e : e.contextElement;
}
function ti(e) {
	let t = ei(e);
	if (!Y(t)) return H(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = $r(t), o = (a ? $n(n.width) : n.width) / r, s = (a ? $n(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var ni = /*#__PURE__*/ H(0);
function ri(e) {
	let t = K(e);
	return !qr() || !t.visualViewport ? ni : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function ii(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== K(e) ? !1 : t;
}
function $(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = ei(e), o = H(1);
	t && (r ? J(r) && (o = ti(r)) : o = ti(e));
	let s = ii(a, n, r) ? ri(a) : H(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a) {
		let e = K(a), t = r && J(r) ? K(r) : r, n = e, i = Qr(n);
		for (; i && r && t !== n;) {
			let e = ti(i), t = i.getBoundingClientRect(), r = Z(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = K(i), i = Qr(n);
		}
	}
	return yr({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function ai(e, t) {
	let n = Yr(e).scrollLeft;
	return t ? t.left + n : $(q(e)).left + n;
}
function oi(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - ai(e, n),
		y: n.top + t.scrollTop
	};
}
function si(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = q(r), s = t ? Vr(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = H(1), u = H(0), d = Y(r);
	if ((d || !d && !a) && ((Ir(r) !== "body" || zr(o)) && (c = Yr(r)), d)) {
		let e = $(r);
		l = ti(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? oi(o, c) : H(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function ci(e) {
	return Array.from(e.getClientRects());
}
function li(e) {
	let t = q(e), n = Yr(e), r = e.ownerDocument.body, i = V(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = V(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight), o = -n.scrollLeft + ai(e), s = -n.scrollTop;
	return Z(r).direction === "rtl" && (o += V(t.clientWidth, r.clientWidth) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
var ui = 25;
function di(e, t) {
	let n = K(e), r = q(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		let e = qr();
		(!e || e && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	let l = ai(r);
	if (l <= 0) {
		let e = r.ownerDocument, t = e.body, n = getComputedStyle(t), i = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, o = Math.abs(r.clientWidth - t.clientWidth - i);
		o <= ui && (a -= o);
	} else l <= ui && (a += l);
	return {
		width: a,
		height: o,
		x: s,
		y: c
	};
}
function fi(e, t) {
	let n = $(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Y(e) ? ti(e) : H(1);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function pi(e, t, n) {
	let r;
	if (t === "viewport") r = di(e, n);
	else if (t === "document") r = li(q(e));
	else if (J(t)) r = fi(t, n);
	else {
		let n = ri(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return yr(r);
}
function mi(e, t) {
	let n = Q(e);
	return n === t || !J(n) || Jr(n) ? !1 : Z(n).position === "fixed" || mi(n, t);
}
function hi(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Zr(e, [], !1).filter((e) => J(e) && Ir(e) !== "body"), i = null, a = Z(e).position === "fixed", o = a ? Q(e) : e;
	for (; J(o) && !Jr(o);) {
		let t = Z(o), n = Gr(o);
		!n && t.position === "fixed" && (i = null), (a ? !n && !i : !n && t.position === "static" && i && (i.position === "absolute" || i.position === "fixed") || zr(o) && !n && mi(e, o)) ? r = r.filter((e) => e !== o) : i = t, o = Q(o);
	}
	return t.set(e, r), r;
}
function gi(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Vr(t) ? [] : hi(t, this._c) : [].concat(n), r], o = pi(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = pi(t, a[e], i);
		s = V(n.top, s), c = B(n.right, c), l = B(n.bottom, l), u = V(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function _i(e) {
	let { width: t, height: n } = $r(e);
	return {
		width: t,
		height: n
	};
}
function vi(e, t, n) {
	let r = Y(t), i = q(t), a = n === "fixed", o = $(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = H(0);
	function l() {
		c.x = ai(i);
	}
	if (r || !r && !a) if ((Ir(t) !== "body" || zr(i)) && (s = Yr(t)), r) {
		let e = $(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	} else i && l();
	a && !r && i && l();
	let u = i && !r && !a ? oi(i, s) : H(0);
	return {
		x: o.left + s.scrollLeft - c.x - u.x,
		y: o.top + s.scrollTop - c.y - u.y,
		width: o.width,
		height: o.height
	};
}
function yi(e) {
	return Z(e).position === "static";
}
function bi(e, t) {
	if (!Y(e) || Z(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return q(e) === n && (n = n.ownerDocument.body), n;
}
function xi(e, t) {
	let n = K(e);
	if (Vr(e)) return n;
	if (!Y(e)) {
		let t = Q(e);
		for (; t && !Jr(t);) {
			if (J(t) && !yi(t)) return t;
			t = Q(t);
		}
		return n;
	}
	let r = bi(e, t);
	for (; r && Br(r) && yi(r);) r = bi(r, t);
	return r && Jr(r) && yi(r) && !Gr(r) ? n : r || Kr(e) || n;
}
var Si = async function(e) {
	let t = this.getOffsetParent || xi, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: vi(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Ci(e) {
	return Z(e).direction === "rtl";
}
var wi = {
	convertOffsetParentRelativeRectToViewportRelativeRect: si,
	getDocumentElement: q,
	getClippingRect: gi,
	getOffsetParent: xi,
	getElementRects: Si,
	getClientRects: ci,
	getDimensions: _i,
	getScale: ti,
	isElement: J,
	isRTL: Ci
};
function Ti(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Ei(e, t) {
	let n = null, r, i = q(e);
	function a() {
		var e;
		clearTimeout(r), (e = n) == null || e.disconnect(), n = null;
	}
	function o(s, c) {
		s === void 0 && (s = !1), c === void 0 && (c = 1), a();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (s || t(), !f || !p) return;
		let m = er(d), h = er(i.clientWidth - (u + f)), g = er(i.clientHeight - (d + p)), _ = er(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: V(0, B(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (n !== c) {
				if (!y) return o();
				n ? o(!1, n) : r = setTimeout(() => {
					o(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !Ti(l, e.getBoundingClientRect()) && o(), y = !1;
		}
		try {
			n = new IntersectionObserver(b, {
				...v,
				root: i.ownerDocument
			});
		} catch {
			n = new IntersectionObserver(b, v);
		}
		n.observe(e);
	}
	return o(!0), a;
}
function Di(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = ei(e), u = i || a ? [...l ? Zr(l) : [], ...t ? Zr(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n, { passive: !0 }), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Ei(l, n) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? $(e) : null;
	c && g();
	function g() {
		let t = $(e);
		h && !Ti(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Oi = jr, ki = Mr, Ai = Tr, ji = Pr, Mi = Or, Ni = wr, Pi = Nr, Fi = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = {
		platform: wi,
		...n
	}, a = {
		...i.platform,
		_c: r
	};
	return Cr(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/floating-svelte/floating-utils.svelte.js
function Ii(e) {
	return typeof e == "function" ? e() : e;
}
function Li(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ri(e, t) {
	let n = Li(e);
	return Math.round(t * n) / n;
}
function zi(e) {
	return {
		[`--bits-${e}-content-transform-origin`]: "var(--bits-floating-transform-origin)",
		[`--bits-${e}-content-available-width`]: "var(--bits-floating-available-width)",
		[`--bits-${e}-content-available-height`]: "var(--bits-floating-available-height)",
		[`--bits-${e}-anchor-width`]: "var(--bits-floating-anchor-width)",
		[`--bits-${e}-anchor-height`]: "var(--bits-floating-anchor-height)"
	};
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/floating-svelte/use-floating.svelte.js
function Bi(e) {
	let n = e.whileElementsMounted, r = b(() => Ii(e.open) ?? !0), i = b(() => Ii(e.middleware)), o = b(() => Ii(e.transform) ?? !0), s = b(() => Ii(e.placement) ?? "bottom"), c = b(() => Ii(e.strategy) ?? "absolute"), l = b(() => Ii(e.sideOffset) ?? 0), u = b(() => Ii(e.alignOffset) ?? 0), f = e.reference, p = d(0), m = d(0), g = N(null), _ = d(h(a(c))), y = d(h(a(s))), x = d(h({})), S = d(!1), C = !1, w = 0, T = b(() => {
		let e = g.current ? Ri(g.current, a(p)) : a(p), t = g.current ? Ri(g.current, a(m)) : a(m);
		return a(o) ? {
			position: a(_),
			left: "0",
			top: "0",
			transform: `translate(${e}px, ${t}px)`,
			...g.current && Li(g.current) >= 1.5 && { willChange: "transform" }
		} : {
			position: a(_),
			left: `${e}px`,
			top: `${t}px`
		};
	}), E;
	function D() {
		if (f.current === null || g.current === null) return;
		let e = f.current, t = g.current, n = ++w;
		Fi(e, t, {
			middleware: a(i),
			placement: a(s),
			strategy: a(c)
		}).then((i) => {
			if (n === w && !(f.current !== e || g.current !== t)) {
				if (Vi(e)) {
					v(x, {
						...a(x),
						hide: {
							...a(x).hide,
							referenceHidden: !0
						}
					}, !0);
					return;
				}
				if (!a(r) && a(p) !== 0 && a(m) !== 0) {
					let e = Math.max(Math.abs(a(l)), Math.abs(a(u)), 15);
					if (i.x <= e && i.y <= e) return;
				}
				v(p, i.x, !0), v(m, i.y, !0), v(_, i.strategy, !0), v(y, i.placement, !0), v(x, i.middlewareData, !0), v(S, !0);
			}
		});
	}
	function O() {
		typeof E == "function" && (E(), E = void 0), w++;
	}
	function ee() {
		if (O(), n === void 0) {
			D();
			return;
		}
		a(r) && (f.current === null || g.current === null || (E = n(f.current, g.current, D)));
	}
	function k() {
		!a(r) && g.current === null && v(S, !1);
	}
	function A() {
		return [
			a(i),
			a(s),
			a(c),
			a(l),
			a(u),
			a(r)
		];
	}
	return t(() => {
		n === void 0 && a(r) && D();
	}), t(ee), t(() => {
		if (n !== void 0) {
			if (A(), !a(r)) {
				C = !1;
				return;
			}
			if (!a(S)) {
				C = !1;
				return;
			}
			if (!C) {
				C = !0;
				return;
			}
			D();
		}
	}), t(k), t(() => O), {
		floating: g,
		reference: f,
		get strategy() {
			return a(_);
		},
		get placement() {
			return a(y);
		},
		get middlewareData() {
			return a(x);
		},
		get isPositioned() {
			return a(S);
		},
		get floatingStyles() {
			return a(T);
		},
		get update() {
			return D;
		}
	};
}
function Vi(e) {
	return e instanceof Element ? !e.isConnected || e instanceof HTMLElement && e.hidden ? !0 : e.getClientRects().length === 0 : !1;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/floating-layer/use-floating-layer.svelte.js
var Hi = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Ui = new w("Floating.Root"), Wi = new w("Floating.Content"), Gi = new w("Floating.Root"), Ki = class e {
	static create(t = !1) {
		return t ? Gi.set(new e()) : Ui.set(new e());
	}
	anchorNode = N(null);
	customAnchorNode = N(null);
	triggerNode = N(null);
	constructor() {
		t(() => {
			this.customAnchorNode.current ? typeof this.customAnchorNode.current == "string" ? this.anchorNode.current = document.querySelector(this.customAnchorNode.current) : this.anchorNode.current = this.customAnchorNode.current : this.anchorNode.current = this.triggerNode.current;
		});
	}
}, qi = class e {
	static create(t, n = !1) {
		return n ? Wi.set(new e(t, Gi.get())) : Wi.set(new e(t, Ui.get()));
	}
	opts;
	root;
	contentRef = N(null);
	wrapperRef = N(null);
	arrowRef = N(null);
	contentAttachment = j(this.contentRef);
	wrapperAttachment = j(this.wrapperRef);
	arrowAttachment = j(this.arrowRef);
	arrowId = N(_e());
	#e = b(() => {
		if (typeof this.opts.style == "string") return ge(this.opts.style);
		if (!this.opts.style) return {};
	});
	#t = void 0;
	#n = new A(() => this.arrowRef.current ?? void 0);
	#r = b(() => this.#n?.width ?? 0);
	#i = b(() => this.#n?.height ?? 0);
	#a = b(() => this.opts.side?.current + (this.opts.align.current === "center" ? "" : `-${this.opts.align.current}`));
	#o = b(() => Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]);
	#s = b(() => a(this.#o).length > 0);
	get hasExplicitBoundaries() {
		return a(this.#s);
	}
	set hasExplicitBoundaries(e) {
		v(this.#s, e);
	}
	#c = b(() => ({
		padding: this.opts.collisionPadding.current,
		boundary: a(this.#o).filter(Se),
		altBoundary: this.hasExplicitBoundaries
	}));
	get detectOverflowOptions() {
		return a(this.#c);
	}
	set detectOverflowOptions(e) {
		v(this.#c, e);
	}
	#l = d(void 0);
	#u = d(void 0);
	#d = d(void 0);
	#f = d(void 0);
	#p = b(() => [
		Oi({
			mainAxis: this.opts.sideOffset.current + a(this.#i),
			alignmentAxis: this.opts.alignOffset.current
		}),
		this.opts.avoidCollisions.current && ki({
			mainAxis: !0,
			crossAxis: !1,
			limiter: this.opts.sticky.current === "partial" ? Pi() : void 0,
			...this.detectOverflowOptions
		}),
		this.opts.avoidCollisions.current && Ai({ ...this.detectOverflowOptions }),
		ji({
			...this.detectOverflowOptions,
			apply: ({ rects: e, availableWidth: t, availableHeight: n }) => {
				let { width: r, height: i } = e.reference;
				v(this.#l, t, !0), v(this.#u, n, !0), v(this.#d, r, !0), v(this.#f, i, !0);
			}
		}),
		this.arrowRef.current && Ni({
			element: this.arrowRef.current,
			padding: this.opts.arrowPadding.current
		}),
		Yi({
			arrowWidth: a(this.#r),
			arrowHeight: a(this.#i)
		}),
		this.opts.hideWhenDetached.current && Mi({
			strategy: "referenceHidden",
			...this.detectOverflowOptions
		})
	].filter(Boolean));
	get middleware() {
		return a(this.#p);
	}
	set middleware(e) {
		v(this.#p, e);
	}
	floating;
	#m = b(() => Zi(this.floating.placement));
	get placedSide() {
		return a(this.#m);
	}
	set placedSide(e) {
		v(this.#m, e);
	}
	#h = b(() => Qi(this.floating.placement));
	get placedAlign() {
		return a(this.#h);
	}
	set placedAlign(e) {
		v(this.#h, e);
	}
	#g = b(() => this.floating.middlewareData.arrow?.x ?? 0);
	get arrowX() {
		return a(this.#g);
	}
	set arrowX(e) {
		v(this.#g, e);
	}
	#_ = b(() => this.floating.middlewareData.arrow?.y ?? 0);
	get arrowY() {
		return a(this.#_);
	}
	set arrowY(e) {
		v(this.#_, e);
	}
	#v = b(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
	get cannotCenterArrow() {
		return a(this.#v);
	}
	set cannotCenterArrow(e) {
		v(this.#v, e);
	}
	#y = d();
	get contentZIndex() {
		return a(this.#y);
	}
	set contentZIndex(e) {
		v(this.#y, e, !0);
	}
	#b = b(() => Hi[this.placedSide]);
	get arrowBaseSide() {
		return a(this.#b);
	}
	set arrowBaseSide(e) {
		v(this.#b, e);
	}
	#x = b(() => ({
		id: this.opts.wrapperId.current,
		"data-bits-floating-content-wrapper": "",
		style: {
			...this.floating.floatingStyles,
			transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: this.contentZIndex,
			"--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
			"--bits-floating-available-width": `${a(this.#l)}px`,
			"--bits-floating-available-height": `${a(this.#u)}px`,
			"--bits-floating-anchor-width": `${a(this.#d)}px`,
			"--bits-floating-anchor-height": `${a(this.#f)}px`,
			...this.floating.middlewareData.hide?.referenceHidden && {
				visibility: "hidden",
				"pointer-events": "none"
			},
			...a(this.#e)
		},
		dir: this.opts.dir.current,
		...this.wrapperAttachment
	}));
	get wrapperProps() {
		return a(this.#x);
	}
	set wrapperProps(e) {
		v(this.#x, e);
	}
	#S = b(() => ({
		"data-side": this.placedSide,
		"data-align": this.placedAlign,
		style: de({ ...a(this.#e) }),
		...this.contentAttachment
	}));
	get props() {
		return a(this.#S);
	}
	set props(e) {
		v(this.#S, e);
	}
	#C = b(() => ({
		position: "absolute",
		left: this.arrowX ? `${this.arrowX}px` : void 0,
		top: this.arrowY ? `${this.arrowY}px` : void 0,
		[this.arrowBaseSide]: 0,
		"transform-origin": {
			top: "",
			right: "0 0",
			bottom: "center 0",
			left: "100% 0"
		}[this.placedSide],
		transform: {
			top: "translateY(100%)",
			right: "translateY(50%) rotate(90deg) translateX(-50%)",
			bottom: "rotate(180deg)",
			left: "translateY(50%) rotate(-90deg) translateX(50%)"
		}[this.placedSide],
		visibility: this.cannotCenterArrow ? "hidden" : void 0
	}));
	get arrowStyle() {
		return a(this.#C);
	}
	set arrowStyle(e) {
		v(this.#C, e);
	}
	constructor(e, n) {
		this.opts = e, this.root = n, this.#t = e.updatePositionStrategy, e.customAnchor && (this.root.customAnchorNode.current = e.customAnchor.current), P(() => e.customAnchor.current, (e) => {
			this.root.customAnchorNode.current = e;
		}), this.floating = Bi({
			strategy: () => this.opts.strategy.current,
			placement: () => a(this.#a),
			middleware: () => this.middleware,
			reference: this.root.anchorNode,
			whileElementsMounted: (...e) => Di(...e, { animationFrame: this.#t?.current === "always" }),
			open: () => this.opts.enabled.current,
			sideOffset: () => this.opts.sideOffset.current,
			alignOffset: () => this.opts.alignOffset.current
		}), t(() => {
			this.floating.isPositioned && this.opts.onPlaced?.current();
		}), P(() => this.contentRef.current, (e) => {
			if (!e || !this.opts.enabled.current) return;
			let t = ne(e), n = t.requestAnimationFrame(() => {
				if (this.contentRef.current !== e || !this.opts.enabled.current) return;
				let n = t.getComputedStyle(e).zIndex;
				n !== this.contentZIndex && (this.contentZIndex = n);
			});
			return () => {
				t.cancelAnimationFrame(n);
			};
		}), t(() => {
			this.floating.floating.current = this.wrapperRef.current;
		});
	}
}, Ji = class e {
	static create(t, n = !1) {
		return n ? new e(t, Gi.get()) : new e(t, Ui.get());
	}
	opts;
	root;
	constructor(e, t) {
		this.opts = e, this.root = t, e.virtualEl && e.virtualEl.current ? t.triggerNode = E(e.virtualEl.current) : t.triggerNode = e.ref;
	}
};
function Yi(e) {
	return {
		name: "transformOrigin",
		options: e,
		fn(t) {
			let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Xi(n), u = {
				start: "0%",
				center: "50%",
				end: "100%"
			}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
			return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
				x: p,
				y: m
			} };
		}
	};
}
function Xi(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
function Zi(e) {
	return Xi(e)[0];
}
function Qi(e) {
	return Xi(e)[1];
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer.svelte
function $i(e, t) {
	r(t, !0);
	let n = f(t, "tooltip", 3, !1);
	Ki.create(n());
	var a = u();
	i(o(a), () => t.children ?? l), p(e, a), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content.svelte
function ea(e, t) {
	r(t, !0);
	let n = f(t, "side", 3, "bottom"), c = f(t, "sideOffset", 3, 0), d = f(t, "align", 3, "center"), m = f(t, "alignOffset", 3, 0), h = f(t, "arrowPadding", 3, 0), g = f(t, "avoidCollisions", 3, !0), _ = f(t, "collisionBoundary", 19, () => []), v = f(t, "collisionPadding", 3, 0), y = f(t, "hideWhenDetached", 3, !1), x = f(t, "onPlaced", 3, () => {}), S = f(t, "sticky", 3, "partial"), C = f(t, "updatePositionStrategy", 3, "optimized"), w = f(t, "strategy", 3, "fixed"), E = f(t, "dir", 3, "ltr"), D = f(t, "style", 19, () => ({})), O = f(t, "wrapperId", 19, _e), ee = f(t, "customAnchor", 3, null), k = f(t, "tooltip", 3, !1), A = qi.create({
		side: T(() => n()),
		sideOffset: T(() => c()),
		align: T(() => d()),
		alignOffset: T(() => m()),
		id: T(() => t.id),
		arrowPadding: T(() => h()),
		avoidCollisions: T(() => g()),
		collisionBoundary: T(() => _()),
		collisionPadding: T(() => v()),
		hideWhenDetached: T(() => y()),
		onPlaced: T(() => x()),
		sticky: T(() => S()),
		updatePositionStrategy: T(() => C()),
		strategy: T(() => w()),
		dir: T(() => E()),
		style: T(() => D()),
		enabled: T(() => t.enabled),
		wrapperId: T(() => O()),
		customAnchor: T(() => ee())
	}, k()), j = b(() => pe(A.wrapperProps, { style: { pointerEvents: "auto" } }));
	var te = u();
	i(o(te), () => t.content ?? l, () => ({
		props: A.props,
		wrapperProps: a(j)
	})), p(e, te), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content-static.svelte
function ta(e, t) {
	r(t, !0), g(() => {
		t.onPlaced?.();
	});
	var n = u();
	i(o(n), () => t.content ?? l, () => ({
		props: {},
		wrapperProps: {}
	})), p(e, n), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-content.svelte
var na = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"content",
	"isStatic",
	"onPlaced"
]);
function ra(e, t) {
	let r = f(t, "isStatic", 3, !1), i = y(t, na);
	var a = u(), s = o(a), c = (e) => {
		ta(e, {
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		});
	}, l = (e) => {
		ea(e, m({
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		}, () => i));
	};
	n(s, (e) => {
		r() ? e(c) : e(l, -1);
	}), p(e, a);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-inner.svelte
var ia = new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled.ref.tooltip.contentPointerEvents".split(".")), aa = _("<!> <!>", 1);
function oa(t, c) {
	r(c, !0);
	let d = f(c, "interactOutsideBehavior", 3, "close"), m = f(c, "trapFocus", 3, !0), h = f(c, "isValidEvent", 3, () => !1), g = f(c, "customAnchor", 3, null), _ = f(c, "isStatic", 3, !1), v = f(c, "tooltip", 3, !1), x = f(c, "contentPointerEvents", 3, "auto"), S = y(c, ia), C = b(() => c.preventScroll ?? !0), w = b(() => c.strategy ?? (a(C) ? "fixed" : "absolute"));
	ra(t, {
		get isStatic() {
			return _();
		},
		get id() {
			return c.id;
		},
		get side() {
			return c.side;
		},
		get sideOffset() {
			return c.sideOffset;
		},
		get align() {
			return c.align;
		},
		get alignOffset() {
			return c.alignOffset;
		},
		get arrowPadding() {
			return c.arrowPadding;
		},
		get avoidCollisions() {
			return c.avoidCollisions;
		},
		get collisionBoundary() {
			return c.collisionBoundary;
		},
		get collisionPadding() {
			return c.collisionPadding;
		},
		get sticky() {
			return c.sticky;
		},
		get hideWhenDetached() {
			return c.hideWhenDetached;
		},
		get updatePositionStrategy() {
			return c.updatePositionStrategy;
		},
		get strategy() {
			return a(w);
		},
		get dir() {
			return c.dir;
		},
		get wrapperId() {
			return c.wrapperId;
		},
		get style() {
			return c.style;
		},
		get onPlaced() {
			return c.onPlaced;
		},
		get customAnchor() {
			return g();
		},
		get enabled() {
			return c.enabled;
		},
		get tooltip() {
			return v();
		},
		content: (t, r) => {
			let s = () => r?.().props, f = () => r?.().wrapperProps;
			var g = aa(), _ = o(g), v = (e) => {
				Zn(e, { get preventScroll() {
					return a(C);
				} });
			}, y = (e) => {
				Zn(e, { get preventScroll() {
					return a(C);
				} });
			};
			n(_, (e) => {
				c.forceMount && c.enabled ? e(v) : c.forceMount || e(y, 1);
			}), Mn(e(_, 2), {
				get onOpenAutoFocus() {
					return c.onOpenAutoFocus;
				},
				get onCloseAutoFocus() {
					return c.onCloseAutoFocus;
				},
				get loop() {
					return c.loop;
				},
				get enabled() {
					return c.enabled;
				},
				get trapFocus() {
					return m();
				},
				get forceMount() {
					return c.forceMount;
				},
				get ref() {
					return c.ref;
				},
				focusScope: (e, t) => {
					let n = () => t?.().props;
					kn(e, {
						get onEscapeKeydown() {
							return c.onEscapeKeydown;
						},
						get escapeKeydownBehavior() {
							return c.escapeKeydownBehavior;
						},
						get enabled() {
							return c.enabled;
						},
						get ref() {
							return c.ref;
						},
						children: (e, t) => {
							En(e, {
								get id() {
									return c.id;
								},
								get onInteractOutside() {
									return c.onInteractOutside;
								},
								get onFocusOutside() {
									return c.onFocusOutside;
								},
								get interactOutsideBehavior() {
									return d();
								},
								get isValidEvent() {
									return h();
								},
								get enabled() {
									return c.enabled;
								},
								get ref() {
									return c.ref;
								},
								children: (e, t) => {
									let r = () => t?.().props;
									zn(e, {
										get id() {
											return c.id;
										},
										get preventOverflowTextSelection() {
											return c.preventOverflowTextSelection;
										},
										get onPointerDown() {
											return c.onPointerDown;
										},
										get onPointerUp() {
											return c.onPointerUp;
										},
										get enabled() {
											return c.enabled;
										},
										get ref() {
											return c.ref;
										},
										children: (e, t) => {
											var d = u(), m = o(d);
											{
												let e = b(() => ({
													props: pe(S, s(), r(), n(), { style: { pointerEvents: x() } }),
													wrapperProps: f()
												}));
												i(m, () => c.popper ?? l, () => a(e));
											}
											p(e, d);
										},
										$$slots: { default: !0 }
									});
								},
								$$slots: { default: !0 }
							});
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { focusScope: !0 }
			}), p(t, g);
		},
		$$slots: { content: !0 }
	}), s();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer.svelte
var sa = new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.open.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.ref.shouldRender".split("."));
function ca(e, t) {
	let r = f(t, "interactOutsideBehavior", 3, "close"), i = f(t, "trapFocus", 3, !0), a = f(t, "isValidEvent", 3, () => !1), s = f(t, "customAnchor", 3, null), c = f(t, "isStatic", 3, !1), l = y(t, sa);
	var d = u(), h = o(d), g = (e) => {
		oa(e, m({
			get popper() {
				return t.popper;
			},
			get onEscapeKeydown() {
				return t.onEscapeKeydown;
			},
			get escapeKeydownBehavior() {
				return t.escapeKeydownBehavior;
			},
			get preventOverflowTextSelection() {
				return t.preventOverflowTextSelection;
			},
			get id() {
				return t.id;
			},
			get onPointerDown() {
				return t.onPointerDown;
			},
			get onPointerUp() {
				return t.onPointerUp;
			},
			get side() {
				return t.side;
			},
			get sideOffset() {
				return t.sideOffset;
			},
			get align() {
				return t.align;
			},
			get alignOffset() {
				return t.alignOffset;
			},
			get arrowPadding() {
				return t.arrowPadding;
			},
			get avoidCollisions() {
				return t.avoidCollisions;
			},
			get collisionBoundary() {
				return t.collisionBoundary;
			},
			get collisionPadding() {
				return t.collisionPadding;
			},
			get sticky() {
				return t.sticky;
			},
			get hideWhenDetached() {
				return t.hideWhenDetached;
			},
			get updatePositionStrategy() {
				return t.updatePositionStrategy;
			},
			get strategy() {
				return t.strategy;
			},
			get dir() {
				return t.dir;
			},
			get preventScroll() {
				return t.preventScroll;
			},
			get wrapperId() {
				return t.wrapperId;
			},
			get style() {
				return t.style;
			},
			get onPlaced() {
				return t.onPlaced;
			},
			get customAnchor() {
				return s();
			},
			get isStatic() {
				return c();
			},
			get enabled() {
				return t.open;
			},
			get onInteractOutside() {
				return t.onInteractOutside;
			},
			get onCloseAutoFocus() {
				return t.onCloseAutoFocus;
			},
			get onOpenAutoFocus() {
				return t.onOpenAutoFocus;
			},
			get interactOutsideBehavior() {
				return r();
			},
			get loop() {
				return t.loop;
			},
			get trapFocus() {
				return i();
			},
			get isValidEvent() {
				return a();
			},
			get onFocusOutside() {
				return t.onFocusOutside;
			},
			forceMount: !1,
			get ref() {
				return t.ref;
			}
		}, () => l));
	};
	n(h, (e) => {
		t.shouldRender && e(g);
	}), p(e, d);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-force-mount.svelte
var la = new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled".split("."));
function ua(e, t) {
	let n = f(t, "interactOutsideBehavior", 3, "close"), r = f(t, "trapFocus", 3, !0), i = f(t, "isValidEvent", 3, () => !1), a = f(t, "customAnchor", 3, null), o = f(t, "isStatic", 3, !1), s = y(t, la);
	oa(e, m({
		get popper() {
			return t.popper;
		},
		get onEscapeKeydown() {
			return t.onEscapeKeydown;
		},
		get escapeKeydownBehavior() {
			return t.escapeKeydownBehavior;
		},
		get preventOverflowTextSelection() {
			return t.preventOverflowTextSelection;
		},
		get id() {
			return t.id;
		},
		get onPointerDown() {
			return t.onPointerDown;
		},
		get onPointerUp() {
			return t.onPointerUp;
		},
		get side() {
			return t.side;
		},
		get sideOffset() {
			return t.sideOffset;
		},
		get align() {
			return t.align;
		},
		get alignOffset() {
			return t.alignOffset;
		},
		get arrowPadding() {
			return t.arrowPadding;
		},
		get avoidCollisions() {
			return t.avoidCollisions;
		},
		get collisionBoundary() {
			return t.collisionBoundary;
		},
		get collisionPadding() {
			return t.collisionPadding;
		},
		get sticky() {
			return t.sticky;
		},
		get hideWhenDetached() {
			return t.hideWhenDetached;
		},
		get updatePositionStrategy() {
			return t.updatePositionStrategy;
		},
		get strategy() {
			return t.strategy;
		},
		get dir() {
			return t.dir;
		},
		get preventScroll() {
			return t.preventScroll;
		},
		get wrapperId() {
			return t.wrapperId;
		},
		get style() {
			return t.style;
		},
		get onPlaced() {
			return t.onPlaced;
		},
		get customAnchor() {
			return a();
		},
		get isStatic() {
			return o();
		},
		get enabled() {
			return t.enabled;
		},
		get onInteractOutside() {
			return t.onInteractOutside;
		},
		get onCloseAutoFocus() {
			return t.onCloseAutoFocus;
		},
		get onOpenAutoFocus() {
			return t.onOpenAutoFocus;
		},
		get interactOutsideBehavior() {
			return n();
		},
		get loop() {
			return t.loop;
		},
		get trapFocus() {
			return r();
		},
		get isValidEvent() {
			return i();
		},
		get onFocusOutside() {
			return t.onFocusOutside;
		}
	}, () => s, { forceMount: !0 }));
}
//#endregion
export { je as A, L as C, Oe as D, De as E, Ie as F, Le as I, Re as L, Ne as M, Pe as N, ke as O, Fe as P, we as R, nt as S, Ee as T, Wt as _, zi as a, Ut as b, _n as c, pn as d, vn as f, Gt as g, Yt as h, Ji as i, Me as j, Ae as k, mn as l, Xt as m, ca as n, yn as o, bn as p, $i as r, hn as s, ua as t, nn as u, Kt as v, Te as w, It as x, Ht as y };
