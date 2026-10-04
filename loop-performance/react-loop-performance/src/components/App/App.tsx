import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch } from '../../store';
import { setGridRowsQuantityAction } from '../../store/loopPageActions';
import Nav from '../Nav/Nav';
import SimpleCounter from '../SimpleCounter/SimpleCounter';
import SimpleGrid from '../SimpleGrid/SimpleGrid';
import './App.scss';

function App() {
  const { quantity } = useParams<{ quantity: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (quantity) {
      const parsedQuantity = parseInt(quantity);
      if ([100, 1000, 10000].includes(parsedQuantity)) {
        dispatch(setGridRowsQuantityAction(parsedQuantity));
      } else {
        dispatch(setGridRowsQuantityAction(100));
      }
    }
  }, [quantity, dispatch]);

  return (
    <>
      <Nav />
      <SimpleCounter />
      <SimpleGrid />
    </>
  );
}

export default App;
