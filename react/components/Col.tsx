import React, { useContext, FunctionComponent } from 'react'
import { FlexLayoutContext, FlexLayoutTypes } from './FlexLayoutContext'

interface Props {
  blockClass?: string
}

const Col: FunctionComponent<Props> = ({ children, blockClass }) => {
  const context = useContext(FlexLayoutContext)

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

  return (
    <FlexLayoutContext.Provider value={{ parent: FlexLayoutTypes.COL }}>
      <div className={blockClass}>
        <div className="flex-ns flex-column">
          {React.Children.map(children, child => (
            <div className="h-100">{child}</div>
          ))}
        </div>
      </div>
    </FlexLayoutContext.Provider>
  )
}

export default Col
