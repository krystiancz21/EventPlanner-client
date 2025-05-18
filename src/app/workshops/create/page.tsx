'use client';

import { Box, Heading } from "@chakra-ui/react";
import CreateWorkshopForm from "@/components/workshop/CreateWorkshopForm";

export default function CreateWorkshop() {
  return (
    <Box p={8} minH="100vh">
      <Heading mb={6}>Utwórz nowy warsztat</Heading>
      <CreateWorkshopForm />
    </Box>
  );
}