# CWT Lab Human Behavior Explorer

Published at https://rtwoo.github.io/cwt-human/ through the parent repository's existing Jekyll / GitHub Pages workflow. This is a buildless static exhibit; no server, API key, or cloud inference service is required.

## Attribution

Human runtime: `@vladmandic/human@3.3.6` (version-pinned jsDelivr npm assets).

Adapted demo: https://github.com/vladmandic/human/tree/d0c4c83155fd2325dbb4725ffcaf0ed0109f319c/demo — Copyright Vladimir Mandic, MIT. The full notice is in `HUMAN-LICENSE.txt`. Public credits are in `credits.html`. Brand colors and wordmark treatment follow https://www.cwt-lab.com/.

The files in `demo/helpers/` are unchanged upstream helpers. `demo/index.js` retains the upstream demo and adds exhibit defaults, absolute versioned model paths, explicit camera start, camera lifecycle/error handling, and same-origin status messages. `demo/index-worker.js` points to the pinned runtime. Service worker registration is disabled to avoid affecting the existing personal site. The HTML/CSS are adapted for an iframe within the exhibit shell.

## Operation

Open the exhibit over HTTPS (or localhost), select **Launch live demo**, and allow camera access. **Models** and **Display** expose the original controls. **Stop & reset** releases camera tracks and removes the demo frame. **Try a sample image** runs actual inference on an upstream sample without camera permission. The shell loads no inference code until a mode is selected.

Default models: face detection, mesh, iris, expression classification, body pose, two hands, and gestures. Face description / age / gender are disabled by default. Models run in the browser using WebGL. Internet access is needed for the initial library and model downloads. No offline availability is promised.

Camera and local image input are not uploaded or recorded. The sample image and model/runtime assets are fetched from jsDelivr. No analytics are added. Expression predictions are estimates, not measurements of internal emotional state.

## Local preview

From the repository root: `python -m http.server 8765 --bind 127.0.0.1`, then open http://127.0.0.1:8765/cwt-human/ . The page has no Jekyll front matter and is copied as a static directory. No root-site changes are needed.

## Updating

Update the pinned version in `demo/index.js` and `demo/index-worker.js` together. Keep the upstream license and update `credits.html`. Validate a sample inference, all default model downloads, camera start/stop, fullscreen, and narrow-screen layout before exhibition.

## Exhibit layout

The CWT Lab header, one viewport-filling demo panel, and a compact publication-credit footer make up the page. The citation credits Ryan T. Woo and the supplied i3CE 2026 publication. Fullscreen retains the CWT Lab header and citation. Human attribution and the MIT license remain available; the original live-demo link is removed.

## Multiple participants

The toolbar's **Subject limit** defaults to 4 and supports 1–6. Changing it restarts the current live or sample session and releases the previous camera tracks. The iframe also accepts `?subjects=1` through `?subjects=6`; invalid values default to 4, numeric values are clamped.

`demo/participants.js` applies the same limit to face detection and MoveNet MultiPose, with up to twice as many hands. The MultiPose model and its weights are pinned to Human Models revision `bc66dc53bac03c96d35a7e6daaf717e72f3985f5`; the standard single-pose model cannot detect several bodies by simply increasing a limit. All processing remains in the browser.

**Group sample** uses `samples/in/stock-group-2.jpg` from the same pinned upstream revision as the single-person sample. Use clear, separated subjects for an exhibit; face and hand detail may be lost when people are far from the camera. More faces and hands increase inference cost.

Frame skipping and the image cache are disabled for group defaults so newly arriving subjects and expressions refresh each inference. Index-based interpolation is off to avoid blending poses when detection order changes. Labels identify individual detections, not persistent people, and face/pose/hand IDs are independent.

Validate `node --test cwt-human/tests/participants.test.mjs`, the single and group samples, limits 1 and 6, changing limits during a session, reset, and narrow-screen layout. In-person frame rate and occlusion behavior still require a camera rehearsal with the intended group and hardware.
