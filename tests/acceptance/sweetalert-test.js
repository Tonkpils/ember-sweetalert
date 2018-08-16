import { module, test } from 'qunit';
import { visit, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { open, confirm, confirmAndClose } from 'ember-sweetalert/test-support';

module('Acceptance | sweetalert', function (hooks) {
  setupApplicationTest(hooks);

  test('it can submit an email', async function (assert) {
    await visit('/');
    await open('.toggle1');

    assert.dom('.swal2-title').hasText('Ember Sweet Alert');

    await confirm();
    await fillIn('input[type="email"]', 'foo@example.com');
    await confirmAndClose();

    assert.dom('.email').hasText('Email: foo@example.com');
  });

  test('it can be opened via import', async function (assert) {
    await visit('/');
    await open('.toggle2');

    assert.dom('.swal2-container').exists();

    await confirmAndClose();

    assert.dom('.swal2-container').doesNotExist();
  });
});
