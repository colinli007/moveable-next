<script setup lang="ts">
import { onMounted, shallowRef, useTemplateRef } from "vue";
import Moveable, { type MoveableManagerInterface, type Renderer } from "@/vue3-moveable";

const DimensionViewable = {
    name: "dimensionViewable",
    props: [],
    events: [],
    render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
        const rect = moveable.getRect();

        // Add key (required)
        // Add class prefix moveable-(required)
        return React.createElement("div", {
            key: "dimension-viewer",
            className: "moveable-dimension",
            style: {
                position: "absolute",
                left: `${rect.width / 2}px`,
                top: `${rect.height + 20}px`,
                background: "#4af",
                borderRadius: "2px",
                padding: "2px 4px",
                color: "white",
                fontSize: "13px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                willChange: "transform",
                transform: `translate(-50%, 0px)`,
            },
        }, "Target");
    },
} as const;

const target = useTemplateRef<HTMLDivElement>("target");
const dragTarget = shallowRef<HTMLElement>();

onMounted(() => {
    dragTarget.value = document.querySelector<HTMLElement>(".moveable-dimension")!;
});
</script>

<template>
    <div class="container">
        <div class="target" ref="target"></div>
        <Moveable
            :target="target"
            :ables="[DimensionViewable]"
            :draggable="true"
            :resizable="true"
            :rotatable="true"
            :dragTarget="dragTarget"
            :props="{
                dimensionViewable: true,
            }"
            @drag="e => {
                e.target.style.transform = e.transform;
            }"
            @resize="e => {
                e.target.style.width = `${e.width}px`;
                e.target.style.height = `${e.height}px`;
                e.target.style.transform = e.drag.transform;
            }"
            @rotate="e => {
                e.target.style.transform = e.drag.transform;
            }"
        />
    </div>
</template>
