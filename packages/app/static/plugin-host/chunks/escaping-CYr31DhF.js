//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/constants.js
var e = {}, t = Symbol("uninitialized"), n = Symbol("filename"), r = Symbol("hmr"), i = "http://www.w3.org/1999/xhtml", a = "http://www.w3.org/2000/svg", o = "http://www.w3.org/1998/Math/MathML", s = [
	"await_waterfall",
	"await_reactivity_loss",
	"state_snapshot_uncloneable",
	"binding_property_non_reactive",
	"hydration_attribute_changed",
	"hydration_html_changed",
	"ownership_invalid_binding",
	"ownership_invalid_mutation"
], c = "@attach", l = /\r/g;
function u(e) {
	e = e.replace(l, "");
	let t = 5381, n = e.length;
	for (; n--;) t = (t << 5) - t ^ e.charCodeAt(n);
	return (t >>> 0).toString(36);
}
var d = [
	"area",
	"base",
	"br",
	"col",
	"command",
	"embed",
	"hr",
	"img",
	"input",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
];
function f(e) {
	return d.includes(e) || e.toLowerCase() === "!doctype";
}
var p = /* @__PURE__ */ "arguments.await.break.case.catch.class.const.continue.debugger.default.delete.do.else.enum.eval.export.extends.false.finally.for.function.if.implements.import.in.instanceof.interface.let.new.null.package.private.protected.public.return.static.super.switch.this.throw.true.try.typeof.var.void.while.with.yield".split(".");
function m(e) {
	return p.includes(e);
}
function h(e) {
	return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
var g = [
	"beforeinput",
	"click",
	"change",
	"dblclick",
	"contextmenu",
	"focusin",
	"focusout",
	"input",
	"keydown",
	"keyup",
	"mousedown",
	"mousemove",
	"mouseout",
	"mouseover",
	"mouseup",
	"pointerdown",
	"pointermove",
	"pointerout",
	"pointerover",
	"pointerup",
	"touchend",
	"touchmove",
	"touchstart"
];
function _(e) {
	return g.includes(e);
}
var v = /* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split("."), y = {
	formnovalidate: "formNoValidate",
	ismap: "isMap",
	nomodule: "noModule",
	playsinline: "playsInline",
	readonly: "readOnly",
	defaultvalue: "defaultValue",
	defaultchecked: "defaultChecked",
	srcobject: "srcObject",
	novalidate: "noValidate",
	allowfullscreen: "allowFullscreen",
	disablepictureinpicture: "disablePictureInPicture",
	disableremoteplayback: "disableRemotePlayback"
};
function b(e) {
	return e = e.toLowerCase(), y[e] ?? e;
}
[...v];
var x = ["touchstart", "touchmove"];
function S(e) {
	return x.includes(e);
}
var C = [
	"textarea",
	"script",
	"style",
	"title"
];
function w(e) {
	return C.includes(e);
}
var T = /^[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9.\-_\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}]*)?$/u;
function E(e) {
	return e?.replace(/\//g, "/​");
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/escaping.js
var D = /[&"<]/g, O = /[&<]/g;
function k(e, t) {
	let n = String(e ?? ""), r = t ? D : O;
	r.lastIndex = 0;
	let i = "", a = 0;
	for (; r.test(n);) {
		let e = r.lastIndex - 1, t = n[e];
		i += n.substring(a, e) + (t === "&" ? "&amp;" : t === "\"" ? "&quot;" : "&lt;"), a = e + 1;
	}
	return i + n.substring(a);
}
//#endregion
export { i as _, h as a, t as b, m as c, E as d, c as f, s as g, e as h, u as i, f as l, r as m, T as n, S as o, n as p, _ as r, w as s, k as t, b as u, o as v, a as y };
