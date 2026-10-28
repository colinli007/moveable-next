<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable, { type RotationPosition } from "@/vue3-moveable";

const props = defineProps<{
    rotatable: boolean;
    throttleRotate: number;
    rotationPosition: RotationPosition;
}>();
const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target" ref="target" :style="{
                transform: 'translate(0px, 0px) rotate(0deg)',
            }">Target</div>
            <Moveable
                :target="target"
                :rotatable="props.rotatable"
                :throttleRotate="props.throttleRotate"
                :rotationPosition="props.rotationPosition"
                @rotate="e => {
                    e.target.style.transform = e.drag.transform;
                }"
            />
        </div>
    </div>
</template>
