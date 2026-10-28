<script setup lang="ts">
import { shallowRef } from "vue";
import Moveable from "@/vue3-moveable";

const targets = shallowRef<Array<string>>([
    ".cube1",
    ".cube2",
]);
const cubes: number[] = [];

for (let i = 0; i < 30; ++i) {
    cubes.push(i);
}
function onDragGroupStart() {
    requestAnimationFrame(() => {
        if (targets.value.length === 2) {
            targets.value = [".cube1", ".cube2", ".cube3"];
        } else if (targets.value.length === 3) {
            targets.value = [".cube1", ".cube2", ".cube3", ".cube4"];
        }
    });
}
</script>

<template>
    <div class="root">
        <div class="container">
            <Moveable
                :draggable="true"
                :target="targets"
                @dragGroupStart="onDragGroupStart"
                @drag="e => {
                    e.target.style.cssText += e.cssText;
                }"
                @dragGroup="e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }"
            />

            <div class="elements selecto-area">
                <div :class="`cube cube${i}`" v-for="i in cubes" :key="i"></div>
            </div>
            <div class="empty elements"></div>
        </div>
    </div>
</template>
