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
            width: '700px',
            height: '700px',
        }"
    >
        <div
            ref="container"
            class="container2"
            :style="{
                // position: 'relative',
                width: '499px',
                height: '499px',
                outline: '1px solid #ccc',
            }"
        >
            <div
                class="target2"
                ref="target"
                :style="{
                    width: '200px',
                    height: '200px',
                }"
            >
                Target
            </div>
            <Moveable
                :target="target"
                :draggable="true"
                :scalable="true"
                :edgeDraggable="false"
                :startDragRotate="0"
                :throttleDragRotate="0"
                :keepRatio="false"
                :throttleScale="0"
                :snappable="true"
                :elementGuidelines="[container]"
                :horizontalGuidelines="[150]"
                :verticalGuidelines="[220]"
                @drag="(e) => {
                    e.target.style.cssText += e.cssText;
                    target!.innerText = e.transform;
                }"
                @scale="(e) => {
                    e.target.style.cssText += e.cssText;
                    target!.innerText = e.cssText;
                }"
            />
        </div>
    </div>
</template>
