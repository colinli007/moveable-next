<script setup lang="ts">
import Moveable from "@/vue3-moveable";
import { throttle } from "@daybrush/utils";
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            height: '400px',
            border: '1px solid black',
        }">
            <div class="target target1 group">Target1</div>
            <div class="target target2 group">Target2</div>
            <div class="target target3 group">Target3</div>
            <div class="target rotatable" :style="{
                position: 'absolute',
                width: '200px',
                height: '100px',
                top: '50px',
            }">Single Target</div>
            <Moveable
                target=".target.rotatable"
                :resizable="true"
                :draggable="true"
                :rotatable="true"
                @beforeRotate="e => {
                    e.setRotation(throttle(e.rotation, 45));
                }"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
            <Moveable
                target=".target.group"
                :draggable="true"
                :rotatable="true"
                @beforeRotateGroup="e => {
                    e.setRotation(throttle(e.rotation, 45));
                }"
                @renderGroup="e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }"
            />
        </div>
    </div>
</template>
