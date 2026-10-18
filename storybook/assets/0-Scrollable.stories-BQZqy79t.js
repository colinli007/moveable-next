import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-D1chmgGX.js";import{t as r}from"./jsx-runtime-DM-zaqa2.js";import{c as i,l as a,r as o,t as s}from"./story-uRijs6RN.js";import{g as c,l}from"./default-C91InR83.js";var u=t({default:()=>d});function d(e){return(0,f.jsx)(`div`,{className:`container`,children:(0,f.jsxs)(`div`,{className:`scrollArea`,children:[(0,f.jsx)(`div`,{className:`target`,children:`Target`}),(0,f.jsx)(a,{scrollable:!0,scrollOptions:{container:`.scrollArea`,threshold:e.threshold,checkScrollEvent:e.checkScrollEvent,throttleTime:e.throttleTime},target:`.target`,draggable:!0,resizable:!0,rotatable:!0,onRender:e=>{e.target.style.cssText+=e.cssText},onScroll:({scrollContainer:e,direction:t})=>{e.scrollBy(t[0]*10,t[1]*10)}})]})})}var f;function p(){return(p=e((()=>{n(),i(),f=r()})))()}var m;function h(){return(h=e((()=>{m=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    return (<div className="container">
        <div className="scrollArea">
            <div className="target">Target</div>
            <Moveable
                scrollable={true}
                scrollOptions={{
                    container: ".scrollArea",
                    threshold: props.threshold,
                    checkScrollEvent: props.checkScrollEvent,
                    throttleTime: props.throttleTime,
                }}
                target={".target"}
                draggable={true}
                resizable={true}
                rotatable={true}
                onRender={e => {
                    e.target.style.cssText += e.cssText;
                }}
                onScroll={({ scrollContainer, direction }) => {
                    scrollContainer.scrollBy(direction[0] * 10, direction[1] * 10);
                }}
            ></Moveable>
        </div>
    </div>);
}
`})))()}var g;function _(){return(_=e((()=>{g=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    threshold: any = "$preview_threshold";
    checkScrollEvent: any = "$preview_checkScrollEvent";
    throttleTime: any = "$preview_throttleTime";
    render() {
        return html \`<div class="container">
    <div class="scrollArea">
        <div class="target">Target</div>
        <lit-moveable
            .scrollable=\${true}
            .scrollOptions=\${{
            container: ".scrollArea",
            threshold: this.threshold,
            checkScrollEvent: this.checkScrollEvent,
            throttleTime: this.throttleTime
        }}
            .target=\${".target"}
            .litDraggable=\${true}
            .resizable=\${true}
            .rotatable=\${true}
            @litRender=\${this.onRender}
            @litScroll=\${this.onScroll}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
    onScroll({ scrollContainer, direction }) {
        scrollContainer.scrollBy(direction[0] * 10, direction[1] * 10);
    }
}`})))()}var v;function y(){return(y=e((()=>{v=`<div class="container">
    <div
        class="scrollArea"
        data-croffle-ref="element$0"
    >
        <div class="target">Target</div>
    </div>
</div>`})))()}var b;function x(){return(x=e((()=>{b=`import Moveable from "moveable";

const threshold = "$preview_threshold";
const checkScrollEvent = "$preview_checkScrollEvent";
const throttleTime = "$preview_throttleTime";
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    scrollable: true,
    scrollOptions: {
        container: ".scrollArea",
        threshold: threshold,
        checkScrollEvent: checkScrollEvent,
        throttleTime: throttleTime
    },
    target: ".target",
    draggable: true,
    resizable: true,
    rotatable: true
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});
moveable$0.on("scroll", ({ scrollContainer, direction }) => {
    scrollContainer.scrollBy(direction[0] * 10, direction[1] * 10);
});`})))()}var S;function C(){return(C=e((()=>{S=`<script>
import Moveable from "svelte-moveable";

const threshold = "$preview_threshold";
const checkScrollEvent = "$preview_checkScrollEvent";
const throttleTime = "$preview_throttleTime";
<\/script>
<div class="container">
    <div class="scrollArea">
        <div class="target">Target</div>
        <Moveable
            scrollable={true}
            scrollOptions={{
                container: ".scrollArea",
                threshold: threshold,
                checkScrollEvent: checkScrollEvent,
                throttleTime: throttleTime,
            }}
            target={".target"}
            draggable={true}
            resizable={true}
            rotatable={true}
            on:render={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}
            on:scroll={({ detail: { scrollContainer, direction } }) => {
                scrollContainer.scrollBy(
                    direction[0] * 10,
                    direction[1] * 10
                );
            }}
        ></Moveable>
    </div>
</div>`})))()}var w;function T(){return(T=e((()=>{w=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const threshold = "$preview_threshold";
        const checkScrollEvent = "$preview_checkScrollEvent";
        const throttleTime = "$preview_throttleTime";
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        const onScroll = ({ scrollContainer, direction }) => {
            scrollContainer.scrollBy(direction[0] * 10, direction[1] * 10);
        };
        return {
            threshold,
            checkScrollEvent,
            throttleTime,
            onRender,
            onScroll
        };
    }
};
<\/script>
<template>
    <div class="container">
        <div class="scrollArea">
            <div class="target">Target</div>
            <Moveable
                :scrollable="true"
                :scrollOptions="({ container: '.scrollArea', threshold: threshold, checkScrollEvent: checkScrollEvent, throttleTime: throttleTime })"
                :target="'.target'"
                :draggable="true"
                :resizable="true"
                :rotatable="true"
                @render="onRender"
                @scroll="onScroll"
            ></Moveable>
        </div>
    </div>
</template>`})))()}var E,D,O,k,A;function j(){return(j=e((()=>{p(),h(),_(),y(),x(),C(),T(),o(),c(),E=Object.assign({"./ReactScrollableApp.tsx":u}),D=Object.assign({"./ReactScrollableApp.tsx":m,"./lit/ReactScrollableApp/App.ts":g,"./script/ReactScrollableApp/App.html":v,"./script/ReactScrollableApp/App.js":b,"./svelte/ReactScrollableApp/App.svelte":S,"./vue3/ReactScrollableApp/App.vue":w}),O={title:`Support Scroll`},k={name:`Use Scrollable`,...s(d,{apps:E,sources:D,argTypes:{...l}})},A=[`ScrollingScrollable`],k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: "Use Scrollable",
  ...appStory(ReactScrollableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_SCROLLABLE_CONTROLS
    }
  })
} satisfies StoryObj`,...k.parameters?.docs?.source}}}})))()}j();export{k as ScrollingScrollable,A as __namedExportsOrder,O as default};