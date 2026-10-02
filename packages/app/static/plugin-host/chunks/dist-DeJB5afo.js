import { Gn as e, Kn as t, Nn as n, On as r, Sr as i, cr as a, nr as o, or as s, pr as c, xn as l, zn as u } from "./client-xxWnFgeR.js";
import "./index-client-DLfVeyOI.js";
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/internal/configurable-globals.js
var d = typeof window < "u" ? window : void 0;
typeof window < "u" && window.document, typeof window < "u" && window.navigator, typeof window < "u" && window.location;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/internal/utils/dom.js
function f(e) {
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
		let { window: t = d, document: n = t?.document } = e;
		t !== void 0 && (this.#e = n, this.#t = i((e) => {
			let n = l(t, "focusin", e), r = l(t, "focusout", e);
			return () => {
				n(), r();
			};
		}));
	}
	get current() {
		return this.#t?.(), this.#e ? f(this.#e) : null;
	}
}();
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/internal/utils/is.js
function p(e) {
	return typeof e == "function";
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/utilities/extract/extract.svelte.js
function m(e, t) {
	if (p(e)) {
		let n = e();
		return n === void 0 ? t : n;
	}
	return e === void 0 ? t : e;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/utilities/use-debounce/use-debounce.svelte.js
function h(e, t) {
	let n = a(null), i = c(() => m(t, 250));
	function o(...t) {
		if (r(n)) r(n).timeout && clearTimeout(r(n).timeout);
		else {
			let e, t;
			s(n, {
				timeout: null,
				runner: null,
				promise: new Promise((n, r) => {
					e = n, t = r;
				}),
				resolve: e,
				reject: t
			}, !0);
		}
		return r(n).runner = async () => {
			if (!r(n)) return;
			let i = r(n);
			s(n, null);
			try {
				i.resolve(await e.apply(this, t));
			} catch (e) {
				i.reject(e);
			}
		}, r(n).timeout = setTimeout(r(n).runner, r(i)), r(n).promise;
	}
	return o.cancel = async () => {
		(!r(n) || r(n).timeout === null) && (await new Promise((e) => setTimeout(e, 0)), !r(n) || r(n).timeout === null) || (clearTimeout(r(n).timeout), r(n).reject("Cancelled"), s(n, null));
	}, o.runScheduledNow = async () => {
		(!r(n) || !r(n).timeout) && (await new Promise((e) => setTimeout(e, 0)), !r(n) || !r(n).timeout) || (clearTimeout(r(n).timeout), r(n).timeout = null, await r(n).runner?.());
	}, Object.defineProperty(o, "pending", {
		enumerable: !0,
		get() {
			return !!r(n)?.timeout;
		}
	}), o;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/utilities/watch/watch.svelte.js
function g(n, r) {
	switch (n) {
		case "post":
			e(r);
			break;
		case "pre":
			t(r);
			break;
	}
}
function _(e, t, r, i = {}) {
	let { lazy: a = !1 } = i, o = !a, s = Array.isArray(e) ? [] : void 0;
	g(t, () => {
		let t = Array.isArray(e) ? e.map((e) => e()) : e();
		if (!o) {
			o = !0, s = t;
			return;
		}
		let i = n(() => r(t, s));
		return s = t, i;
	});
}
function v(t, n, r) {
	let i = u(() => {
		let e = !1;
		_(t, n, (t, n) => {
			if (e) {
				i();
				return;
			}
			let a = r(t, n);
			return e = !0, a;
		}, { lazy: !0 });
	});
	e(() => i);
}
function y(e, t, n) {
	_(e, "post", t, n);
}
function b(e, t, n) {
	_(e, "pre", t, n);
}
y.pre = b;
function x(e, t) {
	v(e, "post", t);
}
function S(e, t) {
	v(e, "pre", t);
}
x.pre = S;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/internal/utils/function.js
function C() {}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/utilities/debounced/debounced.svelte.js
var w = class {
	#e = a();
	#t;
	constructor(e, t = 250) {
		s(this.#e, e(), !0), this.cancel = this.cancel.bind(this), this.setImmediately = this.setImmediately.bind(this), this.updateImmediately = this.updateImmediately.bind(this), this.#t = h(() => {
			s(this.#e, e(), !0);
		}, t), y(e, () => {
			this.#t().catch(C);
		});
	}
	get current() {
		return r(this.#e);
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
		this.cancel(), s(this.#e, e, !0);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.37.1_@sveltejs+kit@_468f504255497b70c65b635e4cfc6a1f/node_modules/runed/dist/utilities/resource/resource.svelte.js
function T(e, t) {
	let n, r = null;
	return (...i) => new Promise((a) => {
		r && r(void 0), r = a, clearTimeout(n), n = setTimeout(async () => {
			let t = await e(...i);
			r &&= (r(t), null);
		}, t);
	});
}
function E(e, t) {
	let n = 0, r = null;
	return (...i) => {
		let a = Date.now();
		return n && a - n < t ? r ?? Promise.resolve(void 0) : (n = a, r = e(...i), r);
	};
}
function D(e, t, n = {}, i) {
	let { lazy: c = !1, once: l = !1, initialValue: u, debounce: d, throttle: f } = n, p = a(o(u)), m = a(o(u === void 0 && !c)), h = a(void 0), g = a(o([])), _ = () => {
		r(g).forEach((e) => e()), s(g, [], !0);
	}, v = (e) => {
		s(g, [...r(g), e], !0);
	}, y = async (e, n, i = !1) => {
		try {
			s(m, !0), s(h, void 0), _();
			let a = new AbortController();
			v(() => a.abort());
			let o = await t(e, n, {
				data: r(p),
				refetching: i,
				onCleanup: v,
				signal: a.signal
			});
			return s(p, o, !0), o;
		} catch (e) {
			e instanceof DOMException && e.name === "AbortError" || s(h, e, !0);
			return;
		} finally {
			s(m, !1);
		}
	}, b = d ? T(y, d) : f ? E(y, f) : y, x = Array.isArray(e) ? e : [e], S;
	return i((t, n) => {
		l && S || (S = t, b(Array.isArray(e) ? t : t[0], Array.isArray(e) ? n : n?.[0]));
	}, { lazy: c }), {
		get current() {
			return r(p);
		},
		get loading() {
			return r(m);
		},
		get error() {
			return r(h);
		},
		mutate: (e) => {
			s(p, e, !0);
		},
		refetch: (t) => {
			let n = x.map((e) => e());
			return b(Array.isArray(e) ? n : n[0], Array.isArray(e) ? n : n[0], t ?? !0);
		}
	};
}
function O(e, t, n) {
	return D(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		y(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
function k(e, t, n) {
	return D(e, t, n, (t, n) => {
		let r = Array.isArray(e) ? e : [e];
		y.pre(() => r.map((e) => e()), (e, n) => {
			t(e, n ?? []);
		}, n);
	});
}
O.pre = k;
//#endregion
export { y as n, w as t };
