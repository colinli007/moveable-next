<script setup lang="ts">
import Moveable, { type RotationPosition } from "@/vue3-moveable";

const props = defineProps<{
    hideChildMoveableDefaultLines: boolean;
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
}>();
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target target1" :style="{
                transform: 'translate(0px, 0px) rotate(0deg) scale(1, 1)',
            }">Target1</div>
            <div class="target target2" :style="{
                transform: 'translate(0px, 0px) rotate(0deg) scale(1, 1)',
            }">Target2</div>
            <div class="target target3" :style="{
                transform: 'translate(0px, 0px) rotate(0deg) scale(1, 1)',
            }">Target3</div>
            <Moveable
                target=".target"
                :hideChildMoveableDefaultLines="props.hideChildMoveableDefaultLines"
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
                @renderGroup="e => {
                    e.events.forEach(ev => {
                        ev.target.style.transform = ev.transform;
                    });
                }"
            />
        </div>
    </div>
</template>
