<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="no-container">
        <div class="will-change-container">
            <!-- <div class="will-change-inner"> -->
                <div class="will-change-target">Target1</div>
            <!-- </div> -->
        </div>
        <Moveable
            target=".will-change-target"
            :draggable="true"
            :preventClickDefault="true"
            @drag="e => {
                e.target.style.transform = e.transform;
            }"
        />
    </div>
</template>
