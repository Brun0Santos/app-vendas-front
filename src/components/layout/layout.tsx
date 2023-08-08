import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import SidebarMenu from './menu/sidebarMenu';

interface LayoutProps {
  children?: React.ReactNode;
  titulo?: string;
}

export default function Layout({ children, titulo }: LayoutProps) {
  return (
    <Flex
      // bg={"gray.100"}
      w={'100%'}
      h={'100vh'}
    >
      <Flex w={'15%'} h={'100vh'}>
        <SidebarMenu />
      </Flex>

      <Box w={'75%'} h={'100vh'}>
        <Flex
          marginTop={'30px'}
          marginLeft={'30px'}
          alignItems={'center'}
          w={'100%'}
          h={'80px'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'0px 19px 40px rgba(0, 0, 0, 0.09)'}
        >
          <Heading paddingLeft={'20px'} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            {titulo}
          </Heading>
        </Flex>

        <Flex
          alignItems={'center'}
          marginTop={'3px'}
          marginLeft={'30px'}
          w={'100%'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'0px 19px 40px rgba(0, 0, 0, 0.09)'}
        >
          {children}
        </Flex>
      </Box>
    </Flex>
  );
}
