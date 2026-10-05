import { Bn as e, Dn as t, Dr as n, En as r, Hr as i, Nn as a, Nt as o, Sn as s, Ur as c, Vt as l, Zn as u, _r as d, a as f, bn as p, cr as m, ei as h, hn as g, ii as _, nr as v, o as y, ot as b, pr as x, rr as S, s as C, sn as w, sr as T, ti as E, ur as D, xn as O, yr as k } from "../../chunks/client-BFeMv2Ma.js";
import { a as A, i as j, r as M, t as N } from "../../chunks/utils-Dqp4W1j8.js";
import "../../chunks/disclose-version-CI8I6yeK.js";
import { t as P } from "../../chunks/Icon-Ct61sPxO.js";
import "../../chunks/index-client-DI7sx7Sj.js";
import { A as ee, C as F, D as I, E as L, M as te, O as ne, T as re, _ as ie, d as R, g as z, k as ae, l as oe, m as B, n as se, o as ce, r as le, u as ue, w as de, x as fe } from "../../chunks/animations-complete-2GhqX7WL.js";
import { i as V, n as H, o as pe, r as me } from "../../chunks/use-id-BW6hjw-g.js";
import { a as U, d as he, g as ge, h as _e, i as W, o as G, p as ve, r as K, s as ye } from "../../chunks/dom-9pAGmv2P.js";
import { a as q, c as be, i as xe, r as J, t as Se } from "../../chunks/presence-manager.svelte-cK0pnbQH.js";
import { t as Ce } from "../../chunks/portal-D7k4f7sM.js";
import { a as we, i as Te, o as Ee, s as De } from "../../chunks/scroll-lock-qBq_Ag7a.js";
import { t as Oe } from "../../chunks/dom-typeahead.svelte-4ba_FbDd.js";
import { i as ke, n as Ae, r as je, t as Me } from "../../chunks/popper-layer-force-mount-BqARajyD.js";
import { t as Ne } from "../../chunks/floating-layer-anchor-FImxxE63.js";
import { t as Pe } from "../../chunks/scroll-area-DXaKUX2U.js";
import { t as Fe } from "../../chunks/button-DGOI4Wpk.js";
import "../../chunks/button-CBfuPA65.js";
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_61a373d23e0427b3790b60c19a185d1b/node_modules/svelte-toolbelt/dist/box/box.svelte.js
function Y(t) {
	let n = k(x(t));
	return {
		[de]: !0,
		[ee]: !0,
		get current() {
			return e(n);
		},
		set current(e) {
			d(n, e, !0);
		}
	};
}
Y.from = L, Y.with = I, Y.flatten = re, Y.readonly = te, Y.isBox = ne, Y.isWritableBox = ae;
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/locale.js
function Ie(e) {
	return window.getComputedStyle(e).getPropertyValue("direction");
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/get-directional-keys.js
var Le = [
	W,
	ge,
	ve
], Re = [
	ye,
	_e,
	"End"
];
[...Le, ...Re];
function ze(e = "ltr", t = "horizontal") {
	return {
		horizontal: e === "rtl" ? U : G,
		vertical: W
	}[t];
}
function Be(e = "ltr", t = "horizontal") {
	return {
		horizontal: e === "rtl" ? G : U,
		vertical: ye
	}[t];
}
function Ve(e = "ltr", t = "horizontal") {
	return ["ltr", "rtl"].includes(e) || (e = "ltr"), ["horizontal", "vertical"].includes(t) || (t = "horizontal"), {
		nextKey: ze(e, t),
		prevKey: Be(e, t)
	};
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/roving-focus-group.js
var He = class {
	#e;
	#t = Y(null);
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
		let a = i.indexOf(e), { nextKey: o, prevKey: s } = Ve(Ie(r), this.#e.orientation.current), c = this.#e.loop.current, l = {
			[o]: a + 1,
			[s]: a - 1,
			[ve]: 0,
			End: i.length - 1
		};
		if (n) {
			let e = o === "ArrowDown" ? G : W, t = s === "ArrowUp" ? U : ye;
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
		t && q(t) && t.focus();
	}
}, Ue = class {
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
		return a(e, this.eventName, (e) => {
			t(e);
		}, n);
	}
}, We = [he, " "], Ge = [
	W,
	ge,
	ve
], Ke = [
	ye,
	_e,
	"End"
], qe = [...Ge, ...Ke], Je = {
	ltr: [...We, G],
	rtl: [...We, U]
}, Ye = {
	ltr: [U],
	rtl: [G]
};
function X(e) {
	return e.pointerType === "mouse";
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/focus.js
function Xe(e, { select: t = !1 } = {}) {
	if (!e || !e.focus) return;
	let n = B(e);
	if (n.activeElement === e) return;
	let r = n.activeElement;
	e.focus({ preventScroll: !0 }), e !== r && be(e) && t && e.select();
}
function Ze(e, { select: t = !1 } = {}, n) {
	let r = n();
	for (let i of e) if (Xe(i, { select: t }), n() !== r) return !0;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/is-using-keyboard/is-using-keyboard.svelte.js
var Z = k(!1), Qe = class t {
	static _refs = 0;
	static _cleanup;
	constructor() {
		S(() => (t._refs === 0 && (t._cleanup = u(() => {
			let t = [], n = (e) => {
				d(Z, !1);
			};
			return t.push(a(document, "pointerdown", n, { capture: !0 }), a(document, "keydown", (e) => {
				d(Z, !0);
			}, { capture: !0 })), S(() => {
				if (e(Z)) return a(document, "pointermove", n, { capture: !0 });
			}), pe(...t);
		})), t._refs++, () => {
			t._refs--, t._refs === 0 && (d(Z, !1), t._cleanup?.());
		}));
	}
	get current() {
		return e(Z);
	}
	set current(e) {
		d(Z, e, !0);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/tabbable.js
function Q() {
	return {
		getShadowRoot: !0,
		displayCheck: typeof ResizeObserver == "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
	};
}
function $e(e, t) {
	if (!Ee(e, Q())) return et(e, t);
	let n = B(e), r = De(n.body, Q());
	t === "prev" && r.reverse();
	let i = r.indexOf(e);
	return i === -1 ? n.body : r.slice(i + 1)[0];
}
function et(e, t) {
	let n = B(e);
	if (!we(e, Q())) return n.body;
	let r = Te(n.body, Q());
	t === "prev" && r.reverse();
	let i = r.indexOf(e);
	return i === -1 ? n.body : r.slice(i + 1).find((e) => Ee(e, Q())) ?? n.body;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/menu/menu.svelte.js
var tt = new F("Menu.Root"), $ = new F("Menu.Root | Menu.Sub"), nt = new F("Menu.Content");
new F("Menu.Group | Menu.RadioGroup"), new F("Menu.RadioGroup"), new F("Menu.CheckboxGroup");
var rt = new Ue("bitsmenuopen", {
	bubbles: !1,
	cancelable: !0
}), it = ce({
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
}), at = class {
	#e;
	#t = null;
	#n = null;
	#r = !1;
	#i = null;
	#a = null;
	#o = null;
	#s = null;
	constructor(e) {
		this.#e = e, fe([
			e.triggerNode,
			e.contentNode,
			e.enabled
		], ([e, t, n]) => {
			if (this.#_(), !e || !t || !n) return;
			let r = (e) => {
				X(e) && (this.#s = {
					x: e.clientX,
					y: e.clientY
				}, this.#r || this.#d(e, "content"));
			}, i = (e) => {
				X(e) && this.#f(e, "content");
			}, a = (e) => {
				X(e) && (this.#r || this.#d(e, "trigger"));
			}, o = (e) => {
				if (X(e)) {
					if (J(e.relatedTarget)) {
						let n = this.#e.subContentSelector(), r = e.relatedTarget.closest(n);
						if (r && r !== t && r.id && t.querySelector(`[aria-controls="${r.id}"]`)) return;
					}
					this.#f(e, "trigger");
				}
			}, s = (e) => {
				X(e) && this.#m();
			}, c = (e) => {
				X(e) && this.#m();
			};
			return e.addEventListener("pointermove", r), e.addEventListener("pointerleave", i), e.addEventListener("pointerenter", s), t.addEventListener("pointermove", a), t.addEventListener("pointerleave", o), t.addEventListener("pointerenter", c), () => {
				e.removeEventListener("pointermove", r), e.removeEventListener("pointerleave", i), e.removeEventListener("pointerenter", s), t.removeEventListener("pointermove", a), t.removeEventListener("pointerleave", o), t.removeEventListener("pointerenter", c), this.#_();
			};
		}), ie(() => {
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
		let i = n.getBoundingClientRect(), a = r.getBoundingClientRect(), o = lt(i, a), s, c, l;
		return t === "content" ? (s = this.#r ? this.#a ?? e : e, c = a) : (s = this.#s ?? e, c = this.#c() ?? i, l = a), this.#a = s, {
			corridor: ut(i, a, o),
			intent: dt(s, c, o, t, l),
			targetRect: c,
			side: o
		};
	}
	#u(e, t, n) {
		return ot(e, t) || ot(e, n);
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
		if (J(i) && (t === "content" && r.contains(i) || t === "trigger" && n.contains(i))) return;
		let a = {
			x: e.clientX,
			y: e.clientY
		}, o = this.#l(a, t);
		if (o) {
			if (!st(a, o.targetRect) && !this.#u(a, o.corridor, o.intent)) {
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
		if (!this.#r || !this.#i || !X(e)) return;
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
		if (this.#i === "content" && st(r, a)) {
			this.#m();
			return;
		}
		if (this.#i === "trigger" && ct(r, i, 4)) {
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
		let e = B(this.#e.triggerNode() ?? this.#e.contentNode());
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
function ot(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e].x, s = t[e].y, c = t[a].x, l = t[a].y;
		s > r != l > r && n < (c - o) * (r - s) / (l - s) + o && (i = !i);
	}
	return i;
}
function st(e, t) {
	return e.x >= t.left && e.x <= t.right && e.y >= t.top && e.y <= t.bottom;
}
function ct(e, t, n) {
	return e.x >= t.left + n && e.x <= t.right - n && e.y >= t.top + n && e.y <= t.bottom - n;
}
function lt(e, t) {
	let n = e.left + e.width / 2, r = e.top + e.height / 2, i = t.left + t.width / 2, a = t.top + t.height / 2, o = i - n, s = a - r;
	return Math.abs(o) > Math.abs(s) ? o > 0 ? "right" : "left" : s > 0 ? "bottom" : "top";
}
function ut(e, t, n) {
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
function dt(e, t, n, r, i) {
	let a = r === "trigger" ? ft(n) : n, o = i ? Math.min(t.top, i.top) - 8 : t.top - 8, s = i ? Math.max(t.bottom, i.bottom) + 8 : t.bottom + 8, c = i ? Math.min(t.left, i.left) - 8 : t.left - 8, l = i ? Math.max(t.right, i.right) + 8 : t.right + 8;
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
function ft(e) {
	switch (e) {
		case "top": return "bottom";
		case "bottom": return "top";
		case "left": return "right";
		case "right": return "left";
	}
}
var pt = class t {
	static create(e) {
		let n = new t(e);
		return tt.set(n);
	}
	opts;
	isUsingKeyboard = new Qe();
	#e = k(!1);
	get ignoreCloseAutoFocus() {
		return e(this.#e);
	}
	set ignoreCloseAutoFocus(e) {
		d(this.#e, e, !0);
	}
	#t = k(!1);
	get isPointerInTransit() {
		return e(this.#t);
	}
	set isPointerInTransit(e) {
		d(this.#t, e, !0);
	}
	constructor(e) {
		this.opts = e;
	}
	getBitsAttr = (e) => it.getAttr(e, this.opts.variant.current);
}, mt = class t {
	static create(e, n) {
		return $.set(new t(e, n, null));
	}
	opts;
	root;
	parentMenu;
	#e = k(I(() => ""));
	get contentId() {
		return e(this.#e);
	}
	set contentId(e) {
		d(this.#e, e);
	}
	#t = k(null);
	get contentNode() {
		return e(this.#t);
	}
	set contentNode(e) {
		d(this.#t, e, !0);
	}
	contentPresence;
	#n = k(null);
	get triggerNode() {
		return e(this.#n);
	}
	set triggerNode(e) {
		d(this.#n, e, !0);
	}
	constructor(e, t, n) {
		this.opts = e, this.root = t, this.parentMenu = n, this.contentPresence = new Se({
			ref: I(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			},
			shouldSkipExitAnimation: () => this.root.opts.variant.current !== "menubar" || this.parentMenu !== null ? !1 : this.root.opts.shouldSkipExitAnimation?.() ?? !1
		}), n && fe(() => n.opts.open.current, () => {
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
}, ht = class t {
	static create(e) {
		return nt.set(new t(e, $.get()));
	}
	opts;
	parentMenu;
	rovingFocusGroup;
	domContext;
	attachment;
	#e = k("");
	get search() {
		return e(this.#e);
	}
	set search(e) {
		d(this.#e, e, !0);
	}
	#t = 0;
	#n;
	#r = k(!1);
	get mounted() {
		return e(this.#r);
	}
	set mounted(e) {
		d(this.#r, e, !0);
	}
	#i;
	constructor(e, t) {
		this.opts = e, this.parentMenu = t, this.domContext = new me(e.ref), this.attachment = R(this.opts.ref, (e) => {
			this.parentMenu.contentNode !== e && (this.parentMenu.contentNode = e);
		}), t.contentId = e.id, this.#i = e.isSub ?? !1, this.onkeydown = this.onkeydown.bind(this), this.onblur = this.onblur.bind(this), this.onfocus = this.onfocus.bind(this), this.handleInteractOutside = this.handleInteractOutside.bind(this), new at({
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
		}), this.#n = new Oe({
			getActiveElement: () => this.domContext.getActiveElement(),
			getWindow: () => this.domContext.getWindow()
		}).handleTypeaheadSearch, this.rovingFocusGroup = new He({
			rootNode: I(() => this.parentMenu.contentNode),
			candidateAttr: this.parentMenu.root.getBitsAttr("item"),
			loop: this.opts.loop,
			orientation: I(() => "vertical")
		}), fe(() => this.parentMenu.contentNode, (e) => e ? rt.listen(e, () => {
			z(() => {
				this.parentMenu.root.isUsingKeyboard.current && this.rovingFocusGroup.focusFirstCandidate();
			});
		}) : void 0), S(() => {
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
		if (!J(n)) return;
		let r = n.closest(`[${this.parentMenu.root.getBitsAttr("sub-trigger")}]`);
		r && t.contains(r) && r !== this.parentMenu.triggerNode && r.dispatchEvent(new PointerEvent("pointermove", {
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
			this.parentMenu.triggerNode && Ee(this.parentMenu.triggerNode) && (e.preventDefault(), this.parentMenu.triggerNode.focus());
		}
	};
	handleTabKeyDown(e) {
		let t = this.parentMenu;
		for (; t.parentMenu !== null;) t = t.parentMenu;
		if (!t.triggerNode) return;
		e.preventDefault();
		let n = $e(t.triggerNode, e.shiftKey ? "prev" : "next");
		n ? (this.parentMenu.root.ignoreCloseAutoFocus = !0, t.onClose(), z(() => {
			n.focus(), z(() => {
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
		if (!q(t) || !q(n)) return;
		let r = t.closest(`[${this.parentMenu.root.getBitsAttr("content")}]`)?.id === this.parentMenu.contentId.current, i = e.ctrlKey || e.altKey || e.metaKey, a = e.key.length === 1;
		if (this.rovingFocusGroup.handleKeydown(t, e) || e.code === "Space") return;
		let o = this.#a();
		r && !i && a && this.#n(e.key, o), e.target?.id === this.parentMenu.contentId.current && qe.includes(e.key) && (e.preventDefault(), Ke.includes(e.key) && o.reverse(), Ze(o, { select: !1 }, () => this.domContext.getActiveElement()));
	}
	onblur(e) {
		J(e.currentTarget) && J(e.target) && (e.currentTarget.contains?.(e.target) || (this.domContext.getWindow().clearTimeout(this.#t), this.search = ""));
	}
	onfocus(e) {
		this.parentMenu.root.isUsingKeyboard.current && z(() => this.rovingFocusGroup.focusFirstCandidate());
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
		if (!xe(e.target)) return;
		let t = this.parentMenu.triggerNode?.id;
		if (e.target.id === t) {
			e.preventDefault();
			return;
		}
		if (e.target.closest(`#${t}`)) {
			e.preventDefault();
			return;
		}
		this.parentMenu.root.ignoreCloseAutoFocus = !0, z(() => {
			this.parentMenu.root.ignoreCloseAutoFocus = !1;
		});
	}
	get shouldRender() {
		return this.parentMenu.contentPresence.shouldRender;
	}
	#c = n(() => ({ open: this.parentMenu.opts.open.current }));
	get snippetProps() {
		return e(this.#c);
	}
	set snippetProps(e) {
		d(this.#c, e);
	}
	#l = n(() => ({
		id: this.opts.id.current,
		role: "menu",
		"aria-orientation": "vertical",
		[this.parentMenu.root.getBitsAttr("content")]: "",
		"data-state": oe(this.parentMenu.opts.open.current),
		...ue(this.parentMenu.contentPresence.transitionStatus),
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
		return e(this.#l);
	}
	set props(e) {
		d(this.#l, e);
	}
	popperProps = { onCloseAutoFocus: (e) => this.onCloseAutoFocus(e) };
}, gt = class {
	opts;
	content;
	attachment;
	#e = k(!1);
	constructor(e, t) {
		this.opts = e, this.content = t, this.attachment = R(this.opts.ref), this.onpointermove = this.onpointermove.bind(this), this.onpointerleave = this.onpointerleave.bind(this), this.onfocus = this.onfocus.bind(this), this.onblur = this.onblur.bind(this);
	}
	onpointermove(e) {
		if (!e.defaultPrevented && X(e)) {
			if (this.opts.disabled.current) this.content.onItemLeave(e);
			else {
				if (this.content.onItemEnter()) return;
				let t = e.currentTarget;
				if (!q(t)) return;
				t.focus({ preventScroll: !0 });
			}
		}
	}
	onpointerleave(e) {
		e.defaultPrevented || X(e) && this.content.onItemLeave(e);
	}
	onfocus(e) {
		z(() => {
			e.defaultPrevented || this.opts.disabled.current || d(this.#e, !0);
		});
	}
	onblur(e) {
		z(() => {
			e.defaultPrevented || d(this.#e, !1);
		});
	}
	#t = n(() => ({
		id: this.opts.id.current,
		tabindex: -1,
		role: "menuitem",
		"aria-disabled": le(this.opts.disabled.current),
		"data-disabled": se(this.opts.disabled.current),
		"data-highlighted": e(this.#e) ? "" : void 0,
		[this.content.parentMenu.root.getBitsAttr("item")]: "",
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		onfocus: this.onfocus,
		onblur: this.onblur,
		...this.attachment
	}));
	get props() {
		return e(this.#t);
	}
	set props(e) {
		d(this.#t, e);
	}
}, _t = class t {
	static create(e) {
		let n = new gt(e, nt.get());
		return new t(e, n);
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
		if (!(this.item.opts.disabled.current || t && e.key === " ") && We.includes(e.key)) {
			if (!q(e.currentTarget)) return;
			e.currentTarget.click(), e.preventDefault();
		}
	}
	onclick(e) {
		this.item.opts.disabled.current || this.#t();
	}
	onpointerup(e) {
		if (!e.defaultPrevented && !this.#e) {
			if (!q(e.currentTarget)) return;
			e.currentTarget?.click();
		}
	}
	onpointerdown(e) {
		this.#e = !0;
	}
	#n = n(() => V(this.item.props, {
		onclick: this.onclick,
		onpointerdown: this.onpointerdown,
		onpointerup: this.onpointerup,
		onkeydown: this.onkeydown
	}));
	get props() {
		return e(this.#n);
	}
	set props(e) {
		d(this.#n, e);
	}
}, vt = class t {
	static create(e) {
		let n = nt.get(), r = new gt(e, n), i = $.get();
		return new t(e, r, n, i);
	}
	opts;
	item;
	content;
	submenu;
	attachment;
	#e = null;
	constructor(e, t, n, r) {
		this.opts = e, this.item = t, this.content = n, this.submenu = r, this.attachment = R(this.opts.ref, (e) => this.submenu.triggerNode = e), this.onpointerleave = this.onpointerleave.bind(this), this.onpointermove = this.onpointermove.bind(this), this.onkeydown = this.onkeydown.bind(this), this.onclick = this.onclick.bind(this), ie(() => {
			this.#t();
		});
	}
	#t() {
		this.#e !== null && (this.content.domContext.getWindow().clearTimeout(this.#e), this.#e = null);
	}
	onpointermove(e) {
		if (X(e)) {
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
		X(e) && this.#t();
	}
	onkeydown(e) {
		let t = this.content.search !== "";
		this.item.opts.disabled.current || t && e.key === " " || Je[this.submenu.root.opts.dir.current].includes(e.key) && (e.currentTarget.click(), e.preventDefault());
	}
	onclick(e) {
		if (this.item.opts.disabled.current || !q(e.currentTarget)) return;
		e.currentTarget.focus();
		let t = new CustomEvent("menusubtriggerselect", {
			bubbles: !0,
			cancelable: !0
		});
		this.opts.onSelect.current(t), this.submenu.opts.open.current || (this.submenu.onOpen(), z(() => {
			let e = this.submenu.contentNode;
			e && rt.dispatch(e);
		}));
	}
	#n = n(() => V({
		"aria-haspopup": "menu",
		"aria-expanded": le(this.submenu.opts.open.current),
		"data-state": oe(this.submenu.opts.open.current),
		"aria-controls": this.submenu.opts.open.current ? this.submenu.contentId.current : void 0,
		[this.submenu.root.getBitsAttr("sub-trigger")]: "",
		onclick: this.onclick,
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		onkeydown: this.onkeydown,
		...this.attachment
	}, this.item.props));
	get props() {
		return e(this.#n);
	}
	set props(e) {
		d(this.#n, e);
	}
}, yt = class t {
	static create(e) {
		return new t(e, $.get());
	}
	opts;
	parentMenu;
	attachment;
	constructor(e, t) {
		this.opts = e, this.parentMenu = t, this.attachment = R(this.opts.ref, (e) => this.parentMenu.triggerNode = e);
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
	#e = n(() => {
		if (this.parentMenu.opts.open.current && this.parentMenu.contentId.current) return this.parentMenu.contentId.current;
	});
	#t = n(() => ({
		id: this.opts.id.current,
		disabled: this.opts.disabled.current,
		"aria-haspopup": "menu",
		"aria-expanded": le(this.parentMenu.opts.open.current),
		"aria-controls": e(this.#e),
		"data-disabled": se(this.opts.disabled.current),
		"data-state": oe(this.parentMenu.opts.open.current),
		[this.parentMenu.root.getBitsAttr("trigger")]: "",
		onclick: this.onclick,
		onpointerdown: this.onpointerdown,
		onpointerup: this.onpointerup,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return e(this.#t);
	}
	set props(e) {
		d(this.#t, e);
	}
}, bt = class {
	static create(e) {
		let t = $.get();
		return $.set(new mt(e, t.root, t));
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/menu/components/menu-sub.svelte
function xt(e, t) {
	c(t, !0);
	let n = f(t, "open", 15, !1), r = f(t, "onOpenChange", 3, K), a = f(t, "onOpenChangeComplete", 3, K);
	bt.create({
		open: I(() => n(), (e) => {
			n(e), r()?.(e);
		}),
		onOpenChangeComplete: I(() => a())
	}), ke(e, {
		children: (e, n) => {
			var r = O(), i = m(r);
			w(i, () => t.children ?? _), p(e, r);
		},
		$$slots: { default: !0 }
	}), i();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/menu/components/menu-item.svelte
var St = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children",
	"ref",
	"id",
	"disabled",
	"onSelect",
	"closeOnSelect"
]), Ct = s("<div><!></div>");
function wt(t, a) {
	let o = r();
	c(a, !0);
	let s = f(a, "ref", 15, null), u = f(a, "id", 19, () => H(o)), d = f(a, "disabled", 3, !1), h = f(a, "onSelect", 3, K), g = f(a, "closeOnSelect", 3, !0), v = y(a, St), x = _t.create({
		id: I(() => u()),
		disabled: I(() => d()),
		onSelect: I(() => h()),
		ref: I(() => s(), (e) => s(e)),
		closeOnSelect: I(() => g())
	}), S = n(() => V(v, x.props));
	var C = O(), D = m(C), k = (t) => {
		var n = O(), r = m(n);
		w(r, () => a.child, () => ({ props: e(S) })), p(t, n);
	}, A = (t) => {
		var n = Ct();
		b(n, () => ({ ...e(S) }));
		var r = T(n);
		w(r, () => a.children ?? _), E(n), p(t, n);
	};
	l(D, (e) => {
		a.child ? e(k) : e(A, -1);
	}), p(t, C), i();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/menu/components/menu-sub-content.svelte
var Tt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"children",
	"child",
	"loop",
	"onInteractOutside",
	"forceMount",
	"onEscapeKeydown",
	"interactOutsideBehavior",
	"escapeKeydownBehavior",
	"onOpenAutoFocus",
	"onCloseAutoFocus",
	"onFocusOutside",
	"side",
	"trapFocus",
	"style"
]), Et = s("<div><div><!></div></div>");
function Dt(t, a) {
	let o = r();
	c(a, !0);
	let s = f(a, "id", 19, () => H(o)), u = f(a, "ref", 15, null), d = f(a, "loop", 3, !0), h = f(a, "onInteractOutside", 3, K), g = f(a, "forceMount", 3, !1), v = f(a, "onEscapeKeydown", 3, K), x = f(a, "interactOutsideBehavior", 3, "defer-otherwise-close"), S = f(a, "escapeKeydownBehavior", 3, "defer-otherwise-close"), D = f(a, "onOpenAutoFocus", 3, K), k = f(a, "onCloseAutoFocus", 3, K), A = f(a, "onFocusOutside", 3, K), j = f(a, "side", 3, "right"), M = f(a, "trapFocus", 3, !1), N = y(a, Tt), P = ht.create({
		id: I(() => s()),
		loop: I(() => d()),
		ref: I(() => u(), (e) => u(e)),
		isSub: !0,
		onCloseAutoFocus: I(() => ne)
	});
	function ee(e) {
		let t = e.currentTarget.contains(e.target), n = Ye[P.parentMenu.root.opts.dir.current].includes(e.key);
		t && n && (P.parentMenu.onClose(), P.parentMenu.triggerNode?.focus(), e.preventDefault());
	}
	let F = n(() => P.parentMenu.root.getBitsAttr("sub-content")), L = n(() => V(N, P.props, {
		side: j(),
		onkeydown: ee,
		[e(F)]: ""
	}));
	function te(e) {
		D()(e), !e.defaultPrevented && (e.preventDefault(), P.parentMenu.root.isUsingKeyboard && P.parentMenu.contentNode && rt.dispatch(P.parentMenu.contentNode));
	}
	function ne(e) {
		k()(e), !e.defaultPrevented && e.preventDefault();
	}
	function re(e) {
		h()(e), !e.defaultPrevented && P.parentMenu.onClose();
	}
	function ie(e) {
		v()(e), !e.defaultPrevented && P.parentMenu.onClose();
	}
	function R(e) {
		if (A()(e), e.defaultPrevented || !q(e.target) || e.target.id === P.parentMenu.triggerNode?.id) return;
		if ((P.parentMenu.parentMenu?.contentNode)?.contains(e.target)) {
			P.parentMenu.onClose(), e.preventDefault();
			return;
		}
		let t = `[${P.parentMenu.root.getBitsAttr("sub-content")}]`;
		if (e.target.closest(t)) {
			e.preventDefault();
			return;
		}
		P.parentMenu.onClose();
	}
	var z = O(), ae = m(z), oe = (t) => {
		Me(t, C(() => e(L), {
			get ref() {
				return P.opts.ref;
			},
			get interactOutsideBehavior() {
				return x();
			},
			get escapeKeydownBehavior() {
				return S();
			},
			onOpenAutoFocus: te,
			get enabled() {
				return P.parentMenu.opts.open.current;
			},
			onInteractOutside: re,
			onEscapeKeydown: ie,
			onFocusOutside: R,
			preventScroll: !1,
			get loop() {
				return d();
			},
			get trapFocus() {
				return M();
			},
			get shouldRender() {
				return P.shouldRender;
			},
			popper: (t, r) => {
				let i = () => (r?.()).props, o = () => (r?.()).wrapperProps, s = n(() => V(i(), e(L), { style: je("menu") }, { style: a.style }));
				var c = O(), u = m(c), d = (t) => {
					var r = O(), i = m(r);
					{
						let t = n(() => ({
							props: e(s),
							wrapperProps: o(),
							...P.snippetProps
						}));
						w(i, () => a.child, () => e(t));
					}
					p(t, r);
				}, f = (t) => {
					var n = Et();
					b(n, () => ({ ...o() }));
					var r = T(n);
					b(r, () => ({ ...e(s) }));
					var i = T(r);
					w(i, () => a.children ?? _), E(r), E(n), p(t, n);
				};
				l(u, (e) => {
					a.child ? e(d) : e(f, -1);
				}), p(t, c);
			},
			$$slots: { popper: !0 }
		}));
	}, B = (t) => {
		Ae(t, C(() => e(L), {
			get ref() {
				return P.opts.ref;
			},
			get interactOutsideBehavior() {
				return x();
			},
			get escapeKeydownBehavior() {
				return S();
			},
			onCloseAutoFocus: ne,
			onOpenAutoFocus: te,
			get open() {
				return P.parentMenu.opts.open.current;
			},
			onInteractOutside: re,
			onEscapeKeydown: ie,
			onFocusOutside: R,
			preventScroll: !1,
			get loop() {
				return d();
			},
			get trapFocus() {
				return M();
			},
			get shouldRender() {
				return P.shouldRender;
			},
			popper: (t, r) => {
				let i = () => (r?.()).props, o = () => (r?.()).wrapperProps, s = n(() => V(i(), e(L), { style: je("menu") }, { style: a.style }));
				var c = O(), u = m(c), d = (t) => {
					var r = O(), i = m(r);
					{
						let t = n(() => ({
							props: e(s),
							wrapperProps: o(),
							...P.snippetProps
						}));
						w(i, () => a.child, () => e(t));
					}
					p(t, r);
				}, f = (t) => {
					var n = Et();
					b(n, () => ({ ...o() }));
					var r = T(n);
					b(r, () => ({ ...e(s) }));
					var i = T(r);
					w(i, () => a.children ?? _), E(r), E(n), p(t, n);
				};
				l(u, (e) => {
					a.child ? e(d) : e(f, -1);
				}), p(t, c);
			},
			$$slots: { popper: !0 }
		}));
	};
	l(ae, (e) => {
		g() ? e(oe) : g() || e(B, 1);
	}), p(t, z), i();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/menu/components/menu-sub-trigger.svelte
var Ot = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"disabled",
	"ref",
	"children",
	"child",
	"onSelect",
	"openDelay"
]), kt = s("<div><!></div>");
function At(t, a) {
	let o = r();
	c(a, !0);
	let s = f(a, "id", 19, () => H(o)), u = f(a, "disabled", 3, !1), d = f(a, "ref", 15, null), h = f(a, "onSelect", 3, K), g = f(a, "openDelay", 3, 0), v = y(a, Ot), x = vt.create({
		disabled: I(() => u()),
		onSelect: I(() => h()),
		id: I(() => s()),
		ref: I(() => d(), (e) => d(e)),
		openDelay: I(() => g())
	}), S = n(() => V(v, x.props));
	Ne(t, {
		get id() {
			return s();
		},
		get ref() {
			return x.opts.ref;
		},
		children: (t, n) => {
			var r = O(), i = m(r), o = (t) => {
				var n = O(), r = m(n);
				w(r, () => a.child, () => ({ props: e(S) })), p(t, n);
			}, s = (t) => {
				var n = kt();
				b(n, () => ({ ...e(S) }));
				var r = T(n);
				w(r, () => a.children ?? _), E(n), p(t, n);
			};
			l(i, (e) => {
				a.child ? e(o) : e(s, -1);
			}), p(t, r);
		},
		$$slots: { default: !0 }
	}), i();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/menu/components/menu.svelte
function jt(e, t) {
	c(t, !0);
	let n = f(t, "open", 15, !1), r = f(t, "dir", 3, "ltr"), a = f(t, "onOpenChange", 3, K), o = f(t, "onOpenChangeComplete", 3, K), s = f(t, "_internal_variant", 3, "dropdown-menu"), l = f(t, "_internal_should_skip_exit_animation", 3, void 0), u = pt.create({
		variant: I(() => s()),
		dir: I(() => r()),
		onClose: () => {
			n(!1), a()(!1);
		},
		shouldSkipExitAnimation: () => l()?.() ?? !1
	});
	mt.create({
		open: I(() => n(), (e) => {
			n(e), a()(e);
		}),
		onOpenChangeComplete: I(() => o())
	}, u), ke(e, {
		children: (e, n) => {
			var r = O(), i = m(r);
			w(i, () => t.children ?? _), p(e, r);
		},
		$$slots: { default: !0 }
	}), i();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/dropdown-menu/components/dropdown-menu-content.svelte
var Mt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"child",
	"children",
	"ref",
	"loop",
	"onInteractOutside",
	"onEscapeKeydown",
	"onCloseAutoFocus",
	"forceMount",
	"trapFocus",
	"style"
]), Nt = s("<div><div><!></div></div>");
function Pt(t, a) {
	let o = r();
	c(a, !0);
	let s = f(a, "id", 19, () => H(o)), u = f(a, "ref", 15, null), d = f(a, "loop", 3, !0), h = f(a, "onInteractOutside", 3, K), g = f(a, "onEscapeKeydown", 3, K), v = f(a, "onCloseAutoFocus", 3, K), x = f(a, "forceMount", 3, !1), S = f(a, "trapFocus", 3, !1), D = y(a, Mt), k = ht.create({
		id: I(() => s()),
		loop: I(() => d()),
		ref: I(() => u(), (e) => u(e)),
		onCloseAutoFocus: I(() => v())
	}), A = n(() => V(D, k.props));
	function j(e) {
		if (k.handleInteractOutside(e), !e.defaultPrevented && (h()(e), !e.defaultPrevented)) {
			if (e.target && e.target instanceof Element) {
				let t = `[${k.parentMenu.root.getBitsAttr("sub-content")}]`;
				if (e.target.closest(t)) return;
			}
			k.parentMenu.onClose();
		}
	}
	function M(e) {
		g()(e), !e.defaultPrevented && k.parentMenu.onClose();
	}
	var N = O(), P = m(N), ee = (t) => {
		Me(t, C(() => e(A), () => k.popperProps, {
			get ref() {
				return k.opts.ref;
			},
			get enabled() {
				return k.parentMenu.opts.open.current;
			},
			onInteractOutside: j,
			onEscapeKeydown: M,
			get trapFocus() {
				return S();
			},
			get loop() {
				return d();
			},
			forceMount: !0,
			get id() {
				return s();
			},
			get shouldRender() {
				return k.shouldRender;
			},
			popper: (t, r) => {
				let i = () => (r?.()).props, o = () => (r?.()).wrapperProps, s = n(() => V(i(), { style: je("dropdown-menu") }, { style: a.style }));
				var c = O(), u = m(c), d = (t) => {
					var r = O(), i = m(r);
					{
						let t = n(() => ({
							props: e(s),
							wrapperProps: o(),
							...k.snippetProps
						}));
						w(i, () => a.child, () => e(t));
					}
					p(t, r);
				}, f = (t) => {
					var n = Nt();
					b(n, () => ({ ...o() }));
					var r = T(n);
					b(r, () => ({ ...e(s) }));
					var i = T(r);
					w(i, () => a.children ?? _), E(r), E(n), p(t, n);
				};
				l(u, (e) => {
					a.child ? e(d) : e(f, -1);
				}), p(t, c);
			},
			$$slots: { popper: !0 }
		}));
	}, F = (t) => {
		Ae(t, C(() => e(A), () => k.popperProps, {
			get ref() {
				return k.opts.ref;
			},
			get open() {
				return k.parentMenu.opts.open.current;
			},
			onInteractOutside: j,
			onEscapeKeydown: M,
			get trapFocus() {
				return S();
			},
			get loop() {
				return d();
			},
			forceMount: !1,
			get id() {
				return s();
			},
			get shouldRender() {
				return k.shouldRender;
			},
			popper: (t, r) => {
				let i = () => (r?.()).props, o = () => (r?.()).wrapperProps, s = n(() => V(i(), { style: je("dropdown-menu") }, { style: a.style }));
				var c = O(), u = m(c), d = (t) => {
					var r = O(), i = m(r);
					{
						let t = n(() => ({
							props: e(s),
							wrapperProps: o(),
							...k.snippetProps
						}));
						w(i, () => a.child, () => e(t));
					}
					p(t, r);
				}, f = (t) => {
					var n = Nt();
					b(n, () => ({ ...o() }));
					var r = T(n);
					b(r, () => ({ ...e(s) }));
					var i = T(r);
					w(i, () => a.children ?? _), E(r), E(n), p(t, n);
				};
				l(u, (e) => {
					a.child ? e(d) : e(f, -1);
				}), p(t, c);
			},
			$$slots: { popper: !0 }
		}));
	};
	l(P, (e) => {
		x() ? e(ee) : x() || e(F, 1);
	}), p(t, N), i();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/menu/components/menu-trigger.svelte
var Ft = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"disabled",
	"type"
]), It = s("<button><!></button>");
function Lt(t, a) {
	let o = r();
	c(a, !0);
	let s = f(a, "id", 19, () => H(o)), u = f(a, "ref", 15, null), d = f(a, "disabled", 3, !1), h = f(a, "type", 3, "button"), g = y(a, Ft), v = yt.create({
		id: I(() => s()),
		disabled: I(() => d() ?? !1),
		ref: I(() => u(), (e) => u(e))
	}), x = n(() => V(g, v.props, { type: h() }));
	Ne(t, {
		get id() {
			return s();
		},
		get ref() {
			return v.opts.ref;
		},
		children: (t, n) => {
			var r = O(), i = m(r), o = (t) => {
				var n = O(), r = m(n);
				w(r, () => a.child, () => ({ props: e(x) })), p(t, n);
			}, s = (t) => {
				var n = It();
				b(n, () => ({ ...e(x) }));
				var r = T(n);
				w(r, () => a.children ?? _), E(n), p(t, n);
			};
			l(i, (e) => {
				a.child ? e(o) : e(s, -1);
			}), p(t, r);
		},
		$$slots: { default: !0 }
	}), i();
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown-content.svelte
var Rt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function zt(t, r) {
	c(r, !0);
	let a = y(r, Rt);
	var s = O(), l = m(s);
	o(l, () => Ce, (t, i) => {
		i(t, {
			children: (t, i) => {
				var s = O(), c = m(s);
				{
					let t = n(() => N("z-[100] min-w-(--bits-floating-anchor-width)", "rounded-xl bg-dark-800 p-[5px] shadow-lg", "border border-dark-600", r.class));
					o(c, () => Pt, (n, i) => {
						i(n, C(() => a, {
							get class() {
								return e(t);
							},
							sideOffset: 4,
							children: (e, t) => {
								Pe(e, {
									orientation: "vertical",
									viewportClasses: "max-h-(--bits-dropdown-menu-content-available-height) overflow-hidden",
									children: (e, t) => {
										var n = O(), i = m(n);
										w(i, () => r.children ?? _), p(e, n);
									},
									$$slots: { default: !0 }
								});
							},
							$$slots: { default: !0 }
						}));
					});
				}
				p(t, s);
			},
			$$slots: { default: !0 }
		});
	}), p(t, s), i();
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown-item.svelte
var Bt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function Vt(t, r) {
	c(r, !0);
	let a = y(r, Bt);
	var s = O(), l = m(s);
	{
		let t = n(() => N("cursor-pointer px-4 py-2 outline-none", M, A, j, r.class));
		o(l, () => wt, (n, i) => {
			i(n, C(() => a, {
				get class() {
					return e(t);
				},
				children: (e, t) => {
					var n = O(), i = m(n);
					w(i, () => r.children ?? _), p(e, n);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	p(t, s), i();
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown-sub-content.svelte
var Ht = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class"
]);
function Ut(t, r) {
	c(r, !0);
	let a = y(r, Ht);
	var s = O(), l = m(s);
	o(l, () => Ce, (t, i) => {
		i(t, {
			children: (t, i) => {
				var s = O(), c = m(s);
				{
					let t = n(() => N("z-[100] min-w-(--bits-floating-anchor-width)", "rounded-xl bg-dark-800 p-[5px] shadow-lg", "border border-dark-600", r.class));
					o(c, () => Dt, (n, i) => {
						i(n, C(() => a, {
							get class() {
								return e(t);
							},
							sideOffset: -1,
							children: (e, t) => {
								Pe(e, {
									orientation: "vertical",
									viewportClasses: "max-h-(--bits-menu-content-available-height) overflow-hidden",
									children: (e, t) => {
										var n = O(), i = m(n);
										w(i, () => r.children ?? _), p(e, n);
									},
									$$slots: { default: !0 }
								});
							},
							$$slots: { default: !0 }
						}));
					});
				}
				p(t, s);
			},
			$$slots: { default: !0 }
		});
	}), p(t, s), i();
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown-sub-trigger.svelte
var Wt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"class",
	"openDelay"
]), Gt = s("<!> <!>", 1);
function Kt(t, r) {
	c(r, !0);
	let a = f(r, "openDelay", 3, 100), s = y(r, Wt);
	var l = O(), u = m(l);
	{
		let t = n(() => N("flex cursor-pointer items-center justify-between gap-2 px-4 py-2 outline-none", M, A, j, "data-[state=open]:bg-dark-700 data-[state=open]:text-dark-50", r.class));
		o(u, () => At, (n, i) => {
			i(n, C(() => s, {
				get openDelay() {
					return a();
				},
				get class() {
					return e(t);
				},
				children: (e, t) => {
					var n = Gt(), i = m(n);
					w(i, () => r.children ?? _);
					var a = D(i, 2);
					P(a, { icon: "ri:arrow-right-s-line" }), p(e, n);
				},
				$$slots: { default: !0 }
			}));
		});
	}
	p(t, l), i();
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown-sub.svelte
var qt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children"
]);
function Jt(e, t) {
	let n = y(t, qt);
	var r = O(), i = m(r);
	o(i, () => xt, (e, r) => {
		r(e, C(() => n, {
			children: (e, n) => {
				var r = O(), i = m(r);
				w(i, () => t.children ?? _), p(e, r);
			},
			$$slots: { default: !0 }
		}));
	}), p(e, r);
}
//#endregion
//#region ../ui/src/lib/components/dropdown/dropdown.svelte
var Yt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"children",
	"trigger",
	"open"
]), Xt = s("<!> <!>", 1);
function Zt(e, n) {
	c(n, !0);
	let r = f(n, "open", 15, !1), a = y(n, Yt);
	var s = O(), u = m(s);
	o(u, () => jt, (e, i) => {
		i(e, C(() => a, {
			get open() {
				return r();
			},
			set open(e) {
				r(e);
			},
			children: (e, r) => {
				var i = Xt(), a = m(i);
				{
					let e = (e, r) => {
						let i = () => (r?.()).props;
						var a = O(), o = m(a), s = (e) => {
							Fe(e, C(i, {
								variant: "outline",
								children: (e, r) => {
									h();
									var i = t();
									v(() => g(i, n.trigger)), p(e, i);
								},
								$$slots: { default: !0 }
							}));
						}, c = (e) => {
							var t = O(), r = m(t);
							w(r, () => n.trigger, () => ({ props: i() })), p(e, t);
						};
						l(o, (e) => {
							typeof n.trigger == "string" ? e(s) : e(c, -1);
						}), p(e, a);
					};
					o(a, () => Lt, (t, n) => {
						n(t, {
							child: e,
							$$slots: { child: !0 }
						});
					});
				}
				var s = D(a, 2);
				w(s, () => n.children ?? _), p(e, i);
			},
			$$slots: { default: !0 }
		}));
	}), p(e, s), i();
}
//#endregion
export { zt as Content, Vt as Item, Zt as Root, Jt as Sub, Ut as SubContent, Kt as SubTrigger };
