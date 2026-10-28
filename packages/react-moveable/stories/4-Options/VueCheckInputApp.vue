<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <p>checkInput (false)</p>
        <input type="input" class="target1" />
        <p>checkInput (true)</p>
        <input type="input" class="target2" />
        <Moveable
            target=".target1"
            :draggable="true"
            @drag="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
        <Moveable
            target=".target2"
            :draggable="true"
            :checkInput="true"
            @drag="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
