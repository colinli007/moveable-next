<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container" :style="{
            width: '500px',
            height: '500px',
            border: '1px solid #ccc',
        }">
            <div class="target" :style="{
                width: '200px',
                height: '150px',
            }">Target</div>
            <Moveable
                target=".target"
                :draggable="true"
                :snappable="true"
                :verticalGuidelines="[
                    0,
                    100,
                    {
                        pos: 200,
                        className: 'red',
                    },
                ]"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
            />
        </div>
    </div>
</template>
