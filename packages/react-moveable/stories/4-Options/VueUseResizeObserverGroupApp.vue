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
                :draggable="true"
                :rotatable="true"
                :resizable="true"
                :useResizeObserver="true"
                @dragGroup="e => {
                    e.events.forEach(ev => {
                        ev.target.style.transform = ev.transform;
                    });
                }"
                @resizeGroup="e => {
                    e.events.forEach(ev => {
                        ev.target.style.width = `${ev.width}px`;
                        ev.target.style.height = `${ev.height}px`;
                        ev.target.style.transform = ev.drag.transform;
                    });
                }"
                @rotateGroup="e => {
                    e.events.forEach(ev => {
                        ev.target.style.transform = ev.drag.transform;
                    });
                }"
            />
        </div>
    </div>
</template>
