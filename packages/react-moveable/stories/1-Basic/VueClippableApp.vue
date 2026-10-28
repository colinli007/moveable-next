<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    draggable: boolean;
    startDragRotate: number;
    throttleDragRotate: number;
    clippable: boolean;
    clipRelative: boolean;
    clipArea: boolean;
    dragWithClip: boolean;
    defaultClipPath: string;
    clipTargetBounds: boolean;
    keepRatio: boolean;
}>();
const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target" ref="target">Target</div>
            <Moveable
                :target="target"
                :draggable="props.draggable"
                :startDragRotate="props.startDragRotate"
                :throttleDragRotate="props.throttleDragRotate"
                :clippable="props.clippable"
                :clipRelative="props.clipRelative"
                :clipArea="props.clipArea"
                :dragWithClip="props.dragWithClip"
                :defaultClipPath="props.defaultClipPath"
                :clipTargetBounds="props.clipTargetBounds"
                :snapThreshold="5"
                :keepRatio="props.keepRatio"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @clip="e => {
                    e.target.style.clipPath = e.clipStyle;
                }"
            />
        </div>
    </div>
</template>
