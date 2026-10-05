var e = "ArrowDown", t = "ArrowLeft", n = "ArrowRight", r = "ArrowUp", i = "Backspace", a = "CapsLock", o = "Control", s = "Enter", c = "Escape", l = "Home", u = "Meta", d = "PageDown", f = "PageUp", p = "Shift";
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/noop.js
function m() {}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/dom.js
function h(e) {
	if (!e) return null;
	for (let t of e.childNodes) if (t.nodeType !== Node.COMMENT_NODE) return t;
	return null;
}
function g(e, t) {
	let { clientX: n, clientY: r } = e, i = t.getBoundingClientRect();
	return n < i.left || n > i.right || r < i.top || r > i.bottom;
}
//#endregion
export { p as _, t as a, i as c, s as d, c as f, f as g, d as h, e as i, a as l, u as m, g as n, n as o, l as p, m as r, r as s, h as t, o as u };
