import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { scheduleOnce } from '@ember/runloop';
import { Promise } from 'rsvp';
import Swal from 'sweetalert2';

export default class SweetAlertService extends Service {
  get config() {
    let config = (getOwner(this).resolveRegistration('config:environment') || {});
    return config['ember-sweetalert'] || {};
  }

  get sweetAlert() {
    return Swal.mixin(this.config);
  }

  open(...args) {
    return new Promise((resolve, reject) => {
      this.sweetAlert(...args).then(resolve, reject);
    });
  }

  close() {
    this._run('close');
  }

  mixin(params) {
    return this.sweetAlert.mixin(params);
  }

  getTitle() {
    return Swal.getTitle();
  }

  getCloseButton() {
    return Swal.getCloseButton();
  }

  getContent() {
    return Swal.getContent();
  }

  getImage() {
    return Swal.getImage();
  }

  isVisible() {
    return Swal.isVisible();
  }

  getActions() {
    return Swal.getActions();
  }

  getFooter() {
    return Swal.getFooter();
  }

  getFocusableElements() {
    return Swal.getFocusableElements();
  }

  getConfirmButton() {
    return Swal.getConfirmButton();
  }

  getCancelButton() {
    return Swal.getCancelButton();
  }

  enableButtons() {
    this._run('enableButtons');
  }

  disableButtons() {
    this._run('disableButtons');
  }

  enableConfirmButton() {
    this._run('enableConfirmButton');
  }

  disableConfirmButton() {
    this._run('disableConfirmButton');
  }

  showLoading() {
    this._run('showLoading');
  }

  enableLoading() {
    this._run('enableLoading');
  }

  hideLoading() {
    this._run('hideLoading');
  }

  disableLoading() {
    this._run('disableLoading');
  }

  isLoading() {
    return Swal.isLoading();
  }

  getTimerLeft() {
    return Swal.getTimerLeft();
  }

  clickConfirm() {
    this._run('clickConfirm');
  }

  clickCancel() {
    this._run('clickCancel');
  }

  showValidationError(error) {
    this._run('showValidationError', error);
  }

  resetValidationError() {
    this._run('resetValidationError');
  }

  getInput() {
    return Swal.getInput();
  }

  disableInput() {
    this._run('disableInput');
  }

  enableInput() {
    this._run('enableInput');
  }

  queue() {
    this._run('queue', ...arguments);
  }

  getQueueStep() {
    return Swal.getQueueStep();
  }

  insertQueueStep() {
    this._run('insertQueueStep', ...arguments);
  }

  deleteQueueStep(index) {
    this._run('deleteQueueStep', index);
  }

  getProgressSteps() {
    return Swal.getProgressSteps();
  }

  setProgressSteps() {
    this._run('setProgressSteps', ...arguments);
  }

  showProgressSteps() {
    this._run('showProgressSteps');
  }

  hideProgressSteps() {
    this._run('hideProgressSteps');
  }

  isValidParameter(param) {
    return Swal.isValidParameter(param);
  }

  _run(method, ...args) {
    scheduleOnce('afterRender', Swal, method, ...args);
  }
}
