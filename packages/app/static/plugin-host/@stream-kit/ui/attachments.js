import { n as e, t } from "../../chunks/attachments-BbcOpCxM.js";
//#region ../ui/src/lib/attachments/masonry.ts
var n = /* @__PURE__ */ new WeakMap(), r;
function i(e, t, n) {
	let r = Math.max(1, Math.ceil((t + n.gap) / n.rowHeight));
	e.style.gridRowEnd = `span ${r}`;
}
function a() {
	return r ??= new ResizeObserver((e) => {
		for (let t of e) {
			let e = n.get(t.target);
			if (!e) continue;
			let r = t.borderBoxSize?.[0]?.blockSize ?? t.target.getBoundingClientRect().height;
			i(t.target, r, e);
		}
	}), r;
}
function o(e = {}) {
	return (t) => {
		let r = {
			rowHeight: e.rowHeight ?? 4,
			gap: e.gap ?? 16
		};
		t.style.alignSelf = "start", n.set(t, r), i(t, t.getBoundingClientRect().height, r);
		let o = a();
		return o.observe(t), () => {
			o.unobserve(t), n.delete(t), t.style.gridRowEnd = "", t.style.alignSelf = "";
		};
	};
}
//#endregion
export { o as masonryItem, t as tooltip, e as tooltipSnippet };
