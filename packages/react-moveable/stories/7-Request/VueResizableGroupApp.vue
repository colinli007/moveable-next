<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable, { type OnResizeGroupEnd } from "@/vue3-moveable";

const props = defineProps<{
    resizable: boolean;
    maxWidth: string;
    maxHeight: string;
    minWidth: string;
    minHeight: string;
    keepRatio: boolean;
    throttleResize: number;
    renderDirections: string[];
}>();
const widthInput = useTemplateRef<HTMLInputElement>("widthInput");
const heightInput = useTemplateRef<HTMLInputElement>("heightInput");
const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");

function onInput(e: Event) {
    const ev = e as InputEvent;
    const horizontal = JSON.parse((ev.target as HTMLElement).getAttribute("data-horizontal")!);

    if (typeof ev.data === "undefined") {
        moveable.value!.request("resizable", {
            offsetWidth: parseFloat(widthInput.value!.value),
            offsetHeight: parseFloat(heightInput.value!.value),
            horizontal,
        }, true);
    }
}
function onKeyUp(e: KeyboardEvent) {
    const horizontal = JSON.parse((e.target as HTMLElement).getAttribute("data-horizontal")!);
    e.stopPropagation();

    // enter
    if (e.keyCode === 13) {
        moveable.value!.request("resizable", {
            offsetWidth: parseFloat(widthInput.value!.value),
            offsetHeight: parseFloat(heightInput.value!.value),
            horizontal,
        }, true);
    }
}
function onResizeGroupEnd(e: OnResizeGroupEnd) {
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
            <div class="target target1">Target1</div>
            <div class="target target2">Target2</div>
            <div class="target target3">Target3</div>
            <Moveable
                ref="moveable"
                target=".target"
                :draggable="true"
                :resizable="props.resizable"
                :keepRatio="props.keepRatio"
                :throttleResize="props.throttleResize"
                :renderDirections="props.renderDirections"
                @resizeGroupStart="({ setMin, setMax }) => {
                    setMin([props.minWidth, props.minHeight]);
                    setMax([props.maxWidth, props.maxHeight]);
                }"
                @resizeGroup="({ events }) => {
                    events.forEach(ev => {
                        ev.target.style.width = `${ev.boundingWidth}px`;
                        ev.target.style.height = `${ev.boundingHeight}px`;
                        ev.target.style.transform
                            = `translate(${ev.drag.beforeTranslate[0]}px, ${ev.drag.beforeTranslate[1]}px)`;
                    });
                }"
                @resizeGroupEnd="onResizeGroupEnd"
                @dragGroup="({ events }) => {
                    events.forEach(ev => {
                        ev.target.style.transform = ev.transform;
                    });
                }"
            />
        </div>
    </div>
</template>
