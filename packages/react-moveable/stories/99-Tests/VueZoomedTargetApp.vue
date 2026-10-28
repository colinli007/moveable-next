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
                <div :style="{
                    position: 'relative',
                    zoom: 0.5,
                }">
                    <div class="target" :style="{
                        transform: 'translate(0px, 0px)',
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
    </div>
</template>
