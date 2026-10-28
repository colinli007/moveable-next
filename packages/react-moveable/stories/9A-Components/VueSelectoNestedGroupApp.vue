<script setup lang="ts">
import { shallowRef, useTemplateRef } from "vue";
import Selecto from "vue3-selecto";
import Moveable from "@/vue3-moveable";
import { diff } from "@egjs/children-differ";

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
                @click="e => {
                    if (e.isDouble) {
                        const inputTarget = e.inputTarget as HTMLElement;
                        const selectableElements = selecto!.getSelectableElements();

                        if (selectableElements.includes(inputTarget)) {
                            selecto!.setSelectedTargets([inputTarget]);
                            targets = [inputTarget];
                        }
                    }
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
                    let selected = e.selected;

                    // excludes child elements.
                    selected = selected.filter(target => {
                        return selected.every(target2 => {
                            return target === target2 || !target2.contains(target);
                        });
                    });

                    const result = diff(e.startSelected, selected);

                    e.currentTarget.setSelectedTargets(selected);


                    if (!result.added.length && !result.removed.length) {
                        return;
                    }
                    if (e.isDragStartEnd) {
                        e.inputEvent.preventDefault();

                        moveable!.waitToChangeTarget().then(() => {
                            moveable!.dragStart(e.inputEvent);
                        });
                    }
                    targets = selected;
                }"
            />
            <div class="elements selecto-area">
                <template v-for="i in cubes" :key="i">
                    <div class="cube" v-if="i === 2" :style="{
                        width: '100px',
                        height: '50px',
                    }">{{ i }}<div class="cube">{{ i }}</div></div>
                    <div class="cube" v-else>{{ i }}</div>
                </template>
            </div>
            <div class="empty elements"></div>
        </div>
    </div>
</template>
