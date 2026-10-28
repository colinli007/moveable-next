<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <p class="description">
            * You can persist by `moveable.getRect()` method.
        </p>
        <div class="target" :style="{
            transform: 'translate(100px, 100px) rotate(45deg)',
        }">
            No Target
        </div>
        <Moveable
            :draggable="true"
            :resizable="true"
            :rotatable="true"
            :origin="true"
            :persistData="{
                left: 179.2893,
                top: 229.2893,
                offsetHeight: 100,
                offsetWidth: 100,
                origin: [250, 300],
                pos1: [250, 229.2893],
                pos2: [320.7107, 300],
                pos3: [179.2893, 300],
                pos4: [250, 370.7107],
                transformOrigin: [
                    50,
                    50,
                ],
            }"
            @render="e => {
                e.target.style.cssText += e.cssText;

                console.log(e.moveable.getRect());
            }"
        />
    </div>
</template>
