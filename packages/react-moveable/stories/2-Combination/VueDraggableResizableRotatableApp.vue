<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable, { type RotationPosition } from "@/vue3-moveable";

const props = defineProps<{
    draggable: boolean;
    throttleDrag: number;
    edgeDraggable: boolean;
    startDragRotate: number;
    throttleDragRotate: number;
    resizable: boolean;
    keepRatio: boolean;
    throttleResize: number;
    renderDirections: string[];
    maxWidth: string;
    maxHeight: string;
    minWidth: string;
    minHeight: string;
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
                maxWidth: props.maxWidth,
                maxHeight: props.maxHeight,
                minWidth: props.minWidth,
                minHeight: props.minHeight,
            }">Target</div>
            <Moveable
                :target="target"
                :draggable="props.draggable"
                :throttleDrag="props.throttleDrag"
                :edgeDraggable="props.edgeDraggable"
                :startDragRotate="props.startDragRotate"
                :throttleDragRotate="props.throttleDragRotate"
                :resizable="props.resizable"
                :keepRatio="props.keepRatio"
                :throttleResize="props.throttleResize"
                :renderDirections="props.renderDirections"
                :rotatable="props.rotatable"
                :throttleRotate="props.throttleRotate"
                :rotationPosition="props.rotationPosition"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @resize="e => {
                    e.target.style.width = `${e.width}px`;
                    e.target.style.height = `${e.height}px`;
                    e.target.style.transform = e.drag.transform;
                }"
                @rotate="e => {
                    e.target.style.transform = e.drag.transform;
                }"
            />
        </div>
    </div>
</template>
