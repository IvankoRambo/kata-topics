import { ReactElement } from 'react';
import { ButtonProps } from '../app/interfaces';

const Button = ({ value, handler, disabled, className = '' }: ButtonProps): ReactElement =>
  <button
    onClick={handler}
    disabled={disabled}
    className={className}>
    {value}
  </button>;

export default Button;
