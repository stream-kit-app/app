import { $n as e, Ct as t, Gn as n, Hr as r, Kn as i, Nn as a, On as o, Qn as s, Qr as c, Qt as l, Vr as u, Z as d, Zn as f, _t as p, a as m, cn as h, cr as g, jt as _, ln as v, mn as y, ni as b, o as x, or as S, pr as C, s as w, un as T, xn as E } from "./client-xxWnFgeR.js";
import "./disclose-version-YhYaTdgb.js";
import "./index-client-DLfVeyOI.js";
import { C as D, D as O, S as k, _ as A, d as j, h as ee, j as M, o as te, t as ne, x as N, y as P } from "./animations-complete-DFBLw3EK.js";
import { i as F, n as I, o as re, r as ie, t as ae } from "./use-id-Dbt6eP9X.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/internal/svelte-resize-observer.svelte.js
var L = class {
	#e;
	#t;
	constructor(e, t) {
		this.#e = e, this.#t = t, this.handler = this.handler.bind(this), n(this.handler);
	}
	handler() {
		let e = 0, t = this.#e();
		if (!t) return;
		let n = new ResizeObserver(() => {
			cancelAnimationFrame(e), e = window.requestAnimationFrame(this.#t);
		});
		return n.observe(t), () => {
			window.cancelAnimationFrame(e), n.unobserve(t);
		};
	}
}, oe = class {
	opts;
	present;
	#e;
	#t = g(!1);
	#n = !1;
	#r = g(void 0);
	#i = null;
	constructor(e) {
		this.opts = e, this.present = this.opts.open, S(this.#t, e.open.current, !0), this.#e = new ne({
			ref: this.opts.ref,
			afterTick: this.opts.open
		}), A(() => this.#o()), N(() => this.present.current, (e) => {
			if (!this.#n) {
				this.#n = !0;
				return;
			}
			this.#o(), e && S(this.#t, !0), S(this.#r, e ? "starting" : "ending", !0), e && (this.#i = window.requestAnimationFrame(() => {
				this.#i = null, this.present.current && S(this.#r, void 0);
			})), this.#e.run(() => {
				e === this.present.current && (e || S(this.#t, !1), S(this.#r, void 0));
			});
		});
	}
	#a = C(() => o(this.#t));
	get isPresent() {
		return o(this.#a);
	}
	set isPresent(e) {
		S(this.#a, e);
	}
	get transitionStatus() {
		return o(this.#r);
	}
	#o() {
		this.#i !== null && (window.cancelAnimationFrame(this.#i), this.#i = null);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/utilities/presence-layer/presence-layer.svelte
function R(e, t) {
	r(t, !0);
	let n = new oe({
		open: O(() => t.open),
		ref: t.ref
	});
	var i = v(), a = s(i), o = (e) => {
		var r = v();
		l(s(r), () => t.presence ?? b, () => ({
			present: n.isPresent,
			transitionStatus: n.transitionStatus
		})), h(e, r);
	};
	_(a, (e) => {
		(t.forceMount || t.open || n.isPresent) && e(o);
	}), h(e, i), u();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/internal/clamp.js
function se(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/internal/state-machine.js
var ce = class {
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
}, z = te({
	component: "scroll-area",
	parts: [
		"root",
		"viewport",
		"corner",
		"thumb",
		"scrollbar"
	]
}), B = new D("ScrollArea.Root"), V = new D("ScrollArea.Scrollbar"), H = new D("ScrollArea.ScrollbarVisible"), U = new D("ScrollArea.ScrollbarAxis"), W = new D("ScrollArea.ScrollbarShared"), le = class e {
	static create(t) {
		return B.set(new e(t));
	}
	opts;
	attachment;
	#e = g(null);
	get scrollAreaNode() {
		return o(this.#e);
	}
	set scrollAreaNode(e) {
		S(this.#e, e, !0);
	}
	#t = g(null);
	get viewportNode() {
		return o(this.#t);
	}
	set viewportNode(e) {
		S(this.#t, e, !0);
	}
	#n = g(null);
	get contentNode() {
		return o(this.#n);
	}
	set contentNode(e) {
		S(this.#n, e, !0);
	}
	#r = g(null);
	get scrollbarXNode() {
		return o(this.#r);
	}
	set scrollbarXNode(e) {
		S(this.#r, e, !0);
	}
	#i = g(null);
	get scrollbarYNode() {
		return o(this.#i);
	}
	set scrollbarYNode(e) {
		S(this.#i, e, !0);
	}
	#a = g(0);
	get cornerWidth() {
		return o(this.#a);
	}
	set cornerWidth(e) {
		S(this.#a, e, !0);
	}
	#o = g(0);
	get cornerHeight() {
		return o(this.#o);
	}
	set cornerHeight(e) {
		S(this.#o, e, !0);
	}
	#s = g(!1);
	get scrollbarXEnabled() {
		return o(this.#s);
	}
	set scrollbarXEnabled(e) {
		S(this.#s, e, !0);
	}
	#c = g(!1);
	get scrollbarYEnabled() {
		return o(this.#c);
	}
	set scrollbarYEnabled(e) {
		S(this.#c, e, !0);
	}
	domContext;
	constructor(e) {
		this.opts = e, this.attachment = j(e.ref, (e) => this.scrollAreaNode = e), this.domContext = new ie(e.ref);
	}
	#l = C(() => ({
		id: this.opts.id.current,
		dir: this.opts.dir.current,
		style: {
			position: "relative",
			"--bits-scroll-area-corner-height": `${this.cornerHeight}px`,
			"--bits-scroll-area-corner-width": `${this.cornerWidth}px`
		},
		[z.root]: "",
		...this.attachment
	}));
	get props() {
		return o(this.#l);
	}
	set props(e) {
		S(this.#l, e);
	}
}, ue = class e {
	static create(t) {
		return new e(t, B.get());
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
	#n = C(() => ({
		id: this.opts.id.current,
		style: {
			overflowX: this.root.scrollbarXEnabled ? "scroll" : "hidden",
			overflowY: this.root.scrollbarYEnabled ? "scroll" : "hidden"
		},
		[z.viewport]: "",
		...this.attachment
	}));
	get props() {
		return o(this.#n);
	}
	set props(e) {
		S(this.#n, e);
	}
	#r = C(() => ({
		id: this.#e.current,
		"data-scroll-area-content": "",
		style: { minWidth: this.root.scrollbarXEnabled ? "fit-content" : void 0 },
		...this.contentAttachment
	}));
	get contentProps() {
		return o(this.#r);
	}
	set contentProps(e) {
		S(this.#r, e);
	}
}, de = class e {
	static create(t) {
		return V.set(new e(t, B.get()));
	}
	opts;
	root;
	#e = C(() => this.opts.orientation.current === "horizontal");
	get isHorizontal() {
		return o(this.#e);
	}
	set isHorizontal(e) {
		S(this.#e, e);
	}
	#t = g(!1);
	get hasThumb() {
		return o(this.#t);
	}
	set hasThumb(e) {
		S(this.#t, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, N(() => this.isHorizontal, (e) => e ? (this.root.scrollbarXEnabled = !0, () => {
			this.root.scrollbarXEnabled = !1;
		}) : (this.root.scrollbarYEnabled = !0, () => {
			this.root.scrollbarYEnabled = !1;
		}));
	}
}, fe = class e {
	static create() {
		return new e(V.get());
	}
	scrollbar;
	root;
	#e = g(!1);
	get isVisible() {
		return o(this.#e);
	}
	set isVisible(e) {
		S(this.#e, e, !0);
	}
	constructor(e) {
		this.scrollbar = e, this.root = e.root, n(() => {
			let e = this.root.scrollAreaNode, t = this.root.opts.scrollHideDelay.current, n = 0;
			if (!e) return;
			let r = re(E(e, "pointerenter", () => {
				this.root.domContext.clearTimeout(n), a(() => this.isVisible = !0);
			}), E(e, "pointerleave", () => {
				n && this.root.domContext.clearTimeout(n), n = this.root.domContext.setTimeout(() => {
					a(() => {
						this.scrollbar.hasThumb = !1, this.isVisible = !1;
					});
				}, t);
			}));
			return () => {
				this.root.domContext.getWindow().clearTimeout(n), r();
			};
		});
	}
	#t = C(() => ({ "data-state": this.isVisible ? "visible" : "hidden" }));
	get props() {
		return o(this.#t);
	}
	set props(e) {
		S(this.#t, e);
	}
}, pe = class e {
	static create() {
		return new e(V.get());
	}
	scrollbar;
	root;
	machine = new ce("hidden", {
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
	#e = C(() => this.machine.state.current === "hidden");
	get isHidden() {
		return o(this.#e);
	}
	set isHidden(e) {
		S(this.#e, e);
	}
	constructor(e) {
		this.scrollbar = e, this.root = e.root;
		let t = k(() => this.machine.dispatch("SCROLL_END"), 100);
		n(() => {
			let e = this.machine.state.current, t = this.root.opts.scrollHideDelay.current;
			if (e === "idle") {
				let e = this.root.domContext.setTimeout(() => this.machine.dispatch("HIDE"), t);
				return () => this.root.domContext.clearTimeout(e);
			}
		}), n(() => {
			let e = this.root.viewportNode;
			if (!e) return;
			let n = this.scrollbar.isHorizontal ? "scrollLeft" : "scrollTop", r = e[n];
			return E(e, "scroll", () => {
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
	#t = C(() => ({
		"data-state": this.machine.state.current === "hidden" ? "hidden" : "visible",
		onpointerenter: this.onpointerenter,
		onpointerleave: this.onpointerleave
	}));
	get props() {
		return o(this.#t);
	}
	set props(e) {
		S(this.#t, e);
	}
}, G = class e {
	static create() {
		return new e(V.get());
	}
	scrollbar;
	root;
	#e = g(!1);
	get isVisible() {
		return o(this.#e);
	}
	set isVisible(e) {
		S(this.#e, e, !0);
	}
	constructor(e) {
		this.scrollbar = e, this.root = e.root;
		let t = k(() => {
			let e = this.root.viewportNode;
			if (!e) return;
			let t = e.offsetWidth < e.scrollWidth, n = e.offsetHeight < e.scrollHeight;
			this.isVisible = this.scrollbar.isHorizontal ? t : n;
		}, 10);
		new L(() => this.root.viewportNode, t), new L(() => this.root.contentNode, t);
	}
	#t = C(() => ({ "data-state": this.isVisible ? "visible" : "hidden" }));
	get props() {
		return o(this.#t);
	}
	set props(e) {
		S(this.#t, e);
	}
}, me = class e {
	static create() {
		return H.set(new e(V.get()));
	}
	scrollbar;
	root;
	#e = g(null);
	get thumbNode() {
		return o(this.#e);
	}
	set thumbNode(e) {
		S(this.#e, e, !0);
	}
	#t = g(0);
	get pointerOffset() {
		return o(this.#t);
	}
	set pointerOffset(e) {
		S(this.#t, e, !0);
	}
	#n = g({
		content: 0,
		viewport: 0,
		scrollbar: {
			size: 0,
			paddingStart: 0,
			paddingEnd: 0
		}
	});
	get sizes() {
		return o(this.#n);
	}
	set sizes(e) {
		S(this.#n, e);
	}
	#r = C(() => q(this.sizes.viewport, this.sizes.content));
	get thumbRatio() {
		return o(this.#r);
	}
	set thumbRatio(e) {
		S(this.#r, e);
	}
	#i = C(() => this.thumbRatio > 0 && this.thumbRatio < 1);
	get hasThumb() {
		return o(this.#i);
	}
	set hasThumb(e) {
		S(this.#i, e);
	}
	#a = g("");
	get prevTransformStyle() {
		return o(this.#a);
	}
	set prevTransformStyle(e) {
		S(this.#a, e, !0);
	}
	constructor(e) {
		this.scrollbar = e, this.root = e.root, n(() => {
			this.scrollbar.hasThumb = this.hasThumb;
		}), n(() => {
			!this.scrollbar.hasThumb && this.thumbNode && (this.prevTransformStyle = this.thumbNode.style.transform);
		});
	}
	setSizes(e) {
		this.sizes = e;
	}
	getScrollPosition(e, t) {
		return be({
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
		let e = this.root.viewportNode.scrollLeft, t = `translate3d(${Y({
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
		let e = this.root.viewportNode.scrollTop, t = `translate3d(0, ${Y({
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
}, he = class e {
	static create(t) {
		return U.set(new e(t, H.get()));
	}
	opts;
	scrollbarVis;
	root;
	scrollbar;
	attachment;
	#e = g();
	get computedStyle() {
		return o(this.#e);
	}
	set computedStyle(e) {
		S(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.scrollbarVis = t, this.root = t.root, this.scrollbar = t.scrollbar, this.attachment = j(this.scrollbar.opts.ref, (e) => this.root.scrollbarXNode = e), n(() => {
			this.scrollbar.opts.ref.current && this.opts.mounted.current && (this.computedStyle = getComputedStyle(this.scrollbar.opts.ref.current));
		}), n(() => {
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
		this.scrollbarVis.xOnWheelScroll(n), Z(n, t) && e.preventDefault();
	};
	onResize = () => {
		this.scrollbar.opts.ref.current && this.root.viewportNode && this.computedStyle && this.scrollbarVis.setSizes({
			content: this.root.viewportNode.scrollWidth,
			viewport: this.root.viewportNode.offsetWidth,
			scrollbar: {
				size: this.scrollbar.opts.ref.current.clientWidth,
				paddingStart: K(this.computedStyle.paddingLeft),
				paddingEnd: K(this.computedStyle.paddingRight)
			}
		});
	};
	#t = C(() => J(this.scrollbarVis.sizes));
	get thumbSize() {
		return o(this.#t);
	}
	set thumbSize(e) {
		S(this.#t, e);
	}
	#n = C(() => ({
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
		return o(this.#n);
	}
	set props(e) {
		S(this.#n, e);
	}
}, ge = class e {
	static create(t) {
		return U.set(new e(t, H.get()));
	}
	opts;
	scrollbarVis;
	root;
	scrollbar;
	attachment;
	#e = g();
	get computedStyle() {
		return o(this.#e);
	}
	set computedStyle(e) {
		S(this.#e, e, !0);
	}
	constructor(e, t) {
		this.opts = e, this.scrollbarVis = t, this.root = t.root, this.scrollbar = t.scrollbar, this.attachment = j(this.scrollbar.opts.ref, (e) => this.root.scrollbarYNode = e), n(() => {
			this.scrollbar.opts.ref.current && this.opts.mounted.current && (this.computedStyle = getComputedStyle(this.scrollbar.opts.ref.current));
		}), n(() => {
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
		this.scrollbarVis.yOnWheelScroll(n), Z(n, t) && e.preventDefault();
	}
	onResize() {
		this.scrollbar.opts.ref.current && this.root.viewportNode && this.computedStyle && this.scrollbarVis.setSizes({
			content: this.root.viewportNode.scrollHeight,
			viewport: this.root.viewportNode.offsetHeight,
			scrollbar: {
				size: this.scrollbar.opts.ref.current.clientHeight,
				paddingStart: K(this.computedStyle.paddingTop),
				paddingEnd: K(this.computedStyle.paddingBottom)
			}
		});
	}
	#t = C(() => J(this.scrollbarVis.sizes));
	get thumbSize() {
		return o(this.#t);
	}
	set thumbSize(e) {
		S(this.#t, e);
	}
	#n = C(() => ({
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
		return o(this.#n);
	}
	set props(e) {
		S(this.#n, e);
	}
}, _e = class e {
	static create() {
		return W.set(new e(U.get()));
	}
	scrollbarState;
	root;
	scrollbarVis;
	scrollbar;
	#e = g(null);
	get rect() {
		return o(this.#e);
	}
	set rect(e) {
		S(this.#e, e);
	}
	#t = g("");
	get prevWebkitUserSelect() {
		return o(this.#t);
	}
	set prevWebkitUserSelect(e) {
		S(this.#t, e, !0);
	}
	handleResize;
	handleThumbPositionChange;
	handleWheelScroll;
	handleThumbPointerDown;
	handleThumbPointerUp;
	#n = C(() => this.scrollbarVis.sizes.content - this.scrollbarVis.sizes.viewport);
	get maxScrollPos() {
		return o(this.#n);
	}
	set maxScrollPos(e) {
		S(this.#n, e);
	}
	constructor(e) {
		this.scrollbarState = e, this.root = e.root, this.scrollbarVis = e.scrollbarVis, this.scrollbar = e.scrollbarVis.scrollbar, this.handleResize = k(() => this.scrollbarState.onResize(), 10), this.handleThumbPositionChange = this.scrollbarState.onThumbPositionChange, this.handleWheelScroll = this.scrollbarState.onWheelScroll, this.handleThumbPointerDown = this.scrollbarState.onThumbPointerDown, this.handleThumbPointerUp = this.scrollbarState.onThumbPointerUp, n(() => {
			let e = this.maxScrollPos, t = this.scrollbar.opts.ref.current;
			return this.root.viewportNode, E(this.root.domContext.getDocument(), "wheel", (n) => {
				let r = n.target;
				t?.contains(r) && this.handleWheelScroll(n, e);
			}, { passive: !1 });
		}), i(() => {
			this.scrollbarVis.sizes, a(() => this.handleThumbPositionChange());
		}), new L(() => this.scrollbar.opts.ref.current, this.handleResize), new L(() => this.root.contentNode, this.handleResize), this.onpointerdown = this.onpointerdown.bind(this), this.onpointermove = this.onpointermove.bind(this), this.onpointerup = this.onpointerup.bind(this), this.onlostpointercapture = this.onlostpointercapture.bind(this);
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
	#i = C(() => F({
		...this.scrollbarState.props,
		style: {
			position: "absolute",
			...this.scrollbarState.props.style
		},
		[z.scrollbar]: "",
		onpointerdown: this.onpointerdown,
		onpointermove: this.onpointermove,
		onpointerup: this.onpointerup,
		onlostpointercapture: this.onlostpointercapture
	}));
	get props() {
		return o(this.#i);
	}
	set props(e) {
		S(this.#i, e);
	}
}, ve = class e {
	static create(t) {
		return new e(t, W.get());
	}
	opts;
	scrollbarState;
	attachment;
	#e;
	#t = g();
	#n = k(() => {
		o(this.#t) && (o(this.#t)(), S(this.#t, void 0));
	}, 100);
	constructor(e, t) {
		this.opts = e, this.scrollbarState = t, this.#e = t.root, this.attachment = j(this.opts.ref, (e) => this.scrollbarState.scrollbarVis.thumbNode = e), n(() => {
			let e = this.#e.viewportNode;
			return e ? (a(() => this.scrollbarState.handleThumbPositionChange()), E(e, "scroll", () => {
				if (this.#n(), !o(this.#t)) {
					let t = xe(e, this.scrollbarState.handleThumbPositionChange);
					S(this.#t, t, !0), this.scrollbarState.handleThumbPositionChange();
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
	#r = C(() => ({
		id: this.opts.id.current,
		"data-state": this.scrollbarState.scrollbarVis.hasThumb ? "visible" : "hidden",
		style: {
			width: "var(--bits-scroll-area-thumb-width)",
			height: "var(--bits-scroll-area-thumb-height)",
			transform: this.scrollbarState.scrollbarVis.prevTransformStyle
		},
		onpointerdowncapture: this.onpointerdowncapture,
		onpointerup: this.onpointerup,
		[z.thumb]: "",
		...this.attachment
	}));
	get props() {
		return o(this.#r);
	}
	set props(e) {
		S(this.#r, e);
	}
}, ye = class e {
	static create(t) {
		return new e(t, B.get());
	}
	opts;
	root;
	attachment;
	#e = g(0);
	#t = g(0);
	#n = C(() => !!(o(this.#e) && o(this.#t)));
	get hasSize() {
		return o(this.#n);
	}
	set hasSize(e) {
		S(this.#n, e);
	}
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = j(this.opts.ref), new L(() => this.root.scrollbarXNode, () => {
			let e = this.root.scrollbarXNode?.offsetHeight || 0;
			this.root.cornerHeight = e, S(this.#t, e, !0);
		}), new L(() => this.root.scrollbarYNode, () => {
			let e = this.root.scrollbarYNode?.offsetWidth || 0;
			this.root.cornerWidth = e, S(this.#e, e, !0);
		});
	}
	#r = C(() => ({
		id: this.opts.id.current,
		style: {
			width: o(this.#e),
			height: o(this.#t),
			position: "absolute",
			right: this.root.opts.dir.current === "ltr" ? 0 : void 0,
			left: this.root.opts.dir.current === "rtl" ? 0 : void 0,
			bottom: 0
		},
		[z.corner]: "",
		...this.attachment
	}));
	get props() {
		return o(this.#r);
	}
	set props(e) {
		S(this.#r, e);
	}
};
function K(e) {
	return e ? Number.parseInt(e, 10) : 0;
}
function q(e, t) {
	let n = e / t;
	return Number.isNaN(n) ? 0 : n;
}
function J(e) {
	let t = q(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
	return Math.max(r, 18);
}
function be({ pointerPos: e, pointerOffset: t, sizes: n, dir: r = "ltr" }) {
	let i = J(n), a = i / 2, o = t || a, s = i - o, c = n.scrollbar.paddingStart + o, l = n.scrollbar.size - n.scrollbar.paddingEnd - s, u = n.content - n.viewport, d = r === "ltr" ? [0, u] : [u * -1, 0];
	return X([c, l], d)(e);
}
function Y({ scrollPos: e, sizes: t, dir: n = "ltr" }) {
	let r = J(t), i = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - i, o = t.content - t.viewport, s = a - r, c = n === "ltr" ? [0, o] : [o * -1, 0], l = se(e, c[0], c[1]);
	return X([0, o], [0, s])(l);
}
function X(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
function Z(e, t) {
	return e > 0 && e < t;
}
function xe(e, t) {
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
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area.svelte
var Se = new Set([
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
]), Ce = T("<div><!></div>");
function we(e, t) {
	let n = y();
	r(t, !0);
	let i = m(t, "ref", 15, null), a = m(t, "id", 19, () => I(n)), p = m(t, "type", 3, "hover"), g = m(t, "dir", 3, "ltr"), S = m(t, "scrollHideDelay", 3, 600), w = x(t, Se), T = le.create({
		type: O(() => p()),
		dir: O(() => g()),
		scrollHideDelay: O(() => S()),
		id: O(() => a()),
		ref: O(() => i(), (e) => i(e))
	}), E = C(() => F(w, T.props));
	var D = v(), k = s(D), A = (e) => {
		var n = v();
		l(s(n), () => t.child, () => ({ props: o(E) })), h(e, n);
	}, j = (e) => {
		var n = Ce();
		d(n, () => ({ ...o(E) })), l(f(n), () => t.children ?? b), c(n), h(e, n);
	};
	_(k, (e) => {
		t.child ? e(A) : e(j, -1);
	}), h(e, D), u();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-viewport.svelte
var Te = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"children"
]), Ee = T("<div><div><!></div></div>"), De = {
	hash: "svelte-enr2ez",
	code: "\n	/* Hide scrollbars cross browser and enable momentum scroll for touch devices */[data-scroll-area-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-scroll-area-viewport]::-webkit-scrollbar {display:none !important;}:where([data-scroll-area-viewport]) {display:flex;flex-direction:column;align-items:stretch;}:where([data-scroll-area-content]) {flex-grow:1;}"
};
function Oe(e, t) {
	let n = y();
	r(t, !0), p(e, De);
	let i = m(t, "ref", 15, null), a = m(t, "id", 19, () => I(n)), s = x(t, Te), g = ue.create({
		id: O(() => a()),
		ref: O(() => i(), (e) => i(e))
	}), _ = C(() => F(s, g.props)), v = C(() => F({}, g.contentProps));
	var S = Ee();
	d(S, () => ({ ...o(_) }));
	var w = f(S);
	d(w, () => ({ ...o(v) })), l(f(w), () => t.children ?? b), c(w), c(S), h(e, S), u();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-shared.svelte
var ke = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children"
]), Ae = T("<div><!></div>");
function Q(e, t) {
	r(t, !0);
	let n = x(t, ke), i = _e.create(), a = C(() => F(n, i.props));
	var p = v(), m = s(p), g = (e) => {
		var n = v();
		l(s(n), () => t.child, () => ({ props: o(a) })), h(e, n);
	}, y = (e) => {
		var n = Ae();
		d(n, () => ({ ...o(a) })), l(f(n), () => t.children ?? b), c(n), h(e, n);
	};
	_(m, (e) => {
		t.child ? e(g) : e(y, -1);
	}), h(e, p), u();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-x.svelte
var je = new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Me(e, t) {
	r(t, !0);
	let n = x(t, je), i = new P(), a = he.create({ mounted: O(() => i.current) }), s = C(() => F(n, a.props));
	Q(e, w(() => o(s))), u();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-y.svelte
var Ne = new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Pe(e, t) {
	r(t, !0);
	let n = x(t, Ne), i = new P(), a = ge.create({ mounted: O(() => i.current) }), s = C(() => F(n, a.props));
	Q(e, w(() => o(s))), u();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-visible.svelte
var Fe = new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function $(e, t) {
	r(t, !0);
	let n = x(t, Fe), i = me.create();
	var a = v(), o = s(a), c = (e) => {
		Me(e, w(() => n));
	}, l = (e) => {
		Pe(e, w(() => n));
	};
	_(o, (e) => {
		i.scrollbar.opts.orientation.current === "horizontal" ? e(c) : e(l, -1);
	}), h(e, a), u();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-auto.svelte
var Ie = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"forceMount"
]);
function Le(e, t) {
	r(t, !0);
	let n = m(t, "forceMount", 3, !1), i = x(t, Ie), a = G.create(), s = C(() => F(i, a.props));
	{
		let t = (e) => {
			$(e, w(() => o(s)));
		}, r = C(() => n() || a.isVisible);
		R(e, {
			get open() {
				return o(r);
			},
			get ref() {
				return a.scrollbar.opts.ref;
			},
			presence: t,
			$$slots: { presence: !0 }
		});
	}
	u();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-scroll.svelte
var Re = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"forceMount"
]);
function ze(e, t) {
	r(t, !0);
	let n = m(t, "forceMount", 3, !1), i = x(t, Re), a = pe.create(), s = C(() => F(i, a.props));
	{
		let t = (e) => {
			$(e, w(() => o(s)));
		}, r = C(() => n() || !a.isHidden);
		R(e, w(() => o(s), {
			get open() {
				return o(r);
			},
			get ref() {
				return a.scrollbar.opts.ref;
			},
			presence: t,
			$$slots: { presence: !0 }
		}));
	}
	u();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-hover.svelte
var Be = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"forceMount"
]);
function Ve(e, t) {
	r(t, !0);
	let n = m(t, "forceMount", 3, !1), i = x(t, Be), a = fe.create(), s = G.create(), c = C(() => F(i, a.props, s.props, { "data-state": a.isVisible ? "visible" : "hidden" })), l = C(() => n() || a.isVisible && s.isVisible);
	R(e, {
		get open() {
			return o(l);
		},
		get ref() {
			return s.scrollbar.opts.ref;
		},
		presence: (e) => {
			$(e, w(() => o(c)));
		},
		$$slots: { presence: !0 }
	}), u();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar.svelte
var He = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"orientation"
]);
function Ue(e, t) {
	let n = y();
	r(t, !0);
	let i = m(t, "ref", 15, null), a = m(t, "id", 19, () => I(n)), c = x(t, He), l = de.create({
		orientation: O(() => t.orientation),
		id: O(() => a()),
		ref: O(() => i(), (e) => i(e))
	}), d = C(() => l.root.opts.type.current);
	var f = v(), p = s(f), g = (e) => {
		Ve(e, w(() => c, { get id() {
			return a();
		} }));
	}, b = (e) => {
		ze(e, w(() => c, { get id() {
			return a();
		} }));
	}, S = (e) => {
		Le(e, w(() => c, { get id() {
			return a();
		} }));
	}, T = (e) => {
		$(e, w(() => c, { get id() {
			return a();
		} }));
	};
	_(p, (e) => {
		o(d) === "hover" ? e(g) : o(d) === "scroll" ? e(b, 1) : o(d) === "auto" ? e(S, 2) : o(d) === "always" && e(T, 3);
	}), h(e, f), u();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-thumb-impl.svelte
var We = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"child",
	"children",
	"present"
]), Ge = T("<div><!></div>");
function Ke(e, t) {
	r(t, !0);
	let n = m(t, "ref", 15, null), i = x(t, We), a = new P(), p = ve.create({
		id: O(() => t.id),
		ref: O(() => n(), (e) => n(e)),
		mounted: O(() => a.current)
	}), g = C(() => F(i, p.props, { style: { hidden: !t.present } }));
	var y = v(), S = s(y), w = (e) => {
		var n = v();
		l(s(n), () => t.child, () => ({ props: o(g) })), h(e, n);
	}, T = (e) => {
		var n = Ge();
		d(n, () => ({ ...o(g) })), l(f(n), () => t.children ?? b), c(n), h(e, n);
	};
	_(S, (e) => {
		t.child ? e(w) : e(T, -1);
	}), h(e, y), u();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-thumb.svelte
var qe = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"forceMount"
]);
function Je(e, t) {
	let n = y();
	r(t, !0);
	let i = m(t, "id", 19, () => I(n)), a = m(t, "ref", 15, null), s = m(t, "forceMount", 3, !1), c = x(t, qe), l = H.get();
	{
		let t = (e, t) => {
			let n = () => t?.().present;
			Ke(e, w(() => c, {
				get id() {
					return i();
				},
				get present() {
					return n();
				},
				get ref() {
					return a();
				},
				set ref(e) {
					a(e);
				}
			}));
		}, n = C(() => s() || l.hasThumb);
		R(e, {
			get open() {
				return o(n);
			},
			get ref() {
				return l.scrollbar.opts.ref;
			},
			presence: t,
			$$slots: { presence: !0 }
		});
	}
	u();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-corner-impl.svelte
var Ye = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"children",
	"child"
]), Xe = T("<div><!></div>");
function Ze(e, t) {
	r(t, !0);
	let n = m(t, "ref", 15, null), i = x(t, Ye), a = ye.create({
		id: O(() => t.id),
		ref: O(() => n(), (e) => n(e))
	}), p = C(() => F(i, a.props));
	var g = v(), y = s(g), S = (e) => {
		var n = v();
		l(s(n), () => t.child, () => ({ props: o(p) })), h(e, n);
	}, w = (e) => {
		var n = Xe();
		d(n, () => ({ ...o(p) })), l(f(n), () => t.children ?? b), c(n), h(e, n);
	};
	_(y, (e) => {
		t.child ? e(S) : e(w, -1);
	}), h(e, g), u();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-corner.svelte
var Qe = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id"
]);
function $e(e, t) {
	let n = y();
	r(t, !0);
	let i = m(t, "ref", 15, null), a = m(t, "id", 19, () => I(n)), c = x(t, Qe), l = B.get(), d = C(() => !!(l.scrollbarXNode && l.scrollbarYNode)), f = C(() => l.opts.type.current !== "scroll" && o(d));
	var p = v(), g = s(p), b = (e) => {
		Ze(e, w(() => c, {
			get id() {
				return a();
			},
			get ref() {
				return i();
			},
			set ref(e) {
				i(e);
			}
		}));
	};
	_(g, (e) => {
		o(f) && e(b);
	}), h(e, p), u();
}
//#endregion
//#region ../ui/src/lib/components/scroll-area/scroll-area.svelte
var et = (e, n) => {
	let r = () => n?.().orientation;
	var i = v();
	t(s(i), () => Ue, (e, n) => {
		n(e, {
			get orientation() {
				return r();
			},
			children: (e, n) => {
				var r = v();
				t(s(r), () => Je, (e, t) => {
					t(e, {});
				}), h(e, r);
			},
			$$slots: { default: !0 }
		});
	}), h(e, i);
}, tt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"orientation",
	"viewportClasses",
	"children"
]), nt = T("<!> <!> <!> <!>", 1);
function rt(n, i) {
	r(i, !0);
	let a = m(i, "ref", 15, null), o = m(i, "orientation", 3, "vertical"), c = x(i, tt);
	var d = v();
	t(s(d), () => we, (n, r) => {
		r(n, w(() => c, {
			get ref() {
				return a();
			},
			set ref(e) {
				a(e);
			},
			children: (n, r) => {
				var a = nt(), c = s(a);
				t(c, () => Oe, (e, t) => {
					t(e, {
						get class() {
							return i.viewportClasses;
						},
						children: (e, t) => {
							var n = v();
							l(s(n), () => i.children ?? b), h(e, n);
						},
						$$slots: { default: !0 }
					});
				});
				var u = e(c, 2), d = (e) => {
					et(e, () => ({ orientation: "vertical" }));
				};
				_(u, (e) => {
					(o() === "vertical" || o() === "both") && e(d);
				});
				var f = e(u, 2), p = (e) => {
					et(e, () => ({ orientation: "horizontal" }));
				};
				_(f, (e) => {
					(o() === "horizontal" || o() === "both") && e(p);
				}), t(e(f, 2), () => $e, (e, t) => {
					t(e, {});
				}), h(n, a);
			},
			$$slots: { default: !0 }
		}));
	}), h(n, d), u();
}
//#endregion
export { rt as t };
