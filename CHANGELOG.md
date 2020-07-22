# Change Log

All notable changes to this project will be documented in this file. This
project adheres to [Semantic Versioning](http://semver.org/) and
[this changelog format](http://keepachangelog.com/).

## Unreleased

### Added
- Updated list of configuration keys on the component to match those available
in Sweet Alert. Added the following:
  - `customContainerClass`
  - `keydownListenerCapture`
  - `cancelButtonColor`
  - `showCloseButton`
  - `validationMessage`
  - `onAfterClose`
- Update the list of methods available on the Sweet Alert service to match
those available on Sweet Alert. The changes were:
  - `getButtonWrapper` (added)
  - `stopTimer` (added)
  - `resumeTimer` (added)
  - `toggleTimer` (added)
  - `isTimerRunning` (added)
  - `increaseTimer` (added)
  - `showValidationMessage` (incorrectly listed as `showValidationError`)
  - `resetValidationMessage` (incorrectly listed as `resetValidationError`)
  - `getValidationMessage` (added)

## [1.0.0] - 2020-07-22

### Changed
- Upgraded package to Ember CLI `3.19`, requiring at least Node 10.
- Minimum supported Ember version is now `3.8`.

## [1.0.0-rc.1] - 2019-03-28

### Added
- Now supports default configuration for all alerts.
- Execute callbacks on the Ember run loop.
- Provide test helpers.
- Added package tests.
- New Sweet Alert service to trigger alerts from controllers, routes etc.

### Changed
- Upgraded to SweetAlert2 v7
- Install SweetAlert2 via NPM instead of Bower.
