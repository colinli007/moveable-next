<script setup lang="ts">
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    innerBounds: { left: number; top: number; width: number; height: number };
}>();
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            width: '500px',
            height: '500px',
            border: '1px solid #ccc',
        }">
            <div class="target">Target</div>
            <Moveable
                target=".target"
                :draggable="true"
                :resizable="true"
                :snappable="true"
                :innerBounds="props.innerBounds"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @resize="e => {
                    e.target.style.width = `${e.width}px`;
                    e.target.style.height = `${e.height}px`;
                    e.target.style.transform = e.drag.transform;
                }"
                @bound="e => {
                    console.log(e);
                }"
            />
        </div>
    </div>
</template>
