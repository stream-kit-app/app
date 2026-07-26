//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_5a6ee2206b82415d6a6056cd255c701d/node_modules/svelte-toolbelt/dist/utils/after-sleep.js
function e(e, t) {
	return setTimeout(t, e);
}
var t = "ArrowDown", n = "ArrowLeft", r = "ArrowRight", i = "ArrowUp", a = "Backspace", o = "CapsLock", s = "Control", c = "Enter", l = "Escape", u = "Home", d = "Meta", f = "PageDown", p = "PageUp", m = "Shift";
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/internal/noop.js
function h() {}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/internal/dom.js
function g(e) {
	if (!e) return null;
	for (let t of e.childNodes) if (t.nodeType !== Node.COMMENT_NODE) return t;
	return null;
}
function _(e, t) {
	let { clientX: n, clientY: r } = e, i = t.getBoundingClientRect();
	return n < i.left || n > i.right || r < i.top || r > i.bottom;
}
//#endregion
export { m as _, n as a, a as c, c as d, l as f, p as g, f as h, t as i, o as l, d as m, _ as n, r as o, u as p, h as r, i as s, g as t, s as u, e as v };
