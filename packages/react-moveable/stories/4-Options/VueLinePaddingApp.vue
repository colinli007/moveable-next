<script setup lang="ts">
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    linePadding: number;
}>();
</script>

<template>
    <div class="container">
        <div class="target"></div>
        <Moveable
            target=".target"
            :draggable="true"
            :resizable="true"
            :linePadding="props.linePadding"
            :edge="true"
            @render="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
