import React, { useContext, FunctionComponent } from 'react'
import { FlexLayoutContext, FlexLayoutTypes } from './FlexLayoutContext'

interface Props {
  blockClass?: string
}

const Row: FunctionComponent<Props> = ({ children }) => {
  const context = useContext(FlexLayoutContext)

  if (context.parent === FlexLayoutTypes.ROW) {
    console.warn(
      'A flex-row is being inserted directly into another flex-row. This might have unpredicted behaviour.'
    )
  }

  return (
    <FlexLayoutContext.Provider value={{ parent: FlexLayoutTypes.ROW }}>
      <div className="flex-none flex-ns flex-row-ns">
        {React.Children.map(children, child => (
          <div className="w-100">{child}</div>
        ))}
      </div>
    </FlexLayoutContext.Provider>
  )
}

(Row as any).schema = {
  title: 'editor.row.title',
  description: 'editor.row.description',
}

export default Row
