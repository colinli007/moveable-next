<script setup lang="ts">
import Moveable from "@/vue3-moveable";

const DIRECTIONS = ["n", "w", "s", "e", "nw", "ne", "sw", "se"];
</script>

<template>
    <div class="root">
        <div class="target" :style="{
            transformOrigin: 'top center',
        }">Target</div>
        <Moveable
            target=".target"
            :draggable="true"
            :rotatable="{
                renderDirections: DIRECTIONS,
            }"
            :resolveAblesWithRotatable="{
                resizable: ['nw', 'ne', 'sw', 'se'],
            }"
            :resizable="{
                renderDirections: false,
            }"
            :rotateAroundControls="true"
            @render="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
