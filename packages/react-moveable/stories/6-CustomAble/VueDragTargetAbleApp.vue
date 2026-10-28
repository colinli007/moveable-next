<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
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
const dragTarget = shallowRef<HTMLElement>();

onMounted(() => {
    dragTarget.value = document.querySelector<HTMLElement>(".moveable-dimension")!;
});
</script>

<template>
    <div class="container">
        <div class="target target1"></div>
        <div class="target target2"></div>
        <Moveable
            :ables="[DimensionViewable]"
            :dragTarget="dragTarget"
            :resizable="true"
            :props="{
                dimensionViewable: true,
            }"
            :target="['.target1']"
            :draggable="true"
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
            :elementGuidelines="['.target1', '.target2']"
            :snappable="true"
        />
    </div>
</template>
