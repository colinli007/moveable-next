<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <div class="target" :style="{
            width: '300px',
            height: '300px',
        }"></div>
        <Moveable
            target=".target"
            :draggable="true"
            :rotatable="true"
            :zoom="5"
            @render="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
