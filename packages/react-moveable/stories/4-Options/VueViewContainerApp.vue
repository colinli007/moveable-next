<script setup lang="ts">
import Moveable from "@/vue3-moveable";

const viewContainer = document.body;
</script>

<template>
    <div class="root">
        <p class="description">
            * When you drag, the class name `${ableName}-view-dragging` is added to the viewContainer.
        </p>
        <div class="target">Target</div>
        <Moveable
            target=".target"
            :draggable="true"
            :resizable="true"
            :rotatable="true"
            :viewContainer="viewContainer"
            @render="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
