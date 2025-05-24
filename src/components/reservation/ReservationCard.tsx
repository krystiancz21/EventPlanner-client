"use client"

import { Box, Text, Badge, Stack, Button } from "@chakra-ui/react"
import { Reservation, getReservationStatuses } from "@/lib/api/reservations"

interface ReservationCardProps {
  reservation: Reservation
  onCancel?: (id: number) => void
  onConfirm?: (id: number) => void
}

export default function ReservationCard({ reservation, onCancel, onConfirm }: ReservationCardProps) {
  const statusLabels = getReservationStatuses()
  const statusColorScheme = {
    0: "yellow", // Oczekująca
    1: "green",  // Potwierdzona
    2: "red"     // Anulowana
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  const canCancel = reservation.status === 0 || reservation.status === 1
  const canConfirm = reservation.status === 0

  return (<Box
      p={6}
      bg="white"
      _dark={{ bg: "gray.800", borderColor: "gray.600" }}
      rounded="lg"
      shadow="md"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <Stack gap={4}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Stack gap={2}>
            <Text fontSize="lg" fontWeight="semibold">
              Rezerwacja #{reservation.id}
            </Text>
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
              Workshop ID: {reservation.workshopId}
            </Text>
          </Stack>
          <Badge
            colorScheme={statusColorScheme[reservation.status as keyof typeof statusColorScheme]}
            variant="subtle"
            fontSize="sm"
            px={3}
            py={1}
            rounded="full"
          >
            {statusLabels[reservation.status as keyof typeof statusLabels]}
          </Badge>
        </Box>

        <Box>
          <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
            Data rezerwacji:
          </Text>
          <Text fontWeight="medium">
            {formatDate(reservation.reservedAt)}
          </Text>
        </Box>

        {reservation.workshop && (
          <Box>
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
              Workshop:
            </Text>
            <Text fontWeight="medium">{reservation.workshop.title}</Text>
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
              {reservation.workshop.location} • {formatDate(reservation.workshop.date)}
            </Text>
          </Box>
        )}        {(canCancel && onCancel) || (canConfirm && onConfirm) ? (
          <Box pt={2} display="flex" gap={2}>
            {canConfirm && onConfirm && (
              <Button
                size="sm"
                colorScheme="green"
                variant="outline"
                onClick={() => onConfirm(reservation.id)}
              >
                Potwierdź rezerwację
              </Button>
            )}
            {canCancel && onCancel && (
              <Button
                size="sm"
                colorScheme="red"
                variant="outline"
                onClick={() => onCancel(reservation.id)}
              >
                Anuluj rezerwację
              </Button>
            )}
          </Box>
        ) : null}
      </Stack>
    </Box>
  )
}
