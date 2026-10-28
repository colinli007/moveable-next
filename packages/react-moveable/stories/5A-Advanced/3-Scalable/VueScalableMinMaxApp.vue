<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <div class="target">Target</div>
        <Moveable
            target=".target"
            :draggable="true"
            :scalable="true"
            @scaleStart="e => {
                e.setMinScaleSize([100, 100]);
                e.setMaxScaleSize([500, 500]);
            }"
            @render="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
