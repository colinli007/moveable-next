<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    keepRatio: boolean;
    throttleScale: number;
    renderDirections: string[];
}>();
const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target" ref="target">Target</div>
            <Moveable
                :target="target"
                :scalable="true"
                :keepRatio="props.keepRatio"
                :throttleScale="props.throttleScale"
                :renderDirections="props.renderDirections"
                @scale="e => {
                    e.target.style.transform = e.drag.transform;
                }"
            />
        </div>
    </div>
</template>
