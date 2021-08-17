# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- I18n pseudo language to implement in-context tool.

### Fixed

- Crowdin configuration file.

## [0.17.0] - 2021-05-05

### Added

- I18n It, Fr, Ko and Nl translations.

### Fixed

- Crowdin configuration file.
- Changelog.

## [0.16.0] - 2021-03-03


### Added

- I18n Ro and Jp.

### Fixed

- Crowdin configuration file.

## [0.15.2] - 2020-12-08

### Fixed
- Fix broken and wrong links in the docs.

## [0.15.1] - 2020-08-31
### Removed
- Lots of obsolete warnings.

## [0.15.0] - 2020-05-04
### Added
- Prop `experimentalHideEmptyCols`.

## [0.14.0] - 2020-01-27
### Added
- `flexRowContent` CSS handle.

## [0.13.1] - 2019-12-03
### Fixed
- Documentation structure

## [0.13.0] - 2019-12-03

## [0.12.1] - 2019-10-25

## [0.12.0] - 2019-10-04
### Added
- `border`, `borderWidth` and `borderColor` props to `Row` and `Col`.

## [0.11.0] - 2019-10-03
### Added
- Support for [`responsive-values`](https://github.com/vtex-apps/responsive-values) to `Row` and `Col` props.

## [0.10.1] - 2019-09-19
### Fixed
- Cleaned up dependencies that should be `devDependencies`.

## [0.10.0] - 2019-09-04

## [0.9.0] - 2019-09-02
### Added
- CSS handle `flexColChild`.

## [0.8.0] - 2019-08-30
### Added
- Create `colJustify` prop, to choose justify token when sizing is auto.

## [0.7.3] - 2019-08-28

## [0.7.2] - 2019-07-26
### Changed
- Use vtex.device-detector for device detection.

## [0.7.1] - 2019-06-27
### Fixed
- Build assets with new builder hub.

## [0.7.0] - 2019-06-19
### Added
- Prop `colSizing` on Row, to allow the sizes of the columns to be based on content.

## [0.6.1] - 2019-06-06
### Fixed
- Fixed issue that causes syntax error on IE11, due to the use of ES6 features.

## [0.6.0] - 2019-06-03
### Added
- Props `horizontalAlign` and `preventHorizontalStretch` to Row.

## [0.5.1] - 2019-05-23
### Fixed
- Fixed missing `id` from schemas.

## [0.5.0] - 2019-05-23
### Added
- Props `colGap`, `rowGap`, to add spacing between columns and rows.
- Prop `preserveLayoutOnMobile`, to refrain from breaking columns into rows on small screens.
- **Col:** Props `width`, `marginLeft/Right`, `paddingLeft/Right`, and `preventVerticalStretch`.
- **Row:** Props `marginTop/Bottom`, `paddingTop/Bottom`, `preventHorizontalStretch`, and `preventVerticalStretch`.

## [0.4.2] - 2019-04-26

### Fixed
- App translations

## [0.4.1] - 2019-04-10
### Changed
- Point `flex-layout.row` to `FlexLayout`, and expose `Row` entrypoint.

## [0.4.0] - 2019-04-10
### Added
- Add schema in `Col` and `Row`.

## [0.3.0] - 2019-04-10
### Added
- Add `blockClass` prop to row and col.

## [0.2.0] - 2019-04-10
### Changed
- Changed from `flex-row` and `flex-col` to `flex-layout.row` and `flex-layout.col`, respectively.

## [0.1.0]
### Added
- `flex-row` and `flex-col` blocks.
