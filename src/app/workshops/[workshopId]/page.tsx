'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Spinner, Box, Button, Link } from '@chakra-ui/react';
import { getWorkshop } from '@/lib/api/workshops';
import { WorkshopDetails } from '@/components/workshop/WorkshopDetails';

export default function WorkshopIdPage() {
  const { workshopId } = useParams();
  const router = useRouter();
  const [workshop, setWorkshop] = useState<null | import('@/lib/api/workshops').Workshop>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!workshopId) return;
    const id = Number(workshopId);
    getWorkshop(id)
      .then((data) => setWorkshop(data))
      .catch(() => setError('Błąd ładowania danych'))
      .finally(() => setLoading(false));
  }, [workshopId]);

  if (loading) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </Box>
    );
  }

  if (!workshop) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        Brak warsztatu
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Link href={'/workshops'}>
        <Button 
          as="a" 
          size="sm"
          bg="var(--primary)"
          color="white"
          _hover={{
              bg: "var(--primary-hover)",
              color: "white",
              borderColor: "var(--primary-hover)"
          }}
        >
          Powrót
        </Button>
      </Link>
      <WorkshopDetails workshop={workshop} />
    </Box>
  );
}