<script setup lang="ts">
import Moveable from "@/vue3-moveable";

function randomPosition() {
    const left = 50 + Math.floor(50 * Math.random());
    const top = 50 + Math.floor(50 * Math.random());

    document.querySelector<HTMLElement>(".target")!.style.cssText
        += `left: ${left}px;top: ${top}px`;
}
</script>

<template>
    <div class="root">
        <div class="container">
            <button @click="randomPosition">Random Position</button>
            <p>Changes in css position due to className or attribute selector are not detected.</p>
            <p>Use with `useResizeObserver`.</p>
            <div class="target">Target1</div>
            <Moveable
                target=".target"
                :draggable="true"
                :rotatable="true"
                :resizable="true"
                :useResizeObserver="true"
                :useMutationObserver="true"
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
