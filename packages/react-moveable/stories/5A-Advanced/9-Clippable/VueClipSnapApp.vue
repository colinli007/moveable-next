<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target" ref="target" :style="{
                top: '50px',
                left: '50px',
                width: '200px',
                height: '200px',
            }">Target</div>
            <Moveable
                :target="target"
                :draggable="true"
                :resizable="true"
                :clippable="true"
                :dragWithClip="false"
                :clipTargetBounds="true"
                :snappable="true"
                :horizontalGuidelines="[0, 100, 200, 300]"
                :snapThreshold="5"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @resize="e => {
                    e.target.style.width = `${e.width}px`;
                    e.target.style.height = `${e.height}px`;
                    e.target.style.transform = e.drag.transform;
                }"
                @clip="e => {
                    e.target.style.clipPath = e.clipStyle;
                }"
            />
        </div>
    </div>
</template>
