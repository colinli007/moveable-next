<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    resizable: boolean;
    keepRatio: boolean;
    throttleResize: number;
    renderDirections: string[];
    maxWidth: string;
    maxHeight: string;
    minWidth: string;
    minHeight: string;
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
                :resizable="props.resizable"
                :keepRatio="props.keepRatio"
                :throttleResize="props.throttleResize"
                :renderDirections="props.renderDirections"
                @resize="e => {
                    e.target.style.width = `${e.width}px`;
                    e.target.style.height = `${e.height}px`;
                    e.target.style.transform = e.drag.transform;
                }"
            />
        </div>
    </div>
</template>
