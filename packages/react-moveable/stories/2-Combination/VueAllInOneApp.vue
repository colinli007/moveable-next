<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable, { type RotationPosition } from "@/vue3-moveable";

const props = defineProps<{
    draggable: boolean;
    throttleDrag: number;
    edgeDraggable: boolean;
    startDragRotate: number;
    throttleDragRotate: number;
    keepRatio: boolean;
    throttleScale: number;
    renderDirections: string[];
    rotatable: boolean;
    throttleRotate: number;
    rotationPosition: RotationPosition;
    originDraggable: boolean;
    originRelative: boolean;
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
                :scalable="true"
                :keepRatio="props.keepRatio"
                :throttleScale="props.throttleScale"
                :renderDirections="props.renderDirections"
                :rotatable="props.rotatable"
                :throttleRotate="props.throttleRotate"
                :rotationPosition="props.rotationPosition"
                :originDraggable="props.originDraggable"
                :originRelative="props.originRelative"
                @dragOrigin="e => {
                    e.target.style.transformOrigin = e.transformOrigin;
                }"
                @render="e => {
                    e.target.style.transform = e.transform;
                }"
            />
        </div>
    </div>
</template>
