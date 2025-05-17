'use client'

import Link from "next/link";
import { Flex, Box, Link as ChakraLink, Text, useBreakpointValue } from '@chakra-ui/react';

export default function Navbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) return null;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/workshops", label: "Workshops" },
    { href: "/reservations", label: "Reservations" },
    { href: "/sign-in", label: "Sign In" }
  ];

  return (
    <Flex 
      as="nav" 
      pt={2} 
      px={{ base: 2, md: 0 }}
      align="center"
      justify="center"
    >
      <Flex gap={6}>
        {navItems.map((item) => (
          <ChakraLink 
            as={Link} 
            href={item.href} 
            key={item.href}
            _hover={{ textDecoration: "none" }}
          >
            <Box
              p={2}
              borderRadius="md"
              _hover={{ bg: "gray.100" }}
              transition="background 0.2s"
            >
              <Text fontWeight="medium">{item.label}</Text>
            </Box>
          </ChakraLink>
        ))}
      </Flex>
    </Flex>
  );
}