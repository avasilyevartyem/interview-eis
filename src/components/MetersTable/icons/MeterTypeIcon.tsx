import ColdWaterIcon from '@/assets/ColdWaterIcon.svg?react';
import HotWaterIcon from '@/assets/HotWaterIcon.svg?react';
import ElectricityDailyIcon from '@/assets/ElectricityDailyIcon.svg?react';
import ThermalEnergyIcon from '@/assets/ThermalEnergyIcon.svg?react';

interface MeterTypeIconProps {
  type: string;
}

export function MeterTypeIcon({ type }: MeterTypeIconProps) {
  switch (type) {
    case 'ХВС':
      return <ColdWaterIcon />;
    case 'ГВС':
      return <HotWaterIcon />;
    case 'ЭЛДТ':
      return <ElectricityDailyIcon />;
    case 'ТПЛ':
      return <ThermalEnergyIcon />;
    default:
      return null;
  }
}
