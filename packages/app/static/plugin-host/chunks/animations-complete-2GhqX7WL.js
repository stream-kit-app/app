import { $t as e, Bn as t, Br as n, Dr as r, Gn as i, Nn as a, Vr as o, Wn as s, Wr as c, _r as l, ir as u, pr as d, rr as f, yn as p, yr as m } from "./client-BFeMv2Ma.js";
import "./index-client-DI7sx7Sj.js";
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_61a373d23e0427b3790b60c19a185d1b/node_modules/svelte-toolbelt/dist/utils/is.js
function ee(e) {
	return typeof e == "function";
}
function h(e) {
	return typeof e == "object" && !!e;
}
var g = [
	"string",
	"number",
	"bigint",
	"boolean"
];
function _(e) {
	return e == null || g.includes(typeof e) ? !0 : Array.isArray(e) ? e.every((e) => _(e)) : typeof e == "object" && Object.getPrototypeOf(e) === Object.prototype;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_61a373d23e0427b3790b60c19a185d1b/node_modules/svelte-toolbelt/dist/box/box-extras.svelte.js
var v = Symbol("box"), y = Symbol("is-writable");
function b(e, n) {
	let i = r(e);
	return n ? {
		[v]: !0,
		[y]: !0,
		get current() {
			return t(i);
		},
		set current(e) {
			n(e);
		}
	} : {
		[v]: !0,
		get current() {
			return e();
		}
	};
}
function x(e) {
	return h(e) && v in e;
}
function S(e) {
	return x(e) && y in e;
}
function C(e) {
	return x(e) ? e : ee(e) ? b(e) : E(e);
}
function w(e) {
	return Object.entries(e).reduce((e, [t, n]) => x(n) ? (S(n) ? Object.defineProperty(e, t, {
		get() {
			return n.current;
		},
		set(e) {
			n.current = e;
		}
	}) : Object.defineProperty(e, t, { get() {
		return n.current;
	} }), e) : Object.assign(e, { [t]: n }), {});
}
function T(e) {
	return S(e) ? {
		[v]: !0,
		get current() {
			return e.current;
		}
	} : e;
}
function E(e) {
	let n = m(d(e));
	return {
		[v]: !0,
		[y]: !0,
		get current() {
			return t(n);
		},
		set current(e) {
			l(n, e, !0);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_f81b9774b65eb89fa595774c0a48a9ec/node_modules/runed/dist/internal/configurable-globals.js
var D = typeof window < "u" ? window : void 0;
typeof window < "u" && window.document, typeof window < "u" && window.navigator, typeof window < "u" && window.location;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_f81b9774b65eb89fa595774c0a48a9ec/node_modules/runed/dist/internal/utils/dom.js
function O(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot;) {
		let e = t.shadowRoot.activeElement;
		if (e === t) break;
		t = e;
	}
	return t;
}
new class {
	#e;
	#t;
	constructor(e = {}) {
		let { window: t = D, document: n = t?.document } = e;
		t !== void 0 && (this.#e = n, this.#t = p((e) => {
			let n = a(t, "focusin", e), r = a(t, "focusout", e);
			return () => {
				n(), r();
			};
		}));
	}
	get current() {
		return this.#t?.(), this.#e ? O(this.#e) : null;
	}
}();
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_f81b9774b65eb89fa595774c0a48a9ec/node_modules/runed/dist/internal/utils/is.js
function k(e) {
	return typeof e == "function";
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_f81b9774b65eb89fa595774c0a48a9ec/node_modules/runed/dist/utilities/extract/extract.svelte.js
function te(e, t) {
	if (k(e)) {
		let n = e();
		return n === void 0 ? t : n;
	}
	return e === void 0 ? t : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_f81b9774b65eb89fa595774c0a48a9ec/node_modules/runed/dist/utilities/context/context.js
var A = class {
	#e;
	#t;
	constructor(e) {
		this.#e = e, this.#t = Symbol(e);
	}
	get key() {
		return this.#t;
	}
	exists() {
		return o(this.#t);
	}
	get() {
		let e = n(this.#t);
		if (e === void 0) throw Error(`Context "${this.#e}" not found`);
		return e;
	}
	getOr(e) {
		let t = n(this.#t);
		return t === void 0 ? e : t;
	}
	set(e) {
		return c(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_f81b9774b65eb89fa595774c0a48a9ec/node_modules/runed/dist/utilities/use-debounce/use-debounce.svelte.js
function j(e, n) {
	let i = m(null), a = r(() => te(n, 250));
	function o(...n) {
		if (t(i)) t(i).timeout && clearTimeout(t(i).timeout);
		else {
			let e, t, n = new Promise((n, r) => {
				e = n, t = r;
			});
			l(i, {
				timeout: null,
				runner: null,
				promise: n,
				resolve: e,
				reject: t
			}, !0);
		}
		return t(i).runner = async () => {
			if (!t(i)) return;
			let r = t(i);
			l(i, null);
			try {
				r.resolve(await e.apply(this, n));
			} catch (e) {
				r.reject(e);
			}
		}, t(i).timeout = setTimeout(t(i).runner, t(a)), t(i).promise;
	}
	return o.cancel = async () => {
		(!t(i) || t(i).timeout === null) && (await new Promise((e) => setTimeout(e, 0)), !t(i) || t(i).timeout === null) || (clearTimeout(t(i).timeout), t(i).reject("Cancelled"), l(i, null));
	}, o.runScheduledNow = async () => {
		(!t(i) || !t(i).timeout) && (await new Promise((e) => setTimeout(e, 0)), !t(i) || !t(i).timeout) || (clearTimeout(t(i).timeout), t(i).timeout = null, await t(i).runner?.());
	}, Object.defineProperty(o, "pending", {
		enumerable: !0,
		get() {
			return !!t(i)?.timeout;
		}
	}), o;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_f81b9774b65eb89fa595774c0a48a9ec/node_modules/runed/dist/utilities/watch/watch.svelte.js
function M(e, t) {
	switch (e) {
		case "post":
			f(t);
			break;
		case "pre": u(t);
	}
}
function N(e, t, n, r = {}) {
	let { lazy: a = !1 } = r, o = !a, s = Array.isArray(e) ? [] : void 0;
	M(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!o) {
			o = !0, s = t;
			return;
		}
		let r = i(() => n(t, s));
		return s = t, r;
	});
}
function P(e, t, n) {
	N(e, "post", t, n);
}
function F(e, t, n) {
	N(e, "pre", t, n);
}
P.pre = F;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_f81b9774b65eb89fa595774c0a48a9ec/node_modules/runed/dist/internal/utils/get.js
function I(e) {
	return k(e) ? e() : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_f81b9774b65eb89fa595774c0a48a9ec/node_modules/runed/dist/utilities/element-size/element-size.svelte.js
var L = class {
	#e = {
		width: 0,
		height: 0
	};
	#t = !1;
	#n;
	#r;
	#i;
	#a = r(() => (t(this.#s)?.(), this.getSize().width));
	#o = r(() => (t(this.#s)?.(), this.getSize().height));
	#s = r(() => {
		let e = I(this.#r);
		if (e) return p((t) => {
			if (!this.#i) return;
			let n = new this.#i.ResizeObserver((e) => {
				this.#t = !0;
				for (let t of e) {
					let e = this.#n.box === "content-box" ? t.contentBoxSize : t.borderBoxSize, n = Array.isArray(e) ? e : [e];
					this.#e.width = n.reduce((e, t) => Math.max(e, t.inlineSize), 0), this.#e.height = n.reduce((e, t) => Math.max(e, t.blockSize), 0);
				}
				t();
			});
			return n.observe(e), () => {
				this.#t = !1, n.disconnect();
			};
		});
	});
	constructor(e, t = { box: "border-box" }) {
		this.#i = t.window ?? D, this.#n = t, this.#r = e, this.#e = {
			width: 0,
			height: 0
		};
	}
	calculateSize() {
		let e = I(this.#r);
		if (!e || !this.#i) return;
		let t = e.offsetWidth, n = e.offsetHeight;
		if (this.#n.box === "border-box") return {
			width: t,
			height: n
		};
		let r = this.#i.getComputedStyle(e), i = parseFloat(r.paddingLeft) + parseFloat(r.paddingRight), a = parseFloat(r.paddingTop) + parseFloat(r.paddingBottom), o = parseFloat(r.borderLeftWidth) + parseFloat(r.borderRightWidth), s = parseFloat(r.borderTopWidth) + parseFloat(r.borderBottomWidth);
		return {
			width: t - i - o,
			height: n - a - s
		};
	}
	getSize() {
		return this.#t ? this.#e : this.calculateSize() ?? this.#e;
	}
	get current() {
		return t(this.#s)?.(), this.getSize();
	}
	get width() {
		return t(this.#a);
	}
	get height() {
		return t(this.#o);
	}
}, R = class {
	#e = m(!1);
	constructor() {
		f(() => (i(() => l(this.#e, !0)), () => {
			l(this.#e, !1);
		}));
	}
	get current() {
		return t(this.#e);
	}
}, z = class {
	#e = () => void 0;
	#t = r(() => this.#e());
	constructor(e, t) {
		let n;
		t !== void 0 && (n = t), this.#e = () => {
			try {
				return n;
			} finally {
				n = e();
			}
		};
	}
	get current() {
		return t(this.#t);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_61a373d23e0427b3790b60c19a185d1b/node_modules/svelte-toolbelt/dist/utils/on-destroy-effect.svelte.js
function B(e) {
	f(() => () => {
		e();
	});
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_61a373d23e0427b3790b60c19a185d1b/node_modules/svelte-toolbelt/dist/utils/after-tick.js
function V(e) {
	s().then(e);
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_61a373d23e0427b3790b60c19a185d1b/node_modules/svelte-toolbelt/dist/utils/dom.js
var H = 1, U = 9, W = 11;
function G(e) {
	return h(e) && e.nodeType === H && typeof e.nodeName == "string";
}
function K(e) {
	return h(e) && e.nodeType === U;
}
function q(e) {
	return h(e) && e.constructor?.name === "VisualViewport";
}
function J(e) {
	return h(e) && e.nodeType !== void 0;
}
function Y(e) {
	return J(e) && e.nodeType === W && "host" in e;
}
function X(e, t) {
	if (!e || !t || !G(e) || !G(t)) return !1;
	let n = t.getRootNode?.();
	if (e === t || e.contains(t)) return !0;
	if (n && Y(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function Z(e) {
	return K(e) ? e : q(e) ? e.document : e?.ownerDocument ?? document;
}
function Q(e) {
	return Y(e) ? Q(e.host) : K(e) ? e.defaultView ?? window : G(e) ? e.ownerDocument?.defaultView ?? window : window;
}
function ne(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot;) {
		let e = t.shadowRoot.activeElement;
		if (e === t) break;
		t = e;
	}
	return t;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_61a373d23e0427b3790b60c19a185d1b/node_modules/svelte-toolbelt/dist/utils/attach-ref.js
function re(t, n) {
	return { [e()]: (e) => x(t) ? (t.current = e, i(() => n?.(e)), () => {
		"isConnected" in e && e.isConnected || (t.current = null, n?.(null));
	}) : (t(e), i(() => n?.(e)), () => {
		"isConnected" in e && e.isConnected || (t(null), n?.(null));
	}) };
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/attrs.js
function ie(e) {
	return e ? "true" : "false";
}
function ae(e) {
	return e ? "true" : void 0;
}
function oe(e) {
	return e ? "" : void 0;
}
function $(e) {
	return e ? !0 : void 0;
}
function se(e) {
	return e ? "open" : "closed";
}
function ce(e) {
	return e ? "checked" : "unchecked";
}
function le(e) {
	return e === "starting" ? { "data-starting-style": "" } : e === "ending" ? { "data-ending-style": "" } : {};
}
function ue(e, t) {
	return t ? "mixed" : e ? "true" : "false";
}
var de = class {
	#e;
	#t;
	attrs;
	constructor(e) {
		this.#e = e.getVariant ? e.getVariant() : null, this.#t = this.#e ? `data-${this.#e}-` : `data-${e.component}-`, this.getAttr = this.getAttr.bind(this), this.selector = this.selector.bind(this), this.attrs = Object.fromEntries(e.parts.map((e) => [e, this.getAttr(e)]));
	}
	getAttr(e, t) {
		return t ? `data-${t}-${e}` : `${this.#t}${e}`;
	}
	selector(e, t) {
		return `[${this.getAttr(e, t)}]`;
	}
};
function fe(e) {
	let t = new de(e);
	return {
		...t.attrs,
		selector: t.selector,
		getAttr: t.getAttr
	};
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/animations-complete.js
var pe = class {
	#e;
	#t = null;
	#n = null;
	#r = 0;
	constructor(e) {
		this.#e = e, B(() => this.#i());
	}
	#i() {
		this.#t !== null && (window.cancelAnimationFrame(this.#t), this.#t = null), this.#n?.disconnect(), this.#n = null, this.#r++;
	}
	run(e) {
		this.#i();
		let t = this.#e.ref.current;
		if (!t) return;
		if (typeof t.getAnimations != "function") {
			this.#a(e);
			return;
		}
		let n = this.#r, r = () => {
			n === this.#r && this.#a(e);
		}, i = () => {
			if (n !== this.#r) return;
			let e = t.getAnimations();
			if (e.length === 0) {
				r();
				return;
			}
			Promise.all(e.map((e) => e.finished)).then(() => {
				r();
			}).catch(() => {
				if (n === this.#r) {
					if (t.getAnimations().some((e) => e.pending || e.playState !== "finished")) {
						i();
						return;
					}
					r();
				}
			});
		}, a = () => {
			this.#t = window.requestAnimationFrame(() => {
				this.#t = null, i();
			});
		};
		if (!this.#e.afterTick.current) {
			a();
			return;
		}
		this.#t = window.requestAnimationFrame(() => {
			this.#t = null;
			let e = "data-starting-style";
			if (!t.hasAttribute(e)) {
				a();
				return;
			}
			this.#n = new MutationObserver(() => {
				n === this.#r && (t.hasAttribute(e) || (this.#n?.disconnect(), this.#n = null, a()));
			}), this.#n.observe(t, {
				attributes: !0,
				attributeFilter: [e]
			});
		});
	}
	#a(e) {
		let t = () => {
			e();
		};
		this.#e.afterTick ? V(t) : t();
	}
};
//#endregion
export { y as A, A as C, b as D, C as E, T as M, _ as N, x as O, j as S, w as T, B as _, $ as a, L as b, ce as c, re as d, X as f, V as g, Q as h, ae as i, E as j, S as k, se as l, Z as m, oe as n, fe as o, ne as p, ie as r, ue as s, pe as t, le as u, z as v, v as w, P as x, R as y };
