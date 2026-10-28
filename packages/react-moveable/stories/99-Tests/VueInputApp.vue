<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <input type="text" class="target" />
        <Moveable
            target=".target"
            :draggable="true"
            @drag="e => {
                e.target.style.transform = e.transform;
            }"
        />
    </div>
</template>
