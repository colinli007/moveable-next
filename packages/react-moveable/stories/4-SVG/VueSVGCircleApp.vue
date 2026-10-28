<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const target = useTemplateRef<SVGCircleElement>("target");
</script>

<template>
    <div class="root" :style="{
        paddingLeft: '100px',
        paddingTop: '100px',
    }">
        <div class="container" :style="{
            transformOrigin: '0 0',
        }">
            <svg viewBox="0 0 200 200" :style="{
                border: '1px solid black',
                width: '200px',
                height: '200px',
            }">
                <circle cx="50" cy="100" r="50" ref="target" />
            </svg>
            <Moveable
                :target="target"
                :draggable="true"
                :rotatable="true"
                :scalable="true"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
        </div>
    </div>
</template>
