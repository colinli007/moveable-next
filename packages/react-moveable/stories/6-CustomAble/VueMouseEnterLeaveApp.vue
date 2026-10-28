<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable, { makeAble, type MoveableManagerInterface } from "@/vue3-moveable";

const MouseEnterLeaveAble = makeAble("enterLeave", {
    mouseEnter(moveable: MoveableManagerInterface) {
        if (moveable.moveables) {
            // group
            moveable.moveables.forEach(child => {
                child.state.target!.style.backgroundColor = "#e55";
            });
        } else {
            // single
            moveable.state.target!.style.backgroundColor = "#e55";
        }
    },
    mouseLeave(moveable: MoveableManagerInterface) {
        if (moveable.moveables) {
            // group
            moveable.moveables.forEach(child => {
                child.state.target!.style.backgroundColor = "";
            });
        } else {
            // single
            moveable.state.target!.style.backgroundColor = "";
        }
    },
});
const target = useTemplateRef<HTMLDivElement>("target");
</script>

<template>
    <div class="container">
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3" ref="target">Target3</div>
        <Moveable
            :target="target"
            :ables="[MouseEnterLeaveAble]"
            :origin="false"
            :props="{
                enterLeave: true,
            }"
            :draggable="true"
            @drag="e => {
                e.target.style.transform = e.transform;
            }"
        />
        <Moveable
            :target="['.target1', '.target2']"
            :ables="[MouseEnterLeaveAble]"
            :origin="false"
            :props="{
                enterLeave: true,
            }"
            :draggable="true"
            @dragGroup="e => {
                e.events.forEach(ev => {
                    ev.target.style.transform = ev.transform;
                });
            }"
        />
    </div>
</template>
