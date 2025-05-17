'use client';

import { ReactNode } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

interface AuthFormWrapperProps {
  children: ReactNode;
  title: string;
}

export default function AuthFormWrapper({ children, title }: AuthFormWrapperProps) {
  return (
    <Flex 
      direction="column" 
      minH="100vh" 
      bg="gray.50" 
      align="center" 
      justify="center"
      py={8}
      px={4}
    >
      <Box 
        bg="white" 
        p={8} 
        borderRadius="lg" 
        boxShadow="md"
        width="100%" 
        maxW="md"
      >
        <Heading size="lg" mb={6} textAlign="center">{title}</Heading>
        {children}
      </Box>
    </Flex>
  );
}