import type { RawArea, RawMeter, PagedResponse } from './types';

export type { RawArea, RawMeter, PagedResponse };

const BASE_URL = '/api';

export const metersApi = {
  async fetchMeters(
    page: number,
    pageSize: number
  ): Promise<PagedResponse<RawMeter>> {
    const params = new URLSearchParams({
      limit: String(pageSize),
      offset: String((page - 1) * pageSize),
    });
    const response = await fetch(`${BASE_URL}/meters/?${params}`);
    if (!response.ok)
      throw new Error(`Ошибка загрузки счётчиков: ${response.status}`);
    return response.json() as Promise<PagedResponse<RawMeter>>;
  },

  async fetchAreas(ids: string[]): Promise<PagedResponse<RawArea>> {
    const params = new URLSearchParams();
    ids.forEach((id) => params.append('id__in', id));
    const response = await fetch(`${BASE_URL}/areas/?${params}`);
    if (!response.ok)
      throw new Error(`Ошибка загрузки адресов: ${response.status}`);
    return response.json() as Promise<PagedResponse<RawArea>>;
  },

  async deleteMeter(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/meters/${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Ошибка удаления: ${response.status}`);
  },
};
