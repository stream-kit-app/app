import { $t as e, Bn as t, Dr as n, Hr as r, Ur as i, Vt as a, _r as o, a as s, bn as c, cr as l, ii as u, in as d, o as f, s as p, sn as m, xn as h, yr as g } from "./client-BFeMv2Ma.js";
import { t as _ } from "./utils-Dqp4W1j8.js";
import "./disclose-version-CI8I6yeK.js";
import { t as v } from "./attachments-BbcOpCxM.js";
import { t as y } from "./button-DGOI4Wpk.js";
//#region ../ui/src/lib/components/copy-button/copy-feedback.svelte.ts
var b = "ri:file-copy-line", x = "ri:check-double-line", S = 2e3;
async function C(e) {
	try {
		return await navigator.clipboard.writeText(e), !0;
	} catch {
		return !1;
	}
}
var w = class {
	#e = g();
	get copiedKey() {
		return t(this.#e);
	}
	set copiedKey(e) {
		o(this.#e, e, !0);
	}
	#t;
	isCopied(e) {
		return e === void 0 ? this.copiedKey !== void 0 : this.copiedKey === e;
	}
	async copy(e, t = e) {
		let n = await C(e);
		return n && this.mark(t), n;
	}
	mark(e) {
		clearTimeout(this.#t), this.copiedKey = e, this.#t = setTimeout(() => {
			this.copiedKey = void 0;
		}, S);
	}
	destroy() {
		clearTimeout(this.#t);
	}
}, T = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"label",
	"copiedLabel",
	"tooltip",
	"variant",
	"size",
	"children",
	"onCopied",
	"onCopyError",
	"class"
]);
function E(o, g) {
	i(g, !0);
	let S = s(g, "label", 3, "Copy"), C = s(g, "copiedLabel", 3, "Copied"), E = s(g, "variant", 3, "ghost"), D = f(g, T), O = new w(), k = n(() => O.isCopied()), A = n(() => g.tooltip ?? !g.children);
	async function j(e) {
		e.preventDefault(), e.stopPropagation();
		let t = typeof g.value == "function" ? await g.value() : g.value;
		t !== void 0 && (await O.copy(t, "value") ? g.onCopied?.(t) : g.onCopyError?.());
	}
	d(() => O.destroy());
	{
		let r = n(() => g.size ?? (g.children ? "sm" : "icon-sm")), i = n(() => t(k) ? x : b), s = n(() => g.children ? void 0 : t(k) ? C() : S()), d = n(() => _("transition-none", t(k) && "text-success-400", g.class));
		y(o, p(() => D, {
			type: "button",
			get variant() {
				return E();
			},
			get size() {
				return t(r);
			},
			get icon() {
				return t(i);
			},
			get "aria-label"() {
				return t(s);
			},
			get class() {
				return t(d);
			},
			onclick: (e) => void j(e),
			[e()]: (e) => ((t(A) ? v(() => t(k) ? C() : S()) : void 0) || u)(e),
			children: (e, t) => {
				var n = h(), r = l(n), i = (e) => {
					var t = h(), n = l(t);
					m(n, () => g.children), c(e, t);
				};
				a(r, (e) => {
					g.children && e(i);
				}), c(e, n);
			},
			$$slots: { default: !0 }
		}));
	}
	r();
}
//#endregion
export { w as a, b as i, x as n, C as o, S as r, E as t };
