<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const target = useTemplateRef<SVGPathElement>("target");
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            transformOrigin: '0 0',
        }">
            <svg viewBox="0 0 400 400" :style="{
                position: 'relative',
                left: '200px',
                top: '200px',
                border: '1px solid black',
                width: '200px',
                height: '200px',
            }">
                <path d="M 0 0 L 200 0 L 200 200 z" ref="target" :style="{
                    fill: 'white',
                    stroke: 'red',
                    strokeWidth: 2,
                }" />
            </svg>
            <Moveable
                :target="target"
                :draggable="true"
                :rotatable="true"
                :scalable="true"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
        </div>
    </div>
</template>
