import { createRouter, navigate } from './lib/router';
import { gridElements, navLinksValues } from './model/constants';
import { store } from './store';
import { setGridDataAction } from './store/loopPageActions';

export const router = createRouter([
  {
    route: new RegExp(`^/(${navLinksValues.join('|')})/$`),
    handler: () =>
      store.dispatch(
        setGridDataAction({
          gridData: gridElements.slice(0, parseInt(location.pathname.match(/\d+/)![0])),
          seed: Date.now(),
        })
      ),
  },
  { route: /.*/, handler: () => navigate(`/${navLinksValues[0]}/`) },
]);
