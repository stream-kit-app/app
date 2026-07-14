import { $n as e, Dt as t, Hr as n, On as r, Qn as i, Qr as a, Qt as o, Vr as s, Wn as c, Zn as l, Zr as u, a as d, cn as f, dt as p, hn as m, jt as h, ln as g, ni as _, on as v, pr as y, pt as b, un as x } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as S } from "../../chunks/utils-DJt177zd.js";
import { t as C } from "../../chunks/alert-Xl0et5iT.js";
import { t as w } from "../../chunks/badge-DWgt6sX1.js";
import { t as T } from "../../chunks/container-CXvttRa1.js";
import { t as E } from "../../chunks/heading-DkoXAyj9.js";
import { t as D } from "../../chunks/button-C7Vln2y_.js";
//#region ../ui/src/lib/blocks/alert/alert-block.svelte
function O(e, t) {
	n(t, !0);
	{
		let n = y(() => t.block.variant ?? "default");
		C(e, {
			get variant() {
				return r(n);
			},
			get title() {
				return t.block.title;
			},
			get description() {
				return t.block.description;
			}
		});
	}
	s();
}
//#endregion
//#region ../ui/src/lib/blocks/badge/badge-block.svelte
function k(e, t) {
	n(t, !0);
	{
		let n = y(() => t.block.variant ?? "default");
		w(e, {
			get variant() {
				return r(n);
			},
			children: (e, n) => {
				u();
				var r = m();
				c(() => v(r, t.block.label)), f(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	s();
}
//#endregion
//#region ../ui/src/lib/blocks/button/button-block.svelte
var A = x("<div><!></div>");
function j(e, t) {
	n(t, !0);
	var i = A(), o = l(i);
	{
		let e = y(() => t.block.variant ?? "outline");
		D(o, {
			get variant() {
				return r(e);
			},
			get onclick() {
				return t.block.onClick;
			},
			children: (e, n) => {
				u();
				var r = m();
				c(() => v(r, t.block.label)), f(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	a(i), f(e, i), s();
}
//#endregion
//#region ../ui/src/lib/blocks/card/card-block.svelte
var M = x("<p class=\"text-sm text-dark-100\"> </p>"), N = x("<header class=\"mb-4 flex flex-col gap-1\"><!> <!></header>"), P = x("<section class=\"rounded-lg border border-dark-600 bg-dark-800 p-5\"><!> <div class=\"flex flex-col gap-4\"></div></section>");
function F(d, p) {
	n(p, !0);
	var _ = P(), y = l(_), b = (t) => {
		var n = N(), r = l(n), i = (e) => {
			E(e, {
				level: "3",
				children: (e, t) => {
					u();
					var n = m();
					c(() => v(n, p.block.title)), f(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		h(r, (e) => {
			p.block.title && e(i);
		});
		var o = e(r, 2), s = (e) => {
			var t = M(), n = l(t, !0);
			a(t), c(() => v(n, p.block.description)), f(e, t);
		};
		h(o, (e) => {
			p.block.description && e(s);
		}), a(n), f(t, n);
	};
	h(y, (e) => {
		(p.block.title || p.block.description) && e(b);
	});
	var x = e(y, 2);
	t(x, 23, () => p.block.blocks, (e, t) => `card-${t}`, (e, t) => {
		var n = g();
		o(i(n), () => p.renderBlock, () => r(t)), f(e, n);
	}), a(x), a(_), f(d, _), s();
}
//#endregion
//#region ../ui/src/lib/blocks/form/form-block.svelte
function I(e, t) {
	var n = g(), r = i(n), a = (e) => {
		var n = g();
		o(i(n), () => t.renderForm, () => t.block), f(e, n);
	};
	h(r, (e) => {
		t.renderForm && e(a);
	}), f(e, n);
}
//#endregion
//#region ../ui/src/lib/blocks/grid/grid-block.svelte
var L = x("<div></div>");
function R(e, r) {
	n(r, !0);
	var l = L();
	t(l, 20, () => r.block.blocks, (e) => e, (e, t) => {
		var n = g();
		o(i(n), () => r.renderBlock, () => t), f(e, n);
	}), a(l), c((e) => p(l, 1, e), [() => b(S({
		"grid gap-4": r.block.columns === 1,
		"grid gap-4 md:grid-cols-2": r.block.columns === 2,
		"grid gap-4 md:grid-cols-3": r.block.columns === 3
	}))]), f(e, l), s();
}
//#endregion
//#region ../ui/src/lib/blocks/heading/heading-block.svelte
function z(e, t) {
	n(t, !0);
	{
		let n = y(() => t.block.level ?? 2);
		E(e, {
			get level() {
				return r(n);
			},
			get subTitle() {
				return t.block.subtitle;
			},
			children: (e, n) => {
				u();
				var r = m();
				c(() => v(r, t.block.title)), f(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	s();
}
//#endregion
//#region ../ui/src/lib/blocks/stack/stack-block.svelte
var B = x("<div class=\"flex flex-col gap-4\"></div>");
function V(e, r) {
	n(r, !0);
	var c = B();
	t(c, 20, () => r.block.blocks, (e) => e, (e, t) => {
		var n = g();
		o(i(n), () => r.renderBlock, () => t), f(e, n);
	}), a(c), f(e, c), s();
}
//#endregion
//#region ../ui/src/lib/blocks/text/text-block.svelte
var H = x("<p class=\"max-w-3xl text-sm leading-6 text-dark-100\"> </p>");
function U(e, t) {
	n(t, !0);
	var r = H(), i = l(r, !0);
	a(r), c(() => v(i, t.block.text)), f(e, r), s();
}
//#endregion
//#region ../ui/src/lib/blocks/page-block.svelte
function W(e, t) {
	n(t, !0);
	let r = (e, n = _) => {
		W(e, {
			get block() {
				return n();
			},
			get renderForm() {
				return t.renderForm;
			}
		});
	};
	var a = g(), o = i(a), c = (e) => {
		z(e, { get block() {
			return t.block;
		} });
	}, l = (e) => {
		U(e, { get block() {
			return t.block;
		} });
	}, u = (e) => {
		O(e, { get block() {
			return t.block;
		} });
	}, d = (e) => {
		k(e, { get block() {
			return t.block;
		} });
	}, p = (e) => {
		F(e, {
			get block() {
				return t.block;
			},
			get renderBlock() {
				return r;
			}
		});
	}, m = (e) => {
		V(e, {
			get block() {
				return t.block;
			},
			get renderBlock() {
				return r;
			}
		});
	}, v = (e) => {
		R(e, {
			get block() {
				return t.block;
			},
			get renderBlock() {
				return r;
			}
		});
	}, y = (e) => {
		j(e, { get block() {
			return t.block;
		} });
	}, b = (e) => {
		I(e, {
			get block() {
				return t.block;
			},
			get renderForm() {
				return t.renderForm;
			}
		});
	};
	h(o, (e) => {
		t.block.type === "heading" ? e(c) : t.block.type === "text" ? e(l, 1) : t.block.type === "alert" ? e(u, 2) : t.block.type === "badge" ? e(d, 3) : t.block.type === "card" ? e(p, 4) : t.block.type === "stack" ? e(m, 5) : t.block.type === "grid" ? e(v, 6) : t.block.type === "button" ? e(y, 7) : t.block.type === "form" && e(b, 8);
	}), f(e, a), s();
}
//#endregion
//#region ../ui/src/lib/blocks/page-blocks.svelte
var G = x("<p class=\"text-dark-100\"> </p>"), K = x("<header class=\"flex flex-col gap-2\"><!></header>"), q = x("<div class=\"flex max-w-5xl flex-col gap-6\"><!> <div class=\"flex flex-col gap-5\"></div></div>");
function J(n, r) {
	let i = d(r, "showTitle", 3, !0);
	T(n, {
		class: "px-6 py-6",
		children: (n, o) => {
			var s = q(), d = l(s), p = (e) => {
				var t = K(), n = l(t), i = (e) => {
					E(e, {
						level: "1",
						get subTitle() {
							return r.description;
						},
						children: (e, t) => {
							u();
							var n = m();
							c(() => v(n, r.title)), f(e, n);
						},
						$$slots: { default: !0 }
					});
				}, o = (e) => {
					var t = G(), n = l(t, !0);
					a(t), c(() => v(n, r.description)), f(e, t);
				};
				h(n, (e) => {
					r.title ? e(i) : r.description && e(o, 1);
				}), a(t), f(e, t);
			};
			h(d, (e) => {
				i() && (r.title || r.description) && e(p);
			});
			var g = e(d, 2);
			t(g, 20, () => r.blocks, (e) => e, (e, t) => {
				W(e, {
					get block() {
						return t;
					},
					get renderForm() {
						return r.renderForm;
					}
				});
			}), a(g), a(s), f(n, s);
		},
		$$slots: { default: !0 }
	});
}
//#endregion
export { W as PageBlockRenderer, J as PageBlocks };
