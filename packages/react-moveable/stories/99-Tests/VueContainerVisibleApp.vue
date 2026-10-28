<script setup lang="ts">
import { computed, onMounted, shallowRef, useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const containerElement = useTemplateRef<HTMLDivElement>("containerElement");
// Moveable is rendered once the container exists: it is created with the targets and the container.
const container = shallowRef<HTMLDivElement | null>(null);
const target1 = computed(() => container.value?.querySelector<HTMLElement>(".target1"));
const individualTargets = computed(() => Array.from(container.value?.querySelectorAll<HTMLElement>(".target2, .target3") ?? []));

onMounted(() => {
    container.value = containerElement.value;
});
</script>

<template>
    <div class="root">
        <div class="container" ref="containerElement">
            <div class="target target1" :style="{ left: '0px', top: '0px' }">Target1</div>
            <div class="target target2" :style="{ left: '150px', top: '0px' }">Target2</div>
            <div class="target target3" :style="{ left: '300px', top: '0px' }">Target3</div>
            <template v-if="container">
                <Moveable
                    :target="target1"
                    :container="container"
                    :draggable="true"
                />
                <Moveable
                    :target="individualTargets"
                    :container="container"
                    :individualGroupable="true"
                    :draggable="true"
                />
            </template>
        </div>
    </div>
</template>
