import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-D1chmgGX.js";import{t as r}from"./jsx-runtime-DM-zaqa2.js";import{c as i,l as a,r as o,t as s}from"./story-uRijs6RN.js";var c=t({default:()=>l});function l(){return(0,u.jsxs)(`div`,{className:`root`,children:[(0,u.jsx)(`div`,{className:`target`,children:`Target`}),(0,u.jsx)(a,{target:`.target`,draggable:!0,resizable:!0,edgeDraggable:!0,edge:[`w`,`e`],onDrag:e=>{e.target.style.transform=e.transform},onResize:e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`,e.target.style.transform=e.drag.transform}})]})}var u;function d(){return(d=e((()=>{n(),i(),u=r()})))()}var f;function p(){return(p=e((()=>{f=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return (
        <div className="root">
            <div className="target">Target</div>
            <Moveable
                target={".target"}
                draggable={true}
                resizable={true}
                edgeDraggable={true}
                edge={["w", "e"]}
                onDrag={e => {
                    e.target.style.transform = e.transform;
                }}
                onResize={e => {
                    e.target.style.width = \`\${e.width}px\`;
                    e.target.style.height = \`\${e.height}px\`;
                    e.target.style.transform = e.drag.transform;
                }}
            />
        </div>
    );
}
`})))()}var m;function h(){return(h=e((()=>{m=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div class="target">Target</div>
    <lit-moveable
        .target=\${".target"}
        .litDraggable=\${true}
        .resizable=\${true}
        .edgeDraggable=\${true}
        .edge=\${["w", "e"]}
        @litDrag=\${this.onDrag}
        @litResize=\${this.onResize}
    ></lit-moveable>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onResize(e) {
        e.target.style.width = \`\${e.width}px\`;
        e.target.style.height = \`\${e.height}px\`;
        e.target.style.transform = e.drag.transform;
    }
}`})))()}var g;function _(){return(_=e((()=>{g=`<div
    class="root"
    data-croffle-ref="element$0"
>
    <div class="target">Target</div>
</div>`})))()}var v;function y(){return(y=e((()=>{v=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    resizable: true,
    edgeDraggable: true,
    edge: ["w", "e"]
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable$0.on("resize", e => {
    e.target.style.width = \`\${e.width}px\`;
    e.target.style.height = \`\${e.height}px\`;
    e.target.style.transform = e.drag.transform;
});`})))()}var b;function x(){return(x=e((()=>{b=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="root">
    <div class="target">Target</div>
    <Moveable
        target={".target"}
        draggable={true}
        resizable={true}
        edgeDraggable={true}
        edge={["w", "e"]}
        on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
        }}
        on:resize={({ detail: e }) => {
            e.target.style.width = \`\${e.width}px\`;
            e.target.style.height = \`\${e.height}px\`;
            e.target.style.transform = e.drag.transform;
        }}/>
</div>`})))()}var S;function C(){return(C=e((()=>{S=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onResize = e => {
            e.target.style.width = \`\${e.width}px\`;
            e.target.style.height = \`\${e.height}px\`;
            e.target.style.transform = e.drag.transform;
        };
        return { onDrag, onResize };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="target">Target</div>
        <Moveable
            :target="'.target'"
            :draggable="true"
            :resizable="true"
            :edgeDraggable="true"
            :edge="['w', 'e']"
            @drag="onDrag"
            @resize="onResize"/>
    </div>
</template>`})))()}var w,T,E,D,O;function k(){return(k=e((()=>{d(),p(),h(),_(),y(),x(),C(),o(),w=Object.assign({"./ReactEdgeDraggableWithEdgeApp.tsx":c}),T=Object.assign({"./ReactEdgeDraggableWithEdgeApp.tsx":f,"./lit/ReactEdgeDraggableWithEdgeApp/App.ts":m,"./script/ReactEdgeDraggableWithEdgeApp/App.html":g,"./script/ReactEdgeDraggableWithEdgeApp/App.js":v,"./svelte/ReactEdgeDraggableWithEdgeApp/App.svelte":b,"./vue3/ReactEdgeDraggableWithEdgeApp/App.vue":S}),E={title:`advanced Draggable`},D={name:`edgeDraggable with edge`,...s(l,{apps:w,sources:T})},O=[`AdvancedDraggableEdgeDraggable`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: "edgeDraggable with edge",
  ...appStory(ReactEdgeDraggableWithEdgeApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...D.parameters?.docs?.source}}}})))()}k();export{D as AdvancedDraggableEdgeDraggable,O as __namedExportsOrder,E as default};