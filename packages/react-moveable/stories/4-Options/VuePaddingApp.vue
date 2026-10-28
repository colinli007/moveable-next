<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <div class="target"></div>
        <Moveable
            target=".target"
            :draggable="true"
            :scalable="true"
            :rotatable="true"
            :padding="{
                left: 10,
                right: 20,
                top: 30,
                bottom: 40,
            }"
            @render="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
