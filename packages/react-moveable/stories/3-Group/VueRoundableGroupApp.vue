<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target target1" :style="{
                borderRadius: '10px',
            }">Target1</div>
            <div class="target target2">Target2</div>
            <div class="target target3">Target3</div>
            <Moveable
                target=".target"
                :draggable="true"
                :roundable="true"
                :resizable="true"
                :rotatable="true"
                isDisplayShadowRoundControls="horizontal"
                roundClickable="control"
                :roundPadding="15"
                @renderGroup="e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }"
            />
        </div>
    </div>
</template>
