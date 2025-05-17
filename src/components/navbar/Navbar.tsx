'use client'

import Link from "next/link";
import { Flex, Box, Link as ChakraLink, Text, useBreakpointValue, Button } from '@chakra-ui/react';
import { useGlobal } from '@/lib/context/GlobalDataContext';

export default function Navbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isAuthenticated, user, logout } = useGlobal();

  if (isMobile) return null;

  // Podstawowe linki nawigacyjne
  const baseNavItems = [
    { href: "/", label: "Home" },
  ];

  // Linki dla zalogowanych użytkowników
  const authenticatedNavItems = [
    { href: "/workshops", label: "Workshops" },
    { href: "/reservations", label: "Reservations" },
    { href: "/certificates", label: "Certificates" },
  ];

  // Linki dla niezalogowanych użytkowników
  const unauthenticatedNavItems = [
    { href: "/sign-in", label: "Sign In" },
    { href: "/sign-up", label: "Sign Up" },
  ];

  // Wybierz odpowiednie linki w zależności od stanu logowania
  const navItems = [
    ...baseNavItems,
    ...(isAuthenticated ? authenticatedNavItems : unauthenticatedNavItems),
  ];

  return (
    <Box 
      as="header" 
      borderBottom="1px solid" 
      borderColor="gray.200"
      bg="white"
      py={2}
    >
      <Flex 
        as="nav" 
        align="center"
        justify="space-between"
        width="100%"
        maxWidth="1200px"
        mx="auto"
        px={4}
      >
        <Flex gap={4}>
          {navItems.map((item) => (            <ChakraLink 
              as={Link} 
              href={item.href} 
              key={item.href}
              _hover={{ textDecoration: "none" }}
              _focus={{ outline: "none", boxShadow: "none" }}
              style={{ outline: "none" }}
            >              <Box
                py={2}
                px={3}
                borderRadius="md"
                color="gray.700"
                fontWeight="medium"
                position="relative"
                transition="all 0.2s"
                outline="none"
                _after={{
                  content: '""',
                  position: 'absolute',
                  width: '0%',
                  height: '2px',
                  bottom: '0',
                  left: '50%',
                  background: 'var(--primary)',
                  transition: 'all 0.3s ease',
                }}
                _hover={{
                  color: 'var(--primary)',
                  _after: {
                    width: '100%',
                    left: '0%',
                  }
                }}
                _focus={{
                  outline: 'none',
                  boxShadow: 'none'
                }}                _active={{
                  color: 'var(--primary-active)',
                  transform: 'scale(0.98)'
                }}
              >
                {item.label}
              </Box>
            </ChakraLink>
          ))}
        </Flex>

        {/* Pokaż informacje o użytkowniku i przycisk wylogowania, jeśli zalogowany */}
        {isAuthenticated && user && (
          <Flex align="center" gap={4}>
            <Text fontWeight="medium" color="gray.700">Witaj, {user.name}</Text>            <Button 
              variant="outline"
              size="sm"
              borderColor="var(--primary)"
              color="var(--primary)"
              _hover={{
                bg: "var(--primary-hover)",
                color: "white",
                borderColor: "var(--primary-hover)"
              }}              _focus={{
                outline: 'none',
                boxShadow: 'none'
              }}
              _active={{
                bg: "var(--primary-active)",
                color: "white",
                borderColor: "var(--primary-active)"
              }}
              transition="all 0.2s"
              onClick={logout}
            >
              Wyloguj
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}