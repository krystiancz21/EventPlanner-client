'use client';

import { useState } from 'react';
import { 
  Box, 
  Button, 
  Input, 
  Text, 
  Stack, 
  Textarea,
} from '@chakra-ui/react';
import { createWorkshop, type CreateWorkshopDto } from '@/lib/api/workshops';
import { toaster } from '@/components/ui/toaster';
import { useRouter } from 'next/navigation';

export default function CreateWorkshopForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState(10);
  
  // Validation errors
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [dateError, setDateError] = useState('');
  const [capacityError, setCapacityError] = useState('');
  const [generalError, setGeneralError] = useState('');

  // Validation functions
  const validateTitle = (value: string): boolean => {
    if (!value.trim()) {
      setTitleError('Tytuł jest wymagany');
      return false;
    }
    if (value.length < 3) {
      setTitleError('Tytuł musi mieć co najmniej 3 znaki');
      return false;
    }
    if (value.length > 100) {
      setTitleError('Tytuł nie może być dłuższy niż 100 znaków');
      return false;
    }
    setTitleError('');
    return true;
  };

  const validateDescription = (value: string): boolean => {
    if (!value.trim()) {
      setDescriptionError('Opis jest wymagany');
      return false;
    }
    if (value.length < 10) {
      setDescriptionError('Opis musi mieć co najmniej 10 znaków');
      return false;
    }
    setDescriptionError('');
    return true;
  };

  const validateLocation = (value: string): boolean => {
    if (!value.trim()) {
      setLocationError('Lokalizacja jest wymagana');
      return false;
    }
    setLocationError('');
    return true;
  };

  const validateDate = (value: string): boolean => {
    if (!value) {
      setDateError('Data jest wymagana');
      return false;
    }
    
    const selectedDate = new Date(value);
    const now = new Date();
    
    // Reset time part for date comparison
    now.setHours(0, 0, 0, 0);
    
    if (selectedDate < now) {
      setDateError('Data nie może być z przeszłości');
      return false;
    }
    
    setDateError('');
    return true;
  };

  const validateCapacity = (value: number): boolean => {
    if (value <= 0) {
      setCapacityError('Pojemność musi być większa niż 0');
      return false;
    }
    if (value > 1000) {
      setCapacityError('Pojemność nie może przekraczać 1000 osób');
      return false;
    }
    setCapacityError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset general error
    setGeneralError('');
    
    // Validate all fields
    const isTitleValid = validateTitle(title);
    const isDescriptionValid = validateDescription(description);
    const isLocationValid = validateLocation(location);
    const isDateValid = validateDate(date);
    const isCapacityValid = validateCapacity(capacity);
    
    // If any validation fails, don't submit
    if (!isTitleValid || !isDescriptionValid || !isLocationValid || !isDateValid || !isCapacityValid) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const workshopData: CreateWorkshopDto = {
        title,
        description,
        location,
        date,
        capacity
      };
      
      await createWorkshop(workshopData);
      
      toaster.create({
        title: 'Warsztat utworzony',
        description: 'Twój warsztat został pomyślnie utworzony.',
        type: 'success',
        duration: 5000,
      });
      
      // Redirect to workshops list
      router.push('/workshops');
      
    } catch (error) {
      console.error('Error creating workshop:', error);
      
      setGeneralError('Wystąpił błąd podczas tworzenia warsztatu. Spróbuj ponownie.');
      
      toaster.create({
        title: 'Błąd',
        description: 'Nie udało się utworzyć warsztatu. Spróbuj ponownie.',
        type: 'error',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format date to YYYY-MM-DD for input
  const formatDateForInput = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%" maxW="800px">
      <Stack gap={6}>
        {generalError && (
          <Box bg="#FFEBEE" p={4} borderRadius="md" borderLeftWidth="4px" borderLeftColor="var(--primary)">
            <Text color="var(--primary)" fontWeight="medium">{generalError}</Text>
          </Box>
        )}
        
        <Box>
          <Text mb={2} fontWeight="medium" color="gray.700">Tytuł warsztatu</Text>
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (titleError) validateTitle(e.target.value);
            }}
            onBlur={() => validateTitle(title)}
            placeholder="Wprowadź tytuł warsztatu"
            borderRadius="md"
            borderColor={titleError ? "var(--primary)" : "gray.300"}
            _hover={{ borderColor: "var(--primary)" }}
            _focus={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px var(--primary)" }}
          />
          {titleError && <Text color="var(--primary)" fontSize="sm" mt={1}>{titleError}</Text>}
        </Box>
        
        <Box>
          <Text mb={2} fontWeight="medium" color="gray.700">Opis</Text>
          <Textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (descriptionError) validateDescription(e.target.value);
            }}
            onBlur={() => validateDescription(description)}
            placeholder="Opisz, czego uczestnicy mogą się spodziewać na warsztacie"
            borderRadius="md"
            borderColor={descriptionError ? "var(--primary)" : "gray.300"}
            _hover={{ borderColor: "var(--primary)" }}
            _focus={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px var(--primary)" }}
            minHeight="150px"
          />
          {descriptionError && <Text color="var(--primary)" fontSize="sm" mt={1}>{descriptionError}</Text>}
        </Box>
        
        <Box>
          <Text mb={2} fontWeight="medium" color="gray.700">Lokalizacja</Text>
          <Input
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              if (locationError) validateLocation(e.target.value);
            }}
            onBlur={() => validateLocation(location)}
            placeholder="Podaj miejsce, gdzie odbędzie się warsztat"
            borderRadius="md"
            borderColor={locationError ? "var(--primary)" : "gray.300"}
            _hover={{ borderColor: "var(--primary)" }}
            _focus={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px var(--primary)" }}
          />
          {locationError && <Text color="var(--primary)" fontSize="sm" mt={1}>{locationError}</Text>}
        </Box>
        
        <Box>
          <Text mb={2} fontWeight="medium" color="gray.700">Data</Text>
          <Input
            type="datetime-local"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (dateError) validateDate(e.target.value);
            }}
            onBlur={() => validateDate(date)}
            min={formatDateForInput()}
            borderRadius="md"
            borderColor={dateError ? "var(--primary)" : "gray.300"}
            _hover={{ borderColor: "var(--primary)" }}
            _focus={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px var(--primary)" }}
          />
          {dateError && <Text color="var(--primary)" fontSize="sm" mt={1}>{dateError}</Text>}
        </Box>
        
        <Box>
          <Text mb={2} fontWeight="medium" color="gray.700">Maksymalna liczba uczestników</Text>
          <Input
            type="number"
            value={capacity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setCapacity(value);
              if (capacityError) validateCapacity(value);
            }}
            onBlur={() => validateCapacity(capacity)}
            min={1}
            max={1000}
            borderRadius="md"
            borderColor={capacityError ? "var(--primary)" : "gray.300"}
            _hover={{ borderColor: "var(--primary)" }}
            _focus={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px var(--primary)" }}
          />
          {capacityError && <Text color="var(--primary)" fontSize="sm" mt={1}>{capacityError}</Text>}
        </Box>
        
        <Button
          type="submit"
          bg="var(--primary)"
          color="white"
          width="100%"
          mt={4}
          mb={2}
          disabled={isLoading}
          _hover={{ bg: "var(--primary-hover)" }}
          _focus={{ outline: 'none', boxShadow: 'none' }}
          _active={{ bg: "var(--primary-active)" }}
          size="lg"
        >
          {isLoading ? 'Tworzenie warsztatu...' : 'Utwórz warsztat'}
        </Button>
      </Stack>
    </Box>
  );
}
