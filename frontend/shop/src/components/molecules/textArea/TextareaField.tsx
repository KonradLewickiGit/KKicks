import React, { TextareaHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import { ErrorObject } from '../../../assets/types'
import { Textarea } from '../../atoms/TextArea/Textarea.styles'
import { Label } from '../../atoms/Label/Label.styles'
import PropTypes from 'prop-types'
import { Wrapper } from '../formField/FormField.styles'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  labelText: string
  error?: string | FieldError | ErrorObject
}

const TextareaField = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { id, labelText, placeholder, value, onChange, error, ...rest } = props

  const renderError = () => {
    if (typeof error === 'string') {
      return <span>{error}</span>
    }

    if (error && 'message' in error) {
      return <span>{error.message}</span>
    }

    return null
  }

  return (
    <Wrapper>
      <Label htmlFor={id}>{labelText}</Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
        {...rest}
      />
      {renderError()}
    </Wrapper>
  )
})

TextareaField.displayName = 'TextareaField'

TextareaField.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default TextareaField
