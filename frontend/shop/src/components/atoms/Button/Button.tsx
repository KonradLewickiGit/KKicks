import React from 'react';
import { StyledButton } from './Button.styles';

interface ButtonProps {
  isbig?: boolean;
  children: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
}

export default Button;
