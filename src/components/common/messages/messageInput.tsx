import { FormErrorMessage } from '@chakra-ui/react';

interface MessageProps {
  texto?: string;
}

export default function MessagesInput({ texto }: MessageProps) {
  return (
    <>
      <FormErrorMessage>{`${texto}.`}</FormErrorMessage>
    </>
  );
}
