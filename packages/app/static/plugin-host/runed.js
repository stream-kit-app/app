import { Br as e, Gn as t, Kn as n, Mn as r, Nn as i, On as a, Sr as o, Ur as s, Xt as c, cr as l, lr as u, nr as d, or as f, pr as p, xn as m, zn as h, zr as g } from "./chunks/client-xxWnFgeR.js";
import "./chunks/index-client-DLfVeyOI.js";
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/internal/configurable-globals.js
var _ = typeof window < "u" ? window : void 0, v = typeof window < "u" ? window.document : void 0, y = typeof window < "u" ? window.navigator : void 0;
typeof window < "u" && window.location;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/internal/utils/dom.js
function b(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot;) {
		let e = t.shadowRoot.activeElement;
		if (e === t) break;
		t = e;
	}
	return t;
}
function x(e, t = v) {
	return e?.ownerDocument ?? t;
}
function S(e, t) {
	return e === t || e.contains(t);
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/active-element/active-element.svelte.js
var C = class {
	#e;
	#t;
	constructor(e = {}) {
		let { window: t = _, document: n = t?.document } = e;
		t !== void 0 && (this.#e = n, this.#t = o((e) => {
			let n = m(t, "focusin", e), r = m(t, "focusout", e);
			return () => {
				n(), r();
			};
		}));
	}
	get current() {
		return this.#t?.(), this.#e ? b(this.#e) : null;
	}
}, w = new C();
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/internal/utils/is.js
function T(e) {
	return typeof e == "function";
}
function E(e) {
	return e instanceof Element;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/extract/extract.svelte.js
function D(e, t) {
	if (T(e)) {
		let n = e();
		return n === void 0 ? t : n;
	}
	return e === void 0 ? t : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/animation-frames/animation-frames.svelte.js
var O = class {
	#e;
	#t = 0;
	#n = p(() => D(this.#t) ?? 0);
	#r = null;
	#i = null;
	#a = l(0);
	#o = l(!1);
	#s = _;
	constructor(e, n = {}) {
		n.window && (this.#s = n.window), this.#t = n.fpsLimit, this.#e = e, this.start = this.start.bind(this), this.stop = this.stop.bind(this), this.toggle = this.toggle.bind(this), t(() => ((n.immediate ?? !0) && i(this.start), this.stop));
	}
	#c(e) {
		if (!a(this.#o) || !this.#s) return;
		this.#r === null && (this.#r = e);
		let t = e - this.#r, n = 1e3 / t;
		if (a(this.#n) && n > a(this.#n)) {
			this.#i = this.#s.requestAnimationFrame(this.#c.bind(this));
			return;
		}
		f(this.#a, n), this.#r = e, this.#e({
			delta: t,
			timestamp: e
		}), this.#i = this.#s.requestAnimationFrame(this.#c.bind(this));
	}
	start() {
		this.#s && (f(this.#o, !0), this.#r = 0, this.#i = this.#s.requestAnimationFrame(this.#c.bind(this)));
	}
	stop() {
		!this.#i || !this.#s || (f(this.#o, !1), this.#s.cancelAnimationFrame(this.#i), this.#i = null);
	}
	toggle() {
		a(this.#o) ? this.stop() : this.start();
	}
	get fps() {
		return a(this.#o) ? a(this.#a) : 0;
	}
	get running() {
		return a(this.#o);
	}
}, ee = class {
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
		let e = g(this.#t);
		if (e === void 0) throw Error(`Context "${this.#e}" not found`);
		return e;
	}
	getOr(e) {
		let t = g(this.#t);
		return t === void 0 ? e : t;
	}
	set(e) {
		return s(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/use-debounce/use-debounce.svelte.js
function k(e, t) {
	let n = l(null), r = p(() => D(t, 250));
	function i(...t) {
		if (a(n)) a(n).timeout && clearTimeout(a(n).timeout);
		else {
			let e, t;
			f(n, {
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
			f(n, null);
			try {
				r.resolve(await e.apply(this, t));
			} catch (e) {
				r.reject(e);
			}
		}, a(n).timeout = setTimeout(a(n).runner, a(r)), a(n).promise;
	}
	return i.cancel = async () => {
		(!a(n) || a(n).timeout === null) && (await new Promise((e) => setTimeout(e, 0)), !a(n) || a(n).timeout === null) || (clearTimeout(a(n).timeout), a(n).reject("Cancelled"), f(n, null));
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
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/watch/watch.svelte.js
function te(e, r) {
	switch (e) {
		case "post":
			t(r);
			break;
		case "pre":
			n(r);
			break;
	}
}
function A(e, t, n, r = {}) {
	let { lazy: a = !1 } = r, o = !a, s = Array.isArray(e) ? [] : void 0;
	te(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!o) {
			o = !0, s = t;
			return;
		}
		let r = i(() => n(t, s));
		return s = t, r;
	});
}
function j(e, n, r) {
	let i = h(() => {
		let t = !1;
		A(e, n, (e, n) => {
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
function M(e, t, n) {
	A(e, "post", t, n);
}
function N(e, t, n) {
	A(e, "pre", t, n);
}
M.pre = N;
function P(e, t) {
	j(e, "post", t);
}
function ne(e, t) {
	j(e, "pre", t);
}
P.pre = ne;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/internal/utils/function.js
function F() {}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/debounced/debounced.svelte.js
var re = class {
	#e = l();
	#t;
	constructor(e, t = 250) {
		f(this.#e, e(), !0), this.cancel = this.cancel.bind(this), this.setImmediately = this.setImmediately.bind(this), this.updateImmediately = this.updateImmediately.bind(this), this.#t = k(() => {
			f(this.#e, e(), !0);
		}, t), M(e, () => {
			this.#t().catch(F);
		});
	}
	get current() {
		return a(this.#e);
	}
	get pending() {
		return this.#t.pending;
	}
	cancel() {
		this.#t.cancel();
	}
	updateImmediately() {
		return this.#t.runScheduledNow();
	}
	setImmediately(e) {
		this.cancel(), f(this.#e, e, !0);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/use-mutation-observer/use-mutation-observer.svelte.js
function I(e, n, r = {}) {
	let { window: i = _ } = r, o, s = p(() => {
		let t = D(e);
		return new Set(t ? Array.isArray(t) ? t : [t] : []);
	}), c = h(() => {
		t(() => {
			if (!(!a(s).size || !i)) {
				o = new i.MutationObserver(n);
				for (let e of a(s)) o.observe(e, r);
				return () => {
					o?.disconnect(), o = void 0;
				};
			}
		});
	});
	return t(() => c), {
		stop: c,
		takeRecords() {
			return o?.takeRecords();
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/use-resize-observer/use-resize-observer.svelte.js
function L(e, n, r = {}) {
	let { window: i = _ } = r, o, s = p(() => {
		let t = D(e);
		return new Set(t ? Array.isArray(t) ? t : [t] : []);
	}), c = h(() => {
		t(() => {
			if (!(!a(s).size || !i)) {
				o = new i.ResizeObserver(n);
				for (let e of a(s)) o.observe(e, r);
				return () => {
					o?.disconnect(), o = void 0;
				};
			}
		});
	});
	return t(() => c), { stop: c };
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/element-rect/element-rect.svelte.js
var ie = class {
	#e = l(d({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}));
	constructor(e, n = {}) {
		f(this.#e, {
			width: n.initialRect?.width ?? 0,
			height: n.initialRect?.height ?? 0,
			x: n.initialRect?.x ?? 0,
			y: n.initialRect?.y ?? 0,
			top: n.initialRect?.top ?? 0,
			right: n.initialRect?.right ?? 0,
			bottom: n.initialRect?.bottom ?? 0,
			left: n.initialRect?.left ?? 0
		}, !0);
		let r = p(() => D(e)), i = () => {
			if (!a(r)) return;
			let e = a(r).getBoundingClientRect();
			a(this.#e).width = e.width, a(this.#e).height = e.height, a(this.#e).x = e.x, a(this.#e).y = e.y, a(this.#e).top = e.top, a(this.#e).right = e.right, a(this.#e).bottom = e.bottom, a(this.#e).left = e.left;
		};
		L(() => a(r), i, { window: n.window }), t(i), I(() => a(r), i, {
			attributeFilter: ["style", "class"],
			window: n.window
		});
	}
	get x() {
		return a(this.#e).x;
	}
	get y() {
		return a(this.#e).y;
	}
	get width() {
		return a(this.#e).width;
	}
	get height() {
		return a(this.#e).height;
	}
	get top() {
		return a(this.#e).top;
	}
	get right() {
		return a(this.#e).right;
	}
	get bottom() {
		return a(this.#e).bottom;
	}
	get left() {
		return a(this.#e).left;
	}
	get current() {
		return a(this.#e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/internal/utils/get.js
function R(e) {
	return T(e) ? e() : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/element-size/element-size.svelte.js
var ae = class {
	#e = {
		width: 0,
		height: 0
	};
	#t = !1;
	#n;
	#r;
	#i;
	#a = p(() => (a(this.#s)?.(), this.getSize().width));
	#o = p(() => (a(this.#s)?.(), this.getSize().height));
	#s = p(() => {
		let e = R(this.#r);
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
		this.#i = t.window ?? _, this.#n = t, this.#r = e, this.#e = {
			width: 0,
			height: 0
		};
	}
	calculateSize() {
		let e = R(this.#r);
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
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/finite-state-machine/finite-state-machine.svelte.js
function z(e) {
	return !!e && typeof e == "object" && "to" in e && "from" in e && "event" in e && "args" in e;
}
var oe = class {
	#e = l();
	states;
	#t = {};
	constructor(e, t) {
		f(this.#e, e, !0), this.states = t, this.send = this.send.bind(this), this.debounce = this.debounce.bind(this), this.#r("_enter", {
			from: null,
			to: e,
			event: null,
			args: []
		});
	}
	#n(e, t, n) {
		let r = {
			from: a(this.#e),
			to: e,
			event: t,
			args: n
		};
		this.#r("_exit", r), f(this.#e, e, !0), this.#r("_enter", r);
	}
	#r(e, ...t) {
		let n = this.states[a(this.#e)]?.[e] ?? this.states["*"]?.[e];
		if (n instanceof Function) if (e === "_enter" || e === "_exit") z(t[0]) ? n(t[0]) : console.warn("Invalid metadata passed to lifecycle function of the FSM.");
		else return n(...t);
		else if (typeof n == "string") return n;
		else e !== "_enter" && e !== "_exit" && console.warn("No action defined for event", e, "in state", a(this.#e));
	}
	send(e, ...t) {
		let n = this.#r(e, ...t);
		return n && n !== a(this.#e) && this.#n(n, e, t), a(this.#e);
	}
	async debounce(e = 500, t, ...n) {
		return this.#t[t] && clearTimeout(this.#t[t]), new Promise((r) => {
			this.#t[t] = setTimeout(() => {
				delete this.#t[t], r(this.send(t, ...n));
			}, e);
		});
	}
	get current() {
		return a(this.#e);
	}
}, se = class {
	#e;
	#t;
	constructor(e, t = {}) {
		this.#e = e, this.#t = new C(t);
	}
	#n = p(() => {
		let e = D(this.#e);
		return e == null ? !1 : e.contains(this.#t.current);
	});
	get current() {
		return a(this.#n);
	}
	set current(e) {
		f(this.#n, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/use-event-listener/use-event-listener.svelte.js
function B(e, n, r, i) {
	t(() => {
		let a = D(e);
		if (a == null) return;
		let o = D(n);
		if (Array.isArray(o)) for (let e of o) t(() => m(a, e, r, i));
		else return m(a, o, r, i);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/is-idle/is-idle.svelte.js
var ce = {
	events: [
		"keypress",
		"mousemove",
		"touchmove",
		"click",
		"scroll"
	],
	initialState: !1,
	timeout: 6e4,
	trackLastActive: !0
}, V = class {
	#e = l(!1);
	#t = l(d(Date.now()));
	constructor(e) {
		let n = {
			...ce,
			...e
		}, r = n.window ?? _, i = n.document ?? r?.document, o = p(() => D(n.timeout)), s = p(() => D(n.events)), c = p(() => D(n.detectVisibilityChanges)), l = p(() => D(n.trackLastActive));
		f(this.#e, n.initialState, !0);
		let u = k(() => {
			f(this.#e, !0);
		}, () => a(o));
		u();
		let d = () => {
			f(this.#e, !1), a(l) && f(this.#t, Date.now(), !0), u();
		};
		B(() => r, () => a(s), () => {
			d();
		}, { passive: !0 }), t(() => {
			!a(c) || !i || B(i, ["visibilitychange"], () => {
				i.hidden || d();
			});
		});
	}
	get lastActive() {
		return a(this.#t);
	}
	get current() {
		return a(this.#e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/use-intersection-observer/use-intersection-observer.svelte.js
function H(e, n, r = {}) {
	let { root: i, rootMargin: o = "0px", threshold: s = .1, immediate: c = !0, window: u = _, once: m = !1 } = r, g = l(d(c)), v, y = p(() => {
		let t = D(e);
		return new Set(t ? Array.isArray(t) ? t : [t] : []);
	}), b = h(() => {
		t(() => {
			if (!(!a(y).size || !a(g) || !u)) {
				v = new u.IntersectionObserver((e, t) => {
					e.forEach((e) => {
						let r = Array.isArray(s) ? s.some((t) => e.intersectionRatio >= t) : e.intersectionRatio >= s, i = e.isIntersecting && r;
						if (n([e], t), m && i) return f(g, !1), () => {
							t?.disconnect();
						};
					});
				}, {
					rootMargin: o,
					root: R(i),
					threshold: s
				});
				for (let e of a(y)) v.observe(e);
				return () => {
					v?.disconnect();
				};
			}
		});
	});
	return t(() => b), {
		get isActive() {
			return a(g);
		},
		stop: b,
		pause() {
			f(g, !1);
		},
		resume() {
			f(g, !0);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/is-in-viewport/is-in-viewport.svelte.js
var U = class {
	#e = l(!1);
	#t;
	constructor(e, t) {
		this.#t = H(e, (e) => {
			let t = a(this.#e), n = 0;
			for (let r of e) r.time >= n && (n = r.time, t = r.isIntersecting);
			f(this.#e, t, !0);
		}, t);
	}
	get current() {
		return a(this.#e);
	}
	get observer() {
		return this.#t;
	}
}, W = class {
	#e = l(!1);
	constructor() {
		t(() => (i(() => f(this.#e, !0)), () => {
			f(this.#e, !1);
		}));
	}
	get current() {
		return a(this.#e);
	}
}, le = class {
	#e = l(!1);
	constructor(e = {}) {
		let n = e.window ?? _, r = e.document ?? n?.document;
		f(this.#e, r ? !r.hidden : !1, !0), t(() => {
			if (r) return m(r, "visibilitychange", () => {
				f(this.#e, !r.hidden);
			});
		});
	}
	get current() {
		return a(this.#e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/internal/utils/sleep.js
async function ue(e = 0) {
	return new Promise((t) => setTimeout(t, e));
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/on-click-outside/on-click-outside.svelte.js
function de(e, n, r = {}) {
	let { window: i = _, immediate: o = !0, detectIframe: s = !1 } = r, c = r.document ?? i?.document, u = p(() => D(e)), h = p(() => x(a(u), c)), g = l(d(o)), v = !1, y = F, C = F, w = k((e) => {
		if (!a(u) || !a(h)) {
			y();
			return;
		}
		if (v === !0 || !G(e, a(u), a(h))) {
			y();
			return;
		}
		e.pointerType === "touch" ? (y(), y = m(a(h), "click", () => n(e), { once: !0 })) : n(e);
	}, 10);
	function T() {
		if (!a(h) || !i || !a(u)) return F;
		let e = [m(a(h), "pointerdown", (e) => {
			G(e, a(u), a(h)) && (v = !0);
		}, { capture: !0 }), m(a(h), "pointerdown", (e) => {
			v = !1, w(e);
		})];
		return s && e.push(m(i, "blur", async (e) => {
			await ue();
			let t = b(a(h));
			t?.tagName === "IFRAME" && !S(a(u), t) && n(e);
		})), () => {
			for (let t of e) t();
		};
	}
	function E() {
		v = !1, w.cancel(), y(), C();
	}
	return M([() => a(g), () => a(u)], ([e, t]) => {
		e && t ? (C(), C = T()) : E();
	}), t(() => () => {
		E();
	}), {
		stop: () => f(g, !1),
		start: () => f(g, !0),
		get enabled() {
			return a(g);
		}
	};
}
function G(e, t, n) {
	if ("button" in e && e.button > 0) return !1;
	let r = e.target;
	if (!E(r)) return !1;
	let i = x(r, n);
	if (!i) return !1;
	if (r === t) {
		let n = t.getBoundingClientRect();
		return !(n.top <= e.clientY && e.clientY <= n.top + n.height && n.left <= e.clientX && e.clientX <= n.left + n.width);
	}
	return i.documentElement.contains(r) && !S(t, r);
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/persisted-state/persisted-state.svelte.js
function fe(e, t) {
	switch (e) {
		case "local": return t.localStorage;
		case "session": return t.sessionStorage;
	}
}
function K(e, t, n, r, i, a) {
	if (typeof e != "object" || !e) return e;
	let o = Object.getPrototypeOf(e);
	if (o !== null && o !== Object.prototype && !Array.isArray(e)) return e;
	let s = n.get(e);
	return s || (s = new Proxy(e, {
		get: (e, o) => (r?.(), K(Reflect.get(e, o), t, n, r, i, a)),
		set: (e, n, r) => (i?.(), Reflect.set(e, n, r), a(t), !0)
	}), n.set(e, s)), s;
}
var pe = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o = /* @__PURE__ */ new WeakMap();
	#s;
	#c;
	#l;
	#u;
	#d;
	constructor(e, t, n = {}) {
		let { storage: r = "local", serializer: i = {
			serialize: JSON.stringify,
			deserialize: JSON.parse
		}, syncTabs: a = !0, connected: o = !0 } = n, s = "window" in n ? n.window : _;
		if (this.#e = t, this.#t = e, this.#n = i, this.#s = o, this.#l = s, this.#u = a, this.#d = r, s === void 0) return;
		let c = fe(r, s);
		this.#r = c;
		let l = c.getItem(e);
		l === null ? o && this.#m(t) : this.#e = this.#p(l), this.#h();
	}
	get current() {
		this.#i?.();
		let e;
		if (this.#s) {
			let t = this.#r?.getItem(this.#t);
			e = t ? this.#p(t) : this.#e;
		} else e = this.#e;
		return K(e, e, this.#o, this.#i?.bind(this), this.#a?.bind(this), this.#m.bind(this));
	}
	set current(e) {
		this.#m(e), this.#a?.();
	}
	#f = (e) => {
		e.key !== this.#t || e.newValue === null || (this.#e = this.#p(e.newValue), this.#a?.());
	};
	#p(e) {
		try {
			return this.#n.deserialize(e);
		} catch (t) {
			console.error(`Error when parsing "${e}" from persisted store "${this.#t}"`, t);
			return;
		}
	}
	#m(e) {
		if (!this.#s) {
			this.#e = e;
			return;
		}
		try {
			e !== void 0 && this.#r?.setItem(this.#t, this.#n.serialize(e));
		} catch (e) {
			console.error(`Error when writing value from persisted store "${this.#t}" to ${this.#r}`, e);
		}
	}
	#h() {
		!this.#l || !this.#s || (this.#i = o((e) => (this.#a = e, this.#c = this.#s && this.#u && this.#d === "local" ? m(this.#l, "storage", this.#f) : void 0, () => {
			this.#c?.(), this.#c = void 0, this.#a = void 0;
		})));
	}
	#g() {
		this.#c?.(), this.#c = void 0, this.#i = void 0;
	}
	get connected() {
		return this.#s;
	}
	disconnect() {
		if (!this.#s) return;
		let e = this.#r?.getItem(this.#t);
		e && (this.#e = this.#p(e)), this.#s = !1, this.#r?.removeItem(this.#t), this.#g();
	}
	connect() {
		this.#s || (this.#s = !0, this.#m(this.#e), this.#h());
	}
}, q = [
	"meta",
	"control",
	"alt",
	"shift"
], me = class {
	#e = l(d([]));
	#t;
	constructor(e = {}) {
		let { window: t = _ } = e;
		this.has = this.has.bind(this), t && (this.#t = o((e) => {
			let n = m(t, "keydown", (t) => {
				let n = t.key.toLowerCase();
				a(this.#e).includes(n) || a(this.#e).push(n), e();
			}), r = m(t, "keyup", (t) => {
				let n = t.key.toLowerCase();
				q.includes(n) && f(this.#e, a(this.#e).filter((e) => q.includes(e)), !0), f(this.#e, a(this.#e).filter((e) => e !== n), !0), e();
			}), i = m(t, "blur", () => {
				f(this.#e, [], !0), e();
			}), o = m(document, "visibilitychange", () => {
				document.visibilityState === "hidden" && (f(this.#e, [], !0), e());
			});
			return () => {
				n(), r(), i(), o();
			};
		}));
	}
	has(...e) {
		return this.#t?.(), e.map((e) => e.toLowerCase()).every((e) => a(this.#e).includes(e));
	}
	get all() {
		return this.#t?.(), a(this.#e);
	}
	onKeys(e, t) {
		this.#t?.();
		let n = Array.isArray(e) ? e : [e];
		M(() => this.all, () => {
			this.has(...n) && t();
		});
	}
}, he = class {
	#e = () => void 0;
	#t = p(() => this.#e());
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
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/resource/resource.svelte.js
function ge(e, t) {
	let n, r = null;
	return (...i) => new Promise((a) => {
		r && r(void 0), r = a, clearTimeout(n), n = setTimeout(async () => {
			let t = await e(...i);
			r &&= (r(t), null);
		}, t);
	});
}
function _e(e, t) {
	let n = 0, r = null;
	return (...i) => {
		let a = Date.now();
		return n && a - n < t ? r ?? Promise.resolve(void 0) : (n = a, r = e(...i), r);
	};
}
function J(e, t, n = {}, r) {
	let { lazy: i = !1, once: o = !1, initialValue: s, debounce: c, throttle: u } = n, p = l(d(s)), m = l(d(s === void 0 && !i)), h = l(void 0), g = l(d([])), _ = () => {
		a(g).forEach((e) => e()), f(g, [], !0);
	}, v = (e) => {
		f(g, [...a(g), e], !0);
	}, y = async (e, n, r = !1) => {
		try {
			f(m, !0), f(h, void 0), _();
			let i = new AbortController();
			v(() => i.abort());
			let o = await t(e, n, {
				data: a(p),
				refetching: r,
				onCleanup: v,
				signal: i.signal
			});
			return f(p, o, !0), o;
		} catch (e) {
			e instanceof DOMException && e.name === "AbortError" || f(h, e, !0);
			return;
		} finally {
			f(m, !1);
		}
	}, b = c ? ge(y, c) : u ? _e(y, u) : y, x = Array.isArray(e) ? e : [e], S;
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
			f(p, e, !0);
		},
		refetch: (t) => {
			let n = x.map((e) => e());
			return b(Array.isArray(e) ? n : n[0], Array.isArray(e) ? n : n[0], t ?? !0);
		}
	};
}
function Y(e, t, n) {
	return J(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		M(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
function X(e, t, n) {
	return J(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		M.pre(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
Y.pre = X;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/scroll-state/scroll-state.svelte.js
var Z = 1, ve = class {
	#e;
	#t = p(() => D(this.#e.element));
	get element() {
		return a(this.#t);
	}
	set element(e) {
		f(this.#t, e);
	}
	#n = p(() => D(this.#e?.idle, 200));
	get idle() {
		return a(this.#n);
	}
	set idle(e) {
		f(this.#n, e);
	}
	#r = p(() => D(this.#e.offset, {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	}));
	get offset() {
		return a(this.#r);
	}
	set offset(e) {
		f(this.#r, e);
	}
	#i = p(() => this.#e.onScroll ?? F);
	get onScroll() {
		return a(this.#i);
	}
	set onScroll(e) {
		f(this.#i, e);
	}
	#a = p(() => this.#e.onStop ?? F);
	get onStop() {
		return a(this.#a);
	}
	set onStop(e) {
		f(this.#a, e);
	}
	#o = p(() => this.#e.eventListenerOptions ?? {
		capture: !1,
		passive: !0
	});
	get eventListenerOptions() {
		return a(this.#o);
	}
	set eventListenerOptions(e) {
		f(this.#o, e);
	}
	#s = p(() => D(this.#e.behavior, "auto"));
	get behavior() {
		return a(this.#s);
	}
	set behavior(e) {
		f(this.#s, e);
	}
	#c = p(() => this.#e.onError ?? ((e) => {
		console.error(e);
	}));
	get onError() {
		return a(this.#c);
	}
	set onError(e) {
		f(this.#c, e);
	}
	#l = l(0);
	get internalX() {
		return a(this.#l);
	}
	set internalX(e) {
		f(this.#l, e, !0);
	}
	#u = l(0);
	get internalY() {
		return a(this.#u);
	}
	set internalY(e) {
		f(this.#u, e, !0);
	}
	#d = p(() => this.internalX);
	get x() {
		return a(this.#d);
	}
	set x(e) {
		this.scrollTo(e, void 0);
	}
	#f = p(() => this.internalY);
	get y() {
		return a(this.#f);
	}
	set y(e) {
		this.scrollTo(void 0, e);
	}
	#p = l(!1);
	get isScrolling() {
		return a(this.#p);
	}
	set isScrolling(e) {
		f(this.#p, e, !0);
	}
	#m = l(d({
		left: !0,
		right: !1,
		top: !0,
		bottom: !1
	}));
	get arrived() {
		return a(this.#m);
	}
	set arrived(e) {
		f(this.#m, e, !0);
	}
	#h = l(d({
		left: !1,
		right: !1,
		top: !1,
		bottom: !1
	}));
	get directions() {
		return a(this.#h);
	}
	set directions(e) {
		f(this.#h, e, !0);
	}
	#g = l(d({
		x: 0,
		y: 0
	}));
	get progress() {
		return a(this.#g);
	}
	set progress(e) {
		f(this.#g, e, !0);
	}
	constructor(e) {
		this.#e = e, B(() => this.element, "scroll", this.#_, this.eventListenerOptions), B(() => this.element, "scrollend", (e) => this.onScrollEnd(e), this.eventListenerOptions), c(() => {
			this.setArrivedState();
		}), new O(() => this.setArrivedState());
	}
	setArrivedState = () => {
		if (!window || !this.element) return;
		let e = this.element?.document?.documentElement || this.element?.documentElement || this.element, { display: t, flexDirection: n, direction: r } = getComputedStyle(e), i = r === "rtl" ? -1 : 1, a = e.scrollLeft;
		a !== this.internalX && (this.directions.left = a < this.internalX, this.directions.right = a > this.internalX);
		let o = a * i <= (this.offset.left || 0), s = a * i + e.clientWidth >= e.scrollWidth - (this.offset.right || 0) - Z;
		t === "flex" && n === "row-reverse" ? (this.arrived.left = s, this.arrived.right = o) : (this.arrived.left = o, this.arrived.right = s), this.internalX = a;
		let c = e.scrollTop;
		this.element === window.document && !c && (c = window.document.body.scrollTop), c !== this.internalY && (this.directions.top = c < this.internalY, this.directions.bottom = c > this.internalY);
		let l = c <= (this.offset.top || 0), u = c + e.clientHeight >= e.scrollHeight - (this.offset.bottom || 0) - Z;
		t === "flex" && n === "column-reverse" ? (this.arrived.top = u, this.arrived.bottom = l) : (this.arrived.top = l, this.arrived.bottom = u);
		let d = e.scrollHeight - (this.offset.bottom || 0);
		this.progress.y = c / (d - e.clientHeight) * 100;
		let f = e.scrollWidth - (this.offset.left || 0);
		this.progress.x = Math.abs(a / (f - e.clientWidth) * 100), this.internalY = c;
	};
	#_ = (e) => {
		window && (this.setArrivedState(), this.isScrolling = !0, this.onScrollEndDebounced(e), this.onScroll(e));
	};
	scrollTo(e, t) {
		if (!window) return;
		(this.element instanceof Document ? window.document.body : this.element)?.scrollTo({
			top: t ?? this.y,
			left: e ?? this.x,
			behavior: this.behavior
		});
		let n = this.element?.document?.documentElement || this.element?.documentElement || this.element;
		e != null && (this.internalX = n.scrollLeft), t != null && (this.internalY = n.scrollTop);
	}
	scrollToTop() {
		this.scrollTo(void 0, 0);
	}
	scrollToBottom() {
		if (!window) return;
		let e = this.element?.document?.documentElement || this.element?.documentElement || this.element;
		e && this.scrollTo(void 0, e.scrollHeight);
	}
	onScrollEnd = (e) => {
		this.isScrolling && (this.isScrolling = !1, this.directions.left = !1, this.directions.right = !1, this.directions.top = !1, this.directions.bottom = !1, this.onStop(e));
	};
	onScrollEndDebounced = k(this.onScrollEnd, () => this.idle);
}, ye = class {
	#e = l(d([]));
	#t = !1;
	#n;
	#r = l(d([]));
	get log() {
		return a(this.#r);
	}
	set log(e) {
		f(this.#r, e, !0);
	}
	#i = p(() => this.log.length > 1);
	get canUndo() {
		return a(this.#i);
	}
	set canUndo(e) {
		f(this.#i, e);
	}
	#a = p(() => a(this.#e).length > 0);
	get canRedo() {
		return a(this.#a);
	}
	set canRedo(e) {
		f(this.#a, e);
	}
	constructor(e, t, n) {
		f(this.#e, [], !0), this.#n = t, this.undo = this.undo.bind(this), this.redo = this.redo.bind(this);
		let r = (e) => {
			this.log.push(e);
			let t = R(n?.capacity);
			t && this.log.length > t && (this.log = this.log.slice(-t));
		};
		M(() => R(e), (e) => {
			if (this.#t) {
				this.#t = !1;
				return;
			}
			r({
				snapshot: e,
				timestamp: (/* @__PURE__ */ new Date()).getTime()
			}), f(this.#e, [], !0);
		}), M(() => R(n?.capacity), (e) => {
			e && (this.log = this.log.slice(-e));
		});
	}
	undo() {
		let [e, t] = this.log.slice(-2);
		!t || !e || (this.#t = !0, a(this.#e).push(t), this.log.pop(), this.#n(e.snapshot));
	}
	redo() {
		let e = a(this.#e).pop();
		e && (this.#t = !0, this.log.push(e), this.#n(e.snapshot));
	}
	clear() {
		this.log = [], f(this.#e, [], !0);
	}
}, be = [
	"box-sizing",
	"width",
	"padding-top",
	"padding-right",
	"padding-bottom",
	"padding-left",
	"border-top-width",
	"border-right-width",
	"border-bottom-width",
	"border-left-width",
	"font-family",
	"font-size",
	"font-weight",
	"font-style",
	"letter-spacing",
	"text-indent",
	"text-transform",
	"line-height",
	"word-spacing",
	"word-wrap",
	"word-break",
	"white-space"
], xe = class {
	#e;
	#t = null;
	#n = null;
	#r = p(() => D(this.#e.element));
	get element() {
		return a(this.#r);
	}
	set element(e) {
		f(this.#r, e);
	}
	#i = p(() => D(this.#e.input));
	get input() {
		return a(this.#i);
	}
	set input(e) {
		f(this.#i, e);
	}
	#a = p(() => D(this.#e.styleProp, "height"));
	get styleProp() {
		return a(this.#a);
	}
	set styleProp(e) {
		f(this.#a, e);
	}
	#o = p(() => D(this.#e.maxHeight, void 0));
	get maxHeight() {
		return a(this.#o);
	}
	set maxHeight(e) {
		f(this.#o, e);
	}
	#s = l(0);
	get textareaHeight() {
		return a(this.#s);
	}
	set textareaHeight(e) {
		f(this.#s, e, !0);
	}
	#c = l(0);
	get textareaOldWidth() {
		return a(this.#c);
	}
	set textareaOldWidth(e) {
		f(this.#c, e, !0);
	}
	constructor(e) {
		this.#e = e, this.#l(), M([() => this.input, () => this.element], () => {
			r().then(() => this.triggerResize());
		}), M(() => this.textareaHeight, () => e?.onResize?.()), L(() => this.element, ([e]) => {
			if (!e) return;
			let { contentRect: t } = e;
			this.textareaOldWidth !== t.width && (this.textareaOldWidth = t.width, this.triggerResize());
		}), t(() => () => {
			this.#n &&= (this.#n.remove(), null), this.#t &&= (window.cancelAnimationFrame(this.#t), null);
		});
	}
	#l() {
		if (typeof window > "u") return;
		this.#n = document.createElement("textarea");
		let e = this.#n.style;
		e.visibility = "hidden", e.position = "absolute", e.overflow = "hidden", e.height = "0", e.top = "0", e.left = "-9999px", document.body.appendChild(this.#n);
	}
	#u() {
		if (!this.element || !this.#n) return;
		let e = window.getComputedStyle(this.element);
		for (let t of be) this.#n.style.setProperty(t, e.getPropertyValue(t));
		this.#n.style.width = `${this.element.clientWidth}px`;
	}
	triggerResize = () => {
		if (!this.element || !this.#n) return;
		this.#u(), this.#n.value = this.input || "";
		let e = this.#n.scrollHeight;
		this.maxHeight && e > this.maxHeight ? (e = this.maxHeight, this.element.style.overflowY = "auto") : this.element.style.overflowY = "hidden", this.textareaHeight !== e && (this.textareaHeight = e, this.element.style[this.styleProp] = `${e}px`);
	};
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/use-throttle/use-throttle.svelte.js
function Q(e, t = 250) {
	let n = 0, r = l(void 0), o = null, s = null, c = null;
	function u() {
		f(r, void 0), c = null, o = null, s = null;
	}
	function d(...l) {
		return i(() => {
			let i = Date.now(), d = typeof t == "function" ? t() : t, p = n + d;
			if (c ||= new Promise((e, t) => {
				o = e, s = t;
			}), i < p) return a(r) || f(r, setTimeout(async () => {
				try {
					let t = await e.apply(this, l);
					o?.(t);
				} catch (e) {
					s?.(e);
				} finally {
					clearTimeout(a(r)), u(), n = Date.now();
				}
			}, p - i), !0), c;
			a(r) && (clearTimeout(a(r)), f(r, void 0)), n = i;
			try {
				let t = e.apply(this, l);
				o?.(t);
			} catch (e) {
				s?.(e);
			} finally {
				u();
			}
			return c;
		});
	}
	return d.cancel = async () => {
		if (a(r)) {
			if (a(r) === void 0 && (await new Promise((e) => setTimeout(e, 0)), a(r) === void 0)) return;
			clearTimeout(a(r)), s?.("Cancelled"), u();
		}
	}, Object.defineProperty(d, "pending", {
		enumerable: !0,
		get() {
			return !!a(r);
		}
	}), d;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/throttled/throttled.svelte.js
var Se = class {
	#e = l();
	#t;
	constructor(e, t = 250) {
		f(this.#e, e(), !0), this.#t = Q(() => {
			f(this.#e, e(), !0);
		}, t), M(e, () => {
			this.#t()?.catch(F);
		});
	}
	get current() {
		return a(this.#e);
	}
	cancel() {
		this.#t.cancel();
	}
	setImmediately(e) {
		this.cancel(), f(this.#e, e, !0);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/use-geolocation/use-geolocation.svelte.js
function Ce(e = {}) {
	let { enableHighAccuracy: n = !0, maximumAge: r = 3e4, timeout: i = 27e3, immediate: o = !0, navigator: s = y } = e, c = !!s, u = l(null), p = d({
		timestamp: 0,
		coords: {
			accuracy: 0,
			latitude: Infinity,
			longitude: Infinity,
			altitude: null,
			altitudeAccuracy: null,
			heading: null,
			speed: null
		}
	}), m = l(!1);
	function h(e) {
		f(u, null), p.timestamp = e.timestamp, p.coords.accuracy = e.coords.accuracy, p.coords.altitude = e.coords.altitude, p.coords.altitudeAccuracy = e.coords.altitudeAccuracy, p.coords.heading = e.coords.heading, p.coords.latitude = e.coords.latitude, p.coords.longitude = e.coords.longitude, p.coords.speed = e.coords.speed;
	}
	let g;
	function _() {
		s && (g = s.geolocation.watchPosition(h, (e) => f(u, e), {
			enableHighAccuracy: n,
			maximumAge: r,
			timeout: i
		}), f(m, !1));
	}
	function v() {
		g && s && s.geolocation.clearWatch(g), f(m, !0);
	}
	return t(() => (o && _(), () => v())), {
		get isSupported() {
			return c;
		},
		position: p,
		get error() {
			return a(u);
		},
		get isPaused() {
			return a(m);
		},
		resume: _,
		pause: v
	};
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/use-interval/use-interval.svelte.js
function $(e, n = {}) {
	let { immediate: r = !0, immediateCallback: i = !1, callback: o } = n, s = l(null), c = l(0), d = p(() => D(e)), m = p(() => a(s) !== null);
	function h() {
		u(c), o?.(a(c));
	}
	function g() {
		f(s, setInterval(h, a(d)), !0);
	}
	let _ = () => {
		a(s) !== null && (clearInterval(a(s)), f(s, null));
	}, v = () => {
		a(s) === null && (i && h(), g());
	};
	return r && v(), M(() => a(d), () => {
		a(m) && (_(), g());
	}), t(() => _), {
		pause: _,
		resume: v,
		reset: () => f(c, 0),
		get isActive() {
			return a(m);
		},
		get counter() {
			return a(c);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/bool-attr/bool-attr.js
function we(e) {
	return e ? "" : void 0;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_fa04ad77e5b1f4df1f1d0e47243eba3e/node_modules/runed/dist/utilities/on-cleanup/on-cleanup.svelte.js
function Te(e) {
	t(() => () => {
		e();
	});
}
//#endregion
export { C as ActiveElement, O as AnimationFrames, ee as Context, re as Debounced, ie as ElementRect, ae as ElementSize, oe as FiniteStateMachine, le as IsDocumentVisible, se as IsFocusWithin, V as IsIdle, U as IsInViewport, W as IsMounted, pe as PersistedState, me as PressedKeys, he as Previous, ve as ScrollState, ye as StateHistory, xe as TextareaAutosize, Se as Throttled, w as activeElement, we as boolAttr, D as extract, z as isLifecycleFnMeta, Te as onCleanup, de as onClickOutside, Y as resource, X as resourcePre, k as useDebounce, B as useEventListener, Ce as useGeolocation, H as useIntersectionObserver, $ as useInterval, I as useMutationObserver, L as useResizeObserver, Q as useThrottle, M as watch, P as watchOnce };
