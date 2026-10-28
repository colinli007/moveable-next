<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            height: '100px',
        }">
            <div class="target" :style="{
                overflow: 'auto',
            }" @scroll="() => {
                moveable?.updateRect();
            }">
                <div class="scroll" :style="{
                    width: '100%',
                    height: '1000px',
                }"></div>
            </div>
            <Moveable
                ref="moveable"
                target=".target"
                :resizable="true"
                :preventClickDefault="true"
                :draggable="true"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
            />
        </div>
    </div>
</template>
