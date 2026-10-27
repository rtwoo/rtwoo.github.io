/* CWT Lab exhibit shell. Human demo attribution: ./credits.html */
const exhibit = document.querySelector('.exhibit');
const welcome = document.querySelector('#welcome');
const mount = document.querySelector('#demo-mount');
const status = document.querySelector('#session-status');
const light = document.querySelector('#state-light');
const help = document.querySelector('#session-help');
const stop = document.querySelector('#stop');
const fullscreen = document.querySelector('#fullscreen');
let frame;
let loadingTimer;

function setStatus(text, state = '') {
  status.textContent = text;
  light.dataset.state = state;
}

function launch(mode) {
  if (frame) reset();
  welcome.hidden = true;
  mount.hidden = false;
  stop.disabled = false;
  help.hidden = false;
  help.textContent = 'Loading Human and its models. The first run may take a moment.';
  setStatus('Loading demo…', 'loading');
  frame = document.createElement('iframe');
  frame.title = 'Human live computer vision demo';
  frame.allow = 'camera; fullscreen';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  const url = new URL('./demo/', window.location.href);
  if (mode === 'sample') {
    const image = 'https://cdn.jsdelivr.net/gh/vladmandic/human@d0c4c83155fd2325dbb4725ffcaf0ed0109f319c/samples/in/ai-upper.jpg';
    url.searchParams.set('image', JSON.stringify(image));
  } else {
    url.searchParams.set('play', 'true');
  }
  frame.src = url.href;
  mount.replaceChildren(frame);
  loadingTimer = setTimeout(() => {
    help.hidden = false;
    help.textContent = 'Still loading? Check your internet connection and browser camera permission. Stop & reset to try again.';
  }, 30000);
}

function reset() {
  clearTimeout(loadingTimer);
  // Stop tracks explicitly before destroying the browsing context.
  try { frame?.contentDocument?.querySelector('video')?.srcObject?.getTracks().forEach(track => track.stop()); } catch { /* Frame may already be unloaded. */ }
  mount.replaceChildren();
  frame = null;
  mount.hidden = true;
  welcome.hidden = false;
  stop.disabled = true;
  help.hidden = true;
  setStatus('Ready to explore');
}

window.addEventListener('message', event => {
  if (event.origin !== location.origin || event.source !== frame?.contentWindow || event.data?.type !== 'cwt-human') return;
  const { state, detail } = event.data;
  if (state === 'ready') { setStatus('Demo ready', 'loading'); return; }
  clearTimeout(loadingTimer);
  setStatus(detail, state);
  help.hidden = false;
  help.textContent = state === 'error'
    ? 'Check camera permission and your connection, then choose Stop & reset to retry. You can also try the sample image.'
    : state === 'sample'
      ? 'This is a sample image, not a live feed. Choose Stop & reset to launch your camera.'
      : 'Use Models to select features, Display to adjust overlays, and Stop & reset to release the camera.';
});

document.querySelector('#launch').addEventListener('click', () => launch('camera'));
document.querySelector('#sample').addEventListener('click', () => launch('sample'));
stop.addEventListener('click', reset);
fullscreen.addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await exhibit.requestFullscreen();
  } catch {
    help.hidden = false;
    help.textContent = 'Fullscreen is unavailable in this browser. Use your browser’s fullscreen command instead.';
  }
});
document.addEventListener('fullscreenchange', () => {
  fullscreen.querySelector('span').textContent = document.fullscreenElement ? 'Exit fullscreen' : 'Fullscreen';
});
window.addEventListener('pagehide', reset);
