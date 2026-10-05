import { An as e, Bn as t, Ct as n, Dr as r, F as i, Hr as a, Lt as o, Mn as s, Nt as c, Sn as l, Ur as u, Vt as d, Wn as f, _r as p, a as m, bn as h, cr as g, ct as _, hn as v, jn as y, lr as b, nr as x, sr as S, ti as C, ur as w, xn as T, xt as E, yr as D } from "./client-BFeMv2Ma.js";
import { t as O } from "./utils-Dqp4W1j8.js";
import "./disclose-version-CI8I6yeK.js";
import { k } from "./dist-C2qYxMMi.js";
import { t as A } from "./portal-D7k4f7sM.js";
import { n as j, t as M } from "./popover-BAEK6C_h.js";
//#region ../ui/src/lib/components/variable-autocomplete/variable-token.ts
var N = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
function P(e, t) {
	let n = e.slice(0, t), r = n.lastIndexOf("{");
	if (r === -1) return null;
	let i = n.slice(r + 1);
	return i.length > 0 && !N.test(i) ? null : {
		start: r,
		end: t,
		query: i
	};
}
function F(e, t, n) {
	let r = e.slice(t.end), i = /^[a-zA-Z0-9_]*\}/.exec(r);
	i && (r = r.slice(i[0].length));
	let a = `{${n}}`;
	return {
		text: `${e.slice(0, t.start)}${a}${r}`,
		caret: t.start + a.length
	};
}
function I(e, t) {
	if (!t) return e;
	let n = t.toLowerCase(), r = [], i = [];
	for (let t of e) {
		let e = t.key.toLowerCase();
		e.startsWith(n) ? r.push(t) : (e.includes(n) || t.label.toLowerCase().includes(n)) && i.push(t);
	}
	return [...r, ...i];
}
//#endregion
//#region ../ui/src/lib/components/variable-autocomplete/variable-autocomplete.svelte.ts
function L(e, t) {
	return `${e}-option-${t}`;
}
var R = [
	"Trigger",
	"Action",
	"Global"
];
function z(e) {
	let t = e ? R.indexOf(e) : -1;
	return t === -1 ? R.length : t;
}
var B = class {
	#e = D(null);
	get element() {
		return t(this.#e);
	}
	set element(e) {
		p(this.#e, e, !0);
	}
	#t = D(0);
	get highlightedIndex() {
		return t(this.#t);
	}
	set highlightedIndex(e) {
		p(this.#t, e, !0);
	}
	#n = D(null);
	#r = null;
	#i;
	#a = r(() => {
		let e = t(this.#n);
		if (!e) return [];
		let n = I(this.#i.variables(), e.query);
		return e.query ? n : [...n].sort((e, t) => z(e.group) - z(t.group) || e.key.localeCompare(t.key));
	});
	get matches() {
		return t(this.#a);
	}
	set matches(e) {
		p(this.#a, e);
	}
	#o = r(() => t(this.#n) !== null && this.matches.length > 0);
	get isOpen() {
		return t(this.#o);
	}
	set isOpen(e) {
		p(this.#o, e);
	}
	constructor(e) {
		this.#i = e;
	}
	get query() {
		return t(this.#n)?.query ?? "";
	}
	refresh = () => {
		let e = this.element;
		if (!e || document.activeElement !== e) {
			this.close();
			return;
		}
		let n = e.selectionStart ?? e.value.length, r = n === (e.selectionEnd ?? n) ? P(e.value, n) : null;
		r?.start !== this.#r && (this.#r = null);
		let i = this.#r === null ? r : null;
		(i?.start !== t(this.#n)?.start || i?.query !== t(this.#n)?.query) && (this.highlightedIndex = 0), p(this.#n, i, !0);
	};
	close = () => {
		p(this.#n, null), this.highlightedIndex = 0;
	};
	select = (e) => {
		let n = this.element, r = t(this.#n);
		if (!n || !r) return;
		let i = F(n.value, r, e);
		this.close(), this.#i.onChange(i.text), f().then(() => {
			n.focus(), n.setSelectionRange(i.caret, i.caret);
		});
	};
	#s = (e) => {
		if (!(e instanceof KeyboardEvent) || !this.isOpen) return;
		let n = this.matches.length;
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), this.highlightedIndex = (this.highlightedIndex + 1) % n;
				return;
			case "ArrowUp":
				e.preventDefault(), this.highlightedIndex = (this.highlightedIndex - 1 + n) % n;
				return;
			case "Enter":
			case "Tab": {
				let t = this.matches[this.highlightedIndex];
				t && (e.preventDefault(), this.select(t.key));
				return;
			}
			case "Escape":
				e.preventDefault(), e.stopPropagation(), this.#r = t(this.#n)?.start ?? null, this.close();
				return;
		}
	};
	#c = (e) => {
		e instanceof KeyboardEvent && e.key !== "ArrowDown" && e.key !== "ArrowUp" && this.refresh();
	};
	attach = (e) => {
		this.element = e;
		let t = () => {
			document.activeElement === e && this.refresh();
		};
		return e.addEventListener("input", this.refresh), e.addEventListener("focus", this.refresh), e.addEventListener("pointerup", this.refresh), e.addEventListener("keydown", this.#s), e.addEventListener("keyup", this.#c), e.addEventListener("blur", this.close), document.addEventListener("selectionchange", t), () => {
			e.removeEventListener("input", this.refresh), e.removeEventListener("focus", this.refresh), e.removeEventListener("pointerup", this.refresh), e.removeEventListener("keydown", this.#s), e.removeEventListener("keyup", this.#c), e.removeEventListener("blur", this.close), document.removeEventListener("selectionchange", t), this.element === e && (this.element = null, this.close());
		};
	};
}, V = l("<li role=\"presentation\" class=\"px-3 pt-2 pb-1 text-xs font-semibold tracking-wide text-dark-300 uppercase\"> </li>"), H = l("<span class=\"rounded border border-dark-500 px-1 text-xs\"> </span>"), U = l("<!> <li role=\"option\"><span class=\"truncate font-mono\"> </span> <span class=\"flex shrink-0 items-center gap-2 text-dark-300\"><!> <span class=\"truncate\"> </span></span></li>", 1), W = l("<ul role=\"listbox\"></ul>");
function G(e, l) {
	u(l, !0);
	let f = m(l, "autocomplete", 7), N = m(l, "maybeLabel", 3, "maybe"), P = D(null);
	function F(e) {
		if (f().query) return !1;
		let t = f().matches[e]?.group;
		return !!t && f().matches[e - 1]?.group !== t;
	}
	function I(e) {
		e || f().close();
	}
	function R(e) {
		e.target === f().element && e.preventDefault();
	}
	k(() => f().highlightedIndex, (e) => {
		t(P)?.querySelector(`#${CSS.escape(L(l.id, e))}`)?.scrollIntoView({ block: "nearest" });
	});
	var z = T(), B = g(z);
	c(B, () => M, (e, a) => {
		a(e, {
			get open() {
				return f().isOpen;
			},
			onOpenChange: I,
			children: (e, a) => {
				var u = T(), m = g(u);
				c(m, () => A, (e, a) => {
					a(e, {
						children: (e, a) => {
							var u = T(), m = g(u);
							c(m, () => j, (e, a) => {
								a(e, {
									get customAnchor() {
										return f().element;
									},
									side: "bottom",
									align: "start",
									sideOffset: 4,
									collisionPadding: 8,
									trapFocus: !1,
									preventScroll: !1,
									onOpenAutoFocus: (e) => e.preventDefault(),
									onCloseAutoFocus: (e) => e.preventDefault(),
									onInteractOutside: R,
									class: "z-[100] max-h-64 min-w-56 overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none",
									style: "width: var(--bits-popover-anchor-width)",
									children: (e, a) => {
										var c = W();
										o(c, 23, () => f().matches, (e) => e.key, (e, i, a) => {
											var o = U(), c = g(o), u = (e) => {
												var n = V(), r = b(n, !0);
												x(() => v(r, t(i).group)), h(e, n);
											}, p = r(() => F(t(a)));
											d(c, (e) => {
												t(p) && e(u);
											});
											var m = w(c, 2), T = S(m), D = b(T, !0), k = w(T, 2), A = S(k), j = (e) => {
												var t = H(), n = b(t, !0);
												x(() => v(n, N())), h(e, t);
											};
											d(A, (e) => {
												t(i).maybe && e(j);
											});
											var M = w(A, 2), P = b(M, !0);
											C(k), C(m), x((e, n) => {
												_(m, "id", e), _(m, "aria-selected", t(a) === f().highlightedIndex), E(m, 1, n), _(m, "title", t(i).description), v(D, `{${t(i).key}}`), v(P, t(i).label);
											}, [() => L(l.id, t(a)), () => n(O("flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50 transition-colors duration-150 hover:bg-dark-700", t(a) === f().highlightedIndex && "bg-dark-700"))]), y("pointerdown", m, (e) => {
												e.preventDefault(), f().select(t(i).key);
											}), s("pointerenter", m, () => f().highlightedIndex = t(a)), h(e, o);
										}), C(c), i(c, (e) => p(P, e), () => t(P)), x(() => _(c, "id", l.id)), h(e, c);
									},
									$$slots: { default: !0 }
								});
							}), h(e, u);
						},
						$$slots: { default: !0 }
					});
				}), h(e, u);
			},
			$$slots: { default: !0 }
		});
	}), h(e, z), a();
}
e(["pointerdown"]);
//#endregion
export { P as a, F as i, B as n, I as o, L as r, G as t };
