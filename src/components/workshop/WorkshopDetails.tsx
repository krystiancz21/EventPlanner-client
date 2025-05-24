import { Box, Heading, Text, Button } from "@chakra-ui/react";
import type { Workshop } from "@/lib/api/workshops";
import { createReservation } from "@/lib/api/reservations";
import {
  handleReservationError,
  showReservationSuccess,
} from "@/lib/utils/reservationHelpers";
import { useState } from "react";

interface WorkshopDetailsProps {
  workshop: Workshop;
}

export const WorkshopDetails = ({ workshop }: WorkshopDetailsProps) => {
  const [isReserving, setIsReserving] = useState(false);
  const handleReservation = async () => {
    setIsReserving(true);
    try {
      await createReservation({
        workshopId: workshop.id,
        status: 0, // pending
        reservedAt: new Date().toISOString(),
      });

      showReservationSuccess();
    } catch (error: unknown) {
      handleReservationError(error);
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <Box maxW="2xl" mx="auto" p={6} borderWidth="1px" borderRadius="md">
      <Heading as="h1" size="xl" mb={4}>
        {workshop.title}
      </Heading>
      <Text fontSize="md" mb={4}>
        {workshop.description}
      </Text>
      <Text fontSize="sm" color="gray.500" mb={6}>
        Data:{" "}
        {new Date(workshop.date).toLocaleDateString("pl-PL", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
        <br />
        Lokalizacja: {workshop.location}
        <br />
        Pojemność: {workshop.capacity}
        <br />
        Organizator ID: {workshop.organizerId}
      </Text>

      <Button
        bg="var(--primary)"
        color="white"
        size="lg"
        _hover={{
          bg: "var(--primary-hover)",
        }}
        onClick={handleReservation}
        loading={isReserving}
        loadingText="Rezerwuję..."
        width="100%"
      >
        Zarezerwuj miejsce
      </Button>
    </Box>
  );
};
