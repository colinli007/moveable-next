<script setup lang="ts">
import { shallowRef, useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const groupInstances = shallowRef<any[]>([]);
const t1 = useTemplateRef<InstanceType<typeof Moveable>>("t1");
const t2 = useTemplateRef<InstanceType<typeof Moveable>>("t2");
const groupMoveable = useTemplateRef<InstanceType<typeof Moveable>>("groupMoveable");

function initGroupElements() {
    const arr: any[] = [];
    arr.push(document.getElementsByClassName("target1")[0]);
    arr.push(document.getElementsByClassName("target2")[0]);
    groupInstances.value = arr;
}

function handleDragStart(e: any) {
    initGroupElements();
    groupMoveable.value!.dragStart(e.inputEvent);
}
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target target1">Target 1</div>
            <div class="target target2">Target 2</div>
            <Moveable
                ref="t1"
                target=".target1"
                :draggable="true"
                :edgeDraggable="true"
                :origin="false"
                @dragStart="handleDragStart"
            />
            <Moveable
                ref="t2"
                target=".target2"
                :draggable="true"
                :origin="false"
                :edgeDraggable="true"
                @dragStart="handleDragStart"
            />
            <Moveable
                ref="groupMoveable"
                :target="groupInstances"
                :hideDefaultLines="false"
                :draggable="true"
                @dragGroup="(e) => {
                    e.events.forEach(
                        (ev) => (ev.target.style.transform = ev.transform)
                    );
                    t1!.updateRect();
                    t2!.updateRect();
                }"
                @dragGroupEnd="() => {
                    groupInstances = [];
                }"
            />
        </div>
    </div>
</template>
