import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { scheduleOnce } from '@ember/runloop';
import { deprecate } from '@ember/debug';
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

  fire(...args) {
    return new Promise((resolve, reject) => {
      this.sweetAlert.fire(...args).then(resolve, reject);
    });
  }

  open() {
    deprecate('SweetAlertService.open() is deprecated: use SweetAlertService.fire() instead.', false, {
      id: 'ember-sweetalert#service-open',
      until: '3.0.0',
    });

    return this.fire(...arguments);
  }

  isVisible() {
    return Swal.isVisible();
  }

  mixin(params) {
    return this.sweetAlert.mixin(params);
  }

  update(params) {
    return Swal.update(params);
  }

  close() {
    this._run('close');
  }

  getContainer() {
    return Swal.getContainer();
  }

  getHeader() {
    return Swal.getHeader();
  }

  getTitle() {
    return Swal.getTitle();
  }

  getProgressSteps() {
    return Swal.getProgressSteps();
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

  stopTimer() {
    return Swal.stopTimer();
  }

  resumeTimer() {
    return Swal.resumeTimer();
  }

  toggleTimer() {
    return Swal.toggleTimer();
  }

  isTimerRunning() {
    return Swal.isTimerRunning();
  }

  increaseTimer(n) {
    return Swal.increaseTimer(n);
  }

  clickConfirm() {
    this._run('clickConfirm');
  }

  clickCancel() {
    this._run('clickCancel');
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

  showValidationMessage(error) {
    this._run('showValidationMessage', error);
  }

  resetValidationMessage() {
    this._run('resetValidationMessage');
  }

  getValidationMessage() {
    return this.getValidationMessage();
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

  isValidParameter(param) {
    return Swal.isValidParameter(param);
  }

  isUpdatableParameter(param) {
    return Swal.isUpdatableParameter(param);
  }

  _run(method, ...args) {
    scheduleOnce('afterRender', Swal, method, ...args);
  }
}
