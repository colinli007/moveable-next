<script setup lang="ts">
import Moveable from "@/vue3-moveable";
</script>

<template>
    <div class="root" :style="{
        paddingBottom: '400px',
    }">
        <div class="container" :style="{
            height: '900px',
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
            <div class="target target1" :style="{
                position: 'fixed',
                width: '150px',
                height: '150px',
            }">Target</div>
            <Moveable
                target=".target1"
                :draggable="true"
                :scalable="true"
                :rotatable="true"
                :snappable="true"
                :verticalGuidelines="[0, 100, 200]"
                :horizontalGuidelines="[0, 100, 200]"
                :elementGuidelines="[{
                    element: '.element1',
                    refresh: true,
                }, '.element2', '.element3']"
                @render="e => {
                    // console.log(e.moveable.state.guidelines);
                    e.target.style.cssText += e.cssText;
                }"
            />
        </div>
    </div>
</template>
