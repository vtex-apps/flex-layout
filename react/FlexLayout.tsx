import React from 'react'
import Container from 'vtex.store-components/Container'
import { defineMessages } from 'react-intl'

import {
  FlexLayoutTypes,
  useFlexLayoutContext,
} from './components/FlexLayoutContext'
import Row, { Props as RowProps } from './Row'
import { generateBlockClass, BlockClass } from '@vtex/css-handles'

import styles from './components/FlexLayout.css'

interface Props extends RowProps {
  fullWidth?: boolean
}

const FlexLayout: StorefrontFunctionComponent<Props & BlockClass> = props => {
  const { fullWidth, blockClass } = props
  const context = useFlexLayoutContext()

  const content = <Row {...props} />

  const baseClassNames = generateBlockClass(styles.flexRow, blockClass)
  const isTopLevel = context.parent === FlexLayoutTypes.NONE

  if (fullWidth && !isTopLevel) {
    console.warn(
      'Prop `fullWidth` is allowed only on top-level `flex-layout.row` blocks.'
    )
  }

  if (fullWidth || !isTopLevel) {
    return <div className={baseClassNames}>{content}</div>
  }

  return (
    <div className={baseClassNames}>
      <Container>{content}</Container>
    </div>
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

FlexLayout.schema = {
  title: messages.title,
  description: messages.description,
}

export default FlexLayout
