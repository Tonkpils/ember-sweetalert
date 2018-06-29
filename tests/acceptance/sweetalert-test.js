import { module, test } from 'qunit';
import { visit, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { open, confirm, confirmAndClose } from 'ember-sweetalert/test-support';
import text from 'ember-text-test-helper';

module('Acceptance | sweetalert', function(hooks) {
  setupApplicationTest(hooks);

  test('it can submit an email', async function(assert) {
    await visit('/');
    await open('.toggle');

    assert.equal(text('.swal2-title'), 'Ember Sweet Alert');

    await confirm();
    await fillIn('input[type="email"]', 'foo@example.com');
    await confirmAndClose();

    assert.equal(text('.email'), 'Email: foo@example.com');
  });
});
