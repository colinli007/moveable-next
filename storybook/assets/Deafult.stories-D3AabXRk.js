import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-D1chmgGX.js";import{t as r}from"./jsx-runtime-DM-zaqa2.js";import{Q as ee,c as i,ct as te,l as a,mt as o,n as ne,r as re,t as s}from"./story-uRijs6RN.js";import{a as ie,n as ae,o as oe}from"./testing-D3qGHjyB.js";import{n as se,t as ce}from"./keycon.esm-Dqfymcq8.js";var le=t({default:()=>c});function c(){return(0,l.jsxs)(`div`,{className:`root`,children:[(0,l.jsx)(`div`,{className:`target`,children:`Target`}),(0,l.jsx)(a,{target:`.target`,rotatable:!0,onRotateStart:e=>{e.setFixedDirection([-.5,-.5])},onRotate:e=>{e.target.style.transform=e.drag.transform}})]})}var l;function u(){return(u=e((()=>{n(),i(),l=r()})))()}var ue=t({default:()=>d});function d(){let{isKeydown:e}=se({keys:[`meta`]});return(0,f.jsxs)(`div`,{className:`root`,children:[(0,f.jsx)(`div`,{className:`target`,children:`Target`}),(0,f.jsx)(a,{target:`.target`,rotatable:{renderDirections:e?o:!1},resizable:{renderDirections:!e},rotateAroundControls:!0,onResize:e=>{e.target.style.cssText+=e.cssText},onRotateStart:e=>{e.setFixedDirection([-.5,-.5])},onRotate:e=>{e.target.style.cssText+=e.cssText}})]})}var f;function p(){return(p=e((()=>{n(),i(),ce(),f=r()})))()}var de=t({default:()=>m});function m(){return(0,h.jsxs)(`div`,{className:`root`,children:[(0,h.jsx)(`div`,{className:`target`,style:{transformOrigin:`top center`},children:`Target`}),(0,h.jsx)(a,{target:`.target`,draggable:!0,rotatable:{renderDirections:o},resolveAblesWithRotatable:{resizable:[`nw`,`ne`,`sw`,`se`]},resizable:{renderDirections:!1},rotateAroundControls:!0,onRender:e=>{e.target.style.cssText+=e.cssText}})]})}var h;function g(){return(g=e((()=>{n(),i(),h=r()})))()}var fe=t({default:()=>_});function _(){return(0,v.jsx)(`div`,{className:`root`,children:(0,v.jsxs)(`div`,{className:`container`,style:{height:`400px`,border:`1px solid black`},children:[(0,v.jsx)(`div`,{className:`target target1 group`,children:`Target1`}),(0,v.jsx)(`div`,{className:`target target2 group`,children:`Target2`}),(0,v.jsx)(`div`,{className:`target target3 group`,children:`Target3`}),(0,v.jsx)(`div`,{className:`target rotatable`,style:{position:`absolute`,width:`200px`,height:`100px`,top:`50px`},children:`Single Target`}),(0,v.jsx)(a,{target:`.target.rotatable`,resizable:!0,draggable:!0,rotatable:!0,onBeforeRotate:e=>{e.setRotation(te(e.rotation,45))},onRender:e=>{e.target.style.cssText+=e.cssText}}),(0,v.jsx)(a,{target:`.target.group`,draggable:!0,rotatable:!0,onBeforeRotateGroup:e=>{e.setRotation(te(e.rotation,45))},onRenderGroup:e=>{e.events.forEach(e=>{e.target.style.cssText+=e.cssText})}})]})})}var v;function y(){return(y=e((()=>{n(),i(),ee(),v=r()})))()}var b;function x(){return(x=e((()=>{b=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return (
        <div className="root">
            <div className="target">Target</div>
            <Moveable
                target={".target"}
                rotatable={true}
                onRotateStart={e => {
                    e.setFixedDirection([-0.5, -0.5]);
                }}
                onRotate={e => {
                    e.target.style.transform = e.drag.transform;
                }}
            />
        </div>
    );
}
`})))()}var S;function C(){return(C=e((()=>{S=`import * as React from "react";
import Moveable, { DIRECTIONS } from "@/react-moveable";
import { useKeycon } from "react-keycon";

export default function App() {
    const { isKeydown } = useKeycon({
        keys: ["meta"],
    });

    return (
        <div className="root">
            <div className="target">Target</div>
            <Moveable
                target={".target"}
                rotatable={{
                    renderDirections: isKeydown ? DIRECTIONS : false,
                }}
                resizable={{
                    renderDirections: isKeydown ? false : true,
                }}
                rotateAroundControls={true}
                onResize={e => {
                    e.target.style.cssText += e.cssText;
                }}
                onRotateStart={e => {
                    e.setFixedDirection([-0.5, -0.5]);
                }}
                onRotate={e => {
                    e.target.style.cssText += e.cssText;
                }}
            />
        </div>
    );
}
`})))()}var w;function T(){return(T=e((()=>{w=`import * as React from "react";
import Moveable, { DIRECTIONS} from "@/react-moveable";

export default function App() {
    return (
        <div className="root">
            <div className="target" style={{
                transformOrigin: "top center",
            }}>Target</div>
            <Moveable
                target={".target"}
                draggable={true}
                rotatable={{
                    renderDirections: DIRECTIONS,
                }}
                resolveAblesWithRotatable={{
                    resizable: ["nw", "ne", "sw", "se"],
                }}
                resizable={{
                    renderDirections: false,
                }}
                rotateAroundControls={true}
                onRender={e => {
                    e.target.style.cssText += e.cssText;

                }}
            />
        </div>
    );
}
`})))()}var E;function D(){return(D=e((()=>{E=`import * as React from "react";
import Moveable from "@/react-moveable";
import { throttle } from "@daybrush/utils";


export default function App() {
    return (
        <div className="root">
            <div className="container" style={{
                height: "400px",
                border: "1px solid black",
            }}>
                <div className="target target1 group">Target1</div>
                <div className="target target2 group">Target2</div>
                <div className="target target3 group">Target3</div>
                <div className="target rotatable" style={{
                    position: "absolute",
                    width: "200px",
                    height: "100px",
                    top: "50px",
                }}>Single Target</div>
                <Moveable
                    target={".target.rotatable"}
                    resizable={true}
                    draggable={true}
                    rotatable={true}
                    onBeforeRotate={e => {
                        e.setRotation(throttle(e.rotation, 45));
                    }}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;

                    }}
                />
                <Moveable
                    target={".target.group"}
                    draggable={true}
                    rotatable={true}
                    onBeforeRotateGroup={e => {
                        e.setRotation(throttle(e.rotation, 45));
                    }}
                    onRenderGroup={e => {
                        e.events.forEach(ev => {
                            ev.target.style.cssText += ev.cssText;
                        });
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var O;function k(){return(k=e((()=>{O=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div class="target">Target</div>
    <lit-moveable
        .target=\${".target"}
        .rotatable=\${true}
        @litRotateStart=\${this.onRotateStart}
        @litRotate=\${this.onRotate}
    ></lit-moveable>
</div>\`;
    }
    onRotateStart(e) {
        e.setFixedDirection([-0.5, -0.5]);
    }
    onRotate(e) {
        e.target.style.transform = e.drag.transform;
    }
}`})))()}var A;function j(){return(j=e((()=>{A=`import Moveable, { DIRECTIONS } from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div
        class="target"
        style="transform-origin: top center;"
    >Target</div>
    <lit-moveable
        .target=\${".target"}
        .litDraggable=\${true}
        .rotatable=\${{
            renderDirections: DIRECTIONS
        }}
        .resolveAblesWithRotatable=\${{
            resizable: ["nw", "ne", "sw", "se"]
        }}
        .resizable=\${{
            renderDirections: false
        }}
        .rotateAroundControls=\${true}
        @litRender=\${this.onRender}
    ></lit-moveable>
</div>\`;
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var M;function N(){return(N=e((()=>{M=`import Moveable from "lit-moveable";
import { throttle } from "@daybrush/utils";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div
        class="container"
        style="height: 400px;border: 1px solid black;"
    >
        <div class="target target1 group">Target1</div>
        <div class="target target2 group">Target2</div>
        <div class="target target3 group">Target3</div>
        <div
            class="target rotatable"
            style="position: absolute;width: 200px;height: 100px;top: 50px;"
        >Single Target</div>
        <lit-moveable
            .target=\${".target.rotatable"}
            .resizable=\${true}
            .litDraggable=\${true}
            .rotatable=\${true}
            @litBeforeRotate=\${this.onBeforeRotate}
            @litRender=\${this.onRender}
        ></lit-moveable>
        <lit-moveable
            .target=\${".target.group"}
            .litDraggable=\${true}
            .rotatable=\${true}
            @litBeforeRotateGroup=\${this.onBeforeRotateGroup}
            @litRenderGroup=\${this.onRenderGroup}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onBeforeRotate(e) {
        e.setRotation(throttle(e.rotation, 45));
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
    onBeforeRotateGroup(e) {
        e.setRotation(throttle(e.rotation, 45));
    }
    onRenderGroup(e) {
        e.events.forEach(ev => {
            ev.target.style.cssText += ev.cssText;
        });
    }
}`})))()}var P;function F(){return(F=e((()=>{P=`<div
    class="root"
    data-croffle-ref="element$0"
>
    <div class="target">Target</div>
</div>`})))()}var I;function L(){return(L=e((()=>{I=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    rotatable: true
});
moveable$0.on("rotateStart", e => {
    e.setFixedDirection([-0.5, -0.5]);
});
moveable$0.on("rotate", e => {
    e.target.style.transform = e.drag.transform;
});`})))()}var R;function z(){return(z=e((()=>{R=`<div
    class="root"
    data-croffle-ref="element$0"
>
    <div
        class="target"
        style="transform-origin: top center;"
    >Target</div>
</div>`})))()}var B;function pe(){return(pe=e((()=>{B=`import Moveable, { DIRECTIONS } from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    rotatable: { renderDirections: DIRECTIONS },
    resolveAblesWithRotatable: { resizable: ["nw", "ne", "sw", "se"] },
    resizable: { renderDirections: false },
    rotateAroundControls: true
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var V;function H(){return(H=e((()=>{V=`<div class="root">
    <div
        class="container"
        style="height: 400px;border: 1px solid black;"
        data-croffle-ref="element$0"
    >
        <div class="target target1 group">Target1</div>
        <div class="target target2 group">Target2</div>
        <div class="target target3 group">Target3</div>
        <div
            class="target rotatable"
            style="position: absolute;width: 200px;height: 100px;top: 50px;"
        >Single Target</div>
    </div>
</div>`})))()}var U;function W(){return(W=e((()=>{U=`import Moveable from "moveable";
import { throttle } from "@daybrush/utils";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target.rotatable",
    resizable: true,
    draggable: true,
    rotatable: true
});
const moveable$1 = new Moveable(element$0, {
    target: ".target.group",
    draggable: true,
    rotatable: true
});
moveable$0.on("beforeRotate", e => {
    e.setRotation(throttle(e.rotation, 45));
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});
moveable$1.on("beforeRotateGroup", e => {
    e.setRotation(throttle(e.rotation, 45));
});
moveable$1.on("renderGroup", e => {
    e.events.forEach(ev => {
        ev.target.style.cssText += ev.cssText;
    });
});`})))()}var G;function me(){return(me=e((()=>{G=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="root">
    <div class="target">Target</div>
    <Moveable
        target={".target"}
        rotatable={true}
        on:rotateStart={({ detail: e }) => {
            e.setFixedDirection([-0.5, -0.5]);
        }}
        on:rotate={({ detail: e }) => {
            e.target.style.transform = e.drag.transform;
        }}/>
</div>`})))()}var he;function ge(){return(ge=e((()=>{he=`<script>
import Moveable, { DIRECTIONS } from "svelte-moveable";
import { useKeycon } from "svelte-keycon";

const { isKeydown } = useKeycon({ keys: ["meta"] });
<\/script>
<div class="root">
    <div class="target">Target</div>
    <Moveable
        target={".target"}
        rotatable={{ renderDirections: $isKeydown ? DIRECTIONS : false }}
        resizable={{ renderDirections: $isKeydown ? false : true }}
        rotateAroundControls={true}
        on:resize={({ detail: e }) => {
            e.target.style.cssText += e.cssText;
        }}
        on:rotateStart={({ detail: e }) => {
            e.setFixedDirection([-0.5, -0.5]);
        }}
        on:rotate={({ detail: e }) => {
            e.target.style.cssText += e.cssText;
        }}/>
</div>`})))()}var _e;function ve(){return(ve=e((()=>{_e=`<script>
import Moveable, { DIRECTIONS } from "svelte-moveable";
<\/script>
<div class="root">
    <div
        class="target"
        style="transform-origin: top center;"
    >Target</div>
    <Moveable
        target={".target"}
        draggable={true}
        rotatable={{ renderDirections: DIRECTIONS }}
        resolveAblesWithRotatable={{ resizable: ["nw", "ne", "sw", "se"] }}
        resizable={{ renderDirections: false }}
        rotateAroundControls={true}
        on:render={({ detail: e }) => {
            e.target.style.cssText += e.cssText;
        }}/>
</div>`})))()}var ye;function be(){return(be=e((()=>{ye=`<script>
import Moveable from "svelte-moveable";
import { throttle } from "@daybrush/utils";
<\/script>
<div class="root">
    <div
        class="container"
        style="height: 400px;border: 1px solid black;"
    >
        <div class="target target1 group">Target1</div>
        <div class="target target2 group">Target2</div>
        <div class="target target3 group">Target3</div>
        <div
            class="target rotatable"
            style="position: absolute;width: 200px;height: 100px;top: 50px;"
        >Single Target</div>
        <Moveable
            target={".target.rotatable"}
            resizable={true}
            draggable={true}
            rotatable={true}
            on:beforeRotate={({ detail: e }) => {
                e.setRotation(throttle(e.rotation, 45));
            }}
            on:render={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}/>
        <Moveable
            target={".target.group"}
            draggable={true}
            rotatable={true}
            on:beforeRotateGroup={({ detail: e }) => {
                e.setRotation(throttle(e.rotation, 45));
            }}
            on:renderGroup={({ detail: e }) => {
                e.events.forEach(ev => {
                    ev.target.style.cssText += ev.cssText;
                });
            }}/>
    </div>
</div>`})))()}var xe;function Se(){return(Se=e((()=>{xe=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onRotateStart = e => {
            e.setFixedDirection([-0.5, -0.5]);
        };
        const onRotate = e => {
            e.target.style.transform = e.drag.transform;
        };
        return { onRotateStart, onRotate };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="target">Target</div>
        <Moveable
            :target="'.target'"
            :rotatable="true"
            @rotateStart="onRotateStart"
            @rotate="onRotate"/>
    </div>
</template>`})))()}var Ce;function we(){return(we=e((()=>{Ce=`<script>
import Moveable, { DIRECTIONS } from "vue3-moveable";
import { useKeycon } from "vue-keycon";

export default {
    components: { Moveable },
    setup() {
        const { isKeydown } = useKeycon({ keys: ["meta"] });
        const onResize = e => {
            e.target.style.cssText += e.cssText;
        };
        const onRotateStart = e => {
            e.setFixedDirection([-0.5, -0.5]);
        };
        const onRotate = e => {
            e.target.style.cssText += e.cssText;
        };
        return { isKeydown, DIRECTIONS, onResize, onRotateStart, onRotate };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="target">Target</div>
        <Moveable
            :target="'.target'"
            :rotatable="({ renderDirections: isKeydown.value ? DIRECTIONS : false })"
            :resizable="({ renderDirections: isKeydown.value ? false : true })"
            :rotateAroundControls="true"
            @resize="onResize"
            @rotateStart="onRotateStart"
            @rotate="onRotate"/>
    </div>
</template>`})))()}var Te;function Ee(){return(Ee=e((()=>{Te=`<script>
import Moveable, { DIRECTIONS } from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        return { DIRECTIONS, onRender };
    }
};
<\/script>
<template>
    <div class="root">
        <div
            class="target"
            style="transform-origin: top center;"
        >Target</div>
        <Moveable
            :target="'.target'"
            :draggable="true"
            :rotatable="({ renderDirections: DIRECTIONS })"
            :resolveAblesWithRotatable="({ resizable: ['nw', 'ne', 'sw', 'se'] })"
            :resizable="({ renderDirections: false })"
            :rotateAroundControls="true"
            @render="onRender"/>
    </div>
</template>`})))()}var De;function K(){return(K=e((()=>{De=`<script>
import Moveable from "vue3-moveable";
import { throttle } from "@daybrush/utils";

export default {
    components: { Moveable },
    setup() {
        const onBeforeRotate = e => {
            e.setRotation(throttle(e.rotation, 45));
        };
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        const onBeforeRotateGroup = e => {
            e.setRotation(throttle(e.rotation, 45));
        };
        const onRenderGroup = e => {
            e.events.forEach(ev => {
                ev.target.style.cssText += ev.cssText;
            });
        };
        return {
            onBeforeRotate,
            onRender,
            onBeforeRotateGroup,
            onRenderGroup
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div
            class="container"
            style="height: 400px;border: 1px solid black;"
        >
            <div class="target target1 group">Target1</div>
            <div class="target target2 group">Target2</div>
            <div class="target target3 group">Target3</div>
            <div
                class="target rotatable"
                style="position: absolute;width: 200px;height: 100px;top: 50px;"
            >Single Target</div>
            <Moveable
                :target="'.target.rotatable'"
                :resizable="true"
                :draggable="true"
                :rotatable="true"
                @beforeRotate="onBeforeRotate"
                @render="onRender"/>
            <Moveable
                :target="'.target.group'"
                :draggable="true"
                :rotatable="true"
                @beforeRotateGroup="onBeforeRotateGroup"
                @renderGroup="onRenderGroup"/>
        </div>
    </div>
</template>`})))()}var Oe,q,J,ke,Y,X,Z,Q,Ae;function $(){return($=e((()=>{u(),p(),g(),y(),x(),C(),T(),D(),k(),j(),N(),F(),L(),z(),pe(),H(),W(),me(),ge(),ve(),be(),Se(),we(),Ee(),K(),re(),ae(),{expect:Oe}=__STORYBOOK_MODULE_TEST__,q=Object.assign({"./ReactCustomOriginApp.tsx":le,"./ReactRotateWithControlsApp.tsx":ue,"./ReactRotateWithResizeApp.tsx":de,"./ReactSetRotationApp.tsx":fe}),J=Object.assign({"./ReactCustomOriginApp.tsx":b,"./ReactRotateWithControlsApp.tsx":S,"./ReactRotateWithResizeApp.tsx":w,"./ReactSetRotationApp.tsx":E,"./lit/ReactCustomOriginApp/App.ts":O,"./lit/ReactRotateWithResizeApp/App.ts":A,"./lit/ReactSetRotationApp/App.ts":M,"./script/ReactCustomOriginApp/App.html":P,"./script/ReactCustomOriginApp/App.js":I,"./script/ReactRotateWithResizeApp/App.html":R,"./script/ReactRotateWithResizeApp/App.js":B,"./script/ReactSetRotationApp/App.html":V,"./script/ReactSetRotationApp/App.js":U,"./svelte/ReactCustomOriginApp/App.svelte":G,"./svelte/ReactRotateWithControlsApp/App.svelte":he,"./svelte/ReactRotateWithResizeApp/App.svelte":_e,"./svelte/ReactSetRotationApp/App.svelte":ye,"./vue3/ReactCustomOriginApp/App.vue":xe,"./vue3/ReactRotateWithControlsApp/App.vue":Ce,"./vue3/ReactRotateWithResizeApp/App.vue":Te,"./vue3/ReactSetRotationApp/App.vue":De}),ke={title:`Advanced Rotatable`},Y={name:`rotate with custom origin`,...s(c,{apps:q,sources:J})},X={name:`rotate with direction controls`,...s(d,{apps:q,sources:J})},Z={name:`rotate with resize`,...s(m,{apps:q,sources:J})},Q={name:`customize the rotation value `,...s(_,{apps:q,sources:J}),play:ne(async({canvasElement:e})=>{await oe();let t=e.querySelector(`.target.rotatable`),n=e.querySelector(`.moveable-control-box .moveable-rotation-control`);await ie({target:n,start:0,end:70,duration:100,interval:10,baseTarget:t}),Oe(t.style.transform).toBe(`translate(0px, 0px) rotate(90deg)`)})},Ae=[`AdvancedRotatableCustomOrigin`,`AdvancedRotatableRotateWithControls`,`AdvancedRotatableRotateWithResize`,`AdvancedSetRotation`],Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: "rotate with custom origin",
  ...appStory(ReactCustomOriginApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: "rotate with direction controls",
  ...appStory(ReactRotateWithControlsApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: "rotate with resize",
  ...appStory(ReactRotateWithResizeApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: "customize the rotation value ",
  ...appStory(ReactSetRotationApp, {
    apps,
    sources
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const target = canvasElement.querySelector<HTMLElement>(".target.rotatable")!;
    const rotationControl = canvasElement.querySelector<HTMLElement>(\`.moveable-control-box .moveable-rotation-control\`)!;
    await rotate({
      target: rotationControl,
      start: 0,
      end: 70,
      duration: 100,
      interval: 10,
      baseTarget: target
    });
    expect(target.style.transform).toBe("translate(0px, 0px) rotate(90deg)");
  })
} satisfies StoryObj`,...Q.parameters?.docs?.source}}}})))()}$();export{Y as AdvancedRotatableCustomOrigin,X as AdvancedRotatableRotateWithControls,Z as AdvancedRotatableRotateWithResize,Q as AdvancedSetRotation,Ae as __namedExportsOrder,ke as default};