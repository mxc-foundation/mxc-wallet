import * as React from 'react'

const ValidityClass = ({
  error,
  pristine,
}: {
  error: boolean
  pristine: boolean
}) => {
  if (pristine) {
    return ''
  }
  if (error) {
    return 'is-invalid'
  }
  return 'is-valid'
}

const InputField = ({
  input,
  placeholder,
  type,
  meta: { pristine, error, warning },
}: any) => {
  const Meta = () => {
    if (pristine) {
      return null
    }
    if (error) {
      return <div className="invalid-feedback">{error}</div>
    }
    if (warning) {
      return <span>{warning}</span>
    }
    return null
  }
  return (
    <div>
      <input
        key="input"
        className={`form-control ${ValidityClass({
          error,
          pristine,
        })}`}
        {...input}
        placeholder={placeholder}
        type={type}
      />
      <Meta key="meta" />
    </div>
  )
}

export default InputField
