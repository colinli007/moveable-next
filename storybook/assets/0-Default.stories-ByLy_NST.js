import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-D1chmgGX.js";import{t as r}from"./jsx-runtime-DM-zaqa2.js";import{c as i,l as a,r as o,t as s}from"./story-uRijs6RN.js";import{c,g as l,r as u,s as d}from"./default-C91InR83.js";var f=t({default:()=>p});function p(e){return(0,m.jsx)(`div`,{className:`root`,children:(0,m.jsxs)(`div`,{className:`container`,children:[(0,m.jsx)(`div`,{className:`target target1`,children:`Target1`}),(0,m.jsx)(`div`,{className:`target target2`,children:`Target2`}),(0,m.jsx)(`div`,{className:`target target3`,children:`Target3`}),(0,m.jsx)(a,{target:`.target`,individualGroupable:!0,draggable:e.draggable,throttleDrag:e.throttleDrag,edgeDraggable:e.edgeDraggable,startDragRotate:e.startDragRotate,throttleDragRotate:e.throttleDragRotate,scalable:e.scalable,keepRatio:e.keepRatio,throttleScale:e.throttleScale,renderDirections:e.renderDirections,rotatable:e.rotatable,throttleRotate:e.throttleRotate,rotationPosition:e.rotationPosition,onDrag:e=>{e.target.style.transform=e.transform},onScale:e=>{e.target.style.transform=e.drag.transform},onRotate:e=>{e.target.style.transform=e.drag.transform}})]})})}var m;function h(){return(h=e((()=>{n(),i(),m=r()})))()}var g=t({default:()=>_});function _(){return(0,v.jsx)(`div`,{className:`root`,children:(0,v.jsxs)(`div`,{className:`container`,children:[(0,v.jsx)(`div`,{className:`target target1`,children:`Target1`}),(0,v.jsx)(`div`,{className:`target target2`,children:`Target2`}),(0,v.jsx)(`div`,{className:`target target3`,children:`Target3`}),(0,v.jsx)(a,{target:`.target`,individualGroupable:!0,draggable:!0,resizable:!0,rotatable:!0,individualGroupableProps:e=>{if(e.classList.contains(`target2`))return{resizable:!1}},onRender:e=>{e.target.style.cssText+=e.cssText}})]})})}var v;function y(){return(y=e((()=>{n(),i(),v=r()})))()}var b;function x(){return(x=e((()=>{b=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    return (
        <div className="root">
            <div className="container">
                <div className="target target1">Target1</div>
                <div className="target target2">Target2</div>
                <div className="target target3">Target3</div>
                <Moveable
                    target={".target"}
                    individualGroupable={true}
                    draggable={props.draggable}
                    throttleDrag={props.throttleDrag}
                    edgeDraggable={props.edgeDraggable}
                    startDragRotate={props.startDragRotate}
                    throttleDragRotate={props.throttleDragRotate}
                    scalable={props.scalable}
                    keepRatio={props.keepRatio}
                    throttleScale={props.throttleScale}
                    renderDirections={props.renderDirections}
                    rotatable={props.rotatable}
                    throttleRotate={props.throttleRotate}
                    rotationPosition={props.rotationPosition}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                    onScale={e => {
                        e.target.style.transform = e.drag.transform;
                    }}
                    onRotate={e => {
                        e.target.style.transform = e.drag.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var S;function C(){return(C=e((()=>{S=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return (
        <div className="root">
            <div className="container">
                <div className="target target1">Target1</div>
                <div className="target target2">Target2</div>
                <div className="target target3">Target3</div>
                <Moveable
                    target={".target"}
                    individualGroupable={true}
                    draggable={true}
                    resizable={true}
                    rotatable={true}
                    individualGroupableProps={element => {
                        if (element!.classList.contains("target2")) {
                            return {
                                resizable: false,
                            };
                        }
                    }}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var w;function T(){return(T=e((()=>{w=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    draggable: any = "$preview_draggable";
    throttleDrag: any = "$preview_throttleDrag";
    edgeDraggable: any = "$preview_edgeDraggable";
    startDragRotate: any = "$preview_startDragRotate";
    throttleDragRotate: any = "$preview_throttleDragRotate";
    scalable: any = "$preview_scalable";
    keepRatio: any = "$preview_keepRatio";
    throttleScale: any = "$preview_throttleScale";
    renderDirections: any = "$preview_renderDirections";
    rotatable: any = "$preview_rotatable";
    throttleRotate: any = "$preview_throttleRotate";
    rotationPosition: any = "$preview_rotationPosition";
    render() {
        return html \`<div class="root">
    <div class="container">
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
        <lit-moveable
            .target=\${".target"}
            .individualGroupable=\${true}
            .litDraggable=\${this.draggable}
            .throttleDrag=\${this.throttleDrag}
            .edgeDraggable=\${this.edgeDraggable}
            .startDragRotate=\${this.startDragRotate}
            .throttleDragRotate=\${this.throttleDragRotate}
            .scalable=\${this.scalable}
            .keepRatio=\${this.keepRatio}
            .throttleScale=\${this.throttleScale}
            .renderDirections=\${this.renderDirections}
            .rotatable=\${this.rotatable}
            .throttleRotate=\${this.throttleRotate}
            .rotationPosition=\${this.rotationPosition}
            @litDrag=\${this.onDrag}
            @litScale=\${this.onScale}
            @litRotate=\${this.onRotate}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onScale(e) {
        e.target.style.transform = e.drag.transform;
    }
    onRotate(e) {
        e.target.style.transform = e.drag.transform;
    }
}`})))()}var E;function D(){return(D=e((()=>{E=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div class="container">
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
        <lit-moveable
            .target=\${".target"}
            .individualGroupable=\${true}
            .litDraggable=\${true}
            .resizable=\${true}
            .rotatable=\${true}
            .individualGroupableProps=\${this.individualGroupableProps}
            @litRender=\${this.onRender}
        ></lit-moveable>
    </div>
</div>\`;
    }
    individualGroupableProps(element) {
        if (element!.classList.contains("target2")) {
            return { resizable: false };
        }
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var O;function k(){return(k=e((()=>{O=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
    </div>
</div>`})))()}var A;function j(){return(j=e((()=>{A=`import Moveable from "moveable";

const draggable = "$preview_draggable";
const throttleDrag = "$preview_throttleDrag";
const edgeDraggable = "$preview_edgeDraggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
const scalable = "$preview_scalable";
const keepRatio = "$preview_keepRatio";
const throttleScale = "$preview_throttleScale";
const renderDirections = "$preview_renderDirections";
const rotatable = "$preview_rotatable";
const throttleRotate = "$preview_throttleRotate";
const rotationPosition = "$preview_rotationPosition";
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    individualGroupable: true,
    draggable: draggable,
    throttleDrag: throttleDrag,
    edgeDraggable: edgeDraggable,
    startDragRotate: startDragRotate,
    throttleDragRotate: throttleDragRotate,
    scalable: scalable,
    keepRatio: keepRatio,
    throttleScale: throttleScale,
    renderDirections: renderDirections,
    rotatable: rotatable,
    throttleRotate: throttleRotate,
    rotationPosition: rotationPosition
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable$0.on("scale", e => {
    e.target.style.transform = e.drag.transform;
});
moveable$0.on("rotate", e => {
    e.target.style.transform = e.drag.transform;
});`})))()}var M;function N(){return(N=e((()=>{M=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
    </div>
</div>`})))()}var P;function F(){return(F=e((()=>{P=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    individualGroupable: true,
    draggable: true,
    resizable: true,
    rotatable: true,
    individualGroupableProps: element => {
        if (element.classList.contains("target2")) {
            return { resizable: false };
        }
    }
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var I;function L(){return(L=e((()=>{I=`<script>
import Moveable from "svelte-moveable";

const draggable = "$preview_draggable";
const throttleDrag = "$preview_throttleDrag";
const edgeDraggable = "$preview_edgeDraggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
const scalable = "$preview_scalable";
const keepRatio = "$preview_keepRatio";
const throttleScale = "$preview_throttleScale";
const renderDirections = "$preview_renderDirections";
const rotatable = "$preview_rotatable";
const throttleRotate = "$preview_throttleRotate";
const rotationPosition = "$preview_rotationPosition";
<\/script>
<div class="root">
    <div class="container">
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
        <Moveable
            target={".target"}
            individualGroupable={true}
            draggable={draggable}
            throttleDrag={throttleDrag}
            edgeDraggable={edgeDraggable}
            startDragRotate={startDragRotate}
            throttleDragRotate={throttleDragRotate}
            scalable={scalable}
            keepRatio={keepRatio}
            throttleScale={throttleScale}
            renderDirections={renderDirections}
            rotatable={rotatable}
            throttleRotate={throttleRotate}
            rotationPosition={rotationPosition}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:scale={({ detail: e }) => {
                e.target.style.transform = e.drag.transform;
            }}
            on:rotate={({ detail: e }) => {
                e.target.style.transform = e.drag.transform;
            }}/>
    </div>
</div>`})))()}var R;function z(){return(z=e((()=>{R=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="root">
    <div class="container">
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
        <Moveable
            target={".target"}
            individualGroupable={true}
            draggable={true}
            resizable={true}
            rotatable={true}
            individualGroupableProps={individualGroupableProps}
            on:render={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}/>
    </div>
</div>`})))()}var B;function V(){return(V=e((()=>{B=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const draggable = "$preview_draggable";
        const throttleDrag = "$preview_throttleDrag";
        const edgeDraggable = "$preview_edgeDraggable";
        const startDragRotate = "$preview_startDragRotate";
        const throttleDragRotate = "$preview_throttleDragRotate";
        const scalable = "$preview_scalable";
        const keepRatio = "$preview_keepRatio";
        const throttleScale = "$preview_throttleScale";
        const renderDirections = "$preview_renderDirections";
        const rotatable = "$preview_rotatable";
        const throttleRotate = "$preview_throttleRotate";
        const rotationPosition = "$preview_rotationPosition";
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onScale = e => {
            e.target.style.transform = e.drag.transform;
        };
        const onRotate = e => {
            e.target.style.transform = e.drag.transform;
        };
        return {
            draggable,
            throttleDrag,
            edgeDraggable,
            startDragRotate,
            throttleDragRotate,
            scalable,
            keepRatio,
            throttleScale,
            renderDirections,
            rotatable,
            throttleRotate,
            rotationPosition,
            onDrag,
            onScale,
            onRotate
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div class="target target1">Target1</div>
            <div class="target target2">Target2</div>
            <div class="target target3">Target3</div>
            <Moveable
                :target="'.target'"
                :individualGroupable="true"
                :draggable="draggable"
                :throttleDrag="throttleDrag"
                :edgeDraggable="edgeDraggable"
                :startDragRotate="startDragRotate"
                :throttleDragRotate="throttleDragRotate"
                :scalable="scalable"
                :keepRatio="keepRatio"
                :throttleScale="throttleScale"
                :renderDirections="renderDirections"
                :rotatable="rotatable"
                :throttleRotate="throttleRotate"
                :rotationPosition="rotationPosition"
                @drag="onDrag"
                @scale="onScale"
                @rotate="onRotate"/>
        </div>
    </div>
</template>`})))()}var H;function U(){return(U=e((()=>{H=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const individualGroupableProps = element => {
            if (element.classList.contains("target2")) {
                return { resizable: false };
            }
        };
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        return { individualGroupableProps, onRender };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div class="target target1">Target1</div>
            <div class="target target2">Target2</div>
            <div class="target target3">Target3</div>
            <Moveable
                :target="'.target'"
                :individualGroupable="true"
                :draggable="true"
                :resizable="true"
                :rotatable="true"
                :individualGroupableProps="individualGroupableProps"
                @render="onRender"/>
        </div>
    </div>
</template>`})))()}var W,G,K,q,J,Y;function X(){return(X=e((()=>{h(),y(),x(),C(),T(),D(),k(),j(),N(),F(),L(),z(),V(),U(),o(),l(),W=Object.assign({"./ReactDraggableScalableRotatableApp.tsx":f,"./ReactIndividualGroupablePropsApp.tsx":g}),G=Object.assign({"./ReactDraggableScalableRotatableApp.tsx":b,"./ReactIndividualGroupablePropsApp.tsx":S,"./lit/ReactDraggableScalableRotatableApp/App.ts":w,"./lit/ReactIndividualGroupablePropsApp/App.ts":E,"./script/ReactDraggableScalableRotatableApp/App.html":O,"./script/ReactDraggableScalableRotatableApp/App.js":A,"./script/ReactIndividualGroupablePropsApp/App.html":M,"./script/ReactIndividualGroupablePropsApp/App.js":P,"./svelte/ReactDraggableScalableRotatableApp/App.svelte":I,"./svelte/ReactIndividualGroupablePropsApp/App.svelte":R,"./vue3/ReactDraggableScalableRotatableApp/App.vue":B,"./vue3/ReactIndividualGroupablePropsApp/App.vue":H}),K={title:`Individual Group`},q={name:`Draggable & Scalable & Rotatable`,...s(p,{apps:W,sources:G,argTypes:{...c,...d,...u}})},J={name:`Use Individual Groupable Props`,...s(_,{apps:W,sources:G})},Y=[`IndividualGroupDraggableScalableRotatable`,`IndividualGroupGroupableProps`],q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: "Draggable & Scalable & Rotatable",
  ...appStory(ReactDraggableScalableRotatableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_SCALABLE_CONTROLS,
      ...DEFAULT_ROTATABLE_CONTROLS,
      ...DEFAULT_DRAGGABLE_CONTROLS
    }
  })
} satisfies StoryObj`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: "Use Individual Groupable Props",
  ...appStory(ReactIndividualGroupablePropsApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...J.parameters?.docs?.source}}}})))()}X();export{q as IndividualGroupDraggableScalableRotatable,J as IndividualGroupGroupableProps,Y as __namedExportsOrder,K as default};