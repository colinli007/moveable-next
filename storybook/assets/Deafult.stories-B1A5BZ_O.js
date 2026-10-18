import{a as e,n as t,r as n}from"./rolldown-runtime-sJBDdmOt.js";import{t as r}from"./react-D1chmgGX.js";import{t as i}from"./jsx-runtime-DM-zaqa2.js";import{c as a,l as o,r as ee,t as s}from"./story-uRijs6RN.js";var te=n({default:()=>c});function c(e){let t=l.useRef(null);return(0,u.jsx)(`div`,{className:`root`,children:(0,u.jsxs)(`div`,{className:`container`,children:[(0,u.jsx)(`div`,{className:`target`,ref:t,style:{top:`50px`,left:`50px`,width:`200px`,height:`200px`},children:`Target`}),(0,u.jsx)(o,{target:t,draggable:!0,resizable:!0,clippable:!0,dragWithClip:!1,clipTargetBounds:!0,snappable:!0,horizontalGuidelines:[0,100,200,300],snapThreshold:5,onDrag:e=>{e.target.style.transform=e.transform},onResize:e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`,e.target.style.transform=e.drag.transform},onClip:e=>{e.target.style.clipPath=e.clipStyle}})]})})}var l,u;function ne(){return(ne=t((()=>{l=e(r()),a(),u=i()})))()}var re=n({default:()=>ie});function ie(e){let t=ae.useRef(null);return(0,d.jsx)(`div`,{className:`root`,children:(0,d.jsxs)(`div`,{className:`container`,children:[(0,d.jsx)(`div`,{className:`target`,ref:t,style:{top:`50px`,left:`50px`,width:`200px`,height:`200px`},children:`Target`}),(0,d.jsx)(o,{target:t,draggable:!0,resizable:!0,rotatable:!0,clippable:!0,dragWithClip:!0,onRender:e=>{e.target.style.cssText+=e.cssText}})]})})}var ae,d;function oe(){return(oe=t((()=>{ae=e(r()),a(),d=i()})))()}var se=n({default:()=>f});function f(){return(0,p.jsx)(`div`,{className:`root`,children:(0,p.jsxs)(`div`,{className:`container`,children:[(0,p.jsx)(`div`,{className:`target`,style:{position:`relative`,top:`50px`,left:`50px`,width:`200px`,height:`200px`},children:`Target`}),(0,p.jsx)(o,{target:`.target`,draggable:!0,resizable:{keepRatio:!0},clippable:{keepRatio:!1},onDrag:e=>{e.target.style.transform=e.transform},onResize:e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`,e.target.style.transform=e.drag.transform},onClip:e=>{e.target.style.clipPath=e.clipStyle}})]})})}var p;function m(){return(m=t((()=>{r(),a(),p=i()})))()}var ce=n({default:()=>h});function h(e){let t=g.useRef(null);return(0,_.jsx)(`div`,{className:`root`,children:(0,_.jsxs)(`div`,{className:`container`,children:[(0,_.jsx)(`div`,{className:`target`,ref:t,style:{top:`50px`,left:`50px`,width:`200px`,height:`200px`},children:`Target`}),(0,_.jsx)(o,{target:t,draggable:!0,resizable:!0,rotatable:!0,clippable:!0,dragWithClip:!0,padding:{left:10,right:10,bottom:10,top:10},onRender:e=>{e.target.style.cssText+=e.cssText}})]})})}var g,_;function v(){return(v=t((()=>{g=e(r()),a(),_=i()})))()}var y;function b(){return(b=t((()=>{y=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target" ref={targetRef} style={{
                    top: "50px",
                    left: "50px",
                    width: "200px",
                    height: "200px",
                }}>Target</div>
                <Moveable
                    target={targetRef}
                    draggable={true}
                    resizable={true}
                    clippable={true}
                    dragWithClip={false}
                    clipTargetBounds={true}
                    snappable={true}

                    horizontalGuidelines={[0, 100, 200, 300]}
                    // verticalGuidelines={[0, 100, 200, 300]}
                    snapThreshold={5}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                    onResize={e => {
                        e.target.style.width = \`\${e.width}px\`;
                        e.target.style.height = \`\${e.height}px\`;
                        e.target.style.transform = e.drag.transform;
                    }}
                    onClip={e => {
                        e.target.style.clipPath = e.clipStyle;
                    }} />
            </div>
        </div>
    );
}
`})))()}var x;function S(){return(S=t((()=>{x=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target" ref={targetRef} style={{
                    top: "50px",
                    left: "50px",
                    width: "200px",
                    height: "200px",
                }}>Target</div>
                <Moveable
                    target={targetRef}
                    draggable={true}
                    resizable={true}
                    rotatable={true}
                    clippable={true}
                    dragWithClip={true}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var C;function w(){return(w=t((()=>{C=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {

    return (
        <div className="root">
            <div className="container">
                <div className="target" style={{
                    position: "relative",
                    top: "50px",
                    left: "50px",
                    width: "200px",
                    height: "200px",
                }}>Target</div>
                <Moveable
                    target=".target"
                    draggable={true}
                    resizable={{
                        keepRatio: true,
                    }}
                    clippable={{
                        keepRatio: false,
                    }}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                    onResize={e => {
                        e.target.style.width = \`\${e.width}px\`;
                        e.target.style.height = \`\${e.height}px\`;
                        e.target.style.transform = e.drag.transform;
                    }}
                    onClip={e => {
                        e.target.style.clipPath = e.clipStyle;
                    }} />
            </div>
        </div>
    );
}
`})))()}var T;function E(){return(E=t((()=>{T=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target" ref={targetRef} style={{
                    top: "50px",
                    left: "50px",
                    width: "200px",
                    height: "200px",
                }}>Target</div>
                <Moveable
                    target={targetRef}
                    draggable={true}
                    resizable={true}
                    rotatable={true}
                    clippable={true}
                    dragWithClip={true}
                    padding={{ left: 10, right: 10, bottom: 10, top: 10 }}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var D;function O(){return(O=t((()=>{D=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target"
            \${ref(this.targetRef)}
            style="top: 50px;left: 50px;width: 200px;height: 200px;"
        >Target</div>
        <lit-moveable
            .target=\${this.targetRef}
            .litDraggable=\${true}
            .resizable=\${true}
            .clippable=\${true}
            .dragWithClip=\${false}
            .clipTargetBounds=\${true}
            .snappable=\${true}
            .horizontalGuidelines=\${[0, 100, 200, 300]}
            .snapThreshold=\${5}
            @litDrag=\${this.onDrag}
            @litResize=\${this.onResize}
            @litClip=\${this.onClip}
        ></lit-moveable>
    </div>
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
    onClip(e) {
        e.target.style.clipPath = e.clipStyle;
    }
}`})))()}var k;function A(){return(A=t((()=>{k=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target"
            \${ref(this.targetRef)}
            style="top: 50px;left: 50px;width: 200px;height: 200px;"
        >Target</div>
        <lit-moveable
            .target=\${this.targetRef}
            .litDraggable=\${true}
            .resizable=\${true}
            .rotatable=\${true}
            .clippable=\${true}
            .dragWithClip=\${true}
            @litRender=\${this.onRender}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var j;function M(){return(M=t((()=>{j=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target"
            style="position: relative;top: 50px;left: 50px;width: 200px;height: 200px;"
        >Target</div>
        <lit-moveable
            target=".target"
            .litDraggable=\${true}
            .resizable=\${{
            keepRatio: true
        }}
            .clippable=\${{
            keepRatio: false
        }}
            @litDrag=\${this.onDrag}
            @litResize=\${this.onResize}
            @litClip=\${this.onClip}
        ></lit-moveable>
    </div>
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
    onClip(e) {
        e.target.style.clipPath = e.clipStyle;
    }
}`})))()}var N;function P(){return(P=t((()=>{N=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target"
            \${ref(this.targetRef)}
            style="top: 50px;left: 50px;width: 200px;height: 200px;"
        >Target</div>
        <lit-moveable
            .target=\${this.targetRef}
            .litDraggable=\${true}
            .resizable=\${true}
            .rotatable=\${true}
            .clippable=\${true}
            .dragWithClip=\${true}
            .padding=\${{ left: 10, right: 10, bottom: 10, top: 10 }}
            @litRender=\${this.onRender}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var F;function I(){return(I=t((()=>{F=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            style="top: 50px;left: 50px;width: 200px;height: 200px;"
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var L;function R(){return(R=t((()=>{L=`import Moveable from "moveable";

let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    draggable: true,
    resizable: true,
    clippable: true,
    dragWithClip: false,
    clipTargetBounds: true,
    snappable: true,
    horizontalGuidelines: [0, 100, 200, 300],
    snapThreshold: 5
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable$0.on("resize", e => {
    e.target.style.width = \`\${e.width}px\`;
    e.target.style.height = \`\${e.height}px\`;
    e.target.style.transform = e.drag.transform;
});
moveable$0.on("clip", e => {
    e.target.style.clipPath = e.clipStyle;
});`})))()}var z;function B(){return(B=t((()=>{z=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            style="top: 50px;left: 50px;width: 200px;height: 200px;"
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var V;function H(){return(H=t((()=>{V=`import Moveable from "moveable";

let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    draggable: true,
    resizable: true,
    rotatable: true,
    clippable: true,
    dragWithClip: true
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var U;function W(){return(W=t((()=>{U=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            style="position: relative;top: 50px;left: 50px;width: 200px;height: 200px;"
        >Target</div>
    </div>
</div>`})))()}var G;function le(){return(le=t((()=>{G=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    resizable: { keepRatio: true },
    clippable: { keepRatio: false }
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable$0.on("resize", e => {
    e.target.style.width = \`\${e.width}px\`;
    e.target.style.height = \`\${e.height}px\`;
    e.target.style.transform = e.drag.transform;
});
moveable$0.on("clip", e => {
    e.target.style.clipPath = e.clipStyle;
});`})))()}var K;function ue(){return(ue=t((()=>{K=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            style="top: 50px;left: 50px;width: 200px;height: 200px;"
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var de;function fe(){return(fe=t((()=>{de=`import Moveable from "moveable";

let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    draggable: true,
    resizable: true,
    rotatable: true,
    clippable: true,
    dragWithClip: true,
    padding: { left: 10, right: 10, bottom: 10, top: 10 }
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var pe;function me(){return(me=t((()=>{pe=`<script>
import Moveable from "svelte-moveable";

let targetRef = null;
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target"
            bind:this={targetRef}
            style="top: 50px;left: 50px;width: 200px;height: 200px;"
        >Target</div>
        <Moveable
            target={targetRef}
            draggable={true}
            resizable={true}
            clippable={true}
            dragWithClip={false}
            clipTargetBounds={true}
            snappable={true}
            horizontalGuidelines={[0, 100, 200, 300]}
            snapThreshold={5}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:resize={({ detail: e }) => {
                e.target.style.width = \`\${e.width}px\`;
                e.target.style.height = \`\${e.height}px\`;
                e.target.style.transform = e.drag.transform;
            }}
            on:clip={({ detail: e }) => {
                e.target.style.clipPath = e.clipStyle;
            }}/>
    </div>
</div>`})))()}var he;function ge(){return(ge=t((()=>{he=`<script>
import Moveable from "svelte-moveable";

let targetRef = null;
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target"
            bind:this={targetRef}
            style="top: 50px;left: 50px;width: 200px;height: 200px;"
        >Target</div>
        <Moveable
            target={targetRef}
            draggable={true}
            resizable={true}
            rotatable={true}
            clippable={true}
            dragWithClip={true}
            on:render={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}/>
    </div>
</div>`})))()}var _e;function ve(){return(ve=t((()=>{_e=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target"
            style="position: relative;top: 50px;left: 50px;width: 200px;height: 200px;"
        >Target</div>
        <Moveable
            target=".target"
            draggable={true}
            resizable={{ keepRatio: true }}
            clippable={{ keepRatio: false }}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:resize={({ detail: e }) => {
                e.target.style.width = \`\${e.width}px\`;
                e.target.style.height = \`\${e.height}px\`;
                e.target.style.transform = e.drag.transform;
            }}
            on:clip={({ detail: e }) => {
                e.target.style.clipPath = e.clipStyle;
            }}/>
    </div>
</div>`})))()}var ye;function be(){return(be=t((()=>{ye=`<script>
import Moveable from "svelte-moveable";

let targetRef = null;
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target"
            bind:this={targetRef}
            style="top: 50px;left: 50px;width: 200px;height: 200px;"
        >Target</div>
        <Moveable
            target={targetRef}
            draggable={true}
            resizable={true}
            rotatable={true}
            clippable={true}
            dragWithClip={true}
            padding={{ left: 10, right: 10, bottom: 10, top: 10 }}
            on:render={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}/>
    </div>
</div>`})))()}var xe;function Se(){return(Se=t((()=>{xe=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const targetRef = ref(null);
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onResize = e => {
            e.target.style.width = \`\${e.width}px\`;
            e.target.style.height = \`\${e.height}px\`;
            e.target.style.transform = e.drag.transform;
        };
        const onClip = e => {
            e.target.style.clipPath = e.clipStyle;
        };
        return { targetRef, onDrag, onResize, onClip };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target"
                ref="targetRef"
                style="top: 50px;left: 50px;width: 200px;height: 200px;"
            >Target</div>
            <Moveable
                :target="targetRef"
                :draggable="true"
                :resizable="true"
                :clippable="true"
                :dragWithClip="false"
                :clipTargetBounds="true"
                :snappable="true"
                :horizontalGuidelines="[0, 100, 200, 300]"
                :snapThreshold="5"
                @drag="onDrag"
                @resize="onResize"
                @clip="onClip"/>
        </div>
    </div>
</template>`})))()}var Ce;function we(){return(we=t((()=>{Ce=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const targetRef = ref(null);
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        return { targetRef, onRender };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target"
                ref="targetRef"
                style="top: 50px;left: 50px;width: 200px;height: 200px;"
            >Target</div>
            <Moveable
                :target="targetRef"
                :draggable="true"
                :resizable="true"
                :rotatable="true"
                :clippable="true"
                :dragWithClip="true"
                @render="onRender"/>
        </div>
    </div>
</template>`})))()}var Te;function Ee(){return(Ee=t((()=>{Te=`<script>
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
        const onClip = e => {
            e.target.style.clipPath = e.clipStyle;
        };
        return { onDrag, onResize, onClip };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target"
                style="position: relative;top: 50px;left: 50px;width: 200px;height: 200px;"
            >Target</div>
            <Moveable
                target=".target"
                :draggable="true"
                :resizable="({ keepRatio: true })"
                :clippable="({ keepRatio: false })"
                @drag="onDrag"
                @resize="onResize"
                @clip="onClip"/>
        </div>
    </div>
</template>`})))()}var q;function De(){return(De=t((()=>{q=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const targetRef = ref(null);
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        return { targetRef, onRender };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target"
                ref="targetRef"
                style="top: 50px;left: 50px;width: 200px;height: 200px;"
            >Target</div>
            <Moveable
                :target="targetRef"
                :draggable="true"
                :resizable="true"
                :rotatable="true"
                :clippable="true"
                :dragWithClip="true"
                :padding="({ left: 10, right: 10, bottom: 10, top: 10 })"
                @render="onRender"/>
        </div>
    </div>
</template>`})))()}var J,Y,Oe,X,Z,Q,$,ke;function Ae(){return(Ae=t((()=>{ne(),oe(),m(),v(),b(),S(),w(),E(),O(),A(),M(),P(),I(),R(),B(),H(),W(),le(),ue(),fe(),me(),ge(),ve(),be(),Se(),we(),Ee(),De(),ee(),J=Object.assign({"./ReactClipSnapApp.tsx":te,"./ReactClippableApp.tsx":re,"./ReactClippableResizableKeepRatioApp.tsx":se,"./ReactClippedAreaApp.tsx":ce}),Y=Object.assign({"./ReactClipSnapApp.tsx":y,"./ReactClippableApp.tsx":x,"./ReactClippableResizableKeepRatioApp.tsx":C,"./ReactClippedAreaApp.tsx":T,"./lit/ReactClipSnapApp/App.ts":D,"./lit/ReactClippableApp/App.ts":k,"./lit/ReactClippableResizableKeepRatioApp/App.ts":j,"./lit/ReactClippedAreaApp/App.ts":N,"./script/ReactClipSnapApp/App.html":F,"./script/ReactClipSnapApp/App.js":L,"./script/ReactClippableApp/App.html":z,"./script/ReactClippableApp/App.js":V,"./script/ReactClippableResizableKeepRatioApp/App.html":U,"./script/ReactClippableResizableKeepRatioApp/App.js":G,"./script/ReactClippedAreaApp/App.html":K,"./script/ReactClippedAreaApp/App.js":de,"./svelte/ReactClipSnapApp/App.svelte":pe,"./svelte/ReactClippableApp/App.svelte":he,"./svelte/ReactClippableResizableKeepRatioApp/App.svelte":_e,"./svelte/ReactClippedAreaApp/App.svelte":ye,"./vue3/ReactClipSnapApp/App.vue":xe,"./vue3/ReactClippableApp/App.vue":Ce,"./vue3/ReactClippableResizableKeepRatioApp/App.vue":Te,"./vue3/ReactClippedAreaApp/App.vue":q}),Oe={title:`Adavanced Clippable`},X={name:`Clippable with Drag, Resize, Rotate`,...s(ie,{apps:J,sources:Y})},Z={name:`Drag, Resize, Rotate with Clipped Area (Testing)`,...s(h,{apps:J,sources:Y})},Q={name:`Clip & Snap`,...s(c,{apps:J,sources:Y})},$={name:`keepRatio for both clippable and resizeable`,...s(f,{apps:J,sources:Y})},ke=[`AdvancedClippable`,`AdvancedClippableClippedArea`,`AdvancedClippableClipSnap`,`AdvancedClippableResizableKeepRatio`],X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: "Clippable with Drag, Resize, Rotate",
  ...appStory(ReactClippableApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: "Drag, Resize, Rotate with Clipped Area (Testing)",
  ...appStory(ReactClippedAreaApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: "Clip & Snap",
  ...appStory(ReactClipSnapApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: "keepRatio for both clippable and resizeable",
  ...appStory(ReactClippableResizableKeepRatioApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...$.parameters?.docs?.source}}}})))()}Ae();export{X as AdvancedClippable,Q as AdvancedClippableClipSnap,Z as AdvancedClippableClippedArea,$ as AdvancedClippableResizableKeepRatio,ke as __namedExportsOrder,Oe as default};