'use client';

import { ReactNode } from 'react';
import { Flex, Box, Heading, Text } from '@chakra-ui/react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Flex
      minH="100vh"
      bg="gray.50"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        bg="white"
        p={{ base: 6, md: 8 }}
        shadow="lg"
        rounded="xl"
        borderWidth="1px"
        borderColor="gray.200"
        width="100%"
        maxW="450px"
      >
        <Box mb={6} textAlign="center">
          <Heading
            color="var(--primary)"
            fontSize="3xl"
            fontWeight="extrabold"
            mb={2}
          >
            EventPlanner
          </Heading>
          <Text color="gray.700" fontWeight="medium">
            Zaloguj się, aby kontynuować
          </Text>
        </Box>

        {children}
      </Box>
    </Flex>
  );
}
