<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable, { type MoveableManagerInterface, type Renderer } from "@/vue3-moveable";

const Editable = {
    name: "editable",
    props: [],
    events: [],
    render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
        const rect = moveable.getRect();
        const { pos2 } = moveable.state;

        // Add key (required)
        // Add class prefix moveable-(required)
        const EditableViewer = moveable.useCSS("div", `
        {
            position: absolute;
            left: 0px;
            top: 0px;
            will-change: transform;
            transform-origin: 0px 0px;
        }
        .custom-button {
            width: 24px;
            height: 24px;
            margin-bottom: 4px;
            background: #4af;
            border-radius: 4px;
            appearance: none;
            border: 0;
            color: white;
            font-weight: bold;
        }
            `);
        return React.createElement(EditableViewer, {
            key: "editable-viewer",
            className: "moveable-editable",
            style: {
                transform: `translate(${pos2[0]}px, ${pos2[1]}px) rotate(${rect.rotation}deg) translate(10px)`,
            },
        }, React.createElement("button", {
            className: "custom-button",
            onClick: () => {
                alert("+");
            },
        }, "+"), React.createElement("button", {
            className: "custom-button",
            onClick: () => {
                alert("-");
            },
        }, "-"));
    },
} as const;
const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="container">
        <div class="target" ref="target">Target</div>
        <Moveable
            :target="target"
            :ables="[Editable]"
            :props="{
                editable: true,
            }"
            :draggable="true"
            :resizable="true"
            :rotatable="true"
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
