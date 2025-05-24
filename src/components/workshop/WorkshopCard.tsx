import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import type { Workshop } from "@/lib/api/workshops";
import { createReservation } from "@/lib/api/reservations";
import {
  handleReservationError,
  showReservationSuccess,
} from "@/lib/utils/reservationHelpers";
import { useState } from "react";

interface WorkshopCardProps {
  workshop: Workshop;
}

export const WorkshopCard = ({ workshop }: WorkshopCardProps) => {
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
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Heading size="md" mb={2}>
        {workshop.title}
      </Heading>
      <Text mb={2}>{workshop.description}</Text>
      <Text fontSize="sm" color="gray.500" mb={4}>
        {new Date(workshop.date).toLocaleDateString("pl-PL")} |{" "}
        {workshop.location} | Pojemność: {workshop.capacity}
      </Text>

      <Flex gap={2}>
        <Link href={`/workshops/${workshop.id}`} passHref>
          <Button
            size="sm"
            bg="var(--primary)"
            color="white"
            _hover={{
              bg: "var(--primary-hover)",
              color: "white",
              borderColor: "var(--primary-hover)",
            }}
          >
            Szczegóły
          </Button>
        </Link>

        <Button
          size="sm"
          variant="outline"
          borderColor="var(--primary)"
          color="var(--primary)"
          _hover={{
            bg: "var(--primary)",
            color: "white",
          }}
          onClick={handleReservation}
          loading={isReserving}
          loadingText="Rezerwuję..."
        >
          Zarezerwuj
        </Button>
      </Flex>
    </Box>
  );
};
