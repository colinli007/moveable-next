<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import KeyController from "keycon";
import Moveable from "@/vue3-moveable";

const DIRECTIONS = ["n", "w", "s", "e", "nw", "ne", "sw", "se"];
const isKeydown = ref(false);
const keycon = new KeyController();

keycon.keydown(["meta"], () => {
    isKeydown.value = true;
});
keycon.keyup(["meta"], () => {
    isKeydown.value = false;
});
keycon.on("blur", () => {
    isKeydown.value = false;
});
onBeforeUnmount(() => {
    keycon.destroy();
});
</script>

<template>
    <div class="root">
        <div class="target">Target</div>
        <Moveable
            target=".target"
            :rotatable="{
                renderDirections: isKeydown ? DIRECTIONS : false,
            }"
            :resizable="{
                renderDirections: isKeydown ? false : true,
            }"
            :rotateAroundControls="true"
            @resize="e => {
                e.target.style.cssText += e.cssText;
            }"
            @rotateStart="e => {
                e.setFixedDirection([-0.5, -0.5]);
            }"
            @rotate="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
