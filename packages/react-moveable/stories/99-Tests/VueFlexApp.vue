<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <div class="target" :style="{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '21px',
            position: 'relative',
            width: '446px',
            height: '124px',
            zIndex: 1,
        }"></div>
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
