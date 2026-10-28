<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container">
        <p>No Stop</p>
        <input type="input" class="target1"/>
        <p>Stop Drag</p>
        <input type="input" class="target2"/>
        <p>Stop Drag</p>
        <select class="target3">
            <option>a</option>
            <option>b</option>
            <option>c</option>
        </select>
        <Moveable
            target=".target1"
            :draggable="true"
            @drag="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
        <Moveable
            target=".target2"
            :draggable="true"
            @dragStart="e => {
                if (['input', 'select'].indexOf(e.target.tagName.toLowerCase()) > -1) {
                    e.stopDrag();
                }
            }"
            @drag="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
        <Moveable
            target=".target3"
            :draggable="true"
            @dragStart="e => {
                if (['input', 'select'].indexOf(e.target.tagName.toLowerCase()) > -1) {
                    e.stopDrag();
                }
            }"
            @drag="e => {
                e.target.style.cssText += e.cssText;
            }"
        />
    </div>
</template>
