/*
Copyright (c) 2019 Daybrush
name: moveable
license: MIT
author: Daybrush
repository: https://github.com/daybrush/moveable/blob/master/packages/moveable
version: 0.53.0
*/
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let framework_utils = require("framework-utils");
let react = require("croact");
react = __toESM(react);
let croact = require("croact");
let react_moveable = require("croact-moveable");
react_moveable = __toESM(react_moveable);
let _daybrush_utils = require("@daybrush/utils");
let _scena_event_emitter = require("@scena/event-emitter");
_scena_event_emitter = __toESM(_scena_event_emitter);
//#region src/InnerMoveable.tsx
var InnerMoveable = class extends react.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state = this.props;
	}
	render() {
		return /* @__PURE__ */ react.createElement(react_moveable.default, {
			ref: (0, framework_utils.ref)(this, "moveable"),
			...this.state
		});
	}
};
//#endregion
//#region src/consts.ts
const PROPERTIES = react_moveable.MOVEABLE_PROPS;
const METHODS = react_moveable.MOVEABLE_METHODS;
const EVENTS = react_moveable.MOVEABLE_EVENTS;
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/decorate.js
function __decorate(decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
}
//#endregion
//#region src/MoveableManager.tsx
/**
* Moveable is Draggable! Resizable! Scalable! Rotatable!
* @sort 1
* @alias Moveable
* @extends EventEmitter
*/
let MoveableManager = class MoveableManager extends _scena_event_emitter.default {
	/**
	*
	*/
	constructor(parentElement, options = {}) {
		super();
		this.containerProvider = null;
		this.selfElement = null;
		this._warp = false;
		const nextOptions = { ...options };
		const events = {};
		EVENTS.forEach((name) => {
			events[(0, _daybrush_utils.camelize)(`on ${name}`)] = (e) => this.trigger(name, e);
		});
		let selfElement;
		if (options.warpSelf) {
			delete options.warpSelf;
			this._warp = true;
			selfElement = parentElement;
		} else {
			selfElement = (0, _daybrush_utils.getDocument)(parentElement).createElement("div");
			parentElement.appendChild(selfElement);
		}
		this.containerProvider = (0, croact.renderSelf)(/* @__PURE__ */ react.createElement(InnerMoveable, {
			ref: (0, framework_utils.ref)(this, "innerMoveable"),
			...nextOptions,
			...events
		}), selfElement);
		this.selfElement = selfElement;
		const target = nextOptions.target;
		if ((0, _daybrush_utils.isArray)(target) && target.length > 1) this.updateRect();
	}
	setState(state, callback) {
		this.innerMoveable.setState(state, callback);
	}
	forceUpdate(callback) {
		this.innerMoveable.forceUpdate(callback);
	}
	dragStart(e, target = e.target) {
		if (this.innerMoveable.$_timer) this.forceUpdate();
		this.getMoveable().dragStart(e, target);
	}
	destroy() {
		const selfElement = this.selfElement;
		(0, croact.renderSelf)(null, selfElement, this.containerProvider);
		if (!this._warp) selfElement?.parentElement?.removeChild(selfElement);
		this.containerProvider = null;
		this.off();
		this.selfElement = null;
		this.innerMoveable = null;
	}
	getMoveable() {
		return this.innerMoveable.moveable;
	}
};
MoveableManager = __decorate([(0, framework_utils.Properties)(METHODS, (prototype, property) => {
	if (prototype[property]) return;
	prototype[property] = function(...args) {
		const self = this.getMoveable();
		if (!self || !self[property]) return;
		return self[property](...args);
	};
}), (0, framework_utils.Properties)(PROPERTIES, (prototype, property) => {
	Object.defineProperty(prototype, property, {
		get() {
			return this.getMoveable().props[property];
		},
		set(value) {
			this.setState({ [property]: value });
		},
		enumerable: true,
		configurable: true
	});
})], MoveableManager);
var MoveableManager_default = MoveableManager;
//#endregion
//#region src/Moveable.tsx
var Moveable = class extends MoveableManager_default {};
//#endregion
//#region src/utils.ts
function getElementInfo(target, container, rootContainer) {
	return (0, react_moveable.getElementInfo)(target, container, rootContainer);
}
function makeAble(name, able) {
	return (0, react_moveable.makeAble)(name, able);
}
//#endregion
//#region src/index.ts
var src_exports = /* @__PURE__ */ __exportAll({
	EVENTS: () => EVENTS,
	METHODS: () => METHODS,
	PROPERTIES: () => PROPERTIES,
	default: () => src_default,
	getElementInfo: () => getElementInfo,
	makeAble: () => makeAble
});
var src_default = Moveable;
//#endregion
//#region src/index.umd.ts
for (const name in src_exports) src_default[name] = src_exports[name];
var index_umd_default = src_default;
//#endregion
module.exports = index_umd_default;

//# sourceMappingURL=moveable.cjs.js.map