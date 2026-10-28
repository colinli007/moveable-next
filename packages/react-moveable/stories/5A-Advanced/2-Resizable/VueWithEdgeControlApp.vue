<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <div class="target">Target1</div>
        <Moveable
            target=".target"
            :keepRatio="true"
            :triggerAblesSimultaneously="true"
            :resizable="{
                edge: ['e', 'w'],
                renderDirections: ['e', 'w'],
            }"
            :scalable="{
                edge: [],
                renderDirections: ['nw', 'ne', 'se', 'sw'],
            }"
            :draggable="true"
            :edgeDraggable="['n', 's']"
            @drag="e => {
                e.target.style.cssText += `transform: ${e.transform}`;
            }"
            @resize="e => {
                e.target.style.cssText += `width: ${e.boundingWidth}px;`
                    + `height: ${e.boundingHeight}px;`
                    + `transform: ${e.drag.transform}`;
            }"
            @scale="e => {
                e.target.style.cssText += `transform: ${e.drag.transform}`;
            }"
        />
    </div>
</template>
