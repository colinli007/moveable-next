<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            transformOrigin: '0 0',
        }">
            <svg viewBox="0 0 200 200" :style="{
                border: '1px solid black',
                width: '200px',
                height: '200px',
            }">
                <path d="M 0 0 L 200 0 L 200 200 z" :style="{
                    fill: 'white',
                    stroke: 'red',
                    strokeWidth: 2,
                }" />
            </svg>
            <Moveable
                target="path"
                :draggable="true"
                :rotatable="true"
                :scalable="true"
                svgOrigin="50% 50%"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
        </div>
    </div>
</template>
