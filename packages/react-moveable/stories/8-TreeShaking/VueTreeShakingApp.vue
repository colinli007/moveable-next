<script setup lang="ts">
import { useTemplateRef } from "vue";
import {
    type DraggableProps, makeMoveable, type ResizableProps,
    type RotatableProps, Rotatable, Draggable, Resizable,
} from "@/vue3-moveable";

const Moveable = makeMoveable<DraggableProps & ResizableProps & RotatableProps>([
    Draggable,
    Resizable,
    Rotatable,
]);
const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="container">
        <p>Use only Draggable, Resizable, Rotatable (the other ables are left out of the bundle)</p>
        <div class="target" ref="target">Target</div>
        <Moveable
            :target="target"
            :draggable="true"
            :resizable="true"
            :rotatable="true"
            @render="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
