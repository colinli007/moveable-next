<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target target1" :style="{
                transform: 'translate(0px, 0px) rotate(0deg) scale(1, 1)',
            }">Target1</div>
            <div class="target target2" :style="{
                transform: 'translate(0px, 0px) rotate(0deg) scale(1, 1)',
            }">Target2</div>
            <div class="target target3" :style="{
                transform: 'translate(0px, 0px) rotate(0deg) scale(1, 1)',
            }">Target3</div>
            <Moveable
                target=".target"
                :draggable="true"
                :resizable="true"
                :keepRatio="false"
                @dragGroup="e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }"
                @resizeGroup="e => {
                    if (e.direction[0] === -1) {
                        // left edge
                        e.events.forEach(ev => {
                            ev.target.style.width = `${ev.width - ev.dist[0] + e.dist[0]}px`;
                            ev.target.style.cssText += `margin-left: ${-e.dist[0]}px`; // the first resize moves the element , not desireable
                        });
                    } else if (e.direction[0] === 1) {
                        // right edge
                        e.events.forEach(ev => {
                            ev.target.style.width = `${ev.width - ev.dist[0] + e.dist[0]}px`;
                        });
                    }
                }"
            />
        </div>
    </div>
</template>
