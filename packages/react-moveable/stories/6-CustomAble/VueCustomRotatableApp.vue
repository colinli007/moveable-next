<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable, { makeAble, type MoveableManagerInterface, type Renderer } from "@/vue3-moveable";

const CustomRotation = makeAble("customRotation", {
    render(moveable: MoveableManagerInterface<any, any>, React: Renderer): any {
        const rect = moveable.getRect();
        const { pos1, pos2 } = moveable.state;

        // Add key (required)
        // Add class prefix moveable-(required)
        //  translateY(-20px)
        return React.createElement("div", {
            key: "custom-rotation",
            className: "moveable-custom-rotation",
            style: {
                position: "absolute",
                transform: `translate(-50%, -100%)`
                    + ` translate(${(pos1[0] + pos2[0]) / 2}px, ${(pos1[1] + pos2[1]) / 2}px)`
                    + ` rotate(${rect.rotation}deg) translateY(-20px)`,
                width: "20px",
                height: "20px",
                background: "#f55",
                cursor: "move",
                transformOrigin: "50% 100%",
            },
        });
    },
});
const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="container">
        <p>Custom Rotatation with rotationTarget</p>
        <div class="target" ref="target">Target</div>
        <Moveable
            :target="target"
            :ables="[CustomRotation]"
            :props="{
                customRotation: true,
            }"
            :draggable="true"
            :rotatable="true"
            :resizable="true"
            rotationTarget=".moveable-custom-rotation"
            rotationPosition="none"
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
