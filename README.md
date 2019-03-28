# Ember Sweet Alert

An [ember-cli](http://www.ember-cli.com/) addon for using [SweetAlert2](https://limonte.github.io/sweetalert2/) in Ember applications.

Installation
------------------------------------------------------------------------------

```
ember install ember-sweetalert
```

IE11 requires the Babel polyfill to be present, otherwise you'll get a
`Promise is undefined` error.
[As per this comment](https://github.com/babel/ember-cli-babel/issues/40#issuecomment-268952820)
you can add it via your `ember-cli-build.js` file as follows:

```js
// ember-cli-build.js
let app = new EmberApp(defaults, {
  'ember-cli-babel': {
    includePolyfill: true
  }
});
```


Usage
------------------------------------------------------------------------------

### In your templates

#### Basic Usage

The `sweet-alert` component allows setting SweetAlert's attributes.

```hbs
{{sweet-alert "Hello World"}}
```

Just like Sweet Alert, the component supports three positional params:

- Title
- Text
- Type

For example:

```hbs
{{sweet-alert "Hello World" "Welcome to our website." "success"}}
```

By default the alert will be open as soon as the template is rendered. See below
for controlling whether the alert is open.

#### Configuration

All Sweet Alert options [Sweet Alert configuration options](https://sweetalert2.github.io/#configuration)
can also be passed in as attributes:

```hbs
{{sweet-alert
  title="Hello World"
  text="Welcome to our website."
  type="success"
  footer="Nothing else to say."
  allowOutsideClick=false
}}
```

If there are defaults that you want to set for every alert, you can set these
in your environment config, e.g.:

```js
ENV['ember-sweetalert'] = {
  target: '#my-sweetalert',
  allowOutsideClick: false
};
```

> The `target` option can only be set in environment config. It cannot be
set as an attribute on the `sweet-alert` component.

#### Opening

By default the alert will be open when the component is rendered. To control
this behaviour, use the `show` attribute. For example to open the alert when
a button is clicked:

```hbs
{{! sayHello === false to start }}
{{sweet-alert
  show=sayHello
  title="Hello World"
  text="Welcome to our website."
  type="success"
}}

<button {{action (mut sayHello) true}}>Click Me</button>
```

Once closed, the alert can be re-opened by clicking the button again.

#### Actions

The component can be supplied with two actions:

- `onConfirm`: invoked if the user clicks the confirm button within the alert.
- `onCancel`: invoked if the user closes the alert without confirmation.

Both actions receive the return value from Sweet Alert.

The following example collects an email from a user, giving them a different
message based on whether they provided the email or cancelled:

```js
export default Controller.extend({
  actions: {
    join({ value }) {
      this.set('email', value);
      this.set('sayThankYou', true);
    }
  }
});
```

```hbs
<button {{action (mut enterEmail true)}}>Join Mailing List</button>

{{sweet-alert
  show=enterEmail
  title="Submit email to join our mailing list"
  input="email"
  showCancelButton=true
  confirmButtonText="Join"
  onConfirm=(action "join")
  onCancel=(action (mut didNotJoin) true)
}}

{{sweet-alert
  show=sayThankYou
  title="Thank You!"
  text="You are now on our mailing list."
  type="success"
}}

{{sweet-alert
  show=didNotJoin
  title=":-("
  text="Ok, we won't add you to our mailing list."
}}
```

### In your code

#### Service

The recommended way to use SweetAlert in your code is to inject the `swal`
service and use the `open` method. The service ensures your default
SweetAlert config is used, plus integrates with the Ember run loop.

Here is an example:

```js
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  swal: service(),

  actions: {
    confirm() {
      this.get('swal').open({
        title: 'Are you sure?',
        showCancelButton: true
      }).then(({ value }) => {
        if (value) {
          this.get('model').destroyRecord();
        }
      });
    }
  }
});
```

The service also exposes the [SweetAlert methods](https://sweetalert2.github.io/#methods),
scheduling any action methods on the Ember run loop.

#### Import it

If you really need to you can import SweetAlert easily with:

```js
import Swal from 'sweetalert2';
```

> Using SweetAlert directly as an import will not have your default settings
and will not be run-loop aware.

### In your tests

#### Setup

You will need to set the target for Sweet Alert to the Ember testing `div`.
Add the following to your environment config:

```js
if (environment === 'test') {
  ENV.APP.rootElement = '#ember-testing';
  // ...
  ENV['ember-sweetalert'] = { target: ENV.APP.rootElement };
}
```

#### Test Helpers

This addon provides a number of test helpers for use with the new Ember testing
API for Ember ^3.0. Test helpers can be used in acceptance or rendering tests.

Test helpers can be imported from `ember-sweetalert/test-support`. The
available helpers are:

| Helper | Description |
| :--- | :--- |
| `open(target)` | Clicks the specified target and waits for Sweet Alert to open. |
| `confirm` | Clicks the Sweet Alert confirm button. |
| `confirmAndClose` | Clicks the Sweet Alert confirm button and waits for it to close. |
| `cancel` | Clicks the Sweet Alert cancel button. |
| `cancelAndClose` | Clicks the Sweet Alert cancel button and waits for it to close. |
| `waitForOpen` | Wait for Sweet Alert to open. |
| `waitForClose` | Wait for Sweet Alert to close. |

An example acceptance test:

```js
import { module, test } from 'qunit';
import { visit, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { open, confirmAndClose } from 'ember-sweetalert/test-support';

module('Acceptance | join mailing list', function(hooks) {
  setupApplicationTest(hooks);

  test('user can join mailing list', async function(assert) {
    await visit('/');
    await open('button.join');
    await fillIn('input[type="email"]', 'foo@example.com');
    await confirmAndClose();

    assert.dom('.email').hasText('Your email is: foo@example.com');
  });
});
```

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
