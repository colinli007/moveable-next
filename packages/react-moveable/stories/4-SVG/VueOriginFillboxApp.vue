<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div
            class="container"
            :style="{
                transformOrigin: '0 0',
            }"
        >
            <svg
                viewBox="0 0 500 500"
                :style="{
                    border: '1px solid black',
                    width: '500px',
                    height: '500px',
                }"
            >
                <rect
                    id="rect-1"
                    x="100"
                    y="100"
                    width="50"
                    height="50"
                    :style="{
                        fill: 'red',
                        transformBox: 'fill-box',
                        transform: '',
                        strokeWidth: '0',
                        transformOrigin: '50% 50%',
                    }"
                />
            </svg>
            <Moveable
                target="#rect-1"
                :draggable="true"
                :rotatable="true"
                :scalable="true"
                svgOrigin="50% 50%"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
            <Moveable
                target="#rect-2"
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
