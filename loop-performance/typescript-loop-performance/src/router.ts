import { subscribeNavigation, triggerNavigation } from './lib/router';
import { gridElements } from './model/constants';
import { store } from './store';
import { setGridDataAction } from './store/loopPageActions';

export function initRouting() {
  subscribeNavigation(() => {
    store.dispatch(
      setGridDataAction({
        gridData: gridElements.slice(0, parseInt(location.pathname.match(/\d+/)![0])),
        seed: Date.now(),
      })
    );
  });

  triggerNavigation();
}
