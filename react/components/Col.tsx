import React, { useContext, FunctionComponent } from 'react'
import { FlexLayoutContext, FlexLayoutTypes } from './FlexLayoutContext'

const Col: FunctionComponent = ({ children }) => {
  const context = useContext(FlexLayoutContext)

  if (context.parent === FlexLayoutTypes.COL) {
    console.warn(
      'A flex-col is being inserted directly into another flex-col. This might might have unpredicted behaviour.'
    )
  }

  if (context.parent === FlexLayoutTypes.NONE) {
    console.warn(
      'A flex-col block is being inserted directly into the page, but it needs to be inserted into a flex-row block.'
    )
    return null
  }

  return (
    <FlexLayoutContext.Provider value={{ parent: FlexLayoutTypes.COL }}>
      <div className="flex-ns flex-column">
        {React.Children.map(children, child => (
          <div className="h-100">{child}</div>
        ))}
      </div>
    </FlexLayoutContext.Provider>
  )
}

export default Col
