'use client';

import { Box, Heading } from "@chakra-ui/react";
import CreateWorkshopForm from "@/components/workshop/CreateWorkshopForm";
import { RequireRole } from "@/components/auth/RequireRole";

export default function CreateWorkshop() {
  return (
    <RequireRole requiredRoles={["Trainer", "Admin"]}>
      <Box p={8} minH="100vh">
        <Heading mb={6}>Utwórz nowy warsztat</Heading>
        <CreateWorkshopForm />
      </Box>
    </RequireRole>
  );
}