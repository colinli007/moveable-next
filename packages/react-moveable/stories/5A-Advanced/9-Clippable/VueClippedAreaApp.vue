<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target" ref="target" :style="{
                top: '50px',
                left: '50px',
                width: '200px',
                height: '200px',
            }">Target</div>
            <Moveable
                :target="target"
                :draggable="true"
                :resizable="true"
                :rotatable="true"
                :clippable="true"
                :dragWithClip="true"
                :padding="{ left: 10, right: 10, bottom: 10, top: 10 }"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
        </div>
    </div>
</template>
