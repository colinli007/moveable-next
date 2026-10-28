<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    snappable: boolean;
    isDisplaySnapDigit: boolean;
    isDisplayInnerSnapDigit: boolean;
    snapGap: boolean;
    snapDirections: { top: boolean; left: boolean; bottom: boolean; right: boolean; center: boolean; middle: boolean };
    elementSnapDirections: { top: boolean; left: boolean; bottom: boolean; right: boolean; center: boolean; middle: boolean };
    maxSnapElementGuidelineDistance: number;
}>();
const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            left: '200px',
            top: '100px',
            width: '500px',
            height: '500px',
            border: '1px solid #ccc',
        }">
            <div class="target element1" :style="{
                width: '100px',
                height: '100px',
                left: '0px',
                top: '120px',
            }">Element1</div>
            <div class="target element2" :style="{
                width: '100px',
                height: '100px',
                left: '400px',
                top: '120px',
            }">Element2</div>
            <div class="target element3" :style="{
                width: '300px',
                height: '100px',
                top: '400px',
                left: '50px',
            }">Element3</div>
            <div class="target" ref="target" :style="{
                width: '150px',
                height: '150px',
            }">Target</div>
            <Moveable
                :target="target"
                :draggable="true"
                :scalable="true"
                :rotatable="true"
                :snappable="props.snappable"
                :isDisplaySnapDigit="props.isDisplaySnapDigit"
                :isDisplayInnerSnapDigit="props.isDisplayInnerSnapDigit"
                :snapGap="props.snapGap"
                :snapDirections="props.snapDirections"
                :elementSnapDirections="props.elementSnapDirections"
                :maxSnapElementGuidelineDistance="props.maxSnapElementGuidelineDistance"
                :elementGuidelines="['.element1', '.element2', '.element3']"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
                @snap="e => {
                    console.log(e.guidelines, e.elements);
                }"
            />
        </div>
    </div>
</template>
