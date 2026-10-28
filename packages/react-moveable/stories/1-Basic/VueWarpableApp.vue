<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    warpable: boolean;
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
                :warpable="props.warpable"
                :renderDirections="props.renderDirections"
                @warp="e => {
                    e.target.style.transform = e.transform;
                }"
            />
        </div>
    </div>
</template>
