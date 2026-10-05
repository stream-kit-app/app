//#region ../ui/src/lib/components/input/input-field-classes.ts
var e = "bg-dark-700 text-dark-50", t = "group", n = "border-destructive";
function r(e) {
	return e ? n : "border-border hover:border-dark-400 group-hover:border-dark-400 disabled:hover:border-border group-has-[:disabled]:border-border";
}
function i(e) {
	return r(e);
}
function a(e) {
	return e ? "has-focus:ring-2 has-focus:ring-destructive" : "has-focus:ring-2 has-focus:ring-ring";
}
function o(e) {
	return e ? "focus-within:ring-2 focus-within:ring-destructive" : "focus-within:ring-2 focus-within:ring-ring";
}
var s = "text-sm text-destructive-100", c = "text-destructive-100", l = "disabled:cursor-not-allowed disabled:opacity-50", u = "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
//#endregion
export { s as a, t as c, u as d, l as i, c as l, r as n, a as o, n as r, o as s, i as t, e as u };
