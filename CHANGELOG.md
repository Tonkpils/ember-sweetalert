# Change Log

All notable changes to this project will be documented in this file. This
project adheres to [Semantic Versioning](http://semver.org/) and
[this changelog format](http://keepachangelog.com/).

## [2.0.0] - Unreleased

### Changed
- **BREAKING:** Upgrade Sweet Alert to from `7.33` to `8.19`.
  - [v7 to v8 Upgrade Guide](https://github.com/sweetalert2/sweetalert2/releases/tag/v8.0.0)
- **BREAKING:** Sweet Alert component no longer supports positional parameters.
- **BREAKING:** The Sweet Alert component now follows the DDAU pattern. This means
that the `onClose` action must be used in conjunction with the `show` attribute
to ensure the show value is toggled between true/false.
- Minimum Ember version is now `3.16`.

### Deprecated
- The `SweetAlertService.open()` method is deprecated in favour of
`SweetAlertService.fire()`, and will be removed in `3.0`.

## [1.1.0] - Unreleased

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
