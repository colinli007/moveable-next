<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable, { type RotationPosition } from "@/vue3-moveable";

const props = defineProps<{
    hideChildMoveableDefaultLines: boolean;
    draggable: boolean;
    throttleDrag: number;
    edgeDraggable: boolean;
    startDragRotate: number;
    throttleDragRotate: number;
    resizable: boolean;
    keepRatio: boolean;
    throttleResize: number;
    renderDirections: string[];
    maxWidth: number;
    maxHeight: number;
    minWidth: number;
    minHeight: number;
    rotatable: boolean;
    throttleRotate: number;
    rotationPosition: RotationPosition;
}>();
const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");
</script>

<template>
    <div class="container">
        <button @click="() => {
            moveable!.updateRect();
        }">Resize</button>
        <div class="target target1">Target1</div>
        <div class="target target2" :style="{
            minWidth: '50px',
            minHeight: '50px',
        }">Target2</div>
        <div class="target target3">Target3</div>
        <Moveable
            ref="moveable"
            target=".target"
            :hideChildMoveableDefaultLines="props.hideChildMoveableDefaultLines"
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
            @dragGroup="({ events }) => {
                events.forEach(ev => {
                    ev.target.style.transform = ev.transform;
                });
            }"
            @resizeGroupStart="({ setMin, setMax }) => {
                setMin([props.minWidth, props.minHeight]);
                setMax([props.maxWidth, props.maxHeight]);
            }"
            @resizeGroup="({ events }) => {
                events.forEach(ev => {
                    ev.target.style.width = `${ev.width}px`;
                    ev.target.style.height = `${ev.height}px`;
                    ev.target.style.transform = ev.drag.transform;
                });
            }"
            @rotateGroup="({ events }) => {
                events.forEach(ev => {
                    ev.target.style.transform = ev.drag.transform;
                });
            }"
        />
    </div>
</template>
