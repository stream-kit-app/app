import { Bn as e, Dr as t, Gn as n, Nn as r, _r as i, pr as a, rr as o, yr as s } from "./client-BFeMv2Ma.js";
import "./index-client-DI7sx7Sj.js";
import { C as c, D as l, _ as u, d, j as f, n as p, o as m, u as h, x as g } from "./animations-complete-2GhqX7WL.js";
import { r as _, t as v } from "./presence-manager.svelte-cK0pnbQH.js";
import { t as y } from "./safe-polygon.svelte-DNwZsoOY.js";
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sve_61a373d23e0427b3790b60c19a185d1b/node_modules/svelte-toolbelt/dist/utils/on-mount-effect.svelte.js
function b(e) {
	o(() => n(() => e()));
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.19.4_@internation_bef956ab5aed296abf411d64882fd11e/node_modules/bits-ui/dist/internal/timeout-fn.js
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
	#e = s(a(/* @__PURE__ */ new Map()));
	get triggers() {
		return e(this.#e);
	}
	set triggers(e) {
		i(this.#e, e, !0);
	}
	#t = s(null);
	get activeTriggerId() {
		return e(this.#t);
	}
	set activeTriggerId(e) {
		i(this.#t, e, !0);
	}
	#n = t(() => {
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.node ?? null;
	});
	get activeTriggerNode() {
		return e(this.#n);
	}
	set activeTriggerNode(e) {
		i(this.#n, e);
	}
	#r = t(() => {
		let e = this.activeTriggerId;
		return e === null ? null : this.triggers.get(e)?.payload ?? null;
	});
	get activePayload() {
		return e(this.#r);
	}
	set activePayload(e) {
		i(this.#r, e);
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
	#e = s(null);
	get root() {
		return e(this.#e);
	}
	set root(e) {
		i(this.#e, e, !0);
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
var k = class t {
	static create(e) {
		return C.set(new t(e));
	}
	opts;
	#e = s(!0);
	get isOpenDelayed() {
		return e(this.#e);
	}
	set isOpenDelayed(e) {
		i(this.#e, e, !0);
	}
	isPointerInTransit = f(!1);
	#t;
	#n = s(null);
	constructor(t) {
		this.opts = t, this.#t = new x(() => {
			this.isOpenDelayed = !0;
		}, this.opts.skipDelayDuration.current), b(() => r(window, "scroll", (t) => {
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
		}
		this.#t.start();
	};
	#i = () => {
		this.#t.stop();
	};
	onOpen = (t) => {
		e(this.#n) && e(this.#n) !== t && e(this.#n).handleClose(), this.#i(), this.isOpenDelayed = !1, i(this.#n, t, !0);
	};
	onClose = (t) => {
		e(this.#n) === t && (i(this.#n, null), this.#r());
	};
	isTooltipOpen = (t) => e(this.#n) === t;
}, A = class n {
	static create(e) {
		return w.set(new n(e, C.get()));
	}
	opts;
	provider;
	#e = t(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
	get delayDuration() {
		return e(this.#e);
	}
	set delayDuration(e) {
		i(this.#e, e);
	}
	#t = t(() => this.opts.disableHoverableContent.current ?? this.provider.opts.disableHoverableContent.current);
	get disableHoverableContent() {
		return e(this.#t);
	}
	set disableHoverableContent(e) {
		i(this.#t, e);
	}
	#n = t(() => this.opts.disableCloseOnTriggerClick.current ?? this.provider.opts.disableCloseOnTriggerClick.current);
	get disableCloseOnTriggerClick() {
		return e(this.#n);
	}
	set disableCloseOnTriggerClick(e) {
		i(this.#n, e);
	}
	#r = t(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
	get disabled() {
		return e(this.#r);
	}
	set disabled(e) {
		i(this.#r, e);
	}
	#i = t(() => this.opts.ignoreNonKeyboardFocus.current ?? this.provider.opts.ignoreNonKeyboardFocus.current);
	get ignoreNonKeyboardFocus() {
		return e(this.#i);
	}
	set ignoreNonKeyboardFocus(e) {
		i(this.#i, e);
	}
	registry;
	tether;
	#a = s(null);
	get contentNode() {
		return e(this.#a);
	}
	set contentNode(e) {
		i(this.#a, e, !0);
	}
	contentPresence;
	#o = s(!1);
	#s;
	#c = t(() => this.opts.open.current ? e(this.#o) ? "delayed-open" : "instant-open" : "closed");
	get stateAttr() {
		return e(this.#c);
	}
	set stateAttr(e) {
		i(this.#c, e);
	}
	constructor(e, t) {
		this.opts = e, this.provider = t, this.tether = e.tether.current?.state ?? null, this.registry = this.tether?.registry ?? new T(), this.#s = new x(() => {
			i(this.#o, !0), this.opts.open.current = !0;
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
				i(this.#o, !0), this.opts.open.current = !0;
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
		this.#s.stop(), i(this.#o, !1), this.ensureActiveTrigger(), this.opts.open.current = !0;
	};
	handleClose = () => {
		this.#s.stop(), this.opts.open.current = !1;
	};
	cancelPendingOpen = () => {
		this.#s.stop();
	};
	#l = () => {
		this.#s.stop();
		let e = !this.provider.isOpenDelayed, t = this.delayDuration ?? 0;
		e || t === 0 ? (i(this.#o, !1), this.opts.open.current = !0) : this.#s.start();
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
}, j = class n {
	static create(e) {
		return new n(e, w.get());
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
	#e = t(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return e(this.#e);
	}
	set snippetProps(e) {
		i(this.#e, e);
	}
	#t = t(() => ({
		id: this.opts.id.current,
		"data-state": this.root.stateAttr,
		"data-disabled": p(this.root.disabled),
		...h(this.root.contentPresence.transitionStatus),
		style: { outline: "none" },
		[S.content]: "",
		...this.attachment
	}));
	get props() {
		return e(this.#t);
	}
	set props(e) {
		i(this.#t, e);
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
