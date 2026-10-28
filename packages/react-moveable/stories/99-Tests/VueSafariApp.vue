<script setup lang="ts">
import Moveable from "@/vue3-moveable";
import "./safari.css";
</script>

<template>
    <div class="safari-app">
        <div class="safari-canvas">
            <div class="safari-pages">
                <div class="safari-target" />
                <Moveable
                    target=".safari-target"
                    :draggable="true"
                    @drag="e => {
                        e.target.style.transform = e.transform;
                    }"
                />
            </div>
        </div>
    </div>
</template>
