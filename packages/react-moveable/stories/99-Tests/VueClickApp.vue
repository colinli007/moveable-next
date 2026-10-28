<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            height: '100px',
        }" @click="() => {
            console.log('Click');
        }" @mousedown="() => {
            console.log('MouseDown');
        }">
            <div class="target" ref="target">Target</div>
            <Moveable
                :target="target"
                :resizable="true"
                :preventClickDefault="true"
                :draggable="true"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
            />
        </div>
    </div>
</template>
