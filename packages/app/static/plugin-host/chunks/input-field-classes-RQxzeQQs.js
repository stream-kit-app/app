//#region ../ui/src/lib/components/input/input-field-classes.ts
var e = "bg-dark-700 text-dark-50", t = "group", n = "border-border hover:border-dark-400 group-hover:border-dark-400 disabled:hover:border-border group-has-[:disabled]:border-border", r = "border-destructive";
function i(e) {
	return e ? r : n;
}
function a(e) {
	return i(e);
}
function o(e) {
	return e ? "has-focus:ring-2 has-focus:ring-destructive" : "has-focus:ring-2 has-focus:ring-ring";
}
function s(e) {
	return e ? "focus-within:ring-2 focus-within:ring-destructive" : "focus-within:ring-2 focus-within:ring-ring";
}
var c = "text-sm text-destructive-100", l = "text-destructive-100", u = "disabled:cursor-not-allowed disabled:opacity-50", d = "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
//#endregion
export { c as a, t as c, d, u as i, l, i as n, o, r, s, a as t, e as u };
