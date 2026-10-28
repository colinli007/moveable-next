<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            left: '200px',
            top: '100px',
            width: '500px',
            height: '500px',
            border: '1px solid #ccc',
        }">
            <div class="target target1">Target 1</div>
            <div class="target target2">Target 2</div>
            <div class="target target3">Target 3</div>
            <Moveable
                target=".target"
                :draggable="true"
                :rotatable="true"
                :snappable="true"
                :verticalGuidelines="[0, 100]"
                :elementGuidelines="['.container']"
                @renderGroup="e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }"
            />
        </div>
    </div>
</template>
