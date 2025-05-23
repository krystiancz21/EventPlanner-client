import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import type { Workshop } from "@/lib/api/workshops";

interface WorkshopCardProps {
  workshop: Workshop;
}

export const WorkshopCard = ({ workshop }: WorkshopCardProps) => (
  <Box borderWidth="1px" borderRadius="md" p={4}>
    <Heading size="md" mb={2}>
      {workshop.title}
    </Heading>
    <Text mb={2}>{workshop.description}</Text>
    <Text fontSize="sm" color="gray.500" mb={4}>
      {new Date(workshop.date).toLocaleDateString("pl-PL")} |{" "}
      {workshop.location} | Pojemność: {workshop.capacity}
    </Text>

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
  </Box>
);
