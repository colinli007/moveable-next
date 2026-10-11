// Storybook's preview puts the story's layout class on <body> (every story here uses the default "padded"),
// which offsets the canvas by 1rem. addon-vitest renders stories without it; add it so that plays measuring
// page coordinates see the same layout as in Storybook.
document.body.classList.add("sb-show-main", "sb-main-padded");
