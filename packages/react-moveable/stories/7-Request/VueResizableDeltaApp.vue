<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable, { type OnResize, type ResizableRequestParam } from "@/vue3-moveable";

const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");

function onResize(e: OnResize) {
    e.target.style.width = `${e.width}px`;
    e.target.style.height = `${e.height}px`;
    const input = document.querySelector(".input")!;

    input.innerHTML = JSON.stringify({ dist: e.dist, width: e.width, height: e.height });
}
</script>

<template>
    <div class="root">
        <button @click="() => {
            moveable!.request<ResizableRequestParam>('resizable', {
                deltaHeight: 12,
            }, true);
        }">request</button>
        <div class="input"></div>
        <div class="container">
            <div class="target" :style="{
                width: '381.609px',
                height: '119.416px',
                color: 'black',
                marginTop: '20px',
                marginLeft: '20px',
                border: 'none',
            }">Target1</div>
            <Moveable
                ref="moveable"
                target=".target"
                :resizable="true"
                @resize="onResize"
            />
        </div>
    </div>
</template>
