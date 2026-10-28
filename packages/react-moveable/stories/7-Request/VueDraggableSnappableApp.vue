<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable, { type DraggableRequestParam } from "@/vue3-moveable";

const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");
</script>

<template>
    <div class="root">
        <button @click="() => {
            moveable!.request<DraggableRequestParam>('draggable', {
                deltaX: -49,
                deltaY: 0,
                useSnap: true,
            }, true);
        }">Left</button>
        <button @click="() => {
            moveable!.request<DraggableRequestParam>('draggable', {
                deltaX: 49,
                deltaY: 0,
                useSnap: true,
            }, true);
        }">Right</button>
        <div class="container">
            <div class="target">Target</div>
            <Moveable
                ref="moveable"
                target=".target"
                :draggable="true"
                :snappable="true"
                :snapGridWidth="50"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
        </div>
    </div>
</template>
