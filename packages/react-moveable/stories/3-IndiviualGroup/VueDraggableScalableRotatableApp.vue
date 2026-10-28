<script setup lang="ts">
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
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target target1">Target1</div>
            <div class="target target2">Target2</div>
            <div class="target target3">Target3</div>
            <Moveable
                target=".target"
                :individualGroupable="true"
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
