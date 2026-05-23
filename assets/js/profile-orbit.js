(function () {
  "use strict";

  var roots = document.querySelectorAll("[data-profile-orbit]");
  if (!roots.length) return;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function initOrbit(root) {
    var image = root.querySelector("img.profile-image");
    if (!image) return;

    var frameCount = parseInt(root.dataset.frameCount || "0", 10);
    if (!frameCount) return;

    var frameBase = (root.dataset.frameBase || "").replace(/\/$/, "");
    var framePrefix = root.dataset.framePrefix || "frame_";
    var frameSuffix = root.dataset.frameSuffix || "_landmarks_pose.png";
    var framePad = parseInt(root.dataset.framePad || "3", 10);
    var frameVersion = root.dataset.frameVersion || "";
    var yawLeftFrame = parseInt(root.dataset.yawLeftFrame || String(Math.floor(frameCount / 2)), 10);
    var yawCenterFrame = parseInt(root.dataset.yawCenterFrame || String(Math.round(frameCount * 0.75)), 10);
    var yawRightFrame = parseInt(root.dataset.yawRightFrame || String(frameCount), 10);
    var yawLeftIndex = clamp(yawLeftFrame - 1, 0, frameCount - 1);
    var yawCenterIndex = clamp(yawCenterFrame - 1, 0, frameCount - 1);
    var yawRightIndex = clamp(yawRightFrame - 1, 0, frameCount - 1);
    var yawMinIndex = Math.min(yawLeftIndex, yawRightIndex);
    var yawMaxIndex = Math.max(yawLeftIndex, yawRightIndex);
    var originalSrc = image.getAttribute("src");
    var originalAlt = image.getAttribute("alt") || "";
    var sources = root.querySelectorAll("source");
    var sourceSrcsets = [];
    var frames = [];
    var loaded = false;
    var currentFrame = yawCenterIndex;
    var targetFrame = yawCenterIndex;
    var renderedFrameIndex = null;
    var animationFrame = null;
    var isHovering = false;

    sources.forEach(function (source) {
      sourceSrcsets.push(source.getAttribute("srcset"));
    });

    for (var i = 1; i <= frameCount; i += 1) {
      var frameSrc = frameBase + "/" + String(i).padStart(framePad, "0").replace(/^/, framePrefix) + frameSuffix;
      if (frameVersion) {
        frameSrc += "?v=" + encodeURIComponent(frameVersion);
      }
      frames.push(frameSrc);
    }

    function preloadFrames() {
      if (loaded) return;
      loaded = true;
      frames.forEach(function (src) {
        var preload = new Image();
        preload.src = src;
      });
    }

    function disableSources() {
      sources.forEach(function (source) {
        source.removeAttribute("srcset");
      });
    }

    function restoreSources() {
      sources.forEach(function (source, index) {
        if (sourceSrcsets[index]) {
          source.setAttribute("srcset", sourceSrcsets[index]);
        }
      });
    }

    function setFrame(frame) {
      currentFrame = clamp(frame, 0, frameCount - 1);
      var frameIndex = clamp(Math.round(currentFrame), 0, frameCount - 1);
      if (renderedFrameIndex === frameIndex) return;

      disableSources();
      image.src = frames[frameIndex];
      image.alt = originalAlt ? originalAlt + " orbit frame" : "Profile orbit frame";
      renderedFrameIndex = frameIndex;
    }

    function stopTween() {
      if (!animationFrame) return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }

    function stepTowardTarget() {
      var delta = targetFrame - currentFrame;

      if (Math.abs(delta) < 0.04) {
        setFrame(targetFrame);
        animationFrame = null;
        return;
      }

      setFrame(currentFrame + clamp(delta * 0.26, -1.35, 1.35));
      animationFrame = window.requestAnimationFrame(stepTowardTarget);
    }

    function glideToFrame(frame) {
      targetFrame = clamp(frame, yawMinIndex, yawMaxIndex);
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(stepTowardTarget);
      }
    }

    function activate() {
      root.classList.add("is-orbit-active");
      preloadFrames();
      stopTween();
      currentFrame = yawCenterIndex;
      targetFrame = yawCenterIndex;
      renderedFrameIndex = null;
      setFrame(yawCenterIndex);
    }

    function frameFromPointer(event) {
      var rect = root.getBoundingClientRect();
      var progress = clamp((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
      return progress <= 0.5
        ? yawLeftIndex + (yawCenterIndex - yawLeftIndex) * (progress / 0.5)
        : yawCenterIndex + (yawRightIndex - yawCenterIndex) * ((progress - 0.5) / 0.5);
    }

    function reset() {
      stopTween();
      root.classList.remove("is-orbit-active");
      restoreSources();
      if (originalSrc) image.src = originalSrc;
      image.alt = originalAlt;
      currentFrame = yawCenterIndex;
      targetFrame = yawCenterIndex;
      renderedFrameIndex = null;
    }

    root.addEventListener("pointerenter", function (event) {
      isHovering = true;
      activate();
      glideToFrame(frameFromPointer(event));
    });

    root.addEventListener("pointerleave", function () {
      isHovering = false;
      reset();
    });

    root.addEventListener("focus", function () {
      isHovering = true;
      activate();
    });

    root.addEventListener("blur", function () {
      isHovering = false;
      reset();
    });

    root.addEventListener("pointermove", function (event) {
      if (!isHovering) return;
      glideToFrame(frameFromPointer(event));
    });

    root.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (!root.classList.contains("is-orbit-active")) {
        activate();
      }
      glideToFrame(clamp(Math.round(targetFrame) + (event.key === "ArrowRight" ? 1 : -1), yawMinIndex, yawMaxIndex));
      event.preventDefault();
    });
  }

  roots.forEach(initOrbit);
})();
