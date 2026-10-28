<script setup lang="ts">
import Moveable from "@/vue3-moveable";

const rootContainer = document.body;
</script>

<template>
    <div class="root" :style="{
        paddingTop: '100px',
    }">
        <div>
            <div :style="{
                position: 'relative',
                transform: 'translate3d(0px, 0px, 100px)',
            }">
                <div class="target" :style="{
                    translate: '100px 10px',
                    rotate: '30deg',
                    scale: '1 2',
                    transform: 'translate(100px, 0px)',
                }">Target</div>
            </div>
            <Moveable
                target=".target"
                :draggable="true"
                :rotatable="true"
                :resizable="true"
                :rootContainer="rootContainer"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
        </div>
    </div>
</template>
