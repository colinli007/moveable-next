import{a as e,n as t,r as n}from"./rolldown-runtime-sJBDdmOt.js";import{t as r}from"./react-D1chmgGX.js";import{t as i}from"./jsx-runtime-DM-zaqa2.js";import{c as a,l as o,r as ee,t as s}from"./story-uRijs6RN.js";var te=n({default:()=>c});function c(e){return(0,l.jsxs)(`div`,{className:`no-relative`,style:{height:`400px`},children:[(0,l.jsx)(`div`,{className:`target`,style:{marginLeft:`100px`},children:`Target`}),(0,l.jsxs)(`svg`,{className:`target2`,"data-target":`svg`,style:{top:`45.7%`,left:`63%`,width:`17%`,height:`40%`,transform:`rotate(0deg)`,border:`1px solid black`},children:[(0,l.jsx)(`path`,{"data-target":`path1`,d:`M 74 53.64101615137753 L 14.000000000000027 88.28203230275507 L 14 19 L 74 53.64101615137753 Z`,fill:`#f55`,"stroke-linejoin":`round`,"stroke-width":`8`,opacity:`1`,stroke:`#5f5`,origin:`50% 50%`}),(0,l.jsx)(`path`,{"data-target":`path2`,d:`M 84 68.64101615137753 L 24.00000000000003 103.28203230275507 L 24 34 L 84 68.64101615137753 Z`,fill:`#55f`,"stroke-linejoin":`round`,"stroke-width":`8`,opacity:`1`,stroke:`#333`,origin:`50% 50%`}),(0,l.jsxs)(`g`,{style:{transform:`translate(40px, 10px)`},children:[(0,l.jsx)(`path`,{"data-target":`pathline`,d:`M3,19.333C3,17.258,9.159,1.416,21,5.667
                            c13,4.667,13.167,38.724,39.667,7.39`,fill:`transparent`,stroke:`#ff5`}),(0,l.jsx)(`ellipse`,{"data-target":`ellipse`,cx:`40`,cy:`80`,rx:`40`,ry:`10`,style:{fill:`yellow`,stroke:`purple`,strokeWidth:2}})]})]}),(0,l.jsx)(o,{target:`.target`,draggable:!0,rotatable:!0,onRender:e=>{e.target.style.cssText+=e.cssText}}),(0,l.jsx)(o,{target:`.target2`,draggable:!0,rotatable:!0,onRender:e=>{e.target.style.cssText+=e.cssText}})]})}var l;function ne(){return(ne=t((()=>{r(),a(),l=i()})))()}var re=n({default:()=>ie});function ie(){return(0,u.jsx)(`div`,{className:`root`,children:(0,u.jsxs)(`div`,{className:`container`,style:{height:`400px`,border:`10px solid black`,transform:`translate(40px, 40px)`},children:[(0,u.jsx)(`div`,{className:`target`,style:{position:`fixed`,width:`200px`,height:`100px`,top:`50px`,left:`50px`},children:`Fixed Target`}),(0,u.jsx)(o,{target:`.target`,resizable:!0,draggable:!0,rotatable:!0,onDrag:e=>{e.target.style.transform=e.transform},onResize:e=>{e.target.style.cssText+=`width: ${e.width}px; height: ${e.height}px`,e.target.style.transform=e.drag.transform},onRotate:e=>{e.target.style.transform=e.drag.transform}})]})})}var u;function ae(){return(ae=t((()=>{r(),a(),u=i()})))()}var oe=n({default:()=>d});function d(){let[e,t]=f.useState();return f.useEffect(()=>{t(document.querySelector(`select`))},[]),(0,p.jsxs)(`div`,{className:`root`,children:[(0,p.jsxs)(`select`,{style:{position:`relative`,width:`200px`,height:`100px`},children:[(0,p.jsx)(`option`,{value:`1`,children:`Option1`}),(0,p.jsx)(`option`,{value:`2`,children:`Option2`}),(0,p.jsx)(`option`,{value:`3`,children:`Option3`})]}),(0,p.jsx)(o,{target:e,draggable:!0,onRender:e=>{e.target.style.transform=e.transform}})]})}var f,p;function m(){return(m=t((()=>{f=e(r()),a(),p=i()})))()}var h;function g(){return(g=t((()=>{h=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {

    return (
        <div className="no-relative" style={{
            // position: "relative",
            height: "400px",
        }}>
            <div className="target" style={{
                marginLeft: "100px",
                // left: "100px",
                // transform: "translate(100px, 0px)",
            }}>Target</div>
            <svg className="target2" data-target="svg" style={{
                top: "45.7%",
                left: "63%",
                width: "17%",
                height: "40%",
                transform: "rotate(0deg)",
                border: "1px solid black",
            }}>
                <path data-target="path1" d="M 74 53.64101615137753 L 14.000000000000027 88.28203230275507 L 14 19 L 74 53.64101615137753 Z" fill="#f55" stroke-linejoin="round" stroke-width="8" opacity="1" stroke="#5f5" origin="50% 50%" />
                <path data-target="path2" d="M 84 68.64101615137753 L 24.00000000000003 103.28203230275507 L 24 34 L 84 68.64101615137753 Z" fill="#55f" stroke-linejoin="round" stroke-width="8" opacity="1" stroke="#333" origin="50% 50%" />
                <g style={{ transform: "translate(40px, 10px)" }}>
                    <path data-target="pathline" d="M3,19.333C3,17.258,9.159,1.416,21,5.667
                            c13,4.667,13.167,38.724,39.667,7.39" fill="transparent" stroke="#ff5" />
                    <ellipse data-target="ellipse" cx="40" cy="80" rx="40" ry="10" style={{ fill: "yellow", stroke: "purple", strokeWidth: 2 }} />
                </g>
            </svg>
            <Moveable
                target={".target"}
                draggable={true}
                rotatable={true}
                // rootContainer={document.documentElement}
                onRender={e => {
                    e.target.style.cssText += e.cssText;
                }}
            ></Moveable>
            <Moveable
                target={".target2"}
                draggable={true}
                rotatable={true}
                // rootContainer={document.documentElement}
                onRender={e => {
                    e.target.style.cssText += e.cssText;
                }}
            ></Moveable>
        </div>
    );
}
`})))()}var _;function v(){return(v=t((()=>{_=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return (
        <div className="root">
            <div className="container" style={{
                height: "400px",
                border: "10px solid black",
                transform: "translate(40px, 40px)",
            }}>
                <div className="target" style={{
                    position: "fixed",
                    width: "200px",
                    height: "100px",
                    top: "50px",
                    left: "50px",
                }}>Fixed Target</div>
                <Moveable
                    target={".target"}
                    // rootContainer={document.body}
                    resizable={true}
                    draggable={true}
                    rotatable={true}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                    onResize={e => {
                        e.target.style.cssText += \`width: \${e.width}px; height: \${e.height}px\`;
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
`})))()}var y;function b(){return(b=t((()=>{y=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    const [target, setTarget] = React.useState<HTMLSelectElement>();

    React.useEffect(() => {
        setTarget(document.querySelector<HTMLSelectElement>("select")!);
    }, []);

    return (
        <div className="root">
            <select style={{
                position: "relative",
                width: "200px",
                height: "100px",
            }}>
                <option value="1">Option1</option>
                <option value="2">Option2</option>
                <option value="3">Option3</option>
            </select>
            <Moveable
                target={target}
                draggable={true}
                onRender={e => {
                    e.target.style.transform = e.transform;
                }}
            />
        </div>
    );
}
`})))()}var x;function S(){return(S=t((()=>{x=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div
    class="no-relative"
    style="height: 400px;"
>
    <div
        class="target"
        style="margin-left: 100px;"
    >Target</div>
    <svg
        class="target2"
        data-target="svg"
        style="top: 45.7%;left: 63%;width: 17%;height: 40%;transform: rotate(0deg);border: 1px solid black;"
    >
        <path
            data-target="path1"
            d="M 74 53.64101615137753 L 14.000000000000027 88.28203230275507 L 14 19 L 74 53.64101615137753 Z"
            fill="#f55"
            stroke-linejoin="round"
            stroke-width="8"
            opacity="1"
            stroke="#5f5"
            origin="50% 50%"
        ></path>
        <path
            data-target="path2"
            d="M 84 68.64101615137753 L 24.00000000000003 103.28203230275507 L 24 34 L 84 68.64101615137753 Z"
            fill="#55f"
            stroke-linejoin="round"
            stroke-width="8"
            opacity="1"
            stroke="#333"
            origin="50% 50%"
        ></path>
        <g style="transform: translate(40px, 10px);">
            <path
                data-target="pathline"
                d="M3,19.333C3,17.258,9.159,1.416,21,5.667&#xA;                            c13,4.667,13.167,38.724,39.667,7.39"
                fill="transparent"
                stroke="#ff5"
            ></path>
            <ellipse
                data-target="ellipse"
                cx="40"
                cy="80"
                rx="40"
                ry="10"
                style="fill: yellow;stroke: purple;stroke-width: 2;"
            ></ellipse>
        </g>
    </svg>
    <lit-moveable
        .target=\${".target"}
        .litDraggable=\${true}
        .rotatable=\${true}
        @litRender=\${this.onRender}
    ></lit-moveable>
    <lit-moveable
        .target=\${".target2"}
        .litDraggable=\${true}
        .rotatable=\${true}
        @litRender=\${this.onRender$0}
    ></lit-moveable>
</div>\`;
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
    onRender$0(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var C;function w(){return(w=t((()=>{C=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div
        class="container"
        style="height: 400px;border: 10px solid black;transform: translate(40px, 40px);"
    >
        <div
            class="target"
            style="position: fixed;width: 200px;height: 100px;top: 50px;left: 50px;"
        >Fixed Target</div>
        <lit-moveable
            .target=\${".target"}
            .resizable=\${true}
            .litDraggable=\${true}
            .rotatable=\${true}
            @litDrag=\${this.onDrag}
            @litResize=\${this.onResize}
            @litRotate=\${this.onRotate}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onResize(e) {
        e.target.style.cssText += \`width: \${e.width}px; height: \${e.height}px\`;
        e.target.style.transform = e.drag.transform;
    }
    onRotate(e) {
        e.target.style.transform = e.drag.transform;
    }
}`})))()}var T;function E(){return(E=t((()=>{T=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    @state()
    target: HTMLSelectElement = undefiend;
    render() {
        return html \`<div class="root">
    <select style="position: relative;width: 200px;height: 100px;">
        <option value="1">Option1</option>
        <option value="2">Option2</option>
        <option value="3">Option3</option>
    </select>
    <lit-moveable
        .target=\${this.target}
        .litDraggable=\${true}
        @litRender=\${this.onRender}
    ></lit-moveable>
</div>\`;
    }
    firstUpdated() {
        this.target = document.querySelector<HTMLSelectElement>("select")!;
    }
    onRender(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var D;function O(){return(O=t((()=>{D=`<div
    class="no-relative"
    style="height: 400px;"
    data-croffle-ref="element$0"
>
    <div
        class="target"
        style="margin-left: 100px;"
    >Target</div>
    <svg
        class="target2"
        data-target="svg"
        style="top: 45.7%;left: 63%;width: 17%;height: 40%;transform: rotate(0deg);border: 1px solid black;"
    >
        <path
            data-target="path1"
            d="M 74 53.64101615137753 L 14.000000000000027 88.28203230275507 L 14 19 L 74 53.64101615137753 Z"
            fill="#f55"
            stroke-linejoin="round"
            stroke-width="8"
            opacity="1"
            stroke="#5f5"
            origin="50% 50%"/>
        <path
            data-target="path2"
            d="M 84 68.64101615137753 L 24.00000000000003 103.28203230275507 L 24 34 L 84 68.64101615137753 Z"
            fill="#55f"
            stroke-linejoin="round"
            stroke-width="8"
            opacity="1"
            stroke="#333"
            origin="50% 50%"/>
        <g style="transform: translate(40px, 10px);">
            <path
                data-target="pathline"
                d="M3,19.333C3,17.258,9.159,1.416,21,5.667&#xA;                            c13,4.667,13.167,38.724,39.667,7.39"
                fill="transparent"
                stroke="#ff5"/>
            <ellipse
                data-target="ellipse"
                cx="40"
                cy="80"
                rx="40"
                ry="10"
                style="fill: yellow;stroke: purple;stroke-width: 2;"/>
        </g>
    </svg>
</div>`})))()}var k;function A(){return(A=t((()=>{k=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    rotatable: true
});
const moveable$1 = new Moveable(element$0, {
    target: ".target2",
    draggable: true,
    rotatable: true
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});
moveable$1.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var j;function M(){return(M=t((()=>{j=`<div class="root">
    <div
        class="container"
        style="height: 400px;border: 10px solid black;transform: translate(40px, 40px);"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            style="position: fixed;width: 200px;height: 100px;top: 50px;left: 50px;"
        >Fixed Target</div>
    </div>
</div>`})))()}var N;function P(){return(P=t((()=>{N=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    resizable: true,
    draggable: true,
    rotatable: true
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable$0.on("resize", e => {
    e.target.style.cssText += \`width: \${e.width}px; height: \${e.height}px\`;
    e.target.style.transform = e.drag.transform;
});
moveable$0.on("rotate", e => {
    e.target.style.transform = e.drag.transform;
});`})))()}var se;function F(){return(F=t((()=>{se=`<div
    class="root"
    data-croffle-ref="element$0"
>
    <select style="position: relative;width: 200px;height: 100px;">
        <option value="1">Option1</option>
        <option value="2">Option2</option>
        <option value="3">Option3</option>
    </select>
</div>`})))()}var I;function L(){return(L=t((()=>{I=`import Moveable from "moveable";

let target = undefiend;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: target,
    draggable: true
});
function setTarget(nextTarget) {
    target = nextTarget;
    moveable$0.target = target;
}
moveable$0.on("render", e => {
    e.target.style.transform = e.transform;
});
setTarget(document.querySelector("select"));`})))()}var R;function z(){return(z=t((()=>{R=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div
    class="no-relative"
    style="height: 400px;"
>
    <div
        class="target"
        style="margin-left: 100px;"
    >Target</div>
    <svg
        class="target2"
        data-target="svg"
        style="top: 45.7%;left: 63%;width: 17%;height: 40%;transform: rotate(0deg);border: 1px solid black;"
    >
        <path
            data-target="path1"
            d="M 74 53.64101615137753 L 14.000000000000027 88.28203230275507 L 14 19 L 74 53.64101615137753 Z"
            fill="#f55"
            stroke-linejoin="round"
            stroke-width="8"
            opacity="1"
            stroke="#5f5"
            origin="50% 50%"/>
        <path
            data-target="path2"
            d="M 84 68.64101615137753 L 24.00000000000003 103.28203230275507 L 24 34 L 84 68.64101615137753 Z"
            fill="#55f"
            stroke-linejoin="round"
            stroke-width="8"
            opacity="1"
            stroke="#333"
            origin="50% 50%"/>
        <g style="transform: translate(40px, 10px);">
            <path
                data-target="pathline"
                d="M3,19.333C3,17.258,9.159,1.416,21,5.667&#xA;                            c13,4.667,13.167,38.724,39.667,7.39"
                fill="transparent"
                stroke="#ff5"/>
            <ellipse
                data-target="ellipse"
                cx="40"
                cy="80"
                rx="40"
                ry="10"
                style="fill: yellow;stroke: purple;stroke-width: 2;"/>
        </g>
    </svg>
    <Moveable
        target={".target"}
        draggable={true}
        rotatable={true}
        on:render={({ detail: e }) => {
            e.target.style.cssText += e.cssText;
        }}
    ></Moveable>
    <Moveable
        target={".target2"}
        draggable={true}
        rotatable={true}
        on:render={({ detail: e }) => {
            e.target.style.cssText += e.cssText;
        }}
    ></Moveable>
</div>`})))()}var B;function V(){return(V=t((()=>{B=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="root">
    <div
        class="container"
        style="height: 400px;border: 10px solid black;transform: translate(40px, 40px);"
    >
        <div
            class="target"
            style="position: fixed;width: 200px;height: 100px;top: 50px;left: 50px;"
        >Fixed Target</div>
        <Moveable
            target={".target"}
            resizable={true}
            draggable={true}
            rotatable={true}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:resize={({ detail: e }) => {
                e.target.style.cssText += \`width: \${e.width}px; height: \${e.height}px\`;
                e.target.style.transform = e.drag.transform;
            }}
            on:rotate={({ detail: e }) => {
                e.target.style.transform = e.drag.transform;
            }}/>
    </div>
</div>`})))()}var H;function U(){return(U=t((()=>{H=`<script>
import Moveable from "svelte-moveable";
import { onMount } from "svelte";

let target = undefiend;
onMount(() => {
    target = document.querySelector("select");
});
<\/script>
<div class="root">
    <select style="position: relative;width: 200px;height: 100px;">
        <option value="1">Option1</option>
        <option value="2">Option2</option>
        <option value="3">Option3</option>
    </select>
    <Moveable
        target={target}
        draggable={true}
        on:render={({ detail: e }) => {
            e.target.style.transform = e.transform;
        }}/>
</div>`})))()}var W;function G(){return(G=t((()=>{W=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        const onRender$0 = e => {
            e.target.style.cssText += e.cssText;
        };
        return { onRender, onRender$0 };
    }
};
<\/script>
<template>
    <div
        class="no-relative"
        style="height: 400px;"
    >
        <div
            class="target"
            style="margin-left: 100px;"
        >Target</div>
        <svg
            class="target2"
            data-target="svg"
            style="top: 45.7%;left: 63%;width: 17%;height: 40%;transform: rotate(0deg);border: 1px solid black;"
        >
            <path
                data-target="path1"
                d="M 74 53.64101615137753 L 14.000000000000027 88.28203230275507 L 14 19 L 74 53.64101615137753 Z"
                fill="#f55"
                stroke-linejoin="round"
                stroke-width="8"
                opacity="1"
                stroke="#5f5"
                origin="50% 50%"/>
            <path
                data-target="path2"
                d="M 84 68.64101615137753 L 24.00000000000003 103.28203230275507 L 24 34 L 84 68.64101615137753 Z"
                fill="#55f"
                stroke-linejoin="round"
                stroke-width="8"
                opacity="1"
                stroke="#333"
                origin="50% 50%"/>
            <g style="transform: translate(40px, 10px);">
                <path
                    data-target="pathline"
                    d="M3,19.333C3,17.258,9.159,1.416,21,5.667&#xA;                            c13,4.667,13.167,38.724,39.667,7.39"
                    fill="transparent"
                    stroke="#ff5"/>
                <ellipse
                    data-target="ellipse"
                    cx="40"
                    cy="80"
                    rx="40"
                    ry="10"
                    style="fill: yellow;stroke: purple;stroke-width: 2;"/>
            </g>
        </svg>
        <Moveable
            :target="'.target'"
            :draggable="true"
            :rotatable="true"
            @render="onRender"
        ></Moveable>
        <Moveable
            :target="'.target2'"
            :draggable="true"
            :rotatable="true"
            @render="onRender$0"
        ></Moveable>
    </div>
</template>`})))()}var K;function q(){return(q=t((()=>{K=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onResize = e => {
            e.target.style.cssText += \`width: \${e.width}px; height: \${e.height}px\`;
            e.target.style.transform = e.drag.transform;
        };
        const onRotate = e => {
            e.target.style.transform = e.drag.transform;
        };
        return { onDrag, onResize, onRotate };
    }
};
<\/script>
<template>
    <div class="root">
        <div
            class="container"
            style="height: 400px;border: 10px solid black;transform: translate(40px, 40px);"
        >
            <div
                class="target"
                style="position: fixed;width: 200px;height: 100px;top: 50px;left: 50px;"
            >Fixed Target</div>
            <Moveable
                :target="'.target'"
                :resizable="true"
                :draggable="true"
                :rotatable="true"
                @drag="onDrag"
                @resize="onResize"
                @rotate="onRotate"/>
        </div>
    </div>
</template>`})))()}var ce;function le(){return(le=t((()=>{ce=`<script>
import Moveable from "vue3-moveable";
import { ref, onMounted } from "vue";

export default {
    components: { Moveable },
    setup() {
        const target = ref(undefiend);
        const onRender = e => {
            e.target.style.transform = e.transform;
        };
        onMounted(() => {
            target.value = document.querySelector("select");
        });
        return { target, onRender };
    }
};
<\/script>
<template>
    <div class="root">
        <select style="position: relative;width: 200px;height: 100px;">
            <option value="1">Option1</option>
            <option value="2">Option2</option>
            <option value="3">Option3</option>
        </select>
        <Moveable
            :target="target"
            :draggable="true"
            @render="onRender"/>
    </div>
</template>`})))()}var J,Y,X,Z,Q,$,ue;function de(){return(de=t((()=>{ne(),ae(),m(),g(),v(),b(),S(),w(),E(),O(),A(),M(),P(),F(),L(),z(),V(),U(),G(),q(),le(),ee(),J=Object.assign({"./ReactNoRelativeApp.tsx":te,"./ReactPositionFixedApp.tsx":re,"./ReactSelectFormApp.tsx":oe}),Y=Object.assign({"./ReactNoRelativeApp.tsx":h,"./ReactPositionFixedApp.tsx":_,"./ReactSelectFormApp.tsx":y,"./lit/ReactNoRelativeApp/App.ts":x,"./lit/ReactPositionFixedApp/App.ts":C,"./lit/ReactSelectFormApp/App.ts":T,"./script/ReactNoRelativeApp/App.html":D,"./script/ReactNoRelativeApp/App.js":k,"./script/ReactPositionFixedApp/App.html":j,"./script/ReactPositionFixedApp/App.js":N,"./script/ReactSelectFormApp/App.html":se,"./script/ReactSelectFormApp/App.js":I,"./svelte/ReactNoRelativeApp/App.svelte":R,"./svelte/ReactPositionFixedApp/App.svelte":B,"./svelte/ReactSelectFormApp/App.svelte":H,"./vue3/ReactNoRelativeApp/App.vue":W,"./vue3/ReactPositionFixedApp/App.vue":K,"./vue3/ReactSelectFormApp/App.vue":ce}),X={title:`Advanced Moveable Settings`},Z={name:`Target with position: fixed;`,...s(ie,{apps:J,sources:Y})},Q={name:`Select Form`,...s(d,{apps:J,sources:Y})},$={name:`Static Body`,...s(c,{apps:J,sources:Y})},ue=[`AdancedMoveablePositionFixed`,`AdancedMoveableSelectForm`,`AdancedMoveableNoRelative`],Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: "Target with position: fixed;",
  ...appStory(ReactPositionFixedApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: "Select Form",
  ...appStory(ReactSelectFormApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: "Static Body",
  ...appStory(ReactNoRelativeApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...$.parameters?.docs?.source}}}})))()}de();export{$ as AdancedMoveableNoRelative,Z as AdancedMoveablePositionFixed,Q as AdancedMoveableSelectForm,ue as __namedExportsOrder,X as default};