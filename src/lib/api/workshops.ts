import apiClient from './client';

export interface Workshop {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  capacity: number;
  organizerId: string;
}

export interface PagedResponse<T> {
  items: T[];
  totalPages: number;
  totalItemsCount: number;
  itemsFrom: number;
  itemsTo: number;
}

export interface GetWorkshopsParams {
  pageNumber?: number;
  pageSize?: number;
  searchPhrase?: string;
  sortBy?: string;
  sortDirection?: 'Ascending' | 'Descending';
}

export const getWorkshops = async (
  params: GetWorkshopsParams = {}
): Promise<PagedResponse<Workshop>> => {
  const response = await apiClient.get<PagedResponse<Workshop>>('/api/workshops', { params });
  return response.data;
};

// Added function to fetch a single workshop by ID
export const getWorkshop = async (
  id: number
): Promise<Workshop> => {
  const response = await apiClient.get<Workshop>(`/api/workshops/${id}`);
  return response.data;
};