import { useToast } from '@chakra-ui/react';

type MessageProps = {
  title: string;
  description?: string;
  duration?: number;
  status: 'success' | 'error' | 'warning' | 'info';
};

export const messageToast = () => {
  const toast = useToast();
  const viewToast = ({ title, description, duration, status }: MessageProps) => {
    return toast({
      title,
      description,
      status,
      duration: duration || 2100,
      isClosable: true,
    });
  };

  return {
    viewToast,
  };
};
