<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <div class="target">Target1</div>
        <Moveable
            target=".aaa"
            :draggable="true"
            :preventClickDefault="true"
            @drag="e => {
                e.target.style.transform = e.transform;
            }"
        />
    </div>
</template>
