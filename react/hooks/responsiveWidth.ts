import React, { ReactElement } from 'react'
import { useDevice } from 'vtex.device-detector'
import { parseWidth } from '../modules/valuesParser'

interface DistributedWidthOptions {
  preserveLayoutOnMobile?: boolean
  hideEmptyCols?: boolean
}

interface ColWithWidth {
  element: React.ReactNode
  width: number | string
  hasDefinedWidth: boolean
  isResponsive: boolean
}

/** Distributes the available width--width that remains after subtracting
 * the widths of the columns the user has set--between the columns that do
 * not have their widths set by the user.
 *
 * For example:
 * There are 3 columns. The user sets the width for the first one to 50%.
 * This function will set the widths of the second and third columns to 25%.
 */
const distributeAvailableWidth = (
  cols: ColWithWidth[],
  { hideEmptyCols = false } = {}
) => {
  const { availableWidth, remainingColsNum, hasAnyWidthGrow } = cols.reduce(
    (acc, col) => {
      const isGrow = col.width === 'grow'
      const width =
        typeof col.width === 'number' ? acc.availableWidth - col.width : 0

      return {
        availableWidth: isGrow ? 0 : width,
        remainingColsNum: acc.remainingColsNum + (col.hasDefinedWidth ? 0 : 1),
        hasAnyWidthGrow: acc.hasAnyWidthGrow || isGrow,
      }
    },
    {
      availableWidth: 100,
      remainingColsNum: 0,
      hasAnyWidthGrow: false,
    }
  )

  if (availableWidth < 0 && !hasAnyWidthGrow) {
    const normalization = -(100 / availableWidth)
    cols = cols.map(col => ({
      ...col,
      width:
        typeof col.width === 'number' ? col.width * normalization : col.width,
    }))
  }

  return cols.map(col => {
    const definedWidth =
      typeof col.width === 'number' ? `${col.width}%` : col.width

    return {
      element: col.element,
      width: col.hasDefinedWidth
        ? definedWidth
        : `${Math.floor(
            Math.max(0, availableWidth) / (hideEmptyCols ? 1 : remainingColsNum)
          )}%`,
      hasDefinedWidth: col.hasDefinedWidth,
    }
  })
}

function isReactElement(element: any): element is ReactElement {
  return !!element && element.props
}

export const useResponsiveWidth = (
  children: React.ReactNode,
  options: DistributedWidthOptions
) => {
  const { device } = useDevice()

  const isPhone = device === 'phone'
  const isTablet = device === 'tablet'

  const { preserveLayoutOnMobile = false, hideEmptyCols = false } =
    options || {}

  const cols: ColWithWidth[] = React.Children.toArray(children).map(col => {
    if (!isReactElement(col)) {
      return {
        element: col,
        width: 0,
        hasDefinedWidth: false,
        isResponsive: true,
      }
    }

    const width = parseWidth(
      col.props.width || (col.props.blockProps && col.props.blockProps.width)
    )

    if (width && typeof width === 'object') {
      return {
        element: col,
        width: isPhone ? width.phone || 0 : isTablet ? width.tablet || 0 : width.desktop || 0,
        hasDefinedWidth: true,
        isResponsive: true,
      }
    }

    if (!preserveLayoutOnMobile && isPhone) {
      return {
        element: col,
        width: 0,
        hasDefinedWidth: false,
        isResponsive: false,
      }
    }

    if (typeof width === 'number' || typeof width === 'string') {
      return {
        element: col,
        width,
        hasDefinedWidth: true,
        isResponsive: false,
      }
    }

    return {
      element: col,
      width: 0,
      hasDefinedWidth: false,
      isResponsive: true,
    }
  })

  const isAnyColResponsive = cols.some(col => col.isResponsive)
  const breakOnMobile =
    !preserveLayoutOnMobile && isPhone && !isAnyColResponsive

  return {
    cols: distributeAvailableWidth(cols, { hideEmptyCols }),
    breakOnMobile,
  }
}
