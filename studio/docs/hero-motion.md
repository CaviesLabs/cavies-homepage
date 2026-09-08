# Reflective Cavies monogram

The homepage uses a custom rounded C geometry, rendered with Three.js. A procedural studio environment provides silver, burgundy, and lime reflections. No external model, HDR image, texture service, camera, or device-motion permission is required.

- `reflective-mark.tsx`: React lifecycle, deferred loading, pointer and scroll input, visibility and motion preferences.
- `reflective-scene.ts`: geometry, reflective material, environment, camera, easing, and GPU-resource disposal.
- `reflective-mark.module.css`: canvas layering, halo, shadow, and static SVG fallback.
- `app/globals.css`: the surrounding responsive hero layout.

Pointer movement changes the viewing angle, while a small scroll offset adds depth. Frames are requested only until the target settles. Hidden/offscreen content does not render, and coarse pointers do not trigger pointer or scroll animation. Pixel ratio is capped at 1.5.

Reduced-motion preferences keep the server-rendered SVG visible without loading the scene. The same fallback covers unsupported WebGL or lost contexts. Cleanup removes observers/listeners and disposes geometry, materials, the environment texture, and renderer.

When changing the effect, inspect its actual appearance and pointer response in a browser, verify the reduced-motion and mobile states, and check that the fallback remains visible if WebGL is unavailable. The element is decorative and excluded from the accessibility tree; all pricing and navigation work independently of it.
