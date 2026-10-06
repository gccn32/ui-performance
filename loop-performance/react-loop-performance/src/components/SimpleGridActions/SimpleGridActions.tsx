import { memo } from 'react';
import { Sorting } from '../../model/Sorting';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  decreaseQuantityInGridAction,
  increaseQuantityInGridAction,
  sortGridAction,
} from '../../store/loopPageActions';
import { selectSorting } from '../../store/loopPageSelectors';
import './SimpleGridActions.scss';

interface SimpleGridActionsParams {
  showHeader: boolean;
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
}
function SimpleGridActionsComponent({ showHeader, setShowHeader }: SimpleGridActionsParams) {
  const sorting = useAppSelector(selectSorting);
  const dispatch = useAppDispatch();

  return (
    <fieldset className="simple-grid-actions-field">
      <button
        disabled={sorting === Sorting.Asc}
        className={`simple-grid-actions-button ${sorting === Sorting.Asc ? 'active' : ''}`}
        onClick={() => dispatch(sortGridAction({ sorting: Sorting.Asc, seed: Date.now() }))}
      >
        Ascending
      </button>
      <button
        disabled={sorting === Sorting.Desc}
        className={`simple-grid-actions-button ${sorting === Sorting.Desc ? 'active' : ''}`}
        onClick={() => dispatch(sortGridAction({ sorting: Sorting.Desc, seed: Date.now() }))}
      >
        Descending
      </button>
      <button
        className={`simple-grid-actions-button ${sorting === Sorting.Shuffle ? 'active' : ''}`}
        onClick={() => dispatch(sortGridAction({ sorting: Sorting.Shuffle, seed: Date.now() }))}
      >
        Shuffle
      </button>
      <button
        className="simple-grid-actions-button"
        onClick={() => dispatch(increaseQuantityInGridAction())}
      >
        Increase Quantity Field
      </button>
      <button
        className="simple-grid-actions-button"
        onClick={() => dispatch(decreaseQuantityInGridAction())}
      >
        Decrease Quantity Field
      </button>
      <button className="simple-grid-actions-button" onClick={() => setShowHeader((prev) => !prev)}>
        {showHeader ? 'Hide Header' : 'Show Header'}
      </button>
    </fieldset>
  );
}

const SimpleGridActions = memo(SimpleGridActionsComponent);
export default SimpleGridActions;
