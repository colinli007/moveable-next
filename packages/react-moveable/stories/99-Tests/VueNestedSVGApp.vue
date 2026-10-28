<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <svg viewBox="0 0 200 200" :style="{
            border: '1px solid black',
            width: '200px',
            height: '200px',
        }">
            <svg viewBox="0 0 200 200" :style="{
                border: '1px solid black',
                width: '200px',
                height: '200px',
            }">
                <path d="M 0 0 L 200 0 L 200 200 z"
                    class="svg"
                    :style="{
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                    }" />
            </svg>
        </svg>
        <Moveable
            target=".svg"
            :draggable="true"
            :preventClickDefault="true"
            @drag="e => {
                e.target.style.transform = e.transform;
            }"
        />
    </div>
</template>
