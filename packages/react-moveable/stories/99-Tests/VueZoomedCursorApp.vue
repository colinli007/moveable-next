<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            width: '500px',
            transform: 'translate(100px, 100px) scale(2)',
        }">
            <div class="target">Target</div>
            <Moveable
                target=".target"
                :draggable="true"
                :scalable="true"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
        </div>
    </div>
</template>
