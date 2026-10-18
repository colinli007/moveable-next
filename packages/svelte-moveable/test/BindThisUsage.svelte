<script>
  // Written the way a runes component uses it: a component reference from bind:this and a callback prop.
  import Moveable from "../dist/index.js";

  let { target, record } = $props();
  let moveable = $state();

  export function getMoveable() {
    return moveable;
  }
</script>
<Moveable
  bind:this={moveable}
  {target}
  draggable={true}
  onDrag={e => {
    record(e);
  }}/>
