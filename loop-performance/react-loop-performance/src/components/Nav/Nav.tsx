import { NavLink } from 'react-router';
import './Nav.scss';
import { navLinksValues } from '../../model/constants';

function Nav() {
  return (
    <ul className="menu-navigation">
      {navLinksValues.map((e) => (
        <li className="menu-navigation-item" key={e}>
          <NavLink className="menu-navigation-link" to={`/${e}/`}>
            {e} lines
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default Nav;
