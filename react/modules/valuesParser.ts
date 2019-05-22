import { fromPairs, pick, range, toPairs } from 'ramda'

export type TachyonsScaleInput = string | number | undefined
type Group<T, U> = { [key in keyof T]: U }
type TachyonsInputGroup<T> = Group<T, TachyonsScaleInput>
interface ResponsiveInput<T> {
  mobile: T
  desktop: T
}

const MAX_TACHYONS_SCALE = 11

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const isResponsiveInput = <T>(value: any): value is ResponsiveInput<T> =>
  value && value.mobile != null && value.desktop != null

export const parseResponsive = <T, U>(parse: (value: T) => U) => (
  value: T | ResponsiveInput<T>
): null | U | { mobile: U; desktop: U } => {
  if (isResponsiveInput(value)) {
    return {
      mobile: parse(value.mobile),
      desktop: parse(value.desktop),
    }
  }

  return parse(value)
}

const parseTachyonsValue = (value: TachyonsScaleInput, name?: string) => {
  if (!value) {
    return 0
  }

  const supportedValues = range(0, MAX_TACHYONS_SCALE + 1).map(String)

  if (!supportedValues.includes(String(value))) {
    if (name) {
      console.warn(
        `Invalid ${name} value ("${value}"). It should be an integer between 0 and ${MAX_TACHYONS_SCALE}.`
      )
    }

    return 0
  }

  return typeof value === 'string' ? parseInt(value, 10) : value
}

export const parseTachyonsGroup = <T>(group: TachyonsInputGroup<T>) => {
  const pairs = toPairs<TachyonsScaleInput>(group)

  const parsedValues = pairs.map<[string, number]>(([key, value]) => [
    key,
    parseTachyonsValue(value, key),
  ])

  return fromPairs(parsedValues) as Group<T, number>
}

export const parseWidth = parseResponsive(
  (width: string): null | number => {
    if (typeof width !== 'string') {
      return null
    }
    const parsedWidth = width.split('%')

    if (parsedWidth.length !== 2 && parsedWidth[1] !== '') {
      return null
    }
    const parsedWidthValue = parseInt(parsedWidth[0], 10)

    if (String(parsedWidthValue) !== parsedWidth[0]) {
      return null
    }
    return parsedWidthValue
  }
)

export const parseHeight = (width: string | string[]) => {
  if (!(typeof width === 'string')) {
    return null
  }
  const parsedWidth = width.split('%')

  if (parsedWidth.length !== 2 && parsedWidth[1] !== '') {
    return null
  }
  const parsedWidthValue = parseInt(parsedWidth[0], 10)

  if (String(parsedWidthValue) !== parsedWidth[0]) {
    return null
  }
  return parsedWidthValue
}

const mapToClasses = <T>(map: { [key in keyof T]: string }) => (
  props: { [key in keyof T]?: TachyonsScaleInput }
) => {
  const pickedProps = pick(Object.keys(map), props)

  const parsedProps = parseTachyonsGroup(pickedProps)

  const mappedProps = toPairs(parsedProps).map(
    ([key, value]) => `${map[key as (keyof T)] as string}${value}`
  )

  return mappedProps.join(' ')
}

export const parsePaddings = mapToClasses({
  paddingTop: 'pt',
  paddingBottom: 'pb',
  paddingLeft: 'pl',
  paddingRight: 'pr',
})

export const parseMargins = mapToClasses({
  marginTop: 'mt',
  marginBottom: 'mb',
  marginLeft: 'ml',
  marginRight: 'mr',
})
