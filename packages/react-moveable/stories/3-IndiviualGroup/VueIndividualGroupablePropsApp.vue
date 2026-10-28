<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target target1">Target1</div>
            <div class="target target2">Target2</div>
            <div class="target target3">Target3</div>
            <Moveable
                target=".target"
                :individualGroupable="true"
                :draggable="true"
                :resizable="true"
                :rotatable="true"
                :individualGroupableProps="element => {
                    if (element!.classList.contains('target2')) {
                        return {
                            resizable: false,
                        };
                    }
                }"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
        </div>
    </div>
</template>
