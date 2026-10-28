<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            height: '400px',
            border: '10px solid black',
            transform: 'translate(40px, 40px)',
        }">
            <div class="target" :style="{
                position: 'fixed',
                width: '200px',
                height: '100px',
                top: '50px',
                left: '50px',
            }">Fixed Target</div>
            <Moveable
                target=".target"
                :resizable="true"
                :draggable="true"
                :rotatable="true"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @resize="e => {
                    e.target.style.cssText += `width: ${e.width}px; height: ${e.height}px`;
                    e.target.style.transform = e.drag.transform;
                }"
                @rotate="e => {
                    e.target.style.transform = e.drag.transform;
                }"
            />
        </div>
    </div>
</template>
