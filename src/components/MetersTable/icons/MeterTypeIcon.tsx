import ColdWaterIcon from '@/assets/ColdWaterIcon.svg?react';
import HotWaterIcon from '@/assets/HotWaterIcon.svg?react';
import ElectricityDailyIcon from '@/assets/ElectricityDailyIcon.svg?react';
import ThermalEnergyIcon from '@/assets/ThermalEnergyIcon.svg?react';

interface MeterTypeIconProps {
  type: string;
}

export function MeterTypeIcon({ type }: MeterTypeIconProps) {
  if (type === 'ХВС') return <ColdWaterIcon />;
  if (type === 'ГВС') return <HotWaterIcon />;
  if (type === 'ЭЛДТ') return <ElectricityDailyIcon />;
  if (type === 'ТПЛ') return <ThermalEnergyIcon />;
  return null;
}
