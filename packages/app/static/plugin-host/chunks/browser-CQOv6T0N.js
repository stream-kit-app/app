import { r as e, t } from "./chunk-jwUa06l-.js";
import { c as n, g as r, l as i, n as a } from "./escaping-CYr31DhF.js";
import { t as o } from "./version-BGEsM7Sy.js";
import { parsers as s } from "./babel-BXz8yQQ2.js";
import { doc as c, util as l } from "./standalone-BURCvmND.js";
//#region ../../node_modules/.pnpm/zimmerframe@1.1.4/node_modules/zimmerframe/src/walk.js
function u(e, t, n) {
	let r = n._, i = !1;
	function a(e, { next: t, state: n }) {
		t(n);
	}
	function o(e, t, s) {
		if (i || !e.type) return;
		let c, l = {}, u = {
			path: t,
			state: s,
			next: (n = s) => {
				t.push(e);
				for (let r in e) {
					if (r === "type") continue;
					let i = e[r];
					if (i && typeof i == "object") if (Array.isArray(i)) {
						let e = {}, a = i.length, s = !1;
						for (let r = 0; r < a; r++) {
							let a = i[r];
							if (a && typeof a == "object") {
								let i = o(a, t, n);
								i && (e[r] = i, s = !0);
							}
						}
						s && (l[r] = i.map((t, n) => e[n] ?? t));
					} else {
						let e = o(i, t, n);
						e && (l[r] = e);
					}
				}
				if (t.pop(), Object.keys(l).length > 0) return d(e, l);
			},
			stop: () => {
				i = !0;
			},
			visit: (n, r = s) => {
				t.push(e);
				let i = o(n, t, r) ?? n;
				return t.pop(), i;
			}
		}, f = n[e.type] ?? a;
		if (r) {
			let t;
			c = r(e, {
				...u,
				next: (n = s) => (s = n, t = f(e, {
					...u,
					state: n
				}), t)
			}), !c && t && (c = t);
		} else c = f(e, u);
		if (c || Object.keys(l).length > 0 && (c = d(e, l)), c) return c;
	}
	return o(e, [], t) ?? e;
}
function d(e, t) {
	let n = {}, r = Object.getOwnPropertyDescriptors(e);
	for (let e in r) Object.defineProperty(n, e, r[e]);
	for (let e in t) n[e] = t[e];
	return n;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/patterns.js
var f = /^[ \t\r\n]+/, p = /[ \t\r\n]+$/, m = /[^ \t\r\n]/, h = /[^\n]/g;
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/utils/fuzzymatch.js
function g(e, t) {
	if (t.length === 0) return null;
	let n = new ie(t).get(e);
	return n && n[0][0] > .7 ? n[0][1] : null;
}
var _ = 2, v = 3;
function y(e, t) {
	if (e === null && t === null) throw "Trying to compare two null values";
	return e === null || t === null ? 0 : (e = String(e), t = String(t), 1 - b(e, t) / Math.max(e.length, t.length));
}
function b(e, t) {
	let n = [], r = 0;
	for (let i = 0; i <= t.length; i++) for (let a = 0; a <= e.length; a++) {
		let o;
		o = i && a ? e.charAt(a - 1) === t.charAt(i - 1) ? r : Math.min(n[a], n[a - 1], r) + 1 : i + a, r = n[a], n[a] = o;
	}
	return n.pop();
}
var ee = /[^\w, ]+/;
function te(e, t = 2) {
	let n = "-" + e.toLowerCase().replace(ee, "") + "-", r = t - n.length, i = [];
	if (r > 0) for (let t = 0; t < r; ++t) e += "-";
	for (let e = 0; e < n.length - t + 1; ++e) i.push(n.slice(e, e + t));
	return i;
}
function ne(e, t = 2) {
	let n = {}, r = te(e, t), i = 0;
	for (; i < r.length; ++i) r[i] in n ? n[r[i]] += 1 : n[r[i]] = 1;
	return n;
}
function re(e, t) {
	return t[0] - e[0];
}
var ie = class {
	exact_set = {};
	match_dict = {};
	items = {};
	constructor(e) {
		for (let e = _; e < 4; ++e) this.items[e] = [];
		for (let t = 0; t < e.length; ++t) this.add(e[t]);
	}
	add(e) {
		if (e.toLowerCase() in this.exact_set) return !1;
		let t = _;
		for (; t < 4; ++t) this._add(e, t);
	}
	_add(e, t) {
		let n = e.toLowerCase(), r = this.items[t] || [], i = r.length;
		r.push(0);
		let a = ne(n, t), o = 0, s, c;
		for (s in a) c = a[s], o += c ** 2, s in this.match_dict ? this.match_dict[s].push([i, c]) : this.match_dict[s] = [[i, c]];
		r[i] = [Math.sqrt(o), n], this.items[t] = r, this.exact_set[n] = e;
	}
	get(e) {
		let t = e.toLowerCase(), n = this.exact_set[t];
		if (n) return [[1, n]];
		for (let t = v; t >= _; --t) {
			let n = this.__get(e, t);
			if (n.length > 0) return n;
		}
		return null;
	}
	__get(e, t) {
		let n = e.toLowerCase(), r = {}, i = ne(n, t), a = this.items[t], o = 0, s, c, l, u, d;
		for (s in i) if (c = i[s], o += c ** 2, s in this.match_dict) for (l = 0; l < this.match_dict[s].length; ++l) u = this.match_dict[s][l][0], d = this.match_dict[s][l][1], u in r ? r[u] += c * d : r[u] = c * d;
		let f = Math.sqrt(o), p = [], m;
		for (let e in r) m = r[e], p.push([m / (f * a[e][0]), a[e][1]]);
		p.sort(re);
		let h = [], g = Math.min(50, p.length);
		for (let e = 0; e < g; ++e) h.push([y(p[e][1], n), p[e][1]]);
		p = h, p.sort(re), h = [];
		for (let e = 0; e < p.length; ++e) p[e][0] === p[0][0] && h.push([p[e][0], this.exact_set[p[e][1]]]);
		return h;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/locate-character@3.0.0/node_modules/locate-character/src/index.js
function ae(e, t) {
	return e.start <= t && t < e.end;
}
function oe(e, t = {}) {
	let { offsetLine: n = 0, offsetColumn: r = 0 } = t, i = 0, a = e.split("\n").map((e, t) => {
		let n = i + e.length + 1, r = {
			start: i,
			end: n,
			line: t
		};
		return i = n, r;
	}), o = 0;
	function s(t, i) {
		if (typeof t == "string" && (t = e.indexOf(t, i ?? 0)), t === -1) return;
		let s = a[o], c = t >= s.end ? 1 : -1;
		for (; s;) {
			if (ae(s, t)) return {
				line: n + s.line,
				column: r + t - s.start,
				character: t
			};
			o += c, s = a[o];
		}
	}
	return s;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/state.js
var se = [], ce, le, ue = [], x;
function de(e) {
	le = e, ue = le.split("\n");
	let t = oe(le, { offsetLine: 1 });
	x = (e) => {
		let n = t(e);
		if (!n) throw Error("An impossible situation occurred");
		return n;
	};
}
var fe, pe = [], me = /* @__PURE__ */ new Map();
function he(e) {
	le = "", ue = [], ce = (e.filename ?? "(unknown)").replace(/\\/g, "/"), fe = e.warning ?? (() => !0), se = [];
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/utils/compile_diagnostic.js
var ge = /^\t+/;
function _e(e) {
	return e.replace(ge, (e) => e.split("	").join("  "));
}
function ve(e, t) {
	let n = ue, r = Math.max(0, e - 2), i = Math.min(e + 3, n.length), a = String(i + 1).length;
	return n.slice(r, i).map((n, i) => {
		let o = r + i === e, s = String(i + r + 1).padStart(a, " ");
		if (o) {
			let e = " ".repeat(a + 2 + _e(n.slice(0, t)).length) + "^";
			return `${s}: ${_e(n)}\n${e}`;
		}
		return `${s}: ${_e(n)}`;
	}).join("\n");
}
var ye = class {
	name = "CompileDiagnostic";
	constructor(e, t, n) {
		this.code = e, this.message = t, ce !== "(unknown)" && (this.filename = ce), n && (this.position = n, this.start = x(n[0]), this.end = x(n[1]), this.start && this.end && (this.frame = ve(this.start.line - 1, this.end.column)));
	}
	toString() {
		let e = `${this.code}: ${this.message}`;
		return this.filename && (e += `\n${this.filename}`, this.start && (e += `:${this.start.line}:${this.start.column}`)), this.frame && (e += `\n${this.frame}`), e;
	}
	toJSON() {
		return {
			code: this.code,
			message: this.message,
			filename: this.filename,
			start: this.start,
			end: this.end,
			position: this.position,
			frame: this.frame
		};
	}
}, S = class extends ye {
	name = "CompileWarning";
	constructor(e, t, n) {
		super(e, t, n);
	}
};
function C(e, t, n) {
	let r = pe;
	if (e && (r = me.get(e) ?? pe), r && r.at(-1)?.has(t)) return;
	let i = new S(t, n, e && e.start !== void 0 ? [e.start, e.end ?? e.start] : void 0);
	fe(i) && se.push(i);
}
var be = /* @__PURE__ */ "a11y_accesskey.a11y_aria_activedescendant_has_tabindex.a11y_aria_attributes.a11y_autocomplete_valid.a11y_autofocus.a11y_click_events_have_key_events.a11y_consider_explicit_label.a11y_distracting_elements.a11y_figcaption_index.a11y_figcaption_parent.a11y_hidden.a11y_img_redundant_alt.a11y_incorrect_aria_attribute_type.a11y_incorrect_aria_attribute_type_boolean.a11y_incorrect_aria_attribute_type_id.a11y_incorrect_aria_attribute_type_idlist.a11y_incorrect_aria_attribute_type_integer.a11y_incorrect_aria_attribute_type_token.a11y_incorrect_aria_attribute_type_tokenlist.a11y_incorrect_aria_attribute_type_tristate.a11y_interactive_supports_focus.a11y_invalid_attribute.a11y_label_has_associated_control.a11y_media_has_caption.a11y_misplaced_role.a11y_misplaced_scope.a11y_missing_attribute.a11y_missing_content.a11y_mouse_events_have_key_events.a11y_no_abstract_role.a11y_no_interactive_element_to_noninteractive_role.a11y_no_noninteractive_element_interactions.a11y_no_noninteractive_element_to_interactive_role.a11y_no_noninteractive_tabindex.a11y_no_redundant_roles.a11y_no_static_element_interactions.a11y_positive_tabindex.a11y_role_has_required_aria_props.a11y_role_supports_aria_props.a11y_role_supports_aria_props_implicit.a11y_unknown_aria_attribute.a11y_unknown_role.bidirectional_control_characters.legacy_code.unknown_code.options_deprecated_accessors.options_deprecated_immutable.options_missing_custom_element.options_removed_enable_sourcemap.options_removed_hydratable.options_removed_loop_guard_timeout.options_renamed_ssr_dom.custom_element_props_identifier.export_let_unused.legacy_component_creation.non_reactive_update.perf_avoid_inline_class.perf_avoid_nested_class.reactive_declaration_invalid_placement.reactive_declaration_module_script_dependency.state_referenced_locally.store_rune_conflict.css_unused_selector.attribute_avoid_is.attribute_global_event_reference.attribute_illegal_colon.attribute_invalid_property_name.attribute_quoted.bind_invalid_each_rest.block_empty.component_name_lowercase.element_implicitly_closed.element_invalid_self_closing_tag.event_directive_deprecated.node_invalid_placement_ssr.script_context_deprecated.script_unknown_attribute.slot_element_deprecated.svelte_component_deprecated.svelte_element_invalid_this.svelte_self_deprecated".split(".");
function xe(e, t, n) {
	C(e, "legacy_code", `\`${t}\` is no longer valid — please use \`${n}\` instead\nhttps://svelte.dev/e/legacy_code`);
}
function Se(e, t, n) {
	C(e, "unknown_code", `${n ? `\`${t}\` is not a recognised code (did you mean \`${n}\`?)` : `\`${t}\` is not a recognised code`}\nhttps://svelte.dev/e/unknown_code`);
}
function Ce(e) {
	C(e, "options_deprecated_accessors", "The `accessors` option has been deprecated. It will have no effect in runes mode\nhttps://svelte.dev/e/options_deprecated_accessors");
}
function we(e) {
	C(e, "options_deprecated_immutable", "The `immutable` option has been deprecated. It will have no effect in runes mode\nhttps://svelte.dev/e/options_deprecated_immutable");
}
function Te(e) {
	C(e, "options_removed_enable_sourcemap", "The `enableSourcemap` option has been removed. Source maps are always generated now, and tooling can choose to ignore them\nhttps://svelte.dev/e/options_removed_enable_sourcemap");
}
function Ee(e) {
	C(e, "options_removed_hydratable", "The `hydratable` option has been removed. Svelte components are always hydratable now\nhttps://svelte.dev/e/options_removed_hydratable");
}
function De(e) {
	C(e, "options_removed_loop_guard_timeout", "The `loopGuardTimeout` option has been removed\nhttps://svelte.dev/e/options_removed_loop_guard_timeout");
}
function Oe(e) {
	C(e, "options_renamed_ssr_dom", "`generate: \"dom\"` and `generate: \"ssr\"` options have been renamed to \"client\" and \"server\" respectively\nhttps://svelte.dev/e/options_renamed_ssr_dom");
}
function ke(e, t, n) {
	C(e, "element_implicitly_closed", `This element is implicitly closed by the following \`${t}\`, which can cause an unexpected DOM structure. Add an explicit \`${n}\` to avoid surprises.\nhttps://svelte.dev/e/element_implicitly_closed`);
}
function Ae(e) {
	C(e, "script_unknown_attribute", "Unrecognised attribute — should be one of `generics`, `lang` or `module`. If this exists for a preprocessor, ensure that the preprocessor removes it\nhttps://svelte.dev/e/script_unknown_attribute");
}
function je(e) {
	C(e, "svelte_element_invalid_this", "`this` should be an `{expression}`. Using a string attribute value will cause an error in future versions of Svelte\nhttps://svelte.dev/e/svelte_element_invalid_this");
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/utils/extract_svelte_ignore.js
var Me = /^\s*svelte-ignore\s/, Ne = {
	"non-top-level-reactive-declaration": "reactive_declaration_invalid_placement",
	"module-script-reactive-declaration": "reactive_declaration_module_script",
	"empty-block": "block_empty",
	"avoid-is": "attribute_avoid_is",
	"invalid-html-attribute": "attribute_invalid_property_name",
	"a11y-structure": "a11y_figcaption_parent",
	"illegal-attribute-character": "attribute_illegal_colon",
	"invalid-rest-eachblock-binding": "bind_invalid_each_rest",
	"unused-export-let": "export_let_unused"
}, Pe = be.concat(r);
function Fe(e, t, n) {
	let r = Me.exec(t);
	if (!r) return [];
	let i = r[0].length;
	e += i;
	let a = [];
	if (n) for (let n of t.slice(i).matchAll(/([\w$-]+)(,)?/gm)) {
		let t = n[1];
		if (Pe.includes(t)) a.push(t);
		else {
			let r = Ne[t] ?? t.replace(/-/g, "_"), i = e + n.index, a = i + t.length;
			if (Pe.includes(r)) xe({
				start: i,
				end: a
			}, t, r);
			else {
				let e = g(t, Pe);
				Se({
					start: i,
					end: a
				}, t, e);
			}
		}
		if (!n[2]) break;
	}
	else for (let e of t.slice(i).matchAll(/[\w$-]+/gm)) {
		let t = e[0];
		if (a.push(t), !Pe.includes(t)) {
			let e = Ne[t] ?? t.replace(/-/g, "_");
			Pe.includes(e) && a.push(e);
		}
	}
	return a;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/legacy.js
function Ie(e) {
	let t = e.at(0), n = e.at(-1);
	t?.type === "Text" && (m.test(t.data) ? t.data = t.data.replace(f, "") : e.shift()), n?.type === "Text" && (m.test(n.data) ? n.data = n.data.replace(p, "") : e.pop());
}
function Le(e, t) {
	return u(t, null, {
		_(e, { next: t }) {
			delete e.metadata, t();
		},
		Root(n, { visit: r }) {
			let { instance: i, module: a, options: o } = n;
			if (o?.__raw__) {
				let e = n.fragment.nodes.findIndex((e) => o.end <= e.start);
				e === -1 && (e = n.fragment.nodes.length), n.fragment.nodes.splice(e, 0, o.__raw__);
			}
			let s = null, c = null;
			if (n.fragment.nodes.length > 0) {
				let t = n.fragment.nodes.at(0), r = n.fragment.nodes.at(-1);
				for (s = t.start, c = r.end; /\s/.test(e[s]);) s += 1;
				for (; /\s/.test(e[c - 1]);) --c;
			}
			return i && delete i.attributes, a && delete a.attributes, {
				html: {
					type: "Fragment",
					start: s,
					end: c,
					children: n.fragment.nodes.map((e) => r(e))
				},
				instance: i,
				module: a,
				css: t.css ? r(t.css) : void 0,
				_comments: t.comments?.length > 0 ? t.comments : void 0
			};
		},
		AnimateDirective(e) {
			return {
				...e,
				type: "Animation"
			};
		},
		AwaitBlock(t, { visit: n }) {
			let r = {
				type: "PendingBlock",
				start: null,
				end: null,
				children: t.pending?.nodes.map((e) => n(e)) ?? [],
				skip: !0
			}, i = {
				type: "ThenBlock",
				start: null,
				end: null,
				children: t.then?.nodes.map((e) => n(e)) ?? [],
				skip: !0
			}, a = {
				type: "CatchBlock",
				start: null,
				end: null,
				children: t.catch?.nodes.map((e) => n(e)) ?? [],
				skip: !0
			};
			if (t.pending) {
				let n = t.pending.nodes.at(0), i = t.pending.nodes.at(-1);
				r.start = n?.start ?? e.indexOf("}", t.expression.end) + 1, r.end = i?.end ?? r.start, r.skip = !1;
			}
			if (t.then) {
				let n = t.then.nodes.at(0), a = t.then.nodes.at(-1);
				i.start = r.end ?? n?.start ?? e.indexOf("}", t.expression.end) + 1, i.end = a?.end ?? e.lastIndexOf("}", r.end ?? t.expression.end) + 1, i.skip = !1;
			}
			if (t.catch) {
				let n = t.catch.nodes.at(0), o = t.catch.nodes.at(-1);
				a.start = i.end ?? r.end ?? n?.start ?? e.indexOf("}", t.expression.end) + 1, a.end = o?.end ?? e.lastIndexOf("}", i.end ?? r.end ?? t.expression.end) + 1, a.skip = !1;
			}
			return {
				type: "AwaitBlock",
				start: t.start,
				end: t.end,
				expression: t.expression,
				value: t.value,
				error: t.error,
				pending: r,
				then: i,
				catch: a
			};
		},
		BindDirective(e) {
			return {
				...e,
				type: "Binding"
			};
		},
		ClassDirective(e) {
			return {
				...e,
				type: "Class"
			};
		},
		Comment(e) {
			return {
				...e,
				ignores: Fe(e.start, e.data, !1)
			};
		},
		ComplexSelector(e, { next: t }) {
			t();
			let n = [];
			for (let t of e.children) t.combinator && n.push(t.combinator), n.push(...t.selectors);
			return {
				type: "Selector",
				start: e.start,
				end: e.end,
				children: n
			};
		},
		Component(e, { visit: t }) {
			return {
				type: "InlineComponent",
				start: e.start,
				end: e.end,
				name: e.name,
				attributes: e.attributes.map((e) => t(e)),
				children: e.fragment.nodes.map((e) => t(e))
			};
		},
		ConstTag(e) {
			if (e.expression !== void 0) return e;
			let t = e, { id: n } = { ...t.declaration.declarations[0] };
			return delete n.typeAnnotation, {
				type: "ConstTag",
				start: t.start,
				end: e.end,
				expression: {
					type: "AssignmentExpression",
					start: (t.declaration.start ?? 0) + 6,
					end: t.declaration.end ?? 0,
					operator: "=",
					left: n,
					right: t.declaration.declarations[0].init
				}
			};
		},
		DeclarationTag(e) {
			return e;
		},
		KeyBlock(e, { visit: t }) {
			return Ie(e.fragment.nodes), {
				type: "KeyBlock",
				start: e.start,
				end: e.end,
				expression: e.expression,
				children: e.fragment.nodes.map((e) => t(e))
			};
		},
		EachBlock(t, { visit: n }) {
			let r;
			if (t.fallback) {
				let i = t.fallback.nodes.at(0), a = e.lastIndexOf("{", t.end - 1), o = i?.start ?? a;
				Ie(t.fallback.nodes), r = {
					type: "ElseBlock",
					start: o,
					end: a,
					children: t.fallback.nodes.map((e) => n(e))
				};
			}
			return Ie(t.body.nodes), {
				type: "EachBlock",
				start: t.start,
				end: t.end,
				children: t.body.nodes.map((e) => n(e)),
				context: t.context,
				expression: t.expression,
				index: t.index,
				key: t.key,
				else: r
			};
		},
		ExpressionTag(t, { path: n }) {
			let r = n.at(-1);
			return r?.type === "Attribute" && e[r.start] === "{" ? {
				type: "AttributeShorthand",
				start: t.start,
				end: t.end,
				expression: t.expression
			} : {
				type: "MustacheTag",
				start: t.start,
				end: t.end,
				expression: t.expression
			};
		},
		HtmlTag(e) {
			return {
				...e,
				type: "RawMustacheTag"
			};
		},
		IfBlock(t, { visit: n }) {
			let r;
			if (t.alternate) {
				let i = t.alternate.nodes;
				i.length === 1 && i[0].type === "IfBlock" && i[0].elseif && (i = i[0].consequent.nodes);
				let a = e.lastIndexOf("{", t.end - 1), o = i.at(0)?.start ?? a;
				Ie(t.alternate.nodes), r = {
					type: "ElseBlock",
					start: o,
					end: a,
					children: t.alternate.nodes.map((e) => n(e))
				};
			}
			let i = t.elseif ? t.consequent.nodes[0]?.start ?? e.lastIndexOf("{", t.end - 1) : t.start;
			return Ie(t.consequent.nodes), {
				type: "IfBlock",
				start: i,
				end: t.end,
				expression: t.test,
				children: t.consequent.nodes.map((e) => n(e)),
				else: r,
				elseif: t.elseif ? !0 : void 0
			};
		},
		OnDirective(e) {
			return {
				...e,
				type: "EventHandler"
			};
		},
		SnippetBlock(e, { visit: t }) {
			return Ie(e.body.nodes), {
				type: "SnippetBlock",
				start: e.start,
				end: e.end,
				expression: e.expression,
				parameters: e.parameters,
				children: e.body.nodes.map((e) => t(e)),
				typeParams: e.typeParams
			};
		},
		SvelteBoundary(e, { visit: t }) {
			return Ie(e.fragment.nodes), {
				type: "SvelteBoundary",
				name: "svelte:boundary",
				start: e.start,
				end: e.end,
				attributes: e.attributes.map((e) => t(e)),
				children: e.fragment.nodes.map((e) => t(e))
			};
		},
		RegularElement(e, { visit: t }) {
			return {
				type: "Element",
				start: e.start,
				end: e.end,
				name: e.name,
				attributes: e.attributes.map((e) => t(e)),
				children: e.fragment.nodes.map((e) => t(e))
			};
		},
		SlotElement(e, { visit: t }) {
			return {
				type: "Slot",
				start: e.start,
				end: e.end,
				name: e.name,
				attributes: e.attributes.map((e) => t(e)),
				children: e.fragment.nodes.map((e) => t(e))
			};
		},
		Attribute(e, { visit: t, next: n, path: r }) {
			if (e.value !== !0 && !Array.isArray(e.value)) {
				r.push(e);
				let n = [t(e.value)];
				return r.pop(), {
					...e,
					value: n
				};
			} else return n();
		},
		StyleDirective(e, { visit: t, next: n, path: r }) {
			if (e.value !== !0 && !Array.isArray(e.value)) {
				r.push(e);
				let n = [t(e.value)];
				return r.pop(), {
					...e,
					value: n
				};
			} else return n();
		},
		SpreadAttribute(e) {
			return {
				...e,
				type: "Spread"
			};
		},
		StyleSheet(e, t) {
			return {
				...e,
				...t.next(),
				type: "Style"
			};
		},
		SvelteBody(e, { visit: t }) {
			return {
				type: "Body",
				name: "svelte:body",
				start: e.start,
				end: e.end,
				attributes: e.attributes.map((e) => t(e)),
				children: e.fragment.nodes.map((e) => t(e))
			};
		},
		SvelteComponent(e, { visit: t }) {
			return {
				type: "InlineComponent",
				name: "svelte:component",
				start: e.start,
				end: e.end,
				expression: e.expression,
				attributes: e.attributes.map((e) => t(e)),
				children: e.fragment.nodes.map((e) => t(e))
			};
		},
		SvelteDocument(e, { visit: t }) {
			return {
				type: "Document",
				name: "svelte:document",
				start: e.start,
				end: e.end,
				attributes: e.attributes.map((e) => t(e)),
				children: e.fragment.nodes.map((e) => t(e))
			};
		},
		SvelteElement(t, { visit: n }) {
			let r = t.tag;
			return r.type === "Literal" && typeof r.value == "string" && e[t.tag.start - 1] !== "{" && (r = r.value), {
				type: "Element",
				name: "svelte:element",
				start: t.start,
				end: t.end,
				tag: r,
				attributes: t.attributes.map((e) => n(e)),
				children: t.fragment.nodes.map((e) => n(e))
			};
		},
		SvelteFragment(e, { visit: t }) {
			return {
				type: "SlotTemplate",
				name: "svelte:fragment",
				start: e.start,
				end: e.end,
				attributes: e.attributes.map((e) => t(e)),
				children: e.fragment.nodes.map((e) => t(e))
			};
		},
		SvelteHead(e, { visit: t }) {
			return {
				type: "Head",
				name: "svelte:head",
				start: e.start,
				end: e.end,
				attributes: e.attributes.map((e) => t(e)),
				children: e.fragment.nodes.map((e) => t(e))
			};
		},
		SvelteOptions(e, { visit: t }) {
			return {
				type: "Options",
				name: "svelte:options",
				start: e.start,
				end: e.end,
				attributes: e.attributes.map((e) => t(e))
			};
		},
		SvelteSelf(e, { visit: t }) {
			return {
				type: "InlineComponent",
				name: "svelte:self",
				start: e.start,
				end: e.end,
				attributes: e.attributes.map((e) => t(e)),
				children: e.fragment.nodes.map((e) => t(e))
			};
		},
		SvelteWindow(e, { visit: t }) {
			return {
				type: "Window",
				name: "svelte:window",
				start: e.start,
				end: e.end,
				attributes: e.attributes.map((e) => t(e)),
				children: e.fragment.nodes.map((e) => t(e))
			};
		},
		Text(e, { path: t }) {
			let n = t.at(-1);
			if (n?.type === "RegularElement" && n.name === "style") return {
				type: "Text",
				start: e.start,
				end: e.end,
				data: e.data
			};
		},
		TitleElement(e, { visit: t }) {
			return {
				type: "Title",
				name: "title",
				start: e.start,
				end: e.end,
				attributes: e.attributes.map((e) => t(e)),
				children: e.fragment.nodes.map((e) => t(e))
			};
		},
		TransitionDirective(e) {
			return {
				...e,
				type: "Transition"
			};
		},
		UseDirective(e) {
			return {
				...e,
				type: "Action"
			};
		},
		LetDirective(e) {
			return {
				...e,
				type: "Let"
			};
		}
	});
}
//#endregion
//#region ../../node_modules/.pnpm/acorn@8.16.0/node_modules/acorn/dist/acorn.mjs
var Re = /* @__PURE__ */ e({
	Node: () => tn,
	Parser: () => P,
	Position: () => ut,
	SourceLocation: () => dt,
	TokContext: () => qt,
	Token: () => qn,
	TokenType: () => T,
	defaultOptions: () => pt,
	getLineInfo: () => ft,
	isIdentifierChar: () => Xe,
	isIdentifierStart: () => w,
	isNewLine: () => Qe,
	keywordTypes: () => Ze,
	lineBreak: () => j,
	lineBreakG: () => M,
	nonASCIIwhitespace: () => et,
	parse: () => Qn,
	parseExpressionAt: () => $n,
	tokContexts: () => R,
	tokTypes: () => A,
	tokenizer: () => er,
	version: () => Zn
}), ze = [
	509,
	0,
	227,
	0,
	150,
	4,
	294,
	9,
	1368,
	2,
	2,
	1,
	6,
	3,
	41,
	2,
	5,
	0,
	166,
	1,
	574,
	3,
	9,
	9,
	7,
	9,
	32,
	4,
	318,
	1,
	78,
	5,
	71,
	10,
	50,
	3,
	123,
	2,
	54,
	14,
	32,
	10,
	3,
	1,
	11,
	3,
	46,
	10,
	8,
	0,
	46,
	9,
	7,
	2,
	37,
	13,
	2,
	9,
	6,
	1,
	45,
	0,
	13,
	2,
	49,
	13,
	9,
	3,
	2,
	11,
	83,
	11,
	7,
	0,
	3,
	0,
	158,
	11,
	6,
	9,
	7,
	3,
	56,
	1,
	2,
	6,
	3,
	1,
	3,
	2,
	10,
	0,
	11,
	1,
	3,
	6,
	4,
	4,
	68,
	8,
	2,
	0,
	3,
	0,
	2,
	3,
	2,
	4,
	2,
	0,
	15,
	1,
	83,
	17,
	10,
	9,
	5,
	0,
	82,
	19,
	13,
	9,
	214,
	6,
	3,
	8,
	28,
	1,
	83,
	16,
	16,
	9,
	82,
	12,
	9,
	9,
	7,
	19,
	58,
	14,
	5,
	9,
	243,
	14,
	166,
	9,
	71,
	5,
	2,
	1,
	3,
	3,
	2,
	0,
	2,
	1,
	13,
	9,
	120,
	6,
	3,
	6,
	4,
	0,
	29,
	9,
	41,
	6,
	2,
	3,
	9,
	0,
	10,
	10,
	47,
	15,
	199,
	7,
	137,
	9,
	54,
	7,
	2,
	7,
	17,
	9,
	57,
	21,
	2,
	13,
	123,
	5,
	4,
	0,
	2,
	1,
	2,
	6,
	2,
	0,
	9,
	9,
	49,
	4,
	2,
	1,
	2,
	4,
	9,
	9,
	55,
	9,
	266,
	3,
	10,
	1,
	2,
	0,
	49,
	6,
	4,
	4,
	14,
	10,
	5350,
	0,
	7,
	14,
	11465,
	27,
	2343,
	9,
	87,
	9,
	39,
	4,
	60,
	6,
	26,
	9,
	535,
	9,
	470,
	0,
	2,
	54,
	8,
	3,
	82,
	0,
	12,
	1,
	19628,
	1,
	4178,
	9,
	519,
	45,
	3,
	22,
	543,
	4,
	4,
	5,
	9,
	7,
	3,
	6,
	31,
	3,
	149,
	2,
	1418,
	49,
	513,
	54,
	5,
	49,
	9,
	0,
	15,
	0,
	23,
	4,
	2,
	14,
	1361,
	6,
	2,
	16,
	3,
	6,
	2,
	1,
	2,
	4,
	101,
	0,
	161,
	6,
	10,
	9,
	357,
	0,
	62,
	13,
	499,
	13,
	245,
	1,
	2,
	9,
	233,
	0,
	3,
	0,
	8,
	1,
	6,
	0,
	475,
	6,
	110,
	6,
	6,
	9,
	4759,
	9,
	787719,
	239
], Be = [
	0,
	11,
	2,
	25,
	2,
	18,
	2,
	1,
	2,
	14,
	3,
	13,
	35,
	122,
	70,
	52,
	268,
	28,
	4,
	48,
	48,
	31,
	14,
	29,
	6,
	37,
	11,
	29,
	3,
	35,
	5,
	7,
	2,
	4,
	43,
	157,
	19,
	35,
	5,
	35,
	5,
	39,
	9,
	51,
	13,
	10,
	2,
	14,
	2,
	6,
	2,
	1,
	2,
	10,
	2,
	14,
	2,
	6,
	2,
	1,
	4,
	51,
	13,
	310,
	10,
	21,
	11,
	7,
	25,
	5,
	2,
	41,
	2,
	8,
	70,
	5,
	3,
	0,
	2,
	43,
	2,
	1,
	4,
	0,
	3,
	22,
	11,
	22,
	10,
	30,
	66,
	18,
	2,
	1,
	11,
	21,
	11,
	25,
	7,
	25,
	39,
	55,
	7,
	1,
	65,
	0,
	16,
	3,
	2,
	2,
	2,
	28,
	43,
	28,
	4,
	28,
	36,
	7,
	2,
	27,
	28,
	53,
	11,
	21,
	11,
	18,
	14,
	17,
	111,
	72,
	56,
	50,
	14,
	50,
	14,
	35,
	39,
	27,
	10,
	22,
	251,
	41,
	7,
	1,
	17,
	5,
	57,
	28,
	11,
	0,
	9,
	21,
	43,
	17,
	47,
	20,
	28,
	22,
	13,
	52,
	58,
	1,
	3,
	0,
	14,
	44,
	33,
	24,
	27,
	35,
	30,
	0,
	3,
	0,
	9,
	34,
	4,
	0,
	13,
	47,
	15,
	3,
	22,
	0,
	2,
	0,
	36,
	17,
	2,
	24,
	20,
	1,
	64,
	6,
	2,
	0,
	2,
	3,
	2,
	14,
	2,
	9,
	8,
	46,
	39,
	7,
	3,
	1,
	3,
	21,
	2,
	6,
	2,
	1,
	2,
	4,
	4,
	0,
	19,
	0,
	13,
	4,
	31,
	9,
	2,
	0,
	3,
	0,
	2,
	37,
	2,
	0,
	26,
	0,
	2,
	0,
	45,
	52,
	19,
	3,
	21,
	2,
	31,
	47,
	21,
	1,
	2,
	0,
	185,
	46,
	42,
	3,
	37,
	47,
	21,
	0,
	60,
	42,
	14,
	0,
	72,
	26,
	38,
	6,
	186,
	43,
	117,
	63,
	32,
	7,
	3,
	0,
	3,
	7,
	2,
	1,
	2,
	23,
	16,
	0,
	2,
	0,
	95,
	7,
	3,
	38,
	17,
	0,
	2,
	0,
	29,
	0,
	11,
	39,
	8,
	0,
	22,
	0,
	12,
	45,
	20,
	0,
	19,
	72,
	200,
	32,
	32,
	8,
	2,
	36,
	18,
	0,
	50,
	29,
	113,
	6,
	2,
	1,
	2,
	37,
	22,
	0,
	26,
	5,
	2,
	1,
	2,
	31,
	15,
	0,
	24,
	43,
	261,
	18,
	16,
	0,
	2,
	12,
	2,
	33,
	125,
	0,
	80,
	921,
	103,
	110,
	18,
	195,
	2637,
	96,
	16,
	1071,
	18,
	5,
	26,
	3994,
	6,
	582,
	6842,
	29,
	1763,
	568,
	8,
	30,
	18,
	78,
	18,
	29,
	19,
	47,
	17,
	3,
	32,
	20,
	6,
	18,
	433,
	44,
	212,
	63,
	33,
	24,
	3,
	24,
	45,
	74,
	6,
	0,
	67,
	12,
	65,
	1,
	2,
	0,
	15,
	4,
	10,
	7381,
	42,
	31,
	98,
	114,
	8702,
	3,
	2,
	6,
	2,
	1,
	2,
	290,
	16,
	0,
	30,
	2,
	3,
	0,
	15,
	3,
	9,
	395,
	2309,
	106,
	6,
	12,
	4,
	8,
	8,
	9,
	5991,
	84,
	2,
	70,
	2,
	1,
	3,
	0,
	3,
	1,
	3,
	3,
	2,
	11,
	2,
	0,
	2,
	6,
	2,
	64,
	2,
	3,
	3,
	7,
	2,
	6,
	2,
	27,
	2,
	3,
	2,
	4,
	2,
	0,
	4,
	6,
	2,
	339,
	3,
	24,
	2,
	24,
	2,
	30,
	2,
	24,
	2,
	30,
	2,
	24,
	2,
	30,
	2,
	24,
	2,
	30,
	2,
	24,
	2,
	7,
	1845,
	30,
	7,
	5,
	262,
	61,
	147,
	44,
	11,
	6,
	17,
	0,
	322,
	29,
	19,
	43,
	485,
	27,
	229,
	29,
	3,
	0,
	208,
	30,
	2,
	2,
	2,
	1,
	2,
	6,
	3,
	4,
	10,
	1,
	225,
	6,
	2,
	3,
	2,
	1,
	2,
	14,
	2,
	196,
	60,
	67,
	8,
	0,
	1205,
	3,
	2,
	26,
	2,
	1,
	2,
	0,
	3,
	0,
	2,
	9,
	2,
	3,
	2,
	0,
	2,
	0,
	7,
	0,
	5,
	0,
	2,
	0,
	2,
	0,
	2,
	2,
	2,
	1,
	2,
	0,
	3,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	1,
	2,
	0,
	3,
	3,
	2,
	6,
	2,
	3,
	2,
	3,
	2,
	0,
	2,
	9,
	2,
	16,
	6,
	2,
	2,
	4,
	2,
	16,
	4421,
	42719,
	33,
	4381,
	3,
	5773,
	3,
	7472,
	16,
	621,
	2467,
	541,
	1507,
	4938,
	6,
	8489
], Ve = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-᫝᫠-᫫ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･", He = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-࢏ࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚ౜ౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽ೜-ೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-Ƛ꟱-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", Ue = {
	3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
	5: "class enum extends super const export import",
	6: "enum",
	strict: "implements interface let package private protected public static yield",
	strictBind: "eval arguments"
}, We = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this", Ge = {
	5: We,
	"5module": We + " export import",
	6: We + " const class extends export import super"
}, Ke = /^in(stanceof)?$/, qe = RegExp("[" + He + "]"), Je = RegExp("[" + He + Ve + "]");
function Ye(e, t) {
	for (var n = 65536, r = 0; r < t.length; r += 2) {
		if (n += t[r], n > e) return !1;
		if (n += t[r + 1], n >= e) return !0;
	}
	return !1;
}
function w(e, t) {
	return e < 65 ? e === 36 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && qe.test(String.fromCharCode(e)) : t === !1 ? !1 : Ye(e, Be);
}
function Xe(e, t) {
	return e < 48 ? e === 36 : e < 58 ? !0 : e < 65 ? !1 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && Je.test(String.fromCharCode(e)) : t === !1 ? !1 : Ye(e, Be) || Ye(e, ze);
}
var T = function(e, t) {
	t === void 0 && (t = {}), this.label = e, this.keyword = t.keyword, this.beforeExpr = !!t.beforeExpr, this.startsExpr = !!t.startsExpr, this.isLoop = !!t.isLoop, this.isAssign = !!t.isAssign, this.prefix = !!t.prefix, this.postfix = !!t.postfix, this.binop = t.binop || null, this.updateContext = null;
};
function E(e, t) {
	return new T(e, {
		beforeExpr: !0,
		binop: t
	});
}
var D = { beforeExpr: !0 }, O = { startsExpr: !0 }, Ze = {};
function k(e, t) {
	return t === void 0 && (t = {}), t.keyword = e, Ze[e] = new T(e, t);
}
var A = {
	num: new T("num", O),
	regexp: new T("regexp", O),
	string: new T("string", O),
	name: new T("name", O),
	privateId: new T("privateId", O),
	eof: new T("eof"),
	bracketL: new T("[", {
		beforeExpr: !0,
		startsExpr: !0
	}),
	bracketR: new T("]"),
	braceL: new T("{", {
		beforeExpr: !0,
		startsExpr: !0
	}),
	braceR: new T("}"),
	parenL: new T("(", {
		beforeExpr: !0,
		startsExpr: !0
	}),
	parenR: new T(")"),
	comma: new T(",", D),
	semi: new T(";", D),
	colon: new T(":", D),
	dot: new T("."),
	question: new T("?", D),
	questionDot: new T("?."),
	arrow: new T("=>", D),
	template: new T("template"),
	invalidTemplate: new T("invalidTemplate"),
	ellipsis: new T("...", D),
	backQuote: new T("`", O),
	dollarBraceL: new T("${", {
		beforeExpr: !0,
		startsExpr: !0
	}),
	eq: new T("=", {
		beforeExpr: !0,
		isAssign: !0
	}),
	assign: new T("_=", {
		beforeExpr: !0,
		isAssign: !0
	}),
	incDec: new T("++/--", {
		prefix: !0,
		postfix: !0,
		startsExpr: !0
	}),
	prefix: new T("!/~", {
		beforeExpr: !0,
		prefix: !0,
		startsExpr: !0
	}),
	logicalOR: E("||", 1),
	logicalAND: E("&&", 2),
	bitwiseOR: E("|", 3),
	bitwiseXOR: E("^", 4),
	bitwiseAND: E("&", 5),
	equality: E("==/!=/===/!==", 6),
	relational: E("</>/<=/>=", 7),
	bitShift: E("<</>>/>>>", 8),
	plusMin: new T("+/-", {
		beforeExpr: !0,
		binop: 9,
		prefix: !0,
		startsExpr: !0
	}),
	modulo: E("%", 10),
	star: E("*", 10),
	slash: E("/", 10),
	starstar: new T("**", { beforeExpr: !0 }),
	coalesce: E("??", 1),
	_break: k("break"),
	_case: k("case", D),
	_catch: k("catch"),
	_continue: k("continue"),
	_debugger: k("debugger"),
	_default: k("default", D),
	_do: k("do", {
		isLoop: !0,
		beforeExpr: !0
	}),
	_else: k("else", D),
	_finally: k("finally"),
	_for: k("for", { isLoop: !0 }),
	_function: k("function", O),
	_if: k("if"),
	_return: k("return", D),
	_switch: k("switch"),
	_throw: k("throw", D),
	_try: k("try"),
	_var: k("var"),
	_const: k("const"),
	_while: k("while", { isLoop: !0 }),
	_with: k("with"),
	_new: k("new", {
		beforeExpr: !0,
		startsExpr: !0
	}),
	_this: k("this", O),
	_super: k("super", O),
	_class: k("class", O),
	_extends: k("extends", D),
	_export: k("export"),
	_import: k("import", O),
	_null: k("null", O),
	_true: k("true", O),
	_false: k("false", O),
	_in: k("in", {
		beforeExpr: !0,
		binop: 7
	}),
	_instanceof: k("instanceof", {
		beforeExpr: !0,
		binop: 7
	}),
	_typeof: k("typeof", {
		beforeExpr: !0,
		prefix: !0,
		startsExpr: !0
	}),
	_void: k("void", {
		beforeExpr: !0,
		prefix: !0,
		startsExpr: !0
	}),
	_delete: k("delete", {
		beforeExpr: !0,
		prefix: !0,
		startsExpr: !0
	})
}, j = /\r\n?|\n|\u2028|\u2029/, M = new RegExp(j.source, "g");
function Qe(e) {
	return e === 10 || e === 13 || e === 8232 || e === 8233;
}
function $e(e, t, n) {
	n === void 0 && (n = e.length);
	for (var r = t; r < n; r++) {
		var i = e.charCodeAt(r);
		if (Qe(i)) return r < n - 1 && i === 13 && e.charCodeAt(r + 1) === 10 ? r + 2 : r + 1;
	}
	return -1;
}
var et = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, N = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, tt = Object.prototype, nt = tt.hasOwnProperty, rt = tt.toString, it = Object.hasOwn || (function(e, t) {
	return nt.call(e, t);
}), at = Array.isArray || (function(e) {
	return rt.call(e) === "[object Array]";
}), ot = Object.create(null);
function st(e) {
	return ot[e] || (ot[e] = RegExp("^(?:" + e.replace(/ /g, "|") + ")$"));
}
function ct(e) {
	return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
}
var lt = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/, ut = function(e, t) {
	this.line = e, this.column = t;
};
ut.prototype.offset = function(e) {
	return new ut(this.line, this.column + e);
};
var dt = function(e, t, n) {
	this.start = t, this.end = n, e.sourceFile !== null && (this.source = e.sourceFile);
};
function ft(e, t) {
	for (var n = 1, r = 0;;) {
		var i = $e(e, r, t);
		if (i < 0) return new ut(n, t - r);
		++n, r = i;
	}
}
var pt = {
	ecmaVersion: null,
	sourceType: "script",
	onInsertedSemicolon: null,
	onTrailingComma: null,
	allowReserved: null,
	allowReturnOutsideFunction: !1,
	allowImportExportEverywhere: !1,
	allowAwaitOutsideFunction: null,
	allowSuperOutsideMethod: null,
	allowHashBang: !1,
	checkPrivateFields: !0,
	locations: !1,
	onToken: null,
	onComment: null,
	ranges: !1,
	program: null,
	sourceFile: null,
	directSourceFile: null,
	preserveParens: !1
}, mt = !1;
function ht(e) {
	var t = {};
	for (var n in pt) t[n] = e && it(e, n) ? e[n] : pt[n];
	if (t.ecmaVersion === "latest" ? t.ecmaVersion = 1e8 : t.ecmaVersion == null ? (!mt && typeof console == "object" && console.warn && (mt = !0, console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.")), t.ecmaVersion = 11) : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), t.allowReserved ??= t.ecmaVersion < 5, (!e || e.allowHashBang == null) && (t.allowHashBang = t.ecmaVersion >= 14), at(t.onToken)) {
		var r = t.onToken;
		t.onToken = function(e) {
			return r.push(e);
		};
	}
	if (at(t.onComment) && (t.onComment = gt(t, t.onComment)), t.sourceType === "commonjs" && t.allowAwaitOutsideFunction) throw Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");
	return t;
}
function gt(e, t) {
	return function(n, r, i, a, o, s) {
		var c = {
			type: n ? "Block" : "Line",
			value: r,
			start: i,
			end: a
		};
		e.locations && (c.loc = new dt(this, o, s)), e.ranges && (c.range = [i, a]), t.push(c);
	};
}
var _t = 1, vt = 2, yt = 4, bt = 8, xt = 16, St = 32, Ct = 64, wt = 128, Tt = 256, Et = 512, Dt = 1024, Ot = _t | vt | Tt;
function kt(e, t) {
	return vt | (e ? yt : 0) | (t ? bt : 0);
}
var At = 0, jt = 1, Mt = 2, Nt = 3, Pt = 4, Ft = 5, P = function(e, t, n) {
	this.options = e = ht(e), this.sourceFile = e.sourceFile, this.keywords = st(Ge[e.ecmaVersion >= 6 ? 6 : e.sourceType === "module" ? "5module" : 5]);
	var r = "";
	e.allowReserved !== !0 && (r = Ue[e.ecmaVersion >= 6 ? 6 : e.ecmaVersion === 5 ? 5 : 3], e.sourceType === "module" && (r += " await")), this.reservedWords = st(r);
	var i = (r ? r + " " : "") + Ue.strict;
	this.reservedWordsStrict = st(i), this.reservedWordsStrictBind = st(i + " " + Ue.strictBind), this.input = String(t), this.containsEsc = !1, n ? (this.pos = n, this.lineStart = this.input.lastIndexOf("\n", n - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(j).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = A.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = e.sourceType === "module", this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = Object.create(null), this.pos === 0 && e.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(this.options.sourceType === "commonjs" ? vt : _t), this.regexpState = null, this.privateNameStack = [];
}, F = {
	inFunction: { configurable: !0 },
	inGenerator: { configurable: !0 },
	inAsync: { configurable: !0 },
	canAwait: { configurable: !0 },
	allowReturn: { configurable: !0 },
	allowSuper: { configurable: !0 },
	allowDirectSuper: { configurable: !0 },
	treatFunctionsAsVar: { configurable: !0 },
	allowNewDotTarget: { configurable: !0 },
	allowUsing: { configurable: !0 },
	inClassStaticBlock: { configurable: !0 }
};
P.prototype.parse = function() {
	var e = this.options.program || this.startNode();
	return this.nextToken(), this.parseTopLevel(e);
}, F.inFunction.get = function() {
	return (this.currentVarScope().flags & vt) > 0;
}, F.inGenerator.get = function() {
	return (this.currentVarScope().flags & bt) > 0;
}, F.inAsync.get = function() {
	return (this.currentVarScope().flags & yt) > 0;
}, F.canAwait.get = function() {
	for (var e = this.scopeStack.length - 1; e >= 0; e--) {
		var t = this.scopeStack[e].flags;
		if (t & (Tt | Et)) return !1;
		if (t & vt) return (t & yt) > 0;
	}
	return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
}, F.allowReturn.get = function() {
	return !!(this.inFunction || this.options.allowReturnOutsideFunction && this.currentVarScope().flags & _t);
}, F.allowSuper.get = function() {
	return (this.currentThisScope().flags & Ct) > 0 || this.options.allowSuperOutsideMethod;
}, F.allowDirectSuper.get = function() {
	return (this.currentThisScope().flags & wt) > 0;
}, F.treatFunctionsAsVar.get = function() {
	return this.treatFunctionsAsVarInScope(this.currentScope());
}, F.allowNewDotTarget.get = function() {
	for (var e = this.scopeStack.length - 1; e >= 0; e--) {
		var t = this.scopeStack[e].flags;
		if (t & (Tt | Et) || t & vt && !(t & xt)) return !0;
	}
	return !1;
}, F.allowUsing.get = function() {
	var e = this.currentScope().flags;
	return !(e & Dt || !this.inModule && e & _t);
}, F.inClassStaticBlock.get = function() {
	return (this.currentVarScope().flags & Tt) > 0;
}, P.extend = function() {
	for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
	for (var n = this, r = 0; r < e.length; r++) n = e[r](n);
	return n;
}, P.parse = function(e, t) {
	return new this(t, e).parse();
}, P.parseExpressionAt = function(e, t, n) {
	var r = new this(n, e, t);
	return r.nextToken(), r.parseExpression();
}, P.tokenizer = function(e, t) {
	return new this(t, e);
}, Object.defineProperties(P.prototype, F);
var I = P.prototype, It = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
I.strictDirective = function(e) {
	if (this.options.ecmaVersion < 5) return !1;
	for (;;) {
		N.lastIndex = e, e += N.exec(this.input)[0].length;
		var t = It.exec(this.input.slice(e));
		if (!t) return !1;
		if ((t[1] || t[2]) === "use strict") {
			N.lastIndex = e + t[0].length;
			var n = N.exec(this.input), r = n.index + n[0].length, i = this.input.charAt(r);
			return i === ";" || i === "}" || j.test(n[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(i) || i === "!" && this.input.charAt(r + 1) === "=");
		}
		e += t[0].length, N.lastIndex = e, e += N.exec(this.input)[0].length, this.input[e] === ";" && e++;
	}
}, I.eat = function(e) {
	return this.type === e ? (this.next(), !0) : !1;
}, I.isContextual = function(e) {
	return this.type === A.name && this.value === e && !this.containsEsc;
}, I.eatContextual = function(e) {
	return this.isContextual(e) ? (this.next(), !0) : !1;
}, I.expectContextual = function(e) {
	this.eatContextual(e) || this.unexpected();
}, I.canInsertSemicolon = function() {
	return this.type === A.eof || this.type === A.braceR || j.test(this.input.slice(this.lastTokEnd, this.start));
}, I.insertSemicolon = function() {
	if (this.canInsertSemicolon()) return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
}, I.semicolon = function() {
	!this.eat(A.semi) && !this.insertSemicolon() && this.unexpected();
}, I.afterTrailingComma = function(e, t) {
	if (this.type === e) return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), !0;
}, I.expect = function(e) {
	this.eat(e) || this.unexpected();
}, I.unexpected = function(e) {
	this.raise(e ?? this.start, "Unexpected token");
};
var Lt = function() {
	this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
};
I.checkPatternErrors = function(e, t) {
	if (e) {
		e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element");
		var n = t ? e.parenthesizedAssign : e.parenthesizedBind;
		n > -1 && this.raiseRecoverable(n, t ? "Assigning to rvalue" : "Parenthesized pattern");
	}
}, I.checkExpressionErrors = function(e, t) {
	if (!e) return !1;
	var n = e.shorthandAssign, r = e.doubleProto;
	if (!t) return n >= 0 || r >= 0;
	n >= 0 && this.raise(n, "Shorthand property assignments are valid only in destructuring patterns"), r >= 0 && this.raiseRecoverable(r, "Redefinition of __proto__ property");
}, I.checkYieldAwaitInDefaultParams = function() {
	this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
}, I.isSimpleAssignTarget = function(e) {
	return e.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(e.expression) : e.type === "Identifier" || e.type === "MemberExpression";
};
var L = P.prototype;
L.parseTopLevel = function(e) {
	var t = Object.create(null);
	for (e.body ||= []; this.type !== A.eof;) {
		var n = this.parseStatement(null, !0, t);
		e.body.push(n);
	}
	if (this.inModule) for (var r = 0, i = Object.keys(this.undefinedExports); r < i.length; r += 1) {
		var a = i[r];
		this.raiseRecoverable(this.undefinedExports[a].start, "Export '" + a + "' is not defined");
	}
	return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType === "commonjs" ? "script" : this.options.sourceType, this.finishNode(e, "Program");
};
var Rt = { kind: "loop" }, zt = { kind: "switch" };
L.isLet = function(e) {
	if (this.options.ecmaVersion < 6 || !this.isContextual("let")) return !1;
	N.lastIndex = this.pos;
	var t = N.exec(this.input), n = this.pos + t[0].length, r = this.fullCharCodeAt(n);
	if (r === 91 || r === 92) return !0;
	if (e) return !1;
	if (r === 123) return !0;
	if (w(r)) {
		var i = n;
		do
			n += r <= 65535 ? 1 : 2;
		while (Xe(r = this.fullCharCodeAt(n)));
		if (r === 92) return !0;
		var a = this.input.slice(i, n);
		if (!Ke.test(a)) return !0;
	}
	return !1;
}, L.isAsyncFunction = function() {
	if (this.options.ecmaVersion < 8 || !this.isContextual("async")) return !1;
	N.lastIndex = this.pos;
	var e = N.exec(this.input), t = this.pos + e[0].length, n;
	return !j.test(this.input.slice(this.pos, t)) && this.input.slice(t, t + 8) === "function" && (t + 8 === this.input.length || !(Xe(n = this.fullCharCodeAt(t + 8)) || n === 92));
}, L.isUsingKeyword = function(e, t) {
	if (this.options.ecmaVersion < 17 || !this.isContextual(e ? "await" : "using")) return !1;
	N.lastIndex = this.pos;
	var n = N.exec(this.input), r = this.pos + n[0].length;
	if (j.test(this.input.slice(this.pos, r))) return !1;
	if (e) {
		var i = r + 5, a;
		if (this.input.slice(r, i) !== "using" || i === this.input.length || Xe(a = this.fullCharCodeAt(i)) || a === 92) return !1;
		N.lastIndex = i;
		var o = N.exec(this.input);
		if (r = i + o[0].length, o && j.test(this.input.slice(i, r))) return !1;
	}
	var s = this.fullCharCodeAt(r);
	if (!w(s) && s !== 92) return !1;
	var c = r;
	do
		r += s <= 65535 ? 1 : 2;
	while (Xe(s = this.fullCharCodeAt(r)));
	if (s === 92) return !0;
	var l = this.input.slice(c, r);
	return !(Ke.test(l) || t && l === "of");
}, L.isAwaitUsing = function(e) {
	return this.isUsingKeyword(!0, e);
}, L.isUsing = function(e) {
	return this.isUsingKeyword(!1, e);
}, L.parseStatement = function(e, t, n) {
	var r = this.type, i = this.startNode(), a;
	switch (this.isLet(e) && (r = A._var, a = "let"), r) {
		case A._break:
		case A._continue: return this.parseBreakContinueStatement(i, r.keyword);
		case A._debugger: return this.parseDebuggerStatement(i);
		case A._do: return this.parseDoStatement(i);
		case A._for: return this.parseForStatement(i);
		case A._function: return e && (this.strict || e !== "if" && e !== "label") && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(i, !1, !e);
		case A._class: return e && this.unexpected(), this.parseClass(i, !0);
		case A._if: return this.parseIfStatement(i);
		case A._return: return this.parseReturnStatement(i);
		case A._switch: return this.parseSwitchStatement(i);
		case A._throw: return this.parseThrowStatement(i);
		case A._try: return this.parseTryStatement(i);
		case A._const:
		case A._var: return a ||= this.value, e && a !== "var" && this.unexpected(), this.parseVarStatement(i, a);
		case A._while: return this.parseWhileStatement(i);
		case A._with: return this.parseWithStatement(i);
		case A.braceL: return this.parseBlock(!0, i);
		case A.semi: return this.parseEmptyStatement(i);
		case A._export:
		case A._import:
			if (this.options.ecmaVersion > 10 && r === A._import) {
				N.lastIndex = this.pos;
				var o = N.exec(this.input), s = this.pos + o[0].length, c = this.input.charCodeAt(s);
				if (c === 40 || c === 46) return this.parseExpressionStatement(i, this.parseExpression());
			}
			return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), r === A._import ? this.parseImport(i) : this.parseExport(i, n);
		default:
			if (this.isAsyncFunction()) return e && this.unexpected(), this.next(), this.parseFunctionStatement(i, !0, !e);
			var l = this.isAwaitUsing(!1) ? "await using" : this.isUsing(!1) ? "using" : null;
			if (l) return this.allowUsing || this.raise(this.start, "Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"), l === "await using" && (this.canAwait || this.raise(this.start, "Await using cannot appear outside of async function"), this.next()), this.next(), this.parseVar(i, !1, l), this.semicolon(), this.finishNode(i, "VariableDeclaration");
			var u = this.value, d = this.parseExpression();
			return r === A.name && d.type === "Identifier" && this.eat(A.colon) ? this.parseLabeledStatement(i, u, d, e) : this.parseExpressionStatement(i, d);
	}
}, L.parseBreakContinueStatement = function(e, t) {
	var n = t === "break";
	this.next(), this.eat(A.semi) || this.insertSemicolon() ? e.label = null : this.type === A.name ? (e.label = this.parseIdent(), this.semicolon()) : this.unexpected();
	for (var r = 0; r < this.labels.length; ++r) {
		var i = this.labels[r];
		if ((e.label == null || i.name === e.label.name) && (i.kind != null && (n || i.kind === "loop") || e.label && n)) break;
	}
	return r === this.labels.length && this.raise(e.start, "Unsyntactic " + t), this.finishNode(e, n ? "BreakStatement" : "ContinueStatement");
}, L.parseDebuggerStatement = function(e) {
	return this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement");
}, L.parseDoStatement = function(e) {
	return this.next(), this.labels.push(Rt), e.body = this.parseStatement("do"), this.labels.pop(), this.expect(A._while), e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(A.semi) : this.semicolon(), this.finishNode(e, "DoWhileStatement");
}, L.parseForStatement = function(e) {
	this.next();
	var t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
	if (this.labels.push(Rt), this.enterScope(0), this.expect(A.parenL), this.type === A.semi) return t > -1 && this.unexpected(t), this.parseFor(e, null);
	var n = this.isLet();
	if (this.type === A._var || this.type === A._const || n) {
		var r = this.startNode(), i = n ? "let" : this.value;
		return this.next(), this.parseVar(r, !0, i), this.finishNode(r, "VariableDeclaration"), this.parseForAfterInit(e, r, t);
	}
	var a = this.isContextual("let"), o = !1, s = this.isUsing(!0) ? "using" : this.isAwaitUsing(!0) ? "await using" : null;
	if (s) {
		var c = this.startNode();
		return this.next(), s === "await using" && (this.canAwait || this.raise(this.start, "Await using cannot appear outside of async function"), this.next()), this.parseVar(c, !0, s), this.finishNode(c, "VariableDeclaration"), this.parseForAfterInit(e, c, t);
	}
	var l = this.containsEsc, u = new Lt(), d = this.start, f = t > -1 ? this.parseExprSubscripts(u, "await") : this.parseExpression(!0, u);
	return this.type === A._in || (o = this.options.ecmaVersion >= 6 && this.isContextual("of")) ? (t > -1 ? (this.type === A._in && this.unexpected(t), e.await = !0) : o && this.options.ecmaVersion >= 8 && (f.start === d && !l && f.type === "Identifier" && f.name === "async" ? this.unexpected() : this.options.ecmaVersion >= 9 && (e.await = !1)), a && o && this.raise(f.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(f, !1, u), this.checkLValPattern(f), this.parseForIn(e, f)) : (this.checkExpressionErrors(u, !0), t > -1 && this.unexpected(t), this.parseFor(e, f));
}, L.parseForAfterInit = function(e, t, n) {
	return (this.type === A._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && t.declarations.length === 1 ? (this.options.ecmaVersion >= 9 && (this.type === A._in ? n > -1 && this.unexpected(n) : e.await = n > -1), this.parseForIn(e, t)) : (n > -1 && this.unexpected(n), this.parseFor(e, t));
}, L.parseFunctionStatement = function(e, t, n) {
	return this.next(), this.parseFunction(e, Vt | (n ? 0 : Ht), !1, t);
}, L.parseIfStatement = function(e) {
	return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement("if"), e.alternate = this.eat(A._else) ? this.parseStatement("if") : null, this.finishNode(e, "IfStatement");
}, L.parseReturnStatement = function(e) {
	return this.allowReturn || this.raise(this.start, "'return' outside of function"), this.next(), this.eat(A.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, "ReturnStatement");
}, L.parseSwitchStatement = function(e) {
	this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(A.braceL), this.labels.push(zt), this.enterScope(Dt);
	for (var t, n = !1; this.type !== A.braceR;) if (this.type === A._case || this.type === A._default) {
		var r = this.type === A._case;
		t && this.finishNode(t, "SwitchCase"), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), r ? t.test = this.parseExpression() : (n && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), n = !0, t.test = null), this.expect(A.colon);
	} else t || this.unexpected(), t.consequent.push(this.parseStatement(null));
	return this.exitScope(), t && this.finishNode(t, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(e, "SwitchStatement");
}, L.parseThrowStatement = function(e) {
	return this.next(), j.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, "ThrowStatement");
};
var Bt = [];
L.parseCatchClauseParam = function() {
	var e = this.parseBindingAtom(), t = e.type === "Identifier";
	return this.enterScope(t ? St : 0), this.checkLValPattern(e, t ? Pt : Mt), this.expect(A.parenR), e;
}, L.parseTryStatement = function(e) {
	if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === A._catch) {
		var t = this.startNode();
		this.next(), this.eat(A.parenL) ? t.param = this.parseCatchClauseParam() : (this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0)), t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, "CatchClause");
	}
	return e.finalizer = this.eat(A._finally) ? this.parseBlock() : null, !e.handler && !e.finalizer && this.raise(e.start, "Missing catch or finally clause"), this.finishNode(e, "TryStatement");
}, L.parseVarStatement = function(e, t, n) {
	return this.next(), this.parseVar(e, !1, t, n), this.semicolon(), this.finishNode(e, "VariableDeclaration");
}, L.parseWhileStatement = function(e) {
	return this.next(), e.test = this.parseParenExpression(), this.labels.push(Rt), e.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(e, "WhileStatement");
}, L.parseWithStatement = function(e) {
	return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement("with"), this.finishNode(e, "WithStatement");
}, L.parseEmptyStatement = function(e) {
	return this.next(), this.finishNode(e, "EmptyStatement");
}, L.parseLabeledStatement = function(e, t, n, r) {
	for (var i = 0, a = this.labels; i < a.length; i += 1) a[i].name === t && this.raise(n.start, "Label '" + t + "' is already declared");
	for (var o = this.type.isLoop ? "loop" : this.type === A._switch ? "switch" : null, s = this.labels.length - 1; s >= 0; s--) {
		var c = this.labels[s];
		if (c.statementStart === e.start) c.statementStart = this.start, c.kind = o;
		else break;
	}
	return this.labels.push({
		name: t,
		kind: o,
		statementStart: this.start
	}), e.body = this.parseStatement(r ? r.indexOf("label") === -1 ? r + "label" : r : "label"), this.labels.pop(), e.label = n, this.finishNode(e, "LabeledStatement");
}, L.parseExpressionStatement = function(e, t) {
	return e.expression = t, this.semicolon(), this.finishNode(e, "ExpressionStatement");
}, L.parseBlock = function(e, t, n) {
	for (e === void 0 && (e = !0), t === void 0 && (t = this.startNode()), t.body = [], this.expect(A.braceL), e && this.enterScope(0); this.type !== A.braceR;) {
		var r = this.parseStatement(null);
		t.body.push(r);
	}
	return n && (this.strict = !1), this.next(), e && this.exitScope(), this.finishNode(t, "BlockStatement");
}, L.parseFor = function(e, t) {
	return e.init = t, this.expect(A.semi), e.test = this.type === A.semi ? null : this.parseExpression(), this.expect(A.semi), e.update = this.type === A.parenR ? null : this.parseExpression(), this.expect(A.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, "ForStatement");
}, L.parseForIn = function(e, t) {
	var n = this.type === A._in;
	return this.next(), t.type === "VariableDeclaration" && t.declarations[0].init != null && (!n || this.options.ecmaVersion < 8 || this.strict || t.kind !== "var" || t.declarations[0].id.type !== "Identifier") && this.raise(t.start, (n ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"), e.left = t, e.right = n ? this.parseExpression() : this.parseMaybeAssign(), this.expect(A.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, n ? "ForInStatement" : "ForOfStatement");
}, L.parseVar = function(e, t, n, r) {
	for (e.declarations = [], e.kind = n;;) {
		var i = this.startNode();
		if (this.parseVarId(i, n), this.eat(A.eq) ? i.init = this.parseMaybeAssign(t) : !r && n === "const" && !(this.type === A._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : !r && (n === "using" || n === "await using") && this.options.ecmaVersion >= 17 && this.type !== A._in && !this.isContextual("of") ? this.raise(this.lastTokEnd, "Missing initializer in " + n + " declaration") : !r && i.id.type !== "Identifier" && !(t && (this.type === A._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : i.init = null, e.declarations.push(this.finishNode(i, "VariableDeclarator")), !this.eat(A.comma)) break;
	}
	return e;
}, L.parseVarId = function(e, t) {
	e.id = t === "using" || t === "await using" ? this.parseIdent() : this.parseBindingAtom(), this.checkLValPattern(e.id, t === "var" ? jt : Mt, !1);
};
var Vt = 1, Ht = 2, Ut = 4;
L.parseFunction = function(e, t, n, r, i) {
	this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !r) && (this.type === A.star && t & Ht && this.unexpected(), e.generator = this.eat(A.star)), this.options.ecmaVersion >= 8 && (e.async = !!r), t & Vt && (e.id = t & Ut && this.type !== A.name ? null : this.parseIdent(), e.id && !(t & Ht) && this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? jt : Mt : Nt));
	var a = this.yieldPos, o = this.awaitPos, s = this.awaitIdentPos;
	return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(kt(e.async, e.generator)), t & Vt || (e.id = this.type === A.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, n, !1, i), this.yieldPos = a, this.awaitPos = o, this.awaitIdentPos = s, this.finishNode(e, t & Vt ? "FunctionDeclaration" : "FunctionExpression");
}, L.parseFunctionParams = function(e) {
	this.expect(A.parenL), e.params = this.parseBindingList(A.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
}, L.parseClass = function(e, t) {
	this.next();
	var n = this.strict;
	this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
	var r = this.enterClassBody(), i = this.startNode(), a = !1;
	for (i.body = [], this.expect(A.braceL); this.type !== A.braceR;) {
		var o = this.parseClassElement(e.superClass !== null);
		o && (i.body.push(o), o.type === "MethodDefinition" && o.kind === "constructor" ? (a && this.raiseRecoverable(o.start, "Duplicate constructor in the same class"), a = !0) : o.key && o.key.type === "PrivateIdentifier" && Wt(r, o) && this.raiseRecoverable(o.key.start, "Identifier '#" + o.key.name + "' has already been declared"));
	}
	return this.strict = n, this.next(), e.body = this.finishNode(i, "ClassBody"), this.exitClassBody(), this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression");
}, L.parseClassElement = function(e) {
	if (this.eat(A.semi)) return null;
	var t = this.options.ecmaVersion, n = this.startNode(), r = "", i = !1, a = !1, o = "method", s = !1;
	if (this.eatContextual("static")) {
		if (t >= 13 && this.eat(A.braceL)) return this.parseClassStaticBlock(n), n;
		this.isClassElementNameStart() || this.type === A.star ? s = !0 : r = "static";
	}
	if (n.static = s, !r && t >= 8 && this.eatContextual("async") && ((this.isClassElementNameStart() || this.type === A.star) && !this.canInsertSemicolon() ? a = !0 : r = "async"), !r && (t >= 9 || !a) && this.eat(A.star) && (i = !0), !r && !a && !i) {
		var c = this.value;
		(this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? o = c : r = c);
	}
	if (r ? (n.computed = !1, n.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), n.key.name = r, this.finishNode(n.key, "Identifier")) : this.parseClassElementName(n), t < 13 || this.type === A.parenL || o !== "method" || i || a) {
		var l = !n.static && Gt(n, "constructor"), u = l && e;
		l && o !== "method" && this.raise(n.key.start, "Constructor can't have get/set modifier"), n.kind = l ? "constructor" : o, this.parseClassMethod(n, i, a, u);
	} else this.parseClassField(n);
	return n;
}, L.isClassElementNameStart = function() {
	return this.type === A.name || this.type === A.privateId || this.type === A.num || this.type === A.string || this.type === A.bracketL || this.type.keyword;
}, L.parseClassElementName = function(e) {
	this.type === A.privateId ? (this.value === "constructor" && this.raise(this.start, "Classes can't have an element named '#constructor'"), e.computed = !1, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e);
}, L.parseClassMethod = function(e, t, n, r) {
	var i = e.key;
	e.kind === "constructor" ? (t && this.raise(i.start, "Constructor can't be a generator"), n && this.raise(i.start, "Constructor can't be an async method")) : e.static && Gt(e, "prototype") && this.raise(i.start, "Classes may not have a static property named prototype");
	var a = e.value = this.parseMethod(t, n, r);
	return e.kind === "get" && a.params.length !== 0 && this.raiseRecoverable(a.start, "getter should have no params"), e.kind === "set" && a.params.length !== 1 && this.raiseRecoverable(a.start, "setter should have exactly one param"), e.kind === "set" && a.params[0].type === "RestElement" && this.raiseRecoverable(a.params[0].start, "Setter cannot use rest params"), this.finishNode(e, "MethodDefinition");
}, L.parseClassField = function(e) {
	return Gt(e, "constructor") ? this.raise(e.key.start, "Classes can't have a field named 'constructor'") : e.static && Gt(e, "prototype") && this.raise(e.key.start, "Classes can't have a static field named 'prototype'"), this.eat(A.eq) ? (this.enterScope(Et | Ct), e.value = this.parseMaybeAssign(), this.exitScope()) : e.value = null, this.semicolon(), this.finishNode(e, "PropertyDefinition");
}, L.parseClassStaticBlock = function(e) {
	e.body = [];
	var t = this.labels;
	for (this.labels = [], this.enterScope(Tt | Ct); this.type !== A.braceR;) {
		var n = this.parseStatement(null);
		e.body.push(n);
	}
	return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, "StaticBlock");
}, L.parseClassId = function(e, t) {
	this.type === A.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, Mt, !1)) : (t === !0 && this.unexpected(), e.id = null);
}, L.parseClassSuper = function(e) {
	e.superClass = this.eat(A._extends) ? this.parseExprSubscripts(null, !1) : null;
}, L.enterClassBody = function() {
	var e = {
		declared: Object.create(null),
		used: []
	};
	return this.privateNameStack.push(e), e.declared;
}, L.exitClassBody = function() {
	var e = this.privateNameStack.pop(), t = e.declared, n = e.used;
	if (this.options.checkPrivateFields) for (var r = this.privateNameStack.length, i = r === 0 ? null : this.privateNameStack[r - 1], a = 0; a < n.length; ++a) {
		var o = n[a];
		it(t, o.name) || (i ? i.used.push(o) : this.raiseRecoverable(o.start, "Private field '#" + o.name + "' must be declared in an enclosing class"));
	}
};
function Wt(e, t) {
	var n = t.key.name, r = e[n], i = "true";
	return t.type === "MethodDefinition" && (t.kind === "get" || t.kind === "set") && (i = (t.static ? "s" : "i") + t.kind), r === "iget" && i === "iset" || r === "iset" && i === "iget" || r === "sget" && i === "sset" || r === "sset" && i === "sget" ? (e[n] = "true", !1) : r ? !0 : (e[n] = i, !1);
}
function Gt(e, t) {
	var n = e.computed, r = e.key;
	return !n && (r.type === "Identifier" && r.name === t || r.type === "Literal" && r.value === t);
}
L.parseExportAllDeclaration = function(e, t) {
	return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null), this.expectContextual("from"), this.type !== A.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, "ExportAllDeclaration");
}, L.parseExport = function(e, t) {
	if (this.next(), this.eat(A.star)) return this.parseExportAllDeclaration(e, t);
	if (this.eat(A._default)) return this.checkExport(t, "default", this.lastTokStart), e.declaration = this.parseExportDefaultDeclaration(), this.finishNode(e, "ExportDefaultDeclaration");
	if (this.shouldParseExportStatement()) e.declaration = this.parseExportDeclaration(e), e.declaration.type === "VariableDeclaration" ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start), e.specifiers = [], e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
	else {
		if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual("from")) this.type !== A.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause());
		else {
			for (var n = 0, r = e.specifiers; n < r.length; n += 1) {
				var i = r[n];
				this.checkUnreserved(i.local), this.checkLocalExport(i.local), i.local.type === "Literal" && this.raise(i.local.start, "A string literal cannot be used as an exported binding without `from`.");
			}
			e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
		}
		this.semicolon();
	}
	return this.finishNode(e, "ExportNamedDeclaration");
}, L.parseExportDeclaration = function(e) {
	return this.parseStatement(null);
}, L.parseExportDefaultDeclaration = function() {
	var e;
	if (this.type === A._function || (e = this.isAsyncFunction())) {
		var t = this.startNode();
		return this.next(), e && this.next(), this.parseFunction(t, Vt | Ut, !1, e);
	} else if (this.type === A._class) {
		var n = this.startNode();
		return this.parseClass(n, "nullableID");
	} else {
		var r = this.parseMaybeAssign();
		return this.semicolon(), r;
	}
}, L.checkExport = function(e, t, n) {
	e && (typeof t != "string" && (t = t.type === "Identifier" ? t.name : t.value), it(e, t) && this.raiseRecoverable(n, "Duplicate export '" + t + "'"), e[t] = !0);
}, L.checkPatternExport = function(e, t) {
	var n = t.type;
	if (n === "Identifier") this.checkExport(e, t, t.start);
	else if (n === "ObjectPattern") for (var r = 0, i = t.properties; r < i.length; r += 1) {
		var a = i[r];
		this.checkPatternExport(e, a);
	}
	else if (n === "ArrayPattern") for (var o = 0, s = t.elements; o < s.length; o += 1) {
		var c = s[o];
		c && this.checkPatternExport(e, c);
	}
	else n === "Property" ? this.checkPatternExport(e, t.value) : n === "AssignmentPattern" ? this.checkPatternExport(e, t.left) : n === "RestElement" && this.checkPatternExport(e, t.argument);
}, L.checkVariableExport = function(e, t) {
	if (e) for (var n = 0, r = t; n < r.length; n += 1) {
		var i = r[n];
		this.checkPatternExport(e, i.id);
	}
}, L.shouldParseExportStatement = function() {
	return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
}, L.parseExportSpecifier = function(e) {
	var t = this.startNode();
	return t.local = this.parseModuleExportName(), t.exported = this.eatContextual("as") ? this.parseModuleExportName() : t.local, this.checkExport(e, t.exported, t.exported.start), this.finishNode(t, "ExportSpecifier");
}, L.parseExportSpecifiers = function(e) {
	var t = [], n = !0;
	for (this.expect(A.braceL); !this.eat(A.braceR);) {
		if (n) n = !1;
		else if (this.expect(A.comma), this.afterTrailingComma(A.braceR)) break;
		t.push(this.parseExportSpecifier(e));
	}
	return t;
}, L.parseImport = function(e) {
	return this.next(), this.type === A.string ? (e.specifiers = Bt, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === A.string ? this.parseExprAtom() : this.unexpected()), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, "ImportDeclaration");
}, L.parseImportSpecifier = function() {
	var e = this.startNode();
	return e.imported = this.parseModuleExportName(), this.eatContextual("as") ? e.local = this.parseIdent() : (this.checkUnreserved(e.imported), e.local = e.imported), this.checkLValSimple(e.local, Mt), this.finishNode(e, "ImportSpecifier");
}, L.parseImportDefaultSpecifier = function() {
	var e = this.startNode();
	return e.local = this.parseIdent(), this.checkLValSimple(e.local, Mt), this.finishNode(e, "ImportDefaultSpecifier");
}, L.parseImportNamespaceSpecifier = function() {
	var e = this.startNode();
	return this.next(), this.expectContextual("as"), e.local = this.parseIdent(), this.checkLValSimple(e.local, Mt), this.finishNode(e, "ImportNamespaceSpecifier");
}, L.parseImportSpecifiers = function() {
	var e = [], t = !0;
	if (this.type === A.name && (e.push(this.parseImportDefaultSpecifier()), !this.eat(A.comma))) return e;
	if (this.type === A.star) return e.push(this.parseImportNamespaceSpecifier()), e;
	for (this.expect(A.braceL); !this.eat(A.braceR);) {
		if (t) t = !1;
		else if (this.expect(A.comma), this.afterTrailingComma(A.braceR)) break;
		e.push(this.parseImportSpecifier());
	}
	return e;
}, L.parseWithClause = function() {
	var e = [];
	if (!this.eat(A._with)) return e;
	this.expect(A.braceL);
	for (var t = {}, n = !0; !this.eat(A.braceR);) {
		if (n) n = !1;
		else if (this.expect(A.comma), this.afterTrailingComma(A.braceR)) break;
		var r = this.parseImportAttribute(), i = r.key.type === "Identifier" ? r.key.name : r.key.value;
		it(t, i) && this.raiseRecoverable(r.key.start, "Duplicate attribute key '" + i + "'"), t[i] = !0, e.push(r);
	}
	return e;
}, L.parseImportAttribute = function() {
	var e = this.startNode();
	return e.key = this.type === A.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never"), this.expect(A.colon), this.type !== A.string && this.unexpected(), e.value = this.parseExprAtom(), this.finishNode(e, "ImportAttribute");
}, L.parseModuleExportName = function() {
	if (this.options.ecmaVersion >= 13 && this.type === A.string) {
		var e = this.parseLiteral(this.value);
		return lt.test(e.value) && this.raise(e.start, "An export name cannot include a lone surrogate."), e;
	}
	return this.parseIdent(!0);
}, L.adaptDirectivePrologue = function(e) {
	for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t) e[t].directive = e[t].expression.raw.slice(1, -1);
}, L.isDirectiveCandidate = function(e) {
	return this.options.ecmaVersion >= 5 && e.type === "ExpressionStatement" && e.expression.type === "Literal" && typeof e.expression.value == "string" && (this.input[e.start] === "\"" || this.input[e.start] === "'");
};
var Kt = P.prototype;
Kt.toAssignable = function(e, t, n) {
	if (this.options.ecmaVersion >= 6 && e) switch (e.type) {
		case "Identifier":
			this.inAsync && e.name === "await" && this.raise(e.start, "Cannot use 'await' as identifier inside an async function");
			break;
		case "ObjectPattern":
		case "ArrayPattern":
		case "AssignmentPattern":
		case "RestElement": break;
		case "ObjectExpression":
			e.type = "ObjectPattern", n && this.checkPatternErrors(n, !0);
			for (var r = 0, i = e.properties; r < i.length; r += 1) {
				var a = i[r];
				this.toAssignable(a, t), a.type === "RestElement" && (a.argument.type === "ArrayPattern" || a.argument.type === "ObjectPattern") && this.raise(a.argument.start, "Unexpected token");
			}
			break;
		case "Property":
			e.kind !== "init" && this.raise(e.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(e.value, t);
			break;
		case "ArrayExpression":
			e.type = "ArrayPattern", n && this.checkPatternErrors(n, !0), this.toAssignableList(e.elements, t);
			break;
		case "SpreadElement":
			e.type = "RestElement", this.toAssignable(e.argument, t), e.argument.type === "AssignmentPattern" && this.raise(e.argument.start, "Rest elements cannot have a default value");
			break;
		case "AssignmentExpression":
			e.operator !== "=" && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."), e.type = "AssignmentPattern", delete e.operator, this.toAssignable(e.left, t);
			break;
		case "ParenthesizedExpression":
			this.toAssignable(e.expression, t, n);
			break;
		case "ChainExpression":
			this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
			break;
		case "MemberExpression": if (!t) break;
		default: this.raise(e.start, "Assigning to rvalue");
	}
	else n && this.checkPatternErrors(n, !0);
	return e;
}, Kt.toAssignableList = function(e, t) {
	for (var n = e.length, r = 0; r < n; r++) {
		var i = e[r];
		i && this.toAssignable(i, t);
	}
	if (n) {
		var a = e[n - 1];
		this.options.ecmaVersion === 6 && t && a && a.type === "RestElement" && a.argument.type !== "Identifier" && this.unexpected(a.argument.start);
	}
	return e;
}, Kt.parseSpread = function(e) {
	var t = this.startNode();
	return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, "SpreadElement");
}, Kt.parseRestBinding = function() {
	var e = this.startNode();
	return this.next(), this.options.ecmaVersion === 6 && this.type !== A.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, "RestElement");
}, Kt.parseBindingAtom = function() {
	if (this.options.ecmaVersion >= 6) switch (this.type) {
		case A.bracketL:
			var e = this.startNode();
			return this.next(), e.elements = this.parseBindingList(A.bracketR, !0, !0), this.finishNode(e, "ArrayPattern");
		case A.braceL: return this.parseObj(!0);
	}
	return this.parseIdent();
}, Kt.parseBindingList = function(e, t, n, r) {
	for (var i = [], a = !0; !this.eat(e);) if (a ? a = !1 : this.expect(A.comma), t && this.type === A.comma) i.push(null);
	else if (n && this.afterTrailingComma(e)) break;
	else if (this.type === A.ellipsis) {
		var o = this.parseRestBinding();
		this.parseBindingListItem(o), i.push(o), this.type === A.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.expect(e);
		break;
	} else i.push(this.parseAssignableListItem(r));
	return i;
}, Kt.parseAssignableListItem = function(e) {
	var t = this.parseMaybeDefault(this.start, this.startLoc);
	return this.parseBindingListItem(t), t;
}, Kt.parseBindingListItem = function(e) {
	return e;
}, Kt.parseMaybeDefault = function(e, t, n) {
	if (n ||= this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(A.eq)) return n;
	var r = this.startNodeAt(e, t);
	return r.left = n, r.right = this.parseMaybeAssign(), this.finishNode(r, "AssignmentPattern");
}, Kt.checkLValSimple = function(e, t, n) {
	t === void 0 && (t = At);
	var r = t !== At;
	switch (e.type) {
		case "Identifier":
			this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (r ? "Binding " : "Assigning to ") + e.name + " in strict mode"), r && (t === Mt && e.name === "let" && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"), n && (it(n, e.name) && this.raiseRecoverable(e.start, "Argument name clash"), n[e.name] = !0), t !== Ft && this.declareName(e.name, t, e.start));
			break;
		case "ChainExpression":
			this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
			break;
		case "MemberExpression":
			r && this.raiseRecoverable(e.start, "Binding member expression");
			break;
		case "ParenthesizedExpression": return r && this.raiseRecoverable(e.start, "Binding parenthesized expression"), this.checkLValSimple(e.expression, t, n);
		default: this.raise(e.start, (r ? "Binding" : "Assigning to") + " rvalue");
	}
}, Kt.checkLValPattern = function(e, t, n) {
	switch (t === void 0 && (t = At), e.type) {
		case "ObjectPattern":
			for (var r = 0, i = e.properties; r < i.length; r += 1) {
				var a = i[r];
				this.checkLValInnerPattern(a, t, n);
			}
			break;
		case "ArrayPattern":
			for (var o = 0, s = e.elements; o < s.length; o += 1) {
				var c = s[o];
				c && this.checkLValInnerPattern(c, t, n);
			}
			break;
		default: this.checkLValSimple(e, t, n);
	}
}, Kt.checkLValInnerPattern = function(e, t, n) {
	switch (t === void 0 && (t = At), e.type) {
		case "Property":
			this.checkLValInnerPattern(e.value, t, n);
			break;
		case "AssignmentPattern":
			this.checkLValPattern(e.left, t, n);
			break;
		case "RestElement":
			this.checkLValPattern(e.argument, t, n);
			break;
		default: this.checkLValPattern(e, t, n);
	}
};
var qt = function(e, t, n, r, i) {
	this.token = e, this.isExpr = !!t, this.preserveSpace = !!n, this.override = r, this.generator = !!i;
}, R = {
	b_stat: new qt("{", !1),
	b_expr: new qt("{", !0),
	b_tmpl: new qt("${", !1),
	p_stat: new qt("(", !1),
	p_expr: new qt("(", !0),
	q_tmpl: new qt("`", !0, !0, function(e) {
		return e.tryReadTemplateToken();
	}),
	f_stat: new qt("function", !1),
	f_expr: new qt("function", !0),
	f_expr_gen: new qt("function", !0, !1, null, !0),
	f_gen: new qt("function", !1, !1, null, !0)
}, Jt = P.prototype;
Jt.initialContext = function() {
	return [R.b_stat];
}, Jt.curContext = function() {
	return this.context[this.context.length - 1];
}, Jt.braceIsBlock = function(e) {
	var t = this.curContext();
	return t === R.f_expr || t === R.f_stat ? !0 : e === A.colon && (t === R.b_stat || t === R.b_expr) ? !t.isExpr : e === A._return || e === A.name && this.exprAllowed ? j.test(this.input.slice(this.lastTokEnd, this.start)) : e === A._else || e === A.semi || e === A.eof || e === A.parenR || e === A.arrow ? !0 : e === A.braceL ? t === R.b_stat : e === A._var || e === A._const || e === A.name ? !1 : !this.exprAllowed;
}, Jt.inGeneratorContext = function() {
	for (var e = this.context.length - 1; e >= 1; e--) {
		var t = this.context[e];
		if (t.token === "function") return t.generator;
	}
	return !1;
}, Jt.updateContext = function(e) {
	var t, n = this.type;
	n.keyword && e === A.dot ? this.exprAllowed = !1 : (t = n.updateContext) ? t.call(this, e) : this.exprAllowed = n.beforeExpr;
}, Jt.overrideContext = function(e) {
	this.curContext() !== e && (this.context[this.context.length - 1] = e);
}, A.parenR.updateContext = A.braceR.updateContext = function() {
	if (this.context.length === 1) {
		this.exprAllowed = !0;
		return;
	}
	var e = this.context.pop();
	e === R.b_stat && this.curContext().token === "function" && (e = this.context.pop()), this.exprAllowed = !e.isExpr;
}, A.braceL.updateContext = function(e) {
	this.context.push(this.braceIsBlock(e) ? R.b_stat : R.b_expr), this.exprAllowed = !0;
}, A.dollarBraceL.updateContext = function() {
	this.context.push(R.b_tmpl), this.exprAllowed = !0;
}, A.parenL.updateContext = function(e) {
	var t = e === A._if || e === A._for || e === A._with || e === A._while;
	this.context.push(t ? R.p_stat : R.p_expr), this.exprAllowed = !0;
}, A.incDec.updateContext = function() {}, A._function.updateContext = A._class.updateContext = function(e) {
	e.beforeExpr && e !== A._else && !(e === A.semi && this.curContext() !== R.p_stat) && !(e === A._return && j.test(this.input.slice(this.lastTokEnd, this.start))) && !((e === A.colon || e === A.braceL) && this.curContext() === R.b_stat) ? this.context.push(R.f_expr) : this.context.push(R.f_stat), this.exprAllowed = !1;
}, A.colon.updateContext = function() {
	this.curContext().token === "function" && this.context.pop(), this.exprAllowed = !0;
}, A.backQuote.updateContext = function() {
	this.curContext() === R.q_tmpl ? this.context.pop() : this.context.push(R.q_tmpl), this.exprAllowed = !1;
}, A.star.updateContext = function(e) {
	if (e === A._function) {
		var t = this.context.length - 1;
		this.context[t] === R.f_expr ? this.context[t] = R.f_expr_gen : this.context[t] = R.f_gen;
	}
	this.exprAllowed = !0;
}, A.name.updateContext = function(e) {
	var t = !1;
	this.options.ecmaVersion >= 6 && e !== A.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (t = !0), this.exprAllowed = t;
};
var z = P.prototype;
z.checkPropClash = function(e, t, n) {
	if (!(this.options.ecmaVersion >= 9 && e.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {
		var r = e.key, i;
		switch (r.type) {
			case "Identifier":
				i = r.name;
				break;
			case "Literal":
				i = String(r.value);
				break;
			default: return;
		}
		var a = e.kind;
		if (this.options.ecmaVersion >= 6) {
			i === "__proto__" && a === "init" && (t.proto && (n ? n.doubleProto < 0 && (n.doubleProto = r.start) : this.raiseRecoverable(r.start, "Redefinition of __proto__ property")), t.proto = !0);
			return;
		}
		i = "$" + i;
		var o = t[i];
		o ? (a === "init" ? this.strict && o.init || o.get || o.set : o.init || o[a]) && this.raiseRecoverable(r.start, "Redefinition of property") : o = t[i] = {
			init: !1,
			get: !1,
			set: !1
		}, o[a] = !0;
	}
}, z.parseExpression = function(e, t) {
	var n = this.start, r = this.startLoc, i = this.parseMaybeAssign(e, t);
	if (this.type === A.comma) {
		var a = this.startNodeAt(n, r);
		for (a.expressions = [i]; this.eat(A.comma);) a.expressions.push(this.parseMaybeAssign(e, t));
		return this.finishNode(a, "SequenceExpression");
	}
	return i;
}, z.parseMaybeAssign = function(e, t, n) {
	if (this.isContextual("yield")) {
		if (this.inGenerator) return this.parseYield(e);
		this.exprAllowed = !1;
	}
	var r = !1, i = -1, a = -1, o = -1;
	t ? (i = t.parenthesizedAssign, a = t.trailingComma, o = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new Lt(), r = !0);
	var s = this.start, c = this.startLoc;
	(this.type === A.parenL || this.type === A.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = e === "await");
	var l = this.parseMaybeConditional(e, t);
	if (n && (l = n.call(this, l, s, c)), this.type.isAssign) {
		var u = this.startNodeAt(s, c);
		return u.operator = this.value, this.type === A.eq && (l = this.toAssignable(l, !1, t)), r || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= l.start && (t.shorthandAssign = -1), this.type === A.eq ? this.checkLValPattern(l) : this.checkLValSimple(l), u.left = l, this.next(), u.right = this.parseMaybeAssign(e), o > -1 && (t.doubleProto = o), this.finishNode(u, "AssignmentExpression");
	} else r && this.checkExpressionErrors(t, !0);
	return i > -1 && (t.parenthesizedAssign = i), a > -1 && (t.trailingComma = a), l;
}, z.parseMaybeConditional = function(e, t) {
	var n = this.start, r = this.startLoc, i = this.parseExprOps(e, t);
	if (this.checkExpressionErrors(t)) return i;
	if (this.eat(A.question)) {
		var a = this.startNodeAt(n, r);
		return a.test = i, a.consequent = this.parseMaybeAssign(), this.expect(A.colon), a.alternate = this.parseMaybeAssign(e), this.finishNode(a, "ConditionalExpression");
	}
	return i;
}, z.parseExprOps = function(e, t) {
	var n = this.start, r = this.startLoc, i = this.parseMaybeUnary(t, !1, !1, e);
	return this.checkExpressionErrors(t) || i.start === n && i.type === "ArrowFunctionExpression" ? i : this.parseExprOp(i, n, r, -1, e);
}, z.parseExprOp = function(e, t, n, r, i) {
	var a = this.type.binop;
	if (a != null && (!i || this.type !== A._in) && a > r) {
		var o = this.type === A.logicalOR || this.type === A.logicalAND, s = this.type === A.coalesce;
		s && (a = A.logicalAND.binop);
		var c = this.value;
		this.next();
		var l = this.start, u = this.startLoc, d = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, i), l, u, a, i), f = this.buildBinary(t, n, e, d, c, o || s);
		return (o && this.type === A.coalesce || s && (this.type === A.logicalOR || this.type === A.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(f, t, n, r, i);
	}
	return e;
}, z.buildBinary = function(e, t, n, r, i, a) {
	r.type === "PrivateIdentifier" && this.raise(r.start, "Private identifier can only be left side of binary expression");
	var o = this.startNodeAt(e, t);
	return o.left = n, o.operator = i, o.right = r, this.finishNode(o, a ? "LogicalExpression" : "BinaryExpression");
}, z.parseMaybeUnary = function(e, t, n, r) {
	var i = this.start, a = this.startLoc, o;
	if (this.isContextual("await") && this.canAwait) o = this.parseAwait(r), t = !0;
	else if (this.type.prefix) {
		var s = this.startNode(), c = this.type === A.incDec;
		s.operator = this.value, s.prefix = !0, this.next(), s.argument = this.parseMaybeUnary(null, !0, c, r), this.checkExpressionErrors(e, !0), c ? this.checkLValSimple(s.argument) : this.strict && s.operator === "delete" && Yt(s.argument) ? this.raiseRecoverable(s.start, "Deleting local variable in strict mode") : s.operator === "delete" && Xt(s.argument) ? this.raiseRecoverable(s.start, "Private fields can not be deleted") : t = !0, o = this.finishNode(s, c ? "UpdateExpression" : "UnaryExpression");
	} else if (!t && this.type === A.privateId) (r || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(), o = this.parsePrivateIdent(), this.type !== A._in && this.unexpected();
	else {
		if (o = this.parseExprSubscripts(e, r), this.checkExpressionErrors(e)) return o;
		for (; this.type.postfix && !this.canInsertSemicolon();) {
			var l = this.startNodeAt(i, a);
			l.operator = this.value, l.prefix = !1, l.argument = o, this.checkLValSimple(o), this.next(), o = this.finishNode(l, "UpdateExpression");
		}
	}
	if (!n && this.eat(A.starstar)) if (t) this.unexpected(this.lastTokStart);
	else return this.buildBinary(i, a, o, this.parseMaybeUnary(null, !1, !1, r), "**", !1);
	else return o;
};
function Yt(e) {
	return e.type === "Identifier" || e.type === "ParenthesizedExpression" && Yt(e.expression);
}
function Xt(e) {
	return e.type === "MemberExpression" && e.property.type === "PrivateIdentifier" || e.type === "ChainExpression" && Xt(e.expression) || e.type === "ParenthesizedExpression" && Xt(e.expression);
}
z.parseExprSubscripts = function(e, t) {
	var n = this.start, r = this.startLoc, i = this.parseExprAtom(e, t);
	if (i.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") return i;
	var a = this.parseSubscripts(i, n, r, !1, t);
	return e && a.type === "MemberExpression" && (e.parenthesizedAssign >= a.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= a.start && (e.parenthesizedBind = -1), e.trailingComma >= a.start && (e.trailingComma = -1)), a;
}, z.parseSubscripts = function(e, t, n, r, i) {
	for (var a = this.options.ecmaVersion >= 8 && e.type === "Identifier" && e.name === "async" && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start === 5 && this.potentialArrowAt === e.start, o = !1;;) {
		var s = this.parseSubscript(e, t, n, r, a, o, i);
		if (s.optional && (o = !0), s === e || s.type === "ArrowFunctionExpression") {
			if (o) {
				var c = this.startNodeAt(t, n);
				c.expression = s, s = this.finishNode(c, "ChainExpression");
			}
			return s;
		}
		e = s;
	}
}, z.shouldParseAsyncArrow = function() {
	return !this.canInsertSemicolon() && this.eat(A.arrow);
}, z.parseSubscriptAsyncArrow = function(e, t, n, r) {
	return this.parseArrowExpression(this.startNodeAt(e, t), n, !0, r);
}, z.parseSubscript = function(e, t, n, r, i, a, o) {
	var s = this.options.ecmaVersion >= 11, c = s && this.eat(A.questionDot);
	r && c && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
	var l = this.eat(A.bracketL);
	if (l || c && this.type !== A.parenL && this.type !== A.backQuote || this.eat(A.dot)) {
		var u = this.startNodeAt(t, n);
		u.object = e, l ? (u.property = this.parseExpression(), this.expect(A.bracketR)) : this.type === A.privateId && e.type !== "Super" ? u.property = this.parsePrivateIdent() : u.property = this.parseIdent(this.options.allowReserved !== "never"), u.computed = !!l, s && (u.optional = c), e = this.finishNode(u, "MemberExpression");
	} else if (!r && this.eat(A.parenL)) {
		var d = new Lt(), f = this.yieldPos, p = this.awaitPos, m = this.awaitIdentPos;
		this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
		var h = this.parseExprList(A.parenR, this.options.ecmaVersion >= 8, !1, d);
		if (i && !c && this.shouldParseAsyncArrow()) return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = f, this.awaitPos = p, this.awaitIdentPos = m, this.parseSubscriptAsyncArrow(t, n, h, o);
		this.checkExpressionErrors(d, !0), this.yieldPos = f || this.yieldPos, this.awaitPos = p || this.awaitPos, this.awaitIdentPos = m || this.awaitIdentPos;
		var g = this.startNodeAt(t, n);
		g.callee = e, g.arguments = h, s && (g.optional = c), e = this.finishNode(g, "CallExpression");
	} else if (this.type === A.backQuote) {
		(c || a) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
		var _ = this.startNodeAt(t, n);
		_.tag = e, _.quasi = this.parseTemplate({ isTagged: !0 }), e = this.finishNode(_, "TaggedTemplateExpression");
	}
	return e;
}, z.parseExprAtom = function(e, t, n) {
	this.type === A.slash && this.readRegexp();
	var r, i = this.potentialArrowAt === this.start;
	switch (this.type) {
		case A._super: return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), r = this.startNode(), this.next(), this.type === A.parenL && !this.allowDirectSuper && this.raise(r.start, "super() call outside constructor of a subclass"), this.type !== A.dot && this.type !== A.bracketL && this.type !== A.parenL && this.unexpected(), this.finishNode(r, "Super");
		case A._this: return r = this.startNode(), this.next(), this.finishNode(r, "ThisExpression");
		case A.name:
			var a = this.start, o = this.startLoc, s = this.containsEsc, c = this.parseIdent(!1);
			if (this.options.ecmaVersion >= 8 && !s && c.name === "async" && !this.canInsertSemicolon() && this.eat(A._function)) return this.overrideContext(R.f_expr), this.parseFunction(this.startNodeAt(a, o), 0, !1, !0, t);
			if (i && !this.canInsertSemicolon()) {
				if (this.eat(A.arrow)) return this.parseArrowExpression(this.startNodeAt(a, o), [c], !1, t);
				if (this.options.ecmaVersion >= 8 && c.name === "async" && this.type === A.name && !s && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) return c = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(A.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(a, o), [c], !0, t);
			}
			return c;
		case A.regexp:
			var l = this.value;
			return r = this.parseLiteral(l.value), r.regex = {
				pattern: l.pattern,
				flags: l.flags
			}, r;
		case A.num:
		case A.string: return this.parseLiteral(this.value);
		case A._null:
		case A._true:
		case A._false: return r = this.startNode(), r.value = this.type === A._null ? null : this.type === A._true, r.raw = this.type.keyword, this.next(), this.finishNode(r, "Literal");
		case A.parenL:
			var u = this.start, d = this.parseParenAndDistinguishExpression(i, t);
			return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(d) && (e.parenthesizedAssign = u), e.parenthesizedBind < 0 && (e.parenthesizedBind = u)), d;
		case A.bracketL: return r = this.startNode(), this.next(), r.elements = this.parseExprList(A.bracketR, !0, !0, e), this.finishNode(r, "ArrayExpression");
		case A.braceL: return this.overrideContext(R.b_expr), this.parseObj(!1, e);
		case A._function: return r = this.startNode(), this.next(), this.parseFunction(r, 0);
		case A._class: return this.parseClass(this.startNode(), !1);
		case A._new: return this.parseNew();
		case A.backQuote: return this.parseTemplate();
		case A._import: return this.options.ecmaVersion >= 11 ? this.parseExprImport(n) : this.unexpected();
		default: return this.parseExprAtomDefault();
	}
}, z.parseExprAtomDefault = function() {
	this.unexpected();
}, z.parseExprImport = function(e) {
	var t = this.startNode();
	if (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import"), this.next(), this.type === A.parenL && !e) return this.parseDynamicImport(t);
	if (this.type === A.dot) {
		var n = this.startNodeAt(t.start, t.loc && t.loc.start);
		return n.name = "import", t.meta = this.finishNode(n, "Identifier"), this.parseImportMeta(t);
	} else this.unexpected();
}, z.parseDynamicImport = function(e) {
	if (this.next(), e.source = this.parseMaybeAssign(), this.options.ecmaVersion >= 16) this.eat(A.parenR) ? e.options = null : (this.expect(A.comma), this.afterTrailingComma(A.parenR) ? e.options = null : (e.options = this.parseMaybeAssign(), this.eat(A.parenR) || (this.expect(A.comma), this.afterTrailingComma(A.parenR) || this.unexpected())));
	else if (!this.eat(A.parenR)) {
		var t = this.start;
		this.eat(A.comma) && this.eat(A.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t);
	}
	return this.finishNode(e, "ImportExpression");
}, z.parseImportMeta = function(e) {
	this.next();
	var t = this.containsEsc;
	return e.property = this.parseIdent(!0), e.property.name !== "meta" && this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"), t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere && this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"), this.finishNode(e, "MetaProperty");
}, z.parseLiteral = function(e) {
	var t = this.startNode();
	return t.value = e, t.raw = this.input.slice(this.start, this.end), t.raw.charCodeAt(t.raw.length - 1) === 110 && (t.bigint = t.value == null ? t.raw.slice(0, -1).replace(/_/g, "") : t.value.toString()), this.next(), this.finishNode(t, "Literal");
}, z.parseParenExpression = function() {
	this.expect(A.parenL);
	var e = this.parseExpression();
	return this.expect(A.parenR), e;
}, z.shouldParseArrow = function(e) {
	return !this.canInsertSemicolon();
}, z.parseParenAndDistinguishExpression = function(e, t) {
	var n = this.start, r = this.startLoc, i, a = this.options.ecmaVersion >= 8;
	if (this.options.ecmaVersion >= 6) {
		this.next();
		var o = this.start, s = this.startLoc, c = [], l = !0, u = !1, d = new Lt(), f = this.yieldPos, p = this.awaitPos, m;
		for (this.yieldPos = 0, this.awaitPos = 0; this.type !== A.parenR;) if (l ? l = !1 : this.expect(A.comma), a && this.afterTrailingComma(A.parenR, !0)) {
			u = !0;
			break;
		} else if (this.type === A.ellipsis) {
			m = this.start, c.push(this.parseParenItem(this.parseRestBinding())), this.type === A.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
			break;
		} else c.push(this.parseMaybeAssign(!1, d, this.parseParenItem));
		var h = this.lastTokEnd, g = this.lastTokEndLoc;
		if (this.expect(A.parenR), e && this.shouldParseArrow(c) && this.eat(A.arrow)) return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = f, this.awaitPos = p, this.parseParenArrowList(n, r, c, t);
		(!c.length || u) && this.unexpected(this.lastTokStart), m && this.unexpected(m), this.checkExpressionErrors(d, !0), this.yieldPos = f || this.yieldPos, this.awaitPos = p || this.awaitPos, c.length > 1 ? (i = this.startNodeAt(o, s), i.expressions = c, this.finishNodeAt(i, "SequenceExpression", h, g)) : i = c[0];
	} else i = this.parseParenExpression();
	if (this.options.preserveParens) {
		var _ = this.startNodeAt(n, r);
		return _.expression = i, this.finishNode(_, "ParenthesizedExpression");
	} else return i;
}, z.parseParenItem = function(e) {
	return e;
}, z.parseParenArrowList = function(e, t, n, r) {
	return this.parseArrowExpression(this.startNodeAt(e, t), n, !1, r);
};
var Zt = [];
z.parseNew = function() {
	this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
	var e = this.startNode();
	if (this.next(), this.options.ecmaVersion >= 6 && this.type === A.dot) {
		var t = this.startNodeAt(e.start, e.loc && e.loc.start);
		t.name = "new", e.meta = this.finishNode(t, "Identifier"), this.next();
		var n = this.containsEsc;
		return e.property = this.parseIdent(!0), e.property.name !== "target" && this.raiseRecoverable(e.property.start, "The only valid meta property for new is 'new.target'"), n && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(e.start, "'new.target' can only be used in functions and class static block"), this.finishNode(e, "MetaProperty");
	}
	var r = this.start, i = this.startLoc;
	return e.callee = this.parseSubscripts(this.parseExprAtom(null, !1, !0), r, i, !0, !1), this.eat(A.parenL) ? e.arguments = this.parseExprList(A.parenR, this.options.ecmaVersion >= 8, !1) : e.arguments = Zt, this.finishNode(e, "NewExpression");
}, z.parseTemplateElement = function(e) {
	var t = e.isTagged, n = this.startNode();
	return this.type === A.invalidTemplate ? (t || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), n.value = {
		raw: this.value.replace(/\r\n?/g, "\n"),
		cooked: null
	}) : n.value = {
		raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
		cooked: this.value
	}, this.next(), n.tail = this.type === A.backQuote, this.finishNode(n, "TemplateElement");
}, z.parseTemplate = function(e) {
	e === void 0 && (e = {});
	var t = e.isTagged;
	t === void 0 && (t = !1);
	var n = this.startNode();
	this.next(), n.expressions = [];
	var r = this.parseTemplateElement({ isTagged: t });
	for (n.quasis = [r]; !r.tail;) this.type === A.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(A.dollarBraceL), n.expressions.push(this.parseExpression()), this.expect(A.braceR), n.quasis.push(r = this.parseTemplateElement({ isTagged: t }));
	return this.next(), this.finishNode(n, "TemplateLiteral");
}, z.isAsyncProp = function(e) {
	return !e.computed && e.key.type === "Identifier" && e.key.name === "async" && (this.type === A.name || this.type === A.num || this.type === A.string || this.type === A.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === A.star) && !j.test(this.input.slice(this.lastTokEnd, this.start));
}, z.parseObj = function(e, t) {
	var n = this.startNode(), r = !0, i = {};
	for (n.properties = [], this.next(); !this.eat(A.braceR);) {
		if (r) r = !1;
		else if (this.expect(A.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(A.braceR)) break;
		var a = this.parseProperty(e, t);
		e || this.checkPropClash(a, i, t), n.properties.push(a);
	}
	return this.finishNode(n, e ? "ObjectPattern" : "ObjectExpression");
}, z.parseProperty = function(e, t) {
	var n = this.startNode(), r, i, a, o;
	if (this.options.ecmaVersion >= 9 && this.eat(A.ellipsis)) return e ? (n.argument = this.parseIdent(!1), this.type === A.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.finishNode(n, "RestElement")) : (n.argument = this.parseMaybeAssign(!1, t), this.type === A.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(n, "SpreadElement"));
	this.options.ecmaVersion >= 6 && (n.method = !1, n.shorthand = !1, (e || t) && (a = this.start, o = this.startLoc), e || (r = this.eat(A.star)));
	var s = this.containsEsc;
	return this.parsePropertyName(n), !e && !s && this.options.ecmaVersion >= 8 && !r && this.isAsyncProp(n) ? (i = !0, r = this.options.ecmaVersion >= 9 && this.eat(A.star), this.parsePropertyName(n)) : i = !1, this.parsePropertyValue(n, e, r, i, a, o, t, s), this.finishNode(n, "Property");
}, z.parseGetterSetter = function(e) {
	var t = e.key.name;
	this.parsePropertyName(e), e.value = this.parseMethod(!1), e.kind = t;
	var n = e.kind === "get" ? 0 : 1;
	if (e.value.params.length !== n) {
		var r = e.value.start;
		e.kind === "get" ? this.raiseRecoverable(r, "getter should have no params") : this.raiseRecoverable(r, "setter should have exactly one param");
	} else e.kind === "set" && e.value.params[0].type === "RestElement" && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params");
}, z.parsePropertyValue = function(e, t, n, r, i, a, o, s) {
	(n || r) && this.type === A.colon && this.unexpected(), this.eat(A.colon) ? (e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, o), e.kind = "init") : this.options.ecmaVersion >= 6 && this.type === A.parenL ? (t && this.unexpected(), e.method = !0, e.value = this.parseMethod(n, r), e.kind = "init") : !t && !s && this.options.ecmaVersion >= 5 && !e.computed && e.key.type === "Identifier" && (e.key.name === "get" || e.key.name === "set") && this.type !== A.comma && this.type !== A.braceR && this.type !== A.eq ? ((n || r) && this.unexpected(), this.parseGetterSetter(e)) : this.options.ecmaVersion >= 6 && !e.computed && e.key.type === "Identifier" ? ((n || r) && this.unexpected(), this.checkUnreserved(e.key), e.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = i), t ? e.value = this.parseMaybeDefault(i, a, this.copyNode(e.key)) : this.type === A.eq && o ? (o.shorthandAssign < 0 && (o.shorthandAssign = this.start), e.value = this.parseMaybeDefault(i, a, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.kind = "init", e.shorthand = !0) : this.unexpected();
}, z.parsePropertyName = function(e) {
	if (this.options.ecmaVersion >= 6) {
		if (this.eat(A.bracketL)) return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(A.bracketR), e.key;
		e.computed = !1;
	}
	return e.key = this.type === A.num || this.type === A.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
}, z.initFunction = function(e) {
	e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1), this.options.ecmaVersion >= 8 && (e.async = !1);
}, z.parseMethod = function(e, t, n) {
	var r = this.startNode(), i = this.yieldPos, a = this.awaitPos, o = this.awaitIdentPos;
	return this.initFunction(r), this.options.ecmaVersion >= 6 && (r.generator = e), this.options.ecmaVersion >= 8 && (r.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(kt(t, r.generator) | Ct | (n ? wt : 0)), this.expect(A.parenL), r.params = this.parseBindingList(A.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(r, !1, !0, !1), this.yieldPos = i, this.awaitPos = a, this.awaitIdentPos = o, this.finishNode(r, "FunctionExpression");
}, z.parseArrowExpression = function(e, t, n, r) {
	var i = this.yieldPos, a = this.awaitPos, o = this.awaitIdentPos;
	return this.enterScope(kt(n, !1) | xt), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!n), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(e, !0, !1, r), this.yieldPos = i, this.awaitPos = a, this.awaitIdentPos = o, this.finishNode(e, "ArrowFunctionExpression");
}, z.parseFunctionBody = function(e, t, n, r) {
	var i = t && this.type !== A.braceL, a = this.strict, o = !1;
	if (i) e.body = this.parseMaybeAssign(r), e.expression = !0, this.checkParams(e, !1);
	else {
		var s = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
		(!a || s) && (o = this.strictDirective(this.end), o && s && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
		var c = this.labels;
		this.labels = [], o && (this.strict = !0), this.checkParams(e, !a && !o && !t && !n && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, Ft), e.body = this.parseBlock(!1, void 0, o && !a), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.labels = c;
	}
	this.exitScope();
}, z.isSimpleParamList = function(e) {
	for (var t = 0, n = e; t < n.length; t += 1) if (n[t].type !== "Identifier") return !1;
	return !0;
}, z.checkParams = function(e, t) {
	for (var n = Object.create(null), r = 0, i = e.params; r < i.length; r += 1) {
		var a = i[r];
		this.checkLValInnerPattern(a, jt, t ? null : n);
	}
}, z.parseExprList = function(e, t, n, r) {
	for (var i = [], a = !0; !this.eat(e);) {
		if (a) a = !1;
		else if (this.expect(A.comma), t && this.afterTrailingComma(e)) break;
		var o = void 0;
		n && this.type === A.comma ? o = null : this.type === A.ellipsis ? (o = this.parseSpread(r), r && this.type === A.comma && r.trailingComma < 0 && (r.trailingComma = this.start)) : o = this.parseMaybeAssign(!1, r), i.push(o);
	}
	return i;
}, z.checkUnreserved = function(e) {
	var t = e.start, n = e.end, r = e.name;
	this.inGenerator && r === "yield" && this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && r === "await" && this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"), !(this.currentThisScope().flags & Ot) && r === "arguments" && this.raiseRecoverable(t, "Cannot use 'arguments' in class field initializer"), this.inClassStaticBlock && (r === "arguments" || r === "await") && this.raise(t, "Cannot use " + r + " in class static initialization block"), this.keywords.test(r) && this.raise(t, "Unexpected keyword '" + r + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(t, n).indexOf("\\") !== -1) && (this.strict ? this.reservedWordsStrict : this.reservedWords).test(r) && (!this.inAsync && r === "await" && this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(t, "The keyword '" + r + "' is reserved"));
}, z.parseIdent = function(e) {
	var t = this.parseIdentNode();
	return this.next(!!e), this.finishNode(t, "Identifier"), e || (this.checkUnreserved(t), t.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = t.start)), t;
}, z.parseIdentNode = function() {
	var e = this.startNode();
	return this.type === A.name ? e.name = this.value : this.type.keyword ? (e.name = this.type.keyword, (e.name === "class" || e.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop(), this.type = A.name) : this.unexpected(), e;
}, z.parsePrivateIdent = function() {
	var e = this.startNode();
	return this.type === A.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, "PrivateIdentifier"), this.options.checkPrivateFields && (this.privateNameStack.length === 0 ? this.raise(e.start, "Private field '#" + e.name + "' must be declared in an enclosing class") : this.privateNameStack[this.privateNameStack.length - 1].used.push(e)), e;
}, z.parseYield = function(e) {
	this.yieldPos ||= this.start;
	var t = this.startNode();
	return this.next(), this.type === A.semi || this.canInsertSemicolon() || this.type !== A.star && !this.type.startsExpr ? (t.delegate = !1, t.argument = null) : (t.delegate = this.eat(A.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, "YieldExpression");
}, z.parseAwait = function(e) {
	this.awaitPos ||= this.start;
	var t = this.startNode();
	return this.next(), t.argument = this.parseMaybeUnary(null, !0, !1, e), this.finishNode(t, "AwaitExpression");
};
var Qt = P.prototype;
Qt.raise = function(e, t) {
	var n = ft(this.input, e);
	t += " (" + n.line + ":" + n.column + ")", this.sourceFile && (t += " in " + this.sourceFile);
	var r = SyntaxError(t);
	throw r.pos = e, r.loc = n, r.raisedAt = this.pos, r;
}, Qt.raiseRecoverable = Qt.raise, Qt.curPosition = function() {
	if (this.options.locations) return new ut(this.curLine, this.pos - this.lineStart);
};
var $t = P.prototype, en = function(e) {
	this.flags = e, this.var = [], this.lexical = [], this.functions = [];
};
$t.enterScope = function(e) {
	this.scopeStack.push(new en(e));
}, $t.exitScope = function() {
	this.scopeStack.pop();
}, $t.treatFunctionsAsVarInScope = function(e) {
	return e.flags & vt || !this.inModule && e.flags & _t;
}, $t.declareName = function(e, t, n) {
	var r = !1;
	if (t === Mt) {
		var i = this.currentScope();
		r = i.lexical.indexOf(e) > -1 || i.functions.indexOf(e) > -1 || i.var.indexOf(e) > -1, i.lexical.push(e), this.inModule && i.flags & _t && delete this.undefinedExports[e];
	} else if (t === Pt) this.currentScope().lexical.push(e);
	else if (t === Nt) {
		var a = this.currentScope();
		r = this.treatFunctionsAsVar ? a.lexical.indexOf(e) > -1 : a.lexical.indexOf(e) > -1 || a.var.indexOf(e) > -1, a.functions.push(e);
	} else for (var o = this.scopeStack.length - 1; o >= 0; --o) {
		var s = this.scopeStack[o];
		if (s.lexical.indexOf(e) > -1 && !(s.flags & St && s.lexical[0] === e) || !this.treatFunctionsAsVarInScope(s) && s.functions.indexOf(e) > -1) {
			r = !0;
			break;
		}
		if (s.var.push(e), this.inModule && s.flags & _t && delete this.undefinedExports[e], s.flags & Ot) break;
	}
	r && this.raiseRecoverable(n, "Identifier '" + e + "' has already been declared");
}, $t.checkLocalExport = function(e) {
	this.scopeStack[0].lexical.indexOf(e.name) === -1 && this.scopeStack[0].var.indexOf(e.name) === -1 && (this.undefinedExports[e.name] = e);
}, $t.currentScope = function() {
	return this.scopeStack[this.scopeStack.length - 1];
}, $t.currentVarScope = function() {
	for (var e = this.scopeStack.length - 1;; e--) {
		var t = this.scopeStack[e];
		if (t.flags & (Ot | Et | Tt)) return t;
	}
}, $t.currentThisScope = function() {
	for (var e = this.scopeStack.length - 1;; e--) {
		var t = this.scopeStack[e];
		if (t.flags & (Ot | Et | Tt) && !(t.flags & xt)) return t;
	}
};
var tn = function(e, t, n) {
	this.type = "", this.start = t, this.end = 0, e.options.locations && (this.loc = new dt(e, n)), e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile), e.options.ranges && (this.range = [t, 0]);
}, nn = P.prototype;
nn.startNode = function() {
	return new tn(this, this.start, this.startLoc);
}, nn.startNodeAt = function(e, t) {
	return new tn(this, e, t);
};
function rn(e, t, n, r) {
	return e.type = t, e.end = n, this.options.locations && (e.loc.end = r), this.options.ranges && (e.range[1] = n), e;
}
nn.finishNode = function(e, t) {
	return rn.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
}, nn.finishNodeAt = function(e, t, n, r) {
	return rn.call(this, e, t, n, r);
}, nn.copyNode = function(e) {
	var t = new tn(this, e.start, this.startLoc);
	for (var n in e) t[n] = e[n];
	return t;
};
var an = "Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz", on = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS", sn = on + " Extended_Pictographic", cn = sn, ln = cn + " EBase EComp EMod EPres ExtPict", un = ln, dn = {
	9: on,
	10: sn,
	11: cn,
	12: ln,
	13: un,
	14: un
}, fn = {
	9: "",
	10: "",
	11: "",
	12: "",
	13: "",
	14: "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji"
}, pn = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu", mn = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb", hn = mn + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd", gn = hn + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho", _n = gn + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi", vn = _n + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith", yn = {
	9: mn,
	10: hn,
	11: gn,
	12: _n,
	13: vn,
	14: vn + " " + an
}, bn = {};
function xn(e) {
	var t = bn[e] = {
		binary: st(dn[e] + " " + pn),
		binaryOfStrings: st(fn[e]),
		nonBinary: {
			General_Category: st(pn),
			Script: st(yn[e])
		}
	};
	t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc = t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;
}
for (var Sn = 0, Cn = [
	9,
	10,
	11,
	12,
	13,
	14
]; Sn < Cn.length; Sn += 1) {
	var wn = Cn[Sn];
	xn(wn);
}
var B = P.prototype, Tn = function(e, t) {
	this.parent = e, this.base = t || this;
};
Tn.prototype.separatedFrom = function(e) {
	for (var t = this; t; t = t.parent) for (var n = e; n; n = n.parent) if (t.base === n.base && t !== n) return !0;
	return !1;
}, Tn.prototype.sibling = function() {
	return new Tn(this.parent, this.base);
};
var En = function(e) {
	this.parser = e, this.validFlags = "gim" + (e.options.ecmaVersion >= 6 ? "uy" : "") + (e.options.ecmaVersion >= 9 ? "s" : "") + (e.options.ecmaVersion >= 13 ? "d" : "") + (e.options.ecmaVersion >= 15 ? "v" : ""), this.unicodeProperties = bn[e.options.ecmaVersion >= 14 ? 14 : e.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchV = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = Object.create(null), this.backReferenceNames = [], this.branchID = null;
};
En.prototype.reset = function(e, t, n) {
	var r = n.indexOf("v") !== -1, i = n.indexOf("u") !== -1;
	this.start = e | 0, this.source = t + "", this.flags = n, r && this.parser.options.ecmaVersion >= 15 ? (this.switchU = !0, this.switchV = !0, this.switchN = !0) : (this.switchU = i && this.parser.options.ecmaVersion >= 6, this.switchV = !1, this.switchN = i && this.parser.options.ecmaVersion >= 9);
}, En.prototype.raise = function(e) {
	this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + e);
}, En.prototype.at = function(e, t) {
	t === void 0 && (t = !1);
	var n = this.source, r = n.length;
	if (e >= r) return -1;
	var i = n.charCodeAt(e);
	if (!(t || this.switchU) || i <= 55295 || i >= 57344 || e + 1 >= r) return i;
	var a = n.charCodeAt(e + 1);
	return a >= 56320 && a <= 57343 ? (i << 10) + a - 56613888 : i;
}, En.prototype.nextIndex = function(e, t) {
	t === void 0 && (t = !1);
	var n = this.source, r = n.length;
	if (e >= r) return r;
	var i = n.charCodeAt(e), a;
	return !(t || this.switchU) || i <= 55295 || i >= 57344 || e + 1 >= r || (a = n.charCodeAt(e + 1)) < 56320 || a > 57343 ? e + 1 : e + 2;
}, En.prototype.current = function(e) {
	return e === void 0 && (e = !1), this.at(this.pos, e);
}, En.prototype.lookahead = function(e) {
	return e === void 0 && (e = !1), this.at(this.nextIndex(this.pos, e), e);
}, En.prototype.advance = function(e) {
	e === void 0 && (e = !1), this.pos = this.nextIndex(this.pos, e);
}, En.prototype.eat = function(e, t) {
	return t === void 0 && (t = !1), this.current(t) === e ? (this.advance(t), !0) : !1;
}, En.prototype.eatChars = function(e, t) {
	t === void 0 && (t = !1);
	for (var n = this.pos, r = 0, i = e; r < i.length; r += 1) {
		var a = i[r], o = this.at(n, t);
		if (o === -1 || o !== a) return !1;
		n = this.nextIndex(n, t);
	}
	return this.pos = n, !0;
}, B.validateRegExpFlags = function(e) {
	for (var t = e.validFlags, n = e.flags, r = !1, i = !1, a = 0; a < n.length; a++) {
		var o = n.charAt(a);
		t.indexOf(o) === -1 && this.raise(e.start, "Invalid regular expression flag"), n.indexOf(o, a + 1) > -1 && this.raise(e.start, "Duplicate regular expression flag"), o === "u" && (r = !0), o === "v" && (i = !0);
	}
	this.options.ecmaVersion >= 15 && r && i && this.raise(e.start, "Invalid regular expression flag");
};
function Dn(e) {
	for (var t in e) return !0;
	return !1;
}
B.validateRegExpPattern = function(e) {
	this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && Dn(e.groupNames) && (e.switchN = !0, this.regexp_pattern(e));
}, B.regexp_pattern = function(e) {
	e.pos = 0, e.lastIntValue = 0, e.lastStringValue = "", e.lastAssertionIsQuantifiable = !1, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames = Object.create(null), e.backReferenceNames.length = 0, e.branchID = null, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(41) && e.raise("Unmatched ')'"), (e.eat(93) || e.eat(125)) && e.raise("Lone quantifier brackets")), e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
	for (var t = 0, n = e.backReferenceNames; t < n.length; t += 1) {
		var r = n[t];
		e.groupNames[r] || e.raise("Invalid named capture referenced");
	}
}, B.regexp_disjunction = function(e) {
	var t = this.options.ecmaVersion >= 16;
	for (t && (e.branchID = new Tn(e.branchID, null)), this.regexp_alternative(e); e.eat(124);) t && (e.branchID = e.branchID.sibling()), this.regexp_alternative(e);
	t && (e.branchID = e.branchID.parent), this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"), e.eat(123) && e.raise("Lone quantifier brackets");
}, B.regexp_alternative = function(e) {
	for (; e.pos < e.source.length && this.regexp_eatTerm(e););
}, B.regexp_eatTerm = function(e) {
	return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"), !0) : (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) ? (this.regexp_eatQuantifier(e), !0) : !1;
}, B.regexp_eatAssertion = function(e) {
	var t = e.pos;
	if (e.lastAssertionIsQuantifiable = !1, e.eat(94) || e.eat(36)) return !0;
	if (e.eat(92)) {
		if (e.eat(66) || e.eat(98)) return !0;
		e.pos = t;
	}
	if (e.eat(40) && e.eat(63)) {
		var n = !1;
		if (this.options.ecmaVersion >= 9 && (n = e.eat(60)), e.eat(61) || e.eat(33)) return this.regexp_disjunction(e), e.eat(41) || e.raise("Unterminated group"), e.lastAssertionIsQuantifiable = !n, !0;
	}
	return e.pos = t, !1;
}, B.regexp_eatQuantifier = function(e, t) {
	return t === void 0 && (t = !1), this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(63), !0) : !1;
}, B.regexp_eatQuantifierPrefix = function(e, t) {
	return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t);
}, B.regexp_eatBracedQuantifier = function(e, t) {
	var n = e.pos;
	if (e.eat(123)) {
		var r = 0, i = -1;
		if (this.regexp_eatDecimalDigits(e) && (r = e.lastIntValue, e.eat(44) && this.regexp_eatDecimalDigits(e) && (i = e.lastIntValue), e.eat(125))) return i !== -1 && i < r && !t && e.raise("numbers out of order in {} quantifier"), !0;
		e.switchU && !t && e.raise("Incomplete quantifier"), e.pos = n;
	}
	return !1;
}, B.regexp_eatAtom = function(e) {
	return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
}, B.regexp_eatReverseSolidusAtomEscape = function(e) {
	var t = e.pos;
	if (e.eat(92)) {
		if (this.regexp_eatAtomEscape(e)) return !0;
		e.pos = t;
	}
	return !1;
}, B.regexp_eatUncapturingGroup = function(e) {
	var t = e.pos;
	if (e.eat(40)) {
		if (e.eat(63)) {
			if (this.options.ecmaVersion >= 16) {
				var n = this.regexp_eatModifiers(e), r = e.eat(45);
				if (n || r) {
					for (var i = 0; i < n.length; i++) {
						var a = n.charAt(i);
						n.indexOf(a, i + 1) > -1 && e.raise("Duplicate regular expression modifiers");
					}
					if (r) {
						var o = this.regexp_eatModifiers(e);
						!n && !o && e.current() === 58 && e.raise("Invalid regular expression modifiers");
						for (var s = 0; s < o.length; s++) {
							var c = o.charAt(s);
							(o.indexOf(c, s + 1) > -1 || n.indexOf(c) > -1) && e.raise("Duplicate regular expression modifiers");
						}
					}
				}
			}
			if (e.eat(58)) {
				if (this.regexp_disjunction(e), e.eat(41)) return !0;
				e.raise("Unterminated group");
			}
		}
		e.pos = t;
	}
	return !1;
}, B.regexp_eatCapturingGroup = function(e) {
	if (e.eat(40)) {
		if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : e.current() === 63 && e.raise("Invalid group"), this.regexp_disjunction(e), e.eat(41)) return e.numCapturingParens += 1, !0;
		e.raise("Unterminated group");
	}
	return !1;
}, B.regexp_eatModifiers = function(e) {
	for (var t = "", n = 0; (n = e.current()) !== -1 && On(n);) t += ct(n), e.advance();
	return t;
};
function On(e) {
	return e === 105 || e === 109 || e === 115;
}
B.regexp_eatExtendedAtom = function(e) {
	return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);
}, B.regexp_eatInvalidBracedQuantifier = function(e) {
	return this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"), !1;
}, B.regexp_eatSyntaxCharacter = function(e) {
	var t = e.current();
	return kn(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
function kn(e) {
	return e === 36 || e >= 40 && e <= 43 || e === 46 || e === 63 || e >= 91 && e <= 94 || e >= 123 && e <= 125;
}
B.regexp_eatPatternCharacters = function(e) {
	for (var t = e.pos, n = 0; (n = e.current()) !== -1 && !kn(n);) e.advance();
	return e.pos !== t;
}, B.regexp_eatExtendedPatternCharacter = function(e) {
	var t = e.current();
	return t !== -1 && t !== 36 && !(t >= 40 && t <= 43) && t !== 46 && t !== 63 && t !== 91 && t !== 94 && t !== 124 ? (e.advance(), !0) : !1;
}, B.regexp_groupSpecifier = function(e) {
	if (e.eat(63)) {
		this.regexp_eatGroupName(e) || e.raise("Invalid group");
		var t = this.options.ecmaVersion >= 16, n = e.groupNames[e.lastStringValue];
		if (n) if (t) for (var r = 0, i = n; r < i.length; r += 1) i[r].separatedFrom(e.branchID) || e.raise("Duplicate capture group name");
		else e.raise("Duplicate capture group name");
		t ? (n || (e.groupNames[e.lastStringValue] = [])).push(e.branchID) : e.groupNames[e.lastStringValue] = !0;
	}
}, B.regexp_eatGroupName = function(e) {
	if (e.lastStringValue = "", e.eat(60)) {
		if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
		e.raise("Invalid capture group name");
	}
	return !1;
}, B.regexp_eatRegExpIdentifierName = function(e) {
	if (e.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(e)) {
		for (e.lastStringValue += ct(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e);) e.lastStringValue += ct(e.lastIntValue);
		return !0;
	}
	return !1;
}, B.regexp_eatRegExpIdentifierStart = function(e) {
	var t = e.pos, n = this.options.ecmaVersion >= 11, r = e.current(n);
	return e.advance(n), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (r = e.lastIntValue), An(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
};
function An(e) {
	return w(e, !0) || e === 36 || e === 95;
}
B.regexp_eatRegExpIdentifierPart = function(e) {
	var t = e.pos, n = this.options.ecmaVersion >= 11, r = e.current(n);
	return e.advance(n), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (r = e.lastIntValue), jn(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
};
function jn(e) {
	return Xe(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205;
}
B.regexp_eatAtomEscape = function(e) {
	return this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e) ? !0 : (e.switchU && (e.current() === 99 && e.raise("Invalid unicode escape"), e.raise("Invalid escape")), !1);
}, B.regexp_eatBackReference = function(e) {
	var t = e.pos;
	if (this.regexp_eatDecimalEscape(e)) {
		var n = e.lastIntValue;
		if (e.switchU) return n > e.maxBackReference && (e.maxBackReference = n), !0;
		if (n <= e.numCapturingParens) return !0;
		e.pos = t;
	}
	return !1;
}, B.regexp_eatKGroupName = function(e) {
	if (e.eat(107)) {
		if (this.regexp_eatGroupName(e)) return e.backReferenceNames.push(e.lastStringValue), !0;
		e.raise("Invalid named reference");
	}
	return !1;
}, B.regexp_eatCharacterEscape = function(e) {
	return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);
}, B.regexp_eatCControlLetter = function(e) {
	var t = e.pos;
	if (e.eat(99)) {
		if (this.regexp_eatControlLetter(e)) return !0;
		e.pos = t;
	}
	return !1;
}, B.regexp_eatZero = function(e) {
	return e.current() === 48 && !Un(e.lookahead()) ? (e.lastIntValue = 0, e.advance(), !0) : !1;
}, B.regexp_eatControlEscape = function(e) {
	var t = e.current();
	return t === 116 ? (e.lastIntValue = 9, e.advance(), !0) : t === 110 ? (e.lastIntValue = 10, e.advance(), !0) : t === 118 ? (e.lastIntValue = 11, e.advance(), !0) : t === 102 ? (e.lastIntValue = 12, e.advance(), !0) : t === 114 ? (e.lastIntValue = 13, e.advance(), !0) : !1;
}, B.regexp_eatControlLetter = function(e) {
	var t = e.current();
	return Mn(t) ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
};
function Mn(e) {
	return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
B.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
	t === void 0 && (t = !1);
	var n = e.pos, r = t || e.switchU;
	if (e.eat(117)) {
		if (this.regexp_eatFixedHexDigits(e, 4)) {
			var i = e.lastIntValue;
			if (r && i >= 55296 && i <= 56319) {
				var a = e.pos;
				if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
					var o = e.lastIntValue;
					if (o >= 56320 && o <= 57343) return e.lastIntValue = (i - 55296) * 1024 + (o - 56320) + 65536, !0;
				}
				e.pos = a, e.lastIntValue = i;
			}
			return !0;
		}
		if (r && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && Nn(e.lastIntValue)) return !0;
		r && e.raise("Invalid unicode escape"), e.pos = n;
	}
	return !1;
};
function Nn(e) {
	return e >= 0 && e <= 1114111;
}
B.regexp_eatIdentityEscape = function(e) {
	if (e.switchU) return this.regexp_eatSyntaxCharacter(e) ? !0 : e.eat(47) ? (e.lastIntValue = 47, !0) : !1;
	var t = e.current();
	return t !== 99 && (!e.switchN || t !== 107) ? (e.lastIntValue = t, e.advance(), !0) : !1;
}, B.regexp_eatDecimalEscape = function(e) {
	e.lastIntValue = 0;
	var t = e.current();
	if (t >= 49 && t <= 57) {
		do
			e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
		while ((t = e.current()) >= 48 && t <= 57);
		return !0;
	}
	return !1;
};
var Pn = 0, Fn = 1, In = 2;
B.regexp_eatCharacterClassEscape = function(e) {
	var t = e.current();
	if (Ln(t)) return e.lastIntValue = -1, e.advance(), Fn;
	var n = !1;
	if (e.switchU && this.options.ecmaVersion >= 9 && ((n = t === 80) || t === 112)) {
		e.lastIntValue = -1, e.advance();
		var r;
		if (e.eat(123) && (r = this.regexp_eatUnicodePropertyValueExpression(e)) && e.eat(125)) return n && r === In && e.raise("Invalid property name"), r;
		e.raise("Invalid property name");
	}
	return Pn;
};
function Ln(e) {
	return e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87;
}
B.regexp_eatUnicodePropertyValueExpression = function(e) {
	var t = e.pos;
	if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
		var n = e.lastStringValue;
		if (this.regexp_eatUnicodePropertyValue(e)) {
			var r = e.lastStringValue;
			return this.regexp_validateUnicodePropertyNameAndValue(e, n, r), Fn;
		}
	}
	if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
		var i = e.lastStringValue;
		return this.regexp_validateUnicodePropertyNameOrValue(e, i);
	}
	return Pn;
}, B.regexp_validateUnicodePropertyNameAndValue = function(e, t, n) {
	it(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"), e.unicodeProperties.nonBinary[t].test(n) || e.raise("Invalid property value");
}, B.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
	if (e.unicodeProperties.binary.test(t)) return Fn;
	if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t)) return In;
	e.raise("Invalid property name");
}, B.regexp_eatUnicodePropertyName = function(e) {
	var t = 0;
	for (e.lastStringValue = ""; Rn(t = e.current());) e.lastStringValue += ct(t), e.advance();
	return e.lastStringValue !== "";
};
function Rn(e) {
	return Mn(e) || e === 95;
}
B.regexp_eatUnicodePropertyValue = function(e) {
	var t = 0;
	for (e.lastStringValue = ""; zn(t = e.current());) e.lastStringValue += ct(t), e.advance();
	return e.lastStringValue !== "";
};
function zn(e) {
	return Rn(e) || Un(e);
}
B.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
	return this.regexp_eatUnicodePropertyValue(e);
}, B.regexp_eatCharacterClass = function(e) {
	if (e.eat(91)) {
		var t = e.eat(94), n = this.regexp_classContents(e);
		return e.eat(93) || e.raise("Unterminated character class"), t && n === In && e.raise("Negated character class may contain strings"), !0;
	}
	return !1;
}, B.regexp_classContents = function(e) {
	return e.current() === 93 ? Fn : e.switchV ? this.regexp_classSetExpression(e) : (this.regexp_nonEmptyClassRanges(e), Fn);
}, B.regexp_nonEmptyClassRanges = function(e) {
	for (; this.regexp_eatClassAtom(e);) {
		var t = e.lastIntValue;
		if (e.eat(45) && this.regexp_eatClassAtom(e)) {
			var n = e.lastIntValue;
			e.switchU && (t === -1 || n === -1) && e.raise("Invalid character class"), t !== -1 && n !== -1 && t > n && e.raise("Range out of order in character class");
		}
	}
}, B.regexp_eatClassAtom = function(e) {
	var t = e.pos;
	if (e.eat(92)) {
		if (this.regexp_eatClassEscape(e)) return !0;
		if (e.switchU) {
			var n = e.current();
			(n === 99 || Kn(n)) && e.raise("Invalid class escape"), e.raise("Invalid escape");
		}
		e.pos = t;
	}
	var r = e.current();
	return r === 93 ? !1 : (e.lastIntValue = r, e.advance(), !0);
}, B.regexp_eatClassEscape = function(e) {
	var t = e.pos;
	if (e.eat(98)) return e.lastIntValue = 8, !0;
	if (e.switchU && e.eat(45)) return e.lastIntValue = 45, !0;
	if (!e.switchU && e.eat(99)) {
		if (this.regexp_eatClassControlLetter(e)) return !0;
		e.pos = t;
	}
	return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
}, B.regexp_classSetExpression = function(e) {
	var t = Fn, n;
	if (!this.regexp_eatClassSetRange(e)) if (n = this.regexp_eatClassSetOperand(e)) {
		n === In && (t = In);
		for (var r = e.pos; e.eatChars([38, 38]);) {
			if (e.current() !== 38 && (n = this.regexp_eatClassSetOperand(e))) {
				n !== In && (t = Fn);
				continue;
			}
			e.raise("Invalid character in character class");
		}
		if (r !== e.pos) return t;
		for (; e.eatChars([45, 45]);) this.regexp_eatClassSetOperand(e) || e.raise("Invalid character in character class");
		if (r !== e.pos) return t;
	} else e.raise("Invalid character in character class");
	for (;;) if (!this.regexp_eatClassSetRange(e)) {
		if (n = this.regexp_eatClassSetOperand(e), !n) return t;
		n === In && (t = In);
	}
}, B.regexp_eatClassSetRange = function(e) {
	var t = e.pos;
	if (this.regexp_eatClassSetCharacter(e)) {
		var n = e.lastIntValue;
		if (e.eat(45) && this.regexp_eatClassSetCharacter(e)) {
			var r = e.lastIntValue;
			return n !== -1 && r !== -1 && n > r && e.raise("Range out of order in character class"), !0;
		}
		e.pos = t;
	}
	return !1;
}, B.regexp_eatClassSetOperand = function(e) {
	return this.regexp_eatClassSetCharacter(e) ? Fn : this.regexp_eatClassStringDisjunction(e) || this.regexp_eatNestedClass(e);
}, B.regexp_eatNestedClass = function(e) {
	var t = e.pos;
	if (e.eat(91)) {
		var n = e.eat(94), r = this.regexp_classContents(e);
		if (e.eat(93)) return n && r === In && e.raise("Negated character class may contain strings"), r;
		e.pos = t;
	}
	if (e.eat(92)) {
		var i = this.regexp_eatCharacterClassEscape(e);
		if (i) return i;
		e.pos = t;
	}
	return null;
}, B.regexp_eatClassStringDisjunction = function(e) {
	var t = e.pos;
	if (e.eatChars([92, 113])) {
		if (e.eat(123)) {
			var n = this.regexp_classStringDisjunctionContents(e);
			if (e.eat(125)) return n;
		} else e.raise("Invalid escape");
		e.pos = t;
	}
	return null;
}, B.regexp_classStringDisjunctionContents = function(e) {
	for (var t = this.regexp_classString(e); e.eat(124);) this.regexp_classString(e) === In && (t = In);
	return t;
}, B.regexp_classString = function(e) {
	for (var t = 0; this.regexp_eatClassSetCharacter(e);) t++;
	return t === 1 ? Fn : In;
}, B.regexp_eatClassSetCharacter = function(e) {
	var t = e.pos;
	if (e.eat(92)) return this.regexp_eatCharacterEscape(e) || this.regexp_eatClassSetReservedPunctuator(e) ? !0 : e.eat(98) ? (e.lastIntValue = 8, !0) : (e.pos = t, !1);
	var n = e.current();
	return n < 0 || n === e.lookahead() && Bn(n) || Vn(n) ? !1 : (e.advance(), e.lastIntValue = n, !0);
};
function Bn(e) {
	return e === 33 || e >= 35 && e <= 38 || e >= 42 && e <= 44 || e === 46 || e >= 58 && e <= 64 || e === 94 || e === 96 || e === 126;
}
function Vn(e) {
	return e === 40 || e === 41 || e === 45 || e === 47 || e >= 91 && e <= 93 || e >= 123 && e <= 125;
}
B.regexp_eatClassSetReservedPunctuator = function(e) {
	var t = e.current();
	return Hn(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
function Hn(e) {
	return e === 33 || e === 35 || e === 37 || e === 38 || e === 44 || e === 45 || e >= 58 && e <= 62 || e === 64 || e === 96 || e === 126;
}
B.regexp_eatClassControlLetter = function(e) {
	var t = e.current();
	return Un(t) || t === 95 ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
}, B.regexp_eatHexEscapeSequence = function(e) {
	var t = e.pos;
	if (e.eat(120)) {
		if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
		e.switchU && e.raise("Invalid escape"), e.pos = t;
	}
	return !1;
}, B.regexp_eatDecimalDigits = function(e) {
	var t = e.pos, n = 0;
	for (e.lastIntValue = 0; Un(n = e.current());) e.lastIntValue = 10 * e.lastIntValue + (n - 48), e.advance();
	return e.pos !== t;
};
function Un(e) {
	return e >= 48 && e <= 57;
}
B.regexp_eatHexDigits = function(e) {
	var t = e.pos, n = 0;
	for (e.lastIntValue = 0; Wn(n = e.current());) e.lastIntValue = 16 * e.lastIntValue + Gn(n), e.advance();
	return e.pos !== t;
};
function Wn(e) {
	return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function Gn(e) {
	return e >= 65 && e <= 70 ? 10 + (e - 65) : e >= 97 && e <= 102 ? 10 + (e - 97) : e - 48;
}
B.regexp_eatLegacyOctalEscapeSequence = function(e) {
	if (this.regexp_eatOctalDigit(e)) {
		var t = e.lastIntValue;
		if (this.regexp_eatOctalDigit(e)) {
			var n = e.lastIntValue;
			t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = t * 64 + n * 8 + e.lastIntValue : e.lastIntValue = t * 8 + n;
		} else e.lastIntValue = t;
		return !0;
	}
	return !1;
}, B.regexp_eatOctalDigit = function(e) {
	var t = e.current();
	return Kn(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1);
};
function Kn(e) {
	return e >= 48 && e <= 55;
}
B.regexp_eatFixedHexDigits = function(e, t) {
	var n = e.pos;
	e.lastIntValue = 0;
	for (var r = 0; r < t; ++r) {
		var i = e.current();
		if (!Wn(i)) return e.pos = n, !1;
		e.lastIntValue = 16 * e.lastIntValue + Gn(i), e.advance();
	}
	return !0;
};
var qn = function(e) {
	this.type = e.type, this.value = e.value, this.start = e.start, this.end = e.end, e.options.locations && (this.loc = new dt(e, e.startLoc, e.endLoc)), e.options.ranges && (this.range = [e.start, e.end]);
}, V = P.prototype;
V.next = function(e) {
	!e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new qn(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
}, V.getToken = function() {
	return this.next(), new qn(this);
}, typeof Symbol < "u" && (V[Symbol.iterator] = function() {
	var e = this;
	return { next: function() {
		var t = e.getToken();
		return {
			done: t.type === A.eof,
			value: t
		};
	} };
}), V.nextToken = function() {
	var e = this.curContext();
	if ((!e || !e.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length) return this.finishToken(A.eof);
	if (e.override) return e.override(this);
	this.readToken(this.fullCharCodeAtPos());
}, V.readToken = function(e) {
	return w(e, this.options.ecmaVersion >= 6) || e === 92 ? this.readWord() : this.getTokenFromCode(e);
}, V.fullCharCodeAt = function(e) {
	var t = this.input.charCodeAt(e);
	if (t <= 55295 || t >= 56320) return t;
	var n = this.input.charCodeAt(e + 1);
	return n <= 56319 || n >= 57344 ? t : (t << 10) + n - 56613888;
}, V.fullCharCodeAtPos = function() {
	return this.fullCharCodeAt(this.pos);
}, V.skipBlockComment = function() {
	var e = this.options.onComment && this.curPosition(), t = this.pos, n = this.input.indexOf("*/", this.pos += 2);
	if (n === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = n + 2, this.options.locations) for (var r = void 0, i = t; (r = $e(this.input, i, this.pos)) > -1;) ++this.curLine, i = this.lineStart = r;
	this.options.onComment && this.options.onComment(!0, this.input.slice(t + 2, n), t, this.pos, e, this.curPosition());
}, V.skipLineComment = function(e) {
	for (var t = this.pos, n = this.options.onComment && this.curPosition(), r = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !Qe(r);) r = this.input.charCodeAt(++this.pos);
	this.options.onComment && this.options.onComment(!1, this.input.slice(t + e, this.pos), t, this.pos, n, this.curPosition());
}, V.skipSpace = function() {
	loop: for (; this.pos < this.input.length;) {
		var e = this.input.charCodeAt(this.pos);
		switch (e) {
			case 32:
			case 160:
				++this.pos;
				break;
			case 13: this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
			case 10:
			case 8232:
			case 8233:
				++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
				break;
			case 47:
				switch (this.input.charCodeAt(this.pos + 1)) {
					case 42:
						this.skipBlockComment();
						break;
					case 47:
						this.skipLineComment(2);
						break;
					default: break loop;
				}
				break;
			default: if (e > 8 && e < 14 || e >= 5760 && et.test(String.fromCharCode(e))) ++this.pos;
			else break loop;
		}
	}
}, V.finishToken = function(e, t) {
	this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
	var n = this.type;
	this.type = e, this.value = t, this.updateContext(n);
}, V.readToken_dot = function() {
	var e = this.input.charCodeAt(this.pos + 1);
	if (e >= 48 && e <= 57) return this.readNumber(!0);
	var t = this.input.charCodeAt(this.pos + 2);
	return this.options.ecmaVersion >= 6 && e === 46 && t === 46 ? (this.pos += 3, this.finishToken(A.ellipsis)) : (++this.pos, this.finishToken(A.dot));
}, V.readToken_slash = function() {
	var e = this.input.charCodeAt(this.pos + 1);
	return this.exprAllowed ? (++this.pos, this.readRegexp()) : e === 61 ? this.finishOp(A.assign, 2) : this.finishOp(A.slash, 1);
}, V.readToken_mult_modulo_exp = function(e) {
	var t = this.input.charCodeAt(this.pos + 1), n = 1, r = e === 42 ? A.star : A.modulo;
	return this.options.ecmaVersion >= 7 && e === 42 && t === 42 && (++n, r = A.starstar, t = this.input.charCodeAt(this.pos + 2)), t === 61 ? this.finishOp(A.assign, n + 1) : this.finishOp(r, n);
}, V.readToken_pipe_amp = function(e) {
	var t = this.input.charCodeAt(this.pos + 1);
	return t === e ? this.options.ecmaVersion >= 12 && this.input.charCodeAt(this.pos + 2) === 61 ? this.finishOp(A.assign, 3) : this.finishOp(e === 124 ? A.logicalOR : A.logicalAND, 2) : t === 61 ? this.finishOp(A.assign, 2) : this.finishOp(e === 124 ? A.bitwiseOR : A.bitwiseAND, 1);
}, V.readToken_caret = function() {
	return this.input.charCodeAt(this.pos + 1) === 61 ? this.finishOp(A.assign, 2) : this.finishOp(A.bitwiseXOR, 1);
}, V.readToken_plus_min = function(e) {
	var t = this.input.charCodeAt(this.pos + 1);
	return t === e ? t === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || j.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(A.incDec, 2) : t === 61 ? this.finishOp(A.assign, 2) : this.finishOp(A.plusMin, 1);
}, V.readToken_lt_gt = function(e) {
	var t = this.input.charCodeAt(this.pos + 1), n = 1;
	return t === e ? (n = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + n) === 61 ? this.finishOp(A.assign, n + 1) : this.finishOp(A.bitShift, n)) : t === 33 && e === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (t === 61 && (n = 2), this.finishOp(A.relational, n));
}, V.readToken_eq_excl = function(e) {
	var t = this.input.charCodeAt(this.pos + 1);
	return t === 61 ? this.finishOp(A.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : e === 61 && t === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(A.arrow)) : this.finishOp(e === 61 ? A.eq : A.prefix, 1);
}, V.readToken_question = function() {
	var e = this.options.ecmaVersion;
	if (e >= 11) {
		var t = this.input.charCodeAt(this.pos + 1);
		if (t === 46) {
			var n = this.input.charCodeAt(this.pos + 2);
			if (n < 48 || n > 57) return this.finishOp(A.questionDot, 2);
		}
		if (t === 63) return e >= 12 && this.input.charCodeAt(this.pos + 2) === 61 ? this.finishOp(A.assign, 3) : this.finishOp(A.coalesce, 2);
	}
	return this.finishOp(A.question, 1);
}, V.readToken_numberSign = function() {
	var e = this.options.ecmaVersion, t = 35;
	if (e >= 13 && (++this.pos, t = this.fullCharCodeAtPos(), w(t, !0) || t === 92)) return this.finishToken(A.privateId, this.readWord1());
	this.raise(this.pos, "Unexpected character '" + ct(t) + "'");
}, V.getTokenFromCode = function(e) {
	switch (e) {
		case 46: return this.readToken_dot();
		case 40: return ++this.pos, this.finishToken(A.parenL);
		case 41: return ++this.pos, this.finishToken(A.parenR);
		case 59: return ++this.pos, this.finishToken(A.semi);
		case 44: return ++this.pos, this.finishToken(A.comma);
		case 91: return ++this.pos, this.finishToken(A.bracketL);
		case 93: return ++this.pos, this.finishToken(A.bracketR);
		case 123: return ++this.pos, this.finishToken(A.braceL);
		case 125: return ++this.pos, this.finishToken(A.braceR);
		case 58: return ++this.pos, this.finishToken(A.colon);
		case 96:
			if (this.options.ecmaVersion < 6) break;
			return ++this.pos, this.finishToken(A.backQuote);
		case 48:
			var t = this.input.charCodeAt(this.pos + 1);
			if (t === 120 || t === 88) return this.readRadixNumber(16);
			if (this.options.ecmaVersion >= 6) {
				if (t === 111 || t === 79) return this.readRadixNumber(8);
				if (t === 98 || t === 66) return this.readRadixNumber(2);
			}
		case 49:
		case 50:
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56:
		case 57: return this.readNumber(!1);
		case 34:
		case 39: return this.readString(e);
		case 47: return this.readToken_slash();
		case 37:
		case 42: return this.readToken_mult_modulo_exp(e);
		case 124:
		case 38: return this.readToken_pipe_amp(e);
		case 94: return this.readToken_caret();
		case 43:
		case 45: return this.readToken_plus_min(e);
		case 60:
		case 62: return this.readToken_lt_gt(e);
		case 61:
		case 33: return this.readToken_eq_excl(e);
		case 63: return this.readToken_question();
		case 126: return this.finishOp(A.prefix, 1);
		case 35: return this.readToken_numberSign();
	}
	this.raise(this.pos, "Unexpected character '" + ct(e) + "'");
}, V.finishOp = function(e, t) {
	var n = this.input.slice(this.pos, this.pos + t);
	return this.pos += t, this.finishToken(e, n);
}, V.readRegexp = function() {
	for (var e, t, n = this.pos;;) {
		this.pos >= this.input.length && this.raise(n, "Unterminated regular expression");
		var r = this.input.charAt(this.pos);
		if (j.test(r) && this.raise(n, "Unterminated regular expression"), e) e = !1;
		else {
			if (r === "[") t = !0;
			else if (r === "]" && t) t = !1;
			else if (r === "/" && !t) break;
			e = r === "\\";
		}
		++this.pos;
	}
	var i = this.input.slice(n, this.pos);
	++this.pos;
	var a = this.pos, o = this.readWord1();
	this.containsEsc && this.unexpected(a);
	var s = this.regexpState ||= new En(this);
	s.reset(n, i, o), this.validateRegExpFlags(s), this.validateRegExpPattern(s);
	var c = null;
	try {
		c = new RegExp(i, o);
	} catch {}
	return this.finishToken(A.regexp, {
		pattern: i,
		flags: o,
		value: c
	});
}, V.readInt = function(e, t, n) {
	for (var r = this.options.ecmaVersion >= 12 && t === void 0, i = n && this.input.charCodeAt(this.pos) === 48, a = this.pos, o = 0, s = 0, c = 0, l = t ?? Infinity; c < l; ++c, ++this.pos) {
		var u = this.input.charCodeAt(this.pos), d = void 0;
		if (r && u === 95) {
			i && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), s === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), c === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), s = u;
			continue;
		}
		if (d = u >= 97 ? u - 97 + 10 : u >= 65 ? u - 65 + 10 : u >= 48 && u <= 57 ? u - 48 : Infinity, d >= e) break;
		s = u, o = o * e + d;
	}
	return r && s === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === a || t != null && this.pos - a !== t ? null : o;
};
function Jn(e, t) {
	return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ""));
}
function Yn(e) {
	return typeof BigInt == "function" ? BigInt(e.replace(/_/g, "")) : null;
}
V.readRadixNumber = function(e) {
	var t = this.pos;
	this.pos += 2;
	var n = this.readInt(e);
	return n ?? this.raise(this.start + 2, "Expected number in radix " + e), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (n = Yn(this.input.slice(t, this.pos)), ++this.pos) : w(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(A.num, n);
}, V.readNumber = function(e) {
	var t = this.pos;
	!e && this.readInt(10, void 0, !0) === null && this.raise(t, "Invalid number");
	var n = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
	n && this.strict && this.raise(t, "Invalid number");
	var r = this.input.charCodeAt(this.pos);
	if (!n && !e && this.options.ecmaVersion >= 11 && r === 110) {
		var i = Yn(this.input.slice(t, this.pos));
		return ++this.pos, w(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(A.num, i);
	}
	n && /[89]/.test(this.input.slice(t, this.pos)) && (n = !1), r === 46 && !n && (++this.pos, this.readInt(10), r = this.input.charCodeAt(this.pos)), (r === 69 || r === 101) && !n && (r = this.input.charCodeAt(++this.pos), (r === 43 || r === 45) && ++this.pos, this.readInt(10) === null && this.raise(t, "Invalid number")), w(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
	var a = Jn(this.input.slice(t, this.pos), n);
	return this.finishToken(A.num, a);
}, V.readCodePoint = function() {
	var e = this.input.charCodeAt(this.pos), t;
	if (e === 123) {
		this.options.ecmaVersion < 6 && this.unexpected();
		var n = ++this.pos;
		t = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, t > 1114111 && this.invalidStringToken(n, "Code point out of bounds");
	} else t = this.readHexChar(4);
	return t;
}, V.readString = function(e) {
	for (var t = "", n = ++this.pos;;) {
		this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
		var r = this.input.charCodeAt(this.pos);
		if (r === e) break;
		r === 92 ? (t += this.input.slice(n, this.pos), t += this.readEscapedChar(!1), n = this.pos) : r === 8232 || r === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (Qe(r) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
	}
	return t += this.input.slice(n, this.pos++), this.finishToken(A.string, t);
};
var Xn = {};
V.tryReadTemplateToken = function() {
	this.inTemplateElement = !0;
	try {
		this.readTmplToken();
	} catch (e) {
		if (e === Xn) this.readInvalidTemplateToken();
		else throw e;
	}
	this.inTemplateElement = !1;
}, V.invalidStringToken = function(e, t) {
	if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw Xn;
	this.raise(e, t);
}, V.readTmplToken = function() {
	for (var e = "", t = this.pos;;) {
		this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
		var n = this.input.charCodeAt(this.pos);
		if (n === 96 || n === 36 && this.input.charCodeAt(this.pos + 1) === 123) return this.pos === this.start && (this.type === A.template || this.type === A.invalidTemplate) ? n === 36 ? (this.pos += 2, this.finishToken(A.dollarBraceL)) : (++this.pos, this.finishToken(A.backQuote)) : (e += this.input.slice(t, this.pos), this.finishToken(A.template, e));
		if (n === 92) e += this.input.slice(t, this.pos), e += this.readEscapedChar(!0), t = this.pos;
		else if (Qe(n)) {
			switch (e += this.input.slice(t, this.pos), ++this.pos, n) {
				case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
				case 10:
					e += "\n";
					break;
				default:
					e += String.fromCharCode(n);
					break;
			}
			this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;
		} else ++this.pos;
	}
}, V.readInvalidTemplateToken = function() {
	for (; this.pos < this.input.length; this.pos++) switch (this.input[this.pos]) {
		case "\\":
			++this.pos;
			break;
		case "$": if (this.input[this.pos + 1] !== "{") break;
		case "`": return this.finishToken(A.invalidTemplate, this.input.slice(this.start, this.pos));
		case "\r": this.input[this.pos + 1] === "\n" && ++this.pos;
		case "\n":
		case "\u2028":
		case "\u2029":
			++this.curLine, this.lineStart = this.pos + 1;
			break;
	}
	this.raise(this.start, "Unterminated template");
}, V.readEscapedChar = function(e) {
	var t = this.input.charCodeAt(++this.pos);
	switch (++this.pos, t) {
		case 110: return "\n";
		case 114: return "\r";
		case 120: return String.fromCharCode(this.readHexChar(2));
		case 117: return ct(this.readCodePoint());
		case 116: return "	";
		case 98: return "\b";
		case 118: return "\v";
		case 102: return "\f";
		case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
		case 10: return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
		case 56:
		case 57: if (this.strict && this.invalidStringToken(this.pos - 1, "Invalid escape sequence"), e) {
			var n = this.pos - 1;
			this.invalidStringToken(n, "Invalid escape sequence in template string");
		}
		default:
			if (t >= 48 && t <= 55) {
				var r = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], i = parseInt(r, 8);
				return i > 255 && (r = r.slice(0, -1), i = parseInt(r, 8)), this.pos += r.length - 1, t = this.input.charCodeAt(this.pos), (r !== "0" || t === 56 || t === 57) && (this.strict || e) && this.invalidStringToken(this.pos - 1 - r.length, e ? "Octal literal in template string" : "Octal literal in strict mode"), String.fromCharCode(i);
			}
			return Qe(t) ? (this.options.locations && (this.lineStart = this.pos, ++this.curLine), "") : String.fromCharCode(t);
	}
}, V.readHexChar = function(e) {
	var t = this.pos, n = this.readInt(16, e);
	return n === null && this.invalidStringToken(t, "Bad character escape sequence"), n;
}, V.readWord1 = function() {
	this.containsEsc = !1;
	for (var e = "", t = !0, n = this.pos, r = this.options.ecmaVersion >= 6; this.pos < this.input.length;) {
		var i = this.fullCharCodeAtPos();
		if (Xe(i, r)) this.pos += i <= 65535 ? 1 : 2;
		else if (i === 92) {
			this.containsEsc = !0, e += this.input.slice(n, this.pos);
			var a = this.pos;
			this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
			var o = this.readCodePoint();
			(t ? w : Xe)(o, r) || this.invalidStringToken(a, "Invalid Unicode escape"), e += ct(o), n = this.pos;
		} else break;
		t = !1;
	}
	return e + this.input.slice(n, this.pos);
}, V.readWord = function() {
	var e = this.readWord1(), t = A.name;
	return this.keywords.test(e) && (t = Ze[e]), this.finishToken(t, e);
};
var Zn = "8.16.0";
P.acorn = {
	Parser: P,
	version: Zn,
	defaultOptions: pt,
	Position: ut,
	SourceLocation: dt,
	getLineInfo: ft,
	Node: tn,
	TokenType: T,
	tokTypes: A,
	keywordTypes: Ze,
	TokContext: qt,
	tokContexts: R,
	isIdentifierChar: Xe,
	isIdentifierStart: w,
	Token: qn,
	isNewLine: Qe,
	lineBreak: j,
	lineBreakG: M,
	nonASCIIwhitespace: et
};
function Qn(e, t) {
	return P.parse(e, t);
}
function $n(e, t, n) {
	return P.parseExpressionAt(e, t, n);
}
function er(e, t) {
	return P.tokenizer(e, t);
}
//#endregion
//#region ../../node_modules/.pnpm/@sveltejs+acorn-typescript@1.0.10_acorn@8.16.0/node_modules/@sveltejs/acorn-typescript/index.js
var H = !0, tr = /* @__PURE__ */ new WeakMap();
function nr(e) {
	let t = e.Parser.acorn || e, n = tr.get(t);
	if (!n) {
		let e = function(e) {
			return e === d.name || e === d.string || e === d.num || p.includes(e) || h.includes(e);
		}, r = function(e) {
			return e === d.name || p.includes(e) || h.includes(e);
		}, s = function(e) {
			return e === d.name || h.includes(e);
		}, c = function(e) {
			return e === m.abstract || e === m.declare || e === m.enum || e === m.module || e === m.namespace || e === m.interface || e === m.type;
		}, l = function(e) {
			return e === m.keyof || e === m.readonly || e === m.unique;
		}, u = function(e) {
			return e === d.invalidTemplate;
		}, { tokTypes: d, keywordTypes: f } = t, p = Object.values(f), m = o(), h = Object.values(m), g = a(), _ = i(), v = RegExp(`^(?:${Object.keys(m).join("|")})$`);
		g.jsxTagStart.updateContext = function() {
			this.context.push(_.tc_expr), this.context.push(_.tc_oTag), this.exprAllowed = !1;
		}, g.jsxTagEnd.updateContext = function(e) {
			let t = this.context.pop();
			t === _.tc_oTag && e === d.slash || t === _.tc_cTag ? (this.context.pop(), this.exprAllowed = this.curContext() === _.tc_expr) : this.exprAllowed = !0;
		}, n = {
			tokTypes: {
				...m,
				...g
			},
			tokContexts: { ..._ },
			keywordsRegExp: v,
			tokenIsLiteralPropertyName: e,
			tokenIsKeywordOrIdentifier: r,
			tokenIsIdentifier: s,
			tokenIsTSDeclarationStart: c,
			tokenIsTSTypeOperator: l,
			tokenIsTemplate: u
		};
	}
	return n;
	function r(e, n = {}) {
		return new t.TokenType("name", n);
	}
	function i() {
		return {
			tc_oTag: new t.TokContext("<tag", !1, !1),
			tc_cTag: new t.TokContext("</tag", !1, !1),
			tc_expr: new t.TokContext("<tag>...</tag>", !0, !0)
		};
	}
	function a() {
		return {
			at: new t.TokenType("@"),
			jsxName: new t.TokenType("jsxName"),
			jsxText: new t.TokenType("jsxText", { beforeExpr: !0 }),
			jsxTagStart: new t.TokenType("jsxTagStart", { startsExpr: !0 }),
			jsxTagEnd: new t.TokenType("jsxTagEnd")
		};
	}
	function o() {
		return {
			assert: r("assert", { startsExpr: H }),
			asserts: r("asserts", { startsExpr: H }),
			global: r("global", { startsExpr: H }),
			keyof: r("keyof", { startsExpr: H }),
			readonly: r("readonly", { startsExpr: H }),
			unique: r("unique", { startsExpr: H }),
			abstract: r("abstract", { startsExpr: H }),
			declare: r("declare", { startsExpr: H }),
			enum: r("enum", { startsExpr: H }),
			module: r("module", { startsExpr: H }),
			namespace: r("namespace", { startsExpr: H }),
			interface: r("interface", { startsExpr: H }),
			type: r("type", { startsExpr: H })
		};
	}
}
var rr = 512, ir = 1024, ar = 1, or = 2, sr = 4, cr = 8, lr = 16, ur = 64, dr = 128, fr = 256, pr = 512, mr = 1024;
ar | or | cr | dr, ar | 0 | cr | 0, ar | 0 | sr | 0, ar | 0 | lr | 0, or | 0 | dr, or | 0;
var hr = ar | or | cr | fr;
0 | mr, 0 | ur, ar | 0 | ur, hr | pr, 0 | mr;
var gr = 4, _r = 2, vr = 1;
_r | vr, _r | gr, vr | gr;
var yr = /* @__PURE__ */ RegExp("(?=((?:[^\\S\\n\\r\\u2028\\u2029]|\\/\\/.*|\\/\\*.*?\\*\\/)*))\\1(?=[\\n\\r\\u2028\\u2029]|\\/\\*(?!.*?\\*\\/)|$)", "y"), br = class {
	constructor() {
		this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
	}
};
function xr(e, t) {
	let n = t.key.name, r = e[n], i = "true";
	return t.type === "MethodDefinition" && (t.kind === "get" || t.kind === "set") && (i = (t.static ? "s" : "i") + t.kind), r === "iget" && i === "iset" || r === "iset" && i === "iget" || r === "sget" && i === "sset" || r === "sset" && i === "sget" ? (e[n] = "true", !1) : r ? !0 : (e[n] = i, !1);
}
function Sr(e, t) {
	let { computed: n, key: r } = e;
	return !n && (r.type === "Identifier" && r.name === t || r.type === "Literal" && r.value === t);
}
var U = {
	AbstractMethodHasImplementation: ({ methodName: e }) => `Method '${e}' cannot have an implementation because it is marked abstract.`,
	AbstractPropertyHasInitializer: ({ propertyName: e }) => `Property '${e}' cannot have an initializer because it is marked abstract.`,
	AccesorCannotDeclareThisParameter: "'get' and 'set' accessors cannot declare 'this' parameters.",
	AccesorCannotHaveTypeParameters: "An accessor cannot have type parameters.",
	CannotFindName: ({ name: e }) => `Cannot find name '${e}'.`,
	ClassMethodHasDeclare: "Class methods cannot have the 'declare' modifier.",
	ClassMethodHasReadonly: "Class methods cannot have the 'readonly' modifier.",
	ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference: "A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference.",
	ConstructorHasTypeParameters: "Type parameters cannot appear on a constructor declaration.",
	DeclareAccessor: ({ kind: e }) => `'declare' is not allowed in ${e}ters.`,
	DeclareClassFieldHasInitializer: "Initializers are not allowed in ambient contexts.",
	DeclareFunctionHasImplementation: "An implementation cannot be declared in ambient contexts.",
	DuplicateAccessibilityModifier: (() => "Accessibility modifier already seen."),
	DuplicateModifier: ({ modifier: e }) => `Duplicate modifier: '${e}'.`,
	EmptyHeritageClauseType: ({ token: e }) => `'${e}' list cannot be empty.`,
	EmptyTypeArguments: "Type argument list cannot be empty.",
	EmptyTypeParameters: "Type parameter list cannot be empty.",
	ExpectedAmbientAfterExportDeclare: "'export declare' must be followed by an ambient declaration.",
	ImportAliasHasImportType: "An import alias can not use 'import type'.",
	IncompatibleModifiers: ({ modifiers: e }) => `'${e[0]}' modifier cannot be used with '${e[1]}' modifier.`,
	IndexSignatureHasAbstract: "Index signatures cannot have the 'abstract' modifier.",
	IndexSignatureHasAccessibility: ({ modifier: e }) => `Index signatures cannot have an accessibility modifier ('${e}').`,
	IndexSignatureHasDeclare: "Index signatures cannot have the 'declare' modifier.",
	IndexSignatureHasOverride: "'override' modifier cannot appear on an index signature.",
	IndexSignatureHasStatic: "Index signatures cannot have the 'static' modifier.",
	InitializerNotAllowedInAmbientContext: "Initializers are not allowed in ambient contexts.",
	InvalidModifierOnTypeMember: ({ modifier: e }) => `'${e}' modifier cannot appear on a type member.`,
	InvalidModifierOnTypeParameter: ({ modifier: e }) => `'${e}' modifier cannot appear on a type parameter.`,
	InvalidModifierOnTypeParameterPositions: ({ modifier: e }) => `'${e}' modifier can only appear on a type parameter of a class, interface or type alias.`,
	InvalidModifiersOrder: ({ orderedModifiers: e }) => `'${e[0]}' modifier must precede '${e[1]}' modifier.`,
	InvalidPropertyAccessAfterInstantiationExpression: "Invalid property access after an instantiation expression. You can either wrap the instantiation expression in parentheses, or delete the type arguments.",
	InvalidTupleMemberLabel: "Tuple members must be labeled with a simple identifier.",
	MissingInterfaceName: "'interface' declarations must be followed by an identifier.",
	NonAbstractClassHasAbstractMethod: "Abstract methods can only appear within an abstract class.",
	NonClassMethodPropertyHasAbstractModifer: "'abstract' modifier can only appear on a class, method, or property declaration.",
	OptionalTypeBeforeRequired: "A required element cannot follow an optional element.",
	OverrideNotInSubClass: "This member cannot have an 'override' modifier because its containing class does not extend another class.",
	PatternIsOptional: "A binding pattern parameter cannot be optional in an implementation signature.",
	PrivateElementHasAbstract: "Private elements cannot have the 'abstract' modifier.",
	PrivateElementHasAccessibility: ({ modifier: e }) => `Private elements cannot have an accessibility modifier ('${e}').`,
	PrivateMethodsHasAccessibility: ({ modifier: e }) => `Private methods cannot have an accessibility modifier ('${e}').`,
	ReadonlyForMethodSignature: "'readonly' modifier can only appear on a property declaration or index signature.",
	ReservedArrowTypeParam: "This syntax is reserved in files with the .mts or .cts extension. Add a trailing comma, as in `<T,>() => ...`.",
	ReservedTypeAssertion: "This syntax is reserved in files with the .mts or .cts extension. Use an `as` expression instead.",
	SetAccesorCannotHaveOptionalParameter: "A 'set' accessor cannot have an optional parameter.",
	SetAccesorCannotHaveRestParameter: "A 'set' accessor cannot have rest parameter.",
	SetAccesorCannotHaveReturnType: "A 'set' accessor cannot have a return type annotation.",
	SingleTypeParameterWithoutTrailingComma: ({ typeParameterName: e }) => `Single type parameter ${e} should have a trailing comma. Example usage: <${e},>.`,
	StaticBlockCannotHaveModifier: "Static class blocks cannot have any modifier.",
	TypeAnnotationAfterAssign: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.",
	TypeImportCannotSpecifyDefaultAndNamed: "A type-only import can specify a default import or named bindings, but not both.",
	TypeModifierIsUsedInTypeExports: "The 'type' modifier cannot be used on a named export when 'export type' is used on its export statement.",
	TypeModifierIsUsedInTypeImports: "The 'type' modifier cannot be used on a named import when 'import type' is used on its import statement.",
	UnexpectedParameterModifier: "A parameter property is only allowed in a constructor implementation.",
	UnexpectedReadonly: "'readonly' type modifier is only permitted on array and tuple literal types.",
	GenericsEndWithComma: "Trailing comma is not allowed at the end of generics.",
	UnexpectedTypeAnnotation: "Did not expect a type annotation here.",
	UnexpectedTypeCastInParameter: "Unexpected type cast in parameter position.",
	UnsupportedImportTypeArgument: "Argument in a type import must be a string literal.",
	UnsupportedParameterPropertyKind: "A parameter property may not be declared using a binding pattern.",
	UnsupportedSignatureParameterKind: ({ type: e }) => `Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got ${e}.`,
	LetInLexicalBinding: "'let' is not allowed to be used as a name in 'let' or 'const' declarations."
}, Cr = {
	UnexpectedLeadingDecorator: "Leading decorators must be attached to a class declaration.",
	DecoratorConstructor: "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
	TrailingDecorator: "Decorators must be attached to a class element.",
	SpreadElementDecorator: "Decorators can't be used with SpreadElement"
};
function wr(e, t, n) {
	let { tokTypes: r } = n, { tokTypes: i } = t;
	return class extends e {
		takeDecorators(e) {
			let t = this.decoratorStack[this.decoratorStack.length - 1];
			t.length && (e.decorators = t, this.resetStartLocationFromNode(e, t[0]), this.decoratorStack[this.decoratorStack.length - 1] = []);
		}
		parseDecorators(e) {
			let t = this.decoratorStack[this.decoratorStack.length - 1];
			for (; this.match(i.at);) {
				let e = this.parseDecorator();
				t.push(e);
			}
			this.match(r._export) ? e || this.unexpected() : this.canHaveLeadingDecorator() || this.raise(this.start, Cr.UnexpectedLeadingDecorator);
		}
		parseDecorator() {
			let e = this.startNode();
			this.next(), this.decoratorStack.push([]);
			let t = this.start, n = this.startLoc, i;
			if (this.match(r.parenL)) {
				let e = this.start, t = this.startLoc;
				if (this.next(), i = this.parseExpression(), this.expect(r.parenR), this.options.preserveParens) {
					let n = this.startNodeAt(e, t);
					n.expression = i, i = this.finishNode(n, "ParenthesizedExpression");
				}
			} else for (i = this.parseIdent(!1); this.eat(r.dot);) {
				let e = this.startNodeAt(t, n);
				e.object = i, e.property = this.parseIdent(!0), e.computed = !1, i = this.finishNode(e, "MemberExpression");
			}
			return e.expression = this.parseMaybeDecoratorArguments(i), this.decoratorStack.pop(), this.finishNode(e, "Decorator");
		}
		parseMaybeDecoratorArguments(e) {
			if (this.eat(r.parenL)) {
				let t = this.startNodeAtNode(e);
				return t.callee = e, t.arguments = this.parseExprList(r.parenR, !1), this.finishNode(t, "CallExpression");
			}
			return e;
		}
	};
}
var Tr = {
	quot: "\"",
	amp: "&",
	apos: "'",
	lt: "<",
	gt: ">",
	nbsp: "\xA0",
	iexcl: "¡",
	cent: "¢",
	pound: "£",
	curren: "¤",
	yen: "¥",
	brvbar: "¦",
	sect: "§",
	uml: "¨",
	copy: "©",
	ordf: "ª",
	laquo: "«",
	not: "¬",
	shy: "­",
	reg: "®",
	macr: "¯",
	deg: "°",
	plusmn: "±",
	sup2: "²",
	sup3: "³",
	acute: "´",
	micro: "µ",
	para: "¶",
	middot: "·",
	cedil: "¸",
	sup1: "¹",
	ordm: "º",
	raquo: "»",
	frac14: "¼",
	frac12: "½",
	frac34: "¾",
	iquest: "¿",
	Agrave: "À",
	Aacute: "Á",
	Acirc: "Â",
	Atilde: "Ã",
	Auml: "Ä",
	Aring: "Å",
	AElig: "Æ",
	Ccedil: "Ç",
	Egrave: "È",
	Eacute: "É",
	Ecirc: "Ê",
	Euml: "Ë",
	Igrave: "Ì",
	Iacute: "Í",
	Icirc: "Î",
	Iuml: "Ï",
	ETH: "Ð",
	Ntilde: "Ñ",
	Ograve: "Ò",
	Oacute: "Ó",
	Ocirc: "Ô",
	Otilde: "Õ",
	Ouml: "Ö",
	times: "×",
	Oslash: "Ø",
	Ugrave: "Ù",
	Uacute: "Ú",
	Ucirc: "Û",
	Uuml: "Ü",
	Yacute: "Ý",
	THORN: "Þ",
	szlig: "ß",
	agrave: "à",
	aacute: "á",
	acirc: "â",
	atilde: "ã",
	auml: "ä",
	aring: "å",
	aelig: "æ",
	ccedil: "ç",
	egrave: "è",
	eacute: "é",
	ecirc: "ê",
	euml: "ë",
	igrave: "ì",
	iacute: "í",
	icirc: "î",
	iuml: "ï",
	eth: "ð",
	ntilde: "ñ",
	ograve: "ò",
	oacute: "ó",
	ocirc: "ô",
	otilde: "õ",
	ouml: "ö",
	divide: "÷",
	oslash: "ø",
	ugrave: "ù",
	uacute: "ú",
	ucirc: "û",
	uuml: "ü",
	yacute: "ý",
	thorn: "þ",
	yuml: "ÿ",
	OElig: "Œ",
	oelig: "œ",
	Scaron: "Š",
	scaron: "š",
	Yuml: "Ÿ",
	fnof: "ƒ",
	circ: "ˆ",
	tilde: "˜",
	Alpha: "Α",
	Beta: "Β",
	Gamma: "Γ",
	Delta: "Δ",
	Epsilon: "Ε",
	Zeta: "Ζ",
	Eta: "Η",
	Theta: "Θ",
	Iota: "Ι",
	Kappa: "Κ",
	Lambda: "Λ",
	Mu: "Μ",
	Nu: "Ν",
	Xi: "Ξ",
	Omicron: "Ο",
	Pi: "Π",
	Rho: "Ρ",
	Sigma: "Σ",
	Tau: "Τ",
	Upsilon: "Υ",
	Phi: "Φ",
	Chi: "Χ",
	Psi: "Ψ",
	Omega: "Ω",
	alpha: "α",
	beta: "β",
	gamma: "γ",
	delta: "δ",
	epsilon: "ε",
	zeta: "ζ",
	eta: "η",
	theta: "θ",
	iota: "ι",
	kappa: "κ",
	lambda: "λ",
	mu: "μ",
	nu: "ν",
	xi: "ξ",
	omicron: "ο",
	pi: "π",
	rho: "ρ",
	sigmaf: "ς",
	sigma: "σ",
	tau: "τ",
	upsilon: "υ",
	phi: "φ",
	chi: "χ",
	psi: "ψ",
	omega: "ω",
	thetasym: "ϑ",
	upsih: "ϒ",
	piv: "ϖ",
	ensp: " ",
	emsp: " ",
	thinsp: " ",
	zwnj: "‌",
	zwj: "‍",
	lrm: "‎",
	rlm: "‏",
	ndash: "–",
	mdash: "—",
	lsquo: "‘",
	rsquo: "’",
	sbquo: "‚",
	ldquo: "“",
	rdquo: "”",
	bdquo: "„",
	dagger: "†",
	Dagger: "‡",
	bull: "•",
	hellip: "…",
	permil: "‰",
	prime: "′",
	Prime: "″",
	lsaquo: "‹",
	rsaquo: "›",
	oline: "‾",
	frasl: "⁄",
	euro: "€",
	image: "ℑ",
	weierp: "℘",
	real: "ℜ",
	trade: "™",
	alefsym: "ℵ",
	larr: "←",
	uarr: "↑",
	rarr: "→",
	darr: "↓",
	harr: "↔",
	crarr: "↵",
	lArr: "⇐",
	uArr: "⇑",
	rArr: "⇒",
	dArr: "⇓",
	hArr: "⇔",
	forall: "∀",
	part: "∂",
	exist: "∃",
	empty: "∅",
	nabla: "∇",
	isin: "∈",
	notin: "∉",
	ni: "∋",
	prod: "∏",
	sum: "∑",
	minus: "−",
	lowast: "∗",
	radic: "√",
	prop: "∝",
	infin: "∞",
	ang: "∠",
	and: "∧",
	or: "∨",
	cap: "∩",
	cup: "∪",
	int: "∫",
	there4: "∴",
	sim: "∼",
	cong: "≅",
	asymp: "≈",
	ne: "≠",
	equiv: "≡",
	le: "≤",
	ge: "≥",
	sub: "⊂",
	sup: "⊃",
	nsub: "⊄",
	sube: "⊆",
	supe: "⊇",
	oplus: "⊕",
	otimes: "⊗",
	perp: "⊥",
	sdot: "⋅",
	lceil: "⌈",
	rceil: "⌉",
	lfloor: "⌊",
	rfloor: "⌋",
	lang: "〈",
	rang: "〉",
	loz: "◊",
	spades: "♠",
	clubs: "♣",
	hearts: "♥",
	diams: "♦"
}, Er = /^[\da-fA-F]+$/, Dr = /^\d+$/;
function Or(e) {
	if (!e) return e;
	if (e.type === "JSXIdentifier") return e.name;
	if (e.type === "JSXNamespacedName") return e.namespace.name + ":" + e.name.name;
	if (e.type === "JSXMemberExpression") return Or(e.object) + "." + Or(e.property);
}
function kr(e, t, n, r) {
	let i = e.tokTypes, a = t.tokTypes, o = e.isNewLine, s = e.isIdentifierChar, c = Object.assign({
		allowNamespaces: !0,
		allowNamespacedObjects: !0
	}, r || {});
	return class extends n {
		jsx_readToken() {
			let e = "", t = this.pos;
			for (;;) {
				this.pos >= this.input.length && this.raise(this.start, "Unterminated JSX contents");
				let n = this.input.charCodeAt(this.pos);
				switch (n) {
					case 60:
					case 123: return this.pos === this.start ? n === 60 && this.exprAllowed ? (++this.pos, this.finishToken(a.jsxTagStart)) : this.getTokenFromCode(n) : (e += this.input.slice(t, this.pos), this.finishToken(a.jsxText, e));
					case 38:
						e += this.input.slice(t, this.pos), e += this.jsx_readEntity(), t = this.pos;
						break;
					case 62:
					case 125: this.raise(this.pos, "Unexpected token `" + this.input[this.pos] + "`. Did you mean `" + (n === 62 ? "&gt;" : "&rbrace;") + "` or `{\"" + this.input[this.pos] + "\"}`?");
					default: o(n) ? (e += this.input.slice(t, this.pos), e += this.jsx_readNewLine(!0), t = this.pos) : ++this.pos;
				}
			}
		}
		jsx_readNewLine(e) {
			let t = this.input.charCodeAt(this.pos), n;
			return ++this.pos, t === 13 && this.input.charCodeAt(this.pos) === 10 ? (++this.pos, n = e ? "\n" : "\r\n") : n = String.fromCharCode(t), this.options.locations && (++this.curLine, this.lineStart = this.pos), n;
		}
		jsx_readString(e) {
			let t = "", n = ++this.pos;
			for (;;) {
				this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
				let r = this.input.charCodeAt(this.pos);
				if (r === e) break;
				r === 38 ? (t += this.input.slice(n, this.pos), t += this.jsx_readEntity(), n = this.pos) : o(r) ? (t += this.input.slice(n, this.pos), t += this.jsx_readNewLine(!1), n = this.pos) : ++this.pos;
			}
			return t += this.input.slice(n, this.pos++), this.finishToken(i.string, t);
		}
		jsx_readEntity() {
			let e = "", t = 0, n, r = this.input[this.pos];
			r !== "&" && this.raise(this.pos, "Entity must start with an ampersand");
			let i = ++this.pos;
			for (; this.pos < this.input.length && t++ < 10;) {
				if (r = this.input[this.pos++], r === ";") {
					e[0] === "#" ? e[1] === "x" ? (e = e.substr(2), Er.test(e) && (n = String.fromCharCode(parseInt(e, 16)))) : (e = e.substr(1), Dr.test(e) && (n = String.fromCharCode(parseInt(e, 10)))) : n = Tr[e];
					break;
				}
				e += r;
			}
			return n || (this.pos = i, "&");
		}
		jsx_readWord() {
			let e, t = this.pos;
			do
				e = this.input.charCodeAt(++this.pos);
			while (s(e) || e === 45);
			return this.finishToken(a.jsxName, this.input.slice(t, this.pos));
		}
		jsx_parseIdentifier() {
			let e = this.startNode();
			return this.type === a.jsxName ? e.name = this.value : this.type.keyword ? e.name = this.type.keyword : this.unexpected(), this.next(), this.finishNode(e, "JSXIdentifier");
		}
		jsx_parseNamespacedName() {
			let e = this.start, t = this.startLoc, n = this.jsx_parseIdentifier();
			if (!c.allowNamespaces || !this.eat(i.colon)) return n;
			var r = this.startNodeAt(e, t);
			return r.namespace = n, r.name = this.jsx_parseIdentifier(), this.finishNode(r, "JSXNamespacedName");
		}
		jsx_parseElementName() {
			if (this.type === a.jsxTagEnd) return "";
			let e = this.start, t = this.startLoc, n = this.jsx_parseNamespacedName();
			for (this.type === i.dot && n.type === "JSXNamespacedName" && !c.allowNamespacedObjects && this.unexpected(); this.eat(i.dot);) {
				let r = this.startNodeAt(e, t);
				r.object = n, r.property = this.jsx_parseIdentifier(), n = this.finishNode(r, "JSXMemberExpression");
			}
			return n;
		}
		jsx_parseAttributeValue() {
			switch (this.type) {
				case i.braceL:
					let e = this.jsx_parseExpressionContainer();
					return e.expression.type === "JSXEmptyExpression" && this.raise(e.start, "JSX attributes must only be assigned a non-empty expression"), e;
				case a.jsxTagStart:
				case i.string: return this.parseExprAtom();
				default: this.raise(this.start, "JSX value should be either an expression or a quoted JSX text");
			}
		}
		jsx_parseEmptyExpression() {
			let e = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
			return this.finishNodeAt(e, "JSXEmptyExpression", this.start, this.startLoc);
		}
		jsx_parseExpressionContainer() {
			let e = this.startNode();
			return this.next(), e.expression = this.type === i.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression(), this.expect(i.braceR), this.finishNode(e, "JSXExpressionContainer");
		}
		jsx_parseAttribute() {
			let e = this.startNode();
			return this.eat(i.braceL) ? (this.expect(i.ellipsis), e.argument = this.parseMaybeAssign(), this.expect(i.braceR), this.finishNode(e, "JSXSpreadAttribute")) : (e.name = this.jsx_parseNamespacedName(), e.value = this.eat(i.eq) ? this.jsx_parseAttributeValue() : null, this.finishNode(e, "JSXAttribute"));
		}
		jsx_parseOpeningElementAt(e, t) {
			let n = this.startNodeAt(e, t);
			n.attributes = [];
			let r = this.jsx_parseElementName();
			for (r && (n.name = r); this.type !== i.slash && this.type !== a.jsxTagEnd;) n.attributes.push(this.jsx_parseAttribute());
			return n.selfClosing = this.eat(i.slash), this.expect(a.jsxTagEnd), this.finishNode(n, r ? "JSXOpeningElement" : "JSXOpeningFragment");
		}
		jsx_parseClosingElementAt(e, t) {
			let n = this.startNodeAt(e, t), r = this.jsx_parseElementName();
			return r && (n.name = r), this.expect(a.jsxTagEnd), this.finishNode(n, r ? "JSXClosingElement" : "JSXClosingFragment");
		}
		jsx_parseElementAt(e, t) {
			let n = this.startNodeAt(e, t), r = [], o = this.jsx_parseOpeningElementAt(e, t), s = null;
			if (!o.selfClosing) {
				contents: for (;;) switch (this.type) {
					case a.jsxTagStart:
						if (e = this.start, t = this.startLoc, this.next(), this.eat(i.slash)) {
							s = this.jsx_parseClosingElementAt(e, t);
							break contents;
						}
						r.push(this.jsx_parseElementAt(e, t));
						break;
					case a.jsxText:
						r.push(this.parseExprAtom());
						break;
					case i.braceL:
						r.push(this.jsx_parseExpressionContainer());
						break;
					default: this.unexpected();
				}
				Or(s.name) !== Or(o.name) && this.raise(s.start, "Expected corresponding JSX closing tag for <" + Or(o.name) + ">");
			}
			let c = o.name ? "Element" : "Fragment";
			return n["opening" + c] = o, n["closing" + c] = s, n.children = r, this.type === i.relational && this.value === "<" && this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag"), this.finishNode(n, "JSX" + c);
		}
		jsx_parseText() {
			let e = this.parseLiteral(this.value);
			return e.type = "JSXText", e;
		}
		jsx_parseElement() {
			let e = this.start, t = this.startLoc;
			return this.next(), this.jsx_parseElementAt(e, t);
		}
	};
}
function Ar(e, t, n) {
	let { tokTypes: r } = t, { tokTypes: i } = n;
	return class extends e {
		parseMaybeImportAttributes(e) {
			if (this.type === i._with || this.type === r.assert) {
				this.next();
				let t = this.parseImportAttributes();
				t && (e.attributes = t);
			}
		}
		parseImportAttributes() {
			this.expect(i.braceL);
			let e = this.parseWithEntries();
			return this.expect(i.braceR), e;
		}
		parseWithEntries() {
			let e = [], t = /* @__PURE__ */ new Set();
			do {
				if (this.type === i.braceR) break;
				let n = this.startNode(), r;
				r = this.type === i.string ? this.parseLiteral(this.value) : this.parseIdent(!0), this.next(), n.key = r, t.has(n.key.name) && this.raise(this.pos, "Duplicated key in attributes"), t.add(n.key.name), this.type !== i.string && this.raise(this.pos, "Only string is supported as an attribute value"), n.value = this.parseLiteral(this.value), e.push(this.finishNode(n, "ImportAttribute"));
			} while (this.eat(i.comma));
			return e;
		}
	};
}
var jr = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
function Mr(e) {
	if (!e) throw Error("Assert fail");
}
function Nr(e) {
	return e === "accessor";
}
function Pr(e) {
	return e === "in" || e === "out";
}
var Fr = 1, Ir = 2, Lr = 4, W = {
	SCOPE_TOP: 1,
	SCOPE_FUNCTION: 2,
	SCOPE_ASYNC: 4,
	SCOPE_GENERATOR: 8,
	SCOPE_ARROW: 16,
	SCOPE_SIMPLE_CATCH: 32,
	SCOPE_SUPER: 64,
	SCOPE_DIRECT_SUPER: 128,
	SCOPE_CLASS_STATIC_BLOCK: 256,
	SCOPE_VAR: 256,
	BIND_NONE: 0,
	BIND_VAR: 1,
	BIND_LEXICAL: 2,
	BIND_FUNCTION: 3,
	BIND_SIMPLE_CATCH: 4,
	BIND_OUTSIDE: 5,
	BIND_TS_TYPE: 6,
	BIND_TS_INTERFACE: 7,
	BIND_TS_NAMESPACE: 1032,
	BIND_FLAGS_TS_EXPORT_ONLY: 1024,
	BIND_FLAGS_TS_IMPORT: 4096,
	BIND_FLAGS_TS_ENUM: 256,
	BIND_FLAGS_TS_CONST_ENUM: 512,
	BIND_FLAGS_CLASS: 128
};
function Rr(e, t) {
	return W.SCOPE_FUNCTION | (e ? W.SCOPE_ASYNC : 0) | (t ? W.SCOPE_GENERATOR : 0);
}
function zr(e) {
	if (e.type !== "MemberExpression") return !1;
	let { computed: t, property: n } = e;
	return t && (n.type !== "TemplateLiteral" || n.expressions.length > 0) ? !1 : Br(e.object);
}
function Br(e) {
	return e.type === "Identifier" ? !0 : e.type !== "MemberExpression" || e.computed ? !1 : Br(e.object);
}
function Vr(e) {
	return e === "private" || e === "public" || e === "protected";
}
function Hr(e) {
	return !!e.startsExpr;
}
function Ur(e) {
	if (e == null) throw Error(`Unexpected ${e} value.`);
	return e;
}
function Wr(e) {
	switch (e) {
		case "any": return "TSAnyKeyword";
		case "boolean": return "TSBooleanKeyword";
		case "bigint": return "TSBigIntKeyword";
		case "never": return "TSNeverKeyword";
		case "number": return "TSNumberKeyword";
		case "object": return "TSObjectKeyword";
		case "string": return "TSStringKeyword";
		case "symbol": return "TSSymbolKeyword";
		case "undefined": return "TSUndefinedKeyword";
		case "unknown": return "TSUnknownKeyword";
		default: return;
	}
}
function Gr(e) {
	let { dts: t = !1 } = e || {}, n = !!e?.jsx;
	return function(r) {
		let i = r.acorn || Re, a = nr(i), o = i.tokTypes, s = i.keywordTypes, c = i.isIdentifierStart, l = i.lineBreak, u = i.isNewLine, d = i.tokContexts, f = i.isIdentifierChar, { tokTypes: p, tokContexts: m, keywordsRegExp: h, tokenIsLiteralPropertyName: g, tokenIsTemplate: _, tokenIsTSDeclarationStart: v, tokenIsIdentifier: y, tokenIsKeywordOrIdentifier: b, tokenIsTSTypeOperator: ee } = a;
		function te(e, t, n = e.length) {
			for (let r = t; r < n; r++) {
				let t = e.charCodeAt(r);
				if (u(t)) return r < n - 1 && t === 13 && e.charCodeAt(r + 1) === 10 ? r + 2 : r + 1;
			}
			return -1;
		}
		r = wr(r, a, i), e?.jsx && (r = kr(i, a, r, typeof e.jsx == "boolean" ? {} : e.jsx)), r = Ar(r, a, i);
		class ne extends r {
			constructor(e, t, n) {
				super(e, t, n), this.preValue = null, this.preToken = null, this.isLookahead = !1, this.isAmbientContext = !1, this.inAbstractClass = !1, this.inType = !1, this.inDisallowConditionalTypesContext = !1, this.maybeInArrowParameters = !1, this.shouldParseArrowReturnType = void 0, this.shouldParseAsyncArrowReturnType = void 0, this.decoratorStack = [[]], this.importsStack = [[]], this.importOrExportOuterKind = void 0, this.tsParseConstModifier = (e) => {
					this.tsParseModifiers({
						modified: e,
						allowedModifiers: ["const"],
						disallowedModifiers: ["in", "out"],
						errorTemplate: U.InvalidModifierOnTypeParameterPositions
					});
				}, this.ecmaVersion = this.options.ecmaVersion;
			}
			static get acornTypeScript() {
				return a;
			}
			get acornTypeScript() {
				return a;
			}
			getTokenFromCodeInType(e) {
				return e === 62 || e === 60 ? this.finishOp(o.relational, 1) : super.getTokenFromCode(e);
			}
			readToken(t) {
				if (!this.inType) {
					let n = this.curContext();
					if (n === m.tc_expr) return this.jsx_readToken();
					if (n === m.tc_oTag || n === m.tc_cTag) {
						if (c(t)) return this.jsx_readWord();
						if (t == 62) return ++this.pos, this.finishToken(p.jsxTagEnd);
						if ((t === 34 || t === 39) && n == m.tc_oTag) return this.jsx_readString(t);
					}
					if (t === 60 && this.exprAllowed && this.input.charCodeAt(this.pos + 1) !== 33) return ++this.pos, e?.jsx ? this.finishToken(p.jsxTagStart) : this.finishToken(o.relational, "<");
				}
				return super.readToken(t);
			}
			getTokenFromCode(e) {
				return this.inType ? this.getTokenFromCodeInType(e) : e === 64 ? (++this.pos, this.finishToken(p.at)) : super.getTokenFromCode(e);
			}
			isAbstractClass() {
				return this.ts_isContextual(p.abstract) && this.lookahead().type === o._class;
			}
			finishNode(e, t) {
				return e.type !== "" && e.end !== 0 ? e : super.finishNode(e, t);
			}
			tryParse(e, t = this.cloneCurLookaheadState()) {
				let n = { node: null };
				try {
					return {
						node: e((e = null) => {
							throw n.node = e, n;
						}),
						error: null,
						thrown: !1,
						aborted: !1,
						failState: null
					};
				} catch (e) {
					let r = this.getCurLookaheadState();
					if (this.setLookaheadState(t), e instanceof SyntaxError) return {
						node: null,
						error: e,
						thrown: !0,
						aborted: !1,
						failState: r
					};
					if (e === n) return {
						node: n.node,
						error: null,
						thrown: !1,
						aborted: !0,
						failState: r
					};
					throw e;
				}
			}
			setOptionalParametersError(e, t) {
				e.optionalParametersLoc = t?.loc ?? this.startLoc;
			}
			reScan_lt_gt() {
				this.type === o.relational && (--this.pos, this.readToken_lt_gt(this.fullCharCodeAtPos()));
			}
			reScan_lt() {
				let { type: e } = this;
				return e === o.bitShift ? (this.pos -= 2, this.finishOp(o.relational, 1), o.relational) : e;
			}
			resetEndLocation(e, t = this.lastTokEnd, n = this.lastTokEndLoc) {
				e.end = t, e.loc.end = n, this.options.ranges && (e.range[1] = t);
			}
			startNodeAtNode(e) {
				return super.startNodeAt(e.start, e.loc.start);
			}
			nextTokenStart() {
				return this.nextTokenStartSince(this.pos);
			}
			tsHasSomeModifiers(e, t) {
				return t.some((t) => Vr(t) ? e.accessibility === t : !!e[t]);
			}
			tsIsStartOfStaticBlocks() {
				return this.isContextual("static") && this.lookaheadCharCode() === 123;
			}
			tsCheckForInvalidTypeCasts(e) {
				e.forEach((e) => {
					e?.type === "TSTypeCastExpression" && this.raise(e.typeAnnotation.start, U.UnexpectedTypeAnnotation);
				});
			}
			atPossibleAsyncArrow(e) {
				return e.type === "Identifier" && e.name === "async" && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start === 5 && e.start === this.potentialArrowAt;
			}
			tsIsIdentifier() {
				return y(this.type);
			}
			tsTryParseTypeOrTypePredicateAnnotation() {
				return this.match(o.colon) ? this.tsParseTypeOrTypePredicateAnnotation(o.colon) : void 0;
			}
			tsTryParseGenericAsyncArrowFunction(e, t, n) {
				if (!this.tsMatchLeftRelational()) return;
				let r = this.maybeInArrowParameters;
				this.maybeInArrowParameters = !0;
				let i = this.tsTryParseAndCatch(() => {
					let n = this.startNodeAt(e, t);
					return n.typeParameters = this.tsParseTypeParameters(this.tsParseConstModifier), super.parseFunctionParams(n), n.returnType = this.tsTryParseTypeOrTypePredicateAnnotation(), this.expect(o.arrow), n;
				});
				if (this.maybeInArrowParameters = r, i) return super.parseArrowExpression(i, null, !0, n);
			}
			tsParseTypeArgumentsInExpression() {
				if (this.reScan_lt() === o.relational) return this.tsParseTypeArguments();
			}
			tsInNoContext(e) {
				let t = this.context;
				this.context = [t[0]];
				try {
					return e();
				} finally {
					this.context = t;
				}
			}
			tsTryParseTypeAnnotation() {
				return this.match(o.colon) ? this.tsParseTypeAnnotation() : void 0;
			}
			isUnparsedContextual(e, t) {
				let n = e + t.length;
				if (this.input.slice(e, n) === t) {
					let e = this.input.charCodeAt(n);
					return !(f(e) || (e & 64512) == 55296);
				}
				return !1;
			}
			isAbstractConstructorSignature() {
				return this.ts_isContextual(p.abstract) && this.lookahead().type === o._new;
			}
			nextTokenStartSince(e) {
				return jr.lastIndex = e, jr.test(this.input) ? jr.lastIndex : e;
			}
			lookaheadCharCode() {
				return this.input.charCodeAt(this.nextTokenStart());
			}
			compareLookaheadState(e, t) {
				for (let n of Object.keys(e)) if (e[n] !== t[n]) return !1;
				return !0;
			}
			createLookaheadState() {
				this.value = null, this.context = [this.curContext()];
			}
			getCurLookaheadState() {
				return {
					endLoc: this.endLoc,
					lastTokEnd: this.lastTokEnd,
					lastTokStart: this.lastTokStart,
					lastTokStartLoc: this.lastTokStartLoc,
					pos: this.pos,
					value: this.value,
					type: this.type,
					start: this.start,
					end: this.end,
					context: this.context,
					startLoc: this.startLoc,
					lastTokEndLoc: this.lastTokEndLoc,
					curLine: this.curLine,
					lineStart: this.lineStart,
					curPosition: this.curPosition,
					containsEsc: this.containsEsc
				};
			}
			cloneCurLookaheadState() {
				return {
					pos: this.pos,
					value: this.value,
					type: this.type,
					start: this.start,
					end: this.end,
					context: this.context && this.context.slice(),
					startLoc: this.startLoc,
					lastTokEndLoc: this.lastTokEndLoc,
					endLoc: this.endLoc,
					lastTokEnd: this.lastTokEnd,
					lastTokStart: this.lastTokStart,
					lastTokStartLoc: this.lastTokStartLoc,
					curLine: this.curLine,
					lineStart: this.lineStart,
					curPosition: this.curPosition,
					containsEsc: this.containsEsc
				};
			}
			setLookaheadState(e) {
				this.pos = e.pos, this.value = e.value, this.endLoc = e.endLoc, this.lastTokEnd = e.lastTokEnd, this.lastTokStart = e.lastTokStart, this.lastTokStartLoc = e.lastTokStartLoc, this.type = e.type, this.start = e.start, this.end = e.end, this.context = e.context, this.startLoc = e.startLoc, this.lastTokEndLoc = e.lastTokEndLoc, this.curLine = e.curLine, this.lineStart = e.lineStart, this.curPosition = e.curPosition, this.containsEsc = e.containsEsc;
			}
			tsLookAhead(e) {
				let t = this.getCurLookaheadState(), n = e();
				return this.setLookaheadState(t), n;
			}
			lookahead(e) {
				let t = this.getCurLookaheadState();
				if (this.createLookaheadState(), this.isLookahead = !0, e !== void 0) for (let t = 0; t < e; t++) this.nextToken();
				else this.nextToken();
				this.isLookahead = !1;
				let n = this.getCurLookaheadState();
				return this.setLookaheadState(t), n;
			}
			readWord() {
				let e = this.readWord1(), t = o.name;
				return this.keywords.test(e) ? t = s[e] : new RegExp(h).test(e) && (t = p[e]), this.finishToken(t, e);
			}
			skipBlockComment() {
				let e;
				this.isLookahead || (e = this.options.onComment && this.curPosition());
				let t = this.pos, n = this.input.indexOf("*/", this.pos += 2);
				if (n === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = n + 2, this.options.locations) for (let e, n = t; (e = te(this.input, n, this.pos)) > -1;) ++this.curLine, n = this.lineStart = e;
				this.isLookahead || this.options.onComment && this.options.onComment(!0, this.input.slice(t + 2, n), t, this.pos, e, this.curPosition());
			}
			skipLineComment(e) {
				let t = this.pos, n;
				this.isLookahead || (n = this.options.onComment && this.curPosition());
				let r = this.input.charCodeAt(this.pos += e);
				for (; this.pos < this.input.length && !u(r);) r = this.input.charCodeAt(++this.pos);
				this.isLookahead || this.options.onComment && this.options.onComment(!1, this.input.slice(t + e, this.pos), t, this.pos, n, this.curPosition());
			}
			finishToken(e, t) {
				this.preValue = this.value, this.preToken = this.type, this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
				let n = this.type;
				this.type = e, this.value = t, this.isLookahead || this.updateContext(n);
			}
			resetStartLocation(e, t, n) {
				e.start = t, e.loc.start = n, this.options.ranges && (e.range[0] = t);
			}
			isLineTerminator() {
				return this.eat(o.semi) || super.canInsertSemicolon();
			}
			hasFollowingLineBreak() {
				return yr.lastIndex = this.end, yr.test(this.input);
			}
			addExtra(e, t, n, r = !0) {
				if (!e) return;
				let i = e.extra = e.extra || {};
				r ? i[t] = n : Object.defineProperty(i, t, {
					enumerable: r,
					value: n
				});
			}
			isLiteralPropertyName() {
				return g(this.type);
			}
			hasPrecedingLineBreak() {
				return l.test(this.input.slice(this.lastTokEnd, this.start));
			}
			createIdentifier(e, t) {
				return e.name = t, this.finishNode(e, "Identifier");
			}
			resetStartLocationFromNode(e, t) {
				this.resetStartLocation(e, t.start, t.loc.start);
			}
			isThisParam(e) {
				return e.type === "Identifier" && e.name === "this";
			}
			isLookaheadContextual(e) {
				let t = this.nextTokenStart();
				return this.isUnparsedContextual(t, e);
			}
			ts_type_isContextual(e, t) {
				return e === t && !this.containsEsc;
			}
			ts_isContextual(e) {
				return this.type === e && !this.containsEsc;
			}
			ts_isContextualWithState(e, t) {
				return e.type === t && !e.containsEsc;
			}
			isContextualWithState(e, t) {
				return t.type === o.name && t.value === e && !t.containsEsc;
			}
			tsIsStartOfMappedType() {
				return this.next(), this.eat(o.plusMin) ? this.ts_isContextual(p.readonly) : (this.ts_isContextual(p.readonly) && this.next(), !this.match(o.bracketL) || (this.next(), !this.tsIsIdentifier()) ? !1 : (this.next(), this.match(o._in)));
			}
			tsInDisallowConditionalTypesContext(e) {
				let t = this.inDisallowConditionalTypesContext;
				this.inDisallowConditionalTypesContext = !0;
				try {
					return e();
				} finally {
					this.inDisallowConditionalTypesContext = t;
				}
			}
			tsTryParseType() {
				return this.tsEatThenParseType(o.colon);
			}
			match(e) {
				return this.type === e;
			}
			matchJsx(e) {
				return this.type === a.tokTypes[e];
			}
			ts_eatWithState(e, t, n) {
				if (e === n.type) {
					for (let e = 0; e < t; e++) this.next();
					return !0;
				} else return !1;
			}
			ts_eatContextualWithState(e, t, n) {
				if (h.test(e)) {
					if (this.ts_isContextualWithState(n, p[e])) {
						for (let e = 0; e < t; e++) this.next();
						return !0;
					}
					return !1;
				} else {
					if (!this.isContextualWithState(e, n)) return !1;
					for (let e = 0; e < t; e++) this.next();
					return !0;
				}
			}
			canHaveLeadingDecorator() {
				return this.match(o._class) || this.isAbstractClass();
			}
			eatContextual(e) {
				return h.test(e) ? this.ts_isContextual(p[e]) ? (this.next(), !0) : !1 : super.eatContextual(e);
			}
			tsIsExternalModuleReference() {
				return this.isContextual("require") && this.lookaheadCharCode() === 40;
			}
			tsParseExternalModuleReference() {
				let e = this.startNode();
				return this.expectContextual("require"), this.expect(o.parenL), this.match(o.string) || this.unexpected(), e.expression = this.parseExprAtom(), this.expect(o.parenR), this.finishNode(e, "TSExternalModuleReference");
			}
			tsParseEntityName(e = !0) {
				let t = this.parseIdent(e);
				for (; this.eat(o.dot);) {
					let n = this.startNodeAtNode(t);
					n.left = t, n.right = this.parseIdent(e), t = this.finishNode(n, "TSQualifiedName");
				}
				return t;
			}
			tsParseEnumMember() {
				let e = this.startNode();
				return e.id = this.match(o.string) ? this.parseLiteral(this.value) : this.parseIdent(!0), this.eat(o.eq) && (e.initializer = this.parseMaybeAssign()), this.finishNode(e, "TSEnumMember");
			}
			tsParseEnumDeclaration(e, t = {}) {
				return t.const && (e.const = !0), t.declare && (e.declare = !0), this.expectContextual("enum"), e.id = this.parseIdent(), this.checkLValSimple(e.id), this.expect(o.braceL), e.members = this.tsParseDelimitedList("EnumMembers", this.tsParseEnumMember.bind(this)), this.expect(o.braceR), this.finishNode(e, "TSEnumDeclaration");
			}
			tsParseModuleBlock() {
				let e = this.startNode();
				for (this.enterScope(rr), this.expect(o.braceL), e.body = []; this.type !== o.braceR;) {
					let t = this.parseStatement(null, !0);
					e.body.push(t);
				}
				return this.next(), super.exitScope(), this.finishNode(e, "TSModuleBlock");
			}
			tsParseAmbientExternalModuleDeclaration(e) {
				return this.ts_isContextual(p.global) ? (e.global = !0, e.id = this.parseIdent()) : this.match(o.string) ? e.id = this.parseLiteral(this.value) : this.unexpected(), this.match(o.braceL) ? (this.enterScope(ir), e.body = this.tsParseModuleBlock(), super.exitScope()) : super.semicolon(), this.finishNode(e, "TSModuleDeclaration");
			}
			tsTryParseDeclare(e) {
				if (this.isLineTerminator()) return;
				let t = this.type, n;
				return this.isContextual("let") && (t = o._var, n = "let"), this.tsInAmbientContext(() => {
					if (t === o._function) return e.declare = !0, this.parseFunctionStatement(e, !1, !0);
					if (t === o._class) return e.declare = !0, this.parseClass(e, !0);
					if (t === p.enum) return this.tsParseEnumDeclaration(e, { declare: !0 });
					if (t === p.global) return this.tsParseAmbientExternalModuleDeclaration(e);
					if (t === o._const || t === o._var) return !this.match(o._const) || !this.isLookaheadContextual("enum") ? (e.declare = !0, this.parseVarStatement(e, n || this.value, !0)) : (this.expect(o._const), this.tsParseEnumDeclaration(e, {
						const: !0,
						declare: !0
					}));
					if (t === p.interface) {
						let t = this.tsParseInterfaceDeclaration(e, { declare: !0 });
						if (t) return t;
					}
					if (y(t)) return this.tsParseDeclaration(e, this.value, !0);
				});
			}
			tsIsListTerminator(e) {
				switch (e) {
					case "EnumMembers":
					case "TypeMembers": return this.match(o.braceR);
					case "HeritageClauseElement": return this.match(o.braceL);
					case "TupleElementTypes": return this.match(o.bracketR);
					case "TypeParametersOrArguments": return this.tsMatchRightRelational();
				}
			}
			tsParseDelimitedListWorker(e, t, n, r) {
				let i = [], a = -1;
				for (; !this.tsIsListTerminator(e);) {
					a = -1;
					let r = t();
					if (r == null) return;
					if (i.push(r), this.eat(o.comma)) {
						a = this.lastTokStart;
						continue;
					}
					if (this.tsIsListTerminator(e)) break;
					n && this.expect(o.comma);
					return;
				}
				return r && (r.value = a), i;
			}
			tsParseDelimitedList(e, t, n) {
				return Ur(this.tsParseDelimitedListWorker(e, t, !0, n));
			}
			tsParseBracketedList(e, t, n, r, i) {
				r || (n ? this.expect(o.bracketL) : this.expect(o.relational));
				let a = this.tsParseDelimitedList(e, t, i);
				return n ? this.expect(o.bracketR) : this.expect(o.relational), a;
			}
			tsParseTypeParameterName() {
				return this.parseIdent().name;
			}
			tsEatThenParseType(e) {
				return this.match(e) ? this.tsNextThenParseType() : void 0;
			}
			tsExpectThenParseType(e) {
				return this.tsDoThenParseType(() => this.expect(e));
			}
			tsNextThenParseType() {
				return this.tsDoThenParseType(() => this.next());
			}
			tsDoThenParseType(e) {
				return this.tsInType(() => (e(), this.tsParseType()));
			}
			tsSkipParameterStart() {
				if (y(this.type) || this.match(o._this)) return this.next(), !0;
				if (this.match(o.braceL)) try {
					return this.parseObj(!0), !0;
				} catch {
					return !1;
				}
				if (this.match(o.bracketL)) {
					this.next();
					try {
						return this.parseBindingList(o.bracketR, !0, !0), !0;
					} catch {
						return !1;
					}
				}
				return !1;
			}
			tsIsUnambiguouslyStartOfFunctionType() {
				return this.next(), !!(this.match(o.parenR) || this.match(o.ellipsis) || this.tsSkipParameterStart() && (this.match(o.colon) || this.match(o.comma) || this.match(o.question) || this.match(o.eq) || this.match(o.parenR) && (this.next(), this.match(o.arrow))));
			}
			tsIsStartOfFunctionType() {
				return this.tsMatchLeftRelational() ? !0 : this.match(o.parenL) && this.tsLookAhead(this.tsIsUnambiguouslyStartOfFunctionType.bind(this));
			}
			tsInAllowConditionalTypesContext(e) {
				let t = this.inDisallowConditionalTypesContext;
				this.inDisallowConditionalTypesContext = !1;
				try {
					return e();
				} finally {
					this.inDisallowConditionalTypesContext = t;
				}
			}
			tsParseBindingListForSignature() {
				return super.parseBindingList(o.parenR, !0, !0).map((e) => (e.type !== "Identifier" && e.type !== "RestElement" && e.type !== "ObjectPattern" && e.type !== "ArrayPattern" && this.raise(e.start, U.UnsupportedSignatureParameterKind({ type: e.type })), e));
			}
			tsParseTypePredicateAsserts() {
				if (this.type !== p.asserts) return !1;
				let e = this.containsEsc;
				return this.next(), !y(this.type) && !this.match(o._this) ? !1 : (e && this.raise(this.lastTokStart, "Escape sequence in keyword asserts"), !0);
			}
			tsParseThisTypeNode() {
				let e = this.startNode();
				return this.next(), this.finishNode(e, "TSThisType");
			}
			tsParseTypeAnnotation(e = !0, t = this.startNode()) {
				return this.tsInType(() => {
					e && this.expect(o.colon), t.typeAnnotation = this.tsParseType();
				}), this.finishNode(t, "TSTypeAnnotation");
			}
			tsParseThisTypePredicate(e) {
				this.next();
				let t = this.startNodeAtNode(e);
				return t.parameterName = e, t.typeAnnotation = this.tsParseTypeAnnotation(!1), t.asserts = !1, this.finishNode(t, "TSTypePredicate");
			}
			tsParseThisTypeOrThisTypePredicate() {
				let e = this.tsParseThisTypeNode();
				return this.isContextual("is") && !this.hasPrecedingLineBreak() ? this.tsParseThisTypePredicate(e) : e;
			}
			tsParseTypePredicatePrefix() {
				let e = this.parseIdent();
				if (this.isContextual("is") && !this.hasPrecedingLineBreak()) return this.next(), e;
			}
			tsParseTypeOrTypePredicateAnnotation(e) {
				return this.tsInType(() => {
					let t = this.startNode();
					this.expect(e);
					let n = this.startNode(), r = !!this.tsTryParse(this.tsParseTypePredicateAsserts.bind(this));
					if (r && this.match(o._this)) {
						let e = this.tsParseThisTypeOrThisTypePredicate();
						return e.type === "TSThisType" ? (n.parameterName = e, n.asserts = !0, n.typeAnnotation = null, e = this.finishNode(n, "TSTypePredicate")) : (this.resetStartLocationFromNode(e, n), e.asserts = !0), t.typeAnnotation = e, this.finishNode(t, "TSTypeAnnotation");
					}
					let i = this.tsIsIdentifier() && this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));
					if (!i) return r ? (n.parameterName = this.parseIdent(), n.asserts = r, n.typeAnnotation = null, t.typeAnnotation = this.finishNode(n, "TSTypePredicate"), this.finishNode(t, "TSTypeAnnotation")) : this.tsParseTypeAnnotation(!1, t);
					let a = this.tsParseTypeAnnotation(!1);
					return n.parameterName = i, n.typeAnnotation = a, n.asserts = r, t.typeAnnotation = this.finishNode(n, "TSTypePredicate"), this.finishNode(t, "TSTypeAnnotation");
				});
			}
			tsFillSignature(e, t) {
				let n = e === o.arrow;
				t.typeParameters = this.tsTryParseTypeParameters(), this.expect(o.parenL), t.parameters = this.tsParseBindingListForSignature(), (n || this.match(e)) && (t.typeAnnotation = this.tsParseTypeOrTypePredicateAnnotation(e));
			}
			tsTryNextParseConstantContext() {
				if (this.lookahead().type !== o._const) return null;
				this.next();
				let e = this.tsParseTypeReference();
				return (e.typeParameters || e.typeArguments) && this.raise(e.typeName.start, U.CannotFindName({ name: "const" })), e;
			}
			tsParseFunctionOrConstructorType(e, t) {
				let n = this.startNode();
				return e === "TSConstructorType" && (n.abstract = !!t, t && this.next(), this.next()), this.tsInAllowConditionalTypesContext(() => this.tsFillSignature(o.arrow, n)), this.finishNode(n, e);
			}
			tsParseUnionOrIntersectionType(e, t, n) {
				let r = this.startNode(), i = this.eat(n), a = [];
				do
					a.push(t());
				while (this.eat(n));
				return a.length === 1 && !i ? a[0] : (r.types = a, this.finishNode(r, e));
			}
			tsCheckTypeAnnotationForReadOnly(e) {
				switch (e.typeAnnotation.type) {
					case "TSTupleType":
					case "TSArrayType": return;
					default: this.raise(e.start, U.UnexpectedReadonly);
				}
			}
			tsParseTypeOperator() {
				let e = this.startNode(), t = this.value;
				return this.next(), e.operator = t, e.typeAnnotation = this.tsParseTypeOperatorOrHigher(), t === "readonly" && this.tsCheckTypeAnnotationForReadOnly(e), this.finishNode(e, "TSTypeOperator");
			}
			tsParseConstraintForInferType() {
				if (this.eat(o._extends)) {
					let e = this.tsInDisallowConditionalTypesContext(() => this.tsParseType());
					if (this.inDisallowConditionalTypesContext || !this.match(o.question)) return e;
				}
			}
			tsParseInferType() {
				let e = this.startNode();
				this.expectContextual("infer");
				let t = this.startNode();
				return t.name = this.tsParseTypeParameterName(), t.constraint = this.tsTryParse(() => this.tsParseConstraintForInferType()), e.typeParameter = this.finishNode(t, "TSTypeParameter"), this.finishNode(e, "TSInferType");
			}
			tsParseLiteralTypeNode() {
				let e = this.startNode();
				return e.literal = (() => {
					switch (this.type) {
						case o.num:
						case o.string:
						case o._true:
						case o._false: return this.parseExprAtom();
						default: this.unexpected();
					}
				})(), this.finishNode(e, "TSLiteralType");
			}
			tsParseImportType() {
				let e = this.startNode();
				return this.expect(o._import), this.expect(o.parenL), this.match(o.string) || this.raise(this.start, U.UnsupportedImportTypeArgument), e.argument = this.parseExprAtom(), this.expect(o.parenR), this.eat(o.dot) && (e.qualifier = this.tsParseEntityName()), this.tsMatchLeftRelational() && (e.typeArguments = this.tsParseTypeArguments()), this.finishNode(e, "TSImportType");
			}
			tsParseTypeQuery() {
				let e = this.startNode();
				return this.expect(o._typeof), this.match(o._import) ? e.exprName = this.tsParseImportType() : e.exprName = this.tsParseEntityName(), !this.hasPrecedingLineBreak() && this.tsMatchLeftRelational() && (e.typeArguments = this.tsParseTypeArguments()), this.finishNode(e, "TSTypeQuery");
			}
			tsParseMappedTypeParameter() {
				let e = this.startNode();
				return e.name = this.tsParseTypeParameterName(), e.constraint = this.tsExpectThenParseType(o._in), this.finishNode(e, "TSTypeParameter");
			}
			tsParseMappedType() {
				let e = this.startNode();
				return this.expect(o.braceL), this.match(o.plusMin) ? (e.readonly = this.value, this.next(), this.expectContextual("readonly")) : this.eatContextual("readonly") && (e.readonly = !0), this.expect(o.bracketL), e.typeParameter = this.tsParseMappedTypeParameter(), e.nameType = this.eatContextual("as") ? this.tsParseType() : null, this.expect(o.bracketR), this.match(o.plusMin) ? (e.optional = this.value, this.next(), this.expect(o.question)) : this.eat(o.question) && (e.optional = !0), e.typeAnnotation = this.tsTryParseType(), this.semicolon(), this.expect(o.braceR), this.finishNode(e, "TSMappedType");
			}
			tsParseTypeLiteral() {
				let e = this.startNode();
				return e.members = this.tsParseObjectTypeMembers(), this.finishNode(e, "TSTypeLiteral");
			}
			tsParseTupleElementType() {
				let e = this.startLoc, t = this.start, n = this.eat(o.ellipsis), r = this.tsParseType(), i = this.eat(o.question);
				if (this.eat(o.colon)) {
					let e = this.startNodeAtNode(r);
					e.optional = i, r.type === "TSTypeReference" && !r.typeArguments && r.typeName.type === "Identifier" ? e.label = r.typeName : (this.raise(r.start, U.InvalidTupleMemberLabel), e.label = r), e.elementType = this.tsParseType(), r = this.finishNode(e, "TSNamedTupleMember");
				} else if (i) {
					let e = this.startNodeAtNode(r);
					e.typeAnnotation = r, r = this.finishNode(e, "TSOptionalType");
				}
				if (n) {
					let n = this.startNodeAt(t, e);
					n.typeAnnotation = r, r = this.finishNode(n, "TSRestType");
				}
				return r;
			}
			tsParseTupleType() {
				let e = this.startNode();
				e.elementTypes = this.tsParseBracketedList("TupleElementTypes", this.tsParseTupleElementType.bind(this), !0, !1);
				let t = !1;
				return e.elementTypes.forEach((e) => {
					let { type: n } = e;
					t && n !== "TSRestType" && n !== "TSOptionalType" && !(n === "TSNamedTupleMember" && e.optional) && this.raise(e.start, U.OptionalTypeBeforeRequired), t ||= n === "TSNamedTupleMember" && e.optional || n === "TSOptionalType", n === "TSRestType" && (e = e.typeAnnotation);
				}), this.finishNode(e, "TSTupleType");
			}
			tsParseTemplateLiteralType() {
				let e = this.startNode();
				return e.literal = this.parseTemplate({ isTagged: !1 }), this.finishNode(e, "TSLiteralType");
			}
			tsParseTypeReference() {
				let e = this.startNode();
				return e.typeName = this.tsParseEntityName(), !this.hasPrecedingLineBreak() && this.tsMatchLeftRelational() && (e.typeArguments = this.tsParseTypeArguments()), this.finishNode(e, "TSTypeReference");
			}
			tsMatchLeftRelational() {
				return this.match(o.relational) && this.value === "<";
			}
			tsMatchRightRelational() {
				return this.match(o.relational) && this.value === ">";
			}
			tsParseParenthesizedType() {
				let e = this.startNode();
				return this.expect(o.parenL), e.typeAnnotation = this.tsParseType(), this.expect(o.parenR), this.finishNode(e, "TSParenthesizedType");
			}
			tsParseNonArrayType() {
				switch (this.type) {
					case o.string:
					case o.num:
					case o._true:
					case o._false: return this.tsParseLiteralTypeNode();
					case o.plusMin:
						if (this.value === "-") {
							let e = this.startNode();
							return this.lookahead().type !== o.num && this.unexpected(), e.literal = this.parseMaybeUnary(), this.finishNode(e, "TSLiteralType");
						}
						break;
					case o._this: return this.tsParseThisTypeOrThisTypePredicate();
					case o._typeof: return this.tsParseTypeQuery();
					case o._import: return this.tsParseImportType();
					case o.braceL: return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this)) ? this.tsParseMappedType() : this.tsParseTypeLiteral();
					case o.bracketL: return this.tsParseTupleType();
					case o.parenL: return this.tsParseParenthesizedType();
					case o.backQuote:
					case o.dollarBraceL: return this.tsParseTemplateLiteralType();
					default: {
						let { type: e } = this;
						if (y(e) || e === o._void || e === o._null) {
							let t = e === o._void ? "TSVoidKeyword" : e === o._null ? "TSNullKeyword" : Wr(this.value);
							if (t !== void 0 && this.lookaheadCharCode() !== 46) {
								let e = this.startNode();
								return this.next(), this.finishNode(e, t);
							}
							return this.tsParseTypeReference();
						}
					}
				}
				this.unexpected();
			}
			tsParseArrayTypeOrHigher() {
				let e = this.tsParseNonArrayType();
				for (; !this.hasPrecedingLineBreak() && this.eat(o.bracketL);) if (this.match(o.bracketR)) {
					let t = this.startNodeAtNode(e);
					t.elementType = e, this.expect(o.bracketR), e = this.finishNode(t, "TSArrayType");
				} else {
					let t = this.startNodeAtNode(e);
					t.objectType = e, t.indexType = this.tsParseType(), this.expect(o.bracketR), e = this.finishNode(t, "TSIndexedAccessType");
				}
				return e;
			}
			tsParseTypeOperatorOrHigher() {
				return ee(this.type) && !this.containsEsc ? this.tsParseTypeOperator() : this.isContextual("infer") ? this.tsParseInferType() : this.tsInAllowConditionalTypesContext(() => this.tsParseArrayTypeOrHigher());
			}
			tsParseIntersectionTypeOrHigher() {
				return this.tsParseUnionOrIntersectionType("TSIntersectionType", this.tsParseTypeOperatorOrHigher.bind(this), o.bitwiseAND);
			}
			tsParseUnionTypeOrHigher() {
				return this.tsParseUnionOrIntersectionType("TSUnionType", this.tsParseIntersectionTypeOrHigher.bind(this), o.bitwiseOR);
			}
			tsParseNonConditionalType() {
				return this.tsIsStartOfFunctionType() ? this.tsParseFunctionOrConstructorType("TSFunctionType") : this.match(o._new) ? this.tsParseFunctionOrConstructorType("TSConstructorType") : this.isAbstractConstructorSignature() ? this.tsParseFunctionOrConstructorType("TSConstructorType", !0) : this.tsParseUnionTypeOrHigher();
			}
			tsParseType() {
				Mr(this.inType);
				let e = this.tsParseNonConditionalType();
				if (this.inDisallowConditionalTypesContext || this.hasPrecedingLineBreak() || !this.eat(o._extends)) return e;
				let t = this.startNodeAtNode(e);
				return t.checkType = e, t.extendsType = this.tsInDisallowConditionalTypesContext(() => this.tsParseNonConditionalType()), this.expect(o.question), t.trueType = this.tsInAllowConditionalTypesContext(() => this.tsParseType()), this.expect(o.colon), t.falseType = this.tsInAllowConditionalTypesContext(() => this.tsParseType()), this.finishNode(t, "TSConditionalType");
			}
			tsIsUnambiguouslyIndexSignature() {
				return this.next(), y(this.type) ? (this.next(), this.match(o.colon)) : !1;
			}
			tsInType(e) {
				let t = this.inType;
				this.inType = !0;
				try {
					return e();
				} finally {
					this.inType = t;
				}
			}
			tsTryParseIndexSignature(e) {
				if (!(this.match(o.bracketL) && this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this)))) return;
				this.expect(o.bracketL);
				let t = this.parseIdent();
				t.typeAnnotation = this.tsParseTypeAnnotation(), this.resetEndLocation(t), this.expect(o.bracketR), e.parameters = [t];
				let n = this.tsTryParseTypeAnnotation();
				return n && (e.typeAnnotation = n), this.tsParseTypeMemberSemicolon(), this.finishNode(e, "TSIndexSignature");
			}
			tsParseNoneModifiers(e) {
				this.tsParseModifiers({
					modified: e,
					allowedModifiers: [],
					disallowedModifiers: ["in", "out"],
					errorTemplate: U.InvalidModifierOnTypeParameterPositions
				});
			}
			tsParseTypeParameter(e = this.tsParseNoneModifiers.bind(this)) {
				let t = this.startNode();
				return e(t), t.name = this.tsParseTypeParameterName(), t.constraint = this.tsEatThenParseType(o._extends), t.default = this.tsEatThenParseType(o.eq), this.finishNode(t, "TSTypeParameter");
			}
			tsParseTypeParameters(e) {
				let t = this.startNode();
				this.tsMatchLeftRelational() || this.matchJsx("jsxTagStart") ? this.next() : this.unexpected();
				let n = { value: -1 };
				return t.params = this.tsParseBracketedList("TypeParametersOrArguments", this.tsParseTypeParameter.bind(this, e), !1, !0, n), t.params.length === 0 && this.raise(this.start, U.EmptyTypeParameters), n.value !== -1 && this.addExtra(t, "trailingComma", n.value), this.finishNode(t, "TSTypeParameterDeclaration");
			}
			tsTryParseTypeParameters(e) {
				if (this.tsMatchLeftRelational()) return this.tsParseTypeParameters(e);
			}
			tsTryParse(e) {
				let t = this.getCurLookaheadState(), n = e();
				if (n !== void 0 && n !== !1) return n;
				this.setLookaheadState(t);
			}
			tsTokenCanFollowModifier() {
				return (this.match(o.bracketL) || this.match(o.braceL) || this.match(o.star) || this.match(o.ellipsis) || this.match(o.privateId) || this.isLiteralPropertyName()) && !this.hasPrecedingLineBreak();
			}
			tsNextTokenCanFollowModifier() {
				return this.next(!0), this.tsTokenCanFollowModifier();
			}
			tsParseModifier(e, t) {
				let n = this.value;
				if (e.indexOf(n) !== -1 && !this.containsEsc) {
					if (t && this.tsIsStartOfStaticBlocks()) return;
					if (this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this))) return n;
				}
			}
			tsParseModifiersByMap({ modified: e, map: t }) {
				for (let n of Object.keys(t)) e[n] = t[n];
			}
			tsParseModifiers({ modified: e, allowedModifiers: t, disallowedModifiers: n, stopOnStartOfClassStaticBlock: r, errorTemplate: i = U.InvalidModifierOnTypeMember }) {
				let a = {}, o = (t, n, r, i) => {
					n === r && e[i] && this.raise(t.column, U.InvalidModifiersOrder({ orderedModifiers: [r, i] }));
				}, s = (t, n, r, i) => {
					(e[r] && n === i || e[i] && n === r) && this.raise(t.column, U.IncompatibleModifiers({ modifiers: [r, i] }));
				};
				for (;;) {
					let c = this.startLoc, l = this.tsParseModifier(t.concat(n ?? []), r);
					if (!l) break;
					Vr(l) ? e.accessibility ? this.raise(this.start, U.DuplicateAccessibilityModifier()) : (o(c, l, l, "override"), o(c, l, l, "static"), o(c, l, l, "readonly"), o(c, l, l, "accessor"), a.accessibility = l, e.accessibility = l) : Pr(l) ? e[l] ? this.raise(this.start, U.DuplicateModifier({ modifier: l })) : (o(c, l, "in", "out"), a[l] = l, e[l] = !0) : Nr(l) ? e[l] ? this.raise(this.start, U.DuplicateModifier({ modifier: l })) : (s(c, l, "accessor", "readonly"), s(c, l, "accessor", "static"), s(c, l, "accessor", "override"), a[l] = l, e[l] = !0) : l === "const" ? e[l] ? this.raise(this.start, U.DuplicateModifier({ modifier: l })) : (a[l] = l, e[l] = !0) : Object.hasOwnProperty.call(e, l) ? this.raise(this.start, U.DuplicateModifier({ modifier: l })) : (o(c, l, "static", "readonly"), o(c, l, "static", "override"), o(c, l, "override", "readonly"), o(c, l, "abstract", "override"), s(c, l, "declare", "override"), s(c, l, "static", "abstract"), a[l] = l, e[l] = !0), n?.includes(l) && this.raise(this.start, i);
				}
				return a;
			}
			tsParseInOutModifiers(e) {
				this.tsParseModifiers({
					modified: e,
					allowedModifiers: ["in", "out"],
					disallowedModifiers: [
						"public",
						"private",
						"protected",
						"readonly",
						"declare",
						"abstract",
						"override"
					],
					errorTemplate: U.InvalidModifierOnTypeParameter
				});
			}
			parseMaybeUnary(t, n, r, i) {
				return !e?.jsx && this.tsMatchLeftRelational() ? this.tsParseTypeAssertion() : super.parseMaybeUnary(t, n, r, i);
			}
			tsParseTypeAssertion() {
				n && this.raise(this.start, U.ReservedTypeAssertion);
				let e = this.tryParse(() => {
					let e = this.startNode();
					return e.typeAnnotation = this.tsTryNextParseConstantContext() || this.tsNextThenParseType(), this.expect(o.relational), e.expression = this.parseMaybeUnary(), this.finishNode(e, "TSTypeAssertion");
				});
				return e.error ? this.tsParseTypeParameters(this.tsParseConstModifier) : e.node;
			}
			tsParseTypeArguments() {
				let e = this.startNode();
				return e.params = this.tsInType(() => this.tsInNoContext(() => (this.expect(o.relational), this.tsParseDelimitedList("TypeParametersOrArguments", this.tsParseType.bind(this))))), e.params.length === 0 && this.raise(this.start, U.EmptyTypeArguments), this.exprAllowed = !1, this.expect(o.relational), this.finishNode(e, "TSTypeParameterInstantiation");
			}
			tsParseHeritageClause(e) {
				let t = this.start, n = this.tsParseDelimitedList("HeritageClauseElement", () => {
					let e = this.startNode();
					return e.expression = this.tsParseEntityName(), this.tsMatchLeftRelational() && (e.typeParameters = this.tsParseTypeArguments()), this.finishNode(e, "TSExpressionWithTypeArguments");
				});
				return n.length || this.raise(t, U.EmptyHeritageClauseType({ token: e })), n;
			}
			tsParseTypeMemberSemicolon() {
				!this.eat(o.comma) && !this.isLineTerminator() && this.expect(o.semi);
			}
			tsTryParseAndCatch(e) {
				let t = this.tryParse((t) => e() || t());
				if (!(t.aborted || !t.node)) return t.error && this.setLookaheadState(t.failState), t.node;
			}
			tsParseSignatureMember(e, t) {
				return this.tsFillSignature(o.colon, t), this.tsParseTypeMemberSemicolon(), this.finishNode(t, e);
			}
			tsParsePropertyOrMethodSignature(e, t) {
				this.eat(o.question) && (e.optional = !0);
				let n = e;
				if (this.match(o.parenL) || this.tsMatchLeftRelational()) {
					t && this.raise(e.start, U.ReadonlyForMethodSignature);
					let r = n;
					r.kind && this.tsMatchLeftRelational() && this.raise(this.start, U.AccesorCannotHaveTypeParameters), this.tsFillSignature(o.colon, r), this.tsParseTypeMemberSemicolon();
					let i = "parameters", a = "typeAnnotation";
					if (r.kind === "get") r[i].length > 0 && (this.raise(this.start, "A 'get' accesor must not have any formal parameters."), this.isThisParam(r[i][0]) && this.raise(this.start, U.AccesorCannotDeclareThisParameter));
					else if (r.kind === "set") {
						if (r[i].length !== 1) this.raise(this.start, "A 'get' accesor must not have any formal parameters.");
						else {
							let e = r[i][0];
							this.isThisParam(e) && this.raise(this.start, U.AccesorCannotDeclareThisParameter), e.type === "Identifier" && e.optional && this.raise(this.start, U.SetAccesorCannotHaveOptionalParameter), e.type === "RestElement" && this.raise(this.start, U.SetAccesorCannotHaveRestParameter);
						}
						r[a] && this.raise(r[a].start, U.SetAccesorCannotHaveReturnType);
					} else r.kind = "method";
					return this.finishNode(r, "TSMethodSignature");
				} else {
					let e = n;
					t && (e.readonly = !0);
					let r = this.tsTryParseTypeAnnotation();
					return r && (e.typeAnnotation = r), this.tsParseTypeMemberSemicolon(), this.finishNode(e, "TSPropertySignature");
				}
			}
			tsParseTypeMember() {
				let e = this.startNode();
				if (this.match(o.parenL) || this.tsMatchLeftRelational()) return this.tsParseSignatureMember("TSCallSignatureDeclaration", e);
				if (this.match(o._new)) {
					let t = this.startNode();
					return this.next(), this.match(o.parenL) || this.tsMatchLeftRelational() ? this.tsParseSignatureMember("TSConstructSignatureDeclaration", e) : (e.key = this.createIdentifier(t, "new"), this.tsParsePropertyOrMethodSignature(e, !1));
				}
				return this.tsParseModifiers({
					modified: e,
					allowedModifiers: ["readonly"],
					disallowedModifiers: [
						"declare",
						"abstract",
						"private",
						"protected",
						"public",
						"static",
						"override"
					]
				}), this.tsTryParseIndexSignature(e) || (this.parsePropertyName(e), !e.computed && e.key.type === "Identifier" && (e.key.name === "get" || e.key.name === "set") && this.tsTokenCanFollowModifier() && (e.kind = e.key.name, this.parsePropertyName(e)), this.tsParsePropertyOrMethodSignature(e, !!e.readonly));
			}
			tsParseList(e, t) {
				let n = [];
				for (; !this.tsIsListTerminator(e);) n.push(t());
				return n;
			}
			tsParseObjectTypeMembers() {
				this.expect(o.braceL);
				let e = this.tsParseList("TypeMembers", this.tsParseTypeMember.bind(this));
				return this.expect(o.braceR), e;
			}
			tsParseInterfaceDeclaration(e, t = {}) {
				if (this.hasFollowingLineBreak()) return null;
				this.expectContextual("interface"), t.declare && (e.declare = !0), y(this.type) ? (e.id = this.parseIdent(), this.checkLValSimple(e.id, W.BIND_TS_INTERFACE)) : (e.id = null, this.raise(this.start, U.MissingInterfaceName)), e.typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutModifiers.bind(this)), this.eat(o._extends) && (e.extends = this.tsParseHeritageClause("extends"));
				let n = this.startNode();
				return n.body = this.tsParseInterfaceBody(), e.body = this.finishNode(n, "TSInterfaceBody"), this.finishNode(e, "TSInterfaceDeclaration");
			}
			tsParseInterfaceBody() {
				this.expect(o.braceL);
				let e = this.inType;
				this.inType = !0;
				let t = this.tsParseList("TypeMembers", this.tsParseTypeMember.bind(this));
				return this.inType = e, this.expect(o.braceR), t;
			}
			tsParseAbstractDeclaration(e) {
				if (this.match(o._class)) return e.abstract = !0, this.parseClass(e, !0);
				if (this.ts_isContextual(p.interface)) {
					if (!this.hasFollowingLineBreak()) return e.abstract = !0, this.tsParseInterfaceDeclaration(e);
				} else this.unexpected(e.start);
			}
			tsIsDeclarationStart() {
				return v(this.type);
			}
			tsParseExpressionStatement(e, t) {
				switch (t.name) {
					case "declare": {
						let t = this.tsTryParseDeclare(e);
						if (t) return t.declare = !0, t;
						break;
					}
					case "global":
						if (this.match(o.braceL)) {
							this.enterScope(ir);
							let n = e;
							return n.global = !0, n.id = t, n.body = this.tsParseModuleBlock(), super.exitScope(), this.finishNode(n, "TSModuleDeclaration");
						}
						break;
					default: return this.tsParseDeclaration(e, t.name, !1);
				}
			}
			tsParseModuleReference() {
				return this.tsIsExternalModuleReference() ? this.tsParseExternalModuleReference() : this.tsParseEntityName(!1);
			}
			tsIsExportDefaultSpecifier() {
				let { type: e } = this, t = this.isAsyncFunction(), n = this.isLet();
				if (y(e)) {
					if (t && !this.containsEsc || n) return !1;
					if ((e === p.type || e === p.interface) && !this.containsEsc) {
						let e = this.lookahead();
						if (y(e.type) && !this.isContextualWithState("from", e) || e.type === o.braceL) return !1;
					}
				} else if (!this.match(o._default)) return !1;
				let r = this.nextTokenStart(), i = this.isUnparsedContextual(r, "from");
				if (this.input.charCodeAt(r) === 44 || y(this.type) && i) return !0;
				if (this.match(o._default) && i) {
					let e = this.input.charCodeAt(this.nextTokenStartSince(r + 4));
					return e === 34 || e === 39;
				}
				return !1;
			}
			tsInAmbientContext(e) {
				let t = this.isAmbientContext;
				this.isAmbientContext = !0;
				try {
					return e();
				} finally {
					this.isAmbientContext = t;
				}
			}
			tsCheckLineTerminator(e) {
				return e ? this.hasFollowingLineBreak() ? !1 : (this.next(), !0) : !this.isLineTerminator();
			}
			tsParseModuleOrNamespaceDeclaration(e, t = !1) {
				if (e.id = this.parseIdent(), t || this.checkLValSimple(e.id, W.BIND_TS_NAMESPACE), this.eat(o.dot)) {
					let t = this.startNode();
					this.tsParseModuleOrNamespaceDeclaration(t, !0), e.body = t;
				} else this.enterScope(ir), e.body = this.tsParseModuleBlock(), super.exitScope();
				return this.finishNode(e, "TSModuleDeclaration");
			}
			checkLValSimple(e, t = W.BIND_NONE, n) {
				return (e.type === "TSNonNullExpression" || e.type === "TSAsExpression") && (e = e.expression), super.checkLValSimple(e, t, n);
			}
			tsParseTypeAliasDeclaration(e) {
				return e.id = this.parseIdent(), this.checkLValSimple(e.id, W.BIND_TS_TYPE), e.typeAnnotation = this.tsInType(() => {
					if (e.typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutModifiers.bind(this)), this.expect(o.eq), this.ts_isContextual(p.interface) && this.lookahead().type !== o.dot) {
						let e = this.startNode();
						return this.next(), this.finishNode(e, "TSIntrinsicKeyword");
					}
					return this.tsParseType();
				}), this.semicolon(), this.finishNode(e, "TSTypeAliasDeclaration");
			}
			tsParseDeclaration(e, t, n) {
				switch (t) {
					case "abstract":
						if (this.tsCheckLineTerminator(n) && (this.match(o._class) || y(this.type))) return this.tsParseAbstractDeclaration(e);
						break;
					case "module":
						if (this.tsCheckLineTerminator(n)) {
							if (this.match(o.string)) return this.tsParseAmbientExternalModuleDeclaration(e);
							if (y(this.type)) return this.tsParseModuleOrNamespaceDeclaration(e);
						}
						break;
					case "namespace":
						if (this.tsCheckLineTerminator(n) && y(this.type)) return this.tsParseModuleOrNamespaceDeclaration(e);
						break;
					case "type":
						if (this.tsCheckLineTerminator(n) && y(this.type)) return this.tsParseTypeAliasDeclaration(e);
						break;
				}
			}
			tsTryParseExportDeclaration() {
				return this.tsParseDeclaration(this.startNode(), this.value, !0);
			}
			tsParseImportEqualsDeclaration(e, t) {
				e.isExport = t || !1, e.id = this.parseIdent(), this.checkLValSimple(e.id, W.BIND_LEXICAL), super.expect(o.eq);
				let n = this.tsParseModuleReference();
				return e.importKind === "type" && n.type !== "TSExternalModuleReference" && this.raise(n.start, U.ImportAliasHasImportType), e.moduleReference = n, super.semicolon(), this.finishNode(e, "TSImportEqualsDeclaration");
			}
			isExportDefaultSpecifier() {
				if (this.tsIsDeclarationStart()) return !1;
				let { type: e } = this;
				if (y(e)) {
					if (this.isContextual("async") || this.isContextual("let")) return !1;
					if ((e === p.type || e === p.interface) && !this.containsEsc) {
						let e = this.lookahead();
						if (y(e.type) && !this.isContextualWithState("from", e) || e.type === o.braceL) return !1;
					}
				} else if (!this.match(o._default)) return !1;
				let t = this.nextTokenStart(), n = this.isUnparsedContextual(t, "from");
				if (this.input.charCodeAt(t) === 44 || y(this.type) && n) return !0;
				if (this.match(o._default) && n) {
					let e = this.input.charCodeAt(this.nextTokenStartSince(t + 4));
					return e === 34 || e === 39;
				}
				return !1;
			}
			parseTemplate({ isTagged: e = !1 } = {}) {
				let t = this.startNode();
				this.next(), t.expressions = [];
				let n = this.parseTemplateElement({ isTagged: e });
				for (t.quasis = [n]; !n.tail;) this.type === o.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(o.dollarBraceL), t.expressions.push(this.inType ? this.tsParseType() : this.parseExpression()), this.expect(o.braceR), t.quasis.push(n = this.parseTemplateElement({ isTagged: e }));
				return this.next(), this.finishNode(t, "TemplateLiteral");
			}
			parseFunction(e, t, n, r, i) {
				this.initFunction(e), (this.ecmaVersion >= 9 || this.ecmaVersion >= 6 && !r) && (this.type === o.star && t & Ir && this.unexpected(), e.generator = this.eat(o.star)), this.ecmaVersion >= 8 && (e.async = !!r), t & Fr && (e.id = t & Lr && this.type !== o.name ? null : this.parseIdent());
				let a = this.yieldPos, s = this.awaitPos, c = this.awaitIdentPos, l = this.maybeInArrowParameters;
				this.maybeInArrowParameters = !1, this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(Rr(e.async, e.generator)), t & Fr || (e.id = this.type === o.name ? this.parseIdent() : null), this.parseFunctionParams(e);
				let u = t & Fr;
				return this.parseFunctionBody(e, n, !1, i, { isFunctionDeclaration: u }), this.yieldPos = a, this.awaitPos = s, this.awaitIdentPos = c, t & Fr && e.id && !(t & Ir) && (e.body ? this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? W.BIND_VAR : W.BIND_LEXICAL : W.BIND_FUNCTION) : this.checkLValSimple(e.id, W.BIND_NONE)), this.maybeInArrowParameters = l, this.finishNode(e, u ? "FunctionDeclaration" : "FunctionExpression");
			}
			parseFunctionBody(e, t = !1, n = !1, r = !1, i) {
				this.match(o.colon) && (e.returnType = this.tsParseTypeOrTypePredicateAnnotation(o.colon));
				let a = i?.isFunctionDeclaration ? "TSDeclareFunction" : i?.isClassMethod ? "TSDeclareMethod" : void 0;
				return a && !this.match(o.braceL) && this.isLineTerminator() ? (this.exitScope(), this.finishNode(e, a)) : a === "TSDeclareFunction" && this.isAmbientContext && (this.raise(e.start, U.DeclareFunctionHasImplementation), e.declare) ? (super.parseFunctionBody(e, t, n, !1), this.finishNode(e, a)) : (super.parseFunctionBody(e, t, n, r), e);
			}
			parseNew() {
				this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
				let e = this.startNode(), t = this.parseIdent(!0);
				if (this.ecmaVersion >= 6 && this.eat(o.dot)) {
					e.meta = t;
					let n = this.containsEsc;
					return e.property = this.parseIdent(!0), e.property.name !== "target" && this.raiseRecoverable(e.property.start, "The only valid meta property for new is 'new.target'"), n && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(e.start, "'new.target' can only be used in functions and class static block"), this.finishNode(e, "MetaProperty");
				}
				let n = this.start, r = this.startLoc, i = this.type === o._import;
				e.callee = this.parseSubscripts(this.parseExprAtom(), n, r, !0, !1), i && e.callee.type === "ImportExpression" && this.raise(n, "Cannot use new with import()");
				let { callee: a } = e;
				return a.type === "TSInstantiationExpression" && !a.extra?.parenthesized && (e.typeArguments = a.typeArguments, e.callee = a.expression), this.eat(o.parenL) ? e.arguments = this.parseExprList(o.parenR, this.ecmaVersion >= 8, !1) : e.arguments = [], this.finishNode(e, "NewExpression");
			}
			parseExprOp(e, t, n, r, i) {
				if (o._in.binop > r && !this.hasPrecedingLineBreak()) {
					let a;
					if (this.isContextual("as") && (a = "TSAsExpression"), this.isContextual("satisfies") && (a = "TSSatisfiesExpression"), a) {
						let o = this.startNodeAt(t, n);
						o.expression = e;
						let s = this.tsTryNextParseConstantContext();
						return s ? o.typeAnnotation = s : o.typeAnnotation = this.tsNextThenParseType(), this.finishNode(o, a), this.reScan_lt_gt(), this.parseExprOp(o, t, n, r, i);
					}
				}
				return super.parseExprOp(e, t, n, r, i);
			}
			parseImportSpecifiers() {
				let e = [], t = !0;
				if (a.tokenIsIdentifier(this.type) && (e.push(this.parseImportDefaultSpecifier()), !this.eat(o.comma))) return e;
				if (this.type === o.star) return e.push(this.parseImportNamespaceSpecifier()), e;
				for (this.expect(o.braceL); !this.eat(o.braceR);) {
					if (t) t = !1;
					else if (this.expect(o.comma), this.afterTrailingComma(o.braceR)) break;
					e.push(this.parseImportSpecifier());
				}
				return e;
			}
			parseImport(e) {
				let t = this.lookahead();
				if (e.importKind = "value", this.importOrExportOuterKind = "value", y(t.type) || this.match(o.star) || this.match(o.braceL)) {
					let n = this.lookahead(2);
					if (n.type !== o.comma && !this.isContextualWithState("from", n) && n.type !== o.eq && this.ts_eatContextualWithState("type", 1, t) && (this.importOrExportOuterKind = "type", e.importKind = "type", t = this.lookahead(), n = this.lookahead(2)), y(t.type) && n.type === o.eq) {
						this.next();
						let t = this.tsParseImportEqualsDeclaration(e);
						return this.importOrExportOuterKind = "value", t;
					}
				}
				return this.next(), this.type === o.string ? (e.specifiers = [], e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === o.string ? this.parseExprAtom() : this.unexpected()), this.parseMaybeImportAttributes(e), this.semicolon(), this.finishNode(e, "ImportDeclaration"), this.importOrExportOuterKind = "value", e.importKind === "type" && e.specifiers.length > 1 && e.specifiers[0].type === "ImportDefaultSpecifier" && this.raise(e.start, U.TypeImportCannotSpecifyDefaultAndNamed), e;
			}
			parseExportDefaultDeclaration() {
				if (this.isAbstractClass()) {
					let e = this.startNode();
					return this.next(), e.abstract = !0, this.parseClass(e, !0);
				}
				if (this.match(p.interface)) {
					let e = this.tsParseInterfaceDeclaration(this.startNode());
					if (e) return e;
				}
				return super.parseExportDefaultDeclaration();
			}
			parseExportAllDeclaration(e, t) {
				return this.ecmaVersion >= 11 && (this.eatContextual("as") ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null), this.expectContextual("from"), this.type !== o.string && this.unexpected(), e.source = this.parseExprAtom(), this.parseMaybeImportAttributes(e), this.semicolon(), this.finishNode(e, "ExportAllDeclaration");
			}
			parseDynamicImport(e) {
				if (this.next(), e.source = this.parseMaybeAssign(), this.eat(o.comma) && (e.arguments = [this.parseExpression()]), !this.eat(o.parenR)) {
					let e = this.start;
					this.eat(o.comma) && this.eat(o.parenR) ? this.raiseRecoverable(e, "Trailing comma is not allowed in import()") : this.unexpected(e);
				}
				return this.finishNode(e, "ImportExpression");
			}
			parseExport(e, t) {
				let n = this.lookahead();
				if (this.ts_eatWithState(o._import, 2, n)) {
					this.ts_isContextual(p.type) && this.lookaheadCharCode() !== 61 ? (e.importKind = "type", this.importOrExportOuterKind = "type", this.next()) : (e.importKind = "value", this.importOrExportOuterKind = "value");
					let t = this.tsParseImportEqualsDeclaration(e, !0);
					return this.importOrExportOuterKind = void 0, t;
				} else if (this.ts_eatWithState(o.eq, 2, n)) {
					let t = e;
					return t.expression = this.parseExpression(), this.semicolon(), this.importOrExportOuterKind = void 0, this.finishNode(t, "TSExportAssignment");
				} else if (this.ts_eatContextualWithState("as", 2, n)) {
					let t = e;
					return this.expectContextual("namespace"), t.id = this.parseIdent(), this.semicolon(), this.importOrExportOuterKind = void 0, this.finishNode(t, "TSNamespaceExportDeclaration");
				} else {
					let r = this.lookahead(2).type;
					if (this.ts_isContextualWithState(n, p.type) && (r === o.braceL || r === o.star) ? (this.next(), this.importOrExportOuterKind = "type", e.exportKind = "type") : (this.importOrExportOuterKind = "value", e.exportKind = "value"), this.next(), this.eat(o.star)) return this.parseExportAllDeclaration(e, t);
					if (this.eat(o._default)) return this.checkExport(t, "default", this.lastTokStart), e.declaration = this.parseExportDefaultDeclaration(), this.finishNode(e, "ExportDefaultDeclaration");
					if (this.shouldParseExportStatement()) e.declaration = this.parseExportDeclaration(e), e.declaration.type === "VariableDeclaration" ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start), e.specifiers = [], e.source = null;
					else {
						if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual("from")) this.type !== o.string && this.unexpected(), e.source = this.parseExprAtom(), this.parseMaybeImportAttributes(e);
						else {
							for (let t of e.specifiers) this.checkUnreserved(t.local), this.checkLocalExport(t.local), t.local.type === "Literal" && this.raise(t.local.start, "A string literal cannot be used as an exported binding without `from`.");
							e.source = null;
						}
						this.semicolon();
					}
					return this.finishNode(e, "ExportNamedDeclaration");
				}
			}
			checkExport(e, t, n) {
				e && (typeof t != "string" && (t = t.type === "Identifier" ? t.name : t.value), e[t] = !0);
			}
			parseMaybeDefault(e, t, n) {
				let r = super.parseMaybeDefault(e, t, n);
				return r.type === "AssignmentPattern" && r.typeAnnotation && r.right.start < r.typeAnnotation.start && this.raise(r.typeAnnotation.start, U.TypeAnnotationAfterAssign), r;
			}
			typeCastToParameter(e) {
				return e.expression.typeAnnotation = e.typeAnnotation, this.resetEndLocation(e.expression, e.typeAnnotation.end, e.typeAnnotation.loc?.end), e.expression;
			}
			toAssignableList(e, t) {
				e ||= [];
				for (let t = 0; t < e.length; t++) {
					let n = e[t];
					n?.type === "TSTypeCastExpression" && (e[t] = this.typeCastToParameter(n));
				}
				return super.toAssignableList(e, t);
			}
			reportReservedArrowTypeParam(e) {
				e.params.length === 1 && !e.extra?.trailingComma && n && this.raise(e.start, U.ReservedArrowTypeParam);
			}
			parseExprAtom(e, t, n) {
				if (this.type === p.jsxText) return this.jsx_parseText();
				if (this.type === p.jsxTagStart) return this.jsx_parseElement();
				if (this.type === p.at) return this.parseDecorators(), this.parseExprAtom();
				if (y(this.type)) {
					let e = this.potentialArrowAt === this.start, n = this.start, r = this.startLoc, i = this.containsEsc, a = this.parseIdent(!1);
					if (this.ecmaVersion >= 8 && !i && a.name === "async" && !this.canInsertSemicolon() && this.eat(o._function)) return this.overrideContext(d.f_expr), this.parseFunction(this.startNodeAt(n, r), 0, !1, !0, t);
					if (e && !this.canInsertSemicolon()) {
						if (this.eat(o.arrow)) return this.parseArrowExpression(this.startNodeAt(n, r), [a], !1, t);
						if (this.ecmaVersion >= 8 && a.name === "async" && this.type === o.name && !i && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) return a = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(o.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(n, r), [a], !0, t);
					}
					return a;
				} else return super.parseExprAtom(e, t, n);
			}
			parseExprAtomDefault() {
				if (y(this.type)) {
					let e = this.potentialArrowAt === this.start, t = this.containsEsc, n = this.parseIdent();
					if (!t && n.name === "async" && !this.canInsertSemicolon()) {
						let { type: e } = this;
						if (e === o._function) return this.next(), this.parseFunction(this.startNodeAtNode(n), void 0, !0, !0);
						if (y(e)) if (this.lookaheadCharCode() === 61) {
							let e = this.parseIdent(!1);
							return (this.canInsertSemicolon() || !this.eat(o.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAtNode(n), [e], !0);
						} else return n;
					}
					return e && this.match(o.arrow) && !this.canInsertSemicolon() ? (this.next(), this.parseArrowExpression(this.startNodeAtNode(n), [n], !1)) : n;
				} else this.unexpected();
			}
			parseIdentNode() {
				let e = this.startNode();
				if (b(this.type) && !((this.type.keyword === "class" || this.type.keyword === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46))) e.name = this.value;
				else return super.parseIdentNode();
				return e;
			}
			parseVarStatement(e, t, n = !1) {
				let { isAmbientContext: r } = this;
				this.next(), super.parseVar(e, !1, t, n || r), this.semicolon();
				let i = this.finishNode(e, "VariableDeclaration");
				if (!r) return i;
				for (let { id: e, init: n } of i.declarations) n && (t !== "const" || e.typeAnnotation ? this.raise(n.start, U.InitializerNotAllowedInAmbientContext) : n.type !== "StringLiteral" && n.type !== "BooleanLiteral" && n.type !== "NumericLiteral" && n.type !== "BigIntLiteral" && (n.type !== "TemplateLiteral" || n.expressions.length > 0) && !zr(n) && this.raise(n.start, U.ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference));
				return i;
			}
			parseStatement(e, t, n) {
				if (this.match(p.at) && this.parseDecorators(!0), this.match(o._const) && this.isLookaheadContextual("enum")) {
					let e = this.startNode();
					return this.expect(o._const), this.tsParseEnumDeclaration(e, { const: !0 });
				}
				if (this.ts_isContextual(p.enum)) return this.tsParseEnumDeclaration(this.startNode());
				if (this.ts_isContextual(p.interface)) {
					let e = this.tsParseInterfaceDeclaration(this.startNode());
					if (e) return e;
				}
				return super.parseStatement(e, t, n);
			}
			parseAccessModifier() {
				return this.tsParseModifier([
					"public",
					"protected",
					"private"
				]);
			}
			parsePostMemberNameModifiers(e) {
				this.eat(o.question) && (e.optional = !0), e.readonly && this.match(o.parenL) && this.raise(e.start, U.ClassMethodHasReadonly), e.declare && this.match(o.parenL) && this.raise(e.start, U.ClassMethodHasDeclare);
			}
			parseExpressionStatement(e, t) {
				return (t.type === "Identifier" ? this.tsParseExpressionStatement(e, t) : void 0) || super.parseExpressionStatement(e, t);
			}
			shouldParseExportStatement() {
				return this.tsIsDeclarationStart() || this.match(p.at) ? !0 : super.shouldParseExportStatement();
			}
			parseConditional(e, t, n, r, i) {
				if (this.eat(o.question)) {
					let i = this.startNodeAt(t, n);
					return i.test = e, i.consequent = this.parseMaybeAssign(), this.expect(o.colon), i.alternate = this.parseMaybeAssign(r), this.finishNode(i, "ConditionalExpression");
				}
				return e;
			}
			parseMaybeConditional(e, t) {
				let n = this.start, r = this.startLoc, i = this.parseExprOps(e, t);
				if (this.checkExpressionErrors(t)) return i;
				if (!this.maybeInArrowParameters || !this.match(o.question)) return this.parseConditional(i, n, r, e, t);
				let a = this.tryParse(() => this.parseConditional(i, n, r, e, t));
				return a.node ? (a.error && this.setLookaheadState(a.failState), a.node) : (a.error && this.setOptionalParametersError(t, a.error), i);
			}
			parseParenItem(e) {
				let t = this.start, n = this.startLoc;
				if (e = super.parseParenItem(e), this.eat(o.question) && (e.optional = !0, this.resetEndLocation(e)), this.match(o.colon)) {
					let r = this.startNodeAt(t, n);
					return r.expression = e, r.typeAnnotation = this.tsParseTypeAnnotation(), this.finishNode(r, "TSTypeCastExpression");
				}
				return e;
			}
			parseExportDeclaration(e) {
				if (!this.isAmbientContext && this.ts_isContextual(p.declare)) return this.tsInAmbientContext(() => this.parseExportDeclaration(e));
				let t = this.start, n = this.startLoc, r = this.eatContextual("declare");
				r && (this.ts_isContextual(p.declare) || !this.shouldParseExportStatement()) && this.raise(this.start, U.ExpectedAmbientAfterExportDeclare);
				let i = y(this.type) && this.tsTryParseExportDeclaration() || this.parseStatement(null);
				return i ? ((i.type === "TSInterfaceDeclaration" || i.type === "TSTypeAliasDeclaration" || r) && (e.exportKind = "type"), r && (this.resetStartLocation(i, t, n), i.declare = !0), i) : null;
			}
			parseClassId(e, t) {
				if (!t && this.isContextual("implements")) return;
				super.parseClassId(e, t);
				let n = this.tsTryParseTypeParameters(this.tsParseInOutModifiers.bind(this));
				n && (e.typeParameters = n);
			}
			parseClassPropertyAnnotation(e) {
				e.optional || (this.value === "!" && this.eat(o.prefix) ? e.definite = !0 : this.eat(o.question) && (e.optional = !0));
				let t = this.tsTryParseTypeAnnotation();
				t && (e.typeAnnotation = t);
			}
			parseClassField(e) {
				if (e.key.type === "PrivateIdentifier") e.abstract && this.raise(e.start, U.PrivateElementHasAbstract), e.accessibility && this.raise(e.start, U.PrivateElementHasAccessibility({ modifier: e.accessibility })), this.parseClassPropertyAnnotation(e);
				else if (this.parseClassPropertyAnnotation(e), this.isAmbientContext && !(e.readonly && !e.typeAnnotation) && this.match(o.eq) && this.raise(this.start, U.DeclareClassFieldHasInitializer), e.abstract && this.match(o.eq)) {
					let { key: t } = e;
					this.raise(this.start, U.AbstractPropertyHasInitializer({ propertyName: t.type === "Identifier" && !e.computed ? t.name : `[${this.input.slice(t.start, t.end)}]` }));
				}
				return super.parseClassField(e);
			}
			parseClassMethod(e, t, n, r) {
				let i = e.kind === "constructor", a = e.key.type === "PrivateIdentifier", o = this.tsTryParseTypeParameters(this.tsParseConstModifier);
				a ? (o && (e.typeParameters = o), e.accessibility && this.raise(e.start, U.PrivateMethodsHasAccessibility({ modifier: e.accessibility }))) : o && i && this.raise(o.start, U.ConstructorHasTypeParameters);
				let { declare: s = !1, kind: c } = e;
				s && (c === "get" || c === "set") && this.raise(e.start, U.DeclareAccessor({ kind: c })), o && (e.typeParameters = o);
				let l = e.key;
				e.kind === "constructor" ? (t && this.raise(l.start, "Constructor can't be a generator"), n && this.raise(l.start, "Constructor can't be an async method")) : e.static && Sr(e, "prototype") && this.raise(l.start, "Classes may not have a static property named prototype");
				let u = e.value = this.parseMethod(t, n, r, !0, e);
				return e.kind === "get" && u.params.length !== 0 && this.raiseRecoverable(u.start, "getter should have no params"), e.kind === "set" && u.params.length !== 1 && this.raiseRecoverable(u.start, "setter should have exactly one param"), e.kind === "set" && u.params[0].type === "RestElement" && this.raiseRecoverable(u.params[0].start, "Setter cannot use rest params"), this.finishNode(e, "MethodDefinition");
			}
			isClassMethod() {
				return this.match(o.relational);
			}
			parseClassElement(e) {
				if (this.eat(o.semi)) return null;
				let t = this.startNode(), n = "", r = !1, i = !1, a = "method", s = !1, c = [
					"declare",
					"private",
					"public",
					"protected",
					"accessor",
					"override",
					"abstract",
					"readonly",
					"static"
				];
				s = !!this.tsParseModifiers({
					modified: t,
					allowedModifiers: c,
					disallowedModifiers: ["in", "out"],
					stopOnStartOfClassStaticBlock: !0,
					errorTemplate: U.InvalidModifierOnTypeParameterPositions
				}).static;
				let l = () => {
					if (this.tsIsStartOfStaticBlocks()) {
						if (this.next(), this.next(), this.tsHasSomeModifiers(t, c) && this.raise(this.start, U.StaticBlockCannotHaveModifier), this.ecmaVersion >= 13) return super.parseClassStaticBlock(t), t;
					} else {
						let c = this.tsTryParseIndexSignature(t);
						if (c) return t.abstract && this.raise(t.start, U.IndexSignatureHasAbstract), t.accessibility && this.raise(t.start, U.IndexSignatureHasAccessibility({ modifier: t.accessibility })), t.declare && this.raise(t.start, U.IndexSignatureHasDeclare), t.override && this.raise(t.start, U.IndexSignatureHasOverride), c;
						if (!this.inAbstractClass && t.abstract && this.raise(t.start, U.NonAbstractClassHasAbstractMethod), t.override && (e || this.raise(t.start, U.OverrideNotInSubClass)), t.static = s, s && (this.isClassElementNameStart() || this.type === o.star || (n = "static")), !n && this.ecmaVersion >= 8 && this.eatContextual("async") && ((this.isClassElementNameStart() || this.type === o.star) && !this.canInsertSemicolon() ? i = !0 : n = "async"), !n && (this.ecmaVersion >= 9 || !i) && this.eat(o.star) && (r = !0), !n && !i && !r) {
							let e = this.value;
							(this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? a = e : n = e);
						}
						if (n ? (t.computed = !1, t.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), t.key.name = n, this.finishNode(t.key, "Identifier")) : this.parseClassElementName(t), this.parsePostMemberNameModifiers(t), this.isClassMethod() || this.ecmaVersion < 13 || this.type === o.parenL || a !== "method" || r || i) {
							let n = !t.static && Sr(t, "constructor"), o = n && e;
							n && a !== "method" && this.raise(t.key.start, "Constructor can't have get/set modifier"), t.kind = n ? "constructor" : a, this.parseClassMethod(t, r, i, o);
						} else this.parseClassField(t);
						return t;
					}
				};
				return t.declare ? this.tsInAmbientContext(l) : l(), t;
			}
			isClassElementNameStart() {
				return this.tsIsIdentifier() ? !0 : super.isClassElementNameStart();
			}
			parseClassSuper(e) {
				super.parseClassSuper(e), e.superClass && (this.tsMatchLeftRelational() || this.match(o.bitShift)) && (e.superTypeParameters = this.tsParseTypeArgumentsInExpression()), this.eatContextual("implements") && (e.implements = this.tsParseHeritageClause("implements"));
			}
			parseFunctionParams(e) {
				let t = this.tsTryParseTypeParameters(this.tsParseConstModifier);
				t && (e.typeParameters = t), super.parseFunctionParams(e);
			}
			parseVarId(e, t) {
				super.parseVarId(e, t), e.id.type === "Identifier" && !this.hasPrecedingLineBreak() && this.value === "!" && this.eat(o.prefix) && (e.definite = !0);
				let n = this.tsTryParseTypeAnnotation();
				n && (e.id.typeAnnotation = n, this.resetEndLocation(e.id));
			}
			parseArrowExpression(e, t, n, r) {
				this.match(o.colon) && (e.returnType = this.tsParseTypeAnnotation());
				let i = this.yieldPos, a = this.awaitPos, s = this.awaitIdentPos;
				this.enterScope(Rr(n, !1) | W.SCOPE_ARROW), this.initFunction(e);
				let c = this.maybeInArrowParameters;
				return this.ecmaVersion >= 8 && (e.async = !!n), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.maybeInArrowParameters = !0, e.params = this.toAssignableList(t, !0), this.maybeInArrowParameters = !1, this.parseFunctionBody(e, !0, !1, r), this.yieldPos = i, this.awaitPos = a, this.awaitIdentPos = s, this.maybeInArrowParameters = c, this.finishNode(e, "ArrowFunctionExpression");
			}
			parseMaybeAssignOrigin(e, t, n) {
				if (this.isContextual("yield")) {
					if (this.inGenerator) return this.parseYield(e);
					this.exprAllowed = !1;
				}
				let r = !1, i = -1, a = -1, s = -1;
				t ? (i = t.parenthesizedAssign, a = t.trailingComma, s = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new br(), r = !0);
				let c = this.start, l = this.startLoc;
				(this.type === o.parenL || y(this.type)) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = e === "await");
				let u = this.parseMaybeConditional(e, t);
				if (n && (u = n.call(this, u, c, l)), this.type.isAssign) {
					let n = this.startNodeAt(c, l);
					return n.operator = this.value, this.type === o.eq && (u = this.toAssignable(u, !0, t)), r || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= u.start && (t.shorthandAssign = -1), this.maybeInArrowParameters || (this.type === o.eq ? this.checkLValPattern(u) : this.checkLValSimple(u)), n.left = u, this.next(), n.right = this.parseMaybeAssign(e), s > -1 && (t.doubleProto = s), this.finishNode(n, "AssignmentExpression");
				} else r && this.checkExpressionErrors(t, !0);
				return i > -1 && (t.parenthesizedAssign = i), a > -1 && (t.trailingComma = a), u;
			}
			parseMaybeAssign(t, n, r) {
				let i, o, s;
				if (e?.jsx && (this.matchJsx("jsxTagStart") || this.tsMatchLeftRelational())) {
					if (i = this.cloneCurLookaheadState(), o = this.tryParse(() => this.parseMaybeAssignOrigin(t, n, r), i), !o.error) return o.node;
					let e = this.context, s = e[e.length - 1], c = e[e.length - 2];
					s === a.tokContexts.tc_oTag && c === a.tokContexts.tc_expr ? (e.pop(), e.pop()) : (s === a.tokContexts.tc_oTag || s === a.tokContexts.tc_expr) && e.pop();
				}
				if (!o?.error && !this.tsMatchLeftRelational()) return this.parseMaybeAssignOrigin(t, n, r);
				(!i || this.compareLookaheadState(i, this.getCurLookaheadState())) && (i = this.cloneCurLookaheadState());
				let c, l = this.tryParse((e) => {
					c = this.tsParseTypeParameters(this.tsParseConstModifier);
					let i = this.parseMaybeAssignOrigin(t, n, r);
					return (i.type !== "ArrowFunctionExpression" || i.extra?.parenthesized) && e(), c?.params.length !== 0 && this.resetStartLocationFromNode(i, c), i.typeParameters = c, i;
				}, i);
				if (!l.error && !l.aborted) return c && this.reportReservedArrowTypeParam(c), l.node;
				if (!o && (Mr(!0), s = this.tryParse(() => this.parseMaybeAssignOrigin(t, n, r), i), !s.error)) return s.node;
				if (o?.node) return this.setLookaheadState(o.failState), o.node;
				if (l.node) return this.setLookaheadState(l.failState), c && this.reportReservedArrowTypeParam(c), l.node;
				if (s?.node) return this.setLookaheadState(s.failState), s.node;
				throw o?.thrown ? o.error : l.thrown ? l.error : s?.thrown ? s.error : o?.error || l.error || s?.error;
			}
			parseAssignableListItem(e) {
				let t = [];
				for (; this.match(p.at);) t.push(this.parseDecorator());
				let n = this.start, r = this.startLoc, i, a = !1, o = !1;
				if (e !== void 0) {
					let t = {};
					this.tsParseModifiers({
						modified: t,
						allowedModifiers: [
							"public",
							"private",
							"protected",
							"override",
							"readonly"
						]
					}), i = t.accessibility, o = t.override, a = t.readonly, e === !1 && (i || a || o) && this.raise(r.column, U.UnexpectedParameterModifier);
				}
				let s = this.parseMaybeDefault(n, r);
				this.parseBindingListItem(s);
				let c = this.parseMaybeDefault(s.start, s.loc.start, s);
				if (t.length && (c.decorators = t), i || a || o) {
					let e = this.startNodeAt(n, r);
					return i && (e.accessibility = i), a && (e.readonly = a), o && (e.override = o), c.type !== "Identifier" && c.type !== "AssignmentPattern" && this.raise(e.start, U.UnsupportedParameterPropertyKind), e.parameter = c, this.finishNode(e, "TSParameterProperty");
				}
				return c;
			}
			checkLValInnerPattern(e, t = W.BIND_NONE, n) {
				switch (e.type) {
					case "TSParameterProperty":
						this.checkLValInnerPattern(e.parameter, t, n);
						break;
					default:
						super.checkLValInnerPattern(e, t, n);
						break;
				}
			}
			parseBindingListItem(e) {
				this.eat(o.question) && (e.type !== "Identifier" && !this.isAmbientContext && !this.inType && this.raise(e.start, U.PatternIsOptional), e.optional = !0);
				let t = this.tsTryParseTypeAnnotation();
				return t && (e.typeAnnotation = t), this.resetEndLocation(e), e;
			}
			isAssignable(e, t) {
				switch (e.type) {
					case "TSTypeCastExpression": return this.isAssignable(e.expression, t);
					case "TSParameterProperty": return !0;
					case "Identifier":
					case "ObjectPattern":
					case "ArrayPattern":
					case "AssignmentPattern":
					case "RestElement": return !0;
					case "ObjectExpression": {
						let t = e.properties.length - 1;
						return e.properties.every((e, n) => e.type !== "ObjectMethod" && (n === t || e.type !== "SpreadElement") && this.isAssignable(e));
					}
					case "Property":
					case "ObjectProperty": return this.isAssignable(e.value);
					case "SpreadElement": return this.isAssignable(e.argument);
					case "ArrayExpression": return e.elements.every((e) => e === null || this.isAssignable(e));
					case "AssignmentExpression": return e.operator === "=";
					case "ParenthesizedExpression": return this.isAssignable(e.expression);
					case "MemberExpression":
					case "OptionalMemberExpression": return !t;
					default: return !1;
				}
			}
			toAssignable(e, t = !1, n = new br()) {
				switch (e.type) {
					case "ParenthesizedExpression": return this.toAssignableParenthesizedExpression(e, t, n);
					case "TSAsExpression":
					case "TSSatisfiesExpression":
					case "TSNonNullExpression":
					case "TSTypeAssertion": return t || this.raise(e.start, U.UnexpectedTypeCastInParameter), this.toAssignable(e.expression, t, n);
					case "MemberExpression": break;
					case "AssignmentExpression": return !t && e.left.type === "TSTypeCastExpression" && (e.left = this.typeCastToParameter(e.left)), super.toAssignable(e, t, n);
					case "TSTypeCastExpression": return this.typeCastToParameter(e);
					default: return super.toAssignable(e, t, n);
				}
				return e;
			}
			toAssignableParenthesizedExpression(e, t, n) {
				switch (e.expression.type) {
					case "TSAsExpression":
					case "TSSatisfiesExpression":
					case "TSNonNullExpression":
					case "TSTypeAssertion":
					case "ParenthesizedExpression": return this.toAssignable(e.expression, t, n);
					default: return super.toAssignable(e, t, n);
				}
			}
			parseBindingAtom() {
				switch (this.type) {
					case o._this: return this.parseIdent(!0);
					default: return super.parseBindingAtom();
				}
			}
			shouldParseArrow(e) {
				let t;
				if (t = this.match(o.colon) ? e.every((e) => this.isAssignable(e, !0)) : !this.canInsertSemicolon(), t) {
					if (this.match(o.colon)) {
						let e = this.tryParse((e) => {
							let t = this.tsParseTypeOrTypePredicateAnnotation(o.colon);
							return (this.canInsertSemicolon() || !this.match(o.arrow)) && e(), t;
						});
						if (e.aborted) return this.shouldParseArrowReturnType = void 0, !1;
						e.thrown || (e.error && this.setLookaheadState(e.failState), this.shouldParseArrowReturnType = e.node);
					}
					return this.match(o.arrow) ? !0 : (this.shouldParseArrowReturnType = void 0, !1);
				}
				return this.shouldParseArrowReturnType = void 0, t;
			}
			parseParenArrowList(e, t, n, r) {
				let i = this.startNodeAt(e, t);
				return i.returnType = this.shouldParseArrowReturnType, this.shouldParseArrowReturnType = void 0, this.parseArrowExpression(i, n, !1, r);
			}
			parseParenAndDistinguishExpression(e, t) {
				let n = this.start, r = this.startLoc, i, a = this.ecmaVersion >= 8;
				if (this.ecmaVersion >= 6) {
					let s = this.maybeInArrowParameters;
					this.maybeInArrowParameters = !0, this.next();
					let c = this.start, l = this.startLoc, u = [], d = !0, f = !1, p = new br(), m = this.yieldPos, h = this.awaitPos, g;
					for (this.yieldPos = 0, this.awaitPos = 0; this.type !== o.parenR;) if (d ? d = !1 : this.expect(o.comma), a && this.afterTrailingComma(o.parenR, !0)) {
						f = !0;
						break;
					} else if (this.type === o.ellipsis) {
						g = this.start, u.push(this.parseParenItem(this.parseRestBinding())), this.type === o.comma && this.raise(this.start, "Comma is not permitted after the rest element");
						break;
					} else u.push(this.parseMaybeAssign(t, p, this.parseParenItem));
					let _ = this.lastTokEnd, v = this.lastTokEndLoc;
					if (this.expect(o.parenR), this.maybeInArrowParameters = s, e && this.shouldParseArrow(u) && this.eat(o.arrow)) return this.checkPatternErrors(p, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = m, this.awaitPos = h, this.parseParenArrowList(n, r, u, t);
					(!u.length || f) && this.unexpected(this.lastTokStart), g && this.unexpected(g), this.checkExpressionErrors(p, !0), this.yieldPos = m || this.yieldPos, this.awaitPos = h || this.awaitPos, u.length > 1 ? (i = this.startNodeAt(c, l), i.expressions = u, this.finishNodeAt(i, "SequenceExpression", _, v)) : i = u[0];
				} else i = this.parseParenExpression();
				if (this.options.preserveParens) {
					let e = this.startNodeAt(n, r);
					return e.expression = i, this.finishNode(e, "ParenthesizedExpression");
				} else return i;
			}
			parseTaggedTemplateExpression(e, t, n, r) {
				let i = this.startNodeAt(t, n);
				return i.tag = e, i.quasi = this.parseTemplate({ isTagged: !0 }), r && this.raise(t, "Tagged Template Literals are not allowed in optionalChain."), this.finishNode(i, "TaggedTemplateExpression");
			}
			shouldParseAsyncArrow() {
				if (this.match(o.colon)) {
					let e = this.tryParse((e) => {
						let t = this.tsParseTypeOrTypePredicateAnnotation(o.colon);
						return (this.canInsertSemicolon() || !this.match(o.arrow)) && e(), t;
					});
					if (e.aborted) return this.shouldParseAsyncArrowReturnType = void 0, !1;
					if (!e.thrown) return e.error && this.setLookaheadState(e.failState), this.shouldParseAsyncArrowReturnType = e.node, !this.canInsertSemicolon() && this.eat(o.arrow);
				} else return !this.canInsertSemicolon() && this.eat(o.arrow);
			}
			parseSubscriptAsyncArrow(e, t, n, r) {
				let i = this.startNodeAt(e, t);
				return i.returnType = this.shouldParseAsyncArrowReturnType, this.shouldParseAsyncArrowReturnType = void 0, this.parseArrowExpression(i, n, !0, r);
			}
			parseExprList(e, t, n, r) {
				let i = [], a = !0;
				for (; !this.eat(e);) {
					if (a) a = !1;
					else if (this.expect(o.comma), t && this.afterTrailingComma(e)) break;
					let s;
					n && this.type === o.comma ? s = null : this.type === o.ellipsis ? (s = this.parseSpread(r), this.maybeInArrowParameters && this.match(o.colon) && (s.typeAnnotation = this.tsParseTypeAnnotation()), r && this.type === o.comma && r.trailingComma < 0 && (r.trailingComma = this.start)) : s = this.parseMaybeAssign(!1, r, this.parseParenItem), i.push(s);
				}
				return i;
			}
			parseSubscript(e, t, n, r, i, a, s) {
				let c = a;
				if (!this.hasPrecedingLineBreak() && this.value === "!" && this.match(o.prefix)) {
					this.exprAllowed = !1, this.next();
					let r = this.startNodeAt(t, n);
					return r.expression = e, e = this.finishNode(r, "TSNonNullExpression"), e;
				}
				let l = !1;
				if (this.match(o.questionDot) && this.lookaheadCharCode() === 60) {
					if (r) return e;
					e.optional = !0, c = l = !0, this.next();
				}
				if (this.tsMatchLeftRelational() || this.match(o.bitShift)) {
					let i, a = this.tsTryParseAndCatch(() => {
						if (!r && this.atPossibleAsyncArrow(e)) {
							let r = this.tsTryParseGenericAsyncArrowFunction(t, n, s);
							if (r) return e = r, e;
						}
						let a = this.tsParseTypeArgumentsInExpression();
						if (!a) return e;
						if (l && !this.match(o.parenL)) return i = this.curPosition(), e;
						if (_(this.type) || this.type === o.backQuote) {
							let r = this.parseTaggedTemplateExpression(e, t, n, c);
							return r.typeArguments = a, r;
						}
						if (!r && this.eat(o.parenL)) {
							let r = new br(), i = this.startNodeAt(t, n);
							return i.callee = e, i.arguments = this.parseExprList(o.parenR, this.ecmaVersion >= 8, !1, r), this.tsCheckForInvalidTypeCasts(i.arguments), i.typeArguments = a, c && (i.optional = l), this.checkExpressionErrors(r, !0), e = this.finishNode(i, "CallExpression"), e;
						}
						let u = this.type;
						if (this.tsMatchRightRelational() || u === o.bitShift || u !== o.parenL && Hr(u) && !this.hasPrecedingLineBreak()) return;
						let d = this.startNodeAt(t, n);
						return d.expression = e, d.typeArguments = a, this.finishNode(d, "TSInstantiationExpression");
					});
					if (i && this.unexpected(i), a) return a.type === "TSInstantiationExpression" && (this.match(o.dot) || this.match(o.questionDot) && this.lookaheadCharCode() !== 40) && this.raise(this.start, U.InvalidPropertyAccessAfterInstantiationExpression), e = a, e;
				}
				let u = this.ecmaVersion >= 11, d = u && this.eat(o.questionDot);
				r && d && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
				let f = this.eat(o.bracketL);
				if (f || d && this.type !== o.parenL && this.type !== o.backQuote || this.eat(o.dot)) {
					let r = this.startNodeAt(t, n);
					r.object = e, f ? (r.property = this.parseExpression(), this.expect(o.bracketR)) : this.type === o.privateId && e.type !== "Super" ? r.property = this.parsePrivateIdent() : r.property = this.parseIdent(this.options.allowReserved !== "never"), r.computed = !!f, u && (r.optional = d), e = this.finishNode(r, "MemberExpression");
				} else if (!r && this.eat(o.parenL)) {
					let r = this.maybeInArrowParameters;
					this.maybeInArrowParameters = !0;
					let a = new br(), c = this.yieldPos, l = this.awaitPos, f = this.awaitIdentPos;
					this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
					let p = this.parseExprList(o.parenR, this.ecmaVersion >= 8, !1, a);
					if (i && !d && this.shouldParseAsyncArrow()) this.checkPatternErrors(a, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = c, this.awaitPos = l, this.awaitIdentPos = f, e = this.parseSubscriptAsyncArrow(t, n, p, s);
					else {
						this.checkExpressionErrors(a, !0), this.yieldPos = c || this.yieldPos, this.awaitPos = l || this.awaitPos, this.awaitIdentPos = f || this.awaitIdentPos;
						let r = this.startNodeAt(t, n);
						r.callee = e, r.arguments = p, u && (r.optional = d), e = this.finishNode(r, "CallExpression");
					}
					this.maybeInArrowParameters = r;
				} else if (this.type === o.backQuote) {
					(d || c) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
					let r = this.startNodeAt(t, n);
					r.tag = e, r.quasi = this.parseTemplate({ isTagged: !0 }), e = this.finishNode(r, "TaggedTemplateExpression");
				}
				return e;
			}
			parseGetterSetter(e) {
				e.kind = e.key.name, this.parsePropertyName(e);
				let t = this.tsTryParseTypeParameters(this.tsParseConstModifier);
				e.value = this.parseMethod(!1), t && (e.value.typeParameters = t);
				let n = e.kind === "get" ? 0 : 1, r = e.value.params[0];
				if (n = r && this.isThisParam(r) ? n + 1 : n, e.value.params.length !== n) {
					let t = e.value.start;
					e.kind === "get" ? this.raiseRecoverable(t, "getter should have no params") : this.raiseRecoverable(t, "setter should have exactly one param");
				} else e.kind === "set" && e.value.params[0].type === "RestElement" && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params");
			}
			parsePropertyValue(e, t, n, r, i, a, o, s) {
				if (this.tsMatchLeftRelational()) {
					t && this.unexpected(), e.kind = "init", e.method = !0;
					let i = this.tsTryParseTypeParameters(this.tsParseConstModifier);
					e.value = this.parseMethod(n, r), i && (e.value.typeParameters = i);
					return;
				}
				return super.parsePropertyValue(e, t, n, r, i, a, o, s);
			}
			parseProperty(e, t) {
				if (!e) {
					let n = [];
					if (this.match(p.at)) for (; this.match(p.at);) n.push(this.parseDecorator());
					let r = super.parseProperty(e, t);
					return r.type === "SpreadElement" && n.length && this.raise(r.start, Cr.SpreadElementDecorator), n.length && (r.decorators = n, n = []), r;
				}
				return super.parseProperty(e, t);
			}
			parseCatchClauseParam() {
				let e = this.parseBindingAtom(), t = e.type === "Identifier";
				this.enterScope(t ? W.SCOPE_SIMPLE_CATCH : 0), this.checkLValPattern(e, t ? W.BIND_SIMPLE_CATCH : W.BIND_LEXICAL);
				let n = this.tsTryParseTypeAnnotation();
				return n && (e.typeAnnotation = n, this.resetEndLocation(e)), this.expect(o.parenR), e;
			}
			parseClass(e, t) {
				let n = this.inAbstractClass;
				this.inAbstractClass = !!e.abstract;
				try {
					this.next(), this.takeDecorators(e);
					let n = this.strict;
					this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
					let r = this.enterClassBody(), i = this.startNode(), a = !1;
					i.body = [];
					let s = [];
					for (this.expect(o.braceL); this.type !== o.braceR;) {
						if (this.match(p.at)) {
							s.push(this.parseDecorator());
							continue;
						}
						let t = this.parseClassElement(e.superClass !== null);
						s.length && (t.decorators = s, this.resetStartLocationFromNode(t, s[0]), s = []), t && (i.body.push(t), t.type === "MethodDefinition" && t.kind === "constructor" && t.value.type === "FunctionExpression" ? (a && this.raiseRecoverable(t.start, "Duplicate constructor in the same class"), a = !0, t.decorators && t.decorators.length > 0 && this.raise(t.start, Cr.DecoratorConstructor)) : t.key && t.key.type === "PrivateIdentifier" && t.value?.type !== "TSDeclareMethod" && xr(r, t) && this.raiseRecoverable(t.key.start, `Identifier '#${t.key.name}' has already been declared`));
					}
					return this.strict = n, this.next(), s.length && this.raise(this.start, Cr.TrailingDecorator), e.body = this.finishNode(i, "ClassBody"), this.exitClassBody(), this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression");
				} finally {
					this.inAbstractClass = n;
				}
			}
			parseClassFunctionParams() {
				let e = this.tsTryParseTypeParameters(), t = this.parseBindingList(o.parenR, !1, this.ecmaVersion >= 8, !0);
				return e && (t.typeParameters = e), t;
			}
			parseMethod(e, t, n, r, i) {
				let a = this.startNode(), s = this.yieldPos, c = this.awaitPos, l = this.awaitIdentPos;
				if (this.initFunction(a), this.ecmaVersion >= 6 && (a.generator = e), this.ecmaVersion >= 8 && (a.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(Rr(t, a.generator) | W.SCOPE_SUPER | (n ? W.SCOPE_DIRECT_SUPER : 0)), this.expect(o.parenL), a.params = this.parseClassFunctionParams(), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(a, !1, !0, !1, { isClassMethod: r }), this.yieldPos = s, this.awaitPos = c, this.awaitIdentPos = l, i && i.abstract && a.body) {
					let { key: e } = i;
					this.raise(i.start, U.AbstractMethodHasImplementation({ methodName: e.type === "Identifier" && !i.computed ? e.name : `[${this.input.slice(e.start, e.end)}]` }));
				}
				return this.finishNode(a, "FunctionExpression");
			}
			static parse(e, n) {
				if (n.locations === !1) throw Error("You have to enable options.locations while using acorn-typescript");
				n.locations = !0;
				let r = new this(n, e);
				return t && (r.isAmbientContext = !0), r.parse();
			}
			static parseExpressionAt(e, n, r) {
				if (r.locations === !1) throw Error("You have to enable options.locations while using acorn-typescript");
				r.locations = !0;
				let i = new this(r, e, n);
				return t && (i.isAmbientContext = !0), i.nextToken(), i.parseExpression();
			}
			parseImportSpecifier() {
				if (this.ts_isContextual(p.type)) {
					let e = this.startNode();
					return e.imported = this.parseModuleExportName(), this.parseTypeOnlyImportExportSpecifier(e, !0, this.importOrExportOuterKind === "type"), this.finishNode(e, "ImportSpecifier");
				} else {
					let e = super.parseImportSpecifier();
					return e.importKind = "value", e;
				}
			}
			parseExportSpecifier(e) {
				let t = this.ts_isContextual(p.type);
				if (!this.match(o.string) && t) {
					let t = this.startNode();
					return t.local = this.parseModuleExportName(), this.parseTypeOnlyImportExportSpecifier(t, !1, this.importOrExportOuterKind === "type"), this.finishNode(t, "ExportSpecifier"), this.checkExport(e, t.exported, t.exported.start), t;
				} else {
					let t = super.parseExportSpecifier(e);
					return t.exportKind = "value", t;
				}
			}
			parseTypeOnlyImportExportSpecifier(e, t, n) {
				let r = t ? "imported" : "local", i = t ? "local" : "exported", a = e[r], o, s = !1, c = !0, l = a.start;
				if (this.isContextual("as")) {
					let e = this.parseIdent();
					if (this.isContextual("as")) {
						let n = this.parseIdent();
						b(this.type) ? (s = !0, a = e, o = t ? this.parseIdent() : this.parseModuleExportName(), c = !1) : (o = n, c = !1);
					} else b(this.type) ? (c = !1, o = t ? this.parseIdent() : this.parseModuleExportName()) : (s = !0, a = e);
				} else b(this.type) && (s = !0, t ? (a = super.parseIdent(!0), this.isContextual("as") || this.checkUnreserved(a)) : a = this.parseModuleExportName());
				s && n && this.raise(l, t ? U.TypeModifierIsUsedInTypeImports : U.TypeModifierIsUsedInTypeExports), e[r] = a, e[i] = o;
				let u = t ? "importKind" : "exportKind";
				e[u] = s ? "type" : "value", c && this.eatContextual("as") && (e[i] = t ? this.parseIdent() : this.parseModuleExportName()), e[i] || (e[i] = this.copyNode(e[r])), t && this.checkLValSimple(e[i], W.BIND_LEXICAL);
			}
			raiseCommonCheck(e, t, n) {
				switch (t) {
					case "Comma is not permitted after the rest element": if (this.isAmbientContext && this.match(o.comma) && this.lookaheadCharCode() === 41) {
						this.next();
						return;
					} else return super.raise(e, t);
				}
				return n ? super.raiseRecoverable(e, t) : super.raise(e, t);
			}
			raiseRecoverable(e, t) {
				return this.raiseCommonCheck(e, t, !0);
			}
			raise(e, t) {
				return this.raiseCommonCheck(e, t, !0);
			}
			updateContext(e) {
				let { type: t } = this;
				if (t == o.braceL) {
					var n = this.curContext();
					n == m.tc_oTag ? this.context.push(d.b_expr) : n == m.tc_expr ? this.context.push(d.b_tmpl) : super.updateContext(e), this.exprAllowed = !0;
				} else if (t === o.slash && e === p.jsxTagStart) this.context.length -= 2, this.context.push(m.tc_cTag), this.exprAllowed = !1;
				else return super.updateContext(e);
			}
			jsx_parseOpeningElementAt(e, t) {
				let n = this.startNodeAt(e, t), r = this.jsx_parseElementName();
				if (r && (n.name = r), this.match(o.relational) || this.match(o.bitShift)) {
					let e = this.tsTryParseAndCatch(() => this.tsParseTypeArgumentsInExpression());
					e && (n.typeArguments = e);
				}
				for (n.attributes = []; this.type !== o.slash && this.type !== p.jsxTagEnd;) n.attributes.push(this.jsx_parseAttribute());
				return n.selfClosing = this.eat(o.slash), this.expect(p.jsxTagEnd), this.finishNode(n, r ? "JSXOpeningElement" : "JSXOpeningFragment");
			}
			enterScope(e) {
				e === ir && this.importsStack.push([]), super.enterScope(e);
				let t = super.currentScope();
				t.types = [], t.enums = [], t.constEnums = [], t.classes = [], t.exportOnlyBindings = [];
			}
			exitScope() {
				super.currentScope().flags === ir && this.importsStack.pop(), super.exitScope();
			}
			hasImport(e, t) {
				let n = this.importsStack.length;
				if (this.importsStack[n - 1].indexOf(e) > -1) return !0;
				if (!t && n > 1) {
					for (let t = 0; t < n - 1; t++) if (this.importsStack[t].indexOf(e) > -1) return !0;
				}
				return !1;
			}
			maybeExportDefined(e, t) {
				this.inModule && e.flags & W.SCOPE_TOP && delete this.undefinedExports[t];
			}
			declareName(e, t, n) {
				if (t & W.BIND_FLAGS_TS_IMPORT) {
					this.hasImport(e, !0) && this.raise(n, `Identifier '${e}' has already been declared.`), this.importsStack[this.importsStack.length - 1].push(e);
					return;
				}
				let r = this.currentScope();
				if (t & W.BIND_FLAGS_TS_EXPORT_ONLY) {
					this.maybeExportDefined(r, e), r.exportOnlyBindings.push(e);
					return;
				}
				t === W.BIND_TS_TYPE || t === W.BIND_TS_INTERFACE ? (t === W.BIND_TS_TYPE && r.types.includes(e) && this.raise(n, `type '${e}' has already been declared.`), r.types.push(e)) : super.declareName(e, t, n), t & W.BIND_FLAGS_TS_ENUM && r.enums.push(e), t & W.BIND_FLAGS_TS_CONST_ENUM && r.constEnums.push(e), t & W.BIND_FLAGS_CLASS && r.classes.push(e);
			}
			checkLocalExport(e) {
				let { name: t } = e;
				if (this.hasImport(t)) return;
				let n = this.scopeStack.length;
				for (let e = n - 1; e >= 0; e--) {
					let n = this.scopeStack[e];
					if (n.types.indexOf(t) > -1 || n.exportOnlyBindings.indexOf(t) > -1) return;
				}
				super.checkLocalExport(e);
			}
		}
		return ne;
	};
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/errors.js
var Kr = class extends Error {
	message = "";
	#e;
	constructor(e, t, n) {
		super(t), this.stack = "", this.#e = new ye(e, t, n), Object.assign(this, this.#e), this.name = "CompileError";
	}
	toString() {
		return this.#e.toString();
	}
	toJSON() {
		return this.#e.toJSON();
	}
};
function G(e, t, n) {
	let r = typeof e == "number" ? e : e?.start, i = typeof e == "number" ? e : e?.end;
	throw new Kr(t, n, r === void 0 ? void 0 : [r, i ?? r]);
}
function qr(e, t) {
	G(e, "options_invalid_value", `Invalid compiler option: ${t}\nhttps://svelte.dev/e/options_invalid_value`);
}
function Jr(e, t) {
	G(e, "options_removed", `Invalid compiler option: ${t}\nhttps://svelte.dev/e/options_removed`);
}
function Yr(e, t) {
	G(e, "options_unrecognised", `Unrecognised compiler option ${t}\nhttps://svelte.dev/e/options_unrecognised`);
}
function Xr(e) {
	G(e, "css_empty_declaration", "Declaration cannot be empty\nhttps://svelte.dev/e/css_empty_declaration");
}
function Zr(e) {
	G(e, "css_expected_identifier", "Expected a valid CSS identifier\nhttps://svelte.dev/e/css_expected_identifier");
}
function Qr(e) {
	G(e, "css_selector_invalid", "Invalid selector\nhttps://svelte.dev/e/css_selector_invalid");
}
function $r(e) {
	G(e, "attribute_duplicate", "Attributes need to be unique\nhttps://svelte.dev/e/attribute_duplicate");
}
function ei(e) {
	G(e, "attribute_empty_shorthand", "Attribute shorthand cannot be empty\nhttps://svelte.dev/e/attribute_empty_shorthand");
}
function ti(e, t) {
	G(e, "block_duplicate_clause", `${t} cannot appear more than once within a block\nhttps://svelte.dev/e/block_duplicate_clause`);
}
function ni(e) {
	G(e, "block_invalid_continuation_placement", "{:...} block is invalid at this position (did you forget to close the preceding element or block?)\nhttps://svelte.dev/e/block_invalid_continuation_placement");
}
function ri(e) {
	G(e, "block_invalid_elseif", "'elseif' should be 'else if'\nhttps://svelte.dev/e/block_invalid_elseif");
}
function ii(e, t, n) {
	G(e, "block_invalid_placement", `{#${t} ...} block cannot be ${n}\nhttps://svelte.dev/e/block_invalid_placement`);
}
function ai(e) {
	G(e, "block_unclosed", "Block was left open\nhttps://svelte.dev/e/block_unclosed");
}
function oi(e) {
	G(e, "block_unexpected_close", "Unexpected block closing tag\nhttps://svelte.dev/e/block_unexpected_close");
}
function si(e) {
	G(e, "const_tag_invalid_expression", "{@const ...} must consist of a single variable declaration\nhttps://svelte.dev/e/const_tag_invalid_expression");
}
function ci(e) {
	G(e, "debug_tag_invalid_arguments", "{@debug ...} arguments must be identifiers, not arbitrary expressions\nhttps://svelte.dev/e/debug_tag_invalid_arguments");
}
function li(e) {
	G(e, "declaration_tag_invalid_type", "Declaration tags must be `let` or `const` declarations\nhttps://svelte.dev/e/declaration_tag_invalid_type");
}
function ui(e) {
	G(e, "directive_invalid_value", "Directive value must be a JavaScript expression enclosed in curly braces\nhttps://svelte.dev/e/directive_invalid_value");
}
function di(e, t) {
	G(e, "directive_missing_name", `\`${t}\` name cannot be empty\nhttps://svelte.dev/e/directive_missing_name`);
}
function fi(e, t) {
	G(e, "element_invalid_closing_tag", `\`</${t}>\` attempted to close an element that was not open\nhttps://svelte.dev/e/element_invalid_closing_tag`);
}
function pi(e, t, n) {
	G(e, "element_invalid_closing_tag_autoclosed", `\`</${t}>\` attempted to close element that was already automatically closed by \`<${n}>\` (cannot nest \`<${n}>\` inside \`<${t}>\`)\nhttps://svelte.dev/e/element_invalid_closing_tag_autoclosed`);
}
function mi(e, t) {
	G(e, "element_unclosed", `\`<${t}>\` was left open\nhttps://svelte.dev/e/element_unclosed`);
}
function hi(e) {
	G(e, "expected_attribute_value", "Expected attribute value\nhttps://svelte.dev/e/expected_attribute_value");
}
function gi(e) {
	G(e, "expected_block_type", "Expected 'if', 'each', 'await', 'key' or 'snippet'\nhttps://svelte.dev/e/expected_block_type");
}
function _i(e) {
	G(e, "expected_identifier", "Expected an identifier\nhttps://svelte.dev/e/expected_identifier");
}
function vi(e) {
	G(e, "expected_pattern", "Expected identifier or destructure pattern\nhttps://svelte.dev/e/expected_pattern");
}
function yi(e) {
	G(e, "expected_tag", "Expected 'html', 'render', 'attach', 'const', or 'debug'\nhttps://svelte.dev/e/expected_tag");
}
function bi(e, t) {
	G(e, "expected_token", `Expected token ${t}\nhttps://svelte.dev/e/expected_token`);
}
function xi(e) {
	G(e, "expected_whitespace", "Expected whitespace\nhttps://svelte.dev/e/expected_whitespace");
}
function Si(e, t) {
	G(e, "js_parse_error", `${t}\nhttps://svelte.dev/e/js_parse_error`);
}
function Ci(e) {
	G(e, "render_tag_invalid_expression", "`{@render ...}` tags can only contain call expressions\nhttps://svelte.dev/e/render_tag_invalid_expression");
}
function wi(e) {
	G(e, "script_duplicate", "A component can have a single top-level `<script>` element and/or a single top-level `<script module>` element\nhttps://svelte.dev/e/script_duplicate");
}
function Ti(e, t) {
	G(e, "script_invalid_attribute_value", `If the \`${t}\` attribute is supplied, it must be a boolean attribute\nhttps://svelte.dev/e/script_invalid_attribute_value`);
}
function Ei(e) {
	G(e, "script_invalid_context", "If the context attribute is supplied, its value must be \"module\"\nhttps://svelte.dev/e/script_invalid_context");
}
function Di(e, t) {
	G(e, "script_reserved_attribute", `The \`${t}\` attribute is reserved and cannot be used\nhttps://svelte.dev/e/script_reserved_attribute`);
}
function Oi(e) {
	G(e, "style_duplicate", "A component can have a single top-level `<style>` element\nhttps://svelte.dev/e/style_duplicate");
}
function ki(e) {
	G(e, "svelte_component_invalid_this", "Invalid component definition — must be an `{expression}`\nhttps://svelte.dev/e/svelte_component_invalid_this");
}
function Ai(e) {
	G(e, "svelte_component_missing_this", "`<svelte:component>` must have a 'this' attribute\nhttps://svelte.dev/e/svelte_component_missing_this");
}
function ji(e) {
	G(e, "svelte_element_missing_this", "`<svelte:element>` must have a 'this' attribute with a value\nhttps://svelte.dev/e/svelte_element_missing_this");
}
function Mi(e, t) {
	G(e, "svelte_meta_duplicate", `A component can only have one \`<${t}>\` element\nhttps://svelte.dev/e/svelte_meta_duplicate`);
}
function Ni(e, t) {
	G(e, "svelte_meta_invalid_content", `<${t}> cannot have children\nhttps://svelte.dev/e/svelte_meta_invalid_content`);
}
function Pi(e, t) {
	G(e, "svelte_meta_invalid_placement", `\`<${t}>\` tags cannot be inside elements or blocks\nhttps://svelte.dev/e/svelte_meta_invalid_placement`);
}
function Fi(e, t) {
	G(e, "svelte_meta_invalid_tag", `Valid \`<svelte:...>\` tag names are ${t}\nhttps://svelte.dev/e/svelte_meta_invalid_tag`);
}
function Ii(e) {
	G(e, "svelte_options_deprecated_tag", "\"tag\" option is deprecated — use \"customElement\" instead\nhttps://svelte.dev/e/svelte_options_deprecated_tag");
}
function Li(e) {
	G(e, "svelte_options_invalid_attribute", "`<svelte:options>` can only receive static attributes\nhttps://svelte.dev/e/svelte_options_invalid_attribute");
}
function Ri(e, t) {
	G(e, "svelte_options_invalid_attribute_value", `Value must be ${t}, if specified\nhttps://svelte.dev/e/svelte_options_invalid_attribute_value`);
}
function zi(e) {
	G(e, "svelte_options_invalid_customelement", "\"customElement\" must be a string literal defining a valid custom element name or an object of the form { tag?: string; shadow?: \"open\" | \"none\" | `ShadowRootInit`; props?: { [key: string]: { attribute?: string; reflect?: boolean; type: .. } } }\nhttps://svelte.dev/e/svelte_options_invalid_customelement");
}
function Bi(e) {
	G(e, "svelte_options_invalid_customelement_props", "\"props\" must be a statically analyzable object literal of the form \"{ [key: string]: { attribute?: string; reflect?: boolean; type?: \"String\" | \"Boolean\" | \"Number\" | \"Array\" | \"Object\" }\"\nhttps://svelte.dev/e/svelte_options_invalid_customelement_props");
}
function Vi(e) {
	G(e, "svelte_options_invalid_customelement_shadow", "\"shadow\" must be either \"open\", \"none\" or `ShadowRootInit` object.\nhttps://svelte.dev/e/svelte_options_invalid_customelement_shadow");
}
function Hi(e) {
	G(e, "svelte_options_invalid_tagname", "Tag name must be lowercase and hyphenated\nhttps://svelte.dev/e/svelte_options_invalid_tagname");
}
function Ui(e) {
	G(e, "svelte_options_reserved_tagname", "Tag name is reserved\nhttps://svelte.dev/e/svelte_options_reserved_tagname");
}
function Wi(e, t) {
	G(e, "svelte_options_unknown_attribute", `\`<svelte:options>\` unknown attribute '${t}'\nhttps://svelte.dev/e/svelte_options_unknown_attribute`);
}
function Gi(e) {
	G(e, "tag_invalid_name", "Expected a valid element or component name. Components must have a valid variable name or dot notation expression\nhttps://svelte.dev/e/tag_invalid_name");
}
function Ki(e, t, n) {
	G(e, "tag_invalid_placement", `{@${t} ...} tag cannot be ${n}\nhttps://svelte.dev/e/tag_invalid_placement`);
}
function qi(e) {
	G(e, "unexpected_eof", "Unexpected end of input\nhttps://svelte.dev/e/unexpected_eof");
}
function Ji(e, t) {
	G(e, "unexpected_reserved_word", `'${t}' is a reserved word in JavaScript and cannot be used here\nhttps://svelte.dev/e/unexpected_reserved_word`);
}
function Yi(e) {
	G(e, "unterminated_string_constant", "Unterminated string constant\nhttps://svelte.dev/e/unterminated_string_constant");
}
function Xi(e) {
	G(e, "void_element_invalid_content", "Void elements cannot have children or closing tags\nhttps://svelte.dev/e/void_element_invalid_content");
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/acorn.js
var Zi = P, Qi = Zi.extend(Gr());
function $i(e, t, n, r) {
	let i = n ? Qi : Zi, { onComment: a, add_comments: o } = aa(e, t), s = i.prototype.parseStatement;
	r && (i.prototype.parseStatement = function(...e) {
		let t = s.call(this, ...e);
		return this.undefinedExports = {}, t;
	});
	try {
		let t = i.parse(e, {
			onComment: a,
			sourceType: "module",
			ecmaVersion: 16,
			locations: !0
		});
		return o(t), t;
	} catch (e) {
		return ra(e);
	} finally {
		r && (i.prototype.parseStatement = s);
	}
}
function ea(e, t, n) {
	let r = e.ts ? Qi : Zi, { onComment: i, add_comments: a } = aa(t, e.root.comments, n);
	try {
		let e = r.parseExpressionAt(t, n, {
			onComment: i,
			sourceType: "module",
			ecmaVersion: 16,
			locations: !0,
			preserveParens: !0
		});
		return a(e), e;
	} catch (e) {
		ra(e);
	}
}
function ta(e, t, n) {
	let r = e.ts ? Qi : Zi, { onComment: i, add_comments: a } = aa(t, e.root.comments, n);
	try {
		let e = new r({
			onComment: i,
			sourceType: "module",
			ecmaVersion: 16,
			locations: !0
		}, t, n);
		e.nextToken();
		let o = e.parseStatement(null, !0, Object.create(null));
		return a(o), o;
	} catch (e) {
		e.pos === t.length && qi(t.length), ra(e);
	}
}
var na = / \(\d+:\d+\)$/;
function ra(e) {
	Si(e.pos, e.message.replace(na, ""));
}
function ia(e) {
	return u(e, null, { ParenthesizedExpression(e, t) {
		return t.visit(e.expression);
	} });
}
function aa(e, t, n = 0) {
	return {
		onComment: (n, r, i, a, o, s) => {
			if (n && /\n/.test(r)) {
				let t = i;
				for (; t > 0 && e[t - 1] !== "\n";) --t;
				let n = t;
				for (; /[ \t]/.test(e[n]);) n += 1;
				let a = e.slice(t, n);
				r = r.replace(RegExp(`^${a}`, "gm"), "");
			}
			t.push({
				type: n ? "Block" : "Line",
				value: r,
				start: i,
				end: a,
				loc: {
					start: o,
					end: s
				}
			});
		},
		add_comments(r) {
			t.length !== 0 && (t = t.filter((e) => e.start >= n).map(({ type: e, value: t, start: n, end: r }) => ({
				type: e,
				value: t,
				start: n,
				end: r
			})), u(r, null, { _(n, { next: r, path: i }) {
				let a;
				for (; t[0] && t[0].start < n.start;) a = t.shift(), (n.leadingComments ||= []).push(a);
				if (r(), t[0]) {
					let r = i.at(-1);
					if (r === void 0 || n.end !== r.end) {
						let i = e.slice(n.end, t[0].start);
						if ((r?.type === "BlockStatement" || r?.type === "Program") && r.body.indexOf(n) === r.body.length - 1 || r?.type === "ArrayExpression" && r.elements.indexOf(n) === r.elements.length - 1 || r?.type === "ObjectExpression" && r.properties.indexOf(n) === r.properties.length - 1) for (n.end; t.length;) {
							let e = t[0];
							if (r && e.start >= r.end) break;
							(n.trailingComments ||= []).push(e), t.shift(), e.end;
						}
						else n.end <= t[0].start && /^[,) \t]*$/.test(i) && (n.trailingComments = [t.shift()]);
					}
				}
			} }), t.length > 0 && (t[0].start >= r.end || r.type === "Program") && (r.trailingComments ||= []).push(...t.splice(0)));
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/utils/bracket.js
function oa(e) {
	return e < 0 ? Infinity : e;
}
function sa(e, t, n) {
	let r;
	return r = n === "`" ? e : e.slice(0, oa(e.indexOf("\n", t))), la(r, t, n);
}
function ca(e, t) {
	let n = la(e, t, "/");
	return n < la(e, t, "\n") ? n : Infinity;
}
function la(e, t, n) {
	let r = t;
	for (;;) {
		let t = e.indexOf(n, r);
		if (t === -1) return Infinity;
		if (ua(e, t - 1) % 2 == 0) return t;
		r = t + 1;
	}
}
function ua(e, t) {
	let n = t, r = 0;
	for (; e[n] === "\\";) r++, n--;
	return r;
}
function da(e, t, n) {
	let r = fa[n], i = 1, a = t;
	for (; i > 0 && a < e.length;) {
		let t = e[a];
		switch (t) {
			case "'":
			case "\"":
			case "`":
				a = sa(e, a + 1, t) + 1;
				continue;
			case "/": {
				let t = e[a + 1];
				if (!t) {
					a++;
					continue;
				}
				if (t === "/") {
					a = oa(e.indexOf("\n", a + 1)) + 1;
					continue;
				}
				if (t === "*") {
					a = oa(e.indexOf("*/", a + 1)) + 2;
					continue;
				}
				let n = ca(e, a + 1) + 1;
				n === Infinity ? a++ : a = n;
				continue;
			}
			default: {
				let t = e[a];
				if (t === n ? i++ : t === r && i--, i === 0) return a;
				a++;
			}
		}
	}
}
var fa = {
	"{": "}",
	"(": ")",
	"[": "]"
}, pa = new Set(Object.values(fa));
function ma(e, t, n = fa) {
	let r = n === fa ? pa : new Set(Object.values(n)), i = [], a = t;
	for (; a < e.template.length;) {
		let t = e.template[a++];
		if (t === "'" || t === "\"" || t === "`") {
			a = ha(e, a, t);
			continue;
		}
		if (t in n) i.push(t);
		else if (r.has(t)) {
			let e = n[i.pop()];
			if (t !== e && bi(a - 1, e), i.length === 0) return a;
		}
	}
	qi(e.template.length);
}
function ha(e, t, n) {
	let r = !1, i = t;
	for (; i < e.template.length;) {
		let t = e.template[i++];
		if (r) {
			r = !1;
			continue;
		}
		if (t === n) return i;
		t === "\\" && (r = !0), n === "`" && t === "$" && e.template[i] === "{" && (i = ma(e, i));
	}
	Yi(t);
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/read/expression.js
function ga(e, t) {
	let n = da(e.template, e.index, t ?? "{");
	if (n) {
		let t = e.index;
		return e.index = n, {
			type: "Identifier",
			start: t,
			end: n,
			name: ""
		};
	}
}
function K(e, t, n) {
	try {
		let t = ea(e, e.template, e.index), n = t.end, r = e.root.comments.at(-1);
		return r && r.end > n && (n = r.end), e.index = n, ia(t);
	} catch (r) {
		if (e.loose && !n) {
			let n = ga(e, t);
			if (n) return n;
		}
		throw r;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/utils/builders.js
function _a(e = []) {
	return {
		type: "ArrayExpression",
		elements: e
	};
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/utils/ast.js
function va(e) {
	return Array.isArray(e.value) && e.value.length === 1 && e.value[0].type === "Text";
}
function ya(e) {
	return e.value !== !0 && !Array.isArray(e.value) || Array.isArray(e.value) && e.value.length === 1 && e.value[0].type === "ExpressionTag";
}
function ba(e) {
	return Array.isArray(e.value) ? e.value[0].expression : e.value.expression;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/read/script.js
var xa = /<\/script\s*>/, Sa = /<\/script\s*>/y, Ca = [
	"server",
	"client",
	"worker",
	"test",
	"default"
], wa = [
	"context",
	"generics",
	"lang",
	"module"
];
function Ta(e, t, n) {
	let r = e.index, i = e.read_until(xa);
	e.index >= e.template.length && mi(e.template.length, "script");
	let a = e.template.slice(0, r).replace(h, " ") + i;
	e.read(Sa);
	let o = $i(a, e.root.comments, e.ts, !0);
	o.start = r, o.loc && ({line: o.loc.start.line, column: o.loc.start.column} = x(t), {line: o.loc.end.line, column: o.loc.end.column} = x(e.index));
	let s = "default";
	for (let e of n) Ca.includes(e.name) && Di(e, e.name), wa.includes(e.name) || Ae(e), e.name === "module" && (e.value !== !0 && Ti(e, e.name), s = "module"), e.name === "context" && ((e.value === !0 || !va(e)) && Ei(e), e.value[0].data !== "module" && Ei(e), s = "module");
	return {
		type: "Script",
		start: t,
		end: e.index,
		context: s,
		content: o,
		attributes: n
	};
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/read/style.js
var Ea = /[~^$*|]?=/y, Da = /[\s\]]/, Oa = /[a-zA-Z]+/y, ka = /(\+|~|>|\|\|)/y, Aa = /\d+(\.\d+)?%/y, ja = /(even|odd|\+?(\d+|\d*n(\s*[+-]\s*\d+)?)|-\d*n(\s*\+\s*\d+))((?=\s*[,)])|\s+of\s+)/y, Ma = /[\s:]/, Na = /-?\d/y, Pa = /[a-zA-Z0-9_-]/, Fa = /\\[0-9a-fA-F]{1,6}(\r\n|\s)?/y, Ia = /\*\//, La = /-->/;
function Ra(e, t, n) {
	let r = e.index, i = za(e, (e) => e.match("</style") || e.index >= e.template.length), a = e.index;
	return e.eat("</style", !0), e.read(/\s*>/y), {
		type: "StyleSheet",
		start: t,
		end: e.index,
		attributes: n,
		children: i,
		content: {
			start: r,
			end: a,
			styles: e.template.slice(r, a),
			comment: null
		}
	};
}
function za(e, t) {
	let n = [];
	for (; Za(e), !t(e);) e.match("@") ? n.push(Ba(e)) : n.push(Va(e));
	return n;
}
function Ba(e) {
	let t = e.index;
	e.eat("@", !0);
	let n = Xa(e), r = Ja(e), i = null;
	return e.match("{") ? i = Ga(e) : e.eat(";", !0), {
		type: "Atrule",
		start: t,
		end: e.index,
		name: n,
		prelude: r,
		block: i
	};
}
function Va(e) {
	let t = e.index;
	return {
		type: "Rule",
		prelude: Ha(e),
		block: Ga(e),
		start: t,
		end: e.index,
		metadata: {
			parent_rule: null,
			has_local_selectors: !1,
			has_global_selectors: !1,
			is_global_block: !1
		}
	};
}
function Ha(e, t = !1) {
	let n = [];
	Za(e);
	let r = e.index;
	for (; e.index < e.template.length;) {
		n.push(Ua(e, t));
		let i = e.index;
		if (Za(e), t ? e.match(")") : e.match("{")) return {
			type: "SelectorList",
			start: r,
			end: i,
			children: n
		};
		e.eat(",", !0), Za(e);
	}
	qi(e.template.length);
}
function Ua(e, t = !1) {
	let n = e.index, r = [];
	function i(e, t) {
		return {
			type: "RelativeSelector",
			combinator: e,
			selectors: [],
			start: t,
			end: -1,
			metadata: {
				is_global: !1,
				is_global_like: !1,
				scoped: !1
			}
		};
	}
	let a = i(null, e.index);
	for (; e.index < e.template.length;) {
		let o = e.index;
		if (e.eat("&")) a.selectors.push({
			type: "NestingSelector",
			name: "&",
			start: o,
			end: e.index
		});
		else if (e.eat("*")) {
			let t = "*";
			e.eat("|") && (t = Xa(e)), a.selectors.push({
				type: "TypeSelector",
				name: t,
				start: o,
				end: e.index
			});
		} else if (e.eat("#")) a.selectors.push({
			type: "IdSelector",
			name: Xa(e),
			start: o,
			end: e.index
		});
		else if (e.eat(".")) a.selectors.push({
			type: "ClassSelector",
			name: Xa(e),
			start: o,
			end: e.index
		});
		else if (e.eat("::")) a.selectors.push({
			type: "PseudoElementSelector",
			name: Xa(e),
			start: o,
			end: e.index
		}), e.eat("(") && (Ha(e, !0), e.eat(")", !0));
		else if (e.eat(":")) {
			let t = Xa(e), n = null;
			e.eat("(") && (n = Ha(e, !0), e.eat(")", !0)), a.selectors.push({
				type: "PseudoClassSelector",
				name: t,
				args: n,
				start: o,
				end: e.index
			});
		} else if (e.eat("[")) {
			e.allow_whitespace();
			let t = Xa(e);
			e.allow_whitespace();
			let n = null, r = e.read(Ea);
			r && (e.allow_whitespace(), n = Ya(e)), e.allow_whitespace();
			let i = e.read(Oa);
			e.allow_whitespace(), e.eat("]", !0), a.selectors.push({
				type: "AttributeSelector",
				start: o,
				end: e.index,
				name: t,
				matcher: r,
				value: n,
				flags: i
			});
		} else if (t && e.match_regex(ja)) a.selectors.push({
			type: "Nth",
			value: e.read(ja),
			start: o,
			end: e.index
		});
		else if (e.match_regex(Aa)) a.selectors.push({
			type: "Percentage",
			value: e.read(Aa),
			start: o,
			end: e.index
		});
		else if (!e.match_regex(ka)) {
			let t = Xa(e);
			e.eat("|") && (t = Xa(e)), a.selectors.push({
				type: "TypeSelector",
				name: t,
				start: o,
				end: e.index
			});
		}
		let s = e.index;
		if (Za(e), e.match(",") || (t ? e.match(")") : e.match("{"))) return e.index = s, a.end = s, r.push(a), {
			type: "ComplexSelector",
			start: n,
			end: s,
			children: r,
			metadata: {
				rule: null,
				is_global: !1,
				used: !1
			}
		};
		e.index = s;
		let c = Wa(e);
		c && (a.selectors.length > 0 && (a.end = s, r.push(a)), a = i(c, c.start), e.allow_whitespace(), (e.match(",") || (t ? e.match(")") : e.match("{"))) && Qr(e.index));
	}
	qi(e.template.length);
}
function Wa(e) {
	let t = e.index;
	e.allow_whitespace();
	let n = e.index, r = e.read(ka);
	if (r) {
		let t = e.index;
		return e.allow_whitespace(), {
			type: "Combinator",
			name: r,
			start: n,
			end: t
		};
	}
	return e.index === t ? null : {
		type: "Combinator",
		name: " ",
		start: t,
		end: e.index
	};
}
function Ga(e) {
	let t = e.index;
	e.eat("{", !0);
	let n = [];
	for (; e.index < e.template.length && (Za(e), !e.match("}"));) n.push(Ka(e));
	return e.eat("}", !0), {
		type: "Block",
		start: t,
		end: e.index,
		children: n
	};
}
function Ka(e) {
	if (e.match("@")) return Ba(e);
	let t = e.index;
	Ja(e);
	let n = e.template[e.index];
	return e.index = t, n === "{" ? Va(e) : qa(e);
}
function qa(e) {
	let t = e.index, n = e.read_until(Ma);
	e.allow_whitespace(), e.eat(":");
	let r = e.index;
	e.allow_whitespace();
	let i = Ja(e);
	!i && !n.startsWith("--") && Xr({
		start: t,
		end: r
	});
	let a = e.index;
	return e.match("}") || e.eat(";", !0), {
		type: "Declaration",
		start: t,
		end: a,
		property: n,
		value: i
	};
}
function Ja(e) {
	let t = "", n = !1, r = !1, i = null;
	for (; e.index < e.template.length;) {
		let a = e.template[e.index];
		if (n) {
			t += "\\" + a, n = !1, e.index++;
			continue;
		} else if (a === "\\") {
			n = !0, e.index++;
			continue;
		} else if (a === i) i = null;
		else if (a === ")") r = !1;
		else if (i === null && (a === "\"" || a === "'")) i = a;
		else if (a === "(" && t.slice(-3) === "url") r = !0;
		else if ((a === ";" || a === "{" || a === "}") && !r && !i) return t.trim();
		else if (a === "/" && !r && !i && e.template[e.index + 1] === "*") {
			for (e.index += 2; e.index < e.template.length;) {
				if (e.template[e.index] === "*" && e.template[e.index + 1] === "/") {
					e.index += 2;
					break;
				}
				e.index++;
			}
			continue;
		}
		t += a, e.index++;
	}
	qi(e.template.length);
}
function Ya(e) {
	let t = "", n = !1, r = e.eat("\"") ? "\"" : e.eat("'") ? "'" : null;
	for (; e.index < e.template.length;) {
		let i = e.template[e.index];
		if (n) t += "\\" + i, n = !1;
		else if (i === "\\") n = !0;
		else if (r ? i === r : Da.test(i)) return r && e.eat(r, !0), t.trim();
		else t += i;
		e.index++;
	}
	qi(e.template.length);
}
function Xa(e) {
	let t = e.index, n = "";
	for (e.match_regex(Na) && Zr(t); e.index < e.template.length;) {
		let t = e.template[e.index];
		if (t === "\\") {
			let t = e.match_regex(Fa);
			t ? (n += String.fromCodePoint(parseInt(t.slice(1), 16)), e.index += t.length) : (n += "\\" + e.template[e.index + 1], e.index += 2);
		} else if (t.codePointAt(0) >= 160 || Pa.test(t)) n += t, e.index++;
		else break;
	}
	return n === "" && Zr(t), n;
}
function Za(e) {
	for (e.allow_whitespace(); e.match("/*") || e.match("<!--");) e.eat("/*") && (e.read_until(Ia), e.eat("*/", !0)), e.eat("<!--") && (e.read_until(La), e.eat("-->", !0)), e.allow_whitespace();
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/utils/entities.js
var Qa = {
	"CounterClockwiseContourIntegral;": 8755,
	"ClockwiseContourIntegral;": 8754,
	"DoubleLongLeftRightArrow;": 10234,
	"NotNestedGreaterGreater;": 10914,
	"DiacriticalDoubleAcute;": 733,
	"NotSquareSupersetEqual;": 8931,
	"CloseCurlyDoubleQuote;": 8221,
	"DoubleContourIntegral;": 8751,
	"FilledVerySmallSquare;": 9642,
	"NegativeVeryThinSpace;": 8203,
	"NotPrecedesSlantEqual;": 8928,
	"NotRightTriangleEqual;": 8941,
	"NotSucceedsSlantEqual;": 8929,
	"CapitalDifferentialD;": 8517,
	"DoubleLeftRightArrow;": 8660,
	"DoubleLongRightArrow;": 10233,
	"EmptyVerySmallSquare;": 9643,
	"NestedGreaterGreater;": 8811,
	"NotDoubleVerticalBar;": 8742,
	"NotGreaterSlantEqual;": 10878,
	"NotLeftTriangleEqual;": 8940,
	"NotSquareSubsetEqual;": 8930,
	"OpenCurlyDoubleQuote;": 8220,
	"ReverseUpEquilibrium;": 10607,
	"DoubleLongLeftArrow;": 10232,
	"DownLeftRightVector;": 10576,
	"LeftArrowRightArrow;": 8646,
	"NegativeMediumSpace;": 8203,
	"NotGreaterFullEqual;": 8807,
	"NotRightTriangleBar;": 10704,
	"RightArrowLeftArrow;": 8644,
	"SquareSupersetEqual;": 8850,
	"leftrightsquigarrow;": 8621,
	"DownRightTeeVector;": 10591,
	"DownRightVectorBar;": 10583,
	"LongLeftRightArrow;": 10231,
	"Longleftrightarrow;": 10234,
	"NegativeThickSpace;": 8203,
	"NotLeftTriangleBar;": 10703,
	"PrecedesSlantEqual;": 8828,
	"ReverseEquilibrium;": 8651,
	"RightDoubleBracket;": 10215,
	"RightDownTeeVector;": 10589,
	"RightDownVectorBar;": 10581,
	"RightTriangleEqual;": 8885,
	"SquareIntersection;": 8851,
	"SucceedsSlantEqual;": 8829,
	"blacktriangleright;": 9656,
	"longleftrightarrow;": 10231,
	"DoubleUpDownArrow;": 8661,
	"DoubleVerticalBar;": 8741,
	"DownLeftTeeVector;": 10590,
	"DownLeftVectorBar;": 10582,
	"FilledSmallSquare;": 9724,
	"GreaterSlantEqual;": 10878,
	"LeftDoubleBracket;": 10214,
	"LeftDownTeeVector;": 10593,
	"LeftDownVectorBar;": 10585,
	"LeftTriangleEqual;": 8884,
	"NegativeThinSpace;": 8203,
	"NotGreaterGreater;": 8811,
	"NotLessSlantEqual;": 10877,
	"NotNestedLessLess;": 10913,
	"NotReverseElement;": 8716,
	"NotSquareSuperset;": 8848,
	"NotTildeFullEqual;": 8775,
	"RightAngleBracket;": 10217,
	"RightUpDownVector;": 10575,
	"SquareSubsetEqual;": 8849,
	"VerticalSeparator;": 10072,
	"blacktriangledown;": 9662,
	"blacktriangleleft;": 9666,
	"leftrightharpoons;": 8651,
	"rightleftharpoons;": 8652,
	"twoheadrightarrow;": 8608,
	"DiacriticalAcute;": 180,
	"DiacriticalGrave;": 96,
	"DiacriticalTilde;": 732,
	"DoubleRightArrow;": 8658,
	"DownArrowUpArrow;": 8693,
	"EmptySmallSquare;": 9723,
	"GreaterEqualLess;": 8923,
	"GreaterFullEqual;": 8807,
	"LeftAngleBracket;": 10216,
	"LeftUpDownVector;": 10577,
	"LessEqualGreater;": 8922,
	"NonBreakingSpace;": 160,
	"NotPrecedesEqual;": 10927,
	"NotRightTriangle;": 8939,
	"NotSucceedsEqual;": 10928,
	"NotSucceedsTilde;": 8831,
	"NotSupersetEqual;": 8841,
	"RightTriangleBar;": 10704,
	"RightUpTeeVector;": 10588,
	"RightUpVectorBar;": 10580,
	"UnderParenthesis;": 9181,
	"UpArrowDownArrow;": 8645,
	"circlearrowright;": 8635,
	"downharpoonright;": 8642,
	"ntrianglerighteq;": 8941,
	"rightharpoondown;": 8641,
	"rightrightarrows;": 8649,
	"twoheadleftarrow;": 8606,
	"vartriangleright;": 8883,
	"CloseCurlyQuote;": 8217,
	"ContourIntegral;": 8750,
	"DoubleDownArrow;": 8659,
	"DoubleLeftArrow;": 8656,
	"DownRightVector;": 8641,
	"LeftRightVector;": 10574,
	"LeftTriangleBar;": 10703,
	"LeftUpTeeVector;": 10592,
	"LeftUpVectorBar;": 10584,
	"LowerRightArrow;": 8600,
	"NotGreaterEqual;": 8817,
	"NotGreaterTilde;": 8821,
	"NotHumpDownHump;": 8782,
	"NotLeftTriangle;": 8938,
	"NotSquareSubset;": 8847,
	"OverParenthesis;": 9180,
	"RightDownVector;": 8642,
	"ShortRightArrow;": 8594,
	"UpperRightArrow;": 8599,
	"bigtriangledown;": 9661,
	"circlearrowleft;": 8634,
	"curvearrowright;": 8631,
	"downharpoonleft;": 8643,
	"leftharpoondown;": 8637,
	"leftrightarrows;": 8646,
	"nLeftrightarrow;": 8654,
	"nleftrightarrow;": 8622,
	"ntrianglelefteq;": 8940,
	"rightleftarrows;": 8644,
	"rightsquigarrow;": 8605,
	"rightthreetimes;": 8908,
	"straightepsilon;": 1013,
	"trianglerighteq;": 8885,
	"vartriangleleft;": 8882,
	"DiacriticalDot;": 729,
	"DoubleRightTee;": 8872,
	"DownLeftVector;": 8637,
	"GreaterGreater;": 10914,
	"HorizontalLine;": 9472,
	"InvisibleComma;": 8291,
	"InvisibleTimes;": 8290,
	"LeftDownVector;": 8643,
	"LeftRightArrow;": 8596,
	"Leftrightarrow;": 8660,
	"LessSlantEqual;": 10877,
	"LongRightArrow;": 10230,
	"Longrightarrow;": 10233,
	"LowerLeftArrow;": 8601,
	"NestedLessLess;": 8810,
	"NotGreaterLess;": 8825,
	"NotLessGreater;": 8824,
	"NotSubsetEqual;": 8840,
	"NotVerticalBar;": 8740,
	"OpenCurlyQuote;": 8216,
	"ReverseElement;": 8715,
	"RightTeeVector;": 10587,
	"RightVectorBar;": 10579,
	"ShortDownArrow;": 8595,
	"ShortLeftArrow;": 8592,
	"SquareSuperset;": 8848,
	"TildeFullEqual;": 8773,
	"UpperLeftArrow;": 8598,
	"ZeroWidthSpace;": 8203,
	"curvearrowleft;": 8630,
	"doublebarwedge;": 8966,
	"downdownarrows;": 8650,
	"hookrightarrow;": 8618,
	"leftleftarrows;": 8647,
	"leftrightarrow;": 8596,
	"leftthreetimes;": 8907,
	"longrightarrow;": 10230,
	"looparrowright;": 8620,
	"nshortparallel;": 8742,
	"ntriangleright;": 8939,
	"rightarrowtail;": 8611,
	"rightharpoonup;": 8640,
	"trianglelefteq;": 8884,
	"upharpoonright;": 8638,
	"ApplyFunction;": 8289,
	"DifferentialD;": 8518,
	"DoubleLeftTee;": 10980,
	"DoubleUpArrow;": 8657,
	"LeftTeeVector;": 10586,
	"LeftVectorBar;": 10578,
	"LessFullEqual;": 8806,
	"LongLeftArrow;": 10229,
	"Longleftarrow;": 10232,
	"NotEqualTilde;": 8770,
	"NotTildeEqual;": 8772,
	"NotTildeTilde;": 8777,
	"Poincareplane;": 8460,
	"PrecedesEqual;": 10927,
	"PrecedesTilde;": 8830,
	"RightArrowBar;": 8677,
	"RightTeeArrow;": 8614,
	"RightTriangle;": 8883,
	"RightUpVector;": 8638,
	"SucceedsEqual;": 10928,
	"SucceedsTilde;": 8831,
	"SupersetEqual;": 8839,
	"UpEquilibrium;": 10606,
	"VerticalTilde;": 8768,
	"VeryThinSpace;": 8202,
	"bigtriangleup;": 9651,
	"blacktriangle;": 9652,
	"divideontimes;": 8903,
	"fallingdotseq;": 8786,
	"hookleftarrow;": 8617,
	"leftarrowtail;": 8610,
	"leftharpoonup;": 8636,
	"longleftarrow;": 10229,
	"looparrowleft;": 8619,
	"measuredangle;": 8737,
	"ntriangleleft;": 8938,
	"shortparallel;": 8741,
	"smallsetminus;": 8726,
	"triangleright;": 9657,
	"upharpoonleft;": 8639,
	"varsubsetneqq;": 10955,
	"varsupsetneqq;": 10956,
	"DownArrowBar;": 10515,
	"DownTeeArrow;": 8615,
	"ExponentialE;": 8519,
	"GreaterEqual;": 8805,
	"GreaterTilde;": 8819,
	"HilbertSpace;": 8459,
	"HumpDownHump;": 8782,
	"Intersection;": 8898,
	"LeftArrowBar;": 8676,
	"LeftTeeArrow;": 8612,
	"LeftTriangle;": 8882,
	"LeftUpVector;": 8639,
	"NotCongruent;": 8802,
	"NotHumpEqual;": 8783,
	"NotLessEqual;": 8816,
	"NotLessTilde;": 8820,
	"Proportional;": 8733,
	"RightCeiling;": 8969,
	"RoundImplies;": 10608,
	"ShortUpArrow;": 8593,
	"SquareSubset;": 8847,
	"UnderBracket;": 9141,
	"VerticalLine;": 124,
	"blacklozenge;": 10731,
	"exponentiale;": 8519,
	"risingdotseq;": 8787,
	"triangledown;": 9663,
	"triangleleft;": 9667,
	"varsubsetneq;": 8842,
	"varsupsetneq;": 8843,
	"CircleMinus;": 8854,
	"CircleTimes;": 8855,
	"Equilibrium;": 8652,
	"GreaterLess;": 8823,
	"LeftCeiling;": 8968,
	"LessGreater;": 8822,
	"MediumSpace;": 8287,
	"NotLessLess;": 8810,
	"NotPrecedes;": 8832,
	"NotSucceeds;": 8833,
	"NotSuperset;": 8835,
	"OverBracket;": 9140,
	"RightVector;": 8640,
	"Rrightarrow;": 8667,
	"RuleDelayed;": 10740,
	"SmallCircle;": 8728,
	"SquareUnion;": 8852,
	"SubsetEqual;": 8838,
	"UpDownArrow;": 8597,
	"Updownarrow;": 8661,
	"VerticalBar;": 8739,
	"backepsilon;": 1014,
	"blacksquare;": 9642,
	"circledcirc;": 8858,
	"circleddash;": 8861,
	"curlyeqprec;": 8926,
	"curlyeqsucc;": 8927,
	"diamondsuit;": 9830,
	"eqslantless;": 10901,
	"expectation;": 8496,
	"nRightarrow;": 8655,
	"nrightarrow;": 8603,
	"preccurlyeq;": 8828,
	"precnapprox;": 10937,
	"quaternions;": 8461,
	"straightphi;": 981,
	"succcurlyeq;": 8829,
	"succnapprox;": 10938,
	"thickapprox;": 8776,
	"updownarrow;": 8597,
	"Bernoullis;": 8492,
	"CirclePlus;": 8853,
	"EqualTilde;": 8770,
	"Fouriertrf;": 8497,
	"ImaginaryI;": 8520,
	"Laplacetrf;": 8466,
	"LeftVector;": 8636,
	"Lleftarrow;": 8666,
	"NotElement;": 8713,
	"NotGreater;": 8815,
	"Proportion;": 8759,
	"RightArrow;": 8594,
	"RightFloor;": 8971,
	"Rightarrow;": 8658,
	"ThickSpace;": 8287,
	"TildeEqual;": 8771,
	"TildeTilde;": 8776,
	"UnderBrace;": 9183,
	"UpArrowBar;": 10514,
	"UpTeeArrow;": 8613,
	"circledast;": 8859,
	"complement;": 8705,
	"curlywedge;": 8911,
	"eqslantgtr;": 10902,
	"gtreqqless;": 10892,
	"lessapprox;": 10885,
	"lesseqqgtr;": 10891,
	"lmoustache;": 9136,
	"longmapsto;": 10236,
	"mapstodown;": 8615,
	"mapstoleft;": 8612,
	"nLeftarrow;": 8653,
	"nleftarrow;": 8602,
	"nsubseteqq;": 10949,
	"nsupseteqq;": 10950,
	"precapprox;": 10935,
	"rightarrow;": 8594,
	"rmoustache;": 9137,
	"sqsubseteq;": 8849,
	"sqsupseteq;": 8850,
	"subsetneqq;": 10955,
	"succapprox;": 10936,
	"supsetneqq;": 10956,
	"upuparrows;": 8648,
	"varepsilon;": 1013,
	"varnothing;": 8709,
	"Backslash;": 8726,
	"CenterDot;": 183,
	"CircleDot;": 8857,
	"Congruent;": 8801,
	"Coproduct;": 8720,
	"DoubleDot;": 168,
	"DownArrow;": 8595,
	"DownBreve;": 785,
	"Downarrow;": 8659,
	"HumpEqual;": 8783,
	"LeftArrow;": 8592,
	"LeftFloor;": 8970,
	"Leftarrow;": 8656,
	"LessTilde;": 8818,
	"Mellintrf;": 8499,
	"MinusPlus;": 8723,
	"NotCupCap;": 8813,
	"NotExists;": 8708,
	"NotSubset;": 8834,
	"OverBrace;": 9182,
	"PlusMinus;": 177,
	"Therefore;": 8756,
	"ThinSpace;": 8201,
	"TripleDot;": 8411,
	"UnionPlus;": 8846,
	"backprime;": 8245,
	"backsimeq;": 8909,
	"bigotimes;": 10754,
	"centerdot;": 183,
	"checkmark;": 10003,
	"complexes;": 8450,
	"dotsquare;": 8865,
	"downarrow;": 8595,
	"gtrapprox;": 10886,
	"gtreqless;": 8923,
	"gvertneqq;": 8809,
	"heartsuit;": 9829,
	"leftarrow;": 8592,
	"lesseqgtr;": 8922,
	"lvertneqq;": 8808,
	"ngeqslant;": 10878,
	"nleqslant;": 10877,
	"nparallel;": 8742,
	"nshortmid;": 8740,
	"nsubseteq;": 8840,
	"nsupseteq;": 8841,
	"pitchfork;": 8916,
	"rationals;": 8474,
	"spadesuit;": 9824,
	"subseteqq;": 10949,
	"subsetneq;": 8842,
	"supseteqq;": 10950,
	"supsetneq;": 8843,
	"therefore;": 8756,
	"triangleq;": 8796,
	"varpropto;": 8733,
	"DDotrahd;": 10513,
	"DotEqual;": 8784,
	"Integral;": 8747,
	"LessLess;": 10913,
	"NotEqual;": 8800,
	"NotTilde;": 8769,
	"PartialD;": 8706,
	"Precedes;": 8826,
	"RightTee;": 8866,
	"Succeeds;": 8827,
	"SuchThat;": 8715,
	"Superset;": 8835,
	"Uarrocir;": 10569,
	"UnderBar;": 95,
	"andslope;": 10840,
	"angmsdaa;": 10664,
	"angmsdab;": 10665,
	"angmsdac;": 10666,
	"angmsdad;": 10667,
	"angmsdae;": 10668,
	"angmsdaf;": 10669,
	"angmsdag;": 10670,
	"angmsdah;": 10671,
	"angrtvbd;": 10653,
	"approxeq;": 8778,
	"awconint;": 8755,
	"backcong;": 8780,
	"barwedge;": 8965,
	"bbrktbrk;": 9142,
	"bigoplus;": 10753,
	"bigsqcup;": 10758,
	"biguplus;": 10756,
	"bigwedge;": 8896,
	"boxminus;": 8863,
	"boxtimes;": 8864,
	"bsolhsub;": 10184,
	"capbrcup;": 10825,
	"circledR;": 174,
	"circledS;": 9416,
	"cirfnint;": 10768,
	"clubsuit;": 9827,
	"cupbrcap;": 10824,
	"curlyvee;": 8910,
	"cwconint;": 8754,
	"doteqdot;": 8785,
	"dotminus;": 8760,
	"drbkarow;": 10512,
	"dzigrarr;": 10239,
	"elinters;": 9191,
	"emptyset;": 8709,
	"eqvparsl;": 10725,
	"fpartint;": 10765,
	"geqslant;": 10878,
	"gesdotol;": 10884,
	"gnapprox;": 10890,
	"hksearow;": 10533,
	"hkswarow;": 10534,
	"imagline;": 8464,
	"imagpart;": 8465,
	"infintie;": 10717,
	"integers;": 8484,
	"intercal;": 8890,
	"intlarhk;": 10775,
	"laemptyv;": 10676,
	"ldrushar;": 10571,
	"leqslant;": 10877,
	"lesdotor;": 10883,
	"llcorner;": 8990,
	"lnapprox;": 10889,
	"lrcorner;": 8991,
	"lurdshar;": 10570,
	"mapstoup;": 8613,
	"multimap;": 8888,
	"naturals;": 8469,
	"ncongdot;": 10861,
	"notindot;": 8949,
	"otimesas;": 10806,
	"parallel;": 8741,
	"plusacir;": 10787,
	"pointint;": 10773,
	"precneqq;": 10933,
	"precnsim;": 8936,
	"profalar;": 9006,
	"profline;": 8978,
	"profsurf;": 8979,
	"raemptyv;": 10675,
	"realpart;": 8476,
	"rppolint;": 10770,
	"rtriltri;": 10702,
	"scpolint;": 10771,
	"setminus;": 8726,
	"shortmid;": 8739,
	"smeparsl;": 10724,
	"sqsubset;": 8847,
	"sqsupset;": 8848,
	"subseteq;": 8838,
	"succneqq;": 10934,
	"succnsim;": 8937,
	"supseteq;": 8839,
	"thetasym;": 977,
	"thicksim;": 8764,
	"timesbar;": 10801,
	"triangle;": 9653,
	"triminus;": 10810,
	"trpezium;": 9186,
	"ulcorner;": 8988,
	"urcorner;": 8989,
	"varkappa;": 1008,
	"varsigma;": 962,
	"vartheta;": 977,
	"Because;": 8757,
	"Cayleys;": 8493,
	"Cconint;": 8752,
	"Cedilla;": 184,
	"Diamond;": 8900,
	"DownTee;": 8868,
	"Element;": 8712,
	"Epsilon;": 917,
	"Implies;": 8658,
	"LeftTee;": 8867,
	"NewLine;": 10,
	"NoBreak;": 8288,
	"NotLess;": 8814,
	"Omicron;": 927,
	"OverBar;": 8254,
	"Product;": 8719,
	"UpArrow;": 8593,
	"Uparrow;": 8657,
	"Upsilon;": 933,
	"alefsym;": 8501,
	"angrtvb;": 8894,
	"angzarr;": 9084,
	"asympeq;": 8781,
	"backsim;": 8765,
	"because;": 8757,
	"bemptyv;": 10672,
	"between;": 8812,
	"bigcirc;": 9711,
	"bigodot;": 10752,
	"bigstar;": 9733,
	"bnequiv;": 8801,
	"boxplus;": 8862,
	"ccupssm;": 10832,
	"cemptyv;": 10674,
	"cirscir;": 10690,
	"coloneq;": 8788,
	"congdot;": 10861,
	"cudarrl;": 10552,
	"cudarrr;": 10549,
	"cularrp;": 10557,
	"curarrm;": 10556,
	"dbkarow;": 10511,
	"ddagger;": 8225,
	"ddotseq;": 10871,
	"demptyv;": 10673,
	"diamond;": 8900,
	"digamma;": 989,
	"dotplus;": 8724,
	"dwangle;": 10662,
	"epsilon;": 949,
	"eqcolon;": 8789,
	"equivDD;": 10872,
	"gesdoto;": 10882,
	"gtquest;": 10876,
	"gtrless;": 8823,
	"harrcir;": 10568,
	"intprod;": 10812,
	"isindot;": 8949,
	"larrbfs;": 10527,
	"larrsim;": 10611,
	"lbrksld;": 10639,
	"lbrkslu;": 10637,
	"ldrdhar;": 10599,
	"lesdoto;": 10881,
	"lessdot;": 8918,
	"lessgtr;": 8822,
	"lesssim;": 8818,
	"lotimes;": 10804,
	"lozenge;": 9674,
	"ltquest;": 10875,
	"luruhar;": 10598,
	"maltese;": 10016,
	"minusdu;": 10794,
	"napprox;": 8777,
	"natural;": 9838,
	"nearrow;": 8599,
	"nexists;": 8708,
	"notinva;": 8713,
	"notinvb;": 8951,
	"notinvc;": 8950,
	"notniva;": 8716,
	"notnivb;": 8958,
	"notnivc;": 8957,
	"npolint;": 10772,
	"npreceq;": 10927,
	"nsqsube;": 8930,
	"nsqsupe;": 8931,
	"nsubset;": 8834,
	"nsucceq;": 10928,
	"nsupset;": 8835,
	"nvinfin;": 10718,
	"nvltrie;": 8884,
	"nvrtrie;": 8885,
	"nwarrow;": 8598,
	"olcross;": 10683,
	"omicron;": 959,
	"orderof;": 8500,
	"orslope;": 10839,
	"pertenk;": 8241,
	"planckh;": 8462,
	"pluscir;": 10786,
	"plussim;": 10790,
	"plustwo;": 10791,
	"precsim;": 8830,
	"quatint;": 10774,
	"questeq;": 8799,
	"rarrbfs;": 10528,
	"rarrsim;": 10612,
	"rbrksld;": 10638,
	"rbrkslu;": 10640,
	"rdldhar;": 10601,
	"realine;": 8475,
	"rotimes;": 10805,
	"ruluhar;": 10600,
	"searrow;": 8600,
	"simplus;": 10788,
	"simrarr;": 10610,
	"subedot;": 10947,
	"submult;": 10945,
	"subplus;": 10943,
	"subrarr;": 10617,
	"succsim;": 8831,
	"supdsub;": 10968,
	"supedot;": 10948,
	"suphsol;": 10185,
	"suphsub;": 10967,
	"suplarr;": 10619,
	"supmult;": 10946,
	"supplus;": 10944,
	"swarrow;": 8601,
	"topfork;": 10970,
	"triplus;": 10809,
	"tritime;": 10811,
	"uparrow;": 8593,
	"upsilon;": 965,
	"uwangle;": 10663,
	"vzigzag;": 10650,
	"zigrarr;": 8669,
	"Aacute;": 193,
	"Abreve;": 258,
	"Agrave;": 192,
	"Assign;": 8788,
	"Atilde;": 195,
	"Barwed;": 8966,
	"Bumpeq;": 8782,
	"Cacute;": 262,
	"Ccaron;": 268,
	"Ccedil;": 199,
	"Colone;": 10868,
	"Conint;": 8751,
	"CupCap;": 8781,
	"Dagger;": 8225,
	"Dcaron;": 270,
	"DotDot;": 8412,
	"Dstrok;": 272,
	"Eacute;": 201,
	"Ecaron;": 282,
	"Egrave;": 200,
	"Exists;": 8707,
	"ForAll;": 8704,
	"Gammad;": 988,
	"Gbreve;": 286,
	"Gcedil;": 290,
	"HARDcy;": 1066,
	"Hstrok;": 294,
	"Iacute;": 205,
	"Igrave;": 204,
	"Itilde;": 296,
	"Jsercy;": 1032,
	"Kcedil;": 310,
	"Lacute;": 313,
	"Lambda;": 923,
	"Lcaron;": 317,
	"Lcedil;": 315,
	"Lmidot;": 319,
	"Lstrok;": 321,
	"Nacute;": 323,
	"Ncaron;": 327,
	"Ncedil;": 325,
	"Ntilde;": 209,
	"Oacute;": 211,
	"Odblac;": 336,
	"Ograve;": 210,
	"Oslash;": 216,
	"Otilde;": 213,
	"Otimes;": 10807,
	"Racute;": 340,
	"Rarrtl;": 10518,
	"Rcaron;": 344,
	"Rcedil;": 342,
	"SHCHcy;": 1065,
	"SOFTcy;": 1068,
	"Sacute;": 346,
	"Scaron;": 352,
	"Scedil;": 350,
	"Square;": 9633,
	"Subset;": 8912,
	"Supset;": 8913,
	"Tcaron;": 356,
	"Tcedil;": 354,
	"Tstrok;": 358,
	"Uacute;": 218,
	"Ubreve;": 364,
	"Udblac;": 368,
	"Ugrave;": 217,
	"Utilde;": 360,
	"Vdashl;": 10982,
	"Verbar;": 8214,
	"Vvdash;": 8874,
	"Yacute;": 221,
	"Zacute;": 377,
	"Zcaron;": 381,
	"aacute;": 225,
	"abreve;": 259,
	"agrave;": 224,
	"andand;": 10837,
	"angmsd;": 8737,
	"angsph;": 8738,
	"apacir;": 10863,
	"approx;": 8776,
	"atilde;": 227,
	"barvee;": 8893,
	"barwed;": 8965,
	"becaus;": 8757,
	"bernou;": 8492,
	"bigcap;": 8898,
	"bigcup;": 8899,
	"bigvee;": 8897,
	"bkarow;": 10509,
	"bottom;": 8869,
	"bowtie;": 8904,
	"boxbox;": 10697,
	"bprime;": 8245,
	"brvbar;": 166,
	"bullet;": 8226,
	"bumpeq;": 8783,
	"cacute;": 263,
	"capand;": 10820,
	"capcap;": 10827,
	"capcup;": 10823,
	"capdot;": 10816,
	"ccaron;": 269,
	"ccedil;": 231,
	"circeq;": 8791,
	"cirmid;": 10991,
	"colone;": 8788,
	"commat;": 64,
	"compfn;": 8728,
	"conint;": 8750,
	"coprod;": 8720,
	"copysr;": 8471,
	"cularr;": 8630,
	"cupcap;": 10822,
	"cupcup;": 10826,
	"cupdot;": 8845,
	"curarr;": 8631,
	"curren;": 164,
	"cylcty;": 9005,
	"dagger;": 8224,
	"daleth;": 8504,
	"dcaron;": 271,
	"dfisht;": 10623,
	"divide;": 247,
	"divonx;": 8903,
	"dlcorn;": 8990,
	"dlcrop;": 8973,
	"dollar;": 36,
	"drcorn;": 8991,
	"drcrop;": 8972,
	"dstrok;": 273,
	"eacute;": 233,
	"easter;": 10862,
	"ecaron;": 283,
	"ecolon;": 8789,
	"egrave;": 232,
	"egsdot;": 10904,
	"elsdot;": 10903,
	"emptyv;": 8709,
	"emsp13;": 8196,
	"emsp14;": 8197,
	"eparsl;": 10723,
	"eqcirc;": 8790,
	"equals;": 61,
	"equest;": 8799,
	"female;": 9792,
	"ffilig;": 64259,
	"ffllig;": 64260,
	"forall;": 8704,
	"frac12;": 189,
	"frac13;": 8531,
	"frac14;": 188,
	"frac15;": 8533,
	"frac16;": 8537,
	"frac18;": 8539,
	"frac23;": 8532,
	"frac25;": 8534,
	"frac34;": 190,
	"frac35;": 8535,
	"frac38;": 8540,
	"frac45;": 8536,
	"frac56;": 8538,
	"frac58;": 8541,
	"frac78;": 8542,
	"gacute;": 501,
	"gammad;": 989,
	"gbreve;": 287,
	"gesdot;": 10880,
	"gesles;": 10900,
	"gtlPar;": 10645,
	"gtrarr;": 10616,
	"gtrdot;": 8919,
	"gtrsim;": 8819,
	"hairsp;": 8202,
	"hamilt;": 8459,
	"hardcy;": 1098,
	"hearts;": 9829,
	"hellip;": 8230,
	"hercon;": 8889,
	"homtht;": 8763,
	"horbar;": 8213,
	"hslash;": 8463,
	"hstrok;": 295,
	"hybull;": 8259,
	"hyphen;": 8208,
	"iacute;": 237,
	"igrave;": 236,
	"iiiint;": 10764,
	"iinfin;": 10716,
	"incare;": 8453,
	"inodot;": 305,
	"intcal;": 8890,
	"iquest;": 191,
	"isinsv;": 8947,
	"itilde;": 297,
	"jsercy;": 1112,
	"kappav;": 1008,
	"kcedil;": 311,
	"kgreen;": 312,
	"lAtail;": 10523,
	"lacute;": 314,
	"lagran;": 8466,
	"lambda;": 955,
	"langle;": 10216,
	"larrfs;": 10525,
	"larrhk;": 8617,
	"larrlp;": 8619,
	"larrpl;": 10553,
	"larrtl;": 8610,
	"latail;": 10521,
	"lbrace;": 123,
	"lbrack;": 91,
	"lcaron;": 318,
	"lcedil;": 316,
	"ldquor;": 8222,
	"lesdot;": 10879,
	"lesges;": 10899,
	"lfisht;": 10620,
	"lfloor;": 8970,
	"lharul;": 10602,
	"llhard;": 10603,
	"lmidot;": 320,
	"lmoust;": 9136,
	"loplus;": 10797,
	"lowast;": 8727,
	"lowbar;": 95,
	"lparlt;": 10643,
	"lrhard;": 10605,
	"lsaquo;": 8249,
	"lsquor;": 8218,
	"lstrok;": 322,
	"lthree;": 8907,
	"ltimes;": 8905,
	"ltlarr;": 10614,
	"ltrPar;": 10646,
	"mapsto;": 8614,
	"marker;": 9646,
	"mcomma;": 10793,
	"midast;": 42,
	"midcir;": 10992,
	"middot;": 183,
	"minusb;": 8863,
	"minusd;": 8760,
	"mnplus;": 8723,
	"models;": 8871,
	"mstpos;": 8766,
	"nVDash;": 8879,
	"nVdash;": 8878,
	"nacute;": 324,
	"nbumpe;": 8783,
	"ncaron;": 328,
	"ncedil;": 326,
	"nearhk;": 10532,
	"nequiv;": 8802,
	"nesear;": 10536,
	"nexist;": 8708,
	"nltrie;": 8940,
	"notinE;": 8953,
	"nparsl;": 11005,
	"nprcue;": 8928,
	"nrarrc;": 10547,
	"nrarrw;": 8605,
	"nrtrie;": 8941,
	"nsccue;": 8929,
	"nsimeq;": 8772,
	"ntilde;": 241,
	"numero;": 8470,
	"nvDash;": 8877,
	"nvHarr;": 10500,
	"nvdash;": 8876,
	"nvlArr;": 10498,
	"nvrArr;": 10499,
	"nwarhk;": 10531,
	"nwnear;": 10535,
	"oacute;": 243,
	"odblac;": 337,
	"odsold;": 10684,
	"ograve;": 242,
	"ominus;": 8854,
	"origof;": 8886,
	"oslash;": 248,
	"otilde;": 245,
	"otimes;": 8855,
	"parsim;": 10995,
	"percnt;": 37,
	"period;": 46,
	"permil;": 8240,
	"phmmat;": 8499,
	"planck;": 8463,
	"plankv;": 8463,
	"plusdo;": 8724,
	"plusdu;": 10789,
	"plusmn;": 177,
	"preceq;": 10927,
	"primes;": 8473,
	"prnsim;": 8936,
	"propto;": 8733,
	"prurel;": 8880,
	"puncsp;": 8200,
	"qprime;": 8279,
	"rAtail;": 10524,
	"racute;": 341,
	"rangle;": 10217,
	"rarrap;": 10613,
	"rarrfs;": 10526,
	"rarrhk;": 8618,
	"rarrlp;": 8620,
	"rarrpl;": 10565,
	"rarrtl;": 8611,
	"ratail;": 10522,
	"rbrace;": 125,
	"rbrack;": 93,
	"rcaron;": 345,
	"rcedil;": 343,
	"rdquor;": 8221,
	"rfisht;": 10621,
	"rfloor;": 8971,
	"rharul;": 10604,
	"rmoust;": 9137,
	"roplus;": 10798,
	"rpargt;": 10644,
	"rsaquo;": 8250,
	"rsquor;": 8217,
	"rthree;": 8908,
	"rtimes;": 8906,
	"sacute;": 347,
	"scaron;": 353,
	"scedil;": 351,
	"scnsim;": 8937,
	"searhk;": 10533,
	"seswar;": 10537,
	"sfrown;": 8994,
	"shchcy;": 1097,
	"sigmaf;": 962,
	"sigmav;": 962,
	"simdot;": 10858,
	"smashp;": 10803,
	"softcy;": 1100,
	"solbar;": 9023,
	"spades;": 9824,
	"sqcaps;": 8851,
	"sqcups;": 8852,
	"sqsube;": 8849,
	"sqsupe;": 8850,
	"square;": 9633,
	"squarf;": 9642,
	"ssetmn;": 8726,
	"ssmile;": 8995,
	"sstarf;": 8902,
	"subdot;": 10941,
	"subset;": 8834,
	"subsim;": 10951,
	"subsub;": 10965,
	"subsup;": 10963,
	"succeq;": 10928,
	"supdot;": 10942,
	"supset;": 8835,
	"supsim;": 10952,
	"supsub;": 10964,
	"supsup;": 10966,
	"swarhk;": 10534,
	"swnwar;": 10538,
	"target;": 8982,
	"tcaron;": 357,
	"tcedil;": 355,
	"telrec;": 8981,
	"there4;": 8756,
	"thetav;": 977,
	"thinsp;": 8201,
	"thksim;": 8764,
	"timesb;": 8864,
	"timesd;": 10800,
	"topbot;": 9014,
	"topcir;": 10993,
	"tprime;": 8244,
	"tridot;": 9708,
	"tstrok;": 359,
	"uacute;": 250,
	"ubreve;": 365,
	"udblac;": 369,
	"ufisht;": 10622,
	"ugrave;": 249,
	"ulcorn;": 8988,
	"ulcrop;": 8975,
	"urcorn;": 8989,
	"urcrop;": 8974,
	"utilde;": 361,
	"vangrt;": 10652,
	"varphi;": 981,
	"varrho;": 1009,
	"veebar;": 8891,
	"vellip;": 8942,
	"verbar;": 124,
	"vsubnE;": 10955,
	"vsubne;": 8842,
	"vsupnE;": 10956,
	"vsupne;": 8843,
	"wedbar;": 10847,
	"wedgeq;": 8793,
	"weierp;": 8472,
	"wreath;": 8768,
	"xoplus;": 10753,
	"xotime;": 10754,
	"xsqcup;": 10758,
	"xuplus;": 10756,
	"xwedge;": 8896,
	"yacute;": 253,
	"zacute;": 378,
	"zcaron;": 382,
	"zeetrf;": 8488,
	"AElig;": 198,
	Aacute: 193,
	"Acirc;": 194,
	Agrave: 192,
	"Alpha;": 913,
	"Amacr;": 256,
	"Aogon;": 260,
	"Aring;": 197,
	Atilde: 195,
	"Breve;": 728,
	Ccedil: 199,
	"Ccirc;": 264,
	"Colon;": 8759,
	"Cross;": 10799,
	"Dashv;": 10980,
	"Delta;": 916,
	Eacute: 201,
	"Ecirc;": 202,
	Egrave: 200,
	"Emacr;": 274,
	"Eogon;": 280,
	"Equal;": 10869,
	"Gamma;": 915,
	"Gcirc;": 284,
	"Hacek;": 711,
	"Hcirc;": 292,
	"IJlig;": 306,
	Iacute: 205,
	"Icirc;": 206,
	Igrave: 204,
	"Imacr;": 298,
	"Iogon;": 302,
	"Iukcy;": 1030,
	"Jcirc;": 308,
	"Jukcy;": 1028,
	"Kappa;": 922,
	Ntilde: 209,
	"OElig;": 338,
	Oacute: 211,
	"Ocirc;": 212,
	Ograve: 210,
	"Omacr;": 332,
	"Omega;": 937,
	Oslash: 216,
	Otilde: 213,
	"Prime;": 8243,
	"RBarr;": 10512,
	"Scirc;": 348,
	"Sigma;": 931,
	"THORN;": 222,
	"TRADE;": 8482,
	"TSHcy;": 1035,
	"Theta;": 920,
	"Tilde;": 8764,
	Uacute: 218,
	"Ubrcy;": 1038,
	"Ucirc;": 219,
	Ugrave: 217,
	"Umacr;": 362,
	"Union;": 8899,
	"Uogon;": 370,
	"UpTee;": 8869,
	"Uring;": 366,
	"VDash;": 8875,
	"Vdash;": 8873,
	"Wcirc;": 372,
	"Wedge;": 8896,
	Yacute: 221,
	"Ycirc;": 374,
	aacute: 225,
	"acirc;": 226,
	"acute;": 180,
	"aelig;": 230,
	agrave: 224,
	"aleph;": 8501,
	"alpha;": 945,
	"amacr;": 257,
	"amalg;": 10815,
	"angle;": 8736,
	"angrt;": 8735,
	"angst;": 197,
	"aogon;": 261,
	"aring;": 229,
	"asymp;": 8776,
	atilde: 227,
	"awint;": 10769,
	"bcong;": 8780,
	"bdquo;": 8222,
	"bepsi;": 1014,
	"blank;": 9251,
	"blk12;": 9618,
	"blk14;": 9617,
	"blk34;": 9619,
	"block;": 9608,
	"boxDL;": 9559,
	"boxDR;": 9556,
	"boxDl;": 9558,
	"boxDr;": 9555,
	"boxHD;": 9574,
	"boxHU;": 9577,
	"boxHd;": 9572,
	"boxHu;": 9575,
	"boxUL;": 9565,
	"boxUR;": 9562,
	"boxUl;": 9564,
	"boxUr;": 9561,
	"boxVH;": 9580,
	"boxVL;": 9571,
	"boxVR;": 9568,
	"boxVh;": 9579,
	"boxVl;": 9570,
	"boxVr;": 9567,
	"boxdL;": 9557,
	"boxdR;": 9554,
	"boxdl;": 9488,
	"boxdr;": 9484,
	"boxhD;": 9573,
	"boxhU;": 9576,
	"boxhd;": 9516,
	"boxhu;": 9524,
	"boxuL;": 9563,
	"boxuR;": 9560,
	"boxul;": 9496,
	"boxur;": 9492,
	"boxvH;": 9578,
	"boxvL;": 9569,
	"boxvR;": 9566,
	"boxvh;": 9532,
	"boxvl;": 9508,
	"boxvr;": 9500,
	"breve;": 728,
	brvbar: 166,
	"bsemi;": 8271,
	"bsime;": 8909,
	"bsolb;": 10693,
	"bumpE;": 10926,
	"bumpe;": 8783,
	"caret;": 8257,
	"caron;": 711,
	"ccaps;": 10829,
	ccedil: 231,
	"ccirc;": 265,
	"ccups;": 10828,
	"cedil;": 184,
	"check;": 10003,
	"clubs;": 9827,
	"colon;": 58,
	"comma;": 44,
	"crarr;": 8629,
	"cross;": 10007,
	"csube;": 10961,
	"csupe;": 10962,
	"ctdot;": 8943,
	"cuepr;": 8926,
	"cuesc;": 8927,
	"cupor;": 10821,
	curren: 164,
	"cuvee;": 8910,
	"cuwed;": 8911,
	"cwint;": 8753,
	"dashv;": 8867,
	"dblac;": 733,
	"ddarr;": 8650,
	"delta;": 948,
	"dharl;": 8643,
	"dharr;": 8642,
	"diams;": 9830,
	"disin;": 8946,
	divide: 247,
	"doteq;": 8784,
	"dtdot;": 8945,
	"dtrif;": 9662,
	"duarr;": 8693,
	"duhar;": 10607,
	"eDDot;": 10871,
	eacute: 233,
	"ecirc;": 234,
	"efDot;": 8786,
	egrave: 232,
	"emacr;": 275,
	"empty;": 8709,
	"eogon;": 281,
	"eplus;": 10865,
	"epsiv;": 1013,
	"eqsim;": 8770,
	"equiv;": 8801,
	"erDot;": 8787,
	"erarr;": 10609,
	"esdot;": 8784,
	"exist;": 8707,
	"fflig;": 64256,
	"filig;": 64257,
	"fjlig;": 102,
	"fllig;": 64258,
	"fltns;": 9649,
	"forkv;": 10969,
	frac12: 189,
	frac14: 188,
	frac34: 190,
	"frasl;": 8260,
	"frown;": 8994,
	"gamma;": 947,
	"gcirc;": 285,
	"gescc;": 10921,
	"gimel;": 8503,
	"gneqq;": 8809,
	"gnsim;": 8935,
	"grave;": 96,
	"gsime;": 10894,
	"gsiml;": 10896,
	"gtcir;": 10874,
	"gtdot;": 8919,
	"harrw;": 8621,
	"hcirc;": 293,
	"hoarr;": 8703,
	iacute: 237,
	"icirc;": 238,
	"iexcl;": 161,
	igrave: 236,
	"iiint;": 8749,
	"iiota;": 8489,
	"ijlig;": 307,
	"imacr;": 299,
	"image;": 8465,
	"imath;": 305,
	"imped;": 437,
	"infin;": 8734,
	"iogon;": 303,
	"iprod;": 10812,
	iquest: 191,
	"isinE;": 8953,
	"isins;": 8948,
	"isinv;": 8712,
	"iukcy;": 1110,
	"jcirc;": 309,
	"jmath;": 567,
	"jukcy;": 1108,
	"kappa;": 954,
	"lAarr;": 8666,
	"lBarr;": 10510,
	"langd;": 10641,
	"laquo;": 171,
	"larrb;": 8676,
	"lates;": 10925,
	"lbarr;": 10508,
	"lbbrk;": 10098,
	"lbrke;": 10635,
	"lceil;": 8968,
	"ldquo;": 8220,
	"lescc;": 10920,
	"lhard;": 8637,
	"lharu;": 8636,
	"lhblk;": 9604,
	"llarr;": 8647,
	"lltri;": 9722,
	"lneqq;": 8808,
	"lnsim;": 8934,
	"loang;": 10220,
	"loarr;": 8701,
	"lobrk;": 10214,
	"lopar;": 10629,
	"lrarr;": 8646,
	"lrhar;": 8651,
	"lrtri;": 8895,
	"lsime;": 10893,
	"lsimg;": 10895,
	"lsquo;": 8216,
	"ltcir;": 10873,
	"ltdot;": 8918,
	"ltrie;": 8884,
	"ltrif;": 9666,
	"mDDot;": 8762,
	"mdash;": 8212,
	"micro;": 181,
	middot: 183,
	"minus;": 8722,
	"mumap;": 8888,
	"nabla;": 8711,
	"napid;": 8779,
	"napos;": 329,
	"natur;": 9838,
	"nbump;": 8782,
	"ncong;": 8775,
	"ndash;": 8211,
	"neArr;": 8663,
	"nearr;": 8599,
	"nedot;": 8784,
	"nesim;": 8770,
	"ngeqq;": 8807,
	"ngsim;": 8821,
	"nhArr;": 8654,
	"nharr;": 8622,
	"nhpar;": 10994,
	"nlArr;": 8653,
	"nlarr;": 8602,
	"nleqq;": 8806,
	"nless;": 8814,
	"nlsim;": 8820,
	"nltri;": 8938,
	"notin;": 8713,
	"notni;": 8716,
	"npart;": 8706,
	"nprec;": 8832,
	"nrArr;": 8655,
	"nrarr;": 8603,
	"nrtri;": 8939,
	"nsime;": 8772,
	"nsmid;": 8740,
	"nspar;": 8742,
	"nsubE;": 10949,
	"nsube;": 8840,
	"nsucc;": 8833,
	"nsupE;": 10950,
	"nsupe;": 8841,
	ntilde: 241,
	"numsp;": 8199,
	"nvsim;": 8764,
	"nwArr;": 8662,
	"nwarr;": 8598,
	oacute: 243,
	"ocirc;": 244,
	"odash;": 8861,
	"oelig;": 339,
	"ofcir;": 10687,
	ograve: 242,
	"ohbar;": 10677,
	"olarr;": 8634,
	"olcir;": 10686,
	"oline;": 8254,
	"omacr;": 333,
	"omega;": 969,
	"operp;": 10681,
	"oplus;": 8853,
	"orarr;": 8635,
	"order;": 8500,
	oslash: 248,
	otilde: 245,
	"ovbar;": 9021,
	"parsl;": 11005,
	"phone;": 9742,
	"plusb;": 8862,
	"pluse;": 10866,
	plusmn: 177,
	"pound;": 163,
	"prcue;": 8828,
	"prime;": 8242,
	"prnap;": 10937,
	"prsim;": 8830,
	"quest;": 63,
	"rAarr;": 8667,
	"rBarr;": 10511,
	"radic;": 8730,
	"rangd;": 10642,
	"range;": 10661,
	"raquo;": 187,
	"rarrb;": 8677,
	"rarrc;": 10547,
	"rarrw;": 8605,
	"ratio;": 8758,
	"rbarr;": 10509,
	"rbbrk;": 10099,
	"rbrke;": 10636,
	"rceil;": 8969,
	"rdquo;": 8221,
	"reals;": 8477,
	"rhard;": 8641,
	"rharu;": 8640,
	"rlarr;": 8644,
	"rlhar;": 8652,
	"rnmid;": 10990,
	"roang;": 10221,
	"roarr;": 8702,
	"robrk;": 10215,
	"ropar;": 10630,
	"rrarr;": 8649,
	"rsquo;": 8217,
	"rtrie;": 8885,
	"rtrif;": 9656,
	"sbquo;": 8218,
	"sccue;": 8829,
	"scirc;": 349,
	"scnap;": 10938,
	"scsim;": 8831,
	"sdotb;": 8865,
	"sdote;": 10854,
	"seArr;": 8664,
	"searr;": 8600,
	"setmn;": 8726,
	"sharp;": 9839,
	"sigma;": 963,
	"simeq;": 8771,
	"simgE;": 10912,
	"simlE;": 10911,
	"simne;": 8774,
	"slarr;": 8592,
	"smile;": 8995,
	"smtes;": 10924,
	"sqcap;": 8851,
	"sqcup;": 8852,
	"sqsub;": 8847,
	"sqsup;": 8848,
	"srarr;": 8594,
	"starf;": 9733,
	"strns;": 175,
	"subnE;": 10955,
	"subne;": 8842,
	"supnE;": 10956,
	"supne;": 8843,
	"swArr;": 8665,
	"swarr;": 8601,
	"szlig;": 223,
	"theta;": 952,
	"thkap;": 8776,
	"thorn;": 254,
	"tilde;": 732,
	"times;": 215,
	"trade;": 8482,
	"trisb;": 10701,
	"tshcy;": 1115,
	"twixt;": 8812,
	uacute: 250,
	"ubrcy;": 1118,
	"ucirc;": 251,
	"udarr;": 8645,
	"udhar;": 10606,
	ugrave: 249,
	"uharl;": 8639,
	"uharr;": 8638,
	"uhblk;": 9600,
	"ultri;": 9720,
	"umacr;": 363,
	"uogon;": 371,
	"uplus;": 8846,
	"upsih;": 978,
	"uring;": 367,
	"urtri;": 9721,
	"utdot;": 8944,
	"utrif;": 9652,
	"uuarr;": 8648,
	"vBarv;": 10985,
	"vDash;": 8872,
	"varpi;": 982,
	"vdash;": 8866,
	"veeeq;": 8794,
	"vltri;": 8882,
	"vnsub;": 8834,
	"vnsup;": 8835,
	"vprop;": 8733,
	"vrtri;": 8883,
	"wcirc;": 373,
	"wedge;": 8743,
	"xcirc;": 9711,
	"xdtri;": 9661,
	"xhArr;": 10234,
	"xharr;": 10231,
	"xlArr;": 10232,
	"xlarr;": 10229,
	"xodot;": 10752,
	"xrArr;": 10233,
	"xrarr;": 10230,
	"xutri;": 9651,
	yacute: 253,
	"ycirc;": 375,
	AElig: 198,
	Acirc: 194,
	"Aopf;": 120120,
	Aring: 197,
	"Ascr;": 119964,
	"Auml;": 196,
	"Barv;": 10983,
	"Beta;": 914,
	"Bopf;": 120121,
	"Bscr;": 8492,
	"CHcy;": 1063,
	"COPY;": 169,
	"Cdot;": 266,
	"Copf;": 8450,
	"Cscr;": 119966,
	"DJcy;": 1026,
	"DScy;": 1029,
	"DZcy;": 1039,
	"Darr;": 8609,
	"Dopf;": 120123,
	"Dscr;": 119967,
	Ecirc: 202,
	"Edot;": 278,
	"Eopf;": 120124,
	"Escr;": 8496,
	"Esim;": 10867,
	"Euml;": 203,
	"Fopf;": 120125,
	"Fscr;": 8497,
	"GJcy;": 1027,
	"Gdot;": 288,
	"Gopf;": 120126,
	"Gscr;": 119970,
	"Hopf;": 8461,
	"Hscr;": 8459,
	"IEcy;": 1045,
	"IOcy;": 1025,
	Icirc: 206,
	"Idot;": 304,
	"Iopf;": 120128,
	"Iota;": 921,
	"Iscr;": 8464,
	"Iuml;": 207,
	"Jopf;": 120129,
	"Jscr;": 119973,
	"KHcy;": 1061,
	"KJcy;": 1036,
	"Kopf;": 120130,
	"Kscr;": 119974,
	"LJcy;": 1033,
	"Lang;": 10218,
	"Larr;": 8606,
	"Lopf;": 120131,
	"Lscr;": 8466,
	"Mopf;": 120132,
	"Mscr;": 8499,
	"NJcy;": 1034,
	"Nopf;": 8469,
	"Nscr;": 119977,
	Ocirc: 212,
	"Oopf;": 120134,
	"Oscr;": 119978,
	"Ouml;": 214,
	"Popf;": 8473,
	"Pscr;": 119979,
	"QUOT;": 34,
	"Qopf;": 8474,
	"Qscr;": 119980,
	"Rang;": 10219,
	"Rarr;": 8608,
	"Ropf;": 8477,
	"Rscr;": 8475,
	"SHcy;": 1064,
	"Sopf;": 120138,
	"Sqrt;": 8730,
	"Sscr;": 119982,
	"Star;": 8902,
	THORN: 222,
	"TScy;": 1062,
	"Topf;": 120139,
	"Tscr;": 119983,
	"Uarr;": 8607,
	Ucirc: 219,
	"Uopf;": 120140,
	"Upsi;": 978,
	"Uscr;": 119984,
	"Uuml;": 220,
	"Vbar;": 10987,
	"Vert;": 8214,
	"Vopf;": 120141,
	"Vscr;": 119985,
	"Wopf;": 120142,
	"Wscr;": 119986,
	"Xopf;": 120143,
	"Xscr;": 119987,
	"YAcy;": 1071,
	"YIcy;": 1031,
	"YUcy;": 1070,
	"Yopf;": 120144,
	"Yscr;": 119988,
	"Yuml;": 376,
	"ZHcy;": 1046,
	"Zdot;": 379,
	"Zeta;": 918,
	"Zopf;": 8484,
	"Zscr;": 119989,
	acirc: 226,
	acute: 180,
	aelig: 230,
	"andd;": 10844,
	"andv;": 10842,
	"ange;": 10660,
	"aopf;": 120146,
	"apid;": 8779,
	"apos;": 39,
	aring: 229,
	"ascr;": 119990,
	"auml;": 228,
	"bNot;": 10989,
	"bbrk;": 9141,
	"beta;": 946,
	"beth;": 8502,
	"bnot;": 8976,
	"bopf;": 120147,
	"boxH;": 9552,
	"boxV;": 9553,
	"boxh;": 9472,
	"boxv;": 9474,
	"bscr;": 119991,
	"bsim;": 8765,
	"bsol;": 92,
	"bull;": 8226,
	"bump;": 8782,
	"caps;": 8745,
	"cdot;": 267,
	cedil: 184,
	"cent;": 162,
	"chcy;": 1095,
	"cirE;": 10691,
	"circ;": 710,
	"cire;": 8791,
	"comp;": 8705,
	"cong;": 8773,
	"copf;": 120148,
	"copy;": 169,
	"cscr;": 119992,
	"csub;": 10959,
	"csup;": 10960,
	"cups;": 8746,
	"dArr;": 8659,
	"dHar;": 10597,
	"darr;": 8595,
	"dash;": 8208,
	"diam;": 8900,
	"djcy;": 1106,
	"dopf;": 120149,
	"dscr;": 119993,
	"dscy;": 1109,
	"dsol;": 10742,
	"dtri;": 9663,
	"dzcy;": 1119,
	"eDot;": 8785,
	"ecir;": 8790,
	ecirc: 234,
	"edot;": 279,
	"emsp;": 8195,
	"ensp;": 8194,
	"eopf;": 120150,
	"epar;": 8917,
	"epsi;": 949,
	"escr;": 8495,
	"esim;": 8770,
	"euml;": 235,
	"euro;": 8364,
	"excl;": 33,
	"flat;": 9837,
	"fnof;": 402,
	"fopf;": 120151,
	"fork;": 8916,
	"fscr;": 119995,
	"gdot;": 289,
	"geqq;": 8807,
	"gesl;": 8923,
	"gjcy;": 1107,
	"gnap;": 10890,
	"gneq;": 10888,
	"gopf;": 120152,
	"gscr;": 8458,
	"gsim;": 8819,
	"gtcc;": 10919,
	"gvnE;": 8809,
	"hArr;": 8660,
	"half;": 189,
	"harr;": 8596,
	"hbar;": 8463,
	"hopf;": 120153,
	"hscr;": 119997,
	icirc: 238,
	"iecy;": 1077,
	iexcl: 161,
	"imof;": 8887,
	"iocy;": 1105,
	"iopf;": 120154,
	"iota;": 953,
	"iscr;": 119998,
	"isin;": 8712,
	"iuml;": 239,
	"jopf;": 120155,
	"jscr;": 119999,
	"khcy;": 1093,
	"kjcy;": 1116,
	"kopf;": 120156,
	"kscr;": 12e4,
	"lArr;": 8656,
	"lHar;": 10594,
	"lang;": 10216,
	laquo: 171,
	"larr;": 8592,
	"late;": 10925,
	"lcub;": 123,
	"ldca;": 10550,
	"ldsh;": 8626,
	"leqq;": 8806,
	"lesg;": 8922,
	"ljcy;": 1113,
	"lnap;": 10889,
	"lneq;": 10887,
	"lopf;": 120157,
	"lozf;": 10731,
	"lpar;": 40,
	"lscr;": 120001,
	"lsim;": 8818,
	"lsqb;": 91,
	"ltcc;": 10918,
	"ltri;": 9667,
	"lvnE;": 8808,
	"macr;": 175,
	"male;": 9794,
	"malt;": 10016,
	micro: 181,
	"mlcp;": 10971,
	"mldr;": 8230,
	"mopf;": 120158,
	"mscr;": 120002,
	"nGtv;": 8811,
	"nLtv;": 8810,
	"nang;": 8736,
	"napE;": 10864,
	"nbsp;": 160,
	"ncap;": 10819,
	"ncup;": 10818,
	"ngeq;": 8817,
	"nges;": 10878,
	"ngtr;": 8815,
	"nisd;": 8954,
	"njcy;": 1114,
	"nldr;": 8229,
	"nleq;": 8816,
	"nles;": 10877,
	"nmid;": 8740,
	"nopf;": 120159,
	"npar;": 8742,
	"npre;": 10927,
	"nsce;": 10928,
	"nscr;": 120003,
	"nsim;": 8769,
	"nsub;": 8836,
	"nsup;": 8837,
	"ntgl;": 8825,
	"ntlg;": 8824,
	"nvap;": 8781,
	"nvge;": 8805,
	"nvgt;": 62,
	"nvle;": 8804,
	"nvlt;": 60,
	"oast;": 8859,
	"ocir;": 8858,
	ocirc: 244,
	"odiv;": 10808,
	"odot;": 8857,
	"ogon;": 731,
	"oint;": 8750,
	"omid;": 10678,
	"oopf;": 120160,
	"opar;": 10679,
	"ordf;": 170,
	"ordm;": 186,
	"oror;": 10838,
	"oscr;": 8500,
	"osol;": 8856,
	"ouml;": 246,
	"para;": 182,
	"part;": 8706,
	"perp;": 8869,
	"phiv;": 981,
	"plus;": 43,
	"popf;": 120161,
	pound: 163,
	"prap;": 10935,
	"prec;": 8826,
	"prnE;": 10933,
	"prod;": 8719,
	"prop;": 8733,
	"pscr;": 120005,
	"qint;": 10764,
	"qopf;": 120162,
	"qscr;": 120006,
	"quot;": 34,
	"rArr;": 8658,
	"rHar;": 10596,
	"race;": 8765,
	"rang;": 10217,
	raquo: 187,
	"rarr;": 8594,
	"rcub;": 125,
	"rdca;": 10551,
	"rdsh;": 8627,
	"real;": 8476,
	"rect;": 9645,
	"rhov;": 1009,
	"ring;": 730,
	"ropf;": 120163,
	"rpar;": 41,
	"rscr;": 120007,
	"rsqb;": 93,
	"rtri;": 9657,
	"scap;": 10936,
	"scnE;": 10934,
	"sdot;": 8901,
	"sect;": 167,
	"semi;": 59,
	"sext;": 10038,
	"shcy;": 1096,
	"sime;": 8771,
	"simg;": 10910,
	"siml;": 10909,
	"smid;": 8739,
	"smte;": 10924,
	"solb;": 10692,
	"sopf;": 120164,
	"spar;": 8741,
	"squf;": 9642,
	"sscr;": 120008,
	"star;": 9734,
	"subE;": 10949,
	"sube;": 8838,
	"succ;": 8827,
	"sung;": 9834,
	"sup1;": 185,
	"sup2;": 178,
	"sup3;": 179,
	"supE;": 10950,
	"supe;": 8839,
	szlig: 223,
	"tbrk;": 9140,
	"tdot;": 8411,
	thorn: 254,
	times: 215,
	"tint;": 8749,
	"toea;": 10536,
	"topf;": 120165,
	"tosa;": 10537,
	"trie;": 8796,
	"tscr;": 120009,
	"tscy;": 1094,
	"uArr;": 8657,
	"uHar;": 10595,
	"uarr;": 8593,
	ucirc: 251,
	"uopf;": 120166,
	"upsi;": 965,
	"uscr;": 120010,
	"utri;": 9653,
	"uuml;": 252,
	"vArr;": 8661,
	"vBar;": 10984,
	"varr;": 8597,
	"vert;": 124,
	"vopf;": 120167,
	"vscr;": 120011,
	"wopf;": 120168,
	"wscr;": 120012,
	"xcap;": 8898,
	"xcup;": 8899,
	"xmap;": 10236,
	"xnis;": 8955,
	"xopf;": 120169,
	"xscr;": 120013,
	"xvee;": 8897,
	"yacy;": 1103,
	"yicy;": 1111,
	"yopf;": 120170,
	"yscr;": 120014,
	"yucy;": 1102,
	"yuml;": 255,
	"zdot;": 380,
	"zeta;": 950,
	"zhcy;": 1078,
	"zopf;": 120171,
	"zscr;": 120015,
	"zwnj;": 8204,
	"AMP;": 38,
	"Acy;": 1040,
	"Afr;": 120068,
	"And;": 10835,
	Auml: 196,
	"Bcy;": 1041,
	"Bfr;": 120069,
	COPY: 169,
	"Cap;": 8914,
	"Cfr;": 8493,
	"Chi;": 935,
	"Cup;": 8915,
	"Dcy;": 1044,
	"Del;": 8711,
	"Dfr;": 120071,
	"Dot;": 168,
	"ENG;": 330,
	"ETH;": 208,
	"Ecy;": 1069,
	"Efr;": 120072,
	"Eta;": 919,
	Euml: 203,
	"Fcy;": 1060,
	"Ffr;": 120073,
	"Gcy;": 1043,
	"Gfr;": 120074,
	"Hat;": 94,
	"Hfr;": 8460,
	"Icy;": 1048,
	"Ifr;": 8465,
	"Int;": 8748,
	Iuml: 207,
	"Jcy;": 1049,
	"Jfr;": 120077,
	"Kcy;": 1050,
	"Kfr;": 120078,
	"Lcy;": 1051,
	"Lfr;": 120079,
	"Lsh;": 8624,
	"Map;": 10501,
	"Mcy;": 1052,
	"Mfr;": 120080,
	"Ncy;": 1053,
	"Nfr;": 120081,
	"Not;": 10988,
	"Ocy;": 1054,
	"Ofr;": 120082,
	Ouml: 214,
	"Pcy;": 1055,
	"Pfr;": 120083,
	"Phi;": 934,
	"Psi;": 936,
	QUOT: 34,
	"Qfr;": 120084,
	"REG;": 174,
	"Rcy;": 1056,
	"Rfr;": 8476,
	"Rho;": 929,
	"Rsh;": 8625,
	"Scy;": 1057,
	"Sfr;": 120086,
	"Sub;": 8912,
	"Sum;": 8721,
	"Sup;": 8913,
	"Tab;": 9,
	"Tau;": 932,
	"Tcy;": 1058,
	"Tfr;": 120087,
	"Ucy;": 1059,
	"Ufr;": 120088,
	Uuml: 220,
	"Vcy;": 1042,
	"Vee;": 8897,
	"Vfr;": 120089,
	"Wfr;": 120090,
	"Xfr;": 120091,
	"Ycy;": 1067,
	"Yfr;": 120092,
	"Zcy;": 1047,
	"Zfr;": 8488,
	"acE;": 8766,
	"acd;": 8767,
	"acy;": 1072,
	"afr;": 120094,
	"amp;": 38,
	"and;": 8743,
	"ang;": 8736,
	"apE;": 10864,
	"ape;": 8778,
	"ast;": 42,
	auml: 228,
	"bcy;": 1073,
	"bfr;": 120095,
	"bne;": 61,
	"bot;": 8869,
	"cap;": 8745,
	cent: 162,
	"cfr;": 120096,
	"chi;": 967,
	"cir;": 9675,
	copy: 169,
	"cup;": 8746,
	"dcy;": 1076,
	"deg;": 176,
	"dfr;": 120097,
	"die;": 168,
	"div;": 247,
	"dot;": 729,
	"ecy;": 1101,
	"efr;": 120098,
	"egs;": 10902,
	"ell;": 8467,
	"els;": 10901,
	"eng;": 331,
	"eta;": 951,
	"eth;": 240,
	euml: 235,
	"fcy;": 1092,
	"ffr;": 120099,
	"gEl;": 10892,
	"gap;": 10886,
	"gcy;": 1075,
	"gel;": 8923,
	"geq;": 8805,
	"ges;": 10878,
	"gfr;": 120100,
	"ggg;": 8921,
	"glE;": 10898,
	"gla;": 10917,
	"glj;": 10916,
	"gnE;": 8809,
	"gne;": 10888,
	"hfr;": 120101,
	"icy;": 1080,
	"iff;": 8660,
	"ifr;": 120102,
	"int;": 8747,
	iuml: 239,
	"jcy;": 1081,
	"jfr;": 120103,
	"kcy;": 1082,
	"kfr;": 120104,
	"lEg;": 10891,
	"lap;": 10885,
	"lat;": 10923,
	"lcy;": 1083,
	"leg;": 8922,
	"leq;": 8804,
	"les;": 10877,
	"lfr;": 120105,
	"lgE;": 10897,
	"lnE;": 8808,
	"lne;": 10887,
	"loz;": 9674,
	"lrm;": 8206,
	"lsh;": 8624,
	macr: 175,
	"map;": 8614,
	"mcy;": 1084,
	"mfr;": 120106,
	"mho;": 8487,
	"mid;": 8739,
	"nGg;": 8921,
	"nGt;": 8811,
	"nLl;": 8920,
	"nLt;": 8810,
	"nap;": 8777,
	nbsp: 160,
	"ncy;": 1085,
	"nfr;": 120107,
	"ngE;": 8807,
	"nge;": 8817,
	"ngt;": 8815,
	"nis;": 8956,
	"niv;": 8715,
	"nlE;": 8806,
	"nle;": 8816,
	"nlt;": 8814,
	"not;": 172,
	"npr;": 8832,
	"nsc;": 8833,
	"num;": 35,
	"ocy;": 1086,
	"ofr;": 120108,
	"ogt;": 10689,
	"ohm;": 937,
	"olt;": 10688,
	"ord;": 10845,
	ordf: 170,
	ordm: 186,
	"orv;": 10843,
	ouml: 246,
	"par;": 8741,
	para: 182,
	"pcy;": 1087,
	"pfr;": 120109,
	"phi;": 966,
	"piv;": 982,
	"prE;": 10931,
	"pre;": 10927,
	"psi;": 968,
	"qfr;": 120110,
	quot: 34,
	"rcy;": 1088,
	"reg;": 174,
	"rfr;": 120111,
	"rho;": 961,
	"rlm;": 8207,
	"rsh;": 8625,
	"scE;": 10932,
	"sce;": 10928,
	"scy;": 1089,
	sect: 167,
	"sfr;": 120112,
	"shy;": 173,
	"sim;": 8764,
	"smt;": 10922,
	"sol;": 47,
	"squ;": 9633,
	"sub;": 8834,
	"sum;": 8721,
	sup1: 185,
	sup2: 178,
	sup3: 179,
	"sup;": 8835,
	"tau;": 964,
	"tcy;": 1090,
	"tfr;": 120113,
	"top;": 8868,
	"ucy;": 1091,
	"ufr;": 120114,
	"uml;": 168,
	uuml: 252,
	"vcy;": 1074,
	"vee;": 8744,
	"vfr;": 120115,
	"wfr;": 120116,
	"xfr;": 120117,
	"ycy;": 1099,
	"yen;": 165,
	"yfr;": 120118,
	yuml: 255,
	"zcy;": 1079,
	"zfr;": 120119,
	"zwj;": 8205,
	AMP: 38,
	"DD;": 8517,
	ETH: 208,
	"GT;": 62,
	"Gg;": 8921,
	"Gt;": 8811,
	"Im;": 8465,
	"LT;": 60,
	"Ll;": 8920,
	"Lt;": 8810,
	"Mu;": 924,
	"Nu;": 925,
	"Or;": 10836,
	"Pi;": 928,
	"Pr;": 10939,
	REG: 174,
	"Re;": 8476,
	"Sc;": 10940,
	"Xi;": 926,
	"ac;": 8766,
	"af;": 8289,
	amp: 38,
	"ap;": 8776,
	"dd;": 8518,
	deg: 176,
	"ee;": 8519,
	"eg;": 10906,
	"el;": 10905,
	eth: 240,
	"gE;": 8807,
	"ge;": 8805,
	"gg;": 8811,
	"gl;": 8823,
	"gt;": 62,
	"ic;": 8291,
	"ii;": 8520,
	"in;": 8712,
	"it;": 8290,
	"lE;": 8806,
	"le;": 8804,
	"lg;": 8822,
	"ll;": 8810,
	"lt;": 60,
	"mp;": 8723,
	"mu;": 956,
	"ne;": 8800,
	"ni;": 8715,
	not: 172,
	"nu;": 957,
	"oS;": 9416,
	"or;": 8744,
	"pi;": 960,
	"pm;": 177,
	"pr;": 8826,
	reg: 174,
	"rx;": 8478,
	"sc;": 8827,
	shy: 173,
	uml: 168,
	"wp;": 8472,
	"wr;": 8768,
	"xi;": 958,
	yen: 165,
	GT: 62,
	LT: 60,
	gt: 62,
	lt: 60
}, $a = [
	8364,
	129,
	8218,
	402,
	8222,
	8230,
	8224,
	8225,
	710,
	8240,
	352,
	8249,
	338,
	141,
	381,
	143,
	144,
	8216,
	8217,
	8220,
	8221,
	8226,
	8211,
	8212,
	732,
	8482,
	353,
	8250,
	339,
	157,
	382,
	376
];
function eo(e, t) {
	return t && !e.endsWith(";") ? `${e}\\b(?!=)` : e;
}
function to(e) {
	let t = Object.keys(Qa).map((t) => eo(t, e));
	return RegExp(`&(#(?:x[a-fA-F\\d]+|\\d+)(?:;)?|${t.join("|")})`, "g");
}
var no = to(!1), ro = to(!0);
function io(e, t) {
	let n = t ? ro : no;
	return e.replace(n, (e, t) => {
		let n;
		return n = t[0] === "#" ? t[1] === "x" ? parseInt(t.substring(2), 16) : parseInt(t.substring(1), 10) : Qa[t], n ? String.fromCodePoint(oo(n)) : e;
	});
}
var ao = 0;
function oo(e) {
	return e === 10 ? 32 : e < 128 ? e : e <= 159 ? $a[e - 128] : e < 55296 ? e : e <= 57343 ? ao : e <= 65535 || e >= 65536 && e <= 131071 || e >= 131072 && e <= 196607 || e >= 917504 && e <= 917631 || e >= 917760 && e <= 917999 ? e : ao;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/utils/create.js
function q(e = !1) {
	return {
		type: "Fragment",
		nodes: [],
		metadata: {
			transparent: e,
			dynamic: !1
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/nodes.js
var so = [
	"SvelteElement",
	"RegularElement",
	"SvelteFragment",
	"Component",
	"SvelteComponent",
	"SvelteSelf",
	"SlotElement"
];
function co(e) {
	return so.includes(e.type);
}
function lo(e, t, n, r, i) {
	return {
		type: "Attribute",
		start: n,
		end: r,
		name: e,
		name_loc: t,
		value: i,
		metadata: {
			delegated: !1,
			needs_clsx: !1
		}
	};
}
var J = class {
	has_state = !1;
	has_call = !1;
	has_await = !1;
	has_member_expression = !1;
	has_assignment = !1;
	dependencies = /* @__PURE__ */ new Set();
	references = /* @__PURE__ */ new Set();
	#e = null;
	#t() {
		if (!this.#e) {
			this.#e = /* @__PURE__ */ new Set();
			for (let e of this.references) e.blocker && this.#e.add(e.blocker);
		}
		return this.#e;
	}
	blockers() {
		return _a([...this.#t()]);
	}
	has_blockers() {
		return this.#t().size > 0;
	}
	has_more_blockers_than(e) {
		for (let t of this.#t()) if (!e.#t().has(t)) return !0;
		return !1;
	}
	is_async() {
		return this.has_await || this.#t().size > 0;
	}
	merge(e) {
		this.has_state ||= e.has_state, this.has_call ||= e.has_call, this.has_await ||= e.has_await, this.has_member_expression ||= e.has_member_expression, this.has_assignment ||= e.has_assignment, this.#e = null;
		for (let t of e.references) this.references.add(t);
		for (let t of e.dependencies) this.dependencies.add(t);
	}
}, uo = {
	li: { direct: ["li"] },
	dt: {
		descendant: ["dt", "dd"],
		reset_by: ["dl"]
	},
	dd: {
		descendant: ["dt", "dd"],
		reset_by: ["dl"]
	},
	p: { descendant: /* @__PURE__ */ "address.article.aside.blockquote.div.dl.fieldset.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.main.menu.nav.ol.p.pre.section.table.ul".split(".") },
	rt: { descendant: ["rt", "rp"] },
	rp: { descendant: ["rt", "rp"] },
	optgroup: { descendant: ["optgroup"] },
	option: { descendant: ["option", "optgroup"] },
	thead: { direct: ["tbody", "tfoot"] },
	tbody: { direct: ["tbody", "tfoot"] },
	tfoot: { direct: ["tbody"] },
	tr: { direct: ["tr", "tbody"] },
	td: { direct: [
		"td",
		"th",
		"tr"
	] },
	th: { direct: [
		"td",
		"th",
		"tr"
	] }
};
function fo(e, t) {
	let n = uo[e];
	return !!(n && (!t || ("direct" in n ? n.direct : n.descendant).includes(t)));
}
({ ...uo });
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/utils/string.js
function po(e, t = "or") {
	return e.length === 1 ? e[0] : e.length === 2 ? `${e[0]} ${t} ${e[1]}` : `${e.slice(0, -1).join(", ")} ${t} ${e[e.length - 1]}`;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/state/element.js
var mo = /(\/>|[\s"'=<>`])/y, ho = /<\/textarea(\s[^>]*)?>/iy, go = /-->/, _o = /(\s|\/|>)/, vo = /[\s=/>"']/, yo = /["']/y, bo = /(?:"([^"]*)"|'([^'])*'|([^>\s]+))/y, xo = /^![a-zA-Z]+$/, So = /^[a-zA-Z][a-zA-Z0-9]*:[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/;
function Co(e) {
	return xo.test(e) || So.test(e) ? !0 : a.test(e);
}
var wo = /^(?:\p{Lu}[$\u200c\u200d\p{ID_Continue}.]*|\p{ID_Start}[$\u200c\u200d\p{ID_Continue}]*(?:\.[$\u200c\u200d\p{ID_Continue}]+)+)$/u, To = new Map([
	["svelte:head", "SvelteHead"],
	["svelte:options", "SvelteOptions"],
	["svelte:window", "SvelteWindow"],
	["svelte:document", "SvelteDocument"],
	["svelte:body", "SvelteBody"]
]), Eo = new Map([
	...To,
	["svelte:element", "SvelteElement"],
	["svelte:component", "SvelteComponent"],
	["svelte:self", "SvelteSelf"],
	["svelte:fragment", "SvelteFragment"],
	["svelte:boundary", "SvelteBoundary"]
]);
function Do(e) {
	let t = e.index++, n = e.current();
	if (e.eat("!--")) {
		let n = e.read_until(go);
		e.eat("-->", !0), e.append({
			type: "Comment",
			start: t,
			end: e.index,
			data: n
		});
		return;
	}
	if (e.eat("/")) {
		let r = e.read_until(_o);
		for (e.allow_whitespace(), e.eat(">", !0), i(r) && Xi(t); n.name !== r;) {
			if (e.loose && co(n)) {
				let t = n.attributes.at(-1);
				if (t?.type === "Attribute" && t.name === `<${r}`) {
					e.index = t.start, n.attributes.pop();
					break;
				}
			}
			if (n.type === "RegularElement") {
				if (!e.last_auto_closed_tag || e.last_auto_closed_tag.tag !== r) {
					let e = n.fragment.nodes[0]?.start ?? t;
					ke({
						start: n.start,
						end: e
					}, `</${r}>`, `</${n.name}>`);
				}
			} else e.loose || (e.last_auto_closed_tag && e.last_auto_closed_tag.tag === r ? pi(t, r, e.last_auto_closed_tag.reason) : fi(t, r));
			n.end = t, e.pop(), n = e.current();
		}
		n.end = e.index, e.pop(), e.last_auto_closed_tag && e.stack.length < e.last_auto_closed_tag.depth && (e.last_auto_closed_tag = void 0);
		return;
	}
	let r = Io(e, _o);
	r.name.startsWith("svelte:") && !Eo.has(r.name) && Fi({
		start: t + 1,
		end: t + 1 + r.name.length
	}, po(Array.from(Eo.keys()))), !Co(r.name) && !wo.test(r.name) && (!e.loose || !r.name.endsWith(".")) && Gi({
		start: t + 1,
		end: t + 1 + r.name.length
	}), To.has(r.name) && (r.name in e.meta_tags && Mi(t, r.name), n.type !== "Root" && Pi(t, r.name), e.meta_tags[r.name] = !0);
	let a = Eo.has(r.name) ? Eo.get(r.name) : wo.test(r.name) || e.loose && r.name.endsWith(".") ? "Component" : r.name === "title" && Oo(e.stack) ? "TitleElement" : r.name === "slot" && !ko(e.stack) ? "SlotElement" : "RegularElement", o = a === "RegularElement" ? {
		type: a,
		start: t,
		end: -1,
		name: r.name,
		name_loc: r.loc,
		attributes: [],
		fragment: q(!0),
		metadata: {
			svg: !1,
			mathml: !1,
			scoped: !1,
			has_spread: !1,
			path: [],
			synthetic_value_node: null
		}
	} : {
		type: a,
		start: t,
		end: -1,
		name: r.name,
		name_loc: r.loc,
		attributes: [],
		fragment: q(!0),
		metadata: {}
	};
	if (e.allow_whitespace(), n.type === "RegularElement" && fo(n.name, r.name)) {
		let i = n.fragment.nodes[0]?.start ?? t;
		ke({
			start: n.start,
			end: i
		}, `<${r.name}>`, `</${n.name}>`), n.end = t, e.pop(), e.last_auto_closed_tag = {
			tag: n.name,
			reason: r.name,
			depth: e.stack.length
		};
	}
	let s = [], c = e.current(), l = (r.name === "script" || r.name === "style") && c.type === "Root", u = l ? Ao : jo, d;
	for (; d = u(e);) {
		if (d.type === "Attribute" || d.type === "BindDirective" || d.type === "StyleDirective" || d.type === "ClassDirective") {
			let e = d.type === "BindDirective" ? "Attribute" : d.type;
			s.includes(e + d.name) ? $r(d) : d.name !== "this" && s.push(e + d.name);
		}
		o.attributes.push(d), e.allow_whitespace();
	}
	if (o.type === "Component" && (o.metadata.expression = new J()), o.type === "SvelteComponent") {
		let e = o.attributes.findIndex((e) => e.type === "Attribute" && e.name === "this");
		e === -1 && Ai(t);
		let n = o.attributes.splice(e, 1)[0];
		ya(n) || ki(n.start), o.expression = ba(n), o.metadata.expression = new J();
	}
	if (o.type === "SvelteElement") {
		let e = o.attributes.findIndex((e) => e.type === "Attribute" && e.name === "this");
		e === -1 && ji(t);
		let n = o.attributes.splice(e, 1)[0];
		if (n.value === !0 && ji(n), ya(n)) o.tag = ba(n);
		else {
			je(n);
			let e = n.value[0];
			o.tag = e.type === "Text" ? {
				type: "Literal",
				value: e.data,
				raw: `'${e.raw}'`,
				start: e.start,
				end: e.end
			} : e.expression;
		}
		o.metadata.expression = new J();
	}
	if (l) {
		e.eat(">", !0);
		let n = null;
		for (let e = c.fragment.nodes.length - 1; e >= 0; e--) {
			let r = c.fragment.nodes[e];
			if (e === c.fragment.nodes.length - 1 && r.end !== t) break;
			if (r.type === "Comment") {
				n = r;
				break;
			} else if (r.type !== "Text" || r.data.trim()) break;
		}
		if (r.name === "script") {
			let r = Ta(e, t, o.attributes);
			n && (r.content.leadingComments = [{
				type: "Line",
				value: n.data
			}]), r.context === "module" ? (c.module && wi(t), c.module = r) : (c.instance && wi(t), c.instance = r);
		} else {
			let r = Ra(e, t, o.attributes);
			r.content.comment = n, c.css && Oi(t), c.css = r;
		}
		return;
	}
	e.append(o);
	let f = e.eat("/") || i(r.name), p = e.eat(">", !0, !1);
	if (!p) {
		let t = o.attributes.at(-1);
		if (t?.type === "Attribute" && t.name === "<") e.index = t.start, o.attributes.pop();
		else {
			let t = e.template[e.index - 1], n = e.template[e.index - 2], r = e.template[e.index];
			n === "{" && t === "/" ? e.index -= 2 : t === "{" && (r === "#" || r === "@" || r === ":") ? --e.index : e.allow_whitespace();
		}
	}
	if (f || !p) o.end = e.index;
	else if (r.name === "textarea") o.fragment.nodes = Fo(e, () => (ho.lastIndex = e.index, ho.test(e.template)), "inside <textarea>"), e.read(ho), o.end = e.index;
	else if (r.name === "script" || r.name === "style") {
		let t = e.index, n = `</${r.name}>`, i = e.template.indexOf(n, e.index), a = e.template.slice(e.index, i === -1 ? e.template.length : i);
		e.index = i === -1 ? e.template.length : i;
		let s = {
			start: t,
			end: e.index,
			type: "Text",
			data: a,
			raw: a
		};
		o.fragment.nodes.push(s), e.eat(`</${r.name}>`, !0), o.end = e.index;
	} else e.stack.push(o), e.fragments.push(o.fragment);
}
function Oo(e) {
	let t = e.length;
	for (; t--;) {
		let { type: n } = e[t];
		if (n === "SvelteHead") return !0;
		if (n === "RegularElement" || n === "Component") return !1;
	}
	return !1;
}
function ko(e) {
	let t = e.length;
	for (; t--;) if (e[t].type === "RegularElement" && e[t].attributes.some((e) => e.type === "Attribute" && e.name === "shadowrootmode")) return !0;
	return !1;
}
function Ao(e) {
	let t = e.index, n = Io(e, vo);
	if (!n.name) return null;
	let r = !0;
	if (e.eat("=")) {
		e.allow_whitespace();
		let t = e.match_regex(bo);
		t || hi(e.index), e.index += t.length;
		let n = t[0] === "\"" || t[0] === "'";
		n && (t = t.slice(1, -1)), r = [{
			start: e.index - t.length - +!!n,
			end: n ? e.index - 1 : e.index,
			type: "Text",
			raw: t,
			data: io(t, !0)
		}];
	}
	return e.match_regex(yo) && bi(e.index, "="), lo(n.name, n.loc, t, e.index, r);
}
function jo(e) {
	let t = null;
	for (; t = Mo(e);) e.root.comments.push(t), e.allow_whitespace();
	let n = e.index;
	if (e.eat("{")) {
		if (e.allow_whitespace(), e.eat("@attach")) {
			e.require_whitespace();
			let t = K(e);
			return e.allow_whitespace(), e.eat("}", !0), {
				type: "AttachTag",
				start: n,
				end: e.index,
				expression: t,
				metadata: { expression: new J() }
			};
		}
		if (e.eat("...")) {
			let t = K(e);
			return e.allow_whitespace(), e.eat("}", !0), {
				type: "SpreadAttribute",
				start: n,
				end: e.index,
				expression: t,
				metadata: { expression: new J() }
			};
		} else {
			let t = e.read_identifier();
			if (t.name === "") {
				if (e.loose && (e.match("#") || e.match("/") || e.match("@") || e.match(":"))) return null;
				e.loose && e.match("}") || ei(n);
			}
			e.allow_whitespace(), e.eat("}", !0);
			let r = {
				type: "ExpressionTag",
				start: t.start,
				end: t.end,
				expression: t,
				metadata: { expression: new J() }
			};
			return lo(t.name, t.loc, n, e.index, r);
		}
	}
	let r = Io(e, vo);
	if (!r.name) return null;
	let i = e.index;
	e.allow_whitespace();
	let a = r.name.indexOf(":"), o = a !== -1 && No(r.name.slice(0, a)), s = !0;
	if (e.eat("=")) if (e.allow_whitespace(), e.template[e.index] === "/" && e.template[e.index + 1] === ">") {
		let t = e.index;
		e.index++, s = [{
			start: t,
			end: t + 1,
			type: "Text",
			raw: "/",
			data: "/"
		}], i = e.index;
	} else s = Po(e), i = e.index;
	else e.match_regex(yo) && bi(e.index, "=");
	if (o) {
		let [e, ...t] = r.name.slice(a + 1).split("|");
		if (e === "" && di({
			start: n,
			end: n + a + 1
		}, r.name), o === "StyleDirective") return {
			start: n,
			end: i,
			type: o,
			name: e,
			name_loc: r.loc,
			modifiers: t,
			value: s,
			metadata: { expression: new J() }
		};
		let c = s === !0 ? void 0 : Array.isArray(s) ? s[0] : s, l = null;
		c && (s.length > 1 || c.type === "Text" ? ui(c.start) : l = c.expression);
		let u = {
			start: n,
			end: i,
			type: o,
			name: e,
			name_loc: r.loc,
			expression: l,
			metadata: { expression: new J() }
		};
		if (u.modifiers = t, u.type === "TransitionDirective") {
			let e = r.name.slice(0, a);
			u.intro = e === "in" || e === "transition", u.outro = e === "out" || e === "transition";
		}
		return (u.type === "BindDirective" || u.type === "ClassDirective") && !u.expression && (u.expression = {
			start: n + a + 1,
			end: i,
			type: "Identifier",
			name: u.name
		}), u;
	}
	return lo(r.name, r.loc, n, i, s);
}
function Mo(e) {
	let t = e.index;
	if (e.eat("//")) {
		let n = e.read_until(/\n/), r = e.index;
		return {
			type: "Line",
			start: t,
			end: r,
			value: n,
			loc: {
				start: x(t),
				end: x(r)
			}
		};
	}
	if (e.eat("/*")) {
		let n = e.read_until(/\*\//);
		e.eat("*/");
		let r = e.index;
		return {
			type: "Block",
			start: t,
			end: r,
			value: n,
			loc: {
				start: x(t),
				end: x(r)
			}
		};
	}
	return null;
}
function No(e) {
	return e === "use" ? "UseDirective" : e === "animate" ? "AnimateDirective" : e === "bind" ? "BindDirective" : e === "class" ? "ClassDirective" : e === "style" ? "StyleDirective" : e === "on" ? "OnDirective" : e === "let" ? "LetDirective" : e === "in" || e === "out" || e === "transition" ? "TransitionDirective" : !1;
}
function Po(e) {
	let t = e.eat("'") ? "'" : e.eat("\"") ? "\"" : null;
	if (t && e.eat(t)) return [{
		start: e.index - 1,
		end: e.index - 1,
		type: "Text",
		raw: "",
		data: ""
	}];
	let n;
	try {
		n = Fo(e, () => t ? e.match(t) : !!e.match_regex(mo), "in attribute value");
	} catch (n) {
		if (n.code === "js_parse_error") {
			let r = n.position?.[0];
			r !== void 0 && e.template.slice(r - 1, r + 1) === "/>" && (e.index = r, bi(r, t || "}"));
		}
		throw n;
	}
	return n.length === 0 && !t && hi(e.index), t && (e.index += 1), t || n.length > 1 || n[0].type === "Text" ? n : n[0];
}
function Fo(e, t, n) {
	let r = {
		start: e.index,
		end: -1,
		type: "Text",
		raw: "",
		data: ""
	}, i = [];
	function a(t) {
		t > r.start && (r.raw = e.template.slice(r.start, t), r.data = io(r.raw, !0), r.end = t, i.push(r));
	}
	for (; e.index < e.template.length;) {
		let o = e.index;
		if (t()) return a(e.index), i;
		if (e.eat("{")) {
			if (e.match("#")) {
				let t = e.index - 1;
				e.eat("#"), ii(t, e.read_until(/[^a-z]/), n);
			} else if (e.match("@")) {
				let t = e.index - 1;
				e.eat("@"), Ki(t, e.read_until(/[^a-z]/), n);
			}
			a(e.index - 1), e.allow_whitespace();
			let t = K(e);
			e.allow_whitespace(), e.eat("}", !0);
			let s = {
				type: "ExpressionTag",
				start: o,
				end: e.index,
				expression: t,
				metadata: { expression: new J() }
			};
			i.push(s), r = {
				start: e.index,
				end: -1,
				type: "Text",
				raw: "",
				data: ""
			};
		} else e.index++;
	}
	if (e.loose) return i;
	qi(e.template.length);
}
function Io(e, t) {
	let n = e.index, r = e.read_until(t), i = e.index;
	return {
		type: "Identifier",
		name: r,
		start: n,
		end: i,
		loc: {
			start: x(n),
			end: x(i)
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/read/context.js
function Lo(e) {
	let t = e.index, n = e.index, r = e.read_identifier();
	if (r.name !== "") {
		let t = Ro(e);
		return {
			...r,
			typeAnnotation: t
		};
	}
	let i = e.template[n];
	i !== "{" && i !== "[" && vi(n), n = ma(e, t), e.index = n;
	let a = e.template.slice(t, n), o = e.template.slice(0, t).replace(h, " "), s = o.indexOf(" ");
	o = o.slice(0, s) + o.slice(s + 1);
	let c = ia(ea(e, `${o}(${a} = 1)`, t - 1));
	return c = c.left, c.typeAnnotation = Ro(e), c.typeAnnotation && (c.end = c.typeAnnotation.end), c;
}
function Ro(e) {
	let t = e.index;
	if (e.allow_whitespace(), !e.eat(":")) {
		e.index = t;
		return;
	}
	let n = e.index - 5, r = e.template.slice(0, n).replace(/[^\n]/g, " ") + "_ as " + e.template.slice(e.index).replace(/\?\s*:/g, ":"), i = ia(ea(e, r, n));
	if (i.type === "AssignmentExpression") {
		let t = i.right.start;
		for (; r[t] !== "=";) --t;
		i = ia(ea(e, r.slice(0, t), n));
	}
	return i.type === "SequenceExpression" && (i = i.expressions[0]), e.index = i.end, {
		type: "TSTypeAnnotation",
		start: t,
		end: e.index,
		typeAnnotation: i.typeAnnotation
	};
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/state/tag.js
var zo = /\s*}/y, Bo = /(?:let|const)\b/y, Vo = /(?:var|interface|enum)\b/y, Ho = /type\b/y, Uo = { "<": ">" };
function Wo(e) {
	let t = e.index;
	if (e.index += 1, e.allow_whitespace(), e.eat("#")) return Ko(e);
	if (e.eat(":")) return qo(e);
	if (e.eat("@")) return Yo(e);
	if (e.match("/") && !e.match("/*") && !e.match("//")) return e.eat("/"), Jo(e);
	let n = Go(e);
	if (n) {
		e.append({
			type: "DeclarationTag",
			start: t,
			end: e.index,
			declaration: n,
			metadata: { expression: new J() }
		});
		return;
	}
	let r = K(e);
	e.allow_whitespace(), e.eat("}", !0), e.append({
		type: "ExpressionTag",
		start: t,
		end: e.index,
		expression: r,
		metadata: { expression: new J() }
	});
}
function Go(e) {
	let t = e.index, n = e.match_regex(Vo);
	if (n && li({
		start: t,
		end: t + n.length
	}), !e.match_regex(Bo) && !e.match_regex(Ho)) return null;
	let r = e.root.comments.length, i;
	try {
		i = ta(e, e.template, t);
	} catch (n) {
		if (!e.loose) throw n;
		let r = da(e.template, t, "{");
		if (r === void 0) throw n;
		e.index = r, i = {
			type: "VariableDeclaration",
			kind: e.template.startsWith("const", t) ? "const" : "let",
			declarations: [{
				type: "VariableDeclarator",
				id: {
					type: "Identifier",
					name: "",
					start: e.index,
					end: e.index
				},
				init: null,
				start: e.index,
				end: e.index
			}],
			start: t,
			end: r
		};
	}
	if (i.type !== "VariableDeclaration") {
		if (i.type === "ExpressionStatement") return e.root.comments.length = r, null;
		li({
			start: i.start ?? t,
			end: i.end ?? e.index
		});
	}
	return i.kind !== "let" && i.kind !== "const" && li(i), e.index = i.end, e.allow_whitespace(), e.eat("}", !0), i;
}
function Ko(e) {
	let t = e.index - 2;
	for (; e.template[t] !== "{";) --t;
	if (e.eat("if")) {
		e.require_whitespace();
		let n = e.append({
			type: "IfBlock",
			elseif: !1,
			start: t,
			end: -1,
			test: K(e),
			consequent: q(),
			alternate: null,
			metadata: { expression: new J() }
		});
		e.allow_whitespace(), e.eat("}", !0), e.stack.push(n), e.fragments.push(n.consequent);
		return;
	}
	if (e.eat("each")) {
		e.require_whitespace();
		let n = e.template, r = e.template.length, i;
		for (; !i;) try {
			i = K(e, void 0, !0);
		} catch (a) {
			for (r = a.position[0] - 2; r > t && e.template.slice(r, r + 2) !== "as";) --r;
			if (r <= t) {
				if (e.loose && (i = ga(e), i)) break;
				throw a;
			}
			e.template = n.slice(0, r);
		}
		if (e.template = n, e.allow_whitespace(), !e.match("as")) {
			i.type === "SequenceExpression" && (i = i.expressions[0]);
			let t = null, n = i.end;
			if (i = u(i, null, { TSAsExpression(e, r) {
				if (e.end === i.end) return t = e, n = e.expression.end, e.expression;
				r.next();
			} }), i.end = n, t) {
				let n = t.typeAnnotation.start - 2;
				for (; e.template.slice(n, n + 2) !== "as";) --n;
				e.index = n;
			}
		}
		let a = null, o, s;
		if (e.eat("as") ? (e.require_whitespace(), a = Lo(e)) : e.index = i.end, e.allow_whitespace(), e.eat(",") && (e.allow_whitespace(), o = e.read_identifier().name, o || _i(e.index), e.allow_whitespace()), e.eat("(") && (e.allow_whitespace(), s = K(e, "("), e.allow_whitespace(), e.eat(")", !0), e.allow_whitespace()), !e.eat("}", !0, !1)) if (e.template.slice(e.index - 4, e.index) === " as ") {
			let t = e.index;
			a = Lo(e), e.eat("}", !0), i = {
				type: "Identifier",
				name: "",
				start: i.start,
				end: t - 4
			};
		} else e.eat("}", !0);
		let c = e.append({
			type: "EachBlock",
			start: t,
			end: -1,
			expression: i,
			body: q(),
			context: a,
			index: o,
			key: s,
			metadata: null
		});
		e.stack.push(c), e.fragments.push(c.body);
		return;
	}
	if (e.eat("await")) {
		e.require_whitespace();
		let n = K(e);
		e.allow_whitespace();
		let r = e.append({
			type: "AwaitBlock",
			start: t,
			end: -1,
			expression: n,
			value: null,
			error: null,
			pending: null,
			then: null,
			catch: null,
			metadata: { expression: new J() }
		});
		if (e.eat("then") ? (e.match_regex(zo) ? e.allow_whitespace() : (e.require_whitespace(), r.value = Lo(e), e.allow_whitespace()), r.then = q(), e.fragments.push(r.then)) : e.eat("catch") ? (e.match_regex(zo) ? e.allow_whitespace() : (e.require_whitespace(), r.error = Lo(e), e.allow_whitespace()), r.catch = q(), e.fragments.push(r.catch)) : (r.pending = q(), e.fragments.push(r.pending)), !e.eat("}", !0, !1)) if (e.template.slice(e.index - 6, e.index) === " then ") {
			let t = e.index;
			r.value = Lo(e), e.eat("}", !0), r.expression = {
				type: "Identifier",
				name: "",
				start: n.start,
				end: t - 6
			}, r.then = r.pending, r.pending = null;
		} else if (e.template.slice(e.index - 7, e.index) === " catch ") {
			let t = e.index;
			r.error = Lo(e), e.eat("}", !0), r.expression = {
				type: "Identifier",
				name: "",
				start: n.start,
				end: t - 7
			}, r.catch = r.pending, r.pending = null;
		} else e.eat("}", !0);
		e.stack.push(r);
		return;
	}
	if (e.eat("key")) {
		e.require_whitespace();
		let n = K(e);
		e.allow_whitespace(), e.eat("}", !0);
		let r = e.append({
			type: "KeyBlock",
			start: t,
			end: -1,
			expression: n,
			fragment: q(),
			metadata: { expression: new J() }
		});
		e.stack.push(r), e.fragments.push(r.fragment);
		return;
	}
	if (e.eat("snippet")) {
		e.require_whitespace();
		let n = e.read_identifier();
		n.name === "" && !e.loose && _i(e.index), e.allow_whitespace();
		let r = e.index, i;
		if (e.ts && e.match("<")) {
			let t = e.index, n = ma(e, t, Uo);
			i = e.template.slice(t + 1, n - 1), e.index = n;
		}
		e.allow_whitespace();
		let a = e.eat("(", !0, !1);
		if (a) {
			let t = 1;
			for (; e.index < e.template.length && (!e.match(")") || t !== 1);) e.match("(") && t++, e.match(")") && t--, e.index += 1;
			e.eat(")", !0);
		}
		let o = e.template.slice(0, r).replace(/\S/g, " "), s = e.template.slice(r, e.index), c = a ? ea(e, o + `${s} => {}`, r) : { params: [] };
		e.allow_whitespace(), e.eat("}", !0);
		let l = e.append({
			type: "SnippetBlock",
			start: t,
			end: -1,
			expression: n,
			typeParams: i,
			parameters: c.params,
			body: q(),
			metadata: {
				can_hoist: !1,
				sites: /* @__PURE__ */ new Set()
			}
		});
		e.stack.push(l), e.fragments.push(l.body);
		return;
	}
	gi(e.index);
}
function qo(e) {
	let t = e.index - 1, n = e.current();
	if (n.type === "IfBlock") {
		if (e.eat("else") || bi(t, "{:else} or {:else if}"), e.eat("if") && ri(t), e.allow_whitespace(), e.fragments.pop(), n.alternate = q(), e.fragments.push(n.alternate), e.eat("if")) {
			e.require_whitespace();
			let n = K(e);
			e.allow_whitespace(), e.eat("}", !0);
			let r = t - 1;
			for (; e.template[r] !== "{";) --r;
			let i = e.append({
				start: r,
				end: -1,
				type: "IfBlock",
				elseif: !0,
				test: n,
				consequent: q(),
				alternate: null,
				metadata: { expression: new J() }
			});
			e.stack.push(i), e.fragments.pop(), e.fragments.push(i.consequent);
		} else e.allow_whitespace(), e.eat("}", !0);
		return;
	}
	if (n.type === "EachBlock") {
		e.eat("else") || bi(t, "{:else}"), e.allow_whitespace(), e.eat("}", !0), n.fallback = q(), e.fragments.pop(), e.fragments.push(n.fallback);
		return;
	}
	if (n.type === "AwaitBlock") {
		if (e.eat("then")) {
			n.then && ti(t, "{:then}"), e.eat("}") || (e.require_whitespace(), n.value = Lo(e), e.allow_whitespace(), e.eat("}", !0)), n.then = q(), e.fragments.pop(), e.fragments.push(n.then);
			return;
		}
		if (e.eat("catch")) {
			n.catch && ti(t, "{:catch}"), e.eat("}") || (e.require_whitespace(), n.error = Lo(e), e.allow_whitespace(), e.eat("}", !0)), n.catch = q(), e.fragments.pop(), e.fragments.push(n.catch);
			return;
		}
		bi(t, "{:then ...} or {:catch ...}");
	}
	ni(t);
}
function Jo(e) {
	let t = e.index - 1, n = e.current(), r;
	switch (n.type) {
		case "IfBlock":
			if (r = e.eat("if", !0, !1), !r) {
				n.end = t - 1, e.pop(), Jo(e);
				return;
			}
			for (e.allow_whitespace(), e.eat("}", !0); n.elseif;) n.end = e.index, e.stack.pop(), n = e.current();
			n.end = e.index, e.pop();
			return;
		case "EachBlock":
			r = e.eat("each", !0, !1);
			break;
		case "KeyBlock":
			r = e.eat("key", !0, !1);
			break;
		case "AwaitBlock":
			r = e.eat("await", !0, !1);
			break;
		case "SnippetBlock":
			r = e.eat("snippet", !0, !1);
			break;
		case "RegularElement":
			e.loose ? r = !1 : oi(t);
			break;
		default: oi(t);
	}
	if (!r) {
		n.end = t - 1, e.pop(), Jo(e);
		return;
	}
	e.allow_whitespace(), e.eat("}", !0), n.end = e.index, e.pop();
}
function Yo(e) {
	let t = e.index;
	for (; e.template[t] !== "{";) --t;
	if (e.eat("html")) {
		e.require_whitespace();
		let n = K(e);
		e.allow_whitespace(), e.eat("}", !0), e.append({
			type: "HtmlTag",
			start: t,
			end: e.index,
			expression: n,
			metadata: { expression: new J() }
		});
		return;
	}
	if (e.eat("debug")) {
		let n;
		if (e.read(zo)) n = [];
		else {
			let t = K(e);
			n = t.type === "SequenceExpression" ? t.expressions : [t], n.forEach((e) => {
				e.type !== "Identifier" && ci(e.start);
			}), e.allow_whitespace(), e.eat("}", !0);
		}
		e.append({
			type: "DebugTag",
			start: t,
			end: e.index,
			identifiers: n
		});
		return;
	}
	if (e.eat("const")) {
		e.require_whitespace();
		let n = Lo(e);
		e.allow_whitespace(), e.eat("=", !0), e.allow_whitespace();
		let r = e.index, i = K(e);
		i.type === "SequenceExpression" && !e.template.substring(r, i.start).includes("(") && si(i), e.allow_whitespace(), e.eat("}", !0), e.append({
			type: "ConstTag",
			start: t,
			end: e.index,
			declaration: {
				type: "VariableDeclaration",
				kind: "const",
				declarations: [{
					type: "VariableDeclarator",
					id: n,
					init: i,
					start: n.start,
					end: i.end
				}],
				start: t + 2,
				end: e.index - 1
			},
			metadata: { expression: new J() }
		});
		return;
	}
	if (e.eat("render")) {
		e.require_whitespace();
		let n = K(e);
		n.type !== "CallExpression" && (n.type !== "ChainExpression" || n.expression.type !== "CallExpression") && Ci(n), e.allow_whitespace(), e.eat("}", !0), e.append({
			type: "RenderTag",
			start: t,
			end: e.index,
			expression: n,
			metadata: {
				expression: new J(),
				dynamic: !1,
				arguments: [],
				path: [],
				snippets: /* @__PURE__ */ new Set()
			}
		});
		return;
	}
	yi(e.index);
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/state/text.js
function Xo(e) {
	let t = e.index;
	for (; e.index < e.template.length && !e.match("<") && !e.match("{");) e.index++;
	let n = e.template.slice(t, e.index);
	e.append({
		type: "Text",
		start: t,
		end: e.index,
		raw: n,
		data: io(n, !1)
	});
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/state/fragment.js
function Zo(e) {
	return e.match("<") ? Do : e.match("{") ? Wo : Xo;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/read/options.js
function Qo(e) {
	let t = {
		start: e.start,
		end: e.end,
		attributes: e.attributes
	};
	if (!e) return t;
	for (let n of e.attributes) {
		n.type !== "Attribute" && Li(n);
		let { name: e } = n;
		switch (e) {
			case "runes":
				t.runes = es(n);
				break;
			case "tag":
				Ii(n);
				break;
			case "customElement": {
				let e = {}, { value: r } = n, i = r === !0 || Array.isArray(r) ? r : [r];
				if (i === !0) zi(n);
				else if (i[0].type === "Text") {
					let r = $o(n);
					is(n, r), e.tag = r, t.customElement = e;
					break;
				} else if (i[0].expression.type !== "ObjectExpression") {
					if (i[0].expression.type === "Literal" && i[0].expression.value === null) break;
					zi(n);
				}
				let a = [];
				for (let e of i[0].expression.properties) (e.type !== "Property" || e.computed || e.key.type !== "Identifier") && zi(n), a.push([e.key.name, e.value]);
				let o = a.find(([e]) => e === "tag");
				if (o) {
					let t = o[1]?.value;
					is(o, t), e.tag = t;
				}
				let s = a.find(([e]) => e === "props")?.[1];
				if (s) {
					s.type !== "ObjectExpression" && Bi(n), e.props = {};
					for (let t of s.properties) {
						(t.type !== "Property" || t.computed || t.key.type !== "Identifier" || t.value.type !== "ObjectExpression") && Bi(n), e.props[t.key.name] = {};
						for (let r of t.value.properties) (r.type !== "Property" || r.computed || r.key.type !== "Identifier" || r.value.type !== "Literal") && Bi(n), r.key.name === "type" ? ([
							"String",
							"Number",
							"Boolean",
							"Array",
							"Object"
						].indexOf(r.value.value) === -1 && Bi(n), e.props[t.key.name].type = r.value.value) : r.key.name === "reflect" ? (typeof r.value.value != "boolean" && Bi(n), e.props[t.key.name].reflect = r.value.value) : r.key.name === "attribute" ? (typeof r.value.value != "string" && Bi(n), e.props[t.key.name].attribute = r.value.value) : Bi(n);
					}
				}
				let c = a.find(([e]) => e === "shadow")?.[1];
				c && (c.type === "Literal" && (c.value === "open" || c.value === "none") ? e.shadow = c.value : c.type === "ObjectExpression" ? e.shadow = c : Vi(n));
				let l = a.find(([e]) => e === "extend")?.[1];
				l && (e.extend = l), t.customElement = e;
				break;
			}
			case "namespace": {
				let e = $o(n);
				e === "http://www.w3.org/2000/svg" ? t.namespace = "svg" : e === "http://www.w3.org/1998/Math/MathML" ? t.namespace = "mathml" : e === "html" || e === "mathml" || e === "svg" ? t.namespace = e : Ri(n, "\"html\", \"mathml\" or \"svg\"");
				break;
			}
			case "css": {
				let e = $o(n);
				e === "injected" ? t.css = e : Ri(n, "\"injected\"");
				break;
			}
			case "immutable":
				t.immutable = es(n);
				break;
			case "preserveWhitespace":
				t.preserveWhitespace = es(n);
				break;
			case "accessors":
				t.accessors = es(n);
				break;
			default: Wi(n, e);
		}
	}
	return t;
}
function $o(e) {
	let { value: t } = e;
	if (t === !0) return !0;
	let n = Array.isArray(t) ? t[0] : t;
	return n ? t.length > 1 ? null : n.type === "Text" ? n.data : n.expression.type === "Literal" ? n.expression.value : null : !0;
}
function es(e) {
	let t = $o(e);
	return typeof t != "boolean" && Ri(e, "true or false"), t;
}
var ts = "[a-z0-9_.·À-ÖØ-öø-ͽͿ-῿‌-‍‿-⁀⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�𐀀-󯿿-]", ns = RegExp(`^[a-z]${ts}*-${ts}*$`, "u"), rs = [
	"annotation-xml",
	"color-profile",
	"font-face",
	"font-face-src",
	"font-face-uri",
	"font-face-format",
	"font-face-name",
	"missing-glyph"
];
function is(e, t) {
	typeof t != "string" && Hi(e), t && (ns.test(t) ? rs.includes(t) && Ui(e) : Hi(e));
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/2-analyze/visitors/shared/special-element.js
function as(e) {
	let { nodes: t } = e.fragment;
	if (t.length > 0) {
		let n = t[0], r = t[t.length - 1];
		Ni({
			start: n.start,
			end: r.end
		}, e.name);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/phases/1-parse/index.js
function os(e) {
	return e === 32 || e <= 13 && e >= 9 ? !0 : e < 160 ? !1 : e === 160 || e === 5760 || e >= 8192 && e <= 8202 || e === 8232 || e === 8233 || e === 8239 || e === 8287 || e === 12288 || e === 65279;
}
var ss = /<!--[^]*?-->|<script\s+(?:[^>]*|(?:[^=>'"/]+=(?:"[^"]*"|'[^']*'|[^>\s]+)\s+)*)lang=(["'])?([^"' >]+)\1[^>]*>/g, cs = class e {
	template;
	loose;
	index = 0;
	static forCss(t) {
		let n = Object.create(e.prototype);
		return n.template = t, n.index = 0, n.loose = !1, n;
	}
	ts = !1;
	stack = [];
	fragments = [];
	root;
	meta_tags = {};
	last_auto_closed_tag;
	constructor(e, t) {
		if (typeof e != "string") throw TypeError("Template must be a string");
		this.loose = t, this.template = e.trimEnd();
		let n;
		do
			n = ss.exec(e);
		while (n && n[0][1] !== "s");
		ss.lastIndex = 0, this.ts = n?.[2] === "ts", this.root = {
			css: null,
			js: [],
			start: null,
			end: null,
			type: "Root",
			fragment: q(),
			options: null,
			comments: [],
			metadata: { ts: this.ts }
		}, this.stack.push(this.root), this.fragments.push(this.root.fragment);
		let r = Zo;
		for (; this.index < this.template.length;) r = r(this) || Zo;
		if (this.stack.length > 1) {
			let e = this.current();
			this.loose ? e.end = this.template.length : e.type === "RegularElement" ? (e.end = e.start + 1, mi(e, e.name)) : (e.end = e.start + 1, ai(e));
		}
		r !== Zo && qi(this.index), this.root.start = 0, this.root.end = e.length;
		let i = this.root.fragment.nodes.findIndex((e) => e.type === "SvelteOptions");
		if (i !== -1) {
			let e = this.root.fragment.nodes[i];
			this.root.fragment.nodes.splice(i, 1), this.root.options = Qo(e), as(e), Object.defineProperty(this.root.options, "__raw__", {
				value: e,
				enumerable: !1
			});
		}
	}
	current() {
		return this.stack[this.stack.length - 1];
	}
	eat(e, t = !1, n = !0) {
		return this.match(e) ? (this.index += e.length, !0) : (t && (!this.loose || n) && bi(this.index, e), !1);
	}
	match(e) {
		return e.length === 1 ? this.template[this.index] === e : this.template.startsWith(e, this.index);
	}
	match_regex(e) {
		e.lastIndex = this.index;
		let t = e.exec(this.template);
		return !t || t.index !== this.index ? null : t[0];
	}
	allow_whitespace() {
		for (; this.index < this.template.length && os(this.template.charCodeAt(this.index));) this.index++;
	}
	read(e) {
		let t = this.match_regex(e);
		return t && (this.index += t.length), t;
	}
	read_identifier() {
		let e = this.index, t = e, r = "", i = this.template.codePointAt(this.index);
		if (w(i, !0)) {
			for (this.index, t += i <= 65535 ? 1 : 2; t < this.template.length;) {
				let e = this.template.codePointAt(t);
				if (!Xe(e, !0)) break;
				t += e <= 65535 ? 1 : 2;
			}
			r = this.template.slice(e, t), this.index = t, n(r) && Ji(e, r);
		}
		return {
			type: "Identifier",
			name: r,
			start: e,
			end: t,
			loc: {
				start: x(e),
				end: x(t)
			}
		};
	}
	read_until(e) {
		if (this.index >= this.template.length) {
			if (this.loose) return "";
			qi(this.template.length);
		}
		let t = this.index, n = e.exec(this.template.slice(t));
		return n ? (this.index = t + n.index, this.template.slice(t, this.index)) : (this.index = this.template.length, this.template.slice(t));
	}
	require_whitespace() {
		os(this.template.charCodeAt(this.index)) || xi(this.index), this.allow_whitespace();
	}
	pop() {
		let e = this.fragments.pop();
		return e?.metadata.transparent && e.nodes.some((e) => e.type === "DeclarationTag") && (e.metadata.transparent = !1), this.stack.pop();
	}
	append(e) {
		return this.fragments.at(-1)?.nodes.push(e), e;
	}
};
function ls(e, t = !1) {
	return de(e), new cs(e, t).root;
}
Math.f16round, Number.isInteger, Number.isFinite, Number.isNaN, Number.isSafeInteger, Number.parseFloat, Number.parseInt, String.fromCharCode, String.fromCodePoint;
//#endregion
//#region ../../node_modules/.pnpm/aria-query@5.3.1/node_modules/aria-query/lib/util/iteratorProxy.js
var us = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	function t() {
		var e = this, t = 0, n = {
			"@@iterator": function() {
				return n;
			},
			next: function() {
				if (t < e.length) {
					var n = e[t];
					return t += 1, {
						done: !1,
						value: n
					};
				} else return { done: !0 };
			}
		};
		return n;
	}
	e.default = t;
})), ds = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = i;
	var t = n(us());
	function n(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function r(e) {
		"@babel/helpers - typeof";
		return r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, r(e);
	}
	function i(e, n) {
		return typeof Symbol == "function" && r(Symbol.iterator) === "symbol" && Object.defineProperty(e, Symbol.iterator, { value: t.default.bind(n) }), e;
	}
})), fs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var t = n(ds());
	function n(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function r(e, t) {
		return c(e) || s(e, t) || a(e, t) || i();
	}
	function i() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function a(e, t) {
		if (e) {
			if (typeof e == "string") return o(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0;
		}
	}
	function o(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function s(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r, i, a, o, s = [], c = !0, l = !1;
			try {
				if (a = (n = n.call(e)).next, t === 0) {
					if (Object(n) !== n) return;
					c = !1;
				} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
			} catch (e) {
				l = !0, i = e;
			} finally {
				try {
					if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
				} finally {
					if (l) throw i;
				}
			}
			return s;
		}
	}
	function c(e) {
		if (Array.isArray(e)) return e;
	}
	var l = [
		["aria-activedescendant", { type: "id" }],
		["aria-atomic", { type: "boolean" }],
		["aria-autocomplete", {
			type: "token",
			values: [
				"inline",
				"list",
				"both",
				"none"
			]
		}],
		["aria-braillelabel", { type: "string" }],
		["aria-brailleroledescription", { type: "string" }],
		["aria-busy", { type: "boolean" }],
		["aria-checked", { type: "tristate" }],
		["aria-colcount", { type: "integer" }],
		["aria-colindex", { type: "integer" }],
		["aria-colspan", { type: "integer" }],
		["aria-controls", { type: "idlist" }],
		["aria-current", {
			type: "token",
			values: [
				"page",
				"step",
				"location",
				"date",
				"time",
				!0,
				!1
			]
		}],
		["aria-describedby", { type: "idlist" }],
		["aria-description", { type: "string" }],
		["aria-details", { type: "id" }],
		["aria-disabled", { type: "boolean" }],
		["aria-dropeffect", {
			type: "tokenlist",
			values: [
				"copy",
				"execute",
				"link",
				"move",
				"none",
				"popup"
			]
		}],
		["aria-errormessage", { type: "id" }],
		["aria-expanded", {
			type: "boolean",
			allowundefined: !0
		}],
		["aria-flowto", { type: "idlist" }],
		["aria-grabbed", {
			type: "boolean",
			allowundefined: !0
		}],
		["aria-haspopup", {
			type: "token",
			values: [
				!1,
				!0,
				"menu",
				"listbox",
				"tree",
				"grid",
				"dialog"
			]
		}],
		["aria-hidden", {
			type: "boolean",
			allowundefined: !0
		}],
		["aria-invalid", {
			type: "token",
			values: [
				"grammar",
				!1,
				"spelling",
				!0
			]
		}],
		["aria-keyshortcuts", { type: "string" }],
		["aria-label", { type: "string" }],
		["aria-labelledby", { type: "idlist" }],
		["aria-level", { type: "integer" }],
		["aria-live", {
			type: "token",
			values: [
				"assertive",
				"off",
				"polite"
			]
		}],
		["aria-modal", { type: "boolean" }],
		["aria-multiline", { type: "boolean" }],
		["aria-multiselectable", { type: "boolean" }],
		["aria-orientation", {
			type: "token",
			values: [
				"vertical",
				"undefined",
				"horizontal"
			]
		}],
		["aria-owns", { type: "idlist" }],
		["aria-placeholder", { type: "string" }],
		["aria-posinset", { type: "integer" }],
		["aria-pressed", { type: "tristate" }],
		["aria-readonly", { type: "boolean" }],
		["aria-relevant", {
			type: "tokenlist",
			values: [
				"additions",
				"all",
				"removals",
				"text"
			]
		}],
		["aria-required", { type: "boolean" }],
		["aria-roledescription", { type: "string" }],
		["aria-rowcount", { type: "integer" }],
		["aria-rowindex", { type: "integer" }],
		["aria-rowspan", { type: "integer" }],
		["aria-selected", {
			type: "boolean",
			allowundefined: !0
		}],
		["aria-setsize", { type: "integer" }],
		["aria-sort", {
			type: "token",
			values: [
				"ascending",
				"descending",
				"none",
				"other"
			]
		}],
		["aria-valuemax", { type: "number" }],
		["aria-valuemin", { type: "number" }],
		["aria-valuenow", { type: "number" }],
		["aria-valuetext", { type: "string" }]
	], u = {
		entries: function() {
			return l;
		},
		forEach: function(e) {
			for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n = 0, i = l; n < i.length; n++) {
				var a = r(i[n], 2), o = a[0], s = a[1];
				e.call(t, s, o, l);
			}
		},
		get: function(e) {
			var t = l.find(function(t) {
				return t[0] === e;
			});
			return t && t[1];
		},
		has: function(e) {
			return !!u.get(e);
		},
		keys: function() {
			return l.map(function(e) {
				return r(e, 1)[0];
			});
		},
		values: function() {
			return l.map(function(e) {
				return r(e, 2)[1];
			});
		}
	};
	e.default = (0, t.default)(u, u.entries());
})), ps = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var t = n(ds());
	function n(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function r(e, t) {
		return c(e) || s(e, t) || a(e, t) || i();
	}
	function i() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function a(e, t) {
		if (e) {
			if (typeof e == "string") return o(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0;
		}
	}
	function o(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function s(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r, i, a, o, s = [], c = !0, l = !1;
			try {
				if (a = (n = n.call(e)).next, t === 0) {
					if (Object(n) !== n) return;
					c = !1;
				} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
			} catch (e) {
				l = !0, i = e;
			} finally {
				try {
					if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
				} finally {
					if (l) throw i;
				}
			}
			return s;
		}
	}
	function c(e) {
		if (Array.isArray(e)) return e;
	}
	var l = [
		["a", { reserved: !1 }],
		["abbr", { reserved: !1 }],
		["acronym", { reserved: !1 }],
		["address", { reserved: !1 }],
		["applet", { reserved: !1 }],
		["area", { reserved: !1 }],
		["article", { reserved: !1 }],
		["aside", { reserved: !1 }],
		["audio", { reserved: !1 }],
		["b", { reserved: !1 }],
		["base", { reserved: !0 }],
		["bdi", { reserved: !1 }],
		["bdo", { reserved: !1 }],
		["big", { reserved: !1 }],
		["blink", { reserved: !1 }],
		["blockquote", { reserved: !1 }],
		["body", { reserved: !1 }],
		["br", { reserved: !1 }],
		["button", { reserved: !1 }],
		["canvas", { reserved: !1 }],
		["caption", { reserved: !1 }],
		["center", { reserved: !1 }],
		["cite", { reserved: !1 }],
		["code", { reserved: !1 }],
		["col", { reserved: !0 }],
		["colgroup", { reserved: !0 }],
		["content", { reserved: !1 }],
		["data", { reserved: !1 }],
		["datalist", { reserved: !1 }],
		["dd", { reserved: !1 }],
		["del", { reserved: !1 }],
		["details", { reserved: !1 }],
		["dfn", { reserved: !1 }],
		["dialog", { reserved: !1 }],
		["dir", { reserved: !1 }],
		["div", { reserved: !1 }],
		["dl", { reserved: !1 }],
		["dt", { reserved: !1 }],
		["em", { reserved: !1 }],
		["embed", { reserved: !1 }],
		["fieldset", { reserved: !1 }],
		["figcaption", { reserved: !1 }],
		["figure", { reserved: !1 }],
		["font", { reserved: !1 }],
		["footer", { reserved: !1 }],
		["form", { reserved: !1 }],
		["frame", { reserved: !1 }],
		["frameset", { reserved: !1 }],
		["h1", { reserved: !1 }],
		["h2", { reserved: !1 }],
		["h3", { reserved: !1 }],
		["h4", { reserved: !1 }],
		["h5", { reserved: !1 }],
		["h6", { reserved: !1 }],
		["head", { reserved: !0 }],
		["header", { reserved: !1 }],
		["hgroup", { reserved: !1 }],
		["hr", { reserved: !1 }],
		["html", { reserved: !0 }],
		["i", { reserved: !1 }],
		["iframe", { reserved: !1 }],
		["img", { reserved: !1 }],
		["input", { reserved: !1 }],
		["ins", { reserved: !1 }],
		["kbd", { reserved: !1 }],
		["keygen", { reserved: !1 }],
		["label", { reserved: !1 }],
		["legend", { reserved: !1 }],
		["li", { reserved: !1 }],
		["link", { reserved: !0 }],
		["main", { reserved: !1 }],
		["map", { reserved: !1 }],
		["mark", { reserved: !1 }],
		["marquee", { reserved: !1 }],
		["menu", { reserved: !1 }],
		["menuitem", { reserved: !1 }],
		["meta", { reserved: !0 }],
		["meter", { reserved: !1 }],
		["nav", { reserved: !1 }],
		["noembed", { reserved: !0 }],
		["noscript", { reserved: !0 }],
		["object", { reserved: !1 }],
		["ol", { reserved: !1 }],
		["optgroup", { reserved: !1 }],
		["option", { reserved: !1 }],
		["output", { reserved: !1 }],
		["p", { reserved: !1 }],
		["param", { reserved: !0 }],
		["picture", { reserved: !0 }],
		["pre", { reserved: !1 }],
		["progress", { reserved: !1 }],
		["q", { reserved: !1 }],
		["rp", { reserved: !1 }],
		["rt", { reserved: !1 }],
		["rtc", { reserved: !1 }],
		["ruby", { reserved: !1 }],
		["s", { reserved: !1 }],
		["samp", { reserved: !1 }],
		["script", { reserved: !0 }],
		["section", { reserved: !1 }],
		["select", { reserved: !1 }],
		["small", { reserved: !1 }],
		["source", { reserved: !0 }],
		["spacer", { reserved: !1 }],
		["span", { reserved: !1 }],
		["strike", { reserved: !1 }],
		["strong", { reserved: !1 }],
		["style", { reserved: !0 }],
		["sub", { reserved: !1 }],
		["summary", { reserved: !1 }],
		["sup", { reserved: !1 }],
		["table", { reserved: !1 }],
		["tbody", { reserved: !1 }],
		["td", { reserved: !1 }],
		["textarea", { reserved: !1 }],
		["tfoot", { reserved: !1 }],
		["th", { reserved: !1 }],
		["thead", { reserved: !1 }],
		["time", { reserved: !1 }],
		["title", { reserved: !0 }],
		["tr", { reserved: !1 }],
		["track", { reserved: !0 }],
		["tt", { reserved: !1 }],
		["u", { reserved: !1 }],
		["ul", { reserved: !1 }],
		["var", { reserved: !1 }],
		["video", { reserved: !1 }],
		["wbr", { reserved: !1 }],
		["xmp", { reserved: !1 }]
	], u = {
		entries: function() {
			return l;
		},
		forEach: function(e) {
			for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n = 0, i = l; n < i.length; n++) {
				var a = r(i[n], 2), o = a[0], s = a[1];
				e.call(t, s, o, l);
			}
		},
		get: function(e) {
			var t = l.find(function(t) {
				return t[0] === e;
			});
			return t && t[1];
		},
		has: function(e) {
			return !!u.get(e);
		},
		keys: function() {
			return l.map(function(e) {
				return r(e, 1)[0];
			});
		},
		values: function() {
			return l.map(function(e) {
				return r(e, 2)[1];
			});
		}
	};
	e.default = (0, t.default)(u, u.entries());
})), ms = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !0,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype", "widget"]]
	};
})), hs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !0,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-activedescendant": null,
			"aria-disabled": null
		},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype", "widget"]]
	};
})), gs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !0,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: { "aria-disabled": null },
		relatedConcepts: [{
			concept: { name: "input" },
			module: "XForms"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype", "widget"]]
	};
})), _s = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !0,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), vs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !0,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-valuemax": null,
			"aria-valuemin": null,
			"aria-valuenow": null
		},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype", "structure"]]
	};
})), ys = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !0,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: [],
		prohibitedProps: [],
		props: {
			"aria-atomic": null,
			"aria-busy": null,
			"aria-controls": null,
			"aria-current": null,
			"aria-describedby": null,
			"aria-details": null,
			"aria-dropeffect": null,
			"aria-flowto": null,
			"aria-grabbed": null,
			"aria-hidden": null,
			"aria-keyshortcuts": null,
			"aria-label": null,
			"aria-labelledby": null,
			"aria-live": null,
			"aria-owns": null,
			"aria-relevant": null,
			"aria-roledescription": null
		},
		relatedConcepts: [{
			concept: { name: "role" },
			module: "XHTML"
		}, {
			concept: { name: "type" },
			module: "Dublin Core"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: []
	};
})), bs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !0,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: [],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [
			{
				concept: { name: "frontmatter" },
				module: "DTB"
			},
			{
				concept: { name: "level" },
				module: "DTB"
			},
			{
				concept: { name: "level" },
				module: "SMIL"
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype", "structure"]]
	};
})), xs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !0,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype", "structure"]]
	};
})), Ss = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !0,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: { "aria-orientation": null },
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"composite"
		], [
			"roletype",
			"structure",
			"section",
			"group"
		]]
	};
})), Cs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !0,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: [],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype"]]
	};
})), ws = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !0,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: [],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype"]]
	};
})), Ts = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !0,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: { "aria-modal": null },
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype"]]
	};
})), Es = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var t = p(ms()), n = p(hs()), r = p(gs()), i = p(_s()), a = p(vs()), o = p(ys()), s = p(bs()), c = p(xs()), l = p(Ss()), u = p(Cs()), d = p(ws()), f = p(Ts());
	function p(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.default = [
		["command", t.default],
		["composite", n.default],
		["input", r.default],
		["landmark", i.default],
		["range", a.default],
		["roletype", o.default],
		["section", s.default],
		["sectionhead", c.default],
		["select", l.default],
		["structure", u.default],
		["widget", d.default],
		["window", f.default]
	];
})), Ds = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-atomic": "true",
			"aria-live": "assertive"
		},
		relatedConcepts: [{
			concept: { name: "alert" },
			module: "XForms"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Os = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: { name: "alert" },
			module: "XForms"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"alert"
		], [
			"roletype",
			"window",
			"dialog"
		]]
	};
})), ks = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-activedescendant": null,
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{ concept: { name: "Device Independence Delivery Unit" } }],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype", "structure"]]
	};
})), As = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-posinset": null,
			"aria-setsize": null
		},
		relatedConcepts: [{
			concept: { name: "article" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"document"
		]]
	};
})), js = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: {
				constraints: ["scoped to the body element"],
				name: "header"
			},
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), Ms = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: { name: "blockquote" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Ns = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-pressed": null
		},
		relatedConcepts: [
			{
				concept: {
					attributes: [{
						name: "type",
						value: "button"
					}],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						name: "type",
						value: "image"
					}],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						name: "type",
						value: "reset"
					}],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						name: "type",
						value: "submit"
					}],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: { name: "button" },
				module: "HTML"
			},
			{
				concept: { name: "trigger" },
				module: "XForms"
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"command"
		]]
	};
})), Ps = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["prohibited"],
		prohibitedProps: ["aria-label", "aria-labelledby"],
		props: {},
		relatedConcepts: [{
			concept: { name: "caption" },
			module: "HTML"
		}],
		requireContextRole: [
			"figure",
			"grid",
			"table"
		],
		requiredContextRole: [
			"figure",
			"grid",
			"table"
		],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Fs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-colindex": null,
			"aria-colspan": null,
			"aria-rowindex": null,
			"aria-rowspan": null
		},
		relatedConcepts: [{
			concept: {
				constraints: ["ancestor table element has table role"],
				name: "td"
			},
			module: "HTML"
		}],
		requireContextRole: ["row"],
		requiredContextRole: ["row"],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Is = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-checked": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-invalid": null,
			"aria-readonly": null,
			"aria-required": null
		},
		relatedConcepts: [{
			concept: {
				attributes: [{
					name: "type",
					value: "checkbox"
				}],
				name: "input"
			},
			module: "HTML"
		}, {
			concept: { name: "option" },
			module: "ARIA"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: { "aria-checked": null },
		superClass: [[
			"roletype",
			"widget",
			"input"
		]]
	};
})), Ls = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["prohibited"],
		prohibitedProps: ["aria-label", "aria-labelledby"],
		props: {},
		relatedConcepts: [{
			concept: { name: "code" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Rs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: { "aria-sort": null },
		relatedConcepts: [
			{
				concept: { name: "th" },
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						name: "scope",
						value: "col"
					}],
					name: "th"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						name: "scope",
						value: "colgroup"
					}],
					name: "th"
				},
				module: "HTML"
			}
		],
		requireContextRole: ["row"],
		requiredContextRole: ["row"],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [
			[
				"roletype",
				"structure",
				"section",
				"cell"
			],
			[
				"roletype",
				"structure",
				"section",
				"cell",
				"gridcell"
			],
			[
				"roletype",
				"widget",
				"gridcell"
			],
			[
				"roletype",
				"structure",
				"sectionhead"
			]
		]
	};
})), zs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-activedescendant": null,
			"aria-autocomplete": null,
			"aria-errormessage": null,
			"aria-invalid": null,
			"aria-readonly": null,
			"aria-required": null,
			"aria-expanded": "false",
			"aria-haspopup": "listbox"
		},
		relatedConcepts: [
			{
				concept: {
					attributes: [{
						constraints: ["set"],
						name: "list"
					}, {
						name: "type",
						value: "email"
					}],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["set"],
						name: "list"
					}, {
						name: "type",
						value: "search"
					}],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["set"],
						name: "list"
					}, {
						name: "type",
						value: "tel"
					}],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["set"],
						name: "list"
					}, {
						name: "type",
						value: "text"
					}],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["set"],
						name: "list"
					}, {
						name: "type",
						value: "url"
					}],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["set"],
						name: "list"
					}, {
						name: "type",
						value: "url"
					}],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["undefined"],
						name: "multiple"
					}, {
						constraints: ["undefined"],
						name: "size"
					}],
					constraints: ["the multiple attribute is not set and the size attribute does not have a value greater than 1"],
					name: "select"
				},
				module: "HTML"
			},
			{
				concept: { name: "select" },
				module: "XForms"
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {
			"aria-controls": null,
			"aria-expanded": "false"
		},
		superClass: [[
			"roletype",
			"widget",
			"input"
		]]
	};
})), Bs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [
			{
				concept: {
					constraints: ["scoped to the body element", "scoped to the main element"],
					name: "aside"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["set"],
						name: "aria-label"
					}],
					constraints: ["scoped to a sectioning content element", "scoped to a sectioning root element other than body"],
					name: "aside"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["set"],
						name: "aria-labelledby"
					}],
					constraints: ["scoped to a sectioning content element", "scoped to a sectioning root element other than body"],
					name: "aside"
				},
				module: "HTML"
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), Vs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: {
				constraints: ["scoped to the body element"],
				name: "footer"
			},
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), Hs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: { name: "dd" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Us = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["prohibited"],
		prohibitedProps: ["aria-label", "aria-labelledby"],
		props: {},
		relatedConcepts: [{
			concept: { name: "del" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Ws = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: { name: "dialog" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype", "window"]]
	};
})), Gs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{ module: "DAISY Guide" }],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"list"
		]]
	};
})), Ks = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{ concept: { name: "Device Independence Delivery Unit" } }, {
			concept: { name: "html" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype", "structure"]]
	};
})), qs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["prohibited"],
		prohibitedProps: ["aria-label", "aria-labelledby"],
		props: {},
		relatedConcepts: [{
			concept: { name: "em" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Js = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [["article"]],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"list"
		]]
	};
})), Ys = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: { name: "figure" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Xs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [
			{
				concept: {
					attributes: [{
						constraints: ["set"],
						name: "aria-label"
					}],
					name: "form"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["set"],
						name: "aria-labelledby"
					}],
					name: "form"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["set"],
						name: "name"
					}],
					name: "form"
				},
				module: "HTML"
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), Zs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["prohibited"],
		prohibitedProps: ["aria-label", "aria-labelledby"],
		props: {},
		relatedConcepts: [
			{
				concept: { name: "a" },
				module: "HTML"
			},
			{
				concept: { name: "area" },
				module: "HTML"
			},
			{
				concept: { name: "aside" },
				module: "HTML"
			},
			{
				concept: { name: "b" },
				module: "HTML"
			},
			{
				concept: { name: "bdo" },
				module: "HTML"
			},
			{
				concept: { name: "body" },
				module: "HTML"
			},
			{
				concept: { name: "data" },
				module: "HTML"
			},
			{
				concept: { name: "div" },
				module: "HTML"
			},
			{
				concept: {
					constraints: [
						"scoped to the main element",
						"scoped to a sectioning content element",
						"scoped to a sectioning root element other than body"
					],
					name: "footer"
				},
				module: "HTML"
			},
			{
				concept: {
					constraints: [
						"scoped to the main element",
						"scoped to a sectioning content element",
						"scoped to a sectioning root element other than body"
					],
					name: "header"
				},
				module: "HTML"
			},
			{
				concept: { name: "hgroup" },
				module: "HTML"
			},
			{
				concept: { name: "i" },
				module: "HTML"
			},
			{
				concept: { name: "pre" },
				module: "HTML"
			},
			{
				concept: { name: "q" },
				module: "HTML"
			},
			{
				concept: { name: "samp" },
				module: "HTML"
			},
			{
				concept: { name: "section" },
				module: "HTML"
			},
			{
				concept: { name: "small" },
				module: "HTML"
			},
			{
				concept: { name: "span" },
				module: "HTML"
			},
			{
				concept: { name: "u" },
				module: "HTML"
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype", "structure"]]
	};
})), Qs = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-multiselectable": null,
			"aria-readonly": null
		},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [["row"], ["row", "rowgroup"]],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"composite"
		], [
			"roletype",
			"structure",
			"section",
			"table"
		]]
	};
})), $s = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null,
			"aria-readonly": null,
			"aria-required": null,
			"aria-selected": null
		},
		relatedConcepts: [{
			concept: {
				constraints: ["ancestor table element has grid role", "ancestor table element has treegrid role"],
				name: "td"
			},
			module: "HTML"
		}],
		requireContextRole: ["row"],
		requiredContextRole: ["row"],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"cell"
		], ["roletype", "widget"]]
	};
})), ec = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-activedescendant": null,
			"aria-disabled": null
		},
		relatedConcepts: [
			{
				concept: { name: "details" },
				module: "HTML"
			},
			{
				concept: { name: "fieldset" },
				module: "HTML"
			},
			{
				concept: { name: "optgroup" },
				module: "HTML"
			},
			{
				concept: { name: "address" },
				module: "HTML"
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), tc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: { "aria-level": "2" },
		relatedConcepts: [
			{
				concept: { name: "h1" },
				module: "HTML"
			},
			{
				concept: { name: "h2" },
				module: "HTML"
			},
			{
				concept: { name: "h3" },
				module: "HTML"
			},
			{
				concept: { name: "h4" },
				module: "HTML"
			},
			{
				concept: { name: "h5" },
				module: "HTML"
			},
			{
				concept: { name: "h6" },
				module: "HTML"
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: { "aria-level": "2" },
		superClass: [[
			"roletype",
			"structure",
			"sectionhead"
		]]
	};
})), nc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [
			{
				concept: {
					attributes: [{
						constraints: ["set"],
						name: "alt"
					}],
					name: "img"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["undefined"],
						name: "alt"
					}],
					name: "img"
				},
				module: "HTML"
			},
			{
				concept: { name: "imggroup" },
				module: "DTB"
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), rc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["prohibited"],
		prohibitedProps: ["aria-label", "aria-labelledby"],
		props: {},
		relatedConcepts: [{
			concept: { name: "ins" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), ic = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-expanded": null,
			"aria-haspopup": null
		},
		relatedConcepts: [{
			concept: {
				attributes: [{
					constraints: ["set"],
					name: "href"
				}],
				name: "a"
			},
			module: "HTML"
		}, {
			concept: {
				attributes: [{
					constraints: ["set"],
					name: "href"
				}],
				name: "area"
			},
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"command"
		]]
	};
})), ac = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [
			{
				concept: { name: "menu" },
				module: "HTML"
			},
			{
				concept: { name: "ol" },
				module: "HTML"
			},
			{
				concept: { name: "ul" },
				module: "HTML"
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [["listitem"]],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), oc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-invalid": null,
			"aria-multiselectable": null,
			"aria-readonly": null,
			"aria-required": null,
			"aria-orientation": "vertical"
		},
		relatedConcepts: [
			{
				concept: {
					attributes: [{
						constraints: [">1"],
						name: "size"
					}],
					constraints: ["the size attribute value is greater than 1"],
					name: "select"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{ name: "multiple" }],
					name: "select"
				},
				module: "HTML"
			},
			{
				concept: { name: "datalist" },
				module: "HTML"
			},
			{
				concept: { name: "list" },
				module: "ARIA"
			},
			{
				concept: { name: "select" },
				module: "XForms"
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [["option", "group"], ["option"]],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"composite",
			"select"
		], [
			"roletype",
			"structure",
			"section",
			"group",
			"select"
		]]
	};
})), sc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-level": null,
			"aria-posinset": null,
			"aria-setsize": null
		},
		relatedConcepts: [{
			concept: {
				constraints: [
					"direct descendant of ol",
					"direct descendant of ul",
					"direct descendant of menu"
				],
				name: "li"
			},
			module: "HTML"
		}, {
			concept: { name: "item" },
			module: "XForms"
		}],
		requireContextRole: ["directory", "list"],
		requiredContextRole: ["directory", "list"],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), cc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: { "aria-live": "polite" },
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), lc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: { name: "main" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), uc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["prohibited"],
		prohibitedProps: [],
		props: {
			"aria-braillelabel": null,
			"aria-brailleroledescription": null,
			"aria-description": null
		},
		relatedConcepts: [{
			concept: { name: "mark" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), dc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), fc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: { name: "math" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), pc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: { "aria-orientation": "vertical" },
		relatedConcepts: [
			{
				concept: { name: "MENU" },
				module: "JAPI"
			},
			{
				concept: { name: "list" },
				module: "ARIA"
			},
			{
				concept: { name: "select" },
				module: "XForms"
			},
			{
				concept: { name: "sidebar" },
				module: "DTB"
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [
			["menuitem", "group"],
			["menuitemradio", "group"],
			["menuitemcheckbox", "group"],
			["menuitem"],
			["menuitemcheckbox"],
			["menuitemradio"]
		],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"composite",
			"select"
		], [
			"roletype",
			"structure",
			"section",
			"group",
			"select"
		]]
	};
})), mc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: { "aria-orientation": "horizontal" },
		relatedConcepts: [{
			concept: { name: "toolbar" },
			module: "ARIA"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [
			["menuitem", "group"],
			["menuitemradio", "group"],
			["menuitemcheckbox", "group"],
			["menuitem"],
			["menuitemcheckbox"],
			["menuitemradio"]
		],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"composite",
			"select",
			"menu"
		], [
			"roletype",
			"structure",
			"section",
			"group",
			"select",
			"menu"
		]]
	};
})), hc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-posinset": null,
			"aria-setsize": null
		},
		relatedConcepts: [
			{
				concept: { name: "MENU_ITEM" },
				module: "JAPI"
			},
			{
				concept: { name: "listitem" },
				module: "ARIA"
			},
			{
				concept: { name: "option" },
				module: "ARIA"
			}
		],
		requireContextRole: [
			"group",
			"menu",
			"menubar"
		],
		requiredContextRole: [
			"group",
			"menu",
			"menubar"
		],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"command"
		]]
	};
})), gc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: { name: "menuitem" },
			module: "ARIA"
		}],
		requireContextRole: [
			"group",
			"menu",
			"menubar"
		],
		requiredContextRole: [
			"group",
			"menu",
			"menubar"
		],
		requiredOwnedElements: [],
		requiredProps: { "aria-checked": null },
		superClass: [[
			"roletype",
			"widget",
			"input",
			"checkbox"
		], [
			"roletype",
			"widget",
			"command",
			"menuitem"
		]]
	};
})), _c = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: { name: "menuitem" },
			module: "ARIA"
		}],
		requireContextRole: [
			"group",
			"menu",
			"menubar"
		],
		requiredContextRole: [
			"group",
			"menu",
			"menubar"
		],
		requiredOwnedElements: [],
		requiredProps: { "aria-checked": null },
		superClass: [
			[
				"roletype",
				"widget",
				"input",
				"checkbox",
				"menuitemcheckbox"
			],
			[
				"roletype",
				"widget",
				"command",
				"menuitem",
				"menuitemcheckbox"
			],
			[
				"roletype",
				"widget",
				"input",
				"radio"
			]
		]
	};
})), vc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-valuetext": null,
			"aria-valuemax": "100",
			"aria-valuemin": "0"
		},
		relatedConcepts: [{
			concept: { name: "meter" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: { "aria-valuenow": null },
		superClass: [[
			"roletype",
			"structure",
			"range"
		]]
	};
})), yc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: { name: "nav" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), bc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: [],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: []
	};
})), xc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Sc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-checked": null,
			"aria-posinset": null,
			"aria-setsize": null,
			"aria-selected": "false"
		},
		relatedConcepts: [
			{
				concept: { name: "item" },
				module: "XForms"
			},
			{
				concept: { name: "listitem" },
				module: "ARIA"
			},
			{
				concept: { name: "option" },
				module: "HTML"
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: { "aria-selected": "false" },
		superClass: [[
			"roletype",
			"widget",
			"input"
		]]
	};
})), Cc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["prohibited"],
		prohibitedProps: ["aria-label", "aria-labelledby"],
		props: {},
		relatedConcepts: [{
			concept: { name: "p" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), wc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["prohibited"],
		prohibitedProps: ["aria-label", "aria-labelledby"],
		props: {},
		relatedConcepts: [{
			concept: {
				attributes: [{
					name: "alt",
					value: ""
				}],
				name: "img"
			},
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype", "structure"]]
	};
})), Tc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: { "aria-valuetext": null },
		relatedConcepts: [{
			concept: { name: "progress" },
			module: "HTML"
		}, {
			concept: { name: "status" },
			module: "ARIA"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"range"
		], ["roletype", "widget"]]
	};
})), Ec = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-checked": null,
			"aria-posinset": null,
			"aria-setsize": null
		},
		relatedConcepts: [{
			concept: {
				attributes: [{
					name: "type",
					value: "radio"
				}],
				name: "input"
			},
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: { "aria-checked": null },
		superClass: [[
			"roletype",
			"widget",
			"input"
		]]
	};
})), Dc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-errormessage": null,
			"aria-invalid": null,
			"aria-readonly": null,
			"aria-required": null
		},
		relatedConcepts: [{
			concept: { name: "list" },
			module: "ARIA"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [["radio"]],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"composite",
			"select"
		], [
			"roletype",
			"structure",
			"section",
			"group",
			"select"
		]]
	};
})), Oc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [
			{
				concept: {
					attributes: [{
						constraints: ["set"],
						name: "aria-label"
					}],
					name: "section"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["set"],
						name: "aria-labelledby"
					}],
					name: "section"
				},
				module: "HTML"
			},
			{ concept: { name: "Device Independence Glossart perceivable unit" } }
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), kc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-colindex": null,
			"aria-expanded": null,
			"aria-level": null,
			"aria-posinset": null,
			"aria-rowindex": null,
			"aria-selected": null,
			"aria-setsize": null
		},
		relatedConcepts: [{
			concept: { name: "tr" },
			module: "HTML"
		}],
		requireContextRole: [
			"grid",
			"rowgroup",
			"table",
			"treegrid"
		],
		requiredContextRole: [
			"grid",
			"rowgroup",
			"table",
			"treegrid"
		],
		requiredOwnedElements: [
			["cell"],
			["columnheader"],
			["gridcell"],
			["rowheader"]
		],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"group"
		], ["roletype", "widget"]]
	};
})), Ac = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [
			{
				concept: { name: "tbody" },
				module: "HTML"
			},
			{
				concept: { name: "tfoot" },
				module: "HTML"
			},
			{
				concept: { name: "thead" },
				module: "HTML"
			}
		],
		requireContextRole: [
			"grid",
			"table",
			"treegrid"
		],
		requiredContextRole: [
			"grid",
			"table",
			"treegrid"
		],
		requiredOwnedElements: [["row"]],
		requiredProps: {},
		superClass: [["roletype", "structure"]]
	};
})), jc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: { "aria-sort": null },
		relatedConcepts: [{
			concept: {
				attributes: [{
					name: "scope",
					value: "row"
				}],
				name: "th"
			},
			module: "HTML"
		}, {
			concept: {
				attributes: [{
					name: "scope",
					value: "rowgroup"
				}],
				name: "th"
			},
			module: "HTML"
		}],
		requireContextRole: ["row", "rowgroup"],
		requiredContextRole: ["row", "rowgroup"],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [
			[
				"roletype",
				"structure",
				"section",
				"cell"
			],
			[
				"roletype",
				"structure",
				"section",
				"cell",
				"gridcell"
			],
			[
				"roletype",
				"widget",
				"gridcell"
			],
			[
				"roletype",
				"structure",
				"sectionhead"
			]
		]
	};
})), Mc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-valuetext": null,
			"aria-orientation": "vertical",
			"aria-valuemax": "100",
			"aria-valuemin": "0"
		},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {
			"aria-controls": null,
			"aria-valuenow": null
		},
		superClass: [[
			"roletype",
			"structure",
			"range"
		], ["roletype", "widget"]]
	};
})), Nc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), Pc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: {
				attributes: [{
					constraints: ["undefined"],
					name: "list"
				}, {
					name: "type",
					value: "search"
				}],
				constraints: ["the list attribute is not set"],
				name: "input"
			},
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"input",
			"textbox"
		]]
	};
})), Fc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-orientation": "horizontal",
			"aria-valuemax": "100",
			"aria-valuemin": "0",
			"aria-valuenow": null,
			"aria-valuetext": null
		},
		relatedConcepts: [{
			concept: { name: "hr" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["roletype", "structure"]]
	};
})), Ic = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-errormessage": null,
			"aria-haspopup": null,
			"aria-invalid": null,
			"aria-readonly": null,
			"aria-valuetext": null,
			"aria-orientation": "horizontal",
			"aria-valuemax": "100",
			"aria-valuemin": "0"
		},
		relatedConcepts: [{
			concept: {
				attributes: [{
					name: "type",
					value: "range"
				}],
				name: "input"
			},
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: { "aria-valuenow": null },
		superClass: [[
			"roletype",
			"widget",
			"input"
		], [
			"roletype",
			"structure",
			"range"
		]]
	};
})), Lc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-errormessage": null,
			"aria-invalid": null,
			"aria-readonly": null,
			"aria-required": null,
			"aria-valuetext": null,
			"aria-valuenow": "0"
		},
		relatedConcepts: [{
			concept: {
				attributes: [{
					name: "type",
					value: "number"
				}],
				name: "input"
			},
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [
			[
				"roletype",
				"widget",
				"composite"
			],
			[
				"roletype",
				"widget",
				"input"
			],
			[
				"roletype",
				"structure",
				"range"
			]
		]
	};
})), Rc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-atomic": "true",
			"aria-live": "polite"
		},
		relatedConcepts: [{
			concept: { name: "output" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), zc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["prohibited"],
		prohibitedProps: ["aria-label", "aria-labelledby"],
		props: {},
		relatedConcepts: [{
			concept: { name: "strong" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Bc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["prohibited"],
		prohibitedProps: ["aria-label", "aria-labelledby"],
		props: {},
		relatedConcepts: [{
			concept: { name: "sub" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Vc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["prohibited"],
		prohibitedProps: ["aria-label", "aria-labelledby"],
		props: {},
		relatedConcepts: [{
			concept: { name: "sup" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Hc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: { name: "button" },
			module: "ARIA"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: { "aria-checked": null },
		superClass: [[
			"roletype",
			"widget",
			"input",
			"checkbox"
		]]
	};
})), Uc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-posinset": null,
			"aria-setsize": null,
			"aria-selected": "false"
		},
		relatedConcepts: [],
		requireContextRole: ["tablist"],
		requiredContextRole: ["tablist"],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"sectionhead"
		], ["roletype", "widget"]]
	};
})), Wc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-colcount": null,
			"aria-rowcount": null
		},
		relatedConcepts: [{
			concept: { name: "table" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [["row"], ["row", "rowgroup"]],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Gc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-level": null,
			"aria-multiselectable": null,
			"aria-orientation": "horizontal"
		},
		relatedConcepts: [{
			module: "DAISY",
			concept: { name: "guide" }
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [["tab"]],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"composite"
		]]
	};
})), Kc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), qc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: { name: "dfn" },
			module: "HTML"
		}, {
			concept: { name: "dt" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Jc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-activedescendant": null,
			"aria-autocomplete": null,
			"aria-errormessage": null,
			"aria-haspopup": null,
			"aria-invalid": null,
			"aria-multiline": null,
			"aria-placeholder": null,
			"aria-readonly": null,
			"aria-required": null
		},
		relatedConcepts: [
			{
				concept: {
					attributes: [{
						constraints: ["undefined"],
						name: "type"
					}, {
						constraints: ["undefined"],
						name: "list"
					}],
					constraints: ["the list attribute is not set"],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["undefined"],
						name: "list"
					}, {
						name: "type",
						value: "email"
					}],
					constraints: ["the list attribute is not set"],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["undefined"],
						name: "list"
					}, {
						name: "type",
						value: "tel"
					}],
					constraints: ["the list attribute is not set"],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["undefined"],
						name: "list"
					}, {
						name: "type",
						value: "text"
					}],
					constraints: ["the list attribute is not set"],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: {
					attributes: [{
						constraints: ["undefined"],
						name: "list"
					}, {
						name: "type",
						value: "url"
					}],
					constraints: ["the list attribute is not set"],
					name: "input"
				},
				module: "HTML"
			},
			{
				concept: { name: "input" },
				module: "XForms"
			},
			{
				concept: { name: "textarea" },
				module: "HTML"
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"input"
		]]
	};
})), Yc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: { name: "time" },
			module: "HTML"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Xc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"status"
		]]
	};
})), Zc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: { "aria-orientation": "horizontal" },
		relatedConcepts: [{
			concept: { name: "menubar" },
			module: "ARIA"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"group"
		]]
	};
})), Qc = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), $c = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-errormessage": null,
			"aria-invalid": null,
			"aria-multiselectable": null,
			"aria-required": null,
			"aria-orientation": "vertical"
		},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [["treeitem", "group"], ["treeitem"]],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"composite",
			"select"
		], [
			"roletype",
			"structure",
			"section",
			"group",
			"select"
		]]
	};
})), el = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [["row"], ["row", "rowgroup"]],
		requiredProps: {},
		superClass: [
			[
				"roletype",
				"widget",
				"composite",
				"grid"
			],
			[
				"roletype",
				"structure",
				"section",
				"table",
				"grid"
			],
			[
				"roletype",
				"widget",
				"composite",
				"select",
				"tree"
			],
			[
				"roletype",
				"structure",
				"section",
				"group",
				"select",
				"tree"
			]
		]
	};
})), tl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-expanded": null,
			"aria-haspopup": null
		},
		relatedConcepts: [],
		requireContextRole: ["group", "tree"],
		requiredContextRole: ["group", "tree"],
		requiredOwnedElements: [],
		requiredProps: { "aria-selected": null },
		superClass: [[
			"roletype",
			"structure",
			"section",
			"listitem"
		], [
			"roletype",
			"widget",
			"input",
			"option"
		]]
	};
})), nl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var t = M(Ds()), n = M(Os()), r = M(ks()), i = M(As()), a = M(js()), o = M(Ms()), s = M(Ns()), c = M(Ps()), l = M(Fs()), u = M(Is()), d = M(Ls()), f = M(Rs()), p = M(zs()), m = M(Bs()), h = M(Vs()), g = M(Hs()), _ = M(Us()), v = M(Ws()), y = M(Gs()), b = M(Ks()), ee = M(qs()), te = M(Js()), ne = M(Ys()), re = M(Xs()), ie = M(Zs()), ae = M(Qs()), oe = M($s()), se = M(ec()), ce = M(tc()), le = M(nc()), ue = M(rc()), x = M(ic()), de = M(ac()), fe = M(oc()), pe = M(sc()), me = M(cc()), he = M(lc()), ge = M(uc()), _e = M(dc()), ve = M(fc()), ye = M(pc()), S = M(mc()), C = M(hc()), be = M(gc()), xe = M(_c()), Se = M(vc()), Ce = M(yc()), we = M(bc()), Te = M(xc()), Ee = M(Sc()), De = M(Cc()), Oe = M(wc()), ke = M(Tc()), Ae = M(Ec()), je = M(Dc()), Me = M(Oc()), Ne = M(kc()), Pe = M(Ac()), Fe = M(jc()), Ie = M(Mc()), Le = M(Nc()), Re = M(Pc()), ze = M(Fc()), Be = M(Ic()), Ve = M(Lc()), He = M(Rc()), Ue = M(zc()), We = M(Bc()), Ge = M(Vc()), Ke = M(Hc()), qe = M(Uc()), Je = M(Wc()), Ye = M(Gc()), w = M(Kc()), Xe = M(qc()), T = M(Jc()), E = M(Yc()), D = M(Xc()), O = M(Zc()), Ze = M(Qc()), k = M($c()), A = M(el()), j = M(tl());
	function M(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.default = [
		["alert", t.default],
		["alertdialog", n.default],
		["application", r.default],
		["article", i.default],
		["banner", a.default],
		["blockquote", o.default],
		["button", s.default],
		["caption", c.default],
		["cell", l.default],
		["checkbox", u.default],
		["code", d.default],
		["columnheader", f.default],
		["combobox", p.default],
		["complementary", m.default],
		["contentinfo", h.default],
		["definition", g.default],
		["deletion", _.default],
		["dialog", v.default],
		["directory", y.default],
		["document", b.default],
		["emphasis", ee.default],
		["feed", te.default],
		["figure", ne.default],
		["form", re.default],
		["generic", ie.default],
		["grid", ae.default],
		["gridcell", oe.default],
		["group", se.default],
		["heading", ce.default],
		["img", le.default],
		["insertion", ue.default],
		["link", x.default],
		["list", de.default],
		["listbox", fe.default],
		["listitem", pe.default],
		["log", me.default],
		["main", he.default],
		["mark", ge.default],
		["marquee", _e.default],
		["math", ve.default],
		["menu", ye.default],
		["menubar", S.default],
		["menuitem", C.default],
		["menuitemcheckbox", be.default],
		["menuitemradio", xe.default],
		["meter", Se.default],
		["navigation", Ce.default],
		["none", we.default],
		["note", Te.default],
		["option", Ee.default],
		["paragraph", De.default],
		["presentation", Oe.default],
		["progressbar", ke.default],
		["radio", Ae.default],
		["radiogroup", je.default],
		["region", Me.default],
		["row", Ne.default],
		["rowgroup", Pe.default],
		["rowheader", Fe.default],
		["scrollbar", Ie.default],
		["search", Le.default],
		["searchbox", Re.default],
		["separator", ze.default],
		["slider", Be.default],
		["spinbutton", Ve.default],
		["status", He.default],
		["strong", Ue.default],
		["subscript", We.default],
		["superscript", Ge.default],
		["switch", Ke.default],
		["tab", qe.default],
		["table", Je.default],
		["tablist", Ye.default],
		["tabpanel", w.default],
		["term", Xe.default],
		["textbox", T.default],
		["time", E.default],
		["timer", D.default],
		["toolbar", O.default],
		["tooltip", Ze.default],
		["tree", k.default],
		["treegrid", A.default],
		["treeitem", j.default]
	];
})), rl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "abstract [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), il = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "acknowledgments [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), al = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "afterword [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), ol = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "appendix [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), sl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-errormessage": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "referrer [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"command",
			"link"
		]]
	};
})), cl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "EPUB biblioentry [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: ["doc-bibliography"],
		requiredContextRole: ["doc-bibliography"],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"listitem"
		]]
	};
})), ll = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "bibliography [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [["doc-biblioentry"]],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), ul = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-errormessage": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "biblioref [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"command",
			"link"
		]]
	};
})), dl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "chapter [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), fl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "colophon [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), pl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "conclusion [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), ml = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "cover [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"img"
		]]
	};
})), hl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "credit [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), gl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "credits [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), _l = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "dedication [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), vl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "rearnote [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: ["doc-endnotes"],
		requiredContextRole: ["doc-endnotes"],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"listitem"
		]]
	};
})), yl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "rearnotes [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [["doc-endnote"]],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), bl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "epigraph [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), xl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "epilogue [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), Sl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "errata [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), Cl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), wl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "footnote [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Tl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "foreword [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), El = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "glossary [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [["definition"], ["term"]],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), Dl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-errormessage": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "glossref [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"command",
			"link"
		]]
	};
})), Ol = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "index [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark",
			"navigation"
		]]
	};
})), kl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "introduction [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), Al = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-errormessage": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "noteref [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"widget",
			"command",
			"link"
		]]
	};
})), jl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "notice [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"note"
		]]
	};
})), Ml = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "pagebreak [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"separator"
		]]
	};
})), Nl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["prohibited"],
		prohibitedProps: [],
		props: {
			"aria-braillelabel": null,
			"aria-brailleroledescription": null,
			"aria-description": null,
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Pl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["prohibited"],
		prohibitedProps: [],
		props: {
			"aria-braillelabel": null,
			"aria-brailleroledescription": null,
			"aria-description": null,
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Fl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "page-list [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark",
			"navigation"
		]]
	};
})), Il = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "part [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), Ll = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "preface [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), Rl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "prologue [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark"
		]]
	};
})), zl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {},
		relatedConcepts: [{
			concept: { name: "pullquote [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [["none"]]
	};
})), Bl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "qna [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section"
		]]
	};
})), Vl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "subtitle [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"sectionhead"
		]]
	};
})), Hl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "help [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"note"
		]]
	};
})), Ul = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [{
			concept: { name: "toc [EPUB-SSV]" },
			module: "EPUB"
		}],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"landmark",
			"navigation"
		]]
	};
})), Wl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var t = S(rl()), n = S(il()), r = S(al()), i = S(ol()), a = S(sl()), o = S(cl()), s = S(ll()), c = S(ul()), l = S(dl()), u = S(fl()), d = S(pl()), f = S(ml()), p = S(hl()), m = S(gl()), h = S(_l()), g = S(vl()), _ = S(yl()), v = S(bl()), y = S(xl()), b = S(Sl()), ee = S(Cl()), te = S(wl()), ne = S(Tl()), re = S(El()), ie = S(Dl()), ae = S(Ol()), oe = S(kl()), se = S(Al()), ce = S(jl()), le = S(Ml()), ue = S(Nl()), x = S(Pl()), de = S(Fl()), fe = S(Il()), pe = S(Ll()), me = S(Rl()), he = S(zl()), ge = S(Bl()), _e = S(Vl()), ve = S(Hl()), ye = S(Ul());
	function S(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.default = [
		["doc-abstract", t.default],
		["doc-acknowledgments", n.default],
		["doc-afterword", r.default],
		["doc-appendix", i.default],
		["doc-backlink", a.default],
		["doc-biblioentry", o.default],
		["doc-bibliography", s.default],
		["doc-biblioref", c.default],
		["doc-chapter", l.default],
		["doc-colophon", u.default],
		["doc-conclusion", d.default],
		["doc-cover", f.default],
		["doc-credit", p.default],
		["doc-credits", m.default],
		["doc-dedication", h.default],
		["doc-endnote", g.default],
		["doc-endnotes", _.default],
		["doc-epigraph", v.default],
		["doc-epilogue", y.default],
		["doc-errata", b.default],
		["doc-example", ee.default],
		["doc-footnote", te.default],
		["doc-foreword", ne.default],
		["doc-glossary", re.default],
		["doc-glossref", ie.default],
		["doc-index", ae.default],
		["doc-introduction", oe.default],
		["doc-noteref", se.default],
		["doc-notice", ce.default],
		["doc-pagebreak", le.default],
		["doc-pagefooter", ue.default],
		["doc-pageheader", x.default],
		["doc-pagelist", de.default],
		["doc-part", fe.default],
		["doc-preface", pe.default],
		["doc-prologue", me.default],
		["doc-pullquote", he.default],
		["doc-qna", ge.default],
		["doc-subtitle", _e.default],
		["doc-tip", ve.default],
		["doc-toc", ye.default]
	];
})), Gl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [
			{
				module: "GRAPHICS",
				concept: { name: "graphics-object" }
			},
			{
				module: "ARIA",
				concept: { name: "img" }
			},
			{
				module: "ARIA",
				concept: { name: "article" }
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"document"
		]]
	};
})), Kl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !1,
		baseConcepts: [],
		childrenPresentational: !1,
		nameFrom: ["author", "contents"],
		prohibitedProps: [],
		props: {
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [
			{
				module: "GRAPHICS",
				concept: { name: "graphics-document" }
			},
			{
				module: "ARIA",
				concept: { name: "group" }
			},
			{
				module: "ARIA",
				concept: { name: "img" }
			},
			{
				module: "GRAPHICS",
				concept: { name: "graphics-symbol" }
			}
		],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"group"
		]]
	};
})), ql = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		abstract: !1,
		accessibleNameRequired: !0,
		baseConcepts: [],
		childrenPresentational: !0,
		nameFrom: ["author"],
		prohibitedProps: [],
		props: {
			"aria-disabled": null,
			"aria-errormessage": null,
			"aria-expanded": null,
			"aria-haspopup": null,
			"aria-invalid": null
		},
		relatedConcepts: [],
		requireContextRole: [],
		requiredContextRole: [],
		requiredOwnedElements: [],
		requiredProps: {},
		superClass: [[
			"roletype",
			"structure",
			"section",
			"img"
		]]
	};
})), Jl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var t = i(Gl()), n = i(Kl()), r = i(ql());
	function i(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.default = [
		["graphics-document", t.default],
		["graphics-object", n.default],
		["graphics-symbol", r.default]
	];
})), Yl = /* @__PURE__ */ t(((e) => {
	function t(e) {
		"@babel/helpers - typeof";
		return t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, t(e);
	}
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var n = s(Es()), r = s(nl()), i = s(Wl()), a = s(Jl()), o = s(ds());
	function s(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function c(e, t, n) {
		return (t = l(t)) in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e;
	}
	function l(e) {
		var n = u(e, "string");
		return t(n) == "symbol" ? n : n + "";
	}
	function u(e, n) {
		if (t(e) != "object" || !e) return e;
		var r = e[Symbol.toPrimitive];
		if (r !== void 0) {
			var i = r.call(e, n || "default");
			if (t(i) != "object") return i;
			throw TypeError("@@toPrimitive must return a primitive value.");
		}
		return (n === "string" ? String : Number)(e);
	}
	function d(e, t) {
		var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (!n) {
			if (Array.isArray(e) || (n = m(e)) || t && e && typeof e.length == "number") {
				n && (e = n);
				var r = 0, i = function() {};
				return {
					s: i,
					n: function() {
						return r >= e.length ? { done: !0 } : {
							done: !1,
							value: e[r++]
						};
					},
					e: function(e) {
						throw e;
					},
					f: i
				};
			}
			throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
		}
		var a, o = !0, s = !1;
		return {
			s: function() {
				n = n.call(e);
			},
			n: function() {
				var e = n.next();
				return o = e.done, e;
			},
			e: function(e) {
				s = !0, a = e;
			},
			f: function() {
				try {
					o || n.return == null || n.return();
				} finally {
					if (s) throw a;
				}
			}
		};
	}
	function f(e, t) {
		return _(e) || g(e, t) || m(e, t) || p();
	}
	function p() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function m(e, t) {
		if (e) {
			if (typeof e == "string") return h(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? h(e, t) : void 0;
		}
	}
	function h(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function g(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r, i, a, o, s = [], c = !0, l = !1;
			try {
				if (a = (n = n.call(e)).next, t === 0) {
					if (Object(n) !== n) return;
					c = !1;
				} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
			} catch (e) {
				l = !0, i = e;
			} finally {
				try {
					if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
				} finally {
					if (l) throw i;
				}
			}
			return s;
		}
	}
	function _(e) {
		if (Array.isArray(e)) return e;
	}
	var v = [].concat(n.default, r.default, i.default, a.default);
	v.forEach(function(e) {
		var t = f(e, 2)[1], n = d(t.superClass), r;
		try {
			for (n.s(); !(r = n.n()).done;) {
				var i = r.value, a = d(i), o;
				try {
					var s = function() {
						var e = o.value, n = v.find(function(t) {
							return f(t, 1)[0] === e;
						});
						if (n) for (var r = n[1], i = 0, a = Object.keys(r.props); i < a.length; i++) {
							var s = a[i];
							Object.prototype.hasOwnProperty.call(t.props, s) || Object.assign(t.props, c({}, s, r.props[s]));
						}
					};
					for (a.s(); !(o = a.n()).done;) s();
				} catch (e) {
					a.e(e);
				} finally {
					a.f();
				}
			}
		} catch (e) {
			n.e(e);
		} finally {
			n.f();
		}
	});
	var y = {
		entries: function() {
			return v;
		},
		forEach: function(e) {
			var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n = d(v), r;
			try {
				for (n.s(); !(r = n.n()).done;) {
					var i = f(r.value, 2), a = i[0], o = i[1];
					e.call(t, o, a, v);
				}
			} catch (e) {
				n.e(e);
			} finally {
				n.f();
			}
		},
		get: function(e) {
			var t = v.find(function(t) {
				return t[0] === e;
			});
			return t && t[1];
		},
		has: function(e) {
			return !!y.get(e);
		},
		keys: function() {
			return v.map(function(e) {
				return f(e, 1)[0];
			});
		},
		values: function() {
			return v.map(function(e) {
				return f(e, 2)[1];
			});
		}
	};
	e.default = (0, o.default)(y, y.entries());
})), Xl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var t = r(ds()), n = r(Yl());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		return l(e) || c(e, t) || o(e, t) || a();
	}
	function a() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function o(e, t) {
		if (e) {
			if (typeof e == "string") return s(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(e, t) : void 0;
		}
	}
	function s(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function c(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r, i, a, o, s = [], c = !0, l = !1;
			try {
				if (a = (n = n.call(e)).next, t === 0) {
					if (Object(n) !== n) return;
					c = !1;
				} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
			} catch (e) {
				l = !0, i = e;
			} finally {
				try {
					if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
				} finally {
					if (l) throw i;
				}
			}
			return s;
		}
	}
	function l(e) {
		if (Array.isArray(e)) return e;
	}
	for (var u = [], d = n.default.keys(), f = 0; f < d.length; f++) {
		var p = d[f], m = n.default.get(p);
		if (m) for (var h = [].concat(m.baseConcepts, m.relatedConcepts), g = 0; g < h.length; g++) {
			var _ = h[g];
			_.module === "HTML" && (function() {
				var e = _.concept;
				if (e) {
					for (var t = u.find(function(t) {
						return y(t[0], e);
					}), n = t ? t[1] : [], r = !0, i = 0; i < n.length; i++) if (n[i] === p) {
						r = !1;
						break;
					}
					r && n.push(p), t || u.push([e, n]);
				}
			})();
		}
	}
	var v = {
		entries: function() {
			return u;
		},
		forEach: function(e) {
			for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n = 0, r = u; n < r.length; n++) {
				var a = i(r[n], 2), o = a[0], s = a[1];
				e.call(t, s, o, u);
			}
		},
		get: function(e) {
			var t = u.find(function(t) {
				return e.name === t[0].name && ee(e.attributes, t[0].attributes);
			});
			return t && t[1];
		},
		has: function(e) {
			return !!v.get(e);
		},
		keys: function() {
			return u.map(function(e) {
				return i(e, 1)[0];
			});
		},
		values: function() {
			return u.map(function(e) {
				return i(e, 2)[1];
			});
		}
	};
	function y(e, t) {
		return e.name === t.name && b(e.constraints, t.constraints) && ee(e.attributes, t.attributes);
	}
	function b(e, t) {
		if (e === void 0 && t !== void 0 || e !== void 0 && t === void 0) return !1;
		if (e !== void 0 && t !== void 0) {
			if (e.length !== t.length) return !1;
			for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
		}
		return !0;
	}
	function ee(e, t) {
		if (e === void 0 && t !== void 0 || e !== void 0 && t === void 0) return !1;
		if (e !== void 0 && t !== void 0) {
			if (e.length !== t.length) return !1;
			for (var n = 0; n < e.length; n++) {
				if (e[n].name !== t[n].name || e[n].value !== t[n].value || e[n].constraints === void 0 && t[n].constraints !== void 0 || e[n].constraints !== void 0 && t[n].constraints === void 0) return !1;
				if (e[n].constraints !== void 0 && t[n].constraints !== void 0) {
					if (e[n].constraints.length !== t[n].constraints.length) return !1;
					for (var r = 0; r < e[n].constraints.length; r++) if (e[n].constraints[r] !== t[n].constraints[r]) return !1;
				}
			}
		}
		return !0;
	}
	e.default = (0, t.default)(v, v.entries());
})), Zl = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var t = r(ds()), n = r(Yl());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		return l(e) || c(e, t) || o(e, t) || a();
	}
	function a() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function o(e, t) {
		if (e) {
			if (typeof e == "string") return s(e, t);
			var n = {}.toString.call(e).slice(8, -1);
			return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(e, t) : void 0;
		}
	}
	function s(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function c(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r, i, a, o, s = [], c = !0, l = !1;
			try {
				if (a = (n = n.call(e)).next, t === 0) {
					if (Object(n) !== n) return;
					c = !1;
				} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
			} catch (e) {
				l = !0, i = e;
			} finally {
				try {
					if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
				} finally {
					if (l) throw i;
				}
			}
			return s;
		}
	}
	function l(e) {
		if (Array.isArray(e)) return e;
	}
	for (var u = [], d = n.default.keys(), f = 0; f < d.length; f++) {
		var p = d[f], m = n.default.get(p), h = [];
		if (m) {
			for (var g = [].concat(m.baseConcepts, m.relatedConcepts), _ = 0; _ < g.length; _++) {
				var v = g[_];
				if (v.module === "HTML") {
					var y = v.concept;
					y != null && h.push(y);
				}
			}
			h.length > 0 && u.push([p, h]);
		}
	}
	var b = {
		entries: function() {
			return u;
		},
		forEach: function(e) {
			for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n = 0, r = u; n < r.length; n++) {
				var a = i(r[n], 2), o = a[0], s = a[1];
				e.call(t, s, o, u);
			}
		},
		get: function(e) {
			var t = u.find(function(t) {
				return t[0] === e;
			});
			return t && t[1];
		},
		has: function(e) {
			return !!b.get(e);
		},
		keys: function() {
			return u.map(function(e) {
				return i(e, 1)[0];
			});
		},
		values: function() {
			return u.map(function(e) {
				return i(e, 2)[1];
			});
		}
	};
	e.default = (0, t.default)(b, b.entries());
})), Ql = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.roles = e.roleElements = e.elementRoles = e.dom = e.aria = void 0;
	var t = o(fs()), n = o(ps()), r = o(Yl()), i = o(Xl()), a = o(Zl());
	function o(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.aria = t.default, e.dom = n.default, e.roles = r.default, e.elementRoles = i.default, e.roleElements = a.default;
})), $l = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	function t() {
		var e = this, t = 0, n = {
			"@@iterator": function() {
				return n;
			},
			next: function() {
				if (t < e.length) {
					var n = e[t];
					return t += 1, {
						done: !1,
						value: n
					};
				} else return { done: !0 };
			}
		};
		return n;
	}
	e.default = t;
})), eu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = i;
	var t = n($l());
	function n(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function r(e) {
		"@babel/helpers - typeof";
		return r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
			return typeof e;
		} : function(e) {
			return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, r(e);
	}
	function i(e, n) {
		return typeof Symbol == "function" && r(Symbol.iterator) === "symbol" && Object.defineProperty(e, Symbol.iterator, { value: t.default.bind(n) }), e;
	}
})), tu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "abbr" }
		}],
		type: "structure"
	};
})), nu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "alertdialog" }
		}],
		type: "window"
	};
})), ru = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "alert" }
		}],
		type: "structure"
	};
})), iu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), au = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "application" }
		}],
		type: "window"
	};
})), ou = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "article" }
		}, {
			module: "HTML",
			concept: { name: "article" }
		}],
		type: "structure"
	};
})), su = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "audio" }
		}],
		type: "widget"
	};
})), cu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "banner" }
		}],
		type: "structure"
	};
})), lu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "blockquote" }
		}],
		type: "structure"
	};
})), uu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { attributes: [{
				name: "aria-busy",
				value: "true"
			}] }
		}],
		type: "widget"
	};
})), du = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "button" }
		}, {
			module: "HTML",
			concept: { name: "button" }
		}],
		type: "widget"
	};
})), fu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "canvas" }
		}],
		type: "widget"
	};
})), pu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "caption" }
		}],
		type: "structure"
	};
})), mu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [
			{
				module: "ARIA",
				concept: { name: "cell" }
			},
			{
				module: "ARIA",
				concept: { name: "gridcell" }
			},
			{
				module: "HTML",
				concept: { name: "td" }
			}
		],
		type: "widget"
	};
})), hu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "checkbox" }
		}, {
			module: "HTML",
			concept: {
				name: "input",
				attributes: [{
					name: "type",
					value: "checkbox"
				}]
			}
		}],
		type: "widget"
	};
})), gu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: {
				name: "input",
				attributes: [{
					name: "type",
					value: "color"
				}]
			}
		}],
		type: "widget"
	};
})), _u = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "columnheader" }
		}, {
			module: "HTML",
			concept: { name: "th" }
		}],
		type: "widget"
	};
})), vu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), yu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "combobox" }
		}, {
			module: "HTML",
			concept: { name: "select" }
		}],
		type: "widget"
	};
})), bu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "complementary" }
		}],
		type: "structure"
	};
})), xu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "structureinfo" }
		}],
		type: "structure"
	};
})), Su = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: {
				name: "input",
				attributes: [{
					name: "type",
					value: "date"
				}]
			}
		}],
		type: "widget"
	};
})), Cu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: {
				name: "input",
				attributes: [{
					name: "type",
					value: "datetime"
				}]
			}
		}],
		type: "widget"
	};
})), wu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "dfn" }
		}],
		type: "structure"
	};
})), Tu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "dd" }
		}],
		type: "structure"
	};
})), Eu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "dl" }
		}],
		type: "structure"
	};
})), Du = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "dt" }
		}],
		type: "structure"
	};
})), Ou = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "details" }
		}],
		type: "structure"
	};
})), ku = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "dialog" }
		}, {
			module: "HTML",
			concept: { name: "dialog" }
		}],
		type: "window"
	};
})), Au = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "directory" }
		}, {
			module: "HTML",
			concept: { name: "dir" }
		}],
		type: "structure"
	};
})), ju = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: {
				constraints: ["scoped to a details element"],
				name: "summary"
			}
		}],
		type: "widget"
	};
})), Mu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "div" }
		}],
		type: "generic"
	};
})), Nu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "document" }
		}],
		type: "structure"
	};
})), Pu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "embed" }
		}],
		type: "widget"
	};
})), Fu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "feed" }
		}],
		type: "structure"
	};
})), Iu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "figcaption" }
		}],
		type: "structure"
	};
})), Lu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "figure" }
		}, {
			module: "HTML",
			concept: { name: "figure" }
		}],
		type: "structure"
	};
})), Ru = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "footer" }
		}],
		type: "structure"
	};
})), zu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "form" }
		}, {
			module: "HTML",
			concept: { name: "form" }
		}],
		type: "structure"
	};
})), Bu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "grid" }
		}],
		type: "widget"
	};
})), Vu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "group" }
		}],
		type: "structure"
	};
})), Hu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [
			{
				module: "ARIA",
				concept: { name: "heading" }
			},
			{
				module: "HTML",
				concept: { name: "h1" }
			},
			{
				module: "HTML",
				concept: { name: "h2" }
			},
			{
				module: "HTML",
				concept: { name: "h3" }
			},
			{
				module: "HTML",
				concept: { name: "h4" }
			},
			{
				module: "HTML",
				concept: { name: "h5" }
			},
			{
				module: "HTML",
				concept: { name: "h6" }
			}
		],
		type: "structure"
	};
})), Uu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "window"
	};
})), Wu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "iframe" }
		}],
		type: "window"
	};
})), Gu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), Ku = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "widget"
	};
})), qu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: {
				name: "img",
				attributes: [{ name: "usemap" }]
			}
		}],
		type: "structure"
	};
})), Ju = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "img" }
		}, {
			module: "HTML",
			concept: { name: "img" }
		}],
		type: "structure"
	};
})), Yu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "input" }
		}],
		type: "widget"
	};
})), Xu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: {
				name: "input",
				attributes: [{
					name: "type",
					value: "time"
				}]
			}
		}],
		type: "widget"
	};
})), Zu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "label" }
		}],
		type: "structure"
	};
})), Qu = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "legend" }
		}],
		type: "structure"
	};
})), $u = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "br" }
		}],
		type: "structure"
	};
})), ed = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "link" }
		}, {
			module: "HTML",
			concept: {
				name: "a",
				attributes: [{ name: "href" }]
			}
		}],
		type: "widget"
	};
})), td = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "option" }
		}, {
			module: "HTML",
			concept: { name: "option" }
		}],
		type: "widget"
	};
})), nd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [
			{
				module: "ARIA",
				concept: { name: "listbox" }
			},
			{
				module: "HTML",
				concept: { name: "datalist" }
			},
			{
				module: "HTML",
				concept: { name: "select" }
			}
		],
		type: "widget"
	};
})), rd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "listitem" }
		}, {
			module: "HTML",
			concept: { name: "li" }
		}],
		type: "structure"
	};
})), id = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), ad = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [
			{
				module: "ARIA",
				concept: { name: "list" }
			},
			{
				module: "HTML",
				concept: { name: "ul" }
			},
			{
				module: "HTML",
				concept: { name: "ol" }
			}
		],
		type: "structure"
	};
})), od = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "log" }
		}],
		type: "structure"
	};
})), sd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "main" }
		}, {
			module: "HTML",
			concept: { name: "main" }
		}],
		type: "structure"
	};
})), cd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "mark" }
		}],
		type: "structure"
	};
})), ld = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "marquee" }
		}, {
			module: "HTML",
			concept: { name: "marquee" }
		}],
		type: "structure"
	};
})), ud = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "math" }
		}],
		type: "structure"
	};
})), dd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "menubar" }
		}],
		type: "structure"
	};
})), fd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "widget"
	};
})), pd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "menuitem" }
		}, {
			module: "HTML",
			concept: { name: "menuitem" }
		}],
		type: "widget"
	};
})), md = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "menuitemcheckbox" }
		}],
		type: "widget"
	};
})), hd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "menuitemradio" }
		}],
		type: "widget"
	};
})), gd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "widget"
	};
})), _d = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "widget"
	};
})), vd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "menu" }
		}, {
			module: "HTML",
			concept: { name: "menu" }
		}],
		type: "structure"
	};
})), yd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "meter" }
		}],
		type: "structure"
	};
})), bd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "navigation" }
		}, {
			module: "HTML",
			concept: { name: "nav" }
		}],
		type: "structure"
	};
})), xd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "none" }
		}],
		type: "structure"
	};
})), Sd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "note" }
		}],
		type: "structure"
	};
})), Cd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), wd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "p" }
		}],
		type: "structure"
	};
})), Td = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "widget"
	};
})), Ed = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "pre" }
		}],
		type: "structure"
	};
})), Dd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "presentation" }
		}],
		type: "structure"
	};
})), Od = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "progressbar" }
		}, {
			module: "HTML",
			concept: { name: "progress" }
		}],
		type: "structure"
	};
})), kd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "radio" }
		}, {
			module: "HTML",
			concept: {
				name: "input",
				attributes: [{
					name: "type",
					value: "radio"
				}]
			}
		}],
		type: "widget"
	};
})), Ad = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "radiogroup" }
		}],
		type: "structure"
	};
})), jd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "region" }
		}],
		type: "structure"
	};
})), Md = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), Nd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "rowheader" }
		}, {
			module: "HTML",
			concept: {
				name: "th",
				attributes: [{
					name: "scope",
					value: "row"
				}]
			}
		}],
		type: "widget"
	};
})), Pd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "row" }
		}, {
			module: "HTML",
			concept: { name: "tr" }
		}],
		type: "structure"
	};
})), Fd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "ruby" }
		}],
		type: "structure"
	};
})), Id = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), Ld = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), Rd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "scrollbar" }
		}],
		type: "widget"
	};
})), zd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), Bd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "search" }
		}],
		type: "structure"
	};
})), Vd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "searchbox" }
		}, {
			module: "HTML",
			concept: {
				name: "input",
				attributes: [{
					name: "type",
					value: "search"
				}]
			}
		}],
		type: "widget"
	};
})), Hd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "slider" }
		}, {
			module: "HTML",
			concept: {
				name: "input",
				attributes: [{
					name: "type",
					value: "range"
				}]
			}
		}],
		type: "widget"
	};
})), Ud = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), Wd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "spinbutton" }
		}, {
			module: "HTML",
			concept: {
				name: "input",
				attributes: [{
					name: "type",
					value: "number"
				}]
			}
		}],
		type: "widget"
	};
})), Gd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), Kd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "separator" }
		}],
		type: "widget"
	};
})), qd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), Jd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "status" }
		}],
		type: "structure"
	};
})), Yd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), Xd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "switch" }
		}, {
			module: "HTML",
			concept: {
				name: "input",
				attributes: [{
					name: "type",
					value: "checkbox"
				}]
			}
		}],
		type: "widget"
	};
})), Zd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "tablist" }
		}],
		type: "structure"
	};
})), Qd = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "tab" }
		}],
		type: "widget"
	};
})), $d = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), ef = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "table" }
		}, {
			module: "HTML",
			concept: { name: "table" }
		}],
		type: "structure"
	};
})), tf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "tablist" }
		}],
		type: "structure"
	};
})), nf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "tabpanel" }
		}],
		type: "structure"
	};
})), rf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "term" }
		}],
		type: "structure"
	};
})), af = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: {
				attributes: [{
					name: "aria-multiline",
					value: "true"
				}],
				name: "textbox"
			}
		}, {
			module: "HTML",
			concept: { name: "textarea" }
		}],
		type: "widget"
	};
})), of = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [
			{
				module: "ARIA",
				concept: { name: "textbox" }
			},
			{
				module: "HTML",
				concept: { name: "input" }
			},
			{
				module: "HTML",
				concept: {
					name: "input",
					attributes: [{
						name: "type",
						value: "text"
					}]
				}
			}
		],
		type: "widget"
	};
})), sf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "time" }
		}],
		type: "structure"
	};
})), cf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "timer" }
		}],
		type: "structure"
	};
})), lf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { attributes: [{ name: "aria-pressed" }] }
		}],
		type: "widget"
	};
})), uf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "toolbar" }
		}],
		type: "structure"
	};
})), df = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "tree" }
		}],
		type: "widget"
	};
})), ff = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "treegrid" }
		}],
		type: "widget"
	};
})), pf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "treeitem" }
		}],
		type: "widget"
	};
})), mf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "ARIA",
			concept: { name: "tooltip" }
		}],
		type: "structure"
	};
})), hf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [{
			module: "HTML",
			concept: { name: "video" }
		}],
		type: "widget"
	};
})), gf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "structure"
	};
})), _f = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		relatedConcepts: [],
		type: "window"
	};
})), vf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var t = I(eu()), n = I(tu()), r = I(nu()), i = I(ru()), a = I(iu()), o = I(au()), s = I(ou()), c = I(su()), l = I(cu()), u = I(lu()), d = I(uu()), f = I(du()), p = I(fu()), m = I(pu()), h = I(mu()), g = I(hu()), _ = I(gu()), v = I(_u()), y = I(vu()), b = I(yu()), ee = I(bu()), te = I(xu()), ne = I(Su()), re = I(Cu()), ie = I(wu()), ae = I(Tu()), oe = I(Eu()), se = I(Du()), ce = I(Ou()), le = I(ku()), ue = I(Au()), x = I(ju()), de = I(Mu()), fe = I(Nu()), pe = I(Pu()), me = I(Fu()), he = I(Iu()), ge = I(Lu()), _e = I(Ru()), ve = I(zu()), ye = I(Bu()), S = I(Vu()), C = I(Hu()), be = I(Uu()), xe = I(Wu()), Se = I(Gu()), Ce = I(Ku()), we = I(qu()), Te = I(Ju()), Ee = I(Yu()), De = I(Xu()), Oe = I(Zu()), ke = I(Qu()), Ae = I($u()), je = I(ed()), Me = I(td()), Ne = I(nd()), Pe = I(rd()), Fe = I(id()), Ie = I(ad()), Le = I(od()), Re = I(sd()), ze = I(cd()), Be = I(ld()), Ve = I(ud()), He = I(dd()), Ue = I(fd()), We = I(pd()), Ge = I(md()), Ke = I(hd()), qe = I(gd()), Je = I(_d()), Ye = I(vd()), w = I(yd()), Xe = I(bd()), T = I(xd()), E = I(Sd()), D = I(Cd()), O = I(wd()), Ze = I(Td()), k = I(Ed()), A = I(Dd()), j = I(Od()), M = I(kd()), Qe = I(Ad()), $e = I(jd()), et = I(Md()), N = I(Nd()), tt = I(Pd()), nt = I(Fd()), rt = I(Id()), it = I(Ld()), at = I(Rd()), ot = I(zd()), st = I(Bd()), ct = I(Vd()), lt = I(Hd()), ut = I(Ud()), dt = I(Wd()), ft = I(Gd()), pt = I(Kd()), mt = I(qd()), ht = I(Jd()), gt = I(Yd()), _t = I(Xd()), vt = I(Zd()), yt = I(Qd()), bt = I($d()), xt = I(ef()), St = I(tf()), Ct = I(nf()), wt = I(rf()), Tt = I(af()), Et = I(of()), Dt = I(sf()), Ot = I(cf()), kt = I(lf()), At = I(uf()), jt = I(df()), Mt = I(ff()), Nt = I(pf()), Pt = I(mf()), Ft = I(hf()), P = I(gf()), F = I(_f());
	function I(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function It(e, t) {
		return Bt(e) || zt(e, t) || L(e, t) || Lt();
	}
	function Lt() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function L(e, t) {
		if (e) {
			if (typeof e == "string") return Rt(e, t);
			var n = Object.prototype.toString.call(e).slice(8, -1);
			if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
			if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Rt(e, t);
		}
	}
	function Rt(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	function zt(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r = [], i = !0, a = !1, o, s;
			try {
				for (n = n.call(e); !(i = (o = n.next()).done) && (r.push(o.value), !(t && r.length === t)); i = !0);
			} catch (e) {
				a = !0, s = e;
			} finally {
				try {
					!i && n.return != null && n.return();
				} finally {
					if (a) throw s;
				}
			}
			return r;
		}
	}
	function Bt(e) {
		if (Array.isArray(e)) return e;
	}
	var Vt = [
		["AbbrRole", n.default],
		["AlertDialogRole", r.default],
		["AlertRole", i.default],
		["AnnotationRole", a.default],
		["ApplicationRole", o.default],
		["ArticleRole", s.default],
		["AudioRole", c.default],
		["BannerRole", l.default],
		["BlockquoteRole", u.default],
		["BusyIndicatorRole", d.default],
		["ButtonRole", f.default],
		["CanvasRole", p.default],
		["CaptionRole", m.default],
		["CellRole", h.default],
		["CheckBoxRole", g.default],
		["ColorWellRole", _.default],
		["ColumnHeaderRole", v.default],
		["ColumnRole", y.default],
		["ComboBoxRole", b.default],
		["ComplementaryRole", ee.default],
		["ContentInfoRole", te.default],
		["DateRole", ne.default],
		["DateTimeRole", re.default],
		["DefinitionRole", ie.default],
		["DescriptionListDetailRole", ae.default],
		["DescriptionListRole", oe.default],
		["DescriptionListTermRole", se.default],
		["DetailsRole", ce.default],
		["DialogRole", le.default],
		["DirectoryRole", ue.default],
		["DisclosureTriangleRole", x.default],
		["DivRole", de.default],
		["DocumentRole", fe.default],
		["EmbeddedObjectRole", pe.default],
		["FeedRole", me.default],
		["FigcaptionRole", he.default],
		["FigureRole", ge.default],
		["FooterRole", _e.default],
		["FormRole", ve.default],
		["GridRole", ye.default],
		["GroupRole", S.default],
		["HeadingRole", C.default],
		["IframePresentationalRole", be.default],
		["IframeRole", xe.default],
		["IgnoredRole", Se.default],
		["ImageMapLinkRole", Ce.default],
		["ImageMapRole", we.default],
		["ImageRole", Te.default],
		["InlineTextBoxRole", Ee.default],
		["InputTimeRole", De.default],
		["LabelRole", Oe.default],
		["LegendRole", ke.default],
		["LineBreakRole", Ae.default],
		["LinkRole", je.default],
		["ListBoxOptionRole", Me.default],
		["ListBoxRole", Ne.default],
		["ListItemRole", Pe.default],
		["ListMarkerRole", Fe.default],
		["ListRole", Ie.default],
		["LogRole", Le.default],
		["MainRole", Re.default],
		["MarkRole", ze.default],
		["MarqueeRole", Be.default],
		["MathRole", Ve.default],
		["MenuBarRole", He.default],
		["MenuButtonRole", Ue.default],
		["MenuItemRole", We.default],
		["MenuItemCheckBoxRole", Ge.default],
		["MenuItemRadioRole", Ke.default],
		["MenuListOptionRole", qe.default],
		["MenuListPopupRole", Je.default],
		["MenuRole", Ye.default],
		["MeterRole", w.default],
		["NavigationRole", Xe.default],
		["NoneRole", T.default],
		["NoteRole", E.default],
		["OutlineRole", D.default],
		["ParagraphRole", O.default],
		["PopUpButtonRole", Ze.default],
		["PreRole", k.default],
		["PresentationalRole", A.default],
		["ProgressIndicatorRole", j.default],
		["RadioButtonRole", M.default],
		["RadioGroupRole", Qe.default],
		["RegionRole", $e.default],
		["RootWebAreaRole", et.default],
		["RowHeaderRole", N.default],
		["RowRole", tt.default],
		["RubyRole", nt.default],
		["RulerRole", rt.default],
		["ScrollAreaRole", it.default],
		["ScrollBarRole", at.default],
		["SeamlessWebAreaRole", ot.default],
		["SearchRole", st.default],
		["SearchBoxRole", ct.default],
		["SliderRole", lt.default],
		["SliderThumbRole", ut.default],
		["SpinButtonRole", dt.default],
		["SpinButtonPartRole", ft.default],
		["SplitterRole", pt.default],
		["StaticTextRole", mt.default],
		["StatusRole", ht.default],
		["SVGRootRole", gt.default],
		["SwitchRole", _t.default],
		["TabGroupRole", vt.default],
		["TabRole", yt.default],
		["TableHeaderContainerRole", bt.default],
		["TableRole", xt.default],
		["TabListRole", St.default],
		["TabPanelRole", Ct.default],
		["TermRole", wt.default],
		["TextAreaRole", Tt.default],
		["TextFieldRole", Et.default],
		["TimeRole", Dt.default],
		["TimerRole", Ot.default],
		["ToggleButtonRole", kt.default],
		["ToolbarRole", At.default],
		["TreeRole", jt.default],
		["TreeGridRole", Mt.default],
		["TreeItemRole", Nt.default],
		["UserInterfaceTooltipRole", Pt.default],
		["VideoRole", Ft.default],
		["WebAreaRole", P.default],
		["WindowRole", F.default]
	], Ht = {
		entries: function() {
			return Vt;
		},
		forEach: function(e) {
			for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n = 0, r = Vt; n < r.length; n++) {
				var i = It(r[n], 2), a = i[0], o = i[1];
				e.call(t, o, a, Vt);
			}
		},
		get: function(e) {
			var t = Vt.find(function(t) {
				return t[0] === e;
			});
			return t && t[1];
		},
		has: function(e) {
			return !!Ht.get(e);
		},
		keys: function() {
			return Vt.map(function(e) {
				return It(e, 1)[0];
			});
		},
		values: function() {
			return Vt.map(function(e) {
				return It(e, 2)[1];
			});
		}
	};
	e.default = (0, t.default)(Ht, Ht.entries());
})), yf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var t = r(eu()), n = r(vf());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		return s(e) || o(e, t) || l(e, t) || a();
	}
	function a() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function o(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r = [], i = !0, a = !1, o, s;
			try {
				for (n = n.call(e); !(i = (o = n.next()).done) && (r.push(o.value), !(t && r.length === t)); i = !0);
			} catch (e) {
				a = !0, s = e;
			} finally {
				try {
					!i && n.return != null && n.return();
				} finally {
					if (a) throw s;
				}
			}
			return r;
		}
	}
	function s(e) {
		if (Array.isArray(e)) return e;
	}
	function c(e, t) {
		var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (!n) {
			if (Array.isArray(e) || (n = l(e)) || t && e && typeof e.length == "number") {
				n && (e = n);
				var r = 0, i = function() {};
				return {
					s: i,
					n: function() {
						return r >= e.length ? { done: !0 } : {
							done: !1,
							value: e[r++]
						};
					},
					e: function(e) {
						throw e;
					},
					f: i
				};
			}
			throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
		}
		var a = !0, o = !1, s;
		return {
			s: function() {
				n = n.call(e);
			},
			n: function() {
				var e = n.next();
				return a = e.done, e;
			},
			e: function(e) {
				o = !0, s = e;
			},
			f: function() {
				try {
					!a && n.return != null && n.return();
				} finally {
					if (o) throw s;
				}
			}
		};
	}
	function l(e, t) {
		if (e) {
			if (typeof e == "string") return u(e, t);
			var n = Object.prototype.toString.call(e).slice(8, -1);
			if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
			if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return u(e, t);
		}
	}
	function u(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	var d = [], f = c(n.default.entries()), p;
	try {
		var m = function() {
			var e = i(p.value, 2), t = e[0], n = e[1].relatedConcepts;
			Array.isArray(n) && n.forEach(function(e) {
				if (e.module === "HTML") {
					var n = e.concept;
					if (n) {
						var r = d.findIndex(function(e) {
							return i(e, 1)[0] === t;
						});
						r === -1 && (d.push([t, []]), r = d.length - 1), d[r][1].push(n);
					}
				}
			});
		};
		for (f.s(); !(p = f.n()).done;) m();
	} catch (e) {
		f.e(e);
	} finally {
		f.f();
	}
	var h = {
		entries: function() {
			return d;
		},
		forEach: function(e) {
			for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n = 0, r = d; n < r.length; n++) {
				var a = i(r[n], 2), o = a[0], s = a[1];
				e.call(t, s, o, d);
			}
		},
		get: function(e) {
			var t = d.find(function(t) {
				return t[0] === e;
			});
			return t && t[1];
		},
		has: function(e) {
			return !!h.get(e);
		},
		keys: function() {
			return d.map(function(e) {
				return i(e, 1)[0];
			});
		},
		values: function() {
			return d.map(function(e) {
				return i(e, 2)[1];
			});
		}
	};
	e.default = (0, t.default)(h, h.entries());
})), bf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var t = r(eu()), n = r(vf());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		return s(e) || o(e, t) || l(e, t) || a();
	}
	function a() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function o(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r = [], i = !0, a = !1, o, s;
			try {
				for (n = n.call(e); !(i = (o = n.next()).done) && (r.push(o.value), !(t && r.length === t)); i = !0);
			} catch (e) {
				a = !0, s = e;
			} finally {
				try {
					!i && n.return != null && n.return();
				} finally {
					if (a) throw s;
				}
			}
			return r;
		}
	}
	function s(e) {
		if (Array.isArray(e)) return e;
	}
	function c(e, t) {
		var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (!n) {
			if (Array.isArray(e) || (n = l(e)) || t && e && typeof e.length == "number") {
				n && (e = n);
				var r = 0, i = function() {};
				return {
					s: i,
					n: function() {
						return r >= e.length ? { done: !0 } : {
							done: !1,
							value: e[r++]
						};
					},
					e: function(e) {
						throw e;
					},
					f: i
				};
			}
			throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
		}
		var a = !0, o = !1, s;
		return {
			s: function() {
				n = n.call(e);
			},
			n: function() {
				var e = n.next();
				return a = e.done, e;
			},
			e: function(e) {
				o = !0, s = e;
			},
			f: function() {
				try {
					!a && n.return != null && n.return();
				} finally {
					if (o) throw s;
				}
			}
		};
	}
	function l(e, t) {
		if (e) {
			if (typeof e == "string") return u(e, t);
			var n = Object.prototype.toString.call(e).slice(8, -1);
			if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
			if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return u(e, t);
		}
	}
	function u(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	var d = [], f = c(n.default.entries()), p;
	try {
		var m = function() {
			var e = i(p.value, 2), t = e[0], n = e[1].relatedConcepts;
			Array.isArray(n) && n.forEach(function(e) {
				if (e.module === "ARIA") {
					var n = e.concept;
					if (n) {
						var r = d.findIndex(function(e) {
							return i(e, 1)[0] === t;
						});
						r === -1 && (d.push([t, []]), r = d.length - 1), d[r][1].push(n);
					}
				}
			});
		};
		for (f.s(); !(p = f.n()).done;) m();
	} catch (e) {
		f.e(e);
	} finally {
		f.f();
	}
	var h = {
		entries: function() {
			return d;
		},
		forEach: function(e) {
			for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n = 0, r = d; n < r.length; n++) {
				var a = i(r[n], 2), o = a[0], s = a[1];
				e.call(t, s, o, d);
			}
		},
		get: function(e) {
			var t = d.find(function(t) {
				return t[0] === e;
			});
			return t && t[1];
		},
		has: function(e) {
			return !!h.get(e);
		},
		keys: function() {
			return d.map(function(e) {
				return i(e, 1)[0];
			});
		},
		values: function() {
			return d.map(function(e) {
				return i(e, 2)[1];
			});
		}
	};
	e.default = (0, t.default)(h, h.entries());
})), xf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var t = r(vf()), n = r(eu());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		return s(e) || o(e, t) || l(e, t) || a();
	}
	function a() {
		throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function o(e, t) {
		var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (n != null) {
			var r = [], i = !0, a = !1, o, s;
			try {
				for (n = n.call(e); !(i = (o = n.next()).done) && (r.push(o.value), !(t && r.length === t)); i = !0);
			} catch (e) {
				a = !0, s = e;
			} finally {
				try {
					!i && n.return != null && n.return();
				} finally {
					if (a) throw s;
				}
			}
			return r;
		}
	}
	function s(e) {
		if (Array.isArray(e)) return e;
	}
	function c(e, t) {
		var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
		if (!n) {
			if (Array.isArray(e) || (n = l(e)) || t && e && typeof e.length == "number") {
				n && (e = n);
				var r = 0, i = function() {};
				return {
					s: i,
					n: function() {
						return r >= e.length ? { done: !0 } : {
							done: !1,
							value: e[r++]
						};
					},
					e: function(e) {
						throw e;
					},
					f: i
				};
			}
			throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
		}
		var a = !0, o = !1, s;
		return {
			s: function() {
				n = n.call(e);
			},
			n: function() {
				var e = n.next();
				return a = e.done, e;
			},
			e: function(e) {
				o = !0, s = e;
			},
			f: function() {
				try {
					!a && n.return != null && n.return();
				} finally {
					if (o) throw s;
				}
			}
		};
	}
	function l(e, t) {
		if (e) {
			if (typeof e == "string") return u(e, t);
			var n = Object.prototype.toString.call(e).slice(8, -1);
			if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
			if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return u(e, t);
		}
	}
	function u(e, t) {
		(t == null || t > e.length) && (t = e.length);
		for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
		return r;
	}
	var d = [], f = c(t.default.entries()), p;
	try {
		var m = function() {
			var e = i(p.value, 2), t = e[0], n = e[1].relatedConcepts;
			Array.isArray(n) && n.forEach(function(e) {
				if (e.module === "HTML") {
					var n = e.concept;
					if (n != null) {
						for (var r = JSON.stringify(n), i, a = 0; a < d.length; a++) {
							var o = d[a][0];
							if (JSON.stringify(o) === r) {
								i = d[a][1];
								break;
							}
						}
						Array.isArray(i) || (i = []), i.findIndex(function(e) {
							return e === t;
						}) === -1 && i.push(t), a < d.length ? d.splice(a, 1, [n, i]) : d.push([n, i]);
					}
				}
			});
		};
		for (f.s(); !(p = f.n()).done;) m();
	} catch (e) {
		f.e(e);
	} finally {
		f.f();
	}
	function h(e, t) {
		if (e === void 0 && t !== void 0 || e !== void 0 && t === void 0) return !1;
		if (e !== void 0 && t !== void 0) {
			if (e.length != t.length) return !1;
			for (var n = 0; n < e.length; n++) if (t[n].name !== e[n].name || t[n].value !== e[n].value) return !1;
		}
		return !0;
	}
	var g = {
		entries: function() {
			return d;
		},
		forEach: function(e) {
			for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n = 0, r = d; n < r.length; n++) {
				var a = i(r[n], 2), o = a[0], s = a[1];
				e.call(t, s, o, d);
			}
		},
		get: function(e) {
			var t = d.find(function(t) {
				return e.name === t[0].name && h(e.attributes, t[0].attributes);
			});
			return t && t[1];
		},
		has: function(e) {
			return !!g.get(e);
		},
		keys: function() {
			return d.map(function(e) {
				return i(e, 1)[0];
			});
		},
		values: function() {
			return d.map(function(e) {
				return i(e, 2)[1];
			});
		}
	};
	e.default = (0, n.default)(g, g.entries());
})), Sf = /* @__PURE__ */ t(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.elementAXObjects = e.AXObjects = e.AXObjectRoles = e.AXObjectElements = void 0;
	var t = a(yf()), n = a(bf()), r = a(vf()), i = a(xf());
	function a(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.AXObjectElements = t.default, e.AXObjectRoles = n.default, e.AXObjects = r.default, e.elementAXObjects = i.default;
})), Cf = Ql(), wf = Sf();
"activedescendant atomic autocomplete busy checked colcount colindex colspan controls current describedby description details disabled dropeffect errormessage expanded flowto grabbed haspopup hidden invalid keyshortcuts label labelledby level live modal multiline multiselectable orientation owns placeholder posinset pressed readonly relevant required roledescription rowcount rowindex rowspan selected setsize sort valuemax valuemin valuenow valuetext".split(" ");
var Tf = Cf.roles.keys(), Ef = Tf.filter((e) => Cf.roles.get(e)?.abstract), Df = Tf.filter((e) => !Ef.includes(e)), Of = Df.filter((e) => {
	let t = Cf.roles.get(e);
	return ![
		"toolbar",
		"tabpanel",
		"generic",
		"cell"
	].includes(e) && !t?.superClass.some((e) => e.includes("widget") || e.includes("window"));
}).concat("progressbar"), kf = Df.filter((e) => !Of.includes(e) && e !== "generic"), Af = [], jf = [];
for (let [e, t] of Cf.elementRoles.entries()) [...t].every((e) => e !== "generic" && Of.includes(e)) && Af.push(e), [...t].every((e) => kf.includes(e)) && jf.push(e);
var Mf = [...wf.AXObjects.keys()].filter((e) => wf.AXObjects.get(e).type === "widget"), Nf = [], Pf = [], Ff = [...wf.AXObjects.keys()].filter((e) => ["windows", "structure"].includes(wf.AXObjects.get(e).type));
for (let [e, t] of wf.elementAXObjects.entries()) [...t].every((e) => Mf.includes(e)) && Nf.push(e), [...t].every((e) => Ff.includes(e)) && Pf.push(e);
var If = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Lf = new Uint8Array(64), Rf = new Uint8Array(128);
for (let e = 0; e < If.length; e++) {
	let t = If.charCodeAt(e);
	Lf[e] = t, Rf[t] = e;
}
typeof window < "u" && window.btoa, (/* @__PURE__ */ t(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self, n.resolveURI = r());
	})(e, (function() {
		let e = /^[\w+.-]+:\/\//, t = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/, n = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
		function r(t) {
			return e.test(t);
		}
		function i(e) {
			return e.startsWith("//");
		}
		function a(e) {
			return e.startsWith("/");
		}
		function o(e) {
			return e.startsWith("file:");
		}
		function s(e) {
			return /^[.?#]/.test(e);
		}
		function c(e) {
			let n = t.exec(e);
			return u(n[1], n[2] || "", n[3], n[4] || "", n[5] || "/", n[6] || "", n[7] || "");
		}
		function l(e) {
			let t = n.exec(e), r = t[2];
			return u("file:", "", t[1] || "", "", a(r) ? r : "/" + r, t[3] || "", t[4] || "");
		}
		function u(e, t, n, r, i, a, o) {
			return {
				scheme: e,
				user: t,
				host: n,
				port: r,
				path: i,
				query: a,
				hash: o,
				type: 7
			};
		}
		function d(e) {
			if (i(e)) {
				let t = c("http:" + e);
				return t.scheme = "", t.type = 6, t;
			}
			if (a(e)) {
				let t = c("http://foo.com" + e);
				return t.scheme = "", t.host = "", t.type = 5, t;
			}
			if (o(e)) return l(e);
			if (r(e)) return c(e);
			let t = c("http://foo.com/" + e);
			return t.scheme = "", t.host = "", t.type = e ? e.startsWith("?") ? 3 : e.startsWith("#") ? 2 : 4 : 1, t;
		}
		function f(e) {
			if (e.endsWith("/..")) return e;
			let t = e.lastIndexOf("/");
			return e.slice(0, t + 1);
		}
		function p(e, t) {
			m(t, t.type), e.path === "/" ? e.path = t.path : e.path = f(t.path) + e.path;
		}
		function m(e, t) {
			let n = t <= 4, r = e.path.split("/"), i = 1, a = 0, o = !1;
			for (let e = 1; e < r.length; e++) {
				let t = r[e];
				if (!t) {
					o = !0;
					continue;
				}
				if (o = !1, t !== ".") {
					if (t === "..") {
						a ? (o = !0, a--, i--) : n && (r[i++] = t);
						continue;
					}
					r[i++] = t, a++;
				}
			}
			let s = "";
			for (let e = 1; e < i; e++) s += "/" + r[e];
			(!s || o && !s.endsWith("/..")) && (s += "/"), e.path = s;
		}
		function h(e, t) {
			if (!e && !t) return "";
			let n = d(e), r = n.type;
			if (t && r !== 7) {
				let e = d(t), i = e.type;
				switch (r) {
					case 1: n.hash = e.hash;
					case 2: n.query = e.query;
					case 3:
					case 4: p(n, e);
					case 5: n.user = e.user, n.host = e.host, n.port = e.port;
					case 6: n.scheme = e.scheme;
				}
				i > r && (r = i);
			}
			m(n, r);
			let i = n.query + n.hash;
			switch (r) {
				case 2:
				case 3: return i;
				case 4: {
					let r = n.path.slice(1);
					return r ? s(t || e) && !s(r) ? "./" + r + i : r + i : i || ".";
				}
				case 5: return n.path + i;
				default: return n.scheme + "//" + n.user + n.host + n.port + n.path + i;
			}
		}
		return h;
	}));
})))();
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/internal/server/hydration.js
var zf = "accent-height accumulate additive alignment-baseline allowReorder alphabetic amplitude arabic-form ascent attributeName attributeType autoReverse azimuth baseFrequency baseline-shift baseProfile bbox begin bias by calcMode cap-height class clip clipPathUnits clip-path clip-rule color color-interpolation color-interpolation-filters color-profile color-rendering contentScriptType contentStyleType cursor cx cy d decelerate descent diffuseConstant direction display divisor dominant-baseline dur dx dy edgeMode elevation enable-background end exponent externalResourcesRequired fill fill-opacity fill-rule filter filterRes filterUnits flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight format from fr fx fy g1 g2 glyph-name glyph-orientation-horizontal glyph-orientation-vertical glyphRef gradientTransform gradientUnits hanging height href horiz-adv-x horiz-origin-x id ideographic image-rendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength kerning keyPoints keySplines keyTimes lang lengthAdjust letter-spacing lighting-color limitingConeAngle local marker-end marker-mid marker-start markerHeight markerUnits markerWidth mask maskContentUnits maskUnits mathematical max media method min mode name numOctaves offset onabort onactivate onbegin onclick onend onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onrepeat onresize onscroll onunload opacity operator order orient orientation origin overflow overline-position overline-thickness panose-1 paint-order pathLength patternContentUnits patternTransform patternUnits pointer-events points pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits r radius refX refY rendering-intent repeatCount repeatDur requiredExtensions requiredFeatures restart result rotate rx ry scale seed shape-rendering slope spacing specularConstant specularExponent speed spreadMethod startOffset stdDeviation stemh stemv stitchTiles stop-color stop-opacity strikethrough-position strikethrough-thickness string stroke stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width style surfaceScale systemLanguage tabindex tableValues target targetX targetY text-anchor text-decoration text-rendering textLength to transform type u1 u2 underline-position underline-thickness unicode unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical values version vert-adv-y vert-origin-x vert-origin-y viewBox viewTarget visibility width widths word-spacing writing-mode x x-height x1 x2 xChannelSelector xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y y1 y2 yChannelSelector z zoomAndPan".split(" "), Bf = /* @__PURE__ */ new Map();
zf.forEach((e) => {
	Bf.set(e.toLowerCase(), e);
});
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/validate-options.js
var Vf = {
	filename: Xf("(unknown)"),
	rootDir: Xf(typeof process < "u" ? process.cwd?.() : typeof Deno < "u" ? Deno.cwd() : void 0),
	dev: Zf(!1),
	generate: Yf("client", (e, t) => e === "dom" || e === "ssr" ? (Gf(Oe), e === "dom" ? "client" : "server") : (e !== "client" && e !== "server" && e !== !1 && tp(`${t} must be "client", "server" or false`), e)),
	warningFilter: $f(() => !0),
	experimental: Jf({ async: Zf(!1) })
}, Hf = {
	accessors: qf(Ce, Zf(!1)),
	css: ep((() => "external"), (e) => ((e === !0 || e === !1) && tp("The boolean options have been removed from the css option. Use \"external\" instead of false and \"injected\" instead of true"), e === "none" && tp("css: \"none\" is no longer a valid option. If this was crucial for you, please open an issue on GitHub with your use case."), e !== "external" && e !== "injected" && tp("css should be either \"external\" (default, recommended) or \"injected\""), e)),
	cssHash: $f(({ css: e, filename: t, hash: n }) => `svelte-${n(t === "(unknown)" ? e : t ?? e)}`),
	cssOutputFilename: Xf(void 0),
	customElement: ep((() => !1), (e, t) => (typeof e != "boolean" && tp(`${t} should be true or false`), e)),
	discloseVersion: Zf(!0),
	immutable: qf(we, Zf(!1)),
	legacy: Uf("The legacy option has been removed. If you are using this because of legacy.componentApi, use compatibility.componentApi instead"),
	compatibility: Jf({ componentApi: Qf([4, 5], 5) }),
	loopGuardTimeout: Kf(De),
	name: Xf(void 0),
	namespace: Qf([
		"html",
		"mathml",
		"svg"
	]),
	modernAst: Zf(!1),
	outputFilename: Xf(void 0),
	preserveComments: Zf(!1),
	fragments: Qf(["html", "tree"]),
	preserveWhitespace: Zf(!1),
	runes: ep(() => void 0),
	hmr: Zf(!1),
	sourcemap: Yf(void 0, (e) => e),
	enableSourcemap: Kf(Te),
	hydratable: Kf(Ee),
	format: Uf("The format option has been removed in Svelte 4, the compiler only outputs ESM now. Remove \"format\" from your compiler options. If you did not set this yourself, bump the version of your bundler plugin (vite-plugin-svelte/rollup-plugin-svelte/svelte-loader)"),
	tag: Uf("The tag option has been removed in Svelte 5. Use `<svelte:options customElement=\"tag-name\" />` inside the component instead. If that does not solve your use case, please open an issue on GitHub with details."),
	sveltePath: Uf("The sveltePath option has been removed in Svelte 5. If this option was crucial for you, please open an issue on GitHub with your use case."),
	errorMode: Uf("The errorMode option has been removed. If you are using this through svelte-preprocess with TypeScript, use the https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax setting instead"),
	varsReport: Uf("The vars option has been removed. If you are using this through svelte-preprocess with TypeScript, use the https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax setting instead")
};
({
	...Vf,
	...Object.fromEntries(Object.keys(Hf).map((e) => [e, () => {}]))
}), {
	...Vf,
	...Hf
};
function Uf(e) {
	return (t) => {
		t !== void 0 && Jr(null, e);
	};
}
var Wf = /* @__PURE__ */ new Set();
function Gf(e) {
	Wf.has(e) || (Wf.add(e), e(null));
}
function Kf(e) {
	return (t) => {
		t !== void 0 && Gf(e);
	};
}
function qf(e, t) {
	return (n, r) => (n !== void 0 && Gf(e), t(n, r));
}
function Jf(e, t = !1) {
	return (n, r) => {
		let i = {};
		(n && typeof n != "object" || Array.isArray(n)) && tp(`${r} should be an object`);
		for (let a in n) a in e || (t ? i[a] = n[a] : Yr(null, `${r ? `${r}.${a}` : a}`));
		for (let t in e) {
			let a = e[t];
			i[t] = a(n && n[t], r ? `${r}.${t}` : t);
		}
		return i;
	};
}
function Yf(e, t) {
	return (n, r) => n === void 0 ? e : t(n, r);
}
function Xf(e, t = !0) {
	return Yf(e, (e, n) => (typeof e != "string" && tp(`${n} should be a string, if specified`), !t && e === "" && tp(`${n} cannot be empty`), e));
}
function Zf(e) {
	return Yf(e, (e, t) => (typeof e != "boolean" && tp(`${t} should be true or false, if specified`), e));
}
function Qf(e, t = e[0]) {
	return Yf(t, (t, n) => (e.includes(t) || tp(e.length > 2 ? `${n} should be one of ${e.slice(0, -1).map((e) => `"${e}"`).join(", ")} or "${e[e.length - 1]}"` : `${n} should be either "${e[0]}" or "${e[1]}"`), t));
}
function $f(e) {
	return Yf(e, (e, t) => (typeof e != "function" && tp(`${t} should be a function, if specified`), e));
}
function ep(e, t = (e) => e) {
	return Yf(e, (e, n) => typeof e == "function" ? (...r) => t(e(...r), n) : (...r) => t(e, n));
}
function tp(e) {
	qr(null, e);
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.56.1_@typescript-eslint+types@8.60.1/node_modules/svelte/src/compiler/index.js
function np(e, { modern: t, loose: n } = {}) {
	e = ip(e), he({
		warning: () => !1,
		filename: void 0
	});
	let r = ls(e, n);
	return rp(e, r, t);
}
function rp(e, t, n) {
	if (n) {
		let e = (e) => {
			delete e.metadata;
		};
		return t.options?.attributes.forEach((t) => {
			e(t), e(t.value), Array.isArray(t.value) && t.value.forEach(e);
		}), u(t, null, { _(t, { next: n }) {
			e(t), n();
		} });
	}
	return Le(e, t);
}
function ip(e) {
	return e.charCodeAt(0) === 65279 ? e.slice(1) : e;
}
//#endregion
//#region ../../node_modules/.pnpm/prettier-plugin-svelte@3.5._59eebad3de5fbc91786036f18819cb0c/node_modules/prettier-plugin-svelte/browser.js
function ap(e, t, n, r) {
	function i(e) {
		return e instanceof n ? e : new n(function(t) {
			t(e);
		});
	}
	return new (n ||= Promise)(function(n, a) {
		function o(e) {
			try {
				c(r.next(e));
			} catch (e) {
				a(e);
			}
		}
		function s(e) {
			try {
				c(r.throw(e));
			} catch (e) {
				a(e);
			}
		}
		function c(e) {
			e.done ? n(e.value) : i(e.value).then(o, s);
		}
		c((r = r.apply(e, t || [])).next());
	});
}
var op = [
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
], sp = /* @__PURE__ */ "address.article.aside.blockquote.details.dialog.dd.div.dl.dt.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.li.main.nav.ol.p.pre.section.table.ul".split("."), cp = [], lp = typeof Buffer < "u" ? (e) => Buffer.from(e).toString("base64") : (e) => btoa(new TextEncoder().encode(e).reduce((e, t) => e + String.fromCharCode(t), "")), up = typeof Buffer < "u" ? (e) => Buffer.from(e, "base64").toString() : (e) => new TextDecoder().decode(Uint8Array.from(atob(e), (e) => e.charCodeAt(0))), dp = "✂prettier:content✂", fp = /<!--[^]*?-->|<script((?:\s+[^=>'"\/\s]+=(?:"[^"]*"|'[^']*'|[^>\s]+)|\s+[^=>'"\/\s]+)*\s*)>([^]*?)<\/script>/g, pp = /<!--[^]*?-->|<style((?:\s+[^=>'"\/\s]+=(?:"[^"]*"|'[^']*'|[^>\s]+)|\s+[^=>'"\/\s]+)*\s*)>([^]*?)<\/style>/g, mp = /\slang=["']?ts["']?/;
function hp(e) {
	let t = i("script"), n = i("style"), r = !1;
	return {
		text: a(a(e, "script", "{}", n), "style", "", t),
		isTypescript: r
	};
	function i(t) {
		let n = o(t), r = [], i = null;
		for (; (i = n.exec(e)) != null;) e.slice(i.index, i.index + 4) !== "<!--" && r.push([i.index, n.lastIndex]);
		return r;
	}
	function a(e, i, a, s) {
		let c = o(i), l = t, u = n, d = e.replace(c, (e, o, s, c) => {
			if (e.startsWith("<!--") || f(c)) return e;
			mp.test(o) && (r = !0);
			let d = `<${i}${o} ${dp}="${lp(s)}">${a}</${i}>`, p = e.length - d.length;
			l = m(t, l), u = m(n, u);
			function m(e, t) {
				return e.map((e, n) => {
					let r = t[n];
					return e[0] > c ? [r[0] - p, r[1] - p] : e[0] === c ? [r[0], r[1] - p] : r;
				});
			}
			return d;
		});
		return t = l, n = u, d;
		function f(e) {
			return s.some((t) => e > t[0] && e < t[1]);
		}
	}
	function o(e) {
		return e === "script" ? fp : pp;
	}
}
function gp(e) {
	return e.includes(dp);
}
var _p = /(<\w+.*?)\s*✂prettier:content✂="(.*?)">.*?(?=<\/)/gi;
function vp(e) {
	return e.replace(_p, (e, t, n) => `${t}>${up(n)}`);
}
function Y(e) {
	return {
		value: e,
		description: e
	};
}
var yp = {
	svelte5CompilerPath: {
		category: "Svelte",
		type: "string",
		default: "",
		description: "Only set this when using Svelte 5! Path to the Svelte 5 compiler"
	},
	svelteSortOrder: {
		category: "Svelte",
		type: "choice",
		default: "options-scripts-markup-styles",
		description: "Sort order for scripts, markup, and styles",
		choices: [
			Y("options-scripts-markup-styles"),
			Y("options-scripts-styles-markup"),
			Y("options-markup-styles-scripts"),
			Y("options-markup-scripts-styles"),
			Y("options-styles-markup-scripts"),
			Y("options-styles-scripts-markup"),
			Y("scripts-options-markup-styles"),
			Y("scripts-options-styles-markup"),
			Y("markup-options-styles-scripts"),
			Y("markup-options-scripts-styles"),
			Y("styles-options-markup-scripts"),
			Y("styles-options-scripts-markup"),
			Y("scripts-markup-options-styles"),
			Y("scripts-styles-options-markup"),
			Y("markup-styles-options-scripts"),
			Y("markup-scripts-options-styles"),
			Y("styles-markup-options-scripts"),
			Y("styles-scripts-options-markup"),
			Y("scripts-markup-styles-options"),
			Y("scripts-styles-markup-options"),
			Y("markup-styles-scripts-options"),
			Y("markup-scripts-styles-options"),
			Y("styles-markup-scripts-options"),
			Y("styles-scripts-markup-options"),
			Y("none")
		]
	},
	svelteStrictMode: {
		category: "Svelte",
		type: "boolean",
		default: !1,
		description: "More strict HTML syntax: Quotes in attributes, no self-closing DOM tags"
	},
	svelteBracketNewLine: {
		category: "Svelte",
		type: "boolean",
		description: "Put the `>` of a multiline element on a new line",
		deprecated: "2.5.0"
	},
	svelteAllowShorthand: {
		category: "Svelte",
		type: "boolean",
		default: !0,
		description: "Option to enable/disable component attribute shorthand if attribute name and expressions are same"
	},
	svelteIndentScriptAndStyle: {
		category: "Svelte",
		type: "boolean",
		default: !0,
		description: "Whether or not to indent the code inside <script> and <style> tags in Svelte files"
	}
}, bp = "-";
function xp(e = "options-scripts-markup-styles") {
	if (e === "none") return [];
	let t = e.split(bp);
	if (!t.includes("options")) throw Error("svelteSortOrder is missing option `options`");
	return t;
}
function Sp(e) {
	return e.svelteBracketNewLine == null ? e.bracketSameLine == null ? !1 : e.bracketSameLine : !e.svelteBracketNewLine;
}
function Cp(e) {
	return e && e.__isRoot;
}
function wp(e) {
	return e.stack.some((e) => e.type === "Element" && e.name.toLowerCase() === "pre" || e.type === "Attribute" && !cp.includes(e.name));
}
function Tp(e) {
	return [].concat.apply([], e);
}
function Ep(e, t) {
	for (let n = t.length - 1; n >= 0; n--) if (e(t[n], n)) return n;
	return -1;
}
function Dp(e, t) {
	let n = [];
	for (let r of e.split("\n")) n.length > 0 && n.push(t), r.endsWith("\r") ? n.push(r.slice(0, -1)) : n.push(r);
	return n;
}
function Op(e, t) {
	let { hardline: n, line: r } = c.builders, i = e.type === "InlineComponent" && !!e.expression || e.type === "Element" && !!e.tag, a = e.attributes.filter((e) => e.name !== dp);
	return t.singleAttributePerLine && (a.length > 1 || a.length && i) ? n : r;
}
function kp(e, t, n) {
	return (r) => r.getNode().name === dp ? "" : [Op(e, t), r.call(n)];
}
function Ap(e) {
	return e === c.builders.hardline || jp(e, c.builders.hardline);
}
function jp(e, t) {
	if (e === t) return !0;
	if (typeof e == "object" && e && typeof t == "object" && t) {
		if (Object.keys(e).length != Object.keys(t).length) return !1;
		for (var n in e) if (t.hasOwnProperty(n)) {
			if (!jp(e[n], t[n])) return !1;
		} else return !1;
		return !0;
	} else return !1;
}
function Mp(e) {
	return typeof e == "object" && !!e;
}
function Np(e) {
	return Ap(e) || Mp(e) && e.type === "line" || Array.isArray(e) && e.every(Np);
}
function Pp(e) {
	if (typeof e == "string") return e.length === 0;
	if (Mp(e) && e.type === "line") return !e.keepIfLonely;
	if (Array.isArray(e)) return e.length === 0;
	let { contents: t } = e;
	if (t) return Pp(t);
	let { parts: n } = e;
	return n ? Fp(n) : !1;
}
function Fp(e) {
	return !e.find((e) => !Pp(e));
}
function Ip(e, t) {
	return Lp(e, t), Rp(e, t), e;
}
function Lp(e, t) {
	let n = e.findIndex((e) => !Pp(e) && !t(e));
	if (n < 0 && e.length && (n = e.length), n > 0) {
		if (e.splice(0, n).every(Pp)) return Lp(e, t);
	} else {
		let n = zp(e[0]);
		if (n) return Lp(n, t);
	}
}
function Rp(e, t) {
	let n = e.length ? Ep((e) => !Pp(e) && !t(e), e) : 0;
	if (n < e.length - 1) {
		if (e.splice(n + 1).every(Pp)) return Rp(e, t);
	} else {
		let n = zp(e[e.length - 1]);
		if (n) return Rp(n, t);
	}
}
function zp(e) {
	if (typeof e == "object") {
		if (Array.isArray(e)) return e;
		if (e.type === "fill") return e.parts;
		if (e.type === "group") return zp(e.contents);
	}
}
function Bp(e) {
	if (!Array.isArray(e)) return Ip([e], (e) => e === "(" || e === ")")[0];
	let t = [], n = 0, r = !1;
	for (; n < e.length; n++) {
		let i = e[n];
		if (typeof i == "string" && i.startsWith("//")) t.push(i);
		else if (typeof i == "string" && i.startsWith("/*")) t.push(i), r = !0;
		else if (r) t.push(i), r = typeof i != "string" || !i.trim().endsWith("*/");
		else if (t.length > 0 && Np(i)) {
			t.push(i), n++;
			let r = e[n];
			typeof r != "string" && !Array.isArray(r) && r.type === "break-parent" && (t.push(r), n++);
			break;
		} else break;
	}
	return t.push(...Ip(e.slice(n), (e) => e === "(" || e === ")")), t;
}
var Vp = [
	"coffee",
	"coffeescript",
	"styl",
	"stylus",
	"sass"
], Hp = /^[\t\n\f\r ]*$/, Up = /^[\t\n\f\r ]/, Wp = /[\t\n\f\r ]$/, Gp = /^[\t\n\f\r ]+/, Kp = /[\t\n\f\r ]+$/;
function qp(e) {
	return Hp.test(e);
}
function Jp(e, t, n) {
	return n && n.type === "Element" && !Yp(n, t) && !wp(e);
}
function Yp(e, t) {
	return e && e.type === "Element" && t.htmlWhitespaceSensitivity !== "strict" && (t.htmlWhitespaceSensitivity === "ignore" || sp.includes(e.name));
}
function Xp(e) {
	return [
		"IfBlock",
		"SnippetBlock",
		"AwaitBlock",
		"CatchBlock",
		"EachBlock",
		"ElseBlock",
		"KeyBlock",
		"PendingBlock",
		"ThenBlock"
	].includes(e.type);
}
function Zp(e) {
	return e.children;
}
function Qp(e) {
	return Zp(e) ? e.children : [];
}
function $p(e) {
	let t = e.getParentNode();
	return Cp(t) && (t = t.html), Qp(t);
}
function em(e, t = e.getNode()) {
	return $p(e).find((e) => e.start === t.end);
}
function tm(e) {
	let t = $p(e), n = e.getNode(), r = t.find((e) => e.end === n.start);
	for (; r;) if (r.type === "Comment" && !am(r) && !om(r)) return r;
	else if (X(r)) n = r, r = t.find((e) => e.end === n.start);
	else return;
}
function nm(e, t, n = $p(t)) {
	if (!rm(e, t)) return !1;
	let r = e.end, i = t.stack[0], a = [
		i.css,
		i.html,
		i.instance,
		i.js,
		i.module
	], o = n[n.indexOf(e) + 1];
	return a.find((e) => e && e.start >= r && (!o || e.end <= o.start));
}
function rm(e, t) {
	let n = t.stack[0];
	return !!n.html && !!n.html.children && n.html.children.includes(e);
}
function X(e) {
	return !!e && e.type === "Text" && qp(xm(e));
}
function im(e) {
	return !!e && e.type === "Comment" && e.data.trim() === "prettier-ignore";
}
function am(e) {
	return !!e && e.type === "Comment" && e.data.trim() === "prettier-ignore-start";
}
function om(e) {
	return !!e && e.type === "Comment" && e.data.trim() === "prettier-ignore-end";
}
function sm(e, t, n = !1) {
	if (e.children.length === 0) return "";
	let r = e.children[0], i = e.children[e.children.length - 1], a = t.substring(r.start, i.end);
	return n ? (Cm(a) && (a = a.substring(a.indexOf("\n") + 1)), Tm(a) && (a = a.substring(0, a.lastIndexOf("\n")), a.charAt(a.length - 1) === "\r" && (a = a.substring(0, a.length - 1))), a) : a;
}
function cm(e) {
	return e.type === "Text";
}
function lm(e, t) {
	let n = (t.attributes ?? []).find((t) => t.name === e);
	return n && n.value;
}
function um(e, t) {
	let n = lm(e, t);
	if (typeof n == "object" && n) {
		let e = n.find(cm);
		if (e) return e.data;
	}
	return null;
}
function dm(e) {
	let t = um("lang", e) || um("type", e);
	return t == null ? null : t.replace(/^text\//, "");
}
function fm(e) {
	let t = dm(e);
	return !(t && Vp.includes(t));
}
function pm(e) {
	let t = dm(e) || "";
	return ["typescript", "ts"].includes(t);
}
function mm(e) {
	let t = dm(e) || "";
	return t.endsWith("json") || t.endsWith("importmap");
}
function hm(e) {
	let t = dm(e) || "";
	return ["less"].includes(t);
}
function gm(e) {
	let t = dm(e) || "";
	return ["sass", "scss"].includes(t);
}
function _m(e) {
	return e.type === "Element" && e.name === "template" && dm(e) === "pug";
}
function vm(e) {
	return e !== !0 && e.length === 1 && e[0].type === "MustacheTag";
}
function ym(e) {
	return e !== !0 && e.length === 1 && e[0].type === "AttributeShorthand";
}
function bm(e) {
	if (ym(e.value)) return !0;
	if (vm(e.value)) {
		let t = e.value[0].expression;
		return t.type === "Identifier" && t.name === e.name;
	}
	return !1;
}
function xm(e) {
	return e.raw || e.data;
}
function Sm(e, t = 1) {
	return e.type === "Text" && Cm(xm(e), t);
}
function Cm(e, t = 1) {
	return RegExp(`^([\\t\\f\\r ]*\\n){${t}}`).test(e);
}
function wm(e, t = 1) {
	return e.type === "Text" && Tm(xm(e), t);
}
function Tm(e, t = 1) {
	return RegExp(`(\\n[\\t\\f\\r ]*){${t}}$`).test(e);
}
function Em(e) {
	return e.type === "Text" && Up.test(xm(e));
}
function Dm(e) {
	return e.type === "Text" && Wp.test(xm(e));
}
function Om(e) {
	e.raw = e.raw && e.raw.replace(Kp, ""), e.data = e.data && e.data.replace(Kp, "");
}
function km(e) {
	e.raw = e.raw && e.raw.replace(Gp, ""), e.data = e.data && e.data.replace(Gp, "");
}
function Am(e, t) {
	let n = e.findIndex((e) => !X(e) && !nm(e, t));
	n = n === -1 ? e.length - 1 : n;
	let r = Ep((n, r) => !X(n) && (r === e.length - 1 && n.type !== "Comment" || !nm(n, t)), e);
	r = r === -1 ? 0 : r;
	for (let t = 0; t <= n; t++) {
		let n = e[t];
		n.type === "Text" && km(n);
	}
	for (let t = e.length - 1; t >= r; t--) {
		let n = e[t];
		n.type === "Text" && Om(n);
	}
}
function jm(e, t, n) {
	if (!t) return !0;
	if (e.type === "SvelteBoundary" || Yp(e, n) || !Zp(e)) return !1;
	let r = e.children;
	if (r.length === 0) return !0;
	if (n.htmlWhitespaceSensitivity === "ignore") return !1;
	let i = r[0];
	return !Em(i);
}
function Mm(e, t, n) {
	if (!t) return !0;
	if (e.type === "SvelteBoundary" || Yp(e, n) || !Zp(e)) return !1;
	let r = e.children;
	if (r.length === 0) return !0;
	if (n.htmlWhitespaceSensitivity === "ignore") return !1;
	let i = r[r.length - 1];
	return !Dm(i);
}
function Nm(e, t) {
	if (!Xp(e) || !Zp(e)) return "none";
	let n = e.children;
	if (n.length === 0) return "none";
	let r = n[0];
	if (Sm(r)) return "line";
	if (Em(r)) return "space";
	let i = t.originalText.lastIndexOf("}", r.start);
	if (i > 0 && r.start > i + 1) {
		let e = t.originalText.substring(i + 1, r.start);
		if (Hp.test(e)) return Cm(e) ? "line" : "space";
	}
	return "none";
}
function Pm(e, t) {
	if (!Xp(e) || !Zp(e)) return "none";
	let n = e.children;
	if (n.length === 0) return "none";
	let r = n[n.length - 1];
	if (wm(r)) return "line";
	if (Dm(r)) return "space";
	let i = t.originalText.indexOf("{", r.end);
	if (i > 0 && r.end < i) {
		let e = t.originalText.substring(r.end, i);
		if (Hp.test(e)) return Tm(e) ? "line" : "space";
	}
	return "none";
}
function Fm(e, t) {
	return e.stack.some((e) => (e.type === "Attribute" || e.type === "StyleDirective") && (!vm(e.value) || t.svelteStrictMode && !t._svelte_is5Plus));
}
function Im(e, t, n) {
	return Sp(n) && (!Lm(e, n) || Rm(t, n));
}
function Lm(e, t) {
	return e.end === t.originalText.length ? !1 : !Up.test(t.originalText.substring(e.end));
}
function Rm(e, t) {
	let n = e.getParentNode();
	if (!n || !Yp(n, t)) return !1;
	let r = Qp(n);
	return r[r.length - 1] === e.getNode();
}
function zm(e) {
	e.module && (e.module.comments = Bm(e, e.module)), e.instance && (e.instance.comments = Bm(e, e.instance)), e.css && (e.css.comments = Bm(e, e.css));
}
function Bm(e, t) {
	let n = Qp(e.html), r = [], i = [];
	if (!n.length) return [];
	let a = t, o = n.find((e) => e.end === a.start);
	for (; o;) {
		if (o.type === "Comment" && !am(o) && !om(o)) r.push(o), r.length !== i.length && i.push({
			type: "Text",
			data: "",
			raw: "",
			start: -1,
			end: -1
		});
		else if (X(o)) i.push(o);
		else break;
		a = o, o = n.find((e) => e.end === a.start);
	}
	i.length = r.length;
	for (let e of r) n.splice(n.indexOf(e), 1);
	for (let e of i) n.splice(n.indexOf(e), 1);
	return r.map((e, t) => ({
		comment: e,
		emptyLineAfter: xm(i[t]).split("\n").length > 2
	})).reverse();
}
var { join: Vm, line: Hm, group: Z, indent: Um, dedent: Wm, softline: Gm, hardline: Q, fill: Km, breakParent: qm, literalline: Jm } = c.builders;
function Ym(e) {
	return /^\s*<!--\s*@(format|prettier)\W/.test(e);
}
var Xm = !1, Zm = !1, Qm;
function $m(e, t, n) {
	let r = Sp(t), i = e.getValue();
	if (!i) return "";
	if (Cp(i)) return eh(i, t, e, n);
	let [a, o] = t.svelteStrictMode && !t._svelte_is5Plus ? ["\"{", "}\""] : ["{", "}"], s = () => [
		a,
		$(e, n, "expression"),
		o
	], c = i;
	if ((Xm || Zm && !om(c)) && (c.type !== "Text" || !X(c))) return Xm &&= !1, Tp(t.originalText.slice(t.locStart(c), t.locEnd(c)).split("\n").map((e, t) => t == 0 ? [e] : [Jm, e]));
	switch (c.type) {
		case "Fragment":
			let i = c.children;
			if (i.length === 0 || i.every(X)) return "";
			if (wp(e)) return Z(e.map(n, "children"));
			{
				Am(c.children, e);
				let r = Ip([ih(e, n, t)], (e) => Np(e) || typeof e == "string" && qp(e) || e === qm);
				return r.every((e) => Pp(e)) ? "" : Z([...r, Q]);
			}
		case "Text": if (wp(e)) {
			let t = xm(c), n = e.getParentNode();
			return n.type === "Attribute" ? (n.name === "class" && e.getParentNode(1).type === "Element" && (t = t.replace(/([^ \t\n])(([ \t]+$)|([ \t]+(\r?\n))|[ \t]+)/g, (e, t, n, r, i, a) => r ? e : t + (i ? a : " ")), t = t.replace(/([^ \t\n])[ \t]+$/, n.value.indexOf(c) === n.value.length - 1 ? "$1" : "$1 ")), Dp(t, Jm)) : t;
		} else {
			if (X(c)) {
				let e = xm(c), t = e.length > 0, n = /\n/.test(e);
				return /\n\r?[\t\n\f\r ]*\n\r?/.test(e) ? [Q, Q] : n ? Q : t ? Hm : "";
			}
			return Km(oh(c));
		}
		case "Element":
		case "InlineComponent":
		case "Slot":
		case "SlotTemplate":
		case "Window":
		case "Head":
		case "SvelteBoundary":
		case "Title": {
			let i = !(c.name === "template" && !fm(c)), l = c.children.every((e) => X(e)), u = c.name.toUpperCase() === "!DOCTYPE", d = t.originalText[c.end - 2] === "/", f = l && ((c.type === "Element" && !t.svelteStrictMode || c.type === "Head" || c.type === "InlineComponent" || c.type === "Slot" || c.type === "SlotTemplate" || c.type === "SvelteBoundary" || c.type === "Title") && d || c.type === "Window" || op.indexOf(c.name) !== -1 || u), p = e.map(kp(c, t, n), "attributes"), m = Op(c, t), h = c.type === "InlineComponent" && c.expression ? [
				m,
				"this=",
				...s()
			] : c.type === "Element" && c.tag ? [
				m,
				"this=",
				...typeof c.tag == "string" ? [`"${c.tag}"`] : [
					a,
					$(e, n, "tag"),
					o
				]
			] : "";
			if (f) return Z([
				"<",
				c.name,
				Um(Z([
					h,
					...p,
					r || u ? "" : Wm(Hm)
				])),
				r && !u ? " " : "",
				`${u ? "" : "/"}>`
			]);
			let g = c.children, _ = g[0], v = g[g.length - 1], y, b = jm(c, i, t), ee = Mm(c, i, t);
			y = l ? Jp(e, t, c) && c.children.length && Em(c.children[0]) && !wp(e) ? () => Hm : () => r ? Gm : "" : wp(e) ? () => rh(c, t.originalText, e, n) : i ? (Jp(e, t, c) && wp(e), () => ih(e, n, t)) : () => sm(c, t.originalText, !0);
			let te = [
				"<",
				c.name,
				Um(Z([
					h,
					...p,
					b && !l ? "" : !r && !wp(e) ? Wm(Gm) : ""
				]))
			];
			if (!i && !l) return Z([
				...te,
				">",
				Z([
					Q,
					y(),
					Q
				]),
				`</${c.name}>`
			]);
			if (b && ee) {
				let n = [Gm, Z([
					">",
					y(),
					`</${c.name}`
				])], i = l && !r || Im(c, e, t);
				return Z([
					...te,
					Z(l ? n : Um(n)),
					i ? "" : Gm,
					">"
				]);
			}
			let ne = Gm, re = Gm;
			if (wp(e)) ne = "", re = "";
			else {
				let n = !1;
				!b && _ && _.type === "Text" && (Sm(_) && _ !== v && (!Jp(e, t, c) || Dm(v)) ? (ne = Q, re = Q, n = !0) : Jp(e, t, c) && (ne = Hm), km(_)), !ee && v && v.type === "Text" && (Jp(e, t, c) && !n && (re = Hm), Om(v));
			}
			return Z(b ? [
				...te,
				Um([Gm, Z([">", y()])]),
				re,
				`</${c.name}>`
			] : ee ? [
				...te,
				">",
				Um([ne, Z([y(), `</${c.name}`])]),
				Im(c, e, t) ? "" : Gm,
				">"
			] : l ? [
				...te,
				">",
				y(),
				`</${c.name}>`
			] : [
				...te,
				">",
				Um([ne, y()]),
				re,
				`</${c.name}>`
			]);
		}
		case "Options": if (t.svelteSortOrder !== "none") throw Error("Options tags should have been handled by prepareChildren");
		case "Body":
		case "Document":
		case "SvelteHTML": return Z([
			"<",
			c.name,
			Um(Z([...e.map(kp(c, t, n), "attributes"), r ? "" : Wm(Hm)])),
			r ? " " : "",
			"/>"
		]);
		case "Identifier": return c.name;
		case "AttributeShorthand": return c.expression.name;
		case "Attribute":
			if (bm(c)) return t.svelteAllowShorthand ? [
				"{",
				c.name,
				"}"
			] : [
				c.name,
				`=${a}`,
				c.name,
				o
			];
			{
				if (c.value === !0) return [c.name];
				let r = !vm(c.value) || ((t.svelteStrictMode && !t._svelte_is5Plus) ?? !1), i = th(e, n, r, c);
				return r ? [
					c.name,
					"=",
					"\"",
					i,
					"\""
				] : [
					c.name,
					"=",
					i
				];
			}
		case "MustacheTag": return [
			"{",
			$(e, n, "expression"),
			"}"
		];
		case "IfBlock": {
			let r = [
				"{#if ",
				$(e, n, "expression"),
				"}",
				nh(e, n, t)
			];
			return c.else && r.push(e.call(n, "else")), r.push("{/if}"), Z([r, qm]);
		}
		case "ElseBlock": {
			let r = e.getParentNode();
			if (c.children.length === 1 && c.children[0].type === "IfBlock" && r.type !== "EachBlock") {
				let r = c.children[0], i = [
					"{:else if ",
					e.map((e) => $(e, n, "expression"), "children")[0],
					"}",
					e.map((e) => nh(e, n, t), "children")[0]
				];
				return r.else && i.push(e.map((e) => e.call(n, "else"), "children")[0]), i;
			}
			return ["{:else}", nh(e, n, t)];
		}
		case "EachBlock": {
			let r = ["{#each ", $(e, n, "expression")];
			return c.context && r.push(" as", sh(c.context, t.originalText)), c.index && r.push(", ", c.index), c.key && r.push(" (", $(e, n, "key"), ")"), r.push("}", nh(e, n, t)), c.else && r.push(e.call(n, "else")), r.push("{/each}"), Z([r, qm]);
		}
		case "AwaitBlock": {
			let r = c.pending.children.some((e) => !X(e)), i = c.then.children.some((e) => !X(e)), a = c.catch.children.some((e) => !X(e)), o = [];
			return !r && i ? o.push(Z([
				"{#await ",
				$(e, n, "expression"),
				" then",
				sh(c.value, t.originalText),
				"}"
			]), e.call(n, "then")) : !r && a ? o.push(Z([
				"{#await ",
				$(e, n, "expression"),
				" catch",
				sh(c.error, t.originalText),
				"}"
			]), e.call(n, "catch")) : (o.push(Z([
				"{#await ",
				$(e, n, "expression"),
				"}"
			])), r && o.push(e.call(n, "pending")), i && o.push(Z([
				"{:then",
				sh(c.value, t.originalText),
				"}"
			]), e.call(n, "then"))), (r || i) && a && o.push(Z([
				"{:catch",
				sh(c.error, t.originalText),
				"}"
			]), e.call(n, "catch")), o.push("{/await}"), Z(o);
		}
		case "KeyBlock": {
			let r = [
				"{#key ",
				$(e, n, "expression"),
				"}",
				nh(e, n, t)
			];
			return r.push("{/key}"), Z([r, qm]);
		}
		case "ThenBlock":
		case "PendingBlock":
		case "CatchBlock": return nh(e, n, t);
		case "SnippetBlock": {
			let r = ["{#snippet ", $(e, n, "expression")];
			return r.push("}", nh(e, n, t), "{/snippet}"), r;
		}
		case "EventHandler": return [
			"on:",
			c.name,
			c.modifiers && c.modifiers.length ? ["|", Vm("|", c.modifiers)] : "",
			c.expression ? ["=", ...s()] : ""
		];
		case "Binding": return [
			"bind:",
			c.name,
			c.expression.type === "Identifier" && c.expression.name === c.name && t.svelteAllowShorthand ? "" : ["=", ...s()]
		];
		case "Class": return [
			"class:",
			c.name,
			c.expression.type === "Identifier" && c.expression.name === c.name && t.svelteAllowShorthand ? "" : ["=", ...s()]
		];
		case "StyleDirective":
			let l = [
				"style:",
				c.name,
				c.modifiers && c.modifiers.length ? ["|", Vm("|", c.modifiers)] : ""
			];
			if (bm(c) || c.value === !0) return t.svelteAllowShorthand ? [...l] : [
				...l,
				`=${a}`,
				c.name,
				o
			];
			{
				let r = !vm(c.value) || ((t.svelteStrictMode && !t._svelte_is5Plus) ?? !1), i = th(e, n, r, c);
				return r ? [
					...l,
					"=",
					"\"",
					i,
					"\""
				] : [
					...l,
					"=",
					i
				];
			}
		case "Let": return [
			"let:",
			c.name,
			!c.expression || c.expression.type === "Identifier" && c.expression.name === c.name ? "" : ["=", ...s()]
		];
		case "DebugTag": return [
			"{@debug",
			c.identifiers.length > 0 ? [" ", Vm(", ", e.map(n, "identifiers"))] : "",
			"}"
		];
		case "Ref": return ["ref:", c.name];
		case "Comment": {
			let t = em(e);
			if (am(c) && rm(c, e)) Zm = !0;
			else if (om(c) && rm(c, e)) Zm = !1;
			else if (nm(c, e) || X(t) && nm(t, e)) return "";
			else im(c) && (Xm = !0);
			return lh(c);
		}
		case "Transition": return [
			c.intro && c.outro ? "transition" : c.intro ? "in" : "out",
			":",
			c.name,
			c.modifiers && c.modifiers.length ? ["|", Vm("|", c.modifiers)] : "",
			c.expression ? ["=", ...s()] : ""
		];
		case "Action": return [
			"use:",
			c.name,
			c.expression ? ["=", ...s()] : ""
		];
		case "Animation": return [
			"animate:",
			c.name,
			c.expression ? ["=", ...s()] : ""
		];
		case "RawMustacheTag": return [
			"{@html ",
			$(e, n, "expression"),
			"}"
		];
		case "RenderTag": return [
			"{@render ",
			$(e, n, "expression"),
			"}"
		];
		case "AttachTag": return [
			"{@attach ",
			$(e, n, "expression"),
			"}"
		];
		case "Spread": return [
			"{...",
			$(e, n, "expression"),
			"}"
		];
		case "ConstTag": return [
			"{@const ",
			$(e, n, "expression"),
			"}"
		];
	}
	throw console.error(JSON.stringify(c, null, 4)), Error("unknown node type: " + c.type);
}
function eh(e, t, n, r) {
	if (t.svelteSortOrder === "none") {
		let i = {}, a = {};
		e.module && (i[e.module.end] = e.module, a[e.module.start] = e.module), e.instance && (i[e.instance.end] = e.instance, a[e.instance.start] = e.instance), e.css && (i[e.css.end] = e.css, a[e.css.start] = e.css);
		let o = Qp(e.html);
		for (let e = 0; e < o.length; e++) {
			let t = o[e];
			i[t.start] ? (o.splice(e, 0, i[t.start]), delete i[t.start]) : e === o.length - 1 && a[t.end] && o.push(a[t.end]);
		}
		let s = n.call(r, "html");
		return t.insertPragma && !Ym(t.originalText) ? [
			"<!-- @format -->",
			Q,
			s
		] : s;
	}
	let i = {
		options: [],
		scripts: [],
		markup: [],
		styles: []
	};
	e.module && i.scripts.push(n.call(r, "module")), e.instance && i.scripts.push(n.call(r, "instance")), e.css && i.styles.push(n.call(r, "css"));
	let a = n.call(r, "html");
	a && i.markup.push(a), Qm && i.options.push(Qm);
	let o = Tp(xp(t.svelteSortOrder).map((e) => i[e]));
	if (Xm = !1, Zm = !1, Qm = void 0, t.parentParser === "markdown") {
		let e = o[o.length - 1];
		Rp([e], Np);
	}
	return t.insertPragma && !Ym(t.originalText) ? [
		"<!-- @format -->",
		Q,
		Z(o)
	] : Z([Vm(Q, o)]);
}
function th(e, t, n, r) {
	let i = e.map((e) => e.call(t), "value");
	return !n || !cp.includes(r.name) ? i : Um(Z(Ip(i, Np)));
}
function nh(e, t, n) {
	let r = e.getValue(), i = r.children;
	if (!i || i.length === 0) return "";
	let a = Nm(r, n), o = Pm(r, n), s = a === "none" ? "" : o === "line" || a === "line" ? Q : Hm, c = o === "none" ? "" : o === "line" || a === "line" ? Q : Hm, l = i[0], u = i[i.length - 1];
	return Em(l) && km(l), Dm(u) && Om(u), [Um([s, Z(ih(e, t, n))]), c];
}
function rh(e, t, n, r) {
	let i = [], a = e.children.length;
	for (let o = 0; o < a; o++) {
		let a = e.children[o];
		a.type === "Text" ? t.substring(a.start, a.end).split(/\r?\n/).forEach((e, t) => {
			t > 0 && i.push(Jm), i.push(e);
		}) : i.push(n.call(r, "children", o));
	}
	return i;
}
function ih(e, t, n) {
	if (wp(e)) return e.map(t, "children");
	let r = ah(e.getValue().children, e, t, n);
	if (e.getValue().children = r, r.length === 0) return "";
	let i = [], a = !1;
	for (let t = 0; t < r.length; t++) {
		let u = r[t];
		u.type === "Text" ? l(t, u) : Yp(u, n) ? c(t) : Jp(e, n, u) ? s(t) : (i.push(o(t)), a = !1);
	}
	return r.length > 1 && r.some((e) => Yp(e, n)) && i.push(qm), i;
	function o(n) {
		return e.call(t, "children", n);
	}
	function s(e) {
		a ? i.push(Z([Hm, o(e)])) : i.push(o(e)), a = !1;
	}
	function c(t) {
		let s = r[t - 1];
		s && !Yp(s, n) && (s.type !== "Text" || a || !Dm(s)) && i.push(Gm), i.push(o(t));
		let c = r[t + 1];
		c && (c.type !== "Text" || (!X(c) || r[t + 2] && Jp(e, n, r[t + 2])) && !Sm(c)) && i.push(Gm), a = !1;
	}
	function l(t, s) {
		if (a = !1, t === 0 || t === r.length - 1) {
			i.push(o(t));
			return;
		}
		let c = r[t - 1], l = r[t + 1];
		if (Em(s) && !X(s)) {
			if (Jp(e, n, c) && !Sm(s)) {
				km(s);
				let e = i.pop();
				i.push(Z([e, Hm]));
			}
			Yp(c, n) && !Sm(s) && km(s);
		}
		Dm(s) && (Jp(e, n, l) && !wm(s) && (a = !c || !Yp(c, n), Om(s)), Yp(l, n) && !wm(s, 2) && (a = !c || !Yp(c, n), Om(s))), i.push(o(t));
	}
}
function ah(e, t, n, r) {
	let i, a = [], o = Sp(r);
	for (let o = 0; o < e.length; o++) {
		let s = e[o];
		if (!(s.type === "Text" && xm(s) === "") && !(X(s) && nm(s, t))) {
			if (r.svelteSortOrder !== "none") {
				if (l(s, o)) {
					i = lh(s);
					let t = e[o + 1];
					o += t && X(t) ? 1 : 0;
					continue;
				}
				if (s.type === "Options") {
					c(s, o, t, n);
					continue;
				}
			}
			a.push(s);
		}
	}
	let s = [];
	for (let e = 0; e < a.length; e++) {
		let t = a[e], n = a[e + 1];
		t.type === "Text" && n && n.type === "Text" && (t.raw += n.raw, t.data += n.data, e++), s.push(t);
	}
	return s;
	function c(e, t, n, a) {
		Qm = Z([[
			"<",
			e.name,
			Um(Z([...n.map(kp(e, r, a), "children", t, "attributes"), o ? "" : Wm(Hm)])),
			o ? " " : "",
			"/>"
		], Q]), i && (Qm = Z([
			i,
			Q,
			Qm
		]));
	}
	function l(t, n) {
		if (t.type !== "Comment" || om(t) || am(t)) return !1;
		let r = e[n + 1];
		if (r) {
			if (X(r)) {
				let t = e[n + 2];
				return t && t.type === "Options";
			}
			return r.type === "Options";
		}
		return !1;
	}
}
function oh(e) {
	let t = xm(e), n = Vm(Hm, t.split(/[\t\n\f\r ]+/)).filter((e) => e !== "");
	return Cm(t) && (n[0] = Q), Cm(t, 2) && (n = [Q, ...n]), Tm(t) && (n[n.length - 1] = Q), Tm(t, 2) && (n = [...n, Q]), n;
}
function $(e, t, n) {
	return e.call(t, n);
}
function sh(e, t) {
	let n = ch(e, t);
	return e?.typeAnnotation && (n += ": " + t.slice(e.typeAnnotation.typeAnnotation.start, e.typeAnnotation.typeAnnotation.end)), n;
}
function ch(e, t, n) {
	if (e === null) return "";
	if (typeof e == "string") return " " + e;
	switch (e.type) {
		case "ArrayExpression":
		case "ArrayPattern": return " [" + e.elements.map((e) => e === null ? " " : ch(e, t)).join(",").slice(1) + "]";
		case "AssignmentPattern": return ch(e.left, t) + " =" + ch(e.right, t);
		case "Identifier": return " " + e.name;
		case "Literal": return " " + e.raw;
		case "ObjectExpression": return " {" + e.properties.map((n) => ch(n, t, e)).join(",") + " }";
		case "ObjectPattern": return " {" + e.properties.map((e) => ch(e, t)).join(",") + " }";
		case "Property": {
			let r = "";
			return e.computed && (r = typeof e.key?.start == "number" && typeof e.key?.end == "number" ? t.slice(e.key.start, e.key.end) : ch(e.key, t).trim()), e.value.type === "ObjectPattern" || e.value.type === "ArrayPattern" ? (e.computed ? " [" + r + "]" : " " + e.key.name) + ":" + ch(e.value, t) : e.value.type === "Identifier" && e.key.name !== e.value.name || n && n.type === "ObjectExpression" ? (e.computed ? " [" + r + "]" : ch(e.key, t)) + ":" + ch(e.value, t) : ch(e.value, t);
		}
		case "RestElement": return " ..." + e.argument.name;
	}
	throw console.error(JSON.stringify(e, null, 4)), Error("unknown node type: " + e.type);
}
function lh(e) {
	let t = e.data;
	return gp(t) && (t = vp(t)), Z([
		"<!--",
		t,
		"-->"
	]);
}
function uh(e, t, n = !1) {
	let r = e.leadingComments, i = t.originalText.slice(t.locStart(r && r[0] || e), t.locEnd(e));
	return !n || !gp(i) ? i : vp(i);
}
var dh = /<[a-z]+((?:\s+[^=>'"\/]+=(?:"[^"]*"|'[^']*'|[^>\s]+)|\s+[^=>'"\/]+)*\s*)>/im, fh = /([^\s=]+)(?:=(?:(?:("|')([\s\S]*?)\2)|(?:([^>\s]+?)(?:\s|>|$))))?/gim;
function ph(e) {
	let [, t] = e.match(dh), n = [], r;
	for (; r = fh.exec(t);) {
		let [e, t, i, a, o] = r, s = a || o, c = r.index, l;
		if (!s) l = !0;
		else {
			let e = c + t.length;
			i && (e += 2), l = [{
				type: "Text",
				data: s,
				start: e,
				end: e + s.length
			}];
		}
		n.push({
			type: "Attribute",
			name: t,
			value: l,
			start: c,
			end: c + e.length
		});
	}
	return n;
}
var { builders: { group: mh, hardline: hh, softline: gh, indent: _h, dedent: vh, literalline: yh }, utils: { removeLines: bh } } = c, xh = new Set([
	"Script",
	"Style",
	"Identifier",
	"MemberExpression",
	"CallExpression",
	"ArrowFunctionExpression"
]), Sh = new Set([
	"start",
	"end",
	"type"
]);
function Ch(e, t) {
	return Object.keys(e).filter((n) => !t.has(n) && !xh.has(e.type) && !Sh.has(n));
}
function wh(e, t) {
	let n = e.getNode(), r = t;
	if (!r.locStart || !r.locEnd || !r.originalText) throw Error("Missing required options");
	if (Cp(n)) return zm(n), Mh(n, r.originalText), n.module && (n.module.type = "Script", n.module.attributes = ph(uh(n.module, r))), n.instance && (n.instance.type = "Script", n.instance.attributes = ph(uh(n.instance, r))), n.css && (n.css.type = "Style", n.css.content.type = "StyleProgram"), null;
	let i = e.getParentNode(), a = () => i.expression ? jh(i, "expression", { forceSingleQuote: (r.svelteStrictMode && !r._svelte_is5Plus) ?? !1 }) : void 0, o = (e) => jh(i, e, { forceSingleLine: !0 });
	switch (i.type) {
		case "IfBlock":
		case "ElseBlock":
		case "AwaitBlock":
		case "KeyBlock":
			o("expression");
			break;
		case "EachBlock":
			o("expression"), o("key");
			break;
		case "SnippetBlock":
			n === i.expression && (i.expression.end = r.originalText.indexOf(")", i.parameters?.[i.parameters.length - 1]?.typeAnnotation?.end ?? i.parameters?.[i.parameters.length - 1]?.end ?? i.expression.end) + 1, i.parameters = null, n.isJS = !0, n.asFunction = !0);
			break;
		case "Element":
			jh(i, "tag", { forceSingleQuote: (r.svelteStrictMode && !r._svelte_is5Plus) ?? !1 });
			break;
		case "MustacheTag":
			jh(i, "expression", { forceSingleQuote: Fm(e, r) });
			break;
		case "RawMustacheTag":
			jh(i, "expression", {});
			break;
		case "Spread":
			jh(i, "expression", {});
			break;
		case "AttachTag":
			jh(i, "expression", {});
			break;
		case "ConstTag":
			jh(i, "expression", { removeParentheses: !0 });
			break;
		case "Binding":
			jh(i, "expression", {
				removeParentheses: i.expression.type === "SequenceExpression",
				surroundWithSoftline: !0
			});
			break;
		case "RenderTag":
			n === i.expression && (("argument" in i || "arguments" in i) && (i.expression.end = r.originalText.indexOf(")", i.argument?.end ?? i.arguments?.[i.arguments.length - 1]?.end ?? i.expression.end) + 1, i.argument = null, i.arguments = null), jh(i, "expression", {}));
			break;
		case "EventHandler":
		case "Binding":
		case "Class":
		case "Let":
		case "Transition":
		case "Action":
		case "Animation":
		case "InlineComponent":
			a();
			break;
	}
	if (n.isJS) return (e) => ap(this, void 0, void 0, function* () {
		try {
			let t = {
				parser: r._svelte_ts ? "svelteTSExpressionParser" : "svelteExpressionParser",
				singleQuote: n.forceSingleQuote ? !0 : r.singleQuote,
				_svelte_asFunction: n.asFunction
			}, i = uh(n, r, !0), a = yield e(n.asFunction ? Eh(i) : Th(i), t);
			if (n.forceSingleLine && (a = bh(a)), n.removeParentheses && (a = Bp(a)), n.asFunction) if (Array.isArray(a) && typeof a[0] == "string") a[0] = a[0].replace("function ", ""), a.splice(-1, 1);
			else throw Error("Prettier AST changed, asFunction logic needs to change");
			return n.surroundWithSoftline && (a = mh(_h([
				gh,
				mh(a),
				vh(gh)
			]))), a;
		} catch {
			return uh(n, r, !0);
		}
	});
	let s = (t, n, i) => (a, o) => ap(this, void 0, void 0, function* () {
		return Ah(t, r.originalText, e, (e) => kh(e, n, a, r), o, i, r);
	}), c = (e) => s("script", pm(n) ? "typescript" : mm(n) ? "json" : "babel-ts", e), l = (e) => s("style", hm(n) ? "less" : gm(n) ? "scss" : "css", e), u = () => s("template", "pug", !1);
	switch (n.type) {
		case "Script": return c(!0);
		case "Style": return l(!0);
		case "Element":
			if (n.name === "script") return c(!1);
			if (n.name === "style") return l(!1);
			if (_m(n)) return u();
	}
	return null;
}
function Th(e) {
	return `(${e}\n)`;
}
function Eh(e) {
	return `function ${e} {}`;
}
function Dh(e) {
	return e ? [
		yh,
		e.replace(/^[\t\f\r ]*\n/, "").replace(/\n[\t\f\r ]*$/, ""),
		hh
	] : "";
}
function Oh(e) {
	let t = um(dp, e);
	return t ? up(t) : "";
}
function kh(e, t, n, r) {
	return ap(this, void 0, void 0, function* () {
		try {
			let i = yield n(e, { parser: t });
			if (t === "pug" && typeof i == "string") {
				let e = r.useTabs ? "	" : " ".repeat(r.pugTabWidth && r.pugTabWidth > 0 ? r.pugTabWidth : r.tabWidth);
				return [hh, i.split("\n").map((t) => t && e + t).join("\n")];
			}
			return Rp([i], Np), [((e) => r.svelteIndentScriptAndStyle ? _h(e) : e)([hh, i]), hh];
		} catch (t) {
			if (process.env.PRETTIER_DEBUG) throw t;
			return console.error(t), Dh(e);
		}
	});
}
function Ah(e, t, n, r, i, a, o) {
	return ap(this, void 0, void 0, function* () {
		let s = n.getNode(), c = e === "template" ? sm(s, t) : Oh(s), l = s.type === "Script" || s.type === "Style" ? s.comments : [tm(n)].filter(Boolean).map((e) => ({
			comment: e,
			emptyLineAfter: !1
		})), u = fm(s) && !im(l[l.length - 1]?.comment) && (e !== "template" || o.plugins.some((e) => typeof e != "string" && e.parsers && e.parsers.pug)) ? c.trim() === "" ? c === "" ? "" : hh : yield r(c) : Dh(c), d = mh([
			mh([
				"<",
				e,
				_h(mh([...n.map(kp(s, o, i), "attributes"), Sp(o) ? "" : vh(gh)])),
				">"
			]),
			u,
			"</",
			e,
			">"
		]), f = [];
		for (let e of l) f.push("<!--", e.comment.data, "-->"), f.push(hh), e.emptyLineAfter && f.push(hh);
		return a && o.svelteSortOrder !== "none" ? [
			...f,
			d,
			hh
		] : a && f.length ? [...f, d] : d;
	});
}
function jh(e, t, n) {
	let r = e[t];
	!r || typeof r != "object" || (r.isJS = !0, r.forceSingleQuote = n.forceSingleQuote, r.forceSingleLine = n.forceSingleLine, r.removeParentheses = n.removeParentheses, r.surroundWithSoftline = n.surroundWithSoftline);
}
function Mh(e, t) {
	let n = e._comments;
	if (!n || n.length === 0) return;
	let r = /* @__PURE__ */ new Map();
	for (let e of n) r.set(e.start, e);
	Nh(e.html, r, t);
}
function Nh(e, t, n) {
	if (!(!e || typeof e != "object")) {
		if ("attributes" in e && Array.isArray(e.attributes) && e.attributes.length > 0) {
			let r = e.attributes;
			Ph(e.start + 2, r[0].start, null, r[0], t);
			for (let e = 0; e < r.length - 1; e++) Ph(r[e].end, r[e + 1].start, r[e], r[e + 1], t);
			let i = r[r.length - 1], a = n && typeof e.end == "number" ? n.indexOf(">", i.end) : -1;
			a >= 0 && a <= e.end && Ph(i.end, a, i, null, t);
		}
		for (let r of Qp(e)) Nh(r, t, n);
		(e.type === "IfBlock" || e.type === "EachBlock") && e.else && Nh(e.else, t, n), e.type === "AwaitBlock" && (e.pending && Nh(e.pending, t, n), e.then && Nh(e.then, t, n), e.catch && Nh(e.catch, t, n));
	}
}
function Ph(e, t, n, r, i) {
	for (let [a, o] of i) a >= e && o.end <= t && (r ? l.addLeadingComment(r, o) : n && l.addTrailingComment(n, o), i.delete(a));
}
var Fh = s.babel, Ih = s["babel-ts"], Lh = Number(o.split(".")[0]) >= 5;
function Rh(e) {
	return e.start;
}
function zh(e) {
	return e.end;
}
var Bh = [{
	name: "svelte",
	parsers: ["svelte"],
	extensions: [".svelte"],
	vscodeLanguageIds: ["svelte"]
}], Vh = {
	svelte: {
		hasPragma: Ym,
		parse: (e, t) => ap(void 0, void 0, void 0, function* () {
			try {
				let n = np;
				if (t.svelte5CompilerPath) try {
					n = (yield import(t.svelte5CompilerPath)).parse;
				} catch (e) {
					console.warn(`Failed to load Svelte 5 compiler from ${t.svelte5CompilerPath}`), console.warn(e), t.svelte5CompilerPath = void 0;
				}
				let r = n(e);
				return r.__isRoot = !0, r;
			} catch (e) {
				throw e.start != null && e.end != null && (e.loc = {
					start: e.start,
					end: e.end
				}), e;
			}
		}),
		preprocess: (e, t) => {
			let n = hp(e);
			e = n.text.trim(), t.originalText = e;
			let r = !!t.svelte5CompilerPath || Lh;
			return t._svelte_ts = r && n.isTypescript, t._svelte_is5Plus = r, e;
		},
		locStart: Rh,
		locEnd: zh,
		astFormat: "svelte-ast"
	},
	svelteExpressionParser: Object.assign(Object.assign({}, Fh), { parse: (e, t) => {
		let n = Fh.parse(e, t), r = n.program.body[0];
		return t._svelte_asFunction || (r = r.expression), Object.assign(Object.assign({}, n), { program: r });
	} }),
	svelteTSExpressionParser: Object.assign(Object.assign({}, Ih), { parse: (e, t) => {
		let n = Ih.parse(e, t), r = n.program.body[0];
		return t._svelte_asFunction || (r = r.expression), Object.assign(Object.assign({}, n), { program: r });
	} })
}, Hh = { "svelte-ast": {
	print: $m,
	embed: wh,
	getVisitorKeys: Ch,
	isBlockComment(e) {
		return e.type === "Block";
	},
	printComment(e) {
		let t = e.getValue();
		return t.type === "Line" ? "//" + t.value.replace(/\r$/, "") : "/*" + t.value + "*/";
	}
} };
//#endregion
export { Bh as languages, yp as options, Vh as parsers, Hh as printers };
