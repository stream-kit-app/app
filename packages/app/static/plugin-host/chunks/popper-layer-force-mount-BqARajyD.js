import { Bn as e, Dr as t, Hr as n, Sn as r, Ur as i, Vt as a, _r as o, a as s, an as c, bn as l, cr as u, ii as d, o as f, pr as p, rr as m, s as h, sn as g, ur as _, xn as v, yr as y } from "./client-BFeMv2Ma.js";
import "./disclose-version-CI8I6yeK.js";
import { C as b, D as x, E as S, b as C, d as w, h as T, j as E, x as D } from "./animations-complete-2GhqX7WL.js";
import { a as O, i as k, s as A, t as j } from "./use-id-BW6hjw-g.js";
import { s as M } from "./presence-manager.svelte-cK0pnbQH.js";
import { c as ee, l as te, n as ne, r as re, t as ie } from "./scroll-lock-qBq_Ag7a.js";
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/floating-layer/floating-root.svelte.js
var ae = new b("Floating.Root"), oe = new b("Floating.Root"), se = class e {
	static create(t = !1) {
		return t ? oe.set(new e()) : ae.set(new e());
	}
	anchorNode = E(null);
	customAnchorNode = E(null);
	triggerNode = E(null);
	constructor() {
		m(() => {
			this.customAnchorNode.current ? typeof this.customAnchorNode.current == "string" ? this.anchorNode.current = document.querySelector(this.customAnchorNode.current) : this.anchorNode.current = this.customAnchorNode.current : this.anchorNode.current = this.triggerNode.current;
		});
	}
}, ce = class e {
	static create(t, n = !1) {
		return n ? new e(t, oe.get()) : new e(t, ae.get());
	}
	opts;
	root;
	constructor(e, t) {
		this.opts = e, this.root = t, t.triggerNode = e.virtualEl && e.virtualEl.current ? S(e.virtualEl.current) : e.ref;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer.svelte
function le(e, t) {
	i(t, !0);
	let r = s(t, "tooltip", 3, !1);
	se.create(r());
	var a = v(), o = u(a);
	g(o, () => t.children ?? d), l(e, a), n();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/floating-svelte/floating-utils.svelte.js
function N(e) {
	return typeof e == "function" ? e() : e;
}
function ue(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function de(e, t) {
	let n = ue(e);
	return Math.round(t * n) / n;
}
function fe(e) {
	return {
		[`--bits-${e}-content-transform-origin`]: "var(--bits-floating-transform-origin)",
		[`--bits-${e}-content-available-width`]: "var(--bits-floating-available-width)",
		[`--bits-${e}-content-available-height`]: "var(--bits-floating-available-height)",
		[`--bits-${e}-anchor-width`]: "var(--bits-floating-anchor-width)",
		[`--bits-${e}-anchor-height`]: "var(--bits-floating-anchor-height)"
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var pe = [
	"top",
	"right",
	"bottom",
	"left"
], P = Math.min, F = Math.max, me = Math.round, he = Math.floor, I = (e) => ({
	x: e,
	y: e
}), ge = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function _e(e, t, n) {
	return F(e, P(t, n));
}
function L(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function R(e) {
	return e.split("-")[0];
}
function z(e) {
	return e.split("-")[1];
}
function ve(e) {
	return e === "x" ? "y" : "x";
}
function ye(e) {
	return e === "y" ? "height" : "width";
}
function B(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function be(e) {
	return ve(B(e));
}
function xe(e, t, n) {
	n === void 0 && (n = !1);
	let r = z(e), i = be(e), a = ye(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Ae(o)), [o, Ae(o)];
}
function Se(e) {
	let t = Ae(e);
	return [
		Ce(e),
		t,
		Ce(t)
	];
}
function Ce(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var we = ["left", "right"], Te = ["right", "left"], Ee = ["top", "bottom"], De = ["bottom", "top"];
function Oe(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Te : we : t ? we : Te;
		case "left":
		case "right": return t ? Ee : De;
		default: return [];
	}
}
function ke(e, t, n, r) {
	let i = z(e), a = Oe(R(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Ce)))), a;
}
function Ae(e) {
	let t = R(e);
	return ge[t] + e.slice(t.length);
}
function je(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Me(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : je(e);
}
function Ne(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Pe(e, t, n) {
	let { reference: r, floating: i } = e, a = B(t), o = be(t), s = ye(o), c = R(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = z(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Fe(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = L(t, e), p = Me(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Ne(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = Ne(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Ie = 50, Le = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Fe
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Pe(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Ie && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Pe(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Re = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = L(e, t) || {};
		if (l == null) return {};
		let d = Me(u), f = {
			x: n,
			y: r
		}, p = be(i), m = ye(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = P(d[_], T), D = P(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = _e(E, k, O), j = !c.arrow && z(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, M = j ? k < E ? k - E : k - O : 0;
		return {
			[p]: f[p] + M,
			data: {
				[p]: A,
				centerOffset: k - A - M,
				...j && { alignmentOffset: M }
			},
			reset: j
		};
	}
}), ze = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = L(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = R(r), _ = B(o), v = R(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Ae(o)] : Se(o)), x = p !== "none";
			!d && x && b.push(...ke(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = xe(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === B(t) || T.every((e) => B(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = B(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Be(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Ve(e) {
	return pe.some((t) => e[t] >= 0);
}
var He = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = L(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Be(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Ve(e)
					} };
				}
				case "escaped": {
					let e = Be(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Ve(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Ue = /*#__PURE__*/ new Set(["left", "top"]);
async function We(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = R(n), s = z(n), c = B(n) === "y", l = Ue.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = L(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Ge = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await We(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Ke = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = L(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = B(i), p = ve(f), m = u[p], h = u[f], g = (e, t) => _e(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, qe = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = L(e, t), u = {
				x: n,
				y: r
			}, d = B(i), f = ve(d), p = u[f], m = u[d], h = L(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Ue.has(R(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Je = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = L(e, t), c = await i.detectOverflow(t, s), l = R(n), u = z(n), d = B(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = P(p - c[m], g), y = P(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * F(c.left, c.right) : S = p - 2 * F(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Ye() {
	return typeof window < "u";
}
function V(e) {
	return Xe(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function H(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function U(e) {
	return ((Xe(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Xe(e) {
	return Ye() ? e instanceof Node || e instanceof H(e).Node : !1;
}
function W(e) {
	return Ye() ? e instanceof Element || e instanceof H(e).Element : !1;
}
function G(e) {
	return Ye() ? e instanceof HTMLElement || e instanceof H(e).HTMLElement : !1;
}
function Ze(e) {
	return !Ye() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof H(e).ShadowRoot;
}
function K(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Y(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Qe(e) {
	return /^(table|td|th)$/.test(V(e));
}
function $e(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var et = /transform|translate|scale|rotate|perspective|filter/, tt = /paint|layout|strict|content/, q = (e) => !!e && e !== "none", nt;
function rt(e) {
	let t = W(e) ? Y(e) : e;
	return q(t.transform) || q(t.translate) || q(t.scale) || q(t.rotate) || q(t.perspective) || !at() && (q(t.backdropFilter) || q(t.filter)) || et.test(t.willChange || "") || tt.test(t.contain || "");
}
function it(e) {
	let t = X(e);
	for (; G(t) && !J(t);) {
		if (rt(t)) return t;
		if ($e(t)) return null;
		t = X(t);
	}
	return null;
}
function at() {
	return nt ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), nt;
}
function J(e) {
	return /^(html|body|#document)$/.test(V(e));
}
function Y(e) {
	return H(e).getComputedStyle(e);
}
function ot(e) {
	return W(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function X(e) {
	if (V(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Ze(e) && e.host || U(e);
	return Ze(t) ? t.host : t;
}
function st(e) {
	let t = X(e);
	return J(t) ? (e.ownerDocument || e).body : G(t) && K(t) ? t : st(t);
}
function Z(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = st(e), i = r === e.ownerDocument?.body, a = H(r);
	if (i) {
		let e = ct(a);
		return t.concat(a, a.visualViewport || [], K(r) ? r : [], e && n ? Z(e) : []);
	}
	return t.concat(r, Z(r, [], n));
}
function ct(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function lt(e) {
	let t = Y(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = G(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = me(n) !== a || me(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function ut(e) {
	return W(e) ? e : e.contextElement;
}
function Q(e) {
	let t = ut(e);
	if (!G(t)) return I(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = lt(t), o = (a ? me(n.width) : n.width) / r, s = (a ? me(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var dt = /*#__PURE__*/ I(0);
function ft(e) {
	let t = H(e);
	return !at() || !t.visualViewport ? dt : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function pt(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === H(e);
}
function $(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = ut(e), o = I(1);
	t && (r ? W(r) && (o = Q(r)) : o = Q(e));
	let s = pt(a, n, r) ? ft(a) : I(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = H(a), t = W(r) ? H(r) : r, n = e, i = ct(n);
		for (; i && t !== n;) {
			let e = Q(i), t = i.getBoundingClientRect(), r = Y(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = H(i), i = ct(n);
		}
	}
	return Ne({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function mt(e, t) {
	let n = ot(e).scrollLeft;
	return t ? t.left + n : $(U(e)).left + n;
}
function ht(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - mt(e, n),
		y: n.top + t.scrollTop
	};
}
function gt(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = U(r), s = t ? $e(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = I(1), u = I(0), d = G(r);
	if ((d || !a) && ((V(r) !== "body" || K(o)) && (c = ot(r)), d)) {
		let e = $(r);
		l = Q(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? ht(o, c) : I(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function _t(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function vt(e) {
	let t = ot(e), n = e.ownerDocument.body, r = F(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = F(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + mt(e), o = -t.scrollTop;
	return Y(n).direction === "rtl" && (a += F(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var yt = 25;
function bt(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = H(e), a = U(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !at() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (mt(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= yt && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function xt(e, t) {
	let n = $(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Q(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function St(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = bt(e, n, t);
	else if (t === "document") r = vt(U(e));
	else if (W(t)) r = xt(t, n);
	else {
		let n = ft(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Ne(r);
}
function Ct(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Z(e, [], !1).filter((e) => W(e) && V(e) !== "body"), i = null, a = Y(e).position === "fixed", o = a ? X(e) : e;
	for (; W(o) && !J(o);) {
		let e = Y(o), t = rt(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = X(o);
	}
	return t.set(e, r), r;
}
function wt(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? $e(t) ? [] : Ct(t, this._c) : [].concat(n), r], o = St(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = St(t, a[e], i);
		s = F(n.top, s), c = P(n.right, c), l = P(n.bottom, l), u = F(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Tt(e) {
	let { width: t, height: n } = lt(e);
	return {
		width: t,
		height: n
	};
}
function Et(e, t, n) {
	let r = G(t), i = U(t), a = n === "fixed", o = $(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = I(0);
	if ((r || !a) && ((V(t) !== "body" || K(i)) && (s = ot(t)), r)) {
		let e = $(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = mt(i));
	let l = i && !r && !a ? ht(i, s) : I(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function Dt(e) {
	return Y(e).position === "static";
}
function Ot(e, t) {
	if (!G(e) || Y(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return U(e) === n && (n = n.ownerDocument.body), n;
}
function kt(e, t) {
	let n = H(e);
	if ($e(e)) return n;
	if (!G(e)) {
		let t = X(e);
		for (; t && !J(t);) {
			if (W(t) && !Dt(t)) return t;
			t = X(t);
		}
		return n;
	}
	let r = Ot(e, t);
	for (; r && Qe(r) && Dt(r);) r = Ot(r, t);
	return r && J(r) && Dt(r) && !rt(r) ? n : r || it(e) || n;
}
var At = async function(e) {
	let t = this.getOffsetParent || kt, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Et(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function jt(e) {
	return Y(e).direction === "rtl";
}
var Mt = {
	convertOffsetParentRelativeRectToViewportRelativeRect: gt,
	getDocumentElement: U,
	getClippingRect: wt,
	getOffsetParent: kt,
	getElementRects: At,
	getClientRects: _t,
	getDimensions: Tt,
	getScale: Q,
	isElement: W,
	isRTL: jt
};
function Nt(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Pt(e, t, n) {
	let r = null, i, a = U(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = he(d), h = he(a.clientWidth - (u + f)), g = he(a.clientHeight - (d + p)), _ = he(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: F(0, P(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!Nt(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = H(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function Ft(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = ut(e), u = i || a ? [...l ? Z(l) : [], ...t ? Z(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Pt(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? $(e) : null;
	c && g();
	function g() {
		let t = $(e);
		h && !Nt(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var It = Ge, Lt = Ke, Rt = ze, zt = Je, Bt = He, Vt = Re, Ht = qe, Ut = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Mt,
		...i.platform,
		_c: r
	};
	return Le(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/floating-svelte/use-floating.svelte.js
function Wt(n) {
	let r = n.whileElementsMounted, i = t(() => N(n.open) ?? !0), a = t(() => N(n.middleware)), s = t(() => N(n.transform) ?? !0), c = t(() => N(n.placement) ?? "bottom"), l = t(() => N(n.strategy) ?? "absolute"), u = t(() => N(n.sideOffset) ?? 0), d = t(() => N(n.alignOffset) ?? 0), f = n.reference, h = y(0), g = y(0), _ = E(null), v = y(p(e(l))), b = y(p(e(c))), x = y(p({})), S = y(!1), C = !1, w = 0, T = !1, D = t(() => {
		let t = _.current ? de(_.current, e(h)) : e(h), n = _.current ? de(_.current, e(g)) : e(g);
		return e(s) ? {
			position: e(v),
			left: "0",
			top: "0",
			transform: `translate(${t}px, ${n}px)`,
			..._.current && ue(_.current) >= 1.5 && { willChange: "transform" }
		} : {
			position: e(v),
			left: `${t}px`,
			top: `${n}px`
		};
	}), O;
	function k() {
		if (T || f.current === null || _.current === null) return;
		let t = f.current, n = _.current, r = ++w;
		Ut(t, n, {
			middleware: e(a),
			placement: e(c),
			strategy: e(l)
		}).then((a) => {
			if (r === w && f.current === t && _.current === n) {
				if (Gt(t)) {
					o(x, {
						...e(x),
						hide: {
							...e(x).hide,
							referenceHidden: !0
						}
					}, !0);
					return;
				}
				if (!e(i) && e(h) !== 0 && e(g) !== 0) {
					let t = Math.max(Math.abs(e(u)), Math.abs(e(d)), 15);
					if (a.x <= t && a.y <= t) return;
				}
				o(h, a.x, !0), o(g, a.y, !0), o(v, a.strategy, !0), o(b, a.placement, !0), o(x, a.middlewareData, !0), o(S, !0);
			}
		});
	}
	function A() {
		typeof O == "function" && (O(), O = void 0), w++;
	}
	function j() {
		if (A(), r === void 0) {
			k();
			return;
		}
		e(i) && f.current !== null && _.current !== null && (O = r(f.current, _.current, k));
	}
	function M() {
		!e(i) && _.current === null && o(S, !1);
	}
	function ee() {
		return [
			e(a),
			e(c),
			e(l),
			e(u),
			e(d),
			e(i)
		];
	}
	return m(() => {
		r === void 0 && e(i) && k();
	}), m(j), m(() => {
		if (r !== void 0) {
			if (ee(), !e(i)) {
				C = !1;
				return;
			}
			if (!e(S)) {
				C = !1;
				return;
			}
			if (!C) {
				C = !0;
				return;
			}
			k();
		}
	}), m(M), m(() => () => {
		T = !0, A();
	}), {
		floating: _,
		reference: f,
		get strategy() {
			return e(v);
		},
		get placement() {
			return e(b);
		},
		get middlewareData() {
			return e(x);
		},
		get isPositioned() {
			return e(S);
		},
		get floatingStyles() {
			return e(D);
		},
		get update() {
			return k;
		}
	};
}
function Gt(e) {
	return e instanceof Element ? !e.isConnected || e instanceof HTMLElement && e.hidden ? !0 : e.getClientRects().length === 0 : !1;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/floating-layer/use-floating-layer.svelte.js
var Kt = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, qt = new b("Floating.Content"), Jt = class n {
	static create(e, t = !1) {
		return t ? qt.set(new n(e, oe.get())) : qt.set(new n(e, ae.get()));
	}
	opts;
	root;
	contentRef = E(null);
	wrapperRef = E(null);
	arrowRef = E(null);
	contentAttachment = w(this.contentRef);
	wrapperAttachment = w(this.wrapperRef);
	arrowAttachment = w(this.arrowRef);
	arrowId = E(j());
	#e = t(() => {
		if (typeof this.opts.style == "string") return A(this.opts.style);
		if (!this.opts.style) return {};
	});
	#t = void 0;
	#n = new C(() => this.arrowRef.current ?? void 0);
	#r = t(() => this.#n?.width ?? 0);
	#i = t(() => this.#n?.height ?? 0);
	#a = t(() => this.opts.side?.current + (this.opts.align.current === "center" ? "" : `-${this.opts.align.current}`));
	#o = t(() => Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]);
	#s = t(() => e(this.#o).length > 0);
	get hasExplicitBoundaries() {
		return e(this.#s);
	}
	set hasExplicitBoundaries(e) {
		o(this.#s, e);
	}
	#c = t(() => ({
		padding: this.opts.collisionPadding.current,
		boundary: e(this.#o).filter(M),
		altBoundary: this.hasExplicitBoundaries
	}));
	get detectOverflowOptions() {
		return e(this.#c);
	}
	set detectOverflowOptions(e) {
		o(this.#c, e);
	}
	#l = y(void 0);
	#u = y(void 0);
	#d = y(void 0);
	#f = y(void 0);
	#p = t(() => [
		It({
			mainAxis: this.opts.sideOffset.current + e(this.#i),
			alignmentAxis: this.opts.alignOffset.current
		}),
		this.opts.avoidCollisions.current && Lt({
			mainAxis: !0,
			crossAxis: !1,
			limiter: this.opts.sticky.current === "partial" ? Ht() : void 0,
			...this.detectOverflowOptions
		}),
		this.opts.avoidCollisions.current && Rt({ ...this.detectOverflowOptions }),
		zt({
			...this.detectOverflowOptions,
			apply: ({ rects: e, availableWidth: t, availableHeight: n }) => {
				let { width: r, height: i } = e.reference;
				o(this.#l, t, !0), o(this.#u, n, !0), o(this.#d, r, !0), o(this.#f, i, !0);
			}
		}),
		this.arrowRef.current && Vt({
			element: this.arrowRef.current,
			padding: this.opts.arrowPadding.current
		}),
		Yt({
			arrowWidth: e(this.#r),
			arrowHeight: e(this.#i)
		}),
		this.opts.hideWhenDetached.current && Bt({
			strategy: "referenceHidden",
			...this.detectOverflowOptions
		})
	].filter(Boolean));
	get middleware() {
		return e(this.#p);
	}
	set middleware(e) {
		o(this.#p, e);
	}
	floating;
	#m = t(() => Zt(this.floating.placement));
	get placedSide() {
		return e(this.#m);
	}
	set placedSide(e) {
		o(this.#m, e);
	}
	#h = t(() => Qt(this.floating.placement));
	get placedAlign() {
		return e(this.#h);
	}
	set placedAlign(e) {
		o(this.#h, e);
	}
	#g = t(() => this.floating.middlewareData.arrow?.x ?? 0);
	get arrowX() {
		return e(this.#g);
	}
	set arrowX(e) {
		o(this.#g, e);
	}
	#_ = t(() => this.floating.middlewareData.arrow?.y ?? 0);
	get arrowY() {
		return e(this.#_);
	}
	set arrowY(e) {
		o(this.#_, e);
	}
	#v = t(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
	get cannotCenterArrow() {
		return e(this.#v);
	}
	set cannotCenterArrow(e) {
		o(this.#v, e);
	}
	#y = y();
	get contentZIndex() {
		return e(this.#y);
	}
	set contentZIndex(e) {
		o(this.#y, e, !0);
	}
	#b = t(() => Kt[this.placedSide]);
	get arrowBaseSide() {
		return e(this.#b);
	}
	set arrowBaseSide(e) {
		o(this.#b, e);
	}
	#x = t(() => ({
		id: this.opts.wrapperId.current,
		"data-bits-floating-content-wrapper": "",
		style: {
			...this.floating.floatingStyles,
			transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: this.contentZIndex,
			"--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
			"--bits-floating-available-width": `${e(this.#l)}px`,
			"--bits-floating-available-height": `${e(this.#u)}px`,
			"--bits-floating-anchor-width": `${e(this.#d)}px`,
			"--bits-floating-anchor-height": `${e(this.#f)}px`,
			...this.floating.middlewareData.hide?.referenceHidden && {
				visibility: "hidden",
				"pointer-events": "none"
			},
			...e(this.#e)
		},
		dir: this.opts.dir.current,
		...this.wrapperAttachment
	}));
	get wrapperProps() {
		return e(this.#x);
	}
	set wrapperProps(e) {
		o(this.#x, e);
	}
	#S = t(() => ({
		"data-side": this.placedSide,
		"data-align": this.placedAlign,
		style: O({ ...e(this.#e) }),
		...this.contentAttachment
	}));
	get props() {
		return e(this.#S);
	}
	set props(e) {
		o(this.#S, e);
	}
	#C = t(() => ({
		position: "absolute",
		left: this.arrowX ? `${this.arrowX}px` : void 0,
		top: this.arrowY ? `${this.arrowY}px` : void 0,
		[this.arrowBaseSide]: 0,
		"transform-origin": {
			top: "",
			right: "0 0",
			bottom: "center 0",
			left: "100% 0"
		}[this.placedSide],
		transform: {
			top: "translateY(100%)",
			right: "translateY(50%) rotate(90deg) translateX(-50%)",
			bottom: "rotate(180deg)",
			left: "translateY(50%) rotate(-90deg) translateX(50%)"
		}[this.placedSide],
		visibility: this.cannotCenterArrow ? "hidden" : void 0
	}));
	get arrowStyle() {
		return e(this.#C);
	}
	set arrowStyle(e) {
		o(this.#C, e);
	}
	constructor(t, n) {
		this.opts = t, this.root = n, this.#t = t.updatePositionStrategy, t.customAnchor && (this.root.customAnchorNode.current = t.customAnchor.current), D(() => t.customAnchor.current, (e) => {
			this.root.customAnchorNode.current = e;
		}), this.floating = Wt({
			strategy: () => this.opts.strategy.current,
			placement: () => e(this.#a),
			middleware: () => this.middleware,
			reference: this.root.anchorNode,
			whileElementsMounted: (...e) => Ft(...e, { animationFrame: this.#t?.current === "always" }),
			open: () => this.opts.enabled.current,
			sideOffset: () => this.opts.sideOffset.current,
			alignOffset: () => this.opts.alignOffset.current
		}), m(() => {
			this.floating.isPositioned && this.opts.onPlaced?.current();
		}), D(() => this.contentRef.current, (e) => {
			if (!e || !this.opts.enabled.current) return;
			let t = T(e), n = t.requestAnimationFrame(() => {
				if (this.contentRef.current !== e || !this.opts.enabled.current) return;
				let n = t.getComputedStyle(e).zIndex;
				n !== this.contentZIndex && (this.contentZIndex = n);
			});
			return () => {
				t.cancelAnimationFrame(n);
			};
		}), m(() => {
			this.floating.floating.current = this.wrapperRef.current;
		});
	}
};
function Yt(e) {
	return {
		name: "transformOrigin",
		options: e,
		fn(t) {
			let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Xt(n), u = {
				start: "0%",
				center: "50%",
				end: "100%"
			}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
			return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
				x: p,
				y: m
			} };
		}
	};
}
function Xt(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
function Zt(e) {
	return Xt(e)[0];
}
function Qt(e) {
	return Xt(e)[1];
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content.svelte
function $t(r, a) {
	i(a, !0);
	let o = s(a, "side", 3, "bottom"), c = s(a, "sideOffset", 3, 0), f = s(a, "align", 3, "center"), p = s(a, "alignOffset", 3, 0), m = s(a, "arrowPadding", 3, 0), h = s(a, "avoidCollisions", 3, !0), _ = s(a, "collisionBoundary", 19, () => []), y = s(a, "collisionPadding", 3, 0), b = s(a, "hideWhenDetached", 3, !1), S = s(a, "onPlaced", 3, () => {}), C = s(a, "sticky", 3, "partial"), w = s(a, "updatePositionStrategy", 3, "optimized"), T = s(a, "strategy", 3, "fixed"), E = s(a, "dir", 3, "ltr"), D = s(a, "style", 19, () => ({})), O = s(a, "wrapperId", 19, j), A = s(a, "customAnchor", 3, null), M = s(a, "tooltip", 3, !1), ee = Jt.create({
		side: x(() => o()),
		sideOffset: x(() => c()),
		align: x(() => f()),
		alignOffset: x(() => p()),
		id: x(() => a.id),
		arrowPadding: x(() => m()),
		avoidCollisions: x(() => h()),
		collisionBoundary: x(() => _()),
		collisionPadding: x(() => y()),
		hideWhenDetached: x(() => b()),
		onPlaced: x(() => S()),
		sticky: x(() => C()),
		updatePositionStrategy: x(() => w()),
		strategy: x(() => T()),
		dir: x(() => E()),
		style: x(() => D()),
		enabled: x(() => a.enabled),
		wrapperId: x(() => O()),
		customAnchor: x(() => A())
	}, M()), te = t(() => k(ee.wrapperProps, { style: { pointerEvents: "auto" } }));
	var ne = v(), re = u(ne);
	g(re, () => a.content ?? d, () => ({
		props: ee.props,
		wrapperProps: e(te)
	})), l(r, ne), n();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content-static.svelte
function en(e, t) {
	i(t, !0), c(() => {
		t.onPlaced?.();
	});
	var r = v(), a = u(r);
	g(a, () => t.content ?? d, () => ({
		props: {},
		wrapperProps: {}
	})), l(e, r), n();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-content.svelte
var tn = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"content",
	"isStatic",
	"onPlaced"
]);
function nn(e, t) {
	let n = s(t, "isStatic", 3, !1), r = f(t, tn);
	var i = v(), o = u(i), c = (e) => {
		en(e, {
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		});
	}, d = (e) => {
		$t(e, h({
			get content() {
				return t.content;
			},
			get onPlaced() {
				return t.onPlaced;
			}
		}, () => r));
	};
	a(o, (e) => {
		n() ? e(c) : e(d, -1);
	}), l(e, i);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-inner.svelte
var rn = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled.forceMount.ref.tooltip.contentPointerEvents".split(".")), an = r("<!> <!>", 1);
function on(r, o) {
	i(o, !0);
	let c = s(o, "interactOutsideBehavior", 3, "close"), p = s(o, "trapFocus", 3, !0), m = s(o, "isValidEvent", 3, () => !1), h = s(o, "customAnchor", 3, null), y = s(o, "isStatic", 3, !1), b = s(o, "tooltip", 3, !1), x = s(o, "contentPointerEvents", 3, "auto"), S = f(o, rn), C = t(() => o.preventScroll ?? !0), w = t(() => o.strategy ?? (e(C) ? "fixed" : "absolute"));
	nn(r, {
		get isStatic() {
			return y();
		},
		get id() {
			return o.id;
		},
		get side() {
			return o.side;
		},
		get sideOffset() {
			return o.sideOffset;
		},
		get align() {
			return o.align;
		},
		get alignOffset() {
			return o.alignOffset;
		},
		get arrowPadding() {
			return o.arrowPadding;
		},
		get avoidCollisions() {
			return o.avoidCollisions;
		},
		get collisionBoundary() {
			return o.collisionBoundary;
		},
		get collisionPadding() {
			return o.collisionPadding;
		},
		get sticky() {
			return o.sticky;
		},
		get hideWhenDetached() {
			return o.hideWhenDetached;
		},
		get updatePositionStrategy() {
			return o.updatePositionStrategy;
		},
		get strategy() {
			return e(w);
		},
		get dir() {
			return o.dir;
		},
		get wrapperId() {
			return o.wrapperId;
		},
		get style() {
			return o.style;
		},
		get onPlaced() {
			return o.onPlaced;
		},
		get customAnchor() {
			return h();
		},
		get enabled() {
			return o.enabled;
		},
		get tooltip() {
			return b();
		},
		content: (n, r) => {
			let i = () => (r?.()).props, s = () => (r?.()).wrapperProps;
			var f = an(), h = u(f), y = (t) => {
				ie(t, { get preventScroll() {
					return e(C);
				} });
			}, b = (t) => {
				ie(t, { get preventScroll() {
					return e(C);
				} });
			};
			a(h, (e) => {
				o.forceMount && o.enabled ? e(y) : o.forceMount || e(b, 1);
			});
			var w = _(h, 2);
			re(w, {
				get onOpenAutoFocus() {
					return o.onOpenAutoFocus;
				},
				get onCloseAutoFocus() {
					return o.onCloseAutoFocus;
				},
				get loop() {
					return o.loop;
				},
				get enabled() {
					return o.enabled;
				},
				get trapFocus() {
					return p();
				},
				get forceMount() {
					return o.forceMount;
				},
				get ref() {
					return o.ref;
				},
				focusScope: (n, r) => {
					let a = () => (r?.()).props;
					ee(n, {
						get onEscapeKeydown() {
							return o.onEscapeKeydown;
						},
						get escapeKeydownBehavior() {
							return o.escapeKeydownBehavior;
						},
						get enabled() {
							return o.enabled;
						},
						get ref() {
							return o.ref;
						},
						children: (n, r) => {
							te(n, {
								get id() {
									return o.id;
								},
								get onInteractOutside() {
									return o.onInteractOutside;
								},
								get onFocusOutside() {
									return o.onFocusOutside;
								},
								get interactOutsideBehavior() {
									return c();
								},
								get isValidEvent() {
									return m();
								},
								get enabled() {
									return o.enabled;
								},
								get ref() {
									return o.ref;
								},
								children: (n, r) => {
									let c = () => (r?.()).props;
									ne(n, {
										get id() {
											return o.id;
										},
										get preventOverflowTextSelection() {
											return o.preventOverflowTextSelection;
										},
										get onPointerDown() {
											return o.onPointerDown;
										},
										get onPointerUp() {
											return o.onPointerUp;
										},
										get enabled() {
											return o.enabled;
										},
										get ref() {
											return o.ref;
										},
										children: (n, r) => {
											var f = v(), p = u(f);
											{
												let n = t(() => ({
													props: k(S, i(), c(), a(), {
														id: o.id,
														style: { pointerEvents: x() }
													}),
													wrapperProps: s()
												}));
												g(p, () => o.popper ?? d, () => e(n));
											}
											l(n, f);
										},
										$$slots: { default: !0 }
									});
								},
								$$slots: { default: !0 }
							});
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { focusScope: !0 }
			}), l(n, f);
		},
		$$slots: { content: !0 }
	}), n();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer.svelte
var sn = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.open.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.ref.shouldRender".split("."));
function cn(e, t) {
	let n = s(t, "interactOutsideBehavior", 3, "close"), r = s(t, "trapFocus", 3, !0), i = s(t, "isValidEvent", 3, () => !1), o = s(t, "customAnchor", 3, null), c = s(t, "isStatic", 3, !1), d = f(t, sn);
	var p = v(), m = u(p), g = (e) => {
		on(e, h({
			get popper() {
				return t.popper;
			},
			get onEscapeKeydown() {
				return t.onEscapeKeydown;
			},
			get escapeKeydownBehavior() {
				return t.escapeKeydownBehavior;
			},
			get preventOverflowTextSelection() {
				return t.preventOverflowTextSelection;
			},
			get id() {
				return t.id;
			},
			get onPointerDown() {
				return t.onPointerDown;
			},
			get onPointerUp() {
				return t.onPointerUp;
			},
			get side() {
				return t.side;
			},
			get sideOffset() {
				return t.sideOffset;
			},
			get align() {
				return t.align;
			},
			get alignOffset() {
				return t.alignOffset;
			},
			get arrowPadding() {
				return t.arrowPadding;
			},
			get avoidCollisions() {
				return t.avoidCollisions;
			},
			get collisionBoundary() {
				return t.collisionBoundary;
			},
			get collisionPadding() {
				return t.collisionPadding;
			},
			get sticky() {
				return t.sticky;
			},
			get hideWhenDetached() {
				return t.hideWhenDetached;
			},
			get updatePositionStrategy() {
				return t.updatePositionStrategy;
			},
			get strategy() {
				return t.strategy;
			},
			get dir() {
				return t.dir;
			},
			get preventScroll() {
				return t.preventScroll;
			},
			get wrapperId() {
				return t.wrapperId;
			},
			get style() {
				return t.style;
			},
			get onPlaced() {
				return t.onPlaced;
			},
			get customAnchor() {
				return o();
			},
			get isStatic() {
				return c();
			},
			get enabled() {
				return t.open;
			},
			get onInteractOutside() {
				return t.onInteractOutside;
			},
			get onCloseAutoFocus() {
				return t.onCloseAutoFocus;
			},
			get onOpenAutoFocus() {
				return t.onOpenAutoFocus;
			},
			get interactOutsideBehavior() {
				return n();
			},
			get loop() {
				return t.loop;
			},
			get trapFocus() {
				return r();
			},
			get isValidEvent() {
				return i();
			},
			get onFocusOutside() {
				return t.onFocusOutside;
			},
			forceMount: !1,
			get ref() {
				return t.ref;
			}
		}, () => d));
	};
	a(m, (e) => {
		t.shouldRender && e(g);
	}), l(e, p);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-force-mount.svelte
var ln = /* @__PURE__ */ new Set(/* @__PURE__ */ "$$slots.$$events.$$legacy.popper.onEscapeKeydown.escapeKeydownBehavior.preventOverflowTextSelection.id.onPointerDown.onPointerUp.side.sideOffset.align.alignOffset.arrowPadding.avoidCollisions.collisionBoundary.collisionPadding.sticky.hideWhenDetached.updatePositionStrategy.strategy.dir.preventScroll.wrapperId.style.onPlaced.onInteractOutside.onCloseAutoFocus.onOpenAutoFocus.onFocusOutside.interactOutsideBehavior.loop.trapFocus.isValidEvent.customAnchor.isStatic.enabled".split("."));
function un(e, t) {
	let n = s(t, "interactOutsideBehavior", 3, "close"), r = s(t, "trapFocus", 3, !0), i = s(t, "isValidEvent", 3, () => !1), a = s(t, "customAnchor", 3, null), o = s(t, "isStatic", 3, !1), c = f(t, ln);
	on(e, h({
		get popper() {
			return t.popper;
		},
		get onEscapeKeydown() {
			return t.onEscapeKeydown;
		},
		get escapeKeydownBehavior() {
			return t.escapeKeydownBehavior;
		},
		get preventOverflowTextSelection() {
			return t.preventOverflowTextSelection;
		},
		get id() {
			return t.id;
		},
		get onPointerDown() {
			return t.onPointerDown;
		},
		get onPointerUp() {
			return t.onPointerUp;
		},
		get side() {
			return t.side;
		},
		get sideOffset() {
			return t.sideOffset;
		},
		get align() {
			return t.align;
		},
		get alignOffset() {
			return t.alignOffset;
		},
		get arrowPadding() {
			return t.arrowPadding;
		},
		get avoidCollisions() {
			return t.avoidCollisions;
		},
		get collisionBoundary() {
			return t.collisionBoundary;
		},
		get collisionPadding() {
			return t.collisionPadding;
		},
		get sticky() {
			return t.sticky;
		},
		get hideWhenDetached() {
			return t.hideWhenDetached;
		},
		get updatePositionStrategy() {
			return t.updatePositionStrategy;
		},
		get strategy() {
			return t.strategy;
		},
		get dir() {
			return t.dir;
		},
		get preventScroll() {
			return t.preventScroll;
		},
		get wrapperId() {
			return t.wrapperId;
		},
		get style() {
			return t.style;
		},
		get onPlaced() {
			return t.onPlaced;
		},
		get customAnchor() {
			return a();
		},
		get isStatic() {
			return o();
		},
		get enabled() {
			return t.enabled;
		},
		get onInteractOutside() {
			return t.onInteractOutside;
		},
		get onCloseAutoFocus() {
			return t.onCloseAutoFocus;
		},
		get onOpenAutoFocus() {
			return t.onOpenAutoFocus;
		},
		get interactOutsideBehavior() {
			return n();
		},
		get loop() {
			return t.loop;
		},
		get trapFocus() {
			return r();
		},
		get isValidEvent() {
			return i();
		},
		get onFocusOutside() {
			return t.onFocusOutside;
		}
	}, () => c, { forceMount: !0 }));
}
//#endregion
export { ce as a, le as i, cn as n, fe as r, un as t };
