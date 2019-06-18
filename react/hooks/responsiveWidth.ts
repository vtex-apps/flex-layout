import React, { ReactElement } from 'react'
import { useMedia } from 'use-media'
import { useRuntime } from 'vtex.render-runtime'
import { parseWidth } from '../modules/valuesParser'

interface DistributedWidthOptions {
  preserveLayoutOnMobile?: boolean
}

interface ColWithWidth {
  element: React.ReactNode
  width: number
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
const distributeAvailableWidth = (cols: ColWithWidth[]) => {
  const { availableWidth, remainingColsNum } = cols.reduce(
    (acc, col) => ({
      availableWidth: acc.availableWidth - col.width,
      remainingColsNum: acc.remainingColsNum + (col.hasDefinedWidth ? 0 : 1),
    }),
    {
      availableWidth: 100,
      remainingColsNum: 0,
    }
  )

  if (availableWidth < 0) {
    console.warn(
      'Total width set for columns of a flex-layout.row block exceeds 100%.'
    )
    const normalization = -(100 / availableWidth)
    cols = cols.map(col => ({
      ...col,
      width: col.width * normalization,
    }))
  }

  return cols.map(col => ({
    element: col.element,
    width: `${
      col.hasDefinedWidth
        ? col.width
        : Math.floor(Math.max(0, availableWidth) / remainingColsNum)
    }%`,
    hasDefinedWidth: col.hasDefinedWidth,
  }))
}

export const useResponsiveWidth = (
  children: React.ReactNode,
  options: DistributedWidthOptions
) => {
  const {
    hints: { desktop },
  } = useRuntime()

  const isDesktop = useMedia({ minWidth: '40rem' }, desktop)
  const isMobile = !isDesktop

  const { preserveLayoutOnMobile = false } = options || {}

  const cols: ColWithWidth[] = React.Children.toArray(children).map(col => {
    const width = parseWidth((col as ReactElement).props.width)

    if (width && typeof width === 'object') {
      return {
        element: col,
        width: isMobile ? width.mobile || 0 : width.desktop || 0,
        hasDefinedWidth: true,
        isResponsive: true,
      }
    }

    if (!preserveLayoutOnMobile && isMobile) {
      return {
        element: col,
        width: 0,
        hasDefinedWidth: false,
        isResponsive: false,
      }
    }

    if (typeof width === 'number') {
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
    !preserveLayoutOnMobile && isMobile && !isAnyColResponsive

  return {
    cols: distributeAvailableWidth(cols),
    breakOnMobile,
  }
}
