# Change Log

All notable changes to this project will be documented in this file. This
project adheres to [Semantic Versioning](http://semver.org/) and
[this changelog format](http://keepachangelog.com/).

## Unreleased

### Changed
- **BREAKING:** Sweet Alert component no longer supports positional parameters.
- Minimum Ember version is now `3.16`.

## [1.0.0] - 2020-07-22

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
