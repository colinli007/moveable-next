<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    draggable: boolean;
    throttleDrag: number;
    edgeDraggable: boolean;
    startDragRotate: number;
    throttleDragRotate: number;
    snappable: boolean;
    snapDirections: { top: boolean; left: boolean; bottom: boolean; right: boolean };
    verticalGuidelines: number[];
    horizontalGuidelines: number[];
    snapContainer: string;
    bounds: { left: number; top: number; right: number; bottom: number; position: "client" | "css" };
}>();
const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="root" :style="{
        position: 'relative',
        border: '1px solid black',
    }">
        <div class="container" :style="{
            position: 'relative',
            top: '50px',
            left: '50px',
            border: '1px solid red',
            width: '500px',
            height: '500px',
        }">
            <div class="snapContainer"
                :style="{
                    position: 'relative',
                    top: '50px',
                    left: '50px',
                    border: '1px solid #ccc',
                    width: '400px',
                    height: '400px',
                    transform: 'scale(0.7, 0.7)',
                }"
            >
                <div class="target" ref="target" :style="{
                    width: '200px',
                    height: '150px',
                    transform: 'translate(0px, 0px) scale(1.5, 1)',
                }">Target</div>
            </div>
            <Moveable
                :target="target"
                :draggable="props.draggable"
                :throttleDrag="props.throttleDrag"
                :edgeDraggable="props.edgeDraggable"
                :startDragRotate="props.startDragRotate"
                :throttleDragRotate="props.throttleDragRotate"
                :snappable="props.snappable"
                :snapDirections="props.snapDirections"
                :verticalGuidelines="props.verticalGuidelines"
                :horizontalGuidelines="props.horizontalGuidelines"
                :snapContainer="props.snapContainer"
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
