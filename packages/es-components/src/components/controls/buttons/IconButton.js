import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../../base/icons/Icon';

const ContainerButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: ${props => (props.disabled ? '' : 'pointer')};
  display: flex;
  flex-direction: column;
  font-family: inherit;

  i {
    background-color: ${props =>
      props.isHighlighted ? props.theme.brandColors.primary3 : 'white'};
    color: ${props =>
      props.isHighlighted ? 'white' : props.theme.brandColors.primary3};
  }
  &:active:enabled i {
    background-color: ${props =>
      !props.isHighlighted ? props.theme.brandColors.primary3 : 'white'};
    color: ${props =>
      !props.isHighlighted ? 'white' : props.theme.brandColors.primary3};
  }

  span {
    font-weight: ${props => (props.isHighlighted ? 'bold' : 'normal')};
  }
  &:active:enabled span {
    font-weight: ${props => (!props.isHighlighted ? 'bold' : 'normal')};
  }
`;
const IconWithBorder = styled(Icon)`
  border: 2px solid;
  border-color: ${props => props.theme.brandColors.primary3};
  border-radius: 50%;
  padding: 5px;
`;
const ChildrenSpan = styled.span`
  color: ${props => props.theme.colors.gray9};
  font-size: ${props => props.fontSize}px;
  max-width: ${props => props.maxWidth};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function IconButton({
  iconName,
  iconSize,
  childrenFontSize,
  isHighlighted,
  disabled,
  maxWidth,
  onClick,
  children
}) {
  return (
    <ContainerButton
      onClick={onClick}
      isHighlighted={isHighlighted}
      disabled={disabled}
    >
      <IconWithBorder
        name={iconName}
        size={iconSize}
        isHighlighted={isHighlighted}
      />
      <ChildrenSpan
        isHighlighted={isHighlighted}
        maxWidth={maxWidth}
        fontSize={childrenFontSize}
      >
        {children}
      </ChildrenSpan>
    </ContainerButton>
  );
}

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.number,
  childrenFontSize: PropTypes.number,
  isHighlighted: PropTypes.bool,
  disabled: PropTypes.bool,
  maxWidth: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
};

IconButton.defaultProps = {
  isHighlighted: false,
  iconSize: 32,
  childrenFontSize: 15,
  disabled: false,
  maxWidth: '',
  onClick: () => {},
  children: null
};

export default IconButton;
