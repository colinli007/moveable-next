/*
Copyright (c) Daybrush
name: @moveable/helper
license: MIT
author: Daybrush
repository: https://github.com/daybrush/moveable/blob/master/packages/helper
version: 0.1.3
*/
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
let _daybrush_utils = require("@daybrush/utils");
//#region src/groups.ts
var Child = class {
	constructor(parent) {
		this.parent = parent;
		this.type = "single";
		this.depth = 0;
		this._scope = [];
		if (parent) this.depth = parent.depth + 1;
	}
	get scope() {
		const parent = this.parent;
		if (!parent || parent.type === "root") return [];
		return [...parent.scope, parent.id];
	}
};
var SingleChild = class extends Child {
	constructor(parent, value) {
		super(parent);
		this.value = value;
		this.type = "single";
		this.isGroupElement = false;
	}
};
var ArrayChild = class ArrayChild extends Child {
	constructor(..._args) {
		super(..._args);
		this.type = "group";
		this.value = [];
		this.id = "";
		this.groupElement = null;
		this.map = /* @__PURE__ */ new Map();
	}
	compare(groups, checker = 0) {
		const elements = (0, _daybrush_utils.deepFlat)(groups);
		const map = this.map;
		const elementsLength = elements.length;
		const mapSize = map.size;
		const sizeDiff = mapSize - elementsLength;
		const count = elements.filter((element) => map.has(element)).length;
		if (checker > 0 && sizeDiff >= 0 || checker === 0 && sizeDiff === 0) return elementsLength === count;
		else if (checker < 0 && sizeDiff <= 0) return mapSize === count;
		return false;
	}
	has(target) {
		return this.map.has(target);
	}
	contains(element) {
		if (this.has(element)) return true;
		return this.value.some((child) => {
			if (child.type === "group") return child.contains(element);
			else return false;
		});
	}
	findContainedChild(element) {
		return (0, _daybrush_utils.find)(this.value, (child) => {
			if (child.type === "single") return child.value === element;
			else return child.contains(element);
		});
	}
	/**
	* Exact group containing targets
	*/
	findExactChild(target) {
		const map = this.map;
		if (!(0, _daybrush_utils.isArray)(target)) return map.get(target);
		const flatted = (0, _daybrush_utils.deepFlat)(target);
		const length = flatted.length;
		const single = map.get(flatted[0]);
		if (!single) return;
		let parent = single.parent;
		while (parent) {
			if (parent.map.size >= length) return parent;
			parent = parent.parent;
		}
	}
	findCommonParent(targets) {
		let depth = Infinity;
		let childs = targets.map((target) => this.findExactChild(target));
		childs.forEach((child) => {
			if (!child) return;
			depth = Math.min(child.depth, depth);
		});
		while (depth) {
			--depth;
			childs = childs.map((child) => {
				let parent = child;
				while (parent && parent.depth !== depth) parent = parent.parent;
				return parent;
			});
			const firstChild = childs.find((child) => child);
			if (!firstChild) return this;
			if (childs.every((child) => !child || child === firstChild)) break;
		}
		return childs.find((child) => child) || this;
	}
	findNextChild(target, range = this.toTargetGroups(), isExact = true) {
		let nextChild = null;
		const length = range.length;
		range.some((child) => {
			if (!isExact && length === 1 && (0, _daybrush_utils.isArray)(child)) {
				nextChild = this.findNextChild(target, child);
				return nextChild;
			}
			const nextGroupChild = this.findExactChild(child);
			if (!nextGroupChild) return;
			if ("map" in nextGroupChild) {
				if (nextGroupChild.map.has(target)) {
					nextChild = nextGroupChild;
					return true;
				}
			}
		});
		return nextChild;
	}
	findNextExactChild(target, selected, range = this.toTargetGroups()) {
		const nextChild = this.findNextChild(target, range, true);
		if (!nextChild) return null;
		if (nextChild.compare(selected, -1)) return nextChild;
		return null;
	}
	/**
	* Finds a group that does not overlap within the range and includes the target.
	*/
	findPureChild(target, range) {
		let nextGroupChild = null;
		const childSelected = range.filter((element) => this.has(element));
		if (!childSelected.length) return this;
		this.value.some((nextChild) => {
			if (nextChild.type !== "single" && nextChild.has(target)) {
				nextGroupChild = nextChild.findPureChild(target, childSelected);
				if (nextGroupChild) return true;
			}
		});
		return nextGroupChild;
	}
	findNextPureChild(target, range) {
		const nextChild = this.findNextChild(target);
		if (nextChild) return nextChild.findPureChild(target, range);
		return null;
	}
	getSingleChild() {
		const groupElement = this.groupElement;
		if (groupElement) {
			const singleChild = this.parent?.value.find((t) => t.value === groupElement);
			if (singleChild) return singleChild;
		}
		return null;
	}
	toTargetGroups() {
		return this.value.map((child) => {
			if (child.type === "single") return child.value;
			else return child.toTargetGroups();
		});
	}
	findArrayChild(targets) {
		const { value } = this;
		let result = false;
		if (this.type !== "root") result = value.every((child) => {
			if (child.type === "single") return targets.some((target) => child.value === target);
			else return targets.some((target) => {
				return (0, _daybrush_utils.isArray)(target) && child.findArrayChild(target);
			});
		});
		if (result && targets.length === value.length) return this;
		else {
			let childResult = null;
			value.some((child) => {
				if (child.type === "group") {
					childResult = child.findArrayChild(targets);
					return childResult;
				}
			});
			return childResult;
		}
	}
	groupByPerfect(selected) {
		return this.value.filter((child) => {
			if (child.type !== "single") return child.compare(selected, -1);
			return selected.indexOf(child.value) > -1;
		}).map((child) => {
			if (child.type !== "single") {
				const singleChild = child.getSingleChild();
				if (singleChild) return singleChild;
			}
			return child;
		});
	}
	add(targets) {
		const { value, map } = this;
		targets.forEach((child) => {
			if ("groupId" in child) {
				const group = new ArrayChild(this);
				group.id = child.groupId;
				value.push(group);
				group.add(child.children);
			} else if ((0, _daybrush_utils.isArray)(child)) {
				const group = new ArrayChild(this);
				value.push(group);
				group.add(child);
			} else {
				const element = "current" in child ? child.current : child;
				const single = new SingleChild(this, element);
				value.push(single);
				map.set(element, single);
			}
		});
		value.forEach((child) => {
			if (child.type === "single") map.set(child.value, child);
			else child.map.forEach((nextChild, element) => {
				map.set(element, nextChild);
			});
		});
		value.forEach((child) => {
			if (child.type !== "single") return;
			const singleElement = child.value;
			const groupChild = value.find((child2) => {
				if (child2.type === "single") return;
				const firstElement = [...child2.map.keys()][0];
				if (!firstElement) return;
				return singleElement.contains(firstElement);
			});
			child.isGroupElement = !!groupChild;
			if (groupChild) groupChild.groupElement = child.value;
		});
		return parent;
	}
};
//#endregion
//#region src/GroupManager.ts
function toTargetList(raw) {
	function targets(childs = []) {
		const arr = [];
		childs.forEach((child) => {
			if (child.type === "single") arr.push(child.value);
			else arr.push(targets(child.value));
		});
		return arr;
	}
	return {
		raw: () => raw,
		targets() {
			return targets(this.raw());
		},
		flatten() {
			return (0, _daybrush_utils.deepFlat)(this.targets());
		}
	};
}
var GroupManager = class extends ArrayChild {
	constructor(targetGroups, targets) {
		super();
		this.type = "root";
		this._targets = [];
		this.set(targetGroups, targets);
	}
	set(targetGroups, targets = []) {
		this.map = /* @__PURE__ */ new Map();
		this.value = [];
		const map = this.map;
		const value = this.value;
		this.add(targetGroups);
		targets.forEach((target) => {
			if (map.has(target)) return;
			const single = new SingleChild(this, target);
			single.depth = 1;
			value.push(single);
			map.set(target, single);
		});
		this._targets = targets;
	}
	selectSubChilds(targets, target) {
		const root = this;
		const nextChild = root.findNextChild(target, targets, false);
		const targetChild = root.map.get(target);
		let nextChilds;
		if (nextChild) nextChilds = [nextChild];
		else if (targetChild) nextChilds = [targetChild];
		else nextChilds = [];
		return toTargetList(nextChilds);
	}
	selectSingleChilds(targets, added, removed) {
		const nextTargets = [...targets];
		removed.forEach((element) => {
			const index = nextTargets.indexOf(element);
			if (index > -1) nextTargets.splice(index, 1);
		});
		added.forEach((element) => {
			nextTargets.push(element);
		});
		return toTargetList(this.toChilds(nextTargets));
	}
	selectCompletedChilds(targets, added, removed, continueSelect) {
		const nextTargets = [...targets];
		const startSelected = (0, _daybrush_utils.deepFlat)(nextTargets);
		removed.forEach((element) => {
			const index = nextTargets.indexOf(element);
			if (index > -1) {
				nextTargets.splice(index, 1);
				return;
			}
			const removedChild = continueSelect ? this.findNextChild(element, nextTargets) : this.findNextExactChild(element, removed, nextTargets);
			if (removedChild) {
				const groupIndex = nextTargets.findIndex((target) => {
					return (0, _daybrush_utils.isArray)(target) && removedChild.compare(target);
				});
				if (groupIndex > -1) nextTargets.splice(groupIndex, 1);
			}
		});
		added.forEach((element) => {
			const nextChild = this._findParentGroup(element, startSelected).findContainedChild(element);
			if (nextChild?.type === "group") {
				const singleChild = nextChild.getSingleChild();
				if (singleChild) nextTargets.push(singleChild.value);
				else nextTargets.push(nextChild.toTargetGroups());
				return;
			}
			nextTargets.push(element);
		});
		return toTargetList(this.toChilds(nextTargets));
	}
	selectSameDepthChilds(targets, added, removed, continueSelect) {
		const nextTargets = [...targets];
		const commonParent = this.findCommonParent(nextTargets);
		removed.forEach((element) => {
			const index = nextTargets.indexOf(element);
			if (index > -1) {
				nextTargets.splice(index, 1);
				return;
			}
			const removedChild = continueSelect ? commonParent.findNextExactChild(element, removed, nextTargets) : commonParent.findNextChild(element, nextTargets, true);
			if (removedChild) {
				const groupIndex = nextTargets.findIndex((target) => {
					return (0, _daybrush_utils.isArray)(target) && removedChild.compare(target);
				});
				if (groupIndex > -1) nextTargets.splice(groupIndex, 1);
			}
		});
		commonParent.groupByPerfect(added).forEach((child) => {
			if (child.type === "single") nextTargets.push(child.value);
			else {
				const groupIndex = nextTargets.findIndex((target) => {
					return (0, _daybrush_utils.isArray)(target) && child.compare(target, 1);
				});
				if (groupIndex > -1) nextTargets.splice(groupIndex, 1);
				nextTargets.push(child.toTargetGroups());
			}
		});
		return toTargetList(this.toChilds(nextTargets));
	}
	toChilds(targets) {
		const childs = [];
		targets.forEach((target) => {
			if ((0, _daybrush_utils.isArray)(target)) {
				const arrayChild = this.findArrayChild(target);
				if (arrayChild) {
					const singleChild = arrayChild.getSingleChild();
					if (singleChild) return singleChild;
					childs.push(arrayChild);
				}
			} else {
				const single = this.map.get(target);
				if (single) childs.push(single);
				else childs.push(new SingleChild(this, target));
			}
		});
		return childs;
	}
	findChild(element, isAuto) {
		const value = this.map.get(element);
		if (isAuto) return value || new SingleChild(this, element);
		return value;
	}
	findArrayChildById(id) {
		let value = null;
		this.value.some(function find(child) {
			if (child.type !== "single") {
				if (child.id === id) {
					value = child;
					return true;
				} else return child.value.some(find);
			}
		});
		return value;
	}
	group(targets, flatten) {
		const commonParent = this.findCommonParent(targets);
		const groupChilds = targets.map((target) => {
			if ((0, _daybrush_utils.isArray)(target)) return this.findArrayChild(target);
			return this.findChild(target);
		});
		if (!groupChilds.every((child) => child?.parent === commonParent)) return null;
		const group = new ArrayChild(commonParent);
		const nextChilds = commonParent.value.filter((target) => groupChilds.indexOf(target) === -1);
		if (!nextChilds.length) return null;
		nextChilds.unshift(group);
		group.add(flatten ? (0, _daybrush_utils.deepFlat)(targets) : targets);
		commonParent.value = nextChilds;
		this.set(this.toTargetGroups(), this._targets);
		return group.toTargetGroups();
	}
	ungroup(targets) {
		if (targets.length === 1 && (0, _daybrush_utils.isArray)(targets[0])) targets = targets[0];
		const commonParent = this.findCommonParent(targets);
		const groupChilds = targets.map((target) => {
			if ((0, _daybrush_utils.isArray)(target)) return this.findArrayChild(target);
			return this.findChild(target);
		});
		if (commonParent.groupElement) return null;
		if (!commonParent.value.every((child) => groupChilds.indexOf(child) > -1) || commonParent === this) return null;
		const parent = commonParent.parent;
		if (!parent) return null;
		const nextChilds = parent.value.filter((target) => target !== commonParent);
		nextChilds.push(...commonParent.value);
		parent.value = nextChilds;
		this.set(this.toTargetGroups(), this._targets);
		return commonParent.toTargetGroups();
	}
	_findParentGroup(element, range) {
		if (!range.length) return this;
		const single = this.map.get(element);
		if (!single) return this;
		let parent = single.parent;
		while (parent) {
			if (range.some((element) => parent.contains(element))) return parent;
			parent = parent.parent;
		}
		return this;
	}
};
//#endregion
//#region src/index.umd.ts
var index_umd_default = /* @__PURE__ */ __exportAll({
	ArrayChild: () => ArrayChild,
	Child: () => Child,
	GroupManager: () => GroupManager,
	SingleChild: () => SingleChild,
	toTargetList: () => toTargetList
});
//#endregion
module.exports = index_umd_default;

//# sourceMappingURL=helper.cjs.js.map