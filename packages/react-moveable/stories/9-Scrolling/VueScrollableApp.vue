<script setup lang="ts">
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    threshold: number;
    throttleTime: number;
    checkScrollEvent: boolean;
}>();
</script>

<template>
    <div class="container">
        <div class="scrollArea">
            <div class="target">Target</div>
            <Moveable
                :scrollable="true"
                :scrollOptions="{
                    container: '.scrollArea',
                    threshold: props.threshold,
                    checkScrollEvent: props.checkScrollEvent,
                    throttleTime: props.throttleTime,
                }"
                target=".target"
                :draggable="true"
                :resizable="true"
                :rotatable="true"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
                @scroll="({ scrollContainer, direction }) => {
                    scrollContainer.scrollBy(direction[0] * 10, direction[1] * 10);
                }"
            />
        </div>
    </div>
</template>
