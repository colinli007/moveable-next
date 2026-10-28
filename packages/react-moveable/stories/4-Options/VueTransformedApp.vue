<script setup lang="ts">
import Moveable from "@/vue3-moveable";

const rootContainer = document.body;
</script>

<template>
    <div class="root" :style="{
        transformOrigin: '0 0',
        transform: `scale(0.5)`,
    }">
        <div class="container">
            <div :style="{
                position: 'relative',
                transform: 'translate3d(0px, 0px, 100px)',
            }">
                <div class="target" :style="{
                    transform: 'translate(0px, 0px)',
                }">Target</div>
                <Moveable
                    target=".target"
                    :draggable="true"
                    :rotatable="true"
                    :rootContainer="rootContainer"
                    @render="e => {
                        e.target.style.cssText += e.cssText;
                    }"
                />
            </div>
        </div>
    </div>
</template>
