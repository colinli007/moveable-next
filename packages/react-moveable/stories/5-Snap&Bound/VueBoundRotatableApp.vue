<script setup lang="ts">
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    draggable: boolean;
    throttleDrag: number;
    edgeDraggable: boolean;
    startDragRotate: number;
    throttleDragRotate: number;
    rotatable: boolean;
    snappable: boolean;
    bounds: { left: number; top: number; right: number; bottom: number; position: "client" | "css" };
}>();
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            width: '500px',
            height: '500px',
            border: '1px solid #ccc',
        }">
            <div class="target" :style="{
                width: '280px',
                height: '230px',
            }">Target</div>
            <Moveable
                target=".target"
                :draggable="props.draggable"
                :throttleDrag="props.throttleDrag"
                :edgeDraggable="props.edgeDraggable"
                :startDragRotate="props.startDragRotate"
                :throttleDragRotate="props.throttleDragRotate"
                :rotatable="props.rotatable"
                :snappable="props.snappable"
                :bounds="props.bounds"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @rotate="e => {
                    e.target.style.transform = e.afterTransform;
                }"
                @bound="e => {
                    console.log(e);
                }"
            />
        </div>
    </div>
</template>
