import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';

const CONFIGURATION = [
  'title',
  'titleText',
  'html',
  'text',
  'icon',
  'iconColor',
  'iconHtml',
  'showClass',
  'hideClass',
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
  'timer',
  'timerProgressBar',
  'animation',
  'heightAuto',
  'allowOutsideClick',
  'allowEscapeKey',
  'allowEnterKey',
  'stopKeydownPropagation',
  'keydownListenerCapture',
  'showConfirmButton',
  'showDenyButton',
  'showCancelButton',
  'confirmButtonText',
  'denyButtonText',
  'cancelButtonText',
  'confirmButtonColor',
  'denyButtonColor',
  'cancelButtonColor',
  'confirmButtonAriaLabel',
  'denyButtonAriaLabel',
  'cancelButtonAriaLabel',
  'buttonsStyling',
  'reverseButtons',
  'focusConfirm',
  'focusDeny',
  'focusCancel',
  'showCloseButton',
  'closeButtonHtml',
  'closeButtonAriaLabel',
  'loaderHtml',
  'showLoaderOnConfirm',
  'scrollbarPadding',
  'preConfirm',
  'preDeny',
  'returnInputValueOnDeny',
  'imageUrl',
  'imageWidth',
  'imageHeight',
  'imageAlt',
  'imageLabel',
  'inputPlaceholder',
  'inputValue',
  'inputOptions',
  'inputAutoTrim',
  'inputAttributes',
  'inputValidator',
  'validationMessage',
  'progressSteps',
  'currentProgressStep',
  'progressStepsDistance',
];

const EVENTS = [
  'willOpen',
  'onBeforeOpen', // deprecated, use willOpen
  'didOpen',
  'onOpen', // deprecated, use didOpen
  'didRender',
  'onRender', // deprecated, use didRender
  'willClose',
  'onClose', // deprecated, use willClose
  'didClose',
  'onAfterClose', // deprecated, use didClose,
  'didDestroy',
  'onDestroy', // deprecated, use didDestroy
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
    let result = await this.swal.fire(this._values());

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

    A(CONFIGURATION).forEach((key) => {
      let value = this.args[key];

      if (undefined !== value) {
        props[key] = value;
      }
    });

    A(EVENTS).forEach((key) => {
      if (undefined !== this.args[key]) {
        props[key] = () => this._call(key, ...arguments);
      }
    });

    return props;
  }
}
