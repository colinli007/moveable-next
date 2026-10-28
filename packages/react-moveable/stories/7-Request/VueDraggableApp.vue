<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable, { type OnDragEnd } from "@/vue3-moveable";

const props = defineProps<{
    containerScale: number;
    throttleDrag: number;
    edgeDraggable: boolean;
    startDragRotate: number;
    throttleDragRotate: number;
}>();
const xInput = useTemplateRef<HTMLInputElement>("xInput");
const yInput = useTemplateRef<HTMLInputElement>("yInput");
const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");

function request() {
    moveable.value!.request("draggable", {
        x: parseInt(xInput.value!.value),
        y: parseInt(yInput.value!.value),
    }, true);
}
function onInput(e: Event) {
    if (typeof (e as InputEvent).data === "undefined") {
        request();
    }
}
function onKeyUp(e: KeyboardEvent) {
    e.stopPropagation();

    // enter
    if (e.keyCode === 13) {
        request();
    }
}
function onDragEnd(e: OnDragEnd) {
    requestAnimationFrame(() => {
        const rect = e.moveable.getRect();

        xInput.value!.value = `${rect.left}`;
        yInput.value!.value = `${rect.top}`;
    });
}
</script>

<template>
    <div class="root">
        <div>
            X: <input ref="xInput" type="number" value="100" @input="onInput" @keyup="onKeyUp" />&nbsp;
            Y: <input ref="yInput" type="number" value="150" @input="onInput" @keyup="onKeyUp" />
        </div>

        <div class="container" :style="{
            transform: `scale(${props.containerScale})`,
        }">
            <div class="target">Target</div>
            <Moveable
                ref="moveable"
                target=".target"
                :draggable="true"
                :throttleDrag="props.throttleDrag"
                :edgeDraggable="props.edgeDraggable"
                :startDragRotate="props.startDragRotate"
                :throttleDragRotate="props.throttleDragRotate"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @dragEnd="onDragEnd"
            />
        </div>
    </div>
</template>
