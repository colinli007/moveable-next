<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="target">Target</div>
        <Moveable
            target=".target"
            :draggable="true"
            :resizable="true"
            :edgeDraggable="true"
            :edge="['w', 'e']"
            @drag="e => {
                e.target.style.transform = e.transform;
            }"
            @resize="e => {
                e.target.style.width = `${e.width}px`;
                e.target.style.height = `${e.height}px`;
                e.target.style.transform = e.drag.transform;
            }"
        />
    </div>
</template>
