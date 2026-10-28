<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    maxSnapElementGuidelineDistance: number;
    maxSnapElementGapDistance: number;
}>();
const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            left: '100px',
            top: '100px',
            width: '500px',
            height: '500px',
            border: '1px solid #ccc',
        }">
            <div class="target element1" :style="{
                width: '100px',
                height: '100px',
                left: '-150px',
                top: '150px',
            }">Element1</div>
            <div class="target element2" :style="{
                width: '100px',
                height: '100px',
                left: '0px',
                top: '120px',
            }">Element2</div>
            <div class="target element3" :style="{
                width: '100px',
                height: '100px',
                left: '400px',
                top: '120px',
            }">Element3</div>
            <div class="target element4" :style="{
                width: '100px',
                height: '100px',
                left: '550px',
                top: '150px',
            }">Element4</div>
            <div class="target" ref="target" :style="{
                width: '150px',
                height: '150px',
            }">Target</div>
            <Moveable
                :target="target"
                :draggable="true"
                :snappable="true"
                :elementGuidelines="['.element1', '.element2', '.element3', '.element4']"
                :snapDirections="{
                    top: true,
                    left: true,
                    bottom: true,
                    right: true,
                    center: true,
                    middle: true,
                }"
                :elementSnapDirections="{
                    top: true,
                    left: true,
                    bottom: true,
                    right: true,
                    center: true,
                    middle: true,
                }"
                :maxSnapElementGuidelineDistance="props.maxSnapElementGuidelineDistance"
                :maxSnapElementGapDistance="props.maxSnapElementGapDistance"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @scale="e => {
                    e.target.style.transform = e.drag.transform;
                }"
            />
        </div>
    </div>
</template>
