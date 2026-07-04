import { On as e, mt as t, or as n, pr as r } from "./client-xxWnFgeR.js";
import { D as i, N as a, m as o, p as s } from "./animations-complete-BfqHI4B-.js";
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/utils/compose-handlers.js
function c(...e) {
	return function(t) {
		for (let n of e) if (n) {
			if (t.defaultPrevented) return;
			typeof n == "function" ? n.call(this, t) : n.current?.call(this, t);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/inline-style-parser@0.2.7/node_modules/inline-style-parser/esm/index.mjs
var l = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, u = /\n/g, d = /^\s*/, f = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, p = /^:\s*/, m = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, h = /^[;\s]*/, g = /^\s+|\s+$/g, _ = "\n", v = "/", y = "*", b = "", x = "comment", S = "declaration";
function C(e, t) {
	if (typeof e != "string") throw TypeError("First argument must be a string");
	if (!e) return [];
	t ||= {};
	var n = 1, r = 1;
	function i(e) {
		var t = e.match(u);
		t && (n += t.length);
		var i = e.lastIndexOf(_);
		r = ~i ? e.length - i : r + e.length;
	}
	function a() {
		var e = {
			line: n,
			column: r
		};
		return function(t) {
			return t.position = new o(e), g(), t;
		};
	}
	function o(e) {
		this.start = e, this.end = {
			line: n,
			column: r
		}, this.source = t.source;
	}
	o.prototype.content = e;
	function s(i) {
		var a = /* @__PURE__ */ Error(t.source + ":" + n + ":" + r + ": " + i);
		if (a.reason = i, a.filename = t.source, a.line = n, a.column = r, a.source = e, !t.silent) throw a;
	}
	function c(t) {
		var n = t.exec(e);
		if (n) {
			var r = n[0];
			return i(r), e = e.slice(r.length), n;
		}
	}
	function g() {
		c(d);
	}
	function C(e) {
		var t;
		for (e ||= []; t = T();) t !== !1 && e.push(t);
		return e;
	}
	function T() {
		var t = a();
		if (!(v != e.charAt(0) || y != e.charAt(1))) {
			for (var n = 2; b != e.charAt(n) && (y != e.charAt(n) || v != e.charAt(n + 1));) ++n;
			if (n += 2, b === e.charAt(n - 1)) return s("End of comment missing");
			var o = e.slice(2, n - 2);
			return r += 2, i(o), e = e.slice(n), r += 2, t({
				type: x,
				comment: o
			});
		}
	}
	function E() {
		var e = a(), t = c(f);
		if (t) {
			if (T(), !c(p)) return s("property missing ':'");
			var n = c(m), r = e({
				type: S,
				property: w(t[0].replace(l, b)),
				value: n ? w(n[0].replace(l, b)) : b
			});
			return c(h), r;
		}
	}
	function D() {
		var e = [];
		C(e);
		for (var t; t = E();) t !== !1 && (e.push(t), C(e));
		return e;
	}
	return g(), D();
}
function w(e) {
	return e ? e.replace(g, b) : b;
}
//#endregion
//#region ../../node_modules/.pnpm/style-to-object@1.0.14/node_modules/style-to-object/esm/index.mjs
function T(e, t) {
	let n = null;
	if (!e || typeof e != "string") return n;
	let r = C(e), i = typeof t == "function";
	return r.forEach((e) => {
		if (e.type !== "declaration") return;
		let { property: r, value: a } = e;
		i ? t(r, a, e) : a && (n ||= {}, n[r] = a);
	}), n;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/utils/strings.js
var E = /\d/, D = [
	"-",
	"_",
	"/",
	"."
];
function O(e = "") {
	if (!E.test(e)) return e !== e.toLowerCase();
}
function k(e) {
	let t = [], n = "", r, i;
	for (let a of e) {
		let e = D.includes(a);
		if (e === !0) {
			t.push(n), n = "", r = void 0;
			continue;
		}
		let o = O(a);
		if (i === !1) {
			if (r === !1 && o === !0) {
				t.push(n), n = a, r = o;
				continue;
			}
			if (r === !0 && o === !1 && n.length > 1) {
				let e = n.at(-1);
				t.push(n.slice(0, Math.max(0, n.length - 1))), n = e + a, r = o;
				continue;
			}
		}
		n += a, r = o, i = e;
	}
	return t.push(n), t;
}
function A(e) {
	return e ? k(e).map((e) => M(e)).join("") : "";
}
function j(e) {
	return N(A(e || ""));
}
function M(e) {
	return e ? e[0].toUpperCase() + e.slice(1) : "";
}
function N(e) {
	return e ? e[0].toLowerCase() + e.slice(1) : "";
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/utils/css-to-style-obj.js
function P(e) {
	if (!e) return {};
	let t = {};
	function n(e, n) {
		if (e.startsWith("-moz-") || e.startsWith("-webkit-") || e.startsWith("-ms-") || e.startsWith("-o-")) {
			t[A(e)] = n;
			return;
		}
		if (e.startsWith("--")) {
			t[e] = n;
			return;
		}
		t[j(e)] = n;
	}
	return T(e, n), t;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/utils/execute-callbacks.js
function F(...e) {
	return (...t) => {
		for (let n of e) typeof n == "function" && n(...t);
	};
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/utils/style-to-css.js
function I(e, t) {
	let n = RegExp(e, "g");
	return (e) => {
		if (typeof e != "string") throw TypeError(`expected an argument of type string, but got ${typeof e}`);
		return e.match(n) ? e.replace(n, t) : e;
	};
}
var L = I(/[A-Z]/, (e) => `-${e.toLowerCase()}`);
function R(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError(`expected an argument of type object, but got ${typeof e}`);
	return Object.keys(e).map((t) => `${L(t)}: ${e[t]};`).join("\n");
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/utils/style.js
function z(e = {}) {
	return R(e).replace("\n", " ");
}
var B = new Set(/* @__PURE__ */ "onabort.onanimationcancel.onanimationend.onanimationiteration.onanimationstart.onauxclick.onbeforeinput.onbeforetoggle.onblur.oncancel.oncanplay.oncanplaythrough.onchange.onclick.onclose.oncompositionend.oncompositionstart.oncompositionupdate.oncontextlost.oncontextmenu.oncontextrestored.oncopy.oncuechange.oncut.ondblclick.ondrag.ondragend.ondragenter.ondragleave.ondragover.ondragstart.ondrop.ondurationchange.onemptied.onended.onerror.onfocus.onfocusin.onfocusout.onformdata.ongotpointercapture.oninput.oninvalid.onkeydown.onkeypress.onkeyup.onload.onloadeddata.onloadedmetadata.onloadstart.onlostpointercapture.onmousedown.onmouseenter.onmouseleave.onmousemove.onmouseout.onmouseover.onmouseup.onpaste.onpause.onplay.onplaying.onpointercancel.onpointerdown.onpointerenter.onpointerleave.onpointermove.onpointerout.onpointerover.onpointerup.onprogress.onratechange.onreset.onresize.onscroll.onscrollend.onsecuritypolicyviolation.onseeked.onseeking.onselect.onselectionchange.onselectstart.onslotchange.onstalled.onsubmit.onsuspend.ontimeupdate.ontoggle.ontouchcancel.ontouchend.ontouchmove.ontouchstart.ontransitioncancel.ontransitionend.ontransitionrun.ontransitionstart.onvolumechange.onwaiting.onwebkitanimationend.onwebkitanimationiteration.onwebkitanimationstart.onwebkittransitionend.onwheel".split("."));
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/utils/merge-props.js
function V(e) {
	return B.has(e);
}
function H(...e) {
	let n = { ...e[0] };
	for (let r = 1; r < e.length; r++) {
		let i = e[r];
		if (i) {
			for (let e of Object.keys(i)) {
				let r = n[e], o = i[e], s = typeof r == "function", l = typeof o == "function";
				if (s && typeof l && V(e)) n[e] = c(r, o);
				else if (s && l) n[e] = F(r, o);
				else if (e === "class") {
					let i = a(r), s = a(o);
					i && s ? n[e] = t(r, o) : i ? n[e] = t(r) : s && (n[e] = t(o));
				} else if (e === "style") {
					let t = typeof r == "object", i = typeof o == "object", a = typeof r == "string", s = typeof o == "string";
					if (t && i) n[e] = {
						...r,
						...o
					};
					else if (t && s) {
						let t = P(o);
						n[e] = {
							...r,
							...t
						};
					} else if (a && i) n[e] = {
						...P(r),
						...o
					};
					else if (a && s) {
						let t = P(r), i = P(o);
						n[e] = {
							...t,
							...i
						};
					} else t ? n[e] = r : i ? n[e] = o : a ? n[e] = r : s && (n[e] = o);
				} else n[e] = o === void 0 ? r : o;
			}
			for (let e of Object.getOwnPropertySymbols(i)) {
				let t = n[e], r = i[e];
				n[e] = r === void 0 ? t : r;
			}
		}
	}
	return typeof n.style == "object" && (n.style = z(n.style).replaceAll("\n", " ")), n.hidden === !1 && (n.hidden = void 0, delete n.hidden), n.disabled === !1 && (n.disabled = void 0, delete n.disabled), n;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_9da72a756eebdb7bd53369856221023b/node_modules/svelte-toolbelt/dist/utils/dom-context.svelte.js
var U = class {
	element;
	#e = r(() => this.element.current ? this.element.current.getRootNode() ?? document : document);
	get root() {
		return e(this.#e);
	}
	set root(e) {
		n(this.#e, e);
	}
	constructor(e) {
		typeof e == "function" ? this.element = i(e) : this.element = e;
	}
	getDocument = () => o(this.root);
	getWindow = () => this.getDocument().defaultView ?? window;
	getActiveElement = () => s(this.root);
	isActiveElement = (e) => e === this.getActiveElement();
	getElementById(e) {
		return this.root.getElementById(e);
	}
	querySelector = (e) => this.root ? this.root.querySelector(e) : null;
	querySelectorAll = (e) => this.root ? this.root.querySelectorAll(e) : [];
	setTimeout = (e, t) => this.getWindow().setTimeout(e, t);
	clearTimeout = (e) => this.getWindow().clearTimeout(e);
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/create-id.js
function W(e, t) {
	return t === void 0 ? `bits-${e}` : `bits-${e}-${t}`;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_bb7c24489ad33e958e13e9fce07f62f9/node_modules/bits-ui/dist/internal/use-id.js
globalThis.bitsIdCounter ??= { current: 0 };
function G(e = "bits") {
	return globalThis.bitsIdCounter.current++, `${e}-${globalThis.bitsIdCounter.current}`;
}
//#endregion
export { z as a, c, H as i, W as n, F as o, U as r, P as s, G as t };
