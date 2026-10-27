

<p align="middle" ><img src="https://raw.githubusercontent.com/colinli007/moveable-next/main/demo/images/logo.png"/></p>
<h2 align="middle">React Moveable</h2>
<p align="middle">
<a href="https://www.npmjs.com/package/@moveable-next/react" target="_blank"><img src="https://img.shields.io/npm/v/@moveable-next/react.svg?style=flat-square&color=007acc&label=version" alt="npm version" /></a>
<img src="https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square"/>
<a href="https://github.com/colinli007/moveable-next/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/colinli007/moveable-next.svg?style=flat-square&label=license&color=08CE5D"/></a>
</p>
<p align="middle">A React Component that create Moveable, Draggable, Resizable, Scalable, Rotatable, Warpable, Pinchable, Groupable, Snappable.</p>
<p align="middle">
    <a href="https://colinli007.github.io/moveable-next/" target="_blank"><strong>Demo</strong></a> /
    <a href="https://colinli007.github.io/moveable-next/storybook/" target="_blank"><strong>Storybook</strong></a> /
    <a href="https://colinli007.github.io/moveable-next/release/latest/doc/" target="_blank"><strong>API</strong></a> /
    <a href="https://github.com/daybrush/scena" target="_blank"><strong>Main Project</strong></a>
</p>



<table width="100%" align="center">
<tr>
<th colspan="4">Moveable</th>
</tr>
<tr>
<td align="center"><a href="https://colinli007.github.io/moveable-next/storybook/?path=/story/basic--basic-draggable"><strong>Draggable</strong></a></td>
<td align="center"><a href="https://colinli007.github.io/moveable-next/storybook/?path=/story/basic--basic-resizable"><strong>Resizable</strong></a></td>
<td align="center"><a href="https://colinli007.github.io/moveable-next/storybook/?path=/story/basic--basic-scalable"><strong>Scalable</strong></a></td>
<td align="center"><a href="https://colinli007.github.io/moveable-next/storybook/?path=/story/basic--baisc-rotatable"><strong>Rotatable</strong></a></td>
</tr>
<tr>
<td align="center">
<img src="https://raw.githubusercontent.com/colinli007/moveable-next/main/demo/images/draggable.gif"/>
</td>
<td align="center">
<img src="https://raw.githubusercontent.com/colinli007/moveable-next/main/demo/images/resizable.gif"/>
</td>
<td align="center">
<img src="https://raw.githubusercontent.com/colinli007/moveable-next/main/demo/images/scalable.gif"/>
</td>
<td align="center">
<img src="https://raw.githubusercontent.com/colinli007/moveable-next/main/demo/images/rotatable.gif"/>
</td>
</tr>
<tr>
<td align="center"><a href="https://colinli007.github.io/moveable-next/storybook/?path=/story/basic--basic-warpable"><strong>Warpable</strong></a></td>
<td align="center"><a href="https://colinli007.github.io/moveable-next/release/latest/doc/interfaces/PinchableOptions.html"><strong>Pinchable</strong></a></td>
<td align="center"><a href="https://colinli007.github.io/moveable-next/storybook/?path=/story/group--group-draggable-resizable-rotatable"><strong>Groupable</strong></a></td>
<td align="center"><a href="https://colinli007.github.io/moveable-next/storybook/?path=/story/snap-bound--snap-guidelines"><strong>Snappable</strong></a></td>
</tr>
<tr>
<td align="center"><img src="https://raw.githubusercontent.com/colinli007/moveable-next/main/demo/images/warpable.gif"/></td>
<td align="center"><img src="https://raw.githubusercontent.com/colinli007/moveable-next/main/demo/images/pinchable.gif"/></td>
<td align="center"><img src="https://raw.githubusercontent.com/colinli007/moveable-next/main/demo/images/groupable.gif"/></td>
<td align="center"><img src="https://raw.githubusercontent.com/colinli007/moveable-next/main/demo/images/snappable.gif"/></td>
</tr>
<tr>
<td align="center"><a href="https://colinli007.github.io/moveable-next/storybook/?path=/story/basic--basic-clippable"><strong>Clippable</strong></a></td>
<td align="center"><a href="https://colinli007.github.io/moveable-next/storybook/?path=/story/basic--basic-roundable"><strong>Roundable</strong></a></td>
<td align="center"><a href="https://colinli007.github.io/moveable-next/storybook/?path=/story/basic--basic-origin-draggable"><strong>OriginDraggable</strong></a></td>
<td align="center"><a href="https://github.com/daybrush/selecto"><strong>Selecto</strong></a></td>
</tr>
<tr>
<td align="center"><img src="https://raw.githubusercontent.com/colinli007/moveable-next/main/demo/images/clippable.gif"/></td>
<td align="center"><img src="https://raw.githubusercontent.com/colinli007/moveable-next/main/demo/images/roundable.gif"/></td>
<td align="center"><img src="https://raw.githubusercontent.com/colinli007/moveable-next/main/demo/images/origindraggable.gif"/></td>
<td align="center"><img src="https://raw.githubusercontent.com/colinli007/moveable-next/main/demo/images/selecto.gif"/></td>
</tr>
</table>


## 🔥 Features
* **Draggable** refers to the ability to drag and move targets.
* **Resizable** indicates whether the target's width and height can be increased or decreased.
* **Scalable** indicates whether the target's x and y can be scale of transform.
* **Rotatable** indicates whether the target can be rotated.
* **Warpable** indicates whether the target can be warped(distorted, bented).
* **Pinchable** indicates whether the target can be pinched with draggable, resizable, scalable, rotatable.
* **Groupable** indicates Whether the targets can be moved in group with draggable, resizable, scalable, rotatable.
* **Snappable** indicates whether to snap to the guideline.
* **OriginDraggable*** indicates Whether to drag origin.
* **Clippable** indicates Whether to clip the target.
* **Roundable** indicates Whether to show and drag or double click border-radius.
* Support SVG Elements (svg, path, line, ellipse, g, rect, ...etc)
* Support Major Browsers
* Support 3d Transform

## ⚙️ Installation
```sh
$ npm i @moveable-next/react
```

### Node ESM
The package ships an ES module build for bundlers (picked through the `module` condition) and a CommonJS build, which Node loads for both `import` and `require`. With a bundler, or with TypeScript's `moduleResolution: "bundler"`, use it as shown below.

In a native ES module project type-checked with `moduleResolution: "node16"` or `"nodenext"` (for example a server-rendering setup without a bundler), TypeScript types the default import as the whole CommonJS module, so `<Moveable />` is a type error although it works at runtime. Use `Moveable.default`, which is the same component at runtime:

```tsx
import Moveable from "@moveable-next/react";

<Moveable.default target={target} draggable={true} />
```

## 📄 Documents

* [**Moveable Handbook**](https://github.com/colinli007/moveable-next/blob/main/handbook/handbook.md)
* [**How to use Group**](https://github.com/colinli007/moveable-next/blob/main/handbook/handbook.md#toc-group)
* [**How to use custom CSS**](https://github.com/colinli007/moveable-next/blob/main/handbook/handbook.md#toc-custom-css)
* [**How to make custom able**](https://github.com/colinli007/moveable-next/blob/main/packages/react-moveable/src/ables/README.md)
* [API Documentation](https://colinli007.github.io/moveable-next/release/latest/doc/)

## 🚀 How to use

```tsx
import Moveable from "@moveable-next/react";

render() {
    return (
        <Moveable
            target={document.querySelector(".target")}
            container={null}
            origin={true}

            /* Resize event edges */
            edge={false}

            /* draggable */
            draggable={true}
            throttleDrag={0}
            onDragStart={({ target, clientX, clientY }) => {
                console.log("onDragStart", target);
            }}
            onDrag={({
                target,
                beforeDelta, beforeDist,
                left, top,
                right, bottom,
                delta, dist,
                transform,
                clientX, clientY,
            }: OnDrag) => {
                console.log("onDrag left, top", left, top);
                // target!.style.left = `${left}px`;
                // target!.style.top = `${top}px`;
                console.log("onDrag translate", dist);
                target!.style.transform = transform;
            }}
            onDragEnd={({ target, isDrag, clientX, clientY }) => {
                console.log("onDragEnd", target, isDrag);
            }}

            /* When resize or scale, keeps a ratio of the width, height. */
            keepRatio={true}

            /* resizable*/
            /* Only one of resizable, scalable, warpable can be used. */
            resizable={true}
            throttleResize={0}
            onResizeStart={({ target , clientX, clientY}) => {
                console.log("onResizeStart", target);
            }}
            onResize={({
                target, width, height,
                dist, delta, direction,
                clientX, clientY,
            }: OnResize) => {
                console.log("onResize", target);
                delta[0] && (target!.style.width = `${width}px`);
                delta[1] && (target!.style.height = `${height}px`);
            }}
            onResizeEnd={({ target, isDrag, clientX, clientY }) => {
                console.log("onResizeEnd", target, isDrag);
            }}

            /* scalable */
            /* Only one of resizable, scalable, warpable can be used. */
            scalable={true}
            throttleScale={0}
            onScaleStart={({ target, clientX, clientY }) => {
                console.log("onScaleStart", target);
            }}
            onScale={({
                target, scale, dist, delta, transform,
                clientX, clientY,
            }: OnScale) => {
                console.log("onScale scale", scale);
                target!.style.transform = transform;
            }}
            onScaleEnd={({ target, isDrag, clientX, clientY }) => {
                console.log("onScaleEnd", target, isDrag);
            }}

            /* rotatable */
            rotatable={true}
            throttleRotate={0}
            onRotateStart={({ target, clientX, clientY }) => {
                console.log("onRotateStart", target);
            }}
            onRotate={({
                target,
                delta, dist,
                transform,
                clientX, clientY,
            }: onRotate) => {
                console.log("onRotate", dist);
                target!.style.transform = transform;
            }}
            onRotateEnd={({ target, isDrag, clientX, clientY }) => {
                console.log("onRotateEnd", target, isDrag);
            }}
            // Enabling pinchable lets you use events that
            // can be used in draggable, resizable, scalable, and rotateable.
            pinchable={true}
            onPinchStart={({ target, clientX, clientY, datas }) => {
                // pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
                console.log("onPinchStart");
            }}
            onPinch={({ target, clientX, clientY, datas }) => {
                // pinch event occur before drag, rotate, scale, resize
                console.log("onPinch");
            }}
            onPinchEnd={({ isDrag, target, clientX, clientY, datas }) => {
                // pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
                console.log("onPinchEnd");
            }}
        />
    );
}
```

### React 18 concurrent mode

If you are using React 18's concurrent mode, use `flushSync` for UI sync.

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { flushSync } from "react-dom";

import Moveable from "@moveable-next/react";


function App() {
    return <Moveable flushSync={flushSync} />
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

## ⚙️ Developments
### `npm start`

The main project was made with `react` and I used [`croact`](https://github.com/daybrush/croact) to make it lighter with umd.

For development and testing, check in [packages/react-moveable](https://github.com/colinli007/moveable-next/tree/main/packages/react-moveable).



```
$ yarn
$ npm run packages:build
$ npm run storybook
```

Runs the app in the development mode.<br/>
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

The page will reload if you make edits.<br/>
You will also see any lint errors in the console.

## ⭐️ Show Your Support
Please give a ⭐️ if this project helped you!



## 👏 Contributing

If you have any questions or requests or want to contribute to `moveable` or other packages, please write the [issue](https://github.com/colinli007/moveable-next/issues) or give me a Pull Request freely.


### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](https://github.com/colinli007/moveable-next/blob/main/CONTRIBUTING.md)].

<a href="https://github.com/colinli007/moveable-next/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=colinli007/moveable-next" />
</a>

## 🐞 Bug Report

If you find a bug, please report to us opening a new [Issue](https://github.com/colinli007/moveable-next/issues) on GitHub.

## Sponsors
<p align="center">
	<a href="https://daybrush.com/sponsors/sponsors.svg">
		<img src="https://daybrush.com/sponsors/sponsors.svg"/>
	</a>
</p>



## 📝 License

This project is [MIT](https://github.com/colinli007/moveable-next/blob/main/LICENSE) licensed.

```
MIT License

Copyright (c) 2019 Daybrush

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
