import { NavLink } from 'react-router';
import './Nav.scss';
import { navLinksValues } from '../../model/constants';

function Nav() {
  return (
    <menu className="menu-navigation">
      {navLinksValues.map((e) => (
        <li className="menu-navigation-item" key={e}>
          <NavLink className="menu-navigation-link" to={`/${e}/`}>
            {e} lines
          </NavLink>
        </li>
      ))}
    </menu>
  );
}

export default Nav;
