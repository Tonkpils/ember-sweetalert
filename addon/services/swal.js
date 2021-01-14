import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { scheduleOnce } from '@ember/runloop';
import { deprecate } from '@ember/debug';
import { Promise } from 'rsvp';
import Swal from 'sweetalert2';

export default class SweetAlertService extends Service {
  sweetAlert;

  constructor() {
    super(...arguments);
    let config = (getOwner(this).resolveRegistration('config:environment') || {});
    this.sweetAlert = Swal.mixin(config['ember-sweetalert'] || {});
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
      for: 'ember-sweetalert',
      since: {
        available: '2.0.0-alpha.1',
        enabled: '2.0.0-alpha.1',
      },
    });

    return this.fire(...arguments);
  }

  isVisible() {
    return this.sweetAlert.isVisible();
  }

  mixin(params) {
    return this.sweetAlert.mixin(params);
  }

  update(params) {
    return this.sweetAlert.update(params);
  }

  close() {
    this._run('close');
  }

  getContainer() {
    return this.sweetAlert.getContainer();
  }

  getHeader() {
    return this.sweetAlert.getHeader();
  }

  getTitle() {
    return this.sweetAlert.getTitle();
  }

  getProgressSteps() {
    return this.sweetAlert.getProgressSteps();
  }

  getCloseButton() {
    return this.sweetAlert.getCloseButton();
  }

  getContent() {
    return this.sweetAlert.getContent();
  }

  getImage() {
    return this.sweetAlert.getImage();
  }

  getActions() {
    return this.sweetAlert.getActions();
  }

  getFooter() {
    return this.sweetAlert.getFooter();
  }

  getFocusableElements() {
    return this.sweetAlert.getFocusableElements();
  }

  getConfirmButton() {
    return this.sweetAlert.getConfirmButton();
  }

  getDenyButton() {
    return this.sweetAlert.getDenyButton();
  }

  getCancelButton() {
    return this.sweetAlert.getCancelButton();
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

  hideLoading() {
    this._run('hideLoading');
  }

  isLoading() {
    return this.sweetAlert.isLoading();
  }

  getTimerLeft() {
    return this.sweetAlert.getTimerLeft();
  }

  stopTimer() {
    return this.sweetAlert.stopTimer();
  }

  resumeTimer() {
    return this.sweetAlert.resumeTimer();
  }

  toggleTimer() {
    return this.sweetAlert.toggleTimer();
  }

  isTimerRunning() {
    return this.sweetAlert.isTimerRunning();
  }

  increaseTimer(n) {
    return this.sweetAlert.increaseTimer(n);
  }

  clickConfirm() {
    this._run('clickConfirm');
  }

  clickDeny() {
    this._run('clickDeny');
  }

  clickCancel() {
    this._run('clickCancel');
  }

  getInput() {
    return this.sweetAlert.getInput();
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
    return this.sweetAlert.getQueueStep();
  }

  insertQueueStep() {
    this._run('insertQueueStep', ...arguments);
  }

  deleteQueueStep(index) {
    this._run('deleteQueueStep', index);
  }

  isValidParameter(param) {
    return this.sweetAlert.isValidParameter(param);
  }

  isUpdatableParameter(param) {
    return this.sweetAlert.isUpdatableParameter(param);
  }

  _run(method, ...args) {
    scheduleOnce('afterRender', this.sweetAlert, method, ...args);
  }
}
