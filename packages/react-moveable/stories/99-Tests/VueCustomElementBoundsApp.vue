<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
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
  <slot name="custom-element"></slot>
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

const customElementNode = shallowRef<HTMLElement>();

onMounted(() => {
    customElementNode.value = document.querySelector("custom-element")!;
});
</script>

<template>
    <div class="container" :style="{
        border: '1px solid black',
    }">
        <custom-element :style="{
            display: 'block',
            padding: '10px',
        }">
            <div id="draggable" slot="custom-element" :style="{
                width: '150px',
                height: '150px',
                backgroundColor: '#e79627',
            }"></div>
        </custom-element>
        <Teleport v-if="customElementNode" :to="customElementNode.shadowRoot!.querySelector('.card-content')!">
            <Moveable
                target="#draggable"
                :draggable="true"
                :snappable="true"
                :bounds="{ left: 0, top: 0 }"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
            />
        </Teleport>
    </div>
</template>
