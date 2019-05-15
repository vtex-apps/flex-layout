import { range } from 'ramda'

type GapValue = number

const MAX_PADDING = 11

const resolveGapValue = (
  gapProp: string | number | undefined,
  gapContext: number
): GapValue => {
  const value = typeof gapProp === 'undefined' ? gapContext : gapProp

  if (!value) {
    return 0
  }

  const supportedValues = range(0, MAX_PADDING + 1).map(String)

  if (!supportedValues.includes(String(value))) {
    console.warn(
      `Invalid colGap value passed to a flex-row block. It should be an integer between 0 and ${MAX_PADDING}.`
    )

    return 0
  }

  return typeof value === 'string' ? parseInt(value, 10) : value
}

export { resolveGapValue }
