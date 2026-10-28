<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable, { type RotationPosition } from "@/vue3-moveable";

const props = defineProps<{
    draggable: boolean;
    throttleDrag: number;
    edgeDraggable: boolean;
    startDragRotate: number;
    throttleDragRotate: number;
    scalable: boolean;
    keepRatio: boolean;
    throttleScale: number;
    renderDirections: string[];
    rotatable: boolean;
    throttleRotate: number;
    rotationPosition: RotationPosition;
}>();
const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target" ref="target" :style="{
                transform: 'translate(0px, 0px) rotate(0deg) scale(1, 1)',
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
                :renderDirections="props.renderDirections"
                :rotatable="props.rotatable"
                :throttleRotate="props.throttleRotate"
                :rotationPosition="props.rotationPosition"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @scale="e => {
                    e.target.style.transform = e.drag.transform;
                }"
                @rotate="e => {
                    e.target.style.transform = e.drag.transform;
                }"
            />
        </div>
    </div>
</template>
