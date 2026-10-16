<script lang="ts">
  import VanillaMoveable, { PROPERTIES as PROPERTY_NAMES, EVENTS as EVENT_NAMES } from "moveable";
  import type { MoveableEvents, MoveableOptions } from "moveable";
  import { camelize } from "@daybrush/utils";
  import { createEventDispatcher, onMount } from "svelte";

  type Props = MoveableOptions & {
    [K in keyof MoveableEvents as `on${Capitalize<K>}`]?: (e: MoveableEvents[K]) => void;
  };

  // moveable declares both lists as string[]
  const PROPERTIES = PROPERTY_NAMES as Array<keyof MoveableOptions>;
  const EVENTS = EVENT_NAMES as Array<keyof MoveableEvents>;

  const props: Props = $props();
  // Deprecated in Svelte 5; kept for `on:` directives, which the generated Storybook examples use.
  const dispatch = createEventDispatcher<MoveableEvents>();
  let moveableElement: HTMLDivElement;
  let moveable: VanillaMoveable;

  function getOptions(): MoveableOptions {
    return Object.fromEntries(PROPERTIES.filter(name => name in props).map(name => [name, props[name]]));
  }

  onMount(() => {
    moveable = new VanillaMoveable(moveableElement, {
      ...getOptions(),
      warpSelf: true,
    });

    EVENTS.forEach(name => {
      const onName = camelize(`on ${name}`) as keyof Props;

      moveable.on(name, (e: any) => {
        (props[onName] as ((e: any) => void) | undefined)?.(e);
        dispatch(name, e);
      });
    });
    return () => moveable.destroy();
  });
  // Runs after onMount above, so moveable exists; reruns whenever an option prop is reassigned.
  $effect(() => {
    const options = getOptions();

    moveable.setState(options);
  });

  export function getInstance() {
    return moveable;
  }
</script>
<div bind:this={moveableElement}></div>
