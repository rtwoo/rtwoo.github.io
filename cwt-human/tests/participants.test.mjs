import test from 'node:test';
import assert from 'node:assert/strict';
import { createExhibitConfig, normalizeSubjectLimit, MULTIPOSE_MODEL } from '../demo/participants.js';

test('missing or malformed subject limits use the exhibit default', () => {
  for (const value of [null, undefined, '', 'invalid', Infinity, NaN]) assert.equal(normalizeSubjectLimit(value), 4);
});

test('URL limits cannot exceed the six-pose model capacity or produce zero/negative limits', () => {
  for (const [input, expected] of [[-100, 1], [0, 1], [2.9, 2], [6, 6], [1000, 6]]) {
    assert.equal(normalizeSubjectLimit(input), expected);
  }
});

test('every capacity uses a multi-person body model and allocates two hands per subject', () => {
  for (let limit = 1; limit <= 6; limit++) {
    const config = createExhibitConfig(String(limit));
    assert.equal(config.face.detector.maxDetected, limit);
    assert.equal(config.body.maxDetected, limit);
    assert.equal(config.hand.maxDetected, limit * 2);
    assert.equal(config.body.modelPath, MULTIPOSE_MODEL);
    assert.match(config.body.modelPath, /@[a-f0-9]{40}\/models\/movenet-multipose\.json$/);
    assert.equal(config.face.emotion.enabled, true);
    assert.equal(config.gesture.enabled, true);
    assert.equal(config.face.description.enabled, false);
    assert.equal(config.face.emotion.skipFrames, 0);
    assert.equal(config.cacheSensitivity, 0);
  }
});
