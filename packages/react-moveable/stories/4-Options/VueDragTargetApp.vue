<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <div class="drag-area" :style="{
            width: '100px',
            height: '100px',
        }">Drag</div>
        <div class="target"></div>
        <Moveable
            target=".target"
            :draggable="true"
            :scalable="true"
            :rotatable="true"
            dragTarget=".drag-area"
            @render="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
