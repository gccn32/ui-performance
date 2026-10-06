import { Component, signal } from '@angular/core';
import { navLinksValues } from '../../model/constants';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'alp-nav',
  styleUrl: './nav.scss',
  templateUrl: './nav.html',
})
export class Nav {
  navValue = signal<readonly number[]>(navLinksValues);
}
