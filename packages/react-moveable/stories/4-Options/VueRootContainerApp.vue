<script setup lang="ts">
import Moveable from "@/vue3-moveable";

const rootContainer = document.body;
</script>

<template>
    <div class="margin no-relative">
        <div :style="{
            position: 'absolute',
            left: '84px',
            top: '159px',
            zIndex: 1,
        }">92 x 167 (34, 84)</div>
        <div class="root" :style="{
            padding: '10px',
        }">
            <div :style="{
                zoom: 0.5,
                position: 'relative',
            }">
                <div :style="{
                    position: 'relative',
                    marginTop: '100px',
                    width: '500px',
                    height: '500px',
                }">
                    <div class="target" :style="{
                        transform: 'translate(0px, 0px)',
                    }">Target</div>
                    <Moveable
                        target=".target"
                        :draggable="true"
                        :rotatable="true"
                        :resizable="true"
                        :rootContainer="rootContainer"
                        @render="e => {
                            e.target.style.cssText += e.cssText;
                        }"
                        @renderEnd="e => {
                            console.log('RCR', e.moveable.state.rootContainerClientRect);
                            console.log('ORM', e.moveable.state.originalRootMatrix);
                            console.log('MCR', e.moveable.state.moveableClientRect);
                        }"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
