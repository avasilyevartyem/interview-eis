import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/routes/__root';
import { MetersPage } from '@/pages/MetersPage';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: MetersPage,
});
