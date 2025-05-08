import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'shared-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
})
export class NavComponent { }
