import { Component, HostListener } from '@angular/core';
import { constants } from '../constants/constants';
import { UtilitieService } from '../services/utilities/utilitie.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  
  componentToShow = constants.RECIPE;
  constant = constants;

  constructor(private utilitieService: UtilitieService) {}

  @HostListener('document:click', ['$event']) documentClick(event: any): void {
    this.utilitieService.documentClickedTarget.next(event.target)
  }

  onNavigate(link: string) {
    this.componentToShow = link;
  }
}
