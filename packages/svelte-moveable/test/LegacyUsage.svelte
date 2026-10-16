<script>
  // Written like the generated Storybook examples: no runes, bind:this and an on: directive.
  import Moveable from "../dist/index.js";

  export let target;
  export let record;
  let moveable;

  export function getMoveable() {
    return moveable;
  }
</script>
<Moveable
  bind:this={moveable}
  target={target}
  draggable={true}
  on:drag={({ detail: e }) => {
    record(e);
  }}/>
