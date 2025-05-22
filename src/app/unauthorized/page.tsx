'use client';

import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <Box p={8} minH="100vh">
      <Flex direction="column" align="center" justify="center" h="full" mt={20}>
        <Heading mb={6} color="var(--primary)">Brak dostępu</Heading>
        <Text fontSize="lg" mb={8} textAlign="center">
          Nie masz wystarczających uprawnień, aby uzyskać dostęp do tej strony.
          <br />
          Skontaktuj się z administratorem, jeśli uważasz, że to błąd.
        </Text>
        <Flex gap={4}>
          <Button 
            onClick={() => router.push('/')}
            colorScheme="gray"
          >
            Wróć do strony głównej
          </Button>
          <Button 
            onClick={() => router.back()}
            bg="var(--primary)" 
            color="white"
            _hover={{ bg: "var(--primary-hover)" }}
          >
            Wróć do poprzedniej strony
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
