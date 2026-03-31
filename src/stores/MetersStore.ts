import { types, flow, cast } from 'mobx-state-tree';
import type { Instance } from 'mobx-state-tree';
import { metersApi } from '../api/metersApi';
import type { RawArea, RawMeter, PagedResponse } from '../api/types';

const PAGE_SIZE = 20;

const HouseModel = types.model('House', {
  id: types.string,
  address: types.string,
  fias_addrobjs: types.array(types.string),
});

const AreaModel = types.model('Area', {
  id: types.identifier,
  number: types.maybeNull(types.number),
  str_number_full: types.maybeNull(types.string),
  str_number: types.maybeNull(types.string),
  house: types.maybeNull(HouseModel),
});

const MeterModel = types
  .model('Meter', {
    id: types.identifier,
    _type: types.array(types.string),
    area: types.model('MeterAreaRef', { id: types.string }),
    is_automatic: types.maybeNull(types.boolean),
    description: types.maybeNull(types.string),
    installation_date: types.maybeNull(types.string),
    initial_values: types.array(types.number),
    serial_number: types.string,
    model_name: types.maybeNull(types.string),
    brand_name: types.maybeNull(types.string),
    communication: types.string,
  })
  .views((self) => ({
    get meterType(): string {
      if (self._type.includes('ColdWaterAreaMeter')) return 'ХВС';
      if (self._type.includes('HotWaterAreaMeter')) return 'ГВС';
      if (self._type.includes('ElectricityDailyAreaMeter')) return 'ЭЛДТ';
      if (self._type.includes('ThermalEnergyAreaMeter')) return 'ТПЛ';
      return self._type[0] ?? '—';
    },

    get formattedDate(): string {
      if (!self.installation_date) return '—';
      const d = new Date(self.installation_date);
      return d.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    },

    get currentReading(): string {
      if (!self.initial_values.length) return '—';
      return self.initial_values
        .map((v) => v.toLocaleString('ru-RU'))
        .join(', ');
    },
  }));

const MetersStoreModel = types
  .model('MetersStore', {
    meters: types.array(MeterModel),
    areas: types.map(AreaModel),
    totalCount: types.optional(types.number, 0),
    currentPage: types.optional(types.number, 1),
    isLoading: types.optional(types.boolean, false),
    deletingId: types.maybeNull(types.string),
    error: types.maybeNull(types.string),
  })
  .views((self) => ({
    get pageCount(): number {
      return Math.max(1, Math.ceil(self.totalCount / PAGE_SIZE));
    },

    getAreaAddress(areaId: string): string {
      const area = self.areas.get(areaId);
      if (!area) return '—';
      const house = area.house?.address ?? '';
      const apt = area.str_number_full ? `, ${area.str_number_full}` : '';
      return `${house}${apt}`;
    },
  }))
  .actions((self) => {
    const fetchAreas = flow(function* (areaIds: string[]) {
      const unknownIds = [...new Set(areaIds)].filter(
        (id) => !self.areas.has(id)
      );
      if (!unknownIds.length) return;

      const data: PagedResponse<RawArea> =
        yield metersApi.fetchAreas(unknownIds);
      data.results.forEach((area) =>
        self.areas.set(area.id, area as Parameters<typeof self.areas.set>[1])
      );
    });

    const fetchPage = flow(function* (page: number) {
      self.isLoading = true;
      self.error = null;
      try {
        const data: PagedResponse<RawMeter> = yield metersApi.fetchMeters(
          page,
          PAGE_SIZE
        );
        self.meters = cast(data.results);
        self.totalCount = data.count;
        self.currentPage = page;

        yield fetchAreas(data.results.map((m) => m.area.id));
      } catch (err) {
        self.error = err instanceof Error ? err.message : 'Неизвестная ошибка';
      } finally {
        self.isLoading = false;
      }
    });

    const deleteMeter = flow(function* (meterId: string) {
      self.deletingId = meterId;
      try {
        yield metersApi.deleteMeter(meterId);

        const newTotal = self.totalCount - 1;
        const targetPage =
          self.currentPage > Math.ceil(newTotal / PAGE_SIZE)
            ? Math.max(1, self.currentPage - 1)
            : self.currentPage;

        yield fetchPage(targetPage);
      } catch (err) {
        self.error = err instanceof Error ? err.message : 'Ошибка удаления';
      } finally {
        self.deletingId = null;
      }
    });

    const setPage = (page: number) => {
      void fetchPage(page);
    };

    return { fetchPage, deleteMeter, setPage };
  });

export type MetersStoreType = Instance<typeof MetersStoreModel>;
export type MeterType = MetersStoreType['meters'][number];

export const metersStore = MetersStoreModel.create({});
