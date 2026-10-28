<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
        <Moveable
            target=".target"
            :draggable="true"
            :resizable="true"
            @resizeGroupStart="({ events }) => {
                events[0].setMin([50, 50]);
                events[1].setMin([60, 50]);
                events[2].setMin([50, 60]);
            }"
            @resizeGroup="({ events }) => {
                events.forEach(ev => {
                    ev.target.style.width = `${ev.width}px`;
                    ev.target.style.height = `${ev.height}px`;
                    ev.target.style.transform = ev.drag.transform;
                });
            }"
            @dragGroup="({ events }) => {
                events.forEach(ev => {
                    ev.target.style.transform = ev.transform;
                });
            }"
            @dragGroupEnd="({ events }) => {
                console.log(events);
            }"
        />
    </div>
</template>
