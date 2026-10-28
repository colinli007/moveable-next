<script setup lang="ts">
import { shallowRef, useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");
const target = shallowRef<HTMLElement | null>(null);

function onDragStart(e: DragEvent) {
    if (!target.value) {
        moveable.value!.waitToChangeTarget().then(() => {
            moveable.value!.dragStart(e);
        });
        target.value = document.querySelector<HTMLElement>("#drag1");
    }
}
</script>

<template>
    <div class="container">
        <div :style="{
            width: '500px',
            height: '500px',
            border: '1px solid black',
        }"></div>
        <img
            id="drag1"
            src="https://www.w3schools.com/html/img_w3slogo.gif"
            draggable="true"
            @dragstart="onDragStart"
        />
        <Moveable
            ref="moveable"
            :target="target"
            dragContainer=".container"
            :draggable="true"
            :preventDefault="false"
            @drag="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
