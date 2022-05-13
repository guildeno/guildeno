# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2022-05-13

### Added

-   Documentation about which permission(s) are required when using a route
-   Documentation about which websocket event gets emitted when a related route gets used
-   `completeListItem` Route and Helper
-   `uncompleteListItem` Route and Helper
-   `isOwner` property to `ServerMember`
-   `isSilent` property to `ChatMessage`
-   Default value of `isSilent` for `CreateMessage`

### Fixed

-   Rest Helper `awardXpToRole` now passes the award options
-   Rest Helper `createWebhook` now `await`s the fetch

## [0.5.0] - 2022-05-12

### Added

-   Website base
-   Update Channel Type, Route and Helper

### Fixed

-   `name` and `type` are not optional for `CreateChannel`

<!-- ## [1.0.0] - YYYY-MM-DD

* First release

[1.0.0]: https://github.com/guildeno/guildeno/compare/d8289344f143271f1156dbec582e6209bd95260b...1.0.0 -->

<!--
TYPES:
- Added
- Changed
- Deprecated
- Removed
- Fixed
- Security
 -->

[unreleased]: https://github.com/guildeno/guildeno/compare/v0.6.0...main
[0.5.0]: https://github.com/guildeno/guildeno/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/guildeno/guildeno/compare/0.4.2...v0.5.0
