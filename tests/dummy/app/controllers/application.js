import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later, next } from '@ember/runloop';
import { Promise } from 'rsvp';
import config from '../config/environment';

const TESTING = 'test' === config.environment;

export default class ApplicationController extends Controller {
  @service swal;
  @tracked toggleModal = false;
  @tracked enterEmail = false;
  @tracked cancellation = null;
  @tracked email = null;

  @action
  reset() {
    this.cancellation = null;
    this.email = null;
  }

  @action
  loading() {
    return new Promise((resolve) => {
      this.swal.showLoading();
      TESTING ? next(null, resolve) : later(resolve, 2000);
    });
  }

  @action
  cancelled({ dismiss }) {
    this.cancellation = dismiss;
  }

  @action
  openModal() {
    this.toggleModal = true;
  }

  @action
  closeModal() {
    this.toggleModal = false;
  }

  @action
  openEmail() {
    this.enterEmail = true;
  }

  @action
  closeEmail() {
    this.enterEmail = false;
  }

  @action
  updateEmail({ value }) {
    this.email = value;
  }

  @action
  open() {
    this.swal.open({ title: 'Hello World!' });
  }
}
