<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root">
        <div class="container">
            <p class="description">
                * There is a subpixel issue because offsetLeft and offsetTop are used. <br />
                * You can accurately represent the position of a movable control box. <br />
                * However, since gBCR is used, css zoom should not be used <br />
                * and `transform: rotate` should not be used for container, rootContainer.
            </p>
            <div :style="{
                transformOrigin: '0 0',
                transform: 'scale(2, 2)',
            }">
                <div class="target target1" :style="{
                    position: 'relative',
                    left: '10.5px',
                    top: '10.5px',
                    width: '100px',
                    height: '40px',
                    lineHeight: '40px',
                    fontSize: '10px',
                }">
                    Not Accurate
                </div>
            </div>
            <Moveable
                target=".target1"
                :draggable="true"
                :origin="false"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
            <div :style="{
                transformOrigin: '0 0',
                transform: 'scale(2, 2)',
            }">
                <div class="target target2" :style="{
                    position: 'absolute',
                    left: '10.5px',
                    top: '50.5px',
                    width: '100px',
                    height: '40px',
                    lineHeight: '40px',
                    fontSize: '10px',
                }">
                    Accurate
                </div>
            </div>
            <Moveable
                target=".target2"
                :draggable="true"
                :origin="false"
                :useAccuratePosition="true"
                @render="e => {
                    e.target.style.cssText += e.cssText;
                }"
            />
        </div>
    </div>
</template>
