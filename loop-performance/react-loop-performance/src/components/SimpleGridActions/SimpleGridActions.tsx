import { memo, useTransition } from 'react';
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
  const [isPending, startTransition] = useTransition();

  const handleSort = (sortType: Sorting) => {
    startTransition(() => {
      dispatch(sortGridAction(sortType));
    });
  };
  const handleIncreaseQuantity = () => {
    startTransition(() => {
      dispatch(increaseQuantityInGridAction());
    });
  };
  const handleDecreaseQuantity = () => {
    startTransition(() => {
      dispatch(decreaseQuantityInGridAction());
    });
  };
  return (
    <fieldset className="simple-grid-actions-field">
      <button
        disabled={sorting === Sorting.Asc || isPending}
        className={`simple-grid-actions-button ${sorting === Sorting.Asc ? 'active' : ''}`}
        onClick={() => handleSort(Sorting.Asc)}
      >
        Ascending
      </button>
      <button
        disabled={sorting === Sorting.Desc || isPending}
        className={`simple-grid-actions-button ${sorting === Sorting.Desc ? 'active' : ''}`}
        onClick={() => handleSort(Sorting.Desc)}
      >
        Descending
      </button>
      <button
        disabled={sorting === Sorting.Shuffle || isPending}
        className={`simple-grid-actions-button ${sorting === Sorting.Shuffle ? 'active' : ''}`}
        onClick={() => handleSort(Sorting.Shuffle)}
      >
        Shuffle
      </button>
      <button
        className="simple-grid-actions-button"
        disabled={isPending}
        onClick={handleIncreaseQuantity}
      >
        Increase Quantity Field
      </button>
      <button
        className="simple-grid-actions-button"
        disabled={isPending}
        onClick={handleDecreaseQuantity}
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
