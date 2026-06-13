import { a as e, c as t, d as n, f as r, g as i, h as a, i as o, l as s, m as c, n as l, o as u, p as d, r as ee, s as f, t as te, u as ne } from "./editor.api2-CtWTQNoW.js";
import { t as re } from "./monaco.contribution-DWKrNp_R.js";
import { t as ie } from "./workers-6gBsU0l5.js";
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/css/monaco.contribution.js
var ae = /* @__PURE__ */ i({
	cssDefaults: () => oe,
	lessDefaults: () => ce,
	scssDefaults: () => se
}), p = class {
	constructor(e, t, n) {
		this._onDidChange = new l(), this._languageId = e, this.setOptions(t), this.setModeConfiguration(n);
	}
	get onDidChange() {
		return this._onDidChange.event;
	}
	get languageId() {
		return this._languageId;
	}
	get modeConfiguration() {
		return this._modeConfiguration;
	}
	get diagnosticsOptions() {
		return this.options;
	}
	get options() {
		return this._options;
	}
	setOptions(e) {
		this._options = e || /* @__PURE__ */ Object.create(null), this._onDidChange.fire(this);
	}
	setDiagnosticsOptions(e) {
		this.setOptions(e);
	}
	setModeConfiguration(e) {
		this._modeConfiguration = e || /* @__PURE__ */ Object.create(null), this._onDidChange.fire(this);
	}
}, m = {
	validate: !0,
	lint: {
		compatibleVendorPrefixes: "ignore",
		vendorPrefix: "warning",
		duplicateProperties: "warning",
		emptyRules: "warning",
		importStatement: "ignore",
		boxModel: "ignore",
		universalSelector: "ignore",
		zeroUnits: "ignore",
		fontFaceProperties: "warning",
		hexColorLength: "error",
		argumentsInColorFunction: "error",
		unknownProperties: "warning",
		ieHack: "ignore",
		unknownVendorSpecificProperties: "ignore",
		propertyIgnoredDueToDisplay: "warning",
		important: "ignore",
		float: "ignore",
		idSelector: "ignore"
	},
	data: { useDefaultDataProvider: !0 },
	format: {
		newlineBetweenSelectors: !0,
		newlineBetweenRules: !0,
		spaceAroundSelectorSeparator: !1,
		braceStyle: "collapse",
		maxPreserveNewLines: void 0,
		preserveNewLines: !0
	}
}, h = {
	completionItems: !0,
	hovers: !0,
	documentSymbols: !0,
	definitions: !0,
	references: !0,
	documentHighlights: !0,
	rename: !0,
	colors: !0,
	foldingRanges: !0,
	diagnostics: !0,
	selectionRanges: !0,
	documentFormattingEdits: !0,
	documentRangeFormattingEdits: !0
}, oe = new p("css", m, h), se = new p("scss", m, h), ce = new p("less", m, h);
function g() {
	return import("./cssMode-kLSonU7x.js");
}
a.onLanguage("less", () => {
	g().then((e) => e.setupMode(ce));
}), a.onLanguage("scss", () => {
	g().then((e) => e.setupMode(se));
}), a.onLanguage("css", () => {
	g().then((e) => e.setupMode(oe));
});
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/html/monaco.contribution.js
var le = /* @__PURE__ */ i({
	handlebarDefaults: () => ge,
	handlebarLanguageService: () => he,
	htmlDefaults: () => me,
	htmlLanguageService: () => pe,
	razorDefaults: () => ve,
	razorLanguageService: () => _e,
	registerHTMLLanguageService: () => b
}), ue = class {
	constructor(e, t, n) {
		this._onDidChange = new l(), this._languageId = e, this.setOptions(t), this.setModeConfiguration(n);
	}
	get onDidChange() {
		return this._onDidChange.event;
	}
	get languageId() {
		return this._languageId;
	}
	get options() {
		return this._options;
	}
	get modeConfiguration() {
		return this._modeConfiguration;
	}
	setOptions(e) {
		this._options = e || /* @__PURE__ */ Object.create(null), this._onDidChange.fire(this);
	}
	setModeConfiguration(e) {
		this._modeConfiguration = e || /* @__PURE__ */ Object.create(null), this._onDidChange.fire(this);
	}
}, _ = {
	format: {
		tabSize: 4,
		insertSpaces: !1,
		wrapLineLength: 120,
		unformatted: "default\": \"a, abbr, acronym, b, bdo, big, br, button, cite, code, dfn, em, i, img, input, kbd, label, map, object, q, samp, select, small, span, strong, sub, sup, textarea, tt, var",
		contentUnformatted: "pre",
		indentInnerHtml: !1,
		preserveNewLines: !0,
		maxPreserveNewLines: void 0,
		indentHandlebars: !1,
		endWithNewline: !1,
		extraLiners: "head, body, /html",
		wrapAttributes: "auto"
	},
	suggest: {},
	data: { useDefaultDataProvider: !0 }
};
function v(e) {
	return {
		completionItems: !0,
		hovers: !0,
		documentSymbols: !0,
		links: !0,
		documentHighlights: !0,
		rename: !0,
		colors: !0,
		foldingRanges: !0,
		selectionRanges: !0,
		diagnostics: e === y,
		documentFormattingEdits: e === y,
		documentRangeFormattingEdits: e === y
	};
}
var y = "html", de = "handlebars", fe = "razor", pe = b(y, _, v(y)), me = pe.defaults, he = b(de, _, v(de)), ge = he.defaults, _e = b(fe, _, v(fe)), ve = _e.defaults;
function ye() {
	return import("./htmlMode-l_KAuGdd.js");
}
function b(e, t = _, n = v(e)) {
	let r = new ue(e, t, n), i, o = a.onLanguage(e, async () => {
		i = (await ye()).setupMode(r);
	});
	return {
		defaults: r,
		dispose() {
			o.dispose(), i?.dispose(), i = void 0;
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/language/json/monaco.contribution.js
var be = /* @__PURE__ */ i({
	getWorker: () => Se,
	jsonDefaults: () => xe
}), xe = new class {
	constructor(e, t, n) {
		this._onDidChange = new l(), this._languageId = e, this.setDiagnosticsOptions(t), this.setModeConfiguration(n);
	}
	get onDidChange() {
		return this._onDidChange.event;
	}
	get languageId() {
		return this._languageId;
	}
	get modeConfiguration() {
		return this._modeConfiguration;
	}
	get diagnosticsOptions() {
		return this._diagnosticsOptions;
	}
	setDiagnosticsOptions(e) {
		this._diagnosticsOptions = e || /* @__PURE__ */ Object.create(null), this._onDidChange.fire(this);
	}
	setModeConfiguration(e) {
		this._modeConfiguration = e || /* @__PURE__ */ Object.create(null), this._onDidChange.fire(this);
	}
}("json", {
	validate: !0,
	allowComments: !0,
	schemas: [],
	enableSchemaRequest: !1,
	schemaRequest: "warning",
	schemaValidation: "warning",
	comments: "error",
	trailingCommas: "error"
}, {
	documentFormattingEdits: !0,
	documentRangeFormattingEdits: !0,
	completionItems: !0,
	hovers: !0,
	documentSymbols: !0,
	tokens: !0,
	colors: !0,
	foldingRanges: !0,
	diagnostics: !0,
	selectionRanges: !0
}), Se = () => Ce().then((e) => e.getWorker());
function Ce() {
	return import("./jsonMode-C9HyZbd9.js");
}
a.register({
	id: "json",
	extensions: [
		".json",
		".bowerrc",
		".jshintrc",
		".jscsrc",
		".eslintrc",
		".babelrc",
		".har"
	],
	aliases: ["JSON", "json"],
	mimetypes: ["application/json"]
}), a.onLanguage("json", () => {
	Ce().then((e) => e.setupMode(xe));
});
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/basic-languages/_.contribution.js
var we = {}, Te = {}, Ee = class e {
	static getOrCreate(t) {
		return Te[t] || (Te[t] = new e(t)), Te[t];
	}
	constructor(e) {
		this._languageId = e, this._loadingTriggered = !1, this._lazyLoadPromise = new Promise((e, t) => {
			this._lazyLoadPromiseResolve = e, this._lazyLoadPromiseReject = t;
		});
	}
	load() {
		return this._loadingTriggered || (this._loadingTriggered = !0, we[this._languageId].loader().then((e) => this._lazyLoadPromiseResolve(e), (e) => this._lazyLoadPromiseReject(e))), this._lazyLoadPromise;
	}
};
function x(e) {
	let t = e.id;
	we[t] = e, a.register(e);
	let n = Ee.getOrCreate(t);
	a.registerTokensProviderFactory(t, { create: async () => (await n.load()).language }), a.onLanguageEncountered(t, async () => {
		let e = await n.load();
		a.setLanguageConfiguration(t, e.conf);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution.js
x({
	id: "abap",
	extensions: [".abap"],
	aliases: ["abap", "ABAP"],
	loader: () => import("./abap-DITqzqhb.js")
}), x({
	id: "apex",
	extensions: [".cls"],
	aliases: ["Apex", "apex"],
	mimetypes: ["text/x-apex-source", "text/x-apex"],
	loader: () => import("./apex-El5e4qCQ.js")
}), x({
	id: "azcli",
	extensions: [".azcli"],
	aliases: ["Azure CLI", "azcli"],
	loader: () => import("./azcli-DuxqGO9h.js")
}), x({
	id: "bat",
	extensions: [".bat", ".cmd"],
	aliases: ["Batch", "bat"],
	loader: () => import("./bat-DIgF08QN.js")
}), x({
	id: "bicep",
	extensions: [".bicep"],
	aliases: ["Bicep"],
	loader: () => import("./bicep-B6UDBWZN.js")
}), x({
	id: "cameligo",
	extensions: [".mligo"],
	aliases: ["Cameligo"],
	loader: () => import("./cameligo-CEqnWRSd.js")
}), x({
	id: "clojure",
	extensions: [
		".clj",
		".cljs",
		".cljc",
		".edn"
	],
	aliases: ["clojure", "Clojure"],
	loader: () => import("./clojure-tM2nCRoU.js")
}), x({
	id: "coffeescript",
	extensions: [".coffee"],
	aliases: [
		"CoffeeScript",
		"coffeescript",
		"coffee"
	],
	mimetypes: ["text/x-coffeescript", "text/coffeescript"],
	loader: () => import("./coffee-BZ5eIxJK.js")
}), x({
	id: "c",
	extensions: [".c", ".h"],
	aliases: ["C", "c"],
	loader: () => import("./cpp-DssdVHV8.js")
}), x({
	id: "cpp",
	extensions: [
		".cpp",
		".cc",
		".cxx",
		".hpp",
		".hh",
		".hxx"
	],
	aliases: [
		"C++",
		"Cpp",
		"cpp"
	],
	loader: () => import("./cpp-DssdVHV8.js")
}), x({
	id: "csharp",
	extensions: [
		".cs",
		".csx",
		".cake"
	],
	aliases: ["C#", "csharp"],
	loader: () => import("./csharp-CzG-Jop7.js")
}), x({
	id: "csp",
	extensions: [".csp"],
	aliases: ["CSP", "csp"],
	loader: () => import("./csp-t-trWNv5.js")
}), x({
	id: "css",
	extensions: [".css"],
	aliases: ["CSS", "css"],
	mimetypes: ["text/css"],
	loader: () => import("./css-jRa-sq2v.js")
}), x({
	id: "cypher",
	extensions: [".cypher", ".cyp"],
	aliases: ["Cypher", "OpenCypher"],
	loader: () => import("./cypher-DKG3uk5Q.js")
}), x({
	id: "dart",
	extensions: [".dart"],
	aliases: ["Dart", "dart"],
	mimetypes: ["text/x-dart-source", "text/x-dart"],
	loader: () => import("./dart-Dt0Ds2JE.js")
}), x({
	id: "dockerfile",
	extensions: [".dockerfile"],
	filenames: ["Dockerfile"],
	aliases: ["Dockerfile"],
	loader: () => import("./dockerfile-B7f_2-Gl.js")
}), x({
	id: "ecl",
	extensions: [".ecl"],
	aliases: [
		"ECL",
		"Ecl",
		"ecl"
	],
	loader: () => import("./ecl-BG5IoyX6.js")
}), x({
	id: "elixir",
	extensions: [".ex", ".exs"],
	aliases: [
		"Elixir",
		"elixir",
		"ex"
	],
	loader: () => import("./elixir-m9TBHpEz.js")
}), x({
	id: "flow9",
	extensions: [".flow"],
	aliases: [
		"Flow9",
		"Flow",
		"flow9",
		"flow"
	],
	loader: () => import("./flow9-Y8AUzhmr.js")
}), x({
	id: "fsharp",
	extensions: [
		".fs",
		".fsi",
		".ml",
		".mli",
		".fsx",
		".fsscript"
	],
	aliases: [
		"F#",
		"FSharp",
		"fsharp"
	],
	loader: () => import("./fsharp-D8gz2am9.js")
}), x({
	id: "freemarker2",
	extensions: [
		".ftl",
		".ftlh",
		".ftlx"
	],
	aliases: ["FreeMarker2", "Apache FreeMarker2"],
	loader: () => import("./freemarker2-agfpu4vD.js").then((e) => e.TagAutoInterpolationDollar)
}), x({
	id: "freemarker2.tag-angle.interpolation-dollar",
	aliases: ["FreeMarker2 (Angle/Dollar)", "Apache FreeMarker2 (Angle/Dollar)"],
	loader: () => import("./freemarker2-agfpu4vD.js").then((e) => e.TagAngleInterpolationDollar)
}), x({
	id: "freemarker2.tag-bracket.interpolation-dollar",
	aliases: ["FreeMarker2 (Bracket/Dollar)", "Apache FreeMarker2 (Bracket/Dollar)"],
	loader: () => import("./freemarker2-agfpu4vD.js").then((e) => e.TagBracketInterpolationDollar)
}), x({
	id: "freemarker2.tag-angle.interpolation-bracket",
	aliases: ["FreeMarker2 (Angle/Bracket)", "Apache FreeMarker2 (Angle/Bracket)"],
	loader: () => import("./freemarker2-agfpu4vD.js").then((e) => e.TagAngleInterpolationBracket)
}), x({
	id: "freemarker2.tag-bracket.interpolation-bracket",
	aliases: ["FreeMarker2 (Bracket/Bracket)", "Apache FreeMarker2 (Bracket/Bracket)"],
	loader: () => import("./freemarker2-agfpu4vD.js").then((e) => e.TagBracketInterpolationBracket)
}), x({
	id: "freemarker2.tag-auto.interpolation-dollar",
	aliases: ["FreeMarker2 (Auto/Dollar)", "Apache FreeMarker2 (Auto/Dollar)"],
	loader: () => import("./freemarker2-agfpu4vD.js").then((e) => e.TagAutoInterpolationDollar)
}), x({
	id: "freemarker2.tag-auto.interpolation-bracket",
	aliases: ["FreeMarker2 (Auto/Bracket)", "Apache FreeMarker2 (Auto/Bracket)"],
	loader: () => import("./freemarker2-agfpu4vD.js").then((e) => e.TagAutoInterpolationBracket)
}), x({
	id: "go",
	extensions: [".go"],
	aliases: ["Go"],
	loader: () => import("./go-Bc78f5_n.js")
}), x({
	id: "graphql",
	extensions: [".graphql", ".gql"],
	aliases: [
		"GraphQL",
		"graphql",
		"gql"
	],
	mimetypes: ["application/graphql"],
	loader: () => import("./graphql-BfD0A3oq.js")
}), x({
	id: "handlebars",
	extensions: [".handlebars", ".hbs"],
	aliases: [
		"Handlebars",
		"handlebars",
		"hbs"
	],
	mimetypes: ["text/x-handlebars-template"],
	loader: () => import("./handlebars-unqU3btG.js")
}), x({
	id: "hcl",
	extensions: [
		".tf",
		".tfvars",
		".hcl"
	],
	aliases: [
		"Terraform",
		"tf",
		"HCL",
		"hcl"
	],
	loader: () => import("./hcl-Dw13HB8j.js")
}), x({
	id: "html",
	extensions: [
		".html",
		".htm",
		".shtml",
		".xhtml",
		".mdoc",
		".jsp",
		".asp",
		".aspx",
		".jshtm"
	],
	aliases: [
		"HTML",
		"htm",
		"html",
		"xhtml"
	],
	mimetypes: [
		"text/html",
		"text/x-jshtm",
		"text/template",
		"text/ng-template"
	],
	loader: () => import("./html-PjYJbYUo.js")
}), x({
	id: "ini",
	extensions: [
		".ini",
		".properties",
		".gitconfig"
	],
	filenames: [
		"config",
		".gitattributes",
		".gitconfig",
		".editorconfig"
	],
	aliases: ["Ini", "ini"],
	loader: () => import("./ini-CtjpBASy.js")
}), x({
	id: "java",
	extensions: [".java", ".jav"],
	aliases: ["Java", "java"],
	mimetypes: ["text/x-java-source", "text/x-java"],
	loader: () => import("./java-C7kSf7-7.js")
}), x({
	id: "javascript",
	extensions: [
		".js",
		".es6",
		".jsx",
		".mjs",
		".cjs"
	],
	firstLine: "^#!.*\\bnode",
	filenames: ["jakefile"],
	aliases: [
		"JavaScript",
		"javascript",
		"js"
	],
	mimetypes: ["text/javascript"],
	loader: () => import("./javascript-FK3wW-p9.js")
}), x({
	id: "julia",
	extensions: [".jl"],
	aliases: ["julia", "Julia"],
	loader: () => import("./julia-DccZaP5q.js")
}), x({
	id: "kotlin",
	extensions: [".kt", ".kts"],
	aliases: ["Kotlin", "kotlin"],
	mimetypes: ["text/x-kotlin-source", "text/x-kotlin"],
	loader: () => import("./kotlin-B_wJYPI0.js")
}), x({
	id: "less",
	extensions: [".less"],
	aliases: ["Less", "less"],
	mimetypes: ["text/x-less", "text/less"],
	loader: () => import("./less-BpXfi39Z.js")
}), x({
	id: "lexon",
	extensions: [".lex"],
	aliases: ["Lexon"],
	loader: () => import("./lexon-DvbBygoR.js")
}), x({
	id: "lua",
	extensions: [".lua"],
	aliases: ["Lua", "lua"],
	loader: () => import("./lua-BrtCz-Cp.js")
}), x({
	id: "liquid",
	extensions: [".liquid", ".html.liquid"],
	aliases: ["Liquid", "liquid"],
	mimetypes: ["application/liquid"],
	loader: () => import("./liquid-CE7lqEXf.js")
}), x({
	id: "m3",
	extensions: [
		".m3",
		".i3",
		".mg",
		".ig"
	],
	aliases: [
		"Modula-3",
		"Modula3",
		"modula3",
		"m3"
	],
	loader: () => import("./m3-DJcOqTqh.js")
}), x({
	id: "markdown",
	extensions: [
		".md",
		".markdown",
		".mdown",
		".mkdn",
		".mkd",
		".mdwn",
		".mdtxt",
		".mdtext"
	],
	aliases: ["Markdown", "markdown"],
	loader: () => import("./markdown-C_jeeMr1.js")
}), x({
	id: "mdx",
	extensions: [".mdx"],
	aliases: ["MDX", "mdx"],
	loader: () => import("./mdx-BwxPsMhz.js")
}), x({
	id: "mips",
	extensions: [".s"],
	aliases: ["MIPS", "MIPS-V"],
	mimetypes: [
		"text/x-mips",
		"text/mips",
		"text/plaintext"
	],
	loader: () => import("./mips-QOLrb2Ow.js")
}), x({
	id: "msdax",
	extensions: [".dax", ".msdax"],
	aliases: ["DAX", "MSDAX"],
	loader: () => import("./msdax-BcjIpez_.js")
}), x({
	id: "mysql",
	extensions: [],
	aliases: ["MySQL", "mysql"],
	loader: () => import("./mysql-aNwLeAMe.js")
}), x({
	id: "objective-c",
	extensions: [".m"],
	aliases: ["Objective-C"],
	loader: () => import("./objective-c-C9lRqecT.js")
}), x({
	id: "pascal",
	extensions: [
		".pas",
		".p",
		".pp"
	],
	aliases: ["Pascal", "pas"],
	mimetypes: ["text/x-pascal-source", "text/x-pascal"],
	loader: () => import("./pascal-DOD4L1L8.js")
}), x({
	id: "pascaligo",
	extensions: [".ligo"],
	aliases: ["Pascaligo", "ligo"],
	loader: () => import("./pascaligo-BCbgKWuK.js")
}), x({
	id: "perl",
	extensions: [".pl", ".pm"],
	aliases: ["Perl", "pl"],
	loader: () => import("./perl-DfiuiXHZ.js")
}), x({
	id: "pgsql",
	extensions: [],
	aliases: [
		"PostgreSQL",
		"postgres",
		"pg",
		"postgre"
	],
	loader: () => import("./pgsql-Czc3x-hA.js")
}), x({
	id: "php",
	extensions: [
		".php",
		".php4",
		".php5",
		".phtml",
		".ctp"
	],
	aliases: ["PHP", "php"],
	mimetypes: ["application/x-php"],
	loader: () => import("./php-C-wJdg3d.js")
}), x({
	id: "pla",
	extensions: [".pla"],
	loader: () => import("./pla-BdZ6b2NB.js")
}), x({
	id: "postiats",
	extensions: [
		".dats",
		".sats",
		".hats"
	],
	aliases: ["ATS", "ATS/Postiats"],
	loader: () => import("./postiats-DNRXN0R0.js")
}), x({
	id: "powerquery",
	extensions: [".pq", ".pqm"],
	aliases: [
		"PQ",
		"M",
		"Power Query",
		"Power Query M"
	],
	loader: () => import("./powerquery-C-MIEAOo.js")
}), x({
	id: "powershell",
	extensions: [
		".ps1",
		".psm1",
		".psd1"
	],
	aliases: [
		"PowerShell",
		"powershell",
		"ps",
		"ps1"
	],
	loader: () => import("./powershell-BBx2O22X.js")
}), x({
	id: "proto",
	extensions: [".proto"],
	aliases: ["protobuf", "Protocol Buffers"],
	loader: () => import("./protobuf-DB5LvNuC.js")
}), x({
	id: "pug",
	extensions: [".jade", ".pug"],
	aliases: [
		"Pug",
		"Jade",
		"jade"
	],
	loader: () => import("./pug-DThx5NHO.js")
}), x({
	id: "python",
	extensions: [
		".py",
		".rpy",
		".pyw",
		".cpy",
		".gyp",
		".gypi"
	],
	aliases: ["Python", "py"],
	firstLine: "^#!/.*\\bpython[0-9.-]*\\b",
	loader: () => import("./python-BSo0x9xA.js")
}), x({
	id: "qsharp",
	extensions: [".qs"],
	aliases: ["Q#", "qsharp"],
	loader: () => import("./qsharp-C-vyCm0G.js")
}), x({
	id: "r",
	extensions: [
		".r",
		".rhistory",
		".rmd",
		".rprofile",
		".rt"
	],
	aliases: ["R", "r"],
	loader: () => import("./r-DYoj10G4.js")
}), x({
	id: "razor",
	extensions: [".cshtml"],
	aliases: ["Razor", "razor"],
	mimetypes: ["text/x-cshtml"],
	loader: () => import("./razor-CIQSTDvT.js")
}), x({
	id: "redis",
	extensions: [".redis"],
	aliases: ["redis"],
	loader: () => import("./redis-DyplsuyI.js")
}), x({
	id: "redshift",
	extensions: [],
	aliases: ["Redshift", "redshift"],
	loader: () => import("./redshift-BwsF3uMk.js")
}), x({
	id: "restructuredtext",
	extensions: [".rst"],
	aliases: ["reStructuredText", "restructuredtext"],
	loader: () => import("./restructuredtext-Borw7tht.js")
}), x({
	id: "ruby",
	extensions: [
		".rb",
		".rbx",
		".rjs",
		".gemspec",
		".pp"
	],
	filenames: ["rakefile", "Gemfile"],
	aliases: ["Ruby", "rb"],
	loader: () => import("./ruby-C-EFPJv_.js")
}), x({
	id: "rust",
	extensions: [".rs", ".rlib"],
	aliases: ["Rust", "rust"],
	loader: () => import("./rust-BPJY58JV.js")
}), x({
	id: "sb",
	extensions: [".sb"],
	aliases: ["Small Basic", "sb"],
	loader: () => import("./sb-CxqJtlG8.js")
}), x({
	id: "scala",
	extensions: [
		".scala",
		".sc",
		".sbt"
	],
	aliases: [
		"Scala",
		"scala",
		"SBT",
		"Sbt",
		"sbt",
		"Dotty",
		"dotty"
	],
	mimetypes: [
		"text/x-scala-source",
		"text/x-scala",
		"text/x-sbt",
		"text/x-dotty"
	],
	loader: () => import("./scala-JFQfnTTB.js")
}), x({
	id: "scheme",
	extensions: [
		".scm",
		".ss",
		".sch",
		".rkt"
	],
	aliases: ["scheme", "Scheme"],
	loader: () => import("./scheme-C6xtxtFU.js")
}), x({
	id: "scss",
	extensions: [".scss"],
	aliases: [
		"Sass",
		"sass",
		"scss"
	],
	mimetypes: ["text/x-scss", "text/scss"],
	loader: () => import("./scss-CAhEnFoL.js")
}), x({
	id: "shell",
	extensions: [".sh", ".bash"],
	aliases: ["Shell", "sh"],
	loader: () => import("./shell-DZxOw2Ds.js")
}), x({
	id: "sol",
	extensions: [".sol"],
	aliases: [
		"sol",
		"solidity",
		"Solidity"
	],
	loader: () => import("./solidity-BBGBjFgP.js")
}), x({
	id: "aes",
	extensions: [".aes"],
	aliases: [
		"aes",
		"sophia",
		"Sophia"
	],
	loader: () => import("./sophia-SuPzYDhI.js")
}), x({
	id: "sparql",
	extensions: [".rq"],
	aliases: ["sparql", "SPARQL"],
	loader: () => import("./sparql-DjZFU9qF.js")
}), x({
	id: "sql",
	extensions: [".sql"],
	aliases: ["SQL"],
	loader: () => import("./sql-DBOb1sS3.js")
}), x({
	id: "st",
	extensions: [
		".st",
		".iecst",
		".iecplc",
		".lc3lib",
		".TcPOU",
		".TcDUT",
		".TcGVL",
		".TcIO"
	],
	aliases: [
		"StructuredText",
		"scl",
		"stl"
	],
	loader: () => import("./st-CltEaDsD.js")
}), x({
	id: "swift",
	aliases: ["Swift", "swift"],
	extensions: [".swift"],
	mimetypes: ["text/swift"],
	loader: () => import("./swift-BFb6ZToe.js")
}), x({
	id: "systemverilog",
	extensions: [".sv", ".svh"],
	aliases: [
		"SV",
		"sv",
		"SystemVerilog",
		"systemverilog"
	],
	loader: () => import("./systemverilog-BBjnp-HK.js")
}), x({
	id: "verilog",
	extensions: [".v", ".vh"],
	aliases: [
		"V",
		"v",
		"Verilog",
		"verilog"
	],
	loader: () => import("./systemverilog-BBjnp-HK.js")
}), x({
	id: "tcl",
	extensions: [".tcl"],
	aliases: [
		"tcl",
		"Tcl",
		"tcltk",
		"TclTk",
		"tcl/tk",
		"Tcl/Tk"
	],
	loader: () => import("./tcl-8rUFF5t0.js")
}), x({
	id: "twig",
	extensions: [".twig"],
	aliases: ["Twig", "twig"],
	mimetypes: ["text/x-twig"],
	loader: () => import("./twig-Bt85m8C0.js")
}), x({
	id: "typescript",
	extensions: [
		".ts",
		".tsx",
		".cts",
		".mts"
	],
	aliases: [
		"TypeScript",
		"ts",
		"typescript"
	],
	mimetypes: ["text/typescript"],
	loader: () => import("./typescript-BohCtkJU.js")
}), x({
	id: "typespec",
	extensions: [".tsp"],
	aliases: ["TypeSpec"],
	loader: () => import("./typespec-Bab5zZET.js")
}), x({
	id: "vb",
	extensions: [".vb"],
	aliases: ["Visual Basic", "vb"],
	loader: () => import("./vb-B27yOxV2.js")
}), x({
	id: "wgsl",
	extensions: [".wgsl"],
	aliases: [
		"WebGPU Shading Language",
		"WGSL",
		"wgsl"
	],
	loader: () => import("./wgsl-DEfGNKYg.js")
}), x({
	id: "xml",
	extensions: [
		".xml",
		".xsd",
		".dtd",
		".ascx",
		".csproj",
		".config",
		".props",
		".targets",
		".wxi",
		".wxl",
		".wxs",
		".xaml",
		".svg",
		".svgz",
		".opf",
		".xslt",
		".xsl"
	],
	firstLine: "(\\<\\?xml.*)|(\\<svg)|(\\<\\!doctype\\s+svg)",
	aliases: ["XML", "xml"],
	mimetypes: [
		"text/xml",
		"application/xml",
		"application/xaml+xml",
		"application/xml-dtd"
	],
	loader: () => import("./xml-Du3Zn5o6.js")
}), x({
	id: "yaml",
	extensions: [".yaml", ".yml"],
	aliases: [
		"YAML",
		"yaml",
		"YML",
		"yml"
	],
	mimetypes: ["application/x-yaml", "text/x-yaml"],
	loader: () => import("./yaml-CpdPbhCn.js")
});
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/external/monaco-lsp-client/out/index.js
var De = /* @__PURE__ */ i({
	MonacoLspClient: () => nr,
	WebSocketTransport: () => ar,
	createTransportToIFrame: () => cr,
	createTransportToWorker: () => sr
}), Oe = Object.defineProperty, ke = (e, t, n) => t in e ? Oe(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, S = (e, t, n) => ke(e, typeof t == "symbol" ? t : t + "", n), C, Ae, w, T, E;
function je(e) {
	return e.method !== void 0;
}
var Me;
(function(e) {
	function t(e) {
		return e;
	}
	e.create = t;
})(Me ||= {});
var D;
(function(e) {
	e.parseError = -32700, e.invalidRequest = -32600, e.methodNotFound = -32601, e.invalidParams = -32602, e.internalError = -32603;
	function t(e) {
		return -32099 <= e && e <= -32e3;
	}
	e.isServerError = t;
	function n(e) {
		if (!t(e)) throw Error("Invalid range for a server error.");
		return e;
	}
	e.serverError = n, e.unexpectedServerError = -32e3;
	function r(e) {
		return !0;
	}
	e.isApplicationError = r;
	function i(e) {
		return e;
	}
	e.applicationError = i, e.genericApplicationError = -320100;
})(D ||= {});
var Ne = class {
	constructor() {
		S(this, "listeners", /* @__PURE__ */ new Set()), S(this, "event", (e) => (this.listeners.add(e), { dispose: () => {
			this.listeners.delete(e);
		} }));
	}
	fire(e) {
		this.listeners.forEach((t) => t(e));
	}
}, Pe = class {
	constructor(e) {
		S(this, "_value"), S(this, "eventEmitter"), this._value = e, this.eventEmitter = new Ne();
	}
	get value() {
		return this._value;
	}
	set value(e) {
		this._value !== e && (this._value = e, this.eventEmitter.fire(e));
	}
	get onChange() {
		return this.eventEmitter.event;
	}
};
function Fe(e, t) {
	let n = setTimeout(t, e);
	return { dispose: () => clearTimeout(n) };
}
function Ie(e, t, n) {
	return e instanceof Set ? (e.add(t), { dispose: () => e.delete(t) }) : (e.set(t, n), { dispose: () => e.delete(t) });
}
var Le = class {
	constructor() {
		S(this, "_state", "none"), S(this, "promise"), S(this, "resolve", () => {}), S(this, "reject", () => {}), this.promise = new Promise((e, t) => {
			this.resolve = e, this.reject = t;
		});
	}
	get state() {
		return this._state;
	}
}, Re = (C = class {
	constructor() {
		S(this, "_unprocessedMessages", []), S(this, "_messageListener"), S(this, "id", C.id++), S(this, "_state", new Pe({ state: "open" })), S(this, "state", this._state);
	}
	setListener(e) {
		if (this._messageListener = e, e) for (; this._unprocessedMessages.length > 0 && this._messageListener !== void 0;) {
			let e = this._unprocessedMessages.shift();
			this._messageListener(e);
		}
	}
	send(e) {
		return this._sendImpl(e);
	}
	_dispatchReceivedMessage(e) {
		this._unprocessedMessages.length === 0 && this._messageListener ? this._messageListener(e) : this._unprocessedMessages.push(e);
	}
	_onConnectionClosed() {
		this._state.value = {
			state: "closed",
			error: void 0
		};
	}
	log(e) {
		return new ze(this, e ?? new Be());
	}
}, S(C, "id", 0), C), ze = class {
	constructor(e, t) {
		S(this, "baseStream"), S(this, "logger"), this.baseStream = e, this.logger = t;
	}
	get state() {
		return this.baseStream.state;
	}
	setListener(e) {
		if (e === void 0) {
			this.baseStream.setListener(void 0);
			return;
		}
		this.baseStream.setListener((t) => {
			this.logger.log(this.baseStream, "incoming", t), e(t);
		});
	}
	send(e) {
		return this.logger.log(this.baseStream, "outgoing", e), this.baseStream.send(e);
	}
	toString() {
		return `StreamLogger/${this.baseStream.toString()}`;
	}
}, Be = class {
	log(e, t, n) {
		console.log(`${t === "incoming" ? "<-" : "->"} [${e.toString()}] ${JSON.stringify(n)}`);
	}
}, Ve = class e {
	constructor(e) {
		S(this, "connect"), this.connect = e;
	}
	mapContext(t) {
		return new e((e) => this.connect(e ? He(e, t) : void 0));
	}
};
function He(e, t) {
	return {
		handleNotification: (n, r) => e.handleNotification(n, t(r)),
		handleRequest: (n, r, i) => e.handleRequest(n, r, t(i))
	};
}
var Ue = class e {
	constructor(e, t, n) {
		S(this, "_stream"), S(this, "_listener"), S(this, "_logger"), S(this, "_unprocessedResponses", /* @__PURE__ */ new Map()), S(this, "_lastUsedRequestId", 0), this._stream = e, this._listener = t, this._logger = n, this._stream.setListener((e) => {
			je(e) ? e.id === void 0 ? this._processNotification(e) : this._processRequest(e) : this._processResponse(e);
		});
	}
	static createChannel(t, n) {
		let r = !1;
		return new Ve((i) => {
			if (r) throw Error(`A channel to the stream ${t} was already constructed!`);
			return r = !0, new e(t, i, n);
		});
	}
	get state() {
		return this._stream.state;
	}
	async _processNotification(e) {
		if (e.id !== void 0) throw Error();
		if (!this._listener) {
			this._logger && this._logger.debug({
				text: "Notification ignored",
				message: e
			});
			return;
		}
		try {
			await this._listener.handleNotification({
				method: e.method,
				params: e.params || null
			});
		} catch (t) {
			this._logger && this._logger.warn({
				text: `Exception was thrown while handling notification: ${t}`,
				exception: t,
				message: e
			});
		}
	}
	async _processRequest(e) {
		if (e.id === void 0) throw Error();
		let t;
		if (this._listener) try {
			t = await this._listener.handleRequest({
				method: e.method,
				params: e.params || null
			}, e.id);
		} catch (n) {
			this._logger && this._logger.warn({
				text: `Exception was thrown while handling request: ${n}`,
				message: e,
				exception: n
			}), t = { error: {
				code: D.internalError,
				message: "An unexpected exception was thrown.",
				data: void 0
			} };
		}
		else this._logger && this._logger.debug({
			text: "Received request even though not listening for requests",
			message: e
		}), t = { error: {
			code: D.methodNotFound,
			message: "This endpoint does not listen for requests or notifications.",
			data: void 0
		} };
		let n;
		n = "result" in t ? {
			jsonrpc: "2.0",
			id: e.id,
			result: t.result
		} : {
			jsonrpc: "2.0",
			id: e.id,
			error: t.error
		}, await this._stream.send(n);
	}
	_processResponse(e) {
		let t = "" + e.id, n = this._unprocessedResponses.get(t);
		if (!n) {
			this._logger && this._logger.debug({
				text: "Got an unexpected response message",
				message: e
			});
			return;
		}
		this._unprocessedResponses.delete(t), n(e);
	}
	_newRequestId() {
		return this._lastUsedRequestId++;
	}
	sendRequest(e, t, n) {
		let r = {
			jsonrpc: "2.0",
			id: this._newRequestId(),
			method: e.method,
			params: e.params || void 0
		};
		return n && n(r.id), new Promise((e, t) => {
			let n = "" + r.id;
			this._unprocessedResponses.set(n, (n) => {
				"result" in n ? e({ result: n.result }) : (n.error || t(/* @__PURE__ */ Error("Response had neither 'result' nor 'error' field set.")), e({ error: n.error }));
			}), this._stream.send(r).then(void 0, (e) => {
				this._unprocessedResponses.delete(n), t(e);
			});
		});
	}
	sendNotification(e, t) {
		let n = {
			jsonrpc: "2.0",
			id: void 0,
			method: e.method,
			params: e.params || void 0
		};
		return this._stream.send(n);
	}
	toString() {
		return "StreamChannel/" + this._stream.toString();
	}
}, O;
(function(e) {
	function t() {
		return {
			deserializeFromJson: (e) => ({
				hasErrors: !1,
				value: e
			}),
			serializeToJson: (e) => e
		};
	}
	e.sAny = t;
	function n() {
		return {
			deserializeFromJson: (e) => ({
				hasErrors: !1,
				value: {}
			}),
			serializeToJson: (e) => ({})
		};
	}
	e.sEmptyObject = n;
	function r() {
		return {
			deserializeFromJson: (e) => ({
				hasErrors: !1,
				value: void 0
			}),
			serializeToJson: (e) => null
		};
	}
	e.sVoidFromNull = r;
})(O ||= {});
var We = Symbol("OptionalMethodNotFound"), Ge = class {
	contextualize(e) {
		return new Ke(this, e);
	}
}, Ke = class extends Ge {
	constructor(e, t) {
		super(), S(this, "underylingTypedChannel"), S(this, "converters"), this.underylingTypedChannel = e, this.converters = t;
	}
	async request(e, t, n) {
		let r = await this.converters.getSendContext(n);
		return this.underylingTypedChannel.request(e, t, r);
	}
	async notify(e, t, n) {
		let r = await this.converters.getSendContext(n);
		return this.underylingTypedChannel.notify(e, t, r);
	}
	registerNotificationHandler(e, t) {
		return this.underylingTypedChannel.registerNotificationHandler(e, async (e, n) => await t(e, await this.converters.getNewContext(n)));
	}
	registerRequestHandler(e, t) {
		return this.underylingTypedChannel.registerRequestHandler(e, async (e, n, r) => await t(e, n, await this.converters.getNewContext(r)));
	}
}, k = class e extends Ge {
	constructor(e, t = {}) {
		super(), S(this, "channelCtor"), S(this, "_requestSender"), S(this, "_handler", /* @__PURE__ */ new Map()), S(this, "_unknownNotificationHandler", /* @__PURE__ */ new Set()), S(this, "_timeout"), S(this, "sendExceptionDetails", !1), S(this, "_logger"), S(this, "listeningDeferred", new Le()), S(this, "onListening", this.listeningDeferred.promise), S(this, "_requestDidErrorEventEmitter", new Ne()), S(this, "onRequestDidError", this._requestDidErrorEventEmitter.event), this.channelCtor = e, this._logger = t.logger, this.sendExceptionDetails = !!t.sendExceptionDetails, this._timeout = Fe(1e3, () => {
			this._requestSender || console.warn(`"${this.startListen.name}" has not been called within 1 second after construction of this channel. Did you forget to call it?`, this);
		});
	}
	static fromTransport(t, n = {}) {
		return new e(Ue.createChannel(t, n.logger), n);
	}
	startListen() {
		if (this._requestSender) throw Error(`"${this.startListen.name}" can be called only once, but it already has been called.`);
		this._timeout &&= (this._timeout.dispose(), void 0), this._requestSender = this.channelCtor.connect({
			handleRequest: (e, t, n) => this.handleRequest(e, t, n),
			handleNotification: (e, t) => this.handleNotification(e, t)
		}), this.listeningDeferred.resolve();
	}
	checkChannel(e) {
		if (!e) throw Error(`"${this.startListen.name}" must be called before any messages can be sent or received.`);
		return !0;
	}
	async handleRequest(e, t, n) {
		let r = this._handler.get(e.method);
		if (!r) return this._logger && this._logger.debug({
			text: `No request handler for "${e.method}".`,
			data: { requestObject: e }
		}), { error: {
			code: D.methodNotFound,
			message: `No request handler for "${e.method}".`,
			data: { method: e.method }
		} };
		if (r.kind != "request") {
			let t = `"${e.method}" is registered as notification, but was sent as request.`;
			return this._logger && this._logger.debug({
				text: t,
				data: { requestObject: e }
			}), { error: {
				code: D.invalidRequest,
				message: t,
				data: { method: e.method }
			} };
		}
		let i = r.requestType.paramsSerializer.deserializeFromJson(e.params);
		if (i.hasErrors) {
			let t = `Got invalid params: ${i.errorMessage}`;
			return this._logger && this._logger.debug({
				text: t,
				data: {
					requestObject: e,
					errorMessage: i.errorMessage
				}
			}), { error: {
				code: D.invalidParams,
				message: t,
				data: { errors: i.errorMessage }
			} };
		} else {
			let a = i.value, o;
			try {
				let e = await r.handler(a, t, n);
				if ("error" in e || "errorMessage" in e) {
					let t = e.error ? r.requestType.errorSerializer.serializeToJson(e.error) : void 0;
					o = { error: {
						code: e.errorCode || D.genericApplicationError,
						message: e.errorMessage || "An error was returned",
						data: t
					} };
				} else o = { result: r.requestType.resultSerializer.serializeToJson(e.ok) };
			} catch (t) {
				t instanceof Je ? o = { error: {
					code: t.code,
					message: t.message
				} } : (this._logger && this._logger.warn({
					text: `An exception was thrown while handling a request: ${t}.`,
					exception: t,
					data: { requestObject: e }
				}), o = { error: {
					code: D.unexpectedServerError,
					message: this.sendExceptionDetails ? `An exception was thrown while handling a request: ${t}.` : "Server has thrown an unexpected exception"
				} });
			}
			return o;
		}
	}
	async handleNotification(e, t) {
		let n = this._handler.get(e.method);
		if (!n) {
			for (let t of this._unknownNotificationHandler) t(e);
			this._unknownNotificationHandler.size === 0 && this._logger && this._logger.debug({
				text: `Unhandled notification "${e.method}"`,
				data: { requestObject: e }
			});
			return;
		}
		if (n.kind != "notification") {
			this._logger && this._logger.debug({
				text: `"${e.method}" is registered as request, but was sent as notification.`,
				data: { requestObject: e }
			});
			return;
		}
		let r = n.notificationType.paramsSerializer.deserializeFromJson(e.params);
		if (r.hasErrors) {
			this._logger && this._logger.debug({
				text: `Got invalid params: ${r}`,
				data: {
					requestObject: e,
					errorMessage: r.errorMessage
				}
			});
			return;
		}
		let i = r.value;
		for (let r of n.handlers) try {
			r(i, t);
		} catch (t) {
			this._logger && this._logger.warn({
				text: `An exception was thrown while handling a notification: ${t}.`,
				exception: t,
				data: { requestObject: e }
			});
		}
	}
	registerUnknownNotificationHandler(e) {
		return Ie(this._unknownNotificationHandler, e);
	}
	registerRequestHandler(e, t) {
		if (this._handler.get(e.method)) throw Error(`Handler with method "${e.method}" already registered.`);
		return Ie(this._handler, e.method, {
			kind: "request",
			requestType: e,
			handler: t
		});
	}
	registerNotificationHandler(e, t) {
		let n = this._handler.get(e.method);
		if (!n) n = {
			kind: "notification",
			notificationType: e,
			handlers: /* @__PURE__ */ new Set()
		}, this._handler.set(e.method, n);
		else {
			if (n.kind !== "notification") throw Error(`Method "${e.method}" was already registered as request handler.`);
			if (n.notificationType !== e) throw Error(`Method "${e.method}" was registered for a different type.`);
		}
		return Ie(n.handlers, t);
	}
	getRegisteredTypes() {
		let e = [];
		for (let t of this._handler.values()) t.kind === "notification" ? e.push(t.notificationType) : t.kind === "request" && e.push(t.requestType);
		return e;
	}
	async request(e, t, n) {
		if (!this.checkChannel(this._requestSender)) throw Error("Impossible");
		let r = e.paramsSerializer.serializeToJson(t);
		qe(r);
		let i = await this._requestSender.sendRequest({
			method: e.method,
			params: r
		}, n);
		if ("error" in i) {
			if (e.isOptional && i.error.code === D.methodNotFound) return We;
			let t;
			if (i.error.data !== void 0) {
				let n = e.errorSerializer.deserializeFromJson(i.error.data);
				if (n.hasErrors) throw Error(n.errorMessage);
				t = n.value;
			} else t = void 0;
			let n = new Je(i.error.message, t, i.error.code);
			throw this._requestDidErrorEventEmitter.fire({ error: n }), n;
		} else {
			let t = e.resultSerializer.deserializeFromJson(i.result);
			if (t.hasErrors) throw Error("Could not deserialize response: " + t.errorMessage + `

${JSON.stringify(i, null, 2)}`);
			return t.value;
		}
	}
	async notify(e, t, n) {
		if (!this.checkChannel(this._requestSender)) throw Error();
		let r = e.paramsSerializer.serializeToJson(t);
		qe(r), this._requestSender.sendNotification({
			method: e.method,
			params: r
		}, n);
	}
};
function qe(e) {
	if (e !== null && Array.isArray(e) && typeof e != "object") throw Error("Invalid value! Only null, array and object is allowed.");
}
var Je = class e extends Error {
	constructor(t, n, r = D.genericApplicationError) {
		super(t), S(this, "data"), S(this, "code"), this.data = n, this.code = r, Object.setPrototypeOf(this, e.prototype);
	}
}, Ye = class e {
	constructor(e, t, n, r, i = !1) {
		S(this, "method"), S(this, "paramsSerializer"), S(this, "resultSerializer"), S(this, "errorSerializer"), S(this, "isOptional"), S(this, "kind", "request"), this.method = e, this.paramsSerializer = t, this.resultSerializer = n, this.errorSerializer = r, this.isOptional = i;
	}
	withMethod(t) {
		return new e(t, this.paramsSerializer, this.resultSerializer, this.errorSerializer);
	}
	optional() {
		return new e(this.method, this.paramsSerializer, this.resultSerializer, this.errorSerializer, !0);
	}
}, Xe = class e {
	constructor(e, t) {
		S(this, "method"), S(this, "paramsSerializer"), S(this, "kind", "notification"), this.method = e, this.paramsSerializer = t;
	}
	withMethod(t) {
		return new e(t, this.paramsSerializer);
	}
};
function A(e) {
	return new Ye((e || {}).method, O.sAny(), O.sAny(), O.sAny());
}
function j(e) {
	return new Xe((e || {}).method, O.sAny());
}
var Ze = (Ae = Symbol(), w = class {
	constructor(e) {
		S(this, "error"), S(this, Ae), this.error = e;
	}
}, S(w, "factory", (e) => new w(e)), w);
function Qe(e) {
	let t = $e(e.server), n = $e(e.client);
	return new et(e.tags || [], t, n);
}
function $e(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) {
		let e = r.method ? r.method : n;
		t[n] = r.withMethod(e);
	}
	return t;
}
var et = class e {
	constructor(e = [], t, n) {
		S(this, "tags"), S(this, "server"), S(this, "client"), this.tags = e, this.server = t, this.client = n;
	}
	_onlyDesignTime() {
		return /* @__PURE__ */ Error("This property is not meant to be accessed at runtime");
	}
	get TContractObject() {
		throw this._onlyDesignTime();
	}
	get TClientInterface() {
		throw this._onlyDesignTime();
	}
	get TServerInterface() {
		throw this._onlyDesignTime();
	}
	get TClientHandler() {
		throw this._onlyDesignTime();
	}
	get TServerHandler() {
		throw this._onlyDesignTime();
	}
	get TTags() {
		throw this._onlyDesignTime();
	}
	getInterface(e, t, n, r) {
		let i = this.buildCounterpart(e, n), a = this.registerHandlers(e, t, r, i);
		return {
			counterpart: i,
			dispose: () => a.dispose()
		};
	}
	buildCounterpart(e, t) {
		let n = {};
		for (let [r, i] of Object.entries(t)) {
			let t;
			t = i.kind === "request" ? i.isOptional ? async (t, n) => {
				t === void 0 && (t = {});
				try {
					return await e.request(i, t, n);
				} catch (e) {
					if (e && e.code === D.methodNotFound) return We;
					throw e;
				}
			} : (t, n) => (t === void 0 && (t = {}), e.request(i, t, n)) : (t, n) => (t === void 0 && (t = {}), e.notify(i, t, n)), n[r] = t;
		}
		return n;
	}
	registerHandlers(e, t, n, r) {
		let i = [];
		for (let [a, o] of Object.entries(t)) if (o.kind === "request") {
			let t = n[a];
			if (!t) continue;
			let s = this.createRequestHandler(r, t);
			i.push(e.registerRequestHandler(o, s));
		} else {
			let t = n[a];
			t && i.push(e.registerNotificationHandler(o, (e, n) => {
				t(e, {
					context: n,
					counterpart: r
				});
			}));
		}
		return { dispose: () => i.forEach((e) => e.dispose()) };
	}
	createRequestHandler(e, t) {
		return async (n, r, i) => {
			let a = await t(n, {
				context: i,
				counterpart: e,
				newErr: Ze.factory,
				requestId: r
			});
			return a instanceof Ze ? a.error : { ok: a };
		};
	}
	static getServerFromStream(e, t, n, r) {
		let i = k.fromTransport(t, n), { server: a } = e.getServer(i, r);
		return i.startListen(), {
			channel: i,
			server: a
		};
	}
	static registerServerToStream(e, t, n, r) {
		let i = k.fromTransport(t, n), { client: a } = e.registerServer(i, r);
		return i.startListen(), {
			channel: i,
			client: a
		};
	}
	getServer(e, t) {
		let { counterpart: n, dispose: r } = this.getInterface(e, this.client, this.server, t);
		return {
			server: n,
			dispose: r
		};
	}
	registerServer(e, t) {
		let { counterpart: n, dispose: r } = this.getInterface(e, this.server, this.client, t);
		return {
			client: n,
			dispose: r
		};
	}
	withContext() {
		return new e(this.tags, this.server, this.client);
	}
}, M = /* @__PURE__ */ (function(e) {
	return e.Comment = "comment", e.Imports = "imports", e.Region = "region", e;
})({}), N = /* @__PURE__ */ (function(e) {
	return e[e.File = 1] = "File", e[e.Module = 2] = "Module", e[e.Namespace = 3] = "Namespace", e[e.Package = 4] = "Package", e[e.Class = 5] = "Class", e[e.Method = 6] = "Method", e[e.Property = 7] = "Property", e[e.Field = 8] = "Field", e[e.Constructor = 9] = "Constructor", e[e.Enum = 10] = "Enum", e[e.Interface = 11] = "Interface", e[e.Function = 12] = "Function", e[e.Variable = 13] = "Variable", e[e.Constant = 14] = "Constant", e[e.String = 15] = "String", e[e.Number = 16] = "Number", e[e.Boolean = 17] = "Boolean", e[e.Array = 18] = "Array", e[e.Object = 19] = "Object", e[e.Key = 20] = "Key", e[e.Null = 21] = "Null", e[e.EnumMember = 22] = "EnumMember", e[e.Struct = 23] = "Struct", e[e.Event = 24] = "Event", e[e.Operator = 25] = "Operator", e[e.TypeParameter = 26] = "TypeParameter", e;
})({}), tt = /* @__PURE__ */ (function(e) {
	return e[e.Deprecated = 1] = "Deprecated", e;
})({}), nt = /* @__PURE__ */ (function(e) {
	return e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter", e;
})({}), rt = /* @__PURE__ */ (function(e) {
	return e[e.None = 0] = "None", e[e.Full = 1] = "Full", e[e.Incremental = 2] = "Incremental", e;
})({}), P = /* @__PURE__ */ (function(e) {
	return e[e.Text = 1] = "Text", e[e.Method = 2] = "Method", e[e.Function = 3] = "Function", e[e.Constructor = 4] = "Constructor", e[e.Field = 5] = "Field", e[e.Variable = 6] = "Variable", e[e.Class = 7] = "Class", e[e.Interface = 8] = "Interface", e[e.Module = 9] = "Module", e[e.Property = 10] = "Property", e[e.Unit = 11] = "Unit", e[e.Value = 12] = "Value", e[e.Enum = 13] = "Enum", e[e.Keyword = 14] = "Keyword", e[e.Snippet = 15] = "Snippet", e[e.Color = 16] = "Color", e[e.File = 17] = "File", e[e.Reference = 18] = "Reference", e[e.Folder = 19] = "Folder", e[e.EnumMember = 20] = "EnumMember", e[e.Constant = 21] = "Constant", e[e.Struct = 22] = "Struct", e[e.Event = 23] = "Event", e[e.Operator = 24] = "Operator", e[e.TypeParameter = 25] = "TypeParameter", e;
})({}), it = /* @__PURE__ */ (function(e) {
	return e[e.Deprecated = 1] = "Deprecated", e;
})({}), at = /* @__PURE__ */ (function(e) {
	return e[e.PlainText = 1] = "PlainText", e[e.Snippet = 2] = "Snippet", e;
})({}), F = /* @__PURE__ */ (function(e) {
	return e[e.Text = 1] = "Text", e[e.Read = 2] = "Read", e[e.Write = 3] = "Write", e;
})({}), I = /* @__PURE__ */ (function(e) {
	return e.Empty = "", e.QuickFix = "quickfix", e.Refactor = "refactor", e.RefactorExtract = "refactor.extract", e.RefactorInline = "refactor.inline", e.RefactorRewrite = "refactor.rewrite", e.Source = "source", e.SourceOrganizeImports = "source.organizeImports", e.SourceFixAll = "source.fixAll", e;
})({}), L = /* @__PURE__ */ (function(e) {
	return e.PlainText = "plaintext", e.Markdown = "markdown", e;
})({}), R = /* @__PURE__ */ (function(e) {
	return e[e.Error = 1] = "Error", e[e.Warning = 2] = "Warning", e[e.Information = 3] = "Information", e[e.Hint = 4] = "Hint", e;
})({}), ot = /* @__PURE__ */ (function(e) {
	return e[e.Unnecessary = 1] = "Unnecessary", e[e.Deprecated = 2] = "Deprecated", e;
})({}), z = /* @__PURE__ */ (function(e) {
	return e[e.Invoked = 1] = "Invoked", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.TriggerForIncompleteCompletions = 3] = "TriggerForIncompleteCompletions", e;
})({}), B = /* @__PURE__ */ (function(e) {
	return e[e.Invoked = 1] = "Invoked", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange", e;
})({}), V = /* @__PURE__ */ (function(e) {
	return e[e.Invoked = 1] = "Invoked", e[e.Automatic = 2] = "Automatic", e;
})({}), st = /* @__PURE__ */ (function(e) {
	return e.Relative = "relative", e;
})({}), H = class {
	constructor(e) {
		this.method = e;
	}
}, U = {
	textDocumentImplementation: new H("textDocument/implementation"),
	textDocumentTypeDefinition: new H("textDocument/typeDefinition"),
	textDocumentDocumentColor: new H("textDocument/documentColor"),
	textDocumentColorPresentation: new H("textDocument/colorPresentation"),
	textDocumentFoldingRange: new H("textDocument/foldingRange"),
	textDocumentDeclaration: new H("textDocument/declaration"),
	textDocumentSelectionRange: new H("textDocument/selectionRange"),
	textDocumentPrepareCallHierarchy: new H("textDocument/prepareCallHierarchy"),
	textDocumentSemanticTokensFull: new H("textDocument/semanticTokens/full"),
	textDocumentSemanticTokensFullDelta: new H("textDocument/semanticTokens/full/delta"),
	textDocumentLinkedEditingRange: new H("textDocument/linkedEditingRange"),
	workspaceWillCreateFiles: new H("workspace/willCreateFiles"),
	workspaceWillRenameFiles: new H("workspace/willRenameFiles"),
	workspaceWillDeleteFiles: new H("workspace/willDeleteFiles"),
	textDocumentMoniker: new H("textDocument/moniker"),
	textDocumentPrepareTypeHierarchy: new H("textDocument/prepareTypeHierarchy"),
	textDocumentInlineValue: new H("textDocument/inlineValue"),
	textDocumentInlayHint: new H("textDocument/inlayHint"),
	textDocumentDiagnostic: new H("textDocument/diagnostic"),
	textDocumentInlineCompletion: new H("textDocument/inlineCompletion"),
	textDocumentWillSaveWaitUntil: new H("textDocument/willSaveWaitUntil"),
	textDocumentCompletion: new H("textDocument/completion"),
	textDocumentHover: new H("textDocument/hover"),
	textDocumentSignatureHelp: new H("textDocument/signatureHelp"),
	textDocumentDefinition: new H("textDocument/definition"),
	textDocumentReferences: new H("textDocument/references"),
	textDocumentDocumentHighlight: new H("textDocument/documentHighlight"),
	textDocumentDocumentSymbol: new H("textDocument/documentSymbol"),
	textDocumentCodeAction: new H("textDocument/codeAction"),
	workspaceSymbol: new H("workspace/symbol"),
	textDocumentCodeLens: new H("textDocument/codeLens"),
	textDocumentDocumentLink: new H("textDocument/documentLink"),
	textDocumentFormatting: new H("textDocument/formatting"),
	textDocumentRangeFormatting: new H("textDocument/rangeFormatting"),
	textDocumentRangesFormatting: new H("textDocument/rangesFormatting"),
	textDocumentOnTypeFormatting: new H("textDocument/onTypeFormatting"),
	textDocumentRename: new H("textDocument/rename"),
	workspaceExecuteCommand: new H("workspace/executeCommand"),
	workspaceDidCreateFiles: new H("workspace/didCreateFiles"),
	workspaceDidRenameFiles: new H("workspace/didRenameFiles"),
	workspaceDidDeleteFiles: new H("workspace/didDeleteFiles"),
	workspaceDidChangeConfiguration: new H("workspace/didChangeConfiguration"),
	textDocumentDidOpen: new H("textDocument/didOpen"),
	textDocumentDidChange: new H("textDocument/didChange"),
	textDocumentDidClose: new H("textDocument/didClose"),
	textDocumentDidSave: new H("textDocument/didSave"),
	textDocumentWillSave: new H("textDocument/willSave"),
	workspaceDidChangeWatchedFiles: new H("workspace/didChangeWatchedFiles")
}, W = Qe({
	server: {
		textDocumentImplementation: A({ method: "textDocument/implementation" }),
		textDocumentTypeDefinition: A({ method: "textDocument/typeDefinition" }),
		textDocumentDocumentColor: A({ method: "textDocument/documentColor" }),
		textDocumentColorPresentation: A({ method: "textDocument/colorPresentation" }),
		textDocumentFoldingRange: A({ method: "textDocument/foldingRange" }),
		textDocumentDeclaration: A({ method: "textDocument/declaration" }),
		textDocumentSelectionRange: A({ method: "textDocument/selectionRange" }),
		textDocumentPrepareCallHierarchy: A({ method: "textDocument/prepareCallHierarchy" }),
		callHierarchyIncomingCalls: A({ method: "callHierarchy/incomingCalls" }),
		callHierarchyOutgoingCalls: A({ method: "callHierarchy/outgoingCalls" }),
		textDocumentSemanticTokensFull: A({ method: "textDocument/semanticTokens/full" }),
		textDocumentSemanticTokensFullDelta: A({ method: "textDocument/semanticTokens/full/delta" }),
		textDocumentSemanticTokensRange: A({ method: "textDocument/semanticTokens/range" }),
		textDocumentLinkedEditingRange: A({ method: "textDocument/linkedEditingRange" }),
		workspaceWillCreateFiles: A({ method: "workspace/willCreateFiles" }),
		workspaceWillRenameFiles: A({ method: "workspace/willRenameFiles" }),
		workspaceWillDeleteFiles: A({ method: "workspace/willDeleteFiles" }),
		textDocumentMoniker: A({ method: "textDocument/moniker" }),
		textDocumentPrepareTypeHierarchy: A({ method: "textDocument/prepareTypeHierarchy" }),
		typeHierarchySupertypes: A({ method: "typeHierarchy/supertypes" }),
		typeHierarchySubtypes: A({ method: "typeHierarchy/subtypes" }),
		textDocumentInlineValue: A({ method: "textDocument/inlineValue" }),
		textDocumentInlayHint: A({ method: "textDocument/inlayHint" }),
		inlayHintResolve: A({ method: "inlayHint/resolve" }),
		textDocumentDiagnostic: A({ method: "textDocument/diagnostic" }),
		workspaceDiagnostic: A({ method: "workspace/diagnostic" }),
		textDocumentInlineCompletion: A({ method: "textDocument/inlineCompletion" }),
		initialize: A({ method: "initialize" }),
		shutdown: A({ method: "shutdown" }),
		textDocumentWillSaveWaitUntil: A({ method: "textDocument/willSaveWaitUntil" }),
		textDocumentCompletion: A({ method: "textDocument/completion" }),
		completionItemResolve: A({ method: "completionItem/resolve" }),
		textDocumentHover: A({ method: "textDocument/hover" }),
		textDocumentSignatureHelp: A({ method: "textDocument/signatureHelp" }),
		textDocumentDefinition: A({ method: "textDocument/definition" }),
		textDocumentReferences: A({ method: "textDocument/references" }),
		textDocumentDocumentHighlight: A({ method: "textDocument/documentHighlight" }),
		textDocumentDocumentSymbol: A({ method: "textDocument/documentSymbol" }),
		textDocumentCodeAction: A({ method: "textDocument/codeAction" }),
		codeActionResolve: A({ method: "codeAction/resolve" }),
		workspaceSymbol: A({ method: "workspace/symbol" }),
		workspaceSymbolResolve: A({ method: "workspaceSymbol/resolve" }),
		textDocumentCodeLens: A({ method: "textDocument/codeLens" }),
		codeLensResolve: A({ method: "codeLens/resolve" }),
		textDocumentDocumentLink: A({ method: "textDocument/documentLink" }),
		documentLinkResolve: A({ method: "documentLink/resolve" }),
		textDocumentFormatting: A({ method: "textDocument/formatting" }),
		textDocumentRangeFormatting: A({ method: "textDocument/rangeFormatting" }),
		textDocumentRangesFormatting: A({ method: "textDocument/rangesFormatting" }),
		textDocumentOnTypeFormatting: A({ method: "textDocument/onTypeFormatting" }),
		textDocumentRename: A({ method: "textDocument/rename" }),
		textDocumentPrepareRename: A({ method: "textDocument/prepareRename" }),
		workspaceExecuteCommand: A({ method: "workspace/executeCommand" }),
		workspaceDidChangeWorkspaceFolders: j({ method: "workspace/didChangeWorkspaceFolders" }),
		windowWorkDoneProgressCancel: j({ method: "window/workDoneProgress/cancel" }),
		workspaceDidCreateFiles: j({ method: "workspace/didCreateFiles" }),
		workspaceDidRenameFiles: j({ method: "workspace/didRenameFiles" }),
		workspaceDidDeleteFiles: j({ method: "workspace/didDeleteFiles" }),
		notebookDocumentDidOpen: j({ method: "notebookDocument/didOpen" }),
		notebookDocumentDidChange: j({ method: "notebookDocument/didChange" }),
		notebookDocumentDidSave: j({ method: "notebookDocument/didSave" }),
		notebookDocumentDidClose: j({ method: "notebookDocument/didClose" }),
		initialized: j({ method: "initialized" }),
		exit: j({ method: "exit" }),
		workspaceDidChangeConfiguration: j({ method: "workspace/didChangeConfiguration" }),
		textDocumentDidOpen: j({ method: "textDocument/didOpen" }),
		textDocumentDidChange: j({ method: "textDocument/didChange" }),
		textDocumentDidClose: j({ method: "textDocument/didClose" }),
		textDocumentDidSave: j({ method: "textDocument/didSave" }),
		textDocumentWillSave: j({ method: "textDocument/willSave" }),
		workspaceDidChangeWatchedFiles: j({ method: "workspace/didChangeWatchedFiles" }),
		setTrace: j({ method: "$/setTrace" }),
		cancelRequest: j({ method: "$/cancelRequest" }),
		progress: j({ method: "$/progress" })
	},
	client: {
		workspaceWorkspaceFolders: A({ method: "workspace/workspaceFolders" }).optional(),
		workspaceConfiguration: A({ method: "workspace/configuration" }).optional(),
		workspaceFoldingRangeRefresh: A({ method: "workspace/foldingRange/refresh" }).optional(),
		windowWorkDoneProgressCreate: A({ method: "window/workDoneProgress/create" }).optional(),
		workspaceSemanticTokensRefresh: A({ method: "workspace/semanticTokens/refresh" }).optional(),
		windowShowDocument: A({ method: "window/showDocument" }).optional(),
		workspaceInlineValueRefresh: A({ method: "workspace/inlineValue/refresh" }).optional(),
		workspaceInlayHintRefresh: A({ method: "workspace/inlayHint/refresh" }).optional(),
		workspaceDiagnosticRefresh: A({ method: "workspace/diagnostic/refresh" }).optional(),
		clientRegisterCapability: A({ method: "client/registerCapability" }).optional(),
		clientUnregisterCapability: A({ method: "client/unregisterCapability" }).optional(),
		windowShowMessageRequest: A({ method: "window/showMessageRequest" }).optional(),
		workspaceCodeLensRefresh: A({ method: "workspace/codeLens/refresh" }).optional(),
		workspaceApplyEdit: A({ method: "workspace/applyEdit" }).optional(),
		windowShowMessage: j({ method: "window/showMessage" }),
		windowLogMessage: j({ method: "window/logMessage" }),
		telemetryEvent: j({ method: "telemetry/event" }),
		textDocumentPublishDiagnostics: j({ method: "textDocument/publishDiagnostics" }),
		logTrace: j({ method: "$/logTrace" }),
		cancelRequest: j({ method: "$/cancelRequest" }),
		progress: j({ method: "$/progress" })
	}
});
function G(e, t) {
	if (e.textModel !== t) throw Error(`Expected text model to be ${t}, but got ${e.textModel}`);
	return e;
}
var K = (T = class {
	constructor() {
		S(this, "_store", new q());
	}
	dispose() {
		this._store.dispose();
	}
	_register(e) {
		if (e === this) throw Error("Cannot register a disposable on itself!");
		return this._store.add(e);
	}
}, S(T, "None", Object.freeze({ dispose() {} })), T), q = (E = class {
	constructor() {
		S(this, "_toDispose", /* @__PURE__ */ new Set()), S(this, "_isDisposed", !1);
	}
	dispose() {
		this._isDisposed || (this._isDisposed = !0, this.clear());
	}
	clear() {
		if (this._toDispose.size !== 0) try {
			for (let e of this._toDispose) e.dispose();
		} finally {
			this._toDispose.clear();
		}
	}
	add(e) {
		if (!e) return e;
		if (e === this) throw Error("Cannot register a disposable on itself!");
		return this._isDisposed ? E.DISABLE_DISPOSED_WARNING || console.warn((/* @__PURE__ */ Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!")).stack) : this._toDispose.add(e), e;
	}
}, S(E, "DISABLE_DISPOSED_WARNING", !1), E), ct = /* @__PURE__ */ new Map([
	[I.Empty, ""],
	[I.QuickFix, "quickfix"],
	[I.Refactor, "refactor"],
	[I.RefactorExtract, "refactor.extract"],
	[I.RefactorInline, "refactor.inline"],
	[I.RefactorRewrite, "refactor.rewrite"],
	[I.Source, "source"],
	[I.SourceOrganizeImports, "source.organizeImports"],
	[I.SourceFixAll, "source.fixAll"]
]);
function lt(e) {
	if (e) return ct.get(e) ?? e;
}
var ut = /* @__PURE__ */ new Map([[a.CodeActionTriggerType.Invoke, V.Invoked], [a.CodeActionTriggerType.Auto, V.Automatic]]);
function dt(e) {
	return ut.get(e) ?? V.Invoked;
}
var ft = /* @__PURE__ */ new Map([
	[P.Text, a.CompletionItemKind.Text],
	[P.Method, a.CompletionItemKind.Method],
	[P.Function, a.CompletionItemKind.Function],
	[P.Constructor, a.CompletionItemKind.Constructor],
	[P.Field, a.CompletionItemKind.Field],
	[P.Variable, a.CompletionItemKind.Variable],
	[P.Class, a.CompletionItemKind.Class],
	[P.Interface, a.CompletionItemKind.Interface],
	[P.Module, a.CompletionItemKind.Module],
	[P.Property, a.CompletionItemKind.Property],
	[P.Unit, a.CompletionItemKind.Unit],
	[P.Value, a.CompletionItemKind.Value],
	[P.Enum, a.CompletionItemKind.Enum],
	[P.Keyword, a.CompletionItemKind.Keyword],
	[P.Snippet, a.CompletionItemKind.Snippet],
	[P.Color, a.CompletionItemKind.Color],
	[P.File, a.CompletionItemKind.File],
	[P.Reference, a.CompletionItemKind.Reference],
	[P.Folder, a.CompletionItemKind.Folder],
	[P.EnumMember, a.CompletionItemKind.EnumMember],
	[P.Constant, a.CompletionItemKind.Constant],
	[P.Struct, a.CompletionItemKind.Struct],
	[P.Event, a.CompletionItemKind.Event],
	[P.Operator, a.CompletionItemKind.Operator],
	[P.TypeParameter, a.CompletionItemKind.TypeParameter]
]);
function pt(e) {
	return e ? ft.get(e) ?? a.CompletionItemKind.Text : a.CompletionItemKind.Text;
}
var mt = /* @__PURE__ */ new Map([[it.Deprecated, a.CompletionItemTag.Deprecated]]);
function ht(e) {
	return mt.get(e);
}
var gt = /* @__PURE__ */ new Map([
	[a.CompletionTriggerKind.Invoke, z.Invoked],
	[a.CompletionTriggerKind.TriggerCharacter, z.TriggerCharacter],
	[a.CompletionTriggerKind.TriggerForIncompleteCompletions, z.TriggerForIncompleteCompletions]
]);
function _t(e) {
	return gt.get(e) ?? z.Invoked;
}
var vt = /* @__PURE__ */ new Map([[at.Snippet, a.CompletionItemInsertTextRule.InsertAsSnippet]]);
function yt(e) {
	if (e) return vt.get(e);
}
var bt = /* @__PURE__ */ new Map([
	[N.File, a.SymbolKind.File],
	[N.Module, a.SymbolKind.Module],
	[N.Namespace, a.SymbolKind.Namespace],
	[N.Package, a.SymbolKind.Package],
	[N.Class, a.SymbolKind.Class],
	[N.Method, a.SymbolKind.Method],
	[N.Property, a.SymbolKind.Property],
	[N.Field, a.SymbolKind.Field],
	[N.Constructor, a.SymbolKind.Constructor],
	[N.Enum, a.SymbolKind.Enum],
	[N.Interface, a.SymbolKind.Interface],
	[N.Function, a.SymbolKind.Function],
	[N.Variable, a.SymbolKind.Variable],
	[N.Constant, a.SymbolKind.Constant],
	[N.String, a.SymbolKind.String],
	[N.Number, a.SymbolKind.Number],
	[N.Boolean, a.SymbolKind.Boolean],
	[N.Array, a.SymbolKind.Array],
	[N.Object, a.SymbolKind.Object],
	[N.Key, a.SymbolKind.Key],
	[N.Null, a.SymbolKind.Null],
	[N.EnumMember, a.SymbolKind.EnumMember],
	[N.Struct, a.SymbolKind.Struct],
	[N.Event, a.SymbolKind.Event],
	[N.Operator, a.SymbolKind.Operator],
	[N.TypeParameter, a.SymbolKind.TypeParameter]
]);
function xt(e) {
	return bt.get(e) ?? a.SymbolKind.File;
}
var St = /* @__PURE__ */ new Map([[tt.Deprecated, a.SymbolTag.Deprecated]]);
function Ct(e) {
	return St.get(e);
}
var wt = /* @__PURE__ */ new Map([
	[F.Text, a.DocumentHighlightKind.Text],
	[F.Read, a.DocumentHighlightKind.Read],
	[F.Write, a.DocumentHighlightKind.Write]
]);
function Tt(e) {
	return e ? wt.get(e) ?? a.DocumentHighlightKind.Text : a.DocumentHighlightKind.Text;
}
var Et = /* @__PURE__ */ new Map([
	[M.Comment, a.FoldingRangeKind.Comment],
	[M.Imports, a.FoldingRangeKind.Imports],
	[M.Region, a.FoldingRangeKind.Region]
]);
function Dt(e) {
	if (e) return Et.get(e);
}
var Ot = /* @__PURE__ */ new Map([
	[e.Error, R.Error],
	[e.Warning, R.Warning],
	[e.Info, R.Information],
	[e.Hint, R.Hint]
]);
function kt(e) {
	return Ot.get(e) ?? R.Error;
}
var At = /* @__PURE__ */ new Map([
	[R.Error, e.Error],
	[R.Warning, e.Warning],
	[R.Information, e.Info],
	[R.Hint, e.Hint]
]);
function jt(t) {
	return t ? At.get(t) ?? e.Error : e.Error;
}
var Mt = /* @__PURE__ */ new Map([[ot.Unnecessary, u.Unnecessary], [ot.Deprecated, u.Deprecated]]);
function Nt(e) {
	return Mt.get(e);
}
var Pt = /* @__PURE__ */ new Map([
	[a.SignatureHelpTriggerKind.Invoke, B.Invoked],
	[a.SignatureHelpTriggerKind.TriggerCharacter, B.TriggerCharacter],
	[a.SignatureHelpTriggerKind.ContentChange, B.ContentChange]
]);
function Ft(e) {
	return Pt.get(e) ?? B.Invoked;
}
function J(e) {
	if (e) return {
		id: e.command,
		title: e.title,
		arguments: e.arguments
	};
}
var It = /* @__PURE__ */ new Map([[nt.Type, a.InlayHintKind.Type], [nt.Parameter, a.InlayHintKind.Parameter]]);
function Lt(e) {
	return e ? It.get(e) ?? a.InlayHintKind.Type : a.InlayHintKind.Type;
}
function Y(e, t) {
	if ("targetUri" in e) {
		let n = t.bridge.translateBackRange({ uri: e.targetUri }, e.targetRange);
		return {
			uri: n.textModel.uri,
			range: n.range,
			originSelectionRange: e.originSelectionRange ? t.bridge.translateBackRange({ uri: e.targetUri }, e.originSelectionRange).range : void 0,
			targetSelectionRange: e.targetSelectionRange ? t.bridge.translateBackRange({ uri: e.targetUri }, e.targetSelectionRange).range : void 0
		};
	} else {
		let n = t.bridge.translateBackRange({ uri: e.uri }, e.range);
		return {
			uri: n.textModel.uri,
			range: n.range
		};
	}
}
function X(e) {
	return !e || e.length === 0 ? { language: "*" } : e.map((e) => "notebook" in e ? typeof e.notebook == "string" ? {
		notebookType: e.notebook,
		language: e.language
	} : {
		notebookType: e.notebook.notebookType,
		language: e.language,
		pattern: e.notebook.pattern,
		scheme: e.notebook.scheme
	} : {
		language: e.language,
		pattern: e.pattern,
		scheme: e.scheme
	});
}
function Rt(e, t) {
	if (!t) return !0;
	let n = e.getLanguageId();
	if (e.uri.toString(!0), !t || t.length === 0) return !0;
	for (let e of t) if (!(e.language && e.language !== "*" && e.language !== n)) return !0;
	return !1;
}
function Z(e) {
	let t = {
		severity: jt(e.severity),
		startLineNumber: e.range.start.line + 1,
		startColumn: e.range.start.character + 1,
		endLineNumber: e.range.end.line + 1,
		endColumn: e.range.end.character + 1,
		message: e.message,
		source: e.source,
		code: typeof e.code == "string" ? e.code : e.code?.toString()
	};
	return e.tags && (t.tags = e.tags.map((e) => Nt(e)).filter((e) => e !== void 0)), e.relatedInformation && (t.relatedInformation = e.relatedInformation.map((e) => ({
		resource: r.parse(e.location.uri),
		startLineNumber: e.location.range.start.line + 1,
		startColumn: e.location.range.start.character + 1,
		endLineNumber: e.location.range.end.line + 1,
		endColumn: e.location.range.end.character + 1,
		message: e.message
	}))), t;
}
var zt = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { completion: {
			dynamicRegistration: !0,
			contextSupport: !0,
			completionItemKind: { valueSet: Array.from(ft.keys()) },
			completionItem: {
				tagSupport: { valueSet: Array.from(mt.keys()) },
				commitCharactersSupport: !0,
				deprecatedSupport: !0,
				preselectSupport: !0
			}
		} } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentCompletion, !0, (e) => a.registerCompletionItemProvider(X(e.documentSelector), new Bt(this._connection, e))));
	}
}, Bt = class {
	constructor(e, t) {
		S(this, "resolveCompletionItem"), this._client = e, this._capabilities = t, t.resolveProvider && (this.resolveCompletionItem = async (e, t) => (Ht(e, await this._client.server.completionItemResolve(e._lspItem), this._client.bridge, e._translated, e._model), e));
	}
	get triggerCharacters() {
		return this._capabilities.triggerCharacters;
	}
	async provideCompletionItems(e, t, n, r) {
		let i = this._client.bridge.translate(e, t), a = await this._client.server.textDocumentCompletion({
			textDocument: i.textDocument,
			position: i.position,
			context: n.triggerCharacter ? {
				triggerKind: _t(n.triggerKind),
				triggerCharacter: n.triggerCharacter
			} : void 0
		});
		return a ? { suggestions: (Array.isArray(a) ? a : a.items).map((n) => ({
			...Vt(n, this._client.bridge, i, e, t),
			_lspItem: n,
			_translated: i,
			_model: e
		})) } : { suggestions: [] };
	}
};
function Vt(e, n, r, i, a) {
	let o = e.insertText || e.label, s;
	e.textEdit && ("range" in e.textEdit ? (o = e.textEdit.newText, s = G(n.translateBackRange(r.textDocument, e.textEdit.range), i).range) : (o = e.textEdit.newText, s = {
		insert: G(n.translateBackRange(r.textDocument, e.textEdit.insert), i).range,
		replace: G(n.translateBackRange(r.textDocument, e.textEdit.replace), i).range
	})), s ||= t.fromPositions(a, a);
	let c = {
		label: e.label,
		kind: pt(e.kind),
		insertText: o,
		sortText: e.sortText,
		filterText: e.filterText,
		preselect: e.preselect,
		commitCharacters: e.commitCharacters,
		range: s
	};
	return Ht(c, e, n, r, i), c;
}
function Ht(e, t, n, r, i) {
	t.detail !== void 0 && (e.detail = t.detail), t.documentation !== void 0 && (e.documentation = Ut(t.documentation)), t.insertTextFormat !== void 0 && (e.insertTextRules = yt(t.insertTextFormat)), t.tags && t.tags.length > 0 && (e.tags = t.tags.map(ht).filter((e) => e !== void 0)), t.additionalTextEdits && t.additionalTextEdits.length > 0 && (e.additionalTextEdits = t.additionalTextEdits.map((e) => ({
		range: G(n.translateBackRange(r.textDocument, e.range), i).range,
		text: e.newText
	}))), t.command && (e.command = J(t.command));
}
function Ut(e) {
	if (e) return typeof e == "string" ? e : {
		value: e.value,
		isTrusted: !0
	};
}
var Wt = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { hover: {
			dynamicRegistration: !0,
			contentFormat: [L.Markdown, L.PlainText]
		} } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentHover, !0, (e) => a.registerHoverProvider(X(e.documentSelector), new Gt(this._connection, e))));
	}
}, Gt = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideHover(e, t, n) {
		let r = this._client.bridge.translate(e, t), i = await this._client.server.textDocumentHover({
			textDocument: r.textDocument,
			position: r.position
		});
		return !i || !i.contents ? null : {
			contents: Kt(i.contents),
			range: i.range ? this._client.bridge.translateBackRange(r.textDocument, i.range).range : void 0
		};
	}
};
function Kt(e) {
	return Array.isArray(e) ? e.map((e) => qt(e)) : [qt(e)];
}
function qt(e) {
	return typeof e == "string" ? {
		value: e,
		isTrusted: !0
	} : "kind" in e ? {
		value: e.value,
		isTrusted: !0
	} : {
		value: `\`\`\`${e.language}
${e.value}
\`\`\``,
		isTrusted: !0
	};
}
var Jt = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { signatureHelp: {
			dynamicRegistration: !0,
			contextSupport: !0,
			signatureInformation: {
				documentationFormat: [L.Markdown, L.PlainText],
				parameterInformation: { labelOffsetSupport: !0 },
				activeParameterSupport: !0
			}
		} } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentSignatureHelp, !0, (e) => a.registerSignatureHelpProvider(X(e.documentSelector), new Yt(this._connection, e))));
	}
}, Yt = class {
	constructor(e, t) {
		S(this, "signatureHelpTriggerCharacters"), S(this, "signatureHelpRetriggerCharacters"), this._client = e, this._capabilities = t, this.signatureHelpTriggerCharacters = t.triggerCharacters, this.signatureHelpRetriggerCharacters = t.retriggerCharacters;
	}
	async provideSignatureHelp(e, t, n, r) {
		let i = this._client.bridge.translate(e, t), a = await this._client.server.textDocumentSignatureHelp({
			textDocument: i.textDocument,
			position: i.position,
			context: {
				triggerKind: Ft(r.triggerKind),
				triggerCharacter: r.triggerCharacter,
				isRetrigger: r.isRetrigger
			}
		});
		return a ? {
			value: {
				signatures: a.signatures.map((e) => ({
					label: e.label,
					documentation: Xt(e.documentation),
					parameters: e.parameters?.map((e) => ({
						label: e.label,
						documentation: Xt(e.documentation)
					})) || [],
					activeParameter: e.activeParameter
				})),
				activeSignature: a.activeSignature || 0,
				activeParameter: a.activeParameter || 0
			},
			dispose: () => {}
		} : null;
	}
};
function Xt(e) {
	if (e) return typeof e == "string" ? e : {
		value: e.value,
		isTrusted: !0
	};
}
var Zt = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { definition: {
			dynamicRegistration: !0,
			linkSupport: !0
		} } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentDefinition, !0, (e) => a.registerDefinitionProvider(X(e.documentSelector), new Qt(this._connection, e))));
	}
}, Qt = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideDefinition(e, t, n) {
		let r = this._client.bridge.translate(e, t), i = await this._client.server.textDocumentDefinition({
			textDocument: r.textDocument,
			position: r.position
		});
		return i ? Array.isArray(i) ? i.map((e) => Y(e, this._client)) : Y(i, this._client) : null;
	}
}, $t = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { declaration: {
			dynamicRegistration: !0,
			linkSupport: !0
		} } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentDeclaration, !0, (e) => a.registerDeclarationProvider(X(e.documentSelector), new en(this._connection, e))));
	}
}, en = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideDeclaration(e, t, n) {
		let r = this._client.bridge.translate(e, t), i = await this._client.server.textDocumentDeclaration({
			textDocument: r.textDocument,
			position: r.position
		});
		return i ? Array.isArray(i) ? i.map((e) => Y(e, this._client)) : Y(i, this._client) : null;
	}
}, tn = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { typeDefinition: {
			dynamicRegistration: !0,
			linkSupport: !0
		} } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentTypeDefinition, !0, (e) => a.registerTypeDefinitionProvider(X(e.documentSelector), new nn(this._connection, e))));
	}
}, nn = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideTypeDefinition(e, t, n) {
		let r = this._client.bridge.translate(e, t), i = await this._client.server.textDocumentTypeDefinition({
			textDocument: r.textDocument,
			position: r.position
		});
		return i ? Array.isArray(i) ? i.map((e) => Y(e, this._client)) : Y(i, this._client) : null;
	}
}, rn = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { implementation: {
			dynamicRegistration: !0,
			linkSupport: !0
		} } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentImplementation, !0, (e) => a.registerImplementationProvider(X(e.documentSelector), new an(this._connection, e))));
	}
}, an = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideImplementation(e, t, n) {
		let r = this._client.bridge.translate(e, t), i = await this._client.server.textDocumentImplementation({
			textDocument: r.textDocument,
			position: r.position
		});
		return i ? Array.isArray(i) ? i.map((e) => Y(e, this._client)) : Y(i, this._client) : null;
	}
}, on = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { references: { dynamicRegistration: !0 } } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentReferences, !0, (e) => a.registerReferenceProvider(X(e.documentSelector), new sn(this._connection, e))));
	}
}, sn = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideReferences(e, t, n, r) {
		let i = this._client.bridge.translate(e, t), a = await this._client.server.textDocumentReferences({
			textDocument: i.textDocument,
			position: i.position,
			context: { includeDeclaration: n.includeDeclaration }
		});
		return a ? a.map((e) => {
			let t = this._client.bridge.translateBackRange({ uri: e.uri }, e.range);
			return {
				uri: t.textModel.uri,
				range: t.range
			};
		}) : null;
	}
}, cn = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { documentHighlight: { dynamicRegistration: !0 } } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentDocumentHighlight, !0, (e) => a.registerDocumentHighlightProvider(X(e.documentSelector), new ln(this._connection, e))));
	}
}, ln = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideDocumentHighlights(e, t, n) {
		let r = this._client.bridge.translate(e, t), i = await this._client.server.textDocumentDocumentHighlight({
			textDocument: r.textDocument,
			position: r.position
		});
		return i ? i.map((e) => ({
			range: this._client.bridge.translateBackRange(r.textDocument, e.range).range,
			kind: Tt(e.kind)
		})) : null;
	}
}, un = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { documentSymbol: {
			dynamicRegistration: !0,
			hierarchicalDocumentSymbolSupport: !0,
			symbolKind: { valueSet: Array.from(bt.keys()) },
			tagSupport: { valueSet: [tt.Deprecated] }
		} } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentDocumentSymbol, !0, (e) => a.registerDocumentSymbolProvider(X(e.documentSelector), new dn(this._connection, e))));
	}
}, dn = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideDocumentSymbols(e, t) {
		let n = this._client.bridge.translate(e, new f(1, 1)), r = await this._client.server.textDocumentDocumentSymbol({ textDocument: n.textDocument });
		return r ? Array.isArray(r) && r.length > 0 ? "location" in r[0] ? r.map((e) => pn(e, this._client)) : r.map((e) => fn(e, this._client, n.textDocument)) : [] : null;
	}
};
function fn(e, t, n) {
	return {
		name: e.name,
		detail: e.detail || "",
		kind: xt(e.kind),
		tags: e.tags?.map((e) => Ct(e)).filter((e) => e !== void 0) || [],
		range: t.bridge.translateBackRange(n, e.range).range,
		selectionRange: t.bridge.translateBackRange(n, e.selectionRange).range,
		children: e.children?.map((e) => fn(e, t, n)) || []
	};
}
function pn(e, t) {
	return {
		name: e.name,
		detail: "",
		kind: xt(e.kind),
		tags: e.tags?.map((e) => Ct(e)).filter((e) => e !== void 0) || [],
		range: t.bridge.translateBackRange({ uri: e.location.uri }, e.location.range).range,
		selectionRange: t.bridge.translateBackRange({ uri: e.location.uri }, e.location.range).range,
		children: []
	};
}
var mn = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { rename: {
			dynamicRegistration: !0,
			prepareSupport: !0
		} } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentRename, !0, (e) => a.registerRenameProvider(X(e.documentSelector), new hn(this._connection, e))));
	}
}, hn = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideRenameEdits(e, t, n, r) {
		let i = this._client.bridge.translate(e, t), a = await this._client.server.textDocumentRename({
			textDocument: i.textDocument,
			position: i.position,
			newName: n
		});
		return a ? gn(a, this._client) : null;
	}
	async resolveRenameLocation(e, t, n) {
		if (!this._capabilities.prepareProvider) return null;
		let r = this._client.bridge.translate(e, t), i = await this._client.server.textDocumentPrepareRename({
			textDocument: r.textDocument,
			position: r.position
		});
		if (!i) return null;
		if ("range" in i && "placeholder" in i) return {
			range: this._client.bridge.translateBackRange(r.textDocument, i.range).range,
			text: i.placeholder
		};
		if ("defaultBehavior" in i) return null;
		if ("start" in i && "end" in i) {
			let t = this._client.bridge.translateBackRange(r.textDocument, i).range;
			return {
				range: t,
				text: e.getValueInRange(t)
			};
		}
		return null;
	}
};
function gn(e, t) {
	let n = [];
	if (e.changes) for (let r in e.changes) {
		let i = e.changes[r];
		for (let e of i) {
			let i = t.bridge.translateBackRange({ uri: r }, e.range);
			n.push({
				resource: i.textModel.uri,
				versionId: void 0,
				textEdit: {
					range: i.range,
					text: e.newText
				}
			});
		}
	}
	if (e.documentChanges) {
		for (let r of e.documentChanges) if ("textDocument" in r) {
			let e = r.textDocument.uri;
			for (let i of r.edits) {
				let a = t.bridge.translateBackRange({ uri: e }, i.range);
				n.push({
					resource: a.textModel.uri,
					versionId: r.textDocument.version,
					textEdit: {
						range: a.range,
						text: i.newText
					}
				});
			}
		}
	}
	return { edits: n };
}
var _n = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { codeAction: {
			dynamicRegistration: !0,
			codeActionLiteralSupport: { codeActionKind: { valueSet: Array.from(ct.keys()) } },
			isPreferredSupport: !0,
			disabledSupport: !0,
			dataSupport: !0,
			resolveSupport: { properties: ["edit"] }
		} } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentCodeAction, !0, (e) => a.registerCodeActionProvider(X(e.documentSelector), new vn(this._connection, e))));
	}
}, vn = class {
	constructor(e, t) {
		S(this, "resolveCodeAction"), this._client = e, this._capabilities = t, t.resolveProvider && (this.resolveCodeAction = async (e, t) => {
			if (e._lspAction) {
				let t = await this._client.server.codeActionResolve(e._lspAction);
				t.edit && (e.edit = yn(t.edit, this._client)), t.command && (e.command = J(t.command));
			}
			return e;
		});
	}
	async provideCodeActions(e, n, r, i) {
		let a = this._client.bridge.translate(e, n.getStartPosition()), o = await this._client.server.textDocumentCodeAction({
			textDocument: a.textDocument,
			range: this._client.bridge.translateRange(e, n),
			context: {
				diagnostics: r.markers.map((n) => ({
					range: this._client.bridge.translateRange(e, t.lift(n)),
					message: n.message,
					severity: kt(n.severity)
				})),
				triggerKind: dt(r.trigger)
			}
		});
		return o ? {
			actions: (Array.isArray(o) ? o : [o]).map((e) => {
				if ("title" in e && !("kind" in e)) {
					let t = e;
					return {
						title: t.title,
						command: J(t)
					};
				} else {
					let t = e;
					return {
						title: t.title,
						kind: lt(t.kind),
						isPreferred: t.isPreferred,
						disabled: t.disabled?.reason,
						edit: t.edit ? yn(t.edit, this._client) : void 0,
						command: J(t.command),
						_lspAction: t
					};
				}
			}),
			dispose: () => {}
		} : null;
	}
};
function yn(e, t) {
	let n = [];
	if (e.changes) for (let r in e.changes) {
		let i = e.changes[r];
		for (let e of i) {
			let i = t.bridge.translateBackRange({ uri: r }, e.range);
			n.push({
				resource: i.textModel.uri,
				versionId: void 0,
				textEdit: {
					range: i.range,
					text: e.newText
				}
			});
		}
	}
	if (e.documentChanges) {
		for (let r of e.documentChanges) if ("textDocument" in r) {
			let e = r.textDocument.uri;
			for (let i of r.edits) {
				let a = t.bridge.translateBackRange({ uri: e }, i.range);
				n.push({
					resource: a.textModel.uri,
					versionId: r.textDocument.version ?? void 0,
					textEdit: {
						range: a.range,
						text: i.newText
					}
				});
			}
		}
	}
	return { edits: n };
}
var bn = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { codeLens: { dynamicRegistration: !0 } } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentCodeLens, !0, (e) => a.registerCodeLensProvider(X(e.documentSelector), new xn(this._connection, e))));
	}
}, xn = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideCodeLenses(e, t) {
		let n = this._client.bridge.translate(e, new f(1, 1)), r = await this._client.server.textDocumentCodeLens({ textDocument: n.textDocument });
		return r ? {
			lenses: r.map((t) => ({
				range: G(this._client.bridge.translateBackRange(n.textDocument, t.range), e).range,
				command: J(t.command),
				_lspCodeLens: t
			})),
			dispose: () => {}
		} : null;
	}
	async resolveCodeLens(e, t, n) {
		if (!this._capabilities.resolveProvider || !t._lspCodeLens) return t;
		let r = await this._client.server.codeLensResolve(t._lspCodeLens);
		return r.command && (t.command = {
			id: r.command.command,
			title: r.command.title,
			arguments: r.command.arguments
		}), t;
	}
}, Sn = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { documentLink: {
			dynamicRegistration: !0,
			tooltipSupport: !0
		} } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentDocumentLink, !0, (e) => a.registerLinkProvider(X(e.documentSelector), new Cn(this._connection, e))));
	}
}, Cn = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideLinks(e, t) {
		let n = this._client.bridge.translate(e, new f(1, 1)), r = await this._client.server.textDocumentDocumentLink({ textDocument: n.textDocument });
		return r ? { links: r.map((e) => ({
			range: this._client.bridge.translateBackRange(n.textDocument, e.range).range,
			url: e.target,
			tooltip: e.tooltip
		})) } : null;
	}
	async resolveLink(e, t) {
		return this._capabilities.resolveProvider, e;
	}
}, wn = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { formatting: { dynamicRegistration: !0 } } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentFormatting, !0, (e) => a.registerDocumentFormattingEditProvider(X(e.documentSelector), new Tn(this._connection, e))));
	}
}, Tn = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideDocumentFormattingEdits(e, t, n) {
		let r = this._client.bridge.translate(e, new f(1, 1)), i = await this._client.server.textDocumentFormatting({
			textDocument: r.textDocument,
			options: {
				tabSize: t.tabSize,
				insertSpaces: t.insertSpaces
			}
		});
		return i ? i.map((e) => ({
			range: this._client.bridge.translateBackRange(r.textDocument, e.range).range,
			text: e.newText
		})) : null;
	}
}, En = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { rangeFormatting: { dynamicRegistration: !0 } } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentRangeFormatting, !0, (e) => a.registerDocumentRangeFormattingEditProvider(X(e.documentSelector), new Dn(this._connection, e))));
	}
}, Dn = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideDocumentRangeFormattingEdits(e, t, n, r) {
		let i = this._client.bridge.translate(e, t.getStartPosition()), a = await this._client.server.textDocumentRangeFormatting({
			textDocument: i.textDocument,
			range: this._client.bridge.translateRange(e, t),
			options: {
				tabSize: n.tabSize,
				insertSpaces: n.insertSpaces
			}
		});
		return a ? a.map((e) => ({
			range: this._client.bridge.translateBackRange(i.textDocument, e.range).range,
			text: e.newText
		})) : null;
	}
}, On = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { onTypeFormatting: { dynamicRegistration: !0 } } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentOnTypeFormatting, !0, (e) => a.registerOnTypeFormattingEditProvider(X(e.documentSelector), new kn(this._connection, e))));
	}
}, kn = class {
	constructor(e, t) {
		S(this, "autoFormatTriggerCharacters"), this._client = e, this._capabilities = t, this.autoFormatTriggerCharacters = [t.firstTriggerCharacter, ...t.moreTriggerCharacter || []];
	}
	async provideOnTypeFormattingEdits(e, t, n, r, i) {
		let a = this._client.bridge.translate(e, t), o = await this._client.server.textDocumentOnTypeFormatting({
			textDocument: a.textDocument,
			position: a.position,
			ch: n,
			options: {
				tabSize: r.tabSize,
				insertSpaces: r.insertSpaces
			}
		});
		return o ? o.map((e) => ({
			range: this._client.bridge.translateBackRange(a.textDocument, e.range).range,
			text: e.newText
		})) : null;
	}
}, An = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { foldingRange: {
			dynamicRegistration: !0,
			rangeLimit: 5e3,
			lineFoldingOnly: !1,
			foldingRangeKind: { valueSet: [
				M.Comment,
				M.Imports,
				M.Region
			] }
		} } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentFoldingRange, !0, (e) => a.registerFoldingRangeProvider(X(e.documentSelector), new jn(this._connection, e))));
	}
}, jn = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideFoldingRanges(e, t, n) {
		let r = this._client.bridge.translate(e, new f(1, 1)), i = await this._client.server.textDocumentFoldingRange({ textDocument: r.textDocument });
		return i ? i.map((e) => ({
			start: e.startLine + 1,
			end: e.endLine + 1,
			kind: Dt(e.kind)
		})) : null;
	}
}, Mn = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { selectionRange: { dynamicRegistration: !0 } } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentSelectionRange, !0, (e) => a.registerSelectionRangeProvider(X(e.documentSelector), new Nn(this._connection, e))));
	}
}, Nn = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	async provideSelectionRanges(e, t, n) {
		let r = this._client.bridge.translate(e, t[0]), i = await this._client.server.textDocumentSelectionRange({
			textDocument: r.textDocument,
			positions: t.map((t) => this._client.bridge.translate(e, t).position)
		});
		return i ? i.map((e) => this.convertSelectionRange(e, r.textDocument)) : null;
	}
	convertSelectionRange(e, t) {
		let n = [], r = e;
		for (; r;) n.push({ range: this._client.bridge.translateBackRange(t, r.range).range }), r = r.parent;
		return n;
	}
}, Pn = class extends K {
	constructor(e) {
		super(), S(this, "_providers", /* @__PURE__ */ new Set()), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({
			textDocument: { inlayHint: {
				dynamicRegistration: !0,
				resolveSupport: { properties: [
					"tooltip",
					"textEdits",
					"label.tooltip",
					"label.location",
					"label.command"
				] }
			} },
			workspace: { inlayHint: { refreshSupport: !0 } }
		})), this._register(this._connection.connection.registerRequestHandler(W.client.workspaceInlayHintRefresh, async () => {
			for (let e of this._providers) e.refresh();
			return { ok: null };
		})), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentInlayHint, !0, (e) => {
			let t = new Fn(this._connection, e);
			this._providers.add(t);
			let n = a.registerInlayHintsProvider(X(e.documentSelector), t);
			return { dispose: () => {
				this._providers.delete(t), n.dispose();
			} };
		}));
	}
}, Fn = class {
	constructor(e, t) {
		S(this, "_onDidChangeInlayHints", new l()), S(this, "onDidChangeInlayHints", this._onDidChangeInlayHints.event), S(this, "resolveInlayHint"), this._client = e, this._capabilities = t, t.resolveProvider && (this.resolveInlayHint = async (e, t) => {
			let n = await this._client.server.inlayHintResolve(e._lspInlayHint);
			return n.tooltip && (e.tooltip = Rn(n.tooltip)), n.label !== e._lspInlayHint.label && (e.label = Ln(n.label)), n.textEdits && (e.textEdits = n.textEdits.map((t) => ({
				range: this._client.bridge.translateBackRange({ uri: e._targetUri }, t.range).range,
				text: t.newText
			}))), e;
		});
	}
	refresh() {
		this._onDidChangeInlayHints.fire();
	}
	async provideInlayHints(e, t, n) {
		let r = this._client.bridge.translate(e, t.getStartPosition()), i = await In(async () => await this._client.server.textDocumentInlayHint({
			textDocument: r.textDocument,
			range: this._client.bridge.translateRange(e, t)
		}));
		return i ? {
			hints: i.map((t) => ({
				label: Ln(t.label),
				position: G(this._client.bridge.translateBack(r.textDocument, t.position), e).position,
				kind: Lt(t.kind),
				tooltip: Rn(t.tooltip),
				paddingLeft: t.paddingLeft,
				paddingRight: t.paddingRight,
				textEdits: t.textEdits?.map((t) => ({
					range: G(this._client.bridge.translateBackRange(r.textDocument, t.range), e).range,
					text: t.newText
				})),
				_lspInlayHint: t,
				_targetUri: r.textDocument.uri
			})),
			dispose: () => {}
		} : null;
	}
};
async function In(e) {
	for (let t = 3;; t--) try {
		return await e();
	} catch (e) {
		if (e.message === "content modified" && t > 0) continue;
		throw e;
	}
}
function Ln(e) {
	return typeof e == "string" ? e : e.map((e) => {
		let n = {
			label: e.value,
			tooltip: Rn(e.tooltip),
			command: J(e.command)
		};
		return e.location && (n.location = {
			uri: r.parse(e.location.uri),
			range: new t(e.location.range.start.line + 1, e.location.range.start.character + 1, e.location.range.end.line + 1, e.location.range.end.character + 1)
		}), n;
	});
}
function Rn(e) {
	if (e) return typeof e == "string" ? e : {
		value: e.value,
		isTrusted: !0
	};
}
var zn = class extends K {
	constructor(e) {
		super(), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: { semanticTokens: {
			dynamicRegistration: !0,
			requests: {
				range: !0,
				full: { delta: !0 }
			},
			tokenTypes: [
				"namespace",
				"type",
				"class",
				"enum",
				"interface",
				"struct",
				"typeParameter",
				"parameter",
				"variable",
				"property",
				"enumMember",
				"event",
				"function",
				"method",
				"macro",
				"keyword",
				"modifier",
				"comment",
				"string",
				"number",
				"regexp",
				"operator",
				"decorator"
			],
			tokenModifiers: [
				"declaration",
				"definition",
				"readonly",
				"static",
				"deprecated",
				"abstract",
				"async",
				"modification",
				"documentation",
				"defaultLibrary"
			],
			formats: [st.Relative],
			overlappingTokenSupport: !1,
			multilineTokenSupport: !0
		} } })), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentSemanticTokensFull, !0, (e) => a.registerDocumentSemanticTokensProvider(X(e.documentSelector), new Bn(this._connection, e))));
	}
}, Bn = class {
	constructor(e, t) {
		this._client = e, this._capabilities = t;
	}
	getLegend() {
		return {
			tokenTypes: this._capabilities.legend.tokenTypes,
			tokenModifiers: this._capabilities.legend.tokenModifiers
		};
	}
	releaseDocumentSemanticTokens(e) {}
	async provideDocumentSemanticTokens(e, t, n) {
		let r = this._client.bridge.translate(e, e.getPositionAt(0)), i = this._capabilities.full;
		if (t && i && typeof i == "object" && i.delta) {
			let e = await this._client.server.textDocumentSemanticTokensFullDelta({
				textDocument: r.textDocument,
				previousResultId: t
			});
			return e ? "edits" in e ? {
				resultId: e.resultId,
				edits: e.edits.map((e) => ({
					start: e.start,
					deleteCount: e.deleteCount,
					data: e.data ? new Uint32Array(e.data) : void 0
				}))
			} : {
				resultId: e.resultId,
				data: new Uint32Array(e.data)
			} : null;
		}
		let a = await this._client.server.textDocumentSemanticTokensFull({ textDocument: r.textDocument });
		return a ? {
			resultId: a.resultId,
			data: new Uint32Array(a.data)
		} : null;
	}
	async provideDocumentSemanticTokensEdits(e, t, n) {
		return this.provideDocumentSemanticTokens(e, t, n);
	}
}, Vn = class extends K {
	constructor(e) {
		super(), S(this, "_diagnosticsMarkerOwner", "lsp"), S(this, "_pullDiagnosticProviders", /* @__PURE__ */ new Map()), this._connection = e, this._register(this._connection.capabilities.addStaticClientCapabilities({ textDocument: {
			publishDiagnostics: {
				relatedInformation: !0,
				tagSupport: { valueSet: [...Mt.keys()] },
				versionSupport: !0,
				codeDescriptionSupport: !0,
				dataSupport: !0
			},
			diagnostic: {
				dynamicRegistration: !0,
				relatedDocumentSupport: !0
			}
		} })), this._register(this._connection.connection.registerNotificationHandler(W.client.textDocumentPublishDiagnostics, (e) => this._handlePublishDiagnostics(e))), this._register(this._connection.capabilities.registerCapabilityHandler(U.textDocumentDiagnostic, !0, (e) => {
			let t = new q();
			for (let n of d.getModels()) this._addPullDiagnosticProvider(n, e, t);
			return t.add(d.onDidCreateModel((n) => {
				this._addPullDiagnosticProvider(n, e, t);
			})), t;
		}));
	}
	_addPullDiagnosticProvider(e, t, n) {
		if (e.getLanguageId(), !Rt(e, t.documentSelector)) return;
		let r = new Hn(e, this._connection, this._diagnosticsMarkerOwner, t);
		this._pullDiagnosticProviders.set(e, r), n.add(r), n.add(e.onWillDispose(() => {
			this._pullDiagnosticProviders.delete(e);
		}));
	}
	_handlePublishDiagnostics(e) {
		let t = e.uri;
		try {
			let n = this._connection.bridge.translateBack({ uri: t }, {
				line: 0,
				character: 0
			}).textModel;
			if (!n || n.isDisposed()) return;
			let r = e.diagnostics.map((e) => Z(e));
			d.setModelMarkers(n, this._diagnosticsMarkerOwner, r);
		} catch (e) {
			console.debug(`Could not set diagnostics for ${t}:`, e);
		}
	}
}, Hn = class extends K {
	constructor(e, t, n, r) {
		super(), S(this, "_updateHandle"), S(this, "_previousResultId"), this._model = e, this._connection = t, this._markerOwner = n, this._capability = r, this._register(this._model.onDidChangeContent(() => {
			this._scheduleDiagnosticUpdate();
		})), this._scheduleDiagnosticUpdate();
	}
	_scheduleDiagnosticUpdate() {
		this._updateHandle !== void 0 && clearTimeout(this._updateHandle), this._updateHandle = window.setTimeout(() => {
			this._updateHandle = void 0, this._requestDiagnostics();
		}, 500);
	}
	async _requestDiagnostics() {
		if (!this._model.isDisposed()) try {
			let e = this._connection.bridge.translate(this._model, new f(1, 1)), t = await this._connection.server.textDocumentDiagnostic({
				textDocument: e.textDocument,
				identifier: this._capability.identifier,
				previousResultId: this._previousResultId
			});
			if (this._model.isDisposed()) return;
			this._handleDiagnosticReport(t);
		} catch (e) {
			console.error("Error requesting diagnostics:", e);
		}
	}
	_handleDiagnosticReport(e) {
		if (e.kind === "full") {
			this._previousResultId = e.resultId;
			let t = e.items.map((e) => Z(e));
			d.setModelMarkers(this._model, this._markerOwner, t), "relatedDocuments" in e && e.relatedDocuments && this._handleRelatedDocuments(e.relatedDocuments);
		} else e.kind === "unchanged" && (this._previousResultId = e.resultId);
	}
	_handleRelatedDocuments(e) {
		for (let [t, n] of Object.entries(e)) try {
			let e = this._connection.bridge.translateBack({ uri: t }, {
				line: 0,
				character: 0
			}).textModel;
			if (!e || e.isDisposed()) continue;
			if (n.kind === "full") {
				let t = n.items.map((e) => Z(e));
				d.setModelMarkers(e, this._markerOwner, t);
			}
		} catch (e) {
			console.debug(`Could not set related diagnostics for ${t}:`, e);
		}
	}
	dispose() {
		this._updateHandle !== void 0 && (clearTimeout(this._updateHandle), this._updateHandle = void 0), super.dispose();
	}
}, Un = class {
	constructor(e, t, n, r) {
		this.server = e, this.bridge = t, this.capabilities = n, this.connection = r;
	}
}, Wn = class extends K {
	constructor(e) {
		super(), S(this, "_staticCapabilities", /* @__PURE__ */ new Set()), S(this, "_dynamicFromStatic", Xn.create()), S(this, "_registrations", /* @__PURE__ */ new Map()), S(this, "_serverCapabilities"), this._connection = e, this._register(this._connection.registerRequestHandler(W.client.clientRegisterCapability, async (e) => {
			for (let t of e.registrations) {
				let e = Jn(t.method), n = new Kn(t.id, e, t.registerOptions, !1);
				this._registerCapabilityOptions(n);
			}
			return { ok: null };
		})), this._register(this._connection.registerRequestHandler(W.client.clientUnregisterCapability, async (e) => {
			for (let t of e.unregisterations) {
				let e = Jn(t.method), n = this._registrations.get(e), r = n?.registrations.get(t.id);
				if (!r) throw Error(`No registration for method ${t.method} with id ${t.id}`);
				r?.handlerDisposables.forEach((e) => e.dispose()), n?.registrations.delete(t.id);
			}
			return { ok: null };
		}));
	}
	_registerCapabilityOptions(e) {
		let t = this._registrations.get(e.capability);
		if (t || (t = new Yn(), this._registrations.set(e.capability, t)), t.registrations.has(e.id)) throw Error(`Handler for method ${e.capability.method} with id ${e.id} already registered`);
		t.registrations.set(e.id, e);
		for (let n of t.handlers) !n.handleStaticCapability && e.isFromStatic || e.handlerDisposables.set(n, n.handler(e.options));
	}
	setServerCapabilities(e) {
		if (this._serverCapabilities) throw Error("Server capabilities already set");
		this._serverCapabilities = e;
		for (let t of Object.values(U)) {
			let n = this._dynamicFromStatic.getOptions(t, e);
			n && this._registerCapabilityOptions(new Kn(t.method, t, n, !0));
		}
	}
	getClientCapabilities() {
		let e = {};
		for (let t of this._staticCapabilities) Zn(e, t.cap);
		return e;
	}
	addStaticClientCapabilities(e) {
		let t = { cap: e };
		return this._staticCapabilities.add(t), { dispose: () => {
			this._staticCapabilities.delete(t);
		} };
	}
	registerCapabilityHandler(e, t, n) {
		let r = this._registrations.get(e);
		r || (r = new Yn(), this._registrations.set(e, r));
		let i = new Gn(e, t, n);
		r.handlers.add(i);
		for (let e of r.registrations.values()) !i.handleStaticCapability && e.isFromStatic || e.handlerDisposables.set(i, n(e.options));
		return { dispose: () => {
			r.handlers.delete(i);
			for (let e of r.registrations.values()) {
				let t = e.handlerDisposables.get(i);
				t && (t.dispose(), e.handlerDisposables.delete(i));
			}
		} };
	}
}, Gn = class {
	constructor(e, t, n) {
		this.capability = e, this.handleStaticCapability = t, this.handler = n;
	}
}, Kn = class {
	constructor(e, t, n, r) {
		S(this, "handlerDisposables", /* @__PURE__ */ new Map()), this.id = e, this.capability = t, this.options = n, this.isFromStatic = r;
	}
}, qn = new Map([...Object.values(U)].map((e) => [e.method, e]));
function Jn(e) {
	let t = qn.get(e);
	if (!t) throw Error(`No capability found for method ${e}`);
	return t;
}
var Yn = class {
	constructor() {
		S(this, "handlers", /* @__PURE__ */ new Set()), S(this, "registrations", /* @__PURE__ */ new Map());
	}
}, Xn = class e {
	constructor() {
		S(this, "_mappings", /* @__PURE__ */ new Map());
	}
	static create() {
		let t = new e();
		return t.set(U.textDocumentDidChange, (e) => {
			if (e.textDocumentSync !== void 0) return typeof e.textDocumentSync == "object" ? {
				syncKind: e.textDocumentSync.change ?? rt.None,
				documentSelector: null
			} : {
				syncKind: e.textDocumentSync,
				documentSelector: null
			};
		}), t.set(U.textDocumentCompletion, (e) => e.completionProvider), t.set(U.textDocumentHover, (e) => e.hoverProvider), t.set(U.textDocumentSignatureHelp, (e) => e.signatureHelpProvider), t.set(U.textDocumentDefinition, (e) => e.definitionProvider), t.set(U.textDocumentReferences, (e) => e.referencesProvider), t.set(U.textDocumentDocumentHighlight, (e) => e.documentHighlightProvider), t.set(U.textDocumentDocumentSymbol, (e) => e.documentSymbolProvider), t.set(U.textDocumentCodeAction, (e) => e.codeActionProvider), t.set(U.textDocumentCodeLens, (e) => e.codeLensProvider), t.set(U.textDocumentDocumentLink, (e) => e.documentLinkProvider), t.set(U.textDocumentFormatting, (e) => e.documentFormattingProvider), t.set(U.textDocumentRangeFormatting, (e) => e.documentRangeFormattingProvider), t.set(U.textDocumentOnTypeFormatting, (e) => e.documentOnTypeFormattingProvider), t.set(U.textDocumentRename, (e) => e.renameProvider), t.set(U.textDocumentFoldingRange, (e) => e.foldingRangeProvider), t.set(U.textDocumentDeclaration, (e) => e.declarationProvider), t.set(U.textDocumentTypeDefinition, (e) => e.typeDefinitionProvider), t.set(U.textDocumentImplementation, (e) => e.implementationProvider), t.set(U.textDocumentDocumentColor, (e) => e.colorProvider), t.set(U.textDocumentSelectionRange, (e) => e.selectionRangeProvider), t.set(U.textDocumentLinkedEditingRange, (e) => e.linkedEditingRangeProvider), t.set(U.textDocumentPrepareCallHierarchy, (e) => e.callHierarchyProvider), t.set(U.textDocumentSemanticTokensFull, (e) => e.semanticTokensProvider), t.set(U.textDocumentInlayHint, (e) => e.inlayHintProvider), t.set(U.textDocumentInlineValue, (e) => e.inlineValueProvider), t.set(U.textDocumentDiagnostic, (e) => e.diagnosticProvider), t.set(U.textDocumentMoniker, (e) => e.monikerProvider), t.set(U.textDocumentPrepareTypeHierarchy, (e) => e.typeHierarchyProvider), t.set(U.workspaceSymbol, (e) => e.workspaceSymbolProvider), t.set(U.workspaceExecuteCommand, (e) => e.executeCommandProvider), t;
	}
	set(e, t) {
		if (this._mappings.has(e.method)) throw Error(`Capability for method ${e.method} already registered`);
		this._mappings.set(e.method, t);
	}
	getOptions(e, t) {
		let n = this._mappings.get(e.method);
		if (n) return n(t);
	}
};
function Zn(e, t) {
	for (let n of Object.keys(t)) {
		let r = t[n];
		if (r === void 0) continue;
		let i = e[n];
		if (i === void 0) {
			e[n] = r;
			continue;
		}
		if (typeof r != "object" || !r) {
			e[n] = r;
			continue;
		}
		if (typeof i != "object" || !i) {
			e[n] = r;
			continue;
		}
		Zn(i, r);
	}
}
var Qn = class extends K {
	constructor(e, t) {
		super(), S(this, "_managedModels", /* @__PURE__ */ new Map()), S(this, "_managedModelsReverse", /* @__PURE__ */ new Map()), S(this, "_started", !1), this._server = e, this._capabilities = t, this._register(this._capabilities.addStaticClientCapabilities({ textDocument: { synchronization: {
			dynamicRegistration: !0,
			willSave: !1,
			willSaveWaitUntil: !1,
			didSave: !1
		} } })), this._register(t.registerCapabilityHandler(U.textDocumentDidChange, !0, (e) => {
			if (this._started) return { dispose: () => {} };
			this._started = !0, this._register(d.onDidCreateModel((e) => {
				this._getOrCreateManagedModel(e);
			}));
			for (let e of d.getModels()) this._getOrCreateManagedModel(e);
			return { dispose: () => {} };
		}));
	}
	_getOrCreateManagedModel(e) {
		if (!this._started) throw Error("Not started");
		let t = e.uri.toString(!0).toLowerCase(), n = this._managedModels.get(e);
		return n || (n = new $n(e, this._server), this._managedModels.set(e, n), this._managedModelsReverse.set(t, e)), e.onWillDispose(() => {
			n.dispose(), this._managedModels.delete(e), this._managedModelsReverse.delete(t);
		}), n;
	}
	translateBack(e, t) {
		let n = e.uri.toLowerCase(), r = this._managedModelsReverse.get(n);
		if (!r) throw Error(`No text model for uri ${n}`);
		return {
			textModel: r,
			position: new f(t.line + 1, t.character + 1)
		};
	}
	translateBackRange(e, n) {
		let r = e.uri.toLowerCase(), i = this._managedModelsReverse.get(r);
		if (!i) throw Error(`No text model for uri ${r}`);
		return {
			textModel: i,
			range: new t(n.start.line + 1, n.start.character + 1, n.end.line + 1, n.end.character + 1)
		};
	}
	translate(e, t) {
		return {
			textDocument: { uri: e.uri.toString(!0) },
			position: {
				line: t.lineNumber - 1,
				character: t.column - 1
			}
		};
	}
	translateRange(e, t) {
		return {
			start: {
				line: t.startLineNumber - 1,
				character: t.startColumn - 1
			},
			end: {
				line: t.endLineNumber - 1,
				character: t.endColumn - 1
			}
		};
	}
}, $n = class extends K {
	constructor(e, t) {
		super(), this._textModel = e, this._api = t;
		let n = e.uri.toString(!0).toLowerCase();
		this._api.textDocumentDidOpen({ textDocument: {
			languageId: e.getLanguageId(),
			uri: n,
			version: e.getVersionId(),
			text: e.getValue()
		} }), this._register(e.onDidChangeContent((t) => {
			let r = t.changes.map((e) => er(e));
			this._api.textDocumentDidChange({
				textDocument: {
					uri: n,
					version: e.getVersionId()
				},
				contentChanges: r
			});
		})), this._register({ dispose: () => {
			this._api.textDocumentDidClose({ textDocument: { uri: n } });
		} });
	}
};
function er(e) {
	return {
		range: tr(e.range),
		rangeLength: e.rangeLength,
		text: e.text
	};
}
function tr(e) {
	return {
		start: {
			line: e.startLineNumber - 1,
			character: e.startColumn - 1
		},
		end: {
			line: e.endLineNumber - 1,
			character: e.endColumn - 1
		}
	};
}
var nr = class {
	constructor(e) {
		S(this, "_connection"), S(this, "_capabilitiesRegistry"), S(this, "_bridge"), S(this, "_initPromise");
		let t = k.fromTransport(e), n = W.getServer(t, {});
		t.startListen(), this._capabilitiesRegistry = new Wn(t), this._bridge = new Qn(n.server, this._capabilitiesRegistry), this._connection = new Un(n.server, this._bridge, this._capabilitiesRegistry, t), this.createFeatures(), this._initPromise = this._init();
	}
	async _init() {
		let e = await this._connection.server.initialize({
			processId: null,
			capabilities: this._capabilitiesRegistry.getClientCapabilities(),
			rootUri: null
		});
		this._connection.server.initialized({}), this._capabilitiesRegistry.setServerCapabilities(e.capabilities);
	}
	createFeatures() {
		let e = new q();
		return e.add(new zt(this._connection)), e.add(new Wt(this._connection)), e.add(new Jt(this._connection)), e.add(new Zt(this._connection)), e.add(new $t(this._connection)), e.add(new tn(this._connection)), e.add(new rn(this._connection)), e.add(new on(this._connection)), e.add(new cn(this._connection)), e.add(new un(this._connection)), e.add(new mn(this._connection)), e.add(new _n(this._connection)), e.add(new bn(this._connection)), e.add(new Sn(this._connection)), e.add(new wn(this._connection)), e.add(new En(this._connection)), e.add(new On(this._connection)), e.add(new An(this._connection)), e.add(new Mn(this._connection)), e.add(new Pn(this._connection)), e.add(new zn(this._connection)), e.add(new Vn(this._connection)), e;
	}
}, Q = null;
typeof WebSocket < "u" ? Q = WebSocket : typeof MozWebSocket < "u" ? Q = MozWebSocket : typeof global < "u" ? Q = global.WebSocket || global.MozWebSocket : typeof window < "u" ? Q = window.WebSocket || window.MozWebSocket : typeof self < "u" && (Q = self.WebSocket || self.MozWebSocket);
var rr = Q;
function ir(e) {
	return "host" in e ? { address: `${e.forceTls ? "wss" : "ws"}://${e.host}:${e.port}` } : e;
}
var ar = class e extends Re {
	constructor(e) {
		super(), S(this, "socket"), S(this, "errorEmitter", new Ne()), S(this, "onError", this.errorEmitter), this.socket = e, e.onmessage = (e) => {
			try {
				let t = e.data;
				if (typeof t == "string") {
					let e = JSON.parse(t);
					this._dispatchReceivedMessage(e);
				} else throw Error("Not supported");
			} catch (e) {
				this.errorEmitter.fire({ error: e });
			}
		}, e.onclose = (e) => {
			this._onConnectionClosed();
		};
	}
	static connectTo(t) {
		let n = new rr(ir(t).address);
		return new Promise((t, r) => {
			n.onerror = (e) => {
				r(e);
			}, n.onopen = () => {
				t(new e(n));
			};
		});
	}
	static fromWebSocket(t) {
		return new e(t);
	}
	close() {
		this.socket.close();
	}
	dispose() {
		this.close();
	}
	_sendImpl(e) {
		let t = JSON.stringify(e);
		return new Promise((e, n) => {
			this.socket.send(t, (t) => {
				t ? n(t) : e();
			});
		});
	}
	toString() {
		return `${this.id}@${this.socket.url}`;
	}
}, or = class extends Re {
	constructor(e, t = void 0, n = void 0) {
		super(), S(this, "_windowLike"), S(this, "_source"), S(this, "_loadingState"), S(this, "_disposed", !1), S(this, "_messageHandler", ({ data: e, source: t }) => {
			this._source && t !== this._source || typeof e == "object" && e && this._dispatchReceivedMessage(e);
		}), this._windowLike = e, this._source = t, this._loadingState = n, this._windowLike.addEventListener("message", this._messageHandler);
	}
	async _sendImpl(e) {
		if (this._disposed) throw Error("Transport is disposed");
		this._loadingState && !this._loadingState.loaded && await this._loadingState.onLoaded, this._windowLike.postMessage(e);
	}
	toString() {
		return `${this.id}@${this._windowLike}`;
	}
	dispose() {
		this._disposed || (this._disposed = !0, this._windowLike.removeEventListener("message", this._messageHandler));
	}
};
function sr(e) {
	if (typeof window > "u") throw Error("call this function from the main browser thread");
	return new or(e);
}
function cr(e) {
	if (typeof window > "u") throw Error("call this function from the main browser thread");
	return new or(e.contentWindow, e.contentWindow, {
		loaded: window.document.readyState === "complete",
		onLoaded: new Promise((e) => {
			window.addEventListener("load", () => e());
		})
	});
}
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/editor/internal/initialize.js
function lr() {
	return c;
}
globalThis.MonacoEnvironment?.globalAPI && (globalThis.monaco = lr());
//#endregion
//#region ../../node_modules/.pnpm/monaco-editor@0.55.1/node_modules/monaco-editor/esm/vs/editor/editor.main.js
var $ = lr();
$.languages.css = ae, $.languages.html = le, $.languages.typescript = re, $.languages.json = be;
//#endregion
export { te as CancellationTokenSource, l as Emitter, ee as KeyCode, o as KeyMod, e as MarkerSeverity, u as MarkerTag, f as Position, t as Range, s as Selection, ne as SelectionDirection, n as Token, r as Uri, ie as createWebWorker, ae as css, d as editor, le as html, be as json, a as languages, De as lsp, re as typescript };
