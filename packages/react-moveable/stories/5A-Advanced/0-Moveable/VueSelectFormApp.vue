<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import Moveable from "@/vue3-moveable";

const target = shallowRef<HTMLSelectElement>();

onMounted(() => {
    target.value = document.querySelector<HTMLSelectElement>("select")!;
});
</script>

<template>
    <div class="root">
        <select :style="{
            position: 'relative',
            width: '200px',
            height: '100px',
        }">
            <option value="1">Option1</option>
            <option value="2">Option2</option>
            <option value="3">Option3</option>
        </select>
        <Moveable
            :target="target"
            :draggable="true"
            @render="e => {
                e.target.style.transform = e.transform;
            }"
        />
    </div>
</template>
