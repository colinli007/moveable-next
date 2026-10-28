<script setup lang="ts">
import { shallowRef } from "vue";
import Moveable, { type OnDragEnd } from "@/vue3-moveable";
import "./snap.css";

const snapContainer = shallowRef<HTMLElement | string>(".snapGrid");

function onMoustEnter(e: MouseEvent) {
    snapContainer.value = e.currentTarget as HTMLElement;
}
function onDragStart() {
    document.querySelectorAll<HTMLElement>(".snapGrid").forEach(grid => {
        grid.addEventListener("mouseenter", onMoustEnter);
    });
}
function onDragEnd(e: OnDragEnd) {
    e.target.style.pointerEvents = "";
    document.querySelectorAll<HTMLElement>(".snapGrid").forEach(grid => {
        grid.removeEventListener("mouseenter", onMoustEnter);
    });
}
</script>

<template>
    <div class="root" :style="{
        position: 'relative',
        border: '1px solid black',
    }">
        <Moveable
            target=".target"
            :draggable="true"
            :snappable="true"
            :horizontalGuidelines="[0, 100, 200, 300]"
            :verticalGuidelines="[0, 100, 200, 300]"
            :snapContainer="snapContainer"
            @dragStart="onDragStart"
            @drag="e => {
                e.target.style.transform = e.transform;
                e.target.style.pointerEvents = 'none';
            }"
            @dragEnd="onDragEnd"
        />
        <div class="container">
            <div class="snapGrid">
                <div class="target" :style="{
                    width: '200px',
                    height: '150px',
                    transform: 'translate(0px, 0px) scale(1.5, 1)',
                }">Target</div>
            </div>
            <div class="snapGrid"></div>
        </div>
    </div>
</template>
