<script setup lang="ts">
import { shallowRef, useTemplateRef } from "vue";
import Selecto from "vue3-selecto";
import Moveable from "@/vue3-moveable";

const targets = shallowRef<Array<SVGElement | HTMLElement>>([]);
const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");
const selecto = useTemplateRef<Selecto>("selecto");
const dragContainer = window;
const cubes: number[] = [];

for (let i = 0; i < 30; ++i) {
    cubes.push(i);
}
</script>

<template>
    <div class="root">
        <div class="container">
            <Moveable
                ref="moveable"
                :draggable="true"
                :target="targets"
                @clickGroup="e => {
                    selecto!.clickTarget(e.inputEvent, e.inputTarget);
                }"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @dragGroup="e => {
                    e.events.forEach(ev => {
                        ev.target.style.transform = ev.transform;
                    });
                }"
            />
            <Selecto
                ref="selecto"
                :dragContainer="dragContainer"
                :selectableTargets="['.selecto-area .cube']"
                :hitRate="0"
                :selectByClick="true"
                :selectFromInside="false"
                :toggleContinueSelect="['shift']"
                :ratio="0"
                @dragStart="e => {
                    const target = e.inputEvent.target;
                    if (
                        moveable!.isMoveableElement(target)
                        || targets.some(t => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                }"
                @selectEnd="e => {
                    if (e.isDragStart) {
                        e.inputEvent.preventDefault();

                        moveable!.waitToChangeTarget().then(() => {
                            moveable!.dragStart(e.inputEvent);
                        });
                    }
                    targets = e.selected;
                }"
            />

            <div class="elements selecto-area">
                <div class="cube" v-for="i in cubes" :key="i"></div>
            </div>
            <div class="empty elements"></div>
        </div>
    </div>
</template>
