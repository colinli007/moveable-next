import{a as e,n as t,r as n}from"./rolldown-runtime-sJBDdmOt.js";import{t as r}from"./react-D1chmgGX.js";import{t as i}from"./jsx-runtime-DM-zaqa2.js";import{D as a,c as o,d as s,j as c,k as l,r as u,t as d}from"./story-uRijs6RN.js";var f=n({default:()=>p});function p(){let e=m.useRef(null);return(0,h.jsxs)(`div`,{className:`container`,children:[(0,h.jsx)(`p`,{children:`Use only Draggable, Resizable, Rotatable (30% size reduction)`}),(0,h.jsx)(`div`,{className:`target`,ref:e,children:`Target`}),(0,h.jsx)(g,{target:e,draggable:!0,resizable:!0,rotatable:!0,onRender:e=>{e.target.style.cssText+=e.cssText}})]})}var m,h,g;function _(){return(_=t((()=>{m=e(r()),o(),h=i(),g=s([c,l,a])})))()}var v;function y(){return(y=t((()=>{v=`import * as React from "react";
import {
    DraggableProps, makeMoveable, ResizableProps,
    RotatableProps, Rotatable, Draggable, Resizable,
} from "@/react-moveable";


const Moveable = makeMoveable<DraggableProps & ResizableProps & RotatableProps>([
    Draggable,
    Resizable,
    Rotatable,
]);

export default function App() {
    const targetRef = React.useRef<HTMLDivElement>(null);
    return <div className="container">
        <p>Use only Draggable, Resizable, Rotatable (30% size reduction)</p>
        <div className="target" ref={targetRef}>Target</div>
        <Moveable
            target={targetRef}
            draggable={true}
            resizable={true}
            rotatable={true}
            onRender={e => {
                e.target.style.cssText += e.cssText;
            }}
        />
    </div>;
}
`})))()}var b,x,S,C,w;function T(){return(T=t((()=>{_(),y(),u(),b=Object.assign({"./TreeShakingApp.tsx":f}),x=Object.assign({"./TreeShakingApp.tsx":v}),S={title:`Support Tree Shaking`},C={name:`Use only Draggable, Resizable, Rotatable`,...d(p,{apps:b,sources:x})},w=[`TreeShaking`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: "Use only Draggable, Resizable, Rotatable",
  ...appStory(TreeShakingApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...C.parameters?.docs?.source}}}})))()}T();export{C as TreeShaking,w as __namedExportsOrder,S as default};