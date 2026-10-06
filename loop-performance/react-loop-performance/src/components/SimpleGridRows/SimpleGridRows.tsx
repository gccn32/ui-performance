import './SimpleGridRows.scss';
import { memo } from 'react';
import type { GridElement } from '../../model/GridElement';

interface SimpleGridRowsComponentProps {
  gridData: GridElement[];
}
function SimpleGridRowsComponent({ gridData }: SimpleGridRowsComponentProps) {
  return (
    <>
      {gridData.map((e) => (
        <li key={e.id} className="grid-row">
          <div className="grid-data-id">{e.index}</div>
          <div className="grid-data-caption">{e.caption}</div>
          <div className="grid-data-quantity">{e.quantity}</div>
        </li>
      ))}
    </>
  );
}
const SimpleGridRows = memo(SimpleGridRowsComponent);
export default SimpleGridRows;
