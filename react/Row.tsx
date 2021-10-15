import React from 'react'
import { defineMessages } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import {
  FlexLayoutTypes,
  FlexLayoutContextProvider,
  useFlexLayoutContext,
} from './components/FlexLayoutContext'

import { useResponsiveWidth } from './hooks/responsiveWidth'
import {
  parseTachyonsGroup,
  TachyonsScaleInput,
  parseMargins,
  parsePaddings,
  parseBorders,
} from './modules/valuesParser'

import styles from './Row.css'

enum ColSizing {
  equal = 'equal',
  auto = 'auto',
}

enum ColJustify {
  between = 'between',
  around = 'around',
  left = 'left',
  right = 'right',
  center = 'center',
}

const HorizontalAlignments = {
  [ColJustify.between]: 'justify-between',
  [ColJustify.around]: 'justify-around',
  [ColJustify.left]: 'justify-start',
  [ColJustify.center]: 'justify-center',
  [ColJustify.right]: 'justify-end',
}

const CSS_HANDLES = ['flexRowContent'] as const

export interface Props extends Flex, Gap, Border {
  blockClass?: string
  marginTop: TachyonsScaleInput
  marginBottom: TachyonsScaleInput
  paddingTop: TachyonsScaleInput
  paddingBottom: TachyonsScaleInput
  preserveLayoutOnMobile?: boolean
  preventHorizontalStretch?: boolean
  preventVerticalStretch?: boolean
  colSizing?: ColSizing
  horizontalAlign?: ColJustify
  colJustify?: ColJustify
  experimentalHideEmptyCols?: boolean
}

const Row: StorefrontFunctionComponent<Props> = ({
  children,
  colGap,
  rowGap,
  marginTop,
  marginBottom,
  paddingTop,
  paddingBottom,
  border,
  borderWidth,
  borderColor,
  preserveLayoutOnMobile,
  preventHorizontalStretch,
  preventVerticalStretch,
  horizontalAlign,
  colSizing,
  colJustify = ColJustify.between,
  experimentalHideEmptyCols = false,
}) => {
  const context = useFlexLayoutContext()
  const handles = useCssHandles(CSS_HANDLES)

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

  const borders = parseBorders({
    border,
    borderWidth,
    borderColor,
  })

  const { cols, breakOnMobile } = useResponsiveWidth(children, {
    preserveLayoutOnMobile,
    hideEmptyCols: experimentalHideEmptyCols,
  })

  const isSizingAuto = colSizing === ColSizing.auto

  let horizontalAlignClass = isSizingAuto
    ? HorizontalAlignments[colJustify]
    : HorizontalAlignments.left

  if (horizontalAlign != null) {
    horizontalAlignClass = HorizontalAlignments[horizontalAlign]
  }

  return (
    <FlexLayoutContextProvider parent={FlexLayoutTypes.ROW} {...gaps}>
      <div
        className={`${
          breakOnMobile ? 'flex-none flex-ns' : 'flex'
        } ${margins} ${paddings} ${borders} ${horizontalAlignClass} ${
          handles.flexRowContent
        } items-stretch w-100`}
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
              } ${col.width === 'grow' ? 'flex-grow-1' : ''} ${
                experimentalHideEmptyCols ? styles.col : ''
              } flex`}
              style={{
                width:
                  preventHorizontalStretch ||
                  (isSizingAuto && !col.hasDefinedWidth)
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
