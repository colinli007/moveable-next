<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <div class="target" :style="{
            transform: 'scale(1, 0)',
        }">Target1</div>
        <Moveable
            target=".target"
            :scalable="true"
            :keepRatio="true"
            @scaleStart="e => {
                e.setRatio(1);
            }"
            @scale="e => {
                // console.log(e.scale);
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
