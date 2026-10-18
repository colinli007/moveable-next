/*
Copyright (c) 2019 Daybrush
name: moveable
license: MIT
author: Daybrush
repository: https://github.com/daybrush/moveable/blob/master/packages/moveable
version: 0.53.0
*/
(function(global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define([], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Moveable = factory());
})(this, function() {
	//#region \0rolldown/runtime.js
	var __defProp = Object.defineProperty;
	var __exportAll = (all, no_symbols) => {
		let target = {};
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
		if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
		return target;
	};
	//#endregion
	//#region ../../node_modules/.pnpm/framework-utils@1.1.0/node_modules/framework-utils/dist/utils.esm.js
	function prefixNames(prefix) {
		var classNames = [];
		for (var _i = 1; _i < arguments.length; _i++) classNames[_i - 1] = arguments[_i];
		return classNames.map(function(className) {
			return className.split(" ").map(function(name) {
				return name ? "" + prefix + name : "";
			}).join(" ");
		}).join(" ");
	}
	function prefixCSS(prefix, css) {
		return css.replace(/([^}{]*){/gm, function(_, selector) {
			return selector.replace(/\.([^{,\s\d.]+)/g, "." + prefix + "$1") + "{";
		});
	}
	function ref(target, name) {
		return function(e) {
			e && (target[name] = e);
		};
	}
	function refs(target, name, i) {
		return function(e) {
			e && (target[name][i] = e);
		};
	}
	function Properties(properties, action) {
		return function(component) {
			var prototype = component.prototype;
			properties.forEach(function(property) {
				action(prototype, property);
			});
		};
	}
	function withMethods(methods, duplicate) {
		if (duplicate === void 0) duplicate = {};
		return function(prototype, propertyName) {
			methods.forEach(function(name) {
				var methodName = duplicate[name] || name;
				if (methodName in prototype) return;
				prototype[methodName] = function() {
					var _a;
					var args = [];
					for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
					var result = (_a = this[propertyName])[name].apply(_a, args);
					if (result === this[propertyName]) return this;
					else return result;
				};
			});
		};
	}
	//#endregion
	//#region ../../node_modules/.pnpm/@daybrush+utils@1.13.0/node_modules/@daybrush/utils/dist/utils.esm.js
	/**
	* get string "function"
	* @memberof Consts
	* @example
	import {FUNCTION} from "@daybrush/utils";
	
	console.log(FUNCTION); // "function"
	*/
	var FUNCTION = "function";
	/**
	* get string "string"
	* @memberof Consts
	* @example
	import {STRING} from "@daybrush/utils";
	
	console.log(STRING); // "string"
	*/
	var STRING = "string";
	/**
	* get string "number"
	* @memberof Consts
	* @example
	import {NUMBER} from "@daybrush/utils";
	
	console.log(NUMBER); // "number"
	*/
	var NUMBER = "number";
	/**
	* get string "undefined"
	* @memberof Consts
	* @example
	import {UNDEFINED} from "@daybrush/utils";
	
	console.log(UNDEFINED); // "undefined"
	*/
	var UNDEFINED = "undefined";
	/**
	* Check whether the environment is window or node.js.
	* @memberof Consts
	* @example
	import {IS_WINDOW} from "@daybrush/utils";
	
	console.log(IS_WINDOW); // false in node.js
	console.log(IS_WINDOW); // true in browser
	*/
	var IS_WINDOW = typeof window !== UNDEFINED;
	/**
	* Check whether the environment is window or node.js.
	* @memberof Consts
	* @name document
	* @example
	import {IS_WINDOW} from "@daybrush/utils";
	
	console.log(IS_WINDOW); // false in node.js
	console.log(IS_WINDOW); // true in browser
	*/
	var doc = typeof document !== "undefined" && document;
	var OPEN_CLOSED_CHARACTERS = [
		{
			open: "(",
			close: ")"
		},
		{
			open: "\"",
			close: "\""
		},
		{
			open: "'",
			close: "'"
		},
		{
			open: "\\\"",
			close: "\\\""
		},
		{
			open: "\\'",
			close: "\\'"
		}
	];
	var TINY_NUM = 1e-7;
	1 / TINY_NUM;
	var DEFAULT_UNIT_PRESETS = {
		"cm": function(pos) {
			return pos * 96 / 2.54;
		},
		"mm": function(pos) {
			return pos * 96 / 254;
		},
		"in": function(pos) {
			return pos * 96;
		},
		"pt": function(pos) {
			return pos * 96 / 72;
		},
		"pc": function(pos) {
			return pos * 96 / 6;
		},
		"%": function(pos, size) {
			return pos * size / 100;
		},
		"vw": function(pos, size) {
			if (size === void 0) size = window.innerWidth;
			return pos / 100 * size;
		},
		"vh": function(pos, size) {
			if (size === void 0) size = window.innerHeight;
			return pos / 100 * size;
		},
		"vmax": function(pos, size) {
			if (size === void 0) size = Math.max(window.innerWidth, window.innerHeight);
			return pos / 100 * size;
		},
		"vmin": function(pos, size) {
			if (size === void 0) size = Math.min(window.innerWidth, window.innerHeight);
			return pos / 100 * size;
		}
	};
	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.
	
	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.
	
	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	function __spreadArrays$2() {
		for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
		for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
		return r;
	}
	/**
	* @namespace
	* @name Utils
	*/
	/**
	* Returns the inner product of two numbers(`a1`, `a2`) by two criteria(`b1`, `b2`).
	* @memberof Utils
	* @param - The first number
	* @param - The second number
	* @param - The first number to base on the inner product
	* @param - The second number to base on the inner product
	* @return - Returns the inner product
	import { dot } from "@daybrush/utils";
	
	console.log(dot(0, 15, 2, 3)); // 6
	console.log(dot(5, 15, 2, 3)); // 9
	console.log(dot(5, 15, 1, 1)); // 10
	*/
	function dot(a1, a2, b1, b2) {
		return (a1 * b2 + a2 * b1) / (b1 + b2);
	}
	/**
	* Check the type that the value is undefined.
	* @memberof Utils
	* @param {string} value - Value to check the type
	* @return {boolean} true if the type is correct, false otherwise
	* @example
	import {isUndefined} from "@daybrush/utils";
	
	console.log(isUndefined(undefined)); // true
	console.log(isUndefined("")); // false
	console.log(isUndefined(1)); // false
	console.log(isUndefined(null)); // false
	*/
	function isUndefined(value) {
		return typeof value === UNDEFINED;
	}
	/**
	* Check the type that the value is object.
	* @memberof Utils
	* @param {string} value - Value to check the type
	* @return {} true if the type is correct, false otherwise
	* @example
	import {isObject} from "@daybrush/utils";
	
	console.log(isObject({})); // true
	console.log(isObject(undefined)); // false
	console.log(isObject("")); // false
	console.log(isObject(null)); // false
	*/
	function isObject(value) {
		return value && typeof value === "object";
	}
	/**
	* Check the type that the value is isArray.
	* @memberof Utils
	* @param {string} value - Value to check the type
	* @return {} true if the type is correct, false otherwise
	* @example
	import {isArray} from "@daybrush/utils";
	
	console.log(isArray([])); // true
	console.log(isArray({})); // false
	console.log(isArray(undefined)); // false
	console.log(isArray(null)); // false
	*/
	function isArray(value) {
		return Array.isArray(value);
	}
	/**
	* Check the type that the value is string.
	* @memberof Utils
	* @param {string} value - Value to check the type
	* @return {} true if the type is correct, false otherwise
	* @example
	import {isString} from "@daybrush/utils";
	
	console.log(isString("1234")); // true
	console.log(isString(undefined)); // false
	console.log(isString(1)); // false
	console.log(isString(null)); // false
	*/
	function isString(value) {
		return typeof value === STRING;
	}
	function isNumber(value) {
		return typeof value === NUMBER;
	}
	/**
	* Check the type that the value is function.
	* @memberof Utils
	* @param {string} value - Value to check the type
	* @return {} true if the type is correct, false otherwise
	* @example
	import {isFunction} from "@daybrush/utils";
	
	console.log(isFunction(function a() {})); // true
	console.log(isFunction(() => {})); // true
	console.log(isFunction("1234")); // false
	console.log(isFunction(1)); // false
	console.log(isFunction(null)); // false
	*/
	function isFunction(value) {
		return typeof value === FUNCTION;
	}
	function isEqualSeparator(character, separator) {
		return (separator === "" || separator == " ") && (character === "" || character == " ") || character === separator;
	}
	function findOpen(openCharacter, texts, index, length, openCloseCharacters) {
		if (!findIgnore(openCharacter, texts, index)) return findClose(openCharacter, texts, index + 1, length, openCloseCharacters);
		return index;
	}
	function findIgnore(character, texts, index) {
		if (!character.ignore) return null;
		var otherText = texts.slice(Math.max(index - 3, 0), index + 3).join("");
		return new RegExp(character.ignore).exec(otherText);
	}
	function findClose(closeCharacter, texts, index, length, openCloseCharacters) {
		var _loop_1 = function(i) {
			var character = texts[i].trim();
			if (character === closeCharacter.close && !findIgnore(closeCharacter, texts, i)) return { value: i };
			var nextIndex = i;
			var openCharacter = find$1(openCloseCharacters, function(_a) {
				return _a.open === character;
			});
			if (openCharacter) nextIndex = findOpen(openCharacter, texts, i, length, openCloseCharacters);
			if (nextIndex === -1) return out_i_1 = i, "break";
			i = nextIndex;
			out_i_1 = i;
		};
		var out_i_1;
		for (var i = index; i < length; ++i) {
			var state_1 = _loop_1(i);
			i = out_i_1;
			if (typeof state_1 === "object") return state_1.value;
			if (state_1 === "break") break;
		}
		return -1;
	}
	function splitText(text, splitOptions) {
		var _a = isString(splitOptions) ? { separator: splitOptions } : splitOptions, _b = _a.separator, separator = _b === void 0 ? "," : _b, isSeparateFirst = _a.isSeparateFirst, isSeparateOnlyOpenClose = _a.isSeparateOnlyOpenClose, _c = _a.isSeparateOpenClose, isSeparateOpenClose = _c === void 0 ? isSeparateOnlyOpenClose : _c, _d = _a.openCloseCharacters, openCloseCharacters = _d === void 0 ? OPEN_CLOSED_CHARACTERS : _d;
		var openClosedText = openCloseCharacters.map(function(_a) {
			var open = _a.open, close = _a.close;
			if (open === close) return open;
			return open + "|" + close;
		}).join("|");
		var regexText = "(\\s*" + separator + "\\s*|" + openClosedText + "|\\s+)";
		var regex = new RegExp(regexText, "g");
		var texts = text.split(regex).filter(function(chr) {
			return chr && chr !== "undefined";
		});
		var length = texts.length;
		var values = [];
		var tempValues = [];
		function resetTemp() {
			if (tempValues.length) {
				values.push(tempValues.join(""));
				tempValues = [];
				return true;
			}
			return false;
		}
		var _loop_2 = function(i) {
			var character = texts[i].trim();
			var nextIndex = i;
			var openCharacter = find$1(openCloseCharacters, function(_a) {
				return _a.open === character;
			});
			var closeCharacter = find$1(openCloseCharacters, function(_a) {
				return _a.close === character;
			});
			if (openCharacter) {
				nextIndex = findOpen(openCharacter, texts, i, length, openCloseCharacters);
				if (nextIndex !== -1 && isSeparateOpenClose) {
					if (resetTemp() && isSeparateFirst) return out_i_2 = i, "break";
					values.push(texts.slice(i, nextIndex + 1).join(""));
					i = nextIndex;
					if (isSeparateFirst) return out_i_2 = i, "break";
					return out_i_2 = i, "continue";
				}
			} else if (closeCharacter && !findIgnore(closeCharacter, texts, i)) {
				var nextOpenCloseCharacters = __spreadArrays$2(openCloseCharacters);
				nextOpenCloseCharacters.splice(openCloseCharacters.indexOf(closeCharacter), 1);
				return { value: splitText(text, {
					separator,
					isSeparateFirst,
					isSeparateOnlyOpenClose,
					isSeparateOpenClose,
					openCloseCharacters: nextOpenCloseCharacters
				}) };
			} else if (isEqualSeparator(character, separator) && !isSeparateOnlyOpenClose) {
				resetTemp();
				if (isSeparateFirst) return out_i_2 = i, "break";
				return out_i_2 = i, "continue";
			}
			if (nextIndex === -1) nextIndex = length - 1;
			tempValues.push(texts.slice(i, nextIndex + 1).join(""));
			i = nextIndex;
			out_i_2 = i;
		};
		var out_i_2;
		for (var i = 0; i < length; ++i) {
			var state_2 = _loop_2(i);
			i = out_i_2;
			if (typeof state_2 === "object") return state_2.value;
			if (state_2 === "break") break;
		}
		if (tempValues.length) values.push(tempValues.join(""));
		return values;
	}
	/**
	* divide text by space.
	* @memberof Utils
	* @param {string} text - text to divide
	* @return {Array} divided texts
	* @example
	import {spliceSpace} from "@daybrush/utils";
	
	console.log(splitSpace("a b c d e f g"));
	// ["a", "b", "c", "d", "e", "f", "g"]
	console.log(splitSpace("'a,b' c 'd,e' f g"));
	// ["'a,b'", "c", "'d,e'", "f", "g"]
	*/
	function splitSpace(text) {
		return splitText(text, "");
	}
	/**
	* divide text by comma.
	* @memberof Utils
	* @param {string} text - text to divide
	* @return {Array} divided texts
	* @example
	import {splitComma} from "@daybrush/utils";
	
	console.log(splitComma("a,b,c,d,e,f,g"));
	// ["a", "b", "c", "d", "e", "f", "g"]
	console.log(splitComma("'a,b',c,'d,e',f,g"));
	// ["'a,b'", "c", "'d,e'", "f", "g"]
	*/
	function splitComma(text) {
		return splitText(text, ",");
	}
	/**
	* divide text by bracket "(", ")".
	* @memberof Utils
	* @param {string} text - text to divide
	* @return {object} divided texts
	* @example
	import {splitBracket} from "@daybrush/utils";
	
	console.log(splitBracket("a(1, 2)"));
	// {prefix: "a", value: "1, 2", suffix: ""}
	console.log(splitBracket("a(1, 2)b"));
	// {prefix: "a", value: "1, 2", suffix: "b"}
	*/
	function splitBracket(text) {
		var matches = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(text);
		if (!matches || matches.length < 4) return {};
		else return {
			prefix: matches[1],
			value: matches[2],
			suffix: matches[3]
		};
	}
	/**
	* divide text by number and unit.
	* @memberof Utils
	* @param {string} text - text to divide
	* @return {} divided texts
	* @example
	import {splitUnit} from "@daybrush/utils";
	
	console.log(splitUnit("10px"));
	// {prefix: "", value: 10, unit: "px"}
	console.log(splitUnit("-10px"));
	// {prefix: "", value: -10, unit: "px"}
	console.log(splitUnit("a10%"));
	// {prefix: "a", value: 10, unit: "%"}
	*/
	function splitUnit(text) {
		var matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);
		if (!matches) return {
			prefix: "",
			unit: "",
			value: NaN
		};
		var prefix = matches[1];
		var value = matches[2];
		return {
			prefix,
			unit: matches[3],
			value: parseFloat(value)
		};
	}
	/**
	* transform strings to camel-case
	* @memberof Utils
	* @param {String} text - string
	* @return {String} camel-case string
	* @example
	import {camelize} from "@daybrush/utils";
	
	console.log(camelize("transform-origin")); // transformOrigin
	console.log(camelize("abcd_efg")); // abcdEfg
	console.log(camelize("abcd efg")); // abcdEfg
	*/
	function camelize(str) {
		return str.replace(/[\s-_]+([^\s-_])/g, function(all, letter) {
			return letter.toUpperCase();
		});
	}
	/**
	* transform a camelized string into a lowercased string.
	* @memberof Utils
	* @param {string} text - a camel-cased string
	* @param {string} [separator="-"] - a separator
	* @return {string}  a lowercased string
	* @example
	import {decamelize} from "@daybrush/utils";
	
	console.log(decamelize("transformOrigin")); // transform-origin
	console.log(decamelize("abcdEfg", "_")); // abcd_efg
	*/
	function decamelize(str, separator) {
		if (separator === void 0) separator = "-";
		return str.replace(/([a-z])([A-Z])/g, function(all, letter, letter2) {
			return "" + letter + separator + letter2.toLowerCase();
		});
	}
	/**
	* Date.now() method
	* @memberof CrossBrowser
	* @return {number} milliseconds
	* @example
	import {now} from "@daybrush/utils";
	
	console.log(now()); // 12121324241(milliseconds)
	*/
	function now() {
		return Date.now ? Date.now() : (/* @__PURE__ */ new Date()).getTime();
	}
	/**
	* Returns the index of the first element in the array that satisfies the provided testing function.
	* @function
	* @memberof CrossBrowser
	* @param - The array `findIndex` was called upon.
	* @param - A function to execute on each value in the array until the function returns true, indicating that the satisfying element was found.
	* @param - Returns defaultIndex if not found by the function.
	* @example
	import { findIndex } from "@daybrush/utils";
	
	findIndex([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // 1
	*/
	function findIndex(arr, callback, defaultIndex) {
		if (defaultIndex === void 0) defaultIndex = -1;
		var length = arr.length;
		for (var i = 0; i < length; ++i) if (callback(arr[i], i, arr)) return i;
		return defaultIndex;
	}
	/**
	* Returns the value of the first element in the array that satisfies the provided testing function.
	* @function
	* @memberof CrossBrowser
	* @param - The array `find` was called upon.
	* @param - A function to execute on each value in the array,
	* @param - Returns defalutValue if not found by the function.
	* @example
	import { find } from "@daybrush/utils";
	
	find([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // {a: 2}
	*/
	function find$1(arr, callback, defalutValue) {
		var index = findIndex(arr, callback);
		return index > -1 ? arr[index] : defalutValue;
	}
	/**
	* window.requestAnimationFrame() method with cross browser.
	* @function
	* @memberof CrossBrowser
	* @param {FrameRequestCallback} callback - The function to call when it's time to update your animation for the next repaint.
	* @return {number} id
	* @example
	import {requestAnimationFrame} from "@daybrush/utils";
	
	requestAnimationFrame((timestamp) => {
	console.log(timestamp);
	});
	*/
	var requestAnimationFrame$1 = /*#__PURE__*/ function() {
		var firstTime = now();
		var raf = IS_WINDOW && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame);
		return raf ? raf.bind(window) : function(callback) {
			var currTime = now();
			return setTimeout(function() {
				callback(currTime - firstTime);
			}, 1e3 / 60);
		};
	}();
	/**
	* window.cancelAnimationFrame() method with cross browser.
	* @function
	* @memberof CrossBrowser
	* @param {number} handle - the id obtained through requestAnimationFrame method
	* @return {void}
	* @example
	import { requestAnimationFrame, cancelAnimationFrame } from "@daybrush/utils";
	
	const id = requestAnimationFrame((timestamp) => {
	console.log(timestamp);
	});
	
	cancelAnimationFrame(id);
	*/
	var cancelAnimationFrame = /*#__PURE__*/ function() {
		var caf = IS_WINDOW && (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame);
		return caf ? caf.bind(window) : function(handle) {
			clearTimeout(handle);
		};
	}();
	/**
	* @function
	* @memberof Utils
	*/
	function getKeys(obj) {
		return Object.keys(obj);
	}
	/**
	* @function
	* @memberof Utils
	*/
	function getValues(obj) {
		return getKeys(obj).map(function(key) {
			return obj[key];
		});
	}
	/**
	* @function
	* @memberof Utils
	*/
	function getEntries(obj) {
		return getKeys(obj).map(function(key) {
			return [key, obj[key]];
		});
	}
	/**
	* convert unit size to px size
	* @function
	* @memberof Utils
	*/
	function convertUnitSize(pos, size) {
		var _a = splitUnit(pos), value = _a.value, unit = _a.unit;
		if (isObject(size)) {
			var sizeFunction = size[unit];
			if (sizeFunction) {
				if (isFunction(sizeFunction)) return sizeFunction(value);
				else if (DEFAULT_UNIT_PRESETS[unit]) return DEFAULT_UNIT_PRESETS[unit](value, sizeFunction);
			}
		} else if (unit === "%") return value * size / 100;
		if (DEFAULT_UNIT_PRESETS[unit]) return DEFAULT_UNIT_PRESETS[unit](value);
		return value;
	}
	/**
	* calculate between min, max
	* @function
	* @memberof Utils
	*/
	function between(value, min, max) {
		return Math.max(min, Math.min(value, max));
	}
	function checkBoundSize(targetSize, compareSize, isMax, ratio) {
		if (ratio === void 0) ratio = targetSize[0] / targetSize[1];
		return [[throttle(compareSize[0], 1e-7), throttle(compareSize[0] / ratio, 1e-7)], [throttle(compareSize[1] * ratio, 1e-7), throttle(compareSize[1], 1e-7)]].filter(function(size) {
			return size.every(function(value, i) {
				var defaultSize = compareSize[i];
				var throttledSize = throttle(defaultSize, 1e-7);
				return isMax ? value <= defaultSize || value <= throttledSize : value >= defaultSize || value >= throttledSize;
			});
		})[0] || targetSize;
	}
	/**
	* calculate bound size
	* @function
	* @memberof Utils
	*/
	function calculateBoundSize(size, minSize, maxSize, keepRatio) {
		if (!keepRatio) return size.map(function(value, i) {
			return between(value, minSize[i], maxSize[i]);
		});
		var width = size[0], height = size[1];
		var ratio = keepRatio === true ? width / height : keepRatio;
		var _a = checkBoundSize(size, minSize, false, ratio), minWidth = _a[0], minHeight = _a[1];
		var _b = checkBoundSize(size, maxSize, true, ratio), maxWidth = _b[0], maxHeight = _b[1];
		if (width < minWidth || height < minHeight) {
			width = minWidth;
			height = minHeight;
		} else if (width > maxWidth || height > maxHeight) {
			width = maxWidth;
			height = maxHeight;
		}
		return [width, height];
	}
	/**
	* Add all the numbers.
	* @function
	* @memberof Utils
	*/
	function sum(nums) {
		var length = nums.length;
		var total = 0;
		for (var i = length - 1; i >= 0; --i) total += nums[i];
		return total;
	}
	/**
	* Average all numbers.
	* @function
	* @memberof Utils
	*/
	function average(nums) {
		var length = nums.length;
		var total = 0;
		for (var i = length - 1; i >= 0; --i) total += nums[i];
		return length ? total / length : 0;
	}
	/**
	* Get the angle of two points. (0 <= rad < 359)
	* @function
	* @memberof Utils
	*/
	function getRad$1(pos1, pos2) {
		var distX = pos2[0] - pos1[0];
		var distY = pos2[1] - pos1[1];
		var rad = Math.atan2(distY, distX);
		return rad >= 0 ? rad : rad + Math.PI * 2;
	}
	/**
	* Get the average point of all points.
	* @function
	* @memberof Utils
	*/
	function getCenterPoint(points) {
		return [0, 1].map(function(i) {
			return average(points.map(function(pos) {
				return pos[i];
			}));
		});
	}
	/**
	* Gets the direction of the shape.
	* @function
	* @memberof Utils
	*/
	function getShapeDirection(points) {
		var center = getCenterPoint(points);
		var pos1Rad = getRad$1(center, points[0]);
		var pos2Rad = getRad$1(center, points[1]);
		return pos1Rad < pos2Rad && pos2Rad - pos1Rad < Math.PI || pos1Rad > pos2Rad && pos2Rad - pos1Rad < -Math.PI ? 1 : -1;
	}
	/**
	* Get the distance between two points.
	* @function
	* @memberof Utils
	*/
	function getDist$2(a, b) {
		return Math.sqrt(Math.pow((b ? b[0] : 0) - a[0], 2) + Math.pow((b ? b[1] : 0) - a[1], 2));
	}
	/**
	* throttle number depending on the unit.
	* @function
	* @memberof Utils
	*/
	function throttle(num, unit) {
		if (!unit) return num;
		var reverseUnit = 1 / unit;
		return Math.round(num / unit) / reverseUnit;
	}
	/**
	* throttle number array depending on the unit.
	* @function
	* @memberof Utils
	*/
	function throttleArray(nums, unit) {
		nums.forEach(function(_, i) {
			nums[i] = throttle(nums[i], unit);
		});
		return nums;
	}
	/**
	* @function
	* @memberof Utils
	*/
	function counter(num) {
		var nums = [];
		for (var i = 0; i < num; ++i) nums.push(i);
		return nums;
	}
	/**
	* @function
	* @memberof Utils
	*/
	function flat$2(arr) {
		return arr.reduce(function(prev, cur) {
			return prev.concat(cur);
		}, []);
	}
	/**
	* @function
	* @memberof Utils
	*/
	function pushSet(elements, element) {
		if (elements.indexOf(element) === -1) elements.push(element);
	}
	/**
	* Checks if the specified class value exists in the element's class attribute.
	* @memberof DOM
	* @param element - target
	* @param className - the class name to search
	* @return {boolean} return false if the class is not found.
	* @example
	import {hasClass} from "@daybrush/utils";
	
	console.log(hasClass(element, "start")); // true or false
	*/
	function hasClass(element, className) {
		if (element.classList) return element.classList.contains(className);
		return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
	}
	/**
	* Add the specified class value. If these classe already exist in the element's class attribute they are ignored.
	* @memberof DOM
	* @param element - target
	* @param className - the class name to add
	* @example
	import {addClass} from "@daybrush/utils";
	
	addClass(element, "start");
	*/
	function addClass(element, className) {
		if (element.classList) element.classList.add(className);
		else element.className += " " + className;
	}
	/**
	* Removes the specified class value.
	* @memberof DOM
	* @param element - target
	* @param className - the class name to remove
	* @example
	import {removeClass} from "@daybrush/utils";
	
	removeClass(element, "start");
	*/
	function removeClass(element, className) {
		if (element.classList) element.classList.remove(className);
		else {
			var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
			element.className = element.className.replace(reg, " ");
		}
	}
	/**
	* Sets up a function that will be called whenever the specified event is delivered to the target
	* @memberof DOM
	* @param - event target
	* @param - A case-sensitive string representing the event type to listen for.
	* @param - The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs
	* @param - An options object that specifies characteristics about the event listener.
	* @example
	import {addEvent} from "@daybrush/utils";
	
	addEvent(el, "click", e => {
	console.log(e);
	});
	*/
	function addEvent(el, type, listener, options) {
		el.addEventListener(type, listener, options);
	}
	/**
	* removes from the EventTarget an event listener previously registered with EventTarget.addEventListener()
	* @memberof DOM
	* @param - event target
	* @param - A case-sensitive string representing the event type to listen for.
	* @param - The EventListener function of the event handler to remove from the event target.
	* @param - An options object that specifies characteristics about the event listener.
	* @example
	import {addEvent, removeEvent} from "@daybrush/utils";
	const listener = e => {
	console.log(e);
	};
	addEvent(el, "click", listener);
	removeEvent(el, "click", listener);
	*/
	function removeEvent(el, type, listener, options) {
		el.removeEventListener(type, listener, options);
	}
	function getDocument(el) {
		return (el === null || el === void 0 ? void 0 : el.ownerDocument) || doc;
	}
	function getDocumentElement(el) {
		return getDocument(el).documentElement;
	}
	function getDocumentBody(el) {
		return getDocument(el).body;
	}
	function getWindow(el) {
		var _a;
		return ((_a = el === null || el === void 0 ? void 0 : el.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView) || window;
	}
	function isWindow(val) {
		return val && "postMessage" in val && "blur" in val && "self" in val;
	}
	function isNode(el) {
		return isObject(el) && el.nodeName && el.nodeType && "ownerDocument" in el;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/@egjs+list-differ@1.0.1/node_modules/@egjs/list-differ/dist/list-differ.esm.js
	var PolyMap = /*#__PURE__*/ function() {
		function PolyMap() {
			this.keys = [];
			this.values = [];
		}
		var __proto = PolyMap.prototype;
		__proto.get = function(key) {
			return this.values[this.keys.indexOf(key)];
		};
		__proto.set = function(key, value) {
			var keys = this.keys;
			var values = this.values;
			var prevIndex = keys.indexOf(key);
			var index = prevIndex === -1 ? keys.length : prevIndex;
			keys[index] = key;
			values[index] = value;
		};
		return PolyMap;
	}();
	var HashMap = /*#__PURE__*/ function() {
		function HashMap() {
			this.object = {};
		}
		var __proto = HashMap.prototype;
		__proto.get = function(key) {
			return this.object[key];
		};
		__proto.set = function(key, value) {
			this.object[key] = value;
		};
		return HashMap;
	}();
	var SUPPORT_MAP = typeof Map === "function";
	var Link = /*#__PURE__*/ function() {
		function Link() {}
		var __proto = Link.prototype;
		__proto.connect = function(prevLink, nextLink) {
			this.prev = prevLink;
			this.next = nextLink;
			prevLink && (prevLink.next = this);
			nextLink && (nextLink.prev = this);
		};
		__proto.disconnect = function() {
			var prevLink = this.prev;
			var nextLink = this.next;
			prevLink && (prevLink.next = nextLink);
			nextLink && (nextLink.prev = prevLink);
		};
		__proto.getIndex = function() {
			var link = this;
			var index = -1;
			while (link) {
				link = link.prev;
				++index;
			}
			return index;
		};
		return Link;
	}();
	function orderChanged(changed, fixed) {
		var fromLinks = [];
		var toLinks = [];
		changed.forEach(function(_a) {
			var from = _a[0], to = _a[1];
			var link = new Link();
			fromLinks[from] = link;
			toLinks[to] = link;
		});
		fromLinks.forEach(function(link, i) {
			link.connect(fromLinks[i - 1]);
		});
		return changed.filter(function(_, i) {
			return !fixed[i];
		}).map(function(_a, i) {
			var from = _a[0], to = _a[1];
			if (from === to) return [0, 0];
			var fromLink = fromLinks[from];
			var toLink = toLinks[to - 1];
			var fromIndex = fromLink.getIndex();
			fromLink.disconnect();
			if (!toLink) fromLink.connect(void 0, fromLinks[0]);
			else fromLink.connect(toLink, toLink.next);
			return [fromIndex, fromLink.getIndex()];
		});
	}
	var Result = /*#__PURE__*/ function() {
		function Result(prevList, list, added, removed, changed, maintained, changedBeforeAdded, fixed) {
			this.prevList = prevList;
			this.list = list;
			this.added = added;
			this.removed = removed;
			this.changed = changed;
			this.maintained = maintained;
			this.changedBeforeAdded = changedBeforeAdded;
			this.fixed = fixed;
		}
		var __proto = Result.prototype;
		Object.defineProperty(__proto, "ordered", {
			get: function() {
				if (!this.cacheOrdered) this.caculateOrdered();
				return this.cacheOrdered;
			},
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(__proto, "pureChanged", {
			get: function() {
				if (!this.cachePureChanged) this.caculateOrdered();
				return this.cachePureChanged;
			},
			enumerable: true,
			configurable: true
		});
		__proto.caculateOrdered = function() {
			var ordered = orderChanged(this.changedBeforeAdded, this.fixed);
			var changed = this.changed;
			var pureChanged = [];
			this.cacheOrdered = ordered.filter(function(_a, i) {
				var from = _a[0], to = _a[1];
				var _b = changed[i], fromBefore = _b[0], toBefore = _b[1];
				if (from !== to) {
					pureChanged.push([fromBefore, toBefore]);
					return true;
				}
			});
			this.cachePureChanged = pureChanged;
		};
		return Result;
	}();
	/**
	*
	* @memberof eg.ListDiffer
	* @static
	* @function
	* @param - Previous List <ko> 이전 목록 </ko>
	* @param - List to Update <ko> 업데이트 할 목록 </ko>
	* @param - This callback function returns the key of the item. <ko> 아이템의 키를 반환하는 콜백 함수입니다.</ko>
	* @return - Returns the diff between `prevList` and `list` <ko> `prevList`와 `list`의 다른 점을 반환한다.</ko>
	* @example
	* import { diff } from "@egjs/list-differ";
	* // script => eg.ListDiffer.diff
	* const result = diff([0, 1, 2, 3, 4, 5], [7, 8, 0, 4, 3, 6, 2, 1], e => e);
	* // List before update
	* // [1, 2, 3, 4, 5]
	* console.log(result.prevList);
	* // Updated list
	* // [4, 3, 6, 2, 1]
	* console.log(result.list);
	* // Index array of values added to `list`
	* // [0, 1, 5]
	* console.log(result.added);
	* // Index array of values removed in `prevList`
	* // [5]
	* console.log(result.removed);
	* // An array of index pairs of `prevList` and `list` with different indexes from `prevList` and `list`
	* // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
	* console.log(result.changed);
	* // The subset of `changed` and an array of index pairs that moved data directly. Indicate an array of absolute index pairs of `ordered`.(Formatted by: Array<[index of prevList, index of list]>)
	* // [[4, 3], [3, 4], [2, 6]]
	* console.log(result.pureChanged);
	* // An array of index pairs to be `ordered` that can synchronize `list` before adding data. (Formatted by: Array<[prevIndex, nextIndex]>)
	* // [[4, 1], [4, 2], [4, 3]]
	* console.log(result.ordered);
	* // An array of index pairs of `prevList` and `list` that have not been added/removed so data is preserved
	* // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
	* console.log(result.maintained);
	*/
	function diff$1(prevList, list, findKeyCallback) {
		var mapClass = SUPPORT_MAP ? Map : findKeyCallback ? HashMap : PolyMap;
		var callback = findKeyCallback || function(e) {
			return e;
		};
		var added = [];
		var removed = [];
		var maintained = [];
		var prevKeys = prevList.map(callback);
		var keys = list.map(callback);
		var prevKeyMap = new mapClass();
		var keyMap = new mapClass();
		var changedBeforeAdded = [];
		var fixed = [];
		var removedMap = {};
		var changed = [];
		var addedCount = 0;
		var removedCount = 0;
		prevKeys.forEach(function(key, prevListIndex) {
			prevKeyMap.set(key, prevListIndex);
		});
		keys.forEach(function(key, listIndex) {
			keyMap.set(key, listIndex);
		});
		prevKeys.forEach(function(key, prevListIndex) {
			var listIndex = keyMap.get(key);
			if (typeof listIndex === "undefined") {
				++removedCount;
				removed.push(prevListIndex);
			} else removedMap[listIndex] = removedCount;
		});
		keys.forEach(function(key, listIndex) {
			var prevListIndex = prevKeyMap.get(key);
			if (typeof prevListIndex === "undefined") {
				added.push(listIndex);
				++addedCount;
			} else {
				maintained.push([prevListIndex, listIndex]);
				removedCount = removedMap[listIndex] || 0;
				changedBeforeAdded.push([prevListIndex - removedCount, listIndex - addedCount]);
				fixed.push(listIndex === prevListIndex);
				if (prevListIndex !== listIndex) changed.push([prevListIndex, listIndex]);
			}
		});
		removed.reverse();
		return new Result(prevList, list, added, removed, changed, maintained, changedBeforeAdded, fixed);
	}
	/**
	* A module that checks diff when values are added, removed, or changed in an array.
	* @ko 배열 또는 오브젝트에서 값이 추가되거나 삭제되거나 순서가 변경사항을 체크하는 모듈입니다.
	* @memberof eg
	*/
	var ListDiffer = /*#__PURE__*/ function() {
		/**
		* @param - Initializing Data Array. <ko> 초기 설정할 데이터 배열.</ko>
		* @param - This callback function returns the key of the item. <ko> 아이템의 키를 반환하는 콜백 함수입니다.</ko>
		* @example
		* import ListDiffer from "@egjs/list-differ";
		* // script => eg.ListDiffer
		* const differ = new ListDiffer([0, 1, 2, 3, 4, 5], e => e);
		* const result = differ.update([7, 8, 0, 4, 3, 6, 2, 1]);
		* // List before update
		* // [1, 2, 3, 4, 5]
		* console.log(result.prevList);
		* // Updated list
		* // [4, 3, 6, 2, 1]
		* console.log(result.list);
		* // Index array of values added to `list`.
		* // [0, 1, 5]
		* console.log(result.added);
		* // Index array of values removed in `prevList`.
		* // [5]
		* console.log(result.removed);
		* // An array of index pairs of `prevList` and `list` with different indexes from `prevList` and `list`.
		* // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
		* console.log(result.changed);
		* // The subset of `changed` and an array of index pairs that moved data directly. Indicate an array of absolute index pairs of `ordered`.(Formatted by: Array<[index of prevList, index of list]>)
		* // [[4, 3], [3, 4], [2, 6]]
		* console.log(result.pureChanged);
		* // An array of index pairs to be `ordered` that can synchronize `list` before adding data. (Formatted by: Array<[prevIndex, nextIndex]>)
		* // [[4, 1], [4, 2], [4, 3]]
		* console.log(result.ordered);
		* // An array of index pairs of `prevList` and `list` that have not been added/removed so data is preserved.
		* // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
		* console.log(result.maintained);
		*/
		function ListDiffer(list, findKeyCallback) {
			if (list === void 0) list = [];
			this.findKeyCallback = findKeyCallback;
			this.list = [].slice.call(list);
		}
		/**
		* Update list.
		* @ko 리스트를 업데이트를 합니다.
		* @param - List to update <ko> 업데이트할 리스트 </ko>
		* @return - Returns the results of an update from `prevList` to `list`.<ko> `prevList`에서 `list`로 업데이트한 결과를 반환한다. </ko>
		*/
		var __proto = ListDiffer.prototype;
		__proto.update = function(list) {
			var newData = [].slice.call(list);
			var result = diff$1(this.list, newData, this.findKeyCallback);
			this.list = newData;
			return result;
		};
		return ListDiffer;
	}();
	//#endregion
	//#region ../../node_modules/.pnpm/croact@1.0.4/node_modules/croact/dist/croact.esm.js
	var croact_esm_exports = /* @__PURE__ */ __exportAll({
		Component: () => Component,
		ContainerProvider: () => ContainerProvider,
		PureComponent: () => PureComponent,
		createContext: () => createContext,
		createElement: () => createElement,
		createPortal: () => createPortal,
		createRef: () => createRef,
		findDOMNode: () => findDOMNode,
		findNodeProvider: () => findNodeProvider,
		forwardRef: () => forwardRef,
		render: () => render,
		renderSelf: () => renderSelf,
		renderSelfToString: () => renderSelfToString,
		renderToString: () => renderToString,
		useContext: () => useContext,
		useEffect: () => useEffect,
		useImperativeHandle: () => useImperativeHandle,
		useMemo: () => useMemo,
		useRef: () => useRef,
		useState: () => useState,
		version: () => version
	});
	/******************************************************************************
	Copyright (c) Microsoft Corporation.
	
	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.
	
	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	var extendStatics$3 = function(d, b) {
		extendStatics$3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		return extendStatics$3(d, b);
	};
	function __extends$3(d, b) {
		if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		extendStatics$3(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}
	var __assign$5 = function() {
		__assign$5 = Object.assign || function __assign(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign$5.apply(this, arguments);
	};
	function __rest$1(s, e) {
		var t = {};
		for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
		if (s != null && typeof Object.getOwnPropertySymbols === "function") {
			for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
		}
		return t;
	}
	function __spreadArray(to, from, pack) {
		if (pack || arguments.length === 2) {
			for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
				if (!ar) ar = Array.prototype.slice.call(from, 0, i);
				ar[i] = from[i];
			}
		}
		return to.concat(ar || Array.prototype.slice.call(from));
	}
	function fillKeys(keys) {
		var index = 0;
		return keys.map(function(key) {
			return key == null ? "$compat".concat(++index) : "".concat(key);
		});
	}
	function flat(arr) {
		var arr2 = [];
		arr.forEach(function(el) {
			arr2 = arr2.concat(isArray(el) ? flat(el) : el);
		});
		return arr2;
	}
	function fillProps(props, defaultProps) {
		if (!defaultProps) return props;
		for (var name_1 in defaultProps) if (isUndefined(props[name_1])) props[name_1] = defaultProps[name_1];
		return props;
	}
	function isDiff(a, b) {
		if (a === b) return false;
		for (var i in a) if (!(i in b)) return true;
		for (var i in b) if (a[i] !== b[i]) return true;
		return false;
	}
	function getAttributes(props) {
		var className = props.className, otherProps = __rest$1(props, ["className"]);
		if (className != null) otherProps.class = className;
		delete otherProps.style;
		delete otherProps.children;
		return otherProps;
	}
	function splitProps(props) {
		var attributes = {};
		var events = {};
		for (var name_2 in props) if (name_2.indexOf("on") === 0) events[name_2] = props[name_2];
		else attributes[name_2] = props[name_2];
		return [attributes, events];
	}
	function findContainerNode(provider) {
		if (!provider) return null;
		var base = provider.b;
		if (isNode(base)) return base;
		return findContainerNode(provider.c);
	}
	function removeNode(node) {
		var parentNode = node.parentNode;
		if (parentNode) parentNode.removeChild(node);
	}
	function executeHooks(hooks) {
		hooks.forEach(function(hook) {
			hook();
		});
	}
	function renderFunctionComponent() {
		return this.constructor(this.props, this.context);
	}
	var hooksIndex = 0;
	var Provider = /*#__PURE__*/ function() {
		function Provider(t, d, k, i, c, ref, ps) {
			if (ps === void 0) ps = {};
			this.t = t;
			this.d = d;
			this.k = k;
			this.i = i;
			this.c = c;
			this.ref = ref;
			this.ps = ps;
			this.typ = "prov";
			/**
			* providers
			*/
			this._ps = [];
			/**
			* Contexts
			*/
			this._cs = {};
			/**
			* Whether to hydrate
			*/
			this._hyd = null;
			/**
			* is self render
			*/
			this._sel = false;
		}
		var __proto = Provider.prototype;
		__proto.s = function() {
			return true;
		};
		/**
		* Update
		*/
		__proto.u = function(hooks, contexts, nextElement, nextState, isForceUpdate) {
			var self = this;
			var currentDepth = self.d;
			var scheduledSubs = flat(getValues(contexts).filter(function(context) {
				return context.$_req;
			}).map(function(context) {
				return context.$_subs;
			}));
			var isContextUpdate = find$1(scheduledSubs, function(provider) {
				return provider.d === currentDepth;
			});
			if (self.b && !isString(nextElement) && !isForceUpdate && !self.s(nextElement.props, nextState) && !isContextUpdate) {
				scheduledSubs.reduce(function(childs, sub) {
					var depth = sub.d;
					if (childs[0]) {
						if (childs[0].d === depth) childs.push(sub);
					} else if (depth > currentDepth) childs.push(sub);
					return childs;
				}, []).forEach(function(child) {
					renderProviders(child, child._ps, [child.o], hooks, contexts, true);
				});
				return false;
			}
			self.o = nextElement;
			self.ss(nextState);
			var prevProps = self.ps;
			if (!isString(nextElement)) {
				self.ps = nextElement.props;
				self.ref = nextElement.ref;
			}
			setCurrentInstance(this);
			self.r(hooks, contexts, self.b ? prevProps : {}, nextState);
			return true;
		};
		__proto.md = function() {
			this.rr();
		};
		__proto.ss = function() {};
		__proto.ud = function() {
			this.rr();
		};
		/**
		* register refs
		*/
		__proto.rr = function() {
			var self = this;
			var ref = self.ref;
			var fr = self.fr;
			ref && ref(fr ? fr.current : self.b);
		};
		return Provider;
	}();
	function getCurrentInstance() {
		return Object.__CROACT_CURRENT_INSTNACE__;
	}
	function getHooksIndex() {
		return hooksIndex;
	}
	function setHooksInex(nextHooksIndex) {
		hooksIndex = nextHooksIndex;
	}
	function setCurrentInstance(provider) {
		Object.__CROACT_CURRENT_INSTNACE__ = provider;
		hooksIndex = 0;
		return provider;
	}
	var Component = /*#__PURE__*/ function() {
		function Component(props, context) {
			if (props === void 0) props = {};
			this.props = props;
			this.context = context;
			this.state = {};
			this.$_timer = 0;
			this.$_state = {};
			this.$_subs = [];
			this.$_cs = {};
		}
		var __proto = Component.prototype;
		__proto.render = function() {
			return null;
		};
		__proto.shouldComponentUpdate = function(props, state) {
			return this.props !== props || this.state !== state;
		};
		__proto.setState = function(state, callback, isForceUpdate) {
			var self = this;
			if (!self.$_timer) self.$_state = {};
			clearTimeout(self.$_timer);
			self.$_timer = 0;
			self.$_state = __assign$5(__assign$5({}, self.$_state), state);
			if (!isForceUpdate) self.$_timer = window.setTimeout(function() {
				self.$_timer = 0;
				self.$_setState(callback, isForceUpdate);
			});
			else self.$_setState(callback, isForceUpdate);
		};
		__proto.forceUpdate = function(callback) {
			this.setState({}, callback, true);
		};
		__proto.componentDidMount = function() {};
		__proto.componentDidUpdate = function(prevProps, prevState) {};
		__proto.componentWillUnmount = function() {};
		__proto.$_setState = function(callback, isForceUpdate) {
			var hooks = [];
			var provider = this.$_p;
			if (renderProviders(provider.c, [provider], [provider.o], hooks, provider._cs, __assign$5(__assign$5({}, this.state), this.$_state), isForceUpdate)) {
				if (callback) hooks.push(callback);
				executeHooks(hooks);
				setCurrentInstance(null);
			}
		};
		return Component;
	}();
	var PureComponent = /*#__PURE__*/ function(_super) {
		__extends$3(PureComponent, _super);
		function PureComponent() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		var __proto = PureComponent.prototype;
		__proto.shouldComponentUpdate = function(props, state) {
			return isDiff(this.props, props) || isDiff(this.state, state);
		};
		return PureComponent;
	}(Component);
	function createRef(defaultValue) {
		var refCallback = function(e) {
			refCallback.current = e;
		};
		refCallback.current = defaultValue;
		return refCallback;
	}
	function forwardRef(func) {
		func._fr = true;
		return func;
	}
	function createComponent(type, props, contextValue, self) {
		var _a;
		var base;
		if ((_a = type === null || type === void 0 ? void 0 : type.prototype) === null || _a === void 0 ? void 0 : _a.render) base = new type(props, contextValue);
		else {
			base = new Component(props, contextValue);
			base.constructor = type;
			if (type._fr) {
				self.fr = createRef();
				base.render = function() {
					return this.constructor(this.props, self.fr);
				};
			} else base.render = renderFunctionComponent;
		}
		base.$_p = self;
		return base;
	}
	var ComponentProvider = /*#__PURE__*/ function(_super) {
		__extends$3(ComponentProvider, _super);
		function ComponentProvider(type, depth, key, index, container, ref, props) {
			if (props === void 0) props = {};
			var _this = _super.call(this, type, depth, key, index, container, ref, fillProps(props, type.defaultProps)) || this;
			_this.typ = "comp";
			/**
			* Update shift effects
			*/
			_this._usefs = [];
			/**
			* Update effects
			*/
			_this._uefs = [];
			/**
			* Destroy effects
			*/
			_this._defs = [];
			return _this;
		}
		var __proto = ComponentProvider.prototype;
		__proto.s = function(nextProps, nextState) {
			var base = this.b;
			return base.shouldComponentUpdate(fillProps(nextProps, this.t.defaultProps), nextState || base.state) !== false;
		};
		__proto.r = function(hooks, contexts, prevProps) {
			var _a, _b;
			var self = this;
			var type = self.t;
			self.ps = fillProps(self.ps, self.t.defaultProps);
			var props = self.ps;
			var isMount = !self.b;
			var contextType = type.contextType;
			var base = self.b;
			var contextValue = contextType === null || contextType === void 0 ? void 0 : contextType.get(self);
			self._cs = contexts;
			if (isMount) {
				base = createComponent(type, props, contextValue, self);
				self.b = base;
			} else {
				base.props = props;
				base.context = contextValue;
			}
			var prevState = base.state;
			self._usefs = [];
			self._uefs = [];
			var template = base.render();
			if (((_b = (_a = template === null || template === void 0 ? void 0 : template.props) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.length) === 0) template.props.children = self.ps.children;
			var nextContexts = __assign$5(__assign$5({}, contexts), base.$_cs);
			renderProviders(self, self._ps, template ? [template] : [], hooks, nextContexts);
			if (isMount) self._uefs.push(function() {
				contextType === null || contextType === void 0 || contextType.register(self);
				base.componentDidMount();
			});
			else self._uefs.push(function() {
				base.componentDidUpdate(prevProps, prevState);
			});
			hooks.push(function() {
				self._usefs.forEach(function(ef) {
					ef();
				});
				if (isMount) self.md();
				else self.ud();
				self._defs = self._uefs.map(function(ef) {
					return ef();
				});
			});
		};
		__proto.ss = function(nextState) {
			var base = this.b;
			if (!base || !nextState) return;
			base.state = nextState;
		};
		__proto.un = function() {
			var _a;
			var self = this;
			self._ps.forEach(function(provider) {
				provider.un();
			});
			(_a = self.t.contextType) === null || _a === void 0 || _a.unregister(self);
			clearTimeout(self.b.$_timer);
			self._defs.forEach(function(def) {
				def && def();
			});
			self.b.componentWillUnmount();
		};
		return ComponentProvider;
	}(Provider);
	function diffAttributes(attrs1, attrs2, el) {
		var _a = diffObject(getAttributes(attrs1), getAttributes(attrs2)), added = _a.added, removed = _a.removed, changed = _a.changed;
		for (var name_1 in added) el.setAttribute(name_1, added[name_1]);
		for (var name_2 in changed) el.setAttribute(name_2, changed[name_2][1]);
		for (var name_3 in removed) el.removeAttribute(name_3);
	}
	function diffEvents(events1, events2, provier) {
		var _a = diffObject(events1, events2), added = _a.added;
		for (var name_4 in _a.removed) provier.e(name_4, true);
		for (var name_5 in added) provier.e(name_5);
	}
	function diffObject(a, b) {
		var keys1 = getKeys(a);
		var keys2 = getKeys(b);
		var result = diff$1(keys1, keys2, function(key) {
			return key;
		});
		var added = {};
		var removed = {};
		var changed = {};
		result.added.forEach(function(index) {
			var name = keys2[index];
			added[name] = b[name];
		});
		result.removed.forEach(function(index) {
			var name = keys1[index];
			removed[name] = a[name];
		});
		result.maintained.forEach(function(_a) {
			var name = keys1[_a[0]];
			var values = [a[name], b[name]];
			if (a[name] !== b[name]) changed[name] = values;
		});
		return {
			added,
			removed,
			changed
		};
	}
	function diffStyle(style1, style2, el) {
		var style = el.style;
		var _a = diffObject(style1, style2), added = _a.added, removed = _a.removed, changed = _a.changed;
		for (var beforeName in added) {
			var name_6 = decamelize(beforeName, "-");
			style.setProperty(name_6, added[beforeName]);
		}
		for (var beforeName in changed) {
			var name_7 = decamelize(beforeName, "-");
			style.setProperty(name_7, changed[beforeName][1]);
		}
		for (var beforeName in removed) {
			var name_8 = decamelize(beforeName, "-");
			style.removeProperty(name_8);
		}
	}
	function getNativeEventName(name) {
		return name.replace(/^on/g, "").toLowerCase();
	}
	var ElementProvider = /*#__PURE__*/ function(_super) {
		__extends$3(ElementProvider, _super);
		function ElementProvider() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.typ = "elem";
			/**
			* Events
			*/
			_this._es = {};
			/**
			* is svg
			*/
			_this._svg = false;
			return _this;
		}
		var __proto = ElementProvider.prototype;
		__proto.e = function(name, isRemove) {
			var self = this;
			var events = self._es;
			var base = self.b;
			var eventName = getNativeEventName(name);
			if (isRemove) {
				removeEvent(base, eventName, events[name]);
				delete events[name];
			} else {
				events[name] = function(e) {
					var _a, _b;
					(_b = (_a = self.ps)[name]) === null || _b === void 0 || _b.call(_a, e);
				};
				addEvent(base, eventName, events[name]);
			}
		};
		__proto.s = function(nextProps) {
			return isDiff(this.ps, nextProps);
		};
		__proto.r = function(hooks, contextValues, prevProps) {
			var _a;
			var self = this;
			var isMount = !self.b;
			var nextProps = self.ps;
			if (isMount) {
				var containerNode = findContainerNode(self.c);
				var isSVG = false;
				if (self._svg || self.t === "svg") isSVG = true;
				else isSVG = containerNode && containerNode.ownerSVGElement;
				self._svg = isSVG;
				var element = (_a = self._hyd) === null || _a === void 0 ? void 0 : _a.splice(0, 1)[0];
				var type = self.t;
				if (element) self._hyd = [].slice.call(element.children || []);
				else {
					var doc = getDocument(containerNode);
					if (isSVG) element = doc.createElementNS("http://www.w3.org/2000/svg", type);
					else element = doc.createElement(type);
				}
				self.b = element;
			}
			renderProviders(self, self._ps, nextProps.children, hooks, contextValues);
			var base = self.b;
			var _b = splitProps(prevProps), prevAttributes = _b[0], prevEvents = _b[1];
			var _c = splitProps(nextProps), nextAttributes = _c[0], nextEvents = _c[1];
			diffAttributes(prevAttributes, nextAttributes, base);
			diffEvents(prevEvents, nextEvents, self);
			diffStyle(prevProps.style || {}, nextProps.style || {}, base);
			hooks.push(function() {
				if (isMount) self.md();
				else self.ud();
			});
			return true;
		};
		__proto.un = function() {
			var self = this;
			var events = self._es;
			var base = self.b;
			for (var name_9 in events) removeEvent(base, name_9, events[name_9]);
			self._ps.forEach(function(provider) {
				provider.un();
			});
			self._es = {};
			if (!self._sel) removeNode(base);
		};
		return ElementProvider;
	}(Provider);
	function findDOMNode(comp) {
		if (!comp || isNode(comp)) return comp;
		var providers = comp.$_p._ps;
		if (!providers.length) return null;
		return findDOMNode(providers[0].b);
	}
	function findNodeProvider(provider) {
		if (!provider) return;
		if (provider.b && isNode(provider.b)) return provider;
		var providers = provider._ps;
		if (!providers.length) return null;
		return findNodeProvider(providers[0]);
	}
	function createElement(type, props) {
		var children = [];
		for (var _i = 2; _i < arguments.length; _i++) children[_i - 2] = arguments[_i];
		var _a = props || {}, key = _a.key, ref = _a.ref, otherProps = __rest$1(_a, ["key", "ref"]);
		return {
			type,
			key,
			ref,
			props: __assign$5(__assign$5({}, otherProps), { children: flat$2(children).filter(function(child) {
				return child != null && child !== false;
			}) })
		};
	}
	var ContainerProvider = /*#__PURE__*/ function(_super) {
		__extends$3(ContainerProvider, _super);
		function ContainerProvider(base, depth) {
			if (depth === void 0) depth = 0;
			var _this = _super.call(this, "container", depth, "container", 0, null) || this;
			_this.typ = "container";
			_this.b = base;
			return _this;
		}
		var __proto = ContainerProvider.prototype;
		__proto.r = function() {
			return true;
		};
		__proto.un = function() {};
		return ContainerProvider;
	}(Provider);
	var TextProvider = /*#__PURE__*/ function(_super) {
		__extends$3(TextProvider, _super);
		function TextProvider() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.typ = "text";
			return _this;
		}
		var __proto = TextProvider.prototype;
		__proto.r = function(hooks) {
			var _a;
			var self = this;
			var isMount = !self.b;
			if (isMount) {
				var containerNode = findContainerNode(self.c);
				self.b = ((_a = self._hyd) === null || _a === void 0 ? void 0 : _a.splice(0, 1)[0]) || getDocument(containerNode).createTextNode(self.t.replace("text_", ""));
			}
			hooks.push(function() {
				if (isMount) self.md();
				else self.ud();
			});
			return true;
		};
		__proto.un = function() {
			removeNode(this.b);
		};
		return TextProvider;
	}(Provider);
	function diffProviders(containerProvider, providers, children) {
		var childrenKeys = children.map(function(p) {
			return isString(p) ? null : p.key;
		});
		var result = diff$1(fillKeys(providers.map(function(p) {
			return p.k;
		})), fillKeys(childrenKeys), function(key) {
			return key;
		});
		result.removed.forEach(function(index) {
			providers.splice(index, 1)[0].un();
		});
		result.ordered.forEach(function(_a) {
			var from = _a[0], to = _a[1];
			var childrenProvider = providers.splice(from, 1)[0];
			providers.splice(to, 0, childrenProvider);
			var el = findDOMNode(childrenProvider.b);
			var next = findDOMNode(providers[to + 1] && providers[to + 1].b);
			if (el) el.parentNode.insertBefore(el, next);
		});
		result.added.forEach(function(index) {
			providers.splice(index, 0, createProvider(children[index], childrenKeys[index], index, containerProvider));
		});
		var changed = result.maintained.filter(function(_a) {
			_a[0];
			var to = _a[1];
			var el = children[to];
			var childProvider = providers[to];
			if ((isString(el) ? "text_".concat(el) : el.type) !== childProvider.t) {
				childProvider.un();
				providers.splice(to, 1, createProvider(el, childrenKeys[to], to, containerProvider));
				return true;
			}
			childProvider.i = to;
			return false;
		});
		return __spreadArray(__spreadArray([], result.added, true), changed.map(function(_a) {
			_a[0];
			return _a[1];
		}), true);
	}
	function getNextSibiling(provider, childProvider) {
		var childProviders = provider._ps;
		var length = childProviders.length;
		for (var i = childProvider.i + 1; i < length; ++i) {
			var el = findDOMNode(childProviders[i].b);
			if (el) return el;
		}
		return null;
	}
	function createProvider(el, key, index, containerProvider) {
		var depth = containerProvider.d + 1;
		if (isString(el) || isNumber(el)) return new TextProvider("text_".concat(el), depth, key, index, containerProvider, null, {});
		var type = el.type;
		return new (typeof type === "string" ? ElementProvider : ComponentProvider)(type, depth, key, index, containerProvider, el.ref, el.props);
	}
	function renderProviders(containerProvider, providers, children, updatedHooks, nextContexts, nextState, isForceUpdate) {
		var result = diffProviders(containerProvider, providers, children);
		var hyd = containerProvider._hyd;
		var updated = providers.filter(function(childProvider, i) {
			childProvider._hyd = hyd;
			return childProvider.u(updatedHooks, nextContexts, children[i], nextState, isForceUpdate);
		});
		if (containerProvider.typ === "container" && containerProvider._sel) providers.forEach(function(provider) {
			var nodeProvider = findNodeProvider(provider);
			if (nodeProvider) nodeProvider._sel = true;
		});
		containerProvider._hyd = null;
		var containerNode = findContainerNode(containerProvider);
		if (containerNode) result.reverse().forEach(function(index) {
			var childProvider = providers[index];
			var el = findDOMNode(childProvider.b);
			if (!el) return;
			if (containerNode !== el && !el.parentNode) {
				var nextElement = getNextSibiling(containerProvider, childProvider);
				containerNode.insertBefore(el, nextElement);
			}
		});
		return updated.length > 0;
	}
	function renderProvider(element, container, provider, contexts) {
		if (provider === void 0) provider = container.__CROACT__;
		if (contexts === void 0) contexts = {};
		var isProvider = !!provider;
		if (!provider) provider = new ContainerProvider(container);
		var hooks = [];
		renderProviders(provider, provider._ps, element ? [element] : [], hooks, contexts, void 0, void 0);
		executeHooks(hooks);
		setCurrentInstance(null);
		if (!isProvider) container.__CROACT__ = provider;
		return provider;
	}
	function render(element, container, callback) {
		var provider = container.__CROACT__;
		if (element && !provider) container.innerHTML = "";
		renderProvider(element, container, provider);
		callback && callback();
	}
	function renderSelf(element, self, containerProvider) {
		if (!containerProvider && element) {
			containerProvider = new ContainerProvider(self.parentElement);
			containerProvider._hyd = [self];
			containerProvider._sel = true;
		}
		renderProvider(element, self, containerProvider);
		return containerProvider;
	}
	var i = 0;
	function createContext(defaultValue) {
		var id = "c".concat(++i);
		function Provider(props) {
			var self = this;
			if (!self.$_cs[id]) {
				self.$_cs[id] = self;
				var $_subs = [];
				self.shouldComponentUpdate = function(nextProps) {
					if (nextProps.value !== self.props.value) self.$_req = true;
				};
				self.render = function() {
					return self.props.children[0];
				};
				self.$_subs = $_subs;
			}
			return props.children[0];
		}
		function Consumer(props, contextValue) {
			return props.children(contextValue);
		}
		function getContext(provider) {
			return provider._cs[id];
		}
		var context = {
			$_id: id,
			$_dv: defaultValue,
			Consumer,
			Provider,
			get: function(provider) {
				var _a, _b;
				return (_b = (_a = getContext(provider)) === null || _a === void 0 ? void 0 : _a.props.value) !== null && _b !== void 0 ? _b : defaultValue;
			},
			register: function(provider) {
				var mainComponent = getContext(provider);
				if (mainComponent) pushSet(mainComponent.$_subs, provider);
			},
			unregister: function(provider) {
				var mainComponent = getContext(provider);
				if (mainComponent) {
					var subs = mainComponent.$_subs;
					var index = subs.indexOf(provider);
					if (index > -1) subs.splice(index, 1);
				}
			}
		};
		Consumer.contextType = context;
		return context;
	}
	var Portal = /*#__PURE__*/ function(_super) {
		__extends$3(Portal, _super);
		function Portal() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		var __proto = Portal.prototype;
		__proto.componentDidMount = function() {
			var self = this;
			var _a = self.props, element = _a.element, container = _a.container;
			var parentProvider = self.$_p;
			self._pp = new ContainerProvider(container, parentProvider.d + 1);
			renderProvider(element, container, self._pp, parentProvider._cs);
		};
		__proto.componentDidUpdate = function() {
			var self = this;
			var _a = self.props, element = _a.element, container = _a.container;
			renderProvider(element, container, self._pp, self.$_p._cs);
		};
		__proto.componentWillUnmount = function() {
			var self = this;
			var container = self.props.container;
			renderProvider(null, container, self._pp, self.$_p._cs);
			this._pp = null;
		};
		return Portal;
	}(PureComponent);
	function createPortal(el, container) {
		return createElement(Portal, {
			element: el,
			container
		});
	}
	function _renderToString(node, parentContexts, self) {
		if (node == null) return "";
		if (isString(node) || isNumber(node) || isFunction(node)) return node;
		var type = node.type, props = node.props;
		if (isString(type)) {
			var stringProps_1 = {};
			getEntries(props).forEach(function(_a) {
				var name = _a[0], value = _a[1];
				if (name === "style") stringProps_1[name] = getEntries(value).map(function(_a) {
					var styleName = _a[0], styleValue = _a[1];
					return "".concat(decamelize(styleName), ": ").concat(styleValue, ";");
				}).join("");
				else if (name === "children") return;
				else if (!name.match(/^on[^a-z]/g)) stringProps_1[name] = "".concat(value);
			});
			var children = props.children.map(function(child) {
				return _renderToString(child, parentContexts);
			}).join("");
			if (self) return {
				tagName: type,
				props: stringProps_1,
				children
			};
			var strings = __spreadArray([type], getEntries(stringProps_1).map(function(_a) {
				var name = _a[0], value = _a[1];
				return "".concat(name, "=\"").concat(value.replace(/"/g, "\\\""), "\"");
			}), true);
			return "<".concat(strings.join(" "), ">").concat(children, "</").concat(type, ">");
		} else if (isFunction(type)) {
			var contextType = type.contextType;
			var provider = {
				b: null,
				_hs: [],
				_usefs: [],
				_uefs: [],
				_defs: [],
				_cs: parentContexts
			};
			setCurrentInstance(provider);
			var base = createComponent(type, props, contextType === null || contextType === void 0 ? void 0 : contextType.get(provider), {});
			var nextContexts = __assign$5(__assign$5({}, parentContexts), base.$_cs);
			provider.b = base;
			return _renderToString(base.render(), nextContexts, self);
		}
		return "";
	}
	function renderToString(node) {
		return _renderToString(node, {});
	}
	function renderSelfToString(node) {
		return _renderToString(node, {}, true);
	}
	function checkHookInfo(info) {
		var inst = getCurrentInstance();
		var hooks = inst._hs || (inst._hs = []);
		var index = getHooksIndex();
		var prevHt = hooks[index];
		setHooksInex(index + 1);
		if (prevHt) {
			if (!isDiff(prevHt.deps, info.deps)) {
				prevHt.updated = false;
				return prevHt;
			}
			hooks[index] = info;
		} else hooks.push(info);
		info.value = info.func();
		info.updated = true;
		return info;
	}
	function useMemo(defaultFunction, deps) {
		return checkHookInfo({
			func: defaultFunction,
			deps
		}).value;
	}
	function useRef(defaultValue) {
		return useMemo(function() {
			return createRef(defaultValue);
		}, []);
	}
	function useContext(context) {
		var inst = getCurrentInstance();
		var contextId = context.$_id;
		var contexts = inst._cs;
		var providerComponent;
		if (contextId in contexts) {
			providerComponent = contexts[contextId];
			providerComponent.props.value;
		} else context.$_dv;
		useEffect(function() {
			context.register(inst);
			return function() {
				context.unregister(inst);
			};
		}, []);
		return context.get(inst);
	}
	function useState(st) {
		var inst = getCurrentInstance();
		var index = getHooksIndex();
		var comp = inst.b;
		checkHookInfo({
			func: function() {
				comp.state[index] = isFunction(st) ? st() : st;
			},
			deps: []
		});
		return [comp.state[index], function(nextValue) {
			var _a;
			return comp.setState((_a = {}, _a[index] = nextValue, _a));
		}];
	}
	function useEffect(effect, deps, unshift) {
		var inst = getCurrentInstance();
		var info = checkHookInfo({
			func: function() {
				return effect;
			},
			deps
		});
		var effects = unshift ? inst._usefs : inst._uefs;
		if (info.updated) effects.push(function() {
			info.effect && info.effect();
			info.effect = effect();
			return info.effect;
		});
		else effects.push(function() {
			return info.effect;
		});
	}
	function useImperativeHandle(ref, func, deps) {
		useEffect(function() {
			ref === null || ref === void 0 || ref(func());
		}, deps, true);
	}
	var version = "simple-1.0.0";
	//#endregion
	//#region ../../node_modules/.pnpm/@egjs+agent@2.4.4/node_modules/@egjs/agent/dist/agent.esm.js
	function some(arr, callback) {
		var length = arr.length;
		for (var i = 0; i < length; ++i) if (callback(arr[i], i)) return true;
		return false;
	}
	function find(arr, callback) {
		var length = arr.length;
		for (var i = 0; i < length; ++i) if (callback(arr[i], i)) return arr[i];
		return null;
	}
	function getUserAgentString(agent) {
		var userAgent = agent;
		if (typeof userAgent === "undefined") {
			if (typeof navigator === "undefined" || !navigator) return "";
			userAgent = navigator.userAgent || "";
		}
		return userAgent.toLowerCase();
	}
	function execRegExp(pattern, text) {
		try {
			return new RegExp(pattern, "g").exec(text);
		} catch (e) {
			return null;
		}
	}
	function hasUserAgentData() {
		if (typeof navigator === "undefined" || !navigator || !navigator.userAgentData) return false;
		var userAgentData = navigator.userAgentData;
		var brands = userAgentData.brands || userAgentData.uaList;
		return !!(brands && brands.length);
	}
	function findVersion(versionTest, userAgent) {
		var result = execRegExp("(" + versionTest + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", userAgent);
		return result ? result[3] : "";
	}
	function convertVersion(text) {
		return text.replace(/_/g, ".");
	}
	function findPreset(presets, userAgent) {
		var userPreset = null;
		var version = "-1";
		some(presets, function(preset) {
			var result = execRegExp("(" + preset.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", userAgent);
			if (!result || preset.brand) return false;
			userPreset = preset;
			version = result[3] || "-1";
			if (preset.versionAlias) version = preset.versionAlias;
			else if (preset.versionTest) version = findVersion(preset.versionTest.toLowerCase(), userAgent) || version;
			version = convertVersion(version);
			return true;
		});
		return {
			preset: userPreset,
			version
		};
	}
	function findPresetBrand(presets, brands) {
		var brandInfo = {
			brand: "",
			version: "-1"
		};
		some(presets, function(preset) {
			var result = findBrand(brands, preset);
			if (!result) return false;
			brandInfo.brand = preset.id;
			brandInfo.version = preset.versionAlias || result.version;
			return brandInfo.version !== "-1";
		});
		return brandInfo;
	}
	function findBrand(brands, preset) {
		return find(brands, function(_a) {
			var brand = _a.brand;
			return execRegExp("" + preset.test, brand.toLowerCase());
		});
	}
	var BROWSER_PRESETS = [
		{
			test: "phantomjs",
			id: "phantomjs"
		},
		{
			test: "whale",
			id: "whale"
		},
		{
			test: "edgios|edge|edg",
			id: "edge"
		},
		{
			test: "msie|trident|windows phone",
			id: "ie",
			versionTest: "iemobile|msie|rv"
		},
		{
			test: "miuibrowser",
			id: "miui browser"
		},
		{
			test: "samsungbrowser",
			id: "samsung internet"
		},
		{
			test: "samsung",
			id: "samsung internet",
			versionTest: "version"
		},
		{
			test: "chrome|crios",
			id: "chrome"
		},
		{
			test: "firefox|fxios",
			id: "firefox"
		},
		{
			test: "android",
			id: "android browser",
			versionTest: "version"
		},
		{
			test: "safari|iphone|ipad|ipod",
			id: "safari",
			versionTest: "version"
		}
	];
	var CHROMIUM_PRESETS = [
		{
			test: "(?=.*applewebkit/(53[0-7]|5[0-2]|[0-4]))(?=.*\\schrome)",
			id: "chrome",
			versionTest: "chrome"
		},
		{
			test: "chromium",
			id: "chrome"
		},
		{
			test: "whale",
			id: "chrome",
			versionAlias: "-1",
			brand: true
		}
	];
	var WEBKIT_PRESETS = [{
		test: "applewebkit",
		id: "webkit",
		versionTest: "applewebkit|safari"
	}];
	var WEBVIEW_PRESETS = [
		{
			test: "(?=(iphone|ipad))(?!(.*version))",
			id: "webview"
		},
		{
			test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
			id: "webview"
		},
		{
			test: "webview",
			id: "webview"
		}
	];
	var OS_PRESETS = [
		{
			test: "windows phone",
			id: "windows phone"
		},
		{
			test: "windows 2000",
			id: "window",
			versionAlias: "5.0"
		},
		{
			test: "windows nt",
			id: "window"
		},
		{
			test: "win32|windows",
			id: "window"
		},
		{
			test: "iphone|ipad|ipod",
			id: "ios",
			versionTest: "iphone os|cpu os"
		},
		{
			test: "macos|macintel|mac os x",
			id: "mac"
		},
		{
			test: "android|linux armv81",
			id: "android"
		},
		{
			test: "tizen",
			id: "tizen"
		},
		{
			test: "webos|web0s",
			id: "webos"
		}
	];
	function isWebView(userAgent) {
		return !!findPreset(WEBVIEW_PRESETS, userAgent).preset;
	}
	function getLegacyAgent(userAgent) {
		var nextAgent = getUserAgentString(userAgent);
		var isMobile = !!/mobi/g.exec(nextAgent);
		var browser = {
			name: "unknown",
			version: "-1",
			majorVersion: -1,
			webview: isWebView(nextAgent),
			chromium: false,
			chromiumVersion: "-1",
			webkit: false,
			webkitVersion: "-1"
		};
		var os = {
			name: "unknown",
			version: "-1",
			majorVersion: -1
		};
		var _a = findPreset(BROWSER_PRESETS, nextAgent), browserPreset = _a.preset, browserVersion = _a.version;
		var _b = findPreset(OS_PRESETS, nextAgent), osPreset = _b.preset, osVersion = _b.version;
		var chromiumPreset = findPreset(CHROMIUM_PRESETS, nextAgent);
		browser.chromium = !!chromiumPreset.preset;
		browser.chromiumVersion = chromiumPreset.version;
		if (!browser.chromium) {
			var webkitPreset = findPreset(WEBKIT_PRESETS, nextAgent);
			browser.webkit = !!webkitPreset.preset;
			browser.webkitVersion = webkitPreset.version;
		}
		if (osPreset) {
			os.name = osPreset.id;
			os.version = osVersion;
			os.majorVersion = parseInt(osVersion, 10);
		}
		if (browserPreset) {
			browser.name = browserPreset.id;
			browser.version = browserVersion;
			if (browser.webview && os.name === "ios" && browser.name !== "safari") browser.webview = false;
		}
		browser.majorVersion = parseInt(browser.version, 10);
		return {
			browser,
			os,
			isMobile,
			isHints: false
		};
	}
	function getClientHintsAgent(osData) {
		var userAgentData = navigator.userAgentData;
		var brands = (userAgentData.uaList || userAgentData.brands).slice();
		var fullVersionList = osData && osData.fullVersionList;
		var isMobile = userAgentData.mobile || false;
		var firstBrand = brands[0];
		var platform = (osData && osData.platform || userAgentData.platform || navigator.platform).toLowerCase();
		var browser = {
			name: firstBrand.brand,
			version: firstBrand.version,
			majorVersion: -1,
			webkit: false,
			webkitVersion: "-1",
			chromium: false,
			chromiumVersion: "-1",
			webview: !!findPresetBrand(WEBVIEW_PRESETS, brands).brand || isWebView(getUserAgentString())
		};
		var os = {
			name: "unknown",
			version: "-1",
			majorVersion: -1
		};
		browser.webkit = !browser.chromium && some(WEBKIT_PRESETS, function(preset) {
			return findBrand(brands, preset);
		});
		var chromiumBrand = findPresetBrand(CHROMIUM_PRESETS, brands);
		browser.chromium = !!chromiumBrand.brand;
		browser.chromiumVersion = chromiumBrand.version || "-1";
		if (!browser.chromium) {
			var webkitBrand = findPresetBrand(WEBKIT_PRESETS, brands);
			browser.webkit = !!webkitBrand.brand;
			browser.webkitVersion = webkitBrand.version || "-1";
		}
		var platfomResult = find(OS_PRESETS, function(preset) {
			return new RegExp("" + preset.test, "g").exec(platform);
		});
		os.name = platfomResult ? platfomResult.id : "";
		if (osData) os.version = osData.platformVersion || "-1";
		if (fullVersionList && fullVersionList.length) {
			var browserBrandByFullVersionList = findPresetBrand(BROWSER_PRESETS, fullVersionList);
			browser.name = browserBrandByFullVersionList.brand || browser.name;
			browser.version = browserBrandByFullVersionList.version || browser.version;
		} else {
			var browserBrand = findPresetBrand(BROWSER_PRESETS, brands);
			browser.name = browserBrand.brand || browser.name;
			browser.version = browserBrand.brand && osData ? osData.uaFullVersion : browserBrand.version;
		}
		if (browser.webkit) os.name = isMobile ? "ios" : "mac";
		if (os.name === "ios" && browser.webview) browser.version = "-1";
		os.version = convertVersion(os.version);
		browser.version = convertVersion(browser.version);
		os.majorVersion = parseInt(os.version, 10);
		browser.majorVersion = parseInt(browser.version, 10);
		return {
			browser,
			os,
			isMobile,
			isHints: true
		};
	}
	/**
	* Extracts browser and operating system information from the user agent string.
	* @ko 유저 에이전트 문자열에서 브라우저와 운영체제 정보를 추출한다.
	* @function eg.agent#agent
	* @param - user agent string to parse <ko>파싱할 유저에이전트 문자열</ko>
	* @return - agent Info <ko> 에이전트 정보 </ko>
	* @example
	import agent from "@egjs/agent";
	// eg.agent();
	const { os, browser, isMobile } = agent();
	*/
	function agent$1(userAgent) {
		if (typeof userAgent === "undefined" && hasUserAgentData()) return getClientHintsAgent();
		else return getLegacyAgent(userAgent);
	}
	//#endregion
	//#region ../../node_modules/.pnpm/@scena+matrix@1.1.1/node_modules/@scena/matrix/dist/matrix.esm.js
	function add(matrix, inverseMatrix, startIndex, fromIndex, n, k) {
		for (var i = 0; i < n; ++i) {
			var x = startIndex + i * n;
			var fromX = fromIndex + i * n;
			matrix[x] += matrix[fromX] * k;
			inverseMatrix[x] += inverseMatrix[fromX] * k;
		}
	}
	function swap(matrix, inverseMatrix, startIndex, fromIndex, n) {
		for (var i = 0; i < n; ++i) {
			var x = startIndex + i * n;
			var fromX = fromIndex + i * n;
			var v = matrix[x];
			var iv = inverseMatrix[x];
			matrix[x] = matrix[fromX];
			matrix[fromX] = v;
			inverseMatrix[x] = inverseMatrix[fromX];
			inverseMatrix[fromX] = iv;
		}
	}
	function divide(matrix, inverseMatrix, startIndex, n, k) {
		for (var i = 0; i < n; ++i) {
			var x = startIndex + i * n;
			matrix[x] /= k;
			inverseMatrix[x] /= k;
		}
	}
	/**
	*
	* @namespace Matrix
	*/
	/**
	* @memberof Matrix
	*/
	function ignoreDimension(matrix, m, n) {
		if (n === void 0) n = Math.sqrt(matrix.length);
		var newMatrix = matrix.slice();
		for (var i = 0; i < n; ++i) {
			newMatrix[i * n + m - 1] = 0;
			newMatrix[(m - 1) * n + i] = 0;
		}
		newMatrix[(m - 1) * (n + 1)] = 1;
		return newMatrix;
	}
	/**
	* @memberof Matrix
	*/
	function invert(matrix, n) {
		if (n === void 0) n = Math.sqrt(matrix.length);
		var newMatrix = matrix.slice();
		var inverseMatrix = createIdentityMatrix(n);
		for (var i = 0; i < n; ++i) {
			var identityIndex = n * i + i;
			if (!throttle(newMatrix[identityIndex], 1e-7)) {
				for (var j = i + 1; j < n; ++j) if (newMatrix[n * i + j]) {
					swap(newMatrix, inverseMatrix, i, j, n);
					break;
				}
			}
			if (!throttle(newMatrix[identityIndex], 1e-7)) return [];
			divide(newMatrix, inverseMatrix, i, n, newMatrix[identityIndex]);
			for (var j = 0; j < n; ++j) {
				var targetStartIndex = j;
				var target = newMatrix[j + i * n];
				if (!throttle(target, 1e-7) || i === j) continue;
				add(newMatrix, inverseMatrix, targetStartIndex, i, n, -target);
			}
		}
		return inverseMatrix;
	}
	/**
	* @memberof Matrix
	*/
	function transpose(matrix, n) {
		if (n === void 0) n = Math.sqrt(matrix.length);
		var newMatrix = [];
		for (var i = 0; i < n; ++i) for (var j = 0; j < n; ++j) newMatrix[j * n + i] = matrix[n * i + j];
		return newMatrix;
	}
	/**
	* @memberof Matrix
	*/
	function getOrigin(matrix, n) {
		if (n === void 0) n = Math.sqrt(matrix.length);
		var originMatrix = [];
		var w = matrix[n * n - 1];
		for (var i = 0; i < n - 1; ++i) originMatrix[i] = matrix[n * (n - 1) + i] / w;
		originMatrix[n - 1] = 0;
		return originMatrix;
	}
	/**
	* @memberof Matrix
	*/
	function fromTranslation(pos, n) {
		var newMatrix = createIdentityMatrix(n);
		for (var i = 0; i < n - 1; ++i) newMatrix[n * (n - 1) + i] = pos[i] || 0;
		return newMatrix;
	}
	/**
	* @memberof Matrix
	*/
	function convertPositionMatrix(matrix, n) {
		var newMatrix = matrix.slice();
		for (var i = matrix.length; i < n - 1; ++i) newMatrix[i] = 0;
		newMatrix[n - 1] = 1;
		return newMatrix;
	}
	/**
	* @memberof Matrix
	*/
	function convertDimension(matrix, n, m) {
		if (n === void 0) n = Math.sqrt(matrix.length);
		if (n === m) return matrix;
		var newMatrix = createIdentityMatrix(m);
		var length = Math.min(n, m);
		for (var i = 0; i < length - 1; ++i) {
			for (var j = 0; j < length - 1; ++j) newMatrix[i * m + j] = matrix[i * n + j];
			newMatrix[(i + 1) * m - 1] = matrix[(i + 1) * n - 1];
			newMatrix[(m - 1) * m + i] = matrix[(n - 1) * n + i];
		}
		newMatrix[m * m - 1] = matrix[n * n - 1];
		return newMatrix;
	}
	/**
	* @memberof Matrix
	*/
	function multiplies(n) {
		var matrixes = [];
		for (var _i = 1; _i < arguments.length; _i++) matrixes[_i - 1] = arguments[_i];
		var m = createIdentityMatrix(n);
		matrixes.forEach(function(matrix) {
			m = multiply(m, matrix, n);
		});
		return m;
	}
	/**
	* @memberof Matrix
	*/
	function multiply(matrix, matrix2, n) {
		if (n === void 0) n = Math.sqrt(matrix.length);
		var newMatrix = [];
		var m = matrix.length / n;
		var k = matrix2.length / m;
		if (!m) return matrix2;
		else if (!k) return matrix;
		for (var i = 0; i < n; ++i) for (var j = 0; j < k; ++j) {
			newMatrix[j * n + i] = 0;
			for (var l = 0; l < m; ++l) newMatrix[j * n + i] += matrix[l * n + i] * matrix2[j * m + l];
		}
		return newMatrix;
	}
	/**
	* @memberof Matrix
	*/
	function plus(pos1, pos2) {
		var length = Math.min(pos1.length, pos2.length);
		var nextPos = pos1.slice();
		for (var i = 0; i < length; ++i) nextPos[i] = nextPos[i] + pos2[i];
		return nextPos;
	}
	/**
	* @memberof Matrix
	*/
	function minus(pos1, pos2) {
		var length = Math.min(pos1.length, pos2.length);
		var nextPos = pos1.slice();
		for (var i = 0; i < length; ++i) nextPos[i] = nextPos[i] - pos2[i];
		return nextPos;
	}
	/**
	* @memberof Matrix
	*/
	function convertCSStoMatrix(a, is2d) {
		if (is2d === void 0) is2d = a.length === 6;
		if (is2d) return [
			a[0],
			a[1],
			0,
			a[2],
			a[3],
			0,
			a[4],
			a[5],
			1
		];
		return a;
	}
	/**
	* @memberof Matrix
	*/
	function convertMatrixtoCSS(a, is2d) {
		if (is2d === void 0) is2d = a.length === 9;
		if (is2d) return [
			a[0],
			a[1],
			a[3],
			a[4],
			a[6],
			a[7]
		];
		return a;
	}
	/**
	* @memberof Matrix
	*/
	function calculate(matrix, matrix2, n) {
		if (n === void 0) n = matrix2.length;
		var result = multiply(matrix, matrix2, n);
		var k = result[n - 1];
		return result.map(function(v) {
			return v / k;
		});
	}
	/**
	* @memberof Matrix
	*/
	function rotateX3d(matrix, rad) {
		return multiply(matrix, [
			1,
			0,
			0,
			0,
			0,
			Math.cos(rad),
			Math.sin(rad),
			0,
			0,
			-Math.sin(rad),
			Math.cos(rad),
			0,
			0,
			0,
			0,
			1
		], 4);
	}
	/**
	* @memberof Matrix
	*/
	function rotateY3d(matrix, rad) {
		return multiply(matrix, [
			Math.cos(rad),
			0,
			-Math.sin(rad),
			0,
			0,
			1,
			0,
			0,
			Math.sin(rad),
			0,
			Math.cos(rad),
			0,
			0,
			0,
			0,
			1
		], 4);
	}
	/**
	* @memberof Matrix
	*/
	function rotateZ3d(matrix, rad) {
		return multiply(matrix, createRotateMatrix(rad, 4));
	}
	/**
	* @memberof Matrix
	*/
	function scale3d(matrix, _a) {
		var _b = _a[0], sx = _b === void 0 ? 1 : _b, _c = _a[1], sy = _c === void 0 ? 1 : _c, _d = _a[2];
		return multiply(matrix, [
			sx,
			0,
			0,
			0,
			0,
			sy,
			0,
			0,
			0,
			0,
			_d === void 0 ? 1 : _d,
			0,
			0,
			0,
			0,
			1
		], 4);
	}
	/**
	* @memberof Matrix
	*/
	function rotate(pos, rad) {
		return calculate(createRotateMatrix(rad, 3), convertPositionMatrix(pos, 3));
	}
	/**
	* @memberof Matrix
	*/
	function translate3d(matrix, _a) {
		var _b = _a[0], tx = _b === void 0 ? 0 : _b, _c = _a[1], ty = _c === void 0 ? 0 : _c, _d = _a[2];
		return multiply(matrix, [
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			tx,
			ty,
			_d === void 0 ? 0 : _d,
			1
		], 4);
	}
	/**
	* @memberof Matrix
	*/
	function matrix3d(matrix1, matrix2) {
		return multiply(matrix1, matrix2, 4);
	}
	/**
	* @memberof Matrix
	*/
	function createRotateMatrix(rad, n) {
		var cos = Math.cos(rad);
		var sin = Math.sin(rad);
		var m = createIdentityMatrix(n);
		m[0] = cos;
		m[1] = sin;
		m[n] = -sin;
		m[n + 1] = cos;
		return m;
	}
	/**
	* @memberof Matrix
	*/
	function createIdentityMatrix(n) {
		var length = n * n;
		var matrix = [];
		for (var i = 0; i < length; ++i) matrix[i] = i % (n + 1) ? 0 : 1;
		return matrix;
	}
	/**
	* @memberof Matrix
	*/
	function createScaleMatrix(scale, n) {
		var m = createIdentityMatrix(n);
		var length = Math.min(scale.length, n - 1);
		for (var i = 0; i < length; ++i) m[(n + 1) * i] = scale[i];
		return m;
	}
	/**
	* @memberof Matrix
	*/
	function createOriginMatrix(origin, n) {
		var m = createIdentityMatrix(n);
		var length = Math.min(origin.length, n - 1);
		for (var i = 0; i < length; ++i) m[n * (n - 1) + i] = origin[i];
		return m;
	}
	/**
	* @memberof Matrix
	*/
	function createWarpMatrix(pos0, pos1, pos2, pos3, nextPos0, nextPos1, nextPos2, nextPos3) {
		var x0 = pos0[0], y0 = pos0[1];
		var x1 = pos1[0], y1 = pos1[1];
		var x2 = pos2[0], y2 = pos2[1];
		var x3 = pos3[0], y3 = pos3[1];
		var u0 = nextPos0[0], v0 = nextPos0[1];
		var u1 = nextPos1[0], v1 = nextPos1[1];
		var u2 = nextPos2[0], v2 = nextPos2[1];
		var u3 = nextPos3[0], v3 = nextPos3[1];
		var inverseMatrix = invert([
			x0,
			0,
			x1,
			0,
			x2,
			0,
			x3,
			0,
			y0,
			0,
			y1,
			0,
			y2,
			0,
			y3,
			0,
			1,
			0,
			1,
			0,
			1,
			0,
			1,
			0,
			0,
			x0,
			0,
			x1,
			0,
			x2,
			0,
			x3,
			0,
			y0,
			0,
			y1,
			0,
			y2,
			0,
			y3,
			0,
			1,
			0,
			1,
			0,
			1,
			0,
			1,
			-u0 * x0,
			-v0 * x0,
			-u1 * x1,
			-v1 * x1,
			-u2 * x2,
			-v2 * x2,
			-u3 * x3,
			-v3 * x3,
			-u0 * y0,
			-v0 * y0,
			-u1 * y1,
			-v1 * y1,
			-u2 * y2,
			-v2 * y2,
			-u3 * y3,
			-v3 * y3
		], 8);
		if (!inverseMatrix.length) return [];
		var h = multiply(inverseMatrix, [
			u0,
			v0,
			u1,
			v1,
			u2,
			v2,
			u3,
			v3
		], 8);
		h[8] = 1;
		return convertDimension(transpose(h), 3, 4);
	}
	//#endregion
	//#region ../../node_modules/.pnpm/css-to-mat@1.1.1/node_modules/css-to-mat/dist/css-to-mat.esm.js
	/******************************************************************************
	Copyright (c) Microsoft Corporation.
	
	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.
	
	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	var __assign$4 = function() {
		__assign$4 = Object.assign || function __assign(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign$4.apply(this, arguments);
	};
	function createMatrix() {
		return [
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1
		];
	}
	function parseMat(transform, size) {
		if (size === void 0) size = 0;
		return toMat(parse(transform, size));
	}
	function calculateMatrixDist(matrix, pos) {
		var res = calculate(matrix, [
			pos[0],
			pos[1] || 0,
			pos[2] || 0,
			1
		], 4);
		var w = res[3] || 1;
		return [
			res[0] / w,
			res[1] / w,
			res[2] / w
		];
	}
	function toMat(matrixInfos) {
		var target = createMatrix();
		matrixInfos.forEach(function(info) {
			var matrixFunction = info.matrixFunction, functionValue = info.functionValue;
			if (!matrixFunction) return;
			target = matrixFunction(target, functionValue);
		});
		return target;
	}
	function parse(transform, size) {
		if (size === void 0) size = 0;
		return (isArray(transform) ? transform : splitSpace(transform)).map(function(t) {
			var _a = splitBracket(t), name = _a.prefix, value = _a.value;
			var matrixFunction = null;
			var functionName = name;
			var functionValue = "";
			if (name === "translate" || name === "translateX" || name === "translate3d") {
				var nextSize_1 = isObject(size) ? __assign$4(__assign$4({}, size), { "o%": size["%"] }) : {
					"%": size,
					"o%": size
				};
				var _b = splitComma(value).map(function(v, i) {
					if (i === 0 && "x%" in nextSize_1) nextSize_1["%"] = size["x%"];
					else if (i === 1 && "y%" in nextSize_1) nextSize_1["%"] = size["y%"];
					else nextSize_1["%"] = size["o%"];
					return convertUnitSize(v, nextSize_1);
				}), posX = _b[0], _c = _b[1], posY = _c === void 0 ? 0 : _c, _d = _b[2], posZ = _d === void 0 ? 0 : _d;
				matrixFunction = translate3d;
				functionValue = [
					posX,
					posY,
					posZ
				];
			} else if (name === "translateY") {
				var posY = convertUnitSize(value, isObject(size) ? __assign$4({ "%": size["y%"] }, size) : { "%": size });
				matrixFunction = translate3d;
				functionValue = [
					0,
					posY,
					0
				];
			} else if (name === "translateZ") {
				var posZ = parseFloat(value);
				matrixFunction = translate3d;
				functionValue = [
					0,
					0,
					posZ
				];
			} else if (name === "scale" || name === "scale3d") {
				var _e = splitComma(value).map(function(v) {
					return parseFloat(v);
				}), sx = _e[0], _f = _e[1], sy = _f === void 0 ? sx : _f, _g = _e[2], sz = _g === void 0 ? 1 : _g;
				matrixFunction = scale3d;
				functionValue = [
					sx,
					sy,
					sz
				];
			} else if (name === "scaleX") {
				var sx = parseFloat(value);
				matrixFunction = scale3d;
				functionValue = [
					sx,
					1,
					1
				];
			} else if (name === "scaleY") {
				var sy = parseFloat(value);
				matrixFunction = scale3d;
				functionValue = [
					1,
					sy,
					1
				];
			} else if (name === "scaleZ") {
				var sz = parseFloat(value);
				matrixFunction = scale3d;
				functionValue = [
					1,
					1,
					sz
				];
			} else if (name === "rotate" || name === "rotateZ" || name === "rotateX" || name === "rotateY") {
				var _h = splitUnit(value), unit = _h.unit, unitValue = _h.value;
				var rad = unit === "rad" ? unitValue : unitValue * Math.PI / 180;
				if (name === "rotate" || name === "rotateZ") {
					functionName = "rotateZ";
					matrixFunction = rotateZ3d;
				} else if (name === "rotateX") matrixFunction = rotateX3d;
				else if (name === "rotateY") matrixFunction = rotateY3d;
				functionValue = rad;
			} else if (name === "matrix3d") {
				matrixFunction = matrix3d;
				functionValue = splitComma(value).map(function(v) {
					return parseFloat(v);
				});
			} else if (name === "matrix") {
				var m = splitComma(value).map(function(v) {
					return parseFloat(v);
				});
				matrixFunction = matrix3d;
				functionValue = [
					m[0],
					m[1],
					0,
					0,
					m[2],
					m[3],
					0,
					0,
					0,
					0,
					1,
					0,
					m[4],
					m[5],
					0,
					1
				];
			} else functionName = "";
			return {
				name,
				functionName,
				value,
				matrixFunction,
				functionValue
			};
		});
	}
	//#endregion
	//#region ../../node_modules/.pnpm/@egjs+children-differ@1.0.1/node_modules/@egjs/children-differ/dist/children-differ.esm.js
	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0
	
	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.
	
	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	var extendStatics$2 = function(d, b) {
		extendStatics$2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		};
		return extendStatics$2(d, b);
	};
	function __extends$2(d, b) {
		extendStatics$2(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}
	var findKeyCallback = typeof Map === "function" ? void 0 : function() {
		var childrenCount = 0;
		return function(el) {
			return el.__DIFF_KEY__ || (el.__DIFF_KEY__ = ++childrenCount);
		};
	}();
	/**
	* A module that checks diff when child are added, removed, or changed .
	* @ko 자식 노드들에서 자식 노드가 추가되거나 삭제되거나 순서가 변경된 사항을 체크하는 모듈입니다.
	* @memberof eg
	* @extends eg.ListDiffer
	*/
	var ChildrenDiffer = /*#__PURE__*/ function(_super) {
		__extends$2(ChildrenDiffer, _super);
		/**
		* @param - Initializing Children <ko> 초기 설정할 자식 노드들</ko>
		*/
		function ChildrenDiffer(list) {
			if (list === void 0) list = [];
			return _super.call(this, list, findKeyCallback) || this;
		}
		return ChildrenDiffer;
	}(ListDiffer);
	/**
	*
	* @memberof eg.ChildrenDiffer
	* @static
	* @function
	* @param - Previous List <ko> 이전 목록 </ko>
	* @param - List to Update <ko> 업데이트 할 목록 </ko>
	* @return - Returns the diff between `prevList` and `list` <ko> `prevList`와 `list`의 다른 점을 반환한다.</ko>
	* @example
	* import { diff } from "@egjs/children-differ";
	* // script => eg.ChildrenDiffer.diff
	* const result = diff([0, 1, 2, 3, 4, 5], [7, 8, 0, 4, 3, 6, 2, 1]);
	* // List before update
	* // [1, 2, 3, 4, 5]
	* console.log(result.prevList);
	* // Updated list
	* // [4, 3, 6, 2, 1]
	* console.log(result.list);
	* // Index array of values added to `list`
	* // [0, 1, 5]
	* console.log(result.added);
	* // Index array of values removed in `prevList`
	* // [5]
	* console.log(result.removed);
	* // An array of index pairs of `prevList` and `list` with different indexes from `prevList` and `list`
	* // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
	* console.log(result.changed);
	* // The subset of `changed` and an array of index pairs that moved data directly. Indicate an array of absolute index pairs of `ordered`.(Formatted by: Array<[index of prevList, index of list]>)
	* // [[4, 3], [3, 4], [2, 6]]
	* console.log(result.pureChanged);
	* // An array of index pairs to be `ordered` that can synchronize `list` before adding data. (Formatted by: Array<[prevIndex, nextIndex]>)
	* // [[4, 1], [4, 2], [4, 3]]
	* console.log(result.ordered);
	* // An array of index pairs of `prevList` and `list` that have not been added/removed so data is preserved
	* // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
	* console.log(result.maintained);
	*/
	function diff(prevList, list) {
		return diff$1(prevList, list, findKeyCallback);
	}
	//#endregion
	//#region ../../node_modules/.pnpm/@scena+event-emitter@1.0.5/node_modules/@scena/event-emitter/dist/event-emitter.esm.js
	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.
	
	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.
	
	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	var __assign$3 = function() {
		__assign$3 = Object.assign || function __assign(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign$3.apply(this, arguments);
	};
	function __spreadArrays$1() {
		for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
		for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
		return r;
	}
	/**
	* Implement EventEmitter on object or component.
	*/
	var EventEmitter = /*#__PURE__*/ function() {
		function EventEmitter() {
			this._events = {};
		}
		/**
		* Add a listener to the registered event.
		* @param - Name of the event to be added
		* @param - listener function of the event to be added
		* @example
		* import EventEmitter from "@scena/event-emitter";
		* cosnt emitter = new EventEmitter();
		*
		* // Add listener in "a" event
		* emitter.on("a", () => {
		* });
		* // Add listeners
		* emitter.on({
		*  a: () => {},
		*  b: () => {},
		* });
		*/
		var __proto = EventEmitter.prototype;
		__proto.on = function(eventName, listener) {
			if (isObject(eventName)) for (var name in eventName) this.on(name, eventName[name]);
			else this._addEvent(eventName, listener, {});
			return this;
		};
		/**
		* Remove listeners registered in the event target.
		* @param - Name of the event to be removed
		* @param - listener function of the event to be removed
		* @example
		* import EventEmitter from "@scena/event-emitter";
		* cosnt emitter = new EventEmitter();
		*
		* // Remove all listeners.
		* emitter.off();
		*
		* // Remove all listeners in "A" event.
		* emitter.off("a");
		*
		*
		* // Remove "listener" listener in "a" event.
		* emitter.off("a", listener);
		*/
		__proto.off = function(eventName, listener) {
			if (!eventName) this._events = {};
			else if (isObject(eventName)) for (var name in eventName) this.off(name);
			else if (!listener) this._events[eventName] = [];
			else {
				var events = this._events[eventName];
				if (events) {
					var index = findIndex(events, function(e) {
						return e.listener === listener;
					});
					if (index > -1) events.splice(index, 1);
				}
			}
			return this;
		};
		/**
		* Add a disposable listener and Use promise to the registered event.
		* @param - Name of the event to be added
		* @param - disposable listener function of the event to be added
		* @example
		* import EventEmitter from "@scena/event-emitter";
		* cosnt emitter = new EventEmitter();
		*
		* // Add a disposable listener in "a" event
		* emitter.once("a", () => {
		* });
		*
		* // Use Promise
		* emitter.once("a").then(e => {
		* });
		*/
		__proto.once = function(eventName, listener) {
			var _this = this;
			if (listener) this._addEvent(eventName, listener, { once: true });
			return new Promise(function(resolve) {
				_this._addEvent(eventName, resolve, { once: true });
			});
		};
		/**
		* Fires an event to call listeners.
		* @param - Event name
		* @param - Event parameter
		* @return If false, stop the event.
		* @example
		*
		* import EventEmitter from "@scena/event-emitter";
		*
		*
		* const emitter = new EventEmitter();
		*
		* emitter.on("a", e => {
		* });
		*
		*
		* emitter.emit("a", {
		*   a: 1,
		* });
		*/
		__proto.emit = function(eventName, param) {
			var _this = this;
			if (param === void 0) param = {};
			var events = this._events[eventName];
			if (!eventName || !events) return true;
			var isStop = false;
			param.eventType = eventName;
			param.stop = function() {
				isStop = true;
			};
			param.currentTarget = this;
			__spreadArrays$1(events).forEach(function(info) {
				info.listener(param);
				if (info.once) _this.off(eventName, info.listener);
			});
			return !isStop;
		};
		/**
		* Fires an event to call listeners.
		* @param - Event name
		* @param - Event parameter
		* @return If false, stop the event.
		* @example
		*
		* import EventEmitter from "@scena/event-emitter";
		*
		*
		* const emitter = new EventEmitter();
		*
		* emitter.on("a", e => {
		* });
		*
		*
		* emitter.emit("a", {
		*   a: 1,
		* });
		*/
		/**
		* Fires an event to call listeners.
		* @param - Event name
		* @param - Event parameter
		* @return If false, stop the event.
		* @example
		*
		* import EventEmitter from "@scena/event-emitter";
		*
		*
		* const emitter = new EventEmitter();
		*
		* emitter.on("a", e => {
		* });
		*
		* // emit
		* emitter.trigger("a", {
		*   a: 1,
		* });
		*/
		__proto.trigger = function(eventName, param) {
			if (param === void 0) param = {};
			return this.emit(eventName, param);
		};
		__proto._addEvent = function(eventName, listener, options) {
			var events = this._events;
			events[eventName] = events[eventName] || [];
			events[eventName].push(__assign$3({ listener }, options));
		};
		return EventEmitter;
	}();
	//#endregion
	//#region ../../node_modules/.pnpm/@scena+dragscroll@1.4.0/node_modules/@scena/dragscroll/dist/dragscroll.esm.js
	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.
	
	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.
	
	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	var extendStatics$1 = function(d, b) {
		extendStatics$1 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		};
		return extendStatics$1(d, b);
	};
	function __extends$1(d, b) {
		extendStatics$1(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}
	var __assign$2 = function() {
		__assign$2 = Object.assign || function __assign(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign$2.apply(this, arguments);
	};
	function getDefaultScrollPosition$1(e) {
		var container = e.container;
		if (container === document.body) return [container.scrollLeft || document.documentElement.scrollLeft, container.scrollTop || document.documentElement.scrollTop];
		return [container.scrollLeft, container.scrollTop];
	}
	function checkDefaultScrollEvent(container, callback) {
		container.addEventListener("scroll", callback);
		return function() {
			container.removeEventListener("scroll", callback);
		};
	}
	function getContainerElement(container) {
		if (!container) return null;
		else if (isString(container)) return document.querySelector(container);
		if (isFunction(container)) return container();
		else if (container instanceof Element) return container;
		else if ("current" in container) return container.current;
		else if ("value" in container) return container.value;
	}
	/**
	* @sort 1
	*/
	var DragScroll = /*#__PURE__*/ function(_super) {
		__extends$1(DragScroll, _super);
		function DragScroll() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this._startRect = null;
			_this._startPos = [];
			_this._prevTime = 0;
			_this._timer = 0;
			_this._prevScrollPos = [0, 0];
			_this._isWait = false;
			_this._flag = false;
			_this._currentOptions = null;
			_this._lock = false;
			_this._unregister = null;
			_this._onScroll = function() {
				var options = _this._currentOptions;
				if (_this._lock || !options) return;
				_this.emit("scrollDrag", { next: function(inputEvent) {
					_this.checkScroll({
						container: options.container,
						inputEvent
					});
				} });
			};
			return _this;
		}
		/**
		*/
		var __proto = DragScroll.prototype;
		__proto.dragStart = function(e, options) {
			var container = getContainerElement(options.container);
			if (!container) {
				this._flag = false;
				return;
			}
			var top = 0;
			var left = 0;
			var width = 0;
			var height = 0;
			if (container === document.body) {
				width = window.innerWidth;
				height = window.innerHeight;
			} else {
				var rect = container.getBoundingClientRect();
				top = rect.top;
				left = rect.left;
				width = rect.width;
				height = rect.height;
			}
			this._flag = true;
			this._startPos = [e.clientX, e.clientY];
			this._startRect = {
				top,
				left,
				width,
				height
			};
			this._prevScrollPos = this._getScrollPosition([0, 0], options);
			this._currentOptions = options;
			this._registerScrollEvent(options);
		};
		__proto.drag = function(e, options) {
			clearTimeout(this._timer);
			if (!this._flag) return;
			var clientX = e.clientX, clientY = e.clientY;
			var _a = options.threshold, threshold = _a === void 0 ? 0 : _a;
			var _b = this, _startRect = _b._startRect, _startPos = _b._startPos;
			this._currentOptions = options;
			var direction = [0, 0];
			if (_startRect.top > clientY - threshold) {
				if (_startPos[1] > _startRect.top || clientY < _startPos[1]) direction[1] = -1;
			} else if (_startRect.top + _startRect.height < clientY + threshold) {
				if (_startPos[1] < _startRect.top + _startRect.height || clientY > _startPos[1]) direction[1] = 1;
			}
			if (_startRect.left > clientX - threshold) {
				if (_startPos[0] > _startRect.left || clientX < _startPos[0]) direction[0] = -1;
			} else if (_startRect.left + _startRect.width < clientX + threshold) {
				if (_startPos[0] < _startRect.left + _startRect.width || clientX > _startPos[0]) direction[0] = 1;
			}
			if (!direction[0] && !direction[1]) return false;
			return this._continueDrag(__assign$2(__assign$2({}, options), {
				direction,
				inputEvent: e,
				isDrag: true
			}));
		};
		/**
		*/
		__proto.checkScroll = function(options) {
			var _this = this;
			if (this._isWait) return false;
			var _a = options.prevScrollPos, prevScrollPos = _a === void 0 ? this._prevScrollPos : _a, direction = options.direction, _b = options.throttleTime, throttleTime = _b === void 0 ? 0 : _b, inputEvent = options.inputEvent, isDrag = options.isDrag;
			var nextScrollPos = this._getScrollPosition(direction || [0, 0], options);
			var offsetX = nextScrollPos[0] - prevScrollPos[0];
			var offsetY = nextScrollPos[1] - prevScrollPos[1];
			var nextDirection = direction || [offsetX ? Math.abs(offsetX) / offsetX : 0, offsetY ? Math.abs(offsetY) / offsetY : 0];
			this._prevScrollPos = nextScrollPos;
			this._lock = false;
			if (!offsetX && !offsetY) return false;
			/**
			* @event DragScroll#move
			*/
			this.emit("move", {
				offsetX: nextDirection[0] ? offsetX : 0,
				offsetY: nextDirection[1] ? offsetY : 0,
				inputEvent
			});
			if (throttleTime && isDrag) {
				clearTimeout(this._timer);
				this._timer = window.setTimeout(function() {
					_this._continueDrag(options);
				}, throttleTime);
			}
			return true;
		};
		/**
		*
		*/
		__proto.dragEnd = function() {
			this._flag = false;
			this._lock = false;
			clearTimeout(this._timer);
			this._unregisterScrollEvent();
		};
		__proto._getScrollPosition = function(direction, options) {
			var container = options.container, _a = options.getScrollPosition;
			return (_a === void 0 ? getDefaultScrollPosition$1 : _a)({
				container: getContainerElement(container),
				direction
			});
		};
		__proto._continueDrag = function(options) {
			var _this = this;
			var _a;
			var container = options.container, direction = options.direction, throttleTime = options.throttleTime, useScroll = options.useScroll, isDrag = options.isDrag, inputEvent = options.inputEvent;
			if (!this._flag || isDrag && this._isWait) return;
			var nowTime = now();
			var distTime = Math.max(throttleTime + this._prevTime - nowTime, 0);
			if (distTime > 0) {
				clearTimeout(this._timer);
				this._timer = window.setTimeout(function() {
					_this._continueDrag(options);
				}, distTime);
				return false;
			}
			this._prevTime = nowTime;
			var prevScrollPos = this._getScrollPosition(direction, options);
			this._prevScrollPos = prevScrollPos;
			if (isDrag) this._isWait = true;
			if (!useScroll) this._lock = true;
			var param = {
				container: getContainerElement(container),
				direction,
				inputEvent
			};
			(_a = options.requestScroll) === null || _a === void 0 || _a.call(options, param);
			/**
			* @event DragScroll#scroll
			*/
			this.emit("scroll", param);
			this._isWait = false;
			return useScroll || this.checkScroll(__assign$2(__assign$2({}, options), {
				prevScrollPos,
				direction,
				inputEvent
			}));
		};
		__proto._registerScrollEvent = function(options) {
			this._unregisterScrollEvent();
			var checkScrollEvent = options.checkScrollEvent;
			if (!checkScrollEvent) return;
			var callback = checkScrollEvent === true ? checkDefaultScrollEvent : checkScrollEvent;
			var container = getContainerElement(options.container);
			if (checkScrollEvent === true && (container === document.body || container === document.documentElement)) this._unregister = checkDefaultScrollEvent(window, this._onScroll);
			else this._unregister = callback(container, this._onScroll);
		};
		__proto._unregisterScrollEvent = function() {
			var _a;
			(_a = this._unregister) === null || _a === void 0 || _a.call(this);
			this._unregister = null;
		};
		return DragScroll;
	}(EventEmitter);
	//#endregion
	//#region ../../node_modules/.pnpm/overlap-area@1.1.0/node_modules/overlap-area/dist/overlap-area.esm.js
	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.
	
	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.
	
	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	function __spreadArrays() {
		for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
		for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
		return r;
	}
	function tinyThrottle(num) {
		return throttle(num, TINY_NUM);
	}
	function isSameConstants(linearConstants1, linearConstants2) {
		return linearConstants1.every(function(v, i) {
			return tinyThrottle(v - linearConstants2[i]) === 0;
		});
	}
	function isSamePoint(point1, point2) {
		return !tinyThrottle(point1[0] - point2[0]) && !tinyThrottle(point1[1] - point2[1]);
	}
	/**
	* @namespace OverlapArea
	*/
	/**
	* Gets the size of a shape (polygon) made of points.
	* @memberof OverlapArea
	*/
	function getAreaSize(points) {
		if (points.length < 3) return 0;
		return Math.abs(sum(points.map(function(point, i) {
			var nextPoint = points[i + 1] || points[0];
			return point[0] * nextPoint[1] - nextPoint[0] * point[1];
		}))) / 2;
	}
	/**
	* Get points that fit the rect,
	* @memberof OverlapArea
	*/
	function fitPoints(points, rect) {
		var width = rect.width, height = rect.height, left = rect.left, top = rect.top;
		var _a = getMinMaxs(points), minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
		var ratioX = width / (maxX - minX);
		var ratioY = height / (maxY - minY);
		return points.map(function(point) {
			return [left + (point[0] - minX) * ratioX, top + (point[1] - minY) * ratioY];
		});
	}
	/**
	* Get the minimum and maximum points of the points.
	* @memberof OverlapArea
	*/
	function getMinMaxs(points) {
		var xs = points.map(function(point) {
			return point[0];
		});
		var ys = points.map(function(point) {
			return point[1];
		});
		return {
			minX: Math.min.apply(Math, xs),
			minY: Math.min.apply(Math, ys),
			maxX: Math.max.apply(Math, xs),
			maxY: Math.max.apply(Math, ys)
		};
	}
	/**
	* Whether the point is in shape
	* @param - point pos
	* @param - shape points
	* @param - whether to check except line
	* @memberof OverlapArea
	*/
	function isInside(pos, points, excludeLine) {
		var x = pos[0], y = pos[1];
		var _a = getMinMaxs(points), minX = _a.minX, maxX = _a.maxX;
		var xLine = [[minX, y], [maxX, y]];
		var xLinearConstants = getLinearConstants(xLine[0], xLine[1]);
		var lines = convertLines(points);
		var intersectionPosInfos = [];
		lines.forEach(function(line) {
			var linearConstants = getLinearConstants(line[0], line[1]);
			var standardPoint = line[0];
			if (isSameConstants(xLinearConstants, linearConstants)) intersectionPosInfos.push({
				pos,
				line,
				type: "line"
			});
			else getPointsOnLines(getIntersectionPointsByConstants(xLinearConstants, linearConstants), [xLine, line]).forEach(function(point) {
				if (line.some(function(linePoint) {
					return isSamePoint(linePoint, point);
				})) intersectionPosInfos.push({
					pos: point,
					line,
					type: "point"
				});
				else if (tinyThrottle(standardPoint[1] - y) !== 0) intersectionPosInfos.push({
					pos: point,
					line,
					type: "intersection"
				});
			});
		});
		if (!excludeLine) {
			if (find$1(intersectionPosInfos, function(p) {
				return p[0] === x;
			})) return true;
		}
		var intersectionCount = 0;
		var xMap = {};
		intersectionPosInfos.forEach(function(_a) {
			var pos = _a.pos, type = _a.type, line = _a.line;
			if (pos[0] > x) return;
			if (type === "intersection") ++intersectionCount;
			else if (type === "line") return;
			else if (type === "point") {
				var point = find$1(line, function(linePoint) {
					return linePoint[1] !== y;
				});
				var prevValue = xMap[pos[0]];
				var nextValue = point[1] > y ? 1 : -1;
				if (!prevValue) xMap[pos[0]] = nextValue;
				else if (prevValue !== nextValue) ++intersectionCount;
			}
		});
		return intersectionCount % 2 === 1;
	}
	/**
	* Get the coefficient of the linear function. [a, b, c] (ax + by + c = 0)
	* @return [a, b, c]
	* @memberof OverlapArea
	*/
	function getLinearConstants(point1, point2) {
		var x1 = point1[0], y1 = point1[1];
		var x2 = point2[0], y2 = point2[1];
		var dx = x2 - x1;
		var dy = y2 - y1;
		if (Math.abs(dx) < 1e-7) dx = 0;
		if (Math.abs(dy) < 1e-7) dy = 0;
		var a = 0;
		var b = 0;
		var c = 0;
		if (!dx) {
			if (dy) {
				a = -1;
				c = x1;
			}
		} else if (!dy) {
			b = 1;
			c = -y1;
		} else {
			a = -dy / dx;
			b = 1;
			c = -a * x1 - y1;
		}
		return [
			a,
			b,
			c
		];
	}
	/**
	* Get intersection points with linear functions.
	* @memberof OverlapArea
	*/
	function getIntersectionPointsByConstants(linearConstants1, linearConstants2) {
		var a1 = linearConstants1[0], b1 = linearConstants1[1], c1 = linearConstants1[2];
		var a2 = linearConstants2[0], b2 = linearConstants2[1], c2 = linearConstants2[2];
		var isZeroA = a1 === 0 && a2 === 0;
		var isZeroB = b1 === 0 && b2 === 0;
		var results = [];
		if (isZeroA && isZeroB) return [];
		else if (isZeroA) {
			var y1 = -c1 / b1;
			if (y1 !== -c2 / b2) return [];
			else return [[-Infinity, y1], [Infinity, y1]];
		} else if (isZeroB) {
			var x1 = -c1 / a1;
			if (x1 !== -c2 / a2) return [];
			else return [[x1, -Infinity], [x1, Infinity]];
		} else if (a1 === 0) {
			var y = -c1 / b1;
			var x = -(b2 * y + c2) / a2;
			results = [[x, y]];
		} else if (a2 === 0) {
			var y = -c2 / b2;
			var x = -(b1 * y + c1) / a1;
			results = [[x, y]];
		} else if (b1 === 0) {
			var x = -c1 / a1;
			var y = -(a2 * x + c2) / b2;
			results = [[x, y]];
		} else if (b2 === 0) {
			var x = -c2 / a2;
			var y = -(a1 * x + c1) / b1;
			results = [[x, y]];
		} else {
			var x = (b1 * c2 - b2 * c1) / (b2 * a1 - b1 * a2);
			var y = -(a1 * x + c1) / b1;
			results = [[x, y]];
		}
		return results.map(function(result) {
			return [result[0], result[1]];
		});
	}
	/**
	* Get the points on the lines (between two points).
	* @memberof OverlapArea
	*/
	function getPointsOnLines(points, lines) {
		var minMaxs = lines.map(function(line) {
			return [0, 1].map(function(order) {
				return [Math.min(line[0][order], line[1][order]), Math.max(line[0][order], line[1][order])];
			});
		});
		var results = [];
		if (points.length === 2) {
			var _a = points[0], x = _a[0], y = _a[1];
			if (!tinyThrottle(x - points[1][0])) {
				var top = Math.max.apply(Math, minMaxs.map(function(minMax) {
					return minMax[1][0];
				}));
				var bottom = Math.min.apply(Math, minMaxs.map(function(minMax) {
					return minMax[1][1];
				}));
				if (tinyThrottle(top - bottom) > 0) return [];
				results = [[x, top], [x, bottom]];
			} else if (!tinyThrottle(y - points[1][1])) {
				var left = Math.max.apply(Math, minMaxs.map(function(minMax) {
					return minMax[0][0];
				}));
				var right = Math.min.apply(Math, minMaxs.map(function(minMax) {
					return minMax[0][1];
				}));
				if (tinyThrottle(left - right) > 0) return [];
				results = [[left, y], [right, y]];
			}
		}
		if (!results.length) results = points.filter(function(point) {
			var pointX = point[0], pointY = point[1];
			return minMaxs.every(function(minMax) {
				return 0 <= tinyThrottle(pointX - minMax[0][0]) && 0 <= tinyThrottle(minMax[0][1] - pointX) && 0 <= tinyThrottle(pointY - minMax[1][0]) && 0 <= tinyThrottle(minMax[1][1] - pointY);
			});
		});
		return results.map(function(result) {
			return [tinyThrottle(result[0]), tinyThrottle(result[1])];
		});
	}
	/**
	* Convert two points into lines.
	* @function
	* @memberof OverlapArea
	*/
	function convertLines(points) {
		return __spreadArrays(points.slice(1), [points[0]]).map(function(point, i) {
			return [points[i], point];
		});
	}
	function getOverlapPointInfos(points1, points2) {
		var targetPoints1 = points1.slice();
		var targetPoints2 = points2.slice();
		if (getShapeDirection(targetPoints1) === -1) targetPoints1.reverse();
		if (getShapeDirection(targetPoints2) === -1) targetPoints2.reverse();
		var lines1 = convertLines(targetPoints1);
		var lines2 = convertLines(targetPoints2);
		var linearConstantsList1 = lines1.map(function(line1) {
			return getLinearConstants(line1[0], line1[1]);
		});
		var linearConstantsList2 = lines2.map(function(line2) {
			return getLinearConstants(line2[0], line2[1]);
		});
		var overlapInfos = [];
		linearConstantsList1.forEach(function(linearConstants1, i) {
			var line1 = lines1[i];
			var linePointInfos = [];
			linearConstantsList2.forEach(function(linearConstants2, j) {
				var points = getPointsOnLines(getIntersectionPointsByConstants(linearConstants1, linearConstants2), [line1, lines2[j]]);
				linePointInfos.push.apply(linePointInfos, points.map(function(pos) {
					return {
						index1: i,
						index2: j,
						pos,
						type: "intersection"
					};
				}));
			});
			linePointInfos.sort(function(a, b) {
				return getDist$2(line1[0], a.pos) - getDist$2(line1[0], b.pos);
			});
			overlapInfos.push.apply(overlapInfos, linePointInfos);
			if (isInside(line1[1], targetPoints2)) overlapInfos.push({
				index1: i,
				index2: -1,
				pos: line1[1],
				type: "inside"
			});
		});
		lines2.forEach(function(line2, i) {
			if (!isInside(line2[1], targetPoints1)) return;
			var isNext = false;
			var index = findIndex(overlapInfos, function(_a) {
				if (_a.index2 === i) {
					isNext = true;
					return false;
				}
				if (isNext) return true;
				return false;
			});
			if (index === -1) {
				isNext = false;
				index = findIndex(overlapInfos, function(_a) {
					var index1 = _a.index1, index2 = _a.index2;
					if (index1 === -1 && index2 + 1 === i) {
						isNext = true;
						return false;
					}
					if (isNext) return true;
					return false;
				});
			}
			if (index === -1) overlapInfos.push({
				index1: -1,
				index2: i,
				pos: line2[1],
				type: "inside"
			});
			else overlapInfos.splice(index, 0, {
				index1: -1,
				index2: i,
				pos: line2[1],
				type: "inside"
			});
		});
		var pointMap = {};
		return overlapInfos.filter(function(_a) {
			var pos = _a.pos;
			var key = pos[0] + "x" + pos[1];
			if (pointMap[key]) return false;
			pointMap[key] = true;
			return true;
		});
	}
	/**
	* Get the points of the overlapped part of two shapes.
	* @function
	* @memberof OverlapArea
	*/
	function getOverlapPoints(points1, points2) {
		return getOverlapPointInfos(points1, points2).map(function(_a) {
			return _a.pos;
		});
	}
	/**
	* Gets the size of the overlapped part of two shapes.
	* @function
	* @memberof OverlapArea
	*/
	function getOverlapSize(points1, points2) {
		return getAreaSize(getOverlapPoints(points1, points2));
	}
	//#endregion
	//#region ../../node_modules/.pnpm/gesto@1.19.4/node_modules/gesto/dist/gesto.esm.js
	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.
	
	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.
	
	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	var extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	function __extends(d, b) {
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}
	var __assign$1 = function() {
		__assign$1 = Object.assign || function __assign(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign$1.apply(this, arguments);
	};
	function getRad(pos1, pos2) {
		var distX = pos2[0] - pos1[0];
		var distY = pos2[1] - pos1[1];
		var rad = Math.atan2(distY, distX);
		return rad >= 0 ? rad : rad + Math.PI * 2;
	}
	function getRotatiion(touches) {
		return getRad([touches[0].clientX, touches[0].clientY], [touches[1].clientX, touches[1].clientY]) / Math.PI * 180;
	}
	function isMultiTouch(e) {
		return e.touches && e.touches.length >= 2;
	}
	function getEventClients(e) {
		if (!e) return [];
		if (e.touches) return getClients(e.touches);
		else return [getClient(e)];
	}
	function isMouseEvent(e) {
		return e && (e.type.indexOf("mouse") > -1 || "button" in e);
	}
	function getPosition(clients, prevClients, startClients) {
		var length = startClients.length;
		var _a = getAverageClient(clients, length), clientX = _a.clientX, clientY = _a.clientY, originalClientX = _a.originalClientX, originalClientY = _a.originalClientY;
		var _b = getAverageClient(prevClients, length), prevX = _b.clientX, prevY = _b.clientY;
		var _c = getAverageClient(startClients, length), startX = _c.clientX, startY = _c.clientY;
		return {
			clientX: originalClientX,
			clientY: originalClientY,
			deltaX: clientX - prevX,
			deltaY: clientY - prevY,
			distX: clientX - startX,
			distY: clientY - startY
		};
	}
	function getDist(clients) {
		return Math.sqrt(Math.pow(clients[0].clientX - clients[1].clientX, 2) + Math.pow(clients[0].clientY - clients[1].clientY, 2));
	}
	function getClients(touches) {
		var length = Math.min(touches.length, 2);
		var clients = [];
		for (var i = 0; i < length; ++i) clients.push(getClient(touches[i]));
		return clients;
	}
	function getClient(e) {
		return {
			clientX: e.clientX,
			clientY: e.clientY
		};
	}
	function getAverageClient(clients, length) {
		if (length === void 0) length = clients.length;
		var sumClient = {
			clientX: 0,
			clientY: 0,
			originalClientX: 0,
			originalClientY: 0
		};
		var minLength = Math.min(clients.length, length);
		for (var i = 0; i < minLength; ++i) {
			var client = clients[i];
			sumClient.originalClientX += "originalClientX" in client ? client.originalClientX : client.clientX;
			sumClient.originalClientY += "originalClientY" in client ? client.originalClientY : client.clientY;
			sumClient.clientX += client.clientX;
			sumClient.clientY += client.clientY;
		}
		if (!length) return sumClient;
		return {
			clientX: sumClient.clientX / length,
			clientY: sumClient.clientY / length,
			originalClientX: sumClient.originalClientX / length,
			originalClientY: sumClient.originalClientY / length
		};
	}
	var ClientStore = /* @__PURE__ */ function() {
		function ClientStore(clients) {
			this.prevClients = [];
			this.startClients = [];
			this.movement = 0;
			this.length = 0;
			this.startClients = clients;
			this.prevClients = clients;
			this.length = clients.length;
		}
		ClientStore.prototype.getAngle = function(clients) {
			if (clients === void 0) clients = this.prevClients;
			return getRotatiion(clients);
		};
		ClientStore.prototype.getRotation = function(clients) {
			if (clients === void 0) clients = this.prevClients;
			return getRotatiion(clients) - getRotatiion(this.startClients);
		};
		ClientStore.prototype.getPosition = function(clients, isAdd) {
			if (clients === void 0) clients = this.prevClients;
			var position = getPosition(clients || this.prevClients, this.prevClients, this.startClients);
			var deltaX = position.deltaX, deltaY = position.deltaY;
			this.movement += Math.sqrt(deltaX * deltaX + deltaY * deltaY);
			this.prevClients = clients;
			return position;
		};
		ClientStore.prototype.getPositions = function(clients) {
			if (clients === void 0) clients = this.prevClients;
			var prevClients = this.prevClients;
			var startClients = this.startClients;
			var minLength = Math.min(this.length, prevClients.length);
			var positions = [];
			for (var i = 0; i < minLength; ++i) positions[i] = getPosition([clients[i]], [prevClients[i]], [startClients[i]]);
			return positions;
		};
		ClientStore.prototype.getMovement = function(clients) {
			var movement = this.movement;
			if (!clients) return movement;
			var currentClient = getAverageClient(clients, this.length);
			var prevClient = getAverageClient(this.prevClients, this.length);
			var deltaX = currentClient.clientX - prevClient.clientX;
			var deltaY = currentClient.clientY - prevClient.clientY;
			return Math.sqrt(deltaX * deltaX + deltaY * deltaY) + movement;
		};
		ClientStore.prototype.getDistance = function(clients) {
			if (clients === void 0) clients = this.prevClients;
			return getDist(clients);
		};
		ClientStore.prototype.getScale = function(clients) {
			if (clients === void 0) clients = this.prevClients;
			return getDist(clients) / getDist(this.startClients);
		};
		ClientStore.prototype.move = function(deltaX, deltaY) {
			this.startClients.forEach(function(client) {
				client.clientX -= deltaX;
				client.clientY -= deltaY;
			});
			this.prevClients.forEach(function(client) {
				client.clientX -= deltaX;
				client.clientY -= deltaY;
			});
		};
		return ClientStore;
	}();
	var INPUT_TAGNAMES = ["textarea", "input"];
	/**
	* You can set up drag, pinch events in any browser.
	*/
	var Gesto = /* @__PURE__ */ function(_super) {
		__extends(Gesto, _super);
		/**
		*
		*/
		function Gesto(targets, options) {
			if (options === void 0) options = {};
			var _this = _super.call(this) || this;
			_this.options = {};
			_this.flag = false;
			_this.pinchFlag = false;
			_this.data = {};
			_this.isDrag = false;
			_this.isPinch = false;
			_this.clientStores = [];
			_this.targets = [];
			_this.prevTime = 0;
			_this.doubleFlag = false;
			_this._useMouse = false;
			_this._useTouch = false;
			_this._useDrag = false;
			_this._dragFlag = false;
			_this._isTrusted = false;
			_this._isMouseEvent = false;
			_this._isSecondaryButton = false;
			_this._preventMouseEvent = false;
			_this._prevInputEvent = null;
			_this._isDragAPI = false;
			_this._isIdle = true;
			_this._preventMouseEventId = 0;
			_this._window = window;
			_this.onDragStart = function(e, isTrusted) {
				if (isTrusted === void 0) isTrusted = true;
				if (!_this.flag && e.cancelable === false) return;
				var isDragAPI = e.type.indexOf("drag") >= -1;
				if (_this.flag && isDragAPI) return;
				_this._isDragAPI = true;
				var _a = _this.options, container = _a.container, pinchOutside = _a.pinchOutside, preventWheelClick = _a.preventWheelClick, preventRightClick = _a.preventRightClick, preventDefault = _a.preventDefault, checkInput = _a.checkInput, dragFocusedInput = _a.dragFocusedInput, preventClickEventOnDragStart = _a.preventClickEventOnDragStart, preventClickEventOnDrag = _a.preventClickEventOnDrag, preventClickEventByCondition = _a.preventClickEventByCondition;
				var useTouch = _this._useTouch;
				var isDragStart = !_this.flag;
				_this._isSecondaryButton = e.which === 3 || e.button === 2;
				if (preventWheelClick && (e.which === 2 || e.button === 1) || preventRightClick && (e.which === 3 || e.button === 2)) {
					_this.stop();
					return false;
				}
				if (isDragStart) {
					var activeElement = _this._window.document.activeElement;
					var target = e.target;
					if (target) {
						var tagName = target.tagName.toLowerCase();
						var hasInput = INPUT_TAGNAMES.indexOf(tagName) > -1;
						var hasContentEditable = target.isContentEditable;
						if (hasInput || hasContentEditable) {
							if (checkInput || !dragFocusedInput && activeElement === target) return false;
							if (activeElement && (activeElement === target || hasContentEditable && activeElement.isContentEditable && activeElement.contains(target))) {
								if (dragFocusedInput) target.blur();
								else return false;
							}
						} else if ((preventDefault || e.type === "touchstart") && activeElement) {
							var activeTagName = activeElement.tagName.toLowerCase();
							if (activeElement.isContentEditable || INPUT_TAGNAMES.indexOf(activeTagName) > -1) activeElement.blur();
						}
						if (preventClickEventOnDragStart || preventClickEventOnDrag || preventClickEventByCondition) addEvent(_this._window, "click", _this._onClick, true);
					}
					_this.clientStores = [new ClientStore(getEventClients(e))];
					_this._isIdle = false;
					_this.flag = true;
					_this.isDrag = false;
					_this._isTrusted = isTrusted;
					_this._dragFlag = true;
					_this._prevInputEvent = e;
					_this.data = {};
					_this.doubleFlag = now() - _this.prevTime < 200;
					_this._isMouseEvent = isMouseEvent(e);
					if (!_this._isMouseEvent && _this._preventMouseEvent) _this._allowMouseEvent();
					if ((_this._preventMouseEvent || _this.emit("dragStart", __assign$1(__assign$1({
						data: _this.data,
						datas: _this.data,
						inputEvent: e,
						isMouseEvent: _this._isMouseEvent,
						isSecondaryButton: _this._isSecondaryButton,
						isTrusted,
						isDouble: _this.doubleFlag
					}, _this.getCurrentStore().getPosition()), {
						preventDefault: function() {
							e.preventDefault();
						},
						preventDrag: function() {
							_this._dragFlag = false;
						}
					}))) === false) _this.stop();
					if (_this._isMouseEvent && _this.flag && preventDefault) e.preventDefault();
				}
				if (!_this.flag) return false;
				var timer = 0;
				if (isDragStart) {
					_this._attchDragEvent();
					if (useTouch && pinchOutside) timer = setTimeout(function() {
						addEvent(container, "touchstart", _this.onDragStart, { passive: false });
					});
				} else if (useTouch && pinchOutside) removeEvent(container, "touchstart", _this.onDragStart);
				if (_this.flag && isMultiTouch(e)) {
					clearTimeout(timer);
					if (isDragStart && e.touches.length !== e.changedTouches.length) return;
					if (!_this.pinchFlag) _this.onPinchStart(e);
				}
			};
			_this.onDrag = function(e, isScroll) {
				if (!_this.flag) return;
				var preventDefault = _this.options.preventDefault;
				if (!_this._isMouseEvent && preventDefault) e.preventDefault();
				_this._prevInputEvent = e;
				var clients = getEventClients(e);
				var result = _this.moveClients(clients, e, false);
				if (_this._dragFlag) {
					if (_this.pinchFlag || result.deltaX || result.deltaY) {
						if ((_this._preventMouseEvent || _this.emit("drag", __assign$1(__assign$1({}, result), {
							isScroll: !!isScroll,
							inputEvent: e
						}))) === false) {
							_this.stop();
							return;
						}
					}
					if (_this.pinchFlag) _this.onPinch(e, clients);
				}
				_this.getCurrentStore().getPosition(clients, true);
			};
			_this.onDragEnd = function(e) {
				if (!_this.flag) return;
				var _a = _this.options, pinchOutside = _a.pinchOutside, container = _a.container, preventClickEventOnDrag = _a.preventClickEventOnDrag, preventClickEventOnDragStart = _a.preventClickEventOnDragStart, preventClickEventByCondition = _a.preventClickEventByCondition;
				var isDrag = _this.isDrag;
				if (preventClickEventOnDrag || preventClickEventOnDragStart || preventClickEventByCondition) requestAnimationFrame(function() {
					_this._allowClickEvent();
				});
				if (!preventClickEventByCondition && !preventClickEventOnDragStart && preventClickEventOnDrag && !isDrag) _this._allowClickEvent();
				if (_this._useTouch && pinchOutside) removeEvent(container, "touchstart", _this.onDragStart);
				if (_this.pinchFlag) _this.onPinchEnd(e);
				var clients = (e === null || e === void 0 ? void 0 : e.touches) ? getEventClients(e) : [];
				if (clients.length === 0 || !_this.options.keepDragging) _this.flag = false;
				else _this._addStore(new ClientStore(clients));
				var position = _this._getPosition();
				var currentTime = now();
				var isDouble = !isDrag && _this.doubleFlag;
				_this._prevInputEvent = null;
				_this.prevTime = isDrag || isDouble ? 0 : currentTime;
				if (!_this.flag) {
					_this._dettachDragEvent();
					_this._preventMouseEvent || _this.emit("dragEnd", __assign$1({
						data: _this.data,
						datas: _this.data,
						isDouble,
						isDrag,
						isClick: !isDrag,
						isMouseEvent: _this._isMouseEvent,
						isSecondaryButton: _this._isSecondaryButton,
						inputEvent: e,
						isTrusted: _this._isTrusted
					}, position));
					_this.clientStores = [];
					if (!_this._isMouseEvent) {
						_this._preventMouseEvent = true;
						clearTimeout(_this._preventMouseEventId);
						_this._preventMouseEventId = setTimeout(function() {
							_this._preventMouseEvent = false;
						}, 200);
					}
					_this._isIdle = true;
				}
			};
			_this.onBlur = function() {
				_this.onDragEnd();
			};
			_this._allowClickEvent = function() {
				removeEvent(_this._window, "click", _this._onClick, true);
			};
			_this._onClick = function(e) {
				_this._allowClickEvent();
				_this._allowMouseEvent();
				var preventClickEventByCondition = _this.options.preventClickEventByCondition;
				if (preventClickEventByCondition === null || preventClickEventByCondition === void 0 ? void 0 : preventClickEventByCondition(e)) return;
				e.stopPropagation();
				e.preventDefault();
			};
			_this._onContextMenu = function(e) {
				if (!_this.options.preventRightClick) e.preventDefault();
				else _this.onDragEnd(e);
			};
			_this._passCallback = function() {};
			var elements = [].concat(targets);
			var firstTarget = elements[0];
			_this._window = isWindow(firstTarget) ? firstTarget : getWindow(firstTarget);
			_this.options = __assign$1({
				checkInput: false,
				container: firstTarget && !("document" in firstTarget) ? getWindow(firstTarget) : firstTarget,
				preventRightClick: true,
				preventWheelClick: true,
				preventClickEventOnDragStart: false,
				preventClickEventOnDrag: false,
				preventClickEventByCondition: null,
				preventDefault: true,
				checkWindowBlur: false,
				keepDragging: false,
				pinchThreshold: 0,
				events: ["touch", "mouse"]
			}, options);
			var _a = _this.options, container = _a.container, events = _a.events, checkWindowBlur = _a.checkWindowBlur;
			_this._useDrag = events.indexOf("drag") > -1;
			_this._useTouch = events.indexOf("touch") > -1;
			_this._useMouse = events.indexOf("mouse") > -1;
			_this.targets = elements;
			if (_this._useDrag) elements.forEach(function(el) {
				addEvent(el, "dragstart", _this.onDragStart);
			});
			if (_this._useMouse) {
				elements.forEach(function(el) {
					addEvent(el, "mousedown", _this.onDragStart);
					addEvent(el, "mousemove", _this._passCallback);
				});
				addEvent(container, "contextmenu", _this._onContextMenu);
			}
			if (checkWindowBlur) addEvent(getWindow(), "blur", _this.onBlur);
			if (_this._useTouch) {
				var passive_1 = { passive: false };
				elements.forEach(function(el) {
					addEvent(el, "touchstart", _this.onDragStart, passive_1);
					addEvent(el, "touchmove", _this._passCallback, passive_1);
				});
			}
			return _this;
		}
		/**
		* Stop Gesto's drag events.
		*/
		Gesto.prototype.stop = function() {
			this.isDrag = false;
			this.data = {};
			this.clientStores = [];
			this.pinchFlag = false;
			this.doubleFlag = false;
			this.prevTime = 0;
			this.flag = false;
			this._isIdle = true;
			this._allowClickEvent();
			this._dettachDragEvent();
			this._isDragAPI = false;
		};
		/**
		* The total moved distance
		*/
		Gesto.prototype.getMovement = function(clients) {
			return this.getCurrentStore().getMovement(clients) + this.clientStores.slice(1).reduce(function(prev, cur) {
				return prev + cur.movement;
			}, 0);
		};
		/**
		* Whether to drag
		*/
		Gesto.prototype.isDragging = function() {
			return this.isDrag;
		};
		/**
		* Whether the operation of gesto is finished and is in idle state
		*/
		Gesto.prototype.isIdle = function() {
			return this._isIdle;
		};
		/**
		* Whether to start drag
		*/
		Gesto.prototype.isFlag = function() {
			return this.flag;
		};
		/**
		* Whether to start pinch
		*/
		Gesto.prototype.isPinchFlag = function() {
			return this.pinchFlag;
		};
		/**
		* Whether to start double click
		*/
		Gesto.prototype.isDoubleFlag = function() {
			return this.doubleFlag;
		};
		/**
		* Whether to pinch
		*/
		Gesto.prototype.isPinching = function() {
			return this.isPinch;
		};
		/**
		* If a scroll event occurs, it is corrected by the scroll distance.
		*/
		Gesto.prototype.scrollBy = function(deltaX, deltaY, e, isCallDrag) {
			if (isCallDrag === void 0) isCallDrag = true;
			if (!this.flag) return;
			this.clientStores[0].move(deltaX, deltaY);
			isCallDrag && this.onDrag(e, true);
		};
		/**
		* Create a virtual drag event.
		*/
		Gesto.prototype.move = function(_a, inputEvent) {
			var deltaX = _a[0], deltaY = _a[1];
			var nextClients = this.getCurrentStore().prevClients;
			return this.moveClients(nextClients.map(function(_a) {
				var clientX = _a.clientX, clientY = _a.clientY;
				return {
					clientX: clientX + deltaX,
					clientY: clientY + deltaY,
					originalClientX: clientX,
					originalClientY: clientY
				};
			}), inputEvent, true);
		};
		/**
		* The dragStart event is triggered by an external event.
		*/
		Gesto.prototype.triggerDragStart = function(e) {
			this.onDragStart(e, false);
		};
		/**
		* Set the event data while dragging.
		*/
		Gesto.prototype.setEventData = function(data) {
			var currentData = this.data;
			for (var name_1 in data) currentData[name_1] = data[name_1];
			return this;
		};
		/**
		* Set the event data while dragging.
		* Use `setEventData`
		* @deprecated
		*/
		Gesto.prototype.setEventDatas = function(data) {
			return this.setEventData(data);
		};
		/**
		* Get the current event state while dragging.
		*/
		Gesto.prototype.getCurrentEvent = function(inputEvent) {
			if (inputEvent === void 0) inputEvent = this._prevInputEvent;
			return __assign$1(__assign$1({
				data: this.data,
				datas: this.data
			}, this._getPosition()), {
				movement: this.getMovement(),
				isDrag: this.isDrag,
				isPinch: this.isPinch,
				isScroll: false,
				inputEvent
			});
		};
		/**
		* Get & Set the event data while dragging.
		*/
		Gesto.prototype.getEventData = function() {
			return this.data;
		};
		/**
		* Get & Set the event data while dragging.
		* Use getEventData method
		* @depreacated
		*/
		Gesto.prototype.getEventDatas = function() {
			return this.data;
		};
		/**
		* Unset Gesto
		*/
		Gesto.prototype.unset = function() {
			var _this = this;
			var targets = this.targets;
			var container = this.options.container;
			this.off();
			removeEvent(this._window, "blur", this.onBlur);
			if (this._useDrag) targets.forEach(function(el) {
				removeEvent(el, "dragstart", _this.onDragStart);
			});
			if (this._useMouse) {
				targets.forEach(function(target) {
					removeEvent(target, "mousedown", _this.onDragStart);
				});
				removeEvent(container, "contextmenu", this._onContextMenu);
			}
			if (this._useTouch) {
				targets.forEach(function(target) {
					removeEvent(target, "touchstart", _this.onDragStart);
				});
				removeEvent(container, "touchstart", this.onDragStart);
			}
			this._prevInputEvent = null;
			this._allowClickEvent();
			this._dettachDragEvent();
		};
		Gesto.prototype.onPinchStart = function(e) {
			var _this = this;
			var pinchThreshold = this.options.pinchThreshold;
			if (this.isDrag && this.getMovement() > pinchThreshold) return;
			var store = new ClientStore(getEventClients(e));
			this.pinchFlag = true;
			this._addStore(store);
			if (this.emit("pinchStart", __assign$1(__assign$1({
				data: this.data,
				datas: this.data,
				angle: store.getAngle(),
				touches: this.getCurrentStore().getPositions()
			}, store.getPosition()), {
				inputEvent: e,
				isTrusted: this._isTrusted,
				preventDefault: function() {
					e.preventDefault();
				},
				preventDrag: function() {
					_this._dragFlag = false;
				}
			})) === false) this.pinchFlag = false;
		};
		Gesto.prototype.onPinch = function(e, clients) {
			if (!this.flag || !this.pinchFlag || clients.length < 2) return;
			var store = this.getCurrentStore();
			this.isPinch = true;
			this.emit("pinch", __assign$1(__assign$1({
				data: this.data,
				datas: this.data,
				movement: this.getMovement(clients),
				angle: store.getAngle(clients),
				rotation: store.getRotation(clients),
				touches: store.getPositions(clients),
				scale: store.getScale(clients),
				distance: store.getDistance(clients)
			}, store.getPosition(clients)), {
				inputEvent: e,
				isTrusted: this._isTrusted
			}));
		};
		Gesto.prototype.onPinchEnd = function(e) {
			if (!this.pinchFlag) return;
			var isPinch = this.isPinch;
			this.isPinch = false;
			this.pinchFlag = false;
			var store = this.getCurrentStore();
			this.emit("pinchEnd", __assign$1(__assign$1({
				data: this.data,
				datas: this.data,
				isPinch,
				touches: store.getPositions()
			}, store.getPosition()), { inputEvent: e }));
		};
		Gesto.prototype.getCurrentStore = function() {
			return this.clientStores[0];
		};
		Gesto.prototype.moveClients = function(clients, inputEvent, isAdd) {
			var position = this._getPosition(clients, isAdd);
			var isPrevDrag = this.isDrag;
			if (position.deltaX || position.deltaY) this.isDrag = true;
			var isFirstDrag = false;
			if (!isPrevDrag && this.isDrag) isFirstDrag = true;
			return __assign$1(__assign$1({
				data: this.data,
				datas: this.data
			}, position), {
				movement: this.getMovement(clients),
				isDrag: this.isDrag,
				isPinch: this.isPinch,
				isScroll: false,
				isMouseEvent: this._isMouseEvent,
				isSecondaryButton: this._isSecondaryButton,
				inputEvent,
				isTrusted: this._isTrusted,
				isFirstDrag
			});
		};
		Gesto.prototype._addStore = function(store) {
			this.clientStores.splice(0, 0, store);
		};
		Gesto.prototype._getPosition = function(clients, isAdd) {
			var position = this.getCurrentStore().getPosition(clients, isAdd);
			var _a = this.clientStores.slice(1).reduce(function(prev, cur) {
				var storePosition = cur.getPosition();
				prev.distX += storePosition.distX;
				prev.distY += storePosition.distY;
				return prev;
			}, position), distX = _a.distX, distY = _a.distY;
			return __assign$1(__assign$1({}, position), {
				distX,
				distY
			});
		};
		Gesto.prototype._attchDragEvent = function() {
			var win = this._window;
			var container = this.options.container;
			var passive = { passive: false };
			if (this._isDragAPI) {
				addEvent(container, "dragover", this.onDrag, passive);
				addEvent(win, "dragend", this.onDragEnd);
			}
			if (this._useMouse) {
				addEvent(container, "mousemove", this.onDrag);
				addEvent(win, "mouseup", this.onDragEnd);
			}
			if (this._useTouch) {
				addEvent(container, "touchmove", this.onDrag, passive);
				addEvent(win, "touchend", this.onDragEnd, passive);
				addEvent(win, "touchcancel", this.onDragEnd, passive);
			}
		};
		Gesto.prototype._dettachDragEvent = function() {
			var win = this._window;
			var container = this.options.container;
			if (this._isDragAPI) {
				removeEvent(container, "dragover", this.onDrag);
				removeEvent(win, "dragend", this.onDragEnd);
			}
			if (this._useMouse) {
				removeEvent(container, "mousemove", this.onDrag);
				removeEvent(win, "mouseup", this.onDragEnd);
			}
			if (this._useTouch) {
				removeEvent(container, "touchstart", this.onDragStart);
				removeEvent(container, "touchmove", this.onDrag);
				removeEvent(win, "touchend", this.onDragEnd);
				removeEvent(win, "touchcancel", this.onDragEnd);
			}
		};
		Gesto.prototype._allowMouseEvent = function() {
			this._preventMouseEvent = false;
			clearTimeout(this._preventMouseEventId);
		};
		return Gesto;
	}(EventEmitter);
	//#endregion
	//#region ../../node_modules/.pnpm/css-styled@1.0.8/node_modules/css-styled/dist/styled.esm.js
	function hash(str) {
		var hash = 5381, i = str.length;
		while (i) hash = hash * 33 ^ str.charCodeAt(--i);
		return hash >>> 0;
	}
	var stringHash = hash;
	function getHash(str) {
		return stringHash(str).toString(36);
	}
	function getShadowRoot$1(parentElement) {
		if (parentElement && parentElement.getRootNode) {
			var rootNode = parentElement.getRootNode();
			if (rootNode.nodeType === 11) return rootNode;
		}
	}
	function replaceStyle(className, css, options) {
		if (options.original) return css;
		return css.replace(/([^};{\s}][^};{]*|^\s*){/gm, function(_, selector) {
			var trimmedSelector = selector.trim();
			return (trimmedSelector ? splitComma(trimmedSelector) : [""]).map(function(subSelector) {
				var trimmedSubSelector = subSelector.trim();
				if (trimmedSubSelector.indexOf("@") === 0) return trimmedSubSelector;
				else if (trimmedSubSelector.indexOf(":global") > -1) return trimmedSubSelector.replace(/\:global/g, "");
				else if (trimmedSubSelector.indexOf(":host") > -1) return "".concat(trimmedSubSelector.replace(/\:host/g, ".".concat(className)));
				else if (trimmedSubSelector) return ".".concat(className, " ").concat(trimmedSubSelector);
				else return ".".concat(className);
			}).join(", ") + " {";
		});
	}
	function injectStyle(className, css, options, el, shadowRoot) {
		var doc = getDocument(el);
		var style = doc.createElement("style");
		style.setAttribute("type", "text/css");
		style.setAttribute("data-styled-id", className);
		style.setAttribute("data-styled-count", "1");
		if (options.nonce) style.setAttribute("nonce", options.nonce);
		style.innerHTML = replaceStyle(className, css, options);
		(shadowRoot || doc.head || doc.body).appendChild(style);
		return style;
	}
	/**
	* Create an styled object that can be defined and inserted into the css.
	* @param - css styles
	*/
	function styled$1(css) {
		var injectClassName = "rCS" + getHash(css);
		return {
			className: injectClassName,
			inject: function(el, options) {
				if (options === void 0) options = {};
				var shadowRoot = getShadowRoot$1(el);
				var styleElement = (shadowRoot || el.ownerDocument || document).querySelector("style[data-styled-id=\"".concat(injectClassName, "\"]"));
				if (!styleElement) styleElement = injectStyle(injectClassName, css, options, el, shadowRoot);
				else {
					var count = parseFloat(styleElement.getAttribute("data-styled-count")) || 0;
					styleElement.setAttribute("data-styled-count", "".concat(count + 1));
				}
				return { destroy: function() {
					var _a;
					var injectCount = parseFloat(styleElement.getAttribute("data-styled-count")) || 0;
					if (injectCount <= 1) {
						if (styleElement.remove) styleElement.remove();
						else (_a = styleElement.parentNode) === null || _a === void 0 || _a.removeChild(styleElement);
						styleElement = null;
					} else styleElement.setAttribute("data-styled-count", "".concat(injectCount - 1));
				} };
			}
		};
	}
	//#endregion
	//#region ../../node_modules/.pnpm/react-css-styled@1.1.9/node_modules/react-css-styled/dist/styled.esm.js
	var __assign = function() {
		__assign = Object.assign || function __assign(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign.apply(this, arguments);
	};
	function __rest(s, e) {
		var t = {};
		for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
		if (s != null && typeof Object.getOwnPropertySymbols === "function") {
			for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
		}
		return t;
	}
	function styled(Tag, css) {
		var injector = styled$1(css);
		var cssId = injector.className;
		return forwardRef(function(props, ref) {
			var _a = props.className, className = _a === void 0 ? "" : _a;
			props.cspNonce;
			var attributes = __rest(props, ["className", "cspNonce"]);
			var targetRef = useRef();
			useImperativeHandle(ref, function() {
				return targetRef.current;
			}, []);
			useEffect(function() {
				var injectResult = injector.inject(targetRef.current, { nonce: props.cspNonce });
				return function() {
					injectResult.destroy();
				};
			}, []);
			return createElement(Tag, __assign({
				"ref": targetRef,
				"data-styled-id": cssId,
				"className": "".concat(className, " ").concat(cssId)
			}, attributes));
		});
	}
	//#endregion
	//#region ../react-moveable/dist/moveable.esm.js
	function makeAble$1(name, able) {
		return {
			events: [],
			props: [],
			name,
			...able
		};
	}
	const DIRECTIONS4 = [
		"n",
		"w",
		"s",
		"e"
	];
	const DIRECTIONS = [
		"n",
		"w",
		"s",
		"e",
		"nw",
		"ne",
		"sw",
		"se"
	];
	function getSVGCursor(scale, degree) {
		return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${32 * scale}px" height="${32 * scale}px" viewBox="0 0 32 32" ><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(${degree}deg);transform-origin: 16px 16px"></path></svg>`;
	}
	function getCursorCSS(degree) {
		const x1 = getSVGCursor(1, degree);
		const degree45 = Math.round(degree / 45) * 45 % 180;
		let defaultCursor = "ns-resize";
		if (degree45 === 135) defaultCursor = "nwse-resize";
		else if (degree45 === 45) defaultCursor = "nesw-resize";
		else if (degree45 === 90) defaultCursor = "ew-resize";
		return `cursor:${defaultCursor};cursor: url('${x1}') 16 16, ${defaultCursor};`;
	}
	const agent = agent$1();
	const IS_WEBKIT = agent.browser.webkit;
	const IS_WEBKIT605 = IS_WEBKIT && (() => {
		const navi = typeof window === "undefined" ? { userAgent: "" } : window.navigator;
		const res = /applewebkit\/([^\s]+)/g.exec(navi.userAgent.toLowerCase());
		return res ? parseFloat(res[1]) < 605 : false;
	})();
	const browserName = agent.browser.name;
	const browserVersion = parseInt(agent.browser.version, 10);
	const IS_CHROME = browserName === "chrome";
	const IS_CHROMIUM = agent.browser.chromium;
	const chromiumVersion = parseInt(agent.browser.chromiumVersion, 10) || 0;
	const IS_CHROMIUM109 = IS_CHROME && browserVersion >= 109 || IS_CHROMIUM && chromiumVersion >= 109;
	const IS_FIREFOX = browserName === "firefox";
	const IS_SAFARI_ABOVE15 = parseInt(agent.browser.webkitVersion, 10) >= 612 || browserVersion >= 15;
	const PREFIX = "moveable-";
	const MOVEABLE_CSS = `
{
position: absolute;
width: 1px;
height: 1px;
left: 0;
top: 0;
z-index: 3000;
--moveable-color: #4af;
--zoom: 1;
--zoompx: 1px;
--moveable-line-padding: 0;
--moveable-control-padding: 0;
will-change: transform;
outline: 1px solid transparent;
}
.control-box {
z-index: 0;
}
.line, .control {
position: absolute;
left: 0;
top: 0;
will-change: transform;
}
.control {
width: 14px;
height: 14px;
border-radius: 50%;
border: 2px solid #fff;
box-sizing: border-box;
background: #4af;
background: var(--moveable-color);
margin-top: -7px;
margin-left: -7px;
border: 2px solid #fff;
z-index: 10;
}
.around-control {
position: absolute;
will-change: transform;
width: calc(var(--moveable-control-padding, 20) * 1px);
height: calc(var(--moveable-control-padding, 20) * 1px);
left: calc(var(--moveable-control-padding, 20) * -0.5px);
top: calc(var(--moveable-control-padding, 20) * -0.5px);
box-sizing: border-box;
background: transparent;
z-index: 8;
cursor: alias;
transform-origin: center center;
}
${DIRECTIONS.map((dir) => {
		let top = "";
		let left = "";
		let originX = "center";
		let originY = "center";
		const offset = `calc(var(--moveable-control-padding, 20) * -1px)`;
		if (dir.indexOf("n") > -1) {
			top = `top: ${offset};`;
			originY = `bottom`;
		}
		if (dir.indexOf(`s`) > -1) {
			top = `top: 0px;`;
			originY = `top`;
		}
		if (dir.indexOf(`w`) > -1) {
			left = `left: ${offset};`;
			originX = `right`;
		}
		if (dir.indexOf(`e`) > -1) {
			left = `left: 0px;`;
			originX = `left`;
		}
		return `.around-control[data-direction*="${dir}"] {
        ${left}${top}
        transform-origin: ${originX} ${originY};
    }`;
	}).join("\n")}
.padding {
position: absolute;
top: 0px;
left: 0px;
width: 100px;
height: 100px;
transform-origin: 0 0;
}
.line {
width: 1px;
height: 1px;
background: #4af;
background: var(--moveable-color);
transform-origin: 0px 50%;
}
.line.edge {
z-index: 1;
background: transparent;
}
.line.dashed {
box-sizing: border-box;
background: transparent;
}
.line.dashed.horizontal {
border-top: 1px dashed #4af;
border-top-color: #4af;
border-top-color: var(--moveable-color);
}
.line.dashed.vertical {
border-left: 1px dashed #4af;
border-left-color: #4af;
border-left-color: var(--moveable-color);
}
.line.vertical {
transform: translateX(-50%);
}
.line.horizontal {
transform: translateY(-50%);
}
.line.vertical.bold {
width: 2px;
}
.line.horizontal.bold {
height: 2px;
}

.control.origin {
border-color: #f55;
background: #fff;
width: 12px;
height: 12px;
margin-top: -6px;
margin-left: -6px;
pointer-events: none;
}
${[
		0,
		15,
		30,
		45,
		60,
		75,
		90,
		105,
		120,
		135,
		150,
		165
	].map((degree) => `
.direction[data-rotation="${degree}"], :global .view-control-rotation${degree} {
${getCursorCSS(degree)}
}
`).join("\n")}

.line.direction:before {
content: "";
position: absolute;
width: 100%;
height: calc(var(--moveable-line-padding, 0) * 1px);
bottom: 0;
left: 0;
}
.group {
z-index: -1;
}
.area {
position: absolute;
}
.area-pieces {
position: absolute;
top: 0;
left: 0;
display: none;
}
.area.avoid, .area.pass {
pointer-events: none;
}
.area.avoid+.area-pieces {
display: block;
}
.area-piece {
position: absolute;
}

${IS_WEBKIT605 ? `:global svg *:before {
content:"";
transform-origin: inherit;
}` : ""}
`;
	const NEARBY_POS = [
		[
			0,
			1,
			2
		],
		[
			1,
			0,
			3
		],
		[
			2,
			0,
			3
		],
		[
			3,
			1,
			2
		]
	];
	const FLOAT_POINT_NUM = 1e-4;
	const TINY_NUM$1 = 1e-7;
	const MIN_SCALE = 1e-9;
	const MAX_NUM = Math.pow(10, 10);
	const MIN_NUM = -MAX_NUM;
	const DIRECTION_REGION_TO_DIRECTION = {
		n: [0, -1],
		e: [1, 0],
		s: [0, 1],
		w: [-1, 0],
		nw: [-1, -1],
		ne: [1, -1],
		sw: [-1, 1],
		se: [1, 1]
	};
	const DIRECTION_INDEXES = {
		n: [0, 1],
		e: [1, 3],
		s: [3, 2],
		w: [2, 0],
		nw: [0],
		ne: [1],
		sw: [2],
		se: [3]
	};
	const DIRECTION_ROTATIONS = {
		n: 0,
		s: 180,
		w: 270,
		e: 90,
		nw: 315,
		ne: 45,
		sw: 225,
		se: 135
	};
	const MOVEABLE_METHODS = [
		"isMoveableElement",
		"updateRect",
		"updateTarget",
		"destroy",
		"dragStart",
		"isInside",
		"hitTest",
		"setState",
		"getRect",
		"request",
		"isDragging",
		"getManager",
		"forceUpdate",
		"waitToChangeTarget",
		"updateSelectors",
		"getTargets",
		"stopDrag",
		"getControlBoxElement",
		"getMoveables",
		"getDragElement"
	];
	function setCustomDrag(e, state, delta, isPinch, isConvert, ableName = "draggable") {
		const result = state.gestos[ableName]?.move(delta, e.inputEvent) ?? {};
		const datas = result.originalDatas || result.datas;
		const ableDatas = datas[ableName] || (datas[ableName] = {});
		return {
			...isConvert ? convertDragDist(state, result) : result,
			isPinch: !!isPinch,
			parentEvent: true,
			datas: ableDatas,
			originalDatas: e.originalDatas
		};
	}
	var CustomGesto = class {
		constructor(ableName = "draggable") {
			this.ableName = ableName;
			this.prevX = 0;
			this.prevY = 0;
			this.startX = 0;
			this.startY = 0;
			this.isDrag = false;
			this.isFlag = false;
			this.datas = { draggable: {} };
			this.datas = { [ableName]: {} };
		}
		dragStart(client, e) {
			this.isDrag = false;
			this.isFlag = false;
			const originalDatas = e.originalDatas;
			this.datas = originalDatas;
			if (!originalDatas[this.ableName]) originalDatas[this.ableName] = {};
			return {
				...this.move(client, e.inputEvent),
				type: "dragstart"
			};
		}
		drag(client, inputEvent) {
			return this.move([client[0] - this.prevX, client[1] - this.prevY], inputEvent);
		}
		move(delta, inputEvent) {
			let clientX;
			let clientY;
			let isFirstDrag = false;
			if (!this.isFlag) {
				this.prevX = delta[0];
				this.prevY = delta[1];
				this.startX = delta[0];
				this.startY = delta[1];
				clientX = delta[0];
				clientY = delta[1];
				this.isFlag = true;
			} else {
				const isPrevDrag = this.isDrag;
				clientX = this.prevX + delta[0];
				clientY = this.prevY + delta[1];
				if (delta[0] || delta[1]) this.isDrag = true;
				if (!isPrevDrag && this.isDrag) isFirstDrag = true;
			}
			this.prevX = clientX;
			this.prevY = clientY;
			return {
				type: "drag",
				clientX,
				clientY,
				inputEvent,
				isFirstDrag,
				isDrag: this.isDrag,
				distX: clientX - this.startX,
				distY: clientY - this.startY,
				deltaX: delta[0],
				deltaY: delta[1],
				datas: this.datas[this.ableName],
				originalDatas: this.datas,
				parentEvent: true,
				parentGesto: this
			};
		}
	};
	function calculateElementPosition(matrix, origin, width, height) {
		const n = matrix.length === 16 ? 4 : 3;
		let [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = calculatePoses(matrix, width, height, n);
		let [originX, originY] = calculatePosition(matrix, origin, n);
		const left = Math.min(x1, x2, x3, x4);
		const top = Math.min(y1, y2, y3, y4);
		const right = Math.max(x1, x2, x3, x4);
		const bottom = Math.max(y1, y2, y3, y4);
		x1 = x1 - left || 0;
		x2 = x2 - left || 0;
		x3 = x3 - left || 0;
		x4 = x4 - left || 0;
		y1 = y1 - top || 0;
		y2 = y2 - top || 0;
		y3 = y3 - top || 0;
		y4 = y4 - top || 0;
		originX = originX - left || 0;
		originY = originY - top || 0;
		const sx = matrix[0];
		const sy = matrix[n + 1];
		const direction = sign(sx * sy);
		return {
			left,
			top,
			right,
			bottom,
			origin: [originX, originY],
			pos1: [x1, y1],
			pos2: [x2, y2],
			pos3: [x3, y3],
			pos4: [x4, y4],
			direction
		};
	}
	function calculatePointerDist(moveable, e) {
		const { clientX, clientY, datas } = e;
		const { moveableClientRect, rootMatrix, is3d, pos1 } = moveable.state;
		const { left, top } = moveableClientRect;
		const n = is3d ? 4 : 3;
		const [posX, posY] = minus(calculateInversePosition(rootMatrix, [clientX - left, clientY - top], n), pos1);
		const [distX, distY] = getDragDist({
			datas,
			distX: posX,
			distY: posY
		});
		return [distX, distY];
	}
	function setDragStart(moveable, { datas }) {
		const { allMatrix, beforeMatrix, is3d, left, top, origin, offsetMatrix, targetMatrix, transformOrigin } = moveable.state;
		const n = is3d ? 4 : 3;
		datas.is3d = is3d;
		datas.matrix = allMatrix;
		datas.targetMatrix = targetMatrix;
		datas.beforeMatrix = beforeMatrix;
		datas.offsetMatrix = offsetMatrix;
		datas.transformOrigin = transformOrigin;
		datas.inverseMatrix = invert(allMatrix, n);
		datas.inverseBeforeMatrix = invert(beforeMatrix, n);
		datas.absoluteOrigin = convertPositionMatrix(plus([left, top], origin), n);
		datas.startDragBeforeDist = calculate(datas.inverseBeforeMatrix, datas.absoluteOrigin, n);
		datas.startDragDist = calculate(datas.inverseMatrix, datas.absoluteOrigin, n);
	}
	function getTransformDirection(e) {
		return calculateElementPosition(e.datas.beforeTransform, [50, 50], 100, 100).direction;
	}
	function resolveTransformEvent(moveable, event, functionName) {
		const { datas, originalDatas: { beforeRenderable: originalDatas } } = event;
		const index = datas.transformIndex;
		const nextTransforms = originalDatas.nextTransforms;
		const length = nextTransforms.length;
		const nextTransformAppendedIndexes = originalDatas.nextTransformAppendedIndexes;
		let nextIndex = -1;
		if (index === -1) {
			if (functionName === "translate") nextIndex = 0;
			else if (functionName === "rotate") nextIndex = findIndex(nextTransforms, (text) => text.match(/scale\(/g));
			if (nextIndex === -1) nextIndex = nextTransforms.length;
			datas.transformIndex = nextIndex;
		} else if (find$1(nextTransformAppendedIndexes, (info) => info.index === index && info.functionName === functionName)) nextIndex = index;
		else nextIndex = index + nextTransformAppendedIndexes.filter((info) => info.index < index).length;
		const result = convertTransformInfo(nextTransforms, moveable.state, nextIndex);
		const targetFunction = result.targetFunction;
		const matFunctionName = functionName === "rotate" ? "rotateZ" : functionName;
		datas.beforeFunctionTexts = result.beforeFunctionTexts;
		datas.afterFunctionTexts = result.afterFunctionTexts;
		datas.beforeTransform = result.beforeFunctionMatrix;
		datas.beforeTransform2 = result.beforeFunctionMatrix2;
		datas.targetTansform = result.targetFunctionMatrix;
		datas.afterTransform = result.afterFunctionMatrix;
		datas.afterTransform2 = result.afterFunctionMatrix2;
		datas.targetAllTransform = result.allFunctionMatrix;
		if (targetFunction.functionName === matFunctionName) {
			datas.afterFunctionTexts.splice(0, 1);
			datas.isAppendTransform = false;
		} else if (length > nextIndex) {
			datas.isAppendTransform = true;
			originalDatas.nextTransformAppendedIndexes = [...nextTransformAppendedIndexes, {
				functionName,
				index: nextIndex,
				isAppend: true
			}];
		}
	}
	function convertTransformFormat(datas, value, dist) {
		return `${datas.beforeFunctionTexts.join(" ")} ${datas.isAppendTransform ? dist : value} ${datas.afterFunctionTexts.join(" ")}`;
	}
	function getTransformDist({ datas, distX, distY }) {
		const [bx, by] = getBeforeDragDist({
			datas,
			distX,
			distY
		});
		return calculate(getTransfromMatrix(datas, fromTranslation([bx, by], 4)), convertPositionMatrix([
			0,
			0,
			0
		], 4), 4);
	}
	function getTransfromMatrix(datas, targetMatrix, isAfter) {
		const { beforeTransform, afterTransform, beforeTransform2, afterTransform2, targetAllTransform } = datas;
		const nextTargetMatrix = isAfter ? multiply(targetAllTransform, targetMatrix, 4) : multiply(targetMatrix, targetAllTransform, 4);
		return multiply(multiply(invert(isAfter ? beforeTransform2 : beforeTransform, 4), nextTargetMatrix, 4), invert(isAfter ? afterTransform2 : afterTransform, 4), 4);
	}
	function getBeforeDragDist({ datas, distX, distY }) {
		const { inverseBeforeMatrix, is3d, startDragBeforeDist, absoluteOrigin } = datas;
		const n = is3d ? 4 : 3;
		return minus(calculate(inverseBeforeMatrix, plus(absoluteOrigin, [distX, distY]), n), startDragBeforeDist);
	}
	function getDragDist({ datas, distX, distY }, isBefore) {
		const { inverseBeforeMatrix, inverseMatrix, is3d, startDragBeforeDist, startDragDist, absoluteOrigin } = datas;
		const n = is3d ? 4 : 3;
		return minus(calculate(isBefore ? inverseBeforeMatrix : inverseMatrix, plus(absoluteOrigin, [distX, distY]), n), isBefore ? startDragBeforeDist : startDragDist);
	}
	function getInverseDragDist({ datas, distX, distY }, isBefore) {
		const { beforeMatrix, matrix, is3d, startDragBeforeDist, startDragDist, absoluteOrigin } = datas;
		const n = is3d ? 4 : 3;
		return minus(calculate(isBefore ? beforeMatrix : matrix, plus(isBefore ? startDragBeforeDist : startDragDist, [distX, distY]), n), absoluteOrigin);
	}
	function calculateTransformOrigin(transformOrigin, width, height, prevWidth = width, prevHeight = height, prevOrigin = [0, 0]) {
		if (!transformOrigin) return prevOrigin;
		return transformOrigin.map((pos, i) => {
			const { value, unit } = splitUnit(pos);
			const prevSize = i ? prevHeight : prevWidth;
			const size = i ? height : width;
			if (pos === "%" || isNaN(value)) return size * (prevSize ? prevOrigin[i] / prevSize : 0);
			else if (unit !== "%") return value;
			return size * value / 100;
		});
	}
	function getPosIndexesByDirection(direction) {
		const indexes = [];
		if (direction[1] >= 0) {
			if (direction[0] >= 0) indexes.push(3);
			if (direction[0] <= 0) indexes.push(2);
		}
		if (direction[1] <= 0) {
			if (direction[0] >= 0) indexes.push(1);
			if (direction[0] <= 0) indexes.push(0);
		}
		return indexes;
	}
	function getPosesByDirection(poses, direction) {
		return getPosIndexesByDirection(direction).map((index) => poses[index]);
	}
	function getPosBySingleDirection(poses, direction) {
		const ratio = (direction + 1) / 2;
		return [dot(poses[0][0], poses[1][0], ratio, 1 - ratio), dot(poses[0][1], poses[1][1], ratio, 1 - ratio)];
	}
	function getPosByDirection(poses, direction) {
		return getPosBySingleDirection([getPosBySingleDirection([poses[0], poses[1]], direction[0]), getPosBySingleDirection([poses[2], poses[3]], direction[0])], direction[1]);
	}
	function getDist$1(startPos, matrix, width, height, n, fixedDirection) {
		const fixedPos = getPosByDirection(calculatePoses(matrix, width, height, n), fixedDirection);
		return [startPos[0] - fixedPos[0], startPos[1] - fixedPos[1]];
	}
	function getNextMatrix(offsetMatrix, targetMatrix, origin, n) {
		return multiply(offsetMatrix, getAbsoluteMatrix(targetMatrix, n, origin), n);
	}
	function getNextTransformMatrix(state, datas, transform, isAllTransform) {
		const { transformOrigin, offsetMatrix, is3d } = state;
		const n = is3d ? 4 : 3;
		let targetTransform;
		if (isString(transform)) {
			const { beforeTransform, afterTransform } = datas;
			if (isAllTransform) targetTransform = convertDimension(parseMat(transform), 4, n);
			else targetTransform = convertDimension(multiply(multiply(beforeTransform, parseMat([transform]), 4), afterTransform, 4), 4, n);
		} else targetTransform = transform;
		return getNextMatrix(offsetMatrix, targetTransform, transformOrigin, n);
	}
	function scaleMatrix(state, scale) {
		const { transformOrigin, offsetMatrix, is3d, targetMatrix, targetAllTransform } = state;
		const n = is3d ? 4 : 3;
		return getNextMatrix(offsetMatrix, multiply(targetAllTransform || targetMatrix, createScaleMatrix(scale, n), n), transformOrigin, n);
	}
	function fillTransformStartEvent(moveable, e) {
		const originalDatas = getBeforeRenderableDatas(e);
		return {
			setTransform: (transform, index = -1) => {
				originalDatas.startTransforms = isArray(transform) ? transform : splitSpace(transform);
				setTransformIndex(moveable, e, index);
			},
			setTransformIndex: (index) => {
				setTransformIndex(moveable, e, index);
			}
		};
	}
	function setDefaultTransformIndex(moveable, e, property) {
		const startTransforms = getBeforeRenderableDatas(e).startTransforms;
		setTransformIndex(moveable, e, findIndex(startTransforms, (func) => func.indexOf(`${property}(`) === 0));
	}
	function setTransformIndex(moveable, e, index) {
		const originalDatas = getBeforeRenderableDatas(e);
		const datas = e.datas;
		datas.transformIndex = index;
		if (index === -1) return;
		const transform = originalDatas.startTransforms[index];
		if (!transform) return;
		const state = moveable.state;
		datas.startValue = parse([transform], {
			"x%": (v) => v / 100 * state.offsetWidth,
			"y%": (v) => v / 100 * state.offsetHeight
		})[0].functionValue;
	}
	function fillOriginalTransform(e, transform) {
		const originalDatas = getBeforeRenderableDatas(e);
		originalDatas.nextTransforms = splitSpace(transform);
	}
	function getBeforeRenderableDatas(e) {
		return e.originalDatas.beforeRenderable;
	}
	function getNextTransforms(e) {
		const { originalDatas: { beforeRenderable: originalDatas } } = e;
		return originalDatas.nextTransforms;
	}
	function getNextTransformText(e) {
		return (getNextTransforms(e) || []).join(" ");
	}
	function getNextStyle(e) {
		return getBeforeRenderableDatas(e).nextStyle;
	}
	function fillTransformEvent(moveable, nextTransform, delta, isPinch, e) {
		fillOriginalTransform(e, nextTransform);
		const drag = Draggable_default.drag(moveable, setCustomDrag(e, moveable.state, delta, isPinch, false));
		const afterTransform = drag ? drag.transform : nextTransform;
		return {
			transform: nextTransform,
			drag,
			...fillCSSObject({ transform: afterTransform }, e),
			afterTransform
		};
	}
	function getTranslateFixedPosition(moveable, transform, fixedDirection, fixedOffset, datas, isAllTransform) {
		return getDirectionOffset(moveable, fixedDirection, fixedOffset, getNextTransformMatrix(moveable.state, datas, transform, isAllTransform));
	}
	function getTranslateDist(moveable, transform, fixedDirection, fixedPosition, fixedOffset, datas, isAllTransform) {
		const nextFixedPosition = getTranslateFixedPosition(moveable, transform, fixedDirection, fixedOffset, datas, isAllTransform);
		const { left, top } = moveable.state;
		const groupable = moveable.props.groupable;
		const groupLeft = groupable ? left : 0;
		const groupTop = groupable ? top : 0;
		return minus(minus(fixedPosition, nextFixedPosition), [groupLeft, groupTop]);
	}
	function getScaleDist(moveable, transform, fixedDirection, fixedPosition, fixedOffset, datas, isAllTransform) {
		return getTranslateDist(moveable, transform, fixedDirection, fixedPosition, fixedOffset, datas, isAllTransform);
	}
	function getDirectionByPos(pos, width, height) {
		return [width ? -1 + pos[0] / (width / 2) : 0, height ? -1 + pos[1] / (height / 2) : 0];
	}
	function getDirectionOffset(moveable, fixedDirection, fixedOffset, nextMatrix = moveable.state.allMatrix) {
		const { width, height, is3d } = moveable.state;
		const n = is3d ? 4 : 3;
		return calculatePosition(nextMatrix, [width / 2 * (1 + fixedDirection[0]) + fixedOffset[0], height / 2 * (1 + fixedDirection[1]) + fixedOffset[1]], n);
	}
	function getRotateDist(moveable, rotateDist, datas) {
		const fixedDirection = datas.fixedDirection;
		const fixedPosition = datas.fixedPosition;
		const fixedOffset = datas.fixedOffset;
		return getTranslateDist(moveable, `rotate(${rotateDist}deg)`, fixedDirection, fixedPosition, fixedOffset, datas);
	}
	function getResizeDist(moveable, width, height, fixedPosition, transformOrigin, datas) {
		const { groupable } = moveable.props;
		const state = moveable.state;
		const { transformOrigin: prevOrigin, offsetMatrix, is3d, width: prevWidth, height: prevHeight, left, top } = state;
		const fixedDirection = datas.fixedDirection;
		const targetMatrix = datas.nextTargetMatrix || state.targetMatrix;
		const n = is3d ? 4 : 3;
		const nextOrigin = calculateTransformOrigin(transformOrigin, width, height, prevWidth, prevHeight, prevOrigin);
		const groupLeft = groupable ? left : 0;
		const groupTop = groupable ? top : 0;
		return minus(getDist$1(fixedPosition, getNextMatrix(offsetMatrix, targetMatrix, nextOrigin, n), width, height, n, fixedDirection), [groupLeft, groupTop]);
	}
	function getAbsolutePosition(moveable, direction) {
		return getPosByDirection(getAbsolutePosesByState(moveable.state), direction);
	}
	function getGestoData(moveable, ableName) {
		const targetGesto = moveable.targetGesto;
		const controlGesto = moveable.controlGesto;
		let data;
		if (targetGesto?.isFlag()) data = targetGesto.getEventData()[ableName];
		if (!data && controlGesto?.isFlag()) data = controlGesto.getEventData()[ableName];
		return data || {};
	}
	function getShadowRoot(parentElement) {
		if (parentElement && parentElement.getRootNode) {
			const rootNode = parentElement.getRootNode();
			if (rootNode.nodeType === 11) return rootNode;
		}
	}
	function getIndividualTransforms(getStyle) {
		const scale = getStyle("scale");
		const rotate = getStyle("rotate");
		const translate = getStyle("translate");
		const individualTransforms = [];
		if (translate && translate !== "0px" && translate !== "none") individualTransforms.push(`translate(${translate.split(/\s+/).join(",")})`);
		if (rotate && rotate !== "1" && rotate !== "none") individualTransforms.push(`rotate(${rotate})`);
		if (scale && scale !== "1" && scale !== "none") individualTransforms.push(`scale(${scale.split(/\s+/).join(",")})`);
		return individualTransforms;
	}
	function getMatrixStackInfo(target, container, checkContainer) {
		let el = target;
		const matrixes = [];
		const documentElement = getDocumentElement(target) || getDocumentBody(target);
		let requestEnd = !checkContainer && target === container || target === documentElement;
		let isEnd = requestEnd;
		let is3d = false;
		let n = 3;
		let transformOrigin;
		let targetTransformOrigin;
		let targetMatrix;
		let hasFixed = false;
		let offsetContainer = getOffsetInfo(container, container, true).offsetParent;
		let zoom = 1;
		while (el && !isEnd) {
			isEnd = requestEnd;
			const getStyle = getCachedStyle(el);
			const position = getStyle("position");
			const transform = getElementTransform(el);
			const isFixed = position === "fixed";
			const individualTransforms = getIndividualTransforms(getStyle);
			let matrix = convertCSStoMatrix(getTransformMatrix(transform));
			let offsetParent;
			let isOffsetEnd;
			let isStatic = false;
			let parentClientLeft = 0;
			let parentClientTop = 0;
			let fixedClientLeft = 0;
			let fixedClientTop = 0;
			let fixedInfo = {
				hasTransform: false,
				fixedContainer: null
			};
			if (isFixed) {
				hasFixed = true;
				fixedInfo = getPositionFixedInfo(el);
				offsetContainer = fixedInfo.fixedContainer;
			}
			const length = matrix.length;
			if (!is3d && (length === 16 || individualTransforms.length)) {
				is3d = true;
				n = 4;
				convert3DMatrixes(matrixes);
				if (targetMatrix) targetMatrix = convertDimension(targetMatrix, 3, 4);
			}
			if (is3d && length === 9) matrix = convertDimension(matrix, 3, 4);
			const { tagName, hasOffset, isSVG, origin, targetOrigin, offset: offsetPos } = getOffsetPosInfo(el, target);
			let [offsetLeft, offsetTop] = offsetPos;
			if (tagName === "svg" && !el.ownerSVGElement && targetMatrix) {
				matrixes.push({
					type: "target",
					target: el,
					matrix: getSVGMatrix(el, n)
				});
				matrixes.push({
					type: "offset",
					target: el,
					matrix: createIdentityMatrix(n)
				});
			}
			const targetZoom = parseFloat(getStyle("zoom")) || 1;
			if (isFixed) {
				offsetParent = fixedInfo.fixedContainer;
				isOffsetEnd = true;
			} else {
				const offsetInfo = getOffsetInfo(el, container, false, true, getStyle);
				const offsetZoom = offsetInfo.offsetZoom;
				offsetParent = offsetInfo.offsetParent;
				isOffsetEnd = offsetInfo.isEnd;
				isStatic = offsetInfo.isStatic;
				zoom *= offsetZoom;
				if ((offsetInfo.isCustomElement || offsetZoom !== 1) && isStatic) {
					offsetLeft -= offsetParent.offsetLeft;
					offsetTop -= offsetParent.offsetTop;
				} else if (IS_FIREFOX || IS_CHROMIUM109) {
					if (offsetInfo.parentSlotElement) {
						let customOffsetParent = offsetParent;
						let customOffsetLeft = 0;
						let customOffsetTop = 0;
						while (customOffsetParent) {
							if (!getShadowRoot(customOffsetParent)) break;
							customOffsetLeft += customOffsetParent.offsetLeft;
							customOffsetTop += customOffsetParent.offsetTop;
							customOffsetParent = customOffsetParent.offsetParent;
						}
						offsetLeft -= customOffsetLeft;
						offsetTop -= customOffsetTop;
					}
				}
			}
			if (IS_WEBKIT && !IS_SAFARI_ABOVE15 && hasOffset && !isSVG && isStatic && (position === "relative" || position === "static")) {
				offsetLeft -= offsetParent.offsetLeft;
				offsetTop -= offsetParent.offsetTop;
			}
			if (isFixed) {
				if (hasOffset && fixedInfo.hasTransform) {
					fixedClientLeft = offsetParent.clientLeft;
					fixedClientTop = offsetParent.clientTop;
				}
			} else {
				if (hasOffset && offsetContainer !== offsetParent) {
					parentClientLeft = offsetParent.clientLeft;
					parentClientTop = offsetParent.clientTop;
				}
				if (hasOffset && offsetParent === documentElement) {
					const margin = getBodyOffset(el, false);
					offsetLeft += margin[0];
					offsetTop += margin[1];
				}
			}
			matrixes.push({
				type: "target",
				target: el,
				matrix: getAbsoluteMatrix(matrix, n, origin)
			});
			if (individualTransforms.length) {
				matrixes.push({
					type: "offset",
					target: el,
					matrix: createIdentityMatrix(n)
				});
				matrixes.push({
					type: "target",
					target: el,
					matrix: getAbsoluteMatrix(parseMat(individualTransforms), n, origin)
				});
			}
			if (hasOffset) {
				const isElementTarget = el === target;
				const scrollLeft = isElementTarget ? 0 : el.scrollLeft;
				const scrollTop = isElementTarget ? 0 : el.scrollTop;
				matrixes.push({
					type: "offset",
					target: el,
					matrix: createOriginMatrix([offsetLeft - scrollLeft + parentClientLeft - fixedClientLeft, offsetTop - scrollTop + parentClientTop - fixedClientTop], n)
				});
			} else matrixes.push({
				type: "offset",
				target: el,
				origin
			});
			if (targetZoom !== 1) matrixes.push({
				type: "zoom",
				target: el,
				matrix: getAbsoluteMatrix(createScaleMatrix([targetZoom, targetZoom], n), n, [0, 0])
			});
			if (!targetMatrix) targetMatrix = matrix;
			if (!transformOrigin) transformOrigin = origin;
			if (!targetTransformOrigin) targetTransformOrigin = targetOrigin;
			if (isEnd || isFixed) break;
			else {
				el = offsetParent;
				requestEnd = isOffsetEnd;
			}
			if (!checkContainer || el === documentElement) isEnd = requestEnd;
		}
		if (!targetMatrix) targetMatrix = createIdentityMatrix(n);
		if (!transformOrigin) transformOrigin = [0, 0];
		if (!targetTransformOrigin) targetTransformOrigin = [0, 0];
		return {
			zoom,
			offsetContainer,
			matrixes,
			targetMatrix,
			transformOrigin,
			targetOrigin: targetTransformOrigin,
			is3d,
			hasFixed
		};
	}
	let cacheStyleMap = null;
	let clientRectStyleMap = null;
	let matrixContainerInfos = null;
	function setStoreCache(useCache) {
		if (useCache) {
			if (window.Map) {
				cacheStyleMap = /* @__PURE__ */ new Map();
				clientRectStyleMap = /* @__PURE__ */ new Map();
			}
			matrixContainerInfos = [];
		} else {
			cacheStyleMap = null;
			matrixContainerInfos = null;
			clientRectStyleMap = null;
		}
	}
	function getCachedClientRect(el) {
		const clientRect = clientRectStyleMap?.get(el);
		if (clientRect) return clientRect;
		const nextClientRect = getClientRect(el, true);
		if (clientRectStyleMap) clientRectStyleMap.set(el, nextClientRect);
		return nextClientRect;
	}
	function getCachedMatrixContainerInfo(target, container) {
		if (matrixContainerInfos) {
			const result = find$1(matrixContainerInfos, (info) => info[0][0] == target && info[0][1] == container);
			if (result) return result[1];
		}
		const result = getMatrixStackInfo(target, container, true);
		if (matrixContainerInfos) matrixContainerInfos.push([[target, container], result]);
		return result;
	}
	function getCachedStyle(element) {
		let cache = cacheStyleMap?.get(element);
		if (!cache) {
			const nextStyle = getWindow(element).getComputedStyle(element);
			if (!cacheStyleMap) return (property) => {
				return nextStyle[property];
			};
			cache = {
				style: nextStyle,
				cached: {}
			};
			cacheStyleMap.set(element, cache);
		}
		const cached = cache.cached;
		const style = cache.style;
		return (property) => {
			if (!(property in cached)) cached[property] = style[property];
			return cached[property];
		};
	}
	function fillChildEvents(moveable, name, e) {
		const datas = e.originalDatas;
		datas.groupable = datas.groupable || {};
		const groupableDatas = datas.groupable;
		groupableDatas.childDatas = groupableDatas.childDatas || [];
		const childDatas = groupableDatas.childDatas;
		return moveable.moveables.map((_, i) => {
			childDatas[i] = childDatas[i] || {};
			childDatas[i][name] = childDatas[i][name] || {};
			return {
				...e,
				isRequestChild: true,
				datas: childDatas[i][name],
				originalDatas: childDatas[i]
			};
		});
	}
	function triggerChildGesto(moveable, able, type, delta, e, isConvert, ableName) {
		const isStart = !!type.match(/Start$/g);
		const isEnd = !!type.match(/End$/g);
		const isPinch = e.isPinch;
		const datas = e.datas;
		const events = fillChildEvents(moveable, able.name, e);
		const moveables = moveable.moveables;
		const childEvents = [];
		const eventParams = events.map((ev, i) => {
			const childMoveable = moveables[i];
			const state = childMoveable.state;
			const gestos = state.gestos;
			let childEvent;
			if (isStart) {
				childEvent = new CustomGesto(ableName).dragStart(delta, ev);
				childEvents.push(childEvent);
			} else {
				if (!gestos[ableName]) gestos[ableName] = datas.childGestos[i];
				if (!gestos[ableName]) return;
				childEvent = setCustomDrag(ev, state, delta, isPinch, isConvert, ableName);
				childEvents.push(childEvent);
			}
			const result = able[type](childMoveable, {
				...childEvent,
				parentFlag: true
			});
			if (isEnd) gestos[ableName] = null;
			return result;
		});
		if (isStart) datas.childGestos = moveables.map((child) => child.state.gestos[ableName]);
		return {
			eventParams,
			childEvents
		};
	}
	function triggerChildAbles(moveable, able, type, e, eachEvent = (_, ev) => ev, callback) {
		const isEnd = !!type.match(/End$/g);
		const events = fillChildEvents(moveable, able.name, e);
		const moveables = moveable.moveables;
		return events.map((ev, i) => {
			const childMoveable = moveables[i];
			const childEvent = eachEvent(childMoveable, ev);
			const result = able[type](childMoveable, {
				...childEvent,
				parentFlag: true
			});
			result && callback && callback(childMoveable, ev, result, i);
			if (isEnd) childMoveable.state.gestos = {};
			return result;
		});
	}
	function startChildDist(moveable, child, parentDatas, childEvent) {
		const fixedDirection = parentDatas.fixedDirection;
		const fixedPosition = parentDatas.fixedPosition;
		const pos = getPosByDirection(childEvent.datas.startPositions || getAbsolutePosesByState(child.state), fixedDirection);
		const [originalX, originalY] = calculate(createRotateMatrix(-moveable.rotation / 180 * Math.PI, 3), [
			pos[0] - fixedPosition[0],
			pos[1] - fixedPosition[1],
			1
		], 3);
		childEvent.datas.originalX = originalX;
		childEvent.datas.originalY = originalY;
		return childEvent;
	}
	function renderDirectionControlsByInfos(moveable, ableName, renderDirections, React) {
		const { renderPoses, rotation: rotationRad, direction } = moveable.getState();
		const { zoom } = getProps(moveable.props, ableName);
		const degRotation = absDegree(rotationRad / Math.PI * 180);
		const directionMap = {};
		const renderState = moveable.renderState;
		if (!renderState.renderDirectionMap) renderState.renderDirectionMap = {};
		const renderDirectionMap = renderState.renderDirectionMap;
		renderDirections.forEach(({ dir }) => {
			directionMap[dir] = true;
		});
		const directionSign = sign(direction);
		return renderDirections.map(({ data, classNames, dir }) => {
			const indexes = DIRECTION_INDEXES[dir];
			if (!indexes || !directionMap[dir]) return null;
			renderDirectionMap[dir] = true;
			const directionRotation = (throttle(degRotation, 15) + directionSign * DIRECTION_ROTATIONS[dir] + 720) % 180;
			const dataAttrs = {};
			getKeys(data).forEach((name) => {
				dataAttrs[`data-${name}`] = data[name];
			});
			return /* @__PURE__ */ React.createElement("div", {
				className: prefix("control", "direction", dir, ableName, ...classNames),
				"data-rotation": directionRotation,
				"data-direction": dir,
				...dataAttrs,
				key: `direction-${dir}`,
				style: getControlTransform(rotationRad, zoom, ...indexes.map((index) => renderPoses[index]))
			});
		});
	}
	function renderDirectionControls(moveable, defaultDirections, ableName, React) {
		const { renderDirections: directions = defaultDirections, displayAroundControls } = getProps(moveable.props, ableName);
		if (!directions) return [];
		const renderDirections = directions === true ? DIRECTIONS : directions;
		return [...displayAroundControls ? renderAroundControls(moveable, React, ableName, renderDirections) : [], ...renderDirectionControlsByInfos(moveable, ableName, renderDirections.map((dir) => {
			return {
				data: {},
				classNames: [],
				dir
			};
		}), React)];
	}
	function renderLine(React, direction, pos1, pos2, zoom, key, ...classNames) {
		const rad = getRad$1(pos1, pos2);
		const rotation = direction ? throttle(rad / Math.PI * 180, 15) % 180 : -1;
		return /* @__PURE__ */ React.createElement("div", {
			key: `line-${key}`,
			className: prefix("line", "direction", direction ? "edge" : "", direction, ...classNames),
			"data-rotation": rotation,
			"data-line-key": key,
			"data-direction": direction,
			style: getLineStyle(pos1, pos2, zoom, rad)
		});
	}
	function renderEdgeLines(React, ableName, edge, poses, zoom) {
		return (edge === true ? DIRECTIONS4 : edge).map((direction, i) => {
			const [index1, index2] = DIRECTION_INDEXES[direction];
			if (index2 == null) return;
			return renderLine(React, direction, poses[index1], poses[index2], zoom, `${ableName}Edge${i}`, ableName);
		}).filter(Boolean);
	}
	function getRenderDirections(ableName) {
		return (moveable, React) => {
			const edge = getProps(moveable.props, ableName).edge;
			if (edge && (edge === true || edge.length)) return [...renderEdgeLines(React, ableName, edge, moveable.getState().renderPoses, moveable.props.zoom), ...renderDiagonalDirections(moveable, ableName, React)];
			return renderAllDirections(moveable, ableName, React);
		};
	}
	function renderAllDirections(moveable, ableName, React) {
		return renderDirectionControls(moveable, DIRECTIONS, ableName, React);
	}
	function renderDiagonalDirections(moveable, ableName, React) {
		return renderDirectionControls(moveable, [
			"nw",
			"ne",
			"sw",
			"se"
		], ableName, React);
	}
	function renderAroundControls(moveable, React, ableName, renderDirections) {
		const renderState = moveable.renderState;
		if (!renderState.renderDirectionMap) renderState.renderDirectionMap = {};
		const { renderPoses, rotation: rotationRad, direction } = moveable.getState();
		const renderDirectionMap = renderState.renderDirectionMap;
		const { zoom } = moveable.props;
		const directionSign = sign(direction);
		const degRotation = rotationRad / Math.PI * 180;
		return (renderDirections || getKeys(renderDirectionMap)).map((dir) => {
			const indexes = DIRECTION_INDEXES[dir];
			if (!indexes) return null;
			const directionRotation = (throttle(degRotation, 15) + directionSign * DIRECTION_ROTATIONS[dir] + 720) % 180;
			const classNames = ["around-control"];
			if (ableName) classNames.push("direction", ableName);
			return /* @__PURE__ */ React.createElement("div", {
				className: prefix(...classNames),
				"data-rotation": directionRotation,
				"data-direction": dir,
				key: `direction-around-${dir}`,
				style: getControlTransform(rotationRad, zoom, ...indexes.map((index) => renderPoses[index]))
			});
		});
	}
	function checkBoundPoses(bounds, verticalPoses, horizontalPoses) {
		const { position = "client", left = -Infinity, top = -Infinity, right = Infinity, bottom = Infinity } = bounds || {};
		const nextBounds = {
			position,
			left,
			top,
			right,
			bottom
		};
		return {
			vertical: checkBounds(nextBounds, verticalPoses, true),
			horizontal: checkBounds(nextBounds, horizontalPoses, false)
		};
	}
	function getBounds(moveable, externalBounds) {
		const { containerClientRect: { clientHeight: containerHeight, clientWidth: containerWidth, clientLeft, clientTop }, snapOffset: { left: snapOffsetLeft, top: snapOffsetTop, right: snapOffsetRight, bottom: snapOffsetBottom } } = moveable.state;
		const bounds = externalBounds || moveable.props.bounds || {};
		const isCSS = (bounds.position || "client") === "css";
		const { left = -Infinity, top = -Infinity } = bounds;
		let { right = isCSS ? -Infinity : Infinity, bottom = isCSS ? -Infinity : Infinity } = bounds;
		if (isCSS) {
			right = containerWidth + snapOffsetRight - snapOffsetLeft - right;
			bottom = containerHeight + snapOffsetBottom - snapOffsetTop - bottom;
		}
		return {
			left: left + snapOffsetLeft - clientLeft,
			right: right + snapOffsetLeft - clientLeft,
			top: top + snapOffsetTop - clientTop,
			bottom: bottom + snapOffsetTop - clientTop
		};
	}
	function checkBoundKeepRatio(moveable, startPos, endPos) {
		const { left, top, right, bottom } = getBounds(moveable);
		const [endX, endY] = endPos;
		let [dx, dy] = minus(endPos, startPos);
		if (abs(dx) < 1e-7) dx = 0;
		if (abs(dy) < 1e-7) dy = 0;
		const isBottom = dy > 0;
		const isRight = dx > 0;
		const verticalInfo = {
			isBound: false,
			offset: 0,
			pos: 0
		};
		const horizontalInfo = {
			isBound: false,
			offset: 0,
			pos: 0
		};
		if (dx === 0 && dy === 0) return {
			vertical: verticalInfo,
			horizontal: horizontalInfo
		};
		else if (dx === 0) {
			if (isBottom) {
				if (bottom < endY) {
					horizontalInfo.pos = bottom;
					horizontalInfo.offset = endY - bottom;
				}
			} else if (top > endY) {
				horizontalInfo.pos = top;
				horizontalInfo.offset = endY - top;
			}
		} else if (dy === 0) {
			if (isRight) {
				if (right < endX) {
					verticalInfo.pos = right;
					verticalInfo.offset = endX - right;
				}
			} else if (left > endX) {
				verticalInfo.pos = left;
				verticalInfo.offset = endX - left;
			}
		} else {
			const a = dy / dx;
			const b = endPos[1] - a * endX;
			let y = 0;
			let x = 0;
			let isBound = false;
			if (isRight && right <= endX) {
				y = a * right + b;
				x = right;
				isBound = true;
			} else if (!isRight && endX <= left) {
				y = a * left + b;
				x = left;
				isBound = true;
			}
			if (isBound) {
				if (y < top || y > bottom) isBound = false;
			}
			if (!isBound) {
				if (isBottom && bottom <= endY) {
					y = bottom;
					x = (y - b) / a;
					isBound = true;
				} else if (!isBottom && endY <= top) {
					y = top;
					x = (y - b) / a;
					isBound = true;
				}
			}
			if (isBound) {
				verticalInfo.isBound = true;
				verticalInfo.pos = x;
				verticalInfo.offset = endX - x;
				horizontalInfo.isBound = true;
				horizontalInfo.pos = y;
				horizontalInfo.offset = endY - y;
			}
		}
		return {
			vertical: verticalInfo,
			horizontal: horizontalInfo
		};
	}
	function checkBounds(bounds, poses, isVertical) {
		const startBoundPos = bounds[isVertical ? "left" : "top"];
		const endBoundPos = bounds[isVertical ? "right" : "bottom"];
		const minPos = Math.min(...poses);
		const maxPos = Math.max(...poses);
		const boundInfos = [];
		if (startBoundPos + 1 > minPos) boundInfos.push({
			direction: "start",
			isBound: true,
			offset: minPos - startBoundPos,
			pos: startBoundPos
		});
		if (endBoundPos - 1 < maxPos) boundInfos.push({
			direction: "end",
			isBound: true,
			offset: maxPos - endBoundPos,
			pos: endBoundPos
		});
		if (!boundInfos.length) boundInfos.push({
			isBound: false,
			offset: 0,
			pos: 0
		});
		return boundInfos.sort((a, b) => abs(b.offset) - abs(a.offset));
	}
	function isBoundRotate$1(relativePoses, boundRect, rad) {
		return (rad ? relativePoses.map((pos) => rotate(pos, rad)) : relativePoses).some((pos) => {
			return pos[0] < boundRect.left && abs(pos[0] - boundRect.left) > .1 || pos[0] > boundRect.right && abs(pos[0] - boundRect.right) > .1 || pos[1] < boundRect.top && abs(pos[1] - boundRect.top) > .1 || pos[1] > boundRect.bottom && abs(pos[1] - boundRect.bottom) > .1;
		});
	}
	function boundRotate(vec, boundPos, index) {
		const r = getDistSize(vec);
		const nextPos = Math.sqrt(r * r - boundPos * boundPos) || 0;
		return [nextPos, -nextPos].sort((a, b) => {
			return abs(a - vec[index ? 0 : 1]) - abs(b - vec[index ? 0 : 1]);
		}).map((pos) => {
			return getRad$1([0, 0], index ? [pos, boundPos] : [boundPos, pos]);
		});
	}
	function checkRotateBounds(moveable, prevPoses, nextPoses, origin, rotation) {
		if (!moveable.props.bounds) return [];
		const rad = rotation * Math.PI / 180;
		const { left, top, right, bottom } = getBounds(moveable);
		const relativeLeft = left - origin[0];
		const relativeRight = right - origin[0];
		const relativeTop = top - origin[1];
		const relativeBottom = bottom - origin[1];
		const boundRect = {
			left: relativeLeft,
			top: relativeTop,
			right: relativeRight,
			bottom: relativeBottom
		};
		if (!isBoundRotate$1(nextPoses, boundRect, 0)) return [];
		const result = [];
		[
			[relativeLeft, 0],
			[relativeRight, 0],
			[relativeTop, 1],
			[relativeBottom, 1]
		].forEach(([boundPos, index]) => {
			nextPoses.forEach((nextPos) => {
				const relativeRad1 = getRad$1([0, 0], nextPos);
				result.push(...boundRotate(nextPos, boundPos, index).map((relativeRad2) => rad + relativeRad2 - relativeRad1).filter((nextRad) => !isBoundRotate$1(prevPoses, boundRect, nextRad)).map((nextRad) => throttle(nextRad * 180 / Math.PI, TINY_NUM$1)));
			});
		});
		return result;
	}
	const VERTICAL_NAMES = [
		"left",
		"right",
		"center"
	];
	const HORIZONTAL_NAMES = [
		"top",
		"bottom",
		"middle"
	];
	const SNAP_SKIP_NAMES_MAP = {
		"left": "start",
		"right": "end",
		"center": "center",
		"top": "start",
		"bottom": "end",
		"middle": "center"
	};
	const VERTICAL_NAMES_MAP = {
		start: "left",
		end: "right",
		center: "center"
	};
	const HORIZONTAL_NAMES_MAP = {
		start: "top",
		end: "bottom",
		center: "middle"
	};
	function getInitialBounds() {
		return {
			left: false,
			top: false,
			right: false,
			bottom: false
		};
	}
	function hasGuidelines(moveable, ableName) {
		const { props: { snappable, bounds, innerBounds, verticalGuidelines, horizontalGuidelines, snapGridWidth, snapGridHeight }, state: { guidelines, enableSnap } } = moveable;
		if (!snappable || !enableSnap || ableName && snappable !== true && snappable.indexOf(ableName) < 0) return false;
		if (snapGridWidth || snapGridHeight || bounds || innerBounds || guidelines && guidelines.length || verticalGuidelines && verticalGuidelines.length || horizontalGuidelines && horizontalGuidelines.length) return true;
		return false;
	}
	function getSnapDirections(snapDirections) {
		if (snapDirections === false) return {};
		else if (snapDirections === true || !snapDirections) return {
			left: true,
			right: true,
			top: true,
			bottom: true
		};
		return snapDirections;
	}
	function mapSnapDirectionPoses(snapDirections, snapPoses) {
		const nextSnapDirections = getSnapDirections(snapDirections);
		const nextSnapPoses = {};
		for (const name in nextSnapDirections) if (name in snapPoses && nextSnapDirections[name]) nextSnapPoses[name] = snapPoses[name];
		return nextSnapPoses;
	}
	function splitSnapDirectionPoses(snapDirections, snapPoses) {
		const nextSnapPoses = mapSnapDirectionPoses(snapDirections, snapPoses);
		const horizontalNames = HORIZONTAL_NAMES.filter((name) => name in nextSnapPoses);
		const verticalNames = VERTICAL_NAMES.filter((name) => name in nextSnapPoses);
		return {
			horizontalNames,
			verticalNames,
			horizontal: horizontalNames.map((name) => nextSnapPoses[name]),
			vertical: verticalNames.map((name) => nextSnapPoses[name])
		};
	}
	function calculateContainerPos(rootMatrix, containerRect, n) {
		const clientPos = calculatePosition(rootMatrix, [containerRect.clientLeft, containerRect.clientTop], n);
		return [containerRect.left + clientPos[0], containerRect.top + clientPos[1]];
	}
	function solveLineConstants([point1, point2]) {
		let dx = point2[0] - point1[0];
		let dy = point2[1] - point1[1];
		if (Math.abs(dx) < 1e-7) dx = 0;
		if (Math.abs(dy) < 1e-7) dy = 0;
		let a = 0;
		let b = 0;
		let c;
		if (!dx) {
			a = -1;
			c = point1[0];
		} else if (!dy) {
			b = 1;
			c = -point1[1];
		} else {
			a = -dy / dx;
			b = 1;
			c = a * point1[0] - point1[1];
		}
		return [
			a,
			b,
			c
		].map((v) => throttle(v, TINY_NUM));
	}
	const NAME_snapRotationThreshold = "snapRotationThreshold";
	const NAME_snapRotationDegrees = "snapRotationDegrees";
	const NAME_snapHorizontalThreshold = "snapHorizontalThreshold";
	const NAME_snapVerticalThreshold = "snapVerticalThreshold";
	function checkMoveableSnapPoses(moveable, posesX, posesY, dirXs = [], dirYs = [], customSnapVerticalThreshold, customSnapHorizontalThreshold) {
		const props = moveable.props;
		const snapThresholdMultiples = moveable.state.snapThresholdInfo?.multiples || [1, 1];
		const snapHorizontalThreshold = selectValue(customSnapHorizontalThreshold, props[NAME_snapHorizontalThreshold], 5);
		const snapVerticalThreshold = selectValue(customSnapVerticalThreshold, props[NAME_snapVerticalThreshold], 5);
		return checkSnapPoses(moveable.state.guidelines, posesX, posesY, dirXs, dirYs, snapHorizontalThreshold, snapVerticalThreshold, snapThresholdMultiples);
	}
	function checkSnapPoses(guidelines, posesX, posesY, dirXs, dirYs, snapHorizontalThreshold, snapVerticalThreshold, multiples) {
		return {
			vertical: checkSnap(guidelines, "vertical", posesX, snapVerticalThreshold * multiples[0], dirXs),
			horizontal: checkSnap(guidelines, "horizontal", posesY, snapHorizontalThreshold * multiples[1], dirYs)
		};
	}
	function checkSnapKeepRatio(moveable, startPos, endPos) {
		const [endX, endY] = endPos;
		const [startX, startY] = startPos;
		let [dx, dy] = minus(endPos, startPos);
		const isBottom = dy > 0;
		const isRight = dx > 0;
		dx = getTinyDist(dx);
		dy = getTinyDist(dy);
		const verticalInfo = {
			isSnap: false,
			offset: 0,
			pos: 0
		};
		const horizontalInfo = {
			isSnap: false,
			offset: 0,
			pos: 0
		};
		if (dx === 0 && dy === 0) return {
			vertical: verticalInfo,
			horizontal: horizontalInfo
		};
		const { vertical: verticalSnapInfo, horizontal: horizontalSnapInfo } = checkMoveableSnapPoses(moveable, dx ? [endX] : [], dy ? [endY] : [], [], [], void 0, void 0);
		verticalSnapInfo.posInfos.filter(({ pos }) => {
			return isRight ? pos >= startX : pos <= startX;
		});
		horizontalSnapInfo.posInfos.filter(({ pos }) => {
			return isBottom ? pos >= startY : pos <= startY;
		});
		verticalSnapInfo.isSnap = verticalSnapInfo.posInfos.length > 0;
		horizontalSnapInfo.isSnap = horizontalSnapInfo.posInfos.length > 0;
		const { isSnap: isVerticalSnap, guideline: verticalGuideline } = getNearestSnapGuidelineInfo(verticalSnapInfo);
		const { isSnap: isHorizontalSnap, guideline: horizontalGuideline } = getNearestSnapGuidelineInfo(horizontalSnapInfo);
		const horizontalPos = isHorizontalSnap ? horizontalGuideline.pos[1] : 0;
		const verticalPos = isVerticalSnap ? verticalGuideline.pos[0] : 0;
		if (dx === 0) {
			if (isHorizontalSnap) {
				horizontalInfo.isSnap = true;
				horizontalInfo.pos = horizontalGuideline.pos[1];
				horizontalInfo.offset = endY - horizontalInfo.pos;
			}
		} else if (dy === 0) {
			if (isVerticalSnap) {
				verticalInfo.isSnap = true;
				verticalInfo.pos = verticalPos;
				verticalInfo.offset = endX - verticalPos;
			}
		} else {
			const a = dy / dx;
			const b = endPos[1] - a * endX;
			let y = 0;
			let x = 0;
			let isSnap = false;
			if (isVerticalSnap) {
				x = verticalPos;
				y = a * x + b;
				isSnap = true;
			} else if (isHorizontalSnap) {
				y = horizontalPos;
				x = (y - b) / a;
				isSnap = true;
			}
			if (isSnap) {
				verticalInfo.isSnap = true;
				verticalInfo.pos = x;
				verticalInfo.offset = endX - x;
				horizontalInfo.isSnap = true;
				horizontalInfo.pos = y;
				horizontalInfo.offset = endY - y;
			}
		}
		return {
			vertical: verticalInfo,
			horizontal: horizontalInfo
		};
	}
	function getStringDirection(dir) {
		let stringDirection = "";
		if (dir === -1 || dir === "top" || dir === "left") stringDirection = "start";
		else if (dir === 0 || dir === "center" || dir === "middle") stringDirection = "center";
		else if (dir === 1 || dir === "right" || dir === "bottom") stringDirection = "end";
		return stringDirection;
	}
	function checkSnaps(moveable, rect, customSnapVerticalThreshold, customSnapHorizontalThreshold) {
		const poses = splitSnapDirectionPoses(moveable.props.snapDirections, rect);
		const result = checkMoveableSnapPoses(moveable, poses.vertical, poses.horizontal, poses.verticalNames.map((name) => getStringDirection(name)), poses.horizontalNames.map((name) => getStringDirection(name)), customSnapVerticalThreshold, customSnapHorizontalThreshold);
		const horizontalDirection = getStringDirection(poses.horizontalNames[result.horizontal.index]);
		const verticalDirection = getStringDirection(poses.verticalNames[result.vertical.index]);
		return {
			vertical: {
				...result.vertical,
				direction: verticalDirection
			},
			horizontal: {
				...result.horizontal,
				direction: horizontalDirection
			}
		};
	}
	function getNearestSnapGuidelineInfo(snapInfo) {
		const isSnap = snapInfo.isSnap;
		if (!isSnap) return {
			isSnap: false,
			offset: 0,
			dist: -1,
			pos: 0,
			guideline: null
		};
		const posInfo = snapInfo.posInfos[0];
		const guidelineInfo = posInfo.guidelineInfos[0];
		const offset = guidelineInfo.offset;
		const dist = guidelineInfo.dist;
		const guideline = guidelineInfo.guideline;
		return {
			isSnap,
			offset,
			dist,
			pos: posInfo.pos,
			guideline
		};
	}
	function checkSnap(guidelines, targetType, targetPoses, snapThreshold, dirs = []) {
		if (!guidelines || !guidelines.length) return {
			isSnap: false,
			index: -1,
			direction: "",
			posInfos: []
		};
		const posType = targetType === "vertical" ? 0 : 1;
		const snapPosInfos = targetPoses.map((targetPos, index) => {
			const direction = dirs[index] || "";
			return {
				pos: targetPos,
				index,
				guidelineInfos: guidelines.map((guideline) => {
					const { pos } = guideline;
					const offset = targetPos - pos[posType];
					return {
						offset,
						dist: abs(offset),
						guideline,
						direction
					};
				}).filter(({ guideline, dist }) => {
					const { type } = guideline;
					if (type !== targetType || dist > snapThreshold) return false;
					return true;
				}).sort((a, b) => a.dist - b.dist),
				direction
			};
		}).filter((snapPosInfo) => {
			return snapPosInfo.guidelineInfos.length > 0;
		}).sort((a, b) => {
			return a.guidelineInfos[0].dist - b.guidelineInfos[0].dist;
		});
		const isSnap = snapPosInfos.length > 0;
		return {
			isSnap,
			index: isSnap ? snapPosInfos[0].index : -1,
			direction: snapPosInfos[0]?.direction ?? "",
			posInfos: snapPosInfos
		};
	}
	function getSnapInfosByDirection(moveable, poses, snapDirection, customSnapVerticalThreshold, customSnapHorizontalThreshold) {
		let dirs = [];
		if (snapDirection[0] && snapDirection[1]) dirs = [
			snapDirection,
			[-snapDirection[0], snapDirection[1]],
			[snapDirection[0], -snapDirection[1]]
		];
		else if (!snapDirection[0] && !snapDirection[1]) [
			[-1, -1],
			[1, -1],
			[1, 1],
			[-1, 1]
		].forEach((dir, i, arr) => {
			const nextDir = arr[i + 1] || arr[0];
			dirs.push(dir);
			dirs.push([(dir[0] + nextDir[0]) / 2, (dir[1] + nextDir[1]) / 2]);
		});
		else if (moveable.props.keepRatio) dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1], snapDirection);
		else {
			dirs.push(...getPosesByDirection([
				[-1, -1],
				[1, -1],
				[-1, -1],
				[1, 1]
			], snapDirection));
			if (dirs.length > 1) dirs.push([(dirs[0][0] + dirs[1][0]) / 2, (dirs[0][1] + dirs[1][1]) / 2]);
		}
		const nextPoses = dirs.map((dir) => getPosByDirection(poses, dir));
		const result = checkMoveableSnapPoses(moveable, nextPoses.map((pos) => pos[0]), nextPoses.map((pos) => pos[1]), dirs.map((dir) => getStringDirection(dir[0])), dirs.map((dir) => getStringDirection(dir[1])), customSnapVerticalThreshold, customSnapHorizontalThreshold);
		const verticalDirection = getStringDirection(dirs.map((dir) => dir[0])[result.vertical.index]);
		const horizontalDirection = getStringDirection(dirs.map((dir) => dir[1])[result.horizontal.index]);
		return {
			vertical: {
				...result.vertical,
				direction: verticalDirection
			},
			horizontal: {
				...result.horizontal,
				direction: horizontalDirection
			}
		};
	}
	function checkSnapBoundPriority(a, b) {
		const aDist = abs(a.offset);
		const bDist = abs(b.offset);
		if (a.isBound && b.isBound) return bDist - aDist;
		else if (a.isBound) return -1;
		else if (b.isBound) return 1;
		else if (a.isSnap && b.isSnap) return bDist - aDist;
		else if (a.isSnap) return -1;
		else if (b.isSnap) return 1;
		else if (aDist < 1e-7) return 1;
		else if (bDist < 1e-7) return -1;
		return aDist - bDist;
	}
	function getNearOffsetInfo(offsets, index) {
		return offsets.slice().sort((a, b) => {
			const aSign = a.sign[index];
			const bSign = b.sign[index];
			const aOffset = a.offset[index];
			const bOffset = b.offset[index];
			if (!aSign) return 1;
			else if (!bSign) return -1;
			return checkSnapBoundPriority({
				isBound: a.isBound,
				isSnap: a.isSnap,
				offset: aOffset
			}, {
				isBound: b.isBound,
				isSnap: b.isSnap,
				offset: bOffset
			});
		})[0];
	}
	function getCheckSnapDirections(direction, fixedDirection, keepRatio) {
		const directions = [];
		if (keepRatio) {
			if (abs(fixedDirection[0]) !== 1 || abs(fixedDirection[1]) !== 1) directions.push([fixedDirection, [-1, -1]], [fixedDirection, [-1, 1]], [fixedDirection, [1, -1]], [fixedDirection, [1, 1]]);
			else directions.push([fixedDirection, [direction[0], -direction[1]]], [fixedDirection, [-direction[0], direction[1]]]);
			directions.push([fixedDirection, direction]);
		} else if (direction[0] && direction[1] || !direction[0] && !direction[1]) {
			const endDirection = direction[0] ? direction : [1, 1];
			[1, -1].forEach((signX) => {
				[1, -1].forEach((signY) => {
					const nextDirection = [signX * endDirection[0], signY * endDirection[1]];
					if (fixedDirection[0] === nextDirection[0] && fixedDirection[1] === nextDirection[1]) return;
					directions.push([fixedDirection, nextDirection]);
				});
			});
		} else if (direction[0]) (abs(fixedDirection[0]) === 1 ? [1] : [1, -1]).forEach((sign) => {
			directions.push([[fixedDirection[0], -1], [sign * direction[0], -1]], [[fixedDirection[0], 0], [sign * direction[0], 0]], [[fixedDirection[0], 1], [sign * direction[0], 1]]);
		});
		else if (direction[1]) (abs(fixedDirection[1]) === 1 ? [1] : [1, -1]).forEach((sign) => {
			directions.push([[-1, fixedDirection[1]], [-1, sign * direction[1]]], [[0, fixedDirection[1]], [0, sign * direction[1]]], [[1, fixedDirection[1]], [1, sign * direction[1]]]);
		});
		return directions;
	}
	function isStartLine(dot, line) {
		const cx = average([line[0][0], line[1][0]]);
		const cy = average([line[0][1], line[1][1]]);
		return {
			vertical: cx <= dot[0],
			horizontal: cy <= dot[1]
		};
	}
	function hitTestLine(dot, [pos1, pos2]) {
		let dx = pos2[0] - pos1[0];
		let dy = pos2[1] - pos1[1];
		if (abs(dx) < 1e-7) dx = 0;
		if (abs(dy) < 1e-7) dy = 0;
		let test1;
		let test2;
		if (!dx) {
			test1 = pos1[0];
			test2 = dot[0];
		} else if (!dy) {
			test1 = pos1[1];
			test2 = dot[1];
		} else {
			test1 = dy / dx * (dot[0] - pos1[0]) + pos1[1];
			test2 = dot[1];
		}
		return test1 - test2;
	}
	function isSameStartLine(dots, line, centerSign, error = TINY_NUM$1) {
		return dots.every((dot) => {
			const value = hitTestLine(dot, line);
			return value <= 0 === centerSign || abs(value) <= error;
		});
	}
	function checkInnerBoundDot(pos, start, end, isStart, threshold = 0) {
		if (isStart && start - threshold <= pos || !isStart && pos <= end + threshold) return {
			isBound: true,
			offset: isStart ? start - pos : end - pos
		};
		return {
			isBound: false,
			offset: 0
		};
	}
	function checkInnerBound(moveable, { line, centerSign, verticalSign, horizontalSign, lineConstants }) {
		const bounds = moveable.props.innerBounds;
		if (!bounds) return {
			isAllBound: false,
			isBound: false,
			isVerticalBound: false,
			isHorizontalBound: false,
			offset: [0, 0]
		};
		const { left, top, width, height } = bounds;
		const leftLine = [[left, top], [left, top + height]];
		const topLine = [[left, top], [left + width, top]];
		const rightLine = [[left + width, top], [left + width, top + height]];
		const bottomLine = [[left, top + height], [left + width, top + height]];
		if (isSameStartLine([
			[left, top],
			[left + width, top],
			[left, top + height],
			[left + width, top + height]
		], line, centerSign)) return {
			isAllBound: false,
			isBound: false,
			isVerticalBound: false,
			isHorizontalBound: false,
			offset: [0, 0]
		};
		const topBoundInfo = checkLineBoundCollision(line, lineConstants, topLine, verticalSign);
		const bottomBoundInfo = checkLineBoundCollision(line, lineConstants, bottomLine, verticalSign);
		const leftBoundInfo = checkLineBoundCollision(line, lineConstants, leftLine, horizontalSign);
		const rightBoundInfo = checkLineBoundCollision(line, lineConstants, rightLine, horizontalSign);
		const isAllVerticalBound = topBoundInfo.isBound && bottomBoundInfo.isBound;
		const isVerticalBound = topBoundInfo.isBound || bottomBoundInfo.isBound;
		const isAllHorizontalBound = leftBoundInfo.isBound && rightBoundInfo.isBound;
		const isHorizontalBound = leftBoundInfo.isBound || rightBoundInfo.isBound;
		const verticalOffset = maxOffset(topBoundInfo.offset, bottomBoundInfo.offset);
		const horizontalOffset = maxOffset(leftBoundInfo.offset, rightBoundInfo.offset);
		let offset;
		let isBound;
		let isAllBound;
		if (abs(horizontalOffset) < abs(verticalOffset)) {
			offset = [verticalOffset, 0];
			isBound = isVerticalBound;
			isAllBound = isAllVerticalBound;
		} else {
			offset = [0, horizontalOffset];
			isBound = isHorizontalBound;
			isAllBound = isAllHorizontalBound;
		}
		return {
			isAllBound,
			isVerticalBound,
			isHorizontalBound,
			isBound,
			offset
		};
	}
	function checkLineBoundCollision(line, [a, b], boundLine, isStart, threshold, isRender) {
		const dot1 = line[0];
		const boundDot1 = boundLine[0];
		const boundDot2 = boundLine[1];
		const dy2 = getTinyDist(boundDot2[1] - boundDot1[1]);
		const dx2 = getTinyDist(boundDot2[0] - boundDot1[0]);
		const hasDx = b;
		const hasDy = a;
		const slope = -a / b;
		if (!dx2) {
			if (isRender && !hasDy) return {
				isBound: false,
				offset: 0
			};
			else if (hasDx) return checkInnerBoundDot(slope * (boundDot1[0] - dot1[0]) + dot1[1], boundDot1[1], boundDot2[1], isStart, threshold);
			else {
				const offset = boundDot1[0] - dot1[0];
				const isBound = abs(offset) <= (threshold || 0);
				return {
					isBound,
					offset: isBound ? offset : 0
				};
			}
		} else if (!dy2) {
			if (isRender && !hasDx) return {
				isBound: false,
				offset: 0
			};
			else if (hasDy) return checkInnerBoundDot((boundDot1[1] - dot1[1]) / slope + dot1[0], boundDot1[0], boundDot2[0], isStart, threshold);
			else {
				const offset = boundDot1[1] - dot1[1];
				const isBound = abs(offset) <= (threshold || 0);
				return {
					isBound,
					offset: isBound ? offset : 0
				};
			}
		}
		return {
			isBound: false,
			offset: 0
		};
	}
	function getInnerBoundInfo(moveable, lineInfos, datas) {
		return lineInfos.map((info) => {
			const { isBound, offset, isVerticalBound, isHorizontalBound } = checkInnerBound(moveable, info);
			const multiple = info.multiple;
			return {
				sign: multiple,
				isBound,
				isVerticalBound,
				isHorizontalBound,
				isSnap: false,
				offset: getDragDist({
					datas,
					distX: offset[0],
					distY: offset[1]
				}).map((size, i) => size * (multiple[i] ? 2 / multiple[i] : 0))
			};
		});
	}
	function getInnerBoundDragInfo(moveable, poses, datas) {
		const innerBoundInfo = getInnerBoundInfo(moveable, getCheckInnerBoundLineInfos(moveable, poses, [0, 0], false).map((info) => {
			return {
				...info,
				multiple: info.multiple.map((dir) => abs(dir) * 2)
			};
		}), datas);
		const widthOffsetInfo = getNearOffsetInfo(innerBoundInfo, 0);
		const heightOffsetInfo = getNearOffsetInfo(innerBoundInfo, 1);
		let verticalOffset = 0;
		let horizontalOffset = 0;
		const isVerticalBound = widthOffsetInfo.isVerticalBound || heightOffsetInfo.isVerticalBound;
		const isHorizontalBound = widthOffsetInfo.isHorizontalBound || heightOffsetInfo.isHorizontalBound;
		if (isVerticalBound || isHorizontalBound) [verticalOffset, horizontalOffset] = getInverseDragDist({
			datas,
			distX: -widthOffsetInfo.offset[0],
			distY: -heightOffsetInfo.offset[1]
		});
		return {
			vertical: {
				isBound: isVerticalBound,
				offset: verticalOffset
			},
			horizontal: {
				isBound: isHorizontalBound,
				offset: horizontalOffset
			}
		};
	}
	function getCheckSnapLineDirections(direction, keepRatio) {
		const lineDirections = [];
		const x = direction[0];
		const y = direction[1];
		if (x && y) lineDirections.push([
			[0, y * 2],
			direction,
			[-x, y]
		], [
			[x * 2, 0],
			direction,
			[x, -y]
		]);
		else if (x) {
			lineDirections.push([
				[x * 2, 0],
				[x, 1],
				[x, -1]
			]);
			if (keepRatio) lineDirections.push([
				[0, -1],
				[x, -1],
				[-x, -1]
			], [
				[0, 1],
				[x, 1],
				[-x, 1]
			]);
		} else if (y) {
			lineDirections.push([
				[0, y * 2],
				[1, y],
				[-1, y]
			]);
			if (keepRatio) lineDirections.push([
				[-1, 0],
				[-1, y],
				[-1, -y]
			], [
				[1, 0],
				[1, y],
				[1, -y]
			]);
		} else lineDirections.push([
			[-1, 0],
			[-1, -1],
			[-1, 1]
		], [
			[1, 0],
			[1, -1],
			[1, 1]
		], [
			[0, -1],
			[-1, -1],
			[1, -1]
		], [
			[0, 1],
			[-1, 1],
			[1, 1]
		]);
		return lineDirections;
	}
	function getCheckInnerBoundLineInfos(moveable, poses, direction, keepRatio) {
		const { allMatrix, is3d } = moveable.state;
		const virtualPoses = calculatePoses(allMatrix, 100, 100, is3d ? 4 : 3);
		const center = getPosByDirection(virtualPoses, [0, 0]);
		return getCheckSnapLineDirections(direction, keepRatio).map(([multiple, dir1, dir2]) => {
			const virtualLine = [getPosByDirection(virtualPoses, dir1), getPosByDirection(virtualPoses, dir2)];
			const lineConstants = solveLineConstants(virtualLine);
			const { vertical: verticalSign, horizontal: horizontalSign } = isStartLine(center, virtualLine);
			return {
				multiple,
				centerSign: hitTestLine(center, virtualLine) <= 0,
				verticalSign,
				horizontalSign,
				lineConstants,
				line: [getPosByDirection(poses, dir1), getPosByDirection(poses, dir2)]
			};
		});
	}
	function isBoundRotate(relativePoses, boundDots, center, rad) {
		const nextPoses = rad ? relativePoses.map((pos) => rotate(pos, rad)) : relativePoses;
		return [
			[nextPoses[0], nextPoses[1]],
			[nextPoses[1], nextPoses[3]],
			[nextPoses[3], nextPoses[2]],
			[nextPoses[2], nextPoses[0]]
		].some((line) => {
			return !isSameStartLine(boundDots, line, hitTestLine(center, line) <= 0);
		});
	}
	function getDistPointLine([pos1, pos2]) {
		const dx = pos2[0] - pos1[0];
		const dy = pos2[1] - pos1[1];
		if (!dx) return abs(pos1[0]);
		if (!dy) return abs(pos1[1]);
		const a = dy / dx;
		return abs((-a * pos1[0] + pos1[1]) / Math.sqrt(Math.pow(a, 2) + 1));
	}
	function solveReverseLine([pos1, pos2]) {
		const dx = pos2[0] - pos1[0];
		const dy = pos2[1] - pos1[1];
		if (!dx) return [pos1[0], 0];
		if (!dy) return [0, pos1[1]];
		const a = dy / dx;
		const b = -a * pos1[0] + pos1[1];
		return [-b / (a + 1 / a), b / (a * a + 1)];
	}
	function checkRotateInnerBounds(moveable, prevPoses, nextPoses, origin, rotation) {
		const bounds = moveable.props.innerBounds;
		const rad = rotation * Math.PI / 180;
		if (!bounds) return [];
		const { left, top, width, height } = bounds;
		const relativeLeft = left - origin[0];
		const relativeRight = left + width - origin[0];
		const relativeTop = top - origin[1];
		const relativeBottom = top + height - origin[1];
		const dots = [
			[relativeLeft, relativeTop],
			[relativeRight, relativeTop],
			[relativeLeft, relativeBottom],
			[relativeRight, relativeBottom]
		];
		const center = getPosByDirection(nextPoses, [0, 0]);
		if (!isBoundRotate(nextPoses, dots, center, 0)) return [];
		const result = [];
		const dotInfos = dots.map((dot) => [getDistSize(dot), getRad$1([0, 0], dot)]);
		[
			[nextPoses[0], nextPoses[1]],
			[nextPoses[1], nextPoses[3]],
			[nextPoses[3], nextPoses[2]],
			[nextPoses[2], nextPoses[0]]
		].forEach((line) => {
			const lineRad = getRad$1([0, 0], solveReverseLine(line));
			const lineDist = getDistPointLine(line);
			result.push(...dotInfos.filter(([dotDist]) => {
				return dotDist && lineDist <= dotDist;
			}).map(([dotDist, dotRad]) => {
				const distRad = Math.acos(dotDist ? lineDist / dotDist : 0);
				const nextRad1 = dotRad + distRad;
				const nextRad2 = dotRad - distRad;
				return [rad + nextRad1 - lineRad, rad + nextRad2 - lineRad];
			}).reduce((prev, cur) => {
				prev.push(...cur);
				return prev;
			}, []).filter((nextRad) => !isBoundRotate(prevPoses, dots, center, nextRad)).map((nextRad) => throttle(nextRad * 180 / Math.PI, TINY_NUM$1)));
		});
		return result;
	}
	function checkInnerBoundPoses(moveable) {
		const innerBounds = moveable.props.innerBounds;
		const boundMap = getInitialBounds();
		if (!innerBounds) return {
			boundMap,
			vertical: [],
			horizontal: []
		};
		const { pos1, pos2, pos3, pos4 } = moveable.getRect();
		const poses = [
			pos1,
			pos2,
			pos3,
			pos4
		];
		const center = getPosByDirection(poses, [0, 0]);
		const { left, top, width, height } = innerBounds;
		const leftLine = [[left, top], [left, top + height]];
		const topLine = [[left, top], [left + width, top]];
		const rightLine = [[left + width, top], [left + width, top + height]];
		const bottomLine = [[left, top + height], [left + width, top + height]];
		const lineInfos = getCheckInnerBoundLineInfos(moveable, poses, [0, 0], false);
		const horizontalPoses = [];
		const verticalPoses = [];
		lineInfos.forEach((lineInfo) => {
			const { line, lineConstants } = lineInfo;
			const { horizontal: isHorizontalStart, vertical: isVerticalStart } = isStartLine(center, line);
			const topBoundInfo = checkLineBoundCollision(line, lineConstants, topLine, isVerticalStart, 1, true);
			const bottomBoundInfo = checkLineBoundCollision(line, lineConstants, bottomLine, isVerticalStart, 1, true);
			const leftBoundInfo = checkLineBoundCollision(line, lineConstants, leftLine, isHorizontalStart, 1, true);
			const rightBoundInfo = checkLineBoundCollision(line, lineConstants, rightLine, isHorizontalStart, 1, true);
			if (topBoundInfo.isBound && !boundMap.top) {
				horizontalPoses.push(top);
				boundMap.top = true;
			}
			if (bottomBoundInfo.isBound && !boundMap.bottom) {
				horizontalPoses.push(top + height);
				boundMap.bottom = true;
			}
			if (leftBoundInfo.isBound && !boundMap.left) {
				verticalPoses.push(left);
				boundMap.left = true;
			}
			if (rightBoundInfo.isBound && !boundMap.right) {
				verticalPoses.push(left + width);
				boundMap.right = true;
			}
		});
		return {
			boundMap,
			horizontal: horizontalPoses,
			vertical: verticalPoses
		};
	}
	function solveEquation(pos1, pos2, snapOffset, isVertical) {
		let dx = pos2[0] - pos1[0];
		let dy = pos2[1] - pos1[1];
		if (abs(dx) < 1e-7) dx = 0;
		if (abs(dy) < 1e-7) dy = 0;
		if (!dx) {
			if (!isVertical) return [0, snapOffset];
			return [0, 0];
		}
		if (!dy) {
			if (isVertical) return [snapOffset, 0];
			return [0, 0];
		}
		const a = dy / dx;
		const b = pos1[1] - a * pos1[0];
		if (isVertical) return [snapOffset, a * (pos2[0] + snapOffset) + b - pos2[1]];
		else return [(pos2[1] + snapOffset - b) / a - pos2[0], snapOffset];
	}
	function solveNextOffset(pos1, pos2, offset, isVertical, datas) {
		const sizeOffset = solveEquation(pos1, pos2, offset, isVertical);
		if (!sizeOffset) return {
			isOutside: false,
			offset: [0, 0]
		};
		const size = getDist$2(pos1, pos2);
		const dist1 = getDist$2(sizeOffset, pos1);
		const dist2 = getDist$2(sizeOffset, pos2);
		const isOutside = dist1 > size || dist2 > size;
		const [widthOffset, heightOffset] = getDragDist({
			datas,
			distX: sizeOffset[0],
			distY: sizeOffset[1]
		});
		return {
			offset: [widthOffset, heightOffset],
			isOutside
		};
	}
	function getSnapBound(boundInfo, snapInfo) {
		if (boundInfo.isBound) return boundInfo.offset;
		else if (snapInfo.isSnap) return getNearestSnapGuidelineInfo(snapInfo).offset;
		return 0;
	}
	function checkThrottleDragRotate(throttleDragRotate, [distX, distY], [isVerticalBound, isHorizontalBound], [isVerticalSnap, isHorizontalSnap], [verticalOffset, horizontalOffset]) {
		let offsetX;
		let offsetY;
		if (throttleDragRotate && distX && distY) {
			offsetX = 0;
			offsetY = 0;
			const adjustPoses = [];
			if (isVerticalBound && isHorizontalBound) adjustPoses.push([0, horizontalOffset], [verticalOffset, 0]);
			else if (isVerticalBound) adjustPoses.push([verticalOffset, 0]);
			else if (isHorizontalBound) adjustPoses.push([0, horizontalOffset]);
			else if (isVerticalSnap && isHorizontalSnap) adjustPoses.push([0, horizontalOffset], [verticalOffset, 0]);
			else if (isVerticalSnap) adjustPoses.push([verticalOffset, 0]);
			else if (isHorizontalSnap) adjustPoses.push([0, horizontalOffset]);
			if (adjustPoses.length) {
				adjustPoses.sort((a, b) => {
					return getDistSize(minus([distX, distY], a)) - getDistSize(minus([distX, distY], b));
				});
				const adjustPos = adjustPoses[0];
				if (adjustPos[0] && abs(distX) > 1e-7) {
					offsetX = -adjustPos[0];
					offsetY = distY * abs(distX + offsetX) / abs(distX) - distY;
				} else if (adjustPos[1] && abs(distY) > 1e-7) {
					const prevDistY = distY;
					offsetY = -adjustPos[1];
					offsetX = distX * abs(distY + offsetY) / abs(prevDistY) - distX;
				}
				if (throttleDragRotate && isHorizontalBound && isVerticalBound) {
					if (abs(offsetX) > 1e-7 && abs(offsetX) < abs(verticalOffset)) {
						const scale = abs(verticalOffset) / abs(offsetX);
						offsetX *= scale;
						offsetY *= scale;
					} else if (abs(offsetY) > 1e-7 && abs(offsetY) < abs(horizontalOffset)) {
						const scale = abs(horizontalOffset) / abs(offsetY);
						offsetX *= scale;
						offsetY *= scale;
					} else {
						offsetX = maxOffset(-verticalOffset, offsetX);
						offsetY = maxOffset(-horizontalOffset, offsetY);
					}
				}
			}
		} else {
			offsetX = distX || isVerticalBound ? -verticalOffset : 0;
			offsetY = distY || isHorizontalBound ? -horizontalOffset : 0;
		}
		return [offsetX, offsetY];
	}
	function checkSnapBoundsDrag(moveable, distX, distY, throttleDragRotate, ignoreSnap, datas) {
		if (!hasGuidelines(moveable, "draggable")) return [{
			isSnap: false,
			isBound: false,
			offset: 0
		}, {
			isSnap: false,
			isBound: false,
			offset: 0
		}];
		const poses = getAbsolutePoses(datas.absolutePoses, [distX, distY]);
		const { left, right, top, bottom } = getRect(poses);
		const boundPoses = {
			horizontal: poses.map((pos) => pos[1]),
			vertical: poses.map((pos) => pos[0])
		};
		const { vertical: verticalSnapBoundInfo, horizontal: horizontalSnapBoundInfo } = checkMoveableSnapBounds(moveable, ignoreSnap, splitSnapDirectionPoses(getSnapDirections(moveable.props.snapDirections), {
			left,
			right,
			top,
			bottom,
			center: (left + right) / 2,
			middle: (top + bottom) / 2
		}), boundPoses);
		const { vertical: verticalInnerBoundInfo, horizontal: horizontalInnerBoundInfo } = getInnerBoundDragInfo(moveable, poses, datas);
		const isVerticalSnap = verticalSnapBoundInfo.isSnap;
		const isHorizontalSnap = horizontalSnapBoundInfo.isSnap;
		const isVerticalBound = verticalSnapBoundInfo.isBound || verticalInnerBoundInfo.isBound;
		const isHorizontalBound = horizontalSnapBoundInfo.isBound || horizontalInnerBoundInfo.isBound;
		const verticalOffset = maxOffset(verticalSnapBoundInfo.offset, verticalInnerBoundInfo.offset);
		const horizontalOffset = maxOffset(horizontalSnapBoundInfo.offset, horizontalInnerBoundInfo.offset);
		const [offsetX, offsetY] = checkThrottleDragRotate(throttleDragRotate, [distX, distY], [isVerticalBound, isHorizontalBound], [isVerticalSnap, isHorizontalSnap], [verticalOffset, horizontalOffset]);
		return [{
			isBound: isVerticalBound,
			isSnap: isVerticalSnap,
			offset: offsetX
		}, {
			isBound: isHorizontalBound,
			isSnap: isHorizontalSnap,
			offset: offsetY
		}];
	}
	function checkMoveableSnapBounds(moveable, ignoreSnap, poses, boundPoses = poses) {
		const { horizontal: horizontalBoundInfos, vertical: verticalBoundInfos } = checkBoundPoses(getBounds(moveable), boundPoses.vertical, boundPoses.horizontal);
		const { horizontal: horizontalSnapInfo, vertical: verticalSnapInfo } = ignoreSnap ? {
			horizontal: {
				isSnap: false,
				index: -1
			},
			vertical: {
				isSnap: false,
				index: -1
			}
		} : checkMoveableSnapPoses(moveable, poses.vertical, poses.horizontal, void 0, void 0, void 0, void 0);
		const horizontalOffset = getSnapBound(horizontalBoundInfos[0], horizontalSnapInfo);
		const verticalOffset = getSnapBound(verticalBoundInfos[0], verticalSnapInfo);
		const horizontalDist = abs(horizontalOffset);
		const verticalDist = abs(verticalOffset);
		return {
			horizontal: {
				isBound: horizontalBoundInfos[0].isBound,
				isSnap: horizontalSnapInfo.isSnap,
				snapIndex: horizontalSnapInfo.index,
				offset: horizontalOffset,
				dist: horizontalDist,
				bounds: horizontalBoundInfos,
				snap: horizontalSnapInfo
			},
			vertical: {
				isBound: verticalBoundInfos[0].isBound,
				isSnap: verticalSnapInfo.isSnap,
				snapIndex: verticalSnapInfo.index,
				offset: verticalOffset,
				dist: verticalDist,
				bounds: verticalBoundInfos,
				snap: verticalSnapInfo
			}
		};
	}
	function checkSnapBounds(guideines, bounds, posesX, posesY, snapHorizontalThreshold, snapVerticalThreshold, multiples = [1, 1]) {
		const { horizontal: horizontalBoundInfos, vertical: verticalBoundInfos } = checkBoundPoses(bounds, posesX, posesY);
		const { horizontal: horizontalSnapInfo, vertical: verticalSnapInfo } = checkSnapPoses(guideines, posesX, posesY, [], [], snapHorizontalThreshold, snapVerticalThreshold, multiples);
		const horizontalOffset = getSnapBound(horizontalBoundInfos[0], horizontalSnapInfo);
		const verticalOffset = getSnapBound(verticalBoundInfos[0], verticalSnapInfo);
		const horizontalDist = abs(horizontalOffset);
		const verticalDist = abs(verticalOffset);
		return {
			horizontal: {
				isBound: horizontalBoundInfos[0].isBound,
				isSnap: horizontalSnapInfo.isSnap,
				snapIndex: horizontalSnapInfo.index,
				offset: horizontalOffset,
				dist: horizontalDist,
				bounds: horizontalBoundInfos,
				snap: horizontalSnapInfo
			},
			vertical: {
				isBound: verticalBoundInfos[0].isBound,
				isSnap: verticalSnapInfo.isSnap,
				snapIndex: verticalSnapInfo.index,
				offset: verticalOffset,
				dist: verticalDist,
				bounds: verticalBoundInfos,
				snap: verticalSnapInfo
			}
		};
	}
	function checkSnapRightLine(startPos, endPos, snapBoundInfo, keepRatio) {
		const rad = getRad$1(startPos, endPos) / Math.PI * 180;
		const { vertical: { isBound: isVerticalBound, isSnap: isVerticalSnap, dist: verticalDist }, horizontal: { isBound: isHorizontalBound, isSnap: isHorizontalSnap, dist: horizontalDist } } = snapBoundInfo;
		const rad180 = rad % 180;
		const isHorizontalLine = rad180 < 3 || rad180 > 177;
		const isVerticalLine = rad180 > 87 && rad180 < 93;
		if (horizontalDist < verticalDist) {
			if (isVerticalBound || isVerticalSnap && !isVerticalLine && (!keepRatio || !isHorizontalLine)) return "vertical";
		}
		if (isHorizontalBound || isHorizontalSnap && !isHorizontalLine && (!keepRatio || !isVerticalLine)) return "horizontal";
		return "";
	}
	function getSnapBoundInfo(moveable, poses, directions, keepRatio, isRequest, datas) {
		return directions.map(([startDirection, endDirection]) => {
			const otherStartPos = getPosByDirection(poses, startDirection);
			const otherEndPos = getPosByDirection(poses, endDirection);
			const snapBoundInfo = keepRatio ? checkSnapBoundsKeepRatio(moveable, otherStartPos, otherEndPos, isRequest) : checkMoveableSnapBounds(moveable, isRequest, {
				vertical: [otherEndPos[0]],
				horizontal: [otherEndPos[1]]
			});
			const { horizontal: { offset: otherHorizontalOffset, isBound: isOtherHorizontalBound, isSnap: isOtherHorizontalSnap }, vertical: { offset: otherVerticalOffset, isBound: isOtherVerticalBound, isSnap: isOtherVerticalSnap } } = snapBoundInfo;
			const multiple = minus(endDirection, startDirection);
			if (!otherVerticalOffset && !otherHorizontalOffset) return {
				isBound: isOtherVerticalBound || isOtherHorizontalBound,
				isSnap: isOtherVerticalSnap || isOtherHorizontalSnap,
				sign: multiple,
				offset: [0, 0]
			};
			const snapLine = checkSnapRightLine(otherStartPos, otherEndPos, snapBoundInfo, keepRatio);
			if (!snapLine) return {
				sign: multiple,
				isBound: false,
				isSnap: false,
				offset: [0, 0]
			};
			const isVertical = snapLine === "vertical";
			let sizeOffset;
			if (!keepRatio && abs(endDirection[0]) === 1 && abs(endDirection[1]) === 1 && startDirection[0] !== endDirection[0] && startDirection[1] !== endDirection[1]) sizeOffset = getDragDist({
				datas,
				distX: -otherVerticalOffset,
				distY: -otherHorizontalOffset
			});
			else sizeOffset = solveNextOffset(otherStartPos, otherEndPos, -(isVertical ? otherVerticalOffset : otherHorizontalOffset), isVertical, datas).offset;
			sizeOffset = sizeOffset.map((size, i) => size * (multiple[i] ? 2 / multiple[i] : 0));
			return {
				sign: multiple,
				isBound: isVertical ? isOtherVerticalBound : isOtherHorizontalBound,
				isSnap: isVertical ? isOtherVerticalSnap : isOtherHorizontalSnap,
				offset: sizeOffset
			};
		});
	}
	function getSnapBoundOffset(boundInfo, snapInfo) {
		if (boundInfo.isBound) return boundInfo.offset;
		else if (snapInfo.isSnap) return snapInfo.offset;
		return 0;
	}
	function checkSnapBoundsKeepRatio(moveable, startPos, endPos, isRequest) {
		const { horizontal: horizontalBoundInfo, vertical: verticalBoundInfo } = checkBoundKeepRatio(moveable, startPos, endPos);
		const { horizontal: horizontalSnapInfo, vertical: verticalSnapInfo } = isRequest ? {
			horizontal: { isSnap: false },
			vertical: { isSnap: false }
		} : checkSnapKeepRatio(moveable, startPos, endPos);
		const horizontalOffset = getSnapBoundOffset(horizontalBoundInfo, horizontalSnapInfo);
		const verticalOffset = getSnapBoundOffset(verticalBoundInfo, verticalSnapInfo);
		const horizontalDist = abs(horizontalOffset);
		const verticalDist = abs(verticalOffset);
		return {
			horizontal: {
				isBound: horizontalBoundInfo.isBound,
				isSnap: horizontalSnapInfo.isSnap,
				offset: horizontalOffset,
				dist: horizontalDist
			},
			vertical: {
				isBound: verticalBoundInfo.isBound,
				isSnap: verticalSnapInfo.isSnap,
				offset: verticalOffset,
				dist: verticalDist
			}
		};
	}
	function checkMaxBounds(moveable, poses, direction, fixedPosition, datas) {
		const fixedDirection = [-direction[0], -direction[1]];
		const { width, height } = moveable.state;
		const bounds = moveable.props.bounds;
		let maxWidth = Infinity;
		let maxHeight = Infinity;
		if (bounds) {
			const directions = [[direction[0], -direction[1]], [-direction[0], direction[1]]];
			const { left = -Infinity, top = -Infinity, right = Infinity, bottom = Infinity } = bounds;
			directions.forEach((otherDirection) => {
				const isCheckVertical = otherDirection[0] !== fixedDirection[0];
				const isCheckHorizontal = otherDirection[1] !== fixedDirection[1];
				const otherPos = getPosByDirection(poses, otherDirection);
				const deg = getRad$1(fixedPosition, otherPos) * 360 / Math.PI;
				if (isCheckHorizontal) {
					const nextOtherPos = otherPos.slice();
					if (abs(deg - 360) < 2 || abs(deg - 180) < 2) nextOtherPos[1] = fixedPosition[1];
					const { offset: [, heightOffset], isOutside: isHeightOutside } = solveNextOffset(fixedPosition, nextOtherPos, (fixedPosition[1] < otherPos[1] ? bottom : top) - otherPos[1], false, datas);
					if (!isNaN(heightOffset)) maxHeight = height + (isHeightOutside ? 1 : -1) * abs(heightOffset);
				}
				if (isCheckVertical) {
					const nextOtherPos = otherPos.slice();
					if (abs(deg - 90) < 2 || abs(deg - 270) < 2) nextOtherPos[0] = fixedPosition[0];
					const { offset: [widthOffset], isOutside: isWidthOutside } = solveNextOffset(fixedPosition, nextOtherPos, (fixedPosition[0] < otherPos[0] ? right : left) - otherPos[0], true, datas);
					if (!isNaN(widthOffset)) maxWidth = width + (isWidthOutside ? 1 : -1) * abs(widthOffset);
				}
			});
		}
		return {
			maxWidth,
			maxHeight
		};
	}
	/**
	* @namespace Draggable
	* @memberof Moveable
	* @description Draggable refers to the ability to drag and move targets.
	*/
	var Draggable_default = {
		name: "draggable",
		props: [
			"draggable",
			"throttleDrag",
			"throttleDragRotate",
			"hideThrottleDragRotateLine",
			"startDragRotate",
			"edgeDraggable"
		],
		events: [
			"dragStart",
			"drag",
			"dragEnd",
			"dragGroupStart",
			"dragGroup",
			"dragGroupEnd"
		],
		requestStyle() {
			return [
				"left",
				"top",
				"right",
				"bottom"
			];
		},
		requestChildStyle() {
			return [
				"left",
				"top",
				"right",
				"bottom"
			];
		},
		render(moveable, React) {
			const { hideThrottleDragRotateLine, throttleDragRotate, zoom } = moveable.props;
			const { dragInfo, beforeOrigin } = moveable.getState();
			if (hideThrottleDragRotateLine || !throttleDragRotate || !dragInfo) return [];
			const dist = dragInfo.dist;
			if (!dist[0] && !dist[1]) return [];
			const width = getDistSize(dist);
			const rad = getRad$1(dist, [0, 0]);
			return [/* @__PURE__ */ React.createElement("div", {
				className: prefix("line", "horizontal", "dragline", "dashed"),
				key: `dragRotateGuideline`,
				style: {
					width: `${width}px`,
					transform: `translate(${beforeOrigin[0]}px, ${beforeOrigin[1]}px) rotate(${rad}rad) scaleY(${zoom})`
				}
			})];
		},
		dragStart(moveable, e) {
			const { datas, parentEvent, parentGesto } = e;
			const { gestos, style } = moveable.state;
			if (gestos.draggable) return false;
			gestos.draggable = parentGesto || moveable.targetGesto;
			datas.datas = {};
			datas.left = parseFloat(style.left || "") || 0;
			datas.top = parseFloat(style.top || "") || 0;
			datas.bottom = parseFloat(style.bottom || "") || 0;
			datas.right = parseFloat(style.right || "") || 0;
			datas.startValue = [0, 0];
			setDragStart(moveable, e);
			setDefaultTransformIndex(moveable, e, "translate");
			startCheckSnapDrag(moveable, datas);
			datas.prevDist = [0, 0];
			datas.prevBeforeDist = [0, 0];
			datas.isDrag = false;
			datas.deltaOffset = [0, 0];
			const params = fillParams(moveable, e, {
				set: (translate) => {
					datas.startValue = translate;
				},
				...fillTransformStartEvent(moveable, e)
			});
			if ((parentEvent || triggerEvent(moveable, "onDragStart", params)) !== false) {
				datas.isDrag = true;
				moveable.state.dragInfo = {
					startRect: moveable.getRect(),
					dist: [0, 0]
				};
			} else {
				gestos.draggable = null;
				datas.isPinch = false;
			}
			return datas.isDrag ? params : false;
		},
		drag(moveable, e) {
			if (!e) return;
			resolveTransformEvent(moveable, e, "translate");
			const { datas, parentEvent, parentFlag, isPinch, deltaOffset, useSnap, isRequest, isGroup, parentThrottleDrag } = e;
			let { distX, distY } = e;
			const { isDrag, prevDist, prevBeforeDist, startValue } = datas;
			if (!isDrag) return;
			if (deltaOffset) {
				distX += deltaOffset[0];
				distY += deltaOffset[1];
			}
			const props = moveable.props;
			const parentMoveable = props.parentMoveable;
			const throttleDrag = isGroup ? 0 : props.throttleDrag || parentThrottleDrag || 0;
			const throttleDragRotate = parentEvent ? 0 : props.throttleDragRotate || 0;
			let dragRotateRad;
			let isVerticalSnap = false;
			let isVerticalBound = false;
			let isHorizontalSnap = false;
			let isHorizontalBound = false;
			if (!parentEvent && throttleDragRotate > 0 && (distX || distY)) {
				const startDragRotate = props.startDragRotate || 0;
				const deg = throttle(startDragRotate + getRad$1([0, 0], [distX, distY]) * 180 / Math.PI, throttleDragRotate) - startDragRotate;
				const ry = distY * Math.abs(Math.cos((deg - 90) / 180 * Math.PI));
				const r = getDistSize([distX * Math.abs(Math.cos(deg / 180 * Math.PI)), ry]);
				dragRotateRad = deg * Math.PI / 180;
				distX = r * Math.cos(dragRotateRad);
				distY = r * Math.sin(dragRotateRad);
			}
			if (!isPinch && !parentEvent && !parentFlag) {
				const [verticalInfo, horizontalInfo] = checkSnapBoundsDrag(moveable, distX, distY, throttleDragRotate, !useSnap && isRequest || deltaOffset, datas);
				isVerticalSnap = verticalInfo.isSnap;
				isVerticalBound = verticalInfo.isBound;
				isHorizontalSnap = horizontalInfo.isSnap;
				isHorizontalBound = horizontalInfo.isBound;
				const verticalOffset = verticalInfo.offset;
				const horizontalOffset = horizontalInfo.offset;
				distX += verticalOffset;
				distY += horizontalOffset;
			}
			const beforeTranslate = plus(getBeforeDragDist({
				datas,
				distX,
				distY
			}), startValue);
			const translate = plus(getTransformDist({
				datas,
				distX,
				distY
			}), startValue);
			throttleArray(translate, TINY_NUM$1);
			throttleArray(beforeTranslate, TINY_NUM$1);
			if (!throttleDragRotate) {
				if (!isVerticalSnap && !isVerticalBound) {
					translate[0] = throttle(translate[0], throttleDrag);
					beforeTranslate[0] = throttle(beforeTranslate[0], throttleDrag);
				}
				if (!isHorizontalSnap && !isHorizontalBound) {
					translate[1] = throttle(translate[1], throttleDrag);
					beforeTranslate[1] = throttle(beforeTranslate[1], throttleDrag);
				}
			}
			const beforeDist = minus(beforeTranslate, startValue);
			const dist = minus(translate, startValue);
			const delta = minus(dist, prevDist);
			const beforeDelta = minus(beforeDist, prevBeforeDist);
			datas.prevDist = dist;
			datas.prevBeforeDist = beforeDist;
			datas.passDelta = delta;
			datas.passDist = dist;
			const left = datas.left + beforeDist[0];
			const top = datas.top + beforeDist[1];
			const right = datas.right - beforeDist[0];
			const bottom = datas.bottom - beforeDist[1];
			const nextTransform = convertTransformFormat(datas, `translate(${translate[0]}px, ${translate[1]}px)`, `translate(${dist[0]}px, ${dist[1]}px)`);
			fillOriginalTransform(e, nextTransform);
			moveable.state.dragInfo.dist = parentEvent ? [0, 0] : dist;
			if (!parentEvent && !parentMoveable && delta.every((num) => !num) && beforeDelta.some((num) => !num)) return;
			const { width, height } = moveable.state;
			const params = fillParams(moveable, e, {
				transform: nextTransform,
				dist,
				delta,
				translate,
				beforeDist,
				beforeDelta,
				beforeTranslate,
				left,
				top,
				right,
				bottom,
				width,
				height,
				isPinch,
				...fillCSSObject({ transform: nextTransform }, e)
			});
			!parentEvent && triggerEvent(moveable, "onDrag", params);
			return params;
		},
		dragAfter(moveable, e) {
			const datas = e.datas;
			const { deltaOffset } = datas;
			if (deltaOffset[0] || deltaOffset[1]) {
				datas.deltaOffset = [0, 0];
				return this.drag(moveable, {
					...e,
					deltaOffset
				});
			}
			return false;
		},
		dragEnd(moveable, e) {
			const { parentEvent, datas } = e;
			moveable.state.dragInfo = null;
			if (!datas.isDrag) return;
			datas.isDrag = false;
			const param = fillEndParams(moveable, e, {});
			!parentEvent && triggerEvent(moveable, "onDragEnd", param);
			return param;
		},
		dragGroupStart(moveable, e) {
			const { datas, clientX, clientY } = e;
			const params = this.dragStart(moveable, e);
			if (!params) return false;
			const { childEvents, eventParams } = triggerChildGesto(moveable, this, "dragStart", [clientX || 0, clientY || 0], e, false, "draggable");
			datas.isDrag = triggerEvent(moveable, "onDragGroupStart", {
				...params,
				targets: moveable.props.targets,
				events: eventParams
			}) !== false;
			const startValue = childEvents[0]?.datas.startValue ?? [0, 0];
			datas.throttleOffset = [startValue[0] % 1, startValue[1] % 1];
			return datas.isDrag ? params : false;
		},
		dragGroup(moveable, e) {
			const { datas } = e;
			if (!datas.isDrag) return;
			const params = this.drag(moveable, {
				...e,
				parentThrottleDrag: moveable.props.throttleDrag
			});
			const { passDelta } = e.datas;
			const { eventParams } = triggerChildGesto(moveable, this, "drag", passDelta, e, false, "draggable");
			if (!params) return;
			const nextParams = {
				targets: moveable.props.targets,
				events: eventParams,
				...params
			};
			triggerEvent(moveable, "onDragGroup", nextParams);
			return nextParams;
		},
		dragGroupEnd(moveable, e) {
			const { isDrag, datas } = e;
			if (!datas.isDrag) return;
			this.dragEnd(moveable, e);
			const { eventParams } = triggerChildGesto(moveable, this, "dragEnd", [0, 0], e, false, "draggable");
			triggerEvent(moveable, "onDragGroupEnd", fillEndParams(moveable, e, {
				targets: moveable.props.targets,
				events: eventParams
			}));
			return isDrag;
		},
		/**
		* @method Moveable.Draggable#request
		* @param {object} [e] - the draggable's request parameter
		* @param {number} [e.x] - x position
		* @param {number} [e.y] - y position
		* @param {number} [e.deltaX] - X number to move
		* @param {number} [e.deltaY] - Y number to move
		* @return {Moveable.Requester} Moveable Requester
		* @example
		
		* // Instantly Request (requestStart - request - requestEnd)
		* // Use Relative Value
		* moveable.request("draggable", { deltaX: 10, deltaY: 10 }, true);
		* // Use Absolute Value
		* moveable.request("draggable", { x: 200, y: 100 }, true);
		*
		* // requestStart
		* const requester = moveable.request("draggable");
		*
		* // request
		* // Use Relative Value
		* requester.request({ deltaX: 10, deltaY: 10 });
		* requester.request({ deltaX: 10, deltaY: 10 });
		* requester.request({ deltaX: 10, deltaY: 10 });
		* // Use Absolute Value
		* moveable.request("draggable", { x: 200, y: 100 });
		* moveable.request("draggable", { x: 220, y: 100 });
		* moveable.request("draggable", { x: 240, y: 100 });
		*
		* // requestEnd
		* requester.requestEnd();
		*/
		request(moveable) {
			const datas = {};
			const rect = moveable.getRect();
			let distX = 0;
			let distY = 0;
			let useSnap = false;
			return {
				isControl: false,
				requestStart(e) {
					useSnap = e.useSnap;
					return {
						datas,
						useSnap
					};
				},
				request(e) {
					if ("x" in e) distX = e.x - rect.left;
					else if ("deltaX" in e) distX += e.deltaX;
					if ("y" in e) distY = e.y - rect.top;
					else if ("deltaY" in e) distY += e.deltaY;
					return {
						datas,
						distX,
						distY,
						useSnap
					};
				},
				requestEnd() {
					return {
						datas,
						isDrag: true,
						useSnap
					};
				}
			};
		},
		unset(moveable) {
			moveable.state.gestos.draggable = null;
			moveable.state.dragInfo = null;
		}
	};
	/**
	* Whether or not target can be dragged. (default: false)
	* @name Moveable.Draggable#draggable
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.draggable = true;
	*/
	/**
	* throttle of x, y when drag.
	* @name Moveable.Draggable#throttleDrag
	* @default 0
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.throttleDrag = 1;
	*/
	/**
	* throttle of angle of x, y when drag.
	* @name Moveable.Draggable#throttleDragRotate
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.throttleDragRotate = 45;
	*/
	/**
	* start angle of throttleDragRotate of x, y when drag.
	* @name Moveable.Draggable#startDragRotate
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* // 45, 135, 225, 315
	* moveable.throttleDragRotate = 90;
	* moveable.startDragRotate = 45;
	*/
	/**
	* When the drag starts, the dragStart event is called.
	* @memberof Moveable.Draggable
	* @event dragStart
	* @param {Moveable.Draggable.OnDragStart} - Parameters for the dragStart event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { draggable: true });
	* moveable.on("dragStart", ({ target }) => {
	*     console.log(target);
	* });
	*/
	/**
	* When dragging, the drag event is called.
	* @memberof Moveable.Draggable
	* @event drag
	* @param {Moveable.Draggable.OnDrag} - Parameters for the drag event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { draggable: true });
	* moveable.on("drag", ({ target, transform }) => {
	*     target.style.transform = transform;
	* });
	*/
	/**
	* When the drag finishes, the dragEnd event is called.
	* @memberof Moveable.Draggable
	* @event dragEnd
	* @param {Moveable.Draggable.OnDragEnd} - Parameters for the dragEnd event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { draggable: true });
	* moveable.on("dragEnd", ({ target, isDrag }) => {
	*     console.log(target, isDrag);
	* });
	*/
	/**
	* When the group drag starts, the `dragGroupStart` event is called.
	* @memberof Moveable.Draggable
	* @event dragGroupStart
	* @param {Moveable.Draggable.OnDragGroupStart} - Parameters for the `dragGroupStart` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     draggable: true
	* });
	* moveable.on("dragGroupStart", ({ targets }) => {
	*     console.log("onDragGroupStart", targets);
	* });
	*/
	/**
	* When the group drag, the `dragGroup` event is called.
	* @memberof Moveable.Draggable
	* @event dragGroup
	* @param {Moveable.Draggable.OnDragGroup} - Parameters for the `dragGroup` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     draggable: true
	* });
	* moveable.on("dragGroup", ({ targets, events }) => {
	*     console.log("onDragGroup", targets);
	*     events.forEach(ev => {
	*          // drag event
	*          console.log("onDrag left, top", ev.left, ev.top);
	*          // ev.target!.style.left = `${ev.left}px`;
	*          // ev.target!.style.top = `${ev.top}px`;
	*          console.log("onDrag translate", ev.dist);
	*          ev.target!.style.transform = ev.transform;)
	*     });
	* });
	*/
	/**
	* When the group drag finishes, the `dragGroupEnd` event is called.
	* @memberof Moveable.Draggable
	* @event dragGroupEnd
	* @param {Moveable.Draggable.OnDragGroupEnd} - Parameters for the `dragGroupEnd` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     draggable: true
	* });
	* moveable.on("dragGroupEnd", ({ targets, isDrag }) => {
	*     console.log("onDragGroupEnd", targets, isDrag);
	* });
	*/
	function getFixedDirectionInfo(startPositions, fixedDirection) {
		return {
			fixedPosition: getPosByDirection(startPositions, fixedDirection),
			fixedDirection,
			fixedOffset: [0, 0]
		};
	}
	function getOffsetFixedDirectionInfo(state, fixedDirection) {
		const { allMatrix, is3d, width, height } = state;
		const n = is3d ? 4 : 3;
		return {
			fixedPosition: calculatePosition(allMatrix, [width / 2 * (1 + fixedDirection[0]), height / 2 * (1 + fixedDirection[1])], n),
			fixedDirection,
			fixedOffset: [0, 0]
		};
	}
	function getOffsetFixedPositionInfo(state, offsetFixedPosition) {
		const { allMatrix, is3d, width, height } = state;
		const n = is3d ? 4 : 3;
		const fixedDirection = getDirectionByPos(offsetFixedPosition, width, height);
		return {
			fixedPosition: calculatePosition(allMatrix, offsetFixedPosition, n),
			fixedDirection,
			fixedOffset: [width ? 0 : offsetFixedPosition[0], height ? 0 : offsetFixedPosition[1]]
		};
	}
	/**
	* @namespace Resizable
	* @memberof Moveable
	* @description Resizable indicates whether the target's width and height can be increased or decreased.
	*/
	const directionCondition$2 = getDirectionCondition("resizable");
	var Resizable_default = {
		name: "resizable",
		ableGroup: "size",
		canPinch: true,
		props: [
			"resizable",
			"throttleResize",
			"renderDirections",
			"displayAroundControls",
			"keepRatio",
			"resizeFormat",
			"keepRatioFinally",
			"edge",
			"checkResizableError"
		],
		events: [
			"resizeStart",
			"beforeResize",
			"resize",
			"resizeEnd",
			"resizeGroupStart",
			"beforeResizeGroup",
			"resizeGroup",
			"resizeGroupEnd"
		],
		render: getRenderDirections("resizable"),
		dragControlCondition: directionCondition$2,
		viewClassName: getDirectionViewClassName("resizable"),
		dragControlStart(moveable, e) {
			const { inputEvent, isPinch, isGroup, parentDirection, parentGesto, datas, parentFixedDirection, parentEvent } = e;
			const direction = getTotalDirection(parentDirection, isPinch, inputEvent, datas);
			const state = moveable.state;
			const { target, width, height, gestos } = state;
			if (!direction || !target) return false;
			if (gestos.resizable) return false;
			gestos.resizable = parentGesto || moveable.controlGesto;
			!isPinch && setDragStart(moveable, e);
			datas.datas = {};
			datas.direction = direction;
			datas.startOffsetWidth = width;
			datas.startOffsetHeight = height;
			datas.prevWidth = 0;
			datas.prevHeight = 0;
			datas.minSize = [0, 0];
			datas.startWidth = state.inlineCSSWidth || state.cssWidth;
			datas.startHeight = state.inlineCSSHeight || state.cssHeight;
			datas.maxSize = [Infinity, Infinity];
			if (!isGroup) {
				datas.minSize = [state.minOffsetWidth, state.minOffsetHeight];
				datas.maxSize = [state.maxOffsetWidth, state.maxOffsetHeight];
			}
			const transformOrigin = moveable.props.transformOrigin || "% %";
			datas.transformOrigin = transformOrigin && isString(transformOrigin) ? transformOrigin.split(" ") : transformOrigin;
			datas.startOffsetMatrix = state.offsetMatrix;
			datas.startTransformOrigin = state.transformOrigin;
			datas.isWidth = e?.parentIsWidth ?? (!direction[0] && !direction[1] || direction[0] || !direction[1]);
			function setRatio(ratio) {
				datas.ratio = ratio && isFinite(ratio) ? ratio : 0;
			}
			datas.startPositions = getAbsolutePosesByState(moveable.state);
			function setFixedDirection(fixedDirection) {
				const result = getFixedDirectionInfo(datas.startPositions, fixedDirection);
				datas.fixedDirection = result.fixedDirection;
				datas.fixedPosition = result.fixedPosition;
				datas.fixedOffset = result.fixedOffset;
			}
			function setFixedPosition(fixedPosition) {
				const result = getOffsetFixedPositionInfo(moveable.state, fixedPosition);
				datas.fixedDirection = result.fixedDirection;
				datas.fixedPosition = result.fixedPosition;
				datas.fixedOffset = result.fixedOffset;
			}
			function setMin(minSize) {
				datas.minSize = [convertUnitSize(`${minSize[0]}`, 0) || 0, convertUnitSize(`${minSize[1]}`, 0) || 0];
			}
			function setMax(maxSize) {
				const nextMaxSize = [maxSize[0] || Infinity, maxSize[1] || Infinity];
				if (!isNumber(nextMaxSize[0]) || isFinite(nextMaxSize[0])) nextMaxSize[0] = convertUnitSize(`${nextMaxSize[0]}`, 0) || Infinity;
				if (!isNumber(nextMaxSize[1]) || isFinite(nextMaxSize[1])) nextMaxSize[1] = convertUnitSize(`${nextMaxSize[1]}`, 0) || Infinity;
				datas.maxSize = nextMaxSize;
			}
			setRatio(width / height);
			setFixedDirection(parentFixedDirection || [-direction[0], -direction[1]]);
			datas.setFixedDirection = setFixedDirection;
			datas.setFixedPosition = setFixedPosition;
			datas.setMin = setMin;
			datas.setMax = setMax;
			const params = fillParams(moveable, e, {
				direction,
				startRatio: datas.ratio,
				set: ([startWidth, startHeight]) => {
					datas.startWidth = startWidth;
					datas.startHeight = startHeight;
				},
				setMin,
				setMax,
				setRatio,
				setFixedDirection,
				setFixedPosition,
				setOrigin: (origin) => {
					datas.transformOrigin = origin;
				},
				dragStart: Draggable_default.dragStart(moveable, new CustomGesto().dragStart([0, 0], e))
			});
			const result = parentEvent || triggerEvent(moveable, "onResizeStart", params);
			datas.startFixedDirection = datas.fixedDirection;
			datas.startFixedPosition = datas.fixedPosition;
			if (result !== false) {
				datas.isResize = true;
				moveable.state.snapRenderInfo = {
					request: e.isRequest,
					direction
				};
			}
			return datas.isResize ? params : false;
		},
		dragControl(moveable, e) {
			const { datas, parentFlag, isPinch, parentKeepRatio, dragClient, parentDist, useSnap, isRequest, isGroup, parentEvent, resolveMatrix } = e;
			const { isResize, transformOrigin, startWidth, startHeight, prevWidth, prevHeight, minSize, maxSize, ratio, startOffsetWidth, startOffsetHeight, isWidth } = datas;
			if (!isResize) return;
			if (resolveMatrix) {
				const { is3d } = moveable.state;
				const { startOffsetMatrix, startTransformOrigin } = datas;
				const n = is3d ? 4 : 3;
				let targetMatrix = parseMat(getNextTransforms(e));
				const targetN = Math.sqrt(targetMatrix.length);
				if (n !== targetN) targetMatrix = convertDimension(targetMatrix, targetN, n);
				const nextAllMatrix = getNextMatrix(startOffsetMatrix, targetMatrix, startTransformOrigin, n);
				datas.startPositions = calculatePoses(nextAllMatrix, startOffsetWidth, startOffsetHeight, n);
				datas.nextTargetMatrix = targetMatrix;
				datas.nextAllMatrix = nextAllMatrix;
			}
			const props = getProps(moveable.props, "resizable");
			const { resizeFormat, throttleResize = parentFlag ? 0 : 1, parentMoveable, keepRatioFinally } = props;
			const direction = datas.direction;
			let sizeDirection = direction;
			let distWidth = 0;
			let distHeight = 0;
			if (!direction[0] && !direction[1]) sizeDirection = [1, 1];
			const keepRatio = ratio && (parentKeepRatio != null ? parentKeepRatio : props.keepRatio) || false;
			function getNextBoundingSize() {
				const fixedDirection = datas.fixedDirection;
				const nextSize = getOffsetSizeDist(sizeDirection, keepRatio, datas, e);
				distWidth = nextSize.distWidth;
				distHeight = nextSize.distHeight;
				let nextWidth = sizeDirection[0] - fixedDirection[0] || keepRatio ? Math.max(startOffsetWidth + distWidth, TINY_NUM$1) : startOffsetWidth;
				let nextHeight = sizeDirection[1] - fixedDirection[1] || keepRatio ? Math.max(startOffsetHeight + distHeight, TINY_NUM$1) : startOffsetHeight;
				if (keepRatio && startOffsetWidth && startOffsetHeight) {
					if (isWidth) nextHeight = nextWidth / ratio;
					else nextWidth = nextHeight * ratio;
				}
				return [nextWidth, nextHeight];
			}
			let [boundingWidth, boundingHeight] = getNextBoundingSize();
			if (!parentEvent) {
				datas.setFixedDirection(datas.fixedDirection);
				triggerEvent(moveable, "onBeforeResize", fillParams(moveable, e, {
					startFixedDirection: datas.startFixedDirection,
					startFixedPosition: datas.startFixedPosition,
					setFixedDirection(nextFixedDirection) {
						datas.setFixedDirection(nextFixedDirection);
						[boundingWidth, boundingHeight] = getNextBoundingSize();
						return [boundingWidth, boundingHeight];
					},
					setFixedPosition(nextFixedPosition) {
						datas.setFixedPosition(nextFixedPosition);
						[boundingWidth, boundingHeight] = getNextBoundingSize();
						return [boundingWidth, boundingHeight];
					},
					boundingWidth,
					boundingHeight,
					setSize(size) {
						[boundingWidth, boundingHeight] = size;
					}
				}, true));
			}
			let fixedPosition = dragClient;
			if (!dragClient) {
				if (!parentFlag && isPinch) fixedPosition = getAbsolutePosition(moveable, [0, 0]);
				else fixedPosition = datas.fixedPosition;
			}
			let snapDist = [0, 0];
			if (!isPinch) snapDist = checkSnapResize(moveable, boundingWidth, boundingHeight, direction, fixedPosition, !useSnap && isRequest, datas);
			if (parentDist) {
				!parentDist[0] && (snapDist[0] = 0);
				!parentDist[1] && (snapDist[1] = 0);
			}
			function computeSize() {
				if (resizeFormat) [boundingWidth, boundingHeight] = resizeFormat([boundingWidth, boundingHeight]);
				boundingWidth = throttle(boundingWidth, throttleResize);
				boundingHeight = throttle(boundingHeight, throttleResize);
			}
			if (keepRatio) {
				if (sizeDirection[0] && sizeDirection[1] && snapDist[0] && snapDist[1]) {
					if (abs(snapDist[0]) > abs(snapDist[1])) snapDist[1] = 0;
					else snapDist[0] = 0;
				}
				const isNoSnap = !snapDist[0] && !snapDist[1];
				if (isNoSnap) computeSize();
				if (sizeDirection[0] && !sizeDirection[1] || snapDist[0] && !snapDist[1] || isNoSnap && isWidth) {
					boundingWidth += snapDist[0];
					boundingHeight = boundingWidth / ratio;
				} else if (!sizeDirection[0] && sizeDirection[1] || !snapDist[0] && snapDist[1] || isNoSnap && !isWidth) {
					boundingHeight += snapDist[1];
					boundingWidth = boundingHeight * ratio;
				}
			} else {
				boundingWidth += snapDist[0];
				boundingHeight += snapDist[1];
				boundingWidth = Math.max(0, boundingWidth);
				boundingHeight = Math.max(0, boundingHeight);
			}
			[boundingWidth, boundingHeight] = calculateBoundSize([boundingWidth, boundingHeight], minSize, maxSize, keepRatio ? ratio : false);
			computeSize();
			if (keepRatio && (isGroup || keepRatioFinally)) {
				if (isWidth) boundingHeight = boundingWidth / ratio;
				else boundingWidth = boundingHeight * ratio;
			}
			distWidth = boundingWidth - startOffsetWidth;
			distHeight = boundingHeight - startOffsetHeight;
			const delta = [distWidth - prevWidth, distHeight - prevHeight];
			datas.prevWidth = distWidth;
			datas.prevHeight = distHeight;
			const inverseDelta = getResizeDist(moveable, boundingWidth, boundingHeight, fixedPosition, transformOrigin, datas);
			if (!parentMoveable && delta.every((num) => !num) && inverseDelta.every((num) => !num)) return;
			const drag = Draggable_default.drag(moveable, setCustomDrag(e, moveable.state, inverseDelta, !!isPinch, false, "draggable"));
			const transform = drag.transform;
			const nextWidth = startWidth + distWidth;
			const nextHeight = startHeight + distHeight;
			const params = fillParams(moveable, e, {
				width: nextWidth,
				height: nextHeight,
				offsetWidth: Math.round(boundingWidth),
				offsetHeight: Math.round(boundingHeight),
				startRatio: ratio,
				boundingWidth,
				boundingHeight,
				direction,
				dist: [distWidth, distHeight],
				delta,
				isPinch: !!isPinch,
				drag,
				...fillAfterTransform({
					style: {
						width: `${nextWidth}px`,
						height: `${nextHeight}px`
					},
					transform
				}, drag, e)
			});
			!parentEvent && triggerEvent(moveable, "onResize", params);
			return params;
		},
		dragControlAfter(moveable, e) {
			const datas = e.datas;
			const { isResize, startOffsetWidth, startOffsetHeight, prevWidth, prevHeight } = datas;
			if (!isResize || moveable.props.checkResizableError === false) return;
			const { width, height } = moveable.state;
			const errorWidth = width - (startOffsetWidth + prevWidth);
			const errorHeight = height - (startOffsetHeight + prevHeight);
			const isErrorWidth = abs(errorWidth) > 3;
			const isErrorHeight = abs(errorHeight) > 3;
			if (isErrorWidth) {
				datas.startWidth += errorWidth;
				datas.startOffsetWidth += errorWidth;
				datas.prevWidth += errorWidth;
			}
			if (isErrorHeight) {
				datas.startHeight += errorHeight;
				datas.startOffsetHeight += errorHeight;
				datas.prevHeight += errorHeight;
			}
			if (isErrorWidth || isErrorHeight) return this.dragControl(moveable, e);
		},
		dragControlEnd(moveable, e) {
			const { datas, parentEvent } = e;
			if (!datas.isResize) return;
			datas.isResize = false;
			const params = fillEndParams(moveable, e, {});
			!parentEvent && triggerEvent(moveable, "onResizeEnd", params);
			return params;
		},
		dragGroupControlCondition: directionCondition$2,
		dragGroupControlStart(moveable, e) {
			const { datas } = e;
			const params = this.dragControlStart(moveable, {
				...e,
				isGroup: true
			});
			if (!params) return false;
			const originalEvents = fillChildEvents(moveable, "resizable", e);
			const { startOffsetWidth: parentStartOffsetWidth, startOffsetHeight: parentStartOffsetHeight } = datas;
			function updateGroupMin() {
				const originalMinSize = datas.minSize;
				originalEvents.forEach((ev) => {
					const { minSize: childMinSize, startOffsetWidth: childStartOffsetWidth, startOffsetHeight: childStartOffsetHeight } = ev.datas;
					const parentMinWidth = parentStartOffsetWidth * (childStartOffsetWidth ? childMinSize[0] / childStartOffsetWidth : 0);
					const parentMinHeight = parentStartOffsetHeight * (childStartOffsetHeight ? childMinSize[1] / childStartOffsetHeight : 0);
					originalMinSize[0] = Math.max(originalMinSize[0], parentMinWidth);
					originalMinSize[1] = Math.max(originalMinSize[1], parentMinHeight);
				});
			}
			function updateGroupMax() {
				const originalMaxSize = datas.maxSize;
				originalEvents.forEach((ev) => {
					const { maxSize: childMaxSize, startOffsetWidth: childStartOffsetWidth, startOffsetHeight: childStartOffsetHeight } = ev.datas;
					const parentMaxWidth = parentStartOffsetWidth * (childStartOffsetWidth ? childMaxSize[0] / childStartOffsetWidth : 0);
					const parentMaxHeight = parentStartOffsetHeight * (childStartOffsetHeight ? childMaxSize[1] / childStartOffsetHeight : 0);
					originalMaxSize[0] = Math.min(originalMaxSize[0], parentMaxWidth);
					originalMaxSize[1] = Math.min(originalMaxSize[1], parentMaxHeight);
				});
			}
			const events = triggerChildAbles(moveable, this, "dragControlStart", e, (child, ev) => {
				return startChildDist(moveable, child, datas, ev);
			});
			updateGroupMin();
			updateGroupMax();
			const setFixedDirection = (fixedDirection) => {
				params.setFixedDirection(fixedDirection);
				events.forEach((ev, i) => {
					ev.setFixedDirection(fixedDirection);
					startChildDist(moveable, ev.moveable, datas, originalEvents[i]);
				});
			};
			datas.setFixedDirection = setFixedDirection;
			datas.isResize = triggerEvent(moveable, "onResizeGroupStart", {
				...params,
				targets: moveable.props.targets,
				events: events.map((ev) => {
					return {
						...ev,
						setMin: (minSize) => {
							ev.setMin(minSize);
							updateGroupMin();
						},
						setMax: (maxSize) => {
							ev.setMax(maxSize);
							updateGroupMax();
						}
					};
				}),
				setFixedDirection,
				setMin: (minSize) => {
					params.setMin(minSize);
					updateGroupMin();
				},
				setMax: (maxSize) => {
					params.setMax(maxSize);
					updateGroupMax();
				}
			}) !== false;
			return datas.isResize ? params : false;
		},
		dragGroupControl(moveable, e) {
			const { datas } = e;
			if (!datas.isResize) return;
			const props = getProps(moveable.props, "resizable");
			catchEvent(moveable, "onBeforeResize", (parentEvent) => {
				triggerEvent(moveable, "onBeforeResizeGroup", fillParams(moveable, e, {
					...parentEvent,
					targets: props.targets
				}, true));
			});
			const params = this.dragControl(moveable, {
				...e,
				isGroup: true
			});
			if (!params) return;
			const { boundingWidth, boundingHeight, dist } = params;
			const keepRatio = props.keepRatio;
			const parentScale = [boundingWidth / (boundingWidth - dist[0]), boundingHeight / (boundingHeight - dist[1])];
			const fixedPosition = datas.fixedPosition;
			const events = triggerChildAbles(moveable, this, "dragControl", e, (_, ev) => {
				const [clientX, clientY] = calculate(createRotateMatrix(moveable.rotation / 180 * Math.PI, 3), [
					ev.datas.originalX * parentScale[0],
					ev.datas.originalY * parentScale[1],
					1
				], 3);
				return {
					...ev,
					parentDist: null,
					parentScale,
					dragClient: plus(fixedPosition, [clientX, clientY]),
					parentKeepRatio: keepRatio
				};
			});
			const nextParams = {
				targets: props.targets,
				events,
				...params
			};
			triggerEvent(moveable, "onResizeGroup", nextParams);
			return nextParams;
		},
		dragGroupControlEnd(moveable, e) {
			const { isDrag, datas } = e;
			if (!datas.isResize) return;
			this.dragControlEnd(moveable, e);
			const events = triggerChildAbles(moveable, this, "dragControlEnd", e);
			triggerEvent(moveable, "onResizeGroupEnd", fillEndParams(moveable, e, {
				targets: moveable.props.targets,
				events
			}));
			return isDrag;
		},
		/**
		* @method Moveable.Resizable#request
		* @param {Moveable.Resizable.ResizableRequestParam} e - the Resizable's request parameter
		* @return {Moveable.Requester} Moveable Requester
		* @example
		
		* // Instantly Request (requestStart - request - requestEnd)
		* // Use Relative Value
		* moveable.request("resizable", { deltaWidth: 10, deltaHeight: 10 }, true);
		*
		* // Use Absolute Value
		* moveable.request("resizable", { offsetWidth: 100, offsetHeight: 100 }, true);
		*
		* // requestStart
		* const requester = moveable.request("resizable");
		*
		* // request
		* // Use Relative Value
		* requester.request({ deltaWidth: 10, deltaHeight: 10 });
		* requester.request({ deltaWidth: 10, deltaHeight: 10 });
		* requester.request({ deltaWidth: 10, deltaHeight: 10 });
		*
		* // Use Absolute Value
		* moveable.request("resizable", { offsetWidth: 100, offsetHeight: 100 });
		* moveable.request("resizable", { offsetWidth: 110, offsetHeight: 100 });
		* moveable.request("resizable", { offsetWidth: 120, offsetHeight: 100 });
		*
		* // requestEnd
		* requester.requestEnd();
		*/
		request(moveable) {
			const datas = {};
			let distWidth = 0;
			let distHeight = 0;
			let useSnap = false;
			const rect = moveable.getRect();
			return {
				isControl: true,
				requestStart(e) {
					useSnap = e.useSnap;
					return {
						datas,
						parentDirection: e.direction || [1, 1],
						parentIsWidth: e?.horizontal ?? true,
						useSnap
					};
				},
				request(e) {
					if ("offsetWidth" in e) distWidth = e.offsetWidth - rect.offsetWidth;
					else if ("deltaWidth" in e) distWidth += e.deltaWidth;
					if ("offsetHeight" in e) distHeight = e.offsetHeight - rect.offsetHeight;
					else if ("deltaHeight" in e) distHeight += e.deltaHeight;
					return {
						datas,
						parentDist: [distWidth, distHeight],
						parentKeepRatio: e.keepRatio,
						useSnap
					};
				},
				requestEnd() {
					return {
						datas,
						isDrag: true,
						useSnap
					};
				}
			};
		},
		unset(moveable) {
			moveable.state.gestos.resizable = null;
		}
	};
	/**
	* Whether or not target can be resized.
	* @name Moveable.Resizable#resizable
	* @default false
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     resizable: false,
	* });
	*
	* moveable.resizable = true;
	*/
	/**
	* throttle of width, height when resize. If throttleResize is set to less than 1, the target may shake.
	* @name Moveable.Resizable#throttleResize
	* @default 1
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*   resizable: true,
	*   throttleResize: 1,
	* });
	*
	* moveable.throttleResize = 0;
	*/
	/**
	* When resize or scale, keeps a ratio of the width, height.
	* @name Moveable.Resizable#keepRatio
	* @default false
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*   resizable: true,
	* });
	*
	* moveable.keepRatio = true;
	*/
	/**
	* Set directions to show the control box.
	* @name Moveable.Resizable#renderDirections
	* @default ["n", "nw", "ne", "s", "se", "sw", "e", "w"]
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*   resizable: true,
	*   renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
	* });
	*
	* moveable.renderDirections = ["nw", "ne", "sw", "se"];
	*/
	/**
	* Function to convert size for resize
	* @name Moveable.Resizable#resizeFormat
	* @default oneself
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*   resizable: true,
	*   resizeFormat: v => v,
	* });
	*
	* moveable.resizeFormat = (size: number[]) => ([Math.trunc(size[0]), Math.trunc(size[1])];
	*/
	/**
	* When the resize starts, the resizeStart event is called.
	* @memberof Moveable.Resizable
	* @event resizeStart
	* @param {Moveable.Resizable.OnResizeStart} - Parameters for the resizeStart event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { resizable: true });
	* moveable.on("resizeStart", ({ target }) => {
	*     console.log(target);
	* });
	*/
	/**
	* When resizing, `beforeResize` is called before `resize` occurs. In `beforeResize`, you can get and set the pre-value before resizing.
	* @memberof Moveable.Resizable
	* @event beforeResize
	* @param {Moveable.Resizable.OnBeforeResize} - Parameters for the `beforeResize` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { resizable: true });
	* moveable.on("beforeResize", ({ setFixedDirection }) => {
	*     if (shiftKey) {
	*        setFixedDirection([0, 0]);
	*     }
	* });
	* moveable.on("resize", ({ target, width, height, drag }) => {
	*     target.style.width = `${width}px`;
	*     target.style.height = `${height}px`;
	*     target.style.transform = drag.transform;
	* });
	*/
	/**
	* When resizing, the resize event is called.
	* @memberof Moveable.Resizable
	* @event resize
	* @param {Moveable.Resizable.OnResize} - Parameters for the resize event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { resizable: true });
	* moveable.on("resize", ({ target, width, height }) => {
	*     target.style.width = `${e.width}px`;
	*     target.style.height = `${e.height}px`;
	* });
	*/
	/**
	* When the resize finishes, the resizeEnd event is called.
	* @memberof Moveable.Resizable
	* @event resizeEnd
	* @param {Moveable.Resizable.OnResizeEnd} - Parameters for the resizeEnd event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { resizable: true });
	* moveable.on("resizeEnd", ({ target, isDrag }) => {
	*     console.log(target, isDrag);
	* });
	*/
	/**
	* When the group resize starts, the `resizeGroupStart` event is called.
	* @memberof Moveable.Resizable
	* @event resizeGroupStart
	* @param {Moveable.Resizable.OnResizeGroupStart} - Parameters for the `resizeGroupStart` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     resizable: true
	* });
	* moveable.on("resizeGroupStart", ({ targets }) => {
	*     console.log("onResizeGroupStart", targets);
	* });
	*/
	/**
	* When the group resize, the `resizeGroup` event is called.
	* @memberof Moveable.Resizable
	* @event resizeGroup
	* @param {Moveable.Resizable.onResizeGroup} - Parameters for the `resizeGroup` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     resizable: true
	* });
	* moveable.on("resizeGroup", ({ targets, events }) => {
	*     console.log("onResizeGroup", targets);
	*     events.forEach(ev => {
	*         const offset = [
	*             direction[0] < 0 ? -ev.delta[0] : 0,
	*             direction[1] < 0 ? -ev.delta[1] : 0,
	*         ];
	*         // ev.drag is a drag event that occurs when the group resize.
	*         const left = offset[0] + ev.drag.beforeDist[0];
	*         const top = offset[1] + ev.drag.beforeDist[1];
	*         const width = ev.width;
	*         const top = ev.top;
	*     });
	* });
	*/
	/**
	* When the group resize finishes, the `resizeGroupEnd` event is called.
	* @memberof Moveable.Resizable
	* @event resizeGroupEnd
	* @param {Moveable.Resizable.OnResizeGroupEnd} - Parameters for the `resizeGroupEnd` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     resizable: true
	* });
	* moveable.on("resizeGroupEnd", ({ targets, isDrag }) => {
	*     console.log("onResizeGroupEnd", targets, isDrag);
	* });
	*/
	/**
	* @namespace Rotatable
	* @memberof Moveable
	* @description Rotatable indicates whether the target can be rotated.
	*/
	function setRotateStartInfo(moveable, datas, clientX, clientY, rect) {
		const groupable = moveable.props.groupable;
		const state = moveable.state;
		const n = state.is3d ? 4 : 3;
		const origin = datas.origin;
		const nextOrigin = calculatePosition(moveable.state.rootMatrix, minus([origin[0], origin[1]], groupable ? [0, 0] : [state.left, state.top]), n);
		const startAbsoluteOrigin = plus([rect.left, rect.top], nextOrigin);
		datas.startAbsoluteOrigin = startAbsoluteOrigin;
		datas.prevDeg = getRad$1(startAbsoluteOrigin, [clientX, clientY]) / Math.PI * 180;
		datas.defaultDeg = datas.prevDeg;
		datas.prevSnapDeg = 0;
		datas.loop = 0;
		datas.startDist = getDist$2(startAbsoluteOrigin, [clientX, clientY]);
	}
	function getAbsoluteDist(deg, direction, datas) {
		const { defaultDeg, prevDeg } = datas;
		let normalizedPrevDeg = prevDeg % 360;
		let loop = Math.floor(prevDeg / 360);
		if (normalizedPrevDeg < 0) normalizedPrevDeg += 360;
		if (normalizedPrevDeg > deg && normalizedPrevDeg > 270 && deg < 90) ++loop;
		else if (normalizedPrevDeg < deg && normalizedPrevDeg < 90 && deg > 270) --loop;
		const dist = direction * (loop * 360 + deg - defaultDeg);
		datas.prevDeg = defaultDeg + dist;
		return dist;
	}
	function getAbsoluteDistByClient(clientX, clientY, direction, datas) {
		return getAbsoluteDist(getRad$1(datas.startAbsoluteOrigin, [clientX, clientY]) / Math.PI * 180, direction, datas);
	}
	function getRotateInfo(moveable, moveableRect, datas, dist, startValue, checkSnap) {
		const { throttleRotate = 0 } = moveable.props;
		const prevSnapDeg = datas.prevSnapDeg;
		let snapRotation = 0;
		let isSnap = false;
		if (checkSnap) {
			const result = checkSnapRotate(moveable, moveableRect, dist, startValue + dist);
			isSnap = result.isSnap;
			snapRotation = startValue + result.dist;
		}
		if (!isSnap) snapRotation = throttle(startValue + dist, throttleRotate);
		const snapDeg = snapRotation - startValue;
		datas.prevSnapDeg = snapDeg;
		return [
			snapDeg - prevSnapDeg,
			snapDeg,
			snapRotation
		];
	}
	function getRotationPositions(rotationPosition, [pos1, pos2, pos3, pos4], direction) {
		if (rotationPosition === "none") return [];
		if (isArray(rotationPosition)) return rotationPosition.map((child) => getRotationPositions(child, [
			pos1,
			pos2,
			pos3,
			pos4
		], direction)[0]);
		const [dir1, dir2] = (rotationPosition || "top").split("-");
		let radPoses = [pos1, pos2];
		if (dir1 === "left") radPoses = [pos3, pos1];
		else if (dir1 === "right") radPoses = [pos2, pos4];
		else if (dir1 === "bottom") radPoses = [pos4, pos3];
		let pos = [(radPoses[0][0] + radPoses[1][0]) / 2, (radPoses[0][1] + radPoses[1][1]) / 2];
		const rad = getRotationRad(radPoses, direction);
		if (dir2) {
			const isStart = dir2 === "top" || dir2 === "left";
			const isReverse = dir1 === "bottom" || dir1 === "left";
			pos = radPoses[isStart && !isReverse || !isStart && isReverse ? 0 : 1];
		}
		return [[pos, rad]];
	}
	function dragControlCondition(moveable, e) {
		if (e.isRequest) return e.requestAble === "rotatable";
		const target = e.inputEvent.target;
		if (hasClass(target, prefix("rotation-control")) || moveable.props.rotateAroundControls && hasClass(target, prefix("around-control")) || hasClass(target, prefix("control")) && hasClass(target, prefix("rotatable"))) return true;
		const rotationTarget = moveable.props.rotationTarget;
		if (rotationTarget) return getRefTargets(rotationTarget, true).some((element) => {
			if (!element) return false;
			return target === element || target.contains(element);
		});
		return false;
	}
	var Rotatable_default = {
		name: "rotatable",
		canPinch: true,
		props: [
			"rotatable",
			"rotationPosition",
			"throttleRotate",
			"renderDirections",
			"rotationTarget",
			"rotateAroundControls",
			"edge",
			"resolveAblesWithRotatable",
			"displayAroundControls"
		],
		events: [
			"rotateStart",
			"beforeRotate",
			"rotate",
			"rotateEnd",
			"rotateGroupStart",
			"beforeRotateGroup",
			"rotateGroup",
			"rotateGroupEnd"
		],
		css: [`.rotation {
position: absolute;
height: 40px;
width: 1px;
transform-origin: 50% 100%;
height: calc(40px * var(--zoom));
top: auto;
left: 0;
bottom: 100%;
will-change: transform;
}
.rotation .rotation-line {
display: block;
width: 100%;
height: 100%;
transform-origin: 50% 50%;
}
.rotation .rotation-control {
border-color: #4af;
border-color: var(--moveable-color);
background:#fff;
cursor: alias;
}
:global .view-rotation-dragging, .rotatable.direction.control {
cursor: alias;
}
.rotatable.direction.control.move {
cursor: move;
}
`],
		viewClassName(moveable) {
			if (!moveable.isDragging("rotatable")) return "";
			return prefix("view-rotation-dragging");
		},
		render(moveable, React) {
			const { rotatable, rotationPosition, zoom, renderDirections, rotateAroundControls, resolveAblesWithRotatable } = getProps(moveable.props, "rotatable");
			const { renderPoses, direction } = moveable.getState();
			if (!rotatable) return null;
			const positions = getRotationPositions(rotationPosition, renderPoses, direction);
			const jsxs = [];
			positions.forEach(([pos, rad], i) => {
				jsxs.push(/* @__PURE__ */ React.createElement("div", {
					key: `rotation${i}`,
					className: prefix("rotation"),
					style: { transform: `translate(-50%) translate(${pos[0]}px, ${pos[1]}px) rotate(${rad}rad)` }
				}, /* @__PURE__ */ React.createElement("div", {
					className: prefix("line rotation-line"),
					style: { transform: `scaleX(${zoom})` }
				}), /* @__PURE__ */ React.createElement("div", {
					className: prefix("control rotation-control"),
					style: { transform: `translate(0.5px) scale(${zoom})` }
				})));
			});
			if (renderDirections) {
				const ables = getKeys(resolveAblesWithRotatable || {});
				const resolveMap = {};
				ables.forEach((name) => {
					resolveAblesWithRotatable[name].forEach((direction) => {
						resolveMap[direction] = name;
					});
				});
				let directionControlInfos = [];
				if (isArray(renderDirections)) directionControlInfos = renderDirections.map((dir) => {
					const able = resolveMap[dir];
					return {
						data: able ? { resolve: able } : {},
						classNames: able ? [`move`] : [],
						dir
					};
				});
				jsxs.push(...renderDirectionControlsByInfos(moveable, "rotatable", directionControlInfos, React));
			}
			if (rotateAroundControls) jsxs.push(...renderAroundControls(moveable, React));
			return jsxs;
		},
		dragControlCondition,
		dragControlStart(moveable, e) {
			const { datas, clientX, clientY, parentRotate, parentFlag, isPinch, isRequest } = e;
			const state = moveable.state;
			const { target, left, top, direction, beforeDirection, targetTransform, moveableClientRect, offsetMatrix, targetMatrix, allMatrix, width, height } = state;
			if (!isRequest && !target) return false;
			const rect = moveable.getRect();
			datas.rect = rect;
			datas.transform = targetTransform;
			datas.left = left;
			datas.top = top;
			let setFixedPosition = (fixedPosition) => {
				const result = getOffsetFixedPositionInfo(moveable.state, fixedPosition);
				datas.fixedDirection = result.fixedDirection;
				datas.fixedOffset = result.fixedOffset;
				datas.fixedPosition = result.fixedPosition;
				if (resizeStart) resizeStart.setFixedPosition(fixedPosition);
			};
			let setFixedDirection = (fixedDirection) => {
				const result = getOffsetFixedDirectionInfo(moveable.state, fixedDirection);
				datas.fixedDirection = result.fixedDirection;
				datas.fixedOffset = result.fixedOffset;
				datas.fixedPosition = result.fixedPosition;
				if (resizeStart) resizeStart.setFixedDirection(fixedDirection);
			};
			let startClientX = clientX;
			let startClientY = clientY;
			if (isRequest || isPinch || parentFlag) {
				const externalRotate = parentRotate || 0;
				datas.beforeInfo = {
					origin: rect.beforeOrigin,
					prevDeg: externalRotate,
					defaultDeg: externalRotate,
					prevSnapDeg: 0,
					startDist: 0
				};
				datas.afterInfo = {
					...datas.beforeInfo,
					origin: rect.origin
				};
				datas.absoluteInfo = {
					...datas.beforeInfo,
					origin: rect.origin,
					startValue: externalRotate
				};
			} else {
				const inputTarget = e.inputEvent?.target;
				if (inputTarget) {
					const regionDirection = inputTarget.getAttribute("data-direction") || "";
					const controlDirection = DIRECTION_REGION_TO_DIRECTION[regionDirection];
					if (controlDirection) {
						datas.isControl = true;
						datas.isAroundControl = hasClass(inputTarget, prefix("around-control"));
						datas.controlDirection = controlDirection;
						const resolve = inputTarget.getAttribute("data-resolve");
						if (resolve) datas.resolveAble = resolve;
						const clientPoses = calculateMoveableClientPositions(state.rootMatrix, state.renderPoses, moveableClientRect);
						[startClientX, startClientY] = getPosByDirection(clientPoses, controlDirection);
					}
				}
				datas.beforeInfo = { origin: rect.beforeOrigin };
				datas.afterInfo = { origin: rect.origin };
				datas.absoluteInfo = {
					origin: rect.origin,
					startValue: rect.rotation
				};
				const originalFixedPosition = setFixedPosition;
				setFixedPosition = (fixedPosition) => {
					const n = state.is3d ? 4 : 3;
					const [originX, originY] = plus(getOrigin(targetMatrix, n), fixedPosition);
					const fixedBeforeOrigin = calculate(offsetMatrix, convertPositionMatrix([originX, originY], n));
					const fixedAfterOrigin = calculate(allMatrix, convertPositionMatrix([fixedPosition[0], fixedPosition[1]], n));
					originalFixedPosition(fixedPosition);
					const posDelta = state.posDelta;
					datas.beforeInfo.origin = minus(fixedBeforeOrigin, posDelta);
					datas.afterInfo.origin = minus(fixedAfterOrigin, posDelta);
					datas.absoluteInfo.origin = minus(fixedAfterOrigin, posDelta);
					setRotateStartInfo(moveable, datas.beforeInfo, startClientX, startClientY, moveableClientRect);
					setRotateStartInfo(moveable, datas.afterInfo, startClientX, startClientY, moveableClientRect);
					setRotateStartInfo(moveable, datas.absoluteInfo, startClientX, startClientY, moveableClientRect);
				};
				setFixedDirection = (fixedDirection) => {
					const fixedPosition = getPosByDirection([
						[0, 0],
						[width, 0],
						[0, height],
						[width, height]
					], fixedDirection);
					setFixedPosition(fixedPosition);
				};
			}
			datas.startClientX = startClientX;
			datas.startClientY = startClientY;
			datas.direction = direction;
			datas.beforeDirection = beforeDirection;
			datas.startValue = 0;
			datas.datas = {};
			setDefaultTransformIndex(moveable, e, "rotate");
			let dragStart = false;
			let resizeStart = false;
			if (datas.isControl && datas.resolveAble) {
				if (datas.resolveAble === "resizable") resizeStart = Resizable_default.dragControlStart(moveable, {
					...new CustomGesto("resizable").dragStart([0, 0], e),
					parentPosition: datas.controlPosition,
					parentFixedPosition: datas.fixedPosition
				});
			}
			if (!resizeStart) dragStart = Draggable_default.dragStart(moveable, new CustomGesto().dragStart([0, 0], e));
			setFixedPosition(getTotalOrigin(moveable));
			const params = fillParams(moveable, e, {
				set: (rotatation) => {
					datas.startValue = rotatation * Math.PI / 180;
				},
				setFixedDirection,
				setFixedPosition,
				...fillTransformStartEvent(moveable, e),
				dragStart,
				resizeStart
			});
			datas.isRotate = triggerEvent(moveable, "onRotateStart", params) !== false;
			state.snapRenderInfo = { request: e.isRequest };
			return datas.isRotate ? params : false;
		},
		dragControl(moveable, e) {
			const { datas, clientDistX, clientDistY, parentRotate, parentFlag, isPinch, groupDelta, resolveMatrix } = e;
			const { beforeDirection, beforeInfo, afterInfo, absoluteInfo, isRotate, startValue, rect, startClientX, startClientY } = datas;
			if (!isRotate) return;
			resolveTransformEvent(moveable, e, "rotate");
			const direction = beforeDirection * getTransformDirection(e);
			const { parentMoveable } = moveable.props;
			let beforeDelta;
			let beforeDist;
			let beforeRotation;
			let delta;
			let dist;
			let rotation;
			let absoluteDelta;
			let absoluteDist;
			let absoluteRotation;
			const startRotation = 180 / Math.PI * startValue;
			const absoluteStartRotation = absoluteInfo.startValue;
			let isSnap = false;
			const nextClientX = startClientX + clientDistX;
			const nextClientY = startClientY + clientDistY;
			if (!parentFlag && "parentDist" in e) {
				const parentDist = e.parentDist;
				beforeDist = parentDist;
				dist = parentDist;
				absoluteDist = parentDist;
			} else if (isPinch || parentFlag) {
				beforeDist = getAbsoluteDist(parentRotate, beforeDirection, beforeInfo);
				dist = getAbsoluteDist(parentRotate, direction, afterInfo);
				absoluteDist = getAbsoluteDist(parentRotate, direction, absoluteInfo);
			} else {
				beforeDist = getAbsoluteDistByClient(nextClientX, nextClientY, beforeDirection, beforeInfo);
				dist = getAbsoluteDistByClient(nextClientX, nextClientY, direction, afterInfo);
				absoluteDist = getAbsoluteDistByClient(nextClientX, nextClientY, direction, absoluteInfo);
				isSnap = true;
			}
			beforeRotation = startRotation + beforeDist;
			rotation = startRotation + dist;
			absoluteRotation = absoluteStartRotation + absoluteDist;
			triggerEvent(moveable, "onBeforeRotate", fillParams(moveable, e, {
				beforeRotation,
				rotation,
				absoluteRotation,
				setRotation(nextRotation) {
					dist = nextRotation - startRotation;
					beforeDist = dist;
					absoluteDist = dist;
				}
			}, true));
			[beforeDelta, beforeDist, beforeRotation] = getRotateInfo(moveable, rect, beforeInfo, beforeDist, startRotation, isSnap);
			[delta, dist, rotation] = getRotateInfo(moveable, rect, afterInfo, dist, startRotation, isSnap);
			[absoluteDelta, absoluteDist, absoluteRotation] = getRotateInfo(moveable, rect, absoluteInfo, absoluteDist, absoluteStartRotation, isSnap);
			if (!absoluteDelta && !delta && !beforeDelta && !parentMoveable && !resolveMatrix) return;
			const nextTransform = convertTransformFormat(datas, `rotate(${rotation}deg)`, `rotate(${dist}deg)`);
			if (resolveMatrix) datas.fixedPosition = getTranslateFixedPosition(moveable, datas.targetAllTransform, datas.fixedDirection, datas.fixedOffset, datas);
			const inverseDist = getRotateDist(moveable, dist, datas);
			const inverseDelta = minus(plus(groupDelta || [0, 0], inverseDist), datas.prevInverseDist || [0, 0]);
			datas.prevInverseDist = inverseDist;
			datas.requestValue = null;
			const dragEvent = fillTransformEvent(moveable, nextTransform, inverseDelta, isPinch, e);
			let transformEvent = dragEvent;
			const parentDistance = getDist$2([nextClientX, nextClientY], absoluteInfo.startAbsoluteOrigin) - absoluteInfo.startDist;
			let resize = void 0;
			if (datas.resolveAble === "resizable") {
				const resizeEvent = Resizable_default.dragControl(moveable, {
					...setCustomDrag(e, moveable.state, [e.deltaX, e.deltaY], !!isPinch, false, "resizable"),
					resolveMatrix: true,
					parentDistance
				});
				if (resizeEvent) {
					resize = resizeEvent;
					transformEvent = fillAfterTransform(transformEvent, resizeEvent, e);
				}
			}
			const params = fillParams(moveable, e, {
				delta,
				dist,
				rotate: rotation,
				rotation,
				beforeDist,
				beforeDelta,
				beforeRotate: beforeRotation,
				beforeRotation,
				absoluteDist,
				absoluteDelta,
				absoluteRotate: absoluteRotation,
				absoluteRotation,
				isPinch: !!isPinch,
				resize,
				...dragEvent,
				...transformEvent
			});
			triggerEvent(moveable, "onRotate", params);
			return params;
		},
		dragControlEnd(moveable, e) {
			const { datas } = e;
			if (!datas.isRotate) return;
			datas.isRotate = false;
			const params = fillEndParams(moveable, e, {});
			triggerEvent(moveable, "onRotateEnd", params);
			return params;
		},
		dragGroupControlCondition: dragControlCondition,
		dragGroupControlStart(moveable, e) {
			const { datas } = e;
			const { left: parentLeft, top: parentTop, beforeOrigin: parentBeforeOrigin } = moveable.state;
			const params = this.dragControlStart(moveable, e);
			if (!params) return false;
			params.set(datas.beforeDirection * moveable.rotation);
			const events = triggerChildAbles(moveable, this, "dragControlStart", e, (child, ev) => {
				const { left, top, beforeOrigin } = child.state;
				const childClient = plus(minus([left, top], [parentLeft, parentTop]), minus(beforeOrigin, parentBeforeOrigin));
				ev.datas.startGroupClient = childClient;
				ev.datas.groupClient = childClient;
				return {
					...ev,
					parentRotate: 0
				};
			});
			datas.isRotate = triggerEvent(moveable, "onRotateGroupStart", {
				...params,
				targets: moveable.props.targets,
				events
			}) !== false;
			return datas.isRotate ? params : false;
		},
		dragGroupControl(moveable, e) {
			const { datas } = e;
			if (!datas.isRotate) return;
			catchEvent(moveable, "onBeforeRotate", (parentEvent) => {
				triggerEvent(moveable, "onBeforeRotateGroup", fillParams(moveable, e, {
					...parentEvent,
					targets: moveable.props.targets
				}, true));
			});
			const params = this.dragControl(moveable, e);
			if (!params) return;
			const direction = datas.beforeDirection;
			const parentRotate = params.beforeDist;
			const rad = parentRotate / 180 * Math.PI;
			const events = triggerChildAbles(moveable, this, "dragControl", e, (_, ev) => {
				const startGroupClient = ev.datas.startGroupClient;
				const [prevClientX, prevClientY] = ev.datas.groupClient;
				const [clientX, clientY] = rotate(startGroupClient, rad * direction);
				const delta = [clientX - prevClientX, clientY - prevClientY];
				ev.datas.groupClient = [clientX, clientY];
				return {
					...ev,
					parentRotate,
					groupDelta: delta
				};
			});
			moveable.rotation = direction * params.beforeRotation;
			const nextParams = {
				targets: moveable.props.targets,
				events,
				set(rotation) {
					moveable.rotation = rotation;
				},
				setGroupRotation(rotation) {
					moveable.rotation = rotation;
				},
				...params
			};
			triggerEvent(moveable, "onRotateGroup", nextParams);
			return nextParams;
		},
		dragGroupControlEnd(moveable, e) {
			const { isDrag, datas } = e;
			if (!datas.isRotate) return;
			this.dragControlEnd(moveable, e);
			const events = triggerChildAbles(moveable, this, "dragControlEnd", e);
			triggerEvent(moveable, "onRotateGroupEnd", fillEndParams(moveable, e, {
				targets: moveable.props.targets,
				events
			}));
			return isDrag;
		},
		/**
		* @method Moveable.Rotatable#request
		* @param {object} [e] - the Resizable's request parameter
		* @param {number} [e.deltaRotate=0] -  delta number of rotation
		* @param {number} [e.rotate=0] - absolute number of moveable's rotation
		* @return {Moveable.Requester} Moveable Requester
		* @example
		
		* // Instantly Request (requestStart - request - requestEnd)
		* moveable.request("rotatable", { deltaRotate: 10 }, true);
		*
		* * moveable.request("rotatable", { rotate: 10 }, true);
		*
		* // requestStart
		* const requester = moveable.request("rotatable");
		*
		* // request
		* requester.request({ deltaRotate: 10 });
		* requester.request({ deltaRotate: 10 });
		* requester.request({ deltaRotate: 10 });
		*
		* requester.request({ rotate: 10 });
		* requester.request({ rotate: 20 });
		* requester.request({ rotate: 30 });
		*
		* // requestEnd
		* requester.requestEnd();
		*/
		request(moveable) {
			const datas = {};
			let distRotate = 0;
			const startRotation = moveable.getRotation();
			return {
				isControl: true,
				requestStart() {
					return { datas };
				},
				request(e) {
					if ("deltaRotate" in e) distRotate += e.deltaRotate;
					else if ("rotate" in e) distRotate = e.rotate - startRotation;
					return {
						datas,
						parentDist: distRotate
					};
				},
				requestEnd() {
					return {
						datas,
						isDrag: true
					};
				}
			};
		}
	};
	/**
	* Whether or not target can be rotated. (default: false)
	* @name Moveable.Rotatable#rotatable
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.rotatable = true;
	*/
	/**
	* You can specify the position of the rotation. (default: "top")
	* @name Moveable.Rotatable#rotationPosition
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*   rotationPosition: "top",
	* });
	*
	* moveable.rotationPosition = "bottom"
	*/
	/**
	* throttle of angle(degree) when rotate.
	* @name Moveable.Rotatable#throttleRotate
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.throttleRotate = 1;
	*/
	/**
	* When the rotate starts, the rotateStart event is called.
	* @memberof Moveable.Rotatable
	* @event rotateStart
	* @param {Moveable.Rotatable.OnRotateStart} - Parameters for the rotateStart event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { rotatable: true });
	* moveable.on("rotateStart", ({ target }) => {
	*     console.log(target);
	* });
	*/
	/**
	* When rotating, the rotate event is called.
	* @memberof Moveable.Rotatable
	* @event rotate
	* @param {Moveable.Rotatable.OnRotate} - Parameters for the rotate event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { rotatable: true });
	* moveable.on("rotate", ({ target, transform, dist }) => {
	*     target.style.transform = transform;
	* });
	*/
	/**
	* When the rotate finishes, the rotateEnd event is called.
	* @memberof Moveable.Rotatable
	* @event rotateEnd
	* @param {Moveable.Rotatable.OnRotateEnd} - Parameters for the rotateEnd event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { rotatable: true });
	* moveable.on("rotateEnd", ({ target, isDrag }) => {
	*     console.log(target, isDrag);
	* });
	*/
	/**
	* When the group rotate starts, the `rotateGroupStart` event is called.
	* @memberof Moveable.Rotatable
	* @event rotateGroupStart
	* @param {Moveable.Rotatable.OnRotateGroupStart} - Parameters for the `rotateGroupStart` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     rotatable: true
	* });
	* moveable.on("rotateGroupStart", ({ targets }) => {
	*     console.log("onRotateGroupStart", targets);
	* });
	*/
	/**
	* When the group rotate, the `rotateGroup` event is called.
	* @memberof Moveable.Rotatable
	* @event rotateGroup
	* @param {Moveable.Rotatable.OnRotateGroup} - Parameters for the `rotateGroup` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     rotatable: true
	* });
	* moveable.on("rotateGroup", ({ targets, events }) => {
	*     console.log("onRotateGroup", targets);
	*     events.forEach(ev => {
	*         const target = ev.target;
	*         // ev.drag is a drag event that occurs when the group rotate.
	*         const left = ev.drag.beforeDist[0];
	*         const top = ev.drag.beforeDist[1];
	*         const deg = ev.beforeDist;
	*     });
	* });
	*/
	/**
	* When the group rotate finishes, the `rotateGroupEnd` event is called.
	* @memberof Moveable.Rotatable
	* @event rotateGroupEnd
	* @param {Moveable.Rotatable.OnRotateGroupEnd} - Parameters for the `rotateGroupEnd` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     rotatable: true
	* });
	* moveable.on("rotateGroupEnd", ({ targets, isDrag }) => {
	*     console.log("onRotateGroupEnd", targets, isDrag);
	* });
	*/
	function renderGuideline(info, React) {
		const { direction, classNames, size, pos, zoom, key } = info;
		const isHorizontal = direction === "horizontal";
		const scaleType = isHorizontal ? "Y" : "X";
		return React.createElement("div", {
			key,
			className: classNames.join(" "),
			style: {
				[isHorizontal ? "width" : "height"]: `${size}`,
				transform: `translate(${pos[0]}, ${pos[1]}) translate${scaleType}(-50%) scale${scaleType}(${zoom})`
			}
		});
	}
	function renderInnerGuideline(info, React) {
		return renderGuideline({
			...info,
			classNames: [prefix("line", "guideline", info.direction), ...info.classNames].filter((className) => className),
			size: info.size || `${info.sizeValue}px`,
			pos: info.pos || info.posValue.map((v) => `${throttle(v, .1)}px`)
		}, React);
	}
	function renderSnapPoses(moveable, direction, snapPoses, minPos, targetPos, size, index, React) {
		const { zoom } = moveable.props;
		return snapPoses.map(({ type, pos }, i) => {
			const renderPos = [0, 0];
			renderPos[index] = minPos;
			renderPos[index ? 0 : 1] = -targetPos + pos;
			return renderInnerGuideline({
				key: `${direction}TargetGuideline${i}`,
				classNames: [prefix("target", "bold", type)],
				posValue: renderPos,
				sizeValue: size,
				zoom,
				direction
			}, React);
		});
	}
	function renderGuidelines(moveable, type, guidelines, targetPos, targetRect, React) {
		const { zoom, isDisplayInnerSnapDigit } = moveable.props;
		const mainNames = type === "horizontal" ? VERTICAL_NAMES_MAP : HORIZONTAL_NAMES_MAP;
		const targetStart = targetRect[mainNames.start];
		const targetEnd = targetRect[mainNames.end];
		return guidelines.filter(({ hide, elementRect }) => {
			if (hide) return false;
			if (isDisplayInnerSnapDigit && elementRect) {
				const rect = elementRect.rect;
				if (rect[mainNames.start] <= targetStart && targetEnd <= rect[mainNames.end]) return false;
			}
			return true;
		}).map((guideline, i) => {
			const { pos, size, element, className } = guideline;
			const renderPos = [-targetPos[0] + pos[0], -targetPos[1] + pos[1]];
			return renderInnerGuideline({
				key: `${type}-default-guideline-${i}`,
				classNames: element ? [prefix("bold"), className] : [prefix("normal"), className],
				direction: type,
				posValue: renderPos,
				sizeValue: size,
				zoom
			}, React);
		});
	}
	function renderDigitLine(moveable, type, lineType, index, gap, renderPos, className, React) {
		const { snapDigit = 0, isDisplaySnapDigit = true, snapDistFormat = (v, type) => {
			if (type === "vertical") return v;
			return v;
		}, zoom } = moveable.props;
		const scaleType = type === "horizontal" ? "X" : "Y";
		const sizeName = type === "vertical" ? "height" : "width";
		const absGap = Math.abs(gap);
		const snapSize = isDisplaySnapDigit ? parseFloat(absGap.toFixed(snapDigit)) : 0;
		return /* @__PURE__ */ React.createElement("div", {
			key: `${type}-${lineType}-guideline-${index}`,
			className: prefix("guideline-group", type),
			style: {
				left: `${renderPos[0]}px`,
				top: `${renderPos[1]}px`,
				[sizeName]: `${absGap}px`
			}
		}, renderInnerGuideline({
			direction: type,
			classNames: [prefix(lineType), className],
			size: "100%",
			posValue: [0, 0],
			sizeValue: absGap,
			zoom
		}, React), /* @__PURE__ */ React.createElement("div", {
			className: prefix("size-value", "gap"),
			style: { transform: `translate${scaleType}(-50%) scale(${zoom})` }
		}, snapSize > 0 ? snapDistFormat(snapSize, type) : ""));
	}
	function groupByElementGuidelines(type, guidelines, targetRect, isDisplayInnerSnapDigit) {
		const index = type === "vertical" ? 0 : 1;
		const otherIndex = type === "vertical" ? 1 : 0;
		const names = index ? VERTICAL_NAMES_MAP : HORIZONTAL_NAMES_MAP;
		const targetStart = targetRect[names.start];
		const targetEnd = targetRect[names.end];
		return groupBy(guidelines, (guideline) => {
			return guideline.pos[index];
		}).map((nextGuidelines) => {
			const start = [];
			const end = [];
			const inner = [];
			nextGuidelines.forEach((guideline) => {
				const element = guideline.element;
				const rect = guideline.elementRect.rect;
				if (rect[names.end] < targetStart) start.push(guideline);
				else if (targetEnd < rect[names.start]) end.push(guideline);
				else if (rect[names.start] <= targetStart && targetEnd <= rect[names.end] && isDisplayInnerSnapDigit) {
					const pos = guideline.pos;
					const elementRect1 = {
						element,
						rect: {
							...rect,
							[names.end]: rect[names.start]
						}
					};
					const elementRect2 = {
						element,
						rect: {
							...rect,
							[names.start]: rect[names.end]
						}
					};
					const nextPos1 = [0, 0];
					const nextPos2 = [0, 0];
					nextPos1[index] = pos[index];
					nextPos1[otherIndex] = pos[otherIndex];
					nextPos2[index] = pos[index];
					nextPos2[otherIndex] = pos[otherIndex] + guideline.size;
					start.push({
						type,
						pos: nextPos1,
						size: 0,
						elementRect: elementRect1,
						direction: "",
						elementDirection: "end"
					});
					end.push({
						type,
						pos: nextPos2,
						size: 0,
						elementRect: elementRect2,
						direction: "",
						elementDirection: "start"
					});
				}
			});
			start.sort((a, b) => {
				return b.pos[otherIndex] - a.pos[otherIndex];
			});
			end.sort((a, b) => {
				return a.pos[otherIndex] - b.pos[otherIndex];
			});
			return {
				total: nextGuidelines,
				start,
				end,
				inner
			};
		});
	}
	function renderDashedGuidelines(moveable, guidelines, targetPos, targetRect, React) {
		const { isDisplayInnerSnapDigit } = moveable.props;
		const rendered = [];
		["vertical", "horizontal"].forEach((type) => {
			const nextGuidelines = guidelines.filter((guideline) => guideline.type === type);
			const index = type === "vertical" ? 1 : 0;
			const otherIndex = index ? 0 : 1;
			const groups = groupByElementGuidelines(type, nextGuidelines, targetRect, isDisplayInnerSnapDigit);
			const mainNames = index ? HORIZONTAL_NAMES_MAP : VERTICAL_NAMES_MAP;
			const sideNames = index ? VERTICAL_NAMES_MAP : HORIZONTAL_NAMES_MAP;
			const targetStart = targetRect[mainNames.start];
			const targetEnd = targetRect[mainNames.end];
			groups.forEach(({ total, start, end, inner }) => {
				const sidePos = targetPos[otherIndex] + total[0].pos[otherIndex] - targetRect[sideNames.start];
				let prevRect = targetRect;
				start.forEach((guideline) => {
					const nextRect = guideline.elementRect.rect;
					const size = prevRect[mainNames.start] - nextRect[mainNames.end];
					if (size > 0) {
						const renderPos = [0, 0];
						renderPos[index] = targetPos[index] + prevRect[mainNames.start] - targetStart - size;
						renderPos[otherIndex] = sidePos;
						rendered.push(renderDigitLine(moveable, type, "dashed", rendered.length, size, renderPos, guideline.className, React));
					}
					prevRect = nextRect;
				});
				prevRect = targetRect;
				end.forEach((guideline) => {
					const nextRect = guideline.elementRect.rect;
					const size = nextRect[mainNames.start] - prevRect[mainNames.end];
					if (size > 0) {
						const renderPos = [0, 0];
						renderPos[index] = targetPos[index] + prevRect[mainNames.end] - targetStart;
						renderPos[otherIndex] = sidePos;
						rendered.push(renderDigitLine(moveable, type, "dashed", rendered.length, size, renderPos, guideline.className, React));
					}
					prevRect = nextRect;
				});
				inner.forEach((guideline) => {
					const nextRect = guideline.elementRect.rect;
					const size1 = targetStart - nextRect[mainNames.start];
					const size2 = nextRect[mainNames.end] - targetEnd;
					const renderPos1 = [0, 0];
					const renderPos2 = [0, 0];
					renderPos1[index] = targetPos[index] - size1;
					renderPos1[otherIndex] = sidePos;
					renderPos2[index] = targetPos[index] + targetEnd - targetStart;
					renderPos2[otherIndex] = sidePos;
					rendered.push(renderDigitLine(moveable, type, "dashed", rendered.length, size1, renderPos1, guideline.className, React));
					rendered.push(renderDigitLine(moveable, type, "dashed", rendered.length, size2, renderPos2, guideline.className, React));
				});
			});
		});
		return rendered;
	}
	function renderGapGuidelines(moveable, guidelines, targetPos, targetRect, React) {
		const rendered = [];
		["horizontal", "vertical"].forEach((type) => {
			const nextGuidelines = guidelines.filter((guideline) => guideline.type === type).slice(0, 1);
			const index = type === "vertical" ? 0 : 1;
			const otherIndex = index ? 0 : 1;
			const mainNames = index ? HORIZONTAL_NAMES_MAP : VERTICAL_NAMES_MAP;
			const sideNames = index ? VERTICAL_NAMES_MAP : HORIZONTAL_NAMES_MAP;
			const targetStart = targetRect[mainNames.start];
			const targetEnd = targetRect[mainNames.end];
			const targetSideStart = targetRect[sideNames.start];
			const targetSideEnd = targetRect[sideNames.end];
			nextGuidelines.forEach(({ gap, gapRects }) => {
				const sideStartPos = Math.max(targetSideStart, ...gapRects.map(({ rect }) => rect[sideNames.start]));
				const sideEndPos = Math.min(targetSideEnd, ...gapRects.map(({ rect }) => rect[sideNames.end]));
				const sideCenterPos = (sideStartPos + sideEndPos) / 2;
				if (sideStartPos === sideEndPos || sideCenterPos === (targetSideStart + targetSideEnd) / 2) return;
				gapRects.forEach(({ rect, className }) => {
					const renderPos = [targetPos[0], targetPos[1]];
					if (rect[mainNames.end] < targetStart) renderPos[index] += rect[mainNames.end] - targetStart;
					else if (targetEnd < rect[mainNames.start]) renderPos[index] += rect[mainNames.start] - targetStart - gap;
					else return;
					renderPos[otherIndex] += sideCenterPos - targetSideStart;
					rendered.push(renderDigitLine(moveable, index ? "vertical" : "horizontal", "gap", rendered.length, gap, renderPos, className, React));
				});
			});
		});
		return rendered;
	}
	function getTotalGuidelines(moveable) {
		const state = moveable.state;
		const { containerClientRect, hasFixed } = state;
		const { overflow, scrollHeight: containerHeight, scrollWidth: containerWidth, clientHeight: containerClientHeight, clientWidth: containerClientWidth, clientLeft, clientTop } = containerClientRect;
		const { snapGap = true, verticalGuidelines, horizontalGuidelines, snapThreshold = 5, maxSnapElementGuidelineDistance = Infinity, isDisplayGridGuidelines } = moveable.props;
		const { top, left, bottom, right } = getRect(getAbsolutePosesByState(moveable.state));
		const targetRect = {
			top,
			left,
			bottom,
			right,
			center: (left + right) / 2,
			middle: (top + bottom) / 2
		};
		let totalGuidelines = [...getElementGuidelines(moveable)];
		const snapThresholdMultiples = (state.snapThresholdInfo?.multiples ?? [1, 1]).map((n) => n * snapThreshold);
		if (snapGap) totalGuidelines.push(...getGapGuidelines(moveable, targetRect, snapThresholdMultiples));
		const snapOffset = { ...state.snapOffset || {
			left: 0,
			top: 0,
			bottom: 0,
			right: 0
		} };
		totalGuidelines.push(...getGridGuidelines(moveable, overflow ? containerWidth : containerClientWidth, overflow ? containerHeight : containerClientHeight, clientLeft, clientTop, snapOffset, isDisplayGridGuidelines));
		if (hasFixed) {
			const { left, top } = containerClientRect;
			snapOffset.left += left;
			snapOffset.top += top;
			snapOffset.right += left;
			snapOffset.bottom += top;
		}
		totalGuidelines.push(...getDefaultGuidelines(horizontalGuidelines || false, verticalGuidelines || false, overflow ? containerWidth : containerClientWidth, overflow ? containerHeight : containerClientHeight, clientLeft, clientTop, snapOffset));
		totalGuidelines = totalGuidelines.filter(({ element, elementRect, type }) => {
			if (!element || !elementRect) return true;
			const rect = elementRect.rect;
			return checkBetweenRects(targetRect, rect, type, maxSnapElementGuidelineDistance);
		});
		return totalGuidelines;
	}
	function getGapGuidelines(moveable, targetRect, snapThresholds) {
		const { maxSnapElementGuidelineDistance = Infinity, maxSnapElementGapDistance = Infinity } = moveable.props;
		const elementRects = moveable.state.elementRects;
		const gapGuidelines = [];
		[[
			"vertical",
			VERTICAL_NAMES_MAP,
			HORIZONTAL_NAMES_MAP
		], [
			"horizontal",
			HORIZONTAL_NAMES_MAP,
			VERTICAL_NAMES_MAP
		]].forEach(([type, mainNames, sideNames]) => {
			const targetStart = targetRect[mainNames.start];
			const targetEnd = targetRect[mainNames.end];
			const targetCenter = targetRect[mainNames.center];
			const targetStart2 = targetRect[sideNames.start];
			const targetEnd2 = targetRect[sideNames.end];
			const snapThresholdMap = {
				left: snapThresholds[0],
				top: snapThresholds[1]
			};
			function getDist(elementRect) {
				const rect = elementRect.rect;
				const snapThreshold = snapThresholdMap[mainNames.start];
				if (rect[mainNames.end] < targetStart + snapThreshold) return targetStart - rect[mainNames.end];
				else if (targetEnd - snapThreshold < rect[mainNames.start]) return rect[mainNames.start] - targetEnd;
				else return -1;
			}
			const nextElementRects = elementRects.filter((elementRect) => {
				const rect = elementRect.rect;
				if (rect[sideNames.start] > targetEnd2 || rect[sideNames.end] < targetStart2) return false;
				return getDist(elementRect) > 0;
			}).sort((a, b) => {
				return getDist(a) - getDist(b);
			});
			const groups = [];
			nextElementRects.forEach((snapRect1) => {
				nextElementRects.forEach((snapRect2) => {
					if (snapRect1 === snapRect2) return;
					const { rect: rect1 } = snapRect1;
					const { rect: rect2 } = snapRect2;
					const rect1Start = rect1[sideNames.start];
					const rect1End = rect1[sideNames.end];
					const rect2Start = rect2[sideNames.start];
					if (rect1Start > rect2[sideNames.end] || rect2Start > rect1End) return;
					groups.push([snapRect1, snapRect2]);
				});
			});
			groups.forEach(([snapRect1, snapRect2]) => {
				const { rect: rect1 } = snapRect1;
				const { rect: rect2 } = snapRect2;
				const rect1Start = rect1[mainNames.start];
				const rect1End = rect1[mainNames.end];
				const rect2Start = rect2[mainNames.start];
				const rect2End = rect2[mainNames.end];
				const snapThreshold = snapThresholdMap[mainNames.start];
				let gap;
				let pos;
				let isStart = false;
				let isCenter = false;
				let isEnd = false;
				if (rect1End <= targetStart && targetEnd <= rect2Start) {
					isCenter = true;
					gap = (rect2Start - rect1End - (targetEnd - targetStart)) / 2;
					pos = rect1End + gap + (targetEnd - targetStart) / 2;
					if (abs(pos - targetCenter) > snapThreshold) return;
				} else if (rect1End < rect2Start && rect2End < targetStart + snapThreshold) {
					isStart = true;
					gap = rect2Start - rect1End;
					pos = rect2End + gap;
					if (abs(pos - targetStart) > snapThreshold) return;
				} else if (rect1End < rect2Start && targetEnd - snapThreshold < rect1Start) {
					isEnd = true;
					gap = rect2Start - rect1End;
					pos = rect1Start - gap;
					if (abs(pos - targetEnd) > snapThreshold) return;
				} else return;
				if (!gap) return;
				if (!checkBetweenRects(targetRect, rect2, type, maxSnapElementGuidelineDistance)) return;
				if (gap > maxSnapElementGapDistance) return;
				gapGuidelines.push({
					type,
					pos: type === "vertical" ? [pos, 0] : [0, pos],
					element: snapRect2.element,
					size: 0,
					className: snapRect2.className,
					isStart,
					isCenter,
					isEnd,
					gap,
					hide: true,
					gapRects: [snapRect1, snapRect2],
					direction: "",
					elementDirection: ""
				});
			});
		});
		return gapGuidelines;
	}
	function startGridGroupGuidelines(moveable, clientLeft, clientTop, snapOffset) {
		const props = moveable.props;
		const state = moveable.state;
		const { snapGridAll } = props;
		const { snapGridWidth = 0, snapGridHeight = 0 } = props;
		const { snapRenderInfo } = state;
		const hasDirection = snapRenderInfo && (snapRenderInfo.direction?.[0] || snapRenderInfo.direction?.[1]);
		const moveables = moveable.moveables;
		const ignores = [false, false];
		if (snapGridAll && moveables && hasDirection && (snapGridWidth || snapGridHeight)) {
			if (state.snapThresholdInfo) return;
			state.snapThresholdInfo = {
				multiples: [1, 1],
				offset: [0, 0]
			};
			const rect = moveable.getRect();
			const children = rect.children;
			const direction = snapRenderInfo.direction;
			if (children) {
				const result = direction.map((dir, i) => {
					const { snapSize, posName, sizeName, clientOffset } = i === 0 ? {
						snapSize: snapGridWidth,
						posName: "left",
						sizeName: "width",
						clientOffset: snapOffset.left - clientLeft
					} : {
						snapSize: snapGridHeight,
						posName: "top",
						sizeName: "height",
						clientOffset: snapOffset.top - clientTop
					};
					if (!snapSize) return {
						dir,
						multiple: 1,
						snapSize,
						snapOffset: 0
					};
					const rectSize = rect[sizeName];
					const rectPos = rect[posName];
					const childSizes = flat$2(children.map((child) => {
						return [
							child[posName] - rectPos,
							child[sizeName],
							rectSize - child[sizeName] - child[posName] + rectPos
						];
					})).filter((v) => v).sort((a, b) => {
						return a - b;
					});
					const firstChildSize = childSizes[0];
					const childSnapSizes = childSizes.map((size) => throttle(size / firstChildSize, .1) * snapSize);
					let n = 1;
					const rectRatio = throttle(rectSize / firstChildSize, .1);
					for (n = 1; n <= 10; ++n) if (childSnapSizes.every((childSize) => {
						return childSize * n % 1 === 0;
					})) break;
					const ratio = (-dir + 1) / 2;
					const offsetPos = dot(rectPos - clientOffset, rectPos - clientOffset + rectSize, ratio, 1 - ratio);
					return {
						multiple: rectRatio * n,
						dir,
						snapSize,
						snapOffset: Math.round(offsetPos / snapSize)
					};
				});
				const multiples = result.map((r) => r.multiple || 1);
				state.snapThresholdInfo.multiples = multiples;
				state.snapThresholdInfo.offset = result.map((r) => r.snapOffset);
				result.forEach((r, i) => {
					if (r.snapSize) ignores[i] = true;
				});
			}
		} else state.snapThresholdInfo = null;
	}
	function getGridGuidelines(moveable, containerWidth, containerHeight, clientLeft = 0, clientTop = 0, snapOffset, isDisplayGridGuidelines) {
		const props = moveable.props;
		const state = moveable.state;
		let { snapGridWidth = 0, snapGridHeight = 0 } = props;
		const guidelines = [];
		const { left: snapOffsetLeft, top: snapOffsetTop } = snapOffset;
		let startOffset = [0, 0];
		startGridGroupGuidelines(moveable, clientLeft, clientTop, snapOffset);
		const snapThresholdInfo = state.snapThresholdInfo;
		const defaultSnapGridWidth = snapGridWidth;
		const defaultSnapGridHeight = snapGridHeight;
		if (snapThresholdInfo) {
			snapGridWidth *= snapThresholdInfo.multiples[0] || 1;
			snapGridHeight *= snapThresholdInfo.multiples[1] || 1;
			startOffset = snapThresholdInfo.offset;
		}
		if (snapGridHeight) {
			const pushGuideline = (pos) => {
				guidelines.push({
					type: "horizontal",
					pos: [snapOffsetLeft, throttle(startOffset[1] * defaultSnapGridHeight + pos - clientTop + snapOffsetTop, .1)],
					className: prefix("grid-guideline"),
					size: containerWidth,
					hide: !isDisplayGridGuidelines,
					direction: "",
					grid: true
				});
			};
			for (let pos = 0; pos <= containerHeight * 2; pos += snapGridHeight) pushGuideline(pos);
			for (let pos = -snapGridHeight; pos >= -containerHeight; pos -= snapGridHeight) pushGuideline(pos);
		}
		if (snapGridWidth) {
			const pushGuideline = (pos) => {
				guidelines.push({
					type: "vertical",
					pos: [throttle(startOffset[0] * defaultSnapGridWidth + pos - clientLeft + snapOffsetLeft, .1), snapOffsetTop],
					className: prefix("grid-guideline"),
					size: containerHeight,
					hide: !isDisplayGridGuidelines,
					direction: "",
					grid: true
				});
			};
			for (let pos = 0; pos <= containerWidth * 2; pos += snapGridWidth) pushGuideline(pos);
			for (let pos = -snapGridWidth; pos >= -containerWidth; pos -= snapGridWidth) pushGuideline(pos);
		}
		return guidelines;
	}
	function checkBetweenRects(rect1, rect2, type, distance) {
		if (type === "horizontal") return abs(rect1.right - rect2.left) <= distance || abs(rect1.left - rect2.right) <= distance || rect1.left <= rect2.right && rect2.left <= rect1.right;
		else if (type === "vertical") return abs(rect1.bottom - rect2.top) <= distance || abs(rect1.top - rect2.bottom) <= distance || rect1.top <= rect2.bottom && rect2.top <= rect1.bottom;
		return true;
	}
	function getElementGuidelines(moveable) {
		const state = moveable.state;
		const { elementGuidelines = [] } = moveable.props;
		if (!elementGuidelines.length) {
			state.elementRects = [];
			return [];
		}
		const prevValues = (state.elementRects || []).filter((snapRect) => !snapRect.refresh);
		const nextElementGuidelines = elementGuidelines.map((el) => {
			if (isObject(el) && "element" in el) return {
				...el,
				element: getRefTarget(el.element, true)
			};
			return { element: getRefTarget(el, true) };
		}).filter((value) => {
			return value.element;
		});
		const { maintained, added } = diff(prevValues.map((v) => v.element), nextElementGuidelines.map((v) => v.element));
		const nextValues = [];
		maintained.forEach(([prevIndex, nextIndex]) => {
			nextValues[nextIndex] = prevValues[prevIndex];
		});
		getSnapElementRects(moveable, added.map((index) => nextElementGuidelines[index])).map((rect, i) => {
			nextValues[added[i]] = rect;
		});
		state.elementRects = nextValues;
		const elementSnapDirections = getSnapDirections(moveable.props.elementSnapDirections);
		const nextGuidelines = [];
		nextValues.forEach((snapRect) => {
			const { element, top: topValue = elementSnapDirections.top, left: leftValue = elementSnapDirections.left, right: rightValue = elementSnapDirections.right, bottom: bottomValue = elementSnapDirections.bottom, center: centerValue = elementSnapDirections.center, middle: middleValue = elementSnapDirections.middle, className, rect } = snapRect;
			const { horizontal, vertical, horizontalNames, verticalNames } = splitSnapDirectionPoses({
				top: topValue,
				right: rightValue,
				left: leftValue,
				bottom: bottomValue,
				center: centerValue,
				middle: middleValue
			}, rect);
			const rectTop = rect.top;
			const rectLeft = rect.left;
			const width = rect.right - rectLeft;
			const height = rect.bottom - rectTop;
			const sizes = [width, height];
			vertical.forEach((pos, i) => {
				nextGuidelines.push({
					type: "vertical",
					element,
					pos: [throttle(pos, .1), rectTop],
					size: height,
					sizes,
					className,
					elementRect: snapRect,
					elementDirection: SNAP_SKIP_NAMES_MAP[verticalNames[i]] || verticalNames[i],
					direction: ""
				});
			});
			horizontal.forEach((pos, i) => {
				nextGuidelines.push({
					type: "horizontal",
					element,
					pos: [rectLeft, throttle(pos, .1)],
					size: width,
					sizes,
					className,
					elementRect: snapRect,
					elementDirection: SNAP_SKIP_NAMES_MAP[horizontalNames[i]] || horizontalNames[i],
					direction: ""
				});
			});
		});
		return nextGuidelines;
	}
	function getObjectGuidelines(guidelines, containerSize) {
		return guidelines ? guidelines.map((info) => {
			const posGuideline = isObject(info) ? info : { pos: info };
			const pos = posGuideline.pos;
			if (isNumber(pos)) return posGuideline;
			else return {
				...posGuideline,
				pos: convertUnitSize(pos, containerSize)
			};
		}) : [];
	}
	function getDefaultGuidelines(horizontalGuidelines, verticalGuidelines, width, height, clientLeft = 0, clientTop = 0, snapOffset = {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	}) {
		const guidelines = [];
		const { left: snapOffsetLeft, top: snapOffsetTop, bottom: snapOffsetBottom, right: snapOffsetRight } = snapOffset;
		const snapWidth = width + snapOffsetRight - snapOffsetLeft;
		const snapHeight = height + snapOffsetBottom - snapOffsetTop;
		getObjectGuidelines(horizontalGuidelines, snapHeight).forEach((posInfo) => {
			guidelines.push({
				type: "horizontal",
				pos: [snapOffsetLeft, throttle(posInfo.pos - clientTop + snapOffsetTop, .1)],
				size: snapWidth,
				className: posInfo.className,
				direction: ""
			});
		});
		getObjectGuidelines(verticalGuidelines, snapWidth).forEach((posInfo) => {
			guidelines.push({
				type: "vertical",
				pos: [throttle(posInfo.pos - clientLeft + snapOffsetLeft, .1), snapOffsetTop],
				size: snapHeight,
				className: posInfo.className,
				direction: ""
			});
		});
		return guidelines;
	}
	function getSnapElementRects(moveable, values) {
		if (!values.length) return [];
		const groupable = moveable.props.groupable;
		const { containerClientRect, rootMatrix, is3d, offsetDelta } = moveable.state;
		const n = is3d ? 4 : 3;
		const [containerLeft, containerTop] = calculateContainerPos(rootMatrix, containerClientRect, n);
		const offsetLeft = groupable ? 0 : offsetDelta[0];
		const offsetTop = groupable ? 0 : offsetDelta[1];
		return values.map((value) => {
			const rect = value.element.getBoundingClientRect();
			const left = rect.left - containerLeft - offsetLeft;
			const top = rect.top - containerTop - offsetTop;
			const bottom = top + rect.height;
			const right = left + rect.width;
			const [elementLeft, elementTop] = calculateInversePosition(rootMatrix, [left, top], n);
			const [elementRight, elementBottom] = calculateInversePosition(rootMatrix, [right, bottom], n);
			return {
				...value,
				rect: {
					left: elementLeft,
					right: elementRight,
					top: elementTop,
					bottom: elementBottom,
					center: (elementLeft + elementRight) / 2,
					middle: (elementTop + elementBottom) / 2
				}
			};
		});
	}
	function checkSnapInfo(moveable) {
		const state = moveable.state;
		const container = state.container;
		const snapContainer = moveable.props.snapContainer || container;
		if (state.snapContainer === snapContainer && state.guidelines && state.guidelines.length) return false;
		const containerClientRect = state.containerClientRect;
		const snapOffset = {
			left: 0,
			top: 0,
			bottom: 0,
			right: 0
		};
		if (container !== snapContainer) {
			const snapContainerTarget = getRefTarget(snapContainer, true);
			if (snapContainerTarget) {
				const snapContainerRect = getClientRect(snapContainerTarget);
				const offset1 = getDragDistByState(state, [snapContainerRect.left - containerClientRect.left, snapContainerRect.top - containerClientRect.top]);
				const offset2 = getDragDistByState(state, [snapContainerRect.right - containerClientRect.right, snapContainerRect.bottom - containerClientRect.bottom]);
				snapOffset.left = throttle(offset1[0], 1e-5);
				snapOffset.top = throttle(offset1[1], 1e-5);
				snapOffset.right = throttle(offset2[0], 1e-5);
				snapOffset.bottom = throttle(offset2[1], 1e-5);
			}
		}
		state.snapContainer = snapContainer;
		state.snapOffset = snapOffset;
		state.guidelines = getTotalGuidelines(moveable);
		state.enableSnap = true;
		return true;
	}
	function getNextFixedPoses(matrix, width, height, fixedDirection, fixedPos, is3d) {
		const nextPoses = calculatePoses(matrix, width, height, is3d ? 4 : 3);
		return getAbsolutePoses(nextPoses, minus(fixedPos, getPosByDirection(nextPoses, fixedDirection)));
	}
	function normalized(value) {
		return value ? value / abs(value) : 0;
	}
	function getSizeOffsetInfo(moveable, poses, direction, keepRatio, isRequest, datas) {
		const { fixedDirection } = datas;
		const directions = getCheckSnapDirections(direction, fixedDirection, keepRatio);
		const innerBoundLineInfos = getCheckInnerBoundLineInfos(moveable, poses, direction, keepRatio);
		const offsets = [...getSnapBoundInfo(moveable, poses, directions, keepRatio, isRequest, datas), ...getInnerBoundInfo(moveable, innerBoundLineInfos, datas)];
		const widthOffsetInfo = getNearOffsetInfo(offsets, 0);
		const heightOffsetInfo = getNearOffsetInfo(offsets, 1);
		return {
			width: {
				isBound: widthOffsetInfo.isBound,
				offset: widthOffsetInfo.offset[0]
			},
			height: {
				isBound: heightOffsetInfo.isBound,
				offset: heightOffsetInfo.offset[1]
			}
		};
	}
	function recheckSizeByTwoDirection(moveable, poses, width, height, maxWidth, maxHeight, direction, isRequest, datas) {
		const snapPos = getPosByDirection(poses, direction);
		const { horizontal: { offset: horizontalOffset }, vertical: { offset: verticalOffset } } = checkMoveableSnapBounds(moveable, isRequest, {
			vertical: [snapPos[0]],
			horizontal: [snapPos[1]]
		});
		if (throttle(verticalOffset, 1e-4) || throttle(horizontalOffset, 1e-4)) {
			const [nextWidthOffset, nextHeightOffset] = getDragDist({
				datas,
				distX: -verticalOffset,
				distY: -horizontalOffset
			});
			const nextWidth = Math.min(maxWidth || Infinity, width + direction[0] * nextWidthOffset);
			const nextHeight = Math.min(maxHeight || Infinity, height + direction[1] * nextHeightOffset);
			return [nextWidth - width, nextHeight - height];
		}
		return [0, 0];
	}
	function checkSizeDist(moveable, getNextPoses, width, height, direction, fixedPosition, isRequest, datas) {
		const poses = getAbsolutePosesByState(moveable.state);
		const keepRatio = moveable.props.keepRatio;
		let widthOffset = 0;
		let heightOffset = 0;
		for (let i = 0; i < 2; ++i) {
			const { width: widthOffsetInfo, height: heightOffsetInfo } = getSizeOffsetInfo(moveable, getNextPoses(widthOffset, heightOffset), direction, keepRatio, isRequest, datas);
			const isWidthBound = widthOffsetInfo.isBound;
			const isHeightBound = heightOffsetInfo.isBound;
			let nextWidthOffset = widthOffsetInfo.offset;
			let nextHeightOffset = heightOffsetInfo.offset;
			if (i === 1) {
				if (!isWidthBound) nextWidthOffset = 0;
				if (!isHeightBound) nextHeightOffset = 0;
			}
			if (i === 0 && isRequest && !isWidthBound && !isHeightBound) return [0, 0];
			if (keepRatio) {
				const widthDist = abs(nextWidthOffset) * (width ? 1 / width : 1);
				const heightDist = abs(nextHeightOffset) * (height ? 1 / height : 1);
				if (isWidthBound && isHeightBound ? widthDist < heightDist : isHeightBound || !isWidthBound && widthDist < heightDist) nextWidthOffset = width * nextHeightOffset / height;
				else nextHeightOffset = height * nextWidthOffset / width;
			}
			widthOffset += nextWidthOffset;
			heightOffset += nextHeightOffset;
		}
		if (!keepRatio && direction[0] && direction[1]) {
			const { maxWidth, maxHeight } = checkMaxBounds(moveable, poses, direction, fixedPosition, datas);
			const [nextWidthOffset, nextHeightOffset] = recheckSizeByTwoDirection(moveable, getNextPoses(widthOffset, heightOffset).map((pos) => pos.map((p) => throttle(p, FLOAT_POINT_NUM))), width + widthOffset, height + heightOffset, maxWidth, maxHeight, direction, isRequest, datas);
			widthOffset += nextWidthOffset;
			heightOffset += nextHeightOffset;
		}
		return [widthOffset, heightOffset];
	}
	function absDegree(deg) {
		if (deg < 0) deg = deg % 360 + 360;
		deg %= 360;
		return deg;
	}
	function bumpDegree(baseDeg, snapDeg) {
		snapDeg = absDegree(snapDeg);
		const count = Math.floor(baseDeg / 360);
		const deg1 = count * 360 + 360 - snapDeg;
		const deg2 = count * 360 + snapDeg;
		return abs(baseDeg - deg1) < abs(baseDeg - deg2) ? deg1 : deg2;
	}
	function getMinDegreeDistance(deg1, deg2) {
		deg1 = absDegree(deg1);
		deg2 = absDegree(deg2);
		const deg3 = absDegree(deg1 - deg2);
		return Math.min(deg3, 360 - deg3);
	}
	function checkSnapRotate(moveable, rect, dist, rotation) {
		const props = moveable.props;
		const snapRotationThreshold = props["snapRotationThreshold"] ?? 5;
		const snapRotationDegrees = props[NAME_snapRotationDegrees];
		if (hasGuidelines(moveable, "rotatable")) {
			const { pos1, pos2, pos3, pos4, origin: origin2 } = rect;
			const rad = dist * Math.PI / 180;
			const prevPoses = [
				pos1,
				pos2,
				pos3,
				pos4
			].map((pos) => minus(pos, origin2));
			const nextPoses = prevPoses.map((pos) => rotate(pos, rad));
			const result = [...checkRotateBounds(moveable, prevPoses, nextPoses, origin2, dist), ...checkRotateInnerBounds(moveable, prevPoses, nextPoses, origin2, dist)];
			result.sort((a, b) => abs(a - dist) - abs(b - dist));
			const isSnap = result.length > 0;
			if (isSnap) return {
				isSnap,
				dist: isSnap ? result[0] : dist
			};
		}
		if (snapRotationDegrees?.length && snapRotationThreshold) {
			const firstDegree = snapRotationDegrees.slice().sort((a, b) => {
				return getMinDegreeDistance(a, rotation) - getMinDegreeDistance(b, rotation);
			})[0];
			if (getMinDegreeDistance(firstDegree, rotation) <= snapRotationThreshold) return {
				isSnap: true,
				dist: dist + bumpDegree(rotation, firstDegree) - rotation
			};
		}
		return {
			isSnap: false,
			dist
		};
	}
	function checkSnapResize(moveable, width, height, direction, fixedPosition, isRequest, datas) {
		if (!hasGuidelines(moveable, "resizable")) return [0, 0];
		const { fixedDirection, nextAllMatrix } = datas;
		const { allMatrix, is3d } = moveable.state;
		return checkSizeDist(moveable, (widthOffset, heightOffset) => {
			return getNextFixedPoses(nextAllMatrix || allMatrix, width + widthOffset, height + heightOffset, fixedDirection, fixedPosition, is3d);
		}, width, height, direction, fixedPosition, isRequest, datas);
	}
	function checkSnapScale(moveable, scale, direction, isRequest, datas) {
		if (!hasGuidelines(moveable, "scalable")) return [0, 0];
		const { startOffsetWidth, startOffsetHeight, fixedPosition, fixedDirection, is3d } = datas;
		const sizeDist = checkSizeDist(moveable, (widthOffset, heightOffset) => {
			return getNextFixedPoses(scaleMatrix(datas, plus(scale, [widthOffset / startOffsetWidth, heightOffset / startOffsetHeight])), startOffsetWidth, startOffsetHeight, fixedDirection, fixedPosition, is3d);
		}, startOffsetWidth, startOffsetHeight, direction, fixedPosition, isRequest, datas);
		return [sizeDist[0] / startOffsetWidth, sizeDist[1] / startOffsetHeight];
	}
	function startCheckSnapDrag(moveable, datas) {
		datas.absolutePoses = getAbsolutePosesByState(moveable.state);
	}
	function getSnapGuidelines(posInfos) {
		const guidelines = [];
		posInfos.forEach((posInfo) => {
			posInfo.guidelineInfos.forEach(({ guideline }) => {
				if (find$1(guidelines, (info) => info.guideline === guideline)) return;
				guideline.direction = "";
				guidelines.push({
					guideline,
					posInfo
				});
			});
		});
		return guidelines.map(({ guideline, posInfo }) => {
			return {
				...guideline,
				direction: posInfo.direction
			};
		});
	}
	function addBoundGuidelines(moveable, verticalPoses, horizontalPoses, verticalSnapPoses, horizontalSnapPoses, externalBounds) {
		const { vertical: verticalBoundInfos, horizontal: horizontalBoundInfos } = checkBoundPoses(getBounds(moveable, externalBounds), verticalPoses, horizontalPoses);
		const boundMap = getInitialBounds();
		verticalBoundInfos.forEach((info) => {
			if (info.isBound) {
				if (info.direction === "start") boundMap.left = true;
				if (info.direction === "end") boundMap.right = true;
				verticalSnapPoses.push({
					type: "bounds",
					pos: info.pos
				});
			}
		});
		horizontalBoundInfos.forEach((info) => {
			if (info.isBound) {
				if (info.direction === "start") boundMap.top = true;
				if (info.direction === "end") boundMap.bottom = true;
				horizontalSnapPoses.push({
					type: "bounds",
					pos: info.pos
				});
			}
		});
		const { boundMap: innerBoundMap, vertical: verticalInnerBoundPoses, horizontal: horizontalInnerBoundPoses } = checkInnerBoundPoses(moveable);
		verticalInnerBoundPoses.forEach((innerPos) => {
			if (findIndex(verticalSnapPoses, ({ type, pos }) => type === "bounds" && pos === innerPos) >= 0) return;
			verticalSnapPoses.push({
				type: "bounds",
				pos: innerPos
			});
		});
		horizontalInnerBoundPoses.forEach((innerPos) => {
			if (findIndex(horizontalSnapPoses, ({ type, pos }) => type === "bounds" && pos === innerPos) >= 0) return;
			horizontalSnapPoses.push({
				type: "bounds",
				pos: innerPos
			});
		});
		return {
			boundMap,
			innerBoundMap
		};
	}
	const directionCondition$1 = getDirectionCondition("", ["resizable", "scalable"]);
	/**
	* @namespace Moveable.Snappable
	* @description Whether or not target can be snapped to the guideline. (default: false)
	* @sort 2
	*/
	var Snappable_default = {
		name: "snappable",
		dragRelation: "strong",
		props: [
			"snappable",
			"snapContainer",
			"snapDirections",
			"elementSnapDirections",
			"snapGap",
			"snapGridWidth",
			"snapGridHeight",
			"isDisplaySnapDigit",
			"isDisplayInnerSnapDigit",
			"isDisplayGridGuidelines",
			"snapDigit",
			"snapThreshold",
			"snapRenderThreshold",
			"snapGridAll",
			NAME_snapRotationThreshold,
			NAME_snapRotationDegrees,
			NAME_snapHorizontalThreshold,
			NAME_snapVerticalThreshold,
			"horizontalGuidelines",
			"verticalGuidelines",
			"elementGuidelines",
			"bounds",
			"innerBounds",
			"snapDistFormat",
			"maxSnapElementGuidelineDistance",
			"maxSnapElementGapDistance"
		],
		events: ["snap", "bound"],
		css: [`:host {
--bounds-color: #d66;
}
.guideline {
pointer-events: none;
z-index: 2;
}
.guideline.bounds {
background: #d66;
background: var(--bounds-color);
}
.guideline-group {
position: absolute;
top: 0;
left: 0;
}
.guideline-group .size-value {
position: absolute;
color: #f55;
font-size: 12px;
font-size: calc(12px * var(--zoom));
font-weight: bold;
}
.guideline-group.horizontal .size-value {
transform-origin: 50% 100%;
transform: translateX(-50%);
left: 50%;
bottom: 5px;
bottom: calc(2px + 3px * var(--zoom));
}
.guideline-group.vertical .size-value {
transform-origin: 0% 50%;
top: 50%;
transform: translateY(-50%);
left: 5px;
left: calc(2px + 3px * var(--zoom));
}
.guideline.gap {
background: #f55;
}
.size-value.gap {
color: #f55;
}
`],
		render(moveable, React) {
			const state = moveable.state;
			const { top: targetTop, left: targetLeft, pos1, pos2, pos3, pos4, snapRenderInfo } = state;
			const { snapRenderThreshold = 1 } = moveable.props;
			if (!snapRenderInfo || !snapRenderInfo.render || !hasGuidelines(moveable, "")) {
				watchValue(moveable, "boundMap", getInitialBounds(), (v) => JSON.stringify(v));
				watchValue(moveable, "innerBoundMap", getInitialBounds(), (v) => JSON.stringify(v));
				return [];
			}
			state.guidelines = getTotalGuidelines(moveable);
			const minLeft = Math.min(pos1[0], pos2[0], pos3[0], pos4[0]);
			const minTop = Math.min(pos1[1], pos2[1], pos3[1], pos4[1]);
			const externalPoses = snapRenderInfo.externalPoses || [];
			const poses = getAbsolutePosesByState(moveable.state);
			const verticalSnapPoses = [];
			const horizontalSnapPoses = [];
			const verticalGuidelines = [];
			const horizontalGuidelines = [];
			const snapInfos = [];
			const { width, height, top, left, bottom, right } = getRect(poses);
			const targetRect = {
				left,
				right,
				top,
				bottom,
				center: (left + right) / 2,
				middle: (top + bottom) / 2
			};
			const hasExternalPoses = externalPoses.length > 0;
			const externalRect = hasExternalPoses ? getRect(externalPoses) : {};
			if (!snapRenderInfo.request) {
				if (snapRenderInfo.direction) snapInfos.push(getSnapInfosByDirection(moveable, poses, snapRenderInfo.direction, snapRenderThreshold, snapRenderThreshold));
				if (snapRenderInfo.snap) {
					const rect = getRect(poses);
					if (snapRenderInfo.center) {
						rect.middle = (rect.top + rect.bottom) / 2;
						rect.center = (rect.left + rect.right) / 2;
					}
					snapInfos.push(checkSnaps(moveable, rect, snapRenderThreshold, snapRenderThreshold));
				}
				if (hasExternalPoses) {
					if (snapRenderInfo.center) {
						externalRect.middle = (externalRect.top + externalRect.bottom) / 2;
						externalRect.center = (externalRect.left + externalRect.right) / 2;
					}
					snapInfos.push(checkSnaps(moveable, externalRect, snapRenderThreshold, snapRenderThreshold));
				}
				snapInfos.forEach((snapInfo) => {
					const { vertical: { posInfos: verticalPosInfos }, horizontal: { posInfos: horizontalPosInfos } } = snapInfo;
					verticalSnapPoses.push(...verticalPosInfos.filter(({ guidelineInfos }) => {
						return guidelineInfos.some(({ guideline }) => !guideline.hide);
					}).map((posInfo) => ({
						type: "snap",
						pos: posInfo.pos
					})));
					horizontalSnapPoses.push(...horizontalPosInfos.filter(({ guidelineInfos }) => {
						return guidelineInfos.some(({ guideline }) => !guideline.hide);
					}).map((posInfo) => ({
						type: "snap",
						pos: posInfo.pos
					})));
					verticalGuidelines.push(...getSnapGuidelines(verticalPosInfos));
					horizontalGuidelines.push(...getSnapGuidelines(horizontalPosInfos));
				});
			}
			const { boundMap, innerBoundMap } = addBoundGuidelines(moveable, [left, right], [top, bottom], verticalSnapPoses, horizontalSnapPoses);
			if (hasExternalPoses) addBoundGuidelines(moveable, [externalRect.left, externalRect.right], [externalRect.top, externalRect.bottom], verticalSnapPoses, horizontalSnapPoses, snapRenderInfo.externalBounds);
			const allGuidelines = [...verticalGuidelines, ...horizontalGuidelines];
			const elementGuidelines = allGuidelines.filter((guideline) => guideline.element && !guideline.gapRects);
			const gapGuidelines = allGuidelines.filter((guideline) => guideline.gapRects).sort((a, b) => {
				return a.gap - b.gap;
			});
			triggerEvent(moveable, "onSnap", {
				guidelines: allGuidelines.filter(({ element }) => !element),
				elements: elementGuidelines,
				gaps: gapGuidelines
			}, true);
			const nextBoundMap = watchValue(moveable, "boundMap", boundMap, (v) => JSON.stringify(v), getInitialBounds());
			const nextInnerBoundMap = watchValue(moveable, "innerBoundMap", innerBoundMap, (v) => JSON.stringify(v), getInitialBounds());
			if (boundMap === nextBoundMap || innerBoundMap === nextInnerBoundMap) triggerEvent(moveable, "onBound", {
				bounds: boundMap,
				innerBounds: innerBoundMap
			}, true);
			return [
				...renderDashedGuidelines(moveable, elementGuidelines, [minLeft, minTop], targetRect, React),
				...renderGapGuidelines(moveable, gapGuidelines, [minLeft, minTop], targetRect, React),
				...renderGuidelines(moveable, "horizontal", horizontalGuidelines, [targetLeft, targetTop], targetRect, React),
				...renderGuidelines(moveable, "vertical", verticalGuidelines, [targetLeft, targetTop], targetRect, React),
				...renderSnapPoses(moveable, "horizontal", horizontalSnapPoses, minLeft, targetTop, width, 0, React),
				...renderSnapPoses(moveable, "vertical", verticalSnapPoses, minTop, targetLeft, height, 1, React)
			];
		},
		dragStart(moveable, e) {
			moveable.state.snapRenderInfo = {
				request: e.isRequest,
				snap: true,
				center: true
			};
			checkSnapInfo(moveable);
		},
		drag(moveable) {
			const state = moveable.state;
			if (!checkSnapInfo(moveable)) state.guidelines = getTotalGuidelines(moveable);
			if (state.snapRenderInfo) state.snapRenderInfo.render = true;
		},
		pinchStart(moveable) {
			this.unset(moveable);
		},
		dragEnd(moveable) {
			this.unset(moveable);
		},
		dragControlCondition(moveable, e) {
			if (directionCondition$1(moveable, e) || dragControlCondition(moveable, e)) return true;
			if (!e.isRequest && e.inputEvent) return hasClass(e.inputEvent.target, prefix("snap-control"));
		},
		dragControlStart(moveable) {
			moveable.state.snapRenderInfo = null;
			checkSnapInfo(moveable);
		},
		dragControl(moveable) {
			this.drag(moveable);
		},
		dragControlEnd(moveable) {
			this.unset(moveable);
		},
		dragGroupStart(moveable, e) {
			this.dragStart(moveable, e);
		},
		dragGroup(moveable) {
			this.drag(moveable);
		},
		dragGroupEnd(moveable) {
			this.unset(moveable);
		},
		dragGroupControlStart(moveable) {
			moveable.state.snapRenderInfo = null;
			checkSnapInfo(moveable);
		},
		dragGroupControl(moveable) {
			this.drag(moveable);
		},
		dragGroupControlEnd(moveable) {
			this.unset(moveable);
		},
		unset(moveable) {
			const state = moveable.state;
			state.enableSnap = false;
			state.guidelines = [];
			state.snapRenderInfo = null;
			state.elementRects = [];
		}
	};
	/**
	* Whether or not target can be snapped to the guideline. (default: false)
	* @name Moveable.Snappable#snappable
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.snappable = true;
	*/
	/**
	*  A snap container that is the basis for snap, bounds, and innerBounds. (default: null = container)
	* @name Moveable.Snappable#snapContainer
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.querySelector(".container"));
	*
	* moveable.snapContainer = document.body;
	*/
	/**
	* You can specify the directions to snap to the target. (default: { left: true, top: true, right: true, bottom: true })
	* @name Moveable.Snappable#snapDirections
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*   snappable: true,
	*   snapDirections: true,
	* });
	* // snap center
	* moveable.snapDirections = { left: true, top: true, right: true, bottom: true, center: true, middle: true };
	*/
	/**
	* You can specify the snap directions of elements. (default: { left: true, ftrue, right: true, bottom: true })
	* @name Moveable.Snappable#elementSnapDirections
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*   snappable: true,
	*   elementSnapDirections: true,
	* });
	* // snap center
	* moveable.elementSnapDirections = { left: true, top: true, right: true, bottom: true, center: true, middle: true };
	*/
	/**
	* When you drag, make the gap snap in the element guidelines. (default: true)
	* @name Moveable.Snappable#snapGap
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*   snappable: true,
	*   snapElement: true,
	*   snapGap: true,
	* });
	*
	* moveable.snapGap = false;
	*/
	/**
	* Distance value that can snap to guidelines. (default: 5)
	* @name Moveable.Snappable#snapThreshold
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.snapThreshold = 5;
	*/
	/**
	* Add guidelines in the horizontal direction. (default: [])
	* @name Moveable.Snappable#horizontalGuidelines
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.horizontalGuidelines = [100, 200, 500];
	*/
	/**
	* Add guidelines in the vertical direction. (default: [])
	* @name Moveable.Snappable#verticalGuidelines
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.verticalGuidelines = [100, 200, 500];
	*/
	/**
	* Add guidelines for the element. (default: [])
	* @name Moveable.Snappable#elementGuidelines
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.elementGuidelines = [
	*   document.querySelector(".element"),
	* ];
	*/
	/**
	* You can set up boundaries.
	* @name Moveable.Snappable#bounds
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @default null
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.bounds = { left: 0, right: 1000, top: 0, bottom: 1000};
	*/
	/**
	* You can set up inner boundaries.
	* @name Moveable.Snappable#innerBounds
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @default null
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.innerBounds = { left: 500, top: 500, width: 100, height: 100};
	*/
	/**
	* snap distance digits (default: 0)
	* @name Moveable.Snappable#snapDigit
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.snapDigit = 0
	*/
	/**
	* If width size is greater than 0, you can vertical snap to the grid. (default: 0)
	* @name Moveable.Snappable#snapGridWidth
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.snapGridWidth = 5;
	*/
	/**
	* If height size is greater than 0, you can horizontal snap to the grid. (default: 0)
	* @name Moveable.Snappable#snapGridHeight
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.snapGridHeight = 5;
	*/
	/**
	* Whether to show snap distance (default: true)
	* @name Moveable.Snappable#isDisplaySnapDigit
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.isDisplaySnapDigit = true;
	*/
	/**
	* Whether to show element inner snap distance (default: false)
	* @name Moveable.Snappable#isDisplayInnerSnapDigit
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.isDisplayInnerSnapDigit = true;
	*/
	/**
	* You can set the text format of the distance shown in the guidelines. (default: self)
	* @name Moveable.Snappable#snapDistFormat
	* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Snappable.html#.SnappableOptions}
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*  snappable: true,
	*  snapDistFormat: (v, type) => v,
	* });
	* moveable.snapDistFormat = (v, type) => `${v}px`;
	*/
	/**
	* When you drag or dragControl, the `snap` event is called.
	* @memberof Moveable.Snappable
	* @event snap
	* @param {Moveable.Snappable.OnSnap} - Parameters for the `snap` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     snappable: true
	* });
	* moveable.on("snap", e => {
	*     console.log("onSnap", e);
	* });
	*/
	function multiply2(pos1, pos2) {
		return [pos1[0] * pos2[0], pos1[1] * pos2[1]];
	}
	function prefix(...classNames) {
		return prefixNames(PREFIX, ...classNames);
	}
	function defaultSync(fn) {
		fn();
	}
	function getTransformMatrix(transform) {
		if (!transform || transform === "none") return [
			1,
			0,
			0,
			1,
			0,
			0
		];
		if (isObject(transform)) return transform;
		return parseMat(transform);
	}
	function getAbsoluteMatrix(matrix, n, origin) {
		return multiplies(n, createOriginMatrix(origin, n), matrix, createOriginMatrix(origin.map((a) => -a), n));
	}
	function measureSVGSize(el, unit, isHorizontal) {
		if (unit === "%") return getSVGViewBox(el.ownerSVGElement)[isHorizontal ? "width" : "height"] / 100;
		return 1;
	}
	function getBeforeTransformOrigin(el) {
		return getTransformOrigin(getComputedStyle$1(el, ":before")).map((o, i) => {
			const { value, unit } = splitUnit(o);
			return value * measureSVGSize(el, unit, i === 0);
		});
	}
	function getTransformOriginArray(transformOrigin) {
		return transformOrigin ? transformOrigin.split(" ") : ["0", "0"];
	}
	function getTransformOrigin(style) {
		return getTransformOriginArray(style.transformOrigin);
	}
	function getElementTransform(target) {
		const computedTransform = getCachedStyle(target)("transform");
		if (computedTransform && computedTransform !== "none") return computedTransform;
		if ("transform" in target) {
			const baseVal = target.transform.baseVal;
			if (!baseVal) return "";
			const length = baseVal.length;
			if (!length) return "";
			const matrixes = [];
			for (let i = 0; i < length; ++i) {
				const matrix = baseVal[i].matrix;
				matrixes.push(`matrix(${[
					"a",
					"b",
					"c",
					"d",
					"e",
					"f"
				].map((chr) => matrix[chr]).join(", ")})`);
			}
			return matrixes.join(" ");
		}
		return "";
	}
	function getOffsetInfo(el, lastParent, isParent, checkZoom, getTargetStyle) {
		const documentElement = getDocumentElement(el) || getDocumentBody(el);
		let hasSlot = false;
		let target;
		let parentSlotElement;
		if (!el || isParent) target = el;
		else {
			const assignedSlotParentElement = el?.assignedSlot?.parentElement;
			const parentElement = el.parentElement;
			if (assignedSlotParentElement) {
				hasSlot = true;
				parentSlotElement = parentElement;
				target = assignedSlotParentElement;
			} else target = parentElement;
		}
		let isCustomElement = false;
		let isEnd = el === lastParent || target === lastParent;
		let position = "relative";
		let offsetZoom = 1;
		const targetZoom = parseFloat(getTargetStyle?.("zoom")) || 1;
		const targetPosition = getTargetStyle?.("position");
		while (target && target !== documentElement) {
			if (lastParent === target) isEnd = true;
			const getStyle = getCachedStyle(target);
			const tagName = target.tagName.toLowerCase();
			const transform = getElementTransform(target);
			const willChange = getStyle("willChange");
			const zoom = parseFloat(getStyle("zoom")) || 1;
			position = getStyle("position");
			if (checkZoom && zoom !== 1) {
				offsetZoom = zoom;
				break;
			}
			if (!isParent && checkZoom && targetZoom !== 1 && targetPosition && targetPosition !== "absolute" || tagName === "svg" || tagName === "foreignobject" || position !== "static" || transform && transform !== "none" || willChange === "transform") break;
			const slotParentNode = el?.assignedSlot?.parentNode;
			const targetParentNode = target.parentNode;
			if (slotParentNode) {
				hasSlot = true;
				parentSlotElement = targetParentNode;
			}
			const parentNode = targetParentNode;
			if (parentNode && parentNode.nodeType === 11) {
				target = parentNode.host;
				isCustomElement = true;
				position = getCachedStyle(target)("position");
				break;
			}
			target = parentNode;
			position = "relative";
		}
		return {
			offsetZoom,
			hasSlot,
			parentSlotElement,
			isCustomElement,
			isStatic: position === "static",
			isEnd: isEnd || !target || target === documentElement,
			offsetParent: target || documentElement
		};
	}
	function getOffsetPosInfo(el, target) {
		const tagName = el.tagName.toLowerCase();
		let offsetLeft = el.offsetLeft;
		let offsetTop = el.offsetTop;
		const getStyle = getCachedStyle(el);
		const isSVG = isUndefined(offsetLeft);
		let hasOffset = !isSVG;
		let origin;
		let targetOrigin;
		if (!hasOffset && (tagName !== "svg" || el.ownerSVGElement)) {
			origin = IS_WEBKIT605 ? getBeforeTransformOrigin(el) : getTransformOriginArray(getStyle("transformOrigin")).map((pos) => parseFloat(pos));
			targetOrigin = origin.slice();
			hasOffset = true;
			if (tagName === "svg") {
				offsetLeft = 0;
				offsetTop = 0;
			} else [offsetLeft, offsetTop, origin[0], origin[1]] = getSVGGraphicsOffset(el, origin, el === target && target.tagName.toLowerCase() === "g");
		} else {
			origin = getTransformOriginArray(getStyle("transformOrigin")).map((pos) => parseFloat(pos));
			targetOrigin = origin.slice();
		}
		return {
			tagName,
			isSVG,
			hasOffset,
			offset: [offsetLeft || 0, offsetTop || 0],
			origin,
			targetOrigin
		};
	}
	function getBodyOffset(el, isSVG) {
		const getStyle = getCachedStyle(el);
		const getBodyStyle = getCachedStyle(getDocumentBody(el));
		const bodyPosition = getBodyStyle("position");
		if (!isSVG && (!bodyPosition || bodyPosition === "static")) return [0, 0];
		let marginLeft = parseInt(getBodyStyle("marginLeft"), 10);
		let marginTop = parseInt(getBodyStyle("marginTop"), 10);
		if (getStyle("position") === "absolute") {
			if (getStyle("top") !== "auto" || getStyle("bottom") !== "auto") marginTop = 0;
			if (getStyle("left") !== "auto" || getStyle("right") !== "auto") marginLeft = 0;
		}
		return [marginLeft, marginTop];
	}
	function convert3DMatrixes(matrixes) {
		matrixes.forEach((info) => {
			const matrix = info.matrix;
			if (matrix) info.matrix = convertDimension(matrix, 3, 4);
		});
	}
	function getPositionFixedInfo(el) {
		let fixedContainer = el.parentElement;
		let hasTransform = false;
		const body = getDocumentBody(el);
		while (fixedContainer) {
			const transform = getComputedStyle$1(fixedContainer).transform;
			if (transform && transform !== "none") {
				hasTransform = true;
				break;
			}
			if (fixedContainer === body) break;
			fixedContainer = fixedContainer.parentElement;
		}
		return {
			fixedContainer: fixedContainer || body,
			hasTransform
		};
	}
	function makeMatrixCSS(matrix, is3d = matrix.length > 9) {
		return `${is3d ? "matrix3d" : "matrix"}(${convertMatrixtoCSS(matrix, !is3d).join(",")})`;
	}
	function getSVGViewBox(el) {
		const clientWidth = el.clientWidth;
		const clientHeight = el.clientHeight;
		if (!el) return {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			clientWidth,
			clientHeight
		};
		const viewBox = el.viewBox;
		const baseVal = viewBox && viewBox.baseVal || {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};
		return {
			x: baseVal.x,
			y: baseVal.y,
			width: baseVal.width || clientWidth,
			height: baseVal.height || clientHeight,
			clientWidth,
			clientHeight
		};
	}
	function getSVGMatrix(el, n) {
		const { width: viewBoxWidth, height: viewBoxHeight, clientWidth, clientHeight } = getSVGViewBox(el);
		const scaleX = clientWidth / viewBoxWidth;
		const scaleY = clientHeight / viewBoxHeight;
		const preserveAspectRatio = el.preserveAspectRatio.baseVal;
		const align = preserveAspectRatio.align;
		const meetOrSlice = preserveAspectRatio.meetOrSlice;
		const svgOrigin = [0, 0];
		const scale = [scaleX, scaleY];
		const translate = [0, 0];
		if (align !== 1) {
			const xAlign = (align - 2) % 3;
			const yAlign = Math.floor((align - 2) / 3);
			svgOrigin[0] = viewBoxWidth * xAlign / 2;
			svgOrigin[1] = viewBoxHeight * yAlign / 2;
			const scaleDimension = meetOrSlice === 2 ? Math.max(scaleY, scaleX) : Math.min(scaleX, scaleY);
			scale[0] = scaleDimension;
			scale[1] = scaleDimension;
			translate[0] = (clientWidth - viewBoxWidth) / 2 * xAlign;
			translate[1] = (clientHeight - viewBoxHeight) / 2 * yAlign;
		}
		const scaleMatrix = createScaleMatrix(scale, n);
		[scaleMatrix[n * (n - 1)], scaleMatrix[n * (n - 1) + 1]] = translate;
		return getAbsoluteMatrix(scaleMatrix, n, svgOrigin);
	}
	function getSVGGraphicsOffset(el, origin, isGTarget) {
		const tagName = el.tagName.toLowerCase();
		if (!el.getBBox || !isGTarget && tagName === "g") return [
			0,
			0,
			0,
			0
		];
		const isFillBox = getCachedStyle(el)("transform-box") === "fill-box";
		const bbox = el.getBBox();
		const viewBox = getSVGViewBox(el.ownerSVGElement);
		let x = bbox.x;
		let y = bbox.y;
		if (tagName === "foreignobject" && !x && !y) {
			x = parseFloat(el.getAttribute("x")) || 0;
			y = parseFloat(el.getAttribute("y")) || 0;
		}
		const left = x - viewBox.x;
		const top = y - viewBox.y;
		return [
			left,
			top,
			isFillBox ? origin[0] : origin[0] - left,
			isFillBox ? origin[1] : origin[1] - top
		];
	}
	function calculatePosition(matrix, pos, n) {
		return calculate(matrix, convertPositionMatrix(pos, n), n);
	}
	function calculatePoses(matrix, width, height, n) {
		return [
			[0, 0],
			[width, 0],
			[0, height],
			[width, height]
		].map((pos) => calculatePosition(matrix, pos, n));
	}
	function getRect(poses) {
		const posesX = poses.map((pos) => pos[0]);
		const posesY = poses.map((pos) => pos[1]);
		const left = Math.min(...posesX);
		const top = Math.min(...posesY);
		const right = Math.max(...posesX);
		const bottom = Math.max(...posesY);
		return {
			left,
			top,
			right,
			bottom,
			width: right - left,
			height: bottom - top
		};
	}
	function calculateRect(matrix, width, height, n) {
		return getRect(calculatePoses(matrix, width, height, n));
	}
	function getSVGOffset(offsetInfo, targetInfo, container, n, beforeMatrix) {
		const target = offsetInfo.target;
		const origin = offsetInfo.origin;
		const targetMatrix = targetInfo.matrix;
		const { offsetWidth: width, offsetHeight: height } = getSize(target);
		const containerClientRect = container.getBoundingClientRect();
		let margin = [0, 0];
		if (container === getDocumentBody(container)) margin = getBodyOffset(target, true);
		const rect = target.getBoundingClientRect();
		const rectLeft = rect.left - containerClientRect.left + container.scrollLeft - (container.clientLeft || 0) + margin[0];
		const rectTop = rect.top - containerClientRect.top + container.scrollTop - (container.clientTop || 0) + margin[1];
		const rectWidth = rect.width;
		const rectHeight = rect.height;
		const mat = multiplies(n, beforeMatrix, targetMatrix);
		const { left: prevLeft, top: prevTop, width: prevWidth, height: prevHeight } = calculateRect(mat, width, height, n);
		const posOrigin = calculatePosition(mat, origin, n);
		const prevOrigin = minus(posOrigin, [prevLeft, prevTop]);
		const rectOrigin = [rectLeft + prevOrigin[0] * rectWidth / prevWidth, rectTop + prevOrigin[1] * rectHeight / prevHeight];
		const offset = [0, 0];
		let count = 0;
		while (++count < 10) {
			const inverseBeforeMatrix = invert(beforeMatrix, n);
			[offset[0], offset[1]] = minus(calculatePosition(inverseBeforeMatrix, rectOrigin, n), calculatePosition(inverseBeforeMatrix, posOrigin, n));
			const { left: nextLeft, top: nextTop } = calculateRect(multiplies(n, beforeMatrix, createOriginMatrix(offset, n), targetMatrix), width, height, n);
			const distLeft = nextLeft - rectLeft;
			const distTop = nextTop - rectTop;
			if (abs(distLeft) < 2 && abs(distTop) < 2) break;
			rectOrigin[0] -= distLeft;
			rectOrigin[1] -= distTop;
		}
		return offset.map((p) => Math.round(p));
	}
	function calculateMoveableClientPositions(rootMatrix, poses, rootClientRect) {
		const n = rootMatrix.length === 16 ? 4 : 3;
		const rootPoses = poses.map((pos) => calculatePosition(rootMatrix, pos, n));
		const { left, top } = rootClientRect;
		return rootPoses.map((pos) => {
			return [pos[0] + left, pos[1] + top];
		});
	}
	function getDistSize(vec) {
		return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
	}
	function getDiagonalSize(pos1, pos2) {
		return getDistSize([pos2[0] - pos1[0], pos2[1] - pos1[1]]);
	}
	function getLineStyle(pos1, pos2, zoom = 1, rad = getRad$1(pos1, pos2)) {
		const width = getDiagonalSize(pos1, pos2);
		return {
			transform: `translateY(-50%) translate(${pos1[0]}px, ${pos1[1]}px) rotate(${rad}rad) scaleY(${zoom})`,
			width: `${width}px`
		};
	}
	function getControlTransform(rotation, zoom, ...poses) {
		const length = poses.length;
		return { transform: `translateZ(0px) translate(${poses.reduce((prev, pos) => prev + pos[0], 0) / length}px, ${poses.reduce((prev, pos) => prev + pos[1], 0) / length}px) rotate(${rotation}rad) scale(${zoom})` };
	}
	function getProps(props, ableName) {
		const self = props[ableName];
		if (isObject(self)) return {
			...props,
			...self
		};
		return props;
	}
	function getSize(target) {
		const hasOffset = target && !isUndefined(target.offsetWidth);
		let offsetWidth = 0;
		let offsetHeight = 0;
		let clientWidth = 0;
		let clientHeight = 0;
		let cssWidth = 0;
		let cssHeight = 0;
		let contentWidth = 0;
		let contentHeight = 0;
		let minWidth = 0;
		let minHeight = 0;
		let minOffsetWidth = 0;
		let minOffsetHeight = 0;
		let maxWidth = Infinity;
		let maxHeight = Infinity;
		let maxOffsetWidth = Infinity;
		let maxOffsetHeight = Infinity;
		let inlineCSSWidth = 0;
		let inlineCSSHeight = 0;
		let svg = false;
		if (target) {
			if (!hasOffset && target.ownerSVGElement) {
				const bbox = target.getBBox();
				svg = true;
				offsetWidth = bbox.width;
				offsetHeight = bbox.height;
				cssWidth = offsetWidth;
				cssHeight = offsetHeight;
				contentWidth = offsetWidth;
				contentHeight = offsetHeight;
				clientWidth = offsetWidth;
				clientHeight = offsetHeight;
			} else {
				const getStyle = getCachedStyle(target);
				const targetStyle = target.style;
				const boxSizing = getStyle("boxSizing") === "border-box";
				const borderLeft = parseFloat(getStyle("borderLeftWidth")) || 0;
				const borderRight = parseFloat(getStyle("borderRightWidth")) || 0;
				const borderTop = parseFloat(getStyle("borderTopWidth")) || 0;
				const borderBottom = parseFloat(getStyle("borderBottomWidth")) || 0;
				const paddingLeft = parseFloat(getStyle("paddingLeft")) || 0;
				const paddingRight = parseFloat(getStyle("paddingRight")) || 0;
				const paddingTop = parseFloat(getStyle("paddingTop")) || 0;
				const paddingBottom = parseFloat(getStyle("paddingBottom")) || 0;
				const horizontalPadding = paddingLeft + paddingRight;
				const verticalPadding = paddingTop + paddingBottom;
				const horizontalBorder = borderLeft + borderRight;
				const verticalBorder = borderTop + borderBottom;
				const horizontalOffset = horizontalPadding + horizontalBorder;
				const verticalOffset = verticalPadding + verticalBorder;
				const position = getStyle("position");
				let containerWidth = 0;
				let containerHeight = 0;
				if ("clientLeft" in target) {
					let parentElement;
					if (position === "absolute") parentElement = getOffsetInfo(target, getDocumentBody(target)).offsetParent;
					else parentElement = target.parentElement;
					if (parentElement) {
						const getParentStyle = getCachedStyle(parentElement);
						containerWidth = parseFloat(getParentStyle("width"));
						containerHeight = parseFloat(getParentStyle("height"));
					}
				}
				minWidth = Math.max(horizontalPadding, convertUnitSize(getStyle("minWidth"), containerWidth) || 0);
				minHeight = Math.max(verticalPadding, convertUnitSize(getStyle("minHeight"), containerHeight) || 0);
				maxWidth = convertUnitSize(getStyle("maxWidth"), containerWidth);
				maxHeight = convertUnitSize(getStyle("maxHeight"), containerHeight);
				if (isNaN(maxWidth)) maxWidth = Infinity;
				if (isNaN(maxHeight)) maxHeight = Infinity;
				inlineCSSWidth = convertUnitSize(targetStyle.width, 0) || 0;
				inlineCSSHeight = convertUnitSize(targetStyle.height, 0) || 0;
				cssWidth = parseFloat(getStyle("width")) || 0;
				cssHeight = parseFloat(getStyle("height")) || 0;
				contentWidth = abs(cssWidth - inlineCSSWidth) < 1 ? between(minWidth, inlineCSSWidth || cssWidth, maxWidth) : cssWidth;
				contentHeight = abs(cssHeight - inlineCSSHeight) < 1 ? between(minHeight, inlineCSSHeight || cssHeight, maxHeight) : cssHeight;
				offsetWidth = contentWidth;
				offsetHeight = contentHeight;
				if (boxSizing) {
					maxOffsetWidth = maxWidth;
					maxOffsetHeight = maxHeight;
					minOffsetWidth = minWidth;
					minOffsetHeight = minHeight;
					contentWidth = offsetWidth - horizontalOffset;
					contentHeight = offsetHeight - verticalOffset;
				} else {
					maxOffsetWidth = maxWidth + horizontalOffset;
					maxOffsetHeight = maxHeight + verticalOffset;
					minOffsetWidth = minWidth + horizontalOffset;
					minOffsetHeight = minHeight + verticalOffset;
					offsetWidth = contentWidth + horizontalOffset;
					offsetHeight = contentHeight + verticalOffset;
				}
				clientWidth = contentWidth + horizontalPadding;
				clientHeight = contentHeight + verticalPadding;
			}
		}
		return {
			svg,
			offsetWidth,
			offsetHeight,
			clientWidth,
			clientHeight,
			contentWidth,
			contentHeight,
			inlineCSSWidth,
			inlineCSSHeight,
			cssWidth,
			cssHeight,
			minWidth,
			minHeight,
			maxWidth,
			maxHeight,
			minOffsetWidth,
			minOffsetHeight,
			maxOffsetWidth,
			maxOffsetHeight
		};
	}
	function getRotationRad(poses, direction) {
		return getRad$1(direction > 0 ? poses[0] : poses[1], direction > 0 ? poses[1] : poses[0]);
	}
	function resetClientRect() {
		return {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			right: 0,
			bottom: 0,
			clientLeft: 0,
			clientTop: 0,
			clientWidth: 0,
			clientHeight: 0,
			scrollWidth: 0,
			scrollHeight: 0
		};
	}
	function getExtendsRect(el, rect) {
		const isRoot = el === getDocumentBody(el) || el === getDocumentElement(el);
		const extendsRect = {
			clientLeft: el.clientLeft,
			clientTop: el.clientTop,
			clientWidth: el.clientWidth,
			clientHeight: el.clientHeight,
			scrollWidth: el.scrollWidth,
			scrollHeight: el.scrollHeight,
			overflow: false
		};
		if (isRoot) {
			extendsRect.clientHeight = Math.max(rect.height, extendsRect.clientHeight);
			extendsRect.scrollHeight = Math.max(rect.height, extendsRect.scrollHeight);
		}
		extendsRect.overflow = getCachedStyle(el)("overflow") !== "visible";
		return {
			...rect,
			...extendsRect
		};
	}
	function getClientRectByPosition(position, base, el, isExtends) {
		const { left, right, top, bottom } = position;
		const baseTop = base.top;
		const baseLeft = base.left;
		const rect = {
			left: baseLeft + left,
			top: baseTop + top,
			right: baseLeft + right,
			bottom: baseTop + bottom,
			width: right - left,
			height: bottom - top
		};
		if (el && isExtends) return getExtendsRect(el, rect);
		return rect;
	}
	function getClientRect(el, isExtends) {
		let left = 0;
		let top = 0;
		let width = 0;
		let height = 0;
		if (el) {
			const clientRect = el.getBoundingClientRect();
			left = clientRect.left;
			top = clientRect.top;
			width = clientRect.width;
			height = clientRect.height;
		}
		const rect = {
			left,
			top,
			width,
			height,
			right: left + width,
			bottom: top + height
		};
		if (el && isExtends) return getExtendsRect(el, rect);
		return rect;
	}
	function getTotalOrigin(moveable) {
		const { groupable, svgOrigin } = moveable.props;
		const { offsetWidth, offsetHeight, svg, transformOrigin } = moveable.getState();
		if (!groupable && svg && svgOrigin) return convertTransformOriginArray(svgOrigin, offsetWidth, offsetHeight);
		return transformOrigin;
	}
	function getTotalDirection(parentDirection, isPinch, inputEvent, datas) {
		let direction;
		if (parentDirection) direction = parentDirection;
		else if (isPinch) direction = [0, 0];
		else {
			const target = inputEvent.target;
			direction = getDirection(target, datas);
		}
		return direction;
	}
	function getDirection(target, datas) {
		if (!target) return;
		const deg = target.getAttribute("data-rotation") || "";
		const direciton = target.getAttribute("data-direction");
		datas.deg = deg;
		if (!direciton) return;
		const dir = [0, 0];
		direciton.indexOf("w") > -1 && (dir[0] = -1);
		direciton.indexOf("e") > -1 && (dir[0] = 1);
		direciton.indexOf("n") > -1 && (dir[1] = -1);
		direciton.indexOf("s") > -1 && (dir[1] = 1);
		return dir;
	}
	function getAbsolutePoses(poses, dist) {
		return [
			plus(dist, poses[0]),
			plus(dist, poses[1]),
			plus(dist, poses[2]),
			plus(dist, poses[3])
		];
	}
	function getAbsolutePosesByState({ left, top, pos1, pos2, pos3, pos4 }) {
		return getAbsolutePoses([
			pos1,
			pos2,
			pos3,
			pos4
		], [left, top]);
	}
	function unsetAbles(self, isControl) {
		self[isControl ? "controlAbles" : "targetAbles"].forEach((able) => {
			able.unset && able.unset(self);
		});
	}
	function unsetGesto(self, isControl) {
		const gestoName = isControl ? "controlGesto" : "targetGesto";
		const gesto = self[gestoName];
		if (gesto?.isIdle() === false) unsetAbles(self, isControl);
		gesto?.unset();
		self[gestoName] = null;
	}
	function fillCSSObject(style, resolvedEvent) {
		if (resolvedEvent) {
			const originalDatas = getBeforeRenderableDatas(resolvedEvent);
			originalDatas.nextStyle = {
				...originalDatas.nextStyle,
				...style
			};
		}
		return {
			style,
			cssText: getKeys(style).map((name) => `${decamelize(name, "-")}: ${style[name]};`).join("")
		};
	}
	function fillAfterTransform(prevEvent, nextEvent, resolvedEvent) {
		const afterTransform = nextEvent.afterTransform || nextEvent.transform;
		return {
			...fillCSSObject({
				...prevEvent.style,
				...nextEvent.style,
				transform: afterTransform
			}, resolvedEvent),
			afterTransform,
			transform: prevEvent.transform
		};
	}
	function fillParams(moveable, e, params, isBeforeEvent) {
		const datas = e.datas;
		if (!datas.datas) datas.datas = {};
		const nextParams = {
			...params,
			target: moveable.state.target,
			clientX: e.clientX,
			clientY: e.clientY,
			inputEvent: e.inputEvent,
			currentTarget: moveable,
			moveable,
			datas: datas.datas,
			isRequest: e.isRequest,
			isRequestChild: e.isRequestChild,
			isFirstDrag: !!e.isFirstDrag,
			isTrusted: e.isTrusted !== false,
			stopAble() {
				datas.isEventStart = false;
			},
			stopDrag() {
				e.stop?.();
			}
		};
		if (!datas.isStartEvent) datas.isStartEvent = true;
		else if (!isBeforeEvent) datas.lastEvent = nextParams;
		return nextParams;
	}
	function fillEndParams(moveable, e, params) {
		const datas = e.datas;
		const isDrag = "isDrag" in params ? params.isDrag : e.isDrag;
		if (!datas.datas) datas.datas = {};
		return {
			isDrag,
			...params,
			moveable,
			target: moveable.state.target,
			clientX: e.clientX,
			clientY: e.clientY,
			inputEvent: e.inputEvent,
			currentTarget: moveable,
			lastEvent: datas.lastEvent,
			isDouble: e.isDouble,
			datas: datas.datas,
			isFirstDrag: !!e.isFirstDrag
		};
	}
	function catchEvent(moveable, name, callback) {
		moveable._emitter.on(name, callback);
	}
	function triggerEvent(moveable, name, params, isManager, isRequest) {
		return moveable.triggerEvent(name, params, isManager, isRequest);
	}
	function getComputedStyle$1(el, pseudoElt) {
		return getWindow(el).getComputedStyle(el, pseudoElt);
	}
	function filterAbles(ables, methods, triggerAblesSimultaneously) {
		const enabledAbles = {};
		const ableGroups = {};
		return ables.filter((able) => {
			const name = able.name;
			if (enabledAbles[name] || !methods.some((method) => able[method])) return false;
			if (!triggerAblesSimultaneously && able.ableGroup) {
				if (ableGroups[able.ableGroup]) return false;
				ableGroups[able.ableGroup] = true;
			}
			enabledAbles[name] = true;
			return true;
		});
	}
	function equals(a1, a2) {
		return a1 === a2 || a1 == null && a2 == null;
	}
	function selectValue(...values) {
		const length = values.length - 1;
		for (let i = 0; i < length; ++i) {
			const value = values[i];
			if (!isUndefined(value)) return value;
		}
		return values[length];
	}
	function groupBy(arr, func) {
		const groups = [];
		const groupKeys = [];
		arr.forEach((el, index) => {
			const groupKey = func(el, index, arr);
			const keyIndex = groupKeys.indexOf(groupKey);
			const group = groups[keyIndex] || [];
			if (keyIndex === -1) {
				groupKeys.push(groupKey);
				groups.push(group);
			}
			group.push(el);
		});
		return groups;
	}
	function groupByMap(arr, func) {
		const groups = [];
		const groupKeys = {};
		arr.forEach((el, index) => {
			const groupKey = func(el, index, arr);
			let group = groupKeys[groupKey];
			if (!group) {
				group = [];
				groupKeys[groupKey] = group;
				groups.push(group);
			}
			group.push(el);
		});
		return groups;
	}
	function flat$1(arr) {
		return arr.reduce((prev, cur) => {
			return prev.concat(cur);
		}, []);
	}
	function maxOffset(...args) {
		args.sort((a, b) => abs(b) - abs(a));
		return args[0];
	}
	function calculateInversePosition(matrix, pos, n) {
		return calculate(invert(matrix, n), convertPositionMatrix(pos, n), n);
	}
	function convertDragDist(state, e) {
		const { is3d, rootMatrix } = state;
		const n = is3d ? 4 : 3;
		[e.distX, e.distY] = calculateInversePosition(rootMatrix, [e.distX, e.distY], n);
		return e;
	}
	function calculatePadding(matrix, pos, added, n) {
		if (!added[0] && !added[1]) return pos;
		const xAdded = calculatePosition(matrix, [normalized(added[0] || 1), 0], n);
		const yAdded = calculatePosition(matrix, [0, normalized(added[1] || 1)], n);
		return plus(pos, calculatePosition(matrix, [added[0] / getDistSize(xAdded), added[1] / getDistSize(yAdded)], n));
	}
	function convertCSSSize(value, size, isRelative) {
		return isRelative ? `${value / size * 100}%` : `${value}px`;
	}
	function getTinyDist(v) {
		return abs(v) <= 1e-7 ? 0 : v;
	}
	function getDirectionViewClassName(ableName) {
		return (moveable) => {
			if (!moveable.isDragging(ableName)) return "";
			const deg = getGestoData(moveable, ableName).deg;
			if (!deg) return "";
			return prefix(`view-control-rotation${deg}`);
		};
	}
	function getDirectionCondition(ableName, checkAbles = [ableName]) {
		return (moveable, e) => {
			if (e.isRequest) {
				if (checkAbles.some((name) => e.requestAble === name)) return e.parentDirection;
				else return false;
			}
			const target = e.inputEvent.target;
			return hasClass(target, prefix("direction")) && (!ableName || hasClass(target, prefix(ableName)));
		};
	}
	function convertTransformInfo(transforms, state, index) {
		const matrixInfos = parse(transforms, {
			"x%": (v) => v / 100 * state.offsetWidth,
			"y%": (v) => v / 100 * state.offsetHeight
		});
		const beforeFunctionTexts = transforms.slice(0, index < 0 ? void 0 : index);
		const beforeFunctionTexts2 = transforms.slice(0, index < 0 ? void 0 : index + 1);
		const targetFunctionText = transforms[index] || "";
		const afterFunctionTexts = index < 0 ? [] : transforms.slice(index);
		const afterFunctionTexts2 = index < 0 ? [] : transforms.slice(index + 1);
		const beforeFunctions = matrixInfos.slice(0, index < 0 ? void 0 : index);
		const beforeFunctions2 = matrixInfos.slice(0, index < 0 ? void 0 : index + 1);
		const targetFunction = matrixInfos[index] ?? parse([""])[0];
		const afterFunctions = index < 0 ? [] : matrixInfos.slice(index);
		const afterFunctions2 = index < 0 ? [] : matrixInfos.slice(index + 1);
		const targetFunctions = targetFunction ? [targetFunction] : [];
		const beforeFunctionMatrix = toMat(beforeFunctions);
		const beforeFunctionMatrix2 = toMat(beforeFunctions2);
		const afterFunctionMatrix = toMat(afterFunctions);
		const afterFunctionMatrix2 = toMat(afterFunctions2);
		const allFunctionMatrix = multiply(beforeFunctionMatrix, afterFunctionMatrix, 4);
		return {
			transforms,
			beforeFunctionMatrix,
			beforeFunctionMatrix2,
			targetFunctionMatrix: toMat(targetFunctions),
			afterFunctionMatrix,
			afterFunctionMatrix2,
			allFunctionMatrix,
			beforeFunctions,
			beforeFunctions2,
			targetFunction: targetFunctions[0],
			afterFunctions,
			afterFunctions2,
			beforeFunctionTexts,
			beforeFunctionTexts2,
			targetFunctionText,
			afterFunctionTexts,
			afterFunctionTexts2
		};
	}
	function isArrayFormat(arr) {
		if (!arr || !isObject(arr)) return false;
		if (isNode(arr)) return false;
		return isArray(arr) || "length" in arr;
	}
	function getRefTarget(target, isSelector) {
		if (!target) return null;
		if (isNode(target)) return target;
		if (isString(target)) {
			if (isSelector) return document.querySelector(target);
			return target;
		}
		if (isFunction(target)) return target();
		if (isWindow(target)) return target;
		if ("current" in target) return target.current;
		return target;
	}
	function getRefTargets(targets, isSelector) {
		if (!targets) return [];
		return (isArrayFormat(targets) ? [].slice.call(targets) : [targets]).reduce((prev, target) => {
			if (isString(target) && isSelector) return [...prev, ...[].slice.call(document.querySelectorAll(target))];
			if (isArray(target)) prev.push(getRefTargets(target, isSelector));
			else prev.push(getRefTarget(target, isSelector));
			return prev;
		}, []);
	}
	function getAbsoluteRotation(pos1, pos2, direction) {
		let deg = getRad$1(pos1, pos2) / Math.PI * 180;
		deg = direction >= 0 ? deg : 180 - deg;
		deg = deg >= 0 ? deg : 360 + deg;
		return deg;
	}
	function getDragDistByState(state, dist) {
		const { rootMatrix, is3d } = state;
		let inverseMatrix = invert(rootMatrix, is3d ? 4 : 3);
		if (!is3d) inverseMatrix = convertDimension(inverseMatrix, 3, 4);
		inverseMatrix[12] = 0;
		inverseMatrix[13] = 0;
		inverseMatrix[14] = 0;
		return calculateMatrixDist(inverseMatrix, dist);
	}
	function getSizeDistByDist(startSize, dist, ratio, direction, keepRatio) {
		const [startOffsetWidth, startOffsetHeight] = startSize;
		let distWidth;
		let distHeight;
		if (keepRatio && startOffsetWidth && startOffsetHeight) {
			const rad = getRad$1([0, 0], dist);
			const standardRad = getRad$1([0, 0], direction);
			const size = getDistSize(dist);
			const signSize = Math.cos(rad - standardRad) * size;
			if (!direction[0]) {
				distHeight = signSize;
				distWidth = distHeight * ratio;
			} else if (!direction[1]) {
				distWidth = signSize;
				distHeight = distWidth / ratio;
			} else {
				const startWidthSize = direction[0] * startOffsetWidth;
				const startHeightSize = direction[1] * startOffsetHeight;
				let secondRad = Math.atan2(startWidthSize + dist[0], startHeightSize + dist[1]);
				let firstRad = Math.atan2(startWidthSize, startHeightSize);
				if (secondRad < 0) secondRad += Math.PI * 2;
				if (firstRad < 0) firstRad += Math.PI * 2;
				let rad;
				if (abs(secondRad - firstRad) < Math.PI / 2 || abs(secondRad - firstRad) > Math.PI / 2 * 3) rad = secondRad - firstRad;
				else {
					firstRad += Math.PI;
					rad = secondRad - firstRad;
				}
				if (rad > Math.PI * 2) rad -= Math.PI * 2;
				else if (rad > Math.PI) rad = 2 * Math.PI - rad;
				else if (rad < -Math.PI) rad = -2 * Math.PI - rad;
				const distSize = getDistSize([startWidthSize + dist[0], startHeightSize + dist[1]]) * Math.cos(rad);
				distWidth = distSize * Math.sin(firstRad) - startWidthSize;
				distHeight = distSize * Math.cos(firstRad) - startHeightSize;
				if (direction[0] < 0) distWidth *= -1;
				if (direction[1] < 0) distHeight *= -1;
			}
		} else {
			distWidth = direction[0] * dist[0];
			distHeight = direction[1] * dist[1];
		}
		return [distWidth, distHeight];
	}
	function getOffsetSizeDist(sizeDirection, keepRatio, datas, e) {
		const { ratio, startOffsetWidth, startOffsetHeight } = datas;
		let distWidth;
		let distHeight;
		const { distX, distY, pinchScale, parentDistance, parentDist, parentScale } = e;
		const startFixedDirection = datas.fixedDirection;
		const directionsDists = [0, 1].map((index) => {
			return abs(sizeDirection[index] - startFixedDirection[index]);
		});
		const directionRatios = [0, 1].map((index) => {
			let dist = directionsDists[index];
			if (dist !== 0) dist = 2 / dist;
			return dist;
		});
		if (parentDist) {
			distWidth = parentDist[0];
			distHeight = parentDist[1];
			if (keepRatio) {
				if (!distWidth) distWidth = distHeight * ratio;
				else if (!distHeight) distHeight = distWidth / ratio;
			}
		} else if (isNumber(pinchScale)) {
			distWidth = (pinchScale - 1) * startOffsetWidth;
			distHeight = (pinchScale - 1) * startOffsetHeight;
		} else if (parentScale) {
			distWidth = (parentScale[0] - 1) * startOffsetWidth;
			distHeight = (parentScale[1] - 1) * startOffsetHeight;
		} else if (parentDistance) {
			const scaleX = startOffsetWidth * directionsDists[0];
			const scaleY = startOffsetHeight * directionsDists[1];
			const ratioDistance = getDistSize([scaleX, scaleY]);
			distWidth = parentDistance / ratioDistance * scaleX * directionRatios[0];
			distHeight = parentDistance / ratioDistance * scaleY * directionRatios[1];
		} else {
			let dist = getDragDist({
				datas,
				distX,
				distY
			});
			dist = directionRatios.map((ratio, i) => {
				return dist[i] * ratio;
			});
			[distWidth, distHeight] = getSizeDistByDist([startOffsetWidth, startOffsetHeight], dist, ratio, sizeDirection, keepRatio);
		}
		return {
			distWidth,
			distHeight
		};
	}
	function convertTransformUnit(origin, xy) {
		if (xy) {
			if (origin === "left") return {
				x: "0%",
				y: "50%"
			};
			else if (origin === "top") return {
				x: "50%",
				y: "50%"
			};
			else if (origin === "center") return {
				x: "50%",
				y: "50%"
			};
			else if (origin === "right") return {
				x: "100%",
				y: "50%"
			};
			else if (origin === "bottom") return {
				x: "50%",
				y: "100%"
			};
			const [left, right] = origin.split(" ");
			const leftOrigin = convertTransformUnit(left || "");
			const rightOrigin = convertTransformUnit(right || "");
			const originObject = {
				...leftOrigin,
				...rightOrigin
			};
			const nextOriginObject = {
				x: "50%",
				y: "50%"
			};
			if (originObject.x) nextOriginObject.x = originObject.x;
			if (originObject.y) nextOriginObject.y = originObject.y;
			if (originObject.value) {
				if (originObject.x && !originObject.y) nextOriginObject.y = originObject.value;
				if (!originObject.x && originObject.y) nextOriginObject.x = originObject.value;
			}
			return nextOriginObject;
		}
		if (origin === "left") return { x: "0%" };
		if (origin === "right") return { x: "100%" };
		if (origin === "top") return { y: "0%" };
		if (origin === "bottom") return { y: "100%" };
		if (!origin) return {};
		if (origin === "center") return { value: "50%" };
		return { value: origin };
	}
	function convertTransformOriginArray(transformOrigin, width, height) {
		const { x, y } = convertTransformUnit(transformOrigin, true);
		return [convertUnitSize(x, width) || 0, convertUnitSize(y, height) || 0];
	}
	function rotatePosesInfo(poses, origin, rad) {
		const prevPoses = poses.map((pos) => minus(pos, origin));
		const nextPoses = prevPoses.map((pos) => rotate(pos, rad));
		return {
			prev: prevPoses,
			next: nextPoses,
			result: nextPoses.map((pos) => plus(pos, origin))
		};
	}
	function isDeepArrayEquals(arr1, arr2) {
		return arr1.length === arr2.length && arr1.every((value1, i) => {
			const value2 = arr2[i];
			const isArray1 = isArray(value1);
			const isArray2 = isArray(value2);
			if (isArray1 && isArray2) return isDeepArrayEquals(value1, value2);
			else if (!isArray1 && !isArray2) return value1 === value2;
			return false;
		});
	}
	function watchValue(moveable, property, nextValue, valueKey, defaultValue) {
		const store = moveable._store;
		let prevValue = store[property];
		if (!(property in store)) {
			if (defaultValue != null) {
				store[property] = defaultValue;
				prevValue = defaultValue;
			} else {
				store[property] = nextValue;
				return nextValue;
			}
		}
		if (prevValue === nextValue || valueKey(prevValue) === valueKey(nextValue)) return prevValue;
		store[property] = nextValue;
		return nextValue;
	}
	function sign(value) {
		return value >= 0 ? 1 : -1;
	}
	function abs(value) {
		return Math.abs(value);
	}
	function countEach(count, callback) {
		return counter(count).map((index) => callback(index));
	}
	function getPaddingBox(padding) {
		if (isNumber(padding)) return {
			top: padding,
			left: padding,
			right: padding,
			bottom: padding
		};
		return {
			left: padding.left || 0,
			top: padding.top || 0,
			right: padding.right || 0,
			bottom: padding.bottom || 0
		};
	}
	/**
	* @namespace Moveable.Pinchable
	* @description Whether or not target can be pinched with draggable, resizable, scalable, rotatable (default: false)
	*/
	var Pinchable_default = makeAble$1("pinchable", {
		props: ["pinchable"],
		events: [
			"pinchStart",
			"pinch",
			"pinchEnd",
			"pinchGroupStart",
			"pinchGroup",
			"pinchGroupEnd"
		],
		dragStart() {
			return true;
		},
		pinchStart(moveable, e) {
			const { datas, targets, angle, originalDatas } = e;
			const { pinchable, ables } = moveable.props;
			if (!pinchable) return false;
			const eventName = `onPinch${targets ? "Group" : ""}Start`;
			const controlEventName = `drag${targets ? "Group" : ""}ControlStart`;
			const pinchAbles = (pinchable === true ? moveable.controlAbles : ables.filter((able) => {
				return pinchable.indexOf(able.name) > -1;
			})).filter((able) => able.canPinch && able[controlEventName]);
			const params = fillParams(moveable, e, {});
			if (targets) params.targets = targets;
			datas.isPinch = triggerEvent(moveable, eventName, params) !== false;
			datas.ables = pinchAbles;
			const isPinch = datas.isPinch;
			if (!isPinch) return false;
			pinchAbles.forEach((able) => {
				originalDatas[able.name] = originalDatas[able.name] || {};
				if (!able[controlEventName]) return;
				const ableEvent = {
					...e,
					datas: originalDatas[able.name],
					parentRotate: angle,
					isPinch: true
				};
				able[controlEventName](moveable, ableEvent);
			});
			moveable.state.snapRenderInfo = {
				request: e.isRequest,
				direction: [0, 0]
			};
			return isPinch;
		},
		pinch(moveable, e) {
			const { datas, scale: pinchScale, distance, originalDatas, inputEvent, targets, angle } = e;
			if (!datas.isPinch) return;
			const parentDistance = distance * (1 - 1 / pinchScale);
			const params = fillParams(moveable, e, {});
			if (targets) params.targets = targets;
			triggerEvent(moveable, `onPinch${targets ? "Group" : ""}`, params);
			const ables = datas.ables;
			const controlEventName = `drag${targets ? "Group" : ""}Control`;
			ables.forEach((able) => {
				if (!able[controlEventName]) return;
				able[controlEventName](moveable, {
					...e,
					datas: originalDatas[able.name],
					inputEvent,
					resolveMatrix: true,
					pinchScale,
					parentDistance,
					parentRotate: angle,
					isPinch: true
				});
			});
			return params;
		},
		pinchEnd(moveable, e) {
			const { datas, isPinch, inputEvent, targets, originalDatas } = e;
			if (!datas.isPinch) return;
			const eventName = `onPinch${targets ? "Group" : ""}End`;
			const params = fillEndParams(moveable, e, { isDrag: isPinch });
			if (targets) params.targets = targets;
			triggerEvent(moveable, eventName, params);
			const ables = datas.ables;
			const controlEventName = `drag${targets ? "Group" : ""}ControlEnd`;
			ables.forEach((able) => {
				if (!able[controlEventName]) return;
				able[controlEventName](moveable, {
					...e,
					isDrag: isPinch,
					datas: originalDatas[able.name],
					inputEvent,
					isPinch: true
				});
			});
			return isPinch;
		},
		pinchGroupStart(moveable, e) {
			return this.pinchStart(moveable, {
				...e,
				targets: moveable.props.targets
			});
		},
		pinchGroup(moveable, e) {
			return this.pinch(moveable, {
				...e,
				targets: moveable.props.targets
			});
		},
		pinchGroupEnd(moveable, e) {
			return this.pinchEnd(moveable, {
				...e,
				targets: moveable.props.targets
			});
		}
	});
	/**
	* Whether or not target can be pinched with draggable, resizable, scalable, rotatable (default: false)
	* @name Moveable.Pinchable#pinchable
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.pinchable = true;
	*/
	/**
	* When the pinch starts, the pinchStart event is called with part of scaleStart, rotateStart, resizeStart
	* @memberof Moveable.Pinchable
	* @event pinchStart
	* @param {Moveable.Pinchable.OnPinchStart} - Parameters for the pinchStart event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     rotatable: true,
	*     scalable: true,
	*     pinchable: true, // ["rotatable", "scalable"]
	* });
	* moveable.on("pinchStart", ({ target }) => {
	*     console.log(target);
	* });
	* moveable.on("rotateStart", ({ target }) => {
	*     console.log(target);
	* });
	* moveable.on("scaleStart", ({ target }) => {
	*     console.log(target);
	* });
	*/
	/**
	* When pinching, the pinch event is called with part of scale, rotate, resize
	* @memberof Moveable.Pinchable
	* @event pinch
	* @param {Moveable.Pinchable.OnPinch} - Parameters for the pinch event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     rotatable: true,
	*     scalable: true,
	*     pinchable: true, // ["rotatable", "scalable"]
	* });
	* moveable.on("pinch", ({ target }) => {
	*     console.log(target);
	* });
	* moveable.on("rotate", ({ target }) => {
	*     console.log(target);
	* });
	* moveable.on("scale", ({ target }) => {
	*     console.log(target);
	* });
	*/
	/**
	* When the pinch finishes, the pinchEnd event is called.
	* @memberof Moveable.Pinchable
	* @event pinchEnd
	* @param {Moveable.Pinchable.OnPinchEnd} - Parameters for the pinchEnd event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     rotatable: true,
	*     scalable: true,
	*     pinchable: true, // ["rotatable", "scalable"]
	* });
	* moveable.on("pinchEnd", ({ target }) => {
	*     console.log(target);
	* });
	* moveable.on("rotateEnd", ({ target }) => {
	*     console.log(target);
	* });
	* moveable.on("scaleEnd", ({ target }) => {
	*     console.log(target);
	* });
	*/
	/**
	* When the group pinch starts, the `pinchGroupStart` event is called.
	* @memberof Moveable.Pinchable
	* @event pinchGroupStart
	* @param {Moveable.Pinchable.OnPinchGroupStart} - Parameters for the `pinchGroupStart` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     pinchable: true
	* });
	* moveable.on("pinchGroupStart", ({ targets }) => {
	*     console.log("onPinchGroupStart", targets);
	* });
	*/
	/**
	* When the group pinch, the `pinchGroup` event is called.
	* @memberof Moveable.Pinchable
	* @event pinchGroup
	* @param {Moveable.Pinchable.OnPinchGroup} - Parameters for the `pinchGroup` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     pinchable: true
	* });
	* moveable.on("pinchGroup", ({ targets, events }) => {
	*     console.log("onPinchGroup", targets);
	* });
	*/
	/**
	* When the group pinch finishes, the `pinchGroupEnd` event is called.
	* @memberof Moveable.Pinchable
	* @event pinchGroupEnd
	* @param {Moveable.Pinchable.OnPinchGroupEnd} - Parameters for the `pinchGroupEnd` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     pinchable: true
	* });
	* moveable.on("pinchGroupEnd", ({ targets, isDrag }) => {
	*     console.log("onPinchGroupEnd", targets, isDrag);
	* });
	*/
	const directionCondition = getDirectionCondition("scalable");
	/**
	* @namespace Scalable
	* @memberof Moveable
	* @description Scalable indicates whether the target's x and y can be scale of transform.
	*/
	var Scalable_default = {
		name: "scalable",
		ableGroup: "size",
		canPinch: true,
		props: [
			"scalable",
			"throttleScale",
			"renderDirections",
			"keepRatio",
			"edge",
			"displayAroundControls"
		],
		events: [
			"scaleStart",
			"beforeScale",
			"scale",
			"scaleEnd",
			"scaleGroupStart",
			"beforeScaleGroup",
			"scaleGroup",
			"scaleGroupEnd"
		],
		render: getRenderDirections("scalable"),
		dragControlCondition: directionCondition,
		viewClassName: getDirectionViewClassName("scalable"),
		dragControlStart(moveable, e) {
			const { datas, isPinch, inputEvent, parentDirection } = e;
			const direction = getTotalDirection(parentDirection, isPinch, inputEvent, datas);
			const { width, height, targetTransform, target, pos1, pos2, pos4 } = moveable.state;
			if (!direction || !target) return false;
			if (!isPinch) setDragStart(moveable, e);
			datas.datas = {};
			datas.transform = targetTransform;
			datas.prevDist = [1, 1];
			datas.direction = direction;
			datas.startOffsetWidth = width;
			datas.startOffsetHeight = height;
			datas.startValue = [1, 1];
			const isWidth = !direction[0] && !direction[1] || direction[0] || !direction[1];
			setDefaultTransformIndex(moveable, e, "scale");
			datas.isWidth = isWidth;
			function setRatio(ratio) {
				datas.ratio = ratio && isFinite(ratio) ? ratio : 0;
			}
			datas.startPositions = getAbsolutePosesByState(moveable.state);
			function setFixedDirection(fixedDirection) {
				const result = getFixedDirectionInfo(datas.startPositions, fixedDirection);
				datas.fixedDirection = result.fixedDirection;
				datas.fixedPosition = result.fixedPosition;
				datas.fixedOffset = result.fixedOffset;
			}
			datas.setFixedDirection = setFixedDirection;
			setRatio(getDist$2(pos1, pos2) / getDist$2(pos2, pos4));
			setFixedDirection([-direction[0], -direction[1]]);
			const setMinScaleSize = (min) => {
				datas.minScaleSize = min;
			};
			const setMaxScaleSize = (max) => {
				datas.maxScaleSize = max;
			};
			setMinScaleSize([-Infinity, -Infinity]);
			setMaxScaleSize([Infinity, Infinity]);
			const params = fillParams(moveable, e, {
				direction,
				set: (scale) => {
					datas.startValue = scale;
				},
				setRatio,
				setFixedDirection,
				setMinScaleSize,
				setMaxScaleSize,
				...fillTransformStartEvent(moveable, e),
				dragStart: Draggable_default.dragStart(moveable, new CustomGesto().dragStart([0, 0], e))
			});
			const result = triggerEvent(moveable, "onScaleStart", params);
			datas.startFixedDirection = datas.fixedDirection;
			if (result !== false) {
				datas.isScale = true;
				moveable.state.snapRenderInfo = {
					request: e.isRequest,
					direction
				};
			}
			return datas.isScale ? params : false;
		},
		dragControl(moveable, e) {
			resolveTransformEvent(moveable, e, "scale");
			const { datas, parentKeepRatio, parentFlag, isPinch, dragClient, isRequest, useSnap, resolveMatrix } = e;
			const { prevDist, direction, startOffsetWidth, startOffsetHeight, isScale, startValue, isWidth, ratio } = datas;
			if (!isScale) return false;
			const props = moveable.props;
			const { throttleScale, parentMoveable } = props;
			let sizeDirection = direction;
			if (!direction[0] && !direction[1]) sizeDirection = [1, 1];
			const keepRatio = ratio && (parentKeepRatio != null ? parentKeepRatio : props.keepRatio) || false;
			const state = moveable.state;
			const tempScaleValue = [startValue[0], startValue[1]];
			function getNextScale() {
				const { distWidth, distHeight } = getOffsetSizeDist(sizeDirection, keepRatio, datas, e);
				const distX = startOffsetWidth ? (startOffsetWidth + distWidth) / startOffsetWidth : 1;
				const distY = startOffsetHeight ? (startOffsetHeight + distHeight) / startOffsetHeight : 1;
				if (!startValue[0]) tempScaleValue[0] = distWidth / startOffsetWidth;
				if (!startValue[1]) tempScaleValue[1] = distHeight / startOffsetHeight;
				let scaleX = (sizeDirection[0] || keepRatio ? distX : 1) * tempScaleValue[0];
				let scaleY = (sizeDirection[1] || keepRatio ? distY : 1) * tempScaleValue[1];
				if (scaleX === 0) scaleX = sign(prevDist[0]) * MIN_SCALE;
				if (scaleY === 0) scaleY = sign(prevDist[1]) * MIN_SCALE;
				return [scaleX, scaleY];
			}
			let scale = getNextScale();
			if (!isPinch && moveable.props.groupable) {
				const stateDirection = (state.snapRenderInfo || {}).direction;
				if (isArray(stateDirection) && (stateDirection[0] || stateDirection[1])) state.snapRenderInfo = {
					direction,
					request: e.isRequest
				};
			}
			triggerEvent(moveable, "onBeforeScale", fillParams(moveable, e, {
				scale,
				setFixedDirection(nextFixedDirection) {
					datas.setFixedDirection(nextFixedDirection);
					scale = getNextScale();
					return scale;
				},
				startFixedDirection: datas.startFixedDirection,
				setScale(nextScale) {
					scale = nextScale;
				}
			}, true));
			let dist = [scale[0] / tempScaleValue[0], scale[1] / tempScaleValue[1]];
			let fixedPosition = dragClient;
			let snapDist = [0, 0];
			const distSign = sign(dist[0] * dist[1]);
			const isSelfPinch = !dragClient && !parentFlag && isPinch;
			if (isSelfPinch || resolveMatrix) fixedPosition = getTranslateFixedPosition(moveable, datas.targetAllTransform, [0, 0], [0, 0], datas);
			else if (!dragClient) fixedPosition = datas.fixedPosition;
			if (!isPinch) snapDist = checkSnapScale(moveable, dist, direction, !useSnap && isRequest, datas);
			if (keepRatio) {
				if (sizeDirection[0] && sizeDirection[1] && snapDist[0] && snapDist[1]) {
					if (Math.abs(snapDist[0] * startOffsetWidth) > Math.abs(snapDist[1] * startOffsetHeight)) snapDist[1] = 0;
					else snapDist[0] = 0;
				}
				const isNoSnap = !snapDist[0] && !snapDist[1];
				if (isNoSnap) {
					if (isWidth) dist[0] = throttle(dist[0] * tempScaleValue[0], throttleScale) / tempScaleValue[0];
					else dist[1] = throttle(dist[1] * tempScaleValue[1], throttleScale) / tempScaleValue[1];
				}
				if (sizeDirection[0] && !sizeDirection[1] || snapDist[0] && !snapDist[1] || isNoSnap && isWidth) {
					dist[0] += snapDist[0];
					const snapHeight = startOffsetWidth * dist[0] * tempScaleValue[0] / ratio;
					dist[1] = sign(distSign * dist[0]) * abs(snapHeight / startOffsetHeight / tempScaleValue[1]);
				} else if (!sizeDirection[0] && sizeDirection[1] || !snapDist[0] && snapDist[1] || isNoSnap && !isWidth) {
					dist[1] += snapDist[1];
					const snapWidth = startOffsetHeight * dist[1] * tempScaleValue[1] * ratio;
					dist[0] = sign(distSign * dist[1]) * abs(snapWidth / startOffsetWidth / tempScaleValue[0]);
				}
			} else {
				dist[0] += snapDist[0];
				dist[1] += snapDist[1];
				if (!snapDist[0]) dist[0] = throttle(dist[0] * tempScaleValue[0], throttleScale) / tempScaleValue[0];
				if (!snapDist[1]) dist[1] = throttle(dist[1] * tempScaleValue[1], throttleScale) / tempScaleValue[1];
			}
			if (dist[0] === 0) dist[0] = sign(prevDist[0]) * MIN_SCALE;
			if (dist[1] === 0) dist[1] = sign(prevDist[1]) * MIN_SCALE;
			scale = multiply2(dist, [tempScaleValue[0], tempScaleValue[1]]);
			const startOffsetSize = [startOffsetWidth, startOffsetHeight];
			let scaleSize = [startOffsetWidth * scale[0], startOffsetHeight * scale[1]];
			scaleSize = calculateBoundSize(scaleSize, datas.minScaleSize, datas.maxScaleSize, keepRatio ? ratio : false);
			scale = countEach(2, (i) => {
				return startOffsetSize[i] ? scaleSize[i] / startOffsetSize[i] : scaleSize[i];
			});
			dist = countEach(2, (i) => {
				return scale[i] / tempScaleValue[i];
			});
			const delta = countEach(2, (i) => prevDist[i] ? dist[i] / prevDist[i] : dist[i]);
			const distText = `scale(${dist.join(", ")})`;
			const scaleText = `scale(${scale.join(", ")})`;
			const nextTransform = convertTransformFormat(datas, scaleText, distText);
			const isZeroScale = !startValue[0] || !startValue[1];
			const inverseDist = getScaleDist(moveable, isZeroScale ? scaleText : distText, datas.fixedDirection, fixedPosition, datas.fixedOffset, datas, isZeroScale);
			const inverseDelta = isSelfPinch ? inverseDist : minus(inverseDist, datas.prevInverseDist || [0, 0]);
			datas.prevDist = dist;
			datas.prevInverseDist = inverseDist;
			if (scale[0] === prevDist[0] && scale[1] === prevDist[1] && inverseDelta.every((num) => !num) && !parentMoveable && !isSelfPinch) return false;
			const params = fillParams(moveable, e, {
				offsetWidth: startOffsetWidth,
				offsetHeight: startOffsetHeight,
				direction,
				scale,
				dist,
				delta,
				isPinch: !!isPinch,
				...fillTransformEvent(moveable, nextTransform, inverseDelta, isPinch, e)
			});
			triggerEvent(moveable, "onScale", params);
			return params;
		},
		dragControlEnd(moveable, e) {
			const { datas } = e;
			if (!datas.isScale) return false;
			datas.isScale = false;
			const scaleEndParam = fillEndParams(moveable, e, {});
			triggerEvent(moveable, "onScaleEnd", scaleEndParam);
			return scaleEndParam;
		},
		dragGroupControlCondition: directionCondition,
		dragGroupControlStart(moveable, e) {
			const { datas } = e;
			const params = this.dragControlStart(moveable, e);
			if (!params) return false;
			const originalEvents = fillChildEvents(moveable, "resizable", e);
			datas.moveableScale = moveable.scale;
			const events = triggerChildAbles(moveable, this, "dragControlStart", e, (child, ev) => {
				return startChildDist(moveable, child, datas, ev);
			});
			const setFixedDirection = (fixedDirection) => {
				params.setFixedDirection(fixedDirection);
				events.forEach((ev, i) => {
					ev.setFixedDirection(fixedDirection);
					startChildDist(moveable, ev.moveable, datas, originalEvents[i]);
				});
			};
			datas.setFixedDirection = setFixedDirection;
			const nextParams = {
				...params,
				targets: moveable.props.targets,
				events,
				setFixedDirection
			};
			datas.isScale = triggerEvent(moveable, "onScaleGroupStart", nextParams) !== false;
			return datas.isScale ? nextParams : false;
		},
		dragGroupControl(moveable, e) {
			const { datas } = e;
			if (!datas.isScale) return;
			catchEvent(moveable, "onBeforeScale", (parentEvent) => {
				triggerEvent(moveable, "onBeforeScaleGroup", fillParams(moveable, e, {
					...parentEvent,
					targets: moveable.props.targets
				}, true));
			});
			const params = this.dragControl(moveable, e);
			if (!params) return;
			const { dist } = params;
			const moveableScale = datas.moveableScale;
			moveable.scale = [dist[0] * moveableScale[0], dist[1] * moveableScale[1]];
			const keepRatio = moveable.props.keepRatio;
			const fixedPosition = datas.fixedPosition;
			const events = triggerChildAbles(moveable, this, "dragControl", e, (_, ev) => {
				const [clientX, clientY] = calculate(createRotateMatrix(moveable.rotation / 180 * Math.PI, 3), [
					ev.datas.originalX * dist[0],
					ev.datas.originalY * dist[1],
					1
				], 3);
				return {
					...ev,
					parentDist: null,
					parentScale: dist,
					parentKeepRatio: keepRatio,
					dragClient: plus(fixedPosition, [clientX, clientY])
				};
			});
			const nextParams = {
				targets: moveable.props.targets,
				events,
				...params
			};
			triggerEvent(moveable, "onScaleGroup", nextParams);
			return nextParams;
		},
		dragGroupControlEnd(moveable, e) {
			const { isDrag, datas } = e;
			if (!datas.isScale) return;
			this.dragControlEnd(moveable, e);
			const events = triggerChildAbles(moveable, this, "dragControlEnd", e);
			triggerEvent(moveable, "onScaleGroupEnd", fillEndParams(moveable, e, {
				targets: moveable.props.targets,
				events
			}));
			return isDrag;
		},
		/**
		* @method Moveable.Scalable#request
		* @param {Moveable.Scalable.ScalableRequestParam} e - the Scalable's request parameter
		* @return {Moveable.Requester} Moveable Requester
		* @example
		
		* // Instantly Request (requestStart - request - requestEnd)
		* moveable.request("scalable", { deltaWidth: 10, deltaHeight: 10 }, true);
		*
		* // requestStart
		* const requester = moveable.request("scalable");
		*
		* // request
		* requester.request({ deltaWidth: 10, deltaHeight: 10 });
		* requester.request({ deltaWidth: 10, deltaHeight: 10 });
		* requester.request({ deltaWidth: 10, deltaHeight: 10 });
		*
		* // requestEnd
		* requester.requestEnd();
		*/
		request() {
			const datas = {};
			let distWidth = 0;
			let distHeight = 0;
			let useSnap = false;
			return {
				isControl: true,
				requestStart(e) {
					useSnap = e.useSnap;
					return {
						datas,
						parentDirection: e.direction || [1, 1],
						useSnap
					};
				},
				request(e) {
					distWidth += e.deltaWidth;
					distHeight += e.deltaHeight;
					return {
						datas,
						parentDist: [distWidth, distHeight],
						parentKeepRatio: e.keepRatio,
						useSnap
					};
				},
				requestEnd() {
					return {
						datas,
						isDrag: true,
						useSnap
					};
				}
			};
		}
	};
	/**
	* Whether or not target can scaled.
	*
	* @name Moveable.Scalable#scalable
	* @default false
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.scalable = true;
	*/
	/**
	* throttle of scaleX, scaleY when scale.
	* @name Moveable.Scalable#throttleScale
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.throttleScale = 0.1;
	*/
	/**
	* Set directions to show the control box. (default: ["n", "nw", "ne", "s", "se", "sw", "e", "w"])
	* @name Moveable.Scalable#renderDirections
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     scalable: true,
	*   renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
	* });
	*
	* moveable.renderDirections = ["nw", "ne", "sw", "se"];
	*/
	/**
	* When resize or scale, keeps a ratio of the width, height. (default: false)
	* @name Moveable.Scalable#keepRatio
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     scalable: true,
	* });
	*
	* moveable.keepRatio = true;
	*/
	/**
	* When the scale starts, the scaleStart event is called.
	* @memberof Moveable.Scalable
	* @event scaleStart
	* @param {Moveable.Scalable.OnScaleStart} - Parameters for the scaleStart event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { scalable: true });
	* moveable.on("scaleStart", ({ target }) => {
	*     console.log(target);
	* });
	*/
	/**
	* When scaling, `beforeScale` is called before `scale` occurs. In `beforeScale`, you can get and set the pre-value before scaling.
	* @memberof Moveable.Scalable
	* @event beforeScale
	* @param {Moveable.Scalable.OnBeforeScale} - Parameters for the `beforeScale` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { scalable: true });
	* moveable.on("beforeScale", ({ setFixedDirection }) => {
	*     if (shiftKey) {
	*        setFixedDirection([0, 0]);
	*     }
	* });
	* moveable.on("scale", ({ target, transform, dist }) => {
	*     target.style.transform = transform;
	* });
	*/
	/**
	* When scaling, the `scale` event is called.
	* @memberof Moveable.Scalable
	* @event scale
	* @param {Moveable.Scalable.OnScale} - Parameters for the `scale` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { scalable: true });
	* moveable.on("scale", ({ target, transform, dist }) => {
	*     target.style.transform = transform;
	* });
	*/
	/**
	* When the scale finishes, the `scaleEnd` event is called.
	* @memberof Moveable.Scalable
	* @event scaleEnd
	* @param {Moveable.Scalable.OnScaleEnd} - Parameters for the `scaleEnd` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { scalable: true });
	* moveable.on("scaleEnd", ({ target, isDrag }) => {
	*     console.log(target, isDrag);
	* });
	*/
	/**
	* When the group scale starts, the `scaleGroupStart` event is called.
	* @memberof Moveable.Scalable
	* @event scaleGroupStart
	* @param {Moveable.Scalable.OnScaleGroupStart} - Parameters for the `scaleGroupStart` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     scalable: true
	* });
	* moveable.on("scaleGroupStart", ({ targets }) => {
	*     console.log("onScaleGroupStart", targets);
	* });
	*/
	/**
	* When the group scale, the `scaleGroup` event is called.
	* @memberof Moveable.Scalable
	* @event scaleGroup
	* @param {Moveable.Scalable.OnScaleGroup} - Parameters for the `scaleGroup` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     scalable: true
	* });
	* moveable.on("scaleGroup", ({ targets, events }) => {
	*     console.log("onScaleGroup", targets);
	*     events.forEach(ev => {
	*         const target = ev.target;
	*         // ev.drag is a drag event that occurs when the group scale.
	*         const left = ev.drag.beforeDist[0];
	*         const top = ev.drag.beforeDist[1];
	*         const scaleX = ev.scale[0];
	*         const scaleY = ev.scale[1];
	*     });
	* });
	*/
	/**
	* When the group scale finishes, the `scaleGroupEnd` event is called.
	* @memberof Moveable.Scalable
	* @event scaleGroupEnd
	* @param {Moveable.Scalable.OnScaleGroupEnd} - Parameters for the `scaleGroupEnd` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	*     scalable: true
	* });
	* moveable.on("scaleGroupEnd", ({ targets, isDrag }) => {
	*     console.log("onScaleGroupEnd", targets, isDrag);
	* });
	*/
	function getMiddleLinePos(pos1, pos2) {
		return pos1.map((pos, i) => dot(pos, pos2[i], 1, 2));
	}
	function getTriangleRad(pos1, pos2, pos3) {
		const rad1 = getRad$1(pos1, pos2);
		const rad = getRad$1(pos1, pos3) - rad1;
		return rad >= 0 ? rad : rad + 2 * Math.PI;
	}
	function isValidPos(poses1, poses2) {
		const rad1 = getTriangleRad(poses1[0], poses1[1], poses1[2]);
		const rad2 = getTriangleRad(poses2[0], poses2[1], poses2[2]);
		const pi = Math.PI;
		if (rad1 >= pi && rad2 <= pi || rad1 <= pi && rad2 >= pi) return false;
		return true;
	}
	/**
	* @namespace Moveable.Warpable
	* @description Warpable indicates whether the target can be warped(distorted, bented).
	*/
	var Warpable_default = {
		name: "warpable",
		ableGroup: "size",
		props: [
			"warpable",
			"renderDirections",
			"edge",
			"displayAroundControls"
		],
		events: [
			"warpStart",
			"warp",
			"warpEnd"
		],
		viewClassName: getDirectionViewClassName("warpable"),
		render(moveable, React) {
			const { resizable, scalable, warpable, zoom } = moveable.props;
			if (resizable || scalable || !warpable) return [];
			const { pos1, pos2, pos3, pos4 } = moveable.state;
			const linePosFrom1 = getMiddleLinePos(pos1, pos2);
			const linePosFrom2 = getMiddleLinePos(pos2, pos1);
			const linePosFrom3 = getMiddleLinePos(pos1, pos3);
			const linePosFrom4 = getMiddleLinePos(pos3, pos1);
			const linePosTo1 = getMiddleLinePos(pos3, pos4);
			const linePosTo2 = getMiddleLinePos(pos4, pos3);
			const linePosTo3 = getMiddleLinePos(pos2, pos4);
			const linePosTo4 = getMiddleLinePos(pos4, pos2);
			return [
				/* @__PURE__ */ React.createElement("div", {
					className: prefix("line"),
					key: "middeLine1",
					style: getLineStyle(linePosFrom1, linePosTo1, zoom)
				}),
				/* @__PURE__ */ React.createElement("div", {
					className: prefix("line"),
					key: "middeLine2",
					style: getLineStyle(linePosFrom2, linePosTo2, zoom)
				}),
				/* @__PURE__ */ React.createElement("div", {
					className: prefix("line"),
					key: "middeLine3",
					style: getLineStyle(linePosFrom3, linePosTo3, zoom)
				}),
				/* @__PURE__ */ React.createElement("div", {
					className: prefix("line"),
					key: "middeLine4",
					style: getLineStyle(linePosFrom4, linePosTo4, zoom)
				}),
				...renderAllDirections(moveable, "warpable", React)
			];
		},
		dragControlCondition(moveable, e) {
			if (e.isRequest) return false;
			const target = e.inputEvent.target;
			return hasClass(target, prefix("direction")) && hasClass(target, prefix("warpable"));
		},
		dragControlStart(moveable, e) {
			const { datas, inputEvent } = e;
			const { target } = moveable.props;
			const { target: inputTarget } = inputEvent;
			const direction = getDirection(inputTarget, datas);
			if (!direction || !target) return false;
			const state = moveable.state;
			const { transformOrigin, is3d, targetTransform, targetMatrix, width, height, left, top } = state;
			datas.datas = {};
			datas.targetTransform = targetTransform;
			datas.warpTargetMatrix = is3d ? targetMatrix : convertDimension(targetMatrix, 3, 4);
			datas.targetInverseMatrix = ignoreDimension(invert(datas.warpTargetMatrix, 4), 3, 4);
			datas.direction = direction;
			datas.left = left;
			datas.top = top;
			datas.poses = [
				[0, 0],
				[width, 0],
				[0, height],
				[width, height]
			].map((p) => minus(p, transformOrigin));
			datas.nextPoses = datas.poses.map(([x, y]) => calculate(datas.warpTargetMatrix, [
				x,
				y,
				0,
				1
			], 4));
			datas.startValue = createIdentityMatrix(4);
			datas.prevMatrix = createIdentityMatrix(4);
			datas.absolutePoses = getAbsolutePosesByState(state);
			datas.posIndexes = getPosIndexesByDirection(direction);
			setDragStart(moveable, e);
			setDefaultTransformIndex(moveable, e, "matrix3d");
			state.snapRenderInfo = {
				request: e.isRequest,
				direction
			};
			if (triggerEvent(moveable, "onWarpStart", fillParams(moveable, e, {
				set: (matrix) => {
					datas.startValue = matrix;
				},
				...fillTransformStartEvent(moveable, e)
			})) !== false) datas.isWarp = true;
			return datas.isWarp;
		},
		dragControl(moveable, e) {
			const { datas, isRequest } = e;
			let { distX, distY } = e;
			const { targetInverseMatrix, prevMatrix, isWarp, startValue, poses, posIndexes, absolutePoses } = datas;
			if (!isWarp) return false;
			resolveTransformEvent(moveable, e, "matrix3d");
			if (hasGuidelines(moveable, "warpable")) {
				const selectedPoses = posIndexes.map((index) => absolutePoses[index]);
				if (selectedPoses.length > 1) selectedPoses.push([(selectedPoses[0][0] + selectedPoses[1][0]) / 2, (selectedPoses[0][1] + selectedPoses[1][1]) / 2]);
				const { horizontal: horizontalSnapInfo, vertical: verticalSnapInfo } = checkMoveableSnapBounds(moveable, isRequest, {
					horizontal: selectedPoses.map((pos) => pos[1] + distY),
					vertical: selectedPoses.map((pos) => pos[0] + distX)
				});
				distY -= horizontalSnapInfo.offset;
				distX -= verticalSnapInfo.offset;
			}
			const dist = getDragDist({
				datas,
				distX,
				distY
			}, true);
			const nextPoses = datas.nextPoses.slice();
			posIndexes.forEach((index) => {
				nextPoses[index] = plus(nextPoses[index], dist);
			});
			if (!NEARBY_POS.every((nearByPoses) => isValidPos(nearByPoses.map((i) => poses[i]), nearByPoses.map((i) => nextPoses[i])))) return false;
			const h = createWarpMatrix(poses[0], poses[2], poses[1], poses[3], nextPoses[0], nextPoses[2], nextPoses[1], nextPoses[3]);
			if (!h.length) return false;
			const matrix = getTransfromMatrix(datas, multiply(targetInverseMatrix, h, 4), true);
			const delta = multiply(invert(prevMatrix, 4), matrix, 4);
			datas.prevMatrix = matrix;
			const totalMatrix = multiply(startValue, matrix, 4);
			const nextTransform = convertTransformFormat(datas, `matrix3d(${totalMatrix.join(", ")})`, `matrix3d(${matrix.join(", ")})`);
			fillOriginalTransform(e, nextTransform);
			triggerEvent(moveable, "onWarp", fillParams(moveable, e, {
				delta,
				matrix: totalMatrix,
				dist: matrix,
				multiply,
				transform: nextTransform,
				...fillCSSObject({ transform: nextTransform }, e)
			}));
			return true;
		},
		dragControlEnd(moveable, e) {
			const { datas, isDrag } = e;
			if (!datas.isWarp) return false;
			datas.isWarp = false;
			triggerEvent(moveable, "onWarpEnd", fillEndParams(moveable, e, {}));
			return isDrag;
		}
	};
	/**
	* Whether or not target can be warped. (default: false)
	* @name Moveable.Warpable#warpable
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.warpable = true;
	*/
	/**
	* Set directions to show the control box. (default: ["n", "nw", "ne", "s", "se", "sw", "e", "w"])
	* @name Moveable.Warpable#renderDirections
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     warpable: true,
	*     renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
	* });
	*
	* moveable.renderDirections = ["nw", "ne", "sw", "se"];
	*/
	/**
	* When the warp starts, the warpStart event is called.
	* @memberof Moveable.Warpable
	* @event warpStart
	* @param {Moveable.Warpable.OnWarpStart} - Parameters for the warpStart event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { warpable: true });
	* moveable.on("warpStart", ({ target }) => {
	*     console.log(target);
	* });
	*/
	/**
	* When warping, the warp event is called.
	* @memberof Moveable.Warpable
	* @event warp
	* @param {Moveable.Warpable.OnWarp} - Parameters for the warp event
	* @example
	* import Moveable from "moveable";
	* let matrix = [
	*  1, 0, 0, 0,
	*  0, 1, 0, 0,
	*  0, 0, 1, 0,
	*  0, 0, 0, 1,
	* ];
	* const moveable = new Moveable(document.body, { warpable: true });
	* moveable.on("warp", ({ target, transform, delta, multiply }) => {
	*    // target.style.transform = transform;
	*    matrix = multiply(matrix, delta);
	*    target.style.transform = `matrix3d(${matrix.join(",")})`;
	* });
	*/
	/**
	* When the warp finishes, the warpEnd event is called.
	* @memberof Moveable.Warpable
	* @event warpEnd
	* @param {Moveable.Warpable.OnWarpEnd} - Parameters for the warpEnd event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, { warpable: true });
	* moveable.on("warpEnd", ({ target, isDrag }) => {
	*     console.log(target, isDrag);
	* });
	*/
	const AREA_PIECES = /*#__PURE__*/ prefix("area-pieces");
	const AREA_PIECE = /*#__PURE__*/ prefix("area-piece");
	const AVOID = /*#__PURE__*/ prefix("avoid");
	const VIEW_DRAGGING = prefix("view-dragging");
	function restoreStyle(moveable) {
		const el = moveable.areaElement;
		if (!el) return;
		const { width, height } = moveable.state;
		removeClass(el, AVOID);
		el.style.cssText += `left: 0px; top: 0px; width: ${width}px; height: ${height}px`;
	}
	function renderPieces(React) {
		return /* @__PURE__ */ React.createElement("div", {
			key: "area_pieces",
			className: AREA_PIECES
		}, /* @__PURE__ */ React.createElement("div", { className: AREA_PIECE }), /* @__PURE__ */ React.createElement("div", { className: AREA_PIECE }), /* @__PURE__ */ React.createElement("div", { className: AREA_PIECE }), /* @__PURE__ */ React.createElement("div", { className: AREA_PIECE }));
	}
	var DragArea_default = {
		name: "dragArea",
		props: ["dragArea", "passDragArea"],
		events: ["click", "clickGroup"],
		render(moveable, React) {
			const { target, dragArea, groupable, passDragArea } = moveable.props;
			const { width, height, renderPoses } = moveable.getState();
			const className = passDragArea ? prefix("area", "pass") : prefix("area");
			if (groupable) return [/* @__PURE__ */ React.createElement("div", {
				key: "area",
				ref: ref(moveable, "areaElement"),
				className
			}), renderPieces(React)];
			if (!target || !dragArea) return [];
			const h = createWarpMatrix([0, 0], [width, 0], [0, height], [width, height], renderPoses[0], renderPoses[1], renderPoses[2], renderPoses[3]);
			const transform = h.length ? makeMatrixCSS(h, true) : "none";
			return [/* @__PURE__ */ React.createElement("div", {
				key: "area",
				ref: ref(moveable, "areaElement"),
				className,
				style: {
					top: "0px",
					left: "0px",
					width: `${width}px`,
					height: `${height}px`,
					transformOrigin: "0 0",
					transform
				}
			}), renderPieces(React)];
		},
		dragStart(moveable, { datas, clientX, clientY, inputEvent }) {
			if (!inputEvent) return false;
			datas.isDragArea = false;
			const areaElement = moveable.areaElement;
			const state = moveable.state;
			const { moveableClientRect, renderPoses, rootMatrix, is3d } = state;
			const { left, top } = moveableClientRect;
			const { left: relativeLeft, top: relativeTop, width, height } = getRect(renderPoses);
			const n = is3d ? 4 : 3;
			let [posX, posY] = calculateInversePosition(rootMatrix, [clientX - left, clientY - top], n);
			posX -= relativeLeft;
			posY -= relativeTop;
			const rects = [
				{
					left: relativeLeft,
					top: relativeTop,
					width,
					height: posY - 10
				},
				{
					left: relativeLeft,
					top: relativeTop,
					width: posX - 10,
					height
				},
				{
					left: relativeLeft,
					top: relativeTop + posY + 10,
					width,
					height: height - posY - 10
				},
				{
					left: relativeLeft + posX + 10,
					top: relativeTop,
					width: width - posX - 10,
					height
				}
			];
			const children = [].slice.call(areaElement.nextElementSibling.children);
			rects.forEach((rect, i) => {
				children[i].style.cssText = `left: ${rect.left}px;top: ${rect.top}px; width: ${rect.width}px; height: ${rect.height}px;`;
			});
			addClass(areaElement, AVOID);
			state.disableNativeEvent = true;
		},
		drag(moveable, { datas, inputEvent }) {
			this.enableNativeEvent(moveable);
			if (!inputEvent) return false;
			if (!datas.isDragArea) {
				datas.isDragArea = true;
				restoreStyle(moveable);
			}
		},
		dragEnd(moveable, e) {
			this.enableNativeEvent(moveable);
			const { inputEvent, datas } = e;
			if (!inputEvent) return false;
			if (!datas.isDragArea) restoreStyle(moveable);
		},
		dragGroupStart(moveable, e) {
			return this.dragStart(moveable, e);
		},
		dragGroup(moveable, e) {
			return this.drag(moveable, e);
		},
		dragGroupEnd(moveable, e) {
			return this.dragEnd(moveable, e);
		},
		unset(moveable) {
			restoreStyle(moveable);
			moveable.state.disableNativeEvent = false;
		},
		enableNativeEvent(moveable) {
			const state = moveable.state;
			if (state.disableNativeEvent) requestAnimationFrame$1(() => {
				state.disableNativeEvent = false;
			});
		}
	};
	/**
	* Add an event to the moveable area instead of the target for stopPropagation. (default: false, true in group)
	* @name Moveable#dragArea
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*  dragArea: false,
	* });
	*/
	/**
	* Set `pointerEvents: none;` css to pass events in dragArea. (default: false)
	* @name Moveable#passDragArea
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*  dragArea: false,
	* });
	*/
	var Origin_default = makeAble$1("origin", {
		props: ["origin", "svgOrigin"],
		render(moveable, React) {
			const { zoom, svgOrigin, groupable } = moveable.props;
			const { beforeOrigin, rotation, svg, allMatrix, is3d, left, top, offsetWidth, offsetHeight } = moveable.getState();
			let originStyle;
			if (!groupable && svg && svgOrigin) {
				const [originX, originY] = convertTransformOriginArray(svgOrigin, offsetWidth, offsetHeight);
				originStyle = getControlTransform(rotation, zoom, minus(calculatePosition(allMatrix, [originX, originY], is3d ? 4 : 3), [left, top]));
			} else originStyle = getControlTransform(rotation, zoom, beforeOrigin);
			return [/* @__PURE__ */ React.createElement("div", {
				className: prefix("control", "origin"),
				style: originStyle,
				key: "beforeOrigin"
			})];
		}
	});
	/**
	* Whether or not the origin controlbox will be visible or not (default: true)
	* @name Moveable#origin
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	*
	* moveable.origin = true;
	*/
	function getDefaultScrollPosition(e) {
		const scrollContainer = e.scrollContainer;
		return [scrollContainer.scrollLeft, scrollContainer.scrollTop];
	}
	/**
	* @namespace Moveable.Scrollable
	* @description Whether or not target can be scrolled to the scroll container (default: false)
	*/
	var Scrollable_default = {
		name: "scrollable",
		canPinch: true,
		props: [
			"scrollable",
			"scrollContainer",
			"scrollThreshold",
			"scrollThrottleTime",
			"getScrollPosition",
			"scrollOptions"
		],
		events: ["scroll", "scrollGroup"],
		dragRelation: "strong",
		dragStart(moveable, e) {
			const { scrollContainer = moveable.getContainer(), scrollOptions } = moveable.props;
			const dragScroll = new DragScroll();
			const scrollContainerElement = getRefTarget(scrollContainer, true);
			e.datas.dragScroll = dragScroll;
			moveable.state.dragScroll = dragScroll;
			const gestoName = e.isControl ? "controlGesto" : "targetGesto";
			const targets = e.targets;
			dragScroll.on("scroll", ({ container, direction }) => {
				const params = fillParams(moveable, e, {
					scrollContainer: container,
					direction
				});
				const eventName = targets ? "onScrollGroup" : "onScroll";
				if (targets) params.targets = targets;
				triggerEvent(moveable, eventName, params);
			}).on("move", ({ offsetX, offsetY, inputEvent }) => {
				moveable[gestoName].scrollBy(offsetX, offsetY, inputEvent.inputEvent, false);
			}).on("scrollDrag", ({ next }) => {
				next(moveable[gestoName].getCurrentEvent());
			});
			dragScroll.dragStart(e, {
				container: scrollContainerElement,
				...scrollOptions
			});
		},
		checkScroll(moveable, e) {
			const dragScroll = e.datas.dragScroll;
			if (!dragScroll) return;
			const { scrollContainer = moveable.getContainer(), scrollThreshold = 0, scrollThrottleTime = 0, getScrollPosition = getDefaultScrollPosition, scrollOptions } = moveable.props;
			dragScroll.drag(e, {
				container: scrollContainer,
				threshold: scrollThreshold,
				throttleTime: scrollThrottleTime,
				getScrollPosition: (ev) => {
					return getScrollPosition({
						scrollContainer: ev.container,
						direction: ev.direction
					});
				},
				...scrollOptions
			});
			return true;
		},
		drag(moveable, e) {
			return this.checkScroll(moveable, e);
		},
		dragEnd(moveable, e) {
			e.datas.dragScroll.dragEnd();
			e.datas.dragScroll = null;
		},
		dragControlStart(moveable, e) {
			return this.dragStart(moveable, {
				...e,
				isControl: true
			});
		},
		dragControl(moveable, e) {
			return this.drag(moveable, e);
		},
		dragControlEnd(moveable, e) {
			return this.dragEnd(moveable, e);
		},
		dragGroupStart(moveable, e) {
			return this.dragStart(moveable, {
				...e,
				targets: moveable.props.targets
			});
		},
		dragGroup(moveable, e) {
			return this.drag(moveable, {
				...e,
				targets: moveable.props.targets
			});
		},
		dragGroupEnd(moveable, e) {
			return this.dragEnd(moveable, {
				...e,
				targets: moveable.props.targets
			});
		},
		dragGroupControlStart(moveable, e) {
			return this.dragStart(moveable, {
				...e,
				targets: moveable.props.targets,
				isControl: true
			});
		},
		dragGroupControl(moveable, e) {
			return this.drag(moveable, {
				...e,
				targets: moveable.props.targets
			});
		},
		dragGroupControEnd(moveable, e) {
			return this.dragEnd(moveable, {
				...e,
				targets: moveable.props.targets
			});
		},
		unset(moveable) {
			const state = moveable.state;
			state.dragScroll?.dragEnd();
			state.dragScroll = null;
		}
	};
	/**
	* When the drag cursor leaves the scrollContainer, the `scroll` event occur to scroll.
	* @memberof Moveable.Scrollable
	* @event scroll
	* @param {Moveable.Scrollable.OnScroll} - Parameters for the `scroll` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: document.querySelector(".target"),
	* });
	* moveable.on("scroll", ({ scrollContainer, direction }) => {
	*   scrollContainer.scrollLeft += direction[0] * 10;
	*   scrollContainer.scrollTop += direction[1] * 10;
	* });
	*/
	/**
	* When the drag cursor leaves the scrollContainer, the `scrollGroup` event occur to scroll in group.
	* @memberof Moveable.Scrollable
	* @event scrollGroup
	* @param {Moveable.Scrollable.OnScrollGroup} - Parameters for the `scrollGroup` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	* });
	* moveable.on("scroll", ({ scrollContainer, direction }) => {
	*   scrollContainer.scrollLeft += direction[0] * 10;
	*   scrollContainer.scrollTop += direction[1] * 10;
	* });
	*/
	var Default_default = {
		name: "",
		props: [
			"target",
			"dragTargetSelf",
			"dragTarget",
			"dragContainer",
			"container",
			"warpSelf",
			"rootContainer",
			"useResizeObserver",
			"useMutationObserver",
			"zoom",
			"dragFocusedInput",
			"transformOrigin",
			"ables",
			"className",
			"pinchThreshold",
			"pinchOutside",
			"triggerAblesSimultaneously",
			"checkInput",
			"cspNonce",
			"translateZ",
			"hideDefaultLines",
			"props",
			"flushSync",
			"stopPropagation",
			"preventClickEventOnDrag",
			"preventClickDefault",
			"viewContainer",
			"persistData",
			"useAccuratePosition",
			"firstRenderState",
			"linePadding",
			"controlPadding",
			"preventDefault",
			"preventRightClick",
			"preventWheelClick",
			"requestStyles"
		],
		events: ["changeTargets"]
	};
	var Padding_default = makeAble$1("padding", {
		props: ["padding"],
		render(moveable, React) {
			const props = moveable.props;
			if (props.dragArea) return [];
			const { left, top, right, bottom } = getPaddingBox(props.padding || {});
			const { renderPoses, pos1, pos2, pos3, pos4 } = moveable.getState();
			const poses = [
				pos1,
				pos2,
				pos3,
				pos4
			];
			const paddingDirections = [];
			if (left > 0) paddingDirections.push([0, 2]);
			if (top > 0) paddingDirections.push([0, 1]);
			if (right > 0) paddingDirections.push([1, 3]);
			if (bottom > 0) paddingDirections.push([2, 3]);
			return paddingDirections.map(([dir1, dir2], i) => {
				const paddingPos1 = poses[dir1];
				const paddingPos2 = poses[dir2];
				const paddingPos3 = renderPoses[dir1];
				const paddingPos4 = renderPoses[dir2];
				const h = createWarpMatrix([0, 0], [100, 0], [0, 100], [100, 100], paddingPos1, paddingPos2, paddingPos3, paddingPos4);
				if (!h.length) return;
				return /* @__PURE__ */ React.createElement("div", {
					key: `padding${i}`,
					className: prefix("padding"),
					style: { transform: makeMatrixCSS(h, true) }
				});
			});
		}
	});
	/**
	* Add padding around the target to increase the drag area.
	* @name Moveable#padding
	* @default null
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*  target: document.querySelector(".target"),
	*  padding: { left: 0, top: 0, right: 0, bottom: 0 },
	* });
	* moveable.padding = { left: 10, top: 10, right: 10, bottom: 10 },
	* moveable.updateRect();
	*/
	const RADIUS_DIRECTIONS = [
		"nw",
		"ne",
		"se",
		"sw"
	];
	function calculateRatio(values, size) {
		const sumSize = values[0] + values[1];
		const sumRatio = sumSize > size ? size / sumSize : 1;
		values[0] *= sumRatio;
		values[1] = size - values[1] * sumRatio;
		return values;
	}
	const HORIZONTAL_RADIUS_ORDER = [
		1,
		2,
		5,
		6
	];
	const VERTICAL_RADIUS_ORDER = [
		0,
		3,
		4,
		7
	];
	const HORIZONTAL_RADIUS_DIRECTIONS = [
		1,
		-1,
		-1,
		1
	];
	const VERTICAL_RADIUS_DIRECTIONS = [
		1,
		1,
		-1,
		-1
	];
	function getRadiusStyles(nextPoses, isRelative, width, height, left = 0, top = 0, right = width, bottom = height) {
		const clipStyles = [];
		let isVertical = false;
		const radiusPoses = nextPoses.filter((pos) => !pos.virtual);
		return {
			radiusPoses,
			styles: clipStyles,
			raws: radiusPoses.map((posInfo) => {
				const { horizontal, vertical, pos } = posInfo;
				if (vertical && !isVertical) {
					isVertical = true;
					clipStyles.push("/");
				}
				if (isVertical) {
					const rawPos = Math.max(0, vertical === 1 ? pos[1] - top : bottom - pos[1]);
					clipStyles.push(convertCSSSize(rawPos, height, isRelative));
					return rawPos;
				} else {
					const rawPos = Math.max(0, horizontal === 1 ? pos[0] - left : right - pos[0]);
					clipStyles.push(convertCSSSize(rawPos, width, isRelative));
					return rawPos;
				}
			})
		};
	}
	function getRadiusRange(controlPoses) {
		const horizontalRange = [0, 0];
		const verticalRange = [0, 0];
		const length = controlPoses.length;
		for (let i = 0; i < length; ++i) {
			const clipPose = controlPoses[i];
			if (!clipPose.sub) continue;
			if (clipPose.horizontal) {
				if (horizontalRange[1] === 0) horizontalRange[0] = i;
				horizontalRange[1] = i - horizontalRange[0] + 1;
				verticalRange[0] = i + 1;
			}
			if (clipPose.vertical) {
				if (verticalRange[1] === 0) verticalRange[0] = i;
				verticalRange[1] = i - verticalRange[0] + 1;
			}
		}
		return {
			horizontalRange,
			verticalRange
		};
	}
	function getRadiusValues(values, width, height, left, top, minCounts = [0, 0], full = false) {
		const splitIndex = values.indexOf("/");
		const splitLength = (splitIndex > -1 ? values.slice(0, splitIndex) : values).length;
		const horizontalValues = values.slice(0, splitLength);
		const verticalValues = values.slice(splitLength + 1);
		const horizontalValuesLength = horizontalValues.length;
		const verticalValuesLength = verticalValues.length;
		const hasVerticalValues = verticalValuesLength > 0;
		const [nwValue = "0px", neValue = nwValue, seValue = nwValue, swValue = neValue] = horizontalValues;
		const [wnValue = nwValue, enValue = hasVerticalValues ? wnValue : neValue, esValue = hasVerticalValues ? wnValue : seValue, wsValue = hasVerticalValues ? enValue : swValue] = verticalValues;
		const horizontalRawPoses = [
			nwValue,
			neValue,
			seValue,
			swValue
		].map((pos) => convertUnitSize(pos, width));
		const verticalRawPoses = [
			wnValue,
			enValue,
			esValue,
			wsValue
		].map((pos) => convertUnitSize(pos, height));
		const horizontalPoses = horizontalRawPoses.slice();
		const verticalPoses = verticalRawPoses.slice();
		[horizontalPoses[0], horizontalPoses[1]] = calculateRatio([horizontalPoses[0], horizontalPoses[1]], width);
		[horizontalPoses[3], horizontalPoses[2]] = calculateRatio([horizontalPoses[3], horizontalPoses[2]], width);
		[verticalPoses[0], verticalPoses[3]] = calculateRatio([verticalPoses[0], verticalPoses[3]], height);
		[verticalPoses[1], verticalPoses[2]] = calculateRatio([verticalPoses[1], verticalPoses[2]], height);
		const nextHorizontalPoses = full ? horizontalPoses : horizontalPoses.slice(0, Math.max(minCounts[0], horizontalValuesLength));
		const nextVerticalPoses = full ? verticalPoses : verticalPoses.slice(0, Math.max(minCounts[1], verticalValuesLength));
		return [...nextHorizontalPoses.map((pos, i) => {
			const direction = RADIUS_DIRECTIONS[i];
			return {
				virtual: i >= horizontalValuesLength,
				horizontal: HORIZONTAL_RADIUS_DIRECTIONS[i],
				vertical: 0,
				pos: [left + pos, top + (VERTICAL_RADIUS_DIRECTIONS[i] === -1 ? height : 0)],
				sub: true,
				raw: horizontalRawPoses[i],
				direction
			};
		}), ...nextVerticalPoses.map((pos, i) => {
			const direction = RADIUS_DIRECTIONS[i];
			return {
				virtual: i >= verticalValuesLength,
				horizontal: 0,
				vertical: VERTICAL_RADIUS_DIRECTIONS[i],
				pos: [left + (HORIZONTAL_RADIUS_DIRECTIONS[i] === -1 ? width : 0), top + pos],
				sub: true,
				raw: verticalRawPoses[i],
				direction
			};
		})];
	}
	function removeRadiusPos(controlPoses, poses, index, startIndex, length = poses.length) {
		const { horizontalRange, verticalRange } = getRadiusRange(controlPoses.slice(startIndex));
		const radiuslIndex = index - startIndex;
		let deleteCount;
		if (radiuslIndex === 0) deleteCount = length;
		else if (radiuslIndex > 0 && radiuslIndex < horizontalRange[1]) deleteCount = horizontalRange[1] - radiuslIndex;
		else if (radiuslIndex >= verticalRange[0]) deleteCount = verticalRange[0] + verticalRange[1] - radiuslIndex;
		else return;
		controlPoses.splice(index, deleteCount);
		poses.splice(index, deleteCount);
	}
	function addRadiusPos(controlPoses, poses, startIndex, horizontalIndex, verticalIndex, distX, distY, right, bottom, left = 0, top = 0) {
		const { horizontalRange, verticalRange } = getRadiusRange(controlPoses.slice(startIndex));
		if (horizontalIndex > -1) {
			const radiusX = HORIZONTAL_RADIUS_DIRECTIONS[horizontalIndex] === 1 ? distX - left : right - distX;
			for (let i = horizontalRange[1]; i <= horizontalIndex; ++i) {
				const y = VERTICAL_RADIUS_DIRECTIONS[i] === 1 ? top : bottom;
				let x = 0;
				if (horizontalIndex === i) x = distX;
				else if (i === 0) x = left + radiusX;
				else if (HORIZONTAL_RADIUS_DIRECTIONS[i] === -1) x = right - (poses[startIndex][0] - left);
				controlPoses.splice(startIndex + i, 0, {
					horizontal: HORIZONTAL_RADIUS_DIRECTIONS[i],
					vertical: 0,
					pos: [x, y]
				});
				poses.splice(startIndex + i, 0, [x, y]);
				if (i === 0) break;
			}
		} else if (verticalIndex > -1) {
			const radiusY = VERTICAL_RADIUS_DIRECTIONS[verticalIndex] === 1 ? distY - top : bottom - distY;
			if (horizontalRange[1] === 0 && verticalRange[1] === 0) {
				const pos = [left + radiusY, top];
				controlPoses.push({
					horizontal: HORIZONTAL_RADIUS_DIRECTIONS[0],
					vertical: 0,
					pos
				});
				poses.push(pos);
			}
			const startVerticalIndex = verticalRange[0];
			for (let i = verticalRange[1]; i <= verticalIndex; ++i) {
				const x = HORIZONTAL_RADIUS_DIRECTIONS[i] === 1 ? left : right;
				let y = 0;
				if (verticalIndex === i) y = distY;
				else if (i === 0) y = top + radiusY;
				else if (VERTICAL_RADIUS_DIRECTIONS[i] === 1) y = poses[startIndex + startVerticalIndex][1];
				else if (VERTICAL_RADIUS_DIRECTIONS[i] === -1) y = bottom - (poses[startIndex + startVerticalIndex][1] - top);
				controlPoses.push({
					horizontal: 0,
					vertical: VERTICAL_RADIUS_DIRECTIONS[i],
					pos: [x, y]
				});
				poses.push([x, y]);
				if (i === 0) break;
			}
		}
	}
	function splitRadiusPoses(controlPoses, raws = controlPoses.map((pos) => pos.raw)) {
		return {
			horizontals: controlPoses.map((pos, i) => pos.horizontal ? raws[i] : null).filter((pos) => pos != null),
			verticals: controlPoses.map((pos, i) => pos.vertical ? raws[i] : null).filter((pos) => pos != null)
		};
	}
	const CLIP_DIRECTIONS = [[
		0,
		-1,
		"n"
	], [
		1,
		0,
		"e"
	]];
	const CLIP_RECT_DIRECTIONS = [
		[
			-1,
			-1,
			"nw"
		],
		[
			0,
			-1,
			"n"
		],
		[
			1,
			-1,
			"ne"
		],
		[
			1,
			0,
			"e"
		],
		[
			1,
			1,
			"se"
		],
		[
			0,
			1,
			"s"
		],
		[
			-1,
			1,
			"sw"
		],
		[
			-1,
			0,
			"w"
		]
	];
	function getClipStyles(moveable, clipPath, poses) {
		const { clipRelative } = moveable.props;
		const { width, height } = moveable.state;
		const { type: clipType, poses: clipPoses } = clipPath;
		const isRect = clipType === "rect";
		const isCircle = clipType === "circle";
		if (clipType === "polygon") return poses.map((pos) => `${convertCSSSize(pos[0], width, clipRelative)} ${convertCSSSize(pos[1], height, clipRelative)}`);
		else if (isRect || clipType === "inset") {
			const top = poses[1][1];
			const right = poses[3][0];
			const left = poses[7][0];
			const bottom = poses[5][1];
			if (isRect) return [
				top,
				right,
				bottom,
				left
			].map((pos) => `${pos}px`);
			const clipStyles = [
				top,
				width - right,
				height - bottom,
				left
			].map((pos, i) => convertCSSSize(pos, i % 2 ? width : height, clipRelative));
			if (poses.length > 8) {
				const [subWidth, subHeight] = minus(poses[4], poses[0]);
				clipStyles.push("round", ...getRadiusStyles(clipPoses.slice(8).map((info, i) => {
					return {
						...info,
						pos: poses[i]
					};
				}), clipRelative, subWidth, subHeight, left, top, right, bottom).styles);
			}
			return clipStyles;
		} else if (isCircle || clipType === "ellipse") {
			const center = poses[0];
			const ry = convertCSSSize(abs(poses[1][1] - center[1]), isCircle ? Math.sqrt((width * width + height * height) / 2) : height, clipRelative);
			const clipStyles = isCircle ? [ry] : [convertCSSSize(abs(poses[2][0] - center[0]), width, clipRelative), ry];
			clipStyles.push("at", convertCSSSize(center[0], width, clipRelative), convertCSSSize(center[1], height, clipRelative));
			return clipStyles;
		}
	}
	function getRectPoses(top, right, bottom, left) {
		const xs = [
			left,
			(left + right) / 2,
			right
		];
		const ys = [
			top,
			(top + bottom) / 2,
			bottom
		];
		return CLIP_RECT_DIRECTIONS.map(([dirx, diry, dir]) => {
			const x = xs[dirx + 1];
			const y = ys[diry + 1];
			return {
				vertical: abs(diry),
				horizontal: abs(dirx),
				direction: dir,
				pos: [x, y]
			};
		});
	}
	function getControlSize(controlPoses) {
		const xRange = [Infinity, -Infinity];
		const yRange = [Infinity, -Infinity];
		controlPoses.forEach(({ pos }) => {
			xRange[0] = Math.min(xRange[0], pos[0]);
			xRange[1] = Math.max(xRange[1], pos[0]);
			yRange[0] = Math.min(yRange[0], pos[1]);
			yRange[1] = Math.max(yRange[1], pos[1]);
		});
		return [abs(xRange[1] - xRange[0]), abs(yRange[1] - yRange[0])];
	}
	function getClipPath(target, width, height, defaultClip, customClip) {
		if (!target) return;
		let clipText = customClip;
		if (!clipText) {
			const getStyle = getCachedStyle(target);
			const clipPath = getStyle("clipPath");
			clipText = clipPath !== "none" ? clipPath : getStyle("clip");
		}
		if (!clipText || clipText === "none" || clipText === "auto") {
			clipText = defaultClip;
			if (!clipText) return;
		}
		const { prefix: clipPrefix = clipText, value = "" } = splitBracket(clipText);
		const isCircle = clipPrefix === "circle";
		let splitter = " ";
		if (clipPrefix === "polygon") {
			const values = splitComma(value || `0% 0%, 100% 0%, 100% 100%, 0% 100%`);
			splitter = ",";
			const poses = values.map((pos) => {
				const [xPos, yPos] = pos.split(" ");
				return {
					vertical: 1,
					horizontal: 1,
					pos: [convertUnitSize(xPos, width), convertUnitSize(yPos, height)]
				};
			});
			const minMaxs = getMinMaxs(poses.map((pos) => pos.pos));
			return {
				type: clipPrefix,
				clipText,
				poses,
				splitter,
				left: minMaxs.minX,
				right: minMaxs.maxX,
				top: minMaxs.minY,
				bottom: minMaxs.maxY
			};
		} else if (isCircle || clipPrefix === "ellipse") {
			let xPos;
			let yPos;
			let radiusX = 0;
			let radiusY = 0;
			const values = splitSpace(value);
			if (isCircle) {
				let radius;
				[radius = "50%", , xPos = "50%", yPos = "50%"] = values;
				radiusX = convertUnitSize(radius, Math.sqrt((width * width + height * height) / 2));
				radiusY = radiusX;
			} else {
				let xRadius;
				let yRadius;
				[xRadius = "50%", yRadius = "50%", , xPos = "50%", yPos = "50%"] = values;
				radiusX = convertUnitSize(xRadius, width);
				radiusY = convertUnitSize(yRadius, height);
			}
			const centerPos = [convertUnitSize(xPos, width), convertUnitSize(yPos, height)];
			const poses = [{
				vertical: 1,
				horizontal: 1,
				pos: centerPos,
				direction: "nesw"
			}, ...CLIP_DIRECTIONS.slice(0, isCircle ? 1 : 2).map((dir) => ({
				vertical: abs(dir[1]),
				horizontal: dir[0],
				direction: dir[2],
				sub: true,
				pos: [centerPos[0] + dir[0] * radiusX, centerPos[1] + dir[1] * radiusY]
			}))];
			return {
				type: clipPrefix,
				clipText,
				radiusX,
				radiusY,
				left: centerPos[0] - radiusX,
				top: centerPos[1] - radiusY,
				right: centerPos[0] + radiusX,
				bottom: centerPos[1] + radiusY,
				poses,
				splitter
			};
		} else if (clipPrefix === "inset") {
			const values = splitSpace(value || "0 0 0 0");
			const roundIndex = values.indexOf("round");
			const rectLength = (roundIndex > -1 ? values.slice(0, roundIndex) : values).length;
			const radiusValues = values.slice(rectLength + 1);
			const [topValue, rightValue = topValue, bottomValue = topValue, leftValue = rightValue] = values.slice(0, rectLength);
			const [top, bottom] = [topValue, bottomValue].map((pos) => convertUnitSize(pos, height));
			const [left, right] = [leftValue, rightValue].map((pos) => convertUnitSize(pos, width));
			const nextRight = width - right;
			const nextBottom = height - bottom;
			const radiusPoses = getRadiusValues(radiusValues, nextRight - left, nextBottom - top, left, top);
			const poses = [...getRectPoses(top, nextRight, nextBottom, left), ...radiusPoses];
			return {
				type: "inset",
				clipText,
				poses,
				top,
				left,
				right: nextRight,
				bottom: nextBottom,
				radius: radiusValues,
				splitter
			};
		} else if (clipPrefix === "rect") {
			const values = splitComma(value || `0px, ${width}px, ${height}px, 0px`);
			splitter = ",";
			const [top, right, bottom, left] = values.map((pos) => {
				const { value: posValue } = splitUnit(pos);
				return posValue;
			});
			const poses = getRectPoses(top, right, bottom, left);
			return {
				type: "rect",
				clipText,
				poses,
				top,
				right,
				bottom,
				left,
				values,
				splitter
			};
		}
	}
	function moveControlPos(controlPoses, index, dist, isRect, keepRatio) {
		const { direction, sub } = controlPoses[index];
		const dists = controlPoses.map(() => [0, 0]);
		const directions = direction ? direction.split("") : [];
		if (isRect && index < 8) {
			const verticalDirections = directions.filter((dir) => dir === "w" || dir === "e");
			const horizontalDirections = directions.filter((dir) => dir === "n" || dir === "s");
			const verticalDirection = verticalDirections[0];
			const horizontalDirection = horizontalDirections[0];
			dists[index] = dist;
			const [width, height] = getControlSize(controlPoses);
			const ratio = width && height ? width / height : 0;
			if (ratio && keepRatio) {
				const fixedPosition = controlPoses[(index + 4) % 8].pos;
				const sizeDirection = [0, 0];
				if (direction.indexOf("w") > -1) sizeDirection[0] = -1;
				else if (direction.indexOf("e") > -1) sizeDirection[0] = 1;
				if (direction.indexOf("n") > -1) sizeDirection[1] = -1;
				else if (direction.indexOf("s") > -1) sizeDirection[1] = 1;
				const nextDist = getSizeDistByDist([width, height], dist, ratio, sizeDirection, true);
				const nextWidth = width + nextDist[0];
				const nextHeight = height + nextDist[1];
				let top = fixedPosition[1];
				let bottom = fixedPosition[1];
				let left = fixedPosition[0];
				let right = fixedPosition[0];
				if (sizeDirection[0] === -1) left = right - nextWidth;
				else if (sizeDirection[0] === 1) right = left + nextWidth;
				else {
					left = left - nextWidth / 2;
					right = right + nextWidth / 2;
				}
				if (sizeDirection[1] === -1) top = bottom - nextHeight;
				else if (sizeDirection[1] === 1) bottom = top + nextHeight;
				else {
					top = bottom - nextHeight / 2;
					bottom = top + nextHeight;
				}
				const nextControlPoses = getRectPoses(top, right, bottom, left);
				controlPoses.forEach((controlPose, i) => {
					dists[i][0] = nextControlPoses[i].pos[0] - controlPose.pos[0];
					dists[i][1] = nextControlPoses[i].pos[1] - controlPose.pos[1];
				});
			} else {
				controlPoses.forEach((controlPose, i) => {
					const { direction: controlDir } = controlPose;
					if (!controlDir) return;
					if (controlDir.indexOf(verticalDirection) > -1) dists[i][0] = dist[0];
					if (controlDir.indexOf(horizontalDirection) > -1) dists[i][1] = dist[1];
				});
				if (verticalDirection) {
					dists[1][0] = dist[0] / 2;
					dists[5][0] = dist[0] / 2;
				}
				if (horizontalDirection) {
					dists[3][1] = dist[1] / 2;
					dists[7][1] = dist[1] / 2;
				}
			}
		} else if (direction && !sub) directions.forEach((dir) => {
			const isVertical = dir === "n" || dir === "s";
			controlPoses.forEach((controlPose, i) => {
				const { direction: dirDir, horizontal: dirHorizontal, vertical: dirVertical } = controlPose;
				if (!dirDir || dirDir.indexOf(dir) === -1) return;
				dists[i] = [isVertical || !dirHorizontal ? 0 : dist[0], !isVertical || !dirVertical ? 0 : dist[1]];
			});
		});
		else dists[index] = dist;
		return dists;
	}
	function addClipPath(moveable, e) {
		const [distX, distY] = calculatePointerDist(moveable, e);
		const { clipPath, clipIndex } = e.datas;
		const { type: clipType, poses: clipPoses, splitter } = clipPath;
		const poses = clipPoses.map((pos) => pos.pos);
		if (clipType === "polygon") poses.splice(clipIndex, 0, [distX, distY]);
		else if (clipType === "inset") {
			const horizontalIndex = HORIZONTAL_RADIUS_ORDER.indexOf(clipIndex);
			const verticalIndex = VERTICAL_RADIUS_ORDER.indexOf(clipIndex);
			const length = clipPoses.length;
			addRadiusPos(clipPoses, poses, 8, horizontalIndex, verticalIndex, distX, distY, poses[4][0], poses[4][1], poses[0][0], poses[0][1]);
			if (length === clipPoses.length) return;
		} else return;
		const clipStyles = getClipStyles(moveable, clipPath, poses);
		const clipStyle = `${clipType}(${clipStyles.join(splitter)})`;
		triggerEvent(moveable, "onClip", fillParams(moveable, e, {
			clipEventType: "added",
			clipType,
			poses,
			clipStyles,
			clipStyle,
			distX: 0,
			distY: 0,
			...fillCSSObject({ clipPath: clipStyle }, e)
		}));
	}
	function removeClipPath(moveable, e) {
		const { clipPath, clipIndex } = e.datas;
		const { type: clipType, poses: clipPoses, splitter } = clipPath;
		const poses = clipPoses.map((pos) => pos.pos);
		const length = poses.length;
		if (clipType === "polygon") {
			clipPoses.splice(clipIndex, 1);
			poses.splice(clipIndex, 1);
		} else if (clipType === "inset") {
			if (clipIndex < 8) return;
			removeRadiusPos(clipPoses, poses, clipIndex, 8, length);
			if (length === clipPoses.length) return;
		} else return;
		const clipStyles = getClipStyles(moveable, clipPath, poses);
		const clipStyle = `${clipType}(${clipStyles.join(splitter)})`;
		triggerEvent(moveable, "onClip", fillParams(moveable, e, {
			clipEventType: "removed",
			clipType,
			poses,
			clipStyles,
			clipStyle,
			distX: 0,
			distY: 0,
			...fillCSSObject({ clipPath: clipStyle }, e)
		}));
	}
	/**
	* @namespace Moveable.Clippable
	* @description Whether to clip the target.
	*/
	var Clippable_default = {
		name: "clippable",
		props: [
			"clippable",
			"defaultClipPath",
			"customClipPath",
			"keepRatio",
			"clipRelative",
			"clipArea",
			"dragWithClip",
			"clipTargetBounds",
			"clipVerticalGuidelines",
			"clipHorizontalGuidelines",
			"clipSnapThreshold"
		],
		events: [
			"clipStart",
			"clip",
			"clipEnd"
		],
		css: [
			`.control.clip-control {
background: #6d6;
cursor: pointer;
}
.control.clip-control.clip-radius {
background: #d66;
}
.line.clip-line {
background: #6e6;
cursor: move;
z-index: 1;
}
.clip-area {
position: absolute;
top: 0;
left: 0;
}
.clip-ellipse {
position: absolute;
cursor: move;
border: 1px solid #6d6;
border: var(--zoompx) solid #6d6;
border-radius: 50%;
transform-origin: 0px 0px;
}`,
			`:host {
--bounds-color: #d66;
}`,
			`.guideline {
pointer-events: none;
z-index: 2;
}`,
			`.line.guideline.bounds {
background: #d66;
background: var(--bounds-color);
}`
		],
		render(moveable, React) {
			const { customClipPath, defaultClipPath, clipArea, zoom, groupable } = moveable.props;
			const { target, width, height, allMatrix, is3d, left, top, pos1, pos2, pos3, pos4, clipPathState, snapBoundInfos, rotation: rotationRad } = moveable.getState();
			if (!target || groupable) return [];
			const clipPath = getClipPath(target, width, height, defaultClipPath || "inset", clipPathState || customClipPath);
			if (!clipPath) return [];
			const n = is3d ? 4 : 3;
			const type = clipPath.type;
			const poses = clipPath.poses.map((pos) => {
				const calculatedPos = calculatePosition(allMatrix, pos.pos, n);
				return [calculatedPos[0] - left, calculatedPos[1] - top];
			});
			let lines = [];
			const isRect = type === "rect";
			const isInset = type === "inset";
			const isPolygon = type === "polygon";
			if (isRect || isInset || isPolygon) {
				const linePoses = isInset ? poses.slice(0, 8) : poses;
				lines = linePoses.map((to, i) => {
					const from = i === 0 ? linePoses[linePoses.length - 1] : linePoses[i - 1];
					const rad = getRad$1(from, to);
					const dist = getDiagonalSize(from, to);
					return /* @__PURE__ */ React.createElement("div", {
						key: `clipLine${i}`,
						className: prefix("line", "clip-line", "snap-control"),
						"data-clip-index": i,
						style: {
							width: `${dist}px`,
							transform: `translate(${from[0]}px, ${from[1]}px) rotate(${rad}rad) scaleY(${zoom})`
						}
					});
				});
			}
			const controls = poses.map((pos, i) => {
				return /* @__PURE__ */ React.createElement("div", {
					key: `clipControl${i}`,
					className: prefix("control", "clip-control", "snap-control"),
					"data-clip-index": i,
					style: { transform: `translate(${pos[0]}px, ${pos[1]}px) rotate(${rotationRad}rad) scale(${zoom})` }
				});
			});
			if (isInset) controls.push(...poses.slice(8).map((pos, i) => {
				return /* @__PURE__ */ React.createElement("div", {
					key: `clipRadiusControl${i}`,
					className: prefix("control", "clip-control", "clip-radius", "snap-control"),
					"data-clip-index": 8 + i,
					style: { transform: `translate(${pos[0]}px, ${pos[1]}px) rotate(${rotationRad}rad) scale(${zoom})` }
				});
			}));
			if (type === "circle" || type === "ellipse") {
				const { left: clipLeft, top: clipTop, radiusX, radiusY } = clipPath;
				const [distLeft, distTop] = minus(calculatePosition(allMatrix, [clipLeft, clipTop], n), calculatePosition(allMatrix, [0, 0], n));
				let ellipseClipPath = "none";
				if (!clipArea) {
					const piece = Math.max(10, radiusX / 5, radiusY / 5);
					const areaPoses = [];
					for (let i = 0; i <= piece; ++i) {
						const rad = Math.PI * 2 / piece * i;
						areaPoses.push([radiusX + (radiusX - zoom) * Math.cos(rad), radiusY + (radiusY - zoom) * Math.sin(rad)]);
					}
					areaPoses.push([radiusX, -2]);
					areaPoses.push([-2, -2]);
					areaPoses.push([-2, radiusY * 2 + 2]);
					areaPoses.push([radiusX * 2 + 2, radiusY * 2 + 2]);
					areaPoses.push([radiusX * 2 + 2, -2]);
					areaPoses.push([radiusX, -2]);
					ellipseClipPath = `polygon(${areaPoses.map((pos) => `${pos[0]}px ${pos[1]}px`).join(", ")})`;
				}
				controls.push(/* @__PURE__ */ React.createElement("div", {
					key: "clipEllipse",
					className: prefix("clip-ellipse", "snap-control"),
					style: {
						width: `${radiusX * 2}px`,
						height: `${radiusY * 2}px`,
						clipPath: ellipseClipPath,
						transform: `translate(${-left + distLeft}px, ${-top + distTop}px) ${makeMatrixCSS(allMatrix)}`
					}
				}));
			}
			if (clipArea) {
				const { width: allWidth, height: allHeight, left: allLeft, top: allTop } = getRect([
					pos1,
					pos2,
					pos3,
					pos4,
					...poses
				]);
				if (isPolygon || isRect || isInset) {
					const areaPoses = isInset ? poses.slice(0, 8) : poses;
					controls.push(/* @__PURE__ */ React.createElement("div", {
						key: "clipArea",
						className: prefix("clip-area", "snap-control"),
						style: {
							width: `${allWidth}px`,
							height: `${allHeight}px`,
							transform: `translate(${allLeft}px, ${allTop}px)`,
							clipPath: `polygon(${areaPoses.map((pos) => `${pos[0] - allLeft}px ${pos[1] - allTop}px`).join(", ")})`
						}
					}));
				}
			}
			if (snapBoundInfos) ["vertical", "horizontal"].forEach((directionType) => {
				const info = snapBoundInfos[directionType];
				const isHorizontal = directionType === "horizontal";
				if (info.isSnap) lines.push(...info.snap.posInfos.map(({ pos }, i) => {
					return renderLine(React, "", minus(calculatePosition(allMatrix, isHorizontal ? [0, pos] : [pos, 0], n), [left, top]), minus(calculatePosition(allMatrix, isHorizontal ? [width, pos] : [pos, height], n), [left, top]), zoom, `clip${directionType}snap${i}`, "guideline");
				}));
				if (info.isBound) lines.push(...info.bounds.map(({ pos }, i) => {
					return renderLine(React, "", minus(calculatePosition(allMatrix, isHorizontal ? [0, pos] : [pos, 0], n), [left, top]), minus(calculatePosition(allMatrix, isHorizontal ? [width, pos] : [pos, height], n), [left, top]), zoom, `clip${directionType}bounds${i}`, "guideline", "bounds", "bold");
				}));
			});
			return [...controls, ...lines];
		},
		dragControlCondition(moveable, e) {
			return e.inputEvent && (e.inputEvent.target.getAttribute("class") || "").indexOf("clip") > -1;
		},
		dragStart(moveable, e) {
			const { dragWithClip = true } = moveable.props;
			if (dragWithClip) return false;
			return this.dragControlStart(moveable, e);
		},
		drag(moveable, e) {
			return this.dragControl(moveable, {
				...e,
				isDragTarget: true
			});
		},
		dragEnd(moveable, e) {
			return this.dragControlEnd(moveable, e);
		},
		dragControlStart(moveable, e) {
			const state = moveable.state;
			const { defaultClipPath, customClipPath } = moveable.props;
			const { target, width, height } = state;
			const inputTarget = e.inputEvent ? e.inputEvent.target : null;
			const className = inputTarget && inputTarget.getAttribute("class") || "";
			const datas = e.datas;
			const clipPath = getClipPath(target, width, height, defaultClipPath || "inset", customClipPath);
			if (!clipPath) return false;
			const { clipText, type, poses } = clipPath;
			if (triggerEvent(moveable, "onClipStart", fillParams(moveable, e, {
				clipType: type,
				clipStyle: clipText,
				poses: poses.map((pos) => pos.pos)
			})) === false) {
				datas.isClipStart = false;
				return false;
			}
			datas.isControl = className && className.indexOf("clip-control") > -1;
			datas.isLine = className.indexOf("clip-line") > -1;
			datas.isArea = className.indexOf("clip-area") > -1 || className.indexOf("clip-ellipse") > -1;
			datas.clipIndex = inputTarget ? parseInt(inputTarget.getAttribute("data-clip-index"), 10) : -1;
			datas.clipPath = clipPath;
			datas.isClipStart = true;
			state.clipPathState = clipText;
			setDragStart(moveable, e);
			return true;
		},
		dragControl(moveable, e) {
			const { datas, originalDatas, isDragTarget } = e;
			if (!datas.isClipStart) return false;
			const { isControl, isLine, isArea, clipIndex, clipPath } = datas;
			if (!clipPath) return false;
			const props = getProps(moveable.props, "clippable");
			const { keepRatio } = props;
			let distX = 0;
			let distY = 0;
			const originalDraggable = originalDatas.draggable;
			const originalDist = getDragDist(e);
			if (isDragTarget && originalDraggable) [distX, distY] = originalDraggable.prevBeforeDist;
			else [distX, distY] = originalDist;
			const firstDist = [distX, distY];
			const state = moveable.state;
			const { width, height } = state;
			const isDragWithTarget = !isArea && !isControl && !isLine;
			const { type: clipType, poses: clipPoses, splitter } = clipPath;
			const poses = clipPoses.map((pos) => pos.pos);
			if (isDragWithTarget) {
				distX = -distX;
				distY = -distY;
			}
			const isAll = !isControl || clipPoses[clipIndex].direction === "nesw";
			const isRect = clipType === "inset" || clipType === "rect";
			let dists = clipPoses.map(() => [0, 0]);
			if (isControl && !isAll) {
				const { horizontal, vertical } = clipPoses[clipIndex];
				dists = moveControlPos(clipPoses, clipIndex, [distX * abs(horizontal), distY * abs(vertical)], isRect, keepRatio);
			} else if (isAll) dists = poses.map(() => [distX, distY]);
			const nextPoses = poses.map((pos, i) => plus(pos, dists[i]));
			const guidePoses = [...nextPoses];
			state.snapBoundInfos = null;
			const isCircle = clipPath.type === "circle";
			const isEllipse = clipPath.type === "ellipse";
			if (isCircle || isEllipse) {
				const guideRect = getRect(nextPoses);
				const ry = abs(guideRect.bottom - guideRect.top);
				const rx = abs(isEllipse ? guideRect.right - guideRect.left : ry);
				const bottom = nextPoses[0][1] + ry;
				const left = nextPoses[0][0] - rx;
				const right = nextPoses[0][0] + rx;
				if (isCircle) {
					guidePoses.push([right, guideRect.bottom]);
					dists.push([1, 0]);
				}
				guidePoses.push([guideRect.left, bottom]);
				dists.push([0, 1]);
				guidePoses.push([left, guideRect.bottom]);
				dists.push([1, 0]);
			}
			const guidelines = getDefaultGuidelines((props.clipHorizontalGuidelines || []).map((v) => convertUnitSize(`${v}`, height)), (props.clipVerticalGuidelines || []).map((v) => convertUnitSize(`${v}`, width)), width, height);
			let guideXPoses;
			let guideYPoses;
			if (isCircle || isEllipse) {
				guideXPoses = [guidePoses[4][0], guidePoses[2][0]];
				guideYPoses = [guidePoses[1][1], guidePoses[3][1]];
			} else if (isRect) {
				const rectPoses = [
					guidePoses[0],
					guidePoses[2],
					guidePoses[4],
					guidePoses[6]
				];
				const rectDists = [
					dists[0],
					dists[2],
					dists[4],
					dists[6]
				];
				guideXPoses = rectPoses.filter((_, i) => rectDists[i][0]).map((pos) => pos[0]);
				guideYPoses = rectPoses.filter((_, i) => rectDists[i][1]).map((pos) => pos[1]);
			} else {
				guideXPoses = guidePoses.filter((_, i) => dists[i][0]).map((pos) => pos[0]);
				guideYPoses = guidePoses.filter((_, i) => dists[i][1]).map((pos) => pos[1]);
			}
			const boundDelta = [0, 0];
			const { horizontal: horizontalSnapInfo, vertical: verticalSnapInfo } = checkSnapBounds(guidelines, props.clipTargetBounds && {
				left: 0,
				top: 0,
				right: width,
				bottom: height
			}, guideXPoses, guideYPoses, 5, 5);
			let snapOffsetY = horizontalSnapInfo.offset;
			let snapOffsetX = verticalSnapInfo.offset;
			if (horizontalSnapInfo.isBound) boundDelta[1] += snapOffsetY;
			if (verticalSnapInfo.isBound) boundDelta[0] += snapOffsetX;
			if ((isEllipse || isCircle) && dists[0][0] === 0 && dists[0][1] === 0) {
				const guideRect = getRect(nextPoses);
				let cy = guideRect.bottom - guideRect.top;
				let cx = isEllipse ? guideRect.right - guideRect.left : cy;
				const distSnapX = verticalSnapInfo.isBound ? abs(snapOffsetX) : verticalSnapInfo.snapIndex === 0 ? -snapOffsetX : snapOffsetX;
				const distSnapY = horizontalSnapInfo.isBound ? abs(snapOffsetY) : horizontalSnapInfo.snapIndex === 0 ? -snapOffsetY : snapOffsetY;
				cx -= distSnapX;
				cy -= distSnapY;
				if (isCircle) {
					cy = checkSnapBoundPriority(verticalSnapInfo, horizontalSnapInfo) > 0 ? cy : cx;
					cx = cy;
				}
				const center = guidePoses[0];
				guidePoses[1][1] = center[1] - cy;
				guidePoses[2][0] = center[0] + cx;
				guidePoses[3][1] = center[1] + cy;
				guidePoses[4][0] = center[0] - cx;
			} else if (isRect && keepRatio && isControl) {
				const [width, height] = getControlSize(clipPoses);
				const ratio = width && height ? width / height : 0;
				const direction = clipPoses[clipIndex].direction || "";
				let top = guidePoses[1][1];
				let bottom = guidePoses[5][1];
				let left = guidePoses[7][0];
				let right = guidePoses[3][0];
				if (abs(snapOffsetY) <= abs(snapOffsetX)) snapOffsetY = sign(snapOffsetY) * abs(snapOffsetX) / ratio;
				else snapOffsetX = sign(snapOffsetX) * abs(snapOffsetY) * ratio;
				if (direction.indexOf("w") > -1) left -= snapOffsetX;
				else if (direction.indexOf("e") > -1) right -= snapOffsetX;
				else {
					left += snapOffsetX / 2;
					right -= snapOffsetX / 2;
				}
				if (direction.indexOf("n") > -1) top -= snapOffsetY;
				else if (direction.indexOf("s") > -1) bottom -= snapOffsetY;
				else {
					top += snapOffsetY / 2;
					bottom -= snapOffsetY / 2;
				}
				const nextControlPoses = getRectPoses(top, right, bottom, left);
				guidePoses.forEach((pos, i) => {
					[pos[0], pos[1]] = nextControlPoses[i].pos;
				});
			} else guidePoses.forEach((pos, j) => {
				const dist = dists[j];
				if (dist[0]) pos[0] -= snapOffsetX;
				if (dist[1]) pos[1] -= snapOffsetY;
			});
			const nextClipStyles = getClipStyles(moveable, clipPath, nextPoses);
			const clipStyle = `${clipType}(${nextClipStyles.join(splitter)})`;
			state.clipPathState = clipStyle;
			if (isCircle || isEllipse) {
				guideXPoses = [guidePoses[4][0], guidePoses[2][0]];
				guideYPoses = [guidePoses[1][1], guidePoses[3][1]];
			} else if (isRect) {
				const rectPoses = [
					guidePoses[0],
					guidePoses[2],
					guidePoses[4],
					guidePoses[6]
				];
				guideXPoses = rectPoses.map((pos) => pos[0]);
				guideYPoses = rectPoses.map((pos) => pos[1]);
			} else {
				guideXPoses = guidePoses.map((pos) => pos[0]);
				guideYPoses = guidePoses.map((pos) => pos[1]);
			}
			state.snapBoundInfos = checkSnapBounds(guidelines, props.clipTargetBounds && {
				left: 0,
				top: 0,
				right: width,
				bottom: height
			}, guideXPoses, guideYPoses, 1, 1);
			if (originalDraggable) {
				const { is3d, allMatrix } = state;
				const n = is3d ? 4 : 3;
				let dragDist = boundDelta;
				if (isDragTarget) dragDist = [firstDist[0] + boundDelta[0] - originalDist[0], firstDist[1] + boundDelta[1] - originalDist[1]];
				originalDraggable.deltaOffset = multiply(allMatrix, [
					dragDist[0],
					dragDist[1],
					0,
					0
				], n);
			}
			triggerEvent(moveable, "onClip", fillParams(moveable, e, {
				clipEventType: "changed",
				clipType,
				poses: nextPoses,
				clipStyle,
				clipStyles: nextClipStyles,
				distX,
				distY,
				...fillCSSObject({ [clipType === "rect" ? "clip" : "clipPath"]: clipStyle }, e)
			}));
			return true;
		},
		dragControlEnd(moveable, e) {
			this.unset(moveable);
			const { isDrag, datas, isDouble } = e;
			const { isLine, isClipStart, isControl } = datas;
			if (!isClipStart) return false;
			triggerEvent(moveable, "onClipEnd", fillEndParams(moveable, e, {}));
			if (isDouble) {
				if (isControl) removeClipPath(moveable, e);
				else if (isLine) addClipPath(moveable, e);
			}
			return isDouble || isDrag;
		},
		unset(moveable) {
			moveable.state.clipPathState = "";
			moveable.state.snapBoundInfos = null;
		}
	};
	/**
	* Whether to clip the target. (default: false)
	* @name Moveable.Clippable#clippable
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     clippable: true,
	*     defaultClipPath: "inset",
	*     customClipPath: "",
	*     clipRelative: false,
	*     clipArea: false,
	*     dragWithClip: true,
	* });
	* moveable.on("clipStart", e => {
	*     console.log(e);
	* }).on("clip", e => {
	*     if (e.clipType === "rect") {
	*         e.target.style.clip = e.clipStyle;
	*     } else {
	*         e.target.style.clipPath = e.clipStyle;
	*     }
	* }).on("clipEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	*  If clippath is not set, the default value can be set. (defaultClipPath < style < customClipPath < dragging clipPath)
	* @name Moveable.Clippable#defaultClipPath
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     clippable: true,
	*     defaultClipPath: "inset",
	*     customClipPath: "",
	*     clipRelative: false,
	*     clipArea: false,
	*     dragWithClip: true,
	* });
	* moveable.on("clipStart", e => {
	*     console.log(e);
	* }).on("clip", e => {
	*     if (e.clipType === "rect") {
	*         e.target.style.clip = e.clipStyle;
	*     } else {
	*         e.target.style.clipPath = e.clipStyle;
	*     }
	* }).on("clipEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* % Can be used instead of the absolute px (`rect` not possible) (default: false)
	* @name Moveable.Clippable#clipRelative
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     clippable: true,
	*     defaultClipPath: "inset",
	*     customClipPath: "",
	*     clipRelative: false,
	*     clipArea: false,
	*     dragWithClip: true,
	* });
	* moveable.on("clipStart", e => {
	*     console.log(e);
	* }).on("clip", e => {
	*     if (e.clipType === "rect") {
	*         e.target.style.clip = e.clipStyle;
	*     } else {
	*         e.target.style.clipPath = e.clipStyle;
	*     }
	* }).on("clipEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* You can force the custom clipPath. (defaultClipPath < style < customClipPath < dragging clipPath)
	* @name Moveable.Clippable#customClipPath
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     clippable: true,
	*     defaultClipPath: "inset",
	*     customClipPath: "",
	*     clipRelative: false,
	*     clipArea: false,
	*     dragWithClip: true,
	* });
	* moveable.on("clipStart", e => {
	*     console.log(e);
	* }).on("clip", e => {
	*     if (e.clipType === "rect") {
	*         e.target.style.clip = e.clipStyle;
	*     } else {
	*         e.target.style.clipPath = e.clipStyle;
	*     }
	* }).on("clipEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* When dragging the target, the clip also moves. (default: true)
	* @name Moveable.Clippable#dragWithClip
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     clippable: true,
	*     defaultClipPath: "inset",
	*     customClipPath: "",
	*     clipRelative: false,
	*     clipArea: false,
	*     dragWithClip: true,
	* });
	* moveable.on("clipStart", e => {
	*     console.log(e);
	* }).on("clip", e => {
	*     if (e.clipType === "rect") {
	*         e.target.style.clip = e.clipStyle;
	*     } else {
	*         e.target.style.clipPath = e.clipStyle;
	*     }
	* }).on("clipEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* You can drag the clip by setting clipArea.
	* @name Moveable.Clippable#clipArea
	* @default false
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     clippable: true,
	*     defaultClipPath: "inset",
	*     customClipPath: "",
	*     clipRelative: false,
	*     clipArea: false,
	*     dragWithClip: true,
	* });
	* moveable.on("clipStart", e => {
	*     console.log(e);
	* }).on("clip", e => {
	*     if (e.clipType === "rect") {
	*         e.target.style.clip = e.clipStyle;
	*     } else {
	*         e.target.style.clipPath = e.clipStyle;
	*     }
	* }).on("clipEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* Whether the clip is bound to the target.
	* @name Moveable.Clippable#clipTargetBounds
	* @default false
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     clippable: true,
	*     defaultClipPath: "inset",
	*     customClipPath: "",
	*     clipRelative: false,
	*     clipArea: false,
	*     dragWithClip: true,
	*     clipTargetBounds: true,
	* });
	* moveable.on("clipStart", e => {
	*     console.log(e);
	* }).on("clip", e => {
	*     if (e.clipType === "rect") {
	*         e.target.style.clip = e.clipStyle;
	*     } else {
	*         e.target.style.clipPath = e.clipStyle;
	*     }
	* }).on("clipEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* Add clip guidelines in the vertical direction.
	* @name Moveable.Clippable#clipVerticalGuidelines
	* @default 0
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     clippable: true,
	*     defaultClipPath: "inset",
	*     customClipPath: "",
	*     clipRelative: false,
	*     clipArea: false,
	*     dragWithClip: true,
	*     clipVerticalGuidelines: [0, 100, 200],
	*     clipHorizontalGuidelines: [0, 100, 200],
	*     clipSnapThreshold: 5,
	* });
	*/
	/**
	* Add clip guidelines in the horizontal direction.
	* @name Moveable.Clippable#clipHorizontalGuidelines
	* @default []
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     clippable: true,
	*     defaultClipPath: "inset",
	*     customClipPath: "",
	*     clipRelative: false,
	*     clipArea: false,
	*     dragWithClip: true,
	*     clipVerticalGuidelines: [0, 100, 200],
	*     clipHorizontalGuidelines: [0, 100, 200],
	*     clipSnapThreshold: 5,
	* });
	*/
	/**
	* istance value that can snap to clip guidelines.
	* @name Moveable.Clippable#clipSnapThreshold
	* @default 5
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     clippable: true,
	*     defaultClipPath: "inset",
	*     customClipPath: "",
	*     clipRelative: false,
	*     clipArea: false,
	*     dragWithClip: true,
	*     clipVerticalGuidelines: [0, 100, 200],
	*     clipHorizontalGuidelines: [0, 100, 200],
	*     clipSnapThreshold: 5,
	* });
	*/
	/**
	* When drag start the clip area or controls, the `clipStart` event is called.
	* @memberof Moveable.Clippable
	* @event clipStart
	* @param {Moveable.Clippable.OnClipStart} - Parameters for the `clipStart` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     clippable: true,
	*     defaultClipPath: "inset",
	*     customClipPath: "",
	*     clipRelative: false,
	*     clipArea: false,
	*     dragWithClip: true,
	* });
	* moveable.on("clipStart", e => {
	*     console.log(e);
	* }).on("clip", e => {
	*     if (e.clipType === "rect") {
	*         e.target.style.clip = e.clipStyle;
	*     } else {
	*         e.target.style.clipPath = e.clipStyle;
	*     }
	* }).on("clipEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* When drag the clip area or controls, the `clip` event is called.
	* @memberof Moveable.Clippable
	* @event clip
	* @param {Moveable.Clippable.OnClip} - Parameters for the `clip` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     clippable: true,
	*     defaultClipPath: "inset",
	*     customClipPath: "",
	*     clipRelative: false,
	*     clipArea: false,
	*     dragWithClip: true,
	* });
	* moveable.on("clipStart", e => {
	*     console.log(e);
	* }).on("clip", e => {
	*     if (e.clipType === "rect") {
	*         e.target.style.clip = e.clipStyle;
	*     } else {
	*         e.target.style.clipPath = e.clipStyle;
	*     }
	* }).on("clipEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* When drag end the clip area or controls, the `clipEnd` event is called.
	* @memberof Moveable.Clippable
	* @event clipEnd
	* @param {Moveable.Clippable.OnClipEnd} - Parameters for the `clipEnd` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     clippable: true,
	*     defaultClipPath: "inset",
	*     customClipPath: "",
	*     clipRelative: false,
	*     clipArea: false,
	*     dragWithClip: true,
	* });
	* moveable.on("clipStart", e => {
	*     console.log(e);
	* }).on("clip", e => {
	*     if (e.clipType === "rect") {
	*         e.target.style.clip = e.clipStyle;
	*     } else {
	*         e.target.style.clipPath = e.clipStyle;
	*     }
	* }).on("clipEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* @namespace OriginDraggable
	* @memberof Moveable
	* @description Whether to drag origin (default: false)
	*/
	var OriginDraggable_default = {
		name: "originDraggable",
		props: ["originDraggable", "originRelative"],
		events: [
			"dragOriginStart",
			"dragOrigin",
			"dragOriginEnd"
		],
		css: [`:host[data-able-origindraggable] .control.origin {
pointer-events: auto;
}`],
		dragControlCondition(_, e) {
			if (e.isRequest) return e.requestAble === "originDraggable";
			return hasClass(e.inputEvent.target, prefix("origin"));
		},
		dragControlStart(moveable, e) {
			const { datas } = e;
			setDragStart(moveable, e);
			const params = fillParams(moveable, e, { dragStart: Draggable_default.dragStart(moveable, new CustomGesto().dragStart([0, 0], e)) });
			const result = triggerEvent(moveable, "onDragOriginStart", params);
			datas.startOrigin = moveable.state.transformOrigin;
			datas.startTargetOrigin = moveable.state.targetOrigin;
			datas.prevOrigin = [0, 0];
			datas.isDragOrigin = true;
			if (result === false) {
				datas.isDragOrigin = false;
				return false;
			}
			return params;
		},
		dragControl(moveable, e) {
			const { datas, isPinch, isRequest } = e;
			if (!datas.isDragOrigin) return false;
			const [distX, distY] = getDragDist(e);
			const { width, height, offsetMatrix, targetMatrix, is3d } = moveable.state;
			const { originRelative = true } = moveable.props;
			const n = is3d ? 4 : 3;
			let dist = [distX, distY];
			if (isRequest) {
				const distOrigin = e.distOrigin;
				if (distOrigin[0] || distOrigin[1]) dist = distOrigin;
			}
			const origin = plus(datas.startOrigin, dist);
			const targetOrigin = plus(datas.startTargetOrigin, dist);
			const delta = minus(dist, datas.prevOrigin);
			const nextMatrix = getNextMatrix(offsetMatrix, targetMatrix, origin, n);
			const rect = moveable.getRect();
			const nextRect = getRect(calculatePoses(nextMatrix, width, height, n));
			const dragDelta = [rect.left - nextRect.left, rect.top - nextRect.top];
			datas.prevOrigin = dist;
			const transformOrigin = [convertCSSSize(targetOrigin[0], width, originRelative), convertCSSSize(targetOrigin[1], height, originRelative)].join(" ");
			const result = Draggable_default.drag(moveable, setCustomDrag(e, moveable.state, dragDelta, !!isPinch, false));
			const params = fillParams(moveable, e, {
				width,
				height,
				origin,
				dist,
				delta,
				transformOrigin,
				drag: result,
				...fillCSSObject({
					transformOrigin,
					transform: result.transform
				}, e),
				afterTransform: result.transform
			});
			triggerEvent(moveable, "onDragOrigin", params);
			return params;
		},
		dragControlEnd(moveable, e) {
			const { datas } = e;
			if (!datas.isDragOrigin) return false;
			triggerEvent(moveable, "onDragOriginEnd", fillEndParams(moveable, e, {}));
			return true;
		},
		dragGroupControlCondition(moveable, e) {
			return this.dragControlCondition(moveable, e);
		},
		dragGroupControlStart(moveable, e) {
			if (!this.dragControlStart(moveable, e)) return false;
			return true;
		},
		dragGroupControl(moveable, e) {
			const params = this.dragControl(moveable, e);
			if (!params) return false;
			moveable.transformOrigin = params.transformOrigin;
			return true;
		},
		/**
		* @method Moveable.OriginDraggable#request
		* @param {object} e - the OriginDraggable's request parameter
		* @param {number} [e.x] - x position
		* @param {number} [e.y] - y position
		* @param {number} [e.deltaX] - x number to move
		* @param {number} [e.deltaY] - y number to move
		* @param {array} [e.deltaOrigin] - left, top number to move transform-origin
		* @param {array} [e.origin] - transform-origin position
		* @param {number} [e.isInstant] - Whether to execute the request instantly
		* @return {Moveable.Requester} Moveable Requester
		* @example
		
		* // Instantly Request (requestStart - request - requestEnd)
		* // Use Relative Value
		* moveable.request("originDraggable", { deltaX: 10, deltaY: 10 }, true);
		* // Use Absolute Value
		* moveable.request("originDraggable", { x: 200, y: 100 }, true);
		* // Use Transform Value
		* moveable.request("originDraggable", { deltaOrigin: [10, 0] }, true);
		* moveable.request("originDraggable", { origin: [100, 0] }, true);
		* // requestStart
		* const requester = moveable.request("originDraggable");
		*
		* // request
		* // Use Relative Value
		* requester.request({ deltaX: 10, deltaY: 10 });
		* requester.request({ deltaX: 10, deltaY: 10 });
		* requester.request({ deltaX: 10, deltaY: 10 });
		* // Use Absolute Value
		* moveable.request("originDraggable", { x: 200, y: 100 });
		* moveable.request("originDraggable", { x: 220, y: 100 });
		* moveable.request("originDraggable", { x: 240, y: 100 });
		*
		* // requestEnd
		* requester.requestEnd();
		*/
		request(moveable) {
			const datas = {};
			const rect = moveable.getRect();
			let distX = 0;
			let distY = 0;
			const transformOrigin = rect.transformOrigin;
			const distOrigin = [0, 0];
			return {
				isControl: true,
				requestStart() {
					return { datas };
				},
				request(e) {
					if ("deltaOrigin" in e) {
						distOrigin[0] += e.deltaOrigin[0];
						distOrigin[1] += e.deltaOrigin[1];
					} else if ("origin" in e) {
						distOrigin[0] = e.origin[0] - transformOrigin[0];
						distOrigin[1] = e.origin[1] - transformOrigin[1];
					} else {
						if ("x" in e) distX = e.x - rect.left;
						else if ("deltaX" in e) distX += e.deltaX;
						if ("y" in e) distY = e.y - rect.top;
						else if ("deltaY" in e) distY += e.deltaY;
					}
					return {
						datas,
						distX,
						distY,
						distOrigin
					};
				},
				requestEnd() {
					return {
						datas,
						isDrag: true
					};
				}
			};
		}
	};
	/**
	* Whether to drag origin (default: false)
	* @name Moveable.OriginDraggable#originDraggable
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     originDraggable: true,
	* });
	* let translate = [0, 0];
	* moveable.on("dragOriginStart", e => {
	*     e.dragStart && e.dragStart.set(translate);
	* }).on("dragOrigin", e => {
	*     translate = e.drag.beforeTranslate;
	*     e.target.style.cssText
	*         = `transform-origin: ${e.transformOrigin};`
	*         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
	* }).on("dragOriginEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* % Can be used instead of the absolute px (default: true)
	* @name Moveable.OriginDraggable#originRelative
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     originDraggable: true,
	*     originRelative: false,
	* });
	* moveable.originRelative = true;
	*/
	/**
	* When drag start the origin, the `dragOriginStart` event is called.
	* @memberof Moveable.OriginDraggable
	* @event dragOriginStart
	* @param {Moveable.OriginDraggable.OnDragOriginStart} - Parameters for the `dragOriginStart` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     originDraggable: true,
	* });
	* let translate = [0, 0];
	* moveable.on("dragOriginStart", e => {
	*     e.dragStart && e.dragStart.set(translate);
	* }).on("dragOrigin", e => {
	*     translate = e.drag.beforeTranslate;
	*     e.target.style.cssText
	*         = `transform-origin: ${e.transformOrigin};`
	*         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
	* }).on("dragOriginEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* When drag the origin, the `dragOrigin` event is called.
	* @memberof Moveable.OriginDraggable
	* @event dragOrigin
	* @param {Moveable.OriginDraggable.OnDragOrigin} - Parameters for the `dragOrigin` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     originDraggable: true,
	* });
	* let translate = [0, 0];
	* moveable.on("dragOriginStart", e => {
	*     e.dragStart && e.dragStart.set(translate);
	* }).on("dragOrigin", e => {
	*     translate = e.drag.beforeTranslate;
	*     e.target.style.cssText
	*         = `transform-origin: ${e.transformOrigin};`
	*         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
	* }).on("dragOriginEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* When drag end the origin, the `dragOriginEnd` event is called.
	* @memberof Moveable.OriginDraggable
	* @event dragOriginEnd
	* @param {Moveable.OriginDraggable.OnDragOriginEnd} - Parameters for the `dragOriginEnd` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     originDraggable: true,
	* });
	* let translate = [0, 0];
	* moveable.on("dragOriginStart", e => {
	*     e.dragStart && e.dragStart.set(translate);
	* }).on("dragOrigin", e => {
	*     translate = e.drag.beforeTranslate;
	*     e.target.style.cssText
	*         = `transform-origin: ${e.transformOrigin};`
	*         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
	* }).on("dragOriginEnd", e => {
	*     console.log(e);
	* });
	*/
	function addBorderRadiusByLine(controlPoses, lineIndex, distX, distY) {
		const horizontalsLength = controlPoses.filter(({ virtual, horizontal }) => horizontal && !virtual).length;
		const verticalsLength = controlPoses.filter(({ virtual, vertical }) => vertical && !virtual).length;
		let controlIndex = -1;
		if (lineIndex === 0) {
			if (horizontalsLength === 0) controlIndex = 0;
			else if (horizontalsLength === 1) controlIndex = 1;
		}
		if (lineIndex === 2) {
			if (horizontalsLength <= 2) controlIndex = 2;
			else if (horizontalsLength <= 3) controlIndex = 3;
		}
		if (lineIndex === 3) {
			if (verticalsLength === 0) controlIndex = 4;
			else if (verticalsLength < 4) controlIndex = 7;
		}
		if (lineIndex === 1) {
			if (verticalsLength <= 1) controlIndex = 5;
			else if (verticalsLength <= 2) controlIndex = 6;
		}
		if (controlIndex === -1 || !controlPoses[controlIndex].virtual) return;
		const controlPoseInfo = controlPoses[controlIndex];
		addBorderRadius(controlPoses, controlIndex);
		if (controlIndex < 4) controlPoseInfo.pos[0] = distX;
		else controlPoseInfo.pos[1] = distY;
	}
	function addBorderRadius(controlPoses, index) {
		if (index < 4) controlPoses.slice(0, index + 1).forEach((info) => {
			info.virtual = false;
		});
		else {
			if (controlPoses[0].virtual) controlPoses[0].virtual = false;
			controlPoses.slice(4, index + 1).forEach((info) => {
				info.virtual = false;
			});
		}
	}
	function removeBorderRadius(controlPoses, index) {
		if (index < 4) controlPoses.slice(index, 4).forEach((info) => {
			info.virtual = true;
		});
		else controlPoses.slice(index).forEach((info) => {
			info.virtual = true;
		});
	}
	function getBorderRadius(borderRadius, width, height, minCounts = [0, 0], full) {
		let values;
		if (!borderRadius || borderRadius === "0px") values = [];
		else values = splitSpace(borderRadius);
		return getRadiusValues(values, width, height, 0, 0, minCounts, full);
	}
	function triggerRoundEvent(moveable, e, dist, delta, nextPoses) {
		const state = moveable.state;
		const { width, height } = state;
		const { raws, styles, radiusPoses } = getRadiusStyles(nextPoses, moveable.props.roundRelative, width, height);
		const { horizontals, verticals } = splitRadiusPoses(radiusPoses, raws);
		const borderRadius = styles.join(" ");
		state.borderRadiusState = borderRadius;
		const params = fillParams(moveable, e, {
			horizontals,
			verticals,
			borderRadius,
			width,
			height,
			delta,
			dist,
			...fillCSSObject({ borderRadius }, e)
		});
		triggerEvent(moveable, "onRound", params);
		return params;
	}
	function getStyleBorderRadius(moveable) {
		const { style } = moveable.getState();
		let borderRadius = style.borderRadius || "";
		if (!borderRadius && moveable.props.groupable) {
			const firstMoveable = moveable.moveables[0];
			const firstTarget = moveable.getTargets()[0];
			if (firstTarget) {
				if (firstMoveable?.props.target === firstTarget) {
					borderRadius = moveable.moveables[0]?.state.style.borderRadius ?? "";
					style.borderRadius = borderRadius;
				} else {
					borderRadius = getComputedStyle$1(firstTarget).borderRadius;
					style.borderRadius = borderRadius;
				}
			}
		}
		return borderRadius;
	}
	/**
	* @namespace Moveable.Roundable
	* @description Whether to show and drag or double click border-radius
	*/
	var Roundable_default = {
		name: "roundable",
		props: [
			"roundable",
			"roundRelative",
			"minRoundControls",
			"maxRoundControls",
			"roundClickable",
			"roundPadding",
			"isDisplayShadowRoundControls"
		],
		events: [
			"roundStart",
			"round",
			"roundEnd",
			"roundGroupStart",
			"roundGroup",
			"roundGroupEnd"
		],
		css: [
			`.control.border-radius {
background: #d66;
cursor: pointer;
z-index: 3;
}`,
			`.control.border-radius.vertical {
background: #d6d;
z-index: 2;
}`,
			`.control.border-radius.virtual {
opacity: 0.5;
z-index: 1;
}`,
			`:host.round-line-clickable .line.direction {
cursor: pointer;
}`
		],
		className(moveable) {
			const roundClickable = moveable.props.roundClickable;
			return roundClickable === true || roundClickable === "line" ? prefix("round-line-clickable") : "";
		},
		requestStyle() {
			return ["borderRadius"];
		},
		requestChildStyle() {
			return ["borderRadius"];
		},
		render(moveable, React) {
			const { target, width, height, allMatrix, is3d, left, top, borderRadiusState } = moveable.getState();
			const { minRoundControls = [0, 0], maxRoundControls = [4, 4], zoom, roundPadding = 0, isDisplayShadowRoundControls, groupable } = moveable.props;
			if (!target) return null;
			const borderRadius = borderRadiusState || getStyleBorderRadius(moveable);
			const n = is3d ? 4 : 3;
			const radiusValues = getBorderRadius(borderRadius, width, height, minRoundControls, true);
			if (!radiusValues) return null;
			let verticalCount = 0;
			let horizontalCount = 0;
			const basePos = groupable ? [0, 0] : [left, top];
			return radiusValues.map((v, i) => {
				const horizontal = v.horizontal;
				const vertical = v.vertical;
				const direction = v.direction || "";
				const originalPos = [...v.pos];
				horizontalCount += Math.abs(horizontal);
				verticalCount += Math.abs(vertical);
				if (horizontal && direction.indexOf("n") > -1) originalPos[1] -= roundPadding;
				if (vertical && direction.indexOf("w") > -1) originalPos[0] -= roundPadding;
				if (horizontal && direction.indexOf("s") > -1) originalPos[1] += roundPadding;
				if (vertical && direction.indexOf("e") > -1) originalPos[0] += roundPadding;
				const pos = minus(calculatePosition(allMatrix, originalPos, n), basePos);
				const isDisplayVerticalShadow = isDisplayShadowRoundControls && isDisplayShadowRoundControls !== "horizontal";
				const isDisplay = v.vertical ? verticalCount <= maxRoundControls[1] && (isDisplayVerticalShadow || !v.virtual) : horizontalCount <= maxRoundControls[0] && (isDisplayShadowRoundControls || !v.virtual);
				return /* @__PURE__ */ React.createElement("div", {
					key: `borderRadiusControl${i}`,
					className: prefix("control", "border-radius", v.vertical ? "vertical" : "", v.virtual ? "virtual" : ""),
					"data-radius-index": i,
					style: {
						display: isDisplay ? "block" : "none",
						transform: `translate(${pos[0]}px, ${pos[1]}px) scale(${zoom})`
					}
				});
			});
		},
		dragControlCondition(moveable, e) {
			if (!e.inputEvent || e.isRequest) return false;
			const className = e.inputEvent.target.getAttribute("class") || "";
			return className.indexOf("border-radius") > -1 || className.indexOf("moveable-line") > -1 && className.indexOf("moveable-direction") > -1;
		},
		dragGroupControlCondition(moveable, e) {
			return this.dragControlCondition(moveable, e);
		},
		dragControlStart(moveable, e) {
			const { inputEvent, datas } = e;
			const inputTarget = inputEvent.target;
			const className = inputTarget.getAttribute("class") || "";
			const isControl = className.indexOf("border-radius") > -1;
			const isLine = className.indexOf("moveable-line") > -1 && className.indexOf("moveable-direction") > -1;
			const controlIndex = isControl ? parseInt(inputTarget.getAttribute("data-radius-index"), 10) : -1;
			let lineIndex = -1;
			if (isLine) {
				const indexAttr = inputTarget.getAttribute("data-line-key") || "";
				if (indexAttr) {
					lineIndex = parseInt(indexAttr.replace(/render-line-/g, ""), 10);
					if (isNaN(lineIndex)) lineIndex = -1;
				}
			}
			if (!isControl && !isLine) return false;
			const params = fillParams(moveable, e, {});
			if (triggerEvent(moveable, "onRoundStart", params) === false) return false;
			datas.lineIndex = lineIndex;
			datas.controlIndex = controlIndex;
			datas.isControl = isControl;
			datas.isLine = isLine;
			setDragStart(moveable, e);
			const { roundRelative, minRoundControls = [0, 0] } = moveable.props;
			const state = moveable.state;
			const { width, height } = state;
			datas.isRound = true;
			datas.prevDist = [0, 0];
			const controlPoses = getBorderRadius(getStyleBorderRadius(moveable) || "", width, height, minRoundControls, true) || [];
			datas.controlPoses = controlPoses;
			state.borderRadiusState = getRadiusStyles(controlPoses, roundRelative, width, height).styles.join(" ");
			return params;
		},
		dragControl(moveable, e) {
			const { datas } = e;
			const controlPoses = datas.controlPoses;
			if (!datas.isRound || !datas.isControl || !controlPoses.length) return false;
			const index = datas.controlIndex;
			const [distX, distY] = getDragDist(e);
			const dist = [distX, distY];
			const delta = minus(dist, datas.prevDist);
			const { maxRoundControls = [4, 4] } = moveable.props;
			const { width, height } = moveable.state;
			const selectedControlPose = controlPoses[index];
			const selectedVertical = selectedControlPose.vertical;
			const selectedHorizontal = selectedControlPose.horizontal;
			const dists = controlPoses.map((pose) => {
				const { horizontal, vertical } = pose;
				const poseDist = [horizontal * selectedHorizontal * dist[0], vertical * selectedVertical * dist[1]];
				if (horizontal) {
					if (maxRoundControls[0] === 1) return poseDist;
					else if (maxRoundControls[0] < 4 && horizontal !== selectedHorizontal) return poseDist;
				} else if (maxRoundControls[1] === 0) {
					poseDist[1] = vertical * selectedHorizontal * dist[0] / width * height;
					return poseDist;
				} else if (selectedVertical) {
					if (maxRoundControls[1] === 1) return poseDist;
					else if (maxRoundControls[1] < 4 && vertical !== selectedVertical) return poseDist;
				}
				return [0, 0];
			});
			dists[index] = dist;
			const nextPoses = controlPoses.map((info, i) => {
				return {
					...info,
					pos: plus(info.pos, dists[i])
				};
			});
			if (index < 4) nextPoses.slice(0, index + 1).forEach((info) => {
				info.virtual = false;
			});
			else nextPoses.slice(4, index + 1).forEach((info) => {
				info.virtual = false;
			});
			datas.prevDist = [distX, distY];
			return triggerRoundEvent(moveable, e, dist, delta, nextPoses);
		},
		dragControlEnd(moveable, e) {
			const state = moveable.state;
			state.borderRadiusState = "";
			const { datas, isDouble } = e;
			if (!datas.isRound) return false;
			const { isControl, controlIndex, isLine, lineIndex } = datas;
			const controlPoses = datas.controlPoses;
			const length = controlPoses.filter(({ virtual }) => virtual).length;
			const { roundClickable = true } = moveable.props;
			if (isDouble && roundClickable) {
				if (isControl && (roundClickable === true || roundClickable === "control")) removeBorderRadius(controlPoses, controlIndex);
				else if (isLine && (roundClickable === true || roundClickable === "line")) {
					const [distX, distY] = calculatePointerDist(moveable, e);
					addBorderRadiusByLine(controlPoses, lineIndex, distX, distY);
				}
				if (length !== controlPoses.filter(({ virtual }) => virtual).length) triggerRoundEvent(moveable, e, [0, 0], [0, 0], controlPoses);
			}
			const params = fillEndParams(moveable, e, {});
			triggerEvent(moveable, "onRoundEnd", params);
			state.borderRadiusState = "";
			return params;
		},
		dragGroupControlStart(moveable, e) {
			const result = this.dragControlStart(moveable, e);
			if (!result) return false;
			const moveables = moveable.moveables;
			const targets = moveable.props.targets;
			const events = fillChildEvents(moveable, "roundable", e);
			triggerEvent(moveable, "onRoundGroupStart", {
				targets: moveable.props.targets,
				events: events.map((ev, i) => {
					return {
						...ev,
						target: targets[i],
						moveable: moveables[i],
						currentTarget: moveables[i]
					};
				}),
				...result
			});
			return result;
		},
		dragGroupControl(moveable, e) {
			const result = this.dragControl(moveable, e);
			if (!result) return false;
			const moveables = moveable.moveables;
			const targets = moveable.props.targets;
			const events = fillChildEvents(moveable, "roundable", e);
			const nextParams = {
				targets: moveable.props.targets,
				events: events.map((ev, i) => {
					return {
						...ev,
						target: targets[i],
						moveable: moveables[i],
						currentTarget: moveables[i],
						...fillCSSObject({ borderRadius: result.borderRadius }, ev)
					};
				}),
				...result
			};
			triggerEvent(moveable, "onRoundGroup", nextParams);
			return nextParams;
		},
		dragGroupControlEnd(moveable, e) {
			const moveables = moveable.moveables;
			const targets = moveable.props.targets;
			const events = fillChildEvents(moveable, "roundable", e);
			catchEvent(moveable, "onRound", (parentEvent) => {
				triggerEvent(moveable, "onRoundGroup", {
					targets: moveable.props.targets,
					events: events.map((ev, i) => {
						return {
							...ev,
							target: targets[i],
							moveable: moveables[i],
							currentTarget: moveables[i],
							...fillCSSObject({ borderRadius: parentEvent.borderRadius }, ev)
						};
					}),
					...parentEvent
				});
			});
			const result = this.dragControlEnd(moveable, e);
			if (!result) return false;
			const nextParams = {
				targets: moveable.props.targets,
				events: events.map((ev, i) => {
					return {
						...ev,
						target: targets[i],
						moveable: moveables[i],
						currentTarget: moveables[i],
						lastEvent: ev.datas?.lastEvent
					};
				}),
				...result
			};
			triggerEvent(moveable, "onRoundGroupEnd", nextParams);
			return nextParams;
		},
		unset(moveable) {
			moveable.state.borderRadiusState = "";
		}
	};
	/**
	* Whether to show and drag or double click border-radius, (default: false)
	* @name Moveable.Roundable#roundable
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     roundable: true,
	*     roundRelative: false,
	* });
	* moveable.on("roundStart", e => {
	*     console.log(e);
	* }).on("round", e => {
	*     e.target.style.borderRadius = e.borderRadius;
	* }).on("roundEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* % Can be used instead of the absolute px
	* @name Moveable.Roundable#roundRelative
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     roundable: true,
	*     roundRelative: false,
	* });
	* moveable.on("roundStart", e => {
	*     console.log(e);
	* }).on("round", e => {
	*     e.target.style.borderRadius = e.borderRadius;
	* }).on("roundEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* Minimum number of round controls. It moves in proportion by control. [horizontal, vertical] (default: [0, 0])
	* @name Moveable.Roundable#minRoundControls
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     roundable: true,
	*     roundRelative: false,
	*     minRoundControls: [0, 0],
	* });
	* moveable.minRoundControls = [1, 0];
	*/
	/**
	* Maximum number of round controls. It moves in proportion by control. [horizontal, vertical] (default: [4, 4])
	* @name Moveable.Roundable#maxRoundControls
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     roundable: true,
	*     roundRelative: false,
	*     maxRoundControls: [4, 4],
	* });
	* moveable.maxRoundControls = [1, 0];
	*/
	/**
	* Whether you can add/delete round controls by double-clicking a line or control.
	* @name Moveable.Roundable#roundClickable
	* @default true
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     roundable: true,
	*     roundRelative: false,
	*     roundClickable: true,
	* });
	* moveable.roundClickable = false;
	*/
	/**
	* Whether to show a round control that does not actually exist as a shadow
	* @name Moveable.Roundable#isDisplayShadowRoundControls
	* @default false
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     roundable: true,
	*     isDisplayShadowRoundControls: false,
	* });
	* moveable.isDisplayShadowRoundControls = true;
	*/
	/**
	* The padding value of the position of the round control
	* @name Moveable.Roundable#roundPadding
	* @default false
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     roundable: true,
	*     roundPadding: 0,
	* });
	* moveable.roundPadding = 15;
	*/
	/**
	* When drag start the clip area or controls, the `roundStart` event is called.
	* @memberof Moveable.Roundable
	* @event roundStart
	* @param {Moveable.Roundable.OnRoundStart} - Parameters for the `roundStart` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     roundable: true,
	*     roundRelative: false,
	* });
	* moveable.on("roundStart", e => {
	*     console.log(e);
	* }).on("round", e => {
	*     e.target.style.borderRadius = e.borderRadius;
	* }).on("roundEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* When drag or double click the border area or controls, the `round` event is called.
	* @memberof Moveable.Roundable
	* @event round
	* @param {Moveable.Roundable.OnRound} - Parameters for the `round` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     roundable: true,
	*     roundRelative: false,
	* });
	* moveable.on("roundStart", e => {
	*     console.log(e);
	* }).on("round", e => {
	*     e.target.style.borderRadius = e.borderRadius;
	* }).on("roundEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* When drag end the border area or controls, the `roundEnd` event is called.
	* @memberof Moveable.Roundable
	* @event roundEnd
	* @param {Moveable.Roundable.onRoundEnd} - Parameters for the `roundEnd` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     roundable: true,
	*     roundRelative: false,
	* });
	* moveable.on("roundStart", e => {
	*     console.log(e);
	* }).on("round", e => {
	*     e.target.style.borderRadius = e.borderRadius;
	* }).on("roundEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* When drag start the clip area or controls, the `roundGroupStart` event is called.
	* @memberof Moveable.Roundable
	* @event roundGroupStart
	* @param {Moveable.Roundable.OnRoundGroupStart} - Parameters for the `roundGroupStart` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     targets: [target1, target2, target3],
	*     roundable: true,
	* });
	* moveable.on("roundGroupStart", e => {
	*     console.log(e.targets);
	* }).on("roundGroup", e => {
	*   e.events.forEach(ev => {
	*       ev.target.style.cssText += ev.cssText;
	*   });
	* }).on("roundGroupEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* When drag or double click the border area or controls, the `roundGroup` event is called.
	* @memberof Moveable.Roundable
	* @event roundGroup
	* @param {Moveable.Roundable.OnRoundGroup} - Parameters for the `roundGroup` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     targets: [target1, target2, target3],
	*     roundable: true,
	* });
	* moveable.on("roundGroupStart", e => {
	*     console.log(e.targets);
	* }).on("roundGroup", e => {
	*   e.events.forEach(ev => {
	*       ev.target.style.cssText += ev.cssText;
	*   });
	* }).on("roundGroupEnd", e => {
	*     console.log(e);
	* });
	*/
	/**
	* When drag end the border area or controls, the `roundGroupEnd` event is called.
	* @memberof Moveable.Roundable
	* @event roundGroupEnd
	* @param {Moveable.Roundable.onRoundGroupEnd} - Parameters for the `roundGroupEnd` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     targets: [target1, target2, target3],
	*     roundable: true,
	* });
	* moveable.on("roundGroupStart", e => {
	*     console.log(e.targets);
	* }).on("roundGroup", e => {
	*     e.events.forEach(ev => {
	*         ev.target.style.cssText += ev.cssText;
	*     });
	* }).on("roundGroupEnd", e => {
	*     console.log(e);
	* });
	*/
	function isIdentityMatrix(matrix, is3d) {
		const identityMatrix = createIdentityMatrix(is3d ? 4 : 3);
		return matrix === `matrix${is3d ? "3d" : ""}(${identityMatrix.join(",")})` || matrix === `matrix(1,0,0,1,0,0)`;
	}
	var BeforeRenderable_default = {
		isPinch: true,
		name: "beforeRenderable",
		props: [],
		events: [
			"beforeRenderStart",
			"beforeRender",
			"beforeRenderEnd",
			"beforeRenderGroupStart",
			"beforeRenderGroup",
			"beforeRenderGroupEnd"
		],
		dragRelation: "weak",
		setTransform(moveable, e) {
			const { is3d, targetMatrix, inlineTransform } = moveable.state;
			const cssMatrix = is3d ? `matrix3d(${targetMatrix.join(",")})` : `matrix(${convertMatrixtoCSS(targetMatrix, true)})`;
			const startTransform = !inlineTransform || inlineTransform === "none" ? cssMatrix : inlineTransform;
			e.datas.startTransforms = isIdentityMatrix(startTransform, is3d) ? [] : splitSpace(startTransform);
		},
		resetStyle(e) {
			const datas = e.datas;
			datas.nextStyle = {};
			datas.nextTransforms = e.datas.startTransforms;
			datas.nextTransformAppendedIndexes = [];
		},
		fillDragStartParams(moveable, e) {
			return fillParams(moveable, e, {
				setTransform: (transform) => {
					e.datas.startTransforms = isArray(transform) ? transform : splitSpace(transform);
				},
				isPinch: !!e.isPinch
			});
		},
		fillDragParams(moveable, e) {
			return fillParams(moveable, e, { isPinch: !!e.isPinch });
		},
		dragStart(moveable, e) {
			this.setTransform(moveable, e);
			this.resetStyle(e);
			triggerEvent(moveable, `onBeforeRenderStart`, this.fillDragStartParams(moveable, e));
		},
		drag(moveable, e) {
			if (!e.datas.startTransforms) this.setTransform(moveable, e);
			this.resetStyle(e);
			triggerEvent(moveable, `onBeforeRender`, fillParams(moveable, e, { isPinch: !!e.isPinch }));
		},
		dragEnd(moveable, e) {
			if (!e.datas.startTransforms) {
				this.setTransform(moveable, e);
				this.resetStyle(e);
			}
			triggerEvent(moveable, `onBeforeRenderEnd`, fillParams(moveable, e, {
				isPinch: !!e.isPinch,
				isDrag: e.isDrag
			}));
		},
		dragGroupStart(moveable, e) {
			this.dragStart(moveable, e);
			const events = fillChildEvents(moveable, "beforeRenderable", e);
			const moveables = moveable.moveables;
			const params = events.map((childEvent, i) => {
				const childMoveable = moveables[i];
				this.setTransform(childMoveable, childEvent);
				this.resetStyle(childEvent);
				return this.fillDragStartParams(childMoveable, childEvent);
			});
			triggerEvent(moveable, `onBeforeRenderGroupStart`, fillParams(moveable, e, {
				isPinch: !!e.isPinch,
				targets: moveable.props.targets,
				setTransform() {},
				events: params
			}));
		},
		dragGroup(moveable, e) {
			this.drag(moveable, e);
			const events = fillChildEvents(moveable, "beforeRenderable", e);
			const moveables = moveable.moveables;
			const params = events.map((childEvent, i) => {
				const childMoveable = moveables[i];
				this.resetStyle(childEvent);
				return this.fillDragParams(childMoveable, childEvent);
			});
			triggerEvent(moveable, `onBeforeRenderGroup`, fillParams(moveable, e, {
				isPinch: !!e.isPinch,
				targets: moveable.props.targets,
				events: params
			}));
		},
		dragGroupEnd(moveable, e) {
			this.dragEnd(moveable, e);
			triggerEvent(moveable, `onBeforeRenderGroupEnd`, fillParams(moveable, e, {
				isPinch: !!e.isPinch,
				isDrag: e.isDrag,
				targets: moveable.props.targets
			}));
		},
		dragControlStart(moveable, e) {
			return this.dragStart(moveable, e);
		},
		dragControl(moveable, e) {
			return this.drag(moveable, e);
		},
		dragControlEnd(moveable, e) {
			return this.dragEnd(moveable, e);
		},
		dragGroupControlStart(moveable, e) {
			return this.dragGroupStart(moveable, e);
		},
		dragGroupControl(moveable, e) {
			return this.dragGroup(moveable, e);
		},
		dragGroupControlEnd(moveable, e) {
			return this.dragGroupEnd(moveable, e);
		}
	};
	var Renderable_default = {
		name: "renderable",
		props: [],
		events: [
			"renderStart",
			"render",
			"renderEnd",
			"renderGroupStart",
			"renderGroup",
			"renderGroupEnd"
		],
		dragRelation: "weak",
		dragStart(moveable, e) {
			triggerEvent(moveable, `onRenderStart`, fillParams(moveable, e, { isPinch: !!e.isPinch }));
		},
		drag(moveable, e) {
			triggerEvent(moveable, `onRender`, this.fillDragParams(moveable, e));
		},
		dragAfter(moveable, e) {
			return this.drag(moveable, e);
		},
		dragEnd(moveable, e) {
			triggerEvent(moveable, `onRenderEnd`, this.fillDragEndParams(moveable, e));
		},
		dragGroupStart(moveable, e) {
			triggerEvent(moveable, `onRenderGroupStart`, fillParams(moveable, e, {
				isPinch: !!e.isPinch,
				targets: moveable.props.targets
			}));
		},
		dragGroup(moveable, e) {
			const events = fillChildEvents(moveable, "beforeRenderable", e);
			const moveables = moveable.moveables;
			const params = events.map((childEvent, i) => {
				const childMoveable = moveables[i];
				return this.fillDragParams(childMoveable, childEvent);
			});
			triggerEvent(moveable, `onRenderGroup`, fillParams(moveable, e, {
				isPinch: !!e.isPinch,
				targets: moveable.props.targets,
				transform: getNextTransformText(e),
				transformObject: {},
				...fillCSSObject(getNextStyle(e)),
				events: params
			}));
		},
		dragGroupEnd(moveable, e) {
			const events = fillChildEvents(moveable, "beforeRenderable", e);
			const moveables = moveable.moveables;
			const params = events.map((childEvent, i) => {
				const childMoveable = moveables[i];
				return this.fillDragEndParams(childMoveable, childEvent);
			});
			triggerEvent(moveable, `onRenderGroupEnd`, fillParams(moveable, e, {
				isPinch: !!e.isPinch,
				isDrag: e.isDrag,
				targets: moveable.props.targets,
				events: params,
				transformObject: {},
				transform: getNextTransformText(e),
				...fillCSSObject(getNextStyle(e))
			}));
		},
		dragControlStart(moveable, e) {
			return this.dragStart(moveable, e);
		},
		dragControl(moveable, e) {
			return this.drag(moveable, e);
		},
		dragControlAfter(moveable, e) {
			return this.dragAfter(moveable, e);
		},
		dragControlEnd(moveable, e) {
			return this.dragEnd(moveable, e);
		},
		dragGroupControlStart(moveable, e) {
			return this.dragGroupStart(moveable, e);
		},
		dragGroupControl(moveable, e) {
			return this.dragGroup(moveable, e);
		},
		dragGroupControlEnd(moveable, e) {
			return this.dragGroupEnd(moveable, e);
		},
		fillDragParams(moveable, e) {
			const transformObject = {};
			parse(getNextTransforms(e) || []).forEach((matrixInfo) => {
				transformObject[matrixInfo.name] = matrixInfo.functionValue;
			});
			return fillParams(moveable, e, {
				isPinch: !!e.isPinch,
				transformObject,
				transform: getNextTransformText(e),
				...fillCSSObject(getNextStyle(e))
			});
		},
		fillDragEndParams(moveable, e) {
			const transformObject = {};
			parse(getNextTransforms(e) || []).forEach((matrixInfo) => {
				transformObject[matrixInfo.name] = matrixInfo.functionValue;
			});
			return fillParams(moveable, e, {
				isPinch: !!e.isPinch,
				isDrag: e.isDrag,
				transformObject,
				transform: getNextTransformText(e),
				...fillCSSObject(getNextStyle(e))
			});
		}
	};
	function triggerAble(moveable, moveableAbles, eventOperations, eventAffix, eventType, e, requestInstant) {
		e.clientDistX = e.distX;
		e.clientDistY = e.distY;
		const isStart = eventType === "Start";
		const isEnd = eventType === "End";
		const isAfter = eventType === "After";
		const target = moveable.state.target;
		const isRequest = e.isRequest;
		const isControl = eventAffix.indexOf("Control") > -1;
		if (!target || isStart && isControl && !isRequest && moveable.areaElement === e.inputEvent.target) return false;
		const ables = [...moveableAbles];
		if (isRequest) {
			const requestAble = e.requestAble;
			if (!ables.some((able) => able.name === requestAble)) ables.push(...moveable.props.ables.filter((able) => able.name === requestAble));
		}
		if (!ables.length || ables.every((able) => able.dragRelation)) return false;
		const inputEvent = e.inputEvent;
		let inputTarget;
		if (isEnd && inputEvent) inputTarget = document.elementFromPoint(e.clientX, e.clientY) || inputEvent.target;
		let isDragStop = false;
		const stop = () => {
			isDragStop = true;
			e.stop?.();
		};
		const isFirstStart = isStart && (!moveable.targetGesto || !moveable.controlGesto || !moveable.targetGesto.isFlag() || !moveable.controlGesto.isFlag());
		if (isFirstStart) moveable.updateRect(eventType, true, false);
		const datas = e.datas;
		const gestoType = isControl ? "controlGesto" : "targetGesto";
		const prevGesto = moveable[gestoType];
		const trigger = (able, eventName, conditionName) => {
			if (!(eventName in able) || prevGesto !== moveable[gestoType]) return false;
			const ableName = able.name;
			const nextDatas = datas[ableName] || (datas[ableName] = {});
			if (isStart) nextDatas.isEventStart = !conditionName || !able[conditionName] || able[conditionName](moveable, e);
			if (!nextDatas.isEventStart) return false;
			const result = able[eventName](moveable, {
				...e,
				stop,
				datas: nextDatas,
				originalDatas: datas,
				inputTarget
			});
			moveable._emitter.off();
			if (isStart && result === false) nextDatas.isEventStart = false;
			return result;
		};
		if (isFirstStart) ables.forEach((able) => {
			able.unset && able.unset(moveable);
		});
		trigger(BeforeRenderable_default, `drag${eventAffix}${eventType}`);
		let forceEndedCount = 0;
		let updatedCount = 0;
		eventOperations.forEach((eventOperation) => {
			if (isDragStop) return false;
			const eventName = `${eventOperation}${eventAffix}${eventType}`;
			const conditionName = `${eventOperation}${eventAffix}Condition`;
			if (eventType === "" && !isRequest) convertDragDist(moveable.state, e);
			let eventAbles = ables.filter((able) => able[eventName]);
			eventAbles = eventAbles.filter((able, i) => {
				return able.name && eventAbles.indexOf(able) === i;
			});
			const isUpdate = eventAbles.filter((able) => trigger(able, eventName, conditionName)).length;
			if (isDragStop) ++forceEndedCount;
			if (isUpdate) ++updatedCount;
			if (!isDragStop && isStart && eventAbles.length && !isUpdate) forceEndedCount += eventAbles.filter((able) => {
				const ableName = able.name;
				if (datas[ableName].isEventStart) {
					if (able.dragRelation === "strong") return false;
					return true;
				}
				return false;
			}).length ? 1 : 0;
		});
		if (!isAfter || updatedCount) trigger(Renderable_default, `drag${eventAffix}${eventType}`);
		const isForceEnd = prevGesto !== moveable[gestoType] || forceEndedCount === eventOperations.length;
		if (isEnd || isDragStop || isForceEnd) {
			moveable.state.gestos = {};
			if (moveable.moveables) moveable.moveables.forEach((childMoveable) => {
				childMoveable.state.gestos = {};
			});
			ables.forEach((able) => {
				able.unset && able.unset(moveable);
			});
		}
		if (isStart && !isForceEnd && !isRequest && updatedCount && moveable.props.preventDefault) e?.preventDefault();
		if (moveable.isUnmounted || isForceEnd) return false;
		if (!isStart && updatedCount && !requestInstant || isEnd) (moveable.props.flushSync || defaultSync)(() => {
			moveable.updateRect(isEnd ? eventType : "", true, false);
			moveable.forceUpdate();
		});
		if (!isStart && !isEnd && !isAfter && updatedCount && !requestInstant) triggerAble(moveable, moveableAbles, eventOperations, eventAffix, eventType + "After", e);
		return true;
	}
	function checkMoveableTarget(moveable, isControl) {
		return (e, target = e.inputEvent.target) => {
			const eventTarget = target;
			const areaElement = moveable.areaElement;
			const dragTargetElement = moveable._dragTarget;
			if (!dragTargetElement || !isControl && moveable.controlGesto?.isFlag()) return false;
			return eventTarget === dragTargetElement || dragTargetElement.contains(eventTarget) || eventTarget === areaElement || !moveable.isMoveableElement(eventTarget) && !moveable.controlBox.contains(eventTarget) || hasClass(eventTarget, "moveable-area") || hasClass(eventTarget, "moveable-padding") || hasClass(eventTarget, "moveable-edgeDraggable");
		};
	}
	function getTargetAbleGesto(moveable, moveableTarget, eventAffix) {
		const controlBox = moveable.controlBox;
		const targets = [];
		const props = moveable.props;
		const dragArea = props.dragArea;
		const target = moveable.state.target;
		const dragTarget = props.dragTarget;
		targets.push(controlBox);
		if (!dragArea || dragTarget) targets.push(moveableTarget);
		if (!dragArea && dragTarget && target && moveableTarget !== target && props.dragTargetSelf) targets.push(target);
		const checkTarget = checkMoveableTarget(moveable);
		return getAbleGesto(moveable, targets, "targetAbles", eventAffix, {
			dragStart: checkTarget,
			pinchStart: checkTarget
		});
	}
	function getControlAbleGesto(moveable, eventAffix) {
		const controlBox = moveable.controlBox;
		const targets = [];
		targets.push(controlBox);
		const checkTarget = checkMoveableTarget(moveable, true);
		const checkControlTarget = (e, target = e.inputEvent.target) => {
			if (target === controlBox) return true;
			return !checkTarget(e, target);
		};
		return getAbleGesto(moveable, targets, "controlAbles", eventAffix, {
			dragStart: checkControlTarget,
			pinchStart: checkControlTarget
		});
	}
	function getAbleGesto(moveable, target, ableType, eventAffix, conditionFunctions = {}) {
		const isTargetAbles = ableType === "targetAbles";
		const { pinchOutside, pinchThreshold, preventClickEventOnDrag, preventClickDefault, checkInput, dragFocusedInput, preventDefault = true, preventRightClick = true, preventWheelClick = true, dragContainer: dragContaienrOption } = moveable.props;
		const gesto = new Gesto(target, {
			preventDefault,
			preventRightClick,
			preventWheelClick,
			container: getRefTarget(dragContaienrOption, true) || getWindow(moveable.getControlBoxElement()),
			pinchThreshold,
			pinchOutside,
			preventClickEventOnDrag: isTargetAbles ? preventClickEventOnDrag : false,
			preventClickEventOnDragStart: isTargetAbles ? preventClickDefault : false,
			preventClickEventByCondition: isTargetAbles ? null : (e) => {
				return moveable.controlBox.contains(e.target);
			},
			checkInput: isTargetAbles ? checkInput : false,
			dragFocusedInput
		});
		const isControl = eventAffix === "Control";
		["drag", "pinch"].forEach((eventOperation) => {
			[
				"Start",
				"",
				"End"
			].forEach((eventType) => {
				gesto.on(`${eventOperation}${eventType}`, (e) => {
					const eventName = e.eventType;
					const isPinchScheduled = eventOperation === "drag" && e.isPinch;
					if (conditionFunctions[eventName] && !conditionFunctions[eventName](e)) {
						e.stop();
						return;
					}
					if (isPinchScheduled) return;
					const eventOperations = eventOperation === "drag" ? [eventOperation] : ["drag", eventOperation];
					if (!triggerAble(moveable, [...moveable[ableType]], eventOperations, eventAffix, eventType, e)) e.stop();
					else if (moveable.props.stopPropagation || eventType === "Start" && isControl) e?.inputEvent?.stopPropagation();
				});
			});
		});
		return gesto;
	}
	var EventManager = class {
		constructor(target, moveable, eventName) {
			this.target = target;
			this.moveable = moveable;
			this.eventName = eventName;
			this.ables = [];
			this._onEvent = (e) => {
				const eventName = this.eventName;
				const moveable = this.moveable;
				if (moveable.state.disableNativeEvent) return;
				this.ables.forEach((able) => {
					able[eventName](moveable, { inputEvent: e });
				});
			};
			target.addEventListener(eventName.toLowerCase(), this._onEvent);
		}
		setAbles(ables) {
			this.ables = ables;
		}
		destroy() {
			this.target.removeEventListener(this.eventName.toLowerCase(), this._onEvent);
			this.target = null;
			this.moveable = null;
		}
	};
	function calculateMatrixStack(target, container, rootContainer = container, isAbsolute3d) {
		const { matrixes, is3d, targetMatrix: prevTargetMatrix, transformOrigin, targetOrigin, offsetContainer, hasFixed, zoom: containerZoom } = getMatrixStackInfo(target, container);
		const { matrixes: rootMatrixes, is3d: isRoot3d, offsetContainer: offsetRootContainer, zoom: rootZoom } = getCachedMatrixContainerInfo(offsetContainer, rootContainer);
		const isNext3d = isAbsolute3d || isRoot3d || is3d;
		const n = isNext3d ? 4 : 3;
		const isSVGGraphicElement = target.tagName.toLowerCase() !== "svg" && "ownerSVGElement" in target;
		let targetMatrix = prevTargetMatrix;
		let allMatrix = createIdentityMatrix(n);
		let rootMatrix = createIdentityMatrix(n);
		let beforeMatrix = createIdentityMatrix(n);
		let offsetMatrix = createIdentityMatrix(n);
		const length = matrixes.length;
		const nextRootMatrixes = rootMatrixes.map((info) => {
			return {
				...info,
				matrix: info.matrix ? [...info.matrix] : void 0
			};
		}).reverse();
		matrixes.reverse();
		if (!is3d && isNext3d) {
			targetMatrix = convertDimension(targetMatrix, 3, 4);
			convert3DMatrixes(matrixes);
		}
		if (!isRoot3d && isNext3d) convert3DMatrixes(nextRootMatrixes);
		nextRootMatrixes.forEach((info) => {
			rootMatrix = multiply(rootMatrix, info.matrix, n);
		});
		const originalRootContainer = rootContainer || getDocumentBody(target);
		const endContainer = nextRootMatrixes[0]?.target || getOffsetInfo(originalRootContainer, originalRootContainer, true).offsetParent;
		const rootMatrixBeforeOffset = nextRootMatrixes.slice(1).reduce((matrix, info) => {
			return multiply(matrix, info.matrix, n);
		}, createIdentityMatrix(n));
		matrixes.forEach((info, i) => {
			if (length - 2 === i) beforeMatrix = allMatrix.slice();
			if (length - 1 === i) offsetMatrix = allMatrix.slice();
			if (!info.matrix) {
				const nextInfo = matrixes[i + 1];
				info.matrix = createOriginMatrix(getSVGOffset(info, nextInfo, endContainer, n, multiply(rootMatrixBeforeOffset, allMatrix, n)), n);
			}
			allMatrix = multiply(allMatrix, info.matrix, n);
		});
		const isMatrix3d = !isSVGGraphicElement && is3d;
		if (!targetMatrix) targetMatrix = createIdentityMatrix(isMatrix3d ? 4 : 3);
		const targetTransform = makeMatrixCSS(isSVGGraphicElement && targetMatrix.length === 16 ? convertDimension(targetMatrix, 4, 3) : targetMatrix, isMatrix3d);
		const originalRootMatrix = rootMatrix;
		rootMatrix = ignoreDimension(rootMatrix, n, n);
		return {
			hasZoom: containerZoom !== 1 || rootZoom !== 1,
			hasFixed,
			matrixes,
			rootMatrix,
			originalRootMatrix,
			beforeMatrix,
			offsetMatrix,
			allMatrix,
			targetMatrix,
			targetTransform,
			inlineTransform: target.style.transform,
			transformOrigin,
			targetOrigin,
			is3d: isNext3d,
			offsetContainer,
			offsetRootContainer
		};
	}
	function calculateElementInfo(target, container, rootContainer = container, isAbsolute3d) {
		let width = 0;
		let height = 0;
		let rotation = 0;
		let allResult = {};
		const sizes = getSize(target);
		if (target) {
			width = sizes.offsetWidth;
			height = sizes.offsetHeight;
		}
		if (target) {
			const result = calculateMatrixStack(target, container, rootContainer, isAbsolute3d);
			const position = calculateElementPosition(result.allMatrix, result.transformOrigin, width, height);
			allResult = {
				...result,
				...position
			};
			const rotationPosition = calculateElementPosition(result.allMatrix, [50, 50], 100, 100);
			rotation = getRotationRad([rotationPosition.pos1, rotationPosition.pos2], rotationPosition.direction);
		}
		const n = isAbsolute3d ? 4 : 3;
		return {
			hasZoom: false,
			width,
			height,
			rotation,
			...sizes,
			originalRootMatrix: createIdentityMatrix(n),
			rootMatrix: createIdentityMatrix(n),
			beforeMatrix: createIdentityMatrix(n),
			offsetMatrix: createIdentityMatrix(n),
			allMatrix: createIdentityMatrix(n),
			targetMatrix: createIdentityMatrix(n),
			targetTransform: "",
			inlineTransform: "",
			transformOrigin: [0, 0],
			targetOrigin: [0, 0],
			is3d: !!isAbsolute3d,
			left: 0,
			top: 0,
			right: 0,
			bottom: 0,
			origin: [0, 0],
			pos1: [0, 0],
			pos2: [0, 0],
			pos3: [0, 0],
			pos4: [0, 0],
			direction: 1,
			hasFixed: false,
			offsetContainer: null,
			offsetRootContainer: null,
			matrixes: [],
			...allResult
		};
	}
	function getElementInfo$1(target, container, rootContainer = container) {
		return calculateElementInfo(target, container, rootContainer, true);
	}
	function getMoveableTargetInfo(moveableElement, target, container, parentContainer, rootContainer, requestStyles = []) {
		let beforeDirection = 1;
		let beforeOrigin = [0, 0];
		let targetClientRect = resetClientRect();
		let moveableClientRect = resetClientRect();
		let containerClientRect = resetClientRect();
		let rootContainerClientRect = resetClientRect();
		let offsetDelta = [0, 0];
		const style = {};
		const result = calculateElementInfo(target, container, rootContainer, true);
		if (target) {
			const getStyle = getCachedStyle(target);
			requestStyles.forEach((name) => {
				style[name] = getStyle(name);
			});
			const n = result.is3d ? 4 : 3;
			const beforePosition = calculateElementPosition(result.offsetMatrix, plus(result.transformOrigin, getOrigin(result.targetMatrix, n)), result.width, result.height);
			beforeDirection = beforePosition.direction;
			beforeOrigin = plus(beforePosition.origin, [beforePosition.left - result.left, beforePosition.top - result.top]);
			rootContainerClientRect = getClientRect(result.offsetRootContainer);
			const offsetContainer = getOffsetInfo(parentContainer, parentContainer, true).offsetParent || result.offsetRootContainer;
			if (result.hasZoom) {
				const absoluteTargetPosition = calculateElementPosition(multiply(result.originalRootMatrix, result.allMatrix), result.transformOrigin, result.width, result.height);
				const absoluteContainerPosition = calculateElementPosition(result.originalRootMatrix, getTransformOriginArray(getCachedStyle(offsetContainer)("transformOrigin")).map((pos) => parseFloat(pos)), offsetContainer.offsetWidth, offsetContainer.offsetHeight);
				targetClientRect = getClientRectByPosition(absoluteTargetPosition, rootContainerClientRect);
				containerClientRect = getClientRectByPosition(absoluteContainerPosition, rootContainerClientRect, offsetContainer, true);
				if (moveableElement) {
					const left = absoluteTargetPosition.left;
					const top = absoluteTargetPosition.top;
					moveableClientRect = getClientRectByPosition({
						left,
						top,
						bottom: top,
						right: top
					}, rootContainerClientRect);
				}
			} else {
				targetClientRect = getClientRect(target);
				containerClientRect = getCachedClientRect(offsetContainer);
				if (moveableElement) moveableClientRect = getClientRect(moveableElement);
				const { left: containerClientRectLeft, top: containerClientRectTop, clientLeft: containterClientLeft, clientTop: containerClientTop } = containerClientRect;
				const clientDelta = [targetClientRect.left - containerClientRectLeft, targetClientRect.top - containerClientRectTop];
				offsetDelta = minus(calculateInversePosition(result.rootMatrix, clientDelta, 4), [containterClientLeft + result.left, containerClientTop + result.top]);
			}
		}
		return {
			targetClientRect,
			containerClientRect,
			moveableClientRect,
			rootContainerClientRect,
			beforeDirection,
			beforeOrigin,
			originalBeforeOrigin: beforeOrigin,
			target,
			style,
			offsetDelta,
			...result
		};
	}
	function getPersistState(rect) {
		let { pos1, pos2, pos3, pos4 } = rect;
		if (!pos1 || !pos2 || !pos3 || !pos4) return null;
		const minPos = getMinMaxs([
			pos1,
			pos2,
			pos3,
			pos4
		]);
		const posDelta = [minPos.minX, minPos.minY];
		const origin = minus(rect.origin, posDelta);
		pos1 = minus(pos1, posDelta);
		pos2 = minus(pos2, posDelta);
		pos3 = minus(pos3, posDelta);
		pos4 = minus(pos4, posDelta);
		return {
			...rect,
			left: rect.left,
			top: rect.top,
			posDelta,
			pos1,
			pos2,
			pos3,
			pos4,
			origin,
			beforeOrigin: origin,
			isPersisted: true
		};
	}
	var MoveableManager$1 = class extends PureComponent {
		constructor(..._args) {
			super(..._args);
			this.state = {
				container: null,
				gestos: {},
				renderLines: [
					[[0, 0], [0, 0]],
					[[0, 0], [0, 0]],
					[[0, 0], [0, 0]],
					[[0, 0], [0, 0]]
				],
				renderPoses: [
					[0, 0],
					[0, 0],
					[0, 0],
					[0, 0]
				],
				disableNativeEvent: false,
				posDelta: [0, 0],
				...getMoveableTargetInfo(null)
			};
			this.renderState = {};
			this.enabledAbles = [];
			this.targetAbles = [];
			this.controlAbles = [];
			this.rotation = 0;
			this.scale = [1, 1];
			this.isMoveableMounted = false;
			this.isUnmounted = false;
			this.events = {
				"mouseEnter": null,
				"mouseLeave": null
			};
			this._emitter = new EventEmitter();
			this._prevOriginalDragTarget = null;
			this._originalDragTarget = null;
			this._prevDragTarget = null;
			this._dragTarget = null;
			this._prevPropTarget = null;
			this._propTarget = null;
			this._prevDragArea = false;
			this._isPropTargetChanged = false;
			this._hasFirstTarget = false;
			this._reiszeObserver = null;
			this._observerId = 0;
			this._mutationObserver = null;
			this._rootContainer = null;
			this._viewContainer = null;
			this._viewClassNames = [];
			this._store = {};
			this.checkUpdateRect = () => {
				if (this.isDragging()) return;
				const parentMoveable = this.props.parentMoveable;
				if (parentMoveable) {
					parentMoveable.checkUpdateRect();
					return;
				}
				cancelAnimationFrame(this._observerId);
				this._observerId = requestAnimationFrame$1(() => {
					if (this.isDragging()) return;
					this.updateRect();
				});
			};
			this._onPreventClick = (e) => {
				e.stopPropagation();
				e.preventDefault();
			};
		}
		static {
			this.defaultProps = {
				dragTargetSelf: false,
				target: null,
				dragTarget: null,
				container: null,
				rootContainer: null,
				origin: true,
				parentMoveable: null,
				wrapperMoveable: null,
				isWrapperMounted: false,
				parentPosition: null,
				warpSelf: false,
				svgOrigin: "",
				dragContainer: null,
				useResizeObserver: false,
				useMutationObserver: false,
				preventDefault: true,
				preventRightClick: true,
				preventWheelClick: true,
				linePadding: 0,
				controlPadding: 0,
				ables: [],
				pinchThreshold: 20,
				dragArea: false,
				passDragArea: false,
				transformOrigin: "",
				className: "",
				zoom: 1,
				triggerAblesSimultaneously: false,
				padding: {},
				pinchOutside: true,
				checkInput: false,
				dragFocusedInput: false,
				groupable: false,
				hideDefaultLines: false,
				cspNonce: "",
				translateZ: 0,
				cssStyled: null,
				customStyledMap: {},
				props: {},
				stopPropagation: false,
				preventClickDefault: false,
				preventClickEventOnDrag: true,
				flushSync: defaultSync,
				firstRenderState: null,
				persistData: null,
				viewContainer: null,
				requestStyles: [],
				useAccuratePosition: false
			};
		}
		render() {
			const props = this.props;
			const state = this.getState();
			const { parentPosition, className, target: propsTarget, zoom, cspNonce, translateZ, cssStyled: ControlBoxElement, groupable, linePadding, controlPadding } = props;
			this._checkUpdateRootContainer();
			this.checkUpdate();
			this.updateRenderPoses();
			const [parentLeft, parentTop] = parentPosition || [0, 0];
			const { left, top, target: stateTarget, direction, hasFixed, offsetDelta } = state;
			const groupTargets = props.targets;
			const isDragging = this.isDragging();
			const ableAttributes = {};
			this.getEnabledAbles().forEach((able) => {
				ableAttributes[`data-able-${able.name.toLowerCase()}`] = true;
			});
			const ableClassName = this._getAbleClassName();
			const isDisplay = groupTargets && groupTargets.length && (stateTarget || groupable) || propsTarget || !this._hasFirstTarget && this.state.isPersisted;
			const isVisible = this.controlBox || this.props.firstRenderState || this.props.persistData;
			const translate = [left - parentLeft, top - parentTop];
			if (!groupable && props.useAccuratePosition) {
				translate[0] += offsetDelta[0];
				translate[1] += offsetDelta[1];
			}
			const style = {
				"position": hasFixed ? "fixed" : "absolute",
				"display": isDisplay ? "block" : "none",
				"visibility": isVisible ? "visible" : "hidden",
				"transform": `translate3d(${translate[0]}px, ${translate[1]}px, ${translateZ})`,
				"--zoom": zoom,
				"--zoompx": `${zoom}px`
			};
			if (linePadding) style["--moveable-line-padding"] = linePadding;
			if (controlPadding) style["--moveable-control-padding"] = controlPadding;
			return /* @__PURE__ */ createElement(ControlBoxElement, {
				cspNonce,
				ref: ref(this, "controlBox"),
				className: `${prefix("control-box", direction === -1 ? "reverse" : "", isDragging ? "dragging" : "")} ${ableClassName} ${className}`,
				...ableAttributes,
				onClick: this._onPreventClick,
				style
			}, this.renderAbles(), this._renderLines());
		}
		componentDidMount() {
			this.isMoveableMounted = true;
			this.isUnmounted = false;
			const { parentMoveable, container } = this.props;
			this._checkUpdateRootContainer();
			this._checkUpdateViewContainer();
			this._updateTargets();
			this._updateNativeEvents();
			this._updateEvents();
			this.updateCheckInput();
			this._updateObserver(this.props);
			if (!container && !parentMoveable && !this.state.isPersisted) {
				this.updateRect("", false, false);
				this.forceUpdate();
			}
		}
		componentDidUpdate(prevProps) {
			this._checkUpdateRootContainer();
			this._checkUpdateViewContainer();
			this._updateNativeEvents();
			this._updateTargets();
			this._updateEvents();
			this.updateCheckInput();
			this._updateObserver(prevProps);
		}
		componentWillUnmount() {
			this.isMoveableMounted = false;
			this.isUnmounted = true;
			this._emitter.off();
			this._reiszeObserver?.disconnect();
			this._mutationObserver?.disconnect();
			if (this._viewContainer) this._changeAbleViewClassNames([]);
			unsetGesto(this, false);
			unsetGesto(this, true);
			const events = this.events;
			for (const name in events) {
				const manager = events[name];
				manager && manager.destroy();
			}
		}
		getTargets() {
			const target = this.props.target;
			return target ? [target] : [];
		}
		/**
		* Get the able used in MoveableManager.
		* @method Moveable#getAble
		* @param - able name
		*/
		getAble(ableName) {
			return find$1(this.props.ables || [], (able) => able.name === ableName);
		}
		getContainer() {
			const { parentMoveable, wrapperMoveable, container } = this.props;
			return container || wrapperMoveable && wrapperMoveable.getContainer() || parentMoveable && parentMoveable.getContainer() || this.controlBox.parentElement;
		}
		/**
		* Returns the element of the control box.
		* @method Moveable#getControlBoxElement
		*/
		getControlBoxElement() {
			return this.controlBox;
		}
		/**
		* Target element to be dragged in moveable
		* @method Moveable#getDragElement
		*/
		getDragElement() {
			return this._dragTarget;
		}
		/**
		* Check if the target is an element included in the moveable.
		* @method Moveable#isMoveableElement
		* @param - the target
		* @example
		* import Moveable from "moveable";
		*
		* const moveable = new Moveable(document.body);
		*
		* window.addEventListener("click", e => {
		*     if (!moveable.isMoveableElement(e.target)) {
		*         moveable.target = e.target;
		*     }
		* });
		*/
		isMoveableElement(target) {
			return target && (target.getAttribute?.("class") || "").indexOf("moveable-") > -1;
		}
		/**
		* You can drag start the Moveable through the external `MouseEvent`or `TouchEvent`. (Angular: ngDragStart)
		* @method Moveable#dragStart
		* @param - external `MouseEvent`or `TouchEvent`
		* @example
		* import Moveable from "moveable";
		*
		* const moveable = new Moveable(document.body);
		*
		* document.body.addEventListener("mousedown", e => {
		*     if (!moveable.isMoveableElement(e.target)) {
		*          moveable.dragStart(e);
		*     }
		* });
		*/
		dragStart(e, target = e.target) {
			const targetGesto = this.targetGesto;
			const controlGesto = this.controlGesto;
			if (targetGesto && checkMoveableTarget(this)({ inputEvent: e }, target)) {
				if (!targetGesto.isFlag()) targetGesto.triggerDragStart(e);
			} else if (controlGesto && this.isMoveableElement(target)) {
				if (!controlGesto.isFlag()) controlGesto.triggerDragStart(e);
			}
			return this;
		}
		/**
		* Hit test an element or rect on a moveable target.
		* (100% = 100)
		* @method Moveable#hitTest
		* @param - element or rect to test
		* @return - Get hit test rate (rate > 0 is hitted)
		* @example
		* import Moveable from "moveable";
		*
		* const moveable = new Moveable(document.body);
		*
		* document.body.addEventListener("mousedown", e => {
		*     if (moveable.hitTest(e.target) > 0) {
		*          console.log("hiited");
		*     }
		* });
		*/
		hitTest(el) {
			const { target, pos1, pos2, pos3, pos4, targetClientRect } = this.state;
			if (!target) return 0;
			let rect;
			if (isNode(el)) {
				const clientRect = el.getBoundingClientRect();
				rect = {
					left: clientRect.left,
					top: clientRect.top,
					width: clientRect.width,
					height: clientRect.height
				};
			} else rect = {
				width: 0,
				height: 0,
				...el
			};
			const { left: rectLeft, top: rectTop, width: rectWidth, height: rectHeight } = rect;
			const points = fitPoints([
				pos1,
				pos2,
				pos4,
				pos3
			], targetClientRect);
			const size = getOverlapSize(points, [
				[rectLeft, rectTop],
				[rectLeft + rectWidth, rectTop],
				[rectLeft + rectWidth, rectTop + rectHeight],
				[rectLeft, rectTop + rectHeight]
			]);
			const totalSize = getAreaSize(points);
			if (!size || !totalSize) return 0;
			return Math.min(100, size / totalSize * 100);
		}
		/**
		* Whether the coordinates are inside Moveable
		* @method Moveable#isInside
		* @param - x coordinate
		* @param - y coordinate
		* @return - True if the coordinate is in moveable or false
		* @example
		* import Moveable from "moveable";
		*
		* const moveable = new Moveable(document.body);
		*
		* document.body.addEventListener("mousedown", e => {
		*     if (moveable.isInside(e.clientX, e.clientY)) {
		*          console.log("inside");
		*     }
		* });
		*/
		isInside(clientX, clientY) {
			const { target, pos1, pos2, pos3, pos4, targetClientRect } = this.state;
			if (!target) return false;
			return isInside([clientX, clientY], fitPoints([
				pos1,
				pos2,
				pos4,
				pos3
			], targetClientRect));
		}
		/**
		* If the width, height, left, and top of all elements change, update the shape of the moveable.
		* @method Moveable#updateRect
		* @example
		* import Moveable from "moveable";
		*
		* const moveable = new Moveable(document.body);
		*
		* window.addEventListener("resize", e => {
		*     moveable.updateRect();
		* });
		*/
		updateRect(type, isTarget, isSetState = true) {
			const props = this.props;
			const isSingle = !props.parentPosition && !props.wrapperMoveable;
			if (isSingle) setStoreCache(true);
			const parentMoveable = props.parentMoveable;
			const target = this.state.target || props.target;
			const container = this.getContainer();
			const rootContainer = parentMoveable ? parentMoveable._rootContainer : this._rootContainer;
			const nextState = getMoveableTargetInfo(this.controlBox, target, container, container, rootContainer || container, this._getRequestStyles());
			if (!target && this._hasFirstTarget && props.persistData) {
				const persistState = getPersistState(props.persistData);
				for (const name in persistState) nextState[name] = persistState[name];
			}
			if (isSingle) setStoreCache();
			this.updateState(nextState, parentMoveable ? false : isSetState);
		}
		/**
		* Check if the moveable state is being dragged.
		* @method Moveable#isDragging
		* @param - If you want to check if able is dragging, specify ableName.
		* @example
		* import Moveable from "moveable";
		*
		* const moveable = new Moveable(document.body);
		*
		* // false
		* console.log(moveable.isDragging());
		*
		* moveable.on("drag", () => {
		*   // true
		*   console.log(moveable.isDragging());
		* });
		*/
		isDragging(ableName) {
			const targetGesto = this.targetGesto;
			const controlGesto = this.controlGesto;
			if (targetGesto?.isFlag()) {
				if (!ableName) return true;
				return !!targetGesto.getEventData()[ableName]?.isEventStart;
			}
			if (controlGesto?.isFlag()) {
				if (!ableName) return true;
				return !!controlGesto.getEventData()[ableName]?.isEventStart;
			}
			return false;
		}
		/**
		* If the width, height, left, and top of the only target change, update the shape of the moveable.
		* Use `.updateRect()` method
		* @method Moveable#updateTarget
		* @deprecated
		* @example
		* import Moveable from "moveable";
		*
		* const moveable = new Moveable(document.body);
		*
		* moveable.updateTarget();
		*/
		updateTarget(type) {
			this.updateRect(type, true);
		}
		/**
		* You can get the vertex information, position and offset size information of the target based on the container.
		* @method Moveable#getRect
		* @return - The Rect Info
		* @example
		* import Moveable from "moveable";
		*
		* const moveable = new Moveable(document.body);
		*
		* const rectInfo = moveable.getRect();
		*/
		getRect() {
			const state = this.state;
			const poses = getAbsolutePosesByState(this.state);
			const [pos1, pos2, pos3, pos4] = poses;
			const rect = getRect(poses);
			const { width: offsetWidth, height: offsetHeight } = state;
			const { width, height, left, top } = rect;
			const statePos = [state.left, state.top];
			const origin = plus(statePos, state.origin);
			return {
				width,
				height,
				left,
				top,
				pos1,
				pos2,
				pos3,
				pos4,
				offsetWidth,
				offsetHeight,
				beforeOrigin: plus(statePos, state.beforeOrigin),
				origin,
				transformOrigin: state.transformOrigin,
				rotation: this.getRotation()
			};
		}
		/**
		* Get a manager that manages the moveable's state and props.
		* @method Moveable#getManager
		* @return - The Rect Info
		* @example
		* import Moveable from "moveable";
		*
		* const moveable = new Moveable(document.body);
		*
		* const manager = moveable.getManager(); // real moveable class instance
		*/
		getManager() {
			return this;
		}
		/**
		* You can stop the dragging currently in progress through a method from outside.
		* @method Moveable#stopDrag
		* @return - The Rect Info
		* @example
		* import Moveable from "moveable";
		*
		* const moveable = new Moveable(document.body);
		*
		* moveable.stopDrag();
		*/
		stopDrag(type) {
			if (!type || type === "target") {
				const gesto = this.targetGesto;
				if (gesto?.isIdle() === false) unsetAbles(this, false);
				gesto?.stop();
			}
			if (!type || type === "control") {
				const gesto = this.controlGesto;
				if (gesto?.isIdle() === false) unsetAbles(this, true);
				gesto?.stop();
			}
		}
		getRotation() {
			const { pos1, pos2, direction } = this.state;
			return getAbsoluteRotation(pos1, pos2, direction);
		}
		/**
		* Request able through a method rather than an event.
		* At the moment of execution, requestStart is executed,
		* and then request and requestEnd can be executed through Requester.
		* @method Moveable#request
		* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Draggable.html#request|Draggable Requester}
		* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Resizable.html#request|Resizable Requester}
		* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Scalable.html#request|Scalable Requester}
		* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Rotatable.html#request|Rotatable Requester}
		* @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.OriginDraggable.html#request|OriginDraggable Requester}
		* @param - ableName
		* @param - request to be able params.
		* @param - If isInstant is true, request and requestEnd are executed immediately.
		* @return - Able Requester. If there is no request in able, nothing will work.
		* @example
		* import Moveable from "moveable";
		*
		* const moveable = new Moveable(document.body);
		*
		* // Instantly Request (requestStart - request - requestEnd)
		* moveable.request("draggable", { deltaX: 10, deltaY: 10 }, true);
		*
		* // Start move
		* const requester = moveable.request("draggable");
		* requester.request({ deltaX: 10, deltaY: 10 });
		* requester.request({ deltaX: 10, deltaY: 10 });
		* requester.request({ deltaX: 10, deltaY: 10 });
		* requester.requestEnd();
		*/
		request(ableName, param = {}, isInstant) {
			const self = this;
			const props = self.props;
			const manager = props.parentMoveable || props.wrapperMoveable || self;
			const allAbles = manager.props.ables;
			const groupable = props.groupable;
			const requsetAble = find$1(allAbles, (able) => able.name === ableName);
			if (this.isDragging() || !requsetAble || !requsetAble.request) return {
				request() {
					return this;
				},
				requestEnd() {
					return this;
				}
			};
			const ableRequester = requsetAble.request(self);
			const requestInstant = isInstant || param.isInstant;
			const ableType = ableRequester.isControl ? "controlAbles" : "targetAbles";
			const eventAffix = `${groupable ? "Group" : ""}${ableRequester.isControl ? "Control" : ""}`;
			const moveableAbles = [...manager[ableType]];
			const requester = {
				request(ableParam) {
					triggerAble(self, moveableAbles, ["drag"], eventAffix, "", {
						...ableRequester.request(ableParam),
						requestAble: ableName,
						isRequest: true
					}, requestInstant);
					return requester;
				},
				requestEnd() {
					triggerAble(self, moveableAbles, ["drag"], eventAffix, "End", {
						...ableRequester.requestEnd(),
						requestAble: ableName,
						isRequest: true
					}, requestInstant);
					return requester;
				}
			};
			triggerAble(self, moveableAbles, ["drag"], eventAffix, "Start", {
				...ableRequester.requestStart(param),
				requestAble: ableName,
				isRequest: true
			}, requestInstant);
			return requestInstant ? requester.request(param).requestEnd() : requester;
		}
		/**
		* moveable is the top level that manages targets
		* `Single`: MoveableManager instance
		* `Group`: MoveableGroup instance
		* `IndividualGroup`: MoveableIndividaulGroup instance
		* Returns leaf target MoveableManagers.
		*/
		getMoveables() {
			return [this];
		}
		/**
		* Remove the Moveable object and the events.
		* @method Moveable#destroy
		* @example
		* import Moveable from "moveable";
		*
		* const moveable = new Moveable(document.body);
		*
		* moveable.destroy();
		*/
		destroy() {
			this.componentWillUnmount();
		}
		updateRenderPoses() {
			const state = this.getState();
			const props = this.props;
			const padding = props.padding;
			const { originalBeforeOrigin, transformOrigin, allMatrix, is3d, pos1, pos2, pos3, pos4, left: stateLeft, top: stateTop, isPersisted } = state;
			const zoom = props.zoom || 1;
			if (!padding && zoom <= 1) {
				state.renderPoses = [
					pos1,
					pos2,
					pos3,
					pos4
				];
				state.renderLines = [
					[pos1, pos2],
					[pos2, pos4],
					[pos4, pos3],
					[pos3, pos1]
				];
				return;
			}
			const { left, top, bottom, right } = getPaddingBox(padding || {});
			const n = is3d ? 4 : 3;
			let absoluteOrigin;
			if (isPersisted) absoluteOrigin = transformOrigin;
			else if (this.controlBox && props.groupable) absoluteOrigin = originalBeforeOrigin;
			else absoluteOrigin = plus(originalBeforeOrigin, [stateLeft, stateTop]);
			const nextMatrix = multiplies(n, createOriginMatrix(absoluteOrigin.map((v) => -v), n), allMatrix, createOriginMatrix(transformOrigin, n));
			const renderPos1 = calculatePadding(nextMatrix, pos1, [-left, -top], n);
			const renderPos2 = calculatePadding(nextMatrix, pos2, [right, -top], n);
			const renderPos3 = calculatePadding(nextMatrix, pos3, [-left, bottom], n);
			const renderPos4 = calculatePadding(nextMatrix, pos4, [right, bottom], n);
			state.renderPoses = [
				renderPos1,
				renderPos2,
				renderPos3,
				renderPos4
			];
			state.renderLines = [
				[renderPos1, renderPos2],
				[renderPos2, renderPos4],
				[renderPos4, renderPos3],
				[renderPos3, renderPos1]
			];
			if (zoom) {
				const zoomOffset = zoom / 2;
				state.renderLines = [
					[calculatePadding(nextMatrix, pos1, [-left - zoomOffset, -top], n), calculatePadding(nextMatrix, pos2, [right + zoomOffset, -top], n)],
					[calculatePadding(nextMatrix, pos2, [right, -top - zoomOffset], n), calculatePadding(nextMatrix, pos4, [right, bottom + zoomOffset], n)],
					[calculatePadding(nextMatrix, pos4, [right + zoomOffset, bottom], n), calculatePadding(nextMatrix, pos3, [-left - zoomOffset, bottom], n)],
					[calculatePadding(nextMatrix, pos3, [-left, bottom + zoomOffset], n), calculatePadding(nextMatrix, pos1, [-left, -top - zoomOffset], n)]
				];
			}
		}
		checkUpdate() {
			this._isPropTargetChanged = false;
			const { target, container, parentMoveable } = this.props;
			const { target: stateTarget, container: stateContainer } = this.state;
			if (!stateTarget && !target) return;
			this.updateAbles();
			const isTargetChanged = !equals(stateTarget, target);
			if (!(isTargetChanged || !equals(stateContainer, container))) return;
			const moveableContainer = container || this.controlBox;
			if (moveableContainer) this.unsetAbles();
			this.updateState({
				target,
				container
			});
			if (!parentMoveable && moveableContainer) this.updateRect("End", false, false);
			this._isPropTargetChanged = isTargetChanged;
		}
		waitToChangeTarget() {
			return new Promise(() => {});
		}
		triggerEvent(name, e) {
			const props = this.props;
			this._emitter.trigger(name, e);
			if (props.parentMoveable && e.isRequest && !e.isRequestChild) return props.parentMoveable.triggerEvent(name, e, true);
			const callback = props[name];
			return callback && callback(e);
		}
		useCSS(tag, css) {
			const customStyleMap = this.props.customStyledMap;
			const key = tag + css;
			if (!customStyleMap[key]) customStyleMap[key] = styled(tag, css);
			return customStyleMap[key];
		}
		getState() {
			const props = this.props;
			if (props.target || props.targets?.length) this._hasFirstTarget = true;
			const hasControlBox = this.controlBox;
			const persistData = props.persistData;
			const firstRenderState = props.firstRenderState;
			if (firstRenderState && !hasControlBox) return firstRenderState;
			if (!this._hasFirstTarget && persistData) {
				const persistState = getPersistState(persistData);
				if (persistState) {
					this.updateState(persistState, false);
					return this.state;
				}
			}
			this.state.isPersisted = false;
			return this.state;
		}
		updateSelectors() {}
		unsetAbles() {
			this.targetAbles.forEach((able) => {
				if (able.unset) able.unset(this);
			});
		}
		updateAbles(ables = this.props.ables, eventAffix = "") {
			const triggerAblesSimultaneously = this.props.triggerAblesSimultaneously;
			const enabledAbles = this.getEnabledAbles(ables);
			const dragStart = `drag${eventAffix}Start`;
			const pinchStart = `pinch${eventAffix}Start`;
			const dragControlStart = `drag${eventAffix}ControlStart`;
			const targetAbles = filterAbles(enabledAbles, [dragStart, pinchStart], triggerAblesSimultaneously);
			const controlAbles = filterAbles(enabledAbles, [dragControlStart], triggerAblesSimultaneously);
			this.enabledAbles = enabledAbles;
			this.targetAbles = targetAbles;
			this.controlAbles = controlAbles;
		}
		updateState(nextState, isSetState) {
			if (isSetState) {
				if (this.isUnmounted) return;
				this.setState(nextState);
			} else {
				const state = this.state;
				for (const name in nextState) state[name] = nextState[name];
			}
		}
		getEnabledAbles(ables = this.props.ables) {
			const props = this.props;
			return ables.filter((able) => able && (able.always && props[able.name] !== false || props[able.name]));
		}
		renderAbles() {
			const triggerAblesSimultaneously = this.props.triggerAblesSimultaneously;
			const Renderer = { createElement };
			this.renderState = {};
			return groupByMap(flat$1(filterAbles(this.getEnabledAbles(), ["render"], triggerAblesSimultaneously).map(({ render }) => {
				return render(this, Renderer) || [];
			})).filter((el) => el), ({ key }) => key).map((group) => group[0]);
		}
		updateCheckInput() {
			this.targetGesto && (this.targetGesto.options.checkInput = this.props.checkInput);
		}
		_getRequestStyles() {
			return this.getEnabledAbles().reduce((names, able) => {
				const ableStyleNames = able.requestStyle?.() ?? [];
				return [...names, ...ableStyleNames];
			}, [...this.props.requestStyles || []]);
		}
		_updateObserver(prevProps) {
			this._updateResizeObserver(prevProps);
			this._updateMutationObserver(prevProps);
		}
		_updateEvents() {
			const hasTargetAble = this.targetAbles.length;
			const hasControlAble = this.controlAbles.length;
			const target = this._dragTarget;
			if (!hasTargetAble && this.targetGesto || this._isTargetChanged(true)) {
				unsetGesto(this, false);
				this.updateState({ gestos: {} });
			}
			if (!hasControlAble) unsetGesto(this, true);
			if (target && hasTargetAble && !this.targetGesto) this.targetGesto = getTargetAbleGesto(this, target, "");
			if (!this.controlGesto && hasControlAble) this.controlGesto = getControlAbleGesto(this, "Control");
		}
		_updateTargets() {
			const props = this.props;
			this._prevPropTarget = this._propTarget;
			this._prevDragTarget = this._dragTarget;
			this._prevOriginalDragTarget = this._originalDragTarget;
			this._prevDragArea = props.dragArea;
			this._propTarget = props.target;
			this._originalDragTarget = props.dragTarget || props.target;
			this._dragTarget = getRefTarget(this._originalDragTarget, true);
		}
		_renderLines() {
			const { zoom, hideDefaultLines, hideChildMoveableDefaultLines, parentMoveable } = this.props;
			if (hideDefaultLines || parentMoveable && hideChildMoveableDefaultLines) return [];
			const state = this.getState();
			const Renderer = { createElement };
			return state.renderLines.map((line, i) => {
				return renderLine(Renderer, "", line[0], line[1], zoom, `render-line-${i}`);
			});
		}
		_isTargetChanged(useDragArea) {
			const props = this.props;
			const nextTarget = props.dragTarget || props.target;
			const prevTarget = this._prevOriginalDragTarget;
			const prevDragArea = this._prevDragArea;
			const dragArea = props.dragArea;
			return !dragArea && prevTarget !== nextTarget || (useDragArea || dragArea) && prevDragArea !== dragArea || this._prevPropTarget != this._propTarget;
		}
		_updateNativeEvents() {
			const target = this.props.dragArea ? this.areaElement : this.state.target;
			const events = this.events;
			const eventKeys = getKeys(events);
			if (this._isTargetChanged()) for (const eventName in events) {
				const manager = events[eventName];
				manager && manager.destroy();
				events[eventName] = null;
			}
			if (!target) return;
			const enabledAbles = this.enabledAbles;
			eventKeys.forEach((eventName) => {
				const ables = filterAbles(enabledAbles, [eventName]);
				const hasAbles = ables.length > 0;
				let manager = events[eventName];
				if (!hasAbles) {
					if (manager) {
						manager.destroy();
						events[eventName] = null;
					}
					return;
				}
				if (!manager) {
					manager = new EventManager(target, this, eventName);
					events[eventName] = manager;
				}
				manager.setAbles(ables);
			});
		}
		_checkUpdateRootContainer() {
			const rootContainer = this.props.rootContainer;
			if (!this._rootContainer && rootContainer) this._rootContainer = getRefTarget(rootContainer, true);
		}
		_checkUpdateViewContainer() {
			const viewContainerOption = this.props.viewContainer;
			if (!this._viewContainer && viewContainerOption) this._viewContainer = getRefTarget(viewContainerOption, true);
			if (this._viewContainer) this._changeAbleViewClassNames([...this._getAbleViewClassNames(), this.isDragging() ? VIEW_DRAGGING : ""]);
		}
		_changeAbleViewClassNames(classNames) {
			const viewContainer = this._viewContainer;
			const nextClassNames = groupBy(classNames.filter(Boolean), (el) => el).map(([className]) => className);
			const prevClassNames = this._viewClassNames;
			const { removed, added } = diff$1(prevClassNames, nextClassNames);
			removed.forEach((index) => {
				removeClass(viewContainer, prevClassNames[index]);
			});
			added.forEach((index) => {
				addClass(viewContainer, nextClassNames[index]);
			});
			this._viewClassNames = nextClassNames;
		}
		_getAbleViewClassNames() {
			return (this.getEnabledAbles().map((able) => {
				return able.viewClassName?.(this) || "";
			}).join(" ") + ` ${this._getAbleClassName("-view")}`).split(/\s+/g);
		}
		_getAbleClassName(classPrefix = "") {
			const ables = this.getEnabledAbles();
			const targetGesto = this.targetGesto;
			const controlGesto = this.controlGesto;
			const targetGestoData = targetGesto?.isFlag() ? targetGesto.getEventData() : {};
			const controlGestoData = controlGesto?.isFlag() ? controlGesto.getEventData() : {};
			return ables.map((able) => {
				const name = able.name;
				let className = able.className?.(this) || "";
				if (targetGestoData[name]?.isEventStart || controlGestoData[name]?.isEventStart) className += ` ${prefix(`${name}${classPrefix}-dragging`)}`;
				return className.trim();
			}).filter(Boolean).join(" ");
		}
		_updateResizeObserver(prevProps) {
			const props = this.props;
			const target = props.target;
			const win = getWindow(this.getControlBoxElement());
			if (!win.ResizeObserver || !target || !props.useResizeObserver) {
				this._reiszeObserver?.disconnect();
				return;
			}
			if (prevProps.target === target && this._reiszeObserver) return;
			const observer = new win.ResizeObserver(this.checkUpdateRect);
			observer.observe(target, { box: "border-box" });
			this._reiszeObserver = observer;
		}
		_updateMutationObserver(prevProps) {
			const props = this.props;
			const target = props.target;
			const win = getWindow(this.getControlBoxElement());
			if (!win.MutationObserver || !target || !props.useMutationObserver) {
				this._mutationObserver?.disconnect();
				return;
			}
			if (prevProps.target === target && this._mutationObserver) return;
			const observer = new win.MutationObserver((records) => {
				for (const mutation of records) if (mutation.type === "attributes" && mutation.attributeName === "style") this.checkUpdateRect();
			});
			observer.observe(target, { attributes: true });
			this._mutationObserver = observer;
		}
	};
	/**
	* The target to indicate Moveable Control Box.
	* @name Moveable#target
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	* moveable.target = document.querySelector(".target");
	*/
	/**
	* Zooms in the elements of a moveable.
	* @name Moveable#zoom
	* @default 1
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	* moveable.zoom = 2;
	*/
	/**
	* Whether the target size is detected and updated whenever it changes.
	* @name Moveable#useResizeObserver
	* @default false
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	* moveable.useResizeObserver = true;
	*/
	/**
	* Resize, Scale Events at edges
	* @name Moveable#edge
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	* moveable.edge = true;
	*/
	/**
	* You can specify the className of the moveable controlbox.
	* @name Moveable#className
	* @default ""
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*   className: "",
	* });
	*
	* moveable.className = "moveable1";
	*/
	/**
	* The target(s) to drag Moveable target(s)
	* @name Moveable#dragTarget
	* @default target
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body);
	* moveable.target = document.querySelector(".target");
	* moveable.dragTarget = document.querySelector(".dragTarget");
	*/
	/**
	* `renderStart` event occurs at the first start of all events.
	* @memberof Moveable
	* @event renderStart
	* @param {Moveable.OnRenderStart} - Parameters for the `renderStart` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: document.querySelector(".target"),
	* });
	* moveable.on("renderStart", ({ target }) => {
	*     console.log("onRenderStart", target);
	* });
	*/
	/**
	* `render` event occurs before the target is drawn on the screen.
	* @memberof Moveable
	* @event render
	* @param {Moveable.OnRender} - Parameters for the `render` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: document.querySelector(".target"),
	* });
	* moveable.on("render", ({ target }) => {
	*     console.log("onRender", target);
	* });
	*/
	/**
	* `renderEnd` event occurs at the end of all events.
	* @memberof Moveable
	* @event renderEnd
	* @param {Moveable.OnRenderEnd} - Parameters for the `renderEnd` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: document.querySelector(".target"),
	* });
	* moveable.on("renderEnd", ({ target }) => {
	*     console.log("onRenderEnd", target);
	* });
	*/
	/**
	* `renderGroupStart` event occurs at the first start of all events in group.
	* @memberof Moveable
	* @event renderGroupStart
	* @param {Moveable.OnRenderGroupStart} - Parameters for the `renderGroupStart` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	* });
	* moveable.on("renderGroupStart", ({ targets }) => {
	*     console.log("onRenderGroupStart", targets);
	* });
	*/
	/**
	* `renderGroup` event occurs before the target is drawn on the screen in group.
	* @memberof Moveable
	* @event renderGroup
	* @param {Moveable.OnRenderGroup} - Parameters for the `renderGroup` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	* });
	* moveable.on("renderGroup", ({ targets }) => {
	*     console.log("onRenderGroup", targets);
	* });
	*/
	/**
	* `renderGroupEnd` event occurs at the end of all events in group.
	* @memberof Moveable
	* @event renderGroupEnd
	* @param {Moveable.OnRenderGroupEnd} - Parameters for the `renderGroupEnd` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	* });
	* moveable.on("renderGroupEnd", ({ targets }) => {
	*     console.log("onRenderGroupEnd", targets);
	* });
	*/
	var Groupable_default = {
		name: "groupable",
		props: [
			"defaultGroupRotate",
			"useDefaultGroupRotate",
			"defaultGroupOrigin",
			"groupable",
			"groupableProps",
			"targetGroups",
			"hideChildMoveableDefaultLines"
		],
		events: [],
		render(moveable, React) {
			const props = moveable.props;
			let targets = props.targets || [];
			const { left, top, isPersisted } = moveable.getState();
			const zoom = props.zoom || 1;
			const renderGroupRects = moveable.renderGroupRects;
			let persistDatChildren = props.persistData?.children || [];
			if (isPersisted) targets = persistDatChildren.map(() => null);
			else persistDatChildren = [];
			const parentPosition = watchValue(moveable, "parentPosition", [left, top], (styles) => styles.join(","));
			const requestStyles = watchValue(moveable, "requestStyles", moveable.getRequestChildStyles(), (styles) => styles.join(","));
			moveable.moveables = moveable.moveables.slice(0, targets.length);
			return [...targets.map((target, i) => {
				return /* @__PURE__ */ React.createElement(MoveableManager$1, {
					key: "moveable" + i,
					ref: refs(moveable, "moveables", i),
					target,
					origin: false,
					requestStyles,
					cssStyled: props.cssStyled,
					customStyledMap: props.customStyledMap,
					useResizeObserver: props.useResizeObserver,
					useMutationObserver: props.useMutationObserver,
					hideChildMoveableDefaultLines: props.hideChildMoveableDefaultLines,
					parentMoveable: moveable,
					parentPosition: [left, top],
					persistData: persistDatChildren[i],
					zoom
				});
			}), ...flat$1(renderGroupRects.map(({ pos1, pos2, pos3, pos4 }, i) => {
				const poses = [
					pos1,
					pos2,
					pos3,
					pos4
				];
				return [
					[0, 1],
					[1, 3],
					[3, 2],
					[2, 0]
				].map(([from, to], j) => {
					return renderLine(React, "", minus(poses[from], parentPosition), minus(poses[to], parentPosition), zoom, `group-rect-${i}-${j}`);
				});
			}))];
		}
	};
	var Clickable_default = makeAble$1("clickable", {
		props: ["clickable"],
		events: ["click", "clickGroup"],
		always: true,
		dragRelation: "weak",
		dragStart() {},
		dragControlStart() {},
		dragGroupStart(moveable, e) {
			e.datas.inputTarget = e.inputEvent && e.inputEvent.target;
		},
		dragEnd(moveable, e) {
			const target = moveable.props.target;
			const inputEvent = e.inputEvent;
			const inputTarget = e.inputTarget;
			const containsElement = !moveable.isMoveableElement(inputTarget) && moveable.controlBox.contains(inputTarget);
			if (!inputEvent || !inputTarget || e.isDrag || moveable.isMoveableElement(inputTarget) || containsElement) return;
			const containsTarget = target.contains(inputTarget);
			triggerEvent(moveable, "onClick", fillParams(moveable, e, {
				isDouble: e.isDouble,
				inputTarget,
				isTarget: target === inputTarget,
				moveableTarget: moveable.props.target,
				containsTarget
			}));
		},
		dragGroupEnd(moveable, e) {
			const inputEvent = e.inputEvent;
			const inputTarget = e.inputTarget;
			if (!inputEvent || !inputTarget || e.isDrag || moveable.isMoveableElement(inputTarget) || e.datas.inputTarget === inputTarget) return;
			const targets = moveable.props.targets;
			let targetIndex = targets.indexOf(inputTarget);
			const isTarget = targetIndex > -1;
			let containsTarget = false;
			if (targetIndex === -1) {
				targetIndex = findIndex(targets, (parentTarget) => parentTarget.contains(inputTarget));
				containsTarget = targetIndex > -1;
			}
			triggerEvent(moveable, "onClickGroup", fillParams(moveable, e, {
				isDouble: e.isDouble,
				targets,
				inputTarget,
				targetIndex,
				isTarget,
				containsTarget,
				moveableTarget: targets[targetIndex]
			}));
		},
		dragControlEnd(moveable, e) {
			this.dragEnd(moveable, e);
		},
		dragGroupControlEnd(moveable, e) {
			this.dragEnd(moveable, e);
		}
	});
	/**
	* When you click on the element, the `click` event is called.
	* @memberof Moveable
	* @event click
	* @param {Moveable.OnClick} - Parameters for the `click` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: document.querySelector(".target"),
	* });
	* moveable.on("click", ({ hasTarget, containsTarget, targetIndex }) => {
	*     // If you click on an element other than the target and not included in the target, index is -1.
	*     console.log("onClickGroup", target, hasTarget, containsTarget, targetIndex);
	* });
	*/
	/**
	* When you click on the element inside the group, the `clickGroup` event is called.
	* @memberof Moveable
	* @event clickGroup
	* @param {Moveable.OnClickGroup} - Parameters for the `clickGroup` event
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*     target: [].slice.call(document.querySelectorAll(".target")),
	* });
	* moveable.on("clickGroup", ({ inputTarget, isTarget, containsTarget, targetIndex }) => {
	*     // If you click on an element other than the target and not included in the target, index is -1.
	*     console.log("onClickGroup", inputTarget, isTarget, containsTarget, targetIndex);
	* });
	*/
	function getDraggableEvent(e) {
		let datas = e.originalDatas.draggable;
		if (!datas) {
			e.originalDatas.draggable = {};
			datas = e.originalDatas.draggable;
		}
		return {
			...e,
			datas
		};
	}
	var edgeDraggable_default = makeAble$1("edgeDraggable", {
		css: [`.edge.edgeDraggable.line {
cursor: move;
}`],
		render(moveable, React) {
			const props = moveable.props;
			const edge = props.edgeDraggable;
			if (!edge) return [];
			return renderEdgeLines(React, "edgeDraggable", edge, moveable.getState().renderPoses, props.zoom);
		},
		dragCondition(moveable, e) {
			const props = moveable.props;
			const target = e.inputEvent?.target;
			if (!props.edgeDraggable || !target) return false;
			return !props.draggable && hasClass(target, prefix("direction")) && hasClass(target, prefix("edge")) && hasClass(target, prefix("edgeDraggable"));
		},
		dragStart(moveable, e) {
			return Draggable_default.dragStart(moveable, getDraggableEvent(e));
		},
		drag(moveable, e) {
			return Draggable_default.drag(moveable, getDraggableEvent(e));
		},
		dragEnd(moveable, e) {
			return Draggable_default.dragEnd(moveable, getDraggableEvent(e));
		},
		dragGroupCondition(moveable, e) {
			const props = moveable.props;
			const target = e.inputEvent?.target;
			if (!props.edgeDraggable || !target) return false;
			return !props.draggable && hasClass(target, prefix("direction")) && hasClass(target, prefix("line"));
		},
		dragGroupStart(moveable, e) {
			return Draggable_default.dragGroupStart(moveable, getDraggableEvent(e));
		},
		dragGroup(moveable, e) {
			return Draggable_default.dragGroup(moveable, getDraggableEvent(e));
		},
		dragGroupEnd(moveable, e) {
			return Draggable_default.dragGroupEnd(moveable, getDraggableEvent(e));
		},
		unset(moveable) {
			return Draggable_default.unset(moveable);
		}
	});
	/**
	* Whether to move by dragging the edge line (default: false)
	* @name Moveable.Draggable#edgeDraggable
	* @example
	* import Moveable from "moveable";
	*
	* const moveable = new Moveable(document.body, {
	*  draggable: true,
	*  edgeDraggable: false,
	* });
	*
	* moveable.edgeDraggable = true;
	*/
	var IndividualGroupable_default = {
		name: "individualGroupable",
		props: ["individualGroupable", "individualGroupableProps"],
		events: []
	};
	const MOVEABLE_ABLES = [
		BeforeRenderable_default,
		Default_default,
		Snappable_default,
		Pinchable_default,
		Draggable_default,
		edgeDraggable_default,
		Resizable_default,
		Scalable_default,
		Warpable_default,
		Rotatable_default,
		Scrollable_default,
		Padding_default,
		Origin_default,
		OriginDraggable_default,
		Clippable_default,
		Roundable_default,
		Groupable_default,
		IndividualGroupable_default,
		Clickable_default,
		DragArea_default,
		Renderable_default
	];
	const MOVEABLE_EVENTS = /*#__PURE__*/ MOVEABLE_ABLES.reduce((current, able) => {
		(able.events || []).forEach((name) => {
			pushSet(current, name);
		});
		return current;
	}, []);
	const MOVEABLE_PROPS = /*#__PURE__*/ MOVEABLE_ABLES.reduce((current, able) => {
		(able.props || []).forEach((name) => {
			pushSet(current, name);
		});
		return current;
	}, []);
	function solveConstantsDistance([a, b, c], pos) {
		return (a * pos[0] + b * pos[1] + c) / Math.sqrt(a * a + b * b);
	}
	function solveC([a, b], pos) {
		return -a * pos[0] - b * pos[1];
	}
	function getMaxPos(poses, index) {
		return Math.max(...poses.map(([pos1, pos2, pos3, pos4]) => {
			return Math.max(pos1[index], pos2[index], pos3[index], pos4[index]);
		}));
	}
	function getMinPos(poses, index) {
		return Math.min(...poses.map(([pos1, pos2, pos3, pos4]) => {
			return Math.min(pos1[index], pos2[index], pos3[index], pos4[index]);
		}));
	}
	function getGroupRect(parentPoses, rotation) {
		let pos1 = [0, 0];
		let pos2 = [0, 0];
		let pos3 = [0, 0];
		let pos4 = [0, 0];
		let width = 0;
		let height = 0;
		if (!parentPoses.length) return {
			pos1,
			pos2,
			pos3,
			pos4,
			minX: 0,
			minY: 0,
			maxX: 0,
			maxY: 0,
			width,
			height,
			rotation
		};
		const fixedRotation = throttle(rotation, TINY_NUM$1);
		if (fixedRotation % 90) {
			const rad = fixedRotation / 180 * Math.PI;
			const a1 = Math.tan(rad);
			const a2 = -1 / a1;
			const a1MinMax = [MAX_NUM, MIN_NUM];
			const a1MinMaxPos = [[0, 0], [0, 0]];
			const a2MinMax = [MAX_NUM, MIN_NUM];
			const a2MinMaxPos = [[0, 0], [0, 0]];
			parentPoses.forEach((poses) => {
				poses.forEach((pos) => {
					const a1Dist = solveConstantsDistance([
						-a1,
						1,
						0
					], pos);
					const a2Dist = solveConstantsDistance([
						-a2,
						1,
						0
					], pos);
					if (a1MinMax[0] > a1Dist) {
						a1MinMaxPos[0] = pos;
						a1MinMax[0] = a1Dist;
					}
					if (a1MinMax[1] < a1Dist) {
						a1MinMaxPos[1] = pos;
						a1MinMax[1] = a1Dist;
					}
					if (a2MinMax[0] > a2Dist) {
						a2MinMaxPos[0] = pos;
						a2MinMax[0] = a2Dist;
					}
					if (a2MinMax[1] < a2Dist) {
						a2MinMaxPos[1] = pos;
						a2MinMax[1] = a2Dist;
					}
				});
			});
			const [a1MinPos, a1MaxPos] = a1MinMaxPos;
			const [a2MinPos, a2MaxPos] = a2MinMaxPos;
			const minHorizontalLine = [
				-a1,
				1,
				solveC([-a1, 1], a1MinPos)
			];
			const maxHorizontalLine = [
				-a1,
				1,
				solveC([-a1, 1], a1MaxPos)
			];
			const minVerticalLine = [
				-a2,
				1,
				solveC([-a2, 1], a2MinPos)
			];
			const maxVerticalLine = [
				-a2,
				1,
				solveC([-a2, 1], a2MaxPos)
			];
			[pos1, pos2, pos3, pos4] = [
				[minHorizontalLine, minVerticalLine],
				[minHorizontalLine, maxVerticalLine],
				[maxHorizontalLine, minVerticalLine],
				[maxHorizontalLine, maxVerticalLine]
			].map(([line1, line2]) => getIntersectionPointsByConstants(line1, line2)[0]);
			width = a2MinMax[1] - a2MinMax[0];
			height = a1MinMax[1] - a1MinMax[0];
		} else {
			const minX = getMinPos(parentPoses, 0);
			const minY = getMinPos(parentPoses, 1);
			const maxX = getMaxPos(parentPoses, 0);
			const maxY = getMaxPos(parentPoses, 1);
			pos1 = [minX, minY];
			pos2 = [maxX, minY];
			pos3 = [minX, maxY];
			pos4 = [maxX, maxY];
			width = maxX - minX;
			height = maxY - minY;
			if (fixedRotation % 180) {
				const changedX = [
					pos3,
					pos1,
					pos4,
					pos2
				];
				[pos1, pos2, pos3, pos4] = changedX;
				width = maxY - minY;
				height = maxX - minX;
			}
		}
		if (fixedRotation % 360 > 180) {
			const changedX = [
				pos4,
				pos3,
				pos2,
				pos1
			];
			[pos1, pos2, pos3, pos4] = changedX;
		}
		const { minX, minY, maxX, maxY } = getMinMaxs([
			pos1,
			pos2,
			pos3,
			pos4
		]);
		return {
			pos1,
			pos2,
			pos3,
			pos4,
			width,
			height,
			minX,
			minY,
			maxX,
			maxY,
			rotation
		};
	}
	function findMoveableGroups(moveables, childTargetGroups) {
		const groups = childTargetGroups.map((targetGroup) => {
			if (isArray(targetGroup)) {
				const childMoveableGroups = findMoveableGroups(moveables, targetGroup);
				const length = childMoveableGroups.length;
				if (length > 1) return childMoveableGroups;
				else if (length === 1) return childMoveableGroups[0];
				else return null;
			} else {
				const checked = find$1(moveables, ({ manager }) => manager.props.target === targetGroup);
				if (checked) {
					checked.finded = true;
					return checked.manager;
				}
				return null;
			}
		}).filter(Boolean);
		if (groups.length === 1 && isArray(groups[0])) return groups[0];
		return groups;
	}
	/**
	* @namespace Moveable.Group
	* @description You can make targets moveable.
	*/
	var MoveableGroup = class extends MoveableManager$1 {
		constructor(..._args) {
			super(..._args);
			this.differ = new ChildrenDiffer();
			this.moveables = [];
			this.transformOrigin = "50% 50%";
			this.renderGroupRects = [];
			this._targetGroups = [];
			this._hasFirstTargets = false;
		}
		static {
			this.defaultProps = {
				...MoveableManager$1.defaultProps,
				transformOrigin: ["50%", "50%"],
				groupable: true,
				dragArea: true,
				keepRatio: true,
				targets: [],
				defaultGroupRotate: 0,
				defaultGroupOrigin: "50% 50%"
			};
		}
		componentDidMount() {
			super.componentDidMount();
		}
		checkUpdate() {
			this._isPropTargetChanged = false;
			this.updateAbles();
		}
		getTargets() {
			return this.props.targets;
		}
		updateRect(type, isTarget, isSetState = true) {
			const state = this.state;
			if (!this.controlBox || state.isPersisted) return;
			setStoreCache(true);
			this.moveables.forEach((moveable) => {
				moveable.updateRect(type, false, false);
			});
			const props = this.props;
			const moveables = this.moveables;
			const target = state.target || props.target;
			const checkeds = moveables.map((moveable) => ({
				finded: false,
				manager: moveable
			}));
			const targetGroups = this.props.targetGroups || [];
			const moveableGroups = findMoveableGroups(checkeds, targetGroups);
			const useDefaultGroupRotate = props.useDefaultGroupRotate;
			moveableGroups.push(...checkeds.filter(({ finded }) => !finded).map(({ manager }) => manager));
			const renderGroupRects = [];
			const isReset = !isTarget || type !== "" && props.updateGroup;
			let defaultGroupRotate = props.defaultGroupRotate || 0;
			if (!this._hasFirstTargets) {
				const persistedRoatation = props.persistData?.rotation;
				if (persistedRoatation != null) defaultGroupRotate = persistedRoatation;
			}
			function getMoveableGroupRect(group, parentRotation, isRoot) {
				const posesRotations = group.map((moveable) => {
					if (isArray(moveable)) {
						const rect = getMoveableGroupRect(moveable, parentRotation);
						const poses = [
							rect.pos1,
							rect.pos2,
							rect.pos3,
							rect.pos4
						];
						renderGroupRects.push(rect);
						return {
							poses,
							rotation: rect.rotation
						};
					} else return {
						poses: getAbsolutePosesByState(moveable.state),
						rotation: moveable.getRotation()
					};
				});
				const rotations = posesRotations.map(({ rotation }) => rotation);
				let groupRotation;
				const firstRotation = rotations[0];
				const isSameRotation = rotations.every((nextRotation) => {
					return Math.abs(firstRotation - nextRotation) < .1;
				});
				if (isReset) groupRotation = !useDefaultGroupRotate && isSameRotation ? firstRotation : defaultGroupRotate;
				else groupRotation = !useDefaultGroupRotate && !isRoot && isSameRotation ? firstRotation : parentRotation;
				return getGroupRect(posesRotations.map(({ poses }) => poses), groupRotation);
			}
			const rootGroupRect = getMoveableGroupRect(moveableGroups, this.rotation, true);
			if (isReset) {
				this.rotation = rootGroupRect.rotation;
				this.transformOrigin = props.defaultGroupOrigin || "50% 50%";
				this.scale = [1, 1];
			}
			this._targetGroups = targetGroups;
			this.renderGroupRects = renderGroupRects;
			const transformOrigin = this.transformOrigin;
			const rotation = this.rotation;
			const scale = this.scale;
			const { width, height, minX, minY } = rootGroupRect;
			const { minX: deltaX, minY: deltaY } = getMinMaxs(rotatePosesInfo([
				[0, 0],
				[width, 0],
				[0, height],
				[width, height]
			], convertTransformOriginArray(transformOrigin, width, height), this.rotation / 180 * Math.PI).result);
			const rotateScale = ` rotate(${rotation}deg) scale(${sign(scale[0])}, ${sign(scale[1])})`;
			const transform = `translate(${-deltaX}px, ${-deltaY}px)${rotateScale}`;
			this.controlBox.style.transform = `translate3d(${minX}px, ${minY}px, ${this.props.translateZ || 0})`;
			target.style.cssText += `left:0px;top:0px;transform-origin:${transformOrigin};width:${width}px;height:${height}px;transform: ${transform}`;
			state.width = width;
			state.height = height;
			const container = this.getContainer();
			const info = getMoveableTargetInfo(this.controlBox, target, this.controlBox, this.getContainer(), this._rootContainer || container, []);
			const pos = [info.left, info.top];
			const [pos1, pos2, pos3, pos4] = getAbsolutePosesByState(info);
			const minPos = getMinMaxs([
				pos1,
				pos2,
				pos3,
				pos4
			]);
			const delta = [minPos.minX, minPos.minY];
			const direction = sign(scale[0] * scale[1]);
			info.pos1 = minus(pos1, delta);
			info.pos2 = minus(pos2, delta);
			info.pos3 = minus(pos3, delta);
			info.pos4 = minus(pos4, delta);
			info.left = minX - info.left + delta[0];
			info.top = minY - info.top + delta[1];
			info.origin = minus(plus(pos, info.origin), delta);
			info.beforeOrigin = minus(plus(pos, info.beforeOrigin), delta);
			info.originalBeforeOrigin = plus(pos, info.originalBeforeOrigin);
			info.transformOrigin = minus(plus(pos, info.transformOrigin), delta);
			target.style.transform = `translate(${-deltaX - delta[0]}px, ${-deltaY - delta[1]}px)` + rotateScale;
			setStoreCache();
			this.updateState({
				...info,
				posDelta: delta,
				direction,
				beforeDirection: direction
			}, isSetState);
		}
		getRect() {
			return {
				...super.getRect(),
				children: this.moveables.map((child) => child.getRect())
			};
		}
		triggerEvent(name, e, isManager) {
			if (isManager || name.indexOf("Group") > -1) return super.triggerEvent(name, e);
			else this._emitter.trigger(name, e);
		}
		getRequestChildStyles() {
			return this.getEnabledAbles().reduce((names, able) => {
				const ableStyleNames = able.requestChildStyle?.() ?? [];
				return [...names, ...ableStyleNames];
			}, []);
		}
		getMoveables() {
			return [...this.moveables];
		}
		updateAbles() {
			super.updateAbles([...this.props.ables, Groupable_default], "Group");
		}
		_updateTargets() {
			super._updateTargets();
			this._originalDragTarget = this.props.dragTarget || this.areaElement;
			this._dragTarget = getRefTarget(this._originalDragTarget, true);
		}
		_updateEvents() {
			const state = this.state;
			const props = this.props;
			const prevTarget = this._prevDragTarget;
			const nextTarget = props.dragTarget || this.areaElement;
			const targets = props.targets;
			const { added, changed, removed } = this.differ.update(targets);
			const isTargetChanged = added.length || removed.length;
			if (isTargetChanged || this._prevOriginalDragTarget !== this._originalDragTarget) {
				unsetGesto(this, false);
				unsetGesto(this, true);
				this.updateState({ gestos: {} });
			}
			if (prevTarget !== nextTarget) state.target = null;
			if (!state.target) {
				state.target = this.areaElement;
				this.controlBox.style.display = "block";
			}
			if (state.target) {
				if (!this.targetGesto) this.targetGesto = getTargetAbleGesto(this, this._dragTarget, "Group");
				if (!this.controlGesto) this.controlGesto = getControlAbleGesto(this, "GroupControl");
			}
			const isContainerChanged = !equals(state.container, props.container);
			if (isContainerChanged) state.container = props.container;
			if (isContainerChanged || isTargetChanged || this.transformOrigin !== (props.defaultGroupOrigin || "50% 50%") || changed.length || targets.length && !isDeepArrayEquals(this._targetGroups, props.targetGroups || [])) {
				this.updateRect();
				this._hasFirstTargets = true;
			}
			this._isPropTargetChanged = !!isTargetChanged;
		}
		_updateObserver() {}
	};
	/**
	* @namespace Moveable.IndividualGroup
	* @description Create targets individually, not as a group.Create targets individually, not as a group.
	*/
	var MoveableIndividualGroup = class extends MoveableManager$1 {
		constructor(..._args) {
			super(..._args);
			this.moveables = [];
		}
		render() {
			const props = this.props;
			const { cspNonce, cssStyled: ControlBoxElement, persistData } = props;
			let targets = props.targets || [];
			const length = targets.length;
			const canPersist = this.isUnmounted || !length;
			let persistDatChildren = persistData?.children ?? [];
			if (canPersist && !length && persistDatChildren.length) targets = persistDatChildren.map(() => null);
			else if (!canPersist) persistDatChildren = [];
			return /* @__PURE__ */ createElement(ControlBoxElement, {
				cspNonce,
				ref: ref(this, "controlBox"),
				className: prefix("control-box")
			}, targets.map((target, i) => {
				const individualProps = props.individualGroupableProps?.(target, i) ?? {};
				return /* @__PURE__ */ createElement(MoveableManager$1, {
					key: "moveable" + i,
					ref: refs(this, "moveables", i),
					...props,
					...individualProps,
					target,
					wrapperMoveable: this,
					isWrapperMounted: this.isMoveableMounted,
					persistData: persistDatChildren[i]
				});
			}));
		}
		componentDidMount() {}
		componentDidUpdate() {}
		getTargets() {
			return this.props.targets;
		}
		updateRect(type, isTarget, isSetState = true) {
			setStoreCache(true);
			this.moveables.forEach((moveable) => {
				moveable.updateRect(type, isTarget, isSetState);
			});
			setStoreCache();
		}
		getRect() {
			return {
				...super.getRect(),
				children: this.moveables.map((child) => child.getRect())
			};
		}
		request(ableName, param = {}, isInstant) {
			const results = this.moveables.map((m) => m.request(ableName, {
				...param,
				isInstant: false
			}, false));
			const requestInstant = isInstant || param.isInstant;
			const requester = {
				request(ableParam) {
					results.forEach((r) => r.request(ableParam));
					return this;
				},
				requestEnd() {
					results.forEach((r) => r.requestEnd());
					return this;
				}
			};
			return requestInstant ? requester.request(param).requestEnd() : requester;
		}
		dragStart(e, target = e.target) {
			const inputTarget = target;
			const childMoveable = find$1(this.moveables, (child) => {
				const target = child.getTargets()[0];
				const controlBoxElement = child.getControlBoxElement();
				const dragElement = child.getDragElement();
				if (!target || !dragElement) return false;
				return dragElement === inputTarget || dragElement.contains(inputTarget) || dragElement !== target && target === inputTarget || target.contains(inputTarget) || controlBoxElement === inputTarget || controlBoxElement.contains(inputTarget);
			});
			if (childMoveable) childMoveable.dragStart(e, target);
			return this;
		}
		hitTest() {
			return 0;
		}
		isInside() {
			return false;
		}
		isDragging() {
			return false;
		}
		getDragElement() {
			return null;
		}
		getMoveables() {
			return [...this.moveables];
		}
		updateRenderPoses() {}
		checkUpdate() {}
		triggerEvent() {}
		updateAbles() {}
		_updateEvents() {}
		_updateObserver() {}
	};
	function __decorate$1(decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	}
	function getElementTargets(refTargets, selectorMap) {
		const elementTargets = [];
		refTargets.forEach((target) => {
			if (!target) return;
			if (isString(target)) {
				if (selectorMap[target]) elementTargets.push(...selectorMap[target]);
				return;
			}
			if (isArray(target)) elementTargets.push(...getElementTargets(target, selectorMap));
			else elementTargets.push(target);
		});
		return elementTargets;
	}
	function getTargetGroups(refTargets, selectorMap) {
		const targetGroups = [];
		refTargets.forEach((target) => {
			if (!target) return;
			if (isString(target)) {
				if (selectorMap[target]) targetGroups.push(...selectorMap[target]);
				return;
			}
			if (isArray(target)) targetGroups.push(getTargetGroups(target, selectorMap));
			else targetGroups.push(target);
		});
		return targetGroups;
	}
	function compareRefTargets(prevRefTargets, nextRefTargets) {
		return prevRefTargets.length !== nextRefTargets.length || prevRefTargets.some((target, i) => {
			const nextTarget = nextRefTargets[i];
			if (!target && !nextTarget) return false;
			else if (target != nextTarget) {
				if (isArray(target) && isArray(nextTarget)) return compareRefTargets(target, nextTarget);
				return true;
			}
			return false;
		});
	}
	var InitialMoveable = class extends PureComponent {
		constructor(..._args) {
			super(..._args);
			this.refTargets = [];
			this.selectorMap = {};
			this._differ = new ChildrenDiffer();
			this._elementTargets = [];
			this._tmpRefTargets = [];
			this._tmpSelectorMap = {};
			this._onChangeTargets = null;
		}
		static {
			this.defaultAbles = [];
		}
		static {
			this.customStyledMap = {};
		}
		static {
			this.defaultStyled = null;
		}
		static makeStyled() {
			const cssMap = {};
			this.getTotalAbles().forEach(({ css }) => {
				if (!css) return;
				css.forEach((text) => {
					cssMap[text] = true;
				});
			});
			const style = getKeys(cssMap).join("\n");
			this.defaultStyled = styled("div", prefixCSS(PREFIX, MOVEABLE_CSS + style));
		}
		static getTotalAbles() {
			return [
				Default_default,
				Groupable_default,
				IndividualGroupable_default,
				DragArea_default,
				...this.defaultAbles
			];
		}
		render() {
			const moveableContructor = this.constructor;
			if (!moveableContructor.defaultStyled) moveableContructor.makeStyled();
			const { ables: userAbles, props: userProps, ...props } = this.props;
			const [refTargets, nextSelectorMap] = this._updateRefs(true);
			const elementTargets = getElementTargets(refTargets, nextSelectorMap);
			let isGroup = elementTargets.length > 1;
			const ables = [...moveableContructor.getTotalAbles(), ...userAbles || []];
			const nextProps = {
				...props,
				...userProps || {},
				ables,
				cssStyled: moveableContructor.defaultStyled,
				customStyledMap: moveableContructor.customStyledMap
			};
			this._elementTargets = elementTargets;
			let firstRenderState = null;
			const prevMoveable = this.moveable;
			if (props.persistData?.children) isGroup = true;
			if (props.individualGroupable) return /* @__PURE__ */ createElement(MoveableIndividualGroup, {
				key: "individual-group",
				ref: ref(this, "moveable"),
				...nextProps,
				target: null,
				targets: elementTargets
			});
			if (isGroup) {
				const targetGroups = getTargetGroups(refTargets, nextSelectorMap);
				if (prevMoveable && !prevMoveable.props.groupable && !prevMoveable.props.individualGroupable) {
					const target = prevMoveable.props.target;
					if (target && elementTargets.indexOf(target) > -1) firstRenderState = { ...prevMoveable.state };
				}
				return /* @__PURE__ */ createElement(MoveableGroup, {
					key: "group",
					ref: ref(this, "moveable"),
					...nextProps,
					...props.groupableProps ?? {},
					target: null,
					targets: elementTargets,
					targetGroups,
					firstRenderState
				});
			} else {
				const target = elementTargets[0];
				if (prevMoveable && (prevMoveable.props.groupable || prevMoveable.props.individualGroupable)) {
					const prevTargetMoveable = find$1(prevMoveable.moveables || [], (mv) => mv.props.target === target);
					if (prevTargetMoveable) firstRenderState = { ...prevTargetMoveable.state };
				}
				return /* @__PURE__ */ createElement(MoveableManager$1, {
					key: "single",
					ref: ref(this, "moveable"),
					...nextProps,
					target,
					firstRenderState
				});
			}
		}
		componentDidMount() {
			this._checkChangeTargets();
		}
		componentDidUpdate() {
			this._checkChangeTargets();
		}
		componentWillUnmount() {
			this.selectorMap = {};
			this.refTargets = [];
		}
		/**
		* Get targets set in moveable through target or targets of props.
		* @method Moveable#getTargets
		* @example
		* import Moveable from "moveable";
		*
		* const moveable = new Moveable(document.body, {
		*    target: [targetRef, ".target", document.querySelectorAll(".target")],
		* });
		*
		* console.log(moveable.getTargets());
		*/
		getTargets() {
			return this.moveable?.getTargets() ?? [];
		}
		/**
		* If the element list corresponding to the selector among the targets is changed, it is updated.
		* @method Moveable#updateSelectors
		* @example
		* import Moveable from "moveable";
		*
		* const moveable = new Moveable(document.body, {
		*    target: ".target",
		* });
		*
		* moveable.updateSelectors();
		*/
		updateSelectors() {
			this.selectorMap = {};
			this._updateRefs();
			this.forceUpdate();
		}
		/**
		* User changes target and waits for target to change.
		* @method Moveable#waitToChangeTarget
		* @story combination-with-other-components--components-selecto
		* @example
		* document.querySelector(".target").addEventListener("mousedown", e => {
		*   moveable.waitToChangeTarget().then(() => {
		*      moveable.dragStart(e, e.currentTarget);
		*   });
		*   moveable.target = e.currentTarget;
		* });
		*/
		waitToChangeTarget() {
			let resolvePromise;
			this._onChangeTargets = () => {
				this._onChangeTargets = null;
				resolvePromise();
			};
			return new Promise((resolve) => {
				resolvePromise = resolve;
			});
		}
		waitToChangeTargets() {
			return this.waitToChangeTarget();
		}
		getManager() {
			return this.moveable;
		}
		getMoveables() {
			return this.moveable.getMoveables();
		}
		getDragElement() {
			return this.moveable.getDragElement();
		}
		_updateRefs(isRender) {
			const prevRefTargets = this.refTargets;
			const nextRefTargets = getRefTargets(this.props.target || this.props.targets);
			const isBrowser = typeof document !== "undefined";
			let isUpdate = compareRefTargets(prevRefTargets, nextRefTargets);
			const selectorMap = this.selectorMap;
			const nextSelectorMap = {};
			this.refTargets.forEach(function updateSelectorMap(target) {
				if (isString(target)) {
					if (selectorMap[target]) nextSelectorMap[target] = selectorMap[target];
					else if (isBrowser) {
						isUpdate = true;
						nextSelectorMap[target] = [].slice.call(document.querySelectorAll(target));
					}
				} else if (isArray(target)) target.forEach(updateSelectorMap);
			});
			this._tmpRefTargets = nextRefTargets;
			this._tmpSelectorMap = nextSelectorMap;
			return [
				nextRefTargets,
				nextSelectorMap,
				!isRender && isUpdate
			];
		}
		_checkChangeTargets() {
			this.refTargets = this._tmpRefTargets;
			this.selectorMap = this._tmpSelectorMap;
			const { added, removed } = this._differ.update(this._elementTargets);
			if (added.length || removed.length) {
				this.props.onChangeTargets?.({
					moveable: this.moveable,
					targets: this._elementTargets
				});
				this._onChangeTargets?.();
			}
			const [refTargets, selectorMap, isUpdate] = this._updateRefs();
			this.refTargets = refTargets;
			this.selectorMap = selectorMap;
			if (isUpdate) this.forceUpdate();
		}
	};
	__decorate$1([withMethods(MOVEABLE_METHODS)], InitialMoveable.prototype, "moveable", void 0);
	var Moveable$1 = class extends InitialMoveable {
		static {
			this.defaultAbles = MOVEABLE_ABLES;
		}
	};
	var src_default$1 = Moveable$1;
	//#endregion
	//#region src/InnerMoveable.tsx
	var InnerMoveable = class extends Component {
		constructor(props) {
			super(props);
			this.state = {};
			this.state = this.props;
		}
		render() {
			return /* @__PURE__ */ croact_esm_exports.createElement(src_default$1, {
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
			this.containerProvider = renderSelf(/* @__PURE__ */ croact_esm_exports.createElement(InnerMoveable, {
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
	var Moveable = class extends MoveableManager_default {};
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
	//#endregion
	return src_default;
});

//# sourceMappingURL=moveable.js.map