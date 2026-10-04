import { useAppDispatch, useAppSelector } from '../../store';
import { incrementCounterAction } from '../../store/loopPageActions';
import { selectCounter } from '../../store/loopPageSelectors';
import './SimpleCounter.scss';

function SimpleCounter() {
  const counter = useAppSelector(selectCounter);
  const dispatch = useAppDispatch();
  return (
    <section className="simple-counter">
      <button onClick={() => dispatch(incrementCounterAction())}>Increment</button>
      <div className="simple-counter-value">{counter}</div>
    </section>
  );
}

export default SimpleCounter;
