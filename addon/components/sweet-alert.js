import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { A } from '@ember/array';

const CONFIGURATION = [
  'title',
  'titleText',
  'text',
  'html',
  'type',
  'footer',
  'backdrop',
  'toast',
  'input',
  'width',
  'padding',
  'background',
  'position',
  'grow',
  'customClass',
  'timer',
  'animation',
  'heightAuto',
  'allowOutsideClick',
  'allowEscapeKey',
  'allowEnterKey',
  'stopKeydownPropagation',
  'showConfirmButton',
  'showCancelButton',
  'confirmButtonText',
  'cancelButtonText',
  'confirmButtonColor',
  'confirmButtonClass',
  'cancelButtonClass',
  'confirmButtonAriaLabel',
  'cancelButtonAriaLabel',
  'buttonsStyling',
  'reverseButtons',
  'focusConfirm',
  'focusCancel',
  'closeButtonAriaLabel',
  'showLoaderOnConfirm',
  'preConfirm',
  'imageUrl',
  'imageWidth',
  'imageHeight',
  'imageAlt',
  'imageClass',
  'inputPlaceholder',
  'inputValue',
  'inputOptions',
  'inputAutoTrim',
  'inputAttributes',
  'inputValidator',
  'inputClass',
  'progressSteps',
  'currentProgressStep',
  'progressStepsDistance',
  'onBeforeOpen',
  'onOpen',
  'onClose'
];

const SweetAlertComponent = Component.extend({
  swal: service(),

  show: true,
  onConfirm: () => {},
  onCancel: () => {},

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

      get(this, 'swal').open(props).then((result) => {
        if (result.value) {
          get(this, 'onConfirm')(result);
        } else {
          get(this, 'onCancel')(result);
        }

        if (!get(this, 'isDestroyed')) {
          set(this, 'show', false);
        }
      });
    }
  },

  _getValues() {
    let props = {};

    A(CONFIGURATION).forEach(key => {
      let value = get(this, key);

      if (undefined !== value) {
        props[key] = value;
      }
    });

    return props;
  }
});

SweetAlertComponent.reopenClass({
  positionalParams: ['title', 'text', 'type']
});

export default SweetAlertComponent;
