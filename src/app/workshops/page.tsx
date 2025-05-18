"use client";

import { Box, Spinner, Heading, Text, Stack } from "@chakra-ui/react";
import { getWorkshops, type Workshop } from "@/lib/api/workshops";
import { useEffect, useState } from "react";
import { WorkshopCard } from "@/components/workshop/WorkshopCard";

export default function Workshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWorkshops({ pageNumber: 1, pageSize: 10 })
      .then((res) => {
        setWorkshops(res.items);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load workshops");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box p={8} minH="100vh">
      <Heading mb={6}>Dostępne Warsztaty</Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <Stack gap={4} align="stretch">
          {workshops.map((w) => (
            <WorkshopCard key={w.id} workshop={w} />
          ))}
        </Stack>
      )}
    </Box>
  );
}