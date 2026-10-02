import { Gn as e, Nn as t, On as n, cr as r, nr as i, or as a, pr as o, xn as s } from "./client-xxWnFgeR.js";
import "./index-client-DLfVeyOI.js";
import { C as c, D as l, _ as u, d, j as f, n as p, o as m, u as h, x as g } from "./animations-complete-DFBLw3EK.js";
import { r as _, t as v } from "./presence-manager.svelte-DNcqE2Zq.js";
import { t as y } from "./safe-polygon.svelte-D8sMnpkW.js";
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_5a6ee2206b82415d6a6056cd255c701d/node_modules/svelte-toolbelt/dist/utils/on-mount-effect.svelte.js
function b(n) {
	e(() => t(() => n()));
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internation_a5a66d84ac7409b4078304c79e393e2b/node_modules/bits-ui/dist/internal/timeout-fn.js
var x = class {
	#e;
	#t;
	#n = null;
	constructor(e, t) {
		this.#t = e, this.#e = t, this.stop = this.stop.bind(this), this.start = this.start.bind(this), u(this.stop);
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
}, S = m({
	component: "tooltip",
	parts: ["content", "trigger"]
}), C = new c("Tooltip.Provider"), w = new c("Tooltip.Root"), T = class {
	#e = r(i(/* @__PURE__ */ new Map()));
	get triggers() {
		return n(this.#e);
	}
	set triggers(e) {
		a(this.#e, e, !0);
	}
	#t = r(null);
	get activeTriggerId() {
		return n(this.#t);
	}
	set activeTriggerId(e) {
		a(this.#t, e, !0);
	}
	#n = o(() => {
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.node ?? null;
	});
	get activeTriggerNode() {
		return n(this.#n);
	}
	set activeTriggerNode(e) {
		a(this.#n, e);
	}
	#r = o(() => {
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.payload ?? null;
	});
	get activePayload() {
		return n(this.#r);
	}
	set activePayload(e) {
		a(this.#r, e);
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
}, E = class {
	registry = new T();
	#e = r(null);
	get root() {
		return n(this.#e);
	}
	set root(e) {
		a(this.#e, e, !0);
	}
}, D = class {
	#e = new E();
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
function O() {
	return new D();
}
var k = class e {
	static create(t) {
		return C.set(new e(t));
	}
	opts;
	#e = r(!0);
	get isOpenDelayed() {
		return n(this.#e);
	}
	set isOpenDelayed(e) {
		a(this.#e, e, !0);
	}
	isPointerInTransit = f(!1);
	#t;
	#n = r(null);
	constructor(e) {
		this.opts = e, this.#t = new x(() => {
			this.isOpenDelayed = !0;
		}, this.opts.skipDelayDuration.current), b(() => s(window, "scroll", (e) => {
			let t = n(this.#n);
			if (!t) return;
			let r = t.triggerNode;
			if (!r) return;
			let i = e.target;
			(i instanceof Element || i instanceof Document) && i.contains(r) && t.handleClose();
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
	onOpen = (e) => {
		n(this.#n) && n(this.#n) !== e && n(this.#n).handleClose(), this.#i(), this.isOpenDelayed = !1, a(this.#n, e, !0);
	};
	onClose = (e) => {
		n(this.#n) === e && (a(this.#n, null), this.#r());
	};
	isTooltipOpen = (e) => n(this.#n) === e;
}, A = class e {
	static create(t) {
		return w.set(new e(t, C.get()));
	}
	opts;
	provider;
	#e = o(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
	get delayDuration() {
		return n(this.#e);
	}
	set delayDuration(e) {
		a(this.#e, e);
	}
	#t = o(() => this.opts.disableHoverableContent.current ?? this.provider.opts.disableHoverableContent.current);
	get disableHoverableContent() {
		return n(this.#t);
	}
	set disableHoverableContent(e) {
		a(this.#t, e);
	}
	#n = o(() => this.opts.disableCloseOnTriggerClick.current ?? this.provider.opts.disableCloseOnTriggerClick.current);
	get disableCloseOnTriggerClick() {
		return n(this.#n);
	}
	set disableCloseOnTriggerClick(e) {
		a(this.#n, e);
	}
	#r = o(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
	get disabled() {
		return n(this.#r);
	}
	set disabled(e) {
		a(this.#r, e);
	}
	#i = o(() => this.opts.ignoreNonKeyboardFocus.current ?? this.provider.opts.ignoreNonKeyboardFocus.current);
	get ignoreNonKeyboardFocus() {
		return n(this.#i);
	}
	set ignoreNonKeyboardFocus(e) {
		a(this.#i, e);
	}
	registry;
	tether;
	#a = r(null);
	get contentNode() {
		return n(this.#a);
	}
	set contentNode(e) {
		a(this.#a, e, !0);
	}
	contentPresence;
	#o = r(!1);
	#s;
	#c = o(() => this.opts.open.current ? n(this.#o) ? "delayed-open" : "instant-open" : "closed");
	get stateAttr() {
		return n(this.#c);
	}
	set stateAttr(e) {
		a(this.#c, e);
	}
	constructor(e, t) {
		this.opts = e, this.provider = t, this.tether = e.tether.current?.state ?? null, this.registry = this.tether?.registry ?? new T(), this.#s = new x(() => {
			a(this.#o, !0), this.opts.open.current = !0;
		}, this.delayDuration ?? 0), this.tether && (this.tether.root = this, b(() => () => {
			this.tether?.root === this && (this.tether.root = null);
		})), this.contentPresence = new v({
			open: this.opts.open,
			ref: l(() => this.contentNode),
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), g(() => this.delayDuration, () => {
			this.delayDuration !== void 0 && (this.#s = new x(() => {
				a(this.#o, !0), this.opts.open.current = !0;
			}, this.delayDuration));
		}), g(() => this.opts.open.current, (e) => {
			e ? (this.ensureActiveTrigger(), this.provider.onOpen(this)) : this.provider.onClose(this);
		}, { lazy: !0 }), g(() => this.opts.triggerId.current, (e) => {
			e !== this.registry.activeTriggerId && this.registry.setActiveTrigger(e);
		}), g(() => this.registry.activeTriggerId, (e) => {
			this.opts.triggerId.current !== e && (this.opts.triggerId.current = e);
		});
	}
	handleOpen = () => {
		this.#s.stop(), a(this.#o, !1), this.ensureActiveTrigger(), this.opts.open.current = !0;
	};
	handleClose = () => {
		this.#s.stop(), this.opts.open.current = !1;
	};
	#l = () => {
		this.#s.stop();
		let e = !this.provider.isOpenDelayed, t = this.delayDuration ?? 0;
		e || t === 0 ? (a(this.#o, !1), this.opts.open.current = !0) : this.#s.start();
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
}, j = class e {
	static create(t) {
		return new e(t, w.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = d(this.opts.ref, (e) => this.root.contentNode = e), new y({
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
		if (_(e.target) && this.root.triggerNode?.contains(e.target) && this.root.disableCloseOnTriggerClick) {
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
	#e = o(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return n(this.#e);
	}
	set snippetProps(e) {
		a(this.#e, e);
	}
	#t = o(() => ({
		id: this.opts.id.current,
		"data-state": this.root.stateAttr,
		"data-disabled": p(this.root.disabled),
		...h(this.root.contentPresence.transitionStatus),
		style: { outline: "none" },
		[S.content]: "",
		...this.attachment
	}));
	get props() {
		return n(this.#t);
	}
	set props(e) {
		a(this.#t, e);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown,
		onOpenAutoFocus: this.onOpenAutoFocus,
		onCloseAutoFocus: this.onCloseAutoFocus
	};
}, M = O();
//#endregion
export { b as a, A as i, j as n, k as r, M as t };
