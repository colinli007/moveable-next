<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <svg width="50" height="50" :style="{
            transform: 'translate(13px, 37px)',
        }">
            <circle cx="25" cy="25" r="25" fill="blue"></circle>
        </svg>
        <svg width="50" height="50" :style="{
            transform: 'translate(104px, 30px)',
        }">
            <rect width="50" height="50" rx="3" fill="red" />
        </svg>
        <Moveable
            target="svg"
            :draggable="true"
            @drag="e => {
                e.target.style.transform = e.transform;
            }"
        />
    </div>
</template>
