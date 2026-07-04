import { Br as e, Gn as t, Kn as n, Mn as r, Nn as i, On as a, Sr as o, Ur as s, Wt as c, cr as l, nr as u, or as d, pr as f, xn as p, zn as m, zr as h } from "./client-xxWnFgeR.js";
import "./index-client-DLfVeyOI.js";
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/utils/is.js
function g(e) {
	return typeof e == "function";
}
function _(e) {
	return typeof e == "object" && !!e;
}
var v = [
	"string",
	"number",
	"bigint",
	"boolean"
];
function y(e) {
	return e == null || v.includes(typeof e) ? !0 : Array.isArray(e) ? e.every((e) => y(e)) : typeof e == "object" ? Object.getPrototypeOf(e) === Object.prototype : !1;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/box/box-extras.svelte.js
var b = Symbol("box"), x = Symbol("is-writable");
function S(e, t) {
	let n = f(e);
	return t ? {
		[b]: !0,
		[x]: !0,
		get current() {
			return a(n);
		},
		set current(e) {
			t(e);
		}
	} : {
		[b]: !0,
		get current() {
			return e();
		}
	};
}
function C(e) {
	return _(e) && b in e;
}
function w(e) {
	return C(e) && x in e;
}
function ee(e) {
	return C(e) ? e : g(e) ? S(e) : E(e);
}
function te(e) {
	return Object.entries(e).reduce((e, [t, n]) => C(n) ? (w(n) ? Object.defineProperty(e, t, {
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
	return w(e) ? {
		[b]: !0,
		get current() {
			return e.current;
		}
	} : e;
}
function E(e) {
	let t = l(u(e));
	return {
		[b]: !0,
		[x]: !0,
		get current() {
			return a(t);
		},
		set current(e) {
			d(t, e, !0);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_2a4e1861e47804f40f85190c326d64d1/node_modules/runed/dist/internal/configurable-globals.js
var D = typeof window < "u" ? window : void 0;
typeof window < "u" && window.document, typeof window < "u" && window.navigator, typeof window < "u" && window.location;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_2a4e1861e47804f40f85190c326d64d1/node_modules/runed/dist/internal/utils/dom.js
function ne(e) {
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
		t !== void 0 && (this.#e = n, this.#t = o((e) => {
			let n = p(t, "focusin", e), r = p(t, "focusout", e);
			return () => {
				n(), r();
			};
		}));
	}
	get current() {
		return this.#t?.(), this.#e ? ne(this.#e) : null;
	}
}();
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_2a4e1861e47804f40f85190c326d64d1/node_modules/runed/dist/internal/utils/is.js
function O(e) {
	return typeof e == "function";
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_2a4e1861e47804f40f85190c326d64d1/node_modules/runed/dist/utilities/extract/extract.svelte.js
function k(e, t) {
	if (O(e)) {
		let n = e();
		return n === void 0 ? t : n;
	}
	return e === void 0 ? t : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_2a4e1861e47804f40f85190c326d64d1/node_modules/runed/dist/utilities/context/context.js
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
		return e(this.#t);
	}
	get() {
		let e = h(this.#t);
		if (e === void 0) throw Error(`Context "${this.#e}" not found`);
		return e;
	}
	getOr(e) {
		let t = h(this.#t);
		return t === void 0 ? e : t;
	}
	set(e) {
		return s(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_2a4e1861e47804f40f85190c326d64d1/node_modules/runed/dist/utilities/use-debounce/use-debounce.svelte.js
function j(e, t) {
	let n = l(null), r = f(() => k(t, 250));
	function i(...t) {
		if (a(n)) a(n).timeout && clearTimeout(a(n).timeout);
		else {
			let e, t;
			d(n, {
				timeout: null,
				runner: null,
				promise: new Promise((n, r) => {
					e = n, t = r;
				}),
				resolve: e,
				reject: t
			}, !0);
		}
		return a(n).runner = async () => {
			if (!a(n)) return;
			let r = a(n);
			d(n, null);
			try {
				r.resolve(await e.apply(this, t));
			} catch (e) {
				r.reject(e);
			}
		}, a(n).timeout = setTimeout(a(n).runner, a(r)), a(n).promise;
	}
	return i.cancel = async () => {
		(!a(n) || a(n).timeout === null) && (await new Promise((e) => setTimeout(e, 0)), !a(n) || a(n).timeout === null) || (clearTimeout(a(n).timeout), a(n).reject("Cancelled"), d(n, null));
	}, i.runScheduledNow = async () => {
		(!a(n) || !a(n).timeout) && (await new Promise((e) => setTimeout(e, 0)), !a(n) || !a(n).timeout) || (clearTimeout(a(n).timeout), a(n).timeout = null, await a(n).runner?.());
	}, Object.defineProperty(i, "pending", {
		enumerable: !0,
		get() {
			return !!a(n)?.timeout;
		}
	}), i;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_2a4e1861e47804f40f85190c326d64d1/node_modules/runed/dist/utilities/watch/watch.svelte.js
function re(e, r) {
	switch (e) {
		case "post":
			t(r);
			break;
		case "pre":
			n(r);
			break;
	}
}
function M(e, t, n, r = {}) {
	let { lazy: a = !1 } = r, o = !a, s = Array.isArray(e) ? [] : void 0;
	re(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!o) {
			o = !0, s = t;
			return;
		}
		let r = i(() => n(t, s));
		return s = t, r;
	});
}
function N(e, n, r) {
	let i = m(() => {
		let t = !1;
		M(e, n, (e, n) => {
			if (t) {
				i();
				return;
			}
			let a = r(e, n);
			return t = !0, a;
		}, { lazy: !0 });
	});
	t(() => i);
}
function P(e, t, n) {
	M(e, "post", t, n);
}
function ie(e, t, n) {
	M(e, "pre", t, n);
}
P.pre = ie;
function ae(e, t) {
	N(e, "post", t);
}
function F(e, t) {
	N(e, "pre", t);
}
ae.pre = F;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_2a4e1861e47804f40f85190c326d64d1/node_modules/runed/dist/internal/utils/get.js
function I(e) {
	return O(e) ? e() : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_2a4e1861e47804f40f85190c326d64d1/node_modules/runed/dist/utilities/element-size/element-size.svelte.js
var L = class {
	#e = {
		width: 0,
		height: 0
	};
	#t = !1;
	#n;
	#r;
	#i;
	#a = f(() => (a(this.#s)?.(), this.getSize().width));
	#o = f(() => (a(this.#s)?.(), this.getSize().height));
	#s = f(() => {
		let e = I(this.#r);
		if (e) return o((t) => {
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
		return a(this.#s)?.(), this.getSize();
	}
	get width() {
		return a(this.#a);
	}
	get height() {
		return a(this.#o);
	}
}, R = class {
	#e = l(!1);
	constructor() {
		t(() => (i(() => d(this.#e, !0)), () => {
			d(this.#e, !1);
		}));
	}
	get current() {
		return a(this.#e);
	}
}, z = class {
	#e = () => void 0;
	#t = f(() => this.#e());
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
		return a(this.#t);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@_2a4e1861e47804f40f85190c326d64d1/node_modules/runed/dist/utilities/resource/resource.svelte.js
function B(e, t) {
	let n, r = null;
	return (...i) => new Promise((a) => {
		r && r(void 0), r = a, clearTimeout(n), n = setTimeout(async () => {
			let t = await e(...i);
			r &&= (r(t), null);
		}, t);
	});
}
function V(e, t) {
	let n = 0, r = null;
	return (...i) => {
		let a = Date.now();
		return n && a - n < t ? r ?? Promise.resolve(void 0) : (n = a, r = e(...i), r);
	};
}
function H(e, t, n = {}, r) {
	let { lazy: i = !1, once: o = !1, initialValue: s, debounce: c, throttle: f } = n, p = l(u(s)), m = l(!1), h = l(void 0), g = l(u([])), _ = () => {
		a(g).forEach((e) => e()), d(g, [], !0);
	}, v = (e) => {
		d(g, [...a(g), e], !0);
	}, y = async (e, n, r = !1) => {
		try {
			d(m, !0), d(h, void 0), _();
			let i = new AbortController();
			v(() => i.abort());
			let o = await t(e, n, {
				data: a(p),
				refetching: r,
				onCleanup: v,
				signal: i.signal
			});
			return d(p, o, !0), o;
		} catch (e) {
			e instanceof DOMException && e.name === "AbortError" || d(h, e, !0);
			return;
		} finally {
			d(m, !1);
		}
	}, b = c ? B(y, c) : f ? V(y, f) : y, x = Array.isArray(e) ? e : [e], S;
	return r((t, n) => {
		o && S || (S = t, b(Array.isArray(e) ? t : t[0], Array.isArray(e) ? n : n?.[0]));
	}, { lazy: i }), {
		get current() {
			return a(p);
		},
		get loading() {
			return a(m);
		},
		get error() {
			return a(h);
		},
		mutate: (e) => {
			d(p, e, !0);
		},
		refetch: (t) => {
			let n = x.map((e) => e());
			return b(Array.isArray(e) ? n : n[0], Array.isArray(e) ? n : n[0], t ?? !0);
		}
	};
}
function U(e, t, n) {
	return H(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		P(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
function W(e, t, n) {
	return H(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		P.pre(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
U.pre = W;
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/utils/on-destroy-effect.svelte.js
function G(e) {
	t(() => () => {
		e();
	});
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/utils/after-tick.js
function K(e) {
	r().then(e);
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/utils/dom.js
var q = 1, J = 9, oe = 11;
function Y(e) {
	return _(e) && e.nodeType === q && typeof e.nodeName == "string";
}
function X(e) {
	return _(e) && e.nodeType === J;
}
function se(e) {
	return _(e) && e.constructor?.name === "VisualViewport";
}
function ce(e) {
	return _(e) && e.nodeType !== void 0;
}
function Z(e) {
	return ce(e) && e.nodeType === oe && "host" in e;
}
function le(e, t) {
	if (!e || !t || !Y(e) || !Y(t)) return !1;
	let n = t.getRootNode?.();
	if (e === t || e.contains(t)) return !0;
	if (n && Z(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function ue(e) {
	return X(e) ? e : se(e) ? e.document : e?.ownerDocument ?? document;
}
function Q(e) {
	return Z(e) ? Q(e.host) : X(e) ? e.defaultView ?? window : Y(e) ? e.ownerDocument?.defaultView ?? window : window;
}
function de(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot;) {
		let e = t.shadowRoot.activeElement;
		if (e === t) break;
		t = e;
	}
	return t;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/utils/attach-ref.js
function fe(e, t) {
	return { [c()]: (n) => C(e) ? (e.current = n, i(() => t?.(n)), () => {
		"isConnected" in n && n.isConnected || (e.current = null, t?.(null));
	}) : (e(n), i(() => t?.(n)), () => {
		"isConnected" in n && n.isConnected || (e(null), t?.(null));
	}) };
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/attrs.js
function pe(e) {
	return e ? "true" : "false";
}
function me(e) {
	return e ? "true" : void 0;
}
function he(e) {
	return e ? "" : void 0;
}
function ge(e) {
	return e ? !0 : void 0;
}
function $(e) {
	return e ? "open" : "closed";
}
function _e(e) {
	return e ? "checked" : "unchecked";
}
function ve(e) {
	return e === "starting" ? { "data-starting-style": "" } : e === "ending" ? { "data-ending-style": "" } : {};
}
function ye(e, t) {
	return t ? "mixed" : e ? "true" : "false";
}
var be = class {
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
function xe(e) {
	let t = new be(e);
	return {
		...t.attrs,
		selector: t.selector,
		getAttr: t.getAttr
	};
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/animations-complete.js
var Se = class {
	#e;
	#t = null;
	#n = null;
	#r = 0;
	constructor(e) {
		this.#e = e, G(() => this.#i());
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
		this.#e.afterTick ? K(t) : t();
	}
};
//#endregion
export { x as A, A as C, S as D, ee as E, T as M, y as N, C as O, j as S, te as T, G as _, ge as a, L as b, _e as c, fe as d, le as f, K as g, Q as h, me as i, E as j, w as k, $ as l, ue as m, he as n, xe as o, de as p, pe as r, ye as s, Se as t, ve as u, z as v, b as w, P as x, R as y };
