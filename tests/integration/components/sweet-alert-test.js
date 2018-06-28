import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, click, waitUntil, waitFor } from 'ember-native-dom-helpers';
import text from 'ember-text-test-helper';

const waitForClose = function () {
  return waitUntil(() => {
    return !find('.swal2-container');
  });
};

const open = async function (selector) {
  await click(selector);
  await waitFor('.swal2-container');
};

const confirm = async function () {
  await click('.swal2-confirm');
  await waitForClose();
};

const cancel = async function () {
  await click('.swal2-cancel');
  await waitForClose();
};

moduleForComponent('sweet-alert', 'Integration | Component | {{sweet-alert}}', {
  integration: true
});

test('it renders', async function (assert) {
  this.render(hbs`{{sweet-alert "Any fool can use a computer"}}`);

  assert.equal(text('.swal2-title'), 'Any fool can use a computer');
  await confirm();
});

test('it has positional params', async function (assert) {
  this.render(hbs`{{sweet-alert "The Internet?" "That thing is still around?" "question"}}`);

  assert.equal(text('.swal2-title'), 'The Internet?', 'title');
  assert.equal(text('.swal2-content'), 'That thing is still around?', 'content');
  // @todo assert type

  await confirm();
});

test('it has params', async function (assert) {
  this.render(hbs`{{sweet-alert
    title="The Internet?"
    text="That thing is still around?"
    type="question"
  }}`);

  assert.equal(text('.swal2-title'), 'The Internet?', 'title');
  assert.equal(text('.swal2-content'), 'That thing is still around?', 'content');
  // @todo assert type

  await confirm();
});

test('it can be toggled', async function (assert) {
  this.set('isOpen', false);
  this.render(hbs`
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
  await confirm();
});

test('it has a confirm action', async function (assert) {
  assert.expect(1);
  this.on('confirmed', ({ value }) => assert.ok(value, 'it was confirmed'));
  this.on('cancelled', () => assert.ok(false, 'it was cancelled'));

  this.render(hbs`
    {{sweet-alert
      title="Are you sure?"
      text="You won't be able to revert this!"
      type="warning"
      showCancelButton=true
      onConfirm=(action "confirmed")
      onCancel=(action "cancelled")
    }}
  `);

  await confirm();
});

test('it has a cancel action', async function (assert) {
  assert.expect(1);
  this.on('confirmed', () => assert.ok(false, 'it was confirmed'));
  this.on('cancel', ({ dismiss }) => this.set('cancellation', dismiss));

  this.render(hbs`
    {{sweet-alert
      title="Are you sure?"
      text="You won't be able to revert this!"
      type="warning"
      showCancelButton=true
      onConfirm=(action "confirmed")
      onCancel=(action "cancel")
    }}
  `);

  await cancel();
  assert.equal(this.get('cancellation'), 'cancel');
});
