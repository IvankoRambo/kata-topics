import { ReactElement } from 'react';
import { InputProps } from '../app/interfaces';

const Input = ({
  handler,
  label,
  id,
  value = '',
  type = 'text',
}: InputProps): ReactElement => {
  return (
    <div className="flex-center field">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handler} />
    </div>
  );
};

export default Input;
