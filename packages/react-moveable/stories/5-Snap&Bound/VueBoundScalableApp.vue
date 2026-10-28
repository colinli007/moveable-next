<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    draggable: boolean;
    throttleDrag: number;
    edgeDraggable: boolean;
    startDragRotate: number;
    throttleDragRotate: number;
    scalable: boolean;
    keepRatio: boolean;
    throttleScale: number;
    snappable: boolean;
    bounds: { left: number; top: number; right: number; bottom: number; position: "client" | "css" };
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
            <div class="target" ref="target" :style="{
                width: '200px',
                height: '150px',
                transform: 'scale(1.5, 1)',
            }">Target</div>
            <Moveable
                :target="target"
                :draggable="props.draggable"
                :throttleDrag="props.throttleDrag"
                :edgeDraggable="props.edgeDraggable"
                :startDragRotate="props.startDragRotate"
                :throttleDragRotate="props.throttleDragRotate"
                :scalable="props.scalable"
                :keepRatio="props.keepRatio"
                :throttleScale="props.throttleScale"
                :snappable="props.snappable"
                :bounds="props.bounds"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @scale="e => {
                    e.target.style.transform = e.drag.transform;
                }"
                @bound="e => {
                    console.log(e);
                }"
            />
        </div>
    </div>
</template>
