import React, { useContext, FunctionComponent } from 'react'
import Container from 'vtex.store-components/Container'

import { FlexLayoutContext, FlexLayoutTypes } from './FlexLayoutContext'
import Row from './Row'

interface Props {
  fullWidth?: boolean
}

const FlexLayout: FunctionComponent<Props> = ({ fullWidth, children }) => {
  const context = useContext(FlexLayoutContext)

  const content = <Row>{children}</Row>
  const isTopLevel = context.parent === FlexLayoutTypes.NONE

  if (!isTopLevel) {
    return content
  }

  if (fullWidth) {
    if (!isTopLevel) {
      console.warn(
        'Prop fullWidth is allowed only on top-level flex-row blocks.'
      )
    }

    return content
  }

  return <Container>{content}</Container>
}

export default FlexLayout
