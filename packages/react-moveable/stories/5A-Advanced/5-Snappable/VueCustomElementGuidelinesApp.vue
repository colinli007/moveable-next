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
            <div class="target element1" :style="{
                width: '100px',
                height: '100px',
                left: '0px',
                top: '120px',
            }">Element1</div>
            <div class="target element2" :style="{
                width: '100px',
                height: '100px',
                left: '400px',
                top: '120px',
            }">Element2</div>
            <div class="target element3" :style="{
                width: '300px',
                height: '100px',
                top: '400px',
                left: '50px',
            }">Element3</div>
            <div class="target center" :style="{
                width: '200px',
                height: '150px',
            }">Target</div>
            <Moveable
                target=".center"
                :draggable="true"
                :snappable="true"
                :snapDirections="{
                    top: true,
                    left: true,
                    bottom: true,
                    right: true,
                    center: true,
                    middle: true,
                }"
                :elementSnapDirections="{
                    top: true,
                    left: true,
                    bottom: true,
                    right: true,
                    center: true,
                    middle: true,
                }"
                :maxSnapElementGuidelineDistance="70"
                :elementGuidelines="[{
                    element: '.element1',
                    className: 'red',
                }, {
                    element: '.element2',
                    className: 'green',
                }, {
                    element: '.element3',
                }]"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
            />
        </div>
    </div>
</template>
