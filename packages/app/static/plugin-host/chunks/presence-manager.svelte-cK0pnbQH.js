import { Bn as e, _r as t, yr as n } from "./client-BFeMv2Ma.js";
import { _ as r, t as i, x as a } from "./animations-complete-2GhqX7WL.js";
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/is.js
var o = typeof document < "u", s = c();
function c() {
	return o && window?.navigator?.userAgent && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function l(e) {
	return e instanceof HTMLElement;
}
function u(e) {
	return e instanceof Element;
}
function d(e) {
	return e instanceof Element || e instanceof SVGElement;
}
function f(e) {
	return e.pointerType === "touch";
}
function p(e) {
	return e !== null;
}
function m(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/presence-manager.svelte.js
var h = class {
	#e;
	#t;
	#n;
	#r = n(!1);
	#i = n(void 0);
	#a = !1;
	#o = null;
	constructor(e) {
		this.#e = e, t(this.#r, e.open.current, !0), this.#t = e.enabled ?? !0, this.#n = new i({
			ref: this.#e.ref,
			afterTick: this.#e.open
		}), r(() => this.#s()), a(() => this.#e.open.current, (e) => {
			if (!this.#a) {
				this.#a = !0;
				return;
			}
			if (this.#s(), !e && this.#e.shouldSkipExitAnimation?.()) {
				t(this.#r, !1), t(this.#i, void 0), this.#e.onComplete?.();
				return;
			}
			if (e && t(this.#r, !0), t(this.#i, e ? "starting" : "ending", !0), e && (this.#o = window.requestAnimationFrame(() => {
				this.#o = null, this.#e.open.current && t(this.#i, void 0);
			})), !this.#t) {
				e || t(this.#r, !1), t(this.#i, void 0), this.#e.onComplete?.();
				return;
			}
			this.#n.run(() => {
				e === this.#e.open.current && (this.#e.open.current || t(this.#r, !1), t(this.#i, void 0), this.#e.onComplete?.());
			});
		});
	}
	get shouldRender() {
		return e(this.#r);
	}
	get transitionStatus() {
		return e(this.#i);
	}
	#s() {
		this.#o !== null && (window.cancelAnimationFrame(this.#o), this.#o = null);
	}
};
//#endregion
export { l as a, m as c, d as i, f as l, o as n, s as o, u as r, p as s, h as t };
