import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { metersStore } from '@/stores/MetersStore';
import { TableRow } from './TableRow/TableRow';
import { Pagination } from './Pagination/Pagination';
import { Loader } from '@/components/Loader';
import './MetersTable.css';

export const MetersTable = observer(function MetersTable() {
  useEffect(() => {
    metersStore.fetchPage(1);
  }, []);

  const { meters, isLoading, error, currentPage, pageCount } = metersStore;

  return (
    <div className="meters-table-wrap">
      <div className="meters-table-content-wrap">
        {isLoading && <Loader />}

        <div className="meters-table-scroll">
          <table className="meters-table">
            <thead>
              <tr>
                <th className="col-num">№</th>
                <th className="col-type">Тип</th>
                <th className="col-date">Дата установки</th>
                <th className="col-auto">Автоматический</th>
                <th className="col-reading">Текущие показания</th>
                <th className="col-address">Адрес</th>
                <th className="col-notes">Примечание</th>
                <th className="col-actions">
                  <span className="visually-hidden">Действия</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && error && (
                <tr>
                  <td className="td-status td-error">{error}</td>
                </tr>
              )}
              {meters.map((meter, index) => (
                <TableRow
                  key={meter.id}
                  meter={meter}
                  rowNum={(currentPage - 1) * 20 + index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        current={currentPage}
        total={pageCount}
        disabled={isLoading}
        onPageChange={(page) => metersStore.setPage(page)}
      />
    </div>
  );
});
