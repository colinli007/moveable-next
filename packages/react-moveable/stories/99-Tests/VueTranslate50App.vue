<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target" :style="{
                transform: 'translate(-50%, -50%)',
            }">Target</div>
            <Moveable
                target=".target"
                :resizable="true"
                :preventClickDefault="true"
                :draggable="true"
                @drag="e => {
                    console.log(e.dist);
                }"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
        </div>
    </div>
</template>
