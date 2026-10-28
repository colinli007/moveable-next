<script setup lang="ts">
import Moveable from "@/vue3-moveable";

const arr: number[] = [];

for (let i = 0; i < 300; ++i) {
    arr.push(i);
}
</script>

<template>
    <div class="root">
        <div class="container">
            <template v-for="i in arr" :key="i">
                <div :class="`target target${i}`">Target</div>
                <Moveable
                    :target="`.target${i}`"
                    :draggable="true"
                    @render="e => {
                        e.target.style.cssText += e.cssText;
                    }"
                />
            </template>
        </div>
    </div>
</template>
