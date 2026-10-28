<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target target1">
                Target
                <div class="target target2">
                    Target
                </div>
            </div>
            <Moveable
                target=".target1"
                :draggable="true"
                :stopPropagation="true"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
            />
            <Moveable
                target=".target2"
                :draggable="true"
                :stopPropagation="true"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
            />
        </div>
    </div>
</template>
