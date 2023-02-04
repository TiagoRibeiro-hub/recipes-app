import { Component } from '@angular/core';
import { constants } from './constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  componentToShow = constants.RECIPE;
  constant = constants;

  onNavigate(link: string) {
    this.componentToShow = link;
  }
}
