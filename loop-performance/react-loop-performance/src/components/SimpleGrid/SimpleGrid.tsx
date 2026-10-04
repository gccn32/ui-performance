import './SimpleGrid.scss';
import { useState } from 'react';
import { useAppSelector } from '../../store';
import { selectGridData } from '../../store/loopPageSelectors';
import SimpleGridActions from '../SimpleGridActions/SimpleGridActions';
import SimpleGridRows from '../SimpleGridRows/SimpleGridRows';

function SimpleGrid() {
  const gridData = useAppSelector(selectGridData);
  const [showHeader, setShowHeader] = useState(true);

  return (
    <section>
      <SimpleGridActions showHeader={showHeader} setShowHeader={setShowHeader} />
      <ul className="grid">
        {showHeader && (
          <li className="grid-row grid-row-header">
            <div className="grid-data-id">ID</div>
            <div className="grid-data-caption">Caption</div>
            <div className="grid-data-quantity">Quantity</div>
          </li>
        )}
        <SimpleGridRows gridData={gridData} />
      </ul>
    </section>
  );
}

export default SimpleGrid;
