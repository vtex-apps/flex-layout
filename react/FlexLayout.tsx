import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import Container from 'vtex.store-components/Container'
import { useResponsiveValues } from 'vtex.responsive-values'

import {
  FlexLayoutTypes,
  useFlexLayoutContext,
} from './components/FlexLayoutContext'
import Row, { Props as RowProps } from './Row'

interface Props extends RowProps {
  fullWidth?: boolean
}

const CSS_HANDLES = ['flexRow'] as const

const FlexLayout: StorefrontFunctionComponent<Props> = props => {
  const responsiveProps = useResponsiveValues(props) as Props
  const { fullWidth, htmlId } = responsiveProps
  const context = useFlexLayoutContext()
  const handles = useCssHandles(CSS_HANDLES)

  const intl = useIntl()

  const content = <Row {...responsiveProps} />

  const isTopLevel = context.parent === FlexLayoutTypes.NONE

  if (fullWidth || !isTopLevel) {
    return (
      <div className={handles.flexRow} id={htmlId} aria-label={intl.formatMessage(
        { id: 'store/flex-layout.flexLayout-row.aria-label' }, { sectionId: htmlId ?? 'row'})}>
        {content}
      </div>
    )
  }

  return (
    <div className={handles.flexRow} id={htmlId} aria-label={intl.formatMessage(
      { id: 'store/flex-layout.flexLayout-row.aria-label' }, { sectionId: htmlId ?? 'row' })}>
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
  title: messages.title.id,
  description: messages.description.id,
}

export default FlexLayout
