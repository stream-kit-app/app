import { $n as e, Gt as t, Hr as n, Mt as r, On as i, Qn as a, Qr as o, Vr as s, Vt as c, Wn as l, Zn as u, Zr as d, an as f, bt as p, dn as m, in as h, ni as g, nn as _, on as v, pr as y, vt as b } from "../../chunks/index-client-BIJQxc2l.js";
import "../../chunks/disclose-version-YhYaTdgb.js";
import { t as x } from "../../chunks/utils-DVQ4nj8f.js";
import { t as S } from "../../chunks/alert-BK4PV5Qa.js";
import { t as C } from "../../chunks/badge-ClPbYbEF.js";
import { t as w } from "../../chunks/container-BCIxS-nN.js";
import { t as T } from "../../chunks/heading-D9_S_YIf.js";
import { t as E } from "../../chunks/button-CZMpEwOs.js";
//#region ../ui/src/lib/blocks/alert/alert-block.svelte
function D(e, t) {
	n(t, !0);
	{
		let n = y(() => t.block.variant ?? "default");
		S(e, {
			get variant() {
				return i(n);
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
		let n = y(() => t.block.variant ?? "default");
		C(e, {
			get variant() {
				return i(n);
			},
			children: (e, n) => {
				d();
				var r = m();
				l(() => _(r, t.block.label)), h(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	s();
}
//#endregion
//#region ../ui/src/lib/blocks/button/button-block.svelte
var k = v("<div><!></div>");
function A(e, t) {
	n(t, !0);
	var r = k(), a = u(r);
	{
		let e = y(() => t.block.variant ?? "outline");
		E(a, {
			get variant() {
				return i(e);
			},
			get onclick() {
				return t.block.onClick;
			},
			children: (e, n) => {
				d();
				var r = m();
				l(() => _(r, t.block.label)), h(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	o(r), h(e, r), s();
}
//#endregion
//#region ../ui/src/lib/blocks/card/card-block.svelte
var j = v("<p class=\"text-sm text-dark-100\"> </p>"), M = v("<header class=\"mb-4 flex flex-col gap-1\"><!> <!></header>"), N = v("<section class=\"rounded-lg border border-dark-600 bg-dark-800 p-5\"><!> <div class=\"flex flex-col gap-4\"></div></section>");
function P(p, g) {
	n(g, !0);
	var v = N(), y = u(v), b = (n) => {
		var r = M(), i = u(r), a = (e) => {
			T(e, {
				level: "3",
				children: (e, t) => {
					d();
					var n = m();
					l(() => _(n, g.block.title)), h(e, n);
				},
				$$slots: { default: !0 }
			});
		};
		t(i, (e) => {
			g.block.title && e(a);
		});
		var s = e(i, 2), c = (e) => {
			var t = j(), n = u(t, !0);
			o(t), l(() => _(n, g.block.description)), h(e, t);
		};
		t(s, (e) => {
			g.block.description && e(c);
		}), o(r), h(n, r);
	};
	t(y, (e) => {
		(g.block.title || g.block.description) && e(b);
	});
	var x = e(y, 2);
	c(x, 23, () => g.block.blocks, (e, t) => `card-${t}`, (e, t) => {
		var n = f();
		r(a(n), () => g.renderBlock, () => i(t)), h(e, n);
	}), o(x), o(v), h(p, v), s();
}
//#endregion
//#region ../ui/src/lib/blocks/form/form-block.svelte
function F(e, n) {
	var i = f(), o = a(i), s = (e) => {
		var t = f();
		r(a(t), () => n.renderForm, () => n.block), h(e, t);
	};
	t(o, (e) => {
		n.renderForm && e(s);
	}), h(e, i);
}
//#endregion
//#region ../ui/src/lib/blocks/grid/grid-block.svelte
var I = v("<div></div>");
function L(e, t) {
	n(t, !0);
	var i = I();
	c(i, 20, () => t.block.blocks, (e) => e, (e, n) => {
		var i = f();
		r(a(i), () => t.renderBlock, () => n), h(e, i);
	}), o(i), l((e) => b(i, 1, e), [() => p(x({
		"grid gap-4": t.block.columns === 1,
		"grid gap-4 md:grid-cols-2": t.block.columns === 2,
		"grid gap-4 md:grid-cols-3": t.block.columns === 3
	}))]), h(e, i), s();
}
//#endregion
//#region ../ui/src/lib/blocks/heading/heading-block.svelte
function R(e, t) {
	n(t, !0);
	{
		let n = y(() => t.block.level ?? 2);
		T(e, {
			get level() {
				return i(n);
			},
			get subTitle() {
				return t.block.subtitle;
			},
			children: (e, n) => {
				d();
				var r = m();
				l(() => _(r, t.block.title)), h(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	s();
}
//#endregion
//#region ../ui/src/lib/blocks/stack/stack-block.svelte
var z = v("<div class=\"flex flex-col gap-4\"></div>");
function B(e, t) {
	n(t, !0);
	var i = z();
	c(i, 20, () => t.block.blocks, (e) => e, (e, n) => {
		var i = f();
		r(a(i), () => t.renderBlock, () => n), h(e, i);
	}), o(i), h(e, i), s();
}
//#endregion
//#region ../ui/src/lib/blocks/text/text-block.svelte
var V = v("<p class=\"max-w-3xl text-sm leading-6 text-dark-100\"> </p>");
function H(e, t) {
	n(t, !0);
	var r = V(), i = u(r, !0);
	o(r), l(() => _(i, t.block.text)), h(e, r), s();
}
//#endregion
//#region ../ui/src/lib/blocks/page-block.svelte
function U(e, r) {
	n(r, !0);
	let i = (e, t = g) => {
		U(e, {
			get block() {
				return t();
			},
			get renderForm() {
				return r.renderForm;
			}
		});
	};
	var o = f(), c = a(o), l = (e) => {
		R(e, { get block() {
			return r.block;
		} });
	}, u = (e) => {
		H(e, { get block() {
			return r.block;
		} });
	}, d = (e) => {
		D(e, { get block() {
			return r.block;
		} });
	}, p = (e) => {
		O(e, { get block() {
			return r.block;
		} });
	}, m = (e) => {
		P(e, {
			get block() {
				return r.block;
			},
			get renderBlock() {
				return i;
			}
		});
	}, _ = (e) => {
		B(e, {
			get block() {
				return r.block;
			},
			get renderBlock() {
				return i;
			}
		});
	}, v = (e) => {
		L(e, {
			get block() {
				return r.block;
			},
			get renderBlock() {
				return i;
			}
		});
	}, y = (e) => {
		A(e, { get block() {
			return r.block;
		} });
	}, b = (e) => {
		F(e, {
			get block() {
				return r.block;
			},
			get renderForm() {
				return r.renderForm;
			}
		});
	};
	t(c, (e) => {
		r.block.type === "heading" ? e(l) : r.block.type === "text" ? e(u, 1) : r.block.type === "alert" ? e(d, 2) : r.block.type === "badge" ? e(p, 3) : r.block.type === "card" ? e(m, 4) : r.block.type === "stack" ? e(_, 5) : r.block.type === "grid" ? e(v, 6) : r.block.type === "button" ? e(y, 7) : r.block.type === "form" && e(b, 8);
	}), h(e, o), s();
}
//#endregion
//#region ../ui/src/lib/blocks/page-blocks.svelte
var W = v("<p class=\"text-dark-100\"> </p>"), G = v("<header class=\"flex flex-col gap-2\"><!></header>"), K = v("<div class=\"flex max-w-5xl flex-col gap-6\"><!> <div class=\"flex flex-col gap-5\"></div></div>");
function q(n, r) {
	w(n, {
		class: "px-6 py-6",
		children: (n, i) => {
			var a = K(), s = u(a), f = (e) => {
				var n = G(), i = u(n), a = (e) => {
					T(e, {
						level: "1",
						get subTitle() {
							return r.description;
						},
						children: (e, t) => {
							d();
							var n = m();
							l(() => _(n, r.title)), h(e, n);
						},
						$$slots: { default: !0 }
					});
				}, s = (e) => {
					var t = W(), n = u(t, !0);
					o(t), l(() => _(n, r.description)), h(e, t);
				};
				t(i, (e) => {
					r.title ? e(a) : r.description && e(s, 1);
				}), o(n), h(e, n);
			};
			t(s, (e) => {
				(r.title || r.description) && e(f);
			});
			var p = e(s, 2);
			c(p, 20, () => r.blocks, (e) => e, (e, t) => {
				U(e, {
					get block() {
						return t;
					},
					get renderForm() {
						return r.renderForm;
					}
				});
			}), o(p), o(a), h(n, a);
		},
		$$slots: { default: !0 }
	});
}
//#endregion
export { U as PageBlockRenderer, q as PageBlocks };
