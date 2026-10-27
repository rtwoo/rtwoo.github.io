// CWT exhibit configuration. Human and model attribution: ../credits.html.
export const DEFAULT_SUBJECTS = 4;
export const MAX_SUBJECTS = 6; // MoveNet MultiPose emits at most six poses.
export const MULTIPOSE_MODEL = 'https://cdn.jsdelivr.net/gh/vladmandic/human-models@bc66dc53bac03c96d35a7e6daaf717e72f3985f5/models/movenet-multipose.json';

export function normalizeSubjectLimit(value) {
  if (value === null || value === undefined || value === '') return DEFAULT_SUBJECTS;
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(MAX_SUBJECTS, Math.max(1, Math.trunc(number))) : DEFAULT_SUBJECTS;
}

export function createExhibitConfig(value) {
  const limit = normalizeSubjectLimit(value);
  return {
    backend: 'webgl',
    modelBasePath: 'https://cdn.jsdelivr.net/npm/@vladmandic/human@3.3.6/models/',
    // Refresh each detection so people entering/leaving do not reuse another face's expression.
    cacheSensitivity: 0,
    face: {
      enabled: true,
      detector: { maxDetected: limit, skipFrames: 0, skipTime: 0 },
      mesh: { enabled: true }, iris: { enabled: true },
      emotion: { enabled: true, skipFrames: 0, skipTime: 0 },
      description: { enabled: false },
    },
    body: { enabled: true, modelPath: MULTIPOSE_MODEL, maxDetected: limit, skipFrames: 0, skipTime: 0 },
    hand: { enabled: true, maxDetected: 2 * limit, skipFrames: 0, skipTime: 0 },
    gesture: { enabled: true },
    object: { enabled: false },
  };
}
