<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    draggable: boolean;
    throttleDrag: number;
    edgeDraggable: boolean;
    startDragRotate: number;
    throttleDragRotate: number;
    resizable: boolean;
    keepRatio: boolean;
    snappable: boolean;
    bounds: { left: number; top: number; right: number; bottom: number; position: "client" | "css" };
    edge: Array<"n" | "w" | "s" | "e">;
}>();
const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            width: '500px',
            height: '500px',
            border: '1px solid #ccc',
        }">
            <div class="target" ref="target">Target</div>
            <Moveable
                :target="target"
                :draggable="props.draggable"
                :throttleDrag="props.throttleDrag"
                :edgeDraggable="props.edgeDraggable"
                :startDragRotate="props.startDragRotate"
                :throttleDragRotate="props.throttleDragRotate"
                :resizable="props.resizable"
                :keepRatio="props.keepRatio"
                :snappable="props.snappable"
                :bounds="props.bounds"
                :edge="props.edge"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @resize="e => {
                    e.target.style.width = `${e.width}px`;
                    e.target.style.height = `${e.height}px`;
                    e.target.style.transform = e.drag.transform;
                }"
                @bound="e => {
                    console.log(e);
                }"
            />
        </div>
    </div>
</template>
