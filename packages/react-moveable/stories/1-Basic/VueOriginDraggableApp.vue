<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target" ref="target">Target</div>
            <Moveable
                :target="target"
                :originDraggable="true"
                :draggable="true"
                :rotatable="true"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @dragOrigin="e => {
                    e.target.style.transformOrigin = e.transformOrigin;
                    e.target.style.transform = e.drag.transform;
                }"
                @rotate="e => {
                    e.target.style.transform = e.drag.transform;
                }"
            />
        </div>
    </div>
</template>
