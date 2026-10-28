<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const span = useTemplateRef<HTMLSpanElement>("span");
</script>

<template>
    <div class="container">
        <span ref="span">Position</span>
        <div class="preview" :style="{
            position: 'relative',
            width: '800px',
            height: '800px',
            transform: 'scale(0.67123)',
            transformOrigin: 'top left',
            background: '#eee',
        }">
            <div class="target" :style="{
                top: '0px',
                left: '0px',
                transform: 'translate(150px, 100px)',
            }">Target</div>
        </div>
        <Moveable
            target=".target"
            :draggable="true"
            :snappable="true"
            snapContainer=".preview"
            :bounds="{
                left: 0,
                top: 0,
            }"
            @drag="e => {
                e.target.style.transform = e.transform;

                span!.innerHTML = `${e.translate[0]} x ${e.translate[1]}`;
            }"
        />
    </div>
</template>
