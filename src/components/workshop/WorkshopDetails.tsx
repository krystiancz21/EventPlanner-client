import { Box, Heading, Text } from "@chakra-ui/react";
import type { Workshop } from "@/lib/api/workshops";

interface WorkshopDetailsProps {
  workshop: Workshop;
}

export const WorkshopDetails = ({ workshop }: WorkshopDetailsProps) => (
  <Box maxW="2xl" mx="auto" p={6} borderWidth="1px" borderRadius="md">
    <Heading as="h1" size="xl" mb={4}>
      {workshop.title}
    </Heading>
    <Text fontSize="md" mb={2}>
      {workshop.description}
    </Text>
    <Text fontSize="sm" color="gray.500" mb={2}>
      Data: {new Date(workshop.date).toLocaleDateString("pl-PL")}<br />
      Lokalizacja: {workshop.location}<br />
      Pojemność: {workshop.capacity}<br />
      Organizator ID: {workshop.organizerId}
    </Text>
  </Box>
);
