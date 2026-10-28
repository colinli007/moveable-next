<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const target = useTemplateRef<SVGPathElement>("target");
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            transformOrigin: '0 0',
        }">
            <svg viewBox="0 0 200 200" :style="{
                position: 'relative',
                border: '1px solid black',
                width: '200px',
                height: '200px',
                top: '100px',
                left: '100px',
            }">
                <g
                    transform="translate(10, 10) rotate(0)"
                    x="50"
                    y="50"
                >
                    <path d="M 50 50 L 250 50 L 250 250 z" ref="target" :style="{
                        transform: 'translate(30px, 30px) rotate(20deg)',
                        fill: 'white',
                        stroke: 'red',
                        strokeWidth: 2,
                    }" />
                </g>
            </svg>
            <Moveable
                :target="target"
                :draggable="true"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
            />
        </div>
    </div>
</template>
