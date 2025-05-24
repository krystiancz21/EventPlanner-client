"use client";

import { useState, useEffect } from "react";
import { Box, Stack, Heading, Text, Spinner, Button } from "@chakra-ui/react";
import {
  Reservation,
  getMyReservations,
  cancelReservation,
  confirmReservation,
} from "@/lib/api/reservations";
import ReservationCard from "./ReservationCard";
import { toaster } from "../ui/toaster";

export default function MyReservationsList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMyReservations();
      setReservations(data);
    } catch (err) {
      console.error("Błąd podczas pobierania rezerwacji:", err);
      setError("Nie udało się pobrać rezerwacji. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };
  const handleCancelReservation = async (reservationId: number) => {
    try {
      await cancelReservation(reservationId);
      setReservations((prev) =>
        prev.map((res) =>
          res.id === reservationId
            ? { ...res, status: 2 } // Status 2 = anulowana
            : res
        )
      );
      toaster.create({
        title: "Sukces",
        description: "Rezerwacja została anulowana",
        type: "success",
        duration: 3000,
      });
    } catch (err) {
      console.error("Błąd podczas anulowania rezerwacji:", err);
      toaster.create({
        title: "Błąd",
        description: "Nie udało się anulować rezerwacji",
        type: "error",
        duration: 3000,
      });
    }
  };
  const handleConfirmReservation = async (reservationId: number) => {
    try {
      await confirmReservation(reservationId);
      setReservations((prev) =>
        prev.map((res) =>
          res.id === reservationId
            ? { ...res, status: 1 } // Status 1 = potwierdzona
            : res
        )
      );
      toaster.create({
        title: "Sukces",
        description: "Rezerwacja została potwierdzona",
        duration: 3000,
      });
    } catch (err) {
      console.error("Błąd podczas potwierdzania rezerwacji:", err);
      toaster.create({
        title: "Błąd",
        description: "Nie udało się potwierdzić rezerwacji",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="200px"
      >
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        p={4}
        bg="red.50"
        _dark={{ bg: "red.900", borderColor: "red.700" }}
        rounded="md"
        borderWidth="1px"
        borderColor="red.200"
      >
        <Text color="red.800" _dark={{ color: "red.200" }} mb={2}>
          {error}
        </Text>
        <Button
          size="sm"
          colorScheme="red"
          variant="outline"
          onClick={fetchReservations}
        >
          Spróbuj ponownie
        </Button>
      </Box>
    );
  }

  if (reservations.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.400" }}>
          Nie masz jeszcze żadnych rezerwacji
        </Text>
        <Text
          fontSize="sm"
          color="gray.500"
          _dark={{ color: "gray.500" }}
          mt={2}
        >
          Zarezerwuj swoje miejsce na warsztatach
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Moje rezerwacje
        </Heading>
        <Text color="gray.600" _dark={{ color: "gray.400" }}>
          Lista Twoich rezerwacji na warsztaty
        </Text>
      </Box>

      <Stack gap={4}>
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onCancel={handleCancelReservation}
            onConfirm={handleConfirmReservation}
          />
        ))}
      </Stack>
    </Box>
  );
}
