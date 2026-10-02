import { $ as e, $n as t, Ct as n, Dt as r, E as i, Hr as a, Mn as o, On as s, Qn as c, Qr as l, Vr as u, Wn as d, Zn as f, a as p, bn as m, cn as h, cr as g, dt as _, jt as v, ln as y, on as b, or as x, pr as S, pt as C, un as w, vn as T, yn as E } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import { t as D } from "./utils-DcMuIKIs.js";
import { t as O } from "./portal-BFSsRkE3.js";
import { n as k, t as A } from "./popover-OznKOTCT.js";
import { n as j } from "./dist-DeJB5afo.js";
//#region ../ui/src/lib/components/variable-autocomplete/variable-token.ts
var M = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
function N(e, t) {
	let n = e.slice(0, t), r = n.lastIndexOf("{");
	if (r === -1) return null;
	let i = n.slice(r + 1);
	return i.length > 0 && !M.test(i) ? null : {
		start: r,
		end: t,
		query: i
	};
}
function P(e, t, n) {
	let r = e.slice(t.end), i = /^[a-zA-Z0-9_]*\}/.exec(r);
	i && (r = r.slice(i[0].length));
	let a = `{${n}}`;
	return {
		text: `${e.slice(0, t.start)}${a}${r}`,
		caret: t.start + a.length
	};
}
function F(e, t) {
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
function I(e, t) {
	return `${e}-option-${t}`;
}
var L = [
	"Trigger",
	"Action",
	"Global"
];
function R(e) {
	let t = e ? L.indexOf(e) : -1;
	return t === -1 ? L.length : t;
}
var z = class {
	#e = g(null);
	get element() {
		return s(this.#e);
	}
	set element(e) {
		x(this.#e, e, !0);
	}
	#t = g(0);
	get highlightedIndex() {
		return s(this.#t);
	}
	set highlightedIndex(e) {
		x(this.#t, e, !0);
	}
	#n = g(null);
	#r = null;
	#i;
	#a = S(() => {
		let e = s(this.#n);
		if (!e) return [];
		let t = F(this.#i.variables(), e.query);
		return e.query ? t : [...t].sort((e, t) => R(e.group) - R(t.group) || e.key.localeCompare(t.key));
	});
	get matches() {
		return s(this.#a);
	}
	set matches(e) {
		x(this.#a, e);
	}
	#o = S(() => s(this.#n) !== null && this.matches.length > 0);
	get isOpen() {
		return s(this.#o);
	}
	set isOpen(e) {
		x(this.#o, e);
	}
	constructor(e) {
		this.#i = e;
	}
	get query() {
		return s(this.#n)?.query ?? "";
	}
	refresh = () => {
		let e = this.element;
		if (!e || document.activeElement !== e) {
			this.close();
			return;
		}
		let t = e.selectionStart ?? e.value.length, n = t === (e.selectionEnd ?? t) ? N(e.value, t) : null;
		n?.start !== this.#r && (this.#r = null);
		let r = this.#r === null ? n : null;
		(r?.start !== s(this.#n)?.start || r?.query !== s(this.#n)?.query) && (this.highlightedIndex = 0), x(this.#n, r, !0);
	};
	close = () => {
		x(this.#n, null), this.highlightedIndex = 0;
	};
	select = (e) => {
		let t = this.element, n = s(this.#n);
		if (!t || !n) return;
		let r = P(t.value, n, e);
		this.close(), this.#i.onChange(r.text), o().then(() => {
			t.focus(), t.setSelectionRange(r.caret, r.caret);
		});
	};
	#s = (e) => {
		if (!(e instanceof KeyboardEvent) || !this.isOpen) return;
		let t = this.matches.length;
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), this.highlightedIndex = (this.highlightedIndex + 1) % t;
				return;
			case "ArrowUp":
				e.preventDefault(), this.highlightedIndex = (this.highlightedIndex - 1 + t) % t;
				return;
			case "Enter":
			case "Tab": {
				let t = this.matches[this.highlightedIndex];
				t && (e.preventDefault(), this.select(t.key));
				return;
			}
			case "Escape":
				e.preventDefault(), e.stopPropagation(), this.#r = s(this.#n)?.start ?? null, this.close();
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
}, B = w("<li role=\"presentation\" class=\"px-3 pt-2 pb-1 text-xs font-semibold tracking-wide text-dark-300 uppercase\"> </li>"), V = w("<span class=\"rounded border border-dark-500 px-1 text-xs\"> </span>"), H = w("<!> <li role=\"option\"><span class=\"truncate font-mono\"> </span> <span class=\"flex shrink-0 items-center gap-2 text-dark-300\"><!> <span class=\"truncate\"> </span></span></li>", 1), U = w("<ul role=\"listbox\"></ul>");
function W(o, w) {
	a(w, !0);
	let T = p(w, "autocomplete", 7), M = p(w, "maybeLabel", 3, "maybe"), N = g(null);
	function P(e) {
		if (T().query) return !1;
		let t = T().matches[e]?.group;
		return !!t && T().matches[e - 1]?.group !== t;
	}
	function F(e) {
		e || T().close();
	}
	function L(e) {
		e.target === T().element && e.preventDefault();
	}
	j(() => T().highlightedIndex, (e) => {
		s(N)?.querySelector(`#${CSS.escape(I(w.id, e))}`)?.scrollIntoView({ block: "nearest" });
	});
	var R = y();
	n(c(R), () => A, (a, o) => {
		o(a, {
			get open() {
				return T().isOpen;
			},
			onOpenChange: F,
			children: (a, o) => {
				var u = y();
				n(c(u), () => O, (a, o) => {
					o(a, {
						children: (a, o) => {
							var u = y();
							n(c(u), () => k, (n, a) => {
								a(n, {
									get customAnchor() {
										return T().element;
									},
									side: "bottom",
									align: "start",
									sideOffset: 4,
									collisionPadding: 8,
									trapFocus: !1,
									preventScroll: !1,
									onOpenAutoFocus: (e) => e.preventDefault(),
									onCloseAutoFocus: (e) => e.preventDefault(),
									onInteractOutside: L,
									class: "z-[100] max-h-64 min-w-56 overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none",
									style: "width: var(--bits-popover-anchor-width)",
									children: (n, a) => {
										var o = U();
										r(o, 23, () => T().matches, (e) => e.key, (n, r, i) => {
											var a = H(), o = c(a), u = (e) => {
												var t = B(), n = f(t, !0);
												l(t), d(() => b(n, s(r).group)), h(e, t);
											}, p = S(() => P(s(i)));
											v(o, (e) => {
												s(p) && e(u);
											});
											var g = t(o, 2), y = f(g), x = f(y, !0);
											l(y);
											var O = t(y, 2), k = f(O), A = (e) => {
												var t = V(), n = f(t, !0);
												l(t), d(() => b(n, M())), h(e, t);
											};
											v(k, (e) => {
												s(r).maybe && e(A);
											});
											var j = t(k, 2), N = f(j, !0);
											l(j), l(O), l(g), d((t, n) => {
												e(g, "id", t), e(g, "aria-selected", s(i) === T().highlightedIndex), _(g, 1, n), e(g, "title", s(r).description), b(x, `{${s(r).key}}`), b(N, s(r).label);
											}, [() => I(w.id, s(i)), () => C(D("flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50 transition-colors duration-150 hover:bg-dark-700", s(i) === T().highlightedIndex && "bg-dark-700"))]), E("pointerdown", g, (e) => {
												e.preventDefault(), T().select(s(r).key);
											}), m("pointerenter", g, () => T().highlightedIndex = s(i)), h(n, a);
										}), l(o), i(o, (e) => x(N, e), () => s(N)), d(() => e(o, "id", w.id)), h(n, o);
									},
									$$slots: { default: !0 }
								});
							}), h(a, u);
						},
						$$slots: { default: !0 }
					});
				}), h(a, u);
			},
			$$slots: { default: !0 }
		});
	}), h(o, R), u();
}
T(["pointerdown"]);
//#endregion
export { N as a, P as i, z as n, F as o, I as r, W as t };
