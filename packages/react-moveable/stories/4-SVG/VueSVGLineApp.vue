<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const target = useTemplateRef<SVGLineElement>("target");
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
                <line x1="0" y1="80" x2="100" y2="80" stroke-width="4" stroke="black" ref="target" />
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
