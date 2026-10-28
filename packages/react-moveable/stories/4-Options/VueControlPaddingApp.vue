<script setup lang="ts">
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    controlPadding: number;
}>();
</script>

<template>
    <div class="container">
        <div class="target"></div>
        <Moveable
            target=".target"
            className="control-padding"
            :draggable="true"
            :resizable="true"
            :rotatable="true"
            :displayAroundControls="true"
            :controlPadding="props.controlPadding"
            @render="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
