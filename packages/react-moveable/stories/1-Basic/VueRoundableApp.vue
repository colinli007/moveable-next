<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container">
            <div class="target target1" :style="{
                left: '10px',
                top: '10px',
                borderRadius: '25px',
            }">Target1</div>
            <div class="target target2" :style="{
                left: '140px',
                top: '10px',
                borderRadius: '25px 23px',
            }">Target2</div>
            <div class="target target3" :style="{
                left: '10px',
                top: '140px',
                borderRadius: '25px 23px / 20px',
            }">Target3</div>
            <div class="target target4" :style="{
                left: '140px',
                top: '140px',
                borderRadius: '25px 25.5px 24.5px 24.9115px / 25.5px 25.5px 24.5px 24.5px',
            }">Target4</div>
            <Moveable
                target=".target1"
                :draggable="true"
                :roundable="true"
                :resizable="true"
                isDisplayShadowRoundControls="horizontal"
                roundClickable="control"
                :roundPadding="15"
                @round="e => {
                    console.log('ROUND', e.borderRadius);
                }"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
                @renderEnd="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
            <Moveable
                target=".target2"
                :roundable="true"
                :roundClickable="true"
                @round="e => {
                    console.log('ROUND', e.borderRadius);
                    e.target.style.borderRadius = e.borderRadius;
                }"
            />
            <Moveable
                target=".target3"
                :roundable="true"
                @round="e => {
                    console.log('ROUND', e.borderRadius);
                    e.target.style.borderRadius = e.borderRadius;
                }"
            />
            <Moveable
                target=".target4"
                :roundable="true"
                @round="e => {
                    console.log('ROUND', e.borderRadius);
                    e.target.style.borderRadius = e.borderRadius;
                }"
            />
        </div>
    </div>
</template>
