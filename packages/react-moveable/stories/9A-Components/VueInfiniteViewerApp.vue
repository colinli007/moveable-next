<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";
import InfiniteViewer from "vue3-infinite-viewer";

const viewer = useTemplateRef<InfiniteViewer>("viewer");

onMounted(() => {
    setTimeout(() => {
        viewer.value!.scrollCenter();
    }, 100);
});

const scrollOptions = {
    container: () => viewer.value!.getContainer(),
    threshold: 20,
    getScrollPosition: () => {
        return [
            viewer.value!.getScrollLeft({ absolute: true }),
            viewer.value!.getScrollTop({ absolute: true }),
        ];
    },
};
</script>

<template>
    <div class="container">
        <button class="button" @click="() => {
            viewer!.scrollCenter();
        }" :style="{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1,
        }">Scroll Center</button>
        <InfiniteViewer class="infinite-viewer" ref="viewer">
            <div class="viewport" :style="{
                width: '400px',
                height: '400px',
                border: '1px solid #ccc',
            }">
                <div class="target">Target</div>
                <Moveable
                    :scrollable="true"
                    :scrollOptions="scrollOptions"
                    target=".target"
                    :draggable="true"
                    :resizable="true"
                    :rotatable="true"
                    @render="e => {
                        e.target.style.cssText += e.cssText;
                    }"
                    @scroll="({ direction }) => {
                        viewer!.scrollBy(direction[0] * 10, direction[1] * 10);
                    }"
                />
            </div>
        </InfiniteViewer>
    </div>
</template>
