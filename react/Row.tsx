import React from 'react'
import {
  FlexLayoutTypes,
  FlexLayoutContextProvider,
  useFlexLayoutContext,
} from './components/FlexLayoutContext'
import { defineMessages } from 'react-intl'

import { useResponsiveWidth } from './hooks/responsiveWidth'
import {
  parseTachyonsGroup,
  TachyonsScaleInput,
  parseMargins,
  parsePaddings,
} from './modules/valuesParser'

import styles from './Row.css'

enum HorizontalAlign {
  left = 'left',
  right = 'right',
  center = 'center',
}

const HORIZONTAL_ALIGN_MAP = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

export interface Props extends Flex, Gap {
  blockClass?: string
  marginTop: TachyonsScaleInput
  marginBottom: TachyonsScaleInput
  paddingTop: TachyonsScaleInput
  paddingBottom: TachyonsScaleInput
  preserveLayoutOnMobile?: boolean
  preventHorizontalStretch?: boolean
  preventVerticalStretch?: boolean
  horizontalAlign?: HorizontalAlign
}

const Row: StorefrontFunctionComponent<Props> = ({
  children,
  colGap,
  rowGap,
  marginTop,
  marginBottom,
  paddingTop,
  paddingBottom,
  preserveLayoutOnMobile,
  preventHorizontalStretch,
  preventVerticalStretch,
  horizontalAlign,
}) => {
  const context = useFlexLayoutContext()

  const gaps = parseTachyonsGroup({
    colGap: colGap != null ? colGap : context.colGap,
    rowGap: rowGap != null ? rowGap : context.rowGap,
  })

  const margins = parseMargins({
    marginTop,
    marginBottom,
  })

  const paddings = parsePaddings({
    paddingTop,
    paddingBottom,
  })

  const { cols, breakOnMobile } = useResponsiveWidth(children, {
    preserveLayoutOnMobile,
  })

  if (context.parent === FlexLayoutTypes.ROW) {
    console.warn(
      'A flex-row is being inserted directly into another flex-row. This might have unpredicted behaviour.'
    )
  }

  const horizontalAlignClass =
    HORIZONTAL_ALIGN_MAP[horizontalAlign || HorizontalAlign.left] ||
    HorizontalAlign.left

  return (
    <FlexLayoutContextProvider parent={FlexLayoutTypes.ROW} {...gaps}>
      <div
        className={`${
          breakOnMobile ? 'flex-none flex-ns' : 'flex'
        } ${margins} ${paddings} ${horizontalAlignClass} items-stretch w-100`}
      >
        {cols.map((col, i) => {
          const isLast = i === cols.length - 1
          const colGap = isLast ? 0 : gaps.colGap
          const rowGap = isLast ? 0 : gaps.rowGap

          return (
            <div
              key={i}
              className={`${
                /** If it breaks line on mobile, use the rowGap as bottom padding */
                breakOnMobile
                  ? `pr${colGap}-ns pb${rowGap} pb0-ns`
                  : `pr${colGap}`
              } ${preventVerticalStretch ? '' : 'items-stretch'} ${
                preventHorizontalStretch ? '' : styles.stretchChildrenWidth
              } flex`}
              style={{
                width: preventHorizontalStretch
                  ? 'auto'
                  : breakOnMobile
                  ? '100%'
                  : col.width,
              }}
            >
              {col.element}
            </div>
          )
        })}
      </div>
    </FlexLayoutContextProvider>
  )
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/editor.row.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.row.description',
  },
})

Row.schema = {
  title: messages.title.id,
  description: messages.description.id,
}

export default Row
