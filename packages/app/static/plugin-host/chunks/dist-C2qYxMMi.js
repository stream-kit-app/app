import { Bn as e, Br as t, Dr as n, Gn as r, Nn as i, Vr as a, Wn as o, Wr as s, Zn as c, _r as l, an as u, br as d, ir as f, pr as p, rr as m, yn as h, yr as g } from "./client-BFeMv2Ma.js";
import "./index-client-DI7sx7Sj.js";
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/internal/configurable-globals.js
var _ = typeof window < "u" ? window : void 0, v = typeof window < "u" ? window.document : void 0, y = typeof window < "u" ? window.navigator : void 0;
typeof window < "u" && window.location;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/internal/utils/dom.js
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
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/active-element/active-element.svelte.js
var C = class {
	#e;
	#t;
	constructor(e = {}) {
		let { window: t = _, document: n = t?.document } = e;
		t !== void 0 && (this.#e = n, this.#t = h((e) => {
			let n = i(t, "focusin", e), r = i(t, "focusout", e);
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
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/internal/utils/is.js
function T(e) {
	return typeof e == "function";
}
function E(e) {
	return e instanceof Element;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/extract/extract.svelte.js
function D(e, t) {
	if (T(e)) {
		let n = e();
		return n === void 0 ? t : n;
	}
	return e === void 0 ? t : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/animation-frames/animation-frames.svelte.js
var O = class {
	#e;
	#t = 0;
	#n = n(() => D(this.#t) ?? 0);
	#r = null;
	#i = null;
	#a = g(0);
	#o = g(!1);
	#s = _;
	constructor(e, t = {}) {
		t.window && (this.#s = t.window), this.#t = t.fpsLimit, this.#e = e, this.start = this.start.bind(this), this.stop = this.stop.bind(this), this.toggle = this.toggle.bind(this), m(() => ((t.immediate ?? !0) && r(this.start), this.stop));
	}
	#c(t) {
		if (!e(this.#o) || !this.#s) return;
		this.#r === null && (this.#r = t);
		let n = t - this.#r, r = 1e3 / n;
		if (e(this.#n) && r > e(this.#n)) {
			this.#i = this.#s.requestAnimationFrame(this.#c.bind(this));
			return;
		}
		l(this.#a, r), this.#r = t, this.#e({
			delta: n,
			timestamp: t
		}), this.#i = this.#s.requestAnimationFrame(this.#c.bind(this));
	}
	start() {
		this.#s && (l(this.#o, !0), this.#r = 0, this.#i = this.#s.requestAnimationFrame(this.#c.bind(this)));
	}
	stop() {
		this.#i && this.#s && (l(this.#o, !1), this.#s.cancelAnimationFrame(this.#i), this.#i = null);
	}
	toggle() {
		e(this.#o) ? this.stop() : this.start();
	}
	get fps() {
		return e(this.#o) ? e(this.#a) : 0;
	}
	get running() {
		return e(this.#o);
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
		return a(this.#t);
	}
	get() {
		let e = t(this.#t);
		if (e === void 0) throw Error(`Context "${this.#e}" not found`);
		return e;
	}
	getOr(e) {
		let n = t(this.#t);
		return n === void 0 ? e : n;
	}
	set(e) {
		return s(this.#t, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/use-debounce/use-debounce.svelte.js
function k(t, r) {
	let i = g(null), a = n(() => D(r, 250));
	function o(...n) {
		if (e(i)) e(i).timeout && clearTimeout(e(i).timeout);
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
		return e(i).runner = async () => {
			if (!e(i)) return;
			let r = e(i);
			l(i, null);
			try {
				r.resolve(await t.apply(this, n));
			} catch (e) {
				r.reject(e);
			}
		}, e(i).timeout = setTimeout(e(i).runner, e(a)), e(i).promise;
	}
	return o.cancel = async () => {
		(!e(i) || e(i).timeout === null) && (await new Promise((e) => setTimeout(e, 0)), !e(i) || e(i).timeout === null) || (clearTimeout(e(i).timeout), e(i).reject("Cancelled"), l(i, null));
	}, o.runScheduledNow = async () => {
		(!e(i) || !e(i).timeout) && (await new Promise((e) => setTimeout(e, 0)), !e(i) || !e(i).timeout) || (clearTimeout(e(i).timeout), e(i).timeout = null, await e(i).runner?.());
	}, Object.defineProperty(o, "pending", {
		enumerable: !0,
		get() {
			return !!e(i)?.timeout;
		}
	}), o;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/watch/watch.svelte.js
function A(e, t) {
	switch (e) {
		case "post":
			m(t);
			break;
		case "pre": f(t);
	}
}
function j(e, t, n, i = {}) {
	let { lazy: a = !1 } = i, o = !a, s = Array.isArray(e) ? [] : void 0;
	A(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!o) {
			o = !0, s = t;
			return;
		}
		let i = r(() => n(t, s));
		return s = t, i;
	});
}
function M(e, t, n) {
	let r = c(() => {
		let i = !1;
		j(e, t, (e, t) => {
			if (i) {
				r();
				return;
			}
			let a = n(e, t);
			return i = !0, a;
		}, { lazy: !0 });
	});
	m(() => r);
}
function N(e, t, n) {
	j(e, "post", t, n);
}
function te(e, t, n) {
	j(e, "pre", t, n);
}
N.pre = te;
function P(e, t) {
	M(e, "post", t);
}
function F(e, t) {
	M(e, "pre", t);
}
P.pre = F;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/internal/utils/function.js
function I() {}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/debounced/debounced.svelte.js
var ne = class {
	#e = g();
	#t;
	constructor(e, t = 250) {
		l(this.#e, e(), !0), this.cancel = this.cancel.bind(this), this.setImmediately = this.setImmediately.bind(this), this.updateImmediately = this.updateImmediately.bind(this), this.#t = k(() => {
			l(this.#e, e(), !0);
		}, t), N(e, () => {
			this.#t().catch(I);
		});
	}
	get current() {
		return e(this.#e);
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
		this.cancel(), l(this.#e, e, !0);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/use-mutation-observer/use-mutation-observer.svelte.js
function L(t, r, i = {}) {
	let { window: a = _ } = i, o, s = n(() => {
		let e = D(t);
		return new Set(e ? Array.isArray(e) ? e : [e] : []);
	}), l = c(() => {
		m(() => {
			if (e(s).size && a) {
				o = new a.MutationObserver(r);
				for (let t of e(s)) o.observe(t, i);
				return () => {
					o?.disconnect(), o = void 0;
				};
			}
		});
	});
	return m(() => l), {
		stop: l,
		takeRecords() {
			return o?.takeRecords();
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/use-resize-observer/use-resize-observer.svelte.js
function R(t, r, i = {}) {
	let { window: a = _ } = i, o, s = n(() => {
		let e = D(t);
		return new Set(e ? Array.isArray(e) ? e : [e] : []);
	}), l = c(() => {
		m(() => {
			if (e(s).size && a) {
				o = new a.ResizeObserver(r);
				for (let t of e(s)) o.observe(t, i);
				return () => {
					o?.disconnect(), o = void 0;
				};
			}
		});
	});
	return m(() => l), { stop: l };
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/element-rect/element-rect.svelte.js
var re = class {
	#e = g(p({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}));
	constructor(t, r = {}) {
		l(this.#e, {
			width: r.initialRect?.width ?? 0,
			height: r.initialRect?.height ?? 0,
			x: r.initialRect?.x ?? 0,
			y: r.initialRect?.y ?? 0,
			top: r.initialRect?.top ?? 0,
			right: r.initialRect?.right ?? 0,
			bottom: r.initialRect?.bottom ?? 0,
			left: r.initialRect?.left ?? 0
		}, !0);
		let i = n(() => D(t)), a = () => {
			if (!e(i)) return;
			let t = e(i).getBoundingClientRect();
			e(this.#e).width = t.width, e(this.#e).height = t.height, e(this.#e).x = t.x, e(this.#e).y = t.y, e(this.#e).top = t.top, e(this.#e).right = t.right, e(this.#e).bottom = t.bottom, e(this.#e).left = t.left;
		};
		R(() => e(i), a, { window: r.window }), m(a), L(() => e(i), a, {
			attributeFilter: ["style", "class"],
			window: r.window
		});
	}
	get x() {
		return e(this.#e).x;
	}
	get y() {
		return e(this.#e).y;
	}
	get width() {
		return e(this.#e).width;
	}
	get height() {
		return e(this.#e).height;
	}
	get top() {
		return e(this.#e).top;
	}
	get right() {
		return e(this.#e).right;
	}
	get bottom() {
		return e(this.#e).bottom;
	}
	get left() {
		return e(this.#e).left;
	}
	get current() {
		return e(this.#e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/internal/utils/get.js
function z(e) {
	return T(e) ? e() : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/element-size/element-size.svelte.js
var ie = class {
	#e = {
		width: 0,
		height: 0
	};
	#t = !1;
	#n;
	#r;
	#i;
	#a = n(() => (e(this.#s)?.(), this.getSize().width));
	#o = n(() => (e(this.#s)?.(), this.getSize().height));
	#s = n(() => {
		let e = z(this.#r);
		if (e) return h((t) => {
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
		let e = z(this.#r);
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
		return e(this.#s)?.(), this.getSize();
	}
	get width() {
		return e(this.#a);
	}
	get height() {
		return e(this.#o);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/finite-state-machine/finite-state-machine.svelte.js
function B(e) {
	return !!e && typeof e == "object" && "to" in e && "from" in e && "event" in e && "args" in e;
}
var ae = class {
	#e = g();
	states;
	#t = {};
	constructor(e, t) {
		l(this.#e, e, !0), this.states = t, this.send = this.send.bind(this), this.debounce = this.debounce.bind(this), this.#r("_enter", {
			from: null,
			to: e,
			event: null,
			args: []
		});
	}
	#n(t, n, r) {
		let i = {
			from: e(this.#e),
			to: t,
			event: n,
			args: r
		};
		this.#r("_exit", i), l(this.#e, t, !0), this.#r("_enter", i);
	}
	#r(t, ...n) {
		let r = this.states[e(this.#e)]?.[t] ?? this.states["*"]?.[t];
		if (r instanceof Function) {
			if (t === "_enter" || t === "_exit") B(n[0]) ? r(n[0]) : console.warn("Invalid metadata passed to lifecycle function of the FSM.");
			else return r(...n);
		} else if (typeof r == "string") return r;
		else t !== "_enter" && t !== "_exit" && console.warn("No action defined for event", t, "in state", e(this.#e));
	}
	send(t, ...n) {
		let r = this.#r(t, ...n);
		return r && r !== e(this.#e) && this.#n(r, t, n), e(this.#e);
	}
	async debounce(e = 500, t, ...n) {
		return this.#t[t] && clearTimeout(this.#t[t]), new Promise((r) => {
			this.#t[t] = setTimeout(() => {
				delete this.#t[t], r(this.send(t, ...n));
			}, e);
		});
	}
	get current() {
		return e(this.#e);
	}
}, oe = class {
	#e;
	#t;
	constructor(e, t = {}) {
		this.#e = e, this.#t = new C(t);
	}
	#n = n(() => {
		let e = D(this.#e);
		return e != null && e.contains(this.#t.current);
	});
	get current() {
		return e(this.#n);
	}
	set current(e) {
		l(this.#n, e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/use-event-listener/use-event-listener.svelte.js
function V(e, t, n, r) {
	m(() => {
		let a = D(e);
		if (a == null) return;
		let o = D(t);
		if (Array.isArray(o)) for (let e of o) m(() => i(a, e, n, r));
		else return i(a, o, n, r);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/is-idle/is-idle.svelte.js
var se = {
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
}, ce = class {
	#e = g(!1);
	#t = g(p(Date.now()));
	constructor(t) {
		let r = {
			...se,
			...t
		}, i = r.window ?? _, a = r.document ?? i?.document, o = n(() => D(r.timeout)), s = n(() => D(r.events)), c = n(() => D(r.detectVisibilityChanges)), u = n(() => D(r.trackLastActive));
		l(this.#e, r.initialState, !0);
		let d = k(() => {
			l(this.#e, !0);
		}, () => e(o));
		d();
		let f = () => {
			l(this.#e, !1), e(u) && l(this.#t, Date.now(), !0), d();
		};
		V(() => i, () => e(s), () => {
			f();
		}, { passive: !0 }), m(() => {
			e(c) && a && V(a, ["visibilitychange"], () => {
				a.hidden || f();
			});
		});
	}
	get lastActive() {
		return e(this.#t);
	}
	get current() {
		return e(this.#e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/use-intersection-observer/use-intersection-observer.svelte.js
function H(t, r, i = {}) {
	let { root: a, rootMargin: o = "0px", threshold: s = .1, immediate: u = !0, window: d = _, once: f = !1 } = i, h = g(p(u)), v, y = n(() => {
		let e = D(t);
		return new Set(e ? Array.isArray(e) ? e : [e] : []);
	}), b = c(() => {
		m(() => {
			if (e(y).size && e(h) && d) {
				v = new d.IntersectionObserver((e, t) => {
					e.forEach((e) => {
						let n = Array.isArray(s) ? s.some((t) => e.intersectionRatio >= t) : e.intersectionRatio >= s, i = e.isIntersecting && n;
						if (r([e], t), f && i) return l(h, !1), () => {
							t?.disconnect();
						};
					});
				}, {
					rootMargin: o,
					root: z(a),
					threshold: s
				});
				for (let t of e(y)) v.observe(t);
				return () => {
					v?.disconnect();
				};
			}
		});
	});
	return m(() => b), {
		get isActive() {
			return e(h);
		},
		stop: b,
		pause() {
			l(h, !1);
		},
		resume() {
			l(h, !0);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/is-in-viewport/is-in-viewport.svelte.js
var U = class {
	#e = g(!1);
	#t;
	constructor(t, n) {
		this.#t = H(t, (t) => {
			let n = e(this.#e), r = 0;
			for (let e of t) e.time >= r && (r = e.time, n = e.isIntersecting);
			l(this.#e, n, !0);
		}, n);
	}
	get current() {
		return e(this.#e);
	}
	get observer() {
		return this.#t;
	}
}, W = class {
	#e = g(!1);
	constructor() {
		m(() => (r(() => l(this.#e, !0)), () => {
			l(this.#e, !1);
		}));
	}
	get current() {
		return e(this.#e);
	}
}, le = class {
	#e = g(!1);
	constructor(e = {}) {
		let t = e.window ?? _, n = e.document ?? t?.document;
		l(this.#e, n ? !n.hidden : !1, !0), m(() => {
			if (n) return i(n, "visibilitychange", () => {
				l(this.#e, !n.hidden);
			});
		});
	}
	get current() {
		return e(this.#e);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/internal/utils/sleep.js
async function ue(e = 0) {
	return new Promise((t) => setTimeout(t, e));
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/on-click-outside/on-click-outside.svelte.js
function de(t, r, a = {}) {
	let { window: o = _, immediate: s = !0, detectIframe: c = !1 } = a, u = a.document ?? o?.document, d = n(() => D(t)), f = n(() => x(e(d), u)), h = g(p(s)), v = !1, y = I, C = I, w = k((t) => {
		if (!e(d) || !e(f)) {
			y();
			return;
		}
		if (v === !0 || !G(t, e(d), e(f))) {
			y();
			return;
		}
		t.pointerType === "touch" ? (y(), y = i(e(f), "click", () => r(t), { once: !0 })) : r(t);
	}, 10);
	function T() {
		if (!e(f) || !o || !e(d)) return I;
		let t = [i(e(f), "pointerdown", (t) => {
			G(t, e(d), e(f)) && (v = !0);
		}, { capture: !0 }), i(e(f), "pointerdown", (e) => {
			v = !1, w(e);
		})];
		return c && t.push(i(o, "blur", async (t) => {
			await ue();
			let n = b(e(f));
			n?.tagName === "IFRAME" && !S(e(d), n) && r(t);
		})), () => {
			for (let e of t) e();
		};
	}
	function E() {
		v = !1, w.cancel(), y(), C();
	}
	return N([() => e(h), () => e(d)], ([e, t]) => {
		e && t ? (C(), C = T()) : E();
	}), m(() => () => {
		E();
	}), {
		stop: () => l(h, !1),
		start: () => l(h, !0),
		get enabled() {
			return e(h);
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
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/persisted-state/persisted-state.svelte.js
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
		e.key === this.#t && e.newValue !== null && (this.#e = this.#p(e.newValue), this.#a?.());
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
		this.#l && this.#s && (this.#i = h((e) => (this.#a = e, this.#c = this.#s && this.#u && this.#d === "local" ? i(this.#l, "storage", this.#f) : void 0, () => {
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
	#e = g(p([]));
	#t;
	constructor(t = {}) {
		let { window: n = _ } = t;
		this.has = this.has.bind(this), n && (this.#t = h((t) => {
			let r = i(n, "keydown", (n) => {
				let r = n.key.toLowerCase();
				e(this.#e).includes(r) || e(this.#e).push(r), t();
			}), a = i(n, "keyup", (n) => {
				let r = n.key.toLowerCase();
				q.includes(r) && l(this.#e, e(this.#e).filter((e) => q.includes(e)), !0), l(this.#e, e(this.#e).filter((e) => e !== r), !0), t();
			}), o = i(n, "blur", () => {
				l(this.#e, [], !0), t();
			}), s = i(document, "visibilitychange", () => {
				document.visibilityState === "hidden" && (l(this.#e, [], !0), t());
			});
			return () => {
				r(), a(), o(), s();
			};
		}));
	}
	has(...t) {
		return this.#t?.(), t.map((e) => e.toLowerCase()).every((t) => e(this.#e).includes(t));
	}
	get all() {
		return this.#t?.(), e(this.#e);
	}
	onKeys(e, t) {
		this.#t?.();
		let n = Array.isArray(e) ? e : [e];
		N(() => this.all, () => {
			this.has(...n) && t();
		});
	}
}, he = class {
	#e = () => void 0;
	#t = n(() => this.#e());
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
		return e(this.#t);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/resource/resource.svelte.js
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
function J(t, n, r = {}, i) {
	let { lazy: a = !1, once: o = !1, initialValue: s, debounce: c, throttle: u } = r, d = g(p(s)), f = g(p(s === void 0 && !a)), m = g(void 0), h = g(p([])), _ = () => {
		e(h).forEach((e) => e()), l(h, [], !0);
	}, v = (t) => {
		l(h, [...e(h), t], !0);
	}, y = async (t, r, i = !1) => {
		try {
			l(f, !0), l(m, void 0), _();
			let a = new AbortController();
			v(() => a.abort());
			let o = await n(t, r, {
				data: e(d),
				refetching: i,
				onCleanup: v,
				signal: a.signal
			});
			return l(d, o, !0), o;
		} catch (e) {
			e instanceof DOMException && e.name === "AbortError" || l(m, e, !0);
			return;
		} finally {
			l(f, !1);
		}
	}, b = c ? ge(y, c) : u ? _e(y, u) : y, x = Array.isArray(t) ? t : [t], S;
	return i((e, n) => {
		o && S || (S = e, b(Array.isArray(t) ? e : e[0], Array.isArray(t) ? n : n?.[0]));
	}, { lazy: a }), {
		get current() {
			return e(d);
		},
		get loading() {
			return e(f);
		},
		get error() {
			return e(m);
		},
		mutate: (e) => {
			l(d, e, !0);
		},
		refetch: (e) => {
			let n = x.map((e) => e());
			return b(Array.isArray(t) ? n : n[0], Array.isArray(t) ? n : n[0], e ?? !0);
		}
	};
}
function Y(e, t, n) {
	return J(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		N(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
function X(e, t, n) {
	return J(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		N.pre(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
Y.pre = X;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/scroll-state/scroll-state.svelte.js
var Z = 1, ve = class {
	#e;
	#t = n(() => D(this.#e.element));
	get element() {
		return e(this.#t);
	}
	set element(e) {
		l(this.#t, e);
	}
	#n = n(() => D(this.#e?.idle, 200));
	get idle() {
		return e(this.#n);
	}
	set idle(e) {
		l(this.#n, e);
	}
	#r = n(() => D(this.#e.offset, {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	}));
	get offset() {
		return e(this.#r);
	}
	set offset(e) {
		l(this.#r, e);
	}
	#i = n(() => this.#e.onScroll ?? I);
	get onScroll() {
		return e(this.#i);
	}
	set onScroll(e) {
		l(this.#i, e);
	}
	#a = n(() => this.#e.onStop ?? I);
	get onStop() {
		return e(this.#a);
	}
	set onStop(e) {
		l(this.#a, e);
	}
	#o = n(() => this.#e.eventListenerOptions ?? {
		capture: !1,
		passive: !0
	});
	get eventListenerOptions() {
		return e(this.#o);
	}
	set eventListenerOptions(e) {
		l(this.#o, e);
	}
	#s = n(() => D(this.#e.behavior, "auto"));
	get behavior() {
		return e(this.#s);
	}
	set behavior(e) {
		l(this.#s, e);
	}
	#c = n(() => this.#e.onError ?? ((e) => {
		console.error(e);
	}));
	get onError() {
		return e(this.#c);
	}
	set onError(e) {
		l(this.#c, e);
	}
	#l = g(0);
	get internalX() {
		return e(this.#l);
	}
	set internalX(e) {
		l(this.#l, e, !0);
	}
	#u = g(0);
	get internalY() {
		return e(this.#u);
	}
	set internalY(e) {
		l(this.#u, e, !0);
	}
	#d = n(() => this.internalX);
	get x() {
		return e(this.#d);
	}
	set x(e) {
		this.scrollTo(e, void 0);
	}
	#f = n(() => this.internalY);
	get y() {
		return e(this.#f);
	}
	set y(e) {
		this.scrollTo(void 0, e);
	}
	#p = g(!1);
	get isScrolling() {
		return e(this.#p);
	}
	set isScrolling(e) {
		l(this.#p, e, !0);
	}
	#m = g(p({
		left: !0,
		right: !1,
		top: !0,
		bottom: !1
	}));
	get arrived() {
		return e(this.#m);
	}
	set arrived(e) {
		l(this.#m, e, !0);
	}
	#h = g(p({
		left: !1,
		right: !1,
		top: !1,
		bottom: !1
	}));
	get directions() {
		return e(this.#h);
	}
	set directions(e) {
		l(this.#h, e, !0);
	}
	#g = g(p({
		x: 0,
		y: 0
	}));
	get progress() {
		return e(this.#g);
	}
	set progress(e) {
		l(this.#g, e, !0);
	}
	constructor(e) {
		this.#e = e, V(() => this.element, "scroll", this.#_, this.eventListenerOptions), V(() => this.element, "scrollend", (e) => this.onScrollEnd(e), this.eventListenerOptions), u(() => {
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
}, Q = class {
	#e = g(p([]));
	#t = !1;
	#n;
	#r = g(p([]));
	get log() {
		return e(this.#r);
	}
	set log(e) {
		l(this.#r, e, !0);
	}
	#i = n(() => this.log.length > 1);
	get canUndo() {
		return e(this.#i);
	}
	set canUndo(e) {
		l(this.#i, e);
	}
	#a = n(() => e(this.#e).length > 0);
	get canRedo() {
		return e(this.#a);
	}
	set canRedo(e) {
		l(this.#a, e);
	}
	constructor(e, t, n) {
		l(this.#e, [], !0), this.#n = t, this.undo = this.undo.bind(this), this.redo = this.redo.bind(this);
		let r = (e) => {
			this.log.push(e);
			let t = z(n?.capacity);
			t && this.log.length > t && (this.log = this.log.slice(-t));
		};
		N(() => z(e), (e) => {
			if (this.#t) {
				this.#t = !1;
				return;
			}
			r({
				snapshot: e,
				timestamp: (/* @__PURE__ */ new Date()).getTime()
			}), l(this.#e, [], !0);
		}), N(() => z(n?.capacity), (e) => {
			e && (this.log = this.log.slice(-e));
		});
	}
	undo() {
		let [t, n] = this.log.slice(-2);
		n && t && (this.#t = !0, e(this.#e).push(n), this.log.pop(), this.#n(t.snapshot));
	}
	redo() {
		let t = e(this.#e).pop();
		t && (this.#t = !0, this.log.push(t), this.#n(t.snapshot));
	}
	clear() {
		this.log = [], l(this.#e, [], !0);
	}
}, ye = [
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
], be = class {
	#e;
	#t = null;
	#n = null;
	#r = n(() => D(this.#e.element));
	get element() {
		return e(this.#r);
	}
	set element(e) {
		l(this.#r, e);
	}
	#i = n(() => D(this.#e.input));
	get input() {
		return e(this.#i);
	}
	set input(e) {
		l(this.#i, e);
	}
	#a = n(() => D(this.#e.styleProp, "height"));
	get styleProp() {
		return e(this.#a);
	}
	set styleProp(e) {
		l(this.#a, e);
	}
	#o = n(() => D(this.#e.maxHeight, void 0));
	get maxHeight() {
		return e(this.#o);
	}
	set maxHeight(e) {
		l(this.#o, e);
	}
	#s = g(0);
	get textareaHeight() {
		return e(this.#s);
	}
	set textareaHeight(e) {
		l(this.#s, e, !0);
	}
	#c = g(0);
	get textareaOldWidth() {
		return e(this.#c);
	}
	set textareaOldWidth(e) {
		l(this.#c, e, !0);
	}
	constructor(e) {
		this.#e = e, this.#l(), N([() => this.input, () => this.element], () => {
			o().then(() => this.triggerResize());
		}), N(() => this.textareaHeight, () => e?.onResize?.()), R(() => this.element, ([e]) => {
			if (!e) return;
			let { contentRect: t } = e;
			this.textareaOldWidth !== t.width && (this.textareaOldWidth = t.width, this.triggerResize());
		}), m(() => () => {
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
		for (let t of ye) this.#n.style.setProperty(t, e.getPropertyValue(t));
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
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/use-throttle/use-throttle.svelte.js
function $(t, n = 250) {
	let i = 0, a = g(void 0), o = null, s = null, c = null;
	function u() {
		l(a, void 0), c = null, o = null, s = null;
	}
	function d(...d) {
		return r(() => {
			let r = Date.now(), f = typeof n == "function" ? n() : n, p = i + f;
			if (c ||= new Promise((e, t) => {
				o = e, s = t;
			}), r < p) return e(a) || l(a, setTimeout(async () => {
				try {
					let e = await t.apply(this, d);
					o?.(e);
				} catch (e) {
					s?.(e);
				} finally {
					clearTimeout(e(a)), u(), i = Date.now();
				}
			}, p - r), !0), c;
			e(a) && (clearTimeout(e(a)), l(a, void 0)), i = r;
			try {
				let e = t.apply(this, d);
				o?.(e);
			} catch (e) {
				s?.(e);
			} finally {
				u();
			}
			return c;
		});
	}
	return d.cancel = async () => {
		if (e(a)) {
			if (e(a) === void 0 && (await new Promise((e) => setTimeout(e, 0)), e(a) === void 0)) return;
			clearTimeout(e(a)), s?.("Cancelled"), u();
		}
	}, Object.defineProperty(d, "pending", {
		enumerable: !0,
		get() {
			return !!e(a);
		}
	}), d;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/throttled/throttled.svelte.js
var xe = class {
	#e = g();
	#t;
	constructor(e, t = 250) {
		l(this.#e, e(), !0), this.#t = $(() => {
			l(this.#e, e(), !0);
		}, t), N(e, () => {
			this.#t()?.catch(I);
		});
	}
	get current() {
		return e(this.#e);
	}
	cancel() {
		this.#t.cancel();
	}
	setImmediately(e) {
		this.cancel(), l(this.#e, e, !0);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/use-geolocation/use-geolocation.svelte.js
function Se(t = {}) {
	let { enableHighAccuracy: n = !0, maximumAge: r = 3e4, timeout: i = 27e3, immediate: a = !0, navigator: o = y } = t, s = !!o, c = g(null), u = p({
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
	}), d = g(!1);
	function f(e) {
		l(c, null), u.timestamp = e.timestamp, u.coords.accuracy = e.coords.accuracy, u.coords.altitude = e.coords.altitude, u.coords.altitudeAccuracy = e.coords.altitudeAccuracy, u.coords.heading = e.coords.heading, u.coords.latitude = e.coords.latitude, u.coords.longitude = e.coords.longitude, u.coords.speed = e.coords.speed;
	}
	let h;
	function _() {
		o && (h = o.geolocation.watchPosition(f, (e) => l(c, e), {
			enableHighAccuracy: n,
			maximumAge: r,
			timeout: i
		}), l(d, !1));
	}
	function v() {
		h && o && o.geolocation.clearWatch(h), l(d, !0);
	}
	return m(() => (a && _(), () => v())), {
		get isSupported() {
			return s;
		},
		position: u,
		get error() {
			return e(c);
		},
		get isPaused() {
			return e(d);
		},
		resume: _,
		pause: v
	};
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/use-interval/use-interval.svelte.js
function Ce(t, r = {}) {
	let { immediate: i = !0, immediateCallback: a = !1, callback: o } = r, s = g(null), c = g(0), u = n(() => D(t)), f = n(() => e(s) !== null);
	function p() {
		d(c), o?.(e(c));
	}
	function h() {
		l(s, setInterval(p, e(u)), !0);
	}
	let _ = () => {
		e(s) !== null && (clearInterval(e(s)), l(s, null));
	}, v = () => {
		e(s) === null && (a && p(), h());
	};
	return i && v(), N(() => e(u), () => {
		e(f) && (_(), h());
	}), m(() => _), {
		pause: _,
		resume: v,
		reset: () => l(c, 0),
		get isActive() {
			return e(f);
		},
		get counter() {
			return e(c);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_222ceee034dfad2f96d70b32e701d9a9/node_modules/runed/dist/utilities/on-cleanup/on-cleanup.svelte.js
function we(e) {
	m(() => () => {
		e();
	});
}
//#endregion
export { P as A, B as C, L as D, R as E, C as F, w as I, ee as M, O as N, ne as O, D as P, ae as S, re as T, U as _, $ as a, V as b, ve as c, he as d, me as f, W as g, le as h, xe as i, k as j, N as k, Y as l, de as m, Ce as n, be as o, pe as p, Se as r, Q as s, we as t, X as u, H as v, ie as w, oe as x, ce as y };
