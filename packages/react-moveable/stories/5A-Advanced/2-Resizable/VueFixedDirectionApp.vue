<script setup lang="ts">
import KeyController from "keycon";
import Moveable from "@/vue3-moveable";
import { throttle } from "@daybrush/utils";

const keycon = KeyController.setGlobal();
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            height: '400px',
            border: '1px solid black',
        }">
            <div class="target resizable" :style="{
                position: 'absolute',
                width: '200px',
                height: '100px',
                top: '50px',
            }">Resizable Target</div>
            <div class="target scalable" :style="{
                position: 'absolute',
                width: '200px',
                height: '100px',
                top: '150px',
                left: '350px',
            }">Scalable Target</div>
            <Moveable
                target=".target.resizable"
                :resizable="true"
                :draggable="true"
                :rotatable="true"
                :snappable="true"
                :bounds="{ left: 0, top: 0, bottom: 0, right: 0, position: 'css' }"
                @resizeStart="e => {
                    e.setFixedDirection([0, 0]);
                }"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @beforeResize="e => {
                    if (keycon.shiftKey) {
                        e.setFixedDirection([-1, -1]);
                    } else {
                        e.setFixedDirection([0, 0]);
                    }
                }"
                @resize="e => {
                    e.target.style.cssText += `width: ${e.width}px; height: ${e.height}px`;
                    e.target.style.transform = e.drag.transform;
                }"
                @beforeRotate="e => {
                    e.setRotation(throttle(e.rotation, 45));
                }"
                @rotate="e => {
                    e.target.style.transform = e.drag.transform;
                }"
            />
            <Moveable
                target=".target.scalable"
                :scalable="true"
                :keepRatio="true"
                :draggable="true"
                :snappable="true"
                :bounds="{ left: 0, top: 0, bottom: 0, right: 0, position: 'css' }"
                @scaleStart="e => {
                    e.setFixedDirection([0, 0]);
                }"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @beforeScale="e => {
                    if (keycon.shiftKey) {
                        e.setFixedDirection([-1, -1]);
                    } else {
                        e.setFixedDirection([0, 0]);
                    }
                }"
                @scale="e => {
                    e.target.style.transform = e.drag.transform;
                }"
            />
        </div>
    </div>
</template>
