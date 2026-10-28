<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");
</script>

<template>
    <div class="container">
        <button @click="() => {
            moveable!.request('draggable', {
                isInstant: true,
                deltaX: 0,
                deltaY: 0,
            });
        }">Request</button>
        <div class="target">Target</div>

        <Moveable
            ref="moveable"
            target=".target"
            :draggable="true"
            :rotatable="true"
            :resizable="true"
            :snappable="true"
            :bounds="{
                left: 200,
                top: 0,
            }"
            @render="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
