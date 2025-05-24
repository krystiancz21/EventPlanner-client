"use client"

import { Container } from "@chakra-ui/react"
import MyReservationsList from "@/components/reservation/MyReservationsList"

export default function Reservations() {
  return (
    <Container maxW="4xl" py={8}>
      <MyReservationsList />
    </Container>
  )
}