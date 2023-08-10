import { Spinner } from '@chakra-ui/react';

interface LoaderProps {
  isRender: boolean;
}

export default function Loader({ isRender }: LoaderProps) {
  if (!isRender) {
    return <></>;
  }

  return <Spinner />;
}
