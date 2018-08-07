import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from 'ember-test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { open, confirmAndClose, cancelAndClose } from 'ember-sweetalert/test-support';

module('Integration | Component | {{sweet-alert}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{sweet-alert "Any fool can use a computer"}}`);

    assert.dom('.swal2-title').hasText('Any fool can use a computer');
    await confirmAndClose();
    assert.dom('.swal2-container').doesNotExist();
  });

  test('it has positional params', async function (assert) {
    await render(hbs`{{sweet-alert "The Internet?" "That thing is still around?" "question"}}`);

    assert.dom('.swal2-title').hasText('The Internet?', 'title');
    assert.dom('.swal2-content').hasText('That thing is still around?', 'content');
    // @todo assert type

    await confirmAndClose();
    assert.dom('.swal2-container').doesNotExist();
  });

  test('it has params', async function (assert) {
    await render(hbs`{{sweet-alert
      title="The Internet?"
      text="That thing is still around?"
      type="question"
    }}`);

    assert.dom('.swal2-title').hasText('The Internet?', 'title');
    assert.dom('.swal2-content').hasText('That thing is still around?', 'content');
    // @todo assert type

    await confirmAndClose();
    assert.dom('.swal2-container').doesNotExist();
  });

  test('it can be toggled', async function (assert) {
    this.set('isOpen', false);
    await render(hbs`
      {{sweet-alert
        show=isOpen
        title="The Internet?"
        text="That thing is still around?"
        type="question"
      }}

      <button {{action (mut isOpen) true}}>Open</button>
    `);

    assert.dom('.swal2-container').doesNotExist();
    await open('button');
    assert.dom('.swal2-title').hasText('The Internet?', 'title');
    await confirmAndClose();
    assert.dom('.swal2-container').doesNotExist();
  });

  test('it has a confirm action', async function (assert) {
    assert.expect(1);
    this.set('confirmed', ({ value }) => assert.ok(value, 'it was confirmed'));
    this.set('cancelled', () => assert.ok(false, 'it was cancelled'));

    await render(hbs`
      {{sweet-alert
        title="Are you sure?"
        text="You won't be able to revert this!"
        type="warning"
        showCancelButton=true
        onConfirm=(action confirmed)
        onCancel=(action cancelled)
      }}
    `);

    await confirmAndClose();
  });

  test('it has a cancel action', async function (assert) {
    assert.expect(1);
    this.set('confirmed', () => assert.ok(false, 'it was confirmed'));
    this.set('cancel', ({ dismiss }) => this.set('cancellation', dismiss));

    await render(hbs`
      {{sweet-alert
        title="Are you sure?"
        text="You won't be able to revert this!"
        type="warning"
        showCancelButton=true
        onConfirm=(action confirmed)
        onCancel=(action cancel)
      }}
    `);

    await cancelAndClose();
    assert.equal(this.get('cancellation'), 'cancel');
  });
});
