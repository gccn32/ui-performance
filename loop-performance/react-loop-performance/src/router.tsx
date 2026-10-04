import { createBrowserRouter, redirect } from 'react-router';
import App from './components/App/App';
import { navLinksValues } from './model/constants';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        loader: () => redirect(`/${navLinksValues[0]}/`),
      },
      {
        path: '/:quantity/',
        Component: App,
      },
    ],
  },
]);
