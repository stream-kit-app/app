import { Bn as e, Gn as t, Hr as n, Nn as r, Ur as i, Zn as a, _r as o, a as s, bn as c, cr as l, ii as u, rr as d, sn as f, xn as p, yr as m } from "./client-BFeMv2Ma.js";
import "./disclose-version-CI8I6yeK.js";
import { i as h } from "./index-client-DI7sx7Sj.js";
import { D as g, _, f as v, g as ee, j as te, x as y } from "./animations-complete-2GhqX7WL.js";
import { o as b, r as x, t as ne } from "./use-id-BW6hjw-g.js";
import { n as re, r as S } from "./dom-9pAGmv2P.js";
import { a as C, i as ie, o as w } from "./presence-manager.svelte-cK0pnbQH.js";
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/debounce.js
function ae(e, t = 500) {
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
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/elements.js
function T(e, t) {
	return e === t || e.contains(t);
}
function E(e) {
	return e?.ownerDocument ?? document;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/menu/context-menu-attributes.js
var oe = "data-context-menu-trigger", se = "data-context-menu-content";
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/dismissible-layer/use-dismissable-layer.svelte.js
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
var ce = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	#e;
	#t;
	#n = { pointerdown: !1 };
	#r = !1;
	#i = null;
	#a = !1;
	#o = void 0;
	#s;
	#c = S;
	#l = !1;
	constructor(e) {
		this.opts = e, this.#t = e.interactOutsideBehavior, this.#e = e.onInteractOutside, this.#s = e.onFocusOutside;
		let t = S, n = null, r = () => {
			n = null, this.#v(), globalThis.bitsDismissableLayers.delete(this), this.#p.destroy(), this.#c(), t();
		};
		y([() => this.opts.enabled.current, () => this.opts.ref.current], ([e, i]) => {
			let a = e ? i : null;
			n !== a && (r(), a && (n = a, this.#o = E(a), globalThis.bitsDismissableLayers.set(this, this.#t), t = this.#d()));
		}), _(() => {
			this.#l = !0, r();
		});
	}
	#u = (e) => {
		e.defaultPrevented || this.#l || !this.opts.ref.current || ee(() => {
			this.#l || this.opts.ref.current && !this.#_(e.target) && e.target && !this.#a && this.#s.current?.(e);
		});
	};
	#d() {
		let e = this.#o, n = (e) => {
			t(() => {
				this.#m(e), this.#g(e);
			});
		}, i = (e) => {
			e.cancelBubble || e !== this.#i || (this.#h(e), this.#p(e));
		};
		return e.addEventListener("pointerdown", n, !0), e.addEventListener("pointerdown", i), b(() => e.removeEventListener("pointerdown", n, !0), () => e.removeEventListener("pointerdown", i), r(e, "focusin", this.#u));
	}
	#f = (e) => {
		let t = e;
		t.defaultPrevented && (t = fe(e)), this.#e.current(e);
	};
	#p = ae((e) => {
		if (!this.opts.ref.current) {
			this.#c();
			return;
		}
		let t = this.opts.isValidEvent.current(e, this.opts.ref.current) || de(e, this.opts.ref.current);
		if (!this.#r || this.#y() || !t) {
			this.#c();
			return;
		}
		let n = e;
		if (n.defaultPrevented && (n = fe(n)), this.#t.current !== "close" && this.#t.current !== "defer-otherwise-close") {
			this.#c();
			return;
		}
		if (e.pointerType === "touch") {
			this.#c();
			let e = null, t = S, n = (e) => {
				t(), this.#f(e);
			};
			t = b(r(this.#o, "click", n, { once: !0 }), r(this.#o, "click", (t) => {
				e = setTimeout(() => n(t), 0);
			}, {
				once: !0,
				capture: !0
			}), () => {
				e !== null && clearTimeout(e), e = null;
			}), this.#c = t;
		} else this.#e.current(n);
	}, 10);
	#m = (e) => {
		this.#n[e.type] = !0;
	};
	#h = (e) => {
		this.#n[e.type] = !1;
	};
	#g = (e) => {
		this.#i = e, this.opts.ref.current && (this.#r = ue(this.opts.ref.current));
	};
	#_ = (e) => this.opts.ref.current ? T(this.opts.ref.current, e) : !1;
	#v = () => {
		for (let e in this.#n) this.#n[e] = !1;
		this.#r = !1, this.#i = null;
	};
	#y() {
		return Object.values(this.#n).some(Boolean);
	}
	#b = () => {
		this.#a = !0;
	};
	#x = () => {
		this.#a = !1;
	};
	props = {
		onfocuscapture: this.#b,
		onblurcapture: this.#x
	};
};
function le(e = [...globalThis.bitsDismissableLayers]) {
	return e.findLast(([e, { current: t }]) => t === "close" || t === "ignore");
}
function ue(e) {
	let t = [...globalThis.bitsDismissableLayers], n = le(t);
	if (n) return n[0].opts.ref.current === e;
	let [r] = t[0];
	return r.opts.ref.current === e;
}
function de(e, t) {
	let n = e.target;
	if (!ie(n)) return !1;
	let r = !!n.closest(`[${oe}]`), i = !!t.closest(`[${se}]`);
	return "button" in e && e.button > 0 && !r ? !1 : "button" in e && e.button === 0 && r && i ? !0 : r && i ? !1 : E(n).documentElement.contains(n) && !T(t, n) && re(e, t);
}
function fe(e) {
	let t = e.currentTarget, n = e.target, r;
	r = e instanceof PointerEvent ? new PointerEvent(e.type, e) : new PointerEvent("pointerdown", e);
	let i = !1;
	return new Proxy(r, { get: (r, a) => a === "currentTarget" ? t : a === "target" ? n : a === "preventDefault" ? () => {
		i = !0, typeof r.preventDefault == "function" && r.preventDefault();
	} : a === "defaultPrevented" ? i : a in r ? r[a] : e[a] });
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/dismissible-layer/dismissible-layer.svelte
function pe(e, t) {
	i(t, !0);
	let r = s(t, "interactOutsideBehavior", 3, "close"), a = s(t, "onInteractOutside", 3, S), o = s(t, "onFocusOutside", 3, S), d = s(t, "isValidEvent", 3, () => !1), m = ce.create({
		id: g(() => t.id),
		interactOutsideBehavior: g(() => r()),
		onInteractOutside: g(() => a()),
		enabled: g(() => t.enabled),
		onFocusOutside: g(() => o()),
		isValidEvent: g(() => d()),
		ref: t.ref
	});
	var h = p(), _ = l(h);
	f(_, () => t.children ?? u, () => ({ props: m.props })), c(e, h), n();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/escape-layer/use-escape-layer.svelte.js
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
var me = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	domContext;
	constructor(e) {
		this.opts = e, this.domContext = new x(this.opts.ref);
		let t = S;
		y(() => e.enabled.current, (n) => (n && (globalThis.bitsEscapeLayers.set(this, e.escapeKeydownBehavior), t = this.#e()), () => {
			t(), globalThis.bitsEscapeLayers.delete(this);
		}));
	}
	#e = () => r(this.domContext.getDocument(), "keydown", this.#t, { passive: !1 });
	#t = (e) => {
		if (e.key !== "Escape" || !he(this)) return;
		let t = new KeyboardEvent(e.type, e);
		e.preventDefault();
		let n = this.opts.escapeKeydownBehavior.current;
		(n === "close" || n === "defer-otherwise-close") && this.opts.onEscapeKeydown.current(t);
	};
};
function he(e) {
	let t = [...globalThis.bitsEscapeLayers], n = t.findLast(([e, { current: t }]) => t === "close" || t === "ignore");
	if (n) return n[0] === e;
	let [r] = t[0];
	return r === e;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/escape-layer/escape-layer.svelte
function ge(e, t) {
	i(t, !0);
	let r = s(t, "escapeKeydownBehavior", 3, "close"), a = s(t, "onEscapeKeydown", 3, S);
	me.create({
		escapeKeydownBehavior: g(() => r()),
		onEscapeKeydown: g(() => a()),
		enabled: g(() => t.enabled),
		ref: t.ref
	});
	var o = p(), d = l(o);
	f(d, () => t.children ?? u), c(e, o), n();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope-manager.js
var _e = class e {
	static instance;
	#e = te([]);
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
}, D = [
	"input:not([inert]):not([inert] *)",
	"select:not([inert]):not([inert] *)",
	"textarea:not([inert]):not([inert] *)",
	"a[href]:not([inert]):not([inert] *)",
	"area[href]:not([inert]):not([inert] *)",
	"button:not([inert]):not([inert] *)",
	"[tabindex]:not(slot):not([inert]):not([inert] *)",
	"audio[controls]:not([inert]):not([inert] *)",
	"video[controls]:not([inert]):not([inert] *)",
	"[contenteditable]:not([contenteditable=\"false\"]):not([inert]):not([inert] *)",
	"details>summary:first-of-type:not([inert]):not([inert] *)",
	"details:not([inert]):not([inert] *)"
], O = /* #__PURE__ */ D.join(","), k = typeof Element > "u", A = k ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, j = !k && Element.prototype.getRootNode ? function(e) {
	return e?.getRootNode?.call(e);
} : function(e) {
	return e?.ownerDocument;
}, M = function(e, t) {
	t === void 0 && (t = !0);
	var n = e?.getAttribute?.call(e, "inert");
	return n === "" || n === "true" || t && e && (typeof e.closest == "function" ? e.closest("[inert]") : M(e.parentNode));
}, ve = function(e) {
	var t = e?.getAttribute?.call(e, "contenteditable");
	return t === "" || t === "true";
}, N = function(e, t, n) {
	if (M(e)) return [];
	var r = Array.prototype.slice.apply(e.querySelectorAll(O));
	return t && A.call(e, O) && r.unshift(e), r = r.filter(n), r;
}, P = function(e, t, n) {
	for (var r = [], i = Array.from(e); i.length;) {
		var a = i.shift();
		if (!M(a, !1)) {
			if (a.tagName === "SLOT") {
				var o = a.assignedElements(), s = P(o.length ? o : a.children, !0, n);
				n.flatten ? r.push.apply(r, s) : r.push({
					scopeParent: a,
					candidates: s
				});
			} else {
				A.call(a, O) && n.filter(a) && (t || !e.includes(a)) && r.push(a);
				var c = a.shadowRoot || typeof n.getShadowRoot == "function" && n.getShadowRoot(a), l = !M(c, !1) && (!n.shadowRootFilter || n.shadowRootFilter(a));
				if (c && l) {
					var u = P(c === !0 ? a.children : c.children, !0, n);
					n.flatten ? r.push.apply(r, u) : r.push({
						scopeParent: a,
						candidates: u
					});
				} else i.unshift.apply(i, a.children);
			}
		}
	}
	return r;
}, F = function(e) {
	return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, I = function(e) {
	if (!e) throw Error("No node provided");
	return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || ve(e)) && !F(e) ? 0 : e.tabIndex;
}, ye = function(e, t) {
	var n = I(e);
	return n < 0 && t && !F(e) ? 0 : n;
}, be = function(e, t) {
	return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, L = function(e) {
	return e.tagName === "INPUT";
}, xe = function(e) {
	return L(e) && e.type === "hidden";
}, Se = function(e) {
	return e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(e) {
		return e.tagName === "SUMMARY";
	});
}, Ce = function(e, t) {
	for (var n = 0; n < e.length; n++) if (e[n].checked && e[n].form === t) return e[n];
}, we = function(e) {
	if (!e.name) return !0;
	var t = e.form || j(e), n = function(e) {
		return t.querySelectorAll("input[type=\"radio\"][name=\"" + e + "\"]");
	}, r;
	if (typeof window < "u" && window.CSS !== void 0 && typeof window.CSS.escape == "function") r = n(window.CSS.escape(e.name));
	else try {
		r = n(e.name);
	} catch (e) {
		return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", e.message), !1;
	}
	var i = Ce(r, e.form);
	return !i || i === e;
}, Te = function(e) {
	return L(e) && e.type === "radio";
}, Ee = function(e) {
	return Te(e) && !we(e);
}, De = function(e) {
	var t = e && j(e), n = t?.host, r = !1;
	if (t && t !== e) {
		var i, a, o;
		for (r = !!((i = n) != null && (a = i.ownerDocument) != null && a.contains(n) || e != null && (o = e.ownerDocument) != null && o.contains(e)); !r && n;) {
			var s, c;
			t = j(n), n = t?.host, r = !!((s = n) != null && (c = s.ownerDocument) != null && c.contains(n));
		}
	}
	return r;
}, R = function(e) {
	var t = e.getBoundingClientRect(), n = t.width, r = t.height;
	return n === 0 && r === 0;
}, Oe = function(e, t) {
	var n = t.displayCheck, r = t.getShadowRoot;
	if (n === "full-native" && "checkVisibility" in e) return !e.checkVisibility({
		checkOpacity: !1,
		opacityProperty: !1,
		contentVisibilityAuto: !0,
		visibilityProperty: !0,
		checkVisibilityCSS: !0
	});
	var i = getComputedStyle(e).visibility;
	if (i === "hidden" || i === "collapse") return !0;
	var a = A.call(e, "details>summary:first-of-type") ? e.parentElement : e;
	if (A.call(a, "details:not([open]) *")) return !0;
	if (!n || n === "full" || n === "full-native" || n === "legacy-full") {
		if (typeof r == "function") {
			for (var o = e; e;) {
				var s = e.parentElement, c = j(e);
				if (s && !s.shadowRoot && r(s) === !0) return R(e);
				e = e.assignedSlot ? e.assignedSlot : !s && c !== e.ownerDocument ? c.host : s;
			}
			e = o;
		}
		if (De(e)) return !e.getClientRects().length;
		if (n !== "legacy-full") return !0;
	} else if (n === "non-zero-area") return R(e);
	return !1;
}, ke = function(e) {
	if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName)) for (var t = e.parentElement; t;) {
		if (t.tagName === "FIELDSET" && t.disabled) {
			for (var n = 0; n < t.children.length; n++) {
				var r = t.children.item(n);
				if (r.tagName === "LEGEND") return A.call(t, "fieldset[disabled] *") ? !0 : !r.contains(e);
			}
			return !0;
		}
		t = t.parentElement;
	}
	return !1;
}, z = function(e, t) {
	return !(t.disabled || xe(t) || Oe(t, e) || Se(t) || ke(t));
}, B = function(e, t) {
	return !(Ee(t) || I(t) < 0 || !z(e, t));
}, Ae = function(e) {
	var t = parseInt(e.getAttribute("tabindex"), 10);
	return !!(isNaN(t) || t >= 0);
}, V = function(e) {
	var t = [], n = [];
	return e.forEach(function(e, r) {
		var i = !!e.scopeParent, a = i ? e.scopeParent : e, o = ye(a, i), s = i ? V(e.candidates) : a;
		o === 0 ? i ? t.push.apply(t, s) : t.push(a) : n.push({
			documentOrder: r,
			tabIndex: o,
			item: e,
			isScope: i,
			content: s
		});
	}), n.sort(be).reduce(function(e, t) {
		return t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e;
	}, []).concat(t);
}, H = function(e, t) {
	return t ||= {}, V(t.getShadowRoot ? P([e], t.includeContainer, {
		filter: B.bind(null, t),
		flatten: !1,
		getShadowRoot: t.getShadowRoot,
		shadowRootFilter: Ae
	}) : N(e, t.includeContainer, B.bind(null, t)));
}, U = function(e, t) {
	return t ||= {}, t.getShadowRoot ? P([e], t.includeContainer, {
		filter: z.bind(null, t),
		flatten: !0,
		getShadowRoot: t.getShadowRoot
	}) : N(e, t.includeContainer, z.bind(null, t));
}, je = function(e, t) {
	if (t ||= {}, !e) throw Error("No node provided");
	return A.call(e, O) !== !1 && B(t, e);
}, Me = /* #__PURE__ */ D.concat("iframe:not([inert]):not([inert] *)").join(","), W = function(e, t) {
	if (t ||= {}, !e) throw Error("No node provided");
	return A.call(e, Me) !== !1 && z(t, e);
}, Ne = class e {
	#e = !1;
	#t = null;
	#n = _e.getInstance();
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
			if (!this.#t || this.#e || !this.#n.isActiveScope(this) || this.#t.contains(this.#t.ownerDocument.activeElement)) return;
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
		this.#r.push(r(t, "focusin", (t) => {
			if (this.#e || !this.#n.isActiveScope(this)) return;
			let n = t.target;
			if (n) {
				if (e.contains(n)) this.#n.setFocusMemory(this, n);
				else {
					let n = this.#n.getFocusMemory(this);
					if (n && e.contains(n) && W(n)) t.preventDefault(), n.focus();
					else {
						let t = this.#u(), n = this.#d()[0];
						(t || n || e).focus();
					}
				}
			}
		}, { capture: !0 }), r(e, "keydown", (e) => {
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
		return this.#t ? H(this.#t, {
			includeContainer: !1,
			getShadowRoot: !0
		}) : [];
	}
	#u() {
		return this.#l()[0] || null;
	}
	#d() {
		return this.#t ? U(this.#t, {
			includeContainer: !1,
			getShadowRoot: !0
		}) : [];
	}
	static use(t) {
		let n = null;
		return y([() => t.ref.current, () => t.enabled.current], ([r, i]) => {
			r && i ? (n ||= new e(t), n.mount(r)) : n &&= (n.unmount(), null);
		}), _(() => {
			n?.unmount();
		}), { get props() {
			return { tabindex: -1 };
		} };
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope.svelte
function Pe(e, t) {
	i(t, !0);
	let r = s(t, "enabled", 3, !1), a = s(t, "trapFocus", 3, !1), o = s(t, "loop", 3, !1), d = s(t, "onCloseAutoFocus", 3, S), m = s(t, "onOpenAutoFocus", 3, S), h = Ne.use({
		enabled: g(() => r()),
		trap: g(() => a()),
		loop: o(),
		onCloseAutoFocus: g(() => d()),
		onOpenAutoFocus: g(() => m()),
		ref: t.ref
	});
	var _ = p(), v = l(_);
	f(v, () => t.focusScope ?? u, () => ({ props: h.props })), c(e, _), n();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/text-selection-layer/use-text-selection-layer.svelte.js
var G = () => {};
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
var Fe = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	domContext;
	#e = S;
	#t = !1;
	#n = G;
	#r = G;
	constructor(e) {
		this.opts = e, this.domContext = new x(e.ref);
		let t = S;
		y(() => [
			this.opts.enabled.current,
			this.opts.onPointerDown.current,
			this.opts.onPointerUp.current
		], ([e, n, r]) => (this.#t = e, this.#n = n, this.#r = r, e && (globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled), t(), t = this.#i()), () => {
			this.#t = !1, t(), this.#s(), globalThis.bitsTextSelectionLayers.delete(this);
		}));
	}
	#i() {
		return b(r(this.domContext.getDocument(), "pointerdown", this.#o), r(this.domContext.getDocument(), "pointerup", this.#a));
	}
	#a = (e) => {
		this.#s(), !e.defaultPrevented && this.#r(e);
	};
	#o = (e) => {
		if (!this.#t) return;
		this.#s();
		let t = this.opts.ref.current, n = e.target;
		C(t) && C(n) && Le(this) && v(t, n) && (this.#n(e), !e.defaultPrevented && (this.#e = Ie(t, this.domContext.getDocument().body)));
	};
	#s = () => {
		this.#e(), this.#e = S;
	};
}, K = (e) => e.style.userSelect || e.style.webkitUserSelect;
function Ie(e, t) {
	let n = K(t), r = K(e);
	return q(t, "none"), q(e, "text"), () => {
		q(t, n), q(e, r);
	};
}
function q(e, t) {
	e.style.userSelect = t, e.style.webkitUserSelect = t;
}
function Le(e) {
	let t = [...globalThis.bitsTextSelectionLayers];
	if (!t.length) return !1;
	let n = t.at(-1);
	return n ? n[0] === e : !1;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/text-selection-layer/text-selection-layer.svelte
function Re(e, t) {
	i(t, !0);
	let r = s(t, "preventOverflowTextSelection", 3, !0), a = s(t, "onPointerDown", 3, S), o = s(t, "onPointerUp", 3, S);
	Fe.create({
		id: g(() => t.id),
		onPointerDown: g(() => a()),
		onPointerUp: g(() => o()),
		enabled: g(() => t.enabled && r()),
		ref: t.ref
	});
	var d = p(), m = l(d);
	f(m, () => t.children ?? u), c(e, d), n();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/shared-state.svelte.js
var ze = class {
	#e;
	#t = 0;
	#n = m();
	#r;
	constructor(e) {
		this.#e = e;
	}
	#i() {
		--this.#t, this.#r && this.#t <= 0 && (this.#r(), o(this.#n, void 0), this.#r = void 0);
	}
	get(...t) {
		return this.#t += 1, e(this.#n) === void 0 && (this.#r = a(() => {
			o(this.#n, this.#e(...t), !0);
		})), d(() => () => {
			this.#i();
		}), e(this.#n);
	}
}, J = new h(), Y = m(null), X = null, Z = null, Q = !1, Be = g(() => {
	for (let e of J.values()) if (e) return !0;
	return !1;
}), $ = null, Ve = new ze(() => {
	function t(t) {
		t.body.setAttribute("style", e(Y) ?? ""), t.body.style.removeProperty("--scrollbar-width"), w && X?.(), o(Y, null);
	}
	function n() {
		Z !== null && (window.clearTimeout(Z), Z = null);
	}
	function i(e, t) {
		n(), Q = !0, $ = Date.now();
		let r = $, i = () => {
			Z = null, $ === r && (Ue(J) ? Q = !1 : (Q = !1, t()));
		}, a = e === null ? 24 : e;
		Z = window.setTimeout(i, a);
	}
	function a() {
		e(Y) === null && J.size === 0 && !Q && o(Y, document.body.getAttribute("style"), !0);
	}
	return y(() => Be.current, () => {
		if (!Be.current) return;
		a(), Q = !1;
		let e = getComputedStyle(document.documentElement), t = getComputedStyle(document.body), n = e.scrollbarGutter?.includes("stable") || t.scrollbarGutter?.includes("stable"), i = window.innerWidth - document.documentElement.clientWidth, o = {
			padding: Number.parseInt(t.paddingRight ?? "0", 10) + i,
			margin: Number.parseInt(t.marginRight ?? "0", 10)
		};
		i > 0 && !n && (document.body.style.paddingRight = `${o.padding}px`, document.body.style.marginRight = `${o.margin}px`, document.body.style.setProperty("--scrollbar-width", `${i}px`)), document.body.style.overflow = "hidden", w && (X = r(document, "touchmove", (e) => {
			e.target === document.documentElement && (e.touches.length > 1 || e.preventDefault());
		}, { passive: !1 })), ee(() => {
			document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
		});
	}), _(() => () => {
		X?.();
	}), {
		get lockMap() {
			return J;
		},
		resetBodyStyle: t,
		scheduleCleanupIfNoNewLocks: i,
		cancelPendingCleanup: n,
		ensureInitialStyleCaptured: a
	};
}), He = class {
	#e = ne();
	#t;
	#n = () => null;
	#r;
	locked;
	constructor(e, t = () => null) {
		this.#t = e, this.#n = t, this.#r = Ve.get(), this.#r && (this.#r.cancelPendingCleanup(), this.#r.ensureInitialStyleCaptured(), this.#r.lockMap.set(this.#e, this.#t ?? !1), this.locked = g(() => this.#r.lockMap.get(this.#e) ?? !1, (e) => this.#r.lockMap.set(this.#e, e)), _(() => {
			if (this.#r.lockMap.delete(this.#e), Ue(this.#r.lockMap)) return;
			let e = this.#n(), t = document;
			this.#r.scheduleCleanupIfNoNewLocks(e, () => {
				this.#r.resetBodyStyle(t);
			});
		}));
	}
};
function Ue(e) {
	for (let [t, n] of e) if (n) return !0;
	return !1;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/scroll-lock/scroll-lock.svelte
function We(e, t) {
	i(t, !0);
	let r = s(t, "preventScroll", 3, !0), a = s(t, "restoreScrollDelay", 3, null);
	r() && new He(r(), () => a()), n();
}
//#endregion
export { W as a, ge as c, U as i, pe as l, Re as n, je as o, Pe as r, H as s, We as t };
