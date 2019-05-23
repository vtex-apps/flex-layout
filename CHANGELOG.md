# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
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