'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Flex, Box, Heading, Text } from '@chakra-ui/react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const getSubtitle = () => {
    if (pathname === '/sign-up') return 'Utwórz konto, aby kontynuować';
    if (pathname === '/sign-in') return 'Zaloguj się, aby kontynuować';
    return 'Witaj na naszej stronie!';
  };

  return (
    <Flex
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        bg="white"
        p={{ base: 6, md: 8 }}
        shadow="md"
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
            { getSubtitle() }
          </Text>
        </Box>

        {children}
      </Box>
    </Flex>
  );
}
