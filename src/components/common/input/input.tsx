import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChanges?: (value: any) => void;
  label?: string;
  placeholder?: string;
  disableInput?: boolean;
  valueInput?: string | number;
  formatter?: (value: string) => string;
  typeInput?: string;
  isMessageInput?: boolean;
}

export default function InputData({
  onChanges,
  label,
  placeholder,
  disableInput,
  valueInput,
  typeInput,
  formatter,
}: InputProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInputChange = (e: any) => {
    const value = e.target.value;

    const formattedValue = (formatter && formatter(String(value))) || value;
    if (onChanges) {
      onChanges(formattedValue);
    }
  };

  return (
    <FormControl>
      <FormLabel>{`${label}`}: </FormLabel>
      <Input
        placeholder={placeholder}
        disabled={disableInput}
        value={valueInput}
        type={typeInput}
        onChange={onInputChange}
      />
    </FormControl>
  );
}
