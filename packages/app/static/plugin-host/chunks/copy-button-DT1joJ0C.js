import { Hr as e, On as t, Qn as n, Qt as r, Vr as i, Wt as a, Yt as o, a as s, cn as c, cr as l, jt as u, ln as d, ni as f, o as p, or as m, pr as h, s as g } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { t as _ } from "./utils-DcMuIKIs.js";
import { n as v } from "./attachments-0CZb6zsq.js";
import { t as y } from "./button-rY2iKe1u.js";
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
	#e = l();
	get copiedKey() {
		return t(this.#e);
	}
	set copiedKey(e) {
		m(this.#e, e, !0);
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
}, T = new Set([
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
function E(l, m) {
	e(m, !0);
	let S = s(m, "label", 3, "Copy"), C = s(m, "copiedLabel", 3, "Copied"), E = s(m, "variant", 3, "ghost"), D = p(m, T), O = new w(), k = h(() => O.isCopied()), A = h(() => m.tooltip ?? !m.children);
	async function j(e) {
		e.preventDefault(), e.stopPropagation();
		let t = typeof m.value == "function" ? await m.value() : m.value;
		t !== void 0 && (await O.copy(t, "value") ? m.onCopied?.(t) : m.onCopyError?.());
	}
	o(() => O.destroy());
	{
		let e = h(() => m.size ?? (m.children ? "sm" : "icon-sm")), i = h(() => t(k) ? x : b), o = h(() => m.children ? void 0 : t(k) ? C() : S()), s = h(() => _("transition-none", t(k) && "text-success-400", m.class));
		y(l, g(() => D, {
			type: "button",
			get variant() {
				return E();
			},
			get size() {
				return t(e);
			},
			get icon() {
				return t(i);
			},
			get "aria-label"() {
				return t(o);
			},
			get class() {
				return t(s);
			},
			onclick: (e) => void j(e),
			[a()]: (e) => ((t(A) ? v(() => t(k) ? C() : S()) : void 0) || f)(e),
			children: (e, t) => {
				var i = d(), a = n(i), o = (e) => {
					var t = d();
					r(n(t), () => m.children), c(e, t);
				};
				u(a, (e) => {
					m.children && e(o);
				}), c(e, i);
			},
			$$slots: { default: !0 }
		}));
	}
	i();
}
//#endregion
export { w as a, b as i, x as n, C as o, S as r, E as t };
