import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from 'ember-test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { open, confirmAndClose, cancelAndClose } from 'ember-sweetalert/test-support';
import text from 'ember-text-test-helper';

module('Integration | Component | {{sweet-alert}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{sweet-alert "Any fool can use a computer"}}`);

    assert.equal(text('.swal2-title'), 'Any fool can use a computer');
    await confirmAndClose();
  });

  test('it has positional params', async function (assert) {
    await render(hbs`{{sweet-alert "The Internet?" "That thing is still around?" "question"}}`);

    assert.equal(text('.swal2-title'), 'The Internet?', 'title');
    assert.equal(text('.swal2-content'), 'That thing is still around?', 'content');
    // @todo assert type

    await confirmAndClose();
  });

  test('it has params', async function (assert) {
    await render(hbs`{{sweet-alert
      title="The Internet?"
      text="That thing is still around?"
      type="question"
    }}`);

    assert.equal(text('.swal2-title'), 'The Internet?', 'title');
    assert.equal(text('.swal2-content'), 'That thing is still around?', 'content');
    // @todo assert type

    await confirmAndClose();
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

    assert.notOk(find('.swal2-container'));
    await open('button');
    assert.equal(text('.swal2-title'), 'The Internet?', 'title');
    await confirmAndClose();
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
