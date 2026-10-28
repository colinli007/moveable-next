<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="container">
        <div class="nested first">
            No Transform
            <div class="nested scale">
                scale(1.5, 1.5)
                <div class="nested rotate">
                    rotate(30deg)
                    <div class="target" ref="target">Target</div>
                </div>
            </div>
        </div>
        <Moveable
            :target="target"
            :draggable="true"
            :throttleDrag="0"
            :startDragRotate="0"
            :throttleDragRotate="0"
            :zoom="1"
            :origin="true"
            :padding="{ left: 0, top: 0, right: 0, bottom: 0 }"
            :clippable="true"
            :clipRelative="false"
            :clipArea="false"
            :dragWithClip="false"
            defaultClipPath="inset"
            :clipTargetBounds="true"
            :clipVerticalGuidelines="[0, 100, 200]"
            :clipHorizontalGuidelines="[0, 100, 200]"
            :snapThreshold="5"
            @clip="(e) => {
                if (e.clipType === 'rect') {
                    e.target.style.clip = e.clipStyle;
                } else {
                    e.target.style.clipPath = e.clipStyle;
                }
            }"
            @render="(e) => {
                // console.log('render');
                e.target.style.transform = e.transform;
            }"
        />
    </div>
</template>
