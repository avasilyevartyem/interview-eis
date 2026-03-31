import { createRootRoute, Outlet } from '@tanstack/react-router';

export const rootRoute = createRootRoute({
  component: () => <Outlet />,

  notFoundComponent: () => (
    <div style={{ padding: 32, textAlign: 'center', color: '#697180' }}>
      <h2>404 — Страница не найдена</h2>
    </div>
  ),
});
