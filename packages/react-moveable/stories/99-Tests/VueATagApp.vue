<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <div class="target"><a href="https://daybrush.com">Target1</a></div>
        <Moveable
            target=".target"
            :draggable="true"
            :preventClickDefault="true"
            @drag="e => {
                e.target.style.transform = e.transform;
            }"
        />
    </div>
</template>
