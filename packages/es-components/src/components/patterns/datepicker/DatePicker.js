import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { noop, pick, omit } from 'lodash';
import ReactDatePicker from 'react-datepicker';
import uncontrollable from 'uncontrollable';
import { injectGlobal, withTheme } from 'styled-components';

import datepickerStyles from './datePickerStyles';
import Textbox from '../../controls/textbox/Textbox';

class DateTextbox extends React.Component {
  static propTypes = Textbox.propTypes; // eslint-disable-line react/forbid-foreign-prop-types

  componentDidMount() {
    this.inputElement = findDOMNode(this).querySelector('input');
  }

  focus() {
    this.inputElement.focus();
  }

  render() {
    return <Textbox {...this.props} />;
  }
}

export const DatePicker = props => {
  const {
    additionalHelpContent,
    children,
    excludeDates,
    filterDate,
    highlightDates,
    includeDates,
    labelText,
    name,
    onChange,
    onChangeRaw,
    onBlur,
    placeholder,
    selectedDate,
    selectsEnd,
    selectsStart,
    startDate,
    endDate,
    theme,
    ...otherProps
  } = props;

  /* eslint-disable react/forbid-foreign-prop-types */
  const textboxProps = omit(otherProps, ReactDatePicker.propTypes);
  const datepickerProps = pick(otherProps, ReactDatePicker.propTypes);
  /* eslint-enable */

  const dpStyles = datepickerStyles(theme.colors, theme.datepickerColors);
  /* eslint-disable no-unused-expressions */
  injectGlobal`
    ${dpStyles}
  `;
  /* eslint-enable */

  const textbox = (
    <DateTextbox
      additionalHelpContent={additionalHelpContent}
      labelText={labelText}
      maskType="date"
      name={name}
      prependIconName="calendar"
      {...textboxProps}
    />
  );

  return (
    <ReactDatePicker
      customInput={textbox}
      endDate={endDate}
      excludeDates={excludeDates}
      filterDate={filterDate}
      highlightDates={highlightDates}
      includeDates={includeDates}
      onChange={onChange}
      onChangeRaw={onChangeRaw}
      onBlur={onBlur}
      placeholderText={placeholder}
      selected={selectedDate}
      selectsEnd={selectsEnd}
      selectsStart={selectsStart}
      startDate={startDate}
      {...datepickerProps}
    >
      {children}
    </ReactDatePicker>
  );
};

DatePicker.propTypes = {
  /** Additional text displayed below the input */
  additionalHelpContent: PropTypes.node,
  /** Content to display within and below the calendar */
  children: PropTypes.node,
  /** Label to display above datepicker */
  labelText: PropTypes.string.isRequired,
  /** Name property for the form control */
  name: PropTypes.string,
  /** Callback fired when a valid date is entered */
  onChange: PropTypes.func.isRequired,
  /** Callback fired when input value is changed */
  onChangeRaw: PropTypes.func,
  /** Callback fired when datepicker loses focus */
  onBlur: PropTypes.func,
  /** input field placeholder */
  placeholder: PropTypes.string,
  /** Moment object representing the selected date */
  selectedDate: PropTypes.object,
  /** Array of moment objects to exclude from the calendar */
  excludeDates: PropTypes.array,
  /** Array of moment objects to highlight on the calendar */
  highlightDates: PropTypes.array,
  /** Array of moment objects to whitelist on calendar */
  includeDates: PropTypes.array,
  /** Function used to filter calendar dates */
  filterDate: PropTypes.func,
  /** Sets the datepicker as the Start input of a data range */
  selectsStart: PropTypes.bool,
  /** Sets the datepicker as the End input of a date range */
  selectsEnd: PropTypes.bool,
  /** Sets the start date (moment) in a range */
  startDate: PropTypes.object,
  /** Sets the end date (moment) in a range */
  endDate: PropTypes.object,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object.isRequired
};

DatePicker.defaultProps = {
  additionalHelpContent: null,
  children: null,
  name: null,
  onBlur: noop,
  onChangeRaw: noop,
  placeholder: 'mm/dd/yyyy',
  selectedDate: null,
  excludeDates: undefined,
  highlightDates: undefined,
  includeDates: undefined,
  filterDate: undefined,
  selectsStart: false,
  selectsEnd: false,
  startDate: null,
  endDate: null,
  validationState: 'default'
};

const UncontrolledDatePicker = uncontrollable(DatePicker, {
  selectedDate: 'onChange'
});

export default withTheme(UncontrolledDatePicker);
