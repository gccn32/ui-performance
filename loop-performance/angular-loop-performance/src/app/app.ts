import { Component } from '@angular/core';
import { Nav } from '../components/nav/nav';
import { SimpleCounter } from '../components/simple-counter/simple-counter';
import { SimpleGrid } from '../components/simple-grid/simple-grid';

@Component({
  imports: [Nav, SimpleCounter, SimpleGrid],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
}
