import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';

const CONFIGURATION = [
  'title',
  'titleText',
  'html',
  'text',
  'type',
  'footer',
  'backdrop',
  'toast',
  'target',
  'input',
  'width',
  'padding',
  'background',
  'position',
  'grow',
  'customClass',
  'customContainerClass',
  'timer',
  'animation',
  'heightAuto',
  'allowOutsideClick',
  'allowEscapeKey',
  'allowEnterKey',
  'stopKeydownPropagation',
  'keydownListenerCapture',
  'showConfirmButton',
  'showCancelButton',
  'confirmButtonText',
  'cancelButtonText',
  'confirmButtonColor',
  'cancelButtonColor',
  'confirmButtonClass',
  'cancelButtonClass',
  'confirmButtonAriaLabel',
  'cancelButtonAriaLabel',
  'buttonsStyling',
  'reverseButtons',
  'focusConfirm',
  'focusCancel',
  'showCloseButton',
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
  'validationMessage',
  'inputClass',
  'progressSteps',
  'currentProgressStep',
  'progressStepsDistance',
];

const EVENTS = [
  'onBeforeOpen',
  'onOpen',
  'onClose',
  'onAfterClose',
];

export default class SweetAlertComponent extends Component {
  @service swal;

  get isOpen() {
    if (undefined === this.args.show) {
      return true;
    }

    return this.args.show;
  }

  @action async fire() {
    let result = await this.swal.open(this._values());

    if (result.value) {
      this._call('onConfirm', result);
    } else {
      this._call('onCancel', result);
    }
  }

  _call(method, ...args) {
    if (!this.isDestroying && this.args[method]) {
      this.args[method](...args);
    }
  }

  _values() {
    let props = {};

    A(CONFIGURATION).forEach(key => {
      let value = this.args[key];

      if (undefined !== value) {
        props[key] = value;
      }
    });

    A(EVENTS).forEach(key => {
      props[key] = () => this._call(key, ...arguments);
    });

    return props;
  }
}
