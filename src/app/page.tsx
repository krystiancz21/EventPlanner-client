'use client'

import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <Flex direction="column" minH="100vh">

      {/* Główna zawartość */}
      <Flex flex={1} p={8} direction="column" align="center" justify="center">
        <Heading size="xl" mb={6} textAlign="center">
          Witaj w EventPlanner!
        </Heading>
        
        <Text fontSize="xl" mb={4} textAlign="center">
          Zarządzaj swoimi wydarzeniami w jednym miejscu
        </Text>

        <Flex mt={6} gap={6} wrap="wrap" justify="center">
          <Link href="/workshops" passHref style={{ outline: 'none' }}>
            <Button 
              bg="var(--primary)" 
              color="white" 
              size="lg"
              px={8}
              _hover={{ bg: "var(--primary-hover)" }}
              _focus={{
                outline: 'none',
                boxShadow: 'none'
              }}
              _active={{
                bg: "var(--primary-active)",
              }}
            >
              Warsztaty
            </Button>
          </Link>
          <Link href="/reservations" passHref>
            <Button 
              bg="var(--primary)" 
              color="white"
              size="lg"
              px={8}
              _hover={{ bg: "var(--primary-hover)" }}
              _focus={{
                outline: 'none',
                boxShadow: `0 0 0 2px var(--primary-hover)`,
              }}
            >
              Rezerwacje
            </Button>
          </Link>
          <Link href="/certificates" passHref>
            <Button 
              bg="var(--primary)" 
              color="white"
              size="lg"
              px={8}
              _hover={{ bg: "var(--primary-hover)" }}
              _focus={{
                outline: 'none',
                boxShadow: `0 0 0 2px var(--primary-hover)`,
              }}
            >
              Certyfikaty
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}