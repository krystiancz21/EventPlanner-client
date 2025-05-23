"use client";

import { Box, Spinner, Heading, Text, Stack, Button, Flex } from "@chakra-ui/react";
import { getMyWorkshops, deleteWorkshop, type Workshop } from "@/lib/api/workshops";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { RequireRole } from "@/components/auth/RequireRole";
import { toaster } from "@/components/ui/toaster";

export default function MyWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchMyWorkshops = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getMyWorkshops({ pageNumber: 1, pageSize: 10 });
        if (mounted) {
          setWorkshops(res.items);
        }
      } catch (err: unknown) {
        if (mounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Nie udało się załadować warsztatów");
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchMyWorkshops();

    return () => {
      mounted = false;
    };
  }, []);
  const handleDelete = async (workshopId: number) => {
    // Dodajmy console.log żeby sprawdzić token i dane
    const token = localStorage.getItem('token');
    console.log('Token exists:', !!token);
    console.log('Workshop ID to delete:', workshopId);
    
    try {
      await deleteWorkshop(workshopId);
      setWorkshops(workshops.filter(w => w.id !== workshopId));
      toaster.create({
        title: "Warsztat został usunięty",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error('Full error object:', error);
      
      toaster.create({
        title: "Błąd podczas usuwania warsztatu",
        description: "Spróbuj ponownie",
        type: "error",
        duration: 5000,
      });
    }
  };

  return (
    <RequireRole requiredRoles={["Trainer", "Admin"]}>
      <Box p={8} minH="100vh">
        <Flex justify="space-between" align="center" mb={6}>
          <Heading>Moje Warsztaty</Heading>
          <Link href="/workshops/create" passHref>
            <Button
              bg="var(--primary)"
              color="white"
              _hover={{
                bg: "var(--primary-hover)",
              }}
            >
              Utwórz warsztat
            </Button>
          </Link>
        </Flex>
          {loading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Text color="red.500" fontSize="lg">{error}</Text>
        ) : workshops.length === 0 ? (
          <Text fontSize="lg">Nie masz jeszcze żadnych warsztatów</Text>
        ) : (
          <Stack gap={4} align="stretch">
            {workshops.map((workshop) => (
              <Box key={workshop.id} position="relative">
                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <Heading size="md" mb={2}>
                    {workshop.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.500" mb={4}>
                    {new Date(workshop.date).toLocaleDateString("pl-PL")} | {workshop.location}
                  </Text>                  <Flex gap={2}>
                    <Link href={`/workshops/${workshop.id}`} passHref>
                      <Button
                        size="sm"
                        variant="outline"
                        borderColor="var(--primary)"
                        color="var(--primary)"
                        _hover={{
                          bg: "var(--primary)",
                          color: "white",
                        }}
                      >
                        Szczegóły
                      </Button>
                    </Link>
                    <Link href={`/workshops/${workshop.id}/edit`} passHref>
                      <Button
                        size="sm"
                        bg="var(--primary)"
                        color="white"
                        _hover={{
                          bg: "var(--primary-hover)",
                        }}
                      >
                        Edytuj
                      </Button>
                    </Link>
                    <Button 
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(workshop.id)}
                      _hover={{
                        bg: "red.600",
                      }}
                    >
                      Usuń
                    </Button>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </RequireRole>
  );
}