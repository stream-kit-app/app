import { Bn as e, Ct as t, Dn as n, Dr as r, Hr as i, Lt as a, Sn as o, Ur as s, Vt as c, a as l, bn as u, cr as d, ei as f, hn as p, ii as m, lr as h, nr as g, sn as _, sr as v, ti as y, ur as b, xn as x, xt as S } from "../../chunks/client-BFeMv2Ma.js";
import { t as C } from "../../chunks/utils-Dqp4W1j8.js";
import "../../chunks/disclose-version-CI8I6yeK.js";
import { t as w } from "../../chunks/alert-DJJ9wAwb.js";
import { t as T } from "../../chunks/badge-vkU4WVxR.js";
import { t as E } from "../../chunks/container-DdNT5tf0.js";
import { t as D } from "../../chunks/heading-Bf1yQHUW.js";
import { t as O } from "../../chunks/button-DGOI4Wpk.js";
import "../../chunks/button-CBfuPA65.js";
import { n as k } from "../../chunks/blueprint-BpxI9dH_.js";
//#region ../ui/src/lib/blocks/alert/alert-block.svelte
function A(t, n) {
	s(n, !0);
	{
		let i = r(() => n.block.variant ?? "default");
		w(t, {
			get variant() {
				return e(i);
			},
			get title() {
				return n.block.title;
			},
			get description() {
				return n.block.description;
			}
		});
	}
	i();
}
//#endregion
//#region ../ui/src/lib/blocks/badge/badge-block.svelte
function j(t, a) {
	s(a, !0);
	{
		let i = r(() => a.block.variant ?? "default");
		T(t, {
			get variant() {
				return e(i);
			},
			children: (e, t) => {
				f();
				var r = n();
				g(() => p(r, a.block.label)), u(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	i();
}
//#endregion
//#region ../ui/src/lib/blocks/button/button-block.svelte
var M = o("<div><!></div>");
function N(t, a) {
	s(a, !0);
	var o = M(), c = v(o);
	{
		let t = r(() => a.block.variant ?? "outline");
		O(c, {
			get variant() {
				return e(t);
			},
			get onclick() {
				return a.block.onClick;
			},
			children: (e, t) => {
				f();
				var r = n();
				g(() => p(r, a.block.label)), u(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	y(o), u(t, o), i();
}
//#endregion
//#region ../ui/src/lib/blocks/card/card-block.svelte
var P = o("<p class=\"text-sm text-dark-100\"> </p>"), F = o("<header class=\"mb-4 flex flex-col gap-1\"><!> <!></header>"), I = o("<!> <div class=\"flex flex-col gap-4\"></div>", 1);
function L(t, r) {
	s(r, !0), k(t, {
		tone: "solid",
		class: "p-5",
		children: (t, i) => {
			var o = I(), s = d(o), l = (e) => {
				var t = F(), i = v(t), a = (e) => {
					D(e, {
						level: "3",
						children: (e, t) => {
							f();
							var i = n();
							g(() => p(i, r.block.title)), u(e, i);
						},
						$$slots: { default: !0 }
					});
				};
				c(i, (e) => {
					r.block.title && e(a);
				});
				var o = b(i, 2), s = (e) => {
					var t = P(), n = h(t, !0);
					g(() => p(n, r.block.description)), u(e, t);
				};
				c(o, (e) => {
					r.block.description && e(s);
				}), y(t), u(e, t);
			};
			c(s, (e) => {
				(r.block.title || r.block.description) && e(l);
			});
			var m = b(s, 2);
			a(m, 23, () => r.block.blocks, (e, t) => `card-${t}`, (t, n) => {
				var i = x(), a = d(i);
				_(a, () => r.renderBlock, () => e(n)), u(t, i);
			}), y(m), u(t, o);
		},
		$$slots: { default: !0 }
	}), i();
}
//#endregion
//#region ../ui/src/lib/blocks/form/form-block.svelte
function R(e, t) {
	var n = x(), r = d(n), i = (e) => {
		var n = x(), r = d(n);
		_(r, () => t.renderForm, () => t.block), u(e, n);
	};
	c(r, (e) => {
		t.renderForm && e(i);
	}), u(e, n);
}
//#endregion
//#region ../ui/src/lib/blocks/grid/grid-block.svelte
var z = o("<div></div>");
function B(e, n) {
	s(n, !0);
	var r = z();
	a(r, 20, () => n.block.blocks, (e) => e, (e, t) => {
		var r = x(), i = d(r);
		_(i, () => n.renderBlock, () => t), u(e, r);
	}), y(r), g((e) => S(r, 1, e), [() => t(C({
		"grid gap-4": n.block.columns === 1,
		"grid gap-4 md:grid-cols-2": n.block.columns === 2,
		"grid gap-4 md:grid-cols-3": n.block.columns === 3
	}))]), u(e, r), i();
}
//#endregion
//#region ../ui/src/lib/blocks/heading/heading-block.svelte
function V(t, a) {
	s(a, !0);
	{
		let i = r(() => a.block.level ?? 2);
		D(t, {
			get level() {
				return e(i);
			},
			get subTitle() {
				return a.block.subtitle;
			},
			children: (e, t) => {
				f();
				var r = n();
				g(() => p(r, a.block.title)), u(e, r);
			},
			$$slots: { default: !0 }
		});
	}
	i();
}
//#endregion
//#region ../ui/src/lib/blocks/stack/stack-block.svelte
var H = o("<div class=\"flex flex-col gap-4\"></div>");
function U(e, t) {
	s(t, !0);
	var n = H();
	a(n, 20, () => t.block.blocks, (e) => e, (e, n) => {
		var r = x(), i = d(r);
		_(i, () => t.renderBlock, () => n), u(e, r);
	}), y(n), u(e, n), i();
}
//#endregion
//#region ../ui/src/lib/blocks/text/text-block.svelte
var W = o("<p class=\"max-w-3xl text-sm leading-6 text-dark-100\"> </p>");
function G(e, t) {
	s(t, !0);
	var n = W(), r = h(n, !0);
	g(() => p(r, t.block.text)), u(e, n), i();
}
//#endregion
//#region ../ui/src/lib/blocks/page-block.svelte
function K(e, t) {
	s(t, !0);
	let n = (e, n = m) => {
		K(e, {
			get block() {
				return n();
			},
			get renderForm() {
				return t.renderForm;
			}
		});
	};
	var r = x(), a = d(r), o = (e) => {
		V(e, { get block() {
			return t.block;
		} });
	}, l = (e) => {
		G(e, { get block() {
			return t.block;
		} });
	}, f = (e) => {
		A(e, { get block() {
			return t.block;
		} });
	}, p = (e) => {
		j(e, { get block() {
			return t.block;
		} });
	}, h = (e) => {
		L(e, {
			get block() {
				return t.block;
			},
			get renderBlock() {
				return n;
			}
		});
	}, g = (e) => {
		U(e, {
			get block() {
				return t.block;
			},
			get renderBlock() {
				return n;
			}
		});
	}, _ = (e) => {
		B(e, {
			get block() {
				return t.block;
			},
			get renderBlock() {
				return n;
			}
		});
	}, v = (e) => {
		N(e, { get block() {
			return t.block;
		} });
	}, y = (e) => {
		R(e, {
			get block() {
				return t.block;
			},
			get renderForm() {
				return t.renderForm;
			}
		});
	};
	c(a, (e) => {
		t.block.type === "heading" ? e(o) : t.block.type === "text" ? e(l, 1) : t.block.type === "alert" ? e(f, 2) : t.block.type === "badge" ? e(p, 3) : t.block.type === "card" ? e(h, 4) : t.block.type === "stack" ? e(g, 5) : t.block.type === "grid" ? e(_, 6) : t.block.type === "button" ? e(v, 7) : t.block.type === "form" && e(y, 8);
	}), u(e, r), i();
}
//#endregion
//#region ../ui/src/lib/blocks/page-blocks.svelte
var q = o("<p class=\"text-dark-100\"> </p>"), J = o("<header class=\"flex flex-col gap-2\"><!></header>"), Y = o("<div class=\"flex max-w-5xl flex-col gap-6\"><!> <div class=\"flex flex-col gap-5\"></div></div>");
function X(e, t) {
	let r = l(t, "showTitle", 3, !0);
	E(e, {
		class: "px-6 py-6",
		children: (e, i) => {
			var o = Y(), s = v(o), l = (e) => {
				var r = J(), i = v(r), a = (e) => {
					D(e, {
						level: "1",
						get subTitle() {
							return t.description;
						},
						children: (e, r) => {
							f();
							var i = n();
							g(() => p(i, t.title)), u(e, i);
						},
						$$slots: { default: !0 }
					});
				}, o = (e) => {
					var n = q(), r = h(n, !0);
					g(() => p(r, t.description)), u(e, n);
				};
				c(i, (e) => {
					t.title ? e(a) : t.description && e(o, 1);
				}), y(r), u(e, r);
			};
			c(s, (e) => {
				r() && (t.title || t.description) && e(l);
			});
			var d = b(s, 2);
			a(d, 20, () => t.blocks, (e) => e, (e, n) => {
				K(e, {
					get block() {
						return n;
					},
					get renderForm() {
						return t.renderForm;
					}
				});
			}), y(d), y(o), u(e, o);
		},
		$$slots: { default: !0 }
	});
}
//#endregion
export { K as PageBlockRenderer, X as PageBlocks };
