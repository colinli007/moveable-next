import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-D1chmgGX.js";import{t as r}from"./jsx-runtime-DM-zaqa2.js";import{c as i,l as a,r as o,t as s}from"./story-uRijs6RN.js";var c=t({default:()=>l});function l(){return(0,u.jsxs)(`div`,{className:`container`,children:[(0,u.jsx)(`div`,{className:`target`,children:`Target`}),(0,u.jsx)(a,{target:`.target`,draggable:!0,scalable:!0,onScaleStart:e=>{e.setMinScaleSize([100,100]),e.setMaxScaleSize([500,500])},onRender:e=>{e.target.style.cssText+=e.cssText}})]})}var u;function d(){return(d=e((()=>{n(),i(),u=r()})))()}var f;function p(){return(p=e((()=>{f=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return <div className="container">
        <div className="target">Target</div>
        <Moveable
            target={".target"}
            draggable={true}
            scalable={true}
            onScaleStart={e => {
                e.setMinScaleSize([100, 100]);
                e.setMaxScaleSize([500, 500]);
            }}
            onRender={e => {
                e.target.style.cssText += e.cssText;
            }}
        />
    </div>;
}
`})))()}var m;function h(){return(h=e((()=>{m=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="container">
    <div class="target">Target</div>
    <lit-moveable
        .target=\${".target"}
        .litDraggable=\${true}
        .scalable=\${true}
        @litScaleStart=\${this.onScaleStart}
        @litRender=\${this.onRender}
    ></lit-moveable>
</div>\`;
    }
    onScaleStart(e) {
        e.setMinScaleSize([100, 100]);
        e.setMaxScaleSize([500, 500]);
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var g;function _(){return(_=e((()=>{g=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div class="target">Target</div>
</div>`})))()}var v;function y(){return(y=e((()=>{v=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    scalable: true
});
moveable$0.on("scaleStart", e => {
    e.setMinScaleSize([100, 100]);
    e.setMaxScaleSize([500, 500]);
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var b;function x(){return(x=e((()=>{b=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="container">
    <div class="target">Target</div>
    <Moveable
        target={".target"}
        draggable={true}
        scalable={true}
        on:scaleStart={({ detail: e }) => {
            e.setMinScaleSize([100, 100]);
            e.setMaxScaleSize([500, 500]);
        }}
        on:render={({ detail: e }) => {
            e.target.style.cssText += e.cssText;
        }}/>
</div>`})))()}var S;function C(){return(C=e((()=>{S=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onScaleStart = e => {
            e.setMinScaleSize([100, 100]);
            e.setMaxScaleSize([500, 500]);
        };
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        return { onScaleStart, onRender };
    }
};
<\/script>
<template>
    <div class="container">
        <div class="target">Target</div>
        <Moveable
            :target="'.target'"
            :draggable="true"
            :scalable="true"
            @scaleStart="onScaleStart"
            @render="onRender"/>
    </div>
</template>`})))()}var w,T,E,D,O;function k(){return(k=e((()=>{d(),p(),h(),_(),y(),x(),C(),o(),w=Object.assign({"./ReactScalableMinMaxApp.tsx":c}),T=Object.assign({"./ReactScalableMinMaxApp.tsx":f,"./lit/ReactScalableMinMaxApp/App.ts":m,"./script/ReactScalableMinMaxApp/App.html":g,"./script/ReactScalableMinMaxApp/App.js":v,"./svelte/ReactScalableMinMaxApp/App.svelte":b,"./vue3/ReactScalableMinMaxApp/App.vue":S}),E={title:`Advacned Scalable`},D={name:`Scalable with min, max size`,...s(l,{apps:w,sources:T})},O=[`AdvancedScalableMinMax`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: "Scalable with min, max size",
  ...appStory(ReactScalableMinMaxApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...D.parameters?.docs?.source}}}})))()}k();export{D as AdvancedScalableMinMax,O as __namedExportsOrder,E as default};