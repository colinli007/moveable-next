<script setup lang="ts">
import Moveable from "@/vue3-moveable";

function randomResize() {
    const width = 50 + Math.floor(50 * Math.random());
    const height = 50 + Math.floor(50 * Math.random());

    document.querySelector<HTMLElement>(".target")!.style.cssText
        += `width: ${width}px;height: ${height}px`;
}
</script>

<template>
    <div class="root">
        <div class="container">
            <button @click="randomResize">Random Resize</button>
            <div class="target">Target1</div>
            <Moveable
                target=".target"
                :draggable="true"
                :rotatable="true"
                :resizable="true"
                :useResizeObserver="true"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @resize="e => {
                    e.target.style.width = `${e.width}px`;
                    e.target.style.height = `${e.height}px`;
                    e.target.style.transform = e.drag.transform;
                }"
                @rotate="e => {
                    e.target.style.transform = e.drag.transform;
                }"
            />
        </div>
    </div>
</template>
