import { Button as AntButton } from 'antd';
import styled from 'styled-components';

const getColors = (btntype) => {
  switch (btntype) {
    case 'primary':
      return {
        bg: '#2196f3',
        border: '#2196f3',
        text: '#ffffff',
        hoverBg: '#1976d2',
        hoverText: '#ffffff',
      };
    case 'danger':
      return {
        bg: '#f44336',
        border: '#f44336',
        text: '#ffffff',
        hoverBg: '#d32f2f',
        hoverText: '#ffffff',
      };
    default:
      return {
        bg: '#ffffff',
        border: '#2196f3',
        text: '#2196f3',
        hoverBg: '#f0f0f0',
        hoverText: '#1976d2',
      };
  }
};

export const Button = ({ btntype = 'primary', children, ...rest }) => {
  return (
    <StyledButton btntype={btntype} {...rest}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(AntButton)`
  background-color: ${(props) => getColors(props.btntype).bg} !important;
  border-color: ${(props) => getColors(props.btntype).border} !important;
  color: ${(props) => getColors(props.btntype).text} !important;

  &:hover,
  &:focus {
    background-color: ${(props) => getColors(props.btntype).hoverBg} !important;
    border-color: ${(props) => getColors(props.btntype).hoverBg} !important;
    color: ${(props) => getColors(props.btntype).hoverText} !important;
  }

  &:disabled {
    background-color: #d9d9d9 !important;
    border-color: #d9d9d9 !important;
    color: #ffffff !important;
    cursor: not-allowed;
  }
`;
