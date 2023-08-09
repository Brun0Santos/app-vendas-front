import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { InputHTMLAttributes } from 'react';

import { formatReal } from '@/app/util/parserValue';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChanges?: (value: any) => void;
  label?: string;
  placeholder?: string;
  disableInput?: boolean;
  valueInput?: string | number;
  currency?: boolean;
  typeInput?: string;
}

export default function InputData({
  onChanges,
  label,
  placeholder,
  disableInput,
  valueInput,
  currency,
  typeInput,
}: InputProps) {
  // const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let value = e.target.value;
  //   if (value && currency) {
  //     value = formatReal(value);
  //   }
  //   if (onChange) {
  //     console.log(value);
  //     onChange(value);
  //   }
  // };

  return (
    <FormControl isRequired pb={'30px'}>
      <FormLabel>{`${label}`}: </FormLabel>
      <Input
        placeholder={placeholder}
        disabled={disableInput}
        value={valueInput}
        type={typeInput}
        onChange={(e) => {
          let valor = e.target.value;
          if (valor && currency) {
            valor = formatReal(valor);
          }

          if (onChanges) {
            console.log(valor);
            onChanges(valor);
          }
        }}
      />
    </FormControl>
  );
}
