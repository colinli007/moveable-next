<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="target">Target</div>
        <Moveable
            target=".target"
            :rotatable="true"
            @rotateStart="e => {
                e.setFixedDirection([-0.5, -0.5]);
            }"
            @rotate="e => {
                e.target.style.transform = e.drag.transform;
            }"
        />
    </div>
</template>
