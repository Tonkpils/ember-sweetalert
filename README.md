# Ember Sweet Alert

An [ember-cli](http://www.ember-cli.com/) addon for using [SweetAlert2](https://limonte.github.io/sweetalert2/) in Ember applications.

## Installation

In your application's directory:

```
ember install ember-sweetalert
```

## Usage

### In your templates

The `sweet-alert` component allows setting SweetAlert's attributes.

```hbs
{{sweet-alert title="Hello World" type="success"}}
```

### In your code

#### Import it

You can import SweetAlert easily with:

```javascript
import sweetAlert from 'ember-sweetalert';

```

#### Use mixin

The SweetAlertMixin allows you to use the SweetAlert2 library with the attribute `sweetAlert`.

```javascript
import Ember from 'ember';
import SweetAlertMixin from 'ember-sweetalert/mixins/sweetalert-mixin';

const { Controller } = Ember;

export default Controller.extend(SweetAlertMixin, {
  actions: {
    submit() {
      let sweetAlert = this.get('sweetAlert');
      sweetAlert({
        title: 'Submit email to run ajax request',
        input: 'email',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        allowOutsideClick: false
      }).then((confirm)=> {
        // ...
      });
    }
  }
});

```

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
