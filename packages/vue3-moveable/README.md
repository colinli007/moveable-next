

<p align="middle" ><img src="https://raw.githubusercontent.com/colinli007/moveable-next/main/demo/images/logo.png"/></p>
<h2 align="middle">Vue 3 Moveable</h2>
<p align="middle">
<a href="https://www.npmjs.com/package/@moveable-next/vue3" target="_blank"><img src="https://img.shields.io/npm/v/@moveable-next/vue3.svg?style=flat-square&color=007acc&label=version" alt="npm version" /></a>
<img src="https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square"/>
<a href="https://github.com/colinli007/moveable-next/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/colinli007/moveable-next.svg?style=flat-square&label=license&color=08CE5D"/></a>
</p>
<p align="middle">A Vue 3 Component that create Moveable, Draggable, Resizable, Scalable, Rotatable, Warpable, Pinchable, Groupable, Snappable.</p>
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
$ npm i @moveable-next/vue3 vue
```

@moveable-next/vue3 requires [Vue](https://vuejs.org) 3.5 or later (`vue` is a peer dependency).

### Node ESM
The package ships an ES module build for bundlers (picked through the `module` condition) and a CommonJS build, which Node loads for both `import` and `require`. With a bundler, use it as shown below. In native ES modules run by Node without a bundler (for example server-side rendering), the default import is the whole CommonJS module, so import the named export instead:

```ts
import { VueMoveable } from "@moveable-next/vue3";
```

## 🚀 How to use
If you want to check the methods and events, please refer to the [**API documentation**](https://colinli007.github.io/moveable-next/release/latest/doc/).

```vue
<template>
<div class="container">
    <div class="target" ref="target">Vue Moveable</div>
    <Moveable
        className="moveable"
        v-bind:target="['.target']"
        v-bind:draggable="true"
        v-bind:scalable="true"
        v-bind:rotatable="true"
        @drag="onDrag"
        @scale="onScale"
        @rotate="onRotate"
    />
</div>
</template>
<script>
import Moveable from "@moveable-next/vue3";

export default {
  name: "app",
  components: {
    Moveable,
  },
  methods: {
    onDrag({ transform }) {
        this.$refs.target.style.transform = transform;
    },
    onScale({ drag }) {
        this.$refs.target.style.transform = drag.transform;
    },
    onRotate({ drag }) {
        this.$refs.target.style.transform = drag.transform;
    },
  }
}
</script>
```

The root element of the component is a mount point without a box (`display: contents`) that holds the control box, and positions are computed in the parent of the component unless `container` is set. To reach the control box, call `getControlBoxElement()` through the component ref; to give it classes, use the `className` prop, since attributes set on the component (such as `class`) go to the mount point.

### Only some ables (tree shaking)

`makeMoveable` makes a Moveable component with only the ables you pass (and those every Moveable has), so that your bundler leaves the other ables out. Its type parameter is the props of those ables, which type the props and events.

```vue
<script setup lang="ts">
import { makeMoveable, Draggable, Resizable, type DraggableProps, type ResizableProps } from "@moveable-next/vue3";

const Moveable = makeMoveable<DraggableProps & ResizableProps>([Draggable, Resizable]);
</script>
```

The ables that can be combined are `Draggable`, `Resizable`, `Scalable`, `Rotatable`, `Warpable`, `Clippable`, `EdgeDraggable`, `Snappable`, `Roundable` and `Pinchable`.


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
