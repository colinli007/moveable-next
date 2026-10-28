<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");
</script>

<template>
    <div class="container">
        <button @click="() => {
            moveable!.updateRect();
        }">Resize</button>
        <div class="target target1" :style="{
            transform: 'rotate(30deg)',
        }">Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3" :style="{
            transform: 'rotate(30deg)',
        }">Target3</div>
        <Moveable
            ref="moveable"
            :target="[['.target1, .target2'], '.target3']"
            :draggable="true"
            :rotatable="true"
            :scalable="true"
            @renderGroup="e => {
                e.events.forEach(ev => {
                    ev.target.style.transform = ev.transform;
                });
            }"
        />
    </div>
</template>
