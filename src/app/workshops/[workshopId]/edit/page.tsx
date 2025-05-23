'use client';

import { Box, Heading, Button } from "@chakra-ui/react";
import EditWorkshopForm from "@/components/workshop/EditWorkshopForm";
import { RequireRole } from "@/components/auth/RequireRole";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function EditWorkshop() {
  const { workshopId } = useParams();
  
  // Validate workshopId
  const id = workshopId ? Number(workshopId) : null;
  
  if (!id || isNaN(id)) {
    return (
      <Box p={8} minH="100vh">
        <Heading mb={6} color="red.500">Nieprawidłowy identyfikator warsztatu</Heading>
        <Link href="/workshops/my" passHref>
          <Button
            bg="var(--primary)"
            color="white"
            _hover={{ bg: "var(--primary-hover)" }}
          >
            Powrót do moich warsztatów
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <RequireRole requiredRoles={["Trainer", "Admin"]}>
      <Box p={8} minH="100vh">
        <Box mb={6}>
          <Link href="/workshops/my" passHref>
            <Button
              size="sm"
              variant="outline"
              mb={4}
              _hover={{ bg: "gray.50" }}
            >
              ← Powrót do moich warsztatów
            </Button>
          </Link>
          <Heading>Edytuj warsztat</Heading>
        </Box>
        <EditWorkshopForm workshopId={id} />
      </Box>
    </RequireRole>
  );
}