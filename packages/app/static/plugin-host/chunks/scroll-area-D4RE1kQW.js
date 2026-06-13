import { $n as e, At as t, Gn as n, Gt as r, Hr as i, Kn as a, Mt as o, Nn as s, On as c, Qn as l, Qr as u, Vr as d, Zn as f, _n as p, ai as m, an as h, cr as g, f as _, in as v, it as y, m as b, on as x, or as S, p as C, pr as w, un as T, wt as E } from "./index-client-BHp3UA-q.js";
import "./disclose-version-YhYaTdgb.js";
import "./index-client-Bl3KzSLq.js";
import { C as D, D as O, S as k, _ as A, d as j, h as ee, j as M, o as te, t as ne, x as N, y as P } from "./animations-complete-LXv254CE.js";
import { i as F, n as I, o as re, r as ie, t as ae } from "./use-id-BrfCmVmn.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/svelte-resize-observer.svelte.js
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
	#a = w(() => c(this.#t));
	get isPresent() {
		return c(this.#a);
	}
	set isPresent(e) {
		S(this.#a, e);
	}
	get transitionStatus() {
		return c(this.#r);
	}
	#o() {
		this.#i !== null && (window.cancelAnimationFrame(this.#i), this.#i = null);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/utilities/presence-layer/presence-layer.svelte
function R(e, t) {
	i(t, !0);
	let n = new oe({
		open: O(() => t.open),
		ref: t.ref
	});
	var a = h(), s = l(a), c = (e) => {
		var r = h();
		o(l(r), () => t.presence ?? m, () => ({
			present: n.isPresent,
			transitionStatus: n.transitionStatus
		})), v(e, r);
	};
	r(s, (e) => {
		(t.forceMount || t.open || n.isPresent) && e(c);
	}), v(e, a), d();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/clamp.js
function se(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/state-machine.js
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
		return c(this.#e);
	}
	set scrollAreaNode(e) {
		S(this.#e, e, !0);
	}
	#t = g(null);
	get viewportNode() {
		return c(this.#t);
	}
	set viewportNode(e) {
		S(this.#t, e, !0);
	}
	#n = g(null);
	get contentNode() {
		return c(this.#n);
	}
	set contentNode(e) {
		S(this.#n, e, !0);
	}
	#r = g(null);
	get scrollbarXNode() {
		return c(this.#r);
	}
	set scrollbarXNode(e) {
		S(this.#r, e, !0);
	}
	#i = g(null);
	get scrollbarYNode() {
		return c(this.#i);
	}
	set scrollbarYNode(e) {
		S(this.#i, e, !0);
	}
	#a = g(0);
	get cornerWidth() {
		return c(this.#a);
	}
	set cornerWidth(e) {
		S(this.#a, e, !0);
	}
	#o = g(0);
	get cornerHeight() {
		return c(this.#o);
	}
	set cornerHeight(e) {
		S(this.#o, e, !0);
	}
	#s = g(!1);
	get scrollbarXEnabled() {
		return c(this.#s);
	}
	set scrollbarXEnabled(e) {
		S(this.#s, e, !0);
	}
	#c = g(!1);
	get scrollbarYEnabled() {
		return c(this.#c);
	}
	set scrollbarYEnabled(e) {
		S(this.#c, e, !0);
	}
	domContext;
	constructor(e) {
		this.opts = e, this.attachment = j(e.ref, (e) => this.scrollAreaNode = e), this.domContext = new ie(e.ref);
	}
	#l = w(() => ({
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
		return c(this.#l);
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
	#n = w(() => ({
		id: this.opts.id.current,
		style: {
			overflowX: this.root.scrollbarXEnabled ? "scroll" : "hidden",
			overflowY: this.root.scrollbarYEnabled ? "scroll" : "hidden"
		},
		[z.viewport]: "",
		...this.attachment
	}));
	get props() {
		return c(this.#n);
	}
	set props(e) {
		S(this.#n, e);
	}
	#r = w(() => ({
		id: this.#e.current,
		"data-scroll-area-content": "",
		style: { minWidth: this.root.scrollbarXEnabled ? "fit-content" : void 0 },
		...this.contentAttachment
	}));
	get contentProps() {
		return c(this.#r);
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
	#e = w(() => this.opts.orientation.current === "horizontal");
	get isHorizontal() {
		return c(this.#e);
	}
	set isHorizontal(e) {
		S(this.#e, e);
	}
	#t = g(!1);
	get hasThumb() {
		return c(this.#t);
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
		return c(this.#e);
	}
	set isVisible(e) {
		S(this.#e, e, !0);
	}
	constructor(e) {
		this.scrollbar = e, this.root = e.root, n(() => {
			let e = this.root.scrollAreaNode, t = this.root.opts.scrollHideDelay.current, n = 0;
			if (!e) return;
			let r = re(p(e, "pointerenter", () => {
				this.root.domContext.clearTimeout(n), s(() => this.isVisible = !0);
			}), p(e, "pointerleave", () => {
				n && this.root.domContext.clearTimeout(n), n = this.root.domContext.setTimeout(() => {
					s(() => {
						this.scrollbar.hasThumb = !1, this.isVisible = !1;
					});
				}, t);
			}));
			return () => {
				this.root.domContext.getWindow().clearTimeout(n), r();
			};
		});
	}
	#t = w(() => ({ "data-state": this.isVisible ? "visible" : "hidden" }));
	get props() {
		return c(this.#t);
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
	#e = w(() => this.machine.state.current === "hidden");
	get isHidden() {
		return c(this.#e);
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
			return p(e, "scroll", () => {
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
	#t = w(() => ({
		"data-state": this.machine.state.current === "hidden" ? "hidden" : "visible",
		onpointerenter: this.onpointerenter,
		onpointerleave: this.onpointerleave
	}));
	get props() {
		return c(this.#t);
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
		return c(this.#e);
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
	#t = w(() => ({ "data-state": this.isVisible ? "visible" : "hidden" }));
	get props() {
		return c(this.#t);
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
		return c(this.#e);
	}
	set thumbNode(e) {
		S(this.#e, e, !0);
	}
	#t = g(0);
	get pointerOffset() {
		return c(this.#t);
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
		return c(this.#n);
	}
	set sizes(e) {
		S(this.#n, e);
	}
	#r = w(() => q(this.sizes.viewport, this.sizes.content));
	get thumbRatio() {
		return c(this.#r);
	}
	set thumbRatio(e) {
		S(this.#r, e);
	}
	#i = w(() => this.thumbRatio > 0 && this.thumbRatio < 1);
	get hasThumb() {
		return c(this.#i);
	}
	set hasThumb(e) {
		S(this.#i, e);
	}
	#a = g("");
	get prevTransformStyle() {
		return c(this.#a);
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
		return c(this.#e);
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
	#t = w(() => J(this.scrollbarVis.sizes));
	get thumbSize() {
		return c(this.#t);
	}
	set thumbSize(e) {
		S(this.#t, e);
	}
	#n = w(() => ({
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
		return c(this.#n);
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
		return c(this.#e);
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
	#t = w(() => J(this.scrollbarVis.sizes));
	get thumbSize() {
		return c(this.#t);
	}
	set thumbSize(e) {
		S(this.#t, e);
	}
	#n = w(() => ({
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
		return c(this.#n);
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
		return c(this.#e);
	}
	set rect(e) {
		S(this.#e, e);
	}
	#t = g("");
	get prevWebkitUserSelect() {
		return c(this.#t);
	}
	set prevWebkitUserSelect(e) {
		S(this.#t, e, !0);
	}
	handleResize;
	handleThumbPositionChange;
	handleWheelScroll;
	handleThumbPointerDown;
	handleThumbPointerUp;
	#n = w(() => this.scrollbarVis.sizes.content - this.scrollbarVis.sizes.viewport);
	get maxScrollPos() {
		return c(this.#n);
	}
	set maxScrollPos(e) {
		S(this.#n, e);
	}
	constructor(e) {
		this.scrollbarState = e, this.root = e.root, this.scrollbarVis = e.scrollbarVis, this.scrollbar = e.scrollbarVis.scrollbar, this.handleResize = k(() => this.scrollbarState.onResize(), 10), this.handleThumbPositionChange = this.scrollbarState.onThumbPositionChange, this.handleWheelScroll = this.scrollbarState.onWheelScroll, this.handleThumbPointerDown = this.scrollbarState.onThumbPointerDown, this.handleThumbPointerUp = this.scrollbarState.onThumbPointerUp, n(() => {
			let e = this.maxScrollPos, t = this.scrollbar.opts.ref.current;
			return this.root.viewportNode, p(this.root.domContext.getDocument(), "wheel", (n) => {
				let r = n.target;
				t?.contains(r) && this.handleWheelScroll(n, e);
			}, { passive: !1 });
		}), a(() => {
			this.scrollbarVis.sizes, s(() => this.handleThumbPositionChange());
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
	#i = w(() => F({
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
		return c(this.#i);
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
		c(this.#t) && (c(this.#t)(), S(this.#t, void 0));
	}, 100);
	constructor(e, t) {
		this.opts = e, this.scrollbarState = t, this.#e = t.root, this.attachment = j(this.opts.ref, (e) => this.scrollbarState.scrollbarVis.thumbNode = e), n(() => {
			let e = this.#e.viewportNode;
			return e ? (s(() => this.scrollbarState.handleThumbPositionChange()), p(e, "scroll", () => {
				if (this.#n(), !c(this.#t)) {
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
	#r = w(() => ({
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
		return c(this.#r);
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
	#n = w(() => !!(c(this.#e) && c(this.#t)));
	get hasSize() {
		return c(this.#n);
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
	#r = w(() => ({
		id: this.opts.id.current,
		style: {
			width: c(this.#e),
			height: c(this.#t),
			position: "absolute",
			right: this.root.opts.dir.current === "ltr" ? 0 : void 0,
			left: this.root.opts.dir.current === "rtl" ? 0 : void 0,
			bottom: 0
		},
		[z.corner]: "",
		...this.attachment
	}));
	get props() {
		return c(this.#r);
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
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area.svelte
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
]), Ce = x("<div><!></div>");
function we(e, t) {
	let n = T();
	i(t, !0);
	let a = _(t, "ref", 15, null), s = _(t, "id", 19, () => I(n)), p = _(t, "type", 3, "hover"), g = _(t, "dir", 3, "ltr"), b = _(t, "scrollHideDelay", 3, 600), x = C(t, Se), S = le.create({
		type: O(() => p()),
		dir: O(() => g()),
		scrollHideDelay: O(() => b()),
		id: O(() => s()),
		ref: O(() => a(), (e) => a(e))
	}), E = w(() => F(x, S.props));
	var D = h(), k = l(D), A = (e) => {
		var n = h();
		o(l(n), () => t.child, () => ({ props: c(E) })), v(e, n);
	}, j = (e) => {
		var n = Ce();
		y(n, () => ({ ...c(E) })), o(f(n), () => t.children ?? m), u(n), v(e, n);
	};
	r(k, (e) => {
		t.child ? e(A) : e(j, -1);
	}), v(e, D), d();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-viewport.svelte
var Te = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"children"
]), Ee = x("<div><div><!></div></div>"), De = {
	hash: "svelte-4332kz",
	code: "\n	/* Hide scrollbars cross browser and enable momentum scroll for touch devices */[data-scroll-area-viewport] {scrollbar-width:none !important;-ms-overflow-style:none !important;-webkit-overflow-scrolling:touch !important;}[data-scroll-area-viewport]::-webkit-scrollbar {display:none !important;}:where([data-scroll-area-viewport]) {display:flex;flex-direction:column;align-items:stretch;}:where([data-scroll-area-content]) {flex-grow:1;}"
};
function Oe(e, t) {
	let n = T();
	i(t, !0), E(e, De);
	let r = _(t, "ref", 15, null), a = _(t, "id", 19, () => I(n)), s = C(t, Te), l = ue.create({
		id: O(() => a()),
		ref: O(() => r(), (e) => r(e))
	}), p = w(() => F(s, l.props)), h = w(() => F({}, l.contentProps));
	var g = Ee();
	y(g, () => ({ ...c(p) }));
	var b = f(g);
	y(b, () => ({ ...c(h) })), o(f(b), () => t.children ?? m), u(b), u(g), v(e, g), d();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-shared.svelte
var ke = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"child",
	"children"
]), Ae = x("<div><!></div>");
function Q(e, t) {
	i(t, !0);
	let n = C(t, ke), a = _e.create(), s = w(() => F(n, a.props));
	var p = h(), g = l(p), _ = (e) => {
		var n = h();
		o(l(n), () => t.child, () => ({ props: c(s) })), v(e, n);
	}, b = (e) => {
		var n = Ae();
		y(n, () => ({ ...c(s) })), o(f(n), () => t.children ?? m), u(n), v(e, n);
	};
	r(g, (e) => {
		t.child ? e(_) : e(b, -1);
	}), v(e, p), d();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-x.svelte
var je = new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Me(e, t) {
	i(t, !0);
	let n = C(t, je), r = new P(), a = he.create({ mounted: O(() => r.current) }), o = w(() => F(n, a.props));
	Q(e, b(() => c(o))), d();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-y.svelte
var Ne = new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function Pe(e, t) {
	i(t, !0);
	let n = C(t, Ne), r = new P(), a = ge.create({ mounted: O(() => r.current) }), o = w(() => F(n, a.props));
	Q(e, b(() => c(o))), d();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-visible.svelte
var Fe = new Set([
	"$$slots",
	"$$events",
	"$$legacy"
]);
function $(e, t) {
	i(t, !0);
	let n = C(t, Fe), a = me.create();
	var o = h(), s = l(o), c = (e) => {
		Me(e, b(() => n));
	}, u = (e) => {
		Pe(e, b(() => n));
	};
	r(s, (e) => {
		a.scrollbar.opts.orientation.current === "horizontal" ? e(c) : e(u, -1);
	}), v(e, o), d();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-auto.svelte
var Ie = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"forceMount"
]);
function Le(e, t) {
	i(t, !0);
	let n = _(t, "forceMount", 3, !1), r = C(t, Ie), a = G.create(), o = w(() => F(r, a.props));
	{
		let t = (e) => {
			$(e, b(() => c(o)));
		}, r = w(() => n() || a.isVisible);
		R(e, {
			get open() {
				return c(r);
			},
			get ref() {
				return a.scrollbar.opts.ref;
			},
			presence: t,
			$$slots: { presence: !0 }
		});
	}
	d();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-scroll.svelte
var Re = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"forceMount"
]);
function ze(e, t) {
	i(t, !0);
	let n = _(t, "forceMount", 3, !1), r = C(t, Re), a = pe.create(), o = w(() => F(r, a.props));
	{
		let t = (e) => {
			$(e, b(() => c(o)));
		}, r = w(() => n() || !a.isHidden);
		R(e, b(() => c(o), {
			get open() {
				return c(r);
			},
			get ref() {
				return a.scrollbar.opts.ref;
			},
			presence: t,
			$$slots: { presence: !0 }
		}));
	}
	d();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar-hover.svelte
var Be = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"forceMount"
]);
function Ve(e, t) {
	i(t, !0);
	let n = _(t, "forceMount", 3, !1), r = C(t, Be), a = fe.create(), o = G.create(), s = w(() => F(r, a.props, o.props, { "data-state": a.isVisible ? "visible" : "hidden" })), l = w(() => n() || a.isVisible && o.isVisible);
	R(e, {
		get open() {
			return c(l);
		},
		get ref() {
			return o.scrollbar.opts.ref;
		},
		presence: (e) => {
			$(e, b(() => c(s)));
		},
		$$slots: { presence: !0 }
	}), d();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-scrollbar.svelte
var He = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"orientation"
]);
function Ue(e, t) {
	let n = T();
	i(t, !0);
	let a = _(t, "ref", 15, null), o = _(t, "id", 19, () => I(n)), s = C(t, He), u = de.create({
		orientation: O(() => t.orientation),
		id: O(() => o()),
		ref: O(() => a(), (e) => a(e))
	}), f = w(() => u.root.opts.type.current);
	var p = h(), m = l(p), g = (e) => {
		Ve(e, b(() => s, { get id() {
			return o();
		} }));
	}, y = (e) => {
		ze(e, b(() => s, { get id() {
			return o();
		} }));
	}, x = (e) => {
		Le(e, b(() => s, { get id() {
			return o();
		} }));
	}, S = (e) => {
		$(e, b(() => s, { get id() {
			return o();
		} }));
	};
	r(m, (e) => {
		c(f) === "hover" ? e(g) : c(f) === "scroll" ? e(y, 1) : c(f) === "auto" ? e(x, 2) : c(f) === "always" && e(S, 3);
	}), v(e, p), d();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-thumb-impl.svelte
var We = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"child",
	"children",
	"present"
]), Ge = x("<div><!></div>");
function Ke(e, t) {
	i(t, !0);
	let n = _(t, "ref", 15, null), a = C(t, We), s = new P(), p = ve.create({
		id: O(() => t.id),
		ref: O(() => n(), (e) => n(e)),
		mounted: O(() => s.current)
	}), g = w(() => F(a, p.props, { style: { hidden: !t.present } }));
	var b = h(), x = l(b), S = (e) => {
		var n = h();
		o(l(n), () => t.child, () => ({ props: c(g) })), v(e, n);
	}, T = (e) => {
		var n = Ge();
		y(n, () => ({ ...c(g) })), o(f(n), () => t.children ?? m), u(n), v(e, n);
	};
	r(x, (e) => {
		t.child ? e(S) : e(T, -1);
	}), v(e, b), d();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-thumb.svelte
var qe = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"forceMount"
]);
function Je(e, t) {
	let n = T();
	i(t, !0);
	let r = _(t, "id", 19, () => I(n)), a = _(t, "ref", 15, null), o = _(t, "forceMount", 3, !1), s = C(t, qe), l = H.get();
	{
		let t = (e, t) => {
			let n = () => t?.().present;
			Ke(e, b(() => s, {
				get id() {
					return r();
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
		}, n = w(() => o() || l.hasThumb);
		R(e, {
			get open() {
				return c(n);
			},
			get ref() {
				return l.scrollbar.opts.ref;
			},
			presence: t,
			$$slots: { presence: !0 }
		});
	}
	d();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-corner-impl.svelte
var Ye = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id",
	"children",
	"child"
]), Xe = x("<div><!></div>");
function Ze(e, t) {
	i(t, !0);
	let n = _(t, "ref", 15, null), a = C(t, Ye), s = ye.create({
		id: O(() => t.id),
		ref: O(() => n(), (e) => n(e))
	}), p = w(() => F(a, s.props));
	var g = h(), b = l(g), x = (e) => {
		var n = h();
		o(l(n), () => t.child, () => ({ props: c(p) })), v(e, n);
	}, S = (e) => {
		var n = Xe();
		y(n, () => ({ ...c(p) })), o(f(n), () => t.children ?? m), u(n), v(e, n);
	};
	r(b, (e) => {
		t.child ? e(x) : e(S, -1);
	}), v(e, g), d();
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/bits/scroll-area/components/scroll-area-corner.svelte
var Qe = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"id"
]);
function $e(e, t) {
	let n = T();
	i(t, !0);
	let a = _(t, "ref", 15, null), o = _(t, "id", 19, () => I(n)), s = C(t, Qe), u = B.get(), f = w(() => !!(u.scrollbarXNode && u.scrollbarYNode)), p = w(() => u.opts.type.current !== "scroll" && c(f));
	var m = h(), g = l(m), y = (e) => {
		Ze(e, b(() => s, {
			get id() {
				return o();
			},
			get ref() {
				return a();
			},
			set ref(e) {
				a(e);
			}
		}));
	};
	r(g, (e) => {
		c(p) && e(y);
	}), v(e, m), d();
}
//#endregion
//#region ../ui/src/lib/components/scroll-area/scroll-area.svelte
var et = (e, n) => {
	let r = () => n?.().orientation;
	var i = h();
	t(l(i), () => Ue, (e, n) => {
		n(e, {
			get orientation() {
				return r();
			},
			children: (e, n) => {
				var r = h();
				t(l(r), () => Je, (e, t) => {
					t(e, {});
				}), v(e, r);
			},
			$$slots: { default: !0 }
		});
	}), v(e, i);
}, tt = new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"ref",
	"orientation",
	"viewportClasses",
	"children"
]), nt = x("<!> <!> <!> <!>", 1);
function rt(n, a) {
	i(a, !0);
	let s = _(a, "ref", 15, null), c = _(a, "orientation", 3, "vertical"), u = C(a, tt);
	var f = h();
	t(l(f), () => we, (n, i) => {
		i(n, b(() => u, {
			get ref() {
				return s();
			},
			set ref(e) {
				s(e);
			},
			children: (n, i) => {
				var s = nt(), u = l(s);
				t(u, () => Oe, (e, t) => {
					t(e, {
						get class() {
							return a.viewportClasses;
						},
						children: (e, t) => {
							var n = h();
							o(l(n), () => a.children ?? m), v(e, n);
						},
						$$slots: { default: !0 }
					});
				});
				var d = e(u, 2), f = (e) => {
					et(e, () => ({ orientation: "vertical" }));
				};
				r(d, (e) => {
					(c() === "vertical" || c() === "both") && e(f);
				});
				var p = e(d, 2), g = (e) => {
					et(e, () => ({ orientation: "horizontal" }));
				};
				r(p, (e) => {
					(c() === "horizontal" || c() === "both") && e(g);
				}), t(e(p, 2), () => $e, (e, t) => {
					t(e, {});
				}), v(n, s);
			},
			$$slots: { default: !0 }
		}));
	}), v(n, f), d();
}
//#endregion
export { rt as t };
