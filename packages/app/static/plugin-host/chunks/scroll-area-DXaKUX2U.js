import { Bn as e, Dr as t, Dt as n, En as r, Gn as i, Hr as a, Nn as o, Nt as s, Sn as c, Ur as l, Vt as u, _r as d, a as f, bn as p, cr as m, ii as h, ir as g, o as _, ot as v, rr as y, s as b, sn as x, sr as S, ti as C, ur as w, xn as T, yr as E } from "./client-BFeMv2Ma.js";
import "./disclose-version-CI8I6yeK.js";
import "./index-client-DI7sx7Sj.js";
import { C as D, D as O, S as k, _ as A, d as j, h as ee, j as M, o as te, t as ne, x as N, y as P } from "./animations-complete-2GhqX7WL.js";
import { i as F, n as I, o as re, r as ie, t as ae } from "./use-id-BW6hjw-g.js";
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/svelte-resize-observer.svelte.js
var L = null, R = /* @__PURE__ */ new WeakMap();
function oe() {
	return L ??= new ResizeObserver((e) => {
		for (let t of e) {
			let e = R.get(t.target);
			if (e) for (let t of [...e]) t();
		}
	}), L;
}
function se(e, t) {
	let n = R.get(e);
	return n === void 0 ? (n = /* @__PURE__ */ new Set(), R.set(e, n), n.add(t), oe().observe(e)) : (n.add(t), t()), () => {
		let n = R.get(e);
		n && (n.delete(t), !n.size && (R.delete(e), L?.unobserve(e)));
	};
}
var z = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t, this.handler = this.handler.bind(this), y(this.handler);
	}
	handler() {
		let e = 0, t = this.#e();
		if (!t) return;
		let n = se(t, () => {
			cancelAnimationFrame(e), e = window.requestAnimationFrame(this.#t);
		});
		return () => {
			window.cancelAnimationFrame(e), n();
		};
	}
}, ce = class {
	opts;
	present;
	#e;
	#t = E(!1);
	#n = !1;
	#r = E(void 0);
	#i = null;
	constructor(e) {
		this.opts = e, this.present = this.opts.open, d(this.#t, e.open.current, !0), this.#e = new ne({
			ref: this.opts.ref,
			afterTick: this.opts.open
		}), A(() => this.#o()), N(() => this.present.current, (e) => {
			if (!this.#n) {
				this.#n = !0;
				return;
			}
			this.#o(), e && d(this.#t, !0), d(this.#r, e ? "starting" : "ending", !0), e && (this.#i = window.requestAnimationFrame(() => {
				this.#i = null, this.present.current && d(this.#r, void 0);
			})), this.#e.run(() => {
				e === this.present.current && (e || d(this.#t, !1), d(this.#r, void 0));
			});
		});
	}
	#a = t(() => e(this.#t));
	get isPresent() {
		return e(this.#a);
	}
	set isPresent(e) {
		d(this.#a, e);
	}
	get transitionStatus() {
		return e(this.#r);
	}
	#o() {
		this.#i !== null && (window.cancelAnimationFrame(this.#i), this.#i = null);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/utilities/presence-layer/presence-layer.svelte
function B(e, t) {
	l(t, !0);
	let n = new ce({
		open: O(() => t.open),
		ref: t.ref
	});
	var r = T(), i = m(r), o = (e) => {
		var r = T(), i = m(r);
		x(i, () => t.presence ?? h, () => ({
			present: n.isPresent,
			transitionStatus: n.transitionStatus
		})), p(e, r);
	};
	u(i, (e) => {
		(t.forceMount || t.open || n.isPresent) && e(o);
	}), p(e, r), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/clamp.js
function le(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/state-machine.js
var ue = class {
	state;
	#e;
	constructor(e, t) {
		this.state = M(e), this.#e = t, this.dispatch = this.dispatch.bind(this);
	}
	#t(e) {
		return this.#e[this.state.current][e] ?? this.state.current;
	}
	dispatch(e) {
		this.state.current = this.#t(e);
	}
}, V = te({
	component: "scroll-area",
	parts: [
		"root",
		"viewport",
		"corner",
		"thumb",
		"scrollbar"
	]
}), H = new D("ScrollArea.Root"), U = new D("ScrollArea.Scrollbar"), W = new D("ScrollArea.ScrollbarVisible"), G = new D("ScrollArea.ScrollbarAxis"), K = new D("ScrollArea.ScrollbarShared"), de = class n {
	static create(e) {
		return H.set(new n(e));
	}
	opts;
	attachment;
	#e = E(null);
	get scrollAreaNode() {
		return e(this.#e);
	}
	set scrollAreaNode(e) {
		d(this.#e, e, !0);
	}
	#t = E(null);
	get viewportNode() {
		return e(this.#t);
	}
	set viewportNode(e) {
		d(this.#t, e, !0);
	}
	#n = E(null);
	get contentNode() {
		return e(this.#n);
	}
	set contentNode(e) {
		d(this.#n, e, !0);
	}
	#r = E(null);
	get scrollbarXNode() {
		return e(this.#r);
	}
	set scrollbarXNode(e) {
		d(this.#r, e, !0);
	}
	#i = E(null);
	get scrollbarYNode() {
		return e(this.#i);
	}
	set scrollbarYNode(e) {
		d(this.#i, e, !0);
	}
	#a = E(0);
	get cornerWidth() {
		return e(this.#a);
	}
	set cornerWidth(e) {
		d(this.#a, e, !0);
	}
	#o = E(0);
	get cornerHeight() {
		return e(this.#o);
	}
	set cornerHeight(e) {
		d(this.#o, e, !0);
	}
	#s = E(!1);
	get scrollbarXEnabled() {
		return e(this.#s);
	}
	set scrollbarXEnabled(e) {
		d(this.#s, e, !0);
	}
	#c = E(!1);
	get scrollbarYEnabled() {
		return e(this.#c);
	}
	set scrollbarYEnabled(e) {
		d(this.#c, e, !0);
	}
	domContext;
	constructor(e) {
		this.opts = e, this.attachment = j(e.ref, (e) => this.scrollAreaNode = e), this.domContext = new ie(e.ref);
	}
	#l = t(() => ({
		id: this.opts.id.current,
		dir: this.opts.dir.current,
		style: {
			position: "relative",
			"--bits-scroll-area-corner-height": `${this.cornerHeight}px`,
			"--bits-scroll-area-corner-width": `${this.cornerWidth}px`
		},
		[V.root]: "",
		...this.attachment
	}));
	get props() {
		return e(this.#l);
	}
	set props(e) {
		d(this.#l, e);
	}
}, fe = class n {
	static create(e) {
		return new n(e, H.get());
	}
	opts;
	root;
	attachment;
	#e = M(ae());
	#t = M(null);
	contentAttachment = j(this.#t, (e) => this.root.contentNode = e);
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = j(e.ref, (e) => this.root.viewportNode = e);
	}
	#n = t(() => ({
		id: this.opts.id.current,
		style: {
			overflowX: this.root.scrollbarXEnabled ? "scroll" : "hidden",
			overflowY: this.root.scrollbarYEnabled ? "scroll" : "hidden"
		},
		[V.viewport]: "",
		...this.attachment
	}));
	get props() {
		return e(this.#n);
	}
	set props(e) {
		d(this.#n, e);
	}
	#r = t(() => ({
		id: this.#e.current,
		"data-scroll-area-content": "",
		style: { minWidth: this.root.scrollbarXEnabled ? "fit-content" : void 0 },
		...this.contentAttachment
	}));
	get contentProps() {
		return e(this.#r);
	}
	set contentProps(e) {
		d(this.#r, e);
	}
}, pe = class n {
	static create(e) {
		return U.set(new n(e, H.get()));
	}
	opts;
	root;
	#e = t(() => this.opts.orientation.current === "horizontal");
	get isHorizontal() {
		return e(this.#e);
	}
	set isHorizontal(e) {
		d(this.#e, e);
	}
	#t = E(!1);
	get hasThumb() {
		return e(this.#t);
	}
	set hasThumb(e) {
		d(this.#t, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, N(() => this.isHorizontal, (e) => e ? (this.root.scrollbarXEnabled = !0, () => {
			this.root.scrollbarXEnabled = !1;
		}) : (this.root.scrollbarYEnabled = !0, () => {
			this.root.scrollbarYEnabled = !1;
		}));
	}
}, me = class n {
	static create() {
		return new n(U.get());
	}
	scrollbar;
	root;
	#e = E(!1);
	get isVisible() {
		return e(this.#e);
	}
	set isVisible(e) {
		d(this.#e, e, !0);
	}
	constructor(e) {
		this.scrollbar = e, this.root = e.root, y(() => {
			let e = this.root.scrollAreaNode, t = this.root.opts.scrollHideDelay.current, n = 0;
			if (!e) return;
			let r = re(o(e, "pointerenter", () => {
				this.root.domContext.clearTimeout(n), i(() => this.isVisible = !0);
			}), o(e, "pointerleave", () => {
				n && this.root.domContext.clearTimeout(n), n = this.root.domContext.setTimeout(() => {
					i(() => {
						this.scrollbar.hasThumb = !1, this.isVisible = !1;
					});
				}, t);
			}));
			return () => {
				this.root.domContext.getWindow().clearTimeout(n), r();
			};
		});
	}
	#t = t(() => ({ "data-state": this.isVisible ? "visible" : "hidden" }));
	get props() {
		return e(this.#t);
	}
	set props(e) {
		d(this.#t, e);
	}
}, he = class n {
	static create() {
		return new n(U.get());
	}
	scrollbar;
	root;
	machine = new ue("hidden", {
		hidden: { SCROLL: "scrolling" },
		scrolling: {
			SCROLL_END: "idle",
			POINTER_ENTER: "interacting"
		},
		interacting: {
			SCROLL: "interacting",
			POINTER_LEAVE: "idle"
		},
		idle: {
			HIDE: "hidden",
			SCROLL: "scrolling",
			POINTER_ENTER: "interacting"
		}
	});
	#e = t(() => this.machine.state.current === "hidden");
	get isHidden() {
		return e(this.#e);
	}
	set isHidden(e) {
		d(this.#e, e);
	}
	constructor(e) {
		this.scrollbar = e, this.root = e.root;
		let t = k(() => this.machine.dispatch("SCROLL_END"), 100);
		y(() => {
			let e = this.machine.state.current, t = this.root.opts.scrollHideDelay.current;
			if (e === "idle") {
				let e = this.root.domContext.setTimeout(() => this.machine.dispatch("HIDE"), t);
				return () => this.root.domContext.clearTimeout(e);
			}
		}), y(() => {
			let e = this.root.viewportNode;
			if (!e) return;
			let n = this.scrollbar.isHorizontal ? "scrollLeft" : "scrollTop", r = e[n];
			return o(e, "scroll", () => {
				let i = e[n];
				r !== i && (this.machine.dispatch("SCROLL"), t()), r = i;
			});
		}), this.onpointerenter = this.onpointerenter.bind(this), this.onpointerleave = this.onpointerleave.bind(this);
	}
	onpointerenter(e) {
		this.machine.dispatch("POINTER_ENTER");
	}
	onpointerleave(e) {
		this.machine.dispatch("POINTER_LEAVE");
	}
	#t = t(() => ({
		"data-state": this.machine.state.current === "hidden" ? "hidden" : "visible",
		onpointerenter: this.onpointerenter,
		onpointerleave: this.onpointerleave
	}));
	get props() {
		return e(this.#t);
	}
	set props(e) {
		d(this.#t, e);
	}
}, q = class n {
	static create() {
		return new n(U.get());
	}
	scrollbar;
	root;
	#e = E(!1);
	get isVisible() {
		return e(this.#e);
	}
	set isVisible(e) {
		d(this.#e, e, !0);
	}
	constructor(e) {
		this.scrollbar = e, this.root = e.root;
		let t = () => {
			let e = this.root.viewportNode;
			if (!e) return;
			let t = e.offsetWidth < e.scrollWidth, n = e.offsetHeight < e.scrollHeight;
			this.isVisible = this.scrollbar.isHorizontal ? t : n;
		};
		new z(() => this.root.viewportNode, t), new z(() => this.root.contentNode, t);
	}
	#t = t(() => ({ "data-state": this.isVisible ? "visible" : "hidden" }));
	get props() {
		return e(this.#t);
	}
	set props(e) {
		d(this.#t, e);
	}
}, ge = class n {
	static create() {
		return W.set(new n(U.get()));
	}
	scrollbar;
	root;
	#e = E(null);
	get thumbNode() {
		return e(this.#e);
	}
	set thumbNode(e) {
		d(this.#e, e, !0);
	}
	#t = E(0);
	get pointerOffset() {
		return e(this.#t);
	}
	set pointerOffset(e) {
		d(this.#t, e, !0);
	}
	#n = E({
		content: 0,
		viewport: 0,
		scrollbar: {
			size: 0,
			paddingStart: 0,
			paddingEnd: 0
		}
	});
	get sizes() {
		return e(this.#n);
	}
	set sizes(e) {
		d(this.#n, e);
	}
	#r = t(() => Y(this.sizes.viewport, this.sizes.content));
	get thumbRatio() {
		return e(this.#r);
	}
	set thumbRatio(e) {
		d(this.#r, e);
	}
	#i = t(() => this.thumbRatio > 0 && this.thumbRatio < 1);
	get hasThumb() {
		return e(this.#i);
	}
	set hasThumb(e) {
		d(this.#i, e);
	}
	#a = E("");
	get prevTransformStyle() {
		return e(this.#a);
	}
	set prevTransformStyle(e) {
		d(this.#a, e, !0);
	}
	constructor(e) {
		this.scrollbar = e, this.root = e.root, y(() => {
			this.scrollbar.hasThumb = this.hasThumb;
		}), y(() => {
			!this.scrollbar.hasThumb && this.thumbNode && (this.prevTransformStyle = this.thumbNode.style.transform);
		});
	}
	setSizes(e) {
		this.sizes = e;
	}
	getScrollPosition(e, t) {
		return Se({
			pointerPos: e,
			pointerOffset: this.pointerOffset,
			sizes: this.sizes,
			dir: t
		});
	}
	onThumbPointerUp() {
		this.pointerOffset = 0;
	}
	onThumbPointerDown(e) {
		this.pointerOffset = e;
	}
	xOnThumbPositionChange() {
		if (!(this.root.viewportNode && this.thumbNode)) return;
		let e = this.root.viewportNode.scrollLeft, t = `translate3d(${Z({
			scrollPos: e,
			sizes: this.sizes,
			dir: this.root.opts.dir.current
		})}px, 0, 0)`;
		this.thumbNode.style.transform = t, this.prevTransformStyle = t;
	}
	xOnWheelScroll(e) {
		this.root.viewportNode && (this.root.viewportNode.scrollLeft = e);
	}
	xOnDragScroll(e) {
		this.root.viewportNode && (this.root.viewportNode.scrollLeft = this.getScrollPosition(e, this.root.opts.dir.current));
	}
	yOnThumbPositionChange() {
		if (!(this.root.viewportNode && this.thumbNode)) return;
		let e = this.root.viewportNode.scrollTop, t = `translate3d(0, ${Z({
			scrollPos: e,
			sizes: this.sizes
		})}px, 0)`;
		this.thumbNode.style.transform = t, this.prevTransformStyle = t;
	}
	yOnWheelScroll(e) {
		this.root.viewportNode && (this.root.viewportNode.scrollTop = e);
	}
	yOnDragScroll(e) {
		this.root.viewportNode && (this.root.viewportNode.scrollTop = this.getScrollPosition(e, this.root.opts.dir.current));
	}
}, _e = class n {
	static create(e) {
		return G.set(new n(e, W.get()));
	}
	opts;
	scrollbarVis;
	root;
	scrollbar;
	attachment;
	#e = E();
	get computedStyle() {
		return e(this.#e);
	}
	set computedStyle(e) {
		d(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.scrollbarVis = t, this.root = t.root, this.scrollbar = t.scrollbar, this.attachment = j(this.scrollbar.opts.ref, (e) => this.root.scrollbarXNode = e), y(() => {
			this.scrollbar.opts.ref.current && this.opts.mounted.current && (this.computedStyle = getComputedStyle(this.scrollbar.opts.ref.current));
		}), y(() => {
			this.onResize();
		});
	}
	onThumbPointerDown = (e) => {
		this.scrollbarVis.onThumbPointerDown(e.x);
	};
	onDragScroll = (e) => {
		this.scrollbarVis.xOnDragScroll(e.x);
	};
	onThumbPointerUp = () => {
		this.scrollbarVis.onThumbPointerUp();
	};
	onThumbPositionChange = () => {
		this.scrollbarVis.xOnThumbPositionChange();
	};
	onWheelScroll = (e, t) => {
		if (!this.root.viewportNode) return;
		let n = this.root.viewportNode.scrollLeft + e.deltaX;
		this.scrollbarVis.xOnWheelScroll(n), Ce(n, t) && e.preventDefault();
	};
	onResize = () => {
		this.scrollbar.opts.ref.current && this.root.viewportNode && this.computedStyle && this.scrollbarVis.setSizes({
			content: this.root.viewportNode.scrollWidth,
			viewport: this.root.viewportNode.offsetWidth,
			scrollbar: {
				size: this.scrollbar.opts.ref.current.clientWidth,
				paddingStart: J(this.computedStyle.paddingLeft),
				paddingEnd: J(this.computedStyle.paddingRight)
			}
		});
	};
	#t = t(() => X(this.scrollbarVis.sizes));
	get thumbSize() {
		return e(this.#t);
	}
	set thumbSize(e) {
		d(this.#t, e);
	}
	#n = t(() => ({
		id: this.scrollbar.opts.id.current,
		"data-orientation": "horizontal",
		style: {
			bottom: 0,
			left: this.root.opts.dir.current === "rtl" ? "var(--bits-scroll-area-corner-width)" : 0,
			right: this.root.opts.dir.current === "ltr" ? "var(--bits-scroll-area-corner-width)" : 0,
			"--bits-scroll-area-thumb-width": `${this.thumbSize}px`
		},
		...this.attachment
	}));
	get props() {
		return e(this.#n);
	}
	set props(e) {
		d(this.#n, e);
	}
}, ve = class n {
	static create(e) {
		return G.set(new n(e, W.get()));
	}
	opts;
	scrollbarVis;
	root;
	scrollbar;
	attachment;
	#e = E();
	get computedStyle() {
		return e(this.#e);
	}
	set computedStyle(e) {
		d(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.scrollbarVis = t, this.root = t.root, this.scrollbar = t.scrollbar, this.attachment = j(this.scrollbar.opts.ref, (e) => this.root.scrollbarYNode = e), y(() => {
			this.scrollbar.opts.ref.current && this.opts.mounted.current && (this.computedStyle = getComputedStyle(this.scrollbar.opts.ref.current));
		}), y(() => {
			this.onResize();
		}), this.onThumbPointerDown = this.onThumbPointerDown.bind(this), this.onDragScroll = this.onDragScroll.bind(this), this.onThumbPointerUp = this.onThumbPointerUp.bind(this), this.onThumbPositionChange = this.onThumbPositionChange.bind(this), this.onWheelScroll = this.onWheelScroll.bind(this), this.onResize = this.onResize.bind(this);
	}
	onThumbPointerDown(e) {
		this.scrollbarVis.onThumbPointerDown(e.y);
	}
	onDragScroll(e) {
		this.scrollbarVis.yOnDragScroll(e.y);
	}
	onThumbPointerUp() {
		this.scrollbarVis.onThumbPointerUp();
	}
	onThumbPositionChange() {
		this.scrollbarVis.yOnThumbPositionChange();
	}
	onWheelScroll(e, t) {
		if (!this.root.viewportNode) return;
		let n = this.root.viewportNode.scrollTop + e.deltaY;
		this.scrollbarVis.yOnWheelScroll(n), Ce(n, t) && e.preventDefault();
	}
	onResize() {
		this.scrollbar.opts.ref.current && this.root.viewportNode && this.computedStyle && this.scrollbarVis.setSizes({
			content: this.root.viewportNode.scrollHeight,
			viewport: this.root.viewportNode.offsetHeight,
			scrollbar: {
				size: this.scrollbar.opts.ref.current.clientHeight,
				paddingStart: J(this.computedStyle.paddingTop),
				paddingEnd: J(this.computedStyle.paddingBottom)
			}
		});
	}
	#t = t(() => X(this.scrollbarVis.sizes));
	get thumbSize() {
		return e(this.#t);
	}
	set thumbSize(e) {
		d(this.#t, e);
	}
	#n = t(() => ({
		id: this.scrollbar.opts.id.current,
		"data-orientation": "vertical",
		style: {
			top: 0,
			right: this.root.opts.dir.current === "ltr" ? 0 : void 0,
			left: this.root.opts.dir.current === "rtl" ? 0 : void 0,
			bottom: "var(--bits-scroll-area-corner-height)",
			"--bits-scroll-area-thumb-height": `${this.thumbSize}px`
		},
		...this.attachment
	}));
	get props() {
		return e(this.#n);
	}
	set props(e) {
		d(this.#n, e);
	}
}, ye = class n {
	static create() {
		return K.set(new n(G.get()));
	}
	scrollbarState;
	root;
	scrollbarVis;
	scrollbar;
	#e = E(null);
	get rect() {
		return e(this.#e);
	}
	set rect(e) {
		d(this.#e, e);
	}
	#t = E("");
	get prevWebkitUserSelect() {
		return e(this.#t);
	}
	set prevWebkitUserSelect(e) {
		d(this.#t, e, !0);
	}
	handleResize;
	handleThumbPositionChange;
	handleWheelScroll;
	handleThumbPointerDown;
	handleThumbPointerUp;
	#n = t(() => this.scrollbarVis.sizes.content - this.scrollbarVis.sizes.viewport);
	get maxScrollPos() {
		return e(this.#n);
	}
	set maxScrollPos(e) {
		d(this.#n, e);
	}
	constructor(e) {
		this.scrollbarState = e, this.root = e.root, this.scrollbarVis = e.scrollbarVis, this.scrollbar = e.scrollbarVis.scrollbar, this.handleResize = () => this.scrollbarState.onResize(), this.handleThumbPositionChange = this.scrollbarState.onThumbPositionChange, this.handleWheelScroll = this.scrollbarState.onWheelScroll, this.handleThumbPointerDown = this.scrollbarState.onThumbPointerDown, this.handleThumbPointerUp = this.scrollbarState.onThumbPointerUp, y(() => {
			let e = this.maxScrollPos, t = this.scrollbar.opts.ref.current;
			return this.root.viewportNode, o(this.root.domContext.getDocument(), "wheel", (n) => {
				let r = n.target;
				t?.contains(r) && this.handleWheelScroll(n, e);
			}, { passive: !1 });
		}), g(() => {
			this.scrollbarVis.sizes, i(() => this.handleThumbPositionChange());
		}), new z(() => this.scrollbar.opts.ref.current, this.handleResize), new z(() => this.root.contentNode, this.handleResize), this.onpointerdown = this.onpointerdown.bind(this), this.onpointermove = this.onpointermove.bind(this), this.onpointerup = this.onpointerup.bind(this), this.onlostpointercapture = this.onlostpointercapture.bind(this);
	}
	handleDragScroll(e) {
		if (!this.rect) return;
		let t = e.clientX - this.rect.left, n = e.clientY - this.rect.top;
		this.scrollbarState.onDragScroll({
			x: t,
			y: n
		});
	}
	#r() {
		this.rect !== null && (this.root.domContext.getDocument().body.style.webkitUserSelect = this.prevWebkitUserSelect, this.root.viewportNode && (this.root.viewportNode.style.scrollBehavior = ""), this.rect = null);
	}
	onpointerdown(e) {
		e.button === 0 && (e.target.setPointerCapture(e.pointerId), this.rect = this.scrollbar.opts.ref.current?.getBoundingClientRect() ?? null, this.prevWebkitUserSelect = this.root.domContext.getDocument().body.style.webkitUserSelect, this.root.domContext.getDocument().body.style.webkitUserSelect = "none", this.root.viewportNode && (this.root.viewportNode.style.scrollBehavior = "auto"), this.handleDragScroll(e));
	}
	onpointermove(e) {
		this.handleDragScroll(e);
	}
	onpointerup(e) {
		let t = e.target;
		t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), this.#r();
	}
	onlostpointercapture(e) {
		this.#r();
	}
	#i = t(() => F({
		...this.scrollbarState.props,
		style: {
			position: "absolute",
			...this.scrollbarState.props.style
		},
		[V.scrollbar]: "",
		onpointerdown: this.onpointerdown,
		onpointermove: this.onpointermove,
		onpointerup: this.onpointerup,
		onlostpointercapture: this.onlostpointercapture
	}));
	get props() {
		return e(this.#i);
	}
	set props(e) {
		d(this.#i, e);
	}
}, be = class n {
	static create(e) {
		return new n(e, K.get());
	}
	opts;
	scrollbarState;
	attachment;
	#e;
	#t = E();
	#n = k(() => {
		e(this.#t) && (e(this.#t)(), d(this.#t, void 0));
	}, 100);
	constructor(t, n) {
		this.opts = t, this.scrollbarState = n, this.#e = n.root, this.attachment = j(this.opts.ref, (e) => this.scrollbarState.scrollbarVis.thumbNode = e), y(() => {
			let t = this.#e.viewportNode;
			return t ? (i(() => this.scrollbarState.handleThumbPositionChange()), o(t, "scroll", () => {
				if (this.#n(), !e(this.#t)) {
					let e = we(t, this.scrollbarState.handleThumbPositionChange);
					d(this.#t, e, !0), this.scrollbarState.handleThumbPositionChange();
				}
			})) : void 0;
		}), this.onpointerdowncapture = this.onpointerdowncapture.bind(this), this.onpointerup = this.onpointerup.bind(this);
	}
	onpointerdowncapture(e) {
		let t = e.target;
		if (!t) return;
		let n = t.getBoundingClientRect(), r = e.clientX - n.left, i = e.clientY - n.top;
		this.scrollbarState.handleThumbPointerDown({
			x: r,
			y: i
		});
	}
	onpointerup(e) {
		this.scrollbarState.handleThumbPointerUp();
	}
	#r = t(() => ({
		id: this.opts.id.current,
		"data-state": this.scrollbarState.scrollbarVis.hasThumb ? "visible" : "hidden",
		style: {
			width: "var(--bits-scroll-area-thumb-width)",
			height: "var(--bits-scroll-area-thumb-height)",
			transform: this.scrollbarState.scrollbarVis.prevTransformStyle
		},
		onpointerdowncapture: this.onpointerdowncapture,
		onpointerup: this.onpointerup,
		[V.thumb]: "",
		...this.attachment
	}));
	get props() {
		return e(this.#r);
	}
	set props(e) {
		d(this.#r, e);
	}
}, xe = class n {
	static create(e) {
		return new n(e, H.get());
	}
	opts;
	root;
	attachment;
	#e = E(0);
	#t = E(0);
	#n = t(() => !!(e(this.#e) && e(this.#t)));
	get hasSize() {
		return e(this.#n);
	}
	set hasSize(e) {
		d(this.#n, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = j(this.opts.ref), new z(() => this.root.scrollbarXNode, () => {
			let e = this.root.scrollbarXNode?.offsetHeight || 0;
			this.root.cornerHeight = e, d(this.#t, e, !0);
		}), new z(() => this.root.scrollbarYNode, () => {
			let e = this.root.scrollbarYNode?.offsetWidth || 0;
			this.root.cornerWidth = e, d(this.#e, e, !0);
		});
	}
	#r = t(() => ({
		id: this.opts.id.current,
		style: {
			width: e(this.#e),
			height: e(this.#t),
			position: "absolute",
			right: this.root.opts.dir.current === "ltr" ? 0 : void 0,
			left: this.root.opts.dir.current === "rtl" ? 0 : void 0,
			bottom: 0
		},
		[V.corner]: "",
		...this.attachment
	}));
	get props() {
		return e(this.#r);
	}
	set props(e) {
		d(this.#r, e);
	}
};
function J(e) {
	return e ? Number.parseInt(e, 10) : 0;
}
function Y(e, t) {
	let n = e / t;
	return Number.isNaN(n) ? 0 : n;
}
function X(e) {
	let t = Y(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
	return Math.max(r, 18);
}
function Se({ pointerPos: e, pointerOffset: t, sizes: n, dir: r = "ltr" }) {
	let i = X(n), a = i / 2, o = t || a, s = i - o, c = n.scrollbar.paddingStart + o, l = n.scrollbar.size - n.scrollbar.paddingEnd - s, u = n.content - n.viewport, d = r === "ltr" ? [0, u] : [u * -1, 0];
	return Q([c, l], d)(e);
}
function Z({ scrollPos: e, sizes: t, dir: n = "ltr" }) {
	let r = X(t), i = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - i, o = t.content - t.viewport, s = a - r, c = n === "ltr" ? [0, o] : [o * -1, 0], l = le(e, c[0], c[1]);
	return Q([0, o], [0, s])(l);
}
function Q(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
function Ce(e, t) {
	return e > 0 && e < t;
}
function we(e, t) {
	let n = {
		left: e.scrollLeft,
		top: e.scrollTop
	}, r = 0, i = ee(e);
	return (function a() {
		let o = {
			left: e.scrollLeft,
			top: e.scrollTop
		}, s = n.left !== o.left, c = n.top !== o.top;
		(s || c) && t(), n = o, r = i.requestAnimationFrame(a);
	})(), () => i.cancelAnimationFrame(r);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area.svelte
var Te = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"type",
	"dir",
	"scrollHideDelay",
	"children",
	"child"
]), Ee = c("<div><!></div>");
function De(n, i) {
	let o = r();
	l(i, !0);
	let s = f(i, "ref", 15, null), c = f(i, "id", 19, () => I(o)), d = f(i, "type", 3, "hover"), g = f(i, "dir", 3, "ltr"), y = f(i, "scrollHideDelay", 3, 600), b = _(i, Te), w = de.create({
		type: O(() => d()),
		dir: O(() => g()),
		scrollHideDelay: O(() => y()),
		id: O(() => c()),
		ref: O(() => s(), (e) => s(e))
	}), E = t(() => F(b, w.props));
	var D = T(), k = m(D), A = (t) => {
		var n = T(), r = m(n);
		x(r, () => i.child, () => ({ props: e(E) })), p(t, n);
	}, j = (t) => {
		var n = Ee();
		v(n, () => ({ ...e(E) }));
		var r = S(n);
		x(r, () => i.children ?? h), C(n), p(t, n);
	};
	u(k, (e) => {
		i.child ? e(A) : e(j, -1);
	}), p(n, D), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-viewport.svelte
var Oe = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"children"
]), ke = c("<div><div><!></div></div>"), Ae = {
	hash: "svelte-12bsh7m",
	code: "\n	/* Hide scrollbars cross browser and enable momentum scroll for touch devices */[data-scroll-area-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-scroll-area-viewport]::-webkit-scrollbar {display:none !important;}:where([data-scroll-area-viewport]) {display:flex;flex-direction:column;align-items:stretch;}:where([data-scroll-area-content]) {flex-grow:1;}"
};
function je(i, o) {
	let s = r();
	l(o, !0), n(i, Ae);
	let c = f(o, "ref", 15, null), u = f(o, "id", 19, () => I(s)), d = _(o, Oe), m = fe.create({
		id: O(() => u()),
		ref: O(() => c(), (e) => c(e))
	}), g = t(() => F(d, m.props)), y = t(() => F({}, m.contentProps));
	var b = ke();
	v(b, () => ({ ...e(g) }));
	var w = S(b);
	v(w, () => ({ ...e(y) }));
	var T = S(w);
	x(T, () => o.children ?? h), C(w), C(b), p(i, b), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-shared.svelte
var Me = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children"
]), Ne = c("<div><!></div>");
function Pe(n, r) {
	l(r, !0);
	let i = _(r, Me), o = ye.create(), s = t(() => F(i, o.props));
	var c = T(), d = m(c), f = (t) => {
		var n = T(), i = m(n);
		x(i, () => r.child, () => ({ props: e(s) })), p(t, n);
	}, g = (t) => {
		var n = Ne();
		v(n, () => ({ ...e(s) }));
		var i = S(n);
		x(i, () => r.children ?? h), C(n), p(t, n);
	};
	u(d, (e) => {
		r.child ? e(f) : e(g, -1);
	}), p(n, c), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-x.svelte
var Fe = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Ie(n, r) {
	l(r, !0);
	let i = _(r, Fe), o = new P(), s = _e.create({ mounted: O(() => o.current) }), c = t(() => F(i, s.props));
	Pe(n, b(() => e(c))), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-y.svelte
var Le = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Re(n, r) {
	l(r, !0);
	let i = _(r, Le), o = new P(), s = ve.create({ mounted: O(() => o.current) }), c = t(() => F(i, s.props));
	Pe(n, b(() => e(c))), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-visible.svelte
var ze = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function $(e, t) {
	l(t, !0);
	let n = _(t, ze), r = ge.create();
	var i = T(), o = m(i), s = (e) => {
		Ie(e, b(() => n));
	}, c = (e) => {
		Re(e, b(() => n));
	};
	u(o, (e) => {
		r.scrollbar.opts.orientation.current === "horizontal" ? e(s) : e(c, -1);
	}), p(e, i), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-auto.svelte
var Be = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"forceMount"
]);
function Ve(n, r) {
	l(r, !0);
	let i = f(r, "forceMount", 3, !1), o = _(r, Be), s = q.create(), c = t(() => F(o, s.props));
	{
		let r = (t) => {
			$(t, b(() => e(c)));
		}, a = t(() => i() || s.isVisible);
		B(n, {
			get open() {
				return e(a);
			},
			get ref() {
				return s.scrollbar.opts.ref;
			},
			presence: r,
			$$slots: { presence: !0 }
		});
	}
	a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-scroll.svelte
var He = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"forceMount"
]);
function Ue(n, r) {
	l(r, !0);
	let i = f(r, "forceMount", 3, !1), o = _(r, He), s = he.create(), c = t(() => F(o, s.props));
	{
		let r = (t) => {
			$(t, b(() => e(c)));
		}, a = t(() => i() || !s.isHidden);
		B(n, b(() => e(c), {
			get open() {
				return e(a);
			},
			get ref() {
				return s.scrollbar.opts.ref;
			},
			presence: r,
			$$slots: { presence: !0 }
		}));
	}
	a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-hover.svelte
var We = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"forceMount"
]);
function Ge(n, r) {
	l(r, !0);
	let i = f(r, "forceMount", 3, !1), o = _(r, We), s = me.create(), c = q.create(), u = t(() => F(o, s.props, c.props, { "data-state": s.isVisible ? "visible" : "hidden" })), d = t(() => i() || s.isVisible && c.isVisible);
	B(n, {
		get open() {
			return e(d);
		},
		get ref() {
			return c.scrollbar.opts.ref;
		},
		presence: (t) => {
			$(t, b(() => e(u)));
		},
		$$slots: { presence: !0 }
	}), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar.svelte
var Ke = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"orientation"
]);
function qe(n, i) {
	let o = r();
	l(i, !0);
	let s = f(i, "ref", 15, null), c = f(i, "id", 19, () => I(o)), d = _(i, Ke), h = pe.create({
		orientation: O(() => i.orientation),
		id: O(() => c()),
		ref: O(() => s(), (e) => s(e))
	}), g = t(() => h.root.opts.type.current);
	var v = T(), y = m(v), x = (e) => {
		Ge(e, b(() => d, { get id() {
			return c();
		} }));
	}, S = (e) => {
		Ue(e, b(() => d, { get id() {
			return c();
		} }));
	}, C = (e) => {
		Ve(e, b(() => d, { get id() {
			return c();
		} }));
	}, w = (e) => {
		$(e, b(() => d, { get id() {
			return c();
		} }));
	};
	u(y, (t) => {
		e(g) === "hover" ? t(x) : e(g) === "scroll" ? t(S, 1) : e(g) === "auto" ? t(C, 2) : e(g) === "always" && t(w, 3);
	}), p(n, v), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-thumb-impl.svelte
var Je = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"child",
	"children",
	"present"
]), Ye = c("<div><!></div>");
function Xe(n, r) {
	l(r, !0);
	let i = f(r, "ref", 15, null), o = _(r, Je), s = new P(), c = be.create({
		id: O(() => r.id),
		ref: O(() => i(), (e) => i(e)),
		mounted: O(() => s.current)
	}), d = t(() => F(o, c.props, { style: { hidden: !r.present } }));
	var g = T(), y = m(g), b = (t) => {
		var n = T(), i = m(n);
		x(i, () => r.child, () => ({ props: e(d) })), p(t, n);
	}, w = (t) => {
		var n = Ye();
		v(n, () => ({ ...e(d) }));
		var i = S(n);
		x(i, () => r.children ?? h), C(n), p(t, n);
	};
	u(y, (e) => {
		r.child ? e(b) : e(w, -1);
	}), p(n, g), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-thumb.svelte
var Ze = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"forceMount"
]);
function Qe(n, i) {
	let o = r();
	l(i, !0);
	let s = f(i, "id", 19, () => I(o)), c = f(i, "ref", 15, null), u = f(i, "forceMount", 3, !1), d = _(i, Ze), p = W.get();
	{
		let r = (e, t) => {
			let n = () => (t?.()).present;
			Xe(e, b(() => d, {
				get id() {
					return s();
				},
				get present() {
					return n();
				},
				get ref() {
					return c();
				},
				set ref(e) {
					c(e);
				}
			}));
		}, i = t(() => u() || p.hasThumb);
		B(n, {
			get open() {
				return e(i);
			},
			get ref() {
				return p.scrollbar.opts.ref;
			},
			presence: r,
			$$slots: { presence: !0 }
		});
	}
	a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-corner-impl.svelte
var $e = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"children",
	"child"
]), et = c("<div><!></div>");
function tt(n, r) {
	l(r, !0);
	let i = f(r, "ref", 15, null), o = _(r, $e), s = xe.create({
		id: O(() => r.id),
		ref: O(() => i(), (e) => i(e))
	}), c = t(() => F(o, s.props));
	var d = T(), g = m(d), y = (t) => {
		var n = T(), i = m(n);
		x(i, () => r.child, () => ({ props: e(c) })), p(t, n);
	}, b = (t) => {
		var n = et();
		v(n, () => ({ ...e(c) }));
		var i = S(n);
		x(i, () => r.children ?? h), C(n), p(t, n);
	};
	u(g, (e) => {
		r.child ? e(y) : e(b, -1);
	}), p(n, d), a();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-corner.svelte
var nt = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id"
]);
function rt(n, i) {
	let o = r();
	l(i, !0);
	let s = f(i, "ref", 15, null), c = f(i, "id", 19, () => I(o)), d = _(i, nt), h = H.get(), g = t(() => !!(h.scrollbarXNode && h.scrollbarYNode)), v = t(() => h.opts.type.current !== "scroll" && e(g));
	var y = T(), x = m(y), S = (e) => {
		tt(e, b(() => d, {
			get id() {
				return c();
			},
			get ref() {
				return s();
			},
			set ref(e) {
				s(e);
			}
		}));
	};
	u(x, (t) => {
		e(v) && t(S);
	}), p(n, y), a();
}
//#endregion
//#region ../ui/src/lib/components/scroll-area/scroll-area.svelte
var it = (e, t) => {
	let n = () => (t?.()).orientation;
	var r = T(), i = m(r);
	s(i, () => qe, (e, t) => {
		t(e, {
			get orientation() {
				return n();
			},
			children: (e, t) => {
				var n = T(), r = m(n);
				s(r, () => Qe, (e, t) => {
					t(e, {});
				}), p(e, n);
			},
			$$slots: { default: !0 }
		});
	}), p(e, r);
}, at = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"orientation",
	"viewportClasses",
	"children"
]), ot = c("<!> <!> <!> <!>", 1);
function st(e, t) {
	l(t, !0);
	let n = f(t, "ref", 15, null), r = f(t, "orientation", 3, "vertical"), i = _(t, at);
	var o = T(), c = m(o);
	s(c, () => De, (e, a) => {
		a(e, b(() => i, {
			get ref() {
				return n();
			},
			set ref(e) {
				n(e);
			},
			children: (e, n) => {
				var i = ot(), a = m(i);
				s(a, () => je, (e, n) => {
					n(e, {
						get class() {
							return t.viewportClasses;
						},
						children: (e, n) => {
							var r = T(), i = m(r);
							x(i, () => t.children ?? h), p(e, r);
						},
						$$slots: { default: !0 }
					});
				});
				var o = w(a, 2), c = (e) => {
					it(e, () => ({ orientation: "vertical" }));
				};
				u(o, (e) => {
					(r() === "vertical" || r() === "both") && e(c);
				});
				var l = w(o, 2), d = (e) => {
					it(e, () => ({ orientation: "horizontal" }));
				};
				u(l, (e) => {
					(r() === "horizontal" || r() === "both") && e(d);
				});
				var f = w(l, 2);
				s(f, () => rt, (e, t) => {
					t(e, {});
				}), p(e, i);
			},
			$$slots: { default: !0 }
		}));
	}), p(e, o), a();
}
//#endregion
export { st as t };
