import React from 'react'

export enum FlexLayoutTypes {
  NONE = 'none',
  ROW = 'row',
  COL = 'col',
}

interface FlexLayoutContext {
  parent: FlexLayoutTypes
  colGap: number
}

export const FlexLayoutContext = React.createContext<FlexLayoutContext>({
  parent: FlexLayoutTypes.NONE,
  colGap: 0,
})
