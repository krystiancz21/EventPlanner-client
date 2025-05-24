import { toaster } from "@/components/ui/toaster";

export const handleReservationError = (error: unknown) => {
  console.error('Error creating reservation:', error);
  
  // Check if it's a "already have reservation" error
  let errorMessage = '';
  if (error && typeof error === 'object' && 'response' in error) {
    const errorResponse = error.response as { data?: string };
    errorMessage = errorResponse?.data || '';
  }
  
  if (errorMessage.includes('You already have a reservation for this workshop')) {
    toaster.create({
      title: 'Rezerwacja już istnieje',
      description: 'Masz już rezerwację na ten warsztat. Sprawdź swoje rezerwacje.',
      type: 'warning',
      duration: 5000,
    });
  } else if (errorMessage.includes('Workshop is full') || errorMessage.includes('capacity')) {
    toaster.create({
      title: 'Warsztat wypełniony',
      description: 'Warsztat osiągnął maksymalną liczbę uczestników.',
      type: 'warning',
      duration: 5000,
    });
  } else if (errorMessage.includes('Workshop has already ended') || errorMessage.includes('past')) {
    toaster.create({
      title: 'Warsztat się zakończył',
      description: 'Nie można zarezerwować miejsca na warsztat, który już się odbył.',
      type: 'warning',
      duration: 5000,
    });
  } else {
    toaster.create({
      title: 'Błąd',
      description: 'Nie udało się utworzyć rezerwacji. Spróbuj ponownie.',
      type: 'error',
      duration: 5000,
    });
  }
};

export const showReservationSuccess = () => {
  toaster.create({
    title: 'Rezerwacja utworzona',
    description: 'Twoja rezerwacja została pomyślnie utworzona.',
    type: 'success',
    duration: 5000,
  });
};
