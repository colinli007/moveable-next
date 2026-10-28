<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable, { type OnResizeEnd } from "@/vue3-moveable";

const props = defineProps<{
    resizable: boolean;
    keepRatio: boolean;
    throttleResize: number;
    renderDirections: string[];
}>();
const widthInput = useTemplateRef<HTMLInputElement>("widthInput");
const heightInput = useTemplateRef<HTMLInputElement>("heightInput");
const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");

function onInput(e: Event) {
    if (typeof (e as InputEvent).data === "undefined") {
        moveable.value!.request("resizable", {
            offsetWidth: parseFloat(widthInput.value!.value),
            offsetHeight: parseFloat(heightInput.value!.value),
        }, true);
    }
}
function onKeyUp(e: KeyboardEvent) {
    e.stopPropagation();

    // enter
    if (e.keyCode === 13) {
        moveable.value!.request("resizable", {
            offsetWidth: parseFloat(widthInput.value!.value),
            offsetHeight: parseFloat(heightInput.value!.value),
        }, true);
    }
}
function onResizeEnd(e: OnResizeEnd) {
    requestAnimationFrame(() => {
        const rect = e.moveable.getRect();

        widthInput.value!.value = `${rect.offsetWidth}`;
        heightInput.value!.value = `${rect.offsetHeight}`;
    });
}
</script>

<template>
    <div class="root">
        <div>
            width: <input ref="widthInput"
                type="number" value="280"
                @input="onInput" @keyup="onKeyUp" data-horizontal="true" />&nbsp;
            height: <input ref="heightInput"
                type="number" value="230"
                @input="onInput" @keyup="onKeyUp" data-horizontal="false" />
        </div>
        <div class="container">
            <div class="target">Target1</div>
            <Moveable
                ref="moveable"
                target=".target"
                :resizable="props.resizable"
                :keepRatio="props.keepRatio"
                :throttleResize="props.throttleResize"
                :renderDirections="props.renderDirections"
                @resize="e => {
                    e.target.style.width = `${e.width}px`;
                    e.target.style.height = `${e.height}px`;
                    e.target.style.transform = e.drag.transform;
                }"
                @resizeEnd="onResizeEnd"
            />
        </div>
    </div>
</template>
