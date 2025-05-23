"use client";

import { Box, Spinner, Heading, Text, Stack, Button, Flex, ButtonGroup } from "@chakra-ui/react";
import { getWorkshops, type Workshop } from "@/lib/api/workshops";
import { useEffect, useState } from "react";
import { WorkshopCard } from "@/components/workshop/WorkshopCard";
import Link from 'next/link';
import { useUserRoles } from "@/lib/hooks/useUserRoles";

export default function Workshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { roles } = useUserRoles();
  const isTrainerOrAdmin = roles?.some(role => ["Trainer", "Admin"].includes(role));

  useEffect(() => {
    let mounted = true;

    const fetchWorkshops = async () => {
      try {
        const res = await getWorkshops({ pageNumber: 1, pageSize: 10 });
        if (mounted) {
          setWorkshops(res.items);
        }
      } catch (err: unknown) {
        if (mounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Failed to load workshops");
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchWorkshops();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Box p={8} minH="100vh">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Dostępne Warsztaty</Heading>
        <ButtonGroup spacing={4}>
          {isTrainerOrAdmin && (
            <Link href="/workshops/my" passHref>
              <Button
                bg="var(--primary)"
                color="white"
                _hover={{
                  bg: "var(--primary-hover)",
                }}
              >
                Zarządzaj warsztatami
              </Button>
            </Link>
          )}
        </ButtonGroup>
      </Flex>
      
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