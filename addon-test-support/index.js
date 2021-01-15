import { find, click, waitUntil, waitFor } from '@ember/test-helpers';

const SWAL_CONTAINER = '.swal2-container';
const SWAL_CONFIRM = '.swal2-confirm';
const SWAL_CANCEL = '.swal2-cancel';

/**
 * Wait for Sweet Alert to open.
 *
 * @public
 * @return {Promise<void>} resolves when settled.
 */
export async function waitForOpen() {
  await waitFor(SWAL_CONTAINER);
}

/**
 * Wait for Sweet Alert to close.
 *
 * @public
 * @return {Promise<void>} resolves when settled.
 */
export async function waitForClose() {
  await waitUntil(() => false === Boolean(find(SWAL_CONTAINER)));
}

/**
 * Click the specified target and wait for Sweet Alert to open.
 *
 * @public
 * @param {string|Element} target the element or selector to click on.
 * @return {Promise<void>} resolves when settled.
 */
export async function open(target) {
  await click(target);
  await waitForOpen();
}

/**
 * Click the Sweet Alert confirm element.
 *
 * @public
 * @return {Promise<void>} resolves when settled.
 */
export async function confirm() {
  await click(SWAL_CONFIRM);
}

/**
 * Click the Sweet Alert confirm element and wait for Sweet Alert to close.
 *
 * @public
 * @return {Promise<void>} resolves when settled.
 */
export async function confirmAndClose() {
  await confirm();
  await waitForClose();
}

/**
 * Click the Sweet Alert cancel element.
 *
 * @public
 * @return {Promise<void>} resolves when settled.
 */
export async function cancel() {
  await click(SWAL_CANCEL);
}

/**
 * Click the Sweet Alert cancel element and wait for Sweet Alert to close.
 *
 * @public
 * @return {Promise<void>} resolves when settled.
 */
export async function cancelAndClose() {
  await cancel();
  await waitForClose();
}
