import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (value: any) => void,
  label?: string,
  placeholder?: string,
}

export default function InputData ({ onChange, label, placeholder, ...inputProps }: InputProps) {
  return (
    <FormControl 
      isRequired
      pb={"30px"}
    >
      <FormLabel>{`${label}`}: </FormLabel>
      <Input 
        placeholder = {placeholder}
        onChange={e => {
          if (onChange){
            onChange(e.target.value)
          }
        }} 
      />
    </FormControl>
    )
}