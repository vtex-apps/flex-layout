import React from 'react'
import {
  FlexLayoutTypes,
  useFlexLayoutContext,
  FlexLayoutContextProvider,
} from './components/FlexLayoutContext'
import { generateBlockClass } from '@vtex/css-handles'

import styles from './components/FlexLayout.css'

import {
  TachyonsScaleInput,
  parseTachyonsGroup,
  parseMargins,
  parsePaddings,
} from './modules/valuesParser'

interface Props extends Flex, Gap {
  blockClass?: string
  height?: string
  marginLeft: TachyonsScaleInput
  marginRight: TachyonsScaleInput
  paddingLeft: TachyonsScaleInput
  paddingRight: TachyonsScaleInput
}

const Col: StorefrontFunctionComponent<Props> = ({
  children,
  blockClass,
  colGap,
  rowGap,
  marginLeft,
  marginRight,
  paddingLeft,
  paddingRight,
  stretchContent = true,
  grow,
}) => {
  const context = useFlexLayoutContext()

  const gaps = parseTachyonsGroup({
    colGap: colGap != null ? colGap : context.colGap,
    rowGap: rowGap != null ? rowGap : context.rowGap,
  })

  const margins = parseMargins({
    marginLeft,
    marginRight,
  })

  const paddings = parsePaddings({
    paddingLeft,
    paddingRight,
  })

  if (context.parent === FlexLayoutTypes.COL) {
    console.warn(
      'A `flex-layout.col` is being inserted directly into another `flex-layout.col`. This might might have unpredicted behaviour.'
    )
  }

  if (context.parent === FlexLayoutTypes.NONE) {
    console.warn(
      'A `flex-layout.col` block is being inserted directly into the page, but it needs to be inserted into a `flex-layout.row` block.'
    )
    return null
  }

  const rowsNum = React.Children.count(children)

  return (
    <FlexLayoutContextProvider parent={FlexLayoutTypes.COL} {...gaps}>
      <div
        className={`${generateBlockClass(styles.flexCol, blockClass)} ${
          grow ? 'flex-grow-1' : ''
        } ${margins} ${paddings} flex flex-column h-100 w-100`}
      >
        {React.Children.map(children, (row, i) => {
          const isLast = i === rowsNum - 1
          const rowGap = isLast ? 0 : gaps.rowGap

          return (
            <div
              key={i}
              className={`pb${rowGap}`}
              style={{ height: stretchContent ? '100%' : 'auto' }}
            >
              {row}
            </div>
          )
        })}
      </div>
    </FlexLayoutContextProvider>
  )
}

Col.schema = {
  title: 'admin/editor.column.title',
  description: 'admin/editor.column.description',
}

export default Col
