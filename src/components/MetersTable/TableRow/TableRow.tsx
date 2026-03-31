import { observer } from 'mobx-react-lite';
import type { Instance } from 'mobx-state-tree';
import { metersStore } from '@/stores/MetersStore';
import { MeterTypeIcon } from '@/components/MetersTable/icons/MeterTypeIcon';
import TrashIcon from '@/assets/TrashIcon.svg?react';
import './TableRow.css';

type MeterInstance = Instance<typeof metersStore.meters>[number];

interface TableRowProps {
  meter: MeterInstance;
  rowNum: number;
}

export const TableRow = observer(function TableRow({
  meter,
  rowNum,
}: TableRowProps) {
  const { deletingId, deleteMeter, getAreaAddress } = metersStore;

  const address = getAreaAddress(meter.area.id);
  const isDeleting = deletingId === meter.id;

  function handleDelete() {
    deleteMeter(meter.id);
  }

  return (
    <tr className={`table-row${isDeleting ? ' table-row--deleting' : ''}`}>
      <td className="col-num td-num">{rowNum}</td>

      <td className="col-type">
        <div className="td-type">
          <MeterTypeIcon type={meter.meterType} />
          <span>{meter.meterType}</span>
        </div>
      </td>

      <td className="col-date">{meter.formattedDate}</td>

      <td className="col-auto">
        {meter.is_automatic === null ? '—' : meter.is_automatic ? 'да' : 'нет'}
      </td>

      <td className="col-reading">{meter.currentReading}</td>

      <td className="col-address td-ellipsis" title={address}>
        {address}
      </td>

      <td
        className="col-notes td-secondary td-ellipsis"
        title={meter.description ?? ''}
      >
        {meter.description ?? '—'}
      </td>

      <td className="col-actions">
        <button
          className="table-row__delete-btn"
          aria-label="Удалить счётчик"
          disabled={isDeleting}
          onClick={handleDelete}
        >
          <TrashIcon aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
});
