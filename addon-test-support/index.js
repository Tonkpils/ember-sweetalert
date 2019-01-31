import { find, click, waitUntil, waitFor } from 'ember-test-helpers';

const SWAL_CONTAINER = '.swal2-container';
const SWAL_CONFIRM = '.swal2-confirm';
const SWAL_CANCEL = '.swal2-cancel';

/**
 * Wait for Sweet Alert to open.
 *
 * @public
 * @return {Promise<void>} resolves when settled.
 */
export function waitForOpen() {
  return waitFor(SWAL_CONTAINER);
}

/**
 * Wait for Sweet Alert to close.
 *
 * @public
 * @return {Promise<void>} resolves when settled.
 */
export function waitForClose() {
  return waitUntil(() => {
    return !find(SWAL_CONTAINER);
  });
}

/**
 * Click the specified target and wait for Sweet Alert to open.
 *
 * @public
 * @param {string|Element} target the element or selector to click on.
 * @return {Promise<void>} resolves when settled.
 */
export function open(target) {
  return click(target).then(() => {
    return waitForOpen();
  });
}

/**
 * Click the Sweet Alert confirm element.
 *
 * @public
 * @return {Promise<void>} resolves when settled.
 */
export function confirm() {
  return click(SWAL_CONFIRM);
}

/**
 * Click the Sweet Alert confirm element and wait for Sweet Alert to close.
 *
 * @public
 * @return {Promise<void>} resolves when settled.
 */
export function confirmAndClose() {
  return confirm().then(() => {
    return waitForClose();
  });
}

/**
 * Click the Sweet Alert cancel element.
 *
 * @public
 * @return {Promise<void>} resolves when settled.
 */
export function cancel() {
  return click(SWAL_CANCEL);
}

/**
 * Click the Sweet Alert cancel element and wait for Sweet Alert to close.
 *
 * @public
 * @return {Promise<void>} resolves when settled.
 */
export function cancelAndClose() {
  return cancel().then(() => {
    return waitForClose();
  });
}
