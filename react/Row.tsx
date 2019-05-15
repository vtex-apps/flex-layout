import React, { useContext } from 'react'
import {
  FlexLayoutContext,
  FlexLayoutTypes,
} from './components/FlexLayoutContext'
import { resolveGapValue } from './gap'

interface Props {
  blockClass?: string
  colGap?: number | string
  rowGap?: number | string
}

const Row: StorefrontFunctionComponent<Props> = ({ children, colGap }) => {
  const context = useContext(FlexLayoutContext)

  if (context.parent === FlexLayoutTypes.ROW) {
    console.warn(
      'A flex-row is being inserted directly into another flex-row. This might have unpredicted behaviour.'
    )
  }

  const resolvedColGap = resolveGapValue(colGap, context.colGap)

  const count = React.Children.count(children)

  return (
    <FlexLayoutContext.Provider
      value={{
        parent: FlexLayoutTypes.ROW,
        colGap: resolvedColGap,
      }}
    >
      <div className="flex-none flex-l flex-row-l">
        {React.Children.map(children, (child, index) => (
          <>
            <div
              style={{
                width: `${Math.floor(100 / count)}%`,
              }}
            >
              {child}
            </div>
            {index < count - 1 && (
              <div>
                <div className={`pr${resolvedColGap}`} />
              </div>
            )}
          </>
        ))}
      </div>
    </FlexLayoutContext.Provider>
  )
}

Row.schema = {
  title: 'admin/editor.row.title',
  description: 'admin/editor.row.description',
}

export default Row
