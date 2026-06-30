import { On as e, cr as t, nr as n, or as r, pr as i, xn as a } from "./client-xxWnFgeR.js";
import "./index-client-DLfVeyOI.js";
import { C as o, D as s, _ as c, d as l, j as u, n as d, o as f, u as p, x as m } from "./animations-complete-DIfTLR5k.js";
import { t as h } from "./on-mount-effect.svelte-DC0q3mG7.js";
import { r as g, t as _ } from "./presence-manager.svelte-BT16ak7n.js";
import { t as v } from "./safe-polygon.svelte-yh3z9Twb.js";
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_e1345006c2dfebfc7c052af32e201d76/node_modules/bits-ui/dist/internal/timeout-fn.js
var y = class {
	#e;
	#t;
	#n = null;
	constructor(e, t) {
		this.#t = e, this.#e = t, this.stop = this.stop.bind(this), this.start = this.start.bind(this), c(this.stop);
	}
	#r() {
		this.#n !== null && (window.clearTimeout(this.#n), this.#n = null);
	}
	stop() {
		this.#r();
	}
	start(...e) {
		this.#r(), this.#n = window.setTimeout(() => {
			this.#n = null, this.#t(...e);
		}, this.#e);
	}
}, b = f({
	component: "tooltip",
	parts: ["content", "trigger"]
}), x = new o("Tooltip.Provider"), S = new o("Tooltip.Root"), C = class {
	#e = t(n(/* @__PURE__ */ new Map()));
	get triggers() {
		return e(this.#e);
	}
	set triggers(e) {
		r(this.#e, e, !0);
	}
	#t = t(null);
	get activeTriggerId() {
		return e(this.#t);
	}
	set activeTriggerId(e) {
		r(this.#t, e, !0);
	}
	#n = i(() => {
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.node ?? null;
	});
	get activeTriggerNode() {
		return e(this.#n);
	}
	set activeTriggerNode(e) {
		r(this.#n, e);
	}
	#r = i(() => {
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.payload ?? null;
	});
	get activePayload() {
		return e(this.#r);
	}
	set activePayload(e) {
		r(this.#r, e);
	}
	register = (e) => {
		let t = new Map(this.triggers);
		t.set(e.id, e), this.triggers = t, this.#i();
	};
	update = (e) => {
		let t = new Map(this.triggers);
		t.set(e.id, e), this.triggers = t, this.#i();
	};
	unregister = (e) => {
		if (!this.triggers.has(e)) return;
		let t = new Map(this.triggers);
		t.delete(e), this.triggers = t, this.activeTriggerId === e && (this.activeTriggerId = null);
	};
	setActiveTrigger = (e) => {
		if (e === null) {
			this.activeTriggerId = null;
			return;
		}
		if (!this.triggers.has(e)) {
			this.activeTriggerId = null;
			return;
		}
		this.activeTriggerId = e;
	};
	get = (e) => this.triggers.get(e);
	has = (e) => this.triggers.has(e);
	getFirstTriggerId = () => {
		let e = this.triggers.entries().next();
		return e.done ? null : e.value[0];
	};
	#i = () => {
		let e = this.activeTriggerId;
		e !== null && (this.triggers.has(e) || (this.activeTriggerId = null));
	};
}, w = class {
	registry = new C();
	#e = t(null);
	get root() {
		return e(this.#e);
	}
	set root(e) {
		r(this.#e, e, !0);
	}
}, T = class {
	#e = new w();
	get state() {
		return this.#e;
	}
	open(e) {
		this.#e.registry.has(e) && (this.#e.registry.setActiveTrigger(e), this.#e.root?.setActiveTrigger(e), this.#e.root?.handleOpen());
	}
	close() {
		this.#e.root?.handleClose();
	}
	get isOpen() {
		return this.#e.root?.opts.open.current ?? !1;
	}
};
function E() {
	return new T();
}
var D = class n {
	static create(e) {
		return x.set(new n(e));
	}
	opts;
	#e = t(!0);
	get isOpenDelayed() {
		return e(this.#e);
	}
	set isOpenDelayed(e) {
		r(this.#e, e, !0);
	}
	isPointerInTransit = u(!1);
	#t;
	#n = t(null);
	constructor(t) {
		this.opts = t, this.#t = new y(() => {
			this.isOpenDelayed = !0;
		}, this.opts.skipDelayDuration.current), h(() => a(window, "scroll", (t) => {
			let n = e(this.#n);
			if (!n) return;
			let r = n.triggerNode;
			if (!r) return;
			let i = t.target;
			(i instanceof Element || i instanceof Document) && i.contains(r) && n.handleClose();
		}));
	}
	#r = () => {
		if (this.opts.skipDelayDuration.current === 0) {
			this.isOpenDelayed = !0;
			return;
		} else this.#t.start();
	};
	#i = () => {
		this.#t.stop();
	};
	onOpen = (t) => {
		e(this.#n) && e(this.#n) !== t && e(this.#n).handleClose(), this.#i(), this.isOpenDelayed = !1, r(this.#n, t, !0);
	};
	onClose = (t) => {
		e(this.#n) === t && (r(this.#n, null), this.#r());
	};
	isTooltipOpen = (t) => e(this.#n) === t;
}, O = class n {
	static create(e) {
		return S.set(new n(e, x.get()));
	}
	opts;
	provider;
	#e = i(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
	get delayDuration() {
		return e(this.#e);
	}
	set delayDuration(e) {
		r(this.#e, e);
	}
	#t = i(() => this.opts.disableHoverableContent.current ?? this.provider.opts.disableHoverableContent.current);
	get disableHoverableContent() {
		return e(this.#t);
	}
	set disableHoverableContent(e) {
		r(this.#t, e);
	}
	#n = i(() => this.opts.disableCloseOnTriggerClick.current ?? this.provider.opts.disableCloseOnTriggerClick.current);
	get disableCloseOnTriggerClick() {
		return e(this.#n);
	}
	set disableCloseOnTriggerClick(e) {
		r(this.#n, e);
	}
	#r = i(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
	get disabled() {
		return e(this.#r);
	}
	set disabled(e) {
		r(this.#r, e);
	}
	#i = i(() => this.opts.ignoreNonKeyboardFocus.current ?? this.provider.opts.ignoreNonKeyboardFocus.current);
	get ignoreNonKeyboardFocus() {
		return e(this.#i);
	}
	set ignoreNonKeyboardFocus(e) {
		r(this.#i, e);
	}
	registry;
	tether;
	#a = t(null);
	get contentNode() {
		return e(this.#a);
	}
	set contentNode(e) {
		r(this.#a, e, !0);
	}
	contentPresence;
	#o = t(!1);
	#s;
	#c = i(() => this.opts.open.current ? e(this.#o) ? "delayed-open" : "instant-open" : "closed");
	get stateAttr() {
		return e(this.#c);
	}
	set stateAttr(e) {
		r(this.#c, e);
	}
	constructor(e, t) {
		this.opts = e, this.provider = t, this.tether = e.tether.current?.state ?? null, this.registry = this.tether?.registry ?? new C(), this.#s = new y(() => {
			r(this.#o, !0), this.opts.open.current = !0;
		}, this.delayDuration ?? 0), this.tether && (this.tether.root = this, h(() => () => {
			this.tether?.root === this && (this.tether.root = null);
		})), this.contentPresence = new _({
			open: this.opts.open,
			ref: s(() => this.contentNode),
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), m(() => this.delayDuration, () => {
			this.delayDuration !== void 0 && (this.#s = new y(() => {
				r(this.#o, !0), this.opts.open.current = !0;
			}, this.delayDuration));
		}), m(() => this.opts.open.current, (e) => {
			e ? (this.ensureActiveTrigger(), this.provider.onOpen(this)) : this.provider.onClose(this);
		}, { lazy: !0 }), m(() => this.opts.triggerId.current, (e) => {
			e !== this.registry.activeTriggerId && this.registry.setActiveTrigger(e);
		}), m(() => this.registry.activeTriggerId, (e) => {
			this.opts.triggerId.current !== e && (this.opts.triggerId.current = e);
		});
	}
	handleOpen = () => {
		this.#s.stop(), r(this.#o, !1), this.ensureActiveTrigger(), this.opts.open.current = !0;
	};
	handleClose = () => {
		this.#s.stop(), this.opts.open.current = !1;
	};
	#l = () => {
		this.#s.stop();
		let e = !this.provider.isOpenDelayed, t = this.delayDuration ?? 0;
		e || t === 0 ? (r(this.#o, !1), this.opts.open.current = !0) : this.#s.start();
	};
	onTriggerEnter = (e) => {
		this.setActiveTrigger(e), this.#l();
	};
	onTriggerLeave = () => {
		this.disableHoverableContent ? this.handleClose() : this.#s.stop();
	};
	ensureActiveTrigger = () => {
		if (this.registry.activeTriggerId !== null && this.registry.has(this.registry.activeTriggerId)) return;
		if (this.opts.triggerId.current !== null && this.registry.has(this.opts.triggerId.current)) {
			this.registry.setActiveTrigger(this.opts.triggerId.current);
			return;
		}
		let e = this.registry.getFirstTriggerId();
		this.registry.setActiveTrigger(e);
	};
	setActiveTrigger = (e) => {
		this.registry.setActiveTrigger(e);
	};
	registerTrigger = (e) => {
		this.registry.register(e), e.disabled && this.registry.activeTriggerId === e.id && this.opts.open.current && this.handleClose();
	};
	updateTrigger = (e) => {
		this.registry.update(e), e.disabled && this.registry.activeTriggerId === e.id && this.opts.open.current && this.handleClose();
	};
	unregisterTrigger = (e) => {
		let t = this.registry.activeTriggerId === e;
		this.registry.unregister(e), t && this.opts.open.current && this.handleClose();
	};
	isActiveTrigger = (e) => this.registry.activeTriggerId === e;
	get triggerNode() {
		return this.registry.activeTriggerNode;
	}
	get activePayload() {
		return this.registry.activePayload;
	}
	get activeTriggerId() {
		return this.registry.activeTriggerId;
	}
}, k = class t {
	static create(e) {
		return new t(e, S.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = l(this.opts.ref, (e) => this.root.contentNode = e), new v({
			triggerNode: () => this.root.triggerNode,
			contentNode: () => this.root.contentNode,
			enabled: () => this.root.opts.open.current && !this.root.disableHoverableContent,
			transitIntentTimeout: 180,
			ignoredTargets: () => {
				if (this.root.provider.opts.skipDelayDuration.current === 0) return [];
				let e = [], t = this.root.triggerNode;
				for (let n of this.root.registry.triggers.values()) n.node && n.node !== t && e.push(n.node);
				return e;
			},
			onPointerExit: () => {
				this.root.provider.isTooltipOpen(this.root) && this.root.handleClose();
			}
		});
	}
	onInteractOutside = (e) => {
		if (g(e.target) && this.root.triggerNode?.contains(e.target) && this.root.disableCloseOnTriggerClick) {
			e.preventDefault();
			return;
		}
		this.opts.onInteractOutside.current(e), !e.defaultPrevented && this.root.handleClose();
	};
	onEscapeKeydown = (e) => {
		this.opts.onEscapeKeydown.current?.(e), !e.defaultPrevented && this.root.handleClose();
	};
	onOpenAutoFocus = (e) => {
		e.preventDefault();
	};
	onCloseAutoFocus = (e) => {
		e.preventDefault();
	};
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
	#e = i(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return e(this.#e);
	}
	set snippetProps(e) {
		r(this.#e, e);
	}
	#t = i(() => ({
		id: this.opts.id.current,
		"data-state": this.root.stateAttr,
		"data-disabled": d(this.root.disabled),
		...p(this.root.contentPresence.transitionStatus),
		style: { outline: "none" },
		[b.content]: "",
		...this.attachment
	}));
	get props() {
		return e(this.#t);
	}
	set props(e) {
		r(this.#t, e);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown,
		onOpenAutoFocus: this.onOpenAutoFocus,
		onCloseAutoFocus: this.onCloseAutoFocus
	};
}, A = E();
//#endregion
export { O as i, k as n, D as r, A as t };
