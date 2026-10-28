<script setup lang="ts">
import { useTemplateRef } from "vue";
import Moveable from "@/vue3-moveable";

const target1 = useTemplateRef<HTMLInputElement>("target1");
const target2 = useTemplateRef<HTMLDivElement>("target2");
</script>

<template>
    <div class="container">
        <p>Input <button @click="() => {
            target1!.focus();
        }">Focus Input</button></p>
        <input type="input" class="target1" ref="target1" />
        <p>Content Editable <button @click="() => {
            target2!.focus();
        }">Focus contenteEditable</button></p>
        <div class="target2" contenteditable="true" ref="target2" :style="{
            width: '100px',
            height: '100px',
        }"></div>
        <Moveable
            target=".target1"
            :draggable="true"
            :dragFocusedInput="true"
            @drag="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
        <Moveable
            target=".target2"
            :draggable="true"
            :dragFocusedInput="true"
            @drag="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
