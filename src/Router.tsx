import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import TrackerPage from './pages/Tracker.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/tracker',
    element: <TrackerPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
