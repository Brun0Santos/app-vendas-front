import { useToast } from '@chakra-ui/react';

type MessageProps = {
  title: string;
  description?: string;
  status: 'success' | 'error' | 'warning' | 'info';
};

export const messageToast = () => {
  const toast = useToast();
  const viewToast = ({ title, description, status }: MessageProps) => {
    return toast({
      title,
      description,
      status,
      duration: 2100,
      isClosable: true,
    });
  };

  return {
    viewToast,
  };
};
