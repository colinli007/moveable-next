/*
Copyright (c) 2019 Daybrush
name: moveable
license: MIT
author: Daybrush
repository: https://github.com/daybrush/moveable/blob/master/packages/moveable
version: 0.53.0
*/
import { Properties, ref } from "framework-utils";
import * as React from "croact";
import { renderSelf } from "croact";
import Moveable, { MOVEABLE_EVENTS, MOVEABLE_METHODS, MOVEABLE_PROPS, getElementInfo as getElementInfo$1, makeAble as makeAble$1 } from "croact-moveable";
import { camelize, getDocument, isArray } from "@daybrush/utils";
import EventEmitter from "@scena/event-emitter";
//#region src/InnerMoveable.tsx
var InnerMoveable = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state = this.props;
	}
	render() {
		return /* @__PURE__ */ React.createElement(Moveable, {
			ref: ref(this, "moveable"),
			...this.state
		});
	}
};
//#endregion
//#region src/consts.ts
const PROPERTIES = MOVEABLE_PROPS;
const METHODS = MOVEABLE_METHODS;
const EVENTS = MOVEABLE_EVENTS;
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
let MoveableManager = class MoveableManager extends EventEmitter {
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
			events[camelize(`on ${name}`)] = (e) => this.trigger(name, e);
		});
		let selfElement;
		if (options.warpSelf) {
			delete options.warpSelf;
			this._warp = true;
			selfElement = parentElement;
		} else {
			selfElement = getDocument(parentElement).createElement("div");
			parentElement.appendChild(selfElement);
		}
		this.containerProvider = renderSelf(/* @__PURE__ */ React.createElement(InnerMoveable, {
			ref: ref(this, "innerMoveable"),
			...nextOptions,
			...events
		}), selfElement);
		this.selfElement = selfElement;
		const target = nextOptions.target;
		if (isArray(target) && target.length > 1) this.updateRect();
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
		renderSelf(null, selfElement, this.containerProvider);
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
MoveableManager = __decorate([Properties(METHODS, (prototype, property) => {
	if (prototype[property]) return;
	prototype[property] = function(...args) {
		const self = this.getMoveable();
		if (!self || !self[property]) return;
		return self[property](...args);
	};
}), Properties(PROPERTIES, (prototype, property) => {
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
var Moveable$1 = class extends MoveableManager_default {};
//#endregion
//#region src/utils.ts
function getElementInfo(target, container, rootContainer) {
	return getElementInfo$1(target, container, rootContainer);
}
function makeAble(name, able) {
	return makeAble$1(name, able);
}
//#endregion
//#region src/index.ts
var src_default = Moveable$1;
//#endregion
export { EVENTS, METHODS, PROPERTIES, src_default as default, getElementInfo, makeAble };

//# sourceMappingURL=moveable.esm.js.map