import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (value: any) => void;
  label?: string;
  placeholder?: string;
  disableInput?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueInput?: any;
}

export default function InputData({
  onChange,
  label,
  placeholder,
  disableInput,
  valueInput,
}: InputProps) {
  return (
    <FormControl isRequired pb={'30px'}>
      <FormLabel>{`${label}`}: </FormLabel>
      <Input
        placeholder={placeholder}
        disabled={disableInput}
        value={valueInput}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
      />
    </FormControl>
  );
}
