<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const container = useTemplateRef<HTMLDivElement>("container");
const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div
        class="root"
        :style="{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '700.2px',
            height: '700.2px',
        }"
    >
        <div
            ref="container"
            class="container2"
            :style="{
                width: '299px',
                height: '299px',
                outline: '10px solid #ccc',
            }"
        >
            <div
                class="target2"
                ref="target"
                :style="{
                    width: '100px',
                    height: '100px',
                }"
            >
                Target
            </div>
            <Moveable
                :target="target"
                :draggable="true"
                :edgeDraggable="false"
                :startDragRotate="0"
                :throttleDragRotate="0"
                :keepRatio="false"
                :throttleScale="0"
                :snappable="true"
                :snapDirections="{
                    top: true,
                    left: true,
                    bottom: true,
                    right: true,
                    center: true,
                    middle: true,
                }"
                :elementSnapDirections="{
                    middle: true,
                    center: true,
                    top: true,
                    left: true,
                    bottom: true,
                    right: true,
                }"
                :snapThreshold="5"
                :elementGuidelines="[container]"
                @drag="(e) => {
                    e.target.style.transform = e.transform;
                    target!.innerText = e.transform;
                }"
                @scale="(e) => {
                    e.target.style.transform = e.drag.transform;
                }"
            />
        </div>
    </div>
</template>
