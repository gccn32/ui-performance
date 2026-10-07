import './components/nav/nav';
import './components/simple-counter/simple-counter';
import './components/simple-grid/simple-grid';
import './main.scss';
import { initRouting } from './router';

const root = document.getElementById('root')!;
const nav = document.createElement('tlp-nav');
root.append(nav);
const simpleCounter = document.createElement('tlp-simple-counter');
root.append(simpleCounter);
const simpleGrid = document.createElement('tlp-simple-grid');
root.append(simpleGrid);

initRouting();
