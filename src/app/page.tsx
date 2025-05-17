'use client'

import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  // Mock danych użytkownika
  const user = {
    name: "Jan Kowalski",
    email: "jan@example.com",
    avatar: "https://bit.ly/dan-abramov"
  }

  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      {/* Nagłówek */}
      <Box bg="teal.500" px={8} py={4} color="white">
        <Flex justify="space-between" align="center">
          <Heading size="lg">EventPlanner</Heading>
          <Flex align="center" gap={4}>
            {/* <Avatar size="sm" name={user.name} src={user.avatar} /> */}
            <Text>{user.name}</Text>
          </Flex>
        </Flex>
      </Box>

      {/* Główna zawartość */}
      <Flex flex={1} p={8} direction="column" align="center" justify="center">
        <Heading size="xl" mb={6} textAlign="center">
          Witaj w EventPlanner!
        </Heading>
        
        <Text fontSize="xl" mb={4} textAlign="center">
          Zarządzaj swoimi wydarzeniami w jednym miejscu
        </Text>

        <Flex mt={2} gap={6} wrap="wrap" justify="center">
          <Link href="/workshops" passHref>
            <Button>Warsztaty</Button>
          </Link>
          <Link href="/reservations" passHref>
            <Button>Rezerwacje</Button>
          </Link>
          <Link href="/certificates" passHref>
            <Button>Certyfikaty</Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}