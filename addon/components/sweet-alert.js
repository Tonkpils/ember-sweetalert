import Component from '@ember/component';
import { getOwner } from '@ember/application';
import { get, set, computed } from '@ember/object';
import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import { Promise } from 'rsvp';
import Swal from 'sweetalert2';

const CONFIGURATION = [
  { key: 'title', value: null },
  { key: 'titleText', value: null },
  { key: 'text', value: null },
  { key: 'html', value: null },
  { key: 'type', value: null },
  { key: 'footer', value: null },
  { key: 'backdrop', value: true },
  { key: 'toast', value: false },
  { key: 'target', value: 'body' },
  { key: 'input', value: null },
  { key: 'width', value: null },
  { key: 'padding', value: null },
  { key: 'background', value: null },
  { key: 'position', value: 'center' },
  { key: 'grow', value: false },
  { key: 'customClass', value: null },
  { key: 'timer', value: null },
  { key: 'animation', value: true },
  { key: 'heightAuto', value: true },
  { key: 'allowOutsideClick', value: true },
  { key: 'allowEscapeKey', value: true },
  { key: 'allowEnterKey', value: true },
  { key: 'stopKeydownPropagation', value: true },
  { key: 'showConfirmButton', value: true },
  { key: 'showCancelButton', value: false },
  { key: 'confirmButtonText', value: 'OK' },
  { key: 'cancelButtonText', value: 'Cancel' },
  { key: 'confirmButtonColor', value: null },
  { key: 'confirmButtonClass', value: null },
  { key: 'cancelButtonClass', value: null },
  { key: 'confirmButtonAriaLabel', value: '' },
  { key: 'cancelButtonAriaLabel', value: '' },
  { key: 'buttonsStyling', value: true },
  { key: 'reverseButtons', value: false },
  { key: 'focusConfirm', value: true },
  { key: 'focusCancel', value: false },
  { key: 'closeButtonAriaLabel', value: 'Close this dialog' },
  { key: 'showLoaderOnConfirm', value: false },
  { key: 'preConfirm', value: null },
  { key: 'imageUrl', value: null },
  { key: 'imageWidth', value: null },
  { key: 'imageHeight', value: null },
  { key: 'imageAlt', value: '' },
  { key: 'imageClass', value: null },
  { key: 'inputPlaceholder', value: '' },
  { key: 'inputValue', value: '' },
  { key: 'inputOptions', value: {} },
  { key: 'inputAutoTrim', value: true },
  { key: 'inputAttributes', value: {} },
  { key: 'inputValidator', value: null },
  { key: 'inputClass', value: null },
  { key: 'progressSteps', value: [] },
  { key: 'currentProgressStep', value: null },
  { key: 'progressStepsDistance', value: '40px' },
  { key: 'onBeforeOpen', value: null },
  { key: 'onOpen', value: null },
  { key: 'onClose', value: null }
];

const SweetAlertComponent = Component.extend({
  show: true,
  onConfirm: () => {},
  onCancel: () => {},

  config: computed(function () {
    let config = (getOwner(this).resolveRegistration('config:environment') || {});

    return config['ember-sweetalert'] || {};
  }),

  didInsertElement() {
    this._super(...arguments);
    this._displaySweetAlert();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this._displaySweetAlert();
  },

  _displaySweetAlert() {
    if (get(this, 'show')) {
      let props = this._getValues();

      new Promise(function (resolve, reject) {
        Swal(props).then(resolve, reject);
      }).then((result) => {
        if (result.value) {
          get(this, 'onConfirm')(result);
        } else {
          get(this, 'onCancel')(result);
        }

        set(this, 'show', false);
      });
    }
  },

  _getValues() {
    let config = get(this, 'config');
    let props = {};

    A(CONFIGURATION).forEach(({ key, value }) => {
      let defaultValue = config[key] || value;
      let actual = get(this, key);

      props[key] = isNone(actual) ? defaultValue : actual;
    });

    return props;
  }
});

SweetAlertComponent.reopenClass({
  positionalParams: ['title', 'text', 'type']
});

export default SweetAlertComponent;
