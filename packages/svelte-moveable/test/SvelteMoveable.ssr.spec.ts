import { expect, it } from "vitest";
import { render } from "svelte/server";
import SsrPage from "./SsrPage.svelte";

it("renders on the server", () => {
    const { body } = render(SsrPage);

    // Hydration markers are comments; the component renders its root element.
    expect(body.replace(/<!--.*?-->/g, "")).toBe('<div class="page"><div></div></div>');
});
