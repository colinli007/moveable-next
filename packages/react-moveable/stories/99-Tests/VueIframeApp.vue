<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const iframe = useTemplateRef<HTMLIFrameElement>("iframe");
const container = computed(() => iframe.value?.contentWindow?.document?.body);
const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="root">
        <div class="container">
            <iframe ref="iframe"></iframe>
            <Teleport v-if="container" :to="container">
                <div class="target" ref="target">Target</div>
                <Moveable
                    :target="target"
                    :draggable="true"
                    @render="e => {
                        e.target.style.cssText += e.cssText;
                    }"
                />
            </Teleport>
        </div>
    </div>
</template>
