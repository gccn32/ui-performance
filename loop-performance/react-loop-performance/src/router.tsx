import { createBrowserRouter, redirect } from 'react-router';
import App from './components/App/App';
import { navLinksValues } from './model/constants';
import { store } from './store';
import { setGridRowsQuantityAction } from './store/loopPageActions';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect(`/${navLinksValues[0]}/`),
  },
  {
    path: '/',
    children: [
      {
        path: ':quantity/',
        Component: App,
        loader: ({ params: { quantity } }) => {
          if (quantity) {
            const parsedQuantity = parseInt(quantity);
            if ('' + parsedQuantity === quantity && navLinksValues.includes(parsedQuantity)) {
              store.dispatch(setGridRowsQuantityAction(parsedQuantity));
            } else {
              return redirect(`/${navLinksValues[0]}/`);
            }
          }
        },
      },
      {
        path: '*',
        loader: () => redirect(`/${navLinksValues[0]}/`),
      },
    ],
  },
]);
