import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sweet-alert', 'Integration | Component | sweet alert', {
  integration: true,
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  sinon.spy(window, "swal");
  this.render(hbs`{{sweet-alert}}`);

  assert.ok(window.swal.calledOnce);

  window.swal.reset();

  this.render(hbs`{{sweet-alert show=false}}`);
  assert.equal(window.swal.callCount, 0);
});

