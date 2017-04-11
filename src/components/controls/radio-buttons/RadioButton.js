import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { noop } from 'lodash';
import '../../../styles/inputs.less';
import './radio-buttons.less';

function RadioButton({
  labelText,
  name,
  checked = false,
  id,
  disabled = false,
  inline = true,
  onChange = noop,
  value,
  shouldDisplayValidation = false,
  ...radioProps
}) {
  const radioLabelClasses = classNames('label-style', 'radio-label', {
    'disabled-label': disabled
  });

  const radioDisplayClass = classNames({
    'errored-radio': !checked && !disabled && shouldDisplayValidation,
    'empty-radio': !checked && !disabled && !shouldDisplayValidation,
    'disabled-radio': !checked && disabled && !shouldDisplayValidation,
    'filled-radio': checked && !disabled && !shouldDisplayValidation,
    'disabled-filled-radio': disabled && checked && !shouldDisplayValidation
  });

  const radioWrapperClasses = classNames({
    error: shouldDisplayValidation,
    'inline-radio-list': inline
  });

  return (
    <div className={radioWrapperClasses}>
      <label className={radioLabelClasses} htmlFor={id}>
        <input
          type="radio"
          name={name}
          className="radio-input"
          onChange={onChange}
          value={value}
          disabled={disabled}
          {...radioProps}
        />
        <span className="radio-text">{labelText}</span>
        <span className={radioDisplayClass} />
      </label>
    </div>
  );
}

RadioButton.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any,
  /**
   * Should the radio button be displayed as invalid
   */
  shouldDisplayValidation: PropTypes.bool
};

export default RadioButton;
