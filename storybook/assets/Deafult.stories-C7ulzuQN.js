import{a as e,n as t,r as n}from"./rolldown-runtime-sJBDdmOt.js";import{t as r}from"./react-D1chmgGX.js";import{t as i}from"./jsx-runtime-DM-zaqa2.js";import{c as a,l as o,r as s,t as c}from"./story-uRijs6RN.js";var l=n({default:()=>u});function u(){let e=d.useRef(null);return(0,f.jsx)(`div`,{className:`root`,children:(0,f.jsxs)(`div`,{className:`container`,style:{width:`500px`,height:`500px`,border:`1px solid #ccc`},children:[(0,f.jsx)(`div`,{className:`target element1`,style:{width:`100px`,height:`100px`,left:`0px`,top:`120px`},children:`Element1`}),(0,f.jsx)(`div`,{className:`target element2`,style:{width:`100px`,height:`100px`,left:`400px`,top:`120px`},children:`Element2`}),(0,f.jsx)(`div`,{className:`target element3`,style:{width:`300px`,height:`100px`,top:`400px`,left:`50px`},children:`Element3`}),(0,f.jsx)(`div`,{className:`target center`,style:{width:`200px`,height:`150px`},children:`Target`}),(0,f.jsx)(o,{ref:e,target:`.center`,draggable:!0,snappable:!0,snapDirections:{top:!0,left:!0,bottom:!0,right:!0,center:!0,middle:!0},elementSnapDirections:{top:!0,left:!0,bottom:!0,right:!0,center:!0,middle:!0},maxSnapElementGuidelineDistance:70,elementGuidelines:[{element:`.element1`,className:`red`},{element:`.element2`,className:`green`},{element:`.element3`}],onDrag:e=>{e.target.style.transform=e.transform}})]})})}var d,f;function p(){return(p=t((()=>{d=e(r()),a(),f=i()})))()}var m=n({default:()=>h});function h(){let e=g.useRef(null);return(0,_.jsx)(`div`,{className:`root`,children:(0,_.jsxs)(`div`,{className:`container`,style:{width:`500px`,height:`500px`,border:`1px solid #ccc`},children:[(0,_.jsx)(`div`,{className:`target`,style:{width:`200px`,height:`150px`},children:`Target`}),(0,_.jsx)(o,{ref:e,target:`.target`,draggable:!0,snappable:!0,verticalGuidelines:[0,100,{pos:200,className:`red`}],onDrag:e=>{e.target.style.transform=e.transform}})]})})}var g,_;function v(){return(v=t((()=>{g=e(r()),a(),_=i()})))()}var y;function b(){return(b=t((()=>{y=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    const moveableRef = React.useRef<Moveable>(null);

    return (
        <div className="root">
            <div className="container" style={{
                width: "500px",
                height: "500px",
                border: "1px solid #ccc",
            }}>
                <div className="target element1" style={{
                    width: "100px",
                    height: "100px",
                    left: "0px",
                    top: "120px",
                }}>Element1</div>
                <div className="target element2" style={{
                    width: "100px",
                    height: "100px",
                    left: "400px",
                    top: "120px",
                }}>Element2</div>
                <div className="target element3" style={{
                    width: "300px",
                    height: "100px",
                    top: "400px",
                    left: "50px",
                }}>Element3</div>
                <div className="target center" style={{
                    width: "200px",
                    height: "150px",
                }}>Target</div>
                <Moveable
                    ref={moveableRef}
                    target={".center"}
                    draggable={true}
                    snappable={true}
                    snapDirections={{
                        top: true,
                        left: true,
                        bottom: true,
                        right: true,
                        center: true,
                        middle: true,
                    }}
                    elementSnapDirections={{
                        top: true,
                        left: true,
                        bottom: true,
                        right: true,
                        center: true,
                        middle: true,
                    }}
                    maxSnapElementGuidelineDistance={70}
                    elementGuidelines={[{
                        element: ".element1",
                        className: "red",
                    }, {
                        element: ".element2",
                        className: "green",
                    }, {
                        element: ".element3",
                    }]}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var x;function S(){return(S=t((()=>{x=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    const moveableRef = React.useRef<Moveable>(null);

    return (
        <div className="root">
            <div className="container" style={{
                width: "500px",
                height: "500px",
                border: "1px solid #ccc",
            }}>
                <div className="target" style={{
                    width: "200px",
                    height: "150px",
                }}>Target</div>
                <Moveable
                    ref={moveableRef}
                    target={".target"}
                    draggable={true}
                    snappable={true}
                    verticalGuidelines={[
                        0,
                        100,
                        {
                            pos: 200,
                            className: "red",
                        },
                    ]}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var C;function w(){return(w=t((()=>{C=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    moveableRef: Ref<Moveable> = createRef(null);
    render() {
        return html \`<div class="root">
    <div
        class="container"
        style="width: 500px;height: 500px;border: 1px solid #ccc;"
    >
        <div
            class="target element1"
            style="width: 100px;height: 100px;left: 0px;top: 120px;"
        >Element1</div>
        <div
            class="target element2"
            style="width: 100px;height: 100px;left: 400px;top: 120px;"
        >Element2</div>
        <div
            class="target element3"
            style="width: 300px;height: 100px;top: 400px;left: 50px;"
        >Element3</div>
        <div
            class="target center"
            style="width: 200px;height: 150px;"
        >Target</div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${".center"}
            .litDraggable=\${true}
            .snappable=\${true}
            .snapDirections=\${{
            top: true,
            left: true,
            bottom: true,
            right: true,
            center: true,
            middle: true
        }}
            .elementSnapDirections=\${{
            top: true,
            left: true,
            bottom: true,
            right: true,
            center: true,
            middle: true
        }}
            .maxSnapElementGuidelineDistance=\${70}
            .elementGuidelines=\${[
            {
                            element: ".element1",
                            className: "red"
                        },
            {
                            element: ".element2",
                            className: "green"
                        },
            {
                            element: ".element3"
                        }
        ]}
            @litDrag=\${this.onDrag}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var T;function E(){return(E=t((()=>{T=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    moveableRef: Ref<Moveable> = createRef(null);
    render() {
        return html \`<div class="root">
    <div
        class="container"
        style="width: 500px;height: 500px;border: 1px solid #ccc;"
    >
        <div
            class="target"
            style="width: 200px;height: 150px;"
        >Target</div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${".target"}
            .litDraggable=\${true}
            .snappable=\${true}
            .verticalGuidelines=\${[
            0,
            100,
            {
                pos: 200,
                className: "red"
            },
        ]}
            @litDrag=\${this.onDrag}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var D;function O(){return(O=t((()=>{D=`<div class="root">
    <div
        class="container"
        style="width: 500px;height: 500px;border: 1px solid #ccc;"
        data-croffle-ref="element$0"
    >
        <div
            class="target element1"
            style="width: 100px;height: 100px;left: 0px;top: 120px;"
        >Element1</div>
        <div
            class="target element2"
            style="width: 100px;height: 100px;left: 400px;top: 120px;"
        >Element2</div>
        <div
            class="target element3"
            style="width: 300px;height: 100px;top: 400px;left: 50px;"
        >Element3</div>
        <div
            class="target center"
            style="width: 200px;height: 150px;"
        >Target</div>
    </div>
</div>`})))()}var k;function A(){return(A=t((()=>{k=`import Moveable from "moveable";

let moveableRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
moveableRef = new Moveable(element$0, {
    target: ".center",
    draggable: true,
    snappable: true,
    snapDirections: {
        top: true,
        left: true,
        bottom: true,
        right: true,
        center: true,
        middle: true
    },
    elementSnapDirections: {
        top: true,
        left: true,
        bottom: true,
        right: true,
        center: true,
        middle: true
    },
    maxSnapElementGuidelineDistance: 70,
    elementGuidelines: [
        { element: ".element1", className: "red" },
        { element: ".element2", className: "green" },
        { element: ".element3" }
    ]
});
moveableRef.on("drag", e => {
    e.target.style.transform = e.transform;
});`})))()}var j;function M(){return(M=t((()=>{j=`<div class="root">
    <div
        class="container"
        style="width: 500px;height: 500px;border: 1px solid #ccc;"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            style="width: 200px;height: 150px;"
        >Target</div>
    </div>
</div>`})))()}var N;function P(){return(P=t((()=>{N=`import Moveable from "moveable";

let moveableRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
moveableRef = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    snappable: true,
    verticalGuidelines: [0, 100, { pos: 200, className: "red" }]
});
moveableRef.on("drag", e => {
    e.target.style.transform = e.transform;
});`})))()}var F;function I(){return(I=t((()=>{F=`<script>
import Moveable from "svelte-moveable";

let moveableRef = null;
<\/script>
<div class="root">
    <div
        class="container"
        style="width: 500px;height: 500px;border: 1px solid #ccc;"
    >
        <div
            class="target element1"
            style="width: 100px;height: 100px;left: 0px;top: 120px;"
        >Element1</div>
        <div
            class="target element2"
            style="width: 100px;height: 100px;left: 400px;top: 120px;"
        >Element2</div>
        <div
            class="target element3"
            style="width: 300px;height: 100px;top: 400px;left: 50px;"
        >Element3</div>
        <div
            class="target center"
            style="width: 200px;height: 150px;"
        >Target</div>
        <Moveable
            bind:this={moveableRef}
            target={".center"}
            draggable={true}
            snappable={true}
            snapDirections={{
                top: true,
                left: true,
                bottom: true,
                right: true,
                center: true,
                middle: true,
            }}
            elementSnapDirections={{
                top: true,
                left: true,
                bottom: true,
                right: true,
                center: true,
                middle: true,
            }}
            maxSnapElementGuidelineDistance={70}
            elementGuidelines={[
                { element: ".element1", className: "red" },
                { element: ".element2", className: "green" },
                { element: ".element3" }
            ]}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}/>
    </div>
</div>`})))()}var L;function R(){return(R=t((()=>{L=`<script>
import Moveable from "svelte-moveable";

let moveableRef = null;
<\/script>
<div class="root">
    <div
        class="container"
        style="width: 500px;height: 500px;border: 1px solid #ccc;"
    >
        <div
            class="target"
            style="width: 200px;height: 150px;"
        >Target</div>
        <Moveable
            bind:this={moveableRef}
            target={".target"}
            draggable={true}
            snappable={true}
            verticalGuidelines={[0, 100, { pos: 200, className: "red" }]}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}/>
    </div>
</div>`})))()}var z;function B(){return(B=t((()=>{z=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const moveableRef = ref(null);
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        return { moveableRef, onDrag };
    }
};
<\/script>
<template>
    <div class="root">
        <div
            class="container"
            style="width: 500px;height: 500px;border: 1px solid #ccc;"
        >
            <div
                class="target element1"
                style="width: 100px;height: 100px;left: 0px;top: 120px;"
            >Element1</div>
            <div
                class="target element2"
                style="width: 100px;height: 100px;left: 400px;top: 120px;"
            >Element2</div>
            <div
                class="target element3"
                style="width: 300px;height: 100px;top: 400px;left: 50px;"
            >Element3</div>
            <div
                class="target center"
                style="width: 200px;height: 150px;"
            >Target</div>
            <Moveable
                ref="moveableRef"
                :target="'.center'"
                :draggable="true"
                :snappable="true"
                :snapDirections="({ top: true, left: true, bottom: true, right: true, center: true, middle: true })"
                :elementSnapDirections="({ top: true, left: true, bottom: true, right: true, center: true, middle: true })"
                :maxSnapElementGuidelineDistance="70"
                :elementGuidelines="[{ element: '.element1', className: 'red' }, { element: '.element2', className: 'green' }, { element: '.element3' }]"
                @drag="onDrag"/>
        </div>
    </div>
</template>`})))()}var V;function H(){return(H=t((()=>{V=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const moveableRef = ref(null);
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        return { moveableRef, onDrag };
    }
};
<\/script>
<template>
    <div class="root">
        <div
            class="container"
            style="width: 500px;height: 500px;border: 1px solid #ccc;"
        >
            <div
                class="target"
                style="width: 200px;height: 150px;"
            >Target</div>
            <Moveable
                ref="moveableRef"
                :target="'.target'"
                :draggable="true"
                :snappable="true"
                :verticalGuidelines="[0, 100, { pos: 200, className: 'red' }]"
                @drag="onDrag"/>
        </div>
    </div>
</template>`})))()}var U,W,G,K,q,J;function Y(){return(Y=t((()=>{p(),v(),b(),S(),w(),E(),O(),A(),M(),P(),I(),R(),B(),H(),s(),U=Object.assign({"./ReactCustomElementGuidelinesApp.tsx":l,"./ReactCustomGuidelinesApp.tsx":m}),W=Object.assign({"./ReactCustomElementGuidelinesApp.tsx":y,"./ReactCustomGuidelinesApp.tsx":x,"./lit/ReactCustomElementGuidelinesApp/App.ts":C,"./lit/ReactCustomGuidelinesApp/App.ts":T,"./script/ReactCustomElementGuidelinesApp/App.html":D,"./script/ReactCustomElementGuidelinesApp/App.js":k,"./script/ReactCustomGuidelinesApp/App.html":j,"./script/ReactCustomGuidelinesApp/App.js":N,"./svelte/ReactCustomElementGuidelinesApp/App.svelte":F,"./svelte/ReactCustomGuidelinesApp/App.svelte":L,"./vue3/ReactCustomElementGuidelinesApp/App.vue":z,"./vue3/ReactCustomGuidelinesApp/App.vue":V}),G={title:`Advanced Snappable`},K={name:`Guidelines with custom styles`,...c(h,{apps:U,sources:W})},q={name:`Element Guidelines with custom styles`,...c(u,{apps:U,sources:W})},J=[`AdvancedSnappableCustomGuidelines`,`AdvancedSnappableCustomElementGuidelines`],K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: "Guidelines with custom styles",
  ...appStory(ReactCustomGuidelinesApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: "Element Guidelines with custom styles",
  ...appStory(ReactCustomElementGuidelinesApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...q.parameters?.docs?.source}}}})))()}Y();export{q as AdvancedSnappableCustomElementGuidelines,K as AdvancedSnappableCustomGuidelines,J as __namedExportsOrder,G as default};