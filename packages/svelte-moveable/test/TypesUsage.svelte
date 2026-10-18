<script lang="ts">
  // Compile-time checks of template usage in a runes component (pnpm test:type).
  import Moveable from "../dist/index.js";

  let target = $state<HTMLElement>();
  let moveable = $state<ReturnType<typeof Moveable>>();

  export function width(): number | undefined {
    return moveable?.getRect().offsetWidth;
  }
</script>
<div bind:this={target}></div>
<Moveable
  bind:this={moveable}
  {target}
  draggable={true}
  onDrag={e => {
    const transform: string = e.transform;

    e.target.style.transform = transform;
  }}/>
