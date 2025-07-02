"use client";

import {
  Box,
  Spinner,
  Heading,
  Text,
  Stack,
  Button,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import { getWorkshops, type Workshop, type PagedResponse } from "@/lib/api/workshops";
import { useEffect, useState } from "react";
import { WorkshopCard } from "@/components/workshop/WorkshopCard";
import Link from "next/link";
import { useUserRoles } from "@/lib/hooks/useUserRoles";
import { PaginationWidget } from "@/components/ui/pagination/PaginationWidget";

const PAGE_SIZE = 5;

export default function Workshops() {
  const [workshopsData, setWorkshopsData] = useState<PagedResponse<Workshop> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { roles } = useUserRoles();
  
  const isTrainerOrAdmin = roles?.some((role) =>
    ["Trainer", "Admin"].includes(role)
  );

  useEffect(() => {
    let mounted = true;

    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        const res = await getWorkshops({ 
          pageNumber: currentPage, 
          pageSize: PAGE_SIZE 
        });
        if (mounted) {
          setWorkshopsData(res);
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
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      ) : workshopsData ? (
        <>
          <Stack gap={4} align="stretch" mb={8}>
            {workshopsData.items.map((w) => (
              <WorkshopCard key={w.id} workshop={w} />
            ))}
          </Stack>

          {workshopsData.totalItemsCount && (
            <Flex justify="center">
              <PaginationWidget
                currentPage={currentPage}
                totalItems={workshopsData.totalItemsCount}
                pageSize={PAGE_SIZE}
                onPageChange={handlePageChange}
              />
            </Flex>
          )}
        </>
      ) : (
        <Text>Brak warsztatów do wyświetlenia</Text>
      )}
    </Box>
  );
}
