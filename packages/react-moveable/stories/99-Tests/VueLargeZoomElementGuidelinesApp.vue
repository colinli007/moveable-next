<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="container" :style="{
    }">
        <div class="preview" :style="{
            position: 'relative',
            width: '800px',
            height: '800px',
            transform: 'scale(3.67123)',
            transformOrigin: '20% 20%',
            background: '#eee',
        }">
            <div class="target target1" :style="{
                top: '0px',
                left: '0px',
                width: '142.1232px',
                transform: 'translate(150px, 100px)',
            }">Target1</div>
            <div class="target target2" :style="{
                top: '0px',
                left: '100px',
                width: '142.1232px',
                transform: 'translate(150px, 100px)',
            }">Target2</div>
        </div>
        <Moveable
            target=".target"
            :draggable="true"
            :snappable="true"
            :snapDirections="{
                'top': true,
                'left': true,
                'bottom': true,
                'right': true,
                'center': true,
                'middle': true,
            }"
            :elementSnapDirections="{
                'top': true, 'left': true,
                'bottom': true, 'right': true,
                'center': true, 'middle': true,
            }"
            :individualGroupable="true"
            :snapGap="true"
            :elementGuidelines="['.target1']"
            @drag="e => {
                e.target.style.transform = e.transform;
            }"
        />
    </div>
</template>
