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

export interface CreateWorkshopDto {
  title: string;
  description: string;
  location: string;
  date: string;
  capacity: number;
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

export const getWorkshop = async (
  id: number
): Promise<Workshop> => {
  const response = await apiClient.get<Workshop>(`/api/workshops/${id}`);
  return response.data;
};

export const createWorkshop = async (
  workshop: CreateWorkshopDto
): Promise<Workshop> => {
  const response = await apiClient.post<Workshop>('/api/workshops', workshop);
  return response.data;
};