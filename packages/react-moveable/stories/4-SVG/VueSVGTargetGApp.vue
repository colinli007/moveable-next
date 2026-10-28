<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            transformOrigin: '0 0',
        }">
            <svg viewBox="0 0 200 200" :style="{
                position: 'relative',
                border: '1px solid black',
                width: '200px',
                height: '200px',
                top: '100px',
                left: '100px',
            }">
                <g class="g">
                    <path d="M 0 0 L 200 0 L 200 200 z" :style="{
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                        transform: 'translate(50px, 50px)',
                    }" />
                </g>
            </svg>
            <Moveable
                target=".g"
                :draggable="true"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
            />
        </div>
    </div>
</template>
