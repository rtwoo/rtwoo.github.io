// Surface a blocked module/CDN request instead of leaving an indefinite spinner.
window.addEventListener('error', event => {
  if (event.target?.tagName !== 'SCRIPT') return;
  const detail = 'Human could not load. Check your internet connection and retry.';
  document.querySelector('#status').textContent = detail;
  document.querySelector('#loader').style.display = 'none';
  if (parent !== window) parent.postMessage({ type: 'cwt-human', state: 'error', detail }, location.origin);
}, true);
