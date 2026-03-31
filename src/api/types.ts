export interface RawArea {
  id: string;
  number: number | null;
  str_number_full: string | null;
  str_number: string | null;
  house: { id: string; address: string; fias_addrobjs: string[] } | null;
}

export interface RawMeter {
  id: string;
  _type: string[];
  area: { id: string };
  is_automatic: boolean | null;
  description: string | null;
  installation_date: string | null;
  initial_values: number[];
  serial_number: string;
  model_name: string | null;
  brand_name: string | null;
  communication: string;
}

export interface PagedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
