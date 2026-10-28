<script setup lang="ts">
import Moveable from "@/vue3-moveable";

const props = defineProps<{
    draggable: boolean;
    throttleDrag: number;
    edgeDraggable: boolean;
    startDragRotate: number;
    throttleDragRotate: number;
    resizable: boolean;
    keepRatio: boolean;
    edge: Array<"n" | "w" | "s" | "e">;
}>();
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            width: '500px',
            height: '500px',
            border: '1px solid #ccc',
        }">
            <div class="target target1" :style="{
                top: '100px',
                left: '100px',
            }">Target1</div>
            <div class="target target2" :style="{
                top: '150px',
                left: '150px',
            }">Target2</div>
            <div class="target target3" :style="{
                top: '200px',
                left: '200px',
            }">Target3</div>
            <Moveable
                target=".target"
                :draggable="props.draggable"
                :throttleDrag="props.throttleDrag"
                :edgeDraggable="props.edgeDraggable"
                :startDragRotate="props.startDragRotate"
                :throttleDragRotate="props.throttleDragRotate"
                :resizable="props.resizable"
                :keepRatio="props.keepRatio"
                :edge="props.edge"
                :snappable="true"
                :snapGridWidth="50"
                :snapGridHeight="50"
                :snapThreshold="50"
                :snapGridAll="true"
                :isDisplayGridGuidelines="true"
                @renderGroup="e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }"
            />
        </div>
    </div>
</template>
