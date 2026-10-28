<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            display: 'flex',
        }">
            <div class="target" ref="target" :style="{
                position: 'relative',
                width: '200px',
                height: '100px',
            }">Target</div>
            <Moveable
                :target="target"
                :resizable="true"
                :keepRatio="true"
                :throttleResize="1"
                @resize="e => {
                    e.target.style.width = `${e.width}px`;
                    e.target.style.height = `${e.height}px`;
                    e.target.style.transform = e.drag.transform;
                }"
                @resizeEnd="e => {
                    const lastEvent = e.lastEvent;

                    if (lastEvent) {
                        console.log(lastEvent.drag.transform);
                    }
                }"
            />
        </div>
    </div>
</template>
