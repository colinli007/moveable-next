<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container">
            <p>Pinch the target with two fingers on a touch-capable device.</p>
            <p>Drag, Scale and Rotate are possible.</p>
            <div class="target">Target</div>
            <Moveable
                target=".target"
                :draggable="true"
                :scalable="true"
                :rotatable="true"
                :pinchable="true"
                :pinchOutside="true"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
        </div>
    </div>
</template>
