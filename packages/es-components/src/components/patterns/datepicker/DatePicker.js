import React from 'react';
import PropTypes from 'prop-types';
import { noop, pick, omit } from 'lodash';
import ReactDatePicker from 'react-datepicker';
import uncontrollable from 'uncontrollable';
import moment from 'moment';
import styled, { injectGlobal, withTheme } from 'styled-components';

import datepickerStyles from './datePickerStyles';
import Textbox from '../../controls/textbox/Textbox';

const DatePickerWrapper = styled.div`
  display: inline-block;
`;

const NonMobileOnyDatePicker = styled(ReactDatePicker)`
  @media (max-width: ${props => props.theme.screenSize.phone}) {
    display: none;
  }
`;

class DateTextbox extends React.Component {
  static propTypes = Textbox.propTypes; // eslint-disable-line react/forbid-foreign-prop-types

  setRef = ref => {
    this.inputElement = ref;
  };

  focus() {
    this.inputElement.focus();
  }

  render() {
    return <Textbox inputRef={this.setRef} {...this.props} />;
  }
}

const NativeDatePicker = props => {
  const onChangeIntercept = event => props.onChange(moment(event.target.value));
  const dateValue =
    !!props.selectedDate && props.selectedDate.isValid()
      ? props.selectedDate.format('YYYY-MM-DD')
      : '';

  return (
    <DateTextbox
      name={props.name}
      prependIconName="calendar"
      type="date"
      value={dateValue}
      {...props}
      onChange={onChangeIntercept}
    />
  );
};

const MobileOnlyDatePicker = styled(NativeDatePicker)`
  @media (min-width: ${props => props.theme.screenSize.phone}) {
    display: none;
  }
  @media (width: ${props => props.theme.screenSize.phone}) {
    display: block;
  }
`;

export const DatePicker = props => {
  const {
    children,
    name,
    onChange,
    onBlur,
    placeholder,
    selectedDate,
    theme,
    allowNativeDatepickerOnMobile,
    ...otherProps
  } = props;

  /* eslint-disable react/forbid-foreign-prop-types */
  const datepickerProps = pick(
    otherProps,
    Object.keys(ReactDatePicker.propTypes)
  );
  const textboxProps = omit(otherProps, Object.keys(ReactDatePicker.propTypes));

  /* eslint-enable */

  const dpStyles = datepickerStyles(theme.colors, theme.datepickerColors);
  /* eslint-disable no-unused-expressions */
  injectGlobal`
    ${dpStyles}
  `;
  /* eslint-enable */

  const textbox = (
    <DateTextbox
      maskType="date"
      name={name}
      prependIconName="calendar"
      {...textboxProps}
    />
  );

  const mobileDatePicker = allowNativeDatepickerOnMobile ? (
    <MobileOnlyDatePicker
      selectedDate={selectedDate}
      onChange={onChange}
      name={name}
      {...textboxProps}
    />
  ) : null;

  const NonMobileDatePicker = allowNativeDatepickerOnMobile
    ? NonMobileOnyDatePicker
    : ReactDatePicker;

  return (
    <DatePickerWrapper>
      <NonMobileDatePicker
        customInput={textbox}
        onChange={onChange}
        onBlur={onBlur}
        placeholderText={placeholder}
        selected={selectedDate}
        {...datepickerProps}
      >
        {children}
      </NonMobileDatePicker>
      {mobileDatePicker}
    </DatePickerWrapper>
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
   * Determines whether to use the native datepicker instead of the React datepicker on mobile devices.
   * For complicated scenarios like date ranges and such, it is recommended to disable this.
   * Defaults to true.
   */
  allowNativeDatepickerOnMobile: PropTypes.bool,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object.isRequired
};

DatePicker.defaultProps = {
  additionalHelpContent: undefined,
  children: undefined,
  name: undefined,
  onBlur: noop,
  onChangeRaw: noop,
  placeholder: 'mm/dd/yyyy',
  selectedDate: undefined,
  excludeDates: undefined,
  highlightDates: undefined,
  includeDates: undefined,
  filterDate: undefined,
  selectsStart: false,
  selectsEnd: false,
  startDate: undefined,
  endDate: undefined,
  allowNativeDatepickerOnMobile: true,
  validationState: 'default'
};

const UncontrolledDatePicker = uncontrollable(DatePicker, {
  selectedDate: 'onChange'
});

export default withTheme(UncontrolledDatePicker);
