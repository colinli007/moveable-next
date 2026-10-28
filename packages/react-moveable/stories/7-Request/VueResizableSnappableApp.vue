<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable, { type ResizableRequestParam } from "@/vue3-moveable";

const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");
</script>

<template>
    <div class="root">
        <button @click="() => {
            moveable!.request<ResizableRequestParam>('resizable', {
                direction: [1, 0],
                deltaWidth: -49,
                useSnap: true,
            }, true);
        }">Left</button>
        <button @click="() => {
            moveable!.request<ResizableRequestParam>('resizable', {
                direction: [1, 0],
                deltaWidth: 49,
                useSnap: true,
            }, true);
        }">Right</button>
        <div class="container">
            <div class="target">Target</div>
            <Moveable
                ref="moveable"
                target=".target"
                :draggable="true"
                :resizable="true"
                :snappable="true"
                :snapGridWidth="50"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
        </div>
    </div>
</template>
