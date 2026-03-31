import { MetersTable } from '@/components/MetersTable';
import './MetersPage.css';

export function MetersPage() {
  return (
    <main className="meters-page">
      <title>Список счётчиков</title>
      <h2 className="meters-page__title">Список счётчиков</h2>
      <MetersTable />
    </main>
  );
}
