<script setup lang="ts">
import { onMounted, ref } from "vue";
import Moveable from "@/vue3-moveable";

const defineCustomElement = `
class CustomElement extends HTMLElement {
    styleText = ${"`"}
.card {
width: 100%;
height: 100%;
}

.card-header {
width:100%;
height: 80px;
background-color: #3794FF;
}

.card-content {
    width: 100%;
    height: calc(100% - 80px);
    background-color: #EDF0F3;
    position: relative;
}

.card-inner {
    position: relative;
    top: 50px;
    left: 50px;
}
${"`"};

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = ${"`"}
<div class="card-header"></div>
<div class="card-content">
    <div class="card-inner">
        <slot name="custom-element"></slot>
    </div>
</div>
${"`"};
        style.textContent = this.styleText;
        this.shadow.appendChild(style);
        this.shadow.appendChild(div);
    }
}
if (!customElements.get("custom-element")) {
    customElements.define('custom-element', CustomElement);
}
`;

if (typeof window !== "undefined") {
    eval(defineCustomElement);
}

const agent = ref("");

onMounted(() => {
    agent.value = navigator.userAgent;
});
</script>

<template>
    <div class="container" :style="{
        border: '1px solid black',
    }">
        <p :style="{
            display: 'block',
            height: '20px',
        }">{{ agent }}</p>
        <custom-element :style="{
            display: 'block',
            padding: '10px',
        }">
            <div id="draggable" slot="custom-element" :style="{
                position: 'relative',
                width: '150px',
                height: '150px',
                backgroundColor: '#e79627',
            }"></div>
        </custom-element>
        <Moveable
            target="#draggable"
            :draggable="true"
            :snappable="true"
            :bounds="{ left: 0, top: 0 }"
            @drag="e => {
                e.target.style.transform = e.transform;
            }"
        />
    </div>
</template>
