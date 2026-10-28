<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container">
            <svg viewBox="0 0 86 54">
                <foreignObject x="10" y="10" width="20" height="20">
                    <div>Hi</div>
                </foreignObject>
            </svg>
            <Moveable
                target="foreignObject"
                :draggable="true"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
        </div>
    </div>
</template>
