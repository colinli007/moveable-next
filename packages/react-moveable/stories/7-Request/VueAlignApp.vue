<script setup lang="ts">
import { shallowRef, useTemplateRef } from "vue";
import Moveable, { type DraggableRequestParam } from "@/vue3-moveable";
import Selecto from "vue3-selecto";

const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");
const targets = shallowRef<Array<HTMLElement | SVGElement>>([]);
const dragContainer = window;

function alignTop() {
    const rect = moveable.value!.getRect();
    const moveables = moveable.value!.getMoveables();

    if (moveables.length <= 1) {
        return;
    }
    moveables.forEach(child => {
        child.request<DraggableRequestParam>("draggable", {
            y: rect.top,
        }, true);
    });

    moveable.value?.updateRect();
}
function alignBottom() {
    const rect = moveable.value!.getRect();
    const moveables = moveable.value!.getMoveables();

    if (moveables.length <= 1) {
        return;
    }
    moveables.forEach(child => {
        child.request<DraggableRequestParam>("draggable", {
            y: rect.top + rect.height,
        }, true);
    });

    moveable.value?.updateRect();
}
function alignLeft() {
    const rect = moveable.value!.getRect();
    const moveables = moveable.value!.getMoveables();

    if (moveables.length <= 1) {
        return;
    }
    moveables.forEach(child => {
        child.request<DraggableRequestParam>("draggable", {
            x: rect.left,
        }, true);
    });

    moveable.value?.updateRect();
}
function alignRight() {
    const rect = moveable.value!.getRect();
    const moveables = moveable.value!.getMoveables();

    if (moveables.length <= 1) {
        return;
    }
    moveables.forEach(child => {
        child.request<DraggableRequestParam>("draggable", {
            y: rect.left + rect.width,
        }, true);
    });

    moveable.value?.updateRect();
}
function alignVerticalCenter() {
    const rect = moveable.value!.getRect();
    const moveables = moveable.value!.getMoveables();

    if (moveables.length <= 1) {
        return;
    }
    moveables.forEach((child, i) => {
        child.request<DraggableRequestParam>("draggable", {
            y: rect.top + rect.height / 2 - rect.children![i].height / 2,
        }, true);
    });

    moveable.value?.updateRect();
}
function alignHorizontalCenter() {
    const rect = moveable.value!.getRect();
    const moveables = moveable.value!.getMoveables();

    if (moveables.length <= 1) {
        return;
    }
    moveables.forEach((child, i) => {
        child.request<DraggableRequestParam>("draggable", {
            x: rect.left + rect.width / 2 - rect.children![i].width / 2,
        }, true);
    });

    moveable.value?.updateRect();
}
function arrangeVerticalSpacing() {
    const groupRect = moveable.value!.getRect();
    const moveables = moveable.value!.getMoveables();
    let top = groupRect.top;

    if (moveables.length <= 1) {
        return;
    }
    const gap = (groupRect.height - groupRect.children!.reduce((prev, cur) => {
        return prev + cur.height;
    }, 0)) / (moveables.length - 1);

    moveables.sort((a, b) => {
        return a.state.top - b.state.top;
    });
    moveables.forEach(child => {
        const rect = child.getRect();

        child.request<DraggableRequestParam>("draggable", {
            y: top,
        }, true);

        top += rect.height + gap;
    });

    moveable.value?.updateRect();
}
function arrangeHorizontalSpacing() {
    const groupRect = moveable.value!.getRect();
    const moveables = moveable.value!.getMoveables();
    let left = groupRect.left;

    if (moveables.length <= 1) {
        return;
    }
    const gap = (groupRect.width - groupRect.children!.reduce((prev, cur) => {
        return prev + cur.width;
    }, 0)) / (moveables.length - 1);

    moveables.sort((a, b) => {
        return a.state.left - b.state.left;
    });
    moveables.forEach(child => {
        const rect = child.getRect();

        child.request<DraggableRequestParam>("draggable", {
            x: left,
        }, true);

        left += rect.width + gap;
    });

    moveable.value?.updateRect();
}
</script>

<template>
    <div class="root">
        <div class="container">
            <button @click="alignTop">Align Top</button>&nbsp;<button
                @click="alignBottom">Align Bottom</button>&nbsp;<button
                @click="alignLeft">Align Left</button>&nbsp;<button
                @click="alignRight">Align Right</button>&nbsp;<button
                @click="alignVerticalCenter">Align Vertical Center</button>&nbsp;<button
                @click="alignHorizontalCenter">Align Horizontal Center</button>&nbsp;<button
                @click="arrangeVerticalSpacing">Arrange Vertical Spacing</button>&nbsp;<button
                @click="arrangeHorizontalSpacing">Arrange Horizontal Spacing</button>&nbsp;<div
                class="target target1" :style="{
                    left: '50px',
                    top: '150px',
                }">Target1</div>
            <div class="target target2" :style="{
                left: '250px',
                top: '250px',
            }">Target2</div>
            <div class="target target3" :style="{
                left: '400px',
                top: '300px',
            }">Target3</div>
            <Moveable
                ref="moveable"
                :target="targets"
                :draggable="true"
                :resizable="true"
                :snappable="true"
                :snapGridWidth="50"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
                @renderGroup="e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }"
            />
            <Selecto
                :dragContainer="dragContainer"
                :selectableTargets="['.target']"
                :hitRate="0"
                :selectByClick="true"
                :selectFromInside="true"
                :toggleContinueSelect="['shift']"
                :ratio="0"
                @dragStart="e => {
                    const target = e.inputEvent.target;
                    if (
                        target.tagName === 'BUTTON'
                        || moveable!.isMoveableElement(target)
                        || targets.some(t => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                }"
                @selectEnd="e => {
                    if (e.isDragStart) {
                        e.inputEvent.preventDefault();

                        moveable!.waitToChangeTarget().then(() => {
                            moveable!.dragStart(e.inputEvent);
                        });
                    }
                    targets = e.selected;
                }"
            />
        </div>
    </div>
</template>
