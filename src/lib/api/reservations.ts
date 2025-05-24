import apiClient from './client';

export interface Reservation {
  id: number;
  workshopId: number;
  userId: string;
  status: number; // 0 = pending, 1 = confirmed, 2 = cancelled
  reservedAt: string;
  workshop?: {
    id: number;
    title: string;
    description: string;
    location: string;
    date: string;
    capacity: number;
    organizerId: string;
  };
}

export interface CreateReservationDto {
  workshopId: number;
  status: number;
  reservedAt: string;
}

export interface PagedResponse<T> {
  items: T[];
  totalPages: number;
  totalItemsCount: number;
  itemsFrom: number;
  itemsTo: number;
}

export interface GetReservationsParams {
  pageNumber?: number;
  pageSize?: number;
  searchPhrase?: string;
  sortBy?: string;
  sortDirection?: 'Ascending' | 'Descending';
}

export const getMyReservations = async (): Promise<Reservation[]> => {
  const response = await apiClient.get<Reservation[]>('/api/reservations/my');
  return response.data;
};

export const getReservation = async (
  id: number
): Promise<Reservation> => {
  const response = await apiClient.get<Reservation>(`/api/reservations/${id}`);
  return response.data;
};

export const createReservation = async (
  reservation: CreateReservationDto
): Promise<Reservation> => {
  const response = await apiClient.post<Reservation>('/api/reservations', reservation);
  return response.data;
};

export const cancelReservation = async (id: number): Promise<void> => {
  await apiClient.patch(`/api/reservations/${id}/cancel`, {}, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const confirmReservation = async (id: number): Promise<void> => {
  await apiClient.patch(`/api/reservations/${id}/confirm`, {}, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const getReservationStatuses = () => {
  return {
    0: 'Oczekująca',
    1: 'Potwierdzona', 
    2: 'Anulowana'
  };
};
