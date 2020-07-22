import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from 'ember-test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { open, confirmAndClose, cancelAndClose } from 'ember-sweetalert/test-support';

module('Integration | Component | sweet-alert', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <SweetAlert @title="Any fool can use a computer" />
    `);

    assert.dom('.swal2-title').hasText('Any fool can use a computer');
    await confirmAndClose();
    assert.dom('.swal2-container').doesNotExist();
  });

  test('it has params', async function (assert) {
    await render(hbs`
      <SweetAlert
        @title="The Internet?"
        @text="That thing is still around?"
        @type="question"
      />
    `);

    assert.dom('.swal2-title').hasText('The Internet?', 'title');
    assert.dom('.swal2-content').hasText('That thing is still around?', 'content');
    // @todo assert type

    await confirmAndClose();
    assert.dom('.swal2-container').doesNotExist();
  });

  test('it can be toggled', async function (assert) {
    this.set('isOpen', false);

    await render(hbs`
      <SweetAlert
        @show={{this.isOpen}}
        @title="The Internet?"
        @text="That thing is still around?"
        @type="question"
        @onClose={{action (mut this.isOpen) false}}
      />

      <button {{action (mut this.isOpen) true}}>Open</button>
    `);

    assert.dom('.swal2-container').doesNotExist();
    await open('button');
    assert.dom('.swal2-title').hasText('The Internet?', 'title');
    await confirmAndClose();
    assert.dom('.swal2-container').doesNotExist();
    await open('button');
    assert.dom('.swal2-container').exists('it can be opened a second time');
  });

  test('it has a confirm action', async function (assert) {
    assert.expect(1);
    this.set('confirmed', ({ value }) => assert.ok(value, 'it was confirmed'));
    this.set('cancelled', () => assert.ok(false, 'it was cancelled'));

    await render(hbs`
      <SweetAlert
        @title="Are you sure?"
        @text="You won't be able to revert this!"
        @type="warning"
        @showCancelButton={{true}}
        @onConfirm={{this.confirmed}}
        @onCancel={{this.cancelled}}
      />
    `);

    await confirmAndClose();
  });

  test('it has a cancel action', async function (assert) {
    this.set('confirmed', () => assert.ok(false, 'it was confirmed'));
    this.set('cancel', ({ dismiss }) => this.set('cancellation', dismiss));

    await render(hbs`
      <SweetAlert
        @title="Are you sure?"
        @text="You won't be able to revert this!"
        @type="warning"
        @showCancelButton={{true}}
        @onConfirm={{action this.confirmed}}
        @onCancel={{action this.cancel}}
      />
    `);

    await cancelAndClose();

    assert.equal(this.cancellation, 'cancel');
  });
});
