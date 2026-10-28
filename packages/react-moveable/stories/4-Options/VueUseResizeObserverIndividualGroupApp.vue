<script setup lang="ts">
import Moveable from "@/vue3-moveable";

function randomResize() {
    const width = 50 + Math.floor(50 * Math.random());
    const height = 50 + Math.floor(50 * Math.random());

    document.querySelectorAll<HTMLElement>(".target")[Math.floor(Math.random() * 3)].style.cssText
        += `width: ${width}px;height: ${height}px`;
}
</script>

<template>
    <div class="root">
        <div class="container">
            <button @click="randomResize">Random Resize</button>
            <div class="target target1">Target1</div>
            <div class="target target2">Target2</div>
            <div class="target target3">Target3</div>
            <Moveable
                target=".target"
                :individualGroupable="true"
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
