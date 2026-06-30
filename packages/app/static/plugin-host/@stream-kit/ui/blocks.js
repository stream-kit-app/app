import { $n as e, Dt as t, Hr as n, On as r, Qn as i, Qr as a, Qt as o, Vr as s, Wn as c, Zn as l, Zr as u, cn as d, dt as f, hn as p, jt as m, ln as h, ni as g, on as _, pr as v, pt as y, un as b } from "../../chunks/client-xxWnFgeR.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as x } from "../../chunks/utils-DJt177zd.js";
import { t as S } from "../../chunks/alert-DaAyF_GE.js";
import { t as C } from "../../chunks/badge-CgynBC85.js";
import { t as w } from "../../chunks/container-CXvttRa1.js";
import { t as T } from "../../chunks/heading-DkoXAyj9.js";
import { t as E } from "../../chunks/button-BmdXJB1F.js";
//#region ../ui/src/lib/blocks/alert/alert-block.svelte
function D(e, t) {
	n(t, !0);
	{
		let n = v(() => t.block.variant ?? "default");
		S(e, {
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
function O(e, t) {
	n(t, !0);
	{
		let n = v(() => t.block.variant ?? "default");
		C(e, {
			get variant() {
				return r(n);
			},
			children: (e, n) => {
				u();
				var r = p();
				c(() => _(r, t.block.label)), d(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	s();
}
//#endregion
//#region ../ui/src/lib/blocks/button/button-block.svelte
var k = b("<div><!></div>");
function A(e, t) {
	n(t, !0);
	var i = k(), o = l(i);
	{
		let e = v(() => t.block.variant ?? "outline");
		E(o, {
			get variant() {
				return r(e);
			},
			get onclick() {
				return t.block.onClick;
			},
			children: (e, n) => {
				u();
				var r = p();
				c(() => _(r, t.block.label)), d(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	a(i), d(e, i), s();
}
//#endregion
//#region ../ui/src/lib/blocks/card/card-block.svelte
var j = b("<p class=\"text-sm text-dark-100\"> </p>"), M = b("<header class=\"mb-4 flex flex-col gap-1\"><!> <!></header>"), N = b("<section class=\"rounded-lg border border-dark-600 bg-dark-800 p-5\"><!> <div class=\"flex flex-col gap-4\"></div></section>");
function P(f, g) {
	n(g, !0);
	var v = N(), y = l(v), b = (t) => {
		var n = M(), r = l(n), i = (e) => {
			T(e, {
				level: "3",
				children: (e, t) => {
					u();
					var n = p();
					c(() => _(n, g.block.title)), d(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		m(r, (e) => {
			g.block.title && e(i);
		});
		var o = e(r, 2), s = (e) => {
			var t = j(), n = l(t, !0);
			a(t), c(() => _(n, g.block.description)), d(e, t);
		};
		m(o, (e) => {
			g.block.description && e(s);
		}), a(n), d(t, n);
	};
	m(y, (e) => {
		(g.block.title || g.block.description) && e(b);
	});
	var x = e(y, 2);
	t(x, 23, () => g.block.blocks, (e, t) => `card-${t}`, (e, t) => {
		var n = h();
		o(i(n), () => g.renderBlock, () => r(t)), d(e, n);
	}), a(x), a(v), d(f, v), s();
}
//#endregion
//#region ../ui/src/lib/blocks/form/form-block.svelte
function F(e, t) {
	var n = h(), r = i(n), a = (e) => {
		var n = h();
		o(i(n), () => t.renderForm, () => t.block), d(e, n);
	};
	m(r, (e) => {
		t.renderForm && e(a);
	}), d(e, n);
}
//#endregion
//#region ../ui/src/lib/blocks/grid/grid-block.svelte
var I = b("<div></div>");
function L(e, r) {
	n(r, !0);
	var l = I();
	t(l, 20, () => r.block.blocks, (e) => e, (e, t) => {
		var n = h();
		o(i(n), () => r.renderBlock, () => t), d(e, n);
	}), a(l), c((e) => f(l, 1, e), [() => y(x({
		"grid gap-4": r.block.columns === 1,
		"grid gap-4 md:grid-cols-2": r.block.columns === 2,
		"grid gap-4 md:grid-cols-3": r.block.columns === 3
	}))]), d(e, l), s();
}
//#endregion
//#region ../ui/src/lib/blocks/heading/heading-block.svelte
function R(e, t) {
	n(t, !0);
	{
		let n = v(() => t.block.level ?? 2);
		T(e, {
			get level() {
				return r(n);
			},
			get subTitle() {
				return t.block.subtitle;
			},
			children: (e, n) => {
				u();
				var r = p();
				c(() => _(r, t.block.title)), d(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	s();
}
//#endregion
//#region ../ui/src/lib/blocks/stack/stack-block.svelte
var z = b("<div class=\"flex flex-col gap-4\"></div>");
function B(e, r) {
	n(r, !0);
	var c = z();
	t(c, 20, () => r.block.blocks, (e) => e, (e, t) => {
		var n = h();
		o(i(n), () => r.renderBlock, () => t), d(e, n);
	}), a(c), d(e, c), s();
}
//#endregion
//#region ../ui/src/lib/blocks/text/text-block.svelte
var V = b("<p class=\"max-w-3xl text-sm leading-6 text-dark-100\"> </p>");
function H(e, t) {
	n(t, !0);
	var r = V(), i = l(r, !0);
	a(r), c(() => _(i, t.block.text)), d(e, r), s();
}
//#endregion
//#region ../ui/src/lib/blocks/page-block.svelte
function U(e, t) {
	n(t, !0);
	let r = (e, n = g) => {
		U(e, {
			get block() {
				return n();
			},
			get renderForm() {
				return t.renderForm;
			}
		});
	};
	var a = h(), o = i(a), c = (e) => {
		R(e, { get block() {
			return t.block;
		} });
	}, l = (e) => {
		H(e, { get block() {
			return t.block;
		} });
	}, u = (e) => {
		D(e, { get block() {
			return t.block;
		} });
	}, f = (e) => {
		O(e, { get block() {
			return t.block;
		} });
	}, p = (e) => {
		P(e, {
			get block() {
				return t.block;
			},
			get renderBlock() {
				return r;
			}
		});
	}, _ = (e) => {
		B(e, {
			get block() {
				return t.block;
			},
			get renderBlock() {
				return r;
			}
		});
	}, v = (e) => {
		L(e, {
			get block() {
				return t.block;
			},
			get renderBlock() {
				return r;
			}
		});
	}, y = (e) => {
		A(e, { get block() {
			return t.block;
		} });
	}, b = (e) => {
		F(e, {
			get block() {
				return t.block;
			},
			get renderForm() {
				return t.renderForm;
			}
		});
	};
	m(o, (e) => {
		t.block.type === "heading" ? e(c) : t.block.type === "text" ? e(l, 1) : t.block.type === "alert" ? e(u, 2) : t.block.type === "badge" ? e(f, 3) : t.block.type === "card" ? e(p, 4) : t.block.type === "stack" ? e(_, 5) : t.block.type === "grid" ? e(v, 6) : t.block.type === "button" ? e(y, 7) : t.block.type === "form" && e(b, 8);
	}), d(e, a), s();
}
//#endregion
//#region ../ui/src/lib/blocks/page-blocks.svelte
var W = b("<p class=\"text-dark-100\"> </p>"), G = b("<header class=\"flex flex-col gap-2\"><!></header>"), K = b("<div class=\"flex max-w-5xl flex-col gap-6\"><!> <div class=\"flex flex-col gap-5\"></div></div>");
function q(n, r) {
	w(n, {
		class: "px-6 py-6",
		children: (n, i) => {
			var o = K(), s = l(o), f = (e) => {
				var t = G(), n = l(t), i = (e) => {
					T(e, {
						level: "1",
						get subTitle() {
							return r.description;
						},
						children: (e, t) => {
							u();
							var n = p();
							c(() => _(n, r.title)), d(e, n);
						},
						$$slots: { default: !0 }
					});
				}, o = (e) => {
					var t = W(), n = l(t, !0);
					a(t), c(() => _(n, r.description)), d(e, t);
				};
				m(n, (e) => {
					r.title ? e(i) : r.description && e(o, 1);
				}), a(t), d(e, t);
			};
			m(s, (e) => {
				(r.title || r.description) && e(f);
			});
			var h = e(s, 2);
			t(h, 20, () => r.blocks, (e) => e, (e, t) => {
				U(e, {
					get block() {
						return t;
					},
					get renderForm() {
						return r.renderForm;
					}
				});
			}), a(h), a(o), d(n, o);
		},
		$$slots: { default: !0 }
	});
}
//#endregion
export { U as PageBlockRenderer, q as PageBlocks };
