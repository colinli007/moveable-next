<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target" :style="{
                position: 'relative',
                top: '50px',
                left: '50px',
                width: '200px',
                height: '200px',
            }">Target</div>
            <Moveable
                target=".target"
                :draggable="true"
                :resizable="{
                    keepRatio: true,
                }"
                :clippable="{
                    keepRatio: false,
                }"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @resize="e => {
                    e.target.style.width = `${e.width}px`;
                    e.target.style.height = `${e.height}px`;
                    e.target.style.transform = e.drag.transform;
                }"
                @clip="e => {
                    e.target.style.clipPath = e.clipStyle;
                }"
            />
        </div>
    </div>
</template>
